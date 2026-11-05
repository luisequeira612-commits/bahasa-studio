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

## Pensar en crecer (sin sobrediseñar)
- Varios idiomas: no asumir que el único idioma es indonesio (textos, rutas, nombres de archivo, vocabulario, auditoría). No refactorizar ahora; solo no cerrar la puerta.
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