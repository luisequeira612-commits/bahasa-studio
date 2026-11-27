# Inglés americano B1 — fuentes, plan y trazabilidad

**Estado:** temario completo aprobado por el usuario el 27 de noviembre de 2026. Implementación iniciada en bloques pequeños; solo U1–U4 están en este primer bloque. El nivel permanece sin publicar.

## Estructura aprobada
- 52 unidades, 5 lecciones explícitas por unidad y 20 ejercicios por unidad: 260 lecciones y 1.040 ejercicios al completar el nivel.
- Repasos/evaluaciones sin vocabulario nuevo: U10, U20, U30, U40, U50 y U52.
- 46 unidades de contenido. Objetivo orientativo de 20–22 entradas nuevas por unidad, no cuota; reducir cuando la deduplicación y la frecuencia no justifiquen términos adicionales.
- Formato runtime existente: cinco lecciones, 10 ejercicios de banco y dos por lección, solo tipos `mc` y `order`.

## Temario aprobado U1–U52
1. Present perfect vs past simple — hitos personales y experiencias con fechas.
2. Ever, never, just, already, yet — viajes y experiencias.
3. Present perfect continuous — actividades y duración reciente.
4. Past perfect básico — antecedentes y secuencia de acontecimientos.
5. Narrative tenses — historias, accidentes y recuerdos.
6. Used to / would — infancia y hábitos pasados.
7. Be used to / get used to — adaptación y cambios.
8. Past perfect vs past simple — estudios, trabajo y secuencia.
9. Secuenciadores narrativos — contar experiencias con claridad.
10. Review I.
11. Contraste de formas futuras — planes, arreglos y decisiones.
12. Future continuous — horarios y eventos futuros.
13. Be about to / be due to / be likely to — eventos inminentes.
14. Will / may / might / probably — predicciones y certeza.
15. First conditional ampliado — problemas y consecuencias.
16. Second conditional — hipótesis y deseos.
17. Unless / as long as / provided that — condiciones y acuerdos.
18. Cláusulas temporales futuras — when, as soon as, until, before, after.
19. Was/were going to — planes que cambiaron.
20. Review II.
21. Obligación y expectativa — must, have to, need to, be supposed to.
22. Permiso y peticiones — could, may, would you mind.
23. Deducción presente — must, might, can't.
24. Modales en pasado — should have, could have, might have, can't have.
25. Consejos y críticas — should, ought to, had better.
26. Habilidad y logro — can, could, be able to, manage to, succeed in.
27. Gerundio o infinitivo — patrones verbales frecuentes.
28. Patrones con objeto — allow, encourage, make, let, verbos de percepción.
29. Phrasal verbs — separabilidad, objeto y partículas.
30. Review III.
31. Relative clauses definitorias y no definitorias.
32. Whose / where / when y omisión del relativo.
33. Reported statements — conversaciones y noticias.
34. Reported questions y commands — entrevistas e instrucciones.
35. Passive voice — presente, pasado y futuro.
36. Pasiva con modales y get-passive.
37. Causative have/get something done — reparaciones y servicios.
38. Wish / if only — deseos y arrepentimientos.
39. Concesión y contraste — although, even though, despite, in spite of.
40. Review IV.
41. Discourse markers — adición, contraste y resultado.
42. Causa y propósito — because of, due to, so that, in order to.
43. Indirect questions y question tags.
44. So / such / too / enough e intensificadores.
45. Formación de adverbios y adjetivos.
46. Artículos y determinantes — abstractos, incontables y cuantificadores.
47. Word formation — prefijos, sufijos y compuestos.
48. Collocations y dependent prepositions.
49. Comunicación profesional — reuniones, entrevistas y presentaciones.
50. Review V.
51. Argumentar, negociar y resolver problemas — opiniones, reclamaciones, resúmenes y paráfrasis.
52. B1 Final Check.

