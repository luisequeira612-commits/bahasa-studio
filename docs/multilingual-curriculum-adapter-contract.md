# Contrato de adaptación común del currículo

**Estado:** fase 3, primer adaptador de lectura implementado; la integración en renderizadores sigue pendiente.

## Objetivo
Ofrecer a la aplicación una vista de lectura común sin reescribir los datos curriculares ni cambiar los contratos legacy. Los adaptadores son puentes de compatibilidad, no migraciones.

## Vista común de vocabulario
`CurriculumLoader.adaptVocabulary(word, language)` devuelve un objeto nuevo y superficialmente inmutable con:
- `id`: ID original o `null`.
- `text`: `target` cuando existe; solo para el idioma `id`, usa `idn` como compatibilidad legacy.
- `translation`: `esp` cuando existe.
- `example` y `exampleTranslation`: `ex` y `exEsp` cuando existen.
- Campos opcionales de fase 2 se conservan si están presentes: `reading`, `transliteration`, `pronunciation`, `tokens`, `grammaticalFunctions`, `forms`, `annotations`, `verification`.

Devuelve `null` para un registro no válido o un código de idioma no soportado. No inventa transliteración, lectura, pronunciación ni segmentación. No altera el objeto de origen ni añade alias al currículo.

## Límites
- El adaptador no cambia los renderizadores ni el comportamiento de ejercicios en esta fase.
- No interpreta `answer`, no convierte índices MC en texto ni modifica `acceptedAnswers`.
- No cambia los datos pt-BR ni indonesios, el cargador, IndexedDB v1, backup JSON v3, Service Worker o audio.
- La UI y las explicaciones permanecen en español; locale del contenido se seguirá aplicando por elemento cuando se integre.
- Los tests estructurales no certifican corrección lingüística ni MCER.
