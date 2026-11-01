(function () {
    'use strict';

    const DAILY_GOALS = [20, 30, 50, 100];
    const DEFAULT_GOAL = 30;
    const SKILL_KEYS = ['recognition', 'translation', 'listening', 'sentenceBuilding', 'writing', 'conversation'];
    const SCORED_SKILLS = ['recognition', 'translation', 'listening', 'sentenceBuilding', 'writing', 'conversation'];

    function dateKey(value) {
        const date = new Date(value == null ? Date.now() : value);
        if (Number.isNaN(date.getTime())) throw new Error('Fecha de actividad no válida.');
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
    }

    function isDateKey(value) {
        if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
        const parts = value.split('-').map(Number);
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        return dateKey(date) === value;
    }

    function previousDateKey(value) {
        const date = new Date(value == null ? Date.now() : value);
        date.setDate(date.getDate() - 1);
        return dateKey(date);
    }

    function isObject(value) {
        return Boolean(value && typeof value === 'object' && !Array.isArray(value));
    }

    function safeCount(value) {
        return Number.isSafeInteger(value) && value >= 0 && value <= 1000000000;
    }

    function defaultSkillStats() {
        const stats = {};
        SKILL_KEYS.forEach(skill => { stats[skill] = { attempts: 0, correct: 0, incorrect: 0, sessions: 0 }; });
        return stats;
    }

    function normalizeSkillStats(value) {
        const source = isObject(value) ? value : {};
        const result = defaultSkillStats();
        SKILL_KEYS.forEach(skill => {
            const entry = isObject(source[skill]) ? source[skill] : {};
            const correct = safeCount(entry.correct) ? entry.correct : 0;
            const incorrect = safeCount(entry.incorrect) ? entry.incorrect : 0;
            const totalResults = correct + incorrect;
            if (!safeCount(totalResults)) return;
            const attempts = safeCount(entry.attempts) ? Math.max(entry.attempts, totalResults) : totalResults;
            if (!safeCount(attempts)) return;
            result[skill] = { attempts: attempts, correct: correct, incorrect: incorrect, sessions: safeCount(entry.sessions) ? entry.sessions : 0 };
        });
        return result;
    }

    function markStudyDay(activity, now) {
        const today = dateKey(now);
        const yesterday = previousDateKey(now);
        if (activity.lastStudyDate !== today) {
            activity.currentStreak = activity.lastStudyDate === yesterday ? activity.currentStreak + 1 : 1;
            activity.lastStudyDate = today;
        }
        activity.longestStreak = Math.max(activity.longestStreak, activity.currentStreak);
        return activity;
    }

    function createDefault(now) {
        return {
            dailyGoal: DEFAULT_GOAL,
            todayDate: dateKey(now),
            todayXp: 0,
            todayLessons: 0,
            todayReviews: 0,
            lastStudyDate: null,
            currentStreak: 0,
            longestStreak: 0,
            skillStats: defaultSkillStats()
        };
    }

    function normalize(value, now) {
        const source = isObject(value) ? value : {};
        const today = dateKey(now);
        const yesterday = previousDateKey(now);
        const activity = {
            dailyGoal: DAILY_GOALS.includes(source.dailyGoal) ? source.dailyGoal : DEFAULT_GOAL,
            todayDate: isDateKey(source.todayDate) ? source.todayDate : today,
            todayXp: safeCount(source.todayXp) ? source.todayXp : 0,
            todayLessons: safeCount(source.todayLessons) ? source.todayLessons : 0,
            todayReviews: safeCount(source.todayReviews) ? source.todayReviews : 0,
            lastStudyDate: source.lastStudyDate === null || source.lastStudyDate === undefined || isDateKey(source.lastStudyDate)
                ? (source.lastStudyDate || null) : null,
            currentStreak: safeCount(source.currentStreak) ? source.currentStreak : 0,
            longestStreak: safeCount(source.longestStreak) ? source.longestStreak : 0,
            skillStats: normalizeSkillStats(source.skillStats)
        };
        if (activity.todayDate !== today) {
            activity.todayDate = today;
            activity.todayXp = 0;
            activity.todayLessons = 0;
            activity.todayReviews = 0;
        }
        if (activity.lastStudyDate !== today && activity.lastStudyDate !== yesterday) activity.currentStreak = 0;
        activity.longestStreak = Math.max(activity.longestStreak, activity.currentStreak);
        return activity;
    }

    function record(value, kind, amount, now) {
        const activity = normalize(value, now);
        if (!['points', 'lesson', 'review'].includes(kind)) throw new Error('Tipo de actividad no válido.');
        markStudyDay(activity, now);
        if (kind === 'points') {
            const points = Number(amount);
            if (!Number.isFinite(points) || points < 0) throw new Error('Los puntos diarios no son válidos.');
            const nextXp = activity.todayXp + Math.floor(points);
            if (!safeCount(nextXp)) throw new Error('Contador de actividad no válido.');
            activity.todayXp = nextXp;
        } else if (kind === 'lesson') {
            const nextLessons = activity.todayLessons + 1;
            if (!safeCount(nextLessons)) throw new Error('Contador de actividad no válido.');
            activity.todayLessons = nextLessons;
        } else if (kind === 'review') {
            const nextReviews = activity.todayReviews + 1;
            if (!safeCount(nextReviews)) throw new Error('Contador de actividad no válido.');
            activity.todayReviews = nextReviews;
        }
        activity.longestStreak = Math.max(activity.longestStreak, activity.currentStreak);
        return activity;
    }

    function setGoal(value, goal, now) {
        const numericGoal = Number(goal);
        if (!DAILY_GOALS.includes(numericGoal)) throw new Error('Objetivo diario no válido.');
        const activity = normalize(value, now);
        activity.dailyGoal = numericGoal;
        return activity;
    }

    function skillForExercise(type, hasAudio) {
        if (hasAudio) return 'listening';
        const mapping = { mc: 'recognition', match: 'recognition', translate_es_id: 'translation', listen: 'listening', order: 'sentenceBuilding', write: 'writing' };
        return mapping[type] || null;
    }

    function recordSkill(value, skill, isCorrect, now) {
        if (!SCORED_SKILLS.includes(skill)) throw new Error('Habilidad de práctica no válida.');
        if (typeof isCorrect !== 'boolean') throw new Error('Resultado de práctica no válido.');
        const activity = normalize(value, now);
        markStudyDay(activity, now);
        const stats = activity.skillStats[skill];
        if (!safeCount(stats.attempts + 1) || !safeCount((isCorrect ? stats.correct : stats.incorrect) + 1)) {
            throw new Error('Contador de habilidad no válido.');
        }
        stats.attempts += 1;
        if (isCorrect) stats.correct += 1;
        else stats.incorrect += 1;
        return activity;
    }

    function recordSkillSession(value, skill, now) {
        if (!['writing', 'conversation'].includes(skill)) throw new Error('Sesión de práctica no válida.');
        const activity = normalize(value, now);
        markStudyDay(activity, now);
        if (!safeCount(activity.skillStats[skill].sessions + 1)) throw new Error('Contador de habilidad no válido.');
        activity.skillStats[skill].sessions += 1;
        return activity;
    }

    function validateBackup(value, now) {
        if (value === undefined || value === null) return createDefault(now);
        if (!isObject(value)) throw new Error('Actividad diaria no válida.');
        if (value.dailyGoal !== undefined && !DAILY_GOALS.includes(value.dailyGoal)) throw new Error('Objetivo diario no válido.');
        if (value.todayDate !== undefined && !isDateKey(value.todayDate)) throw new Error('Fecha diaria no válida.');
        if (value.lastStudyDate !== undefined && value.lastStudyDate !== null && !isDateKey(value.lastStudyDate)) {
            throw new Error('Fecha de racha no válida.');
        }
        if (value.skillStats !== undefined) {
            if (!isObject(value.skillStats)) throw new Error('Perfil de habilidades no válido.');
            SKILL_KEYS.forEach(skill => {
                const stats = value.skillStats[skill];
                if (stats === undefined) return;
                if (!isObject(stats)) throw new Error('Estadísticas de habilidad no válidas.');
                for (const key of ['attempts', 'correct', 'incorrect', 'sessions']) {
                    if (stats[key] !== undefined && !safeCount(stats[key])) throw new Error('Contador de habilidad no válido.');
                }
                if ((stats.correct || 0) + (stats.incorrect || 0) > (stats.attempts || 0)) {
                    throw new Error('Intentos de habilidad incoherentes.');
                }
            });
        }
        for (const key of ['todayXp', 'todayLessons', 'todayReviews', 'currentStreak', 'longestStreak']) {
            if (value[key] !== undefined && !safeCount(value[key])) throw new Error('Contador de actividad no válido.');
        }
        return normalize(value, now);
    }

    window.StudyActivity = {
        dailyGoals: DAILY_GOALS.slice(),
        dateKey: dateKey,
        createDefault: createDefault,
        normalize: normalize,
        record: record,
        setGoal: setGoal,
        skillKeys: SKILL_KEYS.slice(),
        skillForExercise: skillForExercise,
        recordSkill: recordSkill,
        recordSkillSession: recordSkillSession,
        validateBackup: validateBackup,
        currentStreak: function (value, now) { return normalize(value, now).currentStreak; }
    };
})();