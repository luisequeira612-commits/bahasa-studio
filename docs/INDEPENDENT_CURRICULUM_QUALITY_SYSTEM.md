# Sistema de calidad curricular independiente de KBBI

**Estado:** sistema oficial de calidad curricular independiente de KBBI; auditor estructural, cola editorial, pruebas automatizadas y artefactos integrados en CI.  
**Alcance inicial:** integridad estructural y consistencia de referencias de A1 y A2.  
**Dependencias externas:** ninguna.  
**Certificación lingüística:** no incluida.

## Objetivo

Permitir que Bahasa Studio siga desarrollándose cuando KBBI no está disponible o no resuelve una consulta. El sistema comprueba automáticamente los aspectos que sí pueden verificarse con el propio repositorio y mantiene separadas las cuestiones lingüísticas que requieren criterio humano.

## Qué comprueba la primera versión

El script `scripts/audit-curriculum-quality.mjs` carga los currículos locales A1 y A2 y comprueba:

- existencia de unidades, títulos y arrays de vocabulario;
- IDs de unidad duplicados y colisiones de vocabulario (un mismo ID asociado a términos indonesios distintos); las repeticiones del mismo término se registran como avisos porque pueden representar vocabulario compartido; si un ID reutilizado conserva el término indonesio pero cambia la glosa española, se genera un aviso de consistencia para revisión editorial; el informe distingue entradas totales de IDs únicos;
- campos obligatorios de cada entrada (`idn`, `esp`);
- ejemplos incompletos como avisos editoriales;
- estructura básica de ejercicios y consignas tanto a nivel de unidad como dentro de cada lección;
- índices de respuesta MC dentro del rango de opciones, también en ejercicios de lección;
- consistencia entre `words` y `correctOrder` en ejercicios de orden, también en ejercicios de lección;
- referencias `vocabId`, `vocabIds` y `reviewVocabIds` que no resuelven al vocabulario del nivel; se permiten referencias acumulativas de A2 hacia A1, pero no referencias de A1 hacia vocabulario futuro de A2;
- referencias en ejercicios de unidad y de lección;
- avisos cuando un ejercicio de una unidad usa vocabulario del mismo nivel que solo se introduce en una unidad posterior; se permite el vocabulario ya presentado y el repaso acumulativo A2→A1.

Las referencias de repaso pueden apuntar legítimamente de A2 a vocabulario presentado en A1. La dirección inversa no se permite: A1 no debe depender de vocabulario que solo se presenta en A2. Las unidades con lecciones se auditan en esa estructura y no se consideran incompletas por no tener un array de ejercicios en el nivel superior. Los chequeos son locales, deterministas y no hacen peticiones de red. Un resultado sin errores significa únicamente que las reglas estructurales implementadas han pasado.

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
2. Extender la detección de vocabulario evaluado antes de enseñarse a estructuras de lecciones cuando el esquema de progresión esté formalizado; el control actual cubre ejercicios a nivel de unidad y genera avisos no bloqueantes.
3. Añadir comprobaciones de traducciones vacías, respuestas alternativas y cobertura de habilidades.
4. Generar una cola de revisión editorial con IDs estables y prioridad, sin alterar los trackers originales.
5. Integrar el informe en CI como artefacto descargable y mantener el bloqueo solo para errores estructurales demostrables.

## Principio operativo

KBBI es una fuente de evidencia útil, no una dependencia de ejecución ni un semáforo universal de calidad. La aplicación puede seguir avanzando con controles reproducibles, documentación honesta y una cola explícita de cuestiones lingüísticas pendientes.

## Cola editorial independiente

El generador `scripts/build-editorial-review-queue.mjs` crea una fila por entrada de vocabulario A1/A2 en `artifacts/editorial-review-queue.csv`. La cola incluye un `review_id` determinista (`nivel:unidad:id_vocabulario`) que no cambia al reordenar las entradas, además de nivel, unidad, ID, forma indonesia, glosa española, ejemplo bilingüe, campos ausentes y estados editoriales independientes. Si falta el ID canónico, usa como respaldo la forma indonesia normalizada (y el índice solo si también falta la forma).

- `P1`: falta algún dato base de la entrada o del ejemplo.
- `P2`: entrada con los campos básicos presentes; requiere revisión editorial normal.
- Los estados comienzan en `not_reviewed`; tener texto en los campos no equivale a que sea correcto.
- La cola no consulta KBBI, no modifica los trackers lingüísticos existentes y no marca términos como verificados.
- CI ejecuta sus pruebas y publica el CSV como artefacto descargable.

Ejecución local:

```bash
node --test tests/build-editorial-review-queue.test.mjs
node scripts/build-editorial-review-queue.mjs --output artifacts/editorial-review-queue.csv
```

La prioridad P1 identifica incompletitud de datos, no un juicio de incorrección lingüística. P2 tampoco significa aprobado: indica que la entrada está lista para revisión normal.


## Estado operativo y reglas permanentes

El sistema descrito en este documento está integrado en el workflow `.github/workflows/regression.yml`: CI ejecuta las pruebas del auditor y del generador de cola, produce `artifacts/editorial-review-queue.csv` y `artifacts/curriculum-quality-report.json`, y publica ambos como artefactos de la ejecución. Estos pasos usan `if: !cancelled()` para que la auditoría independiente y sus informes se ejecuten incluso si falla antes una prueba de regresión ajena a este sistema. No hace falta una conexión a KBBI ni a ningún servicio externo para estos pasos.

Las reglas permanentes para agentes y colaboradores están en `PROJECT_RULES.md`. En particular, no hay un hablante nativo disponible para este proyecto y KBBI/API no son dependencias fiables. El desarrollo no debe detenerse por esas limitaciones. Los resultados automáticos certifican únicamente las comprobaciones deterministas implementadas; nunca deben cambiar por sí solos estados de revisión lingüística ni presentarse como certificación de naturalidad, nivel o pronunciación.

El workflow manual `kbbi-manual-audit.yml` es opcional y experimental. No forma parte de la puerta de calidad del proyecto y sus resultados no se usan para aprobar contenido. Si el servicio falla o devuelve datos dudosos, se registra como intento fallido y se continúa con el sistema independiente.
