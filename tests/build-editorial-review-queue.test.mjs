import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEditorialQueue, buildEditorialSummary, toCsv } from '../scripts/build-editorial-review-queue.mjs';

test('builds one neutral editorial work item per vocabulary entry', () => {
  const rows = buildEditorialQueue([{ id: 'A1', units: [{ id: 'a1_u1', title: 'Presentaciones', vocab: [
    { id: 'v1', idn: 'nama', esp: 'nombre', ex: 'Nama saya Ana.', exEsp: 'Me llamo Ana.' },
    { id: 'v2', idn: 'asal', esp: 'origen' },
  ] }] }]);
  assert.equal(rows.length, 2);
  const complete = rows.find((row) => row.vocab_id === 'v1');
  const incomplete = rows.find((row) => row.vocab_id === 'v2');
  assert.equal(rows[0].review_id, 'A1:a1_u1:v2');
  assert.equal(rows[1].review_id, 'A1:a1_u1:v1');
  assert.equal(rows[0].priority, 'P1');
  assert.equal(complete.priority, 'P2');
  assert.equal(incomplete.priority, 'P1');
  assert.equal(incomplete.missing_fields, 'example_indonesian;example_spanish');
  assert.ok(rows.every((row) => row.editorial_status === 'not_reviewed'));
  assert.ok(rows.every((row) => row.review_status === 'pending'));
  assert.ok(rows.every((row) => row.review_confidence === 'unassessed'));
  assert.ok(rows.every((row) => row.meaning_review === 'not_reviewed'));
  assert.ok(rows.every((row) => row.naturalness_review === 'not_reviewed'));
});

test('serializes commas, quotes and newlines as valid CSV cells', () => {
  const csv = toCsv([{ term: 'kata, "contoh"\nbaris' }]);
  assert.equal(csv, 'term\n"kata, ""contoh""\nbaris"\n');
});

test('does not infer linguistic approval from populated curriculum fields', () => {
  const [row] = buildEditorialQueue([{ id: 'A2', units: [{ id: 'u1', title: 'Tema', vocab: [
    { id: 'v1', idn: 'makan', esp: 'comer', ex: 'Saya makan.', exEsp: 'Yo como.' },
  ] }] }]);
  assert.equal(row.editorial_status, 'not_reviewed');
  assert.equal(row.translation_review, 'not_reviewed');
  assert.equal(row.level_fit_review, 'not_reviewed');
});

test('review IDs stay stable when vocabulary entries are reordered', () => {
  const unit = { id: 'a1_u3', title: 'Origen', vocab: [
    { id: 'v-origin', idn: 'asal', esp: 'origen', ex: 'Saya dari sini.', exEsp: 'Soy de aquí.' },
    { id: 'v-city', idn: 'kota', esp: 'ciudad', ex: 'Ini kota.', exEsp: 'Esta es una ciudad.' },
  ] };
  const first = buildEditorialQueue([{ id: 'A1', units: [unit] }]);
  const second = buildEditorialQueue([{ id: 'A1', units: [{ ...unit, vocab: [...unit.vocab].reverse() }] }]);
  const ids = (rows) => rows.map((row) => row.review_id).sort();
  assert.deepEqual(ids(first), ids(second));
  assert.equal(new Set(ids(first)).size, 2);
});

test('uses a deterministic fallback when a vocabulary ID is missing', () => {
  const [row] = buildEditorialQueue([{ id: 'A1', units: [{ id: 'a1_u1', vocab: [{ idn: 'nama', esp: 'nombre' }] }] }]);
  assert.equal(row.review_id, 'A1:a1_u1:missing-id:nama');
  assert.equal(row.priority, 'P1');
});

