'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { getAssessment, LEVELS } = require('../assessment-engine.js');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const a1Source = fs.readFileSync(path.join(root, 'curriculum-a1.js'), 'utf8');
const a2Source = fs.readFileSync(path.join(root, 'curriculum-a2.js'), 'utf8');
const a1Literal = a1Source.slice(a1Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
const a2Literal = a2Source.slice(a2Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
const start = html.indexOf('const CourseData =');
const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
assert.ok(start >= 0 && end > start, 'CourseData block must exist');
const courseSource = html.slice(start, end)
  .replace('window.BAHASA_CURRICULUM_A1', a1Literal)
  .replace('window.BAHASA_CURRICULUM_A2', a2Literal);
const course = vm.runInNewContext(courseSource + '\nCourseData');

test('B1 draft has ten units and an explicitly incomplete vocabulary bank', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  assert.ok(b1);
  assert.equal(b1.units.length, 10);
  assert.equal(b1.units.reduce((sum, unit) => sum + unit.vocab.length, 0), 42);
  assert.equal(b1.units.reduce((sum, unit) => sum + unit.exercises.length, 0), 42);
  assert.deepEqual(Array.from(b1.units, unit => unit.id), ['b1_u1', 'b1_u2', 'b1_u3', 'b1_u4', 'b1_u5', 'b1_u6', 'b1_u7', 'b1_u8', 'b1_u9', 'b1_u10']);
});

test('every B1 draft exercise references vocabulary in its own unit', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const ids = new Set();
  for (const unit of b1.units) {
    const localIds = new Set(unit.vocab.map(word => word.id));
    for (const word of unit.vocab) {
      assert.ok(word.id && word.idn && word.esp && word.ex && word.exEsp, unit.id + ' has an incomplete vocabulary entry');
      assert.ok(!ids.has(word.id), 'duplicate B1 vocabulary ID: ' + word.id);
      ids.add(word.id);
    }
    for (const exercise of unit.exercises) {
      assert.ok(exercise.prompt, unit.id + ' exercise needs a prompt');
      assert.ok(localIds.has(exercise.vocabId), unit.id + ' exercise references vocabulary outside its unit');
      if (exercise.type === 'mc') {
        assert.ok(Array.isArray(exercise.options) && exercise.options.length >= 2);
        assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length);
      }
    }
  }
  assert.equal(ids.size, 42);
});

test('B1 remains hidden from the unlocked learning path until a separate release decision', () => {
  assert.match(html, /!\['B1', 'B2'\]\.includes\(level\.id\)/);
  assert.match(html, /if \(\['B1', 'B2'\]\.includes\(level\.id\)/);
});

test('B1 assessment bank includes open production items that require human review', () => {
  const items = getAssessment('B1');
  assert.equal(items.length, 11);
  assert.ok(items.some(item => item.type === 'open' && item.skill === 'production'));
  for (const id of ['b1-connectors-01', 'b1-report-01', 'b1-process-01', 'b1-opinion-01', 'b1-formal-01']) assert.ok(items.some(item => item.id === id), 'missing B1 assessment item ' + id);
  assert.ok(items.some(item => item.skill === 'register'));
  for (const skill of LEVELS.B1.skills) assert.ok(items.some(item => item.skill === skill), 'B1 assessment must cover ' + skill);
  const addedItems = items.filter(item => ['b1-connectors-01', 'b1-report-01', 'b1-process-01', 'b1-opinion-01', 'b1-formal-01'].includes(item.id));
  assert.ok(addedItems.every(item => item.prompt && item.explanation && item.options[item.answer]));
});
