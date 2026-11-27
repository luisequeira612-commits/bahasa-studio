# Guardi — Aprende idiomas

Guardi (antes Bahasa Studio) es una aplicación web progresiva (PWA) para aprender idiomas desde el español. Está diseñada para uso personal, con una interfaz y explicaciones en español, y funciona como una aplicación estática: no necesita cuentas, un servidor propio ni una suscripción para estudiar.

**Abrir la aplicación:** https://luisequeira612-commits.github.io/bahasa-studio/

## Idiomas y cursos

Guardi se está convirtiendo en una plataforma multilingüe. Los idiomas del catálogo no se habilitan automáticamente: cada curso debe tener contenido real y superar sus comprobaciones antes de aparecer como disponible.

| Idioma | Estado |
|---|---|
| Portugués brasileño (pt-BR) | Disponible: A1, A2, B1 y B2 |
| Indonesio (id) | Disponible: A1 y A2 |
| Inglés estadounidense (en-US) | En desarrollo; el currículo B2 está en revisión editorial y todavía no se publica ni se puede seleccionar |
| Italiano, francés, alemán, neerlandés, ruso, japonés y coreano | En preparación; todavía no son cursos seleccionables |

El catálogo técnico contempla diez idiomas, pero eso no significa que los diez cursos estén terminados. La disponibilidad real depende del contenido y de las pruebas de cada curso.

## Qué incluye

- Interfaz, navegación, instrucciones y explicaciones en español.
- Cursos organizados por niveles y unidades, con vocabulario, lecciones y ejercicios.
- Práctica y repaso del vocabulario con progreso guardado en el dispositivo.
- Diccionario del vocabulario incluido en los cursos.
- Audio sintético pregenerado para indonesio y portugués brasileño, con descarga bajo demanda y almacenamiento en caché para reutilizarlo sin conexión cuando ya se haya descargado.
- Instalación como PWA y almacenamiento en caché para uso offline.
- Exportación e importación del progreso mediante copias JSON versión 3.

El audio es sintético y no equivale a una grabación de hablante nativo ni a una certificación de pronunciación. Las voces y los clips disponibles dependen del idioma y del contenido que ya se haya generado.

## Empezar

1. Abre el enlace de GitHub Pages en un navegador compatible.
2. Completa la primera carga con conexión para que el navegador pueda descargar la aplicación y los recursos disponibles.
3. En Android/Chrome, abre el menú del navegador y elige **Instalar aplicación** o **Añadir a pantalla de inicio** cuando aparezca la opción.
4. Abre Guardi desde el icono instalado y selecciona uno de los cursos disponibles.

La disponibilidad de instalación y de funciones PWA depende del navegador. El uso sin conexión depende de que los recursos necesarios se hayan descargado y guardado correctamente durante una visita con conexión. Los clips de audio que todavía no se han descargado pueden necesitar conexión la primera vez.

## Datos, privacidad y copias de seguridad

- El progreso se guarda localmente en IndexedDB en el dispositivo y navegador que utilizas.
- No hay cuentas ni sincronización de progreso entre dispositivos.
- Los cursos y el progreso básico no requieren una clave API ni una suscripción.
- Exporta periódicamente una copia desde **Perfil → Exportar JSON** y guárdala fuera del dispositivo.
- La importación restaura el progreso compatible con el formato JSON v3.

Borrar los datos del sitio, cambiar de navegador o perder el dispositivo puede hacer que pierdas el progreso si no conservas una copia externa.

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

Las pruebas y los informes de calidad comprueban contratos de código, estructura de datos y regresiones reproducibles. Un resultado verde no sustituye una revisión lingüística competente ni certifica por sí solo el nivel MCER de un curso.

Para servir los archivos estáticos localmente, utiliza un servidor HTTP local desde la raíz del repositorio; no abras `index.html` directamente como archivo si quieres comprobar el service worker y el comportamiento PWA.

## Estructura general

- `index.html`: interfaz y lógica principal de la aplicación.
- `language-manager.js`: catálogo de idiomas y estado de disponibilidad de los cursos.
- `languages/<idioma>/curriculum/`: currículos organizados por idioma y nivel.
- `service-worker.js`: instalación y caché offline de recursos estáticos.
- `manifest.json`: metadatos de la PWA.
- `styles.css`: estilos de la aplicación.
- `audio-engine.js`, `pronunciation-engine.js`: reproducción de clips y reconocimiento de voz del navegador.
- `audio/`: manifiestos, índices y bibliotecas de audio por idioma.
- `tests/`: pruebas automatizadas.
- `scripts/` y `docs/`: auditorías, informes y documentación de desarrollo.

Consulta `PROJECT_RULES.md`, `AGENTS.md` y `docs/` antes de realizar cambios técnicos o curriculares. La documentación operativa puede contener notas históricas; este README describe el estado de disponibilidad indicado por el catálogo de idiomas y debe mantenerse sincronizado con él.

## Licencia y reutilización

Este repositorio no contiene actualmente un archivo `LICENSE`. Este README no asigna una licencia ni concede permisos adicionales para copiar, modificar o redistribuir el código o el contenido curricular. No debe asumirse una licencia por el hecho de que el repositorio sea públicamente visible.
