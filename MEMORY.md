# MEMORY.md — Estado de Bahasa Studio

> Se actualiza en CADA PR. Mantener corto (unas 150 líneas como máximo). Última actualización: 6 nov 2026.

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
- B1 y B2: pendientes.
- Sistema de calidad: auditoría estructural/editorial independiente de KBBI y cola editorial para vocabulario y ejercicios. Último informe CI (#350): 0 errores, 0 avisos en 72 unidades; 1.989 entradas editoriales pendientes (806 A1, 1.183 A2), sin certificación lingüística.

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

## Estado de PR y sistema de calidad
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
- Service worker en main: cache bahasa-studio-v3.8.54 (tras PR #337).
- Scripts de calidad disponibles: scripts/audit-curriculum-quality.mjs, scripts/build-editorial-review-queue.mjs, scripts/build-unified-quality-report.mjs y scripts/build-deepseek-review-packet.mjs.
- IndexedDB v3 y backup v3: preservados; PR #337 no modifica sus esquemas.

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
