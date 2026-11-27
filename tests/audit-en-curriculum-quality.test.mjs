import test from 'node:test';
import assert from 'node:assert/strict';
import { auditEnglishCurriculum, buildEnglishQualityReport } from '../scripts/audit-en-curriculum-quality.mjs';

test('English-specific audit reads the published A1, A2 and B1 manifests', async () => {
  const report = await buildEnglishQualityReport();
  assert.equal(report.language, 'en-US');
  assert.equal(report.linguistic_certification, false);
  assert.deepEqual(report.levels.map(level => [level.level, level.unit_count]), [['A1',32],['A2',40],['B1',52]]);
  const b1 = report.levels.find(level => level.level === 'B1');
  assert.equal(b1.vocabulary_entries, 1012);
  assert.equal(b1.lesson_count, 260);
  assert.equal(b1.total_exercise_count, 1040);
  assert.equal(report.summary.errors, 0, JSON.stringify(report.levels.map(level => ({level:level.level,issues:level.issues.filter(x=>x.severity==='error').slice(0,15)}))));
  assert.ok(report.limitations.some(item => item.includes('Does not certify grammar')));
});

test('English audit detects malformed vocabulary and exercise references', () => {
  const report = auditEnglishCurriculum({
    id: 'A1', totalUnits: 1, publishedUnits: [1],
    units: [{
      unitNumber: 1, id: 'en_a1_u1', title: 'Unit',
      vocab: [{ id: 'word-1', target: '', esp: 'glosa', ex: 'Example.', exEsp: 'Ejemplo.' }],
      exercises: [{ type: 'mc', prompt: 'Choose', vocabId: 'missing', options: ['a','b'], answer: 4 }],
      lessons: [{
        title: 'Lesson', objective: 'Objective', grammar: 'Grammar',
        vocabIds: ['missing'], reviewVocabIds: [],
        exercises: [{ type: 'order', prompt: 'Order', vocabId: 'word-1', words: ['one','two'], correctOrder: ['one'] }],
      }],
    }],
  });
  assert.ok(report.issues.some(item => item.code === 'VOCAB_FIELD_MISSING'));
  assert.ok(report.issues.some(item => item.code === 'EXERCISE_VOCAB_REFERENCE_UNKNOWN'));
  assert.ok(report.issues.some(item => item.code === 'MC_ANSWER_INVALID'));
  assert.ok(report.issues.some(item => item.code === 'LESSON_VOCAB_REFERENCE_UNKNOWN'));
  assert.ok(report.issues.some(item => item.code === 'ORDER_TOKEN_MISMATCH'));
});
