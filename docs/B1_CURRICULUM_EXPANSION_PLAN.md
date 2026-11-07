# Plan de expansión y puerta de calidad de B1

Estado: borrador ampliado a doce unidades, aún oculto y pendiente de revisión editorial. U1–U12 siguen la secuencia acordada por bloques; el contenido de U10–U12 se reorganizó el 6 nov 2026.  
Fecha de corte: 2026-11-06.

## Inventario actual

El currículo B1 está definido dentro de `CourseData` en `index.html`. El inventario actual contiene doce unidades:
1. Voz pasiva con `di-` a partir de baca, tulis, jual y ajar.
2. Contraste entre activa `meN-` y pasiva `di-`.
3. Reconocimiento de las familias `ber-` y `ter-`.
4. Verbos con sufijo `-kan`.
5. Contraste contextual entre `-kan` y `-i`.
6. Verbos con `-i` y sus pasivas correspondientes.
7. Nombres de agente con `pe-/peN-` (penjual, pembeli, pemain).
8. Nombres de agente con `pe-/peN-` (penulis, pengajar, pekerja).
9. Nombres de agente con `pe-/peN-` (pemimpin, penduduk, pembaca).
10. Nominalizaciones con `-an` y `pe-an`.
11. Nominalizaciones con `per-an`.
12. Nombres de estado y conceptos con `ke-an`.

El inventario actual conserva doce unidades, 45 entradas activas de vocabulario y 72 ejercicios. U10–U12 aportan nueve entradas nuevas; seis formas de la lista del usuario ya tenían IDs canónicos en A1/A2 y se reutilizan sin duplicarlas. U4–U6 incorporan 13 formas (11 verbos de la lista del usuario y dos pasivas relacionadas) y 19 ejercicios. El total de vocabulario no aumenta porque las 13 entradas anteriores de U4–U6 se archivaron para reorganizarlas después. El banco de evaluación independiente pasa de seis a **veinte ítems**: incluye tres tareas de escucha, tres preguntas de comprensión de un texto más extenso, tres tareas de producción escrita abierta y una tarea oral, todas las respuestas productivas pendientes de revisión humana. La expansión es un borrador de contenido beta; no constituye un currículo B1 completo ni una evaluación calibrada.

## Brechas principales

- La cobertura ahora incluye una muestra inicial de escucha, lectura, interacción y producción; todavía faltan más textos de lectura y variedad de escucha y muestras orales suficientes para cubrir las habilidades B1.
- Hay pocos ejemplos por patrón y pocos contextos comunicativos para distinguir significado, participantes, foco y registro; la progresión necesita una revisión de carga y recurrencia.
- La evaluación B1 actual no cubre con suficiente amplitud las unidades y las habilidades.
- No existe evidencia de calibración con estudiantes ni validación lingüística global.
- B1/B2 están deliberadamente excluidos de `getLearningLevels()`; no deben aparecer en recomendaciones adaptativas ni desbloquearse por error.

## Estructura objetivo y estado del borrador

La expansión se hará por bloques y no se publicará como curso habilitado hasta superar la puerta de calidad.

| Bloque | Unidad propuesta | Evidencia comunicativa |
|---|---|---|
| Morfología y significado | U1–U6 | U1–U2: pasiva/activa con `di-` y `meN-`; U3: reconocimiento de `ber-` y `ter-`; U4–U6: sufijos `-kan/-i`, contraste contextual y pasivas correspondientes |
| Cohesión y narración | U18–U24 según la hoja de ruta del usuario | Condicionales, concesivas, causa, consecuencia y narración de experiencias; U1–U12 ya siguen los primeros bloques de la secuencia y las unidades U13+ continúan pendientes |
| Lectura | U7–U9: Nombres de agente pe-/peN- | Identificar vendedor, comprador, jugador, escritor, docente, trabajador, líder, habitante y lector en frases y contextos sencillos |
| Procesos | U10–U11: Nominalizaciones -an, pe-an y per-an | U10: pelajaran y pekerjaan; U11: pertanyaan, percakapan y perkenalan. pengalaman, perjalanan y pertemuan ya tienen IDs canónicos en A2 y se reutilizan como conocimientos previos |
| Estados y conceptos | U12–U14: ke-an básico | U12 introduce kesehatan, kecelakaan, keadaan y kebudayaan; kebersihan, keluarga y kesempatan se reutilizan desde A1/A2 |
| Registro | U15–U17 según la hoja de ruta | Estructuras relativas con yang; el registro formal antiguo de U10 se conserva en el archivo de contenido desplazado |
| Interacción | Según la secuencia posterior del plan B1 | Los objetos antiguos de U11 se preservan para revisión; no se cargan automáticamente |
| Integración | U49–U50 | Repaso y evaluación B1, según el plan del usuario |

Los contenidos gramaticales adicionales se decidirán según el objetivo de cada unidad. No se asignará una traducción fija a un afijo polisémico ni se tratarán las listas del MCER como listas oficiales de gramática indonesia.

## Requisitos mínimos por unidad nueva

