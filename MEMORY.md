## 2026-11-25 — PR #819 y #820 fusionadas; recomendador visible en Aprender

- PR [#819](https://github.com/luisequeira612-commits/bahasa-studio/pull/819) se fusionó mediante squash en `main`, commit `40de6fbde1c6c564241db157f5681ffacfb33236`. CI final [#45566397167](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45566397167): `test` y `Offline quality reports` success; sin reviews ni hilos. La regresión post-merge [#45567448995](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45567448995) y Pages [#45567448255](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45567448255) también terminaron en success.
- PR [#820](https://github.com/luisequeira612-commits/bahasa-studio/pull/820) se fusionó mediante squash en `main`, commit `e41f21aa10feddb4dcdf7e35064e18cff7fdb5fa`. Head probado `3095fefd98b18412614880d61763fe16999777dd`; CI [#45569698398](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45569698398): `test` 103/103 y `Offline quality reports` 10/10, ambos success; sin reviews ni hilos.
- El diagnóstico de Fase 7 confirmó que la tarjeta adaptativa solo se montaba en Repasar y Perfil. #820 añade un host en Aprender, conserva Repasar y renderiza ambas vistas desde la misma decisión adaptativa. Se actualiza al iniciar la app y al entrar en Aprender. La tarjeta se inserta debajo del nodo de la unidad actual, con 220 px reservados antes del siguiente nodo para evitar solapamientos; se restablecen clase y posición al reconstruir la ruta. La captura móvil de CI confirma la separación. Pruebas E2E cubren presencia, ubicación, accesibilidad y que el botón inicia la unidad/lección elegidas por el motor adaptativo.
- Verificación posterior completada: la regresión post-merge [#45570108749](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45570108749) terminó con `test` y `Offline quality reports` en success; GitHub Pages [#45570108018](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45570108018) completó `build`, `report-build-status` y `deploy` en success. La publicación de #820 quedó verificada en Pages.
- No se altera la lógica de selección de recomendaciones, XP, currículo, progreso, IndexedDB v1, backup JSON v3, idiomas ni dependencias. La prueba física en Tecno Pova 4 (720×1640) seguirá siendo necesaria después del despliegue.

Fuente: PR #815/#819/#820, `index.html`, `adaptive-learning.js`, pruebas E2E y Actions #45566397167/#45569698398; 25 nov 2026.

## 2026-11-25 — Actualización del app shell tras PR #817

## 2026-11-25 — Recompensa XP de lección limitada y no repetible (PR en preparación)

- Auditoría de 365 lecciones explícitas A1/A2: 1,318 ejercicios A1 y 1,080 A2. Con la regla anterior de 3 XP por acierto, una lección podía otorgar 66 XP en A1 y 36 XP en A2, antes del bono de unidad.
- Decisión de implementación: la lección concede 1 XP por respuesta correcta en el primer intento, con tope de 10 XP, pero solo al completar la lección por primera vez. La recompensa se calcula usando `sessionCorrect`, que incrementa una sola vez por ejercicio gracias a `_firstAttempted`; los reintentos no suman.
- El marcador existente `completedLessons` evita volver a conceder XP al repetir una lección. Si se abandona antes de terminar, no se entrega la recompensa de esa sesión.
- Se conservan 2 XP por tarjeta SRS, 20 XP por primera finalización de unidad y 0 XP por respuesta de evaluación final.
- No se cambia el esquema IndexedDB, el backup JSON v3, las dependencias ni el currículo. El XP de lección se persiste mediante la función existente `App.addXp` solo después de guardar el marcador de primera finalización.
- Fuente: auditoría del inventario de lecciones y flujo `LessonEngine.startUnit` / `recordFirstAttempt` / `finishUnit`; decisión técnica aplicada en la rama `fix/lesson-xp-first-completion-cap`; 25 nov 2026. Pendiente de CI y revisión funcional.

