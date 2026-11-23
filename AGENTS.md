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
- Preservar IndexedDB v1 y el formato backup JSON v3; solo ampliarlos de forma compatible, sin migraciones destructivas y con pruebas de importación/exportación.
- Debe funcionar offline (service worker + manifest).
- Sin vidas, sin anuncios, sin funciones sociales.
- Sin agentes de IA externos dentro de la app por ahora.
- No se publica en tiendas de apps.

## Arquitectura multiidioma y selección de idiomas pendiente
La arquitectura técnica puede preparar Guardi para trabajar con varios idiomas, pero el usuario todavía está evaluando cuáles quiere añadir y en qué orden. No tratar listas, banderas, voces o códigos registrados como una decisión curricular aprobada.

- Mantener la UI, navegación y explicaciones en español.
- Los códigos registrados en LanguageManager son únicamente candidatos técnicos/inactivos, no una promesa de cursos ni una secuencia de lanzamiento.
- No crear currículos, vocabulario, audio, datasets ni seleccionar un orden de idiomas nuevos hasta que el usuario confirme su selección.
- Solo Indonesian permanece disponible. Los demás códigos siguen inactivos y no deben aparecer como cursos seleccionables.
- Verificar licencias, versión, disponibilidad, tamaño y runtime antes de incorporar cualquier recurso de voz o dataset.
- El usuario aprobó la refactorización incremental de robustez y núcleo multiidioma, pero reservó la decisión sobre qué idiomas añadir. Esta autorización permite preparar infraestructura neutral, no elegir idiomas ni crear cursos.

### Regla de independencia del idioma
- Todo código y estructura de datos nuevos deben ser independientes del idioma: no introducir textos, rutas, nombres de archivo, identificadores ni reglas fijas que solo funcionen para el indonesio.
- No hacer ahora una refactorización general ni migrar el currículo existente. El alcance es preventivo: evitar nuevas dependencias del indonesio al añadir o modificar código y datos, de modo que incorporar inglés no exija una reestructuración grande.
- Cuando un PR afecte esta hoja de ruta, la arquitectura multiidioma o la preparación para inglés, debe registrar la hoja de ruta vigente y cualquier impacto o desviación en MEMORY.md y en la descripción del PR.
- Esta regla no autoriza activar cursos sin contenido completo y pruebas; no existe todavía un orden aprobado para los idiomas nuevos.


### Núcleo multiidioma — implementación técnica gradual
- `language-manager.js` mantiene el registro cerrado de diez códigos, locale, bandera, voz candidata y ruta de audio. Solo `id` está marcado como curso disponible hasta que exista un currículo completo y probado; no activar cursos vacíos. La raíz HTML y la UI permanecen en español (`lang=es`); cada componente de contenido/voz de estudio aplicará el locale del idioma objetivo a su propio elemento, nunca al documento completo.
- `curriculum-loader.js` resuelve únicamente rutas declaradas para cursos disponibles. Los currículos nuevos deben publicar `GUARDI_CURRICULA[codigo][nivel]`; el cargador conserva adaptadores para los globals legacy de A1/A2 indonesio.
- `progress-namespace.js` centraliza las claves por idioma. El SRS y el store progress usan `codigo::id` para cursos nuevos; el indonesio conserva sus IDs históricos sin prefijo. Solo las claves de progreso de settings se namespacen; preferencias del dispositivo y `activeLanguage` siguen globales.
- `study-history.js` conserva `bahasaStudioStudyHistoryV1` para indonesio y usa `guardi_study_history_<codigo>` para otros idiomas. `adaptive-learning.js` sigue siendo lógica pura y selecciona el perfil de habilidad del idioma activo; no debe crear persistencia propia.
- IndexedDB continúa en v1 y los stores existentes. La importación v3 reemplaza solo los registros SRS del idioma de la copia mediante cursor en una única transacción; no borra los demás idiomas. Los backups antiguos sin `language` siguen siendo indonesios.
- La carga de audio por idioma y el selector UI son fases posteriores. No declarar cambio de curso en runtime hasta integrar el cargador con CourseData, el audio y la interfaz, y disponer de contenido real.

