'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { test } = require('node:test');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');

function startServer() {
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://127.0.0.1').pathname;
    const requested = pathname === '/' ? 'index.html' : decodeURIComponent(pathname.slice(1));
    const filename = path.resolve(root, requested);
    if (!filename.startsWith(root + path.sep)) return res.writeHead(403).end();
    fs.readFile(filename, (err, content) => {
      if (err) return res.writeHead(404).end();
      const ext = path.extname(filename);
      const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml' };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      res.end(content);
    });
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve({ server, url: 'http://127.0.0.1:' + server.address().port + '/' }));
  });
}

test('phase 5B learning screen is compact, blue and preserves all level/tool entry points', async () => {
  const { server, url } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block', reducedMotion: 'reduce' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.waitForSelector('.learning-unit-node.node-current');

    assert.equal(await page.locator('#learningLevelSelector').count(), 0, 'legacy level selector should be removed from the compact Phase 5B DOM');
    assert.equal(await page.locator('.learning-tools-row').count(), 0, 'legacy tools row should be removed from the compact Phase 5B DOM');
    assert.equal(await page.locator('.level-progress-trigger').getAttribute('aria-haspopup'), 'dialog');
    assert.ok((await page.locator('.level-progress-trigger').boundingBox()).height >= 44);
    const toolTriggers = page.locator('.unit-tools-trigger');
    assert.equal(await toolTriggers.count(), await page.locator('.unit-path-section-banner').count(), 'each section banner should expose its own tools trigger');
    for (const trigger of await toolTriggers.all()) assert.ok((await trigger.boundingBox()).height >= 44);

    const banner = page.locator('.unit-path-section-banner').first();
    const current = page.locator('.learning-unit-node.node-current').first();
    const before = await current.boundingBox();
    const bannerBox = await banner.boundingBox();
    assert.ok(before.y < 0.35 * 740, 'first current node should begin above 35% of viewport: ' + before.y);
    assert.ok(bannerBox.height <= 72, 'section banner must stay within 72px');

    const levelRows = page.locator('.learning-level-sheet-row');
    await page.locator('.level-progress-trigger').click();
    await page.waitForSelector('#learningLevelSheetOverlay:not([hidden])');
    assert.equal(await levelRows.count(), 4);
    for (let i = 0; i < 4; i++) assert.ok((await levelRows.nth(i).boundingBox()).height >= 44);
    assert.ok((await page.locator('.learning-level-sheet-row.selected').count()) === 1);
    const a2Progress = await page.locator('.learning-level-sheet-row').nth(1).locator('small').innerText();
    assert.match(a2Progress, /^\d+ de 40 unidades$/);
    await page.locator('.learning-level-sheet-row').nth(1).click();
    await page.waitForFunction(() => document.getElementById('learningLevelSheetOverlay').hidden);
    await page.waitForSelector('.learning-unit-node');
    assert.equal(await page.locator('#levelProgressLevel').innerText(), 'A2', 'the compact selector should switch the selected level to A2');

    await page.locator('.unit-tools-trigger').first().click();
    await page.waitForSelector('#learningToolsSheetOverlay:not([hidden])');
    assert.equal(await page.locator('.learning-tool-sheet-row').count(), 3);
    for (const row of await page.locator('.learning-tool-sheet-row').all()) assert.ok((await row.boundingBox()).height >= 44);
    await page.locator('.learning-tool-sheet-row').nth(1).click();
    await page.waitForFunction(() => document.getElementById('learningToolsSheetOverlay').hidden);
    await page.waitForFunction(() => document.getElementById('writingPracticeDrawer').open);
    assert.equal(await page.locator('#writingPracticeDrawer').evaluate(el => el.open), true);
    await page.locator('#writingPracticeDrawer').evaluate(el => el.open = false);

    const colors = await page.evaluate(() => ({
      brand: getComputedStyle(document.documentElement).getPropertyValue('--brand-red').trim(),
      current: getComputedStyle(document.querySelector('.learning-unit-node.node-current')).backgroundColor,
      completed: (() => {
        const node = document.createElement('div');
        node.className = 'learning-unit-node node-completed';
        document.body.appendChild(node);
        const color = getComputedStyle(node).backgroundColor;
        node.remove();
        return color;
      })(),
      banner: getComputedStyle(document.querySelector('.unit-path-section-banner')).backgroundColor,
      lessonProgress: getComputedStyle(document.querySelector('#view-lesson .progress-fill')).backgroundColor
    }));
    assert.equal(colors.brand, '#0067C6');
    assert.ok(colors.current.includes('0, 103, 198'));
    assert.ok(colors.completed.includes('0, 78, 154'));
    assert.ok(colors.banner.includes('0, 78, 154'));

    const speakerCount = await page.locator('.lesson-speaker-icon').count();
    assert.ok(speakerCount >= 2, 'lesson speaker controls should use inline SVG icons');
    assert.equal(await page.locator('text=🔊').count(), 0);
    assert.equal(await page.locator('.nav-btn.active').getAttribute('data-nav-group'), 'learn');
  } finally {
    await context.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
