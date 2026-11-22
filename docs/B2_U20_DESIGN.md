# B2 U20 — Coordinación correlativa baik … maupun

**Estado:** implementada en la rama de trabajo; cinco lecciones authored, 16 ejercicios y cuatro tipos (mc, translate_es_id, order, write). Sin vocabulario nuevo ni IDs léxicos. Cinco frases fuente ya tienen clips Piper generados en MP3 y Opus; la unidad permanece oculta/no publicada hasta que termine CI.
**Fecha:** 21 nov 2026.
**Dependencias:** B1 U18–U21 (condiciones, concesión, contraste, causa/consecuencia); B2 U15 (pun aditivo/focalizador, no confundir con la conjunción correlativa maupun).

## Propósito y alcance

La construcción baik … maupun destaca que una afirmación se aplica a dos elementos coordinados. Baik precede al primer miembro y maupun al segundo. Los miembros deben conservar una función sintáctica paralela; pueden ser sujetos, frases preposicionales u otros constituyentes equivalentes.

Cuando el predicado se niega, la construcción puede interpretarse como «ni … ni …». La fuente también documenta la omisión de baik en algunos usos y su colocación antes del primer miembro y de maupun antes del último cuando se coordinan más de dos elementos. Estas variantes se presentan como posibilidades documentadas, no como reglas libres para cualquier contexto.

## Base documental

Sneddon, J. N., Adelaar, A., Djenar, D. N. & Ewing, M. C. (2010), *Indonesian: A Comprehensive Grammar*, 2.ª ed., §4.82, pp. 357–358. La sección documenta estos ejemplos, usados literalmente en la unidad:

- Baik Ana maupun Ira tinggal di Jakarta.
- Baik di kota maupun di desa sepak bola digemari orang.
- Baik kepandaian maupun kecantikan tidak berguna untuk mencapai kebahagiaan.
- Mereka berjuang untuk bangsa maupun untuk keluarga.
- Baik orang Cina, orang Jepang, orang India maupun orang Portugis berdagang di Jakarta.

Fuente: vista previa del libro; sección 4.82 reproducida en la vista de texto enlazada en el roadmap.

## Lecciones

1. Incluir dos miembros: baik … maupun.
2. Coordinar frases con la misma función.
3. Lectura negativa: ni … ni …
4. Cuando baik se omite.
5. Coordinar más de dos elementos.

## Contrato de ejercicios

- Cinco lecciones authored y 16 ejercicios (3/3/3/3/4).
- Cuatro tipos: opción múltiple, traducción español→indonesio, ordenación y escritura guiada.
- Cinco traducciones con oraciones completas, tomadas de Sneddon et al. (2010), §4.82.
- Una producción original guiada; la respuesta modelo reutiliza un ejemplo documentado.
- vocab: [], vocabIds: [] y reviewVocabIds: []. No se crean IDs duplicados ni se modifica el vocabulario previo.
- Las cinco respuestas de traducción completas tienen audio generado selectivamente con Piper; no se regeneró la biblioteca completa. La comprobación de audio-manifest.test.mjs pasó en el workflow de generación. No se añadieron ejercicios listen porque el contrato ya contiene cuatro tipos.

## Límites

La fuente gramatical respalda el análisis y los ejemplos, pero no equivale a validación por hablante nativo ni certificación MCER/BIPA. La unidad permanece oculta/no publicada. No se modifica A1/A2/B1, IndexedDB v1, backup JSON v3 ni dependencias.


## Audio generado

Generación selectiva Piper (workflow de GitHub Actions, ejecución 44984996460). Los cinco textos quedaron en el índice y manifiesto de audio y tienen MP3/Opus:

| Texto | ID |
|---|---|
| Baik Ana maupun Ira tinggal di Jakarta. | aaea322c234f |
| Baik di kota maupun di desa sepak bola digemari orang. | 53ab5e861d20 |
| Baik kepandaian maupun kecantikan tidak berguna untuk mencapai kebahagiaan. | 1358c0f87fdd |
| Mereka berjuang untuk bangsa maupun untuk keluarga. | fb0ab6b6fbed |
| Baik orang Cina, orang Jepang, orang India maupun orang Portugis berdagang di Jakarta. | 36f1d5be2e3d |

Tras la generación: 2.261 IDs en audio/index.json, 2.261 entradas en audio/manifest.json y 2.261 hashes en audio/metadata.json; B2 aporta 148 entradas. El test técnico de manifiesto y generación terminó correctamente. Esto verifica integridad y presencia, no calidad perceptiva de pronunciación.
