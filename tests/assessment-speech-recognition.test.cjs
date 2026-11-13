const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'assessment.html'), 'utf8');

test('assessment speech capture is opt-in and uses Indonesian recognition', () => {
    assert.match(source, /data-speech-capture/);
    assert.match(source, /recognition\.lang\s*=\s*'id-ID'/);
    assert.match(source, /El micrófono solo se activa al pulsar este botón/);
});

test('assessment speech capture ignores stale results after its input is detached or capture replaced', () => {
    assert.match(source, /function stopSpeechCapture\(\)/);
    assert.match(source, /activeSpeechRecognition===recognition&&input\.isConnected&&status\.isConnected/);
    assert.match(source, /if\(!isCurrentCapture\(\)\)return;/);
});

test('assessment speech capture restores its button and handles unsupported and unavailable services', () => {
    assert.match(source, /Este navegador no ofrece reconocimiento de voz/);
    assert.match(source, /'network':/);
    assert.match(source, /'language-not-supported':/);
    assert.match(source, /if\(button\.isConnected\)button\.disabled=false/);
});

test('assessment stops active speech capture before replacing or submitting assessment content', () => {
    assert.match(source, /function begin\(\)\s*\{\s*stopSpeechCapture\(\);/);
    assert.match(source, /form\.addEventListener\('submit',event=>\{\s*event\.preventDefault\(\);\s*stopSpeechCapture\(\);/);
});

test('speech transcript remains provisional and is not treated as an oral proficiency score', () => {
    assert.match(source, /no es una calificación de pronunciación/);
    assert.match(source, /La producción oral requiere revisión humana/);
});
