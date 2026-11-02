# A1: ampliación de 23 a 32 unidades

> **Política operativa vigente (2026-11-01):** este documento conserva evidencia y observaciones históricas. KBBI no es requisito para continuar, cerrar tareas estructurales, integrar contenido ni publicar. Los estados `not_checked` reflejan ausencia de esa consulta concreta; no son un bloqueo de desarrollo. Sin hablante nativo disponible, las dimensiones de naturalidad, registro y adecuación lingüística deben permanecer explícitamente sin certificar. Las correcciones asistidas y los tests internos no equivalen a validación nativa.

## Estado

Esta rama amplía el curso A1 de 23 a **32 unidades**. Las unidades 24–32 están integradas en `index.html` con vocabulario, ejemplos, explicación gramatical y práctica. Esta incorporación no certifica por sí misma la naturalidad de cada lema o frase: las nuevas unidades también deben pasar por la auditoría lingüística individual.

## Nuevas unidades

| Unidad | Tema | Objetivo comunicativo |
|---|---|---|
| U24 | Escuela y estudio | Hablar de clases, materiales y actividades de estudio |
| U25 | Aficiones y tiempo libre | Expresar gustos y actividades de ocio |
| U26 | Indicaciones y direcciones | Comprender y dar indicaciones sencillas |
| U27 | Invitaciones y planes | Proponer actividades y hablar de planes cercanos |
| U28 | Viajes y alojamiento | Reconocer vocabulario básico de transporte y hospedaje |
| U29 | Frecuencia y hábitos | Describir rutinas con adverbios de frecuencia |
| U30 | Pedir ayuda con cortesía | Disculparse, pedir permiso y solicitar repetición o ayuda |
| U31 | Describir personas | Describir apariencia y cualidades sencillas |
| U32 | Conversaciones prácticas | Integrar expresiones de saludo, agradecimiento, despedida y preguntas útiles |

## Criterios de implementación

- Se conservan los IDs de las unidades y el vocabulario preexistentes; las unidades nuevas usan IDs `a1_u24`–`a1_u32` y lemas `v385`–`v474`.
- Cada unidad nueva incluye vocabulario y ejercicios enlazados por `vocabId`, con práctica de selección, traducción, orden, escucha y escritura guiada.
- El indicador de progreso de A1 muestra 32 unidades; el cálculo real del progreso sigue derivándose del temario.
- Se añaden pruebas de regresión para exigir exactamente 32 unidades y comprobar los vínculos y la estructura de los ejercicios nuevos.
- No se cambian el esquema de IndexedDB ni el formato de copias de seguridad.

## Auditoría editorial inicial

Se hizo una pasada editorial de los 90 lemas/glosas y sus ejemplos bilingües de U24–U32 y se aplicaron correcciones de naturalidad/registro. El detalle y los límites de esta revisión están en [A1_LANGUAGE_AUDIT_UNITS_24_32.md](./A1_LANGUAGE_AUDIT_UNITS_24_32.md). Esto **no** significa que los 90 lemas estén cotejados individualmente con KBBI ni que las respuestas y el audio estén validados.

## Revisión pendiente y trabajo que sí puede completarse

1. Revisar la correspondencia entre cada ejercicio, su vocabulario objetivo y sus respuestas aceptadas/alternativas mediante auditorías locales.
2. Revisar la claridad de las consignas, la consistencia de traducciones y las explicaciones gramaticales; registrar dudas en lugar de asumir que una propuesta asistida es definitiva.
3. Probar la calidad real del audio y el comportamiento offline en dispositivos; hasta entonces, marcar esas dimensiones como no probadas.
4. Ejecutar las suites de CI sobre cada cambio.
5. Mantener separadas las cuestiones de naturalidad, registro y adecuación de nivel que no pueden confirmarse sin revisión competente. KBBI es opcional y no es puerta de salida.

**Estado lingüístico:** U24–U32 tienen una pasada editorial asistida y correcciones concretas, pero no están certificadas por hablante nativo ni por revisión experta. Esto no impide continuar con pruebas, mejoras deterministas y correcciones justificadas.


## Segunda pasada — cobertura explícita del vocabulario en U24–U32

La revisión detectó 13 términos cuyo nombre no aparecía en los objetivos ni en las explicaciones de los planes de lección: pensil, menulis, hobi, sepak bola, melukis, menonton, mengunjungi, paspor, tiket, pesawat, kapal, hidung, hati-hati y sampai jumpa. Se añadieron aclaraciones breves en los planes temáticos correspondientes para que el estudiante encuentre el significado y el uso del vocabulario dentro de la lección, no solo en la lista o en los ejercicios.

Se añadió una prueba que recorre los 90 términos de U24–U32 y exige que cada uno aparezca en el título, objetivo o explicación de algún plan de lección. No se cambiaron las palabras, glosas, ejemplos, IDs, ejercicios ni la estructura de IndexedDB o del backup v3. No es certificación lingüística nativa.
