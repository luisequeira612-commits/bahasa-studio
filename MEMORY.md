## 2026-11-25 — Fase 7: catálogo adaptativo centralizado y validado (PR #813 fusionada)

- PR [#813](https://github.com/luisequeira612-commits/bahasa-studio/pull/813) fusionada por squash en `main`; commit `1ed0785f50b86de1bbcd2da43b1697e425003d48`.
- `adaptive-learning.js` recibe explícitamente los códigos permitidos y mantiene la lógica pura; `index.html` inyecta `LanguageManager.list().map(({ code }) => code)`. Se elimina la expresión regular duplicada de diez idiomas.
- CI del head de PR: regresión 102/102 y calidad offline 10/10, ambos success. Verificación post-merge de `main`, run [#45543862267](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45543862267): test 101/101 pasos ejecutados sin fallos (un paso de empaquetado se omite en push) y calidad offline 10/10. GitHub Pages [#45543861839](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45543861839): build, informe y deploy success.
- La prioridad de recomendaciones y el umbral de diez intentos no cambian. Sin cambios a IndexedDB v1, backup JSON v3, persistencia, disponibilidad de cursos, currículos ni dependencias; `pt-BR` sigue `available:false`.
- La revisión posterior de módulos no encontró otra lista duplicada que justifique refactor: las referencias restantes a `id` preservan namespaces, datos históricos, fallback de voz o contenido específicamente indonesio. No se modifica por limpieza cosmética.
- Pendiente fuera de CI: prueba física en Tecno Pova 4 (720×1640); Chromium no la sustituye.

Fuente: PR #813, commit `1ed0785`, Actions #45543533062, #45543862267 y #45543861839; revisión de módulos de audio, progreso, historial y currículo; 25 nov 2026.

## 2026-11-25 — Fase 7: catálogo de progreso derivado de LanguageManager

- `progress-namespace.js` ya deriva los códigos admitidos de `LanguageManager.list()`, eliminando la segunda lista técnica que podía desincronizar la separación de progreso por idioma.
- `index.html` carga `language-manager.js` antes de `progress-namespace.js`; las pruebas usan el gestor real y además simulan un nuevo código catalogado para comprobar que no requiere editar una lista paralela.
- Se conserva el namespace legacy de indonesio, las claves `codigo::id` de otros idiomas y la lista independiente de ajustes de progreso. No cambia IndexedDB v1, backup JSON v3, disponibilidad de cursos, datos curriculares ni dependencias.

Fuente: `progress-namespace.js`, orden de scripts en `index.html` y `tests/progress-namespace.test.cjs`; 25 nov 2026.

## 2026-11-25 — Service Worker obtiene el catálogo de idiomas del LanguageManager

- La clasificación y separación de cachés de audio del Service Worker ya deriva los códigos admitidos de `LanguageManager.list()` mediante `importScripts('./language-manager.js')`, eliminando la lista duplicada que podía quedar desincronizada del catálogo central.
- Las pruebas de instalación, caché, rangos, pantalla de aprendizaje y piloto `pt-BR` cargan el LanguageManager real en el entorno aislado; se añade una comprobación de que el Service Worker refleja los diez códigos catalogados y sigue reconociendo `pt-BR` como ruta técnica sin habilitar el curso.
- El harness de `tests/learning-screen-phase-3.test.mjs` inicializa `languageManagerSource` después de crear `context`, evitando una referencia temporal antes de inicializarla detectada por la regresión completa de CI; se mantiene el catálogo real en el entorno VM.
- El harness de `tests/curriculum-extraction.test.js` también simula `importScripts('./language-manager.js')` con el archivo real antes de ejecutar el Service Worker, para conservar la cobertura de precache e invalidación de caché.
- No cambia `available`, la selección de cursos, los archivos de audio, la política de privacidad, IndexedDB v1 ni backup JSON v3. Los códigos `available:false` siguen sin ser seleccionables en la interfaz.

Fuente: `service-worker.js`, `language-manager.js` y pruebas `tests/service-worker-audio-cache.test.cjs` / `tests/service-worker-audio-range.test.cjs`; 25 nov 2026.

## 2026-11-25 — Mensaje de error de dictado ligado al idioma activo

- La ruta `language-not-supported` de la dictación en conversación ya no menciona indonesio de forma fija: utiliza el nombre del idioma activo obtenido de `LanguageManager`, igual que el locale de reconocimiento.
- La regresión simula `pt-BR` y comprueba que el mensaje de error mencione «portugués de Brasil», manteniendo la orientación en español.
- No cambia el comportamiento de privacidad, disponibilidad de cursos, contenido, IndexedDB v1, backup JSON v3 ni dependencias.

Fuente: `conversation-engine.js` y `tests/conversation-practice.test.cjs`; 25 nov 2026.
