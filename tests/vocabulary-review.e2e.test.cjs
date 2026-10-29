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
      document.querySelector('#view-lesson').classList.add('active');
      document.querySelector('#exerciseArea').innerHTML =
        window.renderTapTranslationSentence('Terima kasih', 'idn');
    });
    const tappedWord = page.locator('.tap-translation-word[data-vocab-id="v45"]');
    await tappedWord.waitFor();
    await tappedWord.click();
    await page.locator('#tapTranslationSave').waitFor({ state: 'visible' });
    await page.locator('#tapTranslationSave').evaluate(button => button.click());

    await page.waitForFunction(async () => {
      const item = await DB.get('srs', 'v45');
      return item && item.savedForReview === true;
    });

    await page.evaluate(async () => {
      const now = Date.now();
      await DB.set('srs', 'v46', {
        attempts: 5, correct: 1, incorrect: 4, interval: 1, repetition: 0,
        efactor: 1.8, nextReview: now - 86400000, lastReviewed: now - 2 * 86400000
      });
      await DB.set('srs', 'v60', {
        attempts: 2, correct: 1, incorrect: 1, interval: 1, repetition: 0,
        efactor: 2.3, nextReview: now - 10 * 86400000, lastReviewed: now - 11 * 86400000
      });
    });
    const due = await page.evaluate(() => SRSEngine.getDueItems());
    assert.ok(due.some(item => item.key === 'v45'), 'saved vocabulary should enter the existing SRS queue');
    assert.deepEqual(due.slice(0, 3).map(item => item.key), ['v45', 'v46', 'v60'],
      'manual saves come first, then words with more errors outrank older but easier cards');

    const backup = await page.evaluate(() => App.validateBackup({
      version: 3, xp: 0, completedUnits: [], customUnits: [], syllabusPos: 0,
      srs: [{ key: 'v45', val: {
        savedForReview: true, attempts: 0, correct: 0, incorrect: 0,
        interval: 0, repetition: 0, efactor: 2.5, nextReview: Date.now(), lastReviewed: null
      }}]
    }));
    assert.equal(backup.srs[0].val.savedForReview, true,
      'backup validation must preserve the saved-for-review marker');

    await page.evaluate(() => App.switchView('srs'));
    await page.evaluate(() => SRSEngine.startSession());
    await page.waitForFunction(() => SRSEngine.activeQueue.length === 3);
    assert.equal(await page.locator('#srsProgressText').innerText(), 'Tarjeta 1 de 3');
    const beforeExit = await page.evaluate(() => DB.get('srs', 'v45'));
    await page.getByRole('button', { name: 'Salir del repaso' }).click();
    assert.equal(await page.locator('#srsDashboard').isVisible(), true);
    assert.equal(await page.locator('#srsPracticeArea').isVisible(), false);
    assert.deepEqual(await page.evaluate(() => SRSEngine.getDueItems().then(items => items.map(item => item.key))), ['v45', 'v46', 'v60'],
      'leaving must not grade or remove unreviewed cards');
    assert.deepEqual(await page.evaluate(() => DB.get('srs', 'v45')), beforeExit,
      'leaving must preserve the current card scheduling data');

    await page.evaluate(() => SRSEngine.startSession());
    await page.waitForFunction(() => SRSEngine.activeQueue.length === 3);
    assert.equal(await page.locator('#srsProgressText').innerText(), 'Tarjeta 1 de 3');
    assert.equal(await page.locator('#srsDirectionText').innerText(), 'Indonesio → español');
    assert.equal(await page.locator('#srsPromptText').innerText(), 'Terima kasih');
    await page.locator('#srsRevealBtn').click();
    assert.match(await page.locator('#srsAnswerText').innerText(), /^Gracias/);

    await page.evaluate(() => {
      SRSEngine.currentIndex = 1;
      SRSEngine.renderCard();
    });
    assert.equal(await page.locator('#srsProgressText').innerText(), 'Tarjeta 2 de 3');
    assert.equal(await page.locator('#srsDirectionText').innerText(), 'Español → indonesio');
    assert.equal(await page.locator('#srsPromptText').innerText(), 'Comer');
    await page.locator('#srsRevealBtn').click();
    assert.match(await page.locator('#srsAnswerText').innerText(), /^Makan/);

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


test('review sessions respect the selected card limit or include all due vocabulary', async () => {
  const { server, url } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof SRSEngine !== 'undefined' && DB && DB.db);
    await page.evaluate(async () => {
      const now = Date.now();
      const words = SRSEngine.getA1Vocabulary().slice(0, 7);
      for (const word of words) {
        await DB.set('srs', word.id, {
          attempts: 1, correct: 0, incorrect: 1, interval: 1,
          repetition: 0, efactor: 2, nextReview: now - 1000,
          lastReviewed: now - 86400000
        });
      }
    });

    await page.evaluate(() => App.switchView('srs'));
    await page.locator('#srsSessionSize').selectOption('5');
    await page.evaluate(() => SRSEngine.startSession());
    await page.waitForFunction(() => SRSEngine.activeQueue.length === 5);
    assert.equal(await page.locator('#srsProgressText').innerText(), 'Tarjeta 1 de 5');

    await page.evaluate(() => SRSEngine.exitSession());
    await page.locator('#srsSessionSize').selectOption('0');
    await page.evaluate(() => SRSEngine.startSession());
    await page.waitForFunction(() => SRSEngine.activeQueue.length === 7);
    assert.equal(await page.locator('#srsProgressText').innerText(), 'Tarjeta 1 de 7');
  } finally {
    await context.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
