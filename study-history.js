(function (root) {
    'use strict';

    const STORAGE_KEY = 'bahasaStudioStudyHistoryV1';
    const STORAGE_PREFIX = 'guardi_study_history_';
    const MAX_DAYS = 30;
    const SKILLS = ['recognition', 'translation', 'listening', 'sentenceBuilding', 'writing', 'conversation'];

    function activeLanguage(language) {
        const code = language || (root.LanguageManager && root.LanguageManager.getActiveLanguage()) || 'id';
        if (root.LanguageManager && root.LanguageManager.isSupported(code)) return code;
        return 'id';
    }

    function storageKey(language) {
        const code = activeLanguage(language);
        // Keep the original unprefixed Indonesian key so existing history is not lost.
        return code === 'id' ? STORAGE_KEY : STORAGE_PREFIX + code;
    }

    function dateKey(value) {
        const date = new Date(value == null ? Date.now() : value);
        if (Number.isNaN(date.getTime())) throw new Error('Fecha de actividad no válida.');
        return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +
            String(date.getDate()).padStart(2, '0');
    }

    function validDateKey(value) {
        if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
        const parts = value.split('-').map(Number);
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date.getFullYear() === parts[0] && date.getMonth() === parts[1] - 1 && date.getDate() === parts[2];
    }

    function safeCount(value) {
        return Number.isSafeInteger(value) && value >= 0 && value <= 1000000000;
    }

    function emptyDay(date) {
        return { date, xp: 0, lessons: 0, reviews: 0, attempts: 0, correct: 0, sessions: 0 };
    }

    function normalizeDay(value) {
        if (!value || typeof value !== 'object' || !validDateKey(value.date)) return null;
        const day = emptyDay(value.date);
        ['xp', 'lessons', 'reviews', 'attempts', 'correct', 'sessions'].forEach(key => {
            day[key] = safeCount(value[key]) ? value[key] : 0;
        });
        if (day.correct > day.attempts) day.correct = day.attempts;
        return day;
    }

    function read(language) {
        try {
            const key = storageKey(language);
            const raw = root.localStorage && root.localStorage.getItem(key);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.days)) return [];
            const byDate = new Map();
            parsed.days.map(normalizeDay).filter(Boolean).forEach(day => byDate.set(day.date, day));
            return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date)).slice(-MAX_DAYS);
        } catch (_) {
            return [];
        }
    }

    function write(days, language) {
        try {
            if (!root.localStorage) return false;
            root.localStorage.setItem(storageKey(language), JSON.stringify({ version: 1, days: days.slice(-MAX_DAYS) }));
            return true;
        } catch (_) {
            return false;
        }
    }

    function update(now, updater, language) {
        const date = dateKey(now);
        const days = read(language);
        let day = days.find(entry => entry.date === date);
        if (!day) {
            day = emptyDay(date);
            days.push(day);
        }
        updater(day);
        const retained = days.sort((a, b) => a.date.localeCompare(b.date)).slice(-MAX_DAYS);
        return write(retained, language);
    }

    function increment(day, key, amount) {
        const value = Number(amount);
        if (!Number.isFinite(value) || value < 0 || !safeCount(day[key] + Math.floor(value))) return;
        day[key] += Math.floor(value);
    }

    function record(kind, amount, now, language) {
        if (!['points', 'lesson', 'review'].includes(kind)) return false;
        if (kind === 'points' && (!Number.isFinite(Number(amount)) || Number(amount) < 0 || !safeCount(Math.floor(Number(amount))))) return false;
        return update(now, day => increment(day, kind === 'points' ? 'xp' : kind === 'lesson' ? 'lessons' : 'reviews', kind === 'points' ? amount : 1), language);
    }

    function recordSkill(skill, isCorrect, now, language) {
        if (!SKILLS.includes(skill) || typeof isCorrect !== 'boolean') return false;
        return update(now, day => {
            increment(day, 'attempts', 1);
            if (isCorrect) increment(day, 'correct', 1);
        }, language);
    }

    function recordSession(skill, now, language) {
        if (!['writing', 'conversation'].includes(skill)) return false;
        return update(now, day => increment(day, 'sessions', 1), language);
    }

    function getRecentDays(count, now, language) {
        const requested = Number.isInteger(count) ? Math.max(1, Math.min(MAX_DAYS, count)) : 14;
        const byDate = new Map(read(language).map(day => [day.date, day]));
        const cursor = new Date(now == null ? Date.now() : now);
        if (Number.isNaN(cursor.getTime())) throw new Error('Fecha de actividad no válida.');
        cursor.setHours(12, 0, 0, 0);
        const result = [];
        for (let offset = requested - 1; offset >= 0; offset--) {
            const date = new Date(cursor);
            date.setDate(date.getDate() - offset);
            const key = dateKey(date);
            result.push(byDate.get(key) || emptyDay(key));
        }
        return result;
    }

    function clear(language) {
        try {
            if (root.localStorage) root.localStorage.removeItem(storageKey(language));
            return true;
        } catch (_) {
            return false;
        }
    }

    function clearAll() {
        const languages = root.LanguageManager && typeof root.LanguageManager.list === 'function'
            ? root.LanguageManager.list().map(language => language.code)
            : ['id'];
        let success = true;
        languages.forEach(language => { if (!clear(language)) success = false; });
        return success;
    }

    root.StudyHistory = Object.freeze({
        maxDays: MAX_DAYS,
        storageKey,
        record,
        recordSkill,
        recordSession,
        getRecentDays,
        clear,
        clearAll
    });
})(typeof window !== 'undefined' ? window : globalThis);
