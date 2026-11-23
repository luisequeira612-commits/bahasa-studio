(function (root) {
    'use strict';

    const SUPPORTED = Object.freeze(['pt-BR', 'en', 'it', 'fr', 'de', 'nl', 'ru', 'ja', 'ko', 'id']);
    const PROGRESS_SETTINGS = Object.freeze(['userXp', 'completedUnits', 'completedLessons', 'studyActivity', 'customUnits', 'syllabusPos']);

    function assertLanguage(language) {
        if (!SUPPORTED.includes(language)) throw new Error('Código de idioma no soportado.');
        return language;
    }

    function storageKey(store, key, language) {
        const code = assertLanguage(language || 'id');
        const value = String(key);
        if ((store === 'srs' || store === 'progress') && code !== 'id') return code + '::' + value;
        if (store === 'settings' && PROGRESS_SETTINGS.includes(value) && code !== 'id') return code + '::' + value;
        return value;
    }

    function belongsToLanguage(store, key, language) {
        const code = assertLanguage(language || 'id');
        const value = String(key);
        if (store !== 'srs' && store !== 'progress') return true;
        if (code === 'id') return !SUPPORTED.some(other => other !== 'id' && value.startsWith(other + '::'));
        return value.startsWith(code + '::');
    }

    function logicalKey(store, key, language) {
        const code = assertLanguage(language || 'id');
        const value = String(key);
        if ((store === 'srs' || store === 'progress') && code !== 'id' && value.startsWith(code + '::')) {
            return value.slice(code.length + 2);
        }
        return value;
    }

    function filterRecords(store, records, language) {
        const code = assertLanguage(language || 'id');
        if (store !== 'srs' && store !== 'progress') return Array.isArray(records) ? records.slice() : [];
        return (Array.isArray(records) ? records : [])
            .filter(record => record && belongsToLanguage(store, record.key, code))
            .map(record => {
                const key = logicalKey(store, record.key, code);
                return Object.assign({}, record, { id: key, wordId: key, key });
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
