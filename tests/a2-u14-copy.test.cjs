'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'curriculum-a2.js'), 'utf8'), context);
const unit = context.window.BAHASA_CURRICULUM_A2.units.find(item => item.id === 'a2_u14');
test('A2 U14 lesson 3 objective uses correct Spanish and matches its vocabulary focus', () => {
  assert.ok(unit);
  const lesson = unit.lessons[2];
  assert.equal(lesson.objective, 'Habla de vehículos, medios de transporte y retrasos.');
  assert.doesNotMatch(lesson.objective, /vehículoes|autoangkutanes/i);
  for (const id of lesson.vocabIds) assert.ok(lesson.exercises.some(exercise => exercise.vocabId === id));
});
