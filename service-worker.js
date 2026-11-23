const CACHE_NAME = 'bahasa-studio-v3.8.118';
const AUDIO_CACHE_NAME = 'guardi-audio-v2';
const AUDIO_LANGUAGES = new Set(['pt-BR', 'en', 'it', 'fr', 'de', 'nl', 'ru', 'ja', 'ko', 'id']);

function audioLanguageFromRequest(request) {
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return null;
    const match = /\/audio\/([a-z]{2}(?:-[A-Z]{2})?)\/[^/]+\.mp3$/i.exec(url.pathname);
    if (!match) return null;
    const language = match[1];
    return AUDIO_LANGUAGES.has(language) ? language : null;
}

function audioCacheName(language) {
    return language === 'id' ? AUDIO_CACHE_NAME : AUDIO_CACHE_NAME + '-' + language;
}
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './assessment.html', './assessment-engine.js', './conversation-engine.js', './study-history.js', './study-activity.js', './language-manager.js', './curriculum-loader.js', './progress-namespace.js', './adaptive-learning.js', './curriculum-a1.js', './curriculum-a2.js', './styles.css', './audio-engine.js', './audio/index.json', './audio/manifest.json', './audio/metadata.json', './offline-audio-manager.js', './pronunciation-engine.js', './writing-practice.js', './apple-touch-icon.png', './icon-192.png', './icon-512-any.png', './icon-512-maskable.png', './assets/guardi/guardi-normal.svg', './assets/guardi/guardi-feliz.svg', './assets/guardi/guardi-triste.svg', './assets/guardi/guardi-celebrando.svg', './assets/guardi/guardi-pensando.svg', './assets/guardi/guardi-mark.svg', './assets/guardi/guardi-icon.svg'];

const inFlightAudioFetches = new Map();

function isAudioClipRequest(request) {
    return audioLanguageFromRequest(request) !== null;
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

const audioMetadataRequest = (language) => new Request(new URL(language === 'id' ? './audio/metadata.json' : './audio/' + language + '/metadata.json', self.location.href).href);

async function readAudioHashes(cache, language = 'id') {
    try {
        const response = await cache.match(audioMetadataRequest(language));
        if (!response || response.status !== 200) return null;
        const metadata = await response.json();
        const hashes = metadata && metadata.audio_hashes;
        return hashes && typeof hashes === 'object' && Object.keys(hashes).length ? hashes : null;
    } catch (_) {
        return null;
    }
}

async function sha256Hex(bytes) {
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function audioClipIdFromRequest(request) {
    const match = new URL(request.url).pathname.match(/\/audio\/[a-z]{2}(?:-[A-Z]{2})?\/([a-f0-9]{12})\.mp3$/i);
    return match ? match[1].toLowerCase() : null;
}

async function hasValidAudioHash(response, expectedHash) {
    if (!response || response.status !== 200 ||
        typeof expectedHash !== 'string' || !/^[a-f0-9]{64}$/i.test(expectedHash)) return false;
    try {
        const bytes = await response.clone().arrayBuffer();
        return bytes.byteLength > 0 && await sha256Hex(bytes) === expectedHash.toLowerCase();
    } catch (_) {
        return false;
    }
}

async function migrateLegacyAudioCache() {
    let migrationComplete = true;
    let appCache;
    let legacyNames;
    const hashesByLanguage = new Map();
    const audioCaches = new Map();

    try {
        appCache = await caches.open(CACHE_NAME);
        const keys = await caches.keys();
        legacyNames = keys.filter((name) => name.startsWith('bahasa-studio-') && name !== CACHE_NAME);
        for (const language of AUDIO_LANGUAGES) {
            const name = audioCacheName(language);
            if (language !== 'id' && !keys.includes(name)) continue;
            const audioCache = await caches.open(name);
            audioCaches.set(language, audioCache);
            hashesByLanguage.set(language, await readAudioHashes(appCache, language));
        }
    } catch (_) {
        return false;
    }

    // Validate every existing language cache against the matching language inventory.
    for (const [language, audioCache] of audioCaches) {
        const currentHashes = hashesByLanguage.get(language);
        if (!currentHashes) {
            // If the current cache already contains audio, keep legacy sources until
            // an inventory is available to verify (and, if needed, replace) those bytes.
            try {
                const unverifiedRequests = await audioCache.keys();
                if (unverifiedRequests.some((request) => audioLanguageFromRequest(request) === language)) {
                    migrationComplete = false;
                }
            } catch (_) {
                return false;
            }
            continue;
        }
        let cachedRequests;
        try {
            cachedRequests = await audioCache.keys();
        } catch (_) {
            return false;
        }
        for (const request of cachedRequests) {
            const requestLanguage = audioLanguageFromRequest(request);
            if (requestLanguage !== language) continue;
            const match = new URL(request.url).pathname.match(/\/audio\/[a-z]{2}(?:-[A-Z]{2})?\/([a-f0-9]{12})\.mp3$/i);
            if (!match) continue;
            const id = match[1].toLowerCase();
            try {
                const response = await audioCache.match(request);
                const expectedHash = currentHashes[id];
                if (!response || response.status !== 200) {
                    await audioCache.delete(request);
                    continue;
                }
                if (!expectedHash) {
                    // Keep cached bytes when the inventory cannot verify this clip.
                    // Also retain legacy app caches until the missing fingerprint is resolved.
                    migrationComplete = false;
                    continue;
                }
                const bytes = await response.clone().arrayBuffer();
                if (!bytes.byteLength || await sha256Hex(bytes) !== expectedHash) {
                    await audioCache.delete(request);
                }
            } catch (_) {
                migrationComplete = false;
            }
        }
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
            const language = audioLanguageFromRequest(request);
            if (!language) continue;
            try {
                let audioCache = audioCaches.get(language);
                if (!audioCache) {
                    audioCache = await caches.open(audioCacheName(language));
                    audioCaches.set(language, audioCache);
                    hashesByLanguage.set(language, await readAudioHashes(appCache, language));
                }
                if (await audioCache.match(request)) continue;
                const response = await source.match(request);
                if (!response || response.status !== 200) continue;
                const bytes = await response.clone().arrayBuffer();
                if (!bytes.byteLength) continue;

                const currentHashes = hashesByLanguage.get(language);
                if (!currentHashes) {
                    // Without the matching inventory, do not move an unverified clip
                    // or delete the only legacy copy during cache cleanup.
                    migrationComplete = false;
                    continue;
                }
                const match = new URL(request.url).pathname.match(/\/audio\/[a-z]{2}(?:-[A-Z]{2})?\/([a-f0-9]{12})\.mp3$/i);
                const expectedHash = match ? currentHashes[match[1].toLowerCase()] : null;
                if (!expectedHash) {
                    // Preserve the legacy source when this clip has no verifiable fingerprint.
                    migrationComplete = false;
                    continue;
                }
                if (await sha256Hex(bytes) !== expectedHash) continue;
                await audioCache.put(request, response.clone());
            } catch (_) {
                // Keep every legacy cache if any eligible audio entry could not be copied.
                migrationComplete = false;
            }
        }
    }

    if (!migrationComplete) return false;

    // Delete old app caches only after eligible audio clips have been copied.
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
        // Start the new voice library with an empty cache; never reuse old Piper clips.
        try {
            await caches.delete('guardi-audio-v1');
        } catch (_) {
            // Retry cleanup on the next activation.
        }
        await self.clients.claim();
    })());
});

