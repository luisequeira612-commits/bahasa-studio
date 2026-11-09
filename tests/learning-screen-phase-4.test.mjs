'use strict';

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');

function luminance(hex) {
  const channels = [0, 1, 2].map(index => {
    const value = parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

test('phase four section banner, chips and active tab preserve readable contrast', async () => {
  const css = await read('styles.css');
  assert.ok(contrast('#ffffff', '#285a78') >= 4.5, 'white banner text must meet AA');
  assert.ok(contrast('#f8fafc', '#334155') >= 4.5, 'dark-theme activity chips must meet AA');
  assert.ok(contrast('#0f172a', '#e2e8f0') >= 4.5, 'light-theme activity chips must meet AA');
  assert.ok(contrast('#ffffff', '#c92a40') >= 4.5, 'active tab icon pill must meet AA');
  assert.match(css, /\.unit-path-section-banner\s*\{[^}]*background:#285a78[^}]*color:#fff/s);
  assert.match(css, /\.nav-btn\.active svg\s*\{[^}]*background:var\(--brand-red\)[^}]*color:#fff/s);
});

test('the selected-level ring is derived from unit completion and does not persist progress', async () => {
  const html = await read('index.html');
  assert.match(html, /id="levelProgressRing"[^>]*aria-label="Progreso del nivel A1 seleccionado/);
  assert.match(html, /updateLevelProgressRing\(level, units\)/);
  assert.match(html, /units\.filter\(unit => getUnitProgressState\(level, unit\)\.completed\)/);
  assert.match(html, /this\.updateLevelProgressRing\(level, visibleUnits\)/);
  const method = html.slice(html.indexOf('updateLevelProgressRing(level, units)'), html.indexOf('renderCourseRoute() {', html.indexOf('updateLevelProgressRing(level, units)')));
  assert.doesNotMatch(method, /DB\.set|completedLessons\.push|completedUnits\.push/);
});

test('the current node ring is empty until lessons are completed and uses completedLessons counts', async () => {
  const html = await read('index.html');
  assert.match(html, /progress\.completedLessonCount \/ progress\.lessons\.length/);
  assert.match(html, /stroke-dashoffset="?' \+ dashOffset/);
  assert.match(html, /current-unit-start-bubble/);
  assert.match(html, /startBubble\.addEventListener\('click', \(\) => this\.openUnitSheet\(unit\.id\)\)/);
  assert.match(html, /node\.addEventListener\('click', \(\) => this\.openUnitSheet\(unit\.id\)\)/);
  assert.match(html, /currentTitle\.textContent = unit\.title/);
  assert.doesNotMatch(html.slice(html.indexOf('renderCourseRoute() {'), html.indexOf('async updateSrsView()')), /polyline|pathPoints/);
});

test('section banners are sticky, numbered, and report unit-range progress', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);
  assert.match(html, /Sección ' \+ sectionNumber/);
  assert.match(html, /unit-section-progress/);
  assert.match(css, /\.unit-path-section-banner\s*\{[^}]*position:sticky[^}]*top:118px[^}]*background:#285a78/s);
  assert.match(css, /\.unit-section-progress span\s*\{[^}]*background:#fff/);
});

test('closed learning tools leave no residual drawers and iconography is inline SVG', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);
  const header = html.slice(html.indexOf('<header class="app-topbar">'), html.indexOf('<!-- CURSO / RUTA -->'));
  const tools = html.slice(html.indexOf('<div class="learning-tools-row"'), html.indexOf('<details class="feature-drawer learning-tool-panel"'));
  const nav = html.slice(html.indexOf('<nav class="nav-bottom"'), html.indexOf('</nav>'));
  assert.doesNotMatch(header + tools + nav, /[🇮🇩🔥⚡✨📓💬🔒]/u);
  assert.match(tools, /<svg class="ui-icon"/);
  assert.match(nav, /<svg viewBox="0 0 24 24"/);
  assert.match(css, /\.learning-tool-panel:not\(\[open\]\)\s*\{\s*display:none;\s*\}/);
  assert.match(css, /\.ui-icon\s*\{[^}]*stroke-linecap:round[^}]*stroke-linejoin:round/s);
});

test('nodes, bubble and sheet have 44px targets and motion respects reduced-motion', async () => {
  const css = await read('styles.css');
  assert.match(css, /\.current-unit-start-bubble\s*\{[^}]*min-height:44px/s);
  assert.match(css, /\.learning-unit-node\s*\{[^}]*border-bottom:5px/);
  assert.match(css, /\.learning-unit-node:active\s*\{[^}]*translateY\(4px\)[^}]*border-bottom-width:2px/s);
  const reduced = css.slice(css.lastIndexOf('@media (prefers-reduced-motion:reduce)'));
  for (const selector of ['.current-unit-start-bubble', '.unit-bottom-sheet', '.unit-sheet-overlay', '.learning-unit-node.just-completed::after']) {
    assert.ok(reduced.includes(selector), selector + ' must disable motion');
  }
  const html = await read('index.html');
  assert.match(html, /unit-sheet-slide-out/);
  assert.match(html, /prefers-reduced-motion: reduce/);
});

test('phase four increments the offline cache without changing the storage schema', async () => {
  const [sw, html] = await Promise.all([read('service-worker.js'), read('index.html')]);
  assert.match(sw, /bahasa-studio-v3\.8\.73/);
  assert.doesNotMatch(html, /indexedDB\.deleteDatabase|deleteObjectStore/);
  assert.match(html, /version: 3/);
});
