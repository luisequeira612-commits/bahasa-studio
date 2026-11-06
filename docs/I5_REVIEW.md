# Revisión I5 — respuesta en el enunciado

PR3 — revisión de los 3 avisos del lint. **No se modifica ningún ejercicio ni opción.**

## a1_u17 — v298

- **Tipo:** mc
- **Enunciado:** «¿Qué significa «Apa»?»
- **Respuesta detectada:** «Qué»
- **Opciones:** No aparecen en el informe I5 de PR2; no se reconstruyen ni inventan en este PR.
- **Evaluación:** **falso positivo de plantilla**. El detector marca «Qué», pero en «¿Qué significa…?» ese texto es parte de la plantilla interrogativa, no la respuesta de *apa*.
- **Corrección propuesta (SIN APLICAR):** excluir las plantillas «¿Qué significa «X»?» del detector I5, o comparar contra la respuesta completa y no contra palabras funcionales de la plantilla.

## a1_u20 — v343

- **Tipo:** mc
- **Enunciado:** «¿Qué significa «kilo»?»
- **Respuesta detectada:** «Kilo»
- **Opciones:** No aparecen en el informe I5 de PR2; no se reconstruyen ni inventan en este PR.
- **Evaluación:** **falso positivo de plantilla**. «Kilo» es el término preguntado, no la respuesta española. El detector está viendo el término fuente dentro de la pregunta.
- **Corrección propuesta (SIN APLICAR):** excluir el término objetivo entre comillas de la comprobación I5; comprobar solo si la respuesta traducida aparece fuera de la zona del término preguntado.

## a2_u34 — a2u34_formal

- **Tipo:** mc
- **Enunciado:** «¿Qué significa «formal»?»
- **Respuesta detectada:** «Formal»
- **Opciones:** No aparecen en el informe I5 de PR2; no se reconstruyen ni inventan en este PR.
- **Evaluación:** **falso positivo de plantilla**. «Formal» es el término fuente, no la respuesta española; la coincidencia es esperable por la plantilla.
- **Corrección propuesta (SIN APLICAR):** excluir el término objetivo entre comillas del análisis I5 y volver a ejecutar el lint.

## Conclusión I5

Los 3 avisos son **falsos positivos del detector actual**, no problemas confirmados del currículo. Este PR no modifica el detector ni los ejercicios; solo documenta la revisión.