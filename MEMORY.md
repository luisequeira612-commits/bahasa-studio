# MEMORY.md — Estado de Bahasa Studio

> Memoria operativa; mantenerla por debajo de unas 150 líneas. Detalles extensos y evidencia histórica viven en documentos y PR enlazados. Última actualización: 12 nov 2026.

## Estado vigente
- `main` incorpora PR #515–#521. #518 se fusionó por squash como `5b10a1e`; su regresión post-merge (#43138303666: test 74/74 y calidad 10/10) y Pages (#43138301958: build, reporte y deploy) terminaron en éxito. #519 se fusionó por squash como `ac771984`; su regresión (#43138940547: test 74/74 y calidad 10/10) y Pages (#43138939223: build, reporte y deploy) terminaron en éxito. #521 se fusionó por squash como `f679d9f38b893ef9c3ebd4de40e9f74cb0802b5c`; su Regression post-merge (#43140312047: test 74/74 y calidad offline 10/10) y Pages (#43140309065: build, informe y deploy) terminaron en éxito. #517 amplió la traducción contextual (palabras ≥44×44 px; audio 48×48 px); #518 protege los cuatro destinos de navegación ≥44×44 px a 360 px; #519 contiene Tab/Shift+Tab en los diálogos móviles de nivel/herramientas; #521 extiende el focus trap, Escape y restauración del foco al panel modal de detalles de unidad (`unitBottomSheet`).
- Estado curricular comprobado en `main`: A1 32/32, A2 40/40, B1 50/50; B2 U1–U4 implementadas (4/60), U5–U60 ocultas/no ejecutables. Todas las unidades expuestas cumplen cinco o seis lecciones. No se cambiaron datos curriculares en esta tarea.
- Auditoría local documentada: 122 unidades, 1.062 registros de vocabulario, 1.025 IDs únicos, 0 errores estructurales, 41 avisos heurísticos y 70 informativos. No certifica lingüística.
- Pruebas locales de progresión, contratos curriculares, liberación y B2: 75/75 correctas. La suite `quality:tests` tuvo 128 pruebas correctas, pero Playwright 1.55 no admite `process.platform === android` en este terminal. CI Linux del PR #511 pasó en su head exacto.
- PR #513 se fusionó por squash (`46e6b1b`). CI y Pages post-merge se verificaron en los SHA posteriores; sigue pendiente una prueba física específica de los controles de #513 en Android.
- La verificación post-merge de #519 corresponde al SHA exacto `ac77198400c7ac71ec4eaab85414f56cb3b01f2a`; Regression 74/74, calidad 10/10 y Pages build/reporte/deploy en éxito.

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
- Fase 1: CI y calidad estructural revisados; Playwright se ejecuta en CI compatible y las regresiones post-merge #518, #519 y #521 finalizaron correctamente.
- Fase 2: cobertura estructural A1–B2 revisada con pruebas de progreso y cinco/seis lecciones. La revisión editorial/lingüística de A1/A2 no está terminada.
- Fase 3: auditoría ejecutada; 41 avisos son candidatos editoriales y requieren revisión contextual. No hay errores bloqueantes estructurales.
- Fase 4: U5 sigue pendiente de aprobación específica; no inventar mapa U13–U60.
- Fase 5–8: mejoras mobile-first y objetivos táctiles de #502, #513 y #517 integrados; #518 añade regresión de navegación; #519 y #521 añaden contención del foco, Escape y restauración del foco en diálogos móviles. CI y Pages post-merge verificados para #518, #519 y #521. Sigue pendiente prueba física Android de #513, #517, #518, #519 y #521.
- PR #520 se fusionó por squash (`6952389`) y documenta la verificación post-merge de #519. PR #521 se fusionó por squash (`f679d9f`) y extiende el focus trap y la restauración al diálogo de detalles de unidad (`unitBottomSheet`). Su CI post-merge terminó: Regression 74/74, calidad offline 10/10 y Pages build/reporte/deploy correctos. No iniciar B2 U5 ni cambiar currículo, IndexedDB o backup JSON v3. La verificación física de accesibilidad en Android sigue pendiente.

## Flujo Git
- Trabajar en ramas descriptivas y PR pequeñas; nunca modificar `main` directamente. Cada PR debe incluir objetivo, archivos, pruebas, riesgos/limitaciones y actualizar este archivo.
- Crear commits, PR y fusionar está autorizado por la misión cuando el diff esté revisado, CI verde en el head exacto, informes sin errores bloqueantes y no haya comentarios/revisiones/hilos pendientes. No fusionar con CI pendiente o fallido.
- No afirmar pruebas de dispositivo físico si solo se ejecutó navegador. Distinguir probado, revisado por lectura y no verificado.
- El detalle de la verificación post-merge está en `docs/PHASE_6_POSTMERGE_VERIFICATION.md`.

## Accesibilidad de traducción contextual — PR en curso (12 nov 2026)

- Se detectó que la burbuja de traducción de palabras (`tapTranslationBubble`) se cerraba con Escape sin devolver el foco al botón que la abrió. También el popup de significado (`wordMeaningPopup`) se comportaba como diálogo pero no movía el foco al abrirse ni restauraba el foco al texto de origen al cerrarse.
- La rama `fix/translation-popup-focus` introduce restauración de foco en la burbuja y gestión de foco de entrada/salida en el popup de significado. El elemento de texto de origen recibe `tabindex="-1"` solo mientras el popup está abierto; se restaura su atributo previo al cerrar. Escape y el botón Cerrar devuelven el foco al origen. No se añade focus trap porque el popup de significado no es modal.
- Se añadió una prueba Playwright a 360×740 para la navegación por teclado de ambos popups. Debe verificarse en CI que el fixture de vocabulario y el posicionamiento por coordenadas funcionen en Chromium.
- Sin cambios al currículo, vocabulario, IndexedDB, backup JSON v3 ni dependencias. La prueba física en Tecno Pova 4 continúa pendiente; no inferirla de Playwright.
