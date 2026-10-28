# Auditoría lingüística editorial — A1, unidades 24–32

## Alcance y estado

Revisión editorial de los **90 lemas/glosas y sus 90 ejemplos bilingües** incorporados en U24–U32. Se revisaron la correspondencia entre indonesio y español, la forma visible del lema, la naturalidad básica de los frases modelo y la coherencia entre el lema y el ejemplo. Se corrigieron los puntos concretos registrados abajo.

**Estado de KBBI: cotejo parcial.** En el rastreador hay 34/90 entradas con consulta directa registrada (`verified_primary`) y 56/90 siguen como `not_checked`; por tanto, no se considera completado el cotejo individual de las 90 entradas. La web oficial de KBBI VI Daring informa que algunas funciones requieren iniciar sesión y que el registro/alta estaba experimentando problemas cuando se consultó. Referencia oficial: https://kbbi.kemendikdasmen.go.id/ y aviso de acceso: https://kbbi.kemendikdasmen.go.id/?m=0. La revisión editorial no sustituye esa comprobación lexicográfica.

## Correcciones aplicadas en `index.html`

| Unidad | ID | Antes | Después / motivo |
|---|---|---|---|
| U24 | v385 | `Kantin sekolah besar.` | `Kantin sekolah itu besar.` — añade `itu` para expresar claramente «la cafetería de la escuela» como sujeto definido. |
| U26 | v411 | `Toko di depan.` | `Toko ada di depan.` — frase completa más clara para la ubicación. |
| U28 | v432 | `Kereta tiba pagi.` | `Kereta tiba pada pagi hari.` — expresión temporal más natural y explícita para este nivel. |
| U29 | v440 | `Saya menyapu pagi.` | `Saya menyapu pada pagi hari.` — mejora la expresión de tiempo. |
| U29 | v441 | `Saya menyikat gigi pagi.` | `Saya menyikat gigi pada pagi hari.` — mejora la expresión de tiempo. |
| U29 | v442 | `Saya beristirahat sore.` | `Saya beristirahat pada sore hari.` — mejora la expresión de tiempo. |
| U30 | v449 | Lema mostrado con metadato gramatical mezclado: `Ulangi (imperativo)` | Forma indonesia visible `Ulangi`; la glosa española conserva «Repite / repítalo (imperativo)». La familia léxica y el lema base deberán confirmarse en KBBI. |
| U32 | v470 | Glosa «Encantado/a de conocerte (forma breve)» junto a `dengan Anda` | Glosa «Encantado/a de conocerle (formal)» para mantener la concordancia de registro con `Anda`. |

| U29 | ejercicio de escritura v442 | La pista y respuesta modelo seguían usando `Saya beristirahat sore.` | Se alinearon con `Saya beristirahat pada sore hari.`, igual que el ejemplo de vocabulario corregido. |
| U31 | ejercicio de traducción «cabello / pelo» | Referenciaba `v456` (Pendek, «corto/a») pese a que la respuesta era `Rambut`. | Corregido a `v460` (Rambut). |
| U32 | ejercicio de orden con «Muchas gracias» | Se vinculaba a `v468` (Sama-sama, «de nada») aunque la respuesta era `Terima kasih banyak`. | Sustituido por una pregunta de opción múltiple coherente con `v468`: identificar `Sama-sama` como respuesta común a `terima kasih`. |

## Cobertura revisada

- **U24 — Escuela y estudio:** v385–v394 (10 entradas).
- **U25 — Aficiones y tiempo libre:** v395–v404 (10 entradas).
- **U26 — Indicaciones y direcciones:** v405–v414 (10 entradas).
- **U27 — Invitaciones y planes:** v415–v424 (10 entradas).
- **U28 — Viajes y alojamiento:** v425–v434 (10 entradas).
- **U29 — Frecuencia y hábitos:** v435–v444 (10 entradas).
- **U30 — Pedir ayuda con cortesía:** v445–v454 (10 entradas).
- **U31 — Describir personas:** v455–v464 (10 entradas).
- **U32 — Conversaciones prácticas:** v465–v474 (10 entradas).

