# Fase 2 — Plan de consolidación A1/A2

Fecha de corte: 2026-10-31  
Rama de trabajo: `feat/independent-curriculum-quality-gate`  
Estado: **consolidación estructural de cobertura completada; auditoría editorial y lingüística continúa abierta**.

## Objetivo

Consolidar los contenidos A1 y A2, manteniendo A2 disponible en beta después de completar A1: coherencia de vocabulario, ejemplos, glosas, morfología, progresión, ejercicios, referencias cruzadas y criterios de publicación. La consolidación se hará con evidencia trazable y sin convertir comprobaciones automáticas en certificación lingüística.

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
- Usar KBBI solo como consulta opcional si aporta evidencia verificable; nunca bloquear una tarea ni inferir corrección cuando no esté disponible.
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
5. A1 tenga una decisión documentada de publicación y A2 permanezca disponible en beta tras completar A1, con sus limitaciones visibles;
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

La fase 2 puede avanzar sin esperar una validación externa para corregir defectos internos demostrables, normalizar esquemas y mejorar pruebas. No se marcarán como lingüísticamente revisadas las 56 entradas A1 o las 490 A2 pendientes sin evidencia adecuada. A2 permanece disponible en beta tras completar A1; las pruebas verdes y los 0 errores estructurales no equivalen a certificación lingüística.


## Acceso beta de A2 — decisión de producto

A2 está habilitado en beta mediante `A2_RELEASE_ENABLED = true`, pero solo aparece en las rutas de aprendizaje cuando el estudiante completa las 32 unidades de A1. La condición de finalización de A1 también protege el acceso directo a lecciones y evaluaciones, así como la inclusión de vocabulario A2 en el aprendizaje y SRS. B1 y B2 continúan fuera del acceso normal.

La habilitación beta es una decisión de producto para no bloquear el aprendizaje por falta de hablante nativo o por la indisponibilidad de KBBI. **No certifica la naturalidad, precisión semántica, registro ni adecuación CEFR/BIPA del contenido.** La revisión editorial y las pruebas estructurales continúan; las incertidumbres lingüísticas deben permanecer documentadas. CI nunca activa ni desactiva esta bandera automáticamente.


## Cuarta pasada de consolidación — 2026-11-01

### Correcciones integradas y trazabilidad

