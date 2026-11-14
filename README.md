# Guardi (Bahasa Studio)

Guardi es una aplicación web progresiva (PWA) para estudiar indonesio desde español. Está diseñada para uso personal y funciona como una aplicación estática: no necesita una cuenta, un servidor propio ni una suscripción para estudiar el curso.

**Abrir la aplicación:** https://luisequeira612-commits.github.io/bahasa-studio/

## Qué incluye

- Interfaz y explicaciones en español.
- Lecciones, vocabulario y ejercicios de indonesio.
- Práctica y repaso espaciado con progreso guardado en el dispositivo.
- Diccionario del vocabulario del curso.
- Tutor local básico; las funciones con IA son opcionales.
- Biblioteca de audio indonesio pregenerado (Piper) con descarga bajo demanda y fallback de voz del dispositivo.
- Instalación como PWA y almacenamiento en caché para uso sin conexión.
- Exportación e importación del progreso mediante copias JSON versión 3.

El currículo sigue en desarrollo. Los indicadores estructurales automatizados ayudan a detectar problemas de datos y ejercicios, pero no certifican naturalidad del indonesio, nivel MCER/BIPA ni pronunciación nativa.

## Empezar

1. Abre el enlace de GitHub Pages en un navegador compatible.
2. Completa la primera carga con conexión para que el navegador pueda descargar la aplicación y los recursos disponibles.
3. En Android/Chrome, abre el menú del navegador y elige **Instalar aplicación** o **Añadir a pantalla de inicio** cuando aparezca la opción.
4. Abre Guardi desde el icono instalado. El curso y el progreso local no requieren una clave de IA.

La disponibilidad de instalación y de funciones PWA depende del navegador. El uso sin conexión depende de que los recursos necesarios se hayan descargado y guardado correctamente durante una visita con conexión.

## Datos, privacidad y copias de seguridad

- El progreso se guarda localmente en IndexedDB en el dispositivo y navegador que utilizas.
- No hay cuentas ni sincronización de progreso entre dispositivos.
- Exporta periódicamente una copia desde **Perfil → Exportar JSON** y guárdala fuera del dispositivo.
- La importación restaura el progreso compatible con el formato JSON v3.
- La clave opcional de Gemini se guarda localmente en el dispositivo, no forma parte de la copia JSON v3 y puede eliminarse desde la configuración del Tutor.
- No compartas una copia de seguridad ni una clave API con otras personas.

Borrar los datos del sitio, cambiar de navegador o perder el dispositivo puede hacer que pierdas el progreso si no conservas una copia externa.

## Funciones opcionales y servicios externos

### Gemini

El Tutor puede usar una clave propia de Google AI Studio si decides configurarla. Es opcional: el curso, las lecciones y el Tutor local siguen disponibles sin ella.

Al usar Gemini, el texto de tus consultas se envía a Google. Las cuotas, los límites y las condiciones gratuitas pueden cambiar; si tu cuenta tiene facturación habilitada, las llamadas podrían generar cargos. Para mantener el coste en cero, deja la clave vacía. No se realizan llamadas a Gemini durante el estudio normal de las lecciones.

### Audio y pronunciación

Las lecciones usan clips MP3 indonesios pregenerados con Piper cuando están disponibles; el primer acceso descarga el clip y el navegador puede guardarlo para reproducirlo offline después. Si falta el clip o falla la reproducción, el fallback depende de que el dispositivo tenga una voz indonesia compatible instalada. Los audios son sintéticos: no certifican pronunciación nativa ni sustituyen una revisión lingüística. La biblioteca completa no se descarga automáticamente. Consulta [la guía técnica de audio](docs/AUDIO.md) para conocer los límites de caché, cobertura y licencias.

La práctica de reconocimiento de voz solo se activa cuando pulsas el control correspondiente. El navegador puede enviar el audio a su propio proveedor de reconocimiento; su tratamiento depende del navegador y del sistema.

## Desarrollo y pruebas

La aplicación publicada es estática. El repositorio también contiene pruebas automatizadas y herramientas de auditoría curricular que se ejecutan durante el desarrollo y en GitHub Actions.

Requisitos para ejecutar las pruebas:

- Node.js 22.
- npm.
- Chromium instalado mediante Playwright para las pruebas de navegador.

Instalar las dependencias de desarrollo:

```sh
npm install
npx playwright install chromium
```

Ejecutar una prueba concreta:

```sh
node --test tests/regression.test.cjs
```

Las pruebas y los informes de calidad comprueban contratos de código, estructura de datos y regresiones reproducibles. Un resultado verde no sustituye una revisión lingüística nativa.

Para servir los archivos estáticos localmente, utiliza un servidor HTTP local desde la raíz del repositorio; no abras `index.html` directamente como archivo si quieres comprobar el service worker y el comportamiento PWA.

## Estructura general

- `index.html`: interfaz y lógica principal de la aplicación.
- `curriculum-a1.js`, `curriculum-a2.js`: datos curriculares externos de A1 y A2.
- `service-worker.js`: instalación y caché offline de recursos estáticos.
- `manifest.json`: metadatos de la PWA.
- `styles.css`: estilos de la aplicación.
- `audio-engine.js`, `pronunciation-engine.js`: reproducción de clips y reconocimiento de voz del navegador.
- `audio/`: manifiesto, índice y biblioteca de audio indonesio.
- `tests/`: pruebas automatizadas.
- `scripts/` y `docs/`: auditorías, informes y documentación de desarrollo.

Consulta `PROJECT_RULES.md`, `AGENTS.md` y `docs/` antes de realizar cambios técnicos o curriculares.

## Licencia y reutilización

Este repositorio no contiene actualmente un archivo `LICENSE`. Este README no asigna una licencia ni concede permisos adicionales para copiar, modificar o redistribuir el código o el contenido curricular. No debe asumirse una licencia por el hecho de que el repositorio sea públicamente visible.
