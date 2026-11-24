# Contrato curricular multiidioma — extensiones opcionales

**Estado:** contrato estructural implementado y cubierto por pruebas; extensiones optativas, sin migración masiva de currículos.

## Principios de compatibilidad
- Los campos legacy (`idn`, `target`, `esp`, `ex`, `exEsp`, `vocabIds`, `reviewVocabIds`, `options`, `answer`, `correctOrder`, etc.) conservan nombres y significado.
- Ningún campo nuevo es obligatorio para cargar unidades existentes.
- No se presupone que un idioma use espacios, alfabeto latino, segmentación por palabras o transliteración.
- Los valores son contenido authored. El validador comprueba tipos/estructura; no certifica pronunciación, naturalidad, semántica, gramática ni MCER.
- No se agregan audioRefs ni se cambia el pipeline de voz por este contrato.

## Extensiones opcionales de vocabulario

| Campo | Tipo | Uso |
|---|---|---|
| `reading` | string | Lectura auxiliar en el sistema de escritura del idioma; no sustituye `target`. |
| `transliteration` | string | Transliteración/romanización explícita, cuando sea útil. |
| `pronunciation.ipa` | string | IPA opcional; no se genera automáticamente. |
| `tokens` | string[] | Segmentación explícita authored; no se deriva de espacios. |
| `grammaticalFunctions` | string[] | Funciones/etiquetas gramaticales breves. |
| `forms` | `{ value: string, label: string }[]` | Formas flexionadas o variantes etiquetadas. |
| `annotations` | `{ type: string, text: string }[]` | Notas tipadas de uso, escritura o registro. |
| `verification` | objeto opcional | Conserva estado y fuentes; `not_checked` no se eleva por pasar CI. |

## Extensiones opcionales de ejercicios
- `acceptedAnswers: string[]` admite varias respuestas authored para ejercicios textuales. Si falta, se conserva el comportamiento de `answer`.
- No se asume que `acceptedAnswers` aplique a ejercicios MC cuyo `answer` sea un índice numérico.
- Normalización semántica, tolerancia por semejanza, equivalencia de escrituras y transliteración automática siguen fuera de alcance.

## Validación
`scripts/validate-optional-curriculum-fields.mjs` exporta `validateOptionalCurriculumFields(curriculum)`. Acepta currículos legacy, valida extensiones solo cuando están presentes, informa rutas/códigos estables y no muta los datos. La cobertura se integra en `quality:tests` sin dependencias nuevas.

## Límites
- No se migran masivamente datos A1–B1 ni se exige añadir campos opcionales.
- Las pruebas Unicode/multiescritura verifican estructura y preservación de datos, no calidad lingüística.
- No cambia IndexedDB v1, backup JSON v3, audio, voces, locales ni disponibilidad de idiomas.
