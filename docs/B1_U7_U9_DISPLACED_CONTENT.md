# Contenido desplazado de B1 U7–U9

Fecha: 6 de noviembre de 2026. Fuente: objetos curriculares retirados de `CourseData` en `index.html` al aplicar la secuencia de nombres de agente pe-/peN- autorizada por el usuario.

Este archivo conserva literalmente los tres objetos anteriores para que sus elementos puedan reorganizarse en las unidades adecuadas. No se cargan desde aquí en la aplicación ni se consideran aprobados para reintroducción automática.

## Destinos propuestos para revisión futura

- Antiguo U7: `menurut`, `berdasarkan`, `laporan`, `meningkat` y `menurun` pueden revisarse junto a lectura, datos y medios en unidades posteriores; no reintroducir sin comprobar el vocabulario ya enseñado.
- Antiguo U8: `dilakukan`, `digunakan`, `diproses`, `dihasilkan` y `langkah` pueden revisarse en una unidad posterior sobre procesos, instrucciones o informes.
- Antiguo U9: `pendapat`, `alasan`, `setuju`, `berbeda` y `sebaliknya` pueden revisarse en las unidades de opiniones, argumentación y conectores previstas para B1.

## Objetos originales preservados

### U7

```js
{
                            id: 'b1_u7',
                            title: 'Unidad 7: Leer y resumir información',
                            desc: 'Interpreta afirmaciones atribuidas a informes y describe cambios sencillos en datos.',
                            grammar: 'Al resumir información, distingue la fuente («menurut», «berdasarkan») del dato comunicado. Verbos como meningkat y menurun describen tendencias; comprueba qué magnitud cambia y en qué periodo.',
                            vocab: [
                                { id: 'b1u7_menurut', idn: 'Menurut', esp: 'Según; de acuerdo con', ex: 'Menurut laporan itu, jumlah pengunjung meningkat.', exEsp: 'Según ese informe, aumenta el número de visitantes.' },
                                { id: 'b1u7_berdasarkan', idn: 'Berdasarkan', esp: 'Basado en; según', ex: 'Berdasarkan data ini, harga berubah.', exEsp: 'Según estos datos, los precios cambian.' },
                                { id: 'b1u7_laporan', idn: 'Laporan', esp: 'Informe; reporte', ex: 'Laporan itu diterbitkan kemarin.', exEsp: 'Ese informe se publicó ayer.' },
                                { id: 'b1u7_meningkat', idn: 'Meningkat', esp: 'Aumentar; aumentar(se)', ex: 'Jumlah pengunjung meningkat tahun ini.', exEsp: 'El número de visitantes aumenta este año.' },
                                { id: 'b1u7_menurun', idn: 'Menurun', esp: 'Disminuir; bajar', ex: 'Penjualan menurun pada bulan lalu.', exEsp: 'Las ventas disminuyeron el mes pasado.' }
                            ],
                            exercises: [
                                { vocabId: 'b1u7_menurut', type: 'mc', prompt: '¿Qué introduce «menurut»?', options: ['La fuente o el punto de vista', 'Una orden', 'Una negación'], answer: 0, explanation: 'Menurut atribuye la información a una fuente o perspectiva.' },
                                { vocabId: 'b1u7_berdasarkan', type: 'translate_es_id', prompt: 'Traduce al indonesio: basado en', answer: 'Berdasarkan', explanation: 'Berdasarkan introduce la base o evidencia de una afirmación.' },
                                { vocabId: 'b1u7_laporan', type: 'mc', prompt: '¿Qué significa «laporan»?', options: ['Informe', 'Visitante', 'Precio'], answer: 0, explanation: 'Laporan es un informe o reporte.' },
                                { vocabId: 'b1u7_meningkat', type: 'translate_es_id', prompt: 'Traduce al indonesio: aumentar', answer: 'Meningkat', explanation: 'Meningkat describe un aumento.' },
                                { vocabId: 'b1u7_menurun', type: 'write', prompt: 'Escribe una frase que resuma una tendencia usando «menurun».', hint: 'Indica qué dato baja y cuándo.', modelAnswer: 'Jumlah kendaraan menurun tahun ini.', explanation: 'El ejemplo comunica una tendencia descendente.' }
                            ]
                        }
```

### U8

