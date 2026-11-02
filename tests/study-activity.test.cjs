'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'study-activity.js'), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
const StudyActivity = sandbox.window.StudyActivity;

function localDate(year, month, day) {
  return new Date(year, month - 1, day, 12, 0, 0);
}

test('daily activity starts with a safe default goal and zeroed counters', () => {
  const initial = StudyActivity.createDefault(localDate(2026, 10, 29));
  assert.equal(initial.dailyGoal, 30);
  assert.equal(initial.todayDate, '2026-10-29');
  assert.equal(initial.todayXp, 0);
  assert.equal(initial.currentStreak, 0);
});

test('first activity starts a streak and same-day activity does not increment it twice', () => {
  const day = localDate(2026, 10, 29);
  let activity = StudyActivity.record(StudyActivity.createDefault(day), 'points', 10, day);
  activity = StudyActivity.record(activity, 'review', 0, day);
  activity = StudyActivity.record(activity, 'points', 5, day);
  assert.equal(activity.currentStreak, 1);
  assert.equal(activity.longestStreak, 1);
  assert.equal(activity.todayXp, 15);
  assert.equal(activity.todayReviews, 1);
});

test('consecutive calendar days extend a streak and reset daily counters', () => {
  const day1 = localDate(2026, 10, 29);
  const day2 = localDate(2026, 10, 30);
  let activity = StudyActivity.record(StudyActivity.createDefault(day1), 'points', 20, day1);
  activity = StudyActivity.record(activity, 'lesson', 0, day2);
  assert.equal(activity.currentStreak, 2);
  assert.equal(activity.longestStreak, 2);
  assert.equal(activity.todayDate, '2026-10-30');
  assert.equal(activity.todayXp, 0);
  assert.equal(activity.todayLessons, 1);
});

test('missing a calendar day resets the current streak but preserves the record', () => {
  const day1 = localDate(2026, 10, 29);
  const day2 = localDate(2026, 10, 30);
  const day4 = localDate(2026, 11, 1);
  let activity = StudyActivity.record(StudyActivity.createDefault(day1), 'lesson', 0, day1);
  activity = StudyActivity.record(activity, 'review', 0, day2);
  activity = StudyActivity.record(activity, 'points', 10, day4);
  assert.equal(activity.currentStreak, 1);
  assert.equal(activity.longestStreak, 2);
});

test('daily goals are restricted to supported values and validated backups preserve progress', () => {
  const day = localDate(2026, 10, 29);
  let activity = StudyActivity.record(StudyActivity.createDefault(day), 'points', 25, day);
  activity = StudyActivity.setGoal(activity, 50, day);
  const restored = StudyActivity.validateBackup(activity, day);
  assert.equal(restored.dailyGoal, 50);
  assert.equal(restored.todayXp, 25);
  assert.equal(restored.currentStreak, 1);
  assert.throws(() => StudyActivity.setGoal(activity, 35, day), /Objetivo diario no válido/);
  assert.throws(() => StudyActivity.validateBackup({ dailyGoal: 35 }, day), /Objetivo diario no válido/);
  assert.throws(() => StudyActivity.validateBackup({ todayXp: -1 }, day), /Contador de actividad no válido/);
});

test('legacy backups without activity data receive a clean default', () => {
  const activity = StudyActivity.validateBackup(undefined, localDate(2026, 10, 29));
  assert.equal(activity.dailyGoal, 30);
  assert.equal(activity.lastStudyDate, null);
  assert.equal(activity.todayXp, 0);
  assert.equal(activity.skillStats.listening.attempts, 0, 'legacy backups receive empty skill counters');
});


test('exercise types map to explicit practice skills', () => {
  assert.equal(StudyActivity.skillForExercise('mc'), 'recognition');
  assert.equal(StudyActivity.skillForExercise('mc', true), 'listening');
  assert.equal(StudyActivity.skillForExercise('match'), 'recognition');
  assert.equal(StudyActivity.skillForExercise('translate_es_id'), 'translation');
  assert.equal(StudyActivity.skillForExercise('listen'), 'listening');
  assert.equal(StudyActivity.skillForExercise('mc', false), 'recognition');
  assert.equal(StudyActivity.skillForExercise('order'), 'sentenceBuilding');
  assert.equal(StudyActivity.skillForExercise('write'), 'writing');
  assert.equal(StudyActivity.skillForExercise('unknown'), null);
});

