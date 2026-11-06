# Consolidación focalizada: A1 U24–U32 y A2 U5–U8

Fecha: 6 nov 2026

## Resultado de esta revisión

Se revisó directamente el currículo publicado en main para delimitar la siguiente tanda de consolidación y después se ejecutó una comprobación interna sobre las 13 unidades objetivo.

### A1 U24–U32

- 9 unidades: U24–U32.
- U24–U32 usan vocabulario propio v385–v474 en el bloque curricular.
- La estructura de estas unidades incluye lessonPlans y ejercicios directamente asociados a vocabId.
- El informe automático PR4 ya confirmó que estas unidades no presentan una ausencia del mínimo estructural de tipos de ejercicio ni de producción propia con pista.

### A2 U5–U8

- 4 unidades: U5–U8.
- Cada unidad contiene 12 entradas de vocabulario nuevas en su bloque correspondiente.
- U5 trabaja formas frecuentes con ber-; U6 con men-; U7 con meng-; U8 con mem- y meny-.
- Las lecciones organizan el vocabulario en grupos y contienen ejercicios propios por lección.

## Comprobación interna ejecutada

Sobre las 13 unidades se comprobó, sin modificar el currículo:

- referencias vocabId/vocabIds que no existan dentro de la unidad;
- índices answer fuera del rango de options;
- correspondencia de correctOrder con las palabras disponibles;
- ejercicios de producción sin hint o modelAnswer;
- duplicados exactos de objetos de ejercicio dentro de cada unidad.

Resultado: **0 hallazgos en las cinco comprobaciones**.

| Comprobación | A1 U24–U32 | A2 U5–U8 | Total |
|---|---:|---:|---:|
| Referencias de vocabulario inexistentes | 0 | 0 | 0 |
| Respuestas fuera de opciones | 0 | 0 | 0 |
| correctOrder incompatible con words | 0 | 0 | 0 |
| Producción sin pista/respuesta modelo | 0 | 0 | 0 |
| Duplicados exactos de ejercicios | 0 | 0 | 0 |

Esto es una **validación estructural interna**, no una validación lingüística nativa.

## Qué se conserva

Esta tanda no cambia:

- vocabulario, glosas o ejercicios;
- trackers CSV;
- IndexedDB;
- backup JSON v3;
- estados de verificación lingüística.

La revisión lingüística seguirá separando hallazgos estructurales de validación nativa. Sin hablante nativo, no se marcará verified_primary.

## Siguiente paso

Con las comprobaciones internas sin hallazgos, la siguiente revisión puede pasar a una auditoría editorial más fina de U24–U32 y U5–U8: calidad de consignas, alternativas plausibles, traducciones y coherencia pedagógica. Los posibles cambios de contenido se harán en un PR separado y solo después de confirmar cada hallazgo; este PR no altera todavía el contenido curricular.
