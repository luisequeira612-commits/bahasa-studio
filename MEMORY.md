# MEMORY.md — Estado de Bahasa Studio


## Estado vigente verificado — 8 nov 2026 (prevalece sobre notas históricas anteriores)
- A1 32/32, A2 40/40 y B1 50/50 unidades completas; B2 1/60 implementada (U1), oculta/no publicada. Total: 123/182; quedan 59 unidades, todas B2. B1 sigue en beta, sin validación nativa ni certificación MCER/BIPA.
- Fase actual: implementación de B2. U1 tiene 3 lecciones y 16 ejercicios de cinco tipos, reutiliza nueve IDs existentes y no añade vocabulario.
- B2 U2: diseño preliminar en `docs/B2_U2_DESIGN.md`; `kubaca`, `kaubaca`, `kutulis` y `kautulis` siguen siendo candidatas pendientes de aprobación explícita. No asignarles IDs ni incorporarlas al currículo o a ejercicios evaluados sin aprobación.
- B2 U3: diseño preliminar en `docs/B2_U3_DESIGN.md`; integra U1 y U2, sin vocabulario nuevo. No finalizar claves ni implementarla antes de aprobar e implementar U2.
- Secuencia B2 aprobada: U1–U3 contrastes avanzados de voz/afijos; U4–U6 `-kan`/`-i`/`memper-`; U7–U10 nominalizaciones; U11–U12 reduplicación/compuestos; U13–U60 sin desglose temático aprobado.
- PR #443 retiró del currículo ejecutable los borradores heredados U2–U5 y los conservó en `docs/B2_LEGACY_DRAFT_ARCHIVE.md`; una regresión exige que solo U1 permanezca activa.
- Reglas vigentes: 14–22 ejercicios por unidad, al menos cuatro tipos, cinco ejercicios con oraciones completas, una producción guiada y repaso acumulativo cada 4–5 unidades. B2 permanece oculta hasta completar contenido y flujo de liberación. No tocar IndexedDB ni backup JSON v3; no añadir dependencias ni vocabulario sin aprobación.
- Métricas estructurales y revisiones editoriales anteriores son snapshots de sus fechas, no certificación lingüística. No hay hablante nativo disponible; no bloquear el proyecto por KBBI.

> Se actualiza en CADA PR. Mantener corto (unas 150 líneas como máximo). Última actualización: 8 nov 2026.

## Visión
- App para aprender idiomas, estilo Duolingo, en rojo y blanco.
- Hoja de ruta decidida por el dueño el 5 nov 2026: completar indonesio hasta B2 (A1, A2 y B1 completos; B2 en curso) → inglés desde cero/A1 para hispanohablantes.
- El curso de inglés incluirá pronunciación con audio o transcripción sencilla, falsos amigos y verbos frasales. No hay ningún otro idioma planificado; cualquier idioma adicional lo decidirá el dueño más adelante.
- Todo código y estructura de datos nuevos deben ser independientes del idioma. No hacer ahora una refactorización general; solo evitar nuevas dependencias fijas del indonesio para que añadir inglés no exija una reestructuración grande.
- Uso personal; posible futuro: compartirla gratis con amigos o una comunidad de nicho.
- Prioridad principal del dueño: perfeccionar esta app y aprender idiomas con ella.
- Completar todo el indonesio hasta B2 antes de abrir inglés; no hay otros idiomas planificados.

