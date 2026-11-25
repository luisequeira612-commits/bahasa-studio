'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'adaptive-learning.js'), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
const AdaptiveLearning = sandbox.window.AdaptiveLearning;


test('latest SRS quality follows the most recently reviewed duplicate record', () => {
  const aggregate = { lastQuality: null, lastQualityReviewedAt: null };
  AdaptiveLearning.updateLatestSrsQuality(aggregate, { lastReviewed: 200, lastQuality: 3 });
  AdaptiveLearning.updateLatestSrsQuality(aggregate, { lastReviewed: 100, lastQuality: 1 });
  assert.equal(aggregate.lastQuality, 3, 'an older duplicate record must not overwrite the latest successful grade');
  assert.equal(aggregate.lastQualityReviewedAt, 200);

  AdaptiveLearning.updateLatestSrsQuality(aggregate, { lastReviewed: 300, lastQuality: 2 });
  assert.equal(aggregate.lastQuality, 2, 'a newer unsuccessful grade must become the current grade');
  assert.equal(aggregate.lastQualityReviewedAt, 300);
});

test('successful grades suppress weak and isolated recommendations unless manually saved', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [
      { id: 'w1', term: 'dari', incorrect: 3, lastQuality: 3 },
      { id: 'w2', term: 'rumah', incorrect: 2, lastQuality: 5 }
    ],
    isolatedWords: [
      { id: 'w3', term: 'makan', incorrect: 1, lastQuality: 3 }
    ]
  });
  assert.equal(result.type, 'maintenance');
  assert.equal(result.action, 'none');

  const manuallySaved = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [{ id: 'w1', term: 'dari', incorrect: 3, savedForReview: true, lastQuality: 5 }]
  });
  assert.equal(manuallySaved.type, 'reinforce-weak');
  assert.equal(manuallySaved.wordIds[0], 'w1');
});

test('due reviews take priority over every other recommendation', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 4,
    weakWords: [{ id: 'w1', term: 'membaca' }],
    nextLesson: { unitId: 'a1_u2', lessonIndex: 0, title: 'Lección 1' },
    todayXp: 0,
    dailyGoal: 30
  });
  assert.equal(result.type, 'review-due');
  assert.equal(result.action, 'review');
  assert.match(result.description, /4 palabras/);
});

test('a pending unit assessment is recommended after its lessons and before ordinary practice', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    nextAssessment: { unitId: 'a1_u4', unitTitle: 'Unidad 4' },
    nextLesson: { unitId: 'a2_u1', lessonIndex: 0 },
    weakWords: [{ id: 'w1', term: 'rumah' }]
  });
  assert.equal(result.type, 'complete-unit-assessment');
  assert.equal(result.action, 'assessment');
  assert.equal(result.unitId, 'a1_u4');
  assert.equal(result.label, 'Hacer prueba final');
  assert.match(result.description, /desbloquear la siguiente unidad/);
});

test('due reviews retain priority over a pending unit assessment', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 2,
    nextAssessment: { unitId: 'a1_u4', unitTitle: 'Unidad 4' }
  });
  assert.equal(result.action, 'review');
});

test('words with recorded errors are recommended without claiming they are recent', () => {
  const weakWords = Array.from({ length: 7 }, (_, index) => ({ id: 'w' + index, term: 'palabra' + index }));
  const result = AdaptiveLearning.recommend({ dueCount: 0, weakWords });
  assert.equal(result.type, 'reinforce-weak');
  assert.equal(result.wordIds.length, 5);
  assert.match(result.description, /historial de práctica registra errores/);
  assert.match(result.description, /palabra0/);
  assert.doesNotMatch(result.description, /recientes/);
  assert.doesNotMatch(result.description, /palabra5/);
});

test('the next incomplete lesson is recommended when review is clear', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [],
    nextLesson: { unitId: 'a1_u3', lessonIndex: 2, unitTitle: 'Unidad 3', title: 'Lección 3' }
  });
  assert.equal(result.type, 'continue-lesson');
  assert.equal(result.unitId, 'a1_u3');
  assert.equal(result.lessonIndex, 2);
  assert.match(result.description, /Unidad 3/);
});