## Fuentes y uso
- **CEFR-J Wordlist v1.6:** referencia para selección y nivelación léxica B1; no copiar ni redistribuir la lista original. https://cefr-j.org/download_eng.html
- **CEFR-J Grammar Profile:** referencia interna para secuenciación; no reproducir tablas sin permiso. https://cefr-j.org/download_eng.html
- **CEFR Companion Volume (2020):** orientar objetivos comunicativos con paráfrasis propias, sin reproducir descriptores extensos. https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4
- **NGSL 1.2:** solo prioridad interna por frecuencia; no distribuir el listado adaptado. Licencia CC BY-SA 4.0.
- Ejemplos originales, breves y contextualizados. No copiar contenido de libros, apps o listas comerciales.
- Enfoque para hispanohablantes: present perfect/past simple; gerundio/infinitivo; preposiciones y collocations; phrasal verbs; orden de palabras; falsos amigos y pronunciación/acentuación del inglés americano.

## Primer bloque U1–U4
- U1: present perfect vs past simple; hitos y experiencias personales.
- U2: ever/never/just/already/yet; viajes y experiencias acumuladas.
- U3: present perfect continuous; actividades recientes, duración y hábitos.
- U4: past perfect; antecedentes y secuencia de acontecimientos.
- 4 unidades, 20 lecciones, 80 ejercicios y 88 entradas nuevas (22 por unidad).
- Los targets se comparan con los inventarios completos A1 y A2. Todas las entradas comienzan `not_checked`; no se afirma cotejo individual CEFR-J ni validación nativa.
- El motor actual no evalúa escucha real, pronunciación, habla ni redacción libre. No se añaden POS/audio, campos runtime, tipos de ejercicio ni dependencias.
- Inglés permanece `available:false). No cambiar IndexedDB v1, backup JSON v3, PT-BR ni otros idiomas.


## Corrección tras la primera regresión — 27 de noviembre de 2026
- La primera ejecución automatizada detectó 25 coincidencias exactas con el inventario A1/A2 en U1–U4. Se sustituyeron los targets coincidentes por alternativas y se alinearon sus ejemplos, traducciones, frases modelo y ejercicios de banco.
- La comparación completa se repetirá sobre el nuevo head; no se considera aprobado el bloque hasta que la regresión y el resto de CI terminen en verde.

- Segundo pase CI: persistía una única coincidencia exacta con A1/A2 (`in the meantime`); se sustituyó por `in the interim`. Repetir regresión completa sobre el head actualizado.

- El pase de deduplicación contra A1/A2 ya es verde (88 targets únicos sin solapamiento exacto). La siguiente regresión encontró solo una expectativa errónea en el test: `loadUnits` devuelve `totalUnits: 52` (tamaño completo del nivel), no 4 (unidades authored). Se corrigió la aserción; repetir CI.


## Bloque U5–U8 — 27 de noviembre de 2026
- U5: narrative tenses y recursos narrativos (historias, flashbacks, perspectiva, suspense y desenlace).
- U6: used to / would para hábitos y estados de la infancia.
- U7: be used to / get used to para adaptación, costumbres y nuevas rutinas.
- U8: past perfect vs past simple para estudios, trabajo y secuencia temporal.
- 4 unidades, 20 lecciones, 80 ejercicios y 88 entradas nuevas; acumulado B1 U1–U8: 8 unidades, 40 lecciones, 160 ejercicios y 176 entradas.
- Se amplían manifiesto y tests para comprobar estructura, referencias y deduplicación exacta de todo B1 U1–U8 contra A1/A2. CI pendiente en este momento.
- Entradas nuevas `not_checked`; no se afirma cotejo individual CEFR-J, validación nativa ni certificación MCER. Sin cambios de esquema, dependencias, almacenamiento ni disponibilidad.

- Revisión editorial adicional antes de abrir el siguiente bloque: se corrigieron dos frases de banco para que practiquen exactamente `coming-of-age` (U1) y `school uniform` (U6). Auditoría estática del acumulado U1–U8: 176 targets únicos y sin duplicados exactos internos; CI verificará solapamiento con A1/A2 y referencias.
- PR #915 (U1–U4) pasó CI en el head `6f9a08e9f24f36421fe907b0b99169f6f769bce2`: regresión 103/103, TypeScript y calidad offline success. Sigue abierta y sin fusionar.

- Auditoría CI inicial de U1–U8 detectó seis coincidencias exactas con A1/A2 en U6/U8: `playground`, `classmate`, `supervisor`, `assignment`, `scholarship`, `study group`. Sustituidas por `play area`, `school friend`, `team lead`, `coursework`, `tuition waiver`, `study session`; se reejecutará la regresión para confirmar que no quedan solapamientos.
