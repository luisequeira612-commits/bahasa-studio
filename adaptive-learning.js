(function (root) {
    'use strict';

    function count(value) {
        return Number.isSafeInteger(value) && value > 0 ? value : 0;
    }

    const SKILL_LABELS = {
        recognition: 'reconocimiento',
        translation: 'traducción',
        listening: 'escucha',
        sentenceBuilding: 'construcción de frases',
        writing: 'escritura'
    };

    function weakestSkill(value) {
        const stats = value && typeof value === 'object' ? value : {};
        const candidates = Object.keys(SKILL_LABELS).map((key, index) => {
            const entry = stats[key] && typeof stats[key] === 'object' ? stats[key] : {};
            const attempts = count(entry.attempts);
            const correct = entry.correct;
            if (attempts < 5 || !Number.isSafeInteger(correct) || correct < 0 || correct > attempts) return null;
            return { key, label: SKILL_LABELS[key], attempts, precision: correct / attempts, accuracy: Math.round(correct / attempts * 100), order: index };
        }).filter(Boolean);
        candidates.sort((a, b) => a.precision - b.precision || b.attempts - a.attempts || a.order - b.order);
        return candidates[0] || null;
    }

    function selectSkillLesson(skill, lessons) {
        if (!Object.prototype.hasOwnProperty.call(SKILL_LABELS, skill) || !Array.isArray(lessons)) return null;
        const typeSkills = {
            mc: 'recognition',
            match: 'recognition',
            translate_es_id: 'translation',
            listen: 'listening',
            order: 'sentenceBuilding',
            write: 'writing'
        };
        let best = null;
        let bestMatches = 0;
        lessons.forEach((lesson, index) => {
            if (!lesson || typeof lesson.unitId !== 'string' || !lesson.unitId ||
                !Number.isInteger(lesson.lessonIndex) || lesson.lessonIndex < 0 ||
                !Array.isArray(lesson.exercises)) return;
            const matches = lesson.exercises.filter(exercise => exercise &&
                (exercise.audioText ? 'listening' : typeSkills[exercise.type]) === skill).length;
            if (matches > bestMatches) {
                bestMatches = matches;
                best = {
                    unitId: lesson.unitId,
                    lessonIndex: lesson.lessonIndex,
                    unitTitle: lesson.unitTitle,
                    title: lesson.title
                };
            }
        });
        return best;
    }

    function contextualize(recommendation, focus) {
        if (!focus) return recommendation;
        return Object.assign({}, recommendation, {
            description: recommendation.description + ' Tu menor precisión registrada está en ' +
                focus.label + ': ' + focus.accuracy + '% (' + focus.attempts + ' intentos).'
        });
    }

    function recommend(input) {
        const data = input && typeof input === 'object' ? input : {};
        const focus = weakestSkill(data.skillStats);
        const dueCount = count(data.dueCount);
        const weakWords = Array.isArray(data.weakWords)
            ? data.weakWords.filter(word => word && typeof word.id === 'string' && word.id &&
                typeof word.term === 'string' && word.term &&
                (word.savedForReview === true || !Object.prototype.hasOwnProperty.call(word, 'incorrect') ||
                    (Number.isSafeInteger(word.incorrect) && word.incorrect >= 2))).slice(0, 5)
            : [];
        const isolatedWords = Array.isArray(data.isolatedWords)
            ? data.isolatedWords.filter(word => word && typeof word.id === 'string' && word.id &&
                typeof word.term === 'string' && word.term).slice(0, 5)
            : [];

        if (dueCount > 0) {
            return contextualize({
                type: 'review-due',
                title: 'Empieza por el repaso pendiente',
                description: dueCount + (dueCount === 1
                    ? ' palabra ya está lista para repasar.'
                    : ' palabras están listas para repasar.'),
                action: 'review',
                label: 'Repasar ahora'
            }, focus);
        }

        if (weakWords.length) {
            return contextualize({
                type: 'reinforce-weak',
                title: 'Refuerza palabras con errores registrados',
                description: 'El historial de práctica registra errores con: ' +
                    weakWords.map(word => word.term).join(', ') + '. Puedes repasarlas ahora.',
                action: 'reinforce',
                label: 'Practicar estas palabras',
                wordIds: weakWords.map(word => word.id)
            }, focus);
        }

        if (isolatedWords.length) {
            return contextualize({
                type: 'review-isolated',
                title: 'Repasa un error puntual',
                description: 'Has fallado estas palabras una vez. Un repaso breve puede ayudarte a comprobar si ya las recuerdas: ' +
                    isolatedWords.map(word => word.term).join(', ') + '.',
                action: 'reinforce',
                label: 'Repasar estas palabras',
                wordIds: isolatedWords.map(word => word.id)
            }, focus);
        }

        const skillLesson = data.skillLesson;
        if (focus && focus.key !== 'writing' && skillLesson &&
            typeof skillLesson.unitId === 'string' && skillLesson.unitId &&
            Number.isInteger(skillLesson.lessonIndex) && skillLesson.lessonIndex >= 0) {
            return contextualize({
                type: 'reinforce-skill',
                title: 'Practica ' + focus.label,
                description: 'Encontramos una lección pendiente que incluye ejercicios de ' + focus.label + '. Practica esa habilidad dentro de una lección existente.',
                action: 'lesson',
                label: 'Practicar ' + focus.label,
                unitId: skillLesson.unitId,
                lessonIndex: skillLesson.lessonIndex
            }, focus);
        }

        if (focus && focus.key === 'writing') {
            return contextualize({
                type: 'reinforce-writing',
                title: 'Refuerza tu escritura',
                description: 'Tu práctica registrada indica que la escritura necesita atención. Completa una situación breve en el cuaderno y compara tu borrador con el ejemplo orientativo.',
                action: 'writing',
                label: 'Practicar escritura'
            }, focus);
        }

        const lesson = data.nextLesson;
        if (lesson && typeof lesson.unitId === 'string' && lesson.unitId &&
            Number.isInteger(lesson.lessonIndex) && lesson.lessonIndex >= 0) {
            return contextualize({
                type: 'continue-lesson',
                title: 'Continúa con la siguiente lección',
                description: [lesson.unitTitle, lesson.title].filter(Boolean).join(' · '),
                action: 'lesson',
                label: 'Continuar aprendiendo',
                unitId: lesson.unitId,
                lessonIndex: lesson.lessonIndex
            }, focus);
        }

        const dailyGoal = count(data.dailyGoal);
        const todayXp = count(data.todayXp);
        if (dailyGoal > todayXp) {
            return contextualize({
                type: 'conversation-practice',
                title: 'Practica lo aprendido en contexto',
                description: 'Una conversación breve puede ayudarte a usar el vocabulario fuera de los ejercicios.',
                action: 'conversation',
                label: 'Practicar conversación'
            }, focus);
        }

        return contextualize({
            type: 'maintenance',
            title: 'Buen trabajo: no hay una tarea urgente',
            description: 'Puedes volver más tarde para una nueva lección o un repaso programado.',
            action: 'none',
            label: 'Sin tarea pendiente'
        }, focus);
    }

    root.AdaptiveLearning = Object.freeze({ recommend, weakestSkill, selectSkillLesson });
})(typeof window !== 'undefined' ? window : globalThis);
