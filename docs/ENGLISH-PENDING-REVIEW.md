# English — release readiness

Estado: candidato de publicación en una PR de preparación. La rama publicada todavía no habilita inglés; no se ha fusionado ni publicado.

## Alcance curricular preparado

| Nivel | Unidades | Lecciones | Objetivos léxicos nuevos | Repasos sin vocabulario nuevo |
|---|---:|---:|---:|---|
| A1 | 32 | 160 | 638 | U30, U31–U32 |
| A2 | 40 | 200 | 792 | U10, U20, U30, U40 |
| B1 | 52 | 260 | 1.012 | U10, U20, U30, U40, U50, U52 |
| B2 | 60 | 300 | 1.188 | U10, U20, U30, U40, U50, U60 |
| **Total** | **184** | **920** | **3.630** | — |

Cada unidad conserva cinco lecciones y veinte actividades. Los inventarios nuevos están marcados `not_checked`; no se afirma cotejo individual completo contra CEFR-J/NGSL ni certificación oficial MCER.

## Integración y CI

- A1: PR #964, HEAD `7b0a68a663d08c2c30aa2c6e19612b8affb9d693`; Regression #46118413968 y JavaScript type checks #46118414710: **success**.
- A2: PR #971, HEAD `b0e2377c8e69ccb6f88ee17fa0494f9f39b80e79`; type checks #46118665947: **success**; regresión #46118665928 tuvo un fallo intermitente de Phase 5B y se solicitó repetir solo el job fallido. Confirmar el resultado de la repetición antes de cerrar.
- B1: PR #972, HEAD `bb8a37b5a7ea9bc5626e812060ce837bff71c54c`; CI pendiente.
- B2: correcciones editoriales en PR #948; mantener el HEAD y sus checks actuales como fuente de verdad y volver a validar en la rama final.
- La PR de preparación combina B2 editorial, manifiesto B2, disponibilidad A1–B2 y README. No fusionar sin aprobación expresa.

## Decisiones y límites

- Inglés no se habilita hasta que los cuatro manifiestos A1–B2 estén integrados y sus pruebas pasen.
- No se incluye audio en-US. Se excluyeron los MP3 Piper no revisados; `audio/en/manifest.json` y `metadata.json` están vacíos como bootstrap offline.
- El workflow de audio queda manual (`workflow_dispatch`); un push de currículo no debe generar audio.
- No se afirma revisión por hablante nativo ni certificación oficial. Los pendientes de naturalidad fina y trazabilidad de fuentes quedan documentados como límites, no se convierten en otra ronda interminable de pulido.
- No reabrir la muestra editorial ya acordada salvo que CI o una prueba de alineación descubra un error que cambie el aprendizaje.

## Gate final de publicación

1. CI verde en A1, A2, B1 y B2 sobre la cadena actual.
2. Manifiestos A1–B2 registrados en `language-manager.js`; prueba del loader cubre 184 unidades.
3. README sincronizado con el catálogo: inglés disponible A1–B2 y sin audio.
4. Instalación offline verificada con inventarios de audio vacíos.
5. Inglés solo se activa en una PR de release; no se fusiona ni publica sin aprobación expresa.
