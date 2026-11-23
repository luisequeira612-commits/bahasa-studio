const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'service-worker.js'), 'utf8');
const ORIGIN = 'https://example.test';
const clipUrl = `${ORIGIN}/bahasa-studio/audio/id/sample.mp3`;

class MemoryCache {
    constructor(entries = [], options = {}) {
        this.entries = new Map(entries.map(([url, response]) => [url, response.clone()]));
        this.failPut = options.failPut || false;
        this.putCalls = [];
    }
    async match(request) {
        const response = this.entries.get(request.url);
        return response ? response.clone() : null;
    }
    async put(request, response) {
        this.putCalls.push({ url: request.url, status: response.status, range: request.headers.get('range') });
        if (this.failPut) throw new Error('simulated quota failure');
        this.entries.set(request.url, response.clone());
    }
    async keys() { return [...this.entries.keys()].map(url => new Request(url)); }
}

function createWorker({ audioEntries = [], failPut = false, fetchImpl } = {}) {
    const handlers = {};
    const cacheStore = new Map();
    const audioCache = new MemoryCache(audioEntries, { failPut });
    cacheStore.set('guardi-audio-v2', audioCache);
    const caches = {
        open: async name => {
            if (!cacheStore.has(name)) cacheStore.set(name, new MemoryCache());
            return cacheStore.get(name);
        },
        keys: async () => [...cacheStore.keys()],
        delete: async name => cacheStore.delete(name)
    };
    const self = {
        location: { origin: ORIGIN },
        addEventListener: (name, handler) => { handlers[name] = handler; },
        skipWaiting: () => {},
        clients: { claim: async () => {} }
    };
    const sandbox = {
        self, caches,
        fetch: fetchImpl || (async () => new Response('abcdef', {
            status: 200,
            headers: { 'Content-Type': 'audio/mpeg' }
        })),
        Response, Request, Headers, Promise, URL, Map
    };
    vm.runInNewContext(source, sandbox);
    return { handlers, cacheStore, audioCache };
}

async function dispatchFetch(worker, range, language = 'id') {
    const requestUrl = language === 'id' ? clipUrl : `${ORIGIN}/bahasa-studio/audio/${language}/sample.mp3`;
    const request = new Request(requestUrl, range ? { headers: { Range: range } } : undefined);
    let responsePromise;
    let lifetimePromise;
    worker.handlers.fetch({
        request,
        waitUntil: promise => { lifetimePromise = promise; },
        respondWith: promise => { responsePromise = promise; }
    });
    const response = await responsePromise;
    await lifetimePromise;
    return response;
}

test('Range bytes=start-end fetches and caches a complete 200, then returns a correct 206', async () => {
    let receivedRequest;
    const worker = createWorker({
        fetchImpl: async request => {
            receivedRequest = request;
            return new Response('abcdef', {
                status: 200,
                headers: { 'Content-Type': 'audio/mpeg', 'Content-Length': '6' }
            });
        }
    });
    const response = await dispatchFetch(worker, 'bytes=1-3');
    assert.equal(receivedRequest.headers.has('range'), false, 'the origin fetch must not receive Range');
    assert.equal(response.status, 206);
    assert.equal(response.statusText, 'Partial Content');
    assert.equal(await response.text(), 'bcd');
    assert.equal(response.headers.get('Content-Range'), 'bytes 1-3/6');
    assert.equal(response.headers.get('Content-Length'), '3');
    assert.equal(response.headers.get('Accept-Ranges'), 'bytes');
    assert.equal(response.headers.get('Content-Type'), 'audio/mpeg');
    assert.equal(worker.audioCache.putCalls.length, 1);
    assert.equal(worker.audioCache.putCalls[0].status, 200);
    assert.equal(worker.audioCache.putCalls[0].range, null);
    const stored = await worker.audioCache.match(new Request(clipUrl));
    assert.equal(stored.status, 200);
    assert.equal(await stored.text(), 'abcdef');
});

test('supports suffix, open-ended and clamped byte ranges', async () => {
    const suffix = await dispatchFetch(createWorker(), 'bytes=-2');
    assert.equal(suffix.status, 206);
    assert.equal(await suffix.text(), 'ef');
    assert.equal(suffix.headers.get('Content-Range'), 'bytes 4-5/6');

    const openEnded = await dispatchFetch(createWorker(), 'bytes=2-');
    assert.equal(openEnded.status, 206);
    assert.equal(await openEnded.text(), 'cdef');
    assert.equal(openEnded.headers.get('Content-Range'), 'bytes 2-5/6');

    const clamped = await dispatchFetch(createWorker(), 'bytes=2-99');
    assert.equal(clamped.status, 206);
    assert.equal(await clamped.text(), 'cdef');
    assert.equal(clamped.headers.get('Content-Range'), 'bytes 2-5/6');
});

test('unsatisfiable ranges return 416 with the complete resource size', async () => {
    const beyond = await dispatchFetch(createWorker(), 'bytes=6-');
    assert.equal(beyond.status, 416);
    assert.equal(beyond.headers.get('Content-Range'), 'bytes */6');
    assert.equal(beyond.headers.get('Accept-Ranges'), 'bytes');
    assert.equal(beyond.headers.get('Content-Length'), '0');

    const zeroSuffix = await dispatchFetch(createWorker(), 'bytes=-0');
    assert.equal(zeroSuffix.status, 416);
    assert.equal(zeroSuffix.headers.get('Content-Range'), 'bytes */6');
});

test('invalid and multiple ranges are ignored and receive the complete 200 response', async () => {
    for (const range of ['bytes=0-1,4-5', 'items=0-1', 'bytes=4-2', 'bytes=', 'bytes=abc']) {
        const response = await dispatchFetch(createWorker(), range);
        assert.equal(response.status, 200, range);
        assert.equal(await response.text(), 'abcdef', range);
        assert.equal(response.headers.get('Content-Range'), null, range);
    }
});

test('serves a cached complete clip as 206 when offline', async () => {
    const worker = createWorker({
        audioEntries: [[clipUrl, new Response('abcdef', {
            status: 200,
            headers: { 'Content-Type': 'audio/mpeg' }
        })]],
        fetchImpl: async () => { throw new Error('offline'); }
    });
    const response = await dispatchFetch(worker, 'bytes=0-1');
    assert.equal(response.status, 206);
    assert.equal(await response.text(), 'ab');
    assert.equal(response.headers.get('Content-Range'), 'bytes 0-1/6');
    assert.equal(worker.audioCache.putCalls.length, 0);
});

test('a cache write failure does not block a Range response', async () => {
    const worker = createWorker({
        failPut: true,
        fetchImpl: async () => new Response('abcdef', {
            status: 200,
            headers: { 'Content-Type': 'audio/mpeg' }
        })
    });
    const response = await dispatchFetch(worker, 'bytes=0-1');
    assert.equal(response.status, 206);
    assert.equal(await response.text(), 'ab');
    assert.equal(worker.audioCache.putCalls.length, 1);
});


test('byte ranges also work on a language-specific audio route and cache', async () => {
    const worker = createWorker();
    const response = await dispatchFetch(worker, 'bytes=1-3', 'pt-BR');
    assert.equal(response.status, 206);
    assert.equal(await response.text(), 'bcd');
    const languageCache = worker.cacheStore.get('guardi-audio-v2-pt-BR');
    assert.ok(languageCache);
    const stored = await languageCache.match(new Request(`${ORIGIN}/bahasa-studio/audio/pt-BR/sample.mp3`));
    assert.equal(stored.status, 200);
    assert.equal(await stored.text(), 'abcdef');
});
