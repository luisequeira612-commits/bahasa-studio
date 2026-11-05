# MEMORY.md — Estado de Bahasa Studio

> Se actualiza en CADA PR. Mantener corto (unas 150 líneas como máximo). Última actualización: 4 nov 2026.

## Visión
- App para aprender idiomas, estilo Duolingo, en rojo y blanco.
- Hoy existe el curso de indonesio; A1 y A2 están construidos. B1 y B2 siguen pendientes.
- Más idiomas en el futuro, sobre todo los que Duolingo no ofrece para hispanohablantes. Candidatos: tagalo, tailandés, toki pona, ido.
- Uso personal; posible futuro: compartirla gratis con amigos o una comunidad de nicho.
- Prioridad principal del dueño: perfeccionar esta app y aprender idiomas con ella.
- Terminar bien el indonesio antes de abrir un segundo idioma.

## Estado actual del currículo
- A1: 32 de 32 unidades hechas.
- A2: 40 de 40 unidades hechas. U5–U8 están dentro de la consolidación/revisión actual; PR #337 está abierto para aclarar 16 objetivos de vocabulario en prompts de traducción.
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
- Consolidación de calidad y currículo A1/A2.
- PR #337 abierto: aclaración de vocabulario objetivo en 16 prompts de traducción A2 U5–U8. No se fusiona hasta tener CI verde y aprobación del dueño.
- PR #301 ya no es el PR activo; los PR recientes de calidad #326–#336 están fusionados.

## Pendiente (en este orden)
1. Completar y revisar los informes del auditor y la cola editorial con evidencia; scripts principales: scripts/audit-curriculum-quality.mjs y scripts/build-editorial-review-queue.mjs.
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
- Un segundo idioma solo se empieza con mi autorización y después de proponerme cómo organizar los datos por idioma sin cambiar IndexedDB ni el backup v3.
- No se usan herramientas locales de memoria de código (tipo MCP): se trabaja desde el celular; la memoria del proyecto son estos tres archivos.
- Todo merge requiere mi "Aprobado" explícito; ChatGPT no fusiona por su cuenta.
- No hay hablante nativo que valide el indonesio y KBBI puede fallar: el proyecto NO se detiene por eso. El contenido avanza con estados honestos (verified_primary solo lo marco yo; cross_checked = 2+ fuentes secundarias independientes; not_checked = el resto) y se corrigen errores cuando se descubran.

## Reparto de herramientas
- Claude: revisión técnica y curricular antes de aprobar.
- Gemini: ideas de experiencia de usuario.
- ChatGPT: integra cambios en el repo (rama + PR) y los valida.

## Estado técnico de referencia
- Service worker en main: cache bahasa-studio-v3.8.53.
- Scripts de calidad disponibles: scripts/audit-curriculum-quality.mjs, scripts/build-editorial-review-queue.mjs, scripts/build-unified-quality-report.mjs y scripts/build-deepseek-review-packet.mjs.
- IndexedDB v3 y backup v3: preservados por las reglas del proyecto; este PR no los modifica.

## Historial breve
- PR #326 fusionado: corrección de distinción entre entrada/tarifa de entrada en A2 U38.
- PR #327–#330 fusionados: base/herramientas del sistema de calidad y auditoría.
- PR #331–#336 fusionados: consolidación/guardrails A2 U5–U8, A1 U24–U32 y cola editorial.
- 4 nov 2026: se crean/actualizan AGENTS.md, MEMORY.md y SKILL.md en la rama de este PR.