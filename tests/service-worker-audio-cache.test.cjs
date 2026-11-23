const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { createHash, webcrypto } = require('node:crypto');
const hash = value => createHash('sha256').update(value).digest('hex');

const source = fs.readFileSync(path.join(__dirname, '..', 'service-worker.js'), 'utf8');
const CURRENT_CACHE_NAME = source.match(/const CACHE_NAME = '([^']+)'/)[1];
const ORIGIN = 'https://example.test';

class MemoryCache {
    constructor(entries = [], options = {}) {
        this.entries = new Map(entries.map(([url, response]) => [url, response.clone()]));
        this.failPut = options.failPut || false;
        this.putCalls = 0;
    }

    async match(request) {
        const url = typeof request === 'string' ? new URL(request, ORIGIN).href : request.url;
        const response = this.entries.get(url);
        return response ? response.clone() : null;
    }

    async put(request, response) {
        this.putCalls++;
        if (this.failPut) throw new Error('simulated quota failure');
        this.entries.set(request.url, response.clone());
    }

    async delete(request) {
        const url = typeof request === 'string' ? new URL(request, ORIGIN).href : request.url;
        return this.entries.delete(url);
    }

    async keys() {
        return [...this.entries.keys()].map(url => new Request(url));
    }
}

function createWorker(initialCaches = new Map(), fetchImpl = async () => new Response('network audio', {
    status: 200,
    headers: { 'Content-Type': 'audio/mpeg' }
}), currentHashes = null) {
    const handlers = {};
    const cacheStore = new Map(initialCaches);
    if (currentHashes) {
        const currentName = CURRENT_CACHE_NAME;
        if (!cacheStore.has(currentName)) cacheStore.set(currentName, new MemoryCache());
        cacheStore.get(currentName).entries.set(
            ORIGIN + '/bahasa-studio/audio/metadata.json',
            new Response(JSON.stringify({ audio_hashes: currentHashes }))
        );
    }
    let claimCalls = 0;
    const caches = {
        open: async name => {
            if (!cacheStore.has(name)) cacheStore.set(name, new MemoryCache());
            return cacheStore.get(name);
        },
        keys: async () => [...cacheStore.keys()],
        delete: async name => cacheStore.delete(name)
    };
    const self = {
        location: { origin: ORIGIN, href: ORIGIN + '/bahasa-studio/' },
        addEventListener: (name, handler) => { handlers[name] = handler; },
        skipWaiting: () => {},
        clients: { claim: async () => { claimCalls++; } }
    };
    const sandbox = { self, caches, fetch: fetchImpl, Response, Request, Promise, URL, crypto: webcrypto };
    vm.runInNewContext(source, sandbox);
    return {
        handlers,
        cacheStore,
        get claimCalls() { return claimCalls; }
    };
}

function audioUrl(id, language = 'id') {
    return `${ORIGIN}/bahasa-studio/audio/${language}/${id}.mp3`;
}

test('migra MP3 completos de todas las cachés antiguas antes de borrarlas', async () => {
    const firstClip = audioUrl('old-one');
    const secondClip = audioUrl('old-two');
    const partialClip = audioUrl('partial');
    const emptyClip = audioUrl('empty');
    const shellUrl = `${ORIGIN}/bahasa-studio/index.html`;

    const old95 = new MemoryCache([
        [firstClip, new Response('mp3-one', { status: 200, headers: { 'Content-Type': 'audio/mpeg' } })],
        [partialClip, new Response('partial', { status: 206 })],
        [emptyClip, new Response('', { status: 200 })],
        [shellUrl, new Response('<html>old shell</html>', { status: 200 })]
    ]);
    const old94 = new MemoryCache([
        [secondClip, new Response('mp3-two', { status: 200, headers: { 'Content-Type': 'audio/mpeg' } })]
    ]);
    const current = new MemoryCache();
    const worker = createWorker(new Map([
        ['bahasa-studio-v3.8.95', old95],
        ['bahasa-studio-v3.8.94', old94],
        ['guardi-audio-v1', new MemoryCache([[audioUrl('old-piper'), new Response('old Piper audio', { status: 200 })]])],
        [CURRENT_CACHE_NAME, current]
    ]));

    let activation;
    worker.handlers.activate({ waitUntil: promise => { activation = promise; } });
    await assert.doesNotReject(activation);

    const audioCache = worker.cacheStore.get('guardi-audio-v2');
    assert.ok(await audioCache.match(new Request(firstClip)));
    assert.ok(await audioCache.match(new Request(secondClip)));
    assert.equal(await audioCache.match(new Request(partialClip)), null);
    assert.equal(await audioCache.match(new Request(emptyClip)), null);
    assert.equal(await audioCache.match(new Request(shellUrl)), null);
    assert.equal(worker.cacheStore.has('bahasa-studio-v3.8.95'), false);
    assert.equal(worker.cacheStore.has('bahasa-studio-v3.8.94'), false);
    assert.equal(worker.cacheStore.has('guardi-audio-v1'), false, 'old Piper cache must be discarded');
    assert.equal(await audioCache.match(new Request(audioUrl('old-piper'))), null);
    assert.equal(worker.cacheStore.has(CURRENT_CACHE_NAME), true);
    assert.equal(worker.claimCalls, 1);
});

