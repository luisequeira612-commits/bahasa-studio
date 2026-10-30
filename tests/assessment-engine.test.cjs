'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { LEVELS, ITEM_BANK, getAssessment, scoreAssessment } = require('../assessment-engine.js');

test('each level has a small assessment with an open production task', () => {
  for (const level of Object.keys(LEVELS)) {
    const items = getAssessment(level);
    assert.ok(items.length >= 6, level + ' should have a broader starter bank');
    assert.ok(items.some(item => item.type === 'open' && item.skill === 'production'));
    assert.ok(items.every(item => item.level === level));
  }
});

test('A1 assessment covers selected curriculum content, including age, family, routine, and units 15–17', () => {
  const items = getAssessment('A1');
  assert.equal(items.length, 31, 'A1 pilot should contain 29 closed questions and 2 open tasks');
  assert.equal(scoreAssessment('A1', {}).possible, 36);
  const byId = Object.fromEntries(items.map(item => [item.id, item]));
  for (const id of [
    'a1-negation-01', 'a1-vocab-01', 'a1-comprehension-01', 'a1-interaction-01',
    'a1-numbers-01', 'a1-prices-01', 'a1-time-01', 'a1-weather-01',
    'a1-transport-01', 'a1-location-01', 'a1-family-01',
    'a1-age-01', 'a1-routine-01', 'a1-ini-01',
    'a1-actions-01', 'a1-preferences-01', 'a1-questions-01'
  ]) assert.ok(byId[id], 'missing cumulative A1 assessment item: ' + id);
  assert.match(byId['a1-age-01'].prompt, /Berapa umur kamu/);
  assert.match(byId['a1-family-01'].prompt, /ibu/);
  assert.match(byId['a1-routine-01'].prompt, /bangun pagi/);
  assert.match(byId['a1-weather-01'].prompt, /Hari ini hujan/);
  assert.match(byId['a1-transport-01'].prompt, /Saya naik bus/);
  assert.match(byId['a1-actions-01'].prompt, /Saya pergi/);
  assert.match(byId['a1-preferences-01'].prompt, /Saya suka teh/);
  assert.equal(byId['a1-questions-01'].options[byId['a1-questions-01'].answer], 'Kapan kamu datang?');
  const visibleText = items.map(item => [item.prompt, item.explanation || ''].join(' ')).join(' ');
  assert.doesNotMatch(visibleText, /\b(means|write|which|where|choose|commonly|read:|pili)\b/i,
    'A1 prompts and explanations must be in Spanish, except for Indonesian examples');
  for (const skill of LEVELS.A1.skills) {
    assert.ok(items.some(item => item.skill === skill), 'A1 assessment must cover ' + skill);
  }
});

test('A1 multiple-choice answers are distributed across all three positions', () => {
  const choices = getAssessment('A1').filter(item => item.type === 'choice');
  const counts = [0, 0, 0];
  for (const item of choices) {
    assert.equal(item.options.length, 3, item.id + ' should have three answer options');
    counts[item.answer] += 1;
  }
  assert.deepEqual(counts.slice().sort((a, b) => a - b), [7, 10, 12]);
});

test('choice scoring is level-scoped and reports skill breakdowns', () => {
  const answers = {
    'a1-negation-01': 0,
    'a1-vocab-01': 2,
    'a1-location-01': 0,
    'a1-ini-01': 0,
    'a1-write-01': 'Nama saya Ana.'
  };
  const result = scoreAssessment('A1', answers);
  assert.equal(result.earned, 3);
  assert.equal(result.possible, 36);
  assert.equal(result.skills.grammar.percent, 40);
  assert.equal(result.skills.grammar.meetsMinimum, true);
  assert.equal(result.skills.vocabulary.percent, 17);
  assert.equal(result.provisionalPass, false);
  assert.deepEqual(result.openItemsPendingReview, ['a1-write-01']);
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
    'b1-write-01': 'A short response',
    'b1-write-02': 'Another short response'
  }, { manualScores: { 'b1-write-01': 4, 'b1-write-02': 4 } });
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

test('assessment definitions and scoring never access browser persistence APIs', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'assessment-engine.js'), 'utf8');
  const sandbox = { module: { exports: {} } };
  for (const name of ['indexedDB', 'localStorage', 'sessionStorage', 'caches']) {
    Object.defineProperty(sandbox, name, { configurable: true, get() { throw new Error('Unexpected persistence access: ' + name); } });
  }
  vm.runInNewContext(source, sandbox, { filename: 'assessment-engine.js' });
  assert.ok(sandbox.module.exports.ITEM_BANK.every(item => item.id && item.level && item.skill && item.points > 0));
  assert.equal(Object.keys(sandbox.module.exports.LEVELS).join(','), 'A1,A2,B1,B2');
  assert.equal(scoreAssessment('A1', {}).possible, 24);
});

test('main app navigation exposes the independent assessment page', () => {
  const app = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.ok(app.includes("App.switchView('assessment', this)"));
  assert.ok(app.includes('id="view-assessment"'));
  assert.ok(app.includes('href="./assessment.html"'));
});

test('blank open responses remain unanswered and outside the manual-review queue', () => {
  const result = scoreAssessment('A1', { 'a1-write-01': '   ' });
  assert.equal(result.items.find(item => item.id === 'a1-write-01').status, 'unanswered');
  assert.deepEqual(result.openItemsPendingReview, []);
  assert.throws(() => scoreAssessment('A1', { 'a1-write-01': '   ' }, {
    manualScores: { 'a1-write-01': 5 }
  }), RangeError);
});
