## 2026-11-25 — Política adaptativa alineada con el comportamiento real

- La auditoría de fase 7 encontró una contradicción documental: la política decía que la precisión de habilidades solo añadía contexto y no afectaba la acción recomendada, pero el runtime ya usa la habilidad con menor precisión (mínimo 10 intentos puntuados) para dirigir a conversación, cuaderno de escritura o una primera lección incompleta y accesible.
- Se aclara también que el panel puede mostrar datos iniciales desde cinco intentos, mientras que la selección adaptativa exige diez. El umbral es una regla inicial, no una calibración; las métricas no certifican dominio ni ajustan automáticamente dificultad.
- Cambio documental únicamente: no modifica runtime, currículos, disponibilidad de idiomas, IndexedDB v1, backup JSON v3 ni dependencias.

Fuente: `docs/ADAPTIVE_LEARNING_RECOMMENDATION_POLICY.md`, `adaptive-learning.js`, `tests/adaptive-learning.test.cjs` y `tests/skill-profile-evidence.test.cjs`; 25 nov 2026.

## 2026-11-25 — PR #799 fusionada; verificación post-merge completa

- PR [#799](https://github.com/luisequeira612-commits/bahasa-studio/pull/799) fusionada por squash en `main`; GitHub confirmó `merged: true`. Commit integrado: `24facb210289894669f6349f569db4e85b4a8d24`.
- La regresión post-merge #45520746871 terminó en success: suite principal 102/102 pasos y calidad offline 10/10. Las pruebas de accesibilidad/interacción móvil 5B y E2E en navegador real también pasaron.
- GitHub Pages #45520745868 completó build y deploy en success.
- #799 alinea el recomendador adaptativo con el seguimiento de habilidades para `translate_es_target`, conservando el alias legacy `translate_es_id`. No altera prioridades, puntuaciones, desbloqueos, currículos, IndexedDB v1, backup JSON v3 ni dependencias; no habilita pt-BR.
- Fase actual: 7 — revisión funcional del aprendizaje. La primera incoherencia de selección adaptativa está corregida y verificada; continuar auditando flujos funcionales reales sin generar cambios artificiales. La comprobación física en Tecno Pova 4 (720×1640) sigue pendiente y no se sustituye por Chromium. Los resultados lingüísticos no están certificados.

Fuente: PR #799, commit squash `24facb2`, GitHub Actions #45520746871/#45520745868; 25 nov 2026.

## 2026-11-25 — Controles de traducción a 320px (PR en curso)

- Se añade una prueba Chromium con viewport 320×640 y contenedor de 300px para verificar el botón de audio (48×48px), los controles por palabra (44×44px), el ajuste de la frase y la ausencia de desbordamiento horizontal.
- Amplía la cobertura existente a 360px sin modificar producción, currículos, IndexedDB v1, backup JSON v3, dependencias ni disponibilidad de idiomas. La prueba física en el Tecno Pova 4 sigue pendiente.

Fuente: `tests/learning-screen-phase-5b.e2e.test.cjs`; 25 nov 2026.

## 2026-11-25 — Panel de herramientas accesible a 320px (PR en curso)

- Se amplía la prueba Chromium de viewport 320×640 para abrir el panel de herramientas de la unidad: comprueba que el panel y el botón de cierre queden dentro del ancho disponible, que las tres acciones sigan presentes con objetivos táctiles mínimos de 44×44px, que no aparezca overflow horizontal y que el cierre restaure el foco al disparador original.
- Es una extensión de cobertura automatizada para el ancho compacto; no cambia producción, currículos, IndexedDB v1, backup JSON v3, dependencias ni disponibilidad de idiomas.
- La comprobación física específica en el Tecno Pova 4 sigue pendiente y no se sustituye por Chromium.

Fuente: `tests/learning-screen-phase-5b.e2e.test.cjs`; 25 nov 2026.

## 2026-11-25 — Regresión de pantalla compacta a 320px (PR en curso)

- Se añade una prueba Chromium a `tests/learning-screen-phase-5b.e2e.test.cjs` con viewport de 320×640: ausencia de overflow horizontal, separación entre marca y selector de nivel, cuatro destinos de navegación con objetivos mínimos de 44×44px y panel de niveles dentro del viewport con cierre táctil accesible.
- La prueba también verifica que cerrar el panel devuelve el foco al selector original. Es una comprobación automatizada adicional en un ancho más estrecho que los 360px ya cubiertos; no sustituye la prueba física pendiente en el Tecno Pova 4.
- Solo cambia cobertura E2E y esta memoria; no modifica producción, currículos, IndexedDB v1, backup JSON v3, dependencias ni disponibilidad de idiomas.
- Pendiente: ejecutar suite 5B y regresión completa en CI. Si la nueva prueba descubre un fallo de layout real, corregirlo en un cambio separado y volver a validar.

Fuente: `tests/learning-screen-phase-5b.e2e.test.cjs`; 25 nov 2026.

## 2026-11-24 — Cobertura de restauración del foco al cerrar paneles accesibles (PR en curso)

- Tras completar la regresión post-merge de PR #793 (101/101), calidad offline 10/10 y Pages success, se añade cobertura E2E para cerrar mediante el botón visible (no solo Escape) los paneles de nivel, herramientas, detalle de unidad y significado de palabra.
- El test abre el selector de nivel con Space y herramientas/unidad con Enter, y comprueba que el foco vuelva al control/texto que originó cada panel. Es cobertura automatizada Chromium; no sustituye la comprobación física pendiente en el Tecno Pova 4.
- Se registran las pruebas de fase 5B en `.github/workflows/regression.yml`; la suite completa de accesibilidad y móvil ahora se ejecuta en CI junto a la nueva prueba de cierre. Cambios limitados a pruebas, workflow y esta memoria. No se toca producción, currículos, IndexedDB v1, backup JSON v3, dependencias ni disponibilidad de idiomas.
- Pendiente: ejecutar CI completa sobre el nuevo head, incluida la suite 5B que antes no estaba conectada al workflow; no fusionar hasta que regresión y calidad offline terminen en success.
Fuente: `tests/learning-screen-phase-5b.e2e.test.cjs`, PR de cobertura de foco; 24 nov 2026.

## 2026-11-24 — Adaptación neutral de la interfaz SRS (PR en curso)
- Se adapta el recorrido de repaso para consumir la vista común de CurriculumLoader.adaptVocabulary: texto objetivo, traducción, ejemplo y traducción del ejemplo. La deduplicación de cola, la detección de duplicados y las métricas del perfil dejan de depender de idn; las tarjetas muestran el nombre del idioma activo y conservan la dirección español ↔ idioma objetivo.
- curriculum-loader.js mantiene compatibilidad de lectura: acepta target/translation/example/exampleTranslation y conserva los campos legacy idn/esp/ex/exEsp para el currículo indonesio y los datos ya publicados.
- Añade pruebas unitarias del adaptador neutral y E2E de las dos direcciones de la tarjeta SRS. No habilita pt-BR, no cambia currículos, IndexedDB v1, backup JSON v3 ni dependencias.
Fuente: index.html, curriculum-loader.js, tests/curriculum-loader.test.cjs, tests/vocabulary-review.e2e.test.cjs; 24 nov 2026.

## 2026-11-24 — Verificación E2E del SRS entre namespaces (PR siguiente)
- Después de reforzar el helper en PR #785, se añade una prueba de navegador sobre el runtime real `DB` + `SRSEngine`: el mismo ID lógico `v45` recibe revisiones distintas bajo `id` y `pt-BR`; guardar una calificación en un idioma no altera intentos, intervalo, repetición ni facilidad del otro. También se comprueba que `getDueItems()` solo recoge la tarjeta guardada para repaso del idioma activo y que `getAll()` devuelve IDs lógicos sin prefijos.
- La prueba selecciona namespaces directamente en `DB` para ejercitar el contrato de persistencia sin activar ni declarar disponible el curso pt-BR. No cambia runtime, currículos, IndexedDB v1 ni backup JSON v3.
Fuente: `index.html` (DB/SRSEngine), `progress-namespace.js`, `tests/vocabulary-review.e2e.test.cjs`; 24 nov 2026.

## 2026-11-24 — Contrato de aislamiento de planificación SRS por idioma (PR siguiente)
- Tras fusionar PR #784 (commit `29fcbe087016d19aa0dbc0e73e354f6bd509c232`), la revisión del helper `ProgressNamespace` confirma que SRS conserva IDs legacy de indonesio y usa claves `codigo::id` para los demás idiomas. La prueba previa solo diferenciaba `repetition`; se amplía para cubrir intentos, aciertos/errores, intervalo, factor de facilidad, próxima revisión y última revisión con el mismo ID lógico en tres idiomas.
- Esta cobertura valida el filtro/namespace puro; no afirma activación de pt-BR ni cambia IndexedDB v1, backup JSON v3 o la disponibilidad de cursos. La integración de runtime y la adaptación visual del SRS siguen siendo tareas separadas.
Fuente: `progress-namespace.js`, `tests/progress-namespace.test.cjs`, PR #784 y commit merge; 24 nov 2026.

## 2026-11-24 — Anclaje estable del test de fallback de traducción (PR #784)
- CI #45494338225 volvió a detectar un fallo exclusivo del contrato: el test buscaba una frase de comentario que no existe en la versión final de `index.html`; la comprobación no encontraba el fallback aunque el guard multilingüe sí está presente.
- Se ancla la prueba al guard de comportamiento `isSpanishSource && activeLanguage === 'id'`, y mantiene la verificación del recorrido de niveles/unidades y el límite B2 U1–U60. Sin cambios de producción, currículo ni persistencia.
Fuente: GitHub Actions #45494338225, job `test`, PR #784; 24 nov 2026.

## 2026-11-24 — Corrección del contrato de fallback de traducción por toque (PR #784)
- CI #45493469645: `Run local quality tests` falló únicamente en el nuevo test `tap translation fallback includes only implemented B2 U1–U60 authored exercises`. La producción ya había renombrado el comentario del fallback durante la adaptación multilingüe, pero el test seguía buscando el marcador anterior; no era un fallo de comportamiento. Se actualizó solo la expectativa del test para usar el marcador vigente.
- El resto del bloque de calidad terminó sin errores de auditoría; no se modifican datos curriculares, IndexedDB v1, backup JSON v3 ni dependencias.
Fuente: GitHub Actions #45493469645, PR #784; 24 nov 2026.

## 2026-11-24 — Corrección CI de ayudas de traducción por toque (PR #784)
- CI #45492641361: `Run local quality tests` volvió a fallar, ahora por un `SyntaxError` introducido en `tests/load-inline-b2-curriculum.test.mjs`: el literal de búsqueda del comentario del fallback se había dividido en dos líneas dentro de comillas simples. Se corrige solo el contrato de prueba, sin cambios de producción ni de persistencia. Fuente: GitHub Actions #45492641361 y PR #784; 24 nov 2026.


- CI #45490455600 detectó tres expectativas legacy: dos en `tests/regression.test.cjs` exigían `lang="id"`/campos `idn`, y una en `tests/load-inline-b2-curriculum.test.mjs` buscaba el comentario antiguo del fallback.
- Se actualizan solo esos contratos para reflejar la implementación neutral de fase 5: `text/translation`, locale dinámico y fallback authored indonesio limitado a B2 U1–U60. No cambia producción, datos ni persistencia.
- Pendiente: repetir CI completo sobre el nuevo head; no fusionar hasta que `test` y `Offline quality reports` estén verdes.

Fuente: GitHub Actions #45490455600 y #45491566556, PR #784; 24 nov 2026.

- CI #45491566556: todos los pasos individuales, incluida la prueba de marcado indonesio, pasaron; falló únicamente `Run local quality tests`. La prueba de marcado ya se ejecuta en su paso dedicado, así que se retira de `quality:tests` para evitar doble ejecución dentro del lote. Se conserva la cobertura dedicada y no se cambia producción.

## 2026-11-24 — Corrección del alcance de prueba y locale de ejemplo modelo (PR #782)

- CI #45480195732: informes offline success; regresión falló solo en la prueba nueva de marcado, porque el test recortaba `renderStep()` antes de llegar al bloque de ejercicios. Se cambió la comprobación para inspeccionar el archivo completo y mantener el recorte solo para `pickWord`.
- Revisión de código detectó además un `lang="id"` fijo en el ejemplo modelo de la pantalla de autoevaluación. Se sustituyó por `answerLocale || targetLocale || 'und'`, escapado con `App.escapeHtml`; el test ahora exige ese locale dinámico.
- Commits correctivos: `65768bb26d80b6b57e6ee5c1471f1df5225c4f8a` y `6143a8d90e01b3698c45e053c7267d0659833e4a`. Ejecutar CI completo sobre el nuevo head; no fusionar aún.

Fuente: GitHub Actions #45480195732 y revisión de `LessonEngine.checkWriting`; 24 nov 2026.

## 2026-11-24 — Ajuste de pruebas legacy de marcado indonesio (PR #782)

- CI #45479976222: `Offline quality reports` success; `test` falló en dos aserciones heredadas de `tests/indonesian-language-markup.test.cjs` que exigían `lang="id"` en fichas de ordenación y la expresión fija de locale para escritura.
- Se actualizan esas expectativas para exigir el locale objetivo dinámico y el locale derivado del adaptador. Se mantienen las comprobaciones de elementos exclusivamente indonesios (diccionario, matching y ejemplo modelo).
- Commit correctivo: `2bfe37594a3ee1c2d52209416591ff84afe79da2`. Repetir CI sobre el nuevo head; no fusionar mientras haya fallos o ejecución incompleta.

Fuente: GitHub Actions #45479976222, job `test`; PR #782; 24 nov 2026.

## 2026-11-24 — Corrección de test heredado y vista de ejercicio inmutable (PR #782)

- PR #782: https://github.com/luisequeira612-commits/bahasa-studio/pull/782. La primera ejecución CI #45479679061 tuvo `Offline quality reports` success y falló `test` por una expectativa obsoleta en `tests/load-inline-b2-curriculum.test.mjs` que exigía la expresión antigua `writingLanguage = answerLanguage ? es : id`. La implementación ahora resuelve locale con `answerLocale || targetLocale || 'und'`; se actualizó el test para exigir el contrato nuevo y rechazar la expresión antigua.
- `adaptExercise` ahora devuelve una copia superficial congelada, consistente con el contrato de vista de solo lectura del adaptador de vocabulario. Se añadió aserción `Object.isFrozen`.
- Los commits correctivos son `e505078`, `6a0c260` y `b11662d`; el head actual es `b11662d76cdeb386e7b3e9e6f253709bf12252ad`.
- La nueva ejecución CI todavía no aparece asociada al head al momento de esta nota. No fusionar hasta que `test` y `Offline quality reports` estén en success y revisar el diff final.

Fuente: GitHub Actions #45479679061, PR #782 y commits de corrección; 24 nov 2026.


## 2026-11-24 — Integración inicial del locale en ejercicios (fase 5)

- Rama `feat/multilingual-exercise-adapter`, basada en el merge validado de PR #781. Se añade `CurriculumLoader.adaptExercise(exercise, language)`: copia superficial no mutante que conserva tipo, prompt, opciones, answer numérico/textual y `acceptedAnswers`; añade `targetLocale` y `answerLocale` sin cambiar reglas de comparación.
- Los ejercicios de respuesta textual resuelven el locale desde `answerLanguage` explícito o el idioma activo; `translate_id_es` conserva respuesta en español. El renderizador utiliza locale dinámico en fill/write y fichas de ordenación; el input de traducción al idioma objetivo deja de nombrar indonesio en su placeholder.
- Se conserva la conversión histórica de MC sentence-completion, ahora usando el idioma activo como `answerLanguage`. Se mantiene la UI y explicaciones en español.
- Matching, audio/reconocimiento de voz y bubble de traducción quedan fuera de este cambio porque todavía dependen de campos y utilidades legacy `idn/esp`; requieren adaptación separada. No se activa pt-BR, ni se cambian datos curriculares, IndexedDB v1, backup JSON v3 o dependencias.
- CI pendiente. PR aún no abierta hasta completar revisión del diff y pruebas.

Fuente: contrato `docs/multilingual-curriculum-data-contract.md`, PR #781 fusionada y revisión de `LessonEngine`; 24 nov 2026.


### 2026-11-24 — Segundo test con alcance de locale corregido en PR #781

- CI #45477231395 confirmó que la primera corrección del test de markup no había actualizado la aserción equivalente en `tests/curriculum-loader.test.cjs`; el test fallaba porque buscaba el locale dentro de `wordCard`, no en la preparación de `renderIntro()`.
- Se ajusta esa segunda prueba para validar `LanguageManager.getLocale(language)` en el bloque de preparación, manteniendo las aserciones del adaptador y campos opcionales en el renderer. No se modifica producción.
- La suite debe repetirse sobre el nuevo head antes de fusionar.

Fuente: GitHub Actions #45477231395, job `test`, subtest `lesson vocabulary cards use the common adapter and the active target locale`; 24 nov 2026.


### 2026-11-24 — Corrección de alcance del test en PR #781

- CI #45476822874: `Offline quality reports` success; `test` falló únicamente en `tests/indonesian-language-markup.test.cjs`. El test buscaba `LanguageManager.getLocale(language)` dentro del cuerpo de `wordCard`, aunque esa configuración se declara correctamente antes del renderer.
- Se corrige el contrato para verificar la resolución de locale en el bloque de preparación de `renderIntro()` y mantener dentro del renderer las aserciones del adaptador, campos opcionales y atributo `lang` dinámico. No se relaja ni cambia el comportamiento de producción.
- PR #781 permanece abierta; esperar CI completo sobre el nuevo head antes de fusionar.

Fuente: GitHub Actions #45476822874, job `test`, log de `Run Indonesian language markup tests`; 24 nov 2026.
## 2026-11-24 — Fase 4 completada; integración inicial de renderizador en fase 5

- PR #780 fusionada por squash en `main`, commit `f1a1f49a171c97aa0624e25055d9636c351cfb74`; CI #45473441650: `test` y `Offline quality reports` success. El caso NFC fue corregido para usar una marca combinante real.
- Fase 5 iniciada en `feat/multilingual-vocabulary-renderer`: el primer renderizador de tarjetas de vocabulario de lección consume `CurriculumLoader.adaptVocabulary`, aplica locale del idioma objetivo y muestra lectura/transliteración opcionales. Sin activar pt-BR ni alterar datos/persistencia; queda pendiente validar CI y extender a adaptadores de ejercicios/SRS.

## 2026-11-24 — Integración multiidioma: fase 4 en curso
- Fase 3 completada: PR #779 fusionada mediante squash en `main`, commit `ba21c4647c0ba8e4c5f9d383a133e2b13e1d5290`; CI #45469430382 (`test` y `Offline quality reports`) success. `CurriculumLoader.adaptVocabulary` añade una vista común no mutante, sin conectar todavía renderizadores.
- Fase 4: rama `test/multiscript-curriculum-contract` creada desde el commit de #779. Se amplían pruebas del contrato opcional con japonés, árabe, tailandés, coreano, devanagari, emoji y equivalencia Unicode NFC; no se impone tokenización por espacios ni se eliminan diacríticos. PR/CI pendientes.
- Se mantienen `pt-BR available:false`, datos productivos intactos, IndexedDB v1 y backup JSON v3 sin cambios; sin dependencias nuevas. Las pruebas estructurales no certifican corrección lingüística ni MCER.
- Fase 1 (baseline) y fase 2 (contrato de campos opcionales) completadas. PR #778 fusionada por squash en `main`, commit `699dfb92eee84235aa57bb6e3c983390901bc095`; CI del head #45468262779: `test` y `Offline quality reports` success. El contrato es aditivo, no conecta aún campos opcionales a UI y no cambia datos productivos.
- Fase 3 inicia una vista común de vocabulario en `CurriculumLoader.adaptVocabulary`: normaliza lectura de texto/ traducción/ejemplo sin mutar registros; aísla el campo legacy indonesio `idn` y prioriza `target` para currículos nuevos. La vista no activa idiomas ni cambia IndexedDB v1/backup JSON v3.
- La integración visual en renderizadores y adaptadores de ejercicios queda pendiente; mantener `pt-BR available:false`, sin nuevas dependencias, audio ni cambios de persistencia.
- Preferencia operativa vigente (24 nov 2026): continuar con mejoras sin pedir autorización por cada una; fusionar cuando el cambio esté correcto y validado por CI; informar la fase en avances significativos.

---
## 2026-11-24 — Aprobación del plan multiidioma y baseline de calidad
- El usuario aprobó el plan técnico y el temario portugués B2 (40 unidades, 5 lecciones por unidad) y exigió aprobaciones por etapas. Actualización del 24 nov: el usuario autoriza al agente a fusionar cuando el cambio esté correcto y CI pase, sin pedir autorización previa para cada merge; informar la fase en avances significativos.
- Baseline estructural recuperado de GitHub Actions run #45463235040 sobre `main` SHA `497d6c45d3439103bfa4db3a5a10118564ad9413`: trabajos `test` y `Offline quality reports` en success. Resumen y limitaciones en `docs/quality-baselines/2026-11-24.md`.
- Los auditores existentes recorren currículos indonesios (122 unidades en auditoría/cola; 182 unidades en contrato), no constituyen baseline lingüístico ni cobertura de portugués B1. No certifican naturalidad ni MCER; KBBI no es requisito. El baseline no modifica currículos, IndexedDB v1 ni backup JSON v3.


## 2026-11-24 — Portugués brasileño B1 U28–U30 en preparación
- La PR #771 se fusionó por squash en `main`, commit `f1b6a725ba9c4084070af3d8e262f2a7e3e7c827`. Regresión post-merge #45329499591: trabajos `test` y `Offline quality reports` en success; GitHub Pages #45329499050: build, deploy y reporte en success.
- La regresión cubrió 101 pasos de pruebas, incluyendo Chromium y E2E offline; el informe de calidad terminó en success.
- Se inicia la rama `feat/pt-br-b1-u28-u30` desde `main` para U28 medios y desinformación; U29 mediación y negociación; U30 migración, refugio e integración.
- El bloque añade 30 términos (10 por unidad), cinco lecciones por unidad, dos términos explicados por lección y diez ejercicios MC por unidad. Incluye ejemplos PT-BR y traducción ES, además de referencias de repaso a vocabulario A2 existente.
- Los términos siguen `verification.status: not_checked`; los controles estructurales no certifican naturalidad ni corrección lingüística. `pt-BR available:false` se conserva.
- El manifiesto B1 se ampliará a U1–U30 de 36; Service Worker a `bahasa-studio-v3.8.150` con precache del bloque. Se añade contrato Node y se amplía Playwright para carga offline U1–U30. No se añaden dependencias ni se modifican IndexedDB v1 o backup JSON v3.
- Pendiente de abrir PR y CI completo; no fusionar hasta que todos los checks requeridos terminen en success. Tras el merge se exigirá regresión post-merge y Pages.

Fuente: PR #771, Actions #45329499591/#45329499050; rama `feat/pt-br-b1-u28-u30`, nuevos bloques y contratos; 24 nov 2026.

## 2026-11-24 — Portugués B1 U13–U15 en preparación
- La regresión post-merge de PR #766 en `main` terminó en success: Actions run #45298580544 (`test` y `Offline quality reports`), y GitHub Pages deployment run #45298578980 también terminó en success. `main` queda en merge commit `1b80394a87ab32c6714880601586b66ae5cbba82`.
- Rama `feat/pt-br-b1-u13-u15` creada desde ese `main`. Añade U13 educación y aprendizaje permanente; U14 privacidad y ciudadanía digital; U15 cultura, creación y políticas culturales.
- El bloque incorpora 30 términos (10 por unidad), cinco lecciones y diez ejercicios MC por unidad; ejemplos PT/ES y estado `not_checked`. Cada lección cubre y explica dos términos; se añaden 15 referencias de repaso A2, todas resueltas.
- Auditoría local de diseño contra 540 términos A1/A2 y 120 B1 U1–U12: 30 términos nuevos, cero duplicados normalizados y cero duplicados internos. Se reemplazaron dos colisiones iniciales (`bolsa de estudos`, `vazamento de dados`) por `auxílio estudantil` y `exposição de informações pessoais`.
- Manifiesto B1 amplía unidades publicadas a U1–U15 de 36; Service Worker avanza a `bahasa-studio-v3.8.145` y precarga `units-13-15.js`. Se amplían contratos Node y Playwright para cobertura estructural, duplicados normalizados, referencias A2 y carga offline.
- PR [#767](https://github.com/luisequeira612-commits/bahasa-studio/pull/767) abierta desde `feat/pt-br-b1-u13-u15`, head `b11ff59023856b0fd20fcfc423567113ddf9bb58`, base `main` en `1b80394a87ab32c6714880601586b66ae5cbba82`. CI run #45300722282: `test` y `Offline quality reports` en ejecución; esperar ambos success sobre el head final antes de fusionar.
- `pt-BR available:false` se conserva; no se modifican IndexedDB v1 ni backup JSON v3, no se añaden dependencias, backend ni audio/TTS. Las pruebas estructurales no certifican corrección lingüística nativa.

Fuente: GitHub `main` merge commit de PR #766, rama `feat/pt-br-b1-u13-u15`, bloque curricular y contratos; 24 nov 2026.


## 2026-11-23 — PR #765 fusionada y PR #766 abierta: Portugués B1 U10–U12

- PR #765 (B1 U7–U9) fusionada por squash en `main`; commit integrado `7d9f474808a6df48cf5a9605b6f3595dd3fd4e10`. Head validado `7fc90a3d4feb4ae44383690adcbea9f1a28ec3ba`; runs #45286333417 y #45286360609 completaron `test` y `Offline quality reports` en success. No había reviews, hilos ni comentarios pendientes.
- B1 publica U1–U9 de 36 (25 %). El idioma `pt-BR` permanece `available:false`; todos los términos del piloto continúan `not_checked`. El merge no certifica la corrección lingüística.
- PR #766 abierta desde `feat/pt-br-b1-u10-u12`, basada en el merge de #765. Head de implementación `e1f28bbd06334909a6f7a1396f81aca9dc21433e`. Añade U10 globalización y relaciones internacionales; U11 ciudadanía y políticas públicas; U12 crisis climática y transición energética: 30 términos, cinco lecciones y diez ejercicios por unidad, con referencias A2.
- El manifiesto B1 pasa a U1–U12 de 36 (33,3 %); Service Worker añade el bloque offline U10–U12 y cambia a `bahasa-studio-v3.8.144`. Se actualizan contratos Node/Playwright y expectativas de caché heredadas; el contrato nuevo se incorpora a `quality:tests`.
- CI de PR #766 pendiente de aparecer/completarse; no fusionar hasta que `test` y `Offline quality reports` terminen en success y se revise el head final.
- Sin cambios a IndexedDB v1, backup JSON v3, dependencias, disponibilidad del idioma ni infraestructura de servidor.

## 2026-11-23 — Corrección CI PR #765: contratos de currículo y caché

- El CI run #45284257266 mostró `Offline quality reports` success y `test` failure (15 contratos): tres tests B1 tenían una expresión regular inválida para la ruta `units-07-09.js`; doce tests previos de A1/A2 seguían esperando la caché `v3.8.142` después de que el Service Worker avanzara a `v3.8.143`.
- Se sustituyeron las tres expresiones regulares frágiles por comprobaciones literales de la ruta del bloque B1 U7–U9. Se alinearon las expectativas de caché heredadas en los contratos A2 U13–U30 y A1 U19–U24 a `v3.8.143`; se conservaron las aserciones funcionales.
- Commits correctivos en `feat/pt-br-b1-u07-u09`: `fa559b0c`, `ed24544f`, `5d70e28a`, `01318368`, `f972b181`, `9c6fd4f3`, `d25e90b1`, `24d6030f`, `f537ada3`, `5e838462`, `30e47e18`. Repetir CI completo sobre el head resultante y no fusionar hasta que todos los checks requeridos terminen en success.

## 2026-11-23 — Portugués B1 U7–U9 en preparación

- Tras fusionar PR #764 por squash en `main` (commit `aa8f32a97f4824e7dc5cd94f3a86720ee0116eb2`), la regresión post-merge #45282986354 completó `test` (101/101 pasos) y `Offline quality reports` (10/10), ambos success. GitHub Pages run #45282985616 completó build, deploy y report-build-status en success.
- Rama limpia `feat/pt-br-b1-u07-u09`, basada en ese `main`. Añade U7 cultura, patrimonio e identidad; U8 investigación científica e innovación; U9 economía cotidiana y desigualdad. Son 30 términos nuevos (10/unidad), cinco lecciones y diez ejercicios MC por unidad, ejemplos PT/ES y `verification.status: not_checked`.
- Cotejo exacto normalizado: 30 términos nuevos frente a 600 registros previos de A1+A2+B1 U1–U6; cero colisiones y cero duplicados internos. Las 15 referencias de repaso seleccionadas apuntan a IDs A2 existentes.
- Manifiesto B1 publica U1–U9 de 36. Service Worker avanza a `bahasa-studio-v3.8.143` y precarga U7–U9. Contratos Node y Playwright se amplían a U1–U9 offline; `quality:tests` incluye el nuevo contrato U7–U9.
- PR [#765](https://github.com/luisequeira612-commits/bahasa-studio/pull/765) abierta desde `feat/pt-br-b1-u07-u09`. Head de la implementación `4bfceee965f9b7263d46c6a58ff263a1a3e322f5`; CI run #45284024369: `Offline quality reports` success (10/10), `test` aún en `Install Chromium`, sin fallos reportados al consultar. Este commit de memoria actualiza el estado; repetir CI sobre el head nuevo antes de fusionar.
- `pt-BR available:false` permanece. Sin nuevas dependencias, backend, audio/TTS, cambios a IndexedDB v1 ni backup JSON v3. La auditoría estructural no certifica el portugués; no hay hablante nativo disponible y el vocabulario permanece `not_checked`.

Fuente: GitHub `main` commit `aa8f32a9`, rama `feat/pt-br-b1-u07-u09`, bloques B1 U1–U9, contratos y Service Worker; 23 nov 2026.

## 2026-11-23 — PR #764: Portugués B1 U4–U6 en preparación

- Rama limpia `feat/pt-br-b1-u04-u06`, basada en el merge commit de PR #763 `9faab7e38819f61aff4dc93053b65e261203318a`.
- U4 gestión y colaboración profesional; U5 lectura crítica de medios; U6 movilidad y vida urbana. Añade 30 términos nuevos (10 por unidad), cinco lecciones y diez ejercicios MC por unidad, ejemplos PT/ES y vocabulario `not_checked`.
- Cotejo de 30 términos contra las 540 entradas previas A1+A2: cuatro colisiones iniciales (`delegar`, `desempenho`, `manchete`, `boato`) se sustituyeron por `incumbência`, `eficiência`, `título` y `rumor`; el cotejo posterior no detecta duplicados contra A1/A2. El contrato nuevo vuelve a comprobar contra A1, A2 y B1 U1–U3.
- Manifiesto B1 publica U1–U6 de 36 en dos bloques. Service Worker avanza a `bahasa-studio-v3.8.142` y precarga `units-04-06.js`. Contrato Node nuevo verifica estructura, cobertura exacta de vocabulario en las cinco lecciones, ejercicios, referencias A2, duplicados y caché; Playwright ampliará la carga offline a B1 U1–U6.
- Se alinean las expectativas heredadas de caché en contratos A2 U7–U30 y A1 U22–U24; no se relajan aserciones. `pt-BR available:false` permanece. No se modifican IndexedDB v1 ni backup JSON v3; sin nuevas dependencias, backend ni audio/TTS.
- Primer CI del head `a356938d` (run #45277756740) completó `Offline quality reports`, pero `Run local quality tests` detectó expectativas regex heredadas de caché v3.8.141 (las barras escapadas no se sustituyeron con el primer ajuste) y una glosa de U6 que no explicaba `arborização`. Se alinearon regex en los contratos A2 U1–U30 y A1 U19–U21, y se corrigió la pareja de vocabulario de la lección U6. Sin relajar aserciones. Head actual `bb6e453c7b83f1c73505894b9119f56d4a44db7c`. CI run #45278289323: `Offline quality reports` success; `test` continúa en `Install Chromium`, sin fallos nuevos observados. No fusionar hasta CI completo en success.
  
Fuente: rama `feat/pt-br-b1-u04-u06`, bloque B1 U4–U6, manifiesto, Service Worker y tests; 23 nov 2026.

## 2026-11-23 — Corrección del registro de PR #763 tras su fusión

- La PR #763 no está abierta: se fusionó por squash en `main`, merge commit `9faab7e38819f61aff4dc93053b65e261203318a`.
- La regresión post-merge #45276297330 completó `test` (101 pasos) y `Offline quality reports` (10 pasos), ambos success. GitHub Pages run #45276296585 completó build, deploy y report-build-status en success.
- Estado en `main`: pt-BR A1 24/24, A2 30/30, B1 3/36, B2 0/40; `pt-BR available:false`.

Fuente: GitHub PR #763, merge commit `9faab7e3`, Actions runs #45276297330 y #45276296585; 23 nov 2026.

## 2026-11-23 — PR #763 fusionada: Portugués B1 U1–U3

- PR [#763](https://github.com/luisequeira612-commits/bahasa-studio/pull/763) fusionada por squash en `main`, merge commit `9faab7e38819f61aff4dc93053b65e261203318a`; head final validado `b0566b0388a9e75a31e8077a59c52d58048426eb`.
- U1 relatos y experiencias significativas; U2 argumentación y debate; U3 hipótesis y consecuencias. Añade 30 términos, cinco lecciones y diez ejercicios MC por unidad; vocabulario `not_checked`.
- Auditoría final: cero duplicados exactos normalizados contra las 540 entradas A1+A2; referencias de repaso A2 válidas. Manifiesto publica U1–U3 de 36; Service Worker `bahasa-studio-v3.8.141` precarga el bloque.
- CI del head final PR #45267179379 y regresión post-merge #45276297330 completaron `test` (101 pasos) y `Offline quality reports` (10 pasos), ambos success. GitHub Pages run #45276296585 completó build y deploy.
- `pt-BR available:false` permanece; sin dependencias nuevas, backend, audio/TTS, cambios de IndexedDB v1 ni backup JSON v3.

Fuente: GitHub PR #763, merge commit `9faab7e3`, Actions runs #45267179379, #45276297330 y #45276296585; 23 nov 2026.

## 2026-11-23 — PR #758: corrección de expectativas de integración A2 U16–U18
- CI inicial del head `32d4767b59e838d669fa846ad8726441f2dacd19`, run [#45246346115](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45246346115): instalación Chromium y pruebas principales avanzaron; el job `test` falló en `Run local quality tests`, no por el contenido de U16–U18, sino por cinco contratos de manifiesto heredados que todavía esperaban U1–U15 y una expectativa de Service Worker que esperaba caché v3.8.135.
- Se actualizaron los cinco contratos antiguos a publicación U1–U18 (18 unidades) y la prueba de caché U13–U15 a v3.8.136. Los checks conservan la lista exacta de unidades y la versión de caché actual; no se redujo cobertura.
- Commits correctivos en `feat/pt-br-a2-u16-u18-main`: `64d1a7e`, `9c25977`, `a779bc2`, `0cbb3ca`, `f8a9115`. CI nuevo pendiente sobre el head resultante; no fusionar hasta que ambos jobs pasen.

Fuente: GitHub Actions run #45246346115 y rama `feat/pt-br-a2-u16-u18-main`; 23 nov 2026.

- Revisión léxica ampliada de U16–U18 contra 240 registros A1 y 150 A2 previos detectó otra colisión exacta: `consulta` ya existía en A1. Se sustituyó por `triagem` (triaje) en U18 y se ajustaron ejemplo y lección. La nueva revisión no debe describir el bloque como libre de duplicados hasta repetir el cotejo completo tras este cambio.

## 2026-11-23 — PR #757 fusionada; A2 U16–U18 en preparación
- PR [#757](https://github.com/luisequeira612-commits/bahasa-studio/pull/757) quedó fusionada por squash en `main`, commit `06ef4b2090a8d6fa57ece76ccc08ea9455aac68a`. CI del head final `1f3ce77dcc5a0cba45b4ae4307082b992e68fa22`, run [#45244335592](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45244335592): `test` y `Offline quality reports` ambos success.
- Estado curricular tras #757: Portugués A1 24/24; A2 15/30; B1 0/36; B2 0/40. `pt-BR available:false` permanece.
- Nueva rama limpia `feat/pt-br-a2-u16-u18-main`, basada directamente en el merge commit de #757 para evitar que la siguiente PR incluya cambios de U13–U15 ya integrados. U16 tecnología, privacidad y seguridad digital; U17 educación y formación continua; U18 salud y atención sanitaria.
- U16–U18 aportan 30 entradas `not_checked` (10 por unidad), cinco lecciones y diez ejercicios MC por unidad. Referencias de repaso dirigidas a A2 previo. Se corrigió una colisión exacta detectada con U8: `prazo` se sustituyó por `ementa`.
- Manifiesto A2 amplía publicación parcial U1–U18; Service Worker avanza a `bahasa-studio-v3.8.136` y precarga `units-16-18.js`. Playwright se amplía a A2 U1–U18 offline; se añade test Node de contrato y se alinean expectativas de caché.
- La rama limpia está preparada pero aún sin PR/CI. Verificar harness, referencias, precache y suite antes de abrir PR. Se preservan IndexedDB v1, backup JSON v3, `available:false`; sin backend, dependencias ni audio/TTS.

Fuente: GitHub PR #757, Actions run #45244335592 y rama `feat/pt-br-a2-u16-u18-main`; 23 nov 2026.

## 2026-11-23 — PR #748 preparada: pt-BR A1 U16–U18

- Rama `feat/pt-br-a1-u16-u18`, basada en el merge de PR #747 `1f6be39c6a3367c885ee29282f7430b3fac2b390`.
- U16 cuerpo y partes del cuerpo; U17 emociones y sensaciones; U18 salud y necesidades básicas. Diez términos por unidad, cinco lecciones y diez ejercicios finales. Los términos permanecen `not_checked`.
- El manifiesto publica U1–U18 de 24 (75 % del nivel), pero `pt-BR available:false` se conserva. El bloque curricular existente ya estaba en el precache del Service Worker; no se requiere cambiar la versión de caché.
- Pruebas Node ampliadas a U1–U18 y contratos de U16–U18; Playwright debe cargar U1–U18 completamente offline y comprobar el aislamiento del progreso. Sin nuevos tipos de ejercicio, audio/TTS, dependencias, cambios a IndexedDB v1 o backup JSON v3.
- Pendiente CI completo; no fusionar hasta que `test` y `Offline quality reports` estén en éxito.
 
## 2026-11-23 — PR #745: correcciones del primer CI
- El primer CI (#45197843322) detectó dos fallos limitados a las pruebas nuevas: la expectativa del test de carga seguía enumerando U1–U6 pese a solicitar U1–U9, y el bloque `units-07-12.js` había perdido la asignación inicial del registro global al insertar U7–U9. Se corrigió la expectativa y se restauró `root.GUARDI_CURRICULUM_BLOCKS = root.GUARDI_CURRICULUM_BLOCKS || {}`.
- Se ajustó también el ejemplo léxico de `em frente` y la frase de `chuva` para evitar ejemplos poco naturales. El E2E Playwright U1–U9 había pasado en el primer CI; `Offline quality reports` también pasó. Se espera un CI completo nuevo antes de merge.

## 2026-11-23 — PR #744 fusionada y pt-BR A1 U7–U9 en preparación
- PR #744 (`feat/pt-br-a1-u4-u6`) quedó fusionada mediante squash en `main`: `89f0c50bb121d012eb2cbe271fbc28d8345c4e27`. El head `1c0ecd21c161588540b01f7ec81e75b964f5b450` pasó el CI completo #45195101334: jobs `test` y `Offline quality reports` en `success`, incluidos E2E real, evaluación y auditorías de calidad.
- El siguiente tramo del piloto añade U7–U9 en la rama `feat/pt-br-a1-u7-u9`: U7 rutina diaria y momentos del día; U8 lugares, direcciones y transporte; U9 clima, estados personales y razones. Cada unidad mantiene cinco lecciones, diez términos nuevos, diez ejercicios finales y `verification.status: not_checked`.
- Se mantiene `pt-BR` con `available:false`; el manifiesto A1 sigue declarando 24 unidades, ahora con U1–U9 publicadas para pruebas. No se publica audio/TTS nuevo y solo se usan los handlers existentes `mc` y `order`.
- Se preservan IndexedDB v1, backup JSON v3, dependencias y el alcance offline. La ausencia de hablante nativo/KBBI no bloquea el progreso; `not_checked` no equivale a validación lingüística.
- Tests Node y Playwright se amplían a U1–U9 y mantienen la comprobación de aislamiento de progreso/historial y precarga offline. El siguiente paso es ejecutar CI completo y fusionar solo si todo queda verde.

## 2026-11-23 — pt-BR A1 U4–U6 en preparación
- Se amplía el piloto curricular a A1 U1–U6 sin habilitar Portugués. U4 trabaja familia y posesivos; U5 comida, bebida, gustos y negación; U6 casa, ubicación y distancia.
- U4–U6 mantienen cinco lecciones explícitas y diez registros léxicos por unidad. Todos los términos nuevos permanecen `not_checked`; no se presenta certificación nativa ni se bloquea el avance por ausencia de hablante nativo.
- Se publica el bloque `07-12` para U4–U6 y el manifiesto declara seis unidades publicadas dentro del nivel A1 de 24 unidades. El selector y la carga normal siguen bloqueados mientras `pt-BR` permanezca `available:false`.
- Se actualizan pruebas Node para cargar U1–U6, validar cinco lecciones por unidad, diez ejercicios finales en U4–U6 y ausencia de audio pt-BR. El Service Worker precarga también el nuevo bloque y pasa a caché app shell v3.8.127.
- No se modifica IndexedDB v1, backup JSON v3 ni dependencias. PR #742 sigue sin fusionar porque GitHub no reporta CI completo verde.

## 2026-11-23 — piloto curricular pt-BR A1 U1–U3 (PR en preparación)
- Tras aprobación explícita, rama `feat/pt-br-a1-pilot-u1-u3`; se prepara un piloto parcial de A1 (24 unidades previstas; U1–U3 publicadas como contenido de prueba), sin habilitar el curso ni cambiar el idioma activo.
- U1–U3 tienen cinco lecciones explícitas cada una. Inventario: 50 registros léxicos (U1 10, U2 10, U3 10 términos + 20 números); todos `not_checked`, sin hablante nativo ni certificación. U3 recicla exactamente dos preguntas de U1.
- Vocabulario usa el campo neutral `target`; ejercicios usan handlers existentes `mc` y `order`. Las actividades de comprensión son texto/selección; no se publica audio ni se elige voz.
- `CurriculumLoader.loadUnits('pt-BR','A1',[1,2,3])` permite probar bloques aun con `available:false`; la carga normal y el selector siguen bloqueados hasta completar A1. Service Worker precarga manifiesto y bloque del piloto.
- Añadidas pruebas Node y Playwright para cinco lecciones por unidad, referencias, reciclaje U3, carga offline y aislamiento del historial/progreso pt-BR frente a Indonesio. CI pendiente de ejecución.
- Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni recursos de audio.

## 2026-11-23 — selector de idiomas compacto en la barra superior (PR #738 abierta; CI verde)
- Por aprobación explícita, se sustituye la tarjeta grande de idioma en Aprender por un chip de bandera en la barra superior y una hoja inferior accesible. El catálogo se lee de `LanguageManager.list()`; Indonesio permanece como único curso disponible y los otros nueve se muestran en gris con etiqueta «Pronto», sin controles seleccionables.
- La hoja muestra el idioma activo, su nivel y el porcentaje de progreso del nivel actual. El chip de nivel conserva el progreso calculado desde el currículo y namespace del idioma activo. No cambia la selección predeterminada ni el mecanismo de persistencia de `LanguageManager`.
- Se eliminó el bloque explicativo y el margen que desplazaba la ruta. Barra compacta ajustada para 360 px; hoja con `role=dialog`, cierre por botón, fondo y Escape, foco visible y restauración del foco.
- Cambios visuales/navegación solamente: sin dependencias, backend, cambios de IndexedDB v1 ni backup JSON v3. Caché app shell v3.8.125. Los estilos nuevos se mantienen inline en index.html para preservar el hash del styles.css canónico; no se añadieron archivos de runtime.
- PR #738: https://github.com/luisequeira612-commits/bahasa-studio/pull/738. Rama `feat/compact-language-selector-sheet`; head `182e7f6bc084e9cc69e1f2680c09e12457fb64da`; base `db429218c7e33206ee46667625962aa1883667b8`. CI final run #45138894376: `test` y `Offline quality reports` completados en éxito. Playwright incluye 360×800, chip de 48 px, hoja y cierres, orden de idiomas, progreso coincidente, ruta en primera pantalla y persistencia tras recargar. Prueba física en Tecno Pova 4 aún pendiente.
- PR permanece abierta y sin merge. Esperar el «Aprobado» explícito del usuario.

## 2026-11-23 — selector de idioma trasladado a la pantalla principal
- Por aprobación explícita del dueño, el selector de curso se mueve de Perfil a la parte superior de Aprender/Ruta, en una tarjeta compacta y visible; Perfil deja de ser el único acceso al cambio de idioma.
- Se conserva el catálogo de diez idiomas, Indonesian como único curso seleccionable, los demás deshabilitados, la validación de LanguageManager y el reinicio seguro al cambiar de curso. No cambia currículo, progreso, IndexedDB v1 ni backup JSON v3.
- Cache app shell incrementada a v3.8.124. Prueba de regresión verifica ubicación en la pantalla principal y ausencia del selector en Perfil; CI pendiente.

## 2026-11-23 — mejora del selector de idiomas
- Corrección UX: el selector permanece desplegable aunque solo exista un curso disponible, para que se pueda consultar el catálogo aprobado y ver los nueve cursos próximos. Cada opción no disponible continúa deshabilitada y LanguageManager vuelve a validar cualquier intento de cambio.
- Seleccionar de nuevo el idioma ya activo no guarda ni recarga la aplicación.
- Cache app shell v3.8.123. La primera ejecución CI detectó que v3.8.122 también está reservado como nombre de caché legacy en la prueba de migración SHA-256; se corrigió a v3.8.123. Se añade regresión para la visibilidad del catálogo y el no-op del idioma activo. CI corregido pendiente.
- No se activan idiomas, cursos, vocabulario ni audio nuevos; IndexedDB v1 y backup JSON v3 siguen intactos.

## 2026-11-23 — fase 3: selector de idioma protegido
- PR en preparación: añade al Perfil un selector que muestra el catálogo aprobado, pero deshabilita cada curso no disponible; actualmente solo Indonesio puede seleccionarse. El control completo permanece deshabilitado hasta que exista más de un curso disponible.
- El cambio de idioma llama a LanguageManager.setActiveLanguage, persiste el código mediante el adaptador existente y recarga la app para reconstruir CourseData, motores y vistas bajo el nuevo namespace. El nombre del idioma activo se usa en la etiqueta de idioma de la vista de aprendizaje.
- No se crean cursos ni recursos nuevos. La interfaz y mensajes siguen en español; IndexedDB v1, backup JSON v3 y los namespaces existentes se preservan. Cache app shell v3.8.121. La primera ejecución CI reveló una colisión con el nombre de caché legacy v3.8.120 en una prueba de migración; se corrigió usando v3.8.121. CI de la revisión corregida pendiente.

## 2026-11-23 — fase 3: conectar CourseData con CurriculumLoader
- La integración de arranque ahora resuelve A1 y A2 del idioma activo mediante `CurriculumLoader` antes de inicializar AudioEngine y las pantallas; reemplaza solo esos niveles y conserva B1/B2 existentes. Si falta un nivel requerido, el arranque falla explícitamente en lugar de usar datos silenciosamente incorrectos.
- Se sincronizaron AGENTS.md y SKILL.md con la secuencia aprobada el 22 nov 2026: pt-BR → en → it → fr → de → nl → ru → ja → ko → id; se completa A1–B2 de cada idioma antes del siguiente. Solo indonesio sigue disponible durante esta fase; pt-BR A1 comienza después de cerrar fase 3.
- Se añadió regresión de integración y se incrementó la caché del app shell a v3.8.119 para publicar el cambio offline. IndexedDB v1, backup JSON v3, audio productivo, dependencias y datos curriculares no se modifican. CI/PR pendiente de verificación.

## 2026-11-23 — corregir normalización de SHA-256 en migración de audio
- Auditoría posterior a PR #730 detectó una inconsistencia: el validador acepta fingerprints hexadecimales en mayúsculas y la verificación de reproducción normaliza el valor, pero las dos rutas de migración comparaban el digest hexadecimal minúsculo con el metadata original. Un clip actual válido podía borrarse y una copia legacy válida podía no migrarse antes de eliminarse la caché antigua.
- PR [#731](https://github.com/luisequeira612-commits/bahasa-studio/pull/731) fusionada mediante squash en `main`; head `5211f9532bab8167fc456e8e9dd3e4eab955fc2f`, commit integrado `fb5776937f8c5008f639f15a9d180989623c2a20`.
- Normaliza el hash esperado a minúsculas en la comparación de caché actual y de migración legacy. Añade regresiones independientes para ambas rutas con hashes uppercase. Mantiene la validación estricta de 64 caracteres hexadecimales; no altera inventarios, audio, IndexedDB v1, backup JSON v3 ni dependencias.
- CI #45129083642: `test` completó 101/101 pasos con éxito y `Offline quality reports` 10/10. Sin reviews ni hilos pendientes; head comprobado sin cambios antes del merge.

## 2026-11-16 — biblioteca de audio MMS completa y verificada
- Generación completa [run #43819778038](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43819778038): MMS, modo full, todos los niveles; 2.196 clips únicos y 29.660.564 bytes combinados MP3 + Opus. PR [#636](https://github.com/luisequeira612-commits/bahasa-studio/pull/636) fusionada por squash como `88caa5fffdb7302e185b7201d58d7a198adfd775`.
- Verificación post-merge: índice y manifiesto contienen los mismos 2.196 IDs; árbol Git con 2.196 MP3 y 2.196 Opus, sin faltantes ni sobrantes; metadata identifica MMS `facebook/mms-tts-ind`, revisión `171b004ccd54f266a31efee71f1ad850c91d39c0`, licencia CC BY-NC 4.0; 2.196 hashes SHA-256 válidos, sin huellas faltantes ni sobrantes.
- Regresión pre-merge [#43821919412](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43821919412) y post-merge [#43822481728](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43822481728): jobs `test` y `Offline quality reports` completados con éxito. GitHub Pages post-merge [#43822480330](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43822480330) completado con éxito.
- El usuario escuchó una muestra y la consideró natural y entendible; prefería voz femenina, pero aceptaba la voz masculina disponible. Esto no constituye certificación lingüística ni validación nativa. Quedaba pendiente una comprobación manual de reproducción/descarga offline en el Tecno Pova 4.
- Fuente: GitHub Actions #43819778038, #43821919412, #43822481728, #43822480330; PR #636 y artefactos de inventario en main; 16 nov 2026.

## 2026-11-14 — despliegue de audio offline verificado
- Tras la integración de descarga/caché bajo demanda, regresión post-merge del commit `dd7b29805c2475cc051187aa219b369cdae209c6` aprobada en [run #43655294954](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43655294954): jobs `test` y `Offline quality reports` en éxito.
- GitHub Pages post-merge completado en [run #43655294337](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/43655294337).
- La prueba manual del usuario confirmó que un clip reproducido previamente online funcionaba en modo avión, mientras que uno nunca almacenado no funcionaba en el primer intento offline. La limitación era caché bajo demanda, no fallo de generación Piper. No declarar toda la biblioteca disponible offline hasta que el usuario prepare niveles o la biblioteca completa en su dispositivo.
- Fuente: PR #598, commit `dd7b29805c2475cc051187aa219b369cdae209c6`, Actions #43655294954/#43655294337 y prueba manual del usuario; 14 nov 2026.
 
## 2026-11-23 — PR #729 fusionada: preservar audio ante hashes SHA-256 malformados
- PR [#729](https://github.com/luisequeira612-commits/bahasa-studio/pull/729) fusionada mediante squash en `main`; head validado `159ed558eba3037ff857b48e2e4125dc0451596c`, commit integrado `7def9f7c9828e85fe9038ffa009d39b0bd8339a0`.
- CI final #45127449881: `test` completó 98 pasos con éxito, incluidos tests de audio/caché, E2E en navegador real, evaluación y preview; `Offline quality reports` también terminó con éxito. Sin reviews ni hilos pendientes.
- La prueba de hash malformado se corrigió para exigir que los bytes no verificados permanezcan almacenados para verificación futura, pero no se sirvan desde caché; la reproducción online continúa. No se relajó la implementación.
- Alcance: `service-worker.js`, `tests/service-worker-audio-cache.test.cjs` y `MEMORY.md`; sin cambios en audios/inventarios productivos, IndexedDB v1, backup JSON v3 ni dependencias.

## 2026-11-23 — PR #729: ajustar regresión de caché no verificable
- CI #45126091140 falló únicamente en la prueba nueva de hash malformado: la prueba esperaba que el audio cacheado se borrara tras impedir su reproducción. Eso contradice el objetivo de preservar físicamente la copia para una verificación futura.
- Se corrige la prueba para exigir simultáneamente que la respuesta servida sea el audio online y que la copia cacheada original permanezca almacenada, sin servirla ni eliminarla. La regresión anterior de migración legacy pasó.
- La implementación no se relajó; la repetición completa del CI terminó en verde (run #45127449881) y la PR #729 se fusionó.

## 2026-11-23 — PR #729: preservar audio ante hashes SHA-256 malformados
- Auditoría posterior a PR #728 detectó que el Service Worker distinguía hash ausente de hash presente sin validar formato. Un hash malformado podía provocar que se eliminara una copia cacheada actual o que se limpiara una caché legacy sin haber podido verificar el audio; en reproducción online también podía rechazarse un MP3 válido solo por metadata malformada.
- La corrección trata hashes ausentes o malformados como evidencia no disponible: no sirve bytes cacheados sin verificar, no los elimina solo por falta de evidencia, no migra ni borra la única copia legacy y permite reproducción online sin persistencia offline. Un hash SHA-256 válido que no coincide sigue invalidando el contenido.
- Añade regresiones para migración legacy con hash malformado, preservación de caché actual y reproducción online. CI final #45127449881 y revisión completados; PR #729 fusionada mediante squash en `main` (commit `7def9f7c9828e85fe9038ffa009d39b0bd8339a0`). No cambia inventarios productivos, audios, IndexedDB v1, backup JSON v3 ni dependencias.

## 2026-11-23 — PR #728: corregir fixture de caché Range pt-BR
- El CI #45124084489 volvió a fallar únicamente en `tests/service-worker-audio-range.test.cjs`: la respuesta Range 206 era correcta, pero la prueba buscaba el clip cacheado bajo `sample.mp3`, mientras que la solicitud real usaba el ID hexadecimal `0123456789ab`. Además, ese nombre ficticio no podía producir un ID verificable para SHA-256.
- Se corrigió el fixture para consultar exactamente la misma URL de audio regional que se solicitó, conservando el ID hexadecimal y el inventario SHA-256 correspondiente. No se relajó la verificación ni la política de caché.
- Pendiente de CI completo. No modifica audios ni inventarios productivos, IndexedDB v1, backup JSON v3 ni dependencias.

## Guardi — verificación SHA-256 en la caché automática del Service Worker — 23 nov 2026

- PR en preparación: la ruta de reproducción normal del Service Worker guardaba cualquier respuesta HTTP 200 sin comprobar el inventario, aunque la descarga offline explícita sí verificaba SHA-256. El cambio valida los bytes de caché y de red contra el hash del idioma antes de servir una copia persistente; si falta inventario/hash, permite reproducción online pero no promueve el archivo a caché offline; si el hash disponible no coincide, rechaza la respuesta. Incluye pruebas para hash válido, inventario ausente y contenido alterado.
- Archivos previstos: `service-worker.js`, `tests/service-worker-audio-cache.test.cjs`, `tests/service-worker-audio-range.test.cjs`, `tests/service-worker-install.test.cjs`, `MEMORY.md`. El CI #45123667344 pasó los informes de calidad, pero falló la prueba de rangos en la ruta `pt-BR`: la respuesta 206 se generaba, aunque el clip completo no quedaba guardado en la caché de ese idioma. La prueba usa un ID hexadecimal válido y hashes coherentes. Se endurece la resolución del código de idioma para normalizarlo contra el catálogo cerrado antes de elegir la metadata y el espacio de caché; esto evita diferencias de mayúsculas/minúsculas en códigos regionales. La corrección anterior del ID ficticio `sameclip00001` también queda aplicada. El primer CI detectó además una expectativa antigua de cachear MP3 sin inventario; se actualizó para reflejar la política nueva (reproducción online permitida, sin persistencia no verificada). Pendiente de CI completo y revisión. No modifica audios/manifiestos, IndexedDB v1, backup JSON v3 ni dependencias.

Fuente: auditoría de `main` posterior a PR #727; 23 nov 2026.

## Guardi — cadena de correcciones de integridad de audio offline — 23 nov 2026

- PR [#726](https://github.com/luisequeira612-commits/bahasa-studio/pull/726) fusionada en `main`, squash commit `0471c2264f1d4af3bcd19962d9227c245c7d0984`. CI del head `406da3a7887e2c2002bbc5b07978917f37050157`, run [#45119720724](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45119720724): `test` y `Offline quality reports` completados con éxito, incluidos E2E en navegador real. Sin reviews ni hilos pendientes. La migración conserva la caché legacy cuando la caché actual contiene bytes no verificables por falta del inventario del idioma; una activación posterior puede recuperar y verificar el original antes de limpiar la fuente.
- PR [#725](https://github.com/luisequeira612-commits/bahasa-studio/pull/725) fusionada en `main`, squash commit `f500277d8074256ce16e1b803aca0e4d4fc4783e`. CI run [#45115542815](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45115542815) completó `test` y `Offline quality reports` con éxito. `offline-audio-manager.js` solo cuenta como offline los MP3 cacheados cuyo estado, tamaño y SHA-256 son válidos; elimina entradas corruptas o no verificables.
- PR [#724](https://github.com/luisequeira612-commits/bahasa-studio/pull/724) fusionada en `main`, squash commit `1b0506a1cf44070f278c32e3858c249e85e924b4`. CI run [#45114534642](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45114534642) completó ambos jobs con éxito. La migración conserva respuestas 200 actuales sin hash individual y la caché legacy hasta poder verificar los bytes.
- PR [#723](https://github.com/luisequeira612-commits/bahasa-studio/pull/723) fusionada en `main`, squash commit `a2bf144e5f2b6e86c88f7eff43971c918b76eb2f`. CI run [#45112533279](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45112533279) completó ambos jobs con éxito. Si falta el hash de un clip legacy, la migración conserva la fuente y marca el proceso incompleto.
- PR [#722](https://github.com/luisequeira612-commits/bahasa-studio/pull/722) fusionada en `main`, squash commit `641ac7dea9cf8c7db9285a16de24f3f88223e8b4`. CI run [#45111985902](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45111985902) completó ambos jobs con éxito. Si falta el inventario SHA-256 del idioma, no se migra audio sin verificar y se conserva la caché legacy.
- Alcance común preservado: sin cambios a IndexedDB v1, backup JSON v3, inventarios/manifiestos productivos, archivos de audio ni dependencias. Estas correcciones no activan idiomas adicionales.

Fuente: PR #722–#726, commits squash y ejecuciones CI enlazadas; 23 nov 2026.

## Guardi — validación del inventario offline de audio — 23 nov 2026
- Auditoría de main: `audio/manifest.json` y `audio/metadata.json` contienen 2.268 entradas/huellas, sin IDs duplicados, hashes faltantes ni huellas huérfanas; niveles A1 683, A2 1.014, B1 541 y B2 155.
- PR #721 endurece la validación de manifiesto/huellas al cargar el inventario, normaliza IDs/hash hexadecimales, rechaza duplicados, niveles desconocidos, textos vacíos y SHA-256 inválidos; el resumen de biblioteca incluye B2. También elimina de AGENTS.md una hoja de ruta antigua que contradecía la decisión vigente: idiomas nuevos pendientes de selección. No añade recursos ni activa cursos; IndexedDB v1, backup JSON v3 y dependencias intactos.

## Guardi — estado de integración multiidioma — 23 nov 2026
- PR #719 fusionada en `main` (commit `332d8b56fac8b24897ca8d542acc534174eb08a8`); CI run [45110624164](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45110624164) completó con éxito ambos jobs. Cachés/rutas de audio e inventarios preparados por código de idioma; no se añadieron recursos ni cursos de otros idiomas. IndexedDB v1, backup JSON v3 y dependencias intactos.
- Corrección de decisión: el usuario aprobó la infraestructura multiidioma, pero aún está pensando qué idiomas añadir. Los códigos de LanguageManager son placeholders técnicos, no una lista ni un orden curricular aprobado. No crear contenido ni seleccionar idiomas hasta confirmación explícita; solo Indonesian está disponible.

## CI de PR #718 — corrección E2E de fallback de voz — 23 nov 2026

- El tercer CI (run 45102762995) completó todos los tests hasta el E2E, pero falló únicamente en dos aserciones de `tests/browser-e2e.test.cjs` que esperaban el texto antiguo «Voz del dispositivo disponible como respaldo: …». El producto ahora muestra explícitamente «… como respaldo para indonesio: …», coherente con el runtime por idioma.
- Se actualizaron solo esas dos expectativas (`Mock Indonesian B` y `Late Indonesian`). Regresión, audio engine, lifecycle, privacidad, LanguageManager, CurriculumLoader y Offline quality reports pasaron; el fallo está aislado al texto esperado por E2E. No cambia IndexedDB v1, backup JSON v3, audio, Service Worker, manifiestos ni dependencias.
- Commit correctivo: `b1307ff5ccd888e548b47e36248e18ce543574ac`. Repetir CI completo antes de fusionar PR #718.

## Ajuste de límite de privacidad de reconocimiento — 23 nov 2026

- El segundo CI de PR #718 pasó regresión (85/85), audio engine y lifecycle tests, pero falló `tests/speech-recognition-privacy-boundary.test.cjs` porque exigía literalmente `recognition.lang = 'id-ID'`. Se actualizó la prueba para exigir locale dinámico proveniente de `LanguageManager` y fallback `id-ID`, manteniendo los controles de activación explícita, captura única y ausencia de transporte/almacenamiento de audio propio.
- La evaluación y dictado de conversación que siguen siendo indonesio-específicos no se cambiaron; el alcance de esta fase es solo `PronunciationEngine` general.
## Ajustes de regresión de fase 1 de audio multiidioma — 23 nov 2026

- El primer CI de PR #718 detectó cuatro expectativas obsoletas en `tests/regression.test.cjs`: búsqueda de voz fija `id`, ruta literal `./audio/id/` y dos aserciones de `recognition.lang = 'id-ID'`. El comportamiento nuevo es intencionalmente dinámico y conserva `id-ID` solo como fallback de compatibilidad.
- Se actualizaron las expectativas para validar el filtro de metadatos seguro, la ruta dinámica configurada (y el fallback legacy `./audio/id/`) y `recognition.lang = locale`. No se cambia la evaluación standalone, que sigue siendo específicamente indonesia.

## 2026-11-23 — PR #718 CI: reparación de regresión estructural en E2E
- Run 45106615524: **Offline quality reports SUCCESS**; el job `test` llegó hasta E2E con todos los pasos 1–95 anteriores en verde.
- E2E falló antes de ejecutar los casos porque `tests/browser-e2e.test.cjs` en el head de la PR estaba truncado desde el inicio y arrancaba con un fragmento de una prueba; Node reportó `SyntaxError: Unexpected token ']'` en la línea 3.
- Causa: la actualización anterior del archivo conservó solo el fragmento final con las dos correcciones de expectativas, perdiendo el resto del fichero. No es un fallo de producto/audio.
- Corrección: restaurar `tests/browser-e2e.test.cjs` íntegramente desde `main` y reaplicar únicamente las dos expectativas E2E de PR #718: los mensajes ahora incluyen `para indonesio`.
- No se modifica IndexedDB v1, backup JSON v3, audio, Service Worker, manifiestos ni dependencias.
- Debe ejecutarse un CI completo nuevo sobre el head corregido antes de fusionar PR #718.


## 2026-11-23 — PR #718 E2E: ajuste de velocidad predeterminada

- El nuevo CI `45108384175` pasó todos los pasos 1–95 y falló únicamente en el E2E `audio engine plays bundled Indonesian MP3 before using browser voice API`: el test esperaba velocidad `0.85`, mientras `AudioEngine` declara y aplica `1` como velocidad natural predeterminada.
- Se actualizó solo la expectativa E2E de `0.85` a `1`. Los tests unitarios ya verificaban que la velocidad predeterminada es `1`; no se cambió el comportamiento del producto.
- No se modifica IndexedDB v1, backup JSON v3, Service Worker, manifiestos, audios ni dependencias. Debe ejecutarse otro CI completo antes de fusionar PR #718.


## 2026-11-23 — PR #718 E2E: respetar velocidad de audio persistida

- Run `45109413422`: todos los pasos previos y 32/33 pruebas E2E pasaron; falló solo la aserción que fijaba `playbackRate = 1`, mientras el navegador real de prueba había cargado `0.85` como preferencia persistida en `AudioEngine.rate`.
- La hipótesis anterior de que el valor observado debía ser siempre 1 era incompleta: `1` es el valor inicial del objeto, pero la app restaura una preferencia guardada y admite `0.85` como velocidad válida. El comportamiento correcto es que el MP3 respete la velocidad activa, no imponer una velocidad fija.
- Se ajustó el E2E para comparar la velocidad aplicada al MP3 con `AudioEngine.rate` en la misma ejecución. No se cambió el producto ni la preferencia del usuario.
- Sin cambios a IndexedDB v1, backup JSON v3, archivos de audio, Service Worker, manifiestos ni dependencias. Repetir CI completo antes de fusionar PR #718.


## 2026-11-23 — PR fase 2: rutas y caché offline de audio por idioma

- Tras fusionar PR #718 (commit `5da07df98932d536dd2e8deaa67bf73992e181df`), se inició una fase incremental para desacoplar el audio offline de la ruta fija `audio/id/`.
- `service-worker.js` reconoce rutas de audio de los diez códigos cerrados del LanguageManager, mantiene `guardi-audio-v2` para indonesio y usa cachés independientes `guardi-audio-v2-<código>` para los demás idiomas. La deduplicación de fetch y la respuesta de byte ranges se conservan por URL/ruta.
- La migración de cachés antiguas resuelve la metadata SHA-256 según el idioma y valida bytes contra el inventario correspondiente antes de conservar/copiar clips. Las rutas legacy de indonesio siguen usando `audio/metadata.json`; las futuras bibliotecas usan `audio/<código>/metadata.json`.
- `offline-audio-manager.js` ahora resuelve ruta de inventario, MP3 y caché desde el idioma activo. También corrige la discrepancia previa: el preparador offline escribía en `guardi-audio-v1`, mientras el Service Worker reproducía desde `guardi-audio-v2`; ambos pasan a compartir la caché persistente v2 para indonesio.
- Añadidas pruebas de separación de cachés, migración SHA-256 por idioma, byte ranges en ruta pt-BR y helpers del gestor offline. No se añaden audios/manifiestos de idiomas nuevos, no se habilita ningún curso y no se modifica IndexedDB v1, backup JSON v3 ni dependencias. Validación CI pendiente en PR.


## 2026-11-23 — PR fase 2: corrección de sintaxis del gestor offline

- El primer CI de PR #719 (`45110400062`) pasó el informe de calidad, pero falló en la comprobación JavaScript antes de ejecutar la batería de pruebas: `offline-audio-manager.js` contenía un fragmento residual duplicado después del cierre (`})();, 'i');`).
- La lógica válida de `idsFromCacheKeys` ya estaba implementada antes; el fragmento residual pertenecía a una versión anterior de esa función y era código suelto fuera del módulo. Se eliminó únicamente ese bloque posterior al cierre, sin alterar la implementación activa.
- No se modifican IndexedDB v1, backup JSON v3, manifiestos, audios, dependencias ni el alcance de activación de idiomas. Repetir CI completo antes de fusionar PR #719.


## 2026-11-23 — PR #724: estabilizar E2E de velocidad de audio

- El primer CI del head `47a1cb808fcc0e0efffc9fb7136afe3f9e483beb` pasó Offline quality reports y 32/33 pruebas Chromium; falló la E2E de reproducción MP3 porque la prueba invocaba `speak()` antes de que terminara la restauración asíncrona de `audioPlaybackRate`. El MP3 capturó la velocidad inicial `1`, mientras la preferencia persistida `0.85` llegó después.
- Se hizo determinista el fixture E2E: guarda `0.85` en IndexedDB de prueba, lo vuelve a leer, sincroniza `AudioEngine.setRate(..., false)` y solo entonces inicia la reproducción. La prueba sigue comprobando que el MP3 recibe la preferencia persistida; no se cambia código de producto.
- El resto de E2E pasó (32/33) y el informe de calidad offline fue exitoso. Repetir CI completo sobre el nuevo head antes de fusionar PR #724.
- Sin cambios a IndexedDB v1 del usuario, backup JSON v3, Service Worker, manifiestos productivos, audios ni dependencias.


## 2026-11-23 — PR: verificar integridad de MP3 ya cacheados

- Auditoría posterior a PR #724 detectó que `OfflineAudioManager.refreshCacheState()` contaba IDs de archivos presentes sin comprobar sus bytes contra el inventario SHA-256. Un MP3 alterado o sin huella podía aparecer como listo para uso sin conexión.
- Corrección en curso: antes de contar un clip, comprobar respuesta HTTP 200, contenido no vacío y SHA-256 esperado; eliminar del cache los clips conocidos que no pasan la verificación y dejar que se vuelvan a descargar. Los clips solo se consideran guardados si coinciden con el inventario validado.
- Se añade prueba para conservar un clip íntegro y excluir/eliminar uno alterado y otro sin hash. El cambio no modifica el formato de inventario, Service Worker, IndexedDB v1, backup JSON v3, audios ni dependencias.
- Validación CI pendiente en PR.


## 2026-11-23 — Variantes del catálogo multilingüe
- Corrección de UI/catálogo: el idioma mostrado como **Portugués** usa la bandera 🇧🇷; no se debe mostrar “Portugués de Brasil”, porque la bandera ya identifica la variante enseñada.
- El idioma **Inglés** corresponde a **inglés de Estados Unidos** y debe usar la bandera 🇺🇸, no 🇬🇧.
- Decisión vigente: **no iniciar todavía el curso de Portugués**. La activación y creación de su currículo queda bloqueada hasta que Luis defina primero cuántas unidades tendrá.


## 2026-11-23 — Prueba de voz dependiente del idioma
- La prueba manual de voz obtiene la frase de prueba de la configuración del idioma activo mediante `testPhrase`, en lugar de reproducir siempre una frase indonesia.
- Indonesio conserva `terima kasih`. Si un idioma no tiene frase configurada, la prueba muestra un aviso en español y no intenta reproducir contenido de otro idioma.
- Se añaden pruebas unitarias y estructurales para impedir que vuelva el fallback fijo al indonesio.
- No se habilitan cursos nuevos ni se modifican IndexedDB v1, backup JSON v3, dependencias o recursos de audio.


## 2026-11-23 — PR #745: pt-BR A1 U7–U9 integradas
- PR #745 fusionada mediante squash en main, commit b29f79e0befa06d1050657d1a2ea98f148dc03eb. CI completo del head 9465d3eaa43a365bc6475c4af44f610404a5e69c, run 45200036939, terminó con test y Offline quality reports en éxito; incluye E2E Chromium y evaluación en navegador.
- A1 pt-BR tiene 24 unidades declaradas y U1–U9 publicadas. U7: rutina diaria; U8: lugares, direcciones y transporte; U9: clima, estados personales y razones. Cada unidad mantiene cinco lecciones, diez términos nuevos y diez ejercicios finales. Los términos continúan not_checked.
- El primer CI detectó una expectativa desactualizada de U1–U6 y la falta de inicialización del registro global en el bloque U7–U12; ambas correcciones pasaron el segundo CI. Se mejoraron dos ejemplos (em frente; A chuva começou.).
- pt-BR sigue available:false. Sin nuevos recursos de audio/TTS, dependencias, cambios a IndexedDB v1 o backup JSON v3.

## 2026-11-23 — PR #742: prueba de voz por idioma integrada
- PR #742 fusionada por squash en main, commit 97f5cbc457a91168e9637eea1f7b41bda666d89e. CI run 45143050099: test y Offline quality reports ambos en éxito.
- AudioEngine.testVoice() usa testPhrase del idioma activo; indonesio conserva terima kasih. Si no hay frase configurada, muestra aviso en español y no reproduce contenido indonesio. Sin nuevos audios, dependencias o cambios de datos persistentes.

## 2026-11-23 — PR #746: pt-BR A1 U10–U12 integradas
- PR #746 fusionada por squash en main, merge commit `195b1679bdde4162dbae29ffb4113cdbc917ff8f`. CI run `45202650825`: `test` (101/101 pasos) y `Offline quality reports` ambos success.
- U10 compras/precios, U11 ropa/colores, U12 días de la semana/referencias temporales. Manifiesto A1 declara 24 unidades y U1–U12 publicadas.
- Cada unidad aporta diez términos `not_checked`, cinco lecciones y diez ejercicios finales. `pt-BR` sigue `available:false`; sin audio/TTS ni dependencias; se preservan IndexedDB v1 y backup JSON v3.

## 2026-11-23 — PR #747: pt-BR A1 U13–U15 en preparación
- Rama basada en main posterior a #746. U13 lectura y aficiones creativas; U14 deportes y movimiento; U15 cine, salidas e invitaciones.
- Cada unidad aporta diez términos `not_checked`, cinco lecciones y diez ejercicios finales; solo renderizadores existentes `mc` y `order`. Se amplía la carga U1–U15 y precache offline. `pt-BR` continúa `available:false`; no audio/TTS nuevo ni dependencias; sin cambios a IndexedDB v1 o backup JSON v3. CI pendiente.


## 2026-11-23 — PR #747: corrección de sintaxis pendiente
- El primer CI del head a0efcf38744cb552b624eae1b346790391670514 falló: `units-13-18.js` no incluía el wrapper IIFE ni los helpers locales (`v`, `mc`, `order`, `write`, `lesson`). Esto provocó SyntaxError y fallos derivados en E2E/carga de U13–U15.
- `Offline quality reports` terminó success; el fallo no se atribuye a los avisos editoriales generales. La PR no se fusiona hasta corregir sintaxis y lograr CI completo verde.


## 2026-11-23 — PR #747: corrección de referencias y precache
- El segundo CI (run [45209101045](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45209101045)) pasó `Offline quality reports`, pero el job `test` falló en tres pruebas relacionadas: el bloque U13–U15 usaba referencias a variables locales de otros archivos (`u3`, `u12`, `u10`) que no existen en su ámbito; la prueba unitaria aún esperaba solo U1–U12; y el E2E abría el nombre de caché anterior `v3.8.127` aunque el Service Worker actual usa `v3.8.128`.
- Corrección: sustituir referencias cruzadas por IDs estables de vocabulario; actualizar la expectativa de carga a U1–U15; alinear el E2E con la versión actual de caché y comprobar también que U13–U15 están precargadas.
- No se relajan las pruebas ni se altera el estado `available:false`. Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio/TTS.


## 2026-11-23 — PR #749: pt-BR A1 U19–U21 preparada sobre main
- Tras integrar #748 (squash `0b5910ea1e40d57b189da59d0027c5d5e3926440`), la rama apilada original de #749 quedó con conflictos por incluir los mismos cambios de U16–U18 y `MEMORY.md`. Se prepara una rama limpia desde `main` que contiene solo el incremento U19–U21 y sus pruebas.
- U19 meses, fechas y cumpleaños; U20 restaurante y pedidos; U21 tareas domésticas. Diez términos por unidad, cinco lecciones y diez ejercicios finales; vocabulario `not_checked`.
- Manifiesto U1–U21 de 24; `pt-BR available:false`. Service Worker precarga `units-19-21.js` y usa cache key `bahasa-studio-v3.8.129`. Node y Playwright amplían contratos/carga offline a U1–U21.
- Sin dependencias, audio/TTS, backend, cambios a IndexedDB v1 ni backup JSON v3. La PR nueva debe pasar CI completo antes de fusionar.

- CI inicial de #750 run `45225937982`: `Offline quality reports` success; `test` falló únicamente en Playwright porque el E2E aún cargaba U1–U18 aunque esperaba U1–U21. Corregido en commit `de38f8db5740b93f2a32ed00361a1da6f87fe507`: `CurriculumLoader.loadUnits` ahora solicita U1–U21. Revalidar el nuevo head con CI completo antes del merge.


## 2026-11-23 — pt-BR A1 U22–U24
- Tras fusionar #750 en `main` (squash `a8748298b28b846b85413d53d596afee8a5e3938`), se prepara la PR limpia #752 desde ese `main`, con solo U22–U24; la PR apilada #751 no debe fusionarse porque su historial conserva los commits ya squash-mergeados de U19–U21.
- U22 aula/materiales de estudio; U23 profesiones/trabajo; U24 teléfono/mensajes. Diez términos nuevos, cinco lecciones y diez ejercicios por unidad; vocabulario `not_checked`.
- Manifiesto U1–U24; `pt-BR available:false` hasta validar el curso. SW cache `bahasa-studio-v3.8.130`, precache `units-22-24.js`; E2E carga U1–U24 offline y se añade test Node para contratos de U22–U24.
- Sin nuevas dependencias, audio/TTS, backend, cambios a IndexedDB v1 ni backup JSON v3.

## 2026-11-23 — pt-BR A2 U1–U3 en preparación
- A1 U1–U24 quedó integrada en `main` mediante PR #752, squash commit `f5a90d716352b09c26dee8a564a48b9656517e00`. El CI de la PR completó `test` (101 pasos) y `Offline quality reports` (10 pasos) en success; GitHub Pages completó build y deploy del commit integrado.
- Inicia A2 (30 unidades) en la rama `feat/pt-br-a2-u01-u03`. U1: pasado reciente y pretérito perfeito; U2: infancia y hábitos con pretérito imperfeito; U3: planes, compromisos e ir + infinitivo.
- Cada unidad contiene 10 términos, 5 lecciones y 10 ejercicios de selección múltiple; las lecciones incluyen 2 ejercicios y las respuestas correctas se distribuyen entre las opciones. Vocabulario `not_checked`; referencias de repaso apuntan a IDs previos de A1/A2.
- Manifiesto A2 declara 30 unidades y publica solo U1–U3. Se registra la ruta A2 en LanguageManager, se precargan manifiesto y bloque U1–U3 con Service Worker cache `bahasa-studio-v3.8.131`, y se amplía Playwright para comprobar carga offline A1+A2. `pt-BR available:false` se conserva; el nivel A2 incompleto no se activa.
- Sin nuevas dependencias, backend, audio/TTS ni cambios a IndexedDB v1 o backup JSON v3. CI pendiente antes de abrir/ fusionar la PR.


- Ampliación de cobertura del runner: `quality:tests` ahora incluye los contratos incrementales A1 U19–U21, A1 U22–U24 y A2 U1–U3. Se corrigieron los harness de pruebas incrementales para inicializar el manifiesto antes de inspeccionar sus unidades publicadas.


## 2026-11-23 — PR #753: corrección de regresiones de integración A1/A2
- El primer CI (#45233109300) detectó tres expectativas antiguas en los tests incrementales A1 U19–U21 y U22–U24: el manifiesto A1 ya publica U1–U24 (no U1–U21) y el Service Worker avanzó a `v3.8.131` al añadir el manifiesto y bloque A2.
- Se actualizan únicamente esas expectativas; el contenido curricular A1/A2 y el estado `pt-BR available:false` no cambian. `Offline quality reports` pasó; se repetirá CI completo, incluido Playwright.


## 2026-11-23 — pt-BR A2 U4–U6
- PR #753 se fusionó por squash tras completar ambos jobs: test (101 pasos) y Offline quality reports (10 pasos), ambos success. Commit de merge: 57685ed4a911149feb2f97383778a27639ad6cf1.
- Nueva rama limpia feat/pt-br-a2-u04-u06, basada en el commit de main posterior a #753. Añade U4 experiencias y acontecimientos (já/ainda não/nunca y contraste de tiempos pasados), U5 comparativos (mais/menos/tão, melhor/pior, maior/menor) y U6 pedir ayuda/resolver problemas (poder, precisar, infinitivo).
- Cada unidad: 10 vocabularios, 5 lecciones, 10 ejercicios MC; respuestas correctas comprobadas por índice, IDs propios y referencias de repaso a U1–U3. Estado léxico not_checked.
- Manifiesto A2 declara 30 unidades y ahora publica U1–U6 en dos bloques. Service Worker bahasa-studio-v3.8.132 precarga units-04-06.js. Se agrega test incremental Node, se incluye en quality:tests y Playwright amplía la carga offline A2 a U1–U6.
- pt-BR available:false permanece sin cambios. No se modifican IndexedDB v1 ni backup JSON v3; sin dependencias, backend ni audio/TTS. No implica certificación lingüística nativa.


## 2026-11-23 — corrección CI PR #754
- CI run #45236415109 detectó 4 fallos de regresión en la suite `quality:tests` (199/203 pasaron): el test A2 U1–U3 aún esperaba que el manifiesto publicara solo U1–U3; los tests de A2 U1–U3, A1 U19–U21 y A1 U22–U24 todavía esperaban la caché `v3.8.131` tras el avance a `v3.8.132`.
- Se actualizaron únicamente esas expectativas: el manifiesto ahora debe publicar U1–U6 y los tres tests verifican la versión actual de caché. No se cambia lógica de producto ni se eliminan aserciones. Se repetirá CI completo antes de fusionar.


## 2026-11-23 — pt-BR A2 U7–U9 en preparación
- PR #754 quedó fusionada por squash en `main`, commit `c6c00fd18618591fca6f61bcb0aa6cd141d86e2b`, después de CI completo en success: `test` 101 pasos y `Offline quality reports` 10 pasos.
- Nueva rama limpia `feat/pt-br-a2-u07-u09` basada en ese commit. U7 obligaciones, permisos y consejos (ter que, dever, precisar); U8 conectores y secuencia (primeiro, em seguida, por isso, porém, apesar de); U9 viajes, transporte y alojamiento (passagem, bagagem, hospedagem, check-in, embarcar/desembarcar, conexão).
- Cada unidad contiene 10 términos `not_checked`, 5 lecciones y 10 ejercicios MC. Referencias de repaso de U7–U9 apuntan a vocabulario de unidades A2 anteriores; tests comprueban IDs, respuestas correctas, manifiesto y resolución de repaso.
- Manifiesto A2 publica U1–U9 de 30; Service Worker avanza a `bahasa-studio-v3.8.133` y precarga `units-07-09.js`. Playwright se amplía para cargar A2 U1–U9 offline; los tests anteriores alinean expectativas de caché.
- `pt-BR available:false` permanece; no se alteran IndexedDB v1 ni backup JSON v3. Sin nuevas dependencias, backend ni audio/TTS. El vocabulario sigue sin certificación nativa.


## 2026-11-23 — corrección CI PR #755
- CI run #45238319009 detectó un error de sintaxis en `tests/pt-br-curriculum.e2e.test.cjs`: un literal `\\n` quedó insertado en la expresión de verificación de la caché offline. El resto de la suite reportó 206/207 pruebas superadas; `Offline quality reports` pasó.
- Se corrigió el test sustituyendo el literal por un salto de línea real en commit `4425703f5990b78e5f9aee1d9563f93e3d94bc27`. Se requiere CI completo sobre este nuevo head antes de fusionar. No se cambia contenido curricular ni comportamiento de la app.


## 2026-11-23 — pt-BR A2 U7–U9 fusionadas y U10–U12 en preparación
- PR #755 se fusionó por squash en `main`, commit `96ae18a55cbb3986c5b0e37df705243ffa85c0c9`. CI run #45238928076 completó `test` (101/101 pasos) y `Offline quality reports` (10/10 pasos), ambos en success. Se corrigió previamente un literal de salto de línea en el test E2E.
- Estado confirmado tras el merge: A1 24/24; A2 9/30; B1 0/36; B2 0/40. pt-BR permanece `available:false`; no se modifica IndexedDB v1 ni backup JSON v3.
- Nueva rama `feat/pt-br-a2-u10-u12` parte del commit fusionado. Bloque previsto: U10 noticias y medios; U11 cultura y espectáculos; U12 medio ambiente y sostenibilidad. Se cotejaron 330 términos A1/A2 existentes y se evitaron colisiones exactas en las 30 entradas nuevas.
- Cada unidad mantiene 10 términos `not_checked`, 5 lecciones y 10 ejercicios MC. Se amplía manifiesto a U1–U12, precarga offline y caché a `bahasa-studio-v3.8.134`; se actualizan tests de manifiesto y Playwright. Sin nuevas dependencias, backend, audio/TTS ni cambios de persistencia. Pendiente CI del PR de este bloque.

- PR #756 abierto: https://github.com/luisequeira612-commits/bahasa-studio/pull/756. Head inicial `f269ebaa7824c4e0a59431054f01bd454a391595`, 10 archivos, +193/-16. CI pendiente; no fusionar hasta comprobar todos los checks del head definitivo.

- 2026-11-23 — CI PR #756 run #45240545419 encontró 6 fallos en pruebas de caché heredadas que seguían esperando `v3.8.133` después de subir a `v3.8.134`; además, el test U7–U9 cargaba ahora el manifiesto U1–U12 sin mapear el nuevo archivo U10–U12. Corregidos los cinco archivos de test afectados (U1–U3, U4–U6, U7–U9, A1 U19–U21 y A1 U22–U24); el test U7–U9 ahora incluye el bloque U10–U12 en su loader simulado. Sin cambios al currículo ni a persistencia. Pendiente repetir CI en el head nuevo.

- Segunda pasada CI PR #756, run #45241418593, confirmó que la simulación offline U7–U9 ya resuelve U10–U12; cuatro tests seguían fallando solo porque sus regex contienen puntos escapados literalmente (`3\\.8\\.133`), por lo que el reemplazo anterior no actualizó esas cadenas. Corregidas las regex exactas a `3\\.8\\.134` en A2 U1–U3, A2 U4–U6, A2 U7–U9 y A1 U19–U21. A1 U22–U24 ya pasó. Pendiente nuevo CI del head final.


## 2026-11-23 — PR #756 fusionada y A2 U13–U15 en preparación
- PR #756 se fusionó por squash en `main`, commit `9efda040e24d439247ba60e06e035b911e49721e`. CI final run #45241897883 en head `855fe44d4ebda94992e2e27322bc5483572c44ea`: `test` 101/101 pasos y `Offline quality reports` 10/10 pasos, ambos success. Playwright E2E offline y assessment browser tests pasaron.
- Estado tras merge: A1 24/24; A2 12/30; B1 0/36; B2 0/40. `pt-BR available:false`; caché SW `bahasa-studio-v3.8.134`; sin cambios en IndexedDB v1 ni backup JSON v3.
- Nueva rama `feat/pt-br-a2-u13-u15` parte del merge commit. U13 finanzas personales y servicios bancarios; U14 búsqueda de empleo y condiciones laborales; U15 trámites y servicios públicos. 30 términos nuevos sin colisiones exactas detectadas frente a 360 entradas previas A1/A2; todos `not_checked`. Cada unidad tiene 5 lecciones y 10 ejercicios MC, con referencias de repaso a A2 previo.
- Se amplía manifiesto a U1–U15, caché a `bahasa-studio-v3.8.135` y precarga `units-13-15.js`; tests de manifiesto y Playwright se amplían para 15 unidades. Sin nuevas dependencias, backend, audio/TTS ni cambios de persistencia. Pendiente PR y CI del bloque.

- PR #757 abierta: https://github.com/luisequeira612-commits/bahasa-studio/pull/757. Head inicial `7e3ec6a7a9de87c7c778d1c8810d506d2092bb6a`, 13 archivos, +203/-24. Pendiente CI completo sobre el head final; no fusionar antes de ambos jobs success.


## 2026-11-23 — corrección CI PR #757: harness offline A2 incompletos
- El CI del head `1fc43d93f4532da8ec888d291ff41a873c748e66`, run [#45243502516](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45243502516), completó `Offline quality reports` en success, pero `Run local quality tests` falló en dos tests de referencias de repaso: `pt-br-curriculum-a2-u07-u09.test.cjs` y `pt-br-curriculum-a2-u13-u15.test.cjs`. El resto de la suite de calidad reportó 213/215 pruebas superadas.
- Causa: al ampliar el manifiesto a U1–U15, los harness simulados no registraban todos los archivos que el loader intentaba importar. El test U7–U9 no incluía U13–U15; el test U13–U15 omitía U10–U12 y repetía la entrada U13–U15. No era un fallo de referencias léxicas del currículo.
- Corrección en commits `a168942171b3e366219175ba197f202ab23f4581` y `eb46ff0fa5bdf1e015e444c0c3fc70cdc479712c`: completar los mapas de archivos en ambos harness para que cubran los bloques U1–U15. Se mantienen las aserciones de resolución de repaso y no se modifica contenido de vocabulario, manifiesto, disponibilidad ni persistencia.
- Repetir CI completo sobre el nuevo head; no fusionar hasta que `test` y `Offline quality reports` estén en success.

Fuente: logs del job `test` de GitHub Actions run #45243502516 y commits de `feat/pt-br-a2-u13-u15`; 23 nov 2026.


## 2026-11-23 — corrección CI PR #758: harness A2 incompletos
- El run #45249391579 completó `Offline quality reports`, pero `Run local quality tests` falló en los tests de repaso de A2 U7–U9, U10–U12 y U13–U15. Los tres harness simulaban la carga offline sin registrar el bloque `units-16-18.js`, ahora incluido en el manifiesto A2 U1–U18.
- Se añadieron las fuentes del bloque U16–U18 a los mapas de los tres harness en commits `f2a72d4cdfced2e5ddec126b4ef21acba9db9a75`, `2d002f52276e40b938eb7b35317e9848e816a39c` y `47f45986908d4d209bfae971f7de772e0ebf7353`. No se cambia el currículo ni el comportamiento de la aplicación.
- Repetir CI completo en el nuevo head; no fusionar hasta que ambos jobs estén en success.

Fuente: logs de GitHub Actions run #45249391579 y commits de `feat/pt-br-a2-u16-u18-main`; 23 nov 2026.


## 2026-11-23 — A2 U19–U21: implementación e integración en curso
- Tras fusionar PR #758 en `main` (commit `3188230cf925bd9da413dc8b8492f4fd7b2c06e2`), se creó la rama limpia `feat/pt-br-a2-u19-u21`.
- Se añadió `languages/pt-BR/curriculum/a2/units-19-21.js`: U19 vivienda y alquiler; U20 convivencia y resolución de conflictos; U21 derechos del consumidor. Son 30 entradas nuevas (10 por unidad), todas `not_checked`, cinco lecciones y diez ejercicios MC por unidad.
- Los 30 términos nuevos se cotejaron contra 240 registros A1 y 180 registros A2 existentes (420 anteriores); no se detectaron duplicados exactos tras normalizar mayúsculas, acentos y espacios. Los IDs nuevos usan `ptbr_a2_u19_v01..v10`, U20 y U21 en el mismo esquema.
- El manifiesto A2 publica U1–U21 de 30. Service Worker avanza a `bahasa-studio-v3.8.137` y precarga `units-19-21.js`. Se añade contrato Node para carga offline, estructura, respuestas MC, referencias de repaso y duplicados; `quality:tests` lo incluye. Playwright E2E amplía caché y carga offline A2 hasta U21. Contratos A2 previos y pruebas A1 dependientes de la versión de caché se alinean a v3.8.137.
- La rama aún está en implementación y no hay PR abierta. Ejecutar CI completo sobre el head final antes de abrir/mergear. Mantener `pt-BR available:false`; no modificar IndexedDB v1 ni backup JSON v3, no añadir backend, dependencias ni audio/TTS.
- Estado después de #758: A1 24/24, A2 21/30 en esta rama (18/30 integradas en `main` hasta que se fusione este bloque), B1 0/36, B2 0/40. Coherencia y controles internos no son certificación lingüística nativa.

Fuente: GitHub `main` commit #758, rama `feat/pt-br-a2-u19-u21`, archivos curriculares y contratos Node/Playwright; 23 nov 2026.


## 2026-11-23 — corrección de CI PR #759: harness de repaso A2
- Primer run de PR [#759](https://github.com/luisequeira612-commits/bahasa-studio/pull/759), Actions [#45255051684](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45255051684): `Offline quality reports` success; `Run local quality tests` falló únicamente en cuatro contratos de repaso A2 U7–U9, U10–U12, U13–U15 y U16–U18.
- La causa fue que esos cuatro harness cargan el currículo completo hasta U21 para verificar referencias retrospectivas, pero sus mapas de fuentes simuladas terminaban en U16–U18. Se añadieron `units-19-21.js` a cada mapa; no se alteraron ni relajaron aserciones ni contenido curricular.
- Repetir CI sobre el nuevo head. No fusionar hasta que `test` y `Offline quality reports` estén ambos en success.

Fuente: logs del job `test` de Actions run #45255051684 y commits correctivos en `feat/pt-br-a2-u19-u21`; 23 nov 2026.


## 2026-11-23 — Portugués A2 U22–U24 en preparación
- Rama `feat/pt-br-a2-u22-u24` creada desde `main` tras integrar PR #759 (`45a31b013c69acdf3fd6f2da2bd76d6972cbc32c`).
- U22 ciudadanía y participación comunitaria; U23 agricultura y producción de alimentos; U24 ciencia e investigación. El bloque añade 30 términos con `not_checked`, cinco lecciones y diez ejercicios MC por unidad, y referencias de repaso a vocabulario A2 previo.
- Cotejo inicial de términos nuevos contra las 210 entradas explícitas A2 ya integradas: no se observan coincidencias exactas normalizadas en las 30 entradas añadidas. La prueba automatizada también coteja A1 y A2 completo.
- Pendiente completar manifiesto A2 U1–U24, caché offline `v3.8.138`, contratos Node/Playwright y CI. Mantener `pt-BR available:false`, sin cambios a IndexedDB v1/backup JSON v3, sin backend, dependencias ni audio/TTS.

Fuente: GitHub `main` commit `45a31b0`, rama `feat/pt-br-a2-u22-u24`, bloque `units-22-24.js`; 23 nov 2026.


## 2026-11-23 — PR #761 fusionada: Portugués A2 U25–U27
- Tras integrar PR #760 (`b8d86150df1da0934b2b828ced115e7a676b64fc`) y verificar la regresión post-merge #45259801554 en success, se creó la rama limpia `feat/pt-br-a2-u25-u27` desde `main`.
- U25 condimentos y técnicas de cocina; U26 emociones matizadas y vínculos personales; U27 fenómenos naturales y gestión de riesgos. Se añaden 30 términos con `not_checked`, cinco lecciones y diez ejercicios MC por unidad, con ejemplos bilingües y referencias de repaso a A1/A2 previo.
- Cotejo de diseño inicial: términos elegidos no repiten los lemas explícitos de A1/A2 inspeccionados; se incluye contrato automático de duplicados exactos normalizados contra A1 y A2.
- PR [#761](https://github.com/luisequeira612-commits/bahasa-studio/pull/761) fusionada por squash en `main`, commit `5e4da2e9af702f15a5bd3081c37ed73a3d3906a5`, tras CI PR #45261891289 y regresión post-merge #45262451262 en success. El manifiesto publica U1–U27 y caché offline `v3.8.139`; Playwright amplía carga offline hasta U27. Mantener `pt-BR available:false`; no modificar IndexedDB v1 ni backup JSON v3, no añadir backend, dependencias ni audio/TTS.
- Primer CI del head inicial, Actions #45261291545, encontró fallos de contratos heredados que aún esperaban el regex literal de caché `v3.8.138`, más dos defectos de la prueba/contenido nuevo: la lección de sequía agrupaba `abrigo` sin explicarlo y U25 usaba referencias A1 mientras el nuevo contrato exigía referencias A2. Se corrigieron las expectativas de caché en los contratos A1/A2, se reorganizó U27 para agrupar `tempestade` con `seca` y `deslizamento` con `desabamento`, y U25 ahora repasa IDs A2 previos. No se relajaron aserciones. CI final del head `f19e5c60` (#45261891289) y regresión post-merge de `main` (#45262451262) terminaron en success; Pages deploy (#45262450731) también terminó en success.

Fuente: GitHub PR #761, merge commit `5e4da2e9`, rama `feat/pt-br-a2-u25-u27`, bloque `units-25-27.js`; 23 nov 2026.


## 2026-11-23 — PR #762 abierta: Portugués A2 U28–U30
- Rama limpia `feat/pt-br-a2-u28-u30` creada desde `main` tras integrar PR #761 (`5e4da2e9af702f15a5bd3081c37ed73a3d3906a5`).
- U28 dispositivos y recursos digitales; U29 atención al público y servicios; U30 planificación y trabajo en equipo. Se añaden 30 términos `not_checked`, cinco lecciones y diez ejercicios MC por unidad, con ejemplos PT/ES y referencias de repaso a vocabulario A2 anterior.
- PR [#762](https://github.com/luisequeira612-commits/bahasa-studio/pull/762) abierta desde `feat/pt-br-a2-u28-u30`, base `main` en `5e4da2e9af702f15a5bd3081c37ed73a3d3906a5`, head `60efe33eb0e59f8d2e6e0848bf806a20153b3db3`; CI pendiente. El manifiesto publica U1–U30, caché offline `v3.8.140`, contratos Node/Playwright amplían la carga offline a A2 completo. Mantener `pt-BR available:false`; sin cambios a IndexedDB v1/backup JSON v3, sin backend, dependencias ni audio/TTS.

Fuente: GitHub `main` commit `5e4da2e9`, rama `feat/pt-br-a2-u28-u30`, bloque `units-28-30.js`; 23 nov 2026.


## 2026-11-23 — Correcciones de CI PR #766 (B1 U10–U12)
- El CI inicial del head `194a999f7bf19b4381f8c1f59bb4c57e1c6db81f`, run [#45291825327](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45291825327), completó el job `test` con fallo en `Run local quality tests`; `Offline quality reports` pasó. Los dos fallos del contrato nuevo fueron: orden de cobertura de vocabulario comparado como secuencia pese a que las lecciones están organizadas temáticamente, y duplicación exacta normalizada de `cidadania` contra A2 U22.
- Correcciones aplicadas en la misma rama: la prueba compara la cobertura de los diez IDs como conjunto ordenado, conservando la exigencia de que cada término aparezca exactamente una vez; el término repetido de B1 U11 se sustituyó por `responsabilidade cívica` (responsabilidad cívica). No se relajó la auditoría de duplicados.
- Commits de corrección: `174c6d0bb02bfb7d22bb79220010eaa5073849b2` (vocabulario) y `a47a1fa5d2a25092f9f3691c8fdaaf778848b6a7` (contrato). Pendiente confirmar head final y ejecutar CI completo antes de fusionar.

Fuente: GitHub PR #766, Actions run #45291825327 y auditoría de vocabulario A1/A2/B1; 23 nov 2026.


## 2026-11-24 — Segundo fallo de CI PR #766 y corrección editorial
- La ejecución #45294895224 aprobó `Offline quality reports` y los contratos de vocabulario A1/A2, pero falló el paso `Run local quality tests`. El endpoint de logs de ese job devolvió 404, por lo que el diagnóstico se hizo contrastando el contrato nuevo con el contenido curricular.
- Causa localizada: tras reemplazar el término duplicado de B1 U11 por `responsabilidade cívica`, la gramática de la lección 1 todavía decía `A cidadania reúne...`; el contrato exige que cada lección explique literalmente sus dos términos asignados.
- Corrección aplicada en `languages/pt-BR/curriculum/b1/units-10-12.js`: la explicación ahora comienza `A responsabilidade cívica reúne direitos e deveres...`. Commit: `5cfe630b5d3ad918d908bf5de7b76386d7c15942`. Pendiente CI nuevo; no fusionar hasta ambos jobs success.

Fuente: GitHub Actions #45294895224, contrato `tests/pt-br-curriculum-b1-u10-u12.test.cjs`, revisión de `units-10-12.js); 24 nov 2026.


## 2026-11-24 — Tercer fallo de CI PR #766 y corrección de U11
- La ejecución #45295594548 terminó con `Offline quality reports` en success y `test` en failure, dentro de `Run local quality tests`. El log ya estuvo disponible y aisló un único fallo en `tests/pt-br-curriculum-b1-u10-u12.test.cjs`: U11, Lección 3 (`Recursos y prioridades`) no explicaba literalmente `interesse coletivo`.
- La lección asigna los términos `orçamento público` e `interesse coletivo`, pero su explicación solo mencionaba la distribución de recursos y la revisión de prioridades. Se completó la frase: `prioridades podem ser revistas para atender ao interesse coletivo`, sin eliminar ni debilitar la aserción.
- Corrección en `languages/pt-BR/curriculum/b1/units-10-12.js`, commit `c7932ef1c3ce565639c28bf2d1958d5091e56a9e` en `feat/pt-br-b1-u10-u12`. Pendiente verificar nuevo CI del head actualizado; PR #766 permanece sin fusionar hasta que todos los jobs requeridos terminen en success.

Fuente: GitHub Actions run #45295594548 y log del job `test`; contrato `tests/pt-br-curriculum-b1-u10-u12.test.cjs`; 24 nov 2026.


## 2026-11-23 — Cuarto fallo de CI PR #766 y corrección de cobertura U12
- El CI del head `e29dfa847a4407f90972ac952f147380536b776b`, run [#45296584115](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45296584115), aprobó `Offline quality reports` pero falló una sola prueba en `Run local quality tests` (258/259): B1 U12 repetía `ptbr_b1_u12_v02` en las lecciones 1 y 2 y omitía `ptbr_b1_u12_v06`.
- Se corrigió la distribución temática sin relajar el contrato: Lección 2 ahora cubre `efeito estufa` y `matriz energética` (v03/v04); Lección 3 cubre `energia renovável` y `transição energética` (v05/v06). También se amplían las explicaciones para definir explícitamente ambos términos asignados.
- Cambio en `languages/pt-BR/curriculum/b1/units-10-12.js`. Pendiente actualizar este registro en el head nuevo, ejecutar CI completo y verificar los dos jobs antes de fusionar.

Fuente: GitHub Actions #45296584115, log del job `test` y contrato `tests/pt-br-curriculum-b1-u10-u12.test.cjs`; 23 nov 2026.


### PR #767 — corrección de contratos heredados (2026-11-24)
- CI inicial #45300758316: `Offline quality reports` pasó; `test` falló en `quality:local` con 20 fallos de pruebas heredadas.
- Diagnóstico: 16 pruebas antiguas tenían expectativas fijas para `bahasa-studio-v3.8.144`; el SW de la rama usa correctamente `v3.8.145`. Cuatro pruebas B1 además esperaban el manifiesto solo hasta U9/U12, pese a la ampliación U1–U15.
- Se actualizan las expectativas de caché A1/A2/B1 y las cuatro pruebas B1 para reflejar U1–U15. Sin cambios de runtime ni de datos curriculares.
- Head actual en proceso de corrección; no fusionar hasta que CI completo pase sobre el head final.


## 2026-11-24 — Portugués B1 U16–U18 en preparación
- Tras el merge de PR #767, la regresión post-merge de `main` #45301700314 terminó con `test` y `Offline quality reports` en success; Pages #45301698987 completó `build`, `deploy` y `report-build-status` en success. `main` verificado en `63a84ec51507e2ce6b04ebbdd109ae4c002c6a6a`.
- Rama `feat/pt-br-b1-u16-u18` creada desde ese `main`. Se incorpora U16 salud pública y prevención; U17 consumo sostenible y economía circular; U18 vivienda y desarrollo urbano.
- Bloque de 30 términos (10 por unidad), cinco lecciones por unidad y diez ejercicios MC por unidad, ejemplos PT/ES, dos términos explicados por lección y referencias de repaso a A2. Todos los términos permanecen `not_checked`; esto no es certificación lingüística.
- Se amplían manifiesto B1 a U1–U18/36, precache offline a `units-16-18.js`, cache key `bahasa-studio-v3.8.146`, contratos incrementales y E2E Playwright. `pt-BR available:false` permanece.
- Auditoría de duplicados y ejecución de CI pendientes. No fusionar hasta que las pruebas y auditorías pasen en el head definitivo. Sin dependencias nuevas, backend, audio/TTS, cambios de IndexedDB v1 ni backup JSON v3.

Fuente: rama `feat/pt-br-b1-u16-u18`, archivos curriculares, manifiesto, Service Worker y contratos; 24 nov 2026.


## 2026-11-24 — Corrección CI Portugués B1 U16–U18
- El primer CI de PR #768 detectó que el manifiesto B1 añadía el bloque U16–U18 pero no incluía los números 16–18 en `publishedUnits`; por eso el loader rechazaba el contenido aunque el bloque existía. Se corrige la lista publicada a U1–U18 manteniendo el nivel completo no disponible.
- Se actualizan contratos de manifiesto/caché de las pruebas heredadas para reflejar la publicación incremental y `bahasa-studio-v3.8.146`. La auditoría offline pasó; la nueva ejecución de CI debe confirmar las correcciones.
- Fuente: CI #45303458470, PR #768, diagnóstico de tests y manifiesto; 24 nov 2026.


## 2026-11-24 — Segunda corrección CI Portugués B1 U16–U18
- CI #45304701798: la auditoría offline pasó, pero fallaron 13 pruebas en el job `test`.
- Diez contratos históricos de precache A2 y el contrato U22–U24 todavía afirmaban versiones antiguas de caché; se alinearon con `bahasa-studio-v3.8.146`, sin cambiar el Service Worker.
- El contrato de vocabulario detectó duplicados exactos en B1 U17: `coleta seletiva` y `energia renovável` ya estaban en A2. Se sustituyeron por `triagem de recicláveis` y `fontes de energia limpa`, y se actualizaron sus traducciones y explicaciones en los ejemplos/lecciones.
- La prueba E2E y el contrato U22–U24 también fallaron en esa ejecución; la causa debe confirmarse con el siguiente CI después de los cambios de caché. No se considera resuelto hasta que el job completo pase.
- PR #768 permanece abierto y sin fusionar; no iniciar U19–U21 hasta que el head final pase CI y, tras fusionar, la regresión post-merge y Pages.

Fuente: GitHub Actions run #45304701798, job `test`, archivos de pruebas A2/U22–U24 y `languages/pt-BR/curriculum/b1/units-16-18.js`; 24 nov 2026.

- Diagnóstico adicional del E2E: el test esperaba B1 U1–U18, pero todavía llamaba al loader con U1–U15. Se amplió la llamada a U1–U18; el Service Worker ya incluía el bloque U16–U18 y el manifiesto lo publicaba.
- También se actualizó el contrato histórico de precache U22–U24 a la caché v3.8.146. La siguiente ejecución debe verificar estos cambios y la corrección de términos U17.

- La ejecución #45309751749 redujo los fallos a una sola prueba: el test U22–U24 conservaba una expresión regular literal con `3.8.145` (sin puntos escapados), por lo que el reemplazo previo no la había actualizado. Se corrigió explícitamente a `3.8.146`; las 237 pruebas restantes pasaron y la auditoría offline también.


## 2026-11-24 — Portugués B1 U19–U21 en preparación
- Tras fusionar PR #768, la regresión post-merge de `main` #45312227091 terminó con `test` y `Offline quality reports` en success; el trabajo `test` completó 100 pasos correctos y cero fallos. Pages #45312226119 completó build, deploy y report-build-status en success. `main` verificado en `c6d772bdb2001ee60777780610cd712a94734ce6`.
- Rama `feat/pt-br-b1-u19-u21` creada desde ese commit. U19 envejecimiento y cambios demográficos; U20 agricultura familiar y seguridad alimentaria; U21 turismo responsable y economías locales.
- Bloque nuevo: 30 términos (10 por unidad), cinco lecciones por unidad, diez ejercicios MC finales por unidad y dos términos explicados por lección; 15 referencias de repaso a vocabulario A2. Ejemplos en PT-BR y español. Los términos mantienen `verification.status: not_checked`; las comprobaciones estructurales no certifican naturalidad ni corrección lingüística.
- Manifiesto B1 publica U1–U21 de 36 (21/36, 58,3 %); se añade `units-19-21.js` al precache y se incrementa la caché del app shell a `bahasa-studio-v3.8.147`. Se incorpora contrato Node específico U19–U21, se integra en `quality:tests`, se actualiza Playwright para cargar U1–U21 sin conexión y se alinean contratos B1 históricos con el manifiesto actual.
- `pt-BR available:false` se mantiene. Sin dependencias nuevas, backend, audio/TTS, cambios de IndexedDB v1 ni backup JSON v3. CI de la nueva rama aún pendiente de abrir/ejecutar; no fusionar hasta que el CI completo pase y después confirmar regresión post-merge y Pages.
 
Fuente: rama `feat/pt-br-b1-u19-u21`, archivos curriculares/manifiesto/Service Worker/tests, PR #768 y Actions #45312227091/#45312226119; 24 nov 2026.


## 2026-11-24 — Corrección CI PR #769: contratos de caché y duplicado léxico
- El primer CI de PR #769, run #45314054499, pasó `Offline quality reports` pero falló `Run local quality tests`. El log identificó expectativas heredadas A2/B1 que aún exigían la caché v3.8.146 (y títulos v3.8.144), aunque el Service Worker de la rama usa v3.8.147.
- Se actualizaron las expectativas afectadas a v3.8.147, manteniendo las aserciones de precache. El mismo run detectó una colisión normalizada de `assistência técnica` con el vocabulario A2; se reemplaza por `orientação agronômica` y se actualizan traducción y explicación de la lección correspondiente.
- La PR permanece abierta y no fusionada hasta ejecutar CI completo sobre el head corregido. No cambiar disponibilidad del curso ni contratos de persistencia.

Fuente: GitHub Actions run #45314054499, job test, PR #769 y archivos de contratos/currículo; 24 nov 2026.


## 2026-11-24 — Portugués B1 U22–U24 en preparación
- PR [#770](https://github.com/luisequeira612-commits/bahasa-studio/pull/770) abierta desde `feat/pt-br-b1-u22-u24`; head inicial `c0092b98c378d1a2710daf5905ba4add77d960fe`. CI pendiente sobre el head actual.
- Tras fusionar PR #769, `main` quedó en `79c10046626ef48f21696dd29f4ecc7ce32a7a9a`. La regresión post-merge #45318720549 terminó con `test` 101/101 y `Offline quality reports` 10/10 en success; Pages #45318719535 completó build, deploy y report-build-status en success.
- Rama `feat/pt-br-b1-u22-u24` creada desde ese `main`. U22 inclusión digital y servicios públicos; U23 preparación ante emergencias; U24 seguridad y prevención en el trabajo.
- Bloque nuevo: 30 términos (10 por unidad), cinco lecciones por unidad, diez ejercicios MC finales por unidad y 15 referencias de repaso A2. Ejemplos PT-BR/ES; cada término conserva `verification.status: not_checked`. La auditoría de duplicados compara A1, A2 y B1 U1–U21; no se marca ninguna entrada como validada lingüísticamente.
- Se amplía el manifiesto B1 a U1–U24 de 36 (24/36; 66,7 %), se añade `units-22-24.js` al precache y se incrementa la caché de app shell a `bahasa-studio-v3.8.148`. Se añade contrato Node dedicado y se amplía la prueba E2E offline a B1 U1–U24. CI de esta rama pendiente; no fusionar hasta que todos los checks pasen y después verificar regresión post-merge y Pages.
- `pt-BR available:false` permanece. Sin dependencias nuevas, backend, audio/TTS, cambios de IndexedDB v1 ni backup JSON v3.

Fuente: main commit `79c1004`, PR #769, Actions #45318720549/#45318719535 y rama `feat/pt-br-b1-u22-u24`; 24 nov 2026.

## 2026-11-24 — Portugués brasileño B1 U25–U27 en preparación
- La PR #770 ya está fusionada en `main`, commit `0ac3929c5d6fb7967c2b0f19a45c573532087b75`. CI del head #45320928433: tests 101/101 y calidad offline 10/10; regresión post-merge #45321237709: tests 101/101 y calidad offline 10/10; Pages #45321237255: build, informe y deploy en success.
- Rama `feat/pt-br-b1-u25-u27` creada desde ese main validado. Bloque nuevo: U25 transición energética y sostenibilidad; U26 salud pública y prevención comunitaria; U27 movilidad urbana y vivienda.
- Cada unidad contiene 10 términos, cinco lecciones, dos términos explicados por lección, dos ejercicios por lección y 10 ejercicios MC de unidad. Se agregan 30 términos con ejemplos PT-BR y traducción ES; referencias de repaso apuntan a vocabulario A2 existente. Se conserva `verification.status: not_checked`: las pruebas estructurales no equivalen a validación lingüística.
- Manifiesto B1 se amplía a U1–U27 de 36 (27/36; 75 %). Service Worker pasa a `bahasa-studio-v3.8.149` y precarga `units-25-27.js`. Se añade contrato Node dedicado, se registra en `quality:tests`, se amplía Playwright a carga offline B1 U1–U27 y se alinean aserciones históricas de caché.
- `pt-BR available:false` se mantiene. Sin dependencias nuevas, backend, audio/TTS, cambios de IndexedDB v1 ni backup JSON v3. La PR debe pasar todo el CI; tras el merge se exigirá regresión post-merge y Pages antes de iniciar U28–U30.

Fuente: PR #770, commit `0ac3929`, Actions #45320928433/#45321237709/#45321237255; rama `feat/pt-br-b1-u25-u27` y cambios curriculares/tests; 24 nov 2026.


## 2026-11-24 — Correcciones del primer CI de PR #771
- El primer run #45325730097 pasó los informes de calidad (10/10), pero detectó expectativas heredadas de manifiesto U1–U24 en contratos de B1 U7–U24; se actualizaron a U1–U27 para reflejar el manifiesto real, manteniendo `available:false`.
- El contrato U25–U27 detectó 11 términos normalizados repetidos frente a A1/A2. Se sustituyeron por vocabulario más específico (descarbonização, matriz de geração, geração distribuída, intensidade energética, resiliência climática, logística reversa, atenção ambulatorial, tratamento de efluentes, transporte intermodal, desenho universal y zoneamento urbano) y se ajustaron ejemplos/traducciones. También se explicitó en la lección U26 la expresión `surto localizado`.
- El CI de la PR debe volver a ejecutarse y pasar íntegramente antes de fusionar; no se declara validación lingüística (los términos siguen `not_checked`).

Fuente: GitHub Actions #45325730097, job test; PR #771, tests B1 U7–U27 y `units-25-27.js`; 24 nov 2026.


## 2026-11-24 — Corrección de CI PR #771: vocabulario B1 U25–U27

- La primera regresión del head corregido (#45326693589) completó los informes de calidad (10/10) pero falló un contrato de duplicados normalizados: detectó colisiones exactas en «logística reversa» y «zoneamento urbano» frente al currículo A1/A2/B1 previo.
- Se sustituyeron por «reaproveitamento pós-consumo» y «ordenamento territorial municipal», respectivamente, y se ajustó la explicación de la lección correspondiente para conservar cobertura explícita del término.
- Commit correctivo: e3a9db12ef2c58ae6c23a58eaa7630b554dba9e8 en feat/pt-br-b1-u25-u27. Repetir CI completo sobre este head; no fusionar hasta que regresión y calidad estén en success.
- Las expectativas históricas A2 se alinearon con caché v3.8.149; B1 U1–U6 ahora esperan manifiesto U1–U27. No se cambia la disponibilidad pt-BR, IndexedDB v1 ni backup JSON v3.

Fuente: GitHub Actions run #45326693589 y commit e3a9db12ef2c58ae6c23a58eaa7630b554dba9e8; 24 nov 2026.

### Corrección adicional de CI — PR #771
- La ejecución #45327148126 detectó que la lección 5 de U25 no repetía literalmente el término `reaproveitamento pós-consumo` en su explicación.
- Se ajustó el texto de la lección para explicar el término de forma explícita, sin cambiar vocabulario, IDs, estructura curricular ni disponibilidad del curso.
- Commit: `a81280f834a5e6267ff49f4f60c75fcecaf22667`. Nueva CI pendiente; PR #771 continúa sin fusionar.


## 2026-11-24 — Corrección de guardas CI PR #773 para B1 U28–U30
- La PR #772 añadió B1 U28–U30 y avanzó el Service Worker a `bahasa-studio-v3.8.150`, pero el primer CI (#45330309615) falló por expectativas heredadas que todavía comprobaban U1–U27 y `v3.8.149`.
- La PR #773, rama `fix/pt-br-b1-u28-u30-ci-guards`, actualiza nueve contratos heredados para esperar U1–U30 y `v3.8.150`. No cambia contenido curricular ni lógica de runtime.
- Head de #773: `42d75591a3c40ad96d4f3143c5587029df65dba3`. CI #45334239766 está en ejecución: `Offline quality reports` ya está en success; el job `test` está instalando Chromium y aún no ha llegado a los contratos.
- PR #773 queda pendiente de CI completo antes de fusionarse en la rama de #772. Después se debe repetir CI de #772 sobre el head actualizado, fusionar solo con todos los checks requeridos en success y verificar regresión post-merge + GitHub Pages.
- `pt-BR available:false`, `verification.status: not_checked`, IndexedDB v1 y backup JSON v3 permanecen sin cambios.

Fuente: PR #772/#773 y GitHub Actions #45330309615/#45334239766; 24 nov 2026.


## 2026-11-24 — Segundo diagnóstico y correcciones CI PR #773
- El CI #45334713127 ya terminó: `Offline quality reports` pasó, pero `Run local quality tests` falló con 20 de 289 pruebas.
- Diez contratos A2 y dos contratos A1 seguían esperando caché `v3.8.149`; se alinearon con `v3.8.150`. Siete contratos B1 todavía enumeraban U1–U27 en el manifiesto; se actualizaron para U1–U30. Se mantienen las comprobaciones exactas y `pt-BR available:false`.
- La auditoría de duplicados encontró cuatro colisiones reales en el vocabulario nuevo: `desinformação`, `fonte primária`, `alfabetização midiática` e `impasse`. Se sustituyeron por `notícia manipulada`, `fonte independente`, `competência informacional` y `proposta conciliatória`, con traducciones y explicaciones correspondientes. No se relajó el contrato de duplicados.
- Cambios aplicados en la rama `fix/pt-br-b1-u28-u30-ci-guards`; head actual `175e8afb095d00111b6e2abb6253091e95c0a7bf`. CI nuevo del head final pendiente. PR #773 no se fusiona hasta que todos los checks requeridos estén en success; después se repite CI de #772 y se exige regresión post-merge + Pages.
- Los términos siguen `verification.status: not_checked`; las pruebas estructurales no certifican naturalidad ni corrección lingüística. No se modifican IndexedDB v1 ni backup JSON v3.

Fuente: GitHub Actions #45334713127, logs del job `test`, PR #773 y archivos de contratos/currículo; 24 nov 2026.


## 2026-11-24 — Ajuste del contrato didáctico B1 U29 en PR #773
- El CI #45337705294 completó Chromium y todas las pruebas generales, pero `quality:tests` falló en un único contrato: U29, lección 4 no explicaba explícitamente `concessão mútua` aunque el término estaba en el vocabulario de la unidad.
- Se corrigió el texto de la lección para definir la concesión mutua como ajuste recíproco de exigencias, manteniendo el ejemplo condicional y sin cambiar IDs, términos, ejercicios, estructura, disponibilidad ni verificación lingüística.
- Actualización aplicada a `languages/pt-BR/curriculum/b1/units-28-30.js` en PR #773; commit cbb2f8607f52667884b0975dbc7471b1b672caf8. Repetir CI completo antes de cualquier merge.
- Fuente: GitHub Actions #45337705294, fallo `tests/pt-br-curriculum-b1-u28-u30.test.cjs:41`; 24 nov 2026.


## 2026-11-24 — PR #773 fusionada y CI corregido para B1 U28–U30
- PR #773 se fusionó mediante squash en la rama de integración `feat/pt-br-b1-u28-u30`, commit `6b595ec64963eeed712cb160040da438e7131944`.
- CI final del head `1b177afafff35460b1837a7af23889a170b9658c`, run #45338392893: job `test` completó todos sus pasos con success, incluidos Chromium, `quality:tests` y E2E real; `Offline quality reports` también terminó en success.
- La corrección final añadió a U29 lección 4 una explicación explícita de `concessão mútua`, tras el único fallo de contrato en la ejecución anterior. Se conservaron los contratos estrictos.
- La PR #772 debe ejecutar CI completo sobre la rama actualizada antes de fusionarse. Después exigir regresión post-merge y GitHub Pages.
- `pt-BR available:false`; los términos nuevos siguen `verification.status: not_checked`. IndexedDB v1 y backup JSON v3 sin cambios.

Fuente: PR #773, commit squash `6b595ec`, GitHub Actions #45338392893; 24 nov 2026.


## 2026-11-24 — Preparación B1 U31–U33
- Se abrió la rama `feat/pt-br-b1-u31-u33` desde el commit validado `6d96ec994c4b4a4a2489fe54f287b727615281ec`.
- Se añadió el bloque curricular `units-31-33.js`: investigación e innovación pública, producción alimentaria y agroecología, y privacidad y gobernanza digital. Incluye 30 términos, 15 lecciones, 30 ejercicios de opción múltiple y referencias de repaso A2.
- Los términos nuevos conservan `verification.status: not_checked`; el curso pt-BR sigue `available:false`. El manifiesto avanza a U1–U33/36 y el Service Worker a `bahasa-studio-v3.8.151`, precargando `units-31-33.js`.
- Se amplían el contrato estructural de U31–U33 y la prueba Playwright offline para cargar B1 U1–U33. Sin cambios a IndexedDB v1, backup JSON v3 ni dependencias.
- Pendiente: ejecutar auditoría local/CI, resolver cualquier duplicado léxico detectado por contrato, abrir PR y validar regresión post-merge + Pages antes de U34–U36.
- Fuente: rama `feat/pt-br-b1-u31-u33`, commit curricular `f2426aa91bd046c51dabe9061267826fae9b8923`; 24 nov 2026.


## 2026-11-24 — Preparación B1 U34–U36
- Se creó la rama `feat/pt-br-b1-u34-u36` desde `main` validado tras PR #774, con las tres últimas unidades del B1: U34 adaptación climática y resiliencia territorial; U35 trabajo, emprendimiento y responsabilidad empresarial; U36 patrimonio, cultura y acceso al conocimiento.
- Bloque nuevo: 30 términos (10 por unidad), cinco lecciones por unidad, dos términos explicados por lección, ejercicios MC y referencias de repaso a A2. Los términos mantienen `verification.status: not_checked`; `pt-BR available:false` permanece.
- Se amplía el manifiesto B1 a U1–U36/36, se añade `units-34-36.js` al Service Worker y se incrementa la caché de app shell a `bahasa-studio-v3.8.152`. Se amplían el contrato Node y la prueba Playwright offline para cubrir U1–U36.
- No se modifican IndexedDB v1 ni backup JSON v3, no se añaden dependencias ni backend. Las comprobaciones estructurales no equivalen a certificación lingüística.
- Tras completar CI, la PR debe fusionarse solo con todos los checks en success y después verificarse regresión de `main` y GitHub Pages. Si ambas pasan, B1 queda completo en contenido (36/36), pero pt-BR sigue sin publicarse hasta superar la validación de calidad correspondiente.

Fuente: rama `feat/pt-br-b1-u34-u36`, commit curricular `116f765eb66a87d66312bdb148db3073c0f8f44a`; 24 nov 2026.

## 2026-11-24 — Portugués brasileño B1 completado y cierre post-merge

- PR [#775](https://github.com/luisequeira612-commits/bahasa-studio/pull/775) fusionada mediante squash en `main`; commit integrado `7ae44e6b25e327d835ee1a5a65df968c4b910ad4`.
- El bloque U34–U36 completa B1 pt-BR: 36/36 unidades. U34 adaptación climática y resiliencia territorial; U35 trabajo, emprendimiento y responsabilidad empresarial; U36 patrimonio, cultura y acceso al conocimiento.
- CI del head de PR #775, run [#45447210438](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45447210438): `test` y `Offline quality reports` terminaron en success.
- Regresión post-merge de `main`, run [#45448852637](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45448852637): `test` y `Offline quality reports` en success. El job de pruebas registró 289/289 pruebas aprobadas, incluidas las comprobaciones de manifiesto B1 U1–U36 y carga offline de A1/A2/B1.
- GitHub Pages, run [#45448851006](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45448851006): build, report-build-status y deploy completados en success.
- Se mantiene `pt-BR available:false`; B1 completado en contenido no equivale a publicar el idioma ni a certificar nivel MCER/BIPA. Los términos nuevos permanecen `verification.status: not_checked`; las pruebas estructurales no certifican naturalidad ni exactitud lingüística.
- Sin cambios a IndexedDB v1, backup JSON v3 ni dependencias.
- Próxima fase curricular aprobada para pt-BR: B2, con 40 unidades según la decisión registrada en Notion. En el repositorio no existe aún `languages/pt-BR/curriculum/b2/`; antes de implementar datos se debe preparar un mapa temático propio de pt-BR y distinguirlo del currículo B2 indonesio existente (60 unidades), que tiene otra hoja de ruta y reglas específicas.

Fuente: PR #775, commits de `main`, GitHub Actions #45447210438, #45448852637 y #45448851006; decisión curricular pt-BR registrada en Notion; 24 nov 2026.


## 2026-11-24 — Test E2E alineado con el nombre accesible multilingüe (PR #782)

- CI #45480612260: `Offline quality reports` success; regresión falló únicamente en el E2E `priority 3 adds written sentence completion and tap-to-match practice without curriculum edits`. La prueba buscaba el nombre accesible legacy `Palabra que falta`, pero el renderer ahora expone `Respuesta en el idioma objetivo` para locales de destino, incluido `id-ID`.
- Se actualizó la consulta Playwright al nombre accesible actual, sin cambiar el comportamiento de producción ni debilitar la comprobación funcional. Reejecutar CI completo sobre el nuevo head antes de fusionar.

Fuente: GitHub Actions #45480612260, job `test`; PR #782; 24 nov 2026.


## 2026-11-24 — Corrección de expectativa de shuffle tras matching neutral (PR #783)

- CI #45487013109: `Offline quality reports` success; el job `test` detectó una expectativa legacy en `tests/exercise-shuffle.test.cjs` que exigía el identificador local `idnOptions` del renderer de matching.
- El renderer ahora usa `targetOptions` porque las parejas se adaptan a `target/translation`; el algoritmo Fisher–Yates no cambió. Se actualiza la expectativa para verificar el nuevo nombre y conservar la comprobación de la columna española.
- Head al abrir PR #783: `2d78c3ce51f5cd688ce6d9591ce387c5a0c320d5`. Repetir CI completo después de la corrección; no fusionar con pruebas pendientes.

Fuente: GitHub Actions #45487013109, job `test`; PR #783; 24 nov 2026.


## 2026-11-24 — Adaptación de ayudas de traducción por toque (fase 5, PR en preparación)

- Rama `feat/multilingual-tap-translation`, creada desde `main` en `930e14a17873a62d65f20d166a3238e060fa6eb2`.
- El generador de candidatos de traducción y el índice del popup ahora consumen vistas de vocabulario mediante `CurriculumLoader.adaptVocabulary`, con campos neutrales `text/translation/example/exampleTranslation` y locale del idioma activo. Se conserva prioridad de vocabulario de la unidad actual y fallback de frases authored `translate_es_id` exclusivamente para el curso indonesio.
- La frase interactiva marca su idioma con el locale real; audio de esa ayuda sigue disponible solo para indonesio, sin alterar voces ni el motor de audio. El texto alternativo de prompt deja de mencionar indonesio de forma fija.
- Se añade cobertura de regresión para los dos componentes y se incorpora el contrato de marcado al script `quality:tests`. CI todavía pendiente; revisar resultados y cualquier caso legacy antes de fusionar.
- No se cambian datos curriculares, disponibilidad `pt-BR`, IndexedDB v1, backup JSON v3 ni dependencias. La burbuja sigue usando el guardado SRS existente por ID; el trabajo específico de SRS multilingüe queda para el siguiente paso.

Fuente: rama `feat/multilingual-tap-translation`, cambios en `index.html`, `tests/indonesian-language-markup.test.cjs` y `package.json`; 24 nov 2026.


## 2026-11-24 — Cobertura multilingüe del perfil de habilidades de estudio

- La CI post-merge del PR #787 terminó en success en todos sus jobs, incluidos regresión, Chromium/E2E y calidad offline (run #45501699412).
- Se prepara una prueba de contrato para `StudyActivity` que carga los manifiestos y todos los bloques publicados pt-BR A1 (24 unidades), A2 (30) y B1 (36), y verifica que cada ejercicio se asigne a una habilidad adaptativa. También se cubre explícitamente el tipo neutral `translate_es_target`, conservando el alias histórico `translate_es_id`.
- La prueba solo verifica cobertura estructural del seguimiento; no habilita pt-BR, no certifica calidad lingüística y no cambia contenido curricular ni comportamiento de producción.
- No se modifican IndexedDB v1, backup JSON v3, dependencias ni disponibilidad de idiomas. PR en preparación; exigir CI completo y regresión post-merge antes de considerar cerrado el cambio.

Fuente: GitHub Actions #45501699412; `study-activity.js`, `tests/study-activity.test.cjs` y manifiestos pt-BR A1/A2/B1; 24 nov 2026.


## 2026-11-24 — Corrección de comparación cross-realm en cobertura pt-BR (PR #788)
- CI #45503627725 encontró que la prueba de cobertura A1/A2/B1 fallaba aunque los números de unidades cargadas coincidían exactamente con el manifiesto. La causa era `assert.deepEqual` entre un array creado dentro de `vm` y otro del realm del test: Node compara también el prototipo, por lo que dos listas numéricamente iguales no son equivalentes bajo comparación estricta.
- Se normaliza únicamente `manifest.publishedUnits` con `Array.from` antes de comparar. Se conserva la exigencia de cobertura exacta de todas las unidades publicadas; no se modifica currículo ni producción.
Fuente: GitHub Actions #45503627725, job `test`, PR #788; 24 nov 2026.


## 2026-11-24 — Alinear cobertura adaptativa pt-BR con habilidades realmente publicadas (PR #788)
- Tras corregir la comparación cross-realm, CI #45504645770 detectó otra expectativa incorrecta: el test exigía que el currículo portugués contuviera las cinco habilidades, aunque los bloques publicados actuales solo incluyen ejercicios de reconocimiento y construcción de frases (con escucha derivada cuando hay audio). La prueba fallaba específicamente por traducción, que no está representada en esos bloques; no era una habilidad sin mapear.
- Se elimina la exigencia de presencia artificial de todas las categorías y se mantiene: cada ejercicio publicado debe mapear a una habilidad válida, las unidades publicadas deben cargarse completas y el conjunto debe aportar al menos una habilidad. La correspondencia explícita de `translate_es_target` sigue cubierta en el test unitario de tipos, sin fingir que ya aparece en los datos curriculares pt-BR.
Fuente: GitHub Actions #45504645770 y revisión de bloques pt-BR A1; 24 nov 2026.


## 2026-11-24 — Inferencia de locale para ejercicios de traducción neutrales
- La revisión posterior al PR #788 detectó que `CurriculumLoader.adaptExercise` infería el idioma de respuesta para `translate_es_id` (alias histórico), pero omitía el nuevo tipo neutral `translate_es_target`. Esto dejaba sin `answerLanguage`/`answerLocale` inferidos los ejercicios neutrales cuando el contenido no declaraba explícitamente esos campos.
- Se añade `translate_es_target` a la lista de tipos cuya respuesta está en el idioma objetivo activo. Se amplían las pruebas para comprobar pt-BR, preservar `answerLanguage: 'es'` explícito y mantener la cobertura del alias `translate_es_id`.
- El adaptador sigue siendo de solo lectura: no reescribe respuestas ni reglas de aceptación. No se habilita pt-BR, no se cambian currículos, IndexedDB v1, backup JSON v3 ni dependencias. PR #789 fusionada; CI de PR #45506636280 y regresión post-merge #45507945725 aprobadas (101/101 pasos), calidad offline 10/10 y despliegue Pages #45507944048 completado.

Fuente: `curriculum-loader.js`, `tests/curriculum-loader.test.cjs`, revisión posterior al PR #788; 24 nov 2026.


## 2026-11-24 — Auditoría de contratos multilingües y estado de fase
- Se actualizan los contratos documentales porque estaban desfasados: el contrato del adaptador aún decía que la integración en renderizadores estaba pendiente, aunque las tarjetas de lección, SRS, adaptación de ejercicios y pares de asociación ya consumen las vistas comunes.
- Se aclara el comportamiento real de `adaptVocabulary`, `adaptExercise` y `adaptMatchingPairs`, incluidos fallbacks legacy, locale de respuesta explícito, aislamiento del audio indonesio y límites de no mutación.
- Se actualiza el contrato de extensiones opcionales: el validador estructural ya está implementado e integrado en `quality:tests`; los campos siguen siendo opcionales y CI no certifica corrección lingüística.
- Auditoría de disponibilidad: pt-BR mantiene `available:false`; sus manifiestos/currículos offline no lo hacen seleccionable. A1 pt-BR publica U1–U24; A2 y B1 tienen manifiestos y bloques pero siguen deshabilitados. No activar ningún nivel por presencia de archivos.
- La regresión posterior a #789 terminó correctamente: run #45507945725 (tests 101/101 + calidad 10/10) y Pages #45507944048 (build/deploy success).
- Sin cambios de producción, currículos, IndexedDB v1, backup JSON v3, dependencias ni disponibilidad.
Fuente: `curriculum-loader.js`, `language-manager.js`, manifiesto A1 pt-BR, pruebas curriculares/E2E, scripts de validación y CI; 24 nov 2026.

## 2026-11-24 — Integridad de recursos del precache offline
- Tras fusionar PR #790, la auditoría de service-worker.js confirmó que los 64 recursos declarados en ASSETS existen actualmente; 30 corresponden a bloques/manifiestos curriculares pt-BR precargados sin habilitar el curso.
- Se añade una prueba que resuelve cada ruta local del precache contra la raíz del repositorio y exige que exista como archivo dentro del proyecto. Esto evita que futuras eliminaciones o renombres de archivos dejen entradas obsoletas que fallen silenciosamente durante la instalación offline.
- La prueba no cambia la lista de recursos, el Service Worker, la disponibilidad de idiomas ni el almacenamiento. pt-BR continúa con available:false; no se modifica IndexedDB v1 ni backup JSON v3.
- CI de PR #790: reintento #45509664191 aprobado (101/101 pasos) y calidad offline 10/10. Regresión post-merge y Pages de #790 pendientes al preparar esta entrada.
Fuente: service-worker.js, tests/service-worker-install.test.cjs, árbol de GitHub y GitHub Actions #45509664191; 24 nov 2026.

## 2026-11-24 — Regresión y despliegue confirmados tras la integridad del precache
- PR #791 se fusionó mediante squash como `dc042784088324ecda7958cc26b1a97cfb324987` después de que su CI terminara en éxito: run #45510910393, pruebas 101/101 y calidad offline 10/10.
- La regresión posterior en `main` terminó en éxito en run #45511368640: pruebas 101/101 y calidad offline 10/10. GitHub Pages terminó build y deploy en éxito en run #45511366352.
- La prueba añadida en #791 valida las 64 rutas locales del precache: cada recurso debe existir como archivo y permanecer dentro del repositorio. La auditoría inicial encontró las 64 rutas presentes; 30 recursos curriculares pt-BR precargados no habilitan el idioma.
- Estado final verificado: `main` en `dc042784088324ecda7958cc26b1a97cfb324987`; sin fallos en CI, sin cambios de producción, currículos, IndexedDB v1, backup JSON v3, dependencias ni disponibilidad de idiomas.
Fuente: PR #791, GitHub Actions #45510910393, #45511368640 y #45511366352; 24 nov 2026.


## 2026-11-24 — Cierre post-merge de PR #792 y sincronización de fase
- PR #792 se fusionó mediante squash en `main`, merge commit `db1690173b7ebfbfd49247044c280baf219c7525`. La regresión post-merge #45512800901 terminó en success: test 101/101 y Offline quality reports 10/10. GitHub Pages #45512797930 completó build, report-build-status y deploy en success.
- Se actualiza `docs/PHASE_6_POSTMERGE_VERIFICATION.md` para distinguir el estado histórico del 12 nov del estado vigente: la fase 5 multilingüe está integrada en vocabulario, ejercicios, ayudas de traducción, matching y SRS; pt-BR continúa `available:false`.
- El mapa vigente `docs/B2_U20_U60_ROADMAP.md` confirma B2 indonesio U1–U60 integradas, con U1–U5 visibles y U6–U60 ocultas/no publicadas. Esto sustituye el pendiente antiguo de diseñar U13–U60, sin aprobar su publicación.
- La comprobación física de controles táctiles y restauración de foco en Tecno Pova 4 sigue pendiente; CI y E2E de navegador no la sustituyen.
- Se corrige el estado documental que quedó obsoleto en la entrada anterior sobre PR #790: la regresión post-merge #790 y Pages quedaron verificadas en runs #45510755559 y #45510754096; PR #791 y #792 también tienen CI post-merge y Pages en success.
- Sin cambios de producción, currículos, IndexedDB v1, backup JSON v3, dependencias ni disponibilidad de idiomas en PR #792.
Fuente: PR #792, GitHub Actions #45512800901 y #45512797930, `docs/B2_U20_U60_ROADMAP.md`, `docs/PHASE_6_POSTMERGE_VERIFICATION.md`; 24 nov 2026.


## 2026-11-24 — Fase 6: validación de accesibilidad/móvil actualizada
- PR #794–#797 integradas; #797 añade cobertura de controles de traducción a 320 px. En `main` (`cbae2cb6880c7e07488b614ff050740bf520decc`), regresión #45518553869 y calidad offline 10/10 success; Pages #45518553195 build/deploy success.
- La cobertura automatizada de fase 6 está completada para los casos añadidos; sigue pendiente la prueba física en Tecno Pova 4 (720×1640). No se afirma que Chromium sustituya esa prueba.
Fuente: PR #794–#797 y GitHub Actions #45518553869/#45518553195; 24 nov 2026.
