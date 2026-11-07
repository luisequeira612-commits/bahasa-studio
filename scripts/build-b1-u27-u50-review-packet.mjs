#!/usr/bin/env node
/** Build a source-backed, read-only B1 U27-U50 editorial review packet. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { loadInlineB1Curriculum } from './load-inline-b1-curriculum.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RANGE = [27, 50];
const NOTE_PATHS = ['docs/B1_CURRICULUM_EXPANSION_PLAN.md'];
const FENCE = String.fromCharCode(96).repeat(3);

export function selectB1ReviewUnits(curriculum) {
  return (curriculum?.units ?? []).flatMap((unit) => {
    const match = String(unit?.id ?? '').match(/^b1_u(\d+)$/i);
    if (!match) return [];
    const number = Number(match[1]);
    return number >= RANGE[0] && number <= RANGE[1] ? [{ number, unit }] : [];
  });
}

export function buildB1ReviewPacket({ curriculum, notes = [], prompt = '' }) {
  const selected = selectB1ReviewUnits(curriculum);
  const counts = {
    units: selected.length,
    vocabulary_entries: selected.reduce((sum, entry) => sum + (entry.unit.vocab?.length ?? 0), 0),
    direct_exercises: selected.reduce((sum, entry) => sum + (entry.unit.exercises?.length ?? 0), 0),
    lesson_count: selected.reduce((sum, entry) => sum + (entry.unit.lessons?.length ?? 0), 0),
    lesson_exercises: selected.reduce((sum, entry) => sum + (entry.unit.lessons ?? [])
      .reduce((total, lesson) => total + (lesson.exercises?.length ?? 0), 0), 0),
  };
  const sections = [
    '# Auditoría editorial independiente B1 — U27 a U50',
    '> Paquete de solo lectura generado directamente desde el currículo activo. No modifica datos ni trackers.',
    '',
    '## Instrucciones de revisión',
    prompt.trim() || 'Revisa con cautela, evidencia y sin declarar validación nativa.',
    '',
    '## Cobertura',
    '- Nivel: B1.',
    '- Unidades: U27–U50 (24 esperadas).',
    '- Entradas de vocabulario: ' + counts.vocabulary_entries + '.',
    '- Ejercicios directos: ' + counts.direct_exercises + '.',
    '- Lecciones: ' + counts.lesson_count + '.',
    '- Ejercicios dentro de lecciones: ' + counts.lesson_exercises + '.',
    '- Total de ejercicios combinados: ' + (counts.direct_exercises + counts.lesson_exercises) + '.',
    '',
    '## Notas históricas (contexto, no autoridad)',
  ];
  for (const note of notes) sections.push('', '### ' + note.path, '', note.content.trim());
  sections.push('', '## Fuente curricular exacta', '');
  for (const entry of selected) {
    sections.push(
      '### B1 U' + String(entry.number).padStart(2, '0') + ' — ' + (entry.unit.title ?? entry.unit.id),
      '',
      'Ruta: index.html → CourseData.levels[B1] → ' + entry.unit.id,
      '',
      FENCE + 'json',
      JSON.stringify(entry.unit, null, 2),
      FENCE,
      '',
    );
  }
  return {
    markdown: sections.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n',
    coverage: counts,
  };
}

async function loadStandaloneCurriculum(path, globalName) {
  const source = await readFile(resolve(ROOT, path), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: path, timeout: 5000 });
  const curriculum = sandbox.window[globalName];
  if (!curriculum || !Array.isArray(curriculum.units)) throw new Error('Invalid curriculum: ' + path);
  return JSON.parse(JSON.stringify(curriculum));
}

async function main() {
  const outputArg = process.argv.indexOf('--output');
  const output = resolve(ROOT, outputArg >= 0 ? process.argv[outputArg + 1] : 'artifacts/deepseek-b1-u27-u50-review-packet.md');
  const [a1, a2, indexSource, prompt, ...notes] = await Promise.all([
    loadStandaloneCurriculum('curriculum-a1.js', 'BAHASA_CURRICULUM_A1'),
    loadStandaloneCurriculum('curriculum-a2.js', 'BAHASA_CURRICULUM_A2'),
    readFile(resolve(ROOT, 'index.html'), 'utf8'),
    readFile(resolve(ROOT, 'docs/DEEPSEEK_B1_U27_U50_AUDIT_PROMPT.md'), 'utf8'),
    ...NOTE_PATHS.map(async (path) => ({ path, content: await readFile(resolve(ROOT, path), 'utf8') })),
  ]);
  const curriculum = loadInlineB1Curriculum(indexSource, a1, a2);
  const packet = buildB1ReviewPacket({ curriculum, notes, prompt });
  if (packet.coverage.units !== 24) throw new Error('Expected 24 B1 units, found ' + packet.coverage.units);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, packet.markdown, 'utf8');
  console.log(JSON.stringify({ output, coverage: packet.coverage, bytes: Buffer.byteLength(packet.markdown) }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
