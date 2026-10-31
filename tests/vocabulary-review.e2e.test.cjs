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
    await page.waitForFunction(() => typeof SRSEngine !== 'undefined' && DB && DB.db && document.querySelector('#tapTranslationBubble')?.dataset.initialized === 'true');

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


test('rapid repeated grading records a vocabulary card only once', async () => {
  const { server, url } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof SRSEngine !== 'undefined' && DB && DB.db);
    await page.evaluate(async () => {
      const now = Date.now();
      const words = SRSEngine.getA1Vocabulary().slice(0, 2);
      for (const word of words) {
        await DB.set('srs', word.id, {
          attempts: 1, correct: 0, incorrect: 1, interval: 1,
          repetition: 0, efactor: 2, nextReview: now - 1000,
          lastReviewed: now - 86400000
        });
      }
    });

    const xpBefore = await page.evaluate(() => App.xp);
    await page.evaluate(() => App.switchView('srs'));
    await page.evaluate(() => SRSEngine.startSession());
    await page.waitForFunction(() => SRSEngine.activeQueue.length === 2);
    await page.locator('#srsRevealBtn').click();

    const result = await page.evaluate(async () => {
      const originalRecordAttempt = SRSEngine.recordAttempt.bind(SRSEngine);
      let calls = 0;
      SRSEngine.recordAttempt = async (...args) => {
        calls++;
        await new Promise(resolve => setTimeout(resolve, 80));
        return originalRecordAttempt(...args);
      };
      await Promise.all([SRSEngine.submitGrade(5), SRSEngine.submitGrade(1)]);
      return {
        calls,
        currentIndex: SRSEngine.currentIndex,
        correct: SRSEngine.sessionStats.correct,
        incorrect: SRSEngine.sessionStats.incorrect,
        isGrading: SRSEngine.isGrading
      };
    });

    assert.equal(result.calls, 1, 'only the first grade should be persisted');
    assert.equal(result.currentIndex, 1, 'the session should advance by one card');
    assert.equal(result.correct, 1);
    assert.equal(result.incorrect, 0);
    assert.equal(result.isGrading, false, 'the grading lock should release after persistence');
    const reviewed = await page.evaluate(wordId => DB.get('srs', wordId),
      await page.evaluate(() => SRSEngine.activeQueue[0].vocab.id));
    assert.equal(reviewed.attempts, 2, 'the stored attempt counter should increase only once');
    await page.waitForFunction(async () => {
      const activity = await DB.get('settings', 'studyActivity');
      return activity && activity.todayXp === 5 && activity.todayReviews === 1;
    });
    assert.equal(await page.evaluate(() => App.xp), xpBefore + 5,
      'a successfully reviewed card should contribute five daily-goal XP');
  } finally {
    await context.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('failed grade persistence keeps the current card and allows retry', async () => {
  const { server, url } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof SRSEngine !== 'undefined' && DB && DB.db);
    await page.evaluate(async () => {
      const now = Date.now();
      const word = SRSEngine.getA1Vocabulary()[0];
      await DB.set('srs', word.id, {
        attempts: 1, correct: 0, incorrect: 1, interval: 1,
        repetition: 0, efactor: 2, nextReview: now - 1000,
        lastReviewed: now - 86400000
      });
    });

    await page.evaluate(() => App.switchView('srs'));
    await page.evaluate(() => SRSEngine.startSession());
    await page.waitForFunction(() => SRSEngine.activeQueue.length === 1);
    await page.locator('#srsRevealBtn').click();

    const failure = await page.evaluate(async () => {
      const original = SRSEngine.recordAttempt.bind(SRSEngine);
      SRSEngine.recordAttempt = async () => { throw new Error('simulated storage failure'); };
      await SRSEngine.submitGrade(5);
      const state = {
        index: SRSEngine.currentIndex,
        correct: SRSEngine.sessionStats.correct,
        incorrect: SRSEngine.sessionStats.incorrect,
        isGrading: SRSEngine.isGrading,
        feedback: document.getElementById('srsGradeError').textContent
      };
      SRSEngine.recordAttempt = original;
      return state;
    });

    assert.equal(failure.index, 0, 'failed persistence must not advance the queue');
    assert.equal(failure.correct, 0);
    assert.equal(failure.incorrect, 0);
    assert.equal(failure.isGrading, false, 'the lock must release after failure');
    assert.match(failure.feedback, /No se pudo guardar/);
    assert.equal(await page.locator('#srsPracticeArea').isVisible(), true);

    await page.evaluate(() => SRSEngine.submitGrade(5));
    assert.equal(await page.locator('#srsDashboard').isVisible(), true,
      'the same card should be reviewable after a successful retry');
    assert.equal(await page.locator('#srsGradeError').innerText(), '',
      'successful retry should clear the error message');
  } finally {
    await context.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('SRS dashboard distinguishes course vocabulary from words with review progress', async () => {
  const { server, url } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof SRSEngine !== 'undefined' && DB && DB.db);
    await page.evaluate(async () => {
      const word = SRSEngine.getA1Vocabulary()[0];
      await DB.set('srs', word.id, {
        attempts: 1, correct: 1, incorrect: 0, interval: 1,
        repetition: 1, efactor: 2.6, nextReview: Date.now() + 86400000,
        lastReviewed: Date.now(), savedForReview: false
      });
      await App.updateSrsView();
    });

    assert.equal(await page.locator('#statTotalVocab').innerText(),
      String(await page.evaluate(() => getUniqueLearningVocabulary().length)),
      'available vocabulary should represent the course vocabulary');
    assert.equal(await page.locator('#statTrackedVocab').innerText(), '1',
      'tracked vocabulary should count words with SRS records');
    assert.match(await page.locator('#statTotalVocab').locator('xpath=..').innerText(),
      /Vocabulario disponible/);
    assert.match(await page.locator('#statTrackedVocab').locator('xpath=..').innerText(),
      /Palabras con seguimiento/);
  } finally {
    await context.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
