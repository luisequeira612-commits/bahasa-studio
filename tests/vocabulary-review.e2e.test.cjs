'use strict';

const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
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
      if (err) {
        res.writeHead(404).end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': path.extname(filename) === '.html' ? 'text/html; charset=utf-8' : 'application/octet-stream' });
      res.end(content);
    });
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${server.address().port}/` }));
  });
}

test('a tapped vocabulary item can be saved, reviewed, and retained in backups', async () => {
  const { server, url } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof SRSEngine !== 'undefined' && DB && DB.db);

    await page.evaluate(() => {
      document.querySelector('#exerciseArea').innerHTML =
        window.renderTapTranslationSentence('Terima kasih', 'idn');
    });
    const tappedWord = page.locator('.tap-translation-word[data-vocab-id="v45"]');
    await tappedWord.waitFor();
    await tappedWord.click();
    await page.locator('#tapTranslationSave').waitFor({ state: 'visible' });
    await page.locator('#tapTranslationSave').click();

    await page.waitForFunction(async () => {
      const item = await DB.get('srs', 'v45');
      return item && item.savedForReview === true;
    });

    const due = await page.evaluate(() => SRSEngine.getDueItems());
    assert.ok(due.some(item => item.key === 'v45'), 'saved vocabulary should enter the existing SRS queue');

    const backup = await page.evaluate(() => App.validateBackup({
      version: 3, xp: 0, completedUnits: [], customUnits: [], syllabusPos: 0,
      srs: [{ key: 'v45', val: {
        savedForReview: true, attempts: 0, correct: 0, incorrect: 0,
        interval: 0, repetition: 0, efactor: 2.5, nextReview: Date.now(), lastReviewed: null
      }}]
    }));
    assert.equal(backup.srs[0].val.savedForReview, true,
      'backup validation must preserve the saved-for-review marker');

    await page.evaluate(() => SRSEngine.recordAttempt('v45', 5));
    const reviewed = await page.evaluate(() => DB.get('srs', 'v45'));
    assert.equal(reviewed.savedForReview, false, 'grading a card should return it to normal SM-2 scheduling');
    const afterReview = await page.evaluate(() => SRSEngine.getDueItems());
    assert.ok(!afterReview.some(item => item.key === 'v45'),
      'a correctly reviewed card should follow its next scheduled review date');
  } finally {
    await context.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
