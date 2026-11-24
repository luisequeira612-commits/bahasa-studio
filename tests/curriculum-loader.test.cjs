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



test('adapts legacy Indonesian and language-neutral vocabulary into one read-only view', () => {
    const loader = createLoader();
    const legacy = { id: 'v1', idn: 'makan', esp: 'comer', ex: 'Saya makan.', exEsp: 'Yo como.' };
    const portuguese = {
        id: 'pt-1', target: 'café da manhã', esp: 'desayuno',
        ex: 'Tomo café da manhã.', exEsp: 'Desayuno.',
        reading: 'optional reading', tokens: ['café', 'da', 'manhã'],
        verification: { status: 'not_checked', sources: [] }
    };
    const idView = loader.adaptVocabulary(legacy, 'id');
    const ptView = loader.adaptVocabulary(portuguese, 'pt-BR');

    assert.equal(idView.text, 'makan');
    assert.equal(idView.translation, 'comer');
    assert.equal(idView.example, 'Saya makan.');
    assert.equal(ptView.text, 'café da manhã');
    assert.deepEqual(JSON.parse(JSON.stringify(ptView.tokens)), ['café', 'da', 'manhã']);
    assert.equal(ptView.verification.status, 'not_checked');
    assert.equal(Object.isFrozen(idView), true);
    assert.equal(legacy.target, undefined);
    assert.equal(portuguese.idn, undefined);
});

test('does not infer Indonesian legacy fields for another language or mutate source data', () => {
    const loader = createLoader();
    const legacyOnly = { id: 'x1', idn: 'makan', esp: 'comer' };
    const before = JSON.stringify(legacyOnly);
    assert.equal(loader.adaptVocabulary(legacyOnly, 'pt-BR').text, null);
    assert.equal(loader.adaptVocabulary(legacyOnly, 'id').text, 'makan');
    assert.equal(loader.adaptVocabulary(legacyOnly, '../id'), null);
    assert.equal(loader.adaptVocabulary(null, 'id'), null);
    assert.equal(JSON.stringify(legacyOnly), before);
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


test('lesson vocabulary cards use the common adapter and the active target locale', () => {
    const indexSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    const start = indexSource.indexOf('const wordCard = v => {', indexSource.indexOf('renderIntro()'));
    const end = indexSource.indexOf('document.getElementById(\'exerciseArea\').innerHTML', start);
    const renderer = indexSource.slice(start, end);

    assert.ok(start >= 0, 'lesson intro defines its vocabulary card renderer');
    assert.match(renderer, /CurriculumLoader\\.adaptVocabulary\\(v, language\\)/);
    assert.match(renderer, /LanguageManager\\.getLocale\\(language\\)/);
    assert.match(renderer, /word\\.reading/);
    assert.match(renderer, /word\\.transliteration/);
    assert.match(renderer, /lang="\\$\\{App\\.escapeHtml\\(locale\\)\\}"/);
    assert.doesNotMatch(renderer, /v\\.idn|lang="id"/);
});
