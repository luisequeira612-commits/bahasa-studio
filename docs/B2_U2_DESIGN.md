# Diseño preliminar B2 U2 — agente pronominal ligado y foco

**Estado:** diseño pedagógico preliminar; no implementado.  
**Fecha:** 7 nov 2026 (hora local).  
**Dependencia:** B2 U1 implementada (PR #437); U2 debe preceder a la integración prevista en U3.

## Propósito dentro del bloque U1–U3

U1 trabaja el contraste entre activa con `meN-` y pasiva con `di-`, con atención al agente, al participante afectado y al foco discursivo.

U2 propone estudiar una construcción con el participante afectado al inicio y un agente pronominal ligado al verbo mediante `ku-` o `kau-`. La unidad debe enseñar a reconocer la relación entre forma verbal, agente y contexto; no debe reducirse a una regla de traducción palabra por palabra ni etiquetarse como «pasiva» de manera universal.

U3 integrará los patrones ya enseñados. Por eso U2 debe proporcionar ejemplos suficientemente claros y un vocabulario controlado, sin anticipar otras familias de afijos de B2.

## Inventario candidato — pendiente de aprobación

Estas cuatro formas son propuestas de trabajo, no vocabulario aprobado ni contenido activo:

| Forma propuesta | Segmentación de trabajo | Función que se quiere enseñar |
|---|---|---|
| `kubaca` | `ku-` + `baca` | agente de primera persona |
| `kaubaca` | `kau-` + `baca` | agente de segunda persona |
| `kutulis` | `ku-` + `tulis` | agente de primera persona |
| `kautulis` | `kau-` + `tulis` | agente de segunda persona |

**No asignar IDs, glosas definitivas ni estado de verificación todavía.** No usar estas formas en ejercicios evaluados, claves de respuesta ni contenido ejecutable antes de que el dueño apruebe expresamente el inventario y sus ejemplos.

La página oficial EYD V indica que los pronombres ligados `ku-` y `kau-` se escriben unidos a la palabra siguiente: [EYD V — Kata ganti](https://ejaan.kemendikdasmen.go.id/eyd/penulisan-kata/kata-ganti/). Esta fuente respalda la convención ortográfica citada; por sí sola no valida la naturalidad, la distribución sintáctica ni todas las interpretaciones de los ejemplos.

## Objetivos propuestos

Después de completar U2, el estudiante podrá:

1. Reconocer el patrón de objeto o participante afectado antepuesto con agente pronominal ligado al verbo.
2. Distinguir el agente de primera persona asociado a `ku-` del agente de segunda persona asociado a `kau-`.
3. Identificar agente y participante afectado sin confundir el orden superficial con los roles semánticos.
4. Interpretar la construcción con ayuda del contexto, sin inferir tiempo verbal únicamente por la forma.
5. Comparar el patrón con construcciones activas y pasivas ya estudiadas en U1, sin afirmar que sean intercambiables en todo contexto.
6. Producir una reescritura guiada cuando los ejemplos y las formas hayan sido aprobados.

## Lecciones propuestas

### Lección 1 — Reconocer la forma y sus participantes

- Recuperar el vocabulario y los contrastes de U1.
- Presentar la segmentación `ku-` / `kau-` + verbo solo después de aprobar el inventario.
- Identificar quién realiza la acción y qué participante aparece como punto de partida.
- Distinguir el clítico ligado al verbo del pronombre independiente `kau`.
- Evitar explicar estas formas como simples contracciones mecánicas de pronombres independientes.

### Lección 2 — Interpretar el foco en contexto

- Trabajar con un diálogo breve y un texto corto que reutilicen objetos y verbos conocidos.
- Elegir la interpretación del agente según la forma y el contexto.
- Comparar el patrón con ejemplos de U1 y explicar qué participante queda en primer plano.
- No inferir tiempo o aspecto gramatical que la forma verbal no codifica por sí sola.
- Evitar la duplicación del agente, por ejemplo combinando sin motivo un pronombre independiente y el clítico ligado.

### Lección 3 — Reescribir y producir con guía

- Reordenar oraciones conservando los roles de agente y participante afectado.
- Detectar respuestas que cambien accidentalmente quién realiza la acción.
- Completar una secuencia breve a partir de un contexto y una intención comunicativa.
- Producción guiada: mini texto de 3–4 oraciones con una justificación sencilla del punto de partida elegido.
- No exigir producción libre de formas cuyo inventario siga pendiente.

## Banco de ejercicios previsto

Propuesta de **16 ejercicios combinados**, todavía sin consignas ni claves finales:

| Lección | Opción múltiple | Traducción contextual | Ordenación | Escucha | Escritura | Total |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 2 | 1 | 1 | 1 | 0 | 5 |
| 2 | 2 | 1 | 1 | 1 | 0 | 5 |
| 3 | 1 | 1 | 0 | 1 | 3 | 6 |
| **Total** | **5** | **3** | **2** | **3** | **3** | **16** |

Al implementar, al menos cinco ejercicios deben evaluar oraciones completas y al menos uno debe pedir producción original guiada. La escucha usará únicamente el mecanismo local ya existente. No añadir servicios ni dependencias.

## Guardarraíles

- Las cuatro formas de la tabla siguen pendientes de aprobación; no son vocabulario activo.
- No añadir IDs, glosas ni ejemplos evaluados hasta recibir aprobación explícita.
- No presentar `ku-` / `kau-` como meras contracciones ni imponer una única clasificación sintáctica universal.
- No afirmar que estas construcciones expresan por sí solas pasado, presente o aspecto.
- No equiparar mecánicamente `meN-`, `di-` y `ku-/kau-`.
- No alterar los roles semánticos al transformar una oración.
- Reutilizar vocabulario ya enseñado siempre que sea suficiente; cualquier término nuevo debe proponerse por separado al dueño.
- Mantener B2 oculta/no publicada.
- No modificar A1/A2/B1, IndexedDB, backup JSON v3, trackers ni dependencias.
- No afirmar validación nativa ni certificación MCER/BIPA.

## Condiciones para pasar a implementación

1. El dueño aprueba explícitamente las formas y sus glosas/ejemplos.
2. Se comprueba el inventario global de IDs y la procedencia de cada forma antes de crear entradas.
3. Las explicaciones y ejemplos distinguen con claridad agente, participante afectado y foco.
4. Las 16 actividades cumplen el contrato de variedad, frases completas, escucha local y producción guiada.
5. Las pruebas verifican referencias, coherencia entre consigna y respuesta, roles semánticos y ausencia de exposición anticipada.
6. U2 se implementa y supera CI antes de cerrar los ejemplos integradores de U3.

**Decisión pendiente del dueño:** aprobar o modificar las cuatro formas propuestas. «Continúa» significa continuar el trabajo permitido, no aprobar el inventario.


## Evidencia lingüística adicional (8 nov 2026)

Se realizó una comprobación documental para evaluar si las cuatro formas candidatas merecen seguir en el inventario propuesto. El resultado apoya conservarlas como **candidatas**, no aprobar automáticamente sus ejemplos ni afirmar naturalidad universal:

- Un artículo de Ni Luh Yaniasti y Kadek Yati Fitria Dewi, publicado en *Daiwi Widya: Jurnal Pendidikan* 11(1), junio de 2024, presenta explícitamente los ejemplos indonesios `Buku itu kubaca`, `Surat itu kutulis` y `Buku itu kaubaca`, y analiza `ku-` / `kau-` como formas ligadas al agente en una construcción con el objeto antepuesto. Esto respalda directamente tres de las cuatro combinaciones candidatas y el contraste de persona: https://ejournal.unipas.ac.id/index.php/DW/article/download/2017/1176 (págs. 101–102 del PDF).
- Una publicación lingüística del Pusat Bahasa / Balai Bahasa Yogyakarta (Sri Nardiati, 2007) enumera `kautulis` y `kutulis` como ejemplos de proclíticos en indonesio. Su objeto principal es el habla ceremonial javanesa y no aporta una oración contextual completa con `kautulis`; por tanto, se usa solo como corroboración limitada de la forma escrita, no como prueba de naturalidad del ejemplo didáctico: https://repositori.kemendikdasmen.go.id/3634/1/Struktur%20Frasa%20Nominal%20Pada%20Wicara%20Pernikahan%20Jawa.pdf (p. 14 del PDF).
- EYD V establece que `ku-` y `kau-` se escriben unidos a la palabra siguiente; su ejemplo incluye `kaubaca`. La regla ortográfica no demuestra por sí sola la distribución sintáctica ni la naturalidad de cada oración: https://ejaan.kemendikdasmen.go.id/eyd/penulisan-kata/kata-ganti/.

### Evaluación y límites

- `kubaca`: forma y patrón respaldados directamente por el artículo de 2024 y por EYD V.
- `kutulis`: forma y patrón respaldados directamente por el artículo de 2024.
- `kaubaca`: forma y patrón respaldados directamente por el artículo de 2024 y EYD V.
- `kautulis`: forma escrita corroborada por la publicación del Pusat Bahasa de 2007 y por el manual oficial de Badan Bahasa de 2016; un artículo académico de 2022 también la identifica como ejemplo de forma ligada `kau-`. Aun así, las dos fuentes más recientes no aportan una oración didáctica contextual completa. Mantenerla como candidata con evidencia morfológica/ortográfica mejorada, pero con menor confianza contextual.

La fuente de 2024 describe el patrón como pasivo, mientras que otros análisis pueden tratar la construcción desde la voz, el clítico o la estructura informativa. Se conserva por eso la cautela del diseño: enseñar primero agente, participante afectado y foco; no imponer una etiqueta sintáctica universal. Tampoco se deduce tiempo verbal de la forma aislada.

**Decisión del dueño sin cambios:** ninguna de las cuatro formas, glosas ni ejemplos queda aprobada por esta investigación. No se asignan IDs ni se implementa U2. La revisión documental reduce la incertidumbre sobre las formas, pero no sustituye la aprobación del inventario y de ejemplos concretos.


## Evidencia documental complementaria (8 nov 2026)

Se localizaron dos fuentes indonesias adicionales:

- **Badan Pengembangan dan Pembinaan Bahasa, _Penyuluhan Bahasa Indonesia untuk Pewara_ (2016), pp. 25–26 del PDF.** El manual oficial explica que el pronombre ligado `kau` se escribe unido al verbo y contrasta expresamente las grafías separadas `kau tulis`, `kau baca`, `kau sampaikan` con las formas correctas `kautulis`, `kaubaca`, `kausampaikan`. Es evidencia oficial de la convención ortográfica y de que `kautulis` es una forma escrita reconocida; no es un ejemplo discursivo completo. https://repositori.kemendikdasmen.go.id/15989/1/Penyuluhan%20Bahasa%20Indonesia%20Untuk%20Pewara.pdf
- **Jumiati, Erni y Rian Hidayat, “Analisis Referensi pada Kumpulan Cerpen Menghardik Gerimis Karya Sapardi Djoko Damono”, _SAJAK_ 1(2), junio de 2022, pp. 23–24.** El artículo identifica `ku-` (como en `kutulis`) y `kau-` (como en `kautulis`) como formas pronominales ligadas a la izquierda; su corpus también contiene usos contextuales de `ku-`, aunque no ofrece una oración completa con `kautulis`. https://journal.uir.ac.id/index.php/sajak/article/download/8345/4008/30937

**Ajuste de evaluación:** la forma `kautulis` ya no depende únicamente de la mención de 2007: tiene corroboración ortográfica oficial (2016) y morfológica académica (2022). Sigue teniendo menos evidencia de uso en una oración contextual completa que `kubaca`, `kutulis` y `kaubaca`, respaldadas por los ejemplos de 2024. Las cuatro siguen siendo candidatas; no se aprueban automáticamente glosas ni ejemplos y no se asignan IDs.


## Ejemplo contextual adicional de `kautulis` (8 nov 2026)

Se localizó un ejemplo en una fuente literaria indonesia alojada en el repositorio oficial del Ministerio de Educación:

- La antología *Puisi-Puisi Kenabian dalam Perkembangan Sastra Indonesia Modern* (repositorio Kemendikdasmen, p. 88 del PDF) incluye los versos «Kautulis kau paparkan / Kausampaikan dengan lisan». El contexto confirma que `kautulis` aparece en uso escrito literario indonesio, no solo en listas morfológicas u ortográficas: https://repositori.kemendikdasmen.go.id/16050/1/Puisi-Puisi%20Kenabian%20Dalam%20Perkembangan%20Sastra%20Indonesia%20Modern.pdf
- Alcance: es poesía, con paralelismo y sintaxis literaria; no constituye por sí sola un modelo neutral de conversación ni una oración didáctica de objeto antepuesto como «Surat itu kautulis». Aumenta la evidencia de uso contextual de la forma, pero no determina su frecuencia ni su registro cotidiano.
- Se excluye como evidencia para el indonesio una fuente de morfología de **bahasa Melayu** de Dewan Bahasa dan Pustaka (Abdullah Hassan, 2023), que considera janggal las formas `kutulis` y `kautulis` en su análisis del malayo. Es una advertencia útil contra la transferencia entre lenguas cercanas, pero no demuestra que las formas sean extrañas o incorrectas en indonesio: https://jendeladbp.my/app/uploads/woocommerce_uploads/2025/04/eDigital_Morfologi-qnsczr.pdf (pp. 177–178).

**Ajuste de confianza:** `kautulis` ahora cuenta con evidencia ortográfica oficial (2016), análisis morfológico académico (2022) y al menos un uso contextual literario indonesio (antología oficial, p. 88). La evidencia literaria no resuelve si conviene enseñarla como forma productiva de registro neutro. Las cuatro formas siguen pendientes de aprobación; no se asignan IDs ni se implementa U2.


## Segundo testimonio contextual oficial de `kautulis` (8 nov 2026)

Se encontró un testimonio independiente en la revista literaria **PUSAT**, publicada por Badan Pengembangan dan Pembinaan Bahasa:

- En el poema «Ada Banyak Hal», de Alex R. Nainggolan, la revista incluye «ada banyak hal, yang ingin kautulis» (PUSAT, núm. 06/2014, p. 18 impresa; PDF, líneas 470–503). La publicación identifica al organismo editor en la portada y acredita ISSN 2086-3934. Fuente primaria: https://repositori.kemendikdasmen.go.id/4285/1/Majalah%20Pusat%20edisi%206.pdf
- El ejemplo aporta un contexto sintáctico más informativo que una lista de formas: `kautulis` aparece en una relativa con el elemento escrito recuperable como `yang` («muchas cosas que quieres escribir»). Sigue siendo poesía y no permite concluir que sea la opción neutra o más frecuente en conversación.
- La fuente complementa, sin sustituir, el ejemplo de la antología de 2017 ya registrado arriba. Ambas publicaciones proceden del repositorio oficial de Kemendikdasmen; la revista PUSAT declara expresamente como editor a Badan Pengembangan dan Pembinaan Bahasa.

**Ajuste de confianza:** hay ahora dos testimonios literarios contextuales independientes de `kautulis` en publicaciones alojadas en el repositorio oficial, además del respaldo ortográfico (2016) y morfológico académico (2022). Esto confirma uso escrito literario en indonesio; no resuelve registro neutro, frecuencia conversacional ni si debe exigirse como producción activa en B2. Las cuatro formas siguen pendientes de aprobación.


## Referencia didáctica complementaria para `kubaca` (8 nov 2026)

Se localizó una referencia reciente en Hasbul, Wahyuni; Roni Juliansyah; Reni Kusmiarti; Apriyanto; Dian Septikasari; Amelia Warikar; y Jasmari, *Bahasa Indonesia: Pemahaman, Penggunaan, dan Pengembangan di Era Modern* (CV Pustaka Inspirasi Minang, primera edición, agosto de 2025, ISBN 978-634-96236-2-9), p. 51 impresa / p. 52 del PDF. En la sección «Elipsis, Permutasi, dan Topikalisasi», el libro ofrece «Buku itu sudah kubaca → Sudah kubaca buku itu» como ejemplo de permutación del orden de constituyentes para cambiar el foco o ajustarse a la comunicación. Fuente: https://repository.umb.ac.id/1494/1/EBOOK%20BAHASA%20INDONESIA%20PEMAHAMAN%2C%20PENGGUNAAN%2C%20DAN%20PENGEMBANGAN%20DI%20ERA%20MODERN.pdf

**Alcance:** es un ejemplo didáctico en una sección que trata estrategias sintácticas del uso cotidiano; no es una transcripción ni una muestra de corpus espontáneo. Corrobora que `kubaca` se utiliza como ejemplo gramatical contemporáneo en indonesio y encaja con el análisis de foco/orden, pero no demuestra frecuencia conversacional. No cambia el estatus candidato de `kubaca` ni aprueba la forma, glosa o una oración para B2 U2.


## Referencia académica sobre `kubaca`/`kaubaca` y foco discursivo (8 nov 2026)

Akihisa Matsuno, «テーマ・レーマとインドネシア語における受動の問題» [Theme/Rheme and the Problem of Passive in Bahasa Indonesia], *大阪外国語大学論集* (Osaka University of Foreign Studies), núm. 3 (1990), pp. 35–53, ofrece en p. 36 los pares:

- `Buku itu kubaca` / `Aku membaca buku itu` (primera persona).
- `Buku itu kaubaca` / `Engkau membaca buku itu` (segunda persona).

El artículo explica que `ku-`/`kau-` son formas ligadas del agente y que la elección y el orden se relacionan con el foco discursivo. También señala que clasificar estas construcciones de primera y segunda persona como pasivas puede ser discutible: propone analizar patrones y funciones informativas, no imponer una etiqueta única. Más adelante distingue construcciones con el objeto antepuesto de patrones con el verbo al inicio (`Kubaca buku itu`, `Kaubaca buku itu`). Fuente académica alojada por el repositorio institucional de Osaka University: https://ir.library.osaka-u.ac.jp/repo/ouka/all/79494/joufsns_03_035.pdf

**Alcance y cautelas:** la fuente es un artículo académico de 1990, útil para la descripción estructural y discursiva, pero no una medición actual de frecuencia ni una guía de registro conversacional. Aunque el autor comenta la frecuencia de patrones invertidos, el pasaje textual que usa para ilustrarla procede de una fuente malaya; no se debe convertir esa observación en una afirmación cuantitativa sobre el indonesio actual. La fuente respalda directamente `kubaca` y `kaubaca`, no `kutulis` ni `kautulis`. No se aprueban formas, glosas ni ejemplos didácticos por añadir esta referencia.


## Referencia académica descriptiva de `ku-`/`kau-` — 8 nov 2026

John W. M. Verhaar, «The Categorial System in Contemporary Indonesian: Verbs», *NUSA* 18, pp. 27–64, sección 6.7 (pp. 53–54 del PDF), describe `ku-` y `kau-` como proclíticos que representan al agente y explica que el participante afectado puede aparecer antes o después del verbo según parámetros discursivos. Ofrece, entre otros, los ejemplos `Surat-surat ini (sudah) kutandatangani` («Esos documentos ya los firmé»), `Kapan (akan) kauundang pacar saya?` («¿Cuándo vas/vas a invitar a mi novia?») y `Kamu akan kuberitahu` («Te lo haré saber»). También contrasta `Inilah surat yang kutandatangani, bukan yang kautandatangani` y distingue análisis ergativos/pasivos según foco y estructura. Fuente: https://sealang.net/archives/nusa/pdf/nusa-v18-p27-64.pdf

**Alcance:** fuente gramatical descriptiva para indonesio contemporáneo, útil como respaldo contextual independiente de la función de agente de `ku-`/`kau-` y de la flexibilidad de orden/foco; no valida directamente `kutulis` ni `kautulis` como ejemplos didácticos concretos, ni mide frecuencia actual o registro conversacional. Mantener la distinción entre las formas citadas y las cuatro candidatas de U2; ninguna queda aprobada por esta referencia.

## Referencia académica histórica para `kutulis`/`kautulis` (8 nov 2026)

Renate Eisengarten, *Die Funktionen des ke-an-Formativs in der Bahasa Indonesia* (disertación doctoral, Friedrich-Schiller-Universität Jena, 1976), sección 1.5.3.4, pp. 109–110 de la paginación impresa (pp. 108–110 del PDF), revisa críticamente las construcciones con `ku-` y `kau-`. La autora cita a Amin Singgih (1973, p. 49), quien enumera explícitamente `kutulis` (`aku tulis, saya tulis, kita tulis`), `kautulis` (`engkau tulis, kamu tulis, anda tulis`) y `ditulis` como formas que Singgih clasifica como `bentuk pasif/tanggap`. Eisengarten cuestiona que la etiqueta «pasiva» esté demostrada y propone describirlas morfológicamente como pronombre personal integrado sintéticamente con la raíz verbal; también explica que el clítico ligado puede acompañar al objeto antepuesto para destacarlo, con el ejemplo `Mobil kubeli` frente a `Aku membeli mobil`. Fuente: https://www.db-thueringen.de/servlets/MCRFileNodeServlet/dbt_derivate_00025838/Eisengarten-diss._A.pdf (pp. 109–110; sección 1.5.3.4).

**Alcance y cautelas:** es una disertación académica sobre indonesio que documenta una fuente gramatical de 1973; por tanto, aporta respaldo secundario explícito para las formas escritas `kutulis` y `kautulis` y para la interpretación de `ku-`/`kau-` como morfemas personales ligados. No es un corpus contemporáneo, no aporta un ejemplo discursivo completo con `kautulis` y no resuelve la frecuencia ni el registro conversacional actual. Su discusión refuerza la cautela contra imponer universalmente la etiqueta «pasiva». Las cuatro formas candidatas de U2 siguen pendientes de aprobación explícita; no se asignan IDs ni se implementa U2.


## Referencia morfológica académica complementaria para las cuatro formas (8 nov 2026)

Imamul Mutaqin, *Proses Pembentukan Derivasi dan Infleksi pada Rubrik Edukasi Kompas.com* (skripsi, Universitas Tidar, 2022), pp. 28–29 impresas, presenta `kubaca`, `kaubaca`, `kutulis` y `kautulis` como formas flexivas derivadas de `baca` y `tulis`. En la tabla 2.7 contrapone `menulis (catatan)`, `ditulis (Budi)`, `kutulis` y `kautulis (catatan)`; el texto atribuye la distinción de persona de los proclíticos a Ermanto (2008) y recoge la descripción de Bagiya (2017). Fuente: https://repositori.untidar.ac.id/index.php?bid=11351&fid=25888&p=fstream-pdf (pp. 28–29 impresas; PDF, líneas 1158–1200).

**Alcance y cautelas:** es una tesis de lingüística indonesia reciente que presenta las cuatro combinaciones en un paradigma morfológico coherente. Aunque el título de la investigación se refiere a la rúbrica educativa de Kompas.com, la tabla citada es una explicación teórica/ilustrativa y no evidencia de que las cuatro formas aparezcan en el corpus periodístico analizado. Por tanto, fortalece el respaldo académico de la formación y del contraste de persona, pero no demuestra frecuencia, naturalidad espontánea ni registro conversacional actual. Las cuatro formas siguen pendientes de aprobación explícita; no se asignan IDs ni se implementa U2.
