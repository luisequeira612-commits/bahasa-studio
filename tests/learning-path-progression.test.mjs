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
    .replace('window.BAHASA_CURRICULUM_A1', a1)
    .replace('window.BAHASA_CURRICULUM_A2', a2);
  const start = source.indexOf('const CourseData =');
  const end = source.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  assert.ok(start >= 0 && end > start, 'course data and progression helpers must exist');
  const context = {
    App: { completedUnits: [], completedLessons: [] },
    localStorage: { getItem() { return null; } }
  };
  return vm.runInNewContext(source.slice(start, end) +
    '\nconst A2_RELEASE_ENABLED = true; ({ CourseData, buildUnitLessons, buildUnitAssessmentItems, getUnitProgressState, isUnitUnlocked, hasUnitFinalAssessment })',
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
  assert.equal(api.isUnitUnlocked(b2, b2.units[0], [], [], []), false,
    'the existing B2 guard keeps normal access closed');
  assert.equal(api.isUnitUnlocked(b2, b2.units[0], [], [], ['b2_u1']), true,
    'the explicit emergency skip can open the implemented U1 locally');
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
