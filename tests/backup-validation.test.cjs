'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

function loadValidator() {
    const match = html.match(/validateBackup\(parsed\) \{([\s\S]*?)\n\s{12}\},\n\s{12}importProgress\(e\)/);
    assert.ok(match, 'App.validateBackup must be present');
    const source = `({ validateBackup(parsed) {${match[1]}\n} })`;
    const context = {
        CourseData: { levels: [] },
        LanguageManager: { isAvailable(code) { return code === 'id'; } },
        LEGACY_SRS_ID_ALIASES: {},
        SYLLABUS: [],
        StudyActivity: { validateBackup(value) { return value === undefined ? { legacy: true } : { valid: true }; } },
        Date, Number, Set, Map, JSON, Array, Object, String, RegExp, Math
    };
    return vm.runInNewContext(source, context);
}

const validLegacyBackup = () => ({
    version: 3, xp: 25, completedUnits: ['a1_u1'], completedLessons: [],
    customUnits: [], syllabusPos: 0, srs: []
});

test('valid legacy v3 backups without language remain Indonesian', () => {
    const result = loadValidator().validateBackup(validLegacyBackup());
    assert.equal(result.version, 3);
    assert.equal(result.language, 'id');
    assert.equal(result.xp, 25);
});

test('v3 backups explicitly identify Indonesian and reject unsupported languages', () => {
    const validator = loadValidator();
    assert.equal(validator.validateBackup({ ...validLegacyBackup(), language: 'id' }).language, 'id');
    assert.throws(() => validator.validateBackup({ ...validLegacyBackup(), language: 'pt-BR' }), /idioma que todavía no está disponible/);
    assert.throws(() => validator.validateBackup({ ...validLegacyBackup(), language: 'xx' }), /idioma que todavía no está disponible/);
});

test('backup validation rejects wrong versions and unknown top-level fields', () => {
    const validator = loadValidator();
    assert.throws(() => validator.validateBackup({ ...validLegacyBackup(), version: 2 }));
    assert.throws(() => validator.validateBackup({ ...validLegacyBackup(), injected: true }));
});

test('backup validation rejects duplicate completion IDs and invalid syllabus positions', () => {
    const validator = loadValidator();
    assert.throws(() => validator.validateBackup({ ...validLegacyBackup(), completedUnits: ['a1_u1', 'a1_u1'] }));
    assert.throws(() => validator.validateBackup({ ...validLegacyBackup(), completedLessons: ['lesson-1', 'lesson-1'] }));
    assert.throws(() => validator.validateBackup({ ...validLegacyBackup(), syllabusPos: -1 }));
    assert.throws(() => validator.validateBackup({ ...validLegacyBackup(), syllabusPos: 1.5 }));
});

test('backup validation checks the optional export timestamp strictly', () => {
    const validator = loadValidator();
    assert.doesNotThrow(() => validator.validateBackup({ ...validLegacyBackup(), exportedAt: '2026-11-22T18:00:00.000Z' }));
    assert.throws(() => validator.validateBackup({ ...validLegacyBackup(), exportedAt: 'yesterday' }));
});

test('social metadata uses the deployed icon and keeps the app UI language Spanish', () => {
    assert.match(html, /<html lang="es">/);
    assert.match(html, /property="og:type" content="website"/);
    assert.match(html, /property="og:image" content="https:\/\/luisequeira612-commits\.github\.io\/bahasa-studio\/icon-512-any\.png"/);
    assert.match(html, /name="twitter:card" content="summary"/);
    assert.match(html, /name="twitter:image" content="https:\/\/luisequeira612-commits\.github\.io\/bahasa-studio\/icon-512-any\.png"/);
});

test('storage persistence request and accessible status are already wired into startup and settings', () => {
    assert.match(html, /await navigator\.storage\.persist\(\)/);
    assert.match(html, /navigator\.storage\.persisted\(\)/);
    assert.match(html, /id="storagePersistenceStatus" role="status" aria-live="polite"/);
    assert.match(html, /reduce el riesgo de que el navegador elimine los datos/);
});

test('backup replacement remains a single IndexedDB v1 transaction', () => {
    assert.match(html, /version:\s*1/);
    assert.match(html, /transaction\(\['srs', 'settings'\], 'readwrite'\)/);
    assert.match(html, /srsStore\.openCursor\(\)/);
    assert.match(html, /this\.scopedKey\('srs', item\.key, language\)/);
    assert.match(html, /ProgressNamespace\.filterRecords\(store, records, this\.activeLanguage\)/);
    assert.match(html, /LanguageManager\.init\(/);
    assert.match(html, /tx\.oncomplete/);
});
