# Inventario de lecciones didácticas explícitas

**Fecha de corte:** 15 de noviembre de 2026  
**Rama de referencia:** `main`  
**Criterio:** cada unidad implementada de A1–B2 debe contener entre cinco y seis lecciones didácticas reales en `unit.lessons[]`. Los bloques de vocabulario derivados y repasos creados automáticamente por el motor no cuentan.

## Estado medido

| Nivel | Unidades implementadas | Lecciones explícitas | Distribución por unidad | Unidades fuera del estándar |
|---|---:|---:|---|---:|
| A1 | 32 | 165 | 27 con 5; 5 con 6 | 0 |
| A2 | 40 | 200 | 40 con 5 | 0 |
| B1 | 50 | 250 | 50 con 5 | 0 |
| B2 | 18 | 90 | 18 con 5 | 0 |
| **Total implementado** | **129** | **650** | — | **0** |

Todas las unidades implementadas cumplen actualmente el estándar de cinco o seis lecciones explícitas. No quedan unidades implementadas por debajo del mínimo ni por encima del máximo.

## Estado por nivel

### A1
U1–U32 cumplen el estándar: 27 unidades tienen cinco lecciones y cinco tienen seis (U9 y U21–U24). U21–U24 conservan la lección general de aplicación y añaden una lección contextual específica antes de la recuperación espaciada final. No se añade vocabulario ni IDs.

### A2
Las 40 unidades tienen cinco lecciones explícitas. La quinta incorpora recuperación espaciada del vocabulario existente, sin añadir IDs nuevos.

### B1
Las 50 unidades tienen cinco lecciones explícitas cada una (250 en total). La migración estructural U1–U50 está completa; se conservan los checkpoints acumulativos. El inventario registra 1.022 ejercicios combinados.

### B2
U1–U7 están implementadas con cinco lecciones explícitas cada una (35 en total). U6–U7 siguen ocultas/no publicables hasta cerrar la revisión de licencia y el gate de audio. U8–U60 aún no están implementadas; U13–U60 no tienen mapa curricular aprobado. Cada unidad futura debe nacer con cinco o seis lecciones reales.

## Contrato de auditoría y gate estricto

- `node scripts/audit-authored-lesson-inventory.mjs` informa la distribución y enumera cada unidad fuera del estándar.
- `node scripts/audit-authored-lesson-inventory.mjs --strict` falla con código distinto de cero si alguna unidad implementada tiene menos de cinco o más de seis lecciones explícitas.
- `npm run curriculum:lesson-inventory:strict` es el comando estable para activar el gate; las unidades implementadas actuales ya cumplen, pero la activación general en CI debe ser un cambio separado y explícito.
- La prueba sintética comprueba ambos límites (menos de cinco y más de seis), y la prueba de línea base impide que los recuentos actuales se alteren silenciosamente.
- No se ocultan ni se exceptúan incumplimientos.

## Reglas de migración

1. Mantener separadas las lecciones explícitas y las de refuerzo generadas por `buildUnitLessons()`.
2. Cada lección debe tener objetivo didáctico, vocabulario nuevo/revisado coherente y ejercicios propios; no inflar el recuento con copias sin propósito.
3. Distribuir vocabulario y recuperarlo espaciadamente en contextos y actividades diferentes.
4. Preservar IDs canónicos, progreso SRS, IndexedDB v1 y backup JSON v3.
5. Reutilizar y redistribuir el contenido existente cuando sea pedagógicamente válido; no inventar vocabulario, ejemplos ni explicaciones para alcanzar el número.
6. La auditoría es estructural: no certifica naturalidad, traducción, pronunciación ni equivalencia MCER/BIPA. No bloquear el avance por falta de hablante nativo o acceso a KBBI.

## Reproducción

```bash
node scripts/audit-authored-lesson-inventory.mjs
node scripts/audit-authored-lesson-inventory.mjs --strict
node --test tests/authored-lesson-inventory.test.mjs
```

El informe lee A1/A2 desde sus archivos independientes y extrae B1/B2 mediante los extractores existentes. Solo cuenta `unit.lessons[]`; no invoca el generador de lecciones de la interfaz.
