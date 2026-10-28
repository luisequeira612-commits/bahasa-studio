# Política de coste cero y uso legal de servicios externos

## Objetivo no negociable

Bahasa Studio debe seguir siendo utilizable por estudiantes sin pagos, suscripciones, claves de API ni llamadas a servicios de IA de pago. No introducir una dependencia cuyo uso normal pueda generar cargos, exigir una tarjeta o agotar una cuota esencial para completar las lecciones.

Esta política es una guía de ingeniería, no asesoramiento jurídico ni una garantía de que ningún proveedor vaya a cambiar sus condiciones.

## Arquitectura por defecto

- Las lecciones, el vocabulario, las traducciones, las explicaciones, los ejercicios y sus respuestas se sirven desde los archivos propios de la aplicación.
- La app no necesita llamar a KBBI, servicios de traducción, Gemini, OpenAI ni otros proveedores externos mientras el estudiante estudia.
- Las comprobaciones lingüísticas se hacen durante el desarrollo/publicación. Se guardan localmente en el repositorio solo los resultados permitidos por las licencias aplicables: referencia, URL, fecha, nota propia breve y estado de revisión.
- No copiar ni redistribuir en bloque definiciones, ejemplos, corpus, audio o bases de datos de terceros sin permiso explícito.
- No eludir inicio de sesión, controles antiabuso, límites de frecuencia ni restricciones técnicas de ningún sitio.
- No almacenar secretos, tokens o claves de API en el frontend, en Git ni en los archivos publicados.

## Política de selección de dependencias

Antes de añadir una biblioteca, modelo, dataset, fuente de audio o servicio externo, registrar:

1. URL del proyecto y versión/commit exactos.
2. Licencia del código, de los modelos y de los datos por separado.
3. Si permite uso comercial y redistribución, si eso llegara a aplicar.
4. Dependencias de red, cuenta, clave, tarjeta, límites y condiciones de uso.
5. Coste de alojamiento, compilación, almacenamiento, transferencia y mantenimiento.
6. Alternativa local y comportamiento cuando la dependencia no esté disponible.

Preferir dependencias permisivas y mantenidas (por ejemplo, MIT, BSD o Apache-2.0) cuando se confirme que la licencia cubre realmente el componente que se usa. No asumir que la licencia del código cubre los datos o servicios a los que accede. Revisar AGPL/GPL y otras licencias con obligaciones de distribución/red antes de integrar; no incorporarlas sin una decisión documentada.

## Política para herramientas lingüísticas

- **KBBI VI Daring:** fuente de consulta primaria cuando sea accesible. Abrir las entradas de forma normal, respetar las condiciones del sitio y registrar únicamente URL, fecha y notas originales breves. No hacer scraping masivo ni replicar la base de datos. Una API comunitaria no es oficial por el mero hecho de consultar KBBI.
- **NLP-ID/Aksara y herramientas similares:** usarlas primero en entorno local o CI como ayudas de análisis. Confirmar repositorio, licencia, dependencias y compatibilidad antes de integrarlas. Sus resultados no sustituyen una revisión lingüística competente.
- **Traducción automática:** solo segunda opinión para revisores; nunca aceptar automáticamente una traducción ni cambiar el contenido publicado por una respuesta de API.
- **Fuentes con cuotas gratuitas o instancias públicas:** no son una dependencia de ejecución. Pueden desaparecer, limitar tráfico o cambiar condiciones.
- **Audio:** preferir archivos de audio propios o generados con una herramienta cuyo uso y redistribución estén permitidos, revisados y guardados en el proyecto. La generación es una tarea de preparación, no una llamada por reproducción. La voz integrada del navegador puede ser una mejora opcional, pero su disponibilidad depende del dispositivo y no debe ser requisito para completar el curso.

## Comportamiento cuando una fuente no está disponible

1. Reutilizar evidencia previamente registrada que siga siendo aplicable.
2. Usar otra fuente cuya licencia y autoridad estén documentadas.
3. Si no hay evidencia suficiente, marcar la entrada como pendiente de revisión.
4. No convertir una ausencia de resultados en prueba de que una palabra es incorrecta o correcta.
5. La app debe seguir funcionando normalmente aunque todos los servicios externos estén desconectados.

## Controles para CI y revisión

- Rechazar nuevas dependencias de runtime que requieran una API externa para mostrar lecciones.
- Revisar los archivos de configuración para evitar claves, tokens y URLs de proveedores de pago.
- Mantener un inventario de dependencias/licencias y actualizarlo al introducir nuevas herramientas.
- Documentar cualquier excepción antes de fusionar.
- Las pruebas automáticas verifican estructura y comportamiento; no certifican por sí solas la calidad lingüística.

## Compromiso de coste

El diseño del producto no debe exigir pagos a proveedores de API. Esto no puede garantizar que toda infraestructura de terceros permanezca gratuita para siempre: GitHub, alojamiento, dominios, distribución o cambios de licencia pueden imponer condiciones propias. Para reducir ese riesgo, mantener el núcleo estático, portable y sin servicios de pago obligatorios.

## Checklist antes de integrar una herramienta

- [ ] Repositorio y mantenedor verificados.
- [ ] Licencia del código confirmada.
- [ ] Licencia/permiso de los datos y modelos confirmado por separado.
- [ ] Sin tarjeta, suscripción ni coste obligatorio.
- [ ] Sin dependencia de API remota en tiempo de estudio.
- [ ] Funciona o falla de forma segura sin conexión.
- [ ] Alternativa documentada y prueba de CI.
- [ ] Sin scraping ni elusión de controles.
