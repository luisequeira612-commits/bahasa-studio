const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'audio-engine.js'), 'utf8');

function createEngine() {
    const spoken = [];
    let cancelCalls = 0;
    const statuses = {
        audioVoiceStatus: { textContent: '' },
        voiceTestStatus: { textContent: '' }
    };
    const synth = {
        getVoices: () => [],
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
    const context = {
        window: { speechSynthesis: synth },
        document: { getElementById: id => statuses[id] || null },
        SpeechSynthesisUtterance: Utterance,
        alert: () => {}
    };
    vm.runInNewContext(source, context);
    return {
        engine: context.window.AudioEngine,
        spoken,
        statuses,
        get cancelCalls() { return cancelCalls; }
    };
}

test('sin voz indonesia no reproduce audio ni recurre a la voz predeterminada', () => {
    const setup = createEngine();
    setup.engine.voices = [];
    setup.engine.idVoice = null;
    setup.engine.selectedVoice = null;

    setup.engine.speak('Halo!');

    assert.equal(setup.spoken.length, 0);
    assert.equal(setup.cancelCalls, 0);
    assert.match(setup.statuses.audioVoiceStatus.textContent, /no se reproducirá audio/i);
    assert.match(setup.statuses.audioVoiceStatus.textContent, /pronunciación incorrecta/i);
});

test('rechaza explícitamente una voz seleccionada que no sea indonesia', () => {
    const setup = createEngine();
    const englishVoice = { name: 'English voice', lang: 'en-US' };
    setup.engine.voices = [englishVoice];
    setup.engine.selectedVoice = englishVoice;
    setup.engine.idVoice = null;

    setup.engine.speak('Halo!');

    assert.equal(setup.spoken.length, 0);
    assert.equal(setup.cancelCalls, 0);
    assert.match(setup.statuses.audioVoiceStatus.textContent, /voz indonesia disponible/i);
});

test('usa una voz indonesia disponible y fija el idioma de la utterance', () => {
    const setup = createEngine();
    const voice = { name: 'Bahasa Indonesia', lang: 'id-ID' };
    setup.engine.voices = [voice];
    setup.engine.idVoice = voice;
    setup.engine.selectedVoice = voice;

    setup.engine.speak('Halo!');

    assert.equal(setup.spoken.length, 1);
    assert.equal(setup.spoken[0].text, 'Halo!');
    assert.equal(setup.spoken[0].lang, 'id-ID');
    assert.equal(setup.spoken[0].voice, voice);
    assert.equal(setup.cancelCalls, 1);
});

test('el botón de prueba explica que no habrá audio si falta una voz indonesia', () => {
    const setup = createEngine();
    setup.engine.voices = [];
    setup.engine.idVoice = null;
    setup.engine.selectedVoice = null;

    setup.engine.testVoice();

    assert.equal(setup.spoken.length, 0);
    assert.match(setup.statuses.voiceTestStatus.textContent, /no se reproducirá audio/i);
    assert.match(setup.statuses.audioVoiceStatus.textContent, /pronunciación incorrecta/i);
});

test('el código ya no anuncia el uso de una voz predeterminada como sustituto', () => {
    assert.doesNotMatch(source, /voz predeterminada del sistema con el idioma id-ID/i);
});
