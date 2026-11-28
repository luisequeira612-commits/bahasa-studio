const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const crypto = require('node:crypto');

const source = fs.readFileSync(path.join(__dirname, '..', 'audio-engine.js'), 'utf8');

function createEngine(options = {}) {
    const spoken = [];
    const createdAudio = [];
    let availableVoices = options.voices || [];
    let cancelCalls = 0;
    const statuses = {
        audioVoiceStatus: { textContent: '' },
        voiceTestStatus: { textContent: '' }
    };
    const synth = {
        getVoices: () => availableVoices,
        cancel: () => { cancelCalls++; },
        speak: utterance => spoken.push(utterance)
    };
    class Utterance {
        constructor(text) {
            this.text = text;
            this.lang = '';
            this.voice = null;
            this.rate = 1;
        }
    }
    class FakeAudio {
        constructor(src) {
            this.src = src;
            this.playbackRate = 1;
            this.preload = '';
            this.playCalls = 0;
            this.paused = false;
            createdAudio.push(this);
        }
        play() {
            this.playCalls++;
            return options.playPromise ? options.playPromise(this) : Promise.resolve();
        }
        pause() { this.paused = true; }
        fail() { if (this.onerror) this.onerror(); }
        end() { if (this.onended) this.onended(); }
    }
    const context = {
        window: {
            speechSynthesis: options.noSynth ? null : synth,
            LanguageManager: {
                getActiveLanguage: () => (options.language || { code: 'id' }).code,
                getLanguage: () => options.language || { code: 'id', locale: 'id-ID', name: 'Indonesio', audioPath: './audio/id/', testPhrase: 'terima kasih' }
            }
        },
        document: {
            baseURI: 'https://example.test/bahasa-studio/',
            getElementById: id => statuses[id] || null
        },
        SpeechSynthesisUtterance: Utterance,
        Audio: options.noAudio ? undefined : FakeAudio,
        TextEncoder,
        Uint8Array,
        DataView,
        alert: () => {}
    };
    vm.runInNewContext(source, context);
    return {
        engine: context.window.AudioEngine,
        spoken,
        createdAudio,
        statuses,
        setAvailableVoices(voices) { availableVoices = voices; },
        get cancelCalls() { return cancelCalls; }
    };
}

test('hashText coincide con el SHA-1 de export-audio-manifest y normaliza espacios/mayúsculas', () => {
    const setup = createEngine();
    const expected = crypto.createHash('sha1').update('halo dunia', 'utf8').digest('hex').slice(0, 12);
    assert.equal(setup.engine.hashText('  Halo   Dunia  '), expected);
});

test('reproduce el MP3 incluido aunque el dispositivo no tenga voz indonesia', () => {
    const setup = createEngine();
    setup.engine.speak('Halo!');
    const expected = crypto.createHash('sha1').update('halo!', 'utf8').digest('hex').slice(0, 12);
    assert.equal(setup.createdAudio.length, 1);
    assert.equal(setup.createdAudio[0].src, './audio/id/' + expected + '.mp3');
    assert.equal(setup.createdAudio[0].playCalls, 1);
    assert.equal(setup.createdAudio[0].playbackRate, 1);
    assert.equal(setup.spoken.length, 0);
    assert.match(setup.statuses.audioVoiceStatus.textContent, /grabaciones Piper/i);
});

test('si falta el MP3 y no hay voz indonesia, informa el problema sin usar otra lengua', () => {
    const setup = createEngine();
    setup.engine.speak('frase sin clip');
    setup.createdAudio[0].fail();
    assert.equal(setup.spoken.length, 0);
    assert.match(setup.statuses.audioVoiceStatus.textContent, /ni una voz instalada para indonesio/i);
});

test('si falta el MP3, usa únicamente una voz indonesia instalada como respaldo', () => {
    const voice = { name: 'Bahasa Indonesia', lang: 'id-ID' };
    const setup = createEngine({ voices: [voice] });
    setup.engine.speak('frase sin clip');
    setup.createdAudio[0].fail();
    assert.equal(setup.spoken.length, 1);
    assert.equal(setup.spoken[0].text, 'frase sin clip');
    assert.equal(setup.spoken[0].lang, 'id-ID');
    assert.equal(setup.spoken[0].voice, voice);
});

test('la velocidad predeterminada reproduce el audio a velocidad natural', () => {
    const setup = createEngine();
    assert.equal(setup.engine.rate, 1);
    setup.engine.speak('Makan');
    assert.equal(setup.createdAudio[0].playbackRate, 1);
});

