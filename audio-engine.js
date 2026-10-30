window.AudioEngine = {
            synth: window.speechSynthesis,
            voices: [],
            idVoice: null,
            selectedVoice: null,
            voicePreference: 'auto',
            rate: 0.85,
            voiceKey(voice) {
                return voice.voiceURI || (String(voice.lang || '') + ':' + String(voice.name || ''));
            },
            setRate(value, persist = true) {
                const rate = Number(value);
                if (![0.5, 0.7, 0.85, 1].includes(rate)) return false;
                this.rate = rate;
                ['audioPlaybackRate', 'lessonAudioPlaybackRate'].forEach(id => {
                    const control = document.getElementById(id);
                    if (control) control.value = String(rate);
                });
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
                this.voices.filter(voice => String(voice.lang || '').toLowerCase().startsWith('id')).forEach(voice => {
                    const option = document.createElement('option');
                    option.value = this.voiceKey(voice);
                    option.textContent = voice.name + ' (' + voice.lang + ')';
                    select.appendChild(option);
                });
                const available = this.voices.some(voice =>
                    String(voice.lang || '').toLowerCase().startsWith('id') &&
                    this.voiceKey(voice) === this.voicePreference
                );
                select.value = available ? this.voicePreference : 'auto';
            },
            updateVoiceStatus() {
                const status = document.getElementById('audioVoiceStatus');
                if (!status) return;
                const indonesianVoices = this.voices.filter(voice => String(voice.lang || '').toLowerCase().startsWith('id'));
                if (!this.synth) {
                    status.textContent = 'Este navegador no admite síntesis de voz. Puedes continuar con las actividades sin audio.';
                } else if (!indonesianVoices.length) {
                    status.textContent = 'No se detectó una voz indonesia instalada. Se usará la voz predeterminada del sistema con el idioma id-ID; puedes instalar una voz indonesia en los ajustes del dispositivo.';
                } else {
                    const active = this.selectedVoice || this.idVoice;
                    const countLabel = indonesianVoices.length === 1 ? 'voz indonesia disponible' : 'voces indonesias disponibles';
                    status.textContent = indonesianVoices.length + ' ' + countLabel + '. Voz activa: ' +
                        (active ? active.name : 'selección automática') + '.';
                }
            },
            refreshVoices() {
                if (!this.synth) return;
                this.voices = this.synth.getVoices() || [];
                const indonesianVoices = this.voices.filter(voice => String(voice.lang || '').toLowerCase().startsWith('id'));
                this.idVoice = indonesianVoices[0] || null;
                this.selectedVoice = indonesianVoices.find(voice => this.voiceKey(voice) === this.voicePreference) || this.idVoice;
                this.renderVoiceOptions();
                this.updateVoiceStatus();
            },
            setVoice(value, persist = true) {
                const preference = String(value || 'auto');
                this.voicePreference = preference;
                this.selectedVoice = preference === 'auto'
                    ? this.idVoice
                    : this.voices.find(voice =>
                        String(voice.lang || '').toLowerCase().startsWith('id') &&
                        this.voiceKey(voice) === preference
                    ) || this.idVoice;
                this.renderVoiceOptions();
                this.updateVoiceStatus();
                if (persist && typeof DB !== 'undefined') {
                    DB.set('settings', 'audioVoiceURI', preference)
                        .catch(error => console.error('No se pudo guardar la voz de audio:', error));
                }
                return true;
            },
            init() {
                if (!this.synth) {
                    this.updateVoiceStatus();
                    return;
                }
                this.refreshVoices();
                if (this.synth.onvoiceschanged !== undefined) this.synth.onvoiceschanged = () => this.refreshVoices();
            },
            speak(text) {
                if (!this.synth) {
                    alert('Este navegador no admite síntesis de voz. Prueba con otro navegador o dispositivo para escuchar el indonesio.');
                    return;
                }
                this.synth.cancel();
                const utter = new SpeechSynthesisUtterance(text);
                utter.lang = 'id-ID';
                const voice = this.selectedVoice || this.idVoice;
                if (voice) utter.voice = voice;
                utter.rate = this.rate;
                this.synth.speak(utter);
            },
            testVoice() {
                const status = document.getElementById('voiceTestStatus');
                if (this.selectedVoice || this.idVoice) {
                    const voice = this.selectedVoice || this.idVoice;
                    if (status) status.textContent = 'Probando la voz indonesia «' + voice.name + '» (' + voice.lang + ').';
                } else {
                    if (status) status.textContent = 'No se detectó una voz indonesia instalada. Se intentará usar la voz predeterminada del sistema con el idioma id-ID; el resultado puede variar.';
                }
                this.speak("Halo! Bahasa Indonesia.");
            }
        };
