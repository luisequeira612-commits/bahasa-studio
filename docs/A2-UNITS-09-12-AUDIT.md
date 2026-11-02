# Auditoría editorial A2 — unidades 9–12

Fecha de inspección: 2026-11-01  
Estado: **primera pasada estructural y editorial; revisión lingüística independiente pendiente**.

## Alcance y límites

Se inspeccionaron U9–U12 en `curriculum-a2.js`: títulos, objetivos, explicaciones gramaticales, glosas, ejemplos, consignas y retroalimentación de ejercicios. Esta pasada registra coherencia didáctica visible y riesgos para la corrección automática. No certifica naturalidad, frecuencia, registro, gramática completa ni equivalencia exacta de nivel. No hubo hablante nativo disponible y KBBI no es requisito para continuar.

Las 48 entradas de vocabulario de estas cuatro unidades deben seguir con sus estados lingüísticos pendientes en `A2_LANGUAGE_AUDIT_TRACKER_ALL_UNITS.csv`. Esta auditoría no eleva ninguna entrada a verificada.

## Inventario comprobable

| Unidad | Foco | Vocabulario | Lecciones | Ejercicios |
|---|---|---:|---:|---:|
| U9 | Expresar opiniones y preferencias | 12 | 4 | 17 |
| U10 | Normas, permisos y obligaciones | 12 | 4 | 17 |
| U11 | Problemas y soluciones | 12 | 4 | 17 |
| U12 | Experiencia, capacidades y objetivos | 12 | 4 | 17 |

Total inspeccionado: **48 entradas, 16 lecciones y 68 ejercicios**. Las unidades combinan reconocimiento de vocabulario, traducción, escucha, ordenamiento y producción escrita guiada.

## Observaciones editoriales y riesgos

1. **U9 — opinión y postura.** El bloque reúne expresiones para opinar (`menurut`), acordar o discrepar (`setuju`, `tidak setuju`), justificar (`alasan`) y recomendar (`menyarankan`). Conviene que las consignas distingan opinión, acuerdo y recomendación; no son la misma intención comunicativa.
2. **U10 — obligación, prohibición y permiso.** `wajib`, `dilarang` y `diizinkan` expresan funciones normativas distintas. Los ejercicios deben conservar el contexto de quién establece la regla y quién recibe el permiso; una traducción aislada puede ocultar esa diferencia.
3. **U11 — vocabulario con más de una lectura contextual.** Glosas como «macet: atascado; congestionado», «kehilangan: perder» y «melaporkan: informar; denunciar» requieren contexto suficiente. Las alternativas de una glosa no deben convertirse automáticamente en equivalentes universales.
4. **U12 — conceptos abstractos.** Experiencia, capacidad, oportunidad, objetivo y aspiración son nociones cercanas, pero no intercambiables. Las actividades deben conservar la distinción entre `tujuan` y `cita-cita`, y entre `kemampuan` y `keterampilan`, sin asumir que una traducción española cubre todos los contextos.
5. **Patrón de ejemplos.** Las frases modelo recurren con frecuencia a `Saya` y estructuras declarativas breves. Es útil para principiantes, aunque una siguiente edición puede diversificar interlocutores y situaciones después de asegurar que el vocabulario necesario ya fue presentado.
6. **Producción abierta.** Las consignas «Escribe una frase usando…» no tienen por qué admitir una sola respuesta literal. Las respuestas modelo deben tratarse como ejemplos y las alternativas razonables deben documentarse antes de endurecer la evaluación automática.

## Decisiones de esta pasada

- No se cambió vocabulario ni gramática de forma especulativa.
- No se afirma revisión lingüística independiente ni revisión por hablante nativo.
- No se usó KBBI como bloqueo.
- Se mantienen las 48 entradas pendientes de revisión lingüística.
- No se modificaron IndexedDB, el formato de backup v3 ni la progresión del curso.
- Las correcciones futuras deben basarse en contradicciones internas reproducibles o evidencia documental concreta y acompañarse de pruebas de regresión.

## Siguiente paso

Auditar consignas, respuestas esperadas y retroalimentación de U9–U12 contra sus glosas y ejemplos; corregir únicamente contradicciones internas verificables. Después, continuar con U13–U16 usando el mismo protocolo.


## Corrección de coherencia didáctica — U12 (2026-11-01)

La inspección detallada encontró que los grupos de vocabulario de las cuatro lecciones sí estaban cubiertos por sus ejercicios, pero los títulos, objetivos y explicaciones gramaticales no siempre describían esos mismos grupos. Se alinearon los rótulos y objetivos sin modificar vocabulario, frases indonesias, respuestas ni progresión:

- Lección 1 ahora explicita experiencia, capacidades y oportunidades; su gramática menciona los tres conceptos.
- Lección 2 se centra en metas, aspiraciones y resultados, de acuerdo con tujuan, cita-cita y berhasil.
- Lección 3 explicita fracaso, decisiones y continuidad; su gramática incluye melanjutkan.
- Lección 4 se centra en mejorar y desarrollar habilidades.

Se añadió una prueba de regresión que comprueba la correspondencia entre título, objetivo, gramática, vocabIds y ejercicios. Es una mejora de organización pedagógica, no una certificación lingüística independiente.


## Segunda pasada — alineación entre vocabulario nuevo y explicación de lección

Se compararon los 48 términos de U9–U12 con los objetivos y explicaciones de sus 16 lecciones, además de las pruebas ya existentes de consignas, respuestas, opciones y ordenamiento.

Se encontraron tres omisiones editoriales reproducibles:
- **U10, Lección 4:** berbahaya (peligroso) se evaluaba en la lección, pero no aparecía en su explicación. Se añadió al objetivo y a la explicación junto a mematuhi y melanggar.
- **U11, Lección 2:** kehilangan (perder) se introducía y evaluaba, pero la explicación solo cubría memperbaiki y macet. Se añadió el término al objetivo y a la explicación.
- **U11, Lección 3:** menghubungi (contactar) se introducía con una actividad de escucha, pero la explicación no lo describía. Se incorporó a la explicación; kehilangan se mantiene como repaso del bloque anterior.

Se añadió una regresión que exige que el objetivo o la explicación de cada lección nombre todas las palabras nuevas que introduce en U9–U12. No se modificaron vocabulario, glosas, respuestas, IDs, progresión, estados del tracker, IndexedDB ni backup v3. Estas correcciones mejoran la coherencia didáctica; no certifican naturalidad o corrección nativa.
