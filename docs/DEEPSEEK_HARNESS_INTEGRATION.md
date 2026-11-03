# Integración híbrida de DeepSeek Harness

**Estado:** base documental y comandos locales preparados; integración de agente opcional.  
**Objetivo:** coordinar el sistema de calidad existente sin reemplazarlo.  
**Impacto en la aplicación publicada:** ninguno.  
**Dependencia de IA/API:** ninguna para las pruebas locales; Harness solo se inicia voluntariamente.

## Arquitectura

La arquitectura tiene dos capas:

### 1. Quality Engine local (fuente de resultados reproducibles)

Se ejecuta con Node.js desde el repositorio y no requiere servicios externos:

- `npm run quality:tests`: pruebas del auditor curricular, cola editorial y tracker A2.
- `npm run quality:audit`: auditor estructural y de referencias A1/A2.
- `npm run quality:queue`: genera la cola editorial CSV y su resumen JSON en `artifacts/`.
- `npm run quality:local`: ejecuta los tres pasos anteriores en orden.

Los validadores existentes son la autoridad para las reglas deterministas. No se deben duplicar ni reemplazar con respuestas de un modelo.

### 2. DeepSeek Harness (coordinación y análisis asistido)

DeepSeek Harness puede leer `AGENTS.md` como instrucciones del agente. Se usa como capa opcional para:

- resumir informes del Quality Engine;
- agrupar hallazgos repetidos;
- investigar inconsistencias entre unidades, vocabulario, ejemplos y ejercicios;
- sugerir preguntas editoriales y posibles correcciones;
- preparar un plan de cambios y un borrador de PR cuando se solicite.

La IA no es autoridad para aprobar contenido ni para cambiar estados de revisión.

## Requisitos y arranque

DeepSeek Harness está en Developer Preview y puede introducir cambios incompatibles. Consulta siempre su documentación y avisos oficiales antes de actualizarlo:

- Repositorio: https://github.com/deepseek-ai/deepseek-harness
- Documentación: https://deepseek-harness.github.io/deepseek-harness/
- Aviso de seguridad: https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md

La guía oficial documenta el arranque web mediante:

```bash
npx @deepseek-ai/dsh web --no-open
```

El comando está disponible como `npm run harness`. Requiere Node.js compatible con la versión actual de Harness; comprueba los requisitos publicados antes de instalarlo. El workflow de CI de Bahasa Studio permanece independiente de Harness.

Harness necesita un proveedor de modelo configurado para realizar análisis con IA. No guardes claves en el repositorio ni en `.env` versionados. No configures proveedores de pago como requisito. Si no hay un proveedor gratuito/local adecuado, omite Harness: el Quality Engine local seguirá funcionando.

## Protocolo de auditoría recomendado

1. Ejecutar `npm run quality:local`.
2. Leer el resumen del auditor y `artifacts/editorial-review-summary.json`.
3. Examinar los hallazgos completos y rastrear cada uno hasta la unidad, lección, ejercicio o ID original.
4. Comparar con los documentos de auditoría pertinentes en `docs/`.
5. Etiquetar cada resultado:
   - `deterministic_error`: reproducido por una regla automatizada;
   - `editorial_review`: inconsistencia que necesita criterio editorial;
   - `linguistic_hypothesis`: propuesta de IA no verificada;
   - `pending_evidence`: no hay evidencia suficiente.
6. Presentar hallazgo, evidencia, confianza, limitación y acción sugerida.
7. No editar fuentes en una auditoría de solo lectura.

## Seguridad

DeepSeek Harness puede ejecutar comandos/código generado por modelos y acceder a archivos, procesos, red y credenciales disponibles para su entorno. El proyecto está en Developer Preview y su aviso oficial indica que no debe tratarse como software auditado o listo para producción.

Por tanto:

- ejecútalo solo en un entorno de trabajo dedicado y con permisos mínimos;
- empieza en modo de solo lectura;
- no le des acceso a tokens de GitHub, credenciales, carpetas personales ni archivos ajenos al repositorio;
- no instales plugins de terceros para esta integración;
- revisa los comandos y cambios antes de ejecutarlos;
- conserva backups fuera del alcance del agente;
- no uses Harness como único control de seguridad.

## Límites de calidad

Un informe de IA no certifica gramática, naturalidad, pragmática, adecuación cultural, pronunciación, equivalencia semántica ni nivel CEFR/BIPA. No hay hablante nativo disponible para el proyecto. KBBI sigue siendo opcional y nunca bloquea las pruebas ni el desarrollo.

## Compatibilidad con Bahasa Studio

Esta integración es exclusivamente de desarrollo. No añade scripts, servicios, SDKs ni dependencias a la aplicación web publicada. No cambia IndexedDB v3, backups JSON v3, currículo, IDs, cuentas, backend ni experiencia del estudiante.
