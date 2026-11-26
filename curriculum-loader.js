// @ts-check
(function (root) {
    'use strict';

    /** @type {readonly GuardiCefrLevel[]} */
    const LEVELS = Object.freeze(['A1', 'A2', 'B1', 'B2']);
    /** @type {Readonly<Record<string, Partial<Record<GuardiCefrLevel, string>>>>} */
    const LEGACY_EXPORTS = Object.freeze({
        id: Object.freeze({ A1: 'BAHASA_CURRICULUM_A1', A2: 'BAHASA_CURRICULUM_A2' })
    });
    const loaded = new Map();

    /** @param {string} language @param {string} level @returns {GuardiCurriculumDescriptor | null} */
    function resolve(language, level) {
        const manager = root.LanguageManager;
        const config = manager && manager.getLanguage(language);
        const normalizedLevel = typeof level === 'string' ? level.toUpperCase() : '';
        if (!config || !manager.isAvailable(language) || !LEVELS.includes(normalizedLevel)) return null;
        const path = config.curriculum && config.curriculum[normalizedLevel];
        if (!path) return null;
        return Object.freeze({ language, level: normalizedLevel, path, exportName: LEGACY_EXPORTS[language] && LEGACY_EXPORTS[language][normalizedLevel] || null });
    }

    /** @param {string} language @param {string} level @returns {GuardiContentDescriptor | null} */
    function resolveContent(language, level) {
        const manager = root.LanguageManager;
        const config = manager && manager.getLanguage(language);
        const normalizedLevel = typeof level === 'string' ? level.toUpperCase() : '';
        if (!config || (typeof manager.isSupported === 'function' && !manager.isSupported(language)) || !LEVELS.includes(normalizedLevel)) return null;
        const path = config.curriculum && config.curriculum[normalizedLevel];
        if (typeof path !== 'string' || !path.startsWith('./languages/')) return null;
        return Object.freeze({ language, level: normalizedLevel, path });
    }

    /** @param {GuardiCurriculumDescriptor | null} descriptor @returns {GuardiCurriculum | null} */
    function readExisting(descriptor) {
        if (!descriptor) return null;
        if (descriptor.exportName) {
            const legacy = /** @type {Record<string, unknown>} */ (root)[descriptor.exportName];
            if (legacy && typeof legacy === 'object') return legacy;
        }
        const registry = root.GUARDI_CURRICULA;
        const value = registry && registry[descriptor.language] && registry[descriptor.language][descriptor.level];
        return value && typeof value === 'object' ? value : null;
    }

    /** @param {string} path @returns {Promise<void>} */
    function loadScript(path) {
        if (loaded.has(path)) return loaded.get(path);
        if (!root.document || typeof root.document.createElement !== 'function') {
            return Promise.reject(new Error('No se puede cargar el currículo en este entorno.'));
        }
        const pending = new Promise((resolveLoad, rejectLoad) => {
            const script = root.document.createElement('script');
            script.src = path;
            script.onload = () => resolveLoad();
            script.onerror = () => rejectLoad(new Error('No se pudo cargar el currículo, incluso sin conexión.'));
            (root.document.head || root.document.body).appendChild(script);
        });
        loaded.set(path, pending);
        return pending.catch(error => {
            if (loaded.get(path) === pending) loaded.delete(path);
            throw error;
        });
    }

    /** @param {string} language @param {GuardiCefrLevel} level @returns {GuardiCurriculumManifest | null} */
    function readManifest(language, level) {
        const registry = root.GUARDI_CURRICULUM_MANIFESTS;
        return registry && registry[language] && registry[language][level] || null;
    }

    /** @param {GuardiContentDescriptor} descriptor @returns {Promise<GuardiCurriculumManifest>} */
    async function loadManifest(descriptor) {
        let manifest = readManifest(descriptor.language, descriptor.level);
        if (manifest) return manifest;
        await loadScript(descriptor.path);
        manifest = readManifest(descriptor.language, descriptor.level);
        if (!manifest || !Array.isArray(manifest.publishedUnits) || !Array.isArray(manifest.blocks)) {
            loaded.delete(descriptor.path);
            throw new Error('El archivo no publicó el currículo esperado: manifiesto no válido.');
        }
        return manifest;
    }

    /** @param {string} language @param {string} level @param {number[]} unitNumbers @returns {Promise<GuardiCurriculum>} */
    async function loadUnits(language, level, unitNumbers) {
        const descriptor = resolveContent(language, level);
        if (!descriptor) throw new Error('El contenido curricular solicitado no está registrado.');
        if (!Array.isArray(unitNumbers) || !unitNumbers.length ||
            unitNumbers.some(number => !Number.isInteger(number) || number < 1 || number > 40) ||
            new Set(unitNumbers).size !== unitNumbers.length) {
            throw new Error('La selección de unidades no es válida.');
        }
        const manifest = await loadManifest(descriptor);
        const published = new Set(manifest.publishedUnits);
        if (unitNumbers.some(number => !published.has(number))) {
            throw new Error('Una o más unidades todavía no están publicadas.');
        }
        const blocks = manifest.blocks.filter(block =>
            Array.isArray(block.units) && unitNumbers.some(number => block.units.includes(number))
        );
        const covered = new Set(blocks.flatMap(block => block.units));
        if (unitNumbers.some(number => !covered.has(number)) || blocks.some(block => typeof block.path !== 'string' || !block.path.startsWith('./languages/'))) {
            throw new Error('El manifiesto no cubre las unidades solicitadas.');
        }
        await Promise.all(blocks.map(block => loadScript(block.path)));
        const registry = root.GUARDI_CURRICULUM_BLOCKS;
        const levelBlocks = registry && registry[language] && registry[language][descriptor.level];
        if (!levelBlocks) throw new Error('Los bloques curriculares no se registraron correctamente.');
        const unitsByNumber = new Map();
        for (const block of blocks) {
            const entry = levelBlocks[block.id];
            if (!entry || !Array.isArray(entry.units)) {
                const missingBlock = blocks.find(candidate => candidate.id === block.id);
                if (missingBlock) loaded.delete(missingBlock.path);
                throw new Error('Falta un bloque curricular publicado.');
            }
            for (const unit of entry.units) {
                if (Number.isInteger(unit.unitNumber)) unitsByNumber.set(unit.unitNumber, unit);
            }
        }
        const units = unitNumbers.map(number => unitsByNumber.get(number));
        if (units.some(unit => !unit)) throw new Error('El bloque no contiene todas las unidades declaradas.');
        return Object.freeze({
            id: descriptor.level,
            title: manifest.title,
            language,
            totalUnits: manifest.totalUnits,
            units
        });
    }

    /** @param {string} language @param {string} level @returns {Promise<GuardiCurriculum>} */
    async function load(language, level) {
        const descriptor = resolve(language, level);
        if (!descriptor) throw new Error('El currículo solicitado no está disponible.');
        const existing = readExisting(descriptor);
        if (existing) return existing;
        if (descriptor.exportName) {
            await loadScript(descriptor.path);
            const legacy = readExisting(descriptor);
            if (!legacy) {
                loaded.delete(descriptor.path);
                throw new Error('El archivo no publicó el currículo esperado.');
            }
            return legacy;
        }
        let manifest;
        try {
            manifest = await loadManifest(resolveContent(language, level));
        } catch (error) {
            const published = readExisting(descriptor);
            if (published) return published;
            throw error;
        }
        if (!Number.isInteger(manifest.totalUnits) || manifest.publishedUnits.length !== manifest.totalUnits) {
            throw new Error('El nivel todavía no tiene todas sus unidades publicadas.');
        }
        const curriculum = await loadUnits(language, level, manifest.publishedUnits);
        const registry = root.GUARDI_CURRICULA || (root.GUARDI_CURRICULA = {});
        registry[language] = registry[language] || {};
        registry[language][descriptor.level] = curriculum;
        return curriculum;
    }


    // Read-only common view for legacy and language-neutral vocabulary records.
    // Indonesian's historical "idn" field is isolated here; new courses use "target".
    /** @param {Record<string, unknown> | null} word @param {string} language @returns {GuardiAdaptedVocabulary | null} */
    function adaptVocabulary(word, language) {
        const manager = root.LanguageManager;
        if (!manager || typeof manager.isSupported !== 'function' || !manager.isSupported(language)) return null;
        if (!word || typeof word !== 'object' || Array.isArray(word)) return null;

        const text = typeof word.target === 'string'
            ? word.target
            : language === 'id' && typeof word.idn === 'string'
                ? word.idn
                : null;
        const adapted = {
            id: typeof word.id === 'string' ? word.id : null,
            text,
            translation: typeof word.translation === 'string' ? word.translation : (typeof word.esp === 'string' ? word.esp : null),
            example: typeof word.example === 'string' ? word.example : (typeof word.ex === 'string' ? word.ex : null),
            exampleTranslation: typeof word.exampleTranslation === 'string' ? word.exampleTranslation : (typeof word.exEsp === 'string' ? word.exEsp : null)
        };
        for (const field of [
            'reading', 'transliteration', 'pronunciation', 'tokens',
            'grammaticalFunctions', 'forms', 'annotations', 'verification'
        ]) {
            if (Object.prototype.hasOwnProperty.call(word, field)) adapted[field] = word[field];
        }
        return Object.freeze(adapted);
    }

    // Build immutable, language-neutral matching pairs from either legacy or new vocabulary fields.
    /** @param {unknown} words @param {string} language @returns {readonly GuardiMatchingPair[]} */
    function adaptMatchingPairs(words, language) {
        if (!Array.isArray(words)) return Object.freeze([]);
        const pairs = [];
        const seenTargets = new Set();
        const seenTranslations = new Set();
        for (const word of words) {
            const adapted = adaptVocabulary(word, language);
            if (!adapted || typeof adapted.text !== 'string' || !adapted.text.trim() ||
                typeof adapted.translation !== 'string' || !adapted.translation.trim()) continue;
            const target = adapted.text.trim();
            const translation = adapted.translation.trim();
            const targetKey = target.toLocaleLowerCase();
            const translationKey = translation.toLocaleLowerCase();
            if (seenTargets.has(targetKey) || seenTranslations.has(translationKey)) continue;
            seenTargets.add(targetKey);
            seenTranslations.add(translationKey);
            pairs.push(Object.freeze({ target, translation }));
        }
        return Object.freeze(pairs);
    }

    // Read-only-shape adapter for exercise language metadata. It preserves authored
    // exercise fields and never changes answer indexes or acceptance rules.
    /** @param {Record<string, unknown> | null} exercise @param {string} language @returns {Readonly<Record<string, unknown>> | null} */
    function adaptExercise(exercise, language) {
        const manager = root.LanguageManager;
        if (!manager || typeof manager.isSupported !== 'function' || !manager.isSupported(language)) return null;
        if (!exercise || typeof exercise !== 'object' || Array.isArray(exercise)) return null;

        const adapted = { ...exercise };
        adapted.targetLocale = manager.getLocale(language) || 'und';
        const answerLanguage = typeof exercise.answerLanguage === 'string' && exercise.answerLanguage
            ? exercise.answerLanguage
            : exercise.type === 'translate_id_es'
                ? 'es'
                : typeof exercise.type === 'string' && ['fill', 'translate_es_id', 'translate_es_target', 'listen', 'write', 'order'].includes(exercise.type)
                    ? language
                    : null;
        if (answerLanguage) {
            adapted.answerLanguage = answerLanguage;
            adapted.answerLocale = answerLanguage === 'es'
                ? 'es'
                : manager.getLocale(answerLanguage) || adapted.targetLocale;
        }
        return Object.freeze(adapted);
    }

    root.CurriculumLoader = Object.freeze({ levels: LEVELS, resolve, load, loadUnits, adaptVocabulary, adaptExercise, adaptMatchingPairs });
})(typeof window !== 'undefined' ? window : globalThis);
