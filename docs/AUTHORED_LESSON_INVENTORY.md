# Inventario de lecciones didácticas explícitas

**Fecha de corte:** 14 de noviembre de 2026  
**Rama de referencia:** `main`  
**Criterio:** cada unidad implementada de A1–B2 debe contener entre cinco y seis lecciones didácticas reales en `unit.lessons[]`. Los bloques de vocabulario derivados y repasos creados automáticamente por el motor no cuentan.

## Estado medido

| Nivel | Unidades implementadas | Lecciones explícitas | Distribución por unidad | Unidades fuera del estándar |
|---|---:|---:|---|---:|
| A1 | 32 | 141 | 4 con 0; 27 con 5; 1 con 6 | 4 |
| A2 | 40 | 200 | 40 con 5 | 0 |
| B1 | 50 | 144 | 12 con 2; 32 con 3; 6 con 4 | 50 |
| B2 | 5 | 25 | 5 con 5 | 0 |
| **Total implementado** | **127** | **510** | — | **54** |

Faltan **126 lecciones explícitas** para llevar todas las unidades ya implementadas al mínimo de cinco: 20 en A1 U29–U32 y 106 en B1. B2 U6–U60 (55 unidades) todavía no están implementadas; deben nacer con cinco o seis lecciones explícitas cada una.

## Estado por nivel

### A1
U1–U28 ya cumplen el estándar (U9 tiene seis; las demás, cinco). U29–U32 todavía no tienen `lessons[]`; el refuerzo que el motor genera en runtime no sustituye la autoría didáctica.

### A2
Las 40 unidades tienen cinco lecciones explícitas. La quinta incorpora recuperación espaciada del vocabulario existente, sin añadir IDs nuevos.

### B1
Las 50 unidades tienen entre dos y cuatro lecciones explícitas. Los checkpoints U22, U27, U32, U37, U42 y U47 tienen cuatro; las demás se distribuyen entre dos y tres. La migración debe preservar la progresión de vocabulario, los checkpoints acumulativos y los contratos de ejercicios ya existentes.

### B2
Las cinco unidades implementadas (U1–U5) tienen cinco lecciones explícitas. U6–U60 aún no existen como unidades implementadas; cada unidad futura deberá incluir cinco o seis lecciones desde su primera versión y no se activará sin contenido aprobado.

## Contrato de auditoría y gate estricto

- `node scripts/audit-authored-lesson-inventory.mjs` informa la distribución y enumera cada unidad fuera del estándar; no falla durante la migración.
- `node scripts/audit-authored-lesson-inventory.mjs --strict` falla con código distinto de cero si alguna unidad implementada tiene menos de cinco o más de seis lecciones explícitas.
- `npm run curriculum:lesson-inventory:strict` es el comando estable para activar el gate cuando la migración A1–B2 esté completa.
- La prueba sintética comprueba ambos límites (menos de cinco y más de seis), y la prueba de línea base impide que los recuentos actuales se alteren silenciosamente.
- No activar todavía el modo estricto en CI general: A1 U29–U32 y B1 siguen en migración. No se ocultan ni se exceptúan sus incumplimientos.

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
