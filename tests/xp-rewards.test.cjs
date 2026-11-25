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

test('lesson answers do not award XP immediately; guided writing counts toward first-attempt accuracy', () => {
  const writing = methodSource('rateWriting(isCorrect) {', 'checkOrder() {');
  const feedback = methodSource('showFeedback(isCorrect, explanation, feedbackMessage) {', 'nextStep() {');
  const tracking = methodSource('recordFirstAttempt(exercise, isCorrect) {', 'correctAnswerText(exercise) {');

  assert.doesNotMatch(writing, /App\.addXp\(/);
  assert.doesNotMatch(feedback, /App\.addXp\(/);
  assert.match(writing, /this\.recordFirstAttempt\(ex, isCorrect\)/);
  assert.match(feedback, /this\.recordFirstAttempt\(ex, isCorrect\)/);
  assert.match(tracking, /if \(!exercise \|\| exercise\._firstAttempted\) return;/);
  assert.match(tracking, /if \(isCorrect\) this\.sessionCorrect\+\+;/);
  assert.match(html, /1 XP, hasta 10 XP al completarla por primera vez/);
  assert.match(html, /no sustituye una revisión lingüística/);
});

test('lesson XP is capped at 10 and awarded only when completed for the first time', () => {
  const completion = methodSource('async finishUnit() {', '        };\n\n        /* 5b. LECCIONES GENERADAS CON IA */');
  assert.match(completion, /const lessonKey = unitLessonProgressKey\(unit\.id, lesson\.index\)/);
  assert.match(completion, /if \(!App\.completedLessons\.includes\(lessonKey\)\) \{[\s\S]*?App\.completedLessons\.push\(lessonKey\)[\s\S]*?App\.addXp\(Math\.min\(this\.sessionCorrect, 10\)\)/);
  assert.ok(completion.indexOf('App.addXp(Math.min(this.sessionCorrect, 10))') > completion.indexOf("await DB.set('settings', 'completedLessons'"),
    'XP should be awarded only after the first-completion marker is persisted');
  assert.doesNotMatch(completion, /App\.addXp\(this\.sessionCorrect\)/);
});

test('unit assessments do not award lesson XP', () => {
  const feedback = methodSource('showFeedback(isCorrect, explanation, feedbackMessage) {', 'nextStep() {');
  const completion = methodSource('async finishUnit() {', '        };\n\n        /* 5b. LECCIONES GENERADAS CON IA */');
  assert.match(feedback, /if \(this\.assessmentMode\)/);
  assert.doesNotMatch(feedback, /App\.addXp\(/);
  assert.match(completion, /if \(this\.assessmentMode\) \{/);
});

test('each graded SRS card awards 2 XP and keeps the double-submit guard', () => {
  const review = methodSource('async submitGrade(grade) {', '/* 5. MOTOR DE LECCIONES INTERACTIVAS */');
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

test('incorrect answers can be retried without increasing the first-attempt XP count', () => {
  const writing = methodSource('rateWriting(isCorrect) {', 'checkOrder() {');
  const feedback = methodSource('showFeedback(isCorrect, explanation, feedbackMessage) {', 'nextStep() {');
  const tracking = methodSource('recordFirstAttempt(exercise, isCorrect) {', 'correctAnswerText(exercise) {');

  assert.match(writing, /!isCorrect && !ex\._r\) this\.retry\.push/);
  assert.match(feedback, /!isCorrect && !ex\._r\) \{/);
  assert.match(tracking, /if \(!exercise \|\| exercise\._firstAttempted\) return;/);
});

test('earned XP stays synchronized between lifetime total and the daily goal UI', () => {
  const addXp = methodSource('addXp(amount) {', 'recordStudyActivity(kind, amount = 0) {');
  const recordActivity = methodSource('recordStudyActivity(kind, amount = 0) {', 'recordSkillActivity(skill, isCorrect) {');
  const dashboard = methodSource('updateStudyDashboard() {', 'updateUI() {');
  const updateUI = methodSource('updateUI() {', 'selectLearningLevel(levelId) {');

  assert.match(addXp, /this\\.xp \\+= amount/);
  assert.match(addXp, /DB\\.set\\('settings', 'userXp', this\\.xp\\)/);
  assert.match(addXp, /this\\.recordStudyActivity\\('points', amount\\)/);
  assert.match(addXp, /this\\.updateUI\\(\\)/);
  assert.match(recordActivity, /StudyActivity\\.record\\(this\\.studyActivity, kind, amount, new Date\\(\\)\\)/);
  assert.match(recordActivity, /this\\.updateStudyDashboard\\(\\)/);
  assert.match(updateUI, /totalExpBadge/);
  assert.match(updateUI, /this\\.updateStudyDashboard\\(\\)/);
  assert.match(dashboard, /const goal = this\\.studyActivity\\.dailyGoal/);
  assert.match(dashboard, /const earned = this\\.studyActivity\\.todayXp/);
  assert.match(dashboard, /studyDailyXpText/);
  assert.match(dashboard, /studyDailyXpFill/);
  assert.match(dashboard, /setAttribute\\('aria-valuenow'/);
  assert.match(dashboard, /studyDailyGoalStatus/);
  assert.match(html, /id="totalExpBadge"/);
  assert.match(html, /id="studyDailyXpText"/);
});
