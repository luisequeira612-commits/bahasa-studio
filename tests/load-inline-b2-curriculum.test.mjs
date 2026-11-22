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

test('B2 U1 implements five authored lessons with 26 exercises and five types', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u1');
  assert.ok(unit, 'B2 U1 must exist');
  assert.match(unit.title, /voz.*agente.*foco/i);
  assert.equal(unit.lessons.length, 5);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 26);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['listen', 'mc', 'order', 'translate_es_id', 'write']);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [5, 5, 6, 5, 5]);
  assert.ok(exercises.filter((exercise) => exercise.type === 'write' && exercise.hint?.trim()).length >= 1);
  assert.ok(unit.lessons.some((lesson) => lesson.vocabIds.length > 0), 'U1 must distribute its existing vocabulary across explicit lessons');
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

test('B2 U2 implements five authored lessons with 26 exercises and five types', async () => {
  const { b2, indexSource } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u2');
  assert.ok(unit, 'B2 U2 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.equal(unit.vocab.length, 4);
  assert.deepEqual(unit.vocab.map((word) => word.id), ['b2u2_kubaca', 'b2u2_kaubaca', 'b2u2_kutulis', 'b2u2_kautulis']);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [5, 5, 6, 5, 5]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 26);
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



test('B2 U3 integrates U1/U2 with five authored lessons, 26 exercises, five types and no new vocabulary IDs', async () => {
  const { b1, b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u3');
  assert.ok(unit, 'B2 U3 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [5, 5, 6, 5, 5]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 26);
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
  assert.ok(exercises.filter((exercise) => target(exercise).trim().split(/\s+/).filter(Boolean).length >= 2).length >= 5,
    'U5 must include at least five complete-sentence targets');
  assert.ok(exercises.some((exercise) => exercise.type === 'write' && exercise.hint?.trim()
    && /mini texto|tres oraciones/i.test(exercise.prompt)), 'U5 must include guided original writing');
  const recognitionText = [unit.grammar, ...unit.lessons.map((lesson) => lesson.grammar)].join(' ').toLowerCase();
  for (const form of ['datangi', 'panasi', 'menjatuhi', 'dijatuhi']) assert.ok(recognitionText.includes(form), form + ' must remain recognition-only');
  for (const excluded of ['tanami', 'garami', 'kantongi']) assert.equal(unit.vocab.some((word) => word.idn.toLowerCase() === excluded), false);
  assert.match(unit.vocab.find((word) => word.id === 'b2u5_menawari').esp, /ofrecer algo a alguien/i);
  assert.match(unit.vocab.find((word) => word.id === 'b2u5_menawarkan').esp, /ofrecer algo/i);
});


test('B2 U7 implements five authored lessons, 16 exercises and canonical reused vocabulary', async () => {
  const { a1, a2, b1, b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u7');
  assert.ok(unit, 'B2 U7 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['listen', 'mc', 'order', 'translate_es_id', 'write']);
  const canonicalA2 = new Map(a2.units.flatMap((entry) => entry.vocab || []).map((word) => [word.id, word]));
  const canonicalB1 = new Map(b1.units.flatMap((entry) => entry.vocab || []).map((word) => [word.id, word]));
  for (const id of ['a2u15_pertemuan', 'a2u14_perjalanan', 'v242']) {
    const local = unit.vocab.find((word) => word.id === id);
    const source = (id.startsWith('a2') ? canonicalA2 : canonicalB1).get(id);
    assert.ok(source, id + ' must exist in its original curriculum');
    assert.ok(local, id + ' must be reused in U7 without a duplicate ID');
    assert.equal(local.idn.toLowerCase(), source.idn.toLowerCase());
    assert.equal(local.esp, source.esp);
  }
  const allowed = new Set(unit.vocab.map((word) => word.id));
  for (const lesson of unit.lessons) {
    for (const id of [...lesson.vocabIds, ...lesson.reviewVocabIds]) {
      assert.ok(allowed.has(id), 'U7 lesson references unknown vocabulary: ' + id);
    }
    for (const exercise of lesson.exercises) {
      assert.ok(allowed.has(exercise.vocabId), 'U7 exercise references unknown vocabulary: ' + exercise.vocabId);
    }
  }
  assert.ok(exercises.some((exercise) => exercise.type === 'write' && exercise.hint?.trim()),
    'U7 must include guided production');
});

test('B2 U8 implements five authored lessons, 16 exercises and the eight approved ke-an forms', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u8');
  assert.ok(unit, 'B2 U8 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['listen', 'mc', 'order', 'translate_es_id', 'write']);
  assert.deepEqual(unit.vocab.map((word) => word.id), [
    'b2u8_kekotoran', 'b2u8_kedatangan', 'b2u8_kementerian', 'b2u8_kepulauan',
    'b2u8_ketidakadilan', 'b2u8_kesalahpahaman', 'b2u8_keingintahuan', 'b2u8_keberuntungan'
  ]);
  assert.deepEqual(unit.vocab.map((word) => word.idn), [
    'Kekotoran', 'Kedatangan', 'Kementerian', 'Kepulauan',
    'Ketidakadilan', 'Kesalahpahaman', 'Keingintahuan', 'Keberuntungan'
  ]);
  const allowed = new Set(unit.vocab.map((word) => word.id));
  for (const lesson of unit.lessons) {
    for (const id of [...lesson.vocabIds, ...lesson.reviewVocabIds]) {
      assert.ok(allowed.has(id), 'U8 lesson references unknown vocabulary: ' + id);
    }
    for (const exercise of lesson.exercises) {
      assert.ok(allowed.has(exercise.vocabId), 'U8 exercise references unknown vocabulary: ' + exercise.vocabId);
    }
  }
  assert.ok(exercises.some((exercise) => exercise.type === 'write' && exercise.hint?.trim()), 'U8 must include guided production');
  assert.ok(exercises.some((exercise) => exercise.type === 'listen'), 'U8 must include listening');
});


test('B2 U9 implements five authored lessons and 16 exercises using only the five approved Grange fragments', async () => {
  const { b2, indexSource } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u9');
  assert.ok(unit, 'B2 U9 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  assert.deepEqual(unit.vocab, [], 'U9 must not add vocabulary or vocabulary IDs');
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['fill', 'mc', 'order', 'write']);
  for (const lesson of unit.lessons) {
    assert.deepEqual(lesson.vocabIds, []);
    assert.deepEqual(lesson.reviewVocabIds, []);
    for (const exercise of lesson.exercises) assert.equal(Object.hasOwn(exercise, 'vocabId'), false);
  }
  const joined = unit.lessons.map((lesson) => lesson.grammar).join(' ');
  assert.match(joined, /pronominal.*complemento nominal/i);
  assert.match(unit.lessons[1].grammar, /voz de paciente/i);
  assert.equal(unit.lessons[1].exercises.find((exercise) => exercise.type === 'order').words.length, 3);
  const spanishFills = exercises.filter((exercise) => exercise.type === 'fill');
  assert.equal(spanishFills.length, 5);
  assert.ok(spanishFills.every((exercise) => exercise.answerLanguage === 'es' && exercise.direction === 'id→es'));
  const guided = exercises.find((exercise) => exercise.type === 'write');
  assert.equal(guided.answerLanguage, 'es');
  assert.match(guided.prompt, /en español/i);
  assert.match(guided.hint, /No inventes una oración nueva en indonesio/i);
  assert.ok(exercises.filter((exercise) => {
    const target = Array.isArray(exercise.correctOrder) ? exercise.correctOrder.join(' ')
      : typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer
      : Number.isInteger(exercise.answer) && Array.isArray(exercise.options) ? exercise.options[exercise.answer] || ''
      : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 2;
  }).length >= 5, 'U9 must include at least five sentence-level targets');
  assert.match(indexSource, /!unit\.vocab\.length && !\(Array\.isArray\(unit\.lessons\) && unit\.lessons\.length\)/);
  assert.match(indexSource, /const activeRecallTarget = unit\.vocab\.length \?/);
  assert.match(indexSource, /writingLanguage = ex\.answerLanguage === 'es' \? 'es' : 'id'/);
});


test('B2 U10 implements five authored integration lessons and 16 Spanish-analysis exercises', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u10');
  assert.ok(unit, 'B2 U10 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  assert.deepEqual(unit.vocab, [], 'U10 reuses existing B2 vocabulary and does not create duplicate IDs');
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(), ['fill', 'mc', 'order', 'write']);
  const allowed = new Set(['b2u7_pembelian', 'b2u7_pergerakan', 'b2u8_kedatangan', 'b2u8_kementerian', 'b2u8_ketidakadilan']);
  for (const lesson of unit.lessons) {
    assert.deepEqual(lesson.vocabIds, []);
    assert.deepEqual(new Set(lesson.reviewVocabIds), allowed);
    for (const exercise of lesson.exercises) assert.ok(allowed.has(exercise.vocabId), 'U10 must reuse an existing canonical ID');
  }
  assert.ok(exercises.filter((exercise) => exercise.type === 'fill').every((exercise) => exercise.answerLanguage === 'es' && exercise.direction === 'id→es'));
  const guided = exercises.find((exercise) => exercise.type === 'write');
  assert.equal(guided.answerLanguage, 'es');
  assert.match(guided.prompt, /en español/i);
  assert.match(guided.hint, /no inventes ejemplos indonesios/i);
  assert.ok(exercises.filter((exercise) => {
    const target = Array.isArray(exercise.correctOrder) ? exercise.correctOrder.join(' ')
      : typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer
      : Number.isInteger(exercise.answer) && Array.isArray(exercise.options) ? exercise.options[exercise.answer] || ''
      : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 2;
  }).length >= 5, 'U10 must include at least five sentence-level targets');
});


test('B2 U11 implements 14 source-backed reduplication entries and 16 contextual exercises', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u11');
  assert.ok(unit, 'B2 U11 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  const expectedIds = [
    'b2u11_pulau_pulau', 'b2u11_dua_dua', 'b2u11_memukul_memukul',
    'b2u11_pukul_memukul', 'b2u11_dipukul_pukul', 'b2u11_melihat_lihat',
    'b2u11_sayur_mayur', 'b2u11_gerak_gerik', 'b2u11_kaya_raya',
    'b2u11_lelaki', 'b2u11_dedaunan', 'b2u11_pepohonan', 'b2u11_kecil_kecil', 'b2u11_keras_keras'
  ];
  assert.deepEqual(unit.vocab.map((word) => word.id), expectedIds);
  assert.ok(unit.vocab.every((word) => word.idn && word.esp), 'every new canonical form needs Indonesian form and Spanish gloss');
  const priorIds = new Set(b2.units.filter((item) => item.id !== 'b2_u11').flatMap((item) => (item.vocab || []).map((word) => word.id)));
  assert.ok(unit.vocab.every((word) => !priorIds.has(word.id)), 'U11 IDs must not duplicate earlier B2 vocabulary');
  assert.deepEqual(unit.lessons.map((lesson) => lesson.vocabIds), [
    ['b2u11_pulau_pulau', 'b2u11_dua_dua'],
    ['b2u11_memukul_memukul', 'b2u11_pukul_memukul', 'b2u11_dipukul_pukul', 'b2u11_melihat_lihat'],
    ['b2u11_sayur_mayur', 'b2u11_gerak_gerik', 'b2u11_kaya_raya', 'b2u11_lelaki', 'b2u11_dedaunan', 'b2u11_pepohonan'],
    ['b2u11_kecil_kecil'],
    ['b2u11_keras_keras']
  ]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(), ['fill', 'mc', 'order', 'translate_es_id', 'write']);
  assert.ok(!exercises.some((exercise) => exercise.type === 'listen'), 'do not use device-voice fallback where no Piper recording exists');
  assert.ok(exercises.some((exercise) => exercise.type === 'translate_es_id' && exercise.answer === 'Pulau-pulau Bali, Lombok dan Sumbawa terletak di sebelah timur pulau Jawa.'));
  assert.ok(exercises.some((exercise) => exercise.type === 'fill' && exercise.prompt.includes('Kecil-kecil bisa punya pacar') && exercise.answerLanguage === 'es'));
  assert.ok(exercises.some((exercise) => exercise.type === 'fill' && exercise.prompt.includes('Buku-buku berjatuhan') && exercise.answerLanguage === 'es'));
  assert.ok(exercises.some((exercise) => exercise.type === 'fill' && exercise.prompt.includes('Anak itu berteriak keras-keras') && exercise.answerLanguage === 'es'));
  assert.equal(exercises.filter((exercise) => exercise.type === 'write').length, 2);
  for (const exercise of exercises) if (exercise.vocabId) assert.ok(expectedIds.includes(exercise.vocabId), 'exercise vocabulary references must resolve to a U11 canonical ID');
  for (const lesson of unit.lessons) {
    for (const id of [...lesson.vocabIds, ...lesson.reviewVocabIds]) assert.ok(expectedIds.includes(id), 'lesson vocabulary references must resolve to a U11 canonical ID');
  }
});


test('B2 U12 implements five authored lessons and 16 source-backed compound/idiom exercises without new vocabulary', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u12');
  assert.ok(unit, 'B2 U12 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  assert.deepEqual(unit.vocab, []);
  assert.deepEqual([...new Set(allExercises(unit).map((exercise) => exercise.type))].sort(), ['fill', 'mc', 'order', 'write']);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.ok(exercises.every((exercise) => exercise.type !== 'listen'), 'U12 must not fall back to device speech without Piper recordings');
  const exerciseText = unit.lessons.map((lesson) => lesson.grammar + ' ' + lesson.exercises.map((exercise) => [exercise.prompt, ...(exercise.options || [])].join(' ')).join(' ')).join(' ');
  for (const example of ['meja tulis', 'kepala sekolah', 'panjang tangan', 'rumah makan', 'baju baru']) {
    assert.ok(exerciseText.includes(example), 'U12 must use the documented example: ' + example);
  }
  assert.ok(exercises.filter((exercise) => exercise.type === 'write' && exercise.answerLanguage === 'es' && exercise.hint?.trim()).length >= 2);
  for (const lesson of unit.lessons) {
    assert.deepEqual(lesson.vocabIds, []);
    assert.deepEqual(lesson.reviewVocabIds, []);
  }
  const sentenceTargets = exercises.filter((exercise) => {
    const target = typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer
      : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 5;
  });
  assert.ok(sentenceTargets.length >= 5, 'U12 must include at least five complete-sentence response targets');
});


test('B2 U13 implements five authored lessons and 16 source-backed pronominal clitic exercises without new vocabulary', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u13');
  assert.ok(unit, 'B2 U13 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  assert.deepEqual(unit.vocab, []);
  assert.deepEqual([...new Set(allExercises(unit).map((exercise) => exercise.type))].sort(), ['fill', 'mc', 'order', 'write']);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.ok(exercises.every((exercise) => exercise.type !== 'listen'), 'U13 must not create listening tasks without Piper recordings');
  const exerciseText = unit.lessons.map((lesson) => [lesson.grammar, ...lesson.exercises.map((exercise) => [exercise.prompt, ...(exercise.options || [])].join(' '))].join(' ')).join(' ');
  for (const example of ['ku-', 'kau-', '-ku', '-mu', '-nya', 'bukuku', 'bukumu', 'bukunya', 'mencintaiku', 'mencintaimu', 'mencintainya', 'di-tolak-nya']) {
    assert.ok(exerciseText.includes(example), 'U13 must cover the documented clitic example: ' + example);
  }
  assert.ok(exercises.filter((exercise) => exercise.type === 'write' && exercise.answerLanguage === 'es' && exercise.hint?.trim()).length >= 2);
  for (const lesson of unit.lessons) {
    assert.deepEqual(lesson.vocabIds, []);
    assert.deepEqual(lesson.reviewVocabIds, []);
  }
  const sentenceTargets = exercises.filter((exercise) => {
    const target = typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer
      : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 5;
  });
  assert.ok(sentenceTargets.length >= 5, 'U13 must include at least five complete-sentence response targets');
});


test('B2 U14 implements five authored lessons and 16 source-backed discourse particle exercises without new vocabulary', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u14');
  assert.ok(unit, 'B2 U14 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  assert.deepEqual(unit.vocab, []);
  assert.deepEqual([...new Set(allExercises(unit).map((exercise) => exercise.type))].sort(), ['fill', 'mc', 'order', 'write']);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.ok(exercises.every((exercise) => exercise.type !== 'listen'), 'U14 must not create listening tasks without Piper recordings');
  const exerciseText = unit.lessons.map((lesson) => [lesson.grammar, ...lesson.exercises.map((exercise) => [exercise.prompt, ...(exercise.options || [])].join(' '))].join(' ')).join(' ');
  for (const example of ['-lah', '-kah', 'Bacalah', 'Bukalah', 'Diakah', 'Apakah', 'silakan']) {
    assert.ok(exerciseText.includes(example), 'U14 must cover the documented particle example: ' + example);
  }
  assert.ok(exercises.filter((exercise) => exercise.type === 'write' && exercise.answerLanguage === 'es' && exercise.hint?.trim()).length >= 2);
  for (const lesson of unit.lessons) {
    assert.deepEqual(lesson.vocabIds, []);
    assert.deepEqual(lesson.reviewVocabIds, []);
  }
  const sentenceTargets = exercises.filter((exercise) => {
    const target = typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer
      : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 5;
  });
  assert.ok(sentenceTargets.length >= 5, 'U14 must include at least five complete-sentence response targets');
});


test('B2 U15 implements five authored lessons and 16 source-backed pun/pula exercises', async () => {
  const { a1, a2, b1, b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u15');
  assert.ok(unit, 'B2 U15 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  assert.deepEqual(unit.vocab.map((word) => word.id), ['b2u15_pun', 'b2u15_pula']);
  assert.deepEqual([...new Set(allExercises(unit).map((exercise) => exercise.type))].sort(),
    ['fill', 'mc', 'order', 'translate_es_id', 'write']);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.ok(exercises.every((exercise) => exercise.type !== 'listen'),
    'U15 must not create listening tasks without Piper recordings');
  const priorIds = new Set([
    ...a1.units.flatMap((item) => item.vocab || []),
    ...a2.units.flatMap((item) => item.vocab || []),
    ...b1.units.flatMap((item) => item.vocab || []),
    ...b2.units.filter((item) => item.id !== 'b2_u15').flatMap((item) => item.vocab || []),
  ].map((word) => word.id));
  for (const word of unit.vocab) {
    assert.equal(priorIds.has(word.id), false, word.id + ' must be globally unique');
  }
  const ownIds = new Set(unit.vocab.map((word) => word.id));
  for (const lesson of unit.lessons) {
    assert.ok(lesson.vocabIds.every((id) => ownIds.has(id)), 'lesson vocabulary must resolve to U15 IDs');
    assert.ok(lesson.reviewVocabIds.every((id) => ownIds.has(id)), 'review vocabulary must resolve to U15 IDs');
    for (const exercise of lesson.exercises) {
      if (exercise.vocabId) assert.ok(ownIds.has(exercise.vocabId), 'exercise vocabulary must resolve to U15 IDs');
    }
  }
  const sourceText = JSON.stringify(unit);
  for (const fragment of ['Saya pun mau pergi kalau diberi tiket gratis.',
    'pedagang kota pun datang ke sana', 'Saya makan nasi juga',
    'dikembangkan pula usaha di bidang industri rumah', 'siapa pun', 'walaupun', 'meskipun', 'biarpun']) {
    assert.ok(sourceText.includes(fragment), 'U15 must preserve the source-backed example: ' + fragment);
  }
  assert.ok(exercises.filter((exercise) => exercise.type === 'write'
    && exercise.answerLanguage === 'es' && exercise.hint?.trim()).length >= 2);
  const sentenceTargets = exercises.filter((exercise) => {
    const target = typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 5;
  });
  assert.ok(sentenceTargets.length >= 5, 'U15 must include at least five complete-sentence response targets');
});


test('B2 U16 implements five authored lessons and source-backed restrictive focus', async () => {
  const { a1, a2, b1, b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u16');
  assert.ok(unit, 'B2 U16 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  assert.deepEqual(unit.vocab.map((word) => word.id), ['b2u16_cuma', 'b2u16_terutama']);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['fill', 'mc', 'order', 'translate_es_id', 'write']);
  assert.ok(exercises.every((exercise) => exercise.type !== 'listen'),
    'U16 must not create listening tasks without Piper recordings');
  const priorIds = new Set([
    ...a1.units.flatMap((item) => item.vocab || []),
    ...a2.units.flatMap((item) => item.vocab || []),
    ...b1.units.flatMap((item) => item.vocab || []),
    ...b2.units.filter((item) => item.id !== 'b2_u16').flatMap((item) => item.vocab || []),
  ].map((word) => word.id));
  for (const word of unit.vocab) {
    assert.equal(priorIds.has(word.id), false, word.id + ' must be globally unique');
  }
  const ownIds = new Set(unit.vocab.map((word) => word.id));
  for (const lesson of unit.lessons) {
    assert.ok(lesson.vocabIds.every((id) => ownIds.has(id)), 'lesson vocabulary must resolve to U16 IDs');
    assert.ok(lesson.reviewVocabIds.every((id) => ownIds.has(id)), 'review vocabulary must resolve to U16 IDs');
    for (const exercise of lesson.exercises) {
      if (exercise.vocabId) assert.ok(ownIds.has(exercise.vocabId), 'exercise vocabulary must resolve to U16 IDs');
    }
  }
  const sourceText = JSON.stringify(unit).toLowerCase();
  for (const fragment of ['mereka cuma minum teh.', 'tadi pagi saya makan roti saja',
    'cuma teh yang mereka minum.', 'kenaikan pendapatan itu terutama berasal dari pajak.',
    'semata-mata', 'melulu', 'khususnya']) {
    assert.ok(sourceText.includes(fragment), 'U16 must preserve the source-backed example or contrast: ' + fragment);
  }
  const sentenceTargets = exercises.filter((exercise) => {
    const target = typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 5;
  });
  assert.ok(sentenceTargets.length >= 5, 'U16 must include at least five complete-sentence response targets');
});


test('B2 U17 implements five authored lessons on reported statements and indirect questions', async () => {
  const { a1, a2, b1, b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u17');
  assert.ok(unit, 'B2 U17 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  assert.deepEqual(unit.vocab.map((word) => word.id), ['b2u17_bahwa', 'b2u17_apakah']);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['fill', 'listen', 'mc', 'order', 'translate_es_id', 'write']);
  const listeningExercises = exercises.filter((exercise) => exercise.type === 'listen');
  assert.equal(listeningExercises.length, 2, 'U17 must use its two generated Piper vocabulary clips');
  assert.deepEqual(listeningExercises.map((exercise) => exercise.vocabId).sort(), ['b2u17_apakah', 'b2u17_bahwa']);
  const priorIds = new Set([
    ...a1.units.flatMap((item) => item.vocab || []),
    ...a2.units.flatMap((item) => item.vocab || []),
    ...b1.units.flatMap((item) => item.vocab || []),
    ...b2.units.filter((item) => item.id !== 'b2_u17').flatMap((item) => item.vocab || []),
  ].map((word) => word.id));
  for (const word of unit.vocab) {
    assert.equal(priorIds.has(word.id), false, word.id + ' must be globally unique');
  }
  const ownIds = new Set(unit.vocab.map((word) => word.id));
  for (const lesson of unit.lessons) {
    assert.ok(lesson.vocabIds.every((id) => ownIds.has(id)), 'lesson vocabulary must resolve to U17 IDs');
    assert.ok(lesson.reviewVocabIds.every((id) => ownIds.has(id)), 'review vocabulary must resolve to U17 IDs');
    for (const exercise of lesson.exercises) {
      if (exercise.vocabId) assert.ok(ownIds.has(exercise.vocabId), 'exercise vocabulary must resolve to U17 IDs');
    }
  }
  const sourceText = JSON.stringify(unit).toLowerCase();
  for (const fragment of [
    'dia menjawab bahwa dia tidak percaya.',
    'kami percaya bahwa kami dapat mengatasi kesukaran ini.',
    'kami mengakui bahwa kami perlu bantuan dari luar negeri.',
    'saya tahu (bahwa) dia pencuri.',
    'saya tidak tahu mengapa rapat itu dibatalkan.',
    'saya lupa di mana saya menyimpan surat itu.',
    'kami ragu-ragu apa dia bisa lulus ujian.',
    'saya tidak tahu apakah bis ini berhenti di pasar senen.',
    'masih diragukan apakah pendapat ini dapat diterima.',
  ]) {
    assert.ok(sourceText.includes(fragment), 'U17 must preserve the source-backed example: ' + fragment);
  }
  const sentenceTargets = exercises.filter((exercise) => {
    const target = typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 5;
  });
  assert.ok(sentenceTargets.length >= 5, 'U17 must include at least five complete-sentence response targets');
});


test('B2 U18 implements five authored lessons on intent complements and reported directives', async () => {
  const { a1, a2, b1, b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u18');
  assert.ok(unit, 'B2 U18 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  assert.deepEqual(unit.vocab.map((word) => word.id), [
    'b2u18_menyuruh', 'b2u18_memerintahkan', 'b2u18_mendesak', 'b2u18_minta',
  ]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['fill', 'listen', 'mc', 'order', 'translate_es_id', 'write']);
  const listeningExercises = exercises.filter((exercise) => exercise.type === 'listen');
  assert.equal(listeningExercises.length, 5, 'U18 must use four new Piper forms and the existing B1 warning verb');
  assert.deepEqual(listeningExercises.map((exercise) => exercise.vocabId).sort(), [
    'b1u5_mengingatkan', 'b2u18_memerintahkan', 'b2u18_mendesak', 'b2u18_menyuruh', 'b2u18_minta',
  ]);
  const priorIds = new Set([
    ...a1.units.flatMap((item) => item.vocab || []),
    ...a2.units.flatMap((item) => item.vocab || []),
    ...b1.units.flatMap((item) => item.vocab || []),
    ...b2.units.filter((item) => item.id !== 'b2_u18').flatMap((item) => item.vocab || []),
  ].map((word) => word.id));
  for (const word of unit.vocab) {
    assert.equal(priorIds.has(word.id), false, word.id + ' must be globally unique');
  }
  const ownIds = new Set(unit.vocab.map((word) => word.id));
  for (const lesson of unit.lessons) {
    assert.ok(lesson.vocabIds.every((id) => ownIds.has(id)), 'lesson vocabulary must resolve to U18 IDs');
    assert.ok(lesson.reviewVocabIds.every((id) => ownIds.has(id) || priorIds.has(id)), 'review vocabulary must resolve to current or previously taught IDs');
    for (const exercise of lesson.exercises) {
      if (exercise.vocabId) assert.ok(ownIds.has(exercise.vocabId) || priorIds.has(exercise.vocabId), 'exercise vocabulary must resolve to current or previously taught IDs');
    }
  }
  const sourceText = JSON.stringify(unit).toLowerCase();
  for (const fragment of [
    'suwono menyuruh anaknya pergi ke sekolah.',
    'kepala kantor memerintahkan soeparno agar mencari berkas itu.',
    'saya menyuruhmu supaya kamu membaca buku itu.',
    'saya disuruh oleh polisi supaya pergi.',
    'perdana menteri didesak oleh rakyat agar mengambil langkah tegas.',
    'rukman mengingatkan agar anak buahnya tidak menembak.',
    'saya minta supaya saudara tidak pergi.',
    'saya dapat mengusulkan kepada pimpinan untuk/supaya menerima saudara.',
    'saya dapat mengusulkan kepada pimpinan supaya mereka menerima saudara.',
  ]) {
    assert.ok(sourceText.includes(fragment), 'U18 must preserve the source-backed example: ' + fragment);
  }
  const sentenceTargets = exercises.filter((exercise) => {
    const target = typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 5;
  });
  assert.ok(sentenceTargets.length >= 5, 'U18 must include at least five complete-sentence response targets');
});

test('B2 U19 implements nominalised relative clauses and identifying focus', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u19');
  assert.ok(unit, 'B2 U19 must exist');
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  assert.deepEqual(unit.vocab, [], 'U19 must not add new vocabulary IDs');
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['fill', 'listen', 'mc', 'translate_es_id', 'write']);
  const translations = exercises.filter((exercise) => exercise.type === 'translate_es_id');
  assert.equal(translations.length, 5);
  assert.ok(translations.every((exercise) => exercise.answerLanguage === 'id'
    && typeof exercise.answer === 'string' && /yang/i.test(exercise.answer)
    && /[.!?]$/.test(exercise.answer)), 'U19 translation targets must be complete source-backed yang clauses');
  const listening = exercises.filter((exercise) => exercise.type === 'listen');
  assert.equal(listening.length, 5, 'U19 must provide one sentence-level listening exercise per lesson');
  assert.ok(listening.every((exercise) => typeof exercise.audioText === 'string'
    && exercise.answer === exercise.audioText), 'U19 listening prompts must use the same source-backed text as their answer');
  assert.equal(new Set(listening.map((exercise) => exercise.audioText)).size, 5,
    'U19 must contribute five distinct Piper audio texts');
  const sentenceTargets = exercises.filter((exercise) => {
    const target = typeof exercise.modelAnswer === 'string' ? exercise.modelAnswer
      : typeof exercise.answer === 'string' ? exercise.answer : '';
    return target.trim().split(/\s+/).filter(Boolean).length >= 5;
  });
  assert.ok(sentenceTargets.length >= 5, 'U19 must include at least five complete-sentence response targets');
  assert.ok(unit.lessons.every((lesson) => lesson.vocabIds.length === 0
    && lesson.reviewVocabIds.length === 0), 'U19 must not create duplicate vocabulary references');
  const sourceText = JSON.stringify(unit).toLowerCase();
  for (const fragment of ['yang', 'bukan', 'tidak', 'dibangun', 'berangkat', 'terlambat', '-lah']) {
    assert.ok(sourceText.includes(fragment), 'U19 must cover the documented construction: ' + fragment);
  }
});

test('implemented B2 U1–U23 are executable while later legacy draft units stay archived', async () => {
  const { b2 } = await loadCurricula();
  const legacyArchive = await readFile(new URL('../docs/B2_LEGACY_DRAFT_ARCHIVE.md', import.meta.url), 'utf8');
  assert.deepEqual(b2.units.map((unit) => unit.id), ['b2_u1', 'b2_u2', 'b2_u3', 'b2_u4', 'b2_u5', 'b2_u6', 'b2_u7', 'b2_u8', 'b2_u9', 'b2_u10', 'b2_u11', 'b2_u12', 'b2_u13', 'b2_u14', 'b2_u15', 'b2_u16', 'b2_u17', 'b2_u18', 'b2_u19', 'b2_u20', 'b2_u21', 'b2_u22', 'b2_u23']);
  for (const id of ['b2_u5']) {
    assert.ok(legacyArchive.includes('"id": "' + id + '"'), id + ' must remain in the historical archive');
  }
  for (const id of ['v231', 'v232', 'v233', 'v234', 'v235', 'v236', 'v237', 'v238',
    'v239', 'v240', 'v241', 'v243', 'v244', 'v245', 'v246']) {
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


test('B2 U20 teaches baik ... maupun with five authored lessons and source-backed full sentences', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u20');
  assert.ok(unit, 'B2 U20 must exist');
  assert.match(unit.title, /baik.*maupun/i);
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['mc', 'order', 'translate_es_id', 'write']);
  assert.deepEqual(unit.vocab, [], 'U20 must not add lexical IDs when the source examples need none');
  for (const lesson of unit.lessons) {
    assert.deepEqual(lesson.vocabIds, []);
    assert.deepEqual(lesson.reviewVocabIds, []);
  }
  const translations = exercises
    .filter((exercise) => exercise.type === 'translate_es_id')
    .map((exercise) => exercise.answer);
  assert.deepEqual(translations, [
    'Baik Ana maupun Ira tinggal di Jakarta.',
    'Baik di kota maupun di desa sepak bola digemari orang.',
    'Baik kepandaian maupun kecantikan tidak berguna untuk mencapai kebahagiaan.',
    'Mereka berjuang untuk bangsa maupun untuk keluarga.',
    'Baik orang Cina, orang Jepang, orang India maupun orang Portugis berdagang di Jakarta.',
  ]);
  const ids = exercises.map((exercise) => exercise.id);
  assert.equal(new Set(ids).size, ids.length, 'exercise IDs must be unique');
  assert.ok(exercises.some((exercise) => exercise.type === 'write' && exercise.answerLanguage === 'id' && exercise.hint?.trim()),
    'U20 must include guided original production in Indonesian');
});


test('B2 U21 teaches contrastive correction with bukan, bukannya and melainkan/tetapi', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u21');
  assert.ok(unit, 'B2 U21 must exist');
  assert.match(unit.title, /bukan.*melainkan/i);
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['mc', 'order', 'translate_es_id', 'write']);
  assert.deepEqual(unit.vocab.map((word) => word.id), ['b2u21_melainkan']);
  assert.equal(unit.vocab[0].idn, 'melainkan');
  assert.equal(unit.vocab[0].source, 'Sneddon et al. (2010), §4.84.');
  assert.deepEqual(unit.lessons[0].vocabIds, ['b2u21_melainkan']);
  for (const lesson of unit.lessons.slice(1)) {
    assert.deepEqual(lesson.vocabIds, []);
    assert.deepEqual(lesson.reviewVocabIds, ['b2u21_melainkan']);
  }
  const translations = exercises
    .filter((exercise) => exercise.type === 'translate_es_id')
    .map((exercise) => exercise.answer);
  assert.deepEqual(translations, [
    'Bukan dia bodoh, melainkan dia malas.',
    'Bukannya saya tidak mau membeli rumah, tetapi uang saya tidak cukup.',
    'Ia bukannya memerankan si Doel, melainkan menjadi sutradara.',
    'Saya bukan tidak percaya kepadamu.',
    'Dia bukan bodoh, melainkan malas saja.',
    'Kami tidak pergi ke Solo, melainkan ke Yogya.',
  ]);
  const ids = exercises.map((exercise) => exercise.id);
  assert.equal(new Set(ids).size, ids.length, 'exercise IDs must be unique');
  assert.ok(exercises.some((exercise) => exercise.type === 'write' && exercise.answerLanguage === 'id' && exercise.hint?.trim() && exercise.modelAnswer?.trim()),
    'U21 must include guided Indonesian production');
});


test('B2 U22 teaches additive bukan hanya ... melainkan/tetapi juga with parallel constituents', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u22');
  assert.ok(unit, 'B2 U22 must exist');
  assert.match(unit.title, /bukan hanya.*melainkan.*juga/i);
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['mc', 'order', 'translate_es_id', 'write']);
  assert.deepEqual(unit.vocab, [], 'U22 reuses function words already introduced; no new lexical IDs');
  for (const lesson of unit.lessons) {
    assert.deepEqual(lesson.vocabIds, []);
    assert.deepEqual(lesson.reviewVocabIds, []);
  }
  assert.match(unit.lessons[0].grammar, /X no se rechaza/i);
  const translations = exercises
    .filter((exercise) => exercise.type === 'translate_es_id')
    .map((exercise) => exercise.answer);
  assert.deepEqual(translations, [
    'Candi Borobudur bukan hanya sebuah monumen bersejarah saja, tetapi juga ramai didatangi orang.',
    'Bukan hanya masalah itu, melainkan juga masalah pendidikan.',
    'Kita tidak hanya harus setuju, tetapi juga harus patuh terhadap putusan itu.',
    'Bukan hanya masalah itu, melainkan juga masalah pendidikan.',
    'Bukan hanya masalah itu, melainkan juga masalah pendidikan.',
    'Candi Borobudur bukan hanya sebuah monumen bersejarah saja, tetapi juga ramai didatangi orang.',
  ]);
  assert.ok(exercises.every((exercise) => !exercise.answer || !/Ibunya|teman-temannya|Orang itu bukan/.test(exercise.answer)),
    'U22 must not introduce unsupported Indonesian examples');
  const ids = exercises.map((exercise) => exercise.id);
  assert.equal(new Set(ids).size, ids.length, 'exercise IDs must be unique');
  assert.ok(exercises.some((exercise) => exercise.type === 'write' && exercise.answerLanguage === 'id' && exercise.hint?.trim() && exercise.modelAnswer?.trim()),
    'U22 must include guided Indonesian production');
});


test('B2 U23 teaches bukan ... asal(kan) as a conditional correlative structure', async () => {
  const { b2 } = await loadCurricula();
  const unit = b2.units.find((item) => item.id === 'b2_u23');
  assert.ok(unit, 'B2 U23 must exist');
  assert.match(unit.title, /bukan.*asal/i);
  assert.equal(unit.lessons.length, 5);
  assert.deepEqual(unit.lessons.map((lesson) => lesson.exercises.length), [3, 3, 3, 3, 4]);
  const exercises = allExercises(unit);
  assert.equal(exercises.length, 16);
  assert.deepEqual([...new Set(exercises.map((exercise) => exercise.type))].sort(),
    ['mc', 'order', 'translate_es_id', 'write']);
  assert.deepEqual(unit.vocab, [], 'U23 teaches a grammatical correlator; no new lexical IDs');
  for (const lesson of unit.lessons) {
    assert.deepEqual(lesson.vocabIds, []);
    assert.deepEqual(lesson.reviewVocabIds, []);
  }
  const translations = exercises
    .filter((exercise) => exercise.type === 'translate_es_id')
    .map((exercise) => exercise.answer);
  assert.deepEqual([...new Set(translations)], [
    'Saya bukan tidak rela kau membantu familimu, asal kau pertimbangkan juga kebutuhan kita sendiri.',
  ]);
  assert.ok(exercises.every((exercise) => !exercise.answer || exercise.answer === 'Saya bukan tidak rela kau membantu familimu, asal kau pertimbangkan juga kebutuhan kita sendiri.'),
    'U23 must stay source-bound and must not invent Indonesian examples');
  const ids = exercises.map((exercise) => exercise.id);
  assert.equal(new Set(ids).size, ids.length, 'exercise IDs must be unique');
  assert.ok(exercises.some((exercise) => exercise.type === 'write' && exercise.answerLanguage === 'id' && exercise.hint?.trim() && exercise.modelAnswer?.trim()),
    'U23 must include guided Indonesian production');
});