- A2 U14: se alineó la explicación de `keberangkatan` con «salida» en vez de «viaje» (PR #150).
- A2 U15: se distinguió `mengusulkan` («proponer») de `mengundang` («invitar») en la retroalimentación (PR #150).
- A2 U18: se aclaró que el indonesio `pagar` significa «cerca», para evitar confundirlo con el verbo español «pagar» (PR #151).
- A1 U5: se corrigió el modelo de escritura asociado a `Adik`; ahora usa `Ini adik saya` en vez de una frase sobre la madre (PR #153).
- A2 U38: se normalizó `oleh-oleh` en el lema, la explicación, el ejemplo del currículo y el tracker, para que la forma sea consistente (PR #154).

Estas correcciones abordan contradicciones internas o desambiguación pedagógica. No deben marcarse como validaciones de naturalidad, registro ni nivel.

### Cobertura de pruebas reforzada

- A2 U21–U24: las regresiones comprueban que la respuesta MC coincide con la glosa asociada, que el feedback identifica el término, que los tokens y la explicación de ordenamiento coinciden y que las respuestas de producción contienen el vocabulario objetivo (PR #152).
- A2 U38: regresión específica para la forma `oleh-oleh` y correspondencia con el tracker (PR #154).
- A1 U5: regresión específica para el modelo de `Adik` (PR #153).
- No se generalizó una regla que exigiera que toda respuesta modelo de escritura abierta repitiera literalmente el término vinculado: la primera prueba exploratoria produjo falsos positivos en consignas que admiten múltiples respuestas. Se conservó el control de alineación para ejercicios cerrados y se corrigieron solo los casos demostrables.

### Pasada estructural A1 U24–U32 y A2 U25–U40

- A1 U24–U32: 9 unidades y 90 entradas en el tracker; la inspección local encontró ejemplos bilingües completos y no detectó desajustes en tokens/feedback de ordenamiento. Las respuestas modelo revisadas en ese bloque contienen el término objetivo. Esto no valida naturalidad ni nivel.
- A2 U25–U37 y U39–U40: la pasada interna no encontró contradicciones en la correspondencia de MC, ordenamiento, traducción, listening y modelos de escritura revisados.
- A2 U38: se encontró la diferencia de escritura `oleh oleh` / `oleh-oleh`, corregida en el PR #154.
- El bloque A2 U21–U40 mantiene 12 vocablos, 4 lecciones y 17 ejercicios por unidad según las comprobaciones estructurales existentes.

### Estado operativo

La fase 2 sigue abierta. A1 U24–U32 y A2 U1–U40 están disponibles en el producto conforme a las puertas actuales, pero siguen pendientes la revisión lingüística externa, la naturalidad, la adecuación de nivel y las pruebas de audio/dispositivo que no se hayan ejecutado. No convertir CI verde ni una auditoría de coherencia en certificación lingüística.


## Quinta pasada de consolidación — 2026-11-01

### Cobertura estructural completa de vocabulario y ejercicios

Tras los PR #157–#161, se ejecutó una auditoría por unidad que compara los IDs de vocabulario con los ejercicios locales y sus referencias válidas. El resultado actual en `main` es:

| Nivel | Unidades | Vocabulario | Ejercicios | Vocabulario sin ejercicio |
|---|---:|---:|---:|---:|
| A1 | 32 | 329 | 477 | 0 |
| A2 | 40 | 492 | 691 | 0 |

- A1 U24–U32: se añadieron 22 ejercicios de significado para cubrir entradas sin práctica vinculada.
- A1 U1, U4, U9, U11, U12, U18, U19, U21 y U23: se añadieron 18 ejercicios para completar la cobertura de esas unidades.
- A2 U1: se añadieron 5 ejercicios para cubrir `Selasa`, `bulan`, `Januari`, `Mei` y `September`.
- A2 U1–U40: todas las unidades tienen 4 lecciones, excepto U1 con 5; todas las unidades incluyen ejercicios MC, traducción, escucha, orden y escritura.
- A1 U24–U32 conserva su formato de ejercicios heredado; `buildUnitLessons` organiza ese contenido en lecciones generadas para el flujo de aprendizaje. La cobertura de vocabulario queda comprobada, pero esto no equivale a una autoría editorial completa de cada lección.

### Correcciones internas A2 añadidas en esta pasada

- U6: se corrigió el ejemplo de `mencatat` para que `Saya mencatat alamat` coincida con «Anoto una dirección».
- U7: se alineó `mengisi` con `Saya mengisi botol dengan air` y se amplió la explicación de `meng-` para incluir la raíz `hapus`.
- U11: se corrigió «Voy enseguida» a «Vengo enseguida» para `Saya datang segera`.
- U14: se aclaró `bepergian` como «viajar» y `keberangkatan` como «salida»; también se alineó la consigna del ejercicio con «Viajo por la mañana».

Estas decisiones corrigen contradicciones o desajustes internos detectables en los propios datos. No deben registrarse como verificaciones de naturalidad, pragmática, registro ni nivel.

### Estado de publicación y pruebas

- PR #157, #158, #159, #160 y #161 integrados en `main`.
- Último commit de consolidación: `613b35e`.
- CI de `main`: exitoso.
- GitHub Pages: publicación exitosa.
- Los tests comprueban cobertura de vocabulario, referencias, glosas de los nuevos ejercicios y hashes de integridad A1/A2.

### Lo que sigue pendiente

La cobertura estructural de vocabulario ya no tiene huecos, pero la fase 2 **no se cierra** porque siguen abiertas dimensiones que CI no puede certificar:

- A1 U24–U32: 34/90 entradas con evidencia lexicográfica primaria registrada y 56/90 sin cotejo; naturalidad, nivel y respuestas aceptadas siguen pendientes.
- A2: 2/492 entradas con evidencia lexicográfica primaria registrada y 490/492 sin cotejo; naturalidad, nivel y respuestas aceptadas siguen pendientes.
- La cola editorial A1+A2 continúa con 821 entradas P2 `not_reviewed`; los cambios de ejercicios no alteran los estados editoriales.
- Falta completar la revisión documental por bloques, registrar las decisiones con evidencia y comprobar audio/dispositivo donde corresponda.
- El inventario A2 actual es de 492 palabras, por debajo del objetivo orientativo inicial de unas 600; no se añadirán palabras solo para alcanzar una cifra si no hay ejemplos y ejercicios coherentes.

**Conclusión operativa:** la brecha de cobertura vocabulario–ejercicio está cerrada en A1 y A2. La fase 2 continúa como auditoría editorial/documental, no como validación lingüística. La siguiente fase funcional puede avanzar en paralelo sin declarar certificado el currículo.

## Sexta pasada de consolidación — 2026-11-01

### Regresiones de coherencia de ejercicios A2 U5–U20

Se amplió la cobertura de pruebas por bloques de cuatro unidades, sin modificar vocabulario, traducciones ni estados del tracker:

- U5–U8 (PR #171): las preguntas «¿Qué significa…?» deben asociar la palabra de la unidad, seleccionar exactamente su glosa española canónica y explicar el término en el feedback.
- U9–U12 (PR #172): se comprueba la correspondencia entre palabra y glosa en preguntas de significado, y que los ejercicios de ordenar palabras conserven los mismos tokens y expliquen la solución canónica.
- U13–U16 (PR #176): se aplican las mismas comprobaciones de significado, tokens y explicación de ordenamiento.
- U17–U20 (PR #174): se aplican las mismas comprobaciones de significado, tokens y explicación de ordenamiento.

Los cuatro PR quedaron fusionados después de CI exitoso. Las ramas temporales de #173 y #175 se cerraron al quedar desactualizadas por cambios concurrentes en el mismo archivo de pruebas; su contenido se trasladó a #176, sin perder las comprobaciones.

### Límite de las nuevas pruebas

Estas regresiones detectan desajustes internos entre el ID de vocabulario, la glosa, la opción seleccionada y el feedback; también detectan diferencias entre tokens de ordenamiento, solución y explicación. No prueban que una traducción sea la única posible, ni certifican naturalidad, pragmática, registro, pronunciación o adecuación MCER/BIPA. No sustituyen revisión editorial humana.

### Estado operativo actualizado

- PR #171, #172, #174 y #176: integrados en `main`, con CI exitoso.
- PR #173 y #175: cerrados por quedar obsoletos; trabajo trasladado a PRs sucesores.
- A2 U5–U20: cobertura adicional de regresión para preguntas de significado y ejercicios de ordenamiento.
- A2 U21–U24 y U25–U40: mantienen las comprobaciones existentes descritas en pasadas anteriores.
- La fase 2 continúa abierta: quedan por revisar los bloques no cubiertos con este mismo nivel de detalle, además de la auditoría editorial/documental y las dimensiones lingüísticas que no pueden validarse automáticamente.

No se ha cambiado el inventario de 492 entradas A2, los IDs estables, IndexedDB, ni el formato de backup v3.


## Séptima pasada de consolidación — 2026-11-01

### Regresiones de coherencia de ejercicios A2 U1–U4

- PR #178 añade controles para A2 U1–U4: las preguntas explícitas de significado deben referenciar vocabulario de la unidad, ofrecer una respuesta que corresponda a la glosa registrada y explicar el término evaluado.
- Los ejercicios de ordenar palabras deben conservar el mismo conjunto de tokens y respuesta, y su explicación debe reproducir la solución canónica permitiendo diferencias de puntuación.
- La comparación de glosas admite variantes registradas separadas por punto y coma, así como formas editoriales opcionales como `/a`; no declara equivalencias que no estén en los datos.
- PR #178 se fusionó después de CI exitoso. Durante su desarrollo se corrigieron aserciones demasiado estrictas que confundían puntuación, glosas compuestas y alternativas legítimas con errores de contenido.

### Cobertura de regresión A2 U1–U20

Con la integración de #171, #172, #174, #176 y #178, los bloques A2 U1–U20 cuentan con pruebas de alineación de preguntas de significado y, donde corresponde, integridad de tokens y feedback de ordenamiento. Estas pruebas verifican consistencia interna del material y no constituyen validación de naturalidad, pragmática, registro, pronunciación ni nivel MCER/BIPA.

### Estado y límites

- PR #178: integrado en `main`; CI exitoso.
- A2 U1–U20: cobertura de regresión ampliada.
- No se modificaron entradas curriculares, glosas, IDs, estados de trackers, IndexedDB ni backup v3 en #178.
- La auditoría editorial y lingüística sigue abierta; no hay hablante nativo disponible y KBBI no es una dependencia operativa. Los juicios no demostrables permanecen pendientes, sin bloquear el desarrollo.


## Octava pasada de consolidación — 2026-11-01

### Cobertura de alineación A1/A2 ampliada

- PR #180 añade guardas estructurales para A1 U24–U32: 9 unidades, 90 entradas de vocabulario con ejemplos bilingües no vacíos y presencia de las modalidades de práctica esperadas.
- PR #181 incorpora una regresión transversal para A1 y A2: las respuestas de traducción y escucha deben contener el término vinculado cuando se trata de vocabulario nuevo de la unidad; las preguntas explícitas de significado comparan la opción elegida con la glosa registrada o una alternativa declarada.
- La comprobación transversal distingue referencias heredadas de repaso de vocabulario nuevo y evita juzgar automáticamente preguntas de frase/contexto como si fueran glosas de una palabra aislada.
- La prueba de navegador de repaso se ajustó para activar el elemento tocado sin el desplazamiento automático que ocultaba el globo contextual fijo.

### Revisión de cobertura A2 U21–U40

La inspección de las pruebas existentes confirma que no hace falta duplicar otra batería para este bloque:

- U21–U24: las regresiones existentes verifican las opciones de significado frente a la glosa, el término en el feedback, la consistencia de tokens/solución y la correspondencia de respuestas/modelos con el vocabulario vinculado.
- U25–U40: las regresiones existentes comprueban referencias locales, preguntas de significado, respuestas de ordenamiento, modelos de escritura y respuestas de traducción/escucha.
- Las unidades U21–U40 mantienen además controles estructurales de 12 entradas, cuatro lecciones y 17 ejercicios por unidad.

### Integración y CI

- PR #178: integrado; amplía las comprobaciones de A2 U1–U4.
- PR #179: integrado; actualiza el registro de cobertura A2 U1–U20.
- PR #180: integrado; añade guardas estructurales A1 U24–U32.
- PR #181: integrado; añade alineación de respuestas y vocabulario en A1/A2.
- El CI del commit de #181 terminó con 37 pasos exitosos. La regresión de `main` y el despliegue de Pages posteriores al merge se ejecutan de forma independiente y no deben considerarse exitosos hasta que terminen.

### Límites y trabajo que continúa

Estas pruebas detectan incoherencias mecánicas demostrables: referencias erróneas, respuestas sin el término objetivo, glosas seleccionadas que no coinciden con el registro, tokens de ordenamiento inconsistentes y feedback que no reproduce la solución. No certifican naturalidad, equivalencia semántica, pragmática, registro, pronunciación ni adecuación MCER/BIPA. Los ejercicios abiertos admiten respuestas alternativas y no deben someterse a reglas literales que produzcan falsos positivos.

La fase 2 continúa abierta. La cobertura estructural y de alineación automática está reforzada en A1/A2, pero la cola editorial, las dimensiones lingüísticas sin evidencia, la revisión documental por unidad y las pruebas de audio/dispositivo siguen pendientes. La falta de hablante nativo y la indisponibilidad práctica de KBBI no deben bloquear correcciones internas ni generar estados de validación ficticios.
