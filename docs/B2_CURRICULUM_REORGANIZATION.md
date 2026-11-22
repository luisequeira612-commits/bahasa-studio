# Reorganización del currículo B2 (60 unidades)

**Decisión del dueño:** 7 nov 2026, autorización explícita para reorganizar el borrador conservando todo el contenido anterior.  
**Estado:** plan de migración y conservación; U1–U19 están implementadas con cinco lecciones authored cada una; U20 se implementa en la rama de trabajo con cinco lecciones y 16 ejercicios. U1–U5 son visibles; U6–U20 siguen ocultas hasta decisión explícita de publicación. La propuesta de secuencia U20–U60 está documentada en docs/B2_U20_U60_ROADMAP.md y se desarrolló bajo la autorización autónoma del dueño del 21 nov 2026.  
**Base de código:** `index.html` en `main`, commit `73fba72ee6743b71831f14febfcc159cf976a97a`; U19 ya está fusionada en `main` y U20 se incorpora mediante PR #687.

## Orden aprobado

| Bloque | Unidades | Eje temático aprobado |
|---|---:|---|
| 1 | U1–U3 | Contrastes avanzados de voz y afijos |
| 2 | U4–U6 | `-kan`, `-i` y `memper-` |
| 3 | U7–U10 | Nominalizaciones |
| 4 | U11–U12 | Reduplicación y compuestos |
| 5 | U13–U15 | U13 clíticos pronominales; U14 partículas -lah/-kah; U15 adición y alcance con pun/pula |
| 6 | U16 | Foco restrictivo y selectivo: hanya, cuma, saja, semata-mata y terutama; posición, alcance y registro |
| 7 | U17 | Discurso referido y preguntas indirectas: cláusulas con bahwa, preguntas sí/no con apakah/apa y preguntas de información integradas |
| 8 | U18 | Complementos de intención: órdenes/peticiones con menyuruh, memerintahkan, minta, pasivas con disuruh/didesak, negación y contraste supaya/agar/untuk |
| 9 | U19 | Relativas nominalizadas y cláusulas identificativas: omisión del nombre antecedente, funciones sintácticas, voz, negación y foco; reutiliza `yang`, `bukan/tidak` y `-lah`; cinco clips Piper de frase completa |
| 10 | U20–U60 | Correlativas avanzadas, conectores discursivos, adjuntos oracionales, elipsis y consolidación; secuencia propuesta en docs/B2_U20_U60_ROADMAP.md |

U19 se incorpora como progresión curricular autónoma autorizada por el dueño el 21 nov 2026: profundiza la relativa con yang ya estudiada en B1 sin repetir la construcción básica. La propuesta U20–U60 se basa en los apartados de estructuras correlativas, conectores, adjuntos oracionales y elipsis de Sneddon et al. (2010), con revisión de solapamiento contra B1 antes de cada implementación; no equivale a certificación MCER/BIPA.

## Correspondencia del borrador antiguo

| Borrador anterior | Destino posible | Tratamiento |
|---|---|---|
| Antigua U1: causativo `-kan` | Bloque U4–U6 | Conservar como material de referencia; evaluar qué ejemplos aportan contraste y no duplican contenido. |
| Antigua U2: contraste `-kan/-i` | Bloque U4–U6 | Conservar; revisar participantes, valencia y ejemplos antes de reutilizar. |
| Antigua U3: `ke-an` | Sin destino aprobado todavía | Conservar; evaluar solapamiento con B1 U13–U14 y no repetir contenido sin progresión real. |
| Antigua U4: nominalizaciones | Bloque U7–U10 | Conservar; distribuir solo después de revisar familias y posibles duplicados. |
| Antigua U5: reduplicación/compuestos | Bloque U11–U12 | Conservar; ampliar con contexto, registro y ejemplos, sin generalizar reglas. |

El contenido íntegro del borrador anterior está en `docs/B2_LEGACY_DRAFT_ARCHIVE.md`. La tabla es una guía de correspondencia, no una autorización para copiar automáticamente los ejercicios o las glosas antiguas al currículo activo.