test('adds pending review candidates for unit and lesson exercises without judging correctness', () => {
  const rows = buildEditorialQueue([{ id: 'A1', units: [{
    id: 'u1', title: 'Unidad', vocab: [{ id: 'v1', idn: 'makan', esp: 'comer', ex: 'Saya makan.', exEsp: 'Yo como.' }],
    exercises: [{ type: 'translate_es_id', prompt: 'Traduce: comer', answer: 'makan', vocabId: 'v1', acceptedAnswers: ['menyantap'] }],
    lessons: [{ exercises: [{ type: 'mc', prompt: 'Elige', options: ['makan', 'minum'], answer: 0, vocabIds: ['v1'] }] }],
  }] }]);
  const exercises = rows.filter((row) => row.item_type === 'exercise');
  assert.equal(exercises.length, 2);
  assert.ok(exercises.every((row) => row.review_status === 'pending' && row.review_confidence === 'unassessed'));
  assert.equal(exercises[0].canonical_answer, 'makan');
  assert.equal(exercises[0].accepted_answers, '["menyantap"]');
  assert.equal(exercises[0].candidate_flags, 'open_response_review;accepted_alternatives_review');
  assert.equal(exercises[0].priority, 'P1');
  assert.equal(exercises[1].canonical_answer, 'makan');
  assert.equal(exercises[1].linked_vocab_ids, 'v1');
  assert.equal(exercises[1].priority, 'P2');
  assert.equal(exercises[1].priority_reason, 'closed_choice_distractor_review');
  assert.match(exercises[0].source_path, /\.exercises\[0\]$/);
  assert.match(exercises[1].source_path, /\.lessons\[0\]\.exercises\[0\]$/);
});

test('summarizes vocabulary and exercise review workload separately', () => {
  const rows = buildEditorialQueue([
    { id: 'A1', units: [{ id: 'a1_u1', vocab: [{ id: 'v1', idn: 'nama', esp: 'nombre', ex: 'Nama saya Ana.', exEsp: 'Me llamo Ana.' }], exercises: [
      { type: 'write', prompt: 'Escribe', answer: 'Nama saya Ana.', vocabId: 'v1' },
    ] }] },
    { id: 'A2', units: [{ id: 'a2_u1', vocab: [{ id: 'v2', idn: 'pergi', esp: 'ir', ex: 'Saya pergi.', exEsp: 'Yo voy.' }] }] },
  ]);
  const summary = buildEditorialSummary(rows);
  assert.equal(summary.total_entries, 3);
  assert.deepEqual(summary.by_item_type, { vocabulary: 2, exercise: 1 });
  assert.deepEqual(summary.by_priority, { P1: 1, P2: 2 });
  assert.deepEqual(summary.candidate_flags, { open_response_review: 1 });
  assert.equal(summary.review_status, 'pending');
  assert.equal(summary.editorial_status, 'not_reviewed');
  assert.equal(summary.linguistic_certification, false);
});

test('prioritizes exercise review without issuing linguistic verdicts', () => {
  const rows = buildEditorialQueue([{ id: 'A1', units: [{ id: 'u1', title: 'Unidad', vocab: [], exercises: [
    { type: 'mc', prompt: 'Elige', options: ['uno', 'dos'], answer: 0 },
    { type: 'match', prompt: 'Relaciona', answer: 'pares' },
    { type: 'write', prompt: 'Escribe', answer: 'una frase' },
    { type: 'mc', prompt: 'Elige', options: ['uno', 'uno'], answer: 4 },
  ] }] }]);
  assert.deepEqual(rows.map((row) => row.priority), ['P1', 'P1', 'P2', 'P3']);
  const malformed = rows.find((row) => row.candidate_flags.includes('invalid_mc_answer_index'));
  assert.ok(malformed.candidate_flags.includes('duplicate_mc_options'));
  assert.equal(malformed.review_status, 'pending');
  assert.equal(malformed.review_confidence, 'unassessed');
  assert.equal(malformed.editorial_status, 'not_reviewed');
  assert.equal(rows.find((row) => row.exercise_type === 'write').priority_reason, 'needs_attention_before_routine_review');
  assert.equal(rows.find((row) => row.exercise_type === 'match').priority_reason, 'routine_closed_exercise_review');
});
