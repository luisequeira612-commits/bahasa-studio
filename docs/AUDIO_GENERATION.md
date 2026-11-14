# Generación de audio desde GitHub Actions

Fecha: 14 nov 2026  
Estado: **Piper `id_ID-news_tts-medium` seleccionado y biblioteca A1/A2/B1 integrada**. La reproducción de clips está conectada a la app; los MP3 se descargan bajo demanda y se almacenan en la caché persistente. La migración y Range 206/416 ya están integrados; siguen pendientes la validación física final en Android, la invalidación de regeneraciones (PR4) y la auditoría integral de cobertura.

## Entorno real

El propietario trabaja únicamente desde un Tecno Pova 4 Android y no tiene computadora. Por eso todos los comandos de Python, Node, ffmpeg y los motores TTS se ejecutan en GitHub Actions. No se requiere Termux, PC, cuenta externa, clave ni API de pago.

## Ejecutar muestras desde el teléfono

Después de fusionar el PR que añade el workflow:

1. Abre el repositorio: https://github.com/luisequeira612-commits/bahasa-studio
2. Toca **Actions**.
3. Selecciona **Generate Indonesian audio**.
4. Toca **Run workflow**.
5. Deja la rama en `main`, selecciona `engine=piper`, `mode=samples`, `limit=10`, y toca **Run workflow**.
6. Cuando termine, abre el resumen de la ejecución. El workflow sube una copia de recuperación como artifact y actualiza la rama/PR `audio/tts-samples`.
7. Las muestras de Edge, Piper y MMS ya están publicadas y comparadas. La selección para producción es Piper; no hace falta volver a generar muestras salvo que cambie el modelo.

La generación completa exige `mode=full` y `confirm_full=true`. El workflow permite seleccionar A1, A2 o B1 para que cada nivel se genere en una rama/PR separada. La primera generación completa guarda `audio/metadata.json`; las siguientes rechazan cualquier motor o voz diferente para impedir mezclar voces. La opción `regenerate_existing` queda desactivada por defecto. Si se activa, el generador fuerza la sustitución de archivos existentes y aumenta `content_revision` antes de sobrescribirlos, lo que hace que el Service Worker invalide los MP3 locales antiguos. Añadir IDs nuevos no aumenta la revisión ni purga los clips existentes. Fusiona A1 antes de iniciar A2, y A2 antes de B1, para que el bloqueo se herede en `main`.

## Página para escuchar

La página `audio-samples/index.html` sirve para escuchar las muestras comparativas de los motores. La biblioteca integrada contiene MP3 y Opus, pero el reproductor principal actual utiliza MP3 mediante `new Audio(url)`; no implementa selección `canPlayType()` ni usa Opus en esa ruta. La presencia de ambos formatos no demuestra que Opus tenga consumidores.

URL prevista del sitio publicado:

https://luisequeira612-commits.github.io/bahasa-studio/audio-samples/

**Fuente verificada:** inspeccioné el último deployment de Pages (run 43558372270): el job Jekyll hizo checkout de `main` y construyó desde `source: .` (raíz). Por tanto, la URL anterior es la correcta después de fusionar el PR que contenga `audio-samples/` y de que termine el siguiente deployment. No hay que cambiar Settings → Pages.

Las muestras se guardan primero en una rama y PR; no estarán en la URL pública antes de que el PR se fusione y Pages termine el despliegue. Si la fuente es `main` raíz, la fusión normal del PR produce la publicación. Después de elegir la voz, las muestras temporales se eliminarán en una PR pequeña.

## Permisos de GitHub Actions

El repositorio es público y el endpoint de repositorio informa `private=false`, pero no expone el ajuste de permisos de Actions. Para permitir que el workflow abra PRs con el token automático:

1. Abre la página del repositorio en Chrome.
2. Toca **Settings** (si no aparece, abre el menú desplegable de pestañas y selecciónalo).
3. En el menú lateral, entra en **Actions → General**.
4. Baja a **Workflow permissions**.
5. Activa **Allow GitHub Actions to create and approve pull requests**.
6. Toca **Save**.

