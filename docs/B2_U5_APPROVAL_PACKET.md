# Paquete de aprobación — B2 U5 (`-i`)

**Estado:** paquete de decisión; no autoriza implementación.  
**Fecha:** 11 nov 2026.  
**Base:** `docs/B2_U5_DESIGN.md`, `docs/B2_CURRICULUM_REORGANIZATION.md` y las reglas curriculares vigentes de `MEMORY.md`.

## 1. Qué está aprobado y qué no

**Aprobado**
- El eje general B2 U4–U6: `-kan`, `-i` y `memper-`.
- B2 U1–U4 implementadas; U5 es la siguiente unidad en la secuencia.

**No aprobado**
- El desglose final de U5, sus cinco lecciones, sus ejemplos didácticos, consignas, respuestas, claves y vocabulario activo.
- Crear IDs de vocabulario o incorporar nuevas formas.
- Exponer U5 en la app.

«Continúa» permite preparar este paquete y hacer auditorías seguras; no equivale a aprobar contenido curricular.

## 2. Propuesta didáctica para decidir

El diseño preliminar existente propone tres lecciones y 16 ejercicios. Eso debe revisarse antes de implementarlo: la decisión posterior de ampliar las unidades existentes fija como objetivo cinco lecciones por unidad. Para mantener ese estándar sin inventar material, se propone distribuir los objetivos ya documentados en cinco bloques:

1. **Reconocer la forma y su base:** identificar el verbo completo con `-i` y relacionarlo con la base solo cuando la relación esté documentada.
2. **Relación de meta o lugar:** interpretar el participante integrado en la construcción sin enseñar una traducción fija («a/en») para el sufijo.
3. **Participantes del evento:** distinguir agente, afectado, meta/lugar y destinatario únicamente cuando el contexto lo respalde.
4. **Participantes y voz:** seguir los papeles semánticos cuando cambia la organización gramatical de la oración; no inferirlos por posición o terminación.
5. **Polisemia y contraste léxico:** reconocer que hay usos aplicativos y causativos; reservar el contraste `menawari/menawarkan` para un caso léxico acotado, no para una regla general de `-i/-kan`.

Distribución propuesta: **16 ejercicios en cinco lecciones (3/3/3/3/4)**, con al menos cinco oraciones completas, cuatro o más tipos de ejercicio y al menos una producción guiada. Es una distribución para aprobación, no un banco de ejercicios ya autorizado.

## 3. Formas candidatas y tratamiento propuesto

| Forma | Tratamiento propuesto | Límite |
|---|---|---|
| `menawari` / `menawarkan` | Caso léxico central para comparar dos construcciones | Primero comprobar inventario global, IDs, glosas, nivel y prerrequisitos; no asumir que ambas son vocabulario nuevo ni que son intercambiables |
| `datangi` | Reconocimiento contextual de una lectura aplicativa/meta | No producción libre ni regla productiva |
| `panasi` | Reconocimiento contextual de una lectura causativa | No producción libre ni regla productiva |
| `tanami`, `garami`, `kantongi` | Excluir del vocabulario activo por ahora | No convertir ejemplos de investigación en contenido del curso |

No se propone ningún ID nuevo en este paquete. Cualquier palabra que no exista ya en el inventario deberá presentarse antes al dueño con forma, glosa, ejemplo completo, motivo y evidencia.

## 3A. Auditoría del inventario curricular ejecutable (11 nov 2026)

**Alcance de la comprobación:** lectura de los datos curriculares activos en `curriculum-a1.js`, `curriculum-a2.js` y el bloque `CourseData` de `index.html` (que contiene B1/B2). Se buscaron las formas candidatas en esos cuatro archivos. Esta es una comprobación de presencia/ID, no una certificación lingüística.

| Candidata | Resultado en el inventario activo | Consecuencia |
|---|---|---|
| `menawari` | No encontrada como entrada curricular | Si se aprueba, sería vocabulario nuevo; no asignar ID todavía |
| `menawarkan` | No encontrada como entrada curricular | Si se aprueba, sería vocabulario nuevo; no asignar ID todavía |
| `datangi` | No encontrada como forma exacta independiente; sí existe `mendatangi` | No añadir `datangi` como entrada separada por ahora |
| `mendatangi` | Ya aparece en A2 U16 (`a2u16_mendatangi`) y B1 U5 (`b1u5_mendatangi`) | La forma derivada ya está representada dos veces con IDs distintos; no crear otro ID ni duplicarla. La posible reutilización en U5 debe decidirse tras revisar la progresión |
| `panasi` | No encontrada como entrada curricular | Mantener solo como ejemplo académico de reconocimiento; no añadir vocabulario |
| `tanami`, `garami`, `kantongi` | No encontradas como entradas curriculares | Mantener excluidas del vocabulario activo |

