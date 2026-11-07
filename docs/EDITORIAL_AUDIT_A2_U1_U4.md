# Revisión editorial contextual A2 U1–U4

**Fecha:** 7 de noviembre de 2026  
**Base:** `main` posterior a PR #387.  
**Alcance:** lectura de las entradas de vocabulario, ejemplos, objetivos, explicaciones y ejercicios de A2 U1–U4.

## Inventario

| Unidad | Vocabulario | Lecciones | Ejercicios |
|---|---:|---:|---:|
| U1 | 24 | 5 | 25 |
| U2 | 14 | 4 | 17 |
| U3 | 12 | 4 | 17 |
| U4 | 10 | 4 | 19 |
| **Total** | **60** | **17** | **78** |

## Candidato editorial

**U3, Lección 1 — ejercicio de escritura sobre contexto temporal.** La consigna pide explicar en español qué contexto expresan «Setiap hari» y «Kemarin», y después conservar en indonesio la secuencia «Pertama, saya makan. Lalu, saya minum air.» El `modelAnswer` combina la explicación en español con la secuencia indonesia. El contenido es coherente como actividad bilingüe/metalingüística, pero conviene confirmar que el tipo `write` y su evaluador admiten deliberadamente una respuesta mixta, en vez de tratarla como producción íntegra en indonesio. Se deja como candidato de alineación consigna-evaluador, no como error confirmado.

## Coherencia observada

- U1 presenta los siete días, la fecha, los doce meses y las expresiones de estación; sus lecciones recorren esos grupos de vocabulario sin referencias huérfanas observadas en los ejercicios leídos.
- U2 distingue `sudah`, `belum`, `sedang` y `akan`, y añade marcadores temporales recientes, continuidad y referencias a semanas/meses. Las explicaciones mantienen la distinción entre acción completada, todavía no ocurrida y actividad en curso.
- U3 desarrolla conectores de secuencia y relaciones temporales; las formas verbales se explican como no conjugadas para marcar pasado/futuro, usando contexto temporal.
- U4 combina vocabulario nuevo de rutina y horario con repaso explícito de elementos A1 (`v247`–`v252`); los IDs de repaso se conservan como referencias a vocabulario previo.
- En las tareas de traducción, escucha y orden revisadas, las respuestas modelo coinciden con las oraciones que acompañan las explicaciones.

## Resultado y límites

- Revisadas 4 unidades, 60 entradas de vocabulario, 17 lecciones y 78 ejercicios.
- 1 candidato de alineación consigna-evaluador en U3 L1; 0 errores lingüísticos confirmados.
- No se modificó currículo, vocabulario, glosas, ejercicios, explicaciones ni respuestas.
- Revisión interna basada en el contenido del repositorio. No certifica naturalidad nativa, registro, nivel CEFR/BIPA ni pronunciación. No se consultó KBBI ni fuentes externas.
- No se modificaron trackers/CSV, IndexedDB ni backup JSON v3.

## Siguiente paso

Alinear, en una revisión curricular separada si se decide, el texto de ayuda/placeholder con la consigna bilingüe. El motor `checkWriting()` no califica automáticamente: muestra un ejemplo posible y ofrece autoevaluación. Después, continuar con la revisión contextual de A2 U5–U8 solo si no duplica la auditoría editorial ya existente; alternativamente, revisar A2 U9–U12 para avanzar por bloques sin repetir trabajo.

## Método

Lectura directa de `curriculum-a2.js` en `main`, inventario por unidad y lectura de cada objeto de ejercicio dentro de las cuatro unidades. Los resultados son candidatos editoriales internos, no dictámenes lingüísticos.
