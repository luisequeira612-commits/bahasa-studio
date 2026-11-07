# Revisión editorial contextual A2 U33–U40

**Fecha:** 6–7 de noviembre de 2026  
**Alcance:** lectura de vocabulario, ejemplos, consignas y respuestas visibles de A2 U33–U40, más una comparación interna de exposición léxica exacta contra el orden de introducción del propio currículo.

## Resultado

- Revisadas 8 unidades: 96 entradas de vocabulario, 32 lecciones y 136 ejercicios.
- No se confirmó ningún error lingüístico o de traducción con la evidencia interna disponible.
- Se detectaron 2 candidatos de exposición anticipada que requieren decisión editorial; no se clasifican como errores:
  1. **risiko — U35 → U36.** El ejemplo de investasi en U35 contiene «Investasi itu memiliki risiko», mientras que risiko se introduce como entrada de vocabulario en U36.
  2. **tanggapan — U22 → U40.** El ejemplo de U22 «Unggahan baru mendapat banyak tanggapan» usa el término antes de su introducción como entrada de vocabulario en U40.
- No se detectaron otros casos exactos de vocabulario A2 introducido después que aparezca en ejemplos anteriores de A2 U1–U40.

## Cómo interpretar los hallazgos

- La búsqueda compara formas exactas de las entradas idn con tokens de los ejemplos ex. No reconoce variantes morfológicas, flexiones, sinónimos, préstamos transparentes ni componentes de expresiones.
- La exposición anticipada puede ser legítima si el contexto permite inferir el significado; su presencia no demuestra que falte un prerrequisito ni que el ejemplo sea incorrecto.
- No se consultó KBBI ni se usaron fuentes externas para certificar naturalidad. No hay validación de hablante nativo, nivel CEFR ni pronunciación.
- Las traducciones, consignas y respuestas se leyeron como coherencia interna del material; esta revisión no equivale a una certificación lingüística exhaustiva.

## Observaciones editoriales no concluyentes

- En U34, el ejemplo «Dia mengirim ucapan terima kasih» y su glosa «Él envía un agradecimiento» son comprensibles en contexto, pero la elección de mengirim frente a otras formas de expresar agradecimiento podría revisarse con evidencia de uso antes de proponer un cambio.
- Los ejemplos de U33–U40 reutilizan vocabulario funcional y expresiones de unidades previas. No se proponen correcciones basadas únicamente en que un término no sea una entrada nueva de la unidad.

## Decisión y siguiente paso

No cambiar el currículo en esta revisión. Mantener ambos casos como candidatos editoriales pendientes y resolverlos solo en una revisión posterior con evidencia suficiente. Cualquier corrección de vocabulario, glosa, explicación o ejercicio debe ir en un PR separado y conservar IndexedDB y el backup JSON v3.

## Archivos y pruebas

- Lectura directa de curriculum-a2.js en main.
- Comparación local dentro del contenido del archivo: orden de primera introducción de vocabulario frente a apariciones exactas en ejemplos.
- No se ejecutó una nueva suite de CI en esta rama porque el cambio es exclusivamente documental; las pruebas curriculares A2 U33–U40 y la suite de calidad pasaron en CI del PR #385.
- Sin cambios en currículo, vocabulario, glosas, ejercicios, explicaciones, trackers/CSV, IndexedDB ni backup JSON v3.
