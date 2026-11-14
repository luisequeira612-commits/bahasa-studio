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
                                { id: 'v465', idn: 'Apa kabar?', esp: '¿Cómo estás? / ¿Qué tal?', ex: 'Apa kabar?', exEsp: '¿Cómo estás?' },
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
                            ,
                                            {
                                                "vocabId": "v465",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «apa kabar»?",
                                                "options": [
                                                    "Gracias",
                                                    "¿Cómo estás? / ¿Qué tal?",
                                                    "¿Dónde estás?"
                                                ],
                                                "answer": 1,
                                                "explanation": "Apa kabar? pregunta cómo está alguien."
                                            },
                                            {
                                                "vocabId": "v1002",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «baik»?",
                                                "options": [
                                                    "Bien",
                                                    "Mal",
                                                    "Mañana"
                                                ],
                                                "answer": 0,
                                                "explanation": "Baik significa bien."
                                            }
],
                            lessons:                                                         [
                                {
                                    "title": "Lección 1: Pronombres para hablar de personas",
                                    "objective": "Identifica quién habla y quién realiza una acción usando saya, kamu y dia.",
                                    "grammar": "Saya significa yo, kamu significa tú y dia significa él o ella. Los pronombres cambian según la persona, pero el verbo no cambia.",
                                    "vocabIds": [
                                        "v1",
                                        "v2",
                                        "v3"
                                    ],
                                    "reviewVocabIds": [],
                                    "exercises": [
                                        {
                                            "vocabId": "v1",
                                            "type": "mc",
                                            "prompt": "¿Qué palabra significa «yo»?",
                                            "options": [
                                                "Kamu",
                                                "Saya",
                                                "Dia"
                                            ],
                                            "answer": 1,
                                            "explanation": "Saya significa «yo» y es una forma estándar y respetuosa."
                                        },
                                        {
                                            "vocabId": "v2",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce al indonesio: «tú»",
                                            "answer": "Kamu",
                                            "explanation": "Kamu significa «tú» en contextos informales."
                                        },
                                        {
                                            "vocabId": "v3",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «dia»?",
                                            "options": [
                                                "Yo",
                                                "Tú",
                                                "Él / ella"
                                            ],
                                            "answer": 2,
                                            "explanation": "Dia puede significar él o ella; el pronombre no indica género."
                                        },
                                        {
                                            "vocabId": "v3",
                                            "type": "mc",
                                            "prompt": "Escucha la palabra y elige su significado",
                                            "audioText": "Dia",
                                            "options": [
                                                "Yo",
                                                "Tú",
                                                "Él / ella"
                                            ],
                                            "answer": 2,
                                            "explanation": "Dia puede significar él o ella; el pronombre no indica género."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Saludos y cortesía",
                                    "objective": "Saluda de forma breve y reconoce el saludo apropiado para la mañana; añade una expresión sencilla de cortesía.",
                                    "grammar": "Halo funciona como saludo general, Selamat pagi se usa por la mañana y terima kasih expresa agradecimiento.",
                                    "vocabIds": [
                                        "v4",
                                        "v60",
                                        "v45"
                                    ],
                                    "reviewVocabIds": [
                                        "v1",
                                        "v2",
                                        "v3"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v4",
                                            "type": "mc",
                                            "prompt": "Escucha el saludo y elige su significado",
                                            "audioText": "Selamat pagi",
                                            "options": [
                                                "Buenos días",
                                                "Buenas noches",
                                                "Hasta luego"
                                            ],
                                            "answer": 0,
                                            "explanation": "Selamat pagi significa «buenos días»."
                                        },
                                        {
                                            "vocabId": "v60",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: «hola»",
                                            "answer": "Halo",
                                            "explanation": "Halo es un saludo común."
                                        },
                                        {
                                            "vocabId": "v45",
                                            "type": "mc",
                                            "prompt": "Alguien te ayuda. ¿Qué dices para dar las gracias?",
                                            "options": [
                                                "Halo",
                                                "Terima kasih",
                                                "Selamat pagi"
                                            ],
                                            "answer": 1,
                                            "explanation": "Terima kasih significa «gracias»."
                                        },
                                        {
                                            "vocabId": "v60",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Hola».",
                                            "answer": "Halo, Ana!",
                                            "explanation": "La oración contiene «Halo»."
                                        },
                                        {
                                            "vocabId": "v4",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Selamat pagi.",
                                            "hint": "Puedes tomar como modelo: Selamat pagi!",
                                            "modelAnswer": "Selamat pagi!",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ,
                                        {
                                            "vocabId": "v1",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Saya»?",
                                            "options": ["Yo","Tú","Él / ella"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Yo»."
                                        },
                                        {
                                            "vocabId": "v2",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Kamu»?",
                                            "options": ["Tú","Yo","Él / ella"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Tú»."
                                        },
                                        {
                                            "vocabId": "v3",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Dia»?",
                                            "options": ["Él / ella","Yo","Tú"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Él / ella»."
                                        }]
                                },
                                {
                                    "title": "Lección 3: Acciones cotidianas: comer y beber",
                                    "objective": "Nombra y comprende dos acciones básicas y construye frases sencillas con sujeto y verbo.",
                                    "grammar": "Makan significa comer y minum significa beber. En frases básicas se coloca primero el sujeto y después el verbo; el verbo mantiene la misma forma con saya, kamu y dia.",
                                    "vocabIds": [
                                        "v46",
                                        "v47"
                                    ],
                                    "reviewVocabIds": [
                                        "v1",
                                        "v2",
                                        "v3",
                                        "v4",
                                        "v60",
                                        "v45"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v46",
                                            "type": "order",
                                            "prompt": "Ordena: «Yo como»",
                                            "words": [
                                                "makan",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "makan"
                                            ],
                                            "explanation": "El orden básico es sujeto + verbo: Saya makan."
                                        },
                                        {
                                            "vocabId": "v47",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: «beber»",
                                            "answer": "Minum",
                                            "explanation": "Minum significa «beber»."
                                        },
                                        {
                                            "vocabId": "v46",
                                            "type": "mc",
                                            "prompt": "Completa: «Dia ___» (Él / ella come)",
                                            "options": [
                                                "makan",
                                                "minum",
                                                "kamu"
                                            ],
                                            "answer": 0,
                                            "explanation": "Makan significa «comer» y no cambia con dia."
                                        },
                                        {
                                            "vocabId": "v1",
                                            "type": "write",
                                            "prompt": "Escribe una frase propia con «saya» y un verbo de la unidad.",
                                            "hint": "Por ejemplo, habla de algo que tú haces; no copies literalmente un ejercicio anterior.",
                                            "modelAnswer": "Saya makan.",
                                            "explanation": "Saya significa «yo» y makan significa «comer». Puedes crear otras frases correctas con el vocabulario aprendido."
                                        },
                                        {
                                            "vocabId": "v47",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Beber».",
                                            "answer": "Dia minum.",
                                            "explanation": "La oración contiene «Minum»."
                                        }
                                    ,
                                        {
                                            "vocabId": "v2",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Kamu»?",
                                            "options": ["Tú","Yo","Él / ella"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Tú»."
                                        },
                                        {
                                            "vocabId": "v3",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Dia»?",
                                            "options": ["Él / ella","Yo","Tú"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Él / ella»."
                                        },
                                        {
                                            "vocabId": "v4",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Selamat pagi»?",
                                            "options": ["Buenos días","Yo","Tú"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Buenos días»."
                                        },
                                        {
                                            "vocabId": "v60",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Halo»?",
                                            "options": ["Hola","Yo","Tú"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Hola»."
                                        },
                                        {
                                            "vocabId": "v45",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Terima kasih»?",
                                            "options": ["Gracias","Yo","Tú"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Gracias»."
                                        }]
                                },
                                {
                                    "title": "Lección 4: Preguntar cómo está alguien",
                                    "objective": "Pregunta cómo está otra persona y responde con baik; integra el intercambio de saludos y agradecimientos.",
                                    "grammar": "Apa kabar? pregunta cómo está alguien y baik es una respuesta positiva. Practica el diálogo completo y recupera los saludos y expresiones de cortesía anteriores.",
                                    "vocabIds": [
                                        "v465",
                                        "v1002"
                                    ],
                                    "reviewVocabIds": [
                                        "v1",
                                        "v2",
                                        "v3",
                                        "v4",
                                        "v60",
                                        "v45",
                                        "v46",
                                        "v47"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v4",
                                            "type": "mc",
                                            "prompt": "Escucha el diálogo y elige de qué hablan",
                                            "audioText": "Selamat pagi. Apa kabar? Baik, terima kasih.",
                                            "options": [
                                                "Dos personas se saludan y preguntan cómo están",
                                                "Una persona pide comida",
                                                "Dos personas se despiden"
                                            ],
                                            "answer": 0,
                                            "explanation": "El diálogo combina un saludo matutino con una pregunta por el estado de la otra persona y una respuesta cortés."
                                        },
                                        {
                                            "vocabId": "v465",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «apa kabar»?",
                                            "options": [
                                                "Gracias",
                                                "¿Cómo estás? / ¿Qué tal?",
                                                "¿Dónde estás?"
                                            ],
                                            "answer": 1,
                                            "explanation": "Apa kabar? pregunta cómo está alguien."
                                        },
                                        {
                                            "vocabId": "v1002",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «baik»?",
                                            "options": [
                                                "Bien",
                                                "Mal",
                                                "Mañana"
                                            ],
                                            "answer": 0,
                                            "explanation": "Baik significa bien."
                                        },
                                        {
                                            "vocabId": "v1002",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Baik.",
                                            "hint": "Puedes tomar como modelo: Saya baik.",
                                            "modelAnswer": "Saya baik.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ,
                                        {
                                            "vocabId": "v1",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Saya»?",
                                            "options": ["Yo","Tú","Él / ella"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Yo»."
                                        },
                                        {
                                            "vocabId": "v2",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Kamu»?",
                                            "options": ["Tú","Yo","Él / ella"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Tú»."
                                        },
                                        {
                                            "vocabId": "v3",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Dia»?",
                                            "options": ["Él / ella","Yo","Tú"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Él / ella»."
                                        },
                                        {
                                            "vocabId": "v60",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Halo»?",
                                            "options": ["Hola","Yo","Tú"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Hola»."
                                        },
                                        {
                                            "vocabId": "v45",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Terima kasih»?",
                                            "options": ["Gracias","Yo","Tú"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Gracias»."
                                        },
                                        {
                                            "vocabId": "v46",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Makan»?",
                                            "options": ["Comer","Yo","Tú"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Comer»."
                                        },
                                        {
                                            "vocabId": "v47",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Minum»?",
                                            "options": ["Beber","Yo","Tú"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Beber»."
                                        }]
                                },
                                {
                                    "title": "Lección 5: Recuperación espaciada y uso integrado",
                                    "objective": "Recupera el vocabulario de toda la unidad y úsalo en comprensión, traducción y producción.",
                                    "grammar": "Repasa las expresiones y estructuras de las cuatro lecciones anteriores. Recupera cada término desde su significado y úsalo dentro de una oración completa.",
                                    "vocabIds": [],
                                    "reviewVocabIds": [
                                        "v1",
                                        "v2",
                                        "v3",
                                        "v4",
                                        "v60",
                                        "v45",
                                        "v46",
                                        "v47",
                                        "v465",
                                        "v1002"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v1",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Saya»?",
                                            "options": [
                                                "Yo",
                                                "Tú",
                                                "Él / ella"
                                            ],
                                            "answer": 0,
                                            "explanation": "«Saya» significa «Yo»."
                                        },
                                        {
                                            "vocabId": "v2",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Tú bebes.",
                                            "answer": "Kamu minum.",
                                            "explanation": "La frase utiliza «Kamu»."
                                        },
                                        {
                                            "vocabId": "v3",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Él / ella».",
                                            "answer": "Dia makan.",
                                            "explanation": "La oración contiene «Dia»."
                                        },
                                        {
                                            "vocabId": "v4",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Selamat pagi.",
                                            "hint": "Puedes tomar como modelo: Selamat pagi!",
                                            "modelAnswer": "Selamat pagi!",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "v60",
                                            "type": "order",
                                            "prompt": "Ordena: ¡Hola, Ana!",
                                            "words": [
                                                "Ana",
                                                "Halo,"
                                            ],
                                            "correctOrder": [
                                                "Halo,",
                                                "Ana"
                                            ],
                                            "explanation": "La frase completa es: Halo, Ana!"
                                        },
                                        {
                                            "vocabId": "v45",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Terima kasih»?",
                                            "options": [
                                                "Gracias",
                                                "Yo",
                                                "Tú"
                                            ],
                                            "answer": 0,
                                            "explanation": "«Terima kasih» significa «Gracias»."
                                        },
                                        {
                                            "vocabId": "v46",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Yo como.",
                                            "answer": "Saya makan.",
                                            "explanation": "La frase utiliza «Makan»."
                                        },
                                        {
                                            "vocabId": "v47",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Beber».",
                                            "answer": "Dia minum.",
                                            "explanation": "La oración contiene «Minum»."
                                        },
                                        {
                                            "vocabId": "v465",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Apa kabar?.",
                                            "hint": "Puedes tomar como modelo: Apa kabar?",
                                            "modelAnswer": "Apa kabar?",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "v1002",
                                            "type": "order",
                                            "prompt": "Ordena: Estoy bien.",
                                            "words": [
                                                "baik",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "baik"
                                            ],
                                            "explanation": "La frase completa es: Saya baik."
                                        }
                                    ]
                                }
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
                                { id: 'v51', idn: 'Ini', esp: 'Este / esta / esto', ex: 'Ini nasi.', exEsp: 'Esto es arroz.' },
                                { id: 'v52', idn: 'Buku', esp: 'Libro', ex: 'Ini buku.', exEsp: 'Esto es un libro.' },
                                { id: 'v53', idn: 'Teman', esp: 'Amigo/a', ex: 'Dia teman saya.', exEsp: 'Él / ella es mi amigo/a.' }
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
                            ],
                            lessons:                                                         [
                                {
                                    "title": "Lección 1: Dos formas de negar: tidak y bukan",
                                    "objective": "Distingue la negación de acciones y cualidades de la negación de una identificación.",
                                    "grammar": "Tidak niega acciones o cualidades y se coloca antes del verbo o adjetivo. Bukan niega una identificación con un sustantivo.",
                                    "vocabIds": [
                                        "v5",
                                        "v6"
                                    ],
                                    "reviewVocabIds": [],
                                    "exercises": [
                                        {
                                            "vocabId": "v5",
                                            "type": "mc",
                                            "prompt": "Completa: «Saya ___ makan» (Yo no como)",
                                            "options": [
                                                "bukan",
                                                "tidak",
                                                "ini"
                                            ],
                                            "answer": 1,
                                            "explanation": "Makan es una acción; se niega con tidak."
                                        },
                                        {
                                            "vocabId": "v5",
                                            "type": "order",
                                            "prompt": "Ordena: «Yo no como»",
                                            "words": [
                                                "makan",
                                                "tidak",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "tidak",
                                                "makan"
                                            ],
                                            "explanation": "Tidak se coloca antes de la acción: Saya tidak makan."
                                        },
                                        {
                                            "vocabId": "v5",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «No (niega acciones o cualidades)».",
                                            "answer": "Saya tidak tidur.",
                                            "explanation": "La oración contiene «Tidak»."
                                        },
                                        {
                                            "vocabId": "v6",
                                            "type": "mc",
                                            "prompt": "¿Qué forma niega una identificación con un sustantivo?",
                                            "options": [
                                                "bukan",
                                                "tidak",
                                                "baik"
                                            ],
                                            "answer": 0,
                                            "explanation": "Bukan niega una identificación con un sustantivo; tidak niega acciones o cualidades."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Agua y arroz en frases sencillas",
                                    "objective": "Reconoce y usa vocabulario básico de agua y arroz en frases de comer y beber.",
                                    "grammar": "Air significa agua y nasi arroz cocido. Combina los sustantivos con minum y makan sin cambiar la forma de los verbos.",
                                    "vocabIds": [
                                        "v48",
                                        "v49"
                                    ],
                                    "reviewVocabIds": [
                                        "v5",
                                        "v6"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v48",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: «agua»",
                                            "answer": "Air",
                                            "explanation": "Air significa «agua»."
                                        },
                                        {
                                            "vocabId": "v49",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «nasi»?",
                                            "options": [
                                                "Agua",
                                                "Arroz cocido",
                                                "Libro"
                                            ],
                                            "answer": 1,
                                            "explanation": "Nasi es arroz cocido, un alimento básico en Indonesia."
                                        },
                                        {
                                            "vocabId": "v48",
                                            "type": "write",
                                            "prompt": "Escribe una frase propia con «air».",
                                            "hint": "Intenta decir qué haces con el agua usando palabras de esta unidad.",
                                            "modelAnswer": "Saya minum air.",
                                            "explanation": "Air significa «agua». La frase de ejemplo significa «Yo bebo agua»."
                                        },
                                        {
                                            "vocabId": "v49",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Arroz cocido».",
                                            "answer": "Saya makan nasi.",
                                            "explanation": "La oración contiene «Nasi»."
                                        }
                                    ,
                                        {
                                            "vocabId": "v5",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tidak»?",
                                            "options": ["No (niega acciones o cualidades)","No es / no (niega una identificación)","Agua"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «No (niega acciones o cualidades)»."
                                        },
                                        {
                                            "vocabId": "v6",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Bukan»?",
                                            "options": ["No es / no (niega una identificación)","No (niega acciones o cualidades)","Agua"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «No es / no (niega una identificación)»."
                                        }]
                                },
                                {
                                    "title": "Lección 3: Rutina y objetos cercanos",
                                    "objective": "Describe una rutina sencilla y señala un objeto cercano con una frase nominal.",
                                    "grammar": "Tidur significa dormir. Ini señala algo cercano y aparece antes del sustantivo en expresiones como ini buku.",
                                    "vocabIds": [
                                        "v50",
                                        "v51",
                                        "v52"
                                    ],
                                    "reviewVocabIds": [
                                        "v5",
                                        "v6",
                                        "v48",
                                        "v49"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v6",
                                            "type": "mc",
                                            "prompt": "Completa: «Ini ___ air» (Esto no es agua)",
                                            "options": [
                                                "tidak",
                                                "bukan",
                                                "tidur"
                                            ],
                                            "answer": 1,
                                            "explanation": "Air es un sustantivo; para negar la identificación se usa bukan."
                                        },
                                        {
                                            "vocabId": "v50",
                                            "type": "mc",
                                            "prompt": "Escucha la frase y elige su significado",
                                            "audioText": "Dia tidur",
                                            "options": [
                                                "Él / ella duerme",
                                                "Yo como",
                                                "Tú bebes"
                                            ],
                                            "answer": 0,
                                            "explanation": "Dia tidur significa «él / ella duerme»."
                                        },
                                        {
                                            "vocabId": "v51",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: «esto»",
                                            "answer": "Ini",
                                            "explanation": "Ini señala algo cercano: esto, este o esta. Si acompaña a un sustantivo, normalmente va después: buku ini (este libro); al presentar algo, puede ir al inicio: Ini buku (esto es un libro)."
                                        },
                                        {
                                            "vocabId": "v52",
                                            "type": "order",
                                            "prompt": "Ordena: «Esto es un libro»",
                                            "words": [
                                                "buku",
                                                "Ini"
                                            ],
                                            "correctOrder": [
                                                "Ini",
                                                "buku"
                                            ],
                                            "explanation": "En esta frase básica, ini va antes del sustantivo: Ini buku."
                                        },
                                        {
                                            "vocabId": "v52",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Libro».",
                                            "answer": "Ini buku.",
                                            "explanation": "La oración contiene «Buku»."
                                        },
                                        {
                                            "vocabId": "v51",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Ini.",
                                            "hint": "Puedes tomar como modelo: Ini nasi.",
                                            "modelAnswer": "Ini nasi.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ,
                                        {
                                            "vocabId": "v5",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tidak»?",
                                            "options": ["No (niega acciones o cualidades)","No es / no (niega una identificación)","Agua"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «No (niega acciones o cualidades)»."
                                        },
                                        {
                                            "vocabId": "v48",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Air»?",
                                            "options": ["Agua","No (niega acciones o cualidades)","No es / no (niega una identificación)"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Agua»."
                                        },
                                        {
                                            "vocabId": "v49",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Nasi»?",
                                            "options": ["Arroz cocido","No (niega acciones o cualidades)","No es / no (niega una identificación)"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Arroz cocido»."
                                        }]
                                },
                                {
                                    "title": "Lección 4: Hablar de un amigo",
                                    "objective": "Presenta a una persona como amigo o amiga y recupera vocabulario de las lecciones anteriores.",
                                    "grammar": "Teman significa amigo o amiga. Practica frases de identificación como Dia teman saya y recupera la negación y los objetos ya estudiados.",
                                    "vocabIds": [
                                        "v53"
                                    ],
                                    "reviewVocabIds": [
                                        "v5",
                                        "v6",
                                        "v48",
                                        "v49",
                                        "v50",
                                        "v51",
                                        "v52"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v53",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: «amigo / amiga»",
                                            "answer": "Teman",
                                            "explanation": "Teman significa amigo o amiga."
                                        },
                                        {
                                            "vocabId": "v53",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Amigo/a».",
                                            "answer": "Dia teman saya.",
                                            "explanation": "La oración contiene «Teman»."
                                        },
                                        {
                                            "vocabId": "v53",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Teman.",
                                            "hint": "Puedes tomar como modelo: Dia teman saya.",
                                            "modelAnswer": "Dia teman saya.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ,
                                        {
                                            "vocabId": "v5",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tidak»?",
                                            "options": ["No (niega acciones o cualidades)","No es / no (niega una identificación)","Agua"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «No (niega acciones o cualidades)»."
                                        },
                                        {
                                            "vocabId": "v6",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Bukan»?",
                                            "options": ["No es / no (niega una identificación)","No (niega acciones o cualidades)","Agua"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «No es / no (niega una identificación)»."
                                        },
                                        {
                                            "vocabId": "v48",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Air»?",
                                            "options": ["Agua","No (niega acciones o cualidades)","No es / no (niega una identificación)"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Agua»."
                                        },
                                        {
                                            "vocabId": "v49",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Nasi»?",
                                            "options": ["Arroz cocido","No (niega acciones o cualidades)","No es / no (niega una identificación)"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Arroz cocido»."
                                        },
                                        {
                                            "vocabId": "v50",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tidur»?",
                                            "options": ["Dormir","No (niega acciones o cualidades)","No es / no (niega una identificación)"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Dormir»."
                                        },
                                        {
                                            "vocabId": "v51",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Ini»?",
                                            "options": ["Este / esta / esto","No (niega acciones o cualidades)","No es / no (niega una identificación)"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Este / esta / esto»."
                                        },
                                        {
                                            "vocabId": "v52",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Buku»?",
                                            "options": ["Libro","No (niega acciones o cualidades)","No es / no (niega una identificación)"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Libro»."
                                        }]
                                },
                                {
                                    "title": "Lección 5: Recuperación espaciada y uso integrado",
                                    "objective": "Recupera el vocabulario de toda la unidad y úsalo en comprensión, traducción y producción.",
                                    "grammar": "Repasa las expresiones y estructuras de las cuatro lecciones anteriores. Recupera cada término desde su significado y úsalo dentro de una oración completa.",
                                    "vocabIds": [],
                                    "reviewVocabIds": [
                                        "v5",
                                        "v6",
                                        "v48",
                                        "v49",
                                        "v50",
                                        "v51",
                                        "v52",
                                        "v53"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v5",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tidak»?",
                                            "options": [
                                                "No (niega acciones o cualidades)",
                                                "No es / no (niega una identificación)",
                                                "Agua"
                                            ],
                                            "answer": 0,
                                            "explanation": "«Tidak» significa «No (niega acciones o cualidades)»."
                                        },
                                        {
                                            "vocabId": "v6",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esto no es agua.",
                                            "answer": "Ini bukan air.",
                                            "explanation": "La frase utiliza «Bukan»."
                                        },
                                        {
                                            "vocabId": "v48",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Agua».",
                                            "answer": "Saya minum air.",
                                            "explanation": "La oración contiene «Air»."
                                        },
                                        {
                                            "vocabId": "v49",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Nasi.",
                                            "hint": "Puedes tomar como modelo: Saya makan nasi.",
                                            "modelAnswer": "Saya makan nasi.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "v50",
                                            "type": "order",
                                            "prompt": "Ordena: Él / ella duerme.",
                                            "words": [
                                                "tidur",
                                                "Dia"
                                            ],
                                            "correctOrder": [
                                                "Dia",
                                                "tidur"
                                            ],
                                            "explanation": "La frase completa es: Dia tidur."
                                        },
                                        {
                                            "vocabId": "v51",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Ini»?",
                                            "options": [
                                                "Este / esta / esto",
                                                "No (niega acciones o cualidades)",
                                                "No es / no (niega una identificación)"
                                            ],
                                            "answer": 0,
                                            "explanation": "«Ini» significa «Este / esta / esto»."
                                        },
                                        {
                                            "vocabId": "v52",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esto es un libro.",
                                            "answer": "Ini buku.",
                                            "explanation": "La frase utiliza «Buku»."
                                        },
                                        {
                                            "vocabId": "v53",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Amigo/a».",
                                            "answer": "Dia teman saya.",
                                            "explanation": "La oración contiene «Teman»."
                                        }
                                    ]
                                }
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
                            ],
                            lessons:                                                         [
                                {
                                    "title": "Lección 1: Nombre y preguntas personales",
                                    "objective": "Pregunta el nombre de otra persona y presenta el propio con una estructura sencilla.",
                                    "grammar": "Nama saya ... presenta el nombre propio. Siapa pregunta quién y aparece en Siapa nama kamu? para preguntar cómo se llama alguien.",
                                    "vocabIds": [
                                        "v10",
                                        "v11"
                                    ],
                                    "reviewVocabIds": [],
                                    "exercises": [
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
                                            "vocabId": "v10",
                                            "type": "mc",
                                            "prompt": "Escucha la frase y elige su significado",
                                            "audioText": "Nama saya Ana",
                                            "options": [
                                                "Me llamo Ana",
                                                "Vivo en Perú",
                                                "¿Cómo te llamas?"
                                            ],
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
                                            "vocabId": "v10",
                                            "type": "write",
                                            "prompt": "Preséntate en indonesio escribiendo tu nombre.",
                                            "hint": "Usa la estructura Nama saya ...",
                                            "modelAnswer": "Nama saya Ana.",
                                            "explanation": "Nama saya significa «mi nombre». Sustituye Ana por tu propio nombre."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Origen y residencia",
                                    "objective": "Expresa de dónde es alguien y dice dónde vive con estructuras básicas.",
                                    "grammar": "Dari indica origen o procedencia y tinggal significa vivir o residir. Combina Saya dari ... con Saya tinggal di ...",
                                    "vocabIds": [
                                        "v12",
                                        "v13"
                                    ],
                                    "reviewVocabIds": [
                                        "v10",
                                        "v11"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v12",
                                            "type": "listen",
                                            "prompt": "Escribe lo que escuchas",
                                            "answer": "Saya dari Peru",
                                            "explanation": "Saya dari Peru indica el país de origen."
                                        }
                                    ,
                                        {
                                            "vocabId": "v10",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Nama»?",
                                            "options": ["Nombre","Quién","De / desde"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Nombre»."
                                        },
                                        {
                                            "vocabId": "v11",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Siapa»?",
                                            "options": ["Quién","Nombre","De / desde"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Quién»."
                                        }]
                                },
                                {
                                    "title": "Lección 3: Dirección y ciudad",
                                    "objective": "Pregunta o da una dirección y reconoce el vocabulario para hablar de una ciudad.",
                                    "grammar": "Alamat significa dirección y kota significa ciudad. Practica preguntas y respuestas sobre dónde vive una persona.",
                                    "vocabIds": [
                                        "v14",
                                        "v101"
                                    ],
                                    "reviewVocabIds": [
                                        "v10",
                                        "v11",
                                        "v12",
                                        "v13"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v14",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Encantado de conocerte",
                                            "answer": "Senang bertemu denganmu",
                                            "explanation": "Es una expresión amistosa para conocer a alguien."
                                        },
                                        {
                                            "vocabId": "v14",
                                            "type": "listen",
                                            "prompt": "Escribe lo que escuchas",
                                            "answer": "Senang bertemu denganmu",
                                            "explanation": "Escucha la expresión completa y escríbela."
                                        },
                                        {
                                            "vocabId": "v101",
                                            "type": "mc",
                                            "prompt": "¿Qué significa kota?",
                                            "options": [
                                                "Ciudad",
                                                "País",
                                                "Dirección"
                                            ],
                                            "answer": 0,
                                            "explanation": "Kota significa ciudad."
                                        },
                                        {
                                            "vocabId": "v101",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Kota.",
                                            "hint": "Puedes tomar como modelo: Saya tinggal di kota ini.",
                                            "modelAnswer": "Saya tinggal di kota ini.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ,
                                        {
                                            "vocabId": "v10",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Nama»?",
                                            "options": ["Nombre","Quién","De / desde"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Nombre»."
                                        },
                                        {
                                            "vocabId": "v11",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Siapa»?",
                                            "options": ["Quién","Nombre","De / desde"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Quién»."
                                        },
                                        {
                                            "vocabId": "v12",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Dari»?",
                                            "options": ["De / desde","Nombre","Quién"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «De / desde»."
                                        },
                                        {
                                            "vocabId": "v13",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tinggal»?",
                                            "options": ["Vivir / residir","Nombre","Quién"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Vivir / residir»."
                                        }]
                                },
                                {
                                    "title": "Lección 4: País y primer encuentro",
                                    "objective": "Nombra un país y usa una expresión amistosa al conocer a alguien.",
                                    "grammar": "Negara significa país. Senang bertemu denganmu es una expresión amistosa para decir que te alegra conocer a alguien.",
                                    "vocabIds": [
                                        "v102",
                                        "v103"
                                    ],
                                    "reviewVocabIds": [
                                        "v10",
                                        "v11",
                                        "v12",
                                        "v13",
                                        "v14",
                                        "v101"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v102",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: país",
                                            "answer": "Negara",
                                            "explanation": "Negara significa país."
                                        },
                                        {
                                            "vocabId": "v103",
                                            "type": "write",
                                            "prompt": "Escribe una frase sobre dónde vives.",
                                            "hint": "Intenta construir una frase nueva con el vocabulario de la unidad.",
                                            "modelAnswer": "Saya tinggal di Managua.",
                                            "explanation": "Usa Saya tinggal di... para decir dónde vives."
                                        },
                                        {
                                            "vocabId": "v103",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Dirección».",
                                            "answer": "Apa alamatmu?",
                                            "explanation": "La oración contiene «Alamat»."
                                        }
                                    ,
                                        {
                                            "vocabId": "v10",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Nama»?",
                                            "options": ["Nombre","Quién","De / desde"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Nombre»."
                                        },
                                        {
                                            "vocabId": "v11",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Siapa»?",
                                            "options": ["Quién","Nombre","De / desde"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Quién»."
                                        },
                                        {
                                            "vocabId": "v12",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Dari»?",
                                            "options": ["De / desde","Nombre","Quién"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «De / desde»."
                                        },
                                        {
                                            "vocabId": "v13",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tinggal»?",
                                            "options": ["Vivir / residir","Nombre","Quién"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Vivir / residir»."
                                        },
                                        {
                                            "vocabId": "v14",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Senang bertemu denganmu»?",
                                            "options": ["Encantado/a de conocerte","Nombre","Quién"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Encantado/a de conocerte»."
                                        },
                                        {
                                            "vocabId": "v101",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Kota»?",
                                            "options": ["Ciudad","Nombre","Quién"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Ciudad»."
                                        }]
                                },
                                {
                                    "title": "Lección 5: Recuperación espaciada y uso integrado",
                                    "objective": "Recupera el vocabulario de toda la unidad y úsalo en comprensión, traducción y producción.",
                                    "grammar": "Repasa las expresiones y estructuras de las cuatro lecciones anteriores. Recupera cada término desde su significado y úsalo dentro de una oración completa.",
                                    "vocabIds": [],
                                    "reviewVocabIds": [
                                        "v10",
                                        "v11",
                                        "v12",
                                        "v13",
                                        "v14",
                                        "v101",
                                        "v102",
                                        "v103"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v10",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Nama»?",
                                            "options": [
                                                "Nombre",
                                                "Quién",
                                                "De / desde"
                                            ],
                                            "answer": 0,
                                            "explanation": "«Nama» significa «Nombre»."
                                        },
                                        {
                                            "vocabId": "v11",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: ¿Cómo te llamas?",
                                            "answer": "Siapa nama kamu?",
                                            "explanation": "La frase utiliza «Siapa»."
                                        },
                                        {
                                            "vocabId": "v12",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «De / desde».",
                                            "answer": "Saya dari Peru.",
                                            "explanation": "La oración contiene «Dari»."
                                        },
                                        {
                                            "vocabId": "v13",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Tinggal.",
                                            "hint": "Puedes tomar como modelo: Saya tinggal di Managua.",
                                            "modelAnswer": "Saya tinggal di Managua.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "v14",
                                            "type": "order",
                                            "prompt": "Ordena: ¡Encantado/a de conocerte!",
                                            "words": [
                                                "denganmu",
                                                "bertemu",
                                                "Senang"
                                            ],
                                            "correctOrder": [
                                                "Senang",
                                                "bertemu",
                                                "denganmu"
                                            ],
                                            "explanation": "La frase completa es: Senang bertemu denganmu!"
                                        },
                                        {
                                            "vocabId": "v101",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Kota»?",
                                            "options": [
                                                "Ciudad",
                                                "Nombre",
                                                "Quién"
                                            ],
                                            "answer": 0,
                                            "explanation": "«Kota» significa «Ciudad»."
                                        },
                                        {
                                            "vocabId": "v102",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Indonesia es un país grande.",
                                            "answer": "Indonesia adalah negara besar.",
                                            "explanation": "La frase utiliza «Negara»."
                                        },
                                        {
                                            "vocabId": "v103",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Dirección».",
                                            "answer": "Apa alamatmu?",
                                            "explanation": "La oración contiene «Alamat»."
                                        }
                                    ]
                                }
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
                            ,
                                            {
                                                "vocabId": "v40",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «empat»?",
                                                "options": [
                                                    "Cuatro",
                                                    "Cinco",
                                                    "Seis"
                                                ],
                                                "answer": 0,
                                                "explanation": "Empat significa cuatro."
                                            },
                                            {
                                                "vocabId": "v41",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «lima»?",
                                                "options": [
                                                    "Cuatro",
                                                    "Cinco",
                                                    "Siete"
                                                ],
                                                "answer": 1,
                                                "explanation": "Lima significa cinco."
                                            }
],
                            lessons:                                                         [
                                {
                                    "title": "Lección 1: Contar del uno al tres",
                                    "objective": "Reconoce y usa los números del uno al tres en cantidades sencillas.",
                                    "grammar": "Satu, dua y tiga expresan cantidades. Practica el número antes del sustantivo en grupos nominales sencillos.",
                                    "vocabIds": [
                                        "v15",
                                        "v16",
                                        "v17"
                                    ],
                                    "reviewVocabIds": [],
                                    "exercises": [
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
                                            "vocabId": "v17",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: tres años",
                                            "answer": "Tiga tahun",
                                            "explanation": "Tiga tahun significa tres años."
                                        },
                                        {
                                            "vocabId": "v15",
                                            "type": "write",
                                            "prompt": "Escribe una frase con un número o una edad que hayas aprendido.",
                                            "hint": "Escribe una oración completa y revisa el orden de las palabras.",
                                            "modelAnswer": "Saya berumur lima tahun.",
                                            "explanation": "Este ejemplo significa «Tengo cinco años». Usa un número que conozcas de la unidad."
                                        },
                                        {
                                            "vocabId": "v17",
                                            "type": "order",
                                            "prompt": "Ordena: Tres",
                                            "words": [
                                                "buku",
                                                "Tiga"
                                            ],
                                            "correctOrder": [
                                                "Tiga",
                                                "buku"
                                            ],
                                            "explanation": "La frase completa es: Tiga buku."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Preguntar cantidades y años",
                                    "objective": "Pregunta cuántos o cuántos años y comprende tahun en respuestas breves.",
                                    "grammar": "Berapa pregunta cuánto o cuántos y tahun significa año. Puedes preguntar Berapa tahun? y responder con una cantidad ya conocida.",
                                    "vocabIds": [
                                        "v18",
                                        "v19"
                                    ],
                                    "reviewVocabIds": [
                                        "v15",
                                        "v16",
                                        "v17"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v18",
                                            "type": "mc",
                                            "prompt": "¿Qué pregunta berapa?",
                                            "options": [
                                                "cuánto o cuántos",
                                                "dónde",
                                                "quién"
                                            ],
                                            "answer": 0,
                                            "explanation": "Berapa pregunta por una cantidad o un número."
                                        },
                                        {
                                            "vocabId": "v19",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Tahun.",
                                            "hint": "Puedes tomar como modelo: Tiga tahun.",
                                            "modelAnswer": "Tiga tahun.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "v19",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Año».",
                                            "answer": "Tiga tahun.",
                                            "explanation": "La oración contiene «Tahun»."
                                        }
                                    ,
                                        {
                                            "vocabId": "v15",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Satu»?",
                                            "options": ["Uno","Dos","Tres"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Uno»."
                                        },
                                        {
                                            "vocabId": "v16",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Dua»?",
                                            "options": ["Dos","Uno","Tres"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Dos»."
                                        },
                                        {
                                            "vocabId": "v17",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tiga»?",
                                            "options": ["Tres","Uno","Dos"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Tres»."
                                        }]
                                },
                                {
                                    "title": "Lección 3: Contar cuatro y cinco; hablar de edad",
                                    "objective": "Amplía el conteo con cuatro, cinco y seis y los aplica a personas y objetos.",
                                    "grammar": "Empat y lima continúan el conteo; sepuluh expresa diez y umur significa edad. Practica los números en frases cortas con teman y buku.",
                                    "vocabIds": [
                                        "v40",
                                        "v41",
                                        "v42",
                                        "v43"
                                    ],
                                    "reviewVocabIds": [
                                        "v15",
                                        "v16",
                                        "v17",
                                        "v18",
                                        "v19"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v40",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «empat»?",
                                            "options": [
                                                "Cuatro",
                                                "Cinco",
                                                "Seis"
                                            ],
                                            "answer": 0,
                                            "explanation": "Empat significa cuatro."
                                        },
                                        {
                                            "vocabId": "v41",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «lima»?",
                                            "options": [
                                                "Cuatro",
                                                "Cinco",
                                                "Siete"
                                            ],
                                            "answer": 1,
                                            "explanation": "Lima significa cinco."
                                        },
                                        {
                                            "vocabId": "v41",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Cinco».",
                                            "answer": "Lima teman.",
                                            "explanation": "La oración contiene «Lima»."
                                        },
                                        {
                                            "vocabId": "v42",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Sepuluh»?",
                                            "options": ["Diez", "Seis", "Ocho"],
                                            "answer": 0,
                                            "explanation": "Sepuluh significa diez."
                                        },
                                        {
                                            "vocabId": "v43",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Umur»?",
                                            "options": ["Edad", "Año", "Número"],
                                            "answer": 0,
                                            "explanation": "Umur significa edad."
                                        },

                                        {
                                            "vocabId": "v15",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Satu»?",
                                            "options": ["Uno","Dos","Tres"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Uno»."
                                        },
                                        {
                                            "vocabId": "v16",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Dua»?",
                                            "options": ["Dos","Uno","Tres"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Dos»."
                                        },
                                        {
                                            "vocabId": "v17",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tiga»?",
                                            "options": ["Tres","Uno","Dos"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Tres»."
                                        },
                                        {
                                            "vocabId": "v18",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Berapa»?",
                                            "options": ["Cuánto / cuántos","Uno","Dos"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Cuánto / cuántos»."
                                        },
                                        {
                                            "vocabId": "v19",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tahun»?",
                                            "options": ["Año","Uno","Dos"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Año»."
                                        }]
                                },
                                {
                                    "title": "Lección 4: Contar seis, siete y ocho",
                                    "objective": "Reconoce siete, ocho y diez y pregunta o responde la edad de una persona.",
                                    "grammar": "Enam, tujuh y delapan amplían el conteo. Practica cada número en frases cortas con buku, hari y orang.",
                                    "vocabIds": [
                                        "v105",
                                        "v106",
                                        "v107"
                                    ],
                                    "reviewVocabIds": [
                                        "v15",
                                        "v16",
                                        "v17",
                                        "v18",
                                        "v19",
                                        "v40",
                                        "v41",
                                        "v42",
                                        "v43"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v105",
                                            "type": "mc",
                                            "prompt": "¿Cómo se dice seis?",
                                            "options": ["Enam", "Tujuh", "Delapan"],
                                            "answer": 0,
                                            "explanation": "Enam significa seis."
                                        },
                                        {
                                            "vocabId": "v105",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Enam.",
                                            "hint": "Puedes tomar como modelo: Enam buku.",
                                            "modelAnswer": "Enam buku.",
                                            "explanation": "Usa el vocabulario en una oración completa."
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
                                            "options": [
                                                "Diez años",
                                                "Siete días",
                                                "Ocho personas"
                                            ],
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
                                            "vocabId": "v106",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: siete",
                                            "answer": "Tujuh",
                                            "explanation": "Tujuh significa siete."
                                        },
                                        {
                                            "vocabId": "v107",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe el número",
                                            "answer": "Delapan",
                                            "explanation": "Delapan significa ocho."
                                        }
                                    ,
                                        {
                                            "vocabId": "v15",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Satu»?",
                                            "options": ["Uno","Dos","Tres"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Uno»."
                                        },
                                        {
                                            "vocabId": "v16",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Dua»?",
                                            "options": ["Dos","Uno","Tres"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Dos»."
                                        },
                                        {
                                            "vocabId": "v17",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tiga»?",
                                            "options": ["Tres","Uno","Dos"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Tres»."
                                        },
                                        {
                                            "vocabId": "v40",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Empat»?",
                                            "options": ["Cuatro","Uno","Dos"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Cuatro»."
                                        },
                                        {
                                            "vocabId": "v41",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Lima»?",
                                            "options": ["Cinco","Uno","Dos"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Cinco»."
                                        },
                                        {
                                            "vocabId": "v105",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Enam»?",
                                            "options": ["Seis","Uno","Dos"],
                                            "answer": 0,
                                            "explanation": "La respuesta correcta es «Seis»."
                                        }]
                                },
                                {
                                    "title": "Lección 5: Recuperación espaciada y uso integrado",
                                    "objective": "Recupera el vocabulario de toda la unidad y úsalo en comprensión, traducción y producción.",
                                    "grammar": "Repasa las expresiones y estructuras de las cuatro lecciones anteriores. Recupera cada término desde su significado y úsalo dentro de una oración completa.",
                                    "vocabIds": [],
                                    "reviewVocabIds": [
                                        "v15",
                                        "v16",
                                        "v17",
                                        "v18",
                                        "v19",
                                        "v40",
                                        "v41",
                                        "v42",
                                        "v43",
                                        "v105",
                                        "v106",
                                        "v107"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v15",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Satu»?",
                                            "options": [
                                                "Uno",
                                                "Dos",
                                                "Tres"
                                            ],
                                            "answer": 0,
                                            "explanation": "«Satu» significa «Uno»."
                                        },
                                        {
                                            "vocabId": "v16",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Dos amigos.",
                                            "answer": "Dua teman.",
                                            "explanation": "La frase utiliza «Dua»."
                                        },
                                        {
                                            "vocabId": "v17",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Tres».",
                                            "answer": "Tiga tahun.",
                                            "explanation": "La oración contiene «Tiga»."
                                        },
                                        {
                                            "vocabId": "v18",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Berapa.",
                                            "hint": "Puedes tomar como modelo: Berapa umur kamu?",
                                            "modelAnswer": "Berapa umur kamu?",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "v19",
                                            "type": "order",
                                            "prompt": "Ordena: Tengo cinco años.",
                                            "words": [
                                                "tahun",
                                                "lima",
                                                "berumur",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "berumur",
                                                "lima",
                                                "tahun"
                                            ],
                                            "explanation": "La frase completa es: Saya berumur lima tahun."
                                        },
                                        {
                                            "vocabId": "v40",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Empat»?",
                                            "options": [
                                                "Cuatro",
                                                "Uno",
                                                "Dos"
                                            ],
                                            "answer": 0,
                                            "explanation": "«Empat» significa «Cuatro»."
                                        },
                                        {
                                            "vocabId": "v41",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Cinco amigos.",
                                            "answer": "Lima teman.",
                                            "explanation": "La frase utiliza «Lima»."
                                        },
                                        {
                                            "vocabId": "v42",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración que corresponde a «Diez».",
                                            "answer": "Sepuluh tahun.",
                                            "explanation": "La oración contiene «Sepuluh»."
                                        },
                                        {
                                            "vocabId": "v43",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando Umur.",
                                            "hint": "Puedes tomar como modelo: Berapa umur kamu?",
                                            "modelAnswer": "Berapa umur kamu?",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "v105",
                                            "type": "order",
                                            "prompt": "Ordena: Seis libros.",
                                            "words": [
                                                "buku",
                                                "Enam"
                                            ],
                                            "correctOrder": [
                                                "Enam",
                                                "buku"
                                            ],
                                            "explanation": "La frase completa es: Enam buku."
                                        },
                                        {
                                            "vocabId": "v106",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tujuh»?",
                                            "options": [
                                                "Siete",
                                                "Uno",
                                                "Dos"
                                            ],
                                            "answer": 0,
                                            "explanation": "«Tujuh» significa «Siete»."
                                        },
                                        {
                                            "vocabId": "v107",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Ocho personas.",
                                            "answer": "Delapan orang.",
                                            "explanation": "La frase utiliza «Delapan»."
                                        }
                                    ]
                                }
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
                                {"vocabId":"v111","type":"write","prompt":"Escribe una frase sobre tu familia.","hint":"Intenta construir una frase nueva con el vocabulario de la unidad.","modelAnswer":"Ini adik saya.","explanation":"Ini adik saya significa «Este/a es mi hermano/a menor»."}
                            ]
                        ,
    lessons: [
        {
                    title: "Lección 1: Presentar a la familia",
                    objective: "Presenta a tu familia con una frase sencilla.",
                    grammar: "Usa Ini antes de un nombre para presentar a alguien; keluarga saya significa mi familia.",
                    vocabIds: ["v20","v21"],
                    reviewVocabIds: [],
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
                        { vocabId: 'v20', type: 'write', prompt: "Escribe una frase sobre una persona de tu familia.", hint: "Usa una palabra de familia que hayas aprendido.", modelAnswer: "Ini ibu saya.", explanation: "Ini ibu saya significa «Esta es mi madre». Puedes cambiar ibu por otra palabra de familia." },
                        {"vocabId":"v21","type":"mc","prompt":"¿Qué significa ibu?","options":["Madre / señora","Padre","Hermano menor"],"answer":0,"explanation":"Ibu significa madre y también es un tratamiento respetuoso."}
                    ]
                },
        {
                    title: "Lección 2: Hablar de madre y padre",
                    objective: "Identifica y presenta a la madre y al padre.",
                    grammar: "Ini ibu saya e Ini ayah saya presentan a la madre y al padre; saya indica posesión.",
                    vocabIds: ["v22"],
                    reviewVocabIds: ["v20","v21"],
                    exercises: [
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
                                                                            "vocabId": "v22",
                                                                            "type": "mc",
                                                                            "prompt": "Escucha la frase y elige su significado",
                                                                            "audioText": "Ini ayah saya",
                                                                            "options": ["Esta es mi madre", "Este es mi padre", "Este es mi hermano menor"],
                                                                            "answer": 1,
                                                                            "explanation": "Ini ayah saya significa «Este es mi padre»."
                                                                        },
                        {
                                                                            "vocabId": "v22",
                                                                            "type": "translate_es_id",
                                                                            "prompt": "Traduce: Este es mi padre",
                                                                            "answer": "Ini ayah saya",
                                                                            "explanation": "Ini ayah saya significa Este es mi padre."
                                                                        },
                        {"vocabId":"v22","type":"translate_es_id","prompt":"Traduce: padre","answer":"Ayah","explanation":"Ayah significa padre."},
                        {"vocabId":"v20","type":"mc","prompt":"Recupera «Keluarga»: ¿qué significa?","options":["Familia","Madre","Padre"],"answer":0,"explanation":"Keluarga significa Familia. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v21","type":"mc","prompt":"Recupera «Ibu»: ¿qué significa?","options":["Madre","Familia","Padre"],"answer":0,"explanation":"Ibu significa Madre. Esta pregunta recupera una palabra de una lección anterior."}
                    ]
                },
        {
                    title: "Lección 3: Hablar de hijos",
                    objective: "Habla de hijos y de personas de la familia.",
                    grammar: "Dia puede referirse a él o ella; anak saya significa mi hijo o hija.",
                    vocabIds: ["v23"],
                    reviewVocabIds: ["v20","v21","v22"],
                    exercises: [
                        {
                                                                            "vocabId": "v23",
                                                                            "type": "translate_es_id",
                                                                            "prompt": "Traduce: Él es mi hijo",
                                                                            "answer": "Dia anak saya",
                                                                            "explanation": "Dia anak saya significa Él es mi hijo."
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
                                                                            "vocabId": "v21",
                                                                            "type": "listen",
                                                                            "prompt": "Escribe lo que escuchas",
                                                                            "answer": "Ini ibu saya",
                                                                            "explanation": "La frase describe a la madre."
                                                                        },
                        {"vocabId":"v22","type":"mc","prompt":"Recupera «Ayah»: ¿qué significa?","options":["Padre","Familia","Madre"],"answer":0,"explanation":"Ayah significa Padre. Esta pregunta recupera una palabra de una lección anterior."}
                    ]
                },
        {
                    title: "Lección 4: Hablar de amistades y familia",
                    objective: "Describe a un amigo y a un hermano o hermana menor.",
                    grammar: "Teman saya significa mi amigo o amiga; adik se refiere a un hermano o hermana menor.",
                    vocabIds: ["v53","v111"],
                    reviewVocabIds: ["v20","v21","v22","v23"],
                    exercises: [
                        {
                                                                            "vocabId": "v53",
                                                                            "type": "translate_es_id",
                                                                            "prompt": "Traduce: amigo o amiga",
                                                                            "answer": "Teman",
                                                                            "explanation": "Teman significa amigo o amiga."
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
                        {"vocabId":"v111","type":"write","prompt":"Escribe una frase sobre tu familia.","hint":"Intenta construir una frase nueva con el vocabulario de la unidad.","modelAnswer":"Ini adik saya.","explanation":"Ini adik saya significa «Este/a es mi hermano/a menor»."},
                        {"vocabId":"v20","type":"mc","prompt":"Recupera «Keluarga»: ¿qué significa?","options":["Familia","Madre","Padre"],"answer":0,"explanation":"Keluarga significa Familia. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v21","type":"mc","prompt":"Recupera «Ibu»: ¿qué significa?","options":["Madre","Familia","Padre"],"answer":0,"explanation":"Ibu significa Madre. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v22","type":"mc","prompt":"Recupera «Ayah»: ¿qué significa?","options":["Padre","Familia","Madre"],"answer":0,"explanation":"Ayah significa Padre. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v23","type":"mc","prompt":"Recupera «Anak»: ¿qué significa?","options":["Niño/a; hijo/a","Familia","Madre"],"answer":0,"explanation":"Anak significa Niño/a; hijo/a. Esta pregunta recupera una palabra de una lección anterior."}
                    ]
                },
        {
                    title: "Lección 5: Recuperación espaciada",
                    objective: "Recupera el vocabulario de toda la unidad en tareas variadas, sin introducir palabras nuevas.",
                    grammar: "Combina las estructuras y expresiones de las cuatro lecciones anteriores; intenta recordar primero y consulta la pista solo después.",
                    vocabIds: [],
                    reviewVocabIds: ["v20","v21","v22","v23","v53","v111"],
                    exercises: [
                        {
                            "vocabId": "v20",
                            "type": "mc",
                            "prompt": "¿Qué significa «Keluarga»?",
                            "options": [
                                "Familia",
                                "Madre",
                                "Padre"
                            ],
                            "answer": 0,
                            "explanation": "Keluarga significa Familia."
                        },
                        {
                            "vocabId": "v21",
                            "type": "translate_es_id",
                            "prompt": "Traduce: Madre",
                            "answer": "Ibu",
                            "explanation": "Ibu significa Madre."
                        },
                        {
                            "vocabId": "v22",
                            "type": "order",
                            "prompt": "Ordena la frase relacionada con esta palabra.",
                            "words": [
                                "saya",
                                "ayah",
                                "Ini"
                            ],
                            "correctOrder": [
                                "Ini",
                                "ayah",
                                "saya"
                            ],
                            "explanation": "La frase practica Ayah en contexto."
                        },
                        {
                            "vocabId": "v23",
                            "type": "listen",
                            "prompt": "Escucha y escribe la expresión.",
                            "answer": "Dia anak saya",
                            "explanation": "La expresión practica Anak."
                        },
                        {
                            "vocabId": "v53",
                            "type": "write",
                            "prompt": "Escribe una frase con «Teman».",
                            "hint": "Usa la palabra en una frase breve y completa.",
                            "modelAnswer": "Dia teman saya.",
                            "explanation": "Él/ella es mi amigo/a."
                        },
                        {
                            "vocabId": "v111",
                            "type": "mc",
                            "prompt": "¿Qué significa «Adik»?",
                            "options": [
                                "Hermano/a menor",
                                "Familia",
                                "Madre"
                            ],
                            "answer": 0,
                            "explanation": "Adik significa Hermano/a menor."
                        }
                    ]
                }
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
                        ,
    lessons: [
        {
                    title: "Lección 1: Comer y beber",
                    objective: "Distingue las acciones de comer y beber en frases cotidianas.",
                    grammar: "Makan significa comer y minum significa beber; el verbo va después del sujeto.",
                    vocabIds: ["v46","v47"],
                    reviewVocabIds: [],
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
                        { vocabId: 'v46', type: 'write', prompt: "Escribe qué comida o bebida te gustaría mencionar.", hint: "Combina saya makan o saya minum con vocabulario de comida.", modelAnswer: "Saya makan nasi.", explanation: "La frase significa «Yo como arroz cocido». Hay otras respuestas posibles." }
                    ]
                },
        {
                    title: "Lección 2: Hablar de agua y arroz",
                    objective: "Nombra agua y arroz y construye frases con makan y minum.",
                    grammar: "Air significa agua y nasi arroz cocido; usa Saya minum air y Saya makan nasi como modelos.",
                    vocabIds: ["v48","v49"],
                    reviewVocabIds: ["v46","v47"],
                    exercises: [
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
                                                                            "vocabId": "v48",
                                                                            "type": "translate_es_id",
                                                                            "prompt": "Traduce: agua",
                                                                            "answer": "Air",
                                                                            "explanation": "Air significa agua."
                                                                        },
                        {"vocabId":"v46","type":"mc","prompt":"Recupera «Makan»: ¿qué significa?","options":["Comer","Beber","Agua"],"answer":0,"explanation":"Makan significa Comer. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v47","type":"mc","prompt":"Recupera «Minum»: ¿qué significa?","options":["Beber","Comer","Agua"],"answer":0,"explanation":"Minum significa Beber. Esta pregunta recupera una palabra de una lección anterior."}
                    ]
                },
        {
                    title: "Lección 3: Pedir algo con cortesía",
                    objective: "Formula una petición cortés y reconoce la palabra para té.",
                    grammar: "Tolong introduce una petición o una solicitud de ayuda.",
                    vocabIds: ["v29","v113"],
                    reviewVocabIds: ["v46","v47","v48","v49"],
                    exercises: [
                        {
                                                                            "vocabId": "v29",
                                                                            "type": "translate_es_id",
                                                                            "prompt": "Traduce: por favor, para pedir algo",
                                                                            "answer": "Tolong",
                                                                            "explanation": "Tolong se usa al pedir ayuda o formular una petición."
                                                                        },
                        {
                                                                            "vocabId": "v29",
                                                                            "type": "order",
                                                                            "prompt": "Ordena una petición: Por favor, quiero agua",
                                                                            "words": ["air", "mau", "saya", "Tolong"],
                                                                            "correctOrder": ["Tolong", "saya", "mau", "air"],
                                                                            "explanation": "Tolong, saya mau air significa «Quiero agua, por favor»."
                                                                        },
                        {"vocabId":"v113","type":"mc","prompt":"¿Qué significa teh?","options":["Té","Café","Agua"],"answer":0,"explanation":"Teh significa té."},
                        {"vocabId":"v46","type":"mc","prompt":"Recupera «Makan»: ¿qué significa?","options":["Comer","Beber","Agua"],"answer":0,"explanation":"Makan significa Comer. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v47","type":"mc","prompt":"Recupera «Minum»: ¿qué significa?","options":["Beber","Comer","Agua"],"answer":0,"explanation":"Minum significa Beber. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v48","type":"mc","prompt":"Recupera «Air»: ¿qué significa?","options":["Agua","Comer","Beber"],"answer":0,"explanation":"Air significa Agua. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v49","type":"mc","prompt":"Recupera «Nasi»: ¿qué significa?","options":["Arroz cocido","Comer","Beber"],"answer":0,"explanation":"Nasi significa Arroz cocido. Esta pregunta recupera una palabra de una lección anterior."}
                    ]
                },
        {
                    title: "Lección 4: Elegir bebidas y preguntar el precio",
                    objective: "Nombra el café y pregunta cuánto cuesta algo.",
                    grammar: "Kopi significa café y Berapa harganya? pregunta el precio de algo.",
                    vocabIds: ["v114","v115"],
                    reviewVocabIds: ["v46","v47","v48","v49","v29","v113"],
                    exercises: [
                        {"vocabId":"v114","type":"translate_es_id","prompt":"Traduce: café","answer":"Kopi","explanation":"Kopi significa café."},
                        {"vocabId":"v115","type":"mc","prompt":"Escucha la pregunta y elige su significado","audioText":"Berapa harganya?","options":["¿Dónde está el agua?","¿Cuánto cuesta?","¿Cómo te llamas?"],"answer":1,"explanation":"Berapa harganya? significa «¿Cuánto cuesta?»"},
                        {"vocabId":"v114","type":"listen","prompt":"Escucha y escribe la palabra para café.","answer":"Kopi","explanation":"Kopi significa café."},
                        {"vocabId":"v115","type":"write","prompt":"Escribe la pregunta para saber cuánto cuesta algo.","hint":"Usa la expresión que acabas de aprender.","modelAnswer":"Berapa harganya?","explanation":"Berapa harganya? significa «¿Cuánto cuesta?»."},
                        {"vocabId":"v46","type":"mc","prompt":"Recupera «Makan»: ¿qué significa?","options":["Comer","Beber","Agua"],"answer":0,"explanation":"Makan significa Comer. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v47","type":"mc","prompt":"Recupera «Minum»: ¿qué significa?","options":["Beber","Comer","Agua"],"answer":0,"explanation":"Minum significa Beber. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v48","type":"mc","prompt":"Recupera «Air»: ¿qué significa?","options":["Agua","Comer","Beber"],"answer":0,"explanation":"Air significa Agua. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v49","type":"mc","prompt":"Recupera «Nasi»: ¿qué significa?","options":["Arroz cocido","Comer","Beber"],"answer":0,"explanation":"Nasi significa Arroz cocido. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v29","type":"mc","prompt":"Recupera «Tolong»: ¿qué significa?","options":["Por favor (al pedir una acción) / ayudar","Comer","Beber"],"answer":0,"explanation":"Tolong significa Por favor (al pedir una acción) / ayudar. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v113","type":"mc","prompt":"Recupera «Teh»: ¿qué significa?","options":["Té","Comer","Beber"],"answer":0,"explanation":"Teh significa Té. Esta pregunta recupera una palabra de una lección anterior."}
                    ]
                },
        {
                    title: "Lección 5: Recuperación espaciada",
                    objective: "Recupera el vocabulario de toda la unidad en tareas variadas, sin introducir palabras nuevas.",
                    grammar: "Combina las estructuras y expresiones de las cuatro lecciones anteriores; intenta recordar primero y consulta la pista solo después.",
                    vocabIds: [],
                    reviewVocabIds: ["v46","v47","v48","v49","v29","v113","v114","v115"],
                    exercises: [
                        {
                            "vocabId": "v46",
                            "type": "mc",
                            "prompt": "¿Qué significa «Makan»?",
                            "options": [
                                "Comer",
                                "Beber",
                                "Agua"
                            ],
                            "answer": 0,
                            "explanation": "Makan significa Comer."
                        },
                        {
                            "vocabId": "v47",
                            "type": "translate_es_id",
                            "prompt": "Traduce: Beber",
                            "answer": "Minum",
                            "explanation": "Minum significa Beber."
                        },
                        {
                            "vocabId": "v48",
                            "type": "order",
                            "prompt": "Ordena la frase relacionada con esta palabra.",
                            "words": [
                                "air",
                                "minum",
                                "Saya"
                            ],
                            "correctOrder": [
                                "Saya",
                                "minum",
                                "air"
                            ],
                            "explanation": "La frase practica Air en contexto."
                        },
                        {
                            "vocabId": "v49",
                            "type": "listen",
                            "prompt": "Escucha y escribe la expresión.",
                            "answer": "Saya makan nasi",
                            "explanation": "La expresión practica Nasi."
                        },
                        {
                            "vocabId": "v29",
                            "type": "write",
                            "prompt": "Escribe una frase con «Tolong».",
                            "hint": "Usa la palabra en una frase breve y completa.",
                            "modelAnswer": "Tolong!",
                            "explanation": "¡Ayuda, por favor!"
                        },
                        {
                            "vocabId": "v113",
                            "type": "mc",
                            "prompt": "¿Qué significa «Teh»?",
                            "options": [
                                "Té",
                                "Comer",
                                "Beber"
                            ],
                            "answer": 0,
                            "explanation": "Teh significa Té."
                        },
                        {
                            "vocabId": "v114",
                            "type": "translate_es_id",
                            "prompt": "Traduce: Café",
                            "answer": "Kopi",
                            "explanation": "Kopi significa Café."
                        },
                        {
                            "vocabId": "v115",
                            "type": "order",
                            "prompt": "Ordena la frase relacionada con esta palabra.",
                            "words": [
                                "harganya",
                                "Berapa"
                            ],
                            "correctOrder": [
                                "Berapa",
                                "harganya"
                            ],
                            "explanation": "La frase practica Berapa harganya? en contexto."
                        }
                    ]
                }
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
                        ,
    lessons: [
        {
                    title: "Lección 1: Nombrar casa y escuela",
                    objective: "Reconoce y nombra dos lugares habituales: casa y escuela.",
                    grammar: "Rumah significa casa y sekolah escuela; di indica ubicación en expresiones como di rumah.",
                    vocabIds: ["v30","v31"],
                    reviewVocabIds: [],
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
                        { vocabId: 'v30', type: 'write', prompt: "Escribe una frase que indique dónde está algo.", hint: "Intenta usar di y una palabra de lugar de la unidad.", modelAnswer: "Saya di rumah.", explanation: "La frase significa «Estoy en casa». Adapta la frase al vocabulario que conozcas." },
                        {"vocabId":"v30","type":"mc","prompt":"¿Qué significa rumah?","options":["Casa","Escuela","Estación"],"answer":0,"explanation":"Rumah significa casa."},
                        {"vocabId":"v31","type":"translate_es_id","prompt":"Traduce: escuela","answer":"Sekolah","explanation":"Sekolah significa escuela."}
                    ]
                },
        {
                    title: "Lección 2: Preguntar dónde está algo",
                    objective: "Pregunta por la ubicación de un lugar con Di mana.",
                    grammar: "Di mana se usa para preguntar dónde está algo; después se nombra el lugar.",
                    vocabIds: ["v32"],
                    reviewVocabIds: ["v30","v31"],
                    exercises: [
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
                                                                            "vocabId": "v32",
                                                                            "type": "mc",
                                                                            "prompt": "Escucha la pregunta y elige su significado",
                                                                            "audioText": "Di mana sekolah?",
                                                                            "options": ["¿Dónde está la escuela?", "¿Dónde está mi casa?", "¿Quién está en la ciudad?"],
                                                                            "answer": 0,
                                                                            "explanation": "Di mana sekolah? pregunta dónde está la escuela."
                                                                        },
                        {
                                                                            "vocabId": "v32",
                                                                            "type": "translate_es_id",
                                                                            "prompt": "Traduce: ¿Dónde está la escuela?",
                                                                            "answer": "Di mana sekolah",
                                                                            "explanation": "Di mana sekolah pregunta dónde está la escuela."
                                                                        },
                        {"vocabId":"v30","type":"mc","prompt":"Recupera «Rumah»: ¿qué significa?","options":["Casa","Escuela","Dónde"],"answer":0,"explanation":"Rumah significa Casa. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v31","type":"mc","prompt":"Recupera «Sekolah»: ¿qué significa?","options":["Escuela","Casa","Dónde"],"answer":0,"explanation":"Sekolah significa Escuela. Esta pregunta recupera una palabra de una lección anterior."}
                    ]
                },
        {
                    title: "Lección 3: Hablar de la ciudad",
                    objective: "Habla de la ciudad y de dónde vive alguien.",
                    grammar: "Kota significa ciudad; Saya tinggal di kota expresa que vivo en la ciudad.",
                    vocabIds: ["v101"],
                    reviewVocabIds: ["v30","v31","v32"],
                    exercises: [
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
                                                                            "vocabId": "v101",
                                                                            "type": "translate_es_id",
                                                                            "prompt": "Traduce: Vivo en la ciudad",
                                                                            "answer": "Saya tinggal di kota",
                                                                            "explanation": "Kota significa ciudad."
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
                        {"vocabId":"v32","type":"mc","prompt":"Recupera «Di mana»: ¿qué significa?","options":["Dónde","Casa","Escuela"],"answer":0,"explanation":"Di mana significa Dónde. Esta pregunta recupera una palabra de una lección anterior."}
                    ]
                },
        {
                    title: "Lección 4: Indicar aquí y cerca",
                    objective: "Indica que algo está aquí o cerca de otro lugar.",
                    grammar: "Di sini significa aquí y dekat significa cerca; usa dekat para relacionar dos lugares.",
                    vocabIds: ["v34","v119"],
                    reviewVocabIds: ["v30","v31","v32","v101"],
                    exercises: [
                        {
                                                                            "vocabId": "v34",
                                                                            "type": "translate_es_id",
                                                                            "prompt": "Traduce: aquí",
                                                                            "answer": "Di sini",
                                                                            "explanation": "Di sini significa aquí."
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
                        {"vocabId":"v119","type":"write","prompt":"Describe dónde está un lugar.","hint":"Intenta construir una frase nueva con el vocabulario de la unidad.","modelAnswer":"Sekolah dekat rumah saya.","explanation":"Usa dekat (cerca) o jauh (lejos)."},
                        {"vocabId":"v30","type":"mc","prompt":"Recupera «Rumah»: ¿qué significa?","options":["Casa","Escuela","Dónde"],"answer":0,"explanation":"Rumah significa Casa. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v31","type":"mc","prompt":"Recupera «Sekolah»: ¿qué significa?","options":["Escuela","Casa","Dónde"],"answer":0,"explanation":"Sekolah significa Escuela. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v32","type":"mc","prompt":"Recupera «Di mana»: ¿qué significa?","options":["Dónde","Casa","Escuela"],"answer":0,"explanation":"Di mana significa Dónde. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v101","type":"mc","prompt":"Recupera «Kota»: ¿qué significa?","options":["Ciudad","Casa","Escuela"],"answer":0,"explanation":"Kota significa Ciudad. Esta pregunta recupera una palabra de una lección anterior."}
                    ]
                },
        {
                    title: "Lección 5: Recuperación espaciada",
                    objective: "Recupera el vocabulario de toda la unidad en tareas variadas, sin introducir palabras nuevas.",
                    grammar: "Combina las estructuras y expresiones de las cuatro lecciones anteriores; intenta recordar primero y consulta la pista solo después.",
                    vocabIds: [],
                    reviewVocabIds: ["v30","v31","v32","v101","v34","v119"],
                    exercises: [
                        {
                            "vocabId": "v30",
                            "type": "mc",
                            "prompt": "¿Qué significa «Rumah»?",
                            "options": [
                                "Casa",
                                "Escuela",
                                "Dónde"
                            ],
                            "answer": 0,
                            "explanation": "Rumah significa Casa."
                        },
                        {
                            "vocabId": "v31",
                            "type": "translate_es_id",
                            "prompt": "Traduce: Escuela",
                            "answer": "Sekolah",
                            "explanation": "Sekolah significa Escuela."
                        },
                        {
                            "vocabId": "v32",
                            "type": "order",
                            "prompt": "Ordena la frase relacionada con esta palabra.",
                            "words": [
                                "sekolah",
                                "mana",
                                "Di"
                            ],
                            "correctOrder": [
                                "Di",
                                "mana",
                                "sekolah"
                            ],
                            "explanation": "La frase practica Di mana en contexto."
                        },
                        {
                            "vocabId": "v101",
                            "type": "listen",
                            "prompt": "Escucha y escribe la expresión.",
                            "answer": "Saya tinggal di kota",
                            "explanation": "La expresión practica Kota."
                        },
                        {
                            "vocabId": "v34",
                            "type": "write",
                            "prompt": "Escribe una frase con «Di sini».",
                            "hint": "Usa la palabra en una frase breve y completa.",
                            "modelAnswer": "Saya di sini.",
                            "explanation": "Estoy aquí."
                        },
                        {
                            "vocabId": "v119",
                            "type": "mc",
                            "prompt": "¿Qué significa «Dekat»?",
                            "options": [
                                "Cerca",
                                "Casa",
                                "Escuela"
                            ],
                            "answer": 0,
                            "explanation": "Dekat significa Cerca."
                        }
                    ]
                }
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
                        ,
    lessons: [
        {
                            title: "Lección 1: Hablar de días y de hoy",
                            objective: "Distingue día y hoy y los usa en expresiones breves.",
                            grammar: "Hari significa día y Hari ini significa hoy; sitúan una acción en el tiempo.",
                            vocabIds: ["v35","v36"],
                            reviewVocabIds: [],
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
                                                                                                }
                    ]
                        },
        {
                            title: "Lección 2: Decir qué estudias",
                            objective: "Expresa que estudia o aprende algo.",
                            grammar: "Belajar significa estudiar o aprender; Saya belajar expresa esa acción.",
                            vocabIds: ["v37"],
                            reviewVocabIds: ["v35","v36"],
                            exercises: [
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
                                                                                                    "vocabId": "v37",
                                                                                                    "type": "listen",
                                                                                                    "prompt": "Escribe lo que escuchas",
                                                                                                    "answer": "Saya belajar bahasa Indonesia",
                                                                                                    "explanation": "La frase significa Estudio indonesio."
                                                                                                },
                        {"vocabId":"v36","type":"mc","prompt":"¿Qué significa hari ini?","options":["Hoy","Mañana","Ayer"],"answer":0,"explanation":"Hari ini significa hoy."},
                        {"vocabId":"v35","type":"mc","prompt":"Recupera «Hari»: ¿qué significa?","options":["Día","Hoy / este día","Estudiar / aprender"],"answer":0,"explanation":"Hari significa Día. Esta pregunta recupera una palabra de una lección anterior."}
                    ]
                        },
        {
                            title: "Lección 3: Hablar del trabajo",
                            objective: "Habla del trabajo con una frase sencilla.",
                            grammar: "Bekerja significa trabajar; Ayah saya bekerja significa mi padre trabaja.",
                            vocabIds: ["v38"],
                            reviewVocabIds: ["v35","v36","v37"],
                            exercises: [
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
                                                                                                    "vocabId": "v38",
                                                                                                    "type": "translate_es_id",
                                                                                                    "prompt": "Traduce: trabaja",
                                                                                                    "answer": "Bekerja",
                                                                                                    "explanation": "Bekerja significa trabajar."
                                                                                                },
                        { vocabId: 'v35', type: 'write', prompt: "Escribe una frase breve sobre tu rutina diaria.", hint: "Usa un día o una acción cotidiana que hayas aprendido.", modelAnswer: "Saya makan pagi.", explanation: "Saya makan pagi significa «Desayuno»; makan es comer y pagi es mañana." },
                        {"vocabId":"v36","type":"mc","prompt":"Recupera «Hari ini»: ¿qué significa?","options":["Hoy / este día","Día","Estudiar / aprender"],"answer":0,"explanation":"Hari ini significa Hoy / este día. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v37","type":"mc","prompt":"Recupera «Belajar»: ¿qué significa?","options":["Estudiar / aprender","Día","Hoy / este día"],"answer":0,"explanation":"Belajar significa Estudiar / aprender. Esta pregunta recupera una palabra de una lección anterior."}
                    ]
                        },
        {
                            title: "Lección 4: Describir descanso y rutinas",
                            objective: "Habla de dormir, de mañana y de acciones cotidianas.",
                            grammar: "Tidur significa dormir, besok mañana y setiap hari todos los días; sitúan rutinas.",
                            vocabIds: ["v50","v44","v122"],
                            reviewVocabIds: ["v35","v36","v37","v38"],
                            exercises: [
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
                        {"vocabId":"v122","type":"translate_es_id","prompt":"Traduce: mañana","answer":"Besok","explanation":"Besok significa mañana."},
                        {"vocabId":"v44","type":"write","prompt":"Escribe dos frases sobre tu rutina.","hint":"Intenta construir una frase nueva con el vocabulario de la unidad.","modelAnswer":"Hari ini saya belajar. Saya minum air setiap hari.","explanation":"Usa hari ini, besok o setiap hari."},
                        { vocabId: 'v44', type: 'write', prompt: 'Tarea integradora: preséntate, pide una bebida, pregunta el precio y describe tu rutina.', hint: 'Combina presentación, cortesía, una pregunta y una expresión temporal.', modelAnswer: 'Nama saya Ana. Saya dari Nikaragua. Saya mau teh, tolong. Berapa harganya? Saya belajar setiap hari.', explanation: 'La respuesta modelo combina varios objetivos A1; puedes usar tus propios datos y otras frases correctas.' },
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
                        {"vocabId":"v35","type":"mc","prompt":"Recupera «Hari»: ¿qué significa?","options":["Día","Hoy / este día","Estudiar / aprender"],"answer":0,"explanation":"Hari significa Día. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v36","type":"mc","prompt":"Recupera «Hari ini»: ¿qué significa?","options":["Hoy / este día","Día","Estudiar / aprender"],"answer":0,"explanation":"Hari ini significa Hoy / este día. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v37","type":"mc","prompt":"Recupera «Belajar»: ¿qué significa?","options":["Estudiar / aprender","Día","Hoy / este día"],"answer":0,"explanation":"Belajar significa Estudiar / aprender. Esta pregunta recupera una palabra de una lección anterior."},
                        {"vocabId":"v38","type":"mc","prompt":"Recupera «Bekerja»: ¿qué significa?","options":["Trabajar","Día","Hoy / este día"],"answer":0,"explanation":"Bekerja significa Trabajar. Esta pregunta recupera una palabra de una lección anterior."}
                    ]
                        },
        {
                            title: "Lección 5: Recuperación espaciada",
                            objective: "Recupera el vocabulario de toda la unidad en tareas variadas, sin introducir palabras nuevas.",
                            grammar: "Combina las estructuras y expresiones de las cuatro lecciones anteriores; intenta recordar primero y consulta la pista solo después.",
                            vocabIds: [],
                            reviewVocabIds: ["v35","v36","v37","v38","v50","v44","v122"],
                            exercises: [
                                {
                                                    "vocabId": "v35",
                                                    "type": "mc",
                                                    "prompt": "¿Qué significa «Hari»?",
                                                    "options": [
                                                        "Día",
                                                        "Hoy / este día",
                                                        "Estudiar / aprender"
                                                    ],
                                                    "answer": 0,
                                                    "explanation": "Hari significa Día."
                                                },
                                {
                                                    "vocabId": "v36",
                                                    "type": "translate_es_id",
                                                    "prompt": "Traduce: Hoy / este día",
                                                    "answer": "Hari ini",
                                                    "explanation": "Hari ini significa Hoy / este día."
                                                },
                                {
                                                    "vocabId": "v37",
                                                    "type": "order",
                                                    "prompt": "Ordena la frase relacionada con esta palabra.",
                                                    "words": [
                                                        "Indonesia",
                                                        "bahasa",
                                                        "belajar",
                                                        "Saya"
                                                    ],
                                                    "correctOrder": [
                                                        "Saya",
                                                        "belajar",
                                                        "bahasa",
                                                        "Indonesia"
                                                    ],
                                                    "explanation": "La frase practica Belajar en contexto."
                                                },
                                {
                                                    "vocabId": "v38",
                                                    "type": "listen",
                                                    "prompt": "Escucha y escribe la expresión.",
                                                    "answer": "Ayah saya bekerja",
                                                    "explanation": "La expresión practica Bekerja."
                                                },
                                {
                                                    "vocabId": "v50",
                                                    "type": "write",
                                                    "prompt": "Escribe una frase con «Tidur».",
                                                    "hint": "Usa la palabra en una frase breve y completa.",
                                                    "modelAnswer": "Saya tidur di malam hari.",
                                                    "explanation": "Duermo por la noche."
                                                },
                                {
                                                    "vocabId": "v44",
                                                    "type": "mc",
                                                    "prompt": "¿Qué significa «Setiap hari»?",
                                                    "options": [
                                                        "Todos los días",
                                                        "Día",
                                                        "Hoy / este día"
                                                    ],
                                                    "answer": 0,
                                                    "explanation": "Setiap hari significa Todos los días."
                                                },
                                {
                                                    "vocabId": "v122",
                                                    "type": "translate_es_id",
                                                    "prompt": "Traduce: Mañana",
                                                    "answer": "Besok",
                                                    "explanation": "Besok significa Mañana."
                                                }
                            ]
                        }
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
                            ,
                                            {
                                                "vocabId": "v273",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «tiga puluh dua»?",
                                                "options": [
                                                    "Treinta y dos",
                                                    "Treinta y ocho",
                                                    "Treinta y cuatro"
                                                ],
                                                "answer": 0,
                                                "explanation": "Tiga puluh dua significa treinta y dos."
                                            },
                                            {
                                                "vocabId": "v275",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «lima puluh delapan»?",
                                                "options": [
                                                    "Cincuenta y seis",
                                                    "Cincuenta y ocho",
                                                    "Cincuenta y nueve"
                                                ],
                                                "answer": 1,
                                                "explanation": "Lima puluh delapan significa cincuenta y ocho."
                                            },
                                            {
                                                "vocabId": "v276",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «enam puluh empat»?",
                                                "options": [
                                                    "Sesenta y cuatro",
                                                    "Sesenta y seis",
                                                    "Cuarenta y seis"
                                                ],
                                                "answer": 0,
                                                "explanation": "Enam puluh empat significa sesenta y cuatro."
                                            },
                                            {
                                                "vocabId": "v277",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «tujuh puluh enam»?",
                                                "options": [
                                                    "Setenta y cinco",
                                                    "Setenta y seis",
                                                    "Setenta y ocho"
                                                ],
                                                "answer": 1,
                                                "explanation": "Tujuh puluh enam significa setenta y seis."
                                            },
                                            {
                                                "vocabId": "v279",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «sembilan puluh sembilan»?",
                                                "options": [
                                                    "Noventa y ocho",
                                                    "Noventa y nueve",
                                                    "Ochenta y nueve"
                                                ],
                                                "answer": 1,
                                                "explanation": "Sembilan puluh sembilan significa noventa y nueve."
                                            }
],
                            lessons: [
                                {
                                    "title": "Lección 1: Números del 11 al 14",
                                    "objective": "Aprende a números del 11 al 14 y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Las formas del 11 al 19 se forman con el número seguido de belas: sebelas, dua belas, tiga belas y empat belas. En cantidades sencillas, el número va antes del sustantivo: sebelas teman.",
                                    "vocabIds": [
                                        "v124",
                                        "v125",
                                        "v126",
                                        "v127"
                                    ],
                                    "reviewVocabIds": [],
                                    "exercises": [
                                        {
                                            "vocabId": "v124",
                                            "type": "mc",
                                            "prompt": "¿Qué número significa sebelas?",
                                            "options": [
                                                "11",
                                                "12",
                                                "20"
                                            ],
                                            "answer": 0,
                                            "explanation": "Sebelas significa once."
                                        },
                                        {
                                            "vocabId": "v125",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce al indonesio: doce",
                                            "answer": "Dua belas",
                                            "explanation": "Dua belas significa doce."
                                        },
                                        {
                                            "vocabId": "v126",
                                            "type": "mc",
                                            "prompt": "Escucha el número y elige su valor",
                                            "audioText": "Tiga belas",
                                            "options": [
                                                "3",
                                                "13",
                                                "30"
                                            ],
                                            "answer": 1,
                                            "explanation": "Tiga belas significa trece."
                                        },
                                        {
                                            "vocabId": "v127",
                                            "type": "mc",
                                            "prompt": "¿Qué significa empat belas?",
                                            "options": [
                                                "Cuatro",
                                                "Catorce",
                                                "Cuarenta"
                                            ],
                                            "answer": 1,
                                            "explanation": "Empat belas significa catorce."
                                        },
                                        {
                                            "vocabId": "v124",
                                            "type": "order",
                                            "prompt": "Ordena para decir “once amigos”",
                                            "words": [
                                                "teman",
                                                "Sebelas"
                                            ],
                                            "correctOrder": [
                                                "Sebelas",
                                                "teman"
                                            ],
                                            "explanation": "En una cantidad simple, el número precede al sustantivo."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Números del 15 al 18",
                                    "objective": "Aprende a números del 15 al 18 y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Continúa la serie del 15 al 18 con lima belas, enam belas, tujuh belas y delapan belas. Conserva el orden número + sustantivo al contar objetos o personas.",
                                    "vocabIds": [
                                        "v128",
                                        "v129",
                                        "v130",
                                        "v131"
                                    ],
                                    "reviewVocabIds": [
                                        "v124",
                                        "v125",
                                        "v126",
                                        "v127"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v128",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: quince",
                                            "answer": "Lima belas",
                                            "explanation": "Lima belas significa quince."
                                        },
                                        {
                                            "vocabId": "v129",
                                            "type": "order",
                                            "prompt": "Ordena las palabras para formar “dieciséis libros”",
                                            "words": [
                                                "buku",
                                                "Enam",
                                                "belas"
                                            ],
                                            "correctOrder": [
                                                "Enam",
                                                "belas",
                                                "buku"
                                            ],
                                            "explanation": "El número va antes del sustantivo: Enam belas buku."
                                        },
                                        {
                                            "vocabId": "v130",
                                            "type": "mc",
                                            "prompt": "Tujuh belas equivale a…",
                                            "options": [
                                                "7",
                                                "17",
                                                "70"
                                            ],
                                            "answer": 1,
                                            "explanation": "Tujuh belas significa diecisiete."
                                        },
                                        {
                                            "vocabId": "v131",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: dieciocho",
                                            "answer": "Delapan belas",
                                            "explanation": "Delapan belas significa dieciocho."
                                        },
                                        {
                                            "vocabId": "v124",
                                            "type": "order",
                                            "prompt": "Ordena: Once amigos.",
                                            "words": [
                                                "teman",
                                                "Sebelas"
                                            ],
                                            "correctOrder": [
                                                "Sebelas",
                                                "teman"
                                            ],
                                            "explanation": "Sebelas teman. significa «Once amigos.»."
                                        },
                                        {
                                            "vocabId": "v125",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Dua belas",
                                            "answer": "Dua belas",
                                            "explanation": "Dua belas significa Doce."
                                        },
                                        {
                                            "vocabId": "v126",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Tiga belas».",
                                            "hint": "Puedes tomar como referencia: Tiga belas tahun.",
                                            "modelAnswer": "Tiga belas tahun.",
                                            "explanation": "Tiga belas tahun. significa «Trece años.»."
                                        },
                                        {
                                            "vocabId": "v127",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Empat belas»?",
                                            "options": [
                                                "Catorce",
                                                "Dieciocho",
                                                "Veinte"
                                            ],
                                            "answer": 0,
                                            "explanation": "Empat belas significa Catorce."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Del 19 al 100",
                                    "objective": "Aprende a del 19 al 100 y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Sembilan belas es 19. Para las decenas se usa puluh: dua puluh es 20 y tiga puluh es 30; seratus es 100.",
                                    "vocabIds": [
                                        "v132",
                                        "v133",
                                        "v134",
                                        "v135"
                                    ],
                                    "reviewVocabIds": [
                                        "v124",
                                        "v125",
                                        "v126",
                                        "v127",
                                        "v128",
                                        "v129",
                                        "v130",
                                        "v131"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v132",
                                            "type": "mc",
                                            "prompt": "Escucha el número y elige su valor",
                                            "audioText": "Sembilan belas",
                                            "options": [
                                                "9",
                                                "19",
                                                "90"
                                            ],
                                            "answer": 1,
                                            "explanation": "Sembilan belas significa diecinueve."
                                        },
                                        {
                                            "vocabId": "v133",
                                            "type": "mc",
                                            "prompt": "¿Qué número significa dua puluh?",
                                            "options": [
                                                "12",
                                                "20",
                                                "30"
                                            ],
                                            "answer": 1,
                                            "explanation": "Dua puluh significa veinte."
                                        },
                                        {
                                            "vocabId": "v134",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: treinta",
                                            "answer": "Tiga puluh",
                                            "explanation": "Tiga puluh significa treinta."
                                        },
                                        {
                                            "vocabId": "v135",
                                            "type": "mc",
                                            "prompt": "Seratus significa…",
                                            "options": [
                                                "100",
                                                "13",
                                                "30"
                                            ],
                                            "answer": 0,
                                            "explanation": "Seratus significa cien."
                                        },
                                        {
                                            "vocabId": "v133",
                                            "type": "mc",
                                            "prompt": "Escucha el número y elige su valor",
                                            "audioText": "Dua puluh",
                                            "options": [
                                                "12",
                                                "20",
                                                "22"
                                            ],
                                            "answer": 1,
                                            "explanation": "Dua puluh significa veinte."
                                        },
                                        {
                                            "vocabId": "v135",
                                            "type": "write",
                                            "prompt": "Escribe en indonesio un número entre 11 y 100 que hayas aprendido.",
                                            "hint": "Puedes elegir doce, veinte, cuarenta, setenta o cien.",
                                            "modelAnswer": "Dua puluh.",
                                            "explanation": "Hay varias respuestas correctas; revisa que la forma del número sea correcta."
                                        },
                                        {
                                            "vocabId": "v124",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Sebelas",
                                            "answer": "Sebelas",
                                            "explanation": "Sebelas significa Once."
                                        },
                                        {
                                            "vocabId": "v125",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Dua belas».",
                                            "hint": "Puedes tomar como referencia: Dua belas buku.",
                                            "modelAnswer": "Dua belas buku.",
                                            "explanation": "Dua belas buku. significa «Doce libros.»."
                                        },
                                        {
                                            "vocabId": "v126",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tiga belas»?",
                                            "options": [
                                                "Trece",
                                                "Dieciocho",
                                                "Veinte"
                                            ],
                                            "answer": 0,
                                            "explanation": "Tiga belas significa Trece."
                                        },
                                        {
                                            "vocabId": "v127",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Catorce",
                                            "answer": "Empat belas",
                                            "explanation": "Empat belas significa Catorce."
                                        },
                                        {
                                            "vocabId": "v128",
                                            "type": "order",
                                            "prompt": "Ordena: Quince libros.",
                                            "words": [
                                                "buku",
                                                "belas",
                                                "Lima"
                                            ],
                                            "correctOrder": [
                                                "Lima",
                                                "belas",
                                                "buku"
                                            ],
                                            "explanation": "Lima belas buku. significa «Quince libros.»."
                                        },
                                        {
                                            "vocabId": "v129",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Enam belas",
                                            "answer": "Enam belas",
                                            "explanation": "Enam belas significa Dieciséis."
                                        },
                                        {
                                            "vocabId": "v130",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Tujuh belas».",
                                            "hint": "Puedes tomar como referencia: Tujuh belas buku.",
                                            "modelAnswer": "Tujuh belas buku.",
                                            "explanation": "Tujuh belas buku. significa «Diecisiete libros.»."
                                        },
                                        {
                                            "vocabId": "v131",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Delapan belas»?",
                                            "options": [
                                                "Dieciocho",
                                                "Decenas; elemento para formar 20, 30, etc.",
                                                "Veinticinco"
                                            ],
                                            "answer": 0,
                                            "explanation": "Delapan belas significa Dieciocho."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Decenas y números compuestos",
                                    "objective": "Aprende a decenas y números compuestos y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Para formar números entre 21 y 99, combina la decena y la unidad en ese orden: dua puluh lima, tiga puluh dua y empat puluh tujuh.",
                                    "vocabIds": [
                                        "v158",
                                        "v271",
                                        "v272",
                                        "v273",
                                        "v274"
                                    ],
                                    "reviewVocabIds": [
                                        "v124",
                                        "v125",
                                        "v126",
                                        "v127",
                                        "v128",
                                        "v129",
                                        "v130",
                                        "v131",
                                        "v132",
                                        "v133",
                                        "v134",
                                        "v135"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v158",
                                            "type": "mc",
                                            "prompt": "¿Cómo se dice cuarenta?",
                                            "options": [
                                                "Empat puluh",
                                                "Empat belas",
                                                "Empat tahun"
                                            ],
                                            "answer": 0,
                                            "explanation": "Empat puluh significa cuarenta; puluh forma decenas."
                                        },
                                        {
                                            "vocabId": "v158",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: setenta",
                                            "answer": "Tujuh puluh",
                                            "explanation": "Tujuh puluh significa setenta."
                                        },
                                        {
                                            "vocabId": "v158",
                                            "type": "mc",
                                            "prompt": "Sembilan puluh significa…",
                                            "options": [
                                                "19",
                                                "90",
                                                "100"
                                            ],
                                            "answer": 1,
                                            "explanation": "Sembilan puluh significa noventa."
                                        },
                                        {
                                            "vocabId": "v271",
                                            "type": "mc",
                                            "prompt": "Dua puluh satu equivale a…",
                                            "options": [
                                                "21",
                                                "12",
                                                "31"
                                            ],
                                            "answer": 0,
                                            "explanation": "Dua puluh satu significa veintiuno: dos decenas y uno."
                                        },
                                        {
                                            "vocabId": "v272",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce al indonesio: veinticinco",
                                            "answer": "Dua puluh lima",
                                            "explanation": "Para formar veinticinco se dice dua puluh lima."
                                        },
                                        {
                                            "vocabId": "v274",
                                            "type": "order",
                                            "prompt": "Ordena para decir “cuarenta y siete”",
                                            "words": [
                                                "tujuh",
                                                "Empat",
                                                "puluh"
                                            ],
                                            "correctOrder": [
                                                "Empat",
                                                "puluh",
                                                "tujuh"
                                            ],
                                            "explanation": "En los números compuestos, la unidad va después de la decena: empat puluh tujuh."
                                        },
                                        {
                                            "vocabId": "v273",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «tiga puluh dua»?",
                                            "options": [
                                                "Treinta y dos",
                                                "Treinta y ocho",
                                                "Treinta y cuatro"
                                            ],
                                            "answer": 0,
                                            "explanation": "Tiga puluh dua significa treinta y dos."
                                        },
                                        {
                                            "vocabId": "v124",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Sebelas».",
                                            "hint": "Puedes tomar como referencia: Sebelas teman.",
                                            "modelAnswer": "Sebelas teman.",
                                            "explanation": "Sebelas teman. significa «Once amigos.»."
                                        },
                                        {
                                            "vocabId": "v125",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Dua belas»?",
                                            "options": [
                                                "Doce",
                                                "Dieciocho",
                                                "Veinte"
                                            ],
                                            "answer": 0,
                                            "explanation": "Dua belas significa Doce."
                                        },
                                        {
                                            "vocabId": "v126",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Trece",
                                            "answer": "Tiga belas",
                                            "explanation": "Tiga belas significa Trece."
                                        },
                                        {
                                            "vocabId": "v127",
                                            "type": "order",
                                            "prompt": "Ordena: Catorce amigos.",
                                            "words": [
                                                "teman",
                                                "belas",
                                                "Empat"
                                            ],
                                            "correctOrder": [
                                                "Empat",
                                                "belas",
                                                "teman"
                                            ],
                                            "explanation": "Empat belas teman. significa «Catorce amigos.»."
                                        },
                                        {
                                            "vocabId": "v128",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Lima belas",
                                            "answer": "Lima belas",
                                            "explanation": "Lima belas significa Quince."
                                        },
                                        {
                                            "vocabId": "v129",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Enam belas».",
                                            "hint": "Puedes tomar como referencia: Enam belas tahun.",
                                            "modelAnswer": "Enam belas tahun.",
                                            "explanation": "Enam belas tahun. significa «Dieciséis años.»."
                                        },
                                        {
                                            "vocabId": "v130",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tujuh belas»?",
                                            "options": [
                                                "Diecisiete",
                                                "Decenas; elemento para formar 20, 30, etc.",
                                                "Veinticinco"
                                            ],
                                            "answer": 0,
                                            "explanation": "Tujuh belas significa Diecisiete."
                                        },
                                        {
                                            "vocabId": "v131",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Dieciocho",
                                            "answer": "Delapan belas",
                                            "explanation": "Delapan belas significa Dieciocho."
                                        },
                                        {
                                            "vocabId": "v132",
                                            "type": "order",
                                            "prompt": "Ordena: Diecinueve años.",
                                            "words": [
                                                "tahun",
                                                "belas",
                                                "Sembilan"
                                            ],
                                            "correctOrder": [
                                                "Sembilan",
                                                "belas",
                                                "tahun"
                                            ],
                                            "explanation": "Sembilan belas tahun. significa «Diecinueve años.»."
                                        },
                                        {
                                            "vocabId": "v133",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Dua puluh",
                                            "answer": "Dua puluh",
                                            "explanation": "Dua puluh significa Veinte."
                                        },
                                        {
                                            "vocabId": "v134",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Tiga puluh».",
                                            "hint": "Puedes tomar como referencia: Tiga puluh tahun.",
                                            "modelAnswer": "Tiga puluh tahun.",
                                            "explanation": "Tiga puluh tahun. significa «Treinta años.»."
                                        },
                                        {
                                            "vocabId": "v135",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Seratus»?",
                                            "options": [
                                                "Cien",
                                                "Cincuenta y ocho",
                                                "Setenta y seis"
                                            ],
                                            "answer": 0,
                                            "explanation": "Seratus significa Cien."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 5: Leer cantidades en contexto",
                                    "objective": "Aprende a leer cantidades en contexto y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Lee números compuestos completos y colócalos antes del sustantivo: lima puluh delapan buku y sembilan puluh sembilan buku.",
                                    "vocabIds": [
                                        "v275",
                                        "v276",
                                        "v277",
                                        "v278",
                                        "v279"
                                    ],
                                    "reviewVocabIds": [
                                        "v124",
                                        "v125",
                                        "v126",
                                        "v127",
                                        "v128",
                                        "v129",
                                        "v130",
                                        "v131",
                                        "v132",
                                        "v133",
                                        "v134",
                                        "v135",
                                        "v158",
                                        "v271",
                                        "v272",
                                        "v273",
                                        "v274"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v278",
                                            "type": "mc",
                                            "prompt": "Delapan puluh sembilan equivale a…",
                                            "options": [
                                                "19",
                                                "80",
                                                "89"
                                            ],
                                            "answer": 2,
                                            "explanation": "Delapan puluh sembilan significa ochenta y nueve."
                                        },
                                        {
                                            "vocabId": "v275",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «lima puluh delapan»?",
                                            "options": [
                                                "Cincuenta y seis",
                                                "Cincuenta y ocho",
                                                "Cincuenta y nueve"
                                            ],
                                            "answer": 1,
                                            "explanation": "Lima puluh delapan significa cincuenta y ocho."
                                        },
                                        {
                                            "vocabId": "v276",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «enam puluh empat»?",
                                            "options": [
                                                "Sesenta y cuatro",
                                                "Sesenta y seis",
                                                "Cuarenta y seis"
                                            ],
                                            "answer": 0,
                                            "explanation": "Enam puluh empat significa sesenta y cuatro."
                                        },
                                        {
                                            "vocabId": "v277",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «tujuh puluh enam»?",
                                            "options": [
                                                "Setenta y cinco",
                                                "Setenta y seis",
                                                "Setenta y ocho"
                                            ],
                                            "answer": 1,
                                            "explanation": "Tujuh puluh enam significa setenta y seis."
                                        },
                                        {
                                            "vocabId": "v279",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «sembilan puluh sembilan»?",
                                            "options": [
                                                "Noventa y ocho",
                                                "Noventa y nueve",
                                                "Ochenta y nueve"
                                            ],
                                            "answer": 1,
                                            "explanation": "Sembilan puluh sembilan significa noventa y nueve."
                                        },
                                        {
                                            "vocabId": "v124",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Sebelas»?",
                                            "options": [
                                                "Once",
                                                "Dieciocho",
                                                "Veinte"
                                            ],
                                            "answer": 0,
                                            "explanation": "Sebelas significa Once."
                                        },
                                        {
                                            "vocabId": "v125",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Doce",
                                            "answer": "Dua belas",
                                            "explanation": "Dua belas significa Doce."
                                        },
                                        {
                                            "vocabId": "v126",
                                            "type": "order",
                                            "prompt": "Ordena: Trece años.",
                                            "words": [
                                                "tahun",
                                                "belas",
                                                "Tiga"
                                            ],
                                            "correctOrder": [
                                                "Tiga",
                                                "belas",
                                                "tahun"
                                            ],
                                            "explanation": "Tiga belas tahun. significa «Trece años.»."
                                        },
                                        {
                                            "vocabId": "v127",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Empat belas",
                                            "answer": "Empat belas",
                                            "explanation": "Empat belas significa Catorce."
                                        },
                                        {
                                            "vocabId": "v128",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Lima belas».",
                                            "hint": "Puedes tomar como referencia: Lima belas buku.",
                                            "modelAnswer": "Lima belas buku.",
                                            "explanation": "Lima belas buku. significa «Quince libros.»."
                                        },
                                        {
                                            "vocabId": "v129",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Enam belas»?",
                                            "options": [
                                                "Dieciséis",
                                                "Decenas; elemento para formar 20, 30, etc.",
                                                "Veinticinco"
                                            ],
                                            "answer": 0,
                                            "explanation": "Enam belas significa Dieciséis."
                                        },
                                        {
                                            "vocabId": "v130",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Diecisiete",
                                            "answer": "Tujuh belas",
                                            "explanation": "Tujuh belas significa Diecisiete."
                                        },
                                        {
                                            "vocabId": "v131",
                                            "type": "order",
                                            "prompt": "Ordena: Dieciocho amigos.",
                                            "words": [
                                                "teman",
                                                "belas",
                                                "Delapan"
                                            ],
                                            "correctOrder": [
                                                "Delapan",
                                                "belas",
                                                "teman"
                                            ],
                                            "explanation": "Delapan belas teman. significa «Dieciocho amigos.»."
                                        },
                                        {
                                            "vocabId": "v132",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Sembilan belas",
                                            "answer": "Sembilan belas",
                                            "explanation": "Sembilan belas significa Diecinueve."
                                        },
                                        {
                                            "vocabId": "v133",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Dua puluh».",
                                            "hint": "Puedes tomar como referencia: Dua puluh buku.",
                                            "modelAnswer": "Dua puluh buku.",
                                            "explanation": "Dua puluh buku. significa «Veinte libros.»."
                                        },
                                        {
                                            "vocabId": "v134",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tiga puluh»?",
                                            "options": [
                                                "Treinta",
                                                "Cincuenta y ocho",
                                                "Setenta y seis"
                                            ],
                                            "answer": 0,
                                            "explanation": "Tiga puluh significa Treinta."
                                        },
                                        {
                                            "vocabId": "v135",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Cien",
                                            "answer": "Seratus",
                                            "explanation": "Seratus significa Cien."
                                        },
                                        {
                                            "vocabId": "v158",
                                            "type": "order",
                                            "prompt": "Ordena: Veinte.",
                                            "words": [
                                                "puluh",
                                                "Dua"
                                            ],
                                            "correctOrder": [
                                                "Dua",
                                                "puluh"
                                            ],
                                            "explanation": "Dua puluh. significa «Veinte.»."
                                        },
                                        {
                                            "vocabId": "v271",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Dua puluh satu",
                                            "answer": "Dua puluh satu",
                                            "explanation": "Dua puluh satu significa Veintiuno."
                                        },
                                        {
                                            "vocabId": "v272",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Dua puluh lima».",
                                            "hint": "Puedes tomar como referencia: Dua puluh lima teman.",
                                            "modelAnswer": "Dua puluh lima teman.",
                                            "explanation": "Dua puluh lima teman. significa «Veinticinco amigos.»."
                                        },
                                        {
                                            "vocabId": "v273",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tiga puluh dua»?",
                                            "options": [
                                                "Treinta y dos",
                                                "Once",
                                                "Trece"
                                            ],
                                            "answer": 0,
                                            "explanation": "Tiga puluh dua significa Treinta y dos."
                                        },
                                        {
                                            "vocabId": "v274",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Cuarenta y siete",
                                            "answer": "Empat puluh tujuh",
                                            "explanation": "Empat puluh tujuh significa Cuarenta y siete."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 6: Recuperación espaciada",
                                    "objective": "Recupera el vocabulario completo de la unidad y aplícalo sin consultar la lista.",
                                    "grammar": "Practica el vocabulario en cinco formatos: reconocimiento, traducción, ordenación, escucha y escritura. Recupera las formas dentro de los ejemplos de la unidad.",
                                    "vocabIds": [],
                                    "reviewVocabIds": [
                                        "v124",
                                        "v125",
                                        "v126",
                                        "v127",
                                        "v128",
                                        "v129",
                                        "v130",
                                        "v131",
                                        "v132",
                                        "v133",
                                        "v134",
                                        "v135",
                                        "v158",
                                        "v271",
                                        "v272",
                                        "v273",
                                        "v274",
                                        "v275",
                                        "v276",
                                        "v277",
                                        "v278",
                                        "v279"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v124",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Sebelas»?",
                                            "options": [
                                                "Once",
                                                "Trece",
                                                "Quince"
                                            ],
                                            "answer": 0,
                                            "explanation": "Sebelas significa Once."
                                        },
                                        {
                                            "vocabId": "v125",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Doce",
                                            "answer": "Dua belas",
                                            "explanation": "Dua belas significa Doce."
                                        },
                                        {
                                            "vocabId": "v126",
                                            "type": "order",
                                            "prompt": "Ordena: Trece años.",
                                            "words": [
                                                "tahun",
                                                "belas",
                                                "Tiga"
                                            ],
                                            "correctOrder": [
                                                "Tiga",
                                                "belas",
                                                "tahun"
                                            ],
                                            "explanation": "Tiga belas tahun. significa «Trece años.»."
                                        },
                                        {
                                            "vocabId": "v127",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Empat belas",
                                            "answer": "Empat belas",
                                            "explanation": "Empat belas significa Catorce."
                                        },
                                        {
                                            "vocabId": "v128",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Lima belas».",
                                            "hint": "Puedes tomar como referencia: Lima belas buku.",
                                            "modelAnswer": "Lima belas buku.",
                                            "explanation": "Lima belas buku. significa «Quince libros.»."
                                        },
                                        {
                                            "vocabId": "v129",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Enam belas»?",
                                            "options": [
                                                "Dieciséis",
                                                "Dieciocho",
                                                "Veinte"
                                            ],
                                            "answer": 0,
                                            "explanation": "Enam belas significa Dieciséis."
                                        },
                                        {
                                            "vocabId": "v130",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Diecisiete",
                                            "answer": "Tujuh belas",
                                            "explanation": "Tujuh belas significa Diecisiete."
                                        },
                                        {
                                            "vocabId": "v131",
                                            "type": "order",
                                            "prompt": "Ordena: Dieciocho amigos.",
                                            "words": [
                                                "teman",
                                                "belas",
                                                "Delapan"
                                            ],
                                            "correctOrder": [
                                                "Delapan",
                                                "belas",
                                                "teman"
                                            ],
                                            "explanation": "Delapan belas teman. significa «Dieciocho amigos.»."
                                        },
                                        {
                                            "vocabId": "v132",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Sembilan belas",
                                            "answer": "Sembilan belas",
                                            "explanation": "Sembilan belas significa Diecinueve."
                                        },
                                        {
                                            "vocabId": "v133",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Dua puluh».",
                                            "hint": "Puedes tomar como referencia: Dua puluh buku.",
                                            "modelAnswer": "Dua puluh buku.",
                                            "explanation": "Dua puluh buku. significa «Veinte libros.»."
                                        },
                                        {
                                            "vocabId": "v134",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tiga puluh»?",
                                            "options": [
                                                "Treinta",
                                                "Decenas; elemento para formar 20, 30, etc.",
                                                "Veinticinco"
                                            ],
                                            "answer": 0,
                                            "explanation": "Tiga puluh significa Treinta."
                                        },
                                        {
                                            "vocabId": "v135",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Cien",
                                            "answer": "Seratus",
                                            "explanation": "Seratus significa Cien."
                                        },
                                        {
                                            "vocabId": "v158",
                                            "type": "order",
                                            "prompt": "Ordena: Veinte.",
                                            "words": [
                                                "puluh",
                                                "Dua"
                                            ],
                                            "correctOrder": [
                                                "Dua",
                                                "puluh"
                                            ],
                                            "explanation": "Dua puluh. significa «Veinte.»."
                                        },
                                        {
                                            "vocabId": "v271",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Dua puluh satu",
                                            "answer": "Dua puluh satu",
                                            "explanation": "Dua puluh satu significa Veintiuno."
                                        },
                                        {
                                            "vocabId": "v272",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Dua puluh lima».",
                                            "hint": "Puedes tomar como referencia: Dua puluh lima teman.",
                                            "modelAnswer": "Dua puluh lima teman.",
                                            "explanation": "Dua puluh lima teman. significa «Veinticinco amigos.»."
                                        },
                                        {
                                            "vocabId": "v273",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tiga puluh dua»?",
                                            "options": [
                                                "Treinta y dos",
                                                "Cincuenta y ocho",
                                                "Setenta y seis"
                                            ],
                                            "answer": 0,
                                            "explanation": "Tiga puluh dua significa Treinta y dos."
                                        },
                                        {
                                            "vocabId": "v274",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Cuarenta y siete",
                                            "answer": "Empat puluh tujuh",
                                            "explanation": "Empat puluh tujuh significa Cuarenta y siete."
                                        },
                                        {
                                            "vocabId": "v275",
                                            "type": "order",
                                            "prompt": "Ordena: Cincuenta y ocho libros.",
                                            "words": [
                                                "buku",
                                                "delapan",
                                                "puluh",
                                                "Lima"
                                            ],
                                            "correctOrder": [
                                                "Lima",
                                                "puluh",
                                                "delapan",
                                                "buku"
                                            ],
                                            "explanation": "Lima puluh delapan buku. significa «Cincuenta y ocho libros.»."
                                        },
                                        {
                                            "vocabId": "v276",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Enam puluh empat",
                                            "answer": "Enam puluh empat",
                                            "explanation": "Enam puluh empat significa Sesenta y cuatro."
                                        },
                                        {
                                            "vocabId": "v277",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Tujuh puluh enam».",
                                            "hint": "Puedes tomar como referencia: Tujuh puluh enam buku.",
                                            "modelAnswer": "Tujuh puluh enam buku.",
                                            "explanation": "Tujuh puluh enam buku. significa «Setenta y seis libros.»."
                                        },
                                        {
                                            "vocabId": "v278",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Delapan puluh sembilan»?",
                                            "options": [
                                                "Ochenta y nueve",
                                                "Once",
                                                "Trece"
                                            ],
                                            "answer": 0,
                                            "explanation": "Delapan puluh sembilan significa Ochenta y nueve."
                                        },
                                        {
                                            "vocabId": "v279",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Noventa y nueve",
                                            "answer": "Sembilan puluh sembilan",
                                            "explanation": "Sembilan puluh sembilan significa Noventa y nueve."
                                        }
                                    ]
                                }
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
                            ],
                            lessons: [
                                {
                                    "title": "Lección 1: Dinero y moneda",
                                    "objective": "Aprende a dinero y moneda y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Uang significa dinero, harga significa precio y rupiah es la moneda de Indonesia. Usa estas palabras al identificar el dinero y el precio de un producto.",
                                    "vocabIds": [
                                        "v136",
                                        "v137",
                                        "v138"
                                    ],
                                    "reviewVocabIds": [],
                                    "exercises": [
                                        {
                                            "vocabId": "v136",
                                            "type": "mc",
                                            "prompt": "¿Qué significa uang?",
                                            "options": [
                                                "Dinero",
                                                "Precio",
                                                "Cambio"
                                            ],
                                            "answer": 0,
                                            "explanation": "Uang significa dinero."
                                        },
                                        {
                                            "vocabId": "v137",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: precio",
                                            "answer": "Harga",
                                            "explanation": "Harga significa precio."
                                        },
                                        {
                                            "vocabId": "v138",
                                            "type": "mc",
                                            "prompt": "Escucha la palabra y elige su significado",
                                            "audioText": "Rupiah",
                                            "options": [
                                                "La moneda de Indonesia",
                                                "El precio",
                                                "El dinero en efectivo"
                                            ],
                                            "answer": 0,
                                            "explanation": "Rupiah es la moneda de Indonesia."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Miles y comparación de precios",
                                    "objective": "Aprende a miles y comparación de precios y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Ribu indica miles y se combina después del número: lima ribu rupiah. Murah y mahal permiten describir un precio como barato o caro.",
                                    "vocabIds": [
                                        "v139",
                                        "v140",
                                        "v141"
                                    ],
                                    "reviewVocabIds": [
                                        "v136",
                                        "v137",
                                        "v138"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v139",
                                            "type": "mc",
                                            "prompt": "Lima ribu rupiah significa…",
                                            "options": [
                                                "Cinco rupias",
                                                "Cinco mil rupias",
                                                "Cincuenta rupias"
                                            ],
                                            "answer": 1,
                                            "explanation": "Ribu significa mil."
                                        },
                                        {
                                            "vocabId": "v140",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: barato/a",
                                            "answer": "Murah",
                                            "explanation": "Murah significa barato o barata."
                                        },
                                        {
                                            "vocabId": "v141",
                                            "type": "mc",
                                            "prompt": "¿Qué palabra significa caro/a?",
                                            "options": [
                                                "Murah",
                                                "Mahal",
                                                "Tunai"
                                            ],
                                            "answer": 1,
                                            "explanation": "Mahal significa caro o cara."
                                        },
                                        {
                                            "vocabId": "v140",
                                            "type": "order",
                                            "prompt": "Ordena: Es barato",
                                            "words": [
                                                "murah",
                                                "Harganya"
                                            ],
                                            "correctOrder": [
                                                "Harganya",
                                                "murah"
                                            ],
                                            "explanation": "Harganya murah significa es barato."
                                        },
                                        {
                                            "vocabId": "v136",
                                            "type": "order",
                                            "prompt": "Ordena: Esto es dinero.",
                                            "words": [
                                                "uang",
                                                "Ini"
                                            ],
                                            "correctOrder": [
                                                "Ini",
                                                "uang"
                                            ],
                                            "explanation": "Ini uang. significa «Esto es dinero.»."
                                        },
                                        {
                                            "vocabId": "v137",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Harga",
                                            "answer": "Harga",
                                            "explanation": "Harga significa Precio."
                                        },
                                        {
                                            "vocabId": "v138",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Rupiah».",
                                            "hint": "Puedes tomar como referencia: Lima ribu rupiah.",
                                            "modelAnswer": "Lima ribu rupiah.",
                                            "explanation": "Lima ribu rupiah. significa «Cinco mil rupias.»."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Comprar y pagar",
                                    "objective": "Aprende a comprar y pagar y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Beli expresa comprar y bayar expresa pagar. Kembalian es el dinero que devuelve el vendedor; interpreta estas palabras dentro de un intercambio breve.",
                                    "vocabIds": [
                                        "v142",
                                        "v143",
                                        "v144"
                                    ],
                                    "reviewVocabIds": [
                                        "v136",
                                        "v137",
                                        "v138",
                                        "v139",
                                        "v140",
                                        "v141"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v142",
                                            "type": "order",
                                            "prompt": "Ordena: Compro té",
                                            "words": [
                                                "teh",
                                                "beli",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "beli",
                                                "teh"
                                            ],
                                            "explanation": "Saya beli teh significa compro té."
                                        },
                                        {
                                            "vocabId": "v143",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: pagar",
                                            "answer": "Bayar",
                                            "explanation": "Bayar significa pagar."
                                        },
                                        {
                                            "vocabId": "v144",
                                            "type": "mc",
                                            "prompt": "Kembalian es…",
                                            "options": [
                                                "El precio",
                                                "El cambio que devuelven",
                                                "Dinero en efectivo"
                                            ],
                                            "answer": 1,
                                            "explanation": "Kembalian es el cambio que devuelve el vendedor."
                                        },
                                        {
                                            "vocabId": "v142",
                                            "type": "write",
                                            "prompt": "Escribe una frase breve sobre comprar algo.",
                                            "hint": "Puedes usar Saya beli teh.",
                                            "modelAnswer": "Saya beli teh.",
                                            "explanation": "Usa beli para decir comprar; también son válidas otras frases correctas."
                                        },
                                        {
                                            "vocabId": "v144",
                                            "type": "write",
                                            "prompt": "Completa un diálogo de compra con precio, pago de diez mil rupias y devolución del cambio.",
                                            "hint": "Incluye lima ribu rupiah, Saya bayar sepuluh ribu rupiah e Ini kembaliannya.",
                                            "modelAnswer": "Vendedor: Harganya lima ribu rupiah. Cliente: Saya bayar sepuluh ribu rupiah. Vendedor: Ini kembaliannya, lima ribu rupiah. Cliente: Terima kasih.",
                                            "explanation": "El precio es cinco mil y el pago diez mil, por lo que corresponde devolver el cambio."
                                        },
                                        {
                                            "vocabId": "v136",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Uang",
                                            "answer": "Uang",
                                            "explanation": "Uang significa Dinero."
                                        },
                                        {
                                            "vocabId": "v137",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Harga».",
                                            "hint": "Puedes tomar como referencia: Harga buku.",
                                            "modelAnswer": "Harga buku.",
                                            "explanation": "Harga buku. significa «El precio del libro.»."
                                        },
                                        {
                                            "vocabId": "v138",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Rupiah»?",
                                            "options": [
                                                "Rupia indonesia",
                                                "Pagar",
                                                "En efectivo"
                                            ],
                                            "answer": 0,
                                            "explanation": "Rupiah significa Rupia indonesia."
                                        },
                                        {
                                            "vocabId": "v139",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Mil (en cantidades)",
                                            "answer": "Ribu",
                                            "explanation": "Ribu significa Mil (en cantidades)."
                                        },
                                        {
                                            "vocabId": "v140",
                                            "type": "order",
                                            "prompt": "Ordena: Este precio es barato.",
                                            "words": [
                                                "murah",
                                                "ini",
                                                "Harga"
                                            ],
                                            "correctOrder": [
                                                "Harga",
                                                "ini",
                                                "murah"
                                            ],
                                            "explanation": "Harga ini murah. significa «Este precio es barato.»."
                                        },
                                        {
                                            "vocabId": "v141",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Mahal",
                                            "answer": "Mahal",
                                            "explanation": "Mahal significa Caro/a."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Preguntar y responder precios",
                                    "objective": "Aprende a preguntar y responder precios y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Berapa harganya? sirve para preguntar cuánto cuesta. Tunai indica pago en efectivo; combina pregunta, precio y forma de pago en un diálogo.",
                                    "vocabIds": [
                                        "v145",
                                        "v18",
                                        "v115",
                                        "v113"
                                    ],
                                    "reviewVocabIds": [
                                        "v136",
                                        "v137",
                                        "v138",
                                        "v139",
                                        "v140",
                                        "v141",
                                        "v142",
                                        "v143",
                                        "v144"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v145",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: en efectivo",
                                            "answer": "Tunai",
                                            "explanation": "Tunai significa en efectivo."
                                        },
                                        {
                                            "vocabId": "v18",
                                            "type": "mc",
                                            "prompt": "¿Qué significa berapa?",
                                            "options": [
                                                "Cuánto",
                                                "Caro",
                                                "Dinero"
                                            ],
                                            "answer": 0,
                                            "explanation": "Berapa se usa para preguntar cantidades o precios."
                                        },
                                        {
                                            "vocabId": "v115",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la pregunta por el precio",
                                            "answer": "Berapa harganya?",
                                            "explanation": "Berapa harganya? significa ¿Cuánto cuesta?"
                                        },
                                        {
                                            "vocabId": "v113",
                                            "type": "write",
                                            "prompt": "Escribe una pregunta para saber el precio de algo.",
                                            "hint": "Usa la expresión Berapa harganya?",
                                            "modelAnswer": "Berapa harganya?",
                                            "explanation": "Esta pregunta sirve para preguntar cuánto cuesta algo."
                                        },
                                        {
                                            "vocabId": "v115",
                                            "type": "write",
                                            "prompt": "Escribe un diálogo completo: pide té, pregunta el precio, recibe la respuesta y paga en efectivo.",
                                            "hint": "Usa Berapa harganya?, un precio con ribu/rupiah, Saya bayar tunai y Terima kasih.",
                                            "modelAnswer": "Cliente: Saya mau teh, tolong. Cliente: Berapa harganya? Vendedor: Dua puluh satu ribu rupiah. Cliente: Saya bayar tunai. Vendedor: Terima kasih.",
                                            "explanation": "El diálogo combina el pedido, la pregunta por el precio, una respuesta con número compuesto y el pago."
                                        },
                                        {
                                            "vocabId": "v113",
                                            "type": "write",
                                            "prompt": "Escribe otro diálogo breve para comprar té. Incluye una pregunta por el precio y una respuesta de treinta y dos mil rupias.",
                                            "hint": "Puedes usar Saya mau teh, tolong; Berapa harganya?; Tiga puluh dua ribu rupiah; Saya beli teh.",
                                            "modelAnswer": "Cliente: Saya mau teh, tolong. Cliente: Berapa harganya? Vendedor: Tiga puluh dua ribu rupiah. Cliente: Saya beli teh. Vendedor: Terima kasih.",
                                            "explanation": "Practica un segundo precio y las expresiones de compra ya presentadas."
                                        },
                                        {
                                            "vocabId": "v136",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Uang».",
                                            "hint": "Puedes tomar como referencia: Ini uang.",
                                            "modelAnswer": "Ini uang.",
                                            "explanation": "Ini uang. significa «Esto es dinero.»."
                                        },
                                        {
                                            "vocabId": "v137",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Harga»?",
                                            "options": [
                                                "Precio",
                                                "Pagar",
                                                "En efectivo"
                                            ],
                                            "answer": 0,
                                            "explanation": "Harga significa Precio."
                                        },
                                        {
                                            "vocabId": "v138",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Rupia indonesia",
                                            "answer": "Rupiah",
                                            "explanation": "Rupiah significa Rupia indonesia."
                                        },
                                        {
                                            "vocabId": "v139",
                                            "type": "order",
                                            "prompt": "Ordena: Cinco mil rupias.",
                                            "words": [
                                                "rupiah",
                                                "ribu",
                                                "Lima"
                                            ],
                                            "correctOrder": [
                                                "Lima",
                                                "ribu",
                                                "rupiah"
                                            ],
                                            "explanation": "Lima ribu rupiah. significa «Cinco mil rupias.»."
                                        },
                                        {
                                            "vocabId": "v140",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Murah",
                                            "answer": "Murah",
                                            "explanation": "Murah significa Barato/a."
                                        },
                                        {
                                            "vocabId": "v141",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Mahal».",
                                            "hint": "Puedes tomar como referencia: Harganya mahal.",
                                            "modelAnswer": "Harganya mahal.",
                                            "explanation": "Harganya mahal. significa «Es caro.»."
                                        },
                                        {
                                            "vocabId": "v142",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Beli»?",
                                            "options": [
                                                "Comprar",
                                                "Té",
                                                "Precio"
                                            ],
                                            "answer": 0,
                                            "explanation": "Beli significa Comprar."
                                        },
                                        {
                                            "vocabId": "v143",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Pagar",
                                            "answer": "Bayar",
                                            "explanation": "Bayar significa Pagar."
                                        },
                                        {
                                            "vocabId": "v144",
                                            "type": "order",
                                            "prompt": "Ordena: Aquí tiene su cambio.",
                                            "words": [
                                                "kembaliannya",
                                                "Ini"
                                            ],
                                            "correctOrder": [
                                                "Ini",
                                                "kembaliannya"
                                            ],
                                            "explanation": "Ini kembaliannya. significa «Aquí tiene su cambio.»."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 5: Recuperación espaciada",
                                    "objective": "Recupera el vocabulario completo de la unidad y aplícalo sin consultar la lista.",
                                    "grammar": "Practica el vocabulario en cinco formatos: reconocimiento, traducción, ordenación, escucha y escritura. Recupera las formas dentro de los ejemplos de la unidad.",
                                    "vocabIds": [],
                                    "reviewVocabIds": [
                                        "v136",
                                        "v137",
                                        "v138",
                                        "v139",
                                        "v140",
                                        "v141",
                                        "v142",
                                        "v143",
                                        "v144",
                                        "v145",
                                        "v18",
                                        "v115",
                                        "v113"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v136",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Uang»?",
                                            "options": [
                                                "Dinero",
                                                "Rupia indonesia",
                                                "Barato/a"
                                            ],
                                            "answer": 0,
                                            "explanation": "Uang significa Dinero."
                                        },
                                        {
                                            "vocabId": "v137",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Precio",
                                            "answer": "Harga",
                                            "explanation": "Harga significa Precio."
                                        },
                                        {
                                            "vocabId": "v138",
                                            "type": "order",
                                            "prompt": "Ordena: Cinco mil rupias.",
                                            "words": [
                                                "rupiah",
                                                "ribu",
                                                "Lima"
                                            ],
                                            "correctOrder": [
                                                "Lima",
                                                "ribu",
                                                "rupiah"
                                            ],
                                            "explanation": "Lima ribu rupiah. significa «Cinco mil rupias.»."
                                        },
                                        {
                                            "vocabId": "v139",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Ribu",
                                            "answer": "Ribu",
                                            "explanation": "Ribu significa Mil (en cantidades)."
                                        },
                                        {
                                            "vocabId": "v140",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Murah».",
                                            "hint": "Puedes tomar como referencia: Harga ini murah.",
                                            "modelAnswer": "Harga ini murah.",
                                            "explanation": "Harga ini murah. significa «Este precio es barato.»."
                                        },
                                        {
                                            "vocabId": "v141",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Mahal»?",
                                            "options": [
                                                "Caro/a",
                                                "Pagar",
                                                "En efectivo"
                                            ],
                                            "answer": 0,
                                            "explanation": "Mahal significa Caro/a."
                                        },
                                        {
                                            "vocabId": "v142",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Comprar",
                                            "answer": "Beli",
                                            "explanation": "Beli significa Comprar."
                                        },
                                        {
                                            "vocabId": "v143",
                                            "type": "order",
                                            "prompt": "Ordena: Pago.",
                                            "words": [
                                                "bayar",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "bayar"
                                            ],
                                            "explanation": "Saya bayar. significa «Pago.»."
                                        },
                                        {
                                            "vocabId": "v144",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Kembalian",
                                            "answer": "Kembalian",
                                            "explanation": "Kembalian significa Cambio (dinero que devuelven)."
                                        },
                                        {
                                            "vocabId": "v145",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Tunai».",
                                            "hint": "Puedes tomar como referencia: Saya bayar tunai.",
                                            "modelAnswer": "Saya bayar tunai.",
                                            "explanation": "Saya bayar tunai. significa «Pago en efectivo.»."
                                        },
                                        {
                                            "vocabId": "v18",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Berapa»?",
                                            "options": [
                                                "Cuánto / cuántos",
                                                "Té",
                                                "Precio"
                                            ],
                                            "answer": 0,
                                            "explanation": "Berapa significa Cuánto / cuántos."
                                        },
                                        {
                                            "vocabId": "v115",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: ¿Cuánto cuesta?",
                                            "answer": "Berapa harganya?",
                                            "explanation": "Berapa harganya? significa ¿Cuánto cuesta?."
                                        },
                                        {
                                            "vocabId": "v113",
                                            "type": "order",
                                            "prompt": "Ordena: Compro té.",
                                            "words": [
                                                "teh",
                                                "beli",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "beli",
                                                "teh"
                                            ],
                                            "explanation": "Saya beli teh. significa «Compro té.»."
                                        }
                                    ]
                                }
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
                            ,
                                            {
                                                "vocabId": "v35",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «hari»?",
                                                "options": [
                                                    "Día",
                                                    "Mes",
                                                    "Mañana"
                                                ],
                                                "answer": 0,
                                                "explanation": "Hari significa día."
                                            },
                                            {
                                                "vocabId": "v36",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «hari ini»?",
                                                "options": [
                                                    "Ayer",
                                                    "Hoy / este día",
                                                    "Mañana"
                                                ],
                                                "answer": 1,
                                                "explanation": "Hari ini significa hoy o este día."
                                            },
                                            {
                                                "vocabId": "v122",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «besok»?",
                                                "options": [
                                                    "Ayer",
                                                    "Mañana",
                                                    "Hoy"
                                                ],
                                                "answer": 1,
                                                "explanation": "Besok significa mañana."
                                            }
],
                            lessons: [
                                {
                                    "title": "Lección 1: Partes del día",
                                    "objective": "Aprende a partes del día y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Pagi es la mañana, siang el mediodía o primeras horas de la tarde, sore el final de la tarde y malam la noche. Para situar una actividad puedes usar pada + momento + hari.",
                                    "vocabIds": [
                                        "v146",
                                        "v147",
                                        "v148",
                                        "v149"
                                    ],
                                    "reviewVocabIds": [],
                                    "exercises": [
                                        {
                                            "vocabId": "v146",
                                            "type": "mc",
                                            "prompt": "¿Qué parte del día significa pagi?",
                                            "options": [
                                                "Mañana",
                                                "Noche",
                                                "Mediodía"
                                            ],
                                            "answer": 0,
                                            "explanation": "Pagi es la mañana."
                                        },
                                        {
                                            "vocabId": "v147",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: mediodía / primeras horas de la tarde",
                                            "answer": "Siang",
                                            "explanation": "Siang suele referirse al mediodía y primeras horas de la tarde."
                                        },
                                        {
                                            "vocabId": "v148",
                                            "type": "mc",
                                            "prompt": "¿Qué palabra significa tarde, al final de la tarde?",
                                            "options": [
                                                "Sore",
                                                "Pagi",
                                                "Malam"
                                            ],
                                            "answer": 0,
                                            "explanation": "Sore es el final de la tarde."
                                        },
                                        {
                                            "vocabId": "v149",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: noche",
                                            "answer": "Malam",
                                            "explanation": "Malam significa noche."
                                        },
                                        {
                                            "vocabId": "v146",
                                            "type": "listen",
                                            "prompt": "Escribe la expresión “esta mañana”",
                                            "answer": "Pagi ini",
                                            "explanation": "Pagi ini significa esta mañana."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Decir la hora",
                                    "objective": "Aprende a decir la hora y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Jam y pukul sirven para expresar la hora. Pukul tujuh indica las siete; jam tujuh tepat expresa las siete en punto.",
                                    "vocabIds": [
                                        "v150",
                                        "v151",
                                        "v152",
                                        "v153"
                                    ],
                                    "reviewVocabIds": [
                                        "v146",
                                        "v147",
                                        "v148",
                                        "v149"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v150",
                                            "type": "mc",
                                            "prompt": "En la expresión jam tujuh, jam significa…",
                                            "options": [
                                                "Hora",
                                                "Minuto",
                                                "Mañana"
                                            ],
                                            "answer": 0,
                                            "explanation": "Jam se usa para expresar la hora y también significa reloj."
                                        },
                                        {
                                            "vocabId": "v151",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: a las (para indicar una hora)",
                                            "answer": "Pukul",
                                            "explanation": "Pukul se usa para indicar una hora concreta."
                                        },
                                        {
                                            "vocabId": "v152",
                                            "type": "listen",
                                            "prompt": "Escribe la palabra que significa minuto",
                                            "answer": "Menit",
                                            "explanation": "Menit significa minuto."
                                        },
                                        {
                                            "vocabId": "v153",
                                            "type": "mc",
                                            "prompt": "¿Qué hora significa setengah delapan?",
                                            "options": [
                                                "7:30",
                                                "8:30",
                                                "7:00"
                                            ],
                                            "answer": 0,
                                            "explanation": "Setengah delapan significa siete y media."
                                        },
                                        {
                                            "vocabId": "v151",
                                            "type": "write",
                                            "prompt": "Escribe una frase para decir que son las siete en punto.",
                                            "hint": "Usa jam, tujuh y tepat.",
                                            "modelAnswer": "Jam tujuh tepat.",
                                            "explanation": "La frase significa las siete en punto."
                                        },
                                        {
                                            "vocabId": "v146",
                                            "type": "order",
                                            "prompt": "Ordena: Esta mañana estudio.",
                                            "words": [
                                                "belajar",
                                                "saya",
                                                "ini",
                                                "Pagi"
                                            ],
                                            "correctOrder": [
                                                "Pagi",
                                                "ini",
                                                "saya",
                                                "belajar"
                                            ],
                                            "explanation": "Pagi ini saya belajar. significa «Esta mañana estudio.»."
                                        },
                                        {
                                            "vocabId": "v147",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Siang",
                                            "answer": "Siang",
                                            "explanation": "Siang significa Mediodía / primeras horas de la tarde."
                                        },
                                        {
                                            "vocabId": "v148",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Sore».",
                                            "hint": "Puedes tomar como referencia: Saya bekerja pada sore hari.",
                                            "modelAnswer": "Saya bekerja pada sore hari.",
                                            "explanation": "Saya bekerja pada sore hari. significa «Trabajo por la tarde.»."
                                        },
                                        {
                                            "vocabId": "v149",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Malam»?",
                                            "options": [
                                                "Noche",
                                                "Media / mitad",
                                                "Más tarde"
                                            ],
                                            "answer": 0,
                                            "explanation": "Malam significa Noche."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Minutos y momentos",
                                    "objective": "Aprende a minutos y momentos y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Menit significa minuto y lewat indica los minutos que pasan de la hora. Setengah delapan significa las siete y media, media hora antes de las ocho.",
                                    "vocabIds": [
                                        "v154",
                                        "v155",
                                        "v156",
                                        "v157"
                                    ],
                                    "reviewVocabIds": [
                                        "v146",
                                        "v147",
                                        "v148",
                                        "v149",
                                        "v150",
                                        "v151",
                                        "v152",
                                        "v153"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v154",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: ahora",
                                            "answer": "Sekarang",
                                            "explanation": "Sekarang significa ahora."
                                        },
                                        {
                                            "vocabId": "v155",
                                            "type": "mc",
                                            "prompt": "Nanti significa…",
                                            "options": [
                                                "Ayer",
                                                "Más tarde",
                                                "Ahora"
                                            ],
                                            "answer": 1,
                                            "explanation": "Nanti significa más tarde."
                                        },
                                        {
                                            "vocabId": "v156",
                                            "type": "order",
                                            "prompt": "Ordena: Las siete en punto",
                                            "words": [
                                                "tepat",
                                                "tujuh",
                                                "Jam"
                                            ],
                                            "correctOrder": [
                                                "Jam",
                                                "tujuh",
                                                "tepat"
                                            ],
                                            "explanation": "Jam tujuh tepat significa las siete en punto."
                                        },
                                        {
                                            "vocabId": "v157",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: las siete y cinco",
                                            "answer": "Jam tujuh lewat lima menit",
                                            "explanation": "Lewat indica los minutos que pasan de la hora."
                                        },
                                        {
                                            "vocabId": "v155",
                                            "type": "write",
                                            "prompt": "Escribe una frase sencilla con nanti.",
                                            "hint": "Puedes hablar de estudiar más tarde.",
                                            "modelAnswer": "Saya belajar nanti.",
                                            "explanation": "Nanti significa más tarde; otras frases correctas también valen."
                                        },
                                        {
                                            "vocabId": "v146",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Pagi",
                                            "answer": "Pagi",
                                            "explanation": "Pagi significa Mañana (parte del día)."
                                        },
                                        {
                                            "vocabId": "v147",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Siang».",
                                            "hint": "Puedes tomar como referencia: Saya belajar pada siang hari.",
                                            "modelAnswer": "Saya belajar pada siang hari.",
                                            "explanation": "Saya belajar pada siang hari. significa «Estudio durante el día.»."
                                        },
                                        {
                                            "vocabId": "v148",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Sore»?",
                                            "options": [
                                                "Tarde (final de la tarde)",
                                                "Media / mitad",
                                                "Más tarde"
                                            ],
                                            "answer": 0,
                                            "explanation": "Sore significa Tarde (final de la tarde)."
                                        },
                                        {
                                            "vocabId": "v149",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Noche",
                                            "answer": "Malam",
                                            "explanation": "Malam significa Noche."
                                        },
                                        {
                                            "vocabId": "v150",
                                            "type": "order",
                                            "prompt": "Ordena: Las siete.",
                                            "words": [
                                                "tujuh",
                                                "Jam"
                                            ],
                                            "correctOrder": [
                                                "Jam",
                                                "tujuh"
                                            ],
                                            "explanation": "Jam tujuh. significa «Las siete.»."
                                        },
                                        {
                                            "vocabId": "v151",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Pukul",
                                            "answer": "Pukul",
                                            "explanation": "Pukul significa A las (indica la hora)."
                                        },
                                        {
                                            "vocabId": "v152",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Menit».",
                                            "hint": "Puedes tomar como referencia: Lima menit.",
                                            "modelAnswer": "Lima menit.",
                                            "explanation": "Lima menit. significa «Cinco minutos.»."
                                        },
                                        {
                                            "vocabId": "v153",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Setengah»?",
                                            "options": [
                                                "Media / mitad",
                                                "Día",
                                                "Mañana"
                                            ],
                                            "answer": 0,
                                            "explanation": "Setengah significa Media / mitad."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Ubicar actividades en el tiempo",
                                    "objective": "Aprende a ubicar actividades en el tiempo y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Sekarang significa ahora y nanti más tarde. Hari ini es hoy y besok mañana; combina estas referencias con horas y actividades.",
                                    "vocabIds": [
                                        "v35",
                                        "v36",
                                        "v122"
                                    ],
                                    "reviewVocabIds": [
                                        "v146",
                                        "v147",
                                        "v148",
                                        "v149",
                                        "v150",
                                        "v151",
                                        "v152",
                                        "v153",
                                        "v154",
                                        "v155",
                                        "v156",
                                        "v157"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v35",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «hari»?",
                                            "options": [
                                                "Día",
                                                "Mes",
                                                "Mañana"
                                            ],
                                            "answer": 0,
                                            "explanation": "Hari significa día."
                                        },
                                        {
                                            "vocabId": "v36",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «hari ini»?",
                                            "options": [
                                                "Ayer",
                                                "Hoy / este día",
                                                "Mañana"
                                            ],
                                            "answer": 1,
                                            "explanation": "Hari ini significa hoy o este día."
                                        },
                                        {
                                            "vocabId": "v122",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «besok»?",
                                            "options": [
                                                "Ayer",
                                                "Mañana",
                                                "Hoy"
                                            ],
                                            "answer": 1,
                                            "explanation": "Besok significa mañana."
                                        },
                                        {
                                            "vocabId": "v146",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Pagi».",
                                            "hint": "Puedes tomar como referencia: Pagi ini saya belajar.",
                                            "modelAnswer": "Pagi ini saya belajar.",
                                            "explanation": "Pagi ini saya belajar. significa «Esta mañana estudio.»."
                                        },
                                        {
                                            "vocabId": "v147",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Siang»?",
                                            "options": [
                                                "Mediodía / primeras horas de la tarde",
                                                "Media / mitad",
                                                "Más tarde"
                                            ],
                                            "answer": 0,
                                            "explanation": "Siang significa Mediodía / primeras horas de la tarde."
                                        },
                                        {
                                            "vocabId": "v148",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Tarde (final de la tarde)",
                                            "answer": "Sore",
                                            "explanation": "Sore significa Tarde (final de la tarde)."
                                        },
                                        {
                                            "vocabId": "v149",
                                            "type": "order",
                                            "prompt": "Ordena: Duermo por la noche.",
                                            "words": [
                                                "hari",
                                                "malam",
                                                "pada",
                                                "tidur",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "tidur",
                                                "pada",
                                                "malam",
                                                "hari"
                                            ],
                                            "explanation": "Saya tidur pada malam hari. significa «Duermo por la noche.»."
                                        },
                                        {
                                            "vocabId": "v150",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Jam",
                                            "answer": "Jam",
                                            "explanation": "Jam significa Hora / reloj."
                                        },
                                        {
                                            "vocabId": "v151",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Pukul».",
                                            "hint": "Puedes tomar como referencia: Pukul tujuh.",
                                            "modelAnswer": "Pukul tujuh.",
                                            "explanation": "Pukul tujuh. significa «A las siete.»."
                                        },
                                        {
                                            "vocabId": "v152",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Menit»?",
                                            "options": [
                                                "Minuto",
                                                "Día",
                                                "Mañana"
                                            ],
                                            "answer": 0,
                                            "explanation": "Menit significa Minuto."
                                        },
                                        {
                                            "vocabId": "v153",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Media / mitad",
                                            "answer": "Setengah",
                                            "explanation": "Setengah significa Media / mitad."
                                        },
                                        {
                                            "vocabId": "v154",
                                            "type": "order",
                                            "prompt": "Ordena: Ahora son las siete.",
                                            "words": [
                                                "tujuh",
                                                "pukul",
                                                "Sekarang"
                                            ],
                                            "correctOrder": [
                                                "Sekarang",
                                                "pukul",
                                                "tujuh"
                                            ],
                                            "explanation": "Sekarang pukul tujuh. significa «Ahora son las siete.»."
                                        },
                                        {
                                            "vocabId": "v155",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Nanti",
                                            "answer": "Nanti",
                                            "explanation": "Nanti significa Más tarde."
                                        },
                                        {
                                            "vocabId": "v156",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Tepat».",
                                            "hint": "Puedes tomar como referencia: Jam tujuh tepat.",
                                            "modelAnswer": "Jam tujuh tepat.",
                                            "explanation": "Jam tujuh tepat. significa «Las siete en punto.»."
                                        },
                                        {
                                            "vocabId": "v157",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Lewat»?",
                                            "options": [
                                                "Pasadas / después de",
                                                "Tarde (final de la tarde)",
                                                "Hora / reloj"
                                            ],
                                            "answer": 0,
                                            "explanation": "Lewat significa Pasadas / después de."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 5: Recuperación espaciada",
                                    "objective": "Recupera el vocabulario completo de la unidad y aplícalo sin consultar la lista.",
                                    "grammar": "Practica el vocabulario en cinco formatos: reconocimiento, traducción, ordenación, escucha y escritura. Recupera las formas dentro de los ejemplos de la unidad.",
                                    "vocabIds": [],
                                    "reviewVocabIds": [
                                        "v146",
                                        "v147",
                                        "v148",
                                        "v149",
                                        "v150",
                                        "v151",
                                        "v152",
                                        "v153",
                                        "v154",
                                        "v155",
                                        "v156",
                                        "v157",
                                        "v35",
                                        "v36",
                                        "v122"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v146",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Pagi»?",
                                            "options": [
                                                "Mañana (parte del día)",
                                                "Tarde (final de la tarde)",
                                                "Hora / reloj"
                                            ],
                                            "answer": 0,
                                            "explanation": "Pagi significa Mañana (parte del día)."
                                        },
                                        {
                                            "vocabId": "v147",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Mediodía / primeras horas de la tarde",
                                            "answer": "Siang",
                                            "explanation": "Siang significa Mediodía / primeras horas de la tarde."
                                        },
                                        {
                                            "vocabId": "v148",
                                            "type": "order",
                                            "prompt": "Ordena: Trabajo por la tarde.",
                                            "words": [
                                                "hari",
                                                "sore",
                                                "pada",
                                                "bekerja",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "bekerja",
                                                "pada",
                                                "sore",
                                                "hari"
                                            ],
                                            "explanation": "Saya bekerja pada sore hari. significa «Trabajo por la tarde.»."
                                        },
                                        {
                                            "vocabId": "v149",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Malam",
                                            "answer": "Malam",
                                            "explanation": "Malam significa Noche."
                                        },
                                        {
                                            "vocabId": "v150",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Jam».",
                                            "hint": "Puedes tomar como referencia: Jam tujuh.",
                                            "modelAnswer": "Jam tujuh.",
                                            "explanation": "Jam tujuh. significa «Las siete.»."
                                        },
                                        {
                                            "vocabId": "v151",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Pukul»?",
                                            "options": [
                                                "A las (indica la hora)",
                                                "Media / mitad",
                                                "Más tarde"
                                            ],
                                            "answer": 0,
                                            "explanation": "Pukul significa A las (indica la hora)."
                                        },
                                        {
                                            "vocabId": "v152",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Minuto",
                                            "answer": "Menit",
                                            "explanation": "Menit significa Minuto."
                                        },
                                        {
                                            "vocabId": "v153",
                                            "type": "order",
                                            "prompt": "Ordena: Las siete y media.",
                                            "words": [
                                                "delapan",
                                                "Setengah"
                                            ],
                                            "correctOrder": [
                                                "Setengah",
                                                "delapan"
                                            ],
                                            "explanation": "Setengah delapan. significa «Las siete y media.»."
                                        },
                                        {
                                            "vocabId": "v154",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Sekarang",
                                            "answer": "Sekarang",
                                            "explanation": "Sekarang significa Ahora."
                                        },
                                        {
                                            "vocabId": "v155",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Nanti».",
                                            "hint": "Puedes tomar como referencia: Saya belajar nanti.",
                                            "modelAnswer": "Saya belajar nanti.",
                                            "explanation": "Saya belajar nanti. significa «Estudio más tarde.»."
                                        },
                                        {
                                            "vocabId": "v156",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Tepat»?",
                                            "options": [
                                                "En punto / exacto",
                                                "Día",
                                                "Mañana"
                                            ],
                                            "answer": 0,
                                            "explanation": "Tepat significa En punto / exacto."
                                        },
                                        {
                                            "vocabId": "v157",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Pasadas / después de",
                                            "answer": "Lewat",
                                            "explanation": "Lewat significa Pasadas / después de."
                                        },
                                        {
                                            "vocabId": "v35",
                                            "type": "order",
                                            "prompt": "Ordena: Hoy estudio.",
                                            "words": [
                                                "belajar",
                                                "saya",
                                                "ini",
                                                "Hari"
                                            ],
                                            "correctOrder": [
                                                "Hari",
                                                "ini",
                                                "saya",
                                                "belajar"
                                            ],
                                            "explanation": "Hari ini saya belajar. significa «Hoy estudio.»."
                                        },
                                        {
                                            "vocabId": "v36",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Hari ini",
                                            "answer": "Hari ini",
                                            "explanation": "Hari ini significa Hoy / este día."
                                        },
                                        {
                                            "vocabId": "v122",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Besok».",
                                            "hint": "Puedes tomar como referencia: Besok saya bekerja.",
                                            "modelAnswer": "Besok saya bekerja.",
                                            "explanation": "Besok saya bekerja. significa «Mañana trabajo.»."
                                        }
                                    ]
                                }
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
                            ,
                                            {
                                                "vocabId": "v304",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «baju»?",
                                                "options": [
                                                    "Ropa / prenda de vestir",
                                                    "Zapato",
                                                    "Comida"
                                                ],
                                                "answer": 0,
                                                "explanation": "Baju significa ropa o prenda de vestir."
                                            }
],
                            lessons: [
                                {
                                    "title": "Lección 1: Despertarse y asearse",
                                    "objective": "Aprende a despertarse y asearse y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Para describir una rutina, coloca el sujeto antes del verbo: Saya bangun y Saya mandi. El verbo no cambia según la persona.",
                                    "vocabIds": [
                                        "v247",
                                        "v248"
                                    ],
                                    "reviewVocabIds": [],
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
                                            "vocabId": "v247",
                                            "type": "mc",
                                            "prompt": "Escucha la rutina y elige qué hace la persona",
                                            "audioText": "Saya bangun pagi.",
                                            "options": [
                                                "Me levanto por la mañana",
                                                "Se acuesta por la noche",
                                                "Cena por la tarde"
                                            ],
                                            "answer": 0,
                                            "explanation": "Bangun significa levantarse; pagi indica la mañana."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Desayunar y salir",
                                    "objective": "Aprende a desayunar y salir y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Sarapan significa desayunar y berangkat salir o partir. Puedes presentar acciones cotidianas en frases breves con el sujeto antes del verbo.",
                                    "vocabIds": [
                                        "v249",
                                        "v250"
                                    ],
                                    "reviewVocabIds": [
                                        "v247",
                                        "v248"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v250",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce al indonesio: Salir / partir",
                                            "answer": "Berangkat",
                                            "explanation": "Berangkat significa «Salir / partir»."
                                        },
                                        {
                                            "vocabId": "v247",
                                            "type": "order",
                                            "prompt": "Ordena: Me levanto por la mañana.",
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
                                            "explanation": "Saya bangun pagi. significa «Me levanto por la mañana.»."
                                        },
                                        {
                                            "vocabId": "v248",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Mandi",
                                            "answer": "Mandi",
                                            "explanation": "Mandi significa Bañarse / ducharse."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Volver y descansar",
                                    "objective": "Aprende a volver y descansar y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Pulang significa volver a casa y istirahat descansar. Mantén el orden sujeto + verbo al describir lo que haces durante el día.",
                                    "vocabIds": [
                                        "v251",
                                        "v252"
                                    ],
                                    "reviewVocabIds": [
                                        "v247",
                                        "v248",
                                        "v249",
                                        "v250"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v251",
                                            "type": "write",
                                            "prompt": "Escribe una frase sencilla con «Pulang».",
                                            "hint": "Usa el ejemplo de vocabulario como modelo y cambia lo que puedas con palabras ya aprendidas.",
                                            "modelAnswer": "Saya pulang.",
                                            "explanation": "Ejemplo: Saya pulang. — Vuelvo a casa."
                                        },
                                        {
                                            "vocabId": "v247",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Bangun",
                                            "answer": "Bangun",
                                            "explanation": "Bangun significa Levantarse."
                                        },
                                        {
                                            "vocabId": "v248",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Mandi».",
                                            "hint": "Puedes tomar como referencia: Saya mandi.",
                                            "modelAnswer": "Saya mandi.",
                                            "explanation": "Saya mandi. significa «Me baño.»."
                                        },
                                        {
                                            "vocabId": "v249",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Sarapan»?",
                                            "options": [
                                                "Desayunar",
                                                "Lavar",
                                                "Levantarse"
                                            ],
                                            "answer": 0,
                                            "explanation": "Sarapan significa Desayunar."
                                        },
                                        {
                                            "vocabId": "v250",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Salir / partir",
                                            "answer": "Berangkat",
                                            "explanation": "Berangkat significa Salir / partir."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Tareas del hogar",
                                    "objective": "Aprende a tareas del hogar y aplica las formas nuevas en frases sencillas, recuperando lo estudiado anteriormente.",
                                    "grammar": "Memasak significa cocinar y mencuci lavar; baju es ropa. Para expresar la acción y su objeto, coloca el verbo antes del sustantivo: mencuci baju.",
                                    "vocabIds": [
                                        "v253",
                                        "v254",
                                        "v304"
                                    ],
                                    "reviewVocabIds": [
                                        "v247",
                                        "v248",
                                        "v249",
                                        "v250",
                                        "v251",
                                        "v252"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v254",
                                            "type": "mc",
                                            "prompt": "¿Qué frase significa «Lavo la ropa»?",
                                            "options": [
                                                "Saya mencuci baju.",
                                                "Saya bangun.",
                                                "Saya mandi."
                                            ],
                                            "answer": 0,
                                            "explanation": "Saya mencuci baju significa «Lavo la ropa»; baju significa ropa o prenda de vestir."
                                        },
                                        {
                                            "vocabId": "v304",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «baju»?",
                                            "options": [
                                                "Ropa / prenda de vestir",
                                                "Zapato",
                                                "Comida"
                                            ],
                                            "answer": 0,
                                            "explanation": "Baju significa ropa o prenda de vestir."
                                        },
                                        {
                                            "vocabId": "v247",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Bangun».",
                                            "hint": "Puedes tomar como referencia: Saya bangun pagi.",
                                            "modelAnswer": "Saya bangun pagi.",
                                            "explanation": "Saya bangun pagi. significa «Me levanto por la mañana.»."
                                        },
                                        {
                                            "vocabId": "v248",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Mandi»?",
                                            "options": [
                                                "Bañarse / ducharse",
                                                "Lavar",
                                                "Levantarse"
                                            ],
                                            "answer": 0,
                                            "explanation": "Mandi significa Bañarse / ducharse."
                                        },
                                        {
                                            "vocabId": "v249",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Desayunar",
                                            "answer": "Sarapan",
                                            "explanation": "Sarapan significa Desayunar."
                                        },
                                        {
                                            "vocabId": "v250",
                                            "type": "order",
                                            "prompt": "Ordena: Salgo.",
                                            "words": [
                                                "berangkat",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "berangkat"
                                            ],
                                            "explanation": "Saya berangkat. significa «Salgo.»."
                                        },
                                        {
                                            "vocabId": "v251",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Pulang",
                                            "answer": "Pulang",
                                            "explanation": "Pulang significa Volver a casa."
                                        },
                                        {
                                            "vocabId": "v252",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Istirahat».",
                                            "hint": "Puedes tomar como referencia: Saya istirahat.",
                                            "modelAnswer": "Saya istirahat.",
                                            "explanation": "Saya istirahat. significa «Descanso.»."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 5: Recuperación espaciada",
                                    "objective": "Recupera el vocabulario completo de la unidad y aplícalo sin consultar la lista.",
                                    "grammar": "Practica el vocabulario en cinco formatos: reconocimiento, traducción, ordenación, escucha y escritura. Recupera las formas dentro de los ejemplos de la unidad.",
                                    "vocabIds": [],
                                    "reviewVocabIds": [
                                        "v247",
                                        "v248",
                                        "v249",
                                        "v250",
                                        "v251",
                                        "v252",
                                        "v253",
                                        "v254",
                                        "v304"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v247",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Bangun»?",
                                            "options": [
                                                "Levantarse",
                                                "Desayunar",
                                                "Volver a casa"
                                            ],
                                            "answer": 0,
                                            "explanation": "Bangun significa Levantarse."
                                        },
                                        {
                                            "vocabId": "v248",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Bañarse / ducharse",
                                            "answer": "Mandi",
                                            "explanation": "Mandi significa Bañarse / ducharse."
                                        },
                                        {
                                            "vocabId": "v249",
                                            "type": "order",
                                            "prompt": "Ordena: Desayuno.",
                                            "words": [
                                                "sarapan",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "sarapan"
                                            ],
                                            "explanation": "Saya sarapan. significa «Desayuno.»."
                                        },
                                        {
                                            "vocabId": "v250",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Berangkat",
                                            "answer": "Berangkat",
                                            "explanation": "Berangkat significa Salir / partir."
                                        },
                                        {
                                            "vocabId": "v251",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Pulang».",
                                            "hint": "Puedes tomar como referencia: Saya pulang.",
                                            "modelAnswer": "Saya pulang.",
                                            "explanation": "Saya pulang. significa «Vuelvo a casa.»."
                                        },
                                        {
                                            "vocabId": "v252",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Istirahat»?",
                                            "options": [
                                                "Descansar",
                                                "Lavar",
                                                "Levantarse"
                                            ],
                                            "answer": 0,
                                            "explanation": "Istirahat significa Descansar."
                                        },
                                        {
                                            "vocabId": "v253",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Cocinar",
                                            "answer": "Memasak",
                                            "explanation": "Memasak significa Cocinar."
                                        },
                                        {
                                            "vocabId": "v254",
                                            "type": "order",
                                            "prompt": "Ordena: Lavo.",
                                            "words": [
                                                "mencuci",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "mencuci"
                                            ],
                                            "explanation": "Saya mencuci. significa «Lavo.»."
                                        },
                                        {
                                            "vocabId": "v304",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Baju",
                                            "answer": "Baju",
                                            "explanation": "Baju significa Ropa / prenda de vestir."
                                        }
                                    ]
                                }
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
                            ],
                            lessons: [
                                {
                                    "title": "Lección 1: Identificar el clima",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Cuaca nombra el tiempo atmosférico y panas describe el calor: Cuaca panas. En indonesio, estas descripciones breves no necesitan añadir un equivalente de «ser» en cada frase.",
                                    "vocabIds": [
                                        "v255",
                                        "v256"
                                    ],
                                    "reviewVocabIds": [],
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
                                            "vocabId": "v255",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Cuaca».",
                                            "hint": "Puedes tomar como referencia: Cuaca panas.",
                                            "modelAnswer": "Cuaca panas.",
                                            "explanation": "Cuaca panas. significa «Hace calor.»."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Hablar del frío y la lluvia",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Dingin describe el frío y hujan expresa lluvia o llover. Para hablar de hoy, la frase Hari ini hujan coloca primero la referencia temporal.",
                                    "vocabIds": [
                                        "v257",
                                        "v258"
                                    ],
                                    "reviewVocabIds": [
                                        "v255",
                                        "v256"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v258",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce al indonesio: Lluvia / llover",
                                            "answer": "Hujan",
                                            "explanation": "Hujan significa «Lluvia / llover»."
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
                                            "vocabId": "v258",
                                            "type": "mc",
                                            "prompt": "Escucha el parte del tiempo y elige qué ocurre",
                                            "audioText": "Hari ini hujan.",
                                            "options": [
                                                "Hoy llueve",
                                                "Hoy hace frío",
                                                "Hoy hace calor"
                                            ],
                                            "answer": 0,
                                            "explanation": "Hujan significa lluvia o llover."
                                        },
                                        {
                                            "vocabId": "v255",
                                            "type": "order",
                                            "prompt": "Ordena: Hace calor.",
                                            "words": [
                                                "panas",
                                                "Cuaca"
                                            ],
                                            "correctOrder": [
                                                "Cuaca",
                                                "panas"
                                            ],
                                            "explanation": "Cuaca panas. significa «Hace calor.»."
                                        },
                                        {
                                            "vocabId": "v256",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Panas",
                                            "answer": "Panas",
                                            "explanation": "Panas significa Caliente / hace calor."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Describir el cielo",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Cerah describe el cielo despejado o soleado y mendung indica que está nublado. Puedes combinar cada adjetivo con cuaca: Cuaca cerah y Cuaca mendung.",
                                    "vocabIds": [
                                        "v259",
                                        "v260"
                                    ],
                                    "reviewVocabIds": [
                                        "v255",
                                        "v256",
                                        "v257",
                                        "v258"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v255",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Cuaca",
                                            "answer": "Cuaca",
                                            "explanation": "Cuaca significa Tiempo atmosférico."
                                        },
                                        {
                                            "vocabId": "v256",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Panas».",
                                            "hint": "Puedes tomar como referencia: Cuaca panas.",
                                            "modelAnswer": "Cuaca panas.",
                                            "explanation": "Cuaca panas. significa «Hace calor.»."
                                        },
                                        {
                                            "vocabId": "v257",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Dingin»?",
                                            "options": [
                                                "Frío",
                                                "Paraguas",
                                                "Caliente / hace calor"
                                            ],
                                            "answer": 0,
                                            "explanation": "Dingin significa Frío."
                                        },
                                        {
                                            "vocabId": "v258",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Lluvia / llover",
                                            "answer": "Hujan",
                                            "explanation": "Hujan significa Lluvia / llover."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Viento y protección",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Angin significa viento y payung paraguas. Usa Ini payung saya para señalar un objeto propio; relaciona el paraguas con las condiciones del tiempo.",
                                    "vocabIds": [
                                        "v261",
                                        "v262"
                                    ],
                                    "reviewVocabIds": [
                                        "v255",
                                        "v256",
                                        "v257",
                                        "v258",
                                        "v259",
                                        "v260"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v262",
                                            "type": "mc",
                                            "prompt": "¿Qué objeto puedes usar cuando llueve?",
                                            "options": [
                                                "Payung",
                                                "Buku",
                                                "Bola"
                                            ],
                                            "answer": 0,
                                            "explanation": "Payung significa «paraguas», un objeto que se usa cuando llueve."
                                        },
                                        {
                                            "vocabId": "v255",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Cuaca».",
                                            "hint": "Puedes tomar como referencia: Cuaca panas.",
                                            "modelAnswer": "Cuaca panas.",
                                            "explanation": "Cuaca panas. significa «Hace calor.»."
                                        },
                                        {
                                            "vocabId": "v256",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Panas»?",
                                            "options": [
                                                "Caliente / hace calor",
                                                "Paraguas",
                                                "Frío"
                                            ],
                                            "answer": 0,
                                            "explanation": "Panas significa Caliente / hace calor."
                                        },
                                        {
                                            "vocabId": "v257",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Frío",
                                            "answer": "Dingin",
                                            "explanation": "Dingin significa Frío."
                                        },
                                        {
                                            "vocabId": "v258",
                                            "type": "order",
                                            "prompt": "Ordena: Hoy llueve.",
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
                                            "explanation": "Hari ini hujan. significa «Hoy llueve.»."
                                        },
                                        {
                                            "vocabId": "v259",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Cerah",
                                            "answer": "Cerah",
                                            "explanation": "Cerah significa Despejado / soleado."
                                        },
                                        {
                                            "vocabId": "v260",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Mendung».",
                                            "hint": "Puedes tomar como referencia: Cuaca mendung.",
                                            "modelAnswer": "Cuaca mendung.",
                                            "explanation": "Cuaca mendung. significa «Está nublado.»."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 5: Recuperación espaciada",
                                    "objective": "Recupera todas las palabras de la unidad y aplícalas en distintos formatos sin consultar la lista.",
                                    "grammar": "Recupera el vocabulario completo mediante reconocimiento, traducción, ordenación, escucha y escritura. Reutiliza las expresiones y ejemplos de la unidad.",
                                    "vocabIds": [],
                                    "reviewVocabIds": [
                                        "v255",
                                        "v256",
                                        "v257",
                                        "v258",
                                        "v259",
                                        "v260",
                                        "v261",
                                        "v262"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v255",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Cuaca»?",
                                            "options": [
                                                "Tiempo atmosférico",
                                                "Frío",
                                                "Despejado / soleado"
                                            ],
                                            "answer": 0,
                                            "explanation": "Cuaca significa Tiempo atmosférico."
                                        },
                                        {
                                            "vocabId": "v256",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Caliente / hace calor",
                                            "answer": "Panas",
                                            "explanation": "Panas significa Caliente / hace calor."
                                        },
                                        {
                                            "vocabId": "v257",
                                            "type": "order",
                                            "prompt": "Ordena: Agua fría.",
                                            "words": [
                                                "dingin",
                                                "Air"
                                            ],
                                            "correctOrder": [
                                                "Air",
                                                "dingin"
                                            ],
                                            "explanation": "Air dingin. significa «Agua fría.»."
                                        },
                                        {
                                            "vocabId": "v258",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Hujan",
                                            "answer": "Hujan",
                                            "explanation": "Hujan significa Lluvia / llover."
                                        },
                                        {
                                            "vocabId": "v259",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Cerah».",
                                            "hint": "Puedes tomar como referencia: Cuaca cerah.",
                                            "modelAnswer": "Cuaca cerah.",
                                            "explanation": "Cuaca cerah. significa «Hace buen tiempo.»."
                                        },
                                        {
                                            "vocabId": "v260",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Mendung»?",
                                            "options": [
                                                "Nublado",
                                                "Paraguas",
                                                "Caliente / hace calor"
                                            ],
                                            "answer": 0,
                                            "explanation": "Mendung significa Nublado."
                                        },
                                        {
                                            "vocabId": "v261",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Viento",
                                            "answer": "Angin",
                                            "explanation": "Angin significa Viento."
                                        },
                                        {
                                            "vocabId": "v262",
                                            "type": "order",
                                            "prompt": "Ordena: Este es mi paraguas.",
                                            "words": [
                                                "saya",
                                                "payung",
                                                "Ini"
                                            ],
                                            "correctOrder": [
                                                "Ini",
                                                "payung",
                                                "saya"
                                            ],
                                            "explanation": "Ini payung saya. significa «Este es mi paraguas.»."
                                        }
                                    ]
                                }
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
                            ],
                            lessons: [
                                {
                                    "title": "Lección 1: Autobús y tren",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Bus significa autobús y kereta tren. En los ejemplos aparece naik bus o naik kereta como expresión completa; naik se estudia de forma explícita en la cuarta lección.",
                                    "vocabIds": [
                                        "v263",
                                        "v264"
                                    ],
                                    "reviewVocabIds": [],
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
                                            "vocabId": "v263",
                                            "type": "mc",
                                            "prompt": "Escucha cómo viaja la persona",
                                            "audioText": "Saya naik bus.",
                                            "options": [
                                                "Voy en autobús",
                                                "Va en tren",
                                                "Va en taxi"
                                            ],
                                            "answer": 0,
                                            "explanation": "Naik bus significa ir o viajar en autobús."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Taxi y estación",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Taksi es taxi y stasiun es estación de tren. Aprende a reconocer el medio de transporte y el lugar asociado en expresiones sencillas.",
                                    "vocabIds": [
                                        "v265",
                                        "v266"
                                    ],
                                    "reviewVocabIds": [
                                        "v263",
                                        "v264"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v266",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce al indonesio: Estación de tren",
                                            "answer": "Stasiun",
                                            "explanation": "Stasiun significa «Estación de tren»."
                                        },
                                        {
                                            "vocabId": "v263",
                                            "type": "order",
                                            "prompt": "Ordena: Voy en autobús.",
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
                                            "explanation": "Saya naik bus. significa «Voy en autobús.»."
                                        },
                                        {
                                            "vocabId": "v264",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Kereta",
                                            "answer": "Kereta",
                                            "explanation": "Kereta significa Tren."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Terminal y bicicleta",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Terminal nombra una terminal de transporte y sepeda una bicicleta. Reutiliza las combinaciones vistas con los medios de transporte y los lugares.",
                                    "vocabIds": [
                                        "v267",
                                        "v268"
                                    ],
                                    "reviewVocabIds": [
                                        "v263",
                                        "v264",
                                        "v265",
                                        "v266"
                                    ],
                                    "exercises": [
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
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Bus",
                                            "answer": "Bus",
                                            "explanation": "Bus significa Autobús."
                                        },
                                        {
                                            "vocabId": "v264",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Kereta».",
                                            "hint": "Puedes tomar como referencia: Saya naik kereta.",
                                            "modelAnswer": "Saya naik kereta.",
                                            "explanation": "Saya naik kereta. significa «Voy en tren.»."
                                        },
                                        {
                                            "vocabId": "v265",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Taksi»?",
                                            "options": [
                                                "Taxi",
                                                "Bajar / apearse",
                                                "Tren"
                                            ],
                                            "answer": 0,
                                            "explanation": "Taksi significa Taxi."
                                        },
                                        {
                                            "vocabId": "v266",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Estación de tren",
                                            "answer": "Stasiun",
                                            "explanation": "Stasiun significa Estación de tren."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Subir y bajar del transporte",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Naik expresa subir o tomar un transporte; turun expresa bajar o apearse. Compara Saya naik bus y Saya turun para distinguir ambas acciones.",
                                    "vocabIds": [
                                        "v269",
                                        "v270"
                                    ],
                                    "reviewVocabIds": [
                                        "v263",
                                        "v264",
                                        "v265",
                                        "v266",
                                        "v267",
                                        "v268"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v270",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Saya turun»?",
                                            "options": [
                                                "Me bajo / desciendo",
                                                "Subo al autobús",
                                                "Me siento"
                                            ],
                                            "answer": 0,
                                            "explanation": "Saya turun significa «Me bajo» o «desciendo» según el contexto."
                                        },
                                        {
                                            "vocabId": "v263",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Bus».",
                                            "hint": "Puedes tomar como referencia: Saya naik bus.",
                                            "modelAnswer": "Saya naik bus.",
                                            "explanation": "Saya naik bus. significa «Voy en autobús.»."
                                        },
                                        {
                                            "vocabId": "v264",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Kereta»?",
                                            "options": [
                                                "Tren",
                                                "Bajar / apearse",
                                                "Taxi"
                                            ],
                                            "answer": 0,
                                            "explanation": "Kereta significa Tren."
                                        },
                                        {
                                            "vocabId": "v265",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Taxi",
                                            "answer": "Taksi",
                                            "explanation": "Taksi significa Taxi."
                                        },
                                        {
                                            "vocabId": "v266",
                                            "type": "order",
                                            "prompt": "Ordena: La estación está aquí.",
                                            "words": [
                                                "sini",
                                                "di",
                                                "Stasiun"
                                            ],
                                            "correctOrder": [
                                                "Stasiun",
                                                "di",
                                                "sini"
                                            ],
                                            "explanation": "Stasiun di sini. significa «La estación está aquí.»."
                                        },
                                        {
                                            "vocabId": "v267",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Terminal",
                                            "answer": "Terminal",
                                            "explanation": "Terminal significa Terminal de transporte."
                                        },
                                        {
                                            "vocabId": "v268",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Sepeda».",
                                            "hint": "Puedes tomar como referencia: Saya naik sepeda.",
                                            "modelAnswer": "Saya naik sepeda.",
                                            "explanation": "Saya naik sepeda. significa «Voy en bicicleta.»."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 5: Recuperación espaciada",
                                    "objective": "Recupera todas las palabras de la unidad y aplícalas en distintos formatos sin consultar la lista.",
                                    "grammar": "Recupera el vocabulario completo mediante reconocimiento, traducción, ordenación, escucha y escritura. Reutiliza las expresiones y ejemplos de la unidad.",
                                    "vocabIds": [],
                                    "reviewVocabIds": [
                                        "v263",
                                        "v264",
                                        "v265",
                                        "v266",
                                        "v267",
                                        "v268",
                                        "v269",
                                        "v270"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v263",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Bus»?",
                                            "options": [
                                                "Autobús",
                                                "Taxi",
                                                "Terminal de transporte"
                                            ],
                                            "answer": 0,
                                            "explanation": "Bus significa Autobús."
                                        },
                                        {
                                            "vocabId": "v264",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Tren",
                                            "answer": "Kereta",
                                            "explanation": "Kereta significa Tren."
                                        },
                                        {
                                            "vocabId": "v265",
                                            "type": "order",
                                            "prompt": "Ordena: Voy en taxi.",
                                            "words": [
                                                "taksi",
                                                "naik",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "naik",
                                                "taksi"
                                            ],
                                            "explanation": "Saya naik taksi. significa «Voy en taxi.»."
                                        },
                                        {
                                            "vocabId": "v266",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Stasiun",
                                            "answer": "Stasiun",
                                            "explanation": "Stasiun significa Estación de tren."
                                        },
                                        {
                                            "vocabId": "v267",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Terminal».",
                                            "hint": "Puedes tomar como referencia: Terminal di sini.",
                                            "modelAnswer": "Terminal di sini.",
                                            "explanation": "Terminal di sini. significa «La terminal de transporte está aquí.»."
                                        },
                                        {
                                            "vocabId": "v268",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Sepeda»?",
                                            "options": [
                                                "Bicicleta",
                                                "Bajar / apearse",
                                                "Tren"
                                            ],
                                            "answer": 0,
                                            "explanation": "Sepeda significa Bicicleta."
                                        },
                                        {
                                            "vocabId": "v269",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Subir / tomar transporte",
                                            "answer": "Naik",
                                            "explanation": "Naik significa Subir / tomar transporte."
                                        },
                                        {
                                            "vocabId": "v270",
                                            "type": "order",
                                            "prompt": "Ordena: Me bajo.",
                                            "words": [
                                                "turun",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "turun"
                                            ],
                                            "explanation": "Saya turun. significa «Me bajo.»."
                                        }
                                    ]
                                }
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
                            ],
                            lessons: [
                                {
                                    "title": "Lección 1: Ir y venir",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Pergi significa ir y datang venir. Puedes añadir una referencia temporal conocida: Saya datang hari ini.",
                                    "vocabIds": [
                                        "v280",
                                        "v281"
                                    ],
                                    "reviewVocabIds": [],
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
                                            "vocabId": "v281",
                                            "type": "write",
                                            "prompt": "Escribe una frase breve con un verbo de esta unidad.",
                                            "hint": "Usa Saya y un verbo que ya hayas practicado.",
                                            "modelAnswer": "Saya pergi.",
                                            "explanation": "Ejemplo: Saya pergi. — Voy."
                                        },
                                        {
                                            "vocabId": "v280",
                                            "type": "mc",
                                            "prompt": "Escucha adónde va la persona",
                                            "audioText": "Saya pergi ke pasar.",
                                            "options": [
                                                "Voy al mercado",
                                                "Viene de la escuela",
                                                "Se queda en casa"
                                            ],
                                            "answer": 0,
                                            "explanation": "Pergi significa ir."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Sentarse y correr",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Duduk significa sentarse y lari correr. Para expresar una acción sencilla, coloca el sujeto antes del verbo: Saya duduk y Saya lari.",
                                    "vocabIds": [
                                        "v282",
                                        "v283"
                                    ],
                                    "reviewVocabIds": [
                                        "v280",
                                        "v281"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v280",
                                            "type": "order",
                                            "prompt": "Ordena: Voy.",
                                            "words": [
                                                "pergi",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "pergi"
                                            ],
                                            "explanation": "Ejemplo: «Saya pergi.» — «Voy.»."
                                        },
                                        {
                                            "vocabId": "v281",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Datang",
                                            "answer": "Datang",
                                            "explanation": "Datang significa Venir."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Jugar y tomar",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Main es una forma coloquial de jugar y ambil significa tomar o agarrar. En ejemplos de la unidad aparece bola como objeto; se introduce formalmente en la siguiente lección.",
                                    "vocabIds": [
                                        "v284",
                                        "v285"
                                    ],
                                    "reviewVocabIds": [
                                        "v280",
                                        "v281",
                                        "v282",
                                        "v283"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v284",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce al indonesio: Jugar",
                                            "answer": "Main",
                                            "explanation": "Main significa «Jugar»."
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
                                            "vocabId": "v280",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Pergi",
                                            "answer": "Pergi",
                                            "explanation": "Pergi significa Ir."
                                        },
                                        {
                                            "vocabId": "v281",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Datang».",
                                            "hint": "Puedes tomar como referencia: Saya datang hari ini.",
                                            "modelAnswer": "Saya datang hari ini.",
                                            "explanation": "Saya datang hari ini. significa «Vengo hoy.»."
                                        },
                                        {
                                            "vocabId": "v282",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Duduk»?",
                                            "options": [
                                                "Sentarse",
                                                "Puerta",
                                                "Venir"
                                            ],
                                            "answer": 0,
                                            "explanation": "Duduk significa Sentarse."
                                        },
                                        {
                                            "vocabId": "v283",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Correr",
                                            "answer": "Lari",
                                            "explanation": "Lari significa Correr."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Pelota y puerta",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Bola significa pelota y pintu puerta. Reconoce estas palabras como objetos y reutiliza las frases Saya main bola y Pintu di sini.",
                                    "vocabIds": [
                                        "v286",
                                        "v287"
                                    ],
                                    "reviewVocabIds": [
                                        "v280",
                                        "v281",
                                        "v282",
                                        "v283",
                                        "v284",
                                        "v285"
                                    ],
                                    "exercises": [
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
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Pergi».",
                                            "hint": "Puedes tomar como referencia: Saya pergi.",
                                            "modelAnswer": "Saya pergi.",
                                            "explanation": "Ejemplo: «Saya pergi.» — «Voy.»."
                                        },
                                        {
                                            "vocabId": "v281",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Datang»?",
                                            "options": [
                                                "Venir",
                                                "Puerta",
                                                "Sentarse"
                                            ],
                                            "answer": 0,
                                            "explanation": "Datang significa Venir."
                                        },
                                        {
                                            "vocabId": "v282",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Sentarse",
                                            "answer": "Duduk",
                                            "explanation": "Duduk significa Sentarse."
                                        },
                                        {
                                            "vocabId": "v283",
                                            "type": "order",
                                            "prompt": "Ordena: Corro.",
                                            "words": [
                                                "lari",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "lari"
                                            ],
                                            "explanation": "Saya lari. significa «Corro.»."
                                        },
                                        {
                                            "vocabId": "v284",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Main",
                                            "answer": "Main",
                                            "explanation": "Main significa Jugar."
                                        },
                                        {
                                            "vocabId": "v285",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Ambil».",
                                            "hint": "Puedes tomar como referencia: Saya ambil bola.",
                                            "modelAnswer": "Saya ambil bola.",
                                            "explanation": "Saya ambil bola. significa «Agarro la pelota.»."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 5: Recuperación espaciada",
                                    "objective": "Recupera todas las palabras de la unidad y aplícalas en distintos formatos sin consultar la lista.",
                                    "grammar": "Recupera el vocabulario completo mediante reconocimiento, traducción, ordenación, escucha y escritura. Reutiliza las expresiones y ejemplos de la unidad.",
                                    "vocabIds": [],
                                    "reviewVocabIds": [
                                        "v280",
                                        "v281",
                                        "v282",
                                        "v283",
                                        "v284",
                                        "v285",
                                        "v286",
                                        "v287"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v280",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Pergi»?",
                                            "options": [
                                                "Ir",
                                                "Sentarse",
                                                "Jugar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Pergi significa Ir."
                                        },
                                        {
                                            "vocabId": "v281",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Venir",
                                            "answer": "Datang",
                                            "explanation": "Datang significa Venir."
                                        },
                                        {
                                            "vocabId": "v282",
                                            "type": "order",
                                            "prompt": "Ordena: Me siento aquí.",
                                            "words": [
                                                "sini",
                                                "di",
                                                "duduk",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "duduk",
                                                "di",
                                                "sini"
                                            ],
                                            "explanation": "Saya duduk di sini. significa «Me siento aquí.»."
                                        },
                                        {
                                            "vocabId": "v283",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Lari",
                                            "answer": "Lari",
                                            "explanation": "Lari significa Correr."
                                        },
                                        {
                                            "vocabId": "v284",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Main».",
                                            "hint": "Puedes tomar como referencia: Saya main bola.",
                                            "modelAnswer": "Saya main bola.",
                                            "explanation": "Saya main bola. significa «Juego a la pelota.»."
                                        },
                                        {
                                            "vocabId": "v285",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Ambil»?",
                                            "options": [
                                                "Tomar / agarrar",
                                                "Puerta",
                                                "Venir"
                                            ],
                                            "answer": 0,
                                            "explanation": "Ambil significa Tomar / agarrar."
                                        },
                                        {
                                            "vocabId": "v286",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Pelota",
                                            "answer": "Bola",
                                            "explanation": "Bola significa Pelota."
                                        },
                                        {
                                            "vocabId": "v287",
                                            "type": "order",
                                            "prompt": "Ordena: La puerta está aquí.",
                                            "words": [
                                                "sini",
                                                "di",
                                                "Pintu"
                                            ],
                                            "correctOrder": [
                                                "Pintu",
                                                "di",
                                                "sini"
                                            ],
                                            "explanation": "Pintu di sini. significa «La puerta está aquí.»."
                                        }
                                    ]
                                }
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
                            ],
                            lessons: [
                                {
                                    "title": "Lección 1: Capacidad y gustos",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Bisa expresa poder o saber hacer y suka expresa gustar. Aprende las combinaciones como bloques: Saya bisa pergi y Saya suka teh.",
                                    "vocabIds": [
                                        "v288",
                                        "v289"
                                    ],
                                    "reviewVocabIds": [],
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
                                            "vocabId": "v288",
                                            "type": "mc",
                                            "prompt": "Escucha qué puede hacer la persona",
                                            "audioText": "Saya bisa berenang.",
                                            "options": [
                                                "Puedo nadar",
                                                "Quiere dormir",
                                                "No sabe leer"
                                            ],
                                            "answer": 0,
                                            "explanation": "Bisa expresa capacidad o posibilidad."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Deseos y permiso",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Ingin expresa querer o desear y boleh pregunta por permiso o posibilidad: Saya ingin kopi y Boleh?",
                                    "vocabIds": [
                                        "v290",
                                        "v291"
                                    ],
                                    "reviewVocabIds": [
                                        "v288",
                                        "v289"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v290",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce al indonesio: Querer / desear",
                                            "answer": "Ingin",
                                            "explanation": "Ingin significa «Querer / desear»."
                                        },
                                        {
                                            "vocabId": "v290",
                                            "type": "write",
                                            "prompt": "Escribe una frase para expresar algo que quieres o que te gusta.",
                                            "hint": "Puedes usar ingin, suka o mau con comida ya conocida.",
                                            "modelAnswer": "Saya ingin kopi.",
                                            "explanation": "Ejemplo: Saya ingin kopi. — Quiero café."
                                        },
                                        {
                                            "vocabId": "v288",
                                            "type": "order",
                                            "prompt": "Ordena: Puedo ir.",
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
                                            "explanation": "Ejemplo: «Saya bisa pergi.» — «Puedo ir.»."
                                        },
                                        {
                                            "vocabId": "v289",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Suka",
                                            "answer": "Suka",
                                            "explanation": "Suka significa Gustar."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Intensidad y cantidad",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Sangat significa muy y sedikit un poco. Colócalos en la expresión para precisar intensidad o cantidad: Saya sangat suka teh y Saya mau sedikit teh.",
                                    "vocabIds": [
                                        "v292",
                                        "v293"
                                    ],
                                    "reviewVocabIds": [
                                        "v288",
                                        "v289",
                                        "v290",
                                        "v291"
                                    ],
                                    "exercises": [
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
                                            "vocabId": "v288",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Bisa",
                                            "answer": "Bisa",
                                            "explanation": "Bisa significa Poder / saber hacer."
                                        },
                                        {
                                            "vocabId": "v289",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Suka».",
                                            "hint": "Puedes tomar como referencia: Saya suka teh.",
                                            "modelAnswer": "Saya suka teh.",
                                            "explanation": "Ejemplo: «Saya suka teh.» — «Me gusta el té.»."
                                        },
                                        {
                                            "vocabId": "v290",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Ingin»?",
                                            "options": [
                                                "Querer / desear",
                                                "Con / junto con",
                                                "Gustar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Ingin significa Querer / desear."
                                        },
                                        {
                                            "vocabId": "v291",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Poder / tener permiso",
                                            "answer": "Boleh",
                                            "explanation": "Boleh significa Poder / tener permiso."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Sentimientos y compañía",
                                    "objective": "Aprende a reconocer y usar el vocabulario de esta lección en expresiones breves, recuperando lo estudiado anteriormente.",
                                    "grammar": "Senang expresa estar contento y bersama indica compañía: Saya senang y Saya belajar bersama ibu.",
                                    "vocabIds": [
                                        "v294",
                                        "v295"
                                    ],
                                    "reviewVocabIds": [
                                        "v288",
                                        "v289",
                                        "v290",
                                        "v291",
                                        "v292",
                                        "v293"
                                    ],
                                    "exercises": [
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
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Bisa».",
                                            "hint": "Puedes tomar como referencia: Saya bisa pergi.",
                                            "modelAnswer": "Saya bisa pergi.",
                                            "explanation": "Ejemplo: «Saya bisa pergi.» — «Puedo ir.»."
                                        },
                                        {
                                            "vocabId": "v289",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Suka»?",
                                            "options": [
                                                "Gustar",
                                                "Con / junto con",
                                                "Querer / desear"
                                            ],
                                            "answer": 0,
                                            "explanation": "Suka significa Gustar."
                                        },
                                        {
                                            "vocabId": "v290",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Querer / desear",
                                            "answer": "Ingin",
                                            "explanation": "Ingin significa Querer / desear."
                                        },
                                        {
                                            "vocabId": "v291",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Poder / tener permiso",
                                            "answer": "Boleh",
                                            "explanation": "Boleh significa Poder / tener permiso."
                                        },
                                        {
                                            "vocabId": "v292",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Sangat",
                                            "answer": "Sangat",
                                            "explanation": "Sangat significa Muy."
                                        },
                                        {
                                            "vocabId": "v293",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Sedikit».",
                                            "hint": "Puedes tomar como referencia: Saya mau sedikit teh.",
                                            "modelAnswer": "Saya mau sedikit teh.",
                                            "explanation": "Saya mau sedikit teh. significa «Quiero un poco de té.»."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 5: Recuperación espaciada",
                                    "objective": "Recupera todas las palabras de la unidad y aplícalas en distintos formatos sin consultar la lista.",
                                    "grammar": "Recupera el vocabulario completo mediante reconocimiento, traducción, ordenación, escucha y escritura. Reutiliza las expresiones y ejemplos de la unidad.",
                                    "vocabIds": [],
                                    "reviewVocabIds": [
                                        "v288",
                                        "v289",
                                        "v290",
                                        "v291",
                                        "v292",
                                        "v293",
                                        "v294",
                                        "v295"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "v288",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Bisa»?",
                                            "options": [
                                                "Poder / saber hacer",
                                                "Querer / desear",
                                                "Muy"
                                            ],
                                            "answer": 0,
                                            "explanation": "Bisa significa Poder / saber hacer."
                                        },
                                        {
                                            "vocabId": "v289",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Gustar",
                                            "answer": "Suka",
                                            "explanation": "Suka significa Gustar."
                                        },
                                        {
                                            "vocabId": "v290",
                                            "type": "order",
                                            "prompt": "Ordena: Quiero café.",
                                            "words": [
                                                "kopi",
                                                "ingin",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "ingin",
                                                "kopi"
                                            ],
                                            "explanation": "Saya ingin kopi. significa «Quiero café.»."
                                        },
                                        {
                                            "vocabId": "v291",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la palabra o expresión.",
                                            "audioText": "Boleh",
                                            "answer": "Boleh",
                                            "explanation": "Boleh significa Poder / tener permiso."
                                        },
                                        {
                                            "vocabId": "v292",
                                            "type": "write",
                                            "prompt": "Escribe una frase con «Sangat».",
                                            "hint": "Puedes tomar como referencia: Saya sangat suka teh.",
                                            "modelAnswer": "Saya sangat suka teh.",
                                            "explanation": "Saya sangat suka teh. significa «Me gusta mucho el té.»."
                                        },
                                        {
                                            "vocabId": "v293",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «Sedikit»?",
                                            "options": [
                                                "Un poco",
                                                "Con / junto con",
                                                "Gustar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Sedikit significa Un poco."
                                        },
                                        {
                                            "vocabId": "v294",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Contento / alegrarse",
                                            "answer": "Senang",
                                            "explanation": "Senang significa Contento / alegrarse."
                                        },
                                        {
                                            "vocabId": "v295",
                                            "type": "order",
                                            "prompt": "Ordena: Estudio con mamá.",
                                            "words": [
                                                "ibu",
                                                "bersama",
                                                "belajar",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "belajar",
                                                "bersama",
                                                "ibu"
                                            ],
                                            "explanation": "Saya belajar bersama ibu. significa «Estudio con mamá.»."
                                        }
                                    ]
                                }
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
                            ],
lessons:[
{title:"Lección 1: Primeras expresiones y preguntas",objective:"Comprende y utiliza Ada, Punya en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v296","v297"],reviewVocabIds:[],exercises:[{
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
{ vocabId: 'v296', type: 'mc', prompt: 'Escucha la pregunta y elige qué quiere saber', audioText: 'Ada bus di sini?', options: ["¿Hay un autobús aquí?","Dónde está el hotel","Quién tiene el libro"], answer: 0, explanation: 'Ada pregunta por la existencia o presencia de algo.' }]},
{title:"Lección 2: Ampliar el vocabulario en contexto",objective:"Comprende y utiliza Apa, Siapa en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v298","v11"],reviewVocabIds:["v296","v297"],exercises:[{vocabId:"v296",type:'mc',prompt:"Recupera el significado de «Ada» antes de continuar.",options:["Haber / existir / estar presente","Tener / poseer","Qué"],answer:0,explanation:"Ada significa «Haber / existir / estar presente»."},
{vocabId:"v297",type:'mc',prompt:"Recupera el significado de «Punya» antes de continuar.",options:["Tener / poseer","Haber / existir / estar presente","Qué"],answer:0,explanation:"Punya significa «Tener / poseer»."},
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
{vocabId:"v298",type:'mc',prompt:"Recuerda el significado de «Apa».",options:["Qué","Haber / existir / estar presente","Tener / poseer"],answer:0,explanation:"Apa significa «Qué»."}]},
{title:"Lección 3: Combinar y recuperar lo aprendido",objective:"Comprende y utiliza Kapan, Kenapa en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v300","v301"],reviewVocabIds:["v296","v297","v298","v11"],exercises:[{vocabId:"v296",type:'mc',prompt:"Recupera el significado de «Ada» antes de continuar.",options:["Haber / existir / estar presente","Tener / poseer","Qué"],answer:0,explanation:"Ada significa «Haber / existir / estar presente»."},
{vocabId:"v297",type:'mc',prompt:"Recupera el significado de «Punya» antes de continuar.",options:["Tener / poseer","Haber / existir / estar presente","Qué"],answer:0,explanation:"Punya significa «Tener / poseer»."},
{vocabId:"v298",type:'mc',prompt:"Recupera el significado de «Apa» antes de continuar.",options:["Qué","Haber / existir / estar presente","Tener / poseer"],answer:0,explanation:"Apa significa «Qué»."},
{vocabId:"v11",type:'mc',prompt:"Recupera el significado de «Siapa» antes de continuar.",options:["Quién","Haber / existir / estar presente","Tener / poseer"],answer:0,explanation:"Siapa significa «Quién»."},
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
                                    "vocabId": "v300",
                                    "type": "translate_es_id",
                                    "prompt": "Traduce al indonesio: Cuándo",
                                    "answer": "Kapan",
                                    "explanation": "Kapan significa «Cuándo»."
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
                                }]},
{title:"Lección 4: Usar el vocabulario en situaciones breves",objective:"Comprende y utiliza Bagaimana, Tidak ada en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v302","v303"],reviewVocabIds:["v296","v297","v298","v11","v300","v301"],exercises:[{vocabId:"v296",type:'mc',prompt:"Recupera el significado de «Ada» antes de continuar.",options:["Haber / existir / estar presente","Tener / poseer","Qué"],answer:0,explanation:"Ada significa «Haber / existir / estar presente»."},
{vocabId:"v297",type:'mc',prompt:"Recupera el significado de «Punya» antes de continuar.",options:["Tener / poseer","Haber / existir / estar presente","Qué"],answer:0,explanation:"Punya significa «Tener / poseer»."},
{vocabId:"v298",type:'mc',prompt:"Recupera el significado de «Apa» antes de continuar.",options:["Qué","Haber / existir / estar presente","Tener / poseer"],answer:0,explanation:"Apa significa «Qué»."},
{vocabId:"v11",type:'mc',prompt:"Recupera el significado de «Siapa» antes de continuar.",options:["Quién","Haber / existir / estar presente","Tener / poseer"],answer:0,explanation:"Siapa significa «Quién»."},
{vocabId:"v300",type:'mc',prompt:"Recupera el significado de «Kapan» antes de continuar.",options:["Cuándo","Haber / existir / estar presente","Tener / poseer"],answer:0,explanation:"Kapan significa «Cuándo»."},
{vocabId:"v301",type:'mc',prompt:"Recupera el significado de «Kenapa» antes de continuar.",options:["Por qué","Haber / existir / estar presente","Tener / poseer"],answer:0,explanation:"Kenapa significa «Por qué»."},
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
{vocabId:"v302",type:'mc',prompt:"Recuerda el significado de «Bagaimana».",options:["Cómo","Haber / existir / estar presente","Tener / poseer"],answer:0,explanation:"Bagaimana significa «Cómo»."}]},
{title:'Lección 5: Recuperación espaciada de toda la unidad',objective:'Recupera y combina todas las palabras y expresiones de la unidad sin introducir vocabulario nuevo.',grammar:'Repasa el contenido completo de la unidad con reconocimiento, traducción, escucha, orden y producción escrita.',vocabIds:[],reviewVocabIds:["v296","v297","v298","v11","v300","v301","v302","v303"],exercises:[{vocabId:"v296",type:'mc',prompt:"Recuperación final: elige el significado de «Ada».",options:["Haber / existir / estar presente","Tener / poseer","Qué"],answer:0,explanation:"Ada significa «Haber / existir / estar presente»."},
{vocabId:"v297",type:'translate_es_id',prompt:"Recuperación final: traduce al indonesio «Tener / poseer».",answer:"Punya",explanation:"Punya significa «Tener / poseer»."},
{vocabId:"v298",type:'listen',prompt:'Recuperación final: escucha y escribe la palabra o expresión.',answer:"Apa",explanation:"La expresión es Apa."},
{vocabId:"v11",type:'order',prompt:"Recuperación final: ordena el ejemplo de «Siapa».",words:["kamu","nama","Siapa"],correctOrder:["Siapa","nama","kamu"],explanation:"Ejemplo: Siapa nama kamu?"},
{vocabId:"v300",type:'write',prompt:"Recuperación final: escribe una frase con «Kapan».",hint:'Usa el ejemplo de la unidad como modelo.',modelAnswer:"Kapan kamu datang?",explanation:"Ejemplo: Kapan kamu datang?"},
{vocabId:"v301",type:'mc',prompt:"Recuperación final: elige el significado de «Kenapa».",options:["Por qué","Haber / existir / estar presente","Tener / poseer"],answer:0,explanation:"Kenapa significa «Por qué»."},
{vocabId:"v302",type:'translate_es_id',prompt:"Recuperación final: traduce al indonesio «Cómo».",answer:"Bagaimana",explanation:"Bagaimana significa «Cómo»."},
{vocabId:"v303",type:'listen',prompt:'Recuperación final: escucha y escribe la palabra o expresión.',answer:"Tidak ada",explanation:"La expresión es Tidak ada."}]}
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
                            ,
                                            {
                                                "vocabId": "v348",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «mana»?",
                                                "options": [
                                                    "Dónde / cuál (según contexto)",
                                                    "Cuándo",
                                                    "Quién"
                                                ],
                                                "answer": 0,
                                                "explanation": "Mana puede preguntar dónde o cuál, según el contexto."
                                            }
],
lessons:[
{title:"Lección 1: Primeras expresiones y preguntas",objective:"Comprende y utiliza Ini, Itu, Sini en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v51","v311","v312"],reviewVocabIds:[],exercises:[{ vocabId: 'v51', type: 'mc', prompt: '¿Qué significa «ini»?', options: ['Este / esto', 'Allá', 'Ellos'], answer: 0, explanation: 'Ini señala algo cercano: buku ini, este libro.' },
{ vocabId: 'v311', type: 'translate_es_id', prompt: 'Traduce: aquella casa', answer: 'Rumah itu', explanation: 'Itu suele colocarse después del sustantivo.' },
{ vocabId: 'v312', type: 'order', prompt: 'Ordena: Estoy aquí.', words: ['sini', 'Saya', 'di'], correctOrder: ['Saya', 'di', 'sini'], explanation: 'Saya di sini significa «Estoy aquí».' },
{ vocabId: 'v51', type: 'translate_es_id', prompt: 'Traduce: este libro', answer: 'Buku ini', explanation: 'El demostrativo aparece después del sustantivo.' }]},
{title:"Lección 2: Ampliar el vocabulario en contexto",objective:"Comprende y utiliza Situ, Sana, Kami en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v313","v314","v315"],reviewVocabIds:["v51","v311","v312"],exercises:[{vocabId:"v51",type:'mc',prompt:"Recupera el significado de «Ini» antes de continuar.",options:["Este / esta / esto","Ese / esa / aquel / aquello","Aquí / acá"],answer:0,explanation:"Ini significa «Este / esta / esto»."},
{vocabId:"v311",type:'mc',prompt:"Recupera el significado de «Itu» antes de continuar.",options:["Ese / esa / aquel / aquello","Este / esta / esto","Aquí / acá"],answer:0,explanation:"Itu significa «Ese / esa / aquel / aquello»."},
{vocabId:"v312",type:'mc',prompt:"Recupera el significado de «Sini» antes de continuar.",options:["Aquí / acá","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Sini significa «Aquí / acá»."},
{ vocabId: 'v313', type: 'mc', prompt: 'Escucha la frase y elige su significado', audioText: 'Kamu di situ', options: ['Estoy aquí', 'Estás ahí', 'Estamos allá'], answer: 1, explanation: 'Kamu di situ significa «Estás ahí».' },
{ vocabId: 'v314', type: 'mc', prompt: '¿Cuál expresa «allá»?', options: ['Sini', 'Sana', 'Ini'], answer: 1, explanation: 'Sana indica un lugar más alejado: allá.' },
{ vocabId: 'v314', type: 'listen', prompt: 'Escucha y escribe la palabra que significa «allá».', answer: 'Sana', explanation: 'Sana indica un lugar más alejado: allá.' },
{ vocabId: 'v315', type: 'translate_es_id', prompt: 'Traduce: nosotros (sin incluirte)', answer: 'Kami', explanation: 'Kami excluye a la persona que escucha.' }]},
{title:"Lección 3: Combinar y recuperar lo aprendido",objective:"Comprende y utiliza Kita, Mereka, Anda en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v316","v317","v318"],reviewVocabIds:["v51","v311","v312","v313","v314","v315"],exercises:[{vocabId:"v51",type:'mc',prompt:"Recupera el significado de «Ini» antes de continuar.",options:["Este / esta / esto","Ese / esa / aquel / aquello","Aquí / acá"],answer:0,explanation:"Ini significa «Este / esta / esto»."},
{vocabId:"v311",type:'mc',prompt:"Recupera el significado de «Itu» antes de continuar.",options:["Ese / esa / aquel / aquello","Este / esta / esto","Aquí / acá"],answer:0,explanation:"Itu significa «Ese / esa / aquel / aquello»."},
{vocabId:"v312",type:'mc',prompt:"Recupera el significado de «Sini» antes de continuar.",options:["Aquí / acá","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Sini significa «Aquí / acá»."},
{vocabId:"v313",type:'mc',prompt:"Recupera el significado de «Situ» antes de continuar.",options:["Ahí","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Situ significa «Ahí»."},
{vocabId:"v314",type:'mc',prompt:"Recupera el significado de «Sana» antes de continuar.",options:["Allá","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Sana significa «Allá»."},
{vocabId:"v315",type:'mc',prompt:"Recupera el significado de «Kami» antes de continuar.",options:["Nosotros/as (sin incluir al oyente)","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Kami significa «Nosotros/as (sin incluir al oyente)»."},
{ vocabId: 'v316', type: 'mc', prompt: '¿Qué pronombre incluye a quien escucha?', options: ['Kami', 'Mereka', 'Kita'], answer: 2, explanation: 'Kita incluye al oyente; kami no.' },
{ vocabId: 'v317', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Mereka', explanation: 'Mereka significa «ellos/ellas».' },
{ vocabId: 'v318', type: 'translate_es_id', prompt: 'Traduce: usted (formal)', answer: 'Anda', explanation: 'Anda es un pronombre de trato formal y puede equivaler a usted o ustedes según el contexto. La elección también depende de la relación entre hablantes y de la situación.' },
{ vocabId: 'v317', type: 'order', prompt: 'Ordena: Ellos están aquí.', words: ['sini', 'Mereka', 'di'], correctOrder: ['Mereka', 'di', 'sini'], explanation: 'Mereka di sini significa «Ellos están aquí».' },
{ vocabId: 'v316', type: 'write', prompt: 'Escribe una frase que incluya a la persona que escucha y diga dónde están.', hint: 'Usa Kita di sini.', modelAnswer: 'Kita di sini.', explanation: 'Kita incluye a quien escucha; Kita di sini significa «Estamos aquí».' }]},
{title:"Lección 4: Usar el vocabulario en situaciones breves",objective:"Comprende y utiliza Mana, Milik, -nya en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v348","v319","v320"],reviewVocabIds:["v51","v311","v312","v313","v314","v315","v316","v317","v318"],exercises:[{vocabId:"v51",type:'mc',prompt:"Recupera el significado de «Ini» antes de continuar.",options:["Este / esta / esto","Ese / esa / aquel / aquello","Aquí / acá"],answer:0,explanation:"Ini significa «Este / esta / esto»."},
{vocabId:"v311",type:'mc',prompt:"Recupera el significado de «Itu» antes de continuar.",options:["Ese / esa / aquel / aquello","Este / esta / esto","Aquí / acá"],answer:0,explanation:"Itu significa «Ese / esa / aquel / aquello»."},
{vocabId:"v312",type:'mc',prompt:"Recupera el significado de «Sini» antes de continuar.",options:["Aquí / acá","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Sini significa «Aquí / acá»."},
{vocabId:"v313",type:'mc',prompt:"Recupera el significado de «Situ» antes de continuar.",options:["Ahí","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Situ significa «Ahí»."},
{vocabId:"v314",type:'mc',prompt:"Recupera el significado de «Sana» antes de continuar.",options:["Allá","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Sana significa «Allá»."},
{vocabId:"v315",type:'mc',prompt:"Recupera el significado de «Kami» antes de continuar.",options:["Nosotros/as (sin incluir al oyente)","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Kami significa «Nosotros/as (sin incluir al oyente)»."},
{vocabId:"v316",type:'mc',prompt:"Recupera el significado de «Kita» antes de continuar.",options:["Nosotros/as (incluyendo al oyente)","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Kita significa «Nosotros/as (incluyendo al oyente)»."},
{vocabId:"v317",type:'mc',prompt:"Recupera el significado de «Mereka» antes de continuar.",options:["Ellos / ellas","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Mereka significa «Ellos / ellas»."},
{vocabId:"v318",type:'mc',prompt:"Recupera el significado de «Anda» antes de continuar.",options:["Usted / ustedes (formal)","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Anda significa «Usted / ustedes (formal)»."},
{ vocabId: 'v319', type: 'order', prompt: 'Ordena: Esto es mío.', words: ['saya', 'Ini', 'milik'], correctOrder: ['Ini', 'milik', 'saya'], explanation: 'Ini milik saya significa «Esto es mío».' },
{ vocabId: 'v320', type: 'mc', prompt: 'En «Namanya Ana», ¿qué expresa -nya?', options: ['Su nombre (según contexto)', 'Allá', 'Nosotros'], answer: 0, explanation: 'El sufijo -nya puede indicar posesión o referencia; no tiene una sola traducción fija.' },
{ vocabId: 'v319', type: 'write', prompt: 'Escribe una frase que indique de quién es algo.', hint: 'Usa Ini milik saya como modelo.', modelAnswer: 'Ini milik saya.', explanation: 'Milik expresa pertenencia; la frase es un modelo que puedes adaptar.' },
{
                                                "vocabId": "v348",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «mana»?",
                                                "options": [
                                                    "Dónde / cuál (según contexto)",
                                                    "Cuándo",
                                                    "Quién"
                                                ],
                                                "answer": 0,
                                                "explanation": "Mana puede preguntar dónde o cuál, según el contexto."
                                            }]},
{title:'Lección 5: Recuperación espaciada de toda la unidad',objective:'Recupera y combina todas las palabras y expresiones de la unidad sin introducir vocabulario nuevo.',grammar:'Repasa el contenido completo de la unidad con reconocimiento, traducción, escucha, orden y producción escrita.',vocabIds:[],reviewVocabIds:["v51","v311","v312","v313","v314","v315","v316","v317","v318","v348","v319","v320"],exercises:[{vocabId:"v51",type:'mc',prompt:"Recuperación final: elige el significado de «Ini».",options:["Este / esta / esto","Ese / esa / aquel / aquello","Aquí / acá"],answer:0,explanation:"Ini significa «Este / esta / esto»."},
{vocabId:"v311",type:'translate_es_id',prompt:"Recuperación final: traduce al indonesio «Ese / esa / aquel / aquello».",answer:"Itu",explanation:"Itu significa «Ese / esa / aquel / aquello»."},
{vocabId:"v312",type:'listen',prompt:'Recuperación final: escucha y escribe la palabra o expresión.',answer:"Sini",explanation:"La expresión es Sini."},
{vocabId:"v313",type:'order',prompt:"Recuperación final: ordena el ejemplo de «Situ».",words:["situ","di","Kamu"],correctOrder:["Kamu","di","situ"],explanation:"Ejemplo: Kamu di situ."},
{vocabId:"v314",type:'write',prompt:"Recuperación final: escribe una frase con «Sana».",hint:'Usa el ejemplo de la unidad como modelo.',modelAnswer:"Dia di sana.",explanation:"Ejemplo: Dia di sana."},
{vocabId:"v315",type:'mc',prompt:"Recuperación final: elige el significado de «Kami».",options:["Nosotros/as (sin incluir al oyente)","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Kami significa «Nosotros/as (sin incluir al oyente)»."},
{vocabId:"v316",type:'translate_es_id',prompt:"Recuperación final: traduce al indonesio «Nosotros/as (incluyendo al oyente)».",answer:"Kita",explanation:"Kita significa «Nosotros/as (incluyendo al oyente)»."},
{vocabId:"v317",type:'listen',prompt:'Recuperación final: escucha y escribe la palabra o expresión.',answer:"Mereka",explanation:"La expresión es Mereka."},
{vocabId:"v318",type:'order',prompt:"Recuperación final: ordena el ejemplo de «Anda».",words:["sini","di","Anda"],correctOrder:["Anda","di","sini"],explanation:"Ejemplo: Anda di sini."},
{vocabId:"v348",type:'write',prompt:"Recuperación final: escribe una frase con «Mana».",hint:'Usa el ejemplo de la unidad como modelo.',modelAnswer:"Anda dari mana?",explanation:"Ejemplo: Anda dari mana?"},
{vocabId:"v319",type:'mc',prompt:"Recuperación final: elige el significado de «Milik».",options:["Pertenencia / propiedad de","Este / esta / esto","Ese / esa / aquel / aquello"],answer:0,explanation:"Milik significa «Pertenencia / propiedad de»."},
{vocabId:"v320",type:'translate_es_id',prompt:"Recuperación final: traduce al indonesio «Su / de él, ella o ello (según contexto)».",answer:"-nya",explanation:"-nya significa «Su / de él, ella o ello (según contexto)»."}]}
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
                            ,
                                            {
                                                "vocabId": "v333",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «tanpa»?",
                                                "options": [
                                                    "Con",
                                                    "Sin",
                                                    "Antes"
                                                ],
                                                "answer": 1,
                                                "explanation": "Tanpa significa sin."
                                            }
],
lessons:[
{title:"Lección 1: Primeras expresiones y preguntas",objective:"Comprende y utiliza Restoran, Menu, Pesan, Nasi goreng en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v321","v322","v323","v324"],reviewVocabIds:[],exercises:[{ vocabId: 'v321', type: 'mc', prompt: '¿Qué significa «restoran»?', options: ['Restaurante', 'Mercado', 'Cuenta'], answer: 0, explanation: 'Restoran significa restaurante.' },
{ vocabId: 'v322', type: 'translate_es_id', prompt: 'Traduce: menú / carta', answer: 'Menu', explanation: 'Menu se usa para la carta del restaurante.' },
{ vocabId: 'v323', type: 'order', prompt: 'Ordena: Pido arroz frito.', words: ['goreng', 'Saya', 'pesan', 'nasi'], correctOrder: ['Saya', 'pesan', 'nasi', 'goreng'], explanation: 'Saya pesan nasi goreng significa «Pido arroz frito».' },
{ vocabId: 'v324', type: 'listen', prompt: 'Escucha y escribe el plato.', answer: 'Nasi goreng', explanation: 'Nasi goreng significa arroz frito.' },
{ vocabId: 'v324', type: 'write', prompt: 'Escribe un pedido sencillo en un restaurante.', hint: 'Usa Saya mau nasi goreng o Saya pesan ayam.', modelAnswer: 'Saya pesan nasi goreng.', explanation: 'Ejemplo de pedido: Saya pesan nasi goreng. — Pido arroz frito.' }]},
{title:"Lección 2: Ampliar el vocabulario en contexto",objective:"Comprende y utiliza Mi, Sayur, Ayam en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v325","v326","v327"],reviewVocabIds:["v321","v322","v323","v324"],exercises:[{vocabId:"v321",type:'mc',prompt:"Recupera el significado de «Restoran» antes de continuar.",options:["Restaurante","Menú / carta","Pedir (comida o bebida)"],answer:0,explanation:"Restoran significa «Restaurante»."},
{vocabId:"v322",type:'mc',prompt:"Recupera el significado de «Menu» antes de continuar.",options:["Menú / carta","Restaurante","Pedir (comida o bebida)"],answer:0,explanation:"Menu significa «Menú / carta»."},
{vocabId:"v323",type:'mc',prompt:"Recupera el significado de «Pesan» antes de continuar.",options:["Pedir (comida o bebida)","Restaurante","Menú / carta"],answer:0,explanation:"Pesan significa «Pedir (comida o bebida)»."},
{vocabId:"v324",type:'mc',prompt:"Recupera el significado de «Nasi goreng» antes de continuar.",options:["Arroz frito","Restaurante","Menú / carta"],answer:0,explanation:"Nasi goreng significa «Arroz frito»."},
{ vocabId: 'v325', type: 'mc', prompt: '¿Qué significa «mi» en este contexto?', options: ['Fideos', 'Pollo', 'Huevo'], answer: 0, explanation: 'Mi significa fideos o tallarines.' },
{ vocabId: 'v326', type: 'translate_es_id', prompt: 'Traduce: verduras', answer: 'Sayur', explanation: 'Sayur significa verdura(s).' },
{ vocabId: 'v327', type: 'mc', prompt: '¿Cómo se dice «pollo»?', options: ['Ikan', 'Ayam', 'Telur'], answer: 1, explanation: 'Ayam significa pollo.' }]},
{title:"Lección 3: Combinar y recuperar lo aprendido",objective:"Comprende y utiliza Ikan, Telur, Enak, Tagihan en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v328","v329","v330","v331"],reviewVocabIds:["v321","v322","v323","v324","v325","v326","v327"],exercises:[{vocabId:"v321",type:'mc',prompt:"Recupera el significado de «Restoran» antes de continuar.",options:["Restaurante","Menú / carta","Pedir (comida o bebida)"],answer:0,explanation:"Restoran significa «Restaurante»."},
{vocabId:"v322",type:'mc',prompt:"Recupera el significado de «Menu» antes de continuar.",options:["Menú / carta","Restaurante","Pedir (comida o bebida)"],answer:0,explanation:"Menu significa «Menú / carta»."},
{vocabId:"v323",type:'mc',prompt:"Recupera el significado de «Pesan» antes de continuar.",options:["Pedir (comida o bebida)","Restaurante","Menú / carta"],answer:0,explanation:"Pesan significa «Pedir (comida o bebida)»."},
{vocabId:"v324",type:'mc',prompt:"Recupera el significado de «Nasi goreng» antes de continuar.",options:["Arroz frito","Restaurante","Menú / carta"],answer:0,explanation:"Nasi goreng significa «Arroz frito»."},
{vocabId:"v325",type:'mc',prompt:"Recupera el significado de «Mi» antes de continuar.",options:["Fideos / tallarines","Restaurante","Menú / carta"],answer:0,explanation:"Mi significa «Fideos / tallarines»."},
{vocabId:"v326",type:'mc',prompt:"Recupera el significado de «Sayur» antes de continuar.",options:["Verdura(s)","Restaurante","Menú / carta"],answer:0,explanation:"Sayur significa «Verdura(s)»."},
{vocabId:"v327",type:'mc',prompt:"Recupera el significado de «Ayam» antes de continuar.",options:["Pollo","Restaurante","Menú / carta"],answer:0,explanation:"Ayam significa «Pollo»."},
{ vocabId: 'v328', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Ikan', explanation: 'Ikan significa pescado.' },
{ vocabId: 'v329', type: 'translate_es_id', prompt: 'Traduce: huevo', answer: 'Telur', explanation: 'Telur significa huevo.' },
{ vocabId: 'v330', type: 'mc', prompt: '¿Qué significa «enak»?', options: ['Picante', 'Rico / sabroso', 'Sin'], answer: 1, explanation: 'Enak describe algo rico o sabroso.' },
{ vocabId: 'v331', type: 'order', prompt: 'Ordena: Pido la cuenta.', words: ['tagihan', 'minta', 'Saya'], correctOrder: ['Saya', 'minta', 'tagihan'], explanation: 'Saya minta tagihan significa «Pido la cuenta».' },
{ vocabId: 'v330', type: 'write', prompt: 'Escribe una frase para decir que un plato está rico.', hint: 'Puedes usar Nasi goreng ini enak.', modelAnswer: 'Nasi goreng ini enak.', explanation: 'El demostrativo ini aparece después del sustantivo.' }]},
{title:"Lección 4: Usar el vocabulario en situaciones breves",objective:"Comprende y utiliza Pedas, Tanpa, Cabai en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v332","v333","v347"],reviewVocabIds:["v321","v322","v323","v324","v325","v326","v327","v328","v329","v330","v331"],exercises:[{vocabId:"v321",type:'mc',prompt:"Recupera el significado de «Restoran» antes de continuar.",options:["Restaurante","Menú / carta","Pedir (comida o bebida)"],answer:0,explanation:"Restoran significa «Restaurante»."},
{vocabId:"v322",type:'mc',prompt:"Recupera el significado de «Menu» antes de continuar.",options:["Menú / carta","Restaurante","Pedir (comida o bebida)"],answer:0,explanation:"Menu significa «Menú / carta»."},
{vocabId:"v323",type:'mc',prompt:"Recupera el significado de «Pesan» antes de continuar.",options:["Pedir (comida o bebida)","Restaurante","Menú / carta"],answer:0,explanation:"Pesan significa «Pedir (comida o bebida)»."},
{vocabId:"v324",type:'mc',prompt:"Recupera el significado de «Nasi goreng» antes de continuar.",options:["Arroz frito","Restaurante","Menú / carta"],answer:0,explanation:"Nasi goreng significa «Arroz frito»."},
{vocabId:"v325",type:'mc',prompt:"Recupera el significado de «Mi» antes de continuar.",options:["Fideos / tallarines","Restaurante","Menú / carta"],answer:0,explanation:"Mi significa «Fideos / tallarines»."},
{vocabId:"v326",type:'mc',prompt:"Recupera el significado de «Sayur» antes de continuar.",options:["Verdura(s)","Restaurante","Menú / carta"],answer:0,explanation:"Sayur significa «Verdura(s)»."},
{vocabId:"v327",type:'mc',prompt:"Recupera el significado de «Ayam» antes de continuar.",options:["Pollo","Restaurante","Menú / carta"],answer:0,explanation:"Ayam significa «Pollo»."},
{vocabId:"v328",type:'mc',prompt:"Recupera el significado de «Ikan» antes de continuar.",options:["Pescado","Restaurante","Menú / carta"],answer:0,explanation:"Ikan significa «Pescado»."},
{vocabId:"v329",type:'mc',prompt:"Recupera el significado de «Telur» antes de continuar.",options:["Huevo","Restaurante","Menú / carta"],answer:0,explanation:"Telur significa «Huevo»."},
{vocabId:"v330",type:'mc',prompt:"Recupera el significado de «Enak» antes de continuar.",options:["Rico / sabroso","Restaurante","Menú / carta"],answer:0,explanation:"Enak significa «Rico / sabroso»."},
{vocabId:"v331",type:'mc',prompt:"Recupera el significado de «Tagihan» antes de continuar.",options:["Cuenta (para pagar)","Restaurante","Menú / carta"],answer:0,explanation:"Tagihan significa «Cuenta (para pagar)»."},
{ vocabId: 'v332', type: 'translate_es_id', prompt: 'Traduce: picante', answer: 'Pedas', explanation: 'Pedas significa picante.' },
{ vocabId: 'v347', type: 'mc', prompt: 'Escucha la petición y elige qué solicita', audioText: 'Tanpa cabai, ya', options: ['Sin chile, por favor', 'Con mucho chile', 'Sin arroz, por favor'], answer: 0, explanation: 'Tanpa cabai, ya es una petición breve para pedir algo sin chile.' },
{ vocabId: 'v347', type: 'mc', prompt: 'Escucha el diálogo del restaurante y elige qué pide el cliente', audioText: 'Selamat siang. Saya pesan nasi goreng. Tanpa cabai, ya? Ya, tanpa cabai.', options: ['Arroz frito sin chile', 'Sopa con mucho chile', 'Agua sin hielo'], answer: 0, explanation: 'El cliente pide nasi goreng (arroz frito) y confirma que lo quiere sin chile.' },
{
                                                "vocabId": "v333",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «tanpa»?",
                                                "options": [
                                                    "Con",
                                                    "Sin",
                                                    "Antes"
                                                ],
                                                "answer": 1,
                                                "explanation": "Tanpa significa sin."
                                            }]},
{title:'Lección 5: Recuperación espaciada de toda la unidad',objective:'Recupera y combina todas las palabras y expresiones de la unidad sin introducir vocabulario nuevo.',grammar:'Repasa el contenido completo de la unidad con reconocimiento, traducción, escucha, orden y producción escrita.',vocabIds:[],reviewVocabIds:["v321","v322","v323","v324","v325","v326","v327","v328","v329","v330","v331","v332","v333","v347"],exercises:[{vocabId:"v321",type:'mc',prompt:"Recuperación final: elige el significado de «Restoran».",options:["Restaurante","Menú / carta","Pedir (comida o bebida)"],answer:0,explanation:"Restoran significa «Restaurante»."},
{vocabId:"v322",type:'translate_es_id',prompt:"Recuperación final: traduce al indonesio «Menú / carta».",answer:"Menu",explanation:"Menu significa «Menú / carta»."},
{vocabId:"v323",type:'listen',prompt:'Recuperación final: escucha y escribe la palabra o expresión.',answer:"Pesan",explanation:"La expresión es Pesan."},
{vocabId:"v324",type:'order',prompt:"Recuperación final: ordena el ejemplo de «Nasi goreng».",words:["goreng","nasi","mau","Saya"],correctOrder:["Saya","mau","nasi","goreng"],explanation:"Ejemplo: Saya mau nasi goreng."},
{vocabId:"v325",type:'write',prompt:"Recuperación final: escribe una frase con «Mi».",hint:'Usa el ejemplo de la unidad como modelo.',modelAnswer:"Saya pesan mi.",explanation:"Ejemplo: Saya pesan mi."},
{vocabId:"v326",type:'mc',prompt:"Recuperación final: elige el significado de «Sayur».",options:["Verdura(s)","Restaurante","Menú / carta"],answer:0,explanation:"Sayur significa «Verdura(s)»."},
{vocabId:"v327",type:'translate_es_id',prompt:"Recuperación final: traduce al indonesio «Pollo».",answer:"Ayam",explanation:"Ayam significa «Pollo»."},
{vocabId:"v328",type:'listen',prompt:'Recuperación final: escucha y escribe la palabra o expresión.',answer:"Ikan",explanation:"La expresión es Ikan."},
{vocabId:"v329",type:'order',prompt:"Recuperación final: ordena el ejemplo de «Telur».",words:["telur","mau","Saya"],correctOrder:["Saya","mau","telur"],explanation:"Ejemplo: Saya mau telur."},
{vocabId:"v330",type:'write',prompt:"Recuperación final: escribe una frase con «Enak».",hint:'Usa el ejemplo de la unidad como modelo.',modelAnswer:"Nasi goreng ini enak.",explanation:"Ejemplo: Nasi goreng ini enak."},
{vocabId:"v331",type:'mc',prompt:"Recuperación final: elige el significado de «Tagihan».",options:["Cuenta (para pagar)","Restaurante","Menú / carta"],answer:0,explanation:"Tagihan significa «Cuenta (para pagar)»."},
{vocabId:"v332",type:'translate_es_id',prompt:"Recuperación final: traduce al indonesio «Picante».",answer:"Pedas",explanation:"Pedas significa «Picante»."},
{vocabId:"v333",type:'listen',prompt:'Recuperación final: escucha y escribe la palabra o expresión.',answer:"Tanpa",explanation:"La expresión es Tanpa."},
{vocabId:"v347",type:'order',prompt:"Recuperación final: ordena el ejemplo de «Cabai».",words:["ya","cabai,","Tanpa"],correctOrder:["Tanpa","cabai,","ya"],explanation:"Ejemplo: Tanpa cabai, ya."}]}
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
                            ],
lessons:[
{title:"Lección 1: Primeras expresiones y preguntas",objective:"Comprende y utiliza Pasar, Toko, Buah, Apel en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v334","v335","v336","v337"],reviewVocabIds:[],exercises:[{ vocabId: 'v334', type: 'mc', prompt: '¿Qué significa «pasar»?', options: ['Mercado', 'Tienda', 'Dinero'], answer: 0, explanation: 'Pasar significa mercado.' },
{ vocabId: 'v335', type: 'translate_es_id', prompt: 'Traduce: tienda', answer: 'Toko', explanation: 'Toko significa tienda.' },
{ vocabId: 'v336', type: 'order', prompt: 'Ordena: Compro fruta.', words: ['buah', 'beli', 'Saya'], correctOrder: ['Saya', 'beli', 'buah'], explanation: 'Saya beli buah significa «Compro fruta».' },
{ vocabId: 'v337', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Apel', explanation: 'Apel significa manzana.' }]},
{title:"Lección 2: Ampliar el vocabulario en contexto",objective:"Comprende y utiliza Pisang, Murah, Mahal en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v338","v140","v141"],reviewVocabIds:["v334","v335","v336","v337"],exercises:[{vocabId:"v334",type:'mc',prompt:"Recupera el significado de «Pasar» antes de continuar.",options:["Mercado","Tienda","Fruta"],answer:0,explanation:"Pasar significa «Mercado»."},
{vocabId:"v335",type:'mc',prompt:"Recupera el significado de «Toko» antes de continuar.",options:["Tienda","Mercado","Fruta"],answer:0,explanation:"Toko significa «Tienda»."},
{vocabId:"v336",type:'mc',prompt:"Recupera el significado de «Buah» antes de continuar.",options:["Fruta","Mercado","Tienda"],answer:0,explanation:"Buah significa «Fruta»."},
{vocabId:"v337",type:'mc',prompt:"Recupera el significado de «Apel» antes de continuar.",options:["Manzana","Mercado","Tienda"],answer:0,explanation:"Apel significa «Manzana»."},
{ vocabId: 'v338', type: 'mc', prompt: '¿Qué significa «pisang»?', options: ['Manzana', 'Plátano / banana', 'Bolsa'], answer: 1, explanation: 'Pisang significa plátano o banana.' },
{ vocabId: 'v140', type: 'translate_es_id', prompt: 'Traduce: barato/a', answer: 'Murah', explanation: 'Murah significa barato/a.' },
{ vocabId: 'v141', type: 'mc', prompt: '¿Qué significa «mahal»?', options: ['Caro/a', 'Barato/a', 'Fruta'], answer: 0, explanation: 'Mahal significa caro/a.' },
{ vocabId: 'v140', type: 'write', prompt: 'Escribe una frase para describir un precio.', hint: 'Usa Ini murah o Itu mahal.', modelAnswer: 'Ini murah.', explanation: 'Ini murah significa «Esto es barato».' }]},
{title:"Lección 3: Combinar y recuperar lo aprendido",objective:"Comprende y utiliza Beli, Uang, Kilo en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v142","v136","v343"],reviewVocabIds:["v334","v335","v336","v337","v338","v140","v141"],exercises:[{vocabId:"v334",type:'mc',prompt:"Recupera el significado de «Pasar» antes de continuar.",options:["Mercado","Tienda","Fruta"],answer:0,explanation:"Pasar significa «Mercado»."},
{vocabId:"v335",type:'mc',prompt:"Recupera el significado de «Toko» antes de continuar.",options:["Tienda","Mercado","Fruta"],answer:0,explanation:"Toko significa «Tienda»."},
{vocabId:"v336",type:'mc',prompt:"Recupera el significado de «Buah» antes de continuar.",options:["Fruta","Mercado","Tienda"],answer:0,explanation:"Buah significa «Fruta»."},
{vocabId:"v337",type:'mc',prompt:"Recupera el significado de «Apel» antes de continuar.",options:["Manzana","Mercado","Tienda"],answer:0,explanation:"Apel significa «Manzana»."},
{vocabId:"v338",type:'mc',prompt:"Recupera el significado de «Pisang» antes de continuar.",options:["Plátano / banana","Mercado","Tienda"],answer:0,explanation:"Pisang significa «Plátano / banana»."},
{vocabId:"v140",type:'mc',prompt:"Recupera el significado de «Murah» antes de continuar.",options:["Barato/a","Mercado","Tienda"],answer:0,explanation:"Murah significa «Barato/a»."},
{vocabId:"v141",type:'mc',prompt:"Recupera el significado de «Mahal» antes de continuar.",options:["Caro/a","Mercado","Tienda"],answer:0,explanation:"Mahal significa «Caro/a»."},
{ vocabId: 'v142', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Beli', explanation: 'Beli significa comprar.' },
{ vocabId: 'v136', type: 'translate_es_id', prompt: 'Traduce: dinero', answer: 'Uang', explanation: 'Uang significa dinero.' },
{ vocabId: 'v343', type: 'mc', prompt: '¿Qué significa «kilo»?', options: ['Kilo', 'Bolsa', 'Mercado'], answer: 0, explanation: 'Kilo significa kilo.' },
{ vocabId: 'v142', type: 'write', prompt: 'Escribe una frase sobre algo que quieres comprar.', hint: 'Usa Saya mau beli apel o Saya mau beli pisang.', modelAnswer: 'Saya mau beli apel.', explanation: 'Ejemplo: Saya mau beli apel. — Quiero comprar manzanas.' }]},
{title:"Lección 4: Usar el vocabulario en situaciones breves",objective:"Comprende y utiliza Satu kilo, Kantong, Berbelanja en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v344","v345","v346"],reviewVocabIds:["v334","v335","v336","v337","v338","v140","v141","v142","v136","v343"],exercises:[{vocabId:"v334",type:'mc',prompt:"Recupera el significado de «Pasar» antes de continuar.",options:["Mercado","Tienda","Fruta"],answer:0,explanation:"Pasar significa «Mercado»."},
{vocabId:"v335",type:'mc',prompt:"Recupera el significado de «Toko» antes de continuar.",options:["Tienda","Mercado","Fruta"],answer:0,explanation:"Toko significa «Tienda»."},
{vocabId:"v336",type:'mc',prompt:"Recupera el significado de «Buah» antes de continuar.",options:["Fruta","Mercado","Tienda"],answer:0,explanation:"Buah significa «Fruta»."},
{vocabId:"v337",type:'mc',prompt:"Recupera el significado de «Apel» antes de continuar.",options:["Manzana","Mercado","Tienda"],answer:0,explanation:"Apel significa «Manzana»."},
{vocabId:"v338",type:'mc',prompt:"Recupera el significado de «Pisang» antes de continuar.",options:["Plátano / banana","Mercado","Tienda"],answer:0,explanation:"Pisang significa «Plátano / banana»."},
{vocabId:"v140",type:'mc',prompt:"Recupera el significado de «Murah» antes de continuar.",options:["Barato/a","Mercado","Tienda"],answer:0,explanation:"Murah significa «Barato/a»."},
{vocabId:"v141",type:'mc',prompt:"Recupera el significado de «Mahal» antes de continuar.",options:["Caro/a","Mercado","Tienda"],answer:0,explanation:"Mahal significa «Caro/a»."},
{vocabId:"v142",type:'mc',prompt:"Recupera el significado de «Beli» antes de continuar.",options:["Comprar","Mercado","Tienda"],answer:0,explanation:"Beli significa «Comprar»."},
{vocabId:"v136",type:'mc',prompt:"Recupera el significado de «Uang» antes de continuar.",options:["Dinero","Mercado","Tienda"],answer:0,explanation:"Uang significa «Dinero»."},
{vocabId:"v343",type:'mc',prompt:"Recupera el significado de «Kilo» antes de continuar.",options:["Kilo","Mercado","Tienda"],answer:0,explanation:"Kilo significa «Kilo»."},
{ vocabId: 'v344', type: 'order', prompt: 'Ordena: Quiero un kilo de manzanas.', words: ['apel', 'mau', 'Saya', 'satu', 'kilo'], correctOrder: ['Saya', 'mau', 'satu', 'kilo', 'apel'], explanation: 'Saya mau satu kilo apel significa «Quiero un kilo de manzanas».' },
{ vocabId: 'v345', type: 'translate_es_id', prompt: 'Traduce: bolsa', answer: 'Kantong', explanation: 'Kantong significa bolsa.' },
{ vocabId: 'v346', type: 'mc', prompt: '¿Qué significa «berbelanja»?', options: ['Hacer compras', 'Comer', 'Dormir'], answer: 0, explanation: 'Berbelanja significa hacer compras.' }]},
{title:'Lección 5: Recuperación espaciada de toda la unidad',objective:'Recupera y combina todas las palabras y expresiones de la unidad sin introducir vocabulario nuevo.',grammar:'Repasa el contenido completo de la unidad con reconocimiento, traducción, escucha, orden y producción escrita.',vocabIds:[],reviewVocabIds:["v334","v335","v336","v337","v338","v140","v141","v142","v136","v343","v344","v345","v346"],exercises:[{vocabId:"v334",type:'mc',prompt:"Recuperación final: elige el significado de «Pasar».",options:["Mercado","Tienda","Fruta"],answer:0,explanation:"Pasar significa «Mercado»."},
{vocabId:"v335",type:'translate_es_id',prompt:"Recuperación final: traduce al indonesio «Tienda».",answer:"Toko",explanation:"Toko significa «Tienda»."},
{vocabId:"v336",type:'listen',prompt:'Recuperación final: escucha y escribe la palabra o expresión.',answer:"Buah",explanation:"La expresión es Buah."},
{vocabId:"v337",type:'order',prompt:"Recuperación final: ordena el ejemplo de «Apel».",words:["apel","mau","Saya"],correctOrder:["Saya","mau","apel"],explanation:"Ejemplo: Saya mau apel."},
{vocabId:"v338",type:'write',prompt:"Recuperación final: escribe una frase con «Pisang».",hint:'Usa el ejemplo de la unidad como modelo.',modelAnswer:"Saya beli pisang.",explanation:"Ejemplo: Saya beli pisang."},
{vocabId:"v140",type:'mc',prompt:"Recuperación final: elige el significado de «Murah».",options:["Barato/a","Mercado","Tienda"],answer:0,explanation:"Murah significa «Barato/a»."},
{vocabId:"v141",type:'translate_es_id',prompt:"Recuperación final: traduce al indonesio «Caro/a».",answer:"Mahal",explanation:"Mahal significa «Caro/a»."},
{vocabId:"v142",type:'listen',prompt:'Recuperación final: escucha y escribe la palabra o expresión.',answer:"Beli",explanation:"La expresión es Beli."},
{vocabId:"v136",type:'order',prompt:"Recuperación final: ordena el ejemplo de «Uang».",words:["uang","punya","Saya"],correctOrder:["Saya","punya","uang"],explanation:"Ejemplo: Saya punya uang."},
{vocabId:"v343",type:'write',prompt:"Recuperación final: escribe una frase con «Kilo».",hint:'Usa el ejemplo de la unidad como modelo.',modelAnswer:"Satu kilo pisang.",explanation:"Ejemplo: Satu kilo pisang."},
{vocabId:"v344",type:'mc',prompt:"Recuperación final: elige el significado de «Satu kilo».",options:["Un kilo","Mercado","Tienda"],answer:0,explanation:"Satu kilo significa «Un kilo»."},
{vocabId:"v345",type:'translate_es_id',prompt:"Recuperación final: traduce al indonesio «Bolsa».",answer:"Kantong",explanation:"Kantong significa «Bolsa»."},
{vocabId:"v346",type:'listen',prompt:'Recuperación final: escucha y escribe la palabra o expresión.',answer:"Berbelanja",explanation:"La expresión es Berbelanja."}]}
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
                            ,
                                            {
                                                "vocabId": "v351",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «kaki»?",
                                                "options": [
                                                    "Pie / pierna",
                                                    "Mano",
                                                    "Cabeza"
                                                ],
                                                "answer": 0,
                                                "explanation": "Kaki puede significar pie o pierna."
                                            },
                                            {
                                                "vocabId": "v354",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «mulut»?",
                                                "options": [
                                                    "Boca",
                                                    "Ojo",
                                                    "Nariz"
                                                ],
                                                "answer": 0,
                                                "explanation": "Mulut significa boca."
                                            }
],
                            lessons:[
{title:"Lección 1: Introducción y reconocimiento",objective:"Comprende y utiliza vocabulario de cuerpo y salud en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v349","v350"],reviewVocabIds:[],exercises:[{ vocabId: 'v349', type: 'mc', prompt: '¿Qué significa «kepala»?', options: ['Cabeza', 'Mano', 'Boca'], answer: 0, explanation: 'Kepala significa cabeza.' },{ vocabId: 'v350', type: 'translate_es_id', prompt: 'Traduce: mano / brazo', answer: 'Tangan', explanation: 'Tangan puede referirse a la mano o al brazo según el contexto.' },{vocabId:"v349",type:"mc",prompt:"Recuperación: ¿qué significa «Kepala»?",options:["Cabeza","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Kepala significa «Cabeza». "}]},
{title:"Lección 2: Ampliar el vocabulario en contexto",objective:"Comprende y utiliza vocabulario de cuerpo y salud en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v351","v352"],reviewVocabIds:["v349","v350"],exercises:[{vocabId:"v349",type:"mc",prompt:"Recuperación: ¿qué significa «Kepala»?",options:["Cabeza","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Kepala significa «Cabeza». "},{vocabId:"v350",type:"translate_es_id",prompt:"Recuperación: traduce «Mano / brazo» al indonesio.",answer:"Tangan",explanation:"Tangan significa «Mano / brazo». "},{ vocabId: 'v352', type: 'mc', prompt: '¿Qué significa «mata»?', options: ['Ojo(s)', 'Oído', 'Pie'], answer: 0, explanation: 'Mata significa ojo; en contexto puede referirse a los ojos.' }]},
{title:"Lección 3: Combinar y recuperar lo aprendido",objective:"Comprende y utiliza vocabulario de cuerpo y salud en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v353","v354"],reviewVocabIds:["v349","v350","v351","v352"],exercises:[{vocabId:"v349",type:"mc",prompt:"Recuperación: ¿qué significa «Kepala»?",options:["Cabeza","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Kepala significa «Cabeza». "},{vocabId:"v350",type:"translate_es_id",prompt:"Recuperación: traduce «Mano / brazo» al indonesio.",answer:"Tangan",explanation:"Tangan significa «Mano / brazo». "},{vocabId:"v351",type:"listen",prompt:"Recuperación: escucha y escribe la palabra o expresión.",answer:"Kaki",explanation:"La respuesta esperada es Kaki."},{vocabId:"v352",type:"order",prompt:"Recuperación: ordena el ejemplo de «Mata».",words:["Mata"],correctOrder:["Mata"],explanation:"Ejemplo de recuperación de Mata."},{ vocabId: 'v353', type: 'translate_es_id', prompt: 'Traduce: oreja / oído', answer: 'Telinga', explanation: 'Telinga significa oreja u oído.' }]},
{"title":"Lección 4: Usar el vocabulario en situaciones breves","objective":"Comprende y utiliza vocabulario de cuerpo y salud en frases breves, recuperando lo estudiado antes.","grammar":"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.","vocabIds":["v355","v356","v357","v358","v359","v360"],"reviewVocabIds":["v349","v350","v351","v352","v353","v354"],"exercises":[{"vocabId":"v349","type":"mc","prompt":"Recuperación: ¿qué significa «Kepala»?","options":["Cabeza","Otra palabra de la unidad","Una expresión diferente"],"answer":0,"explanation":"Kepala significa «Cabeza». "},{"vocabId":"v350","type":"translate_es_id","prompt":"Recuperación: traduce «Mano / brazo» al indonesio.","answer":"Tangan","explanation":"Tangan significa «Mano / brazo». "},{"vocabId":"v351","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Kaki","explanation":"La respuesta esperada es Kaki."},{"vocabId":"v352","type":"order","prompt":"Recuperación: ordena el ejemplo de «Mata».","words":["Mata"],"correctOrder":["Mata"],"explanation":"Ejemplo de recuperación de Mata."},{"vocabId":"v353","type":"write","prompt":"Recuperación: escribe una frase breve con «Telinga».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Telinga saya sakit.","explanation":"Ejemplo: Telinga saya sakit.."},{"vocabId":"v354","type":"mc","prompt":"Recuperación: ¿qué significa «Mulut»?","options":["Boca","Otra palabra de la unidad","Una expresión diferente"],"answer":0,"explanation":"Mulut significa «Boca». "},{"vocabId":"v355","type":"order","prompt":"Ordena: Me duele la cabeza.","words":["kepala","Saya","sakit"],"correctOrder":["Saya","sakit","kepala"],"explanation":"Saya sakit kepala expresa dolor de cabeza."},{"vocabId":"v356","type":"mc","prompt":"¿Quién atiende a una persona enferma?","options":["Dokter","Obat","Kaki"],"answer":0,"explanation":"Dokter significa médico/a."},{"vocabId":"v356","type":"order","prompt":"Ordena: Voy al médico.","words":["dokter","Saya","ke"],"correctOrder":["Saya","ke","dokter"],"explanation":"Saya ke dokter significa «Voy al médico»."},{"vocabId":"v355","type":"mc","prompt":"Escucha la frase y elige qué le ocurre a la persona","audioText":"Saya sakit kepala","options":["Tiene fiebre","Me duele la cabeza","Tiene tos"],"answer":1,"explanation":"Saya sakit kepala significa «Me duele la cabeza»."},{"vocabId":"v358","type":"listen","prompt":"Escucha y escribe la palabra.","answer":"Demam","explanation":"Demam significa fiebre."},{"vocabId":"v358","type":"order","prompt":"Ordena: Tengo fiebre.","words":["demam","Saya"],"correctOrder":["Saya","demam"],"explanation":"Saya demam significa «Tengo fiebre»."},{"vocabId":"v359","type":"listen","prompt":"Escucha y escribe la palabra.","answer":"Batuk","explanation":"Batuk significa tos o toser."},{"vocabId":"v358","type":"write","prompt":"Escribe una frase sencilla para decir que tienes fiebre.","hint":"Usa Saya demam.","modelAnswer":"Saya demam.","explanation":"Saya demam significa «Tengo fiebre»."},{"vocabId":"v360","type":"write","prompt":"Escribe una frase para decir que estás bien de salud.","hint":"Usa Saya sehat.","modelAnswer":"Saya sehat.","explanation":"Saya sehat significa «Estoy sano/a»."},{"vocabId":"v351","type":"mc","prompt":"¿Qué significa «kaki»?","options":["Pie / pierna","Mano","Cabeza"],"answer":0,"explanation":"Kaki puede significar pie o pierna."},{"vocabId":"v354","type":"mc","prompt":"¿Qué significa «mulut»?","options":["Boca","Ojo","Nariz"],"answer":0,"explanation":"Mulut significa boca."},{"vocabId":"v357","type":"translate_es_id","prompt":"Traduce: medicamento","answer":"Obat","explanation":"Obat significa medicamento o medicina."},{"vocabId":"v360","type":"translate_es_id","prompt":"Traduce: sano/a","answer":"Sehat","explanation":"Sehat describe un buen estado de salud."}]},{title:"Lección 4: Comunicar síntomas y pedir ayuda",objective:"Describe una molestia sencilla y comprende una interacción básica al acudir al médico.",grammar:"Combina Saya sakit + parte del cuerpo para expresar dolor. Usa Saya demam o Saya batuk para comunicar síntomas; Saya ke dokter indica que vas al médico. Ini obat identifica un medicamento, sin convertir la lección en consejo médico.",vocabIds:[],reviewVocabIds:["v349","v350","v351","v352","v353","v354","v355","v356","v357","v358","v359","v360"],exercises:[{vocabId:"v355",type:"mc",prompt:"¿Qué frase expresa que te duele la cabeza?",options:["Saya sakit kepala.","Saya sehat.","Ini obat."],answer:0,explanation:"Saya sakit kepala expresa dolor de cabeza."},{vocabId:"v358",type:"translate_es_id",prompt:"Traduce: Tengo fiebre.",answer:"Saya demam.",explanation:"Saya demam comunica que tienes fiebre."},{vocabId:"v359",type:"mc",prompt:"Si dices «Saya batuk», ¿qué síntoma comunicas?",options:["Tos","Dolor de oído","Buena salud"],answer:0,explanation:"Batuk significa tos o toser."},{vocabId:"v356",type:"order",prompt:"Ordena: Voy al médico.",words:["dokter","Saya","ke"],correctOrder:["Saya","ke","dokter"],explanation:"Saya ke dokter significa «Voy al médico»."},{vocabId:"v357",type:"translate_es_id",prompt:"Traduce: Esto es un medicamento.",answer:"Ini obat.",explanation:"Ini obat identifica un medicamento."},{vocabId:"v360",type:"write",prompt:"Escribe una frase para decir que estás bien de salud.",hint:"Usa Saya sehat.",modelAnswer:"Saya sehat.",explanation:"Saya sehat significa «Estoy sano/a»."}]},{title:"Lección 5: Recuperación espaciada de toda la unidad",objective:"Recupera y combina todo el vocabulario de la unidad sin introducir vocabulario nuevo.",grammar:"Repasa el contenido completo con reconocimiento, traducción, escucha, orden y producción escrita.",vocabIds:[],reviewVocabIds:["v349","v350","v351","v352","v353","v354","v355","v356","v357","v358","v359","v360"],exercises:[{vocabId:"v349",type:"mc",prompt:"Recuperación: ¿qué significa «Kepala»?",options:["Cabeza","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Kepala significa «Cabeza». "},{vocabId:"v350",type:"translate_es_id",prompt:"Recuperación: traduce «Mano / brazo» al indonesio.",answer:"Tangan",explanation:"Tangan significa «Mano / brazo». "},{vocabId:"v351",type:"listen",prompt:"Recuperación: escucha y escribe la palabra o expresión.",answer:"Kaki",explanation:"La respuesta esperada es Kaki."},{vocabId:"v352",type:"order",prompt:"Recuperación: ordena el ejemplo de «Mata».",words:["Mata"],correctOrder:["Mata"],explanation:"Ejemplo de recuperación de Mata."},{vocabId:"v353",type:"write",prompt:"Recuperación: escribe una frase breve con «Telinga».",hint:"Usa el ejemplo de la unidad como modelo.",modelAnswer:"Telinga saya sakit.",explanation:"Ejemplo: Telinga saya sakit.."},{vocabId:"v354",type:"mc",prompt:"Recuperación: ¿qué significa «Mulut»?",options:["Boca","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Mulut significa «Boca». "},{vocabId:"v355",type:"translate_es_id",prompt:"Recuperación: traduce «Enfermo/a; dolor (según contexto)» al indonesio.",answer:"Sakit",explanation:"Sakit significa «Enfermo/a; dolor (según contexto)». "},{vocabId:"v356",type:"listen",prompt:"Recuperación: escucha y escribe la palabra o expresión.",answer:"Dokter",explanation:"La respuesta esperada es Dokter."},{vocabId:"v357",type:"order",prompt:"Recuperación: ordena el ejemplo de «Obat».",words:["Obat"],correctOrder:["Obat"],explanation:"Ejemplo de recuperación de Obat."},{vocabId:"v358",type:"write",prompt:"Recuperación: escribe una frase breve con «Demam».",hint:"Usa el ejemplo de la unidad como modelo.",modelAnswer:"Saya demam.",explanation:"Ejemplo: Saya demam.."},{vocabId:"v359",type:"mc",prompt:"Recuperación: ¿qué significa «Batuk»?",options:["Tos / toser","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Batuk significa «Tos / toser». "},{vocabId:"v360",type:"translate_es_id",prompt:"Recuperación: traduce «Sano/a; estar bien de salud» al indonesio.",answer:"Sehat",explanation:"Sehat significa «Sano/a; estar bien de salud». "}]}
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
                            ],
                            lessons:[
{title:"Lección 1: Introducción y reconocimiento",objective:"Comprende y utiliza vocabulario de ropa y colores en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v361","v362"],reviewVocabIds:[],exercises:[{ vocabId: 'v361', type: 'mc', prompt: '¿Qué significa «jaket»?', options: ['Chaqueta', 'Zapatos', 'Color'], answer: 0, explanation: 'Jaket significa chaqueta; es una prenda exterior.' },{ vocabId: 'v362', type: 'translate_es_id', prompt: 'Traduce: pantalón', answer: 'Celana', explanation: 'Celana significa pantalón.' },{vocabId:"v361",type:"mc",prompt:"Recuperación: ¿qué significa «Jaket»?",options:["Chaqueta","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Jaket significa «Chaqueta». "}]},
{title:"Lección 2: Ampliar el vocabulario en contexto",objective:"Comprende y utiliza vocabulario de ropa y colores en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v363","v364"],reviewVocabIds:["v361","v362"],exercises:[{vocabId:"v361",type:"mc",prompt:"Recuperación: ¿qué significa «Jaket»?",options:["Chaqueta","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Jaket significa «Chaqueta». "},{vocabId:"v362",type:"translate_es_id",prompt:"Recuperación: traduce «Pantalón» al indonesio.",answer:"Celana",explanation:"Celana significa «Pantalón». "},{ vocabId: 'v363', type: 'mc', prompt: '¿Qué significa «sepatu»?', options: ['Zapatos', 'Camiseta', 'Pantalón'], answer: 0, explanation: 'Sepatu significa zapatos.' },{ vocabId: 'v364', type: 'translate_es_id', prompt: 'Traduce: camiseta', answer: 'Kaus', explanation: 'Kaus es una camiseta.' },{ vocabId: 'v364', type: 'order', prompt: 'Ordena: Llevo una camiseta.', words: ['kaus', 'pakai', 'Saya'], correctOrder: ['Saya', 'pakai', 'kaus'], explanation: 'Saya pakai kaus significa «Llevo una camiseta».' },{ vocabId: 'v364', type: 'mc', prompt: 'Escucha qué ropa lleva la persona', audioText: 'Saya pakai kaus putih.', options: ["Llevo una camiseta blanca","Lleva una chaqueta roja","Lleva zapatos negros"], answer: 0, explanation: 'Kaus putih significa camiseta blanca.' }]},
{title:"Lección 3: Combinar y recuperar lo aprendido",objective:"Comprende y utiliza vocabulario de ropa y colores en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v365","v366"],reviewVocabIds:["v361","v362","v363","v364"],exercises:[{vocabId:"v361",type:"mc",prompt:"Recuperación: ¿qué significa «Jaket»?",options:["Chaqueta","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Jaket significa «Chaqueta». "},{vocabId:"v362",type:"translate_es_id",prompt:"Recuperación: traduce «Pantalón» al indonesio.",answer:"Celana",explanation:"Celana significa «Pantalón». "},{vocabId:"v363",type:"listen",prompt:"Recuperación: escucha y escribe la palabra o expresión.",answer:"Sepatu",explanation:"La respuesta esperada es Sepatu."},{vocabId:"v364",type:"order",prompt:"Recuperación: ordena el ejemplo de «Kaus».",words:["Kaus"],correctOrder:["Kaus"],explanation:"Ejemplo de recuperación de Kaus."},{ vocabId: 'v366', type: 'translate_es_id', prompt: 'Traduce: color', answer: 'Warna', explanation: 'Warna significa color.' },{ vocabId: 'v365', type: 'translate_es_id', prompt: 'Traduce: talla / tamaño', answer: 'Ukuran', explanation: 'Ukuran significa talla o tamaño.' }]},
{"title":"Lección 4: Usar el vocabulario en situaciones breves","objective":"Comprende y utiliza vocabulario de ropa y colores en frases breves, recuperando lo estudiado antes.","grammar":"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.","vocabIds":["v367","v368","v369","v370","v371","v372"],"reviewVocabIds":["v361","v362","v363","v364","v365","v366"],"exercises":[{"vocabId":"v361","type":"mc","prompt":"Recuperación: ¿qué significa «Jaket»?","options":["Chaqueta","Otra palabra de la unidad","Una expresión diferente"],"answer":0,"explanation":"Jaket significa «Chaqueta». "},{"vocabId":"v362","type":"translate_es_id","prompt":"Recuperación: traduce «Pantalón» al indonesio.","answer":"Celana","explanation":"Celana significa «Pantalón». "},{"vocabId":"v363","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Sepatu","explanation":"La respuesta esperada es Sepatu."},{"vocabId":"v364","type":"order","prompt":"Recuperación: ordena el ejemplo de «Kaus».","words":["Kaus"],"correctOrder":["Kaus"],"explanation":"Ejemplo de recuperación de Kaus."},{"vocabId":"v365","type":"write","prompt":"Recuperación: escribe una frase breve con «Ukuran».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Ukuran ini besar.","explanation":"Ejemplo: Ukuran ini besar.."},{"vocabId":"v366","type":"mc","prompt":"Recuperación: ¿qué significa «Warna»?","options":["Color","Otra palabra de la unidad","Una expresión diferente"],"answer":0,"explanation":"Warna significa «Color». "},{"vocabId":"v367","type":"order","prompt":"Ordena: chaqueta roja.","words":["merah","Jaket"],"correctOrder":["Jaket","merah"],"explanation":"En esta frase nominal, el color va después del sustantivo."},{"vocabId":"v368","type":"listen","prompt":"Escucha y escribe el color.","answer":"Biru","explanation":"Biru significa azul."},{"vocabId":"v367","type":"listen","prompt":"Escucha y escribe la frase.","answer":"Jaket merah","explanation":"Jaket merah significa «chaqueta roja»."},{"vocabId":"v369","type":"order","prompt":"Ordena: pantalón negro.","words":["hitam","Celana"],"correctOrder":["Celana","hitam"],"explanation":"Hitam (negro) aparece después de celana (pantalón)."},{"vocabId":"v370","type":"listen","prompt":"Escucha y escribe el color.","answer":"Putih","explanation":"Putih significa blanco."},{"vocabId":"v371","type":"mc","prompt":"¿Qué significa «pakai»?","options":["Llevar puesto / usar","Comprar","Dormir"],"answer":0,"explanation":"Pakai puede significar usar o llevar puesto."},{"vocabId":"v372","type":"write","prompt":"Escribe una frase para describir una prenda que queda bien.","hint":"Puedes usar Jaket ini cocok.","modelAnswer":"Jaket ini cocok.","explanation":"Cocok significa que algo queda bien o es adecuado."},{"vocabId":"v370","type":"write","prompt":"Escribe una frase con una camiseta blanca.","hint":"Usa Kaus putih.","modelAnswer":"Kaus putih.","explanation":"El color putih va después de kaus."}]},{title:"Lección 4: Elegir y describir un conjunto de ropa",objective:"Describe prendas, colores y tallas para explicar qué ropa llevas y si te queda bien.",grammar:"Coloca el color después de la prenda: jaket merah, celana hitam. Usa Saya pakai para decir qué llevas puesto y cocok para expresar que algo te queda bien o es adecuado.",vocabIds:[],reviewVocabIds:["v361","v362","v363","v364","v365","v366","v367","v368","v369","v370","v371","v372"],exercises:[{vocabId:"v371",type:"translate_es_id",prompt:"Traduce: Llevo una camiseta blanca.",answer:"Saya pakai kaus putih.",explanation:"Saya pakai presenta la prenda y putih indica el color."},{vocabId:"v367",type:"mc",prompt:"¿Qué color describe «jaket merah»?",options:["Rojo","Azul","Negro"],answer:0,explanation:"Merah significa rojo."},{vocabId:"v365",type:"translate_es_id",prompt:"Traduce: Esta talla es grande.",answer:"Ukuran ini besar.",explanation:"Ukuran significa talla o tamaño."},{vocabId:"v372",type:"mc",prompt:"¿Qué expresa «Jaket ini cocok untuk saya»?",options:["La chaqueta me queda bien.","La chaqueta es azul.","Necesito zapatos."],answer:0,explanation:"Cocok expresa que algo queda bien o es adecuado."},{vocabId:"v369",type:"order",prompt:"Ordena: Mi pantalón es negro.",words:["hitam","Celana","saya"],correctOrder:["Celana","saya","hitam"],explanation:"Celana saya hitam coloca el color después de la prenda."},{vocabId:"v363",type:"write",prompt:"Escribe una frase para describir tus zapatos.",hint:"Puedes usar Sepatu saya hitam.",modelAnswer:"Sepatu saya hitam.",explanation:"El color aparece después del sustantivo."}]},{title:"Lección 5: Recuperación espaciada de toda la unidad",objective:"Recupera y combina todo el vocabulario de la unidad sin introducir vocabulario nuevo.",grammar:"Repasa el contenido completo con reconocimiento, traducción, escucha, orden y producción escrita.",vocabIds:[],reviewVocabIds:["v361","v362","v363","v364","v365","v366","v367","v368","v369","v370","v371","v372"],exercises:[{vocabId:"v361",type:"mc",prompt:"Recuperación: ¿qué significa «Jaket»?",options:["Chaqueta","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Jaket significa «Chaqueta». "},{vocabId:"v362",type:"translate_es_id",prompt:"Recuperación: traduce «Pantalón» al indonesio.",answer:"Celana",explanation:"Celana significa «Pantalón». "},{vocabId:"v363",type:"listen",prompt:"Recuperación: escucha y escribe la palabra o expresión.",answer:"Sepatu",explanation:"La respuesta esperada es Sepatu."},{vocabId:"v364",type:"order",prompt:"Recuperación: ordena el ejemplo de «Kaus».",words:["Kaus"],correctOrder:["Kaus"],explanation:"Ejemplo de recuperación de Kaus."},{vocabId:"v365",type:"write",prompt:"Recuperación: escribe una frase breve con «Ukuran».",hint:"Usa el ejemplo de la unidad como modelo.",modelAnswer:"Ukuran ini besar.",explanation:"Ejemplo: Ukuran ini besar.."},{vocabId:"v366",type:"mc",prompt:"Recuperación: ¿qué significa «Warna»?",options:["Color","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Warna significa «Color». "},{vocabId:"v367",type:"translate_es_id",prompt:"Recuperación: traduce «Rojo/a» al indonesio.",answer:"Merah",explanation:"Merah significa «Rojo/a». "},{vocabId:"v368",type:"listen",prompt:"Recuperación: escucha y escribe la palabra o expresión.",answer:"Biru",explanation:"La respuesta esperada es Biru."},{vocabId:"v369",type:"order",prompt:"Recuperación: ordena el ejemplo de «Hitam».",words:["Hitam"],correctOrder:["Hitam"],explanation:"Ejemplo de recuperación de Hitam."},{vocabId:"v370",type:"write",prompt:"Recuperación: escribe una frase breve con «Putih».",hint:"Usa el ejemplo de la unidad como modelo.",modelAnswer:"Kaus saya putih.",explanation:"Ejemplo: Kaus saya putih.."},{vocabId:"v371",type:"mc",prompt:"Recuperación: ¿qué significa «Pakai»?",options:["Llevar puesto / usar","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Pakai significa «Llevar puesto / usar». "},{vocabId:"v372",type:"translate_es_id",prompt:"Recuperación: traduce «Quedar bien / ser adecuado» al indonesio.",answer:"Cocok",explanation:"Cocok significa «Quedar bien / ser adecuado». "}]}
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
                            ,
                                            {
                                                "vocabId": "v375",
                                                "type": "mc",
                                                "prompt": "¿Qué significa «kamar mandi»?",
                                                "options": [
                                                    "Cuarto de baño",
                                                    "Cocina",
                                                    "Dormitorio"
                                                ],
                                                "answer": 0,
                                                "explanation": "Kamar mandi significa cuarto de baño."
                                            }
],
                            lessons:[
{title:"Lección 1: Introducción y reconocimiento",objective:"Comprende y utiliza vocabulario de casa en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v373","v374"],reviewVocabIds:[],exercises:[{ vocabId: 'v373', type: 'mc', prompt: '¿Qué significa «kamar»?', options: ['Habitación', 'Cocina', 'Ventana'], answer: 0, explanation: 'Kamar significa habitación o cuarto.' },{ vocabId: 'v374', type: 'translate_es_id', prompt: 'Traduce: cocina', answer: 'Dapur', explanation: 'Dapur significa cocina.' },{ vocabId: 'v374', type: 'order', prompt: 'Ordena: Estoy en la cocina.', words: ['dapur', 'di', 'Saya'], correctOrder: ['Saya', 'di', 'dapur'], explanation: 'Saya di dapur significa «Estoy en la cocina».' },{ vocabId: 'v374', type: 'order', prompt: 'Ordena: En la cocina hay una nevera.', words: ['kulkas', 'ada', 'dapur', 'Di'], correctOrder: ['Di', 'dapur', 'ada', 'kulkas'], explanation: 'Di dapur ada kulkas significa «En la cocina hay una nevera».' },{ vocabId: 'v374', type: 'mc', prompt: 'Escucha dónde está la persona', audioText: 'Saya di dapur.', options: ["Estoy en la cocina","Está en el dormitorio","Está en la escuela"], answer: 0, explanation: 'Dapur significa cocina.' }]},
{title:"Lección 2: Ampliar el vocabulario en contexto",objective:"Comprende y utiliza vocabulario de casa en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v375","v376"],reviewVocabIds:["v373","v374"],exercises:[{vocabId:"v373",type:"mc",prompt:"Recuperación: ¿qué significa «Kamar»?",options:["Habitación / cuarto","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Kamar significa «Habitación / cuarto». "},{vocabId:"v374",type:"translate_es_id",prompt:"Recuperación: traduce «Cocina» al indonesio.",answer:"Dapur",explanation:"Dapur significa «Cocina». "},{ vocabId: 'v376', type: 'mc', prompt: '¿Qué significa «atap»?', options: ['Tejado', 'Suelo', 'Cama'], answer: 0, explanation: 'Atap significa tejado.' }]},
{title:"Lección 3: Combinar y recuperar lo aprendido",objective:"Comprende y utiliza vocabulario de casa en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v377","v378"],reviewVocabIds:["v373","v374","v375","v376"],exercises:[{vocabId:"v373",type:"mc",prompt:"Recuperación: ¿qué significa «Kamar»?",options:["Habitación / cuarto","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Kamar significa «Habitación / cuarto». "},{vocabId:"v374",type:"translate_es_id",prompt:"Recuperación: traduce «Cocina» al indonesio.",answer:"Dapur",explanation:"Dapur significa «Cocina». "},{vocabId:"v375",type:"listen",prompt:"Recuperación: escucha y escribe la palabra o expresión.",answer:"Kamar mandi",explanation:"La respuesta esperada es Kamar mandi."},{vocabId:"v376",type:"order",prompt:"Recuperación: ordena el ejemplo de «Atap».",words:["Atap"],correctOrder:["Atap"],explanation:"Ejemplo de recuperación de Atap."},{ vocabId: 'v377', type: 'translate_es_id', prompt: 'Traduce: ventana', answer: 'Jendela', explanation: 'Jendela significa ventana.' },{ vocabId: 'v378', type: 'translate_es_id', prompt: 'Traduce: suelo / piso', answer: 'Lantai', explanation: 'Lantai significa suelo o piso.' }]},
{"title":"Lección 4: Usar el vocabulario en situaciones breves","objective":"Comprende y utiliza vocabulario de casa en frases breves, recuperando lo estudiado antes.","grammar":"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.","vocabIds":["v379","v380","v381","v382","v383","v384"],"reviewVocabIds":["v373","v374","v375","v376","v377","v378"],"exercises":[{"vocabId":"v373","type":"mc","prompt":"Recuperación: ¿qué significa «Kamar»?","options":["Habitación / cuarto","Otra palabra de la unidad","Una expresión diferente"],"answer":0,"explanation":"Kamar significa «Habitación / cuarto». "},{"vocabId":"v374","type":"translate_es_id","prompt":"Recuperación: traduce «Cocina» al indonesio.","answer":"Dapur","explanation":"Dapur significa «Cocina». "},{"vocabId":"v375","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Kamar mandi","explanation":"La respuesta esperada es Kamar mandi."},{"vocabId":"v376","type":"order","prompt":"Recuperación: ordena el ejemplo de «Atap».","words":["Atap"],"correctOrder":["Atap"],"explanation":"Ejemplo de recuperación de Atap."},{"vocabId":"v377","type":"write","prompt":"Recuperación: escribe una frase breve con «Jendela».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Jendela ada di kamar.","explanation":"Ejemplo: Jendela ada di kamar.."},{"vocabId":"v378","type":"mc","prompt":"Recuperación: ¿qué significa «Lantai»?","options":["Suelo / piso","Otra palabra de la unidad","Una expresión diferente"],"answer":0,"explanation":"Lantai significa «Suelo / piso». "},{"vocabId":"v380","type":"listen","prompt":"Escucha y escribe la expresión.","answer":"Tempat tidur","explanation":"Tempat tidur significa cama."},{"vocabId":"v381","type":"listen","prompt":"Escucha y escribe la palabra.","answer":"Kulkas","explanation":"Kulkas significa nevera o refrigerador."},{"vocabId":"v382","type":"order","prompt":"Ordena: La lámpara está en la habitación.","words":["kamar","ada","Lampu","di"],"correctOrder":["Lampu","ada","di","kamar"],"explanation":"Lampu ada di kamar significa «La lámpara está en la habitación»."},{"vocabId":"v383","type":"mc","prompt":"¿Qué significa «bersih»?","options":["Limpio/a","Sucio/a","Habitación"],"answer":0,"explanation":"Bersih significa limpio/a."},{"vocabId":"v384","type":"listen","prompt":"Escucha y escribe la palabra.","answer":"Kotor","explanation":"Kotor significa sucio/a."},{"vocabId":"v379","type":"translate_es_id","prompt":"Traduce: pared","answer":"Dinding","explanation":"Dinding significa pared."},{"vocabId":"v383","type":"write","prompt":"Escribe una frase para describir una habitación limpia.","hint":"Usa Kamar saya bersih.","modelAnswer":"Kamar saya bersih.","explanation":"Kamar saya bersih significa «Mi habitación está limpia»."},{"vocabId":"v382","type":"write","prompt":"Escribe dónde está la lámpara.","hint":"Usa Lampu di kamar.","modelAnswer":"Lampu di kamar.","explanation":"Di kamar significa «en la habitación»."},{"vocabId":"v375","type":"mc","prompt":"¿Qué significa «kamar mandi»?","options":["Cuarto de baño","Cocina","Dormitorio"],"answer":0,"explanation":"Kamar mandi significa cuarto de baño."}]},{title:"Lección 4: Describir una casa por dentro",objective:"Explica dónde están algunas habitaciones y objetos y describe si un espacio está limpio o sucio.",grammar:"Usa di + lugar para indicar ubicación y ada para expresar existencia. Combina el objeto con su ubicación: Kulkas ada di dapur. Los adjetivos bersih y kotor describen el estado de un espacio u objeto.",vocabIds:[],reviewVocabIds:["v373","v374","v375","v376","v377","v378","v379","v380","v381","v382","v383","v384"],exercises:[{vocabId:"v373",type:"mc",prompt:"¿Dónde estás si dices «Saya di kamar»?",options:["En la habitación","En la cocina","En el baño"],answer:0,explanation:"Kamar significa habitación o cuarto."},{vocabId:"v381",type:"translate_es_id",prompt:"Traduce: La nevera está en la cocina.",answer:"Kulkas ada di dapur.",explanation:"Ada expresa existencia y di dapur indica ubicación."},{vocabId:"v380",type:"order",prompt:"Ordena: La cama está en la habitación.",words:["di","kamar","ada","Tempat tidur"],correctOrder:["Tempat tidur","ada","di","kamar"],explanation:"Tempat tidur ada di kamar expresa la ubicación de la cama."},{vocabId:"v383",type:"mc",prompt:"¿Qué significa «Kamar saya bersih»?",options:["Mi habitación está limpia.","Mi habitación está sucia.","La ventana está abierta."],answer:0,explanation:"Bersih significa limpio/a."},{vocabId:"v384",type:"translate_es_id",prompt:"Traduce: El suelo está sucio.",answer:"Lantai kotor.",explanation:"Kotor significa sucio/a."},{vocabId:"v377",type:"write",prompt:"Escribe una frase para decir que hay una ventana en la habitación.",hint:"Usa Jendela ada di kamar.",modelAnswer:"Jendela ada di kamar.",explanation:"Di kamar indica el lugar donde está la ventana."}]},{title:"Lección 5: Recuperación espaciada de toda la unidad",objective:"Recupera y combina todo el vocabulario de la unidad sin introducir vocabulario nuevo.",grammar:"Repasa el contenido completo con reconocimiento, traducción, escucha, orden y producción escrita.",vocabIds:[],reviewVocabIds:["v373","v374","v375","v376","v377","v378","v379","v380","v381","v382","v383","v384"],exercises:[{vocabId:"v373",type:"mc",prompt:"Recuperación: ¿qué significa «Kamar»?",options:["Habitación / cuarto","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Kamar significa «Habitación / cuarto». "},{vocabId:"v374",type:"translate_es_id",prompt:"Recuperación: traduce «Cocina» al indonesio.",answer:"Dapur",explanation:"Dapur significa «Cocina». "},{vocabId:"v375",type:"listen",prompt:"Recuperación: escucha y escribe la palabra o expresión.",answer:"Kamar mandi",explanation:"La respuesta esperada es Kamar mandi."},{vocabId:"v376",type:"order",prompt:"Recuperación: ordena el ejemplo de «Atap».",words:["Atap"],correctOrder:["Atap"],explanation:"Ejemplo de recuperación de Atap."},{vocabId:"v377",type:"write",prompt:"Recuperación: escribe una frase breve con «Jendela».",hint:"Usa el ejemplo de la unidad como modelo.",modelAnswer:"Jendela ada di kamar.",explanation:"Ejemplo: Jendela ada di kamar.."},{vocabId:"v378",type:"mc",prompt:"Recuperación: ¿qué significa «Lantai»?",options:["Suelo / piso","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Lantai significa «Suelo / piso». "},{vocabId:"v379",type:"translate_es_id",prompt:"Recuperación: traduce «Pared» al indonesio.",answer:"Dinding",explanation:"Dinding significa «Pared». "},{vocabId:"v380",type:"listen",prompt:"Recuperación: escucha y escribe la palabra o expresión.",answer:"Tempat tidur",explanation:"La respuesta esperada es Tempat tidur."},{vocabId:"v381",type:"order",prompt:"Recuperación: ordena el ejemplo de «Kulkas».",words:["Kulkas"],correctOrder:["Kulkas"],explanation:"Ejemplo de recuperación de Kulkas."},{vocabId:"v382",type:"write",prompt:"Recuperación: escribe una frase breve con «Lampu».",hint:"Usa el ejemplo de la unidad como modelo.",modelAnswer:"Lampu ada di kamar.",explanation:"Ejemplo: Lampu ada di kamar.."},{vocabId:"v383",type:"mc",prompt:"Recuperación: ¿qué significa «Bersih»?",options:["Limpio/a","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Bersih significa «Limpio/a». "},{vocabId:"v384",type:"translate_es_id",prompt:"Recuperación: traduce «Sucio/a» al indonesio.",answer:"Kotor",explanation:"Kotor significa «Sucio/a». "}]}
                        ]
                        },

                        {
                            id: 'a1_u24',
                            title: 'Unidad 24: La escuela y el estudio',
                            desc: 'Hablar de clases, materiales y actividades de estudio.',
                            grammar: 'Para hablar de actividades de estudio, usa el sujeto seguido del verbo: Saya belajar (estudio/aprendo), Saya membaca buku (leo un libro). En indonesio, el sujeto puede omitirse cuando el contexto es claro, pero aquí practicamos frases completas.',
                            lessonPlans: [{"title":"Personas y espacios de la escuela","objective":"Identifica lugares, personas y objetos habituales del entorno escolar.","grammar":"Para ubicar a una persona en un lugar, usa sujeto + di + lugar: Murid di kantin. Para señalar un objeto conocido, usa ini: Ini penghapus saya. Pensil significa lápiz y también es un material escolar básico."},{"title":"Materiales y acciones de clase","objective":"Relaciona los materiales escolares con acciones sencillas de lectura, escritura y respuesta.","grammar":"Construye frases con sujeto + verbo: Murid membaca buku y Guru menjawab. Menulis significa escribir; practica membaca (leer), menulis (escribir) y menjawab (responder). El verbo no cambia según la persona."},{"title":"Clases y tareas","objective":"Habla de tu aula y de una tarea con frases breves.","grammar":"Combina di para ubicación e ini para identificar: Saya di kelas. Ini tugas saya."}],
                            vocab: [
                                { id: 'v385', idn: 'Kantin', esp: 'Cafetería / comedor escolar', ex: 'Kantin sekolah itu besar.', exEsp: 'La cafetería de la escuela es grande.' },
                                { id: 'v386', idn: 'Guru', esp: 'Docente / profesor/a', ex: 'Guru itu ramah.', exEsp: 'Ese/a profesor/a es amable.' },
                                { id: 'v387', idn: 'Murid', esp: 'Alumno/a', ex: 'Saya murid.', exEsp: 'Soy estudiante.' },
                                { id: 'v388', idn: 'Penghapus', esp: 'Goma de borrar', ex: 'Ini penghapus saya.', exEsp: 'Esta es mi goma de borrar.' },
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
                                { vocabId: 'v388', type: 'order', prompt: 'Ordena: Esta es mi goma de borrar.', words: ['saya', 'penghapus', 'Ini'], correctOrder: ['Ini', 'penghapus', 'saya'], explanation: 'Ini penghapus saya significa «Esta es mi goma de borrar».' },
                                { vocabId: 'v389', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Pensil', explanation: 'Pensil significa lápiz.' },
                                { vocabId: 'v390', type: 'mc', prompt: '¿Qué significa «menjawab»?', options: ['Comprar', 'Escribir', 'Responder'], answer: 2, explanation: 'Menjawab significa responder.' },
                                { vocabId: 'v391', type: 'translate_es_id', prompt: 'Traduce: leer', answer: 'Membaca', explanation: 'Membaca significa leer.' },
                                { vocabId: 'v392', type: 'order', prompt: 'Ordena: Él/ella escribe.', words: ['menulis', 'Dia'], correctOrder: ['Dia', 'menulis'], explanation: 'Dia menulis significa «Él/ella escribe».' },
                                { vocabId: 'v394', type: 'write', prompt: 'Escribe una frase para decir «Esta es mi tarea».', hint: 'Usa Ini tugas saya.', modelAnswer: 'Ini tugas saya.', explanation: 'Ini tugas saya significa «Esta es mi tarea».' }
                            
                                , { vocabId: 'v391', type: 'mc', prompt: '¿Qué hace el estudiante en «Saya membaca buku»?', audioText: 'Saya membaca buku.', options: ["Leo un libro","Escribe una carta","Responde al profesor"], answer: 0, explanation: 'Membaca buku significa leer un libro.' }
                            ,
                                        {
                                            "vocabId": "v387",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «murid»?",
                                            "options": [
                                                "Alumno/a",
                                                "Docente",
                                                "Aula"
                                            ],
                                            "answer": 0,
                                            "explanation": "Murid significa alumno/a."
                                        },
                                        {
                                            "vocabId": "v393",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «kelas»?",
                                            "options": [
                                                "Clase / aula",
                                                "Tarea",
                                                "Lápiz"
                                            ],
                                            "answer": 0,
                                            "explanation": "Kelas significa clase o aula."
                                        }
],
                            lessons:[
{title:"Lección 1: Introducción y reconocimiento",objective:"Comprende y utiliza vocabulario de escuela y estudio en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v385","v386"],reviewVocabIds:[],exercises:[{ vocabId: 'v385', type: 'mc', prompt: '¿Qué significa «kantin»?', options: ['Libro', 'Cafetería', 'Lápiz'], answer: 1, explanation: 'Kantin significa cafetería o comedor.' },{ vocabId: 'v386', type: 'translate_es_id', prompt: 'Traduce: profesor/a', answer: 'Guru', explanation: 'Guru significa docente o profesor/a.' },{vocabId:"v385",type:"mc",prompt:"Recuperación: ¿qué significa «Kantin»?",options:["Cafetería / comedor escolar","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Kantin significa «Cafetería / comedor escolar». "}]},
{title:"Lección 2: Ampliar el vocabulario en contexto",objective:"Comprende y utiliza vocabulario de escuela y estudio en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v387","v388"],reviewVocabIds:["v385","v386"],exercises:[{vocabId:"v385",type:"mc",prompt:"Recuperación: ¿qué significa «Kantin»?",options:["Cafetería / comedor escolar","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Kantin significa «Cafetería / comedor escolar». "},{vocabId:"v386",type:"translate_es_id",prompt:"Recuperación: traduce «Docente / profesor/a» al indonesio.",answer:"Guru",explanation:"Guru significa «Docente / profesor/a». "},{ vocabId: 'v388', type: 'order', prompt: 'Ordena: Esta es mi goma de borrar.', words: ['saya', 'penghapus', 'Ini'], correctOrder: ['Ini', 'penghapus', 'saya'], explanation: 'Ini penghapus saya significa «Esta es mi goma de borrar».' }]},
{title:"Lección 3: Combinar y recuperar lo aprendido",objective:"Comprende y utiliza vocabulario de escuela y estudio en frases breves, recuperando lo estudiado antes.",grammar:"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.",vocabIds:["v389","v390"],reviewVocabIds:["v385","v386","v387","v388"],exercises:[{vocabId:"v385",type:"mc",prompt:"Recuperación: ¿qué significa «Kantin»?",options:["Cafetería / comedor escolar","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Kantin significa «Cafetería / comedor escolar». "},{vocabId:"v386",type:"translate_es_id",prompt:"Recuperación: traduce «Docente / profesor/a» al indonesio.",answer:"Guru",explanation:"Guru significa «Docente / profesor/a». "},{vocabId:"v387",type:"listen",prompt:"Recuperación: escucha y escribe la palabra o expresión.",answer:"Murid",explanation:"La respuesta esperada es Murid."},{vocabId:"v388",type:"order",prompt:"Recuperación: ordena el ejemplo de «Penghapus».",words:["Penghapus"],correctOrder:["Penghapus"],explanation:"Ejemplo de recuperación de Penghapus."},{ vocabId: 'v389', type: 'listen', prompt: 'Escucha y escribe la palabra.', answer: 'Pensil', explanation: 'Pensil significa lápiz.' },{ vocabId: 'v390', type: 'mc', prompt: '¿Qué significa «menjawab»?', options: ['Comprar', 'Escribir', 'Responder'], answer: 2, explanation: 'Menjawab significa responder.' }]},
{"title":"Lección 4: Usar el vocabulario en situaciones breves","objective":"Comprende y utiliza vocabulario de escuela y estudio en frases breves, recuperando lo estudiado antes.","grammar":"Practica el contenido de la unidad con ejemplos breves. Recupera las palabras de las lecciones anteriores antes de incorporar las nuevas.","vocabIds":["v391","v392","v393","v394"],"reviewVocabIds":["v385","v386","v387","v388","v389","v390"],"exercises":[{"vocabId":"v385","type":"mc","prompt":"Recuperación: ¿qué significa «Kantin»?","options":["Cafetería / comedor escolar","Otra palabra de la unidad","Una expresión diferente"],"answer":0,"explanation":"Kantin significa «Cafetería / comedor escolar». "},{"vocabId":"v386","type":"translate_es_id","prompt":"Recuperación: traduce «Docente / profesor/a» al indonesio.","answer":"Guru","explanation":"Guru significa «Docente / profesor/a». "},{"vocabId":"v387","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Murid","explanation":"La respuesta esperada es Murid."},{"vocabId":"v388","type":"order","prompt":"Recuperación: ordena el ejemplo de «Penghapus».","words":["Penghapus"],"correctOrder":["Penghapus"],"explanation":"Ejemplo de recuperación de Penghapus."},{"vocabId":"v389","type":"write","prompt":"Recuperación: escribe una frase breve con «Pensil».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Saya punya pensil.","explanation":"Ejemplo: Saya punya pensil.."},{"vocabId":"v390","type":"mc","prompt":"Recuperación: ¿qué significa «Menjawab»?","options":["Responder","Otra palabra de la unidad","Una expresión diferente"],"answer":0,"explanation":"Menjawab significa «Responder». "},{"vocabId":"v392","type":"order","prompt":"Ordena: Él/ella escribe.","words":["menulis","Dia"],"correctOrder":["Dia","menulis"],"explanation":"Dia menulis significa «Él/ella escribe»."},{"vocabId":"v391","type":"mc","prompt":"¿Qué hace el estudiante en «Saya membaca buku»?","audioText":"Saya membaca buku.","options":["Leo un libro","Escribe una carta","Responde al profesor"],"answer":0,"explanation":"Membaca buku significa leer un libro."},{"vocabId":"v391","type":"translate_es_id","prompt":"Traduce: leer","answer":"Membaca","explanation":"Membaca significa leer."},{"vocabId":"v394","type":"write","prompt":"Escribe una frase para decir «Esta es mi tarea».","hint":"Usa Ini tugas saya.","modelAnswer":"Ini tugas saya.","explanation":"Ini tugas saya significa «Esta es mi tarea»."},{"vocabId":"v387","type":"mc","prompt":"¿Qué significa «murid»?","options":["Alumno/a","Docente","Aula"],"answer":0,"explanation":"Murid significa alumno/a."},{"vocabId":"v393","type":"mc","prompt":"¿Qué significa «kelas»?","options":["Clase / aula","Tarea","Lápiz"],"answer":0,"explanation":"Kelas significa clase o aula."}]},{title:"Lección 4: Participar en una clase",objective:"Describe a las personas y los materiales del aula y explica acciones sencillas de estudio.",grammar:"Usa sujeto + verbo para describir acciones: Murid membaca buku, Guru menjawab. Para ubicarte, usa Saya di kelas. Para identificar un objeto propio, usa Ini tugas saya.",vocabIds:[],reviewVocabIds:["v385","v386","v387","v388","v389","v390","v391","v392","v393","v394"],exercises:[{vocabId:"v387",type:"mc",prompt:"¿Quién es un «murid»?",options:["Alumno/a","Profesor/a","Goma de borrar"],answer:0,explanation:"Murid significa alumno o alumna."},{vocabId:"v391",type:"translate_es_id",prompt:"Traduce: Leo un libro.",answer:"Saya membaca buku.",explanation:"Membaca significa leer."},{vocabId:"v392",type:"mc",prompt:"¿Qué significa «menulis»?",options:["Escribir","Responder","Leer"],answer:0,explanation:"Menulis significa escribir."},{vocabId:"v390",type:"order",prompt:"Ordena: El alumno responde.",words:["menjawab","Murid"],correctOrder:["Murid","menjawab"],explanation:"Murid menjawab significa «El alumno responde»."},{vocabId:"v394",type:"translate_es_id",prompt:"Traduce: Esta es mi tarea.",answer:"Ini tugas saya.",explanation:"Ini identifica algo y tugas significa tarea."},{vocabId:"v386",type:"write",prompt:"Escribe una frase para describir al profesor.",hint:"Usa Guru itu ramah.",modelAnswer:"Guru itu ramah.",explanation:"Guru significa docente o profesor/a."}]},{title:"Lección 5: Recuperación espaciada de toda la unidad",objective:"Recupera y combina todo el vocabulario de la unidad sin introducir vocabulario nuevo.",grammar:"Repasa el contenido completo con reconocimiento, traducción, escucha, orden y producción escrita.",vocabIds:[],reviewVocabIds:["v385","v386","v387","v388","v389","v390","v391","v392","v393","v394"],exercises:[{vocabId:"v385",type:"mc",prompt:"Recuperación: ¿qué significa «Kantin»?",options:["Cafetería / comedor escolar","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Kantin significa «Cafetería / comedor escolar». "},{vocabId:"v386",type:"translate_es_id",prompt:"Recuperación: traduce «Docente / profesor/a» al indonesio.",answer:"Guru",explanation:"Guru significa «Docente / profesor/a». "},{vocabId:"v387",type:"listen",prompt:"Recuperación: escucha y escribe la palabra o expresión.",answer:"Murid",explanation:"La respuesta esperada es Murid."},{vocabId:"v388",type:"order",prompt:"Recuperación: ordena el ejemplo de «Penghapus».",words:["Penghapus"],correctOrder:["Penghapus"],explanation:"Ejemplo de recuperación de Penghapus."},{vocabId:"v389",type:"write",prompt:"Recuperación: escribe una frase breve con «Pensil».",hint:"Usa el ejemplo de la unidad como modelo.",modelAnswer:"Saya punya pensil.",explanation:"Ejemplo: Saya punya pensil.."},{vocabId:"v390",type:"mc",prompt:"Recuperación: ¿qué significa «Menjawab»?",options:["Responder","Otra palabra de la unidad","Una expresión diferente"],answer:0,explanation:"Menjawab significa «Responder». "},{vocabId:"v391",type:"translate_es_id",prompt:"Recuperación: traduce «Leer» al indonesio.",answer:"Membaca",explanation:"Membaca significa «Leer». "},{vocabId:"v392",type:"listen",prompt:"Recuperación: escucha y escribe la palabra o expresión.",answer:"Menulis",explanation:"La respuesta esperada es Menulis."},{vocabId:"v393",type:"order",prompt:"Recuperación: ordena el ejemplo de «Kelas».",words:["Kelas"],correctOrder:["Kelas"],explanation:"Ejemplo de recuperación de Kelas."},{vocabId:"v394",type:"write",prompt:"Recuperación: escribe una frase breve con «Tugas».",hint:"Usa el ejemplo de la unidad como modelo.",modelAnswer:"Ini tugas saya.",explanation:"Ejemplo: Ini tugas saya.."}]}
                        ]
                        },

                        {
                            id: 'a1_u25',
                            title: 'Unidad 25: Aficiones y tiempo libre',
                            desc: 'Decir qué actividades te gustan y qué haces en tu tiempo libre.',
                            grammar: 'Usa suka antes de una actividad para expresar gusto: Saya suka membaca (me gusta leer). Para hablar de una actividad, puede aparecer un verbo después de suka. No hace falta añadir una conjugación verbal por persona.',
                            lessonPlans: [{"title":"Aficiones y actividades","objective":"Reconoce aficiones y nombra actividades que te gustan.","grammar":"Hobi significa afición; sepak bola, fútbol; melukis, pintar o dibujar; y menonton, ver o mirar. Coloca suka antes de un sustantivo o un verbo: Saya suka musik. Saya suka berenang."},{"title":"Ocio durante el fin de semana","objective":"Habla de actividades de ocio y del momento en que las realizas.","grammar":"Puedes colocar akhir pekan al principio y después decir la actividad: Akhir pekan saya bermain. Menonton se usa para hablar de ver una película o un programa. Mantén el orden sujeto + verbo cuando la actividad va primero."},{"title":"Cantar y bailar","objective":"Expresa preferencias por actividades musicales y de movimiento.","grammar":"Usa suka + verbo para expresar una preferencia: Saya suka menyanyi dan menari."}],
                            lessons: [{"title":"Aficiones y actividades","objective":"Reconoce aficiones y nombra actividades que te gustan.","grammar":"Reconoce aficiones y nombra actividades que te gustan. Hobi significa afición; sepak bola, fútbol; melukis, pintar o dibujar; y menonton, ver o mirar. Coloca suka antes de un sustantivo o un verbo: Saya suka musik. Saya suka berenang.","vocabIds":["v395","v396"],"reviewVocabIds":[],"exercises":[{"vocabId":"v395","type":"mc","prompt":"¿Qué significa «hobi»?","options":["Afición","Escuela","Precio"],"answer":0,"explanation":"Hobi significa afición o pasatiempo."},{"vocabId":"v396","type":"order","prompt":"Ordena: Me gusta la música.","words":["musik","suka","Saya"],"correctOrder":["Saya","suka","musik"],"explanation":"Saya suka musik significa «Me gusta la música»."},{"vocabId":"v395","type":"write","prompt":"Práctica: escribe una frase con «Hobi».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Apa hobi kamu?","explanation":"Ejemplo: Apa hobi kamu?"}]},{"title":"Ocio durante el fin de semana","objective":"Habla de actividades de ocio y del momento en que las realizas.","grammar":"Habla de actividades de ocio y del momento en que las realizas. Puedes colocar akhir pekan al principio y después decir la actividad: Akhir pekan saya bermain. Menonton se usa para hablar de ver una película o un programa. Mantén el orden sujeto + verbo cuando la actividad va primero.","vocabIds":["v397","v398"],"reviewVocabIds":["v395","v396"],"exercises":[{"vocabId":"v397","type":"translate_es_id","prompt":"Traduce: nadar","answer":"Berenang","explanation":"Berenang significa nadar."},{"vocabId":"v398","type":"listen","prompt":"Escucha y escribe la expresión.","answer":"Sepak bola","explanation":"Sepak bola significa fútbol."},{"vocabId":"v397","type":"mc","prompt":"¿Qué actividad le gusta en «Saya suka berenang»?","audioText":"Saya suka berenang.","options":["Me gusta nadar","Le gusta bailar","Le gusta pintar"],"answer":0,"explanation":"Suka berenang significa gustar de nadar."},{"vocabId":"v395","type":"mc","prompt":"Recuperación: ¿Qué significa «Hobi»?","options":["Afición / pasatiempo","Música","Nadar"],"answer":0,"explanation":"Hobi significa Afición / pasatiempo."},{"vocabId":"v396","type":"translate_es_id","prompt":"Recuperación: traduce «Música» al indonesio.","answer":"Musik","explanation":"Musik significa Música."}]},{"title":"Cantar y bailar","objective":"Expresa preferencias por actividades musicales y de movimiento.","grammar":"Expresa preferencias por actividades musicales y de movimiento. Usa suka + verbo para expresar una preferencia: Saya suka menyanyi dan menari.","vocabIds":["v399","v400","v401"],"reviewVocabIds":["v395","v396","v397","v398"],"exercises":[{"vocabId":"v399","type":"mc","prompt":"¿Qué significa «melukis»?","options":["Cantar","Pintar","Bailar"],"answer":1,"explanation":"Melukis significa pintar."},{"vocabId":"v400","type":"translate_es_id","prompt":"Traduce: ver una película","answer":"Menonton","explanation":"Menonton se usa para ver una película."},{"vocabId":"v401","type":"mc","prompt":"¿Qué significa «bermain»?","options":["Jugar","Nadar","Pintar"],"answer":0,"explanation":"Bermain significa jugar."},{"vocabId":"v395","type":"mc","prompt":"Recuperación: ¿Qué significa «Hobi»?","options":["Afición / pasatiempo","Música","Nadar"],"answer":0,"explanation":"Hobi significa Afición / pasatiempo."},{"vocabId":"v396","type":"translate_es_id","prompt":"Recuperación: traduce «Música» al indonesio.","answer":"Musik","explanation":"Musik significa Música."},{"vocabId":"v397","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Berenang","explanation":"La respuesta esperada es Berenang."},{"vocabId":"v398","type":"order","prompt":"Recuperación: ordena el ejemplo de «Sepak bola».","words":["bola.","sepak","suka","Dia"],"correctOrder":["Dia","suka","sepak","bola."],"explanation":"Ejemplo: Dia suka sepak bola."}]},{"title":"Aplicación guiada y producción","objective":"Integra el vocabulario de aficiones y tiempo libre para decir qué actividades te gustan y qué haces en tu tiempo libre.","grammar":"Usa suka antes de una actividad para expresar gusto: Saya suka membaca (me gusta leer). Para hablar de una actividad, puede aparecer un verbo después de suka. No hace falta añadir una conjugación verbal por persona. Practica frases completas y recupera el vocabulario de las lecciones anteriores.","vocabIds":["v402","v403","v404"],"reviewVocabIds":["v395","v396","v397","v398","v399","v400","v401"],"exercises":[{"vocabId":"v403","type":"order","prompt":"Ordena: A él/ella le gusta cantar.","words":["menyanyi","Dia","suka"],"correctOrder":["Dia","suka","menyanyi"],"explanation":"Dia suka menyanyi significa «Le gusta cantar»."},{"vocabId":"v404","type":"write","prompt":"Escribe una frase para decir «Me gusta bailar».","hint":"Usa Saya suka menari.","modelAnswer":"Saya suka menari.","explanation":"Saya suka menari significa «Me gusta bailar»."},{"vocabId":"v402","type":"mc","prompt":"¿Qué significa «akhir pekan»?","options":["Fin de semana","Esta noche","Un momento"],"answer":0,"explanation":"Akhir pekan significa fin de semana."},{"vocabId":"v395","type":"mc","prompt":"Recuperación: ¿Qué significa «Hobi»?","options":["Afición / pasatiempo","Música","Nadar"],"answer":0,"explanation":"Hobi significa Afición / pasatiempo."},{"vocabId":"v396","type":"translate_es_id","prompt":"Recuperación: traduce «Música» al indonesio.","answer":"Musik","explanation":"Musik significa Música."},{"vocabId":"v397","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Berenang","explanation":"La respuesta esperada es Berenang."},{"vocabId":"v398","type":"order","prompt":"Recuperación: ordena el ejemplo de «Sepak bola».","words":["bola.","sepak","suka","Dia"],"correctOrder":["Dia","suka","sepak","bola."],"explanation":"Ejemplo: Dia suka sepak bola."},{"vocabId":"v399","type":"write","prompt":"Recuperación: escribe una frase con «Melukis».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Saya suka melukis.","explanation":"Ejemplo: Saya suka melukis."},{"vocabId":"v400","type":"mc","prompt":"Recuperación: ¿Qué significa «Menonton»?","options":["Ver (una película)","Afición / pasatiempo","Música"],"answer":0,"explanation":"Menonton significa Ver (una película)."},{"vocabId":"v401","type":"translate_es_id","prompt":"Recuperación: traduce «Jugar» al indonesio.","answer":"Bermain","explanation":"Bermain significa Jugar."}]},{"title":"Lección 5: Recuperación espaciada de toda la unidad","objective":"Recupera y combina todo el vocabulario de la unidad sin incorporar palabras nuevas.","grammar":"Repasa el vocabulario completo mediante reconocimiento, traducción, escucha, orden y producción escrita.","vocabIds":[],"reviewVocabIds":["v395","v396","v397","v398","v399","v400","v401","v402","v403","v404"],"exercises":[{"vocabId":"v395","type":"mc","prompt":"Recuperación: ¿Qué significa «Hobi»?","options":["Afición / pasatiempo","Música","Nadar"],"answer":0,"explanation":"Hobi significa Afición / pasatiempo."},{"vocabId":"v396","type":"translate_es_id","prompt":"Recuperación: traduce «Música» al indonesio.","answer":"Musik","explanation":"Musik significa Música."},{"vocabId":"v397","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Berenang","explanation":"La respuesta esperada es Berenang."},{"vocabId":"v398","type":"order","prompt":"Recuperación: ordena el ejemplo de «Sepak bola».","words":["bola.","sepak","suka","Dia"],"correctOrder":["Dia","suka","sepak","bola."],"explanation":"Ejemplo: Dia suka sepak bola."},{"vocabId":"v399","type":"write","prompt":"Recuperación: escribe una frase con «Melukis».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Saya suka melukis.","explanation":"Ejemplo: Saya suka melukis."},{"vocabId":"v400","type":"mc","prompt":"Recuperación: ¿Qué significa «Menonton»?","options":["Ver (una película)","Afición / pasatiempo","Música"],"answer":0,"explanation":"Menonton significa Ver (una película)."},{"vocabId":"v401","type":"translate_es_id","prompt":"Recuperación: traduce «Jugar» al indonesio.","answer":"Bermain","explanation":"Bermain significa Jugar."},{"vocabId":"v402","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Akhir pekan","explanation":"La respuesta esperada es Akhir pekan."},{"vocabId":"v403","type":"order","prompt":"Recuperación: ordena el ejemplo de «Menyanyi».","words":["menyanyi.","suka","Dia"],"correctOrder":["Dia","suka","menyanyi."],"explanation":"Ejemplo: Dia suka menyanyi."},{"vocabId":"v404","type":"write","prompt":"Recuperación: escribe una frase con «Menari».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Saya belajar menari.","explanation":"Ejemplo: Saya belajar menari."}]}],
                            vocab: [
                                { id: 'v395', idn: 'Hobi', esp: 'Afición / pasatiempo', ex: 'Apa hobi kamu?', exEsp: '¿Cuál es tu afición?' },
                                { id: 'v396', idn: 'Musik', esp: 'Música', ex: 'Saya suka musik.', exEsp: 'Me gusta la música.' },
                                { id: 'v397', idn: 'Berenang', esp: 'Nadar', ex: 'Saya suka berenang.', exEsp: 'Me gusta nadar.' },
                                { id: 'v398', idn: 'Sepak bola', esp: 'Fútbol', ex: 'Dia suka sepak bola.', exEsp: 'A él/ella le gusta el fútbol.' },
                                { id: 'v399', idn: 'Melukis', esp: 'Pintar', ex: 'Saya suka melukis.', exEsp: 'Me gusta pintar.' },
                                { id: 'v400', idn: 'Menonton', esp: 'Ver (una película)', ex: 'Saya menonton film.', exEsp: 'Veo una película.' },
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
                                { vocabId: 'v399', type: 'mc', prompt: '¿Qué significa «melukis»?', options: ['Cantar', 'Pintar', 'Bailar'], answer: 1, explanation: 'Melukis significa pintar.' },
                                { vocabId: 'v400', type: 'translate_es_id', prompt: 'Traduce: ver una película', answer: 'Menonton', explanation: 'Menonton se usa para ver una película.' },
                                { vocabId: 'v403', type: 'order', prompt: 'Ordena: A él/ella le gusta cantar.', words: ['menyanyi', 'Dia', 'suka'], correctOrder: ['Dia', 'suka', 'menyanyi'], explanation: 'Dia suka menyanyi significa «Le gusta cantar».' },
                                { vocabId: 'v404', type: 'write', prompt: 'Escribe una frase para decir «Me gusta bailar».', hint: 'Usa Saya suka menari.', modelAnswer: 'Saya suka menari.', explanation: 'Saya suka menari significa «Me gusta bailar».' }
                            
                                , { vocabId: 'v397', type: 'mc', prompt: '¿Qué actividad le gusta en «Saya suka berenang»?', audioText: 'Saya suka berenang.', options: ["Me gusta nadar","Le gusta bailar","Le gusta pintar"], answer: 0, explanation: 'Suka berenang significa gustar de nadar.' }
                            ,
                                        {
                                            "vocabId": "v401",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «bermain»?",
                                            "options": [
                                                "Jugar",
                                                "Nadar",
                                                "Pintar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Bermain significa jugar."
                                        },
                                        {
                                            "vocabId": "v402",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «akhir pekan»?",
                                            "options": [
                                                "Fin de semana",
                                                "Esta noche",
                                                "Un momento"
                                            ],
                                            "answer": 0,
                                            "explanation": "Akhir pekan significa fin de semana."
                                        }
]
                        },
                        {
                            id: 'a1_u26',
                            title: 'Unidad 26: Cómo llegar a un lugar',
                            desc: 'Comprender indicaciones sencillas y preguntar por una dirección.',
                            grammar: 'Las indicaciones pueden darse con expresiones breves: belok kiri (gira a la izquierda), belok kanan (gira a la derecha), jalan lurus (sigue recto). Di indica ubicación, mientras que ke puede indicar dirección o destino.',
                            lessonPlans: [{"title":"Direcciones básicas","objective":"Comprende y da indicaciones breves para seguir una calle o girar.","grammar":"Las indicaciones pueden ser imperativos breves: Belok kiri, belok kanan y jalan lurus. Kiri y kanan indican la dirección."},{"title":"Ubicación y distancia","objective":"Describe dónde está un lugar y si queda cerca o lejos.","grammar":"Usa di con expresiones de ubicación: di depan, di belakang y di seberang. Jauh describe la distancia."},{"title":"Preguntar y orientarse con un mapa","objective":"Relaciona los giros con un mapa para orientarse.","grammar":"Usa peta para hablar del mapa y belok para indicar un giro. Para preguntar por la ubicación, puedes usar Di mana ...?"}],
                            lessons: [{"title":"Direcciones básicas","objective":"Comprende y da indicaciones breves para seguir una calle o girar.","grammar":"Comprende y da indicaciones breves para seguir una calle o girar. Las indicaciones pueden ser imperativos breves: Belok kiri, belok kanan y jalan lurus. Kiri y kanan indican la dirección.","vocabIds":["v405","v406"],"reviewVocabIds":[],"exercises":[{"vocabId":"v406","type":"mc","prompt":"¿Qué significa «kiri»?","options":["Derecha","Lejos","Izquierda"],"answer":2,"explanation":"Kiri significa izquierda."},{"vocabId":"v406","type":"order","prompt":"Ordena: Gira a la izquierda.","words":["kiri","Belok"],"correctOrder":["Belok","kiri"],"explanation":"Belok kiri significa «Gira a la izquierda»."},{"vocabId":"v406","type":"mc","prompt":"¿Qué dirección indica «Belok kiri»?","audioText":"Belok kiri.","options":["A la izquierda","A la derecha","Sigue recto"],"answer":0,"explanation":"Belok kiri significa gira a la izquierda."},{"vocabId":"v405","type":"mc","prompt":"¿Qué significa «jalan»?","options":["Calle / camino","Izquierda","Mapa"],"answer":0,"explanation":"Jalan significa calle o camino."}]},{"title":"Ubicación y distancia","objective":"Describe dónde está un lugar y si queda cerca o lejos.","grammar":"Describe dónde está un lugar y si queda cerca o lejos. Usa di con expresiones de ubicación: di depan, di belakang y di seberang. Jauh describe la distancia.","vocabIds":["v407","v408"],"reviewVocabIds":["v405","v406"],"exercises":[{"vocabId":"v407","type":"translate_es_id","prompt":"Traduce: derecha","answer":"Kanan","explanation":"Kanan significa derecha."},{"vocabId":"v408","type":"order","prompt":"Ordena: Sigue recto.","words":["lurus","Jalan"],"correctOrder":["Jalan","lurus"],"explanation":"Jalan lurus es una indicación breve para seguir recto."},{"vocabId":"v405","type":"mc","prompt":"Recuperación: ¿Qué significa «Jalan»?","options":["Calle / camino","Izquierda","Derecha"],"answer":0,"explanation":"Jalan significa Calle / camino."},{"vocabId":"v406","type":"translate_es_id","prompt":"Recuperación: traduce «Izquierda» al indonesio.","answer":"Kiri","explanation":"Kiri significa Izquierda."}]},{"title":"Preguntar y orientarse con un mapa","objective":"Relaciona los giros con un mapa para orientarse.","grammar":"Relaciona los giros con un mapa para orientarse. Usa peta para hablar del mapa y belok para indicar un giro. Para preguntar por la ubicación, puedes usar Di mana ...?","vocabIds":["v409","v410","v411"],"reviewVocabIds":["v405","v406","v407","v408"],"exercises":[{"vocabId":"v409","type":"mc","prompt":"¿Qué significa «seberang»?","options":["Al otro lado","Lejos","Detrás"],"answer":0,"explanation":"Seberang significa el otro lado o enfrente."},{"vocabId":"v410","type":"write","prompt":"Escribe una frase para decir «Mi casa está lejos».","hint":"Usa Rumah saya jauh.","modelAnswer":"Rumah saya jauh.","explanation":"Rumah saya jauh significa «Mi casa está lejos»."},{"vocabId":"v411","type":"mc","prompt":"¿Qué significa «depan»?","options":["Delante / parte delantera","Detrás","Al otro lado"],"answer":0,"explanation":"Depan indica delante o la parte delantera."},{"vocabId":"v405","type":"mc","prompt":"Recuperación: ¿Qué significa «Jalan»?","options":["Calle / camino","Izquierda","Derecha"],"answer":0,"explanation":"Jalan significa Calle / camino."},{"vocabId":"v406","type":"translate_es_id","prompt":"Recuperación: traduce «Izquierda» al indonesio.","answer":"Kiri","explanation":"Kiri significa Izquierda."},{"vocabId":"v407","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Kanan","explanation":"La respuesta esperada es Kanan."},{"vocabId":"v408","type":"order","prompt":"Recuperación: ordena el ejemplo de «Lurus».","words":["lurus.","Jalan"],"correctOrder":["Jalan","lurus."],"explanation":"Ejemplo: Jalan lurus."}]},{"title":"Aplicación guiada y producción","objective":"Integra el vocabulario de cómo llegar a un lugar para comprender indicaciones sencillas y preguntar por una dirección.","grammar":"Las indicaciones pueden darse con expresiones breves: belok kiri (gira a la izquierda), belok kanan (gira a la derecha), jalan lurus (sigue recto). Di indica ubicación, mientras que ke puede indicar dirección o destino. Practica frases completas y recupera el vocabulario de las lecciones anteriores.","vocabIds":["v412","v413","v414"],"reviewVocabIds":["v405","v406","v407","v408","v409","v410","v411"],"exercises":[{"vocabId":"v414","type":"listen","prompt":"Escucha y escribe la palabra.","answer":"Peta","explanation":"Peta significa mapa."},{"vocabId":"v413","type":"translate_es_id","prompt":"Traduce: girar","answer":"Belok","explanation":"Belok significa girar."},{"vocabId":"v412","type":"mc","prompt":"¿Qué significa «belakang»?","options":["Parte trasera / detrás","Delante","Lejos"],"answer":0,"explanation":"Belakang indica detrás o la parte trasera."},{"vocabId":"v405","type":"mc","prompt":"Recuperación: ¿Qué significa «Jalan»?","options":["Calle / camino","Izquierda","Derecha"],"answer":0,"explanation":"Jalan significa Calle / camino."},{"vocabId":"v406","type":"translate_es_id","prompt":"Recuperación: traduce «Izquierda» al indonesio.","answer":"Kiri","explanation":"Kiri significa Izquierda."},{"vocabId":"v407","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Kanan","explanation":"La respuesta esperada es Kanan."},{"vocabId":"v408","type":"order","prompt":"Recuperación: ordena el ejemplo de «Lurus».","words":["lurus.","Jalan"],"correctOrder":["Jalan","lurus."],"explanation":"Ejemplo: Jalan lurus."},{"vocabId":"v409","type":"write","prompt":"Recuperación: escribe una frase con «Seberang».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Toko di seberang jalan.","explanation":"Ejemplo: Toko di seberang jalan."},{"vocabId":"v410","type":"mc","prompt":"Recuperación: ¿Qué significa «Jauh»?","options":["Lejos","Calle / camino","Izquierda"],"answer":0,"explanation":"Jauh significa Lejos."},{"vocabId":"v411","type":"translate_es_id","prompt":"Recuperación: traduce «Delante / parte delantera» al indonesio.","answer":"Depan","explanation":"Depan significa Delante / parte delantera."}]},{"title":"Lección 5: Recuperación espaciada de toda la unidad","objective":"Recupera y combina todo el vocabulario de la unidad sin incorporar palabras nuevas.","grammar":"Repasa el vocabulario completo mediante reconocimiento, traducción, escucha, orden y producción escrita.","vocabIds":[],"reviewVocabIds":["v405","v406","v407","v408","v409","v410","v411","v412","v413","v414"],"exercises":[{"vocabId":"v405","type":"mc","prompt":"Recuperación: ¿Qué significa «Jalan»?","options":["Calle / camino","Izquierda","Derecha"],"answer":0,"explanation":"Jalan significa Calle / camino."},{"vocabId":"v406","type":"translate_es_id","prompt":"Recuperación: traduce «Izquierda» al indonesio.","answer":"Kiri","explanation":"Kiri significa Izquierda."},{"vocabId":"v407","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Kanan","explanation":"La respuesta esperada es Kanan."},{"vocabId":"v408","type":"order","prompt":"Recuperación: ordena el ejemplo de «Lurus».","words":["lurus.","Jalan"],"correctOrder":["Jalan","lurus."],"explanation":"Ejemplo: Jalan lurus."},{"vocabId":"v409","type":"write","prompt":"Recuperación: escribe una frase con «Seberang».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Toko di seberang jalan.","explanation":"Ejemplo: Toko di seberang jalan."},{"vocabId":"v410","type":"mc","prompt":"Recuperación: ¿Qué significa «Jauh»?","options":["Lejos","Calle / camino","Izquierda"],"answer":0,"explanation":"Jauh significa Lejos."},{"vocabId":"v411","type":"translate_es_id","prompt":"Recuperación: traduce «Delante / parte delantera» al indonesio.","answer":"Depan","explanation":"Depan significa Delante / parte delantera."},{"vocabId":"v412","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Belakang","explanation":"La respuesta esperada es Belakang."},{"vocabId":"v413","type":"order","prompt":"Recuperación: ordena el ejemplo de «Belok».","words":["sini.","di","Belok"],"correctOrder":["Belok","di","sini."],"explanation":"Ejemplo: Belok di sini."},{"vocabId":"v414","type":"write","prompt":"Recuperación: escribe una frase con «Peta».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Ini peta.","explanation":"Ejemplo: Ini peta."}]}],
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
                            
                                , { vocabId: 'v406', type: 'mc', prompt: '¿Qué dirección indica «Belok kiri»?', audioText: 'Belok kiri.', options: ["A la izquierda","A la derecha","Sigue recto"], answer: 0, explanation: 'Belok kiri significa gira a la izquierda.' }
                            ,
                                        {
                                            "vocabId": "v405",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «jalan»?",
                                            "options": [
                                                "Calle / camino",
                                                "Izquierda",
                                                "Mapa"
                                            ],
                                            "answer": 0,
                                            "explanation": "Jalan significa calle o camino."
                                        },
                                        {
                                            "vocabId": "v411",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «depan»?",
                                            "options": [
                                                "Delante / parte delantera",
                                                "Detrás",
                                                "Al otro lado"
                                            ],
                                            "answer": 0,
                                            "explanation": "Depan indica delante o la parte delantera."
                                        },
                                        {
                                            "vocabId": "v412",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «belakang»?",
                                            "options": [
                                                "Parte trasera / detrás",
                                                "Delante",
                                                "Lejos"
                                            ],
                                            "answer": 0,
                                            "explanation": "Belakang indica detrás o la parte trasera."
                                        }
]
                        },
                        {
                            id: 'a1_u27',
                            title: 'Unidad 27: Invitaciones y planes',
                            desc: 'Proponer actividades y hablar de planes sencillos para hoy o mañana.',
                            grammar: 'Besok significa mañana (el día siguiente) y nanti puede significar más tarde. Para proponer algo puedes preguntar Mau ...? (¿Quieres ...?) o usar Ayo ...! (¡Vamos a ...!). El significado concreto depende de la frase y el contexto.',
                            lessonPlans: [{"title":"Tiempo e invitaciones","objective":"Habla de un momento cercano e invita a alguien a realizar una actividad.","grammar":"Lusa sitúa una acción pasado mañana y sebentar expresa una duración breve. Mengajak introduce la idea de invitar o proponer acompañar; mengunjungi significa visitar un lugar o a una persona."},{"title":"Propuestas y encuentros","objective":"Propón caminar o encontrarte con alguien usando expresiones sencillas.","grammar":"Ayo puede iniciar una invitación: Ayo berjalan. Mungkin expresa posibilidad, mientras bertemu nombra el encuentro."},{"title":"Planes para esta noche","objective":"Menciona un plan y el momento en que quieres realizarlo.","grammar":"Coloca malam ini para situar el plan en esta noche: Malam ini saya punya rencana."}],
                            lessons: [{"title":"Tiempo e invitaciones","objective":"Habla de un momento cercano e invita a alguien a realizar una actividad.","grammar":"Habla de un momento cercano e invita a alguien a realizar una actividad. Lusa sitúa una acción pasado mañana y sebentar expresa una duración breve. Mengajak introduce la idea de invitar o proponer acompañar; mengunjungi significa visitar un lugar o a una persona.","vocabIds":["v415","v416"],"reviewVocabIds":[],"exercises":[{"vocabId":"v415","type":"mc","prompt":"¿Qué significa «lusa»?","options":["Ayer","Pasado mañana","Ahora"],"answer":1,"explanation":"Lusa significa pasado mañana."},{"vocabId":"v416","type":"translate_es_id","prompt":"Traduce: un momento","answer":"Sebentar","explanation":"Sebentar significa un momento o brevemente."},{"vocabId":"v415","type":"write","prompt":"Práctica: escribe una frase con «Lusa».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Lusa saya datang.","explanation":"Ejemplo: Lusa saya datang."}]},{"title":"Propuestas y encuentros","objective":"Propón caminar o encontrarte con alguien usando expresiones sencillas.","grammar":"Propón caminar o encontrarte con alguien usando expresiones sencillas. Ayo puede iniciar una invitación: Ayo berjalan. Mungkin expresa posibilidad, mientras bertemu nombra el encuentro.","vocabIds":["v417","v418"],"reviewVocabIds":["v415","v416"],"exercises":[{"vocabId":"v417","type":"order","prompt":"Ordena: Invito a un amigo.","words":["teman","Saya","mengajak"],"correctOrder":["Saya","mengajak","teman"],"explanation":"Saya mengajak teman significa «Invito a un amigo»."},{"vocabId":"v418","type":"mc","prompt":"¿Qué significa «mengunjungi»?","options":["Irse","Dormir","Visitar"],"answer":2,"explanation":"Mengunjungi significa visitar."},{"vocabId":"v415","type":"mc","prompt":"Recuperación: ¿Qué significa «Lusa»?","options":["Pasado mañana","Un momento / brevemente","Invitar a alguien / proponer que acompañe"],"answer":0,"explanation":"Lusa significa Pasado mañana."},{"vocabId":"v416","type":"translate_es_id","prompt":"Recuperación: traduce «Un momento / brevemente» al indonesio.","answer":"Sebentar","explanation":"Sebentar significa Un momento / brevemente."}]},{"title":"Planes para esta noche","objective":"Menciona un plan y el momento en que quieres realizarlo.","grammar":"Menciona un plan y el momento en que quieres realizarlo. Coloca malam ini para situar el plan en esta noche: Malam ini saya punya rencana.","vocabIds":["v419","v420","v421"],"reviewVocabIds":["v415","v416","v417","v418"],"exercises":[{"vocabId":"v421","type":"listen","prompt":"Escucha y escribe la palabra.","answer":"Ayo","explanation":"Ayo se usa para animar a hacer algo juntos."},{"vocabId":"v419","type":"translate_es_id","prompt":"Traduce: caminar","answer":"Berjalan","explanation":"Berjalan significa caminar."},{"vocabId":"v421","type":"mc","prompt":"¿Qué propone «Ayo makan»?","audioText":"Ayo makan!","options":["¡Vamos a comer!","¡Vamos a dormir!","¡Vamos a estudiar!"],"answer":0,"explanation":"Ayo introduce una invitación o propuesta."},{"vocabId":"v420","type":"mc","prompt":"¿Qué significa «bertemu»?","options":["Encontrarse / reunirse","Visitar","Invitar"],"answer":0,"explanation":"Bertemu significa encontrarse o reunirse."},{"vocabId":"v415","type":"mc","prompt":"Recuperación: ¿Qué significa «Lusa»?","options":["Pasado mañana","Un momento / brevemente","Invitar a alguien / proponer que acompañe"],"answer":0,"explanation":"Lusa significa Pasado mañana."},{"vocabId":"v416","type":"translate_es_id","prompt":"Recuperación: traduce «Un momento / brevemente» al indonesio.","answer":"Sebentar","explanation":"Sebentar significa Un momento / brevemente."},{"vocabId":"v417","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Mengajak","explanation":"La respuesta esperada es Mengajak."},{"vocabId":"v418","type":"order","prompt":"Recuperación: ordena el ejemplo de «Mengunjungi».","words":["teman.","mengunjungi","Saya"],"correctOrder":["Saya","mengunjungi","teman."],"explanation":"Ejemplo: Saya mengunjungi teman."}]},{"title":"Aplicación guiada y producción","objective":"Integra el vocabulario de invitaciones y planes para proponer actividades y hablar de planes sencillos para hoy o mañana.","grammar":"Besok significa mañana (el día siguiente) y nanti puede significar más tarde. Para proponer algo puedes preguntar Mau ...? (¿Quieres ...?) o usar Ayo ...! (¡Vamos a ...!). El significado concreto depende de la frase y el contexto. Practica frases completas y recupera el vocabulario de las lecciones anteriores.","vocabIds":["v422","v423","v424"],"reviewVocabIds":["v415","v416","v417","v418","v419","v420","v421"],"exercises":[{"vocabId":"v422","type":"order","prompt":"Ordena: Quizá venga.","words":["datang","Mungkin","saya"],"correctOrder":["Mungkin","saya","datang"],"explanation":"Mungkin saya datang significa «Quizá venga»."},{"vocabId":"v423","type":"write","prompt":"Escribe una frase para decir «Esta noche estoy ocupado/a».","hint":"Usa Malam ini saya sibuk.","modelAnswer":"Malam ini saya sibuk.","explanation":"Malam ini saya sibuk significa «Esta noche estoy ocupado/a»."},{"vocabId":"v424","type":"mc","prompt":"¿Qué significa «rencana»?","options":["Plan","Pasado mañana","Quizá"],"answer":0,"explanation":"Rencana significa plan."},{"vocabId":"v415","type":"mc","prompt":"Recuperación: ¿Qué significa «Lusa»?","options":["Pasado mañana","Un momento / brevemente","Invitar a alguien / proponer que acompañe"],"answer":0,"explanation":"Lusa significa Pasado mañana."},{"vocabId":"v416","type":"translate_es_id","prompt":"Recuperación: traduce «Un momento / brevemente» al indonesio.","answer":"Sebentar","explanation":"Sebentar significa Un momento / brevemente."},{"vocabId":"v417","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Mengajak","explanation":"La respuesta esperada es Mengajak."},{"vocabId":"v418","type":"order","prompt":"Recuperación: ordena el ejemplo de «Mengunjungi».","words":["teman.","mengunjungi","Saya"],"correctOrder":["Saya","mengunjungi","teman."],"explanation":"Ejemplo: Saya mengunjungi teman."},{"vocabId":"v419","type":"write","prompt":"Recuperación: escribe una frase con «Berjalan».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Saya berjalan ke toko.","explanation":"Ejemplo: Saya berjalan ke toko."},{"vocabId":"v420","type":"mc","prompt":"Recuperación: ¿Qué significa «Bertemu»?","options":["Encontrarse / reunirse","Pasado mañana","Un momento / brevemente"],"answer":0,"explanation":"Bertemu significa Encontrarse / reunirse."},{"vocabId":"v421","type":"translate_es_id","prompt":"Recuperación: traduce «Vamos / ¡venga!» al indonesio.","answer":"Ayo","explanation":"Ayo significa Vamos / ¡venga!."}]},{"title":"Lección 5: Recuperación espaciada de toda la unidad","objective":"Recupera y combina todo el vocabulario de la unidad sin incorporar palabras nuevas.","grammar":"Repasa el vocabulario completo mediante reconocimiento, traducción, escucha, orden y producción escrita.","vocabIds":[],"reviewVocabIds":["v415","v416","v417","v418","v419","v420","v421","v422","v423","v424"],"exercises":[{"vocabId":"v415","type":"mc","prompt":"Recuperación: ¿Qué significa «Lusa»?","options":["Pasado mañana","Un momento / brevemente","Invitar a alguien / proponer que acompañe"],"answer":0,"explanation":"Lusa significa Pasado mañana."},{"vocabId":"v416","type":"translate_es_id","prompt":"Recuperación: traduce «Un momento / brevemente» al indonesio.","answer":"Sebentar","explanation":"Sebentar significa Un momento / brevemente."},{"vocabId":"v417","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Mengajak","explanation":"La respuesta esperada es Mengajak."},{"vocabId":"v418","type":"order","prompt":"Recuperación: ordena el ejemplo de «Mengunjungi».","words":["teman.","mengunjungi","Saya"],"correctOrder":["Saya","mengunjungi","teman."],"explanation":"Ejemplo: Saya mengunjungi teman."},{"vocabId":"v419","type":"write","prompt":"Recuperación: escribe una frase con «Berjalan».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Saya berjalan ke toko.","explanation":"Ejemplo: Saya berjalan ke toko."},{"vocabId":"v420","type":"mc","prompt":"Recuperación: ¿Qué significa «Bertemu»?","options":["Encontrarse / reunirse","Pasado mañana","Un momento / brevemente"],"answer":0,"explanation":"Bertemu significa Encontrarse / reunirse."},{"vocabId":"v421","type":"translate_es_id","prompt":"Recuperación: traduce «Vamos / ¡venga!» al indonesio.","answer":"Ayo","explanation":"Ayo significa Vamos / ¡venga!."},{"vocabId":"v422","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Mungkin","explanation":"La respuesta esperada es Mungkin."},{"vocabId":"v423","type":"order","prompt":"Recuperación: ordena el ejemplo de «Malam ini».","words":["sibuk.","saya","ini","Malam"],"correctOrder":["Malam","ini","saya","sibuk."],"explanation":"Ejemplo: Malam ini saya sibuk."},{"vocabId":"v424","type":"write","prompt":"Recuperación: escribe una frase con «Rencana».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Ini rencana saya.","explanation":"Ejemplo: Ini rencana saya."}]}],
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
                            
                                , { vocabId: 'v421', type: 'mc', prompt: '¿Qué propone «Ayo makan»?', audioText: 'Ayo makan!', options: ["¡Vamos a comer!","¡Vamos a dormir!","¡Vamos a estudiar!"], answer: 0, explanation: 'Ayo introduce una invitación o propuesta.' }
                            ,
                                        {
                                            "vocabId": "v420",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «bertemu»?",
                                            "options": [
                                                "Encontrarse / reunirse",
                                                "Visitar",
                                                "Invitar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Bertemu significa encontrarse o reunirse."
                                        },
                                        {
                                            "vocabId": "v424",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «rencana»?",
                                            "options": [
                                                "Plan",
                                                "Pasado mañana",
                                                "Quizá"
                                            ],
                                            "answer": 0,
                                            "explanation": "Rencana significa plan."
                                        }
]
                        },
                        {
                            id: 'a1_u28',
                            title: 'Unidad 28: Viajes y alojamiento',
                            desc: 'Reconocer vocabulario básico para viajar y alojarse.',
                            grammar: 'Usa ke para expresar destino: ke bandara (al aeropuerto), ke hotel (al hotel). Para preguntar por una reserva puedes decir Ada reservasi? (¿Hay una reserva?). Las frases son modelos breves; el trato cortés depende de la situación.',
                            lessonPlans: [{"title":"Hotel, documentos y aeropuerto","objective":"Reconoce los elementos básicos de un viaje y sus documentos.","grammar":"Paspor significa pasaporte y tiket, billete o boleto. Usa ke para indicar destino: Saya pergi ke bandara. Para indicar dónde estás, usa di: Saya di hotel."},{"title":"Transportes, equipaje y llegada","objective":"Nombra medios de transporte, equipaje y acciones de llegada.","grammar":"Pesawat significa avión y kapal, barco. Tiba puede combinarse con di para indicar el lugar de llegada: Saya tiba di hotel. Koper nombra el equipaje que llevas."},{"title":"Reservas y sellos","objective":"Reconoce palabras habituales al gestionar una reserva y documentos de viaje.","grammar":"Puedes preguntar por la existencia de una reserva con Ada reservasi? Stempel se refiere al sello que puede aparecer en un documento."}],
                            lessons: [{"title":"Hotel, documentos y aeropuerto","objective":"Reconoce los elementos básicos de un viaje y sus documentos.","grammar":"Reconoce los elementos básicos de un viaje y sus documentos. Paspor significa pasaporte y tiket, billete o boleto. Usa ke para indicar destino: Saya pergi ke bandara. Para indicar dónde estás, usa di: Saya di hotel.","vocabIds":["v425","v426"],"reviewVocabIds":[],"exercises":[{"vocabId":"v426","type":"mc","prompt":"¿Qué significa «paspor»?","options":["Pasaporte","Maleta","Tren"],"answer":0,"explanation":"Paspor significa pasaporte."},{"vocabId":"v425","type":"write","prompt":"Escribe una frase para decir «Estoy en el hotel».","hint":"Usa Saya di hotel.","modelAnswer":"Saya di hotel.","explanation":"Saya di hotel significa «Estoy en el hotel»."},{"vocabId":"v425","type":"write","prompt":"Práctica: escribe una frase con «Hotel».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Saya di hotel.","explanation":"Ejemplo: Saya di hotel."}]},{"title":"Transportes, equipaje y llegada","objective":"Nombra medios de transporte, equipaje y acciones de llegada.","grammar":"Nombra medios de transporte, equipaje y acciones de llegada. Pesawat significa avión y kapal, barco. Tiba puede combinarse con di para indicar el lugar de llegada: Saya tiba di hotel. Koper nombra el equipaje que llevas.","vocabIds":["v427","v428"],"reviewVocabIds":["v425","v426"],"exercises":[{"vocabId":"v427","type":"translate_es_id","prompt":"Traduce: billete / boleto","answer":"Tiket","explanation":"Tiket puede ser billete, boleto o entrada."},{"vocabId":"v428","type":"order","prompt":"Ordena: Voy al aeropuerto.","words":["bandara","ke","Saya","pergi"],"correctOrder":["Saya","pergi","ke","bandara"],"explanation":"Saya pergi ke bandara significa «Voy al aeropuerto»."},{"vocabId":"v425","type":"mc","prompt":"Recuperación: ¿Qué significa «Hotel»?","options":["Hotel","Pasaporte","Billete / boleto / entrada"],"answer":0,"explanation":"Hotel significa Hotel."},{"vocabId":"v426","type":"translate_es_id","prompt":"Recuperación: traduce «Pasaporte» al indonesio.","answer":"Paspor","explanation":"Paspor significa Pasaporte."}]},{"title":"Reservas y sellos","objective":"Reconoce palabras habituales al gestionar una reserva y documentos de viaje.","grammar":"Reconoce palabras habituales al gestionar una reserva y documentos de viaje. Puedes preguntar por la existencia de una reserva con Ada reservasi? Stempel se refiere al sello que puede aparecer en un documento.","vocabIds":["v429","v430","v431"],"reviewVocabIds":["v425","v426","v427","v428"],"exercises":[{"vocabId":"v429","type":"listen","prompt":"Escucha y escribe la palabra.","answer":"Pesawat","explanation":"Pesawat significa avión."},{"vocabId":"v431","type":"mc","prompt":"¿Qué significa «koper»?","options":["Hotel","Maleta","Sello"],"answer":1,"explanation":"Koper significa maleta."},{"vocabId":"v430","type":"mc","prompt":"¿Qué significa «kapal»?","options":["Barco","Avión","Aeropuerto"],"answer":0,"explanation":"Kapal significa barco."},{"vocabId":"v425","type":"mc","prompt":"Recuperación: ¿Qué significa «Hotel»?","options":["Hotel","Pasaporte","Billete / boleto / entrada"],"answer":0,"explanation":"Hotel significa Hotel."},{"vocabId":"v426","type":"translate_es_id","prompt":"Recuperación: traduce «Pasaporte» al indonesio.","answer":"Paspor","explanation":"Paspor significa Pasaporte."},{"vocabId":"v427","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Tiket","explanation":"La respuesta esperada es Tiket."},{"vocabId":"v428","type":"order","prompt":"Recuperación: ordena el ejemplo de «Bandara».","words":["bandara.","ke","pergi","Saya"],"correctOrder":["Saya","pergi","ke","bandara."],"explanation":"Ejemplo: Saya pergi ke bandara."}]},{"title":"Aplicación guiada y producción","objective":"Integra el vocabulario de viajes y alojamiento para reconocer vocabulario básico para viajar y alojarse.","grammar":"Usa ke para expresar destino: ke bandara (al aeropuerto), ke hotel (al hotel). Para preguntar por una reserva puedes decir Ada reservasi? (¿Hay una reserva?). Las frases son modelos breves; el trato cortés depende de la situación. Practica frases completas y recupera el vocabulario de las lecciones anteriores.","vocabIds":["v432","v433","v434"],"reviewVocabIds":["v425","v426","v427","v428","v429","v430","v431"],"exercises":[{"vocabId":"v432","type":"translate_es_id","prompt":"Traduce: llegar","answer":"Tiba","explanation":"Tiba significa llegar."},{"vocabId":"v433","type":"order","prompt":"Ordena: Tengo una reserva.","words":["reservasi","punya","Saya"],"correctOrder":["Saya","punya","reservasi"],"explanation":"Saya punya reservasi significa «Tengo una reserva»."},{"vocabId":"v433","type":"mc","prompt":"¿Qué informa la persona en «Saya punya reservasi»?","audioText":"Saya punya reservasi.","options":["Tengo una reserva","Ha perdido el pasaporte","Necesita un billete"],"answer":0,"explanation":"Reservasi significa reserva."},{"vocabId":"v434","type":"mc","prompt":"¿Qué significa «stempel»?","options":["Sello (oficial)","Pasaporte","Maleta"],"answer":0,"explanation":"Stempel significa sello, por ejemplo uno oficial."},{"vocabId":"v425","type":"mc","prompt":"Recuperación: ¿Qué significa «Hotel»?","options":["Hotel","Pasaporte","Billete / boleto / entrada"],"answer":0,"explanation":"Hotel significa Hotel."},{"vocabId":"v426","type":"translate_es_id","prompt":"Recuperación: traduce «Pasaporte» al indonesio.","answer":"Paspor","explanation":"Paspor significa Pasaporte."},{"vocabId":"v427","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Tiket","explanation":"La respuesta esperada es Tiket."},{"vocabId":"v428","type":"order","prompt":"Recuperación: ordena el ejemplo de «Bandara».","words":["bandara.","ke","pergi","Saya"],"correctOrder":["Saya","pergi","ke","bandara."],"explanation":"Ejemplo: Saya pergi ke bandara."},{"vocabId":"v429","type":"write","prompt":"Recuperación: escribe una frase con «Pesawat».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Saya naik pesawat.","explanation":"Ejemplo: Saya naik pesawat."},{"vocabId":"v430","type":"mc","prompt":"Recuperación: ¿Qué significa «Kapal»?","options":["Barco","Hotel","Pasaporte"],"answer":0,"explanation":"Kapal significa Barco."},{"vocabId":"v431","type":"translate_es_id","prompt":"Recuperación: traduce «Maleta» al indonesio.","answer":"Koper","explanation":"Koper significa Maleta."}]},{"title":"Lección 5: Recuperación espaciada de toda la unidad","objective":"Recupera y combina todo el vocabulario de la unidad sin incorporar palabras nuevas.","grammar":"Repasa el vocabulario completo mediante reconocimiento, traducción, escucha, orden y producción escrita.","vocabIds":[],"reviewVocabIds":["v425","v426","v427","v428","v429","v430","v431","v432","v433","v434"],"exercises":[{"vocabId":"v425","type":"mc","prompt":"Recuperación: ¿Qué significa «Hotel»?","options":["Hotel","Pasaporte","Billete / boleto / entrada"],"answer":0,"explanation":"Hotel significa Hotel."},{"vocabId":"v426","type":"translate_es_id","prompt":"Recuperación: traduce «Pasaporte» al indonesio.","answer":"Paspor","explanation":"Paspor significa Pasaporte."},{"vocabId":"v427","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Tiket","explanation":"La respuesta esperada es Tiket."},{"vocabId":"v428","type":"order","prompt":"Recuperación: ordena el ejemplo de «Bandara».","words":["bandara.","ke","pergi","Saya"],"correctOrder":["Saya","pergi","ke","bandara."],"explanation":"Ejemplo: Saya pergi ke bandara."},{"vocabId":"v429","type":"write","prompt":"Recuperación: escribe una frase con «Pesawat».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Saya naik pesawat.","explanation":"Ejemplo: Saya naik pesawat."},{"vocabId":"v430","type":"mc","prompt":"Recuperación: ¿Qué significa «Kapal»?","options":["Barco","Hotel","Pasaporte"],"answer":0,"explanation":"Kapal significa Barco."},{"vocabId":"v431","type":"translate_es_id","prompt":"Recuperación: traduce «Maleta» al indonesio.","answer":"Koper","explanation":"Koper significa Maleta."},{"vocabId":"v432","type":"listen","prompt":"Recuperación: escucha y escribe la palabra o expresión.","answer":"Tiba","explanation":"La respuesta esperada es Tiba."},{"vocabId":"v433","type":"order","prompt":"Recuperación: ordena el ejemplo de «Reservasi».","words":["reservasi.","punya","Saya"],"correctOrder":["Saya","punya","reservasi."],"explanation":"Ejemplo: Saya punya reservasi."},{"vocabId":"v434","type":"write","prompt":"Recuperación: escribe una frase con «Stempel».","hint":"Usa el ejemplo de la unidad como modelo.","modelAnswer":"Saya perlu stempel di paspor.","explanation":"Ejemplo: Saya perlu stempel di paspor."}]}],
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
                            
                                , { vocabId: 'v433', type: 'mc', prompt: '¿Qué informa la persona en «Saya punya reservasi»?', audioText: 'Saya punya reservasi.', options: ["Tengo una reserva","Ha perdido el pasaporte","Necesita un billete"], answer: 0, explanation: 'Reservasi significa reserva.' }
                            ,
                                        {
                                            "vocabId": "v430",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «kapal»?",
                                            "options": [
                                                "Barco",
                                                "Avión",
                                                "Aeropuerto"
                                            ],
                                            "answer": 0,
                                            "explanation": "Kapal significa barco."
                                        },
                                        {
                                            "vocabId": "v434",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «stempel»?",
                                            "options": [
                                                "Sello (oficial)",
                                                "Pasaporte",
                                                "Maleta"
                                            ],
                                            "answer": 0,
                                            "explanation": "Stempel significa sello, por ejemplo uno oficial."
                                        }
]
                        },
                        {
                            id: 'a1_u29',
                            title: 'Unidad 29: Frecuencia y hábitos',
                            desc: 'Describir hábitos con expresiones sencillas de frecuencia.',
                            grammar: 'Las expresiones de frecuencia suelen aparecer antes del verbo o después del sujeto: Saya selalu belajar (siempre estudio), Saya kadang-kadang membaca (a veces leo). Cada adverbio puede variar de posición según el énfasis.',
                            lessonPlans: [{"title":"Frecuencia de los hábitos","objective":"Distingue expresiones para hablar de hábitos frecuentes o poco frecuentes.","grammar":"Las expresiones selalu, biasanya, kadang-kadang y jarang suelen aparecer antes del verbo: Saya selalu belajar; Saya jarang membaca."},{"title":"Rutinas y cuidado personal","objective":"Describe tareas domésticas y una actividad cotidiana de cuidado personal.","grammar":"Coloca el adverbio de frecuencia antes de la acción: Saya sering menyapu. También puedes describir una rutina con menyikat gigi o beristirahat."},{"title":"Orden de las actividades","objective":"Explica qué actividad ocurre antes o después de otra.","grammar":"Sebelum significa antes de y sesudah después de. Úsalos para relacionar dos acciones: Saya makan sebelum belajar."}],
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
                            
                                , { vocabId: 'v435', type: 'mc', prompt: '¿Con qué frecuencia estudia en «Saya selalu belajar»?', audioText: 'Saya selalu belajar.', options: ["Siempre estudio","A veces estudio","Nunca estudio"], answer: 0, explanation: 'Selalu significa siempre.' }
                            ,
                                        {
                                            "vocabId": "v436",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «biasanya»?",
                                            "options": [
                                                "Normalmente / por lo general",
                                                "Siempre",
                                                "Rara vez"
                                            ],
                                            "answer": 0,
                                            "explanation": "Biasanya significa normalmente o por lo general."
                                        },
                                        {
                                            "vocabId": "v441",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «menyikat gigi»?",
                                            "options": [
                                                "Cepillarse los dientes",
                                                "Barrer",
                                                "Descansar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Menyikat gigi significa cepillarse los dientes."
                                        },
                                        {
                                            "vocabId": "v444",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «sesudah»?",
                                            "options": [
                                                "Después de",
                                                "Antes de",
                                                "A veces"
                                            ],
                                            "answer": 0,
                                            "explanation": "Sesudah significa después de."
                                        }
]
                        },
                        {
                            id: 'a1_u30',
                            title: 'Unidad 30: Pedir ayuda con cortesía',
                            desc: 'Usar expresiones básicas para disculparse, pedir permiso y solicitar ayuda.',
                            grammar: 'Permisi se usa para llamar la atención o pasar; maaf para disculparse; silakan para invitar o dar paso. Tolong suele introducir una petición de ayuda o una acción, pero no equivale automáticamente a «por favor» en todos los contextos.',
                            lessonPlans: [{"title":"Disculpas y cortesía","objective":"Distingue expresiones para disculparte, pedir paso y ofrecer ayuda.","grammar":"Maaf sirve para disculparse; permisi para llamar la atención o pedir paso; silakan para invitar o dar paso. Bantuan nombra la ayuda."},{"title":"Pedir aclaraciones","objective":"Pide que repitan algo y explica cuando no entiendes.","grammar":"Puedes decir Tolong ulangi pelan-pelan para pedir que repitan despacio. Saya tidak mengerti expresa que no entiendes."},{"title":"Esperar y disculparse por un retraso","objective":"Usa expresiones breves para pedir que alguien espere y explicar un retraso.","grammar":"Tunggu puede funcionar como una indicación breve: Tunggu sebentar. Para disculparte por llegar tarde, puedes decir Maaf, saya terlambat."}],
                            vocab: [
                                { id: 'v445', idn: 'Maaf', esp: 'Perdón / lo siento', ex: 'Maaf, saya terlambat.', exEsp: 'Perdón, llego tarde.' },
                                { id: 'v446', idn: 'Permisi', esp: 'Con permiso / disculpe', ex: 'Permisi, boleh lewat?', exEsp: 'Con permiso, ¿puedo pasar?' },
                                { id: 'v447', idn: 'Silakan', esp: 'Adelante / por favor (al invitar)', ex: 'Silakan duduk.', exEsp: 'Por favor, siéntese.' },
                                { id: 'v448', idn: 'Bantuan', esp: 'Ayuda / asistencia', ex: 'Saya perlu bantuan.', exEsp: 'Necesito ayuda.' },
                                { id: 'v449', idn: 'Ulangi', esp: 'Repite / repita (imperativo)', ex: 'Tolong ulangi.', exEsp: 'Por favor, repite.' },
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
                            
                                , { vocabId: 'v449', type: 'mc', prompt: '¿Qué pide la persona en «Tolong ulangi»?', audioText: 'Tolong ulangi.', options: ["Por favor, repítalo","Por favor, espere","Hable más rápido"], answer: 0, explanation: 'Ulangi es el imperativo de repetir.' }
                            ,
                                        {
                                            "vocabId": "v447",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «silakan» en una invitación?",
                                            "options": [
                                                "Adelante / por favor (al invitar)",
                                                "Con permiso",
                                                "Perdón"
                                            ],
                                            "answer": 0,
                                            "explanation": "Silakan se usa para invitar o dar paso; el contexto determina la traducción."
                                        },
                                        {
                                            "vocabId": "v454",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «terlambat»?",
                                            "options": [
                                                "Tarde / con retraso",
                                                "Temprano",
                                                "Despacio"
                                            ],
                                            "answer": 0,
                                            "explanation": "Terlambat significa tarde o con retraso."
                                        }
]
                        },
                        {
                            id: 'a1_u31',
                            title: 'Unidad 31: Describir personas',
                            desc: 'Describir de forma sencilla la apariencia y algunas cualidades de una persona.',
                            grammar: 'En una descripción sencilla, el adjetivo suele ir después del sustantivo o del sujeto: Dia tinggi (es alto/a), Teman saya ramah (mi amigo/a es amable). El contexto indica a quién se refiere dia; el indonesio no marca género gramatical en ese pronombre.',
                            lessonPlans: [{"title":"Estatura y personalidad","objective":"Describe la estatura y una cualidad sencilla de una persona.","grammar":"Hidung significa nariz. En una descripción básica, coloca el adjetivo después del sujeto: Dia tinggi, Dia pendek y Teman saya ramah."},{"title":"Edad y rasgos físicos","objective":"Describe la edad y algunos rasgos físicos con frases breves.","grammar":"El sustantivo puede ir seguido de un adjetivo: rambut panjang. Tua y muda describen edad; panjang describe longitud."},{"title":"Gafas y sonrisa","objective":"Añade detalles sencillos a la descripción de una persona.","grammar":"Usa punya para expresar posesión: Dia punya kacamata. Puedes combinar dos rasgos ya conocidos: Dia punya rambut panjang dan senyum ramah."}],
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
                            
                                , { vocabId: 'v457', type: 'mc', prompt: '¿Cómo describen al amigo en «Teman saya ramah»?', audioText: 'Teman saya ramah.', options: ["Mi amigo es amable","Mi amigo es alto","Mi amigo está cansado"], answer: 0, explanation: 'Ramah significa amable o simpático.' }
                            ,
                                        {
                                            "vocabId": "v456",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pendek» al describir la estatura?",
                                            "options": [
                                                "Bajo/a (de estatura)",
                                                "Alto/a",
                                                "Joven"
                                            ],
                                            "answer": 0,
                                            "explanation": "Pendek significa bajo/a cuando se habla de estatura."
                                        },
                                        {
                                            "vocabId": "v459",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «tua» al describir la edad?",
                                            "options": [
                                                "Mayor / viejo/a (según contexto)",
                                                "Joven",
                                                "Amable"
                                            ],
                                            "answer": 0,
                                            "explanation": "Tua se refiere a una persona mayor o vieja, según el contexto."
                                        },
                                        {
                                            "vocabId": "v462",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «hidung»?",
                                            "options": [
                                                "Nariz",
                                                "Cabello",
                                                "Sonrisa"
                                            ],
                                            "answer": 0,
                                            "explanation": "Hidung significa nariz."
                                        },
                                        {
                                            "vocabId": "v464",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «senyum»?",
                                            "options": [
                                                "Sonrisa",
                                                "Nariz",
                                                "Gafas"
                                            ],
                                            "answer": 0,
                                            "explanation": "Senyum significa sonrisa."
                                        }
]
                        },
                        {
                            id: 'a1_u32',
                            title: 'Unidad 32: Conversaciones prácticas',
                            desc: 'Integrar expresiones breves para desenvolverse en situaciones cotidianas.',
                            grammar: 'En una conversación, combina saludos, preguntas y expresiones de cortesía. Apa kabar? pregunta cómo está alguien; Terima kasih expresa agradecimiento y Sama-sama responde a ese agradecimiento. Elige la expresión según la situación, no como traducción literal palabra por palabra.',
                            lessonPlans: [{"title":"Saludos y respuestas cotidianas","objective":"Inicia una conversación y responde con una expresión sencilla.","grammar":"Apa kabar? pregunta cómo está alguien. Hati-hati significa «ten cuidado» o «con cuidado». Puedes responder Saya lelah y cerrar un agradecimiento con Sama-sama."},{"title":"Conocer a alguien y despedirse","objective":"Usa expresiones formales de encuentro, necesidad y pregunta.","grammar":"Senang bertemu dengan Anda es una expresión formal de encuentro. Sampai jumpa significa «hasta luego» y sirve para despedirse. Perlu expresa necesidad y mengapa pregunta por el motivo."},{"title":"Dar la bienvenida y preguntar el destino","objective":"Da la bienvenida y pregunta adónde se dirige alguien.","grammar":"Ke mana pregunta por el destino. Selamat datang se usa para dar la bienvenida; no es una despedida."}],
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
                            ,
                                        {
                                            "vocabId": "v470",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «senang bertemu dengan Anda»?",
                                            "options": [
                                                "Encantado/a de conocerle (formal)",
                                                "¿Qué tal?",
                                                "De nada"
                                            ],
                                            "answer": 0,
                                            "explanation": "Senang bertemu dengan Anda es una forma formal de decir «Encantado/a de conocerle»."
                                        },
                                        {
                                            "vocabId": "v471",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «perlu»?",
                                            "options": [
                                                "Necesitar / hacer falta",
                                                "Preguntar por qué",
                                                "Despedirse"
                                            ],
                                            "answer": 0,
                                            "explanation": "Perlu expresa necesidad o algo que hace falta."
                                        }
]
                        },
                    ]
                };
