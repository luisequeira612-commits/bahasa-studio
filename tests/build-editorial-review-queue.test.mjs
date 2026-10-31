import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEditorialQueue, toCsv } from '../scripts/build-editorial-review-queue.mjs';

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
  assert.equal(rows[0].priority, 'P2');
  assert.equal(rows[1].priority, 'P1');
  assert.equal(rows[1].missing_fields, 'example_indonesian;example_spanish');
  assert.ok(rows.every((row) => row.editorial_status === 'not_reviewed'));
  assert.ok(rows.every((row) => row.meaning_review === 'not_reviewed'));
  assert.ok(rows.every((row) => row.naturalness_review === 'not_reviewed'));
});

test('serializes commas, quotes and newlines as valid CSV cells', () => {
  const csv = toCsv([{ term: 'kata, "contoh"\\nbaris' }]);
  assert.equal(csv, 'term\\n"kata, ""contoh""\\nbaris"\\n');
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
