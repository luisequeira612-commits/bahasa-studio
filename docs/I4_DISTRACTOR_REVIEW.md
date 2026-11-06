# Revisión I4 — distractores de distinto tipo

PR3 — revisión documental de los **197 avisos** del lint. **No se modifica ningún ejercicio ni opción.**

## Método de gravedad

La clasificación se recalcula caso por caso usando el tipo de la respuesta correcta y de cada distractor (PALABRA/FRASE):

- **ALTA:** todos los distractores son de tipo diferente a la respuesta correcta.
- **MEDIA:** dos o más distractores son de tipo diferente, pero al menos uno coincide con el tipo de la respuesta correcta.
- **BAJA:** exactamente un distractor es de tipo diferente.

La heurística compara únicamente la cantidad de tokens como aproximación PALABRA/FRASE. No evalúa si los distractores son semánticamente plausibles ni si son traducciones alternativas válidas. MEDIA no queda vacía: contiene los casos mixtos con dos o más distractores de tipo diferente, pero no todos.

El listado I4 de `docs/CURRICULUM_LINT_REPORT.md` contiene 197 casos en 64 unidades. No existe un aviso número 198 que pueda asignarse a una unidad: la cifra 198 no aparece en el listado fuente y no es un caso curricular adicional.

## Resumen

| Gravedad | Avisos |
|---|---:|
| ALTA | 130 |
| MEDIA | 0 |
| BAJA | 67 |
| **Total** | **197** |

## Conteo por unidad

| Unidad | Total | ALTA | MEDIA | BAJA |
|---|---:|---:|---:|---:|
| a1_u1 | 5 | 3 | 0 | 2 |
| a1_u2 | 2 | 1 | 0 | 1 |
| a1_u3 | 1 | 0 | 0 | 1 |
| a1_u5 | 3 | 0 | 0 | 3 |
| a1_u6 | 2 | 0 | 0 | 2 |
| a1_u7 | 3 | 0 | 0 | 3 |
| a1_u8 | 3 | 1 | 0 | 2 |
| a1_u10 | 3 | 0 | 0 | 3 |
| a1_u11 | 2 | 2 | 0 | 0 |
| a1_u12 | 9 | 7 | 0 | 2 |
| a1_u13 | 8 | 5 | 0 | 3 |
| a1_u14 | 8 | 5 | 0 | 3 |
| a1_u15 | 4 | 3 | 0 | 1 |
| a1_u16 | 9 | 3 | 0 | 6 |
| a1_u17 | 7 | 5 | 0 | 2 |
| a1_u18 | 3 | 3 | 0 | 0 |
| a1_u19 | 3 | 1 | 0 | 2 |
| a1_u20 | 2 | 2 | 0 | 0 |
| a1_u21 | 2 | 1 | 0 | 1 |
| a1_u22 | 2 | 1 | 0 | 1 |
| a1_u23 | 1 | 1 | 0 | 0 |
| a1_u24 | 1 | 1 | 0 | 0 |
| a1_u25 | 1 | 0 | 0 | 1 |
| a1_u26 | 5 | 3 | 0 | 2 |
| a1_u27 | 3 | 3 | 0 | 0 |
| a1_u28 | 2 | 1 | 0 | 1 |
| a1_u29 | 5 | 3 | 0 | 2 |
| a1_u30 | 2 | 1 | 0 | 1 |
| a1_u31 | 2 | 2 | 0 | 0 |
| a1_u32 | 4 | 2 | 0 | 2 |
| a2_u1 | 1 | 1 | 0 | 0 |
| a2_u2 | 4 | 1 | 0 | 3 |
| a2_u3 | 2 | 0 | 0 | 2 |
| a2_u4 | 2 | 2 | 0 | 0 |
| a2_u5 | 4 | 3 | 0 | 1 |
| a2_u6 | 4 | 3 | 0 | 1 |
| a2_u7 | 3 | 3 | 0 | 0 |
| a2_u8 | 3 | 2 | 0 | 1 |
| a2_u9 | 4 | 2 | 0 | 2 |
| a2_u10 | 3 | 3 | 0 | 0 |
| a2_u11 | 4 | 4 | 0 | 0 |
| a2_u12 | 4 | 2 | 0 | 2 |
| a2_u13 | 1 | 1 | 0 | 0 |
| a2_u15 | 2 | 2 | 0 | 0 |
| a2_u16 | 3 | 3 | 0 | 0 |
| a2_u17 | 4 | 3 | 0 | 1 |
| a2_u18 | 2 | 2 | 0 | 0 |
| a2_u19 | 2 | 2 | 0 | 0 |
| a2_u20 | 1 | 1 | 0 | 0 |
| a2_u21 | 3 | 3 | 0 | 0 |
| a2_u22 | 2 | 2 | 0 | 0 |
| a2_u23 | 4 | 1 | 0 | 3 |
| a2_u25 | 4 | 4 | 0 | 0 |
| a2_u27 | 2 | 2 | 0 | 0 |
| a2_u28 | 2 | 2 | 0 | 0 |
| a2_u30 | 1 | 1 | 0 | 0 |
| a2_u31 | 2 | 2 | 0 | 0 |
| a2_u34 | 1 | 1 | 0 | 0 |
| a2_u35 | 2 | 2 | 0 | 0 |
| a2_u36 | 2 | 2 | 0 | 0 |
| a2_u37 | 4 | 2 | 0 | 2 |
| a2_u38 | 3 | 2 | 0 | 1 |
| a2_u39 | 3 | 2 | 0 | 1 |
| a2_u40 | 2 | 2 | 0 | 0 |

