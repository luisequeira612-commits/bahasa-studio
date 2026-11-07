# Contenido desplazado de B1 U10–U12

Fecha: 6 de noviembre de 2026. Fuente: objetos curriculares retirados de `CourseData` en `index.html` al aplicar la reorganización autorizada por el usuario.

Este archivo conserva literalmente los tres objetos anteriores para que sus elementos puedan revisarse y asignarse a futuras unidades. No se cargan desde aquí en la aplicación ni se consideran aprobados para reintroducción automática.

## Resolución de vocabulario repetido

Se comprobó el currículo activo A1/A2 antes de crear entradas nuevas. Se mantienen los IDs canónicos ya existentes y no se duplican estas palabras en B1:
- `pengalaman`: A2, ID `a2u12_pengalaman`.
- `kesempatan`: A2, ID `a2u12_kesempatan`.
- `perjalanan`: A2, ID `a2u14_perjalanan`.
- `pertemuan`: A2, ID `a2u15_pertemuan`.
- `kebersihan`: A2, ID `a2u20_kebersihan`.
- `keluarga`: A1, ID `v20`.

Estas formas pueden reaparecer como conocimientos previos en explicaciones y comparaciones, pero no se vuelven a contabilizar como vocabulario nuevo. Se crean entradas B1 nuevas solo para nueve formas de la lista del usuario: `pelajaran`, `pekerjaan`, `pertanyaan`, `percakapan`, `perkenalan`, `kesehatan`, `kecelakaan`, `keadaan` y `kebudayaan`.

## Objetos originales preservados

### U10

```js
{
                            id: 'b1_u10',
                            title: 'Unidad 10: Comunicarse con cortesía formal',
                            desc: 'Interpreta peticiones formales y formula mensajes breves en contextos de servicio o trabajo.',
                            grammar: 'Las expresiones formales pueden suavizar una petición o indicar disponibilidad. La elección depende de la relación entre interlocutores y del contexto; no son intercambiables en todas las situaciones.',
                            vocab: [
                                { id: 'b1u10_mohon', idn: 'Mohon', esp: 'Por favor; se ruega', ex: 'Mohon tunggu sebentar.', exEsp: 'Por favor, espere un momento.' },
                                { id: 'b1u10_harap', idn: 'Harap', esp: 'Se ruega; se espera que', ex: 'Harap mengisi formulir ini.', exEsp: 'Se ruega llenar este formulario.' },
                                { id: 'b1u10_menghubungi', idn: 'Menghubungi', esp: 'Ponerse en contacto con', ex: 'Silakan menghubungi kantor kami.', exEsp: 'Por favor, póngase en contacto con nuestra oficina.' },
                                { id: 'b1u10_bersedia', idn: 'Bersedia', esp: 'Estar dispuesto/a', ex: 'Apakah Anda bersedia hadir besok?', exEsp: '¿Está usted dispuesto/a a asistir mañana?' },
                                { id: 'b1u10_tersedia', idn: 'Tersedia', esp: 'Disponible', ex: 'Informasi lebih lanjut tersedia di situs resmi.', exEsp: 'Hay más información disponible en el sitio oficial.' }
                            ],
                            exercises: [
                                { vocabId: 'b1u10_mohon', type: 'mc', prompt: '¿Qué tono aporta «mohon» a una petición?', options: ['Cortés o formal', 'Enfadado', 'Informal y familiar'], answer: 0, explanation: 'Mohon se usa en peticiones corteses o formales.' },
                                { vocabId: 'b1u10_harap', type: 'translate_es_id', prompt: 'Traduce al indonesio: se ruega', answer: 'Harap', explanation: 'Harap puede introducir una petición o indicación formal.' },
                                { vocabId: 'b1u10_menghubungi', type: 'mc', prompt: '¿Qué significa «menghubungi»?', options: ['Ponerse en contacto con', 'Esperar', 'Asistir'], answer: 0, explanation: 'Menghubungi significa contactar o ponerse en contacto con alguien.' },
                                { vocabId: 'b1u10_bersedia', type: 'translate_es_id', prompt: 'Traduce al indonesio: estar dispuesto/a', answer: 'Bersedia', explanation: 'Bersedia expresa disposición para hacer algo.' },
                                { vocabId: 'b1u10_tersedia', type: 'write', prompt: 'Escribe una frase formal que use «tersedia» para indicar que hay información disponible.', hint: 'Puedes mencionar información en un sitio oficial.', modelAnswer: 'Informasi tersedia di situs resmi.', explanation: 'Tersedia indica que algo está disponible.' }
                            ]
                        }
```

### U11

