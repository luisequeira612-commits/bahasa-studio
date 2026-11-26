// @ts-check
(function (root) {
    'use strict';

    const STORAGE_KEY = 'guardi_active_language';
    /** @type {Readonly<Record<GuardiLanguageCode, GuardiLanguageConfig>>} */
    const LANGUAGES = Object.freeze({
        'pt-BR': Object.freeze({ code: 'pt-BR', locale: 'pt-BR', name: 'Portugués', flag: '🇧🇷', piperVoice: 'pt_BR-faber-medium', voiceStatus: 'candidate', audioPath: './audio/pt-BR/', curriculum: Object.freeze({ A1: './languages/pt-BR/curriculum/a1/index.js', A2: './languages/pt-BR/curriculum/a2/index.js', B1: './languages/pt-BR/curriculum/b1/index.js' }), available: false }),
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
    /**
     * Validate one language registry entry without requiring every CEFR level to exist.
     * Partial catalog entries are intentional while a course is still being prepared.
     * @param {unknown} value
     * @returns {GuardiValidationResult}
     */
    function validateLanguageConfig(value) {
        const errors = [];
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            return Object.freeze({ valid: false, errors: Object.freeze(['config_not_object']) });
        }
        const config = /** @type {Record<string, unknown>} */ (value);
        const requiredStrings = ['code', 'locale', 'name', 'flag', 'piperVoice', 'audioPath'];
        for (const field of requiredStrings) {
            if (typeof config[field] !== 'string' || !config[field].trim()) errors.push(field + '_required');
        }
        if (typeof config.code === 'string' && !/^[a-z]{2,3}(?:-[A-Z]{2})?$/.test(config.code)) errors.push('code_invalid');
        if (!['configured', 'candidate', 'unverified'].includes(String(config.voiceStatus))) errors.push('voiceStatus_invalid');
        if (typeof config.available !== 'boolean') errors.push('available_required');
        if (typeof config.audioPath === 'string' && !config.audioPath.startsWith('./audio/')) errors.push('audioPath_invalid');
        if (!config.curriculum || typeof config.curriculum !== 'object' || Array.isArray(config.curriculum)) {
            errors.push('curriculum_required');
        } else {
            const curriculum = /** @type {Record<string, unknown>} */ (config.curriculum);
            for (const [level, path] of Object.entries(curriculum)) {
                if (!['A1', 'A2', 'B1', 'B2'].includes(level)) errors.push('curriculum_level_invalid:' + level);
                if (typeof path !== 'string' || !path.startsWith('./') || path.includes('..')) errors.push('curriculum_path_invalid:' + level);
            }
            if (config.available === true && Object.keys(curriculum).length === 0) errors.push('available_without_curriculum');
        }
        if (config.testPhrase !== undefined && (typeof config.testPhrase !== 'string' || !config.testPhrase.trim())) {
            errors.push('testPhrase_invalid');
        }
        return Object.freeze({ valid: errors.length === 0, errors: Object.freeze(errors) });
    }

    /**
     * Validate catalog uniqueness and each entry's current structural contract.
     * @param {unknown} entries
     * @returns {GuardiValidationResult}
     */
    function validateLanguageCatalog(entries) {
        if (!Array.isArray(entries)) return Object.freeze({ valid: false, errors: Object.freeze(['catalog_not_array']) });
        const errors = [];
        const seen = new Set();
        for (const entry of entries) {
            const result = validateLanguageConfig(entry);
            errors.push(...result.errors);
            if (entry && typeof entry === 'object' && typeof entry.code === 'string') {
                if (seen.has(entry.code)) errors.push('code_duplicate:' + entry.code);
                seen.add(entry.code);
            }
        }
        if (entries.length === 0) errors.push('catalog_empty');
        return Object.freeze({ valid: errors.length === 0, errors: Object.freeze(errors) });
    }

    /** @param {unknown} code @returns {code is GuardiLanguageCode} */
    const supported = code => typeof code === 'string' && Object.prototype.hasOwnProperty.call(LANGUAGES, code);
    /** @type {GuardiLanguageCode} */
    let activeLanguage = 'id';
    /** @type {GuardiLanguageManagerOptions | null} */
    let adapter = null;

    /** @param {GuardiLanguageCode} code @returns {GuardiLanguageCode} */
    function apply(code) {
        activeLanguage = code;
        // The application chrome and explanations remain Spanish. Course renderers
        // should apply LANGUAGES[code].locale to target-language content elements.
        if (adapter && typeof adapter.onChange === 'function') adapter.onChange(code);
        try { if (root.localStorage) root.localStorage.setItem(STORAGE_KEY, code); } catch (_) {}
        return code;
    }

    /** @param {GuardiLanguageManagerOptions | null | undefined} options @returns {Promise<GuardiLanguageCode>} */
    async function init(options) {
        adapter = options && typeof options === 'object' ? options : null;
        let persisted = null;
        let local = null;
        try { if (adapter && typeof adapter.read === 'function') persisted = await adapter.read(); } catch (_) {}
        try { if (root.localStorage) local = root.localStorage.getItem(STORAGE_KEY); } catch (_) {}
        /** @param {unknown} code @returns {code is GuardiLanguageCode} */
        const available = code => supported(code) && LANGUAGES[code].available;
        const selected = available(persisted) ? persisted : available(local) ? local : 'id';
        apply(selected);
        if (adapter && typeof adapter.write === 'function' && persisted !== selected) {
            try { await adapter.write(selected); } catch (_) {}
        }
        return selected;
    }

    /** @param {string} code @param {{ persist?: boolean }} [options] @returns {Promise<GuardiLanguageCode>} */
    async function setActiveLanguage(code, { persist = true } = {}) {
        if (!supported(code)) throw new Error('Código de idioma no soportado.');
        if (!LANGUAGES[code].available) throw new Error('Este curso todavía no está disponible.');
        if (persist && adapter && typeof adapter.write === 'function') await adapter.write(code);
        return apply(code);
    }

    /** @returns {GuardiLanguageCode} */
    function getActiveLanguage() { return activeLanguage; }
    /** @param {string} code @returns {string | null} */
    function getLocale(code) { return supported(code) ? LANGUAGES[code].locale : null; }
    /** @param {string} code @returns {GuardiLanguageConfig | null} */
    function getLanguage(code) { return supported(code) ? LANGUAGES[code] : null; }
    /** @param {string} code @returns {boolean} */
    function isSupported(code) { return supported(code); }
    /** @param {string} code @returns {boolean} */
    function isAvailable(code) { return supported(code) && LANGUAGES[code].available; }
    /** @returns {readonly GuardiLanguageConfig[]} */
    function list() { return Object.values(LANGUAGES); }

    root.LanguageManager = Object.freeze({
        STORAGE_KEY, LANGUAGES, init, setActiveLanguage, getActiveLanguage,
        getLanguage, getLocale, isSupported, isAvailable, list,
        validateLanguageConfig, validateLanguageCatalog
    });
})(typeof window !== 'undefined' ? window : globalThis);
