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
