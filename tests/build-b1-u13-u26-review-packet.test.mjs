import test from 'node:test';
import assert from 'node:assert/strict';
import { buildB1ReviewPacket, selectB1ReviewUnits } from '../scripts/build-b1-u13-u26-review-packet.mjs';

function unit(id, title) {
  return { id, title, vocab: [{ id: 'b1v013', idn: 'Contoh', esp: 'Ejemplo' }], exercises: [{ type: 'mc' }], lessons: [{ exercises: [{ type: 'write' }, { type: 'listen' }] }] };
}

test('selects only B1 U13-U26 and excludes other levels and out-of-range units', () => {
  const selected = selectB1ReviewUnits({ units: [
    unit('b1_u12'), unit('b1_u13'), unit('b1_u26'), unit('b1_u27'), unit('a1_u13'), unit('b1_u50'),
  ] });
  assert.deepEqual(selected.map(({ number }) => number), [13, 26]);
});

test('packet includes exact unit source, context notes, and complete scope counts', () => {
  const result = buildB1ReviewPacket({
    curriculum: { units: [unit('b1_u13', 'B1 focus'), unit('b1_u26', 'B1 block end')] },
    notes: [{ path: 'docs/history.md', content: 'Historical note, not authority.' }],
    prompt: 'Review conservatively.',
  });
  assert.equal(result.coverage.units, 2);
  assert.equal(result.coverage.vocabulary_entries, 2);
  assert.equal(result.coverage.direct_exercises, 2);
  assert.equal(result.coverage.lesson_count, 2);
  assert.equal(result.coverage.lesson_exercises, 4);
  assert.match(result.markdown, /Historical note, not authority/);
  assert.match(result.markdown, /"idn": "Contoh"/);
  assert.match(result.markdown, /Review conservatively/);
  assert.match(result.markdown, /B1 U13/);
  assert.match(result.markdown, /B1 U26/);
  assert.match(result.markdown, /Total de ejercicios combinados: 6/);
});
