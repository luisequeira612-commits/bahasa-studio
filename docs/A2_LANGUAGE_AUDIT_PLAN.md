# Auditoría lingüística de A2 — registro inicial

Fecha de corte: 2026-10-30  
Versión inspeccionada: Bahasa Studio 3.8.8, rama `main`.  
Estado: **auditoría abierta; ninguna entrada de vocabulario está validada por este registro**.

## Alcance comprobado

La extracción del objeto curricular de `index.html` confirma:

- 40 unidades A2 consecutivas (`a2_u1`–`a2_u40`).
- 492 entradas de vocabulario A2.
- 161 lecciones y 682 ejercicios.
- Cinco tipos de ejercicio presentes: opción múltiple, traducción español→indonesio, escucha, orden de palabras y producción escrita.
- 329 entradas de vocabulario A1.
- No se encontraron formas visibles de vocabulario A2 repetidas entre sí ni coincidencias exactas con las formas visibles de A1 en esta comprobación estática.
- Los cuatro ejercicios de escucha de U4 que reutilizan IDs canónicos `v247`, `v249`, `v252` y `v251` apuntan a vocabulario existente de A1; son referencias cruzadas, no IDs inexistentes.

Estos resultados solo describen estructura y consistencia de datos. **No demuestran** que las traducciones, ejemplos, afijos, colocaciones, registro o dificultad sean correctos o naturales.

## Registro por término

El archivo `A2_LANGUAGE_AUDIT_TRACKER_ALL_UNITS.csv` contiene una fila por cada una de las 492 entradas. Todos los estados se inicializan como `not_checked`. La URL de BIPA 2 se incluye como punto de partida de consulta pedagógica, no como evidencia de que cada término aparezca allí ni de que el MCER A2 equivalga oficialmente a BIPA 2.

Campos que deben completarse durante la revisión:

1. Lema/base y análisis morfológico, cuando corresponda.
2. Entrada KBBI exacta y fecha de consulta; no completar si el sitio oficial no permite verificarla.
3. Evidencia breve en palabras propias y dictamen separado de significado, ortografía, clase de palabra, naturalidad y adecuación al nivel.
4. Revisión del ejemplo indonesio y su traducción española.
5. Revisión de respuestas aceptadas, alternativas razonables y casos negativos.
6. Revisor, incidencia y corrección propuesta.

Estados permitidos: `verified_primary`, `verified_secondary`, `needs_review`, `blocked_access`, `not_checked`. No convertir una respuesta de API, una traducción automática o una búsqueda de resultados en `verified_primary`.

## Resumen por unidad

| Unidad | Tema | Vocabulario | Lecciones | Ejercicios |
|---|---|---:|---:|---:|
| U1 | Días, meses y fechas | 24 | 5 | 20 |
| U2 | Expresar cuándo ocurre una acción | 14 | 4 | 16 |
| U3 | Ordenar acontecimientos y contar secuencias | 12 | 4 | 16 |
| U4 | Narrar una jornada cotidiana | 10 | 4 | 18 |
| U5 | Actividades y acciones con ber- | 12 | 4 | 17 |
| U6 | Verbos activos con men- | 12 | 4 | 17 |
| U7 | Verbos activos con meng- | 12 | 4 | 17 |
| U8 | Verbos activos con mem- y meny- | 12 | 4 | 17 |
| U9 | Expresar opiniones y preferencias | 12 | 4 | 17 |
| U10 | Normas, permisos y obligaciones | 12 | 4 | 17 |
| U11 | Problemas y soluciones | 12 | 4 | 17 |
| U12 | Experiencia, capacidades y objetivos | 12 | 4 | 17 |
| U13 | Compras, pagos y productos | 12 | 4 | 17 |
| U14 | Viajes y transporte | 12 | 4 | 17 |
| U15 | Invitaciones y planes | 12 | 4 | 17 |
| U16 | Relatar experiencias y vacaciones | 12 | 4 | 17 |
| U17 | Salud, consultas y cuidados | 12 | 4 | 17 |
| U18 | Vivienda y comunidad | 12 | 4 | 17 |
| U19 | Trabajo y vida profesional | 12 | 4 | 17 |
| U20 | Medio ambiente y comunidad | 12 | 4 | 17 |
| U21 | Cultura y tradiciones | 12 | 4 | 17 |
| U22 | Comunicación digital y medios | 12 | 4 | 17 |
| U23 | Servicios bancarios y trámites | 12 | 4 | 17 |
| U24 | Formación y aprendizaje | 12 | 4 | 17 |
| U25 | Cocina y gastronomía | 12 | 4 | 17 |
| U26 | Sentimientos y relaciones | 12 | 4 | 17 |
| U27 | Vida cívica y espacios públicos | 12 | 4 | 17 |
| U28 | Ciencia y tecnología | 12 | 4 | 17 |
| U29 | Atención al cliente y compras | 12 | 4 | 17 |
| U30 | Arte, cine y espectáculos | 12 | 4 | 17 |
| U31 | Excursiones y actividades al aire libre | 12 | 4 | 17 |
| U32 | Celebraciones y acontecimientos familiares | 12 | 4 | 17 |
| U33 | Regiones y geografía | 12 | 4 | 17 |
| U34 | Cortesía y comunicación social | 12 | 4 | 17 |
| U35 | Presupuesto y finanzas personales | 12 | 4 | 17 |
| U36 | Evaluar opciones y tomar decisiones | 12 | 4 | 17 |
| U37 | Emergencias y preparación ante desastres | 12 | 4 | 17 |
| U38 | Turismo y alojamiento | 12 | 4 | 17 |
| U39 | Trabajo remoto y colaboración digital | 12 | 4 | 17 |
| U40 | Resumir, aclarar y responder | 12 | 4 | 17 |

## Orden de trabajo recomendado

1. Revisar por tandas de cuatro unidades, empezando por U1–U4 para fijar criterios y detectar patrones.
2. Contrastar lema, grafía, clase de palabra y acepción en KBBI VI Daring cuando sea accesible.
3. Contrastar alcance pedagógico con materiales oficiales BIPA 2; registrar límites de acceso y diferencias de nivel.
4. Revisar ejemplos, morfología, registro y traducciones por separado. Priorizar frases que contienen afijos, expresiones idiomáticas y usos formales/informales.
5. Auditar ejercicios, ayudas, respuestas aceptadas y audio real; las pruebas de software no certifican pronunciación.
6. Solicitar revisión de una persona competente en indonesio para cerrar dudas de naturalidad y adecuación.

## Puerta de publicación

A2 debe permanecer oculto para estudiantes mientras A1 no haya satisfecho sus criterios de validación y mientras no se haya completado la revisión requerida para la publicación de A2. No declarar A2 «validado» por pasar CI ni por completar este registro. B1 no debe comenzar como currículo publicable hasta que la revisión y la decisión de salida de A2 estén documentadas.

## Limitaciones de esta pasada

- No se consultaron individualmente las 492 entradas de KBBI.
- No se verificaron ejemplos con corpus ni con hablantes nativos.
- No se probó pronunciación ni audio en dispositivos.
- No se cambió ningún estado a verificado y no se modificó el contenido de aprendizaje ni el esquema de almacenamiento.
