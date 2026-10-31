'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const BahasaAssessment = require('../assessment-engine.js');

test('A1 assessment includes scored listening and human-reviewed speaking', () => {
  const items = BahasaAssessment.getAssessment('A1');
  const listening = items.find(item => item.id === 'a1-listen-01');
  const speaking = items.find(item => item.id === 'a1-speak-01');

  assert.ok(listening, 'A1 should include a listening transcription task');
  assert.equal(listening.type, 'listen');
  assert.equal(listening.skill, 'comprehension');
  assert.ok(listening.audioText);
  assert.ok(speaking, 'A1 should include a spoken production task');
  assert.equal(speaking.type, 'speak');
  assert.equal(speaking.skill, 'production');
  assert.ok(speaking.rubric.length >= 3);
});

test('A1 written production has guided prompts, examples and transparent human-review criteria', () => {
  const items = BahasaAssessment.getAssessment('A1');
  const writing = items.find(item => item.id === 'a1-write-03');
  assert.ok(writing, 'A1 should include a distinct everyday writing situation');
  assert.equal(writing.type, 'open');
  assert.equal(writing.points, writing.rubric.length);
  assert.ok(writing.writingGuide.length >= 3);
  assert.ok(writing.selfCheck.length >= 3);
  assert.ok(writing.modelAnswer);
  for (const criterion of writing.rubric) assert.ok(writing.rubricDescriptions[criterion]);
  const response = BahasaAssessment.scoreAssessment('A1', { 'a1-write-03': writing.modelAnswer });
  const result = response.items.find(item => item.id === 'a1-write-03');
  assert.equal(result.status, 'needs-review');
  assert.equal(result.points, 0, 'a model-like open response must not be scored automatically');
  assert.deepEqual(response.openItemsPendingReview, ['a1-write-03']);
});

test('listening transcription scoring ignores case, accents and punctuation only', () => {
  const correct = BahasaAssessment.scoreAssessment('A1', {
    'a1-listen-01': 'saya tinggal di managua.'
  });
  const wrong = BahasaAssessment.scoreAssessment('A1', {
    'a1-listen-01': 'saya tinggal ke managua'
  });
  const correctItem = correct.items.find(item => item.id === 'a1-listen-01');
  const wrongItem = wrong.items.find(item => item.id === 'a1-listen-01');

  assert.equal(correctItem.status, 'correct');
  assert.equal(correctItem.points, 2);
  assert.equal(wrongItem.status, 'incorrect');
  assert.equal(wrongItem.points, 0);
});

test('spoken production stays pending until a human reviewer assigns a score', () => {
  const answers = { 'a1-speak-01': 'Nama saya Ana. Saya dari Peru. Saya suka membaca.' };
  const pending = BahasaAssessment.scoreAssessment('A1', answers);
  const reviewed = BahasaAssessment.scoreAssessment('A1', answers, {
    manualScores: { 'a1-speak-01': 3 }
  });

  assert.deepEqual(pending.openItemsPendingReview, ['a1-speak-01']);
  assert.equal(pending.items.find(item => item.id === 'a1-speak-01').status, 'needs-review');
  assert.equal(reviewed.items.find(item => item.id === 'a1-speak-01').status, 'reviewed');
  assert.equal(reviewed.items.find(item => item.id === 'a1-speak-01').points, 3);
});

test('assessment page offers optional speech transcription without storing audio', () => {
  const page = fs.readFileSync(path.join(__dirname, '..', 'assessment.html'), 'utf8');
  assert.match(page, /data-speech-capture/);
  assert.match(page, /window\.SpeechRecognition\|\|window\.webkitSpeechRecognition/);
  assert.match(page, /transcripción no demuestra por sí sola la calidad oral/);
  assert.match(page, /AudioEngine\.speak\(this\.dataset\.audioText\)/);
  assert.match(page, /type==='listen'/);
  assert.match(page, /type==='speak'/);
});
