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
- CI de PR #826 pendiente. La prueba física en Tecno Pova 4 (720×1640) seguirá pendiente después del despliegue.
- Fuente: PR #825/#826, `index.html`, `tests/adaptive-learning.test.cjs`, pruebas E2E de fases 4 y 5B y GitHub Actions; 25 nov 2026.
