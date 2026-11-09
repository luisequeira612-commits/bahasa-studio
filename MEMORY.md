# MEMORY.md — Estado de Bahasa Studio

> Memoria operativa. Mantener por debajo de ~150 líneas; los detalles históricos y la evidencia extensa viven en los documentos enlazados. Última actualización: 8 nov 2026.

## Estado vigente
- A1 32/32, A2 40/40 y B1 50/50 unidades completas. B2 1/60 implementada (U1); total 123/182, quedan 59 unidades B2. En la Fase 1 U1 y un único nodo «Próximamente» se muestran en el camino; la guarda de acceso a B2 sigue vigente y el PR #472 continúa separado y sin fusionar.
- Fase actual: desarrollo progresivo de B2, sin certificación lingüística ni MCER/BIPA. A1/A2/B1 están en beta; no hay hablante nativo disponible.
- B2 U1: implementada, 3 lecciones, 16 ejercicios, 5 tipos; reutiliza 9 IDs existentes y no añade vocabulario.
- B2 U2 y U3: diseños preliminares en `docs/B2_U2_DESIGN.md` y `docs/B2_U3_DESIGN.md`. U2 espera aprobación explícita de `kubaca`, `kaubaca`, `kutulis`, `kautulis`; no asignar IDs ni incorporarlas a ejercicios evaluados antes de aprobarlas. U3 integra U1+U2 y no debe cerrarse/implementarse antes de aprobar e implementar U2.
- B2 U4–U6: propuestas documentales en `docs/B2_U4_DESIGN.md` (`-kan`), `docs/B2_U5_DESIGN.md` (`-i`) y `docs/B2_U6_DESIGN.md` (`memper-`). El bloque temático está aprobado, pero no los ejemplos, desglose ni implementación específicos.
- B2 U7–U10: propuestas documentales en `docs/B2_U7_DESIGN.md` a `docs/B2_U10_DESIGN.md`, sobre nominalizaciones. No son autorización de implementación ni de vocabulario.
- B2 U11–U12: propuestas documentales en `docs/B2_U11_DESIGN.md` (reduplicación) y `docs/B2_U12_DESIGN.md` (compuestos/frases/idioms). El eje está aprobado, no los diseños específicos ni su implementación.
- U13–U60 no tienen mapa temático aprobado. No inventar títulos, objetivos ni contenidos.
- PR #443 retiró los borradores B2 U2–U5 heredados del currículo ejecutable y los archivó en `docs/B2_LEGACY_DRAFT_ARCHIVE.md`. Una prueba de regresión exige que solo U1 permanezca ejecutable y bloquea las cuatro formas candidatas de U2.
- Unidad estándar: 14–22 ejercicios, al menos 4 tipos, al menos 5 ejercicios con oraciones completas, 1 producción original guiada y repaso acumulativo cada 4–5 unidades.
- No tocar A1/A2 ya completos salvo corrección real autorizada por el flujo normal. No modificar IndexedDB ni backup JSON v3.

## Visión y restricciones permanentes
- Hoja de ruta decidida 5 nov 2026: completar indonesio hasta B2; después inglés desde cero/A1 para hispanohablantes (pronunciación con audio/transcripción sencilla, falsos amigos y phrasal verbs). Ningún otro idioma planificado.
- App personal, gratis, local y offline; quizá compartida gratis. Sin monetización, Play Store, cuentas, backend, costos, anuncios, vidas ni funciones sociales. No integrar agentes externos de IA dentro de la app.
- No añadir dependencias sin aprobación. No hacer reescrituras grandes ni refactorización multiidioma general ahora.
- Código y estructuras de datos nuevos deben evitar acoplamiento innecesario al indonesio; esto no autoriza empezar inglés antes de terminar B2.
- Progreso local por dispositivo; conservar importación/exportación compatible con backup JSON v3. No modificar esquema IndexedDB ni backup v3.
- Interfaz móvil-first, en español, rojo/blanco; el dueño trabaja principalmente desde teléfono.

