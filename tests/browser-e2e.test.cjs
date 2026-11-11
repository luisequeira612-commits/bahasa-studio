Warning: truncated output (original token count: 23405)
Total output lines: 1924

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

function startServer(overrides = {}) {
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
      const override = overrides[pathname];
      const responseContent = typeof override === 'function' ? override(content) : (override ?? content);
      const ext = path.extname(filename);
      const types = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.svg': 'image/svg+xml'
      };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      res.end(responseContent);
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
async function openLearningTool(page, drawerId) {
  const toolIds = ['aiGeneratorDrawer', 'writingPracticeDrawer', 'conversationPracticeDrawer'];
  const index = toolIds.indexOf(drawerId);
  if (index < 0) throw new Error('Unknown learning tool drawer: ' + drawerId);
  await page.locator('.unit-tools-trigger').first().click();
  await page.waitForFunction(() => !document.getElementById('learningToolsSheetOverlay').hidden);
  await page.locator('.learning-tool-sheet-row').nth(index).click();
  await page.waitForFunction(id => document.getElementById(id).open, drawerId);
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
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db, null, { timeout: 15000 });

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
      name: 'bahasa_studio_backup.json', // legacy filename remains importable; validation uses JSON contents
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
    assert.equal(await page.locator('#wordMeanin…17405 tokens truncated…na acción/);
    await page.getByRole('button', { name: 'Continuar' }).click();

    const matchIndex = await page.evaluate(() => LessonEngine.queue.findIndex(item => item.type === 'match'));
    assert.ok(matchIndex >= 0, 'a lesson with at least three unique vocabulary pairs should add one matching exercise');
    await page.evaluate(index => {
      LessonEngine.stepIndex = index;
      LessonEngine.renderStep();
    }, matchIndex);
    assert.equal(await page.locator('#matchIdn .match-option-btn').count(), 3);
    assert.equal(await page.locator('#matchEsp .match-option-btn').count(), 3);
    for (let index = 0; index < 3; index++) {
      await page.locator('#matchIdn .match-option-btn[data-pair-index="' + index + '"]').click();
      await page.locator('#matchEsp .match-option-btn[data-pair-index="' + index + '"]').click();
      await page.waitForFunction(expected => LessonEngine.matchSolved.size === expected, index + 1);
    }
    await page.locator('#actionArea.lesson-feedback-sheet.correct').waitFor();
    assert.equal(await page.locator('.match-option-btn.solved').count(), 6);
    assert.deepEqual(pageErrors, [], 'new exercise types should not throw browser errors');
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('emergency jump opens locked A2/B1 units without recording progress and cannot bypass B2', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof LessonEngine !== 'undefined' && DB.db);
    const before = await page.evaluate(() => ({
      units: [...App.completedUnits],
      lessons: [...App.completedLessons]
    }));
    await page.evaluate(() => {
      App.populateEmergencyUnitSelect();
      const select = document.getElementById('emergencyUnitSelect');
      select.value = 'a2_u1';
      window.confirm = () => true;
      App.confirmUnitJump();
    });
    await page.locator('#unitBottomSheet').waitFor({ state: 'visible' });
    await page.getByRole('button', { name: /Empezar lección 1/ }).click();
    await page.waitForFunction(() => LessonEngine.currentUnit && LessonEngine.currentUnit.id === 'a2_u1');
    const afterA2 = await page.evaluate(() => ({
      units: [...App.completedUnits],
      lessons: [...App.completedLessons]
    }));
    assert.deepEqual(afterA2, before, 'opening an emergency A2 lesson must not complete anything');

    await page.evaluate(() => {
      App.populateEmergencyUnitSelect();
      const select = document.getElementById('emergencyUnitSelect');
      select.value = 'b1_u1';
      App.confirmUnitJump();
    });
    await page.locator('#unitBottomSheet').waitFor({ state: 'visible' });
    await page.getByRole('button', { name: /Empezar lección 1/ }).click();
    await page.waitForFunction(() => LessonEngine.currentUnit && LessonEngine.currentUnit.id === 'b1_u1');
    const afterB1 = await page.evaluate(() => ({
      units: [...App.completedUnits],
      lessons: [...App.completedLessons]
    }));
    assert.deepEqual(afterB1, before, 'opening an emergency B1 lesson must not complete anything');

    const b2Guard = await page.evaluate(() => {
      App.populateEmergencyUnitSelect();
      const select = document.getElementById('emergencyUnitSelect');
      const option = select.querySelector('option[value="b2_u1"]');
      const optionDisabled = Boolean(option && option.disabled);
      select.value = 'b2_u1';
      App.confirmUnitJump();
      const skipAfterAttempt = localStorage.getItem('bahasaStudioUnitSkipId');
      localStorage.setItem('bahasaStudioUnitSkipId', 'b2_u1');
      LessonEngine.currentUnit = null;
      LessonEngine.startUnitById('b2_u1');
      return {
        optionDisabled,
        skipAfterAttempt,
        currentUnit: LessonEngine.currentUnit && LessonEngine.currentUnit.id,
        units: [...App.completedUnits],
        lessons: [...App.completedLessons]
      };
    });
    assert.equal(b2Guard.optionDisabled, true, 'B2 must not be selectable through the emergency jump');
    assert.equal(b2Guard.skipAfterAttempt, 'b1_u1', 'attempting a B2 jump must not replace the valid B1 emergency jump');
    assert.equal(b2Guard.currentUnit, null, 'a stale B2 localStorage skip must not bypass the B2 guard');
    assert.deepEqual({ units: b2Guard.units, lessons: b2Guard.lessons }, before);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('learning path keeps the real A1 one-of-five lesson state visible at a 360px viewport', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({
    viewport: { width: 360, height: 800 },
    serviceWorkers: 'block'
  });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && App.completedUnits && document.querySelector('.learning-unit-node'));
    const initial = await page.evaluate(() => ({
      viewport: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      selectedLevel: document.getElementById('levelProgressLevel')?.textContent.trim(),
      currentUnit: document.querySelector('.learning-unit-node[data-path-state="current"]')?.dataset.unitId
    }));
    assert.equal(initial.viewport, 360);
    assert.ok(initial.documentWidth <= 360, 'learning screen should not overflow horizontally at 360px');
    assert.equal(initial.selectedLevel, 'A1');
    assert.equal(initial.currentUnit, 'a1_u1', 'a new learner should start at A1 Unit 1');

    await page.evaluate(async () => {
      await DB.set('settings', 'completedUnits', ['a1_u1', 'a1_u2']);
      await DB.set('settings', 'completedLessons', ['a1_u3::0']);
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() =>
      App.completedUnits.includes('a1_u2') &&
      App.completedLessons.includes('a1_u3::0') &&
      document.querySelector('.learning-unit-node[data-unit-id="a1_u3"][data-path-state="current"]')
    );

    const progress = await page.evaluate(() => ({
      current: document.querySelector('.learning-unit-node[data-unit-id="a1_u3"]')?.dataset.pathState,
      previous: [
        document.querySelector('.learning-unit-node[data-unit-id="a1_u1"]')?.dataset.pathState,
        document.querySelector('.learning-unit-node[data-unit-id="a1_u2"]')?.dataset.pathState
      ],
      next: document.querySelector('.learning-unit-node[data-unit-id="a1_u4"]')?.dataset.pathState,
      width: document.documentElement.scrollWidth
    }));
    assert.equal(progress.current, 'current');
    assert.deepEqual(progress.previous, ['completed', 'completed']);
    assert.equal(progress.next, 'locked');
    assert.ok(progress.width <= 360, 'partially completed path should fit a 360px viewport');

    await page.locator('.learning-unit-node[data-unit-id="a1_u3"]').click();
    await page.locator('#unitBottomSheet').waitFor({ state: 'visible' });
    const sheet = await page.locator('#unitSheetContent').innerText();
    assert.match(sheet, /1\/5/);
    assert.match(sheet, /Empezar lección 2/);
    assert.ok(pageErrors.length === 0, pageErrors.join('\\n'));
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('learning route and unit sheet controls meet 44px touch targets at 360px', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({
    viewport: { width: 360, height: 780 },
    serviceWorkers: 'block'
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.waitForSelector('#courseContainer .learning-unit-node.node-current');

    const routeTargets = await page.evaluate(() => {
      const size = selector => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      };
      return {
        level: size('#learningLevelTrigger'),
        tool: size('.unit-tools-trigger'),
        currentNode: size('.learning-unit-node.node-current')
      };
    });
    for (const [name, size] of Object.entries(routeTargets)) {
      assert.ok(size && size.width >= 44 && size.height >= 44,
        name + ' must be at least 44x44px; got ' + JSON.stringify(size));
    }

    await page.locator('#aiGeneratorDrawer').evaluate(element => { element.open = true; });
    const generatorButton = await page.locator('#aiGeneratorDrawer .btn-sm').boundingBox();
    assert.ok(generatorButton && generatorButton.height >= 44,
      'the Aprender .btn-sm control must be at least 44px tall');

    await page.locator('#courseContainer .learning-unit-node.node-current').click();
    await page.waitForSelector('#unitSheetOverlay:not([hidden])');
    const sheetTargets = await page.evaluate(() => {
      const size = selector => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      };
      return {
        close: size('.unit-sheet-close'),
        primary: size('.unit-sheet-primary'),
        grammar: size('.unit-sheet-grammar-toggle')
      };
    });
    for (const [name, size] of Object.entries(sheetTargets)) {
      assert.ok(size && size.width >= 44 && size.height >= 44,
        'unit sheet ' + name + ' must be at least 44x44px; got ' + JSON.stringify(size));
    }

    const palette = await page.evaluate(() => {
      const read = className => {
        const node = document.createElement('button');
        node.className = className;
        node.textContent = '1';
        document.body.appendChild(node);
        const style = getComputedStyle(node);
        const result = { background: style.backgroundColor, color: style.color };
        node.remove();
        return result;
      };
      return {
        brandRed: getComputedStyle(document.documentElement).getPropertyValue('--brand-red').trim(),
        current: read('learning-unit-node node-current'),
        completed: read('learning-unit-node node-completed'),
        locked: read('learning-unit-node node-locked')
      };
    });
    assert.equal(palette.brandRed, '#0067C6');
    assert.equal(palette.current.background, 'rgb(0, 103, 198)');
    assert.equal(palette.current.color, 'rgb(255, 255, 255)');
    assert.equal(palette.completed.background, 'rgb(0, 78, 154)');
    assert.equal(palette.completed.color, 'rgb(255, 255, 255)');
    assert.equal(palette.locked.background, 'rgb(229, 231, 235)');
    assert.equal(palette.locked.color, 'rgb(55, 65, 81)');

    for (const view of ['srs', 'ai', 'dict']) {
      await page.evaluate(viewId => App.switchView(viewId), view);
      const sizes = await page.locator(`#view-${view} button.btn-sm`).evaluateAll(buttons =>
        buttons.map(button => {
          const rect = button.getBoundingClientRect();
          return { width: rect.width, height: rect.height };
        })
      );
      assert.ok(sizes.length > 0, `${view} should expose compact controls`);
      for (const size of sizes) {
        assert.ok(size.width >= 44 && size.height >= 44,
          `${view} control must be at least 44x44px; got ${JSON.stringify(size)}`);
      }
    }
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});
