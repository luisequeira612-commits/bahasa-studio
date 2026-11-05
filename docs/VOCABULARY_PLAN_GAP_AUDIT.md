# Auditoría de vocabulario frente al plan curricular

**Fecha:** 5 de noviembre de 2026  
**Alcance:** auditoría estática de `curriculum-a1.js`, `curriculum-a2.js`, función `getUniqueLearningVocabulary()` de `index.html` y trackers CSV existentes.  
**Cambios de contenido:** ninguno. No se añadieron palabras, ejemplos, IDs ni estados lingüísticos.

## 1. Qué mide «Vocabulario disponible»

La interfaz Perfil > Métricas de Retención muestra `getUniqueLearningVocabulary().length`. La función:
- concatena las entradas `vocab` de todas las unidades de los niveles devueltos por `getLearningLevels()`;
- mantiene una sola entrada por `idn` normalizado con `trim().toLocaleLowerCase()`;
- descarta entradas sin `idn` y repeticiones de la misma forma;
- no consulta IndexedDB/SRS para construir el total; las tarjetas con seguimiento se cuentan aparte;
- incluye expresiones multipalabra como una sola entrada; no tokeniza expresiones;
- no agrupa por lema, familia morfológica ni significado: formas distintas cuentan por separado.

A2 está incluido porque `A2_RELEASE_ENABLED = true`; B1/B2 están excluidos. El número 801 es por tanto el catálogo de formas únicas expuestas por A1+A2, no el número de tarjetas SRS ni el número de palabras que el usuario ya repasó.

## 2. Entradas nuevas por unidad

Criterio: una forma se atribuye a la primera unidad donde aparece, normalizada sin distinguir mayúsculas/minúsculas. Las repeticiones posteriores no suman. Expresiones de varias palabras cuentan como una entrada, igual que en la métrica de la aplicación.

### A1

| Unidad | Tema | Nuevas distintas | ¿Debajo de 12? |
|---|---|---:|---|
| U1 | Primeras palabras, saludos y pronombres | 10 | Sí |
| U2 | Negación y frases básicas | 8 | Sí |
| U3 | Presentarse y origen | 8 | Sí |
| U4 | Números y edad | 12 | No |
| U5 | Familia y personas | 5 | Sí |
| U6 | Comida y bebida | 4 | Sí |
| U7 | Lugares y ubicación | 5 | Sí |
| U8 | Tiempo y rutina | 6 | Sí |
| U9 | Números 11–100 | 22 | No |
| U10 | Dinero y precios | 10 | Sí |
| U11 | Hora y partes del día | 12 | No |
| U12 | Rutina diaria | 9 | Sí |
| U13 | Tiempo y clima | 8 | Sí |
| U14 | Transporte y desplazamientos | 8 | Sí |
| U15 | Acciones cotidianas | 8 | Sí |
| U16 | Querer, poder y preferencias | 8 | Sí |
| U17 | Tener, haber y preguntas | 7 | Sí |
| U18 | Esto, aquello y posesión | 11 | Sí |
| U19 | Restaurante | 14 | No |
| U20 | Mercado y compras | 9 | Sí |
| U21 | Cuerpo y salud | 12 | No |
| U22 | Ropa y colores | 12 | No |
| U23 | Habitaciones y casa | 12 | No |
| U24 | Escuela y estudio | 10 | Sí |
| U25 | Aficiones y tiempo libre | 10 | Sí |
| U26 | Cómo llegar a un lugar | 10 | Sí |
| U27 | Invitaciones y planes | 10 | Sí |
| U28 | Viajes y alojamiento | 10 | Sí |
| U29 | Frecuencia y hábitos | 10 | Sí |
| U30 | Pedir ayuda con cortesía | 10 | Sí |
| U31 | Describir personas | 10 | Sí |
| U32 | Conversaciones prácticas | 9 | Sí |

**Total A1:** 309 formas distintas. El plan orientativo de 12–15 por unidad equivale a 384–480; faltan 75 para el mínimo de 384 y 91 para la referencia aproximada de 400. Hay unidades con más de 15 (especialmente U9); no conviene forzar una cuota uniforme sin mirar la progresión.

### A2

