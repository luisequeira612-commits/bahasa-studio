# Licencia y procedencia del audio

Revisión: 21 nov 2026.

## Decisión de producción

La voz principal de producción es **Piper Indonesian — id_ID-news_tts-medium**. Edge TTS queda como alternativa/fallback cuando el flujo lo permita. MMS Indonesian queda fuera de la producción: en las pruebas del dueño su pronunciación no resultó satisfactoria, mientras que Piper y Edge sí fueron aceptados para el uso previsto.

La elección de Piper fue explícita del dueño después de escuchar las muestras. La app sigue siendo gratuita y no comercial; no distribuye los pesos del modelo dentro de la PWA. El pipeline genera y distribuye únicamente los archivos de audio MP3/Opus seleccionados.

## Procedencia y límites de licencia

- Proyecto/repositorio de voces: [rhasspy/piper-voices](https://huggingface.co/rhasspy/piper-voices/tree/main/id/id_ID/news_tts/medium).
- Voz: id_ID-news_tts-medium.
- El repositorio del modelo declara MIT; la licencia y procedencia del conjunto de datos de entrenamiento no están documentadas de forma suficiente en la ficha consultada.
- La revisión anterior identificó una posible procedencia CC BY-NC-SA 4.0 del dataset y fine-tuning desde en_US-lessac-medium. La documentación de Piper advierte que la licencia del código no concede automáticamente derechos sobre los modelos o los datos de voz.
- Por tanto, **no se afirma que todos los derechos de los audios generados estén jurídicamente despejados**. El dueño decidió asumir esta incertidumbre para un proyecto personal, gratuito y no comercial. Esta decisión de producto no es asesoría ni garantía legal.

## Pipeline

- Motor de producción: piper.
- Voz: id_ID-news_tts-medium.
- Motor alternativo: Edge TTS, sujeto a conectividad y disponibilidad del servicio.
- MMS: no usar para generar nuevas voces ni clips de producción.
- Workflow principal: .github/workflows/generate-audio.yml.
- Para lotes pequeños se utiliza .github/workflows/dispatch-selected-piper-audio.yml con una solicitud JSON que enumera textos exactos e IDs resueltos desde el manifiesto B2.
- No regenerar la biblioteca completa para añadir unas pocas frases. Generar solo los IDs seleccionados y verificar MP3, manifiesto, índice y hashes.

## Atribución

Atribución del motor/modelo: Piper, rhasspy/piper-voices, voz Indonesian id_ID-news_tts-medium. El repositorio del proyecto Piper y la ficha de la voz deben mantenerse como referencias de procedencia. La atribución no sustituye la verificación de los derechos del dataset ni determina por sí sola el estatus legal de cada salida.

