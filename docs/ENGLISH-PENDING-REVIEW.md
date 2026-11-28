## Estado técnico verificado — 2026-11-28

Esta sección refleja los resultados más recientes; las notas históricas posteriores conservan los estados que tenían en su fecha.

- **B2 #948 — HEAD documental actual** `a54ef5583f8b0c1b24a23c27755d8188f85a2d02`. Regression pull_request #46112815670: success; Type checks #46112815635: success; Offline quality reports: success. PR abierta, draft, mergeable y sin fusionar.
- En Regression #46112815670, la suite dedicada `tests/learning-screen-phase-5b.e2e.test.cjs` pasó **16/16**; el caso `Aprender review card starts the existing SRS session when due reviews exist` pasó como subtest 12 (~1,860 ms). En la ejecución agrupada de regresión, el mismo caso pasó como subtest 155. La suite `tests/browser-e2e.test.cjs` terminó correctamente con **34/34** pruebas. El paso `Run local quality tests` terminó success.
- **Historial de intermitencia:** en el SHA anterior `e230cdfcd938e6de4b98b1d67b75c33b0b45c23b`, Regression push #46111251689 falló dos veces en el test SRS, mientras Regression pull_request #46111258021 pasó. El nuevo commit solo actualiza documentación; no cambia código de aplicación ni el test. Por tanto, el último CI confirma que el test vuelve a pasar, pero no demuestra por sí solo la causa de los fallos anteriores. No modificar UI ni motor SRS sin evidencia nueva.
- **A1 #891:** head `a40cc62a714dd576970bc14bc6844f2d3c7cc6ea`; Regression #46105596121 y type checks #46105596115: success. PR abierta y mergeable, no fusionada.
- **A1 #892:** sigue abierta y `dirty`/no mergeable; su head `18da11d8b0ea251c3f0d6645c20ab147d2ffcfd4` no tiene check-runs. Tiene dependencia de #891 y requiere reconciliación/sincronización antes de validar.
- **Cadena restante:** #899, #900, #912, #915 y #916 están abiertas y mergeable; los heads consultados tienen Regression y Type checks en success. Esto no sustituye la comprobación de cada PR intermedia ni la validación de los heads resultantes al integrarlas.
- **Muestra editorial cerrada:** A1 U16, A2 U19, B1 U25 y B2 U29. No abrir otra ronda ni ampliar los no bloqueantes.
- **Publicación completa sigue bloqueada por integración:** integrar A1→A2→B1→B2 en orden, reconciliar #892, validar CI en cada head integrado, registrar el manifiesto inglés, habilitarlo y actualizar README en el mismo cambio. Mantener `available: false` hasta entonces.

