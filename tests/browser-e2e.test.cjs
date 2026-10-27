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
      customUnits: [],
      syllabusPos: 0,
      srs: [{
        key: 'v27',
        val: {
          attempts: 9, correct: 8, incorrect: 1, interval: 6, repetition: 2,
          efactor: 2.5, nextReview: Date.now() + 86400000, lastReviewed: Date.now()
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
    assert.equal((await page.evaluate(() => DB.get('srs', 'v27'))).attempts, 9);
    assert.equal(await page.evaluate(() => DB.get('srs', 'v49')), null,
      'successful restore should replace old SRS records rather than leave stale entries');

    const previousState = await page.evaluate(async () => ({
      xp: await DB.get('settings', 'userXp'),
      completed: await DB.get('settings', 'completedUnits'),
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
