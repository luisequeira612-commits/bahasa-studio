# Resolución documental de candidatos editoriales: A1 U24–U32 y A2 U5–U8

Fecha: 6 nov 2026  
Base: `main` posterior a PR #359; complemento de la auditoría inicial documentada en PR #360.

## Criterio

Esta pasada contrasta el sentido léxico y el uso visible en fuentes lexicográficas o didácticas. No equivale a revisión por hablante nativo. No se cambian estados de los trackers ni se asignan `verified_primary` o `cross_checked`: las fuentes web de esta nota sirven para decidir si hay un error editorial evidente, no para certificar todo el inventario. Cuando las fuentes no son independientes o no bastan para juzgar naturalidad, se conserva `not_checked`.

## Resolución de los siete candidatos

| Unidad | Elemento | Resultado de la revisión | Decisión |
|---|---|---|---|
| A1 U24 | `Murid` — «Alumno/a»; ejemplo «Soy estudiante» | Los repertorios consultados definen `murid` como persona que estudia/recibe enseñanza y lo relacionan con `pelajar` y `siswa`. «Estudiante» es una equivalencia española natural; no hay contradicción semántica. | **Sin cambio.** No es un error confirmado. |
| A1 U26 | `Seberang` — «al otro lado / enfrente» | Las definiciones recogen el lado opuesto y un lugar situado frente al hablante; el ejemplo «al otro lado de la calle» ilustra correctamente el primer sentido. | **Sin cambio.** La glosa contextual es defendible. |
| A1 U30 | `Ulangi` — «Repite / repita»; ejemplo «Por favor, repite» | `Tolong + verbo` se documenta como patrón de petición y `Tolong ulangi` aparece como «Please repeat». El indonesio no flexiona el imperativo por persona como el español; la alternancia «repite/repita» en la glosa ofrece dos registros de traducción. | **Sin cambio por ahora.** El ejemplo en tuteo no contradice la forma indonesia. Puede uniformarse el registro español en una futura pasada de estilo, no como corrección lingüística. |
| A1 U31 | `Senyum` — `Senyumnya manis` → «Su sonrisa es bonita» | La expresión `senyum manis` tiene un sentido figurado positivo (sonrisa atractiva/agradable), por lo que «bonita» puede ser idiomático y no literal. La evidencia recuperada remite a definiciones KBBI reproducidas; no constituye dos fuentes independientes para certificar naturalidad. | **Sin cambio; naturalidad no certificada.** Mantener la traducción idiomática provisional y dejar el punto como `not_checked` para validación lingüística futura. |
| A2 U7 | `Menggoreng` — `Ibu menggoreng nasi` → «Mamá fríe arroz» | `Menggoreng` es la acción de freír; `nasi goreng` es la frase nominal para el plato «arroz frito». Una fuente lingüística académica documenta expresamente `menggoreng nasi` como «fry rice». La frase curricular no dice `nasi goreng`. | **Sin cambio.** «Mamá fríe arroz» es una traducción literal coherente; no sustituir por «Mamá prepara arroz frito». |
| A2 U8 | `Memakai` — «Usar; llevar puesto»; ejemplo con `buku` | Diccionarios bilingües y materiales didácticos registran ambos sentidos: usar algo y llevar/vestir ropa. El ejemplo con libro ilustra «usar»; el modelo de producción `Saya memakai baju` ya ilustra «llevar puesto». | **Sin cambio.** Ambos sentidos están representados en la unidad; no es necesario duplicar otro ejemplo de vocabulario. |
| A2 U8 | `Memulai belajar` — repetición en vocabulario, escucha y modelo de escritura | Se encontró el ejemplo exacto `Saya memulai belajar` en material didáctico de indonesio, con el sentido «I begin to study». La repetición entre actividades parece servir de refuerzo, pero la búsqueda no reunió fuentes independientes suficientes para certificar naturalidad y preferencia frente a otras formulaciones. | **Sin cambio; naturalidad queda `not_checked`.** La repetición no es por sí sola un defecto. |

