const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(require.resolve('../offline-audio-manager.js'), 'utf8');
const sandbox = {
    window: {},
    document: { readyState: 'loading', addEventListener() {}, baseURI: 'https://example.test/bahasa-studio/' },
    URL,
    console,
    Set,
    Array,
    Number,
    String,
    RegExp
};
vm.runInNewContext(source, sandbox);
const manager = sandbox.window.OfflineAudioManager;

test('selects only valid unique audio entries for a requested level', () => {
    const entries = [
        { id: 'aaaaaaaaaaaa', levels: ['A1'] },
        { id: 'bbbbbbbbbbbb', levels: ['A2', 'B1'] },
        { id: 'aaaaaaaaaaaa', levels: ['A1'] },
        { id: '../invalid-id', levels: ['A1'] },
        { id: 'cccccccccccc', levels: ['B1'] }
    ];
    assert.deepEqual(Array.from(manager.selectEntries(entries, 'A1'), item => item.id), ['aaaaaaaaaaaa']);
    assert.deepEqual(Array.from(manager.selectEntries(entries, 'A2'), item => item.id), ['bbbbbbbbbbbb']);
    assert.deepEqual(Array.from(manager.selectEntries(entries, 'B1'), item => item.id), ['bbbbbbbbbbbb', 'cccccccccccc']);
});

test('all-level selection deduplicates shared entries', () => {
    const entries = [
        { id: 'aaaaaaaaaaaa', levels: ['A1', 'A2'] },
        { id: 'bbbbbbbbbbbb', levels: ['B1'] },
        { id: 'aaaaaaaaaaaa', levels: ['A2'] }
    ];
    assert.deepEqual(Array.from(manager.selectEntries(entries, 'all'), item => item.id), ['aaaaaaaaaaaa', 'bbbbbbbbbbbb']);
});

test('extracts cached clip IDs only from matching audio paths', () => {
    const keys = [
        new Request('https://example.test/bahasa-studio/audio/id/aaaaaaaaaaaa.mp3'),
        new Request('https://example.test/bahasa-studio/audio/id/bbbbbbbbbbbb.mp3?x=1'),
        new Request('https://example.test/bahasa-studio/audio/id/not-an-id.mp3'),
        new Request('https://example.test/bahasa-studio/audio/id/cccccccccccc.opus')
    ];
    assert.deepEqual(Array.from(manager.idsFromCacheKeys(keys, 'id')).sort(), ['aaaaaaaaaaaa', 'bbbbbbbbbbbb']);
    assert.deepEqual(Array.from(manager.idsFromCacheKeys([
        new Request('https://example.test/bahasa-studio/audio/pt-BR/aaaaaaaaaaaa.mp3'),
        new Request('https://example.test/bahasa-studio/audio/id/bbbbbbbbbbbb.mp3')
    ], 'pt-BR')), ['aaaaaaaaaaaa']);
});

test('resolves language-specific audio routes, inventory and cache names safely', () => {
    assert.equal(manager.audioUrl('aaaaaaaaaaaa', 'id'), 'https://example.test/bahasa-studio/audio/id/aaaaaaaaaaaa.mp3');
    assert.equal(manager.audioUrl('aaaaaaaaaaaa', 'pt-BR'), 'https://example.test/bahasa-studio/audio/pt-BR/aaaaaaaaaaaa.mp3');
    assert.equal(manager.cacheNameForLanguage('id'), 'guardi-audio-v2');
    assert.equal(manager.cacheNameForLanguage('pt-BR'), 'guardi-audio-v2-pt-BR');
    assert.deepEqual(JSON.parse(JSON.stringify(manager.inventoryUrlsForLanguage('id'))), { manifest: './audio/manifest.json', metadata: './audio/metadata.json' });
    assert.deepEqual(JSON.parse(JSON.stringify(manager.inventoryUrlsForLanguage('pt-BR'))), { manifest: './audio/pt-BR/manifest.json', metadata: './audio/pt-BR/metadata.json' });
    assert.equal(manager.cacheNameForLanguage('../id'), 'guardi-audio-v2');
});

test('formats storage values without claiming unknown sizes', () => {
    assert.equal(manager.formatBytes(1024), '1 KB');
    assert.equal(manager.formatBytes(2 * 1024 * 1024), '2,0 MB');
    assert.equal(manager.formatBytes(null), null);
});
