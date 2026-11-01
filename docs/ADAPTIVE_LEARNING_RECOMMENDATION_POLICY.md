# Política de recomendaciones adaptativas

Estado: implementación inicial en beta técnica.
Alcance: recomendación de la siguiente actividad; no es una evaluación del nivel ni una certificación.

## Fuentes de datos

La recomendación usa únicamente datos que ya existen en el dispositivo:
- elementos de repaso vencidos o guardados explícitamente para repasar en el motor SRS;
- palabras con al menos dos errores registrados, palabras guardadas manualmente para repaso y registros antiguos sin contador de errores;
- errores aislados (un error) para sugerir un repaso ligero, sin etiquetar la palabra como dificultad persistente;
- perfil local de habilidades con intentos puntuados;
- primera lección incompleta de cada unidad accesible y su cobertura de tipos de ejercicio;
- XP del día y objetivo diario.

No se crea un esquema de persistencia nuevo, no se envían datos a servicios externos y no se modifica el algoritmo SM-2.

## Orden de prioridad implementado

1. **Repaso vencido:** si hay tarjetas listas para repasar, ofrecer la sesión SRS existente.
2. **Palabras con errores persistentes:** si no hay repaso vencido, ofrecer hasta cinco palabras con al menos dos errores válidos o guardadas manualmente. Los registros antiguos que no contienen el campo de errores se conservan por compatibilidad.
3. **Error aislado:** si no hay palabras persistentes, ofrecer hasta cinco palabras falladas una vez como repaso ligero. No se etiquetan como debilidad estable.
4. **Habilidad con menor precisión:** con al menos cinco intentos puntuados válidos, identificar la habilidad con menor proporción de aciertos. Si existe una primera lección incompleta y accesible con ejercicios de esa habilidad, recomendarla. Si escritura es la habilidad con menor precisión, ofrecer el cuaderno de escritura.
5. **Siguiente lección:** si no hay una acción de refuerzo anterior, continuar con la primera lección incompleta disponible.
6. **Conversación:** si no hay una lección disponible y el objetivo diario sigue abierto, sugerir una conversación práctica.
7. **Mantenimiento:** si no hay una tarea urgente, indicar que no hay actividad pendiente.

Los repasos vencidos y las palabras con errores conservan prioridad sobre el refuerzo por habilidad. El selector de lecciones solo recibe primeras lecciones incompletas de unidades que la aplicación ya considera accesibles; no modifica las reglas de desbloqueo ni permite iniciar lecciones bloqueadas.

## Perfil de habilidades y límites

- **Reconocimiento:** opción múltiple y asociación.
- **Traducción:** traducción del español al indonesio.
- **Escucha:** ejercicios con audio.
- **Construcción de frases:** ejercicios de ordenar palabras.
- **Escritura:** ejercicios escritos puntuados y sesiones libres completadas.
- **Conversación:** escenarios completados; no se asigna precisión automática a respuestas libres.

El umbral de cinco intentos evita recomendaciones basadas en una muestra mínima, pero no convierte las categorías en medidas plenamente comparables. Los tipos de ejercicio, la dificultad y la exposición pueden diferir. La precisión es descriptiva y no demuestra dominio, debilidad estable ni nivel MCER.

La recomendación es determinista, explicable y comprobable; no es un diagnóstico generado por IA. Los errores registrados en una palabra no demuestran por sí solos una dificultad lingüística estable. Los umbrales actuales (dos errores persistentes, cinco intentos puntuados y máximo cinco palabras) son reglas iniciales de producto, no parámetros calibrados con un estudio de usuarios.

## Privacidad, persistencia y compatibilidad

- Los datos permanecen en el dispositivo; no se añade telemetría.
- El perfil conserva contadores agregados, no el texto de borradores, transcripciones, audio ni respuestas libres.
- No se crea una tabla de IndexedDB ni se cambia la versión del backup v3.
- Los backups antiguos sin `skillStats` reciben contadores vacíos.
- Las palabras solo se marcan para repaso después de que el estudiante pulse el botón.
- No se cambia el orden de intervalos SM-2 ni se inventan calificaciones.
- La recomendación debe seguir funcionando offline.

## Validación automatizada

`tests/adaptive-learning.test.cjs` comprueba prioridad de repaso, refuerzo de palabras persistentes, errores aislados, selección por habilidad, escritura, lección, conversación, mantenimiento y entradas inválidas. Las pruebas de integración verifican que el panel use las acciones existentes y que el selector respete las unidades accesibles. La CI incluye el módulo en el artefacto de vista previa.

