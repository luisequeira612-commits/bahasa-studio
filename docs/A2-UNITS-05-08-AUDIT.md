# Auditoría editorial A2 — unidades 5–8

Fecha de inspección: 2026-11-01  
Estado: **primera pasada estructural y editorial; revisión lingüística independiente pendiente**.

## Alcance y límites

Se inspeccionaron las unidades implementadas en `curriculum-a2.js`, sus lecciones, ejercicios, ejemplos y el registro `A2_LANGUAGE_AUDIT_TRACKER_ALL_UNITS.csv`. Esta revisión puede detectar coherencia interna, cobertura y riesgos didácticos visibles. No certifica naturalidad, registro, frecuencia, corrección gramatical completa ni equivalencia de nivel. No hubo hablante nativo disponible y no se exige acceso a KBBI para continuar.

Las 48 entradas de vocabulario de estas cuatro unidades conservan sus estados lingüísticos pendientes en el tracker. No se elevó ningún estado a `verified_primary` o `verified_secondary` como resultado de esta inspección.

## Inventario comprobable

| Unidad | Foco | Vocabulario | Lecciones | Ejercicios | Observación |
|---|---|---:|---:|---:|---|
| U5 | Actividades y acciones con `ber-` | 12 | 4 | 17 | Combina actividad, movimiento, reunión y estados/acciones frecuentes. |
| U6 | Verbos activos con `men-` | 12 | 4 | 17 | Presenta formas frecuentes asociadas a raíces con t, d, c y j. |
| U7 | Verbos activos con `meng-` | 12 | 4 | 17 | Incluye formas con k, g, h y vocal inicial. |
| U8 | Verbos activos con `mem-` y `meny-` | 12 | 4 | 17 | Contrasta varios grupos de consonantes iniciales y sus cambios frecuentes. |

Cada unidad incluye práctica variada, escucha y producción escrita guiada. Las pruebas estructurales existentes comprueban cantidad de lecciones, vocabulario, referencias canónicas, tipos de ejercicio y respuestas modelo. Estos controles no juzgan por sí solos si cada oración es la opción más natural en todos los contextos.

## Observaciones editoriales y riesgos

1. **Carga morfológica concentrada.** U5–U8 dedican cuatro unidades consecutivas a formas verbales con prefijos. Conviene mantener ejemplos completos y contrastes contextualizados; no enseñar los prefijos como una receta que permita derivar cualquier verbo automáticamente.
2. **Formas frecuentes, no reglas sin excepciones.** Las propias explicaciones ya usan expresiones de alcance limitado como «muchas raíces», «suele» y «patrones frecuentes». Esa cautela debe conservarse en futuras ediciones.
3. **Traducciones dependientes del contexto.** Glosas como «llevar; traer», «oír; escuchar», «pedir; encargar» y «usar; llevar puesto» representan opciones de traducción, no equivalencias intercambiables en toda oración. Las actividades deben aportar contexto suficiente para que la respuesta esperada no sea ambigua.
4. **Ejemplos simples y repetitivos.** Muchas frases usan `Saya`, `Dia` y objetos cotidianos. Esto facilita aislar la forma verbal, pero una siguiente pasada puede ampliar sujetos, complementos y situaciones sin introducir vocabulario nuevo no enseñado.
5. **Ejemplos que merecen revisión contextual.** `Saya menggunakan buku.` («Uso un libro») era comprensible, pero poco contextualizado. Se amplió el ejemplo y el modelo de escritura a `Saya menggunakan buku ini untuk belajar.` («Uso este libro para estudiar»), usando vocabulario básico ya conocido. Esto concreta el sentido de «usar/utilizar» sin afirmar que sea la única traducción posible ni certificar naturalidad nativa.
6. **Producción abierta.** Las respuestas modelo son ejemplos, no necesariamente las únicas formulaciones posibles. Antes de endurecer la corrección automática, deben registrarse alternativas razonables y casos negativos con el sistema independiente de calidad.

## Hallazgos de alineación interna (corregidos)

- En U8, la Lección 1 se titulaba «Formas mem- con b y p» y su explicación incluía ejemplos con p, aunque sus tres palabras nuevas eran `membeli`, `membawa` y `membantu`. Se ajustaron título, objetivo y explicación para limitar el foco a las raíces con b; las formas con p quedan en la Lección 2.


La comparación entre el foco de cada lección, sus `vocabIds` y los ejercicios reveló dos desajustes reproducibles en U8:

- La Lección 2 enumeraba en su explicación `membantu` y `memulai`, aunque sus tres palabras nuevas eran `memakai`, `memilih` y `memesan`. Se actualizó el título, el objetivo y la explicación para describir el grupo que realmente se enseña.
- La Lección 3 incluía `menyimpan` dentro de una lección dedicada a formas `mem-`; su explicación sobre la conservación de la `m` solo correspondía a `memulai` y `meminta`. `menyimpan` y su ejercicio de escucha se trasladaron a la Lección 4, dedicada a `meny-`. Se conserva el total de 12 palabras y 17 ejercicios de U8. La edición de U7 también conserva sus 12 palabras y 17 ejercicios.

En U7, los títulos y explicaciones de las lecciones 1–3 también mezclaban categorías de raíces que no correspondían a todas las palabras nuevas de cada lista. Se cambiaron por títulos descriptivos y explicaciones que reflejan exactamente las formas introducidas, sin alterar vocabulario ni glosas.

## Decisiones de esta pasada

- No se alteraron las formas ni las glosas del vocabulario.
- Se corrigieron únicamente las referencias y explicaciones internas de las lecciones U8 descritas arriba.
- No se alteró el currículo, la progresión, el esquema de IndexedDB ni el formato de backup v3.
- No se usó KBBI como bloqueo ni se afirmó revisión por hablante nativo.
- Se mantienen las 48 entradas de U5–U8 como pendientes de revisión lingüística.
- Las siguientes correcciones de contenido deberán basarse en contradicciones internas reproducibles o evidencia documental concreta, acompañadas de pruebas de regresión.

## Siguiente paso

Auditar las consignas y explicaciones de ejercicios de U5–U8 contra sus glosas y ejemplos; priorizar contradicciones concretas, respuestas ambiguas y vocabulario no introducido. Después, revisar U9–U12 con el mismo protocolo.
