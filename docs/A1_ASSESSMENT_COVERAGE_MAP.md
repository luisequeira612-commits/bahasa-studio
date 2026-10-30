# Mapa de cobertura del banco piloto A1

Fecha: 2026-10-29  
Estado: inventario estático del banco existente; **no es una especificación de examen validada**.

## Alcance y método

Este mapa registra los 19 ítems A1 actualmente definidos en `assessment-engine.js`. La puntuación suma **24 puntos**: 17 puntos de opción múltiple y 7 puntos de producción escrita que requieren revisión humana. La unidad se asigna solo cuando el prompt, su explicación o la referencia curricular permite identificarla razonablemente; las asignaciones compuestas o inferidas se marcan como tales.

Las etiquetas de habilidad proceden del motor (`vocabulary`, `grammar`, `comprehension`, `interaction`, `production`). La modalidad describe lo que realmente hace el ítem, no lo que su nombre pudiera sugerir. Ninguno de estos 19 ítems contiene audio enlazado: los clasificados como comprensión son lectura/interpretación de texto escrito.

## Inventario de ítems

| ID | Unidad / vínculo | Dimensión | Puntos | Modalidad real | Observación |
|---|---|---|---:|---|---|
| `a1-negation-01` | U2 | Gramática | 1 | Opción múltiple, frase escrita | Contrasta `bukan` en una identidad nominal; cobertura estrecha |
| `a1-vocab-01` | U1 (asignación temática) | Vocabulario | 1 | Opción múltiple, expresión escrita | Reconoce una fórmula de agradecimiento |
| `a1-write-01` | U1 + U12 (integrador; inferido) | Producción | 4 | Escritura abierta | Presentación y actividad diaria; revisión humana |
| `a1-numbers-01` | U9 | Vocabulario | 1 | Opción múltiple, número escrito | Reconoce 21; no evalúa producción numérica |
| `a1-prices-01` | U10 | Interacción | 1 | Opción múltiple, diálogo escrito | Interpreta un precio; no simula una transacción completa |
| `a1-time-01` | U11 | Comprensión | 1 | Lectura de frase | Comprende una referencia temporal; no hay audio |
| `a1-weather-01` | U13 | Vocabulario | 1 | Opción múltiple, frase escrita | Reconoce una frase sobre lluvia |
| `a1-transport-01` | U14 | Comprensión | 1 | Lectura de frase | Interpreta medio de transporte; no hay audio |
| `a1-location-01` | U7 | Gramática | 1 | Completar opción múltiple | Uso locativo de `di` |
| `a1-family-01` | U5 | Interacción | 1 | Opción múltiple, frase escrita | Reconoce el parentesco en una presentación |
| `a1-comprehension-01` | U23 (asignación temática) | Comprensión | 1 | Lectura de frase | Comprende una frase nominal sobre la casa |
| `a1-interaction-01` | U6 (asignación temática) | Interacción | 1 | Selección de respuesta escrita | Petición sencilla de té; revisar pragmática y cortesía |
| `a1-age-01` | U4 | Interacción | 1 | Interpretación de pregunta escrita | Reconoce una pregunta sobre edad |
| `a1-routine-01` | U12 | Comprensión | 1 | Lectura de frase | Comprende una acción de rutina |
| `a1-ini-01` | U5 (asignación temática) | Gramática | 1 | Interpretación de frase escrita | Demostrativo `ini` y posesión/familia |
| `a1-write-02` | U1–U3 (integrador; inferido) | Producción | 3 | Escritura abierta | Saludo y pregunta de bienestar; revisión humana |
| `a1-actions-01` | U15 | Comprensión | 1 | Lectura de frase | Reconoce `pergi`; no mide producción oral |
| `a1-preferences-01` | U16 | Interacción | 1 | Interpretación de frase escrita | Expresa preferencia |
| `a1-questions-01` | U17 | Comprensión | 1 | Selección de pregunta escrita | Identifica pregunta temporal |

## Distribución real por dimensión

| Dimensión | Ítems | Puntos | Porcentaje de puntos |
|---|---:|---:|---:|
| Vocabulario | 3 | 3 | 12,5% |
| Gramática | 3 | 3 | 12,5% |
| Comprensión | 6 | 6 | 25,0% |
| Interacción | 5 | 5 | 20,8% |
| Producción | 2 | 7 | 29,2% |
| **Total** | **19** | **24** | **100%** |

El banco está desbalanceado respecto al blueprint de 40 puntos: no hay comprensión auditiva, la interacción se mide solo mediante opciones escritas y la producción tiene dos tareas escritas abiertas. La dimensión de producción depende completamente de puntuación manual. No debe calcularse un aprobado de nivel a partir de este banco piloto.

## Cobertura por unidades y vacíos observables

- Hay vínculos identificables o razonablemente inferidos para U1–U7, U9–U17 y U23.
- No hay ítems identificados para U18–U22 ni U24–U32.
- U8 y U18–U22 no deben marcarse como cubiertas solo porque el contenido aparezca en el curso.
- Las dos tareas abiertas integran más de una unidad, pero no sustituyen ítems independientes de cobertura para cada objetivo.
- Los ítems de comprensión existentes son estímulos escritos. No hay ítems de escucha con recurso de audio en este banco.
- No hay tarea oral evaluada ni evidencia de interacción espontánea.
- Las asignaciones temáticas inferidas deben confirmarse contra el contenido exacto de las unidades antes de ampliar el banco.

## Próxima expansión propuesta

Construir la siguiente tanda como banco de práctica, no como examen habilitador:

1. Añadir cobertura explícita de U18–U23 con énfasis en demostrativos/posesión, restaurante, mercado, salud, ropa y vivienda.
2. Añadir cobertura U24–U32 en tandas pequeñas, con trazabilidad de cada ítem al objetivo enseñado.
3. Crear ítems de escucha solo cuando exista un audio comprobable, transcripción de referencia y prueba offline; no etiquetar lectura como escucha.
4. Añadir interacción situacional con turnos y respuestas contextuales; conservar las conversaciones prácticas como práctica hasta validar su adecuación lingüística.
5. Registrar para cada nuevo ítem: unidad, objetivo, dimensión, modalidad, prerequisitos léxicos, respuestas aceptadas, revisión lingüística y estado de audio.
6. Mantener IDs estables y añadir pruebas automáticas para unicidad, puntos, tipo, clave de respuesta, cobertura declarada y ausencia de desbloqueo A2.

## Límites de esta auditoría

Este mapa se genera a partir del banco y de las referencias disponibles en el código. No comprueba de forma independiente que cada expresión sea natural, que los distractores sean pedagógicamente sólidos, que el nivel sea adecuado o que el vocabulario haya sido enseñado antes del ítem. Las frases y respuestas requieren revisión lingüística competente. La cobertura documental no constituye validación A1 ni una equivalencia oficial con BIPA/MCER.
