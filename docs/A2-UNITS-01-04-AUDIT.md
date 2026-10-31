# Auditoría editorial A2 — unidades 1–4

Fecha de trabajo: 2026-10-31  
Rama: `feat/a2-u1-u4-editorial-consolidation`  
Base: `main`  
Estado: **primera pasada estructural y didáctica actualizada; revisión lingüística externa pendiente**.

## Alcance

Este documento registra evidencia comprobable en el código y separa:
- cobertura didáctica y coherencia interna comprobables mediante pruebas;
- decisiones editoriales que requieren revisión;
- naturalidad, registro y corrección lingüística que no se certifican con CI.

No se marca ninguna entrada como `verified_primary` ni se afirma validación por hablante nativo.

## Resumen por unidad

| Unidad | Contenido comprobado | Estado técnico | Pendiente principal |
|---|---|---|---|
| A2 U1 — Días, meses y fechas | 5 lecciones, 24 entradas, 21 ejercicios; incluye producción guiada de fecha completa: `Hari ini tanggal 17 Agustus.` | Cobertura de producción de fecha presente y protegida por prueba existente | Revisar el patrón completo de fechas, variedad de fechas y adecuación de ejemplos; no se certifica naturalidad |
| A2 U2 — Cuándo ocurre una acción | 4 lecciones, 14 entradas, 16 ejercicios; se añadió contraste explícito entre `belum` y `masih` | Contraste añadido como ejercicio de opción múltiple y prueba de regresión | Revisión lingüística/pragmática del contraste y de sus contextos |
| A2 U3 — Secuencias | 4 lecciones, 12 entradas, 17 ejercicios; la primera lección distingue rutina (`setiap hari`) de hecho pasado (`kemarin`) | Contexto temporal explícito y prueba existente | Revisar variedad de secuencias, consistencia temporal y claridad de ejemplos |
| A2 U4 — Jornada cotidiana | 4 lecciones, 10 entradas, 14 ejercicios; se añadió una tarea que integra dos actividades con horas y una descripción global del día | Producción integrada añadida y protegida por prueba | Revisar naturalidad, progresión, respuestas alternativas y si el vocabulario previo basta para completar la tarea |

## Cambios de esta pasada

### U2 — contraste `belum` / `masih`

- La lección «Todavía y dentro de poco» ahora declara `a2u2_belum` como vocabulario de repaso.
- Se añadió una pregunta que contrasta:
  - `Saya belum makan`: todavía no he comido.
  - `Saya masih makan`: sigo comiendo.
- La respuesta correcta distingue una acción aún no realizada de una actividad/situación que continúa.
- Se añadió una prueba que fija la referencia de vocabulario, la opción correcta y la explicación.

La explicación es una simplificación pedagógica contextual; no pretende cubrir todos los usos de `belum` y `masih`.

### U4 — horario diario integrado

- La lección «Describir cómo es tu día» ahora incluye `a2u4_jadwal` como vocabulario de repaso.
- Se añadió una tarea escrita que pide dos actividades con sus horas y una descripción global.
- Modelo incorporado: `Pukul delapan saya belajar. Pukul dua belas saya makan. Jadwal saya penuh.`
- Se añadió una prueba que comprueba la consigna y los tres segmentos del modelo.

El modelo es una respuesta guiada, no una respuesta única. Las variantes válidas deben revisarse antes de ampliar el conjunto de respuestas aceptadas.

## Pruebas añadidas o existentes

- La prueba existente de A2 U1 comprueba que haya una tarea guiada de producción de fecha completa.
- La prueba existente de A2 U3 comprueba la distinción entre rutina y hecho pasado.
- Se añadió una prueba de cobertura de vocabulario para U1–U4: cada entrada nueva se introduce una sola vez y las referencias de repaso/ejercicio existen.
- Se añadió una prueba para el contraste `belum` / `masih` en U2.
- Se añadió una prueba para la producción integrada de horario en U4.

## Lista de cierre pendiente

### U1
- [ ] Revisar con evidencia competente la formulación de fechas completas y ejemplos con distintos días/meses.
- [ ] Comprobar si conviene enseñar también año y variaciones de contexto.
- [ ] Revisar las traducciones españolas y las respuestas aceptables.

### U2
- [ ] Revisar los matices de `belum` y `masih` en más de un contexto.
- [ ] Comprobar que las opciones distractoras no puedan interpretarse como correctas en otro contexto.
- [ ] Revisar traducciones, ejemplos y respuestas alternativas.

### U3
- [ ] Revisar conectores temporales y su combinación en secuencias de más de dos acciones.
- [ ] Comprobar que los ejemplos mantengan el marco temporal indicado.
- [ ] Revisar traducciones y respuestas aceptables.

### U4
- [ ] Revisar el modelo de horario y sus expresiones temporales.
- [ ] Comprobar la progresión desde actividades sueltas hasta una descripción integrada.
- [ ] Definir criterios para aceptar horarios alternativos y variantes de producción.

### Comprobaciones transversales
- [ ] Escuchar y probar el audio real en dispositivos; los ejercicios de tipo `listen` y sus respuestas escritas no prueban la calidad del audio.
- [ ] Probar escritura libre y conversación en una sesión completa.
- [ ] Revisar los exámenes acumulativos que evalúan contenidos de U1–U4.
- [ ] Registrar fuente, fecha y evidencia cuando una decisión lingüística dependa de una fuente externa.
- [ ] Mantener pendientes naturalidad, registro y adecuación de nivel hasta contar con revisión competente.

## Criterio de salida de esta tanda

U1–U4 no se declaran lingüísticamente cerradas por tener pruebas verdes. Esta tanda puede considerarse técnicamente consolidada cuando las pruebas de regresión pasan y las incidencias estructurales quedan resueltas. La aprobación editorial y lingüística requiere cerrar los puntos pendientes anteriores con evidencia trazable.

A2 permanece sujeto a su puerta explícita de publicación; este trabajo no habilita el nivel ni cambia la política de acceso.