## Próximas mejoras antes de ampliar el alcance

- Calibrar prioridades con pruebas de usabilidad antes de modificar las reglas.
- Separar mejor tipos de actividad comparables y considerar la dificultad de los ejercicios.
- Añadir marcas temporales a eventos de error antes de describirlos como recientes o priorizarlos por recencia; el esquema actual agrega errores sin conservar su fecha.
- Evaluar si conviene adaptar por conversación, una vez que existan resultados comparables sin calificar respuestas libres por intuición.
- Mantener explícitamente pendientes las dimensiones lingüísticas que no se pueden certificar sin revisión competente.

## Perfil local de práctica — 2026-11-01

La aplicación registra un perfil descriptivo y local a partir de los primeros intentos:

- **Reconocimiento:** ejercicios de opción múltiple y asociación.
- **Traducción:** traducción del español al indonesio.
- **Escucha:** ejercicios con audio.
- **Construcción de frases:** ejercicios de ordenar palabras.
- **Escritura:** ejercicios escritos con respuesta comprobable y sesiones libres completadas.
- **Conversación:** número de escenarios completados; no se asigna una precisión automática a las respuestas libres.

Los contadores se guardan dentro de la clave existente `settings.studyActivity` y se incluyen en el mismo objeto `studyActivity` del backup v3. No se añade una tabla de IndexedDB ni se cambia la versión del backup. Los backups antiguos sin `skillStats` reciben contadores vacíos.

El perfil conserva solo intentos, aciertos, errores y sesiones agregadas. No guarda el texto de los borradores, transcripciones, audio ni respuestas libres. Los primeros intentos no equivalen a dominio de una habilidad: la cifra de acierto es descriptiva, mezcla lecciones y evaluaciones y no sirve para declarar un nivel MCER.

**Uso actual en el panel adaptativo:** `AdaptiveLearning.weakestSkill` puede añadir una observación contextual cuando una habilidad tiene al menos cinco intentos puntuados. Esa observación no cambia `recommendation.type`, `recommendation.action` ni el orden de prioridad de actividades: solo muestra la menor precisión registrada como dato orientativo. Las categorías no son todavía plenamente comparables entre sí porque agrupan tipos de ejercicios distintos; la interfaz no debe presentarlas como un diagnóstico ni como una debilidad estable.

Antes de usar el perfil para elegir actividades o ajustar dificultad por habilidad habrá que definir mínimos de evidencia, separar tipos de actividad comparables y evitar conclusiones con muestras pequeñas.


## Escritura progresiva A1–A2 — 2026-11-01

El cuaderno de escritura independiente amplía de tres a seis situaciones: tres A1 y tres A2. Las tareas A2 trabajan presupuesto personal, colaboración digital y comparación de alternativas. Cada tarea declara sus referencias léxicas y las pruebas verifican que esas palabras existan en el currículo A2.

Las tareas siguen siendo abiertas: no califican, no asignan XP/SRS ni guardan borradores. Al comparar un borrador con el ejemplo se registra únicamente una sesión agregada de escritura. Los ejemplos se presentan como orientativos y no como modelos validados por hablantes nativos.

## Precisión de conversaciones guiadas — 2026-11-01

Las respuestas de opción múltiple en conversaciones guiadas ahora registran un intento local de la habilidad `conversation` por turno. Se cuentan aciertos y errores solo cuando el estudiante elige una de las opciones guiadas. Las respuestas libres escritas o dictadas siguen sin puntuación automática y no incrementan estos contadores.

- El perfil muestra respuestas guiadas, aciertos, errores y sesiones completadas por separado.
- Los porcentajes solo se muestran a partir de cinco respuestas guiadas; antes se identifican como datos iniciales.
- Una conversación pasa a ser candidata a refuerzo adaptativo cuando tiene al menos cinco respuestas puntuadas y resulta la habilidad con menor precisión.
- La acción reutiliza el catálogo de escenarios existente; no genera diálogos nuevos ni afirma que una respuesta libre sea correcta o incorrecta.
- Repasos vencidos, palabras con errores persistentes y errores aislados conservan prioridad sobre este refuerzo.
- Se usan los contadores ya presentes en `settings.studyActivity.skillStats.conversation`; no se añade tabla, campo persistente nuevo ni versión de backup. Los backups v3 antiguos siguen recibiendo contadores vacíos.
- El perfil conserva únicamente contadores agregados; no guarda respuestas, transcripciones ni audio.