test('first attempts update skill accuracy and survive version-3 backup validation', () => {
  const day = localDate(2026, 10, 29);
  let activity = StudyActivity.createDefault(day);
  activity = StudyActivity.recordSkill(activity, 'listening', true, day);
  activity = StudyActivity.recordSkill(activity, 'listening', false, day);
  activity = StudyActivity.recordSkill(activity, 'translation', true, day);
  activity = StudyActivity.recordSkill(activity, 'conversation', true, day);
  activity = StudyActivity.recordSkill(activity, 'conversation', false, day);
  const restored = StudyActivity.validateBackup(activity, day);
  assert.equal(restored.skillStats.listening.attempts, 2);
  assert.equal(restored.skillStats.listening.correct, 1);
  assert.equal(restored.skillStats.listening.incorrect, 1);
  assert.equal(restored.skillStats.translation.attempts, 1);
  assert.equal(restored.skillStats.translation.correct, 1);
  assert.equal(restored.skillStats.conversation.attempts, 2);
  assert.equal(restored.skillStats.conversation.correct, 1);
  assert.equal(restored.skillStats.conversation.incorrect, 1);
  assert.equal(restored.todayXp, 0, 'skill tracking does not award XP');
  assert.equal(restored.todayLessons, 0, 'skill tracking does not fabricate completed lessons');
  assert.throws(() => StudyActivity.recordSkill(activity, 'unknown', true, day), /Habilidad de práctica no válida/);
  assert.throws(() => StudyActivity.recordSkill(activity, 'writing', 'yes', day), /Resultado de práctica no válido/);
  assert.throws(() => StudyActivity.validateBackup({
    skillStats: { listening: { attempts: 1, correct: 2, incorrect: 0, sessions: 0 } }
  }, day), /Intentos de habilidad incoherentes/);
});

test('free writing and conversation sessions count without storing their text', () => {
  const day = localDate(2026, 10, 29);
  let activity = StudyActivity.createDefault(day);
  activity = StudyActivity.recordSkillSession(activity, 'writing', day);
  activity = StudyActivity.recordSkillSession(activity, 'conversation', day);
  const restored = StudyActivity.validateBackup(activity, day);
  assert.equal(restored.skillStats.writing.sessions, 1);
  assert.equal(restored.skillStats.conversation.sessions, 1);
  assert.equal(restored.skillStats.writing.attempts, 0);
  assert.equal(restored.currentStreak, 1);
  assert.equal(restored.todayXp, 0);
  assert.equal(restored.todayLessons, 0);
  assert.throws(() => StudyActivity.recordSkillSession(activity, 'listening', day), /Sesión de práctica no válida/);
});


test('skill counters reject values beyond the safe local limit', () => {
  const day = localDate(2026, 10, 29);
  const activity = StudyActivity.createDefault(day);
  activity.skillStats.listening.attempts = 1000000000;
  activity.skillStats.listening.correct = 1000000000;
  assert.throws(() => StudyActivity.recordSkill(activity, 'listening', true, day), /Contador de habilidad no válido/);
  activity.skillStats.conversation.sessions = 1000000000;
  assert.throws(() => StudyActivity.recordSkillSession(activity, 'conversation', day), /Contador de habilidad no válido/);
});


test('daily activity counters enforce the same safe local limit as skill counters', () => {
  const day = localDate(2026, 10, 29);
  const activity = StudyActivity.createDefault(day);

  activity.todayXp = 1000000000;
  assert.throws(() => StudyActivity.record(activity, 'points', 1, day), /Contador de actividad no válido/);
  activity.todayXp = 0;

  activity.todayLessons = 1000000000;
  assert.throws(() => StudyActivity.record(activity, 'lesson', 0, day), /Contador de actividad no válido/);
  activity.todayLessons = 0;

  activity.todayReviews = 1000000000;
  assert.throws(() => StudyActivity.record(activity, 'review', 0, day), /Contador de actividad no válido/);
});

test('daily activity counters reject oversized XP increments without mutating the input', () => {
  const day = localDate(2026, 10, 29);
  const activity = StudyActivity.createDefault(day);
  activity.todayXp = 999999999;
  const before = JSON.stringify(activity);
  assert.throws(() => StudyActivity.record(activity, 'points', 2, day), /Contador de actividad no válido/);
  assert.equal(JSON.stringify(activity), before);
});


test('streak counters reject an unsafe consecutive-day increment without mutating the input', () => {
  const yesterday = localDate(2026, 10, 29);
  const today = localDate(2026, 10, 30);
  const activity = StudyActivity.createDefault(yesterday);
  activity.lastStudyDate = '2026-10-29';
  activity.currentStreak = 1000000000;
  activity.longestStreak = 1000000000;
  const before = JSON.stringify(activity);

  assert.throws(
    () => StudyActivity.record(activity, 'lesson', 0, today),
    /Contador de actividad no válido/
  );
  assert.equal(JSON.stringify(activity), before);
});