test('si una copia falla, la activación no se bloquea y conserva las cachés antiguas', async () => {
    const clip = audioUrl('keep-old');
    const old = new MemoryCache([
        [clip, new Response('valid audio', { status: 200, headers: { 'Content-Type': 'audio/mpeg' } })]
    ]);
    const audio = new MemoryCache([], { failPut: true });
    const worker = createWorker(new Map([
        ['bahasa-studio-v3.8.95', old],
        [CURRENT_CACHE_NAME, new MemoryCache()],
        ['guardi-audio-v2', audio]
    ]));

    let activation;
    worker.handlers.activate({ waitUntil: promise => { activation = promise; } });
    await assert.doesNotReject(activation);
    assert.equal(worker.cacheStore.has('bahasa-studio-v3.8.95'), true);
    assert.equal(worker.cacheStore.has('guardi-audio-v2'), true);
    assert.equal(worker.claimCalls, 1);
});

test('la migración es idempotente y no vuelve a escribir clips ya copiados', async () => {
    const clip = audioUrl('once');
    const old = new MemoryCache([
        [clip, new Response('valid audio', { status: 200 })]
    ]);
    const worker = createWorker(new Map([
        ['bahasa-studio-v3.8.95', old],
        [CURRENT_CACHE_NAME, new MemoryCache()]
    ]));

    let firstActivation;
    worker.handlers.activate({ waitUntil: promise => { firstActivation = promise; } });
    await firstActivation;
    const audioCache = worker.cacheStore.get('guardi-audio-v2');
    assert.equal(audioCache.putCalls, 1);

    let secondActivation;
    worker.handlers.activate({ waitUntil: promise => { secondActivation = promise; } });
    await secondActivation;
    assert.equal(audioCache.putCalls, 1);
    assert.equal(worker.claimCalls, 2);
});

test('los MP3 nuevos usan guardi-audio-v2 y los recursos normales siguen en la caché de la app', async () => {
    const worker = createWorker();
    const audioRequest = new Request(audioUrl('fresh'));
    let audioLifetime;
    let audioResponse;
    worker.handlers.fetch({
        request: audioRequest,
        waitUntil: promise => { audioLifetime = promise; },
        respondWith: promise => { audioResponse = promise; }
    });
    assert.equal((await audioResponse).status, 200);
    await audioLifetime;

    const audioCache = worker.cacheStore.get('guardi-audio-v2');
    assert.ok(await audioCache.match(audioRequest));
    assert.equal(worker.cacheStore.has(CURRENT_CACHE_NAME), false, 'audio fetch must not create the app cache');

    const appRequest = new Request(`${ORIGIN}/bahasa-studio/styles.css`);
    let appLifetime;
    let appResponse;
    worker.handlers.fetch({
        request: appRequest,
        waitUntil: promise => { appLifetime = promise; },
        respondWith: promise => { appResponse = promise; }
    });
    assert.equal((await appResponse).status, 200);
    await appLifetime;
    const appCache = worker.cacheStore.get(CURRENT_CACHE_NAME);
    assert.ok(await appCache.match(appRequest));
    assert.equal(await audioCache.match(appRequest), null);
});

