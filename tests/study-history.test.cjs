'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'study-history.js'), 'utf8');

function createHistory(initial = {}) {
    const values = new Map(Object.entries(initial));
    const localStorage = {
        getItem(key) { return values.has(key) ? values.get(key) : null; },
        setItem(key, value) { values.set(key, String(value)); },
        removeItem(key) { values.delete(key); }
    };
    const sandbox = { window: { localStorage }, Date, Map, JSON, Number, String, Math };
    vm.runInNewContext(source, sandbox);
    return { api: sandbox.window.StudyHistory, values };
}

function localDate(year, month, day) {
    return new Date(year, month - 1, day, 12);
}

test('records daily XP, lessons and reviews separately from the v3 study activity object', () => {
    const { api, values } = createHistory();
    const day = localDate(2026, 11, 2);
    assert.equal(api.record('points', 25, day), true);
    assert.equal(api.record('lesson', 0, day), true);
    assert.equal(api.record('review', 0, day), true);
    const [today] = api.getRecentDays(1, day);
    assert.deepEqual(JSON.parse(JSON.stringify(today)), {
        date: '2026-11-02', xp: 25, lessons: 1, reviews: 1, attempts: 0, correct: 0, sessions: 0
    });
    assert.ok(values.has('bahasaStudioStudyHistoryV1'));
});

test('records scored skill attempts and free writing or conversation sessions without saving text', () => {
    const { api } = createHistory();
    const day = localDate(2026, 11, 2);
    assert.equal(api.recordSkill('translation', true, day), true);
    assert.equal(api.recordSkill('listening', false, day), true);
    assert.equal(api.recordSession('writing', day), true);
    assert.equal(api.recordSession('conversation', day), true);
    assert.equal(api.recordSession('recognition', day), false);
    const [today] = api.getRecentDays(1, day);
    assert.equal(today.attempts, 2);
    assert.equal(today.correct, 1);
    assert.equal(today.sessions, 2);
});

test('history is bounded to the latest 30 calendar days', () => {
    const { api, values } = createHistory();
    const start = localDate(2026, 10, 1);
    for (let offset = 0; offset < 45; offset++) {
        const day = new Date(start);
        day.setDate(day.getDate() + offset);
        api.record('points', 1, day);
    }
    const stored = JSON.parse(values.get('bahasaStudioStudyHistoryV1'));
    assert.equal(stored.days.length, 30);
    assert.equal(stored.days[0].date, '2026-10-16');
    assert.equal(stored.days[29].date, '2026-11-14');
});

test('recent day series fills missing dates with zeros and follows local calendar dates', () => {
    const { api } = createHistory();
    const first = localDate(2026, 11, 1);
    const last = localDate(2026, 11, 3);
    api.record('points', 10, first);
    api.record('lesson', 0, last);
    const days = api.getRecentDays(3, last);
    assert.deepEqual(Array.from(days, day => day.date), ['2026-11-01', '2026-11-02', '2026-11-03']);
    assert.deepEqual(Array.from(days, day => day.xp), [10, 0, 0]);
    assert.deepEqual(Array.from(days, day => day.lessons), [0, 0, 1]);
});

test('malformed storage is ignored and storage failures never interrupt study activity', () => {
    const { api } = createHistory({ bahasaStudioStudyHistoryV1: '{broken' });
    const day = localDate(2026, 11, 2);
    assert.equal(api.record('points', 5, day), true);
    assert.equal(api.getRecentDays(1, day)[0].xp, 5);

    const sandbox = { window: { get localStorage() { throw new Error('blocked'); } }, Date, Map, JSON, Number, String, Math };
    vm.runInNewContext(source, sandbox);
    assert.equal(sandbox.window.StudyHistory.record('points', 5, day), false);
    assert.equal(sandbox.window.StudyHistory.getRecentDays(1, day)[0].xp, 0);
});

test('invalid event types, skills and counters do not create misleading history', () => {
    const { api } = createHistory();
    const day = localDate(2026, 11, 2);
    assert.equal(api.record('unknown', 10, day), false);
    assert.equal(api.record('points', -1, day), false);
    assert.equal(api.recordSkill('unknown', true, day), false);
    assert.equal(api.recordSkill('writing', 'yes', day), false);
    assert.equal(api.recordSession('listening', day), false);
    const [today] = api.getRecentDays(1, day);
    assert.equal(today.xp, 0);
    assert.equal(today.attempts, 0);
    assert.equal(today.sessions, 0);
});

test('profile, service worker and CI include the history module and its regression suite', () => {
    const root = path.join(__dirname, '..');
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    const worker = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
    const workflow = fs.readFileSync(path.join(root, '.github', 'workflows', 'regression.yml'), 'utf8');
    assert.match(html, /<script src="\.\/study-history\.js"><\/script>/);
    assert.match(html, /StudyHistory\.record\(kind, amount, new Date\(\)\)/);
    assert.match(html, /StudyHistory\.recordSkill\(skill, isCorrect, new Date\(\)\)/);
    assert.match(html, /StudyHistory\.recordSession\(skill, new Date\(\)\)/);
    assert.match(html, /result\.sessions \+= day\.sessions/);
    assert.match(html, /totals\.sessions \+ ' sesiones de escritura\/conversación'/);
    assert.match(html, /study-history-bar--activity-only/);
    assert.match(html, /day\.sessions \+ ' sesiones de escritura\/conversación\.'/);
    assert.match(html, /StudyHistory\.clear\(\)/);
    assert.match(worker, /bahasa-studio-v3\.8\.85/);
    assert.match(worker, /'\.\/study-history\.js'/);
    assert.match(workflow, /node --test tests\/study-history\.test\.cjs/);
    assert.match(workflow, /            study-history\.js/);
});
