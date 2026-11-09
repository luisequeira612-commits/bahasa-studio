# B2 U3 — integración de voz y foco

**Estado:** implementada en la rama `feat/b2-u3-voice-focus-integration`; pendiente de CI y fusión.  
**Fecha de implementación:** 9 nov 2026.  
**Dependencias:** B2 U1 y U2 implementadas; las cuatro formas de U2 fueron aprobadas expresamente por el dueño el 9 nov 2026.

## Función dentro del bloque U1–U3

- **U1:** contraste entre activa con `meN-` y pasiva con `di-`, agente explícito u omitido y continuidad del foco.
- **U2:** construcciones con el participante afectado antepuesto y agente pronominal ligado `ku-` / `kau-`.
- **U3:** integra los patrones anteriores en lectura, interpretación, escucha y reescritura contextual. La dificultad está en seleccionar y mantener el punto de vista discursivo, no en introducir una tercera familia de afijos.

## Objetivos

Al terminar U3, el estudiante podrá:

1. Identificar agente, participante afectado y punto de partida informativo en ejemplos de U1 y U2.
2. Comparar construcciones que describen un mismo acontecimiento sin asumir que son intercambiables en cualquier contexto.
3. Seguir cambios de foco a través de un diálogo o texto breve.
4. Reescribir oraciones conservando quién realiza y quién recibe la acción.
5. Justificar con apoyo una elección de construcción y producir un mini texto de 3–4 oraciones.

## Inventario de vocabulario

U3 no añade vocabulario ni IDs. Reutiliza las cuatro entradas canónicas de U2:

- `b2u2_kubaca` — `kubaca`
- `b2u2_kaubaca` — `kaubaca`
- `b2u2_kutulis` — `kutulis`
- `b2u2_kautulis` — `kautulis`

Las lecciones recuperan además los nueve IDs de U1: `v211`, `v212`, `v213`, `v214`, `v8`, `b1v001`, `b1v002`, `b1v003` y `b1v004`. Se conservan sus formas y glosas canónicas. No se duplican IDs ni se cambian entradas previas.

## Lecciones implementadas

### Lección 1 — Reconocer quién actúa y qué queda en primer plano

Contrasta activa, pasiva y `ku-/kau-` con pares contextualizados. Identifica agente y participante afectado y conserva el acontecimiento al cambiar el punto de partida.

### Lección 2 — Seguir el foco cuando cambia el contexto

Interpreta qué elemento enlaza con el diálogo anterior, distingue cambios de agente y punto de partida y evita inferir tiempo o aspecto únicamente por `ku-/kau-`.

### Lección 3 — Reescribir sin cambiar los participantes

Integra los patrones de U1 y U2, detecta inversiones accidentales de roles y produce un texto guiado de 3–4 oraciones con una justificación breve.

## Banco de ejercicios

**16 ejercicios**, distribuidos en tres lecciones `[5, 5, 6]`:

| Tipo | Cantidad |
|---|---:|
| Opción múltiple | 5 |
| Traducción contextual | 3 |
| Ordenación | 2 |
| Escucha | 3 |
| Escritura | 3 |
| **Total** | **16** |

Se incluyen al menos cinco objetivos de oración completa y dos tareas de escritura guiada. La escucha usa el mecanismo local existente; no añade servicios ni dependencias.

## Guardarraíles

- No presentar `meN-`, `di-` y `ku-/kau-` como equivalencias mecánicas.
- No etiquetar universalmente `ku-/kau-` como pasiva ni inferir tiempo/aspecto desde la forma aislada.
- No cambiar los roles semánticos durante una reescritura.
- No introducir vocabulario, IDs, glosas ni familias de afijos nuevas.
- Mantener U4–U60 sin implementar y B2 en desarrollo.
- No modificar A1/A2/B1, IndexedDB, backup JSON v3 ni trackers.
- No presentar el contenido como validación nativa ni certificación MCER/BIPA.

## Verificación prevista

Las pruebas deben comprobar contrato de unidad, cinco tipos, frases completas, producción guiada, referencias a IDs existentes, coherencia de roles, desbloqueo secuencial U1 → U2 → U3 y ausencia de exposición de U4+. El service worker sube a `v3.8.83` para que instalaciones previas reciban los nuevos archivos sin borrar progreso local.
