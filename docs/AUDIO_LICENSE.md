# Licencia y procedencia del audio

Revisión: 15 nov 2026.

## Decisión

La biblioteca de producción deja de generar audio nuevo con Piper. El motor de producción pasa a **MMS Indonesian** (facebook/mms-tts-ind) con una revisión inmutable.

La razón es reducir el riesgo de procedencia que existía con id_ID-news_tts-medium: su historial documenta un dataset CC BY-NC-SA 4.0 y un fine-tuning desde en_US-lessac-medium; la documentación oficial de Piper advierte que no concede derechos sobre los modelos de voz y que la situación jurídica de los outputs derivados de los corpus no está resuelta.

MMS Indonesian publica explícitamente su modelo bajo **CC BY-NC 4.0**, sin la cadena Lessac del modelo Piper. La revisión fijada es:

- Modelo: facebook/mms-tts-ind
- Revisión: 171b004ccd54f266a31efee71f1ad850c91d39c0
- SHA-256 del peso model.safetensors: d56181bae3a51458aab6b4a893ecd71d0fde69378f576c53e139b59940d80ca0
- Licencia declarada: CC BY-NC 4.0
- Fuente: https://huggingface.co/facebook/mms-tts-ind/tree/171b004ccd54f266a31efee71f1ad850c91d39c0

## Qué se redistribuye

Bahasa Studio no distribuye los pesos del modelo dentro de la PWA. Distribuye únicamente archivos MP3/Opus generados durante el pipeline de GitHub Actions.

La licencia CC BY-NC 4.0 es una mejora clara frente a la procedencia anterior, pero no debe describirse como una garantía jurídica absoluta sobre cualquier output de TTS. La aplicación es gratuita y no comercial, y debe conservar atribución de la fuente del modelo en esta documentación.

## Migración

La regeneración de producción debe ejecutarse con:

- engine: mms
- mode: full
- level: all
- limit: 0
- confirm_full: true

El workflow fuerza --force para que los MP3/Opus existentes no sean reutilizados: todos los clips de producción deben proceder del nuevo motor. No se cambia el ID SHA-1 de los textos, las rutas, IndexedDB, backup JSON v3 ni el reproductor.

Piper queda disponible únicamente para muestras históricas/diagnóstico. El workflow rechaza una generación full con Piper.

## Atribución

MMS-TTS fue desarrollado por Vineel Pratap et al. como parte del proyecto Massively Multilingual Speech de Meta AI. La referencia del proyecto y la licencia están en la ficha oficial del modelo.

La licencia del motor de inferencia (Transformers/PyTorch) es independiente de la licencia del modelo; el pipeline no incorpora esos paquetes en la PWA.
