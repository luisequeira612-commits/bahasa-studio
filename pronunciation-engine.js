(function () {
    'use strict';
    const PronunciationEngine = {
        activeRecognition: null,
        stop() {
            if (!this.activeRecognition) return;
            const recognition = this.activeRecognition;
            this.activeRecognition = null;
            try { recognition.abort(); } catch (_) {}
        },
        start(targetText, status, button) {
            if (!targetText || !status) return;
            const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!Recognition) {
                status.textContent = 'Este navegador no ofrece reconocimiento de voz. Puedes repetir el audio y practicar en voz alta sin grabación.';
                return;
            }
            this.stop();
            const recognition = new Recognition();
            this.activeRecognition = recognition;
            recognition.lang = 'id-ID';
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.maxAlternatives = 3;
            const normalize = value => String(value || '').toLocaleLowerCase('id-ID')
                .normalize('NFD').replace(/\p{M}/gu, '')
                .replace(/[^\p{L}\p{N}\\s]/gu, ' ').replace(/\s+/g, ' ').trim();
            status.textContent = 'Escuchando… Di la frase en indonesio con claridad.';
            if (button) button.disabled = true;
            recognition.onresult = event => {
                const results = Array.from(event.results || []);
                const latestResult = results[results.length - 1];
                if (latestResult && !latestResult.isFinal) {
                    const liveText = results.map(result => result[0] ? result[0].transcript || '' : '')
                        .join(' ').replace(/\s+/g, ' ').trim();
                    if (liveText) status.textContent = 'Te escucho: “' + liveText + '”. Sigue hablando…';
                    return;
                }
                const finalResults = results.filter(result => result.isFinal);
                if (!finalResults.length) return;
                const target = normalize(targetText);
                const prefix = finalResults.slice(0, -1).map(result => result[0] ? result[0].transcript || '' : '').join(' ');
                const lastFinal = finalResults[finalResults.length - 1];
                const alternatives = Array.from(lastFinal).map(item =>
                    [prefix, item.transcript || ''].filter(Boolean).join(' ').trim());
                const heard = alternatives[0] || '';
                const matched = alternatives.some(value => normalize(value) === target);
                status.textContent = (matched ? '✓ La frase reconocida coincide.' : 'Frase reconocida: “' + heard + '”. No coincide exactamente; escucha otra vez e inténtalo más despacio.') +
                    ' Esta comparación es orientativa, no una calificación de pronunciación.';
            };
            recognition.onerror = event => {
                const messages = {
                    'not-allowed': 'No se concedió permiso para usar el micrófono. Puedes continuar sin él.',
                    'service-not-allowed': 'El servicio de reconocimiento no está disponible. Puedes continuar sin él.',
                    'no-speech': 'No se detectó voz. Inténtalo de nuevo cuando estés listo.',
                    'audio-capture': 'No se encontró un micrófono disponible.'
                };
                status.textContent = messages[event.error] || 'No se pudo reconocer la voz. Puedes repetir el audio e intentarlo otra vez.';
            };
            recognition.onend = () => {
                if (this.activeRecognition === recognition) this.activeRecognition = null;
                if (status.isConnected && status.textContent.startsWith('Te escucho:')) {
                    status.textContent = 'El reconocimiento terminó antes de confirmar la frase. Inténtalo otra vez.';
                }
                if (button && button.isConnected) button.disabled = false;
            };
            try {
                recognition.start();
            } catch (error) {
                this.activeRecognition = null;
                if (button) button.disabled = false;
                status.textContent = 'No se pudo iniciar el micrófono. Comprueba los permisos del navegador.';
            }
        }
    };
    window.PronunciationEngine = PronunciationEngine;
})();
