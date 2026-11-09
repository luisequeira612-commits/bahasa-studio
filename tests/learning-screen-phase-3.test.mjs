'use strict';

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');

function channel(hex, index) {
  const value = parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16) / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}
function luminance(hex) {
  return 0.2126 * channel(hex, 0) + 0.7152 * channel(hex, 1) + 0.0722 * channel(hex, 2);
}
function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
function mix(foreground, background, amount) {
  return '#' + [0, 1, 2].map(index => {
    const a = parseInt(foreground.slice(1 + index * 2, 3 + index * 2), 16);
    const b = parseInt(background.slice(1 + index * 2, 3 + index * 2), 16);
    return Math.round(a * amount + b * (1 - amount)).toString(16).padStart(2, '0');
  }).join('');
}

test('Fase 3 uses one brand red across CSS, manifest, browser chrome and icon', async () => {
  const [css, html, manifestText, icon] = await Promise.all([
    read('styles.css'), read('index.html'), read('manifest.json'), read('icon.svg')
  ]);
  const manifest = JSON.parse(manifestText);
  assert.equal((css.match(/--brand-red\s*:/g) || []).length, 1);
  assert.match(css, /--brand-red:\s*#c92a40/i);
  assert.doesNotMatch(css, /#e8384f|#bd263b/i);
  assert.match(css, /--accent:\s*var\(--brand-red\)/);
  assert.match(css, /--accent-hover:\s*var\(--brand-red\)/);
  assert.equal(manifest.theme_color, '#c92a40');
  assert.equal(manifest.background_color, '#ffffff');
  assert.match(html, /<meta name="theme-color" content="#c92a40">/);
  assert.match(icon, /#c92a40/);
  assert.doesNotMatch(icon, /#e8384f/i);
});

test('normal text and informative icons meet contrast on the learning screen tinted backgrounds', async () => {
  const [css, html] = await Promise.all([read('styles.css'), read('index.html')]);
  const red = '#c92a40';
  const main = '#3b2427';
  const muted = '#69474d';
  const white = '#ffffff';
  const cardTint = '#fff1f2';
  const completedGreen = '#16834b';
  const completedCard = mix('#2e9e4f', white, 0.07);
  const completedBadge = mix('#2e9e4f', white, 0.13);
  const lockedBg = '#e5e7eb';

  const measurements = [
    ['primary button and current node: white on brand red', contrast(white, red), 4.5],
    ['course status badge on tinted card', contrast(main, cardTint), 4.5],
    ['tool-row label on white access button', contrast(main, white), 4.5],
    ['expanded access-button label on tinted background', contrast(main, cardTint), 4.5],
    ['secondary text on white section banner', contrast(muted, white), 4.5],
    ['main text on tinted cards', contrast(main, cardTint), 4.5],
    ['secondary text on tinted unit sheet', contrast(muted, cardTint), 4.5],
    ['main text on completed card', contrast(main, completedCard), 4.5],
    ['completed check icon on completed card', contrast('#2e9e4f', completedCard), 3],
    ['completed badge text on its green tint', contrast('#176b3a', completedBadge), 4.5],
    ['white text on completed green node', contrast(white, completedGreen), 4.5],
    ['locked node number/padlock on gray', contrast('#374151', lockedBg), 3]
  ];
  for (const [label, ratio, minimum] of measurements) {
    assert.ok(ratio >= minimum, label + ': ' + ratio.toFixed(2) + ':1 < ' + minimum + ':1');
  }
  assert.match(css, /\.unit-bottom-sheet\s*\{[^}]*background:\s*var\(--bg-card\)/);
  assert.match(css, /\.unit-sheet-description\s*\{\s*color:\s*var\(--text-muted\)/);
  assert.match(css, /\.learning-tool-button\[aria-expanded="true"\]\s*\{[^}]*color:var\(--text-main\)[^}]*background:var\(--bg-card\)/);
  assert.match(css, /\.path-node-locked\s*\{[^}]*opacity:\s*1/);
  assert.doesNotMatch(css, /\.path-node-locked\s*\{[^}]*opacity:\s*\.72/);
  assert.match(css, /\.learning-unit-node\.node-locked\s*\{[^}]*background:\s*#e5e7eb[^}]*color:\s*#374151/);
  assert.match(css, /\.learning-unit-node\.node-completed/);
  assert.match(css, /\.learning-unit-node\.node-current/);
  assert.match(css, /#view-route \.badge \{ background:var\(--bg-card\); color:var\(--text-main\); border-color:var\(--border\); \}/);
  assert.match(css, /\.path-node \.unit-title \{ font-size:\.96rem; color:var\(--text-main\); \}/);
  assert.match(css, /#view-route \.eyebrow \{ color:var\(--text-muted\); \}/);
  assert.match(css, /\.learning-tool-button\[aria-expanded=\"true\"\] \{ border-color:var\(--border\); color:var\(--text-main\); background:var\(--bg-card\); \}/);
  assert.match(css, /\.path-node-completed \.badge-completed\s*\{[^}]*color:#176b3a/);
  // Exercise correctness/error feedback is intentionally preserved.
  assert.match(css, /--lesson-feedback-correct-bg:#e8f7ec/);
  assert.match(css, /--lesson-feedback-wrong-bg:#fff0f0/);
});

test('learning controls retain 44px minimum targets without changing unrelated btn-sm screens', async () => {
  const css = await read('styles.css');
  assert.match(css, /\.learning-level-button\s*\{[^}]*min-height:\s*46px/);
  assert.match(css, /\.learning-level-button\s*\{\s*min-height:\s*44px/);
  assert.match(css, /\.learning-unit-node\s*\{[^}]*min-width:\s*44px[^}]*min-height:\s*44px/s);
  assert.match(css, /\.unit-sheet-close\s*\{[^}]*width:\s*44px[^}]*height:\s*44px/s);
  assert.match(css, /\.unit-sheet-primary,[\s\S]*?min-height:\s*48px/);
  assert.match(css, /\.learning-tool-button\s*\{[^}]*min-height:\s*48px/);
  assert.match(css, /#view-route \.btn-sm,\s*#unitBottomSheet \.btn-sm\s*\{\s*min-height:\s*48px/);
  assert.doesNotMatch(css, /(?<!#view-route )(?<!#unitBottomSheet )\.btn-sm\s*\{\s*min-height:\s*48px/);
  assert.match(css, /\.btn-sm\s*\{[^}]*min-height:\s*36px/);
});

test('PWA manifest keeps standalone routing, explicit scope and the maskable icon', async () => {
  const manifest = JSON.parse(await read('manifest.json'));
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.start_url, './index.html');
  assert.equal(manifest.scope, './');
  assert.ok(manifest.icons.some(icon =>
    icon.src === './icon.svg' && icon.type === 'image/svg+xml' &&
    icon.sizes === 'any' && icon.purpose.split(/\s+/).includes('maskable')));
});

test('service worker installs v3.8.75, removes only older app caches and claims clients', async () => {
  const source = await read('service-worker.js');
  assert.match(source, /CACHE_NAME\s*=\s*'bahasa-studio-v3\.8\.75'/);
  assert.match(source, /'\.\/index\.html'/);
  assert.match(source, /'\.\/manifest\.json'/);
  assert.match(source, /'\.\/styles\.css'/);
  assert.doesNotMatch(source, /indexedDB\.deleteDatabase|indexedDB\.deleteObjectStore/i);

  const handlers = {};
  const cacheNames = ['bahasa-studio-v3.8.71', 'bahasa-studio-other'];
  const deleted = [];
  let installedAssets = [];
  let claimed = false;
  const cacheStore = new Map();
  const context = {
    self: {
      location: { origin: 'https://example.test' },
      addEventListener(name, handler) { handlers[name] = handler; },
      skipWaiting() {},
      clients: { async claim() { claimed = true; } }
    },
    caches: {
      async open(name) {
        if (!cacheStore.has(name)) cacheStore.set(name, {
          async addAll(assets) { installedAssets = assets; }
        });
        return cacheStore.get(name);
      },
      async keys() { return cacheNames.concat([...cacheStore.keys()]); },
      async delete(name) { deleted.push(name); return true; }
    },
    Request: class Request { constructor(url, options) { this.url = url; this.options = options; } },
    URL,
    Response,
    fetch() {}
  };
  vm.runInNewContext(source, context, { timeout: 5000 });
  let installPromise;
  handlers.install({ waitUntil(promise) { installPromise = promise; } });
  await installPromise;
  assert.ok(installedAssets.some(asset => asset.url === './index.html'));
  let activatePromise;
  handlers.activate({ waitUntil(promise) { activatePromise = promise; } });
  await activatePromise;
  assert.ok(deleted.includes('bahasa-studio-v3.8.71'));
  assert.ok(deleted.includes('bahasa-studio-other'));
  assert.equal(claimed, true);
  assert.ok(cacheStore.has('bahasa-studio-v3.8.75'));
});
