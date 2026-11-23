## 2026-11-23 — PR en preparación: preservar audio ante hashes SHA-256 malformados
- Auditoría posterior a PR #728 detectó que el Service Worker distinguía hash ausente de hash presente sin validar formato. Un hash malformado podía provocar que se eliminara una copia cacheada actual o que se limpiara una caché legacy sin haber podido verificar el audio; en reproducción online también podía rechazarse un MP3 válido solo por metadata malformada.
- La corrección trata hashes ausentes o malformados como evidencia no disponible: no sirve bytes cacheados sin verificar, no los elimina solo por falta de evidencia, no migra ni borra la única copia legacy y permite reproducción online sin persistencia offline. Un hash SHA-256 válido que no coincide sigue invalidando el contenido.
- Añade regresiones para migración legacy con hash malformado, preservación de caché actual y reproducción online. Pendiente de CI y revisión. No cambia inventarios productivos, audios, IndexedDB v1, backup JSON v3 ni dependencias.

## 2026-11-23 — PR #728: corregir fixture de caché Range pt-BR
- El CI #45124084489 volvió a fallar únicamente en `tests/service-worker-audio-range.test.cjs`: la respuesta Range 206 era correcta, pero la prueba buscaba el clip cacheado bajo `sample.mp3`, mientras que la solicitud real usaba el ID hexadecimal `0123456789ab`. Además, ese nombre ficticio no podía producir un ID verificable para SHA-256.
- Se corrigió el fixture para consultar exactamente la misma URL de audio regional que se solicitó, conservando el ID hexadecimal y el inventario SHA-256 correspondiente. No se relajó la verificación ni la política de caché.
- Pendiente de CI completo. No modifica audios ni inventarios productivos, IndexedDB v1, backup JSON v3 ni dependencias.

## Guardi — verificación SHA-256 en la caché automática del Service Worker — 23 nov 2026

- PR en preparación: la ruta de reproducción normal del Service Worker guardaba cualquier respuesta HTTP 200 sin comprobar el inventario, aunque la descarga offline explícita sí verificaba SHA-256. El cambio valida los bytes de caché y de red contra el hash del idioma antes de servir una copia persistente; si falta inventario/hash, permite reproducción online pero no promueve el archivo a caché offline; si el hash disponible no coincide, rechaza la respuesta. Incluye pruebas para hash válido, inventario ausente y contenido alterado.
- Archivos previstos: `service-worker.js`, `tests/service-worker-audio-cache.test.cjs`, `tests/service-worker-audio-range.test.cjs`, `tests/service-worker-install.test.cjs`, `MEMORY.md`. El CI #45123667344 pasó los informes de calidad, pero falló la prueba de rangos en la ruta `pt-BR`: la respuesta 206 se generaba, aunque el clip completo no quedaba guardado en la caché de ese idioma. La prueba usa un ID hexadecimal válido y hashes coherentes. Se endurece la resolución del código de idioma para normalizarlo contra el catálogo cerrado antes de elegir la metadata y el espacio de caché; esto evita diferencias de mayúsculas/minúsculas en códigos regionales. La corrección anterior del ID ficticio `sameclip00001` también queda aplicada. El primer CI detectó además una expectativa antigua de cachear MP3 sin inventario; se actualizó para reflejar la política nueva (reproducción online permitida, sin persistencia no verificada). Pendiente de CI completo y revisión. No modifica audios/manifiestos, IndexedDB v1, backup JSON v3 ni dependencias.

Fuente: auditoría de `main` posterior a PR #727; 23 nov 2026.

## Guardi — cadena de correcciones de integridad de audio offline — 23 nov 2026

