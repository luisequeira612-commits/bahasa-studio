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
    if (!filename.startsWith(root + path.sep) && filename !== path.join(root, 'index.html')) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    fs.readFile(filename, (err, content) => {
      if (err) return res.writeHead(404).end('Not found');
      const ext = path.extname(filename);
      const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml' };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      res.end(content);
    });
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve({
      server,
      url: 'http://127.0.0.1:' + server.address().port + '/'
    }));
  });
}

test('phase four learning screen works at 360px, preserves controls, sticky sections and unit sheet', async () => {
  const { server, url } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 360, height: 800 },
    serviceWorkers: 'block',
    reducedMotion: 'no-preference'
  });
  const page = await context.newPage();
  const artifacts = path.join(root, 'artifacts', 'phase-4');
  fs.mkdirSync(artifacts, { recursive: true });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.waitForSelector('.learning-unit-node.node-current');

    assert.equal(await page.locator('.current-unit-start-bubble').count(), 1);
    assert.equal(await page.locator('.current-unit-title').count(), 1);
    assert.match(await page.locator('#levelProgressRing').getAttribute('aria-label'), /nivel A1 seleccionado/);
    assert.equal(await page.locator('.node-progress-value').getAttribute('stroke-dashoffset'), '179.07');
    assert.equal(await page.locator('.unit-path-section-banner h3').first().innerText(), 'Sección 1');

    await page.screenshot({ path: path.join(artifacts, 'learning-screen-360.png'), fullPage: true });
    await page.locator('.unit-path-stage').first().screenshot({ path: path.join(artifacts, 'current-node-bubble-and-ring.png') });

    for (const id of ['aiGeneratorDrawer', 'writingPracticeDrawer', 'conversationPracticeDrawer']) {
      const button = page.locator('[data-tool-target="' + id + '"]');
      await button.click();
      assert.equal(await button.getAttribute('aria-expanded'), 'true');
      assert.equal(await page.locator('#' + id).evaluate(el => el.open), true);
      assert.notEqual(await page.locator('#' + id).evaluate(el => getComputedStyle(el).display), 'none');
      await button.click();
      assert.equal(await button.getAttribute('aria-expanded'), 'false');
    }

    await page.locator('.current-unit-start-bubble').click();
    await page.waitForFunction(() => !document.getElementById('unitSheetOverlay').hidden);
    assert.match(await page.locator('#unitSheetTitle').innerText(), /.+/);
    await page.screenshot({ path: path.join(artifacts, 'unit-bottom-sheet.png') });
    await page.locator('.unit-sheet-close').click();
    await page.waitForFunction(() => document.getElementById('unitSheetOverlay').hidden, null, { timeout: 2000 });

    await page.evaluate(() => window.scrollTo(0, 480));
    await page.waitForTimeout(120);
    const stickyTop = await page.locator('.unit-path-section-banner').first().evaluate(el => el.getBoundingClientRect().top);
    assert.ok(stickyTop >= 108 && stickyTop <= 116, 'first section banner should stick below the top bar and level selector: ' + stickyTop);
    await page.screenshot({ path: path.join(artifacts, 'sticky-section-banner.png') });

    for (const [group, view] of [['review','srs'],['tutor','ai'],['profile','profile'],['learn','route']]) {
      await page.locator('.nav-btn[data-nav-group="' + group + '"]').click();
      assert.equal(await page.locator('.nav-btn.active').getAttribute('data-nav-group'), group);
      assert.equal(await page.locator('#view-' + view).evaluate(el => el.classList.contains('active')), true);
    }

    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.evaluate(() => {
      App.selectLearningLevel('B1');
      window.scrollTo(0, 0);
    });
    const renderMs = await page.evaluate(() => {
      const start = performance.now();
      App.renderCourseRoute();
      return performance.now() - start;
    });
    assert.ok(renderMs < 3000, 'B1 50-unit render exceeded 3 seconds under 4x CPU throttle: ' + renderMs.toFixed(1) + 'ms');

    const secondBanner = page.locator('.unit-path-section-banner').nth(1);
    const secondDocumentTop = await secondBanner.evaluate(el => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate(y => window.scrollTo(0, y - 112), secondDocumentTop);
    await page.waitForTimeout(120);
    const secondTop = await secondBanner.evaluate(el => el.getBoundingClientRect().top);
    assert.ok(secondTop >= 108 && secondTop <= 116, 'next section banner should replace the previous sticky banner: ' + secondTop);
    await page.screenshot({ path: path.join(artifacts, 'sticky-next-section-banner.png') });
    await cdp.detach();
  } finally {
    await context.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
