import test from 'node:test';
import assert from 'node:assert/strict';
import { buildUnitContractRows, collectExercises, getLessonStructure } from '../scripts/unit-contract-report.mjs';

test('counts B1 direct and lesson exercises together for the unit contract', () => {
  const levels = [{
    id: 'B1',
    units: [{
      id: 'b1_u1',
      title: 'Unidad de prueba',
      vocab: [{ id: 'b1v1', idn: 'Makan', esp: 'comer' }],
      reviewVocabIds: ['b1v0'],
      exercises: [
        { type: 'mc', prompt: 'Elige', options: ['Saya makan.'], answer: 0 },
        { type: 'translate_es_id', prompt: 'Traduce', answer: 'Saya makan.' },
        { type: 'order', prompt: 'Ordena', correctOrder: ['Saya', 'makan.'] },
        { type: 'write', prompt: 'Escribe', hint: 'Usa makan', modelAnswer: 'Saya makan.' },
      ],
      lessons: [{
        reviewVocabIds: ['b1v0'],
        exercises: [{ type: 'listen', prompt: 'Escucha', answer: 'Saya makan.' }],
      }],
    }],
  }];
  const rows = buildUnitContractRows(levels);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].level, 'B1');
  assert.equal(rows[0].count, 5);
  assert.deepEqual(rows[0].types, ['listen', 'mc', 'order', 'translate_es_id', 'write']);
  assert.equal(rows[0].full, 5);
  assert.equal(rows[0].own, 1);
  assert.equal(rows[0].review, true);
  assert.equal(rows[0].reviewVocab, 2);
  assert.equal(collectExercises(levels[0].units[0]).length, 5);
});


test('three authored B2 lessons are not mistaken for five because of automatic active-recall padding', () => {
  const result = getLessonStructure({ vocab: [{ id: 'a' }], lessons: [{}, {}, {}] }, 'B2');
  assert.deepEqual(result, {
    authoredLessons: 3,
    derivedLessons: 0,
    activeRecallPadding: 2,
    runtimeLessons: 5,
    meetsAuthoredTarget: false,
  });
});

test('five or six explicit lessons satisfy the authored lesson-count requirement', () => {
  for (const count of [5, 6]) {
    const result = getLessonStructure({ vocab: [], lessons: Array.from({ length: count }, () => ({})) }, 'B2');
    assert.equal(result.authoredLessons, count);
    assert.equal(result.meetsAuthoredTarget, true);
    assert.equal(result.activeRecallPadding, 0);
  }
});

test('A1 vocabulary-derived blocks and generic recall lessons remain separately reported', () => {
  const result = getLessonStructure({ vocab: Array.from({ length: 12 }, (_, i) => ({ id: String(i) })) }, 'A1');
  assert.equal(result.authoredLessons, 0);
  assert.equal(result.derivedLessons, 3);
  assert.equal(result.activeRecallPadding, 2);
  assert.equal(result.runtimeLessons, 5);
  assert.equal(result.meetsAuthoredTarget, false);
});
