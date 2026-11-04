#!/usr/bin/env node
/**
 * Build a KBBI-independent editorial review queue from authored A1/A2 data.
 * Queue items are pending human review candidates, never linguistic verdicts.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const REVIEW_DIMENSIONS = 'meaning;Spanish gloss;grammar and morphology;naturalness and register;example pair;level fit;accepted answers;exercise consistency';
const EXERCISE_REVIEW_DIMENSIONS = 'answer ambiguity;accepted alternatives;Spanish prompt clarity;vocabulary alignment;exercise consistency';

function baseReviewFields(kind, dimensions) {
  return {
    item_type: kind,
    review_status: 'pending',
    review_confidence: 'unassessed',
    editorial_status: 'not_reviewed',
    meaning_review: 'not_reviewed',
    morphology_review: 'not_reviewed',
    naturalness_review: 'not_reviewed',
    translation_review: 'not_reviewed',
    level_fit_review: 'not_reviewed',
    accepted_answers_review: 'not_reviewed',
    candidate_flags: '',
    review_dimensions: dimensions,
    reviewer: '',
    evidence_notes: '',
    proposed_correction: '',
  };
}

function exerciseAnswer(exercise) {
  if (exercise.type === 'mc' && Array.isArray(exercise.options) && Number.isInteger(exercise.answer)) {
    return exercise.options[exercise.answer] ?? '';
  }
  return typeof exercise.answer === 'string' ? exercise.answer : '';
}

export function buildEditorialQueue(curricula) {
  const rows = [];
  for (const curriculum of curricula) {
    const level = String(curriculum?.id ?? 'unknown');
    for (const [unitIndex, unit] of (curriculum?.units ?? []).entries()) {
      const unitId = String(unit.id ?? '');
      const unitTitle = String(unit.title ?? '');
      for (const [vocabIndex, word] of (unit?.vocab ?? []).entries()) {
        if (!word || typeof word !== 'object') continue;
        const missing = [];
        if (!(typeof word.id === 'string' && word.id.trim())) missing.push('vocab_id');
        if (!(typeof word.idn === 'string' && word.idn.trim())) missing.push('indonesian_form');
        if (!(typeof word.esp === 'string' && word.esp.trim())) missing.push('spanish_gloss');
        if (!(typeof word.ex === 'string' && word.ex.trim())) missing.push('example_indonesian');
        if (!(typeof word.exEsp === 'string' && word.exEsp.trim())) missing.push('example_spanish');
        const vocabId = String(word.id ?? '');
        const fallback = String(word.idn ?? '').trim().toLocaleLowerCase().replace(/\s+/g, ' ');
        rows.push({
          ...baseReviewFields('vocabulary', REVIEW_DIMENSIONS),
          review_id: [level, unitId, vocabId || `missing-id:${fallback || vocabIndex}`].join(':'),
          level, unit_id: unitId, unit_title: unitTitle,
          source_path: `${level}.units[${unitIndex}].vocab[${vocabIndex}]`,
          vocab_id: vocabId,
          indonesian_form: String(word.idn ?? ''),
          spanish_gloss: String(word.esp ?? ''),
          example_indonesian: String(word.ex ?? ''),
          example_spanish: String(word.exEsp ?? ''),
          exercise_type: '', prompt: '', canonical_answer: '',
          accepted_answers: '', options: '', linked_vocab_ids: '',
          priority: missing.length ? 'P1' : 'P2',
          priority_reason: missing.length ? 'missing_required_editorial_fields' : 'routine_vocabulary_review',
          missing_fields: missing.join(';'),
        });
      }

      const collectExercises = (exercises, prefix) => {
        for (const [exerciseIndex, exercise] of (Array.isArray(exercises) ? exercises : []).entries()) {
          if (!exercise || typeof exercise !== 'object') continue;
          const sourcePath = `${prefix}[${exerciseIndex}]`;
          const vocabIds = [
            ...(typeof exercise.vocabId === 'string' ? [exercise.vocabId] : []),
            ...(Array.isArray(exercise.vocabIds) ? exercise.vocabIds.filter((id) => typeof id === 'string') : []),
          ];
          const options = Array.isArray(exercise.options) ? exercise.options : [];
          const accepted = Array.isArray(exercise.acceptedAnswers) ? exercise.acceptedAnswers.map((item) =>
            typeof item === 'string' ? item : String(item?.text ?? '')
          ) : [];
          const flags = [];
          const prompt = String(exercise.prompt ?? '').trim();
          const canonicalAnswer = String(exerciseAnswer(exercise) ?? '').trim();
          if (exercise.type === 'translate_es_id' || exercise.type === 'write') flags.push('open_response_review');
          if (accepted.length) flags.push('accepted_alternatives_review');
          if (!prompt) flags.push('missing_prompt');
          if (!canonicalAnswer) flags.push('missing_canonical_answer');
          if (exercise.type === 'mc') {
            flags.push('distractor_quality_review');
            if (options.length < 2) flags.push('insufficient_mc_options');
            if (!Number.isInteger(exercise.answer) || exercise.answer < 0 || exercise.answer >= options.length) {
              flags.push('invalid_mc_answer_index');
            }
            const normalizedOptions = options.map((option) => String(option).trim().toLocaleLowerCase());
            if (new Set(normalizedOptions).size !== normalizedOptions.length) flags.push('duplicate_mc_options');
          }
          const priority = flags.some((flag) => [
            'open_response_review', 'accepted_alternatives_review', 'missing_prompt',
            'missing_canonical_answer', 'insufficient_mc_options', 'invalid_mc_answer_index', 'duplicate_mc_options',
          ].includes(flag)) ? 'P1' : exercise.type === 'mc' ? 'P2' : 'P3';
          const priorityReason = priority === 'P1'
            ? 'needs_attention_before_routine_review'
            : priority === 'P2' ? 'closed_choice_distractor_review' : 'routine_closed_exercise_review';
          rows.push({
            ...baseReviewFields('exercise', EXERCISE_REVIEW_DIMENSIONS),
            review_id: [level, unitId, 'exercise', sourcePath.replace(/[^a-zA-Z0-9:_-]/g, '_')].join(':'),
            level, unit_id: unitId, unit_title: unitTitle,
            source_path: sourcePath,
            vocab_id: '',
            indonesian_form: '',
            spanish_gloss: '',
            example_indonesian: '',
            example_spanish: '',
            exercise_type: String(exercise.type ?? ''),
            prompt: String(exercise.prompt ?? ''),
            canonical_answer: String(exerciseAnswer(exercise) ?? ''),
            accepted_answers: JSON.stringify(accepted),
            options: JSON.stringify(options),
            linked_vocab_ids: [...new Set(vocabIds)].join(';'),
            candidate_flags: flags.join(';'),
            priority,
            priority_reason: priorityReason,
            missing_fields: '',
          });
        }
      };
      collectExercises(unit.exercises, `${level}.units[${unitIndex}].exercises`);
      for (const [lessonIndex, lesson] of (unit?.lessons ?? []).entries()) {
        collectExercises(lesson?.exercises, `${level}.units[${unitIndex}].lessons[${lessonIndex}].exercises`);
      }
    }
  }
  const priorityRank = { P1: 1, P2: 2, P3: 3 };
  return rows.map((row, index) => ({ row, index }))
    .sort((a, b) => (priorityRank[a.row.priority] ?? 99) - (priorityRank[b.row.priority] ?? 99) || a.index - b.index)
    .map(({ row }) => row);
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function buildEditorialSummary(rows) {
  const byLevel = {};
  const byPriority = {};
  const byUnit = {};
  const byItemType = {};
  const missingFields = {};
  const candidateFlags = {};
  for (const row of rows) {
    byLevel[row.level] = (byLevel[row.level] ?? 0) + 1;
    byPriority[row.priority] = (byPriority[row.priority] ?? 0) + 1;
    byItemType[row.item_type] = (byItemType[row.item_type] ?? 0) + 1;
    const unitKey = [row.level, row.unit_id].join(':');
    byUnit[unitKey] = (byUnit[unitKey] ?? 0) + 1;
    for (const field of String(row.missing_fields ?? '').split(';').filter(Boolean)) missingFields[field] = (missingFields[field] ?? 0) + 1;
    for (const flag of String(row.candidate_flags ?? '').split(';').filter(Boolean)) candidateFlags[flag] = (candidateFlags[flag] ?? 0) + 1;
  }
  return {
    total_entries: rows.length,
    units: Object.keys(byUnit).length,
    by_level: byLevel,
    by_priority: byPriority,
    by_item_type: byItemType,
    candidate_flags: candidateFlags,
    missing_fields: missingFields,
    review_status: 'pending',
    editorial_status: 'not_reviewed',
    linguistic_certification: false,
  };
}

export function toCsv(rows) {
  const headers = rows.length ? Object.keys(rows[0]) : [
    'item_type','review_status','review_confidence','editorial_status','candidate_flags','review_dimensions',
    'reviewer','evidence_notes','proposed_correction','review_id','level','unit_id','unit_title','source_path',
    'vocab_id','indonesian_form','spanish_gloss','example_indonesian','example_spanish','exercise_type','prompt',
    'canonical_answer','accepted_answers','options','linked_vocab_ids','priority','priority_reason','missing_fields',
  ];
  return [headers.join(','), ...rows.map((row) => headers.map((key) => csvCell(row[key])).join(','))].join('\n') + '\n';
}

function loadCurriculum(source, globalName, filename) {
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename, timeout: 5000 });
  const curriculum = sandbox.window[globalName];
  if (!curriculum || !Array.isArray(curriculum.units)) throw new Error(`${filename} did not define window.${globalName}.units`);
  return curriculum;
}

async function main() {
  const args = process.argv.slice(2);
  let outputPath = 'artifacts/editorial-review-queue.csv';
  let summaryPath = null;
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--output') { outputPath = args[++i]; if (!outputPath) throw new Error('--output needs a path.'); }
    else if (args[i] === '--summary') { summaryPath = args[++i]; if (!summaryPath) throw new Error('--summary needs a path.'); }
    else if (args[i] === '--help' || args[i] === '-h') { console.log('Usage: node scripts/build-editorial-review-queue.mjs [--output PATH] [--summary PATH]'); return; }
    else throw new Error(`Unknown argument: ${args[i]}`);
  }
  const definitions = [['curriculum-a1.js', 'BAHASA_CURRICULUM_A1'], ['curriculum-a2.js', 'BAHASA_CURRICULUM_A2']];
  const curricula = [];
  for (const [filename, globalName] of definitions) curricula.push(loadCurriculum(await readFile(resolve(filename), 'utf8'), globalName, filename));
  const rows = buildEditorialQueue(curricula);
  const destination = resolve(outputPath);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, toCsv(rows), 'utf8');
  if (summaryPath) {
    const summaryDestination = resolve(summaryPath);
    await mkdir(dirname(summaryDestination), { recursive: true });
    await writeFile(summaryDestination, JSON.stringify(buildEditorialSummary(rows), null, 2) + '\n', 'utf8');
  }
  const summary = buildEditorialSummary(rows);
  console.log(JSON.stringify({ rows: rows.length, by_item_type: summary.by_item_type, candidate_flags: summary.candidate_flags, review_status: 'pending', editorial_status: 'not_reviewed', linguistic_certification: false, output: destination }, null, 2));
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  main().catch((error) => { console.error(`build-editorial-review-queue: ${error.message}`); process.exitCode = 1; });
}
