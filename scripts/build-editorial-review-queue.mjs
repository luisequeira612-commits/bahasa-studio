#!/usr/bin/env node
/**
 * Build a KBBI-independent editorial review queue from the authored A1/A2 data.
 * This creates work items only; it never changes linguistic/KBBI review statuses.
 *
 * Usage: node scripts/build-editorial-review-queue.mjs [--output PATH]
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const REVIEW_DIMENSIONS = 'meaning;Spanish gloss;grammar and morphology;naturalness and register;example pair;level fit;accepted answers;exercise consistency';

export function buildEditorialQueue(curricula) {
  const rows = [];
  for (const curriculum of curricula) {
    const level = String(curriculum?.id ?? 'unknown');
    for (const [unitIndex, unit] of (curriculum?.units ?? []).entries()) {
      for (const [vocabIndex, word] of (unit?.vocab ?? []).entries()) {
        if (!word || typeof word !== 'object') continue;
        const hasId = typeof word.id === 'string' && word.id.trim();
        const hasForm = typeof word.idn === 'string' && word.idn.trim();
        const hasGloss = typeof word.esp === 'string' && word.esp.trim();
        const hasExample = typeof word.ex === 'string' && word.ex.trim();
        const hasExampleTranslation = typeof word.exEsp === 'string' && word.exEsp.trim();
        const missing = [];
        if (!hasId) missing.push('vocab_id');
        if (!hasForm) missing.push('indonesian_form');
        if (!hasGloss) missing.push('spanish_gloss');
        if (!hasExample) missing.push('example_indonesian');
        if (!hasExampleTranslation) missing.push('example_spanish');
        rows.push({
          level,
          unit_id: String(unit.id ?? ''),
          unit_title: String(unit.title ?? ''),
          source_path: `${level}.units[${unitIndex}].vocab[${vocabIndex}]`,
          vocab_id: String(word.id ?? ''),
          indonesian_form: String(word.idn ?? ''),
          spanish_gloss: String(word.esp ?? ''),
          example_indonesian: String(word.ex ?? ''),
          example_spanish: String(word.exEsp ?? ''),
          priority: missing.length ? 'P1' : 'P2',
          missing_fields: missing.join(';'),
          editorial_status: 'not_reviewed',
          meaning_review: 'not_reviewed',
          morphology_review: 'not_reviewed',
          naturalness_review: 'not_reviewed',
          translation_review: 'not_reviewed',
          level_fit_review: 'not_reviewed',
          accepted_answers_review: 'not_reviewed',
          reviewer: '',
          evidence_notes: '',
          proposed_correction: '',
          review_dimensions: REVIEW_DIMENSIONS,
        });
      }
    }
  }
  return rows;
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function toCsv(rows) {
  const headers = rows.length ? Object.keys(rows[0]) : [
    'level','unit_id','unit_title','source_path','vocab_id','indonesian_form','spanish_gloss',
    'example_indonesian','example_spanish','priority','missing_fields','editorial_status',
    'meaning_review','morphology_review','naturalness_review','translation_review',
    'level_fit_review','accepted_answers_review','reviewer','evidence_notes',
    'proposed_correction','review_dimensions',
  ];
  return [headers.join(','), ...rows.map((row) => headers.map((key) => csvCell(row[key])).join(','))].join('\\n') + '\\n';
}

function loadCurriculum(source, globalName, filename) {
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename, timeout: 5000 });
  const curriculum = sandbox.window[globalName];
  if (!curriculum || !Array.isArray(curriculum.units)) {
    throw new Error(`${filename} did not define window.${globalName}.units`);
  }
  return curriculum;
}

async function main() {
  const args = process.argv.slice(2);
  let outputPath = 'artifacts/editorial-review-queue.csv';
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--output') {
      outputPath = args[++i];
      if (!outputPath) throw new Error('--output needs a path.');
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log('Usage: node scripts/build-editorial-review-queue.mjs [--output PATH]');
      return;
    } else throw new Error(`Unknown argument: ${args[i]}`);
  }
  const definitions = [
    ['curriculum-a1.js', 'BAHASA_CURRICULUM_A1'],
    ['curriculum-a2.js', 'BAHASA_CURRICULUM_A2'],
  ];
  const curricula = [];
  for (const [filename, globalName] of definitions) {
    curricula.push(loadCurriculum(await readFile(resolve(filename), 'utf8'), globalName, filename));
  }
  const rows = buildEditorialQueue(curricula);
  const csv = toCsv(rows);
  const destination = resolve(outputPath);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, csv, 'utf8');
  const p1 = rows.filter((row) => row.priority === 'P1').length;
  console.log(JSON.stringify({
    rows: rows.length,
    priority_1_missing_data: p1,
    priority_2_standard_review: rows.length - p1,
    editorial_status: 'not_reviewed',
    linguistic_certification: false,
    output: destination,
  }, null, 2));
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  main().catch((error) => {
    console.error(`build-editorial-review-queue: ${error.message}`);
    process.exitCode = 1;
  });
}