test('conversation practice is a fallback when no lesson is available and the daily goal is open', () => {
  const result = AdaptiveLearning.recommend({ dueCount: 0, weakWords: [], todayXp: 10, dailyGoal: 30 });
  assert.equal(result.type, 'conversation-practice');
  assert.equal(result.action, 'conversation');
});

test('maintenance is returned when no task is urgent or available', () => {
  const result = AdaptiveLearning.recommend({ dueCount: 0, weakWords: [], todayXp: 30, dailyGoal: 30 });
  assert.equal(result.type, 'maintenance');
  assert.equal(result.action, 'none');
});

test('invalid inputs are handled conservatively without mutating the source', () => {
  const weakWords = [{ id: 'ok', term: 'kata' }, { id: '', term: 'ignored' }, null];
  const input = { dueCount: -2, weakWords, todayXp: -1, dailyGoal: 0 };
  const before = JSON.stringify(input);
  const result = AdaptiveLearning.recommend(input);
  assert.equal(result.type, 'reinforce-weak');
  assert.equal(JSON.stringify(input), before);
  assert.equal(AdaptiveLearning.recommend({ nextLesson: { unitId: 'a1_u1', lessonIndex: -1 } }).type, 'maintenance');
});


test('SRS dashboard wires adaptive recommendations to existing learner actions', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /id="adaptiveRecommendation"/);
  assert.match(html, /this\.renderAdaptiveRecommendation\(/);
  assert.match(html, /SRSEngine\.startSession\(\)/);
  assert.match(html, /SRSEngine\.markForReview\(wordId\)/);
  assert.match(html, /LessonEngine\.startUnitById\(recommendation\.unitId, recommendation\.lessonIndex\)/);
  assert.match(html, /ConversationEngine\.open\(\)/);
});


test('lowest skill accuracy is surfaced only after ten scored attempts', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [],
    nextLesson: { unitId: 'a2_u1', lessonIndex: 0, title: 'Lección 1' },
    skillStats: {
      recognition: { attempts: 8, correct: 7 },
      translation: { attempts: 10, correct: 4 },
      listening: { attempts: 4, correct: 0 }
    }
  });
  assert.equal(result.type, 'continue-lesson');
  assert.match(result.description, /menor precisión registrada está en traducción: 40% \(10 intentos\)/);
  assert.doesNotMatch(result.description, /escucha/);
});

test('adaptive skill descriptions qualify small samples and state when evidence is broader', () => {
  const smallSample = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [],
    nextLesson: { unitId: 'a1_u1', lessonIndex: 0, title: 'Lección 1' },
    skillStats: { translation: { attempts: 9, correct: 3 } }
  });
  assert.doesNotMatch(smallSample.description, /menor precisión registrada/);
  assert.doesNotMatch(smallSample.description, /muestra todavía es pequeña/);
  assert.doesNotMatch(smallSample.description, /no como una conclusión firme/);

  const broaderSample = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [],
    nextLesson: { unitId: 'a1_u1', lessonIndex: 0, title: 'Lección 1' },
    skillStats: { translation: { attempts: 12, correct: 4 } }
  });
  assert.match(broaderSample.description, /33% \(12 intentos\)/);
  assert.match(broaderSample.description, /se basa en 12 intentos registrados/);
  assert.doesNotMatch(broaderSample.description, /muestra todavía es pequeña/);
});

test('skill focus ignores malformed counters and does not claim mastery', () => {
  const focus = AdaptiveLearning.weakestSkill({
    recognition: { attempts: 4, correct: 0 },
    translation: { attempts: 8, correct: 9 },
    listening: { attempts: 10, correct: 6 }
  });
  assert.equal(focus.key, 'listening');
  assert.equal(focus.accuracy, 60);
  assert.equal(AdaptiveLearning.weakestSkill({ writing: { attempts: 4, correct: 0 } }), null);
});

test('adaptive dashboard passes the saved skill profile into recommendation logic', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /language: LanguageManager\.getActiveLanguage\(\)/);
  assert.match(html, /skillStatsByLanguage:/);
  assert.match(html, /AdaptiveLearning\.recommend\(/);
});


