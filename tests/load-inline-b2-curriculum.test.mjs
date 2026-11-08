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

test('B1 and B2 remain accessible through lesson entry points and the course route', async () => {
  const { indexSource } = await loadCurricula();
  for (const method of [
    'startUnitById(id, requestedLessonIndex) {',
    'startUnitAssessment(unitId) {',
    'startUnit(unit, lessonIndex = 0) {',
  ]) {
    const start = indexSource.indexOf(method);
    assert.notEqual(start, -1, method + ' must remain present');
    const source = indexSource.slice(start, start + 700);
    assert.equal(source.includes("level.id === 'B2' ||"), false,
      method + ' must not block registered B2 units');
  }

  const learningLevels = indexSource.indexOf('function getLearningLevels() {');
  assert.notEqual(learningLevels, -1);
  const learningSource = indexSource.slice(learningLevels, learningLevels + 220);
  assert.equal(learningSource.includes("level.id !== 'B2'"), false,
    'B2 must remain in learning and review collections');

  const routeStart = indexSource.indexOf("const isAdvanced = false;");
  const routeEnd = indexSource.indexOf('lvl.units.forEach(unit => {', routeStart);
  assert.notEqual(routeStart, -1);
  assert.ok(routeEnd > routeStart, 'course route must render level cards normally');
  const routeSource = indexSource.slice(routeStart, routeEnd);
  assert.equal(routeSource.includes('Este nivel todavía no está disponible para estudiar.'), false);
});

test('tap translation fallback includes B2 authored exercises', async () => {
  const { indexSource } = await loadCurricula();
  const fallbackStart = indexSource.indexOf('// Existing authored translation exercises are a fallback source');
  assert.notEqual(fallbackStart, -1, 'tap translation fallback must remain present');
  const levelLoop = indexSource.indexOf('for (const level of CourseData.levels) {', fallbackStart);
  const unitLoop = indexSource.indexOf('for (const unit of level.units || []) {', levelLoop);
  assert.ok(levelLoop > fallbackStart && unitLoop > levelLoop, 'fallback must iterate authored levels and units');
  assert.equal(indexSource.slice(levelLoop, unitLoop).includes("if (level.id === 'B2') continue;"), false,
    'B2 authored exercises must remain available to the tap-translation helper');
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


test('tutor prompt can infer B2 from saved completion data', async () => {
  const { indexSource } = await loadCurricula();
  const promptStart = indexSource.indexOf('async buildPrompt(topic) {');
  assert.notEqual(promptStart, -1, 'tutor prompt builder must remain present');
  const promptSource = indexSource.slice(promptStart, promptStart + 850);
  assert.equal(promptSource.includes("l.id !== 'B2' &&"), false,
    'B2 must remain eligible when inferring the tutor level from saved completions');
});

test('direct lesson entry preserves registered B2 units and custom lessons', async () => {
  const { indexSource } = await loadCurricula();
  const start = indexSource.indexOf('startUnit(unit, lessonIndex = 0) {');
  assert.notEqual(start, -1, 'startUnit must remain present');
  assert.equal(indexSource.slice(start, start + 450).includes("if (level && (level.id === 'B2' ||"), false,
    'startUnit must not block registered B2 units');
});