## Pensar en crecer (sin sobrediseñar)
- La selección y el orden de idiomas nuevos siguen pendientes de decisión del dueño. La arquitectura multiidioma puede avanzar de forma neutral, pero no se crearán currículos, vocabulario, audio ni datasets para otros idiomas hasta recibir confirmación explícita. Todo código y estructura nuevos deben ser independientes del idioma.
- Compartir con otros: el contenido debe estar separado del código (datos por idioma, nivel y unidad), para que añadir un curso o corregir una lección no obligue a tocar la lógica.
- Cada persona guarda su progreso en su propio dispositivo. Debe seguir siendo posible exportar e importar el progreso (backup v3) sin romper compatibilidad.
- Cualquier decisión de escalabilidad debe mantener cero backend y cero costo. Si una idea requiere servidor, cuentas o pago, no se implementa: me la propones aparte.
- Antes de compartir la app con otras personas, revisar: licencias y fuentes del vocabulario, que no haya datos personales ni claves expuestas en el repo, y que las instrucciones de uso estén claras.

## Reglas curriculares B1/B2 (estado vigente: 21 nov 2026)
- A1 (32 unidades) y A2 (40 unidades) cumplen el currículo vigente. B1 tiene 50 unidades con contenido implementado; la migración estructural de 5–6 lecciones explícitas está completada en U1–U50. No cambiar vocabulario, glosas ni explicaciones salvo corrección demostrable mediante un PR acotado.
- B2 U1–U60 están integradas en main con cinco lecciones authored por unidad (300 en total). U1–U5 son visibles; U6–U60 permanecen ocultas/no publicadas. U1–U5 son las visibles; U6–U60 permanecen ocultas hasta decisión explícita de publicación. La biblioteca Piper de main tiene 2.268 IDs indexados y 155 textos B2, con índice, manifiesto y hashes sincronizados. U20–U60 tienen una hoja de ruta propuesta en docs/B2_U20_U60_ROADMAP.md; U51–U60 están en ramas de implementación y pendientes de CI/PR. No exigir muestras MMS.
- Las unidades B1 se muestran y se pueden estudiar en cuanto su PR se fusiona; no ocultarlas mediante flags o bloqueos ligados a A1.
- Seguir la hoja de ruta docs/B2_U20_U60_ROADMAP.md. U20–U60 están integradas en main; las 60 unidades B2 están implementadas. Antes de cada lote, comprobar solapamientos con B1 y B2 anteriores, usar fuentes y mantener las unidades ocultas/no publicadas.
- Cada unidad nueva: 14–22 ejercicios, al menos cuatro tipos entre opción múltiple, traducción, ordenación, escucha con audio reproducible y escritura; al menos cinco ejercicios con frases completas y una producción original guiada. Añadir repaso acumulativo cada 4–5 unidades.
- Desde A2 en adelante, enseñar mediante textos, diálogos y familias léxicas, no listas aisladas.
- Enseñar afijos mediante familias (raíz + derivados en ejemplos completos); no asignar una traducción fija al afijo. Cada forma derivada nueva conserva su propio ID canónico; nunca duplicar una forma con IDs distintos. No exigir producción antes del nivel previsto.
- En B1, memper- y ber-kan son solo de reconocimiento. Consultar KBBI cuando esté disponible; marcar dudas y no afirmar validación nativa.
- En B2 U4 el eje es exclusivamente `-kan`; U5–U6 continúan con `-i` y `memper-` según el eje aprobado, pero el eje no autoriza por sí solo ejemplos, glosas, claves ni vocabulario nuevo; para el trabajo B2 en curso prevalece la autorización autónoma explícita del dueño registrada el 21 nov 2026.
- No cambiar IndexedDB, el formato de backup JSON v3 ni añadir dependencias/servicios externos.


