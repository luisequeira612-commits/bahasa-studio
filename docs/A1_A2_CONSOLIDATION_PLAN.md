# Fase 2 — Plan de consolidación A1/A2

Fecha de corte: 2026-10-31  
Rama de trabajo: `feat/independent-curriculum-quality-gate`  
Estado: **en curso; inventario y reconciliación documental inicial completados**.

## Objetivo

Consolidar los contenidos A1 y A2 antes de habilitar A2 para estudiantes: coherencia de vocabulario, ejemplos, glosas, morfología, progresión, ejercicios, referencias cruzadas y criterios de publicación. La consolidación se hará con evidencia trazable y sin convertir comprobaciones automáticas en certificación lingüística.

## Inventario de partida

| Alcance | Entradas | Estado lexicográfico registrado | Dimensiones lingüísticas |
|---|---:|---|---|
| A1 completo (currículo) | 329 | El tracker CSV disponible solo cubre U24–U32 | Revisiones parciales descritas en documentos A1; no hay cierre global |
| A1 U24–U32 (tracker) | 90 | 34 `verified_primary`; 56 `not_checked` | Naturalidad, nivel y respuestas aceptadas: 90 `not_checked` |
| A2 completo (tracker) | 492 | 2 `verified_primary`; 490 `not_checked` | Naturalidad, nivel y respuestas aceptadas: 492 `not_checked` |
| A1+A2 (cola editorial CI) | 821 | P1: 0; P2: 821 | Todas las filas `not_reviewed` |

Las 34 entradas A1 y las 2 A2 con `verified_primary` tienen evidencia lexicográfica registrada; ese estado no aprueba automáticamente la glosa, el ejemplo, la naturalidad, el nivel ni las respuestas aceptadas.

## Hallazgos documentales reconciliados

1. El tracker A1 U24–U32 tiene 90 filas. Su quinta columna contenía frases completas en indonesio, no IDs; se renombró de `example_id` a `example_indonesian` sin alterar valores ni estados.
2. Una nota histórica de la auditoría A1 decía 39/90 cotejadas, pero el CSV vigente contiene 34 `verified_primary` y 56 `not_checked`. El CSV versionado es la fuente operativa hasta que nuevas verificaciones estén registradas con URL, fecha y evidencia.
3. El tracker A2 contiene 492 filas y coincide con el inventario curricular documentado. Las dos entradas con evidencia primaria son `minggu` y `bulan`; todas las dimensiones de naturalidad, nivel y respuestas permanecen pendientes.
4. La cola CI incluye 821 entradas, sin campos básicos ausentes según las reglas P1/P2. Esto mide integridad de campos, no exactitud lingüística.

## Orden de trabajo

### 2.1 Normalización de registros y referencias

- Mantener una fila trazable por entrada curricular y conservar IDs estables.
- Alinear encabezados y significado real de cada columna entre trackers.
- Separar lema/base, forma visible, análisis morfológico y expresión multipalabra.
- Identificar reutilización intencional de vocabulario entre unidades/niveles frente a duplicados accidentales.
- Verificar que cada ejercicio, pista, respuesta aceptada y audio referencia el vocabulario correcto.
- Registrar cada cambio mecánico con su evidencia y una prueba de regresión cuando afecte al contenido de la app.

### 2.2 Cierre editorial A1

- Cubrir las 32 unidades, no solo U24–U32.
- Priorizar errores de correspondencia entre consigna, vocabulario vinculado y respuesta; después ejemplos incompletos o con contexto insuficiente; después glosas ambiguas, morfología y registro.
- Reutilizar las correcciones editoriales ya documentadas en U24–U32, evitando reabrirlas sin evidencia nueva.
- Revisar respuestas aceptadas y negativas, y distinguir instrucciones/frases conversacionales de oraciones declarativas.
- Mantener A1 sin etiqueta de validación global mientras queden brechas de revisión o pruebas de audio/dispositivo.

### 2.3 Cierre editorial A2

- Trabajar por bloques de cuatro unidades (U1–U4, luego U5–U8, etc.).
- Empezar por ejercicios y ejemplos que condicionan respuestas evaluadas; continuar con formas derivadas/afijos, expresiones multipalabra y glosas con más de un sentido.
- Usar KBBI VI Daring para evidencia lexicográfica cuando sea accesible; si no, registrar el bloqueo sin inferir ausencia o corrección.
- Contrastar objetivos pedagógicos con materiales BIPA oficiales sin afirmar equivalencia automática entre BIPA y MCER.
- Mantener las 492 filas en `not_checked` para las dimensiones no revisadas; registrar por separado las decisiones documentales y lingüísticas.

### 2.4 Revisión cruzada A1/A2

- Detectar conceptos repetidos, progresión invertida, sinónimos enseñados con glosas incompatibles y vocabulario A2 que presupone contenidos no introducidos.
- Permitir referencias de repaso A2 a vocabulario A1 cuando estén justificadas.
- Comprobar que el mismo término conserva significado, registro y traducción en tarjetas, lecciones, ejercicios y evaluaciones.
- No eliminar ni renumerar IDs estables para resolver duplicados; documentar equivalencias o reutilizaciones deliberadas.

## Prioridades operativas

- **P0 — integridad evaluativa:** ejercicio asociado a palabra equivocada, respuesta incompatible con consigna, referencia inexistente o corrección que rompe una unidad.
- **P1 — contenido incompleto:** falta forma, glosa o ejemplo bilingüe. La cola actual no detectó filas P1.
- **P2 — revisión editorial normal:** comprobar significado, glosa, morfología, naturalidad/registro, pareja de ejemplos, adecuación al nivel, respuestas aceptadas y consistencia del ejercicio.

## Estados y límites de evidencia

- No marcar `verified_primary` sin consulta directa de la fuente primaria y registro de URL, fecha y evidencia.
- No marcar naturalidad, adecuación al nivel o respuestas aceptadas como verificadas por CI, traducción automática o mera consulta de diccionario.
- Si una decisión depende de pragmática, dialecto, naturalidad o uso real y no hay evidencia suficiente, mantener `needs_review`/pendiente y describir la incertidumbre.
- La ausencia de hablante nativo no paraliza la auditoría: se pueden cerrar consistencia, referencias, ortografía documentada y errores demostrables; los juicios que exceden esa evidencia permanecen explícitamente abiertos.

## Puerta de salida de la fase 2

La fase no se considera cerrada hasta que:
1. los trackers y la cola cubran el mismo inventario curricular y tengan esquemas coherentes;
2. las incidencias P0/P1 estén resueltas o justificadamente bloqueadas;
3. las decisiones editoriales estén trazadas por unidad, con pruebas de regresión para cambios de contenido;
4. los estados lingüísticos reflejen exactamente la evidencia disponible;
5. A1 tenga una decisión documentada de publicación y A2 siga oculto hasta cumplir sus propios criterios;
6. audio/dispositivo no probado se identifique como tal, sin presentarlo como aprobado.

Esta fase produce una consolidación editorial y técnica verificable, no una certificación de indonesio por hablante nativo.


## Primera pasada editorial A2 U1–U5 — 2026-10-31

Se inspeccionaron las lecciones, ejemplos y ejercicios de U1–U5. En U1–U4 no se cambió contenido lingüístico en esta pasada: no se encontró una contradicción interna suficientemente demostrable como para justificar una corrección automática. Quedan pendientes los juicios de naturalidad, registro y adecuación de nivel.

En U5, lección 1, se detectó una explicación copiada de otro ejercicio en la actividad de ordenar palabras vinculada a `a2u5_berbicara`: la consigna y la solución eran «Ordena: Él o ella habla» / `Dia berbicara`, pero la explicación hablaba de `Saya bersepeda ke sekolah`. Se corrigieron dos campos: el ejercicio apuntaba por error al vocabulario `a2u5_bersepeda` en lugar de `a2u5_berbicara`, y su explicación describía ir en bicicleta. Ahora referencia `a2u5_berbicara` y explica `Dia berbicara`. Se añadió una regresión en `tests/a2-curriculum.test.cjs` que comprueba la consigna, el orden correcto y que la explicación no vuelva a mencionar `bersepeda` ni `sekolah`.

Esta corrección es de coherencia didáctica y retroalimentación; no modifica vocabulario, IDs, progresión ni estados de auditoría lingüística.


## Segunda pasada de coherencia ejercicio–vocabulario — 2026-10-31

Se ejecutó una comprobación de referencias de ejercicios sobre el vocabulario conjunto A1/A2. Las referencias cruzadas a vocabulario previamente enseñado se conservaron cuando eran válidas. No se encontró ningún caso adicional de esta clase en A2 tras la corrección ya integrada de A2 U5.

En A1 se detectaron dos ejercicios de ordenar palabras cuya respuesta y explicación correspondían a otro término:
- U23: «Ordena: Estoy en la cocina» usaba `v375` (Kamar mandi, cuarto de baño), aunque la solución era `Saya di dapur`. Se corrigió la referencia a `v374` (Dapur, cocina).
- U29: «Ordena: Como antes de estudiar» usaba `v444` (Sesudah, después de), aunque la solución era `Saya makan sebelum belajar`. Se corrigió la referencia a `v443` (Sebelum, antes de).

Se añadió una prueba de regresión en `tests/multi-lesson-progression.test.cjs` que comprueba tanto el ID de vocabulario como el orden correcto de las palabras. Estas son correcciones demostrables de coherencia entre el objetivo del ejercicio y el elemento de vocabulario asociado; no constituyen una validación de naturalidad o nivel.


## Tercera corrección A1 detectada por la prueba de alineación — 2026-10-31

La nueva prueba integral de referencias detectó un tercer desajuste demostrable en A1 U5: el ejercicio «Ordena: Esta es mi familia» estaba vinculado a `v23` (`Anak`, hijo/a), pero su solución `Ini keluarga saya` corresponde a `v20` (`Keluarga`, familia). Se corrigió la referencia a `v20`. La prueba ahora distingue los ejercicios cerrados y los modelos de respuesta de las consignas abiertas de escritura que no tienen una respuesta modelo única; no exige que una palabra concreta aparezca en una consigna libre.


## Normalización de glosas repetidas A1 — 2026-10-31

La comprobación de términos repetidos encontró tres IDs reutilizados con el mismo término indonesio pero pequeñas variaciones de glosa española entre unidades: `Apa kabar?`, `Ini` y `Teman`. Se armonizaron sus glosas a `¿Cómo estás? / ¿Qué tal?`, `Este / esta / esto` y `Amigo/a`, respectivamente. No se cambió el lema indonesio, los ejemplos, los IDs ni las respuestas de ejercicios. Se añadió una prueba que impide que un ID reutilizado cambie de término o glosa entre sus apariciones. Es una normalización editorial de consistencia, no una nueva validación de equivalencia lingüística.


## Estado consolidado de fase 2 — 2026-10-31

### Trabajo técnico/editorial demostrable ya integrado

- La auditoría de alineación A1/A2 verifica que todas las referencias `vocabId` existen, incluidas las referencias cruzadas intencionales, y que el término vinculado aparece en los ejercicios cerrados.
- Se corrigieron tres referencias de ejercicios A1: U5 (`Anak` → `Keluarga`), U23 (`Kamar mandi` → `Dapur`) y U29 (`Sesudah` → `Sebelum`).
- Se corrigió A2 U5: el ejercicio de `berbicara` ya no apunta a `bersepeda` y su explicación coincide con la respuesta.
- Se armonizaron tres glosas repetidas para los IDs `v465`, `v51` y `v53`.
- Las pruebas de regresión comprueban referencias de ejercicios y consistencia de glosas para IDs reutilizados.

### Trabajo lingüístico que sigue abierto

| Alcance | Inventario | Estado registrado |
|---|---:|---|
| A1 U24–U32 | 90 entradas | 34 `verified_primary`; 56 `not_checked` en KBBI |
| A2 completo | 492 entradas | 2 `verified_primary`; 490 `not_checked` en KBBI |
| Naturalidad, nivel y respuestas A1 U24–U32 | 90 entradas | 90 pendientes por dimensión |
| Naturalidad, nivel y respuestas A2 | 492 entradas | 492 pendientes por dimensión |
| Cola editorial A1+A2 | 821 entradas | P1: 0; P2: 821 `not_reviewed` |

El estado `verified_primary` solo registra la evidencia lexicográfica disponible y no aprueba naturalidad, glosa española, ejemplo, registro, nivel o respuesta aceptada. La cola P1/P2 mide integridad de campos, no exactitud lingüística.

### Criterio de avance

La fase 2 puede avanzar sin esperar una validación externa para corregir defectos internos demostrables, normalizar esquemas y mejorar pruebas. No se marcarán como lingüísticamente revisadas las 56 entradas A1 o las 490 A2 pendientes sin evidencia adecuada. A2 permanecerá oculto para estudiantes hasta completar su propia puerta de publicación; los 0 errores estructurales y las pruebas verdes no sustituyen esa decisión.


## Puerta técnica de publicación A2 — 2026-10-31

Se añadió `A2_RELEASE_ENABLED = false` como bandera explícita y cerrada por defecto. La bandera se aplica a la visibilidad del curso, a la lista de niveles de aprendizaje, al inicio de lecciones y a las evaluaciones de unidad. Completar A1 ya no basta por sí solo para exponer A2 mientras la consolidación editorial siga abierta. La activación requerirá una decisión de publicación después de revisar la cobertura y los estados pendientes; no se activa automáticamente al pasar CI.
