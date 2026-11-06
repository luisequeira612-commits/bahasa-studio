# AGENTS.md — Bahasa Studio

## Antes de hacer cualquier cosa
1. Lee MEMORY.md (estado actual, decisiones, pendientes).
2. Lee SKILL.md (cómo se trabaja en este proyecto).
3. Si lo que te pido contradice esos archivos, avísame antes de actuar.

## Qué es este proyecto
App web para aprender idiomas, estilo Duolingo, alojada en GitHub Pages. Hoy tiene el curso de indonesio. Es de uso personal; quizá un día la comparta gratis con amigos o una comunidad de nicho, pero no es un producto comercial. El objetivo es que quede lo mejor posible con los recursos disponibles, así que toda propuesta debe ser proporcionada. El dueño trabaja desde el celular.

## Reglas fijas (no se rompen)
- Gratuita, local, sin cuentas, sin backend, sin costos para el dueño ni para quien la use.
- Sin dependencias nuevas salvo necesidad real y con mi aprobación.
- No modificar IndexedDB ni el backup v3.
- Debe funcionar offline (service worker + manifest).
- Sin vidas, sin anuncios, sin funciones sociales.
- Sin agentes de IA externos dentro de la app por ahora.
- No se publica en tiendas de apps.

## Hoja de ruta de idiomas (decisión del dueño: 5 nov 2026)
1. **Indonesio:** completar todo el material hasta B2. A1 está completo; A2 y B1 están pendientes de consolidación; B2 se desarrollará después. No añadir ningún otro idioma hasta completar el indonesio hasta B2.
2. **Inglés:** se añadirá después del indonesio, desde nivel cero (A1), pensado para hispanohablantes. Incluir pronunciación con audio o transcripción sencilla, falsos amigos y verbos frasales.
3. **Otros idiomas:** no hay ningún otro idioma planificado por ahora. Cualquier idioma adicional lo decidirá el dueño más adelante.

### Regla de independencia del idioma
- Todo código y estructura de datos nuevos deben ser independientes del idioma: no introducir textos, rutas, nombres de archivo, identificadores ni reglas fijas que solo funcionen para el indonesio.
- No hacer ahora una refactorización general ni migrar el currículo existente. El alcance es preventivo: evitar nuevas dependencias del indonesio al añadir o modificar código y datos, de modo que incorporar inglés no exija una reestructuración grande.
- Cuando un PR afecte esta hoja de ruta, la arquitectura multiidioma o la preparación para inglés, debe registrar la hoja de ruta vigente y cualquier impacto o desviación en MEMORY.md y en la descripción del PR.
- Esta regla no autoriza a empezar inglés antes de completar indonesio hasta B2 ni a introducir idiomas adicionales no decididos por el dueño.

## Pensar en crecer (sin sobrediseñar)
- Aplicar la hoja de ruta del 5 nov 2026: indonesio hasta B2 → inglés A1 para hispanohablantes; no hay otros idiomas planificados. Todo código y estructura de datos nuevos deben ser independientes del idioma. No hacer ahora una refactorización general ni añadir inglés antes de completar indonesio hasta B2.
- Compartir con otros: el contenido debe estar separado del código (datos por idioma, nivel y unidad), para que añadir un curso o corregir una lección no obligue a tocar la lógica.
- Cada persona guarda su progreso en su propio dispositivo. Debe seguir siendo posible exportar e importar el progreso (backup v3) sin romper compatibilidad.
- Cualquier decisión de escalabilidad debe mantener cero backend y cero costo. Si una idea requiere servidor, cuentas o pago, no se implementa: me la propones aparte.
- Antes de compartir la app con otras personas, revisar: licencias y fuentes del vocabulario, que no haya datos personales ni claves expuestas en el repo, y que las instrucciones de uso estén claras.

## Git
- Nunca trabajar en main. Una rama por cambio y un pull request.
- NO hacer merge sin mi autorización explícita ("Aprobado").
- Si el CI falla, no fusionar: diagnosticar y corregir en la misma rama.
- Cada PR incluye: qué cambió, archivos tocados, cómo se probó, riesgos.
- Cada PR actualiza MEMORY.md. Sin excepción.

## Contenido en indonesio y verificación (el proyecto NO se detiene)
Contexto: no hay hablante nativo que valide el contenido, y la API secundaria de KBBI puede fallar o dar resultados dudosos. Eso NO es motivo para detener el proyecto ni bloquear PRs. El contenido sigue avanzando, pero con estados honestos:
- "verified_primary": revisado por mí contra una fuente primaria oficial. NUNCA lo marques tú; solo yo.
- "cross_checked": el término y su traducción coinciden en al menos 2 fuentes secundarias independientes (por ejemplo: API KBBI secundaria, otro diccionario en línea, Wiktionary, un corpus o ejemplos de uso reales). Anota qué fuentes se usaron en el tracker CSV. Si añadir este estado exigiera cambiar el esquema de IndexedDB, NO lo añadas: usa "not_checked" y anota las fuentes cruzadas solo en el tracker.
- "not_checked": todo lo demás, incluido lo que viene de IA sin cruce de fuentes.
Reglas:
- Si KBBI falla, no te detengas: usa otras fuentes secundarias, deja el término en "cross_checked" o "not_checked" según corresponda, y anótalo en el informe.
- Si hay duda real sobre una palabra, una traducción o una explicación gramatical, prefiere la opción más simple y de uso común, márcala "not_checked" y dilo claramente. No inventes.
- Prioriza vocabulario básico y de alta frecuencia: es donde menos riesgo de error hay.
- Si una fuente falla repetidamente (por ejemplo el workflow de KBBI), no lo arregles dentro de otro PR: propónmelo como tarea aparte.
- Si descubres un error en contenido ya publicado, corrígelo en un PR y regístralo en MEMORY.md.
- En el informe final, indica cuántos términos nuevos quedaron en cada estado.

