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

test('writing draft shows a live word count and a level-appropriate sentence target', () => {
  assert.match(source, /const draftCount = make\\('p', '0 palabras/);
  assert.match(source, /textarea\\.addEventListener\\('input', updateDraftCount\\)/);
  assert.match(source, /textarea\\.value\\.trim\\(\\)\\.match\\(\\/\\\\S\\+\\/g\\)/);
  assert.match(source, /task\\.level === 'A1' \\? '3–4 frases' : '5–7 frases'/);
  assert.match(source, /draftCount\\.setAttribute\\('aria-live', 'polite'\\)/);
  assert.match(source, /host\\.append\\(label, textarea, draftCount,/);
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


test('A2 writing prompts stay locked until all A1 units are completed', () => {
  const vm = require('node:vm');
  const context = { window: {
    App: { completedUnits: ['a1_u1'] },
    CourseData: { levels: [{ id: 'A1', units: [{ id: 'a1_u1' }, { id: 'a1_u2' }] }] }
  } };
  vm.runInNewContext(source, context);
  const practice = context.window.WritingPractice;
  assert.deepEqual(Array.from(practice.getAvailableTasks(), task => task.level), ['A1', 'A1', 'A1']);
  assert.equal(practice.getTask('budget'), null);
});

test('A2 writing prompts unlock when every A1 unit is complete', () => {
  const vm = require('node:vm');
  const context = { window: {
    App: { completedUnits: ['a1_u1', 'a1_u2'] },
    CourseData: { levels: [{ id: 'A1', units: [{ id: 'a1_u1' }, { id: 'a1_u2' }] }] }
  } };
  vm.runInNewContext(source, context);
  const levels = context.window.WritingPractice.getAvailableTasks().map(task => task.level);
  assert.deepEqual(levels, ['A1', 'A1', 'A1', 'A2', 'A2', 'A2']);
});

test('writing task lookup cannot bypass the A2 progression gate', () => {
  const vm = require('node:vm');
  const context = { window: {
    App: { completedUnits: [] },
    CourseData: { levels: [{ id: 'A1', units: [{ id: 'a1_u1' }] }] }
  } };
  vm.runInNewContext(source, context);
  assert.equal(context.window.WritingPractice.getAvailableTasks().some(task => task.id === 'budget'), false);
});


test('writing self-review checklist is interactive and never presents itself as a score', () => {
  assert.match(source, /checkbox\.type = 'checkbox'/);
  assert.match(source, /checkbox\.addEventListener\('change'/);
  assert.match(source, /checkedItems \+= checkbox\.checked \? 1 : -1/);
  assert.match(source, /checklistStatus\.setAttribute\('aria-live', 'polite'\)/);
  assert.match(source, /criterios revisados/);
  assert.match(source, /No corregimos ni puntuamos automáticamente el texto/);
  assert.doesNotMatch(source, /checklistStatus.*nota|checklistStatus.*porcentaje/i);
});


test('A2 writing support vocabulary is rendered as a visible reference list', () => {
  assert.match(source, /task\.vocabulary && task\.vocabulary\.length/);
  assert.match(source, /make\('h4', 'Vocabulario de apoyo'\)/);
  assert.match(source, /task\.vocabulary\.forEach\(term => vocabularyList\.appendChild\(make\('li', term\)\)\)/);
  assert.match(source, /host\.append\(vocabularyHeading, vocabularyList\)/);
  assert.match(source, /id: 'budget'[\s\S]*?vocabulary: \[/);
  assert.match(source, /id: 'online-meeting'[\s\S]*?vocabulary: \[/);
  assert.match(source, /id: 'compare-decisions'[\s\S]*?vocabulary: \[/);
});