test('la velocidad seleccionada se aplica al MP3 que está sonando', () => {
    const setup = createEngine();
    setup.engine.speak('Halo!');
    assert.equal(setup.engine.setRate(0.7, false), true);
    assert.equal(setup.createdAudio[0].playbackRate, 0.7);
});

test('si el navegador no admite Audio, intenta solo el respaldo indonesio', () => {
    const voice = { name: 'Bahasa Indonesia', lang: 'id-ID' };
    const setup = createEngine({ noAudio: true, voices: [voice] });
    setup.engine.speak('Halo!');
    assert.equal(setup.createdAudio.length, 0);
    assert.equal(setup.spoken.length, 1);
    assert.equal(setup.spoken[0].voice, voice);
});

test('el botón de prueba reproduce una frase incluida sin exigir voces del dispositivo', () => {
    const setup = createEngine();
    setup.engine.testVoice();
    assert.equal(setup.createdAudio.length, 1);
    assert.equal(setup.createdAudio[0].src, './audio/id/' +
        crypto.createHash('sha1').update('terima kasih', 'utf8').digest('hex').slice(0, 12) + '.mp3');
    assert.match(setup.statuses.voiceTestStatus.textContent, /grabación Piper incluida/i);
});


test('el botón de prueba usa una frase del idioma activo y no una frase indonesia', () => {
    const language = {
        code: 'pt-BR', locale: 'pt-BR', name: 'Portugués',
        audioPath: './audio/pt-BR/', audioMode: 'speechSynthesis',
        voiceFallbackLocales: ['pt-PT'], testPhrase: 'olá'
    };
    const voice = { name: 'Portuguese voice', lang: 'pt-BR' };
    const setup = createEngine({ language, voices: [voice] });
    assert.equal(setup.engine.testVoice(), true);
    assert.equal(setup.createdAudio.length, 0);
    assert.equal(setup.spoken.length, 1);
    assert.equal(setup.spoken[0].text, 'olá');
    assert.equal(setup.spoken[0].lang, 'pt-BR');
    assert.match(setup.statuses.voiceTestStatus.textContent, /voz del dispositivo/i);
});

test('portugués usa speechSynthesis directamente y prioriza la voz pt-BR', () => {
    const preferred = { name: 'Brazilian Portuguese', lang: 'pt-BR' };
    const fallback = { name: 'European Portuguese', lang: 'pt-PT' };
    const language = {
        code: 'pt-BR', locale: 'pt-BR', name: 'Portugués de Brasil',
        audioPath: './audio/pt-BR/', audioMode: 'speechSynthesis',
        voiceFallbackLocales: ['pt-PT']
    };
    const setup = createEngine({ language, voices: [fallback, preferred] });
    assert.equal(setup.engine.speak('bom dia'), true);
    assert.equal(setup.createdAudio.length, 0, 'PT-BR has no recorded clips and must not try Indonesian or nonexistent MP3s');
    assert.equal(setup.spoken.length, 1);
    assert.equal(setup.spoken[0].lang, 'pt-BR');
    assert.equal(setup.spoken[0].voice, preferred);
    assert.equal(setup.engine.activeLanguageVoice, preferred);
});

test('usa pt-PT como respaldo cuando no hay una voz pt-BR', () => {
    const fallback = { name: 'European Portuguese', lang: 'pt-PT' };
    const language = {
        code: 'pt-BR', locale: 'pt-BR', name: 'Portugués de Brasil',
        audioPath: './audio/pt-BR/', audioMode: 'speechSynthesis',
        voiceFallbackLocales: ['pt-PT']
    };
    const setup = createEngine({ language, voices: [{ name: 'Indonesian voice', lang: 'id-ID' }, fallback] });
    assert.equal(setup.engine.speak('bom dia'), true);
    assert.equal(setup.createdAudio.length, 0);
    assert.equal(setup.spoken.length, 1);
    assert.equal(setup.spoken[0].lang, 'pt-PT');
    assert.equal(setup.spoken[0].voice, fallback);
});

