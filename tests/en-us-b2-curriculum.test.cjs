'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const blockFiles = [
  'units-01-04.js', 'units-05-08.js', 'units-09-12.js',
  'units-11-14.js', 'units-15-18.js', 'units-19-20.js',
  'units-21-24.js', 'units-25-28.js', 'units-29-30.js',
  'units-31-34.js', 'units-35-38.js', 'units-39-40.js',
  'units-41-44.js', 'units-45-48.js', 'units-49-50.js',
  'units-51-54.js', 'units-55-58.js', 'units-59-60.js',
];

function loadB2() {
  const context = vm.createContext({});
  context.window = context;
  for (const file of blockFiles) {
    const filename = path.join(root, 'languages/en/curriculum/b2', file);
    vm.runInContext(fs.readFileSync(filename, 'utf8'), context, {
      filename,
      timeout: 5000,
    });
  }
  const blocks = context.GUARDI_CURRICULUM_BLOCKS?.en?.B2;
  assert.ok(blocks, 'English B2 blocks must register in the curriculum namespace');
  return Object.values(blocks).flatMap((block) => Array.from(block.units || []));
}

test('American English B2 has 60 sequential units with five lessons and 20 activities each', () => {
  const units = loadB2();
  assert.equal(units.length, 60);
  const numbers = units.map((unit) => unit.unitNumber).sort((a, b) => a - b);
  assert.deepEqual(numbers, Array.from({ length: 60 }, (_, index) => index + 1));
  assert.equal(new Set(numbers).size, 60);

  for (const unit of units) {
    assert.equal(unit.id, 'en_b2_u' + unit.unitNumber);
    assert.equal(unit.lessons.length, 5, unit.id + ' must have five lessons');
    const lessonActivities = unit.lessons.reduce((sum, lesson) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar, unit.id + ' lesson metadata');
      assert.equal(lesson.exercises.length, 2, unit.id + ' lessons must have two activities each');
      return sum + lesson.exercises.length;
    }, 0);
    assert.equal((unit.exercises || []).length + lessonActivities, 20,
      unit.id + ' must have 20 total activities');
  }
});

test('B2 vocabulary is unique, complete, and absent from all six review units', () => {
  const units = loadB2();
  const contentUnits = units.filter((unit) => unit.unitNumber % 10 !== 0);
  const reviewUnits = units.filter((unit) => unit.unitNumber % 10 === 0);
  assert.equal(contentUnits.length, 54);
  assert.equal(reviewUnits.length, 6);

  const vocabulary = contentUnits.flatMap((unit) => Array.from(unit.vocab || []));
  assert.equal(vocabulary.length, 1188);
  assert.equal(new Set(vocabulary.map((word) => word.id)).size, 1188,
    'vocabulary IDs must be unique across B2');
  assert.equal(new Set(vocabulary.map((word) => word.target.trim().toLocaleLowerCase())).size, 1188,
    'B2 target expressions must be unique');
  for (const word of vocabulary) {
    for (const field of ['id', 'target', 'esp', 'ex', 'exEsp']) {
      assert.equal(typeof word[field], 'string', 'vocabulary ' + word.id + ' needs ' + field);
      assert.ok(word[field].trim(), 'vocabulary ' + word.id + ' needs non-empty ' + field);
    }
  }
  for (const unit of contentUnits) {
    assert.equal(unit.vocab.length, 22, unit.id + ' must add 22 new vocabulary targets');
  }
  for (const unit of reviewUnits) {
    assert.equal(unit.vocab.length, 0, unit.id + ' must not introduce new vocabulary');
  }
});

test('all lesson and exercise vocabulary references resolve across the complete B2 level', () => {
  const units = loadB2();
  const allIds = new Set(units.flatMap((unit) => Array.from(unit.vocab || []).map((word) => word.id)));
  const references = [];
  for (const unit of units) {
    for (const lesson of unit.lessons || []) {
      for (const id of lesson.vocabIds || []) references.push({ unit: unit.unitNumber, id });
      for (const exercise of lesson.exercises || []) {
        if (exercise.vocabId) references.push({ unit: unit.unitNumber, id: exercise.vocabId });
      }
    }
    for (const exercise of unit.exercises || []) {
      if (exercise.vocabId) references.push({ unit: unit.unitNumber, id: exercise.vocabId });
    }
  }
  const unresolved = references.filter((reference) => !allIds.has(reference.id));
  assert.deepEqual(unresolved, [], 'every vocabulary reference must resolve, including review-unit references');
});

test('B2 uses only existing exercise types with valid answer structures', () => {
  const units = loadB2();
  const types = new Set();
  for (const unit of units) {
    const exercises = [
      ...(unit.exercises || []),
      ...(unit.lessons || []).flatMap((lesson) => lesson.exercises || []),
    ];
    for (const exercise of exercises) {
      types.add(exercise.type);
      assert.ok(exercise.prompt && exercise.explanation, unit.id + ' exercises need prompt and explanation');
      if (exercise.type === 'mc') {
        assert.ok(Array.isArray(exercise.options) && exercise.options.length >= 3);
        assert.equal(new Set(exercise.options.map((option) => option.trim().toLocaleLowerCase())).size,
          exercise.options.length, unit.id + ' multiple-choice options must be distinct');
        assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length);
      } else if (exercise.type === 'order') {
        assert.ok(Array.isArray(exercise.words) && exercise.words.length >= 2);
        assert.ok(Array.isArray(exercise.correctOrder));
        assert.deepEqual(Array.from(exercise.words).sort(), Array.from(exercise.correctOrder).sort());
        assert.notDeepEqual(Array.from(exercise.words), Array.from(exercise.correctOrder),
          unit.id + ' sentence-building tokens must be shuffled');
      } else {
        assert.fail('Unsupported B2 exercise type: ' + exercise.type);
      }
    }
  }
  assert.deepEqual([...types].sort(), ['mc', 'order']);
});
