'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'curriculum-a1.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context);
const a1 = context.window.BAHASA_CURRICULUM_A1;

test('A1 U24-U32 retain complete bilingual examples and core exercise modalities', () => {
  assert.ok(a1, 'A1 curriculum must load from its extracted data file');
  const units = a1.units.filter(unit => /^a1_u(?:2[4-9]|3[0-2])$/.test(unit.id));
  assert.deepEqual(Array.from(units, unit => unit.id),
    ['a1_u24', 'a1_u25', 'a1_u26', 'a1_u27', 'a1_u28', 'a1_u29', 'a1_u30', 'a1_u31', 'a1_u32']);

  const requiredTypes = ['mc', 'translate_es_id', 'listen', 'order', 'write'];
  for (const unit of units) {
    assert.equal(unit.vocab.length, 10, unit.id + ' should retain its ten tracked vocabulary entries');
    for (const word of unit.vocab) {
      assert.equal(typeof word.ex, 'string', unit.id + ' ' + word.id + ' needs an Indonesian example');
      assert.ok(word.ex.trim(), unit.id + ' ' + word.id + ' Indonesian example must not be empty');
      assert.equal(typeof word.exEsp, 'string', unit.id + ' ' + word.id + ' needs a Spanish example');
      assert.ok(word.exEsp.trim(), unit.id + ' ' + word.id + ' Spanish example must not be empty');
    }

    const exercises = unit.exercises || [];
    assert.ok(exercises.length >= 8, unit.id + ' should retain its authored practice set');
    const types = new Set(exercises.map(exercise => exercise.type));
    for (const type of requiredTypes) {
      assert.ok(types.has(type), unit.id + ' should include ' + type + ' practice');
    }
  }
});


test('A1 U24-U25 exercise wording stays aligned with corrected vocabulary glosses', () => {
  const unit24 = a1.units.find(unit => unit.id === 'a1_u24');
  const eraserExercise = unit24.exercises.find(exercise => exercise.vocabId === 'v388' && exercise.type === 'order');
  assert.ok(eraserExercise);
  assert.match(eraserExercise.prompt, /goma de borrar/i);
  assert.match(eraserExercise.explanation, /goma de borrar/i);
  assert.doesNotMatch(eraserExercise.prompt + ' ' + eraserExercise.explanation, /borrador/i);

  const unit25 = a1.units.find(unit => unit.id === 'a1_u25');
  const painting = unit25.vocab.find(word => word.id === 'v399');
  const paintingExercise = unit25.exercises.find(exercise => exercise.vocabId === 'v399' && exercise.type === 'mc');
  assert.equal(painting.esp, 'Pintar');
  assert.match(painting.exEsp, /Me gusta pintar/);
  assert.match(paintingExercise.explanation, /significa pintar/i);
  assert.doesNotMatch(paintingExercise.explanation, /hacer dibujos/i);
});