Si no quieres habilitar la creación automática de PR, el workflow puede dejar una rama con un enlace **Compare & pull request**; se puede crear el PR manualmente desde el teléfono. No se usa PAT ni secreto personal: solo `GITHUB_TOKEN`.

## CI y eventos originados por GITHUB_TOKEN

GitHub documenta que un `push` hecho con `GITHUB_TOKEN` no dispara otros workflows. Los eventos `pull_request` `opened`, `synchronize` y `reopened` son una excepción, pero el CI puede quedar en estado de aprobación requerida. Para evitar depender de ese comportamiento, este workflow solicita explícitamente una ejecución de `Regression tests` con `workflow_dispatch` en la rama generada. Si GitHub muestra un aviso de aprobación en el PR, un propietario con permisos puede tocar **Approve workflows to run**; verifica siempre que el run de regresión corresponda al SHA del PR.

## Motores y limitaciones verificadas

### Edge TTS
- Paquete: `edge-tts`; voz predeterminada para la prueba: `id-ID-ArdiNeural` (masculina). También existe `id-ID-GadisNeural` (femenina).
- La lista oficial de Microsoft para Azure Speech confirma ambos nombres, pero eso no constituye permiso de uso de la interfaz no oficial que utiliza `edge-tts`.
- Depende de un servicio online de Microsoft; GitHub Actions puede recibir bloqueos, 403, rate limits o cambios de protocolo desde IPs de centros de datos. Si falla, el workflow deja el job en error y se prueba Piper o MMS. No hay garantía de continuidad ni de términos de uso para este cliente no oficial.

### Piper
- Paquete Python: `piper-tts==1.8.0`; licencia del paquete ejecutor: GPL-3.0-or-later. Solo se instala en el runner de GitHub Actions, no en la app.
- Voz elegida: `id_ID-news_tts-medium`; archivo ONNX de 62,950,044 bytes (aprox. 60 MiB) y configuración de 5 KB.
- **Importante: el MIT mostrado en el repositorio `rhasspy/piper-voices` no debe confundirse con la licencia de los datos de entrenamiento de esta voz.** La ficha del checkpoint indonesio identifica el dataset `s-sakti/data_indsp_news_tts` y CC BY-NC-SA 4.0. La voz debe tratarse como no comercial; conservar atribución y condiciones ShareAlike como enfoque conservador. La aplicación sigue siendo gratuita y no comercial. El efecto jurídico exacto de la licencia sobre los audios generados no está resuelto; esto no es asesoría legal. No usar esta voz si el proyecto pasa a ser comercial sin una nueva revisión de derechos.
- La ficha más reciente de `piper-voices` tiene metadatos de dataset inconsistentes; para la atribución/licencia se conserva la ficha original del checkpoint: https://huggingface.co/datasets/rhasspy/piper-checkpoints/blob/main/id/id_ID/news_tts/medium/MODEL_CARD. La cadena de entrenamiento también menciona una voz base `lessac`; revisar toda la cadena si cambia el uso previsto.
- El workflow descarga el modelo en el runner y no lo incorpora al repositorio ni a GitHub Pages.

### MMS-TTS
- Modelo alternativo evaluado: `facebook/mms-tts-ind`, licencia CC BY-NC 4.0 explícita (no comercial, sin cláusula ShareAlike); archivo de pesos de 145 MB. Su licencia es menos restrictiva que la cadena CC BY-NC-SA de la voz Piper, pero el usuario prefiere Piper y el proyecto es estrictamente no comercial.
- Requiere PyTorch CPU, Transformers, SentencePiece y SciPy. La descarga de PyTorch más Transformers y el modelo puede superar varios cientos de MB; estimación de instalación/carga: 8–25 minutos en runner estándar, variable por caché y disponibilidad. Es más pesado, pero no requiere servicio de síntesis externo.
- CC BY-NC 4.0 es no comercial. Para compartir la app gratis puede ser compatible bajo atribución y demás condiciones, pero no usar en un producto comercial ni asumir que cualquier adaptación queda cubierta sin revisar la licencia.

## Coste y límites

