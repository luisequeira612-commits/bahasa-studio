'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const tapScript = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .map(match => match[1])
    .find(source => source.includes('window.getTapTranslationVocabulary'));
assert.ok(tapScript, 'the shared tap-translation module exists');

function createPortugueseTapHarness() {
    const documentListeners = {};
    const windowListeners = {};
    const translationText = { textContent: '' };
    const saveButton = {
        dataset: {}, hidden: false, disabled: false, textContent: '',
        addEventListener() {}
    };
    const bubble = {
        dataset: {}, hidden: true,
        classList: { add() {}, remove() {} },
        style: { setProperty() {} },
        contains() { return false; },
        getBoundingClientRect() { return { width: 180, height: 54 }; }
    };
    const document = {
        readyState: 'complete',
        activeElement: null,
        getElementById(id) {
            return ({
                tapTranslationBubble: bubble,
                tapTranslationText: translationText,
                tapTranslationSave: saveButton
            })[id] || null;
        },
        addEventListener(type, callback) { documentListeners[type] = callback; }
    };
    const languageManager = {
        getActiveLanguage: () => 'pt-BR',
        getLocale: code => code === 'pt-BR' ? 'pt-BR' : 'es'
    };
    const vocabulary = [
        { id: 'ptbr_ola', target: 'olá', translation: 'hola', example: 'Olá!', exampleTranslation: '¡Hola!' },
        { id: 'ptbr_oi', target: 'oi', translation: 'hola informal', example: 'Oi, tudo bem?', exampleTranslation: 'Hola, ¿todo bien?' },
        { id: 'ptbr_bom_dia', target: 'bom dia', translation: 'buenos días', example: 'Bom dia!', exampleTranslation: '¡Buenos días!' },
        { id: 'ptbr_boa_tarde', target: 'boa tarde', translation: 'buenas tardes', example: 'Boa tarde!', exampleTranslation: '¡Buenas tardes!' },
        { id: 'ptbr_boa_noite', target: 'boa noite', translation: 'buenas noches', example: 'Boa noite!', exampleTranslation: '¡Buenas noches!' },
        { id: 'ptbr_tchau', target: 'tchau', translation: 'adiós', example: 'Tchau, Ana!', exampleTranslation: '¡Adiós, Ana!' }
    ];
    const window = {
        LanguageManager: languageManager,
        innerWidth: 360,
        innerHeight: 800,
        addEventListener(type, callback) { windowListeners[type] = callback; }
    };
    const sandbox = {
        window, document, LanguageManager: languageManager,
        CurriculumLoader: {
            adaptVocabulary(word, language) {
                if (language !== 'pt-BR') return null;
                return {
                    id: word.id, text: word.target, translation: word.translation,
                    example: word.example, exampleTranslation: word.exampleTranslation
                };
            }
        },
        getLearningLevels: () => [{ units: [{ vocab: vocabulary }] }],
        LessonEngine: { currentUnit: null },
        Set, Array, String, Object, Number, Math, RegExp
    };
    vm.runInNewContext(tapScript, sandbox);
    return { window, documentListeners, bubble, translationText, saveButton };
}

test('Portuguese lesson words resolve to Spanish meanings and the tap bubble opens', () => {
    const harness = createPortugueseTapHarness();
    const vocabulary = harness.window.getTapTranslationVocabulary();
    assert.deepEqual(
        Array.from(vocabulary, word => [word.text, word.translation]),
        [['olá', 'hola'], ['oi', 'hola informal'], ['bom dia', 'buenos días'],
            ['boa tarde', 'buenas tardes'], ['boa noite', 'buenas noches'], ['tchau', 'adiós']]
    );

    const markup = harness.window.renderTapTranslationSentence('Olá, oi, bom dia, boa tarde, boa noite, tchau!', 'target');
    for (const meaning of ['hola', 'hola informal', 'buenos días', 'buenas tardes', 'buenas noches', 'adiós']) {
        assert.ok(markup.includes('data-translation="' + meaning + '"'), meaning + ' is available in the tap index');
    }

    const button = {
        dataset: { translation: 'buenos días', vocabId: 'ptbr_bom_dia' },
        isConnected: true,
        setAttribute() {},
        getBoundingClientRect() { return { left: 60, right: 110, top: 100, bottom: 124, width: 50, height: 24 }; },
        focus() {}
    };
    const click = harness.documentListeners.click;
    assert.equal(typeof click, 'function');
    click({
        target: { closest: selector => selector === '.tap-translation-word' ? button : null },
        detail: 1,
        preventDefault() {}
    });
    assert.equal(harness.translationText.textContent, 'buenos días');
    assert.equal(harness.bubble.hidden, false);
    assert.equal(harness.saveButton.dataset.vocabId, 'ptbr_bom_dia');
});
