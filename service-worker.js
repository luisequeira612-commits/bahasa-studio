const CACHE_NAME = 'bahasa-studio-v3.8.98';
const AUDIO_CACHE_NAME = 'guardi-audio-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './assessment.html', './assessment-engine.js', './conversation-engine.js', './study-history.js', './study-activity.js', './adaptive-learning.js', './curriculum-a1.js', './curriculum-a2.js', './styles.css', './audio-engine.js', './audio/index.json', './audio/metadata.json', './pronunciation-engine.js', './writing-practice.js', './apple-touch-icon.png', './icon-192.png', './icon-512-any.png', './icon-512-maskable.png', './assets/guardi/guardi-normal.svg', './assets/guardi/guardi-feliz.svg', './assets/guardi/guardi-triste.svg', './assets/guardi/guardi-celebrando.svg', './assets/guardi/guardi-pensando.svg', './assets/guardi/guardi-mark.svg', './assets/guardi/guardi-icon.svg'];

const inFlightAudioFetches = new Map();
let audioRevisionInvalidationPending = false;

function isAudioClipRequest(request) {
    const url = new URL(request.url);
    return url.origin === self.location.origin && /\/audio\/id\/[^/]+\.mp3$/i.test(url.pathname);
}

function withoutRangeHeader(request) {
    if (!request.headers || !request.headers.has('range')) return request;
    const headers = new Headers(request.headers);
    headers.delete('range');
    return new Request(request, { headers });
}

function fetchAudioOnce(request) {
    const key = request.url;
    let pending = inFlightAudioFetches.get(key);
    if (!pending) {
        pending = fetch(request, { cache: 'no-cache' }).finally(() => {
            inFlightAudioFetches.delete(key);
        });
        inFlightAudioFetches.set(key, pending);
    }
    return pending.then((response) => response.clone());
}

function parseByteRange(header, size) {
    if (typeof header !== 'string') return { type: 'ignore' };
    const match = /^bytes=(\d*)-(\d*)$/i.exec(header.trim());
    if (!match || (!match[1] && !match[2])) return { type: 'ignore' };

    if (size === 0) return { type: 'unsatisfiable' };

    if (!match[1]) {
        const suffixLength = Number(match[2]);
        if (!Number.isSafeInteger(suffixLength)) return { type: 'ignore' };
        if (suffixLength === 0) return { type: 'unsatisfiable' };
        return {
            type: 'range',
            start: Math.max(0, size - suffixLength),
            end: size - 1
        };
    }

    const start = Number(match[1]);
    if (!Number.isSafeInteger(start)) return { type: 'ignore' };
    if (start >= size) return { type: 'unsatisfiable' };

    let end = size - 1;
    if (match[2]) {
        const requestedEnd = Number(match[2]);
        if (!Number.isSafeInteger(requestedEnd)) return { type: 'ignore' };
        if (requestedEnd < start) return { type: 'ignore' };
        end = Math.min(requestedEnd, size - 1);
    }
    return { type: 'range', start, end };
}

