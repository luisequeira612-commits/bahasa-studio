const CACHE_NAME = 'bahasa-studio-v3.8.96';
const AUDIO_CACHE_NAME = 'guardi-audio-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './assessment.html', './assessment-engine.js', './conversation-engine.js', './study-history.js', './study-activity.js', './adaptive-learning.js', './curriculum-a1.js', './curriculum-a2.js', './styles.css', './audio-engine.js', './audio/index.json', './audio/metadata.json', './pronunciation-engine.js', './writing-practice.js', './apple-touch-icon.png', './icon-192.png', './icon-512-any.png', './icon-512-maskable.png', './assets/guardi/guardi-normal.svg', './assets/guardi/guardi-feliz.svg', './assets/guardi/guardi-triste.svg', './assets/guardi/guardi-celebrando.svg', './assets/guardi/guardi-pensando.svg', './assets/guardi/guardi-mark.svg', './assets/guardi/guardi-icon.svg'];

const audioMetadataRequest = () => new Request(new URL('./audio/metadata.json', self.location.href).href);
const audioRevisionRequest = () => new Request(new URL('./__audio_revision__.json', self.location.href).href);
const isAudioFileRequest = (request) => {
    const url = new URL(request.url);
    return url.origin === self.location.origin && /\/audio\/id\/[a-f0-9]{12}\.mp3$/i.test(url.pathname);
};
const audioRequestForId = (id) => new Request(new URL(`./audio/id/${id}.mp3`, self.location.href).href);

async function readAudioHashes(cache) {
    try {
        const response = await cache.match(audioMetadataRequest());
        if (!response || response.status !== 200) return null;
        const metadata = await response.json();
        return metadata && metadata.audio_hashes && typeof metadata.audio_hashes === 'object'
            ? metadata.audio_hashes : null;
    } catch (_) {
        return null;
    }
}

async function migrateAudioCache() {
    let audioCache;
    try {
        const appCache = await caches.open(CACHE_NAME);
        const currentHashes = await readAudioHashes(appCache);
        if (!currentHashes || !Object.keys(currentHashes).length) return false;

        audioCache = await caches.open(AUDIO_CACHE_NAME);
        const revisionRequest = audioRevisionRequest();
        let previousHashes = null;
        const revisionResponse = await audioCache.match(revisionRequest);
        if (revisionResponse) {
            try {
                const revision = await revisionResponse.json();
                if (revision && revision.audio_hashes && typeof revision.audio_hashes === 'object') {
                    previousHashes = revision.audio_hashes;
                }
            } catch (_) {
                return false;
            }
        }

        // Remove only clips whose actual MP3 bytes changed or disappeared.
        if (previousHashes) {
            for (const [id, oldHash] of Object.entries(previousHashes)) {
                if (currentHashes[id] !== oldHash) {
                    await audioCache.delete(audioRequestForId(id));
                }
            }
        }

        let migrationSucceeded = true;
        const legacyNames = (await caches.keys()).filter((name) =>
            name.startsWith('bahasa-studio-') && name !== CACHE_NAME
        );

        for (const name of legacyNames) {
            let legacy;
            let requests;
            let legacyHashes = null;
            try {
                legacy = await caches.open(name);
                legacyHashes = await readAudioHashes(legacy);
                requests = await legacy.keys();
            } catch (_) {
                migrationSucceeded = false;
                continue;
            }

            for (const request of requests) {
                if (!isAudioFileRequest(request)) continue;
                const match = new URL(request.url).pathname.match(/\/audio\/id\/([a-f0-9]{12})\.mp3$/i);
                if (!match) continue;
                const id = match[1].toLowerCase();
                const currentHash = currentHashes[id];
                if (!currentHash) continue;
                if (legacyHashes && legacyHashes[id] !== currentHash) continue;

                try {
                    const canonicalRequest = audioRequestForId(id);
                    if (await audioCache.match(canonicalRequest)) continue;
                    const response = await legacy.match(request);
                    if (!response || response.status !== 200) continue;
                    const bytes = await response.clone().arrayBuffer();
                    if (!bytes.byteLength) continue;
                    await audioCache.put(canonicalRequest, response);
                } catch (_) {
                    migrationSucceeded = false;
                }
            }
        }

        if (!migrationSucceeded) return false;
        await audioCache.put(revisionRequest, new Response(JSON.stringify({
            audio_hashes: currentHashes
        }), { headers: { 'Content-Type': 'application/json' } }));
        return true;
    } catch (_) {
        return false;
    }
}

self.addEventListener('install', (e) => {
    e.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await Promise.all(ASSETS.map(async (url) => {
            try {
                await cache.add(new Request(url, { cache: 'reload' }));
            } catch (_) {
                // Un recurso fallido no debe cancelar la precarga del resto.
            }
        }));
    })());
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil((async () => {
        const migrated = await migrateAudioCache();
        if (migrated) {
            const keys = await caches.keys();
            await Promise.all(
                keys.filter((name) => name.startsWith('bahasa-studio-') && name !== CACHE_NAME)
                    .map((name) => caches.delete(name).catch(() => false))
            );
        }
        await self.clients.claim();
    })());
});

// Stale-while-revalidate: audio files use a durable cache separate from app assets.
self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

    let finishCacheUpdate;
    const cacheUpdateLifetime = new Promise((resolve) => {
        finishCacheUpdate = resolve;
    });
    try {
        e.waitUntil(cacheUpdateLifetime);
    } catch (_) {
        finishCacheUpdate();
    }

    const cacheName = isAudioFileRequest(req) ? AUDIO_CACHE_NAME : CACHE_NAME;
    e.respondWith(
        caches.open(cacheName).then(async (cache) => {
            const cached = await cache.match(req);
            const network = fetch(req, { cache: 'no-cache' }).then((res) => {
                if (res && res.status === 200 && !req.headers.has('range')) {
                    try {
                        Promise.resolve(cache.put(req, res.clone()))
                            .catch(() => {})
                            .finally(finishCacheUpdate);
                    } catch (_) {
                        finishCacheUpdate();
                    }
                } else {
                    finishCacheUpdate();
                }
                return res;
            }).catch(() => {
                finishCacheUpdate();
                return null;
            });
            if (cached) return cached;
            const res = await network;
            if (res) return res;
            if (req.mode === 'navigate') return cache.match('./index.html');
            return Response.error();
        }).catch((error) => {
            finishCacheUpdate();
            throw error;
        })
    );
});
