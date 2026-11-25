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
