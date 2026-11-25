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

test('initialization restores the study language while keeping the Spanish application language', async () => {
    const { api, values, document } = createManager({ guardi_active_language: 'id' });
    const writes = [];
    const selected = await api.init({
        read: async () => 'id',
        write: async code => writes.push(code),
        onChange: () => {}
    });
    assert.equal(selected, 'id');
    assert.equal(document.documentElement.lang, 'es');
    assert.equal(api.getLocale('id'), 'id-ID');
    assert.equal(api.getLocale('pt-BR'), 'pt-BR');
    assert.equal(api.getLocale('../id'), null);
    assert.equal(values.get('guardi_active_language'), 'id');
    assert.deepEqual(writes, []);
});

test('restored language can be applied without a redundant persistence write', async () => {
    const { api } = createManager();
    const writes = [];
    const changes = [];
    await api.init({ read: async () => 'id', write: async code => writes.push(code), onChange: code => changes.push(code) });
    await api.setActiveLanguage('id');
    assert.deepEqual(writes, ['id'], 'normal language selection must remain persistent by default');
    writes.length = 0;
    changes.length = 0;
    await api.setActiveLanguage('id', { persist: false });
    assert.deepEqual(writes, [], 'the backup transaction already persisted the active language');
    assert.deepEqual(changes, ['id']);
    assert.equal(api.getActiveLanguage(), 'id');
});

test('unknown stored values fall back safely to Indonesian', async () => {
    const { api, document } = createManager({ guardi_active_language: '../unknown' });
    assert.equal(await api.init({ read: async () => null, write: async () => {}, onChange: () => {} }), 'id');
    assert.equal(document.documentElement.lang, 'es');
});


test('a supported but not yet implemented course cannot become active through stale local storage', async () => {
    const { api, document, values } = createManager({ guardi_active_language: 'pt-BR' });
    assert.equal(await api.init({ read: async () => null, write: async () => {}, onChange: () => {} }), 'id');
    assert.equal(document.documentElement.lang, 'es');
    assert.equal(values.get('guardi_active_language'), 'id');
});


test('main learning screen exposes the catalog in an accessible language sheet', () => {
    const indexSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    assert.doesNotMatch(indexSource, /id="studyLanguageSelect"/,
        'the oversized select must be removed');
    assert.match(indexSource, /id="studyLanguageTrigger"/);
    assert.match(indexSource, /id="studyLanguageFlag"/);
    assert.match(indexSource, /aria-controls="studyLanguageSheetOverlay"/);
    const routeStart = indexSource.indexOf('<main id="view-route"');
    const routeEnd = indexSource.indexOf('</main>', routeStart);
    const profileStart = indexSource.indexOf('<main id="view-profile"');
    const profileEnd = indexSource.indexOf('</main>', profileStart);
    const route = indexSource.slice(routeStart, routeEnd);
    assert.ok(routeStart >= 0 && route.includes('id="studyLanguageSheetOverlay"'),
        'the language sheet belongs to the learning view');
    assert.match(route, /role="dialog"/);
    assert.match(route, /aria-modal="true"/);
    assert.ok(profileStart >= 0 && !indexSource.slice(profileStart, profileEnd).includes('studyLanguageTrigger'),
        'profile should not contain the primary language selector');
    assert.match(indexSource, /const languages = LanguageManager\.list\(\)/);
    assert.match(indexSource, /const available = languages\.filter\(language => language\.available\)/);
    assert.match(indexSource, /const upcoming = languages\.filter\(language => !language\.available\)/);
    assert.match(indexSource, /availableSection\.hidden = available\.length < 2/);
    assert.match(indexSource, /row\.setAttribute\('aria-disabled', 'true'\)/);
    assert.match(indexSource, /soon\.textContent = 'Pronto'/);
    assert.match(indexSource, /async setStudyLanguage\(code\)/);
    assert.match(indexSource, /await LanguageManager\.setActiveLanguage\(code\)/);
    assert.match(indexSource, /window\.location\.reload\(\)/);
    assert.match(indexSource, /this\.getLearningLevelProgress\(level\)/);
    assert.match(indexSource, /levelProgressPercent\) levelProgressPercent\.textContent = levelPercent \+ '%'/);
});
