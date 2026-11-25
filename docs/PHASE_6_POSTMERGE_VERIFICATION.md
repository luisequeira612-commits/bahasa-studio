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


## Actualización de estado — 24 nov 2026

Esta actualización sustituye los datos de estado y los pendientes curriculares fechados el 12 nov 2026 cuando contradigan los documentos y merges posteriores. El historial anterior se conserva como registro de lo que se sabía en esa fecha.

- `main` está en `db1690173b7ebfbfd49247044c280baf219c7525`, tras PR #792. La PR #792 está fusionada; su regresión post-merge #45512800901 terminó en success (test 101/101 y Offline quality reports 10/10). GitHub Pages #45512797930 completó build, report-build-status y deploy en success.
- La fase 5 de integración multilingüe tiene integrados los adaptadores comunes en tarjetas de vocabulario, ejercicios, ayudas de traducción por toque, matching y SRS; se añadieron contratos y pruebas de aislamiento por idioma. Esto no habilita pt-BR: `available:false` se conserva.
- El mapa B2 indonesio vigente está en `docs/B2_U20_U60_ROADMAP.md`: B2 U1–U60 existen en `main` (60/60, 300 lecciones authored), pero solo U1–U5 están visibles; U6–U60 permanecen ocultas/no publicadas. Por tanto, el pendiente antiguo de diseñar U13–U60 ya no describe el estado del repositorio. No publicar unidades ocultas ni inferir aprobación de contenido a partir de CI.
- La comprobación manual en el Tecno Pova 4 de controles táctiles y restauración de foco sigue pendiente. Las pruebas de navegador no sustituyen esa verificación física; no se afirma que se haya realizado.
- PR #791 añade la integridad del precache y comprueba que las 64 rutas declaradas existan dentro del repositorio. PR #792 registra el resultado final; no cambia producción, currículos, almacenamiento, dependencias ni disponibilidad de idiomas.

## Criterio operativo vigente

Continuar con mejoras técnicas de bajo riesgo, preferentemente con pruebas automatizadas y sin modificar IndexedDB v1, backup JSON v3 ni dependencias. Mantener separadas las verificaciones estructurales de la validación lingüística. No activar pt-BR ni publicar unidades B2 ocultas sin la aprobación curricular correspondiente. Registrar cualquier prueba física como pendiente hasta contar con evidencia del dispositivo.


## Actualización de estado — 24 nov 2026, tras PR #797

Esta entrada sustituye el SHA y el estado de validación anteriores; conserva los pendientes de dispositivo.

- `main` está en `cbae2cb6880c7e07488b614ff050740bf520decc`, tras fusionar PR #797 (controles de traducción en viewport de 320 px).
- PR #794–#797 ampliaron la cobertura de accesibilidad y adaptación móvil: restauración de foco al cerrar paneles, navegación por teclado, disposición compacta de 320 px, panel de herramientas y objetivos táctiles de traducción.
- Regresión post-merge #45518553869: job `test` y `Offline quality reports` completados en success. El workflow de regresión incluye las pruebas Chromium reales de la suite fase 5B. Calidad offline 10/10.
- GitHub Pages #45518553195 completó build y deploy en success sobre el mismo SHA.
- La suite automatizada de fase 6 queda cubierta para los casos incorporados. La verificación manual en el Tecno Pova 4 (720×1640), especialmente interacción táctil y comportamiento de foco en el dispositivo real, sigue pendiente; no se considera sustituida por Chromium.
- Sin cambios en currículos, IndexedDB v1, backup JSON v3, dependencias ni disponibilidad de idiomas. pt-BR sigue `available:false`; B2 U6–U60 siguen ocultas/no publicadas.

Fuente: PR #794–#797, GitHub Actions #45518553869 y #45518553195; 24 nov 2026.