### Autorización autónoma para completar B2 (decisión del dueño: 21 nov 2026)
- El dueño indicó continuar B2 de forma autónoma y por lotes, sin pedir aprobación intermedia por cada unidad; autorizó seleccionar y añadir vocabulario y mejoras sin consultas de permiso entre lotes. Esta autorización prevalece sobre las antiguas reglas de aprobación individual de ejemplos/IDs para el trabajo B2 en curso.
- Cada forma nueva debe tener fuente identificable, glosa contextual y un ID canónico único; comprobar duplicados contra A1–B2 antes de añadirla. No crear frases indonesias sin respaldo ni presentar la revisión estructural como validación nativa.
- Mantener todas las unidades nuevas ocultas/no publicadas. La autorización para desarrollar el currículo no autoriza activar U6–U60 ni cambiar el recorrido visible; la liberación seguirá siendo una decisión separada del dueño.

## Regla obligatoria de estructura didáctica A1–B2 (decisión del dueño: 12 nov 2026)
- Todas las unidades de A1, A2, B1 y B2 deben tener entre **5 y 6 lecciones didácticas reales**. Es un requisito obligatorio, no una recomendación ni una excepción por nivel.
- Una lección debe tener una secuencia/objetivo de aprendizaje y práctica propia. No cuentan como sustituto de lecciones las tandas de ejercicios, los bloques de vocabulario divididos automáticamente ni las lecciones genéricas de «repaso activo» que el motor añade para alcanzar un número.
- Distribuir el vocabulario nuevo en varias lecciones y recuperar vocabulario anterior en contextos y actividades diferentes. No introducir una palabra una sola vez y darla por aprendida; planificar recurrencia espaciada, recuperación activa y reutilización contextual.
- Las auditorías deben informar por separado lecciones explícitas, bloques derivados, repasos automáticos y lecciones visibles en runtime. El número runtime no demuestra por sí solo cumplimiento.
- Las pruebas deben exigir 5–6 lecciones explícitas para cada unidad oficial A1–B2. Mientras existan unidades históricas pendientes de corrección, la auditoría debe mostrar sus incumplimientos con claridad; no falsear el cumplimiento ni añadir excepciones silenciosas.
- No rellenar unidades con contenido artificial ni inventar vocabulario, ejemplos o explicaciones para alcanzar el número. Reestructurar y distribuir material existente cuando sea pedagógicamente válido; el contenido nuevo de B2 sigue la autorización autónoma del dueño: fuente identificable, comprobación de duplicados, glosa contextual y límites explícitos; no se afirma validación nativa.
- Esta decisión prevalece sobre contratos de pruebas antiguos que aceptaban 2–3 lecciones, y sobre frases anteriores que declaraban los niveles completos sin verificar este criterio.

## Git
- Nunca trabajar en main. Una rama por cambio y un pull request.
- El dueño ha otorgado autorización permanente para crear y fusionar PRs sin aprobación individual. Fusiona únicamente cuando el CI del último commit esté completamente verde y no haya revisiones, comentarios ni problemas pendientes; informa siempre del resultado.
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
- `scripts/check-tracker-sync.mjs`: compara los IDs curriculares únicos A1/A2 con los tres trackers, valida estados permitidos y evidencia mínima de `verified_primary`. Es la única comprobación bloqueante; se activó después de ejecutar el baseline actual con cero hallazgos y no corrige los CSV automáticamente. Los IDs compartidos entre unidades se cuentan una vez.
- `scripts/unit-contract-report.mjs`: informe informativo por unidad sobre cantidad/tipos de ejercicios, estimación explícita de frases completas, producción propia con pista, marcas de repaso y recurrencia del vocabulario. No bloquea CI.
- `scripts/check-language-coupling.mjs`: inventario informativo de textos, códigos de voz, rutas y lógica específica del idioma en el código de la app; los usos legítimos se documentan en `docs/LANGUAGE_COUPLING_SUPPRESSIONS.md`. No refactoriza ni bloquea CI.
- Los tres informes se generan localmente, sin red ni servicios externos, y se publican como artefactos del workflow. No añadir dependencias ni modificar currículo, trackers, IndexedDB o backup JSON v3.


