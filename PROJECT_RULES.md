# PROJECT_RULES.md — Reglas permanentes de Bahasa Studio

Este archivo es la fuente de verdad operativa para cualquier persona o agente que trabaje en el repositorio. Debe leerse antes de modificar currículo, evaluaciones, datos, interfaz o herramientas de calidad.

## 1. Contexto y limitaciones del proyecto

- Bahasa Studio es una aplicación personal para aprender indonesio, con interfaz y explicaciones en español.
- No hay un hablante nativo de indonesio disponible para revisar el currículo.
- KBBI y sus interfaces web/API no han sido una vía fiable para este proyecto. El script y el servicio de terceros usados para recopilar datos de KBBI tampoco son dependencias fiables.
- **No bloquear el desarrollo por falta de acceso a KBBI, por fallos de su API ni por no disponer de un hablante nativo.**
- No volver a proponer como requisito una auditoría masiva de KBBI ni asumir que un endpoint público es oficial, estable o correcto.
- KBBI puede aparecer únicamente como fuente opcional de consulta cuando funcione y aporte evidencia verificable. Nunca será requisito de ejecución, CI, publicación o desarrollo.

## 2. Sistema oficial de calidad curricular

El mecanismo operativo es el **Sistema de calidad curricular independiente de KBBI**, documentado en `docs/INDEPENDENT_CURRICULUM_QUALITY_SYSTEM.md` y respaldado por:

- `scripts/audit-curriculum-quality.mjs`
- `scripts/build-editorial-review-queue.mjs`
- `tests/audit-curriculum-quality.test.mjs`
- `tests/build-editorial-review-queue.test.mjs`
- El workflow `.github/workflows/regression.yml`, que ejecuta las pruebas, genera el informe estructural y publica los artefactos de auditoría/cola editorial.

Antes de crear herramientas nuevas, inspeccionar y reutilizar este sistema. No duplicarlo ni reemplazarlo por una integración externa.

### Qué sí podemos comprobar automáticamente

- Integridad de unidades, lecciones y entradas de vocabulario.
- IDs duplicados, colisiones y referencias rotas.
- Campos obligatorios y ejemplos incompletos.
- Estructura de ejercicios, consignas y opciones.
- Índices de respuesta fuera de rango.
- Correspondencia entre tokens y orden correcto.
- Referencias de vocabulario entre A1 y A2, incluidos repasos acumulativos.
- Consistencia de datos que pueda expresarse mediante reglas deterministas y pruebas reproducibles.

### Qué no puede certificar un script ni una ejecución verde de CI

- Naturalidad o idiomaticidad del indonesio.
- Equivalencia semántica completa de una traducción.
- Registro, pragmática o adecuación cultural.
- Adecuación real a CEFR/BIPA.
- Pronunciación, calidad de grabaciones o comprensión auditiva real.
- Aceptabilidad de todas las respuestas libres.

Un resultado verde significa que pasaron las reglas implementadas, no que el currículo esté lingüísticamente certificado.

## 3. Estados y evidencia: nunca inventar validaciones

- No cambiar `not_checked`, `not_reviewed` u otros estados de revisión a un estado de aprobación solo porque los campos estén completos, el script pase o una IA considere que la frase parece correcta.
- No marcar `verified_primary` sin evidencia primaria realmente consultada y registrada.
- No convertir una respuesta HTTP 200, un resultado de API, un dato de terceros o una sugerencia de IA en verificación primaria.
- Mantener separados los estados estructurales, editoriales, lingüísticos y de audio.
- Registrar fuente, URL o referencia local, fecha, sentido/contexto comprobado, responsable y limitaciones cuando se afirme una verificación.
- Si no hay evidencia suficiente, dejar el punto pendiente y explicar la incertidumbre. Pendiente no significa incorrecto, pero tampoco aprobado.
- La revisión editorial asistida por IA puede detectar ambigüedades, incoherencias y posibles correcciones; sus propuestas deben etiquetarse como propuestas, no como validación nativa.

## 4. Flujo de trabajo recomendado

1. Ejecutar las pruebas de regresión pertinentes y el auditor independiente.
2. Corregir errores estructurales demostrables antes de ampliar contenido.
3. Generar y trabajar la cola editorial independiente, priorizando P1 (datos base incompletos) antes de P2 (revisión normal).
4. Revisar cada dimensión por separado: significado, morfología, traducción, ejemplo, naturalidad/registro, adecuación de nivel, respuestas alternativas y consistencia de ejercicios.
5. Usar gramáticas, materiales BIPA, diccionarios alternativos y otras fuentes documentales accesibles como evidencia secundaria, indicando límites y referencias concretas. No presentar una referencia general como si validara todas las entradas.
6. Cuando la naturalidad o el nivel no puedan confirmarse, conservar la incertidumbre y continuar con las tareas que sí pueden completarse.
7. Probar la app y los cambios funcionales en CI; no confundir pruebas de código con pruebas lingüísticas.
8. Actualizar la documentación y el estado real del plan al terminar cada bloque.

## 5. Reglas de desarrollo y cambios

- Preservar las funciones existentes salvo que el cambio esté justificado y probado.
- Trabajar en ramas y pull requests; no hacer commits directos a `main` para cambios de producto.
- Mantener cambios acotados por objetivo, describir alcance, riesgos, pruebas y limitaciones en cada PR.
- Revisar conflictos y divergencia con `main`; no fusionar ramas obsoletas o divergentes sin reconciliarlas.
- No fusionar si CI falla, si hay errores estructurales, si hay regresiones conocidas o si el alcance no está claro.
- Tras fusionar, verificar el estado de `main` y la ejecución de CI correspondiente.
- No eliminar contenido curricular ni reducir unidades/lecciones/ejercicios para hacer pasar pruebas sin una justificación explícita.
- Los cambios de currículo deben respetar el plan vigente del proyecto y registrar qué unidades y dimensiones se completaron realmente.

## 6. Prioridades y comunicación

- Mantener visible la fase y el bloque de trabajo actual.
- Informar qué se cambió, en qué archivos, qué pruebas pasaron/fallaron y qué queda pendiente.
- Diferenciar claramente trabajo realizado, propuesta, bloqueo real y validación no disponible.
- No afirmar que una fase, unidad, auditoría o PR está terminada sin evidencia.
- No detener el avance por una validación externa inaccesible: dividir el trabajo entre lo comprobable, lo revisable documentalmente y lo que debe quedar explícitamente pendiente.

## 7. Regla de continuidad

Al iniciar una nueva sesión, leer este archivo y `docs/INDEPENDENT_CURRICULUM_QUALITY_SYSTEM.md` antes de proponer volver a usar KBBI o diseñar otro sistema de calidad. Si estas reglas cambian, actualizar este documento mediante un PR y conservar el historial de decisiones.
