# Auditoría de cobertura de escucha y pronunciación A1

Fecha de inventario: 2026-10-29  
Alcance: las 32 unidades A1 definidas en `CourseData` dentro de `index.html`. El inventario es estructural: cuenta ejercicios configurados, no certifica la calidad de la voz, la naturalidad lingüística ni el funcionamiento del micrófono en dispositivos reales.

## Inventario actual

La lectura del objeto curricular completo, contemplando tanto claves JavaScript sin comillas como claves JSON entre comillas, arroja:

- **32/32 unidades** con al menos una actividad de escucha basada en audio o un ejercicio `listen`.
- **40 ejercicios con `audioText`**, distribuidos en 29 unidades. En ejercicios `mc`, la frase se reproduce automáticamente y se ofrece el botón «Repetir audio».
- **33 ejercicios `listen`**, distribuidos en 21 unidades. El motor reproduce por voz sintética la respuesta esperada y el estudiante escribe lo que escucha.
- Las dos modalidades se complementan; no deben contarse como equivalentes. `audioText` oculta la frase y evalúa reconocimiento de significado; `listen` pide transcribir la respuesta oída.

La cobertura está repartida por todo A1: los ejercicios `audioText` aparecen en U1–U10 (con variación por unidad), U12–U19 y U21–U31; los ejercicios `listen` aparecen en U3–U8, U10–U11 y U18–U32. U11, U20 y U32 cuentan con ejercicios `listen` aunque no tienen `audioText`; U1, U2, U6, U9 y U12–U17 cuentan con `audioText` aunque no usan el tipo `listen`.

## Comportamiento verificado por CI

- Playwright prueba que `AudioEngine` envía texto a la API de síntesis con locale `id-ID`, elige una voz simulada de indonesio cuando está disponible y usa la velocidad inicial 0.85.
- La práctica opcional de pronunciación prueba el flujo de reconocimiento simulado: inicio tras pulsar el botón, comparación de la transcripción, ausencia de XP/progreso y fallback cuando la API no existe.
- La regresión del PR #68 prueba que al pulsar «Comprobar» se aborta el reconocimiento y se limpia la referencia a la sesión activa.
- Estas pruebas usan APIs simuladas en Chromium. **No prueban un micrófono físico, permisos reales, calidad de pronunciación, disponibilidad de una voz indonesia instalada ni diferencias entre navegadores móviles.**

## Limitaciones técnicas que deben comunicarse

1. La síntesis usa `speechSynthesis` del navegador/sistema. Se prefiere una voz cuyo idioma empiece por `id`; si no se detecta, se establece `utter.lang = 'id-ID'` y el navegador decide qué voz o fallback utilizar. La calidad puede variar entre dispositivos.
2. El reconocimiento opcional depende de `SpeechRecognition` o `webkitSpeechRecognition`. No está disponible de forma uniforme en todos los navegadores.
3. La app compara la transcripción normalizada con la frase objetivo. No mide fonemas, tono, ritmo ni acento y no debe presentarse como evaluación fonética.
4. El reconocimiento solo se inicia tras una acción explícita. El navegador puede procesar o enviar el audio a su proveedor; la app no almacena grabaciones.
5. No se debe bloquear el avance de una unidad por no tener micrófono, permiso o soporte de reconocimiento.

## Prueba manual pendiente en dispositivos reales

Registrar dispositivo, sistema operativo, navegador y resultado, sin grabar ni conservar audio personal:

- [ ] Chrome/Android: reproducción automática, repetición, velocidad, permiso de micrófono, denegación y cierre al comprobar.
- [ ] Safari/iOS: síntesis disponible, fallback de voz y comportamiento cuando el reconocimiento no está soportado.
- [ ] Chrome o Edge de escritorio: voz `id-ID`, control de velocidad y reconocimiento con permiso concedido/denegado.
- [ ] Firefox u otro navegador sin reconocimiento compatible: la práctica muestra el aviso de no disponibilidad y la lección sigue funcionando.
- [ ] Modo sin conexión: comprobar las funciones de curso que dependen de las APIs locales del navegador; no asumir que el reconocimiento remoto funciona offline.

## Regresión

`tests/a1-listening-coverage.test.cjs` extrae el objeto curricular y exige que las 32 unidades mantengan al menos un ejercicio `audioText` o `listen`. Esta protección evita que una edición futura deje accidentalmente una unidad sin práctica auditiva; no sustituye la auditoría lingüística ni las pruebas manuales anteriores.