- Objetivo comunicativo observable y relación explícita con los conocimientos previos.
- Vocabulario con IDs estables, glosa, ejemplo indonesio y traducción.
- Explicación breve con límites y excepciones relevantes.
- Ejercicios variados, incluyendo comprensión y al menos una producción contextualizada.
- Referencias de vocabulario que existan y pertenezcan a contenido ya presentado o a la unidad actual.
- Respuestas alternativas solo cuando exista evidencia suficiente; no inferir equivalencias por traducción literal.
- Pruebas estructurales y de regresión.
- Estado editorial explícito y fuentes trazables para decisiones lingüísticas.

## Puerta de salida de B1

1. Todas las unidades previstas tienen objetivos, ejemplos, ejercicios y referencias consistentes.
2. El banco de evaluación cubre lectura, escucha, interacción, producción y los patrones gramaticales realmente enseñados.
3. Las respuestas abiertas requieren rúbrica y revisión humana; no se aprueban por coincidencia textual.
4. Los ítems de opción múltiple tienen una respuesta defendible y distractores que no son también válidos.
5. El nivel se describe como progresión interna B1 orientativa, no como certificación oficial MCER.
6. La app conserva B1 oculto hasta que A1/A2 y la política de desbloqueo lo permitan explícitamente.
7. Pruebas offline, SRS, backups e IndexedDB siguen funcionando sin migración de esquema.

## Estado lingüístico y editorial

El inventario y las pruebas automáticas pueden demostrar estructura, referencias y coherencia interna. No certifican naturalidad, registro, gramática avanzada, adecuación MCER/BIPA ni pronunciación. Mientras no exista evidencia suficiente, los elementos deben permanecer pendientes de revisión competente y no se presentarán como validados por hablante nativo.


## Avance de contenido B1 — U6–U12

El borrador conserva doce unidades. U1–U9 siguen las secuencias di-/meN-/ber-/ter-, -kan/-i y pe-/peN-. U10–U11 cubren nominalizaciones frecuentes; U12 inicia ke-an. Los objetos anteriores de U10–U12 se preservan en un archivo independiente.

Se añadieron cinco preguntas de opción múltiple para cubrir conectores, lectura de informes, voz pasiva, opinión y registro formal; una pregunta de interacción; una tarea oral con rúbrica; una tarea de síntesis escrita; y una tarea inicial de escucha. El banco incorpora explícitamente las habilidades `register`, `interaction` y `comprehension`. Las tres tareas escritas abiertas y la tarea oral requieren revisión humana; los ítems cerrados solo prueban comprensión de los ejemplos redactados y no validan el dominio productivo.

La prueba `tests/b1-curriculum-readiness.test.cjs` ahora fija la estructura de doce unidades, 57 entradas y 60 ejercicios, comprueba que cada ejercicio apunte a vocabulario de su unidad, y confirma que B1 permanezca oculto. Las formas y ejemplos nuevos son material beta pendiente de revisión lingüística; no se deben presentar como validados por hablante nativo.


U11 incorpora estrategias de aclaración y negociación (`bisa diulangi?`, `maksud saya`, `bagaimana kalau`); U12 incorpora vocabulario de experiencia, explicación, respuesta y conclusión. Se añadieron al banco una pregunta de interacción, una tarea oral con rúbrica y una tarea de síntesis escrita. Las tareas abiertas y orales quedan explícitamente pendientes de evaluación humana y no reciben crédito automático.


## Lectura B1 ampliada

Se añadió un texto informativo breve sobre un programa comunitario de lectura, con tres preguntas separadas de idea principal, detalle e inferencia. El texto permite comprobar comprensión de conectores y tendencias en contexto, pero sigue siendo una única muestra de lectura y no cubre por sí sola el rango de textos B1.


Las tareas de escucha distinguen respuesta breve por contenido de transcripción literal: el formulario permite una etiqueta de respuesta específica por ítem. Los tres audios/textos son cortos y sintetizados por el motor de voz del navegador; aún no sustituyen grabaciones de hablantes ni una evaluación de comprensión auditiva con variedad de voces y velocidades.


## Ampliación B1 U1–U3 — progresión de familias de afijos

Tras la reorganización aprobada, U1 contiene cuatro formas pasivas con `di-` (`dibaca`, `ditulis`, `dijual`, `diajar`) y siete ejercicios. U2 contrasta las formas activas `membaca`, `menulis`, `menjual` y `mengajar` con la pasiva ya estudiada; conserva `oleh` como marcador del agente. U3 introduce reconocimiento contextual de `ber-` y `ter-` mediante `bekerja`, `bermain`, `terbaca`, `tertulis` y `terjual`.

La reorganización retiró de U1 las formas `dimakan`, `dibuka`, `ditutup`, `dibuat` y `dikirim`; de U2, la entrada duplicada `dibaca` y `penulis`; y de U3, `mengirimkan`, `mengirimi`, `mengisi` y `memperbaiki`, para respetar la secuencia aprobada y evitar adelantar `-kan/-i`, `peN-` y contenido de B2. El inventario provisional de B1 queda en 57 entradas y 60 ejercicios, distribuidos en doce unidades.