Se mantuvieron los IDs para no romper las referencias de los ejercicios. Las expresiones breves como `Belok kiri` y `Tunggu sebentar` se conservan como modelos conversacionales/imperativos; no se presentan como frases formales completas en todos los contextos.

## Respuestas, ejercicios y audio

- La estructura de U24–U32 contiene 8 ejercicios por unidad (72 en total). La suite de regresión comprueba el total de unidades y la estructura/enlaces de ejercicios; eso no certifica por sí solo la exactitud lingüística de cada respuesta aceptada.
- Antes de considerar cerrada la auditoría, queda una pasada específica de cada respuesta aceptada y variante válida, incluidas tildes/capitalización cuando corresponda y alternativas de traducción.
- Las actividades de escucha deben probarse en navegador/dispositivos reales: la revisión del texto no valida pronunciación, voz sintetizada, disponibilidad de audio ni comportamiento offline.
- Pendiente de cotejar los 90 lemas uno por uno en KBBI VI Daring y registrar, para cada forma, si es lema, forma flexionada/derivada, variante o expresión. KBBI no debe usarse como única medida de naturalidad conversacional.

## Criterio de salida

Esta rama contiene correcciones editoriales útiles, pero la auditoría lingüística **no está cerrada**. No etiquetar U24–U32 como «validadas por KBBI» ni fusionar basándose únicamente en pruebas estructurales. El siguiente paso es completar el cotejo individual KBBI y la revisión de respuestas/audio.


## Seguimiento de auditoría — 2026-10-28

Se amplió el rastreador `docs/A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv` con evidencia de consulta directa a KBBI VI Daring para **34 de los 90 términos**. Para cada uno se registraron la URL exacta, la fecha de consulta, el lema/base y una nota breve sobre la acepción o la forma derivada. Esto valida únicamente la comprobación lexicográfica indicada; no certifica por sí solo la glosa española, el ejemplo, la naturalidad ni el nivel A1.

La portada de KBBI VI Daring indica que algunas funciones requieren iniciar sesión y que el registro de cuentas nuevas está temporalmente afectado. Sin embargo, varias páginas individuales de entrada se pudieron consultar públicamente sin iniciar sesión. Se registraron solo las entradas realmente abiertas y examinadas; las restantes siguen como `not_checked`, sin inferir su estado por semejanza o por resultados no consultados.

Se añadió la referencia general oficial BIPA 1 a las 90 filas del rastreador. **Esto no equivale a haber cotejado cada término con una unidad o página del material BIPA.** El ajuste al nivel, la naturalidad y la revisión de respuestas aceptadas siguen pendientes en todas las filas salvo que se documente expresamente lo contrario.

### Bloqueos que permanecen
- 56/90 entradas sin cotejo directo KBBI registrado.
- No se ha completado el análisis término por término contra secciones/páginas concretas de BIPA 1.
- No se ha terminado la revisión individual de todas las respuestas aceptadas y variantes de los 72 ejercicios.
- No se ha probado de forma real la pronunciación, las voces disponibles, los fallbacks ni el comportamiento offline en dispositivos.
- La aprobación lingüística final requiere cerrar estas tareas y, cuando haya dudas, revisión competente de indonesio.

No declarar cerrada la auditoría lingüística basándose en el resultado verde de CI.

## Cotejo KBBI adicional — 28 de octubre de 2026

Se volvieron a revisar directamente estas entradas oficiales y se enriquecieron las notas de evidencia en el rastreador: [menjawab](https://kbbi.kemendikdasmen.go.id/entri/menjawab) (base `jawab`, responder), [membaca](https://kbbi.kemendikdasmen.go.id/entri/membaca) (resultado bajo `baca`, leer), [kelas](https://kbbi.kemendikdasmen.go.id/entri/kelas) (incluye aula escolar) y [tugas](https://kbbi.kemendikdasmen.go.id/entri/tugas) (tarea/trabajo asignado). Estas consultas elevan el total registrado a **39/90**; quedan **51/90** en `not_checked`. Solo se verifica la entrada/acepción léxica pertinente; no implica que se hayan validado la traducción española, los ejemplos, la naturalidad, las respuestas aceptadas ni el nivel BIPA 1.