## Ahorro de tokens
- No leas todo el repo. Lee siempre AGENTS.md, MEMORY.md y SKILL.md, y luego solo los archivos relacionados con la tarea.
- Para ubicar código, usa búsqueda por nombre o texto antes de abrir archivos completos.
- No releas archivos que ya leíste en esta tarea, salvo que hayan cambiado.
- Mantén MEMORY.md por debajo de unas 150 líneas: cuando una etapa termine, resúmela en 1–2 líneas y elimina el detalle antiguo.
- Al actualizar MEMORY.md, edita solo las secciones que cambiaron; no lo reescribas entero.

## Al terminar cada tarea o PR
- Actualiza MEMORY.md: estado, decisiones nuevas, pendientes y fecha.
- Si se completó un nivel o unidad nueva (por ejemplo B1 o B2), registrar qué se terminó, qué queda y qué se decidió.
- Responde corto: qué hiciste, qué probaste, qué queda pendiente.

## Cómo responder
- En español, breve, empezando por el resultado.
- Distingue entre "probado", "revisado por lectura" y "no verificado".
- Si un cambio es excesivo para una app personal, propón la versión más simple.
- Si algo es ambiguo, haz una sola pregunta concreta.

## PR3 — tracker A1 U1–U23 y revisión I4/I5 (5 nov 2026)
- El tracker A1 U1–U23 debe conservar exactamente el esquema de U24–U32 y usar `not_checked` hasta revisión humana; no se inventan estados ni fuentes.
- PR3 añade 238 filas porque el inventario bruto de U1–U23 tiene 239 registros y `v465` ya estaba cubierto por el tracker U24–U32. Los IDs repetidos dentro de U1–U23 se conservan como filas separadas.
- PR3 no modifica vocabulario, ejercicios, glosas, explicaciones ni contenido curricular.

## PR2 — auditoría de distribución y lint de currículo (5 nov 2026)
- El inventario estructural confirma 801 entradas distintas: A1 309, A2 492; no se modifica la lógica del conteo.
- A1 U5–U8 tienen 5, 4, 5 y 6 entradas nuevas. Esto es un hallazgo para decidir en PR posteriores, no una autorización para añadir vocabulario aquí.
- A2 U5–U40 tiene exactamente 12 entradas nuevas durante 36 unidades consecutivas. Se registra como señal de posible generación por cuota, no como error automático.
- La morfología A2 se reporta por patrones con falsos positivos; la cobertura de di- y ter- sigue siendo un asunto para revisión posterior. Este PR no cambia contenido.
- El lint local añade B1/B2 bloqueantes e I1–I5 informativos. Como el esquema actual no tiene campo mandatory, B1/B2 tratan todos los ejercicios publicados A1/A2 como obligatorios. No se crean estados de verificación nuevos.
- En PR2 había 582 filas CSV: 36 `verified_primary` y 546 `not_checked`. El 57 del informe anterior contaba ocurrencias curriculares, no filas CSV: las 56 filas `not_checked` de U24–U32 más la ocurrencia duplicada de `v465` en U1–U23 suman 57 ocurrencias para 56 filas no verificadas. En el conjunto, 90 filas del tracker U24–U32 representan 91 ocurrencias curriculares al incluir esa repetición de `v465`; la fila de U32 ya representa el mismo ID y por eso U1–U23 no necesita otra. La misma deduplicación explica que U1–U23 tenga 239 registros curriculares, pero solo 238 filas nuevas.
- PR2 no modifica IndexedDB, backup v3, vocabulario, ejercicios, CSV ni contenido curricular.

## PR4 — comprobaciones automáticas de calidad
- `scripts/check-tracker-sync.mjs`: compara los IDs curriculares únicos A1/A2 con los tres trackers, valida estados permitidos y evidencia mínima de `verified_primary`. Es la única comprobación potencialmente bloqueante; antes de activarla se ejecuta en modo informativo y no se corrigen los CSV automáticamente. Los IDs compartidos entre unidades se cuentan una vez.
- `scripts/unit-contract-report.mjs`: informe informativo por unidad sobre cantidad/tipos de ejercicios, estimación explícita de frases completas, producción propia con pista, marcas de repaso y recurrencia del vocabulario. No bloquea CI.
- `scripts/check-language-coupling.mjs`: inventario informativo de textos, códigos de voz, rutas y lógica específica del idioma en el código de la app; los usos legítimos se documentan en `docs/LANGUAGE_COUPLING_SUPPRESSIONS.md`. No refactoriza ni bloquea CI.
- Los tres informes se generan localmente, sin red ni servicios externos, y se publican como artefactos del workflow. No añadir dependencias ni modificar currículo, trackers, IndexedDB o backup JSON v3.