## Tandas propuestas

Las tandas conservan grupos de 3–4 unidades y se ordenan por avisos ALTA (desempate por total). Cada total es la suma exacta de sus unidades.

- **Tanda 1: a1_u11, a1_u12, a1_u13, a1_u14** — 27 avisos; 19 ALTA, 0 MEDIA y 8 BAJA.
- **Tanda 2: a1_u15, a1_u16, a1_u17, a1_u18** — 23 avisos; 14 ALTA, 0 MEDIA y 9 BAJA.
- **Tanda 3: a2_u7, a2_u8, a2_u9, a2_u10** — 13 avisos; 10 ALTA, 0 MEDIA y 3 BAJA.
- **Tanda 4: a2_u16, a2_u17, a2_u18, a2_u19** — 11 avisos; 10 ALTA, 0 MEDIA y 1 BAJA.
- **Tanda 5: a2_u11, a2_u12, a2_u13, a2_u15** — 11 avisos; 9 ALTA, 0 MEDIA y 2 BAJA.
- **Tanda 6: a2_u25, a2_u27, a2_u28, a2_u30** — 9 avisos; 9 ALTA, 0 MEDIA y 0 BAJA.
- **Tanda 7: a1_u27, a1_u28, a1_u29, a1_u30** — 12 avisos; 8 ALTA, 0 MEDIA y 4 BAJA.
- **Tanda 8: a2_u3, a2_u4, a2_u5, a2_u6** — 12 avisos; 8 ALTA, 0 MEDIA y 4 BAJA.
- **Tanda 9: a2_u37, a2_u38, a2_u39, a2_u40** — 12 avisos; 8 ALTA, 0 MEDIA y 4 BAJA.
- **Tanda 10: a2_u20, a2_u21, a2_u22, a2_u23** — 10 avisos; 7 ALTA, 0 MEDIA y 3 BAJA.
- **Tanda 11: a2_u31, a2_u34, a2_u35, a2_u36** — 7 avisos; 7 ALTA, 0 MEDIA y 0 BAJA.
- **Tanda 12: a1_u31, a1_u32, a2_u1, a2_u2** — 11 avisos; 6 ALTA, 0 MEDIA y 5 BAJA.
- **Tanda 13: a1_u19, a1_u20, a1_u21, a1_u22** — 9 avisos; 5 ALTA, 0 MEDIA y 4 BAJA.
- **Tanda 14: a1_u23, a1_u24, a1_u25, a1_u26** — 8 avisos; 5 ALTA, 0 MEDIA y 3 BAJA.
- **Tanda 15: a1_u1, a1_u2, a1_u3, a1_u5** — 11 avisos; 4 ALTA, 0 MEDIA y 7 BAJA.
- **Tanda 16: a1_u6, a1_u7, a1_u8, a1_u10** — 11 avisos; 1 ALTA, 0 MEDIA y 10 BAJA.

## Casos

### a1_u1

#### ALTA — v3
- Respuesta: «Él / ella»
- Distractores: «Yo» / «Tú»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1] / «No (niega acciones o cualidades)» [v5; a1_u2]


#### ALTA — v3
- Respuesta: «Él / ella»
- Distractores: «Yo» / «Tú»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1] / «No (niega acciones o cualidades)» [v5; a1_u2]


#### ALTA — v45
- Respuesta: «Terima kasih»
- Distractores: «Halo»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v4
- Respuesta: «Dos personas se saludan y preguntan cómo están»
- Distractores: «Una persona pide comida» / «Dos personas se despiden»
- Tipo: correcta FRASE; distractores FRASE, FRASE.


#### BAJA — v465
- Respuesta: «¿Cómo estás? / ¿Qué tal?»
- Distractores: «Gracias» / «¿Dónde estás?»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.

### a1_u2


### a1_u2

#### ALTA — v49
- Respuesta: «Arroz cocido»
- Distractores: «Agua» / «Libro»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v50
- Respuesta: «Él / ella duerme»
- Distractores: «Yo como» / «Tú bebes»
- Tipo: correcta FRASE; distractores FRASE, FRASE.

### a1_u3


### a1_u3

#### BAJA — v11
- Respuesta: «Siapa nama kamu»
- Distractores: «Saya tinggal di kota»
- Tipo: correcta FRASE; distractores FRASE.

