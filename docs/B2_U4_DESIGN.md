# B2 U4 — funciones de -kan y estructura de participantes

**Estado:** implementada en `feat/b2-u4-kan-functions`; pendiente de CI y fusión.  
**Fecha:** 9 nov 2026.  
**Dependencias:** B2 U1–U3 implementadas; U4 se desbloquea después de completar U3.

## Función dentro del bloque U4–U6

U4 inicia el bloque aprobado `-kan`, `-i` y `memper-`. Se centra en reconocer una lectura causativa clara con una base adjetival y en distinguirla de verbos convencionales de transferencia o explicación que también terminan en `-kan`.

La unidad evita dos simplificaciones:

- `-kan` no equivale siempre a «hacer que» ni tiene una sola función.
- La terminación no permite deducir por sí sola que el verbo añada un destinatario, beneficiario o cualquier otro participante.

El ejemplo causativo central está documentado: `bersih` describe el estado «limpio» y `membersihkan` presenta a un agente que causa que la entidad afectada quede limpia. En cambio, `memberikan`, `mengirimkan` y `menjelaskan` se estudian como patrones léxicos ya aprendidos, identificando contenido y destinatario sin atribuir automáticamente esa estructura al sufijo.

## Inventario de vocabulario

**No se crean palabras ni IDs nuevos.** U4 reutiliza exactamente cuatro entradas canónicas de B1 U4:

| ID existente | Forma | Glosa canónica |
|---|---|---|
| `b1u4_memberikan` | `memberikan` | Dar; entregar algo a alguien |
| `b1u4_mengirimkan` | `mengirimkan` | Enviar algo a alguien; hacer llegar |
| `b1u4_menjelaskan` | `menjelaskan` | Explicar algo a alguien |
| `b1u4_membersihkan` | `membersihkan` | Limpiar algo |

Se mantienen intactas sus formas, glosas y ejemplos originales en B1. Los ejemplos nuevos de la unidad reutilizan vocabulario ya presente en el currículo y no crean entradas independientes.

## Base documental y límites

- **Shiohara, Asako (2012), “Applicatives in Standard Indonesian”, *Senri Ethnological Studies* 77, pp. 59–76.** El artículo presenta `membersihkan` como lectura causativa a partir de la base intransitiva/adjetival `bersih`, con el contraste `Kamar ini sudah bersih` / `Siti sudah membersihkan kamar ini` (pp. 66–67). También advierte que la lectura causativa con `-kan` se limita a determinadas bases y enumera `beri/berikan` y `kirim/kirimkan` entre formas donde el sufijo puede ser opcional, sin cambio semántico/sintáctico (pp. 67–68). https://doi.org/10.15021/00002529
- **Musgrave, Simon; Wayan Arka; Gede Primahadi W. Rajeg (2024), “Applicative constructions in standard Indonesian (Bahasa Indonesia)”, pp. 279–303.** El resumen académico confirma que `-kan` puede participar en construcciones aplicativas y también tiene otras funciones, incluida la causativa; su interacción con voz y argumentos impide una regla única. https://doi.org/10.1515/9783110730951
- **Jeong, Hyun-Kyung (2019), “Decomposing vP and Its Empirical Consequences: Indonesian -Kan Revisited”, *Studies in Generative Grammar* 29(2), 177–210.** Analiza diferencias entre usos aplicativos y causativos según la estructura de argumentos. https://doi.org/10.15860/sigg.29.2.201905.177

**Síntesis prudente:** la bibliografía respalda la multifuncionalidad de `-kan`, no una traducción fija ni una operación libre. En esta unidad se enseña de forma explícita el caso causativo bien documentado de `membersihkan`; los verbos de transferencia y explicación se recuperan como patrones léxicos de B1. Los usos instrumentales/benefactivos aplicativos de `-kan` quedan como conocimiento de reconocimiento, no como producción nueva, hasta disponer de ejemplos aprobados y vocabulario ya existente o expresamente autorizado.

## Objetivos

Al completar U4, el estudiante podrá:

1. Distinguir una oración que describe un estado de otra que presenta una acción que causa ese estado.
2. Identificar agente/causante y entidad afectada en `membersihkan`.
3. Reconocer que verbos convencionales como `memberikan` y `mengirimkan` expresan transferencia, sin inferir una regla universal desde `-kan`.
4. Identificar el contenido transferido o explicado y la persona destinataria.
5. Interpretar el verbo completo y sus participantes dentro de una oración, no por la terminación aislada.
6. Explicar por qué no todas las formas en `-kan` son causativas ni añaden automáticamente un participante.

## Lecciones implementadas

### Lección 1 — De un estado a un cambio causado

Contrasta `Kamar ini sudah bersih` con `Siti sudah membersihkan kamar ini`. Distingue estado, evento causante, agente y entidad afectada.

### Lección 2 — Transferencia y participantes

Recupera `memberikan`, `mengirimkan` y `menjelaskan` con sus ejemplos B1. Identifica quién actúa, qué se entrega/envía/explica y a quién, sin afirmar que `-kan` siempre introduce al destinatario.

### Lección 3 — Interpretar sin generalizar

Integra el contraste causativo y los patrones léxicos de transferencia en oraciones completas, escucha y producción guiada. El estudiante explica los papeles de los participantes y no crea formas por analogía.

## Banco de ejercicios

**16 ejercicios**, distribuidos en tres lecciones `[5, 5, 6]`:

| Tipo | Cantidad |
|---|---:|
| Opción múltiple | 5 |
| Traducción contextual | 3 |
| Ordenación | 2 |
| Escucha | 3 |
| Escritura | 3 |
| **Total** | **16** |

Hay más de cinco objetivos de oración completa y tres tareas de escritura, incluida producción guiada. La escucha utiliza el mecanismo local existente.

## Guardarraíles

- No enseñar `-kan` como equivalente universal de «hacer que».
- No afirmar que todos los verbos en `-kan` son causativos o aplicativos.
- No clasificar `memberikan` o `mengirimkan` como aplicativos por el mero hecho de llevar `-kan`; se trabajan como patrones léxicos de transferencia.
- No generalizar la causatividad de `membersihkan` a cualquier base.
- No cambiar las entradas ni glosas canónicas de B1.
- Mantener U5–U60 sin implementar y no exponerlas como disponibles.
- No modificar A1/A2/B1, IndexedDB, backup JSON v3, progreso guardado ni dependencias.
- No afirmar validación nativa ni certificación MCER/BIPA.

## Verificación

Las pruebas comprueban 3 lecciones, 16 ejercicios, cinco tipos, oraciones completas, producción guiada, referencias exclusivas a los cuatro IDs B1 existentes, conservación de formas/glosas/ejemplos canónicos, progresión B1 → B2 U1 → U2 → U3 → U4 y ausencia de exposición de U5+. El service worker usa `v3.8.84` para actualizar instalaciones existentes sin borrar progreso local.
