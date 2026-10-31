'use strict';

const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { test, before, after } = require('node:test');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
let browser;
before(async () => { browser = await chromium.launch({ headless: true }); });
after(async () => { if (browser) await browser.close(); });

function startServer() {
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://127.0.0.1').pathname;
    const requested = pathname === '/' ? 'assessment.html' : decodeURIComponent(pathname.slice(1));
    const filename = path.resolve(root, requested);
    if (!filename.startsWith(root + path.sep)) return res.writeHead(403).end('Forbidden');
    fs.readFile(filename, (err, content) => {
      if (err) return res.writeHead(404).end('Not found');
      const ext = path.extname(filename);
      const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      res.end(content);
    });
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve({
      server, url: 'http://127.0.0.1:' + server.address().port + '/'
    }));
  });
}

test('assessment page renders questions, scores closed answers and flags open responses for review', async () => {
  const { server, url } = await startServer();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(url);
    assert.deepEqual(await page.locator('#level option').evaluateAll(options => options.map(option => option.value)), ['A1'],
      'the student-facing selector must expose A1 only until A1 is validated');
    await page.getByRole('button', { name: 'Comenzar evaluación' }).click();
    await page.getByText('Completa la negación:', { exact: false }).waitFor();
    assert.ok(await page.locator('fieldset[role="radiogroup"][aria-labelledby]').count() >= 14,
      'each closed question must expose an accessible named radio group');
    assert.ok(await page.locator('#question-title-a1-negation-01').isVisible());
    await page.locator('input[name="a1-negation-01"][value="0"]').check();
    await page.locator('input[name="a1-vocab-01"][value="2"]').check();
    await page.locator('#a1-write-01').fill('Nama saya Ana. Saya belajar bahasa Indonesia.');
    const writing = page.locator('#a1-write-03');
    const writingSection = page.locator('[data-id="a1-write-03"]');
    const reveal = writingSection.locator('[data-reveal-model]');
    assert.equal(await reveal.isDisabled(), true, 'the model must stay unavailable before a learner drafts a response');
    await writing.fill('Halo. Saya suka makan nasi goreng. Ayo makan bersama besok. Kamu mau?');
    assert.equal(await reveal.isDisabled(), false);
    await reveal.click();
    assert.ok(await writingSection.locator('[data-model-example]').isVisible());
    await page.getByRole('button', { name: 'Calcular resultado provisional' }).click();
    await page.getByRole('heading', { name: 'Resultado provisional' }).waitFor();
    assert.match(await page.locator('#results').innerText(), /requieren revisión humana/);
    assert.match(await page.locator('#results').innerText(), /2 de 66 puntos/, 'open writing responses must not receive automatic credit');
    assert.equal(await page.locator('[data-review-id="a1-write-03"]').count(), 1);
    assert.match(await page.locator('#results').innerText(), /Incluye saludo, preferencia, invitación y pregunta/);
    assert.match(await page.locator('#results').innerText(), /producción/i);
    assert.equal(await page.locator('#assessment').isVisible(), false);
    await page.locator('[data-review-id="a1-write-01"]').fill('3');
    await page.locator('[data-review-id="a1-write-03"]').fill('3');
    await page.getByRole('button', { name: 'Aplicar puntuaciones revisadas' }).click();
    assert.match(await page.locator('#results').innerText(), /8 de 66 puntos/);
    assert.equal(await page.locator('[data-review-id="a1-write-01"]').count(), 1);
    assert.deepEqual(errors, []);
  } finally {
    await page.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('assessment page remains available offline after service-worker installation', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await page.goto(url);
    await page.evaluate(async () => {
      await navigator.serviceWorker.register('/service-worker.js');
      await navigator.serviceWorker.ready;
    });
    await page.reload();
    await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
    await context.setOffline(true);
    await page.goto(new URL('assessment.html', url).href, { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Comenzar evaluación' }).waitFor({ timeout: 5000 });
  } finally {
    await context.setOffline(false);
    await context.close();
    server.close();
  }
});
