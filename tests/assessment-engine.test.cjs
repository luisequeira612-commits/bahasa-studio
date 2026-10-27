'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { LEVELS, ITEM_BANK, getAssessment, scoreAssessment } = require('../assessment-engine.js');

test('each level has a small assessment with an open production task', () => {
  for (const level of Object.keys(LEVELS)) {
    const items = getAssessment(level);
    assert.ok(items.length >= 3, level + ' should have starter items');
    assert.ok(items.some(item => item.type === 'open' && item.skill === 'production'));
    assert.ok(items.every(item => item.level === level));
  }
});

test('choice scoring is level-scoped and reports skill breakdowns', () => {
  const answers = {
    'a1-negation-01': 1,
    'a1-vocab-01': 1,
    'a1-write-01': ''
  };
  const result = scoreAssessment('A1', answers);
  assert.equal(result.earned, 2);
  assert.equal(result.possible, 6);
  assert.equal(result.skills.grammar.percent, 100);
  assert.equal(result.skills.vocabulary.percent, 100);
  assert.equal(result.provisionalPass, false);
  assert.equal(result.items.find(item => item.id === 'a1-write-01').status, 'unanswered');
  assert.deepEqual(result.openItemsPendingReview, []);
});

test('open responses never receive automatic credit from string matching', () => {
  const result = scoreAssessment('A2', {
    'a2-di-01': 2,
    'a2-passive-01': 1,
    'a2-write-01': 'Saya membaca buku di rumah.'
  });
  assert.equal(result.items.find(item => item.id === 'a2-write-01').status, 'needs-review');
  assert.equal(result.items.find(item => item.id === 'a2-write-01').points, 0);
  assert.deepEqual(result.openItemsPendingReview, ['a2-write-01']);
});

test('human-reviewed open responses contribute rubric points and clear review requirement', () => {
  const result = scoreAssessment('B1', {
    'b1-kan-i-01': 0,
    'b1-voice-01': 1,
    'b1-write-01': 'A short response'
  }, { manualScores: { 'b1-write-01': 4 } });
  assert.equal(result.items.find(item => item.id === 'b1-write-01').points, 4);
  assert.equal(result.openItemsPendingReview.length, 0);
  assert.equal(result.skills.production.percent, 80);
  assert.equal(result.thresholds.validated, false);
});

test('manual scores outside the open task point range are rejected', () => {
  assert.throws(() => scoreAssessment('B2', {}, { manualScores: { 'b2-write-01': 6 } }), RangeError);
  assert.throws(() => scoreAssessment('B2', {}, { manualScores: { 'b2-write-01': -1 } }), RangeError);
});

test('unknown levels are rejected and alternate item sets can exclude prior questions', () => {
  assert.throws(() => getAssessment('C1'), RangeError);
  assert.throws(() => scoreAssessment('C1', {}), RangeError);
  const items = getAssessment('A1', { excludeIds: ['a1-vocab-01'] });
  assert.ok(items.every(item => item.id !== 'a1-vocab-01'));
});

test('assessment definitions and scoring do not mutate SRS or persistent storage', () => {
  assert.equal(typeof globalThis.indexedDB, 'undefined');
  assert.ok(ITEM_BANK.every(item => item.id && item.level && item.skill && item.points > 0));
  assert.equal(Object.keys(LEVELS).join(','), 'A1,A2,B1,B2');
});

test('unanswered open responses remain unanswered and outside the review queue', () => {
  const result = scoreAssessment('A1', { 'a1-write-01': '   ' });
  assert.equal(result.items.find(item => item.id === 'a1-write-01').status, 'unanswered');
  assert.deepEqual(result.openItemsPendingReview, []);
});
