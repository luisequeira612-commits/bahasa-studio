/** @param {Window & typeof globalThis} root */
(function (root) {
    'use strict';

    // index.html loads LanguageManager before this module; keep one source of truth.
    const SUPPORTED = Object.freeze(root.LanguageManager.list().map(({ code }) => code));
    const PROGRESS_SETTINGS = Object.freeze(['userXp', 'completedUnits', 'completedLessons', 'studyActivity', 'customUnits', 'syllabusPos']);

    /** @param {string} language @returns {GuardiLanguageCode} */
    function assertLanguage(language) {
        if (!SUPPORTED.some(code => code === language)) throw new Error('Código de idioma no soportado.');
        return /** @type {GuardiLanguageCode} */ (language);
    }

    /** @param {string} store @param {unknown} key @param {string | undefined} language @returns {string} */
    function storageKey(store, key, language) {
        const code = assertLanguage(language || 'id');
        const value = String(key);
        if ((store === 'srs' || store === 'progress') && code !== 'id') return code + '::' + value;
        if (store === 'settings' && PROGRESS_SETTINGS.includes(value) && code !== 'id') return code + '::' + value;
        return value;
    }

    /** @param {string} store @param {unknown} key @param {string | undefined} language @returns {boolean} */
    function belongsToLanguage(store, key, language) {
        const code = assertLanguage(language || 'id');
        const value = String(key);
        if (store !== 'srs' && store !== 'progress') return true;
        if (code === 'id') return !SUPPORTED.some(other => other !== 'id' && value.startsWith(other + '::'));
        return value.startsWith(code + '::');
    }

    /** @param {string} store @param {unknown} key @param {string | undefined} language @returns {string} */
    function logicalKey(store, key, language) {
        const code = assertLanguage(language || 'id');
        const value = String(key);
        if ((store === 'srs' || store === 'progress') && code !== 'id' && value.startsWith(code + '::')) {
            return value.slice(code.length + 2);
        }
        return value;
    }

    /** @param {string} store @param {unknown} records @param {string | undefined} language @returns {unknown[]} */
    function filterRecords(store, records, language) {
        const code = assertLanguage(language || 'id');
        if (store !== 'srs' && store !== 'progress') return Array.isArray(records) ? records.slice() : [];
        return (Array.isArray(records) ? records : [])
            .filter(record => record && belongsToLanguage(store, record.key, code))
            .map(record => {
                const source = /** @type {Record<string, unknown>} */ (record);
                const key = logicalKey(store, source.key, code);
                return Object.assign({}, source, { id: key, wordId: key, key });
            });
    }

    root.ProgressNamespace = Object.freeze({
        supportedLanguages: SUPPORTED,
        progressSettings: PROGRESS_SETTINGS,
        storageKey,
        belongsToLanguage,
        logicalKey,
        filterRecords
    });
})(typeof window !== 'undefined' ? window : globalThis);
