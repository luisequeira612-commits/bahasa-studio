# Índice de auditorías editoriales A2 — U1–U40

Fecha de consolidación: 2026-11-01  
Estado global: **primera pasada editorial documentada; revisión lingüística independiente pendiente**.

## Cobertura de informes

| Bloque | Informe |
|---|---|
| U1–U4 | [A2-UNITS-01-04-AUDIT.md](A2-UNITS-01-04-AUDIT.md) |
| U5–U8 | [A2-UNITS-05-08-AUDIT.md](A2-UNITS-05-08-AUDIT.md) |
| U9–U12 | [A2-UNITS-09-12-AUDIT.md](A2-UNITS-09-12-AUDIT.md) |
| U13–U16 | [A2-UNITS-13-16-AUDIT.md](A2-UNITS-13-16-AUDIT.md) + [revisión contextual](EDITORIAL_AUDIT_A2_U13_U16.md) |
| U17–U20 | [A2-UNITS-17-20-AUDIT.md](A2-UNITS-17-20-AUDIT.md) |
| U21–U24 | [A2-UNITS-21-24-AUDIT.md](A2-UNITS-21-24-AUDIT.md) |
| U25–U28 | [A2-UNITS-25-28-AUDIT.md](A2-UNITS-25-28-AUDIT.md) |
| U29–U32 | [A2-UNITS-29-32-AUDIT.md](A2-UNITS-29-32-AUDIT.md) |
| U33–U36 | [A2-UNITS-33-36-AUDIT.md](A2-UNITS-33-36-AUDIT.md) |
| U37–U40 | [A2-UNITS-37-40-AUDIT.md](A2-UNITS-37-40-AUDIT.md) |

## Inventario del currículo

El registro curricular A2 contabiliza 40 unidades, 492 entradas de vocabulario, 161 lecciones y 682 ejercicios. La estructura contiene opción múltiple, traducción, escucha, orden de palabras y producción escrita. Estos conteos describen cobertura implementada, no dominio del estudiante ni calidad lingüística certificada.

## Qué cubre esta auditoría

- Inventario por unidad y bloque.
- Coherencia editorial visible entre temas, vocabulario, consignas y ejemplos.
- Riesgos de glosas españolas ambiguas y conceptos próximos que no deben confundirse.
- Protección de casos concretos mediante pruebas de regresión cuando hay un riesgo reproducible.
- Registro explícito de límites y asuntos que requieren revisión competente.

## Qué no certifica

- Naturalidad conversacional, frecuencia real, registro o variación regional.
- Corrección completa de gramática y morfología.
- Correspondencia exhaustiva con MCER A2 o BIPA 2.
- Pronunciación, calidad de síntesis de voz o comprensión auditiva en dispositivos reales.
- Todas las respuestas alternativas posibles de las actividades abiertas.

No hubo hablante nativo disponible. KBBI no es requisito ni bloqueo de desarrollo; el estado `not_checked` no se debe interpretar como error ni como motivo para detener el proyecto. Las auditorías internas no sustituyen la validación lingüística independiente.

## Siguiente trabajo: integridad transversal

La siguiente pasada debe comprobar automáticamente, contra el currículo fuente:

1. Que cada referencia de vocabulario de ejercicio resuelva a un ID canónico existente.
2. Que el vocabulario nuevo no aparezca como requisito antes de su introducción, salvo revisión explícita.
3. Que las glosas asociadas al mismo ID no diverjan silenciosamente.
4. Que las respuestas aceptadas incluyan variantes razonables sin volver ambiguas las respuestas cerradas.
5. Que las tareas abiertas no dependan de coincidencia literal con una única frase modelo.
6. Que el informe de incidencias diferencie errores estructurales reproducibles de dudas lingüísticas pendientes.

No se deben cambiar IDs, IndexedDB ni el formato de backup v3 para realizar esta revisión.


## Resultado de integridad transversal — 2026-11-01

El auditor local integrado en CI revisó A1 y A2 sin servicios externos: 72 unidades, 821 entradas de vocabulario y 801 IDs únicos. El informe más reciente registra 0 errores estructurales y 20 avisos en A1 por reutilización del mismo ID para el mismo término; A2 registra 0 avisos. No se detectaron referencias de vocabulario ausentes ni uso antes de la introducción en la pasada de progresión que incluye `vocabId` y `vocabIds`.

Se comprobó además el banco completo de opción múltiple: 395 ejercicios, todos con al menos dos opciones, índice de respuesta válido y sin opciones duplicadas tras normalización. Se añade una prueba de regresión para conservar esa propiedad.

Este resultado solo acredita las reglas estructurales y de consistencia que ejecuta el repositorio. No certifica que las opciones sean lingüísticamente naturales, que no exista ambigüedad semántica ni que todas las respuestas abiertas estén cubiertas.