## Evidencia consultada

- `murid`: [Kamus SABDA — murid](https://kamus.sabda.org/kamus/murid) y [Tesaurus Tematis oficial — lema murid](https://tesaurus.kemendikdasmen.go.id/tematis/lema/murid).
- `seberang`: [Kamus SABDA — seberang](https://kamus.sabda.org/kamus/seberang) y [Cambridge — seberang](https://dictionary.cambridge.org/dictionary/indonesian-english/seberang).
- `ulangi`: [Indonesian Learning Journey — pedir que repitan](https://indonesianlearningjourney.com/indonesian-expressions/asking-for-help-clarification-indonesian/) y [Settemila Lingue — comandos y peticiones](https://www.settemilalingue.com/en/languages/id/grammar/basic-commands-and-requests).
- `senyum manis`: [Wikikamus — senyum manis](https://id.wiktionary.org/wiki/senyum_manis). La entrada remite a KBBI; no se cuenta como corroboración independiente.
- `menggoreng nasi`: [The Learner’s Dictionary of Today’s Indonesian](https://api.pageplace.de/preview/DT0400.9781000251845_A40102783/preview-9781000251845_A40102783.pdf), fragmento sobre verbos de cocina; y [Elon.io — nasi goreng frente a menggoreng nasi](https://elon.io/learn-hardcore-indonesian/lexicon/518272/saya-membeli-nasi-goreng-di-kantin-sekolah.).
- `memakai`: [Cambridge — memakai](https://dictionary.cambridge.org/dictionary/indonesian-english/memakai), [Wikikamus — memakai](https://id.wiktionary.org/wiki/memakai) y [SEASite — PAKAI](https://learnindonesianforfree.com/wp-content/uploads/2022/12/pakai-no-answers.pdf).
- `memulai belajar`: [Elon.io — belajar, usos y ejemplos](https://elon.io/learn-hardcore-indonesian/lexicon/348548/belajar). Fuente didáctica única para la frase exacta en esta pasada.

## Resultado

- Candidatos documentados en auditoría inicial: **7**.
- Errores curriculares confirmados por esta revisión: **0**.
- Cambios de vocabulario, glosas, ejemplos, ejercicios o explicaciones: **0**.
- Decisiones: **5 sin cambio con respaldo semántico/gramatical suficiente para descartar una corrección inmediata** (`Murid`, `Seberang`, `Ulangi`, `Menggoreng`, `Memakai`); **2 permanecen sin certificación de naturalidad** (`Senyum manis`, `Memulai belajar`).
- No se modificaron trackers/CSV, IndexedDB ni backup JSON v3.
- No se usaron servicios externos desde la app; esta es documentación de investigación editorial fuera de línea de ejecución curricular.

La revisión no certifica nivel CEFR, frecuencia, naturalidad nativa ni todos los matices regionales. Los dos puntos no certificados permanecen pendientes, sin bloquear el progreso del proyecto.


## Revisión complementaria: A2 U5, ejercicio de `bertanya` (6 nov 2026)

Se detectó un punto pedagógico que no estaba incluido entre los siete candidatos iniciales:

- La consigna «Traduce usando `Bertanya`: Le pregunto al profesor» exige la respuesta `Saya bertanya kepada guru.`
- `guru` sí está enseñado en A1 (entrada `v386`), por lo que no es vocabulario nuevo sin apoyo.
- `kepada` no aparece como entrada de vocabulario ni se explica en la gramática de A2 U5. Aparece en contextos posteriores de A2 (U15 y U22), pero eso no proporciona apoyo previo al estudiante de U5.
- Clasificación: **candidato de andamiaje didáctico**, no error lingüístico confirmado. `kepada` funciona aquí como elemento gramatical para introducir el complemento de destinatario; no se propone convertir automáticamente cada palabra funcional en una entrada de vocabulario.
- Acción recomendada para una futura edición curricular: añadir una nota breve de uso o una pista contextual antes de exigir la frase completa, o aceptar una respuesta más simple si el objetivo de la actividad es únicamente `bertanya`. No se modifica el ejercicio en esta pasada.

La revisión se basa en la comparación directa de A1/A2 y de la consigna, respuesta y gramática de U5. No certifica naturalidad nativa ni cambia estados del tracker. No se modifican vocabulario, ejercicios, glosas, explicaciones, CSV, IndexedDB ni backup JSON v3.


## Revisión de prerrequisitos A2 U9–U12 (6 nov 2026)

Alcance: inspección de las cuatro unidades en `curriculum-a2.js`, comparación de términos visibles en ejemplos con el vocabulario previo de A1 y A2, y recuento estructural. No se evalúa naturalidad nativa.

| Unidad | Vocabulario | Ejercicios | Candidatos observados |
|---|---:|---:|---|
| A2 U9 — Opiniones y preferencias | 12 | 17 | `berhasil` aparece en «Saya berharap berhasil», aunque se introduce como vocabulario en U12. |
| A2 U10 — Normas y permisos | 12 | 17 | `mengikuti` y `berlari` aparecen en ejemplos sin entrada previa de vocabulario. |
| A2 U11 — Problemas y soluciones | 12 | 17 | `pintu` aparece en ejemplos de `rusak` y `memperbaiki`, sin entrada previa de vocabulario identificada. |
| A2 U12 — Experiencia y objetivos | 12 | 17 | `menjadi` aparece en «Cita-cita saya menjadi guru» sin entrada previa de vocabulario identificada. |

Clasificación y límites:
- Son **candidatos de andamiaje léxico en ejemplos**, no errores lingüísticos confirmados. El ejemplo puede aportar contexto, pero conviene que el estudiante no dependa de una palabra aún no presentada para interpretar el objetivo.
- El caso de U9 es una dependencia hacia delante especialmente clara: `berhasil` se enseña en U12, tres unidades después.
- La comparación se limita a las entradas de vocabulario de A1 y a las unidades A2 anteriores a cada caso. No implica que toda palabra funcional o transparente deba convertirse en una entrada curricular.
- No se modifica vocabulario, glosas, ejemplos, ejercicios, explicaciones, trackers/CSV, IndexedDB ni backup JSON v3.
- Recuento comprobado: 48 términos y 68 ejercicios en U9–U12. La revisión no certifica naturalidad nativa ni nivel CEFR.


## Revisión de prerrequisitos A2 U13–U16 (6 nov 2026)

Alcance: inspección de los ejemplos de vocabulario y del inventario de las unidades U13–U16, comparando términos léxicos concretos con entradas de vocabulario previas en A1 y A2. Recuento: 12 términos y 17 ejercicios por unidad; 48 términos y 68 ejercicios en total.

| Unidad | Candidatos observados en ejemplos |
|---|---|
| A2 U13 — Compras, pagos y productos | `tas` (bolso), `barang` (artículo) y `pakaian` (ropa) no tienen entrada previa identificada. |
| A2 U14 — Viajes y transporte | `umum` (público) en `angkutan umum`; `berat` (pesado) y `ramai` (concurrido) no tienen entrada previa identificada. |
| A2 U15 — Invitaciones y planes | `kepada` reaparece en un ejemplo; ya está documentado como candidato de andamiaje en U5. No se duplica como hallazgo nuevo. |
| A2 U16 — Experiencias y vacaciones | `pantai` (playa) e `indah` (hermoso) no tienen entrada previa identificada; `Bali` es un nombre propio y no se trata como vocabulario general obligatorio. |

Clasificación:
- Son candidatos de andamiaje léxico contextual, no errores lingüísticos confirmados.
- Se priorizan sustantivos/adjetivos de contenido que pueden ser necesarios para comprender el ejemplo; no se propone convertir automáticamente partículas, preposiciones o nombres propios en entradas de vocabulario.
- La revisión compara las entradas curriculares previas; no certifica naturalidad nativa ni nivel CEFR.
- No se modifica currículo, vocabulario, glosas, ejemplos, ejercicios, explicaciones, trackers/CSV, IndexedDB ni backup JSON v3.


## Revisión de prerrequisitos A2 U6 (6 nov 2026; recuperación del PR #370)

Alcance: comparación de los sustantivos y términos de contenido en los ejemplos de U6 con el vocabulario presentado en A1 y en A2 U5. Inventario de U6: 12 términos y 17 ejercicios.

- Los sustantivos relevantes de los ejemplos —`buku`, `teman`, `kota`, `alamat`, `nasi`, `musik`, `rumah` y `guru`— ya aparecen en A1.
- Las raíces `tutup`, `tunggu`, `tetap`, `dengar`, `cari` y `jual` se mencionan en notas morfológicas; no se exigen como respuestas independientes antes de enseñar sus formas verbales.
- No se identifica un problema nuevo de secuenciación léxica en U6.
- No se certifica naturalidad nativa ni nivel CEFR. Sin cambios en currículo, vocabulario, ejercicios, glosas, explicaciones, trackers/CSV, IndexedDB o backup JSON v3.

## Revisión de prerrequisitos A2 U17–U20 (6 nov 2026)

Alcance: inspección de ejemplos de vocabulario y consignas, comparando términos de contenido con las entradas previas de A1 y A2 U5–U16. Recuento comprobado: 12 términos y 17 ejercicios por unidad; 48 términos y 68 ejercicios en total.

| Unidad | Candidatos observados en ejemplos |
|---|---|
| A2 U17 — Salud, consultas y cuidados | `kacang` (cacahuete/maní) aparece en el ejemplo de alergia y no tiene entrada previa identificada; `perawat` (enfermero/a) aparece en el ejemplo de presión arterial sin entrada previa identificada. `terhadap` se menciona en la gramática de la propia unidad, por lo que no se registra como vocabulario omitido. |
| A2 U18 — Vecindario y vivienda | `atap` (techo) aparece en el ejemplo de fuga sin entrada previa identificada. `sewa` aparece en el ejemplo del inquilino, pero se relaciona transparentemente con `menyewa`, ya enseñado en A2 U8; no se cuenta como hallazgo separado. El ejercicio de `pagar` incluye una advertencia explícita para evitar confundirlo con el verbo español «pagar». |
| A2 U19 — Trabajo y empleo | `perusahaan` (empresa) aparece en el ejemplo de oferta de empleo sin entrada previa identificada. `mengikuti` ya fue introducido en A2 U10, así que no se duplica como hallazgo. |
| A2 U20 — Medio ambiente y comunidad | `udara` (aire), `pohon` (árbol), `petani` (agricultor) y `hewan` (animal) aparecen en ejemplos sin entrada previa identificada. `musim kemarau` (estación seca) aparece en el ejemplo de ahorro de agua y también queda como candidato contextual. |

Clasificación y límites:
- Son candidatos de andamiaje léxico contextual, no errores lingüísticos confirmados. El ejemplo puede permitir inferir el significado, pero el estudiante podría necesitar esos términos para comprender el objetivo.
- Se excluyen como hallazgos duplicados las formas transparentemente relacionadas con vocabulario previo y los elementos ya explicados en la gramática.
- La comparación no certifica naturalidad nativa, frecuencia de uso ni nivel CEFR.
- No se modifica vocabulario, glosas, ejemplos, ejercicios, explicaciones curriculares, trackers/CSV, IndexedDB ni backup JSON v3.


## Revisión de prerrequisitos A2 U21–U24 (6 nov 2026)

Alcance: inspección de ejemplos de vocabulario y consignas de U21–U24, contrastando términos de contenido con las entradas previas de A1 y A2 U1–U20. Recuento estructural: 12 términos y 17 ejercicios por unidad; 48 términos y 68 ejercicios en total.

| Unidad | Candidatos observados en ejemplos |
|---|---|
| A2 U21 — Cultura y tradiciones | `bambu` (bambú) aparece en el ejemplo de artesanías; `candi` (templo/monumento) aparece en el ejemplo de patrimonio cultural. No se identifican como entradas previas. `adat` forma parte de la expresión `pakaian adat`; queda como posible apoyo contextual, no como palabra exigida de forma aislada. |
| A2 U22 — Noticias y comunicación digital | `tanggapan` (respuesta/reacción) aparece en el ejemplo de una publicación que recibe muchas reacciones; no se identifica entrada previa. `kata sandi` aparece en la unidad como término enseñado y no se cuenta como omisión. |
| A2 U23 — Servicios bancarios | `bank`, `pelanggan` (cliente) y `nomor` aparecen en ejemplos/consignas sin entrada previa identificada. `aplikasi` es transparente para un hispanohablante y se registra solo como observación de comprensión, no como candidato prioritario. |
| A2 U24 — Educación y formación | `situs` (sitio web) y `topik` (tema) aparecen en ejemplos sin entrada previa identificada. `bahasa`, `minggu` y `kursus` se enseñan o aparecen en el vocabulario de la propia unidad, por lo que no se cuentan como omisiones. |

Clasificación y límites:
- Son candidatos de andamiaje léxico en contexto, no errores lingüísticos confirmados. Algunos son transparentes o inferibles por contexto y no necesariamente requieren una nueva entrada curricular.
- Se evita contar palabras funcionales, formas derivadas transparentes, nombres propios o términos ya enseñados como nuevos hallazgos.
- Esta comparación no certifica naturalidad nativa, frecuencia de uso ni nivel CEFR.
- No se modifica vocabulario, glosas, ejemplos, ejercicios, explicaciones curriculares, trackers/CSV, IndexedDB ni backup JSON v3.


## Revisión de prerrequisitos A2 U25–U28 (6 nov 2026)

Alcance: comparación de términos de contenido en ejemplos de vocabulario y consignas con las entradas previas de A1 y A2 U1–U24. Inventario comprobado: 12 términos y 17 ejercicios por unidad; 48 términos y 68 ejercicios en total.

| Unidad | Candidatos observados |
|---|---|
| A2 U25 — Cocina y gastronomía | `sayuran` (verduras), `ikan` (pescado), `roti` (pan), `oven` (horno), `bawang` (cebolla) y `masakan` (comida/plato preparado) aparecen en ejemplos sin entrada previa identificada. `mengikuti` reaparece en «Saya mengikuti resep masakan itu», pero ya está documentado como candidato en U10 y no se duplica. |
| A2 U26 — Sentimientos y relaciones | `orang tua` (padres), `ujian` (examen), `komentar` (comentario) y `keputusan` (decisión) aparecen en ejemplos sin entrada previa identificada. |
| A2 U27 — Comunidad y servicios públicos | `kelurahan` aparece en la respuesta «Kelurahan ini berada di kecamatan tersebut», pero no figura entre las entradas de vocabulario de la unidad. Se registra como candidato contextual específico; no se convierte automáticamente en objetivo curricular. |
| A2 U28 — Ciencia y tecnología | `siswa` (estudiantes), `laboratorium` (laboratorio), `ponsel` (teléfono móvil) y `pengguna` (usuario) aparecen en ejemplos sin entrada previa identificada. `data pribadi` sí se enseña en la propia unidad y no se cuenta como omisión. |

Clasificación y límites:
- Son candidatos de andamiaje léxico contextual, no errores lingüísticos confirmados. Algunas palabras pueden inferirse por contexto o por derivación y no necesariamente requieren nuevas entradas.
- Se evita duplicar `mengikuti`, ya registrado en U10, y no se cuentan como omisiones los términos enseñados en la misma unidad.
- La comparación no certifica naturalidad nativa, frecuencia de uso ni nivel CEFR.
- Solo documentación; no se modifica vocabulario, glosas, ejemplos, ejercicios, explicaciones curriculares, trackers/CSV, IndexedDB ni backup JSON v3.