function rangeNotSatisfiable(size, contentType) {
    const headers = new Headers({
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes */${size}`,
        'Content-Length': '0'
    });
    if (contentType) headers.set('Content-Type', contentType);
    return new Response(null, { status: 416, statusText: 'Range Not Satisfiable', headers });
}

async function createRangeResponse(response, rangeHeader) {
    if (!rangeHeader || !response || response.status !== 200) return response;
    const bytes = await response.clone().arrayBuffer();
    const parsed = parseByteRange(rangeHeader, bytes.byteLength);
    if (parsed.type === 'ignore') return response;
    const contentType = response.headers.get('Content-Type') || 'audio/mpeg';
    if (parsed.type === 'unsatisfiable') return rangeNotSatisfiable(bytes.byteLength, contentType);

    const partial = bytes.slice(parsed.start, parsed.end + 1);
    const headers = new Headers(response.headers);
    // Fetch exposes decoded bytes; don't forward encoding/length metadata for the
    // complete response into a newly constructed partial response.
    headers.delete('Content-Encoding');
    headers.delete('Content-Length');
    headers.delete('Content-Range');
    headers.delete('Transfer-Encoding');
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Content-Type', contentType);
    headers.set('Content-Range', `bytes ${parsed.start}-${parsed.end}/${bytes.byteLength}`);
    headers.set('Content-Length', String(partial.byteLength));
    return new Response(partial, { status: 206, statusText: 'Partial Content', headers });
}

async function invalidateRegeneratedAudio(audioCache) {
    try {
        const metadataRequest = new Request(new URL('./audio/metadata.json', self.location.href).href);
        const appCache = await caches.open(CACHE_NAME);
        const currentResponse = await appCache.match(metadataRequest);
        if (!currentResponse) {
            audioRevisionInvalidationPending = true;
            return { known: false, changed: true };
        }

        const currentMetadata = JSON.parse(await currentResponse.clone().text());
        const currentRevision = currentMetadata.content_revision;
        if (!Number.isSafeInteger(currentRevision) || currentRevision < 1) {
            audioRevisionInvalidationPending = true;
            return { known: false, changed: true };
        }

        const previousResponse = await audioCache.match(metadataRequest);
        let changed = currentRevision > 1;
        if (previousResponse) {
            let previousRevision = null;
            try {
                const previousMetadata = JSON.parse(await previousResponse.clone().text());
                previousRevision = previousMetadata.content_revision;
            } catch (_) {
                // An unreadable stored marker is treated as a revision change.
            }
            changed = !Number.isSafeInteger(previousRevision)
                || previousRevision < 1
                || previousRevision !== currentRevision;
        }

        if (changed) {
            // Do not serve or re-migrate old clips if invalidation is incomplete.
            audioRevisionInvalidationPending = true;
            const requests = await audioCache.keys();
            for (const request of requests) {
                if (isAudioClipRequest(request)) await audioCache.delete(request);
            }
        }

        await audioCache.put(metadataRequest, currentResponse.clone());
        audioRevisionInvalidationPending = false;
        return { known: true, changed };
    } catch (_) {
        audioRevisionInvalidationPending = true;
        return { known: false, changed: true };
    }
}

async function migrateLegacyAudioCache({ skipAudio = false, preserveLegacy = false } = {}) {
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

    if (preserveLegacy) return false;
    if (skipAudio) {
        let deletionComplete = true;
        for (const name of legacyNames) {
            try {
                await caches.delete(name);
            } catch (_) {
                deletionComplete = false;
            }
        }
        if (!deletionComplete) audioRevisionInvalidationPending = true;
        return deletionComplete;
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
            if (skipAudio || !isAudioClipRequest(request)) continue;
            try {
                if (await audioCache.match(request)) continue;
                const response = await source.match(request);
                if (!response || response.status !== 200) continue;
                const bytes = await response.clone().arrayBuffer();
                if (!bytes.byteLength) continue;
                await audioCache.put(request, response.clone());
            } catch (_) {
                migrationComplete = false;
            }
        }
    }

    if (!migrationComplete || preserveLegacy) return false;
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
            const audioCache = await caches.open(AUDIO_CACHE_NAME);
            const revision = await invalidateRegeneratedAudio(audioCache);
            const migrationComplete = await migrateLegacyAudioCache({
                skipAudio: revision.changed,
                preserveLegacy: !revision.known
            });
            if (revision.changed && !migrationComplete) {
                audioRevisionInvalidationPending = true;
            }
        } catch (_) {
            audioRevisionInvalidationPending = true;
            // Activation must remain available even if storage migration fails.
        }
        await self.clients.claim();
    })());
});

// Stale-while-revalidate. MP3 use a persistent cache and support single byte ranges.
self.addEventListener('fetch', (e) => {
    const req = e.request;
    const requestUrl = new URL(req.url);
    if (req.method !== 'GET' || requestUrl.origin !== self.location.origin) return;
    const audioRequest = isAudioClipRequest(req);
    const targetCacheName = audioRequest ? AUDIO_CACHE_NAME : CACHE_NAME;
    const cacheRequest = audioRequest ? withoutRangeHeader(req) : req;
    const rangeHeader = audioRequest ? req.headers.get('range') : null;

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
            let cached = audioRequest && audioRevisionInvalidationPending
                ? null
                : await cache.match(cacheRequest);

            if (!cached && audioRequest && !audioRevisionInvalidationPending) {
                try {
                    const keys = await caches.keys();
                    for (const name of keys) {
                        if (!name.startsWith('bahasa-studio-') || name === CACHE_NAME) continue;
                        const legacy = await caches.open(name);
                        const candidate = await legacy.match(cacheRequest);
                        if (candidate && candidate.status === 200) {
                            cached = candidate;
                            break;
                        }
                    }
                } catch (_) {
                    // Continue to network if legacy lookup is unavailable.
                }
            }

            const fetchFresh = audioRequest
                ? fetchAudioOnce(cacheRequest)
                : fetch(cacheRequest, { cache: 'no-cache' });
            const network = fetchFresh.then((res) => {
                if (res && res.status === 200) {
                    try {
                        Promise.resolve(cache.put(cacheRequest, res.clone()))
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

            if (cached) {
                if (rangeHeader) return createRangeResponse(cached, rangeHeader);
                return cached;
            }

            const res = await network;
            if (res) {
                if (rangeHeader) return createRangeResponse(res, rangeHeader);
                return res;
            }
            if (req.mode === 'navigate') return cache.match('./index.html');
            return Response.error();
        }).catch((error) => {
            finishCacheUpdate();
            throw error;
        })
    );
});
