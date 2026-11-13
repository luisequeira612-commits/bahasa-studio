# Inventario de lecciones didácticas explícitas

**Fecha de corte:** 13 de noviembre de 2026  
**Rama de referencia:** `main`  
**Criterio acordado:** todas las unidades A1–B2 deben contener entre cinco y seis lecciones didácticas reales, escritas en el currículo. Los repasos creados automáticamente por el motor no cuentan.

## Estado medido

| Nivel | Unidades implementadas | Lecciones explícitas | Distribución por unidad | Unidades bajo el mínimo |
|---|---:|---:|---|---:|
| A1 | 32 | 40 | 24 sin `lessons[]`; 8 con 5 | 24 |
| A2 | 40 | 200 | 40 con 5 | 0 |
| B1 | 50 | 144 | 12 con 2; 32 con 3; 6 con 4 | 50 |
| B2 | 5 | 25 | 5 con 5 | 0 |
| **Total implementado** | **127** | **409** | — | **74** |

El mínimo para las 127 unidades ya implementadas es 635 lecciones. Faltan **226 lecciones explícitas** para llegar a cinco por unidad. Este cálculo no incluye B2 U6–U60, que todavía no están implementadas: esas 55 unidades deben diseñarse desde el principio con cinco o seis lecciones cada una.

## Interpretación por nivel

### A1

U1–U8 ya tienen cinco lecciones explícitas cada una (40 en total). U9–U32 todavía carecen de `lessons[]`; el motor crea lecciones en tiempo de ejecución, pero ese refuerzo no cuenta como autoría curricular. La experiencia visible no equivale a cinco o seis lecciones pedagógicas autorales. A1 requiere autoría explícita en las 24 unidades restantes.

### A2

Las 40 unidades tienen cinco lecciones explícitas. U13–U40 incorporan una quinta lección de recuperación espaciada con doce ejercicios que revisan todas las palabras de cada unidad, sin introducir vocabulario nuevo. No se debe crear una lección vacía para cumplir el número.

### B1

Las 50 unidades tienen entre dos y cuatro lecciones explícitas. Los checkpoints U22, U27, U32, U37, U42 y U47 tienen cuatro; el resto se distribuye entre dos y tres. El motor completa automáticamente las unidades hasta cinco, pero ese refuerzo generado no satisface el estándar autoral. La expansión debe preservar la progresión de vocabulario, los diez checkpoints acumulativos y los contratos de ejercicios ya existentes.

### B2

Las cinco unidades implementadas (U1–U5) tienen cinco lecciones explícitas cada una. U6–U60 todavía no existen como unidades implementadas; cuando se creen, cada una deberá incluir cinco o seis lecciones desde su primera versión.

## Reglas para la migración

1. Mantener separadas las lecciones explícitas (`unit.lessons`) y las de refuerzo generadas por `buildUnitLessons()`.
2. Cada lección nueva debe tener objetivo didáctico, asignación coherente de vocabulario nuevo/revisado y ejercicios propios; una lista de ejercicios repetidos no constituye una lección.
3. Distribuir el vocabulario entre lecciones para favorecer encuentros repetidos y recuperación espaciada. No introducir toda la lista en una sola lección.
4. Preservar IDs canónicos, progreso SRS, IndexedDB v1 y backup JSON v3.
5. Actualizar los tests que hoy aceptan 2–4 lecciones solo cuando la unidad correspondiente haya sido realmente ampliada. No rebajar los tests ni contar refuerzos generados como autoría.
6. El inventario es estructural; no certifica naturalidad, traducción, pronunciación ni equivalencia MCER/BIPA. No bloquear la autoría por falta de hablante nativo o acceso a KBBI.

## Reproducción

```bash
node scripts/audit-authored-lesson-inventory.mjs
node --test tests/authored-lesson-inventory.test.mjs
```

El informe lee A1/A2 desde sus archivos independientes y extrae B1/B2 con los extractores existentes. Solo cuenta `unit.lessons`; no invoca el generador de lecciones de la interfaz.
