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
