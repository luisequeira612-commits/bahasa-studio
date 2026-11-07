# Archivo literal del borrador B2 anterior

**Fecha de conservación:** 7 nov 2026  
**Fuente:** `index.html` en `main`, commit `7584bcbe2fbdcb7014c82806836d5e29be30abd7`.  
**Propósito:** conservar sin cambios el objeto B2 que existía antes de la reorganización aprobada. Este archivo es histórico y no representa el currículo B2 activo ni unidades publicadas.

El bloque siguiente se copia literalmente del repositorio. No se han corregido glosas, ejemplos, identificadores ni ejercicios.

```js
id: 'B2',
                    title: 'B2 — Intermedio Alto',
                    units: [
                        {
                            id: 'b2_u1',
                            title: 'Unidad 1: Uso causativo de -kan',
                            desc: 'Matices causativos y beneficio a terceros.',
                            grammar: 'En verbos como membangunkan, -kan aporta un sentido causativo: hacer que otra persona despierte. El sentido concreto de -kan depende del verbo y del contexto.',
                            vocab: [{ id: 'v9', idn: 'Membangunkan', esp: 'Despertar a alguien', ex: 'Saya membangunkan anak.', exEsp: 'Despierto al niño.' }],
                            exercises: [
                                { vocabId: 'v9', type: 'mc', prompt: 'En «membangunkan anak», ¿qué aporta -kan?', options: ['La idea de hacer que alguien despierte', 'Pasado', 'Plural', 'Duda'], answer: 0, explanation: 'Bangun significa despertarse/levantarse; membangunkan significa despertar a otra persona.' },
                            ]
                        },
                        {
                                  "id": "b2_u2",
                                  "title": "Unidad 2: Matices de -kan e -i",
                                  "desc": "Analizar cómo las formas derivadas afectan a participantes, destinatario o resultado.",
                                  "grammar": "Contrasta -kan e -i solo en verbos donde la diferencia esté documentada. Considera quién realiza la acción, qué entidad cambia, a quién se dirige y qué resultado se expresa. La valencia depende del verbo, no de una equivalencia simple con el español.",
                                  "vocab": [
                                            {
                                                      "id": "v231",
                                                      "idn": "Mengirimkan",
                                                      "esp": "Hacer llegar / enviar algo",
                                                      "ex": "Saya mengirimkan dokumen kepada Rina.",
                                                      "exEsp": "Le hago llegar el documento a Rina."
                                            },
                                            {
                                                      "id": "v232",
                                                      "idn": "Mengirimi",
                                                      "esp": "Enviar a alguien",
                                                      "ex": "Saya mengirimi Rina dokumen.",
                                                      "exEsp": "Le envío un documento a Rina."
                                            },
                                            {
                                                      "id": "v233",
                                                      "idn": "Mengisi",
                                                      "esp": "Llenar",
                                                      "ex": "Petugas mengisi formulir.",
                                                      "exEsp": "El empleado llena el formulario."
                                            },
                                            {
                                                      "id": "v234",
                                                      "idn": "Menandai",
                                                      "esp": "Marcar",
                                                      "ex": "Guru menandai jawaban itu.",
                                                      "exEsp": "El profesor marca esa respuesta."
                                            }
                                  ],
                                  "exercises": [
                                            {
                                                      "vocabId": "v231",
                                                      "type": "mc",
                                                      "prompt": "¿Qué se debe comparar para elegir -kan o -i?",
                                                      "options":["La estructura de participantes y el sentido del verbo","Solo el tiempo verbal","Solo el sujeto gramatical"],
                                                      "answer": 0,
                                                      "explanation": "La estructura argumental y el sentido del verbo en la frase completa."
                                            },
                                            {
                                                      "vocabId": "v232",
                                                      "type": "translate_es_id",
                                                      "prompt": "Traduce: enviar a alguien",
                                                      "answer": "Mengirimi",
                                                      "explanation": "Mengirimi significa «Enviar a alguien»."
                                            },
                                            {
                                                      "vocabId": "v233",
                                                      "type": "listen",
                                                      "prompt": "Escucha y escribe la expresión",
                                                      "answer": "Mengisi",
                                                      "explanation": "La forma Mengisi aparece en esta unidad."
                                            },
                                            {
                                                      "vocabId": "v234",
                                                      "type": "write",
                                                      "prompt": "Escribe una frase propia usando Menandai.",
                                                      "hint": "Usa el contexto y la explicación gramatical; no memorices solo una traducción.",
                                                      "modelAnswer": "Guru menandai jawaban itu.",
                                                      "explanation": "Ejemplo orientativo: Guru menandai jawaban itu. — El profesor marca esa respuesta."
                                            }
                                  ]
                        },
                        {
                                  "id": "b2_u3",
                                  "title": "Unidad 3: ke-an — estados y abstracciones",
                                  "desc": "Comprender palabras frecuentes con ke-an en contextos descriptivos y abstractos.",
                                  "grammar": "ke-an aparece en formaciones relacionadas con estados, experiencias y abstracciones, pero también en palabras cuyo significado no se deduce mecánicamente. Aprende familias frecuentes dentro de frases reales.",
                                  "vocab": [
                                            {
                                                      "id": "v235",
                                                      "idn": "Kesehatan",
                                                      "esp": "Salud",
                                                      "ex": "Kesehatan sangat penting.",
                                                      "exEsp": "La salud es muy importante."
                                            },
                                            {
                                                      "id": "v236",
                                                      "idn": "Kesulitan",
                                                      "esp": "Dificultad",
                                                      "ex": "Mereka mengalami kesulitan.",
                                                      "exEsp": "Ellos experimentan dificultades."
                                            },
                                            {
                                                      "id": "v237",
                                                      "idn": "Kedinginan",
                                                      "esp": "Tener frío",
                                                      "ex": "Saya kedinginan.",
                                                      "exEsp": "Tengo frío."
                                            },
                                            {
                                                      "id": "v238",
                                                      "idn": "Kebersihan",
                                                      "esp": "Limpieza",
                                                      "ex": "Kebersihan ruang kelas penting.",
                                                      "exEsp": "La limpieza del aula es importante."
                                            }
                                  ],
                                  "exercises": [
                                            {
                                                      "vocabId": "v235",
                                                      "type": "mc",
                                                      "prompt": "¿ke-an siempre tiene una traducción única?",
                                                      "options":["No; depende de la palabra y el contexto","Sí; siempre indica pasado","Sí; siempre indica plural"],
                                                      "answer": 0,
                                                      "explanation": "No. El significado depende de la palabra derivada y del contexto."
                                            },
                                            {
                                                      "vocabId": "v236",
                                                      "type": "translate_es_id",
                                                      "prompt": "Traduce: dificultad",
                                                      "answer": "Kesulitan",
                                                      "explanation": "Kesulitan significa «Dificultad»."
                                            },
                                            {
                                                      "vocabId": "v237",
                                                      "type": "listen",
                                                      "prompt": "Escucha y escribe la expresión",
                                                      "answer": "Kedinginan",
                                                      "explanation": "La forma Kedinginan aparece en esta unidad."
                                            },
                                            {
                                                      "vocabId": "v238",
                                                      "type": "write",
                                                      "prompt": "Escribe una frase propia usando Kebersihan.",
                                                      "hint": "Usa el contexto y la explicación gramatical; no memorices solo una traducción.",
                                                      "modelAnswer": "Kebersihan ruang kelas penting.",
                                                      "explanation": "Ejemplo orientativo: Kebersihan ruang kelas penting. — La limpieza del aula es importante."
                                            }
                                  ]
                        },
                        {
                                  "id": "b2_u4",
                                  "title": "Unidad 4: Nominalizaciones peN-, peN-an y per-an",
                                  "desc": "Interpretar nombres de personas, procesos e instituciones en textos informativos.",
                                  "grammar": "Las familias peN-, peN-an y per-an aparecen en registros formales, pero pueden mostrar cambios de forma y significados lexicalizados. Analiza raíz, palabra derivada y contexto.",
                                  "vocab": [
                                            {
                                                      "id": "v239",
                                                      "idn": "Penelitian",
                                                      "esp": "Investigación",
                                                      "ex": "Penelitian itu berlangsung lama.",
                                                      "exEsp": "Esa investigación duró mucho."
                                            },
                                            {
                                                      "id": "v240",
                                                      "idn": "Pekerjaan",
                                                      "esp": "Trabajo / empleo",
                                                      "ex": "Pekerjaan saya menarik.",
                                                      "exEsp": "Mi trabajo es interesante."
                                            },
                                            {
                                                      "id": "v241",
                                                      "idn": "Perjalanan",
                                                      "esp": "Viaje / trayecto",
                                                      "ex": "Perjalanan kami aman.",
                                                      "exEsp": "Nuestro viaje fue seguro."
                                            },
                                            {
                                                      "id": "v242",
                                                      "idn": "Peraturan",
                                                      "esp": "Reglamento",
                                                      "ex": "Peraturan itu berlaku.",
                                                      "exEsp": "Ese reglamento está vigente."
                                            }
                                  ],
                                  "exercises": [
                                            {
                                                      "vocabId": "v239",
                                                      "type": "mc",
                                                      "prompt": "¿Qué estrategia ayuda a entender una nominalización?",
                                                      "options":["Examinar la palabra, su familia y el contexto","Traducir el prefijo de forma literal","Ignorar el resto de la oración"],
                                                      "answer": 0,
                                                      "explanation": "Examinar la palabra, su familia y el contexto."
                                            },
                                            {
                                                      "vocabId": "v240",
                                                      "type": "translate_es_id",
                                                      "prompt": "Traduce: trabajo / empleo",
                                                      "answer": "Pekerjaan",
                                                      "explanation": "Pekerjaan significa «Trabajo / empleo»."
                                            },
                                            {
                                                      "vocabId": "v241",
                                                      "type": "listen",
                                                      "prompt": "Escucha y escribe la expresión",
                                                      "answer": "Perjalanan",
                                                      "explanation": "La forma Perjalanan aparece en esta unidad."
                                            },
                                            {
                                                      "vocabId": "v242",
                                                      "type": "write",
                                                      "prompt": "Escribe una frase propia usando Peraturan.",
                                                      "hint": "Usa el contexto y la explicación gramatical; no memorices solo una traducción.",
                                                      "modelAnswer": "Peraturan itu berlaku.",
                                                      "explanation": "Ejemplo orientativo: Peraturan itu berlaku. — Ese reglamento está vigente."
                                            }
                                  ]
                        },
                        {
                                  "id": "b2_u5",
                                  "title": "Unidad 5: Registro, reduplicación y compuestos",
                                  "desc": "Interpretar procesos morfológicos y elegir expresiones apropiadas según el contexto.",
                                  "grammar": "La reduplicación puede expresar pluralidad, distribución, variedad o formar palabras lexicalizadas. Los compuestos combinan elementos léxicos y no son sufijos. Compara ejemplos en textos reales y observa el registro.",
                                  "vocab": [
                                            {
                                                      "id": "v243",
                                                      "idn": "Anak-anak",
                                                      "esp": "Niños",
                                                      "ex": "Anak-anak bermain di taman.",
                                                      "exEsp": "Los niños juegan en el parque."
                                            },
                                            {
                                                      "id": "v244",
                                                      "idn": "Buku-buku",
                                                      "esp": "Libros",
                                                      "ex": "Buku-buku itu baru.",
                                                      "exEsp": "Esos libros son nuevos."
                                            },
                                            {
                                                      "id": "v245",
                                                      "idn": "Rumah sakit",
                                                      "esp": "Hospital",
                                                      "ex": "Rumah sakit itu dekat dari sini.",
                                                      "exEsp": "Ese hospital está cerca de aquí."
                                            },
                                            {
                                                      "id": "v246",
                                                      "idn": "Kerja sama",
                                                      "esp": "Cooperación",
                                                      "ex": "Kerja sama itu penting.",
                                                      "exEsp": "Esa cooperación es importante."
                                            }
                                  ],
                                  "exercises": [
                                            {
                                                      "vocabId": "v243",
                                                      "type": "mc",
                                                      "prompt": "¿La reduplicación siempre significa plural?",
                                                      "options":["No; también puede expresar distribución o formar palabras lexicalizadas","Sí; siempre indica plural","No; solo marca el pasado"],
                                                      "answer": 0,
                                                      "explanation": "No; puede expresar varios sentidos o formar palabras lexicalizadas según el caso."
                                            },
                                            {
                                                      "vocabId": "v244",
                                                      "type": "translate_es_id",
                                                      "prompt": "Traduce: libros",
                                                      "answer": "Buku-buku",
                                                      "explanation": "Buku-buku significa «Libros»."
                                            },
                                            {
                                                      "vocabId": "v245",
                                                      "type": "listen",
                                                      "prompt": "Escucha y escribe la expresión",
                                                      "answer": "Rumah sakit",
                                                      "explanation": "La forma Rumah sakit aparece en esta unidad."
                                            },
                                            {
                                                      "vocabId": "v246",
                                                      "type": "write",
                                                      "prompt": "Escribe una frase propia usando Kerja sama.",
                                                      "hint": "Usa el contexto y la explicación gramatical; no memorices solo una traducción.",
                                                      "modelAnswer": "Kerja sama itu penting.",
                                                      "explanation": "Ejemplo orientativo: Kerja sama itu penting. — Esa cooperación es importante."
                                            }
                                  ]
                        }
                    ]
                }
```

