# Consolidación focalizada: A1 U24–U32 y A2 U5–U8

Fecha: 6 nov 2026

## Resultado de esta revisión

Se revisó directamente el currículo publicado en main para delimitar la siguiente tanda de consolidación.

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

## Qué se conserva

Esta tanda no cambia:

- vocabulario, glosas o ejercicios;
- trackers CSV;
- IndexedDB;
- backup JSON v3;
- estados de verificación lingüística.

La revisión lingüística seguirá separando hallazgos estructurales de validación nativa. Sin hablante nativo, no se marcará verified_primary.

## Siguiente paso

La siguiente revisión debe concentrarse en detectar inconsistencias internas concretas de U24–U32 y U5–U8: referencias a vocabulario inexistente, respuestas incompatibles con las opciones/orden, ejercicios de producción sin pista o respuesta, y duplicados exactos. Los hallazgos confirmados se corregirán en una tanda posterior; este PR no altera todavía el contenido curricular.