## Estado actual del currículo
- **Actualización 8 nov 2026:** B1 cerrado en 50/50. B2 U1 implementada y fusionada en PR [#437](https://github.com/luisequeira612-commits/bahasa-studio/pull/437) (1/60); el nivel permanece oculto/no publicado hasta completar el currículo. Plan aprobado: U1–U3 voz/afijos, U4–U6 `-kan/-i/memper-`, U7–U10 nominalizaciones, U11–U12 reduplicación/compuestos; U13–U60 sin desglose temático. Se conserva el borrador anterior de cinco unidades en `docs/B2_LEGACY_DRAFT_ARCHIVE.md`; reglas y mapa en `docs/B2_CURRICULUM_REORGANIZATION.md`. No añadir vocabulario nuevo sin aprobación.
- A1: 32 de 32 unidades hechas.
- A2: 40/40 unidades completas y habilitadas en beta (`A2_RELEASE_ENABLED = true`). La consolidación A2 U5–U8 quedó documentada y revisada; los avisos históricos no equivalen a errores lingüísticos confirmados.
- B1: 50/50 unidades completas, 241 entradas de vocabulario y 144 lecciones; 727 ejercicios combinados tras consolidar U1–U12. Repasos acumulativos explícitos en U4, U8, U12, U17, U22, U27, U32, U37, U42 y U47. El contenido sigue en beta, sin validación nativa ni certificación MCER/BIPA. B2: 1/60 unidades implementadas (U1, PR #437); quedan 59. U2 y U3 tienen diseños documentales preliminares; U2 espera aprobación explícita de las cuatro formas candidatas. La escucha usa síntesis local.
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

## Pendiente (fase B2)

1. Obtener aprobación explícita del dueño para las cuatro formas candidatas de B2 U2 y sus ejemplos; mientras tanto, no asignar IDs ni incorporarlas al currículo ejecutable.
2. Tras la aprobación, implementar B2 U2 con el contrato de unidad y pruebas de progresión, referencias, roles semánticos y exposición anticipada.
3. Finalizar e implementar B2 U3 solo después de que U2 esté aprobada e implementada.
4. Continuar con los bloques aprobados U4–U6 (`-kan`, `-i`, `memper-`), U7–U10 (nominalizaciones) y U11–U12 (reduplicación/compuestos), revisando vocabulario y evidencia antes de cada incorporación.
5. Definir con el dueño el mapa de U13–U60 antes de asignarles títulos, objetivos o contenido.
6. Mantener B2 oculta/no publicada hasta completar las 60 unidades y el flujo de liberación; después completar el indonesio hasta B2 antes de iniciar inglés A1 para hispanohablantes.

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

## Revisión editorial contextual B1 U27–U32 (7 nov 2026)
- Lectura de seis unidades: 0 errores confirmados y 2 candidatos editoriales (glosa «quizá» para `kira-kira` en U28; precisión contextual de `Saya mengatur waktu untuk tugas` en U32). No se modificó el currículo. Ver `docs/EDITORIAL_AUDIT_B1_U27_U32.md`.


## Revisión editorial contextual B1 U33–U37 (7 nov 2026)
- Lectura manual de cinco unidades: 0 errores confirmados y 0 candidatos que justifiquen corrección curricular. U33–U37 mantienen coherencia interna entre objetivos, glosas, explicaciones, ejemplos y ejercicios. La reutilización de IDs A2 en U35/U37 se considera coherente con la revisión acumulativa. No se modificó el currículo ni datos persistentes. Ver `docs/EDITORIAL_AUDIT_B1_U33_U37.md`.


## Revisión editorial contextual B1 U43–U47 (7 nov 2026)
- Lectura manual de cinco unidades: 0 errores confirmados y 0 candidatos que justifiquen corrección curricular. U43–U47 mantienen coherencia entre objetivos, glosas, ejemplos, explicaciones y ejercicios; la reutilización de IDs A1/A2 en U47 es coherente con el conocimiento previo. No se modificó el currículo ni datos persistentes. Ver `docs/EDITORIAL_AUDIT_B1_U43_U47.md`.


## Revisión editorial contextual B1 U48–U50 (7 nov 2026)
- Lectura manual de las tres unidades finales: 0 errores confirmados y 0 candidatos que justifiquen corrección curricular. U48–U50 mantienen coherencia entre vocabulario, glosas, ejemplos, explicaciones y ejercicios; U50 funciona como cierre integrador. No se modificó el currículo ni datos persistentes. Ver `docs/EDITORIAL_AUDIT_B1_U48_U50.md`.

- 8 nov 2026: revisión documental de B2 U2 en la rama `docs/b2-u2-evidence-review`: un artículo académico de 2024 respalda directamente `kubaca`, `kutulis` y `kaubaca`; una publicación del Pusat Bahasa de 2007 solo corrobora de forma limitada la forma `kautulis`; EYD V confirma la unión ortográfica de `ku-`/`kau-`. Se mantienen las cuatro como candidatas, con menor confianza para `kautulis`; ninguna forma/glosa/ejemplo se considera aprobada. Solo documentación; sin currículo ejecutable, IndexedDB, backup v3 ni dependencias.
## PR B2 U2 approval guard — 7 nov 2026
- Preparación técnica: añade una prueba de regresión que impide que las cuatro formas candidatas de B2 U2 (kubaca, kaubaca, kutulis, kautulis) entren en el currículo ejecutable antes de aprobación explícita.
- No añade contenido, vocabulario, IDs ni ejemplos; U2 y U3 siguen pendientes de aprobación/implementación. B2 permanece en 1/60; quedan 59 unidades B2. Sin cambios en IndexedDB, backup v3 ni dependencias.


## PR — retirar unidades B2 heredadas del currículo ejecutable (7 nov 2026)
- Se detectó que el antiguo borrador B2 U2–U5 seguía dentro de `CourseData` en `index.html`, aunque ya estaba conservado en `docs/B2_LEGACY_DRAFT_ARCHIVE.md` y no formaba parte del plan activo. Esto contradecía el estado B2 1/60.
- Se retiran las unidades heredadas U2–U5 del bloque ejecutable; B2 contiene ahora únicamente la U1 implementada. El borrador antiguo permanece preservado en el archivo histórico.
- Se añade una regresión que exige exactamente `b2_u1` en el currículo B2 cargado, comprueba que U2–U5 sigan en el archivo y evita que los IDs antiguos v231–v246 reaparezcan en el contenido ejecutable.
- No se altera A1/A2/B1, la U1, IndexedDB, backup JSON v3 ni dependencias. B2 sigue oculta/no publicada; 1/60 implementada y 59 pendientes.


## PR — actualización del estado vigente B2 (8 nov 2026)
- Actualiza el resumen principal y la lista de pendientes para reflejar A1 32/32, A2 40/40, B1 50/50 y B2 1/60 (123/182; 59 pendientes), con B2 como fase actual.
- Corrige referencias obsoletas que presentaban A2 U5–U8 y B1 como pendientes de consolidación; conserva las métricas históricas como snapshots y no como certificación lingüística.
- Registra la retirada del borrador ejecutable B2 U2–U5 en PR #443 y mantiene explícita la aprobación pendiente de las cuatro formas candidatas de U2. Solo documentación; sin cambios de currículo, IndexedDB, backup JSON v3 ni dependencias.


- 8 nov 2026: evidencia adicional para B2 U2: el manual oficial de Badan Bahasa _Penyuluhan Bahasa Indonesia untuk Pewara_ (2016, pp. 25–26 PDF) presenta `kautulis`, `kaubaca` y `kausampaikan` como grafías unidas correctas; el artículo académico de Jumiati, Erni y Hidayat (2022, _SAJAK_ 1(2), pp. 23–24) clasifica `kutulis` y `kautulis` como ejemplos de formas ligadas `ku-`/`kau-`. Esto fortalece la evidencia ortográfica/morfológica de `kautulis`, pero aún no aporta una oración contextual completa con esa forma. Las cuatro formas siguen pendientes de aprobación; sin IDs ni implementación de U2. Ver `docs/B2_U2_DESIGN.md`.


## Evidencia contextual adicional B2 U2 — 8 nov 2026
- La antología oficial alojada en el repositorio Kemendikdasmen *Puisi-Puisi Kenabian dalam Perkembangan Sastra Indonesia Modern* (p. 88 PDF) contiene los versos «Kautulis kau paparkan / Kausampaikan dengan lisan». Es un uso contextual escrito de `kautulis` en poesía indonesia; no prueba por sí solo frecuencia ni registro conversacional/neutro. Fuente: https://repositori.kemendikdasmen.go.id/16050/1/Puisi-Puisi%20Kenabian%20Dalam%20Perkembangan%20Sastra%20Indonesia%20Modern.pdf
- Se revisó también Abdullah Hassan, *Morfologi* (Dewan Bahasa dan Pustaka, 2023), pp. 177–178: considera janggal `kutulis` y `kautulis` en **bahasa Melayu** y prefiere `saya tulis` / `engkau tulis`. No se usa como evidencia contra el indonesio; se registra como advertencia de no transferir juicios de naturalidad entre malayo e indonesio. Fuente: https://jendeladbp.my/app/uploads/woocommerce_uploads/2025/04/eDigital_Morfologi-qnsczr.pdf
- Evaluación actualizada: `kautulis` tiene respaldo ortográfico oficial (2016), morfológico académico (2022) y un uso contextual literario indonesio (antología oficial, 2017); queda sin resolver si debe enseñarse como opción productiva en registro neutro. Las cuatro formas de U2 siguen pendientes de aprobación explícita; sin IDs ni implementación.


## Evidencia contextual adicional de B2 U2 — 8 nov 2026
- La revista literaria **PUSAT**, núm. 06/2014, publicada por Badan Pengembangan dan Pembinaan Bahasa (ISSN 2086-3934), contiene en el poema «Ada Banyak Hal» de Alex R. Nainggolan la secuencia «ada banyak hal, yang ingin kautulis» (p. 18 impresa; PDF líneas 470–503). Es un testimonio contextual escrito de `kautulis` en una relativa, no una simple lista morfológica. Fuente: https://repositori.kemendikdasmen.go.id/4285/1/Majalah%20Pusat%20edisi%206.pdf
- El ejemplo sigue siendo poético: demuestra uso literario indonesio, pero no establece frecuencia ni registro conversacional/neutro. Complementa el testimonio de la antología oficial de 2017 ya documentado; no cambia la decisión de aprobación. Las cuatro formas candidatas siguen sin aprobación explícita, sin IDs ni implementación.


## Evidencia didáctica complementaria B2 U2 — 8 nov 2026
- Hasbul et al., *Bahasa Indonesia: Pemahaman, Penggunaan, dan Pengembangan di Era Modern* (CV Pustaka Inspirasi Minang, agosto de 2025), p. 51 impresa, usa «Buku itu sudah kubaca → Sudah kubaca buku itu» como ejemplo de permutación del orden de constituyentes en una sección sobre estrategias sintácticas de uso cotidiano. Fuente: https://repository.umb.ac.id/1494/1/EBOOK%20BAHASA%20INDONESIA%20PEMAHAMAN%2C%20PENGGUNAAN%20DAN%20PENGEMBANGAN%20DI%20ERA%20MODERN.pdf
- Se clasifica como ejemplo didáctico contemporáneo, no como transcripción ni dato de corpus espontáneo. Refuerza el respaldo de `kubaca` en un contexto de foco/orden, sin probar frecuencia conversacional ni modificar la aprobación pendiente de las cuatro formas U2. Ver `docs/B2_U2_DESIGN.md`.


## Referencia académica sobre el foco de `ku-`/`kau-` — 8 nov 2026
- Akihisa Matsuno, «Theme/Rheme and the Problem of Passive in Bahasa Indonesia», *Osaka University of Foreign Studies Journal* núm. 3 (1990), pp. 35–53, presenta en p. 36 «Buku itu kubaca» y «Buku itu kaubaca» frente a sus equivalentes activos con `Aku`/`Engkau`. Analiza los patrones desde la estructura informativa y advierte que llamar «pasivas» sin matices a las construcciones de primera/segunda persona es discutible. Fuente institucional: https://ir.library.osaka-u.ac.jp/repo/ouka/all/79494/joufsns_03_035.pdf
- Alcance: respaldo académico directo de `kubaca` y `kaubaca` y de su relación con foco/orden; no valida `kutulis`/`kautulis`, no mide frecuencia conversacional actual ni decide registro. El comentario del artículo sobre frecuencia de patrones invertidos se apoya en un pasaje literario malayo, por lo que no se extrapola como dato de frecuencia del indonesio. Ver `docs/B2_U2_DESIGN.md`. Las cuatro candidatas siguen pendientes de aprobación explícita.


## Fuente descriptiva adicional B2 U2 — 8 nov 2026
- John W. M. Verhaar, «The Categorial System in Contemporary Indonesian: Verbs», *NUSA* 18, pp. 27–64, sección 6.7, describe `ku-`/`kau-` como proclíticos agentes y permite que el participante afectado aparezca antes o después del verbo según factores discursivos. Ejemplos: `Surat-surat ini (sudah) kutandatangani`, `Kapan (akan) kauundang pacar saya?`, `Kamu akan kuberitahu` y `Inilah surat yang kutandatangani, bukan yang kautandatangani`. Fuente: https://sealang.net/archives/nusa/pdf/nusa-v18-p27-64.pdf
- Es evidencia gramatical descriptiva del indonesio, pero no mide frecuencia actual ni valida directamente `kutulis`/`kautulis` como ejemplos concretos de U2. Las cuatro candidatas siguen pendientes de aprobación explícita. Ver `docs/B2_U2_DESIGN.md`.

## Referencia histórica adicional B2 U2 — 8 nov 2026
- Renate Eisengarten, disertación doctoral *Die Funktionen des ke-an-Formativs in der Bahasa Indonesia* (Friedrich-Schiller-Universität Jena, 1976), sección 1.5.3.4, pp. 109–110 impresas, cita a Amin Singgih (1973, p. 49) enumerando explícitamente `kutulis` (`aku tulis/saya tulis/kita tulis`) y `kautulis` (`engkau tulis/kamu tulis/anda tulis`) como formas ligadas del agente, junto con `ditulis`. Eisengarten cuestiona que la etiqueta «pasiva» esté demostrada y analiza los pronombres integrados sintéticamente con la raíz verbal; ilustra el objeto antepuesto con `Mobil kubeli` frente a `Aku membeli mobil`. Fuente: https://www.db-thueringen.de/servlets/MCRFileNodeServlet/dbt_derivate_00025838/Eisengarten-diss._A.pdf (pp. 109–110, sección 1.5.3.4).
- Alcance: respaldo académico secundario explícito para `kutulis` y `kautulis`, pero basado en una gramática de 1973; no es corpus contemporáneo ni aporta una oración contextual completa con `kautulis`, así que no establece frecuencia ni registro actual. Refuerza la cautela sobre clasificar automáticamente el patrón como pasiva. Las cuatro candidatas de U2 siguen pendientes de aprobación explícita; sin IDs ni implementación. Ver `docs/B2_U2_DESIGN.md`.


## Referencia morfológica académica complementaria B2 U2 — 8 nov 2026
- Imamul Mutaqin, tesis *Proses Pembentukan Derivasi dan Infleksi pada Rubrik Edukasi Kompas.com* (Universitas Tidar, 2022), pp. 28–29 impresas, presenta `kubaca`, `kaubaca`, `kutulis` y `kautulis` en un paradigma de flexión verbal y distingue los proclíticos de primera y segunda persona. Fuente: https://repositori.untidar.ac.id/index.php?bid=11351&fid=25888&p=fstream-pdf (PDF, líneas 1158–1200).
- Cautela: la tabla es teórica/ilustrativa y remite a trabajos gramaticales previos; no demuestra que esas formas aparezcan en el corpus de Kompas.com ni mide frecuencia, naturalidad espontánea o registro conversacional. Añade respaldo académico para el paradigma morfológico, no aprobación de las cuatro formas candidatas. Sin IDs ni implementación de U2. Ver `docs/B2_U2_DESIGN.md`.


## Ejemplo contextual adicional B2 U2 — 8 nov 2026
- Reno Wulan Sari, docente de Sastra Indonesia en Universitas Andalas y profesora invitada en Busan University of Foreign Studies, «Penggunaan Kata Ganti Engkau, Kau, Dia, dan Ia», *Scientia Indonesia*, 14 feb 2021: presenta «Buku yang kautulis sudah selesai kubaca» como ejemplo del uso ligado de `kau-`. Fuente: https://scientia.id/2021/02/14/penggunaan-kata-ganti-engkau-kau-dia-dan-ia/ (sección sobre `engkau` y `kau`).
- Alcance: ejemplo didáctico completo y contextual, escrito por una docente universitaria; no es evidencia de corpus espontáneo ni mide frecuencia o registro conversacional. Complementa, pero no resuelve, la duda sobre registro neutro de `kautulis`. Las cuatro candidatas de U2 siguen pendientes de aprobación; sin IDs ni implementación. Ver `docs/B2_U2_DESIGN.md`.


## Diseño preliminar B2 U4 — 8 nov 2026
- Se prepara una propuesta documental para U4 sobre funciones de `-kan` y estructura de participantes, dentro del bloque U4–U6 aprobado (`-kan`, `-i`, `memper-`). Las fuentes académicas consultadas describen funciones causativas y aplicativas/benefactivas; no respaldan una equivalencia fija ni una regla universal de valencia. Referencias: Musgrave, Arka y Rajeg (2024), Jeong (2019), Dwijatmoko (2021) y Sedeng (2011). Ver `docs/B2_U4_DESIGN.md`.
- El diseño no incorpora vocabulario ni IDs. Las formas del borrador antiguo son solo pistas y requieren auditoría global antes de reutilizarse. El eje U4–U6 está aprobado, pero este desglose, ejemplos y ejercicios siguen siendo propuesta documental; no hay autorización para contenido ejecutable. Sin cambios a IndexedDB, backup JSON v3, A1/A2/B1, trackers ni dependencias.
