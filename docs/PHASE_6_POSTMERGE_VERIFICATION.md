# Fase 6 — Verificación post-merge y entrega

Fecha: 12 nov 2026

## Estado comprobado

- `main` incorpora PR #513 (objetivos táctiles de 44×44 px en Repasar, Tutor y Diccionario), #514 (registro documental), #524 (estado accesible de la burbuja de traducción) y #526 (restauración del foco desde la burbuja y el popup de significado).
- El último `main` verificado es `2a1dd2710c06b091d4bbbd75f060a0d449772132`.
- PR #526 se fusionó por squash. Su CI en el head exacto `e65bdb1b46113c90e905eb5d55c74c5d435eb2e6` terminó correctamente: Regression 74/74 y Offline quality reports 10/10.
- Regression tests post-merge [#43170695554](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43170695554) finalizó en éxito sobre el SHA exacto de `main`: test 74/74 y Offline quality reports 10/10.
- Pages build/deployment [#43170694406](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43170694406) finalizó en éxito sobre el mismo SHA: build 7/7, deploy 3/3 y report-build-status 3/3.
- PR #527 está abierta para mejorar la accesibilidad del Tutor y Diccionario; su CI se ejecuta en la rama de trabajo.

## Pendientes reales

1. Hacer una comprobación manual específica en el Tecno Pova 4 de los controles táctiles y la restauración de foco.
2. Continuar con mejoras de producto que no requieran aprobación lingüística ni cambios de IndexedDB/backup v3.
3. Mantener B2 U5 bloqueada hasta que ejemplos, glosas, consignas, respuestas y vocabulario nuevo reciban la aprobación correspondiente.

## Criterio de cierre

La evidencia de CI post-merge y Pages está disponible para el SHA exacto de `main`. La comprobación física específica en Android sigue separada como pendiente de dispositivo y no bloquea el trabajo técnico posterior.
