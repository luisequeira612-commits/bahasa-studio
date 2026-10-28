# A1: ampliación de 23 a 32 unidades

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

## Revisión pendiente

1. Cotejar individualmente los lemas y las glosas con KBBI cuando corresponda.
2. Revisar naturalidad, registro y contexto de todos los ejemplos en indonesio y sus traducciones al español.
3. Revisar las explicaciones gramaticales para que no presenten tendencias como reglas absolutas.
4. Verificar las respuestas aceptadas y la calidad real del audio; una prueba estructural no valida pronunciación.
5. Ejecutar todas las suites de CI sobre el commit final.

**Estado lingüístico:** las unidades 24–32 están implementadas, pero su auditoría léxica y de ejemplos sigue pendiente. No deben describirse todavía como validadas exhaustivamente.