test('writing becomes an actionable recommendation when it is the weakest measured skill', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [],
    nextLesson: { unitId: 'a2_u1', lessonIndex: 0, title: 'Lección 1' },
    skillStats: {
      recognition: { attempts: 8, correct: 7 },
      writing: { attempts: 10, correct: 4 }
    }
  });
  assert.equal(result.type, 'reinforce-writing');
  assert.equal(result.action, 'writing');
  assert.equal(result.label, 'Practicar escritura');
  assert.match(result.description, /escritura: 40%/);
});

test('writing recommendations preserve urgent review and weak-word priorities', () => {
  const stats = { writing: { attempts: 10, correct: 2 } };
  assert.equal(AdaptiveLearning.recommend({ dueCount: 2, skillStats: stats }).action, 'review');
  assert.equal(AdaptiveLearning.recommend({
    dueCount: 0, weakWords: [{ id: 'w1', term: 'rumah' }], skillStats: stats
  }).action, 'reinforce');
});

test('adaptive dashboard connects the writing recommendation to the existing writing notebook', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /WritingPractice\.open\(\)/);
});


test('a matching unfinished lesson becomes actionable for the weakest scored skill', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [],
    nextLesson: { unitId: 'a1_u2', lessonIndex: 0, title: 'Siguiente lección' },
    skillLesson: { unitId: 'a1_u5', lessonIndex: 1, title: 'Práctica de traducción' },
    skillStats: {
      translation: { attempts: 10, correct: 3 },
      recognition: { attempts: 8, correct: 7 }
    }
  });
  assert.equal(result.type, 'reinforce-skill');
  assert.equal(result.action, 'lesson');
  assert.equal(result.unitId, 'a1_u5');
  assert.equal(result.lessonIndex, 1);
  assert.match(result.title, /traducción/);
  assert.match(result.description, /lección pendiente/);
});

test('targeted skill lessons do not override due reviews or recorded weak words', () => {
  const focus = { translation: { attempts: 10, correct: 2 } };
  const skillLesson = { unitId: 'a1_u5', lessonIndex: 0 };
  assert.equal(AdaptiveLearning.recommend({ dueCount: 1, skillStats: focus, skillLesson }).action, 'review');
  assert.equal(AdaptiveLearning.recommend({
    dueCount: 0, weakWords: [{ id: 'w1', term: 'rumah' }], skillStats: focus, skillLesson
  }).action, 'reinforce');
});

test('without a matching lesson, adaptive learning safely falls back to the next lesson', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [],
    nextLesson: { unitId: 'a1_u2', lessonIndex: 0 },
    skillStats: { listening: { attempts: 10, correct: 3 } }
  });
  assert.equal(result.type, 'continue-lesson');
  assert.equal(result.unitId, 'a1_u2');
});

test('weakest-skill selection ignores missing, negative, fractional, and excessive correct counters', () => {
  const focus = AdaptiveLearning.weakestSkill({
    recognition: { attempts: 10 },
    translation: { attempts: 10, correct: -1 },
    listening: { attempts: 10, correct: 4.5 },
    sentenceBuilding: { attempts: 10, correct: 11 },
    writing: { attempts: 10, correct: 6 }
  });
  assert.equal(focus.key, 'writing');
  assert.equal(focus.accuracy, 60);
  assert.equal(focus.attempts, 10);
  assert.equal(AdaptiveLearning.weakestSkill({
    recognition: { attempts: 10, correct: -1 },
    translation: { attempts: 10 }
  }), null, 'malformed counters must not be interpreted as zero-percent accuracy');
});


test('the best matching unfinished lesson is selected by relevant exercise coverage', () => {
  const lessons = [
    { unitId: 'a1_u2', lessonIndex: 0, title: 'Primera', exercises: [{ type: 'translate_es_id' }] },
    { unitId: 'a2_u3', lessonIndex: 1, title: 'Más práctica', exercises: [
      { type: 'translate_es_id' }, { type: 'translate_es_id' }, { type: 'mc' }
    ] },
    { unitId: 'a1_u4', lessonIndex: 0, title: 'No coincide', exercises: [{ type: 'mc' }] }
  ];
  const before = JSON.stringify(lessons);
  const selected = AdaptiveLearning.selectSkillLesson('translation', lessons);
  assert.deepEqual(JSON.parse(JSON.stringify(selected)), {
    unitId: 'a2_u3', lessonIndex: 1, title: 'Más práctica'
  });
  assert.equal(JSON.stringify(lessons), before, 'selection must not mutate curriculum data');
});