// Stale-while-revalidate. MP3 use a persistent cache and support single byte ranges.
self.addEventListener('fetch', (e) => {
    const req = e.request;
    const requestUrl = new URL(req.url);
    if (req.method !== 'GET' || requestUrl.origin !== self.location.origin) return;
    const audioLanguage = audioLanguageFromRequest(req);
    const audioRequest = audioLanguage !== null;
    // The offline preparation manager verifies SHA-256 before writing a new clip.
    // Let its explicit fetch reach the network without the normal background cache write.
    if (audioRequest && req.headers.get('x-offline-audio-preparation') === '1') {
        e.respondWith(fetch(withoutRangeHeader(req), { cache: 'no-store' }));
        return;
    }
    const targetCacheName = audioRequest ? audioCacheName(audioLanguage) : CACHE_NAME;
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
            let expectedHash = null;
            if (audioRequest) {
                const clipId = audioClipIdFromRequest(cacheRequest);
                try {
                    const appCache = await caches.open(CACHE_NAME);
                    const hashes = await readAudioHashes(appCache, audioLanguage);
                    expectedHash = clipId && hashes ? hashes[clipId] : null;
                } catch (_) {
                    // Playback may continue online, but audio without an inventory
                    // fingerprint must never be trusted or persisted as offline-ready.
                }
            }

            let cached = await cache.match(cacheRequest);
            if (cached && audioRequest) {
                if (await hasValidAudioHash(cached, expectedHash)) {
                    // A cache hit is trusted only when its bytes match the active inventory.
                } else {
                    if (expectedHash) {
                        try { await cache.delete(cacheRequest); } catch (_) {}
                    }
                    cached = null;
                }
            }

            if (!cached && audioRequest) {
                try {
                    const keys = await caches.keys();
                    for (const name of keys) {
                        if (!name.startsWith('bahasa-studio-') || name === CACHE_NAME) continue;
                        const legacy = await caches.open(name);
                        const candidate = await legacy.match(cacheRequest);
                        if (candidate && await hasValidAudioHash(candidate, expectedHash)) {
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
            const network = fetchFresh.then(async (res) => {
                if (audioRequest) {
                    if (res && res.status === 200 && expectedHash) {
                        const verified = await hasValidAudioHash(res, expectedHash);
                        if (!verified) {
                            finishCacheUpdate();
                            return null;
                        }
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
                        // Missing inventory/hash: return online audio, but do not cache it.
                        finishCacheUpdate();
                    }
                } else if (res && res.status === 200) {
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
