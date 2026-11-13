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

test('A2 U5-U8 contain five lessons and the fifth retrieves every unit vocabulary item', () => {
  for (const unitId of targetUnitIds) {
    const unit = units.find(item => item.id === unitId);
    assert.ok(unit, 'missing ' + unitId);
    assert.equal(unit.lessons.length, 5, unitId + ' must have five authored lessons');

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

      const reviewIds = Array.from(lesson.reviewVocabIds || []);
      if (lessonIds.length === 0) {
        assert.match(lesson.title, /Recuperación espaciada/, lesson.title + ' must be an authored retrieval lesson');
        assert.deepEqual([...new Set(reviewIds)].sort(), [...vocabularyById.keys()].sort(),
          lesson.title + ' must retrieve all unit vocabulary');
      } else {
        assert.ok(lessonIds.length >= 2, lesson.title + ' must introduce a vocabulary group');
      }
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
        assert.ok(lessonIds.includes(exercise.vocabId) || reviewIds.includes(exercise.vocabId),
          lesson.title + ' exercise must link to vocabulary introduced or explicitly reviewed in that lesson');
      }
    }

    const exercises = unit.lessons.flatMap(lesson => Array.from(lesson.exercises || []));
    assert.equal(exercises.length, 22, unitId + ' must have 22 authored exercises');
    assert.equal(exercises.filter(exercise => exercise.type === 'order').length, 2,
      unitId + ' must include one sentence-order exercise in the new retrieval lesson');
  }
});


test('A2 U5-U8 translation prompts name the vocabulary form required by their canonical answer', () => {
  for (const unitId of targetUnitIds) {
    const unit = units.find(item => item.id === unitId);
    const vocabularyById = new Map(Array.from(unit.vocab, word => [word.id, word]));
    for (const lesson of unit.lessons) {
      const exercise = lesson.exercises.find(item => item.type === 'translate_es_id');
      assert.ok(exercise, lesson.title + ' must retain its translation exercise');
      const word = vocabularyById.get(exercise.vocabId);
      assert.ok(word, lesson.title + ' translation must link to unit vocabulary');
      assert.ok(
        exercise.prompt.startsWith('Traduce usando «' + word.idn + '»: '),
        lesson.title + ' translation prompt must state the target vocabulary and preserve the tap-translation phrase format'
      );
      assert.ok(exercise.prompt.slice(('Traduce usando «' + word.idn + '»: ').length).trim(),
        lesson.title + ' translation prompt must retain its Spanish phrase');
    }
  }
});