## Reglas de construcción de cada unidad

- 14–22 ejercicios combinados por unidad.
- Al menos cuatro tipos entre opción múltiple, traducción, ordenación, escucha con audio reproducible y escritura.
- Al menos cinco ejercicios con frases completas y una producción original guiada.
- Repaso acumulativo cada 4–5 unidades.
- Enseñanza mediante textos, diálogos y familias léxicas; no listas aisladas.
- Enseñar afijos mediante familias y contextos; no asignarles una traducción fija.
- Cada forma derivada nueva debe tener un ID canónico único. Antes de reutilizar IDs antiguos, comprobar colisiones en A1/A2/B1 y dentro de B2.
- No exigir producción de una forma antes de su unidad prevista.
- A1/A2/B1 quedan intactos. No modificar IndexedDB ni el backup JSON v3; sin dependencias ni servicios externos.
- B2 permanece en desarrollo. U1–U19 están implementadas con cinco lecciones authored cada una; U20 se implementa en PR #687 con cinco lecciones y 16 ejercicios. U1–U5 son las visibles y U6–U20 siguen ocultas hasta decisión explícita de publicación. U8 fue aprobada e implementada en PR #639. U9 se implementó con cinco fragmentos fuente aprobados por el dueño, 16 ejercicios y sin vocabulario/IDs ni audio nuevos. U10 integra nominalizaciones, U11 reduplicación, U12 compuestos/idiomaticidad, U13 clíticos pronominales, U14 partículas -lah/-kah y U15 adición/foco con pun/pula (dos IDs nuevos, cuatro clips Piper y sin tareas de escucha); U16 limitadores y alcance (cuma/terutama, dos IDs, cuatro clips Piper y sin tareas de escucha); U17 discurso referido/preguntas indirectas (bahwa/apakah, dos IDs, seis clips Piper y dos ejercicios de escucha); U18 complementos de intención (cuatro IDs nuevos, reutiliza mengingatkan de B1 U5, cinco ejercicios de escucha, diez textos Piper generados en MP3/Opus); La secuencia U20–U60 está propuesta en docs/B2_U20_U60_ROADMAP.md; solo U20 se implementa en esta rama. Las unidades U21–U60 se desarrollarán por lotes y seguirán ocultas/no publicadas.

## Vocabulario y evidencia

**Autorización vigente para B2 (21 nov 2026):** el dueño autorizó continuar de forma autónoma, incluyendo vocabulario nuevo y mejoras sin aprobación individual por palabra o unidad. Mantener fuentes, motivo y estado de incertidumbre; esta autorización no habilita publicar U6–U60 ni cambiar la visibilidad de la ruta.

La primera construcción se hará con vocabulario ya existente siempre que sirva pedagógicamente. Toda palabra nueva propuesta se presentará antes al dueño con su forma, glosa, ejemplo y motivo de inclusión; no se incorporará silenciosamente. Ningún término se marcará como validado por hablante nativo. KBBI no es requisito para avanzar; los estados de evidencia se documentarán honestamente.

## Secuencia de trabajo

1. Conservar el borrador antiguo literalmente (hecho en este cambio).
2. Preparar U1–U3 según el primer bloque aprobado, con vocabulario ya enseñado y un diseño de progresión que no anticipe U4–U6.
3. Revisar el contrato de unidad, referencias, vocabulario adelantado y tipos de ejercicio en CI.
4. Continuar por bloques, incluyendo checkpoints acumulativos.
5. Seguir la hoja de ruta U20–U60 y revisar el solapamiento con B1/B2 antes de implementar cada unidad.

## Límites de este cambio

Este PR solo añade documentación de archivo y planificación. No modifica `CourseData`, la visibilidad de B2, el currículo A1/A2/B1, los trackers, IndexedDB, el backup JSON v3 ni el comportamiento de la aplicación.
