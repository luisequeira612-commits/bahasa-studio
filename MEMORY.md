# MEMORY.md — Estado de Bahasa Studio

> Se actualiza en CADA PR. Mantener corto (unas 150 líneas como máximo). Última actualización: 5 nov 2026.

## Visión y límites
- App personal gratuita para aprender indonesio; quizá compartirla gratis más adelante.
- Sin cuentas, backend, servidores, costes, anuncios, vidas, funciones sociales ni publicación en tiendas.
- Offline, móvil primero. No añadir dependencias sin necesidad real.
- Preservar IndexedDB v3 y backup JSON v3.
- No sobrediseñar; el dueño trabaja desde el celular.

## Estado del currículo
- A1: 32/32 unidades.
- A2: 40/40 unidades; A2 permanece desbloqueado.
- B1/B2: pendientes. No iniciar B1 hasta consolidar A1/A2.
- A2 U5–U8: PR #337 aclara el vocabulario objetivo en 16 consignas de traducción; fusionado en main el 5 nov 2026.
- A1 U24–U32 y A2 U1–U8 siguen dentro del alcance prioritario de revisión editorial.

## Interfaz y funciones existentes
- Pestañas Aprender / Repasar / Tutor / Perfil; racha y XP.
- Camino de unidades, lecciones a pantalla completa, traducción al tocar palabras y explicaciones contextuales.
- Historial, estadísticas, tutor, escritura, audio y aprendizaje adaptativo existen en distintos grados de consolidación.

## Sistema de calidad
- Auditoría estructural independiente de KBBI: `scripts/audit-curriculum-quality.mjs`.
- Cola editorial de vocabulario y ejercicios: `scripts/build-editorial-review-queue.mjs`.
- Informe combinado: `scripts/build-unified-quality-report.mjs`.
- Paquete de primera revisión externa/manual: `scripts/build-deepseek-review-packet.mjs`.
- El workflow `.github/workflows/regression.yml` genera y publica como artifacts la auditoría, cola editorial, informe combinado y paquete de revisión (retención de 14 días).
- El run de main posterior al merge de #337 es [41982650726](https://github.com/luisequeira612-commits/bahasa-studio/actions/runs/41982650726). Los pasos de tests y generación/subida de informes terminaron correctamente; el workflow completo aún estaba en curso al actualizar esta memoria.
- La cola editorial es priorización de trabajo, no un veredicto lingüístico. No marcar como revisado algo que no haya sido revisado con evidencia.

## Estados honestos de verificación lingüística
- `verified_primary`: solo lo marca el dueño tras revisar una fuente primaria oficial.
- `cross_checked`: coincidencia en 2+ fuentes secundarias independientes; anotar fuentes en el tracker.
- `not_checked`: todo lo demás, incluida la salida de IA sin cruce.
- No hay hablante nativo disponible y KBBI/API puede fallar. El proyecto NO se detiene por ello. No afirmar naturalidad, gramática o equivalencia semántica sin evidencia.

## Decisiones
- A2 permanece desbloqueado porque A1 no tiene validación lingüística externa.
- No añadir otra capa de IA dentro de la app por ahora.
- No cambiar IndexedDB ni backup v3 para incorporar estados de revisión.
- No crear un segundo idioma hasta terminar de consolidar indonesio y recibir autorización.
- Todo merge requiere el "Aprobado" explícito del dueño.
- Revisión externa/manual: Claude para revisión técnica/curricular, Gemini para ideas UX, ChatGPT integra cambios y valida.

## Estado técnico de referencia
- Service worker en main: `bahasa-studio-v3.8.54` (actualizado por PR #337).
- PR #337: squash commit `591567a47b592d66a261e79375fd94fca3714e51`.
- PR #338: reglas AGENTS.md, MEMORY.md y SKILL.md ya fusionadas.
- IndexedDB v3 y backup v3 no fueron modificados por #337.

## Pendiente (orden actual)
1. Revisar los artifacts del pipeline de calidad: informe estructural, resumen/CSV editorial, informe combinado y paquete manual. Separar fallos estructurales de advertencias editoriales; no inferir certificación lingüística.
2. Consolidar A2 (especialmente U1–U8) y revisar A1 U24–U32 con evidencia.
3. Mejorar tutor conversacional y luego repaso adaptativo.
4. Pronunciación/escucha y pulido de lección a pantalla completa.
5. B1 y después B2, solo tras cerrar consolidación.
6. Antes de compartir: revisar licencias/fuentes, secretos/datos expuestos e instrucciones.

## Historial breve
- PR #326: corrección de distinción entre entrada/tarifa de entrada en A2 U38.
- PR #327–#330: base y herramientas del sistema de calidad.
- PR #331–#336: guardrails de A2 U5–U8, A1 U24–U32 y cola editorial.
- PR #338: añadió AGENTS.md, MEMORY.md y SKILL.md.
- PR #337: aclaró 16 prompts de traducción A2 U5–U8, alineó tests de caché a v3.8.54; fusionado el 5 nov 2026.