## Audio de Guardi: motor y estado de producción — 21 nov 2026
- Piper es el motor oficial de producción: voz `id_ID-news_tts-medium`. Edge TTS queda como alternativa; MMS se abandona para producción por los problemas de pronunciación observados en las muestras.
- La biblioteca completa se regeneró y fusionó mediante PR #663 (commit `125b2a751a636f3473cd80cdc8bf2f4e15b84547`): 2.212 IDs, formatos MP3 + Opus, huellas SHA-256 y metadata de Piper. Se conservaron los 68 IDs históricos que seguían en `audio/index.json`; no se incorporaron de nuevo al manifiesto curricular.
- La metadata declara MIT para el repositorio de voces; el MODEL_CARD no especifica la licencia del dataset. No presentar MIT como una garantía general de derechos sobre el dataset o los audios generados, ni afirmar que existe una certificación legal. Conservar atribución y procedencia.
- Modelos y dependencias TTS solo en `RUNNER_TEMP`/caché de GitHub Actions; nunca guardar pesos en Git, Pages o la app. No añadir dependencias a la aplicación.
- Mantener IDs SHA-1, MP3 + Opus en `audio/id/`, SHA-256 en `audio/metadata.json`, IndexedDB v1 y backup JSON v3 sin cambios.
- Los overrides de pronunciación solo pueden cambiar el texto enviado al sintetizador; nunca alterar el texto curricular/visible, IDs o manifiesto. No fijar una pronunciación dudosa sin revisión explícita.

## Audio: workflows y verificación — 21 nov 2026
- La generación productiva se inicia mediante un flujo explícito; no debe sintetizar audio por cada push/PR. El workflow crea una rama/PR revisable y no fusiona automáticamente la biblioteca.
- No regenerar ni cambiar de motor salvo que aparezca un defecto reproducible. La migración completa y sus pruebas de CI/regresión quedaron fusionadas en #663.
- El dueño probó dos lecciones en la app publicada y confirmó que los audios suenan bien y la voz se percibe femenina. Esto verifica solo esas dos lecciones; no equivale a escuchar los 2.212 clips ni a certificar pronunciación o calidad lingüística.
- Los antiguos informes MMS/Whisper y sus auto-etiquetas son diagnósticos históricos; no son gate de producción ni certificación de pronunciación. Whisper base/small es un filtro ASR, no un veredicto lingüístico.
- Mantener runners estándar `ubuntu-latest`, límites de tiempo por job y modelos/cachés en almacenamiento temporal. No modificar IndexedDB, backup JSON v3 ni añadir dependencias a la app.


## B2: filtros de unidades implementadas — 22 nov 2026
- Cuando se amplíe el currículo B2, actualizar conjuntamente los filtros de aprendizaje, progreso, vocabulario y prompt del tutor, traducción contextual y pruebas de inventario. No dejar límites antiguos U1–U5 ni baselines fijos U1–U40.
- En PR #705 los filtros se ampliaron a U1–U45; en la rama curriculum/b2-u46-u50-ellipsis-integration-20261122 se amplían a U1–U50. Las 60 unidades están integradas en los filtros; U6–U60 siguen sujetas a la puerta de publicación y al desbloqueo secuencial. Mantener el desbloqueo secuencial y la puerta de publicación.

- En el lote U46–U50 se actualiza el inventario de 50 unidades y los filtros a U1–U50. Toda ampliación futura debe actualizar también las pruebas de progresión multi-lección y mantener fuera las unidades todavía no implementadas.
