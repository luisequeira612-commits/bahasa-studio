# MEMORY.md — Estado de Bahasa Studio

> Se actualiza en CADA PR. Mantener corto (unas 150 líneas como máximo). Última actualización: 7 nov 2026.

## Visión
- App para aprender idiomas, estilo Duolingo, en rojo y blanco.
- Hoja de ruta decidida por el dueño el 5 nov 2026: completar indonesio hasta B2 (A1 completo; A2 y B1 pendientes de consolidar; B2 después) → inglés desde cero/A1 para hispanohablantes.
- El curso de inglés incluirá pronunciación con audio o transcripción sencilla, falsos amigos y verbos frasales. No hay ningún otro idioma planificado; cualquier idioma adicional lo decidirá el dueño más adelante.
- Todo código y estructura de datos nuevos deben ser independientes del idioma. No hacer ahora una refactorización general; solo evitar nuevas dependencias fijas del indonesio para que añadir inglés no exija una reestructuración grande.
- Uso personal; posible futuro: compartirla gratis con amigos o una comunidad de nicho.
- Prioridad principal del dueño: perfeccionar esta app y aprender idiomas con ella.
- Completar todo el indonesio hasta B2 antes de abrir inglés; no hay otros idiomas planificados.

## Estado actual del currículo
- A1: 32 de 32 unidades hechas.
- A2: 40 de 40 unidades hechas y habilitadas en beta (`A2_RELEASE_ENABLED = true`). U5–U8 siguen en consolidación; PR #337 aclara el vocabulario objetivo de 16 prompts de traducción.
- B1: 50/50 unidades redactadas en la rama del bloque actual (0 pendientes); 224 IDs únicos en sus unidades, incluidos 31 IDs canónicos reutilizados desde A1/A2, y 727 ejercicios combinados tras consolidar U1–U12. Repasos acumulativos explícitos en U4, U8, U12, U17, U22, U27, U32, U37, U42 y U47. U13–U14: ke-an; U15–U17: cláusulas relativas con yang; U18–U20: condiciones, concesiones y contraste; U21: causa/consecuencia; U22: finalidad; U23: experiencias pasadas; U24: narración temporal; U25: carácter y personalidad; U26: descripción de lugares y ambientes; U27: opiniones y desacuerdo; U28: posibilidad y certeza; U29: consejos, obligación y recomendaciones; U30–U31: planes, metas, pasos, preparación y decisiones; U32–U34: prioridades/horarios, problemas/soluciones, opciones/riesgos/consecuencias; U35–U37: negociación/acuerdos, comunicación/confirmación, progreso/logros/mejora; U38–U40: retroalimentación/crítica, hechos/evidencia/conclusiones, cambios/adaptación/impacto; U41–U43: declaraciones/reconocimiento, comparación/contraste, condiciones/relaciones/influencia; U44–U46: estimaciones/posibilidades, prevención/precauciones, recursos/ahorro/eficiencia; U47–U49: reglamentos/procedimientos, participación comunitaria, conservación/sostenibilidad; U50: proyecto integrador, viabilidad, ejecución, presentación y seguimiento. U50 añade 5 formas nuevas y 14 ejercicios. B2: 0/60 unidades del plan alineadas (60 pendientes); empieza después de cerrar la revisión/validación estructural final de B1. Escucha con síntesis de voz local.
- PR #409 fusionado tras CI completamente verde; U47–U49 quedan en main. Caché `v3.8.68`.
- PR #410 fusionado: B1 U50 cierra el currículo con 3 lecciones, 5 formas nuevas y 14 ejercicios; B1 queda en main con 50 unidades, 224 IDs únicos y 605 ejercicios antes de la consolidación posterior de U1–U12. B1 sigue en beta, sin validación nativa ni certificación MCER/BIPA.
## Aclaración de métricas de Perfil (PR pendiente)
- La cifra de vocabulario debe presentarse como entradas distintas del curso (palabras, formas derivadas y expresiones), no como familias léxicas ni como medida de dominio. La métrica de palabras con seguimiento es independiente.
- Cambio limitado a texto de interfaz y prueba de navegador; sin cambios en el cálculo, currículo, IndexedDB ni backup JSON v3.

