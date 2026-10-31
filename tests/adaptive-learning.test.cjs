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
    dailyXp: 0,
    dailyGoal: 30
  });
  assert.equal(result.type, 'review-due');
  assert.equal(result.action, 'review');
  assert.match(result.description, /4 palabras/);
});

test('recently difficult words are recommended when no reviews are due', () => {
  const weakWords = Array.from({ length: 7 }, (_, index) => ({ id: 'w' + index, term: 'palabra' + index }));
  const result = AdaptiveLearning.recommend({ dueCount: 0, weakWords });
  assert.equal(result.type, 'reinforce-weak');
  assert.equal(result.wordIds.length, 5);
  assert.match(result.description, /palabra0/);
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
  const result = AdaptiveLearning.recommend({ dueCount: 0, weakWords: [], dailyXp: 10, dailyGoal: 30 });
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
  const input = { dueCount: -2, weakWords, dailyXp: -1, dailyGoal: 0 };
  const before = JSON.stringify(input);
  const result = AdaptiveLearning.recommend(input);
  assert.equal(result.type, 'reinforce-weak');
  assert.equal(JSON.stringify(input), before);
  assert.equal(AdaptiveLearning.recommend({ nextLesson: { unitId: 'a1_u1', lessonIndex: -1 } }).type, 'maintenance');
});
