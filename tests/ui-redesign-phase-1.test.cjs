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

test('compact top bar keeps study activity values and selected-level progress ring', () => {
    assert.match(html, /class="app-topbar"/);
    assert.match(html, /id="studyStreakText"/);
    assert.match(html, /id="studyDailyXpText"/);
    assert.match(html, /id="learningLevelTrigger"[^>]*aria-label="Cambiar nivel/);
    assert.match(html, /levelProgressRing\.style\.setProperty\(/);
    assert.match(html, /id="studyLongestStreakText"/);
    assert.match(html, /id="totalExpBadge"/);
});

test('learning route exposes compact access buttons for the three original tool drawers', () => {
    const route = html.match(/<main id="view-route"[\s\S]*?<\/main>/);
    assert.ok(route);
    const targets = ['aiGeneratorDrawer', 'writingPracticeDrawer', 'conversationPracticeDrawer'];
    for (const target of targets) {
        assert.ok(html.includes("App.openLearningToolFromSheet('" + target + "')"), target + ' has a compact sheet entry');
        assert.ok(route[0].includes('id="' + target + '"'), target + ' keeps its original panel');
    }
    for (const label of ['Generador de lecciones con IA', 'Cuaderno de escritura', 'Conversaciones prácticas']) {
        assert.ok(route[0].includes(label), label + ' remains available');
    }
    assert.equal((route[0].match(/<details class="feature-drawer learning-tool-panel"/g) || []).length, 3);
    assert.match(route[0], /id="courseContainer"/);
    assert.match(html, /openLearningToolFromSheet\(id\)/);
});

test('compact level button opens a sheet for all course levels and defaults from current progress', () => {
    assert.match(html, /id="learningLevelTrigger"[^>]*aria-haspopup="dialog"[^>]*aria-controls="learningLevelSheetOverlay"/);
    assert.match(html, /id="learningLevelSheetOverlay"/);
    assert.match(html, /CourseData\.levels\.forEach\(level =>/);
    assert.match(html, /className = 'learning-level-sheet-row'/);
    assert.match(html, /selectedLearningLevel = getCurrentLearningLevelId\(\)/);
    assert.match(html, /\.level-progress-trigger\s*\{[^}]*min-width:44px[^}]*min-height:44px/);
    assert.match(html, /const A2_RELEASE_ENABLED = true/);
});

test('unit path groups official levels in sections of eight and draws numbered, completed and locked nodes', () => {
    assert.match(html, /offset \+= 8/);
    assert.match(html, /visibleUnits\.slice\(offset, offset \+ 8\)/);
    assert.match(html, /node\.dataset\.pathState = state/);
    assert.match(html, /node\.innerHTML = '<svg class="node-state-icon"/);
    assert.match(html, /node\.innerHTML = '<svg class="node-progress-ring"/);
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
    assert.match(html, /unit-path-coming-soon-circle/);
    assert.ok(css.includes('.unit-path-coming-soon .unit-path-coming-soon-circle'));
    assert.match(html, /B2 U1 opens after B1 is complete/);
    assert.match(html, /<span class="badge">En desarrollo<\/span>/);
    assert.match(html, /skipIds\.includes\(unit\.id\)/);
    assert.match(html, /const availableUnits = level\.id === 'B2' \? level\.units\.slice\(0, 1\) : level\.units/);
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
    assert.match(html, /bahasaStudioUnitSkipId/);
    const manifest = fs.readFileSync(path.join(root, 'manifest.json'), 'utf8');
    const serviceWorker = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
    assert.match(manifest, /"display":\s*"standalone"/);
    assert.match(serviceWorker, /bahasa-studio-v3\.8\./);
});

test('selected-level progress ring and 14-day study history remain available', () => {
    assert.match(html, /id="learningLevelTrigger"[^>]*aria-label="Cambiar nivel/);
    assert.match(html, /id="studyDailyXpText"/);
    assert.match(html, /id="studyHistoryDashboard"/);
    assert.match(html, /id="studyHistoryChart"/);
    assert.match(css, /\.study-history-chart/);
});
