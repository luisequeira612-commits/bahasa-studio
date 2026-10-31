import test from 'node:test';
import assert from 'node:assert/strict';
import { auditCurriculum } from '../scripts/audit-curriculum-quality.mjs';

test('accepts a structurally consistent curriculum without external dictionary access', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{
      id: 'u1',
      title: 'Unit 1',
      vocab: [{ id: 'v1', idn: 'makan', esp: 'comer', ex: 'Saya makan.', exEsp: 'Yo como.' }],
      exercises: [
        { vocabId: 'v1', type: 'mc', prompt: 'Choose', options: ['comer', 'beber'], answer: 0 },
        { vocabId: 'v1', type: 'order', prompt: 'Order', words: ['Saya', 'makan'], correctOrder: ['Saya', 'makan'] },
      ],
      lessons: [{ vocabIds: ['v1'], exercises: [{ vocabId: 'v1' }] }],
    }],
  });
  assert.equal(report.error_count, 0);
  assert.equal(report.vocabulary_count, 1);
});

test('detects duplicate IDs and unresolved vocabulary references', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'One', vocab: [{ id: 'same', idn: 'satu', esp: 'uno' }], exercises: [{ vocabId: 'missing', type: 'write', prompt: 'Write' }] },
      { id: 'u2', title: 'Two', vocab: [{ id: 'same', idn: 'dua', esp: 'dos' }], exercises: [] },
    ],
  });
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_ID_DUPLICATE'));
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_REFERENCE_MISSING'));
  assert.ok(report.error_count >= 2);
});

test('detects invalid multiple-choice and ordering structures', () => {
  const report = auditCurriculum({
    id: 'A2',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [],
      exercises: [
        { type: 'mc', prompt: 'Pick', options: ['a', 'b'], answer: 4 },
        { type: 'order', prompt: 'Order', words: ['a', 'b'], correctOrder: ['a', 'c'] },
      ],
    }],
  });
  assert.ok(report.issues.some((item) => item.code === 'MC_ANSWER_OUT_OF_RANGE'));
  assert.ok(report.issues.some((item) => item.code === 'ORDER_TOKEN_MISMATCH'));
});

test('reports incomplete examples as warnings, not linguistic verdicts', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{ id: 'u1', title: 'One', vocab: [{ id: 'v1', idn: 'baik', esp: 'bueno' }], exercises: [] }],
  });
  assert.equal(report.error_count, 0);
  assert.equal(report.warning_count, 1);
  assert.equal(report.issues[0].code, 'VOCAB_EXAMPLE_INCOMPLETE');
});
