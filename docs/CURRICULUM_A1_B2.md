# Ruta curricular de Bahasa Studio: A1 completo y afijos A2–B2

## A1: criterios de finalización

El plan curricular define 32 unidades A1. La implementación de la rama de expansión cubre las unidades 1–23; las unidades 24–32 siguen pendientes y A1 no se considera terminado. Las unidades 1–8 cubren saludo y pronombres, frases/preguntas/negación, presentación y origen, números/edad, familia, comida, ubicación y tiempo/rutina. Las unidades 9–11 amplían los números del 11 al 100, dinero y precios, y la hora y las partes del día. Las unidades 12–14 incorporan rutina diaria, clima y transporte. Las unidades 15–17 añaden verbos de acción frecuentes, deseos/capacidad/preferencias y preguntas básicas con ada/punya. La unidad 8 conserva su función integradora; se añadirán repasos acumulativos al continuar la expansión. La versión actual incorpora más vocabulario y práctica, pero la calidad final debe evaluarse por la capacidad de producir frases nuevas y resolver situaciones cotidianas, no solo por el número de ejercicios.

Objetivos de salida:
- Presentarse y preguntar por datos personales.
- Construir frases afirmativas, interrogativas y negativas sencillas.
- Hablar de familia, preferencias, comida, precios, ubicación y rutinas.
- Comprender y producir diálogos breves con vocabulario conocido.
- Distinguir la preposición separada di (di rumah) del prefijo unido en una pasiva (dibaca), sin exigir todavía el dominio de todos los afijos.

## Expansión de A1 por tandas

La ampliación se realiza en PR pequeñas para revisar contenido y evitar duplicados. La primera tanda añade las unidades 9–11 (números del 11 al 100, dinero y precios, hora y partes del día). La segunda tanda añade las unidades 12–14 (rutina diaria, clima y transporte). La tercera tanda añade las unidades 15–17 (acciones cotidianas, querer/poder/gustar y tener/haber con preguntas básicas). La cuarta tanda añade las unidades 18–20 (demostrativos y posesión, restaurante, mercado y compras). La quinta tanda añade las unidades 21–23 (cuerpo y salud, ropa y colores, habitaciones y objetos de la casa). Las tandas usan 14–22 ejercicios por unidad y evitan asignar IDs nuevos a vocabulario ya enseñado. La incorporación de U21–23 no declara A1 terminado: quedan por auditar la cobertura completa del temario guiado, la progresión de vocabulario, los repasos acumulativos y la comprensión/producción oral. A2–B2 permanecen ocultos en la vista del curso hasta completar las 32 unidades A1.

## Progresión de afijos

El MCER describe capacidades comunicativas y no prescribe una lista oficial de afijos indonesios por nivel. Esta distribución es una decisión pedagógica, no una equivalencia oficial.

### A2 — patrones frecuentes
- Variantes frecuentes de meN- en verbos de uso común, introducidas con familias de palabras y ejemplos completos.
- Primeras pasivas con di-; distinguir prefijo unido de preposición separada.
- Reconocer otras formas derivadas sin exigir aún todos sus contrastes.

### B1 — producción y contraste
- meN- frente a di-: voz activa/pasiva y foco informativo.
- -kan e -i en familias de verbos concretos; comparar significado y participantes, no asignar una traducción fija a cada sufijo.
- -an y -nya en palabras frecuentes.
- ter- para estados/resultados y lecturas contextuales frecuentes.
- Primeras nominalizaciones con peN- y peN-an.

### B2 — matices y registro
- Contraste avanzado de -kan/-i según el verbo, sus participantes y el contexto.
- ke-an en estados, experiencias y abstracciones, separando patrones productivos de vocabulario lexicalizado.
- peN-, peN-an y per-an en textos informativos, académicos y laborales.
- -nya en cohesión textual y referencia.
- Reduplicación y compuestos como procesos distintos de la sufijación.
- Análisis de familias de palabras en textos reales y elección según registro.

## Estándar de calidad por unidad

Cada unidad debe incluir vocabulario contextualizado, explicación gramatical breve, ejercicios variados, al menos una producción propia, repaso acumulativo y ejemplos revisados por naturalidad, ortografía y traducción. Los ejercicios de escritura deben aceptar respuestas correctas alternativas cuando el motor lo permita.

## Límites y validación

Los afijos indonesios son polisémicos y las formas derivadas pueden ser lexicalizadas. Antes de ampliar los ejercicios evaluados, validar ejemplos y traducciones con una referencia fiable o una revisión lingüística competente. No inferir que un afijo tiene un solo significado.

No cambiar IndexedDB schema v1 ni backup format v3 para una ampliación curricular. Tras cada cambio, comprobar persistencia de progreso, SRS, importación/exportación y CI.


## Evaluación piloto A1 y compatibilidad

La página independiente `assessment.html` solo ofrece A1 mientras la evaluación siga siendo parcial y A1 no se haya validado. El banco A1 actual tiene 19 ítems y 24 puntos: cubre algunas áreas seleccionadas, incluidas edad (U4), familia (U5), rutina (U12) y las unidades U15–U17, pero **no debe describirse como una evaluación exhaustiva de todas las unidades A1**. Las posiciones de respuesta correcta se equilibran mediante una prueba automatizada. Las tareas abiertas necesitan tutor o evaluador competente en indonesio; no son una autocorrección fiable para principiantes.

Los vocabularios repetidos usan el ID canónico de la primera enseñanza. Para no perder progreso SRS de instalaciones o copias de seguridad anteriores, se conserva un mapa de alias de IDs históricos a IDs canónicos. No se cambia el esquema IndexedDB (v1) ni el formato de copia de seguridad (v3). La página de evaluación y su motor se incluyen en la precarga del service worker de la versión 3.7.1 para permitir su primera apertura sin conexión.
