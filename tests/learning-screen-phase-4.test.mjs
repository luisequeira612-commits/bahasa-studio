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
  assert.ok(contrast('#ffffff', '#004E9A') >= 4.5, 'white banner text must meet AA on the Phase 5B blue banner');
  assert.ok(contrast('#f8fafc', '#334155') >= 4.5, 'dark-theme activity chips must meet AA');
  assert.ok(contrast('#0f172a', '#e2e8f0') >= 4.5, 'light-theme activity chips must meet AA');
  assert.ok(contrast('#004A91', '#E6F1FB') >= 4.5, 'active navigation pill text must meet AA on the Phase 5B blue tint');
  const html = await read('index.html');
  assert.match(html, /\.unit-path-section-banner\s*\{[^}]*background:#004E9A !important[^}]*color:#ffffff/s);
  assert.match(html, /background: active \? '#E6F1FB' : 'transparent'/);
  assert.match(html, /color: active \? '#004A91' : ''/);
  assert.match(html, /metrics\.style\.gap = compact && compact\.matches \? '4px' : '8px'/);
});

test('the selected-level ring is derived from unit completion and does not persist progress', async () => {
  const html = await read('index.html');
  assert.match(html, /id="learningLevelTrigger"[^>]*aria-label="Cambiar nivel\. A1 seleccionado/);
  const routeStart = html.indexOf('renderCourseRoute() {');
  const ringStart = html.indexOf('const levelProgressRing =', routeStart);
  const emptyStart = html.indexOf('if (!level || !level.units.length)', ringStart);
  const ringBlock = html.slice(ringStart, emptyStart);
  assert.ok(ringBlock.includes('visibleUnits.filter(unit => getUnitProgressState(level, unit).completed)'));
  assert.ok(ringBlock.includes("levelProgressRing.style.setProperty('--level-progress'"));
  assert.equal(ringBlock.includes('DB.set'), false);
  assert.equal(ringBlock.includes('completedLessons.push'), false);
  assert.equal(ringBlock.includes('completedUnits.push'), false);
});
 
test('the current node ring is empty until lessons are completed and uses completedLessons counts', async () => {
  const html = await read('index.html');
  assert.match(html, /progress\.completedLessonCount \/ progress\.lessons\.length/);
  assert.match(html, /stroke-dashoffset="?' \+ dashOffset/);
  assert.match(html, /current-unit-start-bubble/);
  assert.match(html, /startBubble\.addEventListener\('click', \(\) => this\.openUnitSheet\(unit\.id\)\)/);
  assert.match(html, /node\.addEventListener\('click', \(\) => this\.openUnitSheet\(unit\.id\)\)/);
  assert.ok(html.includes("currentTitle.textContent = String(unit.title || '').replace(/^Unidad\\s+\\d+\\s*:\\s*/i, '').trim();"));
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
  assert.equal((html.match(/class="learning-tools-row"/g) || []).length, 0, 'legacy tools row is removed in Phase 5B');
  const toolsSheet = html.slice(html.indexOf('id="learningToolsSheetOverlay"'), html.indexOf('id="unitSheetOverlay"'));
  assert.match(toolsSheet, /<svg class="ui-icon"/);
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
  assert.match(sw, /bahasa-studio-v3\.8\.87/);
  assert.match(html, /completedLessons: this\.completedLessons/);
  assert.match(html, /putSetting\('completedLessons', data\.completedLessons \|\| \[\]\)/);
});

test('phase four layout uses one spacing rule, a separated red progress ring and bounded title', async () => {
  const html = await read('index.html');
  const route = html.slice(html.indexOf('renderCourseRoute() {'), html.indexOf('async updateSrsView()'));
  assert.match(route, /stage\.style\.marginTop = '0px'/);
  assert.match(route, /const nodeStep = nodeDiameter \+ 18/);
  assert.match(route, /const currentTitleExtra = 38/);
  assert.match(route, /const currentBubbleClearance = 56/);
  assert.ok(route.includes('if (isCurrent && index > 0) nextNodeTop += currentBubbleClearance'));
  assert.match(route, /let nextNodeTop = nodeRadius \+ 24/);
  assert.ok(route.includes('nextNodeTop += currentBubbleClearance'));
  assert.match(route, /node\.style\.width = '56px'/);
  assert.match(route, /node\.style\.height = '56px'/);
  assert.match(route, /node\.style\.outline = 'none'/);
  assert.match(route, /const circumference = 207\.35/);
  assert.match(route, /cx="38" cy="38" r="33"/);
  assert.match(route, /stroke:#d1d5db/);
  assert.match(route, /stroke:#0067C6/);
  assert.match(route, /stroke-width:5/);
  assert.match(route, /top:calc\(50% \+ 2\.5px\)/);
  assert.match(route, /startBubble\.style\.top = \(nodeTop - 46\)/);
  assert.match(route, /startBubble\.style\.width = '106px'/);
  assert.match(route, /currentTitle\.style\.top = \(nodeTop \+ 38\)/);
  assert.match(route, /currentTitle\.style\.width = 'min\(106px, 34%\)'/);
  assert.match(route, /currentTitle\.style\.textOverflow = 'ellipsis'/);
  assert.ok(route.includes("currentTitle.style.whiteSpace = 'normal'"));
  assert.ok(route.includes("currentTitle.style.webkitLineClamp = '2'"));
  assert.ok(route.includes("currentTitle.style.maxHeight = '30px'"));
  assert.ok(html.includes('const targetTop = stickyTop + banner.getBoundingClientRect().height + 12'));
  assert.ok(html.includes("window.matchMedia('(prefers-reduced-motion: reduce)')"));
  const css = await read('styles.css');
  assert.match(css, /prefers-reduced-motion:reduce/);
});

test('topbar uses the approved Guardi mascot mark and flame SVG; navigation pill keeps one label baseline', async () => {
  const html = await read('index.html');
  const header = html.slice(html.indexOf('<header class="app-topbar">'), html.indexOf('<!-- CURSO / RUTA -->'));
  assert.match(header, /assets\/guardi\/guardi-mark\.svg/);
  assert.match(header, /class="brand-mark"/);
  assert.match(header, /width="32" height="34"/);
  assert.match(header, /M12 22c-4\.1 0-7-2\.8/);
  assert.match(html, /nav-pill-content/);
  assert.match(html, /background: active \? '#E6F1FB' : 'transparent'/);
  assert.match(html, /color: active \? '#004A91' : ''/);
  assert.match(html, /height: '100%'/);
  assert.match(html, /padding: '0'/);
  assert.match(html, /metrics\.style\.gap = compact && compact\.matches \? '4px' : '8px'/);
});


test('bottom sheet uses a gray lesson track, light surface and safe-area padding', async () => {
  const html = await read('index.html');
  assert.match(html, /unit-sheet-lesson-track/);
  assert.match(html, /background:#8b8b8b/);
  assert.match(html, /background:#0067C6/);
  assert.match(html, /height:8px;min-height:8px/);
  assert.ok(html.includes("sheet.style.backgroundColor = '#ffffff'"));
  assert.ok(html.includes("sheet.style.borderTop = '1px solid #d1d5db'"));
  assert.match(html, /safe-area-inset-bottom/);
  assert.ok(html.includes("element.style.color = '#4b5563'"));
  assert.ok(contrast('#1f2937', '#ffffff') >= 4.5);
  assert.ok(contrast('#4b5563', '#ffffff') >= 4.5);
  assert.ok(contrast('#8b8b8b', '#ffffff') >= 3, 'gray progress track must meet 3:1 graphic contrast');
});