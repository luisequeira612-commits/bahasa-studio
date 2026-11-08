import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { loadInlineB1Curriculum } from '../scripts/load-inline-b1-curriculum.mjs';
import { loadInlineB2Curriculum } from '../scripts/load-inline-b2-curriculum.mjs';

async function loadStandalone(path, globalName) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: path, timeout: 5000 });
  const level = sandbox.window[globalName];
  assert.ok(level && Array.isArray(level.units), globalName + ' must load');
  return level;
}

async function loadCurricula() {
  const [a1, a2, indexSource] = await Promise.all([
    loadStandalone('../curriculum-a1.js', 'BAHASA_CURRICULUM_A1'),
    loadStandalone('../curriculum-a2.js', 'BAHASA_CURRICULUM_A2'),
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
  ]);
  return {
    a1, a2, indexSource,
    b1: loadInlineB1Curriculum(indexSource, a1, a2),
    b2: loadInlineB2Curriculum(indexSource, a1, a2),
  };
}

function allExercises(unit) {
  return (unit.lessons || []).flatMap((lesson) => lesson.exercises || []);
}

test('B2 U1 implements the approved three-lesson design with 16 exercises and five types', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u1');
  assert.ok(unit, 'B2 U1 must exist');
  assert.match(unit.title, /voz.*agente.*foco/i);
  assert.equal(unit.lessons.length, 3);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['listen', 'mc', 'order', 'translate_es_id', 'write']);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [5, 5, 6]);
  assert.ok(exercises.filter((exercise) => exercise.type === 'write' && exercise.hint?.trim()).length >= 1);
  assert.ok(unit.lessons.every((lesson) => lesson.vocabIds.length === 0));
});

test('B2 U1 reuses only the nine canonical B1 vocabulary IDs without changing their forms or glosses', async () => {
  const { b1, b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u1');
  const expectedIds = ['v211', 'v212', 'v213', 'v214', 'v8', 'b1v001', 'b1v002', 'b1v003', 'b1v004'].sort();
  assert.deepEqual(unit.vocab.map((word) => word.id).sort(), expectedIds);
  const b1Words = new Map(b1.units.flatMap((entry) => entry.vocab || []).map((word) => [word.id, word]));
  for (const word of unit.vocab) {
    const canonical = b1Words.get(word.id);
    assert.ok(canonical, word.id + ' must already exist in B1');
    assert.equal(word.idn, canonical.idn, word.id + ' form must remain identical');
    assert.equal(word.esp, canonical.esp, word.id + ' gloss must remain identical');
  }
  const allowed = new Set(expectedIds);
  for (const lesson of unit.lessons) {
    for (const id of [...lesson.vocabIds, ...lesson.reviewVocabIds]) assert.ok(allowed.has(id), 'unexpected vocabulary ID: ' + id);
    for (const exercise of lesson.exercises) assert.ok(allowed.has(exercise.vocabId), 'exercise references unknown vocabulary: ' + exercise.vocabId);
  }
});

test('B2 U1 has at least five sentence-level targets and a guided original-writing task', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u1');
  const exercises = allExercises(unit);
  const target = (exercise) => {
    if (Array.isArray(exercise.correctOrder)) return exercise.correctOrder.join(' ');
    if (typeof exercise.modelAnswer === 'string') return exercise.modelAnswer;
    if (typeof exercise.answer === 'string') return exercise.answer;
    if (Number.isInteger(exercise.answer) && Array.isArray(exercise.options)) return exercise.options[exercise.answer] || '';
    return '';
  };
  const fullSentences = exercises.filter((exercise) => target(exercise).trim().split(/\s+/).filter(Boolean).length >= 2);
  assert.ok(fullSentences.length >= 5, 'expected at least five full-sentence targets');
  assert.ok(exercises.some((exercise) => exercise.type === 'write' && exercise.hint?.trim() && /mini texto|tres o cuatro oraciones/i.test(exercise.prompt)));
});

test('B2 stays inaccessible through every lesson entry point and the course route', async () => {
  const { indexSource } = await loadCurricula();
  const assertGuard = (method, expected, width = 650) => {
    const start = indexSource.indexOf(method);
    assert.notEqual(start, -1, method + ' must remain present');
    assert.ok(indexSource.slice(start, start + width).includes(expected),
      method + ' must reject registered B2 units');
  };

  assertGuard('startUnitById(id, requestedLessonIndex) {', "if (level.id === 'B2' ||");
  assertGuard('startUnitAssessment(unitId) {', "if (level && (level.id === 'B2' ||");
  assertGuard('startUnit(unit, lessonIndex = 0) {', "if (level && (level.id === 'B2' ||");

  const learningLevels = indexSource.indexOf('function getLearningLevels() {');
  assert.notEqual(learningLevels, -1);
  assert.ok(indexSource.slice(learningLevels, learningLevels + 260).includes("level.id !== 'B2'"),
    'B2 must stay out of learning and review collections');

  const routeStart = indexSource.indexOf("const isAdvanced = lvl.id === 'B2';");
  const routeEnd = indexSource.indexOf('lvl.units.forEach(unit => {', routeStart);
  assert.notEqual(routeStart, -1);
  assert.ok(routeEnd > routeStart, 'B2 route gate must precede unit-card rendering');
  const routeGate = indexSource.slice(routeStart, routeEnd);
  assert.ok(routeGate.includes('if (!isB1Complete(this.completedUnits)) return;'));
  assert.ok(routeGate.includes('Este nivel todavía no está disponible para estudiar.'));
  assert.ok(routeGate.includes('container.appendChild(levelEl);'));
  assert.match(routeGate, /return;\s*}/);
});