test('neutral Spanish-to-target translation exercises are included in adaptive skill selection', () => {
  const selected = AdaptiveLearning.selectSkillLesson('translation', [
    {
      unitId: 'pt_a1_u1',
      lessonIndex: 0,
      title: 'Traducción neutral',
      exercises: [{ type: 'translate_es_target' }, { type: 'mc' }]
    },
    {
      unitId: 'a1_u2',
      lessonIndex: 0,
      title: 'Traducción legacy',
      exercises: [{ type: 'translate_es_id' }]
    }
  ]);
  assert.deepEqual(JSON.parse(JSON.stringify(selected)), {
    unitId: 'pt_a1_u1',
    lessonIndex: 0,
    title: 'Traducción neutral'
  });
});

test('skill lesson selection keeps the earliest lesson on equal coverage and ignores invalid candidates', () => {
  const selected = AdaptiveLearning.selectSkillLesson('listening', [
    null,
    { unitId: '', lessonIndex: 0, exercises: [{ audioText: true }] },
    { unitId: 'a1_u3', lessonIndex: 0, exercises: [{ audioText: true }] },
    { unitId: 'a2_u1', lessonIndex: 2, exercises: [{ type: 'listen' }] }
  ]);
  assert.equal(selected.unitId, 'a1_u3');
  assert.equal(AdaptiveLearning.selectSkillLesson('conversation', [
    { unitId: 'a1_u1', lessonIndex: 0, exercises: [{ type: 'listen' }] }
  ]), null);
});

test('adaptive dashboard delegates targeted lesson selection to exercise coverage', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /skillLessons\.push\(/);
  assert.match(html, /AdaptiveLearning\.selectSkillLesson\(weakestSkill\.key, skillLessons\)/);
});


test('adaptive dashboard recommends the next unlocked A1 lesson and beta A2 lessons independently', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /level\.id === 'A2' && !A2_RELEASE_ENABLED/);
  assert.doesNotMatch(html, /level\.id === 'A2' && \(!A2_RELEASE_ENABLED \|\| !a1Complete\)/);
  assert.match(html, /level\.id === 'A1' && \(!nextA1Unit \|\| unit\.id !== nextA1Unit\.id\)/);
  assert.match(html, /const first = unfinishedLessons\[0\]/);
  assert.match(html, /AdaptiveLearning\.selectSkillLesson\(weakestSkill\.key, skillLessons\)/);
});


test('isolated mistakes are offered as a light review, not labelled as persistent weaknesses', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [],
    isolatedWords: [{ id: 'w1', term: 'makan', incorrect: 1, attempts: 1, repetition: 0 }]
  });
  assert.equal(result.type, 'review-isolated');
  assert.equal(result.action, 'reinforce');
  assert.equal(result.wordIds[0], 'w1');
  assert.match(result.title, /error puntual/);
  assert.doesNotMatch(result.description, /dificultad|errores repetidos/i);
});

test('persistent errors take priority over isolated mistakes and due reviews remain highest priority', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [{ id: 'w2', term: 'berjalan', incorrect: 3, attempts: 5, repetition: 1 }],
    isolatedWords: [{ id: 'w1', term: 'makan' }]
  });
  assert.equal(result.type, 'reinforce-weak');
  assert.equal(result.wordIds[0], 'w2');
  assert.equal(AdaptiveLearning.recommend({
    dueCount: 2,
    weakWords: [{ id: 'w2', term: 'berjalan', incorrect: 3 }],
    isolatedWords: [{ id: 'w1', term: 'makan' }]
  }).type, 'review-due');
});

test('word records with only one error are not treated as persistent weaknesses', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [{ id: 'w1', term: 'makan', incorrect: 1 }],
    isolatedWords: []
  });
  assert.equal(result.type, 'maintenance');
});

