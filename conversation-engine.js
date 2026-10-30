(function () {
    'use strict';

    const scenarios = [
        {
            id: 'greetings',
            title: 'Saludos y presentaciones',
            description: 'Saluda, di tu nombre y responde con cortesía',
            turns: [
                {
                    speaker: 'Rina',
                    line: 'Halo! Selamat pagi. Apa kabar?',
                    translation: '¡Hola! Buenos días. ¿Cómo estás?',
                    prompt: 'Salúdala y di que estás bien',
                    choices: [
                        { text: 'Halo! Baik, terima kasih.', translation: '¡Hola! Bien, gracias.', correct: true, feedback: 'Es una respuesta natural para devolver el saludo y decir que estás bien.' },
                        { text: 'Saya mau nasi goreng.', translation: 'Quiero arroz frito.', correct: false, feedback: 'Esa frase sirve para pedir comida, no para responder a un saludo.' },
                        { text: 'Selamat malam.', translation: 'Buenas noches.', correct: false, feedback: 'Ese saludo se usa por la noche; aquí Rina ha dicho buenos días.' }
                    ]
                },
                {
                    speaker: 'Rina',
                    line: 'Siapa nama kamu?',
                    translation: '¿Cómo te llamas?',
                    prompt: 'Preséntate',
                    choices: [
                        { text: 'Saya dari Peru.', translation: 'Soy de Perú.', correct: false, feedback: 'Esta frase dice de dónde eres, no tu nombre.' },
                        { text: 'Nama saya Ana.', translation: 'Me llamo Ana.', correct: true, feedback: 'Nama saya… es una forma sencilla de decir tu nombre.' },
                        { text: 'Saya suka membaca.', translation: 'Me gusta leer.', correct: false, feedback: 'Esta frase habla de una afición.' }
                    ]
                },
                {
                    speaker: 'Rina',
                    line: 'Senang bertemu denganmu.',
                    translation: 'Encantada de conocerte.',
                    prompt: 'Responde con cortesía',
                    choices: [
                        { text: 'Sampai jumpa.', translation: 'Hasta luego.', correct: false, feedback: 'Es una despedida, no una respuesta a «encantada de conocerte».' },
                        { text: 'Saya tinggal di sini.', translation: 'Vivo aquí.', correct: false, feedback: 'La frase habla de dónde vives.' },
                        { text: 'Senang bertemu denganmu juga.', translation: 'Encantado/a de conocerte también.', correct: true, feedback: 'También puedes responder repitiendo la expresión y añadiendo juga (también).' }
                    ]
                }
            ]
        },
        {
            id: 'restaurant',
            title: 'Restaurante y comida',
            description: 'Pide un plato, indica tus preferencias y elige una bebida',
            turns: [
                {
                    speaker: 'Camarero',
                    line: 'Selamat siang. Mau pesan apa?',
                    translation: 'Buenas tardes. ¿Qué desea pedir?',
                    prompt: 'Pide arroz frito, por favor',
                    choices: [
                        { text: 'Saya mau nasi goreng, tolong.', translation: 'Quisiera pedir arroz frito, por favor.', correct: true, feedback: 'Saya pesan… es una forma útil y cortés de pedir un plato.' },
                        { text: 'Di mana stasiun?', translation: '¿Dónde está la estación?', correct: false, feedback: 'Esa pregunta sirve para pedir una dirección.' },
                        { text: 'Nama saya Ana.', translation: 'Me llamo Ana.', correct: false, feedback: 'Es una presentación, no un pedido.' }
                    ]
                },
                {
                    speaker: 'Camarero',
                    line: 'Mau pakai cabai?',
                    translation: '¿Lo quiere con chile?',
                    prompt: 'Di que lo quieres sin chile',
                    choices: [
                        { text: 'Ya, saya suka pedas.', translation: 'Sí, me gusta el picante.', correct: false, feedback: 'Esta respuesta acepta el picante; no pide quitar el chile.' },
                        { text: 'Tidak, tanpa cabai, ya.', translation: 'No, sin chile, por favor.', correct: true, feedback: 'Tanpa significa «sin» y permite indicar lo que no quieres incluir.' },
                        { text: 'Berapa harganya?', translation: '¿Cuánto cuesta?', correct: false, feedback: 'Es una pregunta sobre el precio.' }
                    ]
                },
                {
                    speaker: 'Camarero',
                    line: 'Mau minum apa?',
                    translation: '¿Qué desea beber?',
                    prompt: 'Pide agua',
                    choices: [
                        { text: 'Saya mau air putih.', translation: 'Quiero agua.', correct: true, feedback: 'Air putih es agua natural, sin sabor.' },
                        { text: 'Saya naik bus.', translation: 'Voy en autobús.', correct: false, feedback: 'Esta frase habla de transporte.' },
                        { text: 'Saya tidak tahu.', translation: 'No lo sé.', correct: false, feedback: 'No responde a qué bebida quieres.' }
                    ]
                }
            ]
        },
        {
            id: 'shopping',
            title: 'Compras y precios',
            description: 'Pregunta por un producto, acepta el precio y paga',
            turns: [
                {
                    speaker: 'Vendedor',
                    line: 'Selamat pagi. Ada yang bisa saya bantu?',
                    translation: 'Buenos días. ¿Puedo ayudarle en algo?',
                    prompt: 'Di que quieres comprar esta camiseta',
                    choices: [
                        { text: 'Saya mau beli kaus ini.', translation: 'Quiero comprar esta camiseta.', correct: true, feedback: 'Saya mau beli… expresa que quieres comprar algo.' },
                        { text: 'Saya mau ke rumah sakit.', translation: 'Quiero ir al hospital.', correct: false, feedback: 'Esta frase expresa un destino, no una compra.' },
                        { text: 'Apa kabar?', translation: '¿Cómo estás?', correct: false, feedback: 'Es una pregunta para saludar.' }
                    ]
                },
                {
                    speaker: 'Vendedor',
                    line: 'Harganya lima puluh ribu rupiah.',
                    translation: 'Cuesta cincuenta mil rupias.',
                    prompt: 'Acepta el precio y di que lo compras',
                    choices: [
                        { text: 'Terlalu jauh.', translation: 'Está demasiado lejos.', correct: false, feedback: 'Habla de distancia, no de aceptar una compra.' },
                        { text: 'Baik, saya beli.', translation: 'De acuerdo, lo compro.', correct: true, feedback: 'Baik puede expresar acuerdo; saya beli confirma la compra.' },
                        { text: 'Saya lapar.', translation: 'Tengo hambre.', correct: false, feedback: 'Expresa hambre, no una decisión de compra.' }
                    ]
                },
                {
                    speaker: 'Vendedor',
                    line: 'Mau bayar tunai atau pakai kartu?',
                    translation: '¿Quiere pagar en efectivo o con tarjeta?',
                    prompt: 'Di que pagarás en efectivo',
                    choices: [
                        { text: 'Saya bayar tunai.', translation: 'Pago en efectivo.', correct: true, feedback: 'Tunai significa «en efectivo».' },
                        { text: 'Saya tidak punya waktu.', translation: 'No tengo tiempo.', correct: false, feedback: 'No responde al método de pago.' },
                        { text: 'Tolong ulangi.', translation: 'Por favor, repita.', correct: false, feedback: 'Es útil si no has entendido, pero aquí sí quieres indicar cómo pagarás.' }
                    ]
                }
            ]
        },
        {
            id: 'travel',
            title: 'Viajes y transporte',
            description: 'Indica adónde vas, cómo viajas y dónde está una parada',
            turns: [
                {
                    speaker: 'Conductor',
                    line: 'Selamat pagi. Mau pergi ke mana?',
                    translation: 'Buenos días. ¿Adónde quieres ir?',
                    prompt: 'Di que quieres ir a la estación',
                    choices: [
                        { text: 'Saya mau ke stasiun.', translation: 'Quiero ir a la estación.', correct: true, feedback: 'Mau ke… expresa adónde quieres ir.' },
                        { text: 'Saya mau makan.', translation: 'Quiero comer.', correct: false, feedback: 'Esta frase expresa una acción, no un destino.' },
                        { text: 'Saya dari Peru.', translation: 'Soy de Perú.', correct: false, feedback: 'Indica origen, no adónde vas.' }
                    ]
                },
                {
                    speaker: 'Conductor',
                    line: 'Mau naik apa?',
                    translation: '¿En qué quieres ir?',
                    prompt: 'Di que vas en autobús',
                    choices: [
                        { text: 'Saya naik bus.', translation: 'Voy en autobús.', correct: true, feedback: 'Naik bus es una forma común de decir que viajas en autobús.' },
                        { text: 'Saya beli tiket.', translation: 'Compro un billete.', correct: false, feedback: 'Es una frase relacionada con viajar, pero no indica el medio de transporte.' },
                        { text: 'Saya suka bus.', translation: 'Me gustan los autobuses.', correct: false, feedback: 'Expresa una preferencia, no cómo vas a viajar.' }
                    ]
                },
                {
                    speaker: 'Conductor',
                    line: 'Di mana halte bus?',
                    translation: '¿Dónde está la parada de autobús?',
                    prompt: 'Indica que la parada está a la izquierda',
                    choices: [
                        { text: 'Halte bus di sebelah kiri.', translation: 'La parada de autobús está a la izquierda.', correct: true, feedback: 'Di sebelah kiri significa «a la izquierda».' },
                        { text: 'Halte bus sangat mahal.', translation: 'La parada es muy cara.', correct: false, feedback: 'Mahal significa «caro»; no indica una dirección.' },
                        { text: 'Saya mau minum.', translation: 'Quiero beber.', correct: false, feedback: 'No responde a la pregunta por la ubicación.' }
                    ]
                }
            ]
        },
        {
            id: 'friends',
            title: 'Conversaciones con amigos',
            description: 'Pregunta cómo está alguien, habla de tus aficiones y acepta una invitación',
            turns: [
                {
                    speaker: 'Dimas',
                    line: 'Hai! Apa kabar?',
                    translation: '¡Hola! ¿Cómo estás?',
                    prompt: 'Responde y pregunta también cómo está',
                    choices: [
                        { text: 'Baik. Kamu apa kabar?', translation: 'Bien. ¿Y tú cómo estás?', correct: true, feedback: 'Devolver la pregunta hace que la conversación continúe de forma natural.' },
                        { text: 'Saya pesan nasi goreng.', translation: 'Pido arroz frito.', correct: false, feedback: 'Es una frase para pedir comida.' },
                        { text: 'Di mana hotel?', translation: '¿Dónde está el hotel?', correct: false, feedback: 'Es una pregunta sobre una dirección.' }
                    ]
                },
                {
                    speaker: 'Dimas',
                    line: 'Apa hobimu?',
                    translation: '¿Cuál es tu afición?',
                    prompt: 'Di que te gusta leer libros',
                    choices: [
                        { text: 'Saya suka membaca buku.', translation: 'Me gusta leer libros.', correct: true, feedback: 'Saya suka… expresa lo que te gusta hacer.' },
                        { text: 'Saya sakit kepala.', translation: 'Me duele la cabeza.', correct: false, feedback: 'Describe un problema de salud.' },
                        { text: 'Saya tinggal di hotel.', translation: 'Me alojo en un hotel.', correct: false, feedback: 'Habla de dónde te alojas.' }
                    ]
                },
                {
                    speaker: 'Dimas',
                    line: 'Mau minum kopi?',
                    translation: '¿Quieres tomar café?',
                    prompt: 'Acepta la invitación con cortesía',
                    choices: [
                        { text: 'Tidak, saya tersesat.', translation: 'No, estoy perdido/a.', correct: false, feedback: 'Tersesat significa «perdido»; no es una respuesta a la invitación.' },
                        { text: 'Ya, boleh. Terima kasih.', translation: 'Sí, me gustaría. Gracias.', correct: true, feedback: 'Ya, boleh es una manera sencilla de aceptar.' },
                        { text: 'Saya mau ke stasiun.', translation: 'Quiero ir a la estación.', correct: false, feedback: 'Indica un destino, no si aceptas el café.' }
                    ]
                }
            ]
        },
        {
            id: 'help',
            title: 'Pedir ayuda y resolver situaciones',
            description: 'Ofrece ayuda, da una indicación sencilla y responde a un agradecimiento',
            turns: [
                {
                    speaker: 'Viajero',
                    line: 'Maaf, saya tersesat. Bisa bantu saya?',
                    translation: 'Disculpe, estoy perdido/a. ¿Puede ayudarme?',
                    prompt: 'Ofrece ayuda y pregunta qué ocurre',
                    choices: [
                        { text: 'Tentu. Ada apa?', translation: 'Por supuesto. ¿Qué ocurre?', correct: true, feedback: 'Tentu expresa disposición y Ada apa? pregunta qué sucede.' },
                        { text: 'Saya mau beli kaus.', translation: 'Quiero comprar una camiseta.', correct: false, feedback: 'Es una frase de compras.' },
                        { text: 'Selamat tidur.', translation: 'Buenas noches (al ir a dormir).', correct: false, feedback: 'Es una despedida antes de dormir.' }
                    ]
                },
                {
                    speaker: 'Viajero',
                    line: 'Di mana rumah sakit?',
                    translation: '¿Dónde está el hospital?',
                    prompt: 'Indica que el hospital está a la izquierda',
                    choices: [
                        { text: 'Rumah sakit di sebelah kiri.', translation: 'El hospital está a la izquierda.', correct: true, feedback: 'Di sebelah kiri permite dar una indicación de dirección.' },
                        { text: 'Rumah sakit sangat enak.', translation: 'El hospital está muy rico.', correct: false, feedback: 'Enak se usa para comida o experiencias agradables, no para ubicar un edificio.' },
                        { text: 'Saya tidak suka rumah sakit.', translation: 'No me gustan los hospitales.', correct: false, feedback: 'Expresa una opinión, no da una dirección.' }
                    ]
                },
                {
                    speaker: 'Viajero',
                    line: 'Terima kasih atas bantuan Anda.',
                    translation: 'Gracias por su ayuda.',
                    prompt: 'Responde «de nada»',
                    choices: [
                        { text: 'Sama-sama.', translation: 'De nada.', correct: true, feedback: 'Sama-sama es la respuesta habitual a Terima kasih.' },
                        { text: 'Berapa harganya?', translation: '¿Cuánto cuesta?', correct: false, feedback: 'Es una pregunta sobre precios.' },
                        { text: 'Saya mau tidur.', translation: 'Quiero dormir.', correct: false, feedback: 'No responde al agradecimiento.' }
                    ]
                }
            ]
        }
    ];

    const escapeHtml = function (value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
        });
    };

    const ConversationEngine = {
        scenarios: scenarios,
        currentScenario: null,
        turnIndex: 0,
        score: 0,
        answered: false,
        selectedChoice: null,

        open: function () {
            if (typeof App !== 'undefined') App.switchView('conversations');
            this.renderScenarioList();
        },

        exit: function () {
            if (typeof App !== 'undefined') App.switchView('route');
        },

        start: function (scenarioId) {
            const scenario = this.scenarios.find(function (item) { return item.id === scenarioId; });
            if (!scenario) return;
            this.currentScenario = scenario;
            this.turnIndex = 0;
            this.score = 0;
            this.answered = false;
            this.selectedChoice = null;
            this.renderStep();
        },

        renderScenarioList: function () {
            const list = document.getElementById('conversationScenarioList');
            const practice = document.getElementById('conversationPracticeArea');
            if (!list || !practice) return;
            list.hidden = false;
            practice.hidden = true;
            const cards = this.scenarios.map(function (scenario) {
                return '<article class="card" style="margin:10px 0;padding:14px;">' +
                    '<h3 style="margin:0 0 6px;">' + escapeHtml(scenario.title) + '</h3>' +
                    '<p style="color:var(--text-muted);font-size:0.9rem;margin:0 0 10px;">' + escapeHtml(scenario.description) + '</p>' +
                    '<p style="font-size:0.8rem;color:var(--text-muted);">3 turnos · Respuestas prácticas</p>' +
                    '<button class="btn" type="button" data-conversation-start="' + escapeHtml(scenario.id) + '">Empezar</button>' +
                    '</article>';
            }).join('');
            list.innerHTML = '<div style="margin-bottom:12px;">' +
                '<button class="btn btn-outline btn-sm" type="button" data-conversation-exit>← Volver al curso</button>' +
                '<h2 style="margin-top:12px;">Conversaciones prácticas</h2>' +
                '<p style="color:var(--text-muted);font-size:0.9rem;">Elige una situación. Escucha la frase, decide cómo responder en indonesio y recibe una explicación inmediata.</p>' +
                cards + '</div>';
        },

        renderStep: function () {
            const list = document.getElementById('conversationScenarioList');
            const practice = document.getElementById('conversationPracticeArea');
            if (!this.currentScenario || !list || !practice) return;
            list.hidden = true;
            practice.hidden = false;
            const turn = this.currentScenario.turns[this.turnIndex];
            const choices = turn.choices.map(function (choice, index) {
                let style = '';
                if (ConversationEngine.answered && choice.correct) style = 'border:2px solid var(--success);';
                else if (ConversationEngine.answered && index === ConversationEngine.selectedChoice) style = 'border:2px solid var(--error);';
                const disabled = ConversationEngine.answered ? 'disabled' : '';
                return '<button type="button" class="option-btn" data-conversation-choice="' + index +
                    '" data-correct="' + (choice.correct ? 'true' : 'false') + '" ' + disabled +
                    ' style="width:100%;text-align:left;margin:5px 0;' + style + '">' +
                    escapeHtml(choice.text) + '</button>';
            }).join('');
            let feedback = '';
            if (this.answered) {
                const chosen = turn.choices[this.selectedChoice];
                if (chosen.correct) {
                    feedback = '<p style="color:var(--success);font-weight:600;">¡Correcto!</p><p>' +
                        escapeHtml(chosen.translation) + ' ' + escapeHtml(chosen.feedback) + '</p>';
                } else {
                    const correct = turn.choices.find(function (choice) { return choice.correct; });
                    feedback = '<p style="color:var(--error);font-weight:600;">Buen intento. La respuesta adecuada es:</p><p><strong>' +
                        escapeHtml(correct.text) + '</strong> — ' + escapeHtml(correct.translation) + '</p><p>' +
                        escapeHtml(chosen.feedback) + '</p>';
                }
            }
            practice.innerHTML = '<div class="card" style="padding:14px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">' +
                '<button class="btn btn-outline btn-sm" type="button" data-conversation-back>← Escenarios</button>' +
                '<span style="font-size:0.8rem;color:var(--text-muted);">Turno ' + (this.turnIndex + 1) + ' de ' + this.currentScenario.turns.length + '</span>' +
                '</div>' +
                '<h2 style="margin:14px 0 4px;">' + escapeHtml(this.currentScenario.title) + '</h2>' +
                '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:12px;margin:12px 0;">' +
                '<strong>' + escapeHtml(turn.speaker) + '</strong>' +
                '<p style="font-size:1.1rem;margin:8px 0;">' + escapeHtml(turn.line) + '</p>' +
                '<p style="font-size:0.85rem;color:var(--text-muted);margin:0;">' + escapeHtml(turn.translation) + '</p>' +
                '<button class="btn btn-outline btn-sm" style="margin-top:10px;" type="button" data-conversation-audio>🔊 Escuchar frase</button>' +
                '</div>' +
                '<h3>' + escapeHtml(turn.prompt) + '</h3>' +
                '<div>' + choices + '</div>' +
                '<div id="conversationFeedback" role="status" aria-live="polite" style="margin-top:10px;">' + feedback + '</div>' +
                '<button class="btn" type="button" data-conversation-next ' + (this.answered ? '' : 'disabled') +
                ' style="margin-top:12px;width:100%;">Continuar</button>' +
                '</div>';
        },

        choose: function (index) {
            if (this.answered || !this.currentScenario) return;
            const turn = this.currentScenario.turns[this.turnIndex];
            if (!Number.isInteger(index) || index < 0 || index >= turn.choices.length) return;
            this.answered = true;
            this.selectedChoice = index;
            if (turn.choices[index].correct) this.score += 1;
            this.renderStep();
        },

        next: function () {
            if (!this.answered || !this.currentScenario) return;
            if (this.turnIndex + 1 < this.currentScenario.turns.length) {
                this.turnIndex += 1;
                this.answered = false;
                this.selectedChoice = null;
                this.renderStep();
            } else {
                this.renderResult();
            }
        },

        renderResult: function () {
            const practice = document.getElementById('conversationPracticeArea');
            if (!practice) return;
            const total = this.currentScenario.turns.length;
            const message = this.score === total ? '¡Muy bien! Has mantenido la conversación.' :
                this.score > 0 ? 'Buen trabajo. Revisa las expresiones y vuelve a intentarlo.' :
                'Sigue practicando. Puedes repetir el diálogo cuando quieras.';
            practice.innerHTML = '<div class="card" style="padding:16px;text-align:center;">' +
                '<h2>Conversación completada</h2>' +
                '<p id="conversationResultScore" style="font-size:1.25rem;font-weight:700;">Resultado: ' + this.score + '/' + total + ' respuestas correctas</p>' +
                '<p style="color:var(--text-muted);">' + message + '</p>' +
                '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:14px;">' +
                '<button class="btn" type="button" data-conversation-replay>Repetir conversación</button>' +
                '<button class="btn btn-outline" type="button" data-conversation-back>Volver a escenarios</button>' +
                '<button class="btn btn-outline" type="button" data-conversation-exit>Volver al curso</button>' +
                '</div></div>';
        },

        replay: function () {
            if (this.currentScenario) this.start(this.currentScenario.id);
        },

        speakCurrent: function () {
            if (!this.currentScenario || typeof AudioEngine === 'undefined') return;
            const turn = this.currentScenario.turns[this.turnIndex];
            AudioEngine.speak(turn.line);
        }
    };

    window.ConversationEngine = ConversationEngine;

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (!target || typeof target.closest !== 'function') return;
        const startButton = target.closest('[data-conversation-start]');
        if (startButton) return ConversationEngine.start(startButton.dataset.conversationStart);
        const choiceButton = target.closest('[data-conversation-choice]');
        if (choiceButton) return ConversationEngine.choose(Number(choiceButton.dataset.conversationChoice));
        if (target.closest('[data-conversation-next]')) return ConversationEngine.next();
        if (target.closest('[data-conversation-audio]')) return ConversationEngine.speakCurrent();
        if (target.closest('[data-conversation-replay]')) return ConversationEngine.replay();
        if (target.closest('[data-conversation-back]')) return ConversationEngine.renderScenarioList();
        if (target.closest('[data-conversation-exit]')) return ConversationEngine.exit();
    });
})();