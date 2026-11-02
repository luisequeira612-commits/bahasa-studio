'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'curriculum-a1.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context, { filename: 'curriculum-a1.js' });
const a1 = context.window.BAHASA_CURRICULUM_A1;

function hasAudioSupport(exercise) {
  return Boolean(
    (typeof exercise.audioText === 'string' && exercise.audioText.trim()) ||
    (exercise.type === 'listen' && typeof exercise.answer === 'string' && exercise.answer.trim())
  );
}

test('all 32 canonical A1 units include at least one listening-capable exercise', () => {
  assert.ok(a1, 'the extracted runtime A1 curriculum must load');
  assert.equal(a1.units.length, 32, 'A1 must retain its 32 authored units');

  const uncovered = a1.units.filter(unit =>
    !(unit.exercises || []).some(hasAudioSupport)
  );

  assert.deepEqual(uncovered.map(unit => unit.id), [],
    'every A1 unit must offer spoken prompt audio or a listen-and-type exercise');
});

test('canonical A1 data retains both spoken prompts and listen-and-type exercises', () => {
  const exercises = a1.units.flatMap(unit => unit.exercises || []);
  assert.ok(exercises.some(exercise =>
    typeof exercise.audioText === 'string' && exercise.audioText.trim()
  ), 'A1 must include audioText spoken prompts');
  assert.ok(exercises.some(exercise =>
    exercise.type === 'listen' && typeof exercise.answer === 'string' && exercise.answer.trim()
  ), 'A1 must include listen-and-type exercises');
});
