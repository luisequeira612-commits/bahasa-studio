'use strict';

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

async function loadProgressionApi() {
  const [a1Source, a2Source, indexSource] = await Promise.all([
    readFile(new URL('../curriculum-a1.js', import.meta.url), 'utf8'),
    readFile(new URL('../curriculum-a2.js', import.meta.url), 'utf8'),
    readFile(new URL('../index.html', import.meta.url), 'utf8')
  ]);
  const a1 = a1Source.slice(a1Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
  const a2 = a2Source.slice(a2Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
  const source = indexSource
    .replaceAll('window.BAHASA_CURRICULUM_A1', a1)
    .replaceAll('window.BAHASA_CURRICULUM_A2', a2);
  const start = source.indexOf('const CourseData =');
  const end = source.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  assert.ok(start >= 0 && end > start, 'course data and progression helpers must exist');
  const context = {
    App: { completedUnits: [], completedLessons: [] },
    localStorage: { getItem() { return null; } }
  };
  return vm.runInNewContext(source.slice(start, end) +
    '\nconst A2_RELEASE_ENABLED = true; ({ CourseData, buildUnitLessons, buildUnitAssessmentItems, getUnitProgressState, isUnitUnlocked, hasUnitFinalAssessment, getCurrentLearningLevelId, syncLearningLevelAfterUnitCompletion, App })',
    context, { timeout: 5000 });
}

test('A1 Unit 3 keeps its existing one-of-two lesson progress and does not unlock Unit 4', async () => {
  const api = await loadProgressionApi();
  const a1 = api.CourseData.levels.find(level => level.id === 'A1');
  const unit3 = a1.units[2];
  const completedUnits = ['a1_u1', 'a1_u2'];
  const completedLessons = [unit3.id + '::0'];
  const progress = api.getUnitProgressState(a1, unit3, completedUnits, completedLessons);
  assert.equal(progress.lessons.length, 2);
  assert.equal(progress.completedLessonCount, 1);
  assert.equal(progress.completed, false);
  assert.equal(api.isUnitUnlocked(a1, unit3, completedUnits, completedLessons, []), true);
  assert.equal(api.isUnitUnlocked(a1, a1.units[3], completedUnits, completedLessons, []), false);
});

test('an already approved A2 unit remains completed and unlocks the following unit without lesson keys', async () => {
  const api = await loadProgressionApi();
  const a1 = api.CourseData.levels.find(level => level.id === 'A1');
  const a2 = api.CourseData.levels.find(level => level.id === 'A2');
  const completedUnits = a1.units.map(unit => unit.id).concat(a2.units[0].id);
  const progress = api.getUnitProgressState(a2, a2.units[0], completedUnits, []);
  assert.equal(progress.approved, true);
  assert.equal(progress.completed, true);
  assert.equal(progress.completedLessonCount, progress.lessons.length);
  assert.equal(api.isUnitUnlocked(a2, a2.units[1], completedUnits, [], []), true);
});

test('a new multi-lesson A2 unit unlocks its successor only after every lesson is completed', async () => {
  const api = await loadProgressionApi();
  const a1 = api.CourseData.levels.find(level => level.id === 'A1');
  const a2 = api.CourseData.levels.find(level => level.id === 'A2');
  const index = a2.units.findIndex((unit, i) => i < a2.units.length - 1 && api.buildUnitLessons(unit).length > 1);
  assert.ok(index >= 0, 'A2 must contain a multi-lesson unit with a successor');
  const unit = a2.units[index];
  const next = a2.units[index + 1];
  const completedUnits = a1.units.map(entry => entry.id).concat(a2.units.slice(0, index).map(entry => entry.id));
  const lessons = api.buildUnitLessons(unit);
  const partialKeys = [unit.id + '::' + lessons[0].index];
  const partial = api.getUnitProgressState(a2, unit, completedUnits, partialKeys);
  assert.equal(partial.completed, false);
  assert.equal(api.isUnitUnlocked(a2, next, completedUnits, partialKeys, []), false);

  const allKeys = lessons.map(lesson => unit.id + '::' + lesson.index);
  const complete = api.getUnitProgressState(a2, unit, completedUnits, allKeys);
  assert.equal(complete.allLessonsComplete, true);
  assert.equal(complete.requiresAssessment, false);
  assert.equal(complete.completed, true);
  assert.equal(api.isUnitUnlocked(a2, next, completedUnits, allKeys, []), true);
});

test('B1 units with a final assessment require the existing 80 percent approval after all lessons', async () => {
  const api = await loadProgressionApi();
  const b1 = api.CourseData.levels.find(level => level.id === 'B1');
  const index = b1.units.findIndex(unit => api.hasUnitFinalAssessment(b1, unit) && api.buildUnitLessons(unit).length > 0);
  assert.ok(index >= 0);
  const unit = b1.units[index];
  const lessons = api.buildUnitLessons(unit);
  const completedLessons = lessons.map(lesson => unit.id + '::' + lesson.index);
  const beforeAssessment = api.getUnitProgressState(b1, unit, [], completedLessons);
  assert.equal(beforeAssessment.allLessonsComplete, true);
  assert.equal(beforeAssessment.requiresAssessment, true);
  assert.equal(beforeAssessment.completed, false);
  const afterAssessment = api.getUnitProgressState(b1, unit, [unit.id], completedLessons);
  assert.equal(afterAssessment.completed, true);
});

test('B2 U1 has no final assessment in the current course route', async () => {
  const api = await loadProgressionApi();
  const b2 = api.CourseData.levels.find(level => level.id === 'B2');
  assert.equal(api.hasUnitFinalAssessment(b2, b2.units[0]), false);
  const b1 = api.CourseData.levels.find(level => level.id === 'B1');
  const completedB1 = b1.units.map(unit => unit.id);
  assert.equal(api.isUnitUnlocked(b2, b2.units[0], [], [], []), false,
    'B2 U1 remains locked until B1 is complete');
  assert.equal(api.isUnitUnlocked(b2, b2.units[0], completedB1, [], []), true,
    'implemented B2 U1 unlocks after the last B1 unit is complete');
  assert.equal(api.isUnitUnlocked(b2, b2.units[0], [], [], ['b2_u1']), true,
    'the explicit emergency skip can open the implemented U1 locally');
});

test('completing the last B1 unit selects B2 so the next current node can be shown', async () => {
  const api = await loadProgressionApi();
  const a1 = api.CourseData.levels.find(level => level.id === 'A1');
  const a2 = api.CourseData.levels.find(level => level.id === 'A2');
  const b1 = api.CourseData.levels.find(level => level.id === 'B1');
  api.App.completedUnits = a1.units.map(unit => unit.id)
    .concat(a2.units.map(unit => unit.id), b1.units.map(unit => unit.id));
  api.App.completedLessons = [];
  api.App.selectedLearningLevel = 'B1';
  assert.equal(api.syncLearningLevelAfterUnitCompletion(b1.units[b1.units.length - 1].id), true);
  assert.equal(api.App.selectedLearningLevel, 'B2');
});

test('leaving a lesson early does not write a completed lesson key', async () => {
  const indexSource = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const exitStart = indexSource.indexOf('requestExit() {');
  const finishStart = indexSource.indexOf('async finishUnit() {');
  assert.ok(exitStart >= 0 && finishStart > exitStart);
  const exitSource = indexSource.slice(exitStart, indexSource.indexOf('vibrateFeedback()', exitStart));
  assert.doesNotMatch(exitSource, /completedLessons\.push|DB\.set\('settings', 'completedLessons'/);
  const finishSource = indexSource.slice(finishStart, indexSource.indexOf('/* 5b. LECCIONES GENERADAS', finishStart));
  assert.match(finishSource, /App\.completedLessons\.push\(lessonKey\)/);
  assert.match(finishSource, /await DB\.set\('settings', 'completedLessons', App\.completedLessons\)/);
});

test('the new path is mobile-first and keeps the backup format and offline worker untouched', async () => {
  const [indexSource, css, manifest, worker] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../styles.css', import.meta.url), 'utf8'),
    readFile(new URL('../manifest.json', import.meta.url), 'utf8'),
    readFile(new URL('../service-worker.js', import.meta.url), 'utf8')
  ]);
  assert.match(indexSource, /unitBottomSheet/);
  assert.match(indexSource, /bahasaStudioUnitSkipId/);
  assert.match(css, /@media \(max-width: 380px\)/);
  assert.match(css, /min-width: 44px/);
  assert.match(css, /min-height: 44px/);
  assert.match(indexSource, /completedLessons: this\.completedLessons/);
  assert.match(indexSource, /putSetting\('completedLessons', data\.completedLessons \|\| \[\]\)/);
  assert.match(manifest, /"display":\s*"standalone"/);
  assert.match(worker, /bahasa-studio-v3\.8\./);
});

test('default level follows the first unfinished level and keeps B2 visible after B1 completion', async () => {
  const api = await loadProgressionApi();
  const [a1, a2, b1] = ['A1', 'A2', 'B1'].map(id => api.CourseData.levels.find(level => level.id === id));
  assert.equal(api.getCurrentLearningLevelId([], []), 'A1');
  const completedA1 = a1.units.map(unit => unit.id);
  assert.equal(api.getCurrentLearningLevelId(completedA1, []), 'A2');
  const completedA1A2 = completedA1.concat(a2.units.map(unit => unit.id));
  assert.equal(api.getCurrentLearningLevelId(completedA1A2, []), 'B1');
  const completedThroughB1 = completedA1A2.concat(b1.units.map(unit => unit.id));
  assert.equal(api.getCurrentLearningLevelId(completedThroughB1, []), 'B2');
  assert.equal(api.getCurrentLearningLevelId([], [], ['b1_u10']), 'B1', 'an emergency jump should restore its selected level after reload');
  assert.equal(api.getCurrentLearningLevelId([], [], ['b2_u1']), 'B2', 'the implemented B2 emergency jump should remain selected after reload');
});
