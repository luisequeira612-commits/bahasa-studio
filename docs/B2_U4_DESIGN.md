# B2 U4 — funciones de -kan y estructura de participantes

**Estado:** diseño didáctico aprobado por el dueño el 11 nov 2026; implementación en PR nueva desde `main`.  
**Eje:** `-kan`, sin comparación sistemática con `-i` ni anticipación de `memper-`.  
**Dependencias:** B2 U1–U3.

## Propósito y límites

La unidad enseña a interpretar el verbo completo y los participantes de la oración. No presenta `-kan` como una equivalencia fija de «hacer que», ni como una regla universal que añada un destinatario o benefactivo.

Se distinguen dos grupos concretos:

1. **Lectura causativa documentada:** `bersih` describe el estado «limpio»; `membersihkan` presenta a un agente que causa que una entidad quede limpia.
2. **Patrones léxicos ya aprendidos:** `memberikan`, `mengirimkan` y `menjelaskan` se trabajan con sus participantes y contextos concretos. No se afirma que todos los verbos con `-kan` funcionen igual.

No se enseña todavía una regla productiva de aplicación/benefactivo con `-kan`; los estudios describen varias funciones y advierten de la interacción con voz, sintaxis y pragmática. El contraste sistemático con `-i` queda para su unidad correspondiente.

## Base documental

- **Shiohara, Asako (2012), “Applicatives in Standard Indonesian”, *Senri Ethnological Studies* 77, pp. 59–76.** Presenta `membersihkan` como lectura causativa derivada de `bersih`, con el contraste `Kamar ini sudah bersih` / `Siti sudah membersihkan kamar ini` (pp. 66–67). También explica que formas como `berikan` y `kirimkan` no deben analizarse automáticamente como el mismo patrón causativo. https://doi.org/10.15021/00002529
- **Musgrave, Simon; Wayan Arka; Gede Primahadi W. Rajeg (2024), “Applicative constructions in standard Indonesian (Bahasa Indonesia)”, pp. 279–303.** Resume la variedad de funciones de `-kan` y `-i` y la modificación de argumentos en construcciones aplicativas. https://doi.org/10.1515/9783110730951
- **Jeong, Hyun-Kyung (2019), “Decomposing vP and Its Empirical Consequences: Indonesian -Kan Revisited”, *Studies in Generative Grammar* 29(2), 177–210.** Propone análisis causativos y aplicativos distintos según la estructura argumental. https://doi.org/10.15860/sigg.29.2.201905.177
- **Dwijatmoko, Benedictus Bherman (2021), “The Causative in Indonesian”, *Journal of Language and Literature* 21(1).** Fuente complementaria para la lectura causativa. https://e-journal.usd.ac.id/index.php/JOLL/article/view/2961

Las referencias respaldan la cautela morfosintáctica; no equivalen a certificación lingüística ni validación nativa. La unidad usa ejemplos limitados y explícitamente contextualizados.

## Objetivos

Al completar U4, el estudiante podrá:

1. Diferenciar una descripción de estado de una acción causante.
2. Identificar agente causante y entidad afectada en el ejemplo con `membersihkan`.
3. Reconocer contenido transferido y destinatario en ejemplos con `memberikan` y `mengirimkan`.
4. Identificar contenido explicado y destinatarios en el ejemplo con `menjelaskan`.
5. Interpretar las funciones desde el verbo completo y el contexto, sin generalizar el sufijo.

## Secuencia de cinco lecciones

### 1. Del estado al cambio causado
- Contrastar `Kamar ini sudah bersih` (estado) con `Siti sudah membersihkan kamar ini` (acción causante).
- Identificar `bersih` como estado y `membersihkan` como verbo de limpieza.
- Ejercicios: comprensión, traducción contextual y escucha.

### 2. Quién causa y qué resulta afectado
- Identificar a Siti como agente y `kamar ini` como entidad afectada.
- Explicar la relación causativa sin inferir participantes que no aparecen.
- Ejercicios: roles semánticos, ordenación y producción de una oración guiada.

### 3. Dar y enviar: contenido y destinatario
- Trabajar `memberikan` y `mengirimkan` como patrones léxicos concretos.
- Distinguir lo entregado/enviado de la persona indicada por `kepada`.
- Ejercicios: comprensión, traducción y escucha.

### 4. Explicar: contenido y destinatarios
- Analizar `Guru menjelaskan cara membaca kepada siswa`.
- Interpretar `cara membaca` como el contenido («cómo leer») y `kepada siswa` como los destinatarios.
- Ejercicios: comprensión, ordenación y traducción contextual.

### 5. Integrar las funciones en contexto
- Clasificar los ejemplos sin asignar una única función a `-kan`.
- Escuchar una oración completa.
- Escribir un texto breve usando al menos dos verbos ya enseñados y explicar los participantes.
- Comparar estado y causación en las dos oraciones con `bersih/membersihkan`.

## Vocabulario

No se crean palabras ni IDs nuevos. Se reutilizan exactamente cuatro entradas canónicas de B1 U4:

| ID | Forma | Glosa canónica |
|---|---|---|
| `b1u4_memberikan` | `memberikan` | Dar; entregar algo a alguien |
| `b1u4_mengirimkan` | `mengirimkan` | Enviar algo a alguien; hacer llegar |
| `b1u4_menjelaskan` | `menjelaskan` | Explicar algo a alguien |
| `b1u4_membersihkan` | `membersihkan` | Limpiar algo |

Las formas y glosas canónicas de B1 no se modifican. Los ejemplos de esta unidad no crean entradas de vocabulario adicionales.

## Contrato de implementación y calidad

- Cinco lecciones reales y secuenciadas; 16 ejercicios distribuidos `3/3/3/3/4`.
- Cinco tipos: opción múltiple, traducción, ordenación, escucha y escritura.
- Al menos cinco objetivos de oración completa y una producción original guiada.
- Todos los ejercicios y referencias de lección usan únicamente los cuatro IDs existentes.
- Sin nuevas dependencias ni servicios externos.
- B2 U4 se desbloquea después de U3; U5–U60 siguen fuera del recorrido ejecutable.
- No tocar A1/A2/B1, IndexedDB, backup JSON v3 ni progreso guardado.
- No afirmar validación nativa ni certificación MCER/BIPA.
