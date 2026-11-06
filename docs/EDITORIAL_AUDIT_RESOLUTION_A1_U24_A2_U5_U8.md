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
