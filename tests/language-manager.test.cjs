'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'language-manager.js'), 'utf8');
function createManager(initial = {}) {
    const values = new Map(Object.entries(initial));
    const document = { documentElement: { lang: 'es' } };
    const localStorage = {
        getItem(key) { return values.has(key) ? values.get(key) : null; },
        setItem(key, value) { values.set(key, String(value)); }
    };
    const sandbox = { window: { document, localStorage }, Object, Set, String, Error, Promise };
    vm.runInNewContext(source, sandbox);
    return { api: sandbox.window.LanguageManager, values, document };
}

test('registers the ten approved languages with explicit locale, voice candidate and audio path', () => {
    const { api } = createManager();
    assert.equal(api.list().length, 10);
    for (const code of ['pt-BR', 'en', 'it', 'fr', 'de', 'nl', 'ru', 'ja', 'ko', 'id']) {
        assert.equal(api.isSupported(code), true);
        assert.ok(api.getLanguage(code).locale);
        assert.ok(api.getLanguage(code).flag);
        assert.ok(api.getLanguage(code).piperVoice);
        assert.ok(api.getLanguage(code).audioPath.startsWith('./audio/'));
    }
});

test('Indonesian remains the only selectable course until another curriculum is implemented', async () => {
    const { api } = createManager();
    assert.equal(await api.init(), 'id');
    assert.equal(api.isAvailable('id'), true);
    assert.equal(api.isAvailable('pt-BR'), false);
    await assert.rejects(api.setActiveLanguage('pt-BR'), /curso todavía no está disponible/);
    await assert.rejects(api.setActiveLanguage('xx'), /Código de idioma no soportado/);
});

test('initialization restores the persisted language and updates html lang', async () => {
    const { api, values, document } = createManager({ guardi_active_language: 'id' });
    const writes = [];
    const selected = await api.init({
        read: async () => 'id',
        write: async code => writes.push(code),
        onChange: () => {}
    });
    assert.equal(selected, 'id');
    assert.equal(document.documentElement.lang, 'id-ID');
    assert.equal(values.get('guardi_active_language'), 'id');
    assert.deepEqual(writes, []);
});

test('unknown stored values fall back safely to Indonesian', async () => {
    const { api, document } = createManager({ guardi_active_language: '../unknown' });
    assert.equal(await api.init({ read: async () => null, write: async () => {}, onChange: () => {} }), 'id');
    assert.equal(document.documentElement.lang, 'id-ID');
});


test('a supported but not yet implemented course cannot become active through stale local storage', async () => {
    const { api, document, values } = createManager({ guardi_active_language: 'pt-BR' });
    assert.equal(await api.init({ read: async () => null, write: async () => {}, onChange: () => {} }), 'id');
    assert.equal(document.documentElement.lang, 'id-ID');
    assert.equal(values.get('guardi_active_language'), 'id');
});