- PR [#726](https://github.com/luisequeira612-commits/bahasa-studio/pull/726) fusionada en `main`, squash commit `0471c2264f1d4af3bcd19962d9227c245c7d0984`. CI del head `406da3a7887e2c2002bbc5b07978917f37050157`, run [#45119720724](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45119720724): `test` y `Offline quality reports` completados con éxito, incluidos E2E en navegador real. Sin reviews ni hilos pendientes. La migración conserva la caché legacy cuando la caché actual contiene bytes no verificables por falta del inventario del idioma; una activación posterior puede recuperar y verificar el original antes de limpiar la fuente.
- PR [#725](https://github.com/luisequeira612-commits/bahasa-studio/pull/725) fusionada en `main`, squash commit `f500277d8074256ce16e1b803aca0e4d4fc4783e`. CI run [#45115542815](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45115542815) completó `test` y `Offline quality reports` con éxito. `offline-audio-manager.js` solo cuenta como offline los MP3 cacheados cuyo estado, tamaño y SHA-256 son válidos; elimina entradas corruptas o no verificables.
- PR [#724](https://github.com/luisequeira612-commits/bahasa-studio/pull/724) fusionada en `main`, squash commit `1b0506a1cf44070f278c32e3858c249e85e924b4`. CI run [#45114534642](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45114534642) completó ambos jobs con éxito. La migración conserva respuestas 200 actuales sin hash individual y la caché legacy hasta poder verificar los bytes.
- PR [#723](https://github.com/luisequeira612-commits/bahasa-studio/pull/723) fusionada en `main`, squash commit `a2bf144e5f2b6e86c88f7eff43971c918b76eb2f`. CI run [#45112533279](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45112533279) completó ambos jobs con éxito. Si falta el hash de un clip legacy, la migración conserva la fuente y marca el proceso incompleto.
- PR [#722](https://github.com/luisequeira612-commits/bahasa-studio/pull/722) fusionada en `main`, squash commit `641ac7dea9cf8c7db9285a16de24f3f88223e8b4`. CI run [#45111985902](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45111985902) completó ambos jobs con éxito. Si falta el inventario SHA-256 del idioma, no se migra audio sin verificar y se conserva la caché legacy.
- Alcance común preservado: sin cambios a IndexedDB v1, backup JSON v3, inventarios/manifiestos productivos, archivos de audio ni dependencias. Estas correcciones no activan idiomas adicionales.

Fuente: PR #722–#726, commits squash y ejecuciones CI enlazadas; 23 nov 2026.

## Guardi — validación del inventario offline de audio — 23 nov 2026
- Auditoría de main: `audio/manifest.json` y `audio/metadata.json` contienen 2.268 entradas/huellas, sin IDs duplicados, hashes faltantes ni huellas huérfanas; niveles A1 683, A2 1.014, B1 541 y B2 155.
- PR #721 endurece la validación de manifiesto/huellas al cargar el inventario, normaliza IDs/hash hexadecimales, rechaza duplicados, niveles desconocidos, textos vacíos y SHA-256 inválidos; el resumen de biblioteca incluye B2. También elimina de AGENTS.md una hoja de ruta antigua que contradecía la decisión vigente: idiomas nuevos pendientes de selección. No añade recursos ni activa cursos; IndexedDB v1, backup JSON v3 y dependencias intactos.

## Guardi — estado de integración multiidioma — 23 nov 2026
- PR #719 fusionada en `main` (commit `332d8b56fac8b24897ca8d542acc534174eb08a8`); CI run [45110624164](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45110624164) completó con éxito ambos jobs. Cachés/rutas de audio e inventarios preparados por código de idioma; no se añadieron recursos ni cursos de otros idiomas. IndexedDB v1, backup JSON v3 y dependencias intactos.
- Corrección de decisión: el usuario aprobó la infraestructura multiidioma, pero aún está pensando qué idiomas añadir. Los códigos de LanguageManager son placeholders técnicos, no una lista ni un orden curricular aprobado. No crear contenido ni seleccionar idiomas hasta confirmación explícita; solo Indonesian está disponible.

## CI de PR #718 — corrección E2E de fallback de voz — 23 nov 2026

- El tercer CI (run 45102762995) completó todos los tests hasta el E2E, pero falló únicamente en dos aserciones de `tests/browser-e2e.test.cjs` que esperaban el texto antiguo «Voz del dispositivo disponible como respaldo: …». El producto ahora muestra explícitamente «… como respaldo para indonesio: …», coherente con el runtime por idioma.
- Se actualizaron solo esas dos expectativas (`Mock Indonesian B` y `Late Indonesian`). Regresión, audio engine, lifecycle, privacidad, LanguageManager, CurriculumLoader y Offline quality reports pasaron; el fallo está aislado al texto esperado por E2E. No cambia IndexedDB v1, backup JSON v3, audio, Service Worker, manifiestos ni dependencias.
- Commit correctivo: `b1307ff5ccd888e548b47e36248e18ce543574ac`. Repetir CI completo antes de fusionar PR #718.

## Ajuste de límite de privacidad de reconocimiento — 23 nov 2026

- El segundo CI de PR #718 pasó regresión (85/85), audio engine y lifecycle tests, pero falló `tests/speech-recognition-privacy-boundary.test.cjs` porque exigía literalmente `recognition.lang = 'id-ID'`. Se actualizó la prueba para exigir locale dinámico proveniente de `LanguageManager` y fallback `id-ID`, manteniendo los controles de activación explícita, captura única y ausencia de transporte/almacenamiento de audio propio.
- La evaluación y dictado de conversación que siguen siendo indonesio-específicos no se cambiaron; el alcance de esta fase es solo `PronunciationEngine` general.
## Ajustes de regresión de fase 1 de audio multiidioma — 23 nov 2026

- El primer CI de PR #718 detectó cuatro expectativas obsoletas en `tests/regression.test.cjs`: búsqueda de voz fija `id`, ruta literal `./audio/id/` y dos aserciones de `recognition.lang = 'id-ID'`. El comportamiento nuevo es intencionalmente dinámico y conserva `id-ID` solo como fallback de compatibilidad.
- Se actualizaron las expectativas para validar el filtro de metadatos seguro, la ruta dinámica configurada (y el fallback legacy `./audio/id/`) y `recognition.lang = locale`. No se cambia la evaluación standalone, que sigue siendo específicamente indonesia.

## 2026-11-23 — PR #718 CI: reparación de regresión estructural en E2E
- Run 45106615524: **Offline quality reports SUCCESS**; el job `test` llegó hasta E2E con todos los pasos 1–95 anteriores en verde.
- E2E falló antes de ejecutar los casos porque `tests/browser-e2e.test.cjs` en el head de la PR estaba truncado desde el inicio y arrancaba con un fragmento de una prueba; Node reportó `SyntaxError: Unexpected token ']'` en la línea 3.
- Causa: la actualización anterior del archivo conservó solo el fragmento final con las dos correcciones de expectativas, perdiendo el resto del fichero. No es un fallo de producto/audio.
- Corrección: restaurar `tests/browser-e2e.test.cjs` íntegramente desde `main` y reaplicar únicamente las dos expectativas E2E de PR #718: los mensajes ahora incluyen `para indonesio`.
- No se modifica IndexedDB v1, backup JSON v3, audio, Service Worker, manifiestos ni dependencias.
- Debe ejecutarse un CI completo nuevo sobre el head corregido antes de fusionar PR #718.


## 2026-11-23 — PR #718 E2E: ajuste de velocidad predeterminada

- El nuevo CI `45108384175` pasó todos los pasos 1–95 y falló únicamente en el E2E `audio engine plays bundled Indonesian MP3 before using browser voice API`: el test esperaba velocidad `0.85`, mientras `AudioEngine` declara y aplica `1` como velocidad natural predeterminada.
- Se actualizó solo la expectativa E2E de `0.85` a `1`. Los tests unitarios ya verificaban que la velocidad predeterminada es `1`; no se cambió el comportamiento del producto.
- No se modifica IndexedDB v1, backup JSON v3, Service Worker, manifiestos, audios ni dependencias. Debe ejecutarse otro CI completo antes de fusionar PR #718.


## 2026-11-23 — PR #718 E2E: respetar velocidad de audio persistida

- Run `45109413422`: todos los pasos previos y 32/33 pruebas E2E pasaron; falló solo la aserción que fijaba `playbackRate = 1`, mientras el navegador real de prueba había cargado `0.85` como preferencia persistida en `AudioEngine.rate`.
- La hipótesis anterior de que el valor observado debía ser siempre 1 era incompleta: `1` es el valor inicial del objeto, pero la app restaura una preferencia guardada y admite `0.85` como velocidad válida. El comportamiento correcto es que el MP3 respete la velocidad activa, no imponer una velocidad fija.
- Se ajustó el E2E para comparar la velocidad aplicada al MP3 con `AudioEngine.rate` en la misma ejecución. No se cambió el producto ni la preferencia del usuario.
- Sin cambios a IndexedDB v1, backup JSON v3, archivos de audio, Service Worker, manifiestos ni dependencias. Repetir CI completo antes de fusionar PR #718.


## 2026-11-23 — PR fase 2: rutas y caché offline de audio por idioma

- Tras fusionar PR #718 (commit `5da07df98932d536dd2e8deaa67bf73992e181df`), se inició una fase incremental para desacoplar el audio offline de la ruta fija `audio/id/`.
- `service-worker.js` reconoce rutas de audio de los diez códigos cerrados del LanguageManager, mantiene `guardi-audio-v2` para indonesio y usa cachés independientes `guardi-audio-v2-<código>` para los demás idiomas. La deduplicación de fetch y la respuesta de byte ranges se conservan por URL/ruta.
- La migración de cachés antiguas resuelve la metadata SHA-256 según el idioma y valida bytes contra el inventario correspondiente antes de conservar/copiar clips. Las rutas legacy de indonesio siguen usando `audio/metadata.json`; las futuras bibliotecas usan `audio/<código>/metadata.json`.
- `offline-audio-manager.js` ahora resuelve ruta de inventario, MP3 y caché desde el idioma activo. También corrige la discrepancia previa: el preparador offline escribía en `guardi-audio-v1`, mientras el Service Worker reproducía desde `guardi-audio-v2`; ambos pasan a compartir la caché persistente v2 para indonesio.
- Añadidas pruebas de separación de cachés, migración SHA-256 por idioma, byte ranges en ruta pt-BR y helpers del gestor offline. No se añaden audios/manifiestos de idiomas nuevos, no se habilita ningún curso y no se modifica IndexedDB v1, backup JSON v3 ni dependencias. Validación CI pendiente en PR.


## 2026-11-23 — PR fase 2: corrección de sintaxis del gestor offline

- El primer CI de PR #719 (`45110400062`) pasó el informe de calidad, pero falló en la comprobación JavaScript antes de ejecutar la batería de pruebas: `offline-audio-manager.js` contenía un fragmento residual duplicado después del cierre (`})();, 'i');`).
- La lógica válida de `idsFromCacheKeys` ya estaba implementada antes; el fragmento residual pertenecía a una versión anterior de esa función y era código suelto fuera del módulo. Se eliminó únicamente ese bloque posterior al cierre, sin alterar la implementación activa.
- No se modifican IndexedDB v1, backup JSON v3, manifiestos, audios, dependencias ni el alcance de activación de idiomas. Repetir CI completo antes de fusionar PR #719.


## 2026-11-23 — PR #724: estabilizar E2E de velocidad de audio

- El primer CI del head `47a1cb808fcc0e0efffc9fb7136afe3f9e483beb` pasó Offline quality reports y 32/33 pruebas Chromium; falló la E2E de reproducción MP3 porque la prueba invocaba `speak()` antes de que terminara la restauración asíncrona de `audioPlaybackRate`. El MP3 capturó la velocidad inicial `1`, mientras la preferencia persistida `0.85` llegó después.
- Se hizo determinista el fixture E2E: guarda `0.85` en IndexedDB de prueba, lo vuelve a leer, sincroniza `AudioEngine.setRate(..., false)` y solo entonces inicia la reproducción. La prueba sigue comprobando que el MP3 recibe la preferencia persistida; no se cambia código de producto.
- El resto de E2E pasó (32/33) y el informe de calidad offline fue exitoso. Repetir CI completo sobre el nuevo head antes de fusionar PR #724.
- Sin cambios a IndexedDB v1 del usuario, backup JSON v3, Service Worker, manifiestos productivos, audios ni dependencias.


## 2026-11-23 — PR: verificar integridad de MP3 ya cacheados

- Auditoría posterior a PR #724 detectó que `OfflineAudioManager.refreshCacheState()` contaba IDs de archivos presentes sin comprobar sus bytes contra el inventario SHA-256. Un MP3 alterado o sin huella podía aparecer como listo para uso sin conexión.
- Corrección en curso: antes de contar un clip, comprobar respuesta HTTP 200, contenido no vacío y SHA-256 esperado; eliminar del cache los clips conocidos que no pasan la verificación y dejar que se vuelvan a descargar. Los clips solo se consideran guardados si coinciden con el inventario validado.
- Se añade prueba para conservar un clip íntegro y excluir/eliminar uno alterado y otro sin hash. El cambio no modifica el formato de inventario, Service Worker, IndexedDB v1, backup JSON v3, audios ni dependencias.
- Validación CI pendiente en PR.
