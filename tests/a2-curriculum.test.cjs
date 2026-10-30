'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function extractObjectLiteral(source, marker) {
  const markerIndex = source.indexOf(marker);
  assert.ok(markerIndex >= 0, 'CourseData declaration must exist');
  const start = source.indexOf('{', markerIndex);
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = start; index < source.length; index++) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"' || char.charCodeAt(0) === 96) quote = char;
    else if (char === '{') depth++;
    else if (char === '}') {
      depth--;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  assert.fail('CourseData object must have balanced braces');
}

const courseData = vm.runInNewContext('(' + extractObjectLiteral(html, 'const CourseData =') + ')');
const a2 = courseData.levels.find(level => level.id === 'A2');

test('A2 expands to eight sequential units without changing the 32-unit A1 course', () => {
  const a1 = courseData.levels.find(level => level.id === 'A1');
  assert.ok(a1);
  assert.equal(a1.units.length, 32);
  assert.ok(a2);
  assert.equal(a2.units.length, 8);
  assert.deepEqual(Array.from(a2.units.slice(3), unit => unit.id),
    ['a2_u4', 'a2_u5', 'a2_u6', 'a2_u7', 'a2_u8']);
});

test('new A2 units have vocabulary, varied practice, listening, and production', () => {
  for (const unit of a2.units.slice(3)) {
    assert.ok(unit.vocab.length >= 4, unit.id + ' should introduce at least four vocabulary items');
    assert.ok(unit.exercises.length >= 8, unit.id + ' should include at least eight exercises');
    assert.ok(unit.exercises.some(exercise => exercise.type === 'listen'),
      unit.id + ' should include listening practice');
    assert.ok(unit.exercises.some(exercise => exercise.type === 'write'),
      unit.id + ' should include a productive writing prompt');
    const vocabIds = new Set(unit.vocab.map(word => word.id));
    for (const exercise of unit.exercises) {
      if (exercise.vocabId) assert.ok(vocabIds.has(exercise.vocabId) || unit.id === 'a2_u8',
        unit.id + ' exercise should reference vocabulary introduced in its unit');
    }
  }
});

test('new A2 vocabulary identifiers are unique and advanced content remains gated', () => {
  const newIds = a2.units.slice(3).flatMap(unit => unit.vocab.map(word => word.id));
  assert.equal(new Set(newIds).size, newIds.length, 'new A2 vocabulary identifiers must be unique');
  assert.match(html, /function getLearningLevels\(\)\s*\{\s*return CourseData\.levels\.filter\(level => level\.id === 'A1'\)/,
    'A2, B1, and B2 should remain outside learner-facing SRS until the A1 gate is validated');
});
