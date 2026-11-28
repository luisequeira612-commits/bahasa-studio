# English — release readiness

Estado: **candidato técnicamente validado en PR #973**. Esta rama prepara la publicación, pero no se ha fusionado ni desplegado en `main`.

## Alcance curricular

| Nivel | Unidades | Lecciones | Objetivos léxicos |
|---|---:|---:|---:|
| A1 | 32 | 160 | 638 |
| A2 | 40 | 200 | 792 |
| B1 | 52 | 260 | 1.012 |
| B2 | 60 | 300 | 1.188 |
| **Total** | **184** | **920** | **3.630** |

Cada unidad tiene cinco lecciones y veinte actividades. Los 3.630 son registros/objetivos curriculares, no un recuento deduplicado de expresiones únicas. En B2 hay 63 cadenas léxicas exactas que ya aparecen en A1–B1; se conservan como reciclaje entre niveles y no se cuentan como 63 expresiones nuevas. B2 tiene 1.125 objetivos distintos de los niveles anteriores.

## Cadena de integración y CI

La cadena está ordenada y cada PR es mergeable; ninguna se ha fusionado:

| PR | Alcance | Regresión | Type checks |
|---|---|---|---|
| [#959](https://github.com/luisequeira612-commits/bahasa-studio/pull/959) | A1 U1–U6 | #46116828316 success | #46116828376 success |
| [#964](https://github.com/luisequeira612-commits/bahasa-studio/pull/964) | A1 U7–U32 | #46118413968 success | #46118414710 success |
| [#971](https://github.com/luisequeira612-commits/bahasa-studio/pull/971) | A2 U1–U40 | #46118665928 success | #46118665947 success |
| [#972](https://github.com/luisequeira612-commits/bahasa-studio/pull/972) | B1 U1–U52 | #46118748152 success | #46118748177 success |
| [#973](https://github.com/luisequeira612-commits/bahasa-studio/pull/973) | Release A1–B2 + B2 editorial | #46121049593 success | #46121049577 success |

PR #973 añade el manifiesto B2, registra los cuatro manifiestos en `language-manager.js`, habilita inglés en la rama de release, actualiza README y prueba el selector de idiomas. En su head validado, regresión terminó 104/104 pasos sin fallos; informe de calidad offline y type checks también success.

## Audio y modo sin conexión

- Inglés se prepara **sin audio**. No se incluyen los MP3 Piper en-US que no han sido validados.
- `audio/en/manifest.json` es `[]`; `audio/en/metadata.json` no contiene hashes.
- El workflow de generación de audio tiene únicamente `workflow_dispatch`; un push curricular no dispara generación.
- La carga del curso y la caché offline se prueban con inventarios de audio vacíos.

## Límites editoriales declarados

- Las entradas de vocabulario siguen marcadas `not_checked`; no se afirma cotejo individual completo contra CEFR-J/NGSL.
- No se afirma revisión integral por hablante nativo ni certificación oficial MCER.
- La muestra editorial acordada (A1 U16, A2 U19, B1 U25 y B2 U29) está cerrada. Se corrigieron los dos desajustes pedagógicos encontrados y se añadieron pruebas. No abrir otra ronda de pulido estilístico.
- Las repeticiones entre niveles se mantienen como reciclaje; el recuento de objetivos no debe presentarse como número de palabras únicas.

## Gate final

1. CI verde en toda la cadena #959 → #964 → #971 → #972 → #973.
2. Manifiestos A1–B2 y loader registrados y cubiertos por pruebas.
3. README y selector reflejan Inglés A1–B2 como disponible en la rama de release.
4. Audio ausente de forma explícita y compatible con el modo offline.
5. PR #973 lista para revisión. **No fusionar ni publicar sin aprobación expresa.**
