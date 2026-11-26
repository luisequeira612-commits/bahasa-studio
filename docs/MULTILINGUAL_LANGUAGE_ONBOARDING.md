# Checklist de incorporación de idiomas — Guardi

**Estado:** guía operativa para futuras incorporaciones. No habilita idiomas ni publica currículo por sí misma.  
**Actualizado:** 26 de noviembre de 2026.

## Propósito y reglas

Esta guía convierte los contratos multiidioma existentes en una secuencia de trabajo repetible. El catálogo técnico no equivale a disponibilidad para estudiar.

- Mantener la interfaz, navegación y explicaciones en español.
- Todo código y dato nuevo debe ser independiente del idioma; no añadir ramas especiales para un idioma salvo adaptadores legacy documentados.
- La secuencia curricular aprobada es: **pt-BR → en → it → fr → de → nl → ru → ja → ko → id**.
- Completar A1, A2, B1 y B2 del idioma actual antes de comenzar el siguiente. La preparación técnica de varios idiomas no significa que estén publicados.
- No seleccionar ni habilitar un curso o nivel sin contenido real completo, pruebas y recursos disponibles.
- No asumir que el locale, la voz candidata o una ruta registrada prueban que el audio funciona o que el contenido es lingüísticamente correcto.
- Preservar IndexedDB v1, backup JSON v3, compatibilidad legacy, funcionamiento offline y coste cero. No introducir cuentas, backend, APIs pagadas ni dependencias nuevas sin autorización.
- Los tests estructurales y E2E validan software y datos; no certifican naturalidad, pronunciación nativa ni equivalencia MCER.

## Estado del catálogo a 2026-11-26

| Código | Idioma | Rutas curriculares registradas | Disponible |
|---|---|---|---|
| `pt-BR` | Portugués brasileño | A1, A2, B1 | No |
| `en` | Inglés | Ninguna | No |
| `it` | Italiano | Ninguna | No |
| `fr` | Francés | Ninguna | No |
| `de` | Alemán | Ninguna | No |
| `nl` | Neerlandés | Ninguna | No |
| `ru` | Ruso | Ninguna | No |
| `ja` | Japonés | Ninguna | No |
| `ko` | Coreano | Ninguna | No |
| `id` | Indonesio | A1 y A2 legacy | Sí |

El catálogo contiene diez códigos técnicos. Solo indonesio está habilitado actualmente. PT-BR es el siguiente piloto curricular aprobado; su registro y sus archivos parciales no autorizan a seleccionarlo todavía. La voz Piper indicada en el catálogo puede ser candidata o no verificada: revisar modelo, licencia, versión, tamaño y runtime antes de incorporarla.

## Procedimiento para incorporar un idioma

### 1. Confirmar el alcance

- [ ] Confirmar que corresponde al idioma actual de la secuencia aprobada.
- [ ] Definir el nivel que se va a construir y sus objetivos; no usar estimaciones de unidades como cuotas curriculares ni como equivalencia oficial MCER.
- [ ] Revisar solapamientos con los niveles anteriores y el vocabulario ya existente.
- [ ] Mantener el nivel y el curso no disponibles mientras el contenido esté incompleto.

### 2. Catálogo y metadatos

- [ ] Reutilizar el código BCP-47 acordado y ya registrado en `LanguageManager`; no crear un segundo registro de idiomas.
- [ ] Confirmar locale, nombre español, bandera, estado de voz, ruta de audio y rutas curriculares.
- [ ] Mantener `available: false` durante la preparación.
- [ ] Verificar que `validateLanguageConfig` y `validateLanguageCatalog` pasen.
- [ ] Confirmar que un idioma con niveles parciales se acepta en el catálogo sin fingir que los niveles faltantes existen.

### 3. Datos curriculares y manifiestos

- [ ] Seguir `docs/multilingual-curriculum-data-contract.md` y `docs/multilingual-curriculum-adapter-contract.md`.
- [ ] Usar la estructura por idioma/nivel/unidad y publicar `GUARDI_CURRICULUM_MANIFESTS[codigo][nivel]` y los bloques declarados.
- [ ] Comprobar que cada manifiesto tenga título, totalUnits positivo, unidades publicadas únicas y bloques con IDs/rutas válidos.
- [ ] Confirmar que no haya solapamientos entre bloques y que cada unidad publicada esté cubierta.
- [ ] Mantener compatibilidad con los datos legacy indonesios; no migrar masivamente los currículos existentes.
- [ ] No inferir tokens, lectura, transliteración, IPA o pronunciación automáticamente. Añadir campos opcionales solo cuando estén authored y justificados.
- [ ] Asegurar 5–6 lecciones didácticas explícitas por unidad; no contar tandas de ejercicios ni repasos automáticos como lecciones.

