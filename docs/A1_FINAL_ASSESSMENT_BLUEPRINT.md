# Blueprint de evaluación final A1 — borrador de implementación

Fecha: 2026-10-29  
Estado: **especificación de trabajo; no es un examen implementado ni validado**.

## Propósito y límites

Definir una evaluación acumulativa para decidir si el alumno está preparado para avanzar de A1 a A2. La evaluación debe comprobar comprensión y uso funcional del indonesio en situaciones cotidianas, no memorizar traducciones aisladas. Este blueprint no acredita un nivel oficial, no sustituye una evaluación BIPA formal y no certifica naturalidad por sí mismo.

El banco A1 actual de `assessment-engine.js` es una muestra piloto pequeña (19 ítems en la rama revisada, con tareas abiertas que requieren revisión humana). No debe presentarse como examen final completo. A2–B2 permanecen ocultos hasta cerrar la puerta de calidad de A1.

## Plano propuesto

**40 puntos en total; 5 dimensiones de puntuación.**

| Dimensión | Puntos | Evidencia prevista | Evaluación |
|---|---:|---|---|
| Vocabulario funcional | 8 | Palabras y expresiones de identidad, familia, rutina, comida, compras, tiempo, transporte, lugares y conversación cotidiana | Automática cuando la respuesta sea inequívoca |
| Gramática en contexto | 8 | Pronombres y cortesía, negación `tidak/bukan`, ubicación `di`, preguntas, demostrativos/posesión, expresiones temporales y patrones básicos de frase | Automática con opciones revisadas y respuestas alternativas documentadas |
| Comprensión | 12 | 6 puntos de lectura de mensajes/diálogos breves y 6 puntos de escucha de audio reproducible | Lectura automática; escucha automática solo después de validar los audios y sus transcripciones |
| Interacción práctica | 6 | Elegir o completar respuestas apropiadas en saludos, presentaciones, restaurante, mercado, direcciones, transporte, invitaciones y pedir ayuda | Mixta; las opciones deben medir adecuación contextual, no solo traducción |
| Producción | 6 | Dos tareas breves: mensaje personal (3 puntos) y respuesta situacional (3 puntos) | Revisión humana obligatoria con rúbrica |

La ponderación es una propuesta de producto para un examen interno A1, no una equivalencia oficial con BIPA ni con MCER. La app no debe otorgar un aprobado definitivo si hay producción pendiente de revisión.

## Muestreo de contenido

La selección final debe cubrir los 32 bloques del curso y evitar que una unidad domine el resultado. Como guía de construcción:

- U1–U5: saludos, identidad, negación básica, números/edad y familia.
- U6–U10: peticiones, lugares, rutina/tiempo, números compuestos, precios y compras.
- U11–U17: hora, actividades diarias, clima, transporte, acciones, preferencias y preguntas.
- U18–U23: demostrativos, restaurante, mercado, salud cotidiana, ropa y casa.
- U24–U32: escuela, aficiones, direcciones, planes, viajes/alojamiento, frecuencia, cortesía, descripción y conversación práctica.

Cada bloque debe aparecer en el mapa de especificación con al menos una evidencia pertinente en el examen o en una forma equivalente de evaluación acumulativa. La distribución concreta de ítems debe revisarse contra los objetivos reales de cada unidad antes de implementarse; no se debe inventar cobertura a partir de títulos de unidad.

## Requisitos de escucha

1. Cada ítem de escucha debe tener un audio real reproducible y una transcripción de referencia guardada para revisión.
2. El audio debe contener únicamente vocabulario/estructuras apropiados para el objetivo evaluado, salvo que el ítem mida explícitamente inferencia contextual.
3. Debe verificarse reproducción, volumen inteligible, velocidad natural, fallback y funcionamiento offline en navegadores/dispositivos compatibles.
4. La voz TTS puede servir como apoyo de práctica, pero no demuestra por sí sola la calidad de una evaluación auditiva ni la naturalidad de pronunciación.
5. La prueba automática debe comprobar que cada ítem auditivo apunta a un recurso de audio válido; la escucha humana debe confirmar que el recurso realmente se entiende.

## Rúbrica de producción (por tarea, 0–3)

| Puntuación | Criterio |
|---:|---|
| 0 | Sin respuesta, respuesta no interpretable o no relacionada con la tarea |
| 1 | Comunica parte del propósito con errores que dificultan la comprensión; repertorio muy limitado |
| 2 | Cumple el propósito principal con frases sencillas comprensibles; algunos errores no impiden entender |
| 3 | Cumple el propósito con claridad, vocabulario pertinente y estructuras A1 generalmente comprensibles |

El evaluador debe registrar puntuación y nota breve. No se debe inferir la calidad de pronunciación de una respuesta escrita. Si se añade producción oral, necesita una rúbrica separada y evaluación humana.

## Regla de resultado

Mantener provisionalmente el umbral interno ya configurado (80% global y al menos 60% por dimensión) solo como hipótesis para pruebas. Antes de activarlo como puerta real se debe:

- comprobar que el número de puntos por dimensión permite aplicar los mínimos sin efectos de redondeo engañosos;
- pilotar el examen con aprendices representativos y revisar dificultad, ambigüedad y consistencia;
- verificar que todas las tareas abiertas tienen puntuación humana;
- revisar si un fallo en comprensión auditiva o interacción debe impedir avanzar aunque el total sea alto.

Hasta completar ese trabajo, los resultados deben etiquetarse como práctica/piloto y no como certificación ni como desbloqueo automático de A2.

## Requisitos de implementación y pruebas

- Mantener IDs estables y compatibilidad con el motor de evaluación existente.
- Incorporar un mapa de cobertura `item_id → unidad → objetivo → dimensión → modalidad`.
- Validar que los puntos suman 40 y que las ponderaciones coinciden con el blueprint.
- Validar unicidad de IDs, existencia de opciones/respuestas, límites de puntuación y rúbricas.
- Probar que los ítems abiertos sin revisión dejan el resultado pendiente y nunca producen aprobado definitivo.
- Probar que una dimensión por debajo del mínimo impide el aprobado aunque el porcentaje global sea suficiente.
- Probar que ningún cambio del examen desbloquea A2 ni altera SRS, XP, IndexedDB o backups antes de la aprobación editorial.
- Ejecutar pruebas de navegador, restauración/offline y revisión de audio tras integrar los recursos.

## Puertas de calidad antes de activar el examen

1. **Lingüística:** revisar cada prompt, texto, opción, respuesta correcta, distractor, explicación y variante aceptada; documentar decisiones dudosas.
2. **Léxica:** continuar el cotejo KBBI entrada por entrada sin marcar como verificado lo que no se haya consultado directamente.
3. **Pedagógica:** confirmar que los ítems no exigen vocabulario o gramática que el curso aún no enseña.
4. **Audio:** comprobar los recursos y su inteligibilidad en condiciones reales.
5. **Humana:** obtener revisión competente de indonesio para naturalidad, pragmática y respuestas abiertas.
6. **Técnica:** CI y pruebas E2E verdes; persistencia y modo offline sin regresiones.

## Estado y siguiente tarea

Este documento cierra únicamente una primera especificación de evaluación. No completa el examen, no valida A1 y no autoriza mostrar A2. La siguiente implementación debe construir el mapa de cobertura y ampliar el banco por tandas pequeñas, empezando por ítems de comprensión/interacción de las unidades menos representadas, con revisión de respuestas antes de añadir puntuación. Los audios y las tareas abiertas deben permanecer explícitamente pendientes hasta su validación real.
