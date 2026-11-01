'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('skill profile labels fewer than five attempts as preliminary data', () => {
  assert.match(html, /menos de cinco intentos son datos iniciales, no conclusiones/i);
  assert.match(html, /stats\.attempts < 5/);
  assert.match(html, /datos iniciales \(mínimo 5\)/);
});

test('skill profile only displays an accuracy percentage after five attempts', () => {
  const updateStart = html.indexOf('updateStudyDashboard()');
  const updateEnd = html.indexOf('async markUnitCompleted', updateStart);
  assert.ok(updateStart >= 0 && updateEnd > updateStart);
  const dashboard = html.slice(updateStart, updateEnd);
  assert.match(dashboard, /stats\.attempts < 5/);
  assert.match(dashboard, /stats\.attempts \+ ' intentos · ' \+ accuracy \+ '% acierto'/);
  assert.match(dashboard, /'Sin intentos'/);
});

test('writing sessions remain visible even before scored writing attempts exist', () => {
  assert.match(html, /key === 'writing' && stats\.sessions/);
  assert.match(html, /prácticas libres/);
});