### 4. Límites del cargador que deben comprobarse

- [ ] Antes de cargar unidades, revisar el límite de rango vigente en `CurriculumLoader.loadUnits`.
- [ ] **Bloqueo conocido:** el código actual acepta unidades 1–40. Cualquier nivel con más de 40 unidades requiere una corrección separada y probada del límite antes de poder cargar sus unidades superiores. No sortearlo desde el manifiesto ni mezclarlo silenciosamente con una tarea curricular.
- [ ] Confirmar que la carga de un nivel completo exige que todas sus unidades estén publicadas.
- [ ] No declarar un nivel completo si solo hay rutas, manifiestos o unidades parciales.

### 5. Pruebas del idioma y de la aplicación

- [ ] Añadir pruebas estructurales del manifiesto y del bloque real del nivel.
- [ ] Añadir pruebas de integración de carga con el código real del idioma.
- [ ] Probar el adaptador de vocabulario y ejercicios, incluidos Unicode, escrituras no latinas cuando aplique y respuestas authored.
- [ ] Probar que el idioma no disponible no se pueda seleccionar.
- [ ] Probar el aislamiento de progreso/SRS por idioma y la compatibilidad de IDs históricos indonesios.
- [ ] Probar importación/exportación backup JSON v3 y persistencia IndexedDB v1 sin migración destructiva.
- [ ] Probar interfaz móvil, locale del contenido objetivo, audio/fallback y comportamiento offline.
- [ ] Ejecutar typecheck, pruebas de contratos, regresión completa y GitHub Pages. No fusionar con checks pendientes o fallidos.

### 6. Audio y licencias

- [ ] Verificar licencia y procedencia del modelo de voz/dataset.
- [ ] Verificar versión, disponibilidad real, tamaño y formato de los clips.
- [ ] Generar/validar muestras y probar reproducción en el navegador y fallback del dispositivo.
- [ ] No marcar una voz como `configured` hasta que la integración real esté comprobada.
- [ ] Mantener audio opcional: el curso no debe depender de un servicio remoto pagado.

### 7. Publicación

- [ ] Revisar el PR, el estado de CI del commit exacto y que no haya comentarios/revisiones pendientes.
- [ ] Actualizar `MEMORY.md` y el registro de fases en Notion.
- [ ] Habilitar solo el alcance completo que haya pasado las pruebas; no activar cursos futuros por anticipado.
- [ ] Verificar nuevamente los workflows de `main` después de fusionar.
- [ ] Informar claramente qué se probó y qué sigue sin validar lingüísticamente.

## Contratos y pruebas de referencia

- `language-manager.js`: catálogo, disponibilidad y validadores.
- `curriculum-loader.js`: resolución de rutas, manifiestos, bloques y adaptadores.
- `progress-namespace.js`: aislamiento de progreso/SRS por idioma.
- `docs/multilingual-curriculum-data-contract.md`.
- `docs/multilingual-curriculum-adapter-contract.md`.
- `tests/language-config-validation.test.cjs`.
- `tests/curriculum-manifest-validation.test.cjs`.
- `tests/progress-namespace.test.cjs`.
- `npm run typecheck`.
- `npm run test:multilingual-contracts`.

## Fases de arquitectura completadas

- **F0 — Auditoría y diseño:** inventario de catálogo, cargador, persistencia, contratos y límites existentes.
- **F1 — Tipos y checkJs base:** `LanguageManager` y `CurriculumLoader`, PR #854.
- **F2 — Contratos de catálogo/manifiestos:** validadores y fixture hipotético, PR #855.
- **F3 — Expansión selectiva checkJs:** `ProgressNamespace`, PR #856.
- **F4 — Checklist y cierre:** esta guía. La implementación multiidioma base queda documentada; no implica que los cursos nuevos estén creados o habilitados.

**Pendiente técnico separado:** ampliar el rango 1–40 del cargador de unidades, con pruebas para niveles que superen 40. No se resuelve dentro de esta guía.
