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
});
