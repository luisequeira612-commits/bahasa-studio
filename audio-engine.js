window.AudioEngine = {
    synth: window.speechSynthesis || null,
    voices: [],
    activeLanguageVoice: null,
    selectedVoice: null,
    voicePreference: 'auto',
    currentAudio: null,
    rate: 1,
    getLanguageConfig() {
        const manager = window.LanguageManager;
        const code = manager && typeof manager.getActiveLanguage === 'function' ? manager.getActiveLanguage() : 'id';
        const config = manager && typeof manager.getLanguage === 'function' ? manager.getLanguage(code) : null;
        return config || { code: 'id', locale: 'id-ID', name: 'idioma del curso', audioPath: './audio/id/' };
    },
    matchesActiveLanguage(voice) {
        const languageTag = String(this.getLanguageConfig().locale || 'id-ID').toLowerCase().replace(/_/g, '-').split('-')[0];
        return String(voice && voice.lang || '').toLowerCase().replace(/_/g, '-').split('-')[0] === languageTag;
    },
    voiceKey(voice) {
        return voice.voiceURI || (String(voice.lang || '') + ':' + String(voice.name || ''));
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
        this.voices.filter(voice => this.matchesActiveLanguage(voice)).forEach(voice => {
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
        const voices = this.voices.filter(voice => this.matchesActiveLanguage(voice));
        const languageName = String(language.name || language.code || 'idioma del curso').toLowerCase();
        const hasRecordings = language.audioAvailable !== false;
        if (!hasRecordings) {
            if (voices.length) {
                const active = this.selectedVoice || this.activeLanguageVoice;
                status.textContent = 'Este curso no tiene grabaciones incluidas. Se usará una voz del dispositivo para ' +
                    languageName + ': ' + (active ? active.name : 'selección automática') + '.';
            } else {
                status.textContent = 'Este curso no tiene grabaciones incluidas. El navegador intentará sintetizar el audio para ' +
                    languageName + ' con la voz configurada en el dispositivo.';
            }
            return;
        }
        if (voices.length) {
            const active = this.selectedVoice || this.activeLanguageVoice;
            status.textContent = 'La app incluye grabaciones Piper del curso; no necesitas instalar una voz. Voz del dispositivo disponible como respaldo para ' +
                languageName + ': ' + (active ? active.name : 'selección automática') + '.';
        } else {
            status.textContent = 'La app incluye grabaciones Piper del curso y puede reproducirlas sin voces instaladas. Una voz del dispositivo para ' +
                languageName + ' solo es necesaria como respaldo si falta una grabación.';
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
        const languageVoices = this.voices.filter(voice => this.matchesActiveLanguage(voice));
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
    init() {
        this.refreshVoices();
        if (this.synth && this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.refreshVoices();
        }
    },
    speakWithDeviceVoice(text) {
        const language = this.getLanguageConfig();
        const languageName = String(language.name || language.code || 'idioma del curso').toLowerCase();
        if (!this.synth) {
            const status = document.getElementById('audioVoiceStatus');
            if (status) status.textContent = 'Esta frase no tiene una grabación disponible y el navegador no ofrece una voz de respaldo para ' + languageName + '.';
            return false;
        }
        this.refreshVoices();
        const voice = this.selectedVoice || this.activeLanguageVoice;
        if (!voice || !this.matchesActiveLanguage(voice)) {
            if (language.allowSystemVoiceFallback === true && this.voices.length === 0) {
                this.synth.cancel();
                const utter = new SpeechSynthesisUtterance(text);
                utter.lang = language.locale || 'und';
                utter.voice = null;
                utter.rate = this.rate;
                this.synth.speak(utter);
                return true;
            }
            const status = document.getElementById('audioVoiceStatus');
            if (status) status.textContent = 'No se encontró una grabación para esta frase ni una voz instalada para ' + languageName + ' como respaldo.';
            return false;
        }
        this.synth.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = voice.lang || language.locale || 'und';
        utter.voice = voice;
        utter.rate = this.rate;
        this.synth.speak(utter);
        return true;
    },
    playRecorded(text) {
        const language = this.getLanguageConfig();
        if (language.audioAvailable === false || typeof Audio !== 'function') return false;
        const id = this.hashText(text);
        if (!id) return false;
        this.stopCurrentAudio();
        const audio = new Audio(this.getLanguageConfig().audioPath + id + '.mp3');
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
        if (status) status.textContent = language.audioAvailable === false
            ? 'Probando la voz del dispositivo para ' + String(language.name || 'el idioma del curso').toLowerCase() + '.'
            : 'Probando una grabación Piper incluida. No necesitas instalar una voz.';
        return this.speak(phrase);
    }
};
