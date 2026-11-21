# B2 U11 — Reduplicación: forma, alcance y significado en contexto

**Estado:** implementada en `curriculum/b2-u11-reduplication-20261121`; cinco lecciones authored, 16 ejercicios y 12 IDs de vocabulario. Oculta/no publicada.  
**Fecha:** 21 nov 2026.  
**Bloque:** U11–U12 reduplicación y composición.

## Fuentes y límites

1. **Denistia & Baayen (2021), “The morphology of Indonesian: Data and quantitative modeling”.** Distingue reduplicación completa, imitativa, parcial y afijada; documenta formas como `memukul-mukul` (iteración activa), `pukul-memukul` (reciprocidad), `dipukul-pukul` (iteración pasiva), `melihat-lihat`, `sayur-mayur`, `gerak-gerik`, `kaya-raya`, `lelaki`, `dedaunan` y `pepohonan`. También aporta las oraciones `Buku-buku berjatuhan.` y `Kecil-kecil bisa punya pacar.` https://www.sfs.uni-tuebingen.de/~hbaayen/publications/DenistiaBaayen2021.pdf
2. **Dalrymple & Mofu (2012), “Plural Semantics, Reduplication, and Numeral Modification in Indonesian”, Journal of Semantics 29(2), 229–260.** Los nombres simples tienen número general; la reduplicación nominal puede expresar pluralidad, pero no es obligatoria. https://doi.org/10.1093/jos/ffr015
3. **Fettes (2024), “The Functions of Full Nominal Reduplication in Jakarta Indonesian: A Corpus-Based Examination”, Proceedings of the Linguistic Society of America 9(1).** Se usa solo como evidencia de variación en indonesio de Yakarta; no se generaliza automáticamente al estándar. https://doi.org/10.3765/plsa.v9i1.5695
4. **Sneddon et al. (2010/2012), ejemplos de reduplicación nominal y adverbial citados en las fuentes gramaticales consultadas.** La oración `Pulau-pulau Bali, Lombok dan Sumbawa terletak di sebelah timur pulau Jawa.` ilustra plural nominal; `Anak itu berteriak keras-keras.` se conserva como ejemplo documentado de reduplicación adjetival/adverbial.

La bibliografía ofrece ejemplos y análisis, no certificación de naturalidad para todas las variedades. No se crean formas por analogía ni se asigna una traducción fija a cada patrón.

## Vocabulario añadido

| ID canónico | Forma | Glosa española | Análisis didáctico |
|---|---|---|---|
| `b2u11_pulau_pulau` | `pulau-pulau` | islas | Reduplicación nominal; plural no obligatorio |
| `b2u11_dua_dua` | `dua-dua` | de dos en dos | Agrupación |
| `b2u11_memukul_memukul` | `memukul-mukul` | golpear repetidamente | Iteración activa |
| `b2u11_pukul_memukul` | `pukul-memukul` | golpearse mutuamente | Reciprocidad |
| `b2u11_dipukul_pukul` | `dipukul-pukul` | ser golpeado repetidamente | Iteración pasiva |
| `b2u11_melihat_lihat` | `melihat-lihat` | mirar alrededor; curiosear | Acción casual lexicalizada/contextual |
| `b2u11_sayur_mayur` | `sayur-mayur` | verduras variadas | Imitativa restringida |
| `b2u11_gerak_gerik` | `gerak-gerik` | movimientos variados; gestos | Imitativa restringida |
| `b2u11_kaya_raya` | `kaya-raya` | riquísimo; extraordinariamente rico | Intensidad imitativa |
| `b2u11_lelaki` | `lelaki` | hombre | Reduplicación parcial |
| `b2u11_dedaunan` | `dedaunan` | follaje | Reduplicación parcial |
| `b2u11_pepohonan` | `pepohonan` | árboles; conjunto de árboles | Reduplicación parcial |

Los 12 IDs se comprobaron contra el inventario de vocabulario activo de `index.html`; no se encontraron entradas canónicas previas con esas formas. Las palabras ya conocidas `buku-buku` y `orang-orang` se recuperan como conocimiento previo y no reciben IDs duplicados.

## Lecciones implementadas

1. **Reduplicación nominal y número general:** compara `pulau-pulau` con nombres simples; evita enseñar plural obligatorio; incluye `dua-dua` como agrupación.
2. **Reduplicación verbal y afijación:** contrasta iteración activa, reciprocidad e iteración pasiva; presenta `melihat-lihat` como forma contextual, no como plantilla universal.
3. **Formas imitativas y parciales:** analiza `sayur-mayur`, `gerak-gerik`, `kaya-raya`, `lelaki`, `dedaunan` y `pepohonan` sin inferir productividad libre.
4. **Contexto, foco y variación dialectal:** introduce los hallazgos de Fettes como evidencia específica de Yakarta; usa `kecil-kecil bisa punya pacar` como ejemplo contrastivo documentado.
5. **Dossier integrado:** recupera los cuatro patrones mediante oraciones publicadas y una producción guiada en español.

## Banco de ejercicios implementado

| Lección | Ejercicios | Tipos principales |
|---|---:|---|
| 1 | 3 | mc, translate_es_id |
| 2 | 3 | mc, order, fill |
| 3 | 3 | mc, fill |
| 4 | 3 | mc, fill, write |
| 5 | 4 | fill, write |
| **Total** | **16** | **5 tipos** |

Se usan oraciones completas documentadas, incluida la frase de `pulau-pulau`, `Buku-buku berjatuhan.`, `Kecil-kecil bisa punya pacar.` y `Anak itu berteriak keras-keras.`. Las paráfrasis y la producción guiada se realizan en español.

## Audio y dependencias

No se añadieron ejercicios de escucha ni archivos de audio. Los textos de U11 no tienen grabaciones Piper en el manifiesto; el motor puede recurrir a la voz instalada en el dispositivo cuando falta un MP3. Para no presentar esa voz como si fuera Piper/Edge ni degradar la calidad verificada por el dueño, se mantienen ejercicios escritos hasta que se genere y compruebe audio reproducible con el motor aprobado.

## Guardarraíles

- La reduplicación nominal no marca plural obligatorio.
- No toda reduplicación expresa intensidad, iteración o reciprocidad.
- Las formas imitativas y parciales no se generan por analogía.
- Los resultados del indonesio de Yakarta no se presentan como norma universal del estándar.
- No se afirma validación nativa ni certificación MCER/BIPA.
- U11 permanece oculta/no publicada; solo U1–U5 son visibles.
- Sin cambios a A1/A2/B1, IndexedDB v1, backup JSON v3, audio, dependencias ni servicios externos.

## Registro de implementación — 21 nov 2026

La instrucción directa del dueño autoriza continuar B2 por lotes y añadir vocabulario/mejoras sin pedir aprobación intermedia. U11 implementa 5 lecciones authored y 16 ejercicios en distribución [3, 3, 3, 3, 4], con 12 formas documentadas y cinco tipos de ejercicio. La naturalidad y adecuación de cada forma sigue siendo `not_checked` cuando no existe revisión nativa; las fuentes académicas respaldan la selección, no certifican el curso.

Siguiente unidad: U12, compuestos, fraseología y límites entre compuesto, frase fija y expresión idiomática.
