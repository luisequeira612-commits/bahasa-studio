const CACHE_NAME = 'bahasa-studio-v3.8.96';
const AUDIO_CACHE_NAME = 'guardi-audio-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './assessment.html', './assessment-engine.js', './conversation-engine.js', './study-history.js', './study-activity.js', './adaptive-learning.js', './curriculum-a1.js', './curriculum-a2.js', './styles.css', './audio-engine.js', './audio/index.json', './audio/metadata.json', './pronunciation-engine.js', './writing-practice.js', './apple-touch-icon.png', './icon-192.png', './icon-512-any.png', './icon-512-maskable.png', './assets/guardi/guardi-normal.svg', './assets/guardi/guardi-feliz.svg', './assets/guardi/guardi-triste.svg', './assets/guardi/guardi-celebrando.svg', './assets/guardi/guardi-pensando.svg', './assets/guardi/guardi-mark.svg', './assets/guardi/guardi-icon.svg'];

function isAudioClipRequest(request) {
    const url = new URL(request.url);
    return url.origin === self.location.origin && /\/audio\/id\/[^/]+\.mp3$/i.test(url.pathname);
}

async function migrateLegacyAudioCache() {
    let migrationComplete = true;
    let audioCache;
    let legacyNames;

    try {
        audioCache = await caches.open(AUDIO_CACHE_NAME);
        const keys = await caches.keys();
        legacyNames = keys.filter((name) => name.startsWith('bahasa-studio-') && name !== CACHE_NAME);
    } catch (_) {
        return false;
    }

    for (const name of legacyNames) {
        let source;
        let requests;
        try {
            source = await caches.open(name);
            requests = await source.keys();
        } catch (_) {
            migrationComplete = false;
            continue;
        }

        for (const request of requests) {
            if (!isAudioClipRequest(request)) continue;
            try {
                if (await audioCache.match(request)) continue;
                const response = await source.match(request);
                if (!response || response.status !== 200) continue;
                const bytes = await response.clone().arrayBuffer();
                if (!bytes.byteLength) continue;
                await audioCache.put(request, response.clone());
            } catch (_) {
                // Keep every legacy cache if any valid audio entry could not be copied.
                migrationComplete = false;
            }
        }
    }

    if (!migrationComplete) return false;

    // Delete old app caches only after every eligible audio clip has been copied.
    for (const name of legacyNames) {
        try {
            await caches.delete(name);
        } catch (_) {
            // A failed delete is harmless; the next activation retries it.
        }
    }
    return true;
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
        try {
            await migrateLegacyAudioCache();
        } catch (_) {
            // Activation must remain available even if storage migration fails.
        }
        await self.clients.claim();
    })());
});

// Stale-while-revalidate: responde al instante con la copia guardada y la actualiza
// en segundo plano. Los MP3 usan una caché persistente separada de los recursos de la app.
self.addEventListener('fetch', (e) => {
    const req = e.request;
    const requestUrl = new URL(req.url);
    if (req.method !== 'GET' || requestUrl.origin !== self.location.origin) return;
    const audioRequest = isAudioClipRequest(req);
    const targetCacheName = audioRequest ? AUDIO_CACHE_NAME : CACHE_NAME;

    // Register the lifetime promise synchronously, while the ExtendableEvent is open.
    let finishCacheUpdate;
    const cacheUpdateLifetime = new Promise((resolve) => {
        finishCacheUpdate = resolve;
    });
    try {
        e.waitUntil(cacheUpdateLifetime);
    } catch (_) {
        finishCacheUpdate();
    }

    e.respondWith(
        caches.open(targetCacheName).then(async (cache) => {
            let cached = await cache.match(req);

            // If migration was interrupted, keep serving clips from the untouched
            // legacy caches until a later activation can finish copying them.
            if (!cached && audioRequest) {
                try {
                    const keys = await caches.keys();
                    for (const name of keys) {
                        if (!name.startsWith('bahasa-studio-') || name === CACHE_NAME) continue;
                        const legacy = await caches.open(name);
                        const candidate = await legacy.match(req);
                        if (candidate && candidate.status === 200) {
                            cached = candidate;
                            break;
                        }
                    }
                } catch (_) {
                    // Continue to the network path if legacy lookup is unavailable.
                }
            }

            const network = fetch(req, { cache: 'no-cache' }).then((res) => {
                // Only complete successful responses enter either cache. Range 206
                // support is implemented separately and must not store partial files.
                if (res && res.status === 200) {
                    try {
                        Promise.resolve(cache.put(req, res.clone()))
                            .catch(() => {
                                // Cache failure must never break audio/network playback.
                            })
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