### a1_u5


### a1_u5

#### BAJA — v22
- Respuesta: «Este es mi padre»
- Distractores: «Este es mi hermano menor»
- Tipo: correcta FRASE; distractores FRASE.


#### BAJA — v20
- Respuesta: «Ini keluarga saya»
- Distractores: «Teman saya di sini»
- Tipo: correcta FRASE; distractores FRASE.


#### BAJA — v21
- Respuesta: «Madre / señora»
- Distractores: «Padre» / «Hermano menor»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.

### a1_u6


### a1_u6

#### BAJA — v48
- Respuesta: «Quiero agua»
- Distractores: «Él bebe café»
- Tipo: correcta FRASE; distractores FRASE.


#### BAJA — v115
- Respuesta: «¿Cuánto cuesta?»
- Distractores: «¿Dónde está el agua?» / «¿Cómo te llamas?»
- Tipo: correcta FRASE; distractores FRASE, FRASE.

### a1_u7


### a1_u7

#### BAJA — v30
- Respuesta: «Estoy en casa»
- Distractores: «Estoy en la escuela» / «Vivo en la ciudad»
- Tipo: correcta FRASE; distractores FRASE, FRASE.


#### BAJA — v32
- Respuesta: «¿Dónde está la escuela?»
- Distractores: «¿Quién está en la ciudad?»
- Tipo: correcta FRASE; distractores FRASE.


#### BAJA — v30
- Respuesta: «Saya di rumah»
- Distractores: «Saya tinggal di kota»
- Tipo: correcta FRASE; distractores FRASE.

### a1_u8


### a1_u8

#### ALTA — v37
- Respuesta: «Estudiar o aprender»
- Distractores: «Comer» / «Dormir» / «Beber»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1] / «No (niega acciones o cualidades)» [v5; a1_u2]


#### BAJA — v44
- Respuesta: «Estudio todos los días»
- Distractores: «Duermo hoy»
- Tipo: correcta FRASE; distractores FRASE.


#### BAJA — v35
- Respuesta: «Hoy estudio»
- Distractores: «Todos los días duermo»
- Tipo: correcta FRASE; distractores FRASE.

### a1_u10


### a1_u10

#### BAJA — v138
- Respuesta: «La moneda de Indonesia»
- Distractores: «El precio»
- Tipo: correcta FRASE; distractores FRASE.


#### BAJA — v139
- Respuesta: «Cinco mil rupias»
- Distractores: «Cinco rupias» / «Cincuenta rupias»
- Tipo: correcta FRASE; distractores FRASE, FRASE.


#### BAJA — v144
- Respuesta: «El cambio que devuelven»
- Distractores: «El precio» / «Dinero en efectivo»
- Tipo: correcta FRASE; distractores FRASE, FRASE.

### a1_u11


### a1_u11

#### ALTA — v155
- Respuesta: «Más tarde»
- Distractores: «Ayer» / «Ahora»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v36
- Respuesta: «Hoy / este día»
- Distractores: «Ayer» / «Mañana»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]

### a1_u12


### a1_u12

#### ALTA — v247
- Respuesta: «Levantarse»
- Distractores: «Bañarse / ducharse»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v248
- Respuesta: «Bañarse / ducharse»
- Distractores: «Desayunar»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v249
- Respuesta: «Desayunar»
- Distractores: «Salir / partir» / «Volver a casa»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v250
- Respuesta: «Salir / partir»
- Distractores: «Descansar»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v251
- Respuesta: «Volver a casa»
- Distractores: «Descansar» / «Cocinar»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v254
- Respuesta: «Lavar»
- Distractores: «Bañarse / ducharse»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v304
- Respuesta: «Ropa / prenda de vestir»
- Distractores: «Zapato» / «Comida»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v254
- Respuesta: «Saya mencuci baju.»
- Distractores: «Saya bangun.» / «Saya mandi.»
- Tipo: correcta FRASE; distractores FRASE, FRASE.


#### BAJA — v247
- Respuesta: «Me levanto por la mañana»
- Distractores: «Cena por la tarde»
- Tipo: correcta FRASE; distractores FRASE.

### a1_u13


### a1_u13

#### ALTA — v257
- Respuesta: «Frío»
- Distractores: «Lluvia / llover» / «Despejado / soleado»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v258
- Respuesta: «Lluvia / llover»
- Distractores: «Nublado»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v259
- Respuesta: «Despejado / soleado»
- Distractores: «Nublado» / «Viento»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v261
- Respuesta: «Viento»
- Distractores: «Tiempo atmosférico»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v262
- Respuesta: «Paraguas»
- Distractores: «Tiempo atmosférico» / «Caliente / hace calor»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### BAJA — v255
- Respuesta: «Tiempo atmosférico»
- Distractores: «Caliente / hace calor» / «Frío»
- Tipo: correcta FRASE; distractores FRASE, PALABRA.


#### BAJA — v256
- Respuesta: «Caliente / hace calor»
- Distractores: «Frío» / «Lluvia / llover»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.


