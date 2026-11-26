# Portugués brasileño B2 — temario de 40 unidades

**Estado:** U1–U40 están integradas en `main` tras PR #871. El 26 de noviembre de 2026 se inició una auditoría estructural específica del currículo PT-BR B2: el informe genérico previo cubría el B2 indonesio, no estas unidades. La revisión editorial/lingüística sigue pendiente; este temario es una propuesta editable, no una equivalencia certificada con un examen oficial. PT-BR y B2 permanecen desactivados.

## Auditoría integral específica PT-BR B2 — en curso

- La revisión directa de los 13 bloques confirma 40 unidades, 200 lecciones y 400 entradas; IDs únicos y sin duplicados exactos de términos o ejemplos tras normalización.
- Las 202 referencias de repaso encontradas apuntan a 48 IDs A2 existentes; no se detectaron referencias rotas.
- Se añade el contrato `tests/pt-br-curriculum-b2-full-audit.test.cjs` a `quality:tests`. Comprueba las 40 unidades completas, cinco lecciones por unidad, diez términos, cobertura de vocabulario, explicaciones de términos, ejemplos, 1.200 ejercicios, opciones/respuestas, repaso A2 y disponibilidad desactivada. Resultado CI pendiente.
- Aclaración: el informe automático genérico anterior (`curriculum-quality-report.json`) analiza el B2 indonesio embebido en `index.html`, no el currículo PT-BR B2 modular; no se usa como evidencia de calidad del portugués.
- Estos controles son estructurales; no certifican naturalidad, gramática nativa, registro ni nivel MCER. Todas las entradas permanecen `not_checked`; no habilitar el curso.

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

## Bloque implementado: U34–U36

- U34: salud y políticas públicas (atención primaria, cribado poblacional, vigilancia de brotes, determinantes sociales, decisiones compartidas, rutas de atención y asignación de recursos).
- U35: educación y aprendizaje permanente (formación continua, alfabetización informacional, evaluación por competencias, diseño universal para el aprendizaje, brechas, trayectorias y transferencia).
- U36: consumo, finanzas y decisiones (endeudamiento familiar, costo total del crédito, presupuesto doméstico, fondo de emergencia, diversificación, liquidez, poder adquisitivo y capacidad de pago).
- Rama `feat/pt-br-b2-u34-u36`: 15 lecciones y 30 entradas nuevas; cinco lecciones y diez entradas por unidad; dos objetivos léxicos por lección; ejemplos PT-BR, explicaciones en español y ejercicios contextualizados. Entradas `not_checked`.
- Manifiesto interno ampliado a U1–U36 de 40; Service Worker precarga U34–U36 y usa caché app-shell v3.8.164. Contratos específicos y E2E offline ampliados hasta U36.
- PR [#870](https://github.com/luisequeira612-commits/bahasa-studio/pull/870) fusionada por squash en `main`; merge commit `a60232f0f614113b44e27aa8e676cca2b7f23a27`. CI del head final: regresión #45884552214 success (103 pasos, Chromium E2E, accesibilidad móvil y pruebas de evaluación incluidos), calidad offline 10/10 y TypeScript #45884552466 success. Sin reviews ni hilos pendientes.
- Manifiesto interno extendido a U1–U36/40; Service Worker precarga U34–U36, caché app-shell v3.8.164. PT-BR continúa `available:false`; B2 no se habilita. No se afirma certificación nativa ni equivalencia MCER; sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio.

## Bloque completado: U37–U40

- U37: ironía, humor y subentendidos (ironía, sarcasmo, burla, doble sentido, tono jocoso, humor autocrítico, sátira, broma interna, ruptura de expectativa e insinuación).
- U38: ambigüedad, presuposición e implicatura (ambigüedad léxica y sintáctica, presuposición, implicatura, inferencia pragmática, deixis, referente discursivo, alcance de la negación, sobreentendido y desambiguación).
- U39: proyecto argumentativo multimodal (tesis central, delimitación temática, curaduría de fuentes, evidencia verificable, contraargumento, línea argumentativa, recursos visuales, leyendas, narrativa de datos y llamada a la acción).
- U40: proyecto final de autonomía B2 (adecuación al género, perfil del interlocutor, registro, revisión sustantiva, cohesión referencial, concisión, salvedades, autoevaluación, reescritura y versión final).
- PR [#871](https://github.com/luisequeira612-commits/bahasa-studio/pull/871) integró en `main` las 20 lecciones y 40 entradas finales; cinco lecciones y diez entradas por unidad; ejemplos PT-BR, explicaciones en español, ejercicios contextualizados y estado `not_checked`.
- Manifiesto interno ampliado a U1–U40 de 40; Service Worker precarga U37–U40 y usa caché app-shell v3.8.165. Contratos específicos y E2E offline ampliados hasta U40. PR [#871](https://github.com/luisequeira612-commits/bahasa-studio/pull/871) fusionada por squash en `main`, merge commit `0b50e7649c9a098f54a0917b785002db19ac2134`. CI del head final: regresión 103/103 (Chromium E2E, accesibilidad móvil y evaluación incluidos), calidad offline 10/10 y TypeScript success; sin reviews ni hilos pendientes. Verificado en `main`: manifiesto U1–U40 y precarga U37–U40. No se encontraron workflows post-merge asociados al commit squash, por lo que no se declara despliegue post-merge verificado.
- PT-BR permanece `available:false`; B2 no se habilita. No se afirma revisión nativa ni certificación MCER; sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio.

### Referencias de diseño consultadas

- Figueredo, G. (2015), «Uma descrição sistêmico-funcional dos marcadores discursivos avaliativos em português brasileiro: a gramática das partículas modais», *ALFA: Revista de Linguística*, 59(2). DOI: https://doi.org/10.1590/1981-5794-1504-3. El estudio describe marcadores evaluativos y partículas modales del portugués brasileño a partir de corpus; sirve como fundamento para el eje de U1, no como verificación individual de cada expresión.
- Zamproneo, S. (2014), *Multifuncionalidade e intersubjetividade em construções concessivas: uma análise em ocorrências do português contemporâneo do Brasil*, tesis doctoral, UNESP. https://agendapos.fclar.unesp.br/agenda-pos/linguistica_lingua_portuguesa/3348.pdf. Analiza construcciones concesivas en corpus oral y escrito del portugués brasileño, incluidos *ainda que* y *se bem que*. Sirve como apoyo para el diseño discursivo de U3, no como validación individual de cada ejemplo.

**Límite de validación:** no se afirma que estas unidades estén certificadas por hablantes nativos ni que garanticen un nivel oficial B2. Las entradas se mantienen `not_checked`.
