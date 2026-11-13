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
    assert.deepEqual(worker.attempted, worker.assets);
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
