(function (root) {
    'use strict';

    const STORAGE_KEY = 'guardi_active_language';
    const LANGUAGES = Object.freeze({
        'pt-BR': Object.freeze({ code: 'pt-BR', locale: 'pt-BR', name: 'Portugués', flag: '🇧🇷', piperVoice: 'pt_BR-faber-medium', voiceStatus: 'candidate', audioPath: './audio/pt-BR/', curriculum: Object.freeze({}), available: false }),
        en: Object.freeze({ code: 'en', locale: 'en-US', name: 'Inglés', flag: '🇺🇸', piperVoice: 'en_US-lessac-medium', voiceStatus: 'candidate', audioPath: './audio/en/', curriculum: Object.freeze({}), available: false }),
        it: Object.freeze({ code: 'it', locale: 'it-IT', name: 'Italiano', flag: '🇮🇹', piperVoice: 'it_IT-riccardo-x_low', voiceStatus: 'unverified', audioPath: './audio/it/', curriculum: Object.freeze({}), available: false }),
        fr: Object.freeze({ code: 'fr', locale: 'fr-FR', name: 'Francés', flag: '🇫🇷', piperVoice: 'fr_FR-upmc-medium', voiceStatus: 'candidate', audioPath: './audio/fr/', curriculum: Object.freeze({}), available: false }),
        de: Object.freeze({ code: 'de', locale: 'de-DE', name: 'Alemán', flag: '🇩🇪', piperVoice: 'de_DE-thorsten', voiceStatus: 'unverified', audioPath: './audio/de/', curriculum: Object.freeze({}), available: false }),
        nl: Object.freeze({ code: 'nl', locale: 'nl-NL', name: 'Neerlandés', flag: '🇳🇱', piperVoice: 'nl_NL-mls-medium', voiceStatus: 'candidate', audioPath: './audio/nl/', curriculum: Object.freeze({}), available: false }),
        ru: Object.freeze({ code: 'ru', locale: 'ru-RU', name: 'Ruso', flag: '🇷🇺', piperVoice: 'ru_RU-ruslan-medium', voiceStatus: 'candidate', audioPath: './audio/ru/', curriculum: Object.freeze({}), available: false }),
        ja: Object.freeze({ code: 'ja', locale: 'ja-JP', name: 'Japonés', flag: '🇯🇵', piperVoice: 'ja_JP', voiceStatus: 'unverified', audioPath: './audio/ja/', curriculum: Object.freeze({}), available: false }),
        ko: Object.freeze({ code: 'ko', locale: 'ko-KR', name: 'Coreano', flag: '🇰🇷', piperVoice: 'ko_KR-kss-medium', voiceStatus: 'unverified', audioPath: './audio/ko/', curriculum: Object.freeze({}), available: false }),
        id: Object.freeze({ code: 'id', locale: 'id-ID', name: 'Indonesio', flag: '🇮🇩', piperVoice: 'id_ID-news_tts-medium', voiceStatus: 'configured', audioPath: './audio/id/', curriculum: Object.freeze({ A1: './curriculum-a1.js', A2: './curriculum-a2.js' }), testPhrase: 'terima kasih', available: true })
    });
    const supported = code => typeof code === 'string' && Object.prototype.hasOwnProperty.call(LANGUAGES, code);
    let activeLanguage = 'id';
    let adapter = null;

    function apply(code) {
        activeLanguage = code;
        // The application chrome and explanations remain Spanish. Course renderers
        // should apply LANGUAGES[code].locale to target-language content elements.
        if (adapter && typeof adapter.onChange === 'function') adapter.onChange(code);
        try { if (root.localStorage) root.localStorage.setItem(STORAGE_KEY, code); } catch (_) {}
        return code;
    }

    async function init(options) {
        adapter = options && typeof options === 'object' ? options : null;
        let persisted = null;
        let local = null;
        try { if (adapter && typeof adapter.read === 'function') persisted = await adapter.read(); } catch (_) {}
        try { if (root.localStorage) local = root.localStorage.getItem(STORAGE_KEY); } catch (_) {}
        const available = code => supported(code) && LANGUAGES[code].available;
        const selected = available(persisted) ? persisted : available(local) ? local : 'id';
        apply(selected);
        if (adapter && typeof adapter.write === 'function' && persisted !== selected) {
            try { await adapter.write(selected); } catch (_) {}
        }
        return selected;
    }

    async function setActiveLanguage(code) {
        if (!supported(code)) throw new Error('Código de idioma no soportado.');
        if (!LANGUAGES[code].available) throw new Error('Este curso todavía no está disponible.');
        if (adapter && typeof adapter.write === 'function') await adapter.write(code);
        return apply(code);
    }

    function getActiveLanguage() { return activeLanguage; }
    function getLocale(code) { return supported(code) ? LANGUAGES[code].locale : null; }
    function getLanguage(code) { return supported(code) ? LANGUAGES[code] : null; }
    function isSupported(code) { return supported(code); }
    function isAvailable(code) { return supported(code) && LANGUAGES[code].available; }
    function list() { return Object.values(LANGUAGES); }

    root.LanguageManager = Object.freeze({
        STORAGE_KEY, LANGUAGES, init, setActiveLanguage, getActiveLanguage,
        getLanguage, getLocale, isSupported, isAvailable, list
    });
})(typeof window !== 'undefined' ? window : globalThis);
