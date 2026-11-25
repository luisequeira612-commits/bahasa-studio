'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function methodSource(signature, nextSignature) {
  const start = html.indexOf(signature);
  assert.notEqual(start, -1, signature + ' must exist');
  const end = html.indexOf(nextSignature, start);
  assert.ok(end > start, signature + ' must have a following method boundary');
  return html.slice(start, end);
}

test('correct lesson answers award 3 XP, including guided writing self-assessment', () => {
  const writing = methodSource('rateWriting(isCorrect) {', 'checkOrder() {');
  const feedback = methodSource('showFeedback(isCorrect, explanation, feedbackMessage) {', 'nextStep() {');

  assert.match(writing, /if \(isCorrect && !this\.assessmentMode\) App\.addXp\(3\);/);
  assert.match(feedback, /if \(isCorrect && !this\.assessmentMode\) App\.addXp\(3\);/);
  assert.doesNotMatch(writing, /App\.addXp\(10\)/);
  assert.doesNotMatch(feedback, /App\.addXp\(10\)/);
  assert.match(html, /marcar que lo conseguiste registra 3 XP y un intento de repaso espaciado/);
  assert.match(html, /no es una revisión lingüística/);
});

test('unit assessments do not award per-answer lesson XP', () => {
  const writing = methodSource('rateWriting(isCorrect) {', 'checkOrder() {');
  const feedback = methodSource('showFeedback(isCorrect, explanation, feedbackMessage) {', 'nextStep() {');

  assert.match(writing, /!this\.assessmentMode/);
  assert.match(feedback, /if \(isCorrect && !this\.assessmentMode\) App\.addXp\(3\);/);
  assert.match(feedback, /if \(this\.assessmentMode\)/);
});

test('each graded SRS card awards 2 XP and keeps the double-submit guard', () => {
  const review = methodSource('async submitGrade(grade) {', '        };\n\n        /* 5. MOTOR DE LECCIONES INTERACTIVAS */');
  assert.match(review, /if \(this\.isGrading \|\| !\[1, 3, 5\]\.includes\(normalizedGrade\)\) return;/);
  assert.match(review, /App\.addXp\(2\);/);
  assert.doesNotMatch(review, /App\.addXp\(5\)/);
});

test('first-time unit completion awards 20 XP exactly once', () => {
  const completion = methodSource('async markUnitCompleted(unitId) {', 'updateUI() {');
  assert.match(completion, /if \(!this\.completedUnits\.includes\(unitId\)\) \{/);
  assert.match(completion, /this\.addXp\(20\);/);
  assert.doesNotMatch(completion, /this\.addXp\(50\)/);
});

test('incorrect answers can be retried but only correct non-assessment answers award XP', () => {
  const writing = methodSource('rateWriting(isCorrect) {', 'checkOrder() {');
  const feedback = methodSource('showFeedback(isCorrect, explanation, feedbackMessage) {', 'nextStep() {');

  assert.match(writing, /!isCorrect && !ex\._r\) this\.retry\.push/);
  assert.match(feedback, /!isCorrect && !ex\._r\) \{/);
  assert.match(writing, /if \(isCorrect && !this\.assessmentMode\) App\.addXp\(3\);/);
  assert.match(feedback, /if \(isCorrect && !this\.assessmentMode\) App\.addXp\(3\);/);
});
