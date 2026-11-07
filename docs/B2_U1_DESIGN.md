# Diseño de B2 U1 — Voz, agente y foco discursivo

**Estado:** diseño editorial inicial; todavía no es una unidad publicada ni contabilizada como terminada.  
**Fecha:** 7 nov 2026  
**Base:** plan B2 aprobado y currículo B1 actual en `index.html`.  
**Alcance:** diseño sin vocabulario nuevo. Reutiliza únicamente las formas y raíces ya introducidas en B1 U1–U2.

## Objetivo de aprendizaje

Al terminar la unidad, el estudiante podrá interpretar y producir contrastes entre oraciones activas con `meN-` y pasivas con `di-` en un texto breve, identificar agente y participante afectado, y explicar por qué el hablante mantiene u omite al agente explícito según el foco del discurso.

La progresión B2 no vuelve a enseñar la formación básica de activa y pasiva de B1. Se centra en elegir y seguir el punto de vista a través de varias oraciones, no en traducir mecánicamente `meN-` como «hacer» o `di-` como «ser».

## Inventario permitido

No se incorporan entradas léxicas nuevas. Reutilización de IDs canónicos existentes:

| ID | Forma | Procedencia |
|---|---|---|
| `v211` | `membaca` | B1 U2 |
| `v212` | `menulis` | B1 U2 |
| `v213` | `menjual` | B1 U2 |
| `v214` | `mengajar` | B1 U2 |
| `v8` | `dibaca` | B1 U1 |
| `b1v001` | `ditulis` | B1 U1 |
| `b1v002` | `dijual` | B1 U1 |
| `b1v003` | `diajar` | B1 U1 |
| `b1v004` | `oleh` | B1 U2 |

Las palabras de contenido de los ejemplos (`buku`, `surat`, `buah`, `murid`, `guru`, `pasar`) y los nombres propios usados como agentes proceden de ejemplos previos del currículo. No se crearán IDs nuevos para ellas.

## Lecciones propuestas

### Lección 1 — Mismo acontecimiento, distinto punto de partida

- Contrastar pares como `Ana membaca buku` / `Buku dibaca oleh Ana`, `Rina menulis surat` / `Surat ditulis oleh Rina`.
- Identificar quién realiza la acción y qué participante se coloca en primer plano.
- Mantener el significado del acontecimiento al cambiar la construcción; no exigir traducciones españolas palabra por palabra.

### Lección 2 — Agente explícito u omitido

- Comparar `Buku dibaca oleh Ana` con `Buku dibaca`.
- Interpretar `oleh` como introductor del agente en estos ejemplos pasivos, no como una palabra obligatoria en toda pasiva.
- Elegir si el agente es relevante para el contexto o ya se conoce. No enseñar que la omisión cambia por sí sola el tiempo o el aspecto.

### Lección 3 — Continuidad del foco en un texto breve

- Leer un texto de 4–5 oraciones sobre leer un libro, escribir una carta, vender fruta o enseñar a un alumno.
- Detectar cuándo el texto mantiene el mismo tema/paciente con pasivas y cuándo vuelve a poner al agente en primer plano con una activa.
- Reescribir dos oraciones cambiando el punto de partida sin cambiar quién realiza la acción ni quién la recibe.
- Producción guiada: redactar un mini texto de 3–4 oraciones y justificar una elección de voz.

## Banco de ejercicios previsto

**16 ejercicios combinados**, sujeto a la implementación y a las pruebas del contrato:

| Lección | MC | Traducción | Ordenación | Escucha | Escritura | Total |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 2 | 1 | 1 | 1 | 0 | 5 |
| 2 | 2 | 1 | 0 | 1 | 1 | 5 |
| 3 | 1 | 1 | 1 | 1 | 2 | 6 |
| **Total** | **5** | **3** | **2** | **3** | **3** | **16** |

Los ejercicios deben usar oraciones completas; al menos cinco deben exigir interpretación de una oración completa y al menos uno debe pedir producción original guiada. Las actividades de escucha deben reproducir las oraciones con el mecanismo local ya existente. No se añadirán servicios ni dependencias.

## Guardarraíles lingüísticos y de progresión

- No introducir `ku-`/`kau-`, `ber-` ni `ter-` como objetivos nuevos en U1; se reservan para el desarrollo posterior de U2–U3.
- No presentar la pasiva `di-` como equivalente obligatorio de la pasiva española con «ser».
- No enseñar que `oleh` debe aparecer siempre ni que su omisión elimina necesariamente al agente semántico.
- Mantener separada la preposición de lugar `di` del prefijo pasivo `di-`.
- Los distractores deben diferenciar roles y foco, no basarse en opciones absurdas ni en diferencias tipográficas.
- La reutilización de IDs requiere una prueba que confirme que todos existen en el currículo anterior y que no se crean definiciones duplicadas dentro de B2.
- La unidad no debe marcarse como validada por hablante nativo ni certificada MCER/BIPA.

## Criterios para considerar U1 implementada

1. Tres lecciones con objetivos, explicación y ejercicios alineados.
2. 14–22 ejercicios combinados; mínimo cuatro tipos.
3. Al menos cinco ejercicios con oraciones completas y una producción original guiada.
4. Todos los IDs referenciados existen en A1/A2/B1; ningún término nuevo ni ID inventado.
5. Pruebas de regresión de progresión, alineación prompt-respuesta, tipos de ejercicio y ausencia de exposición anticipada.
6. B2 permanece oculto/no publicado hasta completar el currículo y pasar el flujo de liberación habitual.

**Límite de este documento:** especifica la primera unidad; no modifica `CourseData`, datos de usuario, IndexedDB, backup JSON v3 ni el comportamiento de la aplicación.
