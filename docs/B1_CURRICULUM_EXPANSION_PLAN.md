# Plan de expansión y puerta de calidad de B1

Estado: fase 4 en desarrollo; borrador ampliado a doce unidades, aún oculto y pendiente de revisión editorial.  
Fecha de corte: 2026-10-31.

## Inventario actual

El currículo B1 está definido dentro de `CourseData` en `index.html`. El inventario actual contiene doce unidades:
1. Voz pasiva con `di-`.
2. Contraste entre `meN-` y `di-`.
3. Contraste contextual de `-kan` e `-i`.
4. Familias de palabras con `-an` y `-nya`.
5. `ter-` y primeras nominalizaciones.
6. Conectores para narrar experiencias y relacionar ideas.
7. Lectura y resumen de información.
8. Procesos y resultados con voz pasiva.
9. Opiniones y justificaciones.
10. Comunicación formal y cortesía.
11. Aclarar, negociar y resolver malentendidos.
12. Integrar información y presentar conclusiones.

La ampliación de U6–U12 incorpora **35 entradas nuevas de vocabulario y 35 ejercicios**, para un total de **52 entradas y 52 ejercicios** en doce unidades. El banco de evaluación independiente pasa de seis a **veinte ítems**: incluye tres tareas de escucha, tres preguntas de comprensión de un texto más extenso, tres tareas de producción escrita abierta y una tarea oral, todas las respuestas productivas pendientes de revisión humana. La expansión es un borrador de contenido beta; no constituye un currículo B1 completo ni una evaluación calibrada.

## Brechas principales

- La cobertura ahora incluye una muestra inicial de escucha, lectura, interacción y producción; todavía faltan más textos de lectura y variedad de escucha y muestras orales suficientes para cubrir las habilidades B1.
- Hay pocos ejemplos por patrón y pocos contextos comunicativos para distinguir significado, participantes, foco y registro; la progresión necesita una revisión de carga y recurrencia.
- La evaluación B1 actual no cubre con suficiente amplitud las unidades y las habilidades.
- No existe evidencia de calibración con estudiantes ni validación lingüística global.
- B1/B2 están deliberadamente excluidos de `getLearningLevels()`; no deben aparecer en recomendaciones adaptativas ni desbloquearse por error.

## Estructura objetivo y estado del borrador

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


## Avance de contenido B1 — U6–U12

Se incorporaron siete unidades nuevas al borrador oculto:
- U6: `ketika`, `meskipun`, `namun`, `oleh karena itu`, `sementara itu`.
- U7: `menurut`, `berdasarkan`, `laporan`, `meningkat`, `menurun`.
- U8: `dilakukan`, `digunakan`, `diproses`, `dihasilkan`, `langkah`.
- U9: `pendapat`, `alasan`, `setuju`, `berbeda`, `sebaliknya`.
- U10: `mohon`, `harap`, `menghubungi`, `bersedia`, `tersedia`.

Se añadieron cinco preguntas de opción múltiple para cubrir conectores, lectura de informes, voz pasiva, opinión y registro formal; una pregunta de interacción; una tarea oral con rúbrica; una tarea de síntesis escrita; y una tarea inicial de escucha. El banco incorpora explícitamente las habilidades `register`, `interaction` y `comprehension`. Las tres tareas escritas abiertas y la tarea oral requieren revisión humana; los ítems cerrados solo prueban comprensión de los ejemplos redactados y no validan el dominio productivo.

La prueba `tests/b1-curriculum-readiness.test.cjs` ahora fija la estructura de doce unidades, 52 entradas y 52 ejercicios, comprueba que cada ejercicio apunte a vocabulario de su unidad, y confirma que B1 permanezca oculto. Las formas y ejemplos nuevos son material beta pendiente de revisión lingüística; no se deben presentar como validados por hablante nativo.


U11 incorpora estrategias de aclaración y negociación (`bisa diulangi?`, `maksud saya`, `bagaimana kalau`); U12 incorpora vocabulario de experiencia, explicación, respuesta y conclusión. Se añadieron al banco una pregunta de interacción, una tarea oral con rúbrica y una tarea de síntesis escrita. Las tareas abiertas y orales quedan explícitamente pendientes de evaluación humana y no reciben crédito automático.


## Lectura B1 ampliada

Se añadió un texto informativo breve sobre un programa comunitario de lectura, con tres preguntas separadas de idea principal, detalle e inferencia. El texto permite comprobar comprensión de conectores y tendencias en contexto, pero sigue siendo una única muestra de lectura y no cubre por sí sola el rango de textos B1.


Las tareas de escucha distinguen respuesta breve por contenido de transcripción literal: el formulario permite una etiqueta de respuesta específica por ítem. Los tres audios/textos son cortos y sintetizados por el motor de voz del navegador; aún no sustituyen grabaciones de hablantes ni una evaluación de comprensión auditiva con variedad de voces y velocidades.
