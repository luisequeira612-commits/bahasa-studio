'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, '..', 'curriculum-a2.js'), 'utf8'),
  context,
  { filename: 'curriculum-a2.js' }
);
const units = context.window.BAHASA_CURRICULUM_A2.units;
const targetUnitIds = ['a2_u5', 'a2_u6', 'a2_u7', 'a2_u8'];
const coreExerciseTypes = ['mc', 'translate_es_id', 'listen', 'write'];

test('A2 U5-U8 retain four focused lessons and cover every unit vocabulary item', () => {
  for (const unitId of targetUnitIds) {
    const unit = units.find(item => item.id === unitId);
    assert.ok(unit, 'missing ' + unitId);
    assert.equal(unit.lessons.length, 4, unitId + ' must keep four lessons');

    const vocabularyById = new Map(Array.from(unit.vocab, word => [word.id, word]));
    const introducedIds = unit.lessons.flatMap(lesson => Array.from(lesson.vocabIds || []));
    assert.equal(introducedIds.length, unit.vocab.length, unitId + ' must assign every vocabulary entry to a lesson');
    assert.equal(new Set(introducedIds).size, introducedIds.length, unitId + ' must not introduce a word twice');
    assert.deepEqual(
      [...introducedIds].sort(),
      [...vocabularyById.keys()].sort(),
      unitId + ' lesson vocabulary groups must match the unit vocabulary'
    );

    for (const lesson of unit.lessons) {
      assert.ok(lesson.title && lesson.objective && lesson.grammar, unitId + ' lessons need a title, objective and grammar focus');
      const grammar = lesson.grammar.toLocaleLowerCase('id-ID');
      const lessonIds = Array.from(lesson.vocabIds || []);
      const exercises = Array.from(lesson.exercises || []);

      assert.ok(lessonIds.length >= 2, lesson.title + ' must introduce a vocabulary group');
      for (const vocabId of lessonIds) {
        const word = vocabularyById.get(vocabId);
        assert.ok(word, lesson.title + ' references vocabulary outside its unit: ' + vocabId);
        assert.ok(
          grammar.includes(word.idn.toLocaleLowerCase('id-ID')),
          lesson.title + ' grammar focus must mention ' + word.idn
        );
        assert.ok(
          exercises.some(exercise => exercise.vocabId === vocabId),
          lesson.title + ' must assess ' + vocabId
        );
      }

      for (const type of coreExerciseTypes) {
        assert.equal(
          exercises.filter(exercise => exercise.type === type).length,
          1,
          lesson.title + ' must contain exactly one ' + type + ' exercise'
        );
      }
      for (const exercise of exercises) {
        assert.ok(lessonIds.includes(exercise.vocabId),
          lesson.title + ' exercise must link to vocabulary introduced in that lesson');
      }
    }

    const exercises = unit.lessons.flatMap(lesson => Array.from(lesson.exercises || []));
    assert.equal(exercises.length, 17, unitId + ' must retain its 17 authored exercises');
    assert.equal(exercises.filter(exercise => exercise.type === 'order').length, 1,
      unitId + ' must retain one sentence-order exercise');
  }
});
