#!/usr/bin/env node
/** Build a source-backed, read-only B1 U13-U26 editorial review packet. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnglishB1Curriculum } from './load-english-b1-curriculum.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RANGE = [13, 26];
const NOTE_PATHS = ['docs/EN_US_B1_SOURCES.md'];

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
    '# Auditoría editorial independiente — Inglés americano (en-US) B1 U13–U26',
    '> Paquete de solo lectura generado directamente desde el currículo activo. No modifica datos ni trackers.',
    '',
    '## Instrucciones de revisión',
    prompt.trim() || 'Revisa con cautela, evidencia y sin declarar validación nativa.',
    '',
    '## Cobertura',
    '- Nivel: B1.',
    '- Unidades: U13–U26 (14 esperadas).',
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
      'Ruta: languages/en/curriculum/b1/index.js → GUARDI_CURRICULUM_MANIFESTS.en.B1 → ' + entry.unit.id,
      '',
      '```json',
      JSON.stringify(entry.unit, null, 2),
      '```',
      '',
    );
  }
  return {
    markdown: sections.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n',
    coverage: counts,
  };
}

async function main() {
  const outputArg = process.argv.indexOf('--output');
  const output = resolve(ROOT, outputArg >= 0 ? process.argv[outputArg + 1] : 'artifacts/deepseek-b1-u13-u26-review-packet.md');
  const [curriculum, prompt, ...notes] = await Promise.all([
    loadEnglishB1Curriculum(ROOT),
    readFile(resolve(ROOT, 'docs/DEEPSEEK_B1_U13_U26_AUDIT_PROMPT.md'), 'utf8'),
    ...NOTE_PATHS.map(async (path) => ({ path, content: await readFile(resolve(ROOT, path), 'utf8') })),
  ]);
  const packet = buildB1ReviewPacket({ curriculum, notes, prompt });
  if (packet.coverage.units !== 14) throw new Error('Expected 14 English B1 units, found ' + packet.coverage.units);
  if (packet.coverage.vocabulary_entries !== 286) throw new Error('Unexpected English B1 vocabulary count: ' + packet.coverage.vocabulary_entries);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, packet.markdown, 'utf8');
  console.log(JSON.stringify({ output, coverage: packet.coverage, bytes: Buffer.byteLength(packet.markdown) }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
