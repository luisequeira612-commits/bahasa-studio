# Biblioteca de audio de Guardi

Última revisión del código y los artefactos: 14 nov 2026. Rama base inspeccionada: `main` en `2731fb50fa5f6d33e8d3252d548e82c4a2182864` (PR #593).

## Reproducción actual

- `audio-engine.js` normaliza el texto, calcula SHA-1 y utiliza los primeros 12 caracteres hexadecimales como ID.
- La normalización actual es exactamente: quitar espacios al inicio/final (`trim()`), colapsar secuencias de espacios (`/\s+/g`) a un espacio y convertir a minúsculas (`toLowerCase()`).
- No elimina puntuación final ni aplica normalización Unicode NFC/NFD/NFKC. Por tanto, la puntuación y las distintas representaciones Unicode pueden producir IDs distintos. No cambiar este algoritmo sin una migración coordinada de manifiesto, archivos y reproductor.
- El reproductor crea `new Audio('./audio/id/' + id + '.mp3')`. No utiliza Opus ni `canPlayType()` en la ruta principal actual.
- Si el MP3 no se reproduce, se conserva el fallback TTS del dispositivo; solo una voz indonesia instalada puede proporcionar ese respaldo.

## Manifiesto e identidad de los textos

`scripts/export-audio-manifest.mjs` recorre los niveles en orden fijo A1 → A2 → B1. El primer texto que produce un ID conserva el campo `text`; los encuentros posteriores añaden sus fuentes y niveles sin reemplazar esa variante. El exportador conserva el texto con espacios normalizados, pero respeta las mayúsculas/minúsculas de la primera aparición. Este orden hace determinista la variante que se envía al generador MMS-TTS.

El índice global `audio/index.json` contiene IDs únicos, no pertenencias por nivel. En la revisión de la rama base:

- 2.084 IDs únicos en la unión A1 ∪ A2 ∪ B1.
- 2.170 pertenencias acumuladas entre niveles.
- 86 textos compartidos: 21 entre A1–B1, 4 entre A1–A2 y 61 entre A2–B1.
- Archivos MP3: 2.084; tamaño conjunto 13.155.444 bytes (aprox. 12,54 MiB). Mediana 5.421 bytes; máximo 19.821 bytes.

Los recuentos son una fotografía de esta revisión, no cuotas ni constantes para pruebas. Las pruebas deben comprobar invariantes: unicidad, unión de niveles igual al manifiesto/índice y correspondencia con los MP3 físicos. Al mostrar progreso o peso de descarga, contar IDs únicos que faltan, no sumar tamaños completos de niveles superpuestos.

## Formatos

La biblioteca contiene MP3 y Opus para los mismos IDs. El reproductor principal verificado usa MP3. No borrar ni dejar de generar Opus hasta completar una búsqueda exhaustiva de consumidores y una decisión separada; la presencia de archivos Opus no demuestra que se utilicen en reproducción.

## Caché y uso offline: límites conocidos

- El Service Worker actual precarga `audio/index.json` y `audio/metadata.json`.
- Los MP3 se descargan y se guardan bajo demanda cuando se reproducen; la biblioteca completa no se precarga.
- La caché de recursos de la app usa un nombre versionado (`bahasa-studio-v3.8.99`). Los MP3 pasan a una caché persistente separada `guardi-audio-v2`, que no se elimina al actualizar la versión de la app.
- En la activación, el Service Worker copia MP3 completos (200 y cuerpo no vacío) desde todas las cachés antiguas `bahasa-studio-*` a `guardi-audio-v2`. Solo elimina las cachés antiguas después de completar todas las copias; si falla una copia, conserva las fuentes y sigue sirviendo desde ellas mientras reintenta en la siguiente activación.
- La migración es idempotente y no sobrescribe clips que ya están en la caché persistente. La nueva caché no incluye recursos generales de la aplicación.
- `audio/metadata.json` incorpora SHA-256 de cada MP3 cuando se ejecuta una generación completa. En la siguiente activación, el Service Worker comprueba los bytes de los clips persistidos y elimina solo los que cambiaron o ya no pertenecen al índice; los clips intactos sobreviven aunque se añadan IDs nuevos. La generación incrementa automáticamente la versión de caché de la app para activar esta comprobación.
- PR #585 registra `waitUntil()` sincrónicamente durante el evento fetch y trata los errores de `cache.put()` como fail-open. Solo guarda respuestas HTTP 200 completas; no almacena respuestas 206 parciales.
- La caché independiente mantiene la separación entre clips y recursos de la aplicación. PR #588 implementa Range 206/416 desde MP3 completos cacheados, sin almacenar respuestas parciales.
- Una prueba física en Tecno Pova 4 confirmó que un clip reproducido primero con conexión volvió a sonar en modo avión, sin voz indonesia instalada. Esto valida ese clip ya almacenado, no que toda la biblioteca esté disponible offline.
- No se ha probado Safari/iOS. No afirmar compatibilidad de reproducción Range en esos entornos.

## Licencias y trazabilidad

**Revisión: 15 nov 2026.** La selección de Piper `id_ID-news_tts-medium` sigue siendo provisional y no se considera autorizada para redistribuir sus audios hasta resolver la cadena completa.

- El paquete ejecutor `piper-tts` se instala en GitHub Actions y no se distribuye dentro de la PWA. Su licencia de código es GPL-3.0-or-later; esa licencia no concede derechos sobre las voces.
- La documentación oficial de Piper aclara que el campo `License` de un `MODEL_CARD` describe solo el dataset de esa voz, no los datasets de la voz base de la que se hizo fine-tuning. Piper no concede licencia propia sobre los modelos de voz y considera no resuelta la cuestión jurídica de si un modelo entrenado es obra derivada de sus corpus.
- La ficha histórica del checkpoint `id_ID-news_tts-medium` identifica `s-sakti/data_indsp_news_tts` con CC BY-NC-SA 4.0 y declara fine-tuning desde `en_US-lessac-medium`. La ficha actual de `rhasspy/piper-voices` muestra `See URL` para el dataset y mantiene el origen Lessac; la propia guía Piper dice que las fichas `See URL` aún no han sido revisadas.
- La guía oficial de Piper indica que `en_US-lessac-medium` procede del corpus Lessac Blizzard 2013, cuya licencia limita el uso a investigación/exploración de tecnologías de voz y excluye el uso comercial de la síntesis resultante. Piper declara que no tiene permiso de Lessac Technologies/CSTR ni representa que existan derechos downstream. Esto no determina por sí solo si un uso personal/no comercial de los audios generados está permitido: la condición de obra derivada y el alcance de la licencia sobre outputs siguen sin resolverse.
- La app incluye MP3 generados, no los pesos `.onnx`. Eso evita redistribuir directamente el modelo, pero no resuelve la situación jurídica de los audios generados. Si se fusiona la biblioteca B2, esos MP3 quedarían servidos públicamente por GitHub Pages.
- La PR [#625](https://github.com/luisequeira612-commits/bahasa-studio/pull/625) sigue como borrador. Su rama `audio/library-B2` pertenece al repositorio público: el estado «draft» no oculta la rama ni sus archivos. No afirmar que esos clips aún no son accesibles desde GitHub.
- Decisión conservadora: mantener B2 U6–U7 ocultas y no fusionar ni publicar esa biblioteca hasta obtener permiso/documentación suficiente o adoptar una voz alternativa con cadena compatible. No es asesoría legal ni una conclusión de infracción.

### Alternativa investigada: Pocket TTS Indonesian (no adoptada)

- [`anak10thn/pocket-tts-indonesian`](https://huggingface.co/anak10thn/pocket-tts-indonesian) declara CC BY 4.0, 502 horas de LEMAS y una base Kyutai Pocket TTS que también declara CC BY 4.0. La ficha base de Kyutai exige aceptar condiciones y compartir datos de Hugging Face para acceder a los pesos; el modelo no está disponible mediante Inference Providers.
- El student de seis capas ocupa 438 MB, declara 2,23× tiempo real en CPU y mediana WER 9,09% en 153 muestras; 4/153 superan 50% WER. UTMOS 2,68 refleja el audio de origen de 16 kHz. La ficha tiene una inconsistencia: la tabla actual marca 0 silencios a `eos -6.0` tras el reentrenamiento, mientras una viñeta de limitaciones todavía indica 2/153 (resultado previo). Advierte además que los dígitos y `!` son OOV, la narración formal está fuera de dominio y puede perder elementos de enumeraciones largas.
- Requiere `pocket-tts`/PyTorch 2.5+; en Linux la instalación por defecto puede descargar varios GB de wheels CUDA si no se fuerza el índice CPU. No está probado con frases de la app ni escuchado por el dueño.
- Estado: candidato de investigación, no una sustitución aprobada. No añadir dependencias, aceptar condiciones, crear secretos de CI, cambiar el generador ni regenerar audios sin aprobación explícita. El modelo no se propone para cargarlo en el teléfono.

Fuentes oficiales consultadas el 15 nov 2026:
- [Piper voice licensing](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/LICENSING.md)
- [Piper commercial-use list](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/COMMERCIAL_USE.md)
- [Checkpoint Piper indonesio](https://huggingface.co/datasets/rhasspy/piper-checkpoints/blob/main/id/id_ID/news_tts/medium/MODEL_CARD)
- [Ficha actual de la voz Piper](https://huggingface.co/rhasspy/piper-voices/blob/main/id/id_ID/news_tts/medium/MODEL_CARD)
- [Pocket TTS Indonesian](https://huggingface.co/anak10thn/pocket-tts-indonesian) y [modelo base Kyutai](https://huggingface.co/kyutai/pocket-tts).

**Pendiente de trazabilidad:** registrar el commit exacto del repositorio de voces y SHA-256 del `.onnx` y `.onnx.json` utilizados, junto con el campo dataset del JSON de configuración. No se afirma que esos hashes estén archivados actualmente.

## HTTP Range: sondeo y respuesta desde el Service Worker

El workflow manual `.github/workflows/audio-range-probe.yml` confirmó que GitHub Pages admite Range para los MP3 publicados. En la muestra del 14 nov 2026, GET normal devolvió 200 y `Range: bytes=0-1` devolvió 206 con `Content-Range: bytes 0-1/6765` y `Content-Length: 2`. El resultado se limita a ese endpoint de prueba.

La implementación integrada mediante PR #588 sigue esta estrategia:

- Quita el encabezado Range de la petición al origen y obtiene el archivo completo 200; solo ese archivo completo se guarda en `guardi-audio-v2`.
- Construye la respuesta 206 desde los bytes del MP3 completo, tanto si procede de red como de caché. Así Cache API nunca recibe una respuesta parcial.
- Admite un único rango `bytes=a-b`, abierto `bytes=a-` y sufijo `bytes=-n`; limita el final al tamaño real.
- Los rangos múltiples o mal formados se ignoran y reciben el archivo completo 200. Los rangos válidos pero no satisfacibles (inicio fuera del archivo o sufijo cero) reciben 416 con `Content-Range: bytes */size`.
- En 206 define `Content-Range`, `Content-Length`, `Content-Type` y `Accept-Ranges: bytes`; elimina metadatos de compresión/longitud de la respuesta completa al construir el fragmento.
- Una copia completa ya almacenada permite responder a Range también sin conexión; esto no implica que toda la biblioteca esté precargada. El primer uso de cada clip sigue requiriendo conexión o una copia previa.

Pruebas añadidas para rango cerrado, abierto, sufijo, final truncado, 416, rango inválido/múltiple, lectura offline y fallo de escritura de caché. No afirmar compatibilidad Safari/iOS hasta probarla físicamente.

## Secuencia de trabajo acordada

1. Documentar el estado y añadir invariantes de manifiesto/índice/archivos.
2. Ejecutar el workflow de sondeo Range y conservar su resultado antes de diseñar cambios.
3. Ampliar cobertura de orígenes de audio y pruebas de integridad en una PR independiente.
4. Separar los cambios del Service Worker: (a) guardado seguro y fallback abierto (PR #585); (b) caché independiente y migración segura (PR #586); (c) respuestas Range 206/416 (PR #588); (d) invalidación selectiva por contenido regenerado (PR #590).
5. Tras desplegar y superar pruebas automáticas, el propietario debe verificar físicamente actualización y reproducción offline en Android antes de autorizar descargas por nivel.

No modificar hashes, rutas, normalización, IndexedDB v1 ni backup JSON v3 durante esta fase. No añadir dependencias.


## Actualizar huellas sin volver a generar audio

El workflow manual [Generate Indonesian audio](https://github.com/luisequeira612-commits/bahasa-studio/actions/workflows/generate-audio.yml) ofrece el modo `hashes`. Este modo calcula SHA-256 de los MP3 ya presentes en `audio/id/`, actualiza `audio/metadata.json` y aumenta la versión del Service Worker solo si cambió el mapa. No instala motores TTS ni FFmpeg, no sintetiza ni descarga clips. El workflow crea/actualiza una PR para revisar metadata y Service Worker; tras fusionarla, el navegador precarga las huellas y activa la invalidación selectiva.


## Cobertura de audio estático en superficies interactivas — 14 nov 2026

La exportación normal mantiene la cobertura histórica de A1, A2 y B1 para que los checks de main sigan validando exactamente la biblioteca publicada. El exportador admite ahora la opción explícita --include-interactive, que incorpora además:

- audioText de ejercicios que se reproducen desde las lecciones (incluidos los ejercicios de opción múltiple).
- Los textos de escucha del banco de evaluaciones (audioText || answer).
- Cada línea de diálogo reproducible de los escenarios del tutor.
- La respuesta correcta de cada turno, que el botón de ejemplo del modo de conversación libre reproduce con audio.

Auditoría del código real del 14 nov 2026: 96 textos estáticos distintos tras deduplicar entre categorías; 28 ya estaban cubiertos y 68 carecían de clip. Los cuatro grupos contienen 97 entradas únicas contadas por categoría porque un texto aparece en dos grupos. Desglose por origen: 40 exercise-audioText (16 nuevos), 3 assessment-listen (2 nuevos), 27 conversation-turn (26 nuevos) y 27 conversation-example (24 nuevos). El resultado se deduplica con el SHA-1 de texto existente; no se cambian IDs ni normalización.

El tutor no intenta pregenerar las respuestas libres escritas por el usuario: siguen usando el fallback TTS del dispositivo cuando no hay clip. La reproducción dinámica no puede tener cobertura estática completa.

Tras integrar la PR de cobertura, la generación de los 68 clips pendientes se ejecutará con el workflow manual en engine=mms, mode=full, level=all, limit=0 y confirm_full=true, únicamente después de aprobar las muestras. El modo all recorre el manifiesto ampliado y el generador omite cada ID que ya tenga MP3 y Opus, por lo que solo sintetiza los clips que faltan. Los tests del workflow comparan manifiesto, índice y archivos físicos con la cobertura ampliada. El tamaño final esperado es 2.152 IDs únicos si el contenido no cambia antes de la generación.

Esta ampliación no precarga toda la biblioteca en el teléfono ni modifica la estrategia de caché offline: cada clip sigue descargándose al reproducirse por primera vez.


## Preparar la biblioteca para uso sin conexión

La pantalla Perfil ofrece preparación explícita por nivel (A1, A2 o B1) y una opción para toda la biblioteca. No hay descargas automáticas. Se recomienda Wi-Fi porque la operación usa conexión y almacenamiento del dispositivo.

El gestor consulta `audio/manifest.json` y `audio/metadata.json`, deduplica los IDs compartidos entre niveles y reutiliza los MP3 ya presentes en `guardi-audio-v2`. Descarga de uno en uno, verifica el SHA-256 del archivo contra metadata y solo entonces lo guarda en la caché persistente. La petición de descarga verificada omite el guardado automático del Service Worker para evitar almacenar una respuesta antes de comprobar su integridad.

El progreso se basa en los audios ya guardados, permite cancelar y reanudar (los clips completos permanecen), y ofrece reintento de los fallidos. Si el navegador informa menos de 1 MB disponible o la escritura alcanza la cuota, la operación se detiene sin borrar los clips que ya se guardaron. La estimación de almacenamiento del navegador no predice el tamaño exacto restante de la biblioteca.

La preparación completa no incluye respuestas libres dinámicas del Tutor, porque no existen como archivos estáticos. Tampoco descarga Opus: el reproductor actual utiliza MP3. No se alteran el texto curricular, `audio-engine.js`, SHA-1 de texto, rutas, normalización, IndexedDB v1 ni backup JSON v3.


## Migración a MMS-TTS — 17 nov 2026

La generación futura de audio de Guardi usa **MMS-TTS** de Meta AI (`facebook/mms-tts-ind`), fijado a la revisión `171b004ccd54f266a31efee71f1ad850c91d39c0`. El generador usa `VitsModel` y `AutoTokenizer` de Transformers, PyTorch en CPU, semilla fija por frase y texto en minúsculas. El modelo y sus dependencias se descargan solo durante GitHub Actions a almacenamiento temporal del runner; no se añaden dependencias ni pesos a la PWA.

**Atribución:** MMS-TTS, de Vineel Pratap et al. / Meta AI, bajo [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/). Guardi es un proyecto no comercial. Esta licencia prohíbe el uso comercial; no debe describirse como permiso para comercializar la aplicación o sus audios. La atribución no sustituye el cumplimiento de las condiciones de la licencia.

La migración conserva el SHA-1 existente que determina cada ID, los mismos nombres de archivo MP3/Opus en `audio/id/` y el SHA-256 de cada MP3 en `audio/metadata.json`. No modifica IndexedDB v1 ni el backup JSON v3. La caché persistente pasa de `guardi-audio-v2` a `guardi-audio-v2`; al activar el nuevo Service Worker se elimina la caché v1 para impedir que los clips Piper antiguos se reutilicen.

### Overrides fonéticos y muestras

`scripts/pronunciation_overrides.json` contiene reemplazos exclusivos para síntesis. Nunca modifica `audio/manifest.json`, el texto mostrado, el ID SHA-1 ni el texto visible en la app. Se mantiene vacío hasta que el dueño apruebe una pronunciación. El workflow manual genera 30 frases A1 con MMS y tres muestras adicionales de «Selamat pagi» con las variantes `pa gi`, `pa-gi` y `paghi`. El pack se entrega como artefacto temporal de GitHub Actions, con retención de 7 días; no sustituye ni regenera la biblioteca.

**Gate de publicación:** no regenerar los 2.152 audios de producción hasta que el dueño escuche y apruebe las muestras. La generación completa exige confirmación manual explícita y queda restringida a MMS. Las muestras no constituyen certificación de pronunciación nativa ni validación lingüística.
