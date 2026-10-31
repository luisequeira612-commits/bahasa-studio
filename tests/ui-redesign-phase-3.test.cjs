'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

test('all buttons have at least 48px touch height and a press-down border treatment', () => {
    assert.match(css, /button\s*\{[\s\S]*?min-height:48px/);
    assert.match(css, /button\s*\{[\s\S]*?border-bottom-width:4px/);
    assert.match(css, /button:active\s*\{[\s\S]*?transform:translateY\(2px\)/);
    assert.match(css, /button:active\s*\{[\s\S]*?border-bottom-width:2px/);
    assert.match(css, /\.btn-sm\s*\{\s*min-height:48px/);
    assert.match(css, /\.nav-btn\s*\{\s*min-height:48px/);
});

test('short lesson viewports do not reduce answer targets below 48px', () => {
    const compactViewport = css.split('@media (max-height:620px) {')[1]?.split('\n}')[0] || '';
    assert.ok(compactViewport, 'compact viewport rules exist');
    assert.ok(
        compactViewport.includes('.option-btn { min-height:48px'),
        'answer options remain at least 48px tall on short viewports'
    );
});

test('light and dark themes use the same requested red accent', () => {
    assert.match(css, /:root, \.light-mode\s*\{[^}]*--bg-primary:#ffffff[^}]*--accent:#e8384f/);
    assert.match(css, /\.dark-mode\s*\{[^}]*--accent:#e8384f/);
    assert.doesNotMatch(css, /--accent:#ff5a6e/);
    assert.match(html, /toggleTheme\(\)/);
    assert.match(html, /localStorage\.setItem\('bs_dark'/);
});

test('exercise feedback vibrates briefly only when the browser supports the API', () => {
    assert.match(html, /vibrateFeedback\(\)\s*\{[\s\S]*?typeof navigator\.vibrate !== 'function'[\s\S]*?navigator\.vibrate\(24\)/);
    assert.match(html, /this\.vibrateFeedback\(\)/);
    assert.match(html, /try \{ navigator\.vibrate\(24\); \} catch/);
});

test('visual motion is CSS-only and respects reduced-motion preferences', () => {
    assert.match(css, /@keyframes lessonSheetEnter/);
    assert.match(css, /@keyframes lessonResultEnter/);
    assert.match(css, /@media \(prefers-reduced-motion:reduce\)/);
    assert.doesNotMatch(html, /gsap|lottie|anime\.js/i);
});
