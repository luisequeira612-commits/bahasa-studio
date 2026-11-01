# Auditoría editorial A2 — unidades 13–16

Fecha de inspección: 2026-11-01  
Estado: **primera pasada estructural y editorial; revisión lingüística independiente pendiente**.

## Alcance y límites

Se inspeccionaron U13–U16 en `curriculum-a2.js`: objetivos, explicaciones, glosas, ejemplos, consignas y retroalimentación. Esta pasada registra coherencia didáctica visible y riesgos para la corrección automática. No certifica naturalidad, frecuencia, registro, gramática completa ni equivalencia exacta de nivel. No hubo hablante nativo disponible y KBBI no es requisito para continuar.

Las 48 entradas de vocabulario de estas unidades deben conservar sus estados lingüísticos pendientes en `A2_LANGUAGE_AUDIT_TRACKER_ALL_UNITS.csv`. No se eleva ninguna entrada a verificada mediante esta auditoría.

## Inventario comprobable

| Unidad | Foco | Vocabulario | Lecciones | Ejercicios |
|---|---|---:|---:|---:|
| U13 | Compras, pagos y productos | 12 | 4 | 17 |
| U14 | Viajes y transporte | 12 | 4 | 17 |
| U15 | Invitaciones y planes | 12 | 4 | 17 |
| U16 | Relatar experiencias y vacaciones | 12 | 4 | 17 |

Total: **48 entradas, 16 lecciones y 68 ejercicios**.

## Observaciones editoriales y riesgos

1. **U13 — transacciones y negociación.** La unidad reúne coste, asequibilidad, descuentos, pagos, recibos, comparación y regateo. Conviene que los ejemplos mantengan clara la situación comercial y distingan comparar un producto de negociar su precio.
2. **U14 — viaje frente a salida.** El vocabulario incluye `perjalanan` (viaje), `bepergian` (viajar), `keberangkatan` (salida) y `pindah` (cambiarse/trasladarse). Son conceptos relacionados, pero las consignas deben conservar la diferencia entre el viaje, el acto de viajar, la salida y el cambio de transporte.
3. **U15 — invitar, proponer y comprometerse.** El bloque combina `mengusulkan` (proponer), `undangan` (invitación), `hadir` (asistir), `berhalangan` (no poder asistir) y `berjanji` (prometer/quedar). La explicación de gramática también menciona `mengundang` (invitar), forma que no aparece como entrada independiente en la lista de vocabulario de la unidad. Conviene decidir en una pasada posterior si se enseña explícitamente como forma relacionada o si basta con mantenerla como apoyo explicativo; no se añadió una entrada nueva sin revisar la progresión acumulativa.
4. **U16 — secuencia temporal y experiencia.** `kemarin`, `semalam`, `mula-mula`, `sesudahnya` y `pada akhirnya` cumplen funciones temporales distintas. Los ejercicios deberían reforzar tanto la referencia temporal como el orden de los acontecimientos, sin sugerir que el indonesio necesita flexión verbal de pasado.
5. **Producción abierta y respuestas modelo.** Cada unidad incluye consignas de escritura guiada. Una frase modelo no debe tratarse como única formulación correcta si otra respuesta conserva el significado, el vocabulario objetivo y la gramática esperada.
6. **Contexto de las traducciones.** Glosas como «quedar; prometer», «cambiar», «salida» o «visitar» pueden requerir contexto. Las alternativas de una glosa no deben aceptarse ni rechazarse automáticamente sin considerar la oración completa.

## Decisiones de esta pasada

- No se cambió vocabulario ni gramática de forma especulativa.
- Se registra `mengundang` como punto de coherencia entre explicación y lista de vocabulario de U15, no como error lingüístico confirmado.
- No se afirma revisión por hablante nativo ni certificación lingüística.
- No se usó KBBI como bloqueo.
- Se mantienen las 48 entradas pendientes de revisión lingüística.
- No se modificaron IndexedDB, el formato de backup v3 ni la progresión del curso.
- Toda corrección posterior debe basarse en contradicciones internas reproducibles o evidencia documental concreta y acompañarse de pruebas.

## Siguiente paso

Revisar referencias de vocabulario de U13–U16 contra el orden de introducción de A1/A2 y comprobar si las formas citadas en explicaciones están disponibles para el alumno antes de usarse en consignas. Después, continuar con U17–U20 bajo el mismo protocolo.


## Corrección de texto en U14 (2026-11-01)

Se detectó un error ortográfico evidente en el objetivo de la Lección 3: «Habla de vehículoes y autoangkutanes». Se sustituyó por «Habla de vehículos, medios de transporte y retrasos», que describe los tres conceptos del grupo de vocabulario (kendaraan, angkutan y tertunda). No se modificaron las formas indonesias, los ejemplos ni las respuestas. Se añadió una prueba de regresión para el texto y la cobertura de los tres IDs.
