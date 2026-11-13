'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const pronunciation = read('pronunciation-engine.js');
const conversation = read('conversation-engine.js');
const assessment = read('assessment.html');
const app = read('index.html');

function section(source, start, end, label) {
    const from = source.indexOf(start);
    const to = source.indexOf(end, from + start.length);
    assert.ok(from >= 0 && to > from, label + ' boundaries must remain discoverable');
    return source.slice(from, to);
}

function assertNoAppOwnedAudioTransport(source, label) {
    for (const pattern of [
        /\bfetch\s*\(/,
        /\bXMLHttpRequest\b/,
        /navigator\s*\.\s*sendBeacon\s*\(/,
        /new\s+MediaRecorder\b/,
        /navigator\s*\.\s*mediaDevices\b/,
        /\bgetUserMedia\s*\(/
    ]) {
        assert.doesNotMatch(source, pattern, label + ' must not add app-managed audio recording or upload');
    }
}

test('pronunciation recognition is explicit, Indonesian-only, and discloses browser processing', () => {
    assert.match(app, /onclick="LessonEngine\.startPronunciationPractice\(\)"/);
    assert.match(pronunciation, /window\.SpeechRecognition\s*\|\|\s*window\.webkitSpeechRecognition/);
    assert.match(pronunciation, /recognition\.lang\s*=\s*'id-ID'/);
    assert.match(pronunciation, /recognition\.continuous\s*=\s*false/);
    assert.match(app, /El micrófono solo se activa al pulsar\. El navegador puede enviar audio a su proveedor de reconocimiento\./);
    assertNoAppOwnedAudioTransport(pronunciation, 'PronunciationEngine');
});

test('conversation dictation starts from its button and keeps cancellation and provider disclosure', () => {
    const capture = section(
        conversation,
        'captureFreeResponse: function (button) {',
        'choose: function (index) {',
        'ConversationEngine.captureFreeResponse'
    );
    assert.match(conversation, /target\.closest\('\[data-conversation-speech\]'\)/);
    assert.match(conversation, /ConversationEngine\.captureFreeResponse\(speechButton\)/);
    assert.match(conversation, /recognition\.lang\s*=\s*'id-ID'/);
    assert.match(conversation, /recognition\.continuous\s*=\s*false/);
    assert.match(conversation, /recognition\.abort\(\)/);
    assert.match(conversation, /El micrófono solo se activa al pulsar\. El navegador puede procesar el audio; la app no guarda grabaciones\./);
    assertNoAppOwnedAudioTransport(capture, 'Conversation free-response recognition');
});

test('assessment dictation starts from an explicit button and discloses browser-provider processing', () => {
    const capture = section(
        assessment,
        'function startSpeechCapture(',
        "questions.addEventListener('input'",
        'assessment startSpeechCapture'
    );
    assert.match(assessment, /questions\.addEventListener\('click'/);
    assert.match(assessment, /startSpeechCapture\(id,'speech-status-'\+id,button\)/);
    assert.match(assessment, /El micrófono solo se activa al pulsar este botón\. El navegador puede procesar el audio mediante su proveedor de reconocimiento\./);
    assert.match(capture, /recognition\.lang\s*=\s*'id-ID'/);
    assert.match(capture, /recognition\.continuous\s*=\s*false/);
    assertNoAppOwnedAudioTransport(capture, 'Assessment speech capture');
});

test('the application does not claim to identify the browser speech-recognition provider', () => {
    const recognitionSources = pronunciation + '\n' + conversation + '\n' + assessment;
    assert.doesNotMatch(recognitionSources, /Google Cloud Speech|Azure Speech|AWS Transcribe|OpenAI Whisper/);
});
