# Inglés americano A2 — fuentes y trazabilidad

Estado: primer bloque U1–U6 en desarrollo; el nivel no está publicado. Fecha: 26 de noviembre de 2026.

## Fuentes y alcance

- **CEFR-J Wordlist v1.6** — referencia de nivel y selección léxica. La página oficial informa 1.411 entradas por categoría gramatical y 1.352 headwords de referencia para A2. La lista distingue categorías gramaticales y niveles; esos recuentos no equivalen a palabras que deban enseñarse en este curso.
  - https://cefr-j.org/download_eng.html
  - Fuente oficial consultada el 2026-11-26: https://cefr-j.org/download_eng.html; la página enlaza el archivo ZIP CEFR-J Wordlist v1.6.
  - La descarga directa del ZIP no se pudo procesar en esta revisión; por tanto, no se afirma que los 132 lemas se hayan cotejado individualmente contra la hoja A2.
  - La lista original no se copia ni se redistribuye en el repositorio. La trazabilidad individual de cada lema frente a la hoja A2 queda pendiente; por eso todas las entradas siguen not_checked.
- **CEFR-J Grammar Profile, Teacher's Version v20200220** — referencia para la progresión gramatical. No se copian sus tablas ni se presentan las unidades como equivalentes certificados del perfil.
  - https://cefr-j.org/download_eng.html
  - Ishii, Y., & Tono, Y. (2018), Investigating Japanese EFL learners' overuse/underuse of English grammar categories and their relevance to CEFR levels.
- **CEFR Companion Volume (2020)** — marco para redactar objetivos comunicativos propios y parafraseados; no se reproducen descriptores extensos.
  - https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4
  - Council of Europe (2020), Common European Framework of Reference for Languages: Learning, Teaching, Assessment — Companion volume.

## Bloque U1–U6

- U1: hábitos y situaciones temporales; estilo de vida y bienestar.
- U2: adverbios de frecuencia, expresiones temporales, horarios y plazos.
- U3: like/enjoy + -ing; want/need + to-infinitive; intereses y aficiones.
- U4: pasado simple afirmativo y marcadores temporales.
- U5: pasado simple negativo/interrogativo; celebraciones y experiencias.
- U6: pasado continuo frente a pasado simple; interrupciones e incidentes.
- 6 unidades × 5 lecciones explícitas; 22 entradas nuevas por unidad; 20 ejercicios por unidad (10 de banco + 2 por lección), con tipos existentes mc y order.
- 132 targets únicos en el bloque; cero duplicados internos y cero coincidencias exactas con los 638 targets del A1 authored en la rama base de esta PR.
- Ejemplos redactados para este curso; no se copian frases de libros, apps o corpus.

## Verificación

- Cada entrada tiene el esquema vigente id, target, esp, ex, exEsp, verification.
- Todas las entradas se crean como not_checked, con sources: []. No se afirma cotejo individual CEFR-J/NGSL ni validación nativa.
- La comparación automatizada contra A1 cubre los 638 targets presentes en la rama A1 usada como base. Si A1 cambia antes de integrar esta PR, repetir el test tras sincronizar ramas.
- No se añaden POS, audio por palabra, dependencias ni campos de runtime. El motor actual solo ofrece mc y order; no se afirma evaluar escucha real, pronunciación, producción oral ni escritura libre.
- language-manager.js conserva en.available: false; A2 no se puede seleccionar ni se publica desde esta PR.
- No se cambian IndexedDB v1, backup JSON v3, otros idiomas ni el currículo PT-BR.


## Bloque U7–U10 — 27 de noviembre de 2026

- U7: relatos de incidentes; contraste pasado simple/pasado continuo con when/while.
- U8: secuenciadores narrativos y experiencias de viaje.
- U9: used to para hábitos y estados de infancia.
- U10: repaso integrado sin vocabulario nuevo; reutiliza 20 IDs A2 anteriores.
- U7–U9 añaden 66 targets; 5 lecciones explícitas y 20 ejercicios por unidad. U10 tiene 5 lecciones y 20 ejercicios, con 0 entradas nuevas.
- El bloque añade 66 targets sin duplicados internos ni coincidencias exactas con A1 o A2 U1–U6. Total A2 U1–U10: 198 entradas nuevas.
- Vocabulario not_checked; trazabilidad individual CEFR-J pendiente. No POS/audio, ni cambios de almacenamiento o disponibilidad.


## Bloque U11–U14 — 27 de noviembre de 2026

- U11: intenciones, metas y preparativos con be going to.
- U12: predicciones, decisiones espontáneas, promesas y ofrecimientos con will/won't.
- U13: acuerdos y citas organizadas con presente continuo de futuro.
- U14: posibilidad e incertidumbre con may/might y condiciones.
- 4 unidades, 20 lecciones explícitas, 88 entradas nuevas y 80 ejercicios.
- Los 88 targets son únicos dentro del bloque y no coinciden exactamente con los 638 targets A1 ni con los 198 targets A2 U1–U10.
- Total A2 U1–U14: 286 entradas nuevas; U10 continúa como repaso sin vocabulario.
- Vocabulario not_checked; cotejo individual CEFR-J pendiente. Sin POS/audio ni cambios al runtime.


## Bloque U15–U18 — 27 de noviembre de 2026