#### BAJA — v258
- Respuesta: «Hoy llueve»
- Distractores: «Hoy hace frío» / «Hoy hace calor»
- Tipo: correcta FRASE; distractores FRASE, FRASE.

### a1_u14


### a1_u14

#### ALTA — v264
- Respuesta: «Tren»
- Distractores: «Estación de tren»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v265
- Respuesta: «Taxi»
- Distractores: «Estación de tren» / «Terminal de transporte»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v266
- Respuesta: «Estación de tren»
- Distractores: «Bicicleta»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v268
- Respuesta: «Bicicleta»
- Distractores: «Subir / tomar transporte» / «Bajar / apearse»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v270
- Respuesta: «Bajar / apearse»
- Distractores: «Autobús» / «Tren»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v267
- Respuesta: «Terminal de transporte»
- Distractores: «Bicicleta» / «Subir / tomar transporte»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.


#### BAJA — v269
- Respuesta: «Subir / tomar transporte»
- Distractores: «Bajar / apearse» / «Autobús»
- Tipo: correcta FRASE; distractores FRASE, PALABRA.


#### BAJA — v270
- Respuesta: «Me bajo / desciendo»
- Distractores: «Subo al autobús» / «Me siento»
- Tipo: correcta FRASE; distractores FRASE, FRASE.

### a1_u15


### a1_u15

#### ALTA — v283
- Respuesta: «Correr»
- Distractores: «Tomar / agarrar»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v284
- Respuesta: «Jugar»
- Distractores: «Tomar / agarrar»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v285
- Respuesta: «Tomar / agarrar»
- Distractores: «Pelota» / «Puerta»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v280
- Respuesta: «Voy al mercado»
- Distractores: «Viene de la escuela» / «Se queda en casa»
- Tipo: correcta FRASE; distractores FRASE, FRASE.

### a1_u16


### a1_u16

#### ALTA — v289
- Respuesta: «Gustar»
- Distractores: «Querer / desear» / «Poder / tener permiso»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v292
- Respuesta: «Muy»
- Distractores: «Un poco» / «Contento / alegrarse»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v295
- Respuesta: «Con / junto con»
- Distractores: «Gustar»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v288
- Respuesta: «Poder / saber hacer»
- Distractores: «Gustar» / «Querer / desear»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.


#### BAJA — v290
- Respuesta: «Quiero café»
- Distractores: «Me gusta el té»
- Tipo: correcta FRASE; distractores FRASE.


#### BAJA — v291
- Respuesta: «Poder / tener permiso»
- Distractores: «Muy» / «Un poco»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.


#### BAJA — v293
- Respuesta: «Un poco»
- Distractores: «Contento / alegrarse» / «Con / junto con»
- Tipo: correcta FRASE; distractores FRASE, FRASE.


#### BAJA — v294
- Respuesta: «Contento / alegrarse»
- Distractores: «Con / junto con» / «Poder / saber hacer»
- Tipo: correcta FRASE; distractores FRASE, FRASE.


#### BAJA — v288
- Respuesta: «Puedo nadar»
- Distractores: «No sabe leer»
- Tipo: correcta FRASE; distractores FRASE.

### a1_u17


### a1_u17

#### ALTA — v297
- Respuesta: «Tener / poseer»
- Distractores: «Qué» / «Quién»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v11
- Respuesta: «Quién»
- Distractores: «Por qué»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v300
- Respuesta: «Cuándo»
- Distractores: «Por qué»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v301
- Respuesta: «Por qué»
- Distractores: «Cómo»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v302
- Respuesta: «Cómo»
- Distractores: «No hay» / «Haber / existir / estar presente»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### BAJA — v296
- Respuesta: «Haber / existir / estar presente»
- Distractores: «Tener / poseer» / «Qué»
- Tipo: correcta FRASE; distractores FRASE, PALABRA.


#### BAJA — v303
- Respuesta: «No hay»
- Distractores: «Haber / existir / estar presente» / «Tener / poseer»
- Tipo: correcta FRASE; distractores FRASE, FRASE.

### a1_u18


### a1_u18

#### ALTA — v51
- Respuesta: «Este / esto»
- Distractores: «Allá» / «Ellos»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v320
- Respuesta: «Su nombre (según contexto)»
- Distractores: «Allá» / «Nosotros»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v348
- Respuesta: «Dónde / cuál (según contexto)»
- Distractores: «Cuándo» / «Quién»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]

### a1_u19


### a1_u19

#### ALTA — v330
- Respuesta: «Rico / sabroso»
- Distractores: «Picante» / «Sin»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v347
- Respuesta: «Sin chile, por favor»
- Distractores: «Con mucho chile»
- Tipo: correcta FRASE; distractores FRASE.


#### BAJA — v347
- Respuesta: «Arroz frito sin chile»
- Distractores: «Agua sin hielo»
- Tipo: correcta FRASE; distractores FRASE.

