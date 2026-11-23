'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'progress-namespace.js'), 'utf8');
const sandbox = { window: {}, Object, Set, String, Error, Array };
vm.runInNewContext(source, sandbox);
const Namespace = sandbox.window.ProgressNamespace;

test('SRS and progress keys are namespaced without changing legacy Indonesian keys', () => {
    assert.equal(Namespace.storageKey('srs', 'vocab_1', 'id'), 'vocab_1');
    assert.equal(Namespace.storageKey('srs', 'vocab_1', 'pt-BR'), 'pt-BR::vocab_1');
    assert.equal(Namespace.storageKey('progress', 'unit_1', 'en'), 'en::unit_1');
});

test('course settings are namespaced while device-wide preferences remain shared', () => {
    assert.equal(Namespace.storageKey('settings', 'userXp', 'pt-BR'), 'pt-BR::userXp');
    assert.equal(Namespace.storageKey('settings', 'completedUnits', 'en'), 'en::completedUnits');
    assert.equal(Namespace.storageKey('settings', 'audioPlaybackRate', 'pt-BR'), 'audioPlaybackRate');
    assert.equal(Namespace.storageKey('settings', 'activeLanguage', 'pt-BR'), 'activeLanguage');
});

test('reads only the active language SRS entries and exposes their original logical IDs', () => {
    const records = [
        { key: 'vocab_1', val: { repetition: 2 } },
        { key: 'pt-BR::vocab_1', val: { repetition: 4 } },
        { key: 'en::vocab_1', val: { repetition: 7 } }
    ];
    const id = Namespace.filterRecords('srs', records, 'id');
    const pt = Namespace.filterRecords('srs', records, 'pt-BR');
    const en = Namespace.filterRecords('srs', records, 'en');
    assert.equal(id.length, 1);
    assert.equal(pt.length, 1);
    assert.equal(en.length, 1);
    assert.equal(pt[0].key, 'vocab_1');
    assert.equal(pt[0].val.repetition, 4);
    assert.equal(en[0].val.repetition, 7);
});

test('rejects unknown language codes before building storage keys', () => {
    assert.throws(() => Namespace.storageKey('srs', 'vocab_1', '../id'), /no soportado/);
    assert.throws(() => Namespace.filterRecords('srs', [], 'xx'), /no soportado/);
});