## Contenido y verificación lingüística
- No hay hablante nativo disponible y KBBI/API secundaria puede fallar. Esto no detiene el proyecto. No presentar auditorías automáticas, fuentes secundarias ni revisión documental como certificación lingüística.
- Estados: `verified_primary` solo lo asigna el dueño; `cross_checked` requiere coincidencia en 2+ fuentes secundarias independientes y registrar fuentes en tracker; lo demás `not_checked`. No cambiar IndexedDB para añadir estados.
- Si hay duda, usar la forma simple y común, marcar `not_checked` y explicitar la incertidumbre. No inventar ejemplos ni fuentes. No bloquear avance por KBBI o falta de hablante nativo.
- Priorizar vocabulario frecuente, reutilizar IDs canónicos existentes y no duplicar una forma con IDs distintos. Cada forma derivada nueva conserva su propio ID cuando se apruebe.
- En B2, enseñar agente, participante afectado, foco y contexto. No etiquetar universalmente `ku-/kau-` como pasiva ni inferir tiempo/aspecto solo por la forma. No tratar estos clíticos como contracciones simples ni duplicar el agente (p. ej., evitar `Buku itu saya kubaca`). Glosas españolas neutrales en tiempo: «Ese libro lo leo / lo leí, según el contexto».
- Investigación extensa de las cuatro formas de U2 (fuentes oficiales, académicas, literarias y didácticas; alcances y cautelas) está en `docs/B2_U2_DESIGN.md`. Respalda morfología/uso escrito, pero no resuelve frecuencia ni registro conversacional neutro; no sustituye la aprobación del dueño.

## Git y flujo de trabajo
- Nunca trabajar directamente en `main`. Una rama por cambio y PR.
- El dueño autorizó crear y fusionar PRs cuando estén listos. Fusionar solo si CI está completamente verde en el head exacto y no hay revisiones, comentarios, hilos ni problemas pendientes. Informar cada fusión.
- Cada PR debe explicar alcance, archivos, pruebas y riesgos, y actualizar `MEMORY.md`. Usar el cambio mínimo.
- Si CI falla o está pendiente, no fusionar; diagnosticar y corregir en la misma rama.
- Informe final breve en español: resultado primero; distinguir probado, revisado por lectura y no verificado. Para cambios de vocabulario, informar estados de verificación y cantidades.

## Herramientas y calidad
- ChatGPT puede programar y preparar PRs; Codex puede usarse después como auditor independiente, pero no afirmar que auditó si no se ejecutó.
- Preferir auditorías locales/offline y pruebas existentes; no añadir servicios externos ni dependencias por conveniencia.
- Pruebas B2 en `tests/load-inline-b2-curriculum.test.mjs`: contrato U1, IDs, producción guiada, formas candidatas ausentes, borradores archivados y protección de `startUnitById()`, `startUnitAssessment()` y `startUnit()`. La ruta muestra solo U1 y un nodo «Próximamente», pero el motor mantiene el bloqueo B2. El fallback de traducción por selección excluye ejercicios authored de B2. El nivel inferido para el prompt del tutor ignora posibles completados B2 residuales.
- Scripts e informes de calidad son evidencia estructural/editorial, no validación nativa.

## Decisiones de producto y currículo
- A1: 32 unidades; A2: 40 unidades, 2–5 lecciones por unidad y examen como A1; B1: 50 unidades.
- Secuencia B2 aprobada: U1–U3 voz/afijos; U4–U6 `-kan/-i/memper-`; U7–U10 nominalizaciones; U11–U12 reduplicación/compuestos. Solo el eje general está aprobado en las unidades aún no implementadas.
- Los diseños preliminares son reversibles y documentales. «Continúa» autoriza seguir trabajando con seguridad, no aprobar vocabulario, ejemplos, claves, ejercicios o nuevas unidades.

## Hitos recientes de B2 (8 nov 2026)
- #435–#438: limpieza de documentación B2, diseño/implementación U1 y corrección de memoria; U1 sigue oculta.
- #439–#443: diseños preliminares U2/U3, revisión de evidencia, guardas de candidatas y retirada de borradores heredados del currículo activo.
- #444–#453: correcciones de estado y evidencia morfológica/contextual para U2; los testimonios no resuelven registro neutro ni aprueban las formas.
- #454–#456: diseños documentales U4–U6 (`-kan`, `-i`, `memper-`).
- #458 y #460–#462: diseños U7–U10; #457 y #459 se cerraron/sustituyeron sin perder el trabajo reconciliado.
- #463: diseño documental U11; #464: diseño documental U12. Ambos sin vocabulario ni ejercicios ejecutables.
- #465: registra en esta memoria la fusión de #464; no es un cambio curricular. #465 fusionada en `0f0c6ed6a0c9aba46c436c1838e49a6f00a2852c`; #464 en `f89b9533e40577337722c213f695c49a547101d9`.
- #458–#465 fueron fusionadas tras CI verde en el head correspondiente y sin revisiones/comentarios/hilos pendientes; detalles y commits de cada PR están en el historial de GitHub.

