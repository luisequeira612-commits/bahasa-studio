# Evaluación de TTS indonesio gratuito y offline

Fecha: 14 nov 2026  
Estado: investigación inicial; no autoriza integración ni distribución de modelos.

## Objetivo

Encontrar una forma de proporcionar audio indonesio reproducible para cualquier usuario de Bahasa Studio, sin depender de voces instaladas en Android, sin backend/API de pago y conservando el funcionamiento offline. La primera vía preferida sigue siendo generar los audios de las lecciones una sola vez y distribuir archivos estáticos; no ejecutar un motor TTS pesado en cada teléfono.

## Candidato principal para la prueba: sanoTTS

- Modelo: [ampixa/sanoTTS](https://huggingface.co/ampixa/sanoTTS).
- La ficha declara una voz indonesia (`id-newstts-1p46m`), arquitectura Piperlite, aproximadamente 1,46 M parámetros y ejecución de navegador mediante WebAssembly.
- La demostración publicada permite introducir texto y sintetizar en el navegador: https://tts.ampixa.com/sanoTTS
- La ficha no publica una métrica de calidad comparable para la voz indonesia. Las puntuaciones SCOREQ/UTMOS mostradas corresponden a voces inglesas; no deben extrapolarse al indonesio.
- La licencia declarada para el proyecto completo es GPL-3.0. La documentación dice que la canalización incluye componentes GPL, entre ellos espeak-ng y Piper. Antes de incorporar runtime, redistribuir pesos o publicar audio generado, revisar la licencia y el alcance de cada artefacto por separado. No asumir que la licencia de código determina automáticamente los derechos de los archivos de audio generados.
- La ficha describe que el modelo de indonesio está disponible en el repositorio de pesos, pero el empaquetado de la voz para el paquete Python/Web y el espejo exacto de los archivos deben verificarse en una prueba reproducible.

## Candidato secundario: ArboTTS

- Proyecto: [ARBO-TEAM/arboTTS](https://github.com/ARBO-TEAM/arboTTS).
- Demo: https://arbo-team.github.io/arbotts-demo/
- El README anuncia ejecución client-side con WASM y una voz indonesia.
- El repositorio de código declara MIT, pero no se encontró una licencia inequívoca y separada para cada peso/modelo de la demo, ni evidencia suficiente para establecer la procedencia/licencia del modelo Paradee adaptado a indonesio.
- Por esa incertidumbre no se selecciona para distribución en Bahasa Studio. El modelo Paradee upstream consultado es inglés; no debe confundirse con la adaptación indonesia anunciada por ArboTTS.

## Diseño de la prueba manual inicial

Abrir la demo de sanoTTS desde Chrome Android y sintetizar estas frases, primero con la voz indonesia:

1. `Selamat pagi.`
2. `Nama saya Luis.`
3. `Saya sedang belajar bahasa Indonesia.`
4. `Apakah kamu sudah makan?`
5. `Terima kasih banyak.`

Registrar:
- si el navegador carga el modelo y genera sonido;
- si se oye en Chrome Android y en la PWA instalada;
- tiempo de carga inicial y tamaño de descarga observado;
- claridad, cortes, silencios, artefactos y consistencia;
- si la repetición funciona tras recargar y sin conexión (solo después de haber cargado los recursos);
- si el modelo y todos los recursos necesarios pueden alojarse desde GitHub Pages sin servicios externos en runtime.

La escucha de una persona no nativa puede detectar fallos audibles, pero no certificar pronunciación, acento ni naturalidad del indonesio. Mantener el estado lingüístico como `not_checked` hasta disponer de evidencia apropiada.

## Criterios para avanzar

No integrar hasta demostrar todos estos puntos:

1. El audio indonesio es claramente seleccionable y funciona en Android Chrome.
2. La experiencia no depende de voces instaladas en el dispositivo.
3. La carga inicial, RAM y tiempo de generación son razonables para un Tecno Pova 4.
4. El funcionamiento posterior offline está demostrado.
5. Se identifican licencias y atribuciones del código, runtime, fonemizador, pesos y cualquier recurso distribuido.
6. El audio generado se puede redistribuir legalmente con el alcance de Bahasa Studio (app gratuita y compartida sin monetización).
7. Se prueba un pequeño lote con palabras y frases reales de las lecciones antes de generar el inventario completo.

## Límites del cambio actual

Esta evaluación no modifica el motor de audio, el currículo, IndexedDB, el backup JSON v3, el service worker, dependencias ni recursos de producción. No instala ni incorpora ningún modelo. La decisión de arquitectura continúa siendo: preferir archivos de audio pre-generados para las lecciones, servidos como recursos estáticos y cacheables; TTS del dispositivo solo para texto dinámico, con rechazo seguro de voces de idioma incorrecto.
