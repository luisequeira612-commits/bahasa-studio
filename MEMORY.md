# MEMORY.md — Estado de Bahasa Studio

> Se actualiza en CADA PR. Mantener corto (unas 150 líneas como máximo). Última actualización: 5 nov 2026.

## Visión
- App para aprender idiomas, estilo Duolingo, en rojo y blanco.
- Hoy existe el curso de indonesio; A1 y A2 están construidos. B1 y B2 siguen pendientes.
- Más idiomas en el futuro, sobre todo los que Duolingo no ofrece para hispanohablantes. Candidatos: tagalo, tailandés, toki pona, ido.
- Uso personal; posible futuro: compartirla gratis con amigos o una comunidad de nicho.
- Prioridad principal del dueño: perfeccionar esta app y aprender idiomas con ella.
- Terminar bien el indonesio antes de abrir un segundo idioma.

## Estado actual del currículo
- A1: 32 de 32 unidades hechas.
- A2: 40 de 40 unidades hechas. U5–U8 siguen en consolidación; PR #337 aclara el vocabulario objetivo de 16 prompts de traducción.
- B1 y B2: pendientes.
- Sistema de calidad: auditoría estructural/editorial independiente de KBBI y cola editorial para vocabulario y ejercicios.

## Interfaz (ya hecho)
- Barra inferior de 4 pestañas: Aprender / Repasar / Tutor / Perfil.
- Barra superior con racha y XP.
- Camino de unidades A1.
- Traducción al tocar palabras (burbuja) y explicaciones contextuales (PR #45, #46).
- Botón "crear nueva lección con IA" (Gemini), guarda offline.
- Historial y estadísticas: implementados, por consolidar.

## Estado de PR y sistema de calidad
- PR #337 fusionado en `591567a47b592d66a261e79375fd94fca3714e51`: aclara objetivos de vocabulario de 16 prompts A2 U5–U8; caché v3.8.54.
- PR #338 fusionado: incorpora AGENTS.md, MEMORY.md y SKILL.md.
- PR #342 fusionado en `5014b5f703e61385d15643e4510fb35787b73c57`: filtros seguros por nivel/unidad en cola editorial.
- PR #343 fusionado en `785a31f08ad80ea07b0be550c1dbfb361043cf2`: paquetes editoriales acotados por nivel/unidad/prioridad.
- PR #344 fusionado en `817b4246b0f6302544e09b357041e95f44cd791b`: parser CSV compatible con campos multilínea/comillas y pruebas integradas en CI.
- PR #345 reemplaza el antiguo #340: cobertura diferenciada de audioText, ejercicios listen y soporte general; CI verde, pendiente de aprobación.
- PR #346 reemplaza el antiguo #341: desglose editorial por unidad; primer CI detectó que faltaba exponer `by_unit` en el objeto devuelto. Corrección aplicada en `4b2bc488`; CI de ese commit pendiente.
- PR #339 antiguo permanece abierto sobre base obsoleta; no fusionar. Su registro se puede incorporar en una futura actualización documental, no es un cambio funcional.
- Cola editorial: las entradas siguen pendientes/no revisadas; la certificación lingüística sigue en not_certified.
## Pendiente (en este orden)
1. Revisar la cola editorial por tandas de nivel/unidad con evidencia; último informe: 1,989 entradas pendientes, todas sin revisión editorial ni certificación lingüística. PR #342 permite exportaciones acotadas y PR #343 genera paquetes por unidad/prioridad.
2. Consolidar A2 y continuar la revisión de A1 U24–U32.
3. Mejorar el tutor conversacional.
4. Aprendizaje adaptativo y repaso con repetición espaciada.
5. Pronunciación y escucha.
6. Lección a pantalla completa con hoja de feedback y pulido visual.
7. B1 y luego B2.
8. Cuando el indonesio esté sólido: preparar la estructura para un segundo idioma y, si decido compartir la app, la revisión previa a compartir (licencias, datos expuestos, instrucciones de uso).

## Decisiones tomadas
- No añadir capa de IA extra dentro de la app por ahora.
- La app no se publica en tiendas de apps.
- Sin vidas, sin anuncios, sin social.
- Siempre gratuita, local, sin cuentas y sin backend, incluso si se comparte.
- Más vocabulario básico repetido en distintos contextos dentro de cada unidad.
- Un segundo idioma solo se empieza con autorización del dueño y después de proponer cómo organizar los datos por idioma sin cambiar IndexedDB ni el backup v3.
- No se usan herramientas locales de memoria de código (tipo MCP): se trabaja desde el celular; la memoria del proyecto son estos tres archivos.
- Todo merge requiere "Aprobado" explícito del dueño; ChatGPT no fusiona por su cuenta.
- No hay hablante nativo que valide el indonesio y KBBI puede fallar: el proyecto NO se detiene por eso. El contenido avanza con estados honestos (verified_primary solo lo marca el dueño; cross_checked = 2+ fuentes secundarias independientes; not_checked = el resto) y se corrigen errores cuando se descubran.

## Reparto de herramientas
- Claude: revisión técnica y curricular antes de aprobar.
- Gemini: ideas de experiencia de usuario.
- ChatGPT: integra cambios en el repo (rama + PR) y los valida.

## Estado técnico de referencia
- Service worker en main: cache bahasa-studio-v3.8.54 (tras PR #337).
- Scripts de calidad disponibles: scripts/audit-curriculum-quality.mjs, scripts/build-editorial-review-queue.mjs, scripts/build-unified-quality-report.mjs y scripts/build-deepseek-review-packet.mjs.
- IndexedDB v3 y backup v3: preservados; PR #337 no modifica sus esquemas.

## Historial breve
- PR #326 fusionado: corrección de distinción entre entrada/tarifa de entrada en A2 U38.
- PR #327–#330 fusionados: base/herramientas del sistema de calidad y auditoría.
- PR #331–#336 fusionados: consolidación/guardrails A2 U5–U8, A1 U24–U32 y cola editorial.
- 5 nov 2026: PR #338 fusionado (commit 613467b9e1f179aad400a2fa4156eb7b6142fc8c), con AGENTS.md, MEMORY.md y SKILL.md.
- 5 nov 2026: PR #337–#344 fusionados tras aprobación explícita. PR #345 es reemplazo actualizado de #340; CI verde, pendiente de aprobación. PR #346 reemplaza #341; corregido fallo detectado en CI y pendiente de nueva ejecución. PR #339 antiguo permanece obsoleto y sin fusionar.
