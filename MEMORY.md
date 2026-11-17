# MEMORY.md — Estado de Bahasa Studio

> Memoria operativa; mantenerla por debajo de unas 150 líneas. Detalles extensos y evidencia histórica viven en documentos y PR enlazados. Última actualización: 17 nov 2026.

## Evaluación experimental de Laras — 17 nov 2026
- El usuario autorizó añadir infraestructura temporal para evaluar Laras, sin adoptarlo como motor ni alterar los audios de producción.
- Se prepara un workflow manual e independiente que ejecuta Laras en un contenedor CPU, descarga los pesos ONNX y la referencia CC0 solo bajo `RUNNER_TEMP`, genera 12 frases diagnósticas (incluidas «Selamat pagi» y «Makan») y publica los MP3 únicamente como artefacto temporal de GitHub Actions con retención de 7 días.
- La evaluación usa código Laras fijado al commit `e4ab05ca53a8cbf749405de5b1ac902b76880768`, imagen `ghcr.io/urdemonlord/laras-tts:0.2.1`, y el script upstream verifica SHA-256 de cada peso/referencia. La atribución del modelo Pocket TTS Indonesian (anak10thn, CC BY 4.0) viaja con el artefacto.
- No se añaden dependencias a la app, no se escriben modelos ni audios en Git/Pages, y no se cambian Piper, MMS, la biblioteca de producción, IndexedDB ni backup JSON v3. El resultado se escuchará y evaluará antes de cualquier decisión posterior.
- Fuentes: repositorio Laras README/NOTICE y script `scripts/unduh-model.sh`; aprobación explícita del usuario, 17 nov 2026.

## Generación de audio: modelos solo temporales — 17 nov 2026

- Se establece el límite arquitectónico: GitHub Actions descarga/usa los motores y modelos TTS en almacenamiento temporal del runner; el repositorio, GitHub Pages y la app solo reciben audios generados y metadatos necesarios. Nunca guardar modelos en Git, artefactos permanentes ni paquetes de la app.
- La implementación usa `RUNNER_TEMP` para cachés Piper/Hugging Face/Transformers/Torch, desactiva la caché de descargas pip y elimina el directorio temporal al terminar (también en fallo). Sin nuevas dependencias ni cambios a la biblioteca de producción, IndexedDB o backup JSON v3.
- Se documenta la separación para futuros idiomas: manifiesto y perfil de voz/modelo por idioma, adaptadores TTS reutilizables, audio estático por idioma. Indonesio sigue siendo el único idioma configurado; inglés solo después de completar indonesio hasta B2 y no se habilita aquí.
- Fuente: inspección de `scripts/generate_audio.py`, `.github/workflows/generate-audio.yml`, `AGENTS.md` y límites oficiales de GitHub Pages/Actions; 17 nov 2026. PR #648 fusionada como `ecb0776ce6c4881fd6860332a2558b2c1540cea9`; CI del head exacto verde.