### a1_u20


### a1_u20

#### ALTA — v338
- Respuesta: «Plátano / banana»
- Distractores: «Manzana» / «Bolsa»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v346
- Respuesta: «Hacer compras»
- Distractores: «Comer» / «Dormir»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]

### a1_u21


### a1_u21

#### ALTA — v351
- Respuesta: «Pie / pierna»
- Distractores: «Mano» / «Cabeza»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v355
- Respuesta: «Me duele la cabeza»
- Distractores: «Tiene fiebre» / «Tiene tos»
- Tipo: correcta FRASE; distractores FRASE, FRASE.

### a1_u22


### a1_u22

#### ALTA — v371
- Respuesta: «Llevar puesto / usar»
- Distractores: «Comprar» / «Dormir»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v364
- Respuesta: «Llevo una camiseta blanca»
- Distractores: «Lleva zapatos negros»
- Tipo: correcta FRASE; distractores FRASE.

### a1_u23


### a1_u23

#### ALTA — v375
- Respuesta: «Cuarto de baño»
- Distractores: «Cocina» / «Dormitorio»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]

### a1_u24


### a1_u24

#### ALTA — v393
- Respuesta: «Clase / aula»
- Distractores: «Tarea» / «Lápiz»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]

### a1_u25


### a1_u25

#### BAJA — v402
- Respuesta: «Fin de semana»
- Distractores: «Esta noche» / «Un momento»
- Tipo: correcta FRASE; distractores FRASE, FRASE.

### a1_u26


### a1_u26

#### ALTA — v409
- Respuesta: «Al otro lado»
- Distractores: «Lejos» / «Detrás»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v405
- Respuesta: «Calle / camino»
- Distractores: «Izquierda» / «Mapa»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v412
- Respuesta: «Parte trasera / detrás»
- Distractores: «Delante» / «Lejos»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v406
- Respuesta: «A la izquierda»
- Distractores: «Sigue recto»
- Tipo: correcta FRASE; distractores FRASE.


#### BAJA — v411
- Respuesta: «Delante / parte delantera»
- Distractores: «Detrás» / «Al otro lado»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.

### a1_u27


### a1_u27

#### ALTA — v415
- Respuesta: «Pasado mañana»
- Distractores: «Ayer» / «Ahora»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v420
- Respuesta: «Encontrarse / reunirse»
- Distractores: «Visitar» / «Invitar»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v424
- Respuesta: «Plan»
- Distractores: «Pasado mañana»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]

### a1_u28


### a1_u28

#### ALTA — v434
- Respuesta: «Sello (oficial)»
- Distractores: «Pasaporte» / «Maleta»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v433
- Respuesta: «Tengo una reserva»
- Distractores: «Ha perdido el pasaporte»
- Tipo: correcta FRASE; distractores FRASE.

### a1_u29


### a1_u29

#### ALTA — v435
- Respuesta: «Siempre»
- Distractores: «A veces»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v438
- Respuesta: «Rara vez»
- Distractores: «Siempre» / «Normalmente»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v441
- Respuesta: «Cepillarse los dientes»
- Distractores: «Barrer» / «Descansar»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v435
- Respuesta: «Siempre estudio»
- Distractores: «A veces estudio»
- Tipo: correcta FRASE; distractores FRASE.


#### BAJA — v436
- Respuesta: «Normalmente / por lo general»
- Distractores: «Siempre» / «Rara vez»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.

### a1_u30


### a1_u30

#### ALTA — v454
- Respuesta: «Tarde / con retraso»
- Distractores: «Temprano» / «Despacio»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v447
- Respuesta: «Adelante / por favor (al invitar)»
- Distractores: «Con permiso» / «Perdón»
- Tipo: correcta FRASE; distractores FRASE, PALABRA.

### a1_u31


### a1_u31

#### ALTA — v456
- Respuesta: «Bajo/a (de estatura)»
- Distractores: «Alto/a» / «Joven»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### ALTA — v459
- Respuesta: «Mayor / viejo/a (según contexto)»
- Distractores: «Joven» / «Amable»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]

### a1_u32


### a1_u32

#### ALTA — v468
- Respuesta: «Sama-sama»
- Distractores: «Selamat datang»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Yo» [v1; a1_u1] / «Tú» [v2; a1_u1] / «Hola» [v60; a1_u1]


#### ALTA — v472
- Respuesta: «Por qué»
- Distractores: «Dónde»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Él / ella» [v3; a1_u1] / «Buenos días» [v4; a1_u1] / «¿Cómo estás? / ¿Qué tal?» [v465; a1_u1]


#### BAJA — v470
- Respuesta: «Encantado/a de conocerle (formal)»
- Distractores: «¿Qué tal?» / «De nada»
- Tipo: correcta FRASE; distractores FRASE, FRASE.


#### BAJA — v471
- Respuesta: «Necesitar / hacer falta»
- Distractores: «Preguntar por qué» / «Despedirse»
- Tipo: correcta FRASE; distractores FRASE, PALABRA.

