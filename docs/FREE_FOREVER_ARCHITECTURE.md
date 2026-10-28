# Arquitectura de coste cero para Bahasa Studio

Fecha de decisión: 2026-10-28

## Objetivo

Mantener el uso de Bahasa Studio sin suscripciones, claves de pago ni cargos por consulta. La aplicación debe seguir siendo útil si cualquier servicio externo desaparece, limita el tráfico o cambia sus condiciones.

**Promesa técnica realista:** diseñamos para cero coste recurrente por APIs y para que las funciones principales no dependan de servicios externos. No podemos garantizar que todos los costes de alojamiento, dominio, distribución o dispositivos sean gratis para siempre.

## Decisiones

### 1. La app no debe llamar a APIs externas durante el estudio

- Mantener las lecciones, vocabulario, ejercicios, respuestas aceptadas y progreso en los recursos de la propia app y en el almacenamiento local existente.
- No requerir cuentas, claves API, servidores de IA, traducción remota ni servicios de diccionario para abrir una lección o completar un ejercicio.
- Si una función opcional externa falla o no está disponible, ocultar/desactivar esa función con un mensaje claro; nunca bloquear el curso.
- No incorporar analítica, anuncios ni SDKs de terceros que añadan dependencia operativa o cargos.

### 2. Verificación lingüística: preparar y revisar antes de publicar

- Usar KBBI Daring como referencia primaria mediante sus páginas oficiales accesibles. Intentar la URL directa de una entrada cuando la búsqueda general requiera acceso.
- Respetar los controles de acceso y las condiciones de uso de KBBI. No eludir autenticación, automatizar extracción masiva ni copiar definiciones protegidas en bloque.
- Registrar en el tracker solo metadatos de auditoría necesarios: lema consultado, URL, fecha, estado de verificación y una nota breve redactada por el equipo.
- Una consulta fallida no prueba que la palabra sea incorrecta ni que no exista. Marcarla como pendiente y usar revisión editorial y fuentes legítimas alternativas.

### 3. Herramientas NLP: solo en desarrollo/CI y después de validar resultados

- Candidato inicial: [kumparan/nlp-id](https://github.com/kumparan/nlp-id), biblioteca local con licencia MIT según el archivo LICENSE consultado el 2026-10-28. El repositorio es de **Kumparan**, no de Kata.ai.
- Evaluar tokenización, lematización y etiquetado en una muestra representativa de frases A1. Medir falsos positivos antes de incorporarlo a un control automatizado.
- La salida de un analizador es una señal de revisión, no una certificación de naturalidad, corrección gramatical ni nivel BIPA.
- No añadir una dependencia NLP al código que se entrega al navegador si solo se necesita para auditorías editoriales.
- Aksara ([ir-nlp-csui/aksara](https://github.com/ir-nlp-csui/aksara)) usa AGPL-3.0 según su archivo LICENSE. Dejarlo fuera de la app y del servicio publicado hasta revisar conscientemente las obligaciones de distribución/servicio; no es necesario para el primer prototipo.

### 4. Audio: sin servicio de pago ni llamada remota obligatoria

- Priorizar la Web Speech API del navegador (speechSynthesis) cuando haya una voz indonesia disponible.
- Detectar ausencia de voces compatibles y mostrar una alternativa; no prometer que las voces o la reproducción sin conexión están disponibles en todos los dispositivos.
- No usar ResponsiveVoice como dependencia: sus condiciones gratuitas no son una base suficientemente segura para una promesa de coste cero a largo plazo.
- No depender en tiempo de ejecución de gTTS: aunque la biblioteca es MIT, se apoya en un servicio externo no documentado oficialmente y puede dejar de funcionar.
- Si en el futuro se crean archivos de audio previamente generados, deben tener una licencia/permiso de uso claro, quedar versionados o alojados como recursos estáticos y no ser necesarios para completar los ejercicios.

### 5. Traducción y diccionarios complementarios

- No usar Lingva Translate ni instancias públicas de traducción en tiempo de ejecución. Una instancia propia sigue requiriendo alojamiento y la licencia AGPL exige atención.
- Free Dictionary API se orienta al inglés; no sirve como verificador del vocabulario indonesio. No añadirla a la app salvo que exista un caso de uso inglés claramente definido.
- Las traducciones automáticas pueden servir como segunda opinión editorial, nunca como fuente de verdad ni como aceptación automática de respuestas.

### 6. Respaldo cuando un servicio o límite deja de funcionar

1. Reutilizar la evidencia ya guardada si está fechada y es pertinente.
2. Usar herramientas locales de desarrollo y pruebas estáticas que no requieran una API remota.
3. Consultar fuentes oficiales alternativas y documentar la procedencia.
4. Si no se puede verificar, dejar la entrada marcada como pendiente de revisión humana; no inventar una confirmación.
5. El alumnado sigue usando las lecciones y ejercicios locales sin interrupción.

## Puertas de calidad antes de adoptar una herramienta

- [ ] Licencia del código comprobada en el archivo LICENSE del repositorio exacto.
- [ ] Derechos/licencia de los datos comprobados por separado del código.
- [ ] No se requiere una clave de pago ni una cuota de API para el flujo normal.
- [ ] Se puede desactivar la herramienta sin romper la app.
- [ ] Probada con frases reales de A1 y falsos positivos registrados.
- [ ] No se publica contenido de diccionario protegido ni se eluden controles de acceso.
- [ ] La CI confirma que la app funciona sin red externa.

## Costes que siguen fuera de esta promesa

Un proveedor de alojamiento, dominio, tienda de aplicaciones, almacenamiento o distribución puede cambiar sus planes. Para reducir riesgo, mantener una versión estática/PWA, minimizar recursos remotos y documentar cómo desplegarla en un alojamiento estático gratuito disponible. Revisar las condiciones vigentes antes de comprometerse con un proveedor.

## Referencias

- KBBI Daring: https://kbbi.kemendikdasmen.go.id/
- Kumparan NLP-ID: https://github.com/kumparan/nlp-id
- Aksara: https://github.com/ir-nlp-csui/aksara
- gTTS: https://github.com/pndurette/gTTS
- Lingva Translate: https://github.com/thedaviddelta/lingva-translate
- Free Dictionary API: https://dictionaryapi.dev/
- ResponsiveVoice license: https://responsivevoice.org/license/
