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

Esta tanda no añade nuevas entradas `verified_primary` ni afirma validación por hablante nativo. El registro conserva dos verificaciones primarias previas de U1 (`a2u1_minggu` y `a2u1_bulan`); no deben interpretarse como una revisión completa de U1 ni del resto de A2.

## Resumen por unidad

| Unidad | Contenido comprobado | Estado técnico | Pendiente principal |
|---|---|---|---|
| A2 U1 — Días, meses y fechas | 5 lecciones, 24 entradas, 21 ejercicios; incluye producción guiada de fecha completa: `Hari ini tanggal 17 Agustus.` | Cobertura de producción de fecha presente; se aclaró la distinción entre preguntar por la fecha (`Tanggal berapa hari ini?`) y por el día (`Hari apa hari ini?`) | Revisar el patrón completo con año, variedad de fechas y adecuación de ejemplos; no se certifica naturalidad |
| A2 U2 — Cuándo ocurre una acción | 4 lecciones, 14 entradas, 17 ejercicios; se añadió contraste explícito entre `belum` y `masih` | Contraste añadido como ejercicio de opción múltiple y prueba de regresión | Revisión lingüística/pragmática del contraste y de sus contextos |
| A2 U3 — Secuencias | 4 lecciones, 12 entradas, 17 ejercicios; la primera lección distingue rutina (`setiap hari`) de hecho pasado (`kemarin`) | Contexto temporal explícito y redacción española afinada para describir pasos, continuación y cierre | Revisar variedad de secuencias, consistencia temporal y claridad de ejemplos; falta revisar puntuación y uso en contexto |
| A2 U4 — Jornada cotidiana | 4 lecciones, 10 entradas, 15 ejercicios; se añadió una tarea que integra dos actividades con horas y una descripción global del día | Se ajustó la consigna para que «horario lleno» y «ritmo tranquilo» no se presenten como la misma categoría | Revisar naturalidad, progresión, respuestas alternativas y si el vocabulario previo basta para completar la tarea |

## Revisión puntual de U1 con fuentes

- Se afinó la explicación de mayúsculas: ahora habla de nombres de días y meses, sin calificarlos imprecisamente como «nombres propios».
- Se distingue explícitamente la pregunta por el número de la fecha, `Tanggal berapa hari ini?`, de la pregunta por el día de la semana, `Hari apa hari ini?`.
- La regla de mayúsculas se contrastó con la sección de [Huruf Kapital de EYD V](https://ejaan.kemendikdasmen.go.id/eyd/penggunaan-huruf/huruf-kapital/), que prescribe mayúscula para nombres de meses y días.
- La diferencia funcional entre las preguntas y el patrón de fecha se contrastó con el [Learner’s Dictionary of Today’s Indonesian](https://api.pageplace.de/preview/DT0400.9781000251845_A40102783/preview-9781000251845_A40102783.pdf).
- Esta consulta respalda esas decisiones puntuales, pero no constituye una revisión nativa completa de la unidad ni valida todos sus ejemplos.

## Segunda revisión puntual de U2–U4

- U2: se conserva el contraste contextual `Saya belum makan` / `Saya masih makan`. Las fuentes consultadas respaldan el valor de `belum` como «todavía no» y el de `masih` como continuidad, pero no justifican convertir esa oposición en una regla absoluta para todos los predicados. Véanse las notas gramaticales sobre [`belum`](https://elon.io/grammar/indonesian/aspect-modality/belum) y la descripción de [marcadores aspectuales y temporales](https://files.eric.ed.gov/fulltext/ED021206.pdf). La prueba sigue limitada a ese par de ejemplos.
- U3: se simplificó la formulación española de la explicación general y se corrigió la traducción de `Sebelumnya, saya belajar.` a «Antes de eso, estudié», para que el ejemplo use un marco pasado coherente. Se añadió una aserción de regresión. Como referencia secundaria, la descripción de [`pertama`, `kemudian`, `lalu` y `akhirnya`](https://elon.io/grammar/indonesian/discourse-markers/sequence) respalda su función organizadora, pero aún falta revisar cada oración y la puntuación de los conectores.
- U4: la consigna ahora distingue entre tener el horario lleno y llevar un ritmo tranquilo; la prueba comprueba que la consigna mantenga esa distinción. Esto resuelve una incoherencia editorial de la consigna, no certifica la naturalidad global de la unidad.

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
