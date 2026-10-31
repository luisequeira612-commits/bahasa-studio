/* Extracted verbatim from the original CourseData object. Integrity is pinned in tests. */
window.BAHASA_CURRICULUM_A1 = {
                    id: 'A1',
                    title: 'A1 — Principiante',
                    units: [
                        {
                            id: 'a1_u1',
                            title: 'Unidad 1: Primeras palabras, saludos y pronombres',
                            desc: 'Empieza desde cero: saludar, agradecer, reconocer quién habla y usar dos verbos cotidianos.',
                            grammar: 'Los pronombres básicos son saya (yo), kamu (tú) y dia (él/ella). Los verbos no cambian según la persona: saya makan y dia makan usan makan de la misma manera.',
                            vocab: [
                                { id: 'v1', idn: 'Saya', esp: 'Yo', ex: 'Saya makan.', exEsp: 'Yo como.' },
                                { id: 'v2', idn: 'Kamu', esp: 'Tú', ex: 'Kamu minum.', exEsp: 'Tú bebes.' },
                                { id: 'v3', idn: 'Dia', esp: 'Él / ella', ex: 'Dia makan.', exEsp: 'Él / ella come.' },
                                { id: 'v4', idn: 'Selamat pagi', esp: 'Buenos días', ex: 'Selamat pagi!', exEsp: '¡Buenos días!' },
                                { id: 'v60', idn: 'Halo', esp: 'Hola', ex: 'Halo, Ana!', exEsp: '¡Hola, Ana!' },
                                { id: 'v45', idn: 'Terima kasih', esp: 'Gracias', ex: 'Terima kasih, Ana.', exEsp: 'Gracias, Ana.' },
                                { id: 'v46', idn: 'Makan', esp: 'Comer', ex: 'Saya makan.', exEsp: 'Yo como.' },
                                { id: 'v47', idn: 'Minum', esp: 'Beber', ex: 'Dia minum.', exEsp: 'Él / ella bebe.' },
                                { id: 'v465', idn: 'Apa kabar?', esp: '¿Cómo estás?', ex: 'Apa kabar?', exEsp: '¿Cómo estás?' },
                                { id: 'v1002', idn: 'Baik', esp: 'Bien', ex: 'Saya baik.', exEsp: 'Estoy bien.' }
                            ],
                            exercises: [
                                { vocabId: 'v1', type: 'mc', prompt: '¿Qué palabra significa «yo»?', options: ['Kamu', 'Saya', 'Dia'], answer: 1, explanation: 'Saya significa «yo» y es una forma estándar y respetuosa.' },
                                { vocabId: 'v2', type: 'translate_es_id', prompt: 'Traduce al indonesio: «tú»', answer: 'Kamu', explanation: 'Kamu significa «tú» en contextos informales.' },
                                { vocabId: 'v3', type: 'mc', prompt: '¿Qué significa «dia»?', options: ['Yo', 'Tú', 'Él / ella'], answer: 2, explanation: 'Dia puede significar él o ella; el pronombre no indica género.' },
                                { vocabId: 'v3', type: 'mc', prompt: 'Escucha la palabra y elige su significado', audioText: 'Dia', options: ['Yo', 'Tú', 'Él / ella'], answer: 2, explanation: 'Dia puede significar él o ella; el pronombre no indica género.' },
                                { vocabId: 'v4', type: 'mc', prompt: 'Escucha el saludo y elige su significado', audioText: 'Selamat pagi', options: ['Buenos días', 'Buenas noches', 'Hasta luego'], answer: 0, explanation: 'Selamat pagi significa «buenos días».' },
                                { vocabId: 'v4', type: 'mc', prompt: 'Escucha el diálogo y elige de qué hablan', audioText: 'Selamat pagi. Apa kabar? Baik, terima kasih.', options: ['Dos personas se saludan y preguntan cómo están', 'Una persona pide comida', 'Dos personas se despiden'], answer: 0, explanation: 'El diálogo combina un saludo matutino con una pregunta por el estado de la otra persona y una respuesta cortés.' },
                                { vocabId: 'v60', type: 'translate_es_id', prompt: 'Traduce: «hola»', answer: 'Halo', explanation: 'Halo es un saludo común.' },
                                { vocabId: 'v45', type: 'mc', prompt: 'Alguien te ayuda. ¿Qué dices para dar las gracias?', options: ['Halo', 'Terima kasih', 'Selamat pagi'], answer: 1, explanation: 'Terima kasih significa «gracias».' },
                                { vocabId: 'v46', type: 'order', prompt: 'Ordena: «Yo como»', words: ['makan', 'Saya'], correctOrder: ['Saya', 'makan'], explanation: 'El orden básico es sujeto + verbo: Saya makan.' },
                                { vocabId: 'v47', type: 'translate_es_id', prompt: 'Traduce: «beber»', answer: 'Minum', explanation: 'Minum significa «beber».' },
                                { vocabId: 'v46', type: 'mc', prompt: 'Completa: «Dia ___» (Él / ella come)', options: ['makan', 'minum', 'kamu'], answer: 0, explanation: 'Makan significa «comer» y no cambia con dia.' },
                                { vocabId: 'v1', type: 'write', prompt: "Escribe una frase propia con «saya» y un verbo de la unidad.", hint: "Por ejemplo, habla de algo que tú haces; no copies literalmente un ejercicio anterior.", modelAnswer: "Saya makan.", explanation: "Saya significa «yo» y makan significa «comer». Puedes crear otras frases correctas con el vocabulario aprendido." }
                            ]
                        },
                        {
                            id: 'a1_u2',
                            title: 'Unidad 2: Decir no y construir frases básicas',
                            desc: 'Aprende la diferencia entre tidak y bukan con palabras cotidianas; no necesitas conocerlas de antemano.',
                            grammar: 'Usa tidak para negar una acción o una cualidad: Saya tidak makan (no como). Usa bukan para negar una identificación con un sustantivo: Ini bukan air (esto no es agua).',
                            vocab: [
                                { id: 'v5', idn: 'Tidak', esp: 'No (niega acciones o cualidades)', ex: 'Saya tidak tidur.', exEsp: 'Yo no duermo.' },
                                { id: 'v6', idn: 'Bukan', esp: 'No es / no (niega una identificación)', ex: 'Ini bukan air.', exEsp: 'Esto no es agua.' },
                                { id: 'v48', idn: 'Air', esp: 'Agua', ex: 'Saya minum air.', exEsp: 'Yo bebo agua.' },
                                { id: 'v49', idn: 'Nasi', esp: 'Arroz cocido', ex: 'Saya makan nasi.', exEsp: 'Yo como arroz.' },
                                { id: 'v50', idn: 'Tidur', esp: 'Dormir', ex: 'Dia tidur.', exEsp: 'Él / ella duerme.' },
                                { id: 'v51', idn: 'Ini', esp: 'Esto / este / esta', ex: 'Ini nasi.', exEsp: 'Esto es arroz.' },
                                { id: 'v52', idn: 'Buku', esp: 'Libro', ex: 'Ini buku.', exEsp: 'Esto es un libro.' },
                                { id: 'v53', idn: 'Teman', esp: 'Amigo / amiga', ex: 'Dia teman saya.', exEsp: 'Él / ella es mi amigo/a.' }
                            ],
                            exercises: [
                                { vocabId: 'v5', type: 'mc', prompt: 'Completa: «Saya ___ makan» (Yo no como)', options: ['bukan', 'tidak', 'ini'], answer: 1, explanation: 'Makan es una acción; se niega con tidak.' },
                                { vocabId: 'v6', type: 'mc', prompt: 'Completa: «Ini ___ air» (Esto no es agua)', options: ['tidak', 'bukan', 'tidur'], answer: 1, explanation: 'Air es un sustantivo; para negar la identificación se usa bukan.' },
                                { vocabId: 'v48', type: 'translate_es_id', prompt: 'Traduce: «agua»', answer: 'Air', explanation: 'Air significa «agua».' },
                                { vocabId: 'v49', type: 'mc', prompt: '¿Qué significa «nasi»?', options: ['Agua', 'Arroz cocido', 'Libro'], answer: 1, explanation: 'Nasi es arroz cocido, un alimento básico en Indonesia.' },
                                { vocabId: 'v50', type: 'mc', prompt: 'Escucha la frase y elige su significado', audioText: 'Dia tidur', options: ['Él / ella duerme', 'Yo como', 'Tú bebes'], answer: 0, explanation: 'Dia tidur significa «él / ella duerme».' },
                                { vocabId: 'v51', type: 'translate_es_id', prompt: 'Traduce: «esto»', answer: 'Ini', explanation: 'Ini señala algo cercano: esto, este o esta. Si acompaña a un sustantivo, normalmente va después: buku ini (este libro); al presentar algo, puede ir al inicio: Ini buku (esto es un libro).' },
                                { vocabId: 'v52', type: 'order', prompt: 'Ordena: «Esto es un libro»', words: ['buku', 'Ini'], correctOrder: ['Ini', 'buku'], explanation: 'En esta frase básica, ini va antes del sustantivo: Ini buku.' },
                                { vocabId: 'v53', type: 'translate_es_id', prompt: 'Traduce: «amigo / amiga»', answer: 'Teman', explanation: 'Teman significa amigo o amiga.' },
                                { vocabId: 'v5', type: 'order', prompt: 'Ordena: «Yo no como»', words: ['makan', 'tidak', 'Saya'], correctOrder: ['Saya', 'tidak', 'makan'], explanation: 'Tidak se coloca antes de la acción: Saya tidak makan.' },
                                { vocabId: 'v48', type: 'write', prompt: "Escribe una frase propia con «air».", hint: "Intenta decir qué haces con el agua usando palabras de esta unidad.", modelAnswer: "Saya minum air.", explanation: "Air significa «agua». La frase de ejemplo significa «Yo bebo agua»." }
                            ]
                        }
                        ,
                        {
                            id: 'a1_u3',
                            title: 'Unidad 3: Presentarse y decir de dónde eres',
                            desc: 'Saludar, decir tu nombre y preguntar el origen de otra persona.',
                            grammar: 'Usa “Nama saya ...” para decir tu nombre y “Saya dari ...” para indicar de dónde eres. “Di” significa “en” y aparece en “Saya tinggal di Managua”. “Siapa nama kamu?” significa “¿Cómo te llamas?”.',
                            vocab: [
                                { id: 'v10', idn: 'Nama', esp: 'Nombre', ex: 'Nama saya Ana.', exEsp: 'Me llamo Ana.' },
                                { id: 'v11', idn: 'Siapa', esp: 'Quién', ex: 'Siapa nama kamu?', exEsp: '¿Cómo te llamas?' },
                                { id: 'v12', idn: 'Dari', esp: 'De / desde', ex: 'Saya dari Peru.', exEsp: 'Soy de Perú.' },
                                { id: 'v13', idn: 'Tinggal', esp: 'Vivir / residir', ex: 'Saya tinggal di Managua.', exEsp: 'Vivo en Managua.' },
                                { id: 'v14', idn: 'Senang bertemu denganmu', esp: 'Encantado/a de conocerte', ex: 'Senang bertemu denganmu!', exEsp: '¡Encantado/a de conocerte!' },
                                {"id":"v101","idn":"Kota","esp":"Ciudad","ex":"Saya tinggal di kota ini.","exEsp":"Vivo en esta ciudad."},
                                {"id":"v102","idn":"Negara","esp":"País","ex":"Indonesia adalah negara besar.","exEsp":"Indonesia es un país grande."},
                                {"id":"v103","idn":"Alamat","esp":"Dirección","ex":"Apa alamatmu?","exEsp":"¿Cuál es tu dirección?"}
                            ],
                            exercises: [
                                {
                                    "vocabId": "v10",
                                    "type": "mc",
                                    "prompt": "¿Qué palabra significa nombre?",
                                    "options": [
                                        "Nama",
                                        "Umur",
                                        "Alamat",
                                        "Usia"
                                    ],
                                    "answer": 0,
                                    "explanation": "Nama significa nombre."
                                },
                                {
                                    "vocabId": "v11",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: quién",
                                    "answer": "Siapa",
                                    "explanation": "Siapa sirve para preguntar por una persona."
                                },
                                {
                                    "vocabId": "v12",
                                    "type": "order",
                                    "prompt": "Ordena la frase: Soy de Perú",
                                    "words": [
                                        "Peru",
                                        "Saya",
                                        "dari"
                                    ],
                                    "correctOrder": [
                                        "Saya",
                                        "dari",
                                        "Peru"
                                    ],
                                    "explanation": "Para decir el origen se usa Saya dari y el lugar."
                                },
                                {
                                    "vocabId": "v13",
                                    "type": "mc",
                                    "prompt": "Completa: Saya ___ di Managua (Vivo en Managua)",
                                    "options": [
                                        "tinggal",
                                        "makan",
                                        "minum",
                                        "tidur"
                                    ],
                                    "answer": 0,
                                    "explanation": "Tinggal significa vivir o residir."
                                },
                                {
                                    "vocabId": "v14",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: Encantado de conocerte",
                                    "answer": "Senang bertemu denganmu",
                                    "explanation": "Es una expresión amistosa para conocer a alguien."
                                },
                                {
                                    "vocabId": "v10",
                                    "type": "mc",
                                    "prompt": "Escucha la frase y elige su significado",
                                    "audioText": "Nama saya Ana",
                                    "options": ["Me llamo Ana", "Vivo en Perú", "¿Cómo te llamas?"],
                                    "answer": 0,
                                    "explanation": "Nama saya Ana significa Me llamo Ana."
                                },
                                {
                                    "vocabId": "v11",
                                    "type": "listen",
                                    "prompt": "Escribe lo que escuchas",
                                    "answer": "Siapa nama kamu",
                                    "explanation": "Esta pregunta significa Cómo te llamas."
                                },
                                {
                                    "vocabId": "v12",
                                    "type": "mc",
                                    "prompt": "¿Qué significa dari en la frase Saya dari Peru?",
                                    "options": [
                                        "De",
                                        "Quién",
                                        "Vivir",
                                        "Nombre"
                                    ],
                                    "answer": 0,
                                    "explanation": "Dari indica origen en esta frase."
                                },
                                {
                                    "vocabId": "v13",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: Vivo en Managua",
                                    "answer": "Saya tinggal di Managua",
                                    "explanation": "Saya tinggal di indica dónde vive una persona."
                                },
                                {
                                    "vocabId": "v14",
                                    "type": "listen",
                                    "prompt": "Escribe lo que escuchas",
                                    "answer": "Senang bertemu denganmu",
                                    "explanation": "Escucha la expresión completa y escríbela."
                                },
                                {
                                    "vocabId": "v10",
                                    "type": "order",
                                    "prompt": "Ordena: Mi nombre es Ana",
                                    "words": [
                                        "Ana",
                                        "saya",
                                        "Nama"
                                    ],
                                    "correctOrder": [
                                        "Nama",
                                        "saya",
                                        "Ana"
                                    ],
                                    "explanation": "Nama saya Ana es una forma básica de presentarse."
                                },
                                {
                                    "vocabId": "v11",
                                    "type": "mc",
                                    "prompt": "Elige la pregunta para saber el nombre de alguien",
                                    "options": [
                                        "Siapa nama kamu",
                                        "Saya dari Peru",
                                        "Saya tinggal di kota",
                                        "Nama saya Ana"
                                    ],
                                    "answer": 0,
                                    "explanation": "Siapa nama kamu pregunta el nombre."
                                },
                                {
                                    "vocabId": "v12",
                                    "type": "listen",
                                    "prompt": "Escribe lo que escuchas",
                                    "answer": "Saya dari Peru",
                                    "explanation": "Saya dari Peru indica el país de origen."
                                },
                                { vocabId: 'v10', type: 'write', prompt: "Preséntate en indonesio escribiendo tu nombre.", hint: "Usa la estructura Nama saya ...", modelAnswer: "Nama saya Ana.", explanation: "Nama saya significa «mi nombre». Sustituye Ana por tu propio nombre." },
                                {"vocabId":"v101","type":"mc","prompt":"¿Qué significa kota?","options":["Ciudad","País","Dirección"],"answer":0,"explanation":"Kota significa ciudad."},
                                {"vocabId":"v102","type":"translate_es_id","prompt":"Traduce: país","answer":"Negara","explanation":"Negara significa país."},
                                {"vocabId":"v103","type":"write","prompt":"Escribe una frase sobre dónde vives.","hint":"Intenta construir una frase nueva con el vocabulario de la unidad.","modelAnswer":"Saya tinggal di Managua.","explanation":"Usa Saya tinggal di... para decir dónde vives."}
                            ]
                        },
                        {
                            id: 'a1_u4',
                            title: 'Unidad 4: Números y edad',
                            desc: 'Aprender números básicos y preguntar la edad.',
                            grammar: 'Para preguntar la edad puedes decir “Berapa umur kamu?” (¿Cuántos años tienes?). “Saya berumur ... tahun” significa “Tengo ... años”.',
                            vocab: [
                                { id: 'v15', idn: 'Satu', esp: 'Uno', ex: 'Satu buku.', exEsp: 'Un libro.' },
                                { id: 'v16', idn: 'Dua', esp: 'Dos', ex: 'Dua teman.', exEsp: 'Dos amigos.' },
                                { id: 'v17', idn: 'Tiga', esp: 'Tres', ex: 'Tiga tahun.', exEsp: 'Tres años.' },
                                { id: 'v18', idn: 'Berapa', esp: 'Cuánto / cuántos', ex: 'Berapa umur kamu?', exEsp: '¿Cuántos años tienes?' },
                                { id: 'v19', idn: 'Tahun', esp: 'Año', ex: 'Saya berumur lima tahun.', exEsp: 'Tengo cinco años.' },
                                { id: 'v40', idn: 'Empat', esp: 'Cuatro', ex: 'Empat buku.', exEsp: 'Cuatro libros.' },
                                { id: 'v41', idn: 'Lima', esp: 'Cinco', ex: 'Lima teman.', exEsp: 'Cinco amigos.' },
                                { id: 'v42', idn: 'Sepuluh', esp: 'Diez', ex: 'Sepuluh tahun.', exEsp: 'Diez años.' },
                                { id: 'v43', idn: 'Umur', esp: 'Edad', ex: 'Berapa umur kamu?', exEsp: '¿Cuántos años tienes?' },
                                {"id":"v105","idn":"Enam","esp":"Seis","ex":"Enam buku.","exEsp":"Seis libros."},
                                {"id":"v106","idn":"Tujuh","esp":"Siete","ex":"Tujuh hari.","exEsp":"Siete días."},
                                {"id":"v107","idn":"Delapan","esp":"Ocho","ex":"Delapan orang.","exEsp":"Ocho personas."}
                            ],
                            exercises: [
                                
                                          {
                                                    "vocabId": "v15",
                                                    "type": "mc",
                                                    "prompt": "¿Cómo se dice uno?",
                                                    "options": [
                                                              "Dua",
                                                              "Satu",
                                                              "Tiga",
                                                              "Empat"
                                                    ],
                                                    "answer": 1,
                                                    "explanation": "Satu significa uno."
                                          },
                                          {
                                                    "vocabId": "v16",
                                                    "type": "translate_es_id",
                                                    "prompt": "Traduce: dos",
                                                    "answer": "Dua",
                                                    "explanation": "Dua significa dos."
                                          },
                                          {
                                                    "vocabId": "v18",
                                                    "type": "order",
                                                    "prompt": "Ordena la pregunta: ¿Cuántos años tienes?",
                                                    "words": [
                                                              "umur",
                                                              "kamu",
                                                              "Berapa"
                                                    ],
                                                    "correctOrder": [
                                                              "Berapa",
                                                              "umur",
                                                              "kamu"
                                                    ],
                                                    "explanation": "Berapa umur kamu pregunta la edad."
                                          },
                                          {
                                                    "vocabId": "v42",
                                                    "type": "mc",
                                                    "prompt": "Escucha la frase y elige su significado",
                                                    "audioText": "Sepuluh tahun",
                                                    "options": ["Diez años", "Siete días", "Ocho personas"],
                                                    "answer": 0,
                                                    "explanation": "Sepuluh tahun significa diez años."
                                          },
                                          {
                                                    "vocabId": "v43",
                                                    "type": "mc",
                                                    "prompt": "¿Qué palabra significa edad?",
                                                    "options": [
                                                              "Tahun",
                                                              "Umur",
                                                              "Bulan",
                                                              "Hari"
                                                    ],
                                                    "answer": 1,
                                                    "explanation": "Umur significa edad."
                                          },
                                          {
                                                    "vocabId": "v17",
                                                    "type": "translate_es_id",
                                                    "prompt": "Traduce: tres años",
                                                    "answer": "Tiga tahun",
                                                    "explanation": "Tiga tahun significa tres años."
                                          },
                                          {
                                                    "vocabId": "v19",
                                                    "type": "order",
                                                    "prompt": "Ordena: Tengo cinco años",
                                                    "words": [
                                                              "tahun",
                                                              "Saya",
                                                              "berumur",
                                                              "lima"
                                                    ],
                                                    "correctOrder": [
                                                              "Saya",
                                                              "berumur",
                                                              "lima",
                                                              "tahun"
                                                    ],
                                                    "explanation": "Saya berumur lima tahun expresa la edad."
                                          },
                                          {
                                                    "vocabId": "v15",
                                                    "type": "write",
                                                    "prompt": "Escribe una frase con un número o una edad que hayas aprendido.",
                                                    "hint": "Escribe una oración completa y revisa el orden de las palabras.",
                                                    "modelAnswer": "Saya berumur lima tahun.",
                                                    "explanation": "Este ejemplo significa «Tengo cinco años». Usa un número que conozcas de la unidad."
                                          }
                                ,
                                {"vocabId":"v105","type":"mc","prompt":"¿Cómo se dice seis?","options":["Enam","Tujuh","Delapan"],"answer":0,"explanation":"Enam significa seis."},
                                {"vocabId":"v106","type":"translate_es_id","prompt":"Traduce: siete","answer":"Tujuh","explanation":"Tujuh significa siete."},
                                {"vocabId":"v107","type":"listen","prompt":"Escucha y escribe el número","answer":"Delapan","explanation":"Delapan significa ocho."}
                            ]
                        },
                        {
                            id: 'a1_u5',
                            title: 'Unidad 5: Familia y personas',
                            desc: 'Hablar de la familia y describir quién es alguien.',
                            grammar: '“Ini” significa “esto/este/esta” y puede introducir a una persona u objeto. “Ini keluarga saya” significa “Esta es mi familia”.',
                            vocab: [
                                { id: 'v20', idn: 'Keluarga', esp: 'Familia', ex: 'Ini keluarga saya.', exEsp: 'Esta es mi familia.' },
                                { id: 'v21', idn: 'Ibu', esp: 'Madre', ex: 'Ini ibu saya.', exEsp: 'Esta es mi madre.' },
                                { id: 'v22', idn: 'Ayah', esp: 'Padre', ex: 'Ini ayah saya.', exEsp: 'Este es mi padre.' },
                                { id: 'v23', idn: 'Anak', esp: 'Niño/a; hijo/a', ex: 'Dia anak saya.', exEsp: 'Él/ella es mi hijo/a.' },
                                { id: 'v53', idn: 'Teman', esp: 'Amigo/a', ex: 'Dia teman saya.', exEsp: 'Él/ella es mi amigo/a.' },
                                {"id":"v111","idn":"Adik","esp":"Hermano/a menor","ex":"Adik saya di sini.","exEsp":"Mi hermano o hermana menor está aquí."}
                            ],
                            exercises: [
                                {
                                    "vocabId": "v20",
                                    "type": "mc",
                                    "prompt": "¿Qué significa keluarga?",
                                    "options": [
                                        "Familia",
                                        "Amigo",
                                        "Padre",
                                        "Madre"
                                    ],
                                    "answer": 0,
                                    "explanation": "Keluarga significa familia."
                                },
                                {
                                    "vocabId": "v21",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: madre",
                                    "answer": "Ibu",
                                    "explanation": "Ibu significa madre."
                                },
                                {
                                    "vocabId": "v22",
                                    "type": "mc",
                                    "prompt": "¿Qué palabra significa padre?",
                                    "options": [
                                        "Anak",
                                        "Ayah",
                                        "Teman",
                                        "Ibu"
                                    ],
                                    "answer": 1,
                                    "explanation": "Ayah significa padre."
                                },
                                {
                                    "vocabId": "v20",
                                    "type": "order",
                                    "prompt": "Ordena: Esta es mi familia",
                                    "words": [
                                        "saya",
                                        "Ini",
                                        "keluarga"
                                    ],
                                    "correctOrder": [
                                        "Ini",
                                        "keluarga",
                                        "saya"
                                    ],
                                    "explanation": "Ini keluarga saya significa Esta es mi familia."
                                },
                                {
                                    "vocabId": "v53",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: amigo o amiga",
                                    "answer": "Teman",
                                    "explanation": "Teman significa amigo o amiga."
                                },
                                {
                                    "vocabId": "v20",
                                    "type": "mc",
                                    "prompt": "Escucha la frase y elige su significado",
                                    "audioText": "Ini keluarga saya",
                                    "options": ["Esta es mi familia", "Esta es mi madre", "Él es mi amigo"],
                                    "answer": 0,
                                    "explanation": "Ini keluarga saya significa «Esta es mi familia»."
                                },
                                {
                                    "vocabId": "v21",
                                    "type": "mc",
                                    "prompt": "Completa: ___ ibu saya (Esta es mi madre)",
                                    "options": [
                                        "Ini",
                                        "Dia",
                                        "Teman",
                                        "Anak"
                                    ],
                                    "answer": 0,
                                    "explanation": "Ini ibu saya significa «Esta es mi madre»."
                                },
                                {
                                    "vocabId": "v22",
                                    "type": "mc",
                                    "prompt": "Escucha la frase y elige su significado",
                                    "audioText": "Ini ayah saya",
                                    "options": ["Esta es mi madre", "Este es mi padre", "Este es mi hermano menor"],
                                    "answer": 1,
                                    "explanation": "Ini ayah saya significa «Este es mi padre»."
                                },
                                {
                                    "vocabId": "v23",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: Él es mi hijo",
                                    "answer": "Dia anak saya",
                                    "explanation": "Dia anak saya significa Él es mi hijo."
                                },
                                {
                                    "vocabId": "v53",
                                    "type": "order",
                                    "prompt": "Ordena: Él es mi amigo",
                                    "words": [
                                        "saya",
                                        "Dia",
                                        "teman"
                                    ],
                                    "correctOrder": [
                                        "Dia",
                                        "teman",
                                        "saya"
                                    ],
                                    "explanation": "Dia teman saya significa Él o ella es mi amigo."
                                },
                                {
                                    "vocabId": "v20",
                                    "type": "mc",
                                    "prompt": "Elige la frase que significa «Esta es mi familia»",
                                    "options": [
                                        "Ini keluarga saya",
                                        "Ayah saya bekerja",
                                        "Teman saya di sini",
                                        "Ini ibu saya"
                                    ],
                                    "answer": 0,
                                    "explanation": "Ini keluarga saya presenta a la familia."
                                },
                                {
                                    "vocabId": "v21",
                                    "type": "listen",
                                    "prompt": "Escribe lo que escuchas",
                                    "answer": "Ini ibu saya",
                                    "explanation": "La frase describe a la madre."
                                },
                                {
                                    "vocabId": "v22",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: Este es mi padre",
                                    "answer": "Ini ayah saya",
                                    "explanation": "Ini ayah saya significa Este es mi padre."
                                },
                                { vocabId: 'v20', type: 'write', prompt: "Escribe una frase sobre una persona de tu familia.", hint: "Usa una palabra de familia que hayas aprendido.", modelAnswer: "Ini ibu saya.", explanation: "Ini ibu saya significa «Esta es mi madre». Puedes cambiar ibu por otra palabra de familia." },
                                {"vocabId":"v21","type":"mc","prompt":"¿Qué significa ibu?","options":["Madre / señora","Padre","Hermano menor"],"answer":0,"explanation":"Ibu significa madre y también es un tratamiento respetuoso."},
                                {"vocabId":"v22","type":"translate_es_id","prompt":"Traduce: padre","answer":"Ayah","explanation":"Ayah significa padre."},
                                {"vocabId":"v111","type":"write","prompt":"Escribe una frase sobre tu familia.","hint":"Intenta construir una frase nueva con el vocabulario de la unidad.","modelAnswer":"Ini ibu saya.","explanation":"Puedes usar ibu, ayah o adik."}
                            ]
                        },
                        {
                            id: 'a1_u6',
                            title: 'Unidad 6: Comida y bebida',
                            desc: 'Nombrar alimentos, pedir agua y usar expresiones de cortesía.',
                            grammar: '“Saya mau ...” significa “Quiero ...” y sirve como petición básica. “Tolong” se usa para pedir ayuda o pedirle a alguien que haga algo; no equivale mecánicamente a “por favor” en todas las peticiones. La cortesía depende del contexto.',
                            vocab: [
                                { id: 'v46', idn: 'Makan', esp: 'Comer', ex: 'Saya makan nasi.', exEsp: 'Como arroz.' },
                                { id: 'v47', idn: 'Minum', esp: 'Beber', ex: 'Saya minum air.', exEsp: 'Bebo agua.' },
                                { id: 'v48', idn: 'Air', esp: 'Agua', ex: 'Saya mau air.', exEsp: 'Quiero agua.' },
                                { id: 'v49', idn: 'Nasi', esp: 'Arroz cocido', ex: 'Saya makan nasi.', exEsp: 'Como arroz.' },
                                { id: 'v29', idn: 'Tolong', esp: 'Por favor (al pedir una acción) / ayudar', ex: 'Tolong!', exEsp: '¡Ayuda, por favor!' },
                                {"id":"v113","idn":"Teh","esp":"Té","ex":"Saya mau teh.","exEsp":"Quiero té."},
                                {"id":"v114","idn":"Kopi","esp":"Café","ex":"Dia minum kopi.","exEsp":"Él/ella bebe café."},
                                {"id":"v115","idn":"Berapa harganya?","esp":"¿Cuánto cuesta?","ex":"Berapa harganya?","exEsp":"¿Cuánto cuesta?"}
                            ],
                            exercises: [
                                {
                                    "vocabId": "v46",
                                    "type": "mc",
                                    "prompt": "¿Qué significa makan?",
                                    "options": [
                                        "Beber",
                                        "Comer",
                                        "Dormir",
                                        "Vivir"
                                    ],
                                    "answer": 1,
                                    "explanation": "Makan significa comer."
                                },
                                {
                                    "vocabId": "v47",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: beber",
                                    "answer": "Minum",
                                    "explanation": "Minum significa beber."
                                },
                                {
                                    "vocabId": "v48",
                                    "type": "mc",
                                    "prompt": "Completa: Saya minum ___ (Bebo agua)",
                                    "options": [
                                        "air",
                                        "nasi",
                                        "tidur",
                                        "rumah"
                                    ],
                                    "answer": 0,
                                    "explanation": "Air significa agua."
                                },
                                {
                                    "vocabId": "v49",
                                    "type": "order",
                                    "prompt": "Ordena: Como arroz",
                                    "words": [
                                        "nasi",
                                        "Saya",
                                        "makan"
                                    ],
                                    "correctOrder": [
                                        "Saya",
                                        "makan",
                                        "nasi"
                                    ],
                                    "explanation": "Saya makan nasi significa Como arroz."
                                },
                                {
                                    "vocabId": "v29",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: por favor, para pedir algo",
                                    "answer": "Tolong",
                                    "explanation": "Tolong se usa al pedir ayuda o formular una petición."
                                },
                                {
                                    "vocabId": "v46",
                                    "type": "mc",
                                    "prompt": "Escucha la frase y elige su significado",
                                    "audioText": "Saya makan nasi",
                                    "options": ["Bebo agua", "Como arroz", "Quiero té"],
                                    "answer": 1,
                                    "explanation": "Saya makan nasi significa «Como arroz»."
                                },
                                {
                                    "vocabId": "v47",
                                    "type": "mc",
                                    "prompt": "¿Qué verbo se usa para beber agua?",
                                    "options": [
                                        "Minum",
                                        "Makan",
                                        "Tinggal",
                                        "Tidur"
                                    ],
                                    "answer": 0,
                                    "explanation": "Minum es el verbo beber."
                                },
                                {
                                    "vocabId": "v48",
                                    "type": "mc",
                                    "prompt": "Escucha la frase y elige su significado",
                                    "audioText": "Saya mau air",
                                    "options": ["Quiero agua", "Como arroz", "Él bebe café"],
                                    "answer": 0,
                                    "explanation": "Saya mau air significa «Quiero agua»."
                                },
                                {
                                    "vocabId": "v49",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: arroz cocido",
                                    "answer": "Nasi",
                                    "explanation": "Nasi se refiere al arroz cocido."
                                },
                                {
                                    "vocabId": "v29",
                                    "type": "order",
                                    "prompt": "Ordena una petición: Por favor, quiero agua",
                                    "words": ["air", "mau", "saya", "Tolong"],
                                    "correctOrder": ["Tolong", "saya", "mau", "air"],
                                    "explanation": "Tolong, saya mau air significa «Quiero agua, por favor»."
                                },
                                {
                                    "vocabId": "v46",
                                    "type": "mc",
                                    "prompt": "Completa: Saya ___ nasi (Como arroz)",
                                    "options": [
                                        "makan",
                                        "minum",
                                        "rumah",
                                        "ibu"
                                    ],
                                    "answer": 0,
                                    "explanation": "Makan va con la acción de comer."
                                },
                                {
                                    "vocabId": "v47",
                                    "type": "mc",
                                    "prompt": "Escucha la frase y elige su significado",
                                    "audioText": "Saya minum air",
                                    "options": ["Quiero agua", "Bebo agua", "Como arroz"],
                                    "answer": 1,
                                    "explanation": "Saya minum air significa «Bebo agua»."
                                },
                                {
                                    "vocabId": "v48",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: agua",
                                    "answer": "Air",
                                    "explanation": "Air significa agua."
                                },
                                { vocabId: 'v46', type: 'write', prompt: "Escribe qué comida o bebida te gustaría mencionar.", hint: "Combina saya makan o saya minum con vocabulario de comida.", modelAnswer: "Saya makan nasi.", explanation: "La frase significa «Yo como arroz cocido». Hay otras respuestas posibles." },
                                {"vocabId":"v113","type":"mc","prompt":"¿Qué significa teh?","options":["Té","Café","Agua"],"answer":0,"explanation":"Teh significa té."},
                                {"vocabId":"v114","type":"translate_es_id","prompt":"Traduce: café","answer":"Kopi","explanation":"Kopi significa café."},
                                {"vocabId":"v115","type":"mc","prompt":"Escucha la pregunta y elige su significado","audioText":"Berapa harganya?","options":["¿Dónde está el agua?","¿Cuánto cuesta?","¿Cómo te llamas?"],"answer":1,"explanation":"Berapa harganya? significa «¿Cuánto cuesta?»"}
                            ]
                        },
                        {
                            id: 'a1_u7',
                            title: 'Unidad 7: Lugares y ubicación',
                            desc: 'Decir dónde estás, preguntar por lugares y usar “di”.',
                            grammar: 'La preposición “di” indica ubicación y va delante del lugar: “Saya di rumah” (Estoy en casa). No la confundas con el prefijo pasivo “di-”, que se escribe unido al verbo.',
                            vocab: [
                                { id: 'v30', idn: 'Rumah', esp: 'Casa', ex: 'Saya di rumah.', exEsp: 'Estoy en casa.' },
                                { id: 'v31', idn: 'Sekolah', esp: 'Escuela', ex: 'Dia di sekolah.', exEsp: 'Él/ella está en la escuela.' },
                                { id: 'v32', idn: 'Di mana', esp: 'Dónde', ex: 'Di mana sekolah?', exEsp: '¿Dónde está la escuela?' },
                                { id: 'v101', idn: 'Kota', esp: 'Ciudad', ex: 'Saya tinggal di kota.', exEsp: 'Vivo en la ciudad.' },
                                { id: 'v34', idn: 'Di sini', esp: 'Aquí', ex: 'Saya di sini.', exEsp: 'Estoy aquí.' },
                                {"id":"v119","idn":"Dekat","esp":"Cerca","ex":"Pasar dekat rumah.","exEsp":"El mercado está cerca de casa."}
                            ],
                            exercises: [
                                {
                                    "vocabId": "v30",
                                    "type": "mc",
                                    "prompt": "¿Qué significa rumah?",
                                    "options": [
                                        "Casa",
                                        "Ciudad",
                                        "Escuela",
                                        "Mercado"
                                    ],
                                    "answer": 0,
                                    "explanation": "Rumah significa casa."
                                },
                                {
                                    "vocabId": "v31",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: escuela",
                                    "answer": "Sekolah",
                                    "explanation": "Sekolah significa escuela."
                                },
                                {
                                    "vocabId": "v32",
                                    "type": "order",
                                    "prompt": "Ordena: ¿Dónde está la escuela?",
                                    "words": [
                                        "sekolah",
                                        "Di",
                                        "mana"
                                    ],
                                    "correctOrder": [
                                        "Di",
                                        "mana",
                                        "sekolah"
                                    ],
                                    "explanation": "Di mana sekolah pregunta dónde está la escuela."
                                },
                                {
                                    "vocabId": "v101",
                                    "type": "mc",
                                    "prompt": "Completa: Saya tinggal di ___ (Vivo en la ciudad)",
                                    "options": [
                                        "kota",
                                        "rumah",
                                        "sekolah",
                                        "sini"
                                    ],
                                    "answer": 0,
                                    "explanation": "Kota significa ciudad."
                                },
                                {
                                    "vocabId": "v34",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: aquí",
                                    "answer": "Di sini",
                                    "explanation": "Di sini significa aquí."
                                },
                                {
                                    "vocabId": "v30",
                                    "type": "mc",
                                    "prompt": "Escucha la frase y elige su significado",
                                    "audioText": "Saya di rumah",
                                    "options": ["Estoy en casa", "Estoy en la escuela", "Vivo en la ciudad"],
                                    "answer": 0,
                                    "explanation": "Saya di rumah significa «Estoy en casa»."
                                },
                                {
                                    "vocabId": "v31",
                                    "type": "mc",
                                    "prompt": "Completa: Dia di ___ (Él está en la escuela)",
                                    "options": [
                                        "sekolah",
                                        "rumah",
                                        "kota",
                                        "sini"
                                    ],
                                    "answer": 0,
                                    "explanation": "Dia di sekolah significa Él o ella está en la escuela."
                                },
                                {
                                    "vocabId": "v32",
                                    "type": "mc",
                                    "prompt": "Escucha la pregunta y elige su significado",
                                    "audioText": "Di mana sekolah?",
                                    "options": ["¿Dónde está la escuela?", "¿Dónde está mi casa?", "¿Quién está en la ciudad?"],
                                    "answer": 0,
                                    "explanation": "Di mana sekolah? pregunta dónde está la escuela."
                                },
                                {
                                    "vocabId": "v101",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: Vivo en la ciudad",
                                    "answer": "Saya tinggal di kota",
                                    "explanation": "Kota significa ciudad."
                                },
                                {
                                    "vocabId": "v34",
                                    "type": "order",
                                    "prompt": "Ordena: Estoy aquí",
                                    "words": [
                                        "sini",
                                        "di",
                                        "Saya"
                                    ],
                                    "correctOrder": [
                                        "Saya",
                                        "di",
                                        "sini"
                                    ],
                                    "explanation": "Saya di sini significa Estoy aquí."
                                },
                                {
                                    "vocabId": "v30",
                                    "type": "mc",
                                    "prompt": "Elige la frase que significa Estoy en casa",
                                    "options": [
                                        "Saya di rumah",
                                        "Saya di sekolah",
                                        "Saya di sini",
                                        "Saya tinggal di kota"
                                    ],
                                    "answer": 0,
                                    "explanation": "Rumah significa casa."
                                },
                                {
                                    "vocabId": "v31",
                                    "type": "listen",
                                    "prompt": "Escribe lo que escuchas",
                                    "answer": "Dia di sekolah",
                                    "explanation": "Dia di sekolah indica que alguien está en la escuela."
                                },
                                {
                                    "vocabId": "v32",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: ¿Dónde está la escuela?",
                                    "answer": "Di mana sekolah",
                                    "explanation": "Di mana sekolah pregunta dónde está la escuela."
                                },
                                { vocabId: 'v30', type: 'write', prompt: "Escribe una frase que indique dónde está algo.", hint: "Intenta usar di y una palabra de lugar de la unidad.", modelAnswer: "Saya di rumah.", explanation: "La frase significa «Estoy en casa». Adapta la frase al vocabulario que conozcas." },
                                {"vocabId":"v30","type":"mc","prompt":"¿Qué significa rumah?","options":["Casa","Escuela","Estación"],"answer":0,"explanation":"Rumah significa casa."},
                                {"vocabId":"v31","type":"translate_es_id","prompt":"Traduce: escuela","answer":"Sekolah","explanation":"Sekolah significa escuela."},
                                {"vocabId":"v119","type":"write","prompt":"Describe dónde está un lugar.","hint":"Intenta construir una frase nueva con el vocabulario de la unidad.","modelAnswer":"Sekolah dekat rumah saya.","explanation":"Usa dekat (cerca) o jauh (lejos)."}
                            ]
                        },
                        {
                            id: 'a1_u8',
                            title: 'Unidad 8: Tiempo, rutina e integración',
                            desc: 'Hablar de actividades cotidianas y expresar cuándo ocurren.',
                            grammar: 'Los adverbios de tiempo suelen colocarse al inicio o al final de la oración. “Setiap hari” significa “todos los días”.',
                            vocab: [
                                { id: 'v35', idn: 'Hari', esp: 'Día', ex: 'Hari ini saya belajar.', exEsp: 'Hoy estudio.' },
                                { id: 'v36', idn: 'Hari ini', esp: 'Hoy / este día', ex: 'Hari ini saya belajar.', exEsp: 'Hoy estudio.' },
                                { id: 'v37', idn: 'Belajar', esp: 'Estudiar / aprender', ex: 'Saya belajar bahasa Indonesia.', exEsp: 'Estudio indonesio.' },
                                { id: 'v38', idn: 'Bekerja', esp: 'Trabajar', ex: 'Ayah saya bekerja.', exEsp: 'Mi padre trabaja.' },
                                { id: 'v50', idn: 'Tidur', esp: 'Dormir', ex: 'Saya tidur di malam hari.', exEsp: 'Duermo por la noche.' },
                                { id: 'v44', idn: 'Setiap hari', esp: 'Todos los días', ex: 'Saya belajar setiap hari.', exEsp: 'Estudio todos los días.' },
                                {"id":"v122","idn":"Besok","esp":"Mañana","ex":"Besok saya bekerja.","exEsp":"Mañana trabajo."},

                            ],
                            exercises: [
                                {
                                    "vocabId": "v35",
                                    "type": "mc",
                                    "prompt": "¿Qué significa hari?",
                                    "options": [
                                        "Día",
                                        "Agua",
                                        "Dormir",
                                        "Escuela"
                                    ],
                                    "answer": 0,
                                    "explanation": "Hari significa día."
                                },
                                {
                                    "vocabId": "v36",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: hoy",
                                    "answer": "Hari ini",
                                    "explanation": "Hari ini significa hoy."
                                },
                                {
                                    "vocabId": "v37",
                                    "type": "mc",
                                    "prompt": "¿Qué significa belajar?",
                                    "options": [
                                        "Estudiar o aprender",
                                        "Comer",
                                        "Dormir",
                                        "Beber"
                                    ],
                                    "answer": 0,
                                    "explanation": "Belajar significa estudiar o aprender."
                                },
                                {
                                    "vocabId": "v38",
                                    "type": "order",
                                    "prompt": "Ordena: Mi padre trabaja",
                                    "words": [
                                        "bekerja",
                                        "saya",
                                        "Ayah"
                                    ],
                                    "correctOrder": [
                                        "Ayah",
                                        "saya",
                                        "bekerja"
                                    ],
                                    "explanation": "Ayah saya bekerja significa «Mi padre trabaja»."
                                },
                                {
                                    "vocabId": "v50",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: dormir",
                                    "answer": "Tidur",
                                    "explanation": "Tidur significa dormir."
                                },
                                {
                                    "vocabId": "v44",
                                    "type": "mc",
                                    "prompt": "Escucha la frase y elige su significado",
                                    "audioText": "Saya belajar setiap hari",
                                    "options": ["Estudio todos los días", "Trabajo todos los días", "Duermo hoy"],
                                    "answer": 0,
                                    "explanation": "Saya belajar setiap hari significa «Estudio todos los días»."
                                },
                                {
                                    "vocabId": "v35",
                                    "type": "mc",
                                    "prompt": "Escucha la frase y elige su significado",
                                    "audioText": "Hari ini saya belajar",
                                    "options": ["Hoy estudio", "Mañana trabajo", "Todos los días duermo"],
                                    "answer": 0,
                                    "explanation": "Hari ini saya belajar significa «Hoy estudio»."
                                },
                                {
                                    "vocabId": "v36",
                                    "type": "mc",
                                    "prompt": "Completa: ___ saya belajar (Hoy estudio)",
                                    "options": [
                                        "Hari ini",
                                        "Hari Senin",
                                        "Hari Minggu",
                                        "Hari libur"
                                    ],
                                    "answer": 0,
                                    "explanation": "Hari ini se usa para hablar de hoy."
                                },
                                {
                                    "vocabId": "v37",
                                    "type": "listen",
                                    "prompt": "Escribe lo que escuchas",
                                    "answer": "Saya belajar bahasa Indonesia",
                                    "explanation": "La frase significa Estudio indonesio."
                                },
                                {
                                    "vocabId": "v38",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce: trabaja",
                                    "answer": "Bekerja",
                                    "explanation": "Bekerja significa trabajar."
                                },
                                {
                                    "vocabId": "v50",
                                    "type": "mc",
                                    "prompt": "¿Qué verbo significa dormir?",
                                    "options": [
                                        "Tidur",
                                        "Belajar",
                                        "Bekerja",
                                        "Makan"
                                    ],
                                    "answer": 0,
                                    "explanation": "Tidur significa dormir."
                                },
                                {
                                    "vocabId": "v44",
                                    "type": "order",
                                    "prompt": "Ordena: Estudio todos los días",
                                    "words": [
                                        "hari",
                                        "Saya",
                                        "setiap",
                                        "belajar"
                                    ],
                                    "correctOrder": [
                                        "Saya",
                                        "belajar",
                                        "setiap",
                                        "hari"
                                    ],
                                    "explanation": "Saya belajar setiap hari expresa una rutina."
                                },
                                { vocabId: 'v35', type: 'write', prompt: "Escribe una frase breve sobre tu rutina diaria.", hint: "Usa un día o una acción cotidiana que hayas aprendido.", modelAnswer: "Saya makan pagi.", explanation: "Saya makan pagi significa «Desayuno»; makan es comer y pagi es mañana." },
                                {"vocabId":"v36","type":"mc","prompt":"¿Qué significa hari ini?","options":["Hoy","Mañana","Ayer"],"answer":0,"explanation":"Hari ini significa hoy."},
                                {"vocabId":"v122","type":"translate_es_id","prompt":"Traduce: mañana","answer":"Besok","explanation":"Besok significa mañana."},
                                {"vocabId":"v44","type":"write","prompt":"Escribe dos frases sobre tu rutina.","hint":"Intenta construir una frase nueva con el vocabulario de la unidad.","modelAnswer":"Hari ini saya belajar. Saya minum air setiap hari.","explanation":"Usa hari ini, besok o setiap hari."},
                                { vocabId: 'v44', type: 'write', prompt: 'Tarea integradora: preséntate, pide una bebida, pregunta el precio y describe tu rutina.', hint: 'Combina presentación, cortesía, una pregunta y una expresión temporal.', modelAnswer: 'Nama saya Ana. Saya dari Nikaragua. Saya mau teh, tolong. Berapa harganya? Saya belajar setiap hari.', explanation: 'La respuesta modelo combina varios objetivos A1; puedes usar tus propios datos y otras frases correctas.' }
                            ]
                        }
                        ,
                        {
                            id: 'a1_u9',
                            title: 'Unidad 9: Números del 11 al 100',
                            desc: 'Contar más allá de diez y reconocer números frecuentes en cantidades sencillas.',
                            grammar: 'Del 11 al 19 se usan formas como sebelas, dua belas, tiga belas y empat belas. Para las decenas se combina el número con puluh: dua puluh = 20, tiga puluh = 30, empat puluh = 40, lima puluh = 50, enam puluh = 60, tujuh puluh = 70, delapan puluh = 80 y sembilan puluh = 90. Para formar números compuestos del 21 al 99, coloca la unidad después de la decena: dua puluh satu = 21 y empat puluh tujuh = 47. Seratus significa 100.',
                            vocab: [
                                { id: 'v124', idn: 'Sebelas', esp: 'Once', ex: 'Sebelas teman.', exEsp: 'Once amigos.' },
                                { id: 'v125', idn: 'Dua belas', esp: 'Doce', ex: 'Dua belas buku.', exEsp: 'Doce libros.' },
                                { id: 'v126', idn: 'Tiga belas', esp: 'Trece', ex: 'Tiga belas tahun.', exEsp: 'Trece años.' },
                                { id: 'v127', idn: 'Empat belas', esp: 'Catorce', ex: 'Empat belas teman.', exEsp: 'Catorce amigos.' },
                                { id: 'v128', idn: 'Lima belas', esp: 'Quince', ex: 'Lima belas buku.', exEsp: 'Quince libros.' },
                                { id: 'v129', idn: 'Enam belas', esp: 'Dieciséis', ex: 'Enam belas tahun.', exEsp: 'Dieciséis años.' },
                                { id: 'v130', idn: 'Tujuh belas', esp: 'Diecisiete', ex: 'Tujuh belas buku.', exEsp: 'Diecisiete libros.' },
                                { id: 'v131', idn: 'Delapan belas', esp: 'Dieciocho', ex: 'Delapan belas teman.', exEsp: 'Dieciocho amigos.' },
                                { id: 'v132', idn: 'Sembilan belas', esp: 'Diecinueve', ex: 'Sembilan belas tahun.', exEsp: 'Diecinueve años.' },
                                { id: 'v133', idn: 'Dua puluh', esp: 'Veinte', ex: 'Dua puluh buku.', exEsp: 'Veinte libros.' },
                                { id: 'v134', idn: 'Tiga puluh', esp: 'Treinta', ex: 'Tiga puluh tahun.', exEsp: 'Treinta años.' },
                                { id: 'v135', idn: 'Seratus', esp: 'Cien', ex: 'Seratus buku.', exEsp: 'Cien libros.' },
                                { id: 'v158', idn: 'Puluh', esp: 'Decenas; elemento para formar 20, 30, etc.', ex: 'Dua puluh.', exEsp: 'Veinte.' },
                                { id: 'v271', idn: 'Dua puluh satu', esp: 'Veintiuno', ex: 'Dua puluh satu buku.', exEsp: 'Veintiún libros.' },
                                { id: 'v272', idn: 'Dua puluh lima', esp: 'Veinticinco', ex: 'Dua puluh lima teman.', exEsp: 'Veinticinco amigos.' },
                                { id: 'v273', idn: 'Tiga puluh dua', esp: 'Treinta y dos', ex: 'Tiga puluh dua buku.', exEsp: 'Treinta y dos libros.' },
                                { id: 'v274', idn: 'Empat puluh tujuh', esp: 'Cuarenta y siete', ex: 'Empat puluh tujuh teman.', exEsp: 'Cuarenta y siete amigos.' },
                                { id: 'v275', idn: 'Lima puluh delapan', esp: 'Cincuenta y ocho', ex: 'Lima puluh delapan buku.', exEsp: 'Cincuenta y ocho libros.' },
                                { id: 'v276', idn: 'Enam puluh empat', esp: 'Sesenta y cuatro', ex: 'Enam puluh empat teman.', exEsp: 'Sesenta y cuatro amigos.' },
                                { id: 'v277', idn: 'Tujuh puluh enam', esp: 'Setenta y seis', ex: 'Tujuh puluh enam buku.', exEsp: 'Setenta y seis libros.' },
                                { id: 'v278', idn: 'Delapan puluh sembilan', esp: 'Ochenta y nueve', ex: 'Delapan puluh sembilan teman.', exEsp: 'Ochenta y nueve amigos.' },
                                { id: 'v279', idn: 'Sembilan puluh sembilan', esp: 'Noventa y nueve', ex: 'Sembilan puluh sembilan buku.', exEsp: 'Noventa y nueve libros.' }
                            ],
                            exercises: [
                                { vocabId: 'v124', type: 'mc', prompt: '¿Qué número significa sebelas?', options: ['11', '12', '20'], answer: 0, explanation: 'Sebelas significa once.' },
                                { vocabId: 'v125', type: 'translate_es_id', prompt: 'Traduce al indonesio: doce', answer: 'Dua belas', explanation: 'Dua belas significa doce.' },
                                { vocabId: 'v126', type: 'mc', prompt: 'Escucha el número y elige su valor', audioText: 'Tiga belas', options: ['3', '13', '30'], answer: 1, explanation: 'Tiga belas significa trece.' },
                                { vocabId: 'v127', type: 'mc', prompt: '¿Qué significa empat belas?', options: ['Cuatro', 'Catorce', 'Cuarenta'], answer: 1, explanation: 'Empat belas significa catorce.' },
                                { vocabId: 'v128', type: 'translate_es_id', prompt: 'Traduce: quince', answer: 'Lima belas', explanation: 'Lima belas significa quince.' },
                                { vocabId: 'v129', type: 'order', prompt: 'Ordena las palabras para formar “dieciséis libros”', words: ['buku', 'Enam', 'belas'], correctOrder: ['Enam', 'belas', 'buku'], explanation: 'El número va antes del sustantivo: Enam belas buku.' },
                                { vocabId: 'v130', type: 'mc', prompt: 'Tujuh belas equivale a…', options: ['7', '17', '70'], answer: 1, explanation: 'Tujuh belas significa diecisiete.' },
                                { vocabId: 'v131', type: 'translate_es_id', prompt: 'Traduce: dieciocho', answer: 'Delapan belas', explanation: 'Delapan belas significa dieciocho.' },
                                { vocabId: 'v132', type: 'mc', prompt: 'Escucha el número y elige su valor', audioText: 'Sembilan belas', options: ['9', '19', '90'], answer: 1, explanation: 'Sembilan belas significa diecinueve.' },
                                { vocabId: 'v133', type: 'mc', prompt: '¿Qué número significa dua puluh?', options: ['12', '20', '30'], answer: 1, explanation: 'Dua puluh significa veinte.' },
                                { vocabId: 'v134', type: 'translate_es_id', prompt: 'Traduce: treinta', answer: 'Tiga puluh', explanation: 'Tiga puluh significa treinta.' },
                                { vocabId: 'v135', type: 'mc', prompt: 'Seratus significa…', options: ['100', '13', '30'], answer: 0, explanation: 'Seratus significa cien.' },
                                { vocabId: 'v124', type: 'order', prompt: 'Ordena para decir “once amigos”', words: ['teman', 'Sebelas'], correctOrder: ['Sebelas', 'teman'], explanation: 'En una cantidad simple, el número precede al sustantivo.' },
                                { vocabId: 'v133', type: 'mc', prompt: 'Escucha el número y elige su valor', audioText: 'Dua puluh', options: ['12', '20', '22'], answer: 1, explanation: 'Dua puluh significa veinte.' },
                                { vocabId: 'v158', type: 'mc', prompt: '¿Cómo se dice cuarenta?', options: ['Empat puluh', 'Empat belas', 'Empat tahun'], answer: 0, explanation: 'Empat puluh significa cuarenta; puluh forma decenas.' },
                                { vocabId: 'v158', type: 'translate_es_id', prompt: 'Traduce: setenta', answer: 'Tujuh puluh', explanation: 'Tujuh puluh significa setenta.' },
                                { vocabId: 'v158', type: 'mc', prompt: 'Sembilan puluh significa…', options: ['19', '90', '100'], answer: 1, explanation: 'Sembilan puluh significa noventa.' },
                                { vocabId: 'v135', type: 'write', prompt: 'Escribe en indonesio un número entre 11 y 100 que hayas aprendido.', hint: 'Puedes elegir doce, veinte, cuarenta, setenta o cien.', modelAnswer: 'Dua puluh.', explanation: 'Hay varias respuestas correctas; revisa que la forma del número sea correcta.' },
                                { vocabId: 'v271', type: 'mc', prompt: 'Dua puluh satu equivale a…', options: ['21', '12', '31'], answer: 0, explanation: 'Dua puluh satu significa veintiuno: dos decenas y uno.' },
                                { vocabId: 'v272', type: 'translate_es_id', prompt: 'Traduce al indonesio: veinticinco', answer: 'Dua puluh lima', explanation: 'Para formar veinticinco se dice dua puluh lima.' },
                                { vocabId: 'v274', type: 'order', prompt: 'Ordena para decir “cuarenta y siete”', words: ['tujuh', 'Empat', 'puluh'], correctOrder: ['Empat', 'puluh', 'tujuh'], explanation: 'En los números compuestos, la unidad va después de la decena: empat puluh tujuh.' },
                                { vocabId: 'v278', type: 'mc', prompt: 'Delapan puluh sembilan equivale a…', options: ['19', '80', '89'], answer: 2, explanation: 'Delapan puluh sembilan significa ochenta y nueve.' }
                            ]
                        },
                        {
                            id: 'a1_u10',
                            title: 'Unidad 10: Dinero y precios',
                            desc: 'Preguntar cuánto cuesta algo, reconocer precios en rupias y usar expresiones básicas de compra.',
                            grammar: 'Para preguntar el precio, usa “Berapa harganya?” (¿Cuánto cuesta?). La moneda de Indonesia es la rupia (rupiah). Ribu significa mil; en precios cotidianos se omite a menudo la palabra rupiah cuando el contexto es claro.',
                            vocab: [
                                { id: 'v136', idn: 'Uang', esp: 'Dinero', ex: 'Ini uang.', exEsp: 'Esto es dinero.' },
                                { id: 'v137', idn: 'Harga', esp: 'Precio', ex: 'Harga buku.', exEsp: 'El precio del libro.' },
                                { id: 'v138', idn: 'Rupiah', esp: 'Rupia indonesia', ex: 'Lima ribu rupiah.', exEsp: 'Cinco mil rupias.' },
                                { id: 'v139', idn: 'Ribu', esp: 'Mil (en cantidades)', ex: 'Lima ribu rupiah.', exEsp: 'Cinco mil rupias.' },
                                { id: 'v140', idn: 'Murah', esp: 'Barato/a', ex: 'Harga ini murah.', exEsp: 'Este precio es barato.' },
                                { id: 'v141', idn: 'Mahal', esp: 'Caro/a', ex: 'Harganya mahal.', exEsp: 'Es caro.' },
                                { id: 'v142', idn: 'Beli', esp: 'Comprar', ex: 'Saya beli buku.', exEsp: 'Compro un libro.' },
                                { id: 'v143', idn: 'Bayar', esp: 'Pagar', ex: 'Saya bayar.', exEsp: 'Pago.' },
                                { id: 'v144', idn: 'Kembalian', esp: 'Cambio (dinero que devuelven)', ex: 'Ini kembaliannya.', exEsp: 'Aquí tiene su cambio.' },
                                { id: 'v145', idn: 'Tunai', esp: 'En efectivo', ex: 'Saya bayar tunai.', exEsp: 'Pago en efectivo.' },
                                { id: 'v18', idn: 'Berapa', esp: 'Cuánto / cuántos', ex: 'Berapa harganya?', exEsp: '¿Cuánto cuesta?' },
                                { id: 'v115', idn: 'Berapa harganya?', esp: '¿Cuánto cuesta?', ex: 'Berapa harganya?', exEsp: '¿Cuánto cuesta?' },
                                { id: 'v113', idn: 'Teh', esp: 'Té', ex: 'Saya beli teh.', exEsp: 'Compro té.' }
                            ],
                            exercises: [
                                { vocabId: 'v136', type: 'mc', prompt: '¿Qué significa uang?', options: ['Dinero', 'Precio', 'Cambio'], answer: 0, explanation: 'Uang significa dinero.' },
                                { vocabId: 'v137', type: 'translate_es_id', prompt: 'Traduce: precio', answer: 'Harga', explanation: 'Harga significa precio.' },
                                { vocabId: 'v138', type: 'mc', prompt: 'Escucha la palabra y elige su significado', audioText: 'Rupiah', options: ['La moneda de Indonesia', 'El precio', 'El dinero en efectivo'], answer: 0, explanation: 'Rupiah es la moneda de Indonesia.' },
                                { vocabId: 'v139', type: 'mc', prompt: 'Lima ribu rupiah significa…', options: ['Cinco rupias', 'Cinco mil rupias', 'Cincuenta rupias'], answer: 1, explanation: 'Ribu significa mil.' },
                                { vocabId: 'v140', type: 'translate_es_id', prompt: 'Traduce: barato/a', answer: 'Murah', explanation: 'Murah significa barato o barata.' },
                                { vocabId: 'v141', type: 'mc', prompt: '¿Qué palabra significa caro/a?', options: ['Murah', 'Mahal', 'Tunai'], answer: 1, explanation: 'Mahal significa caro o cara.' },
                                { vocabId: 'v142', type: 'order', prompt: 'Ordena: Compro té', words: ['teh', 'beli', 'Saya'], correctOrder: ['Saya', 'beli', 'teh'], explanation: 'Saya beli teh significa compro té.' },
                                { vocabId: 'v143', type: 'translate_es_id', prompt: 'Traduce: pagar', answer: 'Bayar', explanation: 'Bayar significa pagar.' },
                                { vocabId: 'v144', type: 'mc', prompt: 'Kembalian es…', options: ['El precio', 'El cambio que devuelven', 'Dinero en efectivo'], answer: 1, explanation: 'Kembalian es el cambio que devuelve el vendedor.' },
                                { vocabId: 'v145', type: 'translate_es_id', prompt: 'Traduce: en efectivo', answer: 'Tunai', explanation: 'Tunai significa en efectivo.' },
                                { vocabId: 'v18', type: 'mc', prompt: '¿Qué significa berapa?', options: ['Cuánto', 'Caro', 'Dinero'], answer: 0, explanation: 'Berapa se usa para preguntar cantidades o precios.' },
                                { vocabId: 'v115', type: 'listen', prompt: 'Escucha y escribe la pregunta por el precio', answer: 'Berapa harganya?', explanation: 'Berapa harganya? significa ¿Cuánto cuesta?' },
                                { vocabId: 'v113', type: 'write', prompt: 'Escribe una pregunta para saber el precio de algo.', hint: 'Usa la expresión Berapa harganya?', modelAnswer: 'Berapa harganya?', explanation: 'Esta pregunta sirve para preguntar cuánto cuesta algo.' },
                                { vocabId: 'v140', type: 'order', prompt: 'Ordena: Es barato', words: ['murah', 'Harganya'], correctOrder: ['Harganya', 'murah'], explanation: 'Harganya murah significa es barato.' },
                                { vocabId: 'v142', type: 'write', prompt: 'Escribe una frase breve sobre comprar algo.', hint: 'Puedes usar Saya beli teh.', modelAnswer: 'Saya beli teh.', explanation: 'Usa beli para decir comprar; también son válidas otras frases correctas.' },
                                { vocabId: 'v115', type: 'write', prompt: 'Escribe un diálogo completo: pide té, pregunta el precio, recibe la respuesta y paga en efectivo.', hint: 'Usa Berapa harganya?, un precio con ribu/rupiah, Saya bayar tunai y Terima kasih.', modelAnswer: 'Cliente: Saya mau teh, tolong. Cliente: Berapa harganya? Vendedor: Dua puluh satu ribu rupiah. Cliente: Saya bayar tunai. Vendedor: Terima kasih.', explanation: 'El diálogo combina el pedido, la pregunta por el precio, una respuesta con número compuesto y el pago.' },
                                { vocabId: 'v144', type: 'write', prompt: 'Completa un diálogo de compra con precio, pago de diez mil rupias y devolución del cambio.', hint: 'Incluye lima ribu rupiah, Saya bayar sepuluh ribu rupiah e Ini kembaliannya.', modelAnswer: 'Vendedor: Harganya lima ribu rupiah. Cliente: Saya bayar sepuluh ribu rupiah. Vendedor: Ini kembaliannya, lima ribu rupiah. Cliente: Terima kasih.', explanation: 'El precio es cinco mil y el pago diez mil, por lo que corresponde devolver el cambio.' },
                                { vocabId: 'v113', type: 'write', prompt: 'Escribe otro diálogo breve para comprar té. Incluye una pregunta por el precio y una respuesta de treinta y dos mil rupias.', hint: 'Puedes usar Saya mau teh, tolong; Berapa harganya?; Tiga puluh dua ribu rupiah; Saya beli teh.', modelAnswer: 'Cliente: Saya mau teh, tolong. Cliente: Berapa harganya? Vendedor: Tiga puluh dua ribu rupiah. Cliente: Saya beli teh. Vendedor: Terima kasih.', explanation: 'Practica un segundo precio y las expresiones de compra ya presentadas.' }
                            ]
                        },
                        {
                            id: 'a1_u11',
                            title: 'Unidad 11: La hora y partes del día',
                            desc: 'Nombrar los momentos del día y preguntar o decir la hora con expresiones sencillas.',
                            grammar: 'Pagi es la mañana, siang el mediodía o primeras horas de la tarde, sore la tarde y malam la noche. Para expresar una actividad en un momento del día puedes usar pada + momento + hari: Saya belajar pada siang hari (estudio durante el día). Para decir la hora se usan jam o pukul. “Setengah delapan” significa las siete y media (media hora antes de las ocho), no las ocho y media.',
                            vocab: [
                                { id: 'v146', idn: 'Pagi', esp: 'Mañana (parte del día)', ex: 'Pagi ini saya belajar.', exEsp: 'Esta mañana estudio.' },
                                { id: 'v147', idn: 'Siang', esp: 'Mediodía / primeras horas de la tarde', ex: 'Saya belajar pada siang hari.', exEsp: 'Estudio durante el día.' },
                                { id: 'v148', idn: 'Sore', esp: 'Tarde (final de la tarde)', ex: 'Saya bekerja pada sore hari.', exEsp: 'Trabajo por la tarde.' },
                                { id: 'v149', idn: 'Malam', esp: 'Noche', ex: 'Saya tidur pada malam hari.', exEsp: 'Duermo por la noche.' },
                                { id: 'v150', idn: 'Jam', esp: 'Hora / reloj', ex: 'Jam tujuh.', exEsp: 'Las siete.' },
                                { id: 'v151', idn: 'Pukul', esp: 'A las (indica la hora)', ex: 'Pukul tujuh.', exEsp: 'A las siete.' },
                                { id: 'v152', idn: 'Menit', esp: 'Minuto', ex: 'Lima menit.', exEsp: 'Cinco minutos.' },
                                { id: 'v153', idn: 'Setengah', esp: 'Media / mitad', ex: 'Setengah delapan.', exEsp: 'Las siete y media.' },
                                { id: 'v154', idn: 'Sekarang', esp: 'Ahora', ex: 'Sekarang pukul tujuh.', exEsp: 'Ahora son las siete.' },
                                { id: 'v155', idn: 'Nanti', esp: 'Más tarde', ex: 'Saya belajar nanti.', exEsp: 'Estudio más tarde.' },
                                { id: 'v156', idn: 'Tepat', esp: 'En punto / exacto', ex: 'Jam tujuh tepat.', exEsp: 'Las siete en punto.' },
                                { id: 'v157', idn: 'Lewat', esp: 'Pasadas / después de', ex: 'Jam tujuh lewat lima menit.', exEsp: 'Las siete y cinco.' },
                                { id: 'v35', idn: 'Hari', esp: 'Día', ex: 'Hari ini saya belajar.', exEsp: 'Hoy estudio.' },
                                { id: 'v36', idn: 'Hari ini', esp: 'Hoy / este día', ex: 'Hari ini saya belajar.', exEsp: 'Hoy estudio.' },
                                { id: 'v122', idn: 'Besok', esp: 'Mañana', ex: 'Besok saya bekerja.', exEsp: 'Mañana trabajo.' }
                            ],
                            exercises: [
                                { vocabId: 'v146', type: 'mc', prompt: '¿Qué parte del día significa pagi?', options: ['Mañana', 'Noche', 'Mediodía'], answer: 0, explanation: 'Pagi es la mañana.' },
                                { vocabId: 'v147', type: 'translate_es_id', prompt: 'Traduce: mediodía / primeras horas de la tarde', answer: 'Siang', explanation: 'Siang suele referirse al mediodía y primeras horas de la tarde.' },
                                { vocabId: 'v148', type: 'mc', prompt: '¿Qué palabra significa tarde, al final de la tarde?', options: ['Sore', 'Pagi', 'Malam'], answer: 0, explanation: 'Sore es el final de la tarde.' },
                                { vocabId: 'v149', type: 'translate_es_id', prompt: 'Traduce: noche', answer: 'Malam', explanation: 'Malam significa noche.' },
                                { vocabId: 'v150', type: 'mc', prompt: 'En la expresión jam tujuh, jam significa…', options: ['Hora', 'Minuto', 'Mañana'], answer: 0, explanation: 'Jam se usa para expresar la hora y también significa reloj.' },
                                { vocabId: 'v151', type: 'translate_es_id', prompt: 'Traduce: a las (para indicar una hora)', answer: 'Pukul', explanation: 'Pukul se usa para indicar una hora concreta.' },
                                { vocabId: 'v152', type: 'listen', prompt: 'Escribe la palabra que significa minuto', answer: 'Menit', explanation: 'Menit significa minuto.' },
                                { vocabId: 'v153', type: 'mc', prompt: '¿Qué hora significa setengah delapan?', options: ['7:30', '8:30', '7:00'], answer: 0, explanation: 'Setengah delapan significa siete y media.' },
                                { vocabId: 'v154', type: 'translate_es_id', prompt: 'Traduce: ahora', answer: 'Sekarang', explanation: 'Sekarang significa ahora.' },
                                { vocabId: 'v155', type: 'mc', prompt: 'Nanti significa…', options: ['Ayer', 'Más tarde', 'Ahora'], answer: 1, explanation: 'Nanti significa más tarde.' },
                                { vocabId: 'v156', type: 'order', prompt: 'Ordena: Las siete en punto', words: ['tepat', 'tujuh', 'Jam'], correctOrder: ['Jam', 'tujuh', 'tepat'], explanation: 'Jam tujuh tepat significa las siete en punto.' },
                                { vocabId: 'v157', type: 'translate_es_id', prompt: 'Traduce: las siete y cinco', answer: 'Jam tujuh lewat lima menit', explanation: 'Lewat indica los minutos que pasan de la hora.' },
                                { vocabId: 'v146', type: 'listen', prompt: 'Escribe la expresión “esta mañana”', answer: 'Pagi ini', explanation: 'Pagi ini significa esta mañana.' },
                                { vocabId: 'v151', type: 'write', prompt: 'Escribe una frase para decir que son las siete en punto.', hint: 'Usa jam, tujuh y tepat.', modelAnswer: 'Jam tujuh tepat.', explanation: 'La frase significa las siete en punto.' },
                                { vocabId: 'v155', type: 'write', prompt: 'Escribe una frase sencilla con nanti.', hint: 'Puedes hablar de estudiar más tarde.', modelAnswer: 'Saya belajar nanti.', explanation: 'Nanti significa más tarde; otras frases correctas también valen.' }
                            ]
                        },
                        {
                            "id": "a1_u12",
                            "title": "Unidad 12: Rutina diaria",
                            "desc": "Describir acciones cotidianas sencillas con frases breves.",
                            "grammar": "Para describir una rutina, coloca normalmente el sujeto antes del verbo: Saya bangun (me levanto). El indonesio no necesita conjugar el verbo según la persona. Usa las expresiones en frases breves y en el contexto de cada día.",
                            "vocab": [
                                {
                                    "id": "v247",
                                    "idn": "Bangun",
                                    "esp": "Levantarse",
                                    "ex": "Saya bangun pagi.",
                                    "exEsp": "Me levanto por la mañana."
                                },
                                {
                                    "id": "v248",
                                    "idn": "Mandi",
                                    "esp": "Bañarse / ducharse",
                                    "ex": "Saya mandi.",
                                    "exEsp": "Me baño."
                                },
                                {
                                    "id": "v249",
                                    "idn": "Sarapan",
                                    "esp": "Desayunar",
                                    "ex": "Saya sarapan.",
                                    "exEsp": "Desayuno."
                                },
                                {
                                    "id": "v250",
                                    "idn": "Berangkat",
                                    "esp": "Salir / partir",
                                    "ex": "Saya berangkat.",
                                    "exEsp": "Salgo."
                                },
                                {
                                    "id": "v251",
                                    "idn": "Pulang",
                                    "esp": "Volver a casa",
                                    "ex": "Saya pulang.",
                                    "exEsp": "Vuelvo a casa."
                                },
                                {
                                    "id": "v252",
                                    "idn": "Istirahat",
                                    "esp": "Descansar",
                                    "ex": "Saya istirahat.",
                                    "exEsp": "Descanso."
                                },
                                {
                                    "id": "v253",
                                    "idn": "Memasak",
                                    "esp": "Cocinar",
                                    "ex": "Saya memasak.",
                                    "exEsp": "Cocino."
                                },
                                {
                                    "id": "v254",
                                    "idn": "Mencuci",
                                    "esp": "Lavar",
                                    "ex": "Saya mencuci.",
                                    "exEsp": "Lavo."
                                },
                                {
                                    "id": "v304",
                                    "idn": "Baju",
                                    "esp": "Ropa / prenda de vestir",
                                    "ex": "Saya mencuci baju.",
                                    "exEsp": "Lavo la ropa."
                                }
                            ],
                            "exercises": [
                                {
                                    "vocabId": "v247",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Bangun»?",
                                    "options": [
                                        "Levantarse",
                                        "Bañarse / ducharse",
                                        "Desayunar"
                                    ],
                                    "answer": 0,
                                    "explanation": "Bangun significa «Levantarse»."
                                },
                                {
                                    "vocabId": "v248",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Mandi»?",
                                    "options": [
                                        "Bañarse / ducharse",
                                        "Desayunar",
                                        "Salir / partir"
                                    ],
                                    "answer": 0,
                                    "explanation": "Mandi significa «Bañarse / ducharse»."
                                },
                                {
                                    "vocabId": "v249",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Sarapan»?",
                                    "options": [
                                        "Desayunar",
                                        "Salir / partir",
                                        "Volver a casa"
                                    ],
                                    "answer": 0,
                                    "explanation": "Sarapan significa «Desayunar»."
                                },
                                {
                                    "vocabId": "v250",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Berangkat»?",
                                    "options": [
                                        "Salir / partir",
                                        "Volver a casa",
                                        "Descansar"
                                    ],
                                    "answer": 0,
                                    "explanation": "Berangkat significa «Salir / partir»."
                                },
                                {
                                    "vocabId": "v251",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Pulang»?",
                                    "options": [
                                        "Volver a casa",
                                        "Descansar",
                                        "Cocinar"
                                    ],
                                    "answer": 0,
                                    "explanation": "Pulang significa «Volver a casa»."
                                },
                                {
                                    "vocabId": "v252",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Istirahat»?",
                                    "options": [
                                        "Descansar",
                                        "Cocinar",
                                        "Lavar"
                                    ],
                                    "answer": 0,
                                    "explanation": "Istirahat significa «Descansar»."
                                },
                                {
                                    "vocabId": "v253",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Memasak»?",
                                    "options": [
                                        "Cocinar",
                                        "Lavar",
                                        "Levantarse"
                                    ],
                                    "answer": 0,
                                    "explanation": "Memasak significa «Cocinar»."
                                },
                                {
                                    "vocabId": "v254",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Mencuci»?",
                                    "options": [
                                        "Lavar",
                                        "Levantarse",
                                        "Bañarse / ducharse"
                                    ],
                                    "answer": 0,
                                    "explanation": "Mencuci significa «Lavar»."
                                },
                                {
                                    "vocabId": "v250",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Salir / partir",
                                    "answer": "Berangkat",
                                    "explanation": "Berangkat significa «Salir / partir»."
                                },
                                {
                                    "vocabId": "v251",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Volver a casa",
                                    "answer": "Pulang",
                                    "explanation": "Pulang significa «Volver a casa»."
                                },
                                {
                                    "vocabId": "v252",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Descansar",
                                    "answer": "Istirahat",
                                    "explanation": "Istirahat significa «Descansar»."
                                },
                                {
                                    "vocabId": "v247",
                                    "type": "order",
                                    "prompt": "Ordena la frase en indonesio: Me levanto por la mañana.",
                                    "words": [
                                        "pagi",
                                        "bangun",
                                        "Saya"
                                    ],
                                    "correctOrder": [
                                        "Saya",
                                        "bangun",
                                        "pagi"
                                    ],
                                    "explanation": "La frase es «Saya bangun pagi»."
                                },
                                {
                                    "vocabId": "v251",
                                    "type": "write",
                                    "prompt": "Escribe una frase sencilla con «Pulang».",
                                    "hint": "Usa el ejemplo de vocabulario como modelo y cambia lo que puedas con palabras ya aprendidas.",
                                    "modelAnswer": "Saya pulang.",
                                    "explanation": "Ejemplo: Saya pulang. — Vuelvo a casa."
                                },
                                {
                                    "vocabId": "v254",
                                    "type": "mc",
                                    "prompt": "¿Qué frase significa «Lavo la ropa»?",
                                    "options": ["Saya mencuci baju.", "Saya bangun.", "Saya mandi."],
                                    "answer": 0,
                                    "explanation": "Saya mencuci baju significa «Lavo la ropa»; baju significa ropa o prenda de vestir."
                                }
                            
                                , { vocabId: 'v247', type: 'mc', prompt: 'Escucha la rutina y elige qué hace la persona', audioText: 'Saya bangun pagi.', options: ["Me levanto por la mañana","Se acuesta por la noche","Cena por la tarde"], answer: 0, explanation: 'Bangun significa levantarse; pagi indica la mañana.' }
                            ]
                        },
                        {
                            "id": "a1_u13",
                            "title": "Unidad 13: El tiempo y el clima",
                            "desc": "Reconocer palabras frecuentes para describir el tiempo atmosférico.",
                            "grammar": "Las palabras del clima suelen funcionar como descripciones breves: Cuaca panas (hace calor / tiempo caluroso), Hari ini hujan (hoy llueve). El contexto ayuda a elegir una traducción natural; no hace falta añadir un verbo equivalente a «ser» en cada frase.",
                            "vocab": [
                                {
                                    "id": "v255",
                                    "idn": "Cuaca",
                                    "esp": "Tiempo atmosférico",
                                    "ex": "Cuaca panas.",
                                    "exEsp": "Hace calor."
                                },
                                {
                                    "id": "v256",
                                    "idn": "Panas",
                                    "esp": "Caliente / hace calor",
                                    "ex": "Cuaca panas.",
                                    "exEsp": "Hace calor."
                                },
                                {
                                    "id": "v257",
                                    "idn": "Dingin",
                                    "esp": "Frío",
                                    "ex": "Air dingin.",
                                    "exEsp": "Agua fría."
                                },
                                {
                                    "id": "v258",
                                    "idn": "Hujan",
                                    "esp": "Lluvia / llover",
                                    "ex": "Hari ini hujan.",
                                    "exEsp": "Hoy llueve."
                                },
                                {
                                    "id": "v259",
                                    "idn": "Cerah",
                                    "esp": "Despejado / soleado",
                                    "ex": "Cuaca cerah.",
                                    "exEsp": "Hace buen tiempo."
                                },
                                {
                                    "id": "v260",
                                    "idn": "Mendung",
                                    "esp": "Nublado",
                                    "ex": "Cuaca mendung.",
                                    "exEsp": "Está nublado."
                                },
                                {
                                    "id": "v261",
                                    "idn": "Angin",
                                    "esp": "Viento",
                                    "ex": "Angin.",
                                    "exEsp": "Viento."
                                },
                                {
                                    "id": "v262",
                                    "idn": "Payung",
                                    "esp": "Paraguas",
                                    "ex": "Ini payung saya.",
                                    "exEsp": "Este es mi paraguas."
                                }
                            ],
                            "exercises": [
                                {
                                    "vocabId": "v255",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Cuaca»?",
                                    "options": [
                                        "Tiempo atmosférico",
                                        "Caliente / hace calor",
                                        "Frío"
                                    ],
                                    "answer": 0,
                                    "explanation": "Cuaca significa «Tiempo atmosférico»."
                                },
                                {
                                    "vocabId": "v256",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Panas»?",
                                    "options": [
                                        "Caliente / hace calor",
                                        "Frío",
                                        "Lluvia / llover"
                                    ],
                                    "answer": 0,
                                    "explanation": "Panas significa «Caliente / hace calor»."
                                },
                                {
                                    "vocabId": "v257",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Dingin»?",
                                    "options": [
                                        "Frío",
                                        "Lluvia / llover",
                                        "Despejado / soleado"
                                    ],
                                    "answer": 0,
                                    "explanation": "Dingin significa «Frío»."
                                },
                                {
                                    "vocabId": "v258",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Hujan»?",
                                    "options": [
                                        "Lluvia / llover",
                                        "Despejado / soleado",
                                        "Nublado"
                                    ],
                                    "answer": 0,
                                    "explanation": "Hujan significa «Lluvia / llover»."
                                },
                                {
                                    "vocabId": "v259",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Cerah»?",
                                    "options": [
                                        "Despejado / soleado",
                                        "Nublado",
                                        "Viento"
                                    ],
                                    "answer": 0,
                                    "explanation": "Cerah significa «Despejado / soleado»."
                                },
                                {
                                    "vocabId": "v260",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Mendung»?",
                                    "options": [
                                        "Nublado",
                                        "Viento",
                                        "Paraguas"
                                    ],
                                    "answer": 0,
                                    "explanation": "Mendung significa «Nublado»."
                                },
                                {
                                    "vocabId": "v261",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Angin»?",
                                    "options": [
                                        "Viento",
                                        "Paraguas",
                                        "Tiempo atmosférico"
                                    ],
                                    "answer": 0,
                                    "explanation": "Angin significa «Viento»."
                                },
                                {
                                    "vocabId": "v262",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Payung»?",
                                    "options": [
                                        "Paraguas",
                                        "Tiempo atmosférico",
                                        "Caliente / hace calor"
                                    ],
                                    "answer": 0,
                                    "explanation": "Payung significa «Paraguas»."
                                },
                                {
                                    "vocabId": "v258",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Lluvia / llover",
                                    "answer": "Hujan",
                                    "explanation": "Hujan significa «Lluvia / llover»."
                                },
                                {
                                    "vocabId": "v259",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Despejado / soleado",
                                    "answer": "Cerah",
                                    "explanation": "Cerah significa «Despejado / soleado»."
                                },
                                {
                                    "vocabId": "v260",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Nublado",
                                    "answer": "Mendung",
                                    "explanation": "Mendung significa «Nublado»."
                                },
                                {
                                    "vocabId": "v258",
                                    "type": "order",
                                    "prompt": "Ordena la frase en indonesio: Hoy llueve.",
                                    "words": [
                                        "hujan",
                                        "ini",
                                        "Hari"
                                    ],
                                    "correctOrder": [
                                        "Hari",
                                        "ini",
                                        "hujan"
                                    ],
                                    "explanation": "La frase es «Hari ini hujan»."
                                },
                                {
                                    "vocabId": "v258",
                                    "type": "write",
                                    "prompt": "Escribe una frase sencilla con «Hujan».",
                                    "hint": "Usa el ejemplo de vocabulario como modelo y cambia lo que puedas con palabras ya aprendidas.",
                                    "modelAnswer": "Hari ini hujan.",
                                    "explanation": "Ejemplo: Hari ini hujan. — Hoy llueve."
                                },
                                {
                                    "vocabId": "v262",
                                    "type": "mc",
                                    "prompt": "¿Qué objeto puedes usar cuando llueve?",
                                    "options": ["Payung", "Buku", "Bola"],
                                    "answer": 0,
                                    "explanation": "Payung significa «paraguas», un objeto que se usa cuando llueve."
                                }
                            
                                , { vocabId: 'v258', type: 'mc', prompt: 'Escucha el parte del tiempo y elige qué ocurre', audioText: 'Hari ini hujan.', options: ["Hoy llueve","Hoy hace frío","Hoy hace calor"], answer: 0, explanation: 'Hujan significa lluvia o llover.' }
                            ]
                        },
                        {
                            "id": "a1_u14",
                            "title": "Unidad 14: Transporte y desplazamientos",
                            "desc": "Nombrar medios de transporte y lugares básicos para viajar.",
                            "grammar": "Naik se usa con muchos medios de transporte para expresar que uno los toma o viaja en ellos: naik bus (ir en autobús). Turun puede indicar bajarse. Para A1, memoriza estas combinaciones frecuentes como expresiones completas.",
                            "vocab": [
                                {
                                    "id": "v263",
                                    "idn": "Bus",
                                    "esp": "Autobús",
                                    "ex": "Saya naik bus.",
                                    "exEsp": "Voy en autobús."
                                },
                                {
                                    "id": "v264",
                                    "idn": "Kereta",
                                    "esp": "Tren",
                                    "ex": "Saya naik kereta.",
                                    "exEsp": "Voy en tren."
                                },
                                {
                                    "id": "v265",
                                    "idn": "Taksi",
                                    "esp": "Taxi",
                                    "ex": "Saya naik taksi.",
                                    "exEsp": "Voy en taxi."
                                },
                                {
                                    "id": "v266",
                                    "idn": "Stasiun",
                                    "esp": "Estación de tren",
                                    "ex": "Stasiun di sini.",
                                    "exEsp": "La estación está aquí."
                                },
                                {
                                    "id": "v267",
                                    "idn": "Terminal",
                                    "esp": "Terminal de transporte",
                                    "ex": "Terminal di sini.",
                                    "exEsp": "La terminal de transporte está aquí."
                                },
                                {
                                    "id": "v268",
                                    "idn": "Sepeda",
                                    "esp": "Bicicleta",
                                    "ex": "Saya naik sepeda.",
                                    "exEsp": "Voy en bicicleta."
                                },
                                {
                                    "id": "v269",
                                    "idn": "Naik",
                                    "esp": "Subir / tomar transporte",
                                    "ex": "Saya naik bus.",
                                    "exEsp": "Tomo el autobús."
                                },
                                {
                                    "id": "v270",
                                    "idn": "Turun",
                                    "esp": "Bajar / apearse",
                                    "ex": "Saya turun.",
                                    "exEsp": "Me bajo."
                                }
                            ],
                            "exercises": [
                                {
                                    "vocabId": "v263",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Bus»?",
                                    "options": [
                                        "Autobús",
                                        "Tren",
                                        "Taxi"
                                    ],
                                    "answer": 0,
                                    "explanation": "Bus significa «Autobús»."
                                },
                                {
                                    "vocabId": "v264",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Kereta»?",
                                    "options": [
                                        "Tren",
                                        "Taxi",
                                        "Estación de tren"
                                    ],
                                    "answer": 0,
                                    "explanation": "Kereta significa «Tren»."
                                },
                                {
                                    "vocabId": "v265",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Taksi»?",
                                    "options": [
                                        "Taxi",
                                        "Estación de tren",
                                        "Terminal de transporte"
                                    ],
                                    "answer": 0,
                                    "explanation": "Taksi significa «Taxi»."
                                },
                                {
                                    "vocabId": "v266",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Stasiun»?",
                                    "options": [
                                        "Estación de tren",
                                        "Terminal de transporte",
                                        "Bicicleta"
                                    ],
                                    "answer": 0,
                                    "explanation": "Stasiun significa «Estación de tren»."
                                },
                                {
                                    "vocabId": "v267",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Terminal»?",
                                    "options": [
                                        "Terminal de transporte",
                                        "Bicicleta",
                                        "Subir / tomar transporte"
                                    ],
                                    "answer": 0,
                                    "explanation": "Terminal significa «Terminal de transporte»."
                                },
                                {
                                    "vocabId": "v268",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Sepeda»?",
                                    "options": [
                                        "Bicicleta",
                                        "Subir / tomar transporte",
                                        "Bajar / apearse"
                                    ],
                                    "answer": 0,
                                    "explanation": "Sepeda significa «Bicicleta»."
                                },
                                {
                                    "vocabId": "v269",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Naik»?",
                                    "options": [
                                        "Subir / tomar transporte",
                                        "Bajar / apearse",
                                        "Autobús"
                                    ],
                                    "answer": 0,
                                    "explanation": "Naik significa «Subir / tomar transporte»."
                                },
                                {
                                    "vocabId": "v270",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Turun»?",
                                    "options": [
                                        "Bajar / apearse",
                                        "Autobús",
                                        "Tren"
                                    ],
                                    "answer": 0,
                                    "explanation": "Turun significa «Bajar / apearse»."
                                },
                                {
                                    "vocabId": "v266",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Estación de tren",
                                    "answer": "Stasiun",
                                    "explanation": "Stasiun significa «Estación de tren»."
                                },
                                {
                                    "vocabId": "v267",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Me bajo en la terminal.",
                                    "answer": "Saya turun di terminal.",
                                    "explanation": "Saya turun di terminal significa «Me bajo en la terminal»."
                                },
                                {
                                    "vocabId": "v268",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Bicicleta",
                                    "answer": "Sepeda",
                                    "explanation": "Sepeda significa «Bicicleta»."
                                },
                                {
                                    "vocabId": "v263",
                                    "type": "order",
                                    "prompt": "Ordena la frase en indonesio: Voy en autobús.",
                                    "words": [
                                        "bus",
                                        "naik",
                                        "Saya"
                                    ],
                                    "correctOrder": [
                                        "Saya",
                                        "naik",
                                        "bus"
                                    ],
                                    "explanation": "La frase es «Saya naik bus»."
                                },
                                {
                                    "vocabId": "v264",
                                    "type": "write",
                                    "prompt": "Escribe una frase sencilla con «Kereta».",
                                    "hint": "Usa el ejemplo de vocabulario como modelo y cambia lo que puedas con palabras ya aprendidas.",
                                    "modelAnswer": "Saya naik kereta.",
                                    "explanation": "Ejemplo: Saya naik kereta. — Voy en tren."
                                },
                                {
                                                                    "vocabId": "v270",
                                                                    "type": "mc",
                                                                    "prompt": "¿Qué significa «Saya turun»?",
                                                                    "options": ["Me bajo / desciendo", "Subo al autobús", "Me siento"],
                                                                    "answer": 0,
                                                                    "explanation": "Saya turun significa «Me bajo» o «desciendo» según el contexto."
                                                                }
                            
                                , { vocabId: 'v263', type: 'mc', prompt: 'Escucha cómo viaja la persona', audioText: 'Saya naik bus.', options: ["Voy en autobús","Va en tren","Va en taxi"], answer: 0, explanation: 'Naik bus significa ir o viajar en autobús.' }
                            ]
                        },
                        {
                            "id": "a1_u15",
                            "title": "Unidad 15: Acciones cotidianas",
                            "desc": "Reconocer y usar verbos frecuentes para describir acciones sencillas.",
                            "grammar": "En A1, aprende cada verbo frecuente como una expresión completa, sin estudiar todavía las reglas generales de los prefijos. Formas como main y ambil son comunes en el habla coloquial; en registros más formales suelen aparecer bermain y mengambil. Puedes combinar estas expresiones con sujetos conocidos: Saya pergi (voy), Dia datang (viene), Saya duduk di sini (me siento aquí).",
                            "vocab": [
                                {
                                    "id": "v280",
                                    "idn": "Pergi",
                                    "esp": "Ir",
                                    "ex": "Saya pergi.",
                                    "exEsp": "Voy."
                                },
                                {
                                    "id": "v281",
                                    "idn": "Datang",
                                    "esp": "Venir",
                                    "ex": "Saya datang hari ini.",
                                    "exEsp": "Vengo hoy."
                                },
                                {
                                    "id": "v282",
                                    "idn": "Duduk",
                                    "esp": "Sentarse",
                                    "ex": "Saya duduk di sini.",
                                    "exEsp": "Me siento aquí."
                                },
                                {
                                    "id": "v283",
                                    "idn": "Lari",
                                    "esp": "Correr",
                                    "ex": "Saya lari.",
                                    "exEsp": "Corro."
                                },
                                {
                                    "id": "v284",
                                    "idn": "Main",
                                    "esp": "Jugar",
                                    "ex": "Saya main bola.",
                                    "exEsp": "Juego a la pelota."
                                },
                                {
                                    "id": "v285",
                                    "idn": "Ambil",
                                    "esp": "Tomar / agarrar",
                                    "ex": "Saya ambil bola.",
                                    "exEsp": "Agarro la pelota."
                                },
                                {
                                    "id": "v286",
                                    "idn": "Bola",
                                    "esp": "Pelota",
                                    "ex": "Saya main bola.",
                                    "exEsp": "Juego a la pelota."
                                },
                                {
                                    "id": "v287",
                                    "idn": "Pintu",
                                    "esp": "Puerta",
                                    "ex": "Pintu di sini.",
                                    "exEsp": "La puerta está aquí."
                                }
                            ],
                            "exercises": [
                                {
                                    "vocabId": "v280",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Pergi»?",
                                    "options": [
                                        "Ir",
                                        "Venir",
                                        "Sentarse"
                                    ],
                                    "answer": 0,
                                    "explanation": "Pergi significa «Ir»."
                                },
                                {
                                    "vocabId": "v281",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Datang»?",
                                    "options": [
                                        "Venir",
                                        "Sentarse",
                                        "Correr"
                                    ],
                                    "answer": 0,
                                    "explanation": "Datang significa «Venir»."
                                },
                                {
                                    "vocabId": "v282",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Duduk»?",
                                    "options": [
                                        "Sentarse",
                                        "Correr",
                                        "Jugar"
                                    ],
                                    "answer": 0,
                                    "explanation": "Duduk significa «Sentarse»."
                                },
                                {
                                    "vocabId": "v283",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Lari»?",
                                    "options": [
                                        "Correr",
                                        "Jugar",
                                        "Tomar / agarrar"
                                    ],
                                    "answer": 0,
                                    "explanation": "Lari significa «Correr»."
                                },
                                {
                                    "vocabId": "v284",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Main»?",
                                    "options": [
                                        "Jugar",
                                        "Tomar / agarrar",
                                        "Pelota"
                                    ],
                                    "answer": 0,
                                    "explanation": "Main significa «Jugar»."
                                },
                                {
                                    "vocabId": "v285",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Ambil»?",
                                    "options": [
                                        "Tomar / agarrar",
                                        "Pelota",
                                        "Puerta"
                                    ],
                                    "answer": 0,
                                    "explanation": "Ambil significa «Tomar / agarrar»."
                                },
                                {
                                    "vocabId": "v286",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Bola»?",
                                    "options": [
                                        "Pelota",
                                        "Puerta",
                                        "Ir"
                                    ],
                                    "answer": 0,
                                    "explanation": "Bola significa «Pelota»."
                                },
                                {
                                    "vocabId": "v287",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Pintu»?",
                                    "options": [
                                        "Puerta",
                                        "Ir",
                                        "Venir"
                                    ],
                                    "answer": 0,
                                    "explanation": "Pintu significa «Puerta»."
                                },
                                {
                                    "vocabId": "v280",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Ir",
                                    "answer": "Pergi",
                                    "explanation": "Pergi significa «Ir»."
                                },
                                {
                                    "vocabId": "v281",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Venir",
                                    "answer": "Datang",
                                    "explanation": "Datang significa «Venir»."
                                },
                                {
                                    "vocabId": "v284",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Jugar",
                                    "answer": "Main",
                                    "explanation": "Main significa «Jugar»."
                                },
                                {
                                    "vocabId": "v280",
                                    "type": "order",
                                    "prompt": "Ordena la frase en indonesio.",
                                    "words": [
                                        "pergi",
                                        "Saya"
                                    ],
                                    "correctOrder": [
                                        "Saya",
                                        "pergi"
                                    ],
                                    "explanation": "Saya pergi significa «Voy»."
                                },
                                {
                                    "vocabId": "v284",
                                    "type": "order",
                                    "prompt": "Ordena la frase en indonesio.",
                                    "words": [
                                        "bola",
                                        "main",
                                        "Saya"
                                    ],
                                    "correctOrder": [
                                        "Saya",
                                        "main",
                                        "bola"
                                    ],
                                    "explanation": "Saya main bola. significa «Juego a la pelota»."
                                },
                                {
                                    "vocabId": "v281",
                                    "type": "write",
                                    "prompt": "Escribe una frase breve con un verbo de esta unidad.",
                                    "hint": "Usa Saya y un verbo que ya hayas practicado.",
                                    "modelAnswer": "Saya pergi.",
                                    "explanation": "Ejemplo: Saya pergi. — Voy."
                                }
                            
                                , { vocabId: 'v280', type: 'mc', prompt: 'Escucha adónde va la persona', audioText: 'Saya pergi ke pasar.', options: ["Voy al mercado","Viene de la escuela","Se queda en casa"], answer: 0, explanation: 'Pergi significa ir.' }
                            ]
                        },
                        {
                            "id": "a1_u16",
                            "title": "Unidad 16: Querer, poder y preferencias",
                            "desc": "Expresar deseos, capacidad y gustos con frases breves.",
                            "grammar": "Mau ya aparece en expresiones de petición anteriores: Saya mau teh (quiero té). Bisa expresa capacidad o posibilidad; suka expresa gusto. Ingin también expresa querer. Aprende estas combinaciones como bloques, sin inferir que todos los verbos siguen una única regla.",
                            "vocab": [
                                {
                                    "id": "v288",
                                    "idn": "Bisa",
                                    "esp": "Poder / saber hacer",
                                    "ex": "Saya bisa pergi.",
                                    "exEsp": "Puedo ir."
                                },
                                {
                                    "id": "v289",
                                    "idn": "Suka",
                                    "esp": "Gustar",
                                    "ex": "Saya suka teh.",
                                    "exEsp": "Me gusta el té."
                                },
                                {
                                    "id": "v290",
                                    "idn": "Ingin",
                                    "esp": "Querer / desear",
                                    "ex": "Saya ingin kopi.",
                                    "exEsp": "Quiero café."
                                },
                                {
                                    "id": "v291",
                                    "idn": "Boleh",
                                    "esp": "Poder / tener permiso",
                                    "ex": "Boleh?",
                                    "exEsp": "¿Se puede?"
                                },
                                {
                                    "id": "v292",
                                    "idn": "Sangat",
                                    "esp": "Muy",
                                    "ex": "Saya sangat suka teh.",
                                    "exEsp": "Me gusta mucho el té."
                                },
                                {
                                    "id": "v293",
                                    "idn": "Sedikit",
                                    "esp": "Un poco",
                                    "ex": "Saya mau sedikit teh.",
                                    "exEsp": "Quiero un poco de té."
                                },
                                {
                                    "id": "v294",
                                    "idn": "Senang",
                                    "esp": "Contento / alegrarse",
                                    "ex": "Saya senang.",
                                    "exEsp": "Estoy contento."
                                },
                                {
                                    "id": "v295",
                                    "idn": "Bersama",
                                    "esp": "Con / junto con",
                                    "ex": "Saya belajar bersama ibu.",
                                    "exEsp": "Estudio con mamá."
                                }
                            ],
                            "exercises": [
                                {
                                    "vocabId": "v288",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Bisa»?",
                                    "options": [
                                        "Poder / saber hacer",
                                        "Gustar",
                                        "Querer / desear"
                                    ],
                                    "answer": 0,
                                    "explanation": "Bisa significa «Poder / saber hacer»."
                                },
                                {
                                    "vocabId": "v289",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Suka»?",
                                    "options": [
                                        "Gustar",
                                        "Querer / desear",
                                        "Poder / tener permiso"
                                    ],
                                    "answer": 0,
                                    "explanation": "Suka significa «Gustar»."
                                },
                                {
                                    "vocabId": "v290",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Saya ingin kopi»?",
                                    "options": [
                                        "Quiero café",
                                        "Puedo ir",
                                        "Me gusta el té"
                                    ],
                                    "answer": 0,
                                    "explanation": "Saya ingin kopi significa «Quiero café»; aunque mau también puede expresar querer, aquí se evalúa la frase completa."
                                },
                                {
                                    "vocabId": "v291",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Boleh»?",
                                    "options": [
                                        "Poder / tener permiso",
                                        "Muy",
                                        "Un poco"
                                    ],
                                    "answer": 0,
                                    "explanation": "Boleh significa «Poder / tener permiso»."
                                },
                                {
                                    "vocabId": "v292",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Sangat»?",
                                    "options": [
                                        "Muy",
                                        "Un poco",
                                        "Contento / alegrarse"
                                    ],
                                    "answer": 0,
                                    "explanation": "Sangat significa «Muy»."
                                },
                                {
                                    "vocabId": "v293",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Sedikit»?",
                                    "options": [
                                        "Un poco",
                                        "Contento / alegrarse",
                                        "Con / junto con"
                                    ],
                                    "answer": 0,
                                    "explanation": "Sedikit significa «Un poco»."
                                },
                                {
                                    "vocabId": "v294",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Senang»?",
                                    "options": [
                                        "Contento / alegrarse",
                                        "Con / junto con",
                                        "Poder / saber hacer"
                                    ],
                                    "answer": 0,
                                    "explanation": "Senang significa «Contento / alegrarse»."
                                },
                                {
                                    "vocabId": "v295",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Bersama»?",
                                    "options": [
                                        "Con / junto con",
                                        "Poder / saber hacer",
                                        "Gustar"
                                    ],
                                    "answer": 0,
                                    "explanation": "Bersama significa «Con / junto con»."
                                },
                                {
                                    "vocabId": "v288",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Poder / saber hacer",
                                    "answer": "Bisa",
                                    "explanation": "Bisa significa «Poder / saber hacer»."
                                },
                                {
                                    "vocabId": "v289",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Gustar",
                                    "answer": "Suka",
                                    "explanation": "Suka significa «Gustar»."
                                },
                                {
                                    "vocabId": "v290",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Querer / desear",
                                    "answer": "Ingin",
                                    "explanation": "Ingin significa «Querer / desear»."
                                },
                                {
                                    "vocabId": "v289",
                                    "type": "order",
                                    "prompt": "Ordena la frase en indonesio.",
                                    "words": [
                                        "teh",
                                        "suka",
                                        "Saya"
                                    ],
                                    "correctOrder": [
                                        "Saya",
                                        "suka",
                                        "teh"
                                    ],
                                    "explanation": "Saya suka teh significa «Me gusta el té»."
                                },
                                {
                                    "vocabId": "v288",
                                    "type": "order",
                                    "prompt": "Ordena la frase en indonesio.",
                                    "words": [
                                        "pergi",
                                        "bisa",
                                        "Saya"
                                    ],
                                    "correctOrder": [
                                        "Saya",
                                        "bisa",
                                        "pergi"
                                    ],
                                    "explanation": "Saya bisa pergi significa «Puedo ir»."
                                },
                                {
                                    "vocabId": "v290",
                                    "type": "write",
                                    "prompt": "Escribe una frase para expresar algo que quieres o que te gusta.",
                                    "hint": "Puedes usar ingin, suka o mau con comida ya conocida.",
                                    "modelAnswer": "Saya ingin kopi.",
                                    "explanation": "Ejemplo: Saya ingin kopi. — Quiero café."
                                }
                            
                                , { vocabId: 'v288', type: 'mc', prompt: 'Escucha qué puede hacer la persona', audioText: 'Saya bisa berenang.', options: ["Puedo nadar","Quiere dormir","No sabe leer"], answer: 0, explanation: 'Bisa expresa capacidad o posibilidad.' }
                            ]
                        },
                        {
                            "id": "a1_u17",
                            "title": "Unidad 17: Tener, haber y preguntas básicas",
                            "desc": "Preguntar por personas, cosas, tiempo y circunstancias; expresar existencia y posesión.",
                            "grammar": "Ada expresa que algo existe o está presente; tidak ada significa que no hay. Punya expresa posesión. Apa, siapa, kapan, kenapa y bagaimana sirven para preguntar qué, quién, cuándo, por qué y cómo. Combina estas palabras con vocabulario ya estudiado.",
                            "vocab": [
                                {
                                    "id": "v296",
                                    "idn": "Ada",
                                    "esp": "Haber / existir / estar presente",
                                    "ex": "Ada bus di sini?",
                                    "exEsp": "¿Hay un autobús aquí?"
                                },
                                {
                                    "id": "v297",
                                    "idn": "Punya",
                                    "esp": "Tener / poseer",
                                    "ex": "Saya punya kopi.",
                                    "exEsp": "Tengo café."
                                },
                                {
                                    "id": "v298",
                                    "idn": "Apa",
                                    "esp": "Qué",
                                    "ex": "Apa ini?",
                                    "exEsp": "¿Qué es esto?"
                                },
                                {
                                    "id": "v11",
                                    "idn": "Siapa",
                                    "esp": "Quién",
                                    "ex": "Siapa nama kamu?",
                                    "exEsp": "¿Cómo te llamas?"
                                },
                                {
                                    "id": "v300",
                                    "idn": "Kapan",
                                    "esp": "Cuándo",
                                    "ex": "Kapan kamu datang?",
                                    "exEsp": "¿Cuándo vienes?"
                                },
                                {
                                    "id": "v301",
                                    "idn": "Kenapa",
                                    "esp": "Por qué",
                                    "ex": "Kenapa kamu di sini?",
                                    "exEsp": "¿Por qué estás aquí?"
                                },
                                {
                                    "id": "v302",
                                    "idn": "Bagaimana",
                                    "esp": "Cómo",
                                    "ex": "Bagaimana cuaca hari ini?",
                                    "exEsp": "¿Cómo está el tiempo hoy?"
                                },
                                {
                                    "id": "v303",
                                    "idn": "Tidak ada",
                                    "esp": "No hay",
                                    "ex": "Tidak ada bus.",
                                    "exEsp": "No hay autobús."
                                }
                            ],
                            "exercises": [
                                {
                                    "vocabId": "v296",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Ada»?",
                                    "options": [
                                        "Haber / existir / estar presente",
                                        "Tener / poseer",
                                        "Qué"
                                    ],
                                    "answer": 0,
                                    "explanation": "Ada significa «Haber / existir / estar presente»."
                                },
                                {
                                    "vocabId": "v297",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Punya»?",
                                    "options": [
                                        "Tener / poseer",
                                        "Qué",
                                        "Quién"
                                    ],
                                    "answer": 0,
                                    "explanation": "Punya significa «Tener / poseer»."
                                },
                                {
                                    "vocabId": "v298",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Apa»?",
                                    "options": [
                                        "Qué",
                                        "Quién",
                                        "Cuándo"
                                    ],
                                    "answer": 0,
                                    "explanation": "Apa significa «Qué»."
                                },
                                {
                                    "vocabId": "v11",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Siapa»?",
                                    "options": [
                                        "Quién",
                                        "Cuándo",
                                        "Por qué"
                                    ],
                                    "answer": 0,
                                    "explanation": "Siapa significa «Quién»."
                                },
                                {
                                    "vocabId": "v300",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Kapan»?",
                                    "options": [
                                        "Cuándo",
                                        "Por qué",
                                        "Cómo"
                                    ],
                                    "answer": 0,
                                    "explanation": "Kapan significa «Cuándo»."
                                },
                                {
                                    "vocabId": "v301",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Kenapa»?",
                                    "options": [
                                        "Por qué",
                                        "Cómo",
                                        "No hay"
                                    ],
                                    "answer": 0,
                                    "explanation": "Kenapa significa «Por qué»."
                                },
                                {
                                    "vocabId": "v302",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Bagaimana»?",
                                    "options": [
                                        "Cómo",
                                        "No hay",
                                        "Haber / existir / estar presente"
                                    ],
                                    "answer": 0,
                                    "explanation": "Bagaimana significa «Cómo»."
                                },
                                {
                                    "vocabId": "v303",
                                    "type": "mc",
                                    "prompt": "¿Qué significa «Tidak ada»?",
                                    "options": [
                                        "No hay",
                                        "Haber / existir / estar presente",
                                        "Tener / poseer"
                                    ],
                                    "answer": 0,
                                    "explanation": "Tidak ada significa «No hay»."
                                },
                                {
                                    "vocabId": "v296",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Haber / existir / estar presente",
                                    "answer": "Ada",
                                    "explanation": "Ada significa «Haber / existir / estar presente»."
                                },
                                {
                                    "vocabId": "v297",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Tener / poseer",
                                    "answer": "Punya",
                                    "explanation": "Punya significa «Tener / poseer»."
                                },
                                {
                                    "vocabId": "v300",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Cuándo",
                                    "answer": "Kapan",
                                    "explanation": "Kapan significa «Cuándo»."
                                },
                                {
                                    "vocabId": "v297",
                                    "type": "order",
                                    "prompt": "Ordena la frase en indonesio.",
                                    "words": [
                                        "kopi",
                                        "punya",
                                        "Saya"
                                    ],
                                    "correctOrder": [
                                        "Saya",
                                        "punya",
                                        "kopi"
                                    ],
                                    "explanation": "Saya punya kopi significa «Tengo café»."
                                },
                                {
                                    "vocabId": "v300",
                                    "type": "order",
                                    "prompt": "Ordena la frase en indonesio.",
                                    "words": [
                                        "kamu",
                                        "datang",
                                        "Kapan"
                                    ],
                                    "correctOrder": [
                                        "Kapan",
                                        "kamu",
                                        "datang"
                                    ],
                                    "explanation": "Kapan kamu datang? significa «¿Cuándo vienes?»."
                                },
                                {
                                    "vocabId": "v296",
                                    "type": "write",
                                    "prompt": "Escribe una pregunta sencilla con una palabra interrogativa de esta unidad.",
                                    "hint": "Puedes preguntar por un nombre, la hora o el tiempo.",
                                    "modelAnswer": "Kapan kamu datang?",
                                    "explanation": "Ejemplo: Kapan kamu datang? — ¿Cuándo vienes?"
                                }
                            
                                , { vocabId: 'v296', type: 'mc', prompt: 'Escucha la pregunta y elige qué quiere saber', audioText: 'Ada bus di sini?', options: ["¿Hay un autobús aquí?","Dónde está el hotel","Quién tiene el libro"], answer: 0, explanation: 'Ada pregunta por la existencia o presencia de algo.' }
                            ]
                        },
                        {
                            id: 'a1_u18',
                            title: 'Unidad 18: Esto, aquello y posesión',
                            desc: 'Señalar objetos y lugares, y expresar pertenencia con formas frecuentes.',
                            grammar: 'Cuando acompañan a un sustantivo, ini e itu van después: buku ini (este libro), rumah itu (esa casa). Ini también puede usarse al inicio si significa “esto es”: Ini buku (esto es un libro), como en la unidad 2. Sini, situ y sana indican aquí, ahí y allá. Kami excluye a quien escucha; kita lo incluye. -nya puede señalar posesión o referencia según el contexto: namanya (su nombre).',
                            vocab: [
                                { id: 'v51', idn: 'Ini', esp: 'Este / esta / esto', ex: 'Buku ini.', exEsp: 'Este libro.' },
                                { id: 'v311', idn: 'Itu', esp: 'Ese / esa / aquel / aquello', ex: 'Rumah itu.', exEsp: 'Aquella casa.' },
                                { id: 'v312', idn: 'Sini', esp: 'Aquí / acá', ex: 'Saya di sini.', exEsp: 'Estoy aquí.' },
                                { id: 'v313', idn: 'Situ', esp: 'Ahí', ex: 'Kamu di situ.', exEsp: 'Estás ahí.' },
                                { id: 'v314', idn: 'Sana', esp: 'Allá', ex: 'Dia di sana.', exEsp: 'Está allá.' },
                                { id: 'v315', idn: 'Kami', esp: 'Nosotros/as (sin incluir al oyente)', ex: 'Kami dari Indonesia.', exEsp: 'Nosotros somos de Indonesia (sin incluirte).' },
                                { id: 'v316', idn: 'Kita', esp: 'Nosotros/as (incluyendo al oyente)', ex: 'Kita di sini.', exEsp: 'Estamos aquí (tú y yo / nosotros).' },
                                { id: 'v317', idn: 'Mereka', esp: 'Ellos / ellas', ex: 'Mereka di sini.', exEsp: 'Ellos están aquí.' },
                                { id: 'v318', idn: 'Anda', esp: 'Usted / ustedes (formal)', ex: 'Anda di sini.', exEsp: 'Usted está aquí.' },
                                { id: 'v348', idn: 'Mana', esp: 'Dónde / cuál (según contexto)', ex: 'Anda dari mana?', exEsp: '¿De dónde es usted?' },
                                { id: 'v319', idn: 'Milik', esp: 'Pertenencia / propiedad de', ex: 'Ini milik saya.', exEsp: 'Esto es mío.' },
                                { id: 'v320', idn: '-nya', esp: 'Su / de él, ella o ello (según contexto)', ex: 'Namanya Ana.', exEsp: 'Su nombre es Ana.' }
                            ],
                            exercises: [
                                { vocabId: 'v51', type: 'mc', prompt: '¿Qué significa «ini»?', options: ['Este / esto', 'Allá', 'Ellos'], answer: 0, explanation: 'Ini señala algo cercano: buku ini, este libro.' },
                                { vocabId: 'v311', type: 'translate_es_id', prompt: 'Traduce: aquella casa', answer: 'Rumah itu', explanation: 'Itu suele colocarse después del sustantivo.' },
                                { vocabId: 'v312', type: 'order', prompt: 'Ordena: Estoy aquí.', words: ['sini', 'Saya', 'di'], correctOrder: ['Saya', 'di', 'sini'], explanation: 'Saya di sini significa «Estoy aquí».' },
                                { vocabId: 'v313', type: 'mc', prompt: 'Escucha la frase y elige su significado', audioText: 'Kamu di situ', options: ['Estoy aquí', 'Estás ahí', 'Estamos allá'], answer: 1, explanation: 'Kamu di situ significa «Estás ahí».' },
                                { vocabId: 'v314', type: 'mc', prompt: '¿Cuál expresa «allá»?', options: ['Sini', 'Sana', 'Ini'], answer: 1, explanation: 'Sana indica un lugar más alejado: allá.' },
                                { vocabId: 'v314', type: 'listen', prompt: 'Escucha y escribe la palabra que significa «allá».', answer: 'Sana', explanation: 'Sana indica un lugar más alejado: allá.' },
                                { vocabId: 'v315', type: 'translate_es_id', prompt: 'Traduce: nosotros (sin incluirte)', answer: 'Kami', explanation: 'Kami excluye a la persona que escucha.' },
                                { vocabId: 'v316', type: 'mc', prompt: '¿Qué pronombre incluye a quien escucha?', options: ['Kami', 'Mereka', 'Kita'], answer: 2, explanation: 'Kita incluye al oyente; kami no.' },
                                { vocabId: 'v317', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Mereka', explanation: 'Mereka significa «ellos/ellas».' },
                                { vocabId: 'v318', type: 'translate_es_id', prompt: 'Traduce: usted (formal)', answer: 'Anda', explanation: 'Anda es un pronombre de trato formal y puede equivaler a usted o ustedes según el contexto. La elección también depende de la relación entre hablantes y de la situación.' },
                                { vocabId: 'v319', type: 'order', prompt: 'Ordena: Esto es mío.', words: ['saya', 'Ini', 'milik'], correctOrder: ['Ini', 'milik', 'saya'], explanation: 'Ini milik saya significa «Esto es mío».' },
                                { vocabId: 'v320', type: 'mc', prompt: 'En «Namanya Ana», ¿qué expresa -nya?', options: ['Su nombre (según contexto)', 'Allá', 'Nosotros'], answer: 0, explanation: 'El sufijo -nya puede indicar posesión o referencia; no tiene una sola traducción fija.' },
                                { vocabId: 'v51', type: 'translate_es_id', prompt: 'Traduce: este libro', answer: 'Buku ini', explanation: 'El demostrativo aparece después del sustantivo.' },
                                { vocabId: 'v317', type: 'order', prompt: 'Ordena: Ellos están aquí.', words: ['sini', 'Mereka', 'di'], correctOrder: ['Mereka', 'di', 'sini'], explanation: 'Mereka di sini significa «Ellos están aquí».' },
                                { vocabId: 'v316', type: 'write', prompt: 'Escribe una frase que incluya a la persona que escucha y diga dónde están.', hint: 'Usa Kita di sini.', modelAnswer: 'Kita di sini.', explanation: 'Kita incluye a quien escucha; Kita di sini significa «Estamos aquí».' },
                                { vocabId: 'v319', type: 'write', prompt: 'Escribe una frase que indique de quién es algo.', hint: 'Usa Ini milik saya como modelo.', modelAnswer: 'Ini milik saya.', explanation: 'Milik expresa pertenencia; la frase es un modelo que puedes adaptar.' }
                            ]
                        },
                        {
                            id: 'a1_u19',
                            title: 'Unidad 19: En el restaurante',
                            desc: 'Pedir comida, expresar gustos sencillos y solicitar la cuenta.',
                            grammar: 'Para pedir, puedes usar Saya mau ... (Quiero ...) o Saya pesan ... (Pido ...). En frases sencillas, enak describe algo rico y pedas algo picante. La cortesía y el contexto importan; las frases modelo son útiles en situaciones cotidianas.',
                            vocab: [
                                { id: 'v321', idn: 'Restoran', esp: 'Restaurante', ex: 'Saya di restoran.', exEsp: 'Estoy en el restaurante.' },
                                { id: 'v322', idn: 'Menu', esp: 'Menú / carta', ex: 'Ini menu.', exEsp: 'Esta es la carta.' },
                                { id: 'v323', idn: 'Pesan', esp: 'Pedir (comida o bebida)', ex: 'Saya pesan nasi goreng.', exEsp: 'Pido arroz frito.' },
                                { id: 'v324', idn: 'Nasi goreng', esp: 'Arroz frito', ex: 'Saya mau nasi goreng.', exEsp: 'Quiero arroz frito.' },
                                { id: 'v325', idn: 'Mi', esp: 'Fideos / tallarines', ex: 'Saya pesan mi.', exEsp: 'Pido fideos.' },
                                { id: 'v326', idn: 'Sayur', esp: 'Verdura(s)', ex: 'Saya mau sayur.', exEsp: 'Quiero verduras.' },
                                { id: 'v327', idn: 'Ayam', esp: 'Pollo', ex: 'Saya pesan ayam.', exEsp: 'Pido pollo.' },
                                { id: 'v328', idn: 'Ikan', esp: 'Pescado', ex: 'Saya makan ikan.', exEsp: 'Como pescado.' },
                                { id: 'v329', idn: 'Telur', esp: 'Huevo', ex: 'Saya mau telur.', exEsp: 'Quiero huevo.' },
                                { id: 'v330', idn: 'Enak', esp: 'Rico / sabroso', ex: 'Nasi goreng ini enak.', exEsp: 'Este arroz frito está rico.' },
                                { id: 'v331', idn: 'Tagihan', esp: 'Cuenta (para pagar)', ex: 'Saya minta tagihan.', exEsp: 'Pido la cuenta.' },
                                { id: 'v332', idn: 'Pedas', esp: 'Picante', ex: 'Saya suka makanan pedas.', exEsp: 'Me gusta la comida picante.' },
                                { id: 'v333', idn: 'Tanpa', esp: 'Sin', ex: 'Tanpa nasi, ya.', exEsp: 'Sin arroz, por favor.' },
                                { id: 'v347', idn: 'Cabai', esp: 'Chile / ají', ex: 'Tanpa cabai, ya.', exEsp: 'Sin chile, por favor.' }
                            ],
                            exercises: [
                                { vocabId: 'v321', type: 'mc', prompt: '¿Qué significa «restoran»?', options: ['Restaurante', 'Mercado', 'Cuenta'], answer: 0, explanation: 'Restoran significa restaurante.' },
                                { vocabId: 'v322', type: 'translate_es_id', prompt: 'Traduce: menú / carta', answer: 'Menu', explanation: 'Menu se usa para la carta del restaurante.' },
                                { vocabId: 'v323', type: 'order', prompt: 'Ordena: Pido arroz frito.', words: ['goreng', 'Saya', 'pesan', 'nasi'], correctOrder: ['Saya', 'pesan', 'nasi', 'goreng'], explanation: 'Saya pesan nasi goreng significa «Pido arroz frito».' },
                                { vocabId: 'v324', type: 'listen', prompt: 'Escucha y escribe el plato.', answer: 'Nasi goreng', explanation: 'Nasi goreng significa arroz frito.' },
                                { vocabId: 'v325', type: 'mc', prompt: '¿Qué significa «mi» en este contexto?', options: ['Fideos', 'Pollo', 'Huevo'], answer: 0, explanation: 'Mi significa fideos o tallarines.' },
                                { vocabId: 'v326', type: 'translate_es_id', prompt: 'Traduce: verduras', answer: 'Sayur', explanation: 'Sayur significa verdura(s).' },
                                { vocabId: 'v327', type: 'mc', prompt: '¿Cómo se dice «pollo»?', options: ['Ikan', 'Ayam', 'Telur'], answer: 1, explanation: 'Ayam significa pollo.' },
                                { vocabId: 'v328', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Ikan', explanation: 'Ikan significa pescado.' },
                                { vocabId: 'v329', type: 'translate_es_id', prompt: 'Traduce: huevo', answer: 'Telur', explanation: 'Telur significa huevo.' },
                                { vocabId: 'v330', type: 'mc', prompt: '¿Qué significa «enak»?', options: ['Picante', 'Rico / sabroso', 'Sin'], answer: 1, explanation: 'Enak describe algo rico o sabroso.' },
                                { vocabId: 'v331', type: 'order', prompt: 'Ordena: Pido la cuenta.', words: ['tagihan', 'minta', 'Saya'], correctOrder: ['Saya', 'minta', 'tagihan'], explanation: 'Saya minta tagihan significa «Pido la cuenta».' },
                                { vocabId: 'v332', type: 'translate_es_id', prompt: 'Traduce: picante', answer: 'Pedas', explanation: 'Pedas significa picante.' },
                                { vocabId: 'v347', type: 'mc', prompt: 'Escucha la petición y elige qué solicita', audioText: 'Tanpa cabai, ya', options: ['Sin chile, por favor', 'Con mucho chile', 'Sin arroz, por favor'], answer: 0, explanation: 'Tanpa cabai, ya es una petición breve para pedir algo sin chile.' },
                                { vocabId: 'v347', type: 'mc', prompt: 'Escucha el diálogo del restaurante y elige qué pide el cliente', audioText: 'Selamat siang. Saya pesan nasi goreng. Tanpa cabai, ya? Ya, tanpa cabai.', options: ['Arroz frito sin chile', 'Sopa con mucho chile', 'Agua sin hielo'], answer: 0, explanation: 'El cliente pide nasi goreng (arroz frito) y confirma que lo quiere sin chile.' },
                                { vocabId: 'v324', type: 'write', prompt: 'Escribe un pedido sencillo en un restaurante.', hint: 'Usa Saya mau nasi goreng o Saya pesan ayam.', modelAnswer: 'Saya pesan nasi goreng.', explanation: 'Ejemplo de pedido: Saya pesan nasi goreng. — Pido arroz frito.' },
                                { vocabId: 'v330', type: 'write', prompt: 'Escribe una frase para decir que un plato está rico.', hint: 'Puedes usar Nasi goreng ini enak.', modelAnswer: 'Nasi goreng ini enak.', explanation: 'El demostrativo ini aparece después del sustantivo.' }
                            ]
                        },
                        {
                            id: 'a1_u20',
                            title: 'Unidad 20: En el mercado y de compras',
                            desc: 'Preguntar precios, comprar productos sencillos y hablar de cantidades.',
                            grammar: 'Puedes usar Saya mau beli ... (Quiero comprar ...) y Berapa? (¿Cuánto/cuántos?). Murah significa barato y mahal, caro. Para cantidades, satu kilo significa un kilo. Practica precios y compras con frases breves; el precio real depende del lugar y del momento.',
                            vocab: [
                                { id: 'v334', idn: 'Pasar', esp: 'Mercado', ex: 'Saya di pasar.', exEsp: 'Estoy en el mercado.' },
                                { id: 'v335', idn: 'Toko', esp: 'Tienda', ex: 'Saya di toko.', exEsp: 'Estoy en la tienda.' },
                                { id: 'v336', idn: 'Buah', esp: 'Fruta', ex: 'Saya beli buah.', exEsp: 'Compro fruta.' },
                                { id: 'v337', idn: 'Apel', esp: 'Manzana', ex: 'Saya mau apel.', exEsp: 'Quiero manzanas.' },
                                { id: 'v338', idn: 'Pisang', esp: 'Plátano / banana', ex: 'Saya beli pisang.', exEsp: 'Compro plátanos.' },
                                { id: 'v140', idn: 'Murah', esp: 'Barato/a', ex: 'Ini murah.', exEsp: 'Esto es barato.' },
                                { id: 'v141', idn: 'Mahal', esp: 'Caro/a', ex: 'Itu mahal.', exEsp: 'Eso es caro.' },
                                { id: 'v142', idn: 'Beli', esp: 'Comprar', ex: 'Saya mau beli apel.', exEsp: 'Quiero comprar manzanas.' },
                                { id: 'v136', idn: 'Uang', esp: 'Dinero', ex: 'Saya punya uang.', exEsp: 'Tengo dinero.' },
                                { id: 'v343', idn: 'Kilo', esp: 'Kilo', ex: 'Satu kilo pisang.', exEsp: 'Un kilo de plátanos.' },
                                { id: 'v344', idn: 'Satu kilo', esp: 'Un kilo', ex: 'Saya mau satu kilo apel.', exEsp: 'Quiero un kilo de manzanas.' },
                                { id: 'v345', idn: 'Kantong', esp: 'Bolsa', ex: 'Satu kantong apel.', exEsp: 'Una bolsa de manzanas.' },
                                { id: 'v346', idn: 'Berbelanja', esp: 'Hacer compras', ex: 'Saya berbelanja di pasar.', exEsp: 'Hago compras en el mercado.' }
                            ],
                            exercises: [
                                { vocabId: 'v334', type: 'mc', prompt: '¿Qué significa «pasar»?', options: ['Mercado', 'Tienda', 'Dinero'], answer: 0, explanation: 'Pasar significa mercado.' },
                                { vocabId: 'v335', type: 'translate_es_id', prompt: 'Traduce: tienda', answer: 'Toko', explanation: 'Toko significa tienda.' },
                                { vocabId: 'v336', type: 'order', prompt: 'Ordena: Compro fruta.', words: ['buah', 'beli', 'Saya'], correctOrder: ['Saya', 'beli', 'buah'], explanation: 'Saya beli buah significa «Compro fruta».' },
                                { vocabId: 'v337', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Apel', explanation: 'Apel significa manzana.' },
                                { vocabId: 'v338', type: 'mc', prompt: '¿Qué significa «pisang»?', options: ['Manzana', 'Plátano / banana', 'Bolsa'], answer: 1, explanation: 'Pisang significa plátano o banana.' },
                                { vocabId: 'v140', type: 'translate_es_id', prompt: 'Traduce: barato/a', answer: 'Murah', explanation: 'Murah significa barato/a.' },
                                { vocabId: 'v141', type: 'mc', prompt: '¿Qué significa «mahal»?', options: ['Caro/a', 'Barato/a', 'Fruta'], answer: 0, explanation: 'Mahal significa caro/a.' },
                                { vocabId: 'v142', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Beli', explanation: 'Beli significa comprar.' },
                                { vocabId: 'v136', type: 'translate_es_id', prompt: 'Traduce: dinero', answer: 'Uang', explanation: 'Uang significa dinero.' },
                                { vocabId: 'v343', type: 'mc', prompt: '¿Qué significa «kilo»?', options: ['Kilo', 'Bolsa', 'Mercado'], answer: 0, explanation: 'Kilo significa kilo.' },
                                { vocabId: 'v344', type: 'order', prompt: 'Ordena: Quiero un kilo de manzanas.', words: ['apel', 'mau', 'Saya', 'satu', 'kilo'], correctOrder: ['Saya', 'mau', 'satu', 'kilo', 'apel'], explanation: 'Saya mau satu kilo apel significa «Quiero un kilo de manzanas».' },
                                { vocabId: 'v345', type: 'translate_es_id', prompt: 'Traduce: bolsa', answer: 'Kantong', explanation: 'Kantong significa bolsa.' },
                                { vocabId: 'v346', type: 'mc', prompt: '¿Qué significa «berbelanja»?', options: ['Hacer compras', 'Comer', 'Dormir'], answer: 0, explanation: 'Berbelanja significa hacer compras.' },
                                { vocabId: 'v142', type: 'write', prompt: 'Escribe una frase sobre algo que quieres comprar.', hint: 'Usa Saya mau beli apel o Saya mau beli pisang.', modelAnswer: 'Saya mau beli apel.', explanation: 'Ejemplo: Saya mau beli apel. — Quiero comprar manzanas.' },
                                { vocabId: 'v140', type: 'write', prompt: 'Escribe una frase para describir un precio.', hint: 'Usa Ini murah o Itu mahal.', modelAnswer: 'Ini murah.', explanation: 'Ini murah significa «Esto es barato».' }
                            ]
                        },

                        {
                            id: 'a1_u21',
                            title: 'Unidad 21: El cuerpo y la salud',
                            desc: 'Nombrar partes del cuerpo y expresar síntomas sencillos.',
                            grammar: 'Saya sakit significa «Estoy enfermo/a»; para indicar una molestia se nombra la parte del cuerpo, por ejemplo Saya sakit kepala («Me duele la cabeza»). Demam significa fiebre, batuk significa tos/toser y sehat significa sano/a. Estas frases son práctica lingüística, no consejo médico.',
                            vocab: [
                                { id: 'v349', idn: 'Kepala', esp: 'Cabeza', ex: 'Kepala saya sakit.', exEsp: 'Me duele la cabeza.' },
                                { id: 'v350', idn: 'Tangan', esp: 'Mano / brazo', ex: 'Tangan saya sakit.', exEsp: 'Me duele la mano / el brazo.' },
                                { id: 'v351', idn: 'Kaki', esp: 'Pie / pierna', ex: 'Kaki saya sakit.', exEsp: 'Me duele el pie / la pierna.' },
                                { id: 'v352', idn: 'Mata', esp: 'Ojo(s)', ex: 'Mata saya sakit.', exEsp: 'Me duele el ojo / me duelen los ojos.' },
                                { id: 'v353', idn: 'Telinga', esp: 'Oreja / oído', ex: 'Telinga saya sakit.', exEsp: 'Me duele la oreja / el oído.' },
                                { id: 'v354', idn: 'Mulut', esp: 'Boca', ex: 'Mulut saya sakit.', exEsp: 'Me duele la boca.' },
                                { id: 'v355', idn: 'Sakit', esp: 'Enfermo/a; dolor (según contexto)', ex: 'Saya sakit kepala.', exEsp: 'Me duele la cabeza.' },
                                { id: 'v356', idn: 'Dokter', esp: 'Médico/a', ex: 'Saya ke dokter.', exEsp: 'Voy al médico.' },
                                { id: 'v357', idn: 'Obat', esp: 'Medicamento', ex: 'Ini obat.', exEsp: 'Esto es un medicamento.' },
                                { id: 'v358', idn: 'Demam', esp: 'Fiebre / tener fiebre', ex: 'Saya demam.', exEsp: 'Tengo fiebre.' },
                                { id: 'v359', idn: 'Batuk', esp: 'Tos / toser', ex: 'Saya batuk.', exEsp: 'Tengo tos / toso.' },
                                { id: 'v360', idn: 'Sehat', esp: 'Sano/a; estar bien de salud', ex: 'Saya sehat.', exEsp: 'Estoy sano/a.' }
                            ],
                            exercises: [
                                { vocabId: 'v349', type: 'mc', prompt: '¿Qué significa «kepala»?', options: ['Cabeza', 'Mano', 'Boca'], answer: 0, explanation: 'Kepala significa cabeza.' },
                                { vocabId: 'v350', type: 'translate_es_id', prompt: 'Traduce: mano / brazo', answer: 'Tangan', explanation: 'Tangan puede referirse a la mano o al brazo según el contexto.' },
                                { vocabId: 'v355', type: 'order', prompt: 'Ordena: Me duele la cabeza.', words: ['kepala', 'Saya', 'sakit'], correctOrder: ['Saya', 'sakit', 'kepala'], explanation: 'Saya sakit kepala expresa dolor de cabeza.' },
                                { vocabId: 'v358', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Demam', explanation: 'Demam significa fiebre.' },
                                { vocabId: 'v356', type: 'mc', prompt: '¿Quién atiende a una persona enferma?', options: ['Dokter', 'Obat', 'Kaki'], answer: 0, explanation: 'Dokter significa médico/a.' },
                                { vocabId: 'v357', type: 'translate_es_id', prompt: 'Traduce: medicamento', answer: 'Obat', explanation: 'Obat significa medicamento o medicina.' },
                                { vocabId: 'v358', type: 'order', prompt: 'Ordena: Tengo fiebre.', words: ['demam', 'Saya'], correctOrder: ['Saya', 'demam'], explanation: 'Saya demam significa «Tengo fiebre».' },
                                { vocabId: 'v359', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Batuk', explanation: 'Batuk significa tos o toser.' },
                                { vocabId: 'v360', type: 'translate_es_id', prompt: 'Traduce: sano/a', answer: 'Sehat', explanation: 'Sehat describe un buen estado de salud.' },
                                { vocabId: 'v352', type: 'mc', prompt: '¿Qué significa «mata»?', options: ['Ojo(s)', 'Oído', 'Pie'], answer: 0, explanation: 'Mata significa ojo; en contexto puede referirse a los ojos.' },
                                { vocabId: 'v356', type: 'order', prompt: 'Ordena: Voy al médico.', words: ['dokter', 'Saya', 'ke'], correctOrder: ['Saya', 'ke', 'dokter'], explanation: 'Saya ke dokter significa «Voy al médico».' },
                                { vocabId: 'v355', type: 'mc', prompt: 'Escucha la frase y elige qué le ocurre a la persona', audioText: 'Saya sakit kepala', options: ['Tiene fiebre', "Me duele la cabeza", 'Tiene tos'], answer: 1, explanation: 'Saya sakit kepala significa «Me duele la cabeza».' },
                                { vocabId: 'v353', type: 'translate_es_id', prompt: 'Traduce: oreja / oído', answer: 'Telinga', explanation: 'Telinga significa oreja u oído.' },
                                { vocabId: 'v358', type: 'write', prompt: 'Escribe una frase sencilla para decir que tienes fiebre.', hint: 'Usa Saya demam.', modelAnswer: 'Saya demam.', explanation: 'Saya demam significa «Tengo fiebre».' },
                                { vocabId: 'v360', type: 'write', prompt: 'Escribe una frase para decir que estás bien de salud.', hint: 'Usa Saya sehat.', modelAnswer: 'Saya sehat.', explanation: 'Saya sehat significa «Estoy sano/a».' }
                            ]
                        },
                        {
                            id: 'a1_u22',
                            title: 'Unidad 22: Ropa y colores',
                            desc: 'Hablar de prendas, colores y qué ropa se lleva.',
                            grammar: 'El color suele colocarse después del sustantivo: jaket merah (chaqueta roja), celana hitam (pantalón negro). Pakai significa llevar puesto o usar. Puedes describir una prenda con frases breves como Saya pakai kaus (Llevo una camiseta).',
                            vocab: [
                                { id: 'v361', idn: 'Jaket', esp: 'Chaqueta', ex: 'Jaket saya merah.', exEsp: 'Mi chaqueta es roja.' },
                                { id: 'v362', idn: 'Celana', esp: 'Pantalón', ex: 'Celana saya hitam.', exEsp: 'Mi pantalón es negro.' },
                                { id: 'v363', idn: 'Sepatu', esp: 'Zapatos', ex: 'Sepatu saya hitam.', exEsp: 'Mis zapatos son negros.' },
                                { id: 'v364', idn: 'Kaus', esp: 'Camiseta', ex: 'Saya pakai kaus putih.', exEsp: 'Llevo una camiseta blanca.' },
                                { id: 'v365', idn: 'Ukuran', esp: 'Talla / tamaño', ex: 'Ukuran ini besar.', exEsp: 'Esta talla es grande.' },
                                { id: 'v366', idn: 'Warna', esp: 'Color', ex: 'Warna jaket ini merah.', exEsp: 'El color de esta chaqueta es rojo.' },
                                { id: 'v367', idn: 'Merah', esp: 'Rojo/a', ex: 'Jaket saya merah.', exEsp: 'Mi chaqueta es roja.' },
                                { id: 'v368', idn: 'Biru', esp: 'Azul', ex: 'Jaket saya biru.', exEsp: 'Mi chaqueta es azul.' },
                                { id: 'v369', idn: 'Hitam', esp: 'Negro/a', ex: 'Celana saya hitam.', exEsp: 'Mi pantalón es negro.' },
                                { id: 'v370', idn: 'Putih', esp: 'Blanco/a', ex: 'Kaus saya putih.', exEsp: 'Mi camiseta es blanca.' },
                                { id: 'v371', idn: 'Pakai', esp: 'Llevar puesto / usar', ex: 'Saya pakai jaket.', exEsp: 'Llevo una chaqueta.' },
                                { id: 'v372', idn: 'Cocok', esp: 'Quedar bien / ser adecuado', ex: 'Jaket ini cocok untuk saya.', exEsp: 'Esta chaqueta me queda bien.' }
                            ],
                            exercises: [
                                { vocabId: 'v361', type: 'mc', prompt: '¿Qué significa «jaket»?', options: ['Chaqueta', 'Zapatos', 'Color'], answer: 0, explanation: 'Jaket significa chaqueta; es una prenda exterior.' },
                                { vocabId: 'v362', type: 'translate_es_id', prompt: 'Traduce: pantalón', answer: 'Celana', explanation: 'Celana significa pantalón.' },
                                { vocabId: 'v367', type: 'order', prompt: 'Ordena: chaqueta roja.', words: ['merah', 'Jaket'], correctOrder: ['Jaket', 'merah'], explanation: 'En esta frase nominal, el color va después del sustantivo.' },
                                { vocabId: 'v368', type: 'listen', prompt: 'Escucha y escribe el color.', answer: 'Biru', explanation: 'Biru significa azul.' },
                                { vocabId: 'v363', type: 'mc', prompt: '¿Qué significa «sepatu»?', options: ['Zapatos', 'Camiseta', 'Pantalón'], answer: 0, explanation: 'Sepatu significa zapatos.' },
                                { vocabId: 'v364', type: 'translate_es_id', prompt: 'Traduce: camiseta', answer: 'Kaus', explanation: 'Kaus es una camiseta.' },
                                { vocabId: 'v369', type: 'order', prompt: 'Ordena: pantalón negro.', words: ['hitam', 'Celana'], correctOrder: ['Celana', 'hitam'], explanation: 'Hitam (negro) aparece después de celana (pantalón).' },
                                { vocabId: 'v370', type: 'listen', prompt: 'Escucha y escribe el color.', answer: 'Putih', explanation: 'Putih significa blanco.' },
                                { vocabId: 'v366', type: 'translate_es_id', prompt: 'Traduce: color', answer: 'Warna', explanation: 'Warna significa color.' },
                                { vocabId: 'v371', type: 'mc', prompt: '¿Qué significa «pakai»?', options: ['Llevar puesto / usar', 'Comprar', 'Dormir'], answer: 0, explanation: 'Pakai puede significar usar o llevar puesto.' },
                                { vocabId: 'v364', type: 'order', prompt: 'Ordena: Llevo una camiseta.', words: ['kaus', 'pakai', 'Saya'], correctOrder: ['Saya', 'pakai', 'kaus'], explanation: 'Saya pakai kaus significa «Llevo una camiseta».' },
                                { vocabId: 'v367', type: 'listen', prompt: 'Escucha y escribe la frase.', answer: 'Jaket merah', explanation: 'Jaket merah significa «chaqueta roja».' },
                                { vocabId: 'v365', type: 'translate_es_id', prompt: 'Traduce: talla / tamaño', answer: 'Ukuran', explanation: 'Ukuran significa talla o tamaño.' },
                                { vocabId: 'v372', type: 'write', prompt: 'Escribe una frase para describir una prenda que queda bien.', hint: 'Puedes usar Jaket ini cocok.', modelAnswer: 'Jaket ini cocok.', explanation: 'Cocok significa que algo queda bien o es adecuado.' },
                                { vocabId: 'v370', type: 'write', prompt: 'Escribe una frase con una camiseta blanca.', hint: 'Usa Kaus putih.', modelAnswer: 'Kaus putih.', explanation: 'El color putih va después de kaus.' }
                            
                                , { vocabId: 'v364', type: 'mc', prompt: 'Escucha qué ropa lleva la persona', audioText: 'Saya pakai kaus putih.', options: ["Llevo una camiseta blanca","Lleva una chaqueta roja","Lleva zapatos negros"], answer: 0, explanation: 'Kaus putih significa camiseta blanca.' }
                            ]
                        },
                        {
                            id: 'a1_u23',
                            title: 'Unidad 23: Las habitaciones y la casa',
                            desc: 'Nombrar habitaciones y objetos domésticos y describir espacios sencillos.',
                            grammar: 'Para decir dónde está algo, puedes usar di + lugar: di kamar (en la habitación). Ada expresa existencia: Di dapur ada kulkas (En la cocina hay una nevera). Los adjetivos pueden aparecer después del sustantivo o en frases sencillas: Kamar saya bersih (Mi habitación está limpia).',
                            vocab: [
                                { id: 'v373', idn: 'Kamar', esp: 'Habitación / cuarto', ex: 'Saya di kamar.', exEsp: 'Estoy en la habitación.' },
                                { id: 'v374', idn: 'Dapur', esp: 'Cocina', ex: 'Saya di dapur.', exEsp: 'Estoy en la cocina.' },
                                { id: 'v375', idn: 'Kamar mandi', esp: 'Cuarto de baño', ex: 'Kamar mandi ada di sini.', exEsp: 'El cuarto de baño está aquí.' },
                                { id: 'v376', idn: 'Atap', esp: 'Techo / tejado', ex: 'Atap rumah itu merah.', exEsp: 'El techo de esa casa es rojo.' },
                                { id: 'v377', idn: 'Jendela', esp: 'Ventana', ex: 'Jendela ada di kamar.', exEsp: 'La ventana está en la habitación.' },
                                { id: 'v378', idn: 'Lantai', esp: 'Suelo / piso', ex: 'Lantai kamar bersih.', exEsp: 'El suelo de la habitación está limpio.' },
                                { id: 'v379', idn: 'Dinding', esp: 'Pared', ex: 'Dinding kamar putih.', exEsp: 'La pared de la habitación es blanca.' },
                                { id: 'v380', idn: 'Tempat tidur', esp: 'Cama', ex: 'Tempat tidur ada di kamar.', exEsp: 'La cama está en la habitación.' },
                                { id: 'v381', idn: 'Kulkas', esp: 'Nevera / refrigerador', ex: 'Kulkas ada di dapur.', exEsp: 'La nevera está en la cocina.' },
                                { id: 'v382', idn: 'Lampu', esp: 'Lámpara / luz', ex: 'Lampu ada di kamar.', exEsp: 'La lámpara está en la habitación.' },
                                { id: 'v383', idn: 'Bersih', esp: 'Limpio/a', ex: 'Kamar saya bersih.', exEsp: 'Mi habitación está limpia.' },
                                { id: 'v384', idn: 'Kotor', esp: 'Sucio/a', ex: 'Lantai kotor.', exEsp: 'El suelo está sucio.' }
                            ],
                            exercises: [
                                { vocabId: 'v373', type: 'mc', prompt: '¿Qué significa «kamar»?', options: ['Habitación', 'Cocina', 'Ventana'], answer: 0, explanation: 'Kamar significa habitación o cuarto.' },
                                { vocabId: 'v374', type: 'translate_es_id', prompt: 'Traduce: cocina', answer: 'Dapur', explanation: 'Dapur significa cocina.' },
                                { vocabId: 'v374', type: 'order', prompt: 'Ordena: Estoy en la cocina.', words: ['dapur', 'di', 'Saya'], correctOrder: ['Saya', 'di', 'dapur'], explanation: 'Saya di dapur significa «Estoy en la cocina».' },
                                { vocabId: 'v381', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Kulkas', explanation: 'Kulkas significa nevera o refrigerador.' },
                                { vocabId: 'v376', type: 'mc', prompt: '¿Qué significa «atap»?', options: ['Tejado', 'Suelo', 'Cama'], answer: 0, explanation: 'Atap significa tejado.' },
                                { vocabId: 'v377', type: 'translate_es_id', prompt: 'Traduce: ventana', answer: 'Jendela', explanation: 'Jendela significa ventana.' },
                                { vocabId: 'v382', type: 'order', prompt: 'Ordena: La lámpara está en la habitación.', words: ['kamar', 'ada', 'Lampu', 'di'], correctOrder: ['Lampu', 'ada', 'di', 'kamar'], explanation: 'Lampu ada di kamar significa «La lámpara está en la habitación».' },
                                { vocabId: 'v380', type: 'listen', prompt: 'Escucha y escribe la expresión.', answer: 'Tempat tidur', explanation: 'Tempat tidur significa cama.' },
                                { vocabId: 'v378', type: 'translate_es_id', prompt: 'Traduce: suelo / piso', answer: 'Lantai', explanation: 'Lantai significa suelo o piso.' },
                                { vocabId: 'v383', type: 'mc', prompt: '¿Qué significa «bersih»?', options: ['Limpio/a', 'Sucio/a', 'Habitación'], answer: 0, explanation: 'Bersih significa limpio/a.' },
                                { vocabId: 'v374', type: 'order', prompt: 'Ordena: En la cocina hay una nevera.', words: ['kulkas', 'ada', 'dapur', 'Di'], correctOrder: ['Di', 'dapur', 'ada', 'kulkas'], explanation: 'Di dapur ada kulkas significa «En la cocina hay una nevera».' },
                                { vocabId: 'v384', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Kotor', explanation: 'Kotor significa sucio/a.' },
                                { vocabId: 'v379', type: 'translate_es_id', prompt: 'Traduce: pared', answer: 'Dinding', explanation: 'Dinding significa pared.' },
                                { vocabId: 'v383', type: 'write', prompt: 'Escribe una frase para describir una habitación limpia.', hint: 'Usa Kamar saya bersih.', modelAnswer: 'Kamar saya bersih.', explanation: 'Kamar saya bersih significa «Mi habitación está limpia».' },
                                { vocabId: 'v382', type: 'write', prompt: 'Escribe dónde está la lámpara.', hint: 'Usa Lampu di kamar.', modelAnswer: 'Lampu di kamar.', explanation: 'Di kamar significa «en la habitación».' }
                            
                                , { vocabId: 'v374', type: 'mc', prompt: 'Escucha dónde está la persona', audioText: 'Saya di dapur.', options: ["Estoy en la cocina","Está en el dormitorio","Está en la escuela"], answer: 0, explanation: 'Dapur significa cocina.' }
                            ]
                        },
                        {
                            id: 'a1_u24',
                            title: 'Unidad 24: La escuela y el estudio',
                            desc: 'Hablar de clases, materiales y actividades de estudio.',
                            grammar: 'Para hablar de actividades de estudio, usa el sujeto seguido del verbo: Saya belajar (estudio/aprendo), Saya membaca buku (leo un libro). En indonesio, el sujeto puede omitirse cuando el contexto es claro, pero aquí practicamos frases completas.',
                            vocab: [
                                { id: 'v385', idn: 'Kantin', esp: 'Cafetería / comedor escolar', ex: 'Kantin sekolah itu besar.', exEsp: 'La cafetería de la escuela es grande.' },
                                { id: 'v386', idn: 'Guru', esp: 'Docente / profesor/a', ex: 'Guru itu ramah.', exEsp: 'Ese/a profesor/a es amable.' },
                                { id: 'v387', idn: 'Murid', esp: 'Alumno/a', ex: 'Saya murid.', exEsp: 'Soy estudiante.' },
                                { id: 'v388', idn: 'Penghapus', esp: 'Borrador / goma de borrar', ex: 'Ini penghapus saya.', exEsp: 'Este es mi borrador.' },
                                { id: 'v389', idn: 'Pensil', esp: 'Lápiz', ex: 'Saya punya pensil.', exEsp: 'Tengo un lápiz.' },
                                { id: 'v390', idn: 'Menjawab', esp: 'Responder', ex: 'Murid menjawab.', exEsp: 'El alumno responde.' },
                                { id: 'v391', idn: 'Membaca', esp: 'Leer', ex: 'Saya membaca buku.', exEsp: 'Leo un libro.' },
                                { id: 'v392', idn: 'Menulis', esp: 'Escribir', ex: 'Dia menulis.', exEsp: 'Él/ella escribe.' },
                                { id: 'v393', idn: 'Kelas', esp: 'Clase / aula', ex: 'Kelas saya besar.', exEsp: 'Mi aula es grande.' },
                                { id: 'v394', idn: 'Tugas', esp: 'Tarea', ex: 'Ini tugas saya.', exEsp: 'Esta es mi tarea.' }
                            ],
                            exercises: [
                                { vocabId: 'v385', type: 'mc', prompt: '¿Qué significa «kantin»?', options: ['Libro', 'Cafetería', 'Lápiz'], answer: 1, explanation: 'Kantin significa cafetería o comedor.' },
                                { vocabId: 'v386', type: 'translate_es_id', prompt: 'Traduce: profesor/a', answer: 'Guru', explanation: 'Guru significa docente o profesor/a.' },
                                { vocabId: 'v388', type: 'order', prompt: 'Ordena: Este es mi borrador.', words: ['saya', 'penghapus', 'Ini'], correctOrder: ['Ini', 'penghapus', 'saya'], explanation: 'Ini penghapus saya significa «Este es mi borrador».' },
                                { vocabId: 'v389', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Pensil', explanation: 'Pensil significa lápiz.' },
                                { vocabId: 'v390', type: 'mc', prompt: '¿Qué significa «menjawab»?', options: ['Comprar', 'Escribir', 'Responder'], answer: 2, explanation: 'Menjawab significa responder.' },
                                { vocabId: 'v391', type: 'translate_es_id', prompt: 'Traduce: leer', answer: 'Membaca', explanation: 'Membaca significa leer.' },
                                { vocabId: 'v392', type: 'order', prompt: 'Ordena: Él/ella escribe.', words: ['menulis', 'Dia'], correctOrder: ['Dia', 'menulis'], explanation: 'Dia menulis significa «Él/ella escribe».' },
                                { vocabId: 'v394', type: 'write', prompt: 'Escribe una frase para decir «Esta es mi tarea».', hint: 'Usa Ini tugas saya.', modelAnswer: 'Ini tugas saya.', explanation: 'Ini tugas saya significa «Esta es mi tarea».' }
                            
                                , { vocabId: 'v391', type: 'mc', prompt: 'Escucha qué hace el estudiante', audioText: 'Saya membaca buku.', options: ["Leo un libro","Escribe una carta","Responde al profesor"], answer: 0, explanation: 'Membaca buku significa leer un libro.' }
                            ]
                        },
                        {
                            id: 'a1_u25',
                            title: 'Unidad 25: Aficiones y tiempo libre',
                            desc: 'Decir qué actividades te gustan y qué haces en tu tiempo libre.',
                            grammar: 'Usa suka antes de una actividad para expresar gusto: Saya suka membaca (me gusta leer). Para hablar de una actividad, puede aparecer un verbo después de suka. No hace falta añadir una conjugación verbal por persona.',
                            vocab: [
                                { id: 'v395', idn: 'Hobi', esp: 'Afición / pasatiempo', ex: 'Apa hobi kamu?', exEsp: '¿Cuál es tu afición?' },
                                { id: 'v396', idn: 'Musik', esp: 'Música', ex: 'Saya suka musik.', exEsp: 'Me gusta la música.' },
                                { id: 'v397', idn: 'Berenang', esp: 'Nadar', ex: 'Saya suka berenang.', exEsp: 'Me gusta nadar.' },
                                { id: 'v398', idn: 'Sepak bola', esp: 'Fútbol', ex: 'Dia suka sepak bola.', exEsp: 'A él/ella le gusta el fútbol.' },
                                { id: 'v399', idn: 'Melukis', esp: 'Pintar / hacer dibujos', ex: 'Saya suka melukis.', exEsp: 'Me gusta pintar.' },
                                { id: 'v400', idn: 'Menonton', esp: 'Ver / mirar', ex: 'Saya menonton film.', exEsp: 'Veo una película.' },
                                { id: 'v401', idn: 'Bermain', esp: 'Jugar', ex: 'Kami bermain bola.', exEsp: 'Jugamos a la pelota.' },
                                { id: 'v402', idn: 'Akhir pekan', esp: 'Fin de semana', ex: 'Saya membaca pada akhir pekan.', exEsp: 'Leo durante el fin de semana.' },
                                { id: 'v403', idn: 'Menyanyi', esp: 'Cantar', ex: 'Dia suka menyanyi.', exEsp: 'A él/ella le gusta cantar.' },
                                { id: 'v404', idn: 'Menari', esp: 'Bailar', ex: 'Saya belajar menari.', exEsp: 'Estoy aprendiendo a bailar.' }
                            ],
                            exercises: [
                                { vocabId: 'v395', type: 'mc', prompt: '¿Qué significa «hobi»?', options: ['Afición', 'Escuela', 'Precio'], answer: 0, explanation: 'Hobi significa afición o pasatiempo.' },
                                { vocabId: 'v397', type: 'translate_es_id', prompt: 'Traduce: nadar', answer: 'Berenang', explanation: 'Berenang significa nadar.' },
                                { vocabId: 'v396', type: 'order', prompt: 'Ordena: Me gusta la música.', words: ['musik', 'suka', 'Saya'], correctOrder: ['Saya', 'suka', 'musik'], explanation: 'Saya suka musik significa «Me gusta la música».' },
                                { vocabId: 'v398', type: 'listen', prompt: 'Escucha y escribe la expresión.', answer: 'Sepak bola', explanation: 'Sepak bola significa fútbol.' },
                                { vocabId: 'v399', type: 'mc', prompt: '¿Qué significa «melukis»?', options: ['Cantar', 'Pintar', 'Bailar'], answer: 1, explanation: 'Melukis significa pintar o hacer dibujos.' },
                                { vocabId: 'v400', type: 'translate_es_id', prompt: 'Traduce: ver / mirar', answer: 'Menonton', explanation: 'Menonton significa ver o mirar.' },
                                { vocabId: 'v403', type: 'order', prompt: 'Ordena: A él/ella le gusta cantar.', words: ['menyanyi', 'Dia', 'suka'], correctOrder: ['Dia', 'suka', 'menyanyi'], explanation: 'Dia suka menyanyi significa «Le gusta cantar».' },
                                { vocabId: 'v404', type: 'write', prompt: 'Escribe una frase para decir «Me gusta bailar».', hint: 'Usa Saya suka menari.', modelAnswer: 'Saya suka menari.', explanation: 'Saya suka menari significa «Me gusta bailar».' }
                            
                                , { vocabId: 'v397', type: 'mc', prompt: 'Escucha qué actividad le gusta', audioText: 'Saya suka berenang.', options: ["Me gusta nadar","Le gusta bailar","Le gusta pintar"], answer: 0, explanation: 'Suka berenang significa gustar de nadar.' }
                            ]
                        },
                        {
                            id: 'a1_u26',
                            title: 'Unidad 26: Cómo llegar a un lugar',
                            desc: 'Comprender indicaciones sencillas y preguntar por una dirección.',
                            grammar: 'Las indicaciones pueden darse con expresiones breves: belok kiri (gira a la izquierda), belok kanan (gira a la derecha), jalan lurus (sigue recto). Di indica ubicación, mientras que ke puede indicar dirección o destino.',
                            vocab: [
                                { id: 'v405', idn: 'Jalan', esp: 'Calle / camino', ex: 'Jalan ini panjang.', exEsp: 'Esta calle es larga.' },
                                { id: 'v406', idn: 'Kiri', esp: 'Izquierda', ex: 'Belok kiri.', exEsp: 'Gira a la izquierda.' },
                                { id: 'v407', idn: 'Kanan', esp: 'Derecha', ex: 'Belok kanan.', exEsp: 'Gira a la derecha.' },
                                { id: 'v408', idn: 'Lurus', esp: 'Recto (sin girar)', ex: 'Jalan lurus.', exEsp: 'Sigue recto.' },
                                { id: 'v409', idn: 'Seberang', esp: 'Al otro lado / enfrente', ex: 'Toko di seberang jalan.', exEsp: 'La tienda está al otro lado de la calle.' },
                                { id: 'v410', idn: 'Jauh', esp: 'Lejos', ex: 'Rumah saya jauh.', exEsp: 'Mi casa está lejos.' },
                                { id: 'v411', idn: 'Depan', esp: 'Delante / parte delantera', ex: 'Toko ada di depan rumah.', exEsp: 'La tienda está delante de la casa.' },
                                { id: 'v412', idn: 'Belakang', esp: 'Parte trasera / detrás', ex: 'Mobil di belakang rumah.', exEsp: 'El coche está detrás de la casa.' },
                                { id: 'v413', idn: 'Belok', esp: 'Girar', ex: 'Belok di sini.', exEsp: 'Gira aquí.' },
                                { id: 'v414', idn: 'Peta', esp: 'Mapa', ex: 'Ini peta.', exEsp: 'Este es un mapa.' }
                            ],
                            exercises: [
                                { vocabId: 'v406', type: 'mc', prompt: '¿Qué significa «kiri»?', options: ['Derecha', 'Lejos', 'Izquierda'], answer: 2, explanation: 'Kiri significa izquierda.' },
                                { vocabId: 'v407', type: 'translate_es_id', prompt: 'Traduce: derecha', answer: 'Kanan', explanation: 'Kanan significa derecha.' },
                                { vocabId: 'v408', type: 'order', prompt: 'Ordena: Sigue recto.', words: ['lurus', 'Jalan'], correctOrder: ['Jalan', 'lurus'], explanation: 'Jalan lurus es una indicación breve para seguir recto.' },
                                { vocabId: 'v414', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Peta', explanation: 'Peta significa mapa.' },
                                { vocabId: 'v409', type: 'mc', prompt: '¿Qué significa «seberang»?', options: ['Al otro lado', 'Lejos', 'Detrás'], answer: 0, explanation: 'Seberang significa el otro lado o enfrente.' },
                                { vocabId: 'v413', type: 'translate_es_id', prompt: 'Traduce: girar', answer: 'Belok', explanation: 'Belok significa girar.' },
                                { vocabId: 'v406', type: 'order', prompt: 'Ordena: Gira a la izquierda.', words: ['kiri', 'Belok'], correctOrder: ['Belok', 'kiri'], explanation: 'Belok kiri significa «Gira a la izquierda».' },
                                { vocabId: 'v410', type: 'write', prompt: 'Escribe una frase para decir «Mi casa está lejos».', hint: 'Usa Rumah saya jauh.', modelAnswer: 'Rumah saya jauh.', explanation: 'Rumah saya jauh significa «Mi casa está lejos».' }
                            
                                , { vocabId: 'v406', type: 'mc', prompt: 'Escucha la indicación y elige hacia dónde girar', audioText: 'Belok kiri.', options: ["A la izquierda","A la derecha","Sigue recto"], answer: 0, explanation: 'Belok kiri significa gira a la izquierda.' }
                            ]
                        },
                        {
                            id: 'a1_u27',
                            title: 'Unidad 27: Invitaciones y planes',
                            desc: 'Proponer actividades y hablar de planes sencillos para hoy o mañana.',
                            grammar: 'Besok significa mañana (el día siguiente) y nanti puede significar más tarde. Para proponer algo puedes preguntar Mau ...? (¿Quieres ...?) o usar Ayo ...! (¡Vamos a ...!). El significado concreto depende de la frase y el contexto.',
                            vocab: [
                                { id: 'v415', idn: 'Lusa', esp: 'Pasado mañana', ex: 'Lusa saya datang.', exEsp: 'Vendré pasado mañana.' },
                                { id: 'v416', idn: 'Sebentar', esp: 'Un momento / brevemente', ex: 'Saya kembali sebentar.', exEsp: 'Vuelvo en un momento.' },
                                { id: 'v417', idn: 'Mengajak', esp: 'Invitar a alguien / proponer que acompañe', ex: 'Saya mengajak teman.', exEsp: 'Invito a un amigo.' },
                                { id: 'v418', idn: 'Mengunjungi', esp: 'Visitar', ex: 'Saya mengunjungi teman.', exEsp: 'Visito a un amigo.' },
                                { id: 'v419', idn: 'Berjalan', esp: 'Caminar', ex: 'Saya berjalan ke toko.', exEsp: 'Camino a la tienda.' },
                                { id: 'v420', idn: 'Bertemu', esp: 'Encontrarse / reunirse', ex: 'Saya bertemu teman.', exEsp: 'Me encuentro con un amigo.' },
                                { id: 'v421', idn: 'Ayo', esp: 'Vamos / ¡venga!', ex: 'Ayo makan!', exEsp: '¡Vamos a comer!' },
                                { id: 'v422', idn: 'Mungkin', esp: 'Quizá / posiblemente', ex: 'Mungkin saya datang.', exEsp: 'Quizá venga.' },
                                { id: 'v423', idn: 'Malam ini', esp: 'Esta noche', ex: 'Malam ini saya sibuk.', exEsp: 'Esta noche estoy ocupado/a.' },
                                { id: 'v424', idn: 'Rencana', esp: 'Plan', ex: 'Ini rencana saya.', exEsp: 'Este es mi plan.' }
                            ],
                            exercises: [
                                { vocabId: 'v415', type: 'mc', prompt: '¿Qué significa «lusa»?', options: ['Ayer', 'Pasado mañana', 'Ahora'], answer: 1, explanation: 'Lusa significa pasado mañana.' },
                                { vocabId: 'v416', type: 'translate_es_id', prompt: 'Traduce: un momento', answer: 'Sebentar', explanation: 'Sebentar significa un momento o brevemente.' },
                                { vocabId: 'v417', type: 'order', prompt: 'Ordena: Invito a un amigo.', words: ['teman', 'Saya', 'mengajak'], correctOrder: ['Saya', 'mengajak', 'teman'], explanation: 'Saya mengajak teman significa «Invito a un amigo».' },
                                { vocabId: 'v421', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Ayo', explanation: 'Ayo se usa para animar a hacer algo juntos.' },
                                { vocabId: 'v418', type: 'mc', prompt: '¿Qué significa «mengunjungi»?', options: ['Irse', 'Dormir', 'Visitar'], answer: 2, explanation: 'Mengunjungi significa visitar.' },
                                { vocabId: 'v419', type: 'translate_es_id', prompt: 'Traduce: caminar', answer: 'Berjalan', explanation: 'Berjalan significa caminar.' },
                                { vocabId: 'v422', type: 'order', prompt: 'Ordena: Quizá venga.', words: ['datang', 'Mungkin', 'saya'], correctOrder: ['Mungkin', 'saya', 'datang'], explanation: 'Mungkin saya datang significa «Quizá venga».' },
                                { vocabId: 'v423', type: 'write', prompt: 'Escribe una frase para decir «Esta noche estoy ocupado/a».', hint: 'Usa Malam ini saya sibuk.', modelAnswer: 'Malam ini saya sibuk.', explanation: 'Malam ini saya sibuk significa «Esta noche estoy ocupado/a».' }
                            
                                , { vocabId: 'v421', type: 'mc', prompt: 'Escucha la invitación y elige qué propone', audioText: 'Ayo makan!', options: ["¡Vamos a comer!","¡Vamos a dormir!","¡Vamos a estudiar!"], answer: 0, explanation: 'Ayo introduce una invitación o propuesta.' }
                            ]
                        },
                        {
                            id: 'a1_u28',
                            title: 'Unidad 28: Viajes y alojamiento',
                            desc: 'Reconocer vocabulario básico para viajar y alojarse.',
                            grammar: 'Usa ke para expresar destino: ke bandara (al aeropuerto), ke hotel (al hotel). Para preguntar por una reserva puedes decir Ada reservasi? (¿Hay una reserva?). Las frases son modelos breves; el trato cortés depende de la situación.',
                            vocab: [
                                { id: 'v425', idn: 'Hotel', esp: 'Hotel', ex: 'Saya di hotel.', exEsp: 'Estoy en el hotel.' },
                                { id: 'v426', idn: 'Paspor', esp: 'Pasaporte', ex: 'Ini paspor saya.', exEsp: 'Este es mi pasaporte.' },
                                { id: 'v427', idn: 'Tiket', esp: 'Billete / boleto / entrada', ex: 'Saya punya tiket.', exEsp: 'Tengo un billete.' },
                                { id: 'v428', idn: 'Bandara', esp: 'Aeropuerto', ex: 'Saya pergi ke bandara.', exEsp: 'Voy al aeropuerto.' },
                                { id: 'v429', idn: 'Pesawat', esp: 'Avión', ex: 'Saya naik pesawat.', exEsp: 'Viajo en avión.' },
                                { id: 'v430', idn: 'Kapal', esp: 'Barco', ex: 'Kapal itu besar.', exEsp: 'Ese barco es grande.' },
                                { id: 'v431', idn: 'Koper', esp: 'Maleta', ex: 'Koper saya besar.', exEsp: 'Mi maleta es grande.' },
                                { id: 'v432', idn: 'Tiba', esp: 'Llegar', ex: 'Kereta tiba pada pagi hari.', exEsp: 'El tren llega por la mañana.' },
                                { id: 'v433', idn: 'Reservasi', esp: 'Reserva', ex: 'Saya punya reservasi.', exEsp: 'Tengo una reserva.' },
                                { id: 'v434', idn: 'Stempel', esp: 'Sello (oficial)', ex: 'Saya perlu stempel di paspor.', exEsp: 'Necesito un sello en el pasaporte.' }
                            ],
                            exercises: [
                                { vocabId: 'v426', type: 'mc', prompt: '¿Qué significa «paspor»?', options: ['Pasaporte', 'Maleta', 'Tren'], answer: 0, explanation: 'Paspor significa pasaporte.' },
                                { vocabId: 'v427', type: 'translate_es_id', prompt: 'Traduce: billete / boleto', answer: 'Tiket', explanation: 'Tiket puede ser billete, boleto o entrada.' },
                                { vocabId: 'v428', type: 'order', prompt: 'Ordena: Voy al aeropuerto.', words: ['bandara', 'ke', 'Saya', 'pergi'], correctOrder: ['Saya', 'pergi', 'ke', 'bandara'], explanation: 'Saya pergi ke bandara significa «Voy al aeropuerto».' },
                                { vocabId: 'v429', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Pesawat', explanation: 'Pesawat significa avión.' },
                                { vocabId: 'v431', type: 'mc', prompt: '¿Qué significa «koper»?', options: ['Hotel', 'Maleta', 'Sello'], answer: 1, explanation: 'Koper significa maleta.' },
                                { vocabId: 'v432', type: 'translate_es_id', prompt: 'Traduce: llegar', answer: 'Tiba', explanation: 'Tiba significa llegar.' },
                                { vocabId: 'v433', type: 'order', prompt: 'Ordena: Tengo una reserva.', words: ['reservasi', 'punya', 'Saya'], correctOrder: ['Saya', 'punya', 'reservasi'], explanation: 'Saya punya reservasi significa «Tengo una reserva».' },
                                { vocabId: 'v425', type: 'write', prompt: 'Escribe una frase para decir «Estoy en el hotel».', hint: 'Usa Saya di hotel.', modelAnswer: 'Saya di hotel.', explanation: 'Saya di hotel significa «Estoy en el hotel».' }
                            
                                , { vocabId: 'v433', type: 'mc', prompt: 'Escucha qué informa la persona', audioText: 'Saya punya reservasi.', options: ["Tengo una reserva","Ha perdido el pasaporte","Necesita un billete"], answer: 0, explanation: 'Reservasi significa reserva.' }
                            ]
                        },
                        {
                            id: 'a1_u29',
                            title: 'Unidad 29: Frecuencia y hábitos',
                            desc: 'Describir hábitos con expresiones sencillas de frecuencia.',
                            grammar: 'Las expresiones de frecuencia suelen aparecer antes del verbo o después del sujeto: Saya selalu belajar (siempre estudio), Saya kadang-kadang membaca (a veces leo). Cada adverbio puede variar de posición según el énfasis.',
                            vocab: [
                                { id: 'v435', idn: 'Selalu', esp: 'Siempre', ex: 'Saya selalu belajar.', exEsp: 'Siempre estudio.' },
                                { id: 'v436', idn: 'Biasanya', esp: 'Normalmente / por lo general', ex: 'Saya biasanya bangun pagi.', exEsp: 'Normalmente me levanto temprano.' },
                                { id: 'v437', idn: 'Kadang-kadang', esp: 'A veces', ex: 'Saya kadang-kadang membaca.', exEsp: 'A veces leo.' },
                                { id: 'v438', idn: 'Jarang', esp: 'Rara vez', ex: 'Saya jarang menonton TV.', exEsp: 'Rara vez veo la televisión.' },
                                { id: 'v439', idn: 'Sering', esp: 'A menudo / con frecuencia', ex: 'Saya sering membaca.', exEsp: 'Leo con frecuencia.' },
                                { id: 'v440', idn: 'Menyapu', esp: 'Barrer', ex: 'Saya menyapu pada pagi hari.', exEsp: 'Barro por la mañana.' },
                                { id: 'v441', idn: 'Menyikat gigi', esp: 'Cepillarse los dientes', ex: 'Saya menyikat gigi pada pagi hari.', exEsp: 'Me cepillo los dientes por la mañana.' },
                                { id: 'v442', idn: 'Beristirahat', esp: 'Descansar', ex: 'Saya beristirahat pada sore hari.', exEsp: 'Descanso por la tarde.' },
                                { id: 'v443', idn: 'Sebelum', esp: 'Antes de', ex: 'Saya makan sebelum belajar.', exEsp: 'Como antes de estudiar.' },
                                { id: 'v444', idn: 'Sesudah', esp: 'Después de', ex: 'Saya mandi sesudah makan.', exEsp: 'Me ducho después de comer.' }
                            ],
                            exercises: [
                                { vocabId: 'v435', type: 'mc', prompt: '¿Qué significa «selalu»?', options: ['A veces', 'Nunca', 'Siempre'], answer: 2, explanation: 'Selalu significa siempre.' },
                                { vocabId: 'v437', type: 'translate_es_id', prompt: 'Traduce: a veces', answer: 'Kadang-kadang', explanation: 'Kadang-kadang significa a veces.' },
                                { vocabId: 'v439', type: 'order', prompt: 'Ordena: Leo con frecuencia.', words: ['membaca', 'Saya', 'sering'], correctOrder: ['Saya', 'sering', 'membaca'], explanation: 'Saya sering membaca significa «Leo con frecuencia».' },
                                { vocabId: 'v440', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Menyapu', explanation: 'Menyapu significa barrer.' },
                                { vocabId: 'v438', type: 'mc', prompt: '¿Qué significa «jarang»?', options: ['Rara vez', 'Siempre', 'Normalmente'], answer: 0, explanation: 'Jarang significa rara vez.' },
                                { vocabId: 'v443', type: 'translate_es_id', prompt: 'Traduce: antes de', answer: 'Sebelum', explanation: 'Sebelum significa antes de.' },
                                { vocabId: 'v443', type: 'order', prompt: 'Ordena: Como antes de estudiar.', words: ['belajar', 'makan', 'sebelum', 'Saya'], correctOrder: ['Saya', 'makan', 'sebelum', 'belajar'], explanation: 'Saya makan sebelum belajar significa «Como antes de estudiar».' },
                                { vocabId: 'v442', type: 'write', prompt: 'Escribe una frase para decir «Descanso por la tarde».', hint: 'Usa Saya beristirahat pada sore hari.', modelAnswer: 'Saya beristirahat pada sore hari.', explanation: 'Saya beristirahat pada sore hari significa «Descanso por la tarde».' }
                            
                                , { vocabId: 'v435', type: 'mc', prompt: 'Escucha el hábito y elige su frecuencia', audioText: 'Saya selalu belajar.', options: ["Siempre estudio","A veces estudio","Nunca estudio"], answer: 0, explanation: 'Selalu significa siempre.' }
                            ]
                        },
                        {
                            id: 'a1_u30',
                            title: 'Unidad 30: Pedir ayuda con cortesía',
                            desc: 'Usar expresiones básicas para disculparse, pedir permiso y solicitar ayuda.',
                            grammar: 'Permisi se usa para llamar la atención o pasar; maaf para disculparse; silakan para invitar o dar paso. Tolong suele introducir una petición de ayuda o una acción, pero no equivale automáticamente a «por favor» en todos los contextos.',
                            vocab: [
                                { id: 'v445', idn: 'Maaf', esp: 'Perdón / lo siento', ex: 'Maaf, saya terlambat.', exEsp: 'Perdón, llego tarde.' },
                                { id: 'v446', idn: 'Permisi', esp: 'Con permiso / disculpe', ex: 'Permisi, boleh lewat?', exEsp: 'Con permiso, ¿puedo pasar?' },
                                { id: 'v447', idn: 'Silakan', esp: 'Adelante / por favor (al invitar)', ex: 'Silakan duduk.', exEsp: 'Por favor, siéntese.' },
                                { id: 'v448', idn: 'Bantuan', esp: 'Ayuda / asistencia', ex: 'Saya perlu bantuan.', exEsp: 'Necesito ayuda.' },
                                { id: 'v449', idn: 'Ulangi', esp: 'Repite / repítalo (imperativo)', ex: 'Tolong ulangi.', exEsp: 'Por favor, repítalo.' },
                                { id: 'v450', idn: 'Pelan-pelan', esp: 'Despacio', ex: 'Bicara pelan-pelan.', exEsp: 'Habla despacio.' },
                                { id: 'v451', idn: 'Mengerti', esp: 'Entender', ex: 'Saya mengerti.', exEsp: 'Entiendo.' },
                                { id: 'v452', idn: 'Tidak mengerti', esp: 'No entender', ex: 'Maaf, saya tidak mengerti.', exEsp: 'Perdón, no entiendo.' },
                                { id: 'v453', idn: 'Tunggu', esp: 'Esperar', ex: 'Tunggu sebentar.', exEsp: 'Espera un momento.' },
                                { id: 'v454', idn: 'Terlambat', esp: 'Tarde / con retraso', ex: 'Saya terlambat.', exEsp: 'Llego tarde.' }
                            ],
                            exercises: [
                                { vocabId: 'v445', type: 'mc', prompt: '¿Qué significa «maaf»?', options: ['Gracias', 'Perdón', 'Mañana'], answer: 1, explanation: 'Maaf se usa para disculparse.' },
                                { vocabId: 'v448', type: 'translate_es_id', prompt: 'Traduce: ayuda', answer: 'Bantuan', explanation: 'Bantuan es el sustantivo «ayuda» o «asistencia». Tolong se usa para pedir ayuda o solicitar que alguien haga algo; no son intercambiables en todas las frases.' },
                                { vocabId: 'v450', type: 'order', prompt: 'Ordena: Habla despacio.', words: ['pelan-pelan', 'Bicara'], correctOrder: ['Bicara', 'pelan-pelan'], explanation: 'Bicara pelan-pelan significa «Habla despacio».' },
                                { vocabId: 'v452', type: 'listen', prompt: 'Escucha y escribe la expresión.', answer: 'Tidak mengerti', explanation: 'Tidak mengerti significa no entender.' },
                                { vocabId: 'v446', type: 'mc', prompt: '¿Qué expresión significa «con permiso»?', options: ['Selalu', 'Koper', 'Permisi'], answer: 2, explanation: 'Permisi se usa para pedir paso o llamar la atención con cortesía.' },
                                { vocabId: 'v451', type: 'translate_es_id', prompt: 'Traduce: entender', answer: 'Mengerti', explanation: 'Mengerti significa entender.' },
                                { vocabId: 'v453', type: 'order', prompt: 'Ordena: Espera un momento.', words: ['sebentar', 'Tunggu'], correctOrder: ['Tunggu', 'sebentar'], explanation: 'Tunggu sebentar significa «Espera un momento».' },
                                { vocabId: 'v452', type: 'write', prompt: 'Escribe una frase para decir «Perdón, no entiendo».', hint: 'Usa Maaf, saya tidak mengerti.', modelAnswer: 'Maaf, saya tidak mengerti.', explanation: 'Maaf, saya tidak mengerti significa «Perdón, no entiendo».' }
                            
                                , { vocabId: 'v449', type: 'mc', prompt: 'Escucha qué pide la persona', audioText: 'Tolong ulangi.', options: ["Por favor, repítalo","Por favor, espere","Hable más rápido"], answer: 0, explanation: 'Ulangi es el imperativo de repetir.' }
                            ]
                        },
                        {
                            id: 'a1_u31',
                            title: 'Unidad 31: Describir personas',
                            desc: 'Describir de forma sencilla la apariencia y algunas cualidades de una persona.',
                            grammar: 'En una descripción sencilla, el adjetivo suele ir después del sustantivo o del sujeto: Dia tinggi (es alto/a), Teman saya ramah (mi amigo/a es amable). El contexto indica a quién se refiere dia; el indonesio no marca género gramatical en ese pronombre.',
                            vocab: [
                                { id: 'v455', idn: 'Tinggi', esp: 'Alto/a', ex: 'Dia tinggi.', exEsp: 'Él/ella es alto/a.' },
                                { id: 'v456', idn: 'Pendek', esp: 'Bajo/a (de estatura)', ex: 'Dia pendek.', exEsp: 'Él/ella es bajo/a.' },
                                { id: 'v457', idn: 'Ramah', esp: 'Amable / simpático/a', ex: 'Teman saya ramah.', exEsp: 'Mi amigo/a es amable.' },
                                { id: 'v458', idn: 'Muda', esp: 'Joven', ex: 'Dia masih muda.', exEsp: 'Él/ella todavía es joven.' },
                                { id: 'v459', idn: 'Tua', esp: 'Mayor / viejo/a (según contexto)', ex: 'Kakek saya sudah tua.', exEsp: 'Mi abuelo ya es mayor.' },
                                { id: 'v460', idn: 'Rambut', esp: 'Cabello / pelo', ex: 'Rambut saya panjang.', exEsp: 'Tengo el pelo largo.' },
                                { id: 'v461', idn: 'Panjang', esp: 'Largo/a', ex: 'Rambutnya panjang.', exEsp: 'Su pelo es largo.' },
                                { id: 'v462', idn: 'Hidung', esp: 'Nariz', ex: 'Ini hidung saya.', exEsp: 'Esta es mi nariz.' },
                                { id: 'v463', idn: 'Kacamata', esp: 'Gafas / anteojos', ex: 'Saya memakai kacamata.', exEsp: 'Llevo gafas.' },
                                { id: 'v464', idn: 'Senyum', esp: 'Sonrisa', ex: 'Senyumnya manis.', exEsp: 'Su sonrisa es bonita.' }
                            ],
                            exercises: [
                                { vocabId: 'v455', type: 'mc', prompt: '¿Qué significa «tinggi»?', options: ['Alto/a', 'Corto/a', 'Joven'], answer: 0, explanation: 'Tinggi significa alto/a.' },
                                { vocabId: 'v460', type: 'translate_es_id', prompt: 'Traduce: cabello / pelo', answer: 'Rambut', explanation: 'Rambut significa cabello o pelo.' },
                                { vocabId: 'v457', type: 'order', prompt: 'Ordena: Mi amigo/a es amable.', words: ['ramah', 'Teman', 'saya'], correctOrder: ['Teman', 'saya', 'ramah'], explanation: 'Teman saya ramah significa «Mi amigo/a es amable».' },
                                { vocabId: 'v463', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Kacamata', explanation: 'Kacamata significa gafas o anteojos.' },
                                { vocabId: 'v458', type: 'mc', prompt: '¿Qué significa «muda»?', options: ['Mayor', 'Joven', 'Alto/a'], answer: 1, explanation: 'Muda significa joven.' },
                                { vocabId: 'v461', type: 'translate_es_id', prompt: 'Traduce: largo/a', answer: 'Panjang', explanation: 'Panjang significa largo/a.' },
                                { vocabId: 'v460', type: 'order', prompt: 'Ordena: Tengo el pelo largo.', words: ['panjang', 'Rambut', 'saya'], correctOrder: ['Rambut', 'saya', 'panjang'], explanation: 'Rambut saya panjang significa «Tengo el pelo largo».' },
                                { vocabId: 'v455', type: 'write', prompt: 'Escribe una frase para decir «Él/ella es alto/a».', hint: 'Usa Dia tinggi.', modelAnswer: 'Dia tinggi.', explanation: 'Dia tinggi significa «Él/ella es alto/a».' }
                            
                                , { vocabId: 'v457', type: 'mc', prompt: 'Escucha cómo describen al amigo', audioText: 'Teman saya ramah.', options: ["Mi amigo es amable","Mi amigo es alto","Mi amigo está cansado"], answer: 0, explanation: 'Ramah significa amable o simpático.' }
                            ]
                        },
                        {
                            id: 'a1_u32',
                            title: 'Unidad 32: Conversaciones prácticas',
                            desc: 'Integrar expresiones breves para desenvolverse en situaciones cotidianas.',
                            grammar: 'En una conversación, combina saludos, preguntas y expresiones de cortesía. Apa kabar? pregunta cómo está alguien; Terima kasih expresa agradecimiento y Sama-sama responde a ese agradecimiento. Elige la expresión según la situación, no como traducción literal palabra por palabra.',
                            vocab: [
                                { id: 'v465', idn: 'Apa kabar?', esp: '¿Cómo estás? / ¿Qué tal?', ex: 'Halo, apa kabar?', exEsp: 'Hola, ¿qué tal?' },
                                { id: 'v466', idn: 'Lelah', esp: 'Cansado/a', ex: 'Saya lelah.', exEsp: 'Estoy cansado/a.' },
                                { id: 'v467', idn: 'Hati-hati', esp: 'Ten cuidado / con cuidado', ex: 'Hati-hati di jalan.', exEsp: 'Ten cuidado en el camino.' },
                                { id: 'v468', idn: 'Sama-sama', esp: 'De nada', ex: 'Terima kasih. — Sama-sama.', exEsp: 'Gracias. — De nada.' },
                                { id: 'v469', idn: 'Sampai jumpa', esp: 'Hasta luego / hasta la vista', ex: 'Sampai jumpa besok.', exEsp: 'Hasta mañana.' },
                                { id: 'v470', idn: 'Senang bertemu dengan Anda', esp: 'Encantado/a de conocerle (formal)', ex: 'Senang bertemu dengan Anda.', exEsp: 'Encantado/a de conocerle.' },
                                { id: 'v471', idn: 'Perlu', esp: 'Necesitar / hacer falta', ex: 'Saya perlu bantuan.', exEsp: 'Necesito ayuda.' },
                                { id: 'v472', idn: 'Mengapa', esp: 'Por qué', ex: 'Mengapa kamu di sini?', exEsp: '¿Por qué estás aquí?' },
                                { id: 'v473', idn: 'Ke mana', esp: 'Adónde', ex: 'Ke mana kamu pergi?', exEsp: '¿Adónde vas?' },
                                { id: 'v474', idn: 'Selamat datang', esp: 'Bienvenido/a', ex: 'Selamat datang di rumah saya.', exEsp: 'Bienvenido/a a mi casa.' }
                            ],
                            exercises: [
                                { vocabId: 'v465', type: 'mc', prompt: '¿Qué significa «Apa kabar?»?', options: ['¿Cuánto cuesta?', '¿Dónde está?', '¿Qué tal?'], answer: 2, explanation: 'Apa kabar? es una pregunta común para saber cómo está alguien.' },
                                { vocabId: 'v467', type: 'translate_es_id', prompt: 'Traduce: ten cuidado', answer: 'Hati-hati', explanation: 'Hati-hati se usa para recomendar cuidado.' },
                                { vocabId: 'v468', type: 'mc', prompt: '¿Qué expresión responde a «terima kasih»?', options: ['Sama-sama', 'Selamat datang', 'Hati-hati'], answer: 0, explanation: 'Sama-sama es una respuesta común a «terima kasih» (gracias).' },
                                { vocabId: 'v469', type: 'listen', prompt: 'Escucha y escribe la expresión.', answer: 'Sampai jumpa', explanation: 'Sampai jumpa se usa para despedirse.' },
                                { vocabId: 'v472', type: 'mc', prompt: '¿Qué significa «mengapa»?', options: ['Cuánto cuesta', 'Por qué', 'Dónde'], answer: 1, explanation: 'Mengapa significa «por qué».' },
                                { vocabId: 'v473', type: 'translate_es_id', prompt: 'Traduce: adónde', answer: 'Ke mana', explanation: 'Ke mana pregunta por el destino.' },
                                { vocabId: 'v474', type: 'order', prompt: 'Ordena: Bienvenido/a a mi casa.', words: ['rumah', 'Selamat', 'saya', 'datang', 'di'], correctOrder: ['Selamat', 'datang', 'di', 'rumah', 'saya'], explanation: 'Selamat datang di rumah saya significa «Bienvenido/a a mi casa».' },
                                { vocabId: 'v466', type: 'write', prompt: 'Escribe una frase para decir «Estoy cansado/a».', hint: 'Usa Saya lelah.', modelAnswer: 'Saya lelah.', explanation: 'Saya lelah significa «Estoy cansado/a».' }
                            ]
                        },
                    ]
                };
