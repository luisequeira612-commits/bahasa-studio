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


test('A1 U31 hair translation and U32 thank-you response stay linked to the correct vocabulary', () => {
  const unit31 = a1.units.find(unit => unit.id === 'a1_u31');
  const hair = unit31.vocab.find(word => word.id === 'v460');
  const hairExercise = unit31.exercises.find(exercise =>
    exercise.type === 'translate_es_id' && /cabello|pelo/i.test(exercise.prompt || '')
  );
  assert.ok(hair);
  assert.equal(hair.idn, 'Rambut');
  assert.ok(hairExercise, 'U31 must retain a translation exercise for cabello/pelo');
  assert.equal(hairExercise.vocabId, hair.id);
  assert.equal(hairExercise.answer, hair.idn);

  const unit32 = a1.units.find(unit => unit.id === 'a1_u32');
  const gratitude = unit32.vocab.find(word => word.id === 'v468');
  const gratitudeExercise = unit32.exercises.find(exercise =>
    exercise.vocabId === 'v468' && exercise.type === 'mc'
  );
  assert.ok(gratitude);
  assert.equal(gratitude.idn, 'Sama-sama');
  assert.ok(gratitudeExercise, 'U32 must assess the response to terima kasih');
  assert.match(gratitudeExercise.prompt, /responde a «terima kasih»/i);
  assert.equal(gratitudeExercise.options[gratitudeExercise.answer], 'Sama-sama');
  assert.match(gratitudeExercise.explanation, /respuesta común/i);
});


test('A1 U24-U32 lesson plans explicitly introduce every tracked vocabulary item', () => {
  const units = a1.units.filter(unit => /^a1_u(?:2[4-9]|3[0-2])$/.test(unit.id));
  for (const unit of units) {
    const planText = (unit.lessonPlans || []).flatMap(plan => [plan.title, plan.objective, plan.grammar])
      .filter(Boolean).join(' ').toLocaleLowerCase();
    for (const word of unit.vocab) {
      assert.ok(planText.includes(word.idn.toLocaleLowerCase()),
        unit.id + ' lesson plans should introduce or explain ' + word.idn);
    }
  }
});


test('A1 U24-U32 multiple-choice audio stimuli are visible as text when no player is available', () => {
  const units = a1.units.filter(unit => /^a1_u(?:2[4-9]|3[0-2])$/.test(unit.id));
  const hiddenStimuli = units.flatMap(unit => (unit.exercises || [])
    .filter(exercise => exercise.type === 'mc' && exercise.audioText)
    .filter(exercise => !(exercise.prompt || '').includes(exercise.audioText))
    .map(exercise => unit.id + ': ' + exercise.audioText));
  assert.deepEqual(hiddenStimuli, [],
    'MC exercises must show their Indonesian stimulus in the prompt because they do not render an audio player');
});

test('A1 U24-U32 multiple-choice prompts do not claim audio playback', () => {
  const units = a1.units.filter(unit => /^a1_u(?:2[4-9]|3[0-2])$/.test(unit.id));
  const misleading = units.flatMap(unit => (unit.exercises || [])
    .filter(exercise => exercise.type === 'mc' && /escucha/i.test(exercise.prompt || ''))
    .map(exercise => unit.id + ': ' + exercise.prompt));
  assert.deepEqual(misleading, [],
    'Multiple-choice exercises do not play audio; listening practice must use the listen modality');
  for (const unit of units) {
    assert.ok((unit.exercises || []).some(exercise => exercise.type === 'listen'),
      unit.id + ' must retain a real listen exercise');
  }
});
