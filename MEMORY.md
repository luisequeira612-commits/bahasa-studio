# MEMORY.md — Estado de Bahasa Studio

> Memoria operativa; mantenerla por debajo de unas 150 líneas. Detalles extensos y evidencia histórica viven en documentos y PR enlazados. Última actualización: 13 nov 2026.

## Corrección pedagógica obligatoria — 12 nov 2026
- Decisión explícita del dueño: todas las unidades A1–B2 deben tener 5–6 lecciones didácticas reales. Los ejercicios, bloques derivados de vocabulario y repasos automáticos genéricos no sustituyen lecciones planificadas. Distribuir vocabulario y recuperarlo espaciadamente en contextos diferentes.
- Hallazgo en `main` `236537f`: B2 U1–U3 tienen tres lecciones explícitas, aunque `buildUnitLessons()` añade dos repasos activos genéricos y la app puede mostrar cinco. A1 genera bloques de vocabulario y repaso automáticamente; A2/B1/B2 también pueden completar por relleno. Las pruebas previas contaban solo algunos niveles/contratos y podían ocultar la diferencia.
- PR #532 ya está fusionada en `main` (`9798a47e`): la auditoría A1–B2 separa lecciones explícitas, bloques derivados, repasos automáticos y total runtime. Detectó 3/127 unidades con 5–6 lecciones explícitas; 124 incumplen. Por nivel: A1 0/32, A2 1/40, B1 0/50, B2 2/5. La remediación se realiza por lotes y no se amplía B2 hasta corregir las unidades implementadas.
- No modificar IndexedDB, backup JSON v3 ni añadir vocabulario/ejemplos no aprobados. La corrección debe reutilizar y redistribuir contenido existente cuando sea pedagógicamente válido; no inflar recuentos con contenido artificial.

## Estado vigente
- `main` incorpora PR #515–#521, #524, #526, #527, #528 y #529; último merge: #529 (`0c5899c9bdf8b7d518f721e4a8ba2b1ffb25538b`). PR #528 sincroniza la verificación post-merge de #527; PR #529 implementa B2 U5. La regresión post-merge de #529 (#43175001181: test 74/74 y calidad offline 10/10) y Pages (#43175000192) terminaron en éxito. PR #527 añade anuncios accesibles al chat del Tutor y nombres accesibles a los campos de Tutor, clave opcional y Diccionario. Su regresión post-merge (#43172512303: test 74/74 y calidad offline 10/10) y Pages (#43172511556: build/deploy) terminaron en éxito. #524/#526 completan la accesibilidad de la burbuja de traducción y la restauración de foco del popup de significado. #518 se fusionó por squash como `5b10a1e`; su regresión post-merge (#43138303666: test 74/74 y calidad 10/10) y Pages (#43138301958: build, reporte y deploy) terminaron en éxito. #519 se fusionó por squash como `ac771984`; su regresión (#43138940547: test 74/74 y calidad 10/10) y Pages (#43138939223: build, reporte y deploy) terminaron en éxito. #521 se fusionó por squash como `f679d9f38b893ef9c3ebd4de40e9f74cb0802b5c`; su Regression post-merge (#43140312047: test 74/74 y calidad offline 10/10) y Pages (#43140309065: build, informe y deploy) terminaron en éxito. #517 amplió la traducción contextual (palabras ≥44×44 px; audio 48×48 px); #518 protege los cuatro destinos de navegación ≥44×44 px a 360 px; #519 contiene Tab/Shift+Tab en los diálogos móviles de nivel/herramientas; #521 extiende el focus trap, Escape y restauración del foco al panel modal de detalles de unidad (`unitBottomSheet`).
- Estado curricular comprobado en `main`: A1 32/32, A2 40/40, B1 50/50; B2 U1–U5 implementadas y expuestas secuencialmente (5/60). U6–U60 pendientes; U6 tiene solo el eje `memper-` aprobado, no ejemplos ni contenido; U13–U60 aún carecen de mapa aprobado. U5 aporta cinco lecciones y 16 ejercicios. La naturalidad/adecuación de ejemplos didácticos nuevos permanece `not_checked`.
- Auditoría local documentada: 122 unidades, 1.062 registros de vocabulario, 1.025 IDs únicos, 0 errores estructurales, 41 avisos heurísticos y 70 informativos. No certifica lingüística.
- Pruebas locales de progresión, contratos curriculares, liberación y B2: 75/75 correctas. La suite `quality:tests` tuvo 128 pruebas correctas, pero Playwright 1.55 no admite `process.platform === android` en este terminal. CI Linux del PR #511 pasó en su head exacto.
- PR #513 se fusionó por squash (`46e6b1b`). CI y Pages post-merge se verificaron en los SHA posteriores; sigue pendiente una prueba física específica de los controles de #513 en Android.
- La verificación post-merge de #519 corresponde al SHA exacto `ac77198400c7ac71ec4eaab85414f56cb3b01f2a`; Regression 74/74, calidad 10/10 y Pages build/reporte/deploy en éxito.