| Unidad | Tema | Nuevas distintas | ¿Debajo de ~15? |
|---|---|---:|---|
| U1 | Días, meses y fechas | 24 | No |
| U2 | Cuándo ocurre una acción | 14 | Sí |
| U3 | Secuencias y acontecimientos | 12 | Sí |
| U4 | Narrar una jornada | 10 | Sí |
| U5 | Actividades con ber- | 12 | Sí |
| U6 | Verbos activos con men- | 12 | Sí |
| U7 | Verbos activos con meng- | 12 | Sí |
| U8 | Verbos activos con mem-/meny- | 12 | Sí |
| U9 | Opiniones y preferencias | 12 | Sí |
| U10 | Normas, permisos y obligaciones | 12 | Sí |
| U11 | Problemas y soluciones | 12 | Sí |
| U12 | Experiencia, capacidades y objetivos | 12 | Sí |
| U13 | Compras, pagos y productos | 12 | Sí |
| U14 | Viajes y transporte | 12 | Sí |
| U15 | Invitaciones y planes | 12 | Sí |
| U16 | Experiencias y vacaciones | 12 | Sí |
| U17 | Salud y cuidados | 12 | Sí |
| U18 | Vivienda y comunidad | 12 | Sí |
| U19 | Trabajo y vida profesional | 12 | Sí |
| U20 | Medio ambiente y comunidad | 12 | Sí |
| U21 | Cultura y tradiciones | 12 | Sí |
| U22 | Comunicación digital y medios | 12 | Sí |
| U23 | Banca y trámites | 12 | Sí |
| U24 | Formación y aprendizaje | 12 | Sí |
| U25 | Cocina y gastronomía | 12 | Sí |
| U26 | Sentimientos y relaciones | 12 | Sí |
| U27 | Vida cívica y espacios públicos | 12 | Sí |
| U28 | Ciencia y tecnología | 12 | Sí |
| U29 | Atención al cliente y compras | 12 | Sí |
| U30 | Arte, cine y espectáculos | 12 | Sí |
| U31 | Excursiones y aire libre | 12 | Sí |
| U32 | Celebraciones familiares | 12 | Sí |
| U33 | Regiones y geografía | 12 | Sí |
| U34 | Cortesía y comunicación social | 12 | Sí |
| U35 | Presupuesto y finanzas | 12 | Sí |
| U36 | Evaluar opciones y decidir | 12 | Sí |
| U37 | Emergencias y desastres | 12 | Sí |
| U38 | Turismo y alojamiento | 12 | Sí |
| U39 | Trabajo remoto | 12 | Sí |
| U40 | Resumir, aclarar y responder | 12 | Sí |

**Total A2:** 492 formas distintas. No hay formas compartidas entre A1 y A2 según la normalización de la métrica. El total único es **801**. Para unas 600 entradas nuevas de A2 (aprox. 15 × 40) faltan **108**. Para el objetivo global de unas 1.000 faltan **199** (= 91 para llevar A1 a ~400 + 108 para llevar A2 a ~600 nuevas).

La comparación es orientativa: la unidad puede contener expresiones, números compuestos y formas gramaticales, no solo lemas simples.

## 3. Formas derivadas y entradas propias

La búsqueda superficial de prefijos/sufijos en las 492 formas de A2 encuentra muchos candidatos, pero no puede certificar morfología por sí sola: `se-`, `ke-`, `di-` y `-an` coinciden también con raíces, palabras lexicalizadas, nombres de meses y expresiones. Por ejemplo, una búsqueda literal captura `Senin`, `September`, `diskon` o `teras`, que no deben contarse automáticamente como derivaciones productivas.

Candidatos transparentes de A2 que sí están como entradas propias incluyen:
- **ber-:** `berbicara`, `bersepeda`, `berkunjung`, `berlatih`, `berdoa`, `berdiri`, `berlari`, `bernyanyi`, `berhenti`, `berkumpul`, `bertanya`, `bersantai`, `berharap`, `berhalangan`, `berjanji`, `berjumpa`, `berfoto`, `bersyukur`, `berdamai`, `berkemah`, `berbagi layar`.
- **meN-:** las series de U6–U8 (`menutup`, `mencari`, `mendengar`, `mengirim`, `mengambil`, `membeli`, `membawa`, `menyimpan`, etc.) y formas posteriores como `memperbaiki`, `menjelaskan`, `mengevaluasi`.
- **di-:** `dilarang`, `diizinkan`.
- **ter-:** `teratur`, `terjangkau`, `tertunda`, `tersinggung`.

No se asigna una cifra lingüística definitiva a `-an`, `se-` y `ke-` sin revisar cada lema, su segmentación y su significado. El repositorio tampoco mantiene aún un campo morfológico estructurado y completo para las 492 entradas A2.
### Conteo mecánico de patrones (no equivale a conteo lingüístico)