```js
{
                            id: 'b1_u8',
                            title: 'Unidad 8: Explicar procesos y resultados',
                            desc: 'Describe pasos de un proceso y reconoce formas pasivas en instrucciones e informes.',
                            grammar: 'En una descripción de procesos, la voz pasiva puede destacar el procedimiento o el elemento afectado. Identifica el verbo y aquello sobre lo que recae la acción; no supongas que toda frase con di- tiene el mismo foco discursivo.',
                            vocab: [
                                { id: 'b1u8_dilakukan', idn: 'Dilakukan', esp: 'Realizado; llevado a cabo', ex: 'Pemeriksaan dilakukan setiap pagi.', exEsp: 'La inspección se realiza cada mañana.' },
                                { id: 'b1u8_digunakan', idn: 'Digunakan', esp: 'Utilizado; usado', ex: 'Alat ini digunakan untuk mengukur suhu.', exEsp: 'Esta herramienta se utiliza para medir la temperatura.' },
                                { id: 'b1u8_diproses', idn: 'Diproses', esp: 'Procesado', ex: 'Data diproses oleh komputer.', exEsp: 'Los datos son procesados por la computadora.' },
                                { id: 'b1u8_dihasilkan', idn: 'Dihasilkan', esp: 'Producido; generado', ex: 'Energi dihasilkan dari matahari.', exEsp: 'La energía se genera a partir del sol.' },
                                { id: 'b1u8_langkah', idn: 'Langkah', esp: 'Paso; medida', ex: 'Langkah pertama adalah mencuci beras.', exEsp: 'El primer paso es lavar el arroz.' }
                            ],
                            exercises: [
                                { vocabId: 'b1u8_dilakukan', type: 'mc', prompt: '¿Qué expresa «dilakukan» en «Pemeriksaan dilakukan»?', options: ['La acción se lleva a cabo', 'La acción está prohibida', 'La acción acaba de empezar'], answer: 0, explanation: 'Dilakukan es una forma pasiva que indica que la acción se realiza.' },
                                { vocabId: 'b1u8_digunakan', type: 'translate_es_id', prompt: 'Traduce al indonesio: utilizado', answer: 'Digunakan', explanation: 'Digunakan indica que algo se utiliza.' },
                                { vocabId: 'b1u8_diproses', type: 'mc', prompt: 'En «Data diproses oleh komputer», ¿qué recibe la acción?', options: ['Los datos', 'La computadora', 'El proceso'], answer: 0, explanation: 'Data es el elemento procesado; oleh komputer identifica al agente.' },
                                { vocabId: 'b1u8_dihasilkan', type: 'translate_es_id', prompt: 'Traduce al indonesio: generado', answer: 'Dihasilkan', explanation: 'Dihasilkan significa producido o generado.' },
                                { vocabId: 'b1u8_langkah', type: 'write', prompt: 'Escribe dos pasos de un proceso usando «langkah».', hint: 'Empieza con Langkah pertama y añade un paso siguiente.', modelAnswer: 'Langkah pertama adalah mencuci beras. Langkah berikutnya adalah memasak nasi.', explanation: 'El modelo organiza dos pasos de un proceso.' }
                            ]
                        }
```

### U9

```js
{
                            id: 'b1_u9',
                            title: 'Unidad 9: Expresar opiniones y justificarlas',
                            desc: 'Formula una opinión, presenta razones y reconoce puntos de vista diferentes.',
                            grammar: 'Una opinión clara suele distinguir la postura de la razón que la apoya. Usa expresiones de acuerdo o diferencia con referencia a la propuesta concreta, no como respuestas aisladas.',
                            vocab: [
                                { id: 'b1u9_pendapat', idn: 'Pendapat', esp: 'Opinión; punto de vista', ex: 'Menurut pendapat saya, transportasi umum penting.', exEsp: 'En mi opinión, el transporte público es importante.' },
                                { id: 'b1u9_alasan', idn: 'Alasan', esp: 'Razón; motivo', ex: 'Apa alasan kamu memilih itu?', exEsp: '¿Cuál es tu razón para elegir eso?' },
                                { id: 'b1u9_setuju', idn: 'Setuju', esp: 'Estar de acuerdo', ex: 'Saya setuju dengan usulan itu.', exEsp: 'Estoy de acuerdo con esa propuesta.' },
                                { id: 'b1u9_berbeda', idn: 'Berbeda', esp: 'Diferente; diferir', ex: 'Pendapat kami berbeda.', exEsp: 'Nuestras opiniones son diferentes.' },
                                { id: 'b1u9_sebaliknya', idn: 'Sebaliknya', esp: 'Por el contrario; en cambio', ex: 'Dia tidak memilih kopi; sebaliknya, dia memilih teh.', exEsp: 'No eligió café; por el contrario, eligió té.' }
                            ],
                            exercises: [
                                { vocabId: 'b1u9_pendapat', type: 'mc', prompt: '¿Qué significa «pendapat»?', options: ['Opinión', 'Razón', 'Propuesta'], answer: 0, explanation: 'Pendapat se refiere a una opinión o punto de vista.' },
                                { vocabId: 'b1u9_alasan', type: 'translate_es_id', prompt: 'Traduce al indonesio: razón', answer: 'Alasan', explanation: 'Alasan expresa el motivo o la razón.' },
                                { vocabId: 'b1u9_setuju', type: 'mc', prompt: '¿Qué significa «setuju»?', options: ['Estar de acuerdo', 'Estar cansado', 'Estar disponible'], answer: 0, explanation: 'Setuju expresa acuerdo con una idea o propuesta.' },
                                { vocabId: 'b1u9_berbeda', type: 'translate_es_id', prompt: 'Traduce al indonesio: diferente', answer: 'Berbeda', explanation: 'Berbeda indica que dos cosas u opiniones no son iguales.' },
                                { vocabId: 'b1u9_sebaliknya', type: 'write', prompt: 'Escribe dos frases que presenten una idea y luego un contraste con «sebaliknya».', hint: 'Muestra dos elecciones o situaciones opuestas.', modelAnswer: 'Saya biasanya naik bus. Sebaliknya, adik saya naik sepeda.', explanation: 'Sebaliknya introduce el contraste con la idea anterior.' }
                            ]
                        }
```
