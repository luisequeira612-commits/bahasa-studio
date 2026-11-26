## 2026-11-26 — PR #879 U19–U21 fusionada; U22–U24 en curso

- PR [#879](https://github.com/luisequeira612-commits/bahasa-studio/pull/879) fusionada por squash en `main`; head `d46eb16ec84a8de754fd9f0775f539902574616d`, merge commit `54b1c941b38bf82253005a920b0f4362ce5590f8`.
- CI final: regresión #45896320710 success (103/103 pasos, incluidos accesibilidad móvil, Chromium E2E y evaluación); calidad offline 10/10; TypeScript 8/8. Sin reviews ni hilos pendientes.
- U1–U21 integradas: 210 ejercicios `order` en bancos de unidad y 210 `mc` en lecciones. Currículo U1–U40 intacto.
- Rama `feat/pt-br-b2-exercise-variety-u22-u24`: convierte los 30 ejercicios de banco de U22–U24 a `order`, mantiene 30 ejercicios de lección como `mc`, y extiende el contrato integral hasta U24.
- Próximo bloque U25–U27. Continuar hasta U40 y luego revisar producción escrita/reformulación. PT-BR/B2 deshabilitados; vocabulario `not_checked`; no certificar naturalidad nativa ni nivel MCER.
- Sin cambios a IndexedDB v1, backup JSON v3, dependencias, audio ni red.
- Fuente: PR #879, Actions #45896320710/#45896320621 y rama U22–U24; 26 nov 2026.

## 2026-11-26 — PR #878 U16–U18 fusionada; U19–U21 en curso

- PR [#878](https://github.com/luisequeira612-commits/bahasa-studio/pull/878) fusionada por squash en `main`; head `b3124d994541da5309ddfd8b826d93fb651906e0`, merge commit `6f9ee5ca160c664c3f261d9d445b28b1f35b6c58`.
- CI final: regresión #45895805598 success (103/103 pasos, incluidos accesibilidad móvil, Chromium E2E y evaluación); calidad offline 10/10; TypeScript 8/8. Sin reviews ni hilos pendientes.
- U1–U18 integradas: 180 ejercicios `order` en bancos de unidad y 180 `mc` en lecciones. Currículo U1–U40 intacto.
- Rama `feat/pt-br-b2-exercise-variety-u19-u21`: convierte los 30 ejercicios de banco de U19–U21 a `order`, mantiene 30 ejercicios de lección como `mc`, y extiende el contrato integral hasta U21.
- Próximo bloque U22–U24. Continuar hasta U40 y luego revisar producción escrita/reformulación. PT-BR/B2 deshabilitados; vocabulario `not_checked`; no certificar naturalidad nativa ni nivel MCER.
- Sin cambios a IndexedDB v1, backup JSON v3, dependencias, audio ni red.
- Fuente: PR #878, Actions #45895805598/#45895805575 y rama U19–U21; 26 nov 2026.

## 2026-11-26 — PR #877 U13–U15 fusionada; U16–U18 en curso

- PR [#877](https://github.com/luisequeira612-commits/bahasa-studio/pull/877) fusionada por squash en `main`; head `2fb638ae3f171cf1918d48320a50f08eece6f5e2`, merge commit `e60b791c66e6619d9adec339eb2e4b37833ea80f`.
- CI final: regresión #45895227735 success (103/103 pasos, incluidos accesibilidad móvil, Chromium E2E y evaluación); calidad offline 10/10; TypeScript 8/8. Sin reviews ni hilos pendientes.
- U1–U15 integradas: 150 ejercicios `order` en bancos de unidad y 150 `mc` en lecciones. El currículo original U1–U40 permanece intacto.
- Rama `feat/pt-br-b2-exercise-variety-u16-u18` abierta desde el merge #877: convierte los 30 ejercicios de banco de U16–U18 a `order`; mantiene 30 ejercicios de lección como `mc`; auditoría integral ampliada hasta U18.
- Próximo bloque U19–U21. Continuar por bloques hasta U40 y luego revisar producción escrita/reformulación. PT-BR y B2 permanecen deshabilitados; vocabulario `not_checked`; no certificar naturalidad nativa ni nivel MCER.
- Sin cambios a IndexedDB v1, backup JSON v3, dependencias, audio ni red.
- Fuente: PR #877, Actions #45895227735/#45895227775 y rama U16–U18; 26 nov 2026.

## 2026-11-26 — Diversidad de ejercicios B2 U10–U12 fusionada; U13–U15 en curso

- PR [#876](https://github.com/luisequeira612-commits/bahasa-studio/pull/876) fusionada por squash en `main`; head `b9d67ac7e53e34dad4a02bb6e769e8a6a863aba5`, merge commit `c22c75914dad4bb7dd25b7b8ab8712525289e03a`.
- CI repetido tras un timeout transitorio en una prueba E2E móvil no relacionada con el contenido: regresión final success, 103/103 pasos; Offline quality reports success; TypeScript success. Sin reviews ni hilos pendientes al fusionar.
- U1–U12 ahora usan `order` en los bancos de unidad y `mc` en ejercicios de lección: 120 tareas por modalidad. Se conserva el currículo existente U1–U40; esta fase diversifica práctica, no vuelve a crear unidades.
- Rama `feat/pt-br-b2-exercise-variety-u13-u15` iniciada desde el merge de #876. U13–U15 preparadas para convertir sus 30 ejercicios de banco a `order`; los 30 ejercicios de lección permanecen `mc`. Contrato integral se extiende hasta U15.
- Próximo bloque: U16–U18. Mantener PT-BR y B2 deshabilitados hasta completar diversidad y revisión editorial. No certificar hablante nativo ni equivalencia MCER; entradas siguen `not_checked`. Sin cambios a IndexedDB v1, backup JSON v3, dependencias, audio ni red.
- Fuente: PR #876, Actions #45893519879 y rama U13–U15; 26 nov 2026.

## 2026-11-26 — Diversidad de ejercicios B2: extensión U10–U12

- PR #873 (U1–U3), #874 (U4–U6) y #875 (U7–U9) están fusionadas en main. U1–U9 ya separan bancos: `order` en las unidades y `mc` en lecciones.
- Esta rama convierte las 30 actividades de unidad de U10–U12 a `order`, reconstruyendo cada ejemplo PT-BR; las 30 actividades de lección permanecen `mc`. U1–U12 sumarán 120 tareas de cada modalidad.
- La auditoría integral ahora exige el reparto para U1–U12 y verifica inventario exacto de tokens, secuencia y mezcla. CI pendiente.
- Sin nuevas dependencias, audio, red, IndexedDB ni cambios al backup JSON v3. PT-BR y B2 siguen deshabilitados.
- Fuente: PR #873, #874, #875 y rama `feat/pt-br-b2-exercise-variety-u10-u12`; 26 nov 2026.

## 2026-11-26 — Diversidad de ejercicios B2: extensión U7–U9

- PR #873 (U1–U3) y PR #874 (U4–U6) están fusionadas en main. U1–U6 ya separan bancos: `order` en las unidades y `mc` en lecciones.
- Esta rama convierte las 30 actividades de unidad de U7–U9 a `order`, reconstruyendo cada ejemplo PT-BR; las 30 actividades de lección permanecen `mc`. U1–U9 sumarán 90 tareas de cada modalidad.
- La auditoría integral ahora exige este reparto para U1–U9 y verifica que los tokens y la secuencia de orden coincidan con el ejemplo. CI pendiente.
- Sin nuevas dependencias, audio, red, IndexedDB ni cambios al backup JSON v3. PT-BR y B2 siguen deshabilitados.
- Fuente: PR #873, PR #874 y rama `feat/pt-br-b2-exercise-variety-u07-u09`; 26 nov 2026.

## 2026-11-26 — Diversidad de ejercicios B2: extensión piloto U4–U6

- PR #873 ya integró U1–U3: 30 ejercicios `order` en banco de unidad y 30 `mc` en lecciones.
- Esta rama extiende el patrón a U4–U6: otras 30 actividades de unidad pasan a `order`; las 30 actividades de lección conservan `mc`. U1–U6 sumarán 60 tareas de orden y 60 MC, una modalidad distinta por cada entrada léxica.
- El contrato integral exige el reparto `order` en bancos de unidad y `mc` en lecciones para U1–U6, y valida tokens y secuencia. CI pendiente.
- Fuente: PR #873 fusionada y rama `feat/pt-br-b2-exercise-variety-u04-u06`; 26 nov 2026.

## 2026-11-26 — Diversidad de ejercicios B2: piloto U1–U3

- La auditoría integral PR #872 identificó un bloqueo pedagógico: 800 registros de opción múltiple, con 400 preguntas distintas reutilizadas entre lección y banco de unidad.
- Piloto en rama `feat/pt-br-b2-exercise-variety-u01-u03`: las 30 actividades del banco de unidad de U1–U3 pasan a tipo `order`, reconstruyendo el ejemplo PT-BR de cada entrada; las 30 actividades de lección permanecen como `mc`. Cada término practica significado en la lección y orden/frase en el banco de unidad.
- Se usa el tipo `order` ya presente en el motor de aprendizaje; sin nuevas dependencias, audio, red, IndexedDB ni cambios de backup. La auditoría completa ahora valida ambos formatos y comprueba que las fichas de orden usan exactamente los tokens del ejemplo, en secuencia correcta y mezclada.
- CI pendiente. Si el piloto pasa, extender el patrón por bloques y evaluar después actividades de producción escrita y reformulación. No habilitar B2 hasta terminar diversidad y auditoría.
- Fuente: PR #872 fusionada, tests/written-response.test.cjs, A1 curriculum order helper y nueva rama piloto; 26 nov 2026.

## 2026-11-26 — Auditoría integral específica PT-BR B2

- Hallazgo de alcance: el artefacto `curriculum-quality-report.json` de Actions #45887647838 informa sobre el currículo indonesio B2 embebido en `index.html`, no sobre el currículo PT-BR B2 modular. No usar sus cifras ni sus 44 warnings como evaluación del curso portugués.
- Revisión directa de los 13 bloques PT-BR B2: 40 unidades, 200 lecciones y 400 entradas; 400 IDs únicos; no se detectaron términos ni ejemplos PT-BR duplicados por normalización. Se encontraron 202 referencias de repaso a 48 IDs A2 distintos y ninguna referencia rota.
- Se añade `tests/pt-br-curriculum-b2-full-audit.test.cjs`, que carga U1–U40 a través de `CurriculumLoader` y valida manifiesto, estructura, cobertura exacta de vocabulario por lección, explicación explícita de términos, ejemplos, estados `not_checked`, ejercicios MC y respuestas, referencias A2, duplicados y disponibilidad desactivada. Se incorpora a `quality:tests`.
- Primera ejecución del contrato completo detectó que U12, lección 2, introducía «em grau semelhante» sin explicarla. El análisis estático de las 200 lecciones encontró cuatro explicaciones adicionales incompletas (U19 «transparente», U20 «ter em mente», U25 «retrospectiva» y U28 «conjunto de dados») y cuatro fallos de cobertura nueva (U24, U25, U33 y U40: términos repetidos en dos lecciones y otros sin lección asignada). Se corrigieron las cinco explicaciones y las cuatro asignaciones; el nuevo barrido independiente devuelve cero términos sin explicación y cero huecos/duplicados de cobertura. La revisión conceptual adicional corrigió U29: la criptografía homomórfica permite operar sobre ciertos datos cifrados (no es solo protección en tránsito), y el objetivo en español pasó a «una exfiltración». En U37 se precisó la glosa de `humor autodepreciativo` a «humor autodespreciativo». El contrato completo ahora compara términos exactos normalizados contra A1, A2 y B1 y acumula todas las coincidencias para reportarlas juntas. La primera coincidencia fue `sustentável` en B2 U19, ya enseñada en A2 U12; se sustituyó por `exequível` («factible / realizable»). El barrido acumulado encontró además `transparência` (B1 U11), `ressalva` y `consenso` (B1 U2), e `impasse` (B1 U4); se sustituyeron por `mensurabilidade`, `condicionante`, `entendimento mútuo` y `entrave`, con ejemplos y explicaciones adaptados. Se corrigió también el total esperado de ejercicios a 800 (400 de unidad + 400 de lección). Rama `audit/pt-br-b2-full-curriculum`; CI de la nueva versión pendiente. Estas comprobaciones son estructurales y no certifican naturalidad, gramática nativa, adecuación MCER ni traducción.
- Restricciones: PT-BR continúa `available:false`; B2 no se habilita. No tocar IndexedDB v1, backup JSON v3, dependencias ni audio.
- Fuente: Actions #45887647838 artefacto `curriculum-quality-report`, manifiesto, 13 bloques PT-BR B2, 10 bloques A2 y nuevo contrato; 26 nov 2026.

## 2026-11-26 — Cierre PR #871 — bloque final PT-BR B2 U37–U40

- PR [#871](https://github.com/luisequeira612-commits/bahasa-studio/pull/871) fusionada por squash en `main`; head validado `00c61d0983bb379b7d85613fee6ac826e48cdd76`; merge commit `0b50e7649c9a098f54a0917b785002db19ac2134`.
- Añade U37–U40 (20 lecciones y 40 entradas), manifiesto B2 U1–U40, caché app-shell v3.8.165, precarga offline, E2E hasta U40 y contrato específico en `quality:tests`. El currículo B2 completo suma 40 unidades, 200 lecciones y 400 entradas léxicas; queda pendiente la revisión editorial/lingüística final y todas las entradas nuevas permanecen `not_checked`.
- Primera regresión detectó diez contratos A2 y B2 U1–U3 con expectativas de caché v3.8.164 y una aserción de U40 sin mención explícita de «reescrita orientada». Se corrigieron los contratos a v3.8.165 y la explicación de la lección, sin relajar pruebas.
- CI del head final: regresión #45887647838 success (103/103 pasos, incluidos Chromium E2E, accesibilidad móvil, progresión y pruebas de evaluación); calidad offline #45887647838 10/10 success; TypeScript #45887647895 success. Sin reviews ni hilos pendientes al fusionar.
- Verificado en `main`: manifiesto PT-BR B2 publica U1–U40/40; Service Worker precarga `units-37-40.js` y usa caché v3.8.165. El workflow post-merge para el commit squash no devolvió ejecuciones; por tanto no declarar Pages/despliegue post-merge verificado.
- PT-BR continúa `available:false`; B2 no se habilita; entradas nuevas `not_checked`. Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio; no afirmar certificación nativa ni equivalencia MCER.
- Fuente: PR #871, rama y archivos curriculares/contratos; 26 nov 2026.

## 2026-11-26 — Cierre PR #870 y continuación final B2 U37–U40

- PR [#870](https://github.com/luisequeira612-commits/bahasa-studio/pull/870) fusionada por squash en `main`; merge commit `a60232f0f614113b44e27aa8e676cca2b7f23a27`. Incluye U34–U36: 15 lecciones, 30 entradas, manifiesto interno U1–U36, precarga offline y caché app-shell v3.8.164.
- CI del head final `8dc2198a57ce394613d327313ef3cce1b0329ac7`: regresión #45884552214 success (103 pasos, incluida Chromium E2E, accesibilidad móvil y pruebas de evaluación); calidad offline 10/10; TypeScript #45884552466 success. Sin reviews ni hilos pendientes. Las expectativas A2 antiguas de caché v3.8.163 se alinearon a v3.8.164; no se cambió runtime.
- Nueva rama `feat/pt-br-b2-u37-u40`, creada desde main tras el merge. Añadido `languages/pt-BR/curriculum/b2/units-37-40.js`: U37 ironía, humor y subentendidos; U38 ambigüedad, presuposición e implicatura; U39 proyecto argumentativo multimodal; U40 proyecto final de autonomía B2. 20 lecciones y 40 entradas, diez por unidad, dos objetivos por lección; explicaciones en español, ejemplos PT-BR, ejercicios contextualizados y vocabulario `not_checked`.
- Manifiesto interno ampliado a U1–U40; Service Worker precarga U37–U40 y usa caché app-shell v3.8.165. E2E offline extendida hasta U40; nuevo contrato `tests/pt-br-curriculum-b2-u37-u40.test.cjs` registrado en `quality:tests`; contratos anteriores B2 y aserciones históricas de caché actualizados.
- Estado actual de la rama U37–U40: pendiente ejecutar CI completo y revisar resultados antes de abrir/fusionar PR. PT-BR continúa `available:false`; B2 no se habilita. Entradas `not_checked`; no se afirma certificación nativa ni equivalencia MCER.
- Restricciones preservadas: sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio.
- Roadmap `docs/PT_BR_B2_ROADMAP.md` actualizado con cierre #870 y el bloque final U37–U40.
- Fuente: PR #870, Actions #45884552214/#45884552466, merge commit y rama `feat/pt-br-b2-u37-u40`; 26 nov 2026.

## 2026-11-26 — Seguimiento CI PR #870 (U34–U36)

- PR [#870](https://github.com/luisequeira612-commits/bahasa-studio/pull/870) abierta para U34–U36. TypeScript #45883897314 terminó success y Offline quality reports #45883897341 success; la regresión #45883897341 falló en tres contratos A2 históricos (U7–U9, U10–U12 y U13–U15), que aún buscaban el nombre de caché v3.8.163 mientras el Service Worker ya declara v3.8.164.
- El resto de la suite local, inventario, lint y E2E no llegó a ejecutarse por el fallo en quality:tests; no atribuir el fallo al contenido B2. Se actualizan únicamente las tres expectativas de caché a v3.8.164, sin cambiar runtime ni comportamiento.
- Revalidar el head resultante con regresión completa, Chromium E2E, accesibilidad móvil y TypeScript; mantener PR abierta hasta que todo esté verde y no haya reviews/hilos pendientes.
- PT-BR sigue `available:false`; B2 deshabilitado; vocabulario nuevo `not_checked`. Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio.
- Fuente: PR #870, Actions #45883897314/#45883897341 y logs del job #140129721100; 26 nov 2026.

## 2026-11-26 — PT-BR B2 U34–U36 en preparación

- Rama `feat/pt-br-b2-u34-u36`, creada desde `main` después de integrar PR #869 y verificar sus workflows post-merge (regresión #45880701517, TypeScript #45880701513 y Pages #45880701567, todos success).
- Añadido `languages/pt-BR/curriculum/b2/units-34-36.js`: U34 salud y políticas públicas; U35 educación y aprendizaje permanente; U36 consumo, finanzas y decisiones. Son 15 lecciones y 30 entradas nuevas, diez por unidad y dos objetivos léxicos por lección; ejemplos PT-BR, explicaciones en español, ejercicios contextualizados y estado `not_checked`.
- Manifiesto interno B2 extendido a U1–U36 de 40; Service Worker precarga U34–U36 y actualiza app-shell a v3.8.164. Se amplió la prueba E2E offline de Chromium a B2 U1–U36.
- Añadido contrato `tests/pt-br-curriculum-b2-u34-u36.test.cjs` para disponibilidad false, carga parcial, estructura, explicación de términos, referencias A2, duplicados normalizados contra A1/A2/B1/B2 U1–U33 y precarga offline. Incluido en `quality:tests`; se actualizaron los contratos activos de caché A2/B1 y manifiesto B2.
- `docs/PT_BR_B2_ROADMAP.md` actualizado: U1–U36 = 180 lecciones y 360 entradas.
- Pendiente: revisar coherencia final del bloque, abrir PR, ejecutar CI completo (calidad offline, TypeScript, regresión, accesibilidad móvil y Chromium E2E). No fusionar hasta checks verdes y ausencia de revisiones/hilos pendientes.
- PT-BR permanece `available:false`; B2 no se habilita en el selector. No se toca IndexedDB v1, backup JSON v3, dependencias ni audio. No se afirma revisión nativa ni certificación MCER.
- Fuente: rama, archivos del bloque, manifiesto, Service Worker, pruebas y roadmap; 26 nov 2026.

## 2026-11-26 — Seguimiento CI PT-BR B2 U1–U3

- La primera regresión detectó expectativas de caché antiguas en contratos PT-BR previos; se actualizaron las aserciones del Service Worker a v3.8.153 sin cambiar comportamiento de esos currículos.
- El contrato B2 detectó dos explicaciones que no nombraban explícitamente todos los términos de su lección: U1 L3 (`não necessariamente`) y U3 L1 (`por mais que`). Ambas explicaciones se completaron.
- En CI #45857506604, tras corregir U1 L3 y expectativas de caché, el conjunto local llegó a 324/325; el único fallo restante fue U3 L1. Corrección final: commit `314947375e1648623ad9ddb049afee1d85f9194a`.
- Typecheck del head final #45857889129: success. Regresión #45857889143 seguía ejecutándose en la instalación de Chromium al último chequeo; no declarar PR validada ni fusionar hasta que el job completo termine en verde.
- PT-BR sigue `available:false`; B2 solo carga internamente U1–U3. Todas las entradas continúan `not_checked`. Sin cambios a IndexedDB v1 ni backup JSON v3.
- Fuente: GitHub Actions #45857506604/#45857889129/#45857889143 y PR #859; 26 nov 2026.

## 2026-11-26 — Inicio de PT-BR B2, bloque U1–U3

- Se reconstruye y documenta en `docs/PT_BR_B2_ROADMAP.md` un temario de 40 unidades porque no se recuperó el temario anterior en Notion ni en el repositorio. La reconstrucción queda identificada como propuesta, no como recuperación literal.
- Rama `feat/pt-br-b2-u01-u03`: añade manifiesto parcial B2 (40 unidades, solo U1–U3 publicadas para carga interna), 3 unidades, 15 lecciones explícitas y 30 entradas de vocabulario; todas permanecen `not_checked`. Ejes: modalización/postura, síntesis/atribución de fuentes y concesión/refutación.
- Se registra B2 en la ruta técnica de PT-BR, pero `available:false` se conserva; no se habilita el idioma ni se publica el curso en el selector. Service Worker incorpora el bloque y actualiza caché a v3.8.153.
- Se añaden pruebas de estructura, referencias A2, duplicados normalizados contra A1–B1 y carga offline de B2 U1–U3. No hay cambios a IndexedDB v1, backup JSON v3, dependencias ni audio.
- Referencia de diseño para U1: Figueredo (2015), estudio de marcadores discursivos evaluativos del portugués brasileño, DOI https://doi.org/10.1590/1981-5794-1504-3. Esta referencia no verifica individualmente las entradas ni los ejemplos; todo el vocabulario sigue `not_checked`. No se afirma certificación nativa ni MCER.
- Fuente: archivos del bloque B2, `docs/PT_BR_B2_ROADMAP.md`, pruebas y PR de esta rama; 26 nov 2026.

## 2026-11-26 — Arquitectura multiidioma F0–F4

- F0–F4 completadas: F1 PR #854 (JSDoc/checkJs base), F2 PR #855 (validadores de catálogo/manifiestos), F3 PR #856 (checkJs de ProgressNamespace) y F4 guía `docs/MULTILINGUAL_LANGUAGE_ONBOARDING.md`.
- Las PR #854–#856 y sus validaciones post-merge quedaron verdes; solo `id` está disponible. No se habilitan idiomas incompletos; secuencia vigente: pt-BR → en → it → fr → de → nl → ru → ja → ko → id.
- Contratos y límites preservados: IndexedDB v1, backup JSON v3, legacy indonesio, offline y cero backend. Pendiente separado: `loadUnits` sigue limitado a unidades 1–40; ampliar ese rango requiere PR específica y pruebas. Fuente: CI y revisión de main, 26 nov 2026.

## 2026-11-26 — Corrección del rango de unidades en CurriculumLoader

- Se elimina el tope rígido de 40 en `loadUnits`: ahora el rango superior se valida contra `manifest.totalUnits`, manteniendo el mínimo 1, enteros, selección no vacía, unicidad y publicación de cada unidad.
- Se añaden regresiones para cargar unidades 41 y 45 de un manifiesto de 45 unidades y rechazar la unidad 46.
- No se modifica el esquema del manifiesto, la disponibilidad de idiomas, IndexedDB v1, backup JSON v3 ni el currículo publicado. La corrección solo permite que el cargador respete el total declarado y validado por el manifiesto.
- Fuente: `curriculum-loader.js` y `tests/curriculum-manifest-validation.test.cjs`; 26 nov 2026.

## 2026-11-25 — Prueba E2E de calidad SRS más reciente en Aprender

- Se añadió una prueba Chromium en `tests/learning-screen-phase-5b.e2e.test.cjs` para recorrer la integración real del recomendador: una palabra con errores históricos (`incorrect: 3`) y última calidad `Bien` (`lastQuality: 3`) no debe aparecer en «Practicar estas palabras»; al cambiar la última calidad a 2, la palabra vuelve a ser elegible para refuerzo.
- La prueba usa el ID canónico `v12` (Dari), mantiene la fecha de repaso futura para aislar la recomendación de repasos vencidos y comprueba el contenido visible de la tarjeta de Aprender. No modifica runtime, currículo, IndexedDB v1, backup JSON v3 ni dependencias.
- Validación posterior a la fusión: la prueba Chromium y la suite completa pasaron en GitHub Actions #45760764747 (commit `4b021e9`); regresión y controles de navegador completados correctamente. GitHub Pages también se reconstruyó y desplegó con éxito en #45760764156. La prueba confirma el comportamiento en navegador automatizado; queda pendiente únicamente la comprobación manual en el dispositivo.
- Fuente: pendiente manual registrada en Notion y revisión de `adaptive-learning.js`, `tests/adaptive-learning.test.cjs` y `tests/learning-screen-phase-5b.e2e.test.cjs`; 25 nov 2026.
 
## 2026-11-26 — Corrección editorial del objetivo de A1 U12 L4

- La auditoría detectó una frase gramaticalmente incompleta en el objetivo de «Tareas del hogar»: «Aprende a tareas del hogar».
- Se reformuló como «Aprende vocabulario para hablar de las tareas del hogar y practica frases sencillas, recuperando lo estudiado anteriormente».
- Se añadió una regresión que comprueba el objetivo de U12 L4. Sin cambios en vocabulario, ejercicios, secuencia, runtime, IndexedDB v1, backup JSON v3 ni dependencias.
- La prueba de integridad detectó el cambio canónico de A1; se actualizó su hash fijado de `e45ef2e6` a `52124a59`, manteniendo la aserción estricta y los recuentos estructurales.
- Fuente: revisión directa de `curriculum-a1.js`, `tests/a1-curriculum-progression.test.cjs`, `tests/curriculum-extraction.test.js` y CI PR #846 run #45748453471; 26 nov 2026.

## 2026-11-26 — Corrección de secuencia didáctica A1 U11 L2

- La revisión de U11 detectó que L2 adelantaba `Tepat` en tres lugares: la explicación gramatical, la fuente de ejercicios de la unidad y la copia del ejercicio en la lección. La introducción formal está en L3 (`v156`).
- Se ajustaron la fuente y la copia del ejercicio de `v151` a «Jam tujuh.» (prompt, pista, modelo y explicación), y se retiró `tepat` de la explicación gramatical de L2. El uso de `Tepat` permanece en L3.
- Se añadió una regresión que comprueba que U11 L2 no exponga `Tepat/tepat` antes de L3 y que la estructura original de ejercicios se conserve.
- Alcance limitado a currículo, prueba y este registro; sin cambios de runtime, IndexedDB v1, backup JSON v3, dependencias ni audio.
- Fuente: revisión directa de `curriculum-a1.js` y CI PR #845 run #45741890292; 26 nov 2026. El primer CI reveló que la prueba debía comprobar también la gramática y que la fuente y la copia del ejercicio debían permanecer sincronizadas.

## 2026-11-25 — Persistencia E2E de la aprobación de evaluación final

- La E2E existente de progresión ya comprobaba evaluación insuficiente → unidad siguiente bloqueada → evaluación aprobada → unidad siguiente desbloqueada.
- Se refuerza la misma prueba para leer `completedUnits` directamente desde IndexedDB después de aprobar y, tras recargar la aplicación, confirmar que la unidad aprobada sigue guardada y que la siguiente continúa desbloqueada.
- Cambio exclusivo de pruebas en `tests/browser-e2e.test.cjs`; sin cambios de runtime, currículo, esquema IndexedDB v1, backup JSON v3 ni dependencias.
- Fuente: prueba E2E de progresión existente y ampliación de sus aserciones; 25 nov 2026.

## 2026-11-25 — Normalización transversal de respuestas escritas

- El evaluador de respuestas escritas elimina diacríticos antes de comparar cualquier respuesta, también en indonesio; conserva la normalización de mayúsculas, puntuación y espacios. «Saya dari Perú» y «saya dari peru» se aceptan para «Saya dari Peru.».
- En respuestas incorrectas, el feedback deja de repetir explicaciones curriculares que no describen el error. Solo muestra una diferencia de palabra cuando puede identificar exactamente una sustitución; en los demás casos conserva «Incorrecto» y la respuesta esperada.
- Se aplica a las rutas de texto que usan `WrittenResponse.compare()` (escucha/dictado, traducción y completar). La redacción libre `write` continúa como autoevaluación, no como coincidencia exacta.
- Pruebas de regresión para tildes, mayúsculas, signos, espacios dobles y diferencias de una palabra. Sin cambios a IndexedDB v1, backup JSON v3, currículo ni dependencias.
- Fuente: reproducción reportada por el usuario en A1 U3 L5 y revisión de `WrittenResponse.normalize/compare` y `LessonEngine.checkTranslate`; 25 nov 2026.

## 2026-11-25 — Refuerzo SRS dirigido y resolución temporal de marcas manuales

- La acción adaptativa «Practicar estas palabras» limita la sesión SRS a los IDs recomendados; la tarjeta general «Repasar» conserva su cola normal.
- Una respuesta exitosa dentro de las 12 horas ya no deja intacta la fecha de revisión: asegura repetición e intervalo mínimos de un día y actualiza `lastReviewed`/`nextReview`, conservando el último grado y los contadores históricos.
- La fusión de snapshots SRS resuelve `savedForReview` según el evento explícito más reciente (`markedAt`, con fallback a `lastReviewed`), para que una marca antigua no prevalezca sobre una calificación posterior.
- Se añaden pruebas de regresión para la sesión dirigida, el avance del próximo repaso y el estado manual más reciente.
- Sin cambios al esquema IndexedDB v1, backup JSON v3, currículo ni dependencias. Pendiente CI y validación funcional en el dispositivo.
- Fuente: revisión de PR #835/#836 contra `main` después de #838 y logs de Actions; 25 nov 2026.

## 2026-11-25 — Corrección adicional del recomendador: conservar la última calidad al agregar duplicados

- La corrección anterior almacenaba `lastQuality` en cada registro SRS, pero la vista adaptativa agrega varios IDs de vocabulario con el mismo término en `srsByWord` y solo sumaba contadores. No copiaba la última calidad al agregado; por eso `history.lastQuality` seguía siendo `undefined` y las palabras con errores históricos volvían a pasar el filtro.
- Se añade `AdaptiveLearning.updateLatestSrsQuality()` para conservar en el agregado la calidad del registro con `lastReviewed` más reciente. La marca temporal auxiliar solo vive en memoria y no cambia IndexedDB ni backup v3.
- El recomendador también descarta calificaciones exitosas en `weakWords` y `isolatedWords`, tanto en la selección de la vista como en el módulo `adaptive-learning.js`. Las palabras guardadas manualmente siguen teniendo prioridad.
- Se agregan pruebas de precedencia temporal, exclusión de calidad 3/5, y excepción de guardado manual.
- Fuente: inspección del flujo real `DB.getAll('srs') → srsByWord → rankedWordHistory → weakWords → AdaptiveLearning.recommend()`; 25 nov 2026.

## 2026-11-25 — Corrección de recomendación SRS tras calificar «Bien»

- Diagnóstico: el registro `recordAttempt()` limpiaba `savedForReview`, pero no conservaba la última calificación; además, el filtro adaptativo seguía considerando débil una palabra solo por `incorrect >= 2`. Por eso una palabra con errores históricos podía reaparecer inmediatamente después de calificarla «Bien».
- Corrección mínima: guardar `lastQuality` en cada intento; al construir `weakWords`, excluir registros con una última calidad segura de 3 o más. Se mantiene la prioridad de las palabras guardadas manualmente y de las que tienen errores persistentes cuando su última calidad fue inferior a 3.
- El estado `lastQuality` también participa en la deduplicación de snapshots SRS y se propaga al objeto adaptativo, sin cambios de esquema IndexedDB, backup JSON v3 ni dependencias.
- Se añade una prueba estructural específica para impedir que esta regresión vuelva a aparecer.

Fuente: reproducción manual del flujo «Repasar → Bien» y revisión de `recordAttempt()`, `mergeSrsRecords()` y `App.updateSrsView()`; 25 nov 2026.

## 2026-11-25 — Fase 7: recomendar la evaluación final pendiente en Aprender

- Diagnóstico: si todas las lecciones de la unidad A1 actual estaban completas pero faltaba aprobar su evaluación final, el cálculo no encontraba una lección pendiente; A2 seguía bloqueado por esa evaluación. El recomendador devolvía `action: 'none'` y ocultaba la tarjeta, aunque existía una acción necesaria para continuar.
- Corrección: detecta esa evaluación pendiente y la recomienda como siguiente paso; el botón abre la evaluación existente mediante `LessonEngine.startUnitAssessment()`. Los repasos vencidos conservan prioridad.
- Se añaden pruebas unitarias de prioridad y una E2E que completa las lecciones de una unidad A1, verifica la tarjeta y abre la evaluación. Sin cambios a XP, currículo, IndexedDB v1, backup JSON v3 ni dependencias.
- Fuente: inspección de `App.updateSrsView()`, `getUnitProgressState()`, `isUnitUnlocked()` y `AdaptiveLearning.recommend()`; 25 nov 2026.

## 2026-11-25 — Causa y corrección de cierre intermitente de la burbuja de traducción

- La traza ampliada de CI [#45674332231](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45674332231) identificó la secuencia exacta: Enter abre la burbuja y establece `aria-expanded=true`; inmediatamente después se dispara `window-scroll`, que la cierra y revierte el atributo. No hubo clic/pointerdown ni errores JS.
- Causa en `index.html`: el listener global `window.addEventListener('scroll', close, true)` cerraba la burbuja ante cualquier desplazamiento, incluido el desplazamiento automático del navegador al activar con teclado el botón enfocado.
- Corrección acotada: separar el cálculo de posición en `position(button)`; cuando ocurre scroll y el disparador sigue enfocado, mantener la burbuja abierta y recalcular su anclaje. Si el foco ya salió del disparador, se conserva el cierre por desplazamiento. Se mantienen Escape, cierre por clic externo, foco y estado ARIA.
- Se añadió una aserción E2E que despacha scroll mientras el disparador conserva foco y exige que la burbuja siga visible y expandida. La prueba original sigue exigiendo apertura por Enter y cierre por Escape; no se relajaron criterios.
- Archivos modificados: `index.html`, `tests/learning-screen-phase-5b.e2e.test.cjs`, `MEMORY.md`. Sin cambios de persistencia, IndexedDB v1, backup JSON v3, currículo ni dependencias. Pendiente CI completo antes de considerar listo o fusionar el PR.

Fuente: traza de GitHub Actions #45674332231 y código del listener en `index.html`; 25 nov 2026.

## 2026-11-25 — Diagnóstico adicional de teclado para burbuja de traducción

- La repetición del job [#45665119892](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45665119892) volvió a fallar en Fase 5B, prueba de teclado de la burbuja: el foco permaneció en `keyboardTranslationTrigger`, el evento `keydown Enter` llegó a document, no hubo errores JS, pero la burbuja siguió oculta y `aria-expanded=false`.
- Se preparó una instrumentación exclusivamente de prueba que registra el estado del evento en `window` capture inmediatamente después del listener de la app, además del estado en `document`. Busca distinguir si el listener de aplicación no se ejecuta o si se ejecuta y el estado se revierte después.
- No se modificó código de producción, lógica de traducción, accesibilidad, persistencia ni dependencias. No se relajaron aserciones.
- CI instrumentado [#45671735347](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45671735347) terminó completamente en success (Fase 4, calidad local, Fase 5B, E2E real y evaluación). La prueba 112 pasó, pero el test solo incluía los eventos capturados dentro del mensaje de error y no imprimía la traza cuando pasaba; por eso el job no dejó evidencia de `window-keydown-after-app` en ejecución exitosa. Se añadió un log explícito del estado y la secuencia de eventos en todos los resultados, sin cambiar aserciones ni comportamiento. Próximo paso: repetir CI y leer la traza de éxito antes de cualquier cambio de producción o fusión.

Fuente: logs de GitHub Actions #45665119892 y cambio de prueba en rama `debug/translation-bubble-window-event-20261125`; 25 nov 2026.

## 2026-11-25 — PR #832 fusionada y CI completo aprobado

- PR [#832](https://github.com/luisequeira612-commits/bahasa-studio/pull/832) fusionada mediante squash en `main`, commit `31077c2e7effb9914f25e4c345699c4555ffd224`.
- CI final del head `2451bf3f217a5b4cb1433a6347143dc04fb30a28`, run [#45663972636](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45663972636), terminó completamente en success: Fase 4, calidad local, Fase 5B, E2E real en navegador, evaluaciones y empaquetado de preview. La repetición confirmó que la prueba 112 de teclado pasó; no se relajaron aserciones.
- Revisión final: sin reviews ni hilos pendientes; GitHub confirmó PR cerrada y fusionada.
- Se conserva la tarjeta SRS compacta separada de la recomendación adaptativa de aprendizaje; la acción SRS activa la vista antes de iniciar sesión. El listener de teclado de la burbuja escucha en captura de `window` y preserva apertura, `aria-expanded`, Escape y restauración del foco.
- Sin cambios al algoritmo adaptativo, XP, currículo, IndexedDB v1, backup JSON v3 ni dependencias.
- Pendiente: verificar regresión y despliegue GitHub Pages post-merge; después, prueba manual en Tecno Pova 4 (720×1640) de recomendación, Repasar, Enter y Escape.

Fuente: PR #832, commit squash `31077c2`, GitHub Actions #45663972636; 25 nov 2026.

## 2026-11-25 — Ajuste de visibilidad de tarjetas ocultas (PR #832)

- La segunda ejecución de CI reveló que el atributo HTML `hidden` no garantizaba ocultar el host SRS: la medición mostró que el host conservaba 236 px y empujaba la recomendación adaptativa.
- Corrección en `styles.css`: `[data-adaptive-recommendation][hidden] { display: none !important; }`. Ambos hosts respetan ahora `hidden` y no reservan espacio cuando no corresponde mostrarlos. No altera la lógica adaptativa ni el SRS.
- Commit de corrección: `2b0e429e4f6475948dd967f4892d32db94afe871`. Pendiente CI renovado y revisar el timeout de la prueba de teclado de la burbuja de traducción.
- Fuente: GitHub Actions #45649556212, medición geométrica de fase 4 y diff de `styles.css`; 25 nov 2026.

## 2026-11-25 — PR en preparación: restaurar recomendación de aprendizaje en Aprender

- Diagnóstico: PR #829 convirtió `adaptiveRecommendationLearn` en una tarjeta exclusivamente SRS y la oculta cuando `dueCount === 0`. El motor `AdaptiveLearning.recommend()` sí calcula `nextLesson`, `skillLesson`, errores y acciones; pero Aprender dejó de mostrar esas recomendaciones sin repasos vencidos.
- Corrección en rama `fix/restore-learn-adaptive-recommendation-20261125`: conservar intacta la fila compacta SRS y añadir `adaptiveLearningRecommendationLearn` como host independiente. Se muestra cuando no hay repaso SRS prioritario y existe una acción de aprendizaje; se oculta cuando hay repasos vencidos o no hay acción. La tarjeta nueva usa el mismo motor y los handlers existentes. También se activa la vista SRS antes de iniciar la sesión cuando la recomendación refuerza palabras con errores, evitando el mismo problema de contenedor oculto corregido para «Repasar» en #830.
- Pruebas añadidas: E2E verifica que, sin repasos vencidos, aparece «Continúa con la siguiente lección» y su botón abre realmente la lección; prueba unitaria protege la separación entre tarjeta SRS y recomendación de aprendizaje y la navegación a SRS para acciones de refuerzo.
- La primera ejecución CI encontró una expectativa geométrica obsoleta en la E2E de fase 4: comparaba una coordenada de documento con una coordenada de viewport y asumía que la única tarjeta de Aprender debía estar oculta. Se actualizó para distinguir la tarjeta SRS oculta de la tarjeta adaptativa visible y comprobar que esta última no se solapa con la primera unidad. Nueva ejecución CI pendiente; no fusionar hasta verificar todos los checks. Sin cambios en algoritmo, XP, currículo, IndexedDB v1, backup JSON v3, dependencias ni persistencia.
- Fuente: inspección de `index.html` (blob SHA `4065685c26de3b3d45b749f9bd7d812ab8d4764e`), PR #829 y pruebas; 25 nov 2026.

## 2026-11-25 — PR de corrección: botón de tarjeta de repaso abre la vista SRS

- Tras el despliegue de PR #829, el usuario informó que al tocar «Repasar» no ocurría nada visible.
- Causa identificada en el handler de `App.renderAdaptiveRecommendation`: se llamaba a `SRSEngine.startSession()` desde Aprender, pero el método solo muestra `#srsPracticeArea` dentro de `#view-srs`; no activa por sí mismo esa vista. La sesión podía iniciarse mientras su contenedor seguía oculto.
- Corrección mínima: antes de iniciar la sesión para la acción `review`, llamar a `App.switchView('srs')`. No se altera el motor SRS, la cola, el almacenamiento ni el progreso.
- Se amplía la prueba E2E de Fase 5B para verificar tanto la llamada a `startSession` como la activación real de `#view-srs` tras pulsar el botón.
- Archivos: `index.html`, `tests/learning-screen-phase-5b.e2e.test.cjs` y `MEMORY.md`. Rama: `fix/learn-review-card-navigation-20261125`.
- PR [#830](https://github.com/luisequeira612-commits/bahasa-studio/pull/830) fusionada mediante squash en `main`, commit `a1f8d788ce313f6b1814f883a399390cce447d29`. CI del head `c43325f0cf1151e19d1d06dabb4a287aa12ebc76`, run [#45593786003](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45593786003): `test` y `Offline quality reports` success; sin reviews ni hilos pendientes.
- Pendiente verificar regresión post-merge y despliegue Pages, y después la prueba manual en Tecno Pova 4 (720×1640).
- Fuente: reporte del usuario, diff de PR #830, commit de merge y GitHub Actions #45593786003; 25 nov 2026.

## 2026-11-25 — Tarjeta compacta de repaso en Aprender (en preparación)

- La tarjeta de Aprender queda reservada exclusivamente para repasos SRS vencidos: se oculta por completo cuando el contador real es cero. No se altera la selección, los intervalos ni el inicio de sesión de repaso. La medición Chromium detectó que el ancho global `width:100%` del botón comprimía el texto y estiraba la tarjeta; el botón ahora usa ancho automático y el margen inferior queda en 14 px para dejar el espacio solicitado antes del banner.
- La fila muestra el número real de palabras pendientes y, cuando hay al menos diez intentos válidos, la habilidad de menor precisión y su porcentaje; elimina del panel de Aprender la explicación extensa y el número de intentos duplicado.
- `index.html` concentra el host, el render y sus reglas CSS específicas; `tests/adaptive-learning.test.cjs` cubre el contrato visual; `tests/learning-screen-phase-4.e2e.test.cjs` verifica altura, espacios, fila y desaparición; `tests/learning-screen-phase-5b.e2e.test.cjs` ya no espera una recomendación de lección en esa tarjeta sin repasos y comprueba que «Repasar» inicia la sesión SRS existente. Sin cambios en `adaptive-learning.js`, `styles.css`, IndexedDB v1, backup JSON v3, XP ni dependencias.
- PR [#829](https://github.com/luisequeira612-commits/bahasa-studio/pull/829), rama `fix/compact-learn-review-card-20261125`; Las pruebas E2E anteriores asumían que la tarjeta aparecía sin repasos y que recomendaba continuar una lección; se actualizaron para el nuevo contrato SRS-only. También se ajustaron la posición del banner sin tarjeta y la activación de Aprender antes de medir la fila. La prueba de altura/espacios reveló que el botón heredaba `width:100%` y que el escenario medía tras un scroll de navegación; se corrigieron ambos puntos y se fijó el margen inferior en 14 px, tras medir 8 px en el intento anterior. La E2E de fase 4 ya confirma 76 px de alto, 12 px bajo la barra superior, fila horizontal y separación de 14 px prevista antes del banner. La suite unitaria aún contenía una aserción antigua sobre la ilustración; se cambió para comprobar que el host queda oculto con `[hidden]`. CI de la nueva cabeza pendiente; falta verificar el despliegue; la prueba física en Tecno Pova 4 (720×1640) corresponde al usuario después de Pages.
- Fuente: solicitud explícita del dueño y diff de la rama; 25 nov 2026.

## 2026-11-25 — PR #828 fusionada: estado vacío coherente del recomendador

- PR [#828](https://github.com/luisequeira612-commits/bahasa-studio/pull/828) fusionada mediante squash en `main`, commit `bd01e1266475344329016f8207fa5ef0764f707d`. CI de la cabeza `fb91735cc59dde691e009a86e0faa6ddcc49ad42`, run [#45588782262](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45588782262): `test` y `Offline quality reports` success.
- `styles.css` oculta ilustración y mensaje de estado vacío cuando la tarjeta contiene una acción habilitada; `tests/adaptive-learning.test.cjs` cubre el contrato CSS. No cambia IndexedDB, backup JSON v3, XP, currículo, persistencia ni dependencias.
- Fuente: PR #828, GitHub Actions #45588782262 y commit de fusión; 25 nov 2026.

## 2026-11-25 — PR #819 y #820 fusionadas; recomendador visible en Aprender

- PR [#819](https://github.com/luisequeira612-commits/bahasa-studio/pull/819) se fusionó mediante squash en `main`, commit `40de6fbde1c6c564241db157f5681ffacfb33236`. CI final [#45566397167](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45566397167): `test` y `Offline quality reports` success; sin reviews ni hilos. La regresión post-merge [#45567448995](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45567448995) y Pages [#45567448255](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45567448255) también terminaron en success.
- PR [#820](https://github.com/luisequeira612-commits/bahasa-studio/pull/820) se fusionó mediante squash en `main`, commit `e41f21aa10feddb4dcdf7e35064e18cff7fdb5fa`. Head probado `3095fefd98b18412614880d61763fe16999777dd`; CI [#45569698398](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45569698398): `test` 103/103 y `Offline quality reports` 10/10, ambos success; sin reviews ni hilos.
- El diagnóstico de Fase 7 confirmó que la tarjeta adaptativa solo se montaba en Repasar y Perfil. #820 añade un host en Aprender, conserva Repasar y renderiza ambas vistas desde la misma decisión adaptativa. Se actualiza al iniciar la app y al entrar en Aprender. La tarjeta se inserta debajo del nodo de la unidad actual, con 220 px reservados antes del siguiente nodo para evitar solapamientos; se restablecen clase y posición al reconstruir la ruta. La captura móvil de CI confirma la separación. Pruebas E2E cubren presencia, ubicación, accesibilidad y que el botón inicia la unidad/lección elegidas por el motor adaptativo.
- Verificación posterior completada: la regresión post-merge [#45570108749](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45570108749) terminó con `test` y `Offline quality reports` en success; GitHub Pages [#45570108018](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45570108018) completó `build`, `report-build-status` y `deploy` en success. La publicación de #820 quedó verificada en Pages.
- No se altera la lógica de selección de recomendaciones, XP, currículo, progreso, IndexedDB v1, backup JSON v3, idiomas ni dependencias. La prueba física en Tecno Pova 4 (720×1640) seguirá siendo necesaria después del despliegue.

Fuente: PR #815/#819/#820, `index.html`, `adaptive-learning.js`, pruebas E2E y Actions #45566397167/#45569698398; 25 nov 2026.

## 2026-11-25 — Actualización del app shell tras PR #817

## 2026-11-25 — XP de lección limitado y resumen diario sincronizado

- PR #822 integrada en `main` mediante squash: `50cc4c95b633fdde11d2d32bed09de25b0f653c4`. Cada lección concede 1 XP por acierto de primer intento, máximo 10, solo en la primera finalización; se conservan 2 XP por tarjeta SRS, 20 XP por primera finalización de unidad y 0 XP por evaluación final.
- Auditoría posterior: `App.addXp` persiste el total `userXp`, registra exactamente el mismo importe en `StudyActivity.todayXp` y refresca Perfil + objetivo diario; `updateStudyDashboard` actualiza texto, barra y estado accesible. Se añade una prueba de regresión para evitar divergencias entre XP total y diario.
- Verificación post-merge #45578296681 (regresión + calidad offline) y Pages #45578296958: success. Prueba física en Tecno Pova 4 (720×1640) pendiente.
- Fuente: PR #822, `index.html`, `study-activity.js`, pruebas XP/actividad y Actions; 25 nov 2026.

## 2026-11-25 — Prueba E2E de XP por primera finalización (PR #824 integrada)

- PR #824 integrada en `main` mediante squash: `2f8cb27457f36cdd06566ff89803b677d8317a04`.
- La prueba Chromium con IndexedDB real usa el inicio/finalización de `LessonEngine` y `recordFirstAttempt`; verifica que la primera finalización concede el XP correspondiente, repetir la lección no concede XP adicional y abandonar otra lección no concede XP pendiente.
- CI de la cabeza final de la PR, `6c57ca81b8b3e1cb05c9110c1ccbfca545d60d59`, run [#45581329768](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45581329768): `test` y `Offline quality reports` success. Sin reviews ni comentarios pendientes.
- Verificación post-merge de regresión y Pages pendiente en el momento de esta actualización. La prueba física en Tecno Pova 4 (720×1640) sigue pendiente.
- Fuente: PR #824, `tests/browser-e2e.test.cjs`, `tests/xp-rewards.test.cjs` y GitHub Actions; 25 nov 2026.

## 2026-11-25 — Reubicación de recomendador en Aprender (PR #826)

- PR [#825](https://github.com/luisequeira612-commits/bahasa-studio/pull/825) se fusionó mediante squash en `main`, commit `f02e4e72da0e1fc3ce877031fcd7597e1abaf5bd`. CI de la PR [#45582831818](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45582831818), regresión post-merge [#45582738104](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45582738104) y Pages [#45582737812](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45582737812): success.
- PR [#826](https://github.com/luisequeira612-commits/bahasa-studio/pull/826) mueve la tarjeta de recomendación adaptativa fuera de la ruta de unidades y la coloca encima de `courseContainer`, como sección independiente. Conserva prioridad, selección, actualización, botón y comportamiento de Repasar; elimina el hueco artificial de 220 px dentro de la unidad actual.
- Pruebas actualizadas: recomendador visible antes de la lista, fuera de `.unit-path-stage`, sin solapamientos ni reserva de espacio en la geometría del camino. No cambia XP, currículo, progreso, IndexedDB, backup JSON v3 ni dependencias.
- PR #826 fusionada por squash en `main`, commit `639dc11e3c176ffeb9b9e4411dcbb8ada075aa49`. CI de PR [#45585825025](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45585825025): `test` y `Offline quality reports` success; sin reviews ni hilos pendientes. Regresión post-merge [#45586327839](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45586327839) y Pages [#45586326796](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45586326796): success.
- La prueba física en Tecno Pova 4 (720×1640) seguirá pendiente después del despliegue.
- Fuente: PR #825/#826, `index.html`, `tests/adaptive-learning.test.cjs`, pruebas E2E de fases 4 y 5B y GitHub Actions; 25 nov 2026.


## 2026-11-25 — PR #832: estabilización de prueba de teclado
- CI `45651470629`: la prueba E2E de la burbuja de traducción falló al esperar que se abriera con Enter; las otras 300 pruebas pasaron y el informe offline de calidad pasó.
- El fixture de teclado ahora inserta el botón de prueba directamente en `document.body`, con posición visible/fija e ID propio, y enfoca ese botón antes de enviar Enter. Esto evita depender de `#actionArea`, que puede no estar disponible o visible en el fixture.
- No se modificó la lógica de producción de traducción; pendiente volver a ejecutar CI y comprobar apertura con Enter, cierre con Escape y restauración del foco.


## 2026-11-25 — PR #832: activación por teclado de la burbuja de traducción
- El CI #45654312381 volvió a fallar en la prueba 112: el fixture visible y enfocado seguía sin abrir la burbuja con Enter. La prueba 113 de restauración del foco sí pasó.
- Diagnóstico en `index.html`: `initTapTranslationBubble()` solo escuchaba clics delegados para abrir la burbuja y Escape para cerrarla; no manejaba explícitamente Enter ni Espacio.
- Corrección en commit `f00571dd5f3f68c4bd949178d735d2e4d6143dd4`: el manejador de teclado detecta `.tap-translation-word`, abre con Enter/Espacio y previene la activación duplicada del botón. Se mantiene Escape con restauración de foco.
- CI nuevo #45655191461 disparado para el commit corregido; pendiente confirmar la prueba 112 y el resto de checks. No fusionar hasta CI verde.
- Fuente: inspección de `index.html`, prueba E2E fase 5B y GitHub Actions; 25 nov 2026.


## 2026-11-25 — PR #832: diagnóstico detallado de activación por teclado
- CI #45655191461 y #45655305950: la prueba 112 ya no expira; llega a la aserción y falla porque `aria-expanded` permanece en `false` aunque el host de la burbuja informa `hidden === false`. La prueba 113 continúa pasando.
- La prueba E2E se instrumentó en commit `97584242add299fd1813fae2b15dbe874aee6d87` para registrar foco activo, estado hidden, aria-expanded y botones con aria-expanded true; también comprueba que el fixture conserva el foco justo antes de pulsar Enter.
- Próximo paso: usar el estado instrumentado del CI para identificar si Enter llega al botón, si la burbuja ya estaba visible por otro flujo o si el estado accesible se desincroniza. No cambiar más producción ni relajar la prueba sin esa evidencia.
- PR #832 sigue abierta, no fusionada; CI verde requerido.
- Fuente: logs de GitHub Actions #45655191461 y #45655305950 y prueba E2E fase 5B; 25 nov 2026.


## 2026-11-25 — Actualización de hash CSS en PR #832

- La ejecución CI #45655878732 pasó las E2E de Fase 4 y el informe de calidad offline, pero se detuvo en la prueba de integridad de extracción: el hash de `styles.css` cambió de `740de7f9` a `7800ca18` por la regla intencional `[data-adaptive-recommendation][hidden] { display: none !important; }` añadida para que los hosts ocultos no reserven espacio.
- No es un cambio del currículo ni de IndexedDB; la prueba mantiene los hashes y conteos de A1/A2 y solo debe fijar el hash nuevo del CSS extraído. Se actualizó la expectativa en `tests/curriculum-extraction.test.js`, commit [5b503df](https://github.com/luisequeira612-commits/bahasa-studio/commit/5b503dff75d13eb611957bf7faeb718d1725b834).
- La ejecución anterior no llegó a las pruebas posteriores de Fase 5B porque el fallo de integridad detuvo el job; el diagnóstico instrumentado de Enter sigue pendiente de una ejecución que alcance esa prueba. PR #832 sigue abierta y no fusionada.
- Fuente: GitHub Actions #45655878732, comparación del hash de `styles.css` y diff de la prueba; 25 nov 2026.


## 2026-11-25 — Sincronización del fixture de teclado en PR #832

- CI [#45656428865](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45656428865): las 301 pruebas locales llegaron a ejecutarse; 300 pasaron y falló solo la prueba 112 de teclado por timeout esperando que la burbuja se abriera. La extracción curricular/CSS ya pasó y los informes de calidad offline también terminaron en success.
- La causa está en el orden del fixture: esperaba a que DB estuviera lista, pero eso no garantizaba que el listener de `initTapTranslationBubble()` ya se hubiera registrado. El botón sintético podía recibir Enter antes de que existiera el manejador delegado. La prueba de restauración de foco 113 pasó.
- Se añadió una espera explícita por `#tapTranslationBubble.dataset.initialized === 'true'` antes de insertar/enfocar el botón y pulsar Enter. Commit [3cca880](https://github.com/luisequeira612-commits/bahasa-studio/commit/3cca880878f9e4aac6ac17a9631ceeaff72ac5ff). No se cambió código de producción ni se relajó ninguna aserción.
- Pendiente: ejecutar CI sobre el nuevo head y comprobar si la prueba de teclado pasa; PR #832 continúa abierta y no fusionada.
- Fuente: log del job test de GitHub Actions #45656428865, líneas de test 112/113 y fixture fase 5B; 25 nov 2026.


## 2026-11-25 — PR #832: evita doble activación de la burbuja con Enter
- CI #45657511237: Fase 4, calidad offline y 300 pruebas adicionales pasaron; solo falló la E2E de teclado de la burbuja (11/12 pruebas Fase 5B).
- Diagnóstico: al pulsar Enter en un botón nativo, el manejador keydown abre la burbuja y el navegador emite después un click de teclado (detail=0). El manejador click volvía a llamar open() sobre el mismo botón, cuyo comportamiento de alternancia la cerraba inmediatamente; por eso la E2E agotaba el tiempo esperando hidden=false.
- Corrección en commit 6122b00b5a0b7daeb839d735c3c4875f3f441372: el click de teclado generado tras una apertura por keydown ya no alterna/cierra la burbuja; el click de puntero mantiene el comportamiento de alternancia. Pendiente CI completo, Escape y restauración de foco.
- Fuente: log de GitHub Actions #45657511237 y función initTapTranslationBubble() en index.html; 25 nov 2026.

## 2026-11-25 — PR #832: instrumentación de la activación por teclado
- CI [#45658823373](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45658823373): Fase 4 pasó y el informe offline pasó; las pruebas locales terminaron con 300/301. La única falla volvió a ser la E2E 112 de la burbuja: timeout esperando que `#tapTranslationBubble.hidden` cambiara a false. Fase 5B posterior quedó omitida por el fallo.
- El cambio de doble activación de Enter del commit `6122b00` no resolvió todavía el timeout; por eso no se fusiona. La prueba 113 de restauración de foco pasó.
- En commit `c53eb16` se reemplazó la espera opaca de 30 s por instrumentación temporal que registra keydown/click capturados, foco, estado aria/hidden y errores JS; el objetivo es distinguir si Playwright emite Enter, si el listener recibe el evento o si el handler falla. No se cambió la lógica de producción.
- Pendiente CI nuevo para leer el diagnóstico antes de tocar producción. PR #832 sigue abierta y no fusionada.
- Fuente: log del job test #139362754918 (run #45658823373), prueba `tests/learning-screen-phase-5b.e2e.test.cjs` y commit `c53eb1669573f85aa83826ee302dce573b139257`; 25 nov 2026.

## 2026-11-25 — PR #832: corrige prioridad SRS y teclado de burbuja
- CI #45661003146 pasó Fase 4 y calidad offline, pero falló en dos pruebas de Fase 5B (112 y 117); Fase 5B y pruebas finales se omitieron.
- Diagnóstico 112: el evento Enter sí alcanza el documento (foco correcto, listener inicializado y sin errores JS), pero el handler delegado de teclado en fase bubble no abre la burbuja. Se cambia el listener a fase capture para que la activación accesible no dependa de que otro listener detenga propagación. La prueba conserva sus aserciones de apertura, aria-expanded y Escape.
- Diagnóstico 117: la tarjeta SRS se ocultaba si el recomendador general elegía una acción distinta de review aunque existieran palabras vencidas; además el botón heredaba esa acción. La tarjeta SRS ahora depende de que haya vencimientos y fuerza la acción review, manteniendo la recomendación adaptativa independiente oculta mientras el SRS sea prioritario.
- Cambios limitados a `index.html`; no se modifican algoritmo adaptativo, XP, currículo, IndexedDB v1, backup JSON v3 ni dependencias. Pendiente CI completo y verificación manual; PR #832 permanece abierta.
- Fuente: logs del job test de GitHub Actions #45661003146 (fallos 112/117), código `initTapTranslationBubble()` y `renderAdaptiveRecommendation()`; 25 nov 2026.


## 2026-11-25 — PR #832: sincroniza prueba de prioridad SRS
- CI [#45662198111](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45662198111): Fase 4 y pruebas locales de calidad pasaron; falló el test 46 de `tests/adaptive-learning.test.cjs` porque aún exigía la condición antigua `reviewCount === 0 || recommendation.action !== 'review'`.
- La implementación nueva muestra la tarjeta SRS siempre que `reviewCount > 0`, independiente de la recomendación general, y fuerza la acción `review` para esa tarjeta. Se actualizó el test para comprobar explícitamente ambas condiciones y que el botón inicia `srs`; no se eliminó ninguna comprobación funcional.
- Commit de prueba: [737b0e0](https://github.com/luisequeira612-commits/bahasa-studio/commit/737b0e0da415b66eb8903cf5e6271a8f3ebb7529). Pendiente nuevo CI, especialmente las pruebas 112/117 de Fase 5B. PR #832 sigue abierta y no fusionada.
- Fuente: log del job test de GitHub Actions #45662198111 y comparación de la aserción con `renderAdaptiveRecommendation()`; 25 nov 2026.


## 2026-11-25 — PR #832: adelanta la captura del teclado de la burbuja
- CI #45663123141 volvió a fallar únicamente en la prueba 112: el evento Enter se registra en el documento, el botón conserva el foco, la burbuja sigue oculta y no hay errores JavaScript. La corrección previa que puso el listener de `keydown` en captura de `document` no bastó.
- Inspección del código completo de `initTapTranslationBubble()`: el listener delegado seguía en `document` capture. Se mueve a `window` capture para ejecutarlo antes de los listeners de captura del documento que podrían detener la propagación. Se conservan apertura, `aria-expanded`, Escape y restauración de foco; no se relajan aserciones.
- Commit: [9ca95d2](https://github.com/luisequeira612-commits/bahasa-studio/commit/9ca95d20e608927c3166214910356573c7e42200). Pendiente CI nuevo, especialmente pruebas 112 y 117, Fase 5B y E2E final. PR #832 continúa abierta y sin fusionar.
- Fuente: logs del job test #139377986951 (run #45663123141), código de `index.html` y commit 9ca95d2; 25 nov 2026.


## 2026-11-25 — PR #833: detecta cierre posterior a la apertura de la burbuja
- La repetición del job de calidad #45673026022 falló en el test 112 (300/301 pruebas pasaron). La traza ya muestra la secuencia: `Enter` llega a `window-keydown-after-app` con `defaultPrevented=true`, burbuja visible y `aria-expanded=true`; después de esperar 150 ms, la burbuja vuelve a `hidden=true` y `aria-expanded=false`. No hubo errores JS. Esto prueba que el manejador abre y algo posterior la cierra; la causa todavía no está identificada.
- Se amplió únicamente la instrumentación E2E en `tests/learning-screen-phase-5b.e2e.test.cjs` para registrar mutaciones de `hidden`/`aria-expanded`, `scroll`, `resize`, `pointerdown` y `click` con marcas de tiempo. No se tocó producción ni se relajaron aserciones.
- Nuevo commit diagnóstico: `356425b81a5386e654acdf6f02661bcad2b47635`. Pendiente CI para identificar qué evento/handler provoca el cierre. PR #833 permanece abierta y no fusionada.
- Fuente: log del job test #139415663217 (run #45673026022), prueba 112 y commit `356425b`; 25 nov 2026.


## 2026-11-25 — Corrección pedagógica acotada de A1 U4
- Auditoría contextual de U4 detectó que la lección 1, dedicada a los números 1–3, mostraba «Tiga tahun» y el modelo «Saya berumur lima tahun» antes de introducir tahun, umur y lima. Se sustituyó ese ejemplo prematuro por «Tiga buku», usando vocabulario ya conocido y los números de la lección. Se conservó el tipo de ejercicio de traducción para no alterar el inventario de ejercicios escritos ni sus métricas.
- Se alinearon los objetivos de las lecciones 3 y 4 con sus vocabularios reales: L3 presenta cuatro, cinco, diez y edad; L4 introduce seis, siete y ocho.
- Se añadió una regresión en tests/a1-curriculum-progression.test.cjs para impedir que la L1 vuelva a mostrar esos términos de edad antes de su introducción y para comprobar la coherencia de los objetivos.
- Alcance: solo currículo A1 U4, prueba específica y MEMORY.md. Sin cambios de runtime, IndexedDB v1, backup JSON v3, dependencias ni otras unidades. Esta corrección mejora la secuencia didáctica; no constituye certificación lingüística del indonesio.
- Fuente: revisión directa de curriculum-a1.js (A1 U4, lecciones 1–4) y test de progresión A1; 25 nov 2026.

- Seguimiento CI 26 nov: la primera ejecución mostró que también debía actualizarse el ejemplo de la ficha de vocabulario «Tiga» y que la prueba histórica de regresión esperaba «Tiga tahun». Se ajustaron ambos ejemplos y sus aserciones, conservando la cantidad y los tipos de ejercicios escritos; la corrección queda pendiente de CI verde.

- Ajuste adicional tras CI: los ejemplos de traducción se mantienen en el texto de audio ya disponible («Tiga»), porque añadir una frase nueva exigiría ampliar el índice/archivos de audio. Se sincronizó el tracker A1 U1–U23 con el ejemplo de vocabulario corregido. Sin generar ni añadir audios.

- Revisión de CI 26 nov: se detectó una segunda copia de la traducción «Tiga buku» en la lección y se normalizó también a «Tiga», que ya tiene audio indexado. Se mantienen los tipos de ejercicios escritos y el tracker actualizado.

- La ejecución #45729586124 pasó regresión, audio manifest y pruebas locales; falló la prueba de integridad porque A1 usa un hash canónico fijado. Se actualizó la huella esperada de A1 de 08fc090e a ecbf3fb1 (valor real del currículo revisado), sin alterar estructura ni conteos; queda pendiente nueva ejecución completa.

 
## 2026-11-26 — Corrección acotada de secuencia en A1 U8
- Auditoría contextual confirmó que U8 L1 usaba «Hari ini saya belajar» en el ejemplo de Hari/Hari ini y en un ejercicio de escucha antes de introducir Belajar en L2. Se cambia el ejemplo a «Hari» / «Hari ini» y el audio de L1 a «Hari ini», con opciones/explicación acordes.
- El ejemplo de Tidur y el modelo de escritura de repaso usaban «malam», vocabulario de U11; se cambian a «Tidur» y «Saya tidur.».
- Se añade regresión específica para impedir el uso de Belajar en L1 y Malam en el modelo de U8. Se sincronizan las tres filas de U8 en el tracker A1 U1–U23.
- Alcance: currículo A1 U8, pruebas, tracker y MEMORY.md. Sin cambios de runtime, IndexedDB v1, backup JSON v3, dependencias ni nuevos audios. Revisión pedagógica contextual, no certificación lingüística.
- Fuente: artefacto curriculum-quality-report del run #45730229191 (paths A1.units[7].vocab[0], vocab[1], vocab[4], lessons[0].exercises[2], lessons[4].exercises[4]); inspección directa de U8 y audio/index.json; 26 nov 2026.

- Seguimiento de U8: las pruebas de audio/regresión se alinean con el texto «Hari ini» (ya indexado), sin agregar nuevas frases al manifiesto. Se valida además que la primera lección no contenga Belajar y que el modelo de Tidur no use Malam.

- CI de PR #843 detectó que al reutilizar «Hari ini» (ya presente en el manifiesto base) cambia la contabilidad de cobertura interactiva: 29 textos estáticos cubiertos y 67 clips faltantes, en vez de 28/68. Se actualizan las expectativas del test de cobertura; no se generan clips nuevos.

- Corrección final del test de audio: además del texto descriptivo, la aserción numérica debía pasar de 28 a 29 textos cubiertos; se corrigió el valor esperado. La distribución de clips faltantes permanece en 15/67.

- Hash canónico A1 recalculado directamente desde el objeto curricular actualizado: `0ddebdf3` (FNV-1a de `JSON.stringify(BAHASA_CURRICULUM_A1)`). Se actualiza la aserción de integridad para la nueva revisión de U8.

- Se alineó también el valor numérico de la aserción de clips interactivos añadidos: 67 (antes seguía fijado en 68 aunque el desglose ya sumaba 67).


- Seguimiento A1 U8 (26 nov 2026): se detectó además que el modelo de rutina «Saya makan pagi» adelantaba `pagi`, introducido en U11. Se simplificaron las dos copias del ejercicio a «Saya makan» y se añadió una prueba específica para impedir que U8 vuelva a usar `pagi`. No se modificó el inventario ni el tipo de ejercicios, audio, runtime, IndexedDB v1, backup JSON v3 o dependencias. Fuente: inspección de las dos copias en currículo de U8 y prueba de regresión.


- Ajuste posterior al primer CI de A1 U8 (26 nov 2026): la guardia detectó que el enunciado «Completa: ___ saya belajar» aún adelantaba `belajar` en L1, aunque el audio del mismo ejercicio solo decía «Hari ini». Se cambió el enunciado por «Elige la expresión que significa «hoy»», conservando opciones, respuesta, tipo y objetivo. El fallo era de contenido de la prueba, no de runtime. CI anterior #45731821903 falló únicamente en esta aserción de secuencia; el informe de calidad offline pasó.

- CI #45731821903 encontró una aparición residual de `belajar` en el enunciado de completar de U8 L1 («Completa: ___ saya belajar»). Se cambió por «Completa: ___ (Hoy)» en las copias de unidad y lección para no adelantar el verbo antes de L2.

- Hash canónico A1 recalculado tras retirar el último prompt con `belajar` de U8 L1: `21df8122` (FNV-1a sobre JSON.stringify del objeto A1).

- Ajuste de coherencia con el ejercicio de unidad U8: el prompt de L1 se iguala a «Elige la expresión que significa «hoy»», el mismo ejercicio de la unidad, evitando la aparición de Belajar y preservando la identidad/multiplicidad de los ejercicios originales.

- Hash canónico A1 actualizado tras alinear el prompt de U8 L1 con su ejercicio de unidad: `6f029e43`.

## 2026-11-26 — Corrección editorial de objetivos A1 U9–U11

- La auditoría detectó nueve objetivos con construcciones incompletas en español: «Aprende a números», «Aprende a del 19 al 100», «Aprende a decenas», «Aprende a dinero», «Aprende a miles», «Aprende a comprar» y «Aprende a preguntar». Se reformularon para describir con claridad el contenido de cada lección. La búsqueda ampliada detectó además dos objetivos de U11 («partes del día» y «minutos y momentos») con el mismo defecto; se corrigieron en esta misma PR. Los objetivos «decir la hora» y «ubicar actividades en el tiempo» se conservaron porque sí están bien construidos.
- Se añadió una regresión que fija los once objetivos corregidos y evita que reaparezcan esas construcciones. No se cambian vocabulario indonesio, ejercicios, secuencia, runtime, IndexedDB v1, backup JSON v3 ni dependencias. La prueba de integridad detectó el nuevo hash canónico A1 y se actualizó su valor fijado de `52124a59` a `b5ad5326`, conservando la aserción estricta y los recuentos.
- Fuente: auditoría directa de A1 U9/U10 en `curriculum-a1.js` y prueba en `tests/a1-curriculum-progression.test.cjs`; 26 nov 2026.

## 2026-11-26 — E2E de alcance de sesión de refuerzo SRS

- Se añade una prueba Chromium para verificar el recorrido real del botón «Practicar estas palabras»: dos palabras débiles recomendadas se marcan para repaso y la sesión contiene exclusivamente sus IDs.
- La prueba inserta además una tercera palabra con repaso vencido después de renderizar la recomendación, para comprobar que la sesión de refuerzo no absorbe repasos ajenos a la selección recomendada.
- Cambio solo en pruebas y memoria. No modifica runtime, currículo, IndexedDB v1, backup JSON v3 ni dependencias.
- Fuente: `tests/learning-screen-phase-5b.e2e.test.cjs`, inspección de `SRSEngine.startSession()`/`markForReview()` en `index.html` y pendiente de consolidación SRS en Notion; 26 nov 2026.

- Corrección CI 26 nov 2026: el primer intento de la nueva E2E falló en su preparación de datos porque asumía que todas las entradas tenían `text`; el vocabulario contiene formas sin ese campo. El selector de la tercera palabra se cambió a IDs canónicos distintos, sin depender del texto.
- Validación final CI: run [45752936698](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45752936698) terminó en success. Job `test`: 103/103 pasos; `Offline quality reports`: 10/10. Pasaron la E2E de alcance de sesión de refuerzo, E2E de navegador real, pruebas de evaluación y accesibilidad móvil. PR #849 lista para integrar; 26 nov 2026.


## 2026-11-26 — Persistencia de la última calificación SRS

- Se refuerza la prueba funcional de `SRSEngine.recordAttempt()` para comprobar que las calificaciones correctas e incorrectas persisten `lastQuality`, limpian `savedForReview` y actualizan `markedAt`; son los campos que consume el recomendador para decidir si una palabra sigue necesitando refuerzo.
- La regresión post-merge de PR #849 terminó en success: run [#45754296815](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45754296815), `test` 103/103 y calidad offline 10/10. Pages [#45754296021](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/45754296021) completó build y deploy en success. PR #849 está integrada en `main`.
- Este refuerzo es exclusivamente de pruebas y documentación; no cambia runtime, currículo, IndexedDB v1, backup JSON v3 ni dependencias.
- Fuente: `tests/regression.test.cjs`, PR #849 y GitHub Actions #45754296815/#45754296021; 26 nov 2026.


## 2026-11-26 — Selector de lecciones para repasar unidades completadas

- El panel de una unidad completada ahora muestra botones para abrir directamente cualquiera de sus lecciones ya completadas; deja de forzar «Repasar lección 1». La selección conserva el progreso y reutiliza la ruta existente de `LessonEngine.startUnitById`, sin cambios de esquema ni dependencias.
- Se corrigió la cadena HTML de la acción de inicio para conservar el escape de comillas del manejador inline en unidades incompletas; la validación de sintaxis del HTML/JS debe confirmarse con las pruebas de navegador.
- Se añadió E2E Chromium para A1 Unidad 3: comprueba que aparecen sus cinco lecciones, abre directamente la quinta y verifica que el progreso completado permanece intacto. Fuente: `index.html` y `tests/learning-screen-phase-5b.e2e.test.cjs`; 26 nov 2026.


## 2026-11-26 — Alineación de la política adaptativa con la prioridad de evaluaciones
- La revisión cruzada de `adaptive-learning.js`, `tests/adaptive-learning.test.cjs` y `docs/ADAPTIVE_LEARNING_RECOMMENDATION_POLICY.md` encontró que el documento omitía las evaluaciones finales pendientes de unidad. El código ya las prioriza después de los repasos vencidos y antes de los refuerzos de palabras; se actualizó la política para reflejar el comportamiento real y describir por separado la conversación dirigida y la conversación general.
- Cambio documental únicamente: no se alteran el recomendador, el motor SM-2, el currículo, IndexedDB ni el backup JSON v3. La prioridad existente está cubierta por pruebas unitarias; esta actualización elimina la discrepancia entre implementación y documentación.
- Fuente: inspección directa de `adaptive-learning.js`, `tests/adaptive-learning.test.cjs` y política adaptativa; 26 nov 2026.


## 2026-11-26 — PT-BR B2, bloque U4–U6 en preparación

- Se inicia el segundo bloque del currículo B2 en la rama `feat/pt-br-b2-u04-u06`, continuando el roadmap reconstruido de 40 unidades.
- U4: nominalización y densidad informativa; U5: voz pasiva y enfoque informativo; U6: oraciones relativas complejas. El bloque añade 15 lecciones y 30 entradas nuevas (10 por unidad), con dos objetivos léxicos por lección, ejemplos PT-BR y explicaciones en español.
- El manifiesto interno B2 amplía las unidades publicadas de [1,2,3] a [1,2,3,4,5,6], manteniendo `totalUnits:40` y `pt-BR available:false`. B2 no se habilita en el selector.
- El Service Worker precarga U4–U6 y cambia la caché app-shell a `bahasa-studio-v3.8.154`; se actualizaron las aserciones de caché de pruebas PT-BR afectadas.
- Se amplían los contratos de currículo y la E2E Chromium para comprobar U1–U6 en modo offline, cinco lecciones por unidad, 10 entradas, dos vocablos por lección, referencias A2, ausencia de duplicados normalizados A1–B1 y estado `not_checked`.
- Todas las entradas nuevas siguen `not_checked`. La estructura y coherencia interna de las explicaciones no certifican naturalidad, uso nativo ni nivel MCER. No se modifican IndexedDB v1, backup JSON v3, dependencias ni audio.
- Estado al registrar: cambios de contenido, manifiesto, precarga, pruebas y documentación en curso; pendiente ejecutar CI completo y revisar resultados antes de fusionar.
- Fuente: rama `feat/pt-br-b2-u04-u06`, roadmap B2 y contratos curriculares; 26 nov 2026.

- Revisión editorial interna previa al cierre: en U6 L1 se ajustó la entrada `cujo parecer` a `cujo conteúdo` para que la expresión objetivo coincida literalmente con el ejemplo; la explicación gramatical se alineó con el cambio. Corrección en commit `9dd8487558f496450416fbb423e1ff0d73032e1a`. La validación CI debe ejecutarse sobre este head actualizado.

- Corrección tras el primer CI del bloque: la prueba detectó tres referencias A2 fuera del rango de IDs existente (U24 v11–v13) y una explicación U5 L3 que no nombraba explícitamente `é regulamentado`. Se sustituyeron por IDs A2 existentes y se completó la explicación. El contrato estructural había pasado para la carga offline; la regresión local falló únicamente en esos dos controles. Revalidar el head actualizado antes de integrar.

- Segundo CI del head `1331cd6b...`: las referencias A2 y U5 L3 ya pasaron; quedó un último fallo de contrato en U6 L2 porque la explicación todavía mencionaba la formulación anterior `por meio do qual`. Se alineó literalmente con el objetivo `por intermédio do qual` en el commit `0f19082f0f0fedfc4043c1e7c024443dec2871f6`. El nuevo head debe volver a pasar el CI completo.

- Tercer CI del head `75350e83...`: las referencias A2, U5 L3 y U6 L2 pasaron; quedó un último desajuste entre el objetivo de U6 L5 (`para a qual`) y la entrada, que aún decía `para quem`. Se alineó la entrada y el ejemplo con `para a qual` en el commit `034451867ed615eca483b8cf8134eb7a69cf20a1`. Volver a ejecutar el CI completo sobre el nuevo head.


## 2026-11-26 — Cierre PT-BR B2 U4–U6 (PR #860)

- PR #860 fusionada por squash en `main`, commit `bd9bf1dc25766fb920eadc98b73449f9dd49158f`. El head definitivo `69ae5ce94a71e6743cfc790004cce766e9b0b048` pasó regresión #45860996744 (103 pasos del job, incluidos tests locales y E2E Chromium; 10/10 calidad offline) y typecheck #45860996535 success.
- Post-merge: regresión #45861444954 success (102 pasos completados, sin fallos; Offline quality reports 10/10); TypeScript #45861444947 success; GitHub Pages #45861442767 completó build, deploy y report-build-status en success.
- U4 nominalización/densidad informativa, U5 voz pasiva/enfoque informativo y U6 relativas complejas: 15 lecciones y 30 entradas. El manifiesto B2 de PT-BR declara 40 unidades y publica internamente U1–U6; Service Worker cache v3.8.154.
- Todas las entradas B2 nuevas permanecen `not_checked`. PT-BR continúa `available:false`; el curso no está habilitado en el selector y no se afirma certificación nativa ni MCER. El roadmap de 40 unidades sigue siendo reconstrucción explícita, no recuperación literal del temario anterior.
- No se modificaron IndexedDB v1, backup JSON v3, dependencias ni audio. Próximo bloque planificado: U7–U9.
- Fuente: PR #860, merge commit y GitHub Actions #45860996744/#45860996535/#45861444947/#45861444954/#45861442767; 26 nov 2026.


## 2026-11-26 — PT-BR B2, bloque U7–U9 en desarrollo

- Se abrió la rama \`feat/pt-br-b2-u07-u09\` desde el \`main\` posterior al cierre de PR #860.
- U7 desarrolla el subjuntivo en construcciones de valoración, duda y emoción; U8 trabaja condicionales irreales y escenarios alternativos; U9 desarrolla discurso indirecto, atribución y perspectiva.
- El bloque incorpora 15 lecciones y 30 entradas (10 por unidad, dos objetivos léxicos por lección), con ejemplos PT-BR, explicaciones en español y ejercicios de opción múltiple. Todas las entradas nuevas permanecen \`not_checked\`.
- El manifiesto interno B2 se amplía a U1–U9 de 40; el Service Worker precarga el bloque nuevo y actualiza la caché app-shell a v3.8.155.
- Las pruebas añadidas cubren estructura de U7–U9, términos explicados literalmente, referencias A2, duplicados normalizados contra A1–B1 y B2 anterior, estado de disponibilidad y carga offline Chromium hasta U9.
- PT-BR continúa \`available:false\`; el curso B2 no se habilita en el selector. No se modifican IndexedDB v1, backup JSON v3, dependencias ni audio. El temario continúa siendo una reconstrucción provisional, no certificación MCER ni revisión nativa.
- Estado: código y pruebas añadidos; falta completar CI, revisar resultados y fusionar solo cuando todo esté verde.
- Fuente: rama \`feat/pt-br-b2-u07-u09\`, \`docs/PT_BR_B2_ROADMAP.md\`, archivos de currículo y pruebas; 26 nov 2026.

- Ajuste de contrato antes de cerrar CI: la prueba histórica \`pt-br-curriculum-b2-u01-u03.test.cjs\` todavía esperaba el manifiesto U1–U6. Se actualizó para aceptar U1–U9 y comprobar el tercer bloque. Commit de corrección: \`a72ccfef149233682a3c4ddf1566eff0f72b8218\`; el CI debe repetirse sobre este head.

- Primer CI del head previo: falló el contrato local en 23 aserciones de caché de pruebas PT-BR A2/B1/B2/A1, que aún esperaban v3.8.154 tras el cambio intencional del Service Worker a v3.8.155. No fueron fallos del currículo ni de Chromium. Se actualizaron las expectativas de esas pruebas y el contrato B2 previo para reconocer el bloque U7–U9. Revalidar el head final.


## 2026-11-26 — PT-BR B2 U7–U9: revisión CI inicial

- El bloque U7–U9 contiene 15 lecciones y 30 entradas: U7 subjuntivo en valoración/duda/emoción; U8 condicionales irreales y escenarios alternativos; U9 discurso indirecto, atribución y perspectiva.
- Manifiesto B2 interno: 40 unidades totales, U1–U9 publicadas en tres bloques; PT-BR sigue `available:false`.
- Service Worker actualizado a caché v3.8.155 con precarga del bloque U7–U9. Se actualizaron las aserciones de caché de pruebas PT-BR A2/B1 y los contratos B2 anteriores.
- El head `a33499d4e3ff836b89a34653f04f15d92e832f88` pasó regresión #45863016339 (test 103/103, offline quality 10/10) y TypeScript #45863017397 success.
- Las pruebas cubren referencias A2 existentes, explicaciones literales por lección, duplicados normalizados frente a A1–B1 y B2 U1–U6, estado `not_checked`, disponibilidad false y carga offline Chromium hasta U9.
- Todas las entradas permanecen `not_checked`; no se afirma certificación nativa ni equivalencia MCER. No se modifican IndexedDB v1, backup JSON v3, dependencias ni audio.
- Estado: bloque implementado y validado inicialmente; pendiente abrir PR, ejecutar CI sobre el head definitivo y fusionar solo si sigue verde.
- Fuente: rama `feat/pt-br-b2-u07-u09`, GitHub Actions #45863016339/#45863017397 y roadmap B2; 26 nov 2026.


## 2026-11-26 — Cierre PT-BR B2 U7–U9 (PR #861)

- PR #861 fusionada por squash en main, commit 5be44b294b38ce4968a788a2594a388bc1444c78. Head definitivo 8119b06953adb4442464632c8d0c401f2c506bd1 pasó regresión #45863482087 (103/103 pasos, E2E Chromium y calidad offline 10/10) y TypeScript #45863482277 success.
- Post-merge: Pages #45863933756 completó build, report-build-status y deploy en success; TypeScript #45863935096 success. La primera regresión #45863934940 falló por timeout intermitente en una prueba existente de tarjeta SRS de Aprender (selector #adaptiveRecommendationLearn button); el rerun del job fallido terminó success (102 pasos completados, sin fallos), así que se clasifica como flaky y no como regresión del currículo.
- U7 subjuntivo en valoración/duda/emoción; U8 condicionales irreales/escenarios alternativos; U9 discurso indirecto/atribución/perspectiva. Se añaden 15 lecciones y 30 entradas. El manifiesto PT-BR B2 declara 40 unidades y publica internamente U1–U9; Service Worker cache v3.8.155.
- Las entradas nuevas siguen not_checked. PT-BR permanece available:false; B2 no se habilita en el selector. El roadmap es reconstruido, no una certificación MCER ni validación nativa. Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio.
- Próximo bloque planificado: U10–U12.
- Fuente: PR #861, merge commit y Actions #45863482087/#45863482277/#45863934940/#45863935096/#45863933756; 26 nov 2026.


## 2026-11-26 — PT-BR B2 U10–U12 en preparación

- Se inicia el cuarto bloque del currículo B2: U10 cohesión/progresión temática; U11 reformulación/precisión discursiva; U12 comparación matizada.
- Añade 15 lecciones y 30 entradas (10 por unidad, dos objetivos léxicos por lección), con ejemplos PT-BR y explicaciones en español. Entradas nuevas permanecen `not_checked`.
- Manifiesto B2 mantiene 40 unidades y publica internamente U1–U12 en cuatro bloques; PT-BR sigue `available:false`.
- Service Worker precarga U10–U12 y avanza caché app-shell a v3.8.156. Se actualizan pruebas de caché PT-BR A2/B1 y contratos B2 previos.
- Contratos nuevos cubren U10–U12, referencias A2, explicación literal por lección, duplicados normalizados contra A1–B1 y B2 U1–U9, disponibilidad false y carga offline Chromium hasta U12.
- Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio. No afirmar naturalidad certificada ni equivalencia MCER.
- PR [#862](https://github.com/luisequeira612-commits/bahasa-studio/pull/862) fusionada por squash en `main`, merge commit `82d7ad9f98a572a30ff85499192b58bb6b63a23d`. CI del head `0a9b545e`: regresión #45865795579 success (103/103 pasos, E2E Chromium y calidad offline 10/10); TypeScript #45865795716 success. Sin comentarios ni revisiones pendientes.
- U10 cohesión/progresión temática; U11 reformulación/precisión discursiva; U12 comparación matizada. El bloque añade 15 lecciones y 30 entradas; manifiesto interno B2 publica U1–U12 de 40 y Service Worker usa caché v3.8.156.
- Todas las entradas nuevas siguen `not_checked`; PT-BR permanece `available:false` y B2 deshabilitado en el selector. No hay cambios a IndexedDB v1, backup JSON v3, dependencias ni audio.
- Post-merge: regresión #45866235167 success (102 pasos completados, sin fallos; Offline quality reports 10/10); TypeScript #45866235250 success. El primer Pages #45866234742 fue cancelado al coincidir con un nuevo push documental; la ejecución posterior #45866347570 completó build, report-build-status y deploy en success. El commit documental `68d7d5a4f6c1049af791ed5e26775fb744519663` también pasó regresión #45866348674 (102 pasos completados, sin fallos; Offline quality 10/10), TypeScript #45866348659 y Pages #45866347570 success.
- Fuente: PR #862, merge commit y Actions #45865795579/#45865795716; 26 nov 2026.


## 2026-11-26 — PT-BR B2 U13–U15 en preparación

- Se inicia el quinto bloque B2: U13 causa/consecuencia/finalidad en registro formal; U14 participios y construcciones resultativas; U15 gerundio y relaciones entre acciones.
- Añade 15 lecciones y 30 entradas (10 por unidad, dos objetivos por lección), con ejemplos PT-BR y explicaciones en español. Entradas nuevas `not_checked`.
- Manifiesto B2 mantiene 40 unidades y publica internamente U1–U15 en cinco bloques; PT-BR sigue `available:false`.
- Service Worker precarga U13–U15 y avanza caché app-shell a v3.8.157. Se actualizan aserciones de caché PT-BR A2/B1 y contratos B2 anteriores; E2E Chromium extiende cobertura offline hasta U15.
- Contratos nuevos cubren referencias A2, explicaciones literales por lección, duplicados normalizados contra A1–B1 y B2 U1–U12, disponibilidad false y carga offline.
- Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio. No afirmar certificación nativa ni equivalencia MCER.
- PR [#863](https://github.com/luisequeira612-commits/bahasa-studio/pull/863) fusionada por squash en `main`, merge commit `e4f7df79e7cb08fa9bbea201b33e1295391cbf72`. Head `5846d0de526aa2feb502255386f7357a04788118` pasó regresión #45867608981 (103/103 pasos; Offline quality reports 10/10) y TypeScript #45867609244 success. Sin comentarios ni revisiones pendientes.
- U13 causa/consecuencia/finalidad en registro formal; U14 participios y construcciones resultativas; U15 gerundio y relaciones entre acciones. El bloque añade 15 lecciones y 30 entradas; manifiesto interno B2 publica U1–U15 de 40 y Service Worker usa caché v3.8.157.
- Entradas nuevas permanecen `not_checked`; PT-BR continúa `available:false` y B2 no se habilita en selector. No se modifican IndexedDB v1, backup JSON v3, dependencias ni audio.
- Post-merge: regresión #45868028303 success (102 pasos completados, sin fallos; Offline quality reports 10/10); TypeScript #45868028265 success; GitHub Pages #45868027684 completó build, report-build-status y deploy en success.
- Fuente: PR #863, merge commit y Actions #45867608981/#45867609244; 26 nov 2026.


## 2026-11-26 — PT-BR B2 U16–U18 fusionadas

- Sexto bloque B2: U16 verbos pronominales y matices aspectuales; U17 perífrasis verbales y modalidad; U18 colocaciones verbo-nominales.
- Añade 15 lecciones y 30 entradas (10 por unidad, dos objetivos por lección), con ejemplos PT-BR y explicaciones en español. Entradas nuevas `not_checked`.
- Manifiesto B2 mantiene 40 unidades y publica internamente U1–U18; PT-BR sigue `available:false`.
- Service Worker precarga U16–U18 y usa caché app-shell v3.8.158. Se actualizan pruebas de caché A1/A2/B1/B2 y E2E Chromium offline hasta U18.
- Pruebas verifican estructura, explicaciones por lección, referencias A2, duplicados normalizados contra A1–B1 y B2 U1–U15, disponibilidad false y carga offline.
- Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio. No afirmar naturalidad certificada ni equivalencia MCER.
- Primera ejecución CI #45869861647 encontró un fallo E2E de registro del bloque; corregido en `74ccde7f48836c0aedc6df9320e458d763fdc756`.
- PR [#864](https://github.com/luisequeira612-commits/bahasa-studio/pull/864) fusionada por squash en `main`, merge commit `fc0c849544c9d922f6973cc10197f32f496e3e17`. Head `0572fff76766cfb48551075ad44e020783a70373` pasó regresión #45870221660 (103/103 pasos; Offline quality reports 10/10) y TypeScript #45870221604 success. Sin comentarios ni revisiones pendientes.
- Validación post-merge de Pages aún no confirmada por separado. PR cerrada como merged; manifiesto y Service Worker confirmados en `main`.
- Fuente: PR #864, merge commit y Actions #45870221660/#45870221604; 26 nov 2026.


## 2026-11-26 — PT-BR B2 U19–U21 fusionadas

- U19 derivación y familias léxicas; U20 expresiones idiomáticas y uso contextual; U21 debate público y negociación avanzada.
- Añade 15 lecciones y 30 entradas (10 por unidad, dos objetivos por lección), ejemplos PT-BR, explicaciones en español y ejercicios de opción múltiple. Vocabulario nuevo en estado `not_checked`.
- Manifiesto B2 mantiene 40 unidades y publica internamente U1–U21. Service Worker precarga U19–U21 y usa caché app-shell v3.8.159.
- PR [#865](https://github.com/luisequeira612-commits/bahasa-studio/pull/865) fusionada por squash en `main`, merge commit `a22321c555941a2113c43961e06618d64e7b515d`; head `07fbb2387bf17476f74b4a5c4081dba1970b4820`.
- CI del head: regresión #45871604649 success (103/103 pasos; E2E Chromium y accesibilidad móvil incluidos), Offline quality reports 10/10; TypeScript #45871604665 success (8/8). Sin comentarios ni revisiones pendientes.
- Confirmado en `main`: manifiesto U1–U21 y Service Worker v3.8.159 con precarga del bloque. Runs post-merge/Pages no devuelven resultados para el merge commit, por lo que el despliegue no se declara verificado.
- PT-BR sigue `available:false`; B2 continúa deshabilitado en selector. Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio. No afirmar certificación nativa ni equivalencia MCER.
- Fuente: PR #865, merge commit y Actions #45871604649/#45871604665; 26 nov 2026.

## 2026-11-26 — PT-BR B2 U22–U24 fusionadas

- U22 registro académico y profesional; U23 correspondencia formal y reclamaciones; U24 presentaciones y entrevistas extensas.
- Añade 15 lecciones y 30 entradas (10 por unidad, dos objetivos por lección), ejemplos PT-BR, explicaciones en español y ejercicios vinculados a frases completas. Entradas nuevas en estado `not_checked`.
- PR [#866](https://github.com/luisequeira612-commits/bahasa-studio/pull/866) fusionada por squash en `main`, merge commit `b4583e59632d459a6002a4f9def58ea25581efac`; head `f8b21e20c10cdee70b8ad9015b9b163f29b4b66b`.
- CI del head: regresión #45873979960 success (103/103 pasos, E2E Chromium offline hasta B2 U24 y accesibilidad móvil incluidos), Offline quality reports 10/10; TypeScript #45873976470 success (8/8). Sin comentarios ni revisiones pendientes.
- Confirmado en `main`: manifiesto B2 publica internamente U1–U24 de 40; Service Worker precarga U22–U24, caché app-shell v3.8.160. Pruebas estructurales, referencias A2, ausencia de duplicados normalizados y carga offline incluidas.
- PT-BR sigue `available:false`; B2 continúa deshabilitado en selector. Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio. No afirmar certificación nativa ni equivalencia MCER.
- Runs post-merge/Pages no devuelven resultados para el merge commit; despliegue no declarado verificado.
- Fuente: PR #866, merge commit y Actions #45873979960/#45873976470; 26 nov 2026.

## 2026-11-26 — PT-BR B2 U25–U27 fusionadas

- U25 narrativa compleja y perspectiva (focalización, narrador no fiable, retrospectiva, anticipación y subtramas); U26 crónica y reportaje (apuração, verificación cruzada, testimonios, contexto y enfoque editorial); U27 datos, tendencias y cautela estadística (series históricas, margen de error, correlación/causalidad, proyecciones y subregistro).
- Añade 15 lecciones y 30 entradas nuevas (10 por unidad, dos objetivos por lección), ejemplos PT-BR, explicaciones en español y ejercicios vinculados a vocabulario. Entradas nuevas en estado `not_checked`.
- PR [#867](https://github.com/luisequeira612-commits/bahasa-studio/pull/867) fusionada por squash en `main`, merge commit `aaf432d26eef37fd98cb639ca814840789306347`; head `1eeab08d5fbad636fad2add045cca0d873998dc0`.
- CI del head: regresión #45875348243 success (103/103 pasos; E2E Chromium offline hasta B2 U27 y accesibilidad móvil incluidos), Offline quality reports 10/10; TypeScript #45875348223 success (8/8).
- Confirmado en `main`: manifiesto interno B2 publica U1–U27 de 40 unidades en nueve bloques. Service Worker precarga U25–U27, caché app-shell v3.8.161. E2E offline ampliado hasta U27.
- Contratos verifican estructura, explicación de ambos objetivos por lección, referencias A2, 30 entradas sin duplicados normalizados frente a A1–B1 y B2 U1–U24, disponibilidad false y precarga offline.
- PT-BR continúa `available:false`; B2 sigue deshabilitado en selector. Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio. No afirmar certificación nativa ni equivalencia MCER.
- Runs post-merge/Pages no devuelven resultados para el merge commit; despliegue no declarado verificado.
- Fuente: PR #867, merge commit y Actions #45875348243/#45875348223; 26 nov 2026.


## 2026-11-26 — Cierre PT-BR B2 U28–U30 (PR #868)

- PR [#868](https://github.com/luisequeira612-commits/bahasa-studio/pull/868) fusionada por squash en `main`; merge commit `1743b0b0f7e76b2c56d910977bb46ce971cecf5d`; head validado `acb388f95406bf14e65cdeb63f038d015f777592`.
- U28 ciencia e incertidumbre (diseño experimental, estimación inicial, robustez, replicación independiente); U29 tecnología, privacidad y ética (exfiltración de datos, finalidad declarada, sesgo algorítmico, cifrado homomórfico y retención limitada); U30 medioambiente y sostenibilidad (electrificación industrial, inventario de emisiones, capacidad adaptativa, reutilización de materiales y justicia climática).
- El bloque añade 15 lecciones y 30 entradas nuevas (10 por unidad, dos objetivos por lección), ejemplos PT-BR, explicaciones en español y ejercicios contextualizados. Las entradas permanecen `not_checked`.
- CI del head: regresión #45877472303 success (103 pasos completados, incluidos tests locales, Chromium E2E, evaluación de página y accesibilidad móvil); Offline quality reports 10/10 success; TypeScript #45877472314 success. Sin reviews ni hilos de revisión pendientes.
- Manifiesto interno B2 publica U1–U30 de 40; Service Worker precarga U28–U30 y usa caché app-shell v3.8.162. B2 acumula 150 lecciones y 300 entradas nuevas.
- El primer CI #45877103860 falló solo por dos expectativas obsoletas en pruebas A1 U19–U21 y U22–U24 (esperaban 30 unidades publicadas frente a U1–U24); se corrigieron a 24 sin cambiar el manifiesto ni relajar los contratos. La regresión completa del head corregido pasó.
- PT-BR sigue `available:false`; B2 permanece deshabilitado en el selector. No se afirma certificación nativa ni equivalencia MCER. Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio.
- Confirmado en `main`: manifiesto B2 publica U1–U30. Post-merge del commit documental `7454be94b2ec5354f63bc82b257b1dc63b0537a8`: regresión #45877991707 success (103/103 pasos y Offline quality reports 10/10); TypeScript #45877991619 success; GitHub Pages #45877990150 completó build, report-build-status y deploy en success.
- Fuente: PR #868, merge commit, archivos de currículo/pruebas y Actions #45877103860/#45877472303/#45877472314; 26 nov 2026.


## 2026-11-26 — Cierre PT-BR B2 U31–U33 (PR #869)

- PR [#869](https://github.com/luisequeira612-commits/bahasa-studio/pull/869) fusionada por squash en `main`; head validado `ab77d2f90144b9f7f84142fc6029b7478fbed6f2`; merge commit `1df771e2686f491df20ad0be86bca1f01a31cf44`.
- U31 sociedad, desigualdad e inclusión; U32 trabajo y transformación profesional; U33 cultura, identidad y representación. Añade 15 lecciones y 30 entradas nuevas (10 por unidad, dos objetivos léxicos por lección), ejemplos PT-BR, explicaciones en español y ejercicios contextualizados. Entradas `not_checked`.
- CI del head final: regresión #45880201978 success (103/103 pasos, incluida la suite local, accesibilidad móvil, Chromium E2E y evaluación); Offline quality reports 10/10 success; TypeScript #45880202009 success. Sin reviews ni hilos pendientes al fusionar.
- Manifiesto interno B2 publica U1–U33 de 40; total acumulado 165 lecciones y 330 entradas. Service Worker precarga U31–U33, app-shell cache v3.8.163. `docs/PT_BR_B2_ROADMAP.md` actualizado tras la fusión.
- Primeras ejecuciones detectaron expectativas antiguas de caché/manifiesto y duplicados léxicos; se actualizaron los contratos y se sustituyeron términos repetidos. La segunda ejecución tuvo un timeout transitorio en una prueba E2E existente de la tarjeta de repaso y una explicación incompleta de U32; se corrigió la explicación. La ejecución final pasó completa.
- PT-BR sigue `available:false`; B2 permanece deshabilitado. No se afirma certificación nativa ni equivalencia MCER. Sin cambios a IndexedDB v1, backup JSON v3, dependencias ni audio.
- Fuente: PR #869, merge commit, currículo, pruebas y Actions #45880201978/#45880202009; 26 nov 2026.
