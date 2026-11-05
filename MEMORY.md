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

## En desarrollo
- PR #337 fusionado en `591567a47b592d66a261e79375fd94fca3714e51`: aclara los objetivos de vocabulario de 16 prompts de traducción en A2 U5–U8; referencia de caché v3.8.54.
- PR #338 fusionado: incorpora AGENTS.md, MEMORY.md y SKILL.md.
- PR #339 abierto, CI verde, pendiente de aprobación: registra el merge de #337 y el estado de calidad.
- PR #340 abierto, CI verde, pendiente de aprobación: expone métricas de cobertura de audio en el informe unificado.
- PR #341 abierto, CI verde, pendiente de aprobación: añade desglose de carga editorial por unidad.
- PR #342 fusionado en `5014b5f703e61385d15643e4510fb35787b73c57`: exportación filtrada de la cola editorial por nivel/unidad; sin veredictos lingüísticos.\n- PR #343 fusionado en `785a31f08ad80ea07b0dbe550c1dbfb361043cf2`: empaquetado acotado de tandas editoriales por nivel/unidad/prioridad.
- PR de corrección en preparación: parser CSV multilínea y cobertura de pruebas CI para el empaquetador.

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
- 5 nov 2026: PR #337 fusionado; PR #339–#341 siguen abiertos sobre una base anterior y requieren reconciliación. PR #342 y #343 fusionados tras aprobación explícita.
