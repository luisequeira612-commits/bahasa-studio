# B2 U14 — Partículas -lah y -kah: énfasis y preguntas

**Estado:** implementada en `curriculum/b2-u14-particles-20261121`; cinco lecciones authored, 16 ejercicios y ningún vocabulario nuevo. Oculta/no publicada.  
**Fecha:** 21 nov 2026.  
**Bloque:** partículas discursivas; integración con U13 y formas de cortesía ya conocidas.

## Propósito y límites

U14 estudia `-lah` y `-kah` como partículas discursivas (algunas fuentes las describen también como clíticos). `-lah` se asocia al foco y al realce del predicado; `-kah` marca preguntas sí/no y puede focalizar la palabra a la que se adjunta. La unidad evita dos simplificaciones: `-lah` no siempre equivale a «por favor», y `-kah` no es una traducción fija de «¿es?».

## Fuentes

1. **Denistia & Baayen (2021), “The morphology of Indonesian: Data and quantitative modeling”, §2.7 “Clitics”.** Describe `-lah` como forma usada en imperativos o para énfasis y `-kah` como marcador de preguntas.  
   Fuente: https://www.sfs.uni-tuebingen.de/~hbaayen/publications/DenistiaBaayen2021.pdf

2. **Sneddon, Adelaar, Djenar & Ewing (2010), *Indonesian: A Comprehensive Grammar*, 2.ª ed., §§3.50–3.51 y 4.23–4.40.** Explica `-lah` como partícula de realce/foregrounding, especialmente con predicados desplazados, y analiza `-kah` en preguntas. Advierte que `-lah` no funciona siempre como suavizador de imperativos: en algunos contextos puede reforzar el mandato.  
   Fuente editorial: https://www.routledge.com/Indonesian-A-Comprehensive-Grammar/Sneddon-Adelaar-Djenar-Ewing/p/book/9780415581547

3. **Universal Dependencies — Indonesian (id).** Documenta la segmentación de `bacalah` en `baca` + `lah` y `diakah` en `dia` + `kah`; describe `-kah` como marca de preguntas sí/no y de foco.  
   Fuente: https://universaldependencies.org/id/index.html

4. **Tata Bahasa Indonesia Praktis untuk Umum (2006), repositorio del Ministerio de Educación de Indonesia.** Explica que `-kah` puede reforzar preguntas con palabras interrogativas y que `-lah` puede suavizar ligeramente imperativos, mientras que en declarativas aporta énfasis. Esta diferencia con Sneddon se conserva como variación pragmática, no como contradicción que deba ocultarse.  
   Fuente: https://repositori.kemendikdasmen.go.id/2633/1/Tata%20Bahasa%20Indonesia%20Praktis%20Untuk%20Umum%20%282006%29.pdf

5. **Material curricular previamente aprobado.** `Bacalah buku agar kamu memahami pelajaran.` ya aparece como ejemplo de B1; `silakan` y `tolong` se estudian en A1/A2. U14 recupera esas formas sin crear IDs ni modificar las unidades anteriores.

## Lecciones implementadas

1. **Forma y función: partículas unidas al huésped.** Identifica `-lah` y `-kah` y diferencia foco/énfasis de interrogación; explica que la bibliografía puede llamarlas partículas o clíticos.
2. **-lah: foco y realce del predicado.** Analiza `Bacalah` (B1) y `Bukalah pintu itu!` (Sneddon) como formas con predicado realzado.
3. **-lah en imperativos: cortesía y fuerza.** Contrasta la descripción suavizadora de algunas fuentes con la advertencia de Sneddon de que `-lah` puede reforzar el mandato; diferencia `silakan` y `tolong` como recursos léxicos.
4. **-kah: preguntas y foco interrogativo.** Usa `Diakah yang akan datang?` y `Apakah dia guru?` para mostrar la pregunta sí/no y el foco sobre la palabra precedente.
5. **Integración: foco, pregunta y clíticos pronominales.** Distingue `-lah`/`-kah` de `-nya` (U13) y de palabras léxicas como `silakan`.

## Banco de ejercicios

| Lección | Ejercicios | Tipos |
|---|---:|---|
| 1 | 3 | mc, fill, order |
| 2 | 3 | mc, fill, write |
| 3 | 3 | mc, fill, order |
| 4 | 3 | mc, fill, write |
| 5 | 4 | mc, fill, order, write |
| **Total** | **16** | **4 tipos** |

Todas las respuestas y producciones son análisis en español. No se añaden IDs de vocabulario ni tareas de escucha; no se inventan oraciones indonesias. Los ejemplos proceden de las fuentes indicadas o de B1/A1/A2 ya implementadas.

## Límites y verificación

- No enseñar que `-lah` siempre suaviza un imperativo o equivale a «por favor».
- No confundir la partícula interrogativa `-kah` con una palabra interrogativa léxica.
- No confundir `-lah`/`-kah` con el clítico pronominal `-nya`.
- No asumir que todas las fuentes usan la misma etiqueta gramatical para estas formas.
- No afirmar validación nativa ni certificación MCER/BIPA.
- U14 permanece oculta/no publicada; U1–U5 siguen siendo las únicas unidades visibles.
- No modifica A1/A2/B1, IndexedDB v1, backup JSON v3, audio, dependencias ni servicios externos.

**Registro de implementación — 21 nov 2026:** autorización autónoma del dueño para avanzar B2 por lotes. Cinco lecciones authored, 16 ejercicios, cuatro tipos; cero vocabulario/IDs nuevos y cero audio nuevo. La auditoría automática verifica estructura y cobertura de ejemplos; no certifica naturalidad nativa.