### a2_u1


### a2_u1

#### ALTA — a2u1_musim
- Respuesta: «Estación; temporada»
- Distractores: «Mes» / «Fecha»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1] / «Estación seca» [a2u1_musim_kemarau; a2_u1]

### a2_u2


### a2_u2

#### ALTA — a2u2_masih
- Respuesta: «Todavía; aún»
- Distractores: «Nunca»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### BAJA — a2u2_sudah
- Respuesta: «La acción ya se completó»
- Distractores: «La acción ocurrirá después»
- Tipo: correcta FRASE; distractores FRASE.


#### BAJA — a2u2_tadi_pagi
- Respuesta: «Esta mañana, hace un rato»
- Distractores: «Mañana por la mañana» / «La semana pasada»
- Tipo: correcta FRASE; distractores FRASE, FRASE.


#### BAJA — a2u2_bulan_lalu
- Respuesta: «El mes pasado»
- Distractores: «El mes que viene» / «Este mes»
- Tipo: correcta FRASE; distractores FRASE, FRASE.

### a2_u3


### a2_u3

#### BAJA — a2u3_pertama
- Respuesta: «Presentar el primer paso»
- Distractores: «Indicar el final» / «Indicar el lugar»
- Tipo: correcta FRASE; distractores FRASE, FRASE.


#### BAJA — a2u3_sebelumnya
- Respuesta: «Antes de eso; previamente»
- Distractores: «Después de eso» / «Finalmente»
- Tipo: correcta FRASE; distractores FRASE, PALABRA.

### a2_u4


### a2_u4

#### ALTA — a2u4_teratur
- Respuesta: «Ordenado; regular»
- Distractores: «Lleno» / «Tranquilo»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### ALTA — a2u4_mulai
- Respuesta: «Empezar; comenzar»
- Distractores: «Terminar» / «Regresar»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]

### a2_u5


### a2_u5

#### ALTA — a2u5_berbicara
- Respuesta: «Hablar»
- Distractores: «Ir en bicicleta»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u5_berlari
- Respuesta: «Correr»
- Distractores: «Parar; detenerse»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u5_berkumpul
- Respuesta: «Reunirse; juntarse»
- Distractores: «Preguntar» / «Relajarse»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### BAJA — a2u5_berlatih
- Respuesta: «Practicar; entrenar»
- Distractores: «Estar de pie»
- Tipo: correcta FRASE; distractores FRASE.

### a2_u6


### a2_u6

#### ALTA — a2u6_menutup
- Respuesta: «Cerrar; tapar»
- Distractores: «Esperar»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### ALTA — a2u6_mencari
- Respuesta: «Buscar»
- Distractores: «Probar; intentar»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u6_mendengar
- Respuesta: «Oír; escuchar»
- Distractores: «Vender»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### BAJA — a2u6_menjemput
- Respuesta: «Ir a recoger a alguien»
- Distractores: «Cuidar; vigilar»
- Tipo: correcta FRASE; distractores FRASE.

### a2_u7


### a2_u7

#### ALTA — a2u7_mengirim
- Respuesta: «Enviar»
- Distractores: «Tomar; coger»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u7_mengajar
- Respuesta: «Enseñar»
- Distractores: «Cerrar con llave»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u7_mengundang
- Respuesta: «Invitar»
- Distractores: «Borrar; eliminar»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]

### a2_u8


### a2_u8

#### ALTA — a2u8_membeli
- Respuesta: «Comprar»
- Distractores: «Llevar; traer»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u8_menyewa
- Respuesta: «Alquilar»
- Distractores: «Ordenar; organizar» / «Proporcionar; preparar»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### BAJA — a2u8_memakai
- Respuesta: «Usar; llevar puesto»
- Distractores: «Elegir; escoger» / «Pedir; encargar»
- Tipo: correcta FRASE; distractores FRASE, FRASE.

### a2_u9


### a2_u9

#### ALTA — a2u9_pendapat
- Respuesta: «Opinión»
- Distractores: «Según; en opinión de» / «Estar de acuerdo»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u9_berbeda
- Respuesta: «Diferente; diferir»
- Distractores: «Explicar»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### BAJA — a2u9_tidak_setuju
- Respuesta: «No estar de acuerdo»
- Distractores: «Razón; motivo» / «Opción; elección»
- Tipo: correcta FRASE; distractores FRASE, FRASE.


#### BAJA — a2u9_yakin
- Respuesta: «Seguro; convencido»
- Distractores: «Esperar; tener esperanza» / «Decepcionado»
- Tipo: correcta FRASE; distractores FRASE, PALABRA.

### a2_u10


### a2_u10

#### ALTA — a2u10_aturan
- Respuesta: «Regla»
- Distractores: «Reglamento; normativa» / «Obligatorio; tener que»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u10_dilarang
- Respuesta: «Prohibido»
- Distractores: «Permitido; autorizado»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u10_berbahaya
- Respuesta: «Peligroso»
- Distractores: «Cumplir; obedecer» / «Infringir; incumplir»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]