## Interfaz (ya hecho)
- Barra inferior de 4 pestañas: Aprender / Repasar / Tutor / Perfil.
- Barra superior con racha y XP.
- Camino de unidades A1.
- Traducción al tocar palabras (burbuja) y explicaciones contextuales (PR #45, #46).
- Botón "crear nueva lección con IA" (Gemini), guarda offline.
- Historial y estadísticas: implementados, por consolidar.


## Flujo Git vigente (6 nov 2026)
- El dueño concedió autorización permanente para crear y fusionar PRs sin aprobación individual. Fusionar solo con CI completamente verde en el último commit y sin revisiones, comentarios ni problemas pendientes; informar cada fusión.
- Mantener una rama por cambio basada en main actualizado; cada PR incluye alcance, archivos, pruebas, riesgos y actualiza MEMORY.md.

## Estado de PR y sistema de calidad
- PR #413 fusionado en `42115e07263fe9e50a92abe210387f90128be7e1`: consolida U1–U4 con 14–15 ejercicios combinados por unidad y repaso acumulativo en U4.
- PR #414 fusionado en `57fddebeb533b80962ef684d3d1c9fb9271beb2e`: consolida U5–U8 con 14, 15, 14 y 14 ejercicios combinados, dos lecciones por unidad y repaso acumulativo U5–U8. B1 queda en 671 ejercicios.
- PR #415 fusionado en `18981167fb559d4f1ae727014e955134743382aa`: consolida U9–U12 a 14 ejercicios combinados por unidad, con repaso acumulativo U9–U12. B1 queda en 703 ejercicios.
- PR #416 fusionado en `6fed56c6e37699b888f6b5c78772d0eb8f5e5583`: corrige 23 colisiones entre vocabulario nuevo y repasado en B1 U1, U5–U7 y U9–U11; no cambia inventario ni ejercicios.
- PR #417 fusionado en `e4975682f3678402ec6951a867b5c2d96bb35267`: corrige 39 exposiciones prematuras de vocabulario en ejemplos B1 y reordena U49. El informe posterior queda con 0 errores y 9 avisos de cobertura explícita.
- PR #418 fusionado en `b0b85656cd884d534199675d1976287351241302`: corrige la trazabilidad de evaluación para vocabulario reutilizado en U15–U17 y U25, y alinea un enunciado con su respuesta en U16. El informe de calidad B1 queda en 0 errores, 0 avisos y 17 notas informativas.
- PR #419 fusionado en `bfe9c48448f48ba129e7d1eab504e24ca6975423`: añade repasos acumulativos en U22, U27, U32, U37, U42 y U47, con cuatro ejercicios por checkpoint. B1 queda en 727 ejercicios; auditoría estructural: 0 errores y 0 avisos (17 informativos).
- PR #410 fusionado en `d137db065e792d563994ae4796768b35377f5f4e`; B1 50/50 completo en unidades. Auditoría estructural final pendiente.
- PR #411 fusionado en `7a88c4750b9cb5707f50c286f73d2884e3c1568a`: auditor y cola editorial ya incluyen B1. PR #412 fusionado en `c7f56e1e0a6162945941d0362fd0006db8d6fdd2`: informe de contrato por unidad ya incluye B1.
- Auditoría estructural integrada: 122 unidades (A1/A2/B1), 1.062 entradas, 1.025 IDs únicos, 0 errores, 85 avisos y 37 informativos. B1: 50 unidades, 241 entradas/224 IDs, 114 lecciones y 605 ejercicios antes de consolidar U1–U4; auditoría estructural: 0 errores y 44 avisos. Cola B1: 846 filas, 0 P1. Avisos pendientes: 30 de progresión textual, 5 entre lecciones y 9 de cobertura explícita.
- PR #349 fusionado: fija Playwright 1.55.0 y el runner `ubuntu-24.04` para estabilizar CI.
- PR #350 fusionado: registra la hoja de ruta lingüística vigente y las reglas preventivas de independencia del idioma.
- PR #337–#344 fusionados; #344 (commit `817b4246b0f6302544e09b357041e95f44cd791b`) incorpora parser CSV multilínea y sus pruebas en CI.
- PR #339–#341 siguen abiertos sobre una base antigua y requieren reemplazo/reconciliación; no fusionar esas ramas obsoletas.
- PR #345 fusionado en `3b97d5e1d0bfae7e1e8efc14ad03e73a9f0c7b33`: añade métricas separadas de audioText, listen y soporte general al informe unificado.
- PR #347 fusionado en `08815997322a85bbe8b8c1ed85703fdc13d7da27`: añade desglose de carga editorial por unidad (totales, tipos, prioridades, candidatos y estados); PR #346 quedó obsoleto por conflictos y su cambio fue reconciliado en #347.
- La cola editorial se mantiene en `pending` / `not_reviewed`; la certificación lingüística sigue en `not_certified`.

## Pendiente (en este orden)
1. Consolidar A1 U24–U32 y A2 U5–U8: revisar respuestas, alternativas y consignas con evidencia interna, sin declarar validación nativa.
2. Revisar la cola editorial por tandas de nivel/unidad; último informe: 1.989 entradas pendientes, todas sin revisión editorial ni certificación lingüística. PR #342 permite exportaciones acotadas y PR #343 genera paquetes por unidad/prioridad.
3. Consolidar el resto de A2.
4. Mejorar el tutor conversacional.
5. Aprendizaje adaptativo y repaso con repetición espaciada.
6. Pronunciación y escucha.
7. Lección a pantalla completa con hoja de feedback y pulido visual.
8. Desarrollar y consolidar B1 y luego B2; completar indonesio hasta B2 antes de crear inglés A1 para hispanohablantes (pronunciación, falsos amigos y verbos frasales). No planificar otros idiomas salvo decisión futura del dueño. La independencia del idioma se aplica preventivamente a todo código/dato nuevo, sin refactor general ahora.

## Decisiones tomadas
- No añadir capa de IA extra dentro de la app por ahora.
- La app no se publica en tiendas de apps.
- Sin vidas, sin anuncios, sin social.
- Siempre gratuita, local, sin cuentas y sin backend, incluso si se comparte.
- Más vocabulario básico repetido en distintos contextos dentro de cada unidad.
- Hoja de ruta de idiomas (5 nov 2026): indonesio hasta B2 → inglés A1 para hispanohablantes. Ningún otro idioma está planificado; cualquier idioma adicional lo decidirá el dueño.
- Código y estructuras de datos nuevos independientes del idioma; no introducir nuevas dependencias exclusivas del indonesio. No hacer ahora un refactor general.
- Todo PR que afecte la hoja de ruta o la preparación multiidioma debe registrar esta decisión y su impacto en MEMORY.md y en la descripción del PR.
- No cambiar IndexedDB ni backup v3; la independencia del idioma no autoriza cambios de esquema.
- No se usan herramientas locales de memoria de código (tipo MCP): se trabaja desde el celular; la memoria del proyecto son estos tres archivos.
- Las fusiones se realizan cuando el dueño las autoriza; las actualizaciones de ramas y PR pueden hacerse de forma autónoma para resolver conflictos y mantener CI al día.
- No hay hablante nativo que valide el indonesio y KBBI puede fallar: el proyecto NO se detiene por eso. El contenido avanza con estados honestos (verified_primary solo lo marca el dueño; cross_checked = 2+ fuentes secundarias independientes; not_checked = el resto) y se corrigen errores cuando se descubran.

## Reparto de herramientas
- Claude: revisión técnica y curricular antes de aprobar.
- Gemini: ideas de experiencia de usuario.
- ChatGPT: integra cambios en el repo (rama + PR) y los valida.

## Estado técnico de referencia
- Service worker en main durante este bloque: cache bahasa-studio-v3.8.60; el PR lo actualiza a `bahasa-studio-v3.8.61`.
- Scripts de calidad disponibles: scripts/audit-curriculum-quality.mjs, scripts/build-editorial-review-queue.mjs, scripts/build-unified-quality-report.mjs y scripts/build-deepseek-review-packet.mjs.
- IndexedDB v3 y backup v3: preservados; PR #337 no modifica sus esquemas.

## PR B1 U30–U31 — planes, metas, pasos y decisiones (7 nov 2026)
- Añade U30–U31, 6 lecciones/28 ejercicios y 10 formas nuevas: planes y metas; pasos, preparación y decisiones.
- Se mantienen 5 tipos de ejercicio por unidad y producción guiada; U30 conecta rencana/tujuan/berencana/merencanakan/berusaha y U31 conecta langkah/target/mencapai/mempersiapkan/memutuskan.
- B1 queda en 31/50 y B2 en 0/60. El contenido sigue en beta y no implica validación nativa ni calibración MCER/BIPA.
- Cache actualizado a `bahasa-studio-v3.8.62`. Sin cambios en A1/A2, IndexedDB, backup JSON v3 ni dependencias.

## PR B1 U27–U29 — opiniones, posibilidad y consejo (7 nov 2026)\n- Añade U27–U29, 3 unidades/9 lecciones/42 ejercicios y 17 formas nuevas: opiniones y desacuerdo; posibilidad/certeza; consejo/obligación/recomendación.\n- Se mantienen 5 tipos de ejercicio por unidad y producción guiada; U29 integra revisión acumulativa de causa, opinión y probabilidad.\n- KBBI no proporcionó páginas de lema directas mediante la consulta indexada; no se marca ninguna forma como `verified_primary`. B1 queda en 29/50 y B2 en 0/60.\n- Cache actualizado a `bahasa-studio-v3.8.61`. Sin cambios en A1/A2, IndexedDB, backup JSON v3 ni dependencias.\n\n## PR B1 U27–U29 — opiniones, posibilidad y consejo (7 nov 2026)
- Añade U27–U29, 3 unidades/9 lecciones/42 ejercicios y 17 formas nuevas: opiniones y desacuerdo; posibilidad/certeza; consejo/obligación/recomendación.
- Se mantienen 5 tipos de ejercicio por unidad y producción guiada; U29 integra revisión acumulativa de causa, opinión y probabilidad.
- KBBI no proporcionó páginas de lema directas mediante la consulta indexada; no se marca ninguna forma como `verified_primary`. B1 queda en 29/50 y B2 en 0/60.
- Cache actualizado a `bahasa-studio-v3.8.61`. Sin cambios en A1/A2, IndexedDB, backup JSON v3 ni dependencias.

## Historial breve
- PR #326 fusionado: corrección de distinción entre entrada/tarifa de entrada en A2 U38.
- PR #327–#330 fusionados: base/herramientas del sistema de calidad y auditoría.
- PR #331–#336 fusionados: consolidación/guardrails A2 U5–U8, A1 U24–U32 y cola editorial.
- 5 nov 2026: PR #338 fusionado (commit 613467b9e1f179aad400a2fa4156eb7b6142fc8c), con AGENTS.md, MEMORY.md y SKILL.md.
- 5 nov 2026: PR #337–#348 fusionados tras aprobación explícita. PR #346 original quedó obsoleto por conflictos y fue reemplazado por #347. PR #339–#341 antiguos no deben fusionarse.
- 5 nov 2026: el dueño fijó la hoja de ruta indonesio hasta B2 → inglés A1 para hispanohablantes; no hay otros idiomas planificados. Se exige independencia del idioma en todo código/dato nuevo, sin refactor general ahora.
- Tras #347, las pruebas de regresión post-merge y el despliegue de Pages terminaron correctamente; la validación de PR #348 actualiza este registro.


## PR2 — auditoría de vocabulario y curriculum lint (5 nov 2026)
- Confirmado: 801 entradas distintas (A1 309, A2 492), 676 de un token y 125 expresiones.
- A1 U5–U8: 5/4/5/6 entradas nuevas; A2 U5–U40: 12 nuevas por unidad durante 36 unidades consecutivas. Son hallazgos para decidir después, no cambios de contenido.
- La clasificación morfológica de A2 es heurística y contiene falsos positivos. di- y ter- no se convierten en cobertura certificada.
- Trackers de PR2: 582 filas CSV, con 36 `verified_primary` y 546 `not_checked`. El 57 del informe anterior contaba ocurrencias curriculares, no filas CSV: las 56 filas `not_checked` de U24–U32 más la ocurrencia duplicada de `v465` en U1–U23 suman 57 ocurrencias para 56 filas no verificadas. En el conjunto, 90 filas del tracker U24–U32 representan 91 ocurrencias curriculares al incluir esa repetición de `v465`; la fila de U32 ya representa el mismo ID y por eso U1–U23 no necesita otra. La misma deduplicación explica que U1–U23 tenga 239 registros curriculares, pero solo 238 filas nuevas.
- PR2 añade solo scripts/informes/documentación y el cableado de CI necesario para ejecutar el lint offline. No toca IndexedDB/backup v3 ni contenido curricular.
- PR3: rama `feat/quality-pr3-tracker-i4-i5-review`. Añade 238 filas `not_checked` para A1 U1–U23, amplía `vocabulary-report.mjs` para leer los tres trackers y documenta I4/I5 sin aplicar correcciones.
- Cobertura actual: A1 U1–U23 238/0/238; A1 U24–U32 90/34/56; A2 492/2/490; A1+A2 820/36/784. Las 546 entradas `not_checked` son filas CSV (582 filas: 36 `verified_primary` + 546 `not_checked`). El 57 del informe anterior contaba ocurrencias curriculares, no filas CSV: las 56 filas `not_checked` de U24–U32 más la ocurrencia duplicada de `v465` en U1–U23 suman 57 ocurrencias para 56 filas no verificadas. En el conjunto, 90 filas del tracker U24–U32 representan 91 ocurrencias curriculares al incluir esa repetición de `v465`; la fila de U32 ya representa el mismo ID y por eso U1–U23 no necesita otra. La misma deduplicación explica que U1–U23 tenga 239 registros curriculares, pero solo 238 filas nuevas.
- I4 queda pendiente de aprobación por tandas de 3–4 unidades; las propuestas son solo propuestas. I5 tiene 3 falsos positivos de plantilla y queda pendiente ajustar el detector en un PR posterior.


## Reconciliación de auditoría de vocabulario (5 nov 2026)
- Tras PR #355, el tracker A1 U1–U23 ya existe: cobertura total 820 filas (A1 328; A2 492), con 36 `verified_primary` y 784 `not_checked`. Desglose A1 U1–U23: 238/0/238; A1 U24–U32: 90/34/56; A2: 492/2/490.
- El antiguo informe de PR #352 quedó obsoleto en su sección de estados; PR de reconciliación actualiza solo documentación y memoria. Sin cambios de currículo, IndexedDB ni backup v3.


## PR4 — comprobaciones automáticas de calidad (6 nov 2026)
- Se añade una comprobación de sincronía entre IDs únicos del currículo A1/A2 y los tres trackers, incluidos estados permitidos y evidencia mínima de `verified_primary`; es la única comprobación bloqueante, activada tras un baseline real con cero hallazgos. Los IDs compartidos cuentan una sola vez.
- Se añaden informes informativos por unidad (contrato de ejercicios, estimación de frases, pistas de producción, marcas de repaso y recurrencia) y de acoplamiento del código al indonesio. El análisis de frases es heurístico; la detección de repaso solo reconoce marcas explícitas.
- Incremento de calidad (6 nov 2026): el auditor busca formas futuras en segmentos indonesios; en `modelAnswer` prioriza segmentos entre comillas y excluye la prosa española que los rodea. Componentes de expresiones ya enseñadas cuentan como exposición previa y se evita duplicar una coincidencia específica con otra genérica (`Di sini`/`Sini`). Coincide tokens exactos, sin análisis morfológico ni validación lingüística; ver límites en `docs/INDEPENDENT_CURRICULUM_QUALITY_SYSTEM.md`.
- Supresiones de usos legítimos documentadas en `docs/LANGUAGE_COUPLING_SUPPRESSIONS.md`. Los tres informes se generan offline y se suben como artefactos; sin dependencias nuevas ni cambios en datos curriculares, trackers, IndexedDB o backup JSON v3.


## PR5 — consolidación focalizada (6 nov 2026)
- Se revisaron A1 U24–U32 y A2 U5–U8 y se ejecutaron comprobaciones internas de referencias de vocabulario, índices de respuesta, correctOrder/words, producción con pista/respuesta y duplicados exactos: 0 hallazgos en las 13 unidades.
- El resultado es estructural; no certifica corrección lingüística nativa. Este PR sigue sin modificar currículo, trackers, IndexedDB ni backup v3.
- Siguiente foco: auditoría editorial fina de consignas, alternativas, traducciones y coherencia pedagógica; cualquier corrección curricular irá en un PR separado.


## PR6 — auditoría editorial inicial (6 nov 2026)
- Lectura directa de A1 U24–U32 y A2 U5–U8: 13 unidades, 138 entradas y 170 ejercicios. Se documentan 7 candidatos editoriales, sin errores lingüísticos confirmados ni cambios de contenido; no equivale a validación nativa. Ver `docs/EDITORIAL_AUDIT_A1_U24_U32_A2_U5_U8.md`.


## PR7 — resolución de auditoría editorial inicial (6 nov 2026)
- Se documenta la resolución de los 7 candidatos del PR #360: no se confirma ningún error curricular ni se modifica contenido.
- «Senyum manis» y «Memulai belajar» permanecen `not_checked` en naturalidad; no se afirma validación nativa ni se cuentan fuentes dependientes como independientes.
- Se mantienen intactos currículo, trackers, IndexedDB y backup JSON v3. Ver `docs/EDITORIAL_AUDIT_RESOLUTION_A1_U24_U5_U8.md`.

## PR8 — reconciliación del recuento de ejercicios A1 U24–U32 (6 nov 2026)
- La auditoría estructural vigente contabiliza 102 ejercicios en A1 U24–U32; la cifra histórica de 72 correspondía solo al bloque base de 8 por unidad.
- La revisión contextual individual de respuestas aceptadas y variantes de los 102 ejercicios sigue pendiente. Cambio exclusivamente documental; sin currículo, trackers, IndexedDB ni backup JSON v3.


## PR9 — reconciliación del inventario del examen A1 (6 nov 2026)
- El inventario vigente de `assessment-engine.js` registra 51 ítems y 56 puntos, incluidas dos tareas abiertas que requieren revisión humana.
- El blueprint de 40 puntos continúa siendo una propuesta no reconciliada ni implementada. No se alteran banco, claves, puntos, rúbricas, desbloqueo, IndexedDB ni backup JSON v3.


## Revisión complementaria A2 U5 (6 nov 2026)
- Se detecta un candidato de andamiaje: la traducción de `bertanya` exige `kepada`, aún no explicado en U5; `guru` sí fue enseñado en A1. Se documenta sin cambiar el ejercicio ni certificar un error lingüístico.


## Revisión A2 U9–U12 (6 nov 2026)
- Inventario: 12 términos y 17 ejercicios por unidad; 48 términos y 68 ejercicios en total.
- Candidatos de andamiaje en ejemplos: `berhasil` adelantado en U9 aunque se enseña en U12; `mengikuti` y `berlari` en U10; `pintu` en U11; `menjadi` en U12. No son errores lingüísticos confirmados ni se modificó currículo.
- Ver `docs/EDITORIAL_AUDIT_RESOLUTION_A1_U24_A2_U5_U8.md`. Sin cambios en trackers, IndexedDB ni backup JSON v3.


## Revisión A2 U13–U16 (6 nov 2026)
- Inventario: 48 términos y 68 ejercicios (12/17 por unidad).
- Candidatos de andamiaje en ejemplos: U13 `tas`, `barang`, `pakaian`; U14 `umum`, `berat`, `ramai`; U16 `pantai`, `indah`. En U15 reaparece `kepada`, ya documentado en la revisión de U5.
- Son observaciones de secuenciación, no errores confirmados ni certificación de naturalidad nativa. No se modifica el currículo ni los datos persistentes.


## Revisión A2 U6 y U17–U20 (6 nov 2026)
- Se recupera la auditoría de prerrequisitos de U6 del PR #370, cuyo branch quedó en conflicto tras avanzar `main`: los sustantivos relevantes de los ejemplos ya están en A1 y no se identifica un problema nuevo de secuenciación.
- U17–U20: 48 términos y 68 ejercicios (12/17 por unidad). Candidatos contextuales: U17 `kacang`, `perawat`; U18 `atap`; U19 `perusahaan`; U20 `udara`, `pohon`, `petani`, `hewan`, `musim kemarau`. No son errores confirmados; se excluyen duplicados o elementos ya explicados.
- Documentación únicamente; no se cambia currículo, trackers/CSV, IndexedDB ni backup JSON v3. No se certifica naturalidad nativa ni nivel CEFR. Ver `docs/EDITORIAL_AUDIT_RESOLUTION_A1_U24_A2_U5_U8.md`.


## Revisión A2 U21–U24 (6 nov 2026)
- Inventario: 48 términos y 68 ejercicios (12 términos/17 ejercicios por unidad).
- Candidatos contextuales: U21 `bambu`, `candi` (y `adat` dentro de `pakaian adat` como apoyo opcional); U22 `tanggapan`; U23 `bank`, `pelanggan`, `nomor`; U24 `situs`, `topik`. `aplikasi` es transparente y queda como observación de baja prioridad.
- No son errores lingüísticos confirmados ni certificación de naturalidad nativa/nivel CEFR. Solo documentación; sin cambios curriculares, trackers, IndexedDB ni backup JSON v3. Ver `docs/EDITORIAL_AUDIT_RESOLUTION_A1_U24_A2_U5_U8.md`.


## Revisión A2 U25–U28 (6 nov 2026)
- Inventario: 48 términos y 68 ejercicios (12/17 por unidad).
- Candidatos contextuales: U25 `sayuran`, `ikan`, `roti`, `oven`, `bawang`, `masakan`; U26 `orang tua`, `ujian`, `komentar`, `keputusan`; U27 `kelurahan` en una respuesta; U28 `siswa`, `laboratorium`, `ponsel`, `pengguna`.
- `mengikuti` reaparece en U25, pero ya estaba documentado en U10 y no se duplica. Son observaciones, no errores confirmados ni certificación de naturalidad nativa. Solo documentación; sin cambios curriculares, trackers, IndexedDB ni backup JSON v3. Ver `docs/EDITORIAL_AUDIT_RESOLUTION_A1_U24_A2_U5_U8.md`.

## Revisión A2 U29–U32 (6 nov 2026)
- Inventario: 48 términos y 68 ejercicios (12 términos/17 ejercicios por unidad); los 68 ejercicios apuntan a vocabulario existente y no hay IDs huérfanos ni términos sin ejercicio.
- Candidatos contextuales en ejemplos: U29 barang y produk; U30 film e ide; U31 gunung, matahari, tanah y arah; U32 bayi, gedung, foto y pasangan.
- Se excluyen duplicados ya enseñados/documentados (petugas, struk, kepada, pertunjukan, sungai, hutan, air, warga, keluarga, rumah, teman) y el nombre propio Yogyakarta. Son candidatos de andamiaje, no errores lingüísticos confirmados ni certificación de naturalidad nativa/nivel CEFR.
- Solo documentación; sin cambios de currículo, trackers/CSV, IndexedDB ni backup JSON v3. Ver docs/EDITORIAL_AUDIT_RESOLUTION_A1_U24_A2_U5_U8.md.

## PR10 — regresión del evaluador de respuestas escritas (6 nov 2026)
- La suite de calidad ejecuta ahora las pruebas de `WrittenResponse` contra 462 ejercicios reales A1/A2: cada respuesta canónica debe ser aceptada; las alternativas solo se aceptan si son heredadas sin estado o están aprobadas.
- Es una prueba de coherencia entre currículo y evaluador, no una validación semántica/nativa de las respuestas. Sin cambios de currículo, trackers, IndexedDB ni backup JSON v3.


## PR11 — candidatos de prerrequisitos gramaticales (6 nov 2026)
- Añade un detector genérico offline gobernado por un catálogo de reglas separado del código; señala marcas explícitas usadas antes de su unidad declarada. Los resultados requieren revisión contextual y no prueban que falte una explicación.
- Incluye pruebas sintéticas, suite de calidad y artifact CI. Sin cambios de currículo, trackers/CSV, IndexedDB ni backup JSON v3; sin dependencias ni red.


## PR — candidatos de ambigüedad semántica (6 nov 2026)
- Añade un detector offline conservador para ejercicios de opción múltiple: solo señala opciones que coinciden con la glosa española objetivo mediante coincidencia exacta normalizada. Los resultados son candidatos para revisión humana, no errores confirmados ni certificación lingüística.
- Incluye pruebas sintéticas, ejecución en la suite de calidad y artifact CI. Reconciliado sobre el main posterior a PR #383. Sin cambios de currículo, trackers/CSV, IndexedDB ni backup JSON v3; sin dependencias ni red.


## Revisión estructural A2 U33–U40 (6–7 nov 2026)
- Inventario comprobado: 8 unidades, 96 entradas de vocabulario, 32 lecciones y 136 ejercicios. Cada unidad tiene 12 entradas, 4 lecciones y 17 ejercicios; no se encontraron IDs huérfanos ni entradas sin uso.
- `tanggapan` aparece en un ejemplo de U22 y se enseña como entrada en U40; queda como candidato de exposición anticipada, no como error confirmado. La revisión editorial contextual completa de U33–U40 sigue pendiente. Sin cambios curriculares, trackers/CSV, IndexedDB ni backup JSON v3.

## Revisión editorial contextual A2 U33–U40 (6–7 nov 2026)
- Lectura interna de 8 unidades (96 vocablos, 32 lecciones, 136 ejercicios): 2 candidatos de exposición anticipada, risiko en U35 antes de U36 y tanggapan en U22 antes de U40; ninguno se confirma como error. Sin cambios curriculares ni de datos persistentes. Ver docs/EDITORIAL_AUDIT_A2_U33_U40.md.

## Revisión contextual A1 U24–U32 (7 nov 2026)
- Lectura de 102 ejercicios: 2 candidatos de concordancia de persona en consignas (U25 y U29); 0 errores confirmados y ningún cambio curricular. Ver docs/EDITORIAL_AUDIT_A1_U24_U32_EXERCISES.md.

## Revisión editorial contextual A2 U1–U4 (7 nov 2026)
- Lectura de 4 unidades, 60 entradas de vocabulario, 17 lecciones y 78 ejercicios. Un candidato de alineación entre consigna y placeholder en U3 L1: la consigna pide una respuesta bilingüe (explicación española + secuencia indonesia), pero el campo muestra «Escribe tu respuesta en indonesio». `checkWriting()` no corrige automáticamente; muestra el modelo y permite autoevaluarse. No es error lingüístico confirmado. Sin cambios curriculares. Ver docs/EDITORIAL_AUDIT_A2_U1_U4.md.

## Revisión editorial contextual A2 U9–U12 (7 nov 2026)
- Lectura de 4 unidades, 48 entradas de vocabulario, 16 lecciones y 68 ejercicios. Referencias internas completas: sin IDs huérfanos ni vocabulario sin uso. Un candidato editorial de neutralidad de género en la glosa de `yakin` («Estoy seguro» frente a una frase indonesia que no marca género); no es error confirmado. Sin cambios curriculares. Ver docs/EDITORIAL_AUDIT_A2_U9_U12.md.

## Revisión editorial contextual A2 U13–U16 (7 nov 2026)
- Lectura de 4 unidades, 48 entradas, 16 lecciones y 68 ejercicios. Se documentan 6 candidatos de secuenciación/alineación/contexto: exposición anticipada de vocabulario en U13/U14/U16, matiz de «Salgo» frente a `bepergian` en U14, `mengundang` en explicaciones de U15 y especificidad temporal en la traducción de U16. Ninguno se confirma como error lingüístico; no se modificó el currículo. Ver `docs/EDITORIAL_AUDIT_A2_U13_U16.md`.


## Reorganización autorizada B1 U4–U6 (7 nov 2026)
- U4: `memberikan`, `mengirimkan`, `menjelaskan`, `membersihkan` (-kan).
- U5: `mengingatkan`, `memasukkan` (-kan); `mendatangi`, `menemui` (-i).
- U6: `menghadiri`, `mencintai`, `memasuki` (-i); pasivas `dijelaskan` y `ditemui`.
- 19 ejercicios nuevos (6/6/7); 57 entradas de vocabulario y 66 ejercicios en el borrador B1. Se conserva el contenido previo de U4–U6 en `docs/B1_U4_U6_DISPLACED_CONTENT.md` para reorganizarlo después, sin pérdida de información.
- Las formas y glosas siguen siendo material beta; no implican validación nativa ni calibración MCER/BIPA. B1 sigue oculto.


## Reorganización autorizada B1 U7–U9 (6 nov 2026)
- U7: `penjual`, `pembeli`, `pemain`; U8: `penulis`, `pengajar`, `pekerja`; U9: `pemimpin`, `penduduk`, `pembaca`.
- `pembelian` y `pengiriman` quedan solo como reconocimiento peN-an, sin entrada curricular ni producción obligatoria.
- Se archivan literalmente los objetos anteriores de U7–U9 en `docs/B1_U7_U9_DISPLACED_CONTENT.md`. El inventario activo cambia de 57/66 a 51 vocablos/69 ejercicios; B1 sigue oculto.
- PR #393 fusionado tras CI completamente verde; el usuario autorizó que las PR se fusionen automáticamente cuando estén listas, sin pedir aprobación individual. Material beta sin validación nativa ni calibración MCER/BIPA. Sin cambios a A1/A2, IndexedDB, backup v3, trackers/CSV ni dependencias.


## Reorganización autorizada B1 U10–U12 (6 nov 2026)
- U10: `pelajaran`, `pekerjaan`; U11: `pertanyaan`, `percakapan`, `perkenalan`; U12: `kesehatan`, `kecelakaan`, `keadaan`, `kebudayaan`.
- No se duplican `pengalaman`, `kesempatan`, `perjalanan`, `pertemuan`, `kebersihan` (IDs A2) ni `keluarga` (ID A1); se reutilizan como conocimiento previo. Se preservan literalmente los antiguos objetos U10–U12 en `docs/B1_U10_U12_DISPLACED_CONTENT.md`.
- El borrador B1 pasa de 51/69 a 45 entradas activas/72 ejercicios. B1 permanece oculto. Sin cambios a A1/A2, IndexedDB, backup v3, trackers/CSV ni dependencias. Material beta no validado por hablante nativo ni calibrado MCER/BIPA.

## Auditoría de checkpoints acumulativos B1 (7 nov 2026)
- Se refuerzan las pruebas para comprobar que los IDs de repaso acumulativo son únicos, corresponden a vocabulario ya enseñado o introducido en la unidad de checkpoint y mantienen la cadencia U4/U8/U12/U17/U22/U27/U32/U37/U42/U47. También se corrige el nombre de una prueba cuyo texto decía 703 ejercicios aunque la aserción y el currículo vigente son 727. Solo pruebas/documentación; sin cambios de currículo, IndexedDB, backup v3 ni dependencias.

## Revisión editorial contextual B1 U17–U22 (7 nov 2026)
- Lectura de seis unidades: 0 errores confirmados y 2 candidatos editoriales (temporalidad no explícita en U21; uso de `-lah` no explicado en una respuesta modelo U22). Sin cambios curriculares ni datos persistentes. Ver `docs/EDITORIAL_AUDIT_B1_U17_U22.md`.

## Revisión editorial contextual B1 U23–U26 (7 nov 2026)
- Lectura de cuatro unidades: 0 errores confirmados y 0 candidatos que requieran corrección. La comparación `telah`/`sudah` ya tiene antecedente en B1; las demás explicaciones y ejercicios revisados mantienen coherencia interna. Sin cambios curriculares ni datos persistentes. Ver `docs/EDITORIAL_AUDIT_B1_U23_U26.md`.
