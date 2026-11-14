# Biblioteca de audio de Guardi

Última revisión del código y los artefactos: 14 nov 2026. Rama base inspeccionada: `main` en `ad2f96a53e71153d92012efc953df8b7396d0628`.

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
- Los recursos de la aplicación usan una caché versionada; los MP3 usan la caché persistente independiente `guardi-audio-v1`. Durante activación, el Service Worker migra clips completos HTTP 200 desde las cachés antiguas `bahasa-studio-*` y solo las elimina si la migración termina sin errores.
- `audio/metadata.json` incluye SHA-256 por ID MP3. Si cambia el contenido de un clip existente, ese clip se invalida; añadir IDs nuevos no invalida los clips anteriores. La migración solo copia IDs presentes en la biblioteca actual y no sobrescribe una copia ya válida.
- Las respuestas 206 no se guardan como archivos completos; los fetch con cabecera Range tampoco se guardan todavía. El manejo de respuestas Range 206/416 sigue siendo un cambio separado.
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

## Comprobación de HTTP Range

No inferir el comportamiento de GitHub Pages por la prueba offline ni por documentación general. El workflow manual `.github/workflows/audio-range-probe.yml` consulta un MP3 publicado mediante GET normal, GET con `Range: bytes=0-1` y la misma petición con `Accept-Encoding: identity`. Registrar código HTTP y cabeceras:

- `200` en la petición Range significa que el servidor entregó el recurso completo e ignoró Range.
- `206` debe incluir `Content-Range` coherente y `Content-Length: 2`.
- No declarar el resultado hasta ejecutar el workflow contra Pages publicado.

La documentación HTTP describe los significados de 200, 206 y 416, pero no prueba el comportamiento concreto de GitHub Pages: [MDN — Range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests).

## Secuencia de trabajo acordada

1. Documentar el estado y añadir invariantes de manifiesto/índice/archivos.
2. Ejecutar el workflow de sondeo Range y conservar su resultado antes de diseñar cambios.
3. Ampliar cobertura de orígenes de audio y pruebas de integridad en una PR independiente.
4. Separar los cambios del Service Worker: (a) guardado seguro y fallback abierto; (b) caché independiente, migración e invalidación; (c) respuestas Range 206/416.
5. Tras desplegar y superar pruebas automáticas, el propietario debe verificar físicamente actualización y reproducción offline en Android antes de autorizar descargas por nivel.

No modificar hashes, rutas, normalización, IndexedDB v1 ni backup JSON v3 durante esta fase. No añadir dependencias.
