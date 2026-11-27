'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

function load(file) {
    const root = {};
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), { window: root, Object, Map, Set, Array });
    return root;
}

test('English A1 units 01-06 publish six complete units', () => {
    const root = load('languages/en/curriculum/a1/units-01-06.js');
    const units = root.GUARDI_CURRICULUM_BLOCKS.en.A1['01-06'].units;
    assert.equal(units.length, 6);
    assert.deepEqual(units.map(unit => unit.unitNumber), [1, 2, 3, 4, 5, 6]);
    for (const unit of units) {
        assert.equal(unit.vocab.length, 10, unit.id);
        assert.equal(unit.lessons.length, 5, unit.id);
        assert.equal(unit.exercises.length, 10, unit.id);
        assert.ok(unit.title.startsWith('Unit '), unit.id);
        for (const word of unit.vocab) {
            assert.equal(word.verification.status, 'not_checked', word.id);
            assert.ok(word.target && word.esp, word.id);
        }
    }
});

test('English A1 manifest covers exactly the first six authored units', () => {
    const root = load('languages/en/curriculum/a1/index.js');
    const manifest = root.GUARDI_CURRICULUM_MANIFESTS.en.A1;
    assert.equal(manifest.language, 'en');
    assert.equal(manifest.totalUnits, 24);
    assert.deepEqual(manifest.publishedUnits, [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(manifest.blocks[0].units, [1, 2, 3, 4, 5, 6]);
});
