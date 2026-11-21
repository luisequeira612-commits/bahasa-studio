# B2 U13 — Clíticos pronominales y ambigüedad de -nya

**Estado:** implementada en `curriculum/b2-u13-pronominal-clitics-20261121`; cinco lecciones authored, 16 ejercicios y ningún vocabulario nuevo. Oculta/no publicada.  
**Fecha:** 21 nov 2026.  
**Bloque:** clíticos pronominales; integración con U2 y U9.

## Propósito y límites

U13 consolida el sistema de clíticos pronominales sin repetir el objetivo de U2 ni convertir el patrón formal de U9 en una regla general. Contrasta proclíticos `ku-` y `kau-` con enclíticos `-ku`, `-mu` y `-nya`; enseña los usos posesivos y de objeto, y muestra por qué `-nya` depende del huésped, la voz y el contexto.

No se cubren `-lah` y `-kah` en esta unidad: son partículas con funciones discursivas/interrogativas, no parte del foco pronominal. No se exige producción de nuevas oraciones indonesias.

## Fuentes

1. **Denistia & Baayen (2021), “The morphology of Indonesian: Data and quantitative modeling”, §2.7 “Clitics”, Table 1.** Distingue proclíticos `ku-` y `kau-` de enclíticos `-ku`, `-mu` y `-nya`; documenta usos de objeto en verbos y posesivos en nombres. Explica cuatro lecturas de `-nya`: posesivo de tercera persona o determinante definido en nombres; objeto de tercera persona con verbos activos `meN-`; y pronombre de tercera persona en verbos pasivos `di-`.  
   Fuente: https://www.sfs.uni-tuebingen.de/~hbaayen/publications/DenistiaBaayen2021.pdf

2. **Universal Dependencies — Indonesian (id).** La documentación separa `mencintainya` en `mencintai` + `nya` como clítico pronominal y `bukunya` en `buku` + `nya` como posesivo; también documenta el análisis de `-nya` como determinante en construcciones nominalizadas.  
   Fuente: https://universaldependencies.org/id/index.html

3. **“Handling Indonesian Clitics: A Dataset Comparison for an MT System” (2012).** Describe la ambigüedad de `bukunya` entre lectura posesiva y determinante, y los patrones de proclíticos/enclíticos sobre verbos y nombres. Se usa como apoyo secundario, no como regla universal.  
   Fuente: https://aclanthology.org/Y12-1015.pdf

4. **Material curricular previamente aprobado.** U2 ya enseña `Buku itu kubaca` y `Buku itu kaubaca`; U9 conserva el fragmento segmentado `di-tolak-nya` para el análisis formal debatido. U13 los recupera sin crear frases nuevas ni modificar sus IDs.

## Lecciones implementadas

1. **Proclíticos y enclíticos: posición del clítico.** Contrasta `ku-`/`kau-` de U2 con `-ku`/`-mu`/`-nya` como formas pospuestas al huésped.
2. **Clíticos en nombres: posesión y determinación.** Usa `bukuku`, `bukumu` y la ambigüedad de `bukunya` entre posesivo y determinante definido.
3. **Clíticos en verbos: objeto pronominal.** Contrasta `mencintaiku`, `mencintaimu` y `mencintainya` como objetos de primera, segunda y tercera persona.
4. **Las funciones de -nya: huésped y voz.** Diferencia lecturas nominales, objeto de verbo activo `meN-` y participante de tercera persona asociado al agente en construcción pasiva `di-`; recupera el fragmento de U9 sin generalizarlo.
5. **Integración con U2 y U9.** Justifica una lectura mediante posición, categoría del huésped, voz, complemento y contexto; evita equiparar todos los usos de `-nya`.

## Banco de ejercicios

| Lección | Ejercicios | Tipos |
|---|---:|---|
| 1 | 3 | mc, order, fill |
| 2 | 3 | mc, fill, write |
| 3 | 3 | mc, order, fill |
| 4 | 3 | mc, fill, write |
| 5 | 4 | mc, fill, order, write |
| **Total** | **16** | **4 tipos** |

Todas las respuestas y producciones son análisis en español. No se añaden IDs de vocabulario ni tareas de escucha; no se inventan oraciones indonesias. Los ejemplos proceden de las fuentes indicadas o de U2/U9/B1 ya implementadas.

## Límites y verificación

- No traducir `-nya` siempre de la misma manera.
- No confundir `ku-`/`kau-` con `-ku`/`-mu`.
- No confundir el objeto en un verbo activo con el participante de tercera persona asociado al agente en una construcción pasiva.
- No equiparar los usos pronominales de `-nya` con el patrón formal debatido de U9.
- No usar guiones de segmentación morfológica como ortografía corriente.
- No afirmar validación nativa ni certificación MCER/BIPA.
- U13 permanece oculta/no publicada; U1–U5 siguen siendo las únicas unidades visibles.
- No modifica A1/A2/B1, IndexedDB v1, backup JSON v3, audio, dependencias ni servicios externos.

**Registro de implementación — 21 nov 2026:** autorización autónoma del dueño para avanzar B2 por lotes. Cinco lecciones authored, 16 ejercicios, cuatro tipos; cero vocabulario/IDs nuevos y cero audio nuevo. La auditoría automática verifica estructura y cobertura de ejemplos; no certifica naturalidad nativa.