La búsqueda literal en las formas A2 registradas produce estos candidatos, con posibles falsos positivos y solapamientos:

| Patrón superficial | Formas candidatas | Observación |
|---|---:|---|
| ber- | 26 | Incluye coincidencias lexicalizadas como `berita` y `berikutnya`; revisar lema por lema. |
| meN- | 72 | Incluye falsos positivos como `Mei` y `media sosial`; no todos son derivados. |
| di- | 3 | Incluye `diskon`, que no es una forma con prefijo di-. |
| ter- | 5 | Incluye `teras`, que no debe clasificarse por el prefijo. |
| -an | 160 | Muy sobreinclusivo: captura raíces y expresiones que terminan en esas letras. |
| se- | 18 | Incluye días/meses y raíces que no llevan el prefijo productivo. |
| ke- | 37 | Incluye raíces y términos lexicalizados; requiere segmentación. |

Estos números no se suman entre sí porque una misma forma puede coincidir con prefijo y sufijo. La cifra de formas derivadas realmente registradas como entradas propias solo puede fijarse tras revisión morfológica individual; por ahora, el dato reproducible es el número de coincidencias de patrón anterior, no una validación lingüística.


En los campos de ejemplos `ex` del currículo A2, la búsqueda automática encontró 12 tokens que parecen coincidir con alguno de esos patrones pero no tienen entrada A2 propia: `berapa`, `delapan`, `depan`, `di`, `dia`, `hujan`, `kelas`, `kemarau`, `makan`, `membaca`, `sebentar`, `sekarang`. La mayoría son falsos positivos claros o formas ya enseñadas en A1; **no son 12 derivaciones confirmadas pendientes**. La extracción no certifica que se hayan cubierto todos los ejemplos de gramática y explicaciones de lecciones. Se necesita una pasada morfológica por campos, no una búsqueda de prefijos sin contexto.

## 4. Estados de revisión lingüística

Los trackers disponibles no cubren todo A1:
- A1: el CSV existente cubre únicamente U24–U32 (90 filas): 34 `verified_primary`, 56 `not_checked`, 0 otros.
- A1 U1–U23: no existe en el repositorio un tracker equivalente que permita contar estados por entrada.
- A2 U1–U40: 492 filas: 2 `verified_primary`, 490 `not_checked`, 0 otros.

**Total documentado en trackers:** 36 `verified_primary`, 546 `not_checked`, 0 otros, con 23 unidades A1 sin estado registral. No debe presentarse ese total como cobertura completa de A1+A2. Tampoco se ha promovido ningún estado durante esta auditoría.

## 5. Cobertura temática

El currículo no tiene etiquetas temáticas normalizadas por entrada. Por ello no es posible ofrecer un conteo exacto y reproducible por categoría sin crear primero una taxonomía y asignar cada ID; inferirlo por coincidencias de texto daría falsos positivos (por ejemplo, expresiones con «día», «agua» o formas verbales dentro de nombres compuestos).

Lectura cualitativa del contenido existente:
- **Familia:** presente en A1 U5 y A2 U32; cobertura básica, parentescos extendidos y relaciones familiares cotidianas son posibles huecos.
- **Comida:** presente desde A1 U6/U19 y A2 U25; hay comida y preparación, pero conviene comprobar bebidas, ingredientes cotidianos y vocabulario de cocina de alta frecuencia.
- **Números:** cobertura fuerte de números básicos y precios en A1 U4/U9/U10; revisar ordinales, cantidades y medidas de uso diario.
- **Tiempo:** fuerte en A1 U8/U11 y A2 U1–U3; revisar vocabulario temporal de alta frecuencia sin duplicar expresiones ya incluidas.
- **Lugares:** presente en A1 U3/U7/U23/U26/U28 y A2 U18/U27/U33/U38; verificar vocabulario cotidiano de barrio y servicios.
- **Transporte:** presente en A1 U14/U26/U28 y A2 U14/U31/U38; revisar verbos y componentes habituales del desplazamiento.
- **Cuerpo:** presente en A1 U21; revisar partes del cuerpo no cubiertas y síntomas de uso cotidiano, sin confundirlo con términos clínicos especializados.
- **Ropa:** presente en A1 U22 y A2 U21; la cobertura básica está, pero no equivale a un inventario cotidiano completo.
- **Trabajo:** A1 contiene poca cobertura directa; A2 U19 y U39 tiene un bloque más amplio. Es un hueco relativo de A1.
- **Verbos comunes:** aparecen muchos verbos, pero varios se enseñan como formas derivadas; revisar que se enseñen bases y derivados con IDs distintos cuando corresponda.
- **Adjetivos comunes:** hay adjetivos básicos (tamaño, color, estado), pero conviene revisar pares cotidianos de frecuencia alta.
- **Conectores:** A2 U3 y U40 ofrecen conectores/secuenciadores; revisar conectores básicos de contraste, causa y condición con progresión adecuada.

