# Política de recomendaciones adaptativas

Estado: implementación inicial en beta técnica.  
Alcance: recomendación de la siguiente actividad; no es una evaluación del nivel ni una certificación.

## Fuentes de datos

La recomendación usa únicamente datos que ya existen en el dispositivo:
- elementos de repaso vencidos en el motor SM-2;
- palabras con errores registrados y menos de cuatro repeticiones;
- siguiente lección incompleta dentro de los niveles actualmente desbloqueados;
- XP del día y objetivo diario.

No se crea un esquema de persistencia nuevo, no se envían datos a servicios externos y no se modifica el algoritmo SM-2.

## Orden de prioridad

1. **Repaso vencido:** si hay tarjetas cuyo `nextReview` ya venció o se guardaron explícitamente para repasar, ofrecer la sesión SRS existente.
2. **Refuerzo de palabras difíciles:** si no hay repaso vencido, ofrecer hasta cinco palabras con errores recientes y menos de cuatro repeticiones. Solo se marcan para repaso después de que el estudiante pulse el botón.
3. **Siguiente lección:** si no hay repaso ni palabras difíciles, continuar con la primera lección incompleta de A1 o de otro nivel ya desbloqueado.
4. **Conversación:** si no hay una lección disponible y el objetivo diario sigue abierto, sugerir una conversación práctica.
5. **Mantenimiento:** si no hay una tarea urgente, indicar que no hay actividad pendiente.

## Límites

- La recomendación es determinista, explicable y comprobable; no es un diagnóstico generado por IA.
- Los errores registrados en una palabra no demuestran por sí solos una dificultad lingüística estable.
- Los umbrales actuales (menos de cuatro repeticiones y máximo cinco palabras) son reglas iniciales de producto, no parámetros calibrados con un estudio de usuarios.
- No se cambia el orden de intervalos SM-2 ni se inventan calificaciones.
- No se recomienda contenido de A2 hasta que el gate actual de finalización A1 lo habilite; B1/B2 permanecen fuera del camino de recomendación.
- Si el estudiante marca una palabra difícil para repaso, la operación se ejecuta solo tras una acción explícita.
- Las recomendaciones deben seguir funcionando offline.

## Validación automatizada

`tests/adaptive-learning.test.cjs` comprueba prioridad de repaso, refuerzo, lección, conversación, estado de mantenimiento y entradas inválidas. `tests/curriculum-extraction.test.js` y `tests/regression.test.cjs` verifican que el módulo se cargue y se precargue offline. La CI también lo incluye en el artefacto de vista previa.

## Próximas mejoras antes de ampliar el alcance

- Evaluar si conviene adaptar por habilidad (lectura, escucha, escritura, conversación), una vez que las actividades registren resultados comparables.
- Definir ventanas temporales para distinguir errores recientes de errores antiguos.
- Recoger telemetría solo si se diseña con consentimiento y minimización de datos; la implementación actual no añade telemetría.
- Calibrar prioridades con pruebas de usabilidad antes de modificar las reglas.


## Perfil local de práctica — 2026-11-01

La aplicación registra un perfil descriptivo y local a partir de los primeros intentos:

- **Reconocimiento:** ejercicios de opción múltiple y asociación.
- **Traducción:** traducción del español al indonesio.
- **Escucha:** ejercicios con audio.
- **Construcción de frases:** ejercicios de ordenar palabras.
- **Escritura:** ejercicios escritos con respuesta comprobable y sesiones libres completadas.
- **Conversación:** número de escenarios completados; no se asigna una precisión automática a las respuestas libres.

Los contadores se guardan dentro de la clave existente `settings.studyActivity` y se incluyen en el mismo objeto `studyActivity` del backup v3. No se añade una tabla de IndexedDB ni se cambia la versión del backup. Los backups antiguos sin `skillStats` reciben contadores vacíos.

El perfil conserva solo intentos, aciertos, errores y sesiones agregadas. No guarda el texto de los borradores, transcripciones, audio ni respuestas libres. Los primeros intentos no equivalen a dominio de una habilidad: la cifra de acierto es descriptiva, mezcla lecciones y evaluaciones y todavía no se utiliza para recomendaciones adaptativas ni para declarar un nivel MCER.

Antes de usarlo para recomendaciones por habilidad habrá que definir mínimos de evidencia, separar tipos de actividad comparables y evitar conclusiones con muestras pequeñas.
