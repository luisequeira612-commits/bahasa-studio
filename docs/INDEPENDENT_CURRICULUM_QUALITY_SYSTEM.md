# Sistema de calidad curricular independiente de KBBI

**Estado:** primera implementación técnica en desarrollo.  
**Alcance inicial:** integridad estructural y consistencia de referencias de A1 y A2.  
**Dependencias externas:** ninguna.  
**Certificación lingüística:** no incluida.

## Objetivo

Permitir que Bahasa Studio siga desarrollándose cuando KBBI no está disponible o no resuelve una consulta. El sistema comprueba automáticamente los aspectos que sí pueden verificarse con el propio repositorio y mantiene separadas las cuestiones lingüísticas que requieren criterio humano.

## Qué comprueba la primera versión

El script `scripts/audit-curriculum-quality.mjs` carga los currículos locales A1 y A2 y comprueba:

- existencia de unidades, títulos y arrays de vocabulario;
- IDs de unidad duplicados y colisiones de vocabulario (un mismo ID asociado a términos indonesios distintos); las repeticiones del mismo término se registran como avisos porque pueden representar vocabulario compartido; el informe distingue entradas totales de IDs únicos;
- campos obligatorios de cada entrada (`idn`, `esp`);
- ejemplos incompletos como avisos editoriales;
- estructura básica de ejercicios y consignas;
- índices de respuesta MC dentro del rango de opciones;
- consistencia entre `words` y `correctOrder` en ejercicios de orden;
- referencias `vocabId`, `vocabIds` y `reviewVocabIds` que no resuelven al vocabulario combinado de A1/A2, permitiendo repasos acumulativos entre niveles;
- referencias en ejercicios de unidad y de lección.

Las referencias de repaso pueden apuntar legítimamente de A2 a vocabulario presentado en A1. Las unidades con lecciones se auditan en esa estructura y no se consideran incompletas por no tener un array de ejercicios en el nivel superior. Los chequeos son locales, deterministas y no hacen peticiones de red. Un resultado sin errores significa únicamente que las reglas estructurales implementadas han pasado.

## Qué NO afirma

El informe no certifica:

- que una frase sea natural o idiomática;
- que la traducción sea semánticamente equivalente;
- que una palabra tenga el registro adecuado;
- que el contenido corresponda al nivel CEFR/BIPA;
- que la pronunciación o el audio sean correctos;
- que KBBI u otra fuente haya confirmado una entrada.

No se debe convertir automáticamente un resultado de CI en `verified_primary`, `grammar_naturalness_review` ni otro estado de validación lingüística.

## Ejecución

```bash
node scripts/audit-curriculum-quality.mjs
node scripts/audit-curriculum-quality.mjs --json artifacts/curriculum-quality-report.json
node --test tests/audit-curriculum-quality.test.mjs
```

El comando devuelve código distinto de cero si encuentra errores estructurales. Los avisos no bloquean el proceso; deben revisarse y priorizarse. El informe JSON registra `external_services_used: false`, `kbbi_required: false` y `linguistic_certification: false`.

## Modelo de calidad propuesto

| Dimensión | Cómo se comprueba | Estado permitido |
|---|---|---|
| Integridad de datos | Scripts y pruebas locales | Comprobado automáticamente |
| Referencias y cobertura | IDs, vocabulario y ejercicios | Comprobado automáticamente |
| Evidencia documental | Fuentes y referencias registradas | Documentado, no inferido |
| Revisión editorial | Contexto, claridad, progresión y traducción | Revisado editorialmente |
| Naturalidad y registro | Revisor competente de indonesio | Pendiente o validado externamente |
| Audio y pronunciación | Escucha y pruebas en dispositivos | Probado o no probado |

Los estados son independientes. La ausencia de una fuente o de un revisor nunca se interpreta como aprobación.

## Siguientes incrementos

1. Revisar los primeros resultados reales del script y ajustar reglas que produzcan falsos positivos.
2. Añadir detección de vocabulario evaluado antes de enseñarse, cuando el modelo de progresión esté formalizado.
3. Añadir comprobaciones de traducciones vacías, respuestas alternativas y cobertura de habilidades.
4. Generar una cola de revisión editorial con IDs estables y prioridad, sin alterar los trackers originales.
5. Integrar el informe en CI como artefacto descargable y mantener el bloqueo solo para errores estructurales demostrables.

## Principio operativo

KBBI es una fuente de evidencia útil, no una dependencia de ejecución ni un semáforo universal de calidad. La aplicación puede seguir avanzando con controles reproducibles, documentación honesta y una cola explícita de cuestiones lingüísticas pendientes.