## Referencias de estado
- Reorganización y secuencia B2: `docs/B2_CURRICULUM_REORGANIZATION.md`.
- Diseños B2: `docs/B2_U1_DESIGN.md` a `docs/B2_U12_DESIGN.md` (U1 es implementada; U2–U12 son propuestas con el alcance descrito arriba).
- Archivo de borradores retirados: `docs/B2_LEGACY_DRAFT_ARCHIVE.md`.
- Pruebas de carga/guardas B2: `tests/load-inline-b2-curriculum.test.mjs`.
- Para el estado de una PR concreta, usar su historial, CI y revisiones en GitHub; esta memoria resume hitos y decisiones, no sustituye esos registros.


## Rediseño de Aprender — Fase 1 (8 nov 2026)
- Decisión del dueño: registrar cada clave unidad::índiceDeLección en A2/B1/B2 al completar todos los ejercicios de esa lección; salir antes no registra la lección. No modificar IndexedDB ni backup JSON v3.
- Una función derivada calcula avance, finalización y desbloqueo desde completedLessons y completedUnits; los IDs ya aprobados conservan el estado aunque falten claves de lección.
- Evaluación final en la ruta actual: A1 y B1 (umbral existente 80 %); A2 y B2 no muestran evaluación final en la ruta actual. A2/B2 se completan al terminar todas las lecciones.
- Desbloqueo secuencial en A1/A2/B1 y B2 U1: B2 U1 se abre al completar la última unidad B1; B2 U2+ siguen sin contenido ejecutable y protegidas. Se conserva la etiqueta «En desarrollo»; el salto de emergencia no puede saltarse la guarda secuencial de B2.
- Agrupación visual por orden, secciones de 8; B2 muestra U1 implementada y un solo nodo «Próximamente». El salto de emergencia usa localStorage (bahasaStudioUnitSkipId) y no altera aprobación.
- La Fase 1 va en una rama/PR independiente; no fusionar sin autorización. PR #472 (fix/restore-b1-b2-access) sigue abierto y sin fusionar; se solapa con index.html y deberá reconciliarse si se fusiona más adelante.

- PR #473 (Fase 1) — estado al 8 nov 2026: rama `feat/learning-path-phase-1`, head `cc3c8d05f5594cac0d9e385d0b827f4dce34220a`. Implementa selector de nivel, secciones de 8, camino zigzag, estados y hoja inferior; desbloqueo secuencial derivado desde `completedLessons`/`completedUnits`; registro al terminar cada lección; evaluación final A1/B1 al 80 %; salto de emergencia local con confirmación; B2 limitado a U1 y un nodo «Próximamente». Agrupación por orden, sin inventar temas.
- CI run #42522755681 en ese head: `test` 72 pasos y `Offline quality reports` 10 pasos, ambos en éxito; incluye pruebas de progreso A1 1/2, A2 legacy completada sin claves de lección, A2 multilección, B1 evaluación, salida anticipada, 360 px, navegador real, importación/exportación JSON v3 y disponibilidad offline del service worker. Sin revisiones, comentarios ni hilos pendientes. PR permanece abierto; no fusionar sin autorización.
- No se modifican IndexedDB, backup JSON v3 ni manifest (display standalone ya estaba configurado); se actualiza la versión del caché del service worker para forzar la descarga de la app nueva. No se añaden dependencias. Fases 2 y 3 no iniciadas. La interfaz nueva queda limitada a Aprender y Perfil.
- PR #472 sigue abierto y separado. Su restauración completa de acceso B2 contradice el límite actual de mostrar solo U1 implementada más «Próximamente»; además ambos PR modifican `index.html`. Reconciliar la intención antes de fusionarlo, sin incorporar sus cambios automáticamente.
- Actualización de compatibilidad (8 nov 2026): `service-worker.js` sube el caché de `bahasa-studio-v3.8.69` a `v3.8.70`; el SW elimina la caché anterior al activar la nueva. Se añadieron pruebas de actualización desde una instalación vieja preservando `completedUnits`/`completedLessons`, y de salto de emergencia A2/B1 sin modificar progreso; B2 no puede saltarse por una clave local obsoleta.

- Revisión de integración B2 (8 nov 2026): la guarda previa impedía acceder a U1 incluso después de completar B1. Se ajustó de forma mínima: la función derivada abre solo B2 U1 tras B1 U50; U2+ permanecen no implementadas/protegidas, la etiqueta «En desarrollo» se conserva y el salto local no puede saltarse la guarda de B2. CI run #42523643502: `test` 72 pasos y `Offline quality reports` 10 pasos, ambos verdes en el head de implementación `1a90da716627ec7bff5eb61392d994b88fca230b`. La actualización documental actual de `MEMORY.md` requiere su propio CI exacto.
- Corrección de regresión de integración (8 nov 2026): CI del commit `57bfbc387b96048483e7f299c5f84747ec90f7c9` detectó una aserción contradictoria en `tests/learning-path-progression.test.mjs`: esperaba que un salto de emergencia abriera B2 U1, aunque la regla vigente exige completar B1 y bloquea cualquier salto local a B2. Se corrigió la prueba para exigir que el salto no omita esa guarda; la lógica de la app no necesitó cambios. Commit de prueba `fff35d7230cb26df83f73d548e08a6eae70dc5ab`; CI del nuevo head pendiente.

- Actualización del service worker (8 nov 2026): el primer CI de la prueba de migración desde caché v3.8.69 confirmó que la caché nueva se instala y la antigua se elimina, pero detectó una carrera: el test recargaba antes de que terminara `clients.claim()`. Se ajustó la activación para esperar tanto la limpieza como la reclamación de clientes y la prueba espera el evento `controllerchange` antes del siguiente lanzamiento. La verificación debe repetirse en CI sobre el nuevo head; IndexedDB y backup v3 permanecen intactos.
## Rediseño de Aprender — Fase 2 (8 nov 2026)
- Fase 2 (#474) fusionada el 8 nov 2026 en `main`, squash `6ff13ab4a8f78b09af38f5877bac800f5d729def`. Compacta Aprender, mueve el recordatorio de backup a Perfil y aclara la meta diaria; preserva progreso, desbloqueos, salto, IndexedDB y backup JSON v3. SW `v3.8.71`.
- Archivos #474: `index.html`, `styles.css`, `service-worker.js`, pruebas E2E y `MEMORY.md`; no añade dependencias.


## Rediseño de Aprender — Fase 3 (8 nov 2026)
- Alcance aprobado: paleta con un único rojo de marca `--brand-red:#c92a40`, contraste AA sobre fondos tintados, estados sólidos rojo/verde/gris, controles táctiles de Aprender/hoja de unidad, manifest/PWA y etiquetas duplicadas solo si existen. No tocar progreso, desbloqueos, salto de emergencia, IndexedDB ni backup v3; no tocar colores de acierto/error.
- Rama `feat/learning-screen-phase-3`, creada desde `main` posterior a #474. Cambios en curso: `styles.css`, `manifest.json`, `index.html` (meta theme-color), `icon.svg`, `service-worker.js` (caché `v3.8.72`), `package.json`, prueba `tests/learning-screen-phase-3.test.mjs` y esta memoria. CI y pruebas de navegador pendientes; sin merge.
- Manifest: `standalone`, `./index.html`, `scope:./`, icono SVG `any maskable`, `theme_color:#c92a40`, `background_color:#ffffff`. Los `.btn-sm` de 44 px están limitados a `#view-route` y `#unitBottomSheet`; los controles compactos de Repaso, Tutor, Diccionario, Ajustes, Evaluación, Cuaderno y ejercicios conservan su tamaño previo. #472 permanece abierto e intacto; su restauración de acceso B2 contradice la regla vigente de U1 + un único nodo «Próximamente».
