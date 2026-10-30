(function () {
    'use strict';

    const DAILY_GOALS = [20, 30, 50, 100];
    const DEFAULT_GOAL = 30;

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

    function createDefault(now) {
        return {
            dailyGoal: DEFAULT_GOAL,
            todayDate: dateKey(now),
            todayXp: 0,
            todayLessons: 0,
            todayReviews: 0,
            lastStudyDate: null,
            currentStreak: 0,
            longestStreak: 0
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
            longestStreak: safeCount(source.longestStreak) ? source.longestStreak : 0
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
        const today = dateKey(now);
        const yesterday = previousDateKey(now);
        if (!['points', 'lesson', 'review'].includes(kind)) throw new Error('Tipo de actividad no válido.');
        if (activity.lastStudyDate !== today) {
            activity.currentStreak = activity.lastStudyDate === yesterday ? activity.currentStreak + 1 : 1;
            activity.lastStudyDate = today;
        }
        if (kind === 'points') {
            const points = Number(amount);
            if (!Number.isFinite(points) || points < 0) throw new Error('Los puntos diarios no son válidos.');
            activity.todayXp += Math.floor(points);
        } else if (kind === 'lesson') {
            activity.todayLessons += 1;
        } else if (kind === 'review') {
            activity.todayReviews += 1;
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

    function validateBackup(value, now) {
        if (value === undefined || value === null) return createDefault(now);
        if (!isObject(value)) throw new Error('Actividad diaria no válida.');
        if (value.dailyGoal !== undefined && !DAILY_GOALS.includes(value.dailyGoal)) throw new Error('Objetivo diario no válido.');
        if (value.todayDate !== undefined && !isDateKey(value.todayDate)) throw new Error('Fecha diaria no válida.');
        if (value.lastStudyDate !== undefined && value.lastStudyDate !== null && !isDateKey(value.lastStudyDate)) {
            throw new Error('Fecha de racha no válida.');
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
        validateBackup: validateBackup,
        currentStreak: function (value, now) { return normalize(value, now).currentStreak; }
    };
})();