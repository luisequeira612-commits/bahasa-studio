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

En U5, lección 1, se detectó una explicación copiada de otro ejercicio en la actividad de ordenar palabras vinculada a `a2u5_berbicara`: la consigna y la solución eran «Ordena: Él o ella habla» / `Dia berbicara`, pero la explicación hablaba de `Saya bersepeda ke sekolah`. Se sustituyó por una explicación alineada con la consigna y la respuesta. Se añadió una regresión en `tests/a2-curriculum.test.cjs` que comprueba la consigna, el orden correcto y que la explicación no vuelva a mencionar `bersepeda` ni `sekolah`.

Esta corrección es de coherencia didáctica y retroalimentación; no modifica vocabulario, IDs, progresión ni estados de auditoría lingüística.
