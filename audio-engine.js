window.AudioEngine = {
    synth: window.speechSynthesis || null,
    voices: [],
    activeLanguageVoice: null,
    selectedVoice: null,
    voicePreference: 'auto',
    currentAudio: null,
    audioManifest: new Map(),
    audioManifestLoaded: false,
    rate: 1,
    getLanguageConfig() {
        const manager = window.LanguageManager;
        const code = manager && typeof manager.getActiveLanguage === 'function' ? manager.getActiveLanguage() : 'id';
        const config = manager && typeof manager.getLanguage === 'function' ? manager.getLanguage(code) : null;
        return config || { code: 'id', locale: 'id-ID', name: 'indonesio', audioPath: './audio/id/' };
    },
    matchesActiveLanguage(voice) {
        const language = this.getLanguageConfig();
        const normalizeLocale = locale => String(locale || '').toLowerCase().replace(/_/g, '-');
        const voiceLocale = normalizeLocale(voice && voice.lang);
        const fallbackLocales = Array.isArray(language.voiceFallbackLocales) ? language.voiceFallbackLocales : [];
        if (fallbackLocales.length) {
            return [language.locale, ...fallbackLocales].some(locale => normalizeLocale(locale) === voiceLocale);
        }
        const languageTag = normalizeLocale(language.locale || 'id-ID').split('-')[0];
        return voiceLocale.split('-')[0] === languageTag;
    },
    voicePriority(voice) {
        const language = this.getLanguageConfig();
        const preferredLocales = [language.locale, ...(Array.isArray(language.voiceFallbackLocales) ? language.voiceFallbackLocales : [])]
            .map(locale => String(locale || '').toLowerCase().replace(/_/g, '-'));
        const exactIndex = preferredLocales.indexOf(String(voice && voice.lang || '').toLowerCase().replace(/_/g, '-'));
        return exactIndex < 0 ? preferredLocales.length : exactIndex;
    },
    getActiveLanguageVoices() {
        return this.voices.filter(voice => this.matchesActiveLanguage(voice))
            .sort((a, b) => this.voicePriority(a) - this.voicePriority(b));
    },
    voiceKey(voice) {
        return voice.voiceURI || (String(voice.lang || '') + ':' + String(voice.name || ''));
    },
    async loadAudioManifest() {
        try {
            const response = await fetch('./audio/manifest-multilingual.json', { cache: 'no-cache' });
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const manifest = await response.json();
            this.audioManifest = new Map();
            (manifest.entries || []).forEach(entry => {
                if (entry && entry.language && entry.text && entry.file) {
                    this.audioManifest.set(entry.language + ':' + this.hashText(entry.text), entry);
                }
            });
            this.audioManifestLoaded = true;
            this.updateVoiceStatus();
        } catch (error) {
            this.audioManifestLoaded = false;
            this.updateVoiceStatus();
            console.warn('No se pudo cargar la biblioteca de audio Piper:', error);
        }
    },
    hashText(text) {
        const normalized = String(text ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
        if (!normalized) return null;
        const bytes = new TextEncoder().encode(normalized);
        const bitLength = bytes.length * 8;
        const paddedLength = Math.ceil((bytes.length + 9) / 64) * 64;
        const padded = new Uint8Array(paddedLength);
        padded.set(bytes);
        padded[bytes.length] = 0x80;
        const view = new DataView(padded.buffer);
        view.setUint32(paddedLength - 8, Math.floor(bitLength / 0x100000000));
        view.setUint32(paddedLength - 4, bitLength >>> 0);
        const rotate = (value, amount) => (value << amount) | (value >>> (32 - amount));
        let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476, h4 = 0xc3d2e1f0;
        const words = new Uint32Array(80);
        for (let offset = 0; offset < paddedLength; offset += 64) {
            for (let i = 0; i < 16; i++) words[i] = view.getUint32(offset + i * 4);
            for (let i = 16; i < 80; i++) words[i] = rotate(words[i - 3] ^ words[i - 8] ^ words[i - 14] ^ words[i - 16], 1) >>> 0;
            let a = h0, b = h1, c = h2, d = h3, e = h4;
            for (let i = 0; i < 80; i++) {
                let f, k;
                if (i < 20) { f = (b & c) | (~b & d); k = 0x5a827999; }
                else if (i < 40) { f = b ^ c ^ d; k = 0x6ed9eba1; }
                else if (i < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8f1bbcdc; }
                else { f = b ^ c ^ d; k = 0xca62c1d6; }
                const temp = (rotate(a, 5) + f + e + k + words[i]) >>> 0;
                e = d; d = c; c = rotate(b, 30) >>> 0; b = a; a = temp;
            }
            h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0;
            h3 = (h3 + d) >>> 0; h4 = (h4 + e) >>> 0;
        }
        return [h0, h1, h2, h3, h4].map(value => value.toString(16).padStart(8, '0')).join('').slice(0, 12);
    },
    stopCurrentAudio() {
        if (!this.currentAudio) return;
        this.currentAudio.pause();
        this.currentAudio = null;
    },
    setRate(value, persist = true) {
        const rate = Number(value);
        if (![0.5, 0.7, 0.85, 1].includes(rate)) return false;
        this.rate = rate;
        ['audioPlaybackRate', 'lessonAudioPlaybackRate'].forEach(id => {
            const control = document.getElementById(id);
            if (control) control.value = String(rate);
        });
        if (this.currentAudio) this.currentAudio.playbackRate = rate;
        if (persist && typeof DB !== 'undefined') {
            DB.set('settings', 'audioPlaybackRate', rate)
                .catch(error => console.error('No se pudo guardar la velocidad de audio:', error));
        }
        return true;
    },
    renderVoiceOptions() {
        const select = document.getElementById('audioVoiceSelect');
        if (!select) return;
        select.replaceChildren();
        const automatic = document.createElement('option');
        automatic.value = 'auto';
        automatic.textContent = 'Automática (recomendada)';
        select.appendChild(automatic);
        this.getActiveLanguageVoices().forEach(voice => {
            const option = document.createElement('option');
            option.value = this.voiceKey(voice);
            option.textContent = voice.name + ' (' + voice.lang + ')';
            select.appendChild(option);
        });
        const available = this.voices.some(voice =>
            this.matchesActiveLanguage(voice) &&
            this.voiceKey(voice) === this.voicePreference
        );
        select.value = available ? this.voicePreference : 'auto';
    },
    updateVoiceStatus() {
        const status = document.getElementById('audioVoiceStatus');
        if (!status) return;
        const language = this.getLanguageConfig();
        const voices = this.getActiveLanguageVoices();
        const languageName = String(language.name || language.code || 'idioma del curso').toLowerCase();
        const offlinePreparation = document.getElementById('offlineAudioPreparation');
        if (offlinePreparation) offlinePreparation.hidden = language.audioAvailable === false;
        if (language.audioAvailable === false) {
            const active = this.selectedVoice || this.activeLanguageVoice || voices[0];
            status.textContent = active
                ? 'Este curso no tiene grabaciones incluidas. Se usará una voz del dispositivo para ' + languageName + ': ' + active.name + '.'
                : 'Este curso no tiene grabaciones incluidas. El navegador intentará sintetizar el audio para ' + languageName + '.';
            return;
        }
        const manifestPrefix = String(language.code || '') + ':';
        const hasManifestAudio = this.audioManifestLoaded &&
            Array.from(this.audioManifest.keys()).some(key => key.startsWith(manifestPrefix));
        if (language.voiceStatus === 'configured' || hasManifestAudio) {
            const active = this.selectedVoice || this.activeLanguageVoice;
            status.textContent = 'La app incluye grabaciones Piper para ' + languageName +
                '. Voz del dispositivo disponible como respaldo' + (active ? ': ' + active.name : '') + '.';
        } else {
            status.textContent = 'Si falta una grabación, el navegador intentará reproducir la frase en ' +
                languageName + ' con una voz compatible del dispositivo.';
        }
    },
    refreshVoices() {
        if (!this.synth) {
            this.voices = [];
            this.activeLanguageVoice = null;
            this.selectedVoice = null;
            this.renderVoiceOptions();
            this.updateVoiceStatus();
            return;
        }
        this.voices = this.synth.getVoices() || [];
        const languageVoices = this.getActiveLanguageVoices();
        this.activeLanguageVoice = languageVoices[0] || null;
        this.selectedVoice = languageVoices.find(voice => this.voiceKey(voice) === this.voicePreference) || this.activeLanguageVoice;
        this.renderVoiceOptions();
        this.updateVoiceStatus();
    },
    setVoice(value, persist = true) {
        const preference = String(value || 'auto');
        this.voicePreference = preference;
        this.selectedVoice = preference === 'auto'
            ? this.activeLanguageVoice
            : this.voices.find(voice =>
                this.matchesActiveLanguage(voice) &&
                this.voiceKey(voice) === preference
            ) || this.activeLanguageVoice;
        this.renderVoiceOptions();
        this.updateVoiceStatus();
        if (persist && typeof DB !== 'undefined') {
            DB.set('settings', 'audioVoiceURI', preference)
                .catch(error => console.error('No se pudo guardar la voz de audio:', error));
        }
        return true;
    },
    localizeCourseLabels() {
        const language = this.getLanguageConfig();
        const area = document.getElementById('exerciseArea');
        if (area && typeof area.querySelectorAll === 'function') {
            area.querySelectorAll('p').forEach(paragraph => {
                if (/Toca una palabra(?: en .+?)? para consultar su significado sin salir de la lección\./i.test(paragraph.textContent || '')) {
                    const localizedHint = '💡 Toca una palabra para consultar su significado sin salir de la lección.';
                    if (paragraph.textContent !== localizedHint) paragraph.textContent = localizedHint;
                }
            });
        }
        const languageTrigger = document.getElementById('studyLanguageTrigger');
        if (languageTrigger && typeof languageTrigger.setAttribute === 'function') {
            languageTrigger.setAttribute('aria-label', 'Cambiar idioma de estudio. ' + language.name + ' actual');
        }
    },
    observeCourseLabels() {
        this.localizeCourseLabels();
        const area = document.getElementById('exerciseArea');
        if (area && typeof MutationObserver === 'function') {
            this.lessonLabelObserver = new MutationObserver(() => this.localizeCourseLabels());
            this.lessonLabelObserver.observe(area, { childList: true, subtree: true, characterData: true });
        }
    },
    init() {
        this.refreshVoices();
        this.observeCourseLabels();
        this.loadAudioManifest();
        if (this.synth && this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.refreshVoices();
        }
    },
    speakWithDeviceVoice(text) {
        const language = this.getLanguageConfig();
        const languageName = String(language.name || language.code || 'idioma del curso').toLowerCase();
        this.stopCurrentAudio();
        if (!this.synth) {
            const status = document.getElementById('audioVoiceStatus');
            if (status) status.textContent = 'Esta frase no tiene una grabación disponible y el navegador no ofrece una voz de respaldo para ' + languageName + '.';
            return false;
        }
        this.refreshVoices();
        const voice = this.selectedVoice || this.activeLanguageVoice;
        if (!voice && (this.voices.length > 0 || language.allowSystemVoiceFallback !== true)) {
            const status = document.getElementById('audioVoiceStatus');
            if (status) status.textContent = 'No se encontró una grabación para esta frase ni una voz instalada para ' + languageName + '.';
            return false;
        }
        this.synth.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = voice && this.matchesActiveLanguage(voice) ? (voice.lang || language.locale || 'id-ID') : (language.locale || 'id-ID');
        if (voice && this.matchesActiveLanguage(voice)) {
            // A Portuguese (pt-PT) device voice is also a valid fallback for pt-BR.
            utter.voice = voice;
        }
        utter.rate = this.rate;
        this.synth.speak(utter);
        if (!voice) {
            const status = document.getElementById('audioVoiceStatus');
            if (status) status.textContent = 'El navegador intentará reproducir esta frase en ' + languageName +
                ' usando el idioma solicitado, aunque no haya una voz enumerada por el dispositivo.';
        }
        return true;
    },
    playRecorded(text) {
        const language = this.getLanguageConfig();
        if (language.audioAvailable === false || typeof Audio !== 'function') return false;
        const id = this.hashText(text);
        if (!id) return false;
        const manifestEntry = this.audioManifest.get(language.code + ':' + id);
        const audioPath = manifestEntry ? manifestEntry.file : null;
        if (!audioPath && this.audioManifestLoaded) return false;
        this.stopCurrentAudio();
        const audio = new Audio(audioPath || (language.audioPath + id + '.mp3'));
        audio.preload = 'auto';
        audio.playbackRate = this.rate;
        this.currentAudio = audio;
        let fallbackStarted = false;
        const fallback = () => {
            if (fallbackStarted || this.currentAudio !== audio) return;
            fallbackStarted = true;
            this.currentAudio = null;
            this.speakWithDeviceVoice(text);
        };
        audio.onerror = fallback;
        audio.onended = () => {
            if (this.currentAudio === audio) this.currentAudio = null;
        };
        try {
            const playback = audio.play();
            if (playback && typeof playback.catch === 'function') {
                playback.catch(error => {
                    if (fallbackStarted || this.currentAudio !== audio) return;
                    if (error && error.name === 'NotAllowedError') {
                        this.currentAudio = null;
                        const status = document.getElementById('audioVoiceStatus');
                        if (status) status.textContent = 'Toca el botón de audio para reproducir la grabación.';
                        return;
                    }
                    fallback();
                });
            }
        } catch (_) {
            fallback();
        }
        return true;
    },
    speak(text) {
        const value = String(text ?? '').trim();
        if (!value) return false;
        this.updateVoiceStatus();
        if (this.getLanguageConfig().audioMode === 'speechSynthesis') return this.speakWithDeviceVoice(value);
        // Before the manifest is ready, keep the deterministic per-language
        // MP3 path as a fast path. Once loaded, the manifest is authoritative:
        // a missing entry falls back to the device voice instead of probing a
        // possibly nonexistent file.
        if (this.playRecorded(value)) return true;
        return this.speakWithDeviceVoice(value);
    },
    testVoice() {
        const language = this.getLanguageConfig();
        const phrase = String(language.testPhrase || '').trim();
        const status = document.getElementById('voiceTestStatus');
        if (!phrase) {
            if (status) status.textContent = 'Todavía no hay una frase de prueba configurada para este idioma.';
            return false;
        }
        this.refreshVoices();
        if (status) status.textContent = language.audioMode === 'speechSynthesis' || language.audioAvailable === false
            ? 'Probando la voz del dispositivo para ' + String(language.name || language.code).toLowerCase() + '.'
            : 'Probando una grabación Piper incluida. No necesitas instalar una voz.';
        return this.speak(phrase);
    }
};
