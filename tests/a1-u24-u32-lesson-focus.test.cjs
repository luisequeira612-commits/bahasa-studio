'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, '..', 'curriculum-a1.js'), 'utf8'),
  context,
  { filename: 'curriculum-a1.js' }
);
const a1 = context.window.BAHASA_CURRICULUM_A1;
const TARGET_UNITS = Array.from({ length: 9 }, (_, index) => 'a1_u' + (index + 24));
const REQUIRED_EXERCISE_TYPES = ['mc', 'translate_es_id', 'order', 'listen', 'write'];

test('A1 U24-U32 retain complete lesson plans and a balanced exercise mix', () => {
  assert.ok(a1, 'the canonical A1 curriculum must load');
  const units = a1.units.filter(unit => TARGET_UNITS.includes(unit.id));
  assert.deepEqual(Array.from(units, unit => unit.id), TARGET_UNITS);

  for (const unit of units) {
    assert.equal(unit.lessonPlans.length, 3, unit.id + ' must retain three lesson plans');
    for (const [index, lesson] of unit.lessonPlans.entries()) {
      assert.ok(typeof lesson.title === 'string' && lesson.title.trim(),
        unit.id + ' lesson ' + (index + 1) + ' needs a title');
      assert.ok(typeof lesson.objective === 'string' && lesson.objective.trim(),
        unit.id + ' lesson ' + (index + 1) + ' needs a learning objective');
      assert.ok(typeof lesson.grammar === 'string' && lesson.grammar.trim(),
        unit.id + ' lesson ' + (index + 1) + ' needs a grammar/context note');
    }

    assert.equal(unit.vocab.length, 10, unit.id + ' must retain its ten authored vocabulary entries');
    const types = new Set((unit.exercises || []).map(exercise => exercise.type));
    for (const type of REQUIRED_EXERCISE_TYPES) {
      assert.ok(types.has(type), unit.id + ' is missing the ' + type + ' exercise mode');
    }
    for (const exercise of unit.exercises || []) {
      assert.ok(typeof exercise.prompt === 'string' && exercise.prompt.trim(),
        unit.id + ' contains an exercise without a prompt');
      assert.ok(typeof exercise.explanation === 'string' && exercise.explanation.trim(),
        unit.id + ' contains an exercise without an explanation');
    }
  }
});

test('A1 U24-U32 focus guard is registered exactly once in regression CI', () => {
  const workflow = fs.readFileSync(
    path.join(__dirname, '..', '.github', 'workflows', 'regression.yml'),
    'utf8'
  );
  const registrations = workflow.match(/node --test tests\/a1-u24-u32-lesson-focus\.test\.cjs/g) || [];
  assert.equal(registrations.length, 1);
});
