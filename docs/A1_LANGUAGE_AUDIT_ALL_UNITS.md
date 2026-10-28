# Auditoría lingüística de A1 — revisión transversal

## Alcance y estado

Esta revisión transversal cubre las 23 unidades A1 implementadas (U1–U23) en `index.html`: **237 tarjetas de vocabulario y 345 ejercicios** en el estado actual de la rama. Se revisaron en una primera pasada la coherencia entre vocabulario, glosas en español, ejemplos, explicaciones gramaticales y progresión pedagógica. Se aplicaron correcciones puntuales de alta confianza sin cambiar IDs de vocabulario, estructura de datos, esquema de IndexedDB ni formato de copias de seguridad.

**Estado: primera pasada completada; auditoría documental exhaustiva todavía abierta.** No se debe interpretar esta revisión como una certificación nativa ni como prueba de que cada lema ya fue consultado individualmente en KBBI. La siguiente pasada debe comprobar lema por lema, después contrastar patrones gramaticales y revisar ejercicios, respuestas aceptadas y audio.

## Criterios

- **Corregir** cuando el ejemplo o la traducción no se correspondan bien, o cuando el ejemplo introduzca innecesariamente material aún no enseñado.
- **Verificar** cuando la decisión dependa de contexto, registro, variante regional o uso real y la evidencia consultada no sea suficiente.
- **Conservar** cuando no se detecte un problema claro; esto no equivale a declarar el elemento definitivamente validado.
- Mantener los IDs canónicos y no modificar el esquema persistente ni el formato de exportación/importación.
- Usar KBBI como referencia léxica oficial y materiales BIPA 1 como orientación de alcance y situaciones comunicativas. KBBI no certifica por sí solo que una frase sea natural en conversación.

## Registro de revisión por unidad

| Unidad | Tema | Resultado de la primera pasada |
|---|---|---|
| U1 | Saludos y pronombres | **Mejorado:** se indica que `kamu` es informal y que `Anda` puede usarse en contextos formales; la explicación inicial ya no presenta ambos pronombres como intercambiables. Pendiente de cotejo individual de los demás lemas y ejemplos. |
| U2 | Negación básica | Se conserva la distinción didáctica entre `tidak` y `bukan`; pendiente de revisar todos los ejemplos y respuestas alternativas. |
| U3 | Presentación y origen | Sin corrección de alta confianza; revisar el registro de `kamu` y las variantes de saludo en la pasada léxica. |
| U4 | Números y edad | **Corregido:** el ejemplo de edad usaba `dua puluh` antes de que la unidad enseñara números compuestos. Ahora usa `lima`, ya presente en la unidad. |
| U5 | Familia | Sin corrección de alta confianza; revisar contexto de parentesco y traducciones inclusivas en la pasada léxica. |
| U6 | Comida y bebida | **Corregido:** la explicación ya no presenta `tolong` como un “por favor” universal. Se explica su uso para pedir ayuda o una acción, y el ejemplo se cambió a `Tolong!` (“¡Ayuda, por favor!”). La cortesía de las peticiones de comida/bebida sigue dependiendo del contexto. |
| U7 | Lugares | La explicación distingue `di` locativo del prefijo pasivo `di-`; mantener esa distinción y revisar los ejemplos completos. |
| U8 | Tiempo y rutina | Sin corrección de alta confianza; comprobar el orden y la naturalidad de los adverbios en la pasada de frases. |
| U9 | Números 11–100 | Sin corrección de alta confianza; comprobar las formas compuestas y las traducciones españolas con sustantivos contables. |
| U10 | Dinero y precios | Sin corrección de alta confianza; verificar las glosas pragmáticas de precios y cambio en contexto. |
| U11 | Hora y partes del día | **Corregido:** `siang hari` se traducía como “al mediodía”, demasiado estrecho para “mediodía / primeras horas de la tarde”; ahora se traduce “durante el día”. Se conserva `setengah delapan` = 7:30, pero su explicación de uso sigue pendiente de revisión didáctica más profunda. |
| U12 | Rutina diaria | Sin corrección de alta confianza; pendiente de cotejo individual de los verbos y sus ejemplos. |
| U13 | Tiempo y clima | Se conserva `Angin` como ejemplo de vocabulario aislado: convertirlo en una frase completa introduciría `bertiup`, un verbo que la unidad no enseña. La prioridad A1 es no exigir vocabulario nuevo de forma incidental. |
| U14 | Transporte | **Corregido:** se hizo más natural y explícita la traducción española de `terminal` como “La terminal de transporte está aquí”. |
| U15 | Acciones cotidianas | **Corregido:** `Saya ambil teh` → “Voy por el té” dependía de un contexto implícito y podía confundirse con beber. Ahora `Saya ambil bola` → “Agarro la pelota” hace explícito el sentido de tomar/agarrar y reutiliza vocabulario de la misma unidad. Se añade una nota de registro: `main` y `ambil` son comunes en el habla coloquial; en registros más formales suelen aparecer `bermain` y `mengambil`. |
| U16 | Querer, poder y preferencias | Sin corrección de alta confianza; verificar los matices de `bisa`, `boleh`, `mau` e `ingin` con ejemplos situacionales. |
| U17 | Existencia y preguntas | Sin corrección de alta confianza; revisar el registro de `kamu` y el alcance de las palabras interrogativas. |
| U18 | Demostrativos y posesión | **Corregido:** se precisó que `ini/itu` van después de un sustantivo cuando lo determinan (`buku ini`), mientras que `ini` también puede iniciar una frase como “Ini buku” (“Esto es un libro”). Se conserva la nota sobre `kami/kita` y queda pendiente revisar los usos contextuales de `-nya`. |
| U19 | Restaurante | Sin corrección de alta confianza; comprobar fórmulas de petición y variantes de vocabulario gastronómico. |
| U20 | Mercado y compras | Sin corrección de alta confianza; verificar el uso de cantidades, unidades y expresiones de compra. |
| U21 | Cuerpo y salud | **Corregido:** las glosas españolas de `mata` y `telinga` reflejan ahora tanto el singular como el plural posible de `mata` y los sentidos “oreja/oído” de `telinga`, en lugar de fijar una sola lectura. Se conserva la distinción entre `Saya sakit` y `Saya sakit kepala`. El contenido es práctica lingüística, no consejo médico. |
| U22 | Ropa y colores | **Corregido:** `Jaket ini cocok` se amplió a `Jaket ini cocok untuk saya`, alineado con “Esta chaqueta me queda bien”. |
| U23 | Casa y habitaciones | **Corregido:** cuatro ejemplos nominales fragmentarios se convirtieron en frases breves completas: techo rojo, ventana en la habitación, suelo limpio y pared blanca. Se prefiere “techo” como glosa principal de `atap`, conservando “tejado” como variante comprensible en español. |

