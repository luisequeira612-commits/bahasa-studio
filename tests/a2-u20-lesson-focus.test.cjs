'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'curriculum-a2.js'), 'utf8'), context);
const unit = context.window.BAHASA_CURRICULUM_A2.units.find(item => item.id === 'a2_u20');
test('A2 U20 lesson 2 title and objective describe its planting, flood and drought vocabulary', () => {
  assert.ok(unit);
  const lesson = unit.lessons[1];
  assert.equal(lesson.title, 'Lección 2: Plantación, inundaciones y sequías');
  const content = [lesson.title, lesson.objective, lesson.grammar].join(' ').toLocaleLowerCase('es');
  for (const term of ['plantación', 'inundaciones', 'sequías', 'prevención']) assert.ok(content.includes(term), 'lesson focus should mention ' + term);
  for (const id of lesson.vocabIds) assert.ok(lesson.exercises.some(exercise => exercise.vocabId === id), 'lesson must assess ' + id);
});
