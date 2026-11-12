# Fase 6 — Verificación post-merge y entrega

Fecha: 12 nov 2026

## Estado comprobado

- `main` incorpora PR #513 (objetivos táctiles de 44×44 px en Repasar, Tutor y Diccionario), #514 (registro documental), #524 (estado accesible de la burbuja de traducción), #526 (restauración del foco desde la burbuja y el popup de significado), #527 (anuncios accesibles en Tutor y nombres accesibles de campos), #528 (sincronización documental) y #529 (B2 U5).
- El último `main` verificado es `0c5899c9bdf8b7d518f721e4a8ba2b1ffb25538b` (PR #529).
- PR #527 se fusionó por squash como `37e3fafdbbf1db94b865769a268bd092a2f8ed41`. Su regresión post-merge [#43172512303](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43172512303) terminó en éxito: test 74/74 y Offline quality reports 10/10.
- Pages build/deployment [#43172511556](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43172511556) terminó en éxito sobre el SHA anterior.
- PR #529 implementó B2 U5: cinco lecciones, 16 ejercicios, dos entradas nuevas (`menawari`, `menawarkan`) y reutilización de IDs canónicos existentes. CI del head [#43174736146](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43174736146): test 74/74 y calidad 10/10. Regresión post-merge [#43175001181](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43175001181): test 74/74 y calidad 10/10. Pages [#43175000192](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43175000192): build/deployment correcto. Merge commit: `0c5899c9bdf8b7d518f721e4a8ba2b1ffb25538b`.
- No se modificaron IndexedDB, backup JSON v3 ni dependencias.

## Pendientes reales

1. Hacer una comprobación manual específica en el Tecno Pova 4 de los controles táctiles y la restauración de foco. La suite de navegador no sustituye esta prueba física.
2. Continuar con mejoras de producto que no requieran aprobación lingüística ni cambios de IndexedDB/backup v3.
3. Preparar U6 (`memper-`) con fuentes, ejemplos, glosas, ejercicios y vocabulario candidatos; el eje U4–U6 no sustituye la aprobación explícita del contenido de U6. U13–U60 todavía carecen de mapa aprobado.

## Criterio de cierre

La evidencia de CI post-merge y Pages está disponible para el SHA exacto de `main`. La comprobación física específica en Android sigue separada como pendiente de dispositivo y no bloquea el trabajo técnico posterior. U5 está completada y verificada. U6 aún requiere diseño y aprobación explícita del contenido; U13–U60 requieren un mapa curricular antes de producirse. La preparación técnica de CI no equivale a validación lingüística ni a aprobación de contenido.
