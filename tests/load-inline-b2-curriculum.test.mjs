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

test('B2 keeps its development gate while implemented U1 unlocks sequentially after B1', async () => {
  const { indexSource } = await loadCurricula();
  const assessmentStart = indexSource.indexOf('startUnitAssessment(unitId) {');
  assert.notEqual(assessmentStart, -1);
  assert.ok(indexSource.slice(assessmentStart, assessmentStart + 700).includes("level.id === 'B2'"),
    'B2 does not expose a final assessment');
  const byIdStart = indexSource.indexOf('startUnitById(id, requestedLessonIndex) {');
  const startUnitStart = indexSource.indexOf('startUnit(unit, lessonIndex = 0) {');
  assert.ok(indexSource.slice(byIdStart, byIdStart + 700).includes('!isUnitUnlocked(level, unit)'),
    'direct lesson entry must use the derived unit gate');
  assert.ok(indexSource.slice(startUnitStart, startUnitStart + 700).includes('!isUnitUnlocked(level, unit)'),
    'direct engine entry must use the same derived unit gate');
  const unlockStart = indexSource.indexOf('function isUnitUnlocked(level, unit');
  assert.ok(indexSource.slice(unlockStart, unlockStart + 1500).includes('if (unitIndex === 0)'),
    'B2 U1 still requires the final B1 unit');
  assert.ok(indexSource.slice(unlockStart, unlockStart + 1500).includes('unitIndex > 0 && getUnitProgressState(level, level.units[unitIndex - 1]'),
    'later implemented B2 units unlock sequentially');

  const learningLevels = indexSource.indexOf('function getLearningLevels() {');
  assert.notEqual(learningLevels, -1);
  const learningSource = indexSource.slice(learningLevels, learningLevels + 650);
  assert.ok(learningSource.includes("level.id !== 'B2'"), 'non-B2 learning levels remain available');
  assert.ok(learningSource.includes("unit.id === 'b2_u1' || unit.id === 'b2_u2' || unit.id === 'b2_u3' || unit.id === 'b2_u4' || unit.id === 'b2_u5'"),
    'only implemented B2 U1/U2/U3/U4/U5 may enter learning and review collections');
  assert.ok(learningSource.includes("level.id !== 'A2' || A2_RELEASE_ENABLED"),
    'the existing A2 release condition remains intact');

  const routeStart = indexSource.indexOf('renderCourseRoute() {');
  const routeEnd = indexSource.indexOf('async updateSrsView() {', routeStart);
  assert.ok(routeEnd > routeStart, 'learning route renderer must exist');
  const route = indexSource.slice(routeStart, routeEnd);
  const visibleUnitsStart = indexSource.indexOf('getVisibleLearningUnits(level) {');
  assert.notEqual(visibleUnitsStart, -1);
  assert.ok(indexSource.slice(visibleUnitsStart, visibleUnitsStart + 250).includes("level.units.slice(0, 5)"),
    'the route exposes only implemented B2 U1/U2/U3/U4/U5');
  assert.ok(route.includes('unit-path-coming-soon'));
  assert.ok(route.includes('Las demás unidades B2 todavía no están implementadas'));
  assert.doesNotMatch(route, /isB1Complete\(this\.completedUnits\)/,
    'B2 path visibility must not depend on the old hidden route gate');
});

test('tap translation fallback includes only implemented B2 U1/U2/U3/U4/U5 authored exercises', async () => {
  const { indexSource } = await loadCurricula();
  const fallbackStart = indexSource.indexOf('// Existing authored translation exercises are a fallback source');
  assert.notEqual(fallbackStart, -1, 'tap translation fallback must remain present');
  const levelLoop = indexSource.indexOf('for (const level of CourseData.levels) {', fallbackStart);
  const unitLoop = indexSource.indexOf('for (const unit of level.units || []) {', levelLoop);
  assert.ok(levelLoop > fallbackStart && unitLoop > levelLoop, 'fallback must iterate authored levels and units');
  const fallbackSource = indexSource.slice(unitLoop, unitLoop + 260);
  assert.ok(fallbackSource.includes("level.id === 'B2' && !['b2_u1', 'b2_u2', 'b2_u3', 'b2_u4', 'b2_u5'].includes(unit.id)"),
    'only implemented B2 U1/U2/U3/U4/U5 translation exercises may be used; future B2 units remain excluded');
});

test('B2 U2 implements the approved ku-/kau- design with 16 exercises and five types', async () => {
  const { b2, indexSource } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u2');
  assert.ok(unit, 'B2 U2 must exist');
  assert.equal(unit.lessons.length, 3);
  assert.equal(unit.vocab.length, 4);
  assert.deepEqual(unit.vocab.map((word) => word.id), ['b2u2_kubaca', 'b2u2_kaubaca', 'b2u2_kutulis', 'b2u2_kautulis']);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [5, 5, 6]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['listen', 'mc', 'order', 'translate_es_id', 'write']);
  assert.ok(exercises.filter((exercise) => exercise.type === 'write' && exercise.hint?.trim()).length >= 2);
  assert.ok(exercises.filter((exercise) => {
    const target = Array.isArray(exercise.correctOrder) ? exercise.correctOrder.join(' ')
      : typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer
      : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 2;
  }).length >= 5);
  for (const form of ['kubaca', 'kaubaca', 'kutulis', 'kautulis']) assert.ok(indexSource.includes(form), form + ' must be authored in U2');
});



