const CACHE_NAME = 'bahasa-studio-v3.8.89';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './assessment.html', './assessment-engine.js', './conversation-engine.js', './study-history.js', './study-activity.js', './adaptive-learning.js', './curriculum-a1.js', './curriculum-a2.js', './styles.css', './audio-engine.js', './pronunciation-engine.js', './writing-practice.js', './apple-touch-icon.png', './icon-192.png', './icon-512-any.png', './icon-512-maskable.png', './assets/guardi/guardi-normal.svg', './assets/guardi/guardi-feliz.svg', './assets/guardi/guardi-triste.svg', './assets/guardi/guardi-celebrando.svg', './assets/guardi/guardi-pensando.svg', './assets/guardi/guardi-mark.svg', './assets/guardi/guardi-icon.svg'];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS.map((u) => new Request(u, { cache: 'reload' })))));
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(
            keys.filter((k) => k.startsWith('bahasa-studio-') && k !== CACHE_NAME).map((k) => caches.delete(k))
        );
        await self.clients.claim();
    })());
});

// Stale-while-revalidate: responde al instante con la copia guardada y la actualiza
// en segundo plano. Solo archivos de la propia app (no toca la API de Gemini).
self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
    e.respondWith(
        caches.open(CACHE_NAME).then(async (cache) => {
            const cached = await cache.match(req);
            const network = fetch(req, { cache: 'no-cache' }).then((res) => {
                if (res && res.ok) cache.put(req, res.clone());
                return res;
            }).catch(() => null);
            if (cached) return cached;
            const res = await network;
            if (res) return res;
            if (req.mode === 'navigate') return cache.match('./index.html');
            return Response.error();
        })
    );
});
