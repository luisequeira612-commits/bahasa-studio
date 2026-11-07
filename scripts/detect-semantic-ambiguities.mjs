#!/usr/bin/env node
/**
 * Conservative candidates for potentially ambiguous multiple-choice answers.
 * Exact glossary collisions only; candidates require human review and are not
 * linguistic verdicts. No network access or curriculum edits.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

export function normalizeMeaning(value) {
  return String(value ?? '').normalize('NFD').replace(/\\p{M}/gu, '')
    .toLocaleLowerCase().replace(/[^\\p{L}\\p{N}]+/gu, ' ').trim().replace(/\\s+/g, ' ');
}

function collectVocabulary(curricula) {
  const byId = new Map();
  const meaningByIndonesian = new Map();
  for (const curriculum of curricula) {
    for (const [unitIndex, unit] of (curriculum?.units ?? []).entries()) {
      for (const word of (unit?.vocab ?? [])) {
        if (!word || typeof word !== 'object') continue;
        const gloss = normalizeMeaning(word.esp);
        const term = normalizeMeaning(word.idn);
        if (word.id && gloss) byId.set(word.id, { gloss, term, idn: word.idn, esp: word.esp });
        if (term && gloss) {
          const meanings = meaningByIndonesian.get(term) ?? new Set();
          meanings.add(gloss);
          meaningByIndonesian.set(term, meanings);
        }
      }
    }
  }
  return { byId, meaningByIndonesian };
}

function resolveOptionMeaning(option, vocabulary) {
  const normalized = normalizeMeaning(option);
  if (!normalized) return new Set();
  const meanings = new Set(vocabulary.meaningByIndonesian.get(normalized) ?? []);
  for (const word of vocabulary.byId.values()) {
    if (word.gloss === normalized) meanings.add(word.gloss);
  }
  return meanings;
}

export function detectSemanticAmbiguityCandidates(curricula) {
  const vocabulary = collectVocabulary(curricula);
  const candidates = [];
  for (const curriculum of curricula) {
    for (const [unitIndex, unit] of (curriculum?.units ?? []).entries()) {
      const inspect = (exercises, prefix) => {
        for (const [exerciseIndex, exercise] of (Array.isArray(exercises) ? exercises : []).entries()) {
          if (exercise?.type !== 'mc' || !Array.isArray(exercise.options) ||
              !Number.isInteger(exercise.answer) || !exercise.vocabId) continue;
          const target = vocabulary.byId.get(exercise.vocabId);
          if (!target?.gloss || exercise.answer < 0 || exercise.answer >= exercise.options.length) continue;
          const correct = normalizeMeaning(exercise.options[exercise.answer]);
          const correctMatchesTarget = correct === target.gloss ||
            (vocabulary.meaningByIndonesian.get(correct)?.has(target.gloss) ?? false);
          if (!correctMatchesTarget) continue;
          const competingOptions = [];
          exercise.options.forEach((option, optionIndex) => {
            if (optionIndex === exercise.answer) return;
            const meanings = resolveOptionMeaning(option, vocabulary);
            if (meanings.has(target.gloss)) competingOptions.push({ index: optionIndex, text: String(option) });
          });
          if (competingOptions.length) {
            candidates.push({
              code: 'MC_EQUIVALENT_GLOSS_OPTION',
              severity: 'candidate',
              level: curriculum.id ?? 'unknown',
              unit_id: unit.id ?? null,
              path: `${prefix}[${exerciseIndex}]`,
              vocab_id: exercise.vocabId,
              target_gloss: target.esp,
              correct_option: { index: exercise.answer, text: String(exercise.options[exercise.answer]) },
              competing_options: competingOptions,
              message: 'Otra opción coincide exactamente con la glosa española de la respuesta objetivo; revisar si ambas podrían ser válidas en contexto.',
            });
          }
        }
      };
      inspect(unit?.exercises, `units[${unitIndex}].exercises`);
      for (const [lessonIndex, lesson] of (unit?.lessons ?? []).entries()) {
        inspect(lesson?.exercises, `units[${unitIndex}].lessons[${lessonIndex}].exercises`);
      }
    }
  }
  return {
    generated_by: 'detect-semantic-ambiguities',
    candidate_count: candidates.length,
    candidates,
    interpretation: 'Candidatos heurísticos basados en coincidencia exacta de glosas; requieren revisión humana y no prueban ambigüedad ni error lingüístico.',
    linguistic_certification: false,
  };
}

function loadCurriculum(source, globalName, filename) {
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename, timeout: 5000 });
  const curriculum = sandbox.window[globalName];
  if (!curriculum || !Array.isArray(curriculum.units)) throw new Error(`${filename} did not define window.${globalName}.units`);
  return curriculum;
}

async function main() {
  const outputIndex = process.argv.indexOf('--output');
  const outputPath = outputIndex >= 0 ? resolve(process.argv[outputIndex + 1]) : resolve('artifacts/semantic-ambiguity-candidates.json');
  const a1 = loadCurriculum(await readFile('curriculum-a1.js', 'utf8'), 'BAHASA_CURRICULUM_A1', 'curriculum-a1.js');
  const a2 = loadCurriculum(await readFile('curriculum-a2.js', 'utf8'), 'BAHASA_CURRICULUM_A2', 'curriculum-a2.js');
  const report = detectSemanticAmbiguityCandidates([a1, a2]);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(report, null, 2) + '\\n');
  console.log(`Semantic ambiguity candidates: ${report.candidate_count}. Human review required; no linguistic verdicts.`);
  console.log(`Report: ${outputPath}`);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  main().catch((error) => { console.error(error); process.exitCode = 1; });
}
