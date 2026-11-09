'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('A2 is enabled in beta independently of A1 completion', () => {
  assert.match(html, /const A2_RELEASE_ENABLED = true;/);
  assert.match(html, /level\.id !== 'A2' \|\| A2_RELEASE_ENABLED/);
  assert.doesNotMatch(html, /A2[^\n]{0,100}isA1Complete|isA1Complete[^\n]{0,100}A2/);
});

test('A2 level visibility honors the release flag while unit entry remains sequential', () => {
  assert.match(html, /if \(levelId === 'A2' && !A2_RELEASE_ENABLED\) return;/);
  assert.match(html, /if \(level\.id === 'A2' && !A2_RELEASE_ENABLED\) return false;/);
  const assessmentEntry = html.slice(html.indexOf('startUnitAssessment(unitId)'), html.indexOf('startUnitById(id, requestedLessonIndex)'));
  const lessonEntry = html.slice(html.indexOf('startUnitById(id, requestedLessonIndex)'), html.indexOf('startUnit(unit, lessonIndex = 0)'));
  const unitEntry = html.slice(html.indexOf('startUnit(unit, lessonIndex = 0)'), html.indexOf('function getLevels()'));
  for (const entry of [assessmentEntry, lessonEntry, unitEntry]) {
    assert.match(entry, /!isUnitUnlocked\(level, unit\)/);
    assert.doesNotMatch(entry, /isA1Complete/);
  }
  assert.match(html, /function isUnitUnlocked\(level, unit/);
  assert.match(html, /const previousLevel = levels\[levelIndex - 1\]/);
});

test('A1 completion helper remains available for the separate advanced-level gate', () => {
  assert.match(html, /return Boolean\(a1 && a1\.units\.length > 0 && a1\.units\.every\(unit => completed\.includes\(unit\.id\)\)\);/);
});

test('A2 beta policy documentation matches the enabled release gate', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs', 'A2-UNITS-01-04-AUDIT.md'), 'utf8');
  const plan = fs.readFileSync(path.join(__dirname, '..', 'docs', 'A2_LANGUAGE_AUDIT_PLAN.md'), 'utf8');
  assert.match(audit, /A2 está habilitado en beta \(\`A2_RELEASE_ENABLED = true\`\)/);
  assert.match(plan, /A2 está habilitado en beta y está disponible sin completar las 32 unidades de A1/);
  assert.doesNotMatch(plan, /A2 debe permanecer oculto para estudiantes/);
});


test('B1 unlocks after A2; B2 U1 follows B1, U2 follows U1 and U3 follows U2 while later units stay in development', () => {
  const learningLevels = html.slice(html.indexOf('function getLearningLevels()'), html.indexOf('function getUniqueLearningVocabulary()'));
  assert.match(learningLevels, /level\.id !== 'B2'/);
  assert.doesNotMatch(learningLevels, /B1/);

  const assessmentEntry = html.slice(html.indexOf('startUnitAssessment(unitId)'), html.indexOf('startUnitById(id, requestedLessonIndex)'));
  const lessonEntry = html.slice(html.indexOf('startUnitById(id, requestedLessonIndex)'), html.indexOf('startUnit(unit, lessonIndex = 0)'));
  const unitEntry = html.slice(html.indexOf('startUnit(unit, lessonIndex = 0)'), html.indexOf('function getLevels()'));
  assert.match(assessmentEntry, /level\.id === 'B2'/);
  assert.match(lessonEntry, /!isUnitUnlocked\(level, unit\)/);
  assert.match(unitEntry, /!isUnitUnlocked\(level, unit\)/);
  for (const entry of [assessmentEntry, lessonEntry, unitEntry]) {
    assert.doesNotMatch(entry, /level\.id === 'B1'/);
  }

  assert.match(html, /function isUnitUnlocked\(level, unit/);
  assert.match(html, /const previousLevel = levels\[levelIndex - 1\]/);
  assert.match(html, /if \(level\.id === 'B2'\) \{/);
  assert.match(html, /if \(unitIndex === 0\) return Boolean\(previousUnit[\s\S]*?return unitIndex > 0 && getUnitProgressState\(level, level\.units\[unitIndex - 1\]/);
  assert.match(html, /level\.id === 'B2' \? level\.units\.slice\(0, 3\) : level\.units/);
  assert.match(html, /unit-path-coming-soon/);
  assert.ok(html.includes("['A1', 'B1'].includes(level.id)"));
});