test('legacy word recommendations without error counters remain compatible', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [{ id: 'w1', term: 'rumah' }]
  });
  assert.equal(result.type, 'reinforce-weak');
});

test('adaptive dashboard separates repeated word errors from isolated mistakes using SRS history', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /item\.savedForReview \|\| item\.incorrect >= 2 &&/);
  assert.match(html, /item\.incorrect === 1/);
  assert.match(html, /item\.incorrect === 1 &&\s*\(!Number\.isSafeInteger\(item\.lastQuality\) \|\| item\.lastQuality < 3\)/);
  assert.match(html, /isolatedWords,/);
  assert.match(html, /incorrect: history\.incorrect/);
  assert.match(html, /repetition: history\.repetition/);
});

test('adaptive vocabulary ranking balances error rate, repetition and review age after manual saves', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /errorRateA = a\[1\]\.attempts > 0 \? a\[1\]\.incorrect \/ a\[1\]\.attempts : 0/);
  assert.match(html, /errorRateB = b\[1\]\.attempts > 0 \? b\[1\]\.incorrect \/ b\[1\]\.attempts : 0/);
  assert.match(html, /reviewedA - reviewedB/);
  assert.match(html, /savedPriority/);
});

test('adaptive recommendation action is programmatically associated with its explanation in each view', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /description\.id = host\.id \+ 'Description'/);
  assert.match(html, /button\.setAttribute\('aria-describedby', description\.id\)/);
  assert.match(html, /host\.append\(heading, description, button\)/);
});

test('adaptive recommendation is visible on Aprender and refreshes on initial load and tab entry', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const routeStart = html.indexOf('<main id="view-route"');
  const routeEnd = html.indexOf('</main>', routeStart);
  const routeMarkup = html.slice(routeStart, routeEnd);
  assert.match(routeMarkup, /id="adaptiveRecommendationLearn"[^>]*data-adaptive-recommendation/);
  assert.match(html, /document\.querySelectorAll\('\[data-adaptive-recommendation\]'\)/);
  assert.match(html, /this\.renderCourseRoute\(\);\s*this\.updateSrsView\(\);/);
  assert.match(html, /viewId === 'srs' \|\| viewId === 'profile' \|\| viewId === 'route'/);
  assert.ok(html.includes('#adaptiveRecommendationLearn { margin:12px 12px 14px; padding:10px 12px; min-height:64px;'));
  assert.ok(html.indexOf('id="adaptiveRecommendationLearn"') < html.indexOf('id="courseContainer"'),
    'the recommendation card should be placed before the unit list');
  assert.doesNotMatch(html, /adaptive-recommendation-path-card|recommendationReserve/);
  assert.doesNotMatch(html, /stage\.appendChild\(recommendationHost\)/);
  assert.ok(html.includes('.unit-path-section-banner { top:58px !important;'));
  assert.ok(html.includes('#adaptiveRecommendationLearn[hidden] { display:none !important; }'));
});

test('weakest skill ranking compares exact accuracy before applying display rounding or tie-breakers', () => {
  const focus = AdaptiveLearning.weakestSkill({
    recognition: { attempts: 10, correct: 5 },
    translation: { attempts: 1000, correct: 505 }
  });
  assert.equal(focus.key, 'recognition');
  assert.equal(focus.accuracy, 50);
  assert.equal(focus.attempts, 10);
});

test('malformed word error counters are ignored while legacy and manually saved words remain compatible', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [
      { id: 'negative', term: 'negativo', incorrect: -1 },
      { id: 'fraction', term: 'fracción', incorrect: 2.5 },
      { id: 'string', term: 'texto', incorrect: '3' },
      { id: 'null', term: 'nulo', incorrect: null },
      { id: 'legacy', term: 'antigua' },
      { id: 'saved', term: 'guardada', incorrect: -4, savedForReview: true }
    ]
  });
  assert.equal(result.type, 'reinforce-weak');
  assert.deepEqual(Array.from(result.wordIds), ['legacy', 'saved']);
  assert.match(result.description, /antigua, guardada/);
  assert.doesNotMatch(result.description, /negativo|fracción|texto|nulo/);
});


