## 2026-11-23 — PR #748 preparada: pt-BR A1 U16–U18

- Rama `feat/pt-br-a1-u16-u18`, basada en el merge de PR #747 `1f6be39c6a3367c885ee29282f7430b3fac2b390`.
- U16 cuerpo y partes del cuerpo; U17 emociones y sensaciones; U18 salud y necesidades básicas. Diez términos por unidad, cinco lecciones y diez ejercicios finales. Los términos permanecen `not_checked`.
- El manifiesto publica U1–U18 de 24 (75 % del nivel), pero `pt-BR available:false` se conserva. El bloque curricular existente ya estaba en el precache del Service Worker; no se requiere cambiar la versión de caché.
- Pruebas Node ampliadas a U1–U18 y contratos de U16–U18; Playwright debe cargar U1–U18 completamente offline y comprobar el aislamiento del progreso. Sin nuevos tipos de ejercicio, audio/TTS, dependencias, cambios a IndexedDB v1 o backup JSON v3.
- Pendiente CI completo; no fusionar hasta que `test` y `Offline quality reports` estén en éxito.
 
## 2026-11-23 — PR #745: correcciones del primer CI
- El primer CI (#45197843322) detectó dos fallos limitados a las pruebas nuevas: la expectativa del test de carga seguía enumerando U1–U6 pese a solicitar U1–U9, y el bloque `units-07-12.js` había perdido la asignación inicial del registro global al insertar U7–U9. Se corrigió la expectativa y se restauró `root.GUARDI_CURRICULUM_BLOCKS = root.GUARDI_CURRICULUM_BLOCKS || {}`.
- Se ajustó también el ejemplo léxico de `em frente` y la frase de `chuva` para evitar ejemplos poco naturales. El E2E Playwright U1–U9 había pasado en el primer CI; `Offline quality reports` también pasó. Se espera un CI completo nuevo antes de merge.

## 2026-11-23 — PR #744 fusionada y pt-BR A1 U7–U9 en preparación
- PR #744 (`feat/pt-br-a1-u4-u6`) quedó fusionada mediante squash en `main`: `89f0c50bb121d012eb2cbe271fbc28d8345c4e27`. El head `1c0ecd21c161588540b01f7ec81e75b964f5b450` pasó el CI completo #45195101334: jobs `test` y `Offline quality reports` en `success`, incluidos E2E real, evaluación y auditorías de calidad.
- El siguiente tramo del piloto añade U7–U9 en la rama `feat/pt-br-a1-u7-u9`: U7 rutina diaria y momentos del día; U8 lugares, direcciones y transporte; U9 clima, estados personales y razones. Cada unidad mantiene cinco lecciones, diez términos nuevos, diez ejercicios finales y `verification.status: not_checked`.
- Se mantiene `pt-BR` con `available:false`; el manifiesto A1 sigue declarando 24 unidades, ahora con U1–U9 publicadas para pruebas. No se publica audio/TTS nuevo y solo se usan los handlers existentes `mc` y `order`.
- Se preservan IndexedDB v1, backup JSON v3, dependencias y el alcance offline. La ausencia de hablante nativo/KBBI no bloquea el progreso; `not_checked` no equivale a validación lingüística.
- Tests Node y Playwright se amplían a U1–U9 y mantienen la comprobación de aislamiento de progreso/historial y precarga offline. El siguiente paso es ejecutar CI completo y fusionar solo si todo queda verde.

## 2026-11-23 — pt-BR A1 U4–U6 en preparación
- Se amplía el piloto curricular a A1 U1–U6 sin habilitar Portugués. U4 trabaja familia y posesivos; U5 comida, bebida, gustos y negación; U6 casa, ubicación y distancia.
- U4–U6 mantienen cinco lecciones explícitas y diez registros léxicos por unidad. Todos los términos nuevos permanecen `not_checked`; no se presenta certificación nativa ni se bloquea el avance por ausencia de hablante nativo.
- Se publica el bloque `07-12` para U4–U6 y el manifiesto declara seis unidades publicadas dentro del nivel A1 de 24 unidades. El selector y la carga normal siguen bloqueados mientras `pt-BR` permanezca `available:false`.
- Se actualizan pruebas Node para cargar U1–U6, validar cinco lecciones por unidad, diez ejercicios finales en U4–U6 y ausencia de audio pt-BR. El Service Worker precarga también el nuevo bloque y pasa a caché app shell v3.8.127.
- No se modifica IndexedDB v1, backup JSON v3 ni dependencias. PR #742 sigue sin fusionar porque GitHub no reporta CI completo verde.

## 2026-11-23 — piloto curricular pt-BR A1 U1–U3 (PR en preparación)
- Tras aprobación explícita, rama `feat/pt-br-a1-pilot-u1-u3`; se prepara un piloto parcial de A1 (24 unidades previstas; U1–U3 publicadas como contenido de prueba), sin habilitar el curso ni cambiar el idioma activo.
- U1–U3 tienen cinco lecciones explícitas cada una. Inventario: 50 registros léxicos (U1 10, U2 10, U3 10 términos + 20 números); todos `not_checked`, sin hablante nativo ni certificación. U3 recicla exactamente dos preguntas de U1.
- Vocabulario usa el campo neutral `target`; ejercicios usan handlers existentes `mc` y `order`. Las actividades de comprensión son texto/selección; no se publica audio ni se elige voz.
- `CurriculumLoader.loadUnits('pt-BR','A1',[1,2,3])` permite probar bloques aun con `available:false`; la carga normal y el selector siguen bloqueados hasta completar A1. Service Worker precarga manifiesto y bloque del piloto.
- Añadidas pruebas Node y Playwright para cinco lecciones por unidad, referencias, reciclaje U3, carga offline y aislamiento del historial/progreso pt-BR frente a Indonesio. CI pendiente de ejecución.
- Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni recursos de audio.

## 2026-11-23 — selector de idiomas compacto en la barra superior (PR #738 abierta; CI verde)
- Por aprobación explícita, se sustituye la tarjeta grande de idioma en Aprender por un chip de bandera en la barra superior y una hoja inferior accesible. El catálogo se lee de `LanguageManager.list()`; Indonesio permanece como único curso disponible y los otros nueve se muestran en gris con etiqueta «Pronto», sin controles seleccionables.
- La hoja muestra el idioma activo, su nivel y el porcentaje de progreso del nivel actual. El chip de nivel conserva el progreso calculado desde el currículo y namespace del idioma activo. No cambia la selección predeterminada ni el mecanismo de persistencia de `LanguageManager`.
- Se eliminó el bloque explicativo y el margen que desplazaba la ruta. Barra compacta ajustada para 360 px; hoja con `role=dialog`, cierre por botón, fondo y Escape, foco visible y restauración del foco.
- Cambios visuales/navegación solamente: sin dependencias, backend, cambios de IndexedDB v1 ni backup JSON v3. Caché app shell v3.8.125. Los estilos nuevos se mantienen inline en index.html para preservar el hash del styles.css canónico; no se añadieron archivos de runtime.
- PR #738: https://github.com/luisequeira612-commits/bahasa-studio/pull/738. Rama `feat/compact-language-selector-sheet`; head `182e7f6bc084e9cc69e1f2680c09e12457fb64da`; base `db429218c7e33206ee46667625962aa1883667b8`. CI final run #45138894376: `test` y `Offline quality reports` completados en éxito. Playwright incluye 360×800, chip de 48 px, hoja y cierres, orden de idiomas, progreso coincidente, ruta en primera pantalla y persistencia tras recargar. Prueba física en Tecno Pova 4 aún pendiente.
- PR permanece abierta y sin merge. Esperar el «Aprobado» explícito del usuario.

## 2026-11-23 — selector de idioma trasladado a la pantalla principal
- Por aprobación explícita del dueño, el selector de curso se mueve de Perfil a la parte superior de Aprender/Ruta, en una tarjeta compacta y visible; Perfil deja de ser el único acceso al cambio de idioma.
- Se conserva el catálogo de diez idiomas, Indonesian como único curso seleccionable, los demás deshabilitados, la validación de LanguageManager y el reinicio seguro al cambiar de curso. No cambia currículo, progreso, IndexedDB v1 ni backup JSON v3.
- Cache app shell incrementada a v3.8.124. Prueba de regresión verifica ubicación en la pantalla principal y ausencia del selector en Perfil; CI pendiente.

## 2026-11-23 — mejora del selector de idiomas
- Corrección UX: el selector permanece desplegable aunque solo exista un curso disponible, para que se pueda consultar el catálogo aprobado y ver los nueve cursos próximos. Cada opción no disponible continúa deshabilitada y LanguageManager vuelve a validar cualquier intento de cambio.
- Seleccionar de nuevo el idioma ya activo no guarda ni recarga la aplicación.
- Cache app shell v3.8.123. La primera ejecución CI detectó que v3.8.122 también está reservado como nombre de caché legacy en la prueba de migración SHA-256; se corrigió a v3.8.123. Se añade regresión para la visibilidad del catálogo y el no-op del idioma activo. CI corregido pendiente.
- No se activan idiomas, cursos, vocabulario ni audio nuevos; IndexedDB v1 y backup JSON v3 siguen intactos.

## 2026-11-23 — fase 3: selector de idioma protegido
- PR en preparación: añade al Perfil un selector que muestra el catálogo aprobado, pero deshabilita cada curso no disponible; actualmente solo Indonesio puede seleccionarse. El control completo permanece deshabilitado hasta que exista más de un curso disponible.
- El cambio de idioma llama a LanguageManager.setActiveLanguage, persiste el código mediante el adaptador existente y recarga la app para reconstruir CourseData, motores y vistas bajo el nuevo namespace. El nombre del idioma activo se usa en la etiqueta de idioma de la vista de aprendizaje.
- No se crean cursos ni recursos nuevos. La interfaz y mensajes siguen en español; IndexedDB v1, backup JSON v3 y los namespaces existentes se preservan. Cache app shell v3.8.121. La primera ejecución CI reveló una colisión con el nombre de caché legacy v3.8.120 en una prueba de migración; se corrigió usando v3.8.121. CI de la revisión corregida pendiente.

## 2026-11-23 — fase 3: conectar CourseData con CurriculumLoader
- La integración de arranque ahora resuelve A1 y A2 del idioma activo mediante `CurriculumLoader` antes de inicializar AudioEngine y las pantallas; reemplaza solo esos niveles y conserva B1/B2 existentes. Si falta un nivel requerido, el arranque falla explícitamente en lugar de usar datos silenciosamente incorrectos.
- Se sincronizaron AGENTS.md y SKILL.md con la secuencia aprobada el 22 nov 2026: pt-BR → en → it → fr → de → nl → ru → ja → ko → id; se completa A1–B2 de cada idioma antes del siguiente. Solo indonesio sigue disponible durante esta fase; pt-BR A1 comienza después de cerrar fase 3.
- Se añadió regresión de integración y se incrementó la caché del app shell a v3.8.119 para publicar el cambio offline. IndexedDB v1, backup JSON v3, audio productivo, dependencias y datos curriculares no se modifican. CI/PR pendiente de verificación.

## 2026-11-23 — corregir normalización de SHA-256 en migración de audio
- Auditoría posterior a PR #730 detectó una inconsistencia: el validador acepta fingerprints hexadecimales en mayúsculas y la verificación de reproducción normaliza el valor, pero las dos rutas de migración comparaban el digest hexadecimal minúsculo con el metadata original. Un clip actual válido podía borrarse y una copia legacy válida podía no migrarse antes de eliminarse la caché antigua.
- PR [#731](https://github.com/luisequeira612-commits/bahasa-studio/pull/731) fusionada mediante squash en `main`; head `5211f9532bab8167fc456e8e9dd3e4eab955fc2f`, commit integrado `fb5776937f8c5008f639f15a9d180989623c2a20`.
- Normaliza el hash esperado a minúsculas en la comparación de caché actual y de migración legacy. Añade regresiones independientes para ambas rutas con hashes uppercase. Mantiene la validación estricta de 64 caracteres hexadecimales; no altera inventarios, audio, IndexedDB v1, backup JSON v3 ni dependencias.
- CI #45129083642: `test` completó 101/101 pasos con éxito y `Offline quality reports` 10/10. Sin reviews ni hilos pendientes; head comprobado sin cambios antes del merge.

## 2026-11-16 — biblioteca de audio MMS completa y verificada
- Generación completa [run #43819778038](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43819778038): MMS, modo full, todos los niveles; 2.196 clips únicos y 29.660.564 bytes combinados MP3 + Opus. PR [#636](https://github.com/luisequeira612-commits/bahasa-studio/pull/636) fusionada por squash como `88caa5fffdb7302e185b7201d58d7a198adfd775`.
- Verificación post-merge: índice y manifiesto contienen los mismos 2.196 IDs; árbol Git con 2.196 MP3 y 2.196 Opus, sin faltantes ni sobrantes; metadata identifica MMS `facebook/mms-tts-ind`, revisión `171b004ccd54f266a31efee71f1ad850c91d39c0`, licencia CC BY-NC 4.0; 2.196 hashes SHA-256 válidos, sin huellas faltantes ni sobrantes.
- Regresión pre-merge [#43821919412](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43821919412) y post-merge [#43822481728](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43822481728): jobs `test` y `Offline quality reports` completados con éxito. GitHub Pages post-merge [#43822480330](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43822480330) completado con éxito.
- El usuario escuchó una muestra y la consideró natural y entendible; prefería voz femenina, pero aceptaba la voz masculina disponible. Esto no constituye certificación lingüística ni validación nativa. Quedaba pendiente una comprobación manual de reproducción/descarga offline en el Tecno Pova 4.
- Fuente: GitHub Actions #43819778038, #43821919412, #43822481728, #43822480330; PR #636 y artefactos de inventario en main; 16 nov 2026.

## 2026-11-14 — despliegue de audio offline verificado
- Tras la integración de descarga/caché bajo demanda, regresión post-merge del commit `dd7b29805c2475cc051187aa219b369cdae209c6` aprobada en [run #43655294954](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43655294954): jobs `test` y `Offline quality reports` en éxito.
- GitHub Pages post-merge completado en [run #43655294337](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43655294337).
- La prueba manual del usuario confirmó que un clip reproducido previamente online funcionaba en modo avión, mientras que uno nunca almacenado no funcionaba en el primer intento offline. La limitación era caché bajo demanda, no fallo de generación Piper. No declarar toda la biblioteca disponible offline hasta que el usuario prepare niveles o la biblioteca completa en su dispositivo.
- Fuente: PR #598, commit `dd7b29805c2475cc051187aa219b369cdae209c6`, Actions #43655294954/#43655294337 y prueba manual del usuario; 14 nov 2026.
 
## 2026-11-23 — PR #729 fusionada: preservar audio ante hashes SHA-256 malformados
- PR [#729](https://github.com/luisequeira612-commits/bahasa-studio/pull/729) fusionada mediante squash en `main`; head validado `159ed558eba3037ff857b48e2e4125dc0451596c`, commit integrado `7def9f7c9828e85fe9038ffa009d39b0bd8339a0`.
- CI final #45127449881: `test` completó 98 pasos con éxito, incluidos tests de audio/caché, E2E en navegador real, evaluación y preview; `Offline quality reports` también terminó con éxito. Sin reviews ni hilos pendientes.
- La prueba de hash malformado se corrigió para exigir que los bytes no verificados permanezcan almacenados para verificación futura, pero no se sirvan desde caché; la reproducción online continúa. No se relajó la implementación.
- Alcance: `service-worker.js`, `tests/service-worker-audio-cache.test.cjs` y `MEMORY.md`; sin cambios en audios/inventarios productivos, IndexedDB v1, backup JSON v3 ni dependencias.

## 2026-11-23 — PR #729: ajustar regresión de caché no verificable
- CI #45126091140 falló únicamente en la prueba nueva de hash malformado: la prueba esperaba que el audio cacheado se borrara tras impedir su reproducción. Eso contradice el objetivo de preservar físicamente la copia para una verificación futura.
- Se corrige la prueba para exigir simultáneamente que la respuesta servida sea el audio online y que la copia cacheada original permanezca almacenada, sin servirla ni eliminarla. La regresión anterior de migración legacy pasó.
- La implementación no se relajó; la repetición completa del CI terminó en verde (run #45127449881) y la PR #729 se fusionó.

## 2026-11-23 — PR #729: preservar audio ante hashes SHA-256 malformados
- Auditoría posterior a PR #728 detectó que el Service Worker distinguía hash ausente de hash presente sin validar formato. Un hash malformado podía provocar que se eliminara una copia cacheada actual o que se limpiara una caché legacy sin haber podido verificar el audio; en reproducción online también podía rechazarse un MP3 válido solo por metadata malformada.
- La corrección trata hashes ausentes o malformados como evidencia no disponible: no sirve bytes cacheados sin verificar, no los elimina solo por falta de evidencia, no migra ni borra la única copia legacy y permite reproducción online sin persistencia offline. Un hash SHA-256 válido que no coincide sigue invalidando el contenido.
- Añade regresiones para migración legacy con hash malformado, preservación de caché actual y reproducción online. CI final #45127449881 y revisión completados; PR #729 fusionada mediante squash en `main` (commit `7def9f7c9828e85fe9038ffa009d39b0bd8339a0`). No cambia inventarios productivos, audios, IndexedDB v1, backup JSON v3 ni dependencias.

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


## 2026-11-23 — Variantes del catálogo multilingüe
- Corrección de UI/catálogo: el idioma mostrado como **Portugués** usa la bandera 🇧🇷; no se debe mostrar “Portugués de Brasil”, porque la bandera ya identifica la variante enseñada.
- El idioma **Inglés** corresponde a **inglés de Estados Unidos** y debe usar la bandera 🇺🇸, no 🇬🇧.
- Decisión vigente: **no iniciar todavía el curso de Portugués**. La activación y creación de su currículo queda bloqueada hasta que Luis defina primero cuántas unidades tendrá.


## 2026-11-23 — Prueba de voz dependiente del idioma
- La prueba manual de voz obtiene la frase de prueba de la configuración del idioma activo mediante `testPhrase`, en lugar de reproducir siempre una frase indonesia.
- Indonesio conserva `terima kasih`. Si un idioma no tiene frase configurada, la prueba muestra un aviso en español y no intenta reproducir contenido de otro idioma.
- Se añaden pruebas unitarias y estructurales para impedir que vuelva el fallback fijo al indonesio.
- No se habilitan cursos nuevos ni se modifican IndexedDB v1, backup JSON v3, dependencias o recursos de audio.


## 2026-11-23 — PR #745: pt-BR A1 U7–U9 integradas
- PR #745 fusionada mediante squash en main, commit b29f79e0befa06d1050657d1a2ea98f148dc03eb. CI completo del head 9465d3eaa43a365bc6475c4af44f610404a5e69c, run 45200036939, terminó con test y Offline quality reports en éxito; incluye E2E Chromium y evaluación en navegador.
- A1 pt-BR tiene 24 unidades declaradas y U1–U9 publicadas. U7: rutina diaria; U8: lugares, direcciones y transporte; U9: clima, estados personales y razones. Cada unidad mantiene cinco lecciones, diez términos nuevos y diez ejercicios finales. Los términos continúan not_checked.
- El primer CI detectó una expectativa desactualizada de U1–U6 y la falta de inicialización del registro global en el bloque U7–U12; ambas correcciones pasaron el segundo CI. Se mejoraron dos ejemplos (em frente; A chuva começou.).
- pt-BR sigue available:false. Sin nuevos recursos de audio/TTS, dependencias, cambios a IndexedDB v1 o backup JSON v3.

## 2026-11-23 — PR #742: prueba de voz por idioma integrada
- PR #742 fusionada por squash en main, commit 97f5cbc457a91168e9637eea1f7b41bda666d89e. CI run 45143050099: test y Offline quality reports ambos en éxito.
- AudioEngine.testVoice() usa testPhrase del idioma activo; indonesio conserva terima kasih. Si no hay frase configurada, muestra aviso en español y no reproduce contenido indonesio. Sin nuevos audios, dependencias o cambios de datos persistentes.

## 2026-11-23 — PR #746: pt-BR A1 U10–U12 integradas
- PR #746 fusionada por squash en main, merge commit `195b1679bdde4162dbae29ffb4113cdbc917ff8f`. CI run `45202650825`: `test` (101/101 pasos) y `Offline quality reports` ambos success.
- U10 compras/precios, U11 ropa/colores, U12 días de la semana/referencias temporales. Manifiesto A1 declara 24 unidades y U1–U12 publicadas.
- Cada unidad aporta diez términos `not_checked`, cinco lecciones y diez ejercicios finales. `pt-BR` sigue `available:false`; sin audio/TTS ni dependencias; se preservan IndexedDB v1 y backup JSON v3.

## 2026-11-23 — PR #747: pt-BR A1 U13–U15 en preparación
- Rama basada en main posterior a #746. U13 lectura y aficiones creativas; U14 deportes y movimiento; U15 cine, salidas e invitaciones.
- Cada unidad aporta diez términos `not_checked`, cinco lecciones y diez ejercicios finales; solo renderizadores existentes `mc` y `order`. Se amplía la carga U1–U15 y precache offline. `pt-BR` continúa `available:false`; no audio/TTS nuevo ni dependencias; sin cambios a IndexedDB v1 o backup JSON v3. CI pendiente.


## 2026-11-23 — PR #747: corrección de sintaxis pendiente
- El primer CI del head a0efcf38744cb552b624eae1b346790391670514 falló: `units-13-18.js` no incluía el wrapper IIFE ni los helpers locales (`v`, `mc`, `order`, `write`, `lesson`). Esto provocó SyntaxError y fallos derivados en E2E/carga de U13–U15.
- `Offline quality reports` terminó success; el fallo no se atribuye a los avisos editoriales generales. La PR no se fusiona hasta corregir sintaxis y lograr CI completo verde.


## 2026-11-23 — PR #747: corrección de referencias y precache
- El segundo CI (run [45209101045](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45209101045)) pasó `Offline quality reports`, pero el job `test` falló en tres pruebas relacionadas: el bloque U13–U15 usaba referencias a variables locales de otros archivos (`u3`, `u12`, `u10`) que no existen en su ámbito; la prueba unitaria aún esperaba solo U1–U12; y el E2E abría el nombre de caché anterior `v3.8.127` aunque el Service Worker actual usa `v3.8.128`.
- Corrección: sustituir referencias cruzadas por IDs estables de vocabulario; actualizar la expectativa de carga a U1–U15; alinear el E2E con la versión actual de caché y comprobar también que U13–U15 están precargadas.
- No se relajan las pruebas ni se altera el estado `available:false`. Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio/TTS.


## 2026-11-23 — PR #749: pt-BR A1 U19–U21 preparada sobre main
- Tras integrar #748 (squash `0b5910ea1e40d57b189da59d0027c5d5e3926440`), la rama apilada original de #749 quedó con conflictos por incluir los mismos cambios de U16–U18 y `MEMORY.md`. Se prepara una rama limpia desde `main` que contiene solo el incremento U19–U21 y sus pruebas.
- U19 meses, fechas y cumpleaños; U20 restaurante y pedidos; U21 tareas domésticas. Diez términos por unidad, cinco lecciones y diez ejercicios finales; vocabulario `not_checked`.
- Manifiesto U1–U21 de 24; `pt-BR available:false`. Service Worker precarga `units-19-21.js` y usa cache key `bahasa-studio-v3.8.129`. Node y Playwright amplían contratos/carga offline a U1–U21.
- Sin dependencias, audio/TTS, backend, cambios a IndexedDB v1 ni backup JSON v3. La PR nueva debe pasar CI completo antes de fusionar.

- CI inicial de #750 run `45225937982`: `Offline quality reports` success; `test` falló únicamente en Playwright porque el E2E aún cargaba U1–U18 aunque esperaba U1–U21. Corregido en commit `de38f8db5740b93f2a32ed00361a1da6f87fe507`: `CurriculumLoader.loadUnits` ahora solicita U1–U21. Revalidar el nuevo head con CI completo antes del merge.


## 2026-11-23 — pt-BR A1 U22–U24
- Tras fusionar #750 en `main` (squash `a8748298b28b846b85413d53d596afee8a5e3938`), se prepara la PR limpia #752 desde ese `main`, con solo U22–U24; la PR apilada #751 no debe fusionarse porque su historial conserva los commits ya squash-mergeados de U19–U21.
- U22 aula/materiales de estudio; U23 profesiones/trabajo; U24 teléfono/mensajes. Diez términos nuevos, cinco lecciones y diez ejercicios por unidad; vocabulario `not_checked`.
- Manifiesto U1–U24; `pt-BR available:false` hasta validar el curso. SW cache `bahasa-studio-v3.8.130`, precache `units-22-24.js`; E2E carga U1–U24 offline y se añade test Node para contratos de U22–U24.
- Sin nuevas dependencias, audio/TTS, backend, cambios a IndexedDB v1 ni backup JSON v3.

## 2026-11-23 — pt-BR A2 U1–U3 en preparación
- A1 U1–U24 quedó integrada en `main` mediante PR #752, squash commit `f5a90d716352b09c26dee8a564a48b9656517e00`. El CI de la PR completó `test` (101 pasos) y `Offline quality reports` (10 pasos) en success; GitHub Pages completó build y deploy del commit integrado.
- Inicia A2 (30 unidades) en la rama `feat/pt-br-a2-u01-u03`. U1: pasado reciente y pretérito perfeito; U2: infancia y hábitos con pretérito imperfeito; U3: planes, compromisos e ir + infinitivo.
- Cada unidad contiene 10 términos, 5 lecciones y 10 ejercicios de selección múltiple; las lecciones incluyen 2 ejercicios y las respuestas correctas se distribuyen entre las opciones. Vocabulario `not_checked`; referencias de repaso apuntan a IDs previos de A1/A2.
- Manifiesto A2 declara 30 unidades y publica solo U1–U3. Se registra la ruta A2 en LanguageManager, se precargan manifiesto y bloque U1–U3 con Service Worker cache `bahasa-studio-v3.8.131`, y se amplía Playwright para comprobar carga offline A1+A2. `pt-BR available:false` se conserva; el nivel A2 incompleto no se activa.
- Sin nuevas dependencias, backend, audio/TTS ni cambios a IndexedDB v1 o backup JSON v3. CI pendiente antes de abrir/ fusionar la PR.


- Ampliación de cobertura del runner: `quality:tests` ahora incluye los contratos incrementales A1 U19–U21, A1 U22–U24 y A2 U1–U3. Se corrigieron los harness de pruebas incrementales para inicializar el manifiesto antes de inspeccionar sus unidades publicadas.


## 2026-11-23 — PR #753: corrección de regresiones de integración A1/A2
- El primer CI (#45233109300) detectó tres expectativas antiguas en los tests incrementales A1 U19–U21 y U22–U24: el manifiesto A1 ya publica U1–U24 (no U1–U21) y el Service Worker avanzó a `v3.8.131` al añadir el manifiesto y bloque A2.
- Se actualizan únicamente esas expectativas; el contenido curricular A1/A2 y el estado `pt-BR available:false` no cambian. `Offline quality reports` pasó; se repetirá CI completo, incluido Playwright.


## 2026-11-23 — pt-BR A2 U4–U6
- PR #753 se fusionó por squash tras completar ambos jobs: test (101 pasos) y Offline quality reports (10 pasos), ambos success. Commit de merge: 57685ed4a911149feb2f97383778a27639ad6cf1.
- Nueva rama limpia feat/pt-br-a2-u04-u06, basada en el commit de main posterior a #753. Añade U4 experiencias y acontecimientos (já/ainda não/nunca y contraste de tiempos pasados), U5 comparativos (mais/menos/tão, melhor/pior, maior/menor) y U6 pedir ayuda/resolver problemas (poder, precisar, infinitivo).
- Cada unidad: 10 vocabularios, 5 lecciones, 10 ejercicios MC; respuestas correctas comprobadas por índice, IDs propios y referencias de repaso a U1–U3. Estado léxico not_checked.
- Manifiesto A2 declara 30 unidades y ahora publica U1–U6 en dos bloques. Service Worker bahasa-studio-v3.8.132 precarga units-04-06.js. Se agrega test incremental Node, se incluye en quality:tests y Playwright amplía la carga offline A2 a U1–U6.
- pt-BR available:false permanece sin cambios. No se modifican IndexedDB v1 ni backup JSON v3; sin dependencias, backend ni audio/TTS. No implica certificación lingüística nativa.


## 2026-11-23 — corrección CI PR #754
- CI run #45236415109 detectó 4 fallos de regresión en la suite `quality:tests` (199/203 pasaron): el test A2 U1–U3 aún esperaba que el manifiesto publicara solo U1–U3; los tests de A2 U1–U3, A1 U19–U21 y A1 U22–U24 todavía esperaban la caché `v3.8.131` tras el avance a `v3.8.132`.
- Se actualizaron únicamente esas expectativas: el manifiesto ahora debe publicar U1–U6 y los tres tests verifican la versión actual de caché. No se cambia lógica de producto ni se eliminan aserciones. Se repetirá CI completo antes de fusionar.


## 2026-11-23 — pt-BR A2 U7–U9 en preparación
- PR #754 quedó fusionada por squash en `main`, commit `c6c00fd18618591fca6f61bcb0aa6cd141d86e2b`, después de CI completo en success: `test` 101 pasos y `Offline quality reports` 10 pasos.
- Nueva rama limpia `feat/pt-br-a2-u07-u09` basada en ese commit. U7 obligaciones, permisos y consejos (ter que, dever, precisar); U8 conectores y secuencia (primeiro, em seguida, por isso, porém, apesar de); U9 viajes, transporte y alojamiento (passagem, bagagem, hospedagem, check-in, embarcar/desembarcar, conexão).
- Cada unidad contiene 10 términos `not_checked`, 5 lecciones y 10 ejercicios MC. Referencias de repaso de U7–U9 apuntan a vocabulario de unidades A2 anteriores; tests comprueban IDs, respuestas correctas, manifiesto y resolución de repaso.
- Manifiesto A2 publica U1–U9 de 30; Service Worker avanza a `bahasa-studio-v3.8.133` y precarga `units-07-09.js`. Playwright se amplía para cargar A2 U1–U9 offline; los tests anteriores alinean expectativas de caché.
- `pt-BR available:false` permanece; no se alteran IndexedDB v1 ni backup JSON v3. Sin nuevas dependencias, backend ni audio/TTS. El vocabulario sigue sin certificación nativa.


## 2026-11-23 — corrección CI PR #755
- CI run #45238319009 detectó un error de sintaxis en `tests/pt-br-curriculum.e2e.test.cjs`: un literal `\\n` quedó insertado en la expresión de verificación de la caché offline. El resto de la suite reportó 206/207 pruebas superadas; `Offline quality reports` pasó.
- Se corrigió el test sustituyendo el literal por un salto de línea real en commit `4425703f5990b78e5f9aee1d9563f93e3d94bc27`. Se requiere CI completo sobre este nuevo head antes de fusionar. No se cambia contenido curricular ni comportamiento de la app.


## 2026-11-23 — pt-BR A2 U7–U9 fusionadas y U10–U12 en preparación
- PR #755 se fusionó por squash en `main`, commit `96ae18a55cbb3986c5b0e37df705243ffa85c0c9`. CI run #45238928076 completó `test` (101/101 pasos) y `Offline quality reports` (10/10 pasos), ambos en success. Se corrigió previamente un literal de salto de línea en el test E2E.
- Estado confirmado tras el merge: A1 24/24; A2 9/30; B1 0/36; B2 0/40. pt-BR permanece `available:false`; no se modifica IndexedDB v1 ni backup JSON v3.
- Nueva rama `feat/pt-br-a2-u10-u12` parte del commit fusionado. Bloque previsto: U10 noticias y medios; U11 cultura y espectáculos; U12 medio ambiente y sostenibilidad. Se cotejaron 330 términos A1/A2 existentes y se evitaron colisiones exactas en las 30 entradas nuevas.
- Cada unidad mantiene 10 términos `not_checked`, 5 lecciones y 10 ejercicios MC. Se amplía manifiesto a U1–U12, precarga offline y caché a `bahasa-studio-v3.8.134`; se actualizan tests de manifiesto y Playwright. Sin nuevas dependencias, backend, audio/TTS ni cambios de persistencia. Pendiente CI del PR de este bloque.

- PR #756 abierto: https://github.com/luisequeira612-commits/bahasa-studio/pull/756. Head inicial `f269ebaa7824c4e0a59431054f01bd454a391595`, 10 archivos, +193/-16. CI pendiente; no fusionar hasta comprobar todos los checks del head definitivo.

- 2026-11-23 — CI PR #756 run #45240545419 encontró 6 fallos en pruebas de caché heredadas que seguían esperando `v3.8.133` después de subir a `v3.8.134`; además, el test U7–U9 cargaba ahora el manifiesto U1–U12 sin mapear el nuevo archivo U10–U12. Corregidos los cinco archivos de test afectados (U1–U3, U4–U6, U7–U9, A1 U19–U21 y A1 U22–U24); el test U7–U9 ahora incluye el bloque U10–U12 en su loader simulado. Sin cambios al currículo ni a persistencia. Pendiente repetir CI en el head nuevo.
