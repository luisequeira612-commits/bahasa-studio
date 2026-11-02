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
                        { text: 'Saya mau nasi goreng, tolong.', translation: 'Quisiera pedir arroz frito, por favor.', correct: true, feedback: 'Saya mau… expresa lo que quieres pedir; tolong añade cortesía a la petición.' },
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
        },
        {
            id: 'organizar-evento',
            level: 'A2',
            title: 'Organizar un evento',
            description: 'Coordina una hora, propone un lugar y confirma los preparativos',
            turns: [
                {
                    speaker: 'Maya',
                    line: 'Kapan kita mau mengadakan acara?',
                    translation: '¿Cuándo queremos organizar el evento?',
                    prompt: 'Propón organizarlo el sábado por la tarde',
                    choices: [
                        { text: 'Bagaimana kalau hari Sabtu sore?', translation: '¿Qué tal el sábado por la tarde?', correct: true, feedback: 'Bagaimana kalau… permite proponer una opción para que la otra persona la considere.' },
                        { text: 'Saya sudah makan tadi pagi.', translation: 'Ya comí esta mañana.', correct: false, feedback: 'Esta frase habla de una comida pasada, no propone una fecha.' },
                        { text: 'Acara itu sangat jauh.', translation: 'Ese evento está muy lejos.', correct: false, feedback: 'Describe una distancia, no responde cuándo organizarlo.' }
                    ]
                },
                {
                    speaker: 'Maya',
                    line: 'Di mana sebaiknya kita bertemu?',
                    translation: '¿Dónde sería mejor encontrarnos?',
                    prompt: 'Sugiere encontrarse en la biblioteca porque es tranquila',
                    choices: [
                        { text: 'Kita bertemu di perpustakaan karena tempatnya tenang.', translation: 'Nos encontramos en la biblioteca porque el lugar es tranquilo.', correct: true, feedback: 'Kita bertemu propone el lugar y karena introduce el motivo.' },
                        { text: 'Saya belum menyelesaikan pekerjaan.', translation: 'Todavía no he terminado el trabajo.', correct: false, feedback: 'Explica una tarea pendiente, pero no propone un lugar.' },
                        { text: 'Tolong tutup pintunya.', translation: 'Por favor, cierra la puerta.', correct: false, feedback: 'Es una petición, no una propuesta para encontrarse.' }
                    ]
                },
                {
                    speaker: 'Maya',
                    line: 'Baik. Siapa yang akan membawa makanan?',
                    translation: 'De acuerdo. ¿Quién llevará la comida?',
                    prompt: 'Di que tú llevarás las bebidas y pregunta si está bien',
                    choices: [
                        { text: 'Saya akan membawa minuman. Bagaimana?', translation: 'Yo llevaré las bebidas. ¿Qué te parece?', correct: true, feedback: 'Akan expresa una acción futura y la pregunta invita a confirmar el plan.' },
                        { text: 'Kemarin saya membeli sepatu.', translation: 'Ayer compré zapatos.', correct: false, feedback: 'Habla de una compra pasada, no de los preparativos.' },
                        { text: 'Saya tidak tahu jalan pulang.', translation: 'No conozco el camino de regreso.', correct: false, feedback: 'Habla de una dirección, no de qué llevarás.' }
                    ]
                }
            ]
        },
        {
            id: 'pengalaman-kerja',
            level: 'A2',
            title: 'Hablar de experiencia laboral',
            description: 'Describe tareas anteriores, explica una habilidad y habla de tus objetivos',
            turns: [
                {
                    speaker: 'Budi',
                    line: 'Apa pekerjaanmu sebelumnya?',
                    translation: '¿Cuál era tu trabajo anterior?',
                    prompt: 'Di que antes trabajabas en una tienda',
                    choices: [
                        { text: 'Sebelumnya, saya bekerja di toko.', translation: 'Anteriormente trabajaba en una tienda.', correct: true, feedback: 'Sebelumnya sitúa la experiencia en el pasado y bekerja di toko describe el trabajo.' },
                        { text: 'Besok saya pergi ke pasar.', translation: 'Mañana iré al mercado.', correct: false, feedback: 'Habla de un plan futuro, no de experiencia laboral.' },
                        { text: 'Saya sedang mencari alamat.', translation: 'Estoy buscando una dirección.', correct: false, feedback: 'Describe una acción actual sin relación con el trabajo anterior.' }
                    ]
                },
                {
                    speaker: 'Budi',
                    line: 'Tugas apa yang biasa kamu lakukan?',
                    translation: '¿Qué tareas solías realizar?',
                    prompt: 'Explica que atendías a los clientes y organizabas los productos',
                    choices: [
                        { text: 'Saya melayani pelanggan dan mengatur barang.', translation: 'Atendía a los clientes y organizaba los productos.', correct: true, feedback: 'La respuesta menciona dos tareas concretas y relacionadas con el trabajo.' },
                        { text: 'Saya ingin membeli tiket kereta.', translation: 'Quiero comprar un billete de tren.', correct: false, feedback: 'Expresa una intención de viaje, no tareas laborales.' },
                        { text: 'Cuacanya sangat panas hari ini.', translation: 'Hoy hace mucho calor.', correct: false, feedback: 'Describe el clima, no tu experiencia.' }
                    ]
                },
                {
                    speaker: 'Budi',
                    line: 'Apa tujuanmu untuk pekerjaan berikutnya?',
                    translation: '¿Cuál es tu objetivo para el próximo trabajo?',
                    prompt: 'Di que quieres aprender nuevas habilidades',
                    choices: [
                        { text: 'Saya ingin mempelajari keterampilan baru.', translation: 'Quiero aprender nuevas habilidades.', correct: true, feedback: 'Saya ingin… expresa un objetivo o deseo.' },
                        { text: 'Saya sudah makan siang.', translation: 'Ya almorcé.', correct: false, feedback: 'Informa sobre una comida, no sobre un objetivo laboral.' },
                        { text: 'Kantor itu berada di lantai dua.', translation: 'La oficina está en el segundo piso.', correct: false, feedback: 'Indica una ubicación, no una meta.' }
                    ]
                }
            ]
        },
        {
            id: 'layanan-digital',
            level: 'A2',
            title: 'Resolver un problema con un servicio digital',
            description: 'Explica un problema, solicita ayuda y confirma una solución',
            turns: [
                {
                    speaker: 'Petugas',
                    line: 'Apa masalah yang Anda alami?',
                    translation: '¿Qué problema está experimentando?',
                    prompt: 'Explica que no puedes iniciar sesión en tu cuenta',
                    choices: [
                        { text: 'Saya tidak bisa masuk ke akun saya.', translation: 'No puedo iniciar sesión en mi cuenta.', correct: true, feedback: 'Tidak bisa expresa una imposibilidad y masuk ke akun describe el acceso a la cuenta.' },
                        { text: 'Saya ingin memesan meja untuk dua orang.', translation: 'Quiero reservar una mesa para dos personas.', correct: false, feedback: 'Es una reserva de restaurante, no un problema de acceso.' },
                        { text: 'Kemarin saya pergi ke kantor.', translation: 'Ayer fui a la oficina.', correct: false, feedback: 'Cuenta una actividad pasada, no explica el problema.' }
                    ]
                },
                {
                    speaker: 'Petugas',
                    line: 'Apakah Anda sudah mencoba mengatur ulang kata sandi?',
                    translation: '¿Ya intentó restablecer la contraseña?',
                    prompt: 'Di que ya lo intentaste, pero el problema continúa',
                    choices: [
                        { text: 'Sudah, tetapi masalahnya masih terjadi.', translation: 'Sí, ya lo hice, pero el problema continúa.', correct: true, feedback: 'Sudah confirma que lo intentaste y tetapi introduce el contraste.' },
                        { text: 'Belum, saya sedang makan.', translation: 'Todavía no, estoy comiendo.', correct: false, feedback: 'No confirma el intento ni explica que el problema continúa.' },
                        { text: 'Saya tinggal dekat stasiun.', translation: 'Vivo cerca de la estación.', correct: false, feedback: 'Habla de dónde vives, no del restablecimiento.' }
                    ]
                },
                {
                    speaker: 'Petugas',
                    line: 'Kami akan mengirim tautan bantuan melalui email.',
                    translation: 'Le enviaremos un enlace de ayuda por correo electrónico.',
                    prompt: 'Agradece y di que revisarás tu correo',
                    choices: [
                        { text: 'Terima kasih. Saya akan memeriksa email saya.', translation: 'Gracias. Revisaré mi correo electrónico.', correct: true, feedback: 'Agradece y usa akan para indicar lo que harás después.' },
                        { text: 'Saya tidak suka makanan pedas.', translation: 'No me gusta la comida picante.', correct: false, feedback: 'Expresa una preferencia de comida, no responde a la ayuda.' },
                        { text: 'Berapa jauh dari sini?', translation: '¿A qué distancia está de aquí?', correct: false, feedback: 'Es una pregunta sobre distancia, no una respuesta de agradecimiento.' }
                    ]
                }
            ]
        },
    ];


    const escapeHtml = function (value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
        });
    };

    function shuffledScenario(scenario) {
        const copy = Object.assign({}, scenario, {
            turns: scenario.turns.map(function (turn) {
                return Object.assign({}, turn, { choices: turn.choices.slice() });
            })
        });
        copy.turns.forEach(function (turn) {
            for (let index = turn.choices.length - 1; index > 0; index -= 1) {
                const swapIndex = Math.floor(Math.random() * (index + 1));
                const current = turn.choices[index];
                turn.choices[index] = turn.choices[swapIndex];
                turn.choices[swapIndex] = current;
            }
        });
        return copy;
    }

    const ConversationEngine = {
        scenarios: scenarios,
        getAvailableScenarios: function () {
            return scenarios.slice();
        },
        currentScenario: null,
        turnIndex: 0,
        score: 0,
        answered: false,
        selectedChoice: null,
        freeResponseMode: false,
        freeResponseText: '',
        freeResponseRevealed: false,
        freeResponseHintVisible: false,
        freeResponseTurns: 0,
        freeResponseCounted: false,
        activeFreeRecognition: null,
        mistakeTurns: [],
        sessionRecorded: false,

        open: function () {
            if (typeof App !== 'undefined') App.switchView('conversations');
            this.renderScenarioList();
        },

        exit: function () {
            this.stopFreeResponseRecognition();
            if (typeof App !== 'undefined') App.switchView('route');
        },

        stopFreeResponseRecognition: function () {
            const recognition = this.activeFreeRecognition;
            if (!recognition) return;
            this.activeFreeRecognition = null;
            if (typeof recognition.abort === 'function') {
                try { recognition.abort(); } catch (error) { /* Recognition may already have ended. */ }
            }
        },

        start: function (scenarioId) {
            this.stopFreeResponseRecognition();
            const scenario = this.getAvailableScenarios().find(function (item) { return item.id === scenarioId; });
            if (!scenario) return;
            this.currentScenario = shuffledScenario(scenario);
            this.turnIndex = 0;
            this.score = 0;
            this.answered = false;
            this.selectedChoice = null;
            this.freeResponseMode = false;
            this.freeResponseText = '';
            this.freeResponseRevealed = false;
            this.freeResponseHintVisible = false;
            this.freeResponseTurns = 0;
            this.freeResponseCounted = false;
            this.mistakeTurns = [];
            this.sessionRecorded = false;
            this.renderStep();
        },

        renderScenarioList: function () {
            this.stopFreeResponseRecognition();
            const list = document.getElementById('conversationScenarioList');
            const practice = document.getElementById('conversationPracticeArea');
            if (!list || !practice) return;
            list.hidden = false;
            practice.hidden = true;
            const availableScenarios = this.getAvailableScenarios();
            const cards = availableScenarios.map(function (scenario) {
                return '<article class="card" style="margin:10px 0;padding:14px;">' +
                    '<h3 style="margin:0 0 6px;">' + escapeHtml(scenario.title) + '</h3>' +
                    '<p style="color:var(--text-muted);font-size:0.9rem;margin:0 0 10px;">' + escapeHtml(scenario.description) + '</p>' +
                    '<p style="font-size:0.8rem;color:var(--text-muted);">' + escapeHtml(scenario.level || 'A1') + ' · 3 turnos · Respuestas prácticas</p>' +
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
            if (this.freeResponseMode) {
                this.renderFreeResponseStep(turn, practice);
                return;
            }
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
                        escapeHtml(correct.feedback) + '</p><p>' +
                        escapeHtml(chosen.feedback) + '</p>';
                }
            }
            practice.innerHTML = '<div class="card" style="padding:14px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">' +
                '<button class="btn btn-outline btn-sm" type="button" data-conversation-back>← Escenarios</button>' +
                '<span role="status" aria-live="polite" aria-atomic="true" style="font-size:0.8rem;color:var(--text-muted);">Turno ' + (this.turnIndex + 1) + ' de ' + this.currentScenario.turns.length + '</span>' +
                '</div>' +
                '<progress class="conversation-progress" value="' + (this.turnIndex + 1) + '" max="' + this.currentScenario.turns.length + '" aria-label="Progreso de la conversación" style="display:block;width:100%;height:10px;margin:10px 0 14px;"></progress>' +
                '<h2 style="margin:14px 0 4px;">' + escapeHtml(this.currentScenario.title) + '</h2>' +
                '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:12px;margin:12px 0;">' +
                '<strong>' + escapeHtml(turn.speaker) + '</strong>' +
                '<p style="font-size:1.1rem;margin:8px 0;">' + escapeHtml(turn.line) + '</p>' +
                '<p style="font-size:0.85rem;color:var(--text-muted);margin:0;">' + escapeHtml(turn.translation) + '</p>' +
                '<button class="btn btn-outline btn-sm" style="margin-top:10px;" type="button" data-conversation-audio>🔊 Escuchar frase</button>' +
                '</div>' +
                '<h3>' + escapeHtml(turn.prompt) + '</h3>' +
                '<button class="btn btn-outline btn-sm" type="button" data-conversation-free>Responder sin opciones</button>' +
                '<div>' + choices + '</div>' +
                '<div id="conversationFeedback" role="status" aria-live="polite" style="margin-top:10px;">' + feedback + '</div>' +
                '<button class="btn" type="button" data-conversation-next ' + (this.answered ? '' : 'disabled') +
                ' style="margin-top:12px;width:100%;">Continuar</button>' +
                '</div>';
        },

        renderFreeResponseStep: function (turn, practice) {
            const example = turn.choices.find(function (choice) { return choice.correct; });
            const hintPanel = this.freeResponseHintVisible
                ? '<p class="conversation-hint" role="status" aria-live="polite" style="padding:10px;border-left:3px solid var(--border);color:var(--text-muted);">' + escapeHtml(example.feedback) + '</p>'
                : '';
            const responsePanel = this.freeResponseRevealed
                ? '<div class="card" style="margin-top:12px;"><p><strong>Tu respuesta</strong></p><p style="white-space:pre-wrap;">' + escapeHtml(this.freeResponseText) + '</p><p><strong>Un ejemplo posible</strong></p><p>' + escapeHtml(example.text) + '</p><p style="color:var(--text-muted);">' + escapeHtml(example.translation) + ' Otras respuestas también pueden ser correctas.</p><button class="btn btn-outline btn-sm" type="button" data-conversation-edit-response>Editar mi respuesta</button></div>'
: '<label for="conversationFreeResponse" style="display:block;margin:12px 0 6px;">Tu respuesta en indonesio</label><textarea id="conversationFreeResponse" rows="3" maxlength="1000" aria-describedby="conversationFreeResponseCount" style="width:100%;box-sizing:border-box;" placeholder="Escribe o dicta lo que responderías…">' + escapeHtml(this.freeResponseText) + '</textarea><p id="conversationFreeResponseCount" style="font-size:0.8rem;color:var(--text-muted);margin:4px 0 8px;">' + this.freeResponseText.length + '/1000 caracteres</p><button class="btn btn-outline btn-sm" type="button" data-conversation-speech>🎙️ Dictar respuesta (opcional)</button><p id="conversationSpeechStatus" role="status" aria-live="polite" style="font-size:0.85rem;color:var(--text-muted);">El micrófono solo se activa al pulsar. El navegador puede procesar el audio; la app no guarda grabaciones.</p><button class="btn btn-outline btn-sm" type="button" data-conversation-hint>' + (this.freeResponseHintVisible ? 'Ocultar pista' : 'Ver pista') + '</button><div>' + hintPanel + '</div><button class="btn" type="button" data-conversation-free-example>Ver un ejemplo posible</button>';
            practice.innerHTML = '<div class="card" style="padding:14px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">' +
                '<button class="btn btn-outline btn-sm" type="button" data-conversation-back>← Escenarios</button>' +
                '<span role="status" aria-live="polite" aria-atomic="true" style="font-size:0.8rem;color:var(--text-muted);">Turno ' + (this.turnIndex + 1) + ' de ' + this.currentScenario.turns.length + ' · práctica libre</span>' +
                '</div><progress class="conversation-progress" value="' + (this.turnIndex + 1) + '" max="' + this.currentScenario.turns.length + '" aria-label="Progreso de la conversación" style="display:block;width:100%;height:10px;margin:10px 0 14px;"></progress><h2 style="margin:14px 0 4px;">' + escapeHtml(this.currentScenario.title) + '</h2>' +
                '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:12px;margin:12px 0;">' +
                '<strong>' + escapeHtml(turn.speaker) + '</strong><p style="font-size:1.1rem;margin:8px 0;">' + escapeHtml(turn.line) + '</p>' +
                '<p style="font-size:0.85rem;color:var(--text-muted);margin:0;">' + escapeHtml(turn.translation) + '</p>' +
                '<button class="btn btn-outline btn-sm" style="margin-top:10px;" type="button" data-conversation-audio>🔊 Escuchar frase</button></div>' +
                '<h3>' + escapeHtml(turn.prompt) + '</h3>' +
                '<button class="btn btn-outline btn-sm" type="button" data-conversation-guided>← Volver a opciones guiadas</button>' +
                '<p style="color:var(--text-muted);font-size:0.85rem;">Intenta responder con tus propias palabras antes de ver el ejemplo. Esta práctica no se califica automáticamente. Puedes cambiar de modalidad sin perder tu borrador.</p>' +
                responsePanel +
                '<button class="btn" type="button" data-conversation-next ' + (this.freeResponseRevealed ? '' : 'disabled') + ' style="margin-top:12px;width:100%;">Continuar</button></div>';
        },

        useFreeResponse: function () {
            if (this.answered || !this.currentScenario) return;
            this.freeResponseMode = true;
            this.freeResponseRevealed = false;
            this.renderStep();
        },

        useGuidedResponse: function () {
            if (!this.freeResponseMode || this.answered || !this.currentScenario) return;
            const input = document.getElementById('conversationFreeResponse');
            if (input && typeof input.value === 'string') this.freeResponseText = input.value;
            this.stopFreeResponseRecognition();
            this.freeResponseMode = false;
            this.freeResponseRevealed = false;
            this.answered = false;
            this.selectedChoice = null;
            this.renderStep();
        },

        toggleFreeHint: function () {
            if (!this.freeResponseMode || this.freeResponseRevealed) return;
            const input = document.getElementById('conversationFreeResponse');
            if (input && typeof input.value === 'string') this.freeResponseText = input.value;
            this.freeResponseHintVisible = !this.freeResponseHintVisible;
            this.renderStep();
        },

        showFreeExample: function () {
            if (!this.freeResponseMode || this.freeResponseRevealed) return;
            const input = document.getElementById('conversationFreeResponse');
            const response = input && typeof input.value === 'string' ? input.value.trim() : '';
            if (!response) {
                const status = document.getElementById('conversationSpeechStatus');
                if (status) status.textContent = 'Escribe o dicta primero tu respuesta; después podrás compararla con el ejemplo.';
                return;
            }
            this.freeResponseText = response;
            this.freeResponseHintVisible = false;
            this.freeResponseRevealed = true;
            this.answered = true;
            if (!this.freeResponseCounted) {
                this.freeResponseTurns += 1;
                this.freeResponseCounted = true;
            }
            this.renderStep();
        },

        editFreeResponse: function () {
            if (!this.freeResponseMode || !this.freeResponseRevealed) return;
            this.freeResponseRevealed = false;
            this.answered = false;
            this.renderStep();
        },

        updateFreeResponseCounter: function (input) {
            if (!this.freeResponseMode || !input || typeof input.value !== 'string') return;
            if (input.value.length > 1000) input.value = input.value.slice(0, 1000);
            this.freeResponseText = input.value;
            const counter = document.getElementById('conversationFreeResponseCount');
            if (counter) counter.textContent = input.value.length + '/1000 caracteres';
        },

        captureFreeResponse: function (button) {
            const status = document.getElementById('conversationSpeechStatus');
            const input = document.getElementById('conversationFreeResponse');
            const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!Recognition) {
                if (status) status.textContent = 'Este navegador no ofrece reconocimiento de voz. Puedes responder en voz alta y escribir tu frase.';
                return;
            }
            if (!status || !input) return;
            const recognition = new Recognition();
            this.activeFreeRecognition = recognition;
            recognition.lang = 'id-ID';
            recognition.continuous = false;
            recognition.interimResults = false;
            button.disabled = true;
            status.textContent = 'Escuchando… responde en indonesio.';
            const isCurrentDraft = function () {
                return ConversationEngine.activeFreeRecognition === recognition &&
                    ConversationEngine.freeResponseMode &&
                    document.getElementById('conversationFreeResponse') === input;
            };
            recognition.onresult = function (event) {
                if (!isCurrentDraft()) return;
                const result = event.results && event.results[0] && event.results[0][0];
                if (result && result.transcript) {
                    const transcript = result.transcript.trim();
                    const existing = input.value.trim();
                    if (transcript) {
                        const combined = existing ? existing + ' ' + transcript : transcript;
                        const exceedsLimit = combined.length > 1000;
                        input.value = combined.slice(0, 1000);
                        ConversationEngine.updateFreeResponseCounter(input);
                        status.textContent = exceedsLimit
                            ? 'Se alcanzó el límite de 1000 caracteres; la transcripción se recortó para ajustarse. Revisa el borrador.'
                            : 'Transcripción provisional añadida al borrador. Revísala antes de continuar.';
                    }
                }
            };
            recognition.onerror = function (event) {
                if (!isCurrentDraft()) return;
                const messages = {
                    'not-allowed': 'No se concedió permiso para usar el micrófono. Puedes escribir tu respuesta.',
                    'no-speech': 'No se detectó voz. Inténtalo otra vez.',
                    'audio-capture': 'No se encontró un micrófono disponible.',
                    'service-not-allowed': 'El servicio de reconocimiento no está disponible.'
                };
                status.textContent = messages[event.error] || 'No se pudo reconocer la voz. Puedes escribir tu respuesta.';
            };
            recognition.onend = function () {
                if (ConversationEngine.activeFreeRecognition === recognition) {
                    ConversationEngine.activeFreeRecognition = null;
                }
                if (button.isConnected) button.disabled = false;
            };
            try {
                recognition.start();
            } catch (error) {
                if (this.activeFreeRecognition === recognition) this.activeFreeRecognition = null;
                button.disabled = false;
                status.textContent = 'No se pudo iniciar el micrófono. Comprueba los permisos del navegador.';
            }
        },

        choose: function (index) {
            if (this.answered || this.freeResponseMode || !this.currentScenario) return;
            const turn = this.currentScenario.turns[this.turnIndex];
            if (!Number.isInteger(index) || index < 0 || index >= turn.choices.length) return;
            this.answered = true;
            this.selectedChoice = index;
            const isCorrect = Boolean(turn.choices[index].correct);
            if (isCorrect) this.score += 1;
            else this.mistakeTurns.push(turn);
            if (typeof App !== 'undefined' && typeof App.recordSkillActivity === 'function') {
                App.recordSkillActivity('conversation', isCorrect)
                    .catch(error => console.error('No se pudo guardar el perfil de conversación:', error));
            }
            this.renderStep();
        },

        next: function () {
            if (!this.answered || !this.currentScenario) return;
            this.stopFreeResponseRecognition();
            if (this.freeResponseMode) {
                this.freeResponseText = '';
                this.freeResponseRevealed = false;
                this.freeResponseHintVisible = false;
                this.freeResponseCounted = false;
            }
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
            if (!this.sessionRecorded) {
                this.sessionRecorded = true;
                if (typeof App !== 'undefined' && typeof App.recordSkillSession === 'function') {
                    App.recordSkillSession('conversation').catch(error => console.error('No se pudo registrar la sesión de conversación:', error));
                }
            }
            const total = this.currentScenario.turns.length;
            const guidedTotal = total - this.freeResponseTurns;
            const message = this.freeResponseTurns
                ? 'Has practicado respuestas propias. Compáralas con los ejemplos, recordando que puede haber otras formas correctas.'
                : this.score === total ? '¡Muy bien! Has mantenido la conversación.' :
                this.score > 0 ? 'Buen trabajo. Revisa las expresiones y vuelve a intentarlo.' :
                'Sigue practicando. Puedes repetir el diálogo cuando quieras.';
            const scoreSummary = guidedTotal
                ? 'Resultado guiado: ' + this.score + '/' + guidedTotal + ' respuestas correctas'
                : 'Has completado los turnos en práctica libre';
            const freeSummary = this.freeResponseTurns
                ? '<p style="color:var(--text-muted);">' + this.freeResponseTurns + ' respuesta(s) libre(s) practicada(s), sin calificación automática.</p>'
                : '';
            const trackingNote = '<p style="color:var(--text-muted);">Se registran los aciertos y errores de las respuestas guiadas y que completaste una sesión. No se guardan tus frases, transcripciones ni respuestas libres.</p>';
            practice.innerHTML = '<div class="card" style="padding:16px;text-align:center;">' +
                '<h2>Conversación completada</h2>' +
                '<p id="conversationResultScore" style="font-size:1.25rem;font-weight:700;">' + scoreSummary + '</p>' +
                freeSummary + trackingNote +
                '<p style="color:var(--text-muted);">' + message + '</p>' +
                '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:14px;">' +
                (this.mistakeTurns.length ? '<button class="btn" type="button" data-conversation-retry>Practicar errores (' + this.mistakeTurns.length + ')</button>' : '') +
                '<button class="btn" type="button" data-conversation-replay>Repetir conversación</button>' +
                '<button class="btn btn-outline" type="button" data-conversation-back>Volver a escenarios</button>' +
                '<button class="btn btn-outline" type="button" data-conversation-exit>Volver al curso</button>' +
                '</div></div>';
        },

        retryMistakes: function () {
            if (!this.currentScenario || !this.mistakeTurns.length) return;
            const original = this.scenarios.find(scenario => scenario.id === this.currentScenario.id);
            if (!original) return;
            const missedTurns = this.mistakeTurns.slice();
            this.currentScenario = shuffledScenario(Object.assign({}, original, { turns: missedTurns }));
            this.turnIndex = 0;
            this.score = 0;
            this.answered = false;
            this.selectedChoice = null;
            this.freeResponseMode = false;
            this.freeResponseText = '';
            this.freeResponseRevealed = false;
            this.freeResponseHintVisible = false;
            this.freeResponseTurns = 0;
            this.freeResponseCounted = false;
            this.mistakeTurns = [];
            this.sessionRecorded = false;
            this.renderStep();
        },

        replay: function () {
            if (!this.currentScenario) return;
            const keepFreeResponseMode = this.freeResponseMode;
            this.start(this.currentScenario.id);
            if (keepFreeResponseMode) {
                this.freeResponseMode = true;
                this.renderStep();
            }
        },

        speakCurrent: function () {
            if (!this.currentScenario || typeof AudioEngine === 'undefined') return;
            const turn = this.currentScenario.turns[this.turnIndex];
            AudioEngine.speak(turn.line);
        }
    };

    window.ConversationEngine = ConversationEngine;

    document.addEventListener('input', function (event) {
        const target = event.target;
        if (!target || target.id !== 'conversationFreeResponse') return;
        ConversationEngine.updateFreeResponseCounter(target);
    });

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (!target || typeof target.closest !== 'function') return;
        const startButton = target.closest('[data-conversation-start]');
        if (startButton) return ConversationEngine.start(startButton.dataset.conversationStart);
        const choiceButton = target.closest('[data-conversation-choice]');
        if (choiceButton) return ConversationEngine.choose(Number(choiceButton.dataset.conversationChoice));
        if (target.closest('[data-conversation-free]')) return ConversationEngine.useFreeResponse();
        if (target.closest('[data-conversation-guided]')) return ConversationEngine.useGuidedResponse();
        if (target.closest('[data-conversation-hint]')) return ConversationEngine.toggleFreeHint();
        if (target.closest('[data-conversation-free-example]')) return ConversationEngine.showFreeExample();
        if (target.closest('[data-conversation-edit-response]')) return ConversationEngine.editFreeResponse();
        const speechButton = target.closest('[data-conversation-speech]');
        if (speechButton) return ConversationEngine.captureFreeResponse(speechButton);
        if (target.closest('[data-conversation-next]')) return ConversationEngine.next();
        if (target.closest('[data-conversation-audio]')) return ConversationEngine.speakCurrent();
        if (target.closest('[data-conversation-retry]')) return ConversationEngine.retryMistakes();
        if (target.closest('[data-conversation-replay]')) return ConversationEngine.replay();
        if (target.closest('[data-conversation-back]')) return ConversationEngine.renderScenarioList();
        if (target.closest('[data-conversation-exit]')) return ConversationEngine.exit();
    });
})();