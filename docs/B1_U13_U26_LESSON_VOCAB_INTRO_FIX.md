# Corrección de introducción de vocabulario por lección: B1 U13–U26

Fecha: 7 de noviembre de 2026  
Rama: `fix/b1-u13-u26-lesson-vocab-introduction-2026-11-07`

## Hallazgo
La función `buildUnitLessons` construye el vocabulario visible de cada lección usando dos listas:
- `vocabIds`: vocabulario nuevo que se introduce en esa lección.
- `reviewVocabIds`: vocabulario que el estudiante ya debería conocer y que se recupera como repaso.

U13–U26 tenían listas de repaso en varios casos, pero no declaraban `vocabIds`. Como resultado, los ejercicios existían y podían referenciar palabras, pero el constructor no las presentaba como vocabulario nuevo en la lección correspondiente. El mismo patrón afectaba a U13–U20, no solo a las unidades más recientes.

## Corrección
- Se añadieron `vocabIds` y se ajustaron `reviewVocabIds` en las 42 lecciones de U13–U26.
- Las palabras nuevas se introducen una sola vez y en la lección correspondiente.
- Los IDs A1/A2 y las formas ya presentadas en unidades B1 anteriores quedan en listas de repaso.
- U13–U14 son consolidación de formas ya enseñadas; por eso no declaran vocabulario nuevo.
- U24, U22 y U26 contienen lecciones de consolidación sin vocabulario nuevo; muestran el repaso pertinente.
- No se cambian palabras, traducciones, ejemplos, ejercicios, glosas, estructura curricular ni contenido de A1/A2.

## Verificación
Se añade una prueba automatizada que recorre U13–U26 y comprueba:
1. Cada unidad tiene tres lecciones.
2. Cada ID nuevo de la unidad aparece en `vocabIds` exactamente una vez.
3. Cada ID de repaso ya fue introducido en A1/A2, una unidad B1 anterior o una lección anterior de la misma unidad.
4. Cada ejercicio referencia vocabulario visible en su lección (nuevo o de repaso).

La versión de caché offline pasa a `bahasa-studio-v3.8.60` para que los metadatos corregidos lleguen a usuarios offline.

## Límites
- Sin cambios en IndexedDB, backup JSON v3, datos A1/A2, vocabulario ni ejercicios.
- Sin dependencias nuevas ni servicios externos.
- La corrección no cambia el progreso: B1 26/50 unidades, 102 IDs únicos y 269 ejercicios; B2 0/60.
