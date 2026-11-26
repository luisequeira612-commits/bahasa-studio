'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const loaderSource = fs.readFileSync(path.join(__dirname, '..', 'curriculum-loader.js'), 'utf8');
const root = {};
vm.runInNewContext(loaderSource, { window: root, Object, Map, Set, Promise, Error, String, Number, Array });

const validManifest = {
    id: 'A1',
    language: 'xx',
    title: 'A1 — Curso de prueba',
    totalUnits: 4,
    publishedUnits: [1, 2, 3],
    blocks: [
        { id: '01-02', path: './languages/xx/curriculum/a1/units-01-02.js', units: [1, 2] },
        { id: '03', path: './languages/xx/curriculum/a1/units-03.js', units: [3] }
    ]
};

test('a partial future curriculum manifest is valid before all units are published', () => {
    const result = root.CurriculumLoader.validateManifest(validManifest);
    assert.equal(result.valid, true, result.errors.join(', '));
});

test('the three existing Brazilian Portuguese manifests satisfy the shared contract', () => {
    for (const level of ['a1', 'a2', 'b1']) {
        const file = path.join(__dirname, '..', 'languages', 'pt-BR', 'curriculum', level, 'index.js');
        const context = { window: {} };
        vm.runInNewContext(fs.readFileSync(file, 'utf8'), context);
        const manifest = context.window.GUARDI_CURRICULUM_MANIFESTS['pt-BR'][level.toUpperCase()];
        const result = root.CurriculumLoader.validateManifest(manifest);
        assert.equal(result.valid, true, level + ': ' + result.errors.join(', '));
    }
});

test('manifest validation rejects duplicate, out-of-range and uncovered published units', () => {
    const invalid = {
        ...validManifest,
        publishedUnits: [1, 1, 5],
        blocks: [{ id: '01', path: './languages/xx/a.js', units: [1, 2] }]
    };
    const result = root.CurriculumLoader.validateManifest(invalid);
    assert.equal(result.valid, false);
    assert.ok(result.errors.includes('publishedUnit_duplicate:1'));
    assert.ok(result.errors.includes('publishedUnit_invalid:5'));
    assert.ok(result.errors.includes('publishedUnit_uncovered:1') === false);
    assert.ok(result.errors.includes('publishedUnit_uncovered:5'));
});

test('manifest validation rejects duplicate block identifiers, overlapping units and unsafe paths', () => {
    const invalid = {
        ...validManifest,
        blocks: [
            { id: 'same', path: './languages/xx/a.js', units: [1, 2] },
            { id: 'same', path: '../outside.js', units: [2, 3] }
        ]
    };
    const result = root.CurriculumLoader.validateManifest(invalid);
    assert.equal(result.valid, false);
    assert.ok(result.errors.includes('block_id_duplicate:same'));
    assert.ok(result.errors.includes('block_unit_overlap:2'));
    assert.ok(result.errors.includes('block_path_invalid:same'));
});

test('manifest validation rejects missing titles and empty manifests', () => {
    const result = root.CurriculumLoader.validateManifest({ title: '', totalUnits: 0, publishedUnits: [], blocks: [] });
    assert.equal(result.valid, false);
    assert.ok(result.errors.includes('title_required'));
    assert.ok(result.errors.includes('totalUnits_invalid'));
    assert.ok(result.errors.includes('publishedUnits_required'));
    assert.ok(result.errors.includes('blocks_required'));
});


test('loadUnits accepts published units above 40 when they are within manifest totalUnits', async () => {
    const root = {};
    root.LanguageManager = {
        getLanguage: () => ({ curriculum: { A1: './languages/xx/curriculum/a1/index.js' } }),
        isSupported: code => code === 'xx'
    };
    root.GUARDI_CURRICULUM_MANIFESTS = {
        xx: {
            A1: {
                title: 'A1 — Curso de prueba',
                totalUnits: 45,
                publishedUnits: [41, 45],
                blocks: [{ id: '41-45', path: './languages/xx/curriculum/a1/units-41-45.js', units: [41, 45] }]
            }
        }
    };
    root.document = {
        createElement: () => ({}),
        head: {
            appendChild: script => {
                root.GUARDI_CURRICULUM_BLOCKS = {
                    xx: { A1: { '41-45': { units: [{ unitNumber: 41 }, { unitNumber: 45 }] } } }
                };
                script.onload();
            }
        }
    };
    const sandbox = { window: root, Object, Map, Set, Promise, Error, String, Number, Array };
    vm.runInNewContext(loaderSource, sandbox);

    const curriculum = await root.CurriculumLoader.loadUnits('xx', 'A1', [41, 45]);
    assert.deepEqual(Array.from(curriculum.units, unit => unit.unitNumber), [41, 45]);
    assert.equal(curriculum.totalUnits, 45);
});

test('loadUnits still rejects unit numbers above the manifest total', async () => {
    const root = {};
    root.LanguageManager = {
        getLanguage: () => ({ curriculum: { A1: './languages/xx/curriculum/a1/index.js' } }),
        isSupported: code => code === 'xx'
    };
    root.GUARDI_CURRICULUM_MANIFESTS = {
        xx: {
            A1: {
                title: 'A1 — Curso de prueba',
                totalUnits: 45,
                publishedUnits: [45],
                blocks: [{ id: '45', path: './languages/xx/curriculum/a1/units-45.js', units: [45] }]
            }
        }
    };
    const sandbox = { window: root, Object, Map, Set, Promise, Error, String, Number, Array };
    vm.runInNewContext(loaderSource, sandbox);

    await assert.rejects(
        root.CurriculumLoader.loadUnits('xx', 'A1', [46]),
        /La selección de unidades no es válida/
    );
});