**Acción recomendada:** crear una taxonomía de etiquetas en un artefacto editorial independiente y asignar cada entrada canónica una o más categorías. No añadir campos al esquema IndexedDB ni alterar los currículos para esta clasificación.

## 6. Propuesta para cerrar la diferencia (no autorizada para implementar)

Objetivo operativo de referencia:
- A1: añadir/revisar hasta unas 91 entradas netas para llegar aproximadamente a 400.
- A2: añadir/revisar hasta unas 108 entradas netas para llegar aproximadamente a 600 entradas nuevas de A2.
- Total: unas 199 entradas netas para llegar a aproximadamente 1.000.

Orden recomendado:
1. **Primero recuperar formas derivadas ya enseñadas y ausentes como entradas**, tras verificar manualmente el análisis morfológico y localizar su primera aparición. Priorizar los ejemplos de U5–U8 y revisar después las unidades A2 posteriores. Una forma solo se incorpora si es una forma léxica útil, enseñada de forma explícita y distinta de las ya registradas.
2. **Después cubrir huecos temáticos de A1**, priorizando familia cotidiana, comida/bebida, lugares/servicios, transporte, cuerpo, ropa, trabajo básico, verbos y adjetivos de alta frecuencia. No añadir palabras solo para alcanzar la cuota.
3. **Completar A2 con vocabulario útil de alta frecuencia**, alineado con cada unidad, sin añadir sinónimos de baja utilidad ni términos técnicos por cuota.
4. Recalcular la métrica de formas únicas tras cada bloque y descontar duplicados. No contar una frase multipalabra como varias entradas salvo que sus componentes se enseñen también como entradas independientes.

Reparto propuesto de trabajo (objetivo, no lista aprobada de palabras):
- A1: hasta +91 netas; priorizar unidades por debajo de 12 nuevas, sin inflar U9 ni las unidades ya completas.
- A2: hasta +108 netas; priorizar unidades temáticas con vocabulario menos cotidiano y las formas derivadas demostrablemente usadas sin entrada.
- Reservar una pequeña parte de la cuota para correcciones de duplicados/IDs y no asumir que toda coincidencia morfológica merece una tarjeta nueva.

**Reglas para la futura implementación, si se aprueba:**
- cada forma derivada que se decida enseñar tendrá ID canónico propio;
- una misma forma no tendrá IDs diferentes en distintas unidades;
- vocabulario nuevo empieza en `not_checked`;
- no se marca `verified_primary` sin fuente primaria revisada por persona;
- ningún ejercicio obligatorio evalúa vocabulario no enseñado;
- cada ejercicio tendrá una respuesta válida o alternativas explícitamente admitidas;
- el enunciado no incluirá la respuesta;
- las palabras dudosas se quedan fuera del currículo hasta resolverlas y se registran como dudosas;
- no se modifica IndexedDB, backup JSON v3, dependencias, servicios remotos ni costes.

## 7. Límites y dudas abiertas

1. Los estados A1 U1–U23 no se pueden contar porque falta tracker.
2. La morfología no está etiquetada de forma completa; los patrones de prefijos/sufijos solo producen candidatos, no un conteo lingüístico fiable.
3. Los 12 tokens de ejemplo que no resuelven a una entrada no equivalen a 12 derivaciones nuevas; varios ya son vocabulario A1.
4. Las categorías temáticas no tienen etiquetas en los datos; se necesita clasificación manual asistida por ID antes de publicar cifras exactas por categoría.
5. La cifra 801 incluye expresiones multipalabra y compuestos numéricos como una entrada cada uno. El objetivo de «palabras» debe entenderse como entradas de vocabulario, no tokens individuales.

**Conclusión:** la diferencia cuantitativa está clara (aprox. 199 entradas netas); no es seguro rellenarla automáticamente. La primera implementación aprobable debería ser una fase de clasificación y selección de candidatos, sin añadir vocabulario todavía.
