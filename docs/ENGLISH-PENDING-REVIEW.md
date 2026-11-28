# Inglés — pendientes de revisión no bloqueantes

Estado: lista única de pulido posterior. Estos puntos no bloquean una publicación personal si el contenido no contiene errores que cambien el significado o enseñen algo incorrecto.

## Pendiente de revisión

- Naturalidad fina de expresiones y colocaciones: una segunda opinión nativa puede sugerir alternativas; corregir solo si hay un error claro o una frase confusa.
- Preferencias de registro y variantes regionales del inglés estadounidense cuando ambas formas sean correctas.
- Alternativas de traducción al español latinoamericano cuando la glosa actual sea comprensible y fiel, aunque exista una opción más elegante.
- Consistencia estilística menor en puntuación, redacción de objetivos y notas gramaticales.
- Revisión externa MCER/naturalidad nativa, únicamente si más adelante se busca una validación formal. No se afirma que el curso esté certificado.

## Muestra final acotada

La PR actual contiene inglés B2, pero no contiene currículos ingleses A1, A2 ni B1: el registro del idioma sigue con `available: false` y `curriculum: {}`, y `languages/en/curriculum/` solo incluye `b2/`.

- B2: U29 (unidad intermedia con vocabulario nuevo y grupos nominales complejos), una única muestra final. U30 es una unidad de repaso y resulta menos representativa para comprobar enseñanza nueva.
- A1/A2/B1: no hay unidades inglesas que seleccionar en el estado actual. Si el objetivo de publicación es el curso completo A1–B2, la ausencia de esos tres niveles es un bloqueante de alcance, no una tarea de pulido.

En U30 comprobar únicamente: correspondencia entre objetivos, ejemplos y lecciones; fidelidad de traducciones; validez de respuestas; y ausencia de errores gramaticales que enseñen algo incorrecto. No ampliar la muestra ni reabrir otras unidades.

## Regla de cierre

Un hallazgo solo es bloqueante si contiene un error factual/gramatical, una traducción que cambia el sentido, una actividad sin respuesta válida o una asociación que enseña un objetivo equivocado. No reabrir mejoras de estilo ni ampliar la muestra. Al cerrar los bloqueantes correspondientes al alcance acordado y pasar las pruebas automáticas aplicables, marcar «inglés cerrado».
