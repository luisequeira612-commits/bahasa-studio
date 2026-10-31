# Plan de expansión y puerta de calidad de B1

Estado: fase 4 iniciada; inventario técnico del currículo B1 existente.  
Fecha de corte: 2026-10-31.

## Inventario actual

El currículo B1 está definido dentro de `CourseData` en `index.html` y contiene cinco unidades:
1. Voz pasiva con `di-`.
2. Contraste entre `meN-` y `di-`.
3. Contraste contextual de `-kan` e `-i`.
4. Familias de palabras con `-an` y `-nya`.
5. `ter-` y primeras nominalizaciones.

La pasada estructural inicial cuenta **17 entradas de vocabulario y 17 ejercicios** en esas cinco unidades. El banco de evaluación independiente tiene seis ítems B1, incluidos dos de producción abierta que requieren revisión humana. Esto es un prototipo pequeño, no un currículo B1 completo ni una evaluación calibrada.

## Brechas principales

- La cobertura se concentra en morfología; faltan secuencias de lectura, escucha, interacción y escritura sostenida.
- Hay pocos ejemplos por patrón y pocos contextos comunicativos para distinguir significado, participantes, foco y registro.
- La evaluación B1 actual no cubre con suficiente amplitud las unidades y las habilidades.
- No existe evidencia de calibración con estudiantes ni validación lingüística global.
- B1/B2 están deliberadamente excluidos de `getLearningLevels()`; no deben aparecer en recomendaciones adaptativas ni desbloquearse por error.

## Estructura objetivo propuesta

La expansión se hará por bloques y no se publicará como curso habilitado hasta superar la puerta de calidad.

| Bloque | Unidad propuesta | Evidencia comunicativa |
|---|---|---|
| Morfología y significado | U1–U5 existentes | Pasiva, activa, `-kan/-i`, `-an/-nya`, `ter-` y nominalizaciones |
| Cohesión y narración | U6: Secuenciar experiencias | Narrar una experiencia con marcadores temporales y referencias claras |
| Lectura | U7: Comprender textos informativos | Identificar idea principal, detalles y relaciones entre párrafos |
| Procesos | U8: Explicar cómo se hace algo | Describir pasos, agentes y resultados con activa/pasiva |
| Opinión | U9: Expresar y justificar una postura | Dar razones, contrastar ideas y responder a una objeción sencilla |
| Registro | U10: Adaptar el mensaje al contexto | Elegir formas de petición, respuesta y tratamiento según situación |
| Interacción | U11: Resolver una situación práctica | Negociar, aclarar, confirmar y reparar malentendidos |
| Integración | U12: Proyecto comunicativo B1 | Leer/escuchar información y producir un texto o explicación conectada |

Los contenidos gramaticales adicionales se decidirán según el objetivo de cada unidad. No se asignará una traducción fija a un afijo polisémico ni se tratarán las listas del MCER como listas oficiales de gramática indonesia.

## Requisitos mínimos por unidad nueva

- Objetivo comunicativo observable y relación explícita con los conocimientos previos.
- Vocabulario con IDs estables, glosa, ejemplo indonesio y traducción.
- Explicación breve con límites y excepciones relevantes.
- Ejercicios variados, incluyendo comprensión y al menos una producción contextualizada.
- Referencias de vocabulario que existan y pertenezcan a contenido ya presentado o a la unidad actual.
- Respuestas alternativas solo cuando exista evidencia suficiente; no inferir equivalencias por traducción literal.
- Pruebas estructurales y de regresión.
- Estado editorial explícito y fuentes trazables para decisiones lingüísticas.

## Puerta de salida de B1

1. Todas las unidades previstas tienen objetivos, ejemplos, ejercicios y referencias consistentes.
2. El banco de evaluación cubre lectura, escucha, interacción, producción y los patrones gramaticales realmente enseñados.
3. Las respuestas abiertas requieren rúbrica y revisión humana; no se aprueban por coincidencia textual.
4. Los ítems de opción múltiple tienen una respuesta defendible y distractores que no son también válidos.
5. El nivel se describe como progresión interna B1 orientativa, no como certificación oficial MCER.
6. La app conserva B1 oculto hasta que A1/A2 y la política de desbloqueo lo permitan explícitamente.
7. Pruebas offline, SRS, backups e IndexedDB siguen funcionando sin migración de esquema.

## Estado lingüístico y editorial

El inventario y las pruebas automáticas pueden demostrar estructura, referencias y coherencia interna. No certifican naturalidad, registro, gramática avanzada, adecuación MCER/BIPA ni pronunciación. Mientras no exista evidencia suficiente, los elementos deben permanecer pendientes de revisión competente y no se presentarán como validados por hablante nativo.
