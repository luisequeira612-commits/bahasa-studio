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
const TARGET_IDS = ['a1_u29', 'a1_u30', 'a1_u31', 'a1_u32'];
const REQUIRED_TYPES = ['listen', 'mc', 'order', 'translate_es_id', 'write'];

test('A1 U29-U32 contain five authored lessons with cumulative introductions and retrieval', () => {
  assert.ok(a1, 'A1 curriculum must load');
  const units = a1.units.filter(unit => TARGET_IDS.includes(unit.id));
  assert.deepEqual(Array.from(units, unit => unit.id), TARGET_IDS);

  for (const unit of units) {
    assert.equal(unit.lessonPlans.length, 3, unit.id + ' must retain its three editorial lesson plans');
    assert.equal(unit.vocab.length, 10, unit.id + ' must retain ten vocabulary entries');
    assert.equal(unit.lessons.length, 5, unit.id + ' must contain exactly five authored lessons');

    const unitIds = new Set(unit.vocab.map(word => word.id));
    const introduced = new Map();
    const lessonExercises = unit.lessons.flatMap(lesson => lesson.exercises || []);

    unit.lessons.forEach((lesson, index) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lesson ' + (index + 1) + ' needs a title, objective and focus');
      assert.ok(Array.isArray(lesson.exercises) && lesson.exercises.length >= 3,
        unit.id + ' lesson ' + (index + 1) + ' needs its own practice');

      for (const id of lesson.vocabIds || []) {
        assert.ok(unitIds.has(id), unit.id + ' introduces unknown vocabulary: ' + id);
        assert.ok(!introduced.has(id), unit.id + ' introduces a word more than once: ' + id);
        introduced.set(id, index);
      }

      const expectedReview = Array.from(unit.lessons.slice(0, index).flatMap(previous => previous.vocabIds || []));
      assert.deepEqual(Array.from(lesson.reviewVocabIds || []), expectedReview,
        unit.id + ' lesson ' + (index + 1) + ' must review all previously introduced vocabulary');

      const available = new Set([...(lesson.vocabIds || []), ...(lesson.reviewVocabIds || [])]);
      for (const exercise of lesson.exercises) {
        assert.ok(unitIds.has(exercise.vocabId), unit.id + ' exercise references unknown vocabulary');
        assert.ok(available.has(exercise.vocabId),
          unit.id + ' assesses vocabulary before it is introduced or reviewed: ' + exercise.vocabId);
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercises need clear prompts and feedback');
        assert.notEqual(exercise.generated, true,
          unit.id + ' authored lessons must not count runtime-generated exercises');
      }
    });

    assert.equal(introduced.size, unit.vocab.length,
      unit.id + ' must introduce every existing vocabulary entry exactly once');
    assert.deepEqual([...introduced.keys()].sort(), [...unitIds].sort());

    const originalCounts = new Map();
    const authoredCounts = new Map();
    for (const exercise of unit.exercises) {
      const signature = JSON.stringify(exercise);
      originalCounts.set(signature, (originalCounts.get(signature) || 0) + 1);
    }
    for (const exercise of lessonExercises) {
      const signature = JSON.stringify(exercise);
      authoredCounts.set(signature, (authoredCounts.get(signature) || 0) + 1);
    }
    for (const [signature, count] of originalCounts) {
      assert.equal(authoredCounts.get(signature) || 0, count,
        unit.id + ' must preserve every original exercise exactly once');
    }

    const retrieval = unit.lessons[4];
    assert.match(retrieval.title, /Recuperación espaciada/);
    assert.deepEqual(Array.from(retrieval.vocabIds || []), []);
    assert.deepEqual([...new Set(retrieval.reviewVocabIds || [])].sort(), [...unitIds].sort());
    assert.equal(retrieval.exercises.length, unit.vocab.length);
    assert.deepEqual([...new Set(retrieval.exercises.map(exercise => exercise.vocabId))].sort(), [...unitIds].sort());
    assert.equal(new Set(retrieval.exercises.map(exercise => exercise.type)).size, 5);
    assert.deepEqual(
      [...new Set(lessonExercises.map(exercise => exercise.type))].sort(),
      REQUIRED_TYPES,
      unit.id + ' must retain all five core exercise types'
    );
  }
});

test('A1 U29-U32 authored lesson regression is registered exactly once in CI', () => {
  const workflow = fs.readFileSync(path.join(__dirname, '..', '.github', 'workflows', 'regression.yml'), 'utf8');
  const registrations = workflow.split('node --test tests/a1-u29-u32-authored-lessons.test.cjs').length - 1;
  assert.equal(registrations.length, 1);
});
