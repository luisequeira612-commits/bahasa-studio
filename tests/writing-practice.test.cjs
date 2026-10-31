const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'writing-practice.js'), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { filename: 'writing-practice.js' });
const WritingPractice = sandbox.window.WritingPractice;

test('free-writing notebook has distinct A1 composition tasks and clear boundaries', () => {
  assert.equal(WritingPractice.tasks.length, 3);
  assert.deepEqual(Array.from(WritingPractice.tasks, task => task.id), ['profile', 'travel', 'directions']);
  for (const task of WritingPractice.tasks) {
    assert.ok(task.situation.length > 50);
    assert.ok(task.checklist.length >= 3);
    assert.ok(task.example.length > 20);
  }
  assert.match(source, /no se guarda al recargar o salir/i);
  assert.match(source, /no ha sido validado por un hablante nativo/i);
  assert.doesNotMatch(source, /DB\.set|DB\.get|localStorage|indexedDB|addXp|SRSEngine|recordAttempt/,
    'free-writing practice must not persist drafts, award XP, or create SRS records');
});

test('free-writing notebook uses DOM text nodes for prompts and examples', () => {
  assert.match(source, /textContent =/);
  assert.doesNotMatch(source, /innerHTML/);
  assert.match(source, /aria-live="polite"/);
});
