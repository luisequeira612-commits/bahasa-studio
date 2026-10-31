(function (root) {
    'use strict';

    function count(value) {
        return Number.isSafeInteger(value) && value > 0 ? value : 0;
    }

    function recommend(input) {
        const data = input && typeof input === 'object' ? input : {};
        const dueCount = count(data.dueCount);
        const weakWords = Array.isArray(data.weakWords)
            ? data.weakWords.filter(word => word && typeof word.id === 'string' && word.id &&
                typeof word.term === 'string' && word.term).slice(0, 5)
            : [];

        if (dueCount > 0) {
            return {
                type: 'review-due',
                title: 'Empieza por el repaso pendiente',
                description: dueCount + (dueCount === 1
                    ? ' palabra ya está lista para repasar.'
                    : ' palabras están listas para repasar.'),
                action: 'review',
                label: 'Repasar ahora'
            };
        }

        if (weakWords.length) {
            return {
                type: 'reinforce-weak',
                title: 'Refuerza las palabras que más cuestan',
                description: 'Has tenido errores recientes con: ' +
                    weakWords.map(word => word.term).join(', ') + '. Puedes repasarlas ahora.',
                action: 'reinforce',
                label: 'Practicar estas palabras',
                wordIds: weakWords.map(word => word.id)
            };
        }

        const lesson = data.nextLesson;
        if (lesson && typeof lesson.unitId === 'string' && lesson.unitId &&
            Number.isInteger(lesson.lessonIndex) && lesson.lessonIndex >= 0) {
            return {
                type: 'continue-lesson',
                title: 'Continúa con la siguiente lección',
                description: [lesson.unitTitle, lesson.title].filter(Boolean).join(' · '),
                action: 'lesson',
                label: 'Continuar aprendiendo',
                unitId: lesson.unitId,
                lessonIndex: lesson.lessonIndex
            };
        }

        const dailyGoal = count(data.dailyGoal);
        const todayXp = count(data.todayXp);
        if (dailyGoal > todayXp) {
            return {
                type: 'conversation-practice',
                title: 'Practica lo aprendido en contexto',
                description: 'Una conversación breve puede ayudarte a usar el vocabulario fuera de los ejercicios.',
                action: 'conversation',
                label: 'Practicar conversación'
            };
        }

        return {
            type: 'maintenance',
            title: 'Buen trabajo: no hay una tarea urgente',
            description: 'Puedes volver más tarde para una nueva lección o un repaso programado.',
            action: 'none',
            label: 'Sin tarea pendiente'
        };
    }

    root.AdaptiveLearning = Object.freeze({ recommend });
})(typeof window !== 'undefined' ? window : globalThis);