test('SRS counters reject malformed and negative values without coercion', () => {
  for (const value of [-1, 2.5, '3', null, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.equal(AdaptiveLearning.normalizeSrsCount(value), 0);
  }
  assert.equal(AdaptiveLearning.normalizeSrsCount(0), 0);
  assert.equal(AdaptiveLearning.normalizeSrsCount(7), 7);
});

test('earliest valid SRS timestamp ignores malformed values and keeps the oldest valid review', () => {
  assert.equal(AdaptiveLearning.earliestValidTimestamp(null, 200), 200);
  assert.equal(AdaptiveLearning.earliestValidTimestamp(200, 100), 100);
  assert.equal(AdaptiveLearning.earliestValidTimestamp(100, '50'), 100);
  assert.equal(AdaptiveLearning.earliestValidTimestamp(-1, 300), 300);
  assert.equal(AdaptiveLearning.earliestValidTimestamp(null, NaN), null);
});

test('SRS dashboard sanitizes aggregated counters and records the oldest valid review timestamp', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /AdaptiveLearning\.normalizeSrsCount\(item\.val\.attempts\)/);
  assert.match(html, /Math\.min\(AdaptiveLearning\.normalizeSrsCount\(item\.val\.correct\), attempts\)/);
  assert.match(html, /Math\.min\(AdaptiveLearning\.normalizeSrsCount\(item\.val\.incorrect\), attempts\)/);
  assert.match(html, /aggregate\.lastReviewed = AdaptiveLearning\.earliestValidTimestamp\(/);
  assert.match(html, /Number\.isFinite\(a\[1\]\.lastReviewed\)/);
});

test('guided conversation accuracy becomes actionable after ten scored responses', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [],
    isolatedWords: [],
    nextLesson: { unitId: 'a2_u1', lessonIndex: 0, title: 'Siguiente lección' },
    skillStats: {
      recognition: { attempts: 8, correct: 7 },
      conversation: { attempts: 10, correct: 4, incorrect: 6, sessions: 2 }
    }
  });
  assert.equal(result.type, 'reinforce-conversation');
  assert.equal(result.action, 'conversation');
  assert.equal(result.label, 'Practicar conversación');
  assert.match(result.description, /conversación: 40% \(10 intentos\)/);
});

test('conversation skill focus ignores fewer than ten attempts and keeps urgent review priorities', () => {
  const stats = {
    recognition: { attempts: 8, correct: 6 },
    conversation: { attempts: 9, correct: 0, incorrect: 9 }
  };
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [],
    nextLesson: { unitId: 'a1_u1', lessonIndex: 0 },
    skillStats: stats
  });
  assert.equal(result.type, 'continue-lesson');
  assert.doesNotMatch(result.description, /conversación/);

  assert.equal(AdaptiveLearning.recommend({
    dueCount: 1,
    weakWords: [],
    skillStats: { conversation: { attempts: 10, correct: 1, incorrect: 9 } }
  }).action, 'review');
  assert.equal(AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [{ id: 'w1', term: 'rumah', incorrect: 2 }],
    skillStats: { conversation: { attempts: 10, correct: 1, incorrect: 9 } }
  }).action, 'reinforce');
});



test('adaptive skill recommendations only target the earliest unfinished lesson that progression allows', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.ok(html.includes('const first = unfinishedLessons[0]'));
  assert.ok(html.includes('if (weakestSkill && Array.isArray(first.exercises))'));
  assert.ok(html.includes('lessonIndex: first.index'));
  assert.ok(html.includes('lessonIndex > firstIncomplete'),
    'lesson navigation must reject skipping ahead, so adaptive recommendations must respect that boundary');
  assert.ok(!html.includes('unfinishedLessons.forEach(entry =>'),
    'later unfinished lessons must not be recommended while earlier lessons remain locked');
});

test('learner skill profile uses the same ten-attempt confidence threshold as adaptive recommendations', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /porcentajes con menos de diez intentos son orientativos/i);
  assert.match(html, /stats\.attempts < 10/);
  assert.match(html, /attempts < 10/);
  assert.match(html, /datos iniciales \(mínimo 10\)/);
});


