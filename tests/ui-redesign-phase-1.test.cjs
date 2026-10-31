'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

test('primary navigation exposes exactly four requested destinations', () => {
    const nav = html.match(/<nav class="nav-bottom"[\s\S]*?<\/nav>/);
    assert.ok(nav, 'primary navigation exists');
    const labels = [...nav[0].matchAll(/<span>(Aprender|Repasar|Tutor|Perfil)<\/span>/g)].map(match => match[1]);
    assert.deepEqual(labels, ['Aprender', 'Repasar', 'Tutor', 'Perfil']);
    assert.equal((nav[0].match(/class="nav-btn/g) || []).length, 4);
});

test('dictionary, pilot assessment and settings are reachable from their requested parent areas', () => {
    assert.match(html, /onclick="App\.switchView\('dict'\)">📖 Diccionario/);
    assert.match(html, /id="view-dict"[\s\S]*?onclick="App\.switchView\('ai'\)">← Tutor/);
    assert.match(html, /id="view-profile"[\s\S]*?switchView\('assessment'(?:, this)?\)[\s\S]*?Evaluación piloto/);
    assert.match(html, /id="view-profile"[\s\S]*?switchView\('settings'\)[\s\S]*?Ajustes y datos/);
    assert.match(html, /settings: 'profile', assessment: 'profile'/);
});

test('compact top bar uses the existing study activity values and a live goal ring', () => {
    assert.match(html, /class="app-topbar"/);
    assert.match(html, /id="studyStreakText"/);
    assert.match(html, /id="studyDailyXpText"/);
    assert.match(html, /id="dailyGoalRing"[^>]*type="button"[^>]*aria-controls="dailyGoalHelp"/);
    assert.match(html, /goalRing\.style\.setProperty\('--goal-progress'/);
    assert.match(html, /id="studyLongestStreakText"/);
    assert.match(html, /id="totalExpBadge"/);
});

test('learning route keeps optional tools in collapsible drawers', () => {
    const route = html.match(/<main id="view-route"[\s\S]*?<\/main>/);
    assert.ok(route);
    for (const label of ['Generador de lecciones con IA', 'Cuaderno de escritura', 'Conversaciones prácticas']) {
        assert.ok(route[0].includes(label), label + ' remains available');
    }
    assert.equal((route[0].match(/<details class="feature-drawer">/g) || []).length, 3);
    assert.match(route[0], /id="courseContainer"/);
});

test('A1 units are rendered as completed, current or locked path nodes without changing unit identifiers', () => {
    assert.match(html, /path-node-completed/);
    assert.match(html, /path-node-current/);
    assert.match(html, /path-node-locked/);
    assert.match(html, /card\.dataset\.pathState/);
    assert.match(html, /Empezar lección \${currentLessonIndex \+ 1}/);
    assert.match(html, /lesson-start-btn/);
    assert.match(html, /card\.dataset\.pathState = isDone \? 'completed' : isNext \? 'current' : 'locked'/);
    assert.match(css, /\.path-node::before/);
    assert.match(css, /\.path-node-current > summary::before/);
});

test('navigation layout includes safe-area spacing for narrow mobile screens', () => {
    assert.match(css, /env\(safe-area-inset-bottom\)/);
    assert.match(css, /@media \(max-width:360px\)/);
    assert.match(css, /\.nav-bottom/);
});


test('current unit places a full-width lesson CTA before a collapsed grammar drawer', () => {
    assert.match(html, /class="btn lesson-start-btn"[^>]*>Empezar lección \${currentLessonIndex \+ 1}/);
    assert.match(html, /<details class="unit-grammar">\s*<summary>Ver gramática<\/summary>/);
    assert.match(html, /class="unit-secondary-actions"/);
    assert.match(css, /\.lesson-start-btn[\s\S]*?min-height:52px/);
    assert.match(css, /background:#e8384f; color:#fff/);
    assert.match(css, /border-bottom:4px solid #bd263b/);
});

test('approved units use green completion styling and remain collapsed by default', () => {
    assert.match(html, /path-node-completed/);
    assert.match(html, /badge-completed/);
    assert.match(css, /\.path-node-completed \.unit-title \{ color:var\(--text-main\); \}/);
    assert.match(css, /\.path-node-completed \.unit-complete-check \{ color:var\(--success\)/);
    assert.doesNotMatch(html, /if \(isDone\) card\.open = true/);
});

test('daily goal ring explains its purpose accessibly and updates its spoken label', () => {
    assert.match(html, /id="dailyGoalRing"[^>]*aria-controls="dailyGoalHelp"/);
    assert.match(html, /id="dailyGoalHelp"[^>]*>Este anillo mide cuánto XP/);
    assert.match(html, /aria-label', 'Objetivo diario: '/);
    assert.match(html, /scrollToCurrentUnit\(true\)/);
});

test('application and service worker cache versions are advanced without changing worker strategy', () => {
    assert.match(html, /Bahasa Studio 3\.8\.15/);
    const manifest = fs.readFileSync(path.join(root, 'manifest.json'), 'utf8');
    const serviceWorker = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
    assert.match(manifest, /Bahasa Studio 3\.8\.15/);
    assert.match(serviceWorker, /bahasa-studio-v3\.8\.25/);
    assert.match(serviceWorker, /adaptive-learning\.js/);
});
