(function (root, factory) {
    const api = factory();
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    if (root) root.GeminiRequest = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    function requestError(message, code) {
        const error = new Error(message);
        error.code = code;
        return error;
    }

    async function postJson(url, apiKey, payload, options) {
        const settings = options || {};
        const timeoutMs = Number.isFinite(settings.timeoutMs) ? settings.timeoutMs : 30000;
        const fetchImpl = settings.fetchImpl || fetch;
        const Controller = settings.AbortControllerImpl || AbortController;
        const controller = new Controller();
        let timedOut = false;
        const timer = setTimeout(function () {
            timedOut = true;
            controller.abort();
        }, timeoutMs);

        try {
            const response = await fetchImpl(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
            const raw = await response.text();
            if (!response.ok) {
                let errorPayload = null;
                try {
                    errorPayload = raw ? JSON.parse(raw) : null;
                } catch (_) {
                    // El estado HTTP sigue siendo suficiente para informar el fallo.
                }
                const detail = errorPayload && errorPayload.error && errorPayload.error.message;
                throw requestError(
                    'Gemini respondió HTTP ' + response.status +
                    (detail ? ': ' + String(detail).slice(0, 240) : '. Inténtalo más tarde.'),
                    'GEMINI_HTTP_ERROR'
                );
            }

            let data;
            try {
                data = raw ? JSON.parse(raw) : null;
            } catch (_) {
                throw requestError('Gemini devolvió una respuesta JSON no válida.', 'GEMINI_INVALID_JSON');
            }
            if (!data || typeof data !== 'object') {
                throw requestError('Gemini devolvió una respuesta JSON no válida.', 'GEMINI_INVALID_JSON');
            }
            return data;
        } catch (error) {
            if (timedOut || (error && error.name === 'AbortError')) {
                throw requestError('La solicitud a Gemini superó el tiempo de espera (' + Math.round(timeoutMs / 1000) + ' s). Puedes intentarlo de nuevo.', 'GEMINI_TIMEOUT');
            }
            if (error && error.code && String(error.code).startsWith('GEMINI_')) throw error;
            throw requestError('No se pudo conectar con Gemini. Comprueba tu conexión e inténtalo de nuevo.', 'GEMINI_NETWORK_ERROR');
        } finally {
            clearTimeout(timer);
        }
    }

    return { postJson };
}));