- Este repositorio es público. GitHub indica que los runners estándar alojados para repositorios públicos son gratuitos; no consumen la cuota mensual de minutos de repositorios privados. Se aplican límites máximos de ejecución y uso razonable de Actions.
- Edge/Piper normalmente serán ejecuciones cortas; MMS puede tardar más por la instalación y descarga. El workflow fija un máximo de 60 minutos como guardarraíl.
- El modelo Piper (60 MiB) y el modelo MMS (145 MB) solo se descargan en el runner. **No se suben al repositorio ni a GitHub Pages**.
- El tamaño real de audio se imprimirá por nivel en las ejecuciones completas. Se guardan dos codificaciones de la misma voz: Opus mono 24 kbps (180 KB/min) y MP3 mono 32 kbps (240 KB/min). A 2–4 segundos por clip, 2.000–3.000 clips estarían aproximadamente entre 28 y 84 MB en total. Es una estimación, no el inventario medido.
- GitHub Pages permite sitios publicados de hasta 1 GB, por lo que un conjunto de decenas de MB sería razonable. El repositorio actual reporta alrededor de 4.3 MB antes de audio. Vigilar el tamaño total y no incluir modelos TTS en el sitio.

## Plan de respaldo y Termux

Motor de producción seleccionado: Piper. MMS queda como alternativa técnica con licencia CC BY-NC 4.0 si la condición ShareAlike de Piper deja de ser aceptable; Edge no se recomienda para producción por depender de un servicio online mediante cliente no oficial. No se cambia automáticamente de motor dentro de una misma biblioteca: todas las frases finales deben salir de una única voz/motor elegido.

Termux queda como último recurso. En un Tecno Pova 4, ejecutar Piper puede ser técnicamente posible solo si existe un wheel ONNX Runtime ARM64 compatible y suficiente RAM/espacio, pero la instalación de dependencias nativas y ffmpeg puede ser problemática. MMS con PyTorch en Android/Termux es desproporcionado y no lo recomiendo. Edge TTS desde Termux seguiría dependiendo del servicio online y no resolvería los riesgos. GitHub Actions es la ruta sensata; no te pediré que instales ni ejecutes nada en el teléfono.

## Validación

Las pruebas de manifiesto comprueban IDs, niveles, índice y archivos MP3 físicos; no certifican naturalidad ni pronunciación. El usuario escuchó muestras y confirmó preferencia por Piper. El 14 nov 2026 confirmó en Tecno Pova 4 que un clip reproducido primero online volvió a sonar en modo avión sin voz indonesia instalada. Esa prueba valida el clip almacenado, no la biblioteca completa ni Safari/iOS. Consulta `docs/AUDIO.md` para los límites actuales y el plan de verificación.


## Resultado de comparación y decisión — 14 nov 2026

El usuario escuchó las muestras de los tres motores y mantiene preferencia por Piper. La decisión para el proyecto personal/no comercial es **Piper `id_ID-news_tts-medium`**: ofrece el tamaño más reducido y es la voz preferida por el usuario. La licencia de la voz debe tratarse como CC BY-NC-SA 4.0 por su dataset de entrenamiento; no confundir con el metadato MIT del repositorio ni con la GPL del paquete ejecutor. MMS tiene licencia CC BY-NC 4.0 explícita y por tanto condiciones menos restrictivas en ShareAlike, pero sus pesos son más grandes.

Tamaño medido de los 10 MP3 de prueba (mismos textos): Piper 60,114 bytes; MMS 76,386 bytes; Edge 121,890 bytes. Piper fue aprox. 21.3% menor que MMS y 50.7% menor que Edge en esta muestra. No extrapolar exactamente estos porcentajes a toda la biblioteca: medir el total de A1/A2/B1 después de generar.

La elección no certifica pronunciación nativa. La biblioteca ya está integrada. Antes de ampliar el comportamiento offline, completar la auditoría de cobertura, probar Range real de GitHub Pages y separar los cambios del Service Worker en PRs pequeños. Mantener atribución de dataset/modelo y no usar la voz con fines comerciales sin nueva revisión de derechos.