- U15: contraste entre be going to, will y presente continuo para planes, decisiones y cambios de viaje.
- U16: comparativos para precios, calidad, comodidad y características de productos/ciudades.
- U17: superlativos para destacar atracciones, paisajes, gastronomía y servicios.
- U18: igualdad, diferencias y suficiencia con as...as, not as...as, too y enough.
- 4 unidades, 20 lecciones, 88 entradas nuevas y 80 ejercicios.
- Total A2 U1–U18: 374 entradas nuevas; U10 continúa como repaso sin vocabulario.
- Las entradas siguen not_checked; cotejo individual CEFR-J pendiente. Sin POS/audio ni cambios al runtime.


## Bloque U19–U22 — 26 de noviembre de 2026

- U19: modificadores de grado e intensidad para matizar descripciones y opiniones.
- U20: repaso integrado II sin vocabulario nuevo; reutiliza 20 IDs de U19 y U15–U18.
- U21: reglas, permisos, prohibiciones y obligaciones con must/mustn't/have to/don't have to.
- U22: consejos y bienestar con should/shouldn't, síntomas y hábitos saludables.
- U19, U21 y U22 añaden 66 entradas nuevas; U20 añade 0. El bloque tiene 20 lecciones y 80 ejercicios.
- Total A2 U1–U22: 440 entradas léxicas nuevas; U10 y U20 son repasos sin vocabulario. Manifiesto actualizado hasta U22.
- Entradas not_checked; cotejo individual CEFR-J pendiente. Los ejemplos son originales; no se afirma validación nativa ni certificación MCER.
- Se conserva el esquema runtime vigente y los tipos mc/order; sin POS/audio, dependencias ni cambios de almacenamiento. Inglés continúa available:false y «Próximamente».


## Bloque U23–U26 — 26 de noviembre de 2026

- U23: peticiones y ofrecimientos corteses con can/could/may y fórmulas como would you mind.
- U24: primer condicional para condiciones, consecuencias probables y medidas preventivas.
- U25: sustantivos contables/incontables con recipientes y medidas.
- U26: cuantificadores para cantidades y proporciones.
- 4 unidades, 20 lecciones, 80 ejercicios y 88 entradas léxicas nuevas. Auditoría estática: 88 targets únicos, sin duplicados internos ni coincidencias exactas con los 440 targets A2 U1–U22. La comparación con los 638 targets A1 queda cubierta por el test automatizado de CI.
- El manifiesto y los tests se amplían hasta U26. Entradas not_checked; cotejo individual CEFR-J pendiente. Ejemplos originales; no se afirma validación nativa ni certificación MCER.
- Se conserva el esquema runtime y los tipos mc/order; sin POS/audio, dependencias ni cambios de almacenamiento. Inglés continúa available:false y «Próximamente».


## Bloque U23–U26 — 26 de noviembre de 2026

- U23: peticiones y ofrecimientos corteses con can/could/may y fórmulas indirectas.
- U24: condiciones y consecuencias con first conditional, unless, otherwise y medidas preventivas.
- U25: recipientes y medidas para cuantificar alimentos contables e incontables.
- U26: cuantificadores y proporciones en compras y consumo.
- Cuatro unidades, 20 lecciones y 80 ejercicios; 88 entradas nuevas (22 por unidad). Total A2 U1–U26: 528 entradas nuevas; U10 y U20 siguen como repasos sin vocabulario.
- Revisión de duplicados exactos contra A1 y A2 anterior; ejemplos originales. Entradas nuevas `not_checked`; cotejo individual CEFR-J y validación nativa pendientes.
- Se conserva el esquema runtime, los tipos `mc`/`order`, inglés `available:false`, IndexedDB v1, backup JSON v3 y el resto de idiomas sin cambios.


## Bloque U27–U30 — 26 de noviembre de 2026

- U27: precios, compras, devoluciones, cambios y reclamaciones.
- U28: imperativos y verbos para preparar y cocinar alimentos.
- U29: peticiones en restaurantes, restricciones alimentarias y resolución de errores del pedido.
- U30: repaso integrado III sin vocabulario nuevo; reutiliza vocabulario de U27–U29 y unidades previas.
- Cuatro unidades, 20 lecciones y 80 ejercicios; 66 entradas nuevas en U27–U29 (22 por unidad) y 0 en U30. Total A2 U1–U30: 594 entradas nuevas; U10/U20/U30 son repasos.
- Ejemplos originales. Entradas nuevas `not_checked`; cotejo individual CEFR-J y validación nativa pendientes. Se mantiene el esquema runtime y los tipos `mc`/`order`; inglés `available:false`, IndexedDB v1 y backup JSON v3 intactos.

- Corrección editorial tras CI: `try on` y `slice` coincidían exactamente con lemas A1; se sustituyeron por `check the fit` y `dice`, con ejemplos y ejercicios alineados. La comparación completa automatizada vuelve a ser el criterio de aceptación.


## Bloque U31–U34 — 27 de noviembre de 2026

- U31: transporte, horarios, tarifas, rutas, conexiones y equipaje.
- U32: preguntas indirectas y resolución de problemas de viaje.
- U33: molestias, lesiones leves y atención básica con have got, should y need to.
- U34: tareas domésticas y phrasal verbs frecuentes.
- Cuatro unidades, 20 lecciones, 80 ejercicios y 88 entradas nuevas. Total A2 U1–U34: 682 entradas; U10/U20/U30 siguen como repasos sin vocabulario.
- Auditoría estática del inventario A2: 682 targets únicos, sin duplicados exactos entre U1–U34. La prueba automatizada compara también el inventario contra A1.
- Ejemplos originales; entradas `not_checked`, cotejo individual CEFR-J y validación nativa pendientes. Se conserva el esquema runtime, `mc`/`order`, `available:false`, IndexedDB v1 y backup JSON v3.