## Remediación de lecciones — 13 nov 2026
- PR #533 fusionada en `main` como `a0e2dd19`: B2 U1–U3 pasan de 3 a 5 lecciones explícitas cada una (26 ejercicios por unidad), sin añadir IDs de vocabulario nuevos. Las lecciones añadidas trabajan recuperación espaciada, contraste de construcciones e integración contextual. CI del SHA final completado con ambos trabajos en éxito.
- B2 U1–U5 implementadas cumplen ahora 5 lecciones explícitas; U6–U60 siguen pendientes. No ampliar B2 hasta remediar las unidades existentes y completar el inventario.
- PR #534 fusionada en `main` como `e1f87521`: A2 U2–U4 pasan de 4 a 5 lecciones explícitas cada una mediante recuperación espaciada de todo el vocabulario ya enseñado, sin añadir IDs. U1 ya tenía cinco. CI del SHA exacto completado con ambos trabajos en éxito.
- PR #535 en curso: A2 U5–U8 pasan de 4 a 5 lecciones explícitas cada una mediante recuperación espaciada de sus 12 verbos ya enseñados; sin IDs nuevos. Cada unidad pasa de 17 a 22 ejercicios. CI pendiente.

## B2 U5 y decisiones pendientes
- U5 implementada y fusionada en PR #529 (`0c5899c9`): cinco lecciones/16 ejercicios; añade `menawari` y `menawarkan` con IDs propios y glosas contextuales; reutiliza `v448` (`bantuan`) y `b1v145` (`umpan balik`); `datangi`/`panasi` y `menjatuhi`/`dijatuhi` solo reconocimiento; excluye `tanami`/`garami`/`kantongi`. CI del PR y post-merge: test 74/74 y calidad offline 10/10; Pages correcto. Naturalidad/adecuación de ejemplos didácticos sigue `not_checked`.
- `datangi`/`panasi` solo reconocimiento en el documento; `tanami`, `garami`, `kantongi` excluidas. `mendatangi` ya tiene IDs en A2 U16 y B1 U5; no duplicar.
- Eje aprobado: U1–U3 voz/afijos; U4–U6 `-kan`, `-i`, `memper-`; U7–U10 nominalizaciones; U11–U12 reduplicación/compuestos. El eje no aprueba ejemplos ni implementación. U13–U60 sin mapa aprobado.
- B2 U4 usa cinco lecciones, 16 ejercicios y IDs canónicos B1; no añade vocabulario. U5 ya está publicada tras U4; U6 sigue oculta hasta diseño detallado, revisión y aprobación explícita de sus ejemplos, glosas, consignas, claves y vocabulario.

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
- Fase 4: U5 implementada, fusionada y verificada; siguiente preparación: diseñar U6 (`memper-`) sin activar contenido hasta aprobación explícita. U13–U60 carecen de mapa aprobado.
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
