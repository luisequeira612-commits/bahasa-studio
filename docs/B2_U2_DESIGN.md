# Diseño preliminar B2 U2 — agente pronominal ligado y foco

**Estado:** diseño pedagógico preliminar; no implementado.  
**Fecha:** 7 nov 2026 (hora local).  
**Dependencia:** B2 U1 implementada (PR #437); U2 debe preceder a la integración prevista en U3.

## Propósito dentro del bloque U1–U3

U1 trabaja el contraste entre activa con `meN-` y pasiva con `di-`, con atención al agente, al participante afectado y al foco discursivo.

U2 propone estudiar una construcción con el participante afectado al inicio y un agente pronominal ligado al verbo mediante `ku-` o `kau-`. La unidad debe enseñar a reconocer la relación entre forma verbal, agente y contexto; no debe reducirse a una regla de traducción palabra por palabra ni etiquetarse como «pasiva» de manera universal.

U3 integrará los patrones ya enseñados. Por eso U2 debe proporcionar ejemplos suficientemente claros y un vocabulario controlado, sin anticipar otras familias de afijos de B2.

## Inventario candidato — pendiente de aprobación

Estas cuatro formas son propuestas de trabajo, no vocabulario aprobado ni contenido activo:

| Forma propuesta | Segmentación de trabajo | Función que se quiere enseñar |
|---|---|---|
| `kubaca` | `ku-` + `baca` | agente de primera persona |
| `kaubaca` | `kau-` + `baca` | agente de segunda persona |
| `kutulis` | `ku-` + `tulis` | agente de primera persona |
| `kautulis` | `kau-` + `tulis` | agente de segunda persona |

**No asignar IDs, glosas definitivas ni estado de verificación todavía.** No usar estas formas en ejercicios evaluados, claves de respuesta ni contenido ejecutable antes de que el dueño apruebe expresamente el inventario y sus ejemplos.

La página oficial EYD V indica que los pronombres ligados `ku-` y `kau-` se escriben unidos a la palabra siguiente: [EYD V — Kata ganti](https://ejaan.kemendikdasmen.go.id/eyd/penulisan-kata/kata-ganti/). Esta fuente respalda la convención ortográfica citada; por sí sola no valida la naturalidad, la distribución sintáctica ni todas las interpretaciones de los ejemplos.

## Objetivos propuestos

Después de completar U2, el estudiante podrá:

1. Reconocer el patrón de objeto o participante afectado antepuesto con agente pronominal ligado al verbo.
2. Distinguir el agente de primera persona asociado a `ku-` del agente de segunda persona asociado a `kau-`.
3. Identificar agente y participante afectado sin confundir el orden superficial con los roles semánticos.
4. Interpretar la construcción con ayuda del contexto, sin inferir tiempo verbal únicamente por la forma.
5. Comparar el patrón con construcciones activas y pasivas ya estudiadas en U1, sin afirmar que sean intercambiables en todo contexto.
6. Producir una reescritura guiada cuando los ejemplos y las formas hayan sido aprobados.

## Lecciones propuestas

### Lección 1 — Reconocer la forma y sus participantes

- Recuperar el vocabulario y los contrastes de U1.
- Presentar la segmentación `ku-` / `kau-` + verbo solo después de aprobar el inventario.
- Identificar quién realiza la acción y qué participante aparece como punto de partida.
- Distinguir el clítico ligado al verbo del pronombre independiente `kau`.
- Evitar explicar estas formas como simples contracciones mecánicas de pronombres independientes.

### Lección 2 — Interpretar el foco en contexto

- Trabajar con un diálogo breve y un texto corto que reutilicen objetos y verbos conocidos.
- Elegir la interpretación del agente según la forma y el contexto.
- Comparar el patrón con ejemplos de U1 y explicar qué participante queda en primer plano.
- No inferir tiempo o aspecto gramatical que la forma verbal no codifica por sí sola.
- Evitar la duplicación del agente, por ejemplo combinando sin motivo un pronombre independiente y el clítico ligado.

### Lección 3 — Reescribir y producir con guía

- Reordenar oraciones conservando los roles de agente y participante afectado.
- Detectar respuestas que cambien accidentalmente quién realiza la acción.
- Completar una secuencia breve a partir de un contexto y una intención comunicativa.
- Producción guiada: mini texto de 3–4 oraciones con una justificación sencilla del punto de partida elegido.
- No exigir producción libre de formas cuyo inventario siga pendiente.

## Banco de ejercicios previsto

Propuesta de **16 ejercicios combinados**, todavía sin consignas ni claves finales:

| Lección | Opción múltiple | Traducción contextual | Ordenación | Escucha | Escritura | Total |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 2 | 1 | 1 | 1 | 0 | 5 |
| 2 | 2 | 1 | 1 | 1 | 0 | 5 |
| 3 | 1 | 1 | 0 | 1 | 3 | 6 |
| **Total** | **5** | **3** | **2** | **3** | **3** | **16** |

Al implementar, al menos cinco ejercicios deben evaluar oraciones completas y al menos uno debe pedir producción original guiada. La escucha usará únicamente el mecanismo local ya existente. No añadir servicios ni dependencias.

## Guardarraíles

- Las cuatro formas de la tabla siguen pendientes de aprobación; no son vocabulario activo.
- No añadir IDs, glosas ni ejemplos evaluados hasta recibir aprobación explícita.
- No presentar `ku-` / `kau-` como meras contracciones ni imponer una única clasificación sintáctica universal.
- No afirmar que estas construcciones expresan por sí solas pasado, presente o aspecto.
- No equiparar mecánicamente `meN-`, `di-` y `ku-/kau-`.
- No alterar los roles semánticos al transformar una oración.
- Reutilizar vocabulario ya enseñado siempre que sea suficiente; cualquier término nuevo debe proponerse por separado al dueño.
- Mantener B2 oculta/no publicada.
- No modificar A1/A2/B1, IndexedDB, backup JSON v3, trackers ni dependencias.
- No afirmar validación nativa ni certificación MCER/BIPA.

## Condiciones para pasar a implementación

1. El dueño aprueba explícitamente las formas y sus glosas/ejemplos.
2. Se comprueba el inventario global de IDs y la procedencia de cada forma antes de crear entradas.
3. Las explicaciones y ejemplos distinguen con claridad agente, participante afectado y foco.
4. Las 16 actividades cumplen el contrato de variedad, frases completas, escucha local y producción guiada.
5. Las pruebas verifican referencias, coherencia entre consigna y respuesta, roles semánticos y ausencia de exposición anticipada.
6. U2 se implementa y supera CI antes de cerrar los ejemplos integradores de U3.

**Decisión pendiente del dueño:** aprobar o modificar las cuatro formas propuestas. «Continúa» significa continuar el trabajo permitido, no aprobar el inventario.
