'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

test('lesson is presented as a dedicated full-screen view with progress, exit and audio settings', () => {
    assert.match(html, /id="view-lesson" class="app-view lesson-screen"/);
    assert.match(html, /class="lesson-topbar"/);
    assert.match(html, /aria-label="Salir de la lección" onclick="LessonEngine\.requestExit\(\)"/);
    assert.match(html, /id="lessonProgressFill"/);
    assert.match(html, /id="lessonStepCount"/);
    assert.match(html, /class="lesson-audio-settings"/);
    assert.match(html, /document\.body\.classList\.toggle\('lesson-active'/);
    assert.match(css, /body\.lesson-active #view-lesson\.active/);
    assert.match(css, /body\.lesson-active > \.nav-bottom/);
});

test('exit asks for confirmation and the lesson still renders one queued exercise at a time', () => {
    assert.match(html, /requestExit\(\) \{[\s\S]*?window\.confirm\(/);
    assert.match(html, /const ex = this\.queue\[this\.stepIndex\]/);
    assert.match(html, /renderStep\(\)/);
    assert.match(css, /#view-lesson \.quiz-container/);
});

test('objective feedback is shown in a colored bottom sheet with the model answer', () => {
    assert.match(html, /classList\.add\('lesson-feedback-sheet', isCorrect \? 'correct' : 'wrong'\)/);
    assert.match(html, /correctAnswerText\(exercise\)/);
    assert.match(html, /lesson-correct-answer/);
    assert.match(html, /onclick="LessonEngine\.nextStep\(\$\{isCorrect\}\)">Continuar/);
    assert.match(css, /#view-lesson #actionArea\.lesson-feedback-sheet\.correct/);
    assert.match(css, /#view-lesson #actionArea\.lesson-feedback-sheet\.wrong/);
});

test('lesson completion summarizes session XP, first-attempt precision and current streak', () => {
    assert.match(html, /sessionXpStart/);
    assert.match(html, /sessionExerciseCount/);
    assert.match(html, /sessionCorrect/);
    assert.match(html, /sessionSummaryMarkup\(\)/);
    assert.match(html, /XP ganado/);
    assert.match(html, /Precisión/);
    assert.match(html, /Días de racha/);
    assert.match(css, /\.lesson-results-grid/);
});

test('lesson flow preserves the existing XP and progress recording entry points', () => {
    assert.match(html, /if \(isCorrect && !this\.assessmentMode\) App\.addXp\(10\)/);
    assert.match(html, /SRSEngine\.recordAttempt\(ex\.vocabId/);
    assert.match(html, /DB\.set\('settings', 'completedLessons', App\.completedLessons\)/);
    assert.match(html, /App\.recordStudyActivity\('lesson', 0\)/);
});
