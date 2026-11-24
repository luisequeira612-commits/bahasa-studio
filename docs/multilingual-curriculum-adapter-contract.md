# Contrato de adaptación común del currículo

**Estado:** adaptadores de lectura implementados e integrados en los recorridos principales; contrato de compatibilidad vigente.

## Objetivo
Ofrecer una vista común sin reescribir los datos curriculares ni cambiar contratos legacy. Los adaptadores son puentes de compatibilidad, no migraciones.

## Vista común de vocabulario
`CurriculumLoader.adaptVocabulary(word, language)` devuelve un objeto nuevo y superficialmente inmutable:
- `id`: ID original o `null`.
- `text`: `target` cuando existe; solo para `id`, usa `idn` como compatibilidad legacy.
- `translation`: `translation` o, como fallback, `esp`.
- `example` y `exampleTranslation`: `example`/`exampleTranslation` o sus alias legacy `ex`/`exEsp`.
- Conserva extensiones opcionales presentes: `reading`, `transliteration`, `pronunciation`, `tokens`, `grammaticalFunctions`, `forms`, `annotations`, `verification`.

Devuelve `null` para registros inválidos o idiomas no soportados. No inventa transliteración, lectura, pronunciación ni segmentación; no altera el objeto de origen ni añade alias al currículo.

## Vista común de ejercicios
`CurriculumLoader.adaptExercise(exercise, language)` crea una vista superficial e inmutable, conserva los campos y reglas authored y añade `targetLocale`. Infiere `answerLanguage`/`answerLocale` solo para tipos conocidos cuando no hay valor explícito; respeta siempre un `answerLanguage` explícito. Los tipos de traducción neutral y su alias legacy conservan compatibilidad.

## Integración actual
- Las tarjetas de vocabulario de las lecciones consumen `adaptVocabulary` y aplican el locale del idioma objetivo al contenido.
- El recorrido SRS adapta texto, traducción, ejemplos y métricas al idioma activo; conserva aliases y datos legacy indonesios.
- Los ejercicios usan la vista de locale para etiquetar el idioma de respuesta, sin traducir ni reescribir respuestas.
- Los pares de asociación se generan mediante `adaptMatchingPairs`, sin mutar vocabulario y evitando duplicados de objetivo/traducción.

## Límites y garantías
- La interfaz y las explicaciones permanecen en español; el locale se aplica al contenido objetivo.
- No se convierten índices MC en texto, no se alteran respuestas aceptadas ni se normalizan respuestas por semejanza.
- Audio automático sigue limitado al currículo indonesio donde está expresamente integrado.
- No se cambia IndexedDB v1, backup JSON v3, dependencias ni disponibilidad de idiomas.
- Tests estructurales y E2E verifican contratos de software, no certifican corrección lingüística ni nivel MCER.