test('no usa una voz de otro idioma si faltan pt-BR y pt-PT', () => {
    const language = {
        code: 'pt-BR', locale: 'pt-BR', name: 'Portugués de Brasil',
        audioPath: './audio/pt-BR/', audioMode: 'speechSynthesis',
        voiceFallbackLocales: ['pt-PT']
    };
    const setup = createEngine({ language, voices: [{ name: 'Indonesian voice', lang: 'id-ID' }] });
    assert.equal(setup.engine.speak('bom dia'), false);
    assert.equal(setup.createdAudio.length, 0);
    assert.equal(setup.spoken.length, 0);
    assert.match(setup.statuses.audioVoiceStatus.textContent, /Portugués de Brasil/i);
});


test('expone la voz seleccionada con un nombre neutral al idioma activo', () => {
    const voice = { name: 'Portuguese voice', lang: 'pt-BR' };
    const setup = createEngine({ language: { code: 'pt-BR', locale: 'pt-BR', name: 'Portugués', audioPath: './audio/pt-BR/' }, voices: [voice] });
    setup.engine.refreshVoices();
    assert.equal(setup.engine.activeLanguageVoice, voice);
    assert.equal(setup.engine.idVoice, undefined);
});


test('PT-BR usa speechSynthesis directamente cuando no hay grabaciones del curso', () => {
    const language = {
        code: 'pt-BR', locale: 'pt-BR', name: 'Portugués',
        audioPath: './audio/pt-BR/', audioAvailable: false,
        allowSystemVoiceFallback: true, testPhrase: 'bom dia'
    };
    const voice = { name: 'Português (Brasil)', lang: 'pt-BR' };
    const setup = createEngine({ language, voices: [voice] });
    assert.equal(setup.engine.speak('bom dia'), true);
    assert.equal(setup.createdAudio.length, 0);
    assert.equal(setup.spoken.length, 1);
    assert.equal(setup.spoken[0].lang, 'pt-BR');
    assert.equal(setup.spoken[0].voice, voice);
});

test('PT-BR acepta una voz pt-PT como respaldo y conserva el locale real de esa voz', () => {
    const language = {
        code: 'pt-BR', locale: 'pt-BR', name: 'Portugués',
        audioPath: './audio/pt-BR/', audioAvailable: false,
        allowSystemVoiceFallback: true
    };
    const voice = { name: 'Português (Portugal)', lang: 'pt-PT' };
    const setup = createEngine({ language, voices: [voice] });
    assert.equal(setup.engine.speak('bom dia'), true);
    assert.equal(setup.createdAudio.length, 0);
    assert.equal(setup.spoken[0].lang, 'pt-PT');
    assert.equal(setup.spoken[0].voice, voice);
});

test('PT-BR usa el locale solicitado si speechSynthesis aún no ha publicado su lista de voces', () => {
    const language = {
        code: 'pt-BR', locale: 'pt-BR', name: 'Portugués',
        audioPath: './audio/pt-BR/', audioAvailable: false,
        allowSystemVoiceFallback: true
    };
    const setup = createEngine({ language, voices: [] });
    assert.equal(setup.engine.speak('bom dia'), true);
    assert.equal(setup.createdAudio.length, 0);
    assert.equal(setup.spoken.length, 1);
    assert.equal(setup.spoken[0].lang, 'pt-BR');
    assert.equal(setup.spoken[0].voice, null);
});

test('la prueba de audio PT-BR reproduce su frase configurada mediante speechSynthesis', () => {
    const language = {
        code: 'pt-BR', locale: 'pt-BR', name: 'Portugués',
        audioPath: './audio/pt-BR/', audioAvailable: false,
        allowSystemVoiceFallback: true, testPhrase: 'bom dia'
    };
    const voice = { name: 'Português (Brasil)', lang: 'pt-BR' };
    const setup = createEngine({ language, voices: [voice] });
    assert.equal(setup.engine.testVoice(), true);
    assert.equal(setup.createdAudio.length, 0);
    assert.equal(setup.spoken[0].text, 'bom dia');
    assert.match(setup.statuses.voiceTestStatus.textContent, /voz del dispositivo para portugués/i);
});

test('la síntesis del curso detiene una grabación anterior antes de hablar', () => {
    const language = {
        code: 'pt-BR', locale: 'pt-BR', name: 'Portugués',
        audioPath: './audio/pt-BR/', audioAvailable: false,
        allowSystemVoiceFallback: true
    };
    const voice = { name: 'Português (Brasil)', lang: 'pt-BR' };
    const setup = createEngine({ language, voices: [voice] });
    let pauseCalls = 0;
    setup.engine.currentAudio = { pause: () => { pauseCalls += 1; } };
    assert.equal(setup.engine.speak('bom dia'), true);
    assert.equal(pauseCalls, 1);
});
