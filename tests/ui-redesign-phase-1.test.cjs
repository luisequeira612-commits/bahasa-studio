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
    assert.match(html, /id="view-profile"[\s\S]*?switchView\('assessment'\)[\s\S]*?Evaluación piloto/);
    assert.match(html, /id="view-profile"[\s\S]*?switchView\('settings'\)[\s\S]*?Ajustes y datos/);
    assert.match(html, /settings: 'profile', assessment: 'profile'/);
});

test('compact top bar uses the existing study activity values and a live goal ring', () => {
    assert.match(html, /class="app-topbar"/);
    assert.match(html, /id="studyStreakText"/);
    assert.match(html, /id="studyDailyXpText"/);
    assert.match(html, /id="dailyGoalRing"[^>]*role="progressbar"/);
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
    assert.match(html, /data-path-state/);
    assert.match(html, /isNext && lesson\.index === \(nextLesson < 0 \? lessons\.length : nextLesson\) \? 'Empezar'/);
    assert.match(css, /\.path-node::before/);
    assert.match(css, /\.path-node-current > summary::before/);
});

test('navigation layout includes safe-area spacing for narrow mobile screens', () => {
    assert.match(css, /env\(safe-area-inset-bottom\)/);
    assert.match(css, /@media \(max-width:360px\)/);
    assert.match(css, /\.nav-bottom/);
});
