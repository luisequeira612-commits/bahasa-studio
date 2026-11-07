import test from 'node:test';
import assert from 'node:assert/strict';
import { detectGrammarPrerequisiteCandidates } from '../scripts/detect-grammar-prerequisites.mjs';
const catalogue = { level_order: ['A1', 'A2'], rules: [{ id: 'aspect-markers', markers: ['sudah', 'belum'], introduced_level: 'A2', introduced_unit: 'a2_u2' }] };
test('flags a configured marker used before its declared introduction', () => {
 const curricula = [
  { id: 'A1', units: [{ id: 'a1_u1', exercises: [{ type: 'translate', prompt: 'Saya sudah makan.' }] }] },
  { id: 'A2', units: [{ id: 'a2_u1', exercises: [{ type: 'translate', prompt: 'Saya belum pergi.' }] }, { id: 'a2_u2', exercises: [{ type: 'translate', prompt: 'Saya sudah belajar.' }] }] },
 ];
 const report = detectGrammarPrerequisiteCandidates(curricula, catalogue);
 assert.equal(report.candidate_count, 2);
 assert.deepEqual(report.candidates.map(item => item.unit_id), ['a1_u1', 'a2_u1']);
 assert.equal(report.linguistic_certification, false);
});
test('does not flag markers in or after their introduction unit', () => {
 const curricula = [{ id: 'A2', units: [
  { id: 'a2_u1', exercises: [{ prompt: 'Saya pergi.' }] },
  { id: 'a2_u2', exercises: [{ prompt: 'Saya sudah pergi.' }] },
  { id: 'a2_u3', lessons: [{ exercises: [{ prompt: 'Saya belum pulang.' }] }] },
 ] }];
 assert.equal(detectGrammarPrerequisiteCandidates(curricula, catalogue).candidate_count, 0);
});
test('uses whole-word matching and ignores unrelated substrings', () => {
 const curricula = [{ id: 'A1', units: [{ id: 'a1_u1', exercises: [{ prompt: 'Nama saya Sudi.' }, { prompt: 'Saya sudah makan.' }] }] }];
 const report = detectGrammarPrerequisiteCandidates(curricula, catalogue);
 assert.equal(report.candidate_count, 1);
 assert.deepEqual(report.candidates[0].markers, ['sudah']);
});
test('ignores malformed rules whose introduction unit cannot be found', () => {
 const curricula = [{ id: 'A2', units: [{ id: 'a2_u1', exercises: [{ prompt: 'Saya sudah makan.' }] }] }];
 assert.equal(detectGrammarPrerequisiteCandidates(curricula, catalogue).candidate_count, 0);
});
