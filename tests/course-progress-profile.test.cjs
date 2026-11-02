'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('profile displays independent A1 and A2 course progress indicators', () => {
  assert.match(html, /id="courseProgressText">0% · 0\/32 unidades/);
  assert.match(html, /id="a2CourseProgressText">0% · 0\/40 unidades/);
  assert.match(html, /aria-label="Progreso del nivel A2 en beta"/);
  assert.match(html, /id="a2CourseProgressFill"/);
});

test('profile calculates A2 progress from completed A2 unit IDs, independently of A1', () => {
  const start = html.indexOf('updateUI() {');
  const end = html.indexOf('renderCourseRoute() {', start);
  assert.ok(start >= 0 && end > start, 'updateUI must remain available');
  const updateUI = html.slice(start, end);
  assert.match(updateUI, /const a2 = CourseData\.levels\.find\(level => level\.id === 'A2'\)/);
  assert.match(updateUI, /a2\.units\.filter\(unit => this\.completedUnits\.includes\(unit\.id\)\)/);
  assert.match(updateUI, /a2CourseProgressText/);
  assert.match(updateUI, /a2CourseProgressFill/);
  assert.doesNotMatch(updateUI, /a2Completed[^;]*completedLessons/);
});
