# MEMORY.md — Estado de Bahasa Studio

> Memoria operativa; mantenerla por debajo de unas 150 líneas. Detalles extensos y evidencia histórica viven en documentos y PR enlazados. Última actualización: 11 nov 2026.

## Estado vigente
- `main` incorpora PR #515–#517; #517 se fusionó por squash como `40f8f1f`. La regresión post-merge (#43137605348, 74/74 pasos) y Pages (#43137604318) terminaron en éxito sobre el SHA exacto `40f8f1f9bab8a751ce069be8f57bcdb9272f4f3b`. #517 amplió la traducción contextual: palabras ≥44×44 px y audio 48×48 px.
- Estado curricular comprobado en `main`: A1 32/32, A2 40/40, B1 50/50; B2 U1–U4 implementadas (4/60), U5–U60 ocultas/no ejecutables. Todas las unidades expuestas cumplen cinco o seis lecciones. No se cambiaron datos curriculares en esta tarea.
- Auditoría local documentada: 122 unidades, 1.062 registros de vocabulario, 1.025 IDs únicos, 0 errores estructurales, 41 avisos heurísticos y 70 informativos. No certifica lingüística.
- Pruebas locales de progresión, contratos curriculares, liberación y B2: 75/75 correctas. La suite `quality:tests` tuvo 128 pruebas correctas, pero Playwright 1.55 no admite `process.platform === android` en este terminal. CI Linux del PR #511 pasó en su head exacto.
- PR #513 se fusionó por squash (`46e6b1b`). CI y Pages post-merge se verificaron en los SHA posteriores; sigue pendiente una prueba física específica de los controles de #513 en Android.
- La lista de PR abiertas debe comprobarse de nuevo antes de cerrar Fase 6. CI post-merge y despliegue de Pages sí están verificados en el SHA exacto de `main` indicado arriba.

## B2 U5 y decisiones pendientes
- PR #511 documenta el par `menawari/menawarkan`, fuentes y 16 prototipos. Glosas, naturalidad, adecuación didáctica y vocabulario nuevo siguen pendientes de aprobación del dueño; todo sigue `not_checked` para esos juicios. No implementar ni activar U5 por “continúa”.
- `datangi`/`panasi` solo reconocimiento en el documento; `tanami`, `garami`, `kantongi` excluidas. `mendatangi` ya tiene IDs en A2 U16 y B1 U5; no duplicar.
- Eje aprobado: U1–U3 voz/afijos; U4–U6 `-kan`, `-i`, `memper-`; U7–U10 nominalizaciones; U11–U12 reduplicación/compuestos. El eje no aprueba ejemplos ni implementación. U13–U60 sin mapa aprobado.
- B2 U4 usa cinco lecciones, 16 ejercicios y IDs canónicos B1; no añade vocabulario. U5 continúa protegida por desbloqueo secuencial.

## Producto y restricciones permanentes
- Aplicación gratuita, local, en español, mobile-first y offline; sin backend, cuentas, monetización, servicios pagados, anuncios, vidas, presión social ni publicación en tiendas. No integrar agentes externos de IA.
- Completar indonesio hasta B2 antes de iniciar inglés A1 para hispanohablantes. No hay otros idiomas aprobados. Código y datos nuevos deben evitar acoplamiento innecesario al indonesio, sin refactor general.
- No modificar el esquema de IndexedDB ni romper la compatibilidad del backup JSON v3; preservar progreso. No añadir dependencias sin autorización.
- `verified_primary` solo lo asigna el dueño; `cross_checked` exige dos fuentes secundarias independientes anotadas; el resto es `not_checked`. Auditorías automáticas no certifican uso nativo, MCER/BIPA ni naturalidad.
- Reutilizar IDs canónicos, no inventar vocabulario, ejemplos ni fuentes, y no activar unidades sin contenido aprobado y pruebas de desbloqueo.

## Fases y próximos pasos
- Fase 1: CI y calidad estructural revisados; queda repetir Playwright en CI compatible y verificar ejecuciones post-merge.
- Fase 2: cobertura estructural A1–B2 revisada con pruebas de progreso y cinco/seis lecciones. La revisión editorial/lingüística de A1/A2 no está terminada.
- Fase 3: auditoría ejecutada; 41 avisos son candidatos editoriales y requieren revisión contextual. No hay errores bloqueantes estructurales.
- Fase 4: U5 sigue pendiente de aprobación específica; no inventar mapa U13–U60.
- Fase 5: mejoras mobile-first de Aprender/Guardi (#502) y objetivos táctiles de Repasar/Tutor/Diccionario (#513) integrados. Pages y CI post-merge verificados; prueba física específica de #513 pendiente.
- Fase 6: PR #515/#516 integradas; CI y Pages post-merge correctos. Fase 7: PR #517 integrada; CI post-merge 74/74 y Pages correctos. Sigue pendiente prueba física Android de #513/#517. Nueva regresión en curso: PR #518 comprueba cuatro destinos de navegación y objetivos ≥44×44 px a 360 px.

## Flujo Git
- Trabajar en ramas descriptivas y PR pequeñas; nunca modificar `main` directamente. Cada PR debe incluir objetivo, archivos, pruebas, riesgos/limitaciones y actualizar este archivo.
- Crear commits, PR y fusionar está autorizado por la misión cuando el diff esté revisado, CI verde en el head exacto, informes sin errores bloqueantes y no haya comentarios/revisiones/hilos pendientes. No fusionar con CI pendiente o fallido.
- No afirmar pruebas de dispositivo físico si solo se ejecutó navegador. Distinguir probado, revisado por lectura y no verificado.
- El detalle de la verificación post-merge está en `docs/PHASE_6_POSTMERGE_VERIFICATION.md`.