test('B2 U3 integrates U1/U2 with 16 exercises, five types and no new vocabulary IDs', async () => {
  const { b1, b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u3');
  assert.ok(unit, 'B2 U3 must exist');
  assert.equal(unit.lessons.length, 3);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [5, 5, 6]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['listen', 'mc', 'order', 'translate_es_id', 'write']);
  const expectedIds = ['b2u2_kubaca', 'b2u2_kaubaca', 'b2u2_kutulis', 'b2u2_kautulis'];
  assert.deepEqual(unit.vocab.map((word) => word.id), expectedIds);
  const previousVocabulary = new Map(b2.units.filter((entry) => entry.id !== 'b2_u3')
    .flatMap((entry) => entry.vocab || []).concat(b1.units.flatMap((entry) => entry.vocab || []))
    .map((word) => [word.id, word]));
  for (const word of unit.vocab) {
    const existing = previousVocabulary.get(word.id);
    assert.ok(existing, word.id + ' must be reused from U1/U2 or an earlier level');
    assert.equal(word.idn, existing.idn, word.id + ' form must remain canonical');
    assert.equal(word.esp, existing.esp, word.id + ' gloss must remain canonical');
  }
  const allowedReviewIds = new Set([
    'v211', 'v212', 'v213', 'v214', 'v8', 'b1v001', 'b1v002', 'b1v003', 'b1v004',
    ...expectedIds
  ]);
  for (const lesson of unit.lessons) {
    for (const id of [...lesson.vocabIds, ...lesson.reviewVocabIds]) {
      assert.ok(allowedReviewIds.has(id), 'U3 may only reuse existing vocabulary IDs: ' + id);
    }
  }
  const sentenceTargets = exercises.filter((exercise) => {
    const target = Array.isArray(exercise.correctOrder) ? exercise.correctOrder.join(' ')
      : typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer
      : Number.isInteger(exercise.answer) && Array.isArray(exercise.options) ? exercise.options[exercise.answer] || ''
      : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 2;
  });
  assert.ok(sentenceTargets.length >= 5, 'U3 must include at least five complete-sentence targets');
  assert.ok(exercises.some((exercise) => exercise.type === 'write' && exercise.hint?.trim()
    && /mini texto|tres o cuatro oraciones/i.test(exercise.prompt)), 'U3 must include guided original writing');
});



