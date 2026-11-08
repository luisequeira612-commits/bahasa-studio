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

test('dictionary, pilot assessment and settings remain reachable from their parent areas', () => {
    assert.match(html, /onclick="App\.switchView\('dict'\)">📖 Diccionario/);
    assert.match(html, /id="view-dict"[\s\S]*?onclick="App\.switchView\('ai'\)">← Tutor/);
    assert.match(html, /id="view-profile"[\s\S]*?switchView\('assessment'(?:, this)?\)[\s\S]*?Evaluación piloto/);
    assert.match(html, /id="view-profile"[\s\S]*?switchView\('settings'\)[\s\S]*?Ajustes y datos/);
});

test('compact top bar keeps the existing study activity values and live goal ring', () => {
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

test('fixed level selector exposes A1, A2, B1 and B2 and defaults from the current course progress', () => {
    const selector = html.match(/<div id="learningLevelSelector"[\s\S]*?<\/div>/);
    assert.ok(selector);
    assert.deepEqual([...selector[0].matchAll(/data-level="(A1|A2|B1|B2)"/g)].map(match => match[1]), ['A1', 'A2', 'B1', 'B2']);
    assert.match(html, /selectedLearningLevel = getCurrentLearningLevelId\(\)/);
    assert.match(css, /\.learning-level-selector[\s\S]*?position: sticky/);
});

test('unit path groups official levels in sections of eight and draws numbered, completed and locked nodes', () => {
    assert.match(html, /offset \+= 8/);
    assert.match(html, /visibleUnits\.slice\(offset, offset \+ 8\)/);
    assert.match(html, /node\.dataset\.pathState = state/);
    assert.match(html, /state === 'locked' \? '🔒' : String\(offset \+ index \+ 1\)/);
    assert.match(html, /function getUnitProgressState/);
    assert.match(html, /function isUnitUnlocked/);
    assert.match(css, /\.learning-unit-node\.node-completed[\s\S]*?background: #16834b/);
    assert.match(css, /\.learning-unit-node\.node-current[\s\S]*?background: var\(--accent\)/);
    assert.match(css, /\.learning-unit-node\.node-locked[\s\S]*?background: #e5e7eb/);
    assert.match(css, /\.learning-unit-node\.node-available/);
});

test('B2 shows only its implemented U1 and one upcoming placeholder without removing the development guard', () => {
    assert.match(html, /level\.id === 'B2' \? level\.units\.slice\(0, 1\) : level\.units/);
    assert.match(html, /unit-path-coming-soon/);
    assert.match(html, /Las demás unidades B2 todavía no están implementadas/);
    assert.match(html, /B2 stays in development/);
    assert.match(html, /getEmergencyUnitSkips\(\)\.includes\(id\)/);
});

test('unit bottom sheet includes title, description, lesson progress, lesson CTA and grammar', () => {
    assert.match(html, /id="unitBottomSheet"[^>]*role="dialog"/);
    assert.match(html, /id="unitSheetTitle"/);
    assert.match(html, /unit\.desc/);
    assert.match(html, /progress\.completedLessonCount/);
    assert.match(html, /Empezar lección /);
    assert.match(html, /Ver gramática/);
    assert.match(html, /handleUnitSheetBackdrop\(event\)/);
    assert.match(html, /event\.changedTouches\[0\]\.clientY - this\.unitSheetTouchStart > 80/);
    assert.match(html, /event\.key === 'Escape'/);
});

test('emergency jump requires confirmation and stores only a local skip identifier', () => {
    assert.match(html, /id="emergencyUnitJump"/);
    assert.match(html, /window\.confirm\('¿Saltar a '/);
    assert.match(html, /localStorage\.setItem\('bahasaStudioUnitSkipId'/);
    assert.match(html, /localStorage\.getItem\('bahasaStudioUnitSkipId'/);
    assert.doesNotMatch(html, /putSetting\('unitSkip|DB\.set\('settings', 'unitSkip/);
});

test('current unit auto-scroll and floating return button use the actual viewport state', () => {
    assert.match(html, /scrollToCurrentUnit\(true\)/);
    assert.match(html, /id="jumpToCurrentUnitBtn"/);
    assert.match(html, /getBoundingClientRect\(\)/);
    assert.match(html, /window\.addEventListener\('scroll'/);
});

test('mobile path controls preserve 44px minimum targets and responsive 360–400px layout', () => {
    assert.match(css, /min-width: 44px/);
    assert.match(css, /min-height: 44px/);
    assert.match(css, /@media \(max-width: 380px\)/);
    assert.match(css, /env\(safe-area-inset-bottom\)/);
});

test('lesson progress and JSON v3 import/export fields remain unchanged', () => {
    assert.match(html, /App\.completedLessons\.push\(lessonKey\)/);
    assert.match(html, /DB\.set\('settings', 'completedLessons', App\.completedLessons\)/);
    assert.match(html, /completedLessons: this\.completedLessons/);
    assert.match(html, /putSetting\('completedLessons', data\.completedLessons \|\| \[\]\)/);
    assert.match(html, /unitSkipId/);
    const manifest = fs.readFileSync(path.join(root, 'manifest.json'), 'utf8');
    const serviceWorker = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
    assert.match(manifest, /"display":\s*"standalone"/);
    assert.match(serviceWorker, /bahasa-studio-v3\.8\./);
});

test('daily goal ring remains accessible and the 14-day study history remains available', () => {
    assert.match(html, /id="dailyGoalRing"[^>]*aria-controls="dailyGoalHelp"/);
    assert.match(html, /id="dailyGoalHelp"[^>]*>Este anillo mide cuánto XP/);
    assert.match(html, /id="studyHistoryDashboard"/);
    assert.match(html, /id="studyHistoryChart"/);
    assert.match(css, /\.study-history-chart/);
});
