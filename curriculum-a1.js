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
                                { id: 'v17', idn: 'Tiga', esp: 'Tres', ex: 'Tiga', exEsp: 'Tres.' },
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
                                                    "prompt": "Traduce: tres",
                                                    "answer": "Tiga",
                                                    "explanation": "Tiga significa tres."
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
                                                    "modelAnswer": "Tiga buku.",
                                                    "explanation": "Tiga buku significa «Tres libros». Usa un número que conozcas de la unidad."
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
                                                    "prompt": "Traduce: tres",
                                                    "answer": "Tiga",
                                                    "explanation": "Tiga significa tres."
                                          },
                                        {
                                            "vocabId": "v15",
                                            "type": "write",
                                            "prompt": "Escribe una frase con un número o una edad que hayas aprendido.",
                                            "hint": "Escribe una oración completa y revisa el orden de las palabras.",
                                            "modelAnswer": "Tiga buku.",
                                            "explanation": "Tiga buku significa «Tres libros». Usa un número que conozcas de la unidad."
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
                                    "objective": "Amplía el conteo con cuatro y cinco, aprende diez y la palabra edad, y practica cantidades sencillas.",
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
                                    "objective": "Reconoce seis, siete y ocho y recupera los números anteriores para preguntar o responder la edad de una persona.",
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
                                { id: 'v35', idn: 'Hari', esp: 'Día', ex: 'Hari', exEsp: 'Día.' },
                                { id: 'v36', idn: 'Hari ini', esp: 'Hoy / este día', ex: 'Hari ini', exEsp: 'Hoy.' },
                                { id: 'v37', idn: 'Belajar', esp: 'Estudiar / aprender', ex: 'Saya belajar bahasa Indonesia.', exEsp: 'Estudio indonesio.' },
                                { id: 'v38', idn: 'Bekerja', esp: 'Trabajar', ex: 'Ayah saya bekerja.', exEsp: 'Mi padre trabaja.' },
                                { id: 'v50', idn: 'Tidur', esp: 'Dormir', ex: 'Tidur', exEsp: 'Dormir.' },
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
                                    "audioText": "Hari ini",
                                    "options": ["Hoy", "Mañana", "Ayer"],
                                    "answer": 0,
                                    "explanation": "Hari ini significa «Hoy»."
                                },
                                {
                                    "vocabId": "v36",
                                    "type": "mc",
                                    "prompt": "Elige la expresión que significa «hoy»",
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
                                { vocabId: 'v35', type: 'write', prompt: "Escribe una frase breve sobre tu rutina diaria.", hint: "Usa un día o una acción cotidiana que hayas aprendido.", modelAnswer: "Saya makan.", explanation: "Saya makan significa «Como»; makan significa comer." },
                                {"vocabId":"v36","type":"mc","prompt":"¿Qué significa hari ini?","options":["Hoy","Mañana","Ayer"],"answer":0,"explanation":"Hari ini significa hoy."},
                                {"vocabId":"v122","type":"translate_es_id","prompt":"Traduce: mañana","answer":"Besok","explanation":"Besok significa mañana."},
                                {"vocabId":"v44","type":"write","prompt":"Escribe dos frases sobre tu rutina.","hint":"Intenta construir una frase nueva con el vocabulario de la unidad.","modelAnswer":"Hari ini. Saya minum air setiap hari.","explanation":"Usa hari ini, besok o setiap hari."},
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
                                                                                                    "audioText": "Hari ini",
                                                                                                    "options": ["Hoy", "Mañana", "Ayer"],
                                                                                                    "answer": 0,
                                                                                                    "explanation": "Hari ini significa «Hoy»."
                                                                                                },
                        {
                                                                                                    "vocabId": "v36",
                                                                                                    "type": "mc",
                                                                                                    "prompt": "Elige la expresión que significa «hoy»",
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
                        { vocabId: 'v35', type: 'write', prompt: "Escribe una frase breve sobre tu rutina diaria.", hint: "Usa un día o una acción cotidiana que hayas aprendido.", modelAnswer: "Saya makan.", explanation: "Saya makan significa «Como»; makan significa comer." },
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
                        {"vocabId":"v44","type":"write","prompt":"Escribe dos frases sobre tu rutina.","hint":"Intenta construir una frase nueva con el vocabulario de la unidad.","modelAnswer":"Hari ini. Saya minum air setiap hari.","explanation":"Usa hari ini, besok o setiap hari."},
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
                                                    "modelAnswer": "Saya tidur.",
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
                                            "prompt": "Escribe una frase para decir que son las siete.",
                                            "hint": "Usa jam y tujuh.",
                                            "modelAnswer": "Jam tujuh.",
                                            "explanation": "Jam tujuh significa las siete."
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