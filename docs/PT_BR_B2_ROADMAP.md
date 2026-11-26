# Portugués brasileño B2 — temario de 40 unidades

## Corrección post-despliegue — renderizado de las 40 unidades PT-BR B2 — 26 nov 2026

- Tras fusionar PR #887, la verificación en navegador del sitio Pages confirmó PT-BR y B2 disponibles, pero reveló que la ruta todavía limitaba el renderizado a U1 y mostraba un aviso obsoleto de unidades no implementadas.
- Causa raíz: `renderCourseRoute()` conservaba un `slice(0, 1)` heredado y un placeholder de desarrollo, aunque el manifiesto ya publicaba U1–U40. No era un problema de los 13 bloques ni del Service Worker.
- Se corrige el renderizado para usar `getVisibleLearningUnits(level)` sin truncar la ruta a U1. El aviso de desarrollo se conserva únicamente para niveles B2 parciales (menos unidades cargadas que `totalUnits`); en PT-BR U1–U40 no debe aparecer. Se amplían `tests/curriculum-release-gates.test.cjs` y `tests/regression.test.cjs` para impedir el límite de una unidad y validar el placeholder condicional. Además, `tests/learning-screen-phase-5b.e2e.test.cjs` espera explícitamente a `AdaptiveLearning` antes de comprobar la tarjeta SRS, eliminando una carrera de carga detectada en CI.
- La progresión secuencial se conserva: las unidades posteriores siguen bloqueadas hasta completar los prerrequisitos. Sin cambios a IndexedDB v1, backup JSON v3, dependencias, audio ni red. Mantener `not_checked` y no afirmar certificación nativa/MCER.
- PR [#889](https://github.com/luisequeira612-commits/bahasa-studio/pull/889) fusionada por squash en `main` el 26 nov 2026 (merge commit `75d8bb557ab4bae5a197e200d6f03ae9a41c7bce`). CI pre-merge: regresión 103/103, calidad offline y TypeScript success. Post-merge: Pages build/deploy success (Actions #45906677258), regresión 103/103 success (#45906677759) y TypeScript success (#45906677957). Verificación de navegador en la URL publicada: 40 nodos visibles, U1–U40, cinco secciones y sin aviso obsoleto. Las unidades se mantienen bloqueadas hasta completar B1; no se alteró el progreso.


**Estado actual (26 nov 2026):** PT-BR está disponible en el selector y B2 está publicado en GitHub Pages. La ruta real muestra las 40 unidades en cinco secciones (U1–U40); U1 requiere completar B1 y las siguientes se desbloquean secuencialmente. El currículo contiene 40 unidades, 200 lecciones, 400 entradas léxicas y 800 ejercicios (400 `order` en bancos de unidad y 400 `mc` en lecciones). La revisión editorial/lingüística sigue pendiente; las entradas permanecen `not_checked` y este temario no equivale a una certificación oficial MCER.

## Auditoría integral específica PT-BR B2 — en curso

- La revisión directa de los 13 bloques confirma 40 unidades, 200 lecciones y 400 entradas; IDs únicos y sin duplicados exactos de términos o ejemplos tras normalización.
- Las 202 referencias de repaso encontradas apuntan a 48 IDs A2 existentes; no se detectaron referencias rotas.
- Se añade el contrato `tests/pt-br-curriculum-b2-full-audit.test.cjs` a `quality:tests`. Comprueba las 40 unidades completas, cinco lecciones por unidad, diez términos, cobertura de vocabulario, explicaciones de términos, ejemplos, 800 ejercicios (400 de unidad y 400 asociados a lecciones), opciones/respuestas, repaso A2 y disponibilidad desactivada. El primer barrido detectó explicaciones incompletas en U12, U19, U20, U25 y U28, además de cobertura de vocabulario duplicada/incompleta en U24, U25, U33 y U40; se corrigieron todas. El barrido estático posterior devuelve cero fallos de explicación y cobertura. La revisión conceptual corrigió U29 (criptografía homomórfica: cálculo sobre datos cifrados, no solo protección en tránsito; objetivo en español «una exfiltración») y la glosa de U37 `humor autodepreciativo` («humor autodespreciativo»). El contrato también compara términos B2 con A1/A2/B1 y acumula todas las coincidencias. La comparación acumulada encontró cinco repeticiones entre niveles: `sustentável` (A2 U12), `transparência` (B1 U11), `ressalva` y `consenso` (B1 U2), e `impasse` (B1 U4). Se sustituyeron por `exequível`, `mensurabilidade`, `condicionante`, `entendimento mútuo` y `entrave`, con ejemplos y explicaciones ajustados. CI de la versión corregida pendiente.
- Aclaración: el informe automático genérico anterior (`curriculum-quality-report.json`) analiza el B2 indonesio embebido en `index.html`, no el currículo PT-BR B2 modular; no se usa como evidencia de calidad del portugués.
- Estos controles son estructurales; no certifican naturalidad, gramática nativa, registro ni nivel MCER. Todas las entradas permanecen `not_checked`; no habilitar el curso.

## Siguiente fase: diversidad de ejercicios — extensión U1–U27

La auditoría PR #872 encontró que los 800 registros iniciales eran de opción múltiple y repetían las mismas 400 preguntas entre lección y banco de unidad. La mejora separa las modalidades de práctica sin reconstruir el currículo ni alterar sus 40 unidades.

- U1–U24 integradas en `main`: 240 actividades de banco de unidad usan `order`, reconstruyendo el ejemplo PT-BR asociado; 240 actividades de lección conservan `mc`.
- PR [#876](https://github.com/luisequeira612-commits/bahasa-studio/pull/876) (U10–U12), [#877](https://github.com/luisequeira612-commits/bahasa-studio/pull/877) (U13–U15), [#878](https://github.com/luisequeira612-commits/bahasa-studio/pull/878) (U16–U18), [#879](https://github.com/luisequeira612-commits/bahasa-studio/pull/879) (U19–U21) y [#880](https://github.com/luisequeira612-commits/bahasa-studio/pull/880) (U22–U24) fusionadas por squash. CI final de #880: regresión 103/103, calidad offline 10/10 y TypeScript correcto; sin revisiones pendientes.
- Rama actual `feat/pt-br-b2-exercise-variety-u25-u27`: U25–U27 convierten las 30 actividades de banco a `order`; las 30 actividades de lección permanecen `mc`. El contrato integral se amplía hasta U27 y valida inventario exacto de tokens, secuencia y mezcla.
- U1–U30 ya convierten sus bancos de unidad a `order`; U31–U33 también están preparados en la fase actual.
- PR #883 cubre U31–U33; su regresión tuvo un fallo en `Run local quality tests`, mientras type checks y el resto de pasos principales terminaron correctamente. No se fusiona ese PR hasta resolver/verificar el fallo.
- Rama `feat/pt-br-b2-exercise-variety-u34-u36`: U34–U36 convierten sus 30 actividades de banco a `order`; las 30 actividades de lección permanecen `mc`.
- U37–U40 completan la diversidad de bancos de unidad: las 40 unidades usan `order` en sus bancos y `mc` en las 200 actividades de lección.
- Tras la diversidad, queda la fase de verificación final: resolver cualquier fallo CI, ejecutar el contrato B2 completo, revisar gates de disponibilidad, habilitar PT-BR B2 y verificar Pages/Service Worker antes de declarar publicado.
- El tipo `order` ya está soportado por el motor de aprendizaje y se usa en A1. No se añaden dependencias, audio ni red.
- PT-BR continúa deshabilitado y B2 no se habilita. Esta fase no certifica naturalidad nativa ni nivel MCER.

## Criterios

- 40 unidades, cinco lecciones explícitas por unidad.
- Progresión desde B1: mayor precisión, densidad discursiva, flexibilidad sintáctica, registros y autonomía argumentativa.
- Evitar repetir como contenido nuevo los ejes ya trabajados en B1 (relatos básicos, argumentación inicial, hipótesis, medios, ciudad, ciencia, economía, cultura y negociación).
- Cada unidad incorpora vocabulario en contexto, explicaciones en español, ejemplos PT-BR y ejercicios vinculados a frases completas.
- El estado de las entradas nuevas permanece `not_checked` mientras no exista verificación documental individual suficiente. Las pruebas estructurales no certifican naturalidad ni nivel MCER.
- B2 permanece no disponible en el selector hasta completar el curso y sus pruebas. La manifestación parcial de U1–U40 solo permite validación interna; el curso no se habilita hasta completar la revisión y las pruebas.

## Secuencia propuesta

| Unidad | Eje principal | Competencia comunicativa |
|---:|---|---|
| 1 | Modalización y postura del hablante | Graduar certeza, limitar afirmaciones y explicitar reservas |
| 2 | Síntesis y atribución de fuentes | Parafrasear, atribuir y comparar hallazgos |
| 3 | Concesión y refutación matizada | Conceder objeciones y responder con evidencia |
| 4 | Nominalización y densidad informativa | Condensar procesos en textos formales sin perder claridad |
| 5 | Voz pasiva y enfoque informativo | Elegir el foco temático y omitir agentes recuperables |
| 6 | Oraciones relativas complejas | Precisar referentes y evitar ambigüedades |
| 7 | Subjuntivo en valoración, duda y emoción | Ajustar el modo a la postura del hablante |
| 8 | Condicionales irreales y escenarios alternativos | Explorar consecuencias hipotéticas complejas |
| 9 | Discurso indirecto y perspectiva | Reformular declaraciones y mantener atribución clara |
| 10 | Cohesión y progresión temática | Conectar párrafos y gestionar información conocida/nueva |
| 11 | Reformulación y precisión discursiva | Aclarar, corregir y delimitar una formulación |
| 12 | Comparación matizada | Expresar diferencias de grado, proporción y excepción |
| 13 | Causa, consecuencia y finalidad en registro formal | Construir cadenas argumentales complejas |
| 14 | Participios y construcciones resultativas | Describir estados derivados de procesos |
| 15 | Gerundio y relaciones entre acciones | Expresar simultaneidad y evitar ambigüedad |
| 16 | Verbos pronominales y matices aspectuales | Distinguir cambios de significado y perspectiva |
| 17 | Perífrasis verbales y modalidad | Expresar obligación, probabilidad, continuidad y conclusión |
| 18 | Colocaciones verbo-nominales | Producir combinaciones léxicas idiomáticas y precisas |
| 19 | Derivación y familias léxicas | Interpretar y elegir derivados según contexto y registro |
| 20 | Expresiones idiomáticas y uso contextual | Comprender sentido figurado sin traducir literalmente |
| 21 | Debate público y negociación avanzada | Mediar desacuerdos y construir acuerdos razonados |
| 22 | Registro académico y profesional | Ajustar tono, precisión y distancia interpersonal |
| 23 | Correspondencia formal y reclamaciones | Redactar solicitudes, quejas y respuestas fundamentadas |
| 24 | Presentaciones y entrevistas extensas | Sostener una exposición y responder preguntas imprevistas |
| 25 | Narrativa compleja y perspectiva | Alternar planos temporales y puntos de vista |
| 26 | Crónica y reportaje | Distinguir hechos, testimonios, interpretación y contexto |
| 27 | Datos, tendencias y cautela estadística | Describir cifras sin exagerar causalidad |
| 28 | Ciencia e incertidumbre | Comunicar límites, hipótesis y resultados provisionales |
| 29 | Tecnología, privacidad y ética | Argumentar sobre dilemas y consecuencias no previstas |
| 30 | Medioambiente y sostenibilidad | Comparar políticas y evaluar impactos |
| 31 | Sociedad, desigualdad e inclusión | Matizar generalizaciones y describir fenómenos sociales |
| 32 | Trabajo y transformación profesional | Analizar cambios laborales y sus efectos |
| 33 | Cultura, identidad y representación | Interpretar discursos culturales y puntos de vista |
| 34 | Salud y políticas públicas | Explicar recomendaciones, riesgos y decisiones colectivas |
| 35 | Educación y aprendizaje permanente | Evaluar métodos, resultados y límites |
| 36 | Consumo, finanzas y decisiones | Comparar escenarios y justificar elecciones complejas |
| 37 | Ironía, humor y subentendidos | Reconocer distancia entre sentido literal e intención |
| 38 | Ambigüedad, presuposición e implicatura | Inferir información implícita y detectar dobles lecturas |
| 39 | Proyecto argumentativo multimodal | Integrar lectura crítica, síntesis y defensa de una tesis |
| 40 | Proyecto final de autonomía B2 | Producir y revisar textos de varios géneros y registros |

## Bloques implementados: U1–U15

- U1: modalización y postura del hablante.
- U2: síntesis y atribución de fuentes.
- U3: concesión y refutación matizada.
- U4: nominalización y densidad informativa.
- U5: voz pasiva y enfoque informativo.
- U6: oraciones relativas complejas.
- U7: subjuntivo en valoración, duda y emoción.
- U8: condicionales irreales y escenarios alternativos.
- U9: discurso indirecto y perspectiva.
- U10: cohesión y progresión temática.
- U11: reformulación y precisión discursiva.
- U12: comparación matizada.
- U13: causa, consecuencia y finalidad en registro formal.
- U14: participios y construcciones resultativas.
- U15: gerundio y relaciones entre acciones.

## Bloque implementado: U16–U18

- U16: verbos pronominales y matices aspectuales.
- U17: perífrasis verbales y modalidad.
- U18: colocaciones verbo-nominales.

## Bloque de diversidad: U31–U33

- U31: desigualdad, inclusión y cohesión social.
- U32: trabajo, derechos y transformación laboral.
- U33: política pública, participación y gobernanza.
- Las actividades del banco de unidad pasan a `order`; las actividades de lección permanecen `mc`.

## Bloques implementados: U19–U21

- U19: derivación y familias léxicas.
- U20: expresiones idiomáticas y uso contextual.
- U21: debate público y negociación avanzada.

## Bloques implementados: U22–U24

- U22: registro académico y profesional.
- U23: correspondencia formal y reclamaciones.
- U24: presentaciones y entrevistas extensas.

## Bloques implementados: U25–U27

- U25: narrativa compleja y perspectiva.
- U26: crónica y reportaje.
- U27: datos, tendencias y cautela estadística.

## Bloque implementado: U28–U30

- U28: ciencia e incertidumbre.
- U29: tecnología, privacidad y ética.
- U30: medioambiente y sostenibilidad.

U1–U40 integradas contienen 200 lecciones y 400 entradas nuevas. Cada unidad incluye cinco lecciones y diez entradas. Las entradas nuevas permanecen `not_checked`; las pruebas verifican estructura, carga offline, referencias de repaso y duplicados normalizados, pero no certifican naturalidad ni nivel MCER.

## Bloque implementado: U31–U33

- U31: sociedad, desigualdad e inclusión (desigualdad estructural, movilidad social, disparidad regional, acción afirmativa, vulnerabilidad interseccional y cohesión social).
- U32: trabajo y transformación profesional (recualificación, trabajo por plataformas, vínculo laboral, negociación colectiva, protección previdenciaria y automatización).
- U33: cultura, identidad y representación (patrimonio inmaterial, apropiación cultural, curaduría, memoria colectiva, hibridismo, borrado histórico y pluralidad lingüística).
- Implementación en rama `feat/pt-br-b2-u31-u33`: 15 lecciones y 30 entradas nuevas, cinco lecciones y diez entradas por unidad; dos objetivos léxicos por lección; ejemplos PT-BR, explicaciones en español y ejercicios contextualizados. Entradas `not_checked`.
- El manifiesto de trabajo extiende la publicación interna hasta U1–U33; caché app-shell v3.8.163 y precarga offline. PT-BR continúa `available:false`; no se habilita el curso.
- Validación pendiente: contratos de estructura, referencias de repaso A2, duplicados normalizados, regresión y E2E offline. No se afirma certificación nativa ni equivalencia MCER.

## Bloque de currículo: U34–U36

- U34: salud y políticas públicas (atención primaria, cribado poblacional, vigilancia de brotes, determinantes sociales, decisiones compartidas, rutas de atención y asignación de recursos).
- U35: educación y aprendizaje permanente (formación continua, alfabetización informacional, evaluación por competencias, diseño universal para el aprendizaje, brechas, trayectorias y transferencia).
- U36: consumo, finanzas y decisiones (endeudamiento familiar, costo total del crédito, presupuesto doméstico, fondo de emergencia, diversificación, liquidez, poder adquisitivo y capacidad de pago).
- Currículo U34–U36: 15 lecciones y 30 entradas nuevas; cinco lecciones y diez entradas por unidad; dos objetivos léxicos por lección; ejemplos PT-BR, explicaciones en español y ejercicios contextualizados. Entradas `not_checked`.
- En la fase de diversidad, los bancos de unidad de U34–U36 pasan a `order`; las actividades de lección siguen `mc`.
- Próximo bloque de diversidad: U37–U39.
- PR [#870](https://github.com/luisequeira612-commits/bahasa-studio/pull/870) fusionada por squash en `main`; merge commit `a60232f0f614113b44e27aa8e676cca2b7f23a27`. CI del head final: regresión #45884552214 success (103 pasos, Chromium E2E, accesibilidad móvil y pruebas de evaluación incluidos), calidad offline 10/10 y TypeScript #45884552466 success. Sin reviews ni hilos pendientes.
- Manifiesto interno extendido a U1–U36/40; Service Worker precarga U34–U36, caché app-shell v3.8.164. PT-BR continúa `available:false`; B2 no se habilita. No se afirma certificación nativa ni equivalencia MCER; sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio.

## Bloque completado: U37–U40

- U37: ironía, humor y subentendidos (ironía, sarcasmo, burla, doble sentido, tono jocoso, humor autocrítico, sátira, broma interna, ruptura de expectativa e insinuación).
- U38: ambigüedad, presuposición e implicatura (ambigüedad léxica y sintáctica, presuposición, implicatura, inferencia pragmática, deixis, referente discursivo, alcance de la negación, sobreentendido y desambiguación).
- U39: proyecto argumentativo multimodal (tesis central, delimitación temática, curaduría de fuentes, evidencia verificable, contraargumento, línea argumentativa, recursos visuales, leyendas, narrativa de datos y llamada a la acción).
- U40: proyecto final de autonomía B2 (adecuación al género, perfil del interlocutor, registro, revisión sustantiva, cohesión referencial, concisión, salvedades, autoevaluación, reescritura y versión final).
- PR [#871](https://github.com/luisequeira612-commits/bahasa-studio/pull/871) integró en `main` las 20 lecciones y 40 entradas finales; cinco lecciones y diez entradas por unidad; ejemplos PT-BR, explicaciones en español, ejercicios contextualizados y estado `not_checked`. En la fase actual, estas unidades pasan sus bancos de unidad a `order`.
- Manifiesto interno ampliado a U1–U40 de 40; Service Worker precarga U37–U40 y usa caché app-shell v3.8.165. Contratos específicos y E2E offline ampliados hasta U40. PR [#871](https://github.com/luisequeira612-commits/bahasa-studio/pull/871) fusionada por squash en `main`, merge commit `0b50e7649c9a098f54a0917b785002db19ac2134`. CI del head final: regresión 103/103 (Chromium E2E, accesibilidad móvil y evaluación incluidos), calidad offline 10/10 y TypeScript success; sin reviews ni hilos pendientes. Verificado en `main`: manifiesto U1–U40 y precarga U37–U40. No se encontraron workflows post-merge asociados al commit squash, por lo que no se declara despliegue post-merge verificado.
- PT-BR permanece `available:false`; B2 no se habilita. No se afirma revisión nativa ni certificación MCER; sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio.

### Referencias de diseño consultadas

- Figueredo, G. (2015), «Uma descrição sistêmico-funcional dos marcadores discursivos avaliativos em português brasileiro: a gramática das partículas modais», *ALFA: Revista de Linguística*, 59(2). DOI: https://doi.org/10.1590/1981-5794-1504-3. El estudio describe marcadores evaluativos y partículas modales del portugués brasileño a partir de corpus; sirve como fundamento para el eje de U1, no como verificación individual de cada expresión.
- Zamproneo, S. (2014), *Multifuncionalidade e intersubjetividade em construções concessivas: uma análise em ocorrências do português contemporâneo do Brasil*, tesis doctoral, UNESP. https://agendapos.fclar.unesp.br/agenda-pos/linguistica_lingua_portuguesa/3348.pdf. Analiza construcciones concesivas en corpus oral y escrito del portugués brasileño, incluidos *ainda que* y *se bem que*. Sirve como apoyo para el diseño discursivo de U3, no como validación individual de cada ejemplo.

**Límite de validación:** no se afirma que estas unidades estén certificadas por hablantes nativos ni que garanticen un nivel oficial B2. Las entradas se mantienen `not_checked`.


## Activación PT-BR B2 — 26 nov 2026

- El currículo B2 completo está integrado en `main`: U1–U40, 40 unidades publicadas, 200 lecciones, 400 entradas léxicas y 800 ejercicios; los bancos de unidad usan `order` y los bancos de lección `mc`.
- Rama de habilitación: `feat/pt-br-b2-release-gate`. La propuesta activa `pt-BR` en `LanguageManager`, carga los niveles registrados A1/A2/B1/B2 durante el inicio, reconoce identificadores `ptbr_b2_u…` y eleva la caché offline a `bahasa-studio-v3.8.166`.
- El Service Worker ya contiene los 13 bloques B2 en su precache. La publicación aún queda pendiente de CI, fusión y despliegue verificado en GitHub Pages.
- No se modifica IndexedDB v1, backup JSON v3, dependencias ni audio. La validación lingüística sigue siendo interna; las entradas permanecen `not_checked`, sin afirmar certificación nativa ni equivalencia oficial MCER.


## 2026-11-26 — Habilitación final en PR #887
- Se abrió PR #887 (`feat/pt-br-b2-release-gate`) para activar el selector PT-BR y publicar las 40 unidades B2 completas; el manifiesto declara 40 unidades en 13 bloques y el Service Worker v3.8.166 precarga los 13 archivos.
- El cambio conserva la progresión secuencial y no altera IndexedDB v1, backup JSON v3, dependencias, audio ni red. Las entradas continúan `not_checked`; la auditoría estructural no equivale a certificación lingüística ni MCER.
- Validación de PR en curso: TypeScript y calidad offline aprobados; regresión Chromium/E2E aún ejecutándose. No declarar publicado hasta fusionar y verificar GitHub Pages y carga offline desde el sitio desplegado.


## Publicación verificada — 26 nov 2026
- PR #887 fusionada en `main` (merge commit `531d08d6910614845f459079690ba2ef3b8e61bf`). PT-BR está habilitado en el selector y el inicio carga los currículos registrados A1/A2/B1/B2; el filtro reconoce los IDs `ptbr_b2_u…` y mantiene la progresión secuencial.
- GitHub Pages compiló y desplegó correctamente ese commit; el workflow reportó `success` y la URL del entorno es https://luisequeira612-commits.github.io/bahasa-studio/.
- Regresión post-merge: `success`; TypeScript: `success`; build/deploy Pages: `success`. La suite de PR verificó las 40 unidades B2 y el inventario offline de 13 bloques; Service Worker v3.8.166.
- Se mantienen IndexedDB v1 y backup JSON v3 sin cambios; sin nuevas dependencias, audio o requisitos de red. `verification.status: not_checked`; no se afirma certificación nativa ni MCER oficial.