test('adaptive recommendations select only the active language skill profile', () => {
  const result = AdaptiveLearning.recommend({
    language: 'pt-BR',
    supportedLanguages: ['id', 'pt-BR', 'en'],
    skillStatsByLanguage: {
      id: { translation: { attempts: 10, correct: 2 } },
      'pt-BR': { listening: { attempts: 10, correct: 3 } }
    },
    nextLesson: { unitId: 'pt_a1_u1', lessonIndex: 0 }
  });
  assert.match(result.description, /escucha: 30%/);
  assert.doesNotMatch(result.description, /traducción/);
  assert.deepEqual(JSON.parse(JSON.stringify(AdaptiveLearning.skillStatsForLanguage({
    id: { recognition: { attempts: 10, correct: 9 } },
    en: { writing: { attempts: 10, correct: 4 } }
  }, 'en', ['id', 'en']))), { writing: { attempts: 10, correct: 4 } });
  assert.deepEqual(JSON.parse(JSON.stringify(AdaptiveLearning.skillStatsForLanguage({
    id: { recognition: { attempts: 10, correct: 9 } }
  }, 'xx', ['id', 'en']))), {});
});


test('adaptive skill profile accepts new codes from the supplied central catalog only', () => {
  const profiles = {
    id: { recognition: { attempts: 10, correct: 8 } },
    xx: { listening: { attempts: 10, correct: 3 } },
    yy: { writing: { attempts: 10, correct: 2 } }
  };
  assert.deepEqual(JSON.parse(JSON.stringify(
    AdaptiveLearning.skillStatsForLanguage(profiles, 'xx', ['id', 'xx'])
  )), { listening: { attempts: 10, correct: 3 } });
  assert.deepEqual(JSON.parse(JSON.stringify(
    AdaptiveLearning.skillStatsForLanguage(profiles, 'yy', ['id', 'xx'])
  )), {});
  assert.deepEqual(JSON.parse(JSON.stringify(
    AdaptiveLearning.skillStatsForLanguage(profiles, 'xx')
  )), {});
});

test('adaptive dashboard passes the LanguageManager catalog to the pure recommendation module', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.ok(html.includes('supportedLanguages: LanguageManager.list().map(({ code }) => code)'));
});


test('adaptive lesson candidates exclude units that are still locked by course progression', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const start = html.indexOf('let nextLesson = null;');
  const end = html.indexOf('if (weakestSkill && typeof AdaptiveLearning.selectSkillLesson', start);
  assert.ok(start >= 0 && end > start, 'adaptive candidate-building block must exist');
  const candidateBlock = html.slice(start, end);
  const unlockGuard = candidateBlock.indexOf('if (!isUnitUnlocked(level, unit, this.completedUnits, this.completedLessons)) continue;');
  const unfinishedLessons = candidateBlock.indexOf('const unfinishedLessons =');
  const candidatePush = candidateBlock.indexOf('skillLessons.push({');
  const nextLessonAssignment = candidateBlock.indexOf('if (!nextLesson)');
  assert.ok(unlockGuard >= 0, 'unit eligibility must be checked before building recommendations');
  assert.ok(unfinishedLessons >= 0 && nextLessonAssignment >= 0 && candidatePush >= 0, 'both recommendation paths must remain covered');
  assert.ok(unlockGuard < unfinishedLessons && unlockGuard < nextLessonAssignment && unlockGuard < candidatePush,
    'locked units must be excluded before either next-lesson or skill-lesson candidates are built');
});


test('the adaptive dashboard hides the all-clear mascot whenever a recommendation is actionable', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');
  assert.match(css, /\.card:has\(> \.btn:not\(:disabled\)\) > \.guardi-empty-illustration/);
  assert.match(css, /\.card:has\(> \.btn:not\(:disabled\)\) > \.guardi-empty-message/);
  assert.match(css, /display:\s*none/);
});


