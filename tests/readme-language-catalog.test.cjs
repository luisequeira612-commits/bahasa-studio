'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { loadInlineB1Curriculum } = require('../scripts/load-inline-b1-curriculum.mjs');
const { loadInlineB2Curriculum } = require('../scripts/load-inline-b2-curriculum.mjs');

const root = path.join(__dirname, '..');

function loadStandalone(filename, globalName) {
  const source = fs.readFileSync(path.join(root, filename), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename, timeout: 5000 });
  return sandbox.window[globalName];
}

test('README lists the four Indonesian levels that are actually present in CourseData', () => {
  const a1 = loadStandalone('curriculum-a1.js', 'BAHASA_CURRICULUM_A1');
  const a2 = loadStandalone('curriculum-a2.js', 'BAHASA_CURRICULUM_A2');
  const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const b1 = loadInlineB1Curriculum(indexSource, a1, a2);
  const b2 = loadInlineB2Curriculum(indexSource, a1, a2);

  assert.deepEqual([a1.id, a2.id, b1.id, b2.id], ['A1', 'A2', 'B1', 'B2']);
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  assert.match(readme, /\| Indonesio \\(id\\) \| Disponible: A1, A2, B1 y B2 \|/);
});
