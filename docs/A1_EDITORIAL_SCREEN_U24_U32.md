# Primera revisión lingüística independiente — U24–U32

Fecha: 2026-10-28  
Alcance: lectura editorial inicial de las 90 entradas de vocabulario y sus ejemplos visibles en `index.html`.  
Estado: **cribado inicial, no certificación lingüística**.

## Evidencia de fuentes primarias

- La página principal de KBBI VI Daring invita a iniciar sesión para las funciones de búsqueda completas: https://kbbi.kemendikdasmen.go.id/ (consultado el 2026-10-28). No obstante, las páginas directas de entradas individuales pueden ser accesibles sin iniciar sesión; se comprobó, por ejemplo, la entrada «guru» (https://kbbi.kemendikdasmen.go.id/entri/guru) y la entrada derivada «menyapu» (https://kbbi.kemendikdasmen.go.id/entri/menyapu) el 2026-10-28. Por tanto, se debe intentar el cotejo por URL directa antes de marcar una palabra como bloqueada.
- El aviso oficial de KBBI explica que el alta de usuarios está temporalmente afectada: https://kbbi.kemendikdasmen.go.id/?m=0 (consultado el 2026-10-28).
- El portal oficial describe que el contenido de KBBI Daring está protegido por derechos de autor; por tanto, esta auditoría no automatizará acceso, no eludirá controles y no copiará definiciones en bloque.
- El repositorio oficial de «Sahabatku Indonesia BIPA 1» describe objetivos de comunicación sencilla para presentaciones y necesidades concretas, cotidianas y rutinarias: https://repositori.kemendikdasmen.go.id/19081/ (consultado el 2026-10-28).
- La referencia BIPA 1–7 no es una lista lexicográfica exhaustiva ni demuestra por sí sola que cada palabra de la app pertenezca al nivel BIPA 1.

## Hallazgos de este cribado

Esta pasada no encontró una discrepancia obvia y universal en la mayoría de las glosas simples, pero la lectura humana/IA de las frases no equivale a cotejo de diccionario. Los siguientes puntos merecen una decisión editorial explícita:

| ID | Observación | Acción recomendada |
|---|---|---|
| v405 `Jalan` | Puede referirse a calle/camino y también aparecer en expresiones verbales; la entrada da dos sentidos en una misma glosa. | Mantener ambos sentidos solo si la lección distingue los usos y no confunde al principiante. |
| v408 `Lurus` / ejemplo `Jalan lurus.` | Funciona como instrucción breve de direcciones, no como oración formal completa. | Etiquetar explícitamente como instrucción conversacional y conservar una traducción imperativa natural («Sigue recto»). |
| v411 `Depan` | El ejemplo original no tenía punto de referencia explícito. | **Corregido en `index.html`:** `Toko ada di depan rumah.` / «La tienda está delante de la casa». Se añade una prueba de regresión para evitar que vuelva a quedar sin referente. |
| v413 `Belok` / ejemplo `Belok di sini.` | Es una instrucción imperativa breve; la traducción «Gira aquí» es coherente. | Marcar como fragmento/instrucción de direcciones, no como oración declarativa. |
| v415 `Lusa` / ejemplo `Lusa saya datang.` | «Pasado mañana» es la traducción pretendida; el ejemplo es comprensible, pero el contexto ayudaría a enseñar una cita o plan. | Añadir contexto solo si no introduce gramática/vocabulario no enseñados. |
| v433 `Reservasi` | El ejemplo es comprensible, pero debe comprobarse el uso, registro y lema en una fuente lexicográfica y contexto de viaje. | Mantener como pendiente KBBI; evaluar si `pemesanan` u otra formulación sería más adecuada al objetivo didáctico, sin sustituir por intuición. |
| v434 `Stempel` / `Saya perlu stempel.` | «Necesito un sello» resulta poco específico en una unidad de viajes/alojamiento; el contexto de pasaporte/sello migratorio no aparece en el ejemplo. | Confirmar el objetivo; considerar un ejemplo con contexto de documento/pasaporte si corresponde y si el vocabulario previo lo permite. |
| v449 `Ulangi (imperativo)` | La forma visible es una forma imperativa derivada; no debe tratarse como si fuera necesariamente el lema de cita del diccionario. | Registrar el lema/base y el análisis morfológico al cotejar KBBI. |
| v456 `Pendek` | La glosa combina «bajo/a» y «corto/a»; el ejemplo del cabello usa correctamente el sentido de longitud. | En la lección de descripción física, priorizar «corto/a» y reservar «bajo/a» para ejemplos de estatura si se enseña ese sentido. |
| v464 `Senyum` | La glosa mezcla sustantivo y posible uso verbal, mientras que el ejemplo `Senyumnya manis.` usa el sentido nominal («su sonrisa»). | Enseñar primero «sonrisa» en esta unidad y presentar el uso verbal por separado si se desea. |
| v470 `Senang bertemu dengan Anda` | La glosa formal concuerda con `Anda`; se trata de una expresión completa, no de un lema simple. | Cotejar como expresión/frase y revisar el registro en los materiales BIPA. |

Las recomendaciones anteriores son cuestiones editoriales a confirmar, no afirmaciones de que las formas indonesias sean incorrectas. No se han inventado resultados de KBBI para estos términos.

## Estado de cobertura

- 90 entradas extraídas y vinculadas a sus IDs.
- La hoja de seguimiento mantiene `KBBI_status=not_checked` hasta registrar una consulta real por entrada.
- La suite CI para la cabeza de PR `6cdc5de945e60f4e30fe4870b49977a4b3dce44f` terminó con éxito en la ejecución 40643128776.
- Las pruebas existentes comprueban estructura, enlaces, variedad de ejercicios y algunas regresiones concretas; no demuestran que se hayan revisado todas las respuestas aceptadas.
- No se ha probado el audio en dispositivos reales en esta pasada.
- La adecuación completa a BIPA 1 y el cotejo individual KBBI siguen pendientes.

## Siguiente paso

1. Resolver las decisiones editoriales anteriores con contexto y revisión competente de indonesio.
2. Completar el registro de cada entrada con fuente/fecha/evidencia verificable.
3. Añadir tests de regresión para cada corrección acordada.
4. Revisar variantes aceptadas de todas las respuestas.
5. Probar audio y funcionamiento offline en dispositivos compatibles, o marcarlo explícitamente como no probado.
