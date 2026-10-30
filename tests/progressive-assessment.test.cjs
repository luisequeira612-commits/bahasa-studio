'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const curriculumSandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'curriculum-a1.js'), 'utf8'), curriculumSandbox);
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'curriculum-a2.js'), 'utf8'), curriculumSandbox);
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8')
  .replace('window.BAHASA_CURRICULUM_A1', JSON.stringify(curriculumSandbox.window.BAHASA_CURRICULUM_A1))
  .replace('window.BAHASA_CURRICULUM_A2', JSON.stringify(curriculumSandbox.window.BAHASA_CURRICULUM_A2));

test('unit assessment questions are generated only from that unit vocabulary', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  assert.ok(start >= 0 && end > start, 'course data and assessment builder must exist');
  const app = vm.runInNewContext(html.slice(start, end) + '\n({ CourseData, buildUnitAssessmentItems })');
  const a1 = app.CourseData.levels.find(level => level.id === 'A1');
  for (const unit of a1.units) {
    const items = app.buildUnitAssessmentItems(unit);
    const knownIds = new Set(unit.vocab.map(word => word.id));
    const knownMeanings = new Set(unit.vocab.map(word => word.esp));
    assert.equal(items.length, unit.vocab.length, unit.id + ' should test each taught word once');
    for (const item of items) {
      assert.ok(knownIds.has(item.vocabId), unit.id + ' assessment references unknown vocabulary');
      assert.ok(item.options.every(option => knownMeanings.has(option)), unit.id + ' uses a distractor from another unit');
      assert.equal(item.options[item.answer], unit.vocab.find(word => word.id === item.vocabId).esp);
    }
  }
});

test('unit 1 listening dialogue does not introduce unstudied words', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const unit1 = course.levels.find(level => level.id === 'A1').units.find(unit => unit.id === 'a1_u1');
  const dialogue = unit1.exercises.find(exercise => String(exercise.audioText || '').includes('Selamat pagi') && String(exercise.audioText || '').toLocaleLowerCase().includes('terima kasih'));
  assert.equal(dialogue.audioText, 'Selamat pagi. Apa kabar? Baik, terima kasih.');
  const taughtWords = new Set(unit1.vocab.map(word => word.idn));
  assert.ok(taughtWords.has('Apa kabar?'), 'the dialogue question should be taught in Unit 1');
  assert.ok(taughtWords.has('Baik'), 'the dialogue response should be taught in Unit 1');
});

test('lesson audio speed selector is visible and synchronized with settings', () => {
  assert.match(html, /id="lessonAudioPlaybackRate"/);
  assert.match(html, /\['audioPlaybackRate', 'lessonAudioPlaybackRate'\]/);
  assert.match(html, /Velocidad del audio/);
});

test('unit assessment mode does not award XP or write SRS attempts', () => {
  assert.match(html, /if \(ex\.vocabId && !this\.assessmentMode\)/);
  assert.match(html, /if \(isCorrect && !this\.assessmentMode\) App\.addXp\(10\)/);
});
