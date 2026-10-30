const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function extractObjectLiteral(source, marker) {
  const markerIndex = source.indexOf(marker);
  assert.ok(markerIndex >= 0, 'CourseData declaration must exist');
  const start = source.indexOf('{', markerIndex);
  assert.ok(start >= 0, 'CourseData object must start with an opening brace');

  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = start; index < source.length; index++) {
    const char = source[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char;
    } else if (char === '{') {
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  assert.fail('CourseData object must have balanced braces');
}

test('all 32 A1 units include at least one listening-capable exercise', () => {
  const literal = extractObjectLiteral(html, 'const CourseData =');
  const courseData = vm.runInNewContext('(' + literal + ')');
  const a1 = courseData.levels.find(level => level.id === 'A1');

  assert.ok(a1, 'A1 curriculum must exist');
  assert.equal(a1.units.length, 32, 'A1 must retain its 32 authored units');

  const uncovered = a1.units.filter(unit => !(unit.exercises || []).some(exercise =>
    (typeof exercise.audioText === 'string' && exercise.audioText.trim()) ||
    (exercise.type === 'listen' && typeof exercise.answer === 'string' && exercise.answer.trim())
  ));

  assert.deepEqual(uncovered.map(unit => unit.id), [],
    'every A1 unit must offer either spoken prompt audio or a listen-and-type exercise');
});

test('A1 retains both spoken multiple-choice prompts and listen-and-type exercises', () => {
  const literal = extractObjectLiteral(html, 'const CourseData =');
  const courseData = vm.runInNewContext('(' + literal + ')');
  const a1 = courseData.levels.find(level => level.id === 'A1');
  const exercises = a1.units.flatMap(unit => unit.exercises || []);

  assert.ok(exercises.some(exercise =>
    typeof exercise.audioText === 'string' && exercise.audioText.trim()
  ), 'A1 must include audioText multiple-choice exercises');
  assert.ok(exercises.some(exercise =>
    exercise.type === 'listen' && typeof exercise.answer === 'string' && exercise.answer.trim()
  ), 'A1 must include listen-and-type exercises');
});
