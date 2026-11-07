import test from 'node:test';
import assert from 'node:assert/strict';
import { buildUnitContractRows, collectExercises } from '../scripts/unit-contract-report.mjs';

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
