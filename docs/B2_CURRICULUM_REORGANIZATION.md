# Reorganización del currículo B2 (60 unidades)

**Decisión del dueño:** 7 nov 2026, autorización explícita para reorganizar el borrador conservando todo el contenido anterior.  
**Estado:** plan de migración y conservación; no hay unidades B2 nuevas publicadas por este cambio.  
**Base de código:** `index.html` en `main`, commit `7584bcbe2fbdcb7014c82806836d5e29be30abd7`.

## Orden aprobado

| Bloque | Unidades | Eje temático aprobado |
|---|---:|---|
| 1 | U1–U3 | Contrastes avanzados de voz y afijos |
| 2 | U4–U6 | `-kan`, `-i` y `memper-` |
| 3 | U7–U10 | Nominalizaciones |
| 4 | U11–U12 | Reduplicación y compuestos |
| 5 | U13–U60 | Pendiente de desarrollar a partir del plan aprobado; no inventar títulos ni objetivos aún no definidos |

Este documento registra solo los ejes explícitos ya decididos. No completa por inferencia los temas de U13–U60.

## Correspondencia del borrador antiguo

| Borrador anterior | Destino posible | Tratamiento |
|---|---|---|
| Antigua U1: causativo `-kan` | Bloque U4–U6 | Conservar como material de referencia; evaluar qué ejemplos aportan contraste y no duplican contenido. |
| Antigua U2: contraste `-kan/-i` | Bloque U4–U6 | Conservar; revisar participantes, valencia y ejemplos antes de reutilizar. |
| Antigua U3: `ke-an` | Sin destino aprobado todavía | Conservar; evaluar solapamiento con B1 U13–U14 y no repetir contenido sin progresión real. |
| Antigua U4: nominalizaciones | Bloque U7–U10 | Conservar; distribuir solo después de revisar familias y posibles duplicados. |
| Antigua U5: reduplicación/compuestos | Bloque U11–U12 | Conservar; ampliar con contexto, registro y ejemplos, sin generalizar reglas. |

El contenido íntegro del borrador anterior está en `docs/B2_LEGACY_DRAFT_ARCHIVE.md`. La tabla es una guía de correspondencia, no una autorización para copiar automáticamente los ejercicios o las glosas antiguas al currículo activo.

## Reglas de construcción de cada unidad

- 14–22 ejercicios combinados por unidad.
- Al menos cuatro tipos entre opción múltiple, traducción, ordenación, escucha con audio reproducible y escritura.
- Al menos cinco ejercicios con frases completas y una producción original guiada.
- Repaso acumulativo cada 4–5 unidades.
- Enseñanza mediante textos, diálogos y familias léxicas; no listas aisladas.
- Enseñar afijos mediante familias y contextos; no asignarles una traducción fija.
- Cada forma derivada nueva debe tener un ID canónico único. Antes de reutilizar IDs antiguos, comprobar colisiones en A1/A2/B1 y dentro de B2.
- No exigir producción de una forma antes de su unidad prevista.
- A1/A2/B1 quedan intactos. No modificar IndexedDB ni el backup JSON v3; sin dependencias ni servicios externos.
- B2 permanece en desarrollo. El recorrido expone únicamente las unidades implementadas U1–U3, con desbloqueo secuencial tras B1 y la unidad anterior; U4–U60 siguen sin contenido ejecutable y no se exponen como unidades disponibles.

## Vocabulario y evidencia

La primera construcción se hará con vocabulario ya existente siempre que sirva pedagógicamente. Toda palabra nueva propuesta se presentará antes al dueño con su forma, glosa, ejemplo y motivo de inclusión; no se incorporará silenciosamente. Ningún término se marcará como validado por hablante nativo. KBBI no es requisito para avanzar; los estados de evidencia se documentarán honestamente.

## Secuencia de trabajo

1. Conservar el borrador antiguo literalmente (hecho en este cambio).
2. Preparar U1–U3 según el primer bloque aprobado, con vocabulario ya enseñado y un diseño de progresión que no anticipe U4–U6.
3. Revisar el contrato de unidad, referencias, vocabulario adelantado y tipos de ejercicio en CI.
4. Continuar por bloques, incluyendo checkpoints acumulativos.
5. Completar el mapa U13–U60 antes de inventar o cargar contenido para esos números.

## Límites de este cambio

Este PR solo añade documentación de archivo y planificación. No modifica `CourseData`, la visibilidad de B2, el currículo A1/A2/B1, los trackers, IndexedDB, el backup JSON v3 ni el comportamiento de la aplicación.
