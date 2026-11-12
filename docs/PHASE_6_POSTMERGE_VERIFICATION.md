# Fase 6 — Verificación post-merge y entrega

Fecha: 12 nov 2026

## Estado comprobado

- `main` incorpora PR #513 (objetivos táctiles de 44×44 px en Repasar, Tutor y Diccionario), #514 (registro documental), #524 (estado accesible de la burbuja de traducción), #526 (restauración del foco desde la burbuja y el popup de significado) y #527 (anuncios accesibles en el chat del Tutor y nombres accesibles explícitos para los campos de Tutor, clave opcional y Diccionario).
- El último `main` verificado es `37e3fafdbbf1db94b865769a268bd092a2f8ed41`.
- PR #527 se fusionó por squash como `37e3fafdbbf1db94b865769a268bd092a2f8ed41`. Su regresión post-merge [#43172512303](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43172512303) terminó en éxito: test 74/74 y Offline quality reports 10/10.
- Pages build/deployment [#43172511556](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43172511556) terminó en éxito sobre el mismo SHA.
- No se modificaron unidades, vocabulario curricular, IndexedDB, backup JSON v3 ni dependencias.

## Pendientes reales

1. Hacer una comprobación manual específica en el Tecno Pova 4 de los controles táctiles y la restauración de foco. La suite de navegador no sustituye esta prueba física.
2. Continuar con mejoras de producto que no requieran aprobación lingüística ni cambios de IndexedDB/backup v3.
3. Mantener B2 U5 bloqueada hasta que ejemplos, glosas, consignas, respuestas y vocabulario nuevo reciban la aprobación correspondiente. El mapa de U13–U60 tampoco está aprobado.

## Criterio de cierre

La evidencia de CI post-merge y Pages está disponible para el SHA exacto de `main`. La comprobación física específica en Android sigue separada como pendiente de dispositivo y no bloquea el trabajo técnico posterior. La creación de contenido nuevo para B2 depende de la aprobación explícita del dueño para U5; la preparación técnica de CI y documentación no equivale a aprobación lingüística.
