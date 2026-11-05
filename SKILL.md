---
name: bahasa-studio
description: Flujo de trabajo para modificar la app Bahasa Studio (idiomas estilo Duolingo): cambios en código, currículo y diseño, con reglas de calidad, Git, escalabilidad, ahorro de tokens y verificación sin hablante nativo.
---

# Skill: trabajar en Bahasa Studio

## Cuándo usar este skill
Cualquier tarea sobre el repo: lecciones nuevas, correcciones de vocabulario, cambios de interfaz, scripts de auditoría, tutor, estadísticas, repaso o preparación para más idiomas.

## Procedimiento
1. Lee AGENTS.md y MEMORY.md; luego solo los archivos relacionados con la tarea.
2. Resume en 2–3 líneas lo que vas a hacer y espera mi visto bueno si el cambio es grande.
3. Crea una rama con nombre descriptivo (ej. feat/tutor-conversacional).
4. Haz el cambio más pequeño que cumpla el objetivo.
5. Verifica: que la app cargue, que funcione offline, que IndexedDB y el backup v3 no cambien, y que el CI pase.
6. Abre el PR con: qué cambió, archivos, cómo se probó, riesgos.
7. Actualiza MEMORY.md en el mismo PR (obligatorio), editando solo las secciones que cambiaron.
8. Espera mi "Aprobado" antes de cualquier merge.

## Reglas para lecciones nuevas
- Vocabulario básico y de alta frecuencia primero; repetirlo en distintos contextos dentro de la unidad.
- Explicaciones cortas, en español, con ejemplos simples y su traducción.
- Estados de verificación: "verified_primary" solo lo marco yo; "cross_checked" si 2+ fuentes secundarias independientes coinciden (anotar fuentes en el tracker); "not_checked" para lo demás.
- No hay hablante nativo ni garantía de que KBBI funcione: si una fuente falla, usa otras, deja el estado que corresponda y sigue adelante. No detengas el trabajo.
- Ante la duda, elige la forma más simple y común, y avísame.
- Formato compatible con lo que ya lee IndexedDB; no cambiar el esquema.
- Contenido separado del código, organizado por idioma, nivel y unidad.

## Reglas para interfaz
- Estilo Duolingo en rojo y blanco, pensado para pantalla de celular.
- Sin animaciones ni efectos pesados: el teléfono es de gama media.
- Mantener barra inferior y barra superior (racha y XP).

## Reglas de escalabilidad
- Todo debe seguir siendo estático, offline y gratis: cero backend, cero cuentas, cero costos.
- No agregar nada que obligue a otra persona a crear cuentas o pagar.
- No sobrediseñar: preparar la estructura solo cuando toque, y proponerla antes.

## Ahorro de tokens
- No explorar todo el repo; buscar por nombre o texto antes de abrir archivos completos.
- No releer archivos ya leídos en la misma tarea.
- Mantener MEMORY.md corto: resumir etapas terminadas en 1–2 líneas.

## Qué NO hacer
- Merge sin autorización.
- Dependencias nuevas sin aprobación.
- Marcar vocabulario como "verified_primary" (solo lo hace el dueño).
- Detener el proyecto o bloquear un PR solo porque KBBI falló o no hay validación nativa.
- Añadir cuentas, backend, vidas, anuncios o funciones sociales.
- Dar por terminado un PR que no actualizó MEMORY.md.
- Afirmar que algo está probado si solo lo leíste.

## Formato de respuesta
Resultado primero. Breve. En español. Indica qué quedó probado, qué no, cuántos términos quedaron en cada estado de verificación y qué sigue.