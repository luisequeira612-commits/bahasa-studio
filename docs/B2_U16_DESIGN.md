# B2 U16 — Limitadores y alcance: hanya, cuma, saja y terutama

**Estado:** cinco lecciones authored, 16 ejercicios, dos IDs nuevos. U16 permanece oculta/no publicada. Cuatro clips Piper de producción (MP3 y Opus) generados; no incluye tareas de escucha.

## Objetivos

- Distinguir los limitadores exclusivos `hanya`, `cuma`, `saja`, `semata-mata` y `melulu`.
- Reconocer la tendencia de registro descrita para `hanya` (más elevado) y `cuma` (más coloquial), sin convertirla en una regla absoluta.
- Interpretar el alcance amplio sobre el predicado frente al foco estrecho sobre un objeto.
- Entender la posición de `saja` después del constituyente limitado y el uso enfático de `hanya ... saja`.
- Distinguir la exclusividad de `hanya/cuma` frente a la selección principal o particular de `terutama/khususnya`.

## Evidencia y alcance

- Sneddon et al. (2010), *Indonesian: A Comprehensive Grammar*, §2.217: limitadores preverbales `hanya`, `cuma`, `semata-mata` y limitadores pospuestos como `saja` y `melulu`; ejemplos `Tadi pagi saya hanya makan roti`, `Tadi pagi saya makan roti saja` y `Dia hanya makan roti saja`.
- Sneddon et al. (2010), §2.218: `terutama` y `khususnya` como marcadores que destacan un elemento o subconjunto, sin imponer necesariamente exclusividad; ejemplo `Kenaikan pendapatan itu terutama berasal dari pajak`.
- Kroeger (2014), §4.2.2, ejemplos 36–37: contraste de registro entre `hanya` y `cuma`, alcance de los limitadores preverbales y construcción escindida para focalizar estrechamente un objeto: `Mereka cuma minum teh`, `Cuma teh yang mereka minum`; la secuencia marcada `*Mereka minum cuma teh` se refiere a la lectura de foco estrecho sobre el objeto.
- `hanya` y `saja` ya aparecen en ejemplos A2/B1; aquí se reutilizan como repaso gramatical y no reciben IDs duplicados. Los dos IDs nuevos son `b2u16_cuma` y `b2u16_terutama`.

## Contenido implementado

1. `hanya` y `cuma`: restricción, registro y posición preverbal.
2. `saja` y `melulu`: posición posterior al constituyente enfocado y combinación enfática `hanya ... saja`.
3. Alcance amplio del predicado frente a foco estrecho del objeto; construcción escindida.
4. `terutama` y `khususnya`: selección de lo principal o particular, no exclusión absoluta; nota sobre `semata-mata`.
5. Integración con U15: adición (`pun/pula/juga`) frente a restricción (`hanya/cuma/saja`) y selección (`terutama`).

Vocabulario nuevo: `b2u16_cuma`, `b2u16_terutama`. Se reutilizan ejemplos publicados; no se crean oraciones indonesias nuevas. Hay 16 ejercicios en cinco tipos: `mc`, `fill`, `order`, `write` y `translate_es_id`.

## Verificación y límites

- Pruebas de cinco lecciones, 16 ejercicios, cinco tipos, IDs globalmente únicos, referencias válidas y al menos cinco objetivos de respuesta en frases completas.
- Cuatro textos tienen audio Piper de producción en MP3 y Opus: `cuma`, `terutama` y los dos ejemplos de vocabulario. IDs: `f0c3175631be`, `3251300d4372`, `5b13931e1b71` y `4444d433c2fc`.
- Los cuatro clips están incorporados en `audio/manifest.json`, `audio/index.json` y `audio/metadata.json`; la biblioteca tiene 2.235 IDs, con 121 textos B2. Voz: `id_ID-news_tts-medium`. No hay ejercicios `listen`; las tarjetas sí disponen de pronunciación grabada.
- La evidencia documental no equivale a validación por hablante nativo ni certificación MCER/BIPA.
- No modificar IndexedDB v1, backup JSON v3, A1/A2/B1, dependencias ni visibilidad de la ruta.

## Fuentes

1. Sneddon, J. N., Adelaar, A., Djenar, D. N. & Ewing, M. C. (2010). *Indonesian: A Comprehensive Grammar* (2nd ed.), §§2.217–2.218. [PDF de consulta](https://theswissbay.ch/pdf/Books/Linguistics/Mega%20linguistics%20pack/Austronesian/Indonesian%20Reference%20Grammar%20%28Sneddon%29.pdf).
2. Kroeger, P. (2014). *External negation in Malay/Indonesian*, §4.2.2, examples 36–37. [PDF de consulta](https://www.diu.edu/wp-content/uploads/paul_kroeger/Indon-Neg-v4-Kroeger.pdf).
3. Kardana, I. N. (2013). *Marking System of Information Structure in Indonesian Language*. [DOI](https://doi.org/10.5296/ijl.v5i4.3947).

