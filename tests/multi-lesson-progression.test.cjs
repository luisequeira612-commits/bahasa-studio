'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const start = html.indexOf('const CourseData =');
const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
assert.ok(start >= 0 && end > start, 'course data and lesson builders must exist');
const app = vm.runInNewContext(html.slice(start, end) + '\n({ CourseData, buildUnitLessons, buildUnitAssessmentItems, isUnitAssessmentPassed })');

test('every A1 unit is divided into sequential lessons that introduce all vocabulary', () => {
  const a1 = app.CourseData.levels.find(level => level.id === 'A1');
  for (const unit of a1.units) {
    const lessons = app.buildUnitLessons(unit);
    assert.ok(lessons.length >= 2, unit.id + ' should have multiple lessons');
    const introduced = lessons.flatMap(lesson => lesson.newVocab.map(word => word.id));
    assert.deepEqual(introduced, unit.vocab.map(word => word.id), unit.id + ' should introduce every vocabulary item exactly once and in order');
    lessons.forEach((lesson, index) => {
      assert.deepEqual(lesson.vocab.map(word => word.id), unit.vocab.slice(0, lesson.vocab.length).map(word => word.id));
      assert.deepEqual(lesson.reviewVocab.map(word => word.id), unit.vocab.slice(0, lesson.reviewVocab.length).map(word => word.id));
      assert.ok(lesson.exercises.length >= lesson.newVocab.length, unit.id + ' lesson should actively practise its new words');
      const learnedIds = new Set(lesson.vocab.map(word => word.id));
      const learnedMeanings = new Set(lesson.vocab.map(word => word.esp));
      const exercisedIds = new Set(lesson.exercises.filter(exercise => exercise.generated).map(exercise => exercise.vocabId));
      for (const word of lesson.reviewVocab) assert.ok(exercisedIds.has(word.id), 'every previously learned word should be revisited in the next lesson');
      for (const exercise of lesson.exercises) {
        assert.ok(learnedIds.has(exercise.vocabId), unit.id + ' lesson ' + index + ' references a word not yet introduced');
        if (exercise.generated && exercise.options) assert.ok(exercise.options.every(option => learnedMeanings.has(option)), 'generated lesson distractors must come only from learned vocabulary');
        if (exercise.generated && exercise.answer && exercise.type !== 'mc') assert.ok(lesson.vocab.some(word => word.idn === exercise.answer), 'generated lesson answers must use learned vocabulary');
      }
    });
  }
});

test('authored listening dialogues appear only after all their vocabulary has been taught', () => {
  const a1 = app.CourseData.levels.find(level => level.id === 'A1');
  const unit1 = a1.units.find(unit => unit.id === 'a1_u1');
  const lessons = app.buildUnitLessons(unit1);
  const dialogueLesson = lessons.find(lesson => lesson.exercises.some(exercise =>
    String(exercise.audioText || '').includes('Apa kabar?') && String(exercise.audioText || '').includes('Baik')
  ));
  assert.ok(dialogueLesson, 'the authored Unit 1 dialogue should be retained');
  assert.ok(dialogueLesson.vocab.some(word => word.idn === 'Apa kabar?'));
  assert.ok(dialogueLesson.vocab.some(word => word.idn === 'Baik'));
  assert.ok(dialogueLesson.index > 0, 'the dialogue should follow the lessons that introduce its expressions');
});

test('unit final assessments cover only that unit vocabulary and require 80 percent', () => {
  const a1 = app.CourseData.levels.find(level => level.id === 'A1');
  for (const unit of a1.units) {
    const items = app.buildUnitAssessmentItems(unit);
    const knownIds = new Set(unit.vocab.map(word => word.id));
    const knownMeanings = new Set(unit.vocab.map(word => word.esp));
    assert.equal(items.length, unit.vocab.length);
    for (const item of items) {
      assert.ok(knownIds.has(item.vocabId));
      assert.ok(item.options.every(option => knownMeanings.has(option)));
    }
  }
  assert.equal(app.isUnitAssessmentPassed(8, 10), true);
  assert.equal(app.isUnitAssessmentPassed(7, 10), false);
  assert.equal(app.isUnitAssessmentPassed(0, 0), false);
});

test('course progression persists lesson completion separately from unit approval', () => {
  assert.match(html, /completedLessons: \[\]/);
  assert.match(html, /DB\.set\('settings', 'completedLessons'/);
  assert.match(html, /startUnitAssessment\(this\.dataset\.unitId\)/);
  assert.match(html, /if \(passed\) await App\.markUnitCompleted\(this\.currentUnit\.id\)/);
  assert.match(html, /completedLessons: this\.completedLessons/);
  assert.match(html, /putSetting\('completedLessons', data\.completedLessons \|\| \[\]\)/);
});