Fuentes: [PR #948](https://github.com/luisequeira612-commits/bahasa-studio/pull/948), [Regression actual #46112815670](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/46112815670), [Type checks actual #46112815635](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/46112815635), [Regression push anterior #46111251689](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/46111251689), [Regression PR anterior #46111258021](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/46111258021), [PR #891](https://github.com/luisequeira612-commits/bahasa-studio/pull/891), [PR #892](https://github.com/luisequeira612-commits/bahasa-studio/pull/892).


# Inglés — pendientes de revisión no bloqueantes

Estado: lista única de pulido posterior. Estos puntos no bloquean una publicación personal si el contenido no contiene errores que cambien el significado o enseñen algo incorrecto.

## Pendiente de revisión

- Naturalidad fina de expresiones y colocaciones: una segunda opinión nativa puede sugerir alternativas; corregir solo si hay un error claro o una frase confusa.
- Preferencias de registro y variantes regionales del inglés estadounidense cuando ambas formas sean correctas.
- A2 U19: afinar el título «Grados pequeños y medios» para reflejar que también introduce `extremely`; la forma y el ejemplo son correctos, así que queda como ajuste de foco no bloqueante.
- Alternativas de traducción al español latinoamericano cuando la glosa actual sea comprensible y fiel, aunque exista una opción más elegante.
- Consistencia estilística menor en puntuación, redacción de objetivos y notas gramaticales.
- Revisión externa MCER/naturalidad nativa, únicamente si más adelante se busca una validación formal. No se afirma que el curso esté certificado.

## Muestra final acotada

Los currículos A1/A2/B1 están desarrollados en ramas y PRs apiladas, pero todavía no están integrados en `main`; inglés sigue con `available: false` hasta completar la integración y el gate de publicación. A1: PRs #891–899; A2: #900–912; B1: #915–936. B2 se integró con #945 y recibe correcciones editoriales en #948.

- A1: U16 (preguntas con do/does y palabras interrogativas), PR #893.
- A2: U19 (matices e intensidad), PR #904.
- B1: U25 (consejos, recomendaciones y críticas), secuencia PR #922.
- B2: U29 (grupos nominales complejos), PR #948. U30 es repaso y resulta menos representativa para comprobar enseñanza nueva.
- Bloqueante de publicación completa: integrar en `main` las cadenas A1/A2/B1 y registrar sus manifiestos; el material ya existe en ramas/PRs, pero todavía no forma parte de la rama publicada.

En cada muestra comprobar únicamente: correspondencia entre objetivos, ejemplos y lecciones; fidelidad de traducciones; validez de respuestas; y ausencia de errores gramaticales que enseñen algo incorrecto. No ampliar la muestra ni reabrir otras unidades.


## Bloqueantes de publicación (no son pendientes editoriales)

1. Integrar A1/A2/B1 en `main` en orden de dependencias. A1 #891 es mergeable y sus dos checks actuales están en success. A1 #892 sigue dirty, sin check-runs y necesita reconciliación después de #891. Las PRs posteriores dependen de esa cadena; no asumir que sus checks de ramas previas validan los nuevos heads integrados.
2. Integrar las correcciones editoriales de A1 U16 (#893) y B2 (#948) cuando se autorice la integración. #948 tiene CI verde en su HEAD actual; #893 ya tuvo regresión, type checks y offline quality success en el head documentado.
3. Solo después de integrar los cuatro niveles, registrar el manifiesto inglés A1–B2 en `language-manager.js`, habilitar inglés y actualizar `README.md` en el mismo cambio. Mantener y ejecutar `tests/readme-language-catalog.test.cjs`.

**CI actual comprobado (2026-11-28):**
- B2 #948, HEAD documental `a54ef5583f8b0c1b24a23c27755d8188f85a2d02`: Regression #46112815670 y type checks #46112815635 **success**; Offline quality reports **success**. Phase 5B aislado pasó 16/16, el caso SRS pasó en la suite agrupada y en la dedicada, y browser E2E pasó 34/34.
- A1 #891, HEAD `a40cc62a714dd576970bc14bc6844f2d3c7cc6ea`: Regression #46105596121 y type checks #46105596115 **success**.
- A1 #892, HEAD `18da11d8b0ea251c3f0d6645c20ab147d2ffcfd4`: cero check-runs y merge state dirty.
- #899, #900, #912, #915 y #916: los heads consultados tienen regresión y type checks success. Verificar cada head nuevo después de la integración secuencial.
- A1 #893, HEAD `f2cedff3dffb338fb4eda9b13fd9749e30dbc65d`: regresión #4897, type checks #1017 y offline quality success.
- A2 #912: regresión #4203 y type checks #325 success. B1 #915: regresión #4210 y type checks #332 success. B1 #916: regresión #4725 y type checks #846 success.
- El workflow `.github/workflows/audio.yml` se activó anteriormente por push y generó 263 MP3 en inglés A1 (biblioteca total reportada: 54.66 MiB). No se validó auditivamente; esto no es un control de calidad del audio. Mantener este efecto automático separado de la validación editorial.

**Restricción de integración:** no fusionar PRs de inglés sin aprobación expresa. Esta validación editorial y el CI verde de #948 no autorizan por sí solos fusiones ni publicación.

## Regla de cierre

Un hallazgo solo es bloqueante si contiene un error factual/gramatical, una traducción que cambia el sentido, una actividad sin respuesta válida o una asociación que enseña un objetivo equivocado. No reabrir mejoras de estilo ni ampliar la muestra. Al cerrar los bloqueantes correspondientes al alcance acordado y pasar las pruebas automáticas aplicables, marcar «inglés cerrado».
