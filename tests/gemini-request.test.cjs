const test = require('node:test');
const assert = require('node:assert/strict');
const GeminiRequest = require('../gemini-request.js');

function response(status, body) {
    return {
        ok: status >= 200 && status < 300,
        status,
        text: async () => body
    };
}

test('envía JSON por POST con la clave en el header y devuelve JSON válido', async () => {
    let request;
    const result = await GeminiRequest.postJson('/generate', 'test-key', { prompt: 'hola' }, {
        fetchImpl: async (url, options) => {
            request = { url, options };
            return response(200, '{"candidates":[{"text":"ok"}]}');
        }
    });
    assert.equal(request.url, '/generate');
    assert.equal(request.options.method, 'POST');
    assert.equal(request.options.headers['x-goog-api-key'], 'test-key');
    assert.equal(JSON.parse(request.options.body).prompt, 'hola');
    assert.equal(result.candidates[0].text, 'ok');
});

test('convierte errores HTTP con JSON de Gemini en mensajes claros', async () => {
    await assert.rejects(
        GeminiRequest.postJson('/generate', 'key', {}, {
            fetchImpl: async () => response(429, '{"error":{"message":"Quota exceeded"}}')
        }),
        error => error.code === 'GEMINI_HTTP_ERROR' && /HTTP 429/.test(error.message) && /Quota exceeded/.test(error.message)
    );
});

test('informa el estado HTTP aunque el cuerpo de error no sea JSON', async () => {
    await assert.rejects(
        GeminiRequest.postJson('/generate', 'key', {}, {
            fetchImpl: async () => response(502, '<html>bad gateway</html>')
        }),
        error => error.code === 'GEMINI_HTTP_ERROR' && /HTTP 502/.test(error.message)
    );
});

test('rechaza una respuesta exitosa cuyo cuerpo no sea JSON válido', async () => {
    await assert.rejects(
        GeminiRequest.postJson('/generate', 'key', {}, {
            fetchImpl: async () => response(200, 'not-json')
        }),
        error => error.code === 'GEMINI_INVALID_JSON' && /JSON no válida/.test(error.message)
    );
});

test('aborta solicitudes que superan el timeout configurado', async () => {
    await assert.rejects(
        GeminiRequest.postJson('/generate', 'key', {}, {
            timeoutMs: 5,
            fetchImpl: (_url, options) => new Promise((resolve, reject) => {
                options.signal.addEventListener('abort', () => {
                    const error = new Error('aborted');
                    error.name = 'AbortError';
                    reject(error);
                });
            })
        }),
        error => error.code === 'GEMINI_TIMEOUT' && /tiempo de espera/.test(error.message)
    );
});

test('traduce fallos de red a un mensaje comprensible', async () => {
    await assert.rejects(
        GeminiRequest.postJson('/generate', 'key', {}, {
            fetchImpl: async () => { throw new TypeError('network down'); }
        }),
        error => error.code === 'GEMINI_NETWORK_ERROR' && /Comprueba tu conexión/.test(error.message)
    );
});

test('las tres funciones opcionales usan el cliente común', () => {
    const fs = require('node:fs');
    const path = require('node:path');
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    assert.equal((html.match(/GeminiRequest\.postJson\(/g) || []).length, 3);
    assert.match(html, /<script src="\.\/gemini-request\.js"><\/script>/);
    assert.doesNotMatch(html, /const res = await fetch\(this\.url/);
});
