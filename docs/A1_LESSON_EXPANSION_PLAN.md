# Ampliación de lecciones A1: estándar de 5–6 (9 nov 2026)

## Decisión vigente

El dueño decidió ampliar el recorrido completo A1–B2 a cinco o seis lecciones por unidad, empezando por A1. Esta decisión sustituye la regla anterior que congelaba A1/A2; no autoriza cambios al vocabulario canónico ni a los identificadores sin el proceso de aprobación habitual.

## Línea base verificada en el código

La prueba `tests/curriculum-extraction.test.js` fija el hash del currículo A1 y confirma 32 unidades, 477 ejercicios y 329 registros de vocabulario. También calcula 91 lecciones mediante la regla actual `min(5, max(2, ceil(vocab.length / 4)))`. La distribución resultante es: 11 unidades con 2 lecciones, 16 con 3, 4 con 4 y 1 con 5.

La prueba `tests/multi-lesson-progression.test.cjs` confirma que `buildUnitLessons` divide el vocabulario en bloques secuenciales y que cada lección conserva las claves de progreso `unidad::índice`. U24–U32 tienen tres planes de lección focalizados, pero la cantidad efectiva sigue derivándose de la regla general.

## Estrategia de compatibilidad

1. No reescribir ni reformatear `curriculum-a1.js`: su hash canónico está fijado y su contenido se mantiene como fuente original.
2. Ampliar la construcción de lecciones en el motor, añadiendo sesiones de refuerzo **después** de todas las lecciones actuales de cada unidad. No dividir ni reordenar las lecciones existentes.
3. Mantener los índices existentes: las claves `unitId::lessonIndex` de instalaciones actuales deben seguir apuntando a las mismas lecciones. Las nuevas sesiones solo reciben índices posteriores.
4. Las unidades ya registradas en `completedUnits` continúan completadas; no deben reabrirse por tener nuevas sesiones. Las unidades en curso conservan sus marcas de lecciones antiguas y solo tendrán que completar las sesiones nuevas añadidas.
5. No cambiar IndexedDB, el backup JSON v3, el esquema de progreso, los desbloqueos, las evaluaciones finales ni el salto de emergencia.
6. No añadir vocabulario, IDs canónicos, glosas, ejemplos indonesios, respuestas de ejercicios ni dependencias. El refuerzo debe reutilizar material ya existente. Si una actividad requiere una frase o respuesta nueva, se detiene para aprobación explícita.
7. No presentar la repetición mecánica como dominio: las sesiones deben alternar recuperación de significado, escucha, traducción y ejercicios authored seguros disponibles. No generar ordenación o producción libre con frases nuevas.

## Objetivo de A1

- Mínimo: 5 lecciones por cada una de las 32 unidades (160 en total).
- Una sexta lección solo cuando la auditoría de carga y variedad lo justifique; no añadirla para cumplir una cuota. La U9 (22 entradas de vocabulario) es candidata a revisión, no una decisión automática.
- Mantener todas las lecciones cortas, con repaso de vocabulario previamente presentado y recuperación activa.
- No alterar los exámenes de unidad: la ampliación de práctica no cambia los criterios de aprobación.

## Validación obligatoria de implementación

- Prueba de regresión que compare las lecciones originales con el prefijo de las nuevas listas: mismo índice, título, vocabulario nuevo, vocabulario de repaso y ejercicios.
- Pruebas de 5 o 6 lecciones en cada unidad A1 y de que ningún término se evalúa antes de su introducción.
- Pruebas de que el progreso antiguo de una unidad en curso sigue asociado a los mismos índices y de que las unidades completadas siguen completadas.
- Ejecutar suite completa, informes de calidad, comprobación de carga inicial y offline. Revisar explícitamente que IndexedDB y el backup v3 no cambiaron.
- CI verde en el head exacto y sin revisiones, comentarios ni hilos pendientes antes de fusionar.

## Estado

Documento de planificación y compatibilidad; todavía no modifica el motor ni las lecciones ejecutables. La implementación empieza en A1 y seguirá en tandas pequeñas antes de pasar a A2, B1 y B2.
