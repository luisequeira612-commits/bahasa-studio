'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const managerSource = fs.readFileSync(path.join(__dirname, '..', 'language-manager.js'), 'utf8');
const loaderSource = fs.readFileSync(path.join(__dirname, '..', 'curriculum-loader.js'), 'utf8');

function createLoader() {
    const window = {
        document: { documentElement: { lang: 'es' } },
        localStorage: { getItem() { return 'id'; }, setItem() {} },
        BAHASA_CURRICULUM_A1: { id: 'A1', units: [{ id: 'a1_u1' }] },
        BAHASA_CURRICULUM_A2: { id: 'A2', units: [{ id: 'a2_u1' }] }
    };
    const sandbox = { window, Object, Map, Promise, Error, String };
    vm.runInNewContext(managerSource, sandbox);
    vm.runInNewContext(loaderSource, sandbox);
    return window.CurriculumLoader;
}

test('resolves only explicitly registered legacy Indonesian curriculum files', () => {
    const loader = createLoader();
    assert.deepEqual(JSON.parse(JSON.stringify(loader.resolve('id', 'A1'))), {
        language: 'id', level: 'A1', path: './curriculum-a1.js', exportName: 'BAHASA_CURRICULUM_A1'
    });
    assert.equal(loader.resolve('pt-BR', 'A1'), null);
    assert.equal(loader.resolve('../id', 'A1'), null);
    assert.equal(loader.resolve('id', 'C1'), null);
});

test('returns already loaded Indonesian curriculum without network or script injection', async () => {
    const loader = createLoader();
    const curriculum = await loader.load('id', 'A1');
    assert.equal(curriculum.id, 'A1');
    assert.equal(curriculum.units[0].id, 'a1_u1');
});

test('rejects unavailable language curricula instead of falling back to Indonesian silently', async () => {
    const loader = createLoader();
    await assert.rejects(loader.load('pt-BR', 'A1'), /currículo solicitado não está disponível/);
});


test('supports a language-specific registry export when a future course is enabled', async () => {
    const window = {
        GUARDI_CURRICULA: { 'pt-BR': { A1: { id: 'pt-BR-A1', units: [] } } },
        LanguageManager: {
            getLanguage(code) {
                return code === 'pt-BR' ? { curriculum: { A1: './languages/pt-BR/curriculum-a1.js' } } : null;
            },
            isAvailable(code) { return code === 'pt-BR'; }
        }
    };
    const sandbox = { window, Object, Map, Promise, Error, String };
    vm.runInNewContext(loaderSource, sandbox);
    const curriculum = await window.CurriculumLoader.load('pt-BR', 'A1');
    assert.equal(curriculum.id, 'pt-BR-A1');
});
