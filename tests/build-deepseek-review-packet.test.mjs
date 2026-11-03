import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDeepSeekReviewPacket, selectReviewUnits } from '../scripts/build-deepseek-review-packet.mjs';

function unit(id, title) {
  return { id, title, vocab: [{ id: 'v1', idn: 'makan', esp: 'comer' }], lessons: [{ id: 'l1', exercises: [{ type: 'mc' }] }] };
}

test('selects only A1 U24-U32 and A2 U1-U8', () => {
  const selected = selectReviewUnits([
    { id: 'A1', units: [unit('a1_u23'), unit('a1_u24'), unit('a1_u32'), unit('a1_u33')] },
    { id: 'A2', units: [unit('a2_u1'), unit('a2_u8'), unit('a2_u9')] },
  ]);
  assert.deepEqual(selected.map(({ level, number }) => [level, number]), [
    ['A1', 24], ['A1', 32], ['A2', 1], ['A2', 8],
  ]);
});

test('packet includes unit data and audit notes', () => {
  const result = buildDeepSeekReviewPacket({
    curricula: [
      { id: 'A1', units: [unit('a1_u24', 'A1 focus')] },
      { id: 'A2', units: [unit('a2_u1', 'A2 focus')] },
    ],
    notes: [{ path: 'docs/previous.md', content: 'Prior editorial observation.' }],
    prompt: 'Be conservative.',
  });
  assert.equal(result.unit_count, 2);
  assert.equal(result.coverage.A1, 1);
  assert.equal(result.coverage.A2, 1);
  assert.match(result.markdown, /Prior editorial observation/);
  assert.match(result.markdown, /"idn": "makan"/);
  assert.match(result.markdown, /Be conservative/);
  assert.match(result.markdown, /A1 U24/);
  assert.match(result.markdown, /A2 U01/);
});
