## 2026-11-26 — Corrección de secuencia didáctica A1 U11 L2

- La auditoría contextual aisló un aviso concreto en U11: la lección 2 tenía un ejercicio de escritura con `vocabId: v151` cuyo modelo «Jam tujuh tepat» y su pista exponían `Tepat` antes de su introducción formal en la lección 3 (`v156`). El ejercicio además se presentaba como producción de «las siete en punto».
- Se corrigieron la fuente de ejercicios de U11 y su copia en L2 para trabajar únicamente vocabulario ya disponible: prompt «Escribe una frase para decir que son las siete», pista «Usa jam y tujuh», modelo «Jam tujuh.» y explicación correspondiente. También se retiró `tepat` de la explicación gramatical de L2; la palabra y su ejemplo quedan para L3.
- Se añadió una regresión que inspecciona U11 L2 y bloquea cualquier aparición de `Tepat/tepat` antes de L3.
- Alcance limitado a currículo y prueba; sin cambios de runtime, IndexedDB v1, backup JSON v3, dependencias ni audio.
- Fuente: `curriculum-quality-report` del run #45732887040 y revisión directa de `curriculum-a1.js`; 26 nov 2026.

## 2026-11-25 — Persistencia E2E de la aprobación de evaluación final

- La E2E existente de progresión ya comprobaba evaluación insuficiente → unidad siguiente bloqueada → evaluación aprobada → unidad siguiente desbloqueada.
- Se refuerza la misma prueba para leer `completedUnits` directamente desde IndexedDB después de aprobar y, tras recargar la aplicación, confirmar que la unidad aprobada sigue guardada y que la siguiente continúa desbloqueada.
- Cambio exclusivo de pruebas en `tests/browser-e2e.test.cjs`; sin cambios de runtime, currículo, esquema IndexedDB v1, backup JSON v3 ni dependencias.
- Fuente: prueba E2E de progresión existente y ampliación de sus aserciones; 25 nov 2026.

## 2026-11-25 — Normalización transversal de respuestas escritas

- El evaluador de respuestas escritas elimina diacríticos antes de comparar cualquier respuesta, también en indonesio; conserva la normalización de mayúsculas, puntuación y espacios. «Saya dari Perú» y «saya dari peru» se aceptan para «Saya dari Peru.».
- En respuestas incorrectas, el feedback deja de repetir explicaciones curriculares que no describen el error. Solo muestra una diferencia de palabra cuando puede identificar exactamente una sustitución; en los demás casos conserva «Incorrecto» y la respuesta esperada.
- Se aplica a las rutas de texto que usan `WrittenResponse.compare()` (escucha/dictado, traducción y completar). La redacción libre `write` continúa como autoevaluación, no como coincidencia exacta.
- Pruebas de regresión para tildes, mayúsculas, signos, espacios dobles y diferencias de una palabra. Sin cambios a IndexedDB v1, backup JSON v3, currículo ni dependencias.
- Fuente: reproducción reportada por el usuario en A1 U3 L5 y revisión de `WrittenResponse.normalize/compare` y `LessonEngine.checkTranslate`; 25 nov 2026.

## 2026-11-25 — Refuerzo SRS dirigido y resolución temporal de marcas manuales

- La acción adaptativa «Practicar estas palabras» limita la sesión SRS a los IDs recomendados; la tarjeta general «Repasar» conserva su cola normal.
- Una respuesta exitosa dentro de las 12 horas ya no deja intacta la fecha de revisión: asegura repetición e intervalo mínimos de un día y actualiza `lastReviewed`/`nextReview`, conservando el último grado y los contadores históricos.
- La fusión de snapshots SRS resuelve `savedForReview` según el evento explícito más reciente (`markedAt`, con fallback a `lastReviewed`), para que una marca antigua no prevalezca sobre una calificación posterior.
- Se añaden pruebas de regresión para la sesión dirigida, el avance del próximo repaso y el estado manual más reciente.
- Sin cambios al esquema IndexedDB v1, backup JSON v3, currículo ni dependencias. Pendiente CI y validación funcional en el dispositivo.
- Fuente: revisión de PR #835/#836 contra `main` después de #838 y logs de Actions; 25 nov 2026.

## 2026-11-25 — Corrección adicional del recomendador: conservar la última calidad al agregar duplicados

- La corrección anterior almacenaba `lastQuality` en cada registro SRS, pero la vista adaptativa agrega varios IDs de vocabulario con el mismo término en `srsByWord` y solo sumaba contadores. No copiaba la última calidad al agregado; por eso `history.lastQuality` seguía siendo `undefined` y las palabras con errores históricos volvían a pasar el filtro.
- Se añade `AdaptiveLearning.updateLatestSrsQuality()` para conservar en el agregado la calidad del registro con `lastReviewed` más reciente. La marca temporal auxiliar solo vive en memoria y no cambia IndexedDB ni backup v3.
- El recomendador también descarta calificaciones exitosas en `weakWords` y `isolatedWords`, tanto en la selección de la vista como en el módulo `adaptive-learning.js`. Las palabras guardadas manualmente siguen teniendo prioridad.
- Se agregan pruebas de precedencia temporal, exclusión de calidad 3/5, y excepción de guardado manual.
- Fuente: inspección del flujo real `DB.getAll('srs') → srsByWord → rankedWordHistory → weakWords → AdaptiveLearning.recommend()`; 25 nov 2026.

## 2026-11-25 — Corrección de recomendación SRS tras calificar «Bien»

- Diagnóstico: el registro `recordAttempt()` limpiaba `savedForReview`, pero no conservaba la última calificación; además, el filtro adaptativo seguía considerando débil una palabra solo por `incorrect >= 2`. Por eso una palabra con errores históricos podía reaparecer inmediatamente después de calificarla «Bien».
- Corrección mínima: guardar `lastQuality` en cada intento; al construir `weakWords`, excluir registros con una última calidad segura de 3 o más. Se mantiene la prioridad de las palabras guardadas manualmente y de las que tienen errores persistentes cuando su última calidad fue inferior a 3.
- El estado `lastQuality` también participa en la deduplicación de snapshots SRS y se propaga al objeto adaptativo, sin cambios de esquema IndexedDB, backup JSON v3 ni dependencias.
- Se añade una prueba estructural específica para impedir que esta regresión vuelva a aparecer.

Fuente: reproducción manual del flujo «Repasar → Bien» y revisión de `recordAttempt()`, `mergeSrsRecords()` y `App.updateSrsView()`; 25 nov 2026.

## 2026-11-25 — Fase 7: recomendar la evaluación final pendiente en Aprender