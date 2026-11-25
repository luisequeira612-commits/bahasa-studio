## 2026-11-25 — Ajuste de visibilidad de tarjetas ocultas (PR #832)

- La segunda ejecución de CI reveló que el atributo HTML `hidden` no garantizaba ocultar el host SRS: la medición mostró que el host conservaba 236 px y empujaba la recomendación adaptativa.
- Corrección en `styles.css`: `[data-adaptive-recommendation][hidden] { display: none !important; }`. Ambos hosts respetan ahora `hidden` y no reservan espacio cuando no corresponde mostrarlos. No altera la lógica adaptativa ni el SRS.
- Commit de corrección: `2b0e429e4f6475948dd967f4892d32db94afe871`. Pendiente CI renovado y revisar el timeout de la prueba de teclado de la burbuja de traducción.
- Fuente: GitHub Actions #45649556212, medición geométrica de fase 4 y diff de `styles.css`; 25 nov 2026.

## 2026-11-25 — PR en preparación: restaurar recomendación de aprendizaje en Aprender

- Diagnóstico: PR #829 convirtió `adaptiveRecommendationLearn` en una tarjeta exclusivamente SRS y la oculta cuando `dueCount === 0`. El motor `AdaptiveLearning.recommend()` sí calcula `nextLesson`, `skillLesson`, errores y acciones; pero Aprender dejó de mostrar esas recomendaciones sin repasos vencidos.
- Corrección en rama `fix/restore-learn-adaptive-recommendation-20261125`: conservar intacta la fila compacta SRS y añadir `adaptiveLearningRecommendationLearn` como host independiente. Se muestra cuando no hay repaso SRS prioritario y existe una acción de aprendizaje; se oculta cuando hay repasos vencidos o no hay acción. La tarjeta nueva usa el mismo motor y los handlers existentes. También se activa la vista SRS antes de iniciar la sesión cuando la recomendación refuerza palabras con errores, evitando el mismo problema de contenedor oculto corregido para «Repasar» en #830.
- Pruebas añadidas: E2E verifica que, sin repasos vencidos, aparece «Continúa con la siguiente lección» y su botón abre realmente la lección; prueba unitaria protege la separación entre tarjeta SRS y recomendación de aprendizaje y la navegación a SRS para acciones de refuerzo.
- La primera ejecución CI encontró una expectativa geométrica obsoleta en la E2E de fase 4: comparaba una coordenada de documento con una coordenada de viewport y asumía que la única tarjeta de Aprender debía estar oculta. Se actualizó para distinguir la tarjeta SRS oculta de la tarjeta adaptativa visible y comprobar que esta última no se solapa con la primera unidad. Nueva ejecución CI pendiente; no fusionar hasta verificar todos los checks. Sin cambios en algoritmo, XP, currículo, IndexedDB v1, backup JSON v3, dependencias ni persistencia.
- Fuente: inspección de `index.html` (blob SHA `4065685c26de3b3d45b749f9bd7d812ab8d4764e`), PR #829 y pruebas; 25 nov 2026.

## 2026-11-25 — PR de corrección: botón de tarjeta de repaso abre la vista SRS

