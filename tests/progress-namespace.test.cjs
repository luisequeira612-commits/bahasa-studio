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
    const schedules = {
        id: { attempts: 2, correct: 2, incorrect: 0, interval: 6, repetition: 2, efactor: 2.6, nextReview: 1700000000000, lastReviewed: 1699900000000 },
        pt: { attempts: 4, correct: 3, incorrect: 1, interval: 3, repetition: 1, efactor: 2.1, nextReview: 1700100000000, lastReviewed: 1700000000000 },
        en: { attempts: 7, correct: 4, incorrect: 3, interval: 1, repetition: 0, efactor: 1.8, nextReview: 1700200000000, lastReviewed: 1700100000000 }
    };
    const records = [
        { key: 'vocab_1', val: schedules.id },
        { key: 'pt-BR::vocab_1', val: schedules.pt },
        { key: 'en::vocab_1', val: schedules.en }
    ];
    const id = Namespace.filterRecords('srs', records, 'id');
    const pt = Namespace.filterRecords('srs', records, 'pt-BR');
    const en = Namespace.filterRecords('srs', records, 'en');
    assert.equal(id.length, 1);
    assert.equal(pt.length, 1);
    assert.equal(en.length, 1);
    assert.equal(pt[0].key, 'vocab_1');
    assert.deepEqual(id[0].val, schedules.id, 'legacy Indonesian scheduling remains attached to its unprefixed key');
    assert.deepEqual(pt[0].val, schedules.pt, 'Portuguese due date, interval and ease remain independent');
    assert.deepEqual(en[0].val, schedules.en, 'English due date, interval and ease remain independent');
    assert.notEqual(pt[0].val.nextReview, en[0].val.nextReview);
    assert.notEqual(pt[0].val.efactor, en[0].val.efactor);
});

test('rejects unknown language codes before building storage keys', () => {
    assert.throws(() => Namespace.storageKey('srs', 'vocab_1', '../id'), /no soportado/);
    assert.throws(() => Namespace.filterRecords('srs', [], 'xx'), /no soportado/);
});
