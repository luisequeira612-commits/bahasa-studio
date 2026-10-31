/* Extracted verbatim from the original CourseData object. Integrity is pinned in tests. */
window.BAHASA_CURRICULUM_A2 = {
                    id: 'A2',
                    title: 'A2 — Básico Avanzado',
                    units: [
                        {
                            id: 'a2_u1',
                            title: 'Unidad 1: Días, meses y fechas',
                            desc: 'Habla de los días de la semana, los meses y fechas sencillas.',
                            grammar: 'Los días y los meses se escriben con mayúscula inicial en los nombres propios de los días y meses en indonesio. Para preguntar la fecha puedes usar «Tanggal berapa hari ini?».',
                            vocab: [
                                { id: 'a2u1_senin', idn: 'Senin', esp: 'Lunes', ex: 'Hari ini hari Senin.', exEsp: 'Hoy es lunes.' },
                                { id: 'a2u1_selasa', idn: 'Selasa', esp: 'Martes', ex: 'Besok hari Selasa.', exEsp: 'Mañana es martes.' },
                                { id: 'a2u1_rabu', idn: 'Rabu', esp: 'Miércoles', ex: 'Hari ini hari Rabu.', exEsp: 'Hoy es miércoles.' },
                                { id: 'a2u1_kamis', idn: 'Kamis', esp: 'Jueves', ex: 'Besok hari Kamis.', exEsp: 'Mañana es jueves.' },
                                { id: 'a2u1_jumat', idn: 'Jumat', esp: 'Viernes', ex: 'Hari ini hari Jumat.', exEsp: 'Hoy es viernes.' },
                                { id: 'a2u1_sabtu', idn: 'Sabtu', esp: 'Sábado', ex: 'Hari ini hari Sabtu.', exEsp: 'Hoy es sábado.' },
                                { id: 'a2u1_minggu', idn: 'Minggu', esp: 'Domingo', ex: 'Besok hari Minggu.', exEsp: 'Mañana es domingo.' },
                                { id: 'a2u1_tanggal', idn: 'Tanggal', esp: 'Fecha; día del mes', ex: 'Tanggal berapa hari ini?', exEsp: '¿Qué fecha es hoy?' },
                                { id: 'a2u1_bulan', idn: 'Bulan', esp: 'Mes', ex: 'Sekarang bulan Januari.', exEsp: 'Ahora es enero.' },
                                { id: 'a2u1_musim', idn: 'Musim', esp: 'Estación; temporada', ex: 'Di Indonesia ada musim hujan.', exEsp: 'En Indonesia hay una estación lluviosa.' },
                                { id: 'a2u1_januari', idn: 'Januari', esp: 'Enero', ex: 'Sekarang bulan Januari.', exEsp: 'Ahora es enero.' },
                                { id: 'a2u1_februari', idn: 'Februari', esp: 'Febrero', ex: 'Sekarang bulan Februari.', exEsp: 'Ahora es febrero.' },
                                { id: 'a2u1_maret', idn: 'Maret', esp: 'Marzo', ex: 'Sekarang bulan Maret.', exEsp: 'Ahora es marzo.' },
                                { id: 'a2u1_april', idn: 'April', esp: 'Abril', ex: 'Sekarang bulan April.', exEsp: 'Ahora es abril.' },
                                { id: 'a2u1_mei', idn: 'Mei', esp: 'Mayo', ex: 'Sekarang bulan Mei.', exEsp: 'Ahora es mayo.' },
                                { id: 'a2u1_juni', idn: 'Juni', esp: 'Junio', ex: 'Sekarang bulan Juni.', exEsp: 'Ahora es junio.' },
                                { id: 'a2u1_juli', idn: 'Juli', esp: 'Julio', ex: 'Sekarang bulan Juli.', exEsp: 'Ahora es julio.' },
                                { id: 'a2u1_agustus', idn: 'Agustus', esp: 'Agosto', ex: 'Sekarang bulan Agustus.', exEsp: 'Ahora es agosto.' },
                                { id: 'a2u1_musim_hujan', idn: 'Musim hujan', esp: 'Estación lluviosa', ex: 'Di Indonesia ada musim hujan.', exEsp: 'En Indonesia hay una estación lluviosa.' },
                                { id: 'a2u1_september', idn: 'September', esp: 'Septiembre', ex: 'Sekarang bulan September.', exEsp: 'Ahora es septiembre.' },
                                { id: 'a2u1_oktober', idn: 'Oktober', esp: 'Octubre', ex: 'Sekarang bulan Oktober.', exEsp: 'Ahora es octubre.' },
                                { id: 'a2u1_november', idn: 'November', esp: 'Noviembre', ex: 'Sekarang bulan November.', exEsp: 'Ahora es noviembre.' },
                                { id: 'a2u1_desember', idn: 'Desember', esp: 'Diciembre', ex: 'Sekarang bulan Desember.', exEsp: 'Ahora es diciembre.' },
                                { id: 'a2u1_musim_kemarau', idn: 'Musim kemarau', esp: 'Estación seca', ex: 'Di Indonesia ada musim kemarau.', exEsp: 'En Indonesia hay una estación seca.' }
                            ],
                            lessons: [
                                {
                                    title: 'Lección 1: Los primeros días de la semana',
                                    objective: 'Reconoce y usa los nombres de lunes a jueves.',
                                    grammar: 'Usa «hari» para hablar del día: «Hari ini hari Senin». «Besok» significa mañana.',
                                    vocabIds: ['a2u1_senin', 'a2u1_selasa', 'a2u1_rabu', 'a2u1_kamis'],
                                    exercises: [
                                        { vocabId: 'a2u1_senin', type: 'mc', prompt: '¿Qué día sigue a Senin?', options: ['Selasa', 'Rabu', 'Kamis'], answer: 0, explanation: 'Después de Senin (lunes) viene Selasa (martes).' },
                                        { vocabId: 'a2u1_rabu', type: 'translate_es_id', prompt: 'Traduce: Hoy es miércoles.', answer: 'Hari ini hari Rabu.', explanation: 'Hari ini hari Rabu significa «Hoy es miércoles».' },
                                        { vocabId: 'a2u1_kamis', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Hari ini hari Kamis.', explanation: 'La oración dice «Hoy es jueves».' },
                                        { vocabId: 'a2u1_senin', type: 'order', prompt: 'Ordena: Hoy es lunes.', words: ['Senin', 'hari', 'Hari', 'ini'], correctOrder: ['Hari', 'ini', 'hari', 'Senin'], explanation: 'Hari ini hari Senin significa «Hoy es lunes».' }
                                    ]
                                },
                                {
                                    title: 'Lección 2: Fin de semana y fechas',
                                    objective: 'Nombra viernes, sábado y domingo y pregunta por la fecha.',
                                    grammar: '«Tanggal berapa hari ini?» pregunta qué fecha es hoy. «Tanggal» se refiere al día del mes. Para responder con una fecha completa, se puede usar el patrón «Hari ini tanggal [número] [mes]», por ejemplo «Hari ini tanggal 17 Agustus».',
                                    vocabIds: ['a2u1_jumat', 'a2u1_sabtu', 'a2u1_minggu', 'a2u1_tanggal', 'a2u1_bulan'],
                                    exercises: [
                                        { vocabId: 'a2u1_jumat', type: 'mc', prompt: '¿Qué día viene después de Jumat?', options: ['Sabtu', 'Minggu', 'Kamis'], answer: 0, explanation: 'Después de Jumat (viernes) viene Sabtu (sábado).' },
                                        { vocabId: 'a2u1_tanggal', type: 'translate_es_id', prompt: 'Traduce: ¿Qué fecha es hoy?', answer: 'Tanggal berapa hari ini?', explanation: 'Tanggal berapa hari ini? es una pregunta para saber la fecha.' },
                                        { vocabId: 'a2u1_minggu', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Hari ini hari Minggu.', explanation: 'La oración dice «Hoy es domingo».' },
                                        { vocabId: 'a2u1_sabtu', type: 'write', prompt: 'Escribe una oración para decir que hoy es sábado.', hint: 'Usa «Hari ini hari ...» y el nombre del día.', modelAnswer: 'Hari ini hari Sabtu.', explanation: 'Es un modelo posible; puedes usar el mismo patrón con otro día.' },
                                        { vocabId: 'a2u1_tanggal', type: 'write', prompt: 'Escribe la fecha completa: hoy es 17 de agosto.', hint: 'Usa «Hari ini tanggal ...» seguido del número y el nombre del mes en indonesio.', modelAnswer: 'Hari ini tanggal 17 Agustus.', explanation: 'El patrón propuesto combina «Hari ini tanggal», el número del día y el nombre del mes. La forma y el ejemplo deben considerarse material didáctico beta pendiente de revisión lingüística.' }
                                    ]
                                },
                                {
                                    title: 'Lección 3: Enero a abril',
                                    objective: 'Reconoce los nombres de los primeros cuatro meses del año.',
                                    grammar: 'Los nombres de los meses se usan después de «bulan»: «Sekarang bulan Maret» (Ahora es marzo).',
                                    vocabIds: ['a2u1_musim', 'a2u1_januari', 'a2u1_februari', 'a2u1_maret', 'a2u1_april'],
                                    exercises: [
                                        { vocabId: 'a2u1_musim', type: 'mc', prompt: '¿Qué significa «musim»?', options: ['Estación; temporada', 'Mes', 'Fecha'], answer: 0, explanation: 'Musim significa «estación» o «temporada».' },
                                        { vocabId: 'a2u1_maret', type: 'translate_es_id', prompt: 'Traduce: Ahora es marzo.', answer: 'Sekarang bulan Maret.', explanation: 'Sekarang bulan Maret significa «Ahora es marzo».' },
                                        { vocabId: 'a2u1_april', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Sekarang bulan April.', explanation: 'La oración dice «Ahora es abril».' },
                                        { vocabId: 'a2u1_februari', type: 'order', prompt: 'Ordena: Ahora es febrero.', words: ['bulan', 'Sekarang', 'Februari'], correctOrder: ['Sekarang', 'bulan', 'Februari'], explanation: 'Sekarang bulan Februari significa «Ahora es febrero».' }
                                    ]
                                },
                                {
                                    title: 'Lección 4: Mayo a agosto',
                                    objective: 'Reconoce los meses de mayo a agosto y úsalos en frases breves.',
                                    grammar: 'Para indicar el mes actual, puedes decir «Sekarang bulan ...».',
                                    vocabIds: ['a2u1_mei', 'a2u1_juni', 'a2u1_juli', 'a2u1_agustus', 'a2u1_musim_hujan'],
                                    exercises: [
                                        { vocabId: 'a2u1_musim_hujan', type: 'mc', prompt: '¿Qué significa «musim hujan»?', options: ['Estación lluviosa', 'Estación seca', 'Mes lluvioso'], answer: 0, explanation: 'Musim hujan es la estación lluviosa.' },
                                        { vocabId: 'a2u1_juli', type: 'translate_es_id', prompt: 'Traduce: Ahora es julio.', answer: 'Sekarang bulan Juli.', explanation: 'Sekarang bulan Juli significa «Ahora es julio».' },
                                        { vocabId: 'a2u1_agustus', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Sekarang bulan Agustus.', explanation: 'La oración dice «Ahora es agosto».' },
                                        { vocabId: 'a2u1_juni', type: 'write', prompt: 'Escribe una oración para decir que ahora es junio.', hint: 'Usa «Sekarang bulan ...».', modelAnswer: 'Sekarang bulan Juni.', explanation: 'Juni es junio en indonesio.' }
                                    ]
                                },
                                {
                                    title: 'Lección 5: Septiembre a diciembre',
                                    objective: 'Reconoce los últimos cuatro meses del año.',
                                    grammar: 'Los nombres de los meses no cambian según la persona ni el tiempo de la oración.',
                                    vocabIds: ['a2u1_september', 'a2u1_oktober', 'a2u1_november', 'a2u1_desember', 'a2u1_musim_kemarau'],
                                    exercises: [
                                        { vocabId: 'a2u1_musim_kemarau', type: 'mc', prompt: '¿Qué significa «musim kemarau»?', options: ['Estación seca', 'Estación lluviosa', 'Mes seco'], answer: 0, explanation: 'Musim kemarau es la estación seca.' },
                                        { vocabId: 'a2u1_oktober', type: 'translate_es_id', prompt: 'Traduce: Ahora es octubre.', answer: 'Sekarang bulan Oktober.', explanation: 'Sekarang bulan Oktober significa «Ahora es octubre».' },
                                        { vocabId: 'a2u1_november', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Sekarang bulan November.', explanation: 'La oración dice «Ahora es noviembre».' },
                                        { vocabId: 'a2u1_desember', type: 'order', prompt: 'Ordena: Ahora es diciembre.', words: ['Desember', 'Sekarang', 'bulan'], correctOrder: ['Sekarang', 'bulan', 'Desember'], explanation: 'Sekarang bulan Desember significa «Ahora es diciembre».' }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'a2_u2',
                            title: 'Unidad 2: Expresar cuándo ocurre una acción',
                            desc: 'Distingue acciones ya realizadas, todavía no realizadas, en curso y futuras.',
                            grammar: 'El indonesio no conjuga el verbo para marcar pasado o futuro. Palabras como sudah, belum, sedang y akan aportan información temporal o aspectual; se interpretan dentro de la oración.',
                            vocab: [
                                { id: 'a2u2_sudah', idn: 'Sudah', esp: 'Ya; acción completada', ex: 'Saya sudah makan.', exEsp: 'Ya he comido.' },
                                { id: 'a2u2_belum', idn: 'Belum', esp: 'Todavía no; aún no', ex: 'Saya belum makan.', exEsp: 'Todavía no he comido.' },
                                { id: 'a2u2_sedang', idn: 'Sedang', esp: 'Estar en curso; estar haciendo algo', ex: 'Saya sedang belajar.', exEsp: 'Estoy estudiando.' },
                                { id: 'a2u2_akan', idn: 'Akan', esp: 'Marcador de futuro', ex: 'Saya akan pergi.', exEsp: 'Voy a ir.' },
                                { id: 'a2u2_tadi', idn: 'Tadi', esp: 'Hace un rato; antes hoy', ex: 'Saya makan tadi.', exEsp: 'Comí hace un rato.' },
                                { id: 'a2u2_tadi_pagi', idn: 'Tadi pagi', esp: 'Esta mañana (hace un rato)', ex: 'Saya belajar tadi pagi.', exEsp: 'Estudié esta mañana.' },
                                { id: 'a2u2_tadi_malam', idn: 'Tadi malam', esp: 'Anoche', ex: 'Saya tidur tadi malam.', exEsp: 'Dormí anoche.' },
                                { id: 'a2u2_baru_saja', idn: 'Baru saja', esp: 'Acabar de; hace muy poco', ex: 'Dia baru saja datang.', exEsp: 'Él/ella acaba de llegar.' },
                                { id: 'a2u2_masih', idn: 'Masih', esp: 'Todavía; aún', ex: 'Saya masih di rumah.', exEsp: 'Todavía estoy en casa.' },
                                { id: 'a2u2_sebentar_lagi', idn: 'Sebentar lagi', esp: 'Dentro de poco; en breve', ex: 'Saya akan pergi sebentar lagi.', exEsp: 'Me iré dentro de poco.' },
                                { id: 'a2u2_minggu_depan', idn: 'Minggu depan', esp: 'La semana que viene', ex: 'Saya pergi minggu depan.', exEsp: 'Voy la semana que viene.' },
                                { id: 'a2u2_minggu_lalu', idn: 'Minggu lalu', esp: 'La semana pasada', ex: 'Saya belajar minggu lalu.', exEsp: 'Estudié la semana pasada.' },
                                { id: 'a2u2_bulan_lalu', idn: 'Bulan lalu', esp: 'El mes pasado', ex: 'Saya bekerja bulan lalu.', exEsp: 'Trabajé el mes pasado.' },
                                { id: 'a2u2_bulan_depan', idn: 'Bulan depan', esp: 'El mes que viene', ex: 'Saya pulang bulan depan.', exEsp: 'Regreso a casa el mes que viene.' }
                            ],
                            lessons: [
                                {
                                    title: 'Lección 1: Ya, todavía no, en curso y futuro',
                                    objective: 'Distingue cuatro marcadores temporales frecuentes.',
                                    grammar: 'Sudah indica que algo ya ocurrió; belum, que todavía no; sedang, que está en curso; akan, que ocurrirá después.',
                                    vocabIds: ['a2u2_sudah', 'a2u2_belum', 'a2u2_sedang', 'a2u2_akan'],
                                    exercises: [
                                        { vocabId: 'a2u2_sudah', type: 'mc', prompt: 'En «Saya sudah makan», ¿qué indica sudah?', options: ['La acción ya se completó', 'La acción está en curso', 'La acción ocurrirá después'], answer: 0, explanation: 'Sudah presenta la acción como ya realizada.' },
                                        { vocabId: 'a2u2_belum', type: 'translate_es_id', prompt: 'Traduce: Todavía no he comido.', answer: 'Saya belum makan.', explanation: 'Belum indica que la acción todavía no ha ocurrido.' },
                                        { vocabId: 'a2u2_sedang', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Saya sedang belajar.', explanation: 'Sedang indica que estudiar está en curso.' },
                                        { vocabId: 'a2u2_akan', type: 'order', prompt: 'Ordena: Voy a estudiar.', words: ['belajar', 'Saya', 'akan'], correctOrder: ['Saya', 'akan', 'belajar'], explanation: 'Saya akan belajar expresa una acción futura.' }
                                    ]
                                },
                                {
                                    title: 'Lección 2: Hace un rato y hace muy poco',
                                    objective: 'Sitúa acciones en momentos recientes del día.',
                                    grammar: 'Tadi suele referirse a un momento anterior dentro del día actual. Tadi pagi y tadi malam concretan el momento; baru saja indica que algo ocurrió hace muy poco.',
                                    vocabIds: ['a2u2_tadi', 'a2u2_tadi_pagi', 'a2u2_tadi_malam', 'a2u2_baru_saja'],
                                    exercises: [
                                        { vocabId: 'a2u2_tadi_pagi', type: 'mc', prompt: '¿Qué momento indica «tadi pagi»?', options: ['Esta mañana, hace un rato', 'Mañana por la mañana', 'La semana pasada'], answer: 0, explanation: 'Tadi pagi se refiere a esta mañana, antes del momento actual.' },
                                        { vocabId: 'a2u2_tadi_malam', type: 'translate_es_id', prompt: 'Traduce: Dormí anoche.', answer: 'Saya tidur tadi malam.', explanation: 'Tadi malam sitúa la acción en la noche anterior de hoy.' },
                                        { vocabId: 'a2u2_baru_saja', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Dia baru saja datang.', explanation: 'Baru saja indica que la llegada ocurrió hace muy poco.' },
                                        { vocabId: 'a2u2_tadi', type: 'write', prompt: 'Escribe una frase para decir que estudiaste esta mañana.', hint: 'Usa «Saya belajar tadi pagi». Puedes cambiar la actividad si mantienes el marcador temporal.', modelAnswer: 'Saya belajar tadi pagi.', explanation: 'El modelo sitúa el estudio en esta mañana.' }
                                    ]
                                },
                                {
                                    title: 'Lección 3: Todavía y dentro de poco',
                                    objective: 'Expresa continuidad y proximidad temporal.',
                                    grammar: 'Masih indica que una situación continúa. Sebentar lagi señala que algo ocurrirá dentro de poco; minggu depan sitúa una acción en la semana siguiente.',
                                    vocabIds: ['a2u2_masih', 'a2u2_sebentar_lagi', 'a2u2_minggu_depan'],
                                    exercises: [
                                        { vocabId: 'a2u2_masih', type: 'mc', prompt: 'En «Saya masih di rumah», ¿qué significa masih?', options: ['Todavía; aún', 'Ya; completado', 'Nunca'], answer: 0, explanation: 'Masih expresa que la situación continúa.' },
                                        { vocabId: 'a2u2_sebentar_lagi', type: 'translate_es_id', prompt: 'Traduce: Me iré dentro de poco.', answer: 'Saya akan pergi sebentar lagi.', explanation: 'Sebentar lagi indica que la acción ocurrirá pronto.' },
                                        { vocabId: 'a2u2_minggu_depan', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Saya pergi minggu depan.', explanation: 'Minggu depan significa «la semana que viene».' },
                                        { vocabId: 'a2u2_masih', type: 'order', prompt: 'Ordena: Todavía estoy estudiando.', words: ['belajar', 'masih', 'Saya'], correctOrder: ['Saya', 'masih', 'belajar'], explanation: 'Saya masih belajar expresa que el estudio continúa.' }
                                    ]
                                },
                                {
                                    title: 'Lección 4: La semana y el mes',
                                    objective: 'Habla de la semana y el mes pasados o futuros.',
                                    grammar: 'Minggu lalu y bulan lalu se refieren a periodos pasados; bulan depan señala el mes siguiente. El verbo no cambia de forma.',
                                    vocabIds: ['a2u2_minggu_lalu', 'a2u2_bulan_lalu', 'a2u2_bulan_depan'],
                                    exercises: [
                                        { vocabId: 'a2u2_bulan_lalu', type: 'mc', prompt: '¿Qué significa «bulan lalu»?', options: ['El mes pasado', 'El mes que viene', 'Este mes'], answer: 0, explanation: 'Bulan lalu significa «el mes pasado».' },
                                        { vocabId: 'a2u2_minggu_lalu', type: 'translate_es_id', prompt: 'Traduce: Estudié la semana pasada.', answer: 'Saya belajar minggu lalu.', explanation: 'Minggu lalu sitúa el estudio en la semana pasada.' },
                                        { vocabId: 'a2u2_bulan_depan', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Saya pulang bulan depan.', explanation: 'Bulan depan significa «el mes que viene».' },
                                        { vocabId: 'a2u2_bulan_lalu', type: 'write', prompt: 'Escribe una frase para decir que trabajaste el mes pasado.', hint: 'Usa «Saya bekerja bulan lalu».', modelAnswer: 'Saya bekerja bulan lalu.', explanation: 'El modelo usa bulan lalu para situar el trabajo en el pasado.' }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'a2_u3',
                            title: 'Unidad 3: Ordenar acontecimientos y contar secuencias',
                            desc: 'Conecta acciones para explicar qué ocurrió primero, después y al final.',
                            grammar: 'Los conectores temporales organizan los acontecimientos. Primera posición, continuación y cierre se expresan con palabras como pertama, lalu, kemudian y akhirnya. La forma del verbo no cambia por el pasado.',
                            vocab: [
                                { id: 'a2u3_pertama', idn: 'Pertama', esp: 'Primero; en primer lugar', ex: 'Pertama, saya makan.', exEsp: 'Primero, como.' },
                                { id: 'a2u3_lalu', idn: 'Lalu', esp: 'Luego; después', ex: 'Lalu, saya minum air.', exEsp: 'Luego, bebo agua.' },
                                { id: 'a2u3_kemudian', idn: 'Kemudian', esp: 'Después; a continuación', ex: 'Kemudian, saya pergi.', exEsp: 'Después, voy.' },
                                { id: 'a2u3_setelah_itu', idn: 'Setelah itu', esp: 'Después de eso', ex: 'Setelah itu, saya belajar.', exEsp: 'Después de eso, estudio.' },
                                { id: 'a2u3_akhirnya', idn: 'Akhirnya', esp: 'Finalmente; al final', ex: 'Akhirnya, saya pulang.', exEsp: 'Finalmente, regreso a casa.' },
                                { id: 'a2u3_berikutnya', idn: 'Berikutnya', esp: 'A continuación; lo siguiente', ex: 'Berikutnya, saya membaca buku.', exEsp: 'A continuación, leo un libro.' },
                                { id: 'a2u3_sebelumnya', idn: 'Sebelumnya', esp: 'Antes de eso; previamente', ex: 'Sebelumnya, saya belajar.', exEsp: 'Antes de eso, estudio.' },
                                { id: 'a2u3_selanjutnya', idn: 'Selanjutnya', esp: 'A continuación; después', ex: 'Selanjutnya, saya pergi.', exEsp: 'A continuación, voy.' },
                                { id: 'a2u3_setelah', idn: 'Setelah', esp: 'Después de; una vez que', ex: 'Setelah makan, saya minum air.', exEsp: 'Después de comer, bebo agua.' },
                                { id: 'a2u3_ketika', idn: 'Ketika', esp: 'Cuando', ex: 'Ketika saya makan, dia datang.', exEsp: 'Cuando como, él/ella llega.' },
                                { id: 'a2u3_selama', idn: 'Selama', esp: 'Durante; mientras', ex: 'Selama satu jam, saya belajar.', exEsp: 'Estudio durante una hora.' },
                                { id: 'a2u3_sampai', idn: 'Sampai', esp: 'Hasta', ex: 'Saya belajar sampai malam.', exEsp: 'Estudio hasta la noche.' }
                            ],
                            lessons: [
                                {
                                    title: 'Lección 1: Primero y después',
                                    objective: 'Usa conectores básicos para ordenar dos o más acciones.',
                                    grammar: 'Pertama introduce el primer paso; lalu y kemudian enlazan acciones posteriores. La forma verbal no indica por sí sola si la secuencia es habitual o pasada: el contexto temporal ayuda a interpretarla. «Setiap hari» sitúa una rutina; «kemarin» sitúa un hecho en el día anterior.',
                                    vocabIds: ['a2u3_pertama', 'a2u3_lalu', 'a2u3_kemudian'],
                                    exercises: [
                                        { vocabId: 'a2u3_pertama', type: 'mc', prompt: '¿Qué función cumple «pertama»?', options: ['Presentar el primer paso', 'Indicar el final', 'Indicar el lugar'], answer: 0, explanation: 'Pertama introduce el primer paso de una secuencia.' },
                                        { vocabId: 'a2u3_pertama', type: 'translate_es_id', prompt: 'Traduce: Primero, como.', answer: 'Pertama, saya makan.', explanation: 'Pertama, saya makan presenta la primera acción.' },
                                        { vocabId: 'a2u3_lalu', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Lalu, saya minum air.', explanation: 'Lalu conecta esta acción con una anterior.' },
                                        { vocabId: 'a2u3_kemudian', type: 'order', prompt: 'Ordena: Después, voy.', words: ['pergi', 'Kemudian', 'saya'], correctOrder: ['Kemudian', 'saya', 'pergi'], explanation: 'Kemudian, saya pergi significa «Después, voy».' },
                                        { vocabId: 'a2u3_pertama', type: 'write', prompt: 'La misma secuencia puede describir una rutina o un hecho pasado. Escribe en español qué contexto expresa cada inicio: «Setiap hari» y «Kemarin». Después, conserva en indonesio la secuencia «Pertama, saya makan. Lalu, saya minum air.»', hint: 'Setiap hari = cada día; kemarin = ayer. No cambies la forma del verbo para marcar pasado.', modelAnswer: 'Setiap hari = rutina habitual. Kemarin = hecho situado en el día anterior. En ambos casos, la secuencia indonesia mantiene «saya makan» y «saya minum».', explanation: 'El contexto temporal sitúa la secuencia; los verbos indonesios del ejemplo no se conjugan como pasado.' }
                                    ]
                                },
                                {
                                    title: 'Lección 2: Después de eso y finalmente',
                                    objective: 'Marca una continuación y el cierre de una secuencia.',
                                    grammar: 'Setelah itu enlaza con lo que sigue; akhirnya presenta el resultado o el último acontecimiento.',
                                    vocabIds: ['a2u3_setelah_itu', 'a2u3_akhirnya', 'a2u3_berikutnya'],
                                    exercises: [
                                        { vocabId: 'a2u3_setelah_itu', type: 'mc', prompt: '¿Qué significa «setelah itu»?', options: ['Después de eso', 'Antes de eso', 'Al mismo tiempo'], answer: 0, explanation: 'Setelah itu introduce una acción posterior.' },
                                        { vocabId: 'a2u3_setelah_itu', type: 'translate_es_id', prompt: 'Traduce: Después de eso, estudio.', answer: 'Setelah itu, saya belajar.', explanation: 'Setelah itu conecta esta acción con una anterior.' },
                                        { vocabId: 'a2u3_akhirnya', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Akhirnya, saya pulang.', explanation: 'Akhirnya señala el cierre de la secuencia.' },
                                        { vocabId: 'a2u3_berikutnya', type: 'write', prompt: 'Escribe una frase para indicar cuál es la siguiente actividad.', hint: 'Usa «Berikutnya, saya membaca buku».', modelAnswer: 'Berikutnya, saya membaca buku.', explanation: 'Berikutnya introduce el paso siguiente.' }
                                    ]
                                },
                                {
                                    title: 'Lección 3: Antes y a continuación',
                                    objective: 'Relaciona un hecho con lo que ocurrió antes y con el paso siguiente.',
                                    grammar: 'Sebelumnya remite a un momento anterior. Selanjutnya presenta el siguiente paso. Setelah introduce un hecho que sirve de referencia temporal.',
                                    vocabIds: ['a2u3_sebelumnya', 'a2u3_selanjutnya', 'a2u3_setelah'],
                                    exercises: [
                                        { vocabId: 'a2u3_sebelumnya', type: 'mc', prompt: '¿Qué significa «sebelumnya»?', options: ['Antes de eso; previamente', 'Después de eso', 'Finalmente'], answer: 0, explanation: 'Sebelumnya remite a algo anterior.' },
                                        { vocabId: 'a2u3_selanjutnya', type: 'translate_es_id', prompt: 'Traduce: A continuación, estudio.', answer: 'Selanjutnya, saya belajar.', explanation: 'Selanjutnya presenta el paso siguiente.' },
                                        { vocabId: 'a2u3_setelah', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Setelah makan, saya minum air.', explanation: 'Setelah introduce la acción de comer como referencia temporal.' },
                                        { vocabId: 'a2u3_sebelumnya', type: 'order', prompt: 'Ordena: Antes de eso, estudio.', words: ['saya', 'Sebelumnya', 'belajar'], correctOrder: ['Sebelumnya', 'saya', 'belajar'], explanation: 'Sebelumnya, saya belajar significa «Antes de eso, estudio».' }
                                    ]
                                },
                                {
                                    title: 'Lección 4: Cuando, durante y hasta',
                                    objective: 'Expresa relaciones temporales sencillas entre dos acontecimientos.',
                                    grammar: 'Ketika introduce un momento o una situación; selama indica duración; sampai marca el límite temporal.',
                                    vocabIds: ['a2u3_ketika', 'a2u3_selama', 'a2u3_sampai'],
                                    exercises: [
                                        { vocabId: 'a2u3_ketika', type: 'mc', prompt: '¿Qué significa «ketika»?', options: ['Cuando', 'Durante', 'Hasta'], answer: 0, explanation: 'Ketika introduce una referencia temporal equivalente a «cuando».' },
                                        { vocabId: 'a2u3_selama', type: 'translate_es_id', prompt: 'Traduce: Estudio durante una hora.', answer: 'Selama satu jam, saya belajar.', explanation: 'Selama expresa la duración de la actividad.' },
                                        { vocabId: 'a2u3_ketika', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Ketika saya makan, dia datang.', explanation: 'Ketika introduce el momento en que ocurre la llegada.' },
                                        { vocabId: 'a2u3_sampai', type: 'write', prompt: 'Escribe una frase para decir que estudias hasta la noche.', hint: 'Usa «Saya belajar sampai malam».', modelAnswer: 'Saya belajar sampai malam.', explanation: 'Sampai marca el límite temporal de la actividad.' }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'a2_u4',
                            title: 'Unidad 4: Narrar una jornada cotidiana',
                            desc: 'Combina horarios, actividades y conectores para contar cómo transcurre un día.',
                            grammar: 'Para narrar una rutina, combina expresiones temporales con verbos que ya conoces. El verbo no cambia por indicar pasado o futuro; puedes añadir marcadores como sudah, sedang o akan cuando corresponda.',
                            vocab: [
                                { id: 'a2u4_rutinitas', idn: 'Rutinitas', esp: 'Rutina', ex: 'Ini rutinitas saya.', exEsp: 'Esta es mi rutina.' },
                                { id: 'a2u4_jadwal', idn: 'Jadwal', esp: 'Horario; programa', ex: 'Jadwal saya mulai pukul delapan.', exEsp: 'Mi horario empieza a las ocho.' },
                                { id: 'a2u4_teratur', idn: 'Teratur', esp: 'Ordenado/a; regular', ex: 'Jadwal saya teratur.', exEsp: 'Mi horario está organizado.' },
                                { id: 'a2u4_mulai', idn: 'Mulai', esp: 'Empezar; comenzar', ex: 'Kelas mulai pukul delapan.', exEsp: 'La clase empieza a las ocho.' },
                                { id: 'a2u4_selesai', idn: 'Selesai', esp: 'Terminar; terminado', ex: 'Kelas selesai pukul dua belas.', exEsp: 'La clase termina a las doce.' },
                                { id: 'a2u4_kegiatan', idn: 'Kegiatan', esp: 'Actividad', ex: 'Kegiatan mulai pukul delapan.', exEsp: 'La actividad empieza a las ocho.' },
                                { id: 'a2u4_acara', idn: 'Acara', esp: 'Evento; actividad programada', ex: 'Acara itu mulai pukul tujuh.', exEsp: 'Ese evento empieza a las siete.' },
                                { id: 'a2u4_sibuk', idn: 'Sibuk', esp: 'Ocupado/a', ex: 'Hari ini saya sibuk.', exEsp: 'Hoy estoy ocupado/a.' },
                                { id: 'a2u4_santai', idn: 'Santai', esp: 'Relajado/a; tranquilo/a', ex: 'Hari ini saya santai.', exEsp: 'Hoy estoy tranquilo/a.' },
                                { id: 'a2u4_penuh', idn: 'Penuh', esp: 'Lleno/a; completo/a', ex: 'Jadwal saya penuh.', exEsp: 'Mi horario está lleno.' }
                            ],
                            lessons: [
                                {
                                    title: 'Lección 1: La rutina y el horario',
                                    objective: 'Presenta tu rutina y habla de tu horario diario.',
                                    grammar: 'Rutinitas nombra las acciones habituales. Jadwal se refiere al horario; puedes usar ambos con palabras de tiempo ya conocidas.',
                                    vocabIds: ['a2u4_rutinitas', 'a2u4_jadwal', 'a2u4_teratur'],
                                    reviewVocabIds: ['v247', 'v248'],
                                    exercises: [
                                        { vocabId: 'a2u4_rutinitas', type: 'mc', prompt: '¿Qué significa «rutinitas»?', options: ['Rutina', 'Horario', 'Evento'], answer: 0, explanation: 'Rutinitas se refiere a las acciones habituales de una persona.' },
                                        { vocabId: 'a2u4_jadwal', type: 'translate_es_id', prompt: 'Traduce: Mi horario empieza a las ocho.', answer: 'Jadwal saya mulai pukul delapan.', explanation: 'Jadwal saya significa «mi horario».' },
                                        { vocabId: 'a2u4_teratur', type: 'mc', prompt: '¿Qué significa «teratur» al describir un horario?', options: ['Ordenado; regular', 'Lleno', 'Tranquilo'], answer: 0, explanation: 'Teratur describe algo organizado o que sigue un orden.' },
                                        { vocabId: 'v247', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Saya bangun pagi.', explanation: 'La oración dice «Me levanto por la mañana».' },
                                        { vocabId: 'a2u4_rutinitas', type: 'write', prompt: 'Escribe una frase para presentar tu rutina.', hint: 'Puedes empezar con «Ini rutinitas saya».', modelAnswer: 'Ini rutinitas saya.', explanation: 'El modelo presenta la rutina; puedes añadir más información propia.' }
                                    ]
                                },
                                {
                                    title: 'Lección 2: Cuándo empiezan y terminan las actividades',
                                    objective: 'Indica el comienzo y el final de una actividad con una hora.',
                                    grammar: 'Mulai indica el comienzo y selesai el final. La hora puede expresarse con pukul y un número.',
                                    vocabIds: ['a2u4_mulai', 'a2u4_selesai'],
                                    reviewVocabIds: ['v249', 'v250'],
                                    exercises: [
                                        { vocabId: 'a2u4_mulai', type: 'mc', prompt: '¿Qué significa «mulai»?', options: ['Empezar; comenzar', 'Terminar', 'Regresar'], answer: 0, explanation: 'Mulai indica el comienzo de una actividad.' },
                                        { vocabId: 'a2u4_selesai', type: 'translate_es_id', prompt: 'Traduce: La clase termina a las doce.', answer: 'Kelas selesai pukul dua belas.', explanation: 'Selesai indica que la clase termina.' },
                                        { vocabId: 'v249', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Saya sarapan.', explanation: 'La oración dice «Desayuno».' },
                                        { vocabId: 'a2u4_mulai', type: 'write', prompt: 'Escribe una frase para decir que la clase empieza a las ocho.', hint: 'Usa «Kelas mulai pukul delapan».', modelAnswer: 'Kelas mulai pukul delapan.', explanation: 'El modelo expresa la hora de inicio de la clase.' }
                                    ]
                                },
                                {
                                    title: 'Lección 3: Actividades y eventos',
                                    objective: 'Habla de actividades y eventos programados.',
                                    grammar: 'Kegiatan se refiere a una actividad; acara suele referirse a un evento o programa. El contexto ayuda a distinguirlos.',
                                    vocabIds: ['a2u4_kegiatan', 'a2u4_acara'],
                                    reviewVocabIds: ['v252', 'v251'],
                                    exercises: [
                                        { vocabId: 'a2u4_kegiatan', type: 'mc', prompt: '¿Qué significa «kegiatan»?', options: ['Actividad', 'Evento', 'Horario'], answer: 0, explanation: 'Kegiatan significa «actividad».' },
                                        { vocabId: 'a2u4_acara', type: 'translate_es_id', prompt: 'Traduce: Ese evento empieza a las siete.', answer: 'Acara itu mulai pukul tujuh.', explanation: 'Acara itu significa «ese evento».' },
                                        { vocabId: 'v252', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Saya istirahat.', explanation: 'La oración dice «Descanso».' },
                                        { vocabId: 'a2u4_kegiatan', type: 'order', prompt: 'Ordena: La actividad empieza a las ocho.', words: ['pukul', 'Kegiatan', 'delapan', 'mulai'], correctOrder: ['Kegiatan', 'mulai', 'pukul', 'delapan'], explanation: 'Kegiatan mulai pukul delapan expresa la hora de inicio.' }
                                    ]
                                },
                                {
                                    title: 'Lección 4: Describir cómo es tu día',
                                    objective: 'Describe si tu día está ocupado o es tranquilo.',
                                    grammar: 'Sibuk describe un día con muchas tareas; santai describe un ritmo tranquilo o relajado.',
                                    vocabIds: ['a2u4_sibuk', 'a2u4_santai', 'a2u4_penuh'],
                                    reviewVocabIds: ['v247', 'v248', 'v249', 'v250', 'v251', 'v252'],
                                    exercises: [
                                        { vocabId: 'a2u4_sibuk', type: 'mc', prompt: '¿Qué significa «sibuk»?', options: ['Ocupado/a', 'Tranquilo/a', 'Cansado/a'], answer: 0, explanation: 'Sibuk describe a alguien que tiene muchas actividades o tareas.' },
                                        { vocabId: 'a2u4_santai', type: 'translate_es_id', prompt: 'Traduce: Hoy estoy tranquilo/a.', answer: 'Hari ini saya santai.', explanation: 'Santai describe un estado relajado o tranquilo.' },
                                        { vocabId: 'a2u4_penuh', type: 'mc', prompt: 'En «Jadwal saya penuh», ¿qué significa penuh?', options: ['Lleno', 'Ordenado', 'Libre'], answer: 0, explanation: 'Penuh significa «lleno» o «completo».' },
                                        { vocabId: 'v251', type: 'listen', prompt: 'Escucha y escribe la oración.', answer: 'Saya pulang.', explanation: 'La oración dice «Regreso a casa».' },
                                        { vocabId: 'a2u4_sibuk', type: 'write', prompt: 'Escribe una frase para describir que hoy no estás ocupado/a.', hint: 'Usa «Hari ini saya tidak sibuk».', modelAnswer: 'Hari ini saya tidak sibuk.', explanation: 'El modelo niega sibuk con tidak.' }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u5",
                            "title": "Unidad 5: Actividades y acciones con ber-",
                            "desc": "Habla de actividades, movimiento, encuentros y acciones cotidianas con verbos frecuentes en ber-.",
                            "grammar": "El prefijo ber- forma muchos verbos que expresan actividad, estado o participación. No se aplica mecánicamente a cualquier raíz: aprende las formas frecuentes completas y su uso en contexto.",
                            "vocab": [
                                {
                                    "id": "a2u5_berbicara",
                                    "idn": "Berbicara",
                                    "esp": "Hablar",
                                    "ex": "Dia berbicara.",
                                    "exEsp": "Él o ella habla."
                                },
                                {
                                    "id": "a2u5_bersepeda",
                                    "idn": "Bersepeda",
                                    "esp": "Ir en bicicleta",
                                    "ex": "Saya bersepeda.",
                                    "exEsp": "Voy en bicicleta."
                                },
                                {
                                    "id": "a2u5_berkunjung",
                                    "idn": "Berkunjung",
                                    "esp": "Visitar",
                                    "ex": "Kami berkunjung.",
                                    "exEsp": "Visitamos."
                                },
                                {
                                    "id": "a2u5_berlatih",
                                    "idn": "Berlatih",
                                    "esp": "Practicar; entrenar",
                                    "ex": "Dia berlatih.",
                                    "exEsp": "Él o ella practica."
                                },
                                {
                                    "id": "a2u5_berdoa",
                                    "idn": "Berdoa",
                                    "esp": "Rezar; orar",
                                    "ex": "Saya berdoa.",
                                    "exEsp": "Rezo."
                                },
                                {
                                    "id": "a2u5_berdiri",
                                    "idn": "Berdiri",
                                    "esp": "Estar de pie",
                                    "ex": "Saya berdiri di sini.",
                                    "exEsp": "Estoy de pie aquí."
                                },
                                {
                                    "id": "a2u5_berlari",
                                    "idn": "Berlari",
                                    "esp": "Correr",
                                    "ex": "Dia berlari ke rumah.",
                                    "exEsp": "Él o ella corre a casa."
                                },
                                {
                                    "id": "a2u5_bernyanyi",
                                    "idn": "Bernyanyi",
                                    "esp": "Cantar",
                                    "ex": "Saya bernyanyi.",
                                    "exEsp": "Canto."
                                },
                                {
                                    "id": "a2u5_berhenti",
                                    "idn": "Berhenti",
                                    "esp": "Parar; detenerse",
                                    "ex": "Dia berhenti di sini.",
                                    "exEsp": "Él o ella se detiene aquí."
                                },
                                {
                                    "id": "a2u5_berkumpul",
                                    "idn": "Berkumpul",
                                    "esp": "Reunirse; juntarse",
                                    "ex": "Kami berkumpul di rumah.",
                                    "exEsp": "Nos reunimos en casa."
                                },
                                {
                                    "id": "a2u5_bertanya",
                                    "idn": "Bertanya",
                                    "esp": "Preguntar",
                                    "ex": "Saya bertanya.",
                                    "exEsp": "Pregunto."
                                },
                                {
                                    "id": "a2u5_bersantai",
                                    "idn": "Bersantai",
                                    "esp": "Relajarse",
                                    "ex": "Saya bersantai di rumah.",
                                    "exEsp": "Me relajo en casa."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Hablar, desplazarse y visitar",
                                    "objective": "Expresa acciones de comunicación y desplazamiento.",
                                    "grammar": "Berbicara significa hablar, bersepeda ir en bicicleta y berkunjung visitar. Aprende cada verbo como una forma completa.",
                                    "vocabIds": [
                                        "a2u5_berbicara",
                                        "a2u5_bersepeda",
                                        "a2u5_berkunjung"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u5_berbicara",
                                            "type": "mc",
                                            "prompt": "¿Qué significa berbicara?",
                                            "options": [
                                                "Hablar",
                                                "Ir en bicicleta",
                                                "Visitar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Berbicara significa hablar."
                                        },
                                        {
                                            "vocabId": "a2u5_bersepeda",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Voy en bicicleta a la escuela.",
                                            "answer": "Saya bersepeda ke sekolah.",
                                            "explanation": "La frase usa bersepeda."
                                        },
                                        {
                                            "vocabId": "a2u5_berkunjung",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kami berkunjung ke rumah teman.",
                                            "explanation": "La oración contiene berkunjung."
                                        },
                                        {
                                            "vocabId": "a2u5_berbicara",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando berbicara.",
                                            "hint": "Puedes tomar como modelo: Dia berbicara dengan teman.",
                                            "modelAnswer": "Dia berbicara dengan teman.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u5_bersepeda",
                                            "type": "order",
                                            "prompt": "Ordena: Él o ella habla.",
                                            "words": [
                                                "berbicara",
                                                "Dia"
                                            ],
                                            "correctOrder": [
                                                "Dia",
                                                "berbicara"
                                            ],
                                            "explanation": "Saya bersepeda ke sekolah. expresa la idea indicada."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Practicar, rezar y estar de pie",
                                    "objective": "Reconoce acciones y estados expresados con ber-.",
                                    "grammar": "Berlatih significa practicar; berdoa, rezar; berdiri, estar de pie.",
                                    "vocabIds": [
                                        "a2u5_berlatih",
                                        "a2u5_berdoa",
                                        "a2u5_berdiri"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u5_berlatih",
                                            "type": "mc",
                                            "prompt": "¿Qué significa berlatih?",
                                            "options": [
                                                "Practicar; entrenar",
                                                "Rezar; orar",
                                                "Estar de pie"
                                            ],
                                            "answer": 0,
                                            "explanation": "Berlatih significa practicar; entrenar."
                                        },
                                        {
                                            "vocabId": "a2u5_berdoa",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Rezo.",
                                            "answer": "Saya berdoa.",
                                            "explanation": "La frase usa berdoa."
                                        },
                                        {
                                            "vocabId": "a2u5_berdiri",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya berdiri di sini.",
                                            "explanation": "La oración contiene berdiri."
                                        },
                                        {
                                            "vocabId": "a2u5_berlatih",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando berlatih.",
                                            "hint": "Puedes tomar como modelo: Dia berlatih bahasa Indonesia.",
                                            "modelAnswer": "Dia berlatih bahasa Indonesia.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Correr, cantar y parar",
                                    "objective": "Comprende verbos de movimiento y actividad.",
                                    "grammar": "Berlari expresa correr, bernyanyi cantar y berhenti parar o detenerse.",
                                    "vocabIds": [
                                        "a2u5_berlari",
                                        "a2u5_bernyanyi",
                                        "a2u5_berhenti"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u5_berlari",
                                            "type": "mc",
                                            "prompt": "¿Qué significa berlari?",
                                            "options": [
                                                "Correr",
                                                "Cantar",
                                                "Parar; detenerse"
                                            ],
                                            "answer": 0,
                                            "explanation": "Berlari significa correr."
                                        },
                                        {
                                            "vocabId": "a2u5_bernyanyi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Canto.",
                                            "answer": "Saya bernyanyi.",
                                            "explanation": "La frase usa bernyanyi."
                                        },
                                        {
                                            "vocabId": "a2u5_berhenti",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Bus berhenti di sini.",
                                            "explanation": "La oración contiene berhenti."
                                        },
                                        {
                                            "vocabId": "a2u5_berlari",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando berlari.",
                                            "hint": "Puedes tomar como modelo: Dia berlari ke rumah.",
                                            "modelAnswer": "Dia berlari ke rumah.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Reunirse, preguntar y relajarse",
                                    "objective": "Habla de reuniones, preguntas y descanso.",
                                    "grammar": "Berkumpul significa reunirse; bertanya, preguntar; bersantai, relajarse.",
                                    "vocabIds": [
                                        "a2u5_berkumpul",
                                        "a2u5_bertanya",
                                        "a2u5_bersantai"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u5_berkumpul",
                                            "type": "mc",
                                            "prompt": "¿Qué significa berkumpul?",
                                            "options": [
                                                "Reunirse; juntarse",
                                                "Preguntar",
                                                "Relajarse"
                                            ],
                                            "answer": 0,
                                            "explanation": "Berkumpul significa reunirse; juntarse."
                                        },
                                        {
                                            "vocabId": "a2u5_bertanya",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Le pregunto al profesor.",
                                            "answer": "Saya bertanya kepada guru.",
                                            "explanation": "La frase usa bertanya."
                                        },
                                        {
                                            "vocabId": "a2u5_bersantai",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya bersantai di rumah.",
                                            "explanation": "La oración contiene bersantai."
                                        },
                                        {
                                            "vocabId": "a2u5_berkumpul",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando berkumpul.",
                                            "hint": "Puedes tomar como modelo: Kami berkumpul di rumah.",
                                            "modelAnswer": "Kami berkumpul di rumah.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u6",
                            "title": "Unidad 6: Verbos activos con men-",
                            "desc": "Reconoce formas frecuentes con raíces que empiezan por t, d, c y j.",
                            "grammar": "La forma men- aparece ante muchas raíces que comienzan por t, d, c y j. Con t, la consonante inicial suele desaparecer: tutup → menutup, tunggu → menunggu y tetap → menetap. Con d, c y j, la consonante inicial se conserva: dengar → mendengar, cari → mencari y jual → menjual. Aprende cada forma derivada como vocabulario propio.",
                            "vocab": [
                                {
                                    "id": "a2u6_menutup",
                                    "idn": "Menutup",
                                    "esp": "Cerrar; tapar",
                                    "ex": "Saya menutup buku.",
                                    "exEsp": "Cierro el libro."
                                },
                                {
                                    "id": "a2u6_menunggu",
                                    "idn": "Menunggu",
                                    "esp": "Esperar",
                                    "ex": "Saya menunggu teman.",
                                    "exEsp": "Espero a un amigo."
                                },
                                {
                                    "id": "a2u6_menetap",
                                    "idn": "Menetap",
                                    "esp": "Establecerse; residir",
                                    "ex": "Saya menetap di kota.",
                                    "exEsp": "Resido en la ciudad."
                                },
                                {
                                    "id": "a2u6_mencari",
                                    "idn": "Mencari",
                                    "esp": "Buscar",
                                    "ex": "Saya mencari buku.",
                                    "exEsp": "Busco un libro."
                                },
                                {
                                    "id": "a2u6_mencatat",
                                    "idn": "Mencatat",
                                    "esp": "Anotar",
                                    "ex": "Saya mencatat baju.",
                                    "exEsp": "Tomo nota."
                                },
                                {
                                    "id": "a2u6_mencoba",
                                    "idn": "Mencoba",
                                    "esp": "Probar; intentar",
                                    "ex": "Saya mencoba nasi.",
                                    "exEsp": "Pruebo el arroz."
                                },
                                {
                                    "id": "a2u6_mendengar",
                                    "idn": "Mendengar",
                                    "esp": "Oír; escuchar",
                                    "ex": "Dia mendengar musik.",
                                    "exEsp": "Él o ella escucha música."
                                },
                                {
                                    "id": "a2u6_mendapat",
                                    "idn": "Mendapat",
                                    "esp": "Obtener; recibir",
                                    "ex": "Saya mendapat buku.",
                                    "exEsp": "Recibo un libro."
                                },
                                {
                                    "id": "a2u6_menjual",
                                    "idn": "Menjual",
                                    "esp": "Vender",
                                    "ex": "Mereka menjual nasi.",
                                    "exEsp": "Ellos venden arroz."
                                },
                                {
                                    "id": "a2u6_menjemput",
                                    "idn": "Menjemput",
                                    "esp": "Ir a recoger a alguien",
                                    "ex": "Saya menjemput teman.",
                                    "exEsp": "Voy a recoger a un amigo."
                                },
                                {
                                    "id": "a2u6_menjaga",
                                    "idn": "Menjaga",
                                    "esp": "Cuidar; vigilar",
                                    "ex": "Dia menjaga rumah.",
                                    "exEsp": "Él o ella cuida la casa."
                                },
                                {
                                    "id": "a2u6_menjadi",
                                    "idn": "Menjadi",
                                    "esp": "Convertirse en; llegar a ser",
                                    "ex": "Dia menjadi guru.",
                                    "exEsp": "Él o ella se convierte en profesor."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Raíces con t inicial",
                                    "objective": "Identifica formas men- en las que desaparece la t inicial de la raíz.",
                                    "grammar": "En menutup, menunggu y menetap, la t inicial de la raíz no aparece en la forma derivada.",
                                    "vocabIds": [
                                        "a2u6_menutup",
                                        "a2u6_menunggu",
                                        "a2u6_menetap"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u6_menutup",
                                            "type": "mc",
                                            "prompt": "¿Qué significa menutup?",
                                            "options": [
                                                "Cerrar; tapar",
                                                "Esperar",
                                                "Establecerse; residir"
                                            ],
                                            "answer": 0,
                                            "explanation": "Menutup significa cerrar; tapar."
                                        },
                                        {
                                            "vocabId": "a2u6_menunggu",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Espero a un amigo.",
                                            "answer": "Saya menunggu teman.",
                                            "explanation": "La frase usa menunggu."
                                        },
                                        {
                                            "vocabId": "a2u6_menetap",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya menetap di kota.",
                                            "explanation": "La oración contiene menetap."
                                        },
                                        {
                                            "vocabId": "a2u6_menutup",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando menutup.",
                                            "hint": "Puedes tomar como modelo: Saya menutup buku.",
                                            "modelAnswer": "Saya menutup buku.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u6_menunggu",
                                            "type": "order",
                                            "prompt": "Ordena: Cierro el libro.",
                                            "words": [
                                                "buku",
                                                "menutup",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "menutup",
                                                "buku"
                                            ],
                                            "explanation": "Saya menunggu teman. expresa la idea indicada."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Raíces con c inicial",
                                    "objective": "Usa verbos frecuentes formados con raíces que empiezan por c.",
                                    "grammar": "En mencari, mencatat y mencoba, la consonante c se conserva después de men-.",
                                    "vocabIds": [
                                        "a2u6_mencari",
                                        "a2u6_mencatat",
                                        "a2u6_mencoba"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u6_mencari",
                                            "type": "mc",
                                            "prompt": "¿Qué significa mencari?",
                                            "options": [
                                                "Buscar",
                                                "Anotar",
                                                "Probar; intentar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Mencari significa buscar."
                                        },
                                        {
                                            "vocabId": "a2u6_mencatat",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Tomo nota.",
                                            "answer": "Saya mencatat baju.",
                                            "explanation": "La frase usa mencatat."
                                        },
                                        {
                                            "vocabId": "a2u6_mencoba",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya mencoba nasi.",
                                            "explanation": "La oración contiene mencoba."
                                        },
                                        {
                                            "vocabId": "a2u6_mencari",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando mencari.",
                                            "hint": "Puedes tomar como modelo: Saya mencari buku.",
                                            "modelAnswer": "Saya mencari buku.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Raíces con d y j",
                                    "objective": "Reconoce formas en las que se conserva la consonante inicial d o j.",
                                    "grammar": "En mendengar y mendapat se conserva d; en menjual, la j también se conserva.",
                                    "vocabIds": [
                                        "a2u6_mendengar",
                                        "a2u6_mendapat",
                                        "a2u6_menjual"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u6_mendengar",
                                            "type": "mc",
                                            "prompt": "¿Qué significa mendengar?",
                                            "options": [
                                                "Oír; escuchar",
                                                "Obtener; recibir",
                                                "Vender"
                                            ],
                                            "answer": 0,
                                            "explanation": "Mendengar significa oír; escuchar."
                                        },
                                        {
                                            "vocabId": "a2u6_mendapat",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Recibo un libro.",
                                            "answer": "Saya mendapat buku.",
                                            "explanation": "La frase usa mendapat."
                                        },
                                        {
                                            "vocabId": "a2u6_menjual",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Mereka menjual nasi.",
                                            "explanation": "La oración contiene menjual."
                                        },
                                        {
                                            "vocabId": "a2u6_mendengar",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando mendengar.",
                                            "hint": "Puedes tomar como modelo: Dia mendengar musik.",
                                            "modelAnswer": "Dia mendengar musik.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Recoger, cuidar y convertirse",
                                    "objective": "Amplía el repertorio de verbos con men- en contextos cotidianos.",
                                    "grammar": "Menjemput, menjaga y menjadi son formas frecuentes que se aprenden en frases completas.",
                                    "vocabIds": [
                                        "a2u6_menjemput",
                                        "a2u6_menjaga",
                                        "a2u6_menjadi"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u6_menjemput",
                                            "type": "mc",
                                            "prompt": "¿Qué significa menjemput?",
                                            "options": [
                                                "Ir a recoger a alguien",
                                                "Cuidar; vigilar",
                                                "Convertirse en; llegar a ser"
                                            ],
                                            "answer": 0,
                                            "explanation": "Menjemput significa ir a recoger a alguien."
                                        },
                                        {
                                            "vocabId": "a2u6_menjaga",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Él o ella cuida la casa.",
                                            "answer": "Dia menjaga rumah.",
                                            "explanation": "La frase usa menjaga."
                                        },
                                        {
                                            "vocabId": "a2u6_menjadi",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Dia menjadi guru.",
                                            "explanation": "La oración contiene menjadi."
                                        },
                                        {
                                            "vocabId": "a2u6_menjemput",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando menjemput.",
                                            "hint": "Puedes tomar como modelo: Saya menjemput teman.",
                                            "modelAnswer": "Saya menjemput teman.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u7",
                            "title": "Unidad 7: Verbos activos con meng-",
                            "desc": "Aprende formas frecuentes con raíces que comienzan por k, g o vocal.",
                            "grammar": "La forma meng- aparece ante raíces que comienzan por k, g y vocal. Con k, la consonante inicial suele desaparecer: kirim → mengirim y kunci → mengunci. Con g y vocal, se conserva el sonido inicial: gambar → menggambar, ambil → mengambil y ajar → mengajar. Las formas derivadas se estudian como vocabulario independiente.",
                            "vocab": [
                                {
                                    "id": "a2u7_mengirim",
                                    "idn": "Mengirim",
                                    "esp": "Enviar",
                                    "ex": "Saya mengirim pesan.",
                                    "exEsp": "Envío un mensaje."
                                },
                                {
                                    "id": "a2u7_menggambar",
                                    "idn": "Menggambar",
                                    "esp": "Dibujar",
                                    "ex": "Dia menggambar rumah.",
                                    "exEsp": "Él o ella dibuja una casa."
                                },
                                {
                                    "id": "a2u7_mengambil",
                                    "idn": "Mengambil",
                                    "esp": "Tomar; coger",
                                    "ex": "Saya mengambil buku.",
                                    "exEsp": "Cojo un libro."
                                },
                                {
                                    "id": "a2u7_mengajar",
                                    "idn": "Mengajar",
                                    "esp": "Enseñar",
                                    "ex": "Guru mengajar.",
                                    "exEsp": "El profesor enseña."
                                },
                                {
                                    "id": "a2u7_mengunci",
                                    "idn": "Mengunci",
                                    "esp": "Cerrar con llave",
                                    "ex": "Saya mengunci rumah.",
                                    "exEsp": "Cierro la casa con llave."
                                },
                                {
                                    "id": "a2u7_menggoreng",
                                    "idn": "Menggoreng",
                                    "esp": "Freír",
                                    "ex": "Ibu menggoreng nasi.",
                                    "exEsp": "Mamá fríe arroz."
                                },
                                {
                                    "id": "a2u7_menggunakan",
                                    "idn": "Menggunakan",
                                    "esp": "Usar; utilizar",
                                    "ex": "Saya menggunakan buku.",
                                    "exEsp": "Uso un libro."
                                },
                                {
                                    "id": "a2u7_mengisi",
                                    "idn": "Mengisi",
                                    "esp": "Llenar; rellenar",
                                    "ex": "Saya mengisi air.",
                                    "exEsp": "Lleno agua."
                                },
                                {
                                    "id": "a2u7_mengatur",
                                    "idn": "Mengatur",
                                    "esp": "Organizar; ajustar",
                                    "ex": "Dia mengatur buku.",
                                    "exEsp": "Él o ella organiza los libros."
                                },
                                {
                                    "id": "a2u7_mengundang",
                                    "idn": "Mengundang",
                                    "esp": "Invitar",
                                    "ex": "Kami mengundang teman.",
                                    "exEsp": "Invitamos a un amigo."
                                },
                                {
                                    "id": "a2u7_menghapus",
                                    "idn": "Menghapus",
                                    "esp": "Borrar; eliminar",
                                    "ex": "Saya menghapus pesan.",
                                    "exEsp": "Borro el mensaje."
                                },
                                {
                                    "id": "a2u7_mengangkat",
                                    "idn": "Mengangkat",
                                    "esp": "Levantar",
                                    "ex": "Saya mengangkat buku.",
                                    "exEsp": "Levanto el libro."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Raíces con k inicial",
                                    "objective": "Identifica formas meng- en las que desaparece la k inicial.",
                                    "grammar": "En kirim → mengirim y kunci → mengunci, la k inicial de la raíz desaparece. En mengambil se conserva la vocal inicial de ambil.",
                                    "vocabIds": [
                                        "a2u7_mengirim",
                                        "a2u7_menggambar",
                                        "a2u7_mengambil"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u7_mengirim",
                                            "type": "mc",
                                            "prompt": "¿Qué significa mengirim?",
                                            "options": [
                                                "Enviar",
                                                "Dibujar",
                                                "Tomar; coger"
                                            ],
                                            "answer": 0,
                                            "explanation": "Mengirim significa enviar."
                                        },
                                        {
                                            "vocabId": "a2u7_menggambar",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Él o ella dibuja una casa.",
                                            "answer": "Dia menggambar rumah.",
                                            "explanation": "La frase usa menggambar."
                                        },
                                        {
                                            "vocabId": "a2u7_mengambil",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya mengambil buku.",
                                            "explanation": "La oración contiene mengambil."
                                        },
                                        {
                                            "vocabId": "a2u7_mengirim",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando mengirim.",
                                            "hint": "Puedes tomar como modelo: Saya mengirim pesan.",
                                            "modelAnswer": "Saya mengirim pesan.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u7_menggambar",
                                            "type": "order",
                                            "prompt": "Ordena: Envío un mensaje.",
                                            "words": [
                                                "pesan",
                                                "mengirim",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "mengirim",
                                                "pesan"
                                            ],
                                            "explanation": "Dia menggambar rumah. expresa la idea indicada."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Raíces con g inicial",
                                    "objective": "Reconoce formas meng- que conservan la g inicial.",
                                    "grammar": "En gambar y goreng, la g inicial se conserva: menggambar y menggoreng.",
                                    "vocabIds": [
                                        "a2u7_mengajar",
                                        "a2u7_mengunci",
                                        "a2u7_menggoreng"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u7_mengajar",
                                            "type": "mc",
                                            "prompt": "¿Qué significa mengajar?",
                                            "options": [
                                                "Enseñar",
                                                "Cerrar con llave",
                                                "Freír"
                                            ],
                                            "answer": 0,
                                            "explanation": "Mengajar significa enseñar."
                                        },
                                        {
                                            "vocabId": "a2u7_mengunci",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Cierro la casa con llave.",
                                            "answer": "Saya mengunci rumah.",
                                            "explanation": "La frase usa mengunci."
                                        },
                                        {
                                            "vocabId": "a2u7_menggoreng",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Ibu menggoreng nasi.",
                                            "explanation": "La oración contiene menggoreng."
                                        },
                                        {
                                            "vocabId": "a2u7_mengajar",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando mengajar.",
                                            "hint": "Puedes tomar como modelo: Guru mengajar bahasa Indonesia.",
                                            "modelAnswer": "Guru mengajar bahasa Indonesia.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Raíces que comienzan por vocal",
                                    "objective": "Identifica formas meng- con raíces que comienzan por vocal.",
                                    "grammar": "En ambil, isi y atur, la vocal inicial se conserva: mengambil, mengisi y mengatur.",
                                    "vocabIds": [
                                        "a2u7_menggunakan",
                                        "a2u7_mengisi",
                                        "a2u7_mengatur"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u7_menggunakan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa menggunakan?",
                                            "options": [
                                                "Usar; utilizar",
                                                "Llenar; rellenar",
                                                "Organizar; ajustar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Menggunakan significa usar; utilizar."
                                        },
                                        {
                                            "vocabId": "a2u7_mengisi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Lleno la botella con agua.",
                                            "answer": "Saya mengisi botol dengan air.",
                                            "explanation": "La frase usa mengisi."
                                        },
                                        {
                                            "vocabId": "a2u7_mengatur",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Dia mengatur buku.",
                                            "explanation": "La oración contiene mengatur."
                                        },
                                        {
                                            "vocabId": "a2u7_menggunakan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando menggunakan.",
                                            "hint": "Puedes tomar como modelo: Saya menggunakan buku.",
                                            "modelAnswer": "Saya menggunakan buku.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Invitar, borrar y levantar",
                                    "objective": "Usa otros verbos frecuentes con meng- en frases completas.",
                                    "grammar": "Mengundang, menghapus y mengangkat son formas de uso frecuente. Observa la forma completa y su significado.",
                                    "vocabIds": [
                                        "a2u7_mengundang",
                                        "a2u7_menghapus",
                                        "a2u7_mengangkat"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u7_mengundang",
                                            "type": "mc",
                                            "prompt": "¿Qué significa mengundang?",
                                            "options": [
                                                "Invitar",
                                                "Borrar; eliminar",
                                                "Levantar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Mengundang significa invitar."
                                        },
                                        {
                                            "vocabId": "a2u7_menghapus",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Borro el mensaje.",
                                            "answer": "Saya menghapus pesan.",
                                            "explanation": "La frase usa menghapus."
                                        },
                                        {
                                            "vocabId": "a2u7_mengangkat",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya mengangkat buku.",
                                            "explanation": "La oración contiene mengangkat."
                                        },
                                        {
                                            "vocabId": "a2u7_mengundang",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando mengundang.",
                                            "hint": "Puedes tomar como modelo: Kami mengundang teman.",
                                            "modelAnswer": "Kami mengundang teman.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u8",
                            "title": "Unidad 8: Verbos activos con mem- y meny-",
                            "desc": "Distingue formas frecuentes con raíces que comienzan por b, p, m y s.",
                            "grammar": "La forma mem- aparece ante raíces que comienzan por b, p, f, v y m. Con muchas raíces que empiezan por p, la p inicial desaparece: pakai → memakai y pilih → memilih. Con b y m, la consonante inicial se conserva: beli → membeli y mula → memulai. Ante muchas raíces con s, aparece meny- y la s inicial desaparece: simpan → menyimpan, sewa → menyewa y susun → menyusun. Son patrones frecuentes, no reglas sin excepciones.",
                            "vocab": [
                                {
                                    "id": "a2u8_membeli",
                                    "idn": "Membeli",
                                    "esp": "Comprar",
                                    "ex": "Saya membeli buku.",
                                    "exEsp": "Compro un libro."
                                },
                                {
                                    "id": "a2u8_membawa",
                                    "idn": "Membawa",
                                    "esp": "Llevar; traer",
                                    "ex": "Dia membawa buku.",
                                    "exEsp": "Él o ella lleva un libro."
                                },
                                {
                                    "id": "a2u8_membantu",
                                    "idn": "Membantu",
                                    "esp": "Ayudar",
                                    "ex": "Saya membantu teman.",
                                    "exEsp": "Ayudo a un amigo."
                                },
                                {
                                    "id": "a2u8_memakai",
                                    "idn": "Memakai",
                                    "esp": "Usar; llevar puesto",
                                    "ex": "Saya memakai buku.",
                                    "exEsp": "Uso un libro."
                                },
                                {
                                    "id": "a2u8_memilih",
                                    "idn": "Memilih",
                                    "esp": "Elegir; escoger",
                                    "ex": "Saya memilih buku.",
                                    "exEsp": "Elijo un libro."
                                },
                                {
                                    "id": "a2u8_memesan",
                                    "idn": "Memesan",
                                    "esp": "Pedir; encargar",
                                    "ex": "Saya memesan nasi.",
                                    "exEsp": "Pido arroz."
                                },
                                {
                                    "id": "a2u8_memulai",
                                    "idn": "Memulai",
                                    "esp": "Comenzar; iniciar",
                                    "ex": "Saya memulai belajar.",
                                    "exEsp": "Empiezo a estudiar."
                                },
                                {
                                    "id": "a2u8_meminta",
                                    "idn": "Meminta",
                                    "esp": "Pedir; solicitar",
                                    "ex": "Saya meminta air.",
                                    "exEsp": "Pido agua."
                                },
                                {
                                    "id": "a2u8_menyimpan",
                                    "idn": "Menyimpan",
                                    "esp": "Guardar; ahorrar",
                                    "ex": "Saya menyimpan buku.",
                                    "exEsp": "Guardo un libro."
                                },
                                {
                                    "id": "a2u8_menyewa",
                                    "idn": "Menyewa",
                                    "esp": "Alquilar",
                                    "ex": "Kami menyewa rumah.",
                                    "exEsp": "Alquilamos una casa."
                                },
                                {
                                    "id": "a2u8_menyusun",
                                    "idn": "Menyusun",
                                    "esp": "Ordenar; organizar",
                                    "ex": "Dia menyusun buku.",
                                    "exEsp": "Él o ella ordena los libros."
                                },
                                {
                                    "id": "a2u8_menyediakan",
                                    "idn": "Menyediakan",
                                    "esp": "Proporcionar; preparar",
                                    "ex": "Kami menyediakan air.",
                                    "exEsp": "Preparamos agua."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Formas mem- con b y p",
                                    "objective": "Reconoce verbos con b conservada y p que desaparece.",
                                    "grammar": "En membeli, membawa y membantu se conserva la b. En memakai y memilih, la p inicial de la raíz desaparece.",
                                    "vocabIds": [
                                        "a2u8_membeli",
                                        "a2u8_membawa",
                                        "a2u8_membantu"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u8_membeli",
                                            "type": "mc",
                                            "prompt": "¿Qué significa membeli?",
                                            "options": [
                                                "Comprar",
                                                "Llevar; traer",
                                                "Ayudar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Membeli significa comprar."
                                        },
                                        {
                                            "vocabId": "a2u8_membawa",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Él o ella lleva un libro.",
                                            "answer": "Dia membawa buku.",
                                            "explanation": "La frase usa membawa."
                                        },
                                        {
                                            "vocabId": "a2u8_membantu",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya membantu teman.",
                                            "explanation": "La oración contiene membantu."
                                        },
                                        {
                                            "vocabId": "a2u8_membeli",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando membeli.",
                                            "hint": "Puedes tomar como modelo: Saya membeli buku.",
                                            "modelAnswer": "Saya membeli buku.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u8_membawa",
                                            "type": "order",
                                            "prompt": "Ordena: Compro un libro.",
                                            "words": [
                                                "buku",
                                                "membeli",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "membeli",
                                                "buku"
                                            ],
                                            "explanation": "Dia membawa buku. expresa la idea indicada."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Ayudar, pedir y encargar",
                                    "objective": "Usa otros verbos frecuentes con mem-.",
                                    "grammar": "Membantu significa ayudar, memesan pedir o encargar y memulai comenzar.",
                                    "vocabIds": [
                                        "a2u8_memakai",
                                        "a2u8_memilih",
                                        "a2u8_memesan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u8_memakai",
                                            "type": "mc",
                                            "prompt": "¿Qué significa memakai?",
                                            "options": [
                                                "Usar; llevar puesto",
                                                "Elegir; escoger",
                                                "Pedir; encargar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Memakai significa usar; llevar puesto."
                                        },
                                        {
                                            "vocabId": "a2u8_memilih",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Elijo un libro.",
                                            "answer": "Saya memilih buku.",
                                            "explanation": "La frase usa memilih."
                                        },
                                        {
                                            "vocabId": "a2u8_memesan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya memesan nasi.",
                                            "explanation": "La oración contiene memesan."
                                        },
                                        {
                                            "vocabId": "a2u8_memakai",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando memakai.",
                                            "hint": "Puedes tomar como modelo: Saya memakai baju.",
                                            "modelAnswer": "Saya memakai baju.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Comenzar y solicitar",
                                    "objective": "Distingue verbos con m inicial que se conserva después de mem-.",
                                    "grammar": "En memulai y meminta, la m inicial de la raíz se conserva después de mem-.",
                                    "vocabIds": [
                                        "a2u8_memulai",
                                        "a2u8_meminta",
                                        "a2u8_menyimpan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u8_memulai",
                                            "type": "mc",
                                            "prompt": "¿Qué significa memulai?",
                                            "options": [
                                                "Comenzar; iniciar",
                                                "Pedir; solicitar",
                                                "Guardar; ahorrar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Memulai significa comenzar."
                                        },
                                        {
                                            "vocabId": "a2u8_meminta",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Pido agua.",
                                            "answer": "Saya meminta air.",
                                            "explanation": "La frase usa meminta."
                                        },
                                        {
                                            "vocabId": "a2u8_menyimpan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya menyimpan buku.",
                                            "explanation": "La oración contiene menyimpan."
                                        },
                                        {
                                            "vocabId": "a2u8_memulai",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando memulai.",
                                            "hint": "Puedes tomar como modelo: Saya memulai belajar.",
                                            "modelAnswer": "Saya memulai belajar.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Formas meny- con s inicial",
                                    "objective": "Reconoce formas meny- en las que desaparece la s inicial.",
                                    "grammar": "En menyimpan, menyewa y menyusun, la s inicial de la raíz desaparece. Menyediakan se aprende como forma léxica frecuente.",
                                    "vocabIds": [
                                        "a2u8_menyewa",
                                        "a2u8_menyusun",
                                        "a2u8_menyediakan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u8_menyewa",
                                            "type": "mc",
                                            "prompt": "¿Qué significa menyewa?",
                                            "options": [
                                                "Alquilar",
                                                "Ordenar; organizar",
                                                "Proporcionar; preparar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Menyewa significa alquilar."
                                        },
                                        {
                                            "vocabId": "a2u8_menyusun",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Él o ella ordena los libros.",
                                            "answer": "Dia menyusun buku.",
                                            "explanation": "La frase usa menyusun."
                                        },
                                        {
                                            "vocabId": "a2u8_menyediakan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kami menyediakan air.",
                                            "explanation": "La oración contiene menyediakan."
                                        },
                                        {
                                            "vocabId": "a2u8_menyewa",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando menyewa.",
                                            "hint": "Puedes tomar como modelo: Kami menyewa rumah.",
                                            "modelAnswer": "Kami menyewa rumah.",
                                            "explanation": "Usa el verbo en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u9",
                            "title": "Unidad 9: Expresar opiniones y preferencias",
                            "desc": "Expresa tu opinión, muestra acuerdo o desacuerdo y explica tus razones.",
                            "grammar": "Para expresar una opinión puedes usar menurut saya («en mi opinión»). Setuju y tidak setuju indican acuerdo y desacuerdo. Añade una razón con alasan y presenta alternativas con pilihan. Estas expresiones no cambian la forma del verbo.",
                            "vocab": [
                                {
                                    "id": "a2u9_pendapat",
                                    "idn": "Pendapat",
                                    "esp": "Opinión",
                                    "ex": "Saya punya pendapat.",
                                    "exEsp": "Tengo una opinión."
                                },
                                {
                                    "id": "a2u9_menurut",
                                    "idn": "Menurut",
                                    "esp": "Según; en opinión de",
                                    "ex": "Menurut saya, dia setuju.",
                                    "exEsp": "En mi opinión, él o ella está de acuerdo."
                                },
                                {
                                    "id": "a2u9_setuju",
                                    "idn": "Setuju",
                                    "esp": "Estar de acuerdo",
                                    "ex": "Saya setuju.",
                                    "exEsp": "Estoy de acuerdo."
                                },
                                {
                                    "id": "a2u9_tidak_setuju",
                                    "idn": "Tidak setuju",
                                    "esp": "No estar de acuerdo",
                                    "ex": "Saya tidak setuju.",
                                    "exEsp": "No estoy de acuerdo."
                                },
                                {
                                    "id": "a2u9_alasan",
                                    "idn": "Alasan",
                                    "esp": "Razón; motivo",
                                    "ex": "Saya punya alasan.",
                                    "exEsp": "Tengo una razón."
                                },
                                {
                                    "id": "a2u9_pilihan",
                                    "idn": "Pilihan",
                                    "esp": "Opción; elección",
                                    "ex": "Ini pilihan saya.",
                                    "exEsp": "Esta es mi elección."
                                },
                                {
                                    "id": "a2u9_berbeda",
                                    "idn": "Berbeda",
                                    "esp": "Diferente; diferir",
                                    "ex": "Pendapat kami berbeda.",
                                    "exEsp": "Nuestras opiniones son diferentes."
                                },
                                {
                                    "id": "a2u9_menjelaskan",
                                    "idn": "Menjelaskan",
                                    "esp": "Explicar",
                                    "ex": "Dia menjelaskan pilihan.",
                                    "exEsp": "Él o ella explica la elección."
                                },
                                {
                                    "id": "a2u9_menyarankan",
                                    "idn": "Menyarankan",
                                    "esp": "Sugerir; recomendar",
                                    "ex": "Saya menyarankan pilihan ini.",
                                    "exEsp": "Sugiero esta opción."
                                },
                                {
                                    "id": "a2u9_yakin",
                                    "idn": "Yakin",
                                    "esp": "Seguro; convencido",
                                    "ex": "Saya yakin.",
                                    "exEsp": "Estoy seguro."
                                },
                                {
                                    "id": "a2u9_berharap",
                                    "idn": "Berharap",
                                    "esp": "Esperar; tener esperanza",
                                    "ex": "Saya berharap berhasil.",
                                    "exEsp": "Espero tener éxito."
                                },
                                {
                                    "id": "a2u9_kecewa",
                                    "idn": "Kecewa",
                                    "esp": "Decepcionado",
                                    "ex": "Dia kecewa.",
                                    "exEsp": "Él o ella está decepcionado."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Dar una opinión",
                                    "objective": "Presenta tu opinión y reconoce cómo se expresa el acuerdo.",
                                    "grammar": "Pendapat significa opinión. Menurut saya introduce un punto de vista y setuju expresa acuerdo.",
                                    "vocabIds": [
                                        "a2u9_pendapat",
                                        "a2u9_menurut",
                                        "a2u9_setuju"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u9_pendapat",
                                            "type": "mc",
                                            "prompt": "¿Qué significa pendapat?",
                                            "options": [
                                                "Opinión",
                                                "Según; en opinión de",
                                                "Estar de acuerdo"
                                            ],
                                            "answer": 0,
                                            "explanation": "Pendapat significa opinión."
                                        },
                                        {
                                            "vocabId": "a2u9_menurut",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: En mi opinión, él o ella está de acuerdo.",
                                            "answer": "Menurut saya, dia setuju.",
                                            "explanation": "La frase usa menurut."
                                        },
                                        {
                                            "vocabId": "a2u9_setuju",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya setuju.",
                                            "explanation": "La oración contiene setuju."
                                        },
                                        {
                                            "vocabId": "a2u9_pendapat",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pendapat.",
                                            "hint": "Puedes tomar como modelo: Saya punya pendapat.",
                                            "modelAnswer": "Saya punya pendapat.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u9_menurut",
                                            "type": "order",
                                            "prompt": "Ordena: En mi opinión, él o ella está de acuerdo.",
                                            "words": ["setuju","dia","saya,","Menurut"],
                                            "correctOrder": ["Menurut","saya,","dia","setuju"],
                                            "explanation": "Saya punya pendapat. expresa una idea relacionada con el tema."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Expresar desacuerdo y razones",
                                    "objective": "Di que no estás de acuerdo y explica que tienes un motivo o una opción.",
                                    "grammar": "Tidak setuju expresa desacuerdo. Alasan es una razón y pilihan una opción o elección.",
                                    "vocabIds": [
                                        "a2u9_tidak_setuju",
                                        "a2u9_alasan",
                                        "a2u9_pilihan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u9_tidak_setuju",
                                            "type": "mc",
                                            "prompt": "¿Qué significa tidak setuju?",
                                            "options": [
                                                "No estar de acuerdo",
                                                "Razón; motivo",
                                                "Opción; elección"
                                            ],
                                            "answer": 0,
                                            "explanation": "Tidak setuju significa no estar de acuerdo."
                                        },
                                        {
                                            "vocabId": "a2u9_alasan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Tengo una razón.",
                                            "answer": "Saya punya alasan.",
                                            "explanation": "La frase usa alasan."
                                        },
                                        {
                                            "vocabId": "a2u9_pilihan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Ini pilihan saya.",
                                            "explanation": "La oración contiene pilihan."
                                        },
                                        {
                                            "vocabId": "a2u9_tidak_setuju",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando tidak setuju.",
                                            "hint": "Puedes tomar como modelo: Saya tidak setuju.",
                                            "modelAnswer": "Saya tidak setuju.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Comparar opiniones y sugerir",
                                    "objective": "Describe diferencias y presenta una sugerencia sencilla.",
                                    "grammar": "Berbeda significa diferente; menjelaskan es explicar y menyarankan es sugerir o recomendar.",
                                    "vocabIds": [
                                        "a2u9_berbeda",
                                        "a2u9_menjelaskan",
                                        "a2u9_menyarankan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u9_berbeda",
                                            "type": "mc",
                                            "prompt": "¿Qué significa berbeda?",
                                            "options": [
                                                "Diferente; diferir",
                                                "Explicar",
                                                "Sugerir; recomendar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Berbeda significa diferente; diferir."
                                        },
                                        {
                                            "vocabId": "a2u9_menjelaskan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Él o ella explica la elección.",
                                            "answer": "Dia menjelaskan pilihan.",
                                            "explanation": "La frase usa menjelaskan."
                                        },
                                        {
                                            "vocabId": "a2u9_menyarankan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya menyarankan pilihan ini.",
                                            "explanation": "La oración contiene menyarankan."
                                        },
                                        {
                                            "vocabId": "a2u9_berbeda",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando berbeda.",
                                            "hint": "Puedes tomar como modelo: Pendapat kami berbeda.",
                                            "modelAnswer": "Pendapat kami berbeda.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Mostrar seguridad y reacción",
                                    "objective": "Expresa seguridad, esperanza y decepción.",
                                    "grammar": "Yakin expresa seguridad; berharap, esperanza; kecewa, decepción.",
                                    "vocabIds": [
                                        "a2u9_yakin",
                                        "a2u9_berharap",
                                        "a2u9_kecewa"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u9_yakin",
                                            "type": "mc",
                                            "prompt": "¿Qué significa yakin?",
                                            "options": [
                                                "Seguro; convencido",
                                                "Esperar; tener esperanza",
                                                "Decepcionado"
                                            ],
                                            "answer": 0,
                                            "explanation": "Yakin significa seguro; convencido."
                                        },
                                        {
                                            "vocabId": "a2u9_berharap",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Espero tener éxito.",
                                            "answer": "Saya berharap berhasil.",
                                            "explanation": "La frase usa berharap."
                                        },
                                        {
                                            "vocabId": "a2u9_kecewa",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Dia kecewa.",
                                            "explanation": "La oración contiene kecewa."
                                        },
                                        {
                                            "vocabId": "a2u9_yakin",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando yakin.",
                                            "hint": "Puedes tomar como modelo: Saya yakin.",
                                            "modelAnswer": "Saya yakin.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u10",
                            "title": "Unidad 10: Normas, permisos y obligaciones",
                            "desc": "Habla de reglas, permisos, prohibiciones y seguridad en lugares cotidianos.",
                            "grammar": "Wajib expresa obligación; dilarang indica prohibición y diizinkan expresa permiso. Puedes hablar de una regla con aturan o peraturan. Aprende estas formas como expresiones de uso frecuente y presta atención a quién establece o cumple la norma.",
                            "vocab": [
                                {
                                    "id": "a2u10_aturan",
                                    "idn": "Aturan",
                                    "esp": "Regla",
                                    "ex": "Saya mengikuti aturan.",
                                    "exEsp": "Sigo la regla."
                                },
                                {
                                    "id": "a2u10_peraturan",
                                    "idn": "Peraturan",
                                    "esp": "Reglamento; normativa",
                                    "ex": "Saya membaca peraturan.",
                                    "exEsp": "Leo el reglamento."
                                },
                                {
                                    "id": "a2u10_wajib",
                                    "idn": "Wajib",
                                    "esp": "Obligatorio; tener que",
                                    "ex": "Saya wajib belajar.",
                                    "exEsp": "Tengo la obligación de estudiar."
                                },
                                {
                                    "id": "a2u10_dilarang",
                                    "idn": "Dilarang",
                                    "esp": "Prohibido",
                                    "ex": "Di sini dilarang berlari.",
                                    "exEsp": "Aquí está prohibido correr."
                                },
                                {
                                    "id": "a2u10_diizinkan",
                                    "idn": "Diizinkan",
                                    "esp": "Permitido; autorizado",
                                    "ex": "Kami diizinkan belajar.",
                                    "exEsp": "Tenemos permiso para estudiar."
                                },
                                {
                                    "id": "a2u10_izin",
                                    "idn": "Izin",
                                    "esp": "Permiso",
                                    "ex": "Saya meminta izin.",
                                    "exEsp": "Pido permiso."
                                },
                                {
                                    "id": "a2u10_larangan",
                                    "idn": "Larangan",
                                    "esp": "Prohibición",
                                    "ex": "Ini larangan.",
                                    "exEsp": "Esto es una prohibición."
                                },
                                {
                                    "id": "a2u10_keselamatan",
                                    "idn": "Keselamatan",
                                    "esp": "Seguridad",
                                    "ex": "Keselamatan itu perlu.",
                                    "exEsp": "La seguridad es necesaria."
                                },
                                {
                                    "id": "a2u10_aman",
                                    "idn": "Aman",
                                    "esp": "Seguro",
                                    "ex": "Rumah ini aman.",
                                    "exEsp": "Esta casa es segura."
                                },
                                {
                                    "id": "a2u10_berbahaya",
                                    "idn": "Berbahaya",
                                    "esp": "Peligroso",
                                    "ex": "Ini berbahaya.",
                                    "exEsp": "Esto es peligroso."
                                },
                                {
                                    "id": "a2u10_mematuhi",
                                    "idn": "Mematuhi",
                                    "esp": "Cumplir; obedecer",
                                    "ex": "Saya mematuhi aturan.",
                                    "exEsp": "Cumplo la regla."
                                },
                                {
                                    "id": "a2u10_melanggar",
                                    "idn": "Melanggar",
                                    "esp": "Infringir; incumplir",
                                    "ex": "Dia melanggar aturan.",
                                    "exEsp": "Él o ella infringe la regla."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Reglas y reglamentos",
                                    "objective": "Identifica las palabras habituales para hablar de normas.",
                                    "grammar": "Aturan significa regla y peraturan, reglamento o normativa. Wajib expresa obligación.",
                                    "vocabIds": [
                                        "a2u10_aturan",
                                        "a2u10_peraturan",
                                        "a2u10_wajib"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u10_aturan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa aturan?",
                                            "options": [
                                                "Regla",
                                                "Reglamento; normativa",
                                                "Obligatorio; tener que"
                                            ],
                                            "answer": 0,
                                            "explanation": "Aturan significa regla."
                                        },
                                        {
                                            "vocabId": "a2u10_peraturan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Leo el reglamento.",
                                            "answer": "Saya membaca peraturan.",
                                            "explanation": "La frase usa peraturan."
                                        },
                                        {
                                            "vocabId": "a2u10_wajib",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya wajib belajar.",
                                            "explanation": "La oración contiene wajib."
                                        },
                                        {
                                            "vocabId": "a2u10_aturan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando aturan.",
                                            "hint": "Puedes tomar como modelo: Saya mengikuti aturan.",
                                            "modelAnswer": "Saya mengikuti aturan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u10_peraturan",
                                            "type": "order",
                                            "prompt": "Ordena: Leo el reglamento.",
                                            "words": ["peraturan","membaca","Saya"],
                                            "correctOrder": ["Saya","membaca","peraturan"],
                                            "explanation": "Saya mengikuti aturan. expresa una idea relacionada con el tema."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Prohibiciones y permisos",
                                    "objective": "Distingue entre algo prohibido y algo autorizado.",
                                    "grammar": "Dilarang indica prohibición; diizinkan, permiso. Izin es el permiso que se pide.",
                                    "vocabIds": [
                                        "a2u10_dilarang",
                                        "a2u10_diizinkan",
                                        "a2u10_izin"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u10_dilarang",
                                            "type": "mc",
                                            "prompt": "¿Qué significa dilarang?",
                                            "options": [
                                                "Prohibido",
                                                "Permitido; autorizado",
                                                "Permiso"
                                            ],
                                            "answer": 0,
                                            "explanation": "Dilarang significa prohibido."
                                        },
                                        {
                                            "vocabId": "a2u10_diizinkan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Tenemos permiso para estudiar.",
                                            "answer": "Kami diizinkan belajar.",
                                            "explanation": "La frase usa diizinkan."
                                        },
                                        {
                                            "vocabId": "a2u10_izin",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya meminta izin.",
                                            "explanation": "La oración contiene izin."
                                        },
                                        {
                                            "vocabId": "a2u10_dilarang",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando dilarang.",
                                            "hint": "Puedes tomar como modelo: Di sini dilarang berlari.",
                                            "modelAnswer": "Di sini dilarang berlari.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Seguridad y prohibiciones",
                                    "objective": "Habla de seguridad y reconoce situaciones peligrosas.",
                                    "grammar": "Larangan significa prohibición; keselamatan, seguridad; aman, seguro; berbahaya, peligroso.",
                                    "vocabIds": [
                                        "a2u10_larangan",
                                        "a2u10_keselamatan",
                                        "a2u10_aman"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u10_larangan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa larangan?",
                                            "options": [
                                                "Prohibición",
                                                "Seguridad",
                                                "Seguro"
                                            ],
                                            "answer": 0,
                                            "explanation": "Larangan significa prohibición."
                                        },
                                        {
                                            "vocabId": "a2u10_keselamatan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La seguridad es necesaria.",
                                            "answer": "Keselamatan itu perlu.",
                                            "explanation": "La frase usa keselamatan."
                                        },
                                        {
                                            "vocabId": "a2u10_aman",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Rumah ini aman.",
                                            "explanation": "La oración contiene aman."
                                        },
                                        {
                                            "vocabId": "a2u10_larangan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando larangan.",
                                            "hint": "Puedes tomar como modelo: Ini larangan.",
                                            "modelAnswer": "Ini larangan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Cumplir las normas",
                                    "objective": "Explica si una persona respeta o infringe una regla.",
                                    "grammar": "Mematuhi significa cumplir u obedecer; melanggar significa infringir o incumplir.",
                                    "vocabIds": [
                                        "a2u10_berbahaya",
                                        "a2u10_mematuhi",
                                        "a2u10_melanggar"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u10_berbahaya",
                                            "type": "mc",
                                            "prompt": "¿Qué significa berbahaya?",
                                            "options": [
                                                "Peligroso",
                                                "Cumplir; obedecer",
                                                "Infringir; incumplir"
                                            ],
                                            "answer": 0,
                                            "explanation": "Berbahaya significa peligroso."
                                        },
                                        {
                                            "vocabId": "a2u10_mematuhi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Cumplo la regla.",
                                            "answer": "Saya mematuhi aturan.",
                                            "explanation": "La frase usa mematuhi."
                                        },
                                        {
                                            "vocabId": "a2u10_melanggar",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Dia melanggar aturan.",
                                            "explanation": "La oración contiene melanggar."
                                        },
                                        {
                                            "vocabId": "a2u10_berbahaya",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando berbahaya.",
                                            "hint": "Puedes tomar como modelo: Ini berbahaya.",
                                            "modelAnswer": "Ini berbahaya.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u11",
                            "title": "Unidad 11: Problemas y soluciones",
                            "desc": "Describe problemas sencillos, averías y acciones para resolverlos.",
                            "grammar": "Masalah significa problema y solusi, solución. Para describir una avería puedes usar rusak o kerusakan. Los verbos memperbaiki, melaporkan y menghubungi ayudan a explicar qué haces para resolver una situación.",
                            "vocab": [
                                {
                                    "id": "a2u11_masalah",
                                    "idn": "Masalah",
                                    "esp": "Problema",
                                    "ex": "Saya punya masalah.",
                                    "exEsp": "Tengo un problema."
                                },
                                {
                                    "id": "a2u11_solusi",
                                    "idn": "Solusi",
                                    "esp": "Solución",
                                    "ex": "Ini solusi.",
                                    "exEsp": "Esta es una solución."
                                },
                                {
                                    "id": "a2u11_rusak",
                                    "idn": "Rusak",
                                    "esp": "Estropeado; averiado",
                                    "ex": "Pintu itu rusak.",
                                    "exEsp": "Esa puerta está averiada."
                                },
                                {
                                    "id": "a2u11_memperbaiki",
                                    "idn": "Memperbaiki",
                                    "esp": "Reparar; arreglar",
                                    "ex": "Saya memperbaiki pintu.",
                                    "exEsp": "Reparo la puerta."
                                },
                                {
                                    "id": "a2u11_macet",
                                    "idn": "Macet",
                                    "esp": "Atascado; congestionado",
                                    "ex": "Jalan macet.",
                                    "exEsp": "La carretera está congestionada."
                                },
                                {
                                    "id": "a2u11_kehilangan",
                                    "idn": "Kehilangan",
                                    "esp": "Perder",
                                    "ex": "Saya kehilangan buku.",
                                    "exEsp": "He perdido el libro."
                                },
                                {
                                    "id": "a2u11_menemukan",
                                    "idn": "Menemukan",
                                    "esp": "Encontrar",
                                    "ex": "Saya menemukan buku.",
                                    "exEsp": "Encuentro el libro."
                                },
                                {
                                    "id": "a2u11_melaporkan",
                                    "idn": "Melaporkan",
                                    "esp": "Informar; denunciar",
                                    "ex": "Saya melaporkan masalah.",
                                    "exEsp": "Informo del problema."
                                },
                                {
                                    "id": "a2u11_menghubungi",
                                    "idn": "Menghubungi",
                                    "esp": "Contactar",
                                    "ex": "Saya menghubungi dokter.",
                                    "exEsp": "Contacto con el médico."
                                },
                                {
                                    "id": "a2u11_darurat",
                                    "idn": "Darurat",
                                    "esp": "Emergencia",
                                    "ex": "Ini darurat.",
                                    "exEsp": "Esto es una emergencia."
                                },
                                {
                                    "id": "a2u11_segera",
                                    "idn": "Segera",
                                    "esp": "Inmediatamente; enseguida",
                                    "ex": "Saya datang segera.",
                                    "exEsp": "Voy enseguida."
                                },
                                {
                                    "id": "a2u11_kerusakan",
                                    "idn": "Kerusakan",
                                    "esp": "Daño; avería",
                                    "ex": "Ada kerusakan.",
                                    "exEsp": "Hay una avería."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Identificar un problema",
                                    "objective": "Nombra un problema y reconoce una solución.",
                                    "grammar": "Masalah significa problema y solusi, solución. Rusak describe algo que está averiado.",
                                    "vocabIds": [
                                        "a2u11_masalah",
                                        "a2u11_solusi",
                                        "a2u11_rusak"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u11_masalah",
                                            "type": "mc",
                                            "prompt": "¿Qué significa masalah?",
                                            "options": [
                                                "Problema",
                                                "Solución",
                                                "Estropeado; averiado"
                                            ],
                                            "answer": 0,
                                            "explanation": "Masalah significa problema."
                                        },
                                        {
                                            "vocabId": "a2u11_solusi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esta es una solución.",
                                            "answer": "Ini solusi.",
                                            "explanation": "La frase usa solusi."
                                        },
                                        {
                                            "vocabId": "a2u11_rusak",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pintu itu rusak.",
                                            "explanation": "La oración contiene rusak."
                                        },
                                        {
                                            "vocabId": "a2u11_masalah",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando masalah.",
                                            "hint": "Puedes tomar como modelo: Saya punya masalah.",
                                            "modelAnswer": "Saya punya masalah.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u11_solusi",
                                            "type": "order",
                                            "prompt": "Ordena: Esta es una solución.",
                                            "words": ["solusi","Ini"],
                                            "correctOrder": ["Ini","solusi"],
                                            "explanation": "Saya punya masalah. expresa una idea relacionada con el tema."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Reparaciones y tráfico",
                                    "objective": "Describe una avería o una situación de tráfico.",
                                    "grammar": "Memperbaiki significa reparar; macet describe una vía congestionada.",
                                    "vocabIds": [
                                        "a2u11_memperbaiki",
                                        "a2u11_macet",
                                        "a2u11_kehilangan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u11_memperbaiki",
                                            "type": "mc",
                                            "prompt": "¿Qué significa memperbaiki?",
                                            "options": [
                                                "Reparar; arreglar",
                                                "Atascado; congestionado",
                                                "Perder"
                                            ],
                                            "answer": 0,
                                            "explanation": "Memperbaiki significa reparar; arreglar."
                                        },
                                        {
                                            "vocabId": "a2u11_macet",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La carretera está congestionada.",
                                            "answer": "Jalan macet.",
                                            "explanation": "La frase usa macet."
                                        },
                                        {
                                            "vocabId": "a2u11_kehilangan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya kehilangan buku.",
                                            "explanation": "La oración contiene kehilangan."
                                        },
                                        {
                                            "vocabId": "a2u11_memperbaiki",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando memperbaiki.",
                                            "hint": "Puedes tomar como modelo: Saya memperbaiki pintu.",
                                            "modelAnswer": "Saya memperbaiki pintu.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Perder, encontrar e informar",
                                    "objective": "Explica qué has perdido, encontrado o comunicado.",
                                    "grammar": "Kehilangan significa perder; menemukan, encontrar; melaporkan, informar o denunciar.",
                                    "vocabIds": [
                                        "a2u11_menemukan",
                                        "a2u11_melaporkan",
                                        "a2u11_menghubungi"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u11_menemukan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa menemukan?",
                                            "options": [
                                                "Encontrar",
                                                "Informar; denunciar",
                                                "Contactar"
                                            ],
                                            "answer": 0,
                                            "explanation": "Menemukan significa encontrar."
                                        },
                                        {
                                            "vocabId": "a2u11_melaporkan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Informo del problema.",
                                            "answer": "Saya melaporkan masalah.",
                                            "explanation": "La frase usa melaporkan."
                                        },
                                        {
                                            "vocabId": "a2u11_menghubungi",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya menghubungi dokter.",
                                            "explanation": "La oración contiene menghubungi."
                                        },
                                        {
                                            "vocabId": "a2u11_menemukan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando menemukan.",
                                            "hint": "Puedes tomar como modelo: Saya menemukan buku.",
                                            "modelAnswer": "Saya menemukan buku.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Contactos y emergencias",
                                    "objective": "Explica cómo contactar con alguien y actuar ante una emergencia.",
                                    "grammar": "Menghubungi significa contactar; darurat, emergencia; segera, inmediatamente; kerusakan, daño o avería.",
                                    "vocabIds": [
                                        "a2u11_darurat",
                                        "a2u11_segera",
                                        "a2u11_kerusakan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u11_darurat",
                                            "type": "mc",
                                            "prompt": "¿Qué significa darurat?",
                                            "options": [
                                                "Emergencia",
                                                "Inmediatamente; enseguida",
                                                "Daño; avería"
                                            ],
                                            "answer": 0,
                                            "explanation": "Darurat significa emergencia."
                                        },
                                        {
                                            "vocabId": "a2u11_segera",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Voy enseguida.",
                                            "answer": "Saya datang segera.",
                                            "explanation": "La frase usa segera."
                                        },
                                        {
                                            "vocabId": "a2u11_kerusakan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Ada kerusakan.",
                                            "explanation": "La oración contiene kerusakan."
                                        },
                                        {
                                            "vocabId": "a2u11_darurat",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando darurat.",
                                            "hint": "Puedes tomar como modelo: Ini darurat.",
                                            "modelAnswer": "Ini darurat.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u12",
                            "title": "Unidad 12: Experiencia, capacidades y objetivos",
                            "desc": "Habla de tu experiencia, tus capacidades y tus metas de estudio o trabajo.",
                            "grammar": "Puedes hablar de experiencia con pengalaman, de capacidad con kemampuan y de objetivos con tujuan. Berhasil y gagal describen resultados. Memutuskan y melanjutkan sirven para contar decisiones y continuidad; meningkatkan y mengembangkan expresan desarrollo.",
                            "vocab": [
                                {
                                    "id": "a2u12_pengalaman",
                                    "idn": "Pengalaman",
                                    "esp": "Experiencia",
                                    "ex": "Saya punya pengalaman.",
                                    "exEsp": "Tengo experiencia."
                                },
                                {
                                    "id": "a2u12_kemampuan",
                                    "idn": "Kemampuan",
                                    "esp": "Capacidad; habilidad",
                                    "ex": "Kemampuan saya baik.",
                                    "exEsp": "Mi capacidad es buena."
                                },
                                {
                                    "id": "a2u12_kesempatan",
                                    "idn": "Kesempatan",
                                    "esp": "Oportunidad",
                                    "ex": "Saya punya kesempatan.",
                                    "exEsp": "Tengo una oportunidad."
                                },
                                {
                                    "id": "a2u12_tujuan",
                                    "idn": "Tujuan",
                                    "esp": "Objetivo; meta",
                                    "ex": "Tujuan saya belajar.",
                                    "exEsp": "Mi objetivo es estudiar."
                                },
                                {
                                    "id": "a2u12_cita_cita",
                                    "idn": "Cita-cita",
                                    "esp": "Aspiración; sueño",
                                    "ex": "Cita-cita saya menjadi guru.",
                                    "exEsp": "Mi sueño es ser profesor."
                                },
                                {
                                    "id": "a2u12_berhasil",
                                    "idn": "Berhasil",
                                    "esp": "Tener éxito; lograrlo",
                                    "ex": "Saya berhasil.",
                                    "exEsp": "Tengo éxito."
                                },
                                {
                                    "id": "a2u12_gagal",
                                    "idn": "Gagal",
                                    "esp": "Fracasar",
                                    "ex": "Dia gagal.",
                                    "exEsp": "Él o ella fracasa."
                                },
                                {
                                    "id": "a2u12_memutuskan",
                                    "idn": "Memutuskan",
                                    "esp": "Decidir",
                                    "ex": "Saya memutuskan belajar.",
                                    "exEsp": "Decido estudiar."
                                },
                                {
                                    "id": "a2u12_melanjutkan",
                                    "idn": "Melanjutkan",
                                    "esp": "Continuar; proseguir",
                                    "ex": "Saya melanjutkan belajar.",
                                    "exEsp": "Continúo estudiando."
                                },
                                {
                                    "id": "a2u12_meningkatkan",
                                    "idn": "Meningkatkan",
                                    "esp": "Mejorar; aumentar",
                                    "ex": "Saya ingin meningkatkan kemampuan.",
                                    "exEsp": "Quiero mejorar mi capacidad."
                                },
                                {
                                    "id": "a2u12_mengembangkan",
                                    "idn": "Mengembangkan",
                                    "esp": "Desarrollar",
                                    "ex": "Saya mengembangkan kemampuan.",
                                    "exEsp": "Desarrollo mi capacidad."
                                },
                                {
                                    "id": "a2u12_keterampilan",
                                    "idn": "Keterampilan",
                                    "esp": "Destreza; competencia práctica",
                                    "ex": "Saya punya keterampilan.",
                                    "exEsp": "Tengo habilidades."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Experiencia y capacidades",
                                    "objective": "Habla de la experiencia y de lo que sabes hacer.",
                                    "grammar": "Pengalaman significa experiencia y kemampuan, capacidad o habilidad.",
                                    "vocabIds": [
                                        "a2u12_pengalaman",
                                        "a2u12_kemampuan",
                                        "a2u12_kesempatan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u12_pengalaman",
                                            "type": "mc",
                                            "prompt": "¿Qué significa pengalaman?",
                                            "options": [
                                                "Experiencia",
                                                "Capacidad; habilidad",
                                                "Oportunidad"
                                            ],
                                            "answer": 0,
                                            "explanation": "Pengalaman significa experiencia."
                                        },
                                        {
                                            "vocabId": "a2u12_kemampuan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Mi capacidad es buena.",
                                            "answer": "Kemampuan saya baik.",
                                            "explanation": "La frase usa kemampuan."
                                        },
                                        {
                                            "vocabId": "a2u12_kesempatan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya punya kesempatan.",
                                            "explanation": "La oración contiene kesempatan."
                                        },
                                        {
                                            "vocabId": "a2u12_pengalaman",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pengalaman.",
                                            "hint": "Puedes tomar como modelo: Saya punya pengalaman.",
                                            "modelAnswer": "Saya punya pengalaman.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u12_kemampuan",
                                            "type": "order",
                                            "prompt": "Ordena: Mi capacidad es buena.",
                                            "words": ["baik","saya","Kemampuan"],
                                            "correctOrder": ["Kemampuan","saya","baik"],
                                            "explanation": "Saya punya pengalaman. expresa una idea relacionada con el tema."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Oportunidades y objetivos",
                                    "objective": "Expresa una oportunidad y presenta una meta personal.",
                                    "grammar": "Kesempatan significa oportunidad; tujuan, objetivo; cita-cita, aspiración o sueño.",
                                    "vocabIds": [
                                        "a2u12_tujuan",
                                        "a2u12_cita_cita",
                                        "a2u12_berhasil"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u12_tujuan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa tujuan?",
                                            "options": [
                                                "Objetivo; meta",
                                                "Aspiración; sueño",
                                                "Tener éxito; lograrlo"
                                            ],
                                            "answer": 0,
                                            "explanation": "Tujuan significa objetivo; meta."
                                        },
                                        {
                                            "vocabId": "a2u12_cita_cita",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Mi sueño es ser profesor.",
                                            "answer": "Cita-cita saya menjadi guru.",
                                            "explanation": "La frase usa cita-cita."
                                        },
                                        {
                                            "vocabId": "a2u12_berhasil",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya berhasil.",
                                            "explanation": "La oración contiene berhasil."
                                        },
                                        {
                                            "vocabId": "a2u12_tujuan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando tujuan.",
                                            "hint": "Puedes tomar como modelo: Tujuan saya belajar.",
                                            "modelAnswer": "Tujuan saya belajar.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Éxito, fracaso y decisiones",
                                    "objective": "Describe resultados y decisiones sencillas.",
                                    "grammar": "Berhasil significa tener éxito; gagal, fracasar; memutuskan, decidir.",
                                    "vocabIds": [
                                        "a2u12_gagal",
                                        "a2u12_memutuskan",
                                        "a2u12_melanjutkan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u12_gagal",
                                            "type": "mc",
                                            "prompt": "¿Qué significa gagal?",
                                            "options": [
                                                "Fracasar",
                                                "Decidir",
                                                "Continuar; proseguir"
                                            ],
                                            "answer": 0,
                                            "explanation": "Gagal significa fracasar."
                                        },
                                        {
                                            "vocabId": "a2u12_memutuskan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Decido estudiar.",
                                            "answer": "Saya memutuskan belajar.",
                                            "explanation": "La frase usa memutuskan."
                                        },
                                        {
                                            "vocabId": "a2u12_melanjutkan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya melanjutkan belajar.",
                                            "explanation": "La oración contiene melanjutkan."
                                        },
                                        {
                                            "vocabId": "a2u12_gagal",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando gagal.",
                                            "hint": "Puedes tomar como modelo: Dia gagal.",
                                            "modelAnswer": "Dia gagal.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Continuar y mejorar",
                                    "objective": "Habla de continuar aprendiendo y desarrollar capacidades.",
                                    "grammar": "Melanjutkan significa continuar; meningkatkan, mejorar; mengembangkan, desarrollar; keterampilan, destreza.",
                                    "vocabIds": [
                                        "a2u12_meningkatkan",
                                        "a2u12_mengembangkan",
                                        "a2u12_keterampilan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u12_meningkatkan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa meningkatkan?",
                                            "options": [
                                                "Mejorar; aumentar",
                                                "Desarrollar",
                                                "Destreza; competencia práctica"
                                            ],
                                            "answer": 0,
                                            "explanation": "Meningkatkan significa mejorar; aumentar."
                                        },
                                        {
                                            "vocabId": "a2u12_mengembangkan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Desarrollo mi capacidad.",
                                            "answer": "Saya mengembangkan kemampuan.",
                                            "explanation": "La frase usa mengembangkan."
                                        },
                                        {
                                            "vocabId": "a2u12_keterampilan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya punya keterampilan.",
                                            "explanation": "La oración contiene keterampilan."
                                        },
                                        {
                                            "vocabId": "a2u12_meningkatkan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando meningkatkan.",
                                            "hint": "Puedes tomar como modelo: Saya ingin meningkatkan kemampuan.",
                                            "modelAnswer": "Saya ingin meningkatkan kemampuan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        }
,
                                        {
                        "id": "a2_u13",
                        "title": "Unidad 13: Compras, pagos y productos",
                        "desc": "Compara precios, elige productos, paga y habla de compras.",
                        "grammar": "Biaya expresa el costo; terjangkau, asequible; diskon, descuento. Membayar es pagar; kartu, tarjeta; struk, recibo.",
                        "vocab": [
                            {
                                "id": "a2u13_biaya",
                                "idn": "biaya",
                                "esp": "Costo",
                                "ex": "Biaya barang ini berapa?",
                                "exEsp": "¿Cuánto cuesta este artículo?"
                            },
                            {
                                "id": "a2u13_terjangkau",
                                "idn": "terjangkau",
                                "esp": "Asequible",
                                "ex": "Tas ini terjangkau.",
                                "exEsp": "Este bolso es asequible."
                            },
                            {
                                "id": "a2u13_diskon",
                                "idn": "diskon",
                                "esp": "Descuento",
                                "ex": "Ada diskon hari ini.",
                                "exEsp": "Hoy hay descuento."
                            },
                            {
                                "id": "a2u13_membayar",
                                "idn": "membayar",
                                "esp": "Pagar",
                                "ex": "Saya membayar sekarang.",
                                "exEsp": "Pago ahora."
                            },
                            {
                                "id": "a2u13_kartu",
                                "idn": "kartu",
                                "esp": "Tarjeta",
                                "ex": "Saya memakai kartu.",
                                "exEsp": "Uso una tarjeta."
                            },
                            {
                                "id": "a2u13_struk",
                                "idn": "struk",
                                "esp": "Recibo",
                                "ex": "Saya membaca struk.",
                                "exEsp": "Leo el recibo."
                            },
                            {
                                "id": "a2u13_menawar",
                                "idn": "menawar",
                                "esp": "Regatear",
                                "ex": "Saya menawar harga tas.",
                                "exEsp": "Regateo el precio del bolso."
                            },
                            {
                                "id": "a2u13_membandingkan",
                                "idn": "membandingkan",
                                "esp": "Comparar",
                                "ex": "Saya membandingkan pakaian.",
                                "exEsp": "Comparo ropa."
                            },
                            {
                                "id": "a2u13_sesuai",
                                "idn": "sesuai",
                                "esp": "Adecuado",
                                "ex": "Pilihan ini sesuai.",
                                "exEsp": "Esta elección es adecuada."
                            },
                            {
                                "id": "a2u13_pusat_belanja",
                                "idn": "pusat belanja",
                                "esp": "Centro comercial",
                                "ex": "Pusat belanja itu besar.",
                                "exEsp": "Ese centro comercial es grande."
                            },
                            {
                                "id": "a2u13_penjual",
                                "idn": "penjual",
                                "esp": "Vendedor",
                                "ex": "Penjual itu ramah.",
                                "exEsp": "Ese vendedor es amable."
                            },
                            {
                                "id": "a2u13_pembeli",
                                "idn": "pembeli",
                                "esp": "Comprador",
                                "ex": "Pembeli menunggu.",
                                "exEsp": "El comprador espera."
                            }
                        ],
                        "lessons": [
                            {
                                "title": "Lección 1: Precios y gastos",
                                "objective": "Pregunta por el costo y reconoce precios asequibles.",
                                "grammar": "Practica estas expresiones en oraciones completas: biaya, terjangkau, diskon.",
                                "vocabIds": [
                                    "a2u13_biaya",
                                    "a2u13_terjangkau",
                                    "a2u13_diskon"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u13_biaya",
                                        "type": "mc",
                                        "prompt": "¿Qué significa biaya?",
                                        "options": [
                                            "Costo",
                                            "Asequible",
                                            "Descuento"
                                        ],
                                        "answer": 0,
                                        "explanation": "biaya significa costo."
                                    },
                                    {
                                        "vocabId": "a2u13_terjangkau",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Este bolso es asequible.",
                                        "answer": "Tas ini terjangkau.",
                                        "explanation": "La frase utiliza terjangkau."
                                    },
                                    {
                                        "vocabId": "a2u13_diskon",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Ada diskon hari ini.",
                                        "explanation": "La oración contiene diskon."
                                    },
                                    {
                                        "vocabId": "a2u13_biaya",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando biaya.",
                                        "hint": "Puedes tomar como modelo: Biaya barang ini berapa?",
                                        "modelAnswer": "Biaya barang ini berapa?",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    },
                                    {
                                        "vocabId": "a2u13_terjangkau",
                                        "type": "order",
                                        "prompt": "Ordena: Este bolso es asequible.",
                                        "words": [
                                            "terjangkau",
                                            "ini",
                                            "Tas"
                                        ],
                                        "correctOrder": [
                                            "Tas",
                                            "ini",
                                            "terjangkau"
                                        ],
                                        "explanation": "La frase completa es: Tas ini terjangkau."
                                    }
                                ]
                            },
                            {
                                "title": "Lección 2: Pagar y comprobar una compra",
                                "objective": "Habla de pagos con tarjeta y recibos.",
                                "grammar": "Practica estas expresiones en oraciones completas: membayar, kartu, struk.",
                                "vocabIds": [
                                    "a2u13_membayar",
                                    "a2u13_kartu",
                                    "a2u13_struk"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u13_membayar",
                                        "type": "mc",
                                        "prompt": "¿Qué significa membayar?",
                                        "options": [
                                            "Pagar",
                                            "Tarjeta",
                                            "Recibo"
                                        ],
                                        "answer": 0,
                                        "explanation": "membayar significa pagar."
                                    },
                                    {
                                        "vocabId": "a2u13_kartu",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Uso una tarjeta.",
                                        "answer": "Saya memakai kartu.",
                                        "explanation": "La frase utiliza kartu."
                                    },
                                    {
                                        "vocabId": "a2u13_struk",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Saya membaca struk.",
                                        "explanation": "La oración contiene struk."
                                    },
                                    {
                                        "vocabId": "a2u13_membayar",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando membayar.",
                                        "hint": "Puedes tomar como modelo: Saya membayar sekarang.",
                                        "modelAnswer": "Saya membayar sekarang.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    }
                                ]
                            },
                            {
                                "title": "Lección 3: Comparar productos y negociar precios",
                                "objective": "Compara productos y negocia el precio de una compra.",
                                "grammar": "Practica estas expresiones en oraciones completas: menawar, membandingkan, sesuai.",
                                "vocabIds": [
                                    "a2u13_menawar",
                                    "a2u13_membandingkan",
                                    "a2u13_sesuai"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u13_menawar",
                                        "type": "mc",
                                        "prompt": "¿Qué significa menawar?",
                                        "options": [
                                            "Regatear",
                                            "Comparar",
                                            "Adecuado"
                                        ],
                                        "answer": 0,
                                        "explanation": "menawar significa regatear."
                                    },
                                    {
                                        "vocabId": "a2u13_membandingkan",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Comparo ropa.",
                                        "answer": "Saya membandingkan pakaian.",
                                        "explanation": "La frase utiliza membandingkan."
                                    },
                                    {
                                        "vocabId": "a2u13_sesuai",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Pilihan ini sesuai.",
                                        "explanation": "La oración contiene sesuai."
                                    },
                                    {
                                        "vocabId": "a2u13_menawar",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando menawar.",
                                        "hint": "Puedes tomar como modelo: Saya menawar harga tas.",
                                        "modelAnswer": "Saya menawar harga tas.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    }
                                ]
                            },
                            {
                                "title": "Lección 4: Personas y lugares de compra",
                                "objective": "Identifica a compradores, vendedores y centros comerciales.",
                                "grammar": "Practica estas expresiones en oraciones completas: pusat belanja, penjual, pembeli.",
                                "vocabIds": [
                                    "a2u13_pusat_belanja",
                                    "a2u13_penjual",
                                    "a2u13_pembeli"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u13_pusat_belanja",
                                        "type": "mc",
                                        "prompt": "¿Qué significa pusat belanja?",
                                        "options": [
                                            "Centro comercial",
                                            "Vendedor",
                                            "Comprador"
                                        ],
                                        "answer": 0,
                                        "explanation": "pusat belanja significa centro comercial."
                                    },
                                    {
                                        "vocabId": "a2u13_penjual",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Ese vendedor es amable.",
                                        "answer": "Penjual itu ramah.",
                                        "explanation": "La frase utiliza penjual."
                                    },
                                    {
                                        "vocabId": "a2u13_pembeli",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Pembeli menunggu.",
                                        "explanation": "La oración contiene pembeli."
                                    },
                                    {
                                        "vocabId": "a2u13_pusat_belanja",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando pusat belanja.",
                                        "hint": "Puedes tomar como modelo: Pusat belanja itu besar.",
                                        "modelAnswer": "Pusat belanja itu besar.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "a2_u14",
                        "title": "Unidad 14: Viajes y transporte",
                        "desc": "Organiza desplazamientos y habla de estaciones, puertos, billetes y retrasos.",
                        "grammar": "Perjalanan nombra un viaje; bepergian, partir; mendarat, aterrizar. Karcis significa billete y keberangkatan, viaje.",
                        "vocab": [
                            {
                                "id": "a2u14_perjalanan",
                                "idn": "perjalanan",
                                "esp": "Viaje",
                                "ex": "Perjalanan saya jauh.",
                                "exEsp": "Mi viaje es largo."
                            },
                            {
                                "id": "a2u14_bepergian",
                                "idn": "bepergian",
                                "esp": "Viajar",
                                "ex": "Saya bepergian pagi.",
                                "exEsp": "Viajo por la mañana."
                            },
                            {
                                "id": "a2u14_mendarat",
                                "idn": "mendarat",
                                "esp": "Aterrizar",
                                "ex": "Pesawat mendarat pagi.",
                                "exEsp": "El avión aterriza por la mañana."
                            },
                            {
                                "id": "a2u14_bagasi",
                                "idn": "bagasi",
                                "esp": "Equipaje",
                                "ex": "Bagasi saya berat.",
                                "exEsp": "Mi equipaje es pesado."
                            },
                            {
                                "id": "a2u14_pelabuhan",
                                "idn": "pelabuhan",
                                "esp": "Puerto",
                                "ex": "Pelabuhan itu ramai.",
                                "exEsp": "Ese puerto está concurrido."
                            },
                            {
                                "id": "a2u14_karcis",
                                "idn": "karcis",
                                "esp": "Billete",
                                "ex": "Saya membeli karcis.",
                                "exEsp": "Compro un billete."
                            },
                            {
                                "id": "a2u14_kendaraan",
                                "idn": "kendaraan",
                                "esp": "Vehículo",
                                "ex": "Kendaraan datang.",
                                "exEsp": "El vehículo llega."
                            },
                            {
                                "id": "a2u14_angkutan",
                                "idn": "angkutan",
                                "esp": "Transporte",
                                "ex": "Saya naik angkutan umum.",
                                "exEsp": "Voy en transporte público."
                            },
                            {
                                "id": "a2u14_tertunda",
                                "idn": "tertunda",
                                "esp": "Retrasado",
                                "ex": "Perjalanan tertunda.",
                                "exEsp": "El viaje se retrasa."
                            },
                            {
                                "id": "a2u14_keberangkatan",
                                "idn": "keberangkatan",
                                "esp": "Salida",
                                "ex": "Keberangkatan angkutan pukul tujuh.",
                                "exEsp": "La salida del transporte es a las siete."
                            },
                            {
                                "id": "a2u14_pindah",
                                "idn": "pindah",
                                "esp": "Cambiar",
                                "ex": "Saya pindah angkutan.",
                                "exEsp": "Cambio de transporte."
                            },
                            {
                                "id": "a2u14_penumpang",
                                "idn": "penumpang",
                                "esp": "Pasajero",
                                "ex": "Penumpang menunggu.",
                                "exEsp": "Los pasajeros esperan."
                            }
                        ],
                        "lessons": [
                            {
                                "title": "Lección 1: Preparar un viaje",
                                "objective": "Describe un viaje y cuándo sales.",
                                "grammar": "Practica estas expresiones en oraciones completas: perjalanan, bepergian, mendarat.",
                                "vocabIds": [
                                    "a2u14_perjalanan",
                                    "a2u14_bepergian",
                                    "a2u14_mendarat"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u14_perjalanan",
                                        "type": "mc",
                                        "prompt": "¿Qué significa perjalanan?",
                                        "options": [
                                            "Viaje",
                                            "Viajar",
                                            "Aterrizar"
                                        ],
                                        "answer": 0,
                                        "explanation": "perjalanan significa viaje."
                                    },
                                    {
                                        "vocabId": "a2u14_bepergian",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Salgo por la mañana.",
                                        "answer": "Saya bepergian pagi.",
                                        "explanation": "La frase utiliza bepergian."
                                    },
                                    {
                                        "vocabId": "a2u14_mendarat",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Kendaraan tiba pagi.",
                                        "explanation": "La oración contiene mendarat."
                                    },
                                    {
                                        "vocabId": "a2u14_perjalanan",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando perjalanan.",
                                        "hint": "Puedes tomar como modelo: Perjalanan saya jauh.",
                                        "modelAnswer": "Perjalanan saya jauh.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    },
                                    {
                                        "vocabId": "a2u14_bepergian",
                                        "type": "order",
                                        "prompt": "Ordena: Salgo por la mañana.",
                                        "words": [
                                            "pagi",
                                            "bepergian",
                                            "Saya"
                                        ],
                                        "correctOrder": [
                                            "Saya",
                                            "bepergian",
                                            "pagi"
                                        ],
                                        "explanation": "La frase completa es: Saya bepergian pagi."
                                    }
                                ]
                            },
                            {
                                "title": "Lección 2: Estaciones, puertos y billetes",
                                "objective": "Identifica lugares y billetes de transporte.",
                                "grammar": "Practica estas expresiones en oraciones completas: bagasi, pelabuhan, karcis.",
                                "vocabIds": [
                                    "a2u14_bagasi",
                                    "a2u14_pelabuhan",
                                    "a2u14_karcis"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u14_bagasi",
                                        "type": "mc",
                                        "prompt": "¿Qué significa bagasi?",
                                        "options": [
                                            "Equipaje",
                                            "Puerto",
                                            "Billete"
                                        ],
                                        "answer": 0,
                                        "explanation": "bagasi significa equipaje."
                                    },
                                    {
                                        "vocabId": "a2u14_pelabuhan",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Ese puerto está concurrido.",
                                        "answer": "Pelabuhan itu ramai.",
                                        "explanation": "La frase utiliza pelabuhan."
                                    },
                                    {
                                        "vocabId": "a2u14_karcis",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Saya membeli karcis.",
                                        "explanation": "La oración contiene karcis."
                                    },
                                    {
                                        "vocabId": "a2u14_bagasi",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando bagasi.",
                                        "hint": "Puedes tomar como modelo: Stasiun itu besar.",
                                        "modelAnswer": "Stasiun itu besar.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    }
                                ]
                            },
                            {
                                "title": "Lección 3: Medios de transporte",
                                "objective": "Habla de vehículoes y autoangkutanes.",
                                "grammar": "Practica estas expresiones en oraciones completas: kendaraan, angkutan, tertunda.",
                                "vocabIds": [
                                    "a2u14_kendaraan",
                                    "a2u14_angkutan",
                                    "a2u14_tertunda"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u14_kendaraan",
                                        "type": "mc",
                                        "prompt": "¿Qué significa kendaraan?",
                                        "options": [
                                            "Vehículo",
                                            "Transporte",
                                            "Retrasado"
                                        ],
                                        "answer": 0,
                                        "explanation": "kendaraan significa vehículo."
                                    },
                                    {
                                        "vocabId": "a2u14_angkutan",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Voy en transporte público.",
                                        "answer": "Saya naik angkutan umum.",
                                        "explanation": "La frase utiliza angkutan."
                                    },
                                    {
                                        "vocabId": "a2u14_tertunda",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Perjalanan tertunda.",
                                        "explanation": "La oración contiene tertunda."
                                    },
                                    {
                                        "vocabId": "a2u14_kendaraan",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando kendaraan.",
                                        "hint": "Puedes tomar como modelo: Kereta datang.",
                                        "modelAnswer": "Kereta datang.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    }
                                ]
                            },
                            {
                                "title": "Lección 4: Salidas y cambios de ruta",
                                "objective": "Explica retrasos, viajes y cambios de ruta.",
                                "grammar": "Practica estas expresiones en oraciones completas: keberangkatan, pindah, penumpang.",
                                "vocabIds": [
                                    "a2u14_keberangkatan",
                                    "a2u14_pindah",
                                    "a2u14_penumpang"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u14_keberangkatan",
                                        "type": "mc",
                                        "prompt": "¿Qué significa keberangkatan?",
                                        "options": [
                                            "Salida",
                                            "Cambiar",
                                            "Pasajero"
                                        ],
                                        "answer": 0,
                                        "explanation": "keberangkatan significa viaje."
                                    },
                                    {
                                        "vocabId": "a2u14_pindah",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Cambio de transporte.",
                                        "answer": "Saya pindah angkutan.",
                                        "explanation": "La frase utiliza pindah."
                                    },
                                    {
                                        "vocabId": "a2u14_penumpang",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Penumpang menunggu.",
                                        "explanation": "La oración contiene penumpang."
                                    },
                                    {
                                        "vocabId": "a2u14_keberangkatan",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando keberangkatan.",
                                        "hint": "Puedes tomar como modelo: Keberangkatan angkutan pukul tujuh.",
                                        "modelAnswer": "Keberangkatan angkutan pukul tujuh.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "a2_u15",
                        "title": "Unidad 15: Invitaciones y planes",
                        "desc": "Invita a otras personas, confirma asistencia y organiza o cambia planes.",
                        "grammar": "Mengundang significa invitar y undangan, invitación. Hadir es asistir; berhalangan, no poder asistir; merencanakan, planear.",
                        "vocab": [
                            {
                                "id": "a2u15_mengusulkan",
                                "idn": "mengusulkan",
                                "esp": "Proponer",
                                "ex": "Saya mengusulkan kegiatan kepada teman.",
                                "exEsp": "Propongo una actividad a un amigo."
                            },
                            {
                                "id": "a2u15_undangan",
                                "idn": "undangan",
                                "esp": "Invitación",
                                "ex": "Ini undangan untuk kamu.",
                                "exEsp": "Esta invitación es para ti."
                            },
                            {
                                "id": "a2u15_aktivitas",
                                "idn": "aktivitas",
                                "esp": "Actividad",
                                "ex": "Aktivitas mulai pagi.",
                                "exEsp": "La actividad empieza por la mañana."
                            },
                            {
                                "id": "a2u15_pesta",
                                "idn": "pesta",
                                "esp": "Fiesta",
                                "ex": "Pesta itu ramai.",
                                "exEsp": "Esa fiesta está concurrida."
                            },
                            {
                                "id": "a2u15_hadir",
                                "idn": "hadir",
                                "esp": "Asistir",
                                "ex": "Saya hadir besok.",
                                "exEsp": "Asistiré mañana."
                            },
                            {
                                "id": "a2u15_berhalangan",
                                "idn": "berhalangan",
                                "esp": "No poder asistir",
                                "ex": "Saya berhalangan hari ini.",
                                "exEsp": "Hoy no puedo asistir."
                            },
                            {
                                "id": "a2u15_berjanji",
                                "idn": "berjanji",
                                "esp": "Quedar; prometer",
                                "ex": "Kami berjanji berjumpa.",
                                "exEsp": "Hemos quedado en vernos."
                            },
                            {
                                "id": "a2u15_berjumpa",
                                "idn": "berjumpa",
                                "esp": "Encontrarse",
                                "ex": "Kami berjumpa di rumah.",
                                "exEsp": "Nos encontramos en casa."
                            },
                            {
                                "id": "a2u15_merencanakan",
                                "idn": "merencanakan",
                                "esp": "Planear",
                                "ex": "Kami merencanakan pesta.",
                                "exEsp": "Planeamos una fiesta."
                            },
                            {
                                "id": "a2u15_membatalkan",
                                "idn": "membatalkan",
                                "esp": "Cancelar",
                                "ex": "Kami membatalkan pesta.",
                                "exEsp": "Cancelamos la fiesta."
                            },
                            {
                                "id": "a2u15_menemani",
                                "idn": "menemani",
                                "esp": "Acompañar",
                                "ex": "Saya menemani teman.",
                                "exEsp": "Acompaño a un amigo."
                            },
                            {
                                "id": "a2u15_pertemuan",
                                "idn": "pertemuan",
                                "esp": "Reunión",
                                "ex": "Pertemuan itu penting.",
                                "exEsp": "Esa reunión es importante."
                            }
                        ],
                        "lessons": [
                            {
                                "title": "Lección 1: Hacer una invitación",
                                "objective": "Invita a alguien y entiende una invitación.",
                                "grammar": "Practica estas expresiones en oraciones completas: mengusulkan, undangan, aktivitas.",
                                "vocabIds": [
                                    "a2u15_mengusulkan",
                                    "a2u15_undangan",
                                    "a2u15_aktivitas"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u15_mengusulkan",
                                        "type": "mc",
                                        "prompt": "¿Qué significa mengusulkan?",
                                        "options": [
                                            "Proponer",
                                            "Invitación",
                                            "Actividad"
                                        ],
                                        "answer": 0,
                                        "explanation": "mengusulkan significa invitar."
                                    },
                                    {
                                        "vocabId": "a2u15_undangan",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Esta invitación es para ti.",
                                        "answer": "Ini undangan untuk kamu.",
                                        "explanation": "La frase utiliza undangan."
                                    },
                                    {
                                        "vocabId": "a2u15_aktivitas",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Aktivitas mulai pagi.",
                                        "explanation": "La oración contiene aktivitas."
                                    },
                                    {
                                        "vocabId": "a2u15_mengusulkan",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando mengusulkan.",
                                        "hint": "Puedes tomar como modelo: Saya mengusulkan kegiatan kepada teman.",
                                        "modelAnswer": "Saya mengusulkan kegiatan kepada teman.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    },
                                    {
                                        "vocabId": "a2u15_undangan",
                                        "type": "order",
                                        "prompt": "Ordena: Esta invitación es para ti.",
                                        "words": [
                                            "kamu",
                                            "untuk",
                                            "undangan",
                                            "Ini"
                                        ],
                                        "correctOrder": [
                                            "Ini",
                                            "undangan",
                                            "untuk",
                                            "kamu"
                                        ],
                                        "explanation": "La frase completa es: Ini undangan untuk kamu."
                                    }
                                ]
                            },
                            {
                                "title": "Lección 2: Eventos y asistencia",
                                "objective": "Confirma si puedes asistir a una fiesta o actividad.",
                                "grammar": "Practica estas expresiones en oraciones completas: pesta, hadir, berhalangan.",
                                "vocabIds": [
                                    "a2u15_pesta",
                                    "a2u15_hadir",
                                    "a2u15_berhalangan"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u15_pesta",
                                        "type": "mc",
                                        "prompt": "¿Qué significa pesta?",
                                        "options": [
                                            "Fiesta",
                                            "Asistir",
                                            "No poder asistir"
                                        ],
                                        "answer": 0,
                                        "explanation": "pesta significa fiesta."
                                    },
                                    {
                                        "vocabId": "a2u15_hadir",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Asistiré mañana.",
                                        "answer": "Saya hadir besok.",
                                        "explanation": "La frase utiliza hadir."
                                    },
                                    {
                                        "vocabId": "a2u15_berhalangan",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Saya berhalangan hari ini.",
                                        "explanation": "La oración contiene berhalangan."
                                    },
                                    {
                                        "vocabId": "a2u15_pesta",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando pesta.",
                                        "hint": "Puedes tomar como modelo: Pesta itu ramai.",
                                        "modelAnswer": "Pesta itu ramai.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    }
                                ]
                            },
                            {
                                "title": "Lección 3: Quedar y encontrarse",
                                "objective": "Queda con alguien y habla de reuniones.",
                                "grammar": "Practica estas expresiones en oraciones completas: berjanji, berjumpa, merencanakan.",
                                "vocabIds": [
                                    "a2u15_berjanji",
                                    "a2u15_berjumpa",
                                    "a2u15_merencanakan"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u15_berjanji",
                                        "type": "mc",
                                        "prompt": "¿Qué significa berjanji?",
                                        "options": [
                                            "Quedar; prometer",
                                            "Encontrarse",
                                            "Planear"
                                        ],
                                        "answer": 0,
                                        "explanation": "berjanji significa quedar; prometer."
                                    },
                                    {
                                        "vocabId": "a2u15_berjumpa",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Nos encontramos en casa.",
                                        "answer": "Kami berjumpa di rumah.",
                                        "explanation": "La frase utiliza berjumpa."
                                    },
                                    {
                                        "vocabId": "a2u15_merencanakan",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Kami merencanakan pesta.",
                                        "explanation": "La oración contiene merencanakan."
                                    },
                                    {
                                        "vocabId": "a2u15_berjanji",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando berjanji.",
                                        "hint": "Puedes tomar como modelo: Kami berjanji berjumpa.",
                                        "modelAnswer": "Kami berjanji berjumpa.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    }
                                ]
                            },
                            {
                                "title": "Lección 4: Organizar y cambiar planes",
                                "objective": "Explica planes, cambios y cancelaciones.",
                                "grammar": "Practica estas expresiones en oraciones completas: membatalkan, menemani, pertemuan.",
                                "vocabIds": [
                                    "a2u15_membatalkan",
                                    "a2u15_menemani",
                                    "a2u15_pertemuan"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u15_membatalkan",
                                        "type": "mc",
                                        "prompt": "¿Qué significa membatalkan?",
                                        "options": [
                                            "Cancelar",
                                            "Acompañar",
                                            "Reunión"
                                        ],
                                        "answer": 0,
                                        "explanation": "membatalkan significa cancelar."
                                    },
                                    {
                                        "vocabId": "a2u15_menemani",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Acompaño a un amigo.",
                                        "answer": "Saya menemani teman.",
                                        "explanation": "La frase utiliza menemani."
                                    },
                                    {
                                        "vocabId": "a2u15_pertemuan",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Kami belajar pertemuan.",
                                        "explanation": "La oración contiene pertemuan."
                                    },
                                    {
                                        "vocabId": "a2u15_membatalkan",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando membatalkan.",
                                        "hint": "Puedes tomar como modelo: Kami membatalkan pesta.",
                                        "modelAnswer": "Kami membatalkan pesta.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "a2_u16",
                        "title": "Unidad 16: Relatar experiencias y vacaciones",
                        "desc": "Ordena acontecimientos sencillos y cuenta experiencias recientes, visitas y vacaciones.",
                        "grammar": "Kemarin y semalam sitúan acciones en el pasado. Pernah expresa que algo se ha hecho alguna vez. Mula-mula, sesudahnya y pada akhirnya ordenan acontecimientos.",
                        "vocab": [
                            {
                                "id": "a2u16_kemarin",
                                "idn": "kemarin",
                                "esp": "Ayer",
                                "ex": "Kemarin saya belajar.",
                                "exEsp": "Ayer estudié."
                            },
                            {
                                "id": "a2u16_semalam",
                                "idn": "semalam",
                                "esp": "Anoche",
                                "ex": "Semalam saya tidur.",
                                "exEsp": "Anoche dormí."
                            },
                            {
                                "id": "a2u16_pernah",
                                "idn": "pernah",
                                "esp": "Alguna vez",
                                "ex": "Saya pernah ke Bali.",
                                "exEsp": "He estado en Bali alguna vez."
                            },
                            {
                                "id": "a2u16_mula_mula",
                                "idn": "mula-mula",
                                "esp": "Al principio",
                                "ex": "Mula-mula saya makan.",
                                "exEsp": "Al principio comí."
                            },
                            {
                                "id": "a2u16_sesudahnya",
                                "idn": "sesudahnya",
                                "esp": "Después",
                                "ex": "Sesudahnya kami makan.",
                                "exEsp": "Después comimos."
                            },
                            {
                                "id": "a2u16_pada_akhirnya",
                                "idn": "pada akhirnya",
                                "esp": "Al final",
                                "ex": "Pada akhirnya saya tiba.",
                                "exEsp": "Al final llegué."
                            },
                            {
                                "id": "a2u16_liburan",
                                "idn": "liburan",
                                "esp": "Vacaciones",
                                "ex": "Liburan saya menyenangkan.",
                                "exEsp": "Mis vacaciones son agradables."
                            },
                            {
                                "id": "a2u16_mendatangi",
                                "idn": "mendatangi",
                                "esp": "Visitar",
                                "ex": "Saya mendatangi teman.",
                                "exEsp": "Visito a un amigo."
                            },
                            {
                                "id": "a2u16_menginap",
                                "idn": "menginap",
                                "esp": "Alojarse",
                                "ex": "Kami menginap di hotel.",
                                "exEsp": "Nos alojamos en un hotel."
                            },
                            {
                                "id": "a2u16_berfoto",
                                "idn": "berfoto",
                                "esp": "Hacerse fotos",
                                "ex": "Saya berfoto di pantai.",
                                "exEsp": "Me hago fotos en la playa."
                            },
                            {
                                "id": "a2u16_pemandangan",
                                "idn": "pemandangan",
                                "esp": "Paisaje",
                                "ex": "Pemandangan hari ini indah.",
                                "exEsp": "Hoy el paisaje es hermoso."
                            },
                            {
                                "id": "a2u16_menyenangkan",
                                "idn": "menyenangkan",
                                "esp": "Agradable",
                                "ex": "Liburan itu menyenangkan.",
                                "exEsp": "Esas vacaciones fueron agradables."
                            }
                        ],
                        "lessons": [
                            {
                                "title": "Lección 1: Expresiones de tiempo pasado",
                                "objective": "Sitúa acciones con expresiones de tiempo.",
                                "grammar": "Practica estas expresiones en oraciones completas: kemarin, semalam, pernah.",
                                "vocabIds": [
                                    "a2u16_kemarin",
                                    "a2u16_semalam",
                                    "a2u16_pernah"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u16_kemarin",
                                        "type": "mc",
                                        "prompt": "¿Qué significa kemarin?",
                                        "options": [
                                            "Ayer",
                                            "Anoche",
                                            "Alguna vez"
                                        ],
                                        "answer": 0,
                                        "explanation": "kemarin significa ayer."
                                    },
                                    {
                                        "vocabId": "a2u16_semalam",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Anoche dormí.",
                                        "answer": "Semalam saya tidur.",
                                        "explanation": "La frase utiliza semalam."
                                    },
                                    {
                                        "vocabId": "a2u16_pernah",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Saya pernah ke Bali.",
                                        "explanation": "La oración contiene pernah."
                                    },
                                    {
                                        "vocabId": "a2u16_kemarin",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando kemarin.",
                                        "hint": "Puedes tomar como modelo: Kemarin saya belajar.",
                                        "modelAnswer": "Kemarin saya belajar.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    },
                                    {
                                        "vocabId": "a2u16_semalam",
                                        "type": "order",
                                        "prompt": "Ordena: Anoche dormí.",
                                        "words": [
                                            "tidur",
                                            "saya",
                                            "Semalam"
                                        ],
                                        "correctOrder": [
                                            "Semalam",
                                            "saya",
                                            "tidur"
                                        ],
                                        "explanation": "La frase completa es: Semalam saya tidur."
                                    }
                                ]
                            },
                            {
                                "title": "Lección 2: Ordenar acontecimientos",
                                "objective": "Cuenta acontecimientos en orden cronológico.",
                                "grammar": "Practica estas expresiones en oraciones completas: mula-mula, sesudahnya, pada akhirnya.",
                                "vocabIds": [
                                    "a2u16_mula_mula",
                                    "a2u16_sesudahnya",
                                    "a2u16_pada_akhirnya"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u16_mula_mula",
                                        "type": "mc",
                                        "prompt": "¿Qué significa mula-mula?",
                                        "options": [
                                            "Al principio",
                                            "Después",
                                            "Al final"
                                        ],
                                        "answer": 0,
                                        "explanation": "mula-mula significa al principio."
                                    },
                                    {
                                        "vocabId": "a2u16_sesudahnya",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Después comimos.",
                                        "answer": "Sesudahnya kami makan.",
                                        "explanation": "La frase utiliza sesudahnya."
                                    },
                                    {
                                        "vocabId": "a2u16_pada_akhirnya",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Pada akhirnya saya tiba.",
                                        "explanation": "La oración contiene pada akhirnya."
                                    },
                                    {
                                        "vocabId": "a2u16_mula_mula",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando mula-mula.",
                                        "hint": "Puedes tomar como modelo: Mula-mula saya makan.",
                                        "modelAnswer": "Mula-mula saya makan.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    }
                                ]
                            },
                            {
                                "title": "Lección 3: Vacaciones y visitas",
                                "objective": "Habla de visitas y alojamiento durante un viaje.",
                                "grammar": "Practica estas expresiones en oraciones completas: liburan, mendatangi, menginap.",
                                "vocabIds": [
                                    "a2u16_liburan",
                                    "a2u16_mendatangi",
                                    "a2u16_menginap"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u16_liburan",
                                        "type": "mc",
                                        "prompt": "¿Qué significa liburan?",
                                        "options": [
                                            "Vacaciones",
                                            "Visitar",
                                            "Alojarse"
                                        ],
                                        "answer": 0,
                                        "explanation": "liburan significa vacaciones."
                                    },
                                    {
                                        "vocabId": "a2u16_mendatangi",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Visito a un amigo.",
                                        "answer": "Saya mendatangi teman.",
                                        "explanation": "La frase utiliza mendatangi."
                                    },
                                    {
                                        "vocabId": "a2u16_menginap",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Kami menginap di hotel.",
                                        "explanation": "La oración contiene menginap."
                                    },
                                    {
                                        "vocabId": "a2u16_liburan",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando liburan.",
                                        "hint": "Puedes tomar como modelo: Liburan saya menyenangkan.",
                                        "modelAnswer": "Liburan saya menyenangkan.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    }
                                ]
                            },
                            {
                                "title": "Lección 4: Describir una experiencia",
                                "objective": "Describe el tiempo y valora una experiencia.",
                                "grammar": "Practica estas expresiones en oraciones completas: berfoto, pemandangan, menyenangkan.",
                                "vocabIds": [
                                    "a2u16_berfoto",
                                    "a2u16_pemandangan",
                                    "a2u16_menyenangkan"
                                ],
                                "exercises": [
                                    {
                                        "vocabId": "a2u16_berfoto",
                                        "type": "mc",
                                        "prompt": "¿Qué significa berfoto?",
                                        "options": [
                                            "Hacerse fotos",
                                            "Paisaje",
                                            "Agradable"
                                        ],
                                        "answer": 0,
                                        "explanation": "berfoto significa hacerse fotos."
                                    },
                                    {
                                        "vocabId": "a2u16_pemandangan",
                                        "type": "translate_es_id",
                                        "prompt": "Traduce: Hoy el paisaje es hermoso.",
                                        "answer": "Pemandangan hari ini indah.",
                                        "explanation": "La frase utiliza pemandangan."
                                    },
                                    {
                                        "vocabId": "a2u16_menyenangkan",
                                        "type": "listen",
                                        "prompt": "Escucha y escribe la oración.",
                                        "answer": "Liburan itu menyenangkan.",
                                        "explanation": "La oración contiene menyenangkan."
                                    },
                                    {
                                        "vocabId": "a2u16_berfoto",
                                        "type": "write",
                                        "prompt": "Escribe una frase usando berfoto.",
                                        "hint": "Puedes tomar como modelo: Saya berfoto di pantai.",
                                        "modelAnswer": "Saya berfoto di pantai.",
                                        "explanation": "Usa el vocabulario en una oración completa."
                                    }
                                ]
                            }
                        ]
                    }
,
                        {
                            "id": "a2_u17",
                            "title": "Unidad 17: Salud, consultas y cuidados",
                            "desc": "Describe síntomas, consultas médicas, tratamientos y hábitos de cuidado.",
                            "grammar": "Para describir sensaciones usa merasa + adjetivo; para hablar de atención médica, menjalani pemeriksaan y mendapat perawatan. Usa terhadap para indicar aquello que causa una alergia.",
                            "vocab": [
                                {
                                    "id": "a2u17_pemeriksaan",
                                    "idn": "pemeriksaan",
                                    "esp": "Chequeo médico",
                                    "ex": "Saya menjalani pemeriksaan rutin.",
                                    "exEsp": "Me hago un chequeo rutinario."
                                },
                                {
                                    "id": "a2u17_gejala",
                                    "idn": "gejala",
                                    "esp": "Síntoma",
                                    "ex": "Gejala itu muncul kemarin.",
                                    "exEsp": "Ese síntoma apareció ayer."
                                },
                                {
                                    "id": "a2u17_mual",
                                    "idn": "mual",
                                    "esp": "Náuseas",
                                    "ex": "Saya merasa mual setelah makan.",
                                    "exEsp": "Siento náuseas después de comer."
                                },
                                {
                                    "id": "a2u17_pilek",
                                    "idn": "pilek",
                                    "esp": "Resfriado",
                                    "ex": "Adik saya sedang pilek.",
                                    "exEsp": "Mi hermano menor está resfriado."
                                },
                                {
                                    "id": "a2u17_resep",
                                    "idn": "resep",
                                    "esp": "Receta médica",
                                    "ex": "Dokter memberi saya resep.",
                                    "exEsp": "El médico me dio una receta."
                                },
                                {
                                    "id": "a2u17_apotek",
                                    "idn": "apotek",
                                    "esp": "Farmacia",
                                    "ex": "Apotek itu buka sampai malam.",
                                    "exEsp": "Esa farmacia abre hasta la noche."
                                },
                                {
                                    "id": "a2u17_tekanan_darah",
                                    "idn": "tekanan darah",
                                    "esp": "Presión arterial",
                                    "ex": "Perawat memeriksa tekanan darah saya.",
                                    "exEsp": "La enfermera me mide la presión arterial."
                                },
                                {
                                    "id": "a2u17_alergi",
                                    "idn": "alergi",
                                    "esp": "Alergia",
                                    "ex": "Saya punya alergi terhadap kacang.",
                                    "exEsp": "Tengo alergia a los cacahuetes."
                                },
                                {
                                    "id": "a2u17_pemulihan",
                                    "idn": "pemulihan",
                                    "esp": "Recuperación",
                                    "ex": "Pemulihan membutuhkan waktu.",
                                    "exEsp": "La recuperación necesita tiempo."
                                },
                                {
                                    "id": "a2u17_vitamin",
                                    "idn": "vitamin",
                                    "esp": "Vitamina",
                                    "ex": "Saya minum vitamin setiap pagi.",
                                    "exEsp": "Tomo vitaminas cada mañana."
                                },
                                {
                                    "id": "a2u17_perawatan",
                                    "idn": "perawatan",
                                    "esp": "Tratamiento y cuidado",
                                    "ex": "Perawatan ini sangat penting.",
                                    "exEsp": "Este tratamiento es muy importante."
                                },
                                {
                                    "id": "a2u17_pusing",
                                    "idn": "pusing",
                                    "esp": "Mareo",
                                    "ex": "Saya merasa pusing hari ini.",
                                    "exEsp": "Hoy me siento mareado."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Síntomas y chequeos",
                                    "objective": "Describe síntomas y explica cuándo necesitas una revisión médica.",
                                    "grammar": "Practica merasa + adjetivo y las expresiones para describir síntomas.",
                                    "vocabIds": [
                                        "a2u17_pemeriksaan",
                                        "a2u17_gejala",
                                        "a2u17_mual"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u17_pemeriksaan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pemeriksaan»?",
                                            "options": [
                                                "Chequeo médico",
                                                "Resfriado",
                                                "Receta médica"
                                            ],
                                            "answer": 0,
                                            "explanation": "«pemeriksaan» significa «Chequeo médico»."
                                        },
                                        {
                                            "vocabId": "a2u17_gejala",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Ese síntoma apareció ayer.",
                                            "answer": "Gejala itu muncul kemarin.",
                                            "explanation": "La frase utiliza «gejala»."
                                        },
                                        {
                                            "vocabId": "a2u17_mual",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya merasa mual setelah makan.",
                                            "explanation": "La oración contiene «mual»."
                                        },
                                        {
                                            "vocabId": "a2u17_pemeriksaan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pemeriksaan.",
                                            "hint": "Puedes tomar como modelo: Saya menjalani pemeriksaan rutin.",
                                            "modelAnswer": "Saya menjalani pemeriksaan rutin.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u17_gejala",
                                            "type": "order",
                                            "prompt": "Ordena: Ese síntoma apareció ayer.",
                                            "words": [
                                                "kemarin",
                                                "muncul",
                                                "itu",
                                                "Gejala"
                                            ],
                                            "correctOrder": [
                                                "Gejala",
                                                "itu",
                                                "muncul",
                                                "kemarin"
                                            ],
                                            "explanation": "La frase completa es: Gejala itu muncul kemarin."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Atención médica y farmacia",
                                    "objective": "Habla de recetas, farmacias y consultas con profesionales de salud.",
                                    "grammar": "Practica expresiones para recibir indicaciones y comprar productos en una farmacia.",
                                    "vocabIds": [
                                        "a2u17_pilek",
                                        "a2u17_resep",
                                        "a2u17_apotek"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u17_pilek",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pilek»?",
                                            "options": [
                                                "Resfriado",
                                                "Presión arterial",
                                                "Alergia"
                                            ],
                                            "answer": 0,
                                            "explanation": "«pilek» significa «Resfriado»."
                                        },
                                        {
                                            "vocabId": "a2u17_resep",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: El médico me dio una receta.",
                                            "answer": "Dokter memberi saya resep.",
                                            "explanation": "La frase utiliza «resep»."
                                        },
                                        {
                                            "vocabId": "a2u17_apotek",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Apotek itu buka sampai malam.",
                                            "explanation": "La oración contiene «apotek»."
                                        },
                                        {
                                            "vocabId": "a2u17_pilek",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pilek.",
                                            "hint": "Puedes tomar como modelo: Adik saya sedang pilek.",
                                            "modelAnswer": "Adik saya sedang pilek.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Condiciones y alergias",
                                    "objective": "Explica alergias y comunica información importante sobre tu salud.",
                                    "grammar": "Usa punya alergi terhadap para indicar una alergia y explica sus efectos.",
                                    "vocabIds": [
                                        "a2u17_tekanan_darah",
                                        "a2u17_alergi",
                                        "a2u17_pemulihan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u17_tekanan_darah",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «tekanan darah»?",
                                            "options": [
                                                "Presión arterial",
                                                "Vitamina",
                                                "Tratamiento y cuidado"
                                            ],
                                            "answer": 0,
                                            "explanation": "«tekanan darah» significa «Presión arterial»."
                                        },
                                        {
                                            "vocabId": "a2u17_alergi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Tengo alergia a los cacahuetes.",
                                            "answer": "Saya punya alergi terhadap kacang.",
                                            "explanation": "La frase utiliza «alergi»."
                                        },
                                        {
                                            "vocabId": "a2u17_pemulihan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pemulihan membutuhkan waktu.",
                                            "explanation": "La oración contiene «pemulihan»."
                                        },
                                        {
                                            "vocabId": "a2u17_tekanan_darah",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando tekanan darah.",
                                            "hint": "Puedes tomar como modelo: Perawat memeriksa tekanan darah saya.",
                                            "modelAnswer": "Perawat memeriksa tekanan darah saya.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Recuperación y prevención",
                                    "objective": "Describe la recuperación y hábitos sencillos de cuidado personal.",
                                    "grammar": "Practica expresiones de duración, cuidado y prevención.",
                                    "vocabIds": [
                                        "a2u17_vitamin",
                                        "a2u17_perawatan",
                                        "a2u17_pusing"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u17_vitamin",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «vitamin»?",
                                            "options": [
                                                "Vitamina",
                                                "Chequeo médico",
                                                "Síntoma"
                                            ],
                                            "answer": 0,
                                            "explanation": "«vitamin» significa «Vitamina»."
                                        },
                                        {
                                            "vocabId": "a2u17_perawatan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Este tratamiento es muy importante.",
                                            "answer": "Perawatan ini sangat penting.",
                                            "explanation": "La frase utiliza «perawatan»."
                                        },
                                        {
                                            "vocabId": "a2u17_pusing",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya merasa pusing hari ini.",
                                            "explanation": "La oración contiene «pusing»."
                                        },
                                        {
                                            "vocabId": "a2u17_vitamin",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando vitamin.",
                                            "hint": "Puedes tomar como modelo: Saya minum vitamin setiap pagi.",
                                            "modelAnswer": "Saya minum vitamin setiap pagi.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u18",
                            "title": "Unidad 18: Vivienda y comunidad",
                            "desc": "Describe espacios de una vivienda, el vecindario y tareas de mantenimiento.",
                            "grammar": "Usa di para indicar dónde está algo y perlu + verbo para expresar una necesidad. Las expresiones de vivienda ayudan a explicar problemas y mejoras del hogar.",
                            "vocab": [
                                {
                                    "id": "a2u18_tetangga",
                                    "idn": "tetangga",
                                    "esp": "Vecino",
                                    "ex": "Tetangga baru kami ramah.",
                                    "exEsp": "Nuestro nuevo vecino es amable."
                                },
                                {
                                    "id": "a2u18_lingkungan",
                                    "idn": "lingkungan",
                                    "esp": "Vecindario",
                                    "ex": "Lingkungan ini tenang.",
                                    "exEsp": "Este vecindario es tranquilo."
                                },
                                {
                                    "id": "a2u18_halaman",
                                    "idn": "halaman",
                                    "esp": "Patio",
                                    "ex": "Anak-anak bermain di halaman.",
                                    "exEsp": "Los niños juegan en el patio."
                                },
                                {
                                    "id": "a2u18_pagar",
                                    "idn": "pagar",
                                    "esp": "Cerca",
                                    "ex": "Pagar rumah itu tinggi.",
                                    "exEsp": "La cerca de esa casa es alta."
                                },
                                {
                                    "id": "a2u18_kebocoran",
                                    "idn": "kebocoran",
                                    "esp": "Fuga",
                                    "ex": "Ada kebocoran di atap.",
                                    "exEsp": "Hay una fuga en el techo."
                                },
                                {
                                    "id": "a2u18_saluran_air",
                                    "idn": "saluran air",
                                    "esp": "Desagüe",
                                    "ex": "Saluran air perlu dibersihkan.",
                                    "exEsp": "Hay que limpiar el desagüe."
                                },
                                {
                                    "id": "a2u18_garasi",
                                    "idn": "garasi",
                                    "esp": "Garaje",
                                    "ex": "Sepeda disimpan di garasi.",
                                    "exEsp": "La bicicleta se guarda en el garaje."
                                },
                                {
                                    "id": "a2u18_renovasi",
                                    "idn": "renovasi",
                                    "esp": "Reforma",
                                    "ex": "Renovasi rumah dimulai bulan depan.",
                                    "exEsp": "La reforma de la casa empieza el próximo mes."
                                },
                                {
                                    "id": "a2u18_teras",
                                    "idn": "teras",
                                    "esp": "Terraza",
                                    "ex": "Kami duduk di teras.",
                                    "exEsp": "Nos sentamos en la terraza."
                                },
                                {
                                    "id": "a2u18_ruang_tamu",
                                    "idn": "ruang tamu",
                                    "esp": "Sala de estar",
                                    "ex": "Ruang tamu itu luas.",
                                    "exEsp": "Esa sala de estar es amplia."
                                },
                                {
                                    "id": "a2u18_pemilik_rumah",
                                    "idn": "pemilik rumah",
                                    "esp": "Propietario de la vivienda",
                                    "ex": "Pemilik rumah datang pagi ini.",
                                    "exEsp": "El propietario de la vivienda vino esta mañana."
                                },
                                {
                                    "id": "a2u18_penyewa",
                                    "idn": "penyewa",
                                    "esp": "Inquilino",
                                    "ex": "Penyewa membayar sewa setiap bulan.",
                                    "exEsp": "El inquilino paga el alquiler cada mes."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Vecinos y entorno",
                                    "objective": "Describe a tus vecinos y el ambiente de tu comunidad.",
                                    "grammar": "Practica adjetivos para describir el vecindario y relaciones con otras personas.",
                                    "vocabIds": [
                                        "a2u18_tetangga",
                                        "a2u18_lingkungan",
                                        "a2u18_halaman"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u18_tetangga",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «tetangga»?",
                                            "options": [
                                                "Vecino",
                                                "Cerca",
                                                "Fuga"
                                            ],
                                            "answer": 0,
                                            "explanation": "«tetangga» significa «Vecino»."
                                        },
                                        {
                                            "vocabId": "a2u18_lingkungan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Este vecindario es tranquilo.",
                                            "answer": "Lingkungan ini tenang.",
                                            "explanation": "La frase utiliza «lingkungan»."
                                        },
                                        {
                                            "vocabId": "a2u18_halaman",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Anak-anak bermain di halaman.",
                                            "explanation": "La oración contiene «halaman»."
                                        },
                                        {
                                            "vocabId": "a2u18_tetangga",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando tetangga.",
                                            "hint": "Puedes tomar como modelo: Tetangga baru kami ramah.",
                                            "modelAnswer": "Tetangga baru kami ramah.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u18_lingkungan",
                                            "type": "order",
                                            "prompt": "Ordena: Este vecindario es tranquilo.",
                                            "words": [
                                                "tenang",
                                                "ini",
                                                "Lingkungan"
                                            ],
                                            "correctOrder": [
                                                "Lingkungan",
                                                "ini",
                                                "tenang"
                                            ],
                                            "explanation": "La frase completa es: Lingkungan ini tenang."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Espacios de la vivienda",
                                    "objective": "Nombra espacios exteriores y zonas comunes de una casa.",
                                    "grammar": "Usa di para indicar dónde ocurre una actividad.",
                                    "vocabIds": [
                                        "a2u18_pagar",
                                        "a2u18_kebocoran",
                                        "a2u18_saluran_air"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u18_pagar",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pagar»?",
                                            "options": [
                                                "Cerca",
                                                "Garaje",
                                                "Reforma"
                                            ],
                                            "answer": 0,
                                            "explanation": "«pagar» significa «Cerca»."
                                        },
                                        {
                                            "vocabId": "a2u18_kebocoran",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Hay una fuga en el techo.",
                                            "answer": "Ada kebocoran di atap.",
                                            "explanation": "La frase utiliza «kebocoran»."
                                        },
                                        {
                                            "vocabId": "a2u18_saluran_air",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saluran air perlu dibersihkan.",
                                            "explanation": "La oración contiene «saluran air»."
                                        },
                                        {
                                            "vocabId": "a2u18_pagar",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pagar.",
                                            "hint": "Puedes tomar como modelo: Pagar rumah itu tinggi.",
                                            "modelAnswer": "Pagar rumah itu tinggi.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Mantenimiento del hogar",
                                    "objective": "Explica pequeñas averías y necesidades de mantenimiento.",
                                    "grammar": "Practica perlu + verbo para indicar lo que hace falta reparar o mejorar.",
                                    "vocabIds": [
                                        "a2u18_garasi",
                                        "a2u18_renovasi",
                                        "a2u18_teras"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u18_garasi",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «garasi»?",
                                            "options": [
                                                "Garaje",
                                                "Sala de estar",
                                                "Propietario de la vivienda"
                                            ],
                                            "answer": 0,
                                            "explanation": "«garasi» significa «Garaje»."
                                        },
                                        {
                                            "vocabId": "a2u18_renovasi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La reforma de la casa empieza el próximo mes.",
                                            "answer": "Renovasi rumah dimulai bulan depan.",
                                            "explanation": "La frase utiliza «renovasi»."
                                        },
                                        {
                                            "vocabId": "a2u18_teras",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kami duduk di teras.",
                                            "explanation": "La oración contiene «teras»."
                                        },
                                        {
                                            "vocabId": "a2u18_garasi",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando garasi.",
                                            "hint": "Puedes tomar como modelo: Sepeda disimpan di garasi.",
                                            "modelAnswer": "Sepeda disimpan di garasi.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Servicios y convivencia",
                                    "objective": "Habla de servicios domésticos y de las personas que viven en una casa.",
                                    "grammar": "Practica expresiones para describir responsabilidades de propietarios e inquilinos.",
                                    "vocabIds": [
                                        "a2u18_ruang_tamu",
                                        "a2u18_pemilik_rumah",
                                        "a2u18_penyewa"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u18_ruang_tamu",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «ruang tamu»?",
                                            "options": [
                                                "Sala de estar",
                                                "Vecino",
                                                "Vecindario"
                                            ],
                                            "answer": 0,
                                            "explanation": "«ruang tamu» significa «Sala de estar»."
                                        },
                                        {
                                            "vocabId": "a2u18_pemilik_rumah",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: El propietario de la vivienda vino esta mañana.",
                                            "answer": "Pemilik rumah datang pagi ini.",
                                            "explanation": "La frase utiliza «pemilik rumah»."
                                        },
                                        {
                                            "vocabId": "a2u18_penyewa",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Penyewa membayar sewa setiap bulan.",
                                            "explanation": "La oración contiene «penyewa»."
                                        },
                                        {
                                            "vocabId": "a2u18_ruang_tamu",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando ruang tamu.",
                                            "hint": "Puedes tomar como modelo: Ruang tamu itu luas.",
                                            "modelAnswer": "Ruang tamu itu luas.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u19",
                            "title": "Unidad 19: Trabajo y vida profesional",
                            "desc": "Habla de solicitudes de empleo, entrevistas, tareas y colaboración profesional.",
                            "grammar": "Usa lamaran kerja para hablar de una solicitud de empleo y tenggat para indicar una fecha límite. Practica expresiones para describir responsabilidades y experiencia profesional.",
                            "vocab": [
                                {
                                    "id": "a2u19_wawancara",
                                    "idn": "wawancara",
                                    "esp": "Entrevista",
                                    "ex": "Saya punya wawancara besok.",
                                    "exEsp": "Tengo una entrevista mañana."
                                },
                                {
                                    "id": "a2u19_lamaran",
                                    "idn": "lamaran",
                                    "esp": "Solicitud",
                                    "ex": "Lamaran kerja saya sudah dikirim.",
                                    "exEsp": "Mi solicitud de empleo ya fue enviada."
                                },
                                {
                                    "id": "a2u19_lowongan",
                                    "idn": "lowongan",
                                    "esp": "Oferta de empleo",
                                    "ex": "Ada lowongan di perusahaan itu.",
                                    "exEsp": "Hay una oferta de empleo en esa empresa."
                                },
                                {
                                    "id": "a2u19_gaji",
                                    "idn": "gaji",
                                    "esp": "Salario",
                                    "ex": "Gaji dibayar setiap bulan.",
                                    "exEsp": "El salario se paga cada mes."
                                },
                                {
                                    "id": "a2u19_atasan",
                                    "idn": "atasan",
                                    "esp": "Supervisor",
                                    "ex": "Atasan saya memberi arahan.",
                                    "exEsp": "Mi supervisor da instrucciones."
                                },
                                {
                                    "id": "a2u19_rekan_kerja",
                                    "idn": "rekan kerja",
                                    "esp": "Compañero de trabajo",
                                    "ex": "Saya makan siang dengan rekan kerja.",
                                    "exEsp": "Almuerzo con un compañero de trabajo."
                                },
                                {
                                    "id": "a2u19_presentasi",
                                    "idn": "presentasi",
                                    "esp": "Presentación",
                                    "ex": "Presentasi dimulai pukul sembilan.",
                                    "exEsp": "La presentación empieza a las nueve."
                                },
                                {
                                    "id": "a2u19_laporan",
                                    "idn": "laporan",
                                    "esp": "Informe",
                                    "ex": "Saya menyelesaikan laporan hari ini.",
                                    "exEsp": "Termino el informe hoy."
                                },
                                {
                                    "id": "a2u19_tenggat",
                                    "idn": "tenggat",
                                    "esp": "Fecha límite",
                                    "ex": "Tenggat tugas itu hari Jumat.",
                                    "exEsp": "La fecha límite de esa tarea es el viernes."
                                },
                                {
                                    "id": "a2u19_magang",
                                    "idn": "magang",
                                    "esp": "Prácticas profesionales",
                                    "ex": "Dia mengikuti program magang.",
                                    "exEsp": "Él participa en un programa de prácticas."
                                },
                                {
                                    "id": "a2u19_pengalaman_kerja",
                                    "idn": "pengalaman kerja",
                                    "esp": "Experiencia laboral",
                                    "ex": "Pengalaman kerja sangat penting.",
                                    "exEsp": "La experiencia laboral es muy importante."
                                },
                                {
                                    "id": "a2u19_kandidat",
                                    "idn": "kandidat",
                                    "esp": "Candidato",
                                    "ex": "Kandidat itu menjawab dengan jelas.",
                                    "exEsp": "Ese candidato respondió con claridad."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Buscar empleo",
                                    "objective": "Comprende ofertas de trabajo y prepara una solicitud.",
                                    "grammar": "Practica el vocabulario de ofertas y solicitudes laborales.",
                                    "vocabIds": [
                                        "a2u19_wawancara",
                                        "a2u19_lamaran",
                                        "a2u19_lowongan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u19_wawancara",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «wawancara»?",
                                            "options": [
                                                "Entrevista",
                                                "Salario",
                                                "Supervisor"
                                            ],
                                            "answer": 0,
                                            "explanation": "«wawancara» significa «Entrevista»."
                                        },
                                        {
                                            "vocabId": "a2u19_lamaran",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Mi solicitud de empleo ya fue enviada.",
                                            "answer": "Lamaran kerja saya sudah dikirim.",
                                            "explanation": "La frase utiliza «lamaran»."
                                        },
                                        {
                                            "vocabId": "a2u19_lowongan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Ada lowongan di perusahaan itu.",
                                            "explanation": "La oración contiene «lowongan»."
                                        },
                                        {
                                            "vocabId": "a2u19_wawancara",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando wawancara.",
                                            "hint": "Puedes tomar como modelo: Saya punya wawancara besok.",
                                            "modelAnswer": "Saya punya wawancara besok.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u19_lamaran",
                                            "type": "order",
                                            "prompt": "Ordena: Mi solicitud de empleo ya fue enviada.",
                                            "words": [
                                                "dikirim",
                                                "sudah",
                                                "saya",
                                                "kerja",
                                                "Lamaran"
                                            ],
                                            "correctOrder": [
                                                "Lamaran",
                                                "kerja",
                                                "saya",
                                                "sudah",
                                                "dikirim"
                                            ],
                                            "explanation": "La frase completa es: Lamaran kerja saya sudah dikirim."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Entrevistas y candidatos",
                                    "objective": "Describe entrevistas y personas que participan en un proceso de selección.",
                                    "grammar": "Usa expresiones para hablar de cualidades y experiencia.",
                                    "vocabIds": [
                                        "a2u19_gaji",
                                        "a2u19_atasan",
                                        "a2u19_rekan_kerja"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u19_gaji",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «gaji»?",
                                            "options": [
                                                "Salario",
                                                "Presentación",
                                                "Informe"
                                            ],
                                            "answer": 0,
                                            "explanation": "«gaji» significa «Salario»."
                                        },
                                        {
                                            "vocabId": "a2u19_atasan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Mi supervisor da instrucciones.",
                                            "answer": "Atasan saya memberi arahan.",
                                            "explanation": "La frase utiliza «atasan»."
                                        },
                                        {
                                            "vocabId": "a2u19_rekan_kerja",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya makan siang dengan rekan kerja.",
                                            "explanation": "La oración contiene «rekan kerja»."
                                        },
                                        {
                                            "vocabId": "a2u19_gaji",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando gaji.",
                                            "hint": "Puedes tomar como modelo: Gaji dibayar setiap bulan.",
                                            "modelAnswer": "Gaji dibayar setiap bulan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Tareas y plazos",
                                    "objective": "Explica tareas, informes y fechas de entrega.",
                                    "grammar": "Practica expresiones de tiempo y cumplimiento de plazos.",
                                    "vocabIds": [
                                        "a2u19_presentasi",
                                        "a2u19_laporan",
                                        "a2u19_tenggat"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u19_presentasi",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «presentasi»?",
                                            "options": [
                                                "Presentación",
                                                "Prácticas profesionales",
                                                "Experiencia laboral"
                                            ],
                                            "answer": 0,
                                            "explanation": "«presentasi» significa «Presentación»."
                                        },
                                        {
                                            "vocabId": "a2u19_laporan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Termino el informe hoy.",
                                            "answer": "Saya menyelesaikan laporan hari ini.",
                                            "explanation": "La frase utiliza «laporan»."
                                        },
                                        {
                                            "vocabId": "a2u19_tenggat",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Tenggat tugas itu hari Jumat.",
                                            "explanation": "La oración contiene «tenggat»."
                                        },
                                        {
                                            "vocabId": "a2u19_presentasi",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando presentasi.",
                                            "hint": "Puedes tomar como modelo: Presentasi dimulai pukul sembilan.",
                                            "modelAnswer": "Presentasi dimulai pukul sembilan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Colaboración y desarrollo",
                                    "objective": "Habla de compañeros, presentaciones y prácticas profesionales.",
                                    "grammar": "Usa dengan para indicar colaboración y expresiones para describir experiencia.",
                                    "vocabIds": [
                                        "a2u19_magang",
                                        "a2u19_pengalaman_kerja",
                                        "a2u19_kandidat"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u19_magang",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «magang»?",
                                            "options": [
                                                "Prácticas profesionales",
                                                "Entrevista",
                                                "Solicitud"
                                            ],
                                            "answer": 0,
                                            "explanation": "«magang» significa «Prácticas profesionales»."
                                        },
                                        {
                                            "vocabId": "a2u19_pengalaman_kerja",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La experiencia laboral es muy importante.",
                                            "answer": "Pengalaman kerja sangat penting.",
                                            "explanation": "La frase utiliza «pengalaman kerja»."
                                        },
                                        {
                                            "vocabId": "a2u19_kandidat",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kandidat itu menjawab dengan jelas.",
                                            "explanation": "La oración contiene «kandidat»."
                                        },
                                        {
                                            "vocabId": "a2u19_magang",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando magang.",
                                            "hint": "Puedes tomar como modelo: Dia mengikuti program magang.",
                                            "modelAnswer": "Dia mengikuti program magang.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u20",
                            "title": "Unidad 20: Medio ambiente y comunidad",
                            "desc": "Describe problemas ambientales y propone acciones para cuidar los recursos naturales.",
                            "grammar": "Usa harus para expresar obligación y agar para indicar finalidad. Practica expresiones para describir problemas ambientales y acciones colectivas.",
                            "vocab": [
                                {
                                    "id": "a2u20_polusi",
                                    "idn": "polusi",
                                    "esp": "Contaminación",
                                    "ex": "Polusi udara berbahaya bagi kesehatan.",
                                    "exEsp": "La contaminación del aire es peligrosa para la salud."
                                },
                                {
                                    "id": "a2u20_daur_ulang",
                                    "idn": "daur ulang",
                                    "esp": "Reciclaje",
                                    "ex": "Kami melakukan daur ulang kertas.",
                                    "exEsp": "Reciclamos papel."
                                },
                                {
                                    "id": "a2u20_hemat_energi",
                                    "idn": "hemat energi",
                                    "esp": "Ahorrar energía",
                                    "ex": "Kita harus hemat energi.",
                                    "exEsp": "Debemos ahorrar energía."
                                },
                                {
                                    "id": "a2u20_penanaman",
                                    "idn": "penanaman",
                                    "esp": "Plantación",
                                    "ex": "Penanaman pohon dimulai pagi ini.",
                                    "exEsp": "La plantación de árboles empieza esta mañana."
                                },
                                {
                                    "id": "a2u20_banjir",
                                    "idn": "banjir",
                                    "esp": "Inundación",
                                    "ex": "Banjir menutup jalan utama.",
                                    "exEsp": "La inundación bloquea la carretera principal."
                                },
                                {
                                    "id": "a2u20_kekeringan",
                                    "idn": "kekeringan",
                                    "esp": "Sequía",
                                    "ex": "Kekeringan memengaruhi petani.",
                                    "exEsp": "La sequía afecta a los agricultores."
                                },
                                {
                                    "id": "a2u20_sungai",
                                    "idn": "sungai",
                                    "esp": "Río",
                                    "ex": "Sungai itu mengalir ke laut.",
                                    "exEsp": "Ese río desemboca en el mar."
                                },
                                {
                                    "id": "a2u20_hutan",
                                    "idn": "hutan",
                                    "esp": "Bosque",
                                    "ex": "Hutan ini menjadi rumah banyak hewan.",
                                    "exEsp": "Este bosque es el hogar de muchos animales."
                                },
                                {
                                    "id": "a2u20_tanaman",
                                    "idn": "tanaman",
                                    "esp": "Planta",
                                    "ex": "Tanaman membutuhkan air.",
                                    "exEsp": "Las plantas necesitan agua."
                                },
                                {
                                    "id": "a2u20_kebersihan",
                                    "idn": "kebersihan",
                                    "esp": "Limpieza",
                                    "ex": "Kebersihan lingkungan tanggung jawab bersama.",
                                    "exEsp": "La limpieza del entorno es responsabilidad de todos."
                                },
                                {
                                    "id": "a2u20_kerja_bakti",
                                    "idn": "kerja bakti",
                                    "esp": "Jornada comunitaria de limpieza",
                                    "ex": "Warga mengadakan kerja bakti hari Minggu.",
                                    "exEsp": "Los vecinos organizan una jornada comunitaria de limpieza el domingo."
                                },
                                {
                                    "id": "a2u20_penghematan_air",
                                    "idn": "penghematan air",
                                    "esp": "Ahorro de agua",
                                    "ex": "Penghematan air penting saat musim kemarau.",
                                    "exEsp": "Ahorrar agua es importante durante la estación seca."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Problemas ambientales",
                                    "objective": "Identifica problemas que afectan al aire, el agua y las comunidades.",
                                    "grammar": "Practica expresiones para describir causas y consecuencias ambientales.",
                                    "vocabIds": [
                                        "a2u20_polusi",
                                        "a2u20_daur_ulang",
                                        "a2u20_hemat_energi"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u20_polusi",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «polusi»?",
                                            "options": [
                                                "Contaminación",
                                                "Plantación",
                                                "Inundación"
                                            ],
                                            "answer": 0,
                                            "explanation": "«polusi» significa «Contaminación»."
                                        },
                                        {
                                            "vocabId": "a2u20_daur_ulang",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Reciclamos papel.",
                                            "answer": "Kami melakukan daur ulang kertas.",
                                            "explanation": "La frase utiliza «daur ulang»."
                                        },
                                        {
                                            "vocabId": "a2u20_hemat_energi",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kita harus hemat energi.",
                                            "explanation": "La oración contiene «hemat energi»."
                                        },
                                        {
                                            "vocabId": "a2u20_polusi",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando polusi.",
                                            "hint": "Puedes tomar como modelo: Polusi udara berbahaya bagi kesehatan.",
                                            "modelAnswer": "Polusi udara berbahaya bagi kesehatan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u20_daur_ulang",
                                            "type": "order",
                                            "prompt": "Ordena: Reciclamos papel.",
                                            "words": [
                                                "kertas",
                                                "ulang",
                                                "daur",
                                                "melakukan",
                                                "Kami"
                                            ],
                                            "correctOrder": [
                                                "Kami",
                                                "melakukan",
                                                "daur",
                                                "ulang",
                                                "kertas"
                                            ],
                                            "explanation": "La frase completa es: Kami melakukan daur ulang kertas."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Recursos y consumo",
                                    "objective": "Habla de ahorro de energía y uso responsable del agua.",
                                    "grammar": "Usa harus para expresar lo que debemos hacer.",
                                    "vocabIds": [
                                        "a2u20_penanaman",
                                        "a2u20_banjir",
                                        "a2u20_kekeringan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u20_penanaman",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «penanaman»?",
                                            "options": [
                                                "Plantación",
                                                "Río",
                                                "Bosque"
                                            ],
                                            "answer": 0,
                                            "explanation": "«penanaman» significa «Plantación»."
                                        },
                                        {
                                            "vocabId": "a2u20_banjir",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La inundación bloquea la carretera principal.",
                                            "answer": "Banjir menutup jalan utama.",
                                            "explanation": "La frase utiliza «banjir»."
                                        },
                                        {
                                            "vocabId": "a2u20_kekeringan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kekeringan memengaruhi petani.",
                                            "explanation": "La oración contiene «kekeringan»."
                                        },
                                        {
                                            "vocabId": "a2u20_penanaman",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando penanaman.",
                                            "hint": "Puedes tomar como modelo: Penanaman pohon dimulai pagi ini.",
                                            "modelAnswer": "Penanaman pohon dimulai pagi ini.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Naturaleza y biodiversidad",
                                    "objective": "Describe ríos, bosques y plantas y explica por qué son importantes.",
                                    "grammar": "Practica descripciones de lugares naturales y seres vivos.",
                                    "vocabIds": [
                                        "a2u20_sungai",
                                        "a2u20_hutan",
                                        "a2u20_tanaman"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u20_sungai",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «sungai»?",
                                            "options": [
                                                "Río",
                                                "Limpieza",
                                                "Jornada comunitaria de limpieza"
                                            ],
                                            "answer": 0,
                                            "explanation": "«sungai» significa «Río»."
                                        },
                                        {
                                            "vocabId": "a2u20_hutan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Este bosque es el hogar de muchos animales.",
                                            "answer": "Hutan ini menjadi rumah banyak hewan.",
                                            "explanation": "La frase utiliza «hutan»."
                                        },
                                        {
                                            "vocabId": "a2u20_tanaman",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Tanaman membutuhkan air.",
                                            "explanation": "La oración contiene «tanaman»."
                                        },
                                        {
                                            "vocabId": "a2u20_sungai",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando sungai.",
                                            "hint": "Puedes tomar como modelo: Sungai itu mengalir ke laut.",
                                            "modelAnswer": "Sungai itu mengalir ke laut.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Acciones comunitarias",
                                    "objective": "Propón actividades para mantener limpio el entorno y proteger los recursos.",
                                    "grammar": "Usa agar para explicar el propósito de una acción.",
                                    "vocabIds": [
                                        "a2u20_kebersihan",
                                        "a2u20_kerja_bakti",
                                        "a2u20_penghematan_air"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u20_kebersihan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «kebersihan»?",
                                            "options": [
                                                "Limpieza",
                                                "Contaminación",
                                                "Reciclaje"
                                            ],
                                            "answer": 0,
                                            "explanation": "«kebersihan» significa «Limpieza»."
                                        },
                                        {
                                            "vocabId": "a2u20_kerja_bakti",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Los vecinos organizan una jornada comunitaria de limpieza el domingo.",
                                            "answer": "Warga mengadakan kerja bakti hari Minggu.",
                                            "explanation": "La frase utiliza «kerja bakti»."
                                        },
                                        {
                                            "vocabId": "a2u20_penghematan_air",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Penghematan air penting saat musim kemarau.",
                                            "explanation": "La oración contiene «penghematan air»."
                                        },
                                        {
                                            "vocabId": "a2u20_kebersihan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando kebersihan.",
                                            "hint": "Puedes tomar como modelo: Kebersihan lingkungan tanggung jawab bersama.",
                                            "modelAnswer": "Kebersihan lingkungan tanggung jawab bersama.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        }
,
                    {
                            "id": "a2_u21",
                            "title": "Unidad 21: Cultura y tradiciones",
                            "desc": "Habla de celebraciones, expresiones artísticas y patrimonio cultural.",
                            "grammar": "Usa berasal dari para indicar el origen y parte dari para explicar que algo forma parte de una tradición o patrimonio. Practica expresiones para describir eventos culturales.",
                            "vocab": [
                                {
                                    "id": "a2u21_budaya",
                                    "idn": "budaya",
                                    "esp": "Cultura",
                                    "ex": "Budaya Indonesia sangat beragam.",
                                    "exEsp": "La cultura indonesia es muy diversa."
                                },
                                {
                                    "id": "a2u21_tradisi",
                                    "idn": "tradisi",
                                    "esp": "Tradición",
                                    "ex": "Tradisi itu diwariskan turun-temurun.",
                                    "exEsp": "Esa tradición se transmite de generación en generación."
                                },
                                {
                                    "id": "a2u21_upacara",
                                    "idn": "upacara",
                                    "esp": "Ceremonia",
                                    "ex": "Keluarga kami menghadiri upacara adat.",
                                    "exEsp": "Nuestra familia asiste a una ceremonia tradicional."
                                },
                                {
                                    "id": "a2u21_pakaian_adat",
                                    "idn": "pakaian adat",
                                    "esp": "Ropa tradicional",
                                    "ex": "Dia memakai pakaian adat.",
                                    "exEsp": "Él lleva ropa tradicional."
                                },
                                {
                                    "id": "a2u21_tarian",
                                    "idn": "tarian",
                                    "esp": "Danza",
                                    "ex": "Tarian itu berasal dari Bali.",
                                    "exEsp": "Esa danza es originaria de Bali."
                                },
                                {
                                    "id": "a2u21_musik_tradisional",
                                    "idn": "musik tradisional",
                                    "esp": "Música tradicional",
                                    "ex": "Musik tradisional dimainkan saat acara.",
                                    "exEsp": "La música tradicional se toca durante el evento."
                                },
                                {
                                    "id": "a2u21_kerajinan",
                                    "idn": "kerajinan",
                                    "esp": "Artesanía",
                                    "ex": "Mereka membuat kerajinan dari bambu.",
                                    "exEsp": "Ellos hacen artesanías de bambú."
                                },
                                {
                                    "id": "a2u21_pameran",
                                    "idn": "pameran",
                                    "esp": "Exposición",
                                    "ex": "Pameran seni dibuka hari ini.",
                                    "exEsp": "La exposición de arte abre hoy."
                                },
                                {
                                    "id": "a2u21_pengunjung",
                                    "idn": "pengunjung",
                                    "esp": "Visitante",
                                    "ex": "Banyak pengunjung datang sore ini.",
                                    "exEsp": "Muchos visitantes vienen esta tarde."
                                },
                                {
                                    "id": "a2u21_pertunjukan",
                                    "idn": "pertunjukan",
                                    "esp": "Espectáculo",
                                    "ex": "Pertunjukan dimulai pukul tujuh.",
                                    "exEsp": "El espectáculo empieza a las siete."
                                },
                                {
                                    "id": "a2u21_warisan_budaya",
                                    "idn": "warisan budaya",
                                    "esp": "Patrimonio cultural",
                                    "ex": "Candi itu bagian dari warisan budaya.",
                                    "exEsp": "Ese templo forma parte del patrimonio cultural."
                                },
                                {
                                    "id": "a2u21_festival",
                                    "idn": "festival",
                                    "esp": "Festival",
                                    "ex": "Festival budaya berlangsung selama tiga hari.",
                                    "exEsp": "El festival cultural dura tres días."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Cultura y tradiciones",
                                    "objective": "Describe la diversidad cultural y las costumbres que se transmiten entre generaciones.",
                                    "grammar": "Practica expresiones para hablar de costumbres, ceremonias y herencia cultural.",
                                    "vocabIds": [
                                        "a2u21_budaya",
                                        "a2u21_tradisi",
                                        "a2u21_upacara"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u21_budaya",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «budaya»?",
                                            "options": [
                                                "Cultura",
                                                "Ropa tradicional",
                                                "Danza"
                                            ],
                                            "answer": 0,
                                            "explanation": "«budaya» significa «Cultura»."
                                        },
                                        {
                                            "vocabId": "a2u21_tradisi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esa tradición se transmite de generación en generación.",
                                            "answer": "Tradisi itu diwariskan turun-temurun.",
                                            "explanation": "La frase utiliza «tradisi»."
                                        },
                                        {
                                            "vocabId": "a2u21_upacara",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Keluarga kami menghadiri upacara adat.",
                                            "explanation": "La oración contiene «upacara»."
                                        },
                                        {
                                            "vocabId": "a2u21_budaya",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando budaya.",
                                            "hint": "Puedes tomar como modelo: Budaya Indonesia sangat beragam.",
                                            "modelAnswer": "Budaya Indonesia sangat beragam.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u21_tradisi",
                                            "type": "order",
                                            "prompt": "Ordena: Esa tradición se transmite de generación en generación.",
                                            "words": [
                                                "turun-temurun",
                                                "diwariskan",
                                                "itu",
                                                "Tradisi"
                                            ],
                                            "correctOrder": [
                                                "Tradisi",
                                                "itu",
                                                "diwariskan",
                                                "turun-temurun"
                                            ],
                                            "explanation": "La frase completa es: Tradisi itu diwariskan turun-temurun."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Ropa y expresiones artísticas",
                                    "objective": "Habla de ropa tradicional, danzas y música de distintas regiones.",
                                    "grammar": "Usa berasal dari para indicar el origen de una expresión artística.",
                                    "vocabIds": [
                                        "a2u21_pakaian_adat",
                                        "a2u21_tarian",
                                        "a2u21_musik_tradisional"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u21_pakaian_adat",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pakaian adat»?",
                                            "options": [
                                                "Ropa tradicional",
                                                "Artesanía",
                                                "Exposición"
                                            ],
                                            "answer": 0,
                                            "explanation": "«pakaian adat» significa «Ropa tradicional»."
                                        },
                                        {
                                            "vocabId": "a2u21_tarian",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esa danza es originaria de Bali.",
                                            "answer": "Tarian itu berasal dari Bali.",
                                            "explanation": "La frase utiliza «tarian»."
                                        },
                                        {
                                            "vocabId": "a2u21_musik_tradisional",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Musik tradisional dimainkan saat acara.",
                                            "explanation": "La oración contiene «musik tradisional»."
                                        },
                                        {
                                            "vocabId": "a2u21_pakaian_adat",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pakaian adat.",
                                            "hint": "Puedes tomar como modelo: Dia memakai pakaian adat.",
                                            "modelAnswer": "Dia memakai pakaian adat.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Artesanía y exposiciones",
                                    "objective": "Describe objetos artesanales y eventos culturales abiertos al público.",
                                    "grammar": "Practica vocabulario para explicar dónde y cuándo se presenta una exposición.",
                                    "vocabIds": [
                                        "a2u21_kerajinan",
                                        "a2u21_pameran",
                                        "a2u21_pengunjung"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u21_kerajinan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «kerajinan»?",
                                            "options": [
                                                "Artesanía",
                                                "Espectáculo",
                                                "Patrimonio cultural"
                                            ],
                                            "answer": 0,
                                            "explanation": "«kerajinan» significa «Artesanía»."
                                        },
                                        {
                                            "vocabId": "a2u21_pameran",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La exposición de arte abre hoy.",
                                            "answer": "Pameran seni dibuka hari ini.",
                                            "explanation": "La frase utiliza «pameran»."
                                        },
                                        {
                                            "vocabId": "a2u21_pengunjung",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Banyak pengunjung datang sore ini.",
                                            "explanation": "La oración contiene «pengunjung»."
                                        },
                                        {
                                            "vocabId": "a2u21_kerajinan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando kerajinan.",
                                            "hint": "Puedes tomar como modelo: Mereka membuat kerajinan dari bambu.",
                                            "modelAnswer": "Mereka membuat kerajinan dari bambu.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Espectáculos y festivales",
                                    "objective": "Habla de visitantes, espectáculos y festivales culturales.",
                                    "grammar": "Usa expresiones temporales para describir la duración y el horario de un evento.",
                                    "vocabIds": [
                                        "a2u21_pertunjukan",
                                        "a2u21_warisan_budaya",
                                        "a2u21_festival"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u21_pertunjukan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pertunjukan»?",
                                            "options": [
                                                "Espectáculo",
                                                "Cultura",
                                                "Tradición"
                                            ],
                                            "answer": 0,
                                            "explanation": "«pertunjukan» significa «Espectáculo»."
                                        },
                                        {
                                            "vocabId": "a2u21_warisan_budaya",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Ese templo forma parte del patrimonio cultural.",
                                            "answer": "Candi itu bagian dari warisan budaya.",
                                            "explanation": "La frase utiliza «warisan budaya»."
                                        },
                                        {
                                            "vocabId": "a2u21_festival",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Festival budaya berlangsung selama tiga hari.",
                                            "explanation": "La oración contiene «festival»."
                                        },
                                        {
                                            "vocabId": "a2u21_pertunjukan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pertunjukan.",
                                            "hint": "Puedes tomar como modelo: Pertunjukan dimulai pukul tujuh.",
                                            "modelAnswer": "Pertunjukan dimulai pukul tujuh.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u22",
                            "title": "Unidad 22: Comunicación digital y medios",
                            "desc": "Comprende noticias, mensajes, redes sociales y herramientas de comunicación digital.",
                            "grammar": "Usa sebelum para indicar anterioridad y sebelum membagikan para explicar una precaución. Practica expresiones para enviar mensajes, publicar contenido y comprobar información.",
                            "vocab": [
                                {
                                    "id": "a2u22_berita",
                                    "idn": "berita",
                                    "esp": "Noticia",
                                    "ex": "Saya membaca berita pagi ini.",
                                    "exEsp": "Leo las noticias esta mañana."
                                },
                                {
                                    "id": "a2u22_siaran",
                                    "idn": "siaran",
                                    "esp": "Emisión",
                                    "ex": "Siaran radio dimulai pukul enam.",
                                    "exEsp": "La emisión de radio empieza a las seis."
                                },
                                {
                                    "id": "a2u22_media_sosial",
                                    "idn": "media sosial",
                                    "esp": "Redes sociales",
                                    "ex": "Dia menggunakan media sosial setiap hari.",
                                    "exEsp": "Él usa las redes sociales todos los días."
                                },
                                {
                                    "id": "a2u22_pesan_suara",
                                    "idn": "pesan suara",
                                    "esp": "Mensaje de voz",
                                    "ex": "Saya mengirim pesan suara kepada teman.",
                                    "exEsp": "Envío un mensaje de voz a un amigo."
                                },
                                {
                                    "id": "a2u22_komentar",
                                    "idn": "komentar",
                                    "esp": "Comentario",
                                    "ex": "Komentar itu sangat menarik.",
                                    "exEsp": "Ese comentario es muy interesante."
                                },
                                {
                                    "id": "a2u22_unggahan",
                                    "idn": "unggahan",
                                    "esp": "Publicación",
                                    "ex": "Unggahan baru mendapat banyak tanggapan.",
                                    "exEsp": "La nueva publicación recibe muchas respuestas."
                                },
                                {
                                    "id": "a2u22_jaringan",
                                    "idn": "jaringan",
                                    "esp": "Red",
                                    "ex": "Jaringan internet di sini stabil.",
                                    "exEsp": "La red de internet aquí es estable."
                                },
                                {
                                    "id": "a2u22_koneksi",
                                    "idn": "koneksi",
                                    "esp": "Conexión",
                                    "ex": "Koneksi saya terputus tadi malam.",
                                    "exEsp": "Mi conexión se interrumpió anoche."
                                },
                                {
                                    "id": "a2u22_kata_sandi",
                                    "idn": "kata sandi",
                                    "esp": "Contraseña",
                                    "ex": "Ganti kata sandi akun Anda.",
                                    "exEsp": "Cambia la contraseña de tu cuenta."
                                },
                                {
                                    "id": "a2u22_akun",
                                    "idn": "akun",
                                    "esp": "Cuenta",
                                    "ex": "Saya punya akun baru.",
                                    "exEsp": "Tengo una cuenta nueva."
                                },
                                {
                                    "id": "a2u22_informasi",
                                    "idn": "informasi",
                                    "esp": "Información",
                                    "ex": "Informasi itu mudah dipahami.",
                                    "exEsp": "Esa información es fácil de entender."
                                },
                                {
                                    "id": "a2u22_sumber",
                                    "idn": "sumber",
                                    "esp": "Fuente",
                                    "ex": "Periksa sumber berita sebelum membagikannya.",
                                    "exEsp": "Comprueba la fuente de la noticia antes de compartirla."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Noticias y emisiones",
                                    "objective": "Habla de noticias y programas que se transmiten por radio u otros medios.",
                                    "grammar": "Practica verbos para leer, escuchar y seguir noticias.",
                                    "vocabIds": [
                                        "a2u22_berita",
                                        "a2u22_siaran",
                                        "a2u22_media_sosial"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u22_berita",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «berita»?",
                                            "options": [
                                                "Noticia",
                                                "Mensaje de voz",
                                                "Comentario"
                                            ],
                                            "answer": 0,
                                            "explanation": "«berita» significa «Noticia»."
                                        },
                                        {
                                            "vocabId": "a2u22_siaran",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La emisión de radio empieza a las seis.",
                                            "answer": "Siaran radio dimulai pukul enam.",
                                            "explanation": "La frase utiliza «siaran»."
                                        },
                                        {
                                            "vocabId": "a2u22_media_sosial",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Dia menggunakan media sosial setiap hari.",
                                            "explanation": "La oración contiene «media sosial»."
                                        },
                                        {
                                            "vocabId": "a2u22_berita",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando berita.",
                                            "hint": "Puedes tomar como modelo: Saya membaca berita pagi ini.",
                                            "modelAnswer": "Saya membaca berita pagi ini.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u22_siaran",
                                            "type": "order",
                                            "prompt": "Ordena: La emisión de radio empieza a las seis.",
                                            "words": [
                                                "enam",
                                                "pukul",
                                                "dimulai",
                                                "radio",
                                                "Siaran"
                                            ],
                                            "correctOrder": [
                                                "Siaran",
                                                "radio",
                                                "dimulai",
                                                "pukul",
                                                "enam"
                                            ],
                                            "explanation": "La frase completa es: Siaran radio dimulai pukul enam."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Redes y mensajes",
                                    "objective": "Describe cómo se comunica la gente mediante redes sociales y mensajes de voz.",
                                    "grammar": "Usa kepada para indicar a quién se envía un mensaje.",
                                    "vocabIds": [
                                        "a2u22_pesan_suara",
                                        "a2u22_komentar",
                                        "a2u22_unggahan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u22_pesan_suara",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pesan suara»?",
                                            "options": [
                                                "Mensaje de voz",
                                                "Red",
                                                "Conexión"
                                            ],
                                            "answer": 0,
                                            "explanation": "«pesan suara» significa «Mensaje de voz»."
                                        },
                                        {
                                            "vocabId": "a2u22_komentar",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Ese comentario es muy interesante.",
                                            "answer": "Komentar itu sangat menarik.",
                                            "explanation": "La frase utiliza «komentar»."
                                        },
                                        {
                                            "vocabId": "a2u22_unggahan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Unggahan baru mendapat banyak tanggapan.",
                                            "explanation": "La oración contiene «unggahan»."
                                        },
                                        {
                                            "vocabId": "a2u22_pesan_suara",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pesan suara.",
                                            "hint": "Puedes tomar como modelo: Saya mengirim pesan suara kepada teman.",
                                            "modelAnswer": "Saya mengirim pesan suara kepada teman.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Publicaciones y respuestas",
                                    "objective": "Habla de comentarios y publicaciones en espacios digitales.",
                                    "grammar": "Practica expresiones para describir reacciones y respuestas.",
                                    "vocabIds": [
                                        "a2u22_jaringan",
                                        "a2u22_koneksi",
                                        "a2u22_kata_sandi"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u22_jaringan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «jaringan»?",
                                            "options": [
                                                "Red",
                                                "Cuenta",
                                                "Información"
                                            ],
                                            "answer": 0,
                                            "explanation": "«jaringan» significa «Red»."
                                        },
                                        {
                                            "vocabId": "a2u22_koneksi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Mi conexión se interrumpió anoche.",
                                            "answer": "Koneksi saya terputus tadi malam.",
                                            "explanation": "La frase utiliza «koneksi»."
                                        },
                                        {
                                            "vocabId": "a2u22_kata_sandi",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Ganti kata sandi akun Anda.",
                                            "explanation": "La oración contiene «kata sandi»."
                                        },
                                        {
                                            "vocabId": "a2u22_jaringan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando jaringan.",
                                            "hint": "Puedes tomar como modelo: Jaringan internet di sini stabil.",
                                            "modelAnswer": "Jaringan internet di sini stabil.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Conexión y seguridad",
                                    "objective": "Explica problemas de conexión y cómo proteger una cuenta.",
                                    "grammar": "Usa expresiones para dar consejos sobre contraseñas y fuentes de información.",
                                    "vocabIds": [
                                        "a2u22_akun",
                                        "a2u22_informasi",
                                        "a2u22_sumber"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u22_akun",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «akun»?",
                                            "options": [
                                                "Cuenta",
                                                "Noticia",
                                                "Emisión"
                                            ],
                                            "answer": 0,
                                            "explanation": "«akun» significa «Cuenta»."
                                        },
                                        {
                                            "vocabId": "a2u22_informasi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esa información es fácil de entender.",
                                            "answer": "Informasi itu mudah dipahami.",
                                            "explanation": "La frase utiliza «informasi»."
                                        },
                                        {
                                            "vocabId": "a2u22_sumber",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Periksa sumber berita sebelum membagikannya.",
                                            "explanation": "La oración contiene «sumber»."
                                        },
                                        {
                                            "vocabId": "a2u22_akun",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando akun.",
                                            "hint": "Puedes tomar como modelo: Saya punya akun baru.",
                                            "modelAnswer": "Saya punya akun baru.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u23",
                            "title": "Unidad 23: Servicios bancarios y trámites",
                            "desc": "Realiza operaciones bancarias sencillas y comprende trámites y servicios de atención.",
                            "grammar": "Usa membuka rekening para hablar de abrir una cuenta y melakukan transfer para describir una operación. Practica instrucciones con silakan y formas de pedir ayuda en una oficina.",
                            "vocab": [
                                {
                                    "id": "a2u23_rekening",
                                    "idn": "rekening",
                                    "esp": "Cuenta bancaria",
                                    "ex": "Saya membuka rekening di bank.",
                                    "exEsp": "Abro una cuenta en el banco."
                                },
                                {
                                    "id": "a2u23_tabungan",
                                    "idn": "tabungan",
                                    "esp": "Ahorros",
                                    "ex": "Tabungan saya bertambah setiap bulan.",
                                    "exEsp": "Mis ahorros aumentan cada mes."
                                },
                                {
                                    "id": "a2u23_saldo",
                                    "idn": "saldo",
                                    "esp": "Saldo",
                                    "ex": "Saldo rekening masih cukup.",
                                    "exEsp": "El saldo de la cuenta todavía es suficiente."
                                },
                                {
                                    "id": "a2u23_transfer",
                                    "idn": "transfer",
                                    "esp": "Transferencia",
                                    "ex": "Saya melakukan transfer melalui aplikasi.",
                                    "exEsp": "Hago una transferencia mediante la aplicación."
                                },
                                {
                                    "id": "a2u23_kartu_debit",
                                    "idn": "kartu debit",
                                    "esp": "Tarjeta de débito",
                                    "ex": "Saya membayar dengan kartu debit.",
                                    "exEsp": "Pago con tarjeta de débito."
                                },
                                {
                                    "id": "a2u23_pinjaman",
                                    "idn": "pinjaman",
                                    "esp": "Préstamo",
                                    "ex": "Dia mengajukan pinjaman ke bank.",
                                    "exEsp": "Él solicita un préstamo al banco."
                                },
                                {
                                    "id": "a2u23_biaya_admin",
                                    "idn": "biaya admin",
                                    "esp": "Cargo administrativo",
                                    "ex": "Biaya admin dibayar setiap bulan.",
                                    "exEsp": "El cargo administrativo se paga cada mes."
                                },
                                {
                                    "id": "a2u23_formulir",
                                    "idn": "formulir",
                                    "esp": "Formulario",
                                    "ex": "Isi formulir ini dengan lengkap.",
                                    "exEsp": "Completa este formulario por completo."
                                },
                                {
                                    "id": "a2u23_loket",
                                    "idn": "loket",
                                    "esp": "Ventanilla",
                                    "ex": "Silakan datang ke loket nomor dua.",
                                    "exEsp": "Por favor, acude a la ventanilla número dos."
                                },
                                {
                                    "id": "a2u23_petugas",
                                    "idn": "petugas",
                                    "esp": "Empleado de atención",
                                    "ex": "Petugas bank membantu pelanggan.",
                                    "exEsp": "El empleado del banco ayuda a los clientes."
                                },
                                {
                                    "id": "a2u23_antrean",
                                    "idn": "antrean",
                                    "esp": "Cola",
                                    "ex": "Antrean di bank cukup panjang.",
                                    "exEsp": "La cola en el banco es bastante larga."
                                },
                                {
                                    "id": "a2u23_layanan",
                                    "idn": "layanan",
                                    "esp": "Servicio",
                                    "ex": "Layanan bank tersedia sampai sore.",
                                    "exEsp": "El servicio bancario está disponible hasta la tarde."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Cuentas y ahorros",
                                    "objective": "Habla de cuentas bancarias, ahorros y saldos disponibles.",
                                    "grammar": "Practica expresiones para consultar y describir el estado de una cuenta.",
                                    "vocabIds": [
                                        "a2u23_rekening",
                                        "a2u23_tabungan",
                                        "a2u23_saldo"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u23_rekening",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «rekening»?",
                                            "options": [
                                                "Cuenta bancaria",
                                                "Transferencia",
                                                "Tarjeta de débito"
                                            ],
                                            "answer": 0,
                                            "explanation": "«rekening» significa «Cuenta bancaria»."
                                        },
                                        {
                                            "vocabId": "a2u23_tabungan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Mis ahorros aumentan cada mes.",
                                            "answer": "Tabungan saya bertambah setiap bulan.",
                                            "explanation": "La frase utiliza «tabungan»."
                                        },
                                        {
                                            "vocabId": "a2u23_saldo",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saldo rekening masih cukup.",
                                            "explanation": "La oración contiene «saldo»."
                                        },
                                        {
                                            "vocabId": "a2u23_rekening",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando rekening.",
                                            "hint": "Puedes tomar como modelo: Saya membuka rekening di bank.",
                                            "modelAnswer": "Saya membuka rekening di bank.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u23_tabungan",
                                            "type": "order",
                                            "prompt": "Ordena: Mis ahorros aumentan cada mes.",
                                            "words": [
                                                "bulan",
                                                "setiap",
                                                "bertambah",
                                                "saya",
                                                "Tabungan"
                                            ],
                                            "correctOrder": [
                                                "Tabungan",
                                                "saya",
                                                "bertambah",
                                                "setiap",
                                                "bulan"
                                            ],
                                            "explanation": "La frase completa es: Tabungan saya bertambah setiap bulan."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Transferencias y tarjetas",
                                    "objective": "Describe operaciones bancarias sencillas y formas de pago.",
                                    "grammar": "Usa dengan para indicar el medio de pago.",
                                    "vocabIds": [
                                        "a2u23_transfer",
                                        "a2u23_kartu_debit",
                                        "a2u23_pinjaman"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u23_transfer",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «transfer»?",
                                            "options": [
                                                "Transferencia",
                                                "Cargo administrativo",
                                                "Formulario"
                                            ],
                                            "answer": 0,
                                            "explanation": "«transfer» significa «Transferencia»."
                                        },
                                        {
                                            "vocabId": "a2u23_kartu_debit",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Pago con tarjeta de débito.",
                                            "answer": "Saya membayar dengan kartu debit.",
                                            "explanation": "La frase utiliza «kartu debit»."
                                        },
                                        {
                                            "vocabId": "a2u23_pinjaman",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Dia mengajukan pinjaman ke bank.",
                                            "explanation": "La oración contiene «pinjaman»."
                                        },
                                        {
                                            "vocabId": "a2u23_transfer",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando transfer.",
                                            "hint": "Puedes tomar como modelo: Saya melakukan transfer melalui aplikasi.",
                                            "modelAnswer": "Saya melakukan transfer melalui aplikasi.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Préstamos y formularios",
                                    "objective": "Comprende gastos administrativos y solicitudes bancarias.",
                                    "grammar": "Practica instrucciones para completar formularios y solicitar un servicio.",
                                    "vocabIds": [
                                        "a2u23_biaya_admin",
                                        "a2u23_formulir",
                                        "a2u23_loket"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u23_biaya_admin",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «biaya admin»?",
                                            "options": [
                                                "Cargo administrativo",
                                                "Empleado de atención",
                                                "Cola"
                                            ],
                                            "answer": 0,
                                            "explanation": "«biaya admin» significa «Cargo administrativo»."
                                        },
                                        {
                                            "vocabId": "a2u23_formulir",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Completa este formulario por completo.",
                                            "answer": "Isi formulir ini dengan lengkap.",
                                            "explanation": "La frase utiliza «formulir»."
                                        },
                                        {
                                            "vocabId": "a2u23_loket",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Silakan datang ke loket nomor dua.",
                                            "explanation": "La oración contiene «loket»."
                                        },
                                        {
                                            "vocabId": "a2u23_biaya_admin",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando biaya admin.",
                                            "hint": "Puedes tomar como modelo: Biaya admin dibayar setiap bulan.",
                                            "modelAnswer": "Biaya admin dibayar setiap bulan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Atención en la oficina",
                                    "objective": "Pide ayuda en una sucursal y comprende turnos y servicios disponibles.",
                                    "grammar": "Usa silakan para formular indicaciones corteses.",
                                    "vocabIds": [
                                        "a2u23_petugas",
                                        "a2u23_antrean",
                                        "a2u23_layanan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u23_petugas",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «petugas»?",
                                            "options": [
                                                "Empleado de atención",
                                                "Cuenta bancaria",
                                                "Ahorros"
                                            ],
                                            "answer": 0,
                                            "explanation": "«petugas» significa «Empleado de atención»."
                                        },
                                        {
                                            "vocabId": "a2u23_antrean",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La cola en el banco es bastante larga.",
                                            "answer": "Antrean di bank cukup panjang.",
                                            "explanation": "La frase utiliza «antrean»."
                                        },
                                        {
                                            "vocabId": "a2u23_layanan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Layanan bank tersedia sampai sore.",
                                            "explanation": "La oración contiene «layanan»."
                                        },
                                        {
                                            "vocabId": "a2u23_petugas",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando petugas.",
                                            "hint": "Puedes tomar como modelo: Petugas bank membantu pelanggan.",
                                            "modelAnswer": "Petugas bank membantu pelanggan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u24",
                            "title": "Unidad 24: Formación y aprendizaje",
                            "desc": "Habla de cursos, formación, evaluaciones y oportunidades educativas.",
                            "grammar": "Usa mengikuti kursus para hablar de participar en un curso y menerima sertifikat para describir un resultado. Practica expresiones para fechas, requisitos y resultados de aprendizaje.",
                            "vocab": [
                                {
                                    "id": "a2u24_kursus",
                                    "idn": "kursus",
                                    "esp": "Curso",
                                    "ex": "Saya mengikuti kursus bahasa.",
                                    "exEsp": "Asisto a un curso de idiomas."
                                },
                                {
                                    "id": "a2u24_pelatihan",
                                    "idn": "pelatihan",
                                    "esp": "Formación",
                                    "ex": "Pelatihan dimulai minggu depan.",
                                    "exEsp": "La formación empieza la próxima semana."
                                },
                                {
                                    "id": "a2u24_kelas_daring",
                                    "idn": "kelas daring",
                                    "esp": "Clase en línea",
                                    "ex": "Kelas daring berlangsung setiap Selasa.",
                                    "exEsp": "La clase en línea se imparte cada martes."
                                },
                                {
                                    "id": "a2u24_materi",
                                    "idn": "materi",
                                    "esp": "Material",
                                    "ex": "Materi pelajaran tersedia di situs.",
                                    "exEsp": "El material de estudio está disponible en el sitio web."
                                },
                                {
                                    "id": "a2u24_ujian",
                                    "idn": "ujian",
                                    "esp": "Examen",
                                    "ex": "Ujian bahasa dimulai besok.",
                                    "exEsp": "El examen de idiomas empieza mañana."
                                },
                                {
                                    "id": "a2u24_nilai",
                                    "idn": "nilai",
                                    "esp": "Calificación",
                                    "ex": "Nilai saya meningkat tahun ini.",
                                    "exEsp": "Mi calificación ha mejorado este año."
                                },
                                {
                                    "id": "a2u24_sertifikat",
                                    "idn": "sertifikat",
                                    "esp": "Certificado",
                                    "ex": "Peserta menerima sertifikat setelah kursus.",
                                    "exEsp": "Los participantes reciben un certificado después del curso."
                                },
                                {
                                    "id": "a2u24_beasiswa",
                                    "idn": "beasiswa",
                                    "esp": "Beca",
                                    "ex": "Dia mendapat beasiswa penuh.",
                                    "exEsp": "Él recibe una beca completa."
                                },
                                {
                                    "id": "a2u24_pendaftaran",
                                    "idn": "pendaftaran",
                                    "esp": "Inscripción",
                                    "ex": "Pendaftaran dibuka bulan depan.",
                                    "exEsp": "La inscripción se abre el próximo mes."
                                },
                                {
                                    "id": "a2u24_instruktur",
                                    "idn": "instruktur",
                                    "esp": "Instructor",
                                    "ex": "Instruktur menjelaskan topik dengan jelas.",
                                    "exEsp": "El instructor explica el tema con claridad."
                                },
                                {
                                    "id": "a2u24_peserta",
                                    "idn": "peserta",
                                    "esp": "Participante",
                                    "ex": "Semua peserta datang tepat waktu.",
                                    "exEsp": "Todos los participantes llegan a tiempo."
                                },
                                {
                                    "id": "a2u24_kelulusan",
                                    "idn": "kelulusan",
                                    "esp": "Graduación",
                                    "ex": "Kelulusan diumumkan pada hari Jumat.",
                                    "exEsp": "La graduación se anuncia el viernes."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Cursos y formación",
                                    "objective": "Describe cursos y actividades de formación para desarrollar habilidades.",
                                    "grammar": "Practica verbos para participar en cursos y programas formativos.",
                                    "vocabIds": [
                                        "a2u24_kursus",
                                        "a2u24_pelatihan",
                                        "a2u24_kelas_daring"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u24_kursus",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «kursus»?",
                                            "options": [
                                                "Curso",
                                                "Material",
                                                "Examen"
                                            ],
                                            "answer": 0,
                                            "explanation": "«kursus» significa «Curso»."
                                        },
                                        {
                                            "vocabId": "a2u24_pelatihan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La formación empieza la próxima semana.",
                                            "answer": "Pelatihan dimulai minggu depan.",
                                            "explanation": "La frase utiliza «pelatihan»."
                                        },
                                        {
                                            "vocabId": "a2u24_kelas_daring",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kelas daring berlangsung setiap Selasa.",
                                            "explanation": "La oración contiene «kelas daring»."
                                        },
                                        {
                                            "vocabId": "a2u24_kursus",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando kursus.",
                                            "hint": "Puedes tomar como modelo: Saya mengikuti kursus bahasa.",
                                            "modelAnswer": "Saya mengikuti kursus bahasa.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u24_pelatihan",
                                            "type": "order",
                                            "prompt": "Ordena: La formación empieza la próxima semana.",
                                            "words": [
                                                "depan",
                                                "minggu",
                                                "dimulai",
                                                "Pelatihan"
                                            ],
                                            "correctOrder": [
                                                "Pelatihan",
                                                "dimulai",
                                                "minggu",
                                                "depan"
                                            ],
                                            "explanation": "La frase completa es: Pelatihan dimulai minggu depan."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Clases y materiales",
                                    "objective": "Habla de clases en línea y materiales de estudio.",
                                    "grammar": "Usa tersedia para indicar que un recurso está disponible.",
                                    "vocabIds": [
                                        "a2u24_materi",
                                        "a2u24_ujian",
                                        "a2u24_nilai"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u24_materi",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «materi»?",
                                            "options": [
                                                "Material",
                                                "Certificado",
                                                "Beca"
                                            ],
                                            "answer": 0,
                                            "explanation": "«materi» significa «Material»."
                                        },
                                        {
                                            "vocabId": "a2u24_ujian",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: El examen de idiomas empieza mañana.",
                                            "answer": "Ujian bahasa dimulai besok.",
                                            "explanation": "La frase utiliza «ujian»."
                                        },
                                        {
                                            "vocabId": "a2u24_nilai",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Nilai saya meningkat tahun ini.",
                                            "explanation": "La oración contiene «nilai»."
                                        },
                                        {
                                            "vocabId": "a2u24_materi",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando materi.",
                                            "hint": "Puedes tomar como modelo: Materi pelajaran tersedia di situs.",
                                            "modelAnswer": "Materi pelajaran tersedia di situs.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Exámenes y resultados",
                                    "objective": "Describe exámenes, calificaciones y certificados.",
                                    "grammar": "Practica expresiones para comunicar resultados y progreso.",
                                    "vocabIds": [
                                        "a2u24_sertifikat",
                                        "a2u24_beasiswa",
                                        "a2u24_pendaftaran"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u24_sertifikat",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «sertifikat»?",
                                            "options": [
                                                "Certificado",
                                                "Instructor",
                                                "Participante"
                                            ],
                                            "answer": 0,
                                            "explanation": "«sertifikat» significa «Certificado»."
                                        },
                                        {
                                            "vocabId": "a2u24_beasiswa",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Él recibe una beca completa.",
                                            "answer": "Dia mendapat beasiswa penuh.",
                                            "explanation": "La frase utiliza «beasiswa»."
                                        },
                                        {
                                            "vocabId": "a2u24_pendaftaran",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pendaftaran dibuka bulan depan.",
                                            "explanation": "La oración contiene «pendaftaran»."
                                        },
                                        {
                                            "vocabId": "a2u24_sertifikat",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando sertifikat.",
                                            "hint": "Puedes tomar como modelo: Peserta menerima sertifikat setelah kursus.",
                                            "modelAnswer": "Peserta menerima sertifikat setelah kursus.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Becas y matrículas",
                                    "objective": "Habla de becas, inscripciones y participantes en programas educativos.",
                                    "grammar": "Usa dibuka para indicar cuándo se abre un periodo de inscripción.",
                                    "vocabIds": [
                                        "a2u24_instruktur",
                                        "a2u24_peserta",
                                        "a2u24_kelulusan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u24_instruktur",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «instruktur»?",
                                            "options": [
                                                "Instructor",
                                                "Curso",
                                                "Formación"
                                            ],
                                            "answer": 0,
                                            "explanation": "«instruktur» significa «Instructor»."
                                        },
                                        {
                                            "vocabId": "a2u24_peserta",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Todos los participantes llegan a tiempo.",
                                            "answer": "Semua peserta datang tepat waktu.",
                                            "explanation": "La frase utiliza «peserta»."
                                        },
                                        {
                                            "vocabId": "a2u24_kelulusan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kelulusan diumumkan pada hari Jumat.",
                                            "explanation": "La oración contiene «kelulusan»."
                                        },
                                        {
                                            "vocabId": "a2u24_instruktur",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando instruktur.",
                                            "hint": "Puedes tomar como modelo: Instruktur menjelaskan topik dengan jelas.",
                                            "modelAnswer": "Instruktur menjelaskan topik dengan jelas.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        }
,
                    {
                            "id": "a2_u25",
                            "title": "Unidad 25: Cocina y gastronomía",
                            "desc": "Habla de ingredientes, técnicas de cocina y sabores de distintos platos.",
                            "grammar": "Usa merebus, mengukus y memanggang para describir técnicas de preparación. Practica adjetivos de sabor y expresiones para seguir una receta.",
                            "vocab": [
                                {
                                    "id": "a2u25_bumbu",
                                    "idn": "bumbu",
                                    "esp": "Condimento",
                                    "ex": "Bumbu ini membuat sup lebih enak.",
                                    "exEsp": "Este condimento hace que la sopa sea más sabrosa."
                                },
                                {
                                    "id": "a2u25_rempah",
                                    "idn": "rempah",
                                    "esp": "Especia",
                                    "ex": "Rempah itu berasal dari Indonesia.",
                                    "exEsp": "Esa especia es originaria de Indonesia."
                                },
                                {
                                    "id": "a2u25_rebus",
                                    "idn": "rebus",
                                    "esp": "Hervir",
                                    "ex": "Saya merebus sayuran selama sepuluh menit.",
                                    "exEsp": "Hiervo las verduras durante diez minutos."
                                },
                                {
                                    "id": "a2u25_mengukus",
                                    "idn": "mengukus",
                                    "esp": "Cocer al vapor",
                                    "ex": "Ibu mengukus ikan untuk makan malam.",
                                    "exEsp": "Mi madre cuece pescado al vapor para la cena."
                                },
                                {
                                    "id": "a2u25_memanggang",
                                    "idn": "memanggang",
                                    "esp": "Asar",
                                    "ex": "Kami memanggang roti di oven.",
                                    "exEsp": "Asamos pan en el horno."
                                },
                                {
                                    "id": "a2u25_mengiris",
                                    "idn": "mengiris",
                                    "esp": "Cortar en rodajas",
                                    "ex": "Dia mengiris bawang dengan hati-hati.",
                                    "exEsp": "Él corta la cebolla en rodajas con cuidado."
                                },
                                {
                                    "id": "a2u25_adonan",
                                    "idn": "adonan",
                                    "esp": "Masa",
                                    "ex": "Adonan roti harus diistirahatkan.",
                                    "exEsp": "La masa del pan debe reposar."
                                },
                                {
                                    "id": "a2u25_resep_masakan",
                                    "idn": "resep masakan",
                                    "esp": "Receta de cocina",
                                    "ex": "Saya mengikuti resep masakan itu.",
                                    "exEsp": "Sigo esa receta de cocina."
                                },
                                {
                                    "id": "a2u25_hidangan",
                                    "idn": "hidangan",
                                    "esp": "Plato",
                                    "ex": "Hidangan utama sudah siap.",
                                    "exEsp": "El plato principal ya está listo."
                                },
                                {
                                    "id": "a2u25_rasa_pedas",
                                    "idn": "rasa pedas",
                                    "esp": "Sabor picante",
                                    "ex": "Rasa pedas makanan ini kuat.",
                                    "exEsp": "El sabor picante de esta comida es intenso."
                                },
                                {
                                    "id": "a2u25_manis",
                                    "idn": "manis",
                                    "esp": "Dulce",
                                    "ex": "Kue ini terlalu manis.",
                                    "exEsp": "Este pastel es demasiado dulce."
                                },
                                {
                                    "id": "a2u25_gurih",
                                    "idn": "gurih",
                                    "esp": "Sabroso",
                                    "ex": "Sup ini terasa gurih.",
                                    "exEsp": "Esta sopa tiene un sabor sabroso."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Ingredientes y especias",
                                    "objective": "Describe condimentos y especias que se utilizan al preparar alimentos.",
                                    "grammar": "Practica vocabulario para describir ingredientes y su procedencia.",
                                    "vocabIds": [
                                        "a2u25_bumbu",
                                        "a2u25_rempah",
                                        "a2u25_rebus"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u25_bumbu",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «bumbu»?",
                                            "options": [
                                                "Condimento",
                                                "Cocer al vapor",
                                                "Asar"
                                            ],
                                            "answer": 0,
                                            "explanation": "«bumbu» significa «Condimento»."
                                        },
                                        {
                                            "vocabId": "a2u25_rempah",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esa especia es originaria de Indonesia.",
                                            "answer": "Rempah itu berasal dari Indonesia.",
                                            "explanation": "La frase utiliza «rempah»."
                                        },
                                        {
                                            "vocabId": "a2u25_rebus",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya merebus sayuran selama sepuluh menit.",
                                            "explanation": "La oración contiene «rebus»."
                                        },
                                        {
                                            "vocabId": "a2u25_bumbu",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando bumbu.",
                                            "hint": "Puedes tomar como modelo: Bumbu ini membuat sup lebih enak.",
                                            "modelAnswer": "Bumbu ini membuat sup lebih enak.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u25_rempah",
                                            "type": "order",
                                            "prompt": "Ordena: Esa especia es originaria de Indonesia.",
                                            "words": [
                                                "Indonesia",
                                                "dari",
                                                "berasal",
                                                "itu",
                                                "Rempah"
                                            ],
                                            "correctOrder": [
                                                "Rempah",
                                                "itu",
                                                "berasal",
                                                "dari",
                                                "Indonesia"
                                            ],
                                            "explanation": "La frase completa es: Rempah itu berasal dari Indonesia."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Técnicas de preparación",
                                    "objective": "Explica cómo se hierven, cuecen al vapor y asan distintos alimentos.",
                                    "grammar": "Practica verbos de cocina para describir pasos de preparación.",
                                    "vocabIds": [
                                        "a2u25_mengukus",
                                        "a2u25_memanggang",
                                        "a2u25_mengiris"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u25_mengukus",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «mengukus»?",
                                            "options": [
                                                "Cocer al vapor",
                                                "Masa",
                                                "Receta de cocina"
                                            ],
                                            "answer": 0,
                                            "explanation": "«mengukus» significa «Cocer al vapor»."
                                        },
                                        {
                                            "vocabId": "a2u25_memanggang",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Asamos pan en el horno.",
                                            "answer": "Kami memanggang roti di oven.",
                                            "explanation": "La frase utiliza «memanggang»."
                                        },
                                        {
                                            "vocabId": "a2u25_mengiris",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Dia mengiris bawang dengan hati-hati.",
                                            "explanation": "La oración contiene «mengiris»."
                                        },
                                        {
                                            "vocabId": "a2u25_mengukus",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando mengukus.",
                                            "hint": "Puedes tomar como modelo: Ibu mengukus ikan untuk makan malam.",
                                            "modelAnswer": "Ibu mengukus ikan untuk makan malam.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Recetas y platos",
                                    "objective": "Habla de masas, recetas y platos que se sirven en una comida.",
                                    "grammar": "Usa expresiones para explicar instrucciones y el orden de una receta.",
                                    "vocabIds": [
                                        "a2u25_adonan",
                                        "a2u25_resep_masakan",
                                        "a2u25_hidangan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u25_adonan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «adonan»?",
                                            "options": [
                                                "Masa",
                                                "Sabor picante",
                                                "Dulce"
                                            ],
                                            "answer": 0,
                                            "explanation": "«adonan» significa «Masa»."
                                        },
                                        {
                                            "vocabId": "a2u25_resep_masakan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Sigo esa receta de cocina.",
                                            "answer": "Saya mengikuti resep masakan itu.",
                                            "explanation": "La frase utiliza «resep masakan»."
                                        },
                                        {
                                            "vocabId": "a2u25_hidangan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Hidangan utama sudah siap.",
                                            "explanation": "La oración contiene «hidangan»."
                                        },
                                        {
                                            "vocabId": "a2u25_adonan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando adonan.",
                                            "hint": "Puedes tomar como modelo: Adonan roti harus diistirahatkan.",
                                            "modelAnswer": "Adonan roti harus diistirahatkan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Sabores y preferencias",
                                    "objective": "Describe sabores dulces, salados y especiados.",
                                    "grammar": "Practica adjetivos para valorar el sabor y la intensidad de un plato.",
                                    "vocabIds": [
                                        "a2u25_rasa_pedas",
                                        "a2u25_manis",
                                        "a2u25_gurih"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u25_rasa_pedas",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «rasa pedas»?",
                                            "options": [
                                                "Sabor picante",
                                                "Condimento",
                                                "Especia"
                                            ],
                                            "answer": 0,
                                            "explanation": "«rasa pedas» significa «Sabor picante»."
                                        },
                                        {
                                            "vocabId": "a2u25_manis",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Este pastel es demasiado dulce.",
                                            "answer": "Kue ini terlalu manis.",
                                            "explanation": "La frase utiliza «manis»."
                                        },
                                        {
                                            "vocabId": "a2u25_gurih",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Sup ini terasa gurih.",
                                            "explanation": "La oración contiene «gurih»."
                                        },
                                        {
                                            "vocabId": "a2u25_rasa_pedas",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando rasa pedas.",
                                            "hint": "Puedes tomar como modelo: Rasa pedas makanan ini kuat.",
                                            "modelAnswer": "Rasa pedas makanan ini kuat.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u26",
                            "title": "Unidad 26: Sentimientos y relaciones",
                            "desc": "Expresa emociones, apoyo, desacuerdos y formas de resolver conflictos.",
                            "grammar": "Usa merasa para expresar estados emocionales y kepada para indicar hacia quién se dirige un sentimiento. Practica expresiones para agradecer, apoyar y resolver desacuerdos.",
                            "vocab": [
                                {
                                    "id": "a2u26_perasaan",
                                    "idn": "perasaan",
                                    "esp": "Sentimiento",
                                    "ex": "Perasaan saya berubah hari ini.",
                                    "exEsp": "Mis sentimientos han cambiado hoy."
                                },
                                {
                                    "id": "a2u26_bangga",
                                    "idn": "bangga",
                                    "esp": "Orgulloso",
                                    "ex": "Orang tua saya bangga kepada saya.",
                                    "exEsp": "Mis padres están orgullosos de mí."
                                },
                                {
                                    "id": "a2u26_khawatir",
                                    "idn": "khawatir",
                                    "esp": "Preocupado",
                                    "ex": "Saya khawatir tentang ujian besok.",
                                    "exEsp": "Estoy preocupado por el examen de mañana."
                                },
                                {
                                    "id": "a2u26_lega",
                                    "idn": "lega",
                                    "esp": "Aliviado",
                                    "ex": "Saya merasa lega setelah berbicara.",
                                    "exEsp": "Me siento aliviado después de hablar."
                                },
                                {
                                    "id": "a2u26_tersinggung",
                                    "idn": "tersinggung",
                                    "esp": "Ofendido",
                                    "ex": "Dia merasa tersinggung oleh komentar itu.",
                                    "exEsp": "Él se sintió ofendido por ese comentario."
                                },
                                {
                                    "id": "a2u26_percaya_diri",
                                    "idn": "percaya diri",
                                    "esp": "Seguro de sí mismo",
                                    "ex": "Saya lebih percaya diri sekarang.",
                                    "exEsp": "Ahora tengo más confianza en mí mismo."
                                },
                                {
                                    "id": "a2u26_kesepian",
                                    "idn": "kesepian",
                                    "esp": "Solo",
                                    "ex": "Dia merasa kesepian di kota baru.",
                                    "exEsp": "Él se siente solo en la ciudad nueva."
                                },
                                {
                                    "id": "a2u26_bersyukur",
                                    "idn": "bersyukur",
                                    "esp": "Agradecido",
                                    "ex": "Kami bersyukur atas bantuan Anda.",
                                    "exEsp": "Estamos agradecidos por su ayuda."
                                },
                                {
                                    "id": "a2u26_menghargai",
                                    "idn": "menghargai",
                                    "esp": "Valorar",
                                    "ex": "Saya menghargai pendapat teman.",
                                    "exEsp": "Valoro la opinión de mi amigo."
                                },
                                {
                                    "id": "a2u26_mendukung",
                                    "idn": "mendukung",
                                    "esp": "Apoyar",
                                    "ex": "Keluarga saya mendukung keputusan itu.",
                                    "exEsp": "Mi familia apoya esa decisión."
                                },
                                {
                                    "id": "a2u26_perselisihan",
                                    "idn": "perselisihan",
                                    "esp": "Desacuerdo",
                                    "ex": "Mereka menyelesaikan perselisihan dengan tenang.",
                                    "exEsp": "Resolvieron el desacuerdo con calma."
                                },
                                {
                                    "id": "a2u26_berdamai",
                                    "idn": "berdamai",
                                    "esp": "Reconciliarse",
                                    "ex": "Kedua teman itu akhirnya berdamai.",
                                    "exEsp": "Los dos amigos finalmente se reconciliaron."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Expresar sentimientos",
                                    "objective": "Describe emociones y cómo cambian según una situación.",
                                    "grammar": "Practica merasa + adjetivo para comunicar estados emocionales.",
                                    "vocabIds": [
                                        "a2u26_perasaan",
                                        "a2u26_bangga",
                                        "a2u26_khawatir"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u26_perasaan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «perasaan»?",
                                            "options": [
                                                "Sentimiento",
                                                "Aliviado",
                                                "Ofendido"
                                            ],
                                            "answer": 0,
                                            "explanation": "«perasaan» significa «Sentimiento»."
                                        },
                                        {
                                            "vocabId": "a2u26_bangga",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Mis padres están orgullosos de mí.",
                                            "answer": "Orang tua saya bangga kepada saya.",
                                            "explanation": "La frase utiliza «bangga»."
                                        },
                                        {
                                            "vocabId": "a2u26_khawatir",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya khawatir tentang ujian besok.",
                                            "explanation": "La oración contiene «khawatir»."
                                        },
                                        {
                                            "vocabId": "a2u26_perasaan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando perasaan.",
                                            "hint": "Puedes tomar como modelo: Perasaan saya berubah hari ini.",
                                            "modelAnswer": "Perasaan saya berubah hari ini.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u26_bangga",
                                            "type": "order",
                                            "prompt": "Ordena: Mis padres están orgullosos de mí.",
                                            "words": [
                                                "saya",
                                                "kepada",
                                                "bangga",
                                                "saya",
                                                "tua",
                                                "Orang"
                                            ],
                                            "correctOrder": [
                                                "Orang",
                                                "tua",
                                                "saya",
                                                "bangga",
                                                "kepada",
                                                "saya"
                                            ],
                                            "explanation": "La frase completa es: Orang tua saya bangga kepada saya."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Orgullo, preocupación y alivio",
                                    "objective": "Explica cómo te sientes ante logros, exámenes y situaciones difíciles.",
                                    "grammar": "Usa khawatir tentang para expresar preocupación por algo.",
                                    "vocabIds": [
                                        "a2u26_lega",
                                        "a2u26_tersinggung",
                                        "a2u26_percaya_diri"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u26_lega",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «lega»?",
                                            "options": [
                                                "Aliviado",
                                                "Solo",
                                                "Agradecido"
                                            ],
                                            "answer": 0,
                                            "explanation": "«lega» significa «Aliviado»."
                                        },
                                        {
                                            "vocabId": "a2u26_tersinggung",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Él se sintió ofendido por ese comentario.",
                                            "answer": "Dia merasa tersinggung oleh komentar itu.",
                                            "explanation": "La frase utiliza «tersinggung»."
                                        },
                                        {
                                            "vocabId": "a2u26_percaya_diri",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya lebih percaya diri sekarang.",
                                            "explanation": "La oración contiene «percaya diri»."
                                        },
                                        {
                                            "vocabId": "a2u26_lega",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando lega.",
                                            "hint": "Puedes tomar como modelo: Saya merasa lega setelah berbicara.",
                                            "modelAnswer": "Saya merasa lega setelah berbicara.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Confianza y gratitud",
                                    "objective": "Habla de confianza personal y de agradecer la ayuda de otras personas.",
                                    "grammar": "Practica expresiones para valorar el apoyo recibido.",
                                    "vocabIds": [
                                        "a2u26_kesepian",
                                        "a2u26_bersyukur",
                                        "a2u26_menghargai"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u26_kesepian",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «kesepian»?",
                                            "options": [
                                                "Solo",
                                                "Apoyar",
                                                "Desacuerdo"
                                            ],
                                            "answer": 0,
                                            "explanation": "«kesepian» significa «Solo»."
                                        },
                                        {
                                            "vocabId": "a2u26_bersyukur",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Estamos agradecidos por su ayuda.",
                                            "answer": "Kami bersyukur atas bantuan Anda.",
                                            "explanation": "La frase utiliza «bersyukur»."
                                        },
                                        {
                                            "vocabId": "a2u26_menghargai",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya menghargai pendapat teman.",
                                            "explanation": "La oración contiene «menghargai»."
                                        },
                                        {
                                            "vocabId": "a2u26_kesepian",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando kesepian.",
                                            "hint": "Puedes tomar como modelo: Dia merasa kesepian di kota baru.",
                                            "modelAnswer": "Dia merasa kesepian di kota baru.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Apoyo y reconciliación",
                                    "objective": "Describe desacuerdos y cómo las personas pueden reconciliarse.",
                                    "grammar": "Usa expresiones para hablar de conflictos y acuerdos.",
                                    "vocabIds": [
                                        "a2u26_mendukung",
                                        "a2u26_perselisihan",
                                        "a2u26_berdamai"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u26_mendukung",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «mendukung»?",
                                            "options": [
                                                "Apoyar",
                                                "Sentimiento",
                                                "Orgulloso"
                                            ],
                                            "answer": 0,
                                            "explanation": "«mendukung» significa «Apoyar»."
                                        },
                                        {
                                            "vocabId": "a2u26_perselisihan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Resolvieron el desacuerdo con calma.",
                                            "answer": "Mereka menyelesaikan perselisihan dengan tenang.",
                                            "explanation": "La frase utiliza «perselisihan»."
                                        },
                                        {
                                            "vocabId": "a2u26_berdamai",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kedua teman itu akhirnya berdamai.",
                                            "explanation": "La oración contiene «berdamai»."
                                        },
                                        {
                                            "vocabId": "a2u26_mendukung",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando mendukung.",
                                            "hint": "Puedes tomar como modelo: Keluarga saya mendukung keputusan itu.",
                                            "modelAnswer": "Keluarga saya mendukung keputusan itu.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u27",
                            "title": "Unidad 27: Vida cívica y espacios públicos",
                            "desc": "Describe servicios locales, espacios públicos y actividades de participación comunitaria.",
                            "grammar": "Usa di para ubicar servicios y lugares públicos. Practica expresiones para dar instrucciones, solicitar ayuda y participar en actividades de la comunidad.",
                            "vocab": [
                                {
                                    "id": "a2u27_warga",
                                    "idn": "warga",
                                    "esp": "Residente",
                                    "ex": "Warga berkumpul di balai kota.",
                                    "exEsp": "Los residentes se reúnen en el ayuntamiento."
                                },
                                {
                                    "id": "a2u27_kecamatan",
                                    "idn": "kecamatan",
                                    "esp": "Distrito",
                                    "ex": "Kecamatan ini memiliki banyak sekolah.",
                                    "exEsp": "Este distrito tiene muchas escuelas."
                                },
                                {
                                    "id": "a2u27_kelurahan",
                                    "idn": "kelurahan",
                                    "esp": "Oficina de barrio",
                                    "ex": "Kantor kelurahan buka pagi.",
                                    "exEsp": "La oficina del barrio abre por la mañana."
                                },
                                {
                                    "id": "a2u27_balai_kota",
                                    "idn": "balai kota",
                                    "esp": "Ayuntamiento",
                                    "ex": "Pertemuan berlangsung di balai kota.",
                                    "exEsp": "La reunión tiene lugar en el ayuntamiento."
                                },
                                {
                                    "id": "a2u27_fasilitas_umum",
                                    "idn": "fasilitas umum",
                                    "esp": "Instalaciones públicas",
                                    "ex": "Fasilitas umum harus dijaga.",
                                    "exEsp": "Las instalaciones públicas deben cuidarse."
                                },
                                {
                                    "id": "a2u27_taman_kota",
                                    "idn": "taman kota",
                                    "esp": "Parque urbano",
                                    "ex": "Anak-anak bermain di taman kota.",
                                    "exEsp": "Los niños juegan en el parque urbano."
                                },
                                {
                                    "id": "a2u27_trotoar",
                                    "idn": "trotoar",
                                    "esp": "Acera",
                                    "ex": "Pejalan kaki menggunakan trotoar.",
                                    "exEsp": "Los peatones utilizan la acera."
                                },
                                {
                                    "id": "a2u27_rambu_lalu_lintas",
                                    "idn": "rambu lalu lintas",
                                    "esp": "Señal de tráfico",
                                    "ex": "Rambu lalu lintas itu mudah dilihat.",
                                    "exEsp": "Esa señal de tráfico es fácil de ver."
                                },
                                {
                                    "id": "a2u27_penyeberangan",
                                    "idn": "penyeberangan",
                                    "esp": "Paso de peatones",
                                    "ex": "Gunakan penyeberangan untuk menyeberang jalan.",
                                    "exEsp": "Usa el paso de peatones para cruzar la calle."
                                },
                                {
                                    "id": "a2u27_sukarelawan",
                                    "idn": "sukarelawan",
                                    "esp": "Voluntario",
                                    "ex": "Sukarelawan membantu warga lanjut usia.",
                                    "exEsp": "Los voluntarios ayudan a los residentes mayores."
                                },
                                {
                                    "id": "a2u27_donasi",
                                    "idn": "donasi",
                                    "esp": "Donación",
                                    "ex": "Donasi diberikan kepada keluarga yang membutuhkan.",
                                    "exEsp": "La donación se entrega a las familias que la necesitan."
                                },
                                {
                                    "id": "a2u27_kegiatan_sosial",
                                    "idn": "kegiatan sosial",
                                    "esp": "Actividad social",
                                    "ex": "Kami mengikuti kegiatan sosial setiap bulan.",
                                    "exEsp": "Participamos en una actividad social cada mes."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Residentes y distritos",
                                    "objective": "Habla de los residentes y de la organización de los barrios y distritos.",
                                    "grammar": "Practica vocabulario para describir la administración local.",
                                    "vocabIds": [
                                        "a2u27_warga",
                                        "a2u27_kecamatan",
                                        "a2u27_kelurahan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u27_warga",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «warga»?",
                                            "options": [
                                                "Residente",
                                                "Ayuntamiento",
                                                "Instalaciones públicas"
                                            ],
                                            "answer": 0,
                                            "explanation": "«warga» significa «Residente»."
                                        },
                                        {
                                            "vocabId": "a2u27_kecamatan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Este distrito tiene muchas escuelas.",
                                            "answer": "Kecamatan ini memiliki banyak sekolah.",
                                            "explanation": "La frase utiliza «kecamatan»."
                                        },
                                        {
                                            "vocabId": "a2u27_kelurahan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kantor kelurahan buka pagi.",
                                            "explanation": "La oración contiene «kelurahan»."
                                        },
                                        {
                                            "vocabId": "a2u27_warga",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando warga.",
                                            "hint": "Puedes tomar como modelo: Warga berkumpul di balai kota.",
                                            "modelAnswer": "Warga berkumpul di balai kota.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u27_kecamatan",
                                            "type": "order",
                                            "prompt": "Ordena: Este distrito tiene muchas escuelas.",
                                            "words": [
                                                "sekolah",
                                                "banyak",
                                                "memiliki",
                                                "ini",
                                                "Kecamatan"
                                            ],
                                            "correctOrder": [
                                                "Kecamatan",
                                                "ini",
                                                "memiliki",
                                                "banyak",
                                                "sekolah"
                                            ],
                                            "explanation": "La frase completa es: Kecamatan ini memiliki banyak sekolah."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Oficinas y servicios locales",
                                    "objective": "Describe oficinas municipales y lugares donde se atienden trámites.",
                                    "grammar": "Usa di para indicar dónde se ofrece un servicio.",
                                    "vocabIds": [
                                        "a2u27_balai_kota",
                                        "a2u27_fasilitas_umum",
                                        "a2u27_taman_kota"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u27_balai_kota",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «balai kota»?",
                                            "options": [
                                                "Ayuntamiento",
                                                "Acera",
                                                "Señal de tráfico"
                                            ],
                                            "answer": 0,
                                            "explanation": "«balai kota» significa «Ayuntamiento»."
                                        },
                                        {
                                            "vocabId": "a2u27_fasilitas_umum",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Las instalaciones públicas deben cuidarse.",
                                            "answer": "Fasilitas umum harus dijaga.",
                                            "explanation": "La frase utiliza «fasilitas umum»."
                                        },
                                        {
                                            "vocabId": "a2u27_taman_kota",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Anak-anak bermain di taman kota.",
                                            "explanation": "La oración contiene «taman kota»."
                                        },
                                        {
                                            "vocabId": "a2u27_balai_kota",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando balai kota.",
                                            "hint": "Puedes tomar como modelo: Pertemuan berlangsung di balai kota.",
                                            "modelAnswer": "Pertemuan berlangsung di balai kota.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Espacios y seguridad vial",
                                    "objective": "Habla de parques, aceras y señales para peatones.",
                                    "grammar": "Practica instrucciones para desplazarse con seguridad.",
                                    "vocabIds": [
                                        "a2u27_trotoar",
                                        "a2u27_rambu_lalu_lintas",
                                        "a2u27_penyeberangan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u27_trotoar",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «trotoar»?",
                                            "options": [
                                                "Acera",
                                                "Voluntario",
                                                "Donación"
                                            ],
                                            "answer": 0,
                                            "explanation": "«trotoar» significa «Acera»."
                                        },
                                        {
                                            "vocabId": "a2u27_rambu_lalu_lintas",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esa señal de tráfico es fácil de ver.",
                                            "answer": "Rambu lalu lintas itu mudah dilihat.",
                                            "explanation": "La frase utiliza «rambu lalu lintas»."
                                        },
                                        {
                                            "vocabId": "a2u27_penyeberangan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Gunakan penyeberangan untuk menyeberang jalan.",
                                            "explanation": "La oración contiene «penyeberangan»."
                                        },
                                        {
                                            "vocabId": "a2u27_trotoar",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando trotoar.",
                                            "hint": "Puedes tomar como modelo: Pejalan kaki menggunakan trotoar.",
                                            "modelAnswer": "Pejalan kaki menggunakan trotoar.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Participación comunitaria",
                                    "objective": "Describe voluntariado, donaciones y actividades sociales.",
                                    "grammar": "Usa expresiones para explicar cómo colaborar con otras personas.",
                                    "vocabIds": [
                                        "a2u27_sukarelawan",
                                        "a2u27_donasi",
                                        "a2u27_kegiatan_sosial"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u27_sukarelawan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «sukarelawan»?",
                                            "options": [
                                                "Voluntario",
                                                "Residente",
                                                "Distrito"
                                            ],
                                            "answer": 0,
                                            "explanation": "«sukarelawan» significa «Voluntario»."
                                        },
                                        {
                                            "vocabId": "a2u27_donasi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La donación se entrega a las familias que la necesitan.",
                                            "answer": "Donasi diberikan kepada keluarga yang membutuhkan.",
                                            "explanation": "La frase utiliza «donasi»."
                                        },
                                        {
                                            "vocabId": "a2u27_kegiatan_sosial",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kami mengikuti kegiatan sosial setiap bulan.",
                                            "explanation": "La oración contiene «kegiatan sosial»."
                                        },
                                        {
                                            "vocabId": "a2u27_sukarelawan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando sukarelawan.",
                                            "hint": "Puedes tomar como modelo: Sukarelawan membantu warga lanjut usia.",
                                            "modelAnswer": "Sukarelawan membantu warga lanjut usia.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u28",
                            "title": "Unidad 28: Ciencia y tecnología",
                            "desc": "Habla de descubrimientos, experimentos, dispositivos y seguridad digital.",
                            "grammar": "Usa melakukan percobaan para describir un experimento y secara otomatis para explicar una acción automática. Practica consejos para proteger los datos y la privacidad.",
                            "vocab": [
                                {
                                    "id": "a2u28_penemuan",
                                    "idn": "penemuan",
                                    "esp": "Descubrimiento",
                                    "ex": "Penemuan itu mengubah kehidupan manusia.",
                                    "exEsp": "Ese descubrimiento cambió la vida de las personas."
                                },
                                {
                                    "id": "a2u28_percobaan",
                                    "idn": "percobaan",
                                    "esp": "Experimento",
                                    "ex": "Siswa melakukan percobaan sederhana.",
                                    "exEsp": "Los estudiantes realizan un experimento sencillo."
                                },
                                {
                                    "id": "a2u28_ilmuwan",
                                    "idn": "ilmuwan",
                                    "esp": "Científico",
                                    "ex": "Ilmuwan itu bekerja di laboratorium.",
                                    "exEsp": "Ese científico trabaja en un laboratorio."
                                },
                                {
                                    "id": "a2u28_penelitian",
                                    "idn": "penelitian",
                                    "esp": "Investigación",
                                    "ex": "Penelitian ini membutuhkan waktu.",
                                    "exEsp": "Esta investigación necesita tiempo."
                                },
                                {
                                    "id": "a2u28_perangkat",
                                    "idn": "perangkat",
                                    "esp": "Dispositivo",
                                    "ex": "Perangkat itu mudah digunakan.",
                                    "exEsp": "Ese dispositivo es fácil de usar."
                                },
                                {
                                    "id": "a2u28_aplikasi",
                                    "idn": "aplikasi",
                                    "esp": "Aplicación",
                                    "ex": "Aplikasi ini membantu saya belajar.",
                                    "exEsp": "Esta aplicación me ayuda a estudiar."
                                },
                                {
                                    "id": "a2u28_layar_sentuh",
                                    "idn": "layar sentuh",
                                    "esp": "Pantalla táctil",
                                    "ex": "Ponsel ini memiliki layar sentuh.",
                                    "exEsp": "Este teléfono tiene una pantalla táctil."
                                },
                                {
                                    "id": "a2u28_baterai",
                                    "idn": "baterai",
                                    "esp": "Batería",
                                    "ex": "Baterai perangkat hampir habis.",
                                    "exEsp": "La batería del dispositivo está casi agotada."
                                },
                                {
                                    "id": "a2u28_pengisian_daya",
                                    "idn": "pengisian daya",
                                    "esp": "Carga",
                                    "ex": "Pengisian daya membutuhkan satu jam.",
                                    "exEsp": "La carga necesita una hora."
                                },
                                {
                                    "id": "a2u28_otomatis",
                                    "idn": "otomatis",
                                    "esp": "Automático",
                                    "ex": "Pintu ini terbuka secara otomatis.",
                                    "exEsp": "Esta puerta se abre automáticamente."
                                },
                                {
                                    "id": "a2u28_data_pribadi",
                                    "idn": "data pribadi",
                                    "esp": "Datos personales",
                                    "ex": "Jangan membagikan data pribadi.",
                                    "exEsp": "No compartas datos personales."
                                },
                                {
                                    "id": "a2u28_privasi",
                                    "idn": "privasi",
                                    "esp": "Privacidad",
                                    "ex": "Privasi pengguna harus dilindungi.",
                                    "exEsp": "La privacidad del usuario debe protegerse."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Descubrimientos y experimentos",
                                    "objective": "Describe descubrimientos científicos y experimentos sencillos.",
                                    "grammar": "Practica vocabulario para hablar de ciencia y observación.",
                                    "vocabIds": [
                                        "a2u28_penemuan",
                                        "a2u28_percobaan",
                                        "a2u28_ilmuwan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u28_penemuan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «penemuan»?",
                                            "options": [
                                                "Descubrimiento",
                                                "Investigación",
                                                "Dispositivo"
                                            ],
                                            "answer": 0,
                                            "explanation": "«penemuan» significa «Descubrimiento»."
                                        },
                                        {
                                            "vocabId": "a2u28_percobaan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Los estudiantes realizan un experimento sencillo.",
                                            "answer": "Siswa melakukan percobaan sederhana.",
                                            "explanation": "La frase utiliza «percobaan»."
                                        },
                                        {
                                            "vocabId": "a2u28_ilmuwan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Ilmuwan itu bekerja di laboratorium.",
                                            "explanation": "La oración contiene «ilmuwan»."
                                        },
                                        {
                                            "vocabId": "a2u28_penemuan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando penemuan.",
                                            "hint": "Puedes tomar como modelo: Penemuan itu mengubah kehidupan manusia.",
                                            "modelAnswer": "Penemuan itu mengubah kehidupan manusia.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u28_percobaan",
                                            "type": "order",
                                            "prompt": "Ordena: Los estudiantes realizan un experimento sencillo.",
                                            "words": [
                                                "sederhana",
                                                "percobaan",
                                                "melakukan",
                                                "Siswa"
                                            ],
                                            "correctOrder": [
                                                "Siswa",
                                                "melakukan",
                                                "percobaan",
                                                "sederhana"
                                            ],
                                            "explanation": "La frase completa es: Siswa melakukan percobaan sederhana."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Investigación y científicos",
                                    "objective": "Habla de científicos y proyectos de investigación.",
                                    "grammar": "Usa expresiones para explicar objetivos y resultados de una investigación.",
                                    "vocabIds": [
                                        "a2u28_penelitian",
                                        "a2u28_perangkat",
                                        "a2u28_aplikasi"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u28_penelitian",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «penelitian»?",
                                            "options": [
                                                "Investigación",
                                                "Pantalla táctil",
                                                "Batería"
                                            ],
                                            "answer": 0,
                                            "explanation": "«penelitian» significa «Investigación»."
                                        },
                                        {
                                            "vocabId": "a2u28_perangkat",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Ese dispositivo es fácil de usar.",
                                            "answer": "Perangkat itu mudah digunakan.",
                                            "explanation": "La frase utiliza «perangkat»."
                                        },
                                        {
                                            "vocabId": "a2u28_aplikasi",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Aplikasi ini membantu saya belajar.",
                                            "explanation": "La oración contiene «aplikasi»."
                                        },
                                        {
                                            "vocabId": "a2u28_penelitian",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando penelitian.",
                                            "hint": "Puedes tomar como modelo: Penelitian ini membutuhkan waktu.",
                                            "modelAnswer": "Penelitian ini membutuhkan waktu.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Dispositivos y aplicaciones",
                                    "objective": "Describe dispositivos digitales, pantallas y aplicaciones.",
                                    "grammar": "Practica vocabulario para explicar funciones y características de la tecnología.",
                                    "vocabIds": [
                                        "a2u28_layar_sentuh",
                                        "a2u28_baterai",
                                        "a2u28_pengisian_daya"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u28_layar_sentuh",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «layar sentuh»?",
                                            "options": [
                                                "Pantalla táctil",
                                                "Automático",
                                                "Datos personales"
                                            ],
                                            "answer": 0,
                                            "explanation": "«layar sentuh» significa «Pantalla táctil»."
                                        },
                                        {
                                            "vocabId": "a2u28_baterai",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La batería del dispositivo está casi agotada.",
                                            "answer": "Baterai perangkat hampir habis.",
                                            "explanation": "La frase utiliza «baterai»."
                                        },
                                        {
                                            "vocabId": "a2u28_pengisian_daya",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pengisian daya membutuhkan satu jam.",
                                            "explanation": "La oración contiene «pengisian daya»."
                                        },
                                        {
                                            "vocabId": "a2u28_layar_sentuh",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando layar sentuh.",
                                            "hint": "Puedes tomar como modelo: Ponsel ini memiliki layar sentuh.",
                                            "modelAnswer": "Ponsel ini memiliki layar sentuh.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Baterías y privacidad",
                                    "objective": "Habla de carga, automatización y protección de datos personales.",
                                    "grammar": "Usa imperativos y expresiones de obligación para dar consejos de seguridad.",
                                    "vocabIds": [
                                        "a2u28_otomatis",
                                        "a2u28_data_pribadi",
                                        "a2u28_privasi"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u28_otomatis",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «otomatis»?",
                                            "options": [
                                                "Automático",
                                                "Descubrimiento",
                                                "Experimento"
                                            ],
                                            "answer": 0,
                                            "explanation": "«otomatis» significa «Automático»."
                                        },
                                        {
                                            "vocabId": "a2u28_data_pribadi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: No compartas datos personales.",
                                            "answer": "Jangan membagikan data pribadi.",
                                            "explanation": "La frase utiliza «data pribadi»."
                                        },
                                        {
                                            "vocabId": "a2u28_privasi",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Privasi pengguna harus dilindungi.",
                                            "explanation": "La oración contiene «privasi»."
                                        },
                                        {
                                            "vocabId": "a2u28_otomatis",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando otomatis.",
                                            "hint": "Puedes tomar como modelo: Pintu ini terbuka secara otomatis.",
                                            "modelAnswer": "Pintu ini terbuka secara otomatis.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        }
,
                    {
                            "id": "a2_u29",
                            "title": "Unidad 29: Atención al cliente y compras",
                            "desc": "Explica problemas con productos, garantías, devoluciones y servicios de atención.",
                            "grammar": "Usa menyampaikan keluhan para presentar una queja y meminta penggantian para solicitar una sustitución. Practica expresiones para describir condiciones, plazos y servicios.",
                            "vocab": [
                                {
                                    "id": "a2u29_pelanggan",
                                    "idn": "pelanggan",
                                    "esp": "Cliente",
                                    "ex": "Pelanggan itu menunggu bantuan.",
                                    "exEsp": "Ese cliente espera ayuda."
                                },
                                {
                                    "id": "a2u29_keluhan",
                                    "idn": "keluhan",
                                    "esp": "Queja",
                                    "ex": "Saya menyampaikan keluhan kepada petugas.",
                                    "exEsp": "Presento una queja al empleado."
                                },
                                {
                                    "id": "a2u29_pengembalian",
                                    "idn": "pengembalian",
                                    "esp": "Devolución",
                                    "ex": "Pengembalian barang harus disertai struk.",
                                    "exEsp": "La devolución del producto debe incluir el recibo."
                                },
                                {
                                    "id": "a2u29_garansi",
                                    "idn": "garansi",
                                    "esp": "Garantía",
                                    "ex": "Produk ini memiliki garansi satu tahun.",
                                    "exEsp": "Este producto tiene una garantía de un año."
                                },
                                {
                                    "id": "a2u29_kualitas",
                                    "idn": "kualitas",
                                    "esp": "Calidad",
                                    "ex": "Kualitas produk itu sangat baik.",
                                    "exEsp": "La calidad de ese producto es muy buena."
                                },
                                {
                                    "id": "a2u29_model",
                                    "idn": "model",
                                    "esp": "Modelo",
                                    "ex": "Model baru tersedia di toko.",
                                    "exEsp": "El modelo nuevo está disponible en la tienda."
                                },
                                {
                                    "id": "a2u29_stok",
                                    "idn": "stok",
                                    "esp": "Existencias",
                                    "ex": "Stok barang itu masih cukup.",
                                    "exEsp": "Todavía hay existencias suficientes de ese producto."
                                },
                                {
                                    "id": "a2u29_pesanan",
                                    "idn": "pesanan",
                                    "esp": "Pedido",
                                    "ex": "Pesanan saya tiba hari ini.",
                                    "exEsp": "Mi pedido llega hoy."
                                },
                                {
                                    "id": "a2u29_pengiriman",
                                    "idn": "pengiriman",
                                    "esp": "Envío",
                                    "ex": "Pengiriman membutuhkan dua hari.",
                                    "exEsp": "El envío necesita dos días."
                                },
                                {
                                    "id": "a2u29_kemasan",
                                    "idn": "kemasan",
                                    "esp": "Envase",
                                    "ex": "Kemasan produk ini ramah lingkungan.",
                                    "exEsp": "El envase de este producto es respetuoso con el medio ambiente."
                                },
                                {
                                    "id": "a2u29_penggantian",
                                    "idn": "penggantian",
                                    "esp": "Sustitución",
                                    "ex": "Saya meminta penggantian barang.",
                                    "exEsp": "Solicito la sustitución del producto."
                                },
                                {
                                    "id": "a2u29_layanan_pelanggan",
                                    "idn": "layanan pelanggan",
                                    "esp": "Atención al cliente",
                                    "ex": "Layanan pelanggan buka sampai pukul lima.",
                                    "exEsp": "La atención al cliente está abierta hasta las cinco."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Clientes y reclamaciones",
                                    "objective": "Describe las necesidades de los clientes y cómo presentar una queja.",
                                    "grammar": "Practica expresiones corteses para comunicar un problema.",
                                    "vocabIds": [
                                        "a2u29_pelanggan",
                                        "a2u29_keluhan",
                                        "a2u29_pengembalian"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u29_pelanggan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pelanggan»?",
                                            "options": [
                                                "Cliente",
                                                "Garantía",
                                                "Calidad"
                                            ],
                                            "answer": 0,
                                            "explanation": "«pelanggan» significa «Cliente»."
                                        },
                                        {
                                            "vocabId": "a2u29_keluhan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Presento una queja al empleado.",
                                            "answer": "Saya menyampaikan keluhan kepada petugas.",
                                            "explanation": "La frase utiliza «keluhan»."
                                        },
                                        {
                                            "vocabId": "a2u29_pengembalian",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pengembalian barang harus disertai struk.",
                                            "explanation": "La oración contiene «pengembalian»."
                                        },
                                        {
                                            "vocabId": "a2u29_pelanggan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pelanggan.",
                                            "hint": "Puedes tomar como modelo: Pelanggan itu menunggu bantuan.",
                                            "modelAnswer": "Pelanggan itu menunggu bantuan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u29_keluhan",
                                            "type": "order",
                                            "prompt": "Ordena: Presento una queja al empleado.",
                                            "words": [
                                                "petugas",
                                                "kepada",
                                                "keluhan",
                                                "menyampaikan",
                                                "Saya"
                                            ],
                                            "correctOrder": [
                                                "Saya",
                                                "menyampaikan",
                                                "keluhan",
                                                "kepada",
                                                "petugas"
                                            ],
                                            "explanation": "La frase completa es: Saya menyampaikan keluhan kepada petugas."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Garantías y devoluciones",
                                    "objective": "Habla de garantías, calidad y devoluciones de productos.",
                                    "grammar": "Usa harus y perlu para explicar condiciones y requisitos.",
                                    "vocabIds": [
                                        "a2u29_garansi",
                                        "a2u29_kualitas",
                                        "a2u29_model"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u29_garansi",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «garansi»?",
                                            "options": [
                                                "Garantía",
                                                "Existencias",
                                                "Pedido"
                                            ],
                                            "answer": 0,
                                            "explanation": "«garansi» significa «Garantía»."
                                        },
                                        {
                                            "vocabId": "a2u29_kualitas",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La calidad de ese producto es muy buena.",
                                            "answer": "Kualitas produk itu sangat baik.",
                                            "explanation": "La frase utiliza «kualitas»."
                                        },
                                        {
                                            "vocabId": "a2u29_model",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Model baru tersedia di toko.",
                                            "explanation": "La oración contiene «model»."
                                        },
                                        {
                                            "vocabId": "a2u29_garansi",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando garansi.",
                                            "hint": "Puedes tomar como modelo: Produk ini memiliki garansi satu tahun.",
                                            "modelAnswer": "Produk ini memiliki garansi satu tahun.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Productos y disponibilidad",
                                    "objective": "Describe modelos disponibles y consulta si hay existencias.",
                                    "grammar": "Practica expresiones para preguntar por características y disponibilidad.",
                                    "vocabIds": [
                                        "a2u29_stok",
                                        "a2u29_pesanan",
                                        "a2u29_pengiriman"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u29_stok",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «stok»?",
                                            "options": [
                                                "Existencias",
                                                "Envase",
                                                "Sustitución"
                                            ],
                                            "answer": 0,
                                            "explanation": "«stok» significa «Existencias»."
                                        },
                                        {
                                            "vocabId": "a2u29_pesanan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Mi pedido llega hoy.",
                                            "answer": "Pesanan saya tiba hari ini.",
                                            "explanation": "La frase utiliza «pesanan»."
                                        },
                                        {
                                            "vocabId": "a2u29_pengiriman",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pengiriman membutuhkan dua hari.",
                                            "explanation": "La oración contiene «pengiriman»."
                                        },
                                        {
                                            "vocabId": "a2u29_stok",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando stok.",
                                            "hint": "Puedes tomar como modelo: Stok barang itu masih cukup.",
                                            "modelAnswer": "Stok barang itu masih cukup.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Pedidos y entregas",
                                    "objective": "Habla de pedidos, envíos y sustituciones de productos.",
                                    "grammar": "Usa expresiones temporales para explicar cuándo llega un pedido.",
                                    "vocabIds": [
                                        "a2u29_kemasan",
                                        "a2u29_penggantian",
                                        "a2u29_layanan_pelanggan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u29_kemasan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «kemasan»?",
                                            "options": [
                                                "Envase",
                                                "Cliente",
                                                "Queja"
                                            ],
                                            "answer": 0,
                                            "explanation": "«kemasan» significa «Envase»."
                                        },
                                        {
                                            "vocabId": "a2u29_penggantian",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Solicito la sustitución del producto.",
                                            "answer": "Saya meminta penggantian barang.",
                                            "explanation": "La frase utiliza «penggantian»."
                                        },
                                        {
                                            "vocabId": "a2u29_layanan_pelanggan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Layanan pelanggan buka sampai pukul lima.",
                                            "explanation": "La oración contiene «layanan pelanggan»."
                                        },
                                        {
                                            "vocabId": "a2u29_kemasan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando kemasan.",
                                            "hint": "Puedes tomar como modelo: Kemasan produk ini ramah lingkungan.",
                                            "modelAnswer": "Kemasan produk ini ramah lingkungan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u30",
                            "title": "Unidad 30: Arte, cine y espectáculos",
                            "desc": "Describe obras de arte, producciones escénicas, personajes y críticas culturales.",
                            "grammar": "Usa diperankan oleh para indicar quién interpreta un papel y disutradarai oleh para hablar de la dirección de una obra. Practica expresiones para describir argumentos y opiniones.",
                            "vocab": [
                                {
                                    "id": "a2u30_lukisan",
                                    "idn": "lukisan",
                                    "esp": "Pintura",
                                    "ex": "Lukisan itu sangat indah.",
                                    "exEsp": "Esa pintura es muy bonita."
                                },
                                {
                                    "id": "a2u30_pelukis",
                                    "idn": "pelukis",
                                    "esp": "Pintor",
                                    "ex": "Pelukis itu tinggal di Yogyakarta.",
                                    "exEsp": "Ese pintor vive en Yogyakarta."
                                },
                                {
                                    "id": "a2u30_pementasan",
                                    "idn": "pementasan",
                                    "esp": "Puesta en escena",
                                    "ex": "Pementasan dimulai pukul delapan.",
                                    "exEsp": "La puesta en escena empieza a las ocho."
                                },
                                {
                                    "id": "a2u30_aktor",
                                    "idn": "aktor",
                                    "esp": "Actor",
                                    "ex": "Aktor itu memerankan tokoh utama.",
                                    "exEsp": "Ese actor interpreta al personaje principal."
                                },
                                {
                                    "id": "a2u30_sutradara",
                                    "idn": "sutradara",
                                    "esp": "Director",
                                    "ex": "Sutradara menjelaskan ide filmnya.",
                                    "exEsp": "El director explica la idea de su película."
                                },
                                {
                                    "id": "a2u30_penonton",
                                    "idn": "penonton",
                                    "esp": "Espectador",
                                    "ex": "Penonton bertepuk tangan setelah pertunjukan.",
                                    "exEsp": "Los espectadores aplauden después del espectáculo."
                                },
                                {
                                    "id": "a2u30_alur_cerita",
                                    "idn": "alur cerita",
                                    "esp": "Trama",
                                    "ex": "Alur cerita film itu mudah dipahami.",
                                    "exEsp": "La trama de esa película es fácil de entender."
                                },
                                {
                                    "id": "a2u30_tokoh",
                                    "idn": "tokoh",
                                    "esp": "Personaje",
                                    "ex": "Tokoh utama sangat berani.",
                                    "exEsp": "El personaje principal es muy valiente."
                                },
                                {
                                    "id": "a2u30_adegan",
                                    "idn": "adegan",
                                    "esp": "Escena",
                                    "ex": "Adegan terakhir sangat menyentuh.",
                                    "exEsp": "La última escena es muy emotiva."
                                },
                                {
                                    "id": "a2u30_ulasan",
                                    "idn": "ulasan",
                                    "esp": "Crítica",
                                    "ex": "Saya membaca ulasan film itu.",
                                    "exEsp": "Leo la crítica de esa película."
                                },
                                {
                                    "id": "a2u30_karya_seni",
                                    "idn": "karya seni",
                                    "esp": "Obra de arte",
                                    "ex": "Karya seni itu dipamerkan di galeri.",
                                    "exEsp": "Esa obra de arte se expone en la galería."
                                },
                                {
                                    "id": "a2u30_galeri",
                                    "idn": "galeri",
                                    "esp": "Galería",
                                    "ex": "Galeri itu buka setiap hari.",
                                    "exEsp": "Esa galería abre todos los días."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Pintura y artistas",
                                    "objective": "Habla de pinturas, artistas y exposiciones de arte.",
                                    "grammar": "Practica vocabulario para describir obras y sus autores.",
                                    "vocabIds": [
                                        "a2u30_lukisan",
                                        "a2u30_pelukis",
                                        "a2u30_pementasan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u30_lukisan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «lukisan»?",
                                            "options": [
                                                "Pintura",
                                                "Actor",
                                                "Director"
                                            ],
                                            "answer": 0,
                                            "explanation": "«lukisan» significa «Pintura»."
                                        },
                                        {
                                            "vocabId": "a2u30_pelukis",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Ese pintor vive en Yogyakarta.",
                                            "answer": "Pelukis itu tinggal di Yogyakarta.",
                                            "explanation": "La frase utiliza «pelukis»."
                                        },
                                        {
                                            "vocabId": "a2u30_pementasan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pementasan dimulai pukul delapan.",
                                            "explanation": "La oración contiene «pementasan»."
                                        },
                                        {
                                            "vocabId": "a2u30_lukisan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando lukisan.",
                                            "hint": "Puedes tomar como modelo: Lukisan itu sangat indah.",
                                            "modelAnswer": "Lukisan itu sangat indah.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u30_pelukis",
                                            "type": "order",
                                            "prompt": "Ordena: Ese pintor vive en Yogyakarta.",
                                            "words": [
                                                "Yogyakarta",
                                                "di",
                                                "tinggal",
                                                "itu",
                                                "Pelukis"
                                            ],
                                            "correctOrder": [
                                                "Pelukis",
                                                "itu",
                                                "tinggal",
                                                "di",
                                                "Yogyakarta"
                                            ],
                                            "explanation": "La frase completa es: Pelukis itu tinggal di Yogyakarta."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Teatro y cine",
                                    "objective": "Describe producciones escénicas y a las personas que participan en ellas.",
                                    "grammar": "Usa expresiones para hablar de actores y directores.",
                                    "vocabIds": [
                                        "a2u30_aktor",
                                        "a2u30_sutradara",
                                        "a2u30_penonton"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u30_aktor",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «aktor»?",
                                            "options": [
                                                "Actor",
                                                "Trama",
                                                "Personaje"
                                            ],
                                            "answer": 0,
                                            "explanation": "«aktor» significa «Actor»."
                                        },
                                        {
                                            "vocabId": "a2u30_sutradara",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: El director explica la idea de su película.",
                                            "answer": "Sutradara menjelaskan ide filmnya.",
                                            "explanation": "La frase utiliza «sutradara»."
                                        },
                                        {
                                            "vocabId": "a2u30_penonton",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Penonton bertepuk tangan setelah pertunjukan.",
                                            "explanation": "La oración contiene «penonton»."
                                        },
                                        {
                                            "vocabId": "a2u30_aktor",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando aktor.",
                                            "hint": "Puedes tomar como modelo: Aktor itu memerankan tokoh utama.",
                                            "modelAnswer": "Aktor itu memerankan tokoh utama.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Historias y personajes",
                                    "objective": "Explica el argumento, los personajes y las escenas de una historia.",
                                    "grammar": "Practica conectores para resumir una narración.",
                                    "vocabIds": [
                                        "a2u30_alur_cerita",
                                        "a2u30_tokoh",
                                        "a2u30_adegan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u30_alur_cerita",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «alur cerita»?",
                                            "options": [
                                                "Trama",
                                                "Crítica",
                                                "Obra de arte"
                                            ],
                                            "answer": 0,
                                            "explanation": "«alur cerita» significa «Trama»."
                                        },
                                        {
                                            "vocabId": "a2u30_tokoh",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: El personaje principal es muy valiente.",
                                            "answer": "Tokoh utama sangat berani.",
                                            "explanation": "La frase utiliza «tokoh»."
                                        },
                                        {
                                            "vocabId": "a2u30_adegan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Adegan terakhir sangat menyentuh.",
                                            "explanation": "La oración contiene «adegan»."
                                        },
                                        {
                                            "vocabId": "a2u30_alur_cerita",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando alur cerita.",
                                            "hint": "Puedes tomar como modelo: Alur cerita film itu mudah dipahami.",
                                            "modelAnswer": "Alur cerita film itu mudah dipahami.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Opiniones y galerías",
                                    "objective": "Expresa opiniones sobre obras y lugares de exposición.",
                                    "grammar": "Usa menurut saya y ulasan para compartir una valoración.",
                                    "vocabIds": [
                                        "a2u30_ulasan",
                                        "a2u30_karya_seni",
                                        "a2u30_galeri"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u30_ulasan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «ulasan»?",
                                            "options": [
                                                "Crítica",
                                                "Pintura",
                                                "Pintor"
                                            ],
                                            "answer": 0,
                                            "explanation": "«ulasan» significa «Crítica»."
                                        },
                                        {
                                            "vocabId": "a2u30_karya_seni",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esa obra de arte se expone en la galería.",
                                            "answer": "Karya seni itu dipamerkan di galeri.",
                                            "explanation": "La frase utiliza «karya seni»."
                                        },
                                        {
                                            "vocabId": "a2u30_galeri",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Galeri itu buka setiap hari.",
                                            "explanation": "La oración contiene «galeri»."
                                        },
                                        {
                                            "vocabId": "a2u30_ulasan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando ulasan.",
                                            "hint": "Puedes tomar como modelo: Saya membaca ulasan film itu.",
                                            "modelAnswer": "Saya membaca ulasan film itu.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u31",
                            "title": "Unidad 31: Excursiones y actividades al aire libre",
                            "desc": "Habla de caminatas, campamentos, rutas y preparación para actividades en la naturaleza.",
                            "grammar": "Usa menuju para indicar dirección y sebelum para explicar qué se hace antes de una excursión. Practica expresiones para dar consejos y describir condiciones de seguridad.",
                            "vocab": [
                                {
                                    "id": "a2u31_pendakian",
                                    "idn": "pendakian",
                                    "esp": "Excursión de montaña",
                                    "ex": "Pendakian dimulai sebelum matahari terbit.",
                                    "exEsp": "La excursión de montaña empieza antes del amanecer."
                                },
                                {
                                    "id": "a2u31_jalur",
                                    "idn": "jalur",
                                    "esp": "Ruta",
                                    "ex": "Jalur ini cukup menantang.",
                                    "exEsp": "Esta ruta es bastante exigente."
                                },
                                {
                                    "id": "a2u31_puncak",
                                    "idn": "puncak",
                                    "esp": "Cumbre",
                                    "ex": "Kami tiba di puncak pukul sepuluh.",
                                    "exEsp": "Llegamos a la cumbre a las diez."
                                },
                                {
                                    "id": "a2u31_lereng",
                                    "idn": "lereng",
                                    "esp": "Pendiente",
                                    "ex": "Lereng gunung itu sangat curam.",
                                    "exEsp": "La pendiente de esa montaña es muy empinada."
                                },
                                {
                                    "id": "a2u31_perkemahan",
                                    "idn": "perkemahan",
                                    "esp": "Campamento",
                                    "ex": "Perkemahan berada dekat sungai.",
                                    "exEsp": "El campamento está cerca del río."
                                },
                                {
                                    "id": "a2u31_tenda",
                                    "idn": "tenda",
                                    "esp": "Tienda de campaña",
                                    "ex": "Mereka mendirikan tenda di sini.",
                                    "exEsp": "Ellos montan una tienda de campaña aquí."
                                },
                                {
                                    "id": "a2u31_perlengkapan",
                                    "idn": "perlengkapan",
                                    "esp": "Equipo",
                                    "ex": "Perlengkapan pendakian harus lengkap.",
                                    "exEsp": "El equipo de montaña debe estar completo."
                                },
                                {
                                    "id": "a2u31_kompas",
                                    "idn": "kompas",
                                    "esp": "Brújula",
                                    "ex": "Kompas membantu kami menemukan arah.",
                                    "exEsp": "La brújula nos ayuda a encontrar la dirección."
                                },
                                {
                                    "id": "a2u31_persediaan",
                                    "idn": "persediaan",
                                    "esp": "Provisiones",
                                    "ex": "Persediaan air harus cukup.",
                                    "exEsp": "Las provisiones de agua deben ser suficientes."
                                },
                                {
                                    "id": "a2u31_jejak",
                                    "idn": "jejak",
                                    "esp": "Huella",
                                    "ex": "Kami melihat jejak di tanah.",
                                    "exEsp": "Vemos una huella en el suelo."
                                },
                                {
                                    "id": "a2u31_pemandu",
                                    "idn": "pemandu",
                                    "esp": "Guía",
                                    "ex": "Pemandu menjelaskan aturan keselamatan.",
                                    "exEsp": "El guía explica las normas de seguridad."
                                },
                                {
                                    "id": "a2u31_berkemah",
                                    "idn": "berkemah",
                                    "esp": "Acampar",
                                    "ex": "Keluarga itu berkemah di hutan.",
                                    "exEsp": "Esa familia acampa en el bosque."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Rutas y caminatas",
                                    "objective": "Describe rutas de senderismo y objetivos de una excursión.",
                                    "grammar": "Practica vocabulario para explicar distancias y recorridos.",
                                    "vocabIds": [
                                        "a2u31_pendakian",
                                        "a2u31_jalur",
                                        "a2u31_puncak"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u31_pendakian",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pendakian»?",
                                            "options": [
                                                "Excursión de montaña",
                                                "Pendiente",
                                                "Campamento"
                                            ],
                                            "answer": 0,
                                            "explanation": "«pendakian» significa «Excursión de montaña»."
                                        },
                                        {
                                            "vocabId": "a2u31_jalur",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esta ruta es bastante exigente.",
                                            "answer": "Jalur ini cukup menantang.",
                                            "explanation": "La frase utiliza «jalur»."
                                        },
                                        {
                                            "vocabId": "a2u31_puncak",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kami tiba di puncak pukul sepuluh.",
                                            "explanation": "La oración contiene «puncak»."
                                        },
                                        {
                                            "vocabId": "a2u31_pendakian",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pendakian.",
                                            "hint": "Puedes tomar como modelo: Pendakian dimulai sebelum matahari terbit.",
                                            "modelAnswer": "Pendakian dimulai sebelum matahari terbit.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u31_jalur",
                                            "type": "order",
                                            "prompt": "Ordena: Esta ruta es bastante exigente.",
                                            "words": [
                                                "menantang",
                                                "cukup",
                                                "ini",
                                                "Jalur"
                                            ],
                                            "correctOrder": [
                                                "Jalur",
                                                "ini",
                                                "cukup",
                                                "menantang"
                                            ],
                                            "explanation": "La frase completa es: Jalur ini cukup menantang."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Montañas y campamentos",
                                    "objective": "Habla de cumbres, pendientes y lugares para acampar.",
                                    "grammar": "Usa expresiones de ubicación para describir el terreno.",
                                    "vocabIds": [
                                        "a2u31_lereng",
                                        "a2u31_perkemahan",
                                        "a2u31_tenda"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u31_lereng",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «lereng»?",
                                            "options": [
                                                "Pendiente",
                                                "Equipo",
                                                "Brújula"
                                            ],
                                            "answer": 0,
                                            "explanation": "«lereng» significa «Pendiente»."
                                        },
                                        {
                                            "vocabId": "a2u31_perkemahan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: El campamento está cerca del río.",
                                            "answer": "Perkemahan berada dekat sungai.",
                                            "explanation": "La frase utiliza «perkemahan»."
                                        },
                                        {
                                            "vocabId": "a2u31_tenda",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Mereka mendirikan tenda di sini.",
                                            "explanation": "La oración contiene «tenda»."
                                        },
                                        {
                                            "vocabId": "a2u31_lereng",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando lereng.",
                                            "hint": "Puedes tomar como modelo: Lereng gunung itu sangat curam.",
                                            "modelAnswer": "Lereng gunung itu sangat curam.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Equipo y orientación",
                                    "objective": "Explica qué equipo y provisiones hacen falta para una salida.",
                                    "grammar": "Practica instrucciones y recomendaciones de preparación.",
                                    "vocabIds": [
                                        "a2u31_perlengkapan",
                                        "a2u31_kompas",
                                        "a2u31_persediaan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u31_perlengkapan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «perlengkapan»?",
                                            "options": [
                                                "Equipo",
                                                "Huella",
                                                "Guía"
                                            ],
                                            "answer": 0,
                                            "explanation": "«perlengkapan» significa «Equipo»."
                                        },
                                        {
                                            "vocabId": "a2u31_kompas",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La brújula nos ayuda a encontrar la dirección.",
                                            "answer": "Kompas membantu kami menemukan arah.",
                                            "explanation": "La frase utiliza «kompas»."
                                        },
                                        {
                                            "vocabId": "a2u31_persediaan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Persediaan air harus cukup.",
                                            "explanation": "La oración contiene «persediaan»."
                                        },
                                        {
                                            "vocabId": "a2u31_perlengkapan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando perlengkapan.",
                                            "hint": "Puedes tomar como modelo: Perlengkapan pendakian harus lengkap.",
                                            "modelAnswer": "Perlengkapan pendakian harus lengkap.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Guías y seguridad",
                                    "objective": "Habla de guías, huellas y normas para disfrutar de la naturaleza con seguridad.",
                                    "grammar": "Usa imperativos y expresiones de obligación para dar consejos.",
                                    "vocabIds": [
                                        "a2u31_jejak",
                                        "a2u31_pemandu",
                                        "a2u31_berkemah"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u31_jejak",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «jejak»?",
                                            "options": [
                                                "Huella",
                                                "Excursión de montaña",
                                                "Ruta"
                                            ],
                                            "answer": 0,
                                            "explanation": "«jejak» significa «Huella»."
                                        },
                                        {
                                            "vocabId": "a2u31_pemandu",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: El guía explica las normas de seguridad.",
                                            "answer": "Pemandu menjelaskan aturan keselamatan.",
                                            "explanation": "La frase utiliza «pemandu»."
                                        },
                                        {
                                            "vocabId": "a2u31_berkemah",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Keluarga itu berkemah di hutan.",
                                            "explanation": "La oración contiene «berkemah»."
                                        },
                                        {
                                            "vocabId": "a2u31_jejak",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando jejak.",
                                            "hint": "Puedes tomar como modelo: Kami melihat jejak di tanah.",
                                            "modelAnswer": "Kami melihat jejak di tanah.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u32",
                            "title": "Unidad 32: Celebraciones y acontecimientos familiares",
                            "desc": "Habla de bodas, nacimientos, celebraciones y preparativos para acontecimientos importantes.",
                            "grammar": "Usa berlangsung untuk describir cómo se desarrolla un evento y dihadiri oleh para indicar quién asiste. Practica expresiones para felicitar y hablar de recuerdos.",
                            "vocab": [
                                {
                                    "id": "a2u32_pernikahan",
                                    "idn": "pernikahan",
                                    "esp": "Boda",
                                    "ex": "Pernikahan mereka berlangsung sederhana.",
                                    "exEsp": "Su boda se celebra de manera sencilla."
                                },
                                {
                                    "id": "a2u32_kelahiran",
                                    "idn": "kelahiran",
                                    "esp": "Nacimiento",
                                    "ex": "Kelahiran bayi itu dirayakan keluarga.",
                                    "exEsp": "La familia celebra el nacimiento de ese bebé."
                                },
                                {
                                    "id": "a2u32_pertunangan",
                                    "idn": "pertunangan",
                                    "esp": "Compromiso",
                                    "ex": "Pertunangan mereka diadakan bulan lalu.",
                                    "exEsp": "Su compromiso se celebró el mes pasado."
                                },
                                {
                                    "id": "a2u32_peresmian",
                                    "idn": "peresmian",
                                    "esp": "Inauguración",
                                    "ex": "Peresmian gedung baru dihadiri warga.",
                                    "exEsp": "Los residentes asisten a la inauguración del edificio nuevo."
                                },
                                {
                                    "id": "a2u32_peringatan",
                                    "idn": "peringatan",
                                    "esp": "Conmemoración",
                                    "ex": "Peringatan hari itu berlangsung khidmat.",
                                    "exEsp": "La conmemoración de ese día se desarrolla solemnemente."
                                },
                                {
                                    "id": "a2u32_kenangan",
                                    "idn": "kenangan",
                                    "esp": "Recuerdo",
                                    "ex": "Foto itu menyimpan banyak kenangan.",
                                    "exEsp": "Esa foto guarda muchos recuerdos."
                                },
                                {
                                    "id": "a2u32_hadiah",
                                    "idn": "hadiah",
                                    "esp": "Regalo",
                                    "ex": "Saya memberi hadiah kepada teman.",
                                    "exEsp": "Le doy un regalo a un amigo."
                                },
                                {
                                    "id": "a2u32_ucapan_selamat",
                                    "idn": "ucapan selamat",
                                    "esp": "Felicitación",
                                    "ex": "Kami mengirim ucapan selamat kepada pasangan itu.",
                                    "exEsp": "Enviamos nuestras felicitaciones a esa pareja."
                                },
                                {
                                    "id": "a2u32_kehadiran",
                                    "idn": "kehadiran",
                                    "esp": "Asistencia",
                                    "ex": "Kehadiran semua tamu sangat penting.",
                                    "exEsp": "La asistencia de todos los invitados es muy importante."
                                },
                                {
                                    "id": "a2u32_persiapan",
                                    "idn": "persiapan",
                                    "esp": "Preparativos",
                                    "ex": "Persiapan acara dimulai pagi ini.",
                                    "exEsp": "Los preparativos del evento empiezan esta mañana."
                                },
                                {
                                    "id": "a2u32_tamu_undangan",
                                    "idn": "tamu undangan",
                                    "esp": "Invitado",
                                    "ex": "Tamu undangan mulai datang.",
                                    "exEsp": "Los invitados empiezan a llegar."
                                },
                                {
                                    "id": "a2u32_acara_keluarga",
                                    "idn": "acara keluarga",
                                    "esp": "Evento familiar",
                                    "ex": "Acara keluarga berlangsung di rumah.",
                                    "exEsp": "El evento familiar se celebra en casa."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Bodas y nuevos comienzos",
                                    "objective": "Describe bodas, nacimientos y compromisos familiares.",
                                    "grammar": "Practica vocabulario para hablar de acontecimientos importantes.",
                                    "vocabIds": [
                                        "a2u32_pernikahan",
                                        "a2u32_kelahiran",
                                        "a2u32_pertunangan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u32_pernikahan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pernikahan»?",
                                            "options": [
                                                "Boda",
                                                "Inauguración",
                                                "Conmemoración"
                                            ],
                                            "answer": 0,
                                            "explanation": "«pernikahan» significa «Boda»."
                                        },
                                        {
                                            "vocabId": "a2u32_kelahiran",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La familia celebra el nacimiento de ese bebé.",
                                            "answer": "Kelahiran bayi itu dirayakan keluarga.",
                                            "explanation": "La frase utiliza «kelahiran»."
                                        },
                                        {
                                            "vocabId": "a2u32_pertunangan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pertunangan mereka diadakan bulan lalu.",
                                            "explanation": "La oración contiene «pertunangan»."
                                        },
                                        {
                                            "vocabId": "a2u32_pernikahan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pernikahan.",
                                            "hint": "Puedes tomar como modelo: Pernikahan mereka berlangsung sederhana.",
                                            "modelAnswer": "Pernikahan mereka berlangsung sederhana.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u32_kelahiran",
                                            "type": "order",
                                            "prompt": "Ordena: La familia celebra el nacimiento de ese bebé.",
                                            "words": [
                                                "keluarga",
                                                "dirayakan",
                                                "itu",
                                                "bayi",
                                                "Kelahiran"
                                            ],
                                            "correctOrder": [
                                                "Kelahiran",
                                                "bayi",
                                                "itu",
                                                "dirayakan",
                                                "keluarga"
                                            ],
                                            "explanation": "La frase completa es: Kelahiran bayi itu dirayakan keluarga."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Ceremonias y conmemoraciones",
                                    "objective": "Habla de inauguraciones y actos conmemorativos.",
                                    "grammar": "Usa berlangsung para describir cómo se desarrolla una ceremonia.",
                                    "vocabIds": [
                                        "a2u32_peresmian",
                                        "a2u32_peringatan",
                                        "a2u32_kenangan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u32_peresmian",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «peresmian»?",
                                            "options": [
                                                "Inauguración",
                                                "Regalo",
                                                "Felicitación"
                                            ],
                                            "answer": 0,
                                            "explanation": "«peresmian» significa «Inauguración»."
                                        },
                                        {
                                            "vocabId": "a2u32_peringatan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La conmemoración de ese día se desarrolla solemnemente.",
                                            "answer": "Peringatan hari itu berlangsung khidmat.",
                                            "explanation": "La frase utiliza «peringatan»."
                                        },
                                        {
                                            "vocabId": "a2u32_kenangan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Foto itu menyimpan banyak kenangan.",
                                            "explanation": "La oración contiene «kenangan»."
                                        },
                                        {
                                            "vocabId": "a2u32_peresmian",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando peresmian.",
                                            "hint": "Puedes tomar como modelo: Peresmian gedung baru dihadiri warga.",
                                            "modelAnswer": "Peresmian gedung baru dihadiri warga.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Recuerdos y felicitaciones",
                                    "objective": "Comparte recuerdos y expresa felicitaciones en ocasiones especiales.",
                                    "grammar": "Practica expresiones para dar buenos deseos y entregar regalos.",
                                    "vocabIds": [
                                        "a2u32_hadiah",
                                        "a2u32_ucapan_selamat",
                                        "a2u32_kehadiran"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u32_hadiah",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «hadiah»?",
                                            "options": [
                                                "Regalo",
                                                "Preparativos",
                                                "Invitado"
                                            ],
                                            "answer": 0,
                                            "explanation": "«hadiah» significa «Regalo»."
                                        },
                                        {
                                            "vocabId": "a2u32_ucapan_selamat",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Enviamos nuestras felicitaciones a esa pareja.",
                                            "answer": "Kami mengirim ucapan selamat kepada pasangan itu.",
                                            "explanation": "La frase utiliza «ucapan selamat»."
                                        },
                                        {
                                            "vocabId": "a2u32_kehadiran",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kehadiran semua tamu sangat penting.",
                                            "explanation": "La oración contiene «kehadiran»."
                                        },
                                        {
                                            "vocabId": "a2u32_hadiah",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando hadiah.",
                                            "hint": "Puedes tomar como modelo: Saya memberi hadiah kepada teman.",
                                            "modelAnswer": "Saya memberi hadiah kepada teman.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Invitados y preparativos",
                                    "objective": "Describe la asistencia de invitados y la organización de reuniones familiares.",
                                    "grammar": "Usa expresiones para hablar de preparativos y participantes.",
                                    "vocabIds": [
                                        "a2u32_persiapan",
                                        "a2u32_tamu_undangan",
                                        "a2u32_acara_keluarga"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u32_persiapan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «persiapan»?",
                                            "options": [
                                                "Preparativos",
                                                "Boda",
                                                "Nacimiento"
                                            ],
                                            "answer": 0,
                                            "explanation": "«persiapan» significa «Preparativos»."
                                        },
                                        {
                                            "vocabId": "a2u32_tamu_undangan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Los invitados empiezan a llegar.",
                                            "answer": "Tamu undangan mulai datang.",
                                            "explanation": "La frase utiliza «tamu undangan»."
                                        },
                                        {
                                            "vocabId": "a2u32_acara_keluarga",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Acara keluarga berlangsung di rumah.",
                                            "explanation": "La oración contiene «acara keluarga»."
                                        },
                                        {
                                            "vocabId": "a2u32_persiapan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando persiapan.",
                                            "hint": "Puedes tomar como modelo: Persiapan acara dimulai pagi ini.",
                                            "modelAnswer": "Persiapan acara dimulai pagi ini.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        }
,
                    {
                            "id": "a2_u33",
                            "title": "Unidad 33: Regiones y geografía",
                            "desc": "Describe regiones, límites geográficos, paisajes y características de la población.",
                            "grammar": "Usa terletak di para indicar ubicación y daerah para hablar de zonas. Practica expresiones para describir paisajes y límites entre regiones.",
                            "vocab": [
                                {
                                    "id": "a2u33_provinsi",
                                    "idn": "provinsi",
                                    "esp": "Provincia",
                                    "ex": "Provinsi itu memiliki banyak pulau.",
                                    "exEsp": "Esa provincia tiene muchas islas."
                                },
                                {
                                    "id": "a2u33_kabupaten",
                                    "idn": "kabupaten",
                                    "esp": "Regencia",
                                    "ex": "Kabupaten kami terletak di utara.",
                                    "exEsp": "Nuestra regencia está situada al norte."
                                },
                                {
                                    "id": "a2u33_perbatasan",
                                    "idn": "perbatasan",
                                    "esp": "Frontera",
                                    "ex": "Desa itu dekat perbatasan.",
                                    "exEsp": "Ese pueblo está cerca de la frontera."
                                },
                                {
                                    "id": "a2u33_penduduk",
                                    "idn": "penduduk",
                                    "esp": "Habitantes",
                                    "ex": "Penduduk wilayah ini ramah.",
                                    "exEsp": "Los habitantes de esta región son amables."
                                },
                                {
                                    "id": "a2u33_wilayah",
                                    "idn": "wilayah",
                                    "esp": "Región",
                                    "ex": "Wilayah pesisir itu cukup luas.",
                                    "exEsp": "Esa región costera es bastante extensa."
                                },
                                {
                                    "id": "a2u33_pesisir",
                                    "idn": "pesisir",
                                    "esp": "Costa",
                                    "ex": "Banyak nelayan tinggal di daerah pesisir.",
                                    "exEsp": "Muchos pescadores viven en la zona costera."
                                },
                                {
                                    "id": "a2u33_pedalaman",
                                    "idn": "pedalaman",
                                    "esp": "Interior",
                                    "ex": "Desa pedalaman sulit dijangkau.",
                                    "exEsp": "Es difícil llegar a ese pueblo del interior."
                                },
                                {
                                    "id": "a2u33_dataran",
                                    "idn": "dataran",
                                    "esp": "Llanura",
                                    "ex": "Dataran itu cocok untuk pertanian.",
                                    "exEsp": "Esa llanura es adecuada para la agricultura."
                                },
                                {
                                    "id": "a2u33_pegunungan",
                                    "idn": "pegunungan",
                                    "esp": "Cordillera",
                                    "ex": "Pegunungan itu tertutup kabut.",
                                    "exEsp": "Esa cordillera está cubierta de niebla."
                                },
                                {
                                    "id": "a2u33_pulau",
                                    "idn": "pulau",
                                    "esp": "Isla",
                                    "ex": "Pulau kecil itu indah.",
                                    "exEsp": "Esa isla pequeña es hermosa."
                                },
                                {
                                    "id": "a2u33_selat",
                                    "idn": "selat",
                                    "esp": "Estrecho",
                                    "ex": "Kapal melewati selat itu.",
                                    "exEsp": "El barco atraviesa ese estrecho."
                                },
                                {
                                    "id": "a2u33_teluk",
                                    "idn": "teluk",
                                    "esp": "Bahía",
                                    "ex": "Perahu berlabuh di teluk.",
                                    "exEsp": "La embarcación está anclada en la bahía."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Provincias y distritos",
                                    "objective": "Describe la organización territorial y las características de distintas regiones.",
                                    "grammar": "Practica vocabulario para ubicar provincias, distritos y fronteras.",
                                    "vocabIds": [
                                        "a2u33_provinsi",
                                        "a2u33_kabupaten",
                                        "a2u33_perbatasan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u33_provinsi",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «provinsi»?",
                                            "options": [
                                                "Provincia",
                                                "Habitantes",
                                                "Región"
                                            ],
                                            "answer": 0,
                                            "explanation": "«provinsi» significa «Provincia»."
                                        },
                                        {
                                            "vocabId": "a2u33_kabupaten",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Nuestra regencia está situada al norte.",
                                            "answer": "Kabupaten kami terletak di utara.",
                                            "explanation": "La frase utiliza «kabupaten»."
                                        },
                                        {
                                            "vocabId": "a2u33_perbatasan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Desa itu dekat perbatasan.",
                                            "explanation": "La oración contiene «perbatasan»."
                                        },
                                        {
                                            "vocabId": "a2u33_provinsi",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando provinsi.",
                                            "hint": "Puedes tomar como modelo: Provinsi itu memiliki banyak pulau.",
                                            "modelAnswer": "Provinsi itu memiliki banyak pulau.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u33_kabupaten",
                                            "type": "order",
                                            "prompt": "Ordena: Nuestra regencia está situada al norte.",
                                            "words": [
                                                "utara",
                                                "di",
                                                "terletak",
                                                "kami",
                                                "Kabupaten"
                                            ],
                                            "correctOrder": [
                                                "Kabupaten",
                                                "kami",
                                                "terletak",
                                                "di",
                                                "utara"
                                            ],
                                            "explanation": "La frase completa es: Kabupaten kami terletak di utara."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Población y territorio",
                                    "objective": "Habla de los habitantes y de las características de una región.",
                                    "grammar": "Usa memiliki para describir características de un territorio.",
                                    "vocabIds": [
                                        "a2u33_penduduk",
                                        "a2u33_wilayah",
                                        "a2u33_pesisir"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u33_penduduk",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «penduduk»?",
                                            "options": [
                                                "Habitantes",
                                                "Interior",
                                                "Llanura"
                                            ],
                                            "answer": 0,
                                            "explanation": "«penduduk» significa «Habitantes»."
                                        },
                                        {
                                            "vocabId": "a2u33_wilayah",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esa región costera es bastante extensa.",
                                            "answer": "Wilayah pesisir itu cukup luas.",
                                            "explanation": "La frase utiliza «wilayah»."
                                        },
                                        {
                                            "vocabId": "a2u33_pesisir",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Banyak nelayan tinggal di daerah pesisir.",
                                            "explanation": "La oración contiene «pesisir»."
                                        },
                                        {
                                            "vocabId": "a2u33_penduduk",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando penduduk.",
                                            "hint": "Puedes tomar como modelo: Penduduk wilayah ini ramah.",
                                            "modelAnswer": "Penduduk wilayah ini ramah.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Paisajes y zonas naturales",
                                    "objective": "Describe zonas costeras, interiores, llanuras y montañas.",
                                    "grammar": "Practica expresiones para comparar paisajes y ubicaciones.",
                                    "vocabIds": [
                                        "a2u33_pedalaman",
                                        "a2u33_dataran",
                                        "a2u33_pegunungan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u33_pedalaman",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pedalaman»?",
                                            "options": [
                                                "Interior",
                                                "Isla",
                                                "Estrecho"
                                            ],
                                            "answer": 0,
                                            "explanation": "«pedalaman» significa «Interior»."
                                        },
                                        {
                                            "vocabId": "a2u33_dataran",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esa llanura es adecuada para la agricultura.",
                                            "answer": "Dataran itu cocok untuk pertanian.",
                                            "explanation": "La frase utiliza «dataran»."
                                        },
                                        {
                                            "vocabId": "a2u33_pegunungan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pegunungan itu tertutup kabut.",
                                            "explanation": "La oración contiene «pegunungan»."
                                        },
                                        {
                                            "vocabId": "a2u33_pedalaman",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pedalaman.",
                                            "hint": "Puedes tomar como modelo: Desa pedalaman sulit dijangkau.",
                                            "modelAnswer": "Desa pedalaman sulit dijangkau.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Islas y vías marítimas",
                                    "objective": "Habla de islas, estrechos y bahías y de cómo se desplazan las embarcaciones.",
                                    "grammar": "Usa melewati para describir el paso por una ruta.",
                                    "vocabIds": [
                                        "a2u33_pulau",
                                        "a2u33_selat",
                                        "a2u33_teluk"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u33_pulau",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pulau»?",
                                            "options": [
                                                "Isla",
                                                "Provincia",
                                                "Regencia"
                                            ],
                                            "answer": 0,
                                            "explanation": "«pulau» significa «Isla»."
                                        },
                                        {
                                            "vocabId": "a2u33_selat",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: El barco atraviesa ese estrecho.",
                                            "answer": "Kapal melewati selat itu.",
                                            "explanation": "La frase utiliza «selat»."
                                        },
                                        {
                                            "vocabId": "a2u33_teluk",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Perahu berlabuh di teluk.",
                                            "explanation": "La oración contiene «teluk»."
                                        },
                                        {
                                            "vocabId": "a2u33_pulau",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pulau.",
                                            "hint": "Puedes tomar como modelo: Pulau kecil itu indah.",
                                            "modelAnswer": "Pulau kecil itu indah.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u34",
                            "title": "Unidad 34: Cortesía y comunicación social",
                            "desc": "Utiliza expresiones de cortesía y comprende las normas de comunicación en situaciones formales e informales.",
                            "grammar": "Usa permintaan maaf y ucapan terima kasih para disculparte y agradecer. Practica expresiones para respetar turnos de palabra y adaptar el lenguaje a situaciones formales o informales.",
                            "vocab": [
                                {
                                    "id": "a2u34_sopan_santun",
                                    "idn": "sopan santun",
                                    "esp": "Cortesía",
                                    "ex": "Sopan santun penting dalam percakapan.",
                                    "exEsp": "La cortesía es importante en una conversación."
                                },
                                {
                                    "id": "a2u34_sapaan",
                                    "idn": "sapaan",
                                    "esp": "Saludo",
                                    "ex": "Sapaan itu terdengar ramah.",
                                    "exEsp": "Ese saludo suena amable."
                                },
                                {
                                    "id": "a2u34_permintaan_maaf",
                                    "idn": "permintaan maaf",
                                    "esp": "Disculpa",
                                    "ex": "Saya menyampaikan permintaan maaf.",
                                    "exEsp": "Presento mis disculpas."
                                },
                                {
                                    "id": "a2u34_ucapan_terima_kasih",
                                    "idn": "ucapan terima kasih",
                                    "esp": "Agradecimiento",
                                    "ex": "Dia mengirim ucapan terima kasih.",
                                    "exEsp": "Él envía un agradecimiento."
                                },
                                {
                                    "id": "a2u34_kebiasaan",
                                    "idn": "kebiasaan",
                                    "esp": "Costumbre",
                                    "ex": "Kebiasaan itu berbeda di setiap daerah.",
                                    "exEsp": "Esa costumbre es diferente en cada región."
                                },
                                {
                                    "id": "a2u34_perilaku",
                                    "idn": "perilaku",
                                    "esp": "Comportamiento",
                                    "ex": "Perilaku sopan dihargai semua orang.",
                                    "exEsp": "El comportamiento cortés es apreciado por todos."
                                },
                                {
                                    "id": "a2u34_formal",
                                    "idn": "formal",
                                    "esp": "Formal",
                                    "ex": "Pertemuan itu bersifat formal.",
                                    "exEsp": "Esa reunión es formal."
                                },
                                {
                                    "id": "a2u34_informal",
                                    "idn": "informal",
                                    "esp": "Informal",
                                    "ex": "Percakapan kami berlangsung informal.",
                                    "exEsp": "Nuestra conversación transcurre de manera informal."
                                },
                                {
                                    "id": "a2u34_menghormati",
                                    "idn": "menghormati",
                                    "esp": "Respetar",
                                    "ex": "Kita harus menghormati orang lain.",
                                    "exEsp": "Debemos respetar a los demás."
                                },
                                {
                                    "id": "a2u34_menyela",
                                    "idn": "menyela",
                                    "esp": "Interrumpir",
                                    "ex": "Jangan menyela pembicaraan orang lain.",
                                    "exEsp": "No interrumpas la conversación de otra persona."
                                },
                                {
                                    "id": "a2u34_giliran_bicara",
                                    "idn": "giliran bicara",
                                    "esp": "Turno de palabra",
                                    "ex": "Setiap peserta mendapat giliran bicara.",
                                    "exEsp": "Cada participante recibe un turno de palabra."
                                },
                                {
                                    "id": "a2u34_kontak_mata",
                                    "idn": "kontak mata",
                                    "esp": "Contacto visual",
                                    "ex": "Kontak mata menunjukkan perhatian.",
                                    "exEsp": "El contacto visual demuestra atención."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Cortesía y saludos",
                                    "objective": "Describe normas de cortesía y distintas formas de saludar.",
                                    "grammar": "Practica expresiones para iniciar una conversación con respeto.",
                                    "vocabIds": [
                                        "a2u34_sopan_santun",
                                        "a2u34_sapaan",
                                        "a2u34_permintaan_maaf"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u34_sopan_santun",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «sopan santun»?",
                                            "options": [
                                                "Cortesía",
                                                "Agradecimiento",
                                                "Costumbre"
                                            ],
                                            "answer": 0,
                                            "explanation": "«sopan santun» significa «Cortesía»."
                                        },
                                        {
                                            "vocabId": "a2u34_sapaan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Ese saludo suena amable.",
                                            "answer": "Sapaan itu terdengar ramah.",
                                            "explanation": "La frase utiliza «sapaan»."
                                        },
                                        {
                                            "vocabId": "a2u34_permintaan_maaf",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya menyampaikan permintaan maaf.",
                                            "explanation": "La oración contiene «permintaan maaf»."
                                        },
                                        {
                                            "vocabId": "a2u34_sopan_santun",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando sopan santun.",
                                            "hint": "Puedes tomar como modelo: Sopan santun penting dalam percakapan.",
                                            "modelAnswer": "Sopan santun penting dalam percakapan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u34_sapaan",
                                            "type": "order",
                                            "prompt": "Ordena: Ese saludo suena amable.",
                                            "words": [
                                                "ramah",
                                                "terdengar",
                                                "itu",
                                                "Sapaan"
                                            ],
                                            "correctOrder": [
                                                "Sapaan",
                                                "itu",
                                                "terdengar",
                                                "ramah"
                                            ],
                                            "explanation": "La frase completa es: Sapaan itu terdengar ramah."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Disculpas y agradecimientos",
                                    "objective": "Pide disculpas y expresa agradecimiento en situaciones cotidianas.",
                                    "grammar": "Usa menyampaikan para presentar una disculpa o un agradecimiento.",
                                    "vocabIds": [
                                        "a2u34_ucapan_terima_kasih",
                                        "a2u34_kebiasaan",
                                        "a2u34_perilaku"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u34_ucapan_terima_kasih",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «ucapan terima kasih»?",
                                            "options": [
                                                "Agradecimiento",
                                                "Formal",
                                                "Informal"
                                            ],
                                            "answer": 0,
                                            "explanation": "«ucapan terima kasih» significa «Agradecimiento»."
                                        },
                                        {
                                            "vocabId": "a2u34_kebiasaan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esa costumbre es diferente en cada región.",
                                            "answer": "Kebiasaan itu berbeda di setiap daerah.",
                                            "explanation": "La frase utiliza «kebiasaan»."
                                        },
                                        {
                                            "vocabId": "a2u34_perilaku",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Perilaku sopan dihargai semua orang.",
                                            "explanation": "La oración contiene «perilaku»."
                                        },
                                        {
                                            "vocabId": "a2u34_ucapan_terima_kasih",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando ucapan terima kasih.",
                                            "hint": "Puedes tomar como modelo: Dia mengirim ucapan terima kasih.",
                                            "modelAnswer": "Dia mengirim ucapan terima kasih.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Costumbres y registros",
                                    "objective": "Distingue comportamientos y estilos de comunicación formales e informales.",
                                    "grammar": "Practica vocabulario para describir registros y costumbres sociales.",
                                    "vocabIds": [
                                        "a2u34_formal",
                                        "a2u34_informal",
                                        "a2u34_menghormati"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u34_formal",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «formal»?",
                                            "options": [
                                                "Formal",
                                                "Interrumpir",
                                                "Turno de palabra"
                                            ],
                                            "answer": 0,
                                            "explanation": "«formal» significa «Formal»."
                                        },
                                        {
                                            "vocabId": "a2u34_informal",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Nuestra conversación transcurre de manera informal.",
                                            "answer": "Percakapan kami berlangsung informal.",
                                            "explanation": "La frase utiliza «informal»."
                                        },
                                        {
                                            "vocabId": "a2u34_menghormati",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kita harus menghormati orang lain.",
                                            "explanation": "La oración contiene «menghormati»."
                                        },
                                        {
                                            "vocabId": "a2u34_formal",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando formal.",
                                            "hint": "Puedes tomar como modelo: Pertemuan itu bersifat formal.",
                                            "modelAnswer": "Pertemuan itu bersifat formal.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Conversación respetuosa",
                                    "objective": "Habla de turnos de palabra, interrupciones y atención al interlocutor.",
                                    "grammar": "Usa jangan para dar consejos sobre cómo conversar con respeto.",
                                    "vocabIds": [
                                        "a2u34_menyela",
                                        "a2u34_giliran_bicara",
                                        "a2u34_kontak_mata"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u34_menyela",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «menyela»?",
                                            "options": [
                                                "Interrumpir",
                                                "Cortesía",
                                                "Saludo"
                                            ],
                                            "answer": 0,
                                            "explanation": "«menyela» significa «Interrumpir»."
                                        },
                                        {
                                            "vocabId": "a2u34_giliran_bicara",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Cada participante recibe un turno de palabra.",
                                            "answer": "Setiap peserta mendapat giliran bicara.",
                                            "explanation": "La frase utiliza «giliran bicara»."
                                        },
                                        {
                                            "vocabId": "a2u34_kontak_mata",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kontak mata menunjukkan perhatian.",
                                            "explanation": "La oración contiene «kontak mata»."
                                        },
                                        {
                                            "vocabId": "a2u34_menyela",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando menyela.",
                                            "hint": "Puedes tomar como modelo: Jangan menyela pembicaraan orang lain.",
                                            "modelAnswer": "Jangan menyela pembicaraan orang lain.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u35",
                            "title": "Unidad 35: Presupuesto y finanzas personales",
                            "desc": "Habla de presupuestos, ingresos, gastos, ahorros y decisiones financieras cotidianas.",
                            "grammar": "Usa membuat anggaran para hablar de elaborar un presupuesto y membayar cicilan para describir pagos periódicos. Practica expresiones para distinguir necesidades y deseos.",
                            "vocab": [
                                {
                                    "id": "a2u35_anggaran",
                                    "idn": "anggaran",
                                    "esp": "Presupuesto",
                                    "ex": "Kami membuat anggaran bulanan.",
                                    "exEsp": "Hacemos un presupuesto mensual."
                                },
                                {
                                    "id": "a2u35_pengeluaran",
                                    "idn": "pengeluaran",
                                    "esp": "Gastos",
                                    "ex": "Pengeluaran rumah tangga meningkat.",
                                    "exEsp": "Los gastos del hogar aumentan."
                                },
                                {
                                    "id": "a2u35_pemasukan",
                                    "idn": "pemasukan",
                                    "esp": "Ingresos",
                                    "ex": "Pemasukan saya cukup untuk kebutuhan.",
                                    "exEsp": "Mis ingresos son suficientes para las necesidades."
                                },
                                {
                                    "id": "a2u35_menabung",
                                    "idn": "menabung",
                                    "esp": "Ahorrar",
                                    "ex": "Saya menabung untuk masa depan.",
                                    "exEsp": "Ahorro para el futuro."
                                },
                                {
                                    "id": "a2u35_investasi",
                                    "idn": "investasi",
                                    "esp": "Inversión",
                                    "ex": "Investasi itu memiliki risiko.",
                                    "exEsp": "Esa inversión tiene riesgos."
                                },
                                {
                                    "id": "a2u35_cicilan",
                                    "idn": "cicilan",
                                    "esp": "Cuota",
                                    "ex": "Saya membayar cicilan setiap bulan.",
                                    "exEsp": "Pago una cuota cada mes."
                                },
                                {
                                    "id": "a2u35_prioritas",
                                    "idn": "prioritas",
                                    "esp": "Prioridad",
                                    "ex": "Pendidikan adalah prioritas keluarga.",
                                    "exEsp": "La educación es una prioridad para la familia."
                                },
                                {
                                    "id": "a2u35_kebutuhan",
                                    "idn": "kebutuhan",
                                    "esp": "Necesidad",
                                    "ex": "Kebutuhan dasar harus dipenuhi.",
                                    "exEsp": "Las necesidades básicas deben satisfacerse."
                                },
                                {
                                    "id": "a2u35_keinginan",
                                    "idn": "keinginan",
                                    "esp": "Deseo",
                                    "ex": "Keinginan tidak selalu sama dengan kebutuhan.",
                                    "exEsp": "Los deseos no siempre son iguales a las necesidades."
                                },
                                {
                                    "id": "a2u35_biaya_tak_terduga",
                                    "idn": "biaya tak terduga",
                                    "esp": "Gasto imprevisto",
                                    "ex": "Kami menyiapkan uang untuk biaya tak terduga.",
                                    "exEsp": "Preparamos dinero para gastos imprevistos."
                                },
                                {
                                    "id": "a2u35_dana_darurat",
                                    "idn": "dana darurat",
                                    "esp": "Fondo de emergencia",
                                    "ex": "Dana darurat membantu saat krisis.",
                                    "exEsp": "Un fondo de emergencia ayuda durante una crisis."
                                },
                                {
                                    "id": "a2u35_pemborosan",
                                    "idn": "pemborosan",
                                    "esp": "Gasto innecesario",
                                    "ex": "Pemborosan dapat mengganggu anggaran.",
                                    "exEsp": "El gasto innecesario puede afectar al presupuesto."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Presupuestos y gastos",
                                    "objective": "Describe cómo se organiza un presupuesto y se controlan los gastos.",
                                    "grammar": "Practica vocabulario para hablar de ingresos y gastos mensuales.",
                                    "vocabIds": [
                                        "a2u35_anggaran",
                                        "a2u35_pengeluaran",
                                        "a2u35_pemasukan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u35_anggaran",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «anggaran»?",
                                            "options": [
                                                "Presupuesto",
                                                "Ahorrar",
                                                "Inversión"
                                            ],
                                            "answer": 0,
                                            "explanation": "«anggaran» significa «Presupuesto»."
                                        },
                                        {
                                            "vocabId": "a2u35_pengeluaran",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Los gastos del hogar aumentan.",
                                            "answer": "Pengeluaran rumah tangga meningkat.",
                                            "explanation": "La frase utiliza «pengeluaran»."
                                        },
                                        {
                                            "vocabId": "a2u35_pemasukan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pemasukan saya cukup untuk kebutuhan.",
                                            "explanation": "La oración contiene «pemasukan»."
                                        },
                                        {
                                            "vocabId": "a2u35_anggaran",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando anggaran.",
                                            "hint": "Puedes tomar como modelo: Kami membuat anggaran bulanan.",
                                            "modelAnswer": "Kami membuat anggaran bulanan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u35_pengeluaran",
                                            "type": "order",
                                            "prompt": "Ordena: Los gastos del hogar aumentan.",
                                            "words": [
                                                "meningkat",
                                                "tangga",
                                                "rumah",
                                                "Pengeluaran"
                                            ],
                                            "correctOrder": [
                                                "Pengeluaran",
                                                "rumah",
                                                "tangga",
                                                "meningkat"
                                            ],
                                            "explanation": "La frase completa es: Pengeluaran rumah tangga meningkat."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Ahorro e inversión",
                                    "objective": "Habla de ahorrar dinero y de riesgos sencillos de inversión.",
                                    "grammar": "Usa untuk para explicar el propósito de un ahorro.",
                                    "vocabIds": [
                                        "a2u35_menabung",
                                        "a2u35_investasi",
                                        "a2u35_cicilan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u35_menabung",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «menabung»?",
                                            "options": [
                                                "Ahorrar",
                                                "Prioridad",
                                                "Necesidad"
                                            ],
                                            "answer": 0,
                                            "explanation": "«menabung» significa «Ahorrar»."
                                        },
                                        {
                                            "vocabId": "a2u35_investasi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esa inversión tiene riesgos.",
                                            "answer": "Investasi itu memiliki risiko.",
                                            "explanation": "La frase utiliza «investasi»."
                                        },
                                        {
                                            "vocabId": "a2u35_cicilan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya membayar cicilan setiap bulan.",
                                            "explanation": "La oración contiene «cicilan»."
                                        },
                                        {
                                            "vocabId": "a2u35_menabung",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando menabung.",
                                            "hint": "Puedes tomar como modelo: Saya menabung untuk masa depan.",
                                            "modelAnswer": "Saya menabung untuk masa depan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Prioridades y necesidades",
                                    "objective": "Distingue necesidades básicas y deseos personales.",
                                    "grammar": "Practica expresiones para establecer prioridades.",
                                    "vocabIds": [
                                        "a2u35_prioritas",
                                        "a2u35_kebutuhan",
                                        "a2u35_keinginan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u35_prioritas",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «prioritas»?",
                                            "options": [
                                                "Prioridad",
                                                "Gasto imprevisto",
                                                "Fondo de emergencia"
                                            ],
                                            "answer": 0,
                                            "explanation": "«prioritas» significa «Prioridad»."
                                        },
                                        {
                                            "vocabId": "a2u35_kebutuhan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Las necesidades básicas deben satisfacerse.",
                                            "answer": "Kebutuhan dasar harus dipenuhi.",
                                            "explanation": "La frase utiliza «kebutuhan»."
                                        },
                                        {
                                            "vocabId": "a2u35_keinginan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Keinginan tidak selalu sama dengan kebutuhan.",
                                            "explanation": "La oración contiene «keinginan»."
                                        },
                                        {
                                            "vocabId": "a2u35_prioritas",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando prioritas.",
                                            "hint": "Puedes tomar como modelo: Pendidikan adalah prioritas keluarga.",
                                            "modelAnswer": "Pendidikan adalah prioritas keluarga.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Emergencias y consumo responsable",
                                    "objective": "Habla de gastos inesperados y de cómo evitar el gasto innecesario.",
                                    "grammar": "Usa menyiapkan para describir cómo prepararse para un imprevisto.",
                                    "vocabIds": [
                                        "a2u35_biaya_tak_terduga",
                                        "a2u35_dana_darurat",
                                        "a2u35_pemborosan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u35_biaya_tak_terduga",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «biaya tak terduga»?",
                                            "options": [
                                                "Gasto imprevisto",
                                                "Presupuesto",
                                                "Gastos"
                                            ],
                                            "answer": 0,
                                            "explanation": "«biaya tak terduga» significa «Gasto imprevisto»."
                                        },
                                        {
                                            "vocabId": "a2u35_dana_darurat",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Un fondo de emergencia ayuda durante una crisis.",
                                            "answer": "Dana darurat membantu saat krisis.",
                                            "explanation": "La frase utiliza «dana darurat»."
                                        },
                                        {
                                            "vocabId": "a2u35_pemborosan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pemborosan dapat mengganggu anggaran.",
                                            "explanation": "La oración contiene «pemborosan»."
                                        },
                                        {
                                            "vocabId": "a2u35_biaya_tak_terduga",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando biaya tak terduga.",
                                            "hint": "Puedes tomar como modelo: Kami menyiapkan uang untuk biaya tak terduga.",
                                            "modelAnswer": "Kami menyiapkan uang untuk biaya tak terduga.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u36",
                            "title": "Unidad 36: Evaluar opciones y tomar decisiones",
                            "desc": "Compara alternativas, valora riesgos y explica acuerdos y próximos pasos.",
                            "grammar": "Usa mempertimbangkan para explicar que valoras distintas opciones y mencapai kesepakatan para hablar de llegar a un acuerdo. Practica expresiones de causa, resultado y planificación.",
                            "vocab": [
                                {
                                    "id": "a2u36_pertimbangan",
                                    "idn": "pertimbangan",
                                    "esp": "Consideración",
                                    "ex": "Ada beberapa pertimbangan penting.",
                                    "exEsp": "Hay varias consideraciones importantes."
                                },
                                {
                                    "id": "a2u36_risiko",
                                    "idn": "risiko",
                                    "esp": "Riesgo",
                                    "ex": "Kita harus memahami risiko itu.",
                                    "exEsp": "Debemos comprender ese riesgo."
                                },
                                {
                                    "id": "a2u36_keuntungan",
                                    "idn": "keuntungan",
                                    "esp": "Ventaja",
                                    "ex": "Keuntungan pilihan ini cukup besar.",
                                    "exEsp": "La ventaja de esta opción es bastante grande."
                                },
                                {
                                    "id": "a2u36_kerugian",
                                    "idn": "kerugian",
                                    "esp": "Pérdida",
                                    "ex": "Kerugian harus dihitung dengan teliti.",
                                    "exEsp": "La pérdida debe calcularse cuidadosamente."
                                },
                                {
                                    "id": "a2u36_alternatif",
                                    "idn": "alternatif",
                                    "esp": "Alternativa",
                                    "ex": "Kita perlu mencari alternatif lain.",
                                    "exEsp": "Necesitamos buscar otra alternativa."
                                },
                                {
                                    "id": "a2u36_konsekuensi",
                                    "idn": "konsekuensi",
                                    "esp": "Consecuencia",
                                    "ex": "Setiap tindakan memiliki konsekuensi.",
                                    "exEsp": "Cada acción tiene consecuencias."
                                },
                                {
                                    "id": "a2u36_kompromi",
                                    "idn": "kompromi",
                                    "esp": "Compromiso",
                                    "ex": "Mereka mencapai kompromi bersama.",
                                    "exEsp": "Ellos llegan a un compromiso."
                                },
                                {
                                    "id": "a2u36_kesepakatan",
                                    "idn": "kesepakatan",
                                    "esp": "Acuerdo",
                                    "ex": "Kesepakatan dibuat kemarin.",
                                    "exEsp": "El acuerdo se hizo ayer."
                                },
                                {
                                    "id": "a2u36_rencana_cadangan",
                                    "idn": "rencana cadangan",
                                    "esp": "Plan alternativo",
                                    "ex": "Kami menyiapkan rencana cadangan.",
                                    "exEsp": "Preparamos un plan alternativo."
                                },
                                {
                                    "id": "a2u36_langkah_berikutnya",
                                    "idn": "langkah berikutnya",
                                    "esp": "Siguiente paso",
                                    "ex": "Langkah berikutnya adalah menghubungi petugas.",
                                    "exEsp": "El siguiente paso es contactar al empleado."
                                },
                                {
                                    "id": "a2u36_mengevaluasi",
                                    "idn": "mengevaluasi",
                                    "esp": "Evaluar",
                                    "ex": "Kami mengevaluasi hasil proyek.",
                                    "exEsp": "Evaluamos el resultado del proyecto."
                                },
                                {
                                    "id": "a2u36_mempertimbangkan",
                                    "idn": "mempertimbangkan",
                                    "esp": "Considerar",
                                    "ex": "Saya mempertimbangkan semua pilihan.",
                                    "exEsp": "Considero todas las opciones."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Consideraciones y riesgos",
                                    "objective": "Explica qué factores debes valorar antes de tomar una decisión.",
                                    "grammar": "Practica vocabulario para hablar de riesgos y consideraciones.",
                                    "vocabIds": [
                                        "a2u36_pertimbangan",
                                        "a2u36_risiko",
                                        "a2u36_keuntungan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u36_pertimbangan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «pertimbangan»?",
                                            "options": [
                                                "Consideración",
                                                "Pérdida",
                                                "Alternativa"
                                            ],
                                            "answer": 0,
                                            "explanation": "«pertimbangan» significa «Consideración»."
                                        },
                                        {
                                            "vocabId": "a2u36_risiko",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Debemos comprender ese riesgo.",
                                            "answer": "Kita harus memahami risiko itu.",
                                            "explanation": "La frase utiliza «risiko»."
                                        },
                                        {
                                            "vocabId": "a2u36_keuntungan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Keuntungan pilihan ini cukup besar.",
                                            "explanation": "La oración contiene «keuntungan»."
                                        },
                                        {
                                            "vocabId": "a2u36_pertimbangan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando pertimbangan.",
                                            "hint": "Puedes tomar como modelo: Ada beberapa pertimbangan penting.",
                                            "modelAnswer": "Ada beberapa pertimbangan penting.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u36_risiko",
                                            "type": "order",
                                            "prompt": "Ordena: Debemos comprender ese riesgo.",
                                            "words": [
                                                "itu",
                                                "risiko",
                                                "memahami",
                                                "harus",
                                                "Kita"
                                            ],
                                            "correctOrder": [
                                                "Kita",
                                                "harus",
                                                "memahami",
                                                "risiko",
                                                "itu"
                                            ],
                                            "explanation": "La frase completa es: Kita harus memahami risiko itu."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Ventajas y desventajas",
                                    "objective": "Compara beneficios y pérdidas de distintas alternativas.",
                                    "grammar": "Usa lebih y kurang para expresar comparaciones sencillas.",
                                    "vocabIds": [
                                        "a2u36_kerugian",
                                        "a2u36_alternatif",
                                        "a2u36_konsekuensi"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u36_kerugian",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «kerugian»?",
                                            "options": [
                                                "Pérdida",
                                                "Compromiso",
                                                "Acuerdo"
                                            ],
                                            "answer": 0,
                                            "explanation": "«kerugian» significa «Pérdida»."
                                        },
                                        {
                                            "vocabId": "a2u36_alternatif",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Necesitamos buscar otra alternativa.",
                                            "answer": "Kita perlu mencari alternatif lain.",
                                            "explanation": "La frase utiliza «alternatif»."
                                        },
                                        {
                                            "vocabId": "a2u36_konsekuensi",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Setiap tindakan memiliki konsekuensi.",
                                            "explanation": "La oración contiene «konsekuensi»."
                                        },
                                        {
                                            "vocabId": "a2u36_kerugian",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando kerugian.",
                                            "hint": "Puedes tomar como modelo: Kerugian harus dihitung dengan teliti.",
                                            "modelAnswer": "Kerugian harus dihitung dengan teliti.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Acuerdos y compromisos",
                                    "objective": "Describe compromisos y acuerdos alcanzados entre varias personas.",
                                    "grammar": "Practica expresiones para negociar y llegar a un compromiso.",
                                    "vocabIds": [
                                        "a2u36_kompromi",
                                        "a2u36_kesepakatan",
                                        "a2u36_rencana_cadangan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u36_kompromi",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «kompromi»?",
                                            "options": [
                                                "Compromiso",
                                                "Siguiente paso",
                                                "Evaluar"
                                            ],
                                            "answer": 0,
                                            "explanation": "«kompromi» significa «Compromiso»."
                                        },
                                        {
                                            "vocabId": "a2u36_kesepakatan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: El acuerdo se hizo ayer.",
                                            "answer": "Kesepakatan dibuat kemarin.",
                                            "explanation": "La frase utiliza «kesepakatan»."
                                        },
                                        {
                                            "vocabId": "a2u36_rencana_cadangan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Kami menyiapkan rencana cadangan.",
                                            "explanation": "La oración contiene «rencana cadangan»."
                                        },
                                        {
                                            "vocabId": "a2u36_kompromi",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando kompromi.",
                                            "hint": "Puedes tomar como modelo: Mereka mencapai kompromi bersama.",
                                            "modelAnswer": "Mereka mencapai kompromi bersama.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Planes y evaluación",
                                    "objective": "Explica planes alternativos y los pasos siguientes de un proyecto.",
                                    "grammar": "Usa langkah berikutnya para organizar acciones futuras.",
                                    "vocabIds": [
                                        "a2u36_langkah_berikutnya",
                                        "a2u36_mengevaluasi",
                                        "a2u36_mempertimbangkan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u36_langkah_berikutnya",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «langkah berikutnya»?",
                                            "options": [
                                                "Siguiente paso",
                                                "Consideración",
                                                "Riesgo"
                                            ],
                                            "answer": 0,
                                            "explanation": "«langkah berikutnya» significa «Siguiente paso»."
                                        },
                                        {
                                            "vocabId": "a2u36_mengevaluasi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Evaluamos el resultado del proyecto.",
                                            "answer": "Kami mengevaluasi hasil proyek.",
                                            "explanation": "La frase utiliza «mengevaluasi»."
                                        },
                                        {
                                            "vocabId": "a2u36_mempertimbangkan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya mempertimbangkan semua pilihan.",
                                            "explanation": "La oración contiene «mempertimbangkan»."
                                        },
                                        {
                                            "vocabId": "a2u36_langkah_berikutnya",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando langkah berikutnya.",
                                            "hint": "Puedes tomar como modelo: Langkah berikutnya adalah menghubungi petugas.",
                                            "modelAnswer": "Langkah berikutnya adalah menghubungi petugas.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        }
,
                    {
                            "id": "a2_u37",
                            "title": "Unidad 37: Emergencias y preparación ante desastres",
                            "desc": "Comprende avisos de emergencia, evacuaciones y recursos básicos para situaciones de riesgo.",
                            "grammar": "Usa terjadi para describir un acontecimiento y harus para expresar medidas necesarias. Practica instrucciones sencillas para evacuar y ayudar a otras personas.",
                            "vocab": [
                                {
                                    "id": "a2u37_gempa_bumi",
                                    "idn": "gempa bumi",
                                    "esp": "Terremoto",
                                    "ex": "Gempa bumi terjadi tadi malam.",
                                    "exEsp": "El terremoto ocurrió anoche."
                                },
                                {
                                    "id": "a2u37_letusan_gunung",
                                    "idn": "letusan gunung",
                                    "esp": "Erupción volcánica",
                                    "ex": "Letusan gunung itu terlihat dari desa.",
                                    "exEsp": "La erupción volcánica se veía desde el pueblo."
                                },
                                {
                                    "id": "a2u37_tanah_longsor",
                                    "idn": "tanah longsor",
                                    "esp": "Deslizamiento de tierra",
                                    "ex": "Tanah longsor menutup jalan utama.",
                                    "exEsp": "Un deslizamiento de tierra bloquea la carretera principal."
                                },
                                {
                                    "id": "a2u37_gelombang_tinggi",
                                    "idn": "gelombang tinggi",
                                    "esp": "Oleaje fuerte",
                                    "ex": "Gelombang tinggi mengganggu perjalanan kapal.",
                                    "exEsp": "El oleaje fuerte interrumpe el viaje en barco."
                                },
                                {
                                    "id": "a2u37_peringatan_dini",
                                    "idn": "peringatan dini",
                                    "esp": "Alerta temprana",
                                    "ex": "Peringatan dini dikirim melalui radio.",
                                    "exEsp": "La alerta temprana se envía por radio."
                                },
                                {
                                    "id": "a2u37_evakuasi",
                                    "idn": "evakuasi",
                                    "esp": "Evacuación",
                                    "ex": "Warga mengikuti proses evakuasi.",
                                    "exEsp": "Los residentes siguen el proceso de evacuación."
                                },
                                {
                                    "id": "a2u37_tempat_pengungsian",
                                    "idn": "tempat pengungsian",
                                    "esp": "Refugio",
                                    "ex": "Tempat pengungsian berada dekat sekolah.",
                                    "exEsp": "El refugio está cerca de la escuela."
                                },
                                {
                                    "id": "a2u37_persediaan_makanan",
                                    "idn": "persediaan makanan",
                                    "esp": "Suministros de alimentos",
                                    "ex": "Persediaan makanan cukup untuk tiga hari.",
                                    "exEsp": "Los suministros de alimentos son suficientes para tres días."
                                },
                                {
                                    "id": "a2u37_pertolongan_pertama",
                                    "idn": "pertolongan pertama",
                                    "esp": "Primeros auxilios",
                                    "ex": "Pertolongan pertama harus diberikan segera.",
                                    "exEsp": "Los primeros auxilios deben proporcionarse de inmediato."
                                },
                                {
                                    "id": "a2u37_jalur_evakuasi",
                                    "idn": "jalur evakuasi",
                                    "esp": "Ruta de evacuación",
                                    "ex": "Jalur evakuasi harus tetap terbuka.",
                                    "exEsp": "La ruta de evacuación debe permanecer abierta."
                                },
                                {
                                    "id": "a2u37_relawan_bencana",
                                    "idn": "relawan bencana",
                                    "esp": "Voluntario de desastres",
                                    "ex": "Relawan bencana membantu keluarga.",
                                    "exEsp": "Los voluntarios de desastres ayudan a las familias."
                                },
                                {
                                    "id": "a2u37_pusat_bantuan",
                                    "idn": "pusat bantuan",
                                    "esp": "Centro de ayuda",
                                    "ex": "Pusat bantuan dibuka di balai kota.",
                                    "exEsp": "El centro de ayuda abre en el ayuntamiento."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Fenómenos naturales",
                                    "objective": "Describe terremotos, erupciones, deslizamientos y condiciones peligrosas.",
                                    "grammar": "Practica vocabulario para describir fenómenos naturales y sus efectos.",
                                    "vocabIds": [
                                        "a2u37_gempa_bumi",
                                        "a2u37_letusan_gunung",
                                        "a2u37_tanah_longsor"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u37_gempa_bumi",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «gempa bumi»?",
                                            "options": [
                                                "Terremoto",
                                                "Oleaje fuerte",
                                                "Alerta temprana"
                                            ],
                                            "answer": 0,
                                            "explanation": "«gempa bumi» significa «Terremoto»."
                                        },
                                        {
                                            "vocabId": "a2u37_letusan_gunung",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La erupción volcánica se veía desde el pueblo.",
                                            "answer": "Letusan gunung itu terlihat dari desa.",
                                            "explanation": "La frase utiliza «letusan gunung»."
                                        },
                                        {
                                            "vocabId": "a2u37_tanah_longsor",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Tanah longsor menutup jalan utama.",
                                            "explanation": "La oración contiene «tanah longsor»."
                                        },
                                        {
                                            "vocabId": "a2u37_gempa_bumi",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando gempa bumi.",
                                            "hint": "Puedes tomar como modelo: Gempa bumi terjadi tadi malam.",
                                            "modelAnswer": "Gempa bumi terjadi tadi malam.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u37_letusan_gunung",
                                            "type": "order",
                                            "prompt": "Ordena: La erupción volcánica se veía desde el pueblo.",
                                            "words": [
                                                "desa",
                                                "dari",
                                                "terlihat",
                                                "itu",
                                                "gunung",
                                                "Letusan"
                                            ],
                                            "correctOrder": [
                                                "Letusan",
                                                "gunung",
                                                "itu",
                                                "terlihat",
                                                "dari",
                                                "desa"
                                            ],
                                            "explanation": "La frase completa es: Letusan gunung itu terlihat dari desa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Avisos y evacuaciones",
                                    "objective": "Comprende avisos tempranos y explica cómo se organiza una evacuación.",
                                    "grammar": "Usa mengikuti y menuju para describir acciones y desplazamientos.",
                                    "vocabIds": [
                                        "a2u37_gelombang_tinggi",
                                        "a2u37_peringatan_dini",
                                        "a2u37_evakuasi"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u37_gelombang_tinggi",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «gelombang tinggi»?",
                                            "options": [
                                                "Oleaje fuerte",
                                                "Refugio",
                                                "Suministros de alimentos"
                                            ],
                                            "answer": 0,
                                            "explanation": "«gelombang tinggi» significa «Oleaje fuerte»."
                                        },
                                        {
                                            "vocabId": "a2u37_peringatan_dini",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La alerta temprana se envía por radio.",
                                            "answer": "Peringatan dini dikirim melalui radio.",
                                            "explanation": "La frase utiliza «peringatan dini»."
                                        },
                                        {
                                            "vocabId": "a2u37_evakuasi",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Warga mengikuti proses evakuasi.",
                                            "explanation": "La oración contiene «evakuasi»."
                                        },
                                        {
                                            "vocabId": "a2u37_gelombang_tinggi",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando gelombang tinggi.",
                                            "hint": "Puedes tomar como modelo: Gelombang tinggi mengganggu perjalanan kapal.",
                                            "modelAnswer": "Gelombang tinggi mengganggu perjalanan kapal.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Refugios y suministros",
                                    "objective": "Habla de refugios temporales y de los recursos necesarios durante una emergencia.",
                                    "grammar": "Practica expresiones de cantidad y suficiencia.",
                                    "vocabIds": [
                                        "a2u37_tempat_pengungsian",
                                        "a2u37_persediaan_makanan",
                                        "a2u37_pertolongan_pertama"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u37_tempat_pengungsian",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «tempat pengungsian»?",
                                            "options": [
                                                "Refugio",
                                                "Ruta de evacuación",
                                                "Voluntario de desastres"
                                            ],
                                            "answer": 0,
                                            "explanation": "«tempat pengungsian» significa «Refugio»."
                                        },
                                        {
                                            "vocabId": "a2u37_persediaan_makanan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Los suministros de alimentos son suficientes para tres días.",
                                            "answer": "Persediaan makanan cukup untuk tiga hari.",
                                            "explanation": "La frase utiliza «persediaan makanan»."
                                        },
                                        {
                                            "vocabId": "a2u37_pertolongan_pertama",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pertolongan pertama harus diberikan segera.",
                                            "explanation": "La oración contiene «pertolongan pertama»."
                                        },
                                        {
                                            "vocabId": "a2u37_tempat_pengungsian",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando tempat pengungsian.",
                                            "hint": "Puedes tomar como modelo: Tempat pengungsian berada dekat sekolah.",
                                            "modelAnswer": "Tempat pengungsian berada dekat sekolah.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Ayuda y seguridad",
                                    "objective": "Describe primeros auxilios, rutas de evacuación y apoyo comunitario.",
                                    "grammar": "Usa harus para expresar medidas de seguridad.",
                                    "vocabIds": [
                                        "a2u37_jalur_evakuasi",
                                        "a2u37_relawan_bencana",
                                        "a2u37_pusat_bantuan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u37_jalur_evakuasi",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «jalur evakuasi»?",
                                            "options": [
                                                "Ruta de evacuación",
                                                "Terremoto",
                                                "Erupción volcánica"
                                            ],
                                            "answer": 0,
                                            "explanation": "«jalur evakuasi» significa «Ruta de evacuación»."
                                        },
                                        {
                                            "vocabId": "a2u37_relawan_bencana",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Los voluntarios de desastres ayudan a las familias.",
                                            "answer": "Relawan bencana membantu keluarga.",
                                            "explanation": "La frase utiliza «relawan bencana»."
                                        },
                                        {
                                            "vocabId": "a2u37_pusat_bantuan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pusat bantuan dibuka di balai kota.",
                                            "explanation": "La oración contiene «pusat bantuan»."
                                        },
                                        {
                                            "vocabId": "a2u37_jalur_evakuasi",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando jalur evakuasi.",
                                            "hint": "Puedes tomar como modelo: Jalur evakuasi harus tetap terbuka.",
                                            "modelAnswer": "Jalur evakuasi harus tetap terbuka.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u38",
                            "title": "Unidad 38: Turismo y alojamiento",
                            "desc": "Organiza visitas, consulta servicios turísticos y comprende información práctica para viajeros.",
                            "grammar": "Usa mengunjungi para hablar de visitar un lugar y melalui para indicar el medio de una reserva. Practica expresiones para horarios, entradas y servicios turísticos.",
                            "vocab": [
                                {
                                    "id": "a2u38_wisatawan",
                                    "idn": "wisatawan",
                                    "esp": "Turista",
                                    "ex": "Banyak wisatawan mengunjungi pulau itu.",
                                    "exEsp": "Muchos turistas visitan esa isla."
                                },
                                {
                                    "id": "a2u38_destinasi",
                                    "idn": "destinasi",
                                    "esp": "Destino",
                                    "ex": "Bali adalah destinasi populer.",
                                    "exEsp": "Bali es un destino popular."
                                },
                                {
                                    "id": "a2u38_pemandu_wisata",
                                    "idn": "pemandu wisata",
                                    "esp": "Guía turístico",
                                    "ex": "Pemandu wisata menjelaskan sejarah tempat itu.",
                                    "exEsp": "El guía turístico explica la historia de ese lugar."
                                },
                                {
                                    "id": "a2u38_penginapan",
                                    "idn": "penginapan",
                                    "esp": "Alojamiento",
                                    "ex": "Penginapan kami dekat pantai.",
                                    "exEsp": "Nuestro alojamiento está cerca de la playa."
                                },
                                {
                                    "id": "a2u38_pemesanan",
                                    "idn": "pemesanan",
                                    "esp": "Reserva",
                                    "ex": "Pemesanan kamar dilakukan melalui situs.",
                                    "exEsp": "La reserva de la habitación se realiza mediante el sitio web."
                                },
                                {
                                    "id": "a2u38_peta_wisata",
                                    "idn": "peta wisata",
                                    "esp": "Mapa turístico",
                                    "ex": "Peta wisata membantu pengunjung.",
                                    "exEsp": "El mapa turístico ayuda a los visitantes."
                                },
                                {
                                    "id": "a2u38_biaya_masuk",
                                    "idn": "biaya masuk",
                                    "esp": "Entrada",
                                    "ex": "Biaya masuk dibayar di loket.",
                                    "exEsp": "La entrada se paga en la taquilla."
                                },
                                {
                                    "id": "a2u38_jam_kunjung",
                                    "idn": "jam kunjung",
                                    "esp": "Horario de visita",
                                    "ex": "Jam kunjung berakhir pukul lima.",
                                    "exEsp": "El horario de visita termina a las cinco."
                                },
                                {
                                    "id": "a2u38_tiket_masuk",
                                    "idn": "tiket masuk",
                                    "esp": "Entrada",
                                    "ex": "Simpan tiket masuk Anda.",
                                    "exEsp": "Guarde su entrada."
                                },
                                {
                                    "id": "a2u38_objek_wisata",
                                    "idn": "objek wisata",
                                    "esp": "Atracción turística",
                                    "ex": "Objek wisata itu ramai pada akhir pekan.",
                                    "exEsp": "Esa atracción turística está concurrida los fines de semana."
                                },
                                {
                                    "id": "a2u38_oleh_oleh",
                                    "idn": "oleh oleh",
                                    "esp": "Recuerdo",
                                    "ex": "Saya membeli oleh-oleh untuk keluarga.",
                                    "exEsp": "Compro un recuerdo para mi familia."
                                },
                                {
                                    "id": "a2u38_jadwal_kunjungan",
                                    "idn": "jadwal kunjungan",
                                    "esp": "Programa de visitas",
                                    "ex": "Jadwal kunjungan berubah karena hujan.",
                                    "exEsp": "El programa de visitas cambia debido a la lluvia."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Destinos y visitantes",
                                    "objective": "Describe destinos turísticos y a las personas que los visitan.",
                                    "grammar": "Practica vocabulario para hablar de lugares y visitantes.",
                                    "vocabIds": [
                                        "a2u38_wisatawan",
                                        "a2u38_destinasi",
                                        "a2u38_pemandu_wisata"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u38_wisatawan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «wisatawan»?",
                                            "options": [
                                                "Turista",
                                                "Alojamiento",
                                                "Reserva"
                                            ],
                                            "answer": 0,
                                            "explanation": "«wisatawan» significa «Turista»."
                                        },
                                        {
                                            "vocabId": "a2u38_destinasi",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Bali es un destino popular.",
                                            "answer": "Bali adalah destinasi populer.",
                                            "explanation": "La frase utiliza «destinasi»."
                                        },
                                        {
                                            "vocabId": "a2u38_pemandu_wisata",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pemandu wisata menjelaskan sejarah tempat itu.",
                                            "explanation": "La oración contiene «pemandu wisata»."
                                        },
                                        {
                                            "vocabId": "a2u38_wisatawan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando wisatawan.",
                                            "hint": "Puedes tomar como modelo: Banyak wisatawan mengunjungi pulau itu.",
                                            "modelAnswer": "Banyak wisatawan mengunjungi pulau itu.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u38_destinasi",
                                            "type": "order",
                                            "prompt": "Ordena: Bali es un destino popular.",
                                            "words": [
                                                "populer",
                                                "destinasi",
                                                "adalah",
                                                "Bali"
                                            ],
                                            "correctOrder": [
                                                "Bali",
                                                "adalah",
                                                "destinasi",
                                                "populer"
                                            ],
                                            "explanation": "La frase completa es: Bali adalah destinasi populer."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Guías y alojamiento",
                                    "objective": "Habla de guías turísticos y lugares donde alojarse.",
                                    "grammar": "Usa dekat para indicar proximidad y expresiones de ubicación.",
                                    "vocabIds": [
                                        "a2u38_penginapan",
                                        "a2u38_pemesanan",
                                        "a2u38_peta_wisata"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u38_penginapan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «penginapan»?",
                                            "options": [
                                                "Alojamiento",
                                                "Entrada",
                                                "Horario de visita"
                                            ],
                                            "answer": 0,
                                            "explanation": "«penginapan» significa «Alojamiento»."
                                        },
                                        {
                                            "vocabId": "a2u38_pemesanan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La reserva de la habitación se realiza mediante el sitio web.",
                                            "answer": "Pemesanan kamar dilakukan melalui situs.",
                                            "explanation": "La frase utiliza «pemesanan»."
                                        },
                                        {
                                            "vocabId": "a2u38_peta_wisata",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Peta wisata membantu pengunjung.",
                                            "explanation": "La oración contiene «peta wisata»."
                                        },
                                        {
                                            "vocabId": "a2u38_penginapan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando penginapan.",
                                            "hint": "Puedes tomar como modelo: Penginapan kami dekat pantai.",
                                            "modelAnswer": "Penginapan kami dekat pantai.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Reservas y entradas",
                                    "objective": "Explica cómo reservar alojamiento y comprar entradas.",
                                    "grammar": "Practica expresiones para pagar y confirmar una reserva.",
                                    "vocabIds": [
                                        "a2u38_biaya_masuk",
                                        "a2u38_jam_kunjung",
                                        "a2u38_tiket_masuk"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u38_biaya_masuk",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «biaya masuk»?",
                                            "options": [
                                                "Entrada",
                                                "Atracción turística",
                                                "Recuerdo"
                                            ],
                                            "answer": 0,
                                            "explanation": "«biaya masuk» significa «Entrada»."
                                        },
                                        {
                                            "vocabId": "a2u38_jam_kunjung",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: El horario de visita termina a las cinco.",
                                            "answer": "Jam kunjung berakhir pukul lima.",
                                            "explanation": "La frase utiliza «jam kunjung»."
                                        },
                                        {
                                            "vocabId": "a2u38_tiket_masuk",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Simpan tiket masuk Anda.",
                                            "explanation": "La oración contiene «tiket masuk»."
                                        },
                                        {
                                            "vocabId": "a2u38_biaya_masuk",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando biaya masuk.",
                                            "hint": "Puedes tomar como modelo: Biaya masuk dibayar di loket.",
                                            "modelAnswer": "Biaya masuk dibayar di loket.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Horarios y recuerdos",
                                    "objective": "Comprende horarios de visita y habla de recuerdos de un viaje.",
                                    "grammar": "Usa berubah para explicar cambios de horario.",
                                    "vocabIds": [
                                        "a2u38_objek_wisata",
                                        "a2u38_oleh_oleh",
                                        "a2u38_jadwal_kunjungan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u38_objek_wisata",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «objek wisata»?",
                                            "options": [
                                                "Atracción turística",
                                                "Turista",
                                                "Destino"
                                            ],
                                            "answer": 0,
                                            "explanation": "«objek wisata» significa «Atracción turística»."
                                        },
                                        {
                                            "vocabId": "a2u38_oleh_oleh",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Compro un recuerdo para mi familia.",
                                            "answer": "Saya membeli oleh-oleh untuk keluarga.",
                                            "explanation": "La frase utiliza «oleh oleh»."
                                        },
                                        {
                                            "vocabId": "a2u38_jadwal_kunjungan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Jadwal kunjungan berubah karena hujan.",
                                            "explanation": "La oración contiene «jadwal kunjungan»."
                                        },
                                        {
                                            "vocabId": "a2u38_objek_wisata",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando objek wisata.",
                                            "hint": "Puedes tomar como modelo: Objek wisata itu ramai pada akhir pekan.",
                                            "modelAnswer": "Objek wisata itu ramai pada akhir pekan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u39",
                            "title": "Unidad 39: Trabajo remoto y colaboración digital",
                            "desc": "Participa en reuniones virtuales y comparte documentos y recursos digitales.",
                            "grammar": "Usa mengikuti rapat para hablar de asistir a una reunión y berbagi layar para explicar cómo compartir contenido. Practica instrucciones para enviar, descargar y actualizar archivos.",
                            "vocab": [
                                {
                                    "id": "a2u39_rapat_daring",
                                    "idn": "rapat daring",
                                    "esp": "Reunión en línea",
                                    "ex": "Rapat daring dimulai pukul sembilan.",
                                    "exEsp": "La reunión en línea empieza a las nueve."
                                },
                                {
                                    "id": "a2u39_konferensi_video",
                                    "idn": "konferensi video",
                                    "esp": "Videoconferencia",
                                    "ex": "Kami mengikuti konferensi video dengan tim.",
                                    "exEsp": "Participamos en una videoconferencia con el equipo."
                                },
                                {
                                    "id": "a2u39_berbagi_layar",
                                    "idn": "berbagi layar",
                                    "esp": "Compartir pantalla",
                                    "ex": "Saya berbagi layar saat presentasi.",
                                    "exEsp": "Comparto la pantalla durante la presentación."
                                },
                                {
                                    "id": "a2u39_dokumen_bersama",
                                    "idn": "dokumen bersama",
                                    "esp": "Documento compartido",
                                    "ex": "Kami mengedit dokumen bersama.",
                                    "exEsp": "Editamos un documento compartido."
                                },
                                {
                                    "id": "a2u39_tautan",
                                    "idn": "tautan",
                                    "esp": "Enlace",
                                    "ex": "Kirim tautan rapat kepada saya.",
                                    "exEsp": "Envíame el enlace de la reunión."
                                },
                                {
                                    "id": "a2u39_lampiran",
                                    "idn": "lampiran",
                                    "esp": "Archivo adjunto",
                                    "ex": "Saya membuka lampiran dalam email.",
                                    "exEsp": "Abro el archivo adjunto del correo."
                                },
                                {
                                    "id": "a2u39_unduh",
                                    "idn": "unduh",
                                    "esp": "Descargar",
                                    "ex": "Silakan unduh berkas itu.",
                                    "exEsp": "Por favor, descarga ese archivo."
                                },
                                {
                                    "id": "a2u39_unggah",
                                    "idn": "unggah",
                                    "esp": "Subir",
                                    "ex": "Saya mengunggah laporan ke sistem.",
                                    "exEsp": "Subo el informe al sistema."
                                },
                                {
                                    "id": "a2u39_penyimpanan_awan",
                                    "idn": "penyimpanan awan",
                                    "esp": "Almacenamiento en la nube",
                                    "ex": "Dokumen disimpan di penyimpanan awan.",
                                    "exEsp": "El documento se guarda en el almacenamiento en la nube."
                                },
                                {
                                    "id": "a2u39_notifikasi",
                                    "idn": "notifikasi",
                                    "esp": "Notificación",
                                    "ex": "Notifikasi muncul di layar.",
                                    "exEsp": "La notificación aparece en la pantalla."
                                },
                                {
                                    "id": "a2u39_pembaruan",
                                    "idn": "pembaruan",
                                    "esp": "Actualización",
                                    "ex": "Pembaruan aplikasi tersedia hari ini.",
                                    "exEsp": "La actualización de la aplicación está disponible hoy."
                                },
                                {
                                    "id": "a2u39_akses",
                                    "idn": "akses",
                                    "esp": "Acceso",
                                    "ex": "Hanya anggota tim memiliki akses.",
                                    "exEsp": "Solo los miembros del equipo tienen acceso."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Reuniones virtuales",
                                    "objective": "Describe reuniones en línea y videoconferencias con compañeros.",
                                    "grammar": "Practica expresiones para organizar y participar en reuniones.",
                                    "vocabIds": [
                                        "a2u39_rapat_daring",
                                        "a2u39_konferensi_video",
                                        "a2u39_berbagi_layar"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u39_rapat_daring",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «rapat daring»?",
                                            "options": [
                                                "Reunión en línea",
                                                "Documento compartido",
                                                "Enlace"
                                            ],
                                            "answer": 0,
                                            "explanation": "«rapat daring» significa «Reunión en línea»."
                                        },
                                        {
                                            "vocabId": "a2u39_konferensi_video",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Participamos en una videoconferencia con el equipo.",
                                            "answer": "Kami mengikuti konferensi video dengan tim.",
                                            "explanation": "La frase utiliza «konferensi video»."
                                        },
                                        {
                                            "vocabId": "a2u39_berbagi_layar",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya berbagi layar saat presentasi.",
                                            "explanation": "La oración contiene «berbagi layar»."
                                        },
                                        {
                                            "vocabId": "a2u39_rapat_daring",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando rapat daring.",
                                            "hint": "Puedes tomar como modelo: Rapat daring dimulai pukul sembilan.",
                                            "modelAnswer": "Rapat daring dimulai pukul sembilan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u39_konferensi_video",
                                            "type": "order",
                                            "prompt": "Ordena: Participamos en una videoconferencia con el equipo.",
                                            "words": [
                                                "tim",
                                                "dengan",
                                                "video",
                                                "konferensi",
                                                "mengikuti",
                                                "Kami"
                                            ],
                                            "correctOrder": [
                                                "Kami",
                                                "mengikuti",
                                                "konferensi",
                                                "video",
                                                "dengan",
                                                "tim"
                                            ],
                                            "explanation": "La frase completa es: Kami mengikuti konferensi video dengan tim."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Compartir documentos",
                                    "objective": "Explica cómo colaborar en documentos y presentaciones compartidas.",
                                    "grammar": "Usa bersama para indicar colaboración.",
                                    "vocabIds": [
                                        "a2u39_dokumen_bersama",
                                        "a2u39_tautan",
                                        "a2u39_lampiran"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u39_dokumen_bersama",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «dokumen bersama»?",
                                            "options": [
                                                "Documento compartido",
                                                "Descargar",
                                                "Subir"
                                            ],
                                            "answer": 0,
                                            "explanation": "«dokumen bersama» significa «Documento compartido»."
                                        },
                                        {
                                            "vocabId": "a2u39_tautan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Envíame el enlace de la reunión.",
                                            "answer": "Kirim tautan rapat kepada saya.",
                                            "explanation": "La frase utiliza «tautan»."
                                        },
                                        {
                                            "vocabId": "a2u39_lampiran",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya membuka lampiran dalam email.",
                                            "explanation": "La oración contiene «lampiran»."
                                        },
                                        {
                                            "vocabId": "a2u39_dokumen_bersama",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando dokumen bersama.",
                                            "hint": "Puedes tomar como modelo: Kami mengedit dokumen bersama.",
                                            "modelAnswer": "Kami mengedit dokumen bersama.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Archivos y enlaces",
                                    "objective": "Habla de enlaces, archivos adjuntos y acciones de descarga y subida.",
                                    "grammar": "Practica instrucciones con silakan y jangan.",
                                    "vocabIds": [
                                        "a2u39_unduh",
                                        "a2u39_unggah",
                                        "a2u39_penyimpanan_awan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u39_unduh",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «unduh»?",
                                            "options": [
                                                "Descargar",
                                                "Notificación",
                                                "Actualización"
                                            ],
                                            "answer": 0,
                                            "explanation": "«unduh» significa «Descargar»."
                                        },
                                        {
                                            "vocabId": "a2u39_unggah",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Subo el informe al sistema.",
                                            "answer": "Saya mengunggah laporan ke sistem.",
                                            "explanation": "La frase utiliza «unggah»."
                                        },
                                        {
                                            "vocabId": "a2u39_penyimpanan_awan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Dokumen disimpan di penyimpanan awan.",
                                            "explanation": "La oración contiene «penyimpanan awan»."
                                        },
                                        {
                                            "vocabId": "a2u39_unduh",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando unduh.",
                                            "hint": "Puedes tomar como modelo: Silakan unduh berkas itu.",
                                            "modelAnswer": "Silakan unduh berkas itu.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Acceso y actualizaciones",
                                    "objective": "Describe almacenamiento en la nube, notificaciones y permisos de acceso.",
                                    "grammar": "Usa tersedia y memiliki para explicar disponibilidad y acceso.",
                                    "vocabIds": [
                                        "a2u39_notifikasi",
                                        "a2u39_pembaruan",
                                        "a2u39_akses"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u39_notifikasi",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «notifikasi»?",
                                            "options": [
                                                "Notificación",
                                                "Reunión en línea",
                                                "Videoconferencia"
                                            ],
                                            "answer": 0,
                                            "explanation": "«notifikasi» significa «Notificación»."
                                        },
                                        {
                                            "vocabId": "a2u39_pembaruan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La actualización de la aplicación está disponible hoy.",
                                            "answer": "Pembaruan aplikasi tersedia hari ini.",
                                            "explanation": "La frase utiliza «pembaruan»."
                                        },
                                        {
                                            "vocabId": "a2u39_akses",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Hanya anggota tim memiliki akses.",
                                            "explanation": "La oración contiene «akses»."
                                        },
                                        {
                                            "vocabId": "a2u39_notifikasi",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando notifikasi.",
                                            "hint": "Puedes tomar como modelo: Notifikasi muncul di layar.",
                                            "modelAnswer": "Notifikasi muncul di layar.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "a2_u40",
                            "title": "Unidad 40: Resumir, aclarar y responder",
                            "desc": "Integra habilidades A2 para resumir información, aclarar ideas y responder con argumentos sencillos.",
                            "grammar": "Usa menurut saya para expresar una opinión y meminta klarifikasi para pedir aclaraciones. Practica expresiones para resumir, concluir y responder respetuosamente.",
                            "vocab": [
                                {
                                    "id": "a2u40_ringkasan",
                                    "idn": "ringkasan",
                                    "esp": "Resumen",
                                    "ex": "Ringkasan itu menjelaskan topik utama.",
                                    "exEsp": "Ese resumen explica el tema principal."
                                },
                                {
                                    "id": "a2u40_kesimpulan",
                                    "idn": "kesimpulan",
                                    "esp": "Conclusión",
                                    "ex": "Kesimpulan dibuat setelah diskusi.",
                                    "exEsp": "La conclusión se formula después del debate."
                                },
                                {
                                    "id": "a2u40_klarifikasi",
                                    "idn": "klarifikasi",
                                    "esp": "Aclaración",
                                    "ex": "Saya meminta klarifikasi tentang instruksi itu.",
                                    "exEsp": "Pido una aclaración sobre esa instrucción."
                                },
                                {
                                    "id": "a2u40_penegasan",
                                    "idn": "penegasan",
                                    "esp": "Énfasis",
                                    "ex": "Penegasan itu membuat maksudnya jelas.",
                                    "exEsp": "Ese énfasis deja claro el significado."
                                },
                                {
                                    "id": "a2u40_tanggapan",
                                    "idn": "tanggapan",
                                    "esp": "Respuesta",
                                    "ex": "Tanggapan peserta sangat beragam.",
                                    "exEsp": "Las respuestas de los participantes son muy variadas."
                                },
                                {
                                    "id": "a2u40_sanggahan",
                                    "idn": "sanggahan",
                                    "esp": "Objeción",
                                    "ex": "Dia menyampaikan sanggahan dengan sopan.",
                                    "exEsp": "Él presenta una objeción con educación."
                                },
                                {
                                    "id": "a2u40_contoh_tambahan",
                                    "idn": "contoh tambahan",
                                    "esp": "Ejemplo adicional",
                                    "ex": "Guru memberikan contoh tambahan.",
                                    "exEsp": "El profesor proporciona un ejemplo adicional."
                                },
                                {
                                    "id": "a2u40_uraian",
                                    "idn": "uraian",
                                    "esp": "Explicación detallada",
                                    "ex": "Uraian itu mudah dipahami.",
                                    "exEsp": "Esa explicación detallada es fácil de entender."
                                },
                                {
                                    "id": "a2u40_rincian",
                                    "idn": "rincian",
                                    "esp": "Detalle",
                                    "ex": "Tolong periksa rincian dokumen.",
                                    "exEsp": "Por favor, revisa los detalles del documento."
                                },
                                {
                                    "id": "a2u40_keterangan",
                                    "idn": "keterangan",
                                    "esp": "Información",
                                    "ex": "Keterangan tambahan tersedia di situs.",
                                    "exEsp": "La información adicional está disponible en el sitio web."
                                },
                                {
                                    "id": "a2u40_pernyataan",
                                    "idn": "pernyataan",
                                    "esp": "Declaración",
                                    "ex": "Pernyataan resmi akan diumumkan besok.",
                                    "exEsp": "La declaración oficial se anunciará mañana."
                                },
                                {
                                    "id": "a2u40_pembahasan",
                                    "idn": "pembahasan",
                                    "esp": "Debate",
                                    "ex": "Pembahasan topik itu berlangsung satu jam.",
                                    "exEsp": "El debate sobre ese tema dura una hora."
                                }
                            ],
                            "lessons": [
                                {
                                    "title": "Lección 1: Resúmenes y conclusiones",
                                    "objective": "Identifica las ideas principales y presenta un resumen breve.",
                                    "grammar": "Practica expresiones para resumir y concluir una explicación.",
                                    "vocabIds": [
                                        "a2u40_ringkasan",
                                        "a2u40_kesimpulan",
                                        "a2u40_klarifikasi"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u40_ringkasan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «ringkasan»?",
                                            "options": [
                                                "Resumen",
                                                "Énfasis",
                                                "Respuesta"
                                            ],
                                            "answer": 0,
                                            "explanation": "«ringkasan» significa «Resumen»."
                                        },
                                        {
                                            "vocabId": "a2u40_kesimpulan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La conclusión se formula después del debate.",
                                            "answer": "Kesimpulan dibuat setelah diskusi.",
                                            "explanation": "La frase utiliza «kesimpulan»."
                                        },
                                        {
                                            "vocabId": "a2u40_klarifikasi",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Saya meminta klarifikasi tentang instruksi itu.",
                                            "explanation": "La oración contiene «klarifikasi»."
                                        },
                                        {
                                            "vocabId": "a2u40_ringkasan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando ringkasan.",
                                            "hint": "Puedes tomar como modelo: Ringkasan itu menjelaskan topik utama.",
                                            "modelAnswer": "Ringkasan itu menjelaskan topik utama.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        },
                                        {
                                            "vocabId": "a2u40_kesimpulan",
                                            "type": "order",
                                            "prompt": "Ordena: La conclusión se formula después del debate.",
                                            "words": [
                                                "diskusi",
                                                "setelah",
                                                "dibuat",
                                                "Kesimpulan"
                                            ],
                                            "correctOrder": [
                                                "Kesimpulan",
                                                "dibuat",
                                                "setelah",
                                                "diskusi"
                                            ],
                                            "explanation": "La frase completa es: Kesimpulan dibuat setelah diskusi."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 2: Aclarar y enfatizar",
                                    "objective": "Pide aclaraciones y refuerza una idea cuando sea necesario.",
                                    "grammar": "Usa maksud saya para explicar de nuevo lo que quieres decir.",
                                    "vocabIds": [
                                        "a2u40_penegasan",
                                        "a2u40_tanggapan",
                                        "a2u40_sanggahan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u40_penegasan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «penegasan»?",
                                            "options": [
                                                "Énfasis",
                                                "Ejemplo adicional",
                                                "Explicación detallada"
                                            ],
                                            "answer": 0,
                                            "explanation": "«penegasan» significa «Énfasis»."
                                        },
                                        {
                                            "vocabId": "a2u40_tanggapan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Las respuestas de los participantes son muy variadas.",
                                            "answer": "Tanggapan peserta sangat beragam.",
                                            "explanation": "La frase utiliza «tanggapan»."
                                        },
                                        {
                                            "vocabId": "a2u40_sanggahan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Dia menyampaikan sanggahan dengan sopan.",
                                            "explanation": "La oración contiene «sanggahan»."
                                        },
                                        {
                                            "vocabId": "a2u40_penegasan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando penegasan.",
                                            "hint": "Puedes tomar como modelo: Penegasan itu membuat maksudnya jelas.",
                                            "modelAnswer": "Penegasan itu membuat maksudnya jelas.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 3: Respuestas y objeciones",
                                    "objective": "Responde a opiniones y presenta desacuerdos de manera respetuosa.",
                                    "grammar": "Practica expresiones para apoyar o cuestionar una idea.",
                                    "vocabIds": [
                                        "a2u40_contoh_tambahan",
                                        "a2u40_uraian",
                                        "a2u40_rincian"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u40_contoh_tambahan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «contoh tambahan»?",
                                            "options": [
                                                "Ejemplo adicional",
                                                "Información",
                                                "Declaración"
                                            ],
                                            "answer": 0,
                                            "explanation": "«contoh tambahan» significa «Ejemplo adicional»."
                                        },
                                        {
                                            "vocabId": "a2u40_uraian",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: Esa explicación detallada es fácil de entender.",
                                            "answer": "Uraian itu mudah dipahami.",
                                            "explanation": "La frase utiliza «uraian»."
                                        },
                                        {
                                            "vocabId": "a2u40_rincian",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Tolong periksa rincian dokumen.",
                                            "explanation": "La oración contiene «rincian»."
                                        },
                                        {
                                            "vocabId": "a2u40_contoh_tambahan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando contoh tambahan.",
                                            "hint": "Puedes tomar como modelo: Guru memberikan contoh tambahan.",
                                            "modelAnswer": "Guru memberikan contoh tambahan.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                },
                                {
                                    "title": "Lección 4: Explicaciones y detalles",
                                    "objective": "Añade ejemplos, detalles y declaraciones para que una explicación sea clara.",
                                    "grammar": "Usa misalnya y secara rinci para ampliar información.",
                                    "vocabIds": [
                                        "a2u40_keterangan",
                                        "a2u40_pernyataan",
                                        "a2u40_pembahasan"
                                    ],
                                    "exercises": [
                                        {
                                            "vocabId": "a2u40_keterangan",
                                            "type": "mc",
                                            "prompt": "¿Qué significa «keterangan»?",
                                            "options": [
                                                "Información",
                                                "Resumen",
                                                "Conclusión"
                                            ],
                                            "answer": 0,
                                            "explanation": "«keterangan» significa «Información»."
                                        },
                                        {
                                            "vocabId": "a2u40_pernyataan",
                                            "type": "translate_es_id",
                                            "prompt": "Traduce: La declaración oficial se anunciará mañana.",
                                            "answer": "Pernyataan resmi akan diumumkan besok.",
                                            "explanation": "La frase utiliza «pernyataan»."
                                        },
                                        {
                                            "vocabId": "a2u40_pembahasan",
                                            "type": "listen",
                                            "prompt": "Escucha y escribe la oración.",
                                            "answer": "Pembahasan topik itu berlangsung satu jam.",
                                            "explanation": "La oración contiene «pembahasan»."
                                        },
                                        {
                                            "vocabId": "a2u40_keterangan",
                                            "type": "write",
                                            "prompt": "Escribe una frase usando keterangan.",
                                            "hint": "Puedes tomar como modelo: Keterangan tambahan tersedia di situs.",
                                            "modelAnswer": "Keterangan tambahan tersedia di situs.",
                                            "explanation": "Usa el vocabulario en una oración completa."
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
