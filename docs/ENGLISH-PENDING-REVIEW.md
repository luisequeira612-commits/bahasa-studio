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

1. Integrar A1/A2/B1 en `main` en orden de dependencias. La cadena A1 #891–899 aún no está lista: #891 ya sincronizó `main` y ahora es mergeable, pero su regresión del head previo falló porque el precache apuntaba a `audio/en/manifest.json` antes de que existiera; el head nuevo está en `action_required`. #892 no tiene ejecuciones de CI registradas. A2 #900–912 y B1 #915–936 tienen sus bloques finales desarrollados; los heads #912, #915 y #916 muestran typecheck/regresión exitosos.
2. Integrar la corrección B2 de #948 y las correcciones A1 U16 de #893 una vez que se autorice la integración; ambos heads tienen CI completo exitoso.
3. Solo después de integrar los cuatro niveles, registrar el manifiesto inglés A1–B2 en `language-manager.js`, habilitar inglés y actualizar `README.md` en el mismo cambio. Mantener la prueba `tests/readme-language-catalog.test.cjs`.

**Estado de CI comprobado (2026-11-27):**
- A1 #893, head `f2cedff3dffb338fb4eda9b13fd9749e30dbc65d`: regression #4897 success; type checks #1017 success; offline quality success.
- B2 #948, head `90062bf28cfe19f0587ab1d1769340c4d0cb026a`: regression #4896 success; type checks #1016 success; offline quality success.
- A1 #891: head anterior regression #4900 falló solo en `tests/service-worker-install.test.cjs` porque faltaba `audio/en/manifest.json`; type checks #1020 success y offline quality success. El branch ya incluye `main` y es mergeable; head actual `a40cc62a714dd576970bc14bc6844f2d3c7cc6ea` tiene ejecución #4901 en `action_required`.
- Durante el push, el workflow `.github/workflows/audio.yml` se activó por su trigger `push` y generó 263 MP3 de inglés A1; el tamaño total de la biblioteca quedó en 54.66 MiB. Esto fue automático, no una escucha ni aprobación de calidad. La política acordada era generación manual; el trigger automático debe tratarse aparte.
- A1 #892: no hay check-runs registrados para el head actual.
- A2 #912: regression #4203 success; type checks #325 success.
- B1 #915: regression #4210 success; type checks #332 success.
- B1 #916: regression #4725 success; type checks #846 success.

**Restricción de integración:** la memoria del proyecto registra que no se deben fusionar PRs de inglés sin aprobación expresa. Esta tarea cierra la validación editorial; no autoriza por sí sola a fusionar ni a publicar.

## Regla de cierre

Un hallazgo solo es bloqueante si contiene un error factual/gramatical, una traducción que cambia el sentido, una actividad sin respuesta válida o una asociación que enseña un objetivo equivocado. No reabrir mejoras de estilo ni ampliar la muestra. Al cerrar los bloqueantes correspondientes al alcance acordado y pasar las pruebas automáticas aplicables, marcar «inglés cerrado».
