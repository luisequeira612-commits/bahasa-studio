const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'service-worker.js'), 'utf8');
const ORIGIN = 'https://example.test';
const APP_CACHE = 'bahasa-studio-v3.8.98';
const AUDIO_CACHE = 'guardi-audio-v1';
const METADATA_URL = `${ORIGIN}/bahasa-studio/audio/metadata.json`;

class MemoryCache {
    constructor(entries = []) {
        this.entries = new Map(entries.map(([url, response]) => [url, response.clone()]));
    }
    async match(request) {
        const response = this.entries.get(typeof request === 'string' ? request : request.url);
        return response ? response.clone() : null;
    }
    async put(request, response) {
        this.entries.set(request.url, response.clone());
    }
    async keys() {
        return [...this.entries.keys()].map(url => new Request(url));
    }
    async delete(request) {
        return this.entries.delete(typeof request === 'string' ? request : request.url);
    }
}

function clipUrl(id) {
    return `${ORIGIN}/bahasa-studio/audio/id/${id}.mp3`;
}

function createWorker({
    currentRevision = 1,
    previousRevision = 1,
    currentMetadata = true,
    audioClips = [],
    legacyClips = [],
    failDelete = false,
    fetchImpl = async () => new Response('fresh audio', { status: 200, headers: { 'Content-Type': 'audio/mpeg' } })
} = {}) {
    const handlers = {};
    const currentEntries = currentMetadata
        ? [[METADATA_URL, new Response(JSON.stringify({ content_revision: currentRevision }), { status: 200 })]]
        : [];
    const audioEntries = audioClips.map(([id, text]) => [clipUrl(id), new Response(text, { status: 200 })]);
    if (previousRevision !== null) {
        audioEntries.push([METADATA_URL, new Response(JSON.stringify({ content_revision: previousRevision }), { status: 200 })]);
    }
    const cacheStore = new Map([
        [APP_CACHE, new MemoryCache(currentEntries)],
        [AUDIO_CACHE, new MemoryCache(audioEntries)],
        ['bahasa-studio-v3.8.97', new MemoryCache(legacyClips.map(([id, text]) => [
            clipUrl(id), new Response(text, { status: 200, headers: { 'Content-Type': 'audio/mpeg' } })
        ]))]
    ]);
    let claimCalls = 0;
    const caches = {
        open: async name => {
            if (!cacheStore.has(name)) cacheStore.set(name, new MemoryCache());
            return cacheStore.get(name);
        },
        keys: async () => [...cacheStore.keys()],
        delete: async name => {
            if (failDelete && name.startsWith('bahasa-studio-')) throw new Error('simulated delete failure');
            return cacheStore.delete(name);
        }
    };
    const self = {
        location: { origin: ORIGIN, href: `${ORIGIN}/bahasa-studio/service-worker.js` },
        addEventListener: (name, handler) => { handlers[name] = handler; },
        skipWaiting: () => {},
        clients: { claim: async () => { claimCalls++; } }
    };
    const sandbox = { self, caches, fetch: fetchImpl, Response, Request, Headers, Promise, URL, Map };
    vm.runInNewContext(source, sandbox);
    return { handlers, cacheStore, get claimCalls() { return claimCalls; } };
}

async function activate(worker) {
    let promise;
    worker.handlers.activate({ waitUntil: value => { promise = value; } });
    await promise;
}

test('la misma revisión conserva clips cacheados y migra clips nuevos', async () => {
    const worker = createWorker({
        currentRevision: 1,
        previousRevision: 1,
        audioClips: [['kept', 'cached audio']],
        legacyClips: [['migrate', 'legacy audio']]
    });
    await activate(worker);
    const audioCache = worker.cacheStore.get(AUDIO_CACHE);
    assert.equal(await (await audioCache.match(new Request(clipUrl('kept')))).text(), 'cached audio');
    assert.equal(await (await audioCache.match(new Request(clipUrl('migrate')))).text(), 'legacy audio');
    assert.equal(worker.cacheStore.has('bahasa-studio-v3.8.97'), false);
    assert.equal(JSON.parse(await (await audioCache.match(new Request(METADATA_URL))).text()).content_revision, 1);
    assert.equal(worker.claimCalls, 1);
});

test('cambiar content_revision purga MP3 antiguos y no los vuelve a migrar', async () => {
    const worker = createWorker({
        currentRevision: 2,
        previousRevision: 1,
        audioClips: [['stale-cache', 'old cached audio']],
        legacyClips: [['stale-legacy', 'old legacy audio']]
    });
    await activate(worker);
    const audioCache = worker.cacheStore.get(AUDIO_CACHE);
    assert.equal(await audioCache.match(new Request(clipUrl('stale-cache'))), null);
    assert.equal(await audioCache.match(new Request(clipUrl('stale-legacy'))), null);
    assert.equal(worker.cacheStore.has('bahasa-studio-v3.8.97'), false);
    assert.equal(JSON.parse(await (await audioCache.match(new Request(METADATA_URL))).text()).content_revision, 2);
});

test('una revisión mayor que uno sin marcador previo también invalida clips antiguos', async () => {
    const worker = createWorker({
        currentRevision: 3,
        previousRevision: null,
        audioClips: [['old-without-marker', 'possibly stale']]
    });
    await activate(worker);
    const audioCache = worker.cacheStore.get(AUDIO_CACHE);
    assert.equal(await audioCache.match(new Request(clipUrl('old-without-marker'))), null);
    assert.equal(JSON.parse(await (await audioCache.match(new Request(METADATA_URL))).text()).content_revision, 3);
});

test('si no se pueden borrar cachés antiguas, no sirve clips viejos desde ellas', async () => {
    const worker = createWorker({
        currentRevision: 2,
        previousRevision: 1,
        audioClips: [['cached-old', 'old cached audio']],
        legacyClips: [['legacy-old', 'old legacy audio']],
        failDelete: true,
        fetchImpl: async () => new Response('fresh audio', { status: 200, headers: { 'Content-Type': 'audio/mpeg' } })
    });
    await activate(worker);
    assert.equal(worker.cacheStore.has('bahasa-studio-v3.8.97'), true);

    let responsePromise;
    let lifetimePromise;
    worker.handlers.fetch({
        request: new Request(clipUrl('legacy-old')),
        waitUntil: promise => { lifetimePromise = promise; },
        respondWith: promise => { responsePromise = promise; }
    });
    const response = await responsePromise;
    await lifetimePromise;
    assert.equal(response.status, 200);
    assert.equal(await response.text(), 'fresh audio');
});

test('si falta metadata, conserva las cachés y evita servir clips potencialmente obsoletos', async () => {
    const worker = createWorker({
        currentMetadata: false,
        currentRevision: 2,
        previousRevision: 1,
        audioClips: [['stale', 'old cached audio']],
        legacyClips: [['legacy', 'old legacy audio']],
        fetchImpl: async request => {
            assert.equal(request.headers.has('range'), false);
            return new Response('fresh audio', { status: 200, headers: { 'Content-Type': 'audio/mpeg' } });
        }
    });
    await activate(worker);
    assert.equal(worker.cacheStore.has('bahasa-studio-v3.8.97'), true);

    let responsePromise;
    let lifetimePromise;
    worker.handlers.fetch({
        request: new Request(clipUrl('stale')),
        waitUntil: promise => { lifetimePromise = promise; },
        respondWith: promise => { responsePromise = promise; }
    });
    const response = await responsePromise;
    await lifetimePromise;
    assert.equal(response.status, 200);
    assert.equal(await response.text(), 'fresh audio');
});
