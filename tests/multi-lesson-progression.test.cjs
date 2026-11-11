'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const a1Source = fs.readFileSync(path.join(__dirname, '..', 'curriculum-a1.js'), 'utf8');
const a2Source = fs.readFileSync(path.join(__dirname, '..', 'curriculum-a2.js'), 'utf8');
const a1Literal = a1Source.slice(a1Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
const a2Literal = a2Source.slice(a2Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
const htmlSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const courseDataStart = htmlSource.indexOf('const CourseData =');
const html = htmlSource.slice(0, courseDataStart) + htmlSource.slice(courseDataStart)
  .replace('window.BAHASA_CURRICULUM_A1', a1Literal)
  .replace('window.BAHASA_CURRICULUM_A2', a2Literal);
const start = html.indexOf('const CourseData =');
const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
assert.ok(start >= 0 && end > start, 'course data and lesson builders must exist');
const app = vm.runInNewContext(html.slice(start, end) + '\n({ CourseData, buildUnitLessons, buildUnitAssessmentItems, isUnitAssessmentPassed, getUnitProgressState, unitLessonProgressKey })');

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

test('custom and non-A1 units retain their single authored lesson and legacy vocabulary reinforcement', () => {
  const unit = {
    id: 'one-off-unit',
    vocab: [
      { id: 'known-word', idn: 'Pagi', esp: 'Mañana' },
      { id: 'new-word', idn: 'Malam', esp: 'Noche' }
    ],
    exercises: [{ vocabId: 'known-word', type: 'mc', prompt: '¿Qué significa Pagi?', options: ['Mañana', 'Noche'], answer: 0 }]
  };
  const lessons = app.buildUnitLessons(unit);
  assert.equal(lessons.length, 1);
  assert.ok(lessons[0].exercises.some(exercise => exercise.vocabId === 'known-word' && !exercise.generated));
  assert.ok(lessons[0].exercises.some(exercise => exercise.vocabId === 'new-word'));
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
  assert.match(html, /LessonEngine\.startUnitAssessment\(unitId\)/);
  assert.match(html, /progress\.allLessonsComplete && progress\.requiresAssessment && !progress\.completed/);
  assert.match(html, /const unitCompletedNow = progress\.allLessonsComplete && !progress\.requiresAssessment/);
  assert.match(html, /if \(unitCompletedNow\) \{[\s\S]*?syncLearningLevelAfterUnitCompletion\(unit\.id\);/);
  assert.match(html, /App\.completedLessons\.push\(lessonKey\)/);
  assert.match(html, /if \(passed\) \{[\s\S]*?await App\.markUnitCompleted\(this\.currentUnit\.id\);[\s\S]*?syncLearningLevelAfterUnitCompletion\(this\.currentUnit\.id\);/);
  assert.match(html, /completedLessons: this\.completedLessons/);
  assert.match(html, /putSetting\('completedLessons', data\.completedLessons \|\| \[\]\)/);
});


test('authored A1 ordering exercises reference the vocabulary used by their answers', () => {
  const a1 = app.CourseData.levels.find(level => level.id === 'A1');
  const kitchen = a1.units.find(unit => unit.id === 'a1_u23');
  const kitchenExercise = kitchen.exercises.find(exercise => exercise.prompt === 'Ordena: Estoy en la cocina.');
  assert.equal(kitchenExercise.vocabId, 'v374');
  assert.deepEqual(Array.from(kitchenExercise.correctOrder), ['Saya', 'di', 'dapur']);
  const sequence = a1.units.find(unit => unit.id === 'a1_u29');
  const sequenceExercise = sequence.exercises.find(exercise => exercise.prompt === 'Ordena: Como antes de estudiar.');
  assert.equal(sequenceExercise.vocabId, 'v443');
  assert.deepEqual(Array.from(sequenceExercise.correctOrder), ['Saya', 'makan', 'sebelum', 'belajar']);
});


test('A1 U24-U32 use focused authored lesson plans while retaining generated practice and progression', () => {
  const a1 = app.CourseData.levels.find(level => level.id === 'A1');
  const units = a1.units.slice(23, 32);
  assert.deepEqual(Array.from(units, unit => unit.id),
    ['a1_u24', 'a1_u25', 'a1_u26', 'a1_u27', 'a1_u28', 'a1_u29', 'a1_u30', 'a1_u31', 'a1_u32']);

  for (const unit of units) {
    assert.equal(unit.lessonPlans.length, 3, unit.id + ' should define three focused lesson plans');
    const lessons = app.buildUnitLessons(unit);
    assert.equal(lessons.length, unit.vocab.length >= 18 ? 6 : 5, unit.id + ' should meet the new A1 lesson standard');
    assert.deepEqual(Array.from(lessons.slice(0, 3), lesson => lesson.title), Array.from(unit.lessonPlans, plan => plan.title));
    lessons.slice(0, 3).forEach((lesson, index) => {
      const plan = unit.lessonPlans[index];
      assert.ok(plan.objective && plan.grammar, unit.id + ' lesson plan needs an objective and focused explanation');
      assert.equal(lesson.grammar, plan.objective + ' ' + plan.grammar);
      assert.ok(lesson.newVocab.length > 0, unit.id + ' original lesson should introduce vocabulary');
      assert.ok(lesson.exercises.length >= lesson.newVocab.length,
        unit.id + ' must preserve active practice after adding lesson metadata');
      const available = new Set(lesson.vocab.map(word => word.id));
      for (const exercise of lesson.exercises) {
        assert.ok(available.has(exercise.vocabId),
          unit.id + ' ' + lesson.title + ' must not assess vocabulary before it is introduced');
      }
    });
    lessons.slice(3).forEach((lesson, index) => {
      assert.equal(lesson.index, index + 3);
      assert.equal(lesson.title, 'Repaso activo ' + (index + 1));
      assert.deepEqual(Array.from(lesson.newVocab), []);
      assert.deepEqual(Array.from(lesson.reviewVocab, word => word.id), Array.from(unit.vocab, word => word.id));
      assert.equal(lesson.exercises.length, unit.vocab.length);
      assert.ok(lesson.exercises.every(exercise => exercise.generated));
    });
  }
});


test('authored lesson vocabulary references resolve unambiguously within their intended unit history', () => {
  const levels = app.CourseData.levels;
  const orderedUnits = levels.flatMap(level => level.units);

  orderedUnits.forEach((unit, unitIndex) => {
    if (!Array.isArray(unit.lessons) || !unit.lessons.length) return;

    const previouslyTaughtInUnit = [];
    for (const lesson of unit.lessons) {
      for (const id of lesson.vocabIds || []) {
        const localMatches = (unit.vocab || []).filter(word => word.id === id);
        assert.equal(localMatches.length, 1,
          unit.id + ' new vocabulary reference ' + id + ' must resolve exactly once inside its own unit');
      }

      for (const id of lesson.reviewVocabIds || []) {
        const previousMatches = [
          ...orderedUnits.slice(0, unitIndex).flatMap(previousUnit => previousUnit.vocab || []),
          ...previouslyTaughtInUnit
        ].filter(word => word.id === id);
        assert.ok(previousMatches.length >= 1,
          unit.id + ' review vocabulary reference ' + id + ' must exist in previously taught course vocabulary');
        const resolvedForms = new Set(previousMatches.map(word => String(word.idn || '').toLowerCase()));
        assert.equal(resolvedForms.size, 1,
          unit.id + ' review vocabulary reference ' + id + ' must always resolve to the same Indonesian form');
      }

      for (const id of lesson.vocabIds || []) {
        previouslyTaughtInUnit.push(...(unit.vocab || []).filter(word => word.id === id));
      }
    }
  });
});


test('B1 U13-U26 expose five lessons while preserving authored vocabulary order and adding full-unit review', () => {
  const levels = app.CourseData.levels;
  const a1 = levels.find(level => level.id === 'A1');
  const a2 = levels.find(level => level.id === 'A2');
  const b1 = levels.find(level => level.id === 'B1');
  const known = new Set([...a1.units, ...a2.units].flatMap(unit => unit.vocab.map(word => word.id)));
  for (const unit of b1.units.filter(unit => /^b1_u(?:[1-9]|1[0-2])$/.test(unit.id))) {
    for (const word of unit.vocab) known.add(word.id);
  }
  const targetUnits = b1.units.filter(unit => /^b1_u(?:1[3-9]|2[0-6])$/.test(unit.id));
  assert.equal(targetUnits.length, 14);
  for (const unit of targetUnits) {
    const lessons = app.buildUnitLessons(unit);
    const authoredCount = unit.lessons.length;
    assert.ok(authoredCount === 3 || authoredCount === 4, unit.id + ' should retain its three or four authored lessons');
    assert.equal(lessons.length, 5, unit.id + ' should expose five lessons');
    assert.deepEqual(
      Array.from(lessons.slice(0, authoredCount), lesson => lesson.title),
      Array.from(unit.lessons, lesson => lesson.title),
      unit.id + ' must preserve the authored lesson prefix'
    );
    const expectedNewIds = unit.vocab.filter(word => !known.has(word.id)).map(word => word.id).sort();
    const declaredNewIds = unit.lessons.flatMap(lesson => lesson.vocabIds || []);
    assert.equal(new Set(declaredNewIds).size, declaredNewIds.length, unit.id + ' must not introduce a word twice');
    assert.deepEqual(declaredNewIds.slice().sort(), expectedNewIds, unit.id + ' must introduce every new B1 word exactly once');

    let learned = new Set(known);
    for (const [index, lesson] of lessons.entries()) {
      const lessonIds = new Set(lesson.vocab.map(word => word.id));
      if (index < authoredCount) {
        const authored = unit.lessons[index];
        assert.equal(lesson.index, index, unit.id + ' authored lesson indexes must remain stable');
        for (const id of authored.reviewVocabIds || []) {
          assert.ok(learned.has(id), unit.id + ' lesson ' + index + ' reviews an unknown word: ' + id);
        }
        for (const id of authored.vocabIds || []) {
          assert.ok(!learned.has(id), unit.id + ' lesson ' + index + ' reintroduces an already learned word: ' + id);
        }
        for (const exercise of lesson.exercises) {
          assert.ok(lessonIds.has(exercise.vocabId), unit.id + ' lesson ' + index + ' exercises vocabulary not yet taught or reviewed: ' + exercise.vocabId);
        }
        for (const id of authored.vocabIds || []) learned.add(id);
      } else {
        assert.equal(lesson.index, index, unit.id + ' generated lesson indexes must be appended');
        assert.equal(lesson.title, 'Repaso activo ' + (index - authoredCount + 1));
        assert.deepEqual(Array.from(lesson.newVocab), []);
        assert.deepEqual(Array.from(lesson.reviewVocab, word => word.id), Array.from(unit.vocab, word => word.id));
        assert.equal(lesson.exercises.length, unit.vocab.length);
        assert.ok(lesson.exercises.every(exercise => exercise.generated));
        for (const exercise of lesson.exercises) {
          assert.ok(lessonIds.has(exercise.vocabId), unit.id + ' active recall must target vocabulary from its own unit');
        }
      }
    }
    for (const word of unit.vocab) { learned.add(word.id); known.add(word.id); }
    for (const word of unit.vocab) assert.ok(learned.has(word.id), unit.id + ' vocabulary should be available by unit end: ' + word.id);
  }
});


test('A1 explicit authored lessons also receive additive reinforcement without changing their original indexes', () => {
  const a1 = app.CourseData.levels.find(level => level.id === 'A1');
  const unit = a1.units.find(entry => entry.id === 'a1_u3');
  const authoredUnit = {
    ...unit,
    lessons: [
      { title: 'Lección manual 1', vocabIds: [unit.vocab[0].id], reviewVocabIds: [], exercises: [] },
      { title: 'Lección manual 2', vocabIds: unit.vocab.slice(1).map(word => word.id), reviewVocabIds: [unit.vocab[0].id], exercises: [] }
    ]
  };
  const lessons = app.buildUnitLessons(authoredUnit);
  assert.equal(lessons.length, 5);
  assert.deepEqual(Array.from(lessons.slice(0, 2), lesson => lesson.title), ['Lección manual 1', 'Lección manual 2']);
  assert.deepEqual(Array.from(lessons.slice(0, 2), lesson => lesson.index), [0, 1]);
  assert.deepEqual(Array.from(lessons.slice(2), lesson => lesson.title), ['Repaso activo 1', 'Repaso activo 2', 'Repaso activo 3']);
  assert.ok(lessons.slice(2).every(lesson => lesson.index >= 2 && lesson.exercises.length === unit.vocab.length));
});

test('A1 Unit 3 exposes five lessons including additive active recall', () => {
  const a1 = app.CourseData.levels.find(level => level.id === 'A1');
  const unit = a1.units.find(entry => entry.id === 'a1_u3');
  const lessons = app.buildUnitLessons(unit);
  assert.equal(lessons.length, 5);
  assert.deepEqual(Array.from(lessons.slice(-3), lesson => lesson.title),
    ['Repaso activo 1', 'Repaso activo 2', 'Repaso activo 3']);
});

test('A1 appends five or six active-recall lessons without shifting legacy lesson indexes', () => {
  const a1 = app.CourseData.levels.find(level => level.id === 'A1');
  for (const unit of a1.units) {
    const lessons = app.buildUnitLessons(unit);
    const legacyCount = Math.min(5, Math.max(2, Math.ceil(unit.vocab.length / 4)));
    const targetCount = unit.vocab.length >= 18 ? 6 : 5;
    assert.equal(lessons.length, targetCount, unit.id + ' should have five or six lessons');
    assert.deepEqual(Array.from(lessons.slice(0, legacyCount), lesson => lesson.index),
      Array.from({ length: legacyCount }, (_, index) => index),
      unit.id + ' legacy lesson indexes must remain unchanged');
    assert.ok(lessons.slice(0, legacyCount).every(lesson => !lesson.title.startsWith('Repaso activo')),
      unit.id + ' reinforcement must be appended after legacy lessons');
    for (const lesson of lessons.slice(legacyCount)) {
      assert.deepEqual(Array.from(lesson.reviewVocab, word => word.id), Array.from(unit.vocab, word => word.id));
      assert.equal(lesson.exercises.length, unit.vocab.length);
      assert.ok(lesson.exercises.every(exercise => unit.vocab.some(word => word.id === exercise.vocabId)));
      assert.ok(lesson.exercises.every(exercise => ['mc', 'listen', 'translate_es_id'].includes(exercise.type)));
    }
  }
});

test('all A2 units expose five lessons and preserve their authored lesson indexes', () => {
  const a2 = app.CourseData.levels.find(level => level.id === 'A2');
  assert.equal(a2.units.length, 40, 'A2 should contain all forty planned units');
  for (const unit of a2.units) {
    const lessons = app.buildUnitLessons(unit);
    assert.equal(lessons.length, 5, unit.id + ' should expose five lessons');
    const authoredCount = unit.lessons.length;
    assert.ok(authoredCount === 4 || authoredCount === 5, unit.id + ' should retain its four or five authored lessons');
    assert.deepEqual(Array.from(lessons.slice(0, authoredCount), lesson => lesson.index),
      Array.from({ length: authoredCount }, (_, index) => index),
      unit.id + ' authored lesson indexes must remain unchanged');
    assert.deepEqual(Array.from(lessons.slice(0, authoredCount), lesson => lesson.title),
      Array.from(unit.lessons, lesson => lesson.title),
      unit.id + ' authored lesson order and titles must remain unchanged');
    for (const lesson of lessons.slice(authoredCount)) {
      assert.equal(lesson.index, lessons.indexOf(lesson), unit.id + ' reinforcement index must be appended');
      assert.deepEqual(Array.from(lesson.newVocab, word => word.id), []);
      assert.deepEqual(Array.from(lesson.reviewVocab, word => word.id), Array.from(unit.vocab, word => word.id));
      assert.deepEqual(Array.from(lesson.vocab, word => word.id), Array.from(unit.vocab, word => word.id));
      assert.equal(lesson.exercises.length, unit.vocab.length, unit.id + ' reinforcement must practise every unit word');
      assert.ok(lesson.exercises.every(exercise => unit.vocab.some(word => word.id === exercise.vocabId)));
      assert.ok(lesson.exercises.every(exercise => ['mc', 'listen', 'translate_es_id'].includes(exercise.type)));
    }
  }
});

test('A1 completed units stay completed and existing in-progress lesson keys retain their indexes', () => {
  const a1 = app.CourseData.levels.find(level => level.id === 'A1');
  const unit = a1.units[0];
  const partial = app.getUnitProgressState(a1, unit, [], ['a1_u1::0', 'a1_u1::1']);
  assert.equal(partial.completedLessonCount, 2);
  assert.equal(partial.completed, false);
  assert.equal(app.unitLessonProgressKey('a1_u1', 0), 'a1_u1::0');
  const completed = app.getUnitProgressState(a1, unit, ['a1_u1'], []);
  assert.equal(completed.approved, true);
  assert.equal(completed.completed, true);
});