test('tap translation fallback excludes hidden B2 authored exercises', async () => {
  const { indexSource } = await loadCurricula();
  const fallbackStart = indexSource.indexOf('// Existing authored translation exercises are a fallback source');
  assert.notEqual(fallbackStart, -1, 'tap translation fallback must remain present');
  const levelLoop = indexSource.indexOf('for (const level of CourseData.levels) {', fallbackStart);
  const unitLoop = indexSource.indexOf('for (const unit of level.units || []) {', levelLoop);
  assert.ok(levelLoop > fallbackStart && unitLoop > levelLoop, 'fallback must iterate authored levels and units');
  assert.ok(indexSource.slice(levelLoop, unitLoop).includes("if (level.id === 'B2') continue;"),
    'hidden B2 translation exercises must not leak into the tap-translation helper');
});

test('B2 U2 candidate forms stay out of executable curriculum until explicit approval', async () => {
  const { b2, indexSource } = await loadCurricula();
  const candidateForms = ['kubaca', 'kaubaca', 'kutulis', 'kautulis'];
  const executableText = JSON.stringify(b2);
  for (const form of candidateForms) {
    assert.equal(executableText.includes(form), false, form + ' must not be executable before approval');
    assert.equal(indexSource.includes(form), false, form + ' must not be authored in index.html before approval');
  }
});


test('only implemented B2 U1 remains executable while legacy draft units stay archived', async () => {
  const { b2 } = await loadCurricula();
  const legacyArchive = await readFile(new URL('../docs/B2_LEGACY_DRAFT_ARCHIVE.md', import.meta.url), 'utf8');
  assert.deepEqual(b2.units.map((unit) => unit.id), ['b2_u1']);
  for (const id of ['b2_u2', 'b2_u3', 'b2_u4', 'b2_u5']) {
    assert.ok(legacyArchive.includes('"id": "' + id + '"'), id + ' must remain in the historical archive');
  }
  for (const id of ['v231', 'v232', 'v233', 'v234', 'v235', 'v236', 'v237', 'v238',
    'v239', 'v240', 'v241', 'v242', 'v243', 'v244', 'v245', 'v246']) {
    assert.equal(b2.units.flatMap((unit) => unit.vocab || []).some((word) => word.id === id), false,
      id + ' belongs only to the archived legacy draft until approved for reuse');
  }
});


test('tutor prompt never labels the learner as hidden B2 from stale completion data', async () => {
  const { indexSource } = await loadCurricula();
  const promptStart = indexSource.indexOf('async buildPrompt(topic) {');
  assert.notEqual(promptStart, -1, 'tutor prompt builder must remain present');
  const promptSource = indexSource.slice(promptStart, promptStart + 850);
  assert.ok(promptSource.includes("l.id !== 'B2' &&"),
    'hidden B2 must not influence the tutor prompt level inferred from saved completions');
});

test('direct lesson entry blocks registered B2 units while preserving custom lessons', async () => {
  const { indexSource } = await loadCurricula();
  const start = indexSource.indexOf('startUnit(unit, lessonIndex = 0) {');
  assert.notEqual(start, -1, 'startUnit must remain present');
  assert.ok(indexSource.slice(start, start + 450).includes("if (level && (level.id === 'B2' ||"),
    'startUnit must block registered B2 units without rejecting unregistered custom lessons');
});


test('AI generated-lesson repetition check excludes hidden B2 vocabulary', async () => {
  const { indexSource } = await loadCurricula();
  const validateStart = indexSource.indexOf('async validate(d) {');
  assert.notEqual(validateStart, -1, 'AI lesson validator must remain present');
  const knownStart = indexSource.indexOf('const known = new Set();', validateStart);
  const knownEnd = indexSource.indexOf('return {', knownStart);
  assert.ok(knownStart > validateStart && knownEnd > knownStart, 'AI repetition check must remain in the validator');
  const knownSource = indexSource.slice(knownStart, knownEnd);
  assert.ok(knownSource.includes('getLearningLevels().forEach('),
    'AI repetition check must use learning-visible levels only');
  assert.equal(knownSource.includes('getLevels().forEach('), false,
    'AI repetition check must not include hidden B2 through getLevels()');
});
