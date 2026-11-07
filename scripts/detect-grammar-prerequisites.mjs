#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

function normalize(value) { return String(value ?? '').normalize('NFKC').toLocaleLowerCase(); }
function collectStrings(value, path = '', out = []) {
  if (typeof value === 'string') out.push({ path, value });
  else if (Array.isArray(value)) value.forEach((item, index) => collectStrings(item, path + '[' + index + ']', out));
  else if (value && typeof value === 'object') for (const [key, item] of Object.entries(value)) collectStrings(item, path ? path + '.' + key : key, out);
  return out;
}
function loadCurriculum(source, globalName, filename) {
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename, timeout: 5000 });
  const curriculum = sandbox.window[globalName];
  if (!curriculum || !Array.isArray(curriculum.units)) throw new Error(filename + ' did not define window.' + globalName + '.units');
  return curriculum;
}
export function detectGrammarPrerequisiteCandidates(curricula, catalogue) {
  const candidates = [];
  for (const rule of catalogue.rules ?? []) {
    const introLevel = (catalogue.level_order ?? []).indexOf(rule.introduced_level);
    if (introLevel < 0 || !rule.introduced_unit || !Array.isArray(rule.markers) || !rule.markers.length) continue;
    const introCurriculum = curricula.find(level => level.id === rule.introduced_level);
    const introIndex = introCurriculum?.units?.findIndex(unit => unit.id === rule.introduced_unit) ?? -1;
    if (introIndex < 0) continue;
    const patterns = rule.markers.map(marker => ({
      marker,
      regex: new RegExp('(^|[^\\p{L}\\p{N}])' + normalize(marker) + '($|[^\\p{L}\\p{N}])', 'iu'),
    }));
    for (const curriculum of curricula) {
      const levelIndex = (catalogue.level_order ?? []).indexOf(curriculum.id);
      if (levelIndex < 0 || levelIndex > introLevel) continue;
      for (const [unitIndex, unit] of curriculum.units.entries()) {
        if (!(levelIndex < introLevel || unitIndex < introIndex)) continue;
        const inspect = (exercises, prefix) => {
          for (const [exerciseIndex, exercise] of (Array.isArray(exercises) ? exercises : []).entries()) {
            for (const field of collectStrings(exercise)) {
              const normalized = normalize(field.value), matches = [];
              for (const pattern of patterns) {
                if (pattern.regex.test(normalized)) matches.push(pattern.marker);
              }
              if (matches.length) candidates.push({
                code: 'GRAMMAR_MARKER_BEFORE_DECLARED_INTRODUCTION', severity: 'candidate',
                rule_id: rule.id, level: curriculum.id, unit_id: unit.id ?? null,
                exercise_path: prefix + '[' + exerciseIndex + ']', field_path: field.path,
                markers: [...new Set(matches)], introduced_in: rule.introduced_level + '/' + rule.introduced_unit,
                excerpt: field.value.slice(0, 180),
                message: 'El ejercicio contiene una marca gramatical configurada antes de su unidad de introducción; revisar si ya se explicó o si es una expresión lexicalizada.',
              });
            }
          }
        };
        inspect(unit.exercises, 'units[' + unitIndex + '].exercises');
        for (const [lessonIndex, lesson] of (unit.lessons ?? []).entries()) inspect(lesson.exercises, 'units[' + unitIndex + '].lessons[' + lessonIndex + '].exercises');
      }
    }
  }
  return {
    generated_by: 'detect-grammar-prerequisites', candidate_count: candidates.length, candidates,
    interpretation: 'Candidatos heurísticos basados en un catálogo explícito de marcas y unidades de introducción. No prueban que exista un prerrequisito ausente: la forma puede ser una expresión memorizada, estar explicada en otro lugar o ser un falso positivo.',
    linguistic_certification: false,
  };
}
async function main() {
  const outputIndex = process.argv.indexOf('--output');
  const outputPath = outputIndex >= 0 ? resolve(process.argv[outputIndex + 1]) : resolve('artifacts/grammar-prerequisite-candidates.json');
  const catalogue = JSON.parse(await readFile('quality/grammar-prerequisite-rules.json', 'utf8'));
  const a1 = loadCurriculum(await readFile('curriculum-a1.js', 'utf8'), 'BAHASA_CURRICULUM_A1', 'curriculum-a1.js');
  const a2 = loadCurriculum(await readFile('curriculum-a2.js', 'utf8'), 'BAHASA_CURRICULUM_A2', 'curriculum-a2.js');
  const report = detectGrammarPrerequisiteCandidates([a1, a2], catalogue);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(report, null, 2) + '\n');
  console.log('Grammar prerequisite candidates: ' + report.candidate_count + '. Human review required; no linguistic verdicts.');
  console.log('Report: ' + outputPath);
}
if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) main().catch(error => { console.error(error); process.exitCode = 1; });
