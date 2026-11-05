import test from 'node:test';
import assert from 'node:assert/strict';
import { buildReviewBatch, parseCsv, parseUnitList } from '../scripts/build-editorial-review-batches.mjs';

test('expands bounded unit ranges deterministically', () => {
  assert.deepEqual(parseUnitList('a1_u24-a1_u26,a1_u32'), ['a1_u24', 'a1_u25', 'a1_u26', 'a1_u32']);
});

test('builds a scoped packet grouped by unit and preserves pending states', () => {
  const rows = [
    { level: 'A1', unit_id: 'a1_u24', unit_title: 'Unidad 24', item_type: 'vocabulary', priority: 'P2', review_status: 'pending', editorial_status: 'not_reviewed' },
    { level: 'A1', unit_id: 'a1_u24', unit_title: 'Unidad 24', item_type: 'exercise', priority: 'P1', review_status: 'pending', editorial_status: 'not_reviewed' },
    { level: 'A1', unit_id: 'a1_u25', unit_title: 'Unidad 25', item_type: 'exercise', priority: 'P2', review_status: 'pending', editorial_status: 'not_reviewed' },
    { level: 'A2', unit_id: 'a2_u1', unit_title: 'Unidad 1', item_type: 'exercise', priority: 'P2', review_status: 'pending', editorial_status: 'not_reviewed' },
  ];
  const packet = buildReviewBatch(rows, { level: 'A1', units: 'a1_u24-a1_u25', priorities: ['P1', 'P2'] });
  assert.equal(packet.total_entries, 3);
  assert.deepEqual(packet.units.map((unit) => unit.unit_id), ['a1_u24', 'a1_u25']);
  assert.deepEqual(packet.units[0].counts, { total: 2, vocabulary: 1, exercise: 1, P1: 1, P2: 1, P3: 0 });
  assert.equal(packet.review_status, 'pending');
  assert.equal(packet.editorial_status, 'not_reviewed');
  assert.equal(packet.linguistic_certification, false);
});

test('supports exact unit scope and rejects invalid or empty scopes', () => {
  const rows = [{ level: 'A2', unit_id: 'a2_u5', unit_title: 'Unidad 5', item_type: 'exercise', priority: 'P2' }];
  assert.equal(buildReviewBatch(rows, { level: 'A2', units: 'A2_U5' }).total_entries, 1);
  assert.throws(() => buildReviewBatch(rows, { level: 'B1', units: 'a2_u5' }), /level must be A1 or A2/);
  assert.throws(() => buildReviewBatch(rows, { level: 'A2', units: 'a2_u99' }), /No editorial entries found/);
});

test('parses quoted CSV fields without losing commas, quotes or newlines', () => {
  const rows = parseCsv('id,prompt\n1,"Traduce, ""comer""\npor favor"\n');
  assert.equal(rows[0].prompt, 'Traduce, "comer"\npor favor');
});