### a2_u11


### a2_u11

#### ALTA — a2u11_masalah
- Respuesta: «Problema»
- Distractores: «Estropeado; averiado»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u11_memperbaiki
- Respuesta: «Reparar; arreglar»
- Distractores: «Perder»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### ALTA — a2u11_menemukan
- Respuesta: «Encontrar»
- Distractores: «Informar; denunciar»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u11_darurat
- Respuesta: «Emergencia»
- Distractores: «Inmediatamente; enseguida» / «Daño; avería»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]

### a2_u12


### a2_u12

#### ALTA — a2u12_pengalaman
- Respuesta: «Experiencia»
- Distractores: «Capacidad; habilidad»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u12_gagal
- Respuesta: «Fracasar»
- Distractores: «Continuar; proseguir»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### BAJA — a2u12_tujuan
- Respuesta: «Objetivo; meta»
- Distractores: «Tener éxito; lograrlo»
- Tipo: correcta FRASE; distractores FRASE.


#### BAJA — a2u12_meningkatkan
- Respuesta: «Mejorar; aumentar»
- Distractores: «Desarrollar» / «Destreza; competencia práctica»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.

### a2_u13


### a2_u13

#### ALTA — a2u13_pusat_belanja
- Respuesta: «Centro comercial»
- Distractores: «Vendedor» / «Comprador»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]

### a2_u15


### a2_u15

#### ALTA — a2u15_pesta
- Respuesta: «Fiesta»
- Distractores: «No poder asistir»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u15_berjanji
- Respuesta: «Quedar; prometer»
- Distractores: «Encontrarse» / «Planear»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]

### a2_u16


### a2_u16

#### ALTA — a2u16_kemarin
- Respuesta: «Ayer»
- Distractores: «Alguna vez»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u16_mula_mula
- Respuesta: «Al principio»
- Distractores: «Después»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### ALTA — a2u16_berfoto
- Respuesta: «Hacerse fotos»
- Distractores: «Paisaje» / «Agradable»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]

### a2_u17


### a2_u17

#### ALTA — a2u17_pemeriksaan
- Respuesta: «Chequeo médico»
- Distractores: «Resfriado»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### ALTA — a2u17_pilek
- Respuesta: «Resfriado»
- Distractores: «Presión arterial»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u17_vitamin
- Respuesta: «Vitamina»
- Distractores: «Chequeo médico»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### BAJA — a2u17_tekanan_darah
- Respuesta: «Presión arterial»
- Distractores: «Vitamina» / «Tratamiento y cuidado»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.

### a2_u18


### a2_u18

#### ALTA — a2u18_garasi
- Respuesta: «Garaje»
- Distractores: «Sala de estar» / «Propietario de la vivienda»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u18_ruang_tamu
- Respuesta: «Sala de estar»
- Distractores: «Vecino» / «Vecindario»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]

### a2_u19


### a2_u19

#### ALTA — a2u19_presentasi
- Respuesta: «Presentación»
- Distractores: «Prácticas profesionales» / «Experiencia laboral»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u19_magang
- Respuesta: «Prácticas profesionales»
- Distractores: «Entrevista» / «Solicitud»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]

### a2_u20


### a2_u20

#### ALTA — a2u20_sungai
- Respuesta: «Río»
- Distractores: «Jornada comunitaria de limpieza»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]

### a2_u21


### a2_u21

#### ALTA — a2u21_budaya
- Respuesta: «Cultura»
- Distractores: «Ropa tradicional»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u21_pakaian_adat
- Respuesta: «Ropa tradicional»
- Distractores: «Artesanía» / «Exposición»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### ALTA — a2u21_kerajinan
- Respuesta: «Artesanía»
- Distractores: «Patrimonio cultural»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]

### a2_u22


### a2_u22

#### ALTA — a2u22_berita
- Respuesta: «Noticia»
- Distractores: «Mensaje de voz»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u22_pesan_suara
- Respuesta: «Mensaje de voz»
- Distractores: «Red» / «Conexión»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]

### a2_u23


### a2_u23

#### ALTA — a2u23_transfer
- Respuesta: «Transferencia»
- Distractores: «Cargo administrativo»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### BAJA — a2u23_rekening
- Respuesta: «Cuenta bancaria»
- Distractores: «Transferencia» / «Tarjeta de débito»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.


#### BAJA — a2u23_biaya_admin
- Respuesta: «Cargo administrativo»
- Distractores: «Empleado de atención» / «Cola»
- Tipo: correcta FRASE; distractores FRASE, PALABRA.


#### BAJA — a2u23_petugas
- Respuesta: «Empleado de atención»
- Distractores: «Cuenta bancaria» / «Ahorros»
- Tipo: correcta FRASE; distractores FRASE, PALABRA.

### a2_u25


### a2_u25