Este material sigue siendo un borrador interno: las frases y glosas no están certificadas por hablante nativo ni calibradas para MCER/BIPA. B1 permanece oculto. Las pruebas de preparación verifican inventario, referencias locales y progresión declarada; no certifican corrección lingüística.


## Reorganización aprobada de B1 U1–U3

Con autorización del usuario, se alineó la progresión inicial con su plan curricular:
- U1: pasiva con `di-`, usando `dibaca`, `ditulis`, `dijual` y `diajar`.
- U2: contraste activa `meN-` / pasiva `di-` con `membaca`, `menulis`, `menjual` y `mengajar`; `oleh` se mantiene como marcador del agente.
- U3: reconocimiento de `ber-` y `ter-` con `bekerja`, `bermain`, `terbaca`, `tertulis` y `terjual`.

Se retiraron de U1 las formas `dimakan`, `dibuka`, `ditutup`, `dibuat` y `dikirim`; de U2, `dibaca` como entrada duplicada y `penulis`; de U3, `mengirimkan`, `mengirimi`, `mengisi` y `memperbaiki`, para respetar la secuencia aprobada y evitar adelantar `-kan/-i`, `peN-` y contenido de B2. Las prácticas se reescribieron para las formas de cada unidad. El inventario B1 permanece en 57 entradas; el total de ejercicios pasa a 60. B1 sigue oculto. Las formas y glosas siguen siendo borrador beta, no certificación nativa ni calibración MCER/BIPA.


## Reorganización autorizada de B1 U4–U6 (7 nov 2026)

El usuario autorizó reemplazar los antiguos contenidos de U4–U6 y conservarlos para su futura reorganización. La secuencia actual sigue su plan: U4 -kan (memberikan, mengirimkan, menjelaskan, membersihkan); U5 contraste -kan/-i (mengingatkan, memasukkan, mendatangi, menemui); U6 -i y pasivas (menghadiri, mencintai, memasuki, dijelaskan, ditemui). Se incorporaron 19 ejercicios: seis en U4, seis en U5 y siete en U6. La explicación advierte que la selección del sufijo depende del verbo, los participantes y el contexto, no de una regla mecánica universal.

Los objetos originales de U4–U6 se preservan literalmente en docs/B1_U4_U6_DISPLACED_CONTENT.md, junto con destinos propuestos para su revisión: Makanan/Minuman, Bukunya/Rumahnya, Terbuka/Tertutup, Pekerja/Pendidikan y conectores anteriores. No se pierde contenido ni se reintroduce automáticamente. El inventario de B1 sigue en 57 entradas y pasa a 66 ejercicios. B1 permanece oculto; las formas y glosas son borrador beta no validado por hablante nativo ni calibrado MCER/BIPA.


## Reorganización autorizada de B1 U7–U9 (6 nov 2026)

El usuario autorizó reemplazar los borradores de U7–U9 y archivar íntegramente los objetos anteriores en `docs/B1_U7_U9_DISPLACED_CONTENT.md`.

- U7: `penjual`, `pembeli`, `pemain`.
- U8: `penulis`, `pengajar`, `pekerja`.
- U9: `pemimpin`, `penduduk`, `pembaca`.
- `pembelian` y `pengiriman` aparecen solo como reconocimiento de nominalizaciones peN-an; no son entradas de vocabulario ni se exigen en producción.
- Se añadieron 18 ejercicios (6 por unidad). El inventario B1 pasa de 57 a 51 entradas activas y de 66 a 69 ejercicios; las 15 entradas/ejercicios previos de U7–U9 quedan preservados en el archivo y no se cargan en la app.
- B1 continúa oculto. No se modificaron A1/A2, IndexedDB, backup JSON v3, trackers/CSV ni dependencias. Las formas y glosas siguen siendo material beta no validado por hablante nativo ni calibrado MCER/BIPA.


## Reorganización autorizada de B1 U10–U12 (6 nov 2026)

El usuario autorizó sustituir los borradores antiguos de U10–U12 y conservar íntegramente sus objetos en `docs/B1_U10_U12_DISPLACED_CONTENT.md`.

- U10: `pelajaran` y `pekerjaan`; ejemplos comparativos con `pengalaman`, cuyo ID canónico ya existe en A2.
- U11: `pertanyaan`, `percakapan` y `perkenalan`; `pertemuan` ya tiene ID canónico en A2.
- U12: `kesehatan`, `kecelakaan`, `keadaan` y `kebudayaan`; `kebersihan` y `kesempatan` ya están en A2, y `keluarga` en A1.
- Se evita duplicar las seis entradas ya enseñadas; se añaden nueve formas nuevas y 18 ejercicios (6 por unidad). El borrador B1 queda en 45 entradas activas y 72 ejercicios.
- Las antiguas unidades de cortesía formal, negociación e integración se conservan literalmente en el archivo de desplazados para futura reasignación, no se cargan ni se descartan.
- B1 continúa oculto. No se modifican A1/A2, IndexedDB, backup JSON v3, trackers/CSV ni dependencias. Material beta sin validación nativa ni calibración MCER/BIPA.
