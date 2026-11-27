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
    const hint = { textContent: '💡 Toca una palabra en indonesio para consultar su significado sin salir de la lección.' };
    const languageTrigger = { attributes: {}, setAttribute(name, value) { this.attributes[name] = value; } };
    const statuses = {
        audioVoiceStatus: { textContent: '' },
        voiceTestStatus: { textContent: '' },
        exerciseArea: { querySelectorAll: selector => selector === 'p' ? [hint] : [] },
        studyLanguageTrigger: languageTrigger
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
                getLanguage: () => options.language || { code: 'id', locale: 'id-ID', name: 'Indonesio', audioPath: './audio/id/', voiceStatus: 'configured', testPhrase: 'terima kasih' }
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
        hint,
        languageTrigger,
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

test('si falta el MP3 y no hay voz enumerada, solicita al navegador la voz del locale activo', () => {
    const setup = createEngine();
    setup.engine.speak('frase sin clip');
    setup.createdAudio[0].fail();
    assert.equal(setup.spoken.length, 1);
    assert.equal(setup.spoken[0].lang, 'id-ID');
    assert.equal(setup.spoken[0].voice, null);
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


test('el botón de prueba no reproduce una frase indonesia para un idioma sin frase configurada', () => {
    const language = { code: 'pt-BR', locale: 'pt-BR', name: 'Portugués', audioPath: './audio/pt-BR/' };
    const setup = createEngine({ language });
    assert.equal(setup.engine.testVoice(), false);
    assert.equal(setup.createdAudio.length, 0);
    assert.equal(setup.spoken.length, 0);
    assert.match(setup.statuses.voiceTestStatus.textContent, /no hay una frase de prueba configurada/i);
});

test('usa la ruta y el locale de la configuración del idioma activo', () => {
    const language = { code: 'pt-BR', locale: 'pt-BR', name: 'Portugués', audioPath: './audio/pt-BR/' };
    const voice = { name: 'Portuguese voice', lang: 'pt-BR' };
    const setup = createEngine({ language, voices: [{ name: 'Indonesian voice', lang: 'id-ID' }, voice] });
    setup.engine.speak('bom dia');
    const expected = crypto.createHash('sha1').update('bom dia', 'utf8').digest('hex').slice(0, 12);
    assert.equal(setup.createdAudio[0].src, './audio/pt-BR/' + expected + '.mp3');
    setup.createdAudio[0].fail();
    assert.equal(setup.spoken.length, 1);
    assert.equal(setup.spoken[0].lang, 'pt-BR');
    assert.equal(setup.spoken[0].voice, voice);
});

test('Portugués usa pt-BR del navegador aunque no haya voz enumerada', () => {
    const language = { code: 'pt-BR', locale: 'pt-BR', name: 'Portugués de Brasil', audioPath: './audio/pt-BR/' };
    const setup = createEngine({ language });
    setup.engine.speak('bom dia');
    setup.createdAudio[0].fail();
    assert.equal(setup.spoken.length, 1);
    assert.equal(setup.spoken[0].lang, 'pt-BR');
    assert.equal(setup.spoken[0].voice, null);
    assert.match(setup.statuses.audioVoiceStatus.textContent, /Portugués de Brasil/i);
});


test('expone la voz seleccionada con un nombre neutral al idioma activo', () => {
    const voice = { name: 'Portuguese voice', lang: 'pt-BR' };
    const setup = createEngine({ language: { code: 'pt-BR', locale: 'pt-BR', name: 'Portugués', audioPath: './audio/pt-BR/' }, voices: [voice] });
    setup.engine.refreshVoices();
    assert.equal(setup.engine.activeLanguageVoice, voice);
    assert.equal(setup.engine.idVoice, undefined);
});


test('acepta una voz pt-PT como respaldo para el curso pt-BR', () => {
    const language = { code: 'pt-BR', locale: 'pt-BR', name: 'Portugués de Brasil', audioPath: './audio/pt-BR/' };
    const voice = { name: 'Portuguese Portugal', lang: 'pt-PT' };
    const setup = createEngine({ language, voices: [voice] });
    setup.engine.speak('bom dia');
    setup.createdAudio[0].fail();
    assert.equal(setup.spoken.length, 1);
    assert.equal(setup.spoken[0].lang, 'pt-BR');
    assert.equal(setup.spoken[0].voice, voice);
});


test('localiza el mensaje de consulta y la etiqueta accesible al idioma activo', () => {
    const language = { code: 'pt-BR', locale: 'pt-BR', name: 'Portugués', audioPath: './audio/pt-BR/' };
    const setup = createEngine({ language });
    setup.engine.localizeCourseLabels();
    assert.equal(setup.hint.textContent, '💡 Toca una palabra en portugués para consultar su significado sin salir de la lección.');
    assert.equal(setup.languageTrigger.attributes['aria-label'], 'Cambiar idioma de estudio. Portugués actual');
});

test('las seis palabras iniciales de PT-BR usan la ruta y el locale portugueses', () => {
    const language = { code: 'pt-BR', locale: 'pt-BR', name: 'Portugués', audioPath: './audio/pt-BR/' };
    for (const word of ['olá', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'tchau']) {
        const setup = createEngine({ language });
        setup.engine.speak(word);
        const expected = crypto.createHash('sha1').update(word, 'utf8').digest('hex').slice(0, 12);
        assert.equal(setup.createdAudio[0].src, './audio/pt-BR/' + expected + '.mp3', word);
        setup.createdAudio[0].fail();
        assert.equal(setup.spoken.length, 1, word);
        assert.equal(setup.spoken[0].text, word, word);
        assert.equal(setup.spoken[0].lang, 'pt-BR', word);
    }
});
