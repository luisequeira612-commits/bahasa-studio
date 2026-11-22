# B2 U21 — bukan ... melainkan/tetapi: corrección contrastiva

Fecha: 22 nov 2026  
Estado: implementada en la rama `curriculum/b2-u21-bukan-melainkan-20261122`; pendiente de audio Piper y CI. La unidad permanece oculta/no publicada.

## Fuente y alcance

Fuente principal: James N. Sneddon et al. (2010), *Indonesian: A Comprehensive Grammar*, 2.ª ed., §§4.83–4.84. Se usan ejemplos documentados de la sección 4.84:

1. `Bukan dia bodoh, melainkan dia malas.`
2. `Bukannya saya tidak mau membeli rumah, tetapi uang saya tidak cukup.`
3. `Ia bukannya memerankan si Doel, melainkan menjadi sutradara.`
4. `Saya bukan tidak percaya kepadamu.`
5. `Dia bukan bodoh, melainkan malas saja.`
6. `Kami tidak pergi ke Solo, melainkan ke Yogya.`

La unidad no repite la negación básica de A1. Enseña el alcance de bukan/bukannya, la negación interna con tidak, la alternativa correctiva con melainkan/tetapi y la variante verbal tidak ... melainkan. No equivale a certificación MCER/BIPA ni a validación por hablante nativo.

## Objetivo didáctico

Distinguir tres operaciones que no deben confundirse:

- `bukan` al inicio puede rechazar una proposición completa; la cláusula con `melainkan` corrige la alternativa rechazada.
- `bukannya` puede introducir una interpretación que se niega; si aparece además `tidak`, hay que identificar el alcance de cada negación.
- Cuando el foco es un predicado verbal sin énfasis contrastivo de identidad, puede aparecer `tidak`; `melainkan` introduce el destino/miembro alternativo.

`Melainkan` es el único ID léxico nuevo: `b2u21_melainkan`. Se reutiliza como vocabulario de la unidad en las cinco lecciones. Los demás términos de los ejemplos se explican contextualmente, sin duplicar IDs ya existentes ni crear cuota léxica.

## Estructura

Cinco lecciones authored y 16 ejercicios (3/3/3/3/4), con cuatro tipos: `mc`, `translate_es_id`, `order`, `write`.

1. **Bukan ... melainkan:** corrección de una proposición completa.
2. **Bukannya ... tetapi:** alcance de la negación exterior e interior.
3. **Un sujeto, dos predicados:** contraste con sujeto compartido.
4. **Bukan tidak ...:** negación enfática y alternativa implícita.
5. **Tidak ... melainkan:** corrección de una acción o destino.

Seis respuestas de traducción completas usan los ejemplos fuente; la primera coincide con el ejemplo léxico de `melainkan`, por lo que el exportador de audio debe deduplicarla. El headword aislado `melainkan` también necesita su propio clip.

## Audio

Se solicita generación selectiva Piper para estos siete textos exactos:

- `Bukan dia bodoh, melainkan dia malas.`
- `Bukannya saya tidak mau membeli rumah, tetapi uang saya tidak cukup.`
- `Ia bukannya memerankan si Doel, melainkan menjadi sutradara.`
- `Saya bukan tidak percaya kepadamu.`
- `Dia bukan bodoh, melainkan malas saja.`
- `Kami tidak pergi ke Solo, melainkan ke Yogya.`
- `melainkan` (headword de vocabulario).

No se regenera la biblioteca completa. Tras la generación esperada: +7 IDs (2.268 en total) y +7 textos B2 (155 en total), con MP3/Opus, manifiesto, índice y hashes sincronizados. El test de audio debe verificar la igualdad de índice/manifiesto y presencia de los archivos.

## Restricciones

- U21 sigue oculta/no publicada; U1–U5 continúan siendo las únicas unidades B2 visibles.
- No modificar A1/A2/B1, IndexedDB v1, backup JSON v3, dependencias, backend ni servicios externos.
- No exigir KBBI ni hablante nativo para avanzar; la coherencia interna y la fuente gramatical no son certificación lingüística.
- Mantener el control de solapamiento con B1 y B2 U1–U20.
