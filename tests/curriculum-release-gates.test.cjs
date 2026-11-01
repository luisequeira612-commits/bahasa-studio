'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('A2 has an explicit false-by-default learner release flag', () => {
  assert.match(html, /const A2_RELEASE_ENABLED = false;/);
  assert.match(html, /level\.id !== 'A2' \|\| \(A2_RELEASE_ENABLED && isA1Complete\(App\.completedUnits\)\)/);
});

test('A2 course visibility and lesson entry points all honor the release flag', () => {
  assert.match(html, /if \(!A2_RELEASE_ENABLED \|\| !a1Complete\) return;/);
  const guardedEntryPoints = [...html.matchAll(/level\.id === 'A2' && \(!A2_RELEASE_ENABLED \|\| !isA1Complete\(App\.completedUnits\)\)/g)];
  assert.equal(guardedEntryPoints.length, 3);
});

test('A2 release gate does not alter the A1 completion requirement', () => {
  assert.match(html, /return Boolean\(a1 && a1\.units\.length > 0 && a1\.units\.every\(unit => completed\.includes\(unit\.id\)\)\);/);
});
