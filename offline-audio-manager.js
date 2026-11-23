(function () {
    'use strict';

    const CACHE_NAME = 'guardi-audio-v2';
    const AUDIO_LANGUAGES = new Set(['pt-BR', 'en', 'it', 'fr', 'de', 'nl', 'ru', 'ja', 'ko', 'id']);
    let activeLanguage = 'id';
    const LEVELS = ['A1', 'A2', 'B1'];
    const elements = {};
    let manifestEntries = [];
    let audioHashes = {};
    let cache = null;
    let cachedIds = new Set();
    let failedEntries = [];
    let activeController = null;
    let activeScope = null;

    function selectEntries(entries, level) {
        const seen = new Set();
        return (Array.isArray(entries) ? entries : []).filter(entry => {
            if (!entry || typeof entry.id !== 'string' || !/^[a-f0-9]{12}$/i.test(entry.id)) return false;
            if (seen.has(entry.id)) return false;
            if (level !== 'all' && (!Array.isArray(entry.levels) || !entry.levels.includes(level))) return false;
            seen.add(entry.id);
            return true;
        });
    }

    function languageConfig(language) {
        const code = AUDIO_LANGUAGES.has(language) ? language : 'id';
        const manager = window.LanguageManager;
        const config = manager && typeof manager.getLanguage === 'function' ? manager.getLanguage(code) : null;
        const expectedPath = './audio/' + code + '/';
        const path = config && config.audioPath === expectedPath ? config.audioPath : expectedPath;
        return { code, path };
    }

    function cacheNameForLanguage(language) {
        const code = AUDIO_LANGUAGES.has(language) ? language : 'id';
        return code === 'id' ? CACHE_NAME : CACHE_NAME + '-' + code;
    }

    function inventoryUrlsForLanguage(language) {
        const config = languageConfig(language);
        if (config.code === 'id') return { manifest: './audio/manifest.json', metadata: './audio/metadata.json' };
        return { manifest: config.path + 'manifest.json', metadata: config.path + 'metadata.json' };
    }

    function audioUrl(id, language = activeLanguage) {
        const config = languageConfig(language);
        return new URL(config.path + id + '.mp3', document.baseURI).href;
    }

    function idsFromCacheKeys(keys, language = activeLanguage) {
        const config = languageConfig(language);
        const expectedPrefix = '/audio/' + config.code + '/';
        const ids = new Set();
        for (const request of keys || []) {
            try {
                const pathname = new URL(request.url || request, document.baseURI).pathname;
                const filename = pathname.slice(pathname.lastIndexOf('/') + 1);
                if (!pathname.includes(expectedPrefix) || !/^[a-f0-9]{12}\.mp3$/i.test(filename)) continue;
                ids.add(filename.slice(0, 12).toLowerCase());
            } catch (_) {}
        }
        return ids;
    }

    function formatBytes(bytes) {
        if (!Number.isFinite(bytes) || bytes < 0) return null;
        if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1).replace('.', ',') + ' MB';
    }

    function setStatus(message) {
        if (elements.status) elements.status.textContent = message;
    }

    function setProgress(done, total) {
        if (!elements.progress) return;
        elements.progress.max = Math.max(1, total);
        elements.progress.value = Math.min(done, total);
    }

    async function refreshCacheState() {
        if (!('caches' in window)) throw new Error('Este navegador no permite guardar audio sin conexión.');
        const manager = window.LanguageManager;
        const requested = manager && typeof manager.getActiveLanguage === 'function' ? manager.getActiveLanguage() : 'id';
        activeLanguage = AUDIO_LANGUAGES.has(requested) ? requested : 'id';
        cache = await caches.open(cacheNameForLanguage(activeLanguage));
        cachedIds = idsFromCacheKeys(await cache.keys());
        return cachedIds;
    }

    function countSummary() {
        const parts = LEVELS.map(level => {
            const entries = selectEntries(manifestEntries, level);
            const count = entries.filter(entry => cachedIds.has(entry.id)).length;
            return level + ': ' + count + '/' + entries.length;
        });
        return parts.join(' · ');
    }

    async function loadInventory() {
        const manager = window.LanguageManager;
        const requested = manager && typeof manager.getActiveLanguage === 'function' ? manager.getActiveLanguage() : 'id';
        activeLanguage = AUDIO_LANGUAGES.has(requested) ? requested : 'id';
        const urls = inventoryUrlsForLanguage(activeLanguage);
        const [manifestResponse, metadataResponse] = await Promise.all([
            fetch(urls.manifest, { cache: 'no-cache' }),
            fetch(urls.metadata, { cache: 'no-cache' })
        ]);
        if (!manifestResponse.ok || !metadataResponse.ok) throw new Error('No se pudo consultar el inventario de audio. Conéctate a internet y vuelve a intentarlo.');
        const manifest = await manifestResponse.json();
        const metadata = await metadataResponse.json();
        if (!Array.isArray(manifest) || !metadata || !metadata.audio_hashes) throw new Error('El inventario o las huellas de audio no tienen un formato válido.');
        manifestEntries = manifest;
        audioHashes = metadata.audio_hashes;
        await refreshCacheState();
        const allEntries = selectEntries(manifestEntries, 'all');
        const total = allEntries.length;
        const cachedTotal = allEntries.filter(entry => cachedIds.has(entry.id)).length;
        setProgress(cachedTotal, total);
        const available = await storageCheck();
        const storageLabel = available === null ? '' : ' Espacio estimado disponible: ' + formatBytes(available) + '.';
        setStatus('Biblioteca: ' + cachedTotal + '/' + total + ' audios guardados. ' + countSummary() + '.' + storageLabel);
    }

    async function verifyAudio(blob, expectedHash) {
        if (!expectedHash || !/^[a-f0-9]{64}$/i.test(expectedHash)) {
            throw new Error('No existe una huella SHA-256 válida para este audio.');
        }
        if (!window.crypto || !window.crypto.subtle) {
            throw new Error('Este navegador no permite verificar la integridad del audio.');
        }
        const bytes = await blob.arrayBuffer();
        const digest = await window.crypto.subtle.digest('SHA-256', bytes);
        const actual = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
        if (actual.toLowerCase() !== expectedHash.toLowerCase()) {
            throw new Error('La verificación de integridad no coincide.');
        }
    }

    async function storageCheck() {
        if (!navigator.storage || typeof navigator.storage.estimate !== 'function') return null;
        try {
            const estimate = await navigator.storage.estimate();
            const available = Number(estimate.quota) - Number(estimate.usage);
            if (Number.isFinite(available) && available >= 0) return available;
        } catch (_) {}
        return null;
    }

    async function downloadEntries(entries, scope) {
        if (activeController) return;
        if (!navigator.onLine) {
            setStatus('No hay conexión. Conéctate a internet para preparar los audios.');
            return;
        }
        await refreshCacheState();
        const pending = entries.filter(entry => !cachedIds.has(entry.id));
        failedEntries = [];
        activeScope = scope;
        if (!pending.length) {
            setProgress(entries.length, entries.length);
            setStatus('Este grupo ya está guardado completo. ' + countSummary() + '.');
            updateButtons();
            return;
        }

        const available = await storageCheck();
        if (available !== null && available < 1024 * 1024) {
            setStatus('Queda menos de 1 MB de almacenamiento estimado. Libera espacio antes de continuar.');
            return;
        }

        activeController = new AbortController();
        if (elements.cancel) elements.cancel.disabled = false;
        updateButtons();
        let completed = entries.length - pending.length;
        let failures = 0;
        let storageFull = false;
        setProgress(completed, entries.length);
        setStatus('Preparando ' + scope + ': ' + completed + '/' + entries.length + ' listos; faltan ' + pending.length + '.');

        for (let index = 0; index < pending.length; index++) {
            const entry = pending[index];
            if (activeController.signal.aborted) break;
            const url = audioUrl(entry.id);
            try {
                const response = await fetch(url, { cache: 'no-store', signal: activeController.signal, headers: { 'X-Offline-Audio-Preparation': '1' } });
                if (!response || response.status !== 200) throw new Error('Respuesta HTTP ' + (response ? response.status : 'sin respuesta'));
                const blob = await response.blob();
                if (!blob.size) throw new Error('El archivo de audio está vacío.');
                await verifyAudio(blob, audioHashes[entry.id]);
                await cache.put(url, new Response(blob, { status: 200, headers: { 'Content-Type': 'audio/mpeg' } }));
                cachedIds.add(entry.id);
                completed++;
            } catch (error) {
                if (activeController.signal.aborted) break;
                failures++;
                failedEntries.push(entry);
                if (error && (error.name === 'QuotaExceededError' || /quota|storage full/i.test(String(error.message || '')))) {
                    storageFull = true;
                    failedEntries.push(...pending.slice(index + 1));
                    activeController.abort();
                }
            }
            setProgress(completed, entries.length);
            if ((index + 1) % 4 === 0 || index === pending.length - 1) {
                const left = pending.length - index - 1;
                setStatus('Preparando ' + scope + ': ' + completed + '/' + entries.length + ' listos; ' + left + ' por revisar; ' + failures + ' fallidos.');
            }
            await new Promise(resolve => setTimeout(resolve, 0));
        }

        const cancelled = activeController.signal.aborted;
        activeController = null;
        if (elements.cancel) elements.cancel.disabled = true;
        await refreshCacheState();
        const remaining = entries.length - entries.filter(entry => cachedIds.has(entry.id)).length;
        if (storageFull) {
            setStatus('El almacenamiento del dispositivo se llenó. Se conservaron los audios guardados; libera espacio y pulsa “Reintentar fallidos”.');
        } else if (cancelled) {
            setStatus('Descarga cancelada. Se conservaron los audios ya guardados; faltan ' + remaining + '. Puedes reanudar cuando quieras.');
        } else if (failures) {
            setStatus('Preparación terminada con ' + failures + ' fallidos. Guardados ' + (entries.length - remaining) + '/' + entries.length + '; puedes reintentar solo los fallidos.');
        } else {
            setStatus('Preparación completa: ' + entries.length + '/' + entries.length + ' audios de ' + scope + ' guardados para uso sin conexión.');
        }
        updateButtons();
    }

    function updateButtons() {
        const busy = Boolean(activeController);
        document.querySelectorAll('[data-offline-audio-level]').forEach(button => { button.disabled = busy; });
        if (elements.cancel) elements.cancel.disabled = !busy;
        if (elements.retry) elements.retry.hidden = busy || failedEntries.length === 0;
    }

    async function start(scope) {
        if (!manifestEntries.length) {
            setStatus('El inventario todavía no está listo. Recarga la página con conexión.');
            return;
        }
        const entries = selectEntries(manifestEntries, scope);
        if (!entries.length) {
            setStatus('No se encontraron audios para ' + scope + '.');
            return;
        }
        if (scope === 'all' && !window.confirm('Vas a preparar toda la biblioteca (' + entries.length + ' audios). Usará datos móviles o Wi-Fi y almacenamiento del teléfono. Se recomienda Wi-Fi. ¿Continuar?')) return;
        await downloadEntries(entries, scope);
    }

    function init() {
        elements.status = document.getElementById('offlineAudioStatus');
        elements.progress = document.getElementById('offlineAudioProgress');
        elements.cancel = document.getElementById('offlineAudioCancel');
        elements.retry = document.getElementById('offlineAudioRetry');
        if (!elements.status || !elements.progress) return;

        document.querySelectorAll('[data-offline-audio-level]').forEach(button => {
            button.addEventListener('click', () => start(button.dataset.offlineAudioLevel).catch(error => {
                console.error('No se pudo preparar el audio offline:', error);
                setStatus(error.message || 'No se pudo preparar el audio. Comprueba la conexión y el espacio disponible.');
                activeController = null;
                updateButtons();
            }));
        });
        if (elements.cancel) elements.cancel.addEventListener('click', () => {
            if (activeController) activeController.abort();
        });
        if (elements.retry) elements.retry.addEventListener('click', async () => {
            const retry = failedEntries.slice();
            const scope = activeScope || 'selección anterior';
            failedEntries = [];
            await downloadEntries(retry, scope + ' (reintento)');
        });
        loadInventory().catch(error => {
            console.error('No se pudo cargar el inventario offline:', error);
            setStatus(error.message || 'No se pudo consultar la biblioteca de audio.');
        });
    }

    window.OfflineAudioManager = {
        selectEntries,
        idsFromCacheKeys,
        audioUrl,
        cacheNameForLanguage,
        inventoryUrlsForLanguage,
        formatBytes
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})()
