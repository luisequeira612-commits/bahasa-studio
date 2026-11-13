'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, '..', 'curriculum-a1.js'), 'utf8'),
  context
);
const a1 = context.window.BAHASA_CURRICULUM_A1;

test('A1 keeps its complete 32-unit sequence and does not assess vocabulary before its first unit', () => {
  assert.ok(a1, 'A1 curriculum must load from its extracted data file');
  assert.equal(a1.units.length, 32);
  assert.deepEqual(
    Array.from(a1.units, unit => unit.id),
    Array.from({ length: 32 }, (_, index) => 'a1_u' + (index + 1))
  );

  const firstIntroduction = new Map();
  const assessedIds = new Set();

  a1.units.forEach((unit, unitIndex) => {
    assert.ok(Array.isArray(unit.vocab), unit.id + ' must contain vocabulary');
    assert.ok(Array.isArray(unit.exercises), unit.id + ' must contain unit exercises');

    for (const word of unit.vocab) {
      assert.ok(word && typeof word.id === 'string' && word.id.trim(),
        unit.id + ' contains a vocabulary entry without an ID');
      if (!firstIntroduction.has(word.id)) firstIntroduction.set(word.id, unitIndex);
    }

    for (const exercise of unit.exercises) {
      const references = [
        ...(typeof exercise.vocabId === 'string' ? [exercise.vocabId] : []),
        ...(Array.isArray(exercise.vocabIds) ? exercise.vocabIds : [])
      ];
      for (const id of references) {
        assert.ok(firstIntroduction.has(id),
          unit.id + ' assesses unknown or not-yet-introduced vocabulary: ' + id);
        assert.ok(firstIntroduction.get(id) <= unitIndex,
          unit.id + ' assesses future vocabulary: ' + id);
        assessedIds.add(id);
      }
    }
  });

  for (const unit of a1.units) {
    for (const word of unit.vocab) {
      assert.ok(assessedIds.has(word.id),
        unit.id + ' vocabulary has no explicit exercise link: ' + word.id);
    }
  }
});



test('A1 U1-U4 contain five authored lessons with sequenced introductions and spaced retrieval', () => {
  for (const unit of a1.units.slice(0, 4)) {
    assert.equal(unit.lessons.length, 5, unit.id + ' must contain five authored lessons');
    const unitIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();

    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lesson ' + (lessonIndex + 1) + ' needs a title, objective and focus');
      assert.ok(Array.isArray(lesson.exercises) && lesson.exercises.length >= 3,
        unit.id + ' lesson ' + (lessonIndex + 1) + ' needs its own exercises');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitIds.has(id), unit.id + ' introduces vocabulary outside its unit: ' + id);
        assert.ok(!introducedAt.has(id), unit.id + ' introduces a word more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every vocabulary entry exactly once');
    const lessonExercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    for (const exercise of unit.exercises) {
      const signature = JSON.stringify(exercise);
      assert.equal(lessonExercises.filter(candidate => JSON.stringify(candidate) === signature).length, 1,
        unit.id + ' must preserve every original unit exercise exactly once in its authored lessons');
    }
    assert.ok(lessonExercises.every(exercise => exercise.generated !== true),
      unit.id + ' authored lessons must not count generated runtime exercises');

    const retrieval = unit.lessons[4];
    assert.match(retrieval.title, /Recuperación espaciada/);
    assert.deepEqual(Array.from(retrieval.vocabIds || []), []);
    assert.deepEqual([...new Set(retrieval.reviewVocabIds || [])].sort(), [...unitIds].sort());
    assert.equal(retrieval.exercises.length, unit.vocab.length);
    assert.deepEqual([...new Set(retrieval.exercises.map(exercise => exercise.vocabId))].sort(), [...unitIds].sort());
    assert.equal(new Set(retrieval.exercises.map(exercise => exercise.type)).size, 5);

    unit.lessons.forEach((lesson, lessonIndex) => {
      const available = new Set([...(lesson.vocabIds || []), ...(lesson.reviewVocabIds || [])]);
      for (const exercise of lesson.exercises) {
        assert.ok(unitIds.has(exercise.vocabId),
          unit.id + ' exercise must reference vocabulary from its unit');
        assert.ok(available.has(exercise.vocabId),
          unit.id + ' exercise assesses a word before introduction or review: ' + exercise.vocabId);
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercise needs a prompt and feedback');
      }
    });
    assert.deepEqual(
      [...new Set(unit.lessons.flatMap(lesson => (lesson.exercises || []).map(exercise => exercise.type)))].sort(),
      ['listen', 'mc', 'order', 'translate_es_id', 'write'],
      unit.id + ' must retain all five core exercise types'
    );
  }
});

test('A1 U5-U8 contain five authored lessons with sequenced introductions and spaced retrieval', () => {
  for (const unit of a1.units.slice(4, 8)) {
    assert.equal(unit.lessons.length, 5, unit.id + ' must contain five authored lessons');
    const unitIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();

    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lesson ' + (lessonIndex + 1) + ' needs a title, objective and focus');
      assert.ok(Array.isArray(lesson.exercises) && lesson.exercises.length >= 3,
        unit.id + ' lesson ' + (lessonIndex + 1) + ' needs its own exercises');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitIds.has(id), unit.id + ' introduces vocabulary outside its unit: ' + id);
        assert.ok(!introducedAt.has(id), unit.id + ' introduces a word more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every vocabulary entry exactly once');
    const lessonExercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    for (const exercise of unit.exercises) {
      const signature = JSON.stringify(exercise);
      assert.equal(lessonExercises.filter(candidate => JSON.stringify(candidate) === signature).length, 1,
        unit.id + ' must preserve every original unit exercise exactly once in its authored lessons');
    }
    assert.ok(lessonExercises.every(exercise => exercise.generated !== true),
      unit.id + ' authored lessons must not count generated runtime exercises');

    const retrieval = unit.lessons[4];
    assert.match(retrieval.title, /Recuperación espaciada/);
    assert.deepEqual(Array.from(retrieval.vocabIds || []), []);
    assert.deepEqual([...new Set(retrieval.reviewVocabIds || [])].sort(), [...unitIds].sort());
    assert.equal(retrieval.exercises.length, unit.vocab.length);
    assert.deepEqual([...new Set(retrieval.exercises.map(exercise => exercise.vocabId))].sort(), [...unitIds].sort());
    assert.equal(new Set(retrieval.exercises.map(exercise => exercise.type)).size, 5);

    unit.lessons.forEach((lesson, lessonIndex) => {
      const available = new Set([...(lesson.vocabIds || []), ...(lesson.reviewVocabIds || [])]);
      for (const exercise of lesson.exercises) {
        assert.ok(unitIds.has(exercise.vocabId),
          unit.id + ' exercise must reference vocabulary from its unit');
        assert.ok(available.has(exercise.vocabId),
          unit.id + ' exercise assesses a word before introduction or review: ' + exercise.vocabId);
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercise needs a prompt and feedback');
      }
    });
    assert.deepEqual(
      [...new Set(unit.lessons.flatMap(lesson => (lesson.exercises || []).map(exercise => exercise.type)))].sort(),
      ['listen', 'mc', 'order', 'translate_es_id', 'write'],
      unit.id + ' must retain all five core exercise types'
    );
  }
});

test('A1 progression guard is registered exactly once in the regression workflow', () => {
  const workflow = fs.readFileSync(path.join(__dirname, '..', '.github', 'workflows', 'regression.yml'), 'utf8');
  const registrations = workflow.match(/node --test tests\/a1-curriculum-progression\.test\.cjs/g) || [];
  assert.equal(registrations.length, 1);
});
