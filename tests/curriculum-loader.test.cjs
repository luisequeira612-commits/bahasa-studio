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
    await assert.rejects(loader.load('pt-BR', 'A1'), error => String(error).includes('no está disponible'));
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

test('retries a curriculum path after a script loads without publishing its registry entry', async () => {
    let attempts = 0;
    const window = {
        GUARDI_CURRICULA: {},
        LanguageManager: {
            getLanguage(code) {
                return code === 'pt-BR' ? { curriculum: { A1: './languages/pt-BR/curriculum-a1.js' } } : null;
            },
            isAvailable(code) { return code === 'pt-BR'; }
        },
        document: {
            createElement() { return {}; },
            head: {
                appendChild(script) {
                    attempts += 1;
                    if (attempts === 2) {
                        window.GUARDI_CURRICULA['pt-BR'] = { A1: { id: 'pt-BR-A1', units: [] } };
                    }
                    script.onload();
                }
            }
        }
    };
    const sandbox = { window, Object, Map, Promise, Error, String };
    vm.runInNewContext(loaderSource, sandbox);

    await assert.rejects(
        window.CurriculumLoader.load('pt-BR', 'A1'),
        /no publicó el currículo esperado/
    );
    const curriculum = await window.CurriculumLoader.load('pt-BR', 'A1');
    assert.equal(curriculum.id, 'pt-BR-A1');
    assert.equal(attempts, 2);
});


test('App.init resolves the active A1/A2 curricula through CurriculumLoader before audio and screens initialize', () => {
    const indexSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    const initPosition = indexSource.indexOf('await LanguageManager.init({');
    const loaderPosition = indexSource.indexOf("['A1', 'A2'].map(level => CurriculumLoader.load(activeLanguage, level))", initPosition);
    const courseAssignmentPosition = indexSource.indexOf('CourseData.levels = CourseData.levels.map', loaderPosition);
    const audioPosition = indexSource.indexOf('AudioEngine.init();', initPosition);

    assert.ok(initPosition >= 0, 'App initializes LanguageManager');
    assert.ok(loaderPosition > initPosition, 'App loads each active level through CurriculumLoader');
    assert.ok(courseAssignmentPosition > loaderPosition, 'loaded curricula replace only matching CourseData levels');
    assert.ok(audioPosition > courseAssignmentPosition, 'audio and subsequent app initialization run after course resolution');
    assert.match(indexSource.slice(loaderPosition, audioPosition), /curriculaByLevel\.get\(level\.id\) \|\| level/);
    assert.match(indexSource.slice(loaderPosition, audioPosition), /some\(level => !curriculaByLevel\.has\(level\)\)/);
});
