import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEditorialQueue, buildEditorialSummary, toCsv } from '../scripts/build-editorial-review-queue.mjs';

test('builds one neutral editorial work item per vocabulary entry', () => {
  const rows = buildEditorialQueue([{
    id: 'A1',
    units: [{
      id: 'a1_u1',
      title: 'Presentaciones',
      vocab: [
        { id: 'v1', idn: 'nama', esp: 'nombre', ex: 'Nama saya Ana.', exEsp: 'Me llamo Ana.' },
        { id: 'v2', idn: 'asal', esp: 'origen' },
      ],
    }],
  }]);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].review_id, 'A1:a1_u1:v1');
  assert.equal(rows[1].review_id, 'A1:a1_u1:v2');
  assert.equal(rows[0].priority, 'P2');
  assert.equal(rows[1].priority, 'P1');
  assert.equal(rows[1].missing_fields, 'example_indonesian;example_spanish');
  assert.ok(rows.every((row) => row.editorial_status === 'not_reviewed'));
  assert.ok(rows.every((row) => row.meaning_review === 'not_reviewed'));
  assert.ok(rows.every((row) => row.naturalness_review === 'not_reviewed'));
});

test('serializes commas, quotes and newlines as valid CSV cells', () => {
  const csv = toCsv([{ term: 'kata, "contoh"\nbaris' }]);
  assert.equal(csv, 'term\n"kata, ""contoh""\nbaris"\n');
});

test('does not infer linguistic approval from populated curriculum fields', () => {
  const [row] = buildEditorialQueue([{
    id: 'A2',
    units: [{ id: 'u1', title: 'Tema', vocab: [{ id: 'v1', idn: 'makan', esp: 'comer', ex: 'Saya makan.', exEsp: 'Yo como.' }] }],
  }]);
  assert.equal(row.editorial_status, 'not_reviewed');
  assert.equal(row.translation_review, 'not_reviewed');
  assert.equal(row.level_fit_review, 'not_reviewed');
});


test('review IDs stay stable when vocabulary entries are reordered', () => {
  const unit = {
    id: 'a1_u3',
    title: 'Origen',
    vocab: [
      { id: 'v-origin', idn: 'asal', esp: 'origen', ex: 'Saya dari sini.', exEsp: 'Soy de aquí.' },
      { id: 'v-city', idn: 'kota', esp: 'ciudad', ex: 'Ini kota.', exEsp: 'Esta es una ciudad.' },
    ],
  };
  const first = buildEditorialQueue([{ id: 'A1', units: [unit] }]);
  const second = buildEditorialQueue([{ id: 'A1', units: [{ ...unit, vocab: [...unit.vocab].reverse() }] }]);
  const ids = (rows) => rows.map((row) => row.review_id).sort();
  assert.deepEqual(ids(first), ids(second));
  assert.equal(new Set(ids(first)).size, 2);
});

test('uses a deterministic fallback when a vocabulary ID is missing', () => {
  const [row] = buildEditorialQueue([{
    id: 'A1',
    units: [{ id: 'a1_u1', vocab: [{ idn: 'nama', esp: 'nombre' }] }],
  }]);
  assert.equal(row.review_id, 'A1:a1_u1:missing-id:nama');
  assert.equal(row.priority, 'P1');
});


test('summarizes editorial workload without treating completeness as approval', () => {
  const rows = buildEditorialQueue([
    { id: 'A1', units: [{ id: 'a1_u1', vocab: [
      { id: 'v1', idn: 'nama', esp: 'nombre', ex: 'Nama saya Ana.', exEsp: 'Me llamo Ana.' },
      { id: 'v2', idn: 'asal', esp: 'origen' },
    ] }] },
    { id: 'A2', units: [{ id: 'a2_u1', vocab: [
      { id: 'v3', idn: 'pergi', esp: 'ir', ex: 'Saya pergi.', exEsp: 'Yo voy.' },
    ] }] },
  ]);
  assert.deepEqual(buildEditorialSummary(rows), {
    total_entries: 3,
    units: 2,
    by_level: { A1: 2, A2: 1 },
    by_priority: { P2: 2, P1: 1 },
    missing_fields: { example_indonesian: 1, example_spanish: 1 },
    editorial_status: 'not_reviewed',
    linguistic_certification: false,
  });
});
