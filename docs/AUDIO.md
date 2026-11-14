# Biblioteca de audio de Guardi

Última revisión del código y los artefactos: 14 nov 2026. Rama base inspeccionada: `main` en `2731fb50fa5f6d33e8d3252d548e82c4a2182864` (PR #593).

## Reproducción actual

- `audio-engine.js` normaliza el texto, calcula SHA-1 y utiliza los primeros 12 caracteres hexadecimales como ID.
- La normalización actual es exactamente: quitar espacios al inicio/final (`trim()`), colapsar secuencias de espacios (`/\s+/g`) a un espacio y convertir a minúsculas (`toLowerCase()`).
- No elimina puntuación final ni aplica normalización Unicode NFC/NFD/NFKC. Por tanto, la puntuación y las distintas representaciones Unicode pueden producir IDs distintos. No cambiar este algoritmo sin una migración coordinada de manifiesto, archivos y reproductor.
- El reproductor crea `new Audio('./audio/id/' + id + '.mp3')`. No utiliza Opus ni `canPlayType()` en la ruta principal actual.
- Si el MP3 no se reproduce, se conserva el fallback TTS del dispositivo; solo una voz indonesia instalada puede proporcionar ese respaldo.

## Manifiesto e identidad de los textos

`scripts/export-audio-manifest.mjs` recorre los niveles en orden fijo A1 → A2 → B1. El primer texto que produce un ID conserva el campo `text`; los encuentros posteriores añaden sus fuentes y niveles sin reemplazar esa variante. El exportador conserva el texto con espacios normalizados, pero respeta las mayúsculas/minúsculas de la primera aparición. Este orden hace determinista la variante que se envía al generador Piper.

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
- La caché de recursos de la app usa un nombre versionado (`bahasa-studio-v3.8.99`). Los MP3 pasan a una caché persistente separada `guardi-audio-v1`, que no se elimina al actualizar la versión de la app.
- En la activación, el Service Worker copia MP3 completos (200 y cuerpo no vacío) desde todas las cachés antiguas `bahasa-studio-*` a `guardi-audio-v1`. Solo elimina las cachés antiguas después de completar todas las copias; si falla una copia, conserva las fuentes y sigue sirviendo desde ellas mientras reintenta en la siguiente activación.
- La migración es idempotente y no sobrescribe clips que ya están en la caché persistente. La nueva caché no incluye recursos generales de la aplicación.
- `audio/metadata.json` incorpora SHA-256 de cada MP3 cuando se ejecuta una generación completa. En la siguiente activación, el Service Worker comprueba los bytes de los clips persistidos y elimina solo los que cambiaron o ya no pertenecen al índice; los clips intactos sobreviven aunque se añadan IDs nuevos. La generación incrementa automáticamente la versión de caché de la app para activar esta comprobación.
- PR #585 registra `waitUntil()` sincrónicamente durante el evento fetch y trata los errores de `cache.put()` como fail-open. Solo guarda respuestas HTTP 200 completas; no almacena respuestas 206 parciales.
- La caché independiente mantiene la separación entre clips y recursos de la aplicación. PR #588 implementa Range 206/416 desde MP3 completos cacheados, sin almacenar respuestas parciales.
- Una prueba física en Tecno Pova 4 confirmó que un clip reproducido primero con conexión volvió a sonar en modo avión, sin voz indonesia instalada. Esto valida ese clip ya almacenado, no que toda la biblioteca esté disponible offline.
- No se ha probado Safari/iOS. No afirmar compatibilidad de reproducción Range en esos entornos.

## Licencias y trazabilidad

La selección actual es Piper `id_ID-news_tts-medium` para el proyecto personal, gratuito y no comercial.

- El paquete ejecutor `piper-tts` se instala y ejecuta en GitHub Actions; no se distribuye dentro de la PWA. Su licencia de paquete es GPL-3.0-or-later.
- El metadato MIT del repositorio de voces no debe interpretarse como licencia de los pesos ni de los datos de entrenamiento.
- La ficha original del checkpoint identifica el dataset indonesio `s-sakti/data_indsp_news_tts`, con licencia CC BY-NC-SA 4.0. Mantener atribución y enfoque no comercial/conservador.
- No está resuelta la cuestión jurídica de si los audios generados son obras derivadas sujetas a ShareAlike. Esto no es asesoría legal.
- La ficha actual de voces y la ficha histórica del checkpoint presentan metadatos de dataset discrepantes. Antes de cualquier uso comercial, donaciones, anuncios o distribución en tiendas, revisar de nuevo la cadena completa y consultar a los titulares si hace falta.

Fuentes de licencia consultadas el 14 nov 2026:
- [Piper TTS en PyPI](https://pypi.org/project/piper-tts/)
- [Repositorio Piper voices](https://github.com/rhasspy/piper-voices)
- [Ficha original del checkpoint indonesio](https://huggingface.co/datasets/rhasspy/piper-checkpoints/blob/main/id/id_ID/news_tts/medium/MODEL_CARD)
- [Dataset indonesio](https://huggingface.co/datasets/s-sakti/data_indsp_news_tts)
- [Licencia CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

**Pendiente de trazabilidad:** registrar el commit exacto del repositorio de voces y SHA-256 del `.onnx` y `.onnx.json` utilizados, junto con el campo dataset del JSON de configuración. No se afirma que esos hashes estén archivados actualmente.

## HTTP Range: sondeo y respuesta desde el Service Worker

El workflow manual `.github/workflows/audio-range-probe.yml` confirmó que GitHub Pages admite Range para los MP3 publicados. En la muestra del 14 nov 2026, GET normal devolvió 200 y `Range: bytes=0-1` devolvió 206 con `Content-Range: bytes 0-1/6765` y `Content-Length: 2`. El resultado se limita a ese endpoint de prueba.

La implementación integrada mediante PR #588 sigue esta estrategia:

- Quita el encabezado Range de la petición al origen y obtiene el archivo completo 200; solo ese archivo completo se guarda en `guardi-audio-v1`.
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

El workflow manual [Generate Indonesian audio](https://github.com/luisequeira612-commits/bahasa-studio/actions/workflows/generate-audio.yml) ofrece el modo `hashes`. Este modo calcula SHA-256 de los MP3 ya presentes en `audio/id/`, actualiza `audio/metadata.json` y aumenta la versión del Service Worker solo si cambió el mapa. No instala Piper, no instala FFmpeg, no sintetiza ni descarga clips. El workflow crea/actualiza una PR para revisar metadata y Service Worker; tras fusionarla, el navegador precarga las huellas y activa la invalidación selectiva.


## Cobertura de audio estático en superficies interactivas — 14 nov 2026

La exportación normal mantiene la cobertura histórica de A1, A2 y B1 para que los checks de main sigan validando exactamente la biblioteca publicada. El exportador admite ahora la opción explícita --include-interactive, que incorpora además:

- audioText de ejercicios que se reproducen desde las lecciones (incluidos los ejercicios de opción múltiple).
- Los textos de escucha del banco de evaluaciones (audioText || answer).
- Cada línea de diálogo reproducible de los escenarios del tutor.
- La respuesta correcta de cada turno, que el botón de ejemplo del modo de conversación libre reproduce con audio.

Auditoría del código real del 14 nov 2026: 97 entradas únicas contadas por categoría de origen en esas cuatro superficies. Tras deduplicar entre categorías y contrastar con la biblioteca actual, el exportador añade 68 IDs nuevos. Desglose por origen: 40 exercise-audioText (16 nuevos), 3 assessment-listen (2 nuevos), 27 conversation-turn (26 nuevos) y 27 conversation-example (24 nuevos). El resultado se deduplica con el SHA-1 de texto existente; no se cambian IDs ni normalización.

El tutor no intenta pregenerar las respuestas libres escritas por el usuario: siguen usando el fallback TTS del dispositivo cuando no hay clip. La reproducción dinámica no puede tener cobertura estática completa.

Tras integrar la PR de cobertura, la generación de los 68 clips pendientes se ejecutará con el workflow manual en engine=piper, mode=full, level=all, limit=0 y confirm_full=true. El modo all recorre el manifiesto ampliado y el generador omite cada ID que ya tenga MP3 y Opus, por lo que solo sintetiza los clips que faltan. Los tests del workflow comparan manifiesto, índice y archivos físicos con la cobertura ampliada. El tamaño final esperado es 2.152 IDs únicos si el contenido no cambia antes de la generación.

Esta ampliación no precarga toda la biblioteca en el teléfono ni modifica la estrategia de caché offline: cada clip sigue descargándose al reproducirse por primera vez.
