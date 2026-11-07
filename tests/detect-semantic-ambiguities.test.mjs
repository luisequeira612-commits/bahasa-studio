import test from 'node:test';
import assert from 'node:assert/strict';
import { detectSemanticAmbiguityCandidates, normalizeMeaning } from '../scripts/detect-semantic-ambiguities.mjs';

test('normalizes accents, punctuation and whitespace for exact gloss matching', () => {
  assert.equal(normalizeMeaning('  Árbol,   grande! '), 'arbol grande');
});

test('flags a distractor that maps to the exact same Spanish gloss as the target', () => {
  const report = detectSemanticAmbiguityCandidates([{
    id: 'A1',
    units: [{
      id: 'a1_u1',
      vocab: [
        { id: 'target', idn: 'besar', esp: 'besar' },
        { id: 'synonym', idn: 'mencium', esp: 'besar' },
      ],
      lessons: [{
        exercises: [{
          type: 'mc', vocabId: 'target',
          prompt: '¿Qué significa «besar»?',
          options: ['besar', 'mencium', 'hablar'],
          answer: 0,
        }],
      }],
    }],
  }]);
  assert.equal(report.candidate_count, 1);
  assert.equal(report.candidates[0].code, 'MC_EQUIVALENT_GLOSS_OPTION');
  assert.deepEqual(report.candidates[0].competing_options, [{ index: 1, text: 'mencium' }]);
  assert.equal(report.linguistic_certification, false);
});

test('does not flag a distractor with a different gloss or an exercise without vocabulary target', () => {
  const report = detectSemanticAmbiguityCandidates([{
    id: 'A1',
    units: [{
      id: 'a1_u1',
      vocab: [
        { id: 'target', idn: 'besar', esp: 'grande' },
        { id: 'other', idn: 'kecil', esp: 'pequeño' },
      ],
      exercises: [
        { type: 'mc', vocabId: 'target', options: ['besar', 'kecil'], answer: 0 },
        { type: 'mc', options: ['grande', 'pequeño'], answer: 0 },
      ],
    }],
  }]);
  assert.equal(report.candidate_count, 0);
});

test('ignores malformed multiple-choice metadata without failing the audit', () => {
  const report = detectSemanticAmbiguityCandidates([{
    id: 'A1',
    units: [{ id: 'u1', vocab: [], exercises: [{ type: 'mc', vocabId: 'missing', options: ['a', 'b'], answer: 0 }] }],
  }]);
  assert.equal(report.candidate_count, 0);
});