test('la descarga explícita verificada evita la escritura automática del Service Worker', async () => {
    const clip = audioUrl('verified');
    let networkCalls = 0;
    const worker = createWorker(new Map(), async request => {
        networkCalls++;
        assert.equal(request.headers.get('x-offline-audio-preparation'), '1');
        return new Response('audio awaiting SHA-256 verification', {
            status: 200,
            headers: { 'Content-Type': 'audio/mpeg' }
        });
    });
    const request = new Request(clip, { headers: { 'x-offline-audio-preparation': '1' } });
    let responsePromise;
    worker.handlers.fetch({
        request,
        waitUntil() { throw new Error('verified preparation must not register a cache write'); },
        respondWith(promise) { responsePromise = promise; }
    });
    assert.equal((await responsePromise).status, 200);
    assert.equal(networkCalls, 1);
    assert.equal(worker.cacheStore.has('guardi-audio-v2'), false);
    assert.equal(worker.cacheStore.has(CURRENT_CACHE_NAME), false);
});

test('invalida solo los MP3 cuyo contenido cambió y conserva los que siguen iguales al añadir IDs', async () => {
    const keepId = '0123456789ab';
    const changedId = 'abcdef012345';
    const removedId = 'fedcba987654';
    const currentHashes = {
        [keepId]: hash('unchanged bytes'),
        [changedId]: hash('new bytes'),
        '998877665544': hash('newly added clip')
    };
    const audio = new MemoryCache([
        [audioUrl(keepId), new Response('unchanged bytes', { status: 200 })],
        [audioUrl(changedId), new Response('old bytes', { status: 200 })],
        [audioUrl(removedId), new Response('removed clip', { status: 200 })]
    ]);
    const current = new MemoryCache();
    const worker = createWorker(new Map([
        ['bahasa-studio-v3.8.97', new MemoryCache()],
        [CURRENT_CACHE_NAME, current],
        ['guardi-audio-v2', audio]
    ]), undefined, currentHashes);

    let activation;
    worker.handlers.activate({ waitUntil: promise => { activation = promise; } });
    await activation;

    assert.ok(await audio.match(new Request(audioUrl(keepId))));
    assert.equal(await audio.match(new Request(audioUrl(changedId))), null);
    assert.equal(await audio.match(new Request(audioUrl(removedId))), null);
});

test('migra solo clips legacy cuyos bytes coinciden con el SHA-256 actual', async () => {
    const validId = '0123456789ab';
    const staleId = 'abcdef012345';
    const currentHashes = {
        [validId]: hash('valid legacy bytes'),
        [staleId]: hash('newer bytes')
    };
    const legacy = new MemoryCache([
        [audioUrl(validId), new Response('valid legacy bytes', { status: 200 })],
        [audioUrl(staleId), new Response('stale legacy bytes', { status: 200 })]
    ]);
    const current = new MemoryCache();
    const audio = new MemoryCache();
    const worker = createWorker(new Map([
        ['bahasa-studio-v3.8.97', legacy],
        [CURRENT_CACHE_NAME, current],
        ['guardi-audio-v2', audio]
    ]), undefined, currentHashes);

    let activation;
    worker.handlers.activate({ waitUntil: promise => { activation = promise; } });
    await activation;

    assert.ok(await audio.match(new Request(audioUrl(validId))));
    assert.equal(await audio.match(new Request(audioUrl(staleId))), null);
    assert.equal(worker.cacheStore.has('bahasa-studio-v3.8.97'), false);
});

test('separa las rutas y cachés persistentes por idioma', async () => {
    const worker = createWorker();
    for (const [language, id] of [['id', 'sameclip00001'], ['pt-BR', 'sameclip00001']]) {
        const request = new Request(audioUrl(id, language));
        let responsePromise;
        let lifetimePromise;
        worker.handlers.fetch({
            request,
            waitUntil: promise => { lifetimePromise = promise; },
            respondWith: promise => { responsePromise = promise; }
        });
        assert.equal((await responsePromise).status, 200);
        await lifetimePromise;
    }
    assert.ok(worker.cacheStore.has('guardi-audio-v2'));
    assert.ok(worker.cacheStore.has('guardi-audio-v2-pt-BR'));
    assert.ok(await worker.cacheStore.get('guardi-audio-v2').match(new Request(audioUrl('sameclip00001', 'id'))));
    assert.ok(await worker.cacheStore.get('guardi-audio-v2-pt-BR').match(new Request(audioUrl('sameclip00001', 'pt-BR'))));
    assert.equal(await worker.cacheStore.get('guardi-audio-v2').match(new Request(audioUrl('sameclip00001', 'pt-BR'))), null);
});