## Inventario del borrador conservado

| Unidad antigua | Tema | IDs de vocabulario | Ejercicios existentes |
|---|---|---|---:|
| B2 U1 | Uso causativo de `-kan` | `v9` | 1 |
| B2 U2 | Matices de `-kan` e `-i` | `v231`–`v234` | 4 |
| B2 U3 | `ke-an`: estados y abstracciones | `v235`–`v238` | 4 |
| B2 U4 | Nominalizaciones `peN-`, `peN-an`, `per-an` | `v239`–`v242` | 4 |
| B2 U5 | Registro, reduplicación y compuestos | `v243`–`v246` | 4 |

**Total conservado:** 5 unidades, 17 entradas de vocabulario y 17 ejercicios. La cifra es un inventario del borrador antiguo, no una medida de unidades B2 aprobadas.

## Precauciones para la migración

- No reutilizar automáticamente el ID `v9`: comprobar primero su unicidad y significado en todo A1/A2/B1.
- Los IDs `v231`–`v246` también deben pasar una comprobación global antes de cualquier reutilización.
- La antigua U3 de `ke-an` se solapa temáticamente con contenido B1 ya desarrollado; conservarla no implica que deba repetirse en B2.
- Las unidades antiguas no cumplen el contrato actual de 14–22 ejercicios por unidad ni la variedad mínima de tipos; deben ampliarse o quedar solo como archivo.