**Ejemplos ya presentes para `mendatangi`:**
- A2 U16, ID `a2u16_mendatangi`: `Saya mendatangi teman.` — «Visito a un amigo».
- B1 U5, ID `b1u5_mendatangi`: `Kami mendatangi kantor itu.` — «Acudimos a esa oficina».

Estos ejemplos son registros existentes, no aprobación automática para copiarlos en B2. La duplicación entre A2 y B1 requiere respetar el inventario tal como está y no generar un tercer ID.

**Decisión técnica derivada:** la propuesta de U5 puede estudiar la relación con `-i` sin introducir `datangi` como nuevo vocabulario. El contraste `menawari/menawarkan` sí requiere aprobación explícita y revisión de ejemplos completos antes de crear dos entradas nuevas. `panasi` permanece fuera de producción y del inventario activo.

## 4. Evidencia y límites

El diseño preliminar cita:
- Arka et al. (2009), sobre la polisemia aplicativo/causativa y los distintos comportamientos de `-i`.
- Arka (2012), sobre la interacción entre la clase semántica de la raíz y la lectura del sufijo.
- Rajeg (2023), estudio de corpus del par concreto `menawari/menawarkan`, incluida la variación de uso.
- Musgrave, Arka y Rajeg (2024), sobre construcciones aplicativas con `-i` y `-kan`, voz y factores sintácticos/pragmáticos.

Estas fuentes apoyan un enfoque sensible al verbo y a la construcción. No prueban la frecuencia general, el registro conversacional ni la adecuación de cada oración que se redacte para el curso. La coherencia interna no equivale a validación nativa ni a certificación MCER/BIPA. No bloquear el trabajo por falta de KBBI o hablante nativo; registrar incertidumbres como `not_checked`. No marcar `verified_primary`.

## 5. Guardarraíles no negociables

- No enseñar «`-i` = lugar/a», «`-i` siempre añade un participante» ni «`-i` siempre es aplicativo».
- No presentar `-i` y `-kan` como sustitutos universales.
- No confundir papel semántico con función gramatical ni inferir roles por terminación/posición.
- No añadir ejemplos, vocabulario, IDs, claves o ejercicios ejecutables sin aprobación.
- Mantener U5–U60 ocultas y no ejecutables hasta aprobación, implementación y pruebas.
- No modificar A1/A2/B1, IndexedDB, backup JSON v3, progreso ni dependencias.

## 6. Decisiones que debe confirmar el dueño

La aprobación de U5 requiere confirmar explícitamente:
1. ¿Aprueba el desglose de cinco lecciones de la sección 2, o quiere cambiarlo?
2. ¿Aprueba usar `menawari/menawarkan` como par léxico central, sujeto a auditoría del inventario y presentación de ejemplos completos?
3. ¿Aprueba `datangi` y `panasi` solo como reconocimiento, sin producción?
4. ¿Mantiene excluidos `tanami`, `garami` y `kantongi` del vocabulario activo?
5. ¿Aprueba el objetivo de 16 ejercicios distribuidos 3/3/3/3/4, sujeto a revisar cada consigna y respuesta antes de implementarla?

Una respuesta general como «continúa» no responde afirmativamente a estas decisiones. Tras la aprobación del alcance, el siguiente paquete deberá mostrar las formas/glosas existentes y cada ejemplo didáctico completo para revisión; solo después se preparará la implementación.

## 7. Siguiente paso técnico tras la aprobación

1. Auditar el inventario global A1–B2 para cada forma candidata y sus IDs.
2. Preparar ejemplos completos con contexto, glosa provisional, traducción y fuente/razón.
3. Ejecutar revisión de coherencia de consigna, respuesta, distractores, voz y papeles semánticos.
4. Presentar el paquete concreto al dueño.
5. Solo tras aprobación explícita: implementar U5, añadir pruebas de progresión y exposición, y verificar CI completo en el SHA exacto.

**Resultado actual:** U5 sigue siendo documental. Este archivo organiza la decisión; no cambia el currículo ejecutable ni la app.