#### ALTA — a2u25_bumbu
- Respuesta: «Condimento»
- Distractores: «Cocer al vapor»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u25_mengukus
- Respuesta: «Cocer al vapor»
- Distractores: «Masa»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### ALTA — a2u25_adonan
- Respuesta: «Masa»
- Distractores: «Sabor picante»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u25_rasa_pedas
- Respuesta: «Sabor picante»
- Distractores: «Condimento» / «Especia»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]

### a2_u27


### a2_u27

#### ALTA — a2u27_warga
- Respuesta: «Residente»
- Distractores: «Instalaciones públicas»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u27_balai_kota
- Respuesta: «Ayuntamiento»
- Distractores: «Señal de tráfico»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]

### a2_u28


### a2_u28

#### ALTA — a2u28_penelitian
- Respuesta: «Investigación»
- Distractores: «Pantalla táctil»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u28_layar_sentuh
- Respuesta: «Pantalla táctil»
- Distractores: «Automático»
- Tipo: correcta FRASE; distractores PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]

### a2_u30


### a2_u30

#### ALTA — a2u30_alur_cerita
- Respuesta: «Trama»
- Distractores: «Obra de arte»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]

### a2_u31


### a2_u31

#### ALTA — a2u31_pendakian
- Respuesta: «Excursión de montaña»
- Distractores: «Pendiente» / «Campamento»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### ALTA — a2u31_jejak
- Respuesta: «Huella»
- Distractores: «Excursión de montaña»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]

### a2_u34


### a2_u34

#### ALTA — a2u34_formal
- Respuesta: «Formal»
- Distractores: «Turno de palabra»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]

### a2_u35


### a2_u35

#### ALTA — a2u35_prioritas
- Respuesta: «Prioridad»
- Distractores: «Gasto imprevisto» / «Fondo de emergencia»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u35_biaya_tak_terduga
- Respuesta: «Gasto imprevisto»
- Distractores: «Presupuesto» / «Gastos»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]

### a2_u36


### a2_u36

#### ALTA — a2u36_kompromi
- Respuesta: «Compromiso»
- Distractores: «Siguiente paso»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u36_langkah_berikutnya
- Respuesta: «Siguiente paso»
- Distractores: «Consideración» / «Riesgo»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]

### a2_u37


### a2_u37

#### ALTA — a2u37_gempa_bumi
- Respuesta: «Terremoto»
- Distractores: «Oleaje fuerte» / «Alerta temprana»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u37_tempat_pengungsian
- Respuesta: «Refugio»
- Distractores: «Ruta de evacuación» / «Voluntario de desastres»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### BAJA — a2u37_gelombang_tinggi
- Respuesta: «Oleaje fuerte»
- Distractores: «Refugio» / «Suministros de alimentos»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.


#### BAJA — a2u37_jalur_evakuasi
- Respuesta: «Ruta de evacuación»
- Distractores: «Terremoto» / «Erupción volcánica»
- Tipo: correcta FRASE; distractores PALABRA, FRASE.

### a2_u38


### a2_u38

#### ALTA — a2u38_penginapan
- Respuesta: «Alojamiento»
- Distractores: «Horario de visita»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u38_objek_wisata
- Respuesta: «Atracción turística»
- Distractores: «Turista» / «Destino»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### BAJA — a2u38_biaya_masuk
- Respuesta: «Tarifa de entrada»
- Distractores: «Atracción turística» / «Recuerdo»
- Tipo: correcta FRASE; distractores FRASE, PALABRA.

### a2_u39


### a2_u39

#### ALTA — a2u39_dokumen_bersama
- Respuesta: «Documento compartido»
- Distractores: «Descargar» / «Subir»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]


#### ALTA — a2u39_notifikasi
- Respuesta: «Notificación»
- Distractores: «Reunión en línea»
- Tipo: correcta PALABRA; distractores FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### BAJA — a2u39_rapat_daring
- Respuesta: «Reunión en línea»
- Distractores: «Documento compartido» / «Enlace»
- Tipo: correcta FRASE; distractores FRASE, PALABRA.

### a2_u40


### a2_u40

#### ALTA — a2u40_penegasan
- Respuesta: «Énfasis»
- Distractores: «Ejemplo adicional» / «Explicación detallada»
- Tipo: correcta PALABRA; distractores FRASE, FRASE.
- **Propuestas SIN APLICAR:** «Lunes» [a2u1_senin; a2_u1] / «Martes» [a2u1_selasa; a2_u1] / «Miércoles» [a2u1_rabu; a2_u1]


#### ALTA — a2u40_contoh_tambahan
- Respuesta: «Ejemplo adicional»
- Distractores: «Información» / «Declaración»
- Tipo: correcta FRASE; distractores PALABRA, PALABRA.
- **Propuestas SIN APLICAR:** «Fecha; día del mes» [a2u1_tanggal; a2_u1] / «Estación; temporada» [a2u1_musim; a2_u1] / «Estación lluviosa» [a2u1_musim_hujan; a2_u1]



