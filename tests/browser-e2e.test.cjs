const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { test, before, after } = require('node:test');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
let browser;

before(async () => {
  browser = await chromium.launch({ headless: true });
});

after(async () => {
  if (browser) await browser.close();
});

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
      const ext = path.extname(filename);
      const types = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.svg': 'image/svg+xml'
      };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      res.end(content);
    });
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve({ server, url: `http://127.0.0.1:${address.port}/` });
    });
  });
}

test('real Chromium preserves progress on reload and safely imports valid/invalid backups', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  const dialogs = [];
  page.on('dialog', async dialog => {
    dialogs.push({ type: dialog.type(), message: dialog.message() });
    await dialog.accept();
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);

    await page.evaluate(async () => {
      await DB.set('settings', 'userXp', 12);
      await DB.set('settings', 'completedUnits', ['a1_u1']);
      await DB.set('srs', 'v27', {
        attempts: 3, correct: 2, incorrect: 1, interval: 6, repetition: 2,
        efactor: 2.5, nextReview: Date.now() + 86400000, lastReviewed: Date.now()
      });
      await DB.set('srs', 'v49', {
        attempts: 1, correct: 1, incorrect: 0, interval: 1, repetition: 1,
        efactor: 2.5, nextReview: Date.now() + 86400000, lastReviewed: Date.now()
      });
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => App.xp === 12 && App.completedUnits.includes('a1_u1'));
    assert.equal(await page.evaluate(() => DB.get('settings', 'userXp')), 12);
    assert.deepEqual(await page.evaluate(() => DB.get('settings', 'completedUnits')), ['a1_u1']);
    assert.equal((await page.evaluate(() => DB.get('srs', 'v27'))).attempts, 3);

    const validBackup = {
      version: 3,
      xp: 77,
      completedUnits: ['a1_u2'],
      completedLessons: ['a1_u2::lesson-0'],
      customUnits: [],
      syllabusPos: 0,
      studyActivity: {
        dailyGoal: 50, todayDate: new Date().toISOString().slice(0, 10), todayXp: 25,
        todayLessons: 1, todayReviews: 3, lastStudyDate: new Date().toISOString().slice(0, 10),
        currentStreak: 4, longestStreak: 7
      },
      srs: [{
        key: 'v27',
        val: {
          attempts: 9, correct: 8, incorrect: 1, interval: 6, repetition: 2,
          efactor: 2.5, nextReview: Date.now() + 86400000, lastReviewed: Date.now(),
          savedForReview: true
        }
      }]
    };
    const navigation = page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await page.locator('#importFile').setInputFiles({
      name: 'valid-backup.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(validBackup))
    });
    await navigation;
    await page.waitForFunction(() => App.xp === 77 && App.completedUnits.includes('a1_u2'));
    assert.equal(await page.evaluate(() => DB.get('settings', 'userXp')), 77);
    assert.deepEqual(await page.evaluate(() => DB.get('settings', 'completedUnits')), ['a1_u2']);
    assert.equal((await page.evaluate(() => DB.get('settings', 'studyActivity'))).dailyGoal, 50,
      'backup restoration should preserve the daily XP goal');
    assert.equal((await page.evaluate(() => DB.get('settings', 'studyActivity'))).todayXp, 25,
      'backup restoration should preserve daily XP progress');
    const restoredSrs = await page.evaluate(() => DB.get('srs', 'v27'));
    assert.equal(restoredSrs.attempts, 9);
    assert.equal(restoredSrs.savedForReview, true,
      'restoring a backup must preserve the manual saved-for-review marker');
    assert.equal(await page.evaluate(() => DB.get('srs', 'v49')), null,
      'successful restore should replace old SRS records rather than leave stale entries');

    const beforeAbort = await page.evaluate(async () => ({
      xp: await DB.get('settings', 'userXp'),
      completed: await DB.get('settings', 'completedUnits'),
      studyActivity: await DB.get('settings', 'studyActivity'),
      srs: await DB.get('srs', 'v27')
    }));
    const abortResult = await page.evaluate(async () => {
      const database = DB.db;
      const realTransaction = database.transaction.bind(database);
      database.transaction = function (...args) {
        const tx = realTransaction(...args);
        if (Array.isArray(args[0]) && args[0].includes('srs') && args[0].includes('settings')) {
          const objectStore = tx.objectStore.bind(tx);
          tx.objectStore = function (name) {
            const store = objectStore(name);
            if (name === 'settings') queueMicrotask(() => {
              try { tx.abort(); } catch (_) {}
            });
            return store;
          };
        }
        return tx;
      };
      try {
        await DB.replaceBackupData({
          version: 3, xp: 88, completedUnits: ['a1_u3'], customUnits: [],
          syllabusPos: 0,
          srs: [{ key: 'v27', val: {
            attempts: 12, correct: 11, incorrect: 1, interval: 10, repetition: 3,
            efactor: 2.5, nextReview: Date.now() + 86400000, lastReviewed: Date.now()
          }}]
        });
        return { rejected: false };
      } catch (error) {
        return { rejected: true, message: String(error && error.message || error) };
      } finally {
        database.transaction = realTransaction;
      }
    });
    assert.equal(abortResult.rejected, true, 'real IndexedDB transaction abort must reject restoration');
    const afterAbort = await page.evaluate(async () => ({
      xp: await DB.get('settings', 'userXp'),
      completed: await DB.get('settings', 'completedUnits'),
      studyActivity: await DB.get('settings', 'studyActivity'),
      srs: await DB.get('srs', 'v27')
    }));
    assert.deepEqual(afterAbort, beforeAbort,
      'real IndexedDB abort must roll back both settings and SRS changes');

    const previousState = await page.evaluate(async () => ({
      xp: await DB.get('settings', 'userXp'),
      completed: await DB.get('settings', 'completedUnits'),
      studyActivity: await DB.get('settings', 'studyActivity'),
      srs: await DB.get('srs', 'v27')
    }));
    const dialogCountBeforeInvalidImport = dialogs.length;
    await page.locator('#importFile').setInputFiles({
      name: 'invalid-backup.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify({ version: 2, xp: 1 }))
    });
    await page.waitForFunction(() => document.querySelector('#importFile').value === '');
    assert.match(dialogs.slice(dialogCountBeforeInvalidImport).map(item => item.message).join(' '), /Error/i);
    const afterInvalid = await page.evaluate(async () => ({
      xp: await DB.get('settings', 'userXp'),
      completed: await DB.get('settings', 'completedUnits'),
      studyActivity: await DB.get('settings', 'studyActivity'),
      srs: await DB.get('srs', 'v27')
    }));
    assert.deepEqual(afterInvalid, previousState,
      'invalid import must not modify settings or SRS progress');
    assert.ok(dialogs.some(item => item.message.includes('restaurar esta copia')),
      'valid import should have asked for confirmation');
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('audio engine sends Indonesian speech utterances to the browser voice API', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__spokenUtterances = [];
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        cancel() {},
        getVoices() { return [{ lang: 'id-ID', name: 'Mock Indonesian' }]; },
        speak(utterance) {
          window.__spokenUtterances.push({
            text: utterance.text,
            lang: utterance.lang,
            rate: utterance.rate,
            voice: utterance.voice ? utterance.voice.name : null
          });
        },
        onvoiceschanged: null
      }
    });
    window.SpeechSynthesisUtterance = function (text) { this.text = text; };
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof AudioEngine !== 'undefined');
    await page.evaluate(() => {
      AudioEngine.init();
      AudioEngine.speak('Selamat pagi');
    });
    const utterances = await page.evaluate(() => window.__spokenUtterances);
    assert.equal(utterances.length, 1);
    assert.equal(utterances[0].text, 'Selamat pagi');
    assert.equal(utterances[0].lang, 'id-ID');
    assert.equal(utterances[0].rate, 0.85);
    assert.equal(utterances[0].voice, 'Mock Indonesian');
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('tap-to-translate shows a vocabulary meaning and example in the lesson', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.evaluate(() => LessonEngine.startUnitById('a1_u1'));
    await page.locator('#exerciseArea .card strong').first().waitFor();
    await page.locator('#exerciseArea .card strong').first().click();

    await page.locator('#wordMeaningPopup:not([hidden])').waitFor();
    assert.equal(await page.locator('#wordMeaningTerm').innerText(), 'Saya');
    assert.equal(await page.locator('#wordMeaningText').innerText(), 'Yo');
    assert.match(await page.locator('#wordMeaningExample').innerText(), /Saya makan\./);
    assert.match(await page.locator('#wordMeaningExample').innerText(), /Yo como\./);

    // The close control dismisses a known word's meaning.
    await page.locator('#wordMeaningClose').click();
    await page.waitForFunction(() => document.querySelector('#wordMeaningPopup')?.hidden === true);

    // Reopen a known word, then ensure an unknown word dismisses stale meaning.
    await page.locator('#exerciseArea .card strong').first().click();
    await page.locator('#wordMeaningPopup:not([hidden])').waitFor();
    await page.evaluate(() => {
      const target = document.querySelector('#exerciseArea .card');
      const unknown = document.createElement('span');
      unknown.id = 'unknownTapTranslationWord';
      unknown.textContent = 'zqvnotaword';
      target.append(' ', unknown);
    });
    await page.locator('#unknownTapTranslationWord').click();
    await page.waitForFunction(() => document.querySelector('#wordMeaningPopup')?.hidden === true);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('lesson translation hints are tappable, contextual, and stay within a mobile viewport', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({
    serviceWorkers: 'block',
    viewport: { width: 320, height: 720 },
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);

    await page.evaluate(() => {
      const vocabulary = getUniqueLearningVocabulary();
      const greeting = vocabulary.find(word => word.id === 'v14');
      const pronoun = vocabulary.find(word => word.id === 'v2');
      LessonEngine.startUnit({
        id: 'tap-translation-test',
        title: 'Prueba de ayuda al toque',
        grammar: 'Prueba automatizada.',
        vocab: [greeting, pronoun].filter(Boolean),
        exercises: [{
          vocabId: 'v14',
          type: 'translate_es_id',
          prompt: 'Traduce al indonesio: «Encantado/a de conocerte»',
          answer: 'Senang bertemu denganmu',
          explanation: 'Prueba de expresión completa.'
        }, {
          vocabId: 'v2',
          type: 'translate_es_id',
          prompt: 'Traduce: «tú»',
          answer: 'Kamu',
          explanation: 'Prueba de palabra individual.'
        }, {
          vocabId: 'v14',
          type: 'translate_es_id',
          prompt: 'Traduce: setenta',
          answer: 'Tujuh puluh',
          explanation: 'La equivalencia existe en un ejercicio del curso.'
        }]
      });
    });
    await page.getByRole('button', { name: 'Comenzar' }).click();

    const phrase = page.getByRole('button', { name: 'Ver traducción de Encantado/a de conocerte' });
    await phrase.waitFor();
    await phrase.tap();
    const bubble = page.locator('#tapTranslationBubble');
    await bubble.waitFor({ state: 'visible' });
    assert.equal(await page.locator('#tapTranslationText').innerText(), 'Senang bertemu denganmu');

    const geometry = await page.evaluate(() => {
      const el = document.querySelector('#tapTranslationBubble');
      const rect = el.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom,
        width: window.innerWidth, height: window.innerHeight };
    });
    assert.ok(geometry.left >= 0 && geometry.right <= geometry.width,
      'translation bubble must remain horizontally inside the viewport');
    assert.ok(geometry.top >= 0 && geometry.bottom <= geometry.height,
      'translation bubble must remain vertically inside the viewport');

    // Exercise the difficult case where the tapped phrase sits at the bottom edge.
    await phrase.tap();
    await page.waitForFunction(() => document.querySelector('#tapTranslationBubble').hidden);
    await page.evaluate(() => {
      const button = document.querySelector('.tap-translation-word');
      button.style.position = 'fixed';
      button.style.left = '100px';
      button.style.bottom = '0px';
      button.style.zIndex = '1300';
    });
    await phrase.tap();
    await bubble.waitFor({ state: 'visible' });
    const edgeGeometry = await page.evaluate(() => {
      const rect = document.querySelector('#tapTranslationBubble').getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom, height: window.innerHeight };
    });
    assert.ok(edgeGeometry.top >= 0 && edgeGeometry.bottom <= edgeGeometry.height,
      'translation bubble must stay inside the viewport even when the word is at the bottom edge');
    await page.evaluate(() => {
      const button = document.querySelector('.tap-translation-word');
      button.style.position = '';
      button.style.left = '';
      button.style.bottom = '';
      button.style.zIndex = '';
    });

    await phrase.tap();
    await page.waitForFunction(() => document.querySelector('#tapTranslationBubble').hidden);
    await phrase.tap();
    await bubble.waitFor({ state: 'visible' });
    await page.locator('#textAnswer').tap();
    await page.locator('#textAnswer').fill('Senang bertemu denganmu');
    await page.waitForFunction(() => document.querySelector('#tapTranslationBubble').hidden);
    assert.equal(await page.locator('#textAnswer').inputValue(), 'Senang bertemu denganmu',
      'the hint must not interfere with typing the answer');

    await page.evaluate(() => { LessonEngine.stepIndex = 1; LessonEngine.renderStep(); });
    const pronoun = page.getByRole('button', { name: 'Ver traducción de tú' });
    await pronoun.tap();
    await bubble.waitFor({ state: 'visible' });
    assert.equal(await page.locator('#tapTranslationText').innerText(), 'Kamu',
      'the current lesson vocabulary should disambiguate a short translation');

    await page.evaluate(() => { LessonEngine.stepIndex = 2; LessonEngine.renderStep(); });
    const numberPhrase = page.getByRole('button', { name: 'Ver traducción de setenta' });
    await numberPhrase.tap();
    await bubble.waitFor({ state: 'visible' });
    assert.equal(await page.locator('#tapTranslationText').innerText(), 'Tujuh puluh',
      'a full phrase may reuse the answer already authored in a course exercise');

    await page.evaluate(() => {
      const dia = getUniqueLearningVocabulary().find(word => word.id === 'v3');
      LessonEngine.startUnit({
        id: 'tap-translation-id-test',
        title: 'Prueba de ayuda al toque en indonesio',
        grammar: 'Prueba automatizada.',
        vocab: [dia].filter(Boolean),
        exercises: [{
          vocabId: 'v3',
          type: 'mc',
          prompt: '¿Qué significa «dia»?',
          options: ['Yo', 'Tú', 'Él / ella'],
          answer: 2,
          explanation: 'Dia puede significar él o ella.'
        }]
      });
    });
    await page.getByRole('button', { name: 'Comenzar' }).click();
    const indonesianWord = page.getByRole('button', { name: 'Ver traducción de dia' });
    await indonesianWord.tap();
    await bubble.waitFor({ state: 'visible' });
    assert.equal(await page.locator('#tapTranslationText').innerText(), 'Él / ella');
    assert.equal(await page.locator('.tap-translation-speaker').count(), 1,
      'Indonesian prompts retain a touch-friendly audio control');

    // Keyboard users can activate a word and dismiss its hint with Escape.
    // Close the touch-opened bubble first so Enter opens it rather than toggling it closed.
    await indonesianWord.tap();
    await page.waitForFunction(() => document.querySelector('#tapTranslationBubble').hidden);
    await indonesianWord.focus();
    await page.keyboard.press('Enter');
    await bubble.waitFor({ state: 'visible' });
    assert.equal(await page.locator('#tapTranslationText').innerText(), 'Él / ella');
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.querySelector('#tapTranslationBubble').hidden);

    await indonesianWord.tap();
    await bubble.waitFor({ state: 'visible' });
    await page.locator('#actionArea').tap();
    await page.waitForFunction(() => document.querySelector('#tapTranslationBubble').hidden);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('service worker serves the app after the network is disconnected', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => 'serviceWorker' in navigator);
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });
    await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller), { timeout: 10000 });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined');

    await context.setOffline(true);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined');
    assert.match(await page.title(), /Bahasa Studio 3\.8\.8/);
    assert.equal(await page.locator('body').isVisible(), true);
    assert.equal(await page.evaluate(() => typeof ConversationEngine !== 'undefined' && typeof StudyActivity !== 'undefined'), true,
      'the conversation and study activity modules must be available from the service-worker cache offline');
    const offlineStyles = await page.evaluate(() => {
      const stylesheet = document.querySelector('link[rel="stylesheet"][href="./styles.css"]');
      return {
        loaded: Boolean(stylesheet && stylesheet.sheet),
        fontFamily: getComputedStyle(document.body).fontFamily,
        backgroundColor: getComputedStyle(document.body).backgroundColor
      };
    });
    assert.equal(offlineStyles.loaded, true,
      'the extracted stylesheet must remain loaded after an offline navigation');
    assert.match(offlineStyles.fontFamily, /system-ui/,
      'the body font rule from styles.css must be applied offline');
    assert.equal(offlineStyles.backgroundColor, 'rgb(255, 255, 255)',
      'the active red-and-white theme background from styles.css must be applied offline');
  } finally {
    await context.setOffline(false);
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('vocabulary mastery percentage uses unique words and requires four successful spaced reviews', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof SRSEngine !== 'undefined' && DB && DB.db);
    const sample = await page.evaluate(() => getUniqueLearningVocabulary().slice(0, 3).map(word => word.id));
    await page.evaluate(async ids => {
      const now = Date.now();
      await DB.set('srs', ids[0], {
        attempts: 4, correct: 4, incorrect: 0, interval: 30, repetition: 4,
        efactor: 2.5, nextReview: now + 86400000, lastReviewed: now
      });
      await DB.set('srs', ids[1], {
        attempts: 4, correct: 4, incorrect: 0, interval: 30, repetition: 4,
        efactor: 2.5, nextReview: now + 86400000, lastReviewed: now
      });
      await DB.set('srs', ids[2], {
        attempts: 3, correct: 3, incorrect: 0, interval: 6, repetition: 3,
        efactor: 2.5, nextReview: now + 86400000, lastReviewed: now
      });
    }, sample);

    await page.evaluate(async () => {
      App.switchView('srs');
      await App.updateSrsView();
    });
    const expected = await page.evaluate(() => {
      const total = getUniqueLearningVocabulary().length;
      return Math.round(2 / total * 100) + '%';
    });
    assert.equal(await page.locator('#statTotalVocab').innerText(),
      String(await page.evaluate(() => getUniqueLearningVocabulary().length)));
    assert.equal(await page.locator('#statMastered').innerText(), '2',
      'only words with four or more successful reviews should count as consolidated');
    assert.equal(await page.locator('#statMasteredPercent').innerText(), expected);
    assert.equal(await page.locator('#statMasteredProgress').evaluate(node => node.style.width), expected);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('daily XP goals and study streaks persist across reloads', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof StudyActivity !== 'undefined' && DB && DB.db);

    await page.evaluate(() => App.addXp(10));
    await page.waitForFunction(async () => {
      const activity = await DB.get('settings', 'studyActivity');
      return activity && activity.todayXp === 10 && activity.currentStreak === 1;
    });
    assert.equal(await page.locator('#studyStreakText').innerText(), '1 día');
    assert.equal(await page.locator('#studyDailyXpText').innerText(), '10 / 30 XP');

    await page.locator('#dailyXpGoal').selectOption('50');
    await page.waitForFunction(async () => (await DB.get('settings', 'studyActivity')).dailyGoal === 50);
    await page.evaluate(async () => {
      await App.recordStudyActivity('lesson', 0);
      await App.recordStudyActivity('review', 0);
    });
    await page.waitForFunction(async () => {
      const activity = await DB.get('settings', 'studyActivity');
      return activity && activity.todayLessons === 1 && activity.todayReviews === 1;
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && App.studyActivity && App.studyActivity.dailyGoal === 50);
    assert.equal(await page.locator('#dailyXpGoal').inputValue(), '50');
    assert.equal(await page.locator('#studyDailyXpText').innerText(), '10 / 50 XP');
    assert.equal(await page.locator('#studyStreakText').innerText(), '1 día');
    assert.equal(await page.locator('#studyLessonsTodayText').innerText(), '1 lección hoy');
    assert.equal(await page.locator('#studyReviewsTodayText').innerText(), '1 tarjeta repasada hoy');
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('six practical conversations support guided replies without changing learner progress', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof ConversationEngine !== 'undefined' &&
      typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    const xpBefore = await page.evaluate(() => App.xp);
    const srsBefore = await page.evaluate(async () => (await DB.getAll('srs')).length);

    await page.getByRole('button', { name: 'Practicar conversaciones' }).click();
    assert.equal(await page.locator('[data-conversation-start]').count(), 6,
      'all six planned everyday situations should be available');

    const scenarioIds = ['greetings', 'restaurant', 'shopping', 'travel', 'friends', 'help'];
    for (let scenarioIndex = 0; scenarioIndex < scenarioIds.length; scenarioIndex++) {
      const scenarioId = scenarioIds[scenarioIndex];
      await page.locator('[data-conversation-start="' + scenarioId + '"]').click();

      for (let turnIndex = 0; turnIndex < 3; turnIndex++) {
        if (scenarioIndex === 0 && turnIndex === 0) {
          await page.locator('[data-conversation-choice][data-correct="false"]').first().click();
          assert.match(await page.locator('#conversationFeedback').innerText(), /La respuesta adecuada es/,
            'an incorrect response should explain the better phrase');
        } else {
          await page.locator('[data-conversation-choice][data-correct="true"]').click();
        }
        await page.locator('[data-conversation-next]').click();
      }

      await page.getByRole('heading', { name: 'Conversación completada' }).waitFor();
      const expectedScore = scenarioIndex === 0 ? '2/3' : '3/3';
      assert.match(await page.locator('#conversationResultScore').innerText(), new RegExp(expectedScore),
        scenarioId + ' should calculate the correct conversation score');
      if (scenarioIndex < scenarioIds.length - 1) {
        await page.locator('[data-conversation-back]').click();
      }
    }

    assert.equal(await page.evaluate(() => App.xp), xpBefore,
      'conversation practice should not award XP before the motivation stage');
    assert.equal(await page.evaluate(async () => (await DB.getAll('srs')).length), srsBefore,
      'conversation practice should not modify spaced-repetition records');
    await page.locator('#conversationPracticeArea [data-conversation-exit]').click();
    await page.waitForFunction(() => document.getElementById('view-route').classList.contains('active'));
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('main navigation opens each primary view and dictionary search filters Indonesian and Spanish text', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);

    const views = [
      { label: 'Curso', id: 'route' },
      { label: 'Repaso', id: 'srs' },
      { label: 'Tutor', id: 'ai' },
      { label: 'Diccionario', id: 'dict' },
      { label: 'Evaluar', id: 'assessment' },
      { label: 'Ajustes', id: 'settings' }
    ];

    for (const view of views) {
      await page.locator('.nav-btn').filter({ hasText: view.label }).click();
      await page.locator('#view-' + view.id).waitFor({ state: 'visible' });
      assert.equal(await page.locator('#view-' + view.id).evaluate(el => el.classList.contains('active')), true,
        view.label + ' should activate its corresponding view');
    }

    // Dictionary assertions require the dictionary view to be active again.
    await page.locator('.nav-btn').filter({ hasText: 'Diccionario' }).click();
    await page.locator('#view-dict').waitFor({ state: 'visible' });
    await page.locator('#dictSearch').fill('');
    const cards = page.locator('#dictContainer .card');
    assert.ok(await cards.count() > 0, 'dictionary should render vocabulary cards');

    await page.locator('#dictSearch').fill('Saya');
    const indonesianMatches = await cards.evaluateAll(items =>
      items.filter(card => getComputedStyle(card).display !== 'none' && card.innerText.includes('Saya')).length
    );
    assert.ok(indonesianMatches > 0, 'dictionary search should find Indonesian headwords/examples');

    await page.locator('#dictSearch').fill('Yo');
    const spanishMatches = await cards.evaluateAll(items =>
      items.filter(card => getComputedStyle(card).display !== 'none' && card.innerText.includes('Yo')).length
    );
    assert.ok(spanishMatches > 0, 'dictionary search should find Spanish translations/examples');

    await page.locator('#dictSearch').fill('zqvnotaword');
    const noMatches = await cards.evaluateAll(items =>
      items.filter(card => getComputedStyle(card).display !== 'none').length
    );
    assert.equal(noMatches, 0, 'unknown search should hide all non-matching dictionary cards');
    assert.deepEqual(pageErrors, [], 'navigation and dictionary search should not throw browser errors');
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('optional Indonesian pronunciation practice compares browser recognition without grading progress', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__recognitionStarts = 0;
    window.SpeechRecognition = class {
      start() { window.__recognitionStarts++; window.__mockRecognition = this; }
      abort() { this.aborted = true; }
    };
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: { cancel() {}, getVoices() { return [{ lang: 'id-ID', name: 'Mock Indonesian' }]; }, speak() {}, onvoiceschanged: null }
    });
    window.SpeechSynthesisUtterance = function (text) { this.text = text; };
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.evaluate(() => LessonEngine.startUnit({
      id: 'pronunciation-test',
      title: 'Prueba de pronunciación',
      grammar: 'Prueba automatizada.',
      vocab: [{ id: 'pronunciation-word', idn: 'Pagi', esp: 'Mañana', ex: 'Selamat pagi.', exEsp: 'Buenos días.' }],
      exercises: [{
        vocabId: 'pronunciation-word', type: 'mc', prompt: 'Escucha y elige el significado',
        audioText: 'Selamat pagi', options: ['Buenos días', 'Buenas noches'], answer: 0, explanation: 'Buenos días.'
      }]
    }));
    await page.getByRole('button', { name: 'Comenzar' }).click();
    await page.getByRole('button', { name: 'Practicar pronunciación' }).click();
    await page.waitForFunction(() => window.__recognitionStarts === 1);
    assert.match(await page.locator('#pronunciationStatus').innerText(), /Escuchando/);
    await page.evaluate(() => {
      const interim = [{ transcript: 'Selamat' }];
      interim.isFinal = false;
      window.__mockRecognition.onresult({ results: [interim] });
      const partialFinal = [{ transcript: 'Selamat' }];
      partialFinal.isFinal = true;
      const nextInterim = [{ transcript: 'pagi' }];
      nextInterim.isFinal = false;
      window.__mockRecognition.onresult({ results: [partialFinal, nextInterim] });
    });
    assert.match(await page.locator('#pronunciationStatus').innerText(), /Te escucho: “Selamat pagi”/);
    await page.evaluate(() => {
      const firstFinal = [{ transcript: 'Selamat' }];
      firstFinal.isFinal = true;
      const lastFinal = [{ transcript: 'pagi' }];
      lastFinal.isFinal = true;
      window.__mockRecognition.onresult({ results: [firstFinal, lastFinal] });
      window.__mockRecognition.onend();
    });
    assert.match(await page.locator('#pronunciationStatus').innerText(), /frase reconocida coincide/);
    assert.equal(await page.evaluate(() => PronunciationEngine.activeRecognition === null), true);
    assert.equal(await page.evaluate(() => App.state?.xp || 0), 0,
      'speaking practice must not award XP or grade the exercise');
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('pronunciation practice degrades gracefully when speech recognition is unavailable', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.SpeechRecognition = undefined;
    window.webkitSpeechRecognition = undefined;
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.evaluate(() => LessonEngine.startUnit({
      id: 'pronunciation-fallback-test',
      title: 'Prueba alternativa',
      grammar: 'Prueba automatizada.',
      vocab: [{ id: 'fallback-word', idn: 'Pagi', esp: 'Mañana', ex: 'Selamat pagi.', exEsp: 'Buenos días.' }],
      exercises: [{
        vocabId: 'fallback-word', type: 'mc', prompt: 'Escucha y elige',
        audioText: 'Selamat pagi', options: ['Buenos días', 'Buenas noches'], answer: 0, explanation: 'Buenos días.'
      }]
    }));
    await page.getByRole('button', { name: 'Comenzar' }).click();
    await page.getByRole('button', { name: 'Practicar pronunciación' }).click();
    assert.match(await page.locator('#pronunciationStatus').innerText(), /no ofrece reconocimiento de voz/);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('grading a listening answer immediately stops active microphone recognition', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.SpeechRecognition = class {
      start() { window.__activeRecognition = this; }
      abort() { window.__recognitionAborted = true; }
    };
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: { cancel() {}, getVoices() { return []; }, speak() {}, onvoiceschanged: null }
    });
    window.SpeechSynthesisUtterance = function (text) { this.text = text; };
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.evaluate(() => LessonEngine.startUnit({
      id: 'recognition-stop-test', title: 'Prueba de cierre', grammar: 'Prueba.',
      vocab: [{ id: 'stop-word', idn: 'Pagi', esp: 'Mañana', ex: 'Selamat pagi.', exEsp: 'Buenos días.' }],
      exercises: [{
        vocabId: 'stop-word', type: 'mc', prompt: 'Escucha', audioText: 'Selamat pagi',
        options: ['Buenos días', 'Buenas noches'], answer: 0, explanation: 'Correcto.'
      }]
    }));
    await page.getByRole('button', { name: 'Comenzar' }).click();
    await page.getByRole('button', { name: 'Practicar pronunciación' }).click();
    await page.waitForFunction(() => !!window.__activeRecognition);
    await page.getByRole('button', { name: 'Buenos días' }).click();
    await page.getByRole('button', { name: 'Comprobar' }).click();
    assert.equal(await page.evaluate(() => window.__recognitionAborted), true);
    assert.equal(await page.evaluate(() => PronunciationEngine.activeRecognition === null), true);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('listen-and-type exercises support optional pronunciation practice against the spoken answer', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__recognitionStarts = 0;
    window.SpeechRecognition = class {
      start() { window.__recognitionStarts++; window.__mockRecognition = this; }
      abort() { this.aborted = true; }
    };
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: { cancel() {}, getVoices() { return [{ lang: 'id-ID', name: 'Mock Indonesian' }]; }, speak() {}, onvoiceschanged: null }
    });
    window.SpeechSynthesisUtterance = function (text) { this.text = text; };
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.evaluate(() => LessonEngine.startUnit({
      id: 'listen-pronunciation-test',
      title: 'Prueba de escucha y pronunciación',
      grammar: 'Prueba automatizada.',
      vocab: [{ id: 'listen-pronunciation-word', idn: 'Pagi', esp: 'Mañana', ex: 'Selamat pagi.', exEsp: 'Buenos días.' }],
      exercises: [{
        vocabId: 'listen-pronunciation-word', type: 'listen',
        prompt: 'Escucha y escribe la frase', answer: 'Selamat pagi',
        explanation: 'Buenos días.'
      }]
    }));
    await page.getByRole('button', { name: 'Comenzar' }).click();
    await page.getByRole('button', { name: 'Practicar pronunciación' }).click();
    await page.waitForFunction(() => window.__recognitionStarts === 1);
    assert.match(await page.locator('#pronunciationStatus').innerText(), /Escuchando/);

    await page.evaluate(() => {
      const finalResult = [{ transcript: 'Selamat pagi' }];
      finalResult.isFinal = true;
      window.__mockRecognition.onresult({ results: [finalResult] });
      window.__mockRecognition.onend();
    });
    assert.match(await page.locator('#pronunciationStatus').innerText(), /frase reconocida coincide/);
    assert.equal(await page.evaluate(() => PronunciationEngine.activeRecognition === null), true);
    assert.equal(await page.evaluate(() => App.xp), 0,
      'pronunciation practice must not award XP or grade the listening exercise');
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('voice test speaks using the system fallback when no Indonesian voice is installed', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__spokenUtterances = [];
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        cancel() {},
        getVoices() { return []; },
        speak(utterance) {
          window.__spokenUtterances.push({
            text: utterance.text,
            lang: utterance.lang,
            rate: utterance.rate,
            voice: utterance.voice ? utterance.voice.name : null
          });
        },
        onvoiceschanged: null
      }
    });
    window.SpeechSynthesisUtterance = function (text) { this.text = text; };
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof AudioEngine !== 'undefined');
    await page.evaluate(() => {
      AudioEngine.init();
      AudioEngine.testVoice();
    });
    const result = await page.evaluate(() => ({
      utterances: window.__spokenUtterances,
      status: document.getElementById('voiceTestStatus').textContent
    }));
    assert.equal(result.utterances.length, 1);
    assert.equal(result.utterances[0].text, 'Halo! Bahasa Indonesia.');
    assert.equal(result.utterances[0].lang, 'id-ID');
    assert.equal(result.utterances[0].rate, 0.85);
    assert.equal(result.utterances[0].voice, null);
    assert.match(result.status, /voz predeterminada del sistema/);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('A1 unit lessons unlock sequentially and the final exam gates the next unit at 80 percent', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db &&
      Array.isArray(App.completedLessons) && Array.isArray(App.completedUnits) &&
      document.querySelectorAll('[data-unit-id="a1_u1"][data-lesson-index]').length === 3);

    const firstUnitButtons = page.locator('[data-unit-id="a1_u1"][data-lesson-index]');
    assert.equal(await firstUnitButtons.count(), 3, 'Unit 1 should contain three short lessons');
    assert.equal(await firstUnitButtons.nth(0).isEnabled(), true);
    assert.equal(await firstUnitButtons.nth(1).isEnabled(), false);
    assert.equal(await firstUnitButtons.nth(2).isEnabled(), false);

    await firstUnitButtons.nth(0).click();
    await page.getByRole('button', { name: 'Salir' }).click();
    await page.evaluate(async () => {
      App.completedLessons = ['a1_u1::0'];
      await DB.set('settings', 'completedLessons', App.completedLessons);
      App.renderCourseRoute();
    });
    const refreshedButtons = page.locator('[data-unit-id="a1_u1"][data-lesson-index]');
    assert.equal(await refreshedButtons.nth(1).isEnabled(), true);
    assert.equal(await refreshedButtons.nth(2).isEnabled(), false);

    await page.evaluate(async () => {
      App.completedLessons = ['a1_u1::0', 'a1_u1::1'];
      await DB.set('settings', 'completedLessons', App.completedLessons);
      App.renderCourseRoute();
    });
    assert.equal(await refreshedButtons.nth(2).isEnabled(), true);
    assert.equal(await page.locator('[data-unit-id="a1_u2"][data-lesson-index="0"]').isEnabled(), false);

    await page.evaluate(async () => {
      App.completedLessons = ['a1_u1::0', 'a1_u1::1', 'a1_u1::2'];
      await DB.set('settings', 'completedLessons', App.completedLessons);
      App.renderCourseRoute();
    });
    await page.getByRole('button', { name: 'Prueba final · Desbloquear siguiente unidad' }).click();

    const answerCurrentQuestion = async correct => {
      const details = await page.evaluate(() => {
        const item = LessonEngine.queue[LessonEngine.stepIndex];
        return { answer: item.answer, options: item.options.length };
      });
      const selected = correct ? details.answer : (details.answer + 1) % details.options;
      await page.locator('.option-btn').nth(selected).click();
      await page.getByRole('button', { name: 'Comprobar' }).click();
      await page.getByRole('button', { name: 'Continuar' }).click();
    };

    const questionCount = await page.evaluate(() => LessonEngine.queue.length);
    const wrongCount = Math.ceil(questionCount * 0.3);
    for (let i = 0; i < questionCount; i++) await answerCurrentQuestion(i >= wrongCount);
    await page.waitForFunction(() => document.getElementById('exerciseArea').innerText.includes('Sigue practicando'));
    assert.equal(await page.evaluate(() => App.completedUnits.includes('a1_u1')), false);
    assert.equal(await page.locator('[data-unit-id="a1_u2"][data-lesson-index="0"]').isEnabled(), false);

    await page.getByRole('button', { name: 'Repetir prueba' }).click();
    const retryQuestionCount = await page.evaluate(() => LessonEngine.queue.length);
    for (let i = 0; i < retryQuestionCount; i++) await answerCurrentQuestion(true);
    await page.waitForFunction(() => document.getElementById('exerciseArea').innerText.includes('Prueba superada'));
    assert.match(await page.locator('#exerciseArea').innerText(), /Prueba superada/);
    assert.equal(await page.evaluate(() => App.completedUnits.includes('a1_u1')), true);
    assert.equal(await page.locator('[data-unit-id="a1_u2"][data-lesson-index="0"]').isEnabled(), true);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('Indonesian TTS voice selection is available, applied to speech, and persisted', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__spokenVoices = [];
    const voices = [
      { name: 'Mock Indonesian A', lang: 'id-ID', voiceURI: 'mock-id-a' },
      { name: 'Mock Indonesian B', lang: 'id-ID', voiceURI: 'mock-id-b' },
      { name: 'Mock English', lang: 'en-US', voiceURI: 'mock-en' }
    ];
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        cancel() {},
        getVoices() { return voices; },
        speak(utterance) { window.__spokenVoices.push(utterance.voice ? utterance.voice.voiceURI : null); },
        onvoiceschanged: null
      }
    });
    window.SpeechSynthesisUtterance = function (text) { this.text = text; };
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.waitForFunction(() => document.querySelectorAll('#audioVoiceSelect option').length === 3);
    await page.getByRole('button', { name: 'Ajustes' }).click();
    const options = await page.locator('#audioVoiceSelect option').allTextContents();
    assert.deepEqual(options, [
      'Automática (recomendada)',
      'Mock Indonesian A (id-ID)',
      'Mock Indonesian B (id-ID)'
    ]);
    await page.locator('#audioVoiceSelect').selectOption('mock-id-b');
    await page.evaluate(() => AudioEngine.speak('Selamat pagi'));
    assert.deepEqual(await page.evaluate(() => window.__spokenVoices), ['mock-id-b']);
    await page.waitForFunction(async () => (await DB.get('settings', 'audioVoiceURI')) === 'mock-id-b');
    assert.equal(await page.locator('#audioVoiceSelect').inputValue(), 'mock-id-b');
    assert.match(await page.locator('#audioVoiceStatus').innerText(), /Voz activa: Mock Indonesian B/);

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.waitForFunction(() => document.querySelectorAll('#audioVoiceSelect option').length === 3);
    await page.getByRole('button', { name: 'Ajustes' }).click();
    assert.equal(await page.locator('#audioVoiceSelect').inputValue(), 'mock-id-b',
      'the selected Indonesian voice should be restored after reload');
    await page.evaluate(() => AudioEngine.speak('Terima kasih'));
    assert.deepEqual(await page.evaluate(() => window.__spokenVoices), ['mock-id-b']);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('Indonesian TTS voice selector falls back to automatic mode when no Indonesian voice exists', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  await page.addInitScript(() => {
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        cancel() {},
        getVoices() { return [{ name: 'Mock English', lang: 'en-US', voiceURI: 'mock-en' }]; },
        speak() {},
        onvoiceschanged: null
      }
    });
    window.SpeechSynthesisUtterance = function (text) { this.text = text; };
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    assert.equal(await page.locator('#audioVoiceSelect option').count(), 1);
    assert.equal(await page.locator('#audioVoiceSelect').inputValue(), 'auto');
    assert.match(await page.locator('#audioVoiceStatus').innerText(), /No se detectó una voz indonesia instalada/);
    await page.evaluate(() => AudioEngine.speak('Halo'));
    assert.equal(await page.evaluate(() => AudioEngine.selectedVoice === null), true);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('Indonesian voices discovered asynchronously refresh the selector', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  await page.addInitScript(() => {
    let voices = [];
    window.__publishIndonesianVoices = () => {
      voices = [{ name: 'Late Indonesian', lang: 'id-ID', voiceURI: 'late-id' }];
      window.speechSynthesis.onvoiceschanged();
    };
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        cancel() {},
        getVoices() { return voices; },
        speak() {},
        onvoiceschanged: null
      }
    });
    window.SpeechSynthesisUtterance = function (text) { this.text = text; };
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    assert.equal(await page.locator('#audioVoiceSelect option').count(), 1);
    await page.evaluate(() => window.__publishIndonesianVoices());
    await page.waitForFunction(() => document.querySelectorAll('#audioVoiceSelect option').length === 2);
    assert.equal(await page.locator('#audioVoiceSelect option').nth(1).textContent(), 'Late Indonesian (id-ID)');
    assert.match(await page.locator('#audioVoiceStatus').innerText(), /1 voz indonesia disponible/);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('guided A1 writing shows task-specific review criteria and records progress only after self-assessment', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof LessonEngine !== 'undefined' && typeof DB !== 'undefined' && DB.db && App);

    await page.evaluate(() => {
      const unit = CourseData.levels.find(level => level.id === 'A1').units.find(entry => entry.id === 'a1_u8');
      const lessons = buildUnitLessons(unit);
      const lessonIndex = lessons.findIndex(lesson => lesson.exercises.some(
        exercise => exercise.prompt === 'Escribe dos frases sobre tu rutina.'
      ));
      if (lessonIndex < 0) throw new Error('The existing A1 routine-writing activity was not assigned to a lesson');
      LessonEngine.startUnit(unit, lessonIndex);
      const index = LessonEngine.queue.findIndex(exercise => exercise.prompt === 'Escribe dos frases sobre tu rutina.');
      if (index < 0) throw new Error('The existing A1 routine-writing activity was not found in its lesson');
      LessonEngine.intro = false;
      LessonEngine.stepIndex = index;
      LessonEngine.renderStep();
    });

    assert.match(await page.locator('#exerciseArea').innerText(), /Escritura guiada/);
    assert.match(await page.locator('[data-guided-writing-checklist]').innerText(), /al menos dos frases completas/);
    assert.match(await page.locator('[data-guided-writing-checklist]').innerText(), /expresión temporal/);

    const before = await page.evaluate(() => App.xp);
    assert.equal(await page.evaluate(() => DB.get('srs', 'v44')), null,
      'rendering or drafting must not create an SRS attempt');

    await page.locator('#textAnswer').fill('Hoy estudio. Bebo agua todos los días.');
    await page.getByRole('button', { name: 'Comparar con el ejemplo' }).click();
    assert.match(await page.locator('[data-writing-review]').innerText(), /dos frases completas/);
    assert.match(await page.locator('#actionArea').innerText(), /Un ejemplo posible/);
    assert.match(await page.locator('#actionArea').innerText(), /no corrige automáticamente/);
    assert.equal(await page.evaluate(() => App.xp), before,
      'writing must not award XP before the learner explicitly self-assesses');

    await page.getByRole('button', { name: 'Sí, cumplí los criterios' }).click();
    await page.waitForFunction(previous => App.xp >= previous + 10, before);
    await page.waitForFunction(async () => {
      const record = await DB.get('srs', 'v44');
      return record && record.attempts === 1;
    });
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});
