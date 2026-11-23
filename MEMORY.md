## CI de PR #717 — ajuste de pruebas E2E Piper — 23 nov 2026
- El segundo CI (#45099002676) pasó regresión y todos los tests previos, pero falló en dos aserciones de `tests/browser-e2e.test.cjs` que todavía esperaban textos de atribución MMS. Las 31/33 pruebas E2E pasaron; ambas fallas eran expectativas antiguas frente al mensaje Piper correcto.
- Se actualizaron las dos aserciones para comprobar la grabación Piper y la atribución vigente del curso. No cambia el comportamiento de producción. Repetir CI completo y mantener PR #717 sin fusionar hasta que todo esté verde y no haya revisiones/hilos pendientes.

## CI de PR #717 — corrección de regresión — 23 nov 2026
- El primer CI detectó una única aserción obsoleta en `tests/regression.test.cjs`: aún exigía la atribución MMS eliminada, aunque los metadatos reales (`audio/metadata.json`) identifican `engine: piper` y atribuyen el modelo Piper. Se actualizó la prueba para leer y validar los metadatos reales además del mensaje visible. El fallo no indicaba un problema de reproducción; 84 de 85 subpruebas de regresión pasaron.
- Reejecutar CI completo antes de fusionar PR #717. No ampliar el alcance de esta corrección.

## Audio: atribución visible corregida — 23 nov 2026
- `audio-engine.js` identifica correctamente las grabaciones incluidas como Piper, coherente con `audio/metadata.json`; las voces del dispositivo siguen siendo un respaldo opcional. La corrección actualiza también las aserciones de `tests/audio-engine.test.cjs`.
- No se regeneran audios ni se modifican manifiestos, hashes, Service Worker, IndexedDB v1, backup JSON v3 o dependencias. La reproducción grabada, el gestor offline y el reconocimiento siguen siendo específicos de indonesio; la adaptación multiidioma de audio queda como siguiente fase coordinada, sin activar cursos.

## Recuperación del cargador curricular — 23 nov 2026
- Se corrigió `CurriculumLoader.load()`: si un script falla o carga sin publicar el registro esperado, la promesa rechazada ya no queda cacheada permanentemente; una siguiente solicitud puede reintentar la carga. Se añadió regresión que reproduce la carga malformada y verifica el segundo intento correcto.
- PR #715 documentó la integración de #714 y quedó fusionada en `main` (commit `db431bc39678afc1f826ba32bea755ee19cd1342`). Este cambio no activa idiomas ni cursos, no modifica IndexedDB v1, backup JSON v3, audio, UI ni dependencias.

## Núcleo multiidioma integrado — PR #714 — 22 nov 2026
- PR #714 (`feat/multilingual-core-20261123`) fusionada mediante squash en `main`, commit `29865d25960cbb17963baef59e894881f7c0de19`. CI del head `5e539b8e1e7e9c55b0d9226fc22d8b16bb6e55ef`, run `45097134644`: `test` y `Offline quality reports` completados con éxito; sin revisiones ni hilos pendientes.
- Se integraron el catálogo cerrado de diez idiomas, `CurriculumLoader`, `ProgressNamespace`, historial por idioma y perfiles adaptativos aislados. Solo indonesio sigue disponible; los otros nueve permanecen inactivos. No se añadió selector UI, audio multiidioma ni currículo pt-BR.
- IndexedDB v1, stores existentes y backup JSON v3 se conservan; la restauración reemplaza solo el SRS del idioma importado. La raíz UI continúa en español. Próxima fase: preparar integración de CourseData/audio/UI y el piloto pt-BR A1, sin activar contenido incompleto ni cambiar el orden de idiomas aprobado.

## Retirada de etiqueta visual de B2 — 22 nov 2026

- Se retiraron de la interfaz las etiquetas «En desarrollo» asociadas a B2: selector de nivel, vista de ruta y selector de salto de unidad. El selector de nivel muestra ahora unidades completadas/total.
- Se mantienen sin cambios las reglas de acceso/publicación y el límite de unidades visibles; este cambio solo elimina el texto de estado desactualizado, no publica ni desbloquea contenido.
- PR #711 fusionada en `main` (commit `4bc263e198ad0e21bb781f8ff58a1934590ef3e0`); CI de PR run `45082760119` y regresión post-merge run `45083052685` completados con éxito; GitHub Pages run `45083052365` desplegado correctamente.

## B2 U41–U45 integradas en main — PR #705 — 22 nov 2026

- U41: adjuntos de probabilidad/veracidad (§4.107); U42: reporte/atribución (§4.108); U43: elipsis del sujeto humano (§4.112); U44: elipsis de sujetos no humanos (§4.113); U45: retención de componentes del sintagma nominal (§4.114).
- Cada unidad contiene cinco lecciones authored y 16 ejercicios (3/3/3/3/4), cuatro tipos (mc, translate_es_id, order, write), cero vocabulario/IDs nuevos y sin audio. Los 80 ejercicios reutilizan ejemplos documentados de Sneddon et al. (2010); análisis y producción guiada en español, sin frases indonesias inventadas.
- Se actualizaron index.html, tests/load-inline-b2-curriculum.test.mjs, roadmap y AGENTS.md; cinco diseños U41–U45. PR #705 fusionada en main (commit a8ea1c2d3380fee3e393968ee8479373e6303168). U41–U45 siguen ocultas/no publicadas.
- No cambia IndexedDB v1, backup JSON v3, biblioteca Piper ni dependencias. La prueba estructural no es validación nativa ni certificación MCER/BIPA.

## B2 U36–U40 implementadas en lote — 22 nov 2026

- U36–U40 se añadieron juntas en la rama `curriculum/b2-u36-u40-discourse-20261122`: U36 conectores de consecuencia/explicación (§§4.101–4.102); U37 ejemplificación (§4.103); U38 secuencia temporal (§4.104); U39 cohesión integrada (§§4.98–4.104); U40 adjuntos de sentimiento y opinión (§4.106).
- Cada unidad tiene cinco lecciones authored y 16 ejercicios (3/3/3/3/4), cuatro tipos (mc, translate_es_id, order, write), cero vocabulario/IDs nuevos y sin audio. Ejemplos fuente de Sneddon et al. (2010); no se inventan oraciones indonesias para rellenar ejercicios. U36–U40 permanecen ocultas/no publicadas.
- Se actualizaron index.html, pruebas de currículo/progresión/inventario, roadmap, AGENTS.md y cinco diseños U36–U40. No modifica IndexedDB v1, backup JSON v3, biblioteca Piper ni dependencias. CI/PR pendientes; no equivale a validación nativa ni certificación MCER/BIPA.

## B2 U35 integrada en main — 22 nov 2026

- U35 desarrolla conectores de contraste entre oraciones según Sneddon et al. (2010), §§4.98–4.100. Cinco lecciones authored, 16 ejercicios, cuatro tipos, sin vocabulario/IDs nuevos ni audio; permanece oculta/no publicada.
- PR #703 fusionada mediante squash en commit `b77988ca2e29b4a561f5e0689ed1fe1f0d2f276e`. CI del head `86e848716cb3819dd53dc0086fde73fd6db2f040`, run `45069343063`: `test` y `Offline quality reports` completados con éxito; sin revisiones, comentarios ni hilos pendientes.
- Inventario B2 integrado: U1–U35, 175 lecciones authored. No modifica IndexedDB v1, backup JSON v3, biblioteca de audio ni dependencias. La fuente y las pruebas estructurales no equivalen a validación nativa ni certificación MCER/BIPA.

## B2 U33 integrada en main — 22 nov 2026

- U33 desarrolla la correlación escalar `jangankan … pun` según Sneddon et al. (2010), §4.97. `jangankan` introduce el primer miembro y `pun` marca el segundo, al que también se aplica la predicación; la lectura escalar depende del contexto.
- Usa únicamente los tres ejemplos documentados en §4.97. Cinco lecciones authored, 16 ejercicios (3/3/3/3/4), cuatro tipos (mc, translate_es_id, order, write). Sin vocabulario/IDs nuevos ni audio. U33 permanece oculta/no publicada.
- Diseño: `docs/B2_U33_DESIGN.md`; roadmap, AGENTS.md, MEMORY.md, inventario y tests de progresión actualizados. No modifica IndexedDB v1, backup JSON v3 ni dependencias.
- PR #700 fusionada en `main` el 22 nov 2026 (commit `7e95ab15131b86e9829b57159a7e633a44c2913d`): B2 U32 integrada; CI del head `97a858172b870832bad0c73a3b4a92a85a69318f` (run `45052156811`) completó `test` y `Offline quality reports` con éxito. La prueba de U28 se ajustó para leer `modelAnswer` además de `answer`, sin cambiar el contenido de la unidad.
- PR #701 fusionada en `main` el 22 nov 2026 (commit `893cb4c329bb61bb47052b9dad509d9b29f3c4b1`); CI run `45055365782` completó `test` y `Offline quality reports` con éxito. El inventario B2 queda en 33 unidades y 165 lecciones authored. La fuente y las pruebas estructurales no equivalen a validación nativa ni certificación MCER/BIPA.

## B2 U32 implementada en rama — 22 nov 2026

- U32 desarrolla `kalau/apabila … maka` según Sneddon et al. (2010), §4.96. Los dos conectores condicionales introducen la cláusula de condición; `maka` introduce la cláusula que expresa la consecuencia. Se evita repetir las condiciones básicas de B1 U18.
- Usa únicamente los dos ejemplos documentados de §4.96. Cinco lecciones authored, 16 ejercicios (3/3/3/3/4), cuatro tipos (mc, translate_es_id, order, write). Sin vocabulario/IDs nuevos ni audio. U32 permanece oculta/no publicada.
- Diseño: `docs/B2_U32_DESIGN.md`; rama `curriculum/b2-u32-kalau-maka-20261122`. Se corrigió una llave duplicada en el bloque de U28 antes de U29; commit correctivo `4862fa2170a789b22679bd4ed2fbc42a22bd6dfa`. PR #700 fusionada en `main` (commit `7e95ab15131b86e9829b57159a7e633a44c2913d`); CI completo verde en run `45052156811`.
- Fuente y pruebas estructurales no equivalen a validación nativa ni certificación MCER/BIPA. No modifica IndexedDB v1, backup JSON v3 ni dependencias.

## B2 U31 implementada en rama — 22 nov 2026

- U31 desarrolla `entah … entah` según Sneddon et al. (2010), §4.95: alternativas no resueltas, elipsis de elementos compartidos y posición variable de la cláusula de resultado.
- Usa solo tres ejemplos documentados de la fuente; no añade vocabulario/IDs ni audio. Cinco lecciones authored, 16 ejercicios ([3,3,3,3,4]), cuatro tipos (mc, translate_es_id, order, write); U31 permanece oculta/no publicada.
- Se actualizan el roadmap, AGENTS.md, MEMORY.md y las pruebas de inventario/progresión. No se modifican IndexedDB v1, backup JSON v3 ni dependencias. Rama: `curriculum/b2-u31-entah-entah-20261122`; pendiente CI completo y revisión del PR.

## B2 U30 implementada en rama — 22 nov 2026

- U30 desarrolla **baru** como marcador de foco temporal «no hasta / solo entonces», Sneddon et al. (2010), §4.94. Cinco lecciones authored, 16 ejercicios ([3,3,3,3,4]), cuatro tipos (mc, translate_es_id, order, write), sin vocabulario/IDs nuevos.
- Cuatro ejemplos source-bound: `Baru setelah keluar dari desa ketiga tokoh kita dapat naik dokar.`, `Baru pukul sepuluh berita itu diketahui.`, `Sore hari, sehabis bekerja, baru kita pulang.`, `Malam harinya baru aku pergi ke Hotel Homan.`. Enseña baru ante la cláusula temporal, ante el adjunto temporal y antes de la cláusula principal; distingue «no hasta» de «nuevo».
- U30 permanece oculta/no publicada. No modifica IndexedDB v1, backup JSON v3 ni dependencias. Rama: `curriculum/b2-u30-baru-not-until-20261122`. Pendiente: CI completo, revisión y posible fusión solo con CI verde y sin revisiones/comentarios pendientes.

## B2 U29 implementada en rama — 22 nov 2026

- U29 desarrolla la concesión escalar de Sneddon et al. (2010), §4.93: **bagaimanapun/betapapun + adjetivo + -nya ... namun/toh**. Cinco lecciones authored, 16 ejercicios ([3,3,3,3,4]), cuatro tipos (mc, translate_es_id, order, write), sin vocabulario/IDs nuevos.
- Ejemplos source-bound: `Betapapun baiknya orang Eropah itu pada kita, toh mereka takut mengambil risiko.` y `Bagaimanapun terbukanya pemikiran Nurcholish, di kalangan kebanyakan umat pemikiran itu agak susah diterima.`. Enseña -nya adjunto al adjetivo, namun/toh y la omisión documentada de namun.
- Distingue el bagaimanapun de enlace discursivo remitido a §4.100/U35. U29 permanece oculta/no publicada. No modifica IndexedDB v1, backup JSON v3 ni dependencias. Rama: `curriculum/b2-u29-bagaimanapun-betapapun-20261122`. Pendiente: CI completo, revisión y posible fusión solo con CI verde y sin revisiones/comentarios pendientes.

## B2 U28 implementada en rama — 22 nov 2026

- U28 desarrolla la preferencia de Sneddon et al. (2010), §4.92: **lebih baik/sebaiknya ... daripada**. Cinco lecciones authored, 16 ejercicios ([3,3,3,3,4]), cuatro tipos (mc, translate_es_id, order, write), sin vocabulario/IDs nuevos.
- Ejemplos source-bound: `Daripada mati kelaparan, lebih baik kita pindah saja.` y `Sebaiknya mereka menyerah saja, daripada melawan.`. Cubre también el orden flexible de las cláusulas y `saja` como refuerzo frecuente documentado.
- U28 permanece oculta/no publicada. No modifica IndexedDB v1, backup JSON v3 ni dependencias. Rama: `curriculum/b2-u28-lebih-baik-daripada-20261122`. Pendiente: CI completo, revisión y posible fusión solo con CI verde y sin revisiones/comentarios pendientes.

## B2 U27 implementada en rama — 22 nov 2026

- U27 desarrolla la correlación concesiva de Sneddon et al. (2010), §4.91: **meskipun/meski/biarpun ... namun/toh/juga**. Cinco lecciones authored, 16 ejercicios ([3,3,3,3,4]), cuatro tipos (mc, translate_es_id, order, write), sin vocabulario/IDs nuevos.
- Ejemplos source-bound usados: `Meskipun sawahnya banyak, namun kenikmatan hidup sedikit.`, `Biarpun sumbangannya tidak seberapa, namun dia mempunyai peranan dalam proyek raksasa ini.`, `Meski keterangan Suryaman seru, toh terasa kurang meyakinkan.`, `Meskipun hujan lebat, si Amat pergi juga.` y `Meskipun sakit, namun anak-anak ini toh sekolah juga.`. La unidad también enseña la estructura relacionada `Dia tidak diundang, tetapi dia datang juga.`.
- U27 permanece oculta/no publicada. No modifica IndexedDB v1, backup JSON v3 ni dependencias. Rama: `curriculum/b2-u27-meskipun-namun-20261122`. Pendiente: CI completo, revisión y posible fusión solo con CI verde y sin revisiones/comentarios pendientes.

## B2 U24 implementada en rama — 22 nov 2026

- U24 desarrolla la correlación de grado–resultado `begitu/demikian/sedemikian ... sehingga/sampai`. Cinco lecciones authored, 16 ejercicios ([3,3,3,3,4]), cuatro tipos (mc, translate_es_id, order, write), sin vocabulario/IDs nuevos.
- Fuente principal: Sneddon, Adelaar, Djenar & Ewing (2010), *Indonesian: A Comprehensive Grammar*, 2.ª ed., §4.88. Ejemplos documentados usados: `Dia begitu gembira, sehingga dia menangis.`, `Harganya sedemikian mahal, sehingga tidak ada yang mau beli.`, `Dia demikian lelah, sampai tidak dapat berjalan lagi.`, `Udara sedemikian panasnya, sampai banyak orang pingsan.` y `Dia lari begitu cepat sehingga sangat sukar untuk memotretnya.`
- U24 se mantiene source-bound: no se inventan oraciones indonesias nuevas para rellenar ejercicios. No añade audio Piper ni vocabulario.
- U24 permanece oculta/no publicada. No modifica IndexedDB v1, backup JSON v3, A1/A2/B1 ni dependencias.
- Rama: `curriculum/b2-u24-begitu-sehingga-20261122`, basada en U23 para mantener la secuencia U22 → U23 → U24. Pendiente: CI completo y revisión del PR.

## B2 U23 implementada en rama — 22 nov 2026

- U23 desarrolla otras correlativas con `bukan` mediante `asal(kan)`, que introduce una condición sobre la acción de la primera cláusula. Cinco lecciones authored, 16 ejercicios ([3,3,3,3,4]), cuatro tipos (mc, translate_es_id, order, write), sin vocabulario/IDs nuevos.
- Fuente principal: Sneddon, Adelaar, Djenar & Ewing (2010), *Indonesian: A Comprehensive Grammar*, 2.ª ed., §4.87. Ejemplo central documentado: `Saya bukan tidak rela kau membantu familimu, asal kau pertimbangkan juga kebutuhan kita sendiri.`
- U23 se mantiene source-bound porque §4.87 ofrece un ejemplo completo central: los ejercicios de producción controlada reproducen ese ejemplo en lugar de inventar nuevas oraciones indonesias.
- U23 permanece oculta/no publicada. No modifica IndexedDB v1, backup JSON v3, A1/A2/B1 ni dependencias. No añade audio Piper todavía.
- Rama: `curriculum/b2-u23-bukan-asalkan-20261122`, basada en la rama de U22 para mantener la secuencia. Pendiente: CI completo y revisión del PR.

## B2 U22 implementada en rama — 22 nov 2026

- U22 profundiza la adición escalar: `bukan hanya ... melainkan/tetapi juga` y la variante documentada `tidak hanya ... tetapi juga`. Cinco lecciones authored, 16 ejercicios ([3,3,3,3,4]), cuatro tipos (mc, translate_es_id, order, write), sin vocabulario/IDs nuevos.
- Se corrigió la unidad para usar únicamente ejemplos indonesios documentados: Sneddon et al. (2010), §4.86; y *Tata Bahasa Baku Bahasa Indonesia* (2017), §8.2.2.2. Se eliminó la dependencia de ejemplos inventados/atribuciones imprecisas.
- U22 permanece oculta/no publicada. No cambia IndexedDB v1, backup JSON v3, A1/A2/B1 ni dependencias. No añade audio Piper todavía porque no incorpora formas léxicas nuevas y ya cumple cuatro tipos.
- Rama: `curriculum/b2-u22-bukan-hanya-20261122`. Pendiente: ejecutar CI completo, revisar resultados y preparar/fusionar PR solo si todo queda verde y sin revisiones pendientes.

## B2 U21 en rama — 22 nov 2026

- U20 quedó fusionada en main mediante PR #688. B2 U1–U20 están implementadas; U1–U5 visibles, U6–U20 ocultas.
- U21 aborda corrección contrastiva: bukan/bukannya ... melainkan/tetapi, alcance de la negación exterior/interior y contraste verbal tidak ... melainkan.
- Fuente: Sneddon et al. (2010), *Indonesian: A Comprehensive Grammar*, 2.ª ed., §§4.83–4.84.
- Cinco lecciones authored, 16 ejercicios, cuatro tipos (mc, translate_es_id, order, write), un nuevo ID léxico b2u21_melainkan. Seis frases completas fuente más el headword aislado melainkan: siete clips Piper generados/verificados en el workflow 44986204234. IDs: 8b6bd776f5d7, ddbb57c323ac, 26b2f02eadfb, 7079c47a4194, aba66f1d776e, 1b4bf93e7a67 y fcf0fcff37f5.
- U21 permanece oculta/no publicada. U22–U60 siguen siendo propuestas del roadmap, no unidades implementadas.
- Audio en main antes de U21: 2.261 IDs indexados, 148 textos B2; Rama de audio: 2.268 IDs, 155 textos B2; audio/index.json, audio/manifest.json y audio/metadata.json sincronizados. Pruebas específicas de generación/manifiesto pasaron; CI de regresión completo pendiente.
- Ramas: curriculum/b2-u21-bukan-melainkan-20261122 y audio/library-B2-44986204234. PR #689 abierto desde la rama audio/library-B2-44986204234; CI completo del PR pendiente.

## B2 U20 fusionada en main mediante PR #688 — 22 nov 2026
- U20 desarrolla baik … maupun con cinco lecciones authored y 16 ejercicios (3/3/3/3/4), cuatro tipos (mc, order, translate_es_id, write), cinco ejemplos completos documentados y producción guiada. Cubre paralelismo sintáctico, lectura negativa «ni…ni», omisión documentada de baik y coordinación de más de dos miembros. No añade vocabulario/IDs. Cinco clips Piper (MP3/Opus) generados y verificados en el workflow 44984996460; IDs: aaea322c234f, 53ab5e861d20, 1358c0f87fdd, fb0ab6b6fbed y 36f1d5be2e3d. audio/index.json, audio/manifest.json y audio/metadata.json tienen 2.261 entradas/hashes; B2 148. La prueba de manifiesto y generación pasó. La unidad sigue oculta/no publicada. Fuente: Sneddon et al. (2010), §4.82; diseño en docs/B2_U20_DESIGN.md.
- Se preparó la secuencia de trabajo U20–U60 en docs/B2_U20_U60_ROADMAP.md, basada en Sneddon et al. (2010), §§4.81–4.118 y capítulos 2–3. La propuesta diferencia lo ya enseñado en B1/B2 y no equivale a certificación MCER/BIPA. U21–U60 aún no están implementadas.
- Validación: generación y pruebas de manifiesto Piper pasaron. Las dos primeras regresiones detectaron listas fijas antiguas que esperaban B2 U1–U19: se corrigieron en tests/load-inline-b2-curriculum.test.mjs y tests/multi-lesson-progression.test.cjs para incluir U20 (commits db27a2b y 0ef8f2f). Una ejecución posterior detectó una carrera en browser-e2e.test.cjs: el test A1 modificaba el progreso antes de que App.init terminara de hidratar DB. Se añadió espera por App.studyActivity y los arrays de progreso antes de preparar el test. CI final pendiente. No se afirma ejecución local. Sin cambios a IndexedDB v1, backup JSON v3, A1/A2/B1 ni dependencias.

## B2 U19 implementada y audio Piper generado — 22 nov 2026
- U19 tiene cinco lecciones authored y 16 ejercicios ([3,3,3,3,4]) sobre relativas nominalizadas con `yang`, omisión del nombre antecedente, funciones de sujeto/objeto/predicado, voz pasiva, cláusulas identificativas, foco y negación.
- Cinco ejercicios `listen` emparejados con cinco objetivos de traducción de frases completas; cinco tipos de ejercicio: mc, fill, listen, translate_es_id y write. Reutiliza `yang`, `bukan`, `tidak` y `-lah`; `vocab: []`, cero IDs léxicos nuevos.
- Cinco textos Piper de producción en MP3 y Opus; voz `id_ID-news_tts-medium`. IDs de audio: `01bc30ebf218`, `534cd801f050`, `7793f3b10fea`, `8e29a146a860` y `e0948e008caf`. Correspondencias: `Yang dibangun Pak Dani tidak begitu besar.`, `Yang itu teman saya.`, `Bukan saya yang selalu terlambat.`, `Hadi yang berangkat tadi.`, `Andi memilih yang besar.`.
- Biblioteca resultante: 2.256 IDs indexados y 143 textos asociados a B2. Manifiesto, índice, metadata, huellas y Service Worker sincronizados.
- B1 U15–U17 ya cubren relativas básicas con nombre expreso; U19 no repite esa base ni la construcción verbal con `-nya` de B2 U9.
- Fuente: Sneddon, Adelaar, Djenar & Ewing (2010), *Indonesian: A Comprehensive Grammar*, 2.ª ed., §§3.92–3.94, 3.131–3.135 y 4.114. La fuente gramatical no equivale a validación nativa ni certificación MCER/BIPA.
- U19 permanece oculta/no publicada. No modifica IndexedDB v1, backup JSON v3 ni dependencias.
- Fuente de implementación: PR #686, rama `curriculum/b2-u19-nominalised-relatives-20261122`, `docs/B2_U19_DESIGN.md` y `docs/audio-requests/B2_U19.json`.

## B2 U18 implementada y audio Piper generado — 22 nov 2026
- U18 incorpora cinco lecciones authored y 16 ejercicios ([3,3,3,3,4]) sobre complementos de intención: órdenes, peticiones, presión y advertencias; sujeto compartido/omitido, pasiva, negación y contraste estructural entre `supaya/agar` y `untuk`. Seis tipos de ejercicio; cinco ejercicios `listen`.
- Cuatro IDs canónicos nuevos: `b2u18_menyuruh`, `b2u18_memerintahkan`, `b2u18_mendesak` y `b2u18_minta`. Reutiliza `b1u5_mengingatkan` sin duplicar el ID. Se corrigió la prueba para conservar como oración completa el ejemplo fuente `Saya menyuruhmu supaya kamu membaca buku itu.`; U18 incluye al menos cinco objetivos de respuesta en frases completas.
- Piper generó diez textos nuevos (cuatro formas y seis ejemplos fuente) en MP3 y Opus. IDs de audio nuevos: `578a8e9183d6`, `1e54fdc32d81`, `c810f679b652`, `cb492c1516eb`, `fc6fe1f1a688`, `e45975a7a59e`, `0b2e10d6bbbd`, `b7d1bae480c0`, `3d47d8069f23` y `e05adaad7596`. El audio de `mengingatkan` se reutiliza del ID B1; no se genera una copia nueva.
- Biblioteca resultante: 2.251 IDs indexados, 138 textos asociados a B2 (11 asociaciones de U18: 10 IDs nuevos más la asociación B2 del ID B1 reutilizado). Voz `id_ID-news_tts-medium`; manifest, index, metadata, SHA-256 y Service Worker sincronizados.
- La primera solicitud falló porque incluía `mengingatkan` como forma B2 independiente; se corrigió en `docs/audio-requests/B2_U18.json` (requestVersion 2). El dispatch Piper, la generación y las pruebas del generador terminaron correctamente.
- U18 permanece oculta/no publicada; U1–U5 siguen visibles. Las cuatro entradas nuevas quedan `not_checked`; las fuentes respaldan el análisis, pero no equivalen a validación nativa ni certificación MCER/BIPA. No cambia IndexedDB v1, backup JSON v3 ni dependencias.
- Fuente: rama `audio/library-B2-44976644327`, PR #685, `docs/B2_U18_DESIGN.md`, `docs/audio-requests/B2_U18.json`; Sneddon et al. (2010), §§3.122–3.129.

## B2 U17 implementada — 22 nov 2026
- U17 añade cinco lecciones authored y 16 ejercicios ([3,3,3,3,4]) sobre discurso referido: declaraciones con `bahwa`, preguntas indirectas de sí/no con `apakah/apa` y preguntas de información con palabras interrogativas integradas.
- Dos IDs nuevos y globalmente únicos: `b2u17_bahwa` y `b2u17_apakah`. Se reutilizan los verbos y vocabulario de B1 (p. ej., mengakui, percaya, tahu); no se duplican IDs. Los ejemplos indonesios se toman de Sneddon et al. (2010), §§3.111 y 4.28–4.30; Sneddon (2000), cap. Questions; y DLI Indonesian SOLT I, Module 6 Lesson 6.
- Se generan seis clips Piper de producción (MP3 y Opus) para las dos formas y cuatro ejemplos. IDs: `7e1e2b1aa5a2`, `3949453b1c17`, `e3a330100635`, `e6d6199706c5`, `0ce903146758`, `6cc4f8359add`. Se añaden dos ejercicios `listen`, uno para cada forma nueva (`bahwa` y `apakah`), con sus clips Piper. Las dos entradas siguen `not_checked`; evidencia gramatical no equivale a validación nativa ni certificación MCER/BIPA.
- U17 permanece oculta/no publicada; U1–U5 siguen visibles. Sin cambios a A1/A2/B1, IndexedDB v1, backup JSON v3 ni dependencias. La biblioteca Piper queda en 2.241 IDs y 127 textos B2 (seis de U17), voz `id_ID-news_tts-medium`.
- Autorización autónoma del dueño, 21 nov 2026: continuar B2 por lotes sin pedir aprobación individual por unidad o palabra; no habilita publicar U6–U60.
- Fuente: PR de implementación B2 U17, `docs/B2_U17_DESIGN.md`, `docs/audio-requests/B2_U17_retry.json`; Sneddon et al. (2010), Sneddon (2000), DLI SOLT I.

## B2 U16 implementada — 22 nov 2026
- U16 incorpora cinco lecciones authored y 16 ejercicios ([3,3,3,3,4]) sobre foco restrictivo/selectivo: posición de hanya/cuma/saja, alcance del predicado frente al objeto, cuma frente a hanya por registro y terutama frente a exclusividad.
- Dos IDs canónicos nuevos: `b2u16_cuma` y `b2u16_terutama`. Se reutilizan hanya y saja ya vistos en ejemplos A2/B1; no se crean IDs duplicados. Ejemplos publicados: `Mereka cuma minum teh.`, `Tadi pagi saya makan roti saja.`, `Cuma teh yang mereka minum.` y `Kenaikan pendapatan itu terutama berasal dari pajak.`.
- Cuatro clips Piper MP3/Opus para cuma, terutama y sus dos ejemplos de vocabulario. IDs de audio: `f0c3175631be`, `3251300d4372`, `5b13931e1b71`, `4444d433c2fc`. Biblioteca: 2.235 IDs, 121 textos B2 (98 U1–U8, 15 U11, 4 U15, 4 U16). Voz `id_ID-news_tts-medium`; sin tareas de escucha.
- U16 permanece oculta/no publicada; U1–U5 siguen visibles. No cambia IndexedDB v1, backup JSON v3 ni dependencias. Las fuentes respaldan los ejemplos, pero no hay validación nativa ni certificación MCER/BIPA; las dos entradas quedan `not_checked`.
- Autorización autónoma del dueño, 21 nov 2026: continuar B2 y añadir vocabulario/mejoras sin pedir aprobación individual por unidad o palabra. La autorización no habilita activar U6–U60.
- Fuente: branch `curriculum/b2-u16-limiters-20261122`, `docs/B2_U16_DESIGN.md`, `docs/audio-requests/B2_U16.json`; Sneddon et al. (2010, §§2.217–2.218), Kroeger (2014, §4.2.2), Kardana (2013).

## B2 U15 implementada — 21 nov 2026
- U15 añade cinco lecciones authored y 16 ejercicios ([3,3,3,3,4]) sobre la partícula focalizadora pun y los marcadores aditivos pula/juga; cubre alcance, foco, lectura de «también/incluso» y la diferencia ortográfica entre pun separado y conjunciones como walaupun/meskipun/biarpun.
- Añade dos IDs canónicos nuevos: `b2u15_pun` y `b2u15_pula`; los tests incorporan una comprobación de unicidad global contra A1/A2/B1 y B2 previo. Usa ejemplos publicados de Sneddon et al. (2010, §§2.219–2.226, 3.49, 4.99) y la regla ortográfica oficial EYD V. No inventa frases indonesias; añade cuatro clips Piper (dos formas y dos ejemplos), pero no ejercicios de escucha.
- U15 permanece oculta/no publicada; U1–U5 siguen visibles. La biblioteca queda en 2.231 IDs (117 textos B2: 98 de U1–U8, 15 de U11 y 4 de U15). No cambia IndexedDB v1, backup JSON v3, A1/A2/B1 ni dependencias. La naturalidad no ha sido validada por hablante nativo; las dos entradas quedan `not_checked`.
- Fuente: autorización autónoma del dueño, 21 nov 2026; `docs/B2_U15_DESIGN.md`; `docs/audio-requests/B2_U15.json`; [Sneddon et al. (2010)](https://theswissbay.ch/pdf/Books/Linguistics/Mega%20linguistics%20pack/Austronesian/Indonesian%20Reference%20Grammar%20%28Sneddon%29.pdf), [EYD V — Partikel](https://ejaan.kemendikdasmen.go.id/eyd/penulisan-kata/partikel/).

## B2 U14 implementada — 21 nov 2026
- U14 tiene cinco lecciones authored y 16 ejercicios ([3,3,3,3,4]) de cuatro tipos (mc, fill, order, write). Distingue -lah como partícula de foco/realce y -kah como marcador interrogativo; incluye la variación pragmática de -lah en imperativos (no equivale siempre a «por favor») y la focalización interrogativa de -kah.
- Usa ejemplos de Denistia & Baayen (2021), Sneddon et al. (2010), Universal Dependencies Indonesian y material gramatical del repositorio del Ministerio de Educación de Indonesia; reutiliza Bacalah de B1 y silakan/tolong de niveles previos. No añade vocabulario/IDs, oraciones indonesias inventadas ni audio. U14 permanece oculta/no publicada; U1–U5 siguen visibles.
- Fuente: autorización autónoma del dueño, 21 nov 2026; `docs/B2_U14_DESIGN.md`; [Sneddon et al. (2010), Indonesian: A Comprehensive Grammar](https://www.routledge.com/Indonesian-A-Comprehensive-Grammar/Sneddon-Adelaar-Djenar-Ewing/p/book/9780415581547), [Universal Dependencies Indonesian](https://universaldependencies.org/id/index.html).

## B2 U13 implementada — 21 nov 2026
- U13 tiene cinco lecciones authored y 16 ejercicios ([3,3,3,3,4]) de cuatro tipos (mc, fill, order, write). Distingue proclíticos ku-/kau- ya estudiados en U2 de enclíticos -ku/-mu/-nya; analiza posesión/definitud nominal, objeto en verbos activos y el participante de tercera persona asociado al agente en construcciones pasivas. Separa estos usos del patrón formal debatido de U9.
- Usa solo ejemplos documentados de Denistia & Baayen (2021), Universal Dependencies Indonesian y formas ya aprobadas en U2/U9/B1. No añade vocabulario/IDs, oraciones indonesias inventadas ni audio; todas las producciones son análisis en español. U13 permanece oculta/no publicada; U1–U5 siguen visibles.
- Fuente: autorización autónoma del dueño, 21 nov 2026; `docs/B2_U13_DESIGN.md`; [Denistia & Baayen (2021), §2.7](https://www.sfs.uni-tuebingen.de/~hbaayen/publications/DenistiaBaayen2021.pdf), [Universal Dependencies Indonesian](https://universaldependencies.org/id/index.html).

## B2 U12 implementada — 21 nov 2026
- PR [#674](https://github.com/luisequeira612-commits/bahasa-studio/pull/674) implementa U12 en una rama separada; CI pendiente al abrirla. U12 incorpora cinco lecciones authored y 16 ejercicios ([3,3,3,3,4]) de cuatro tipos (mc, fill, order, write), sin vocabulario/IDs nuevos ni producción de frases indonesias. Usa ejemplos publicados de Denistia & Baayen (2021) y Darnis (2022) para contrastar compuestos, frases, transparencia, cabeza e idioms; conserva la ambigüedad donde las fuentes permiten más de un análisis.
- U12 permanece oculta/no publicada; U1–U5 siguen siendo las únicas unidades visibles. No añade audio, dependencias ni cambios a IndexedDB v1 o backup JSON v3. La revisión estructural no es validación nativa.
- Fuente: autorización autónoma del dueño, 21 nov 2026; `docs/B2_U12_DESIGN.md`; [Denistia & Baayen (2021)](https://www.sfs.uni-tuebingen.de/~hbaayen/publications/DenistiaBaayen2021.pdf), [Darnis (2022)](https://badanbahasa.kemendikdasmen.go.id/artikel-detail/808/majemuk-idiom-dan-frasa-konsep-dan-perbedaannya).

## B2 U11 implementada — 21 nov 2026
- Por instrucción directa del dueño, continúa la implementación autónoma de B2 por lotes, sin pedir aprobación intermedia. La autorización incluye añadir vocabulario nuevo cuando esté documentado y no duplique entradas existentes; no autoriza publicar las unidades.
- U11 tiene cinco lecciones authored y 16 ejercicios ([3,3,3,3,4]), cinco tipos (mc, translate_es_id, order, fill, write) y 14 entradas canónicas nuevas: `pulau-pulau`, `dua-dua`, `memukul-mukul`, `pukul-memukul`, `dipukul-pukul`, `melihat-lihat`, `sayur-mayur`, `gerak-gerik`, `kaya-raya`, `lelaki`, `dedaunan`, `pepohonan`, `kecil-kecil`, `keras-keras`. Se distinguen reduplicación completa, afijada, imitativa y parcial; no se generan formas por analogía.
- Fuentes: Denistia & Baayen (2021), Dalrymple & Mofu (2012), Fettes (2024) y ejemplos de Sneddon documentados en las referencias curriculares. Los resultados de Fettes son específicos del indonesio de Yakarta y no se generalizan al estándar.
- La PR #673 generó e integró 15 textos Piper (14 formas nuevas y una respuesta de traducción) en MP3/Opus; el índice y manifiesto productivos alcanzan 2.227 IDs, 113 asociados a B2. No se añadieron tareas de escucha; las tarjetas nuevas sí tienen audio Piper reproducible. No se modifican IndexedDB v1 ni backup JSON v3.
- U11 permanece oculta/no publicada; U1–U5 siguen siendo las únicas unidades visibles. No se modifican IndexedDB v1 ni backup JSON v3.
- Fuente: instrucción directa del dueño, 21 nov 2026; `docs/B2_U11_DESIGN.md` y pruebas curriculares.

## B2 U10 implementada — 21 nov 2026
- PR [#671](https://github.com/luisequeira612-commits/bahasa-studio/pull/671) fusionada en main como `682269e7a502362e9a36032c8b1f9314340b208d`; CI de regresión y Offline quality reports pasó en run `44959239907`. GitHub Pages post-merge finalizó con éxito en run `44959423572`.
- Por instrucción directa del dueño, se continuó el currículo de forma autónoma y por lotes, sin detenerse a pedir aprobaciones intermedias. U10 cierra el bloque de integración U7–U10.
- U10 tiene cinco lecciones authored y 16 ejercicios ([3,3,3,3,4]), cuatro tipos (mc, fill, order, write). Reutiliza los cinco IDs canónicos ya existentes de U7/U8 y los fragmentos U9 documentados; no crea vocabulario, IDs, oraciones indonesias ni audio. La producción guiada y las paráfrasis son en español.
- U10 permanece oculta/no publicada; la ruta visible y el desbloqueo secuencial no se modifican. No se alteran A1/A2/B1, IndexedDB v1, backup JSON v3, audio ni dependencias.
- Fuente: instrucción directa del dueño en ChatGPT, 21 nov 2026; `docs/B2_U10_DESIGN.md`, `docs/B2_U10_APPROVAL_PACKET.md` y pruebas estructurales del repositorio.

## Implementación B2 U9 — 21 nov 2026
- B2 U9 se implementó en la rama `curriculum/b2-u9-implementation-20261121` tras aprobación explícita de los cinco fragmentos fuente (Grangé 2015) por el dueño el 21 nov 2026.
- U9 tiene cinco lecciones authored y 16 ejercicios ([3,3,3,3,4]); cuatro tipos: mc, fill, order y write. Los cinco fragmentos aprobados se usan una sola vez como base de lectura/análisis; no se añadieron vocabulario, IDs, oraciones indonesias inventadas ni audio.
- La unidad usa `vocab: []`; se ajustó mínimamente `buildUnitLessons` para aceptar unidades con lecciones authored y sin vocabulario y evitar el relleno automático de active recall cuando el vocabulario está vacío. La escritura guiada de U9 es en español y la UI adapta placeholder/idioma del modelo de respuesta; no pide producción original en indonesio.
- U9 sigue fuera del recorrido visible: se mantiene el límite B2 de las primeras cinco unidades. No se cambió la visibilidad/publicación ni la puerta secuencial.
- No se modificaron IndexedDB v1, backup JSON v3, el manifiesto/índice de audio ni dependencias.
- Fuente: aprobación directa del dueño en ChatGPT, 21 nov 2026; Grangé (2015), Wacana 16(1), ejemplos 15,17,25,26,34.

## Decisión de contenido B2 U9 — 21 nov 2026
- El dueño aprobó explícitamente los cinco fragmentos 1–5 del paquete `docs/B2_U9_APPROVAL_PACKET.md` (Grangé 2015) para lectura y análisis en U9. Aprobación recibida en ChatGPT: «Sí», en respuesta a la pregunta de aprobación de los cinco fragmentos.
- Alcance exacto: solo los cinco fragmentos y usos didácticos descritos. No autoriza ejemplos indonesios adicionales, vocabulario/IDs nuevos, generalización productiva de la construcción ni publicación/activación de U9.
- Próximo trabajo autorizado: implementar cinco lecciones y 16 ejercicios alrededor de esos fragmentos, con consignas y claves contextualizadas; sin escribir nuevas oraciones indonesias. Paráfrasis españolas pueden ser actividades de comprensión, no sustituyen validación lingüística.
- Fuente: aprobación directa del dueño en ChatGPT, 21 nov 2026; Grangé (2015), Wacana 16(1), pp. 138–147.

## Estado B2 histórico — 21 nov 2026 (antes de U9)
- B2 U1–U8 están implementadas, cada una con cinco lecciones authored; U1–U5 son las visibles y U6–U8 permanecen ocultas hasta decisión explícita de publicación del dueño. La migración Piper cubre los 2.212 IDs del índice; 98 textos están asociados a B2 U1–U8.
- U8 se aprobó e implementó en PR #639 (merge `7b50f3923a5615d61d6cd72ca5cc798800c94e73`). No describir ya sus ocho formas/ejemplos como pendientes.
- El siguiente checkpoint es B2 U9. Su diseño prevé cinco lecciones/16 ejercicios, sin vocabulario ni IDs nuevos. Se prepara `docs/B2_U9_APPROVAL_PACKET.md` con cinco fragmentos de ejemplos publicados en Grangé (2015), usados solo para que el dueño decida; ningún fragmento/glosa queda aprobado por crear el paquete. Tras aprobación explícita se puede implementar U9. U10 mantiene su diseño documental; U11–U12 son propuestas; U13–U60 carecen de mapa aprobado.
- Fuente: currículo B2 inline en `index.html`, `audio/manifest.json` (98 textos B2), PR #639, `docs/B2_U9_DESIGN.md`, Grangé (2015), pp. 138–146; 21 nov 2026.

## Consistencia de voz MMS — investigación y experimento — 19 nov 2026
- El config oficial de `facebook/mms-tts-ind` declara `num_speakers=1`: no hay perfiles seleccionables joven/anciano. VITS usa `noise_scale=0.667` y `noise_scale_duration=0.8` por defecto, parámetros que controlan variación acústica y de duración. Fuentes: [config](https://huggingface.co/facebook/mms-tts-ind/blob/main/config.json), [docs VITS](https://huggingface.co/docs/transformers/v4.33.3/model_doc/vits).
- En la muestra de 30, los tres clips que el usuario marcó como balbuceo (Baik, Dia, Umur) son de una palabra; sus tres favoritos son frases de 2–3 palabras. La mediana F0 estimada por palabra fue ~147 Hz (12 clips), dos palabras ~155 Hz (8) y tres palabras ~189 Hz (8). Es una pista acústica dependiente del texto, no identifica hablantes ni certifica pronunciación.
- Se añade control experimental de escalas VITS solo para `mms` + `samples`; las opciones vacías conservan los defaults y `full` rechaza esos parámetros. Las muestras experimentales se guardan en subcarpetas separadas y registran sus escalas; producción, overrides, IndexedDB y backup v3 no cambian.

# MEMORY.md — Estado de Bahasa Studio

## Migración productiva Piper completada — 21 nov 2026
- Decisión del dueño: Piper (`id_ID-news_tts-medium`) es el motor oficial; Edge TTS queda como alternativa; MMS se abandona para producción por los problemas de pronunciación observados.
- PR #661 preservó los 68 IDs históricos aún indexados; #662 corrigió el dispatch; PR [#663](https://github.com/luisequeira612-commits/bahasa-studio/pull/663) regeneró y fusionó la biblioteca completa en el commit `125b2a751a636f3473cd80cdc8bf2f4e15b84547`. Resultado: 2.212 IDs, MP3 + Opus y SHA-256 en metadata; el índice conserva los IDs históricos sin contaminar el manifiesto curricular. CI/regresión de la PR pasó.
- Metadata: Piper `id_ID-news_tts-medium`; el repositorio de voces indica MIT, pero el MODEL_CARD no especifica la licencia del dataset. No convertir esto en una afirmación de certificación legal; conservar procedencia y atribución. Modelos y dependencias solo en `RUNNER_TEMP`/caché de Actions.
- Verificación del dueño: dos lecciones en la app publicada suenan bien y la voz se percibe femenina. Esto solo verifica esas dos lecciones, no los 2.212 clips ni la pronunciación nativa. No regenerar ni cambiar el motor salvo defecto reproducible.

> Memoria operativa; mantenerla por debajo de unas 150 líneas. Detalles extensos y evidencia histórica viven en documentos y PR enlazados. Última actualización: 21 nov 2026.

## Evaluación experimental de Laras — 17 nov 2026
- El usuario autorizó una prueba temporal de Laras, sin adoptarlo como motor ni alterar audios de producción.
- Workflow manual e independiente: ejecuta Laras en contenedor CPU, descarga pesos ONNX y referencia CC0 solo bajo `RUNNER_TEMP`, genera 12 frases diagnósticas (incluidas «Selamat pagi» y «Makan») y publica MP3 solo como artefacto temporal de Actions con retención de 7 días.
- Código Laras fijado en `e4ab05ca53a8cbf749405de5b1ac902b76880768`; imagen `ghcr.io/urdemonlord/laras-tts:0.2.1`. El script upstream verifica SHA-256 de pesos y referencia. La atribución CC BY 4.0 del modelo Pocket TTS Indonesian viaja con el artefacto.
- No se añaden dependencias a la app ni se guardan modelos/audios en Git o Pages; no se cambian Piper, MMS, biblioteca de producción, IndexedDB ni backup JSON v3. Evaluar escuchando antes de cualquier decisión posterior.
- Fuente: Laras README/NOTICE y `scripts/unduh-model.sh`; aprobación explícita del usuario, 17 nov 2026.

## Generación de audio: modelos solo temporales — 17 nov 2026

- Se establece el límite arquitectónico: GitHub Actions descarga/usa los motores y modelos TTS en almacenamiento temporal del runner; el repositorio, GitHub Pages y la app solo reciben audios generados y metadatos necesarios. Nunca guardar modelos en Git, artefactos permanentes ni paquetes de la app.
- La implementación usa `RUNNER_TEMP` para cachés Piper/Hugging Face/Transformers/Torch, desactiva la caché de descargas pip y elimina el directorio temporal al terminar (también en fallo). Sin nuevas dependencias ni cambios a la biblioteca de producción, IndexedDB o backup JSON v3.
- Se documenta la separación para futuros idiomas: manifiesto y perfil de voz/modelo por idioma, adaptadores TTS reutilizables, audio estático por idioma. Indonesio sigue siendo el único idioma configurado; inglés solo después de completar indonesio hasta B2 y no se habilita aquí.
- Fuente: inspección de `scripts/generate_audio.py`, `.github/workflows/generate-audio.yml`, `AGENTS.md` y límites oficiales de GitHub Pages/Actions; 17 nov 2026. PR de implementación en curso.

## Corrección pedagógica obligatoria — 12 nov 2026
- Decisión explícita del dueño: todas las unidades A1–B2 deben tener 5–6 lecciones didácticas reales. Los ejercicios, bloques derivados de vocabulario y repasos automáticos genéricos no sustituyen lecciones planificadas. Distribuir vocabulario y recuperarlo espaciadamente en contextos diferentes.
- Hallazgo en `main` `236537f`: B2 U1–U3 tienen tres lecciones explícitas, aunque `buildUnitLessons()` añade dos repasos activos genéricos y la app puede mostrar cinco. A1 genera bloques de vocabulario y repaso automáticamente; A2/B1/B2 también pueden completar por relleno. Las pruebas previas contaban solo algunos niveles/contratos y podían ocultar la diferencia.
- PR #532 ya está fusionada en `main` (`9798a47e`): la auditoría A1–B2 separa lecciones explícitas, bloques derivados, repasos automáticos y total runtime. Detectó 3/127 unidades con 5–6 lecciones explícitas; 124 incumplen. Por nivel: A1 0/32, A2 1/40, B1 0/50, B2 2/5. La remediación se realiza por lotes y no se amplía B2 hasta corregir las unidades implementadas.
- No modificar IndexedDB, backup JSON v3 ni añadir vocabulario/ejemplos no aprobados. La corrección debe reutilizar y redistribuir contenido existente cuando sea pedagógicamente válido; no inflar recuentos con contenido artificial.
- 14 nov 2026: PR #600 fusionada por squash (`647f49860d733187631106265a7a5ca09594c8ea`): A1 U29–U32 incorporan cinco lecciones explícitas cada una (20 en total), sin añadir IDs ni vocabulario y preservando los ejercicios originales. A1 queda 32/32 unidades y 161 lecciones authored.
- 14 nov 2026: PR #601 fusionada por squash (`cbd1d0202bd452ee410145bd9505a9cfaf38e681`): B1 U1–U4 pasan a cinco lecciones authored cada una (12 nuevas), sin añadir IDs ni vocabulario y manteniendo U4 como checkpoint acumulativo U1–U4. Inventario: B1 156/50; total 542 lecciones authored; 46 unidades fuera del estándar y 94 lecciones mínimas faltantes, todas B1. CI final 92/92 en éxito.
- 15 nov 2026: PR #602 fusionada por squash (`554c79a79482b168c808caa72e5685e2b6d42d9b`): B1 U5–U8 pasan a cinco lecciones authored cada una (12 nuevas), sin nuevos IDs de vocabulario; U8 conserva el checkpoint acumulativo como quinta lección. Ejercicios combinados: U5 20, U6 21, U7 20 y U8 20; B1 suma 778 ejercicios. Inventario: B1 168/50 (4×2, 32×3, 6×4, 8×5), total 554 lecciones, 42 unidades fuera del estándar y 82 lecciones mínimas pendientes, todas B1. CI final run 43676469321: ambos jobs en éxito. Se reutilizan audios Piper existentes; no cambian manifiesto, hashes ni MP3/Opus. La espera E2E de contenido importado se sincroniza con el texto renderizado; sin cambios al motor, IndexedDB v1 o backup JSON v3.
- 15 nov 2026: PR #603 fusionada por squash (`aa46108660bf0070ace05b1bedb752c9e9ff8a68`): B1 U9–U12 pasan a cinco lecciones authored cada una (12 nuevas), sin vocabulario nuevo; U12 conserva el checkpoint acumulativo como quinta y última lección. Cada unidad queda con 20 ejercicios combinados; B1 suma 802. Inventario: B1 180/50 (32×3, 6×4, 12×5), total 566 lecciones, 38 unidades fuera del estándar y 70 lecciones mínimas pendientes, todas B1. CI final run 43677243060: ambos jobs en éxito.
- 15 nov 2026: PR #604 fusionada por squash (`05c8c4f02f6ff341a2cb2ab757fa47bed9a5a96b`): B1 U13–U16 pasan a cinco lecciones authored cada una (8 nuevas), sin vocabulario nuevo; U17 queda como siguiente checkpoint acumulativo. Cada unidad tiene 18 ejercicios combinados; B1 suma 818. Inventario: B1 188/50 (28×3, 6×4, 16×5), total 574 lecciones, 34 unidades fuera del estándar y 62 lecciones mínimas pendientes, todas B1. CI pre-merge run 43678306180, Pages post-merge run 43678471087 y regresión post-merge run 43678472195 terminaron en éxito.
- 15 nov 2026: PR #605 fusionada por squash (`c4a8cdbb1a40324a19cc3c4e6ba0b8dc1d8a4015`): B1 U17–U20 pasan a cinco lecciones authored cada una (8 nuevas), sin vocabulario nuevo. U17 conserva el checkpoint acumulativo U13–U16 como quinta lección; U18–U20 conservan sus lecciones finales de consolidación. Ejercicios: U17 19; U18–U20 18 cada una; B1 suma 834. Inventario: B1 196/50 (24×3, 6×4, 20×5), total 582 lecciones, 30 unidades fuera del estándar y 54 lecciones mínimas pendientes, todas B1. CI pre-merge run 43679482008, regresión post-merge run 43679633195 y Pages run 43679632372 terminaron en éxito. El CI inicial detectó dos respuestas translate sin audio existente; se sustituyeron por ejercicios order con frases ya disponibles. Se corrigió además una aserción entre realms y el recuento total (834, no 891). Sin cambios a IndexedDB v1, backup JSON v3, audio, dependencias ni runtime.
- 15 nov 2026: PR [#606](https://github.com/luisequeira612-commits/bahasa-studio/pull/606) abierta desde `curriculum/b1-u21-u24-five-lessons-20261115`: B1 U21–U24 pasan a cinco lecciones authored cada una (7 nuevas). U22 conserva el checkpoint acumulativo U18–U22 como quinta lección; U21 y U23 introducen sus últimos conectores antes de las lecciones finales de consolidación, y U24 conserva la narración final. Ejercicios previstos: U21 18; U22 20; U23 18; U24 18; B1 sumará 848. Inventario previsto: B1 203/50 (21×3, 5×4, 24×5), total 589 lecciones, 26 unidades fuera del estándar y 47 lecciones mínimas pendientes, todas B1. Se amplían readiness, progresión e inventario authored; sin vocabulario nuevo, nuevas frases de audio, cambios a IndexedDB v1, backup JSON v3, audio, dependencias ni runtime. El primer CI detectó un objeto de checkpoint U22 mal anidado al insertar la nueva lección; se corrigió el límite entre objetos antes de la siguiente ejecución. CI pendiente.


- 15 nov 2026: en la PR #602, dos respuestas de traducción nuevas se alinean con frases canónicas ya presentes en la biblioteca Piper para reutilizar los audios existentes. No se altera `audio/index.json`, `metadata.json`, los hashes ni los archivos MP3/Opus; se evita introducir dos clips nuevos por variantes de frase que no aportaban un objetivo curricular distinto.

- 15 nov 2026: se estabiliza la prueba E2E de contenido importado: reemplaza una espera fija de 100 ms por una espera explícita a que el texto del ejercicio esté renderizado. Es solo sincronización de prueba; no cambia el motor de importación, IndexedDB ni backup JSON v3.

## Diagnóstico Whisper sobre sample100 MMS — 18 nov 2026
- Tras el sample100 (#44222325789: 100/100; 17 coincide, 13 auto_whisper, 70 revisar, 0 falló), se añade una herramienta diagnóstica que reutiliza exactamente los 100 audios MMS del artefacto existente y compara dos modelos Whisper sobre el mismo audio.
- El diagnóstico es solo manual mediante `workflow_dispatch`, usa `ubuntu-latest` y `timeout-minutes: 180`; descarga el artefacto de la ejecución anterior, no vuelve a sintetizar MMS y no modifica la biblioteca de producción, `audio_progress.json`, IndexedDB ni backup JSON v3.
- Compara Whisper `base` frente a `small`, además del score por frase, aciertos de palabras objetivo y casos donde ambos modelos quedan bajos o uno mejora claramente. El objetivo es separar limitación del ASR de una posible deficiencia de TTS; `both_low` no se interpreta como fallo de pronunciación de MMS.
- Rama: `audio/whisper-sample-diagnostic-20261118`. Pendiente ejecutar manualmente el nuevo workflow y revisar su artefacto/informe antes de decidir cualquier lote productivo.
- No se inicia producción todavía.

## Estado vigente
- `main` incorpora PR #515–#521, #524, #526, #527, #528, #529 y #530; último merge: #530 (`236537f24b1fc38bcaaa11798e749e55a93ef797`). PR #528 sincroniza la verificación post-merge de #527; PR #529 implementa B2 U5; PR #530 sincroniza MEMORY y diseños con el merge real de U5. La regresión post-merge de #529 (#43175001181: test 74/74 y calidad offline 10/10) y Pages (#43175000192) terminaron en éxito. Para #530, regresión post-merge (#43175730857: test 74/74 y calidad offline 10/10) y Pages (#43175730243: build/reporte/deploy) terminaron en éxito. PR #527 añade anuncios accesibles al chat del Tutor y nombres accesibles a los campos de Tutor, clave opcional y Diccionario. Su regresión post-merge (#43172512303: test 74/74 y calidad offline 10/10) y Pages (#43172511556: build/deploy) terminaron en éxito. #524/#526 completan la accesibilidad de la burbuja de traducción y la restauración de foco del popup de significado. #518 se fusionó por squash como `5b10a1e`; su regresión post-merge (#43138303666: test 74/74 y calidad 10/10) y Pages (#43138301958: build, reporte y deploy) terminaron en éxito. #519 se fusionó por squash como `ac771984`; su regresión (#43138940547: test 74/74 y calidad 10/10) y Pages (#43138939223: build, reporte y deploy) terminaron en éxito. #521 se fusionó por squash como `f679d9f38b893ef9c3ebd4de40e9f74cb0802b5c`; su Regression post-merge (#43140312047: test 74/74 y calidad offline 10/10) y Pages (#43140309065: build, informe y deploy) terminaron en éxito. #517 amplió la traducción contextual (palabras ≥44×44 px; audio 48×48 px); #518 protege los cuatro destinos de navegación ≥44×44 px a 360 px; #519 contiene Tab/Shift+Tab en los diálogos móviles de nivel/herramientas; #521 extiende el focus trap, Escape y restauración del foco al panel modal de detalles de unidad (`unitBottomSheet`).
- Estado curricular actualizado en `main` al 21 nov 2026: A1 32/32, A2 40/40, B1 50/50; B2 U1–U8 implementadas (8/60), cinco lecciones authored cada una. U1–U5 visibles; U6–U8 ocultas hasta decisión explícita de publicación. Piper cubre 2.212 IDs indexados, con 98 textos asociados a B2 U1–U8. U9–U10 tienen diseños documentales; U11–U12 propuestas; U13–U60 sin mapa aprobado. La naturalidad/adecuación de ejemplos didácticos nuevos permanece `not_checked`.
- Auditoría local documentada: 122 unidades, 1.062 registros de vocabulario, 1.025 IDs únicos, 0 errores estructurales, 41 avisos heurísticos y 70 informativos. No certifica lingüística.
- Pruebas locales de progresión, contratos curriculares, liberación y B2: 75/75 correctas. La suite `quality:tests` tuvo 128 pruebas correctas, pero Playwright 1.55 no admite `process.platform === android` en este terminal. CI Linux del PR #511 pasó en su head exacto.
- PR #513 se fusionó por squash (`46e6b1b`). CI y Pages post-merge se verificaron en los SHA posteriores; sigue pendiente una prueba física específica de los controles de #513 en Android.
- La verificación post-merge de #519 corresponde al SHA exacto `ac77198400c7ac71ec4eaab85414f56cb3b01f2a`; Regression 74/74, calidad 10/10 y Pages build/reporte/deploy en éxito.

## Remediación de lecciones — 13 nov 2026
- PR #533 fusionada en `main` como `a0e2dd19`: B2 U1–U3 pasan de 3 a 5 lecciones explícitas cada una (26 ejercicios por unidad), sin añadir IDs de vocabulario nuevos. Las lecciones añadidas trabajan recuperación espaciada, contraste de construcciones e integración contextual. CI del SHA final completado con ambos trabajos en éxito.
- B2 U1–U8 implementadas cumplen 5 lecciones explícitas cada una; U9 es el siguiente checkpoint documental, con ejemplos fuente pendientes de aprobación. No crear vocabulario/IDs ni contenido ejecutable para U9 antes de esa aprobación.
- PR #534 fusionada en `main` como `e1f87521`: A2 U2–U4 pasan de 4 a 5 lecciones explícitas cada una mediante recuperación espaciada de todo el vocabulario ya enseñado, sin añadir IDs. U1 ya tenía cinco. CI del SHA exacto completado con ambos trabajos en éxito.
- PR #535 fusionada en `main` como `4fc442fd`: A2 U5–U8 pasan de 4 a 5 lecciones explícitas cada una mediante recuperación espaciada de sus 12 verbos ya enseñados; sin IDs nuevos. Cada unidad pasa de 17 a 22 ejercicios. CI del SHA final completado con ambos trabajos en éxito.
- PR #536 en curso: A2 U9–U12 pasan de 4 a 5 lecciones explícitas cada una mediante recuperación espaciada de los 12 elementos ya enseñados; sin IDs nuevos. Cada unidad pasa de 17 a 22 ejercicios. CI pendiente.

## B2 U5 y decisiones pendientes
- U5 implementada y fusionada en PR #529 (`0c5899c9`): cinco lecciones/16 ejercicios; añade `menawari` y `menawarkan` con IDs propios y glosas contextuales; reutiliza `v448` (`bantuan`) y `b1v145` (`umpan balik`); `datangi`/`panasi` y `menjatuhi`/`dijatuhi` solo reconocimiento; excluye `tanami`/`garami`/`kantongi`. CI del PR y post-merge: test 74/74 y calidad offline 10/10; Pages correcto. Naturalidad/adecuación de ejemplos didácticos sigue `not_checked`.
- `datangi`/`panasi` solo reconocimiento en el documento; `tanami`, `garami`, `kantongi` excluidas. `mendatangi` ya tiene IDs en A2 U16 y B1 U5; no duplicar.
- Eje aprobado: U1–U3 voz/afijos; U4–U6 `-kan`, `-i`, `memper-`; U7–U10 nominalizaciones; U11–U12 reduplicación/compuestos. El eje no aprueba ejemplos ni implementación. U13–U60 sin mapa aprobado.
- B2 U4 usa cinco lecciones, 16 ejercicios y IDs canónicos B1; no añade vocabulario. U5 ya está publicada tras U4; U6–U8 siguen ocultas hasta decisión explícita de publicación. U8 fue implementada tras aprobación específica de sus ocho formas y ejemplos (PR #639).

## Producto y restricciones permanentes
- Aplicación gratuita, local, en español, mobile-first y offline; sin backend, cuentas, monetización, servicios pagados, anuncios, vidas, presión social ni publicación en tiendas. No integrar agentes externos de IA.
- Completar indonesio hasta B2 antes de iniciar inglés A1 para hispanohablantes. No hay otros idiomas aprobados. Código y datos nuevos deben evitar acoplamiento innecesario al indonesio, sin refactor general.
- No modificar el esquema de IndexedDB ni romper la compatibilidad del backup JSON v3; preservar progreso. No añadir dependencias sin autorización.
- `verified_primary` solo lo asigna el dueño; `cross_checked` exige dos fuentes secundarias independientes anotadas; el resto es `not_checked`. Auditorías automáticas no certifican uso nativo, MCER/BIPA ni naturalidad.
- Reutilizar IDs canónicos, no inventar vocabulario, ejemplos ni fuentes, y no activar unidades sin contenido aprobado y pruebas de desbloqueo.

## Fases y próximos pasos
- Fase 1: CI y calidad estructural revisados; Playwright se ejecuta en CI compatible y las regresiones post-merge #518, #519 y #521 finalizaron correctamente.
- Fase 2: auditoría estructural completada y regla obligatoria de 5–6 lecciones explícitas establecida. Remediación en curso por lotes; esta PR corrige B2 U1–U3. La revisión editorial/lingüística de A1/A2 tampoco está terminada.
- Fase 3: auditoría ejecutada; 41 avisos son candidatos editoriales y requieren revisión contextual. No hay errores bloqueantes estructurales.
- Fase 4: B2 U1–U8 implementadas con cinco lecciones authored; U1–U5 visibles y U6–U8 ocultas hasta decisión explícita de publicación. U9–U10 tienen diseños documentales; U9 ya dispone de paquete de ejemplos fuente pendiente de aprobación. U11–U12 son propuestas documentales; U13–U60 carecen de mapa aprobado. El eje temático no sustituye la aprobación específica de ejemplos, vocabulario ni actividades.
- Fase 5–8: mejoras mobile-first y objetivos táctiles de #502, #513 y #517 integrados; #518 añade regresión de navegación; #519 y #521 añaden contención del foco, Escape y restauración del foco en diálogos móviles; #524 y #526 completan accesibilidad de traducción contextual y restauración del foco; #527 añade anuncios accesibles al Tutor y etiquetas explícitas a Tutor/Diccionario. CI y Pages post-merge verificados para #518, #519, #521, #524, #526 y #527. Sigue pendiente prueba física Android de estos controles.
- PR #520 se fusionó por squash (`6952389`) y documenta la verificación post-merge de #519. PR #521 se fusionó por squash (`f679d9f`) y extiende el focus trap y la restauración al diálogo de detalles de unidad (`unitBottomSheet`). Su CI post-merge terminó: Regression 74/74, calidad offline 10/10 y Pages build/reporte/deploy correctos. U5 está implementada y verificada; U6 requiere diseño y aprobación de contenido. No tocar IndexedDB ni backup JSON v3. La verificación física de accesibilidad en Android sigue pendiente.

## Flujo Git
- Trabajar en ramas descriptivas y PR pequeñas; nunca modificar `main` directamente. Cada PR debe incluir objetivo, archivos, pruebas, riesgos/limitaciones y actualizar este archivo.
- Crear commits, PR y fusionar está autorizado por la misión cuando el diff esté revisado, CI verde en el head exacto, informes sin errores bloqueantes y no haya comentarios/revisiones/hilos pendientes. No fusionar con CI pendiente o fallido.
- No afirmar pruebas de dispositivo físico si solo se ejecutó navegador. Distinguir probado, revisado por lectura y no verificado.
- El detalle de la verificación post-merge está en `docs/PHASE_6_POSTMERGE_VERIFICATION.md`.


## Accesibilidad contextual y Tutor — 12 nov 2026
- PR #524 fusionada en `main` (`e0a1593`): la burbuja de traducción anuncia el texto con `aria-live="polite"`, cada palabra informa `aria-controls` y `aria-expanded`, y Escape restablece el estado expandido sin desplazar el foco del botón activador.
- PR #526 fusionada por squash (`2a1dd2710c06b091d4bbbd75f060a0d449772132`): restaura el foco desde la burbuja y el popup de significado; el texto de origen conserva `tabindex="-1"` para mantener el foco programático fuera del orden normal de Tab. CI del PR: Regression 74/74 y calidad offline 10/10; CI post-merge de `main`: Regression 74/74 y calidad offline 10/10; Pages build, deploy y reporte en éxito.
- PR #527 fusionada en `main` (`37e3faf`): el chat del Tutor anuncia mensajes y los campos de Tutor/Diccionario tienen nombres accesibles; regresión post-merge 74/74, calidad 10/10 y Pages correcto. PR #528 sincronizó esta evidencia en documentación y se fusionó como `a9a8b569` tras CI pre-merge verde.
- La prueba física Android de los controles táctiles y de foco sigue pendiente.

## Corrección técnica B1 — 13 nov 2026
- Rama `fix/b1-unbiased-exercise-shuffle`, basada en `main` `d3aa7ce93116727786a5ec9abae697dacc33b5b1`. Se confirmaron los cuatro usos sesgados de `sort(() => Math.random() - 0.5)` en `index.html`.
- Sustituidos por Fisher–Yates; los ejercicios `order` usan `correctOrder` como referencia y evitan mostrar exactamente la solución cuando hay al menos dos tokens distintos.
- Añadida `tests/exercise-shuffle.test.cjs` con comprobaciones deterministas de las seis permutaciones de tres elementos, no mutación de origen, protección de `order` y los cuatro puntos de uso; el workflow ejecuta esta prueba.
- No se modifican datos curriculares, IndexedDB, backup JSON v3 ni dependencias. La suite local completa no se ejecutó; CI del head exacto `babc1019a5ccfc0b4260a965d520d266e7b891c6` y verificación post-merge en `main` terminaron con éxito, incluidos Regression tests y Pages.

- 13 nov 2026: B4 completado en PR #539, fusionada en `main` (`0f44e971a6280cb9d50ff352e22860fe6bbaad13`). Cliente común para las tres llamadas opcionales a Gemini; maneja HTTP, JSON inválido, red y timeout, sin reintentos automáticos. CI pre-merge y post-merge, regresión, informes offline y Pages en éxito; sin llamadas durante el estudio, dependencias nuevas ni cambios de IndexedDB/backup v3.
- 13 nov 2026: B7 completado en PR #540, fusionada en `main` (`6e5963fb12f2c470d1ffcb89adfa1ec335dcb348`). Mantiene `lang="es"` para la interfaz y marca fragmentos indonesios con `lang="id"` en lecciones, diccionario, ejercicios y popup; CI pre-merge y post-merge, regresión, informes offline y Pages en éxito. Sin cambios curriculares, IndexedDB, backup v3 ni dependencias.

- 13 nov 2026: B3 completado en PR #541, fusionada en `main` (`c6840d029b37f8f9ea48dd99912f60538c727406`). El service worker precarga recursos individualmente; un fallo HTTP/red no cancela los demás ni se guarda como recurso válido. CI pre-merge y post-merge, build, regresión, informes offline y Pages en éxito. Sin cambios curriculares, IndexedDB, backup v3 ni dependencias.

- 13 nov 2026: B5 completado en PR #542, fusionada en `main` (`97bdafca8fe3299dc50e35e9ba28337fb5be1a98`). La acción «Olvidar clave» limpia estado en memoria, campo e IndexedDB mediante `DB.delete`, sin cambiar el esquema; la clave no se exporta en JSON v3. CI pre-merge y post-merge, regresión, informes offline y Pages en éxito.

- 13 nov 2026: B10 cerrado como no aplicable: `exportProgress`, `validateBackup` y `DB.replaceBackupData` ya implementan exportación/importación JSON v3; no se reimplementa ni modifica el formato.
- 13 nov 2026: B16 completado en PR #543, fusionada en `main` (`b90696046a59df7def06cd2cbb56913a0988beb4`). Añade README en español con instalación, privacidad, backup v3, servicios opcionales, limitaciones y desarrollo. No asigna licencia ni crea LICENSE/NOTICE. CI pre-merge y post-merge, regresión, informes offline y Pages en éxito.

- 13 nov 2026: Lote 1 de remediación técnica B1, B3, B4, B5, B7 y B16 completado; B10 cerrado como no aplicable. CI post-merge verificado en cada PR.
- 13 nov 2026: B2 completado en PR #544, fusionada en `main` (`9a530a8ea068fba48f82ad2d64b5aa36f0744a98`). Si no hay voz `id*`, el audio no se reproduce con voz de otro idioma; la interfaz explica cómo instalar una voz indonesia. CI pre-merge y post-merge, regresión, informes offline y Pages en éxito.

- 13 nov 2026: B6 revisión estática: no se confirmó un sink XSS explotable; los campos dinámicos revisados usan `App.escapeHtml`/`escapeHtml` o `textContent`, y los IDs de unidades importadas tienen patrón restringido. PR #545 añadió una prueba E2E con payload HTML en una unidad personalizada importada. PR #553 se fusionó por squash en `main` (`9703f38ea288459ada81f041c285ee7e859860d3`): añade una prueba E2E que verifica que `App.validateBackup()` rechaza IDs con comillas y atributos `onclick`; CI del head exacto `3c297e7951521e0cf4b564bcf4811369990f9e3f` pasó (`Regression tests` y `Offline quality reports`). B6 queda parcialmente cubierto; no se afirma ausencia global de XSS y sigue pendiente una revisión dinámica/manual más amplia. PR #555 amplía la prueba E2E a la respuesta libre del alumno en Conversaciones: verifica que un payload HTML se conserva como texto y no crea elementos ni ejecuta `onerror`.
- 13 nov 2026: B8 revisado como diseño intencional/no accionable: precargar `./` y `./index.html` cubre rutas distintas; `mobile-check.html` es diagnóstico; `skipWaiting`/`clients.claim` y stale-while-revalidate no muestran defecto reproducible.
- 13 nov 2026: B9 permanece `NECESITA MÁS DATOS`: SpeechRecognition lo gestiona el navegador/SO; el código no sube audio por fetch/XHR ni identifica proveedor. No atribuir a Google sin pruebas por navegador.

- 14 nov 2026: B15 queda instrumentado con gate estricto opcional para 5–6 lecciones explícitas por unidad. El modo informativo enumera las brechas; `--strict` falla si alguna unidad implementada incumple. No se activa en CI mientras continúe la migración. Inventario de referencia: A1 141/32 (U29–U32 pendientes), A2 200/40, B1 144/50 y B2 25/5; 54 unidades fuera del estándar y 126 lecciones mínimas faltantes. PR en preparación `quality/b15-strict-authored-lesson-gate`.
- 13 nov 2026: B14 completado en PR #546, fusionada en `main` (`57564fabffc692e2a41adeb5fabca18fd8495322`). Añade `node --check` para todos los `.js` fuera de `node_modules`; CI del SHA exacto del PR pasó. Sin dependencias nuevas.

- 13 nov 2026: PR #547 fusionada por squash (`f47f93e50380baa7ef1c6fedaa8710b14ff7fd00`): auditor reproducible de lecciones explícitas, test de línea base y documentación; CI pre/post-merge de regresión, Offline quality reports y Pages en éxito.
- 13 nov 2026: PR #548 fusionada por squash en `main` (`856dcf63cc4cbc3a5d01f53160aec6811599d083`): A2 U13–U16 pasan a cinco lecciones explícitas, con 12 ejercicios de recuperación por unidad y cobertura de las 12 palabras. CI completo del SHA final: Regression tests y Offline quality reports en éxito; sin reviews ni comentarios pendientes.
- 13 nov 2026: PR #549 fusionada por squash en `main` (`7e64fc6d8d87d0f82513b0fa6b9e69bfe11093e3`): A2 U17–U20 pasan a cinco lecciones explícitas; cada unidad recupera las 12 palabras con 12 ejercicios y cinco tipos. CI del head exacto (`109387b66a7c37cd3b4c30e456569f237ee7785c`): Regression tests y Offline quality reports en éxito; sin reviews ni comentarios pendientes.
- 13 nov 2026: PR #550 fusionada por squash en `main` (`a12db39750403ba119a11b879ab291a81917eac5`): A2 U21–U24 pasan a cinco lecciones explícitas; cada unidad recupera las 12 palabras con 12 ejercicios y cinco tipos. CI del head exacto (`583ec8802d9fab478dd8f4c2bcf05483c0e4cdb6`): Regression tests y Offline quality reports en éxito; sin reviews ni comentarios pendientes.
- 13 nov 2026: PR #558 fusionada por squash (`f953b59bf6eb093d84e6565c682ffd8338af5371`): sincroniza este inventario y registra las fusiones #551/#552 con sus CI.
- 13 nov 2026: Inventario tras PR #552: A1 32/0 lecciones autorales; A2 40/192 (U1–U32: 5; U33–U40: 4); B1 50/144 (12 con 2, 32 con 3, 6 con 4); B2 U1–U5 25 (5 cada una), U6–U60 aún no implementadas. Total: 127 unidades implementadas y 361 lecciones explícitas; 90 unidades bajo el mínimo y 274 lecciones faltantes para alcanzar cinco por unidad.
- 13 nov 2026: PR [#551](https://github.com/luisequeira612-commits/bahasa-studio/pull/551) fusionada por squash en `main` (`d12383ff47651db5c4ceba221b46cbac5b37592d`): A2 U25–U28 pasan a cinco lecciones explícitas; cada quinta lección recupera las 12 palabras ya enseñadas con 12 ejercicios y cinco tipos, sin vocabulario nuevo. CI del head exacto `3b1f8721afd4d0c596ef20934d9cdfa93a5feede` (run 43396121747): `test` y `Offline quality reports` en éxito. La naturalidad de los ejemplos sigue `not_checked`; no es certificación nativa ni MCER/BIPA. Sin cambios a IDs, IndexedDB v1, backup JSON v3 ni dependencias.

- 13 nov 2026: PR [#555](https://github.com/luisequeira612-commits/bahasa-studio/pull/555) fusionada por squash en `main` como `1eedfb37ef643e30a24749bd9ca4ea3073c617d7`. Amplía B6 con una prueba E2E de payload HTML en respuesta libre de Conversaciones A1/A2: el payload permanece como texto, no crea una imagen ni ejecuta `onerror`; verifica también el retorno al modo guiado y que la respuesta libre se contabiliza fuera del denominador de puntuación automática. La prueba reveló y permitió corregir un defecto real: `useGuidedResponse()` bloqueaba el regreso tras revelar el ejemplo porque `answered` era true. CI del head exacto `2031e783bf7372a1fb9b6ca6d357cd759dfabf41` (run 43402109832): `test` y `Offline quality reports` en éxito; sin reviews, hilos ni comentarios pendientes. B6 continúa parcial; esta prueba no certifica todos los sinks ni todas las rutas. Sin cambios a currículo, IndexedDB v1, backup JSON v3 ni dependencias.
- 13 nov 2026: PR [#552](https://github.com/luisequeira612-commits/bahasa-studio/pull/552) fusionada por squash en `main` (`57530fdf524a9f1b35d590489d9e8f98e083ebb0`): A2 U29–U32 pasan a cinco lecciones explícitas; cada quinta lección recupera las 12 palabras ya enseñadas con 12 ejercicios y cinco tipos, sin vocabulario nuevo. CI del head exacto `453d1b0fa29e12be483422404c4177128c3b4641` (run 43457335263): `test` y `Offline quality reports` en éxito; sin revisiones ni comentarios pendientes. La naturalidad de los ejemplos sigue `not_checked`; no es certificación nativa ni MCER/BIPA. Sin cambios a IDs, IndexedDB v1, backup JSON v3 ni dependencias.
- 13 nov 2026: PR [#559](https://github.com/luisequeira612-commits/bahasa-studio/pull/559) fusionada por squash en `main` (`d6085c669411b129b9234037e86704e7f483cdb0`): A2 U33–U36 pasan a cinco lecciones explícitas, con doce ejercicios de recuperación por unidad y sin vocabulario nuevo. La prueba de integridad de extracción fija el recuento en 196 lecciones/1.032 ejercicios y 492 entradas de vocabulario. CI del head exacto `610ab1595719aee1d9e29752d9533d3c87ddb27a` (run 43465452287): `test` y `Offline quality reports` en éxito; sin revisiones ni comentarios pendientes. Naturalidad `not_checked`; no es certificación nativa/MCER/BIPA. Sin cambios a IDs, IndexedDB v1, backup JSON v3 ni dependencias.

- 13 nov 2026: PR [#560](https://github.com/luisequeira612-commits/bahasa-studio/pull/560) fusionada por squash en `main` (`e541fe4f2e3ad02ef0a7289a5c8af229d1873c77`): A2 U37–U40 reciben una quinta lección autoral de recuperación espaciada, con doce ejercicios por unidad que cubren una vez las doce entradas existentes y cinco tipos de ejercicio; no se introduce vocabulario nuevo. Actualiza pruebas de currículo/inventario, auditoría U37–U40, línea base de respuestas escritas y este registro. CI del head exacto `0d91253c166b457723c3cacf04220712ad7d0ddc` (run 43467301923): `test` y `Offline quality reports` en éxito; sin revisiones ni comentarios pendientes. Revisión lingüística independiente sigue pendiente (`not_checked`); no es certificación nativa/MCER/BIPA. Sin cambios a IDs, IndexedDB v1, backup JSON v3 ni dependencias. Inventario tras completar A2: A1 32/0; A2 40/200; B1 50/144; B2 U1–U5 25; total 127 unidades/369 lecciones, 82 unidades bajo mínimo y 266 lecciones faltantes.

- 13 nov 2026: PR [#562](https://github.com/luisequeira612-commits/bahasa-studio/pull/562) fusionada por squash en `main` como `50c7f2273aed3346fa1f91d0e4c41dc6d4d5b460`. Endurece el ciclo de vida del reconocimiento opcional en `assessment.html`: ignora callbacks obsoletos, restaura el botón, informa errores de red/idioma y aborta al iniciar o enviar una evaluación. El head final `fd89f5401b60698cca566ff4a8d2661d42d19345` pasó `test` y `Offline quality reports` en run [43491736256](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43491736256); la repetición del job inicialmente fallido por una E2E intermitente también pasó. B9 continúa `NECESITA MÁS DATOS`: no se identifica el proveedor ni dónde procesa el audio; no afirmar privacidad ni atribuir proveedor sin evidencia. Sin cambios a currículo, IndexedDB v1, backup JSON v3 ni dependencias.

- 13 nov 2026: B6 revisado y cerrado para el alcance auditado mediante PR #564. Se inspeccionaron los 38 usos de `innerHTML` encontrados en los 15 archivos de código de la aplicación; no se halló un sink adicional explotable: los datos variables se escapan, se muestran con `textContent`/`innerText`, se limpian antes de la vista previa o proceden de constantes/IDs validados. No se encontraron usos de `outerHTML`, `insertAdjacentHTML`, `document.write`, `createContextualFragment`, `DOMParser` ni `srcdoc` en esos archivos. La prueba E2E importa un archivo JSON v3 real con payload HTML en título, descripción, gramática, vocabulario y ejercicios (`mc`, `translate_es_id`, `listen`, `order`), y verifica la ruta, ficha y renderizadores (incluido `match` generado): no aparecen imágenes/handlers inyectados ni se ejecuta el payload. La cobertura existente de conversación libre también verifica que la respuesta del alumno se representa como texto. CI del head de código `b10931ee38e831098c8e8c590eff1cd22294378e` pasó `test` y `Offline quality reports` en run [43495049945](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43495049945); el head final con sincronización documental `9e7dbf3574ebbee7072cbc6a38cfc81e4f61faa8` también pasó ambos trabajos en run [43495657661](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43495657661). Alcance: cierre de las rutas/sinks actuales auditados, no certificación universal frente a cualquier XSS futuro. Solo pruebas y documentación; sin cambios de producto, currículo, IndexedDB v1, backup JSON v3 ni dependencias.
- 13 nov 2026: PR [#561](https://github.com/luisequeira612-commits/bahasa-studio/pull/561) fusionada por squash en `main` (`639d462a0b012378af0abc3a6f87d599c1471d32`): A1 U1–U4 reciben cinco lecciones authored cada una (20 total), con vocabulario existente, ejercicios originales conservados y recuperación espaciada. CI del head exacto `e00c79a2557d0350ef59e4a83977fed9d1a5f063` pasó el job de regresión completo (84 pasos) y los informes offline. Naturalidad `not_checked`; no es certificación nativa/MCER/BIPA. Sin cambios a IndexedDB v1, backup JSON v3 ni dependencias.
- 13 nov 2026: PR [#565](https://github.com/luisequeira612-commits/bahasa-studio/pull/565) fusionada por squash en `main` (`f68c1112ce225fc296aaa4130b8b2c0b7c02bed5`): A1 U5–U8 pasan a cinco lecciones explícitas; 68 ejercicios originales preservados y 33 prácticas acumulativas. CI del head exacto pasó Regression tests y Offline quality reports. Inventario: 127 unidades implementadas, 409 lecciones; 74 unidades pendientes y 226 lecciones mínimas faltantes.

- 13 nov 2026: PR [#566](https://github.com/luisequeira612-commits/bahasa-studio/pull/566) fusionada por squash en `main` (`27bc5a88c0db36e4fde63d136338862bc9352a5d`): A1 U9–U12 pasan a 5–6 lecciones explícitas (21 total); se preservan los 79 ejercicios originales y se añaden 143 prácticas de recuperación acumulativa. CI pre-merge y post-merge (`test`, Offline quality reports y Pages build/deploy) pasó en los SHA exactos. Inventario: A1 12/32, total 430 lecciones, 70 unidades pendientes y 206 lecciones mínimas faltantes.
- 13 nov 2026: Rama `curriculum/a1-u13-u16-five-lessons-20261113` prepara A1 U13–U16 con cinco lecciones explícitas por unidad (20 total), distribuyendo 32 entradas existentes y preservando 60 ejercicios originales exactamente una vez; cada lección posterior practica el vocabulario previo y la quinta recupera la unidad completa. Sin vocabulario ni IDs nuevos. Pendiente CI y fusión.
- 14 nov 2026: PR [#568](https://github.com/luisequeira612-commits/bahasa-studio/pull/568) fusionada por squash en `main` como `6a81a192e3e7b20289e436ef0f6a88b8167a4d6a`: A1 U17–U20 reciben cinco lecciones authored cada una, con vocabulario existente, recuperación acumulativa y recuperación espaciada. CI del head final pasó; sin cambios a IndexedDB v1, backup JSON v3 ni dependencias. Naturalidad `not_checked`.

- 14 nov 2026: En la revisión de #568 se comprobó que `reviewVocabIds` debía corresponder a ejercicios efectivos de recuperación. Se incorporó práctica activa del vocabulario previo y se conservó cada ejercicio original exactamente una vez. El head final quedó validado por CI antes de la fusión.


- 14 nov 2026: PR [#569](https://github.com/luisequeira612-commits/bahasa-studio/pull/569) fusionada por squash en `main` como `405ab585a816bce2fb80accee2d4bc92234195a8`: A1 U21–U24 reciben cinco lecciones authored cada una. Se corrigieron referencias de vocabulario que no se introducían en las lecciones y se colocaron los ejercicios originales exactamente una vez; cada lección posterior recupera activamente el vocabulario previo y la quinta repasa toda la unidad. CI del head exacto `8d6e2e93c2340c1ce381cfe751c8f3b56b0f8f6c` (run 43546701744): `test` y `Offline quality reports` en éxito; sin reviews ni hilos pendientes. Naturalidad `not_checked`; sin cambios a IndexedDB v1, backup JSON v3 ni dependencias.


- 14 nov 2026: Inventario verificado en `main` después de #569: A1 32 unidades/121 lecciones authored (U1–U24 completas; U25–U32 sin lecciones), A2 40/200, B1 50/144 y B2 U1–U5 25. Total 127 unidades implementadas y 490 lecciones authored; 58 unidades siguen bajo el mínimo de cinco y faltan 146 lecciones para llevar esas unidades a cinco. B2 U6–U60 son 55 unidades aún no implementadas. El inventario cuenta únicamente `unit.lessons[]`, no bloques runtime.
- 14 nov 2026: PR [#570](https://github.com/luisequeira612-commits/bahasa-studio/pull/570) abierta desde `curriculum/a1-u25-u28-five-lessons-20261114`: A1 U25–U28 reciben cinco lecciones authored cada una (20 total), reutilizando las diez entradas existentes por unidad, preservando cada ejercicio original exactamente una vez y añadiendo recuperación acumulativa en cada lección posterior y repaso espaciado completo en la quinta. Actualiza guardas de progresión, inventario, hash de integridad, línea base de respuestas escritas y este registro. Head actual `53460d9ea5e6b46e2e39466008d1872540638040`; CI pendiente. Las primeras ejecuciones detectaron comparaciones estrictas entre arrays de distintos contextos JavaScript; se normalizaron tanto los valores esperados como los obtenidos del VM con `Array.from`, sin relajar los contratos. En esta rama el inventario proyectado es A1 141, total 510 lecciones authored, 54 unidades bajo el mínimo y 126 lecciones mínimas faltantes. Sin cambios a IndexedDB v1, backup JSON v3 ni dependencias.


- 14 nov 2026: Diagnóstico de audio Android: el usuario confirmó que el fallo ocurre tanto en la PWA instalada como en Chrome normal, aunque Google TTS reproduce la muestra indonesia desde Ajustes. PR #571 se fusionó tras CI verde y refresca `speechSynthesis.getVoices()` al reproducir, sin fallback de idioma; la prueba física posterior siguió mostrando el mismo aviso. Se detectó que el service worker seguía en `v3.8.93`, por lo que podía servir el `audio-engine.js` anterior. PR #572 incrementa la caché a `v3.8.94` para forzar instalación y precarga de los recursos actuales. Si persiste, siguiente paso: diagnóstico visible de las voces que Chrome expone (`lang`, nombre y disponibilidad), sin reproducir voces no indonesias. No afirmar que el dispositivo está validado.


- 14 nov 2026: PR [#572](https://github.com/luisequeira612-commits/bahasa-studio/pull/572) fusionada por squash en `main` como `17ac4ededb0f4dbcea38bf362d4543cfec4ff58f` después de CI completamente verde (Offline quality reports y test, incluidos los E2E de navegador). No hubo reviews, hilos ni comentarios pendientes. Actualiza service worker a caché `bahasa-studio-v3.8.94`; falta validación física del usuario en Chrome Android/PWA. No afirmar que el audio quedó resuelto.
- 14 nov 2026: Se inicia evaluación de TTS indonesio gratuito en `docs/INDONESIAN_TTS_EVALUATION.md`. Candidato principal de prueba: sanoTTS (`ampixa/sanoTTS`), que declara una voz indonesia y ejecución WebAssembly en navegador; la ficha marca GPL-3.0 y no publica métricas de calidad comparables para indonesio. ArboTTS queda como candidato secundario, no seleccionado para distribución porque no se identificó licencia separada y clara para los pesos de su demo ni procedencia suficiente del modelo adaptado. No se integra runtime ni modelo; primero deben verificarse audio en Android, consumo, modo offline y derechos de redistribución de pesos/outputs. La escucha de usuario no nativo no certifica pronunciación. No se modifican audio-engine, currículo, IndexedDB v1, backup JSON v3, service worker ni dependencias.

- 14 nov 2026: Corrección de entorno: el usuario trabaja exclusivamente desde un Tecno Pova 4 Android; no dispone de computadora ni puede ejecutar Python, ffmpeg o Piper localmente. La generación se trasladará a GitHub Actions mediante `workflow_dispatch`; el teléfono solo inicia ejecuciones y escucha muestras MP3 en una página estática. PR #573 se amplía para incluir exportador reproducible A1/A2/B1 (B1 se extrae de `index.html` con el helper existente), generador Edge/Piper/MMS, pruebas ejecutables en Actions y página de muestras. La biblioteca completa permanece bloqueada hasta que el usuario elija una voz. GitHub Actions usa `GITHUB_TOKEN`; la creación automática de PR requiere habilitar la opción del repositorio. Los eventos de PR originados por GITHUB_TOKEN pueden quedar pendientes de aprobación; se añade `workflow_dispatch` al CI para ejecutar regresión explícitamente en la rama generada. El deployment Pages #43558372270 confirma checkout de `main` y Jekyll `source: .` (raíz); la URL de muestras será `https://luisequeira612-commits.github.io/bahasa-studio/audio-samples/` después de fusionar las muestras y publicar. La generación completa registra `audio/metadata.json` y rechaza cambios de motor/voz para impedir mezclas entre niveles. No se modifica currículo, IndexedDB v1, backup JSON v3, audio-engine ni service worker.

- 14 nov 2026: PR [#574](https://github.com/luisequeira612-commits/bahasa-studio/pull/574) fusionada por squash en `main` como `4865ae4604593aa5f3fa6d590ebe2a7c5d1e9073`, tras CI verde en el head del PR (`test` y `Offline quality reports`) y sin revisiones ni hilos pendientes. Estabiliza la prueba E2E de teclado de la burbuja de traducción usando `locator.press('Enter')` para enfocar explícitamente el botón; no cambia código de producción, currículo, IndexedDB v1, backup JSON v3 ni dependencias.

- 14 nov 2026: Estado TTS tras PR #574: la infraestructura de GitHub Actions está preparada, pero todavía no hay muestras MP3 ni biblioteca integrada. El workflow `.github/workflows/generate-audio.yml` solo admite `workflow_dispatch`; el conector GitHub disponible no expone una acción para iniciarlo. El propietario debe lanzar desde Android una ejecución por motor (`edge`, `piper`, `mms`) en modo `samples`, límite 10. No ejecutar `full` hasta comparar las muestras y aprobar una voz. Piper sigue experimental por incertidumbre de procedencia/licencia; Edge usa un cliente no oficial de un servicio online; MMS es no comercial y pesado. Los audios sintéticos no certifican pronunciación nativa. Fuente: PR #573/#574, workflow y `docs/AUDIO_GENERATION.md`, consultados el 14 nov 2026.
- 14 nov 2026: PR #531 fusionada por squash en main como `6c09dbde`. Solo documentación de B2 U6 (`memper-`); U6 sigue sin implementación ni aprobación de contenido. Regression del head `e7ea2483` pasó; no había reviews ni hilos pendientes.
- 14 nov 2026: PR #537 y PR #557 cerradas sin merge porque sus cambios de quinta lección A2 ya estaban incorporados en main. El inventario actual confirma A2 40/40 con cinco lecciones explícitas por unidad; no se duplican ni se rebasean esas PR antiguas.

- 14 nov 2026: Decisión TTS tras escuchar los tres motores: el usuario confirma que prefiere Piper. Se selecciona `id_ID-news_tts-medium` como voz principal para el proyecto estrictamente gratuito/no comercial. No confundir el MIT del repositorio `piper-voices` con la licencia de entrenamiento: la ficha original del checkpoint identifica `s-sakti/data_indsp_news_tts` bajo CC BY-NC-SA 4.0; el paquete ejecutor `piper-tts` es GPL-3.0-or-later y solo corre en GitHub Actions. Tratar la voz como no comercial, conservar atribución y condiciones ShareAlike por prudencia; la aplicabilidad exacta a audios generados no está resuelta. MMS `facebook/mms-tts-ind` tiene CC BY-NC 4.0 explícita (menos restrictiva al no imponer ShareAlike), pero sus pesos son 145 MB frente a 62,950,044 bytes (~60 MiB) de Piper. En 10 MP3 de textos iguales, Piper totalizó 60,114 bytes, MMS 76,386 y Edge 121,890: Piper fue 21.3% menor que MMS y 50.7% menor que Edge. La decisión favorece Piper por preferencia del usuario, menor peso y uso no comercial; MMS queda como alternativa si la cláusula ShareAlike no es aceptable. PR #578 fusionada como `965fe780ad295f3a4197f396b89fd29807398d41` contiene las 30 muestras. Siguiente paso: fijar Piper como default del workflow, generar A1/A2/B1 por nivel en Actions y auditar antes de integrar. Fuentes: checkpoint card, licencia oficial MMS, documentación Piper y árbol de GitHub consultados el 14 nov 2026.


- 14 nov 2026: Generación completa B1 con Piper ejecutada en GitHub Actions (run [43633931546](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43633931546), éxito). El manifiesto registra 2.084 clips únicos indexados: A1 635, A2 996 y B1 539; el índice completo MP3+Opus suma 22.818.892 bytes. En la rama `audio/library-B1` se añadieron 150 pares MP3/Opus que no estaban en caché; los demás se reutilizaron. Prueba del manifiesto y generación pasaron. Regresión de rama [43634135957](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43634135957): `test` y `Offline quality reports` en éxito. PR #582 abierta; requiere revisión final y CI del head exacto antes de fusionar. No cambia currículo, IndexedDB v1, backup JSON v3 ni dependencias.

- 14 nov 2026: Diagnóstico posterior a integrar la biblioteca (#582): `audio-engine.js` seguía usando exclusivamente `speechSynthesis`; los 2.084 clips en `audio/id/` no se reproducían y por tanto un teléfono sin voz indonesia instalada seguía sin audio. La PR [#583](https://github.com/luisequeira612-commits/bahasa-studio/pull/583) conecta el reproductor a los MP3 Piper mediante SHA-1 del texto normalizado (mismo algoritmo que `scripts/export-audio-manifest.mjs`), prioriza la grabación incluida y conserva la voz indonesia del dispositivo solo como respaldo. Actualiza los ajustes para aclarar que no hace falta instalar voces, aumenta la caché del service worker a `v3.8.95` y precarga el índice/metadatos pequeños; los MP3 se guardan en caché bajo demanda mediante el fetch handler existente, no se precarga toda la biblioteca. Añade pruebas para el hash, reproducción sin TTS, fallback de idioma correcto, velocidad y caché del índice. Sin nuevas dependencias, cambios de currículo, IndexedDB v1 o backup JSON v3. CI del head `8e55ac0ce23234ffc425a0f78f0cc9b76ac102d4` pasó completamente en run [43635949292](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43635949292), incluidos los E2E de navegador, pruebas de reproductor y service worker. No hubo revisiones, comentarios ni hilos pendientes en la PR. Falta la prueba física en Android; la caché offline de cada clip requiere que ese clip se haya descargado previamente.


- 14 nov 2026: Inicio de la auditoría ampliada de la biblioteca de audio sobre `main` `ad2f96a53e71153d92012efc953df8b7396d0628`. Confirmado: 2.084 IDs únicos (2.170 pertenencias de nivel; 86 compartidos), 2.084 MP3 con 13.155.444 bytes; normalización = trim + colapsar espacios + minúsculas, sin quitar puntuación ni aplicar Unicode NFC/NFD. El exportador recorre A1→A2→B1 y conserva la primera variante de texto por ID. El reproductor usa MP3 vía `new Audio()`; Opus no aparece en la ruta principal. La prueba física Android solo valida el clip reproducido/almacenado, no la biblioteca completa. Se añade documentación `docs/AUDIO.md`, invariantes de manifiesto/índice/MP3 y workflow manual de sondeo HTTP Range. El intento de curl desde el entorno de trabajo no pudo resolver el dominio (DNS bloqueado); no se declara resultado de GitHub Pages. Pendiente ejecutar el workflow manual tras integrar esta PR. No modificar hashes/rutas/normalización, IndexedDB v1 ni backup JSON v3. Plan acordado: PRs separados para guardado seguro, caché/migración e implementación Range; descarga por nivel solo tras prueba física posterior.

## PR #585 — guardado seguro del Service Worker — 14 nov 2026
- Rama `fix/audio-safe-cache-put`: PR #585 separa el guardado seguro del Range. El Service Worker solo intenta guardar respuestas HTTP 200 completas; las 206 de Range no entran en la caché normal.
- Los errores de `cache.put()` son fail-open para que una cuota/caché defectuosa no impida reproducir el audio ni completar la respuesta de red. La promesa de vida de la caché se registra sincrónicamente con `waitUntil()`, antes de iniciar el trabajo asíncrono; la escritura termina esa promesa, sin invocar `waitUntil()` tarde.
- La primera ejecución CI del head `7fdc061f1a1d3f5477e2b8e873fa541820bd0689` falló en `Run resilient service worker install tests`. Se detectó que el mock no definía `self.location` y que el código registraba `waitUntil()` demasiado tarde. La rama se corrigió: el mock define `self.location` y comprueba el registro sincrónico.
- La corrección no cambia hashes, rutas, normalización, IndexedDB v1, backup JSON v3 ni dependencias. Pendiente CI del head corregido y revisión antes de fusionar; el manejo Range 206/416 y la caché/migración independiente siguen siendo PRs separadas.

## PR #585 y PR3b — estado de caché de audio — 14 nov 2026
- PR [#585](https://github.com/luisequeira612-commits/bahasa-studio/pull/585) fusionada como `8a6cc8876e99cdc623cd2bfe478697572875bc30`. CI del head final pasó Regression tests y Offline quality reports. La regresión post-merge [43642557121](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43642557121) y Pages [43642556682](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43642556682) también terminaron en éxito.
- PR3b en rama `fix/audio-persistent-cache-migration`: introduce `guardi-audio-v1`, separa los MP3 de la caché versionada de la aplicación y migra respuestas 200 completas desde todas las cachés antiguas `bahasa-studio-*` antes de eliminarlas. Si una copia falla, la activación sigue y conserva las cachés antiguas; el fetch puede seguir sirviendo clips de ellas mientras se reintenta la migración.
- La caché nueva es idempotente y no sobrescribe clips ya migrados. Solo migra URLs `/audio/id/*.mp3` con respuesta 200 y cuerpo no vacío; omite recursos de la app, respuestas parciales y cuerpos vacíos. La versión de caché de la app sube a `v3.8.96` para activar la migración desde `v3.8.95`.
- Añade pruebas de migración desde varias cachés, fallo de copia sin borrar el origen, idempotencia y separación de cachés; el workflow de regresión ejecuta la nueva suite.
- El primer CI con las cuatro pruebas nuevas en verde detectó una prueba previa de `learning-screen-phase-3.test.mjs` cuyo mock de Cache API solo implementaba `add()`. Se amplió el mock con `keys()` y `match()` vacíos para representar cachés antiguas sin clips; así la prueba sigue verificando que se limpien cachés antiguas cuando la migración sí se puede completar, mientras el test específico verifica que ante un fallo real se conserven. El mismo ajuste de `keys()` se aplicó al mock de `tests/curriculum-extraction.test.js`, que también simulaba cachés vacías.
- Sin cambios a hashes de nombres de clips, rutas de audio, normalización, `audio-engine.js`, IndexedDB v1, backup JSON v3 ni dependencias. Range 206/416 sigue siendo una PR separada. La invalidación de clips regenerados con el mismo ID requiere una revisión adicional de metadatos/contenido; no se considera resuelta por esta PR.

## PR3c — respuestas HTTP Range para audio — 14 nov 2026
- Rama `fix/audio-range-requests`: el Service Worker sube la caché de app a `bahasa-studio-v3.8.97`, elimina Range de la petición al origen, obtiene el MP3 completo 200 y lo guarda en `guardi-audio-v1`; después genera la respuesta parcial desde el cuerpo completo, sin almacenar 206.
- Implementa rangos simples `bytes=a-b`, `bytes=a-` y `bytes=-n`; limita el final al tamaño real. Rangos inválidos o múltiples se ignoran y devuelven 200 completo; rangos válidos no satisfacibles devuelven 416 y `Content-Range: bytes */size`. Respuestas 206 incluyen `Content-Range`, `Content-Length`, `Content-Type` y `Accept-Ranges`.
- Añade deduplicación de fetch completo concurrente por URL, soporte desde un MP3 completo ya cacheado incluso offline y manejo fail-open de `cache.put()`. Pruebas nuevas cubren 206, sufijo, rango abierto, clamp, 416, rangos inválidos/múltiples, offline y fallo de caché.
- Sin cambios al ID/hash de nombre, rutas, normalización, `audio-engine.js`, IndexedDB v1, backup JSON v3 ni dependencias. Pendiente CI exacto y revisión; no fusionar hasta verde.
- Primera CI del head `0599cec4313a0b4eaacf54679b4ca32d96044832` detectó que dos fixtures de la suite de migración seguían nombrando la caché de app `v3.8.96`, aunque PR3c ya la sube a `v3.8.97`. Se actualizaron a `v3.8.97` en el commit `0aba35238ef8bd6b145fb669c57af211dbac0652`; las cuatro pruebas de migración pasan en Node 22 local. CI del nuevo head pendiente.
- La prueba manual de GitHub Pages previa confirmó 206 para `bytes=0-1` (`Content-Range: bytes 0-1/6765`, longitud 2). Safari/iOS no probado.
- Nota de PR #586: Pages post-merge [43643854921](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43643854921) pasó; regresión post-merge [43643855169](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43643855169) tuvo un timeout aislado de 30 s en el E2E de burbuja de traducción, ajeno a audio. Se solicitó reintentar el job fallido `132597119731`; no tratar ese resultado como verde hasta confirmar el reintento.
- Sigue pendiente invalidación de caché si se regenera audio de un ID existente; añadir nuevos IDs no debe purgar los clips existentes.


## PR #590 — invalidación selectiva de clips Piper — 14 nov 2026
- PR #586 separó los MP3 en `guardi-audio-v1`; PR #588 añadió respuestas Range 206/416 desde archivos completos almacenados. Esta PR incremental añade SHA-256 por ID MP3 y verifica bytes reales de la caché persistente y de clips legacy.
- Los clips sin cambios permanecen aunque se agreguen IDs nuevos; los que cambian de contenido o desaparecen del inventario se eliminan selectivamente. Si no hay huellas en metadata, se conserva la migración básica ya desplegada.
- `generate_audio.py` actualiza huellas al completar generación y sube el patch de `CACHE_NAME` solo cuando cambia el mapa; el workflow incluye el Service Worker en el commit generado para precargar metadata y activar la verificación.
- Sin cambios al SHA-1 del texto, rutas, normalización, `audio-engine.js`, IndexedDB v1, backup JSON v3 ni dependencias. Se conserva la implementación Range de PR #588. CI pendiente.


## Biblioteca de audio Piper — PR #591 y #593 — 14 nov 2026
- PR #591 fusionada: el workflow manual ofrece modo `hashes` y `generate_audio.py --hash-only`, que calcula SHA-256 de MP3 existentes sin instalar Piper/FFmpeg ni sintetizar o descargar audios.
- PR [#593](https://github.com/luisequeira612-commits/bahasa-studio/pull/593) fusionada como `2731fb50fa5f6d33e8d3252d548e82c4a2182864`; hashes SHA-256 válidos para los 2.084 IDs, cero faltantes/sobrantes/inválidos. Service Worker `v3.8.99`. Regresión post-merge run `43648234256` y Pages run `43648233791` terminaron en éxito.
- Sin cambios a SHA-1 de nombres, rutas, normalización, IndexedDB v1, backup JSON v3 ni dependencias. No se ha probado la biblioteca completa offline en el dispositivo; el usuario confirmó previamente reproducción offline de un clip ya descargado.


## Cobertura de audio interactivo — PR #594 — 14 nov 2026
- Auditoría de código real: el manifiesto de 2.084 IDs no cubría todas las cadenas estáticas que la aplicación puede pronunciar. Se encontraron 96 textos estáticos distintos tras deduplicar entre categorías; 28 ya estaban cubiertos y 68 carecían de clip. Los cuatro grupos contienen 97 entradas únicas contadas por categoría porque un texto aparece en dos grupos.
- Desglose de textos únicos por origen: 40 exercise-audioText (16 nuevos), 3 assessment-listen (2 nuevos), 27 conversation-turn (26 nuevos) y 27 conversation-example (24 nuevos). Las respuestas libres del usuario siguen siendo dinámicas y conservan el fallback TTS.
- PR [#594](https://github.com/luisequeira612-commits/bahasa-studio/pull/594) creada desde la rama audio/interactive-manifest-coverage; CI completo en verde en run 43650767096 (Regression tests) y Offline quality reports. El exportador conserva su modo normal sin cambios; --include-interactive activa las fuentes adicionales. La normalización SHA-1 y los IDs existentes no cambian.
- El workflow permite level=all. Tras integrar la cobertura, ejecutar manualmente engine=piper, mode=full, level=all, limit=0, confirm_full=true. generate_audio.py omite IDs que ya tengan MP3 y Opus; debe sintetizar únicamente los 68 nuevos y actualizar índice/huellas. Los tests en ese modo verifican la unión completa entre manifiesto, índice y archivos.
- No cambia audio-engine.js, Service Worker, rutas, IndexedDB v1, backup JSON v3 ni dependencias. La prueba física offline en Tecno Pova 4 confirma un clip ya cacheado, no toda la biblioteca.

## Preparación de audio sin conexión — PR #596 fusionada — 14 nov 2026
- PR [#596](https://github.com/luisequeira612-commits/bahasa-studio/pull/596) fusionada mediante squash como `49d63b3eade0f18fcb2b3ffb74ab1c59b284eba0`. Añade preparación explícita de MP3 por nivel (A1, A2, B1) y de toda la biblioteca, reutilizando `guardi-audio-v1`; no hay descargas automáticas.
- La selección deduplica IDs compartidos entre niveles, omite los ya guardados, descarga secuencialmente, valida cada archivo contra SHA-256 de `audio/metadata.json`, permite cancelar/reanudar y reintenta los fallidos. La interfaz informa progreso y almacenamiento estimado y advierte antes de preparar toda la biblioteca.
- El Service Worker evita el guardado automático previo a la verificación; los MP3 solo entran en `guardi-audio-v1` después de verificar sus bytes. Precarga el gestor y `audio/manifest.json`; versión `v3.8.101`.
- CI pre-merge final [43654815387](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43654815387): jobs `test` y `Offline quality reports` en éxito, incluidas pruebas nuevas del gestor y empaquetado de preview. Se corrigieron dos fallos de test durante la iteración; el head final quedó verde.
- No cambia Piper, `audio-engine.js`, IDs SHA-1, rutas, normalización, IndexedDB v1, backup JSON v3 ni dependencias. Descarga MP3 existentes; no genera audio nuevo. Respuestas libres dinámicas del Tutor no están incluidas.
- Verificado en `main` tras el merge: `index.html`, `offline-audio-manager.js`, `service-worker.js`, `MEMORY.md` y `docs/AUDIO.md` contienen los cambios esperados. Regresión y despliegue Pages post-merge todavía pendientes de confirmación.
- Fuente de decisión: prueba manual del usuario el 14 nov 2026: un clip reproducido previamente online funciona en modo avión; un clip nunca almacenado no funciona al primer intento offline. La limitación observada es caché bajo demanda, no fallo de generación Piper. No declarar la biblioteca completa disponible offline hasta que el usuario prepare los niveles o toda la biblioteca en su dispositivo.


## Migración curricular B1 U21–U50 completada — 15 nov 2026
- PR #606–#609 fusionadas: B1 U21–U36 completadas. PR #610 fusionada como `93a3c71a`: U37–U40 con cinco lecciones y 22 ejercicios cada una; CI verde en run 43686463048. PR #611 fusionada como `b4357b74`: U41–U44 con cinco lecciones y 22 ejercicios; CI verde en run 43686910827. PR #612 fusionada como `269de28f`: U45–U48 con cinco lecciones y 22 ejercicios; CI verde en run 43687494105. PR #613 fusionada como `251ef5b2`: U49–U50 con cinco lecciones y 22 ejercicios; CI pre-merge verde en run 43687978469.
- B1 queda completo estructuralmente: 50 unidades, cinco lecciones authored por unidad, 250 lecciones y 1022 ejercicios. Currículo total actual: 644 lecciones en 127 unidades implementadas.
- Las tandas #610–#613 reutilizaron vocabulario/IDs locales y frases de traducción ya presentes en `audio/manifest.json`; no añadieron vocabulario, clips ni frases de audio. Sin cambios a IndexedDB v1, backup JSON v3, Service Worker, hashes/rutas de audio, dependencias ni runtime.
- AGENTS.md refleja B1 completo. La coherencia interna y las pruebas estructurales no equivalen a validación nativa ni certificación MCER/BIPA; no se exige KBBI ni hablante nativo.
- B2 U1–U6 están implementadas; U7–U60 pendientes. U6 permanece fuera del recorrido visible hasta preparar su audio y gate de publicación. Roadmap: completar indonesio hasta B2; después inglés A1 para hispanohablantes; ningún otro idioma planificado.



## B2 U6 — aprobación e implementación — 15 nov 2026
- El dueño aprobó explícitamente las ocho formas y ejemplos de B2 U6 `memper-`: `memperkuat`, `memperlemah`, `memperluas`, `memperpanjang`, `memperbesar`, `memperkecil`, `mempermudah` y `mempercepat`.
- Se implementó U6 en la rama `curriculum/b2-u6-memper-20261115`: cinco lecciones authored y 16 ejercicios, con IDs nuevos `b2u6_*`. No se modificaron IndexedDB v1, backup JSON v3 ni dependencias.
- La unidad mantiene el guardarraíl: no enseña `memper-` como regla productiva libre ni generaliza su contraste con `meN-kan`. La lección 5 introduce `memperkecil` antes de usarlo en actividades, y las pruebas de progresión verifican que el repaso solo referencia vocabulario ya enseñado.
- Se actualizaron los baselines de inventario y las pruebas de progresión. La prueba detectó y corrigió una referencia de repaso prematura: `memperkecil` se enseña en la lección 5 antes de utilizarse. CI completo verde en run `43704585402` (Regression tests y Offline quality reports). PR [#615](https://github.com/luisequeira612-commits/bahasa-studio/pull/615) fusionada mediante squash como `e5890b8bc09200d7073467ff25d2d20415aa58f1`.
- U6 permanece fuera del recorrido visible: los gates de aprendizaje/revisión/tutor siguen limitados a U1–U5. La revisión del pipeline confirmó que `scripts/export-audio-manifest.mjs` exporta solo A1/A2/B1 y el workflow `generate-audio.yml` solo ofrece esos niveles y `all`; por tanto no se debe ejecutar todavía una generación completa esperando que incluya U6. Se requiere ampliar de forma explícita y probada el exportador/workflow para B2 antes de generar clips.
- No cambiar hashes, normalización, rutas, `audio-engine.js`, IndexedDB v1 ni backup JSON v3. No activar U6 hasta que los clips estén en manifiesto, índice, metadata y archivos MP3/Opus y las pruebas de cobertura pasen.


## B2 U7 — diseño preliminar ampliado — 15 nov 2026
- `docs/B2_U7_DESIGN.md` se amplió de tres a cinco lecciones explícitas (16 ejercicios distribuidos 3/3/3/3/4) para respetar el estándar de 5–6 lecciones por unidad.
- Auditoría literal del currículo: `pertemuan` ya existe en A2 con ID `a2u15_pertemuan`; `perjalanan` existe en A2 con ID `a2u14_perjalanan`; `pembelian` y `pengiriman` aparecen como reconocimiento en B1 U7, sin entrada propia en esa unidad; `peraturan` aparece en material B1 con ID `v242`. `pembuatan`, `penemuan` y `pergerakan` no tuvieron coincidencia literal en el currículo ejecutable inspeccionado. Esto no prueba ausencia de sinónimos o solapamiento semántico.
- Ninguna forma nueva está aprobada para U7. El diseño solo propone candidatos y condiciones de aprobación; no se añadieron IDs, vocabulario ni ejercicios ejecutables. Se reutilizarán IDs existentes cuando corresponda y se presentarán forma, glosa, ejemplo y evidencia antes de incorporar vocabulario nuevo.
- U7 sigue sin implementar; no activar contenido por el mero hecho de que el documento tenga cinco lecciones propuestas. No se modifican A1/A2/B1, IndexedDB, backup v3 ni dependencias.


## B2 U7 — fusionada — 15 nov 2026
- PR [#617](https://github.com/luisequeira612-commits/bahasa-studio/pull/617) fusionada mediante squash en `main`, commit `cf7def651cfe152c931486290c86b622f3944af7`.
- U7 implementa cinco lecciones authored y 16 ejercicios (3/3/3/3/4), con cinco tipos de ejercicio y producción guiada. El CI final del head `e2da24407296c3f153a9458cd0895050e26ffc7a` pasó en la ejecución #2667, intento 2: `test` y `Offline quality reports` en éxito.
- El dueño aprobó explícitamente `pembelian`, `pengiriman`, `pembuatan`, `penemuan` y `pergerakan` con sus ejemplos. Se reutilizan los IDs canónicos `a2u15_pertemuan`, `a2u14_perjalanan` y `v242` (`peraturan`), sin duplicarlos.
- Durante la reparación se recuperó `index.html` completo desde el historial, se corrigió el progreso de vocabulario de las lecciones 1–2 y se reparó una coma ausente. El diff final de U7 no elimina contenido existente.
- U7 contrasta peN-an/per-an sin enseñar los patrones como reglas productivas libres. No modifica IndexedDB v1, backup JSON v3 ni dependencias.
- U6 y U7 siguen ocultas/no publicables hasta ampliar y verificar el pipeline de audio B2; el flujo actual confirmado cubre A1/A2/B1. No declarar U7 publicada ni con audio listo antes de cerrar ese gate.
- Siguiente bloque: preparar U8 ke-an a partir de su diseño documental existente, sin introducir vocabulario ni IDs nuevos hasta cotejar candidatos y recibir aprobación explícita.



## Diseños B2 U9–U10 — cinco lecciones — 15 nov 2026
- Los diseños documentales `docs/B2_U9_DESIGN.md` y `docs/B2_U10_DESIGN.md` se ampliaron de tres a cinco lecciones authored cada uno, manteniendo 16 ejercicios propuestos por unidad (3/3/3/3/4).
- U9 separa función de -nya, estructura/complemento/voz, causalidad y aspecto, ambigüedad di-V-nya e integración con paráfrasis. No afirma que -nya sea siempre nominalizador ni conjunción causal.
- U10 integra lectura de texto continuo, recuperación de participantes, reformulación, registro y edición guiada. Depende de la aprobación e implementación previa de U7–U9.
- Son diseños documentales, no contenido ejecutable; no se añadieron vocabulario, ejemplos, IDs ni ejercicios definitivos. Se mantiene la regla de no introducir formas o ejemplos nuevos sin aprobación explícita.

## Soporte de generación de audio B2 — PR #619 fusionada — 15 nov 2026
- PR [#619](https://github.com/luisequeira612-commits/bahasa-studio/pull/619) fusionada mediante squash en `main`, commit `42fad9629f67b0d7331d6887ecfcbd0d1f0c62cb`. Head pre-merge `382e02f7a190e0811d3f7be63709d84a0a4e09a0`; CI pre-merge run #2672 pasó con `test` y `Offline quality reports` en éxito.
- El exportador de manifiesto incorpora B2 de forma explícita con `--include-b2`, leyendo el currículo inline mediante el loader B2 existente. Una vez que el índice de audio contiene clips B2 exclusivos, las ejecuciones posteriores preservan automáticamente esas entradas al regenerar otros niveles.
- El workflow manual añade B2 como nivel seleccionable; `all` incluye B2. El generador Piper/Edge/MMS acepta `B2` y mantiene el bloqueo de una sola voz para toda la biblioteca. En modo samples se respeta el nivel seleccionado y solo se versiona `audio-samples`.
- Pruebas nuevas cubren la exportación de vocabulario y respuestas de escucha de U6/U7, unicidad de IDs y hashes SHA-1 existentes. No se modifica la normalización, los hashes, las rutas, `audio-engine.js`, Service Worker, IndexedDB v1, backup JSON v3 ni dependencias.
- PR [#625](https://github.com/luisequeira612-commits/bahasa-studio/pull/625) contiene la biblioteca B2 generada y sigue como borrador en la rama pública `audio/library-B2`; el estado draft no oculta sus MP3/Opus de GitHub. U6/U7 siguen ocultas y no se fusiona ni publica la biblioteca.
- Gate Piper: la licencia del `MODEL_CARD` solo cubre el dataset propio; `id_ID-news_tts-medium` declara CC BY-NC-SA 4.0 y fine-tuning desde Lessac. Piper no representa que existan derechos downstream y la condición de obra derivada de los audios sigue sin resolver. Pocket TTS Indonesian es solo candidato: CC BY 4.0 declarado, pero base Kyutai con acceso condicionado, 438 MB/PyTorch y calidad limitada; no añadir dependencias, credenciales ni cambiar el generador sin aprobación. Fuentes: [Piper licensing](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/LICENSING.md), [Pocket TTS Indonesian](https://huggingface.co/anak10thn/pocket-tts-indonesian).


## B2 U8 ke-an — shortlist documental — 15 nov 2026
- Se añadió a `docs/B2_U8_DESIGN.md` una lista de ocho candidatos, sin incorporarlos al currículo: `kekotoran` (suciedad), `kedatangan` (llegada), `kementerian` (ministerio), `kepulauan` (archipiélago), `ketidakadilan` (injusticia), `kesalahpahaman` (malentendido), `keingintahuan` (curiosidad) y `keberuntungan` (suerte/fortuna).
- La lista se basa en Sören E. Tebay (2024), diapositivas 8–10, que separa nominalizaciones de una base simple y dominios complejos con negación/prefijo bajo. Las glosas españolas son propuestas de traducción de las glosas inglesas de la fuente, no certificación lexicográfica.
- Búsqueda literal en `curriculum-a1.js`, `curriculum-a2.js` e `index.html` (B1/B2 inline) no encontró coincidencias exactas para esas ocho formas; esto no descarta solapamientos semánticos ni derivados relacionados.
- Ningún ejemplo nuevo, ID ni entrada ejecutable se añadió. Las ocho formas siguen pendientes de aprobación explícita del dueño. `ketinggian` queda como caso analítico de ambigüedad; `kejatuhan` y `kebakaran` solo como contraste verbal.
- Fuente: https://home.uni-leipzig.de/tebay/tebay2024keandgfs.pdf. No se afirma validación nativa ni frecuencia actual.

- La propuesta documental de U8 se amplió a cinco lecciones authored reales (3/3/3/3/4 ejercicios, 16 en total), incluyendo alcance de dominios complejos e integración/reformulación guiada. Sigue sin ser contenido ejecutable; las ocho formas candidatas requieren aprobación antes de crear ejemplos o IDs.


## A1 U21–U24 — lección aplicada adicional — 15 nov 2026
- Se conserva la lección 4 de uso general del vocabulario y se añade una lección 5 aplicada: comunicar síntomas/pedir ayuda, elegir y describir ropa, describir el interior de una casa y participar en clase. La recuperación espaciada pasa a ser la lección 6.
- Cada unidad queda con seis lecciones authored (dentro del estándar 5–6) y 24 ejercicios nuevos en total. Las cuatro lecciones aplicadas usan solo IDs existentes; no incorporan vocabulario ni frases de audio. Cada una tiene seis ejercicios y declara como repaso solo los seis IDs que realmente practica.
- La prueba `multi-lesson-progression` se ajusta para que la lección aplicada 5 valide su subconjunto contextual de `reviewVocabIds`, mientras la prueba sigue exigiendo que todas las palabras se introduzcan una sola vez y que la lección 6 recupere la unidad completa. Es una corrección del contrato de prueba; no cambia currículo ni runtime.
- Inventario A1: 165 lecciones (27 unidades con 5 y 5 unidades con 6); todas las unidades implementadas A1–B2 siguen dentro del estándar. El baseline de respuestas escritas pasa de 892 a 900 (+8 traducciones).
- PR [#626](https://github.com/luisequeira612-commits/bahasa-studio/pull/626) fusionada por squash en `main` como `19a30a34a38e491b7d31392bf79f7e9f9342b914`; CI pre-merge run `43749115240`, regresión post-merge `43749335943` y Pages `43749335399` terminaron en éxito. PR #627 también espera a que `App.studyActivity` se hidrate en su prueba E2E antes de sumar XP, evitando una carrera de inicialización; no cambia runtime. Sin cambios a IndexedDB v1, backup JSON v3, manifiestos de audio ni dependencias.


## Audio legal/provenance migration — 15 nov 2026
- La auditoría confirmó una ambigüedad real en la cadena Piper de producción: id_ID-news_tts-medium está documentado históricamente como CC BY-NC-SA 4.0 y fine-tuned desde en_US-lessac-medium; la documentación oficial de Piper no garantiza derechos downstream sobre los outputs.
- Se preparó la migración a MMS Indonesian (facebook/mms-tts-ind), revisión 171b004ccd54f266a31efee71f1ad850c91d39c0, modelo CC BY-NC 4.0 y SHA-256 del peso d56181bae3a51458aab6b4a893ecd71d0fde69378f576c53e139b59940d80ca0. El workflow rechaza Piper para generación full y fuerza --force con MMS para regenerar la biblioteca completa.
- PR de migración: rama audio/license-safe-mms-20261115. El audio existente sigue siendo Piper hasta ejecutar y fusionar la regeneración completa; no afirmar que la migración está terminada antes de verificar los nuevos MP3/Opus y CI.


## Audio MMS — trazabilidad de modelo — 15 nov 2026
- PR #628 fusionada como `d1102aa36456698d3718834beb28b0db91bef7ec`: motor de producción MMS Indonesian, revisión inmutable y SHA-256 documentado; el workflow bloquea generación full con Piper. PR #629 fusionada como `a4269caf7209e9f0d3ecd3ba85a2477d0d647dfd`: verifica el SHA-256 real de `model.safetensors` antes de cargar MMS; CI de regresión en verde.
- En `main`, la biblioteca sigue siendo íntegramente Piper: manifiesto 2.152/2.152 IDs cubiertos (A1 683, A2 1.014, B1 541, B2 0); metadata contiene 2.152 huellas MP3 y declara Piper. La migración no se ha ejecutado ni publicado. No pedir al dueño descargar pesos manualmente: el runner de Actions los descarga y verifica.
- PR #630 añade a `audio/metadata.json` ID/revisión/SHA-256/licencia/enlace/atribución del modelo MMS cuando se complete la generación, y refuerza el enlace/atribución en `docs/AUDIO_LICENSE.md`. No modifica audios ni afirma que la migración esté terminada.


## Muestras TTS MMS — corrección de caché y procedencia — 16 nov 2026
- La revisión del pipeline encontró que `audio/tts-samples` conservaba MP3 MMS generados antes de fijar/verificar el peso actual. El modo `samples` reutilizaba esos archivos por caché, por lo que una nueva ejecución podía aparentar éxito sin volver a sintetizarlos con la revisión MMS auditada.
- Se corrige el workflow para forzar la regeneración de las muestras seleccionadas en cada ejecución; solo reemplaza los clips del motor seleccionado, conserva las muestras de los otros motores y no toca `audio/id` ni la biblioteca publicada.
- Cada registro de muestra MMS ahora incluye ID, revisión inmutable, SHA-256, licencia CC BY-NC 4.0, URL de licencia y atribución. Se añade prueba unitaria de esos campos.
- La biblioteca de producción continúa declarada Piper hasta completar y verificar la migración total. Las muestras son evaluación técnica, no certificación de pronunciación ni dictamen legal.


## Corrección del workflow de muestras MMS — 16 nov 2026
- La ejecución [43795277223](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43795277223) falló antes de sintetizar: al reutilizar la rama histórica `audio/tts-samples`, el paso de preparación intentó mezclarla con `main` y encontró un conflicto add/add en `audio/manifest.json`. La instalación del motor MMS sí terminó correctamente; la ejecución no produjo nuevas muestras MMS.
- Corrección propuesta: cada ejecución `samples` crea una rama aislada `audio/tts-samples-${GITHUB_RUN_ID}` desde `origin/main`. No mezcla ni sobrescribe la rama histórica; los modos `full` y `hashes` conservan su estrategia de actualización. Pendiente CI y una nueva ejecución de 10 muestras A1 MMS.


## Corrección de ramas de generación completa MMS — 16 nov 2026
- La ejecución [43818039964](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43818039964) sí recibió `engine=mms`, `mode=full`, `level=all`, `limit=0` y `confirm_full=true`. Instaló MMS correctamente, pero falló antes de exportar el manifiesto o sintetizar audio: la rama histórica `audio/library-all` estaba divergida (2 commits propios y 36 detrás de `main`) y el merge encontró conflictos en `service-worker.js` y `tests/audio-manifest.test.mjs`. No se generó ni reemplazó audio.
- Corrección en rama `fix/audio-generation-branch-base-20261116`: los modos `full` y `hashes` crean ahora una rama nueva por ejecución desde `origin/main` (`audio/library-$LEVEL-$GITHUB_RUN_ID` o `audio/library-hashes-$GITHUB_RUN_ID`), sin mezclar ramas históricas divergentes. El modo `samples` conserva su rama aislada por ejecución.
- Pendiente: CI de esta corrección; después reintentar MMS full/all y verificar los 2.152 IDs, MP3/Opus, hashes, metadata, pruebas y PR antes de afirmar que la migración está completa.


## B2 U8 ke-an — aprobación e implementación — 16 nov 2026
- El dueño aprobó explícitamente las ocho formas y los ejemplos contextuales del paquete U8: `kekotoran`, `kedatangan`, `kementerian`, `kepulauan`, `ketidakadilan`, `kesalahpahaman`, `keingintahuan` y `keberuntungan`.
- Se implementó U8 en la rama `curriculum/b2-u8-ke-an-20261116`: cinco lecciones authored y 16 ejercicios (3/3/3/3/4), cinco tipos de ejercicio y producción guiada. Se crearon IDs nuevos `b2u8_*` solo para las ocho formas aprobadas.
- Las oraciones usadas en vocabulario/ejercicios proceden del paquete aprobado; no se introducen candidatos adicionales ni se usan `ketinggian`, `kejatuhan` o `kebakaran` como vocabulario nuevo.
- La unidad mantiene los guardarraíles: ke-...-an no se presenta como traducción única ni como regla productiva libre; el foco es interpretación contextual y alcance de dominios documentados.
- U8 queda implementada pero no se añade a la ruta visible: el gate actual mantiene B2 U1–U5 visibles mientras U6–U8 esperan el gate de audio/publicación B2. No cambiar visibilidad solo por implementar contenido.
- No se modifican IndexedDB v1, backup JSON v3 ni dependencias. El audio de U8 queda pendiente de generación/verificación en manifiesto, índice, metadata y archivos antes de cualquier publicación.
- El estándar de 5–6 lecciones authored se mantiene: B2 pasa de 35 a 40 lecciones authored en 8 unidades implementadas.
- El estado `not_checked` de las fuentes lingüísticas se conserva: la aprobación del dueño autoriza el uso curricular de estas formas y ejemplos, pero no equivale a validación nativa, certificación lexicográfica ni certificación MCER/BIPA.

## Audio B2 MMS para U8 — 16 nov 2026

- PR #640 fusionada como `449984e1cb8c9a543a5e2387b0442b624988e48e`; el workflow admite `source_ref` y full mode conserva los audios existentes, generando solo los faltantes.
- El usuario ejecutó [run 43910956541](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43910956541) con `engine=mms`, `mode=full`, `level=B2`, `limit=0`, `confirm_full=true` y `source_ref=curriculum/b2-u8-ke-an-20261116`. La exportación detectó 98 textos B2 únicos; el índice final reportó 2.212 clips. Se generaron 14 pares MP3/Opus faltantes y se refrescó una huella SHA-256.
- Las pruebas propias del generador/manifiesto pasaron. La regresión [run 43911446349](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43911446349) completó `test` y `Offline quality reports` en éxito.
- GitHub Actions no pudo crear la PR automáticamente porque el token no tenía permiso `createPullRequest`. Se abrió manualmente [PR #641](https://github.com/luisequeira612-commits/bahasa-studio/pull/641), dirigida a la rama curricular U8 para separar el audio del contenido; se fusionó mediante squash en esa rama como `7587ecc84ed57edb7d6d361cf311e44193283897`.
- La PR curricular [#639](https://github.com/luisequeira612-commits/bahasa-studio/pull/639) ahora contiene U8 y los audios en su rama `curriculum/b2-u8-ke-an-20261116`, head `7587ecc84ed57edb7d6d361cf311e44193283897`. Todavía no está fusionada en `main`: la rama necesita sincronizar las actualizaciones recientes de `main` en `.github/workflows/generate-audio.yml` y `MEMORY.md`, después ejecutar y verificar CI sobre el head actualizado.
- U8 permanece fuera de la ruta visible. No publicar ni cambiar su visibilidad hasta que #639 esté sincronizada, CI esté verde y se verifique el manifiesto, índice, metadata, hashes y archivos de audio. No se modifican IndexedDB v1, backup JSON v3 ni dependencias. La validación técnica no equivale a certificación lingüística nativa/MCER/BIPA.

## Audio generation from a curriculum ref — 16 nov 2026
- PR #639 (B2 U8) dejó el gate de regresión bloqueado porque `tests/audio-manifest.test.mjs` exige que el índice de audio coincida con la unión del manifiesto; la rama de U8 tiene los textos nuevos pero todavía no los MP3/Opus correspondientes.
- El workflow `.github/workflows/generate-audio.yml` ahora admite `source_ref` y construye la rama de generación desde `origin/$SOURCE_REF`. Esto permite ejecutar MMS full sobre una rama curricular aún no fusionada, conservando los audios existentes y generando solo los IDs que falten cuando el generador no use `--force`.
- Para U8, el plan es usar `source_ref=curriculum/b2-u8-ke-an-20261116`, `engine=mms`, `mode=full`, `level=B2`, `limit=0`, `confirm_full=true`. El generador actual usa `--force`, por lo que primero debe cambiarse a modo sin force para aprovechar los clips B2 existentes; después se ejecutará Actions manualmente desde la interfaz porque el conector disponible no expone `workflow_dispatch`.
- No fusionar PR #639 ni afirmar que U8 está publicado hasta tener los ocho audios nuevos, CI de audio/regresión en verde y revisión de la rama generada.


## Corrección de velocidad de reproducción MMS — 16 nov 2026
- La revisión de `audio-engine.js` encontró que el reproductor aplicaba `playbackRate=0.85` por defecto a todos los MP3, ralentizando las grabaciones MMS un 15 %. Se cambia el valor inicial a velocidad natural (1.0); las opciones lentas siguen disponibles manualmente.
- Se actualiza el texto de estado que todavía identificaba erróneamente la biblioteca incluida como Piper: ahora indica MMS. Se añade regresión para la velocidad inicial y se incrementa la caché de la app a `v3.8.104` para que los dispositivos reciban el reproductor actualizado.
- Esto corrige la ralentización del reproductor, pero no certifica ni corrige por sí solo la articulación de `makan` ni de `Selamat pagi`; la calidad fonética de esos clips queda pendiente de escucha humana tras publicar la versión. No se modifican archivos de audio, currículo, IndexedDB v1, backup JSON v3 ni dependencias.
- La primera ejecución CI detectó una aserción histórica de `tests/regression.test.cjs` que todavía esperaba el texto Piper; se actualizó para esperar MMS. No era un fallo del motor ni de la velocidad. Fuente: run 43966351482, 16 nov 2026.
- La segunda CI pasó regresión, pruebas de motor, calidad local y los informes; el E2E encontró dos aserciones adicionales antiguas que esperaban Piper en `tests/browser-e2e.test.cjs`. Se actualizaron ambas a MMS; pendiente nueva CI completa. Fuente: run 43966595598, 16 nov 2026.
- Fuente: inspección de `audio-engine.js`, pruebas `tests/audio-engine.test.cjs` y reporte del usuario en ChatGPT, 16 nov 2026.


## Muestras fonéticas dirigidas — 16 nov 2026
- Se amplía el generador de muestras para aceptar IDs explícitos del manifiesto (`--ids`), en vez de limitarse a los primeros N textos. La entrada de GitHub Actions acepta IDs separados por comas; solo afecta al modo `samples` y no puede usarse para generación de biblioteca `full`.
- El objetivo de evaluación del reporte del usuario es comparar `Makan` (ID `2c82a33b24e7`), `Selamat pagi` (`e1b89cc35480`), `Selamat pagi!` (`3023fa268c90`) y `Saya makan.` (`315b9da4bbf4`) con MMS y Edge TTS. Las muestras son solo material de evaluación, no sustituyen la biblioteca offline ni implican adoptar Edge como voz de producción.
- Se añaden pruebas para selección exacta, orden, IDs desconocidos/duplicados y respeto del nivel. No se modifica la biblioteca de audio, currículo, IndexedDB v1, backup JSON v3 ni dependencias. Fuente: `audio/manifest.json`, `scripts/generate_audio.py`, `tests/test_audio_generation.py` y reporte del usuario, 16 nov 2026.
- PR [#644](https://github.com/luisequeira612-commits/bahasa-studio/pull/644) fusionada en `main` como `ddb6c6c53a925ed656998e5fa5b9197b9e09650b`. CI pre-merge terminó verde tras reintentar un timeout E2E ajeno al cambio (translation bubble); las pruebas del generador de muestras, incluida selección exacta, pasaron. Pages post-merge [run 43976343369](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43976343369) y regresión post-merge [run 43976344361](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43976344361) completaron en éxito.
- Para generar muestras dirigidas, en Actions → Generate Indonesian audio: `mode=samples`, `engine=both`, `level=A1`, `voice=id-ID-GadisNeural`, `ids=2c82a33b24e7,e1b89cc35480,3023fa268c90,315b9da4bbf4`. Una sola ejecución genera primero MMS y después Edge TTS femenino; `limit` se ignora cuando `ids` está informado. El workflow debe ejecutarse manualmente por falta de una acción de dispatch en el conector; las muestras todavía no están generadas. Edge es solo referencia de escucha, no voz de producción. Fuente: PR #644 y Actions #43975459300 (intento 2), #43976343369 y #43976344361; 16 nov 2026.

- Mejora del flujo de evaluación: el workflow permite `engine=both` únicamente en modo `samples`, para producir MMS y Edge en una sola ejecución, y acepta una voz Edge explícita. La voz de referencia predeterminada se fija en `id-ID-GadisNeural` para incluir la opción femenina preferida. PR [#646](https://github.com/luisequeira612-commits/bahasa-studio/pull/646) fusionada en `main` como `b7a0bc6e4467e1bea94531c28ade1ef7cef2e1fd`; `engine=both` está limitado a `mode=samples` y ejecuta MMS seguido de Edge TTS con la voz de referencia `id-ID-GadisNeural`.

- Verificación post-merge de PR #646: Pages [run 43977726770](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43977726770) y regresión [run 43977727621](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43977727621) completadas en éxito. Próximo paso: el usuario debe iniciar una sola ejecución manual de `Generate Indonesian audio` con `engine=both`, `mode=samples`, `level=A1`, `voice=id-ID-GadisNeural` e IDs `2c82a33b24e7,e1b89cc35480,3023fa268c90,315b9da4bbf4`; el conector disponible no puede despachar workflow. Aún no se han generado ni reemplazado clips de producción.

## Audio MMS + Whisper — 17 nov 2026
- PR #650 amplía la migración MMS con revisión Whisper y corrección conservadora; permanece sin fusionar y requiere revisión del dueño.
- Workflows de audio solo manuales, \`ubuntu-latest\`, timeout por job y caché de modelos temporal con \`actions/cache\`.
- Primera ejecución: 100 frases A1; informar fallidos, revisados, auto-fix, unresolved y minutos transcurridos. No regenerar producción en esta fase.
- Producción futura: lotes de 150–200, \`audio_progress.json\` compara hash de texto y override y permite reanudar sin repetir audios intactos.
- Whisper base/small en CPU solo filtra; no certifica pronunciación. Máximo dos pasadas y solo filas \`revisar\`.
- Auto-correcciones llevan estado \`auto_whisper\`; cambios de letras se rechazan cuando no se puede probar identidad léxica; dudas a \`pronunciation_unresolved.txt\`.
- No cambiar IndexedDB ni backup JSON v3, no añadir dependencias a la app y no fusionar hasta aprobación explícita.


## Estado de ejecución MMS + Whisper — 18 nov 2026
- PR #650 está fusionada en `main` (`0daa1af3a85dfc050ce806d3fa51903722491852`); CI post-merge y Pages terminaron en éxito. PR #651 también está fusionada (`8efd2e841e1721b15478fdbb84fa66bc645e72ac`), estandarizando Laras en `ubuntu-latest`; ambos checks de PR pasaron.
- La primera ejecución manual de la muestra A1, run #44219858277, terminó `startup_failure` sin jobs ni artefactos; no hubo generación ni minutos de runner de procesamiento. No hay diagnóstico interno disponible en la API. Reintentar después de confirmar el estado del workflow/Actions; no iniciar producción.
- Se detectó y corrige en PR #652 un desajuste: el input de lote aún tenía default 175 aunque la decisión vigente es 200. Default objetivo 200, ajustable 150–200. Muestra100 sigue independiente y no toca producción.
- Fuente: PR #650/#651, run #44219858277 y decisión del dueño; 18 nov 2026.


## Diagnóstico y corrección del arranque MMS + Whisper — 18 nov 2026
- La primera muestra manual (#44219858277) acabó `startup_failure` sin jobs ni artefactos. La inspección de las ejecuciones recientes también encontró runs sintéticos `push` sin jobs para los workflows de audio manuales, mientras la regresión general sí arrancó y pasó; esto no generó audio.
- Causa concreta identificada en `audio-review-whisper.yml`: se interpolaba `${{ runner.temp }}` en `jobs.audio.env`, donde GitHub no admite el contexto `runner`. La tabla oficial de disponibilidad de contextos restringe `jobs.<job_id>.env` y sí permite `runner` en `jobs.<job_id>.steps.env`.
- PR #653 mueve las rutas Hugging Face/Torch/Whisper a un paso inicial con contexto `runner` válido y las exporta a `GITHUB_ENV`; conserva los mismos directorios bajo `RUNNER_TEMP`, cache, ejecución manual, runner estándar y muestra100 por defecto. No ejecuta TTS ni toca producción.
- PR #652 fusionada por squash (`52753a37e0fa74c976b63600c1d15a4cfec23f23`); checks `test` y `Offline quality reports` en éxito. El tamaño por defecto ahora es 200 (rango 150–200).
- Fuente: workflow `audio-review-whisper.yml`, runs #44219858277/#44220083166/#44221022568, PR #652 y documentación oficial GitHub Actions Contexts; 18 nov 2026.

## Diagnóstico Whisper de la muestra A1 — 18 nov 2026
- Run sample100 #44222325789 terminó correctamente: 100/100 audios procesados; 17 coincidencias directas, 13 frases marcadas `auto_whisper`, 70 `revisar`, 0 fallos. Las 13 filas `auto_whisper` no son 13 correcciones independientes: reflejan 11 palabras con overrides reutilizadas en varias frases.
- La revisión encontró que Whisper base dejó 70 frases bajo revisión (score medio aproximado 0.155); esto es señal de ASR débil o desajuste de audio/texto, no prueba automática de mala pronunciación.
- PR #654 fusionada por squash como `d4af343a8981e8667756ad64ba3560d0256a6d34`. Añade diagnóstico manual base vs small sobre los mismos 100 clips, sin regenerar MMS ni tocar producción, IndexedDB o backup v3.
- Se corrigió después del merge la normalización de espacios en `scripts/diagnose_whisper_sample.py` (commit `d0c58bf88319937a97955096732e86ba9cc5e48b`) y el script carga cada modelo Whisper una sola vez, no una vez por audio.
- El workflow `whisper-sample-diagnostic.yml` es exclusivamente `workflow_dispatch`, usa `ubuntu-latest` y timeout 180. El conector GitHub disponible no ofrece acción para despachar workflows; el diagnóstico comparativo aún requiere iniciarlo manualmente desde Actions. No iniciar producción antes de revisar ese informe.
- Fuente: Actions #44222325789, PR #654 y commit de corrección; 18 nov 2026.


## Diagnóstico Whisper: dependencia FFmpeg — 18 nov 2026
- La ejecución manual del diagnóstico comparativo #44241747682 descargó la muestra100 e instaló Whisper, pero falló al comenzar la transcripción porque el runner no tenía el ejecutable del sistema `ffmpeg` (FileNotFoundError). No se procesaron comparaciones, no se generó artefacto de informe y no se modificó audio de producción.
- Corrección propuesta en la rama `fix/whisper-diagnostic-install-ffmpeg-20261118`: instalar FFmpeg con apt en un paso explícito antes de instalar/ejecutar Whisper y verificar `ffmpeg -version`. Se mantienen workflow_dispatch, ubuntu-latest, timeout 180, muestra existente y cero regeneración MMS. Pendiente CI y nueva ejecución manual del diagnóstico.
- Fuente: Actions run #44241747682, logs del job 134591063817; 18 nov 2026.


## Resultado Whisper base vs small y análisis de la muestra — 18 nov 2026
- La ejecución manual #44244108322 terminó correctamente: 100/100 clips comparados; media de similitud por tokens `base=0.4205`, `small=0.3960`; 13 casos favorecen a base, 11 a small, 35 similares y 41 bajos en ambos. No se regeneró MMS ni se modificó producción.
- Los 100 clips representan 86 textos objetivo distintos; 42 son palabras aisladas y 36/41 casos `both_low` son palabras de una sola palabra. No hay evidencia de archivos vacíos/silenciosos; la duración fue 0.768–3.504 s. Esto apunta a una limitación importante del ASR en clips muy cortos, no demuestra mala pronunciación MMS.
- Se detectó que la métrica es similitud de edición de tokens, no score fonético; números escritos y dígitos no se normalizan. Este cambio añade desglose por longitud, definición explícita de umbrales y conteo de coincidencias ordenadas sin duplicar tokens. Pruebas Python estándar, sin dependencias nuevas.
- Mantener Whisper base como referencia provisional; no cambiar overrides ni regenerar producción por estos resultados. Revisar primero una muestra estratificada y cualquier discrepancia con escucha técnica/humana.
- Fuente: Actions #44244108322, artefacto #14401108232, CSV comparativo y análisis técnico de los 100 MP3 del artefacto #14391907433; 18 nov 2026.


## Auditoría auditiva estratificada de sample100 — 18 nov 2026
- Diseño aprobado para evaluación no productiva: 30 textos objetivo únicos, cuotas 12 de una palabra, 8 de dos, 8 de tres y 2 de cuatro o más; repartir por categorías Whisper para no seleccionar solo los peores. La muestra original tiene 100 clips, 86 textos únicos, 42/26/25/7 por longitud.
- La escucha inicial evalúa solo aspectos técnicos (volumen, cortes, distorsión, ruido, silencios); pronunciación, fonemas, acento y prosodia quedan `not_assessed` hasta revisión competente en indonesio. Whisper no certifica pronunciación.
- PR en curso añade un generador Python estándar, determinista y de solo lectura del manifiesto desde el CSV comparativo; tests de cuotas, unicidad, reproducibilidad y fallback. No copia, modifica ni regenera audio; no toca producción, IndexedDB ni backup v3.
- Fuente: análisis de artefactos #14391907433/#14401108232 y diseño metodológico guardado en Notion; 18 nov 2026.


## Auditoría técnica reproducible de sample100 — 18 nov 2026
- PR en curso: feat/audio-technical-audit-20261118. Añade scripts/audit_audio_technical.py, auditoría determinista y de solo lectura sobre los MP3 seleccionados por el manifiesto estratificado.
- Mide decodificación, duración, RMS, pico, fracción de clipping y tramo silencioso más largo; clasifica clean, quiet_or_unbalanced, clipped_or_truncated, dropout_or_silence o uncertain.
- Usa solo herramientas estándar del runner (ffmpeg + Python stdlib), no añade dependencias a la app ni modifica audio, overrides, producción, IndexedDB o backup v3. La auditoría técnica no evalúa pronunciación, fonemas, acento, prosodia ni corrección lingüística.
- Añade pruebas unitarias para las métricas y etiquetas. La ejecución real se hará sobre el manifiesto + MP3 del artefacto sample100 cuando estén disponibles en un workflow manual; no se deben regenerar audios para realizar esta auditoría.
- Fuente: PR #657 fusionada (7746b2f2021e7084552e0da31a94c99d5e3e4b9c) y diseño de auditoría aprobado; 18 nov 2026.


## Corrección CI: descubrimiento de pruebas de auditoría técnica — 18 nov 2026
- La primera ejecución de CI de PR #658 (#44262775374) falló en el paso de auditoría técnica porque unittest discover encontró 0 pruebas: el archivo tests/test_audio_technical_audit.py contenía funciones test_* simples, no métodos de una clase unittest.TestCase.
- Se corrige el archivo convirtiendo las ocho comprobaciones en métodos de unittest.TestCase, manteniendo Python estándar y el mismo comando de CI. El fallo era de descubrimiento del runner, no evidencia de que las métricas del auditor estuvieran incorrectas.
- No se fusiona PR #658 hasta que todas las pruebas y el resto de CI terminen correctamente. No se ejecutan audios ni se modifica producción durante esta corrección.
- Fuente: Actions run #44262775374, job 134659896804, paso Run technical audio audit tests; 18 nov 2026.


## Corrección de aserción RMS en auditoría técnica — 18 nov 2026
- CI de PR #658 (run #44265148387) ya descubrió y ejecutó las ocho pruebas correctamente, pero una aserción de rango RMS era demasiado alta: el vector de prueba produce RMS ≈0.61236, no >0.7.
- Se ajustó únicamente la expectativa del test a 0.6 < RMS < 0.7; no cambia la implementación del auditor ni sus umbrales técnicos.
- Los otros siete tests pasaron. La corrección queda en la misma rama y debe volver a ejecutar CI antes de fusionar.
- Fuente: Actions run #44265148387, job 134667716096, paso Run technical audio audit tests; 18 nov 2026.


## Migración Piper: conservar los IDs históricos indexados — 21 nov 2026
- La biblioteca actual tiene 2.144 entradas de manifiesto y 2.212 IDs en audio/index.json. Comparación con la biblioteca Piper completa anterior (commit ae64d48994947747404eb081b77e347b10623666): 2.084 IDs compartidos, 60 IDs nuevos y 68 IDs históricos retirados del manifiesto actual pero aún presentes en el índice.
- La regeneración total debe producir 2.212 clips Piper: los 2.144 textos del manifiesto curricular actual más los 68 textos recuperados del manifiesto Piper histórico. No borrar ni dejar en MMS los 68 archivos indexados.
- El workflow full/all recupera el manifiesto histórico desde Git, y generate_audio.py --legacy-manifest añade solo los IDs que siguen en el índice y faltan del manifiesto actual. Si algún ID indexado no aparece en ninguno de los dos manifiestos, la generación falla de forma segura. El manifiesto curricular actual no se contamina con lecciones retiradas.
- PR de implementación en curso: fix/audio-preserve-legacy-piper-20261121. Añade pruebas de reconciliación; todavía no genera archivos ni cambia metadatos productivos. La ejecución real de Actions sigue pendiente.
- Fuente: comparación de audio/manifest.json y audio/index.json de main con el commit Piper histórico; 21 nov 2026.

- Para no depender de un dispatch manual desde el conector, PR #661 incorpora un disparador de una sola intención: al llegar a main el marcador docs/PIPER_MIGRATION_REQUEST.md, un workflow con permisos mínimos (actions:write, contents:read) ejecuta `gh workflow run generate-audio.yml` con engine=piper, mode=full, level=all y confirm_full=true. No genera en PR; solo después de fusionar el preparativo. El workflow de generación crea una rama/PR revisable, no fusiona automáticamente los audios.

- PR #661 se fusionó (commit 112e8fa5701c08c0b8feceaf16918be756fde5cc); ambos jobs de regresión pasaron. El dispatch automático inicial (#44944163681) falló porque `gh workflow run` no tenía contexto Git (`fatal: not a git repository`); no se generó audio. PR correctivo `fix/piper-dispatch-repo-context-20261121` agrega `--repo "$GITHUB_REPOSITORY"` y modifica el marcador para rearmar el disparo al fusionar. La regeneración completa sigue pendiente.

## Corrección de acceso B2 U1–U45 en PR #705 — 22 nov 2026
- El primer CI falló porque el inventario esperaba 40 unidades B2 y los contratos de acceso del tutor, aprendizaje y traducción contextual seguían limitados a U1–U5. No era un defecto de las lecciones nuevas.
- Se actualizó el baseline a 45 unidades / 225 lecciones authored y se extendieron los filtros de las superficies de aprendizaje, vocabulario del tutor, prompt del tutor, ruta/progreso y fallback de traducción a B2 U1–U45; unidades posteriores siguen excluidas. El desbloqueo continúa secuencial.
- PR #705 conserva U41–U45 ocultas/no publicadas. Última revisión de código en commit 2cec5285474e2e7eed54a8877cff8320c3428a16; CI de ese commit pendiente al registrar esta nota.
- Fuente: GitHub Actions run #45072921862 (primer fallo: dos expectativas obsoletas), commits f8fda3a, 4dae636 y 2cec528; 22 nov 2026.


## B2 U46–U50 integradas en main — PR #706 — 22 nov 2026
- U46: elipsis de palabras distintas del sujeto (§4.115); U47: elipsis múltiple (§4.116); U48: elipsis de posesivos (§4.117); U49: elipsis en respuestas (§4.118); U50: integración §§4.112–4.118.
- Cinco lecciones authored y 16 ejercicios por unidad (3/3/3/3/4): 25 lecciones, 80 ejercicios, cuatro tipos (mc, translate_es_id, order, write), cero vocabulario/IDs nuevos y sin audio. Se usan ejemplos documentados de Sneddon et al. (2010); U50 reutiliza ejemplos ya estudiados para consolidar sin inventar material.
- PR #706 fusionada mediante squash en main (commit 1b01baf6d66fae2cea907b009ab13f4614f26807). U46–U50 quedan integradas con filtros de aprendizaje/progreso/tutor/traducción y pruebas de inventario hasta U50; U51–U60 siguen excluidas. U46–U50 permanecen ocultas/no publicadas.
- No modifica IndexedDB v1, backup JSON v3, biblioteca Piper ni dependencias. Fuente y estructura no equivalen a validación nativa ni certificación MCER/BIPA.

## B2 U51–U55: paquete de diseño y fuentes — 22 nov 2026
- Preparado en rama curriculum/b2-u51-u55-pronouns-numbers-comparison-20261122: U51 sustitutos pronominales/pronombres indefinidos; U52 interrogativos + saja/pun; U53 cuantificadores y números indefinidos; U54 clasificadores/partitivos; U55 comparativas/equativas.
- Cinco diseños documentados en docs/B2_U51_DESIGN.md a docs/B2_U55_DESIGN.md, con alcance, cinco objetivos de lección y ejemplos respaldados por Sneddon et al. (2010). Aún no se integran en el currículo ejecutable: la siguiente implementación debe añadir cinco lecciones y 16 ejercicios por unidad sin inventar ejemplos indonesios.
- U51–U55 seguirán ocultas/no publicadas y fuera de los filtros de acceso hasta su implementación y validación de CI.


## B2 U51–U55 integradas en main — PR #708 — 22 nov 2026
- Integradas U51–U55 en main con cinco lecciones authored y 16 ejercicios por unidad (3/3/3/3/4), cuatro tipos (mc, translate_es_id, order, write), sin vocabulario/IDs nuevos ni audio. Ejemplos documentados en Sneddon et al. (2010), §§2.21–2.33, 2.67–2.69, 2.83–2.117 y 2.101–2.105; no se inventan oraciones indonesias.
- Filtros de aprendizaje, tutor, vocabulario, traducción y progreso ampliados a U1–U55; U56–U60 siguen fuera de main hasta el PR #710. Todas permanecen ocultas/no publicadas. Sin cambios a IndexedDB v1, backup JSON v3, biblioteca Piper ni dependencias.
- Se añaden 0 IDs léxicos y 0 términos a trackers; no hay estados nuevos de verificación que atribuir.


## B2 U56–U60 integradas en main — PR #710 — 22 nov 2026
- U56 adverbios de manera con dengan/secara (§§2.168–2.169); U57 adjuntos preposicionales de medio, compañía, beneficio, razón, comparación, excepción y tema (§§2.209–2.215); U58 alcance de negación, temporales y modales (§§2.133–2.159); U59 integración sintáctica; U60 proyecto integrador B2.
- Cinco lecciones authored y 16 ejercicios por unidad (3/3/3/3/4), cuatro tipos; U59–U60 reutilizan ejemplos previos y no introducen vocabulario nuevo. No se añaden IDs léxicos ni audio. PR #710 se fusionó en `main` mediante squash (commit `a816c8c01a9920e2042c7fa5bddde50aa4c0f7fa`); CI pre-merge y regresión post-merge pasaron, y Pages se desplegó. Todas las unidades U6–U60 siguen ocultas/no publicadas.
- Filtros y baseline ampliados a 60 unidades / 300 lecciones authored. Sin cambios a IndexedDB v1, backup JSON v3, biblioteca Piper ni dependencias. La estructura y los ejemplos de referencia no equivalen a validación nativa ni certificación MCER/BIPA.


## Arquitectura multiidioma — aprobación y PR de robustez — 22 nov 2026
- El dueño aprobó preparar Guardi para diez idiomas en orden pt-BR → en → it → fr → de → nl → ru → ja → ko → id, con UI española, cero backend/coste y regla A1→A2→B1→B2 antes de avanzar. Detalles, voces candidatas, fuentes y riesgos: Notion “Guardi - Arquitectura Multi-idioma”.
- PR #712 sincronizó estado B2 U1–U60 y se fusionó en main (8df80778). La persistencia navigator.storage.persist() ya existía; no duplicarla. PR de robustez añade metadatos sociales, licencia y validación más estricta de backup v3 manteniendo IndexedDB v1; el único idioma restaurable en esta fase es id y los backups v3 históricos sin language se interpretan como id.

- PR #713 CI detectó una aserción de regresión desactualizada que esperaba el objeto normalizado v3 sin el nuevo campo language; el código pasó el parseo y el fallo no indica corrupción ni fallo de importación. Se actualiza la expectativa para incluir language y se espera una nueva ejecución completa.

- Segunda ejecución CI de PR #713 encontró otra aserción de fuente antigua en la prueba legacy SRS, que buscaba el objeto v3 sin language. La nueva suite de backup y la primera expectativa ya pasaron; se actualiza esta última aserción y se repetirá CI.

- CI inicial PR #714 (run 45095656863) detectó una única expectativa heredada en tests/regression.test.cjs que exigía srsStore.clear(); ahora la restauración debe conservar namespaces ajenos y eliminar solo los registros del idioma importado con cursor. El resto del job llegó a la suite de regresión sin fallos de sintaxis; se actualiza la expectativa para el contrato por idioma y se repetirá CI.

- Segunda ejecución CI PR #714 (run 45095790131): corregida la aserción srsStore.clear, pero regression.test.cjs mostró tres mocks incompletos: falta LanguageManager en los contextos del validador/restauración, y faltan scopedKey/belongsToLanguage + openCursor en el fake DB. Se ajustan fixtures de pruebas, sin cambio de comportamiento productivo.

- Tercera ejecución CI PR #714 (run 45096041633): regression.test.cjs ya pasa; tests/api-key-management.test.cjs tenía un DB fake aislado que no suministraba ProgressNamespace a DB.delete. Se actualiza el fixture con una función identity para preservar el propósito del test (borrar la clave global); la lógica de namespaces se prueba separadamente.

- Cuarta ejecución CI PR #714 (run 45096186173): regresión y API key harness ya pasaron. tests/study-history.test.cjs tuvo una expectativa invertida: después de registrar 35 XP en pt-BR y cambiar el manager activo a pt-BR, la lectura implícita debe devolver 35, no 0. Se corrige la expectativa; el aislamiento explícito id/pt-BR/en y clearAll ya pasaron.

- CI PR #714 run 45096564433 (head b6fa98f): actualiza el test de restauración para simular claves existentes id/pt-BR/en y comprobar que solo se elimina pt-BR, además de confirmar que las nuevas entradas y settings llevan prefijo. El test del loader mostró que la aserción regex del rechazo era frágil con el Error cross-realm; se cambia a un predicate sobre el texto del error. CI de este head sigue en curso.

- ProgressNamespace: filterRecords valida el código de idioma al inicio, incluso si la colección está vacía; evita aceptar silenciosamente un código desconocido cuando no hay registros que ejecutar en el predicado.

- CI PR #714 run 45096951416: gestor, historial, loader y namespaces pasaron. tests/backup-validation.test.cjs conservaba dos regex de error previas a PR #713; el import ahora informa que el curso aún no está disponible. Se actualizan las expectativas al mensaje actual.
