'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'writing-practice.js'), 'utf8');

test('writing practice offers three A1 and three A2 prompts', () => {
  const levels = [...source.matchAll(/level: '(A1|A2)'/g)].map(match => match[1]);
  assert.equal(levels.filter(level => level === 'A1').length, 3);
  assert.equal(levels.filter(level => level === 'A2').length, 3);
});

test('writing drafts remain in the current page and are never persisted', () => {
  assert.match(source, /textarea\.id = 'freeWritingDraft'/);
  assert.doesNotMatch(source, /DB\.set|localStorage|indexedDB|sessionStorage|fetch\s*\(/);
  assert.match(source, /el texto no se guarda ni se incluye en las copias de seguridad/i);
});

test('writing session is recorded only after a non-empty draft is compared with its example', () => {
  const emptyDraftGuard = source.indexOf("if (!textarea.value.trim())");
  const exampleReveal = source.indexOf("example.hidden = false", emptyDraftGuard);
  const recordSession = source.indexOf("App.recordSkillSession('writing')", exampleReveal);
  assert.ok(emptyDraftGuard >= 0);
  assert.ok(exampleReveal > emptyDraftGuard);
  assert.ok(recordSession > exampleReveal);
  assert.match(source, /if \(!practiceRecorded && typeof App !== 'undefined'/);
  assert.match(source, /practiceRecorded = true/);
});

test('writing examples are references, not automatic corrections', () => {
  assert.match(source, /no una respuesta única ni una corrección de tu borrador/i);
  assert.match(source, /No corregimos ni puntuamos automáticamente el texto/i);
  assert.match(source, /no ha sido validado por un hablante nativo/i);
});

test('writing practice does not award XP or create SRS reviews', () => {
  assert.match(source, /Sin nota, sin XP ni registro SRS/i);
  assert.doesNotMatch(source, /addXp\s*\(|markForReview\s*\(/);
});
