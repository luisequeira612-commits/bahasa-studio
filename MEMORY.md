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
