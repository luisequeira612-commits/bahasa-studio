# Auditoría editorial inicial: A1 U24–U32 y A2 U5–U8

Fecha: 6 nov 2026  
Base revisada: `main` posterior al merge de PR #359.

## Alcance inspeccionado

Se cargaron directamente `curriculum-a1.js` y `curriculum-a2.js` desde `main`, y se revisaron las 13 unidades objetivo, sus glosas, ejemplos bilingües, consignas, alternativas, respuestas y explicaciones.

- A1 U24–U32: 9 unidades, 90 entradas de vocabulario y 102 ejercicios.
- A2 U5–U8: 4 unidades, 48 entradas de vocabulario, 16 lecciones y 68 ejercicios.
- Total: 13 unidades, 138 entradas y 170 ejercicios.

La lectura encontró una estructura editorial consistente en lo general: las consignas están en español, los ejercicios se vinculan a vocabulario de la unidad y las actividades de producción incluyen modelo y pista. Esto no demuestra naturalidad ni corrección lingüística nativa.

## Candidatos para revisión o mejora

Los puntos siguientes son observaciones editoriales para decidir; **no se clasifican como errores confirmados** ni autorizan por sí solos a cambiar contenido.

| Unidad | Elemento | Observación | Acción editorial posible |
|---|---|---|---|
| A1 U24 | `Murid` | La glosa dice «Alumno/a», mientras el ejemplo español usa «Soy estudiante». Es una equivalencia natural, pero menos literal. | Mantener si se busca español natural; añadir «alumno/a» como alternativa contextual si se desea. |
| A1 U26 | `Seberang` | La glosa incluye «al otro lado / enfrente»; el ejemplo solo ilustra «al otro lado de la calle». | Explicar que la traducción depende del contexto espacial. |
| A1 U30 | `Ulangi` | La glosa presenta «repite / repita», pero el ejemplo español usa el tuteo («Por favor, repite»). | Alinear el registro del ejemplo o mostrar ambas formas españolas. |
| A1 U31 | `Senyum` | `Senyumnya manis` se traduce como «Su sonrisa es bonita»; es una equivalencia contextual, no literal («dulce»). | Mantener la traducción idiomática y explicar brevemente el matiz de `manis`. |
| A2 U7 | `Menggoreng nasi` | El ejemplo «Ibu menggoreng nasi» se traduce literalmente como «Mamá fríe arroz». Conviene revisar si el contexto pretende enseñar la acción general o el plato «arroz frito». | Aclarar el contexto sin sustituir la frase hasta confirmar el sentido pretendido. |
| A2 U8 | `Memakai` | La glosa contiene «usar / llevar puesto», pero el ejemplo con `buku` solo ilustra «usar». | Añadir, si se considera útil, un segundo ejemplo con ropa para representar el otro sentido. |
| A2 U8 | `Memulai belajar` | La misma frase aparece como ejemplo de vocabulario y como respuesta de escucha. La repetición ayuda a fijar la forma, pero merece revisar la naturalidad y si conviene variar el contexto. | Confirmar la construcción y, si procede, variar solo uno de los ejemplos. |

## Resultado y límites

- Hallazgos lingüísticos confirmados: **0** en esta pasada.
- Candidatos editoriales documentados: **7**.
- Cambios de vocabulario, glosas, ejemplos o ejercicios realizados: **ninguno**.
- Estados del tracker, CSV, IndexedDB y backup JSON v3: sin cambios.
- No se usaron servicios externos ni se exigió KBBI.
- No se marca ningún elemento como `verified_primary` ni `cross_checked`.

La revisión se basó en coherencia interna, correspondencia entre ejemplo y traducción, claridad didáctica y consistencia de registro. No certifica gramática, naturalidad, frecuencia, nivel CEFR ni uso idiomático. Los siete candidatos deben confirmarse antes de corregir el currículo.

## Siguiente paso

Resolver los candidatos uno por uno con evidencia suficiente y mantener `not_checked` cuando no haya verificación secundaria independiente. Las correcciones confirmadas irán en un PR curricular separado de este informe.
