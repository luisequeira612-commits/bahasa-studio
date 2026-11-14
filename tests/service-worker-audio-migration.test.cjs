const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { createHash, webcrypto } = require('node:crypto');
const hash = value => createHash('sha256').update(value).digest('hex');

const source = require('node:fs').readFileSync(require('node:path').join(__dirname, '..', 'service-worker.js'), 'utf8');
const ORIGIN = 'https://example.test/';
const metadataUrl = new URL('./audio/metadata.json', ORIGIN).href;
const markerUrl = new URL('./__audio_revision__.json', ORIGIN).href;
const clipUrl = new URL('./audio/id/0123456789ab.mp3', ORIGIN).href;

class MemoryCache {
    constructor() { this.entries = new Map(); this.failPut = false; }
    async match(request) { return this.entries.get(typeof request === 'string' ? request : request.url)?.clone() || undefined; }
    async put(request, response) {
        if (this.failPut) throw new Error('simulated quota failure');
        this.entries.set(typeof request === 'string' ? request : request.url, response.clone());
    }
    async delete(request) { return this.entries.delete(typeof request === 'string' ? request : request.url); }
    async keys() { return [...this.entries.keys()].map(url => new Request(url)); }
}

function createWorker({ currentHashes, legacyHashes, oldClipStatus = 200, failAudioPut = false, existingAudioMarker } = {}) {
    const handlers = {};
    const cachesByName = new Map();
    const app = new MemoryCache();
    const legacy = new MemoryCache();
    const audio = new MemoryCache();
    app.entries.set(metadataUrl, new Response(JSON.stringify({ engine: 'piper', audio_hashes: currentHashes })));
    if (legacyHashes !== undefined) {
        legacy.entries.set(metadataUrl, new Response(JSON.stringify({ engine: 'piper', audio_hashes: legacyHashes })));
    }
    legacy.entries.set(clipUrl, new Response('legacy audio bytes', { status: oldClipStatus }));
    if (existingAudioMarker) {
        audio.entries.set(markerUrl, new Response(JSON.stringify({ audio_hashes: existingAudioMarker })));
    }
    audio.failPut = failAudioPut;
    cachesByName.set('bahasa-studio-v3.8.95', legacy);
    cachesByName.set('bahasa-studio-v3.8.96', app);
    cachesByName.set('guardi-audio-v1', audio);
    let claimed = 0;
    const sandbox = {
        self: {
            location: { origin: 'https://example.test', href: ORIGIN },
            addEventListener: (name, handler) => { handlers[name] = handler; },
            skipWaiting: () => {},
            clients: { claim: async () => { claimed++; } }
        },
        caches: {
            open: async name => {
                if (!cachesByName.has(name)) cachesByName.set(name, new MemoryCache());
                return cachesByName.get(name);
            },
            keys: async () => [...cachesByName.keys()],
            delete: async name => cachesByName.delete(name)
        },
        Request, Response, URL, Promise, crypto: webcrypto, fetch: async () => new Response('network')
    };
    vm.runInNewContext(source, sandbox);
    return {
        activate: handlers.activate,
        fetch: handlers.fetch,
        cachesByName,
        audio,
        legacy,
        get claimed() { return claimed; }
    };
}

async function activate(worker) {
    let lifetime;
    worker.activate({ waitUntil: promise => { lifetime = promise; } });
    await lifetime;
}

test('migrates complete current MP3 clips into the independent cache before deleting legacy caches', async () => {
    const worker = createWorker({ currentHashes: { '0123456789ab': hash('legacy audio bytes') } });
    await activate(worker);
    const migrated = await worker.audio.match(new Request(clipUrl));
    assert.equal(await migrated.text(), 'legacy audio bytes');
    assert.equal(worker.cachesByName.has('bahasa-studio-v3.8.95'), false);
    assert.equal(worker.cachesByName.has('bahasa-studio-v3.8.96'), true);
    const marker = await worker.audio.match(new Request(markerUrl));
    assert.deepEqual((await marker.json()).audio_hashes, { '0123456789ab': 'hash-a' });
    assert.equal(worker.claimed, 1);
});

test('keeps legacy caches when an audio migration write fails and retries on a later activation', async () => {
    const worker = createWorker({ currentHashes: { '0123456789ab': hash('legacy audio bytes') }, failAudioPut: true });
    await activate(worker);
    assert.equal(worker.cachesByName.has('bahasa-studio-v3.8.95'), true);
    assert.equal(worker.claimed, 1);
});

test('invalidates only changed clip IDs and does not migrate their stale legacy bytes', async () => {
    const worker = createWorker({
        currentHashes: { '0123456789ab': 'hash-new' },
        legacyHashes: { '0123456789ab': 'hash-old' },
        existingAudioMarker: { '0123456789ab': 'hash-old' }
    });
    worker.audio.entries.set(clipUrl, new Response('stale audio'));
    await activate(worker);
    assert.equal(await worker.audio.match(new Request(clipUrl)), undefined);
    assert.equal(worker.cachesByName.has('bahasa-studio-v3.8.95'), false);
});

test('does not migrate partial HTTP 206 responses', async () => {
    const worker = createWorker({ currentHashes: { '0123456789ab': 'hash-a' }, oldClipStatus: 206 });
    await activate(worker);
    assert.equal(await worker.audio.match(new Request(clipUrl)), undefined);
    assert.equal(worker.cachesByName.has('bahasa-studio-v3.8.95'), false);
});

test('continues serving legacy cached audio while old metadata has no SHA-256 map', async () => {
    const worker = createWorker({ currentHashes: {} });
    const request = new Request(clipUrl);
    const event = {
        request,
        waitUntil: promise => { event.lifetime = promise; },
        respondWith: promise => { event.responsePromise = promise; }
    };
    worker.fetch(event);
    const response = await event.responsePromise;
    assert.equal(await response.text(), 'legacy audio bytes');
    await event.lifetime;
    assert.equal(worker.cachesByName.has('bahasa-studio-v3.8.95'), true);
});