## Comprobaciones documentales efectuadas

- **KBBI VI Daring**, diccionario oficial de Badan Pengembangan dan Pembinaan Bahasa: https://kbbi.kemendikdasmen.go.id/. En esta pasada se consultaron entradas concretas: `mi` se marca como forma estándar frente a `mie` (https://kbbi.kemendikdasmen.go.id/entri/mi); `kaus` es la forma estándar para la prenda frente a `kaos` (https://kbbi.kemendikdasmen.go.id/entri/kaus%20%281%29); `jaket` se define como prenda exterior con mangas y abertura delantera (https://kbbi.kemendikdasmen.go.id/entri/jaket); `stasiun` designa un lugar de parada de tren y `setasiun` figura como forma no estándar (https://kbbi.kemendikdasmen.go.id/entri/stasiun); `jam` cubre tanto el instrumento como una unidad de tiempo y se usa coloquialmente con sentido de `pukul` (https://kbbi.kemendikdasmen.go.id/entri/jam); `tidur` aparece como verbo “dormir” (https://kbbi.kemendikdasmen.go.id/entri/tidur); y `telinga` se define como órgano auditivo/oreja (https://kbbi.kemendikdasmen.go.id/entri/telinga). La entrada de `main-main` marca un sentido como coloquial (`cak`), una señal útil para enseñar el registro de las formas relacionadas con `main` (https://kbbi.kemendikdasmen.go.id/entri/main-main). Estas comprobaciones respaldan esas glosas puntuales, pero no significan que todos los lemas del curso hayan sido cotejados uno por uno.
- **Sahabatku Indonesia: untuk anak sekolah tingkat A1 (BIPA 1)**, repositorio oficial: https://repositori.kemendikdasmen.go.id/16466/. La descripción señala que el material integra comprensión auditiva, expresión oral, lectura y escritura y contiene tareas estructuradas.
- **Sahabatku Indonesia tingkat BIPA 1**, material para estudiantes adultos/general: https://repositori.kemendikdasmen.go.id/19081/. Su descripción sitúa el nivel en expresiones sencillas para presentarse y atender necesidades concretas, cotidianas y rutinarias.

### Comparación curricular con BIPA 1

La descripción oficial de BIPA 1 enumera, entre otros, saludos, presentación/identidad, rasgos físicos, familia, actividades diarias, aficiones, comunicación, transporte y compra-venta. En Bahasa Studio esos campos se reflejan sobre todo en U1–U5, U12–U20. U21–U23 (salud, ropa y casa) son ampliaciones de vocabulario cotidiano compatibles con un curso inicial; no se afirma que sean transcripciones de unidades concretas del libro BIPA. La referencia BIPA se utiliza para contrastar alcance, habilidades y tipo de tareas, no para exigir una correspondencia uno-a-uno de temarios.

Estas fuentes sirven para orientar la revisión, pero no constituyen una validación palabra por palabra de todas las unidades. El material BIPA es una referencia curricular, no una lista obligatoria que todas las unidades de este curso deban copiar.

## Próxima pasada necesaria

La segunda pasada ya ha corregido tres puntos de precisión adicionales: la traducción demasiado estrecha de `siang hari`, el ejemplo ambiguo de `ambil` y la explicación incompleta de la posición de `ini/itu`. Se añadió cobertura de regresión para esos cambios. La revisión de abajo sigue abierta y no debe confundirse con una certificación completa.

1. Continuar el cotejo individual de los lemas U1–U23 con KBBI cuando exista una entrada pertinente; registrar forma estándar, significado y casos no cubiertos.
2. Revisar las frases de ejemplo en indonesio y español, incluidos orden de palabras, elipsis, registro, colocaciones y traducciones que dependan del contexto.
3. Revisar las explicaciones gramaticales contra ejemplos reales y materiales BIPA 1, evitando presentar como regla universal una tendencia o una simplificación didáctica.
4. Auditar cada ejercicio: enunciado, opciones, respuesta correcta, explicaciones, equivalencias aceptadas y correspondencia con el vocabulario de la unidad.
5. Comprobar audio y escritura guiada por separado; el texto de una transcripción no basta para validar pronunciación ni calidad de audio.
6. Ejecutar las pruebas de regresión y navegador después de cada grupo de cambios y conservar todos los IDs existentes.

## Límites

Esta revisión se hizo con fuentes documentales y análisis del contenido del repositorio. No equivale a una revisión por hablantes nativos ni permite garantizar por sí sola naturalidad conversacional, variación regional o calidad de pronunciación. Los elementos marcados “sin corrección de alta confianza” siguen pendientes de la pasada individual, no se declaran aprobados definitivamente.
