'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
const a1Source = fs.readFileSync(require.resolve('../curriculum-a1.js'), 'utf8');
const a2Source = fs.readFileSync(require.resolve('../curriculum-a2.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(a1Source, context, { filename: 'curriculum-a1.js' });
vm.runInNewContext(a2Source, context, { filename: 'curriculum-a2.js' });
const a1 = context.window.BAHASA_CURRICULUM_A1;
const a2 = context.window.BAHASA_CURRICULUM_A2;

function fnv1a(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
function counts(level) {
  let vocabulary = 0, exercises = 0;
  function visit(value) {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) { value.forEach(visit); return; }
    for (const [key, child] of Object.entries(value)) {
      if (Array.isArray(child)) {
        if (key === 'vocab') vocabulary += child.length;
        if (key === 'exercises') exercises += child.length;
      }
      visit(child);
    }
  }
  visit(level);
  const lessons = level.units.reduce((sum, unit) => sum + (
    Array.isArray(unit.lessons) && unit.lessons.length
      ? unit.lessons.length
      : Math.min(5, Math.max(2, Math.ceil(unit.vocab.length / 4)))
  ), 0);
  return { units: level.units.length, lessons, exercises, vocabulary };
}

test('A1/A2 canonical curriculum integrity hashes and structure remain pinned', () => {
  assert.ok(a1 && a2, 'both classic scripts must define their globals');
  assert.equal(a1.id, 'A1');
  assert.equal(a2.id, 'A2');
  assert.equal(a1.units.length, 32);
  assert.equal(a2.units.length, 40);
  assert.equal(fnv1a(JSON.stringify(a1)), '27cd23ec', 'A1 canonical-data hash changed');
  assert.equal(fnv1a(JSON.stringify(a2)), '7033d9a2', 'A2 canonical-data hash changed');
  assert.deepEqual(counts(a1), { units: 32, lessons: 137, exercises: 1333, vocabulary: 329 });
  const u24 = a1.units.find(unit => unit.id === 'a1_u24');
  const eraser = u24.vocab.find(item => item.id === 'v388');
  assert.equal(eraser.esp, 'Goma de borrar');
  assert.equal(eraser.exEsp, 'Esta es mi goma de borrar.');
  const u30 = a1.units.find(unit => unit.id === 'a1_u30');
  const repeat = u30.vocab.find(item => item.id === 'v449');
  assert.equal(repeat.esp, 'Repite / repita (imperativo)');
  assert.equal(repeat.exEsp, 'Por favor, repite.');
  assert.deepEqual(counts(a2), { units: 40, lessons: 200, exercises: 1080, vocabulary: 492 });
});

test('classic curriculum scripts load synchronously before the main app script', () => {
  const a1Tag = html.indexOf('<script src="./curriculum-a1.js"></script>');
  const a2Tag = html.indexOf('<script src="./curriculum-a2.js"></script>');
  const writtenResponse = html.indexOf('const WrittenResponse');
  const mainTag = html.lastIndexOf('<script>', writtenResponse);
  assert.ok(a1Tag >= 0 && a2Tag > a1Tag && mainTag > a2Tag);
  assert.doesNotMatch(html, /curriculum-a[12]\.js[^>]*type=["']module/i);
  assert.match(html, /No se pudo cargar el currículo/);
  assert.match(html, /window\.stop\(\)/);
});

test('service worker precaches both data files and invalidates the previous cache', async () => {
  const source = fs.readFileSync(require.resolve('../service-worker.js'), 'utf8');
  assert.match(source, /CACHE_NAME\s*=\s*'bahasa-studio-v\d+\.\d+\.\d+'/);
  assert.match(source, /'\.\/curriculum-a1\.js'/);
  assert.match(source, /'\.\/curriculum-a2\.js'/);
  assert.match(source, /'\.\/styles\.css'/);
  assert.match(source, /'\.\/icon\.svg'/);
  assert.match(source, /'\.\/audio-engine\.js'/);
  assert.match(source, /'\.\/pronunciation-engine\.js'/);
  assert.match(source, /'\.\/writing-practice\.js'/);
  assert.match(source, /'\.\/adaptive-learning\.js'/);
  assert.match(source, /'\.\/study-history\.js'/);

  const listeners = {};
  const cached = new Map();
  const cache = {
    async add(request) { cached.set(String(request.url || request), { url: String(request.url || request) }); },
    async match(request) { return cached.get(String(request.url || request)); },
    async put(request, response) { cached.set(String(request.url || request), response); }
  };
  const deletedCaches = [];
  const cachesApi = {
    async open() { return cache; },
    async keys() { return ['bahasa-studio-v3.8.8', 'bahasa-studio-v3.8.9', 'bahasa-studio-v3.8.10', 'bahasa-studio-v3.8.11', 'bahasa-studio-v3.8.12', 'bahasa-studio-v3.8.13', 'bahasa-studio-v3.8.14', 'bahasa-studio-v3.8.15', 'bahasa-studio-v3.8.16', 'bahasa-studio-v3.8.17', 'bahasa-studio-v3.8.18', 'bahasa-studio-v3.8.19', 'bahasa-studio-v3.8.20', 'bahasa-studio-v3.8.21', 'bahasa-studio-v3.8.22', 'bahasa-studio-v3.8.23', 'bahasa-studio-v3.8.24', 'bahasa-studio-v3.8.25', 'bahasa-studio-v3.8.26', 'bahasa-studio-v3.8.27', 'bahasa-studio-v3.8.71', 'bahasa-studio-v3.8.72', 'bahasa-studio-v3.8.73', 'another-app-cache-v1']; },
    async delete(name) { deletedCaches.push(name); return name !== 'bahasa-studio-v3.8.23'; }
  };
  const sandbox = {
    self: { location: { origin: 'https://example.test' }, clients: { claim() {} },
      skipWaiting() {}, addEventListener(name, fn) { listeners[name] = fn; } },
    caches: cachesApi,
    Request: class Request { constructor(url) { this.url = new URL(url, 'https://example.test').href; } },
    URL,
    fetch: async () => { throw new Error('offline'); },
    Response: { error: () => ({ error: true }) }
  };
  vm.runInNewContext(source, sandbox, { filename: 'service-worker.js' });
  let installPromise;
  listeners.install({ waitUntil(promise) { installPromise = promise; } });
  await installPromise;
  assert.ok(cached.has('https://example.test/curriculum-a1.js'));
  assert.ok(cached.has('https://example.test/curriculum-a2.js'));
  assert.ok(cached.has('https://example.test/styles.css'));
  assert.ok(cached.has('https://example.test/audio-engine.js'));
  assert.ok(cached.has('https://example.test/pronunciation-engine.js'));
  assert.ok(cached.has('https://example.test/writing-practice.js'));
  assert.ok(cached.has('https://example.test/adaptive-learning.js'));

  let activatePromise;
  listeners.activate({ waitUntil(promise) { activatePromise = promise; } });
  await activatePromise;
  assert.deepEqual(deletedCaches.sort(), ['bahasa-studio-v3.8.10', 'bahasa-studio-v3.8.11', 'bahasa-studio-v3.8.12', 'bahasa-studio-v3.8.13', 'bahasa-studio-v3.8.14', 'bahasa-studio-v3.8.15', 'bahasa-studio-v3.8.16', 'bahasa-studio-v3.8.17', 'bahasa-studio-v3.8.18', 'bahasa-studio-v3.8.19', 'bahasa-studio-v3.8.20', 'bahasa-studio-v3.8.21', 'bahasa-studio-v3.8.22', 'bahasa-studio-v3.8.23', 'bahasa-studio-v3.8.24', 'bahasa-studio-v3.8.25', 'bahasa-studio-v3.8.26', 'bahasa-studio-v3.8.27', 'bahasa-studio-v3.8.71', 'bahasa-studio-v3.8.72', 'bahasa-studio-v3.8.73', 'bahasa-studio-v3.8.8', 'bahasa-studio-v3.8.9'],
    'activation should remove only older Bahasa Studio caches and preserve caches owned by other apps');

  let responsePromise;
  listeners.fetch({
    request: { method: 'GET', url: 'https://example.test/curriculum-a1.js', mode: 'no-cors' },
    respondWith(promise) { responsePromise = promise; }
  });
  const response = await responsePromise;
  assert.equal(response.url, 'https://example.test/curriculum-a1.js');

  let cssResponsePromise;
  listeners.fetch({
    request: { method: 'GET', url: 'https://example.test/styles.css', mode: 'no-cors' },
    respondWith(promise) { cssResponsePromise = promise; }
  });
  const cssResponse = await cssResponsePromise;
  assert.equal(cssResponse.url, 'https://example.test/styles.css');
});

test('the extracted stylesheet stays linked and its canonical content hash remains pinned', () => {
  const css = fs.readFileSync(require.resolve('../styles.css'), 'utf8');
  assert.match(html, /<link rel="stylesheet" href="\.\/styles\.css">/);
  const inlineStyleTags = [...html.matchAll(/<style\b([^>]*)>/gi)];
  assert.equal(inlineStyleTags.length, 1, 'only the scoped Phase 5B override may remain inline');
  assert.match(inlineStyleTags[0][1], /id=["']learning-phase-5b-overrides["']/);
  assert.equal(fnv1a(css), '0b6288e2', 'canonical extracted CSS content changed');
});

test('the extraction does not alter IndexedDB, SRS, backup, or word-translation code', () => {
  assert.match(html, /dbName: 'BahasaStudio3DB'/);
  assert.match(html, /const SRSEngine =/);
  assert.match(html, /exportProgress\s*\(/);
  assert.match(html, /importProgress\s*\(/);
  assert.match(html, /buildTapTranslationIndex/);
});