- Tras el despliegue de PR #829, el usuario informó que al tocar «Repasar» no ocurría nada visible.
- Causa identificada en el handler de `App.renderAdaptiveRecommendation`: se llamaba a `SRSEngine.startSession()` desde Aprender, pero el método solo muestra `#srsPracticeArea` dentro de `#view-srs`; no activa por sí mismo esa vista. La sesión podía iniciarse mientras su contenedor seguía oculto.
- Corrección mínima: antes de iniciar la sesión para la acción `review`, llamar a `App.switchView('srs')`. No se altera el motor SRS, la cola, el almacenamiento ni el progreso.
- Se amplía la prueba E2E de Fase 5B para verificar tanto la llamada a `startSession` como la activación real de `#view-srs` tras pulsar el botón.
- Archivos: `index.html`, `tests/learning-screen-phase-5b.e2e.test.cjs` y `MEMORY.md`. Rama: `fix/learn-review-card-navigation-20261125`.
- PR [#830](https://github.com/luisequeira612-commits/bahasa-studio/pull/830) fusionada mediante squash en `main`, commit `a1f8d788ce313f6b1814f883a399390cce447d29`. CI del head `c43325f0cf1151e19d1d06dabb4a287aa12ebc76`, run [#45593786003](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45593786003): `test` y `Offline quality reports` success; sin reviews ni hilos pendientes.
- Pendiente verificar regresión post-merge y despliegue Pages, y después la prueba manual en Tecno Pova 4 (720×1640).
- Fuente: reporte del usuario, diff de PR #830, commit de merge y GitHub Actions #45593786003; 25 nov 2026.

## 2026-11-25 — Tarjeta compacta de repaso en Aprender (en preparación)

- La tarjeta de Aprender queda reservada exclusivamente para repasos SRS vencidos: se oculta por completo cuando el contador real es cero. No se altera la selección, los intervalos ni el inicio de sesión de repaso. La medición Chromium detectó que el ancho global `width:100%` del botón comprimía el texto y estiraba la tarjeta; el botón ahora usa ancho automático y el margen inferior queda en 14 px para dejar el espacio solicitado antes del banner.
- La fila muestra el número real de palabras pendientes y, cuando hay al menos diez intentos válidos, la habilidad de menor precisión y su porcentaje; elimina del panel de Aprender la explicación extensa y el número de intentos duplicado.
- `index.html` concentra el host, el render y sus reglas CSS específicas; `tests/adaptive-learning.test.cjs` cubre el contrato visual; `tests/learning-screen-phase-4.e2e.test.cjs` verifica altura, espacios, fila y desaparición; `tests/learning-screen-phase-5b.e2e.test.cjs` ya no espera una recomendación de lección en esa tarjeta sin repasos y comprueba que «Repasar» inicia la sesión SRS existente. Sin cambios en `adaptive-learning.js`, `styles.css`, IndexedDB v1, backup JSON v3, XP ni dependencias.
- PR [#829](https://github.com/luisequeira612-commits/bahasa-studio/pull/829), rama `fix/compact-learn-review-card-20261125`; Las pruebas E2E anteriores asumían que la tarjeta aparecía sin repasos y que recomendaba continuar una lección; se actualizaron para el nuevo contrato SRS-only. También se ajustaron la posición del banner sin tarjeta y la activación de Aprender antes de medir la fila. La prueba de altura/espacios reveló que el botón heredaba `width:100%` y que el escenario medía tras un scroll de navegación; se corrigieron ambos puntos y se fijó el margen inferior en 14 px, tras medir 8 px en el intento anterior. La E2E de fase 4 ya confirma 76 px de alto, 12 px bajo la barra superior, fila horizontal y separación de 14 px prevista antes del banner. La suite unitaria aún contenía una aserción antigua sobre la ilustración; se cambió para comprobar que el host queda oculto con `[hidden]`. CI de la nueva cabeza pendiente; falta verificar el despliegue; la prueba física en Tecno Pova 4 (720×1640) corresponde al usuario después de Pages.
- Fuente: solicitud explícita del dueño y diff de la rama; 25 nov 2026.

## 2026-11-25 — PR #828 fusionada: estado vacío coherente del recomendador

- PR [#828](https://github.com/luisequeira612-commits/bahasa-studio/pull/828) fusionada mediante squash en `main`, commit `bd01e1266475344329016f8207fa5ef0764f707d`. CI de la cabeza `fb91735cc59dde691e009a86e0faa6ddcc49ad42`, run [#45588782262](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45588782262): `test` y `Offline quality reports` success.
- `styles.css` oculta ilustración y mensaje de estado vacío cuando la tarjeta contiene una acción habilitada; `tests/adaptive-learning.test.cjs` cubre el contrato CSS. No cambia IndexedDB, backup JSON v3, XP, currículo, persistencia ni dependencias.
- Fuente: PR #828, GitHub Actions #45588782262 y commit de fusión; 25 nov 2026.

## 2026-11-25 — PR #819 y #820 fusionadas; recomendador visible en Aprender

- PR [#819](https://github.com/luisequeira612-commits/bahasa-studio/pull/819) se fusionó mediante squash en `main`, commit `40de6fbde1c6c564241db157f5681ffacfb33236`. CI final [#45566397167](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45566397167): `test` y `Offline quality reports` success; sin reviews ni hilos. La regresión post-merge [#45567448995](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45567448995) y Pages [#45567448255](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45567448255) también terminaron en success.
- PR [#820](https://github.com/luisequeira612-commits/bahasa-studio/pull/820) se fusionó mediante squash en `main`, commit `e41f21aa10feddb4dcdf7e35064e18cff7fdb5fa`. Head probado `3095fefd98b18412614880d61763fe16999777dd`; CI [#45569698398](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45569698398): `test` 103/103 y `Offline quality reports` 10/10, ambos success; sin reviews ni hilos.
- El diagnóstico de Fase 7 confirmó que la tarjeta adaptativa solo se montaba en Repasar y Perfil. #820 añade un host en Aprender, conserva Repasar y renderiza ambas vistas desde la misma decisión adaptativa. Se actualiza al iniciar la app y al entrar en Aprender. La tarjeta se inserta debajo del nodo de la unidad actual, con 220 px reservados antes del siguiente nodo para evitar solapamientos; se restablecen clase y posición al reconstruir la ruta. La captura móvil de CI confirma la separación. Pruebas E2E cubren presencia, ubicación, accesibilidad y que el botón inicia la unidad/lección elegidas por el motor adaptativo.
- Verificación posterior completada: la regresión post-merge [#45570108749](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45570108749) terminó con `test` y `Offline quality reports` en success; GitHub Pages [#45570108018](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45570108018) completó `build`, `report-build-status` y `deploy` en success. La publicación de #820 quedó verificada en Pages.
- No se altera la lógica de selección de recomendaciones, XP, currículo, progreso, IndexedDB v1, backup JSON v3, idiomas ni dependencias. La prueba física en Tecno Pova 4 (720×1640) seguirá siendo necesaria después del despliegue.

Fuente: PR #815/#819/#820, `index.html`, `adaptive-learning.js`, pruebas E2E y Actions #45566397167/#45569698398; 25 nov 2026.

## 2026-11-25 — Actualización del app shell tras PR #817

## 2026-11-25 — XP de lección limitado y resumen diario sincronizado

- PR #822 integrada en `main` mediante squash: `50cc4c95b633fdde11d2d32bed09de25b0f653c4`. Cada lección concede 1 XP por acierto de primer intento, máximo 10, solo en la primera finalización; se conservan 2 XP por tarjeta SRS, 20 XP por primera finalización de unidad y 0 XP por evaluación final.
- Auditoría posterior: `App.addXp` persiste el total `userXp`, registra exactamente el mismo importe en `StudyActivity.todayXp` y refresca Perfil + objetivo diario; `updateStudyDashboard` actualiza texto, barra y estado accesible. Se añade una prueba de regresión para evitar divergencias entre XP total y diario.
- Verificación post-merge #45578296681 (regresión + calidad offline) y Pages #45578296958: success. Prueba física en Tecno Pova 4 (720×1640) pendiente.
- Fuente: PR #822, `index.html`, `study-activity.js`, pruebas XP/actividad y Actions; 25 nov 2026.

## 2026-11-25 — Prueba E2E de XP por primera finalización (PR #824 integrada)

- PR #824 integrada en `main` mediante squash: `2f8cb27457f36cdd06566ff89803b677d8317a04`.
- La prueba Chromium con IndexedDB real usa el inicio/finalización de `LessonEngine` y `recordFirstAttempt`; verifica que la primera finalización concede el XP correspondiente, repetir la lección no concede XP adicional y abandonar otra lección no concede XP pendiente.
- CI de la cabeza final de la PR, `6c57ca81b8b3e1cb05c9110c1ccbfca545d60d59`, run [#45581329768](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45581329768): `test` y `Offline quality reports` success. Sin reviews ni comentarios pendientes.
- Verificación post-merge de regresión y Pages pendiente en el momento de esta actualización. La prueba física en Tecno Pova 4 (720×1640) sigue pendiente.
- Fuente: PR #824, `tests/browser-e2e.test.cjs`, `tests/xp-rewards.test.cjs` y GitHub Actions; 25 nov 2026.

## 2026-11-25 — Reubicación de recomendador en Aprender (PR #826)

- PR [#825](https://github.com/luisequeira612-commits/bahasa-studio/pull/825) se fusionó mediante squash en `main`, commit `f02e4e72da0e1fc3ce877031fcd7597e1abaf5bd`. CI de la PR [#45582831818](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45582831818), regresión post-merge [#45582738104](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45582738104) y Pages [#45582737812](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45582737812): success.
- PR [#826](https://github.com/luisequeira612-commits/bahasa-studio/pull/826) mueve la tarjeta de recomendación adaptativa fuera de la ruta de unidades y la coloca encima de `courseContainer`, como sección independiente. Conserva prioridad, selección, actualización, botón y comportamiento de Repasar; elimina el hueco artificial de 220 px dentro de la unidad actual.
- Pruebas actualizadas: recomendador visible antes de la lista, fuera de `.unit-path-stage`, sin solapamientos ni reserva de espacio en la geometría del camino. No cambia XP, currículo, progreso, IndexedDB, backup JSON v3 ni dependencias.
- PR #826 fusionada por squash en `main`, commit `639dc11e3c176ffeb9b9e4411dcbb8ada075aa49`. CI de PR [#45585825025](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45585825025): `test` y `Offline quality reports` success; sin reviews ni hilos pendientes. Regresión post-merge [#45586327839](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45586327839) y Pages [#45586326796](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45586326796): success.
- La prueba física en Tecno Pova 4 (720×1640) seguirá pendiente después del despliegue.
- Fuente: PR #825/#826, `index.html`, `tests/adaptive-learning.test.cjs`, pruebas E2E de fases 4 y 5B y GitHub Actions; 25 nov 2026.


## 2026-11-25 — PR #832: estabilización de prueba de teclado
- CI `45651470629`: la prueba E2E de la burbuja de traducción falló al esperar que se abriera con Enter; las otras 300 pruebas pasaron y el informe offline de calidad pasó.
- El fixture de teclado ahora inserta el botón de prueba directamente en `document.body`, con posición visible/fija e ID propio, y enfoca ese botón antes de enviar Enter. Esto evita depender de `#actionArea`, que puede no estar disponible o visible en el fixture.
- No se modificó la lógica de producción de traducción; pendiente volver a ejecutar CI y comprobar apertura con Enter, cierre con Escape y restauración del foco.


## 2026-11-25 — PR #832: activación por teclado de la burbuja de traducción
- El CI #45654312381 volvió a fallar en la prueba 112: el fixture visible y enfocado seguía sin abrir la burbuja con Enter. La prueba 113 de restauración del foco sí pasó.
- Diagnóstico en `index.html`: `initTapTranslationBubble()` solo escuchaba clics delegados para abrir la burbuja y Escape para cerrarla; no manejaba explícitamente Enter ni Espacio.
- Corrección en commit `f00571dd5f3f68c4bd949178d735d2e4d6143dd4`: el manejador de teclado detecta `.tap-translation-word`, abre con Enter/Espacio y previene la activación duplicada del botón. Se mantiene Escape con restauración de foco.
- CI nuevo #45655191461 disparado para el commit corregido; pendiente confirmar la prueba 112 y el resto de checks. No fusionar hasta CI verde.
- Fuente: inspección de `index.html`, prueba E2E fase 5B y GitHub Actions; 25 nov 2026.


## 2026-11-25 — PR #832: diagnóstico detallado de activación por teclado
- CI #45655191461 y #45655305950: la prueba 112 ya no expira; llega a la aserción y falla porque `aria-expanded` permanece en `false` aunque el host de la burbuja informa `hidden === false`. La prueba 113 continúa pasando.
- La prueba E2E se instrumentó en commit `97584242add299fd1813fae2b15dbe874aee6d87` para registrar foco activo, estado hidden, aria-expanded y botones con aria-expanded true; también comprueba que el fixture conserva el foco justo antes de pulsar Enter.
- Próximo paso: usar el estado instrumentado del CI para identificar si Enter llega al botón, si la burbuja ya estaba visible por otro flujo o si el estado accesible se desincroniza. No cambiar más producción ni relajar la prueba sin esa evidencia.
- PR #832 sigue abierta, no fusionada; CI verde requerido.
- Fuente: logs de GitHub Actions #45655191461 y #45655305950 y prueba E2E fase 5B; 25 nov 2026.


## 2026-11-25 — Actualización de hash CSS en PR #832

- La ejecución CI #45655878732 pasó las E2E de Fase 4 y el informe de calidad offline, pero se detuvo en la prueba de integridad de extracción: el hash de `styles.css` cambió de `740de7f9` a `7800ca18` por la regla intencional `[data-adaptive-recommendation][hidden] { display: none !important; }` añadida para que los hosts ocultos no reserven espacio.
- No es un cambio del currículo ni de IndexedDB; la prueba mantiene los hashes y conteos de A1/A2 y solo debe fijar el hash nuevo del CSS extraído. Se actualizó la expectativa en `tests/curriculum-extraction.test.js`, commit [5b503df](https://github.com/luisequeira612-commits/bahasa-studio/commit/5b503dff75d13eb611957bf7faeb718d1725b834).
- La ejecución anterior no llegó a las pruebas posteriores de Fase 5B porque el fallo de integridad detuvo el job; el diagnóstico instrumentado de Enter sigue pendiente de una ejecución que alcance esa prueba. PR #832 sigue abierta y no fusionada.
- Fuente: GitHub Actions #45655878732, comparación del hash de `styles.css` y diff de la prueba; 25 nov 2026.


## 2026-11-25 — Sincronización del fixture de teclado en PR #832

- CI [#45656428865](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45656428865): las 301 pruebas locales llegaron a ejecutarse; 300 pasaron y falló solo la prueba 112 de teclado por timeout esperando que la burbuja se abriera. La extracción curricular/CSS ya pasó y los informes de calidad offline también terminaron en success.
- La causa está en el orden del fixture: esperaba a que DB estuviera lista, pero eso no garantizaba que el listener de `initTapTranslationBubble()` ya se hubiera registrado. El botón sintético podía recibir Enter antes de que existiera el manejador delegado. La prueba de restauración de foco 113 pasó.
- Se añadió una espera explícita por `#tapTranslationBubble.dataset.initialized === 'true'` antes de insertar/enfocar el botón y pulsar Enter. Commit [3cca880](https://github.com/luisequeira612-commits/bahasa-studio/commit/3cca880878f9e4aac6ac17a9631ceeaff72ac5ff). No se cambió código de producción ni se relajó ninguna aserción.
- Pendiente: ejecutar CI sobre el nuevo head y comprobar si la prueba de teclado pasa; PR #832 continúa abierta y no fusionada.
- Fuente: log del job test de GitHub Actions #45656428865, líneas de test 112/113 y fixture fase 5B; 25 nov 2026.


## 2026-11-25 — PR #832: evita doble activación de la burbuja con Enter
- CI #45657511237: Fase 4, calidad offline y 300 pruebas adicionales pasaron; solo falló la E2E de teclado de la burbuja (11/12 pruebas Fase 5B).
- Diagnóstico: al pulsar Enter en un botón nativo, el manejador keydown abre la burbuja y el navegador emite después un click de teclado (detail=0). El manejador click volvía a llamar open() sobre el mismo botón, cuyo comportamiento de alternancia la cerraba inmediatamente; por eso la E2E agotaba el tiempo esperando hidden=false.
- Corrección en commit 6122b00b5a0b7daeb839d735c3c4875f3f441372: el click de teclado generado tras una apertura por keydown ya no alterna/cierra la burbuja; el click de puntero mantiene el comportamiento de alternancia. Pendiente CI completo, Escape y restauración de foco.
- Fuente: log de GitHub Actions #45657511237 y función initTapTranslationBubble() en index.html; 25 nov 2026.

## 2026-11-25 — PR #832: instrumentación de la activación por teclado
- CI [#45658823373](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45658823373): Fase 4 pasó y el informe offline pasó; las pruebas locales terminaron con 300/301. La única falla volvió a ser la E2E 112 de la burbuja: timeout esperando que `#tapTranslationBubble.hidden` cambiara a false. Fase 5B posterior quedó omitida por el fallo.
- El cambio de doble activación de Enter del commit `6122b00` no resolvió todavía el timeout; por eso no se fusiona. La prueba 113 de restauración de foco pasó.
- En commit `c53eb16` se reemplazó la espera opaca de 30 s por instrumentación temporal que registra keydown/click capturados, foco, estado aria/hidden y errores JS; el objetivo es distinguir si Playwright emite Enter, si el listener recibe el evento o si el handler falla. No se cambió la lógica de producción.
- Pendiente CI nuevo para leer el diagnóstico antes de tocar producción. PR #832 sigue abierta y no fusionada.
- Fuente: log del job test #139362754918 (run #45658823373), prueba `tests/learning-screen-phase-5b.e2e.test.cjs` y commit `c53eb1669573f85aa83826ee302dce573b139257`; 25 nov 2026.

## 2026-11-25 — PR #832: corrige prioridad SRS y teclado de burbuja
- CI #45661003146 pasó Fase 4 y calidad offline, pero falló en dos pruebas de Fase 5B (112 y 117); Fase 5B y pruebas finales se omitieron.
- Diagnóstico 112: el evento Enter sí alcanza el documento (foco correcto, listener inicializado y sin errores JS), pero el handler delegado de teclado en fase bubble no abre la burbuja. Se cambia el listener a fase capture para que la activación accesible no dependa de que otro listener detenga propagación. La prueba conserva sus aserciones de apertura, aria-expanded y Escape.
- Diagnóstico 117: la tarjeta SRS se ocultaba si el recomendador general elegía una acción distinta de review aunque existieran palabras vencidas; además el botón heredaba esa acción. La tarjeta SRS ahora depende de que haya vencimientos y fuerza la acción review, manteniendo la recomendación adaptativa independiente oculta mientras el SRS sea prioritario.
- Cambios limitados a `index.html`; no se modifican algoritmo adaptativo, XP, currículo, IndexedDB v1, backup JSON v3 ni dependencias. Pendiente CI completo y verificación manual; PR #832 permanece abierta.
- Fuente: logs del job test de GitHub Actions #45661003146 (fallos 112/117), código `initTapTranslationBubble()` y `renderAdaptiveRecommendation()`; 25 nov 2026.


## 2026-11-25 — PR #832: sincroniza prueba de prioridad SRS
- CI [#45662198111](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45662198111): Fase 4 y pruebas locales de calidad pasaron; falló el test 46 de `tests/adaptive-learning.test.cjs` porque aún exigía la condición antigua `reviewCount === 0 || recommendation.action !== 'review'`.
- La implementación nueva muestra la tarjeta SRS siempre que `reviewCount > 0`, independiente de la recomendación general, y fuerza la acción `review` para esa tarjeta. Se actualizó el test para comprobar explícitamente ambas condiciones y que el botón inicia `srs`; no se eliminó ninguna comprobación funcional.
- Commit de prueba: [737b0e0](https://github.com/luisequeira612-commits/bahasa-studio/commit/737b0e0da415b66eb8903cf5e6271a8f3ebb7529). Pendiente nuevo CI, especialmente las pruebas 112/117 de Fase 5B. PR #832 sigue abierta y no fusionada.
- Fuente: log del job test de GitHub Actions #45662198111 y comparación de la aserción con `renderAdaptiveRecommendation()`; 25 nov 2026.


## 2026-11-25 — PR #832: adelanta la captura del teclado de la burbuja
- CI #45663123141 volvió a fallar únicamente en la prueba 112: el evento Enter se registra en el documento, el botón conserva el foco, la burbuja sigue oculta y no hay errores JavaScript. La corrección previa que puso el listener de `keydown` en captura de `document` no bastó.
- Inspección del código completo de `initTapTranslationBubble()`: el listener delegado seguía en `document` capture. Se mueve a `window` capture para ejecutarlo antes de los listeners de captura del documento que podrían detener la propagación. Se conservan apertura, `aria-expanded`, Escape y restauración de foco; no se relajan aserciones.
- Commit: [9ca95d2](https://github.com/luisequeira612-commits/bahasa-studio/commit/9ca95d20e608927c3166214910356573c7e42200). Pendiente CI nuevo, especialmente pruebas 112 y 117, Fase 5B y E2E final. PR #832 continúa abierta y sin fusionar.
- Fuente: logs del job test #139377986951 (run #45663123141), código de `index.html` y commit 9ca95d2; 25 nov 2026.
