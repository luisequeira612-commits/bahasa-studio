import test from 'node:test';
import assert from 'node:assert/strict';
import { buildB1ReviewPacket, selectB1ReviewUnits } from '../scripts/build-b1-u1-u12-review-packet.mjs';

function unit(id, title) {
  return { id, title, vocab: [{ id: 'b1v001', idn: 'Dibaca', esp: 'Leído/a' }], exercises: [{ type: 'mc' }], lessons: [{ exercises: [{ type: 'write' }] }] };
}

test('selects only B1 U1-U12 and ignores other levels and out-of-range units', () => {
  const selected = selectB1ReviewUnits({ units: [
    unit('b1_u1'), unit('b1_u12'), unit('b1_u13'), unit('a1_u1'), unit('b1_u0'), unit('b1_u50'),
  ] });
  assert.deepEqual(selected.map(({ number }) => number), [1, 12]);
});

test('packet includes the exact unit source, review notes and scope counts', () => {
  const result = buildB1ReviewPacket({
    curriculum: { units: [unit('b1_u1', 'B1 focus'), unit('b1_u12', 'B1 final block')] },
    notes: [{ path: 'docs/history.md', content: 'Historical note, not authority.' }],
    prompt: 'Review conservatively.',
  });
  assert.equal(result.coverage.units, 2);
  assert.equal(result.coverage.vocabulary_entries, 2);
  assert.equal(result.coverage.direct_exercises, 2);
  assert.equal(result.coverage.lesson_count, 2);
  assert.equal(result.coverage.lesson_exercises, 2);
  assert.match(result.markdown, /Historical note, not authority/);
  assert.match(result.markdown, /"idn": "Dibaca"/);
  assert.match(result.markdown, /Review conservatively/);
  assert.match(result.markdown, /B1 U01/);
  assert.match(result.markdown, /B1 U12/);
  assert.match(result.markdown, /Total de ejercicios combinados: 2/);
});
