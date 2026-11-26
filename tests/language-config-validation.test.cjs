'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'language-manager.js'), 'utf8');

function createManager() {
    const sandbox = { window: {}, Object, Set, String, Error, Promise };
    vm.runInNewContext(source, sandbox);
    return sandbox.window.LanguageManager;
}

const futureLanguage = {
    code: 'xx',
    locale: 'xx-XX',
    name: 'Idioma de prueba',
    flag: '🌐',
    piperVoice: 'xx-test-medium',
    voiceStatus: 'candidate',
    audioPath: './audio/xx/',
    curriculum: { A1: './languages/xx/curriculum/a1/index.js' },
    available: false
};

test('the existing ten-language catalog satisfies the shared structural contract', () => {
    const manager = createManager();
    const result = manager.validateLanguageCatalog(manager.list());
    assert.equal(result.valid, true, result.errors.join(', '));
});

test('a hypothetical language can be validated without adding it to the real registry or requiring all CEFR levels', () => {
    const manager = createManager();
    const result = manager.validateLanguageConfig(futureLanguage);
    assert.equal(result.valid, true, result.errors.join(', '));
    assert.equal(manager.isSupported('xx'), false);
    assert.equal(manager.list().length, 10);
});

test('catalog validation rejects duplicate language codes', () => {
    const manager = createManager();
    const result = manager.validateLanguageCatalog([futureLanguage, { ...futureLanguage }]);
    assert.equal(result.valid, false);
    assert.ok(result.errors.includes('code_duplicate:xx'));
});

test('language validation rejects invalid voice status, CEFR key, unsafe path and selectable empty course', () => {
    const manager = createManager();
    const invalid = {
        ...futureLanguage,
        voiceStatus: 'ready',
        curriculum: { C1: '../curriculum.js' },
        available: true
    };
    const result = manager.validateLanguageConfig(invalid);
    assert.equal(result.valid, false);
    assert.ok(result.errors.includes('voiceStatus_invalid'));
    assert.ok(result.errors.includes('curriculum_level_invalid:C1'));
    assert.ok(result.errors.includes('curriculum_path_invalid:C1'));
    const selectableWithoutCourse = manager.validateLanguageConfig({ ...futureLanguage, available: true, curriculum: {} });
    assert.ok(selectableWithoutCourse.errors.includes('available_without_curriculum'));
});

test('language validation rejects missing required metadata and malformed catalog input', () => {
    const manager = createManager();
    const result = manager.validateLanguageConfig({ code: 'xx', curriculum: {}, available: false });
    assert.equal(result.valid, false);
    assert.ok(result.errors.includes('locale_required'));
    assert.equal(manager.validateLanguageCatalog(null).valid, false);
});
