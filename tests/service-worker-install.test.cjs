const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'service-worker.js'), 'utf8');

function loadInstallHandler(failedUrls) {
    const handlers = {};
    const attempted = [];
    const cached = [];
    let skipWaitingCalls = 0;
    const cache = {
        add: async request => {
            attempted.push(request.url);
            if (failedUrls.has(request.url)) throw new Error('network or HTTP failure');
            cached.push(request.url);
        },
        addAll: async () => { throw new Error('install must not use addAll'); }
    };
    const sandbox = {
        self: {
            addEventListener: (name, handler) => { handlers[name] = handler; },
            skipWaiting: () => { skipWaitingCalls++; }
        },
        caches: { open: async () => cache },
        Request: class {
            constructor(url, options) { this.url = url; this.options = options; }
        },
        Promise
    };
    vm.runInNewContext(source, sandbox);
    return {
        sandbox,
        assets: vm.runInNewContext('ASSETS', sandbox),
        install: handlers.install,
        attempted,
        cached,
        get skipWaitingCalls() { return skipWaitingCalls; }
    };
}

test('un recurso fallido no cancela la precarga de los demás', async () => {
    const failed = new Set(['./assessment.html', './icon.svg']);
    const worker = loadInstallHandler(failed);
    let installPromise;
    worker.install({ waitUntil: promise => { installPromise = promise; } });

    await assert.doesNotReject(installPromise);
    assert.equal(worker.attempted.length, worker.assets.length);
    assert.deepEqual(worker.attempted, Array.from(worker.assets));
    assert.equal(worker.cached.length, worker.assets.length - failed.size);
    for (const url of failed) assert.equal(worker.cached.includes(url), false);
    assert.equal(worker.skipWaitingCalls, 1);
});

test('la instalación sigue resolviendo si todos los recursos fallan', async () => {
    const initial = loadInstallHandler(new Set());
    const worker = loadInstallHandler(new Set(initial.assets));
    let installPromise;
    worker.install({ waitUntil: promise => { installPromise = promise; } });
    await assert.doesNotReject(installPromise);
    assert.equal(worker.cached.length, 0);
    assert.equal(worker.attempted.length, worker.assets.length);
});

test('precarga el índice y los metadatos de la biblioteca de audio', () => {
    const worker = loadInstallHandler(new Set());
    assert.ok(worker.assets.includes('./audio/index.json'));
    assert.ok(worker.assets.includes('./audio/metadata.json'));
});

test('la reproducción online sin inventario no cachea audio y no se bloquea si falla el cache', async () => {
    const handlers = {};
    const cacheWrites = [];
    let waitUntilCalls = 0;
    let cachePutRejects = false;
    const cache = {
        match: async () => null,
        put: async (request, response) => {
            cacheWrites.push({ url: request.url, status: response.status });
            if (cachePutRejects) throw new Error('quota or cache failure');
        }
    };
    const sandbox = {
        self: {
            addEventListener: (name, handler) => { handlers[name] = handler; },
            location: { origin: 'https://example.test' }
        },
        caches: { open: async () => cache },
        fetch: async () => new Response('audio', { status: 200, headers: { 'Content-Type': 'audio/mp3' } }),
        Response,
        Request,
        Promise,
        URL
    };
    vm.runInNewContext(source, sandbox);

    const request = new Request('https://example.test/audio/id/test.mp3');
    const event = {
        request,
        waitUntil: promise => {
            waitUntilCalls++;
            return promise;
        },
        respondWith: promise => { event.responsePromise = promise; }
    };

    handlers.fetch(event);
    assert.equal(waitUntilCalls, 1, 'waitUntil debe registrarse sincrónicamente durante el evento');
    const response = await event.responsePromise;
    assert.equal(response.status, 200);
    assert.deepEqual(cacheWrites, [], 'sin inventario SHA-256 no se crea una copia offline no verificada');

    cacheWrites.length = 0;
    cachePutRejects = true;
    handlers.fetch(event);
    assert.equal(waitUntilCalls, 2);
    const secondResponse = await event.responsePromise;
    assert.equal(secondResponse.status, 200);
    assert.deepEqual(cacheWrites, [], 'la ausencia de hash sigue evitando escrituras incluso si el cache falla');
});

test('una respuesta 206 no se guarda como archivo completo', async () => {
    const handlers = {};
    const cacheWrites = [];
    const cache = {
        match: async () => null,
        put: async (request, response) => {
            cacheWrites.push({ url: request.url, status: response.status });
        }
    };
    const sandbox = {
        self: {
            addEventListener: (name, handler) => { handlers[name] = handler; },
            location: { origin: 'https://example.test' }
        },
        caches: { open: async () => cache },
        fetch: async () => new Response('partial', { status: 206 }),
        Response,
        Request,
        Promise,
        URL
    };
    vm.runInNewContext(source, sandbox);

    const request = new Request('https://example.test/audio/id/test.mp3');
    const event = {
        request,
        waitUntil: () => {},
        respondWith: promise => { event.responsePromise = promise; }
    };

    handlers.fetch(event);
    const response = await event.responsePromise;
    assert.equal(response.status, 206);
    assert.deepEqual(cacheWrites, []);
});

test('todos los recursos locales del precache existen en el repositorio', () => {
    const worker = loadInstallHandler(new Set());
    const root = path.resolve(__dirname, '..');

    for (const asset of worker.assets) {
        if (asset === './') continue;
        const filename = path.resolve(root, asset);
        assert.ok(filename.startsWith(root + path.sep), 'el recurso debe permanecer dentro del repositorio: ' + asset);
        assert.ok(fs.existsSync(filename), 'el recurso del precache debe existir: ' + asset);
        assert.ok(fs.statSync(filename).isFile(), 'el recurso del precache debe ser un archivo: ' + asset);
    }
});
