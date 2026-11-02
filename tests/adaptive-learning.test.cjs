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


test('lowest skill accuracy is surfaced only after five scored attempts', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [],
    nextLesson: { unitId: 'a2_u1', lessonIndex: 0, title: 'Lección 1' },
    skillStats: {
      recognition: { attempts: 8, correct: 7 },
      translation: { attempts: 5, correct: 2 },
      listening: { attempts: 4, correct: 0 }
    }
  });
  assert.equal(result.type, 'continue-lesson');
  assert.match(result.description, /menor precisión registrada está en traducción: 40% \(5 intentos\)/);
  assert.doesNotMatch(result.description, /escucha/);
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
  assert.match(html, /skillStats: this\.studyActivity && this\.studyActivity\.skillStats/);
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


test('adaptive dashboard only recommends the next unlocked A1 lesson or released A2 lessons', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /level\.id === 'A2' && \(!A2_RELEASE_ENABLED \|\| !a1Complete\)/);
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
  assert.match(html, /item\.savedForReview \|\| item\.incorrect >= 2/);
  assert.match(html, /item\.incorrect === 1/);
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

test('adaptive recommendation action is programmatically associated with its explanation', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /description\.id = 'adaptiveRecommendationDescription'/);
  assert.match(html, /button\.setAttribute\('aria-describedby', description\.id\)/);
  assert.match(html, /host\.append\(heading, description, button\)/);
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

test('guided conversation accuracy becomes actionable after five scored responses', () => {
  const result = AdaptiveLearning.recommend({
    dueCount: 0,
    weakWords: [],
    isolatedWords: [],
    nextLesson: { unitId: 'a2_u1', lessonIndex: 0, title: 'Siguiente lección' },
    skillStats: {
      recognition: { attempts: 8, correct: 7 },
      conversation: { attempts: 5, correct: 2, incorrect: 3, sessions: 2 }
    }
  });
  assert.equal(result.type, 'reinforce-conversation');
  assert.equal(result.action, 'conversation');
  assert.equal(result.label, 'Practicar conversación');
  assert.match(result.description, /conversación: 40% \(5 intentos\)/);
});

test('conversation skill focus ignores fewer than five attempts and keeps urgent review priorities', () => {
  const stats = {
    recognition: { attempts: 8, correct: 6 },
    conversation: { attempts: 4, correct: 0, incorrect: 4 }
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
  assert.match(html, /const first = unfinishedLessons\\[0\\]/);
  assert.match(html, /if \\(weakestSkill && Array\\.isArray\\(first\\.exercises\\)\\)/);
  assert.match(html, /lessonIndex: first\\.index/);
  assert.match(html, /lessonIndex > firstIncomplete/,
    'lesson navigation must reject skipping ahead, so adaptive recommendations must respect that boundary');
  assert.doesNotMatch(html, /unfinishedLessons\\.forEach\\(entry =>/,
    'later unfinished lessons must not be recommended while earlier lessons remain locked');
});
