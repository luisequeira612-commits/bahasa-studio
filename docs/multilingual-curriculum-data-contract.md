# Contrato curricular multiidioma — extensiones opcionales

**Estado:** fase 2, contrato propuesto en PR para validación estructural. Los campos son optativos y no se incorporan masivamente a currículos existentes.

## Principios de compatibilidad

- Los campos legacy actuales (`idn`, `target`, `esp`, `ex`, `exEsp`, `vocabIds`, `reviewVocabIds`, `options`, `answer`, `correctOrder`, etc.) conservan sus nombres y significado.
- No se requiere ningún campo nuevo para cargar una unidad existente.
- No se infiere que el idioma use espacios, alfabeto latino, segmentación por palabras ni una transliteración concreta.
- Los valores son datos authored; el validador solo comprueba tipos y estructura. No certifica pronunciación, naturalidad, semántica, gramática ni MCER.
- No se agregan audioRefs ni se cambia el pipeline de voz en esta etapa.

## Extensiones opcionales de vocabulario

| Campo | Tipo | Uso |
|---|---|---|
| `reading` | string | Lectura auxiliar en el sistema de escritura del idioma (p. ej. furigana); no sustituye `target`. |
| `transliteration` | string | Transliteración/romanización explícita, cuando sea útil. |
| `pronunciation.ipa` | string | Transcripción IPA opcional; no se genera automáticamente. |
| `tokens` | string[] | Segmentación explícita authored; no se deriva de espacios. |
| `grammaticalFunctions` | string[] | Funciones/etiquetas gramaticales breves. |
| `forms` | `{ value: string, label: string }[]` | Formas flexionadas o variantes con etiqueta explicativa. |
| `annotations` | `{ type: string, text: string }[]` | Notas de uso, escritura, registro u otras anotaciones tipadas. |
| `verification` | objeto legacy opcional | Mantiene el estado y las fuentes existentes; `not_checked` no se eleva por pasar CI. |

## Extensiones opcionales de ejercicios

- `acceptedAnswers: string[]` permite varias respuestas authored para ejercicios de respuesta textual. Si no existe, se conserva el comportamiento de `answer` actual.
- La aplicación no debe asumir que estas alternativas se pueden usar en ejercicios MC cuyo `answer` es un índice numérico.
- Normalización, tolerancia a variantes, equivalencia de escrituras y reglas de comparación siguen fuera de esta etapa: no aceptar respuestas por semejanza ni transliterar automáticamente.

## Contrato de validación

`scripts/validate-optional-curriculum-fields.mjs` exporta `validateOptionalCurriculumFields(curriculum)`. La función acepta currículos legacy sin extensiones, valida los tipos de los campos nuevos solo cuando están presentes, informa rutas y códigos estables, no muta los datos y no recorre ni reescribe los currículos productivos.

Los tests cubren un objeto legacy, un ejemplo Unicode multi-escritura, errores de forma y ausencia de mutación. Se integran en `quality:tests`; no se agregan dependencias.

## Fuera de alcance en esta fase

- No cambiar UI ni renderizadores; los nuevos campos no son visibles/consumidos por la app todavía.
- No migrar datos A1–B1 ni añadir campos a cada entrada.
- No cambiar IndexedDB v1, backup JSON v3, audio, voces, locales ni disponibilidad de idiomas.
- Las pruebas Unicode/multiescritura amplias corresponden a la fase 4, después de cerrar este contrato y la interfaz común.
