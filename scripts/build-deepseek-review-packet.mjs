#!/usr/bin/env node
/**
 * Build a source-backed, read-only first-review packet for free/manual DeepSeek review.
 * Extracts A1 U24-U32 and A2 U1-U8 plus existing audit notes.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SCOPE = { A1: [24, 32], A2: [1, 8] };
const NOTE_PATHS = [
  'docs/A1-UNITS-26-32-EDITORIAL-AUDIT.md',
  'docs/A1_EDITORIAL_SCREEN_U24_U32.md',
  'docs/A1_LANGUAGE_AUDIT_UNITS_24_32.md',
  'docs/A2-UNITS-01-04-AUDIT.md',
  'docs/A2-UNITS-05-08-AUDIT.md',
  'docs/A2_LANGUAGE_AUDIT_PLAN.md',
];

export function selectReviewUnits(curricula) {
  const selected = [];
  for (const curriculum of curricula) {
    const level = String(curriculum?.id ?? '');
    const range = SCOPE[level];
    if (!range) continue;
    for (const unit of curriculum.units ?? []) {
      const match = String(unit?.id ?? '').match(/_u(\d+)$/i);
      if (!match) continue;
      const number = Number(match[1]);
      if (number >= range[0] && number <= range[1]) selected.push({ level, number, unit });
    }
  }
  return selected;
}

export function buildDeepSeekReviewPacket({ curricula, notes = [], prompt = '' }) {
  const selected = selectReviewUnits(curricula);
  const counts = Object.fromEntries(['A1', 'A2'].map((level) => [
    level, selected.filter((entry) => entry.level === level).length,
  ]));
  const sections = [
    '# Paquete de auditoría independiente Bahasa Studio',
    '> Snapshot generado desde el código fuente. Solo análisis; no modifica currículo ni trackers.',
    '',
    '## Instrucciones para DeepSeek',
    prompt.trim() || 'Revisa con cautela, evidencia y sin certificar naturalidad nativa.',
    '',
    '## Cobertura incluida',
    '- A1: ' + counts.A1 + ' unidades (U24-U32 esperadas).',
    '- A2: ' + counts.A2 + ' unidades (U1-U8 esperadas).',
    '- Total: ' + selected.length + ' unidades.',
    '- Cada unidad incluye vocabulario, lecciones y ejercicios en JSON.',
    '',
    '## Auditorías previas (contexto, no autoridad)',
  ];
  for (const note of notes) sections.push('', '### ' + note.path, '', note.content.trim());
  sections.push('', '## Fuente curricular exacta', '');
  for (const entry of selected) {
    sections.push(
      '### ' + entry.level + ' U' + String(entry.number).padStart(2, '0') + ' — ' + (entry.unit.title ?? entry.unit.id),
      '',
      'Ruta: ' + (entry.level === 'A1' ? 'curriculum-a1.js' : 'curriculum-a2.js') + ' → ' + entry.unit.id,
      '',
      '~~~json',
      JSON.stringify(entry.unit, null, 2),
      '~~~',
      '',
    );
  }
  return {
    markdown: sections.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n',
    coverage: counts,
    unit_count: selected.length,
  };
}

async function loadCurriculum(path, globalName) {
  const source = await readFile(resolve(ROOT, path), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: path, timeout: 5000 });
  const curriculum = sandbox.window[globalName];
  if (!curriculum || !Array.isArray(curriculum.units)) throw new Error('Invalid curriculum: ' + path);
  return curriculum;
}

async function main() {
  const outputArg = process.argv.indexOf('--output');
  const output = resolve(ROOT, outputArg >= 0 ? process.argv[outputArg + 1] : 'artifacts/deepseek-first-review-packet.md');
  const [a1, a2, prompt, ...notes] = await Promise.all([
    loadCurriculum('curriculum-a1.js', 'BAHASA_CURRICULUM_A1'),
    loadCurriculum('curriculum-a2.js', 'BAHASA_CURRICULUM_A2'),
    readFile(resolve(ROOT, 'docs/DEEPSEEK_FIRST_AUDIT_PROMPT.md'), 'utf8'),
    ...NOTE_PATHS.map(async (path) => ({ path, content: await readFile(resolve(ROOT, path), 'utf8') })),
  ]);
  const packet = buildDeepSeekReviewPacket({ curricula: [a1, a2], notes, prompt });
  if (packet.coverage.A1 !== 9 || packet.coverage.A2 !== 8) {
    throw new Error('Unexpected scope: A1=' + packet.coverage.A1 + ', A2=' + packet.coverage.A2);
  }
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, packet.markdown, 'utf8');
  console.log(JSON.stringify({ output, coverage: packet.coverage, unit_count: packet.unit_count, bytes: Buffer.byteLength(packet.markdown) }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
