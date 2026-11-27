# Inglés americano B1 — fuentes, plan y trazabilidad

**Estado:** temario completo aprobado por el usuario el 27 de noviembre de 2026. Implementación en bloques pequeños; U1–U28 están authored en siete bloques apilados. El nivel permanece sin publicar.

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

- Corrección tras la segunda ejecución de CI: dos sustituciones habían quedado aplicadas accidentalmente en U5 en vez de U6. Se restauraron `plot twist` y `storyline` en U5 y se aplicaron `play area` y `school friend` a U6. Nueva regresión pendiente.


## Bloque U9–U12 — 27 de noviembre de 2026
- U9: secuencia y ritmo narrativo; U10: repaso I sin vocabulario nuevo; U11: planes, predicciones y decisiones futuras; U12: future continuous.
- 4 unidades, 20 lecciones, 80 ejercicios; 66 entradas nuevas (U9/U11/U12, 22 cada una), U10 tiene `vocab: []` y referencias de repaso a vocabulario anterior. B1 U1–U12 acumula 242 entradas únicas.
- Manifiesto y tests cubren U1–U12, la unidad de repaso con cero vocabulario nuevo y referencias cruzadas a IDs B1 anteriores. Auditoría estática interna: 242/242 únicos.
- Nuevas entradas `not_checked`; sin revisión nativa ni certificación CEFR. CI pendiente.

- Ajuste de variedad en-US en U12: `check-in desk` → `check-in kiosk`, `arrival hall` → `arrivals area`, `temporary cover` → `temporary coverage`, `handover meeting` → `handoff meeting`. Se priorizan formas habituales en inglés estadounidense; `check-in counter` se evitó por coincidir con B1 U2. CI del head actualizado pendiente.

- Auditoría de coincidencias con A2 en U9/U11/U12: se sustituyeron `meanwhile`, `in the meantime`, `all of a sudden`, `eventually`, `reschedule`, `postpone`, `be due to`, `layover`, `delivery window`, `training session`, `appointment slot` y `departure gate` por `in parallel`, `during that interval`, `out of nowhere`, `at long last`, `set a new date`, `defer`, `be expected to`, `connection time`, `delivery period`, `skills workshop`, `appointment window` y `boarding area`. Se actualizaron también los modelos de ordenación afectados. Nueva CI pendiente.

- La primera ejecución de regresión no encontró solapamientos A1/A2 (la prueba de 242 términos pasó); falló solo una aserción `deepStrictEqual` entre arrays de distinto contexto VM al comprobar `vocabIds: []` en U10. Sustituida por comprobación de longitud cero; reejecución pendiente.


## Bloque U13–U16 — inglés americano B1
- U13: eventos inminentes y planes previstos; U14: predicciones y grados de certeza; U15: primer condicional y consecuencias; U16: segundo condicional e hipótesis.
- Añade 4 unidades, 20 lecciones, 80 ejercicios y 88 entradas nuevas (22 por unidad). El acumulado U1–U16 es 16 unidades, 80 lecciones, 320 ejercicios y 330 entradas nuevas; U10 sigue siendo repaso sin vocabulario nuevo.
- El manifiesto y el contrato de currículo se amplían hasta U16. Las pruebas comparan todos los targets B1 contra A1/A2 y comprueban referencias de lecciones y bancos.
- Vocabulario nuevo `not_checked`; la comparación automatizada exacta no certifica nivel MCER, naturalidad nativa ni cotejo individual CEFR-J. Inglés sigue `available:false`; sin cambios a IndexedDB v1, backup JSON v3, dependencias ni otros idiomas.
- La primera CI detectó una coincidencia exacta de `be set to` con U11; U13 usa ahora `be penciled in for`, con ejemplo, traducción y ejercicios alineados. Auditoría estática: 330 targets únicos en U1–U16; la nueva regresión debe confirmar también la ausencia de solapamientos A1/A2.
- La comparación local contra A1/A2 detectó `at short notice` y `check the details`; se cambiaron a `on short notice` (forma estadounidense) y `verify the figures`, con ejemplos y glosas actualizados. La CI integral debe confirmar cero coincidencias.


## Bloque U17–U20 — inglés americano B1
- U17: condiciones, excepciones y acuerdos; U18: cláusulas temporales de futuro; U19: planes que cambiaron; U20: Review II sin vocabulario nuevo.
- Añade 3 unidades de contenido (66 entradas nuevas, 15 lecciones) y una unidad de repaso (5 lecciones, 0 entradas nuevas). El bloque suma 4 unidades, 20 lecciones y 80 ejercicios.
- Acumulado U1–U20: 20 unidades, 100 lecciones, 400 ejercicios y 396 entradas nuevas; U10 y U20 son repasos sin vocabulario.
- Auditoría estática de B1: 396/396 targets únicos. Comparación de los targets U17–U19 contra los inventarios A1/A2: sin coincidencias exactas. Entradas nuevas `not_checked`; no se presenta como certificación CEFR ni validación nativa.
- Manifiesto y tests amplían la carga a U20. Inglés continúa `available:false`; sin cambios a IndexedDB v1, backup JSON v3, dependencias ni otros idiomas.
- Primera CI de U17–U20 detectó dos coincidencias exactas con A1/A2 en U18 (`once`, `ahead of time`); sustituidas por `once the paperwork is complete` y `well ahead of schedule`, con ejemplos y traducciones alineados. Nueva CI pendiente.


## Bloque U21–U24 — inglés americano B1
- U21: obligación, responsabilidad y expectativas; U22: permisos y peticiones corteses; U23: deducción y certeza en el presente; U24: modales en pasado y arrepentimiento.
- Añade 4 unidades de contenido, 20 lecciones, 80 ejercicios y 88 entradas nuevas (22 por unidad).
- Acumulado U1–U24: 24 unidades, 120 lecciones, 480 ejercicios y 484 entradas nuevas. U10 y U20 siguen siendo repasos sin vocabulario nuevo.
- Vocabulario nuevo `not_checked`; los controles automáticos verifican estructura y coincidencias exactas, no certifican nivel CEFR ni naturalidad nativa. Inglés continúa `available:false` hasta completar B1 y sus gates.
- Sin cambios a IndexedDB v1, backup JSON v3, dependencias, audio, red ni otros idiomas.
- Primera CI de U21–U24 detectó coincidencias A1/A2 en U21/U22; se cambiaron a `be entrusted with`, `would you be so kind as to` e `I would appreciate it if`, con ejemplos y traducciones actualizados. Nueva CI pendiente.


## Bloque U25–U28 — inglés americano B1
- U25: consejos, recomendaciones y críticas; U26: capacidad, esfuerzo y logros; U27: patrones de gerundio e infinitivo; U28: patrones con objeto.
- Añade 4 unidades de contenido, 20 lecciones, 80 ejercicios y 88 entradas nuevas (22 por unidad).
- Acumulado U1–U28: 28 unidades, 140 lecciones, 560 ejercicios y 572 entradas nuevas. U10 y U20 siguen siendo repasos sin vocabulario nuevo.
- Deduplicación estática B1: 572/572 targets únicos. U25–U28 comparadas contra A1/A2 sin coincidencias exactas tras cambiar `make progress` por `show steady improvement`. Vocabulario `not_checked`; no es certificación CEFR ni revisión nativa.
- Inglés continúa `available:false` hasta completar B1 y sus gates. Sin cambios a IndexedDB v1, backup JSON v3, dependencias, audio, red ni otros idiomas.
