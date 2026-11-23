(function (root) {
    'use strict';

    const LEVELS = Object.freeze(['A1', 'A2', 'B1', 'B2']);
    const LEGACY_EXPORTS = Object.freeze({
        id: Object.freeze({
            A1: 'BAHASA_CURRICULUM_A1',
            A2: 'BAHASA_CURRICULUM_A2'
        })
    });
    const loaded = new Map();

    function resolve(language, level) {
        const manager = root.LanguageManager;
        const config = manager && manager.getLanguage(language);
        const normalizedLevel = typeof level === 'string' ? level.toUpperCase() : '';
        if (!config || !manager.isAvailable(language) || !LEVELS.includes(normalizedLevel)) return null;
        const path = config.curriculum && config.curriculum[normalizedLevel];
        if (!path) return null;
        return Object.freeze({ language, level: normalizedLevel, path, exportName: LEGACY_EXPORTS[language] && LEGACY_EXPORTS[language][normalizedLevel] || null });
    }

    function readExisting(descriptor) {
        if (!descriptor) return null;
        if (descriptor.exportName) {
            const legacy = root[descriptor.exportName];
            if (legacy && typeof legacy === 'object') return legacy;
        }
        const registry = root.GUARDI_CURRICULA;
        const value = registry && registry[descriptor.language] && registry[descriptor.language][descriptor.level];
        return value && typeof value === 'object' ? value : null;
    }

    function load(language, level) {
        const descriptor = resolve(language, level);
        if (!descriptor) return Promise.reject(new Error('El currículo solicitado no está disponible.'));
        const existing = readExisting(descriptor);
        if (existing) return Promise.resolve(existing);
        if (loaded.has(descriptor.path)) return loaded.get(descriptor.path);
        if (!root.document || typeof root.document.createElement !== 'function') {
            return Promise.reject(new Error('No se puede cargar el currículo en este entorno.'));
        }
        const pending = new Promise((resolveLoad, rejectLoad) => {
            const script = root.document.createElement('script');
            script.src = descriptor.path;
            script.onload = () => {
                const curriculum = readExisting(descriptor);
                if (curriculum) resolveLoad(curriculum);
                else rejectLoad(new Error('El archivo no publicó el currículo esperado en GUARDI_CURRICULA.'));
            };
            script.onerror = () => {
                loaded.delete(descriptor.path);
                rejectLoad(new Error('No se pudo cargar el currículo, incluso sin conexión.'));
            };
            (root.document.head || root.document.body).appendChild(script);
        });
        loaded.set(descriptor.path, pending);
        // A failed or malformed offline load must not poison this path forever.
        return pending.catch(error => {
            if (loaded.get(descriptor.path) === pending) loaded.delete(descriptor.path);
            throw error;
        });
    }

    root.CurriculumLoader = Object.freeze({ levels: LEVELS, resolve, load });
})(typeof window !== 'undefined' ? window : globalThis);