```js
{
                            id: 'b1_u11',
                            title: 'Unidad 11: Aclarar, negociar y resolver malentendidos',
                            desc: 'Pide aclaraciones, comprueba lo que otra persona quiere decir y propone una alternativa.',
                            grammar: 'En una interacción, las preguntas de aclaración y las reformulaciones ayudan a reparar malentendidos. Atiende a la intención y al tono: una petición de repetición no es lo mismo que expresar desacuerdo.',
                            vocab: [
                                { id: 'b1u11_bisa_diulangi', idn: 'Bisa diulangi?', esp: '¿Se puede repetir?; ¿podría repetirlo?', ex: 'Maaf, bisa diulangi?', exEsp: 'Disculpe, ¿podría repetirlo?' },
                                { id: 'b1u11_maksud_saya', idn: 'Maksud saya', esp: 'Lo que quiero decir es; me refiero a', ex: 'Maksud saya, kita bertemu besok.', exEsp: 'Lo que quiero decir es que nos vemos mañana.' },
                                { id: 'b1u11_maksud_anda', idn: 'Maksud Anda', esp: 'Lo que usted quiere decir', ex: 'Apa maksud Anda?', exEsp: '¿Qué quiere decir usted?' },
                                { id: 'b1u11_bagaimana_kalau', idn: 'Bagaimana kalau', esp: '¿Qué tal si…?; ¿y si…?', ex: 'Bagaimana kalau kita mulai sekarang?', exEsp: '¿Qué tal si empezamos ahora?' },
                                { id: 'b1u11_kalau_begitu', idn: 'Kalau begitu', esp: 'En ese caso; entonces', ex: 'Kalau begitu, saya setuju.', exEsp: 'En ese caso, estoy de acuerdo.' }
                            ],
                            exercises: [
                                { vocabId: 'b1u11_bisa_diulangi', type: 'mc', prompt: '¿Qué expresión sirve para pedir que repitan algo?', options: ['Maaf, bisa diulangi?', 'Saya setuju.', 'Selamat malam.'], answer: 0, explanation: 'Bisa diulangi? pide que repitan una información.' },
                                { vocabId: 'b1u11_kalau_begitu', type: 'translate_es_id', prompt: 'Traduce al indonesio: en ese caso', answer: 'Kalau begitu', explanation: 'Kalau begitu introduce una consecuencia o decisión a partir de lo anterior.' },
                                { vocabId: 'b1u11_bagaimana_kalau', type: 'mc', prompt: '¿Qué función tiene «bagaimana kalau»?', options: ['Proponer una opción', 'Pedir disculpas', 'Indicar una fecha pasada'], answer: 0, explanation: 'Bagaimana kalau introduce una propuesta o sugerencia.' },
                                { vocabId: 'b1u11_maksud_anda', type: 'translate_es_id', prompt: 'Traduce al indonesio: ¿qué quiere decir usted?', answer: 'Apa maksud Anda?', explanation: 'Apa maksud Anda? pregunta por el sentido de lo que otra persona ha dicho.' },
                                { vocabId: 'b1u11_maksud_saya', type: 'write', prompt: 'Escribe dos frases para aclarar una idea usando «maksud saya».', hint: 'Reformula la idea con palabras más concretas.', modelAnswer: 'Kita bertemu pada hari Jumat. Maksud saya, setelah makan siang.', explanation: 'Maksud saya introduce una aclaración o reformulación.' }
                            ]
                        }
```

### U12

```js
{
                            id: 'b1_u12',
                            title: 'Unidad 12: Integrar información y presentar conclusiones',
                            desc: 'Resume una experiencia o un texto breve, explica su propósito y responde a una idea principal.',
                            grammar: 'En una síntesis, distingue la experiencia o fuente, la explicación y la conclusión. Organiza las frases para que cada referencia sea clara y la conclusión se apoye en la información presentada.',
                            vocab: [
                                { id: 'b1u12_pengalaman', idn: 'Pengalaman', esp: 'Experiencia', ex: 'Saya ingin menceritakan pengalaman saya.', exEsp: 'Quiero contar mi experiencia.' },
                                { id: 'b1u12_menjelaskan', idn: 'Menjelaskan', esp: 'Explicar', ex: 'Dia menjelaskan proses itu dengan jelas.', exEsp: 'Él/ella explica el proceso con claridad.' },
                                { id: 'b1u12_menanggapi', idn: 'Menanggapi', esp: 'Responder a; reaccionar ante', ex: 'Saya menanggapi pertanyaan itu.', exEsp: 'Respondo a esa pregunta.' },
                                { id: 'b1u12_kesimpulan', idn: 'Kesimpulan', esp: 'Conclusión', ex: 'Kesimpulan laporan itu cukup jelas.', exEsp: 'La conclusión del informe es bastante clara.' },
                                { id: 'b1u12_tujuan', idn: 'Tujuan', esp: 'Objetivo; propósito', ex: 'Tujuan kegiatan ini adalah membantu warga.', exEsp: 'El propósito de esta actividad es ayudar a los residentes.' }
                            ],
                            exercises: [
                                { vocabId: 'b1u12_pengalaman', type: 'mc', prompt: '¿Qué significa «pengalaman»?', options: ['Experiencia', 'Conclusión', 'Objetivo'], answer: 0, explanation: 'Pengalaman se refiere a una experiencia vivida.' },
                                { vocabId: 'b1u12_menjelaskan', type: 'translate_es_id', prompt: 'Traduce al indonesio: explicar', answer: 'Menjelaskan', explanation: 'Menjelaskan significa explicar algo.' },
                                { vocabId: 'b1u12_menanggapi', type: 'mc', prompt: '¿Qué significa «menanggapi pertanyaan»?', options: ['Responder a una pregunta', 'Escribir un informe', 'Cambiar de objetivo'], answer: 0, explanation: 'Menanggapi pertanyaan es responder a una pregunta o reaccionar ante ella.' },
                                { vocabId: 'b1u12_kesimpulan', type: 'translate_es_id', prompt: 'Traduce al indonesio: conclusión', answer: 'Kesimpulan', explanation: 'Kesimpulan es la conclusión o resultado final de un razonamiento.' },
                                { vocabId: 'b1u12_tujuan', type: 'write', prompt: 'Escribe dos frases que expliquen el propósito de una actividad usando «tujuan».', hint: 'Presenta el propósito y después una acción concreta.', modelAnswer: 'Tujuan kegiatan ini adalah membantu warga. Kami menjelaskan informasi dengan sederhana.', explanation: 'El modelo expresa un propósito y una acción relacionada.' }
                            ]
                        }
```