test('B2 U4 implements five authored lessons with 16 contextual exercises and canonical vocabulary only', async () => {
  const { b1, b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u4');
  assert.ok(unit, 'B2 U4 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['listen', 'mc', 'order', 'translate_es_id', 'write']);
  const expectedIds = ['b1u4_memberikan', 'b1u4_mengirimkan', 'b1u4_menjelaskan', 'b1u4_membersihkan'];
  assert.deepEqual(unit.vocab.map((word) => word.id), expectedIds);
  const canonical = new Map(b1.units.flatMap((entry) => entry.vocab || []).map((word) => [word.id, word]));
  for (const word of unit.vocab) {
    const source = canonical.get(word.id);
    assert.ok(source, word.id + ' must already exist in B1');
    assert.equal(word.idn, source.idn, word.id + ' form must remain canonical');
    assert.equal(word.esp, source.esp, word.id + ' gloss must remain canonical');
  }
  const allowed = new Set(expectedIds);
  for (const lesson of unit.lessons) {
    for (const id of [...lesson.vocabIds, ...lesson.reviewVocabIds]) assert.ok(allowed.has(id), 'unexpected vocabulary ID: ' + id);
    for (const exercise of lesson.exercises) assert.ok(allowed.has(exercise.vocabId), 'unknown exercise vocabulary: ' + exercise.vocabId);
  }
  const sentenceTargets = exercises.filter((exercise) => {
    const target = Array.isArray(exercise.correctOrder) ? exercise.correctOrder.join(' ')
      : typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer
      : Number.isInteger(exercise.answer) && Array.isArray(exercise.options) ? exercise.options[exercise.answer] || ''
      : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 2;
  });
  assert.ok(sentenceTargets.length >= 5, 'U4 must include at least five sentence-level targets');
  assert.ok(exercises.some((exercise) => exercise.type === 'write' && exercise.hint?.trim()
    && /mini texto|tres o cuatro oraciones/i.test(exercise.prompt)), 'U4 must include guided original writing');
  assert.match(unit.grammar, /no tiene una sola función/i);
});


test('B2 U5 implements the approved -i design with five lessons, 16 exercises and scoped vocabulary', async () => {
  const { b1, a1, a2, b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u5');
  assert.ok(unit, 'B2 U5 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['listen', 'mc', 'order', 'translate_es_id', 'write']);
  assert.deepEqual(unit.vocab.map((word) => word.id),
    ['b2u5_menawari', 'b2u5_menawarkan', 'v448', 'b1v145']);
  const canonical = new Map([...a1.units, ...a2.units, ...b1.units].flatMap((entry) => entry.vocab || []).map((word) => [word.id, word]));
  for (const word of unit.vocab.filter((entry) => ['v448', 'b1v145'].includes(entry.id))) {
    const source = canonical.get(word.id);
    assert.ok(source, word.id + ' must be an existing canonical vocabulary ID');
    assert.equal(word.idn, source.idn);
    assert.equal(word.esp, source.esp);
  }
  const allowed = new Set(unit.vocab.map((word) => word.id));
  for (const lesson of unit.lessons) {
    for (const id of [...lesson.vocabIds, ...lesson.reviewVocabIds]) assert.ok(allowed.has(id), 'unexpected U5 vocabulary reference: ' + id);
    for (const exercise of lesson.exercises) assert.ok(allowed.has(exercise.vocabId), 'unknown U5 exercise vocabulary: ' + exercise.vocabId);
  }
  const target = (exercise) => Array.isArray(exercise.correctOrder) ? exercise.correctOrder.join(' ')
    : typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
    : typeof exercise.answer === 'string' ? exercise.answer
    : Number.isInteger(exercise.answer) && Array.isArray(exercise.options) ? exercise.options[exercise.answer] || ''
    : '';
  assert.ok(exercises.filter((exercise) => target(exercise).trim().split(/\\s+/).filter(Boolean).length >= 2).length >= 5,
    'U5 must include at least five complete-sentence targets');
  assert.ok(exercises.some((exercise) => exercise.type === 'write' && exercise.hint?.trim()
    && /mini texto|tres oraciones/i.test(exercise.prompt)), 'U5 must include guided original writing');
  const recognitionText = [unit.grammar, ...unit.lessons.map((lesson) => lesson.grammar)].join(' ').toLowerCase();
  for (const form of ['datangi', 'panasi', 'menjatuhi', 'dijatuhi']) assert.ok(recognitionText.includes(form), form + ' must remain recognition-only');
  for (const excluded of ['tanami', 'garami', 'kantongi']) assert.equal(unit.vocab.some((word) => word.idn.toLowerCase() === excluded), false);
  assert.match(unit.vocab.find((word) => word.id === 'b2u5_menawari').esp, /ofrecer algo a alguien/i);
  assert.match(unit.vocab.find((word) => word.id === 'b2u5_menawarkan').esp, /ofrecer algo/i);
});

test('only implemented B2 U1/U2/U3/U4/U5 remain executable while later legacy draft units stay archived', async () => {
  const { b2 } = await loadCurricula();
  const legacyArchive = await readFile(new URL('../docs/B2_LEGACY_DRAFT_ARCHIVE.md', import.meta.url), 'utf8');
  assert.deepEqual(b2.units.map((unit) => unit.id), ['b2_u1', 'b2_u2', 'b2_u3', 'b2_u4', 'b2_u5']);
  for (const id of ['b2_u5']) {
    assert.ok(legacyArchive.includes('"id": "' + id + '"'), id + ' must remain in the historical archive');
  }
  for (const id of ['v231', 'v232', 'v233', 'v234', 'v235', 'v236', 'v237', 'v238',
    'v239', 'v240', 'v241', 'v242', 'v243', 'v244', 'v245', 'v246']) {
    assert.equal(b2.units.flatMap((unit) => unit.vocab || []).some((word) => word.id === id), false,
      id + ' belongs only to the archived legacy draft until approved for reuse');
  }
});


test('tutor prompt infers B2 only from completed implemented U1/U2/U3/U4/U5', async () => {
  const { indexSource } = await loadCurricula();
  const promptStart = indexSource.indexOf('async buildPrompt(topic) {');
  assert.notEqual(promptStart, -1, 'tutor prompt builder must remain present');
  const promptSource = indexSource.slice(promptStart, promptStart + 950);
  assert.ok(promptSource.includes("(l.id !== 'B2' || u.id === 'b2_u1' || u.id === 'b2_u2' || u.id === 'b2_u3' || u.id === 'b2_u4' || u.id === 'b2_u5')"),
    'only implemented B2 U1/U2/U3/U4/U5 may affect the inferred tutor level');
  assert.ok(promptSource.includes('App.completedUnits.includes(u.id)'),
    'the tutor level still depends on saved unit completion');
});

test('direct lesson entry uses the shared B2 U1 sequential gate and emergency skip', async () => {
  const { indexSource } = await loadCurricula();
  const start = indexSource.indexOf('startUnit(unit, lessonIndex = 0) {');
  assert.notEqual(start, -1, 'startUnit must remain present');
  assert.ok(indexSource.slice(start, start + 550).includes('!isUnitUnlocked(level, unit)'),
    'startUnit must enforce the shared derived progression gate');
});