test('Learn shows a compact SRS-only row with live counts and hides it when no reviews are due', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /id="adaptiveRecommendationLearn"[^>]*aria-label="Repaso pendiente" hidden/);
  assert.match(html, /#adaptiveRecommendationLearn\[hidden\] \{ display:none !important; \}/);
  assert.match(html, /adaptive-review-card-row \{ display:flex; align-items:center; justify-content:space-between;/);
  assert.match(html, /adaptive-review-card-title/);
  assert.match(html, /adaptive-review-card-focus/);
  assert.match(html, /min-height:64px/);
  assert.match(html, /const reviewCount = AdaptiveLearning\.normalizeSrsCount\(input\.dueCount\)/);
  assert.match(html, /const weakestSkill = AdaptiveLearning\.weakestSkill\(skillStats\)/);
  assert.match(html, /Punto débil: /);
  assert.match(html, /button\.textContent = isLearnReviewCard \? 'Repasar'/);
  assert.match(html, /if \(reviewCount === 0\) \{\s*host\.hidden = true;/);
  assert.match(html, /const action = isLearnReviewCard \? 'review' : recommendation\.action;/);
  assert.match(html, /if \(action === 'review'\) \{\s*App\.switchView\('srs'\);\s*await SRSEngine\.startSession\(\);/);
  assert.match(html, /reviewCount \+ \(reviewCount === 1/);
});


test('Aprender keeps the compact SRS card separate from the actionable lesson recommendation', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /id="adaptiveRecommendationLearn"[^>]*aria-label="Repaso pendiente" hidden/);
  assert.match(html, /id="adaptiveLearningRecommendationLearn"[^>]*aria-label="Tu siguiente paso recomendado" hidden/);
  assert.match(html, /const isLearnRecommendationCard = host\.id === 'adaptiveLearningRecommendationLearn'/);
  assert.match(html, /reviewCount > 0 \|\| recommendation\.action === 'none'/);
  assert.match(html, /host\.id === 'adaptiveRecommendation' && input\.dueCount === 0/);
  assert.match(html, /App\.switchView\('srs'\);\s*await SRSEngine\.startSession\(\);/);
});


test('successful SRS grades are recorded and do not remain adaptive weak words', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /item\.lastQuality = quality/);
  assert.match(html, /lastQuality: history\.lastQuality/);
  assert.match(html, /AdaptiveLearning\.updateLatestSrsQuality\(aggregate, item\.val\)/);
  assert.match(html, /lastQualityReviewedAt: null/);

  const filterMatch = html.match(
    /\.filter\(\(\[, item\]\) => (item\.savedForReview \|\| item\.incorrect >= 2 &&\s*\(!Number\.isSafeInteger\(item\.lastQuality\) \|\| item\.lastQuality < 3\))\)/
  );
  assert.ok(filterMatch, 'the weak-word filter must exclude successful grades while preserving manual saves');
  const isWeakWord = new Function('item', `return (${filterMatch[1]});`);

  assert.equal(
    isWeakWord({ savedForReview: false, incorrect: 2, lastQuality: 3 }),
    false,
    'a word marked Bien must leave weak recommendations'
  );
  assert.equal(
    isWeakWord({ savedForReview: false, incorrect: 2, lastQuality: 5 }),
    false,
    'a word marked Fácil must leave weak recommendations'
  );
  assert.equal(
    isWeakWord({ savedForReview: false, incorrect: 2, lastQuality: 1 }),
    true,
    'a persistent error with a low latest grade remains weak'
  );
  assert.equal(
    isWeakWord({ savedForReview: false, incorrect: 1, lastQuality: 1 }),
    false,
    'a single error is not a persistent weak word'
  );
  assert.equal(
    isWeakWord({ savedForReview: true, incorrect: 0, lastQuality: 5 }),
    true,
    'manual review saves retain priority even after a successful grade'
  );
});


test('reinforcement recommendations start a session limited to their selected words', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /async startSession\(wordIds = null\)/);
  assert.match(html, /const sessionDue = selectedIds\s*\?/);
  assert.match(html, /await SRSEngine\.startSession\(recommendation\.wordIds\)/);
});

test('a successful same-day SRS reinforcement advances the next review date', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /item\.repetition = Math\.max\(1, item\.repetition \|\| 0\)/);
  assert.match(html, /item\.interval = Math\.max\(1, item\.interval \|\| 0\)/);
  assert.match(html, /item\.lastReviewed = now;\s*item\.nextReview = now \+ \(item\.interval \* 86400000\)/);
});
