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
- Si algo es ambiguo, haz una sola pregunta concreta.\n\n## PR2 — auditoría de distribución y lint de currículo (5 nov 2026)\n- El inventario estructural confirma 801 entradas distintas: A1 309, A2 492; no se modifica la lógica del conteo.\n- A1 U5–U8 tienen 5, 4, 5 y 6 entradas nuevas. Esto es un hallazgo para decidir en PR posteriores, no una autorización para añadir vocabulario aquí.\n- A2 U5–U40 tiene exactamente 12 entradas nuevas durante 36 unidades consecutivas. Se registra como señal de posible generación por cuota, no como error automático.\n- La morfología A2 se reporta por patrones con falsos positivos; la cobertura de di- y ter- sigue siendo un asunto para revisión posterior. Este PR no cambia contenido.\n- El lint local añade B1/B2 bloqueantes e I1–I5 informativos. Como el esquema actual no tiene campo mandatory, B1/B2 tratan todos los ejercicios publicados A1/A2 como obligatorios. No se crean estados de verificación nuevos.\n- En los trackers actuales hay 36 verified_primary y 546 not_checked entre las filas existentes; el tracker A1 solo cubre U24–U32 y deja A1 U1–U23 sin tracker. Estos son hallazgos para PR posteriores.\n- PR2 no modifica IndexedDB, backup v3, vocabulario, ejercicios, CSV ni contenido curricular.