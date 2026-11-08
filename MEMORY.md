# MEMORY.md — Estado de Bahasa Studio

> Memoria operativa. Mantener por debajo de ~150 líneas; los detalles históricos y la evidencia extensa viven en los documentos enlazados. Última actualización: 8 nov 2026.

## Estado vigente
- A1 32/32, A2 40/40 y B1 50/50 unidades completas. B2 1/60 implementada (U1); total 123/182, quedan 59 unidades B2. B2 permanece oculta/no publicada.
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
- Pruebas B2 en `tests/load-inline-b2-curriculum.test.mjs`: contrato U1, IDs, producción guiada, release gate, formas candidatas ausentes y borradores archivados. `startUnit()` bloquea unidades B2 registradas y conserva el acceso directo usado por lecciones personalizadas no registradas.
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
