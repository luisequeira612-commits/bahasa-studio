# Protocolo de auditoría lingüística de Bahasa Studio

## Objetivo

Evaluar el indonesio de la app con evidencia rastreable. Las pruebas de software detectan fallos estructurales; no demuestran por sí solas que una traducción sea correcta, natural o adecuada para principiantes. Ninguna unidad se etiqueta como «validada» solo por pasar CI o por una revisión generada por IA.

## Fuentes y jerarquía

1. **KBBI VI Daring** — https://kbbi.kemendikdasmen.go.id/  
   Fuente lexicográfica oficial para comprobar lema, grafía, clase de palabra, acepción y etiquetas. La página puede requerir una cuenta; no automatizar el inicio de sesión, no eludir controles de acceso y no copiar en bloque contenido protegido. Registrar el enlace de la entrada y la fecha de consulta. Si el acceso está bloqueado, marcar «pendiente KBBI», no «verificado».
2. **BIPA 1, material oficial de referencia «Sahabatku Indonesia»** — https://repositori.kemendikdasmen.go.id/19081/  
   Usar para contrastar si los objetivos comunicativos, vocabulario y situaciones son apropiados para un nivel inicial. El repositorio describe BIPA 1 como comunicación sencilla en presentaciones y necesidades concretas, cotidianas y rutinarias.
3. **Repositorio oficial de materiales BIPA 1–7** — https://repositori.kemendikdasmen.go.id/19072/  
   Consultar el nivel concreto pertinente; no inferir que cualquier palabra incluida en un material avanzado sea A1.
4. **BIPA Daring, sitio oficial** — https://bipa.kemendikdasmen.go.id/  
   Usar para localizar materiales y orientaciones institucionales adicionales.
5. **Fuentes lingüísticas secundarias y corpus públicos**: pueden aportar ejemplos de uso y naturalidad, pero deben etiquetarse como fuentes secundarias y nunca presentarse como una validación de KBBI/BIPA.

KBBI es un diccionario de indonesio, no una certificación de nivel A1 ni una guía completa de naturalidad conversacional. BIPA aporta contexto pedagógico, no reemplaza el análisis de cada entrada de diccionario.

## Estados permitidos

- `verified_primary`: la fuente primaria pertinente se consultó directamente y la evidencia está registrada.
- `verified_secondary`: solo hay evidencia de una fuente secundaria fiable; identificarla.
- `needs_review`: hay duda lingüística o pedagógica concreta.
- `blocked_access`: no se pudo consultar la fuente por inicio de sesión, indisponibilidad o restricciones.
- `not_checked`: todavía no se ha revisado.

No cambiar un término a estado verificado por inferencia, traducción automática o mera presencia en una página de resultados.

## Campos mínimos por lema

Registrar en el rastreador de auditoría:
- unidad e ID estable del vocabulario;
- forma visible y traducción española;
- ejemplo en indonesio y traducción;
- lema/base y análisis morfológico si la forma visible está flexionada o derivada;
- fuente, URL exacta y fecha de consulta;
- evidencia breve en palabras propias (no copiar definiciones extensas);
- dictamen sobre significado, ortografía, clase de palabra, naturalidad y adecuación al nivel;
- estado, persona/revisor y acción correctiva.

Para formas derivadas como imperativos, afijos `meN-`, `ber-`, `-kan` o `-i`, distinguir la forma que se enseña del lema/base buscado en el diccionario. No marcar como error una forma válida solo porque no sea la forma de cita del diccionario.

## Revisión de gramática y ejemplos

Para cada unidad, revisar de manera independiente:
1. significado y correspondencia indonesio–español;
2. morfología, orden de palabras, partículas y preposiciones;
3. registro (formal/informal), pronombres y adecuación al contexto;
4. naturalidad y si el ejemplo es una oración completa o un fragmento conversacional deliberado;
5. dificultad apropiada al nivel inicial;
6. consistencia del mismo término en lección, ejercicios, pistas, respuestas aceptadas y audio.

Separar los dictámenes de «correcto», «natural», «adecuado para el nivel» y «didácticamente claro»: son criterios distintos. Ante desacuerdo o incertidumbre, pedir revisión humana competente en indonesio antes de cerrar la incidencia.

## Ejercicios y respuestas aceptadas

- Comprobar que cada respuesta corresponde exactamente a la pregunta y a los IDs de vocabulario vinculados.
- Revisar todas las variantes aceptadas: alternativas de traducción razonables, afijos, mayúsculas, puntuación y espacios. No aceptar variantes indiscriminadamente.
- Incluir pruebas negativas para evitar que una respuesta semánticamente incorrecta se acepte.
- La CI puede comprobar referencias, estructura y consistencia de datos; la aprobación lingüística requiere evidencia separada.

## Audio y comportamiento en dispositivo

La revisión textual no certifica pronunciación. Probar el audio real, la voz disponible, los fallbacks, permisos y comportamiento offline en navegadores/dispositivos compatibles. Si no se escuchó o probó, registrar «no probado».

## Criterio de salida

Una auditoría solo se declara cerrada si todas las filas del alcance tienen estado y evidencia, las incidencias críticas están resueltas, las respuestas se han revisado y las limitaciones de audio se describen con honestidad. Los términos bloqueados por acceso deben seguir pendientes o contar con una alternativa verificable acordada explícitamente; nunca se convierten en verificados por defecto.

## Referencias oficiales consultadas

- KBBI VI Daring, página oficial y estado de acceso: https://kbbi.kemendikdasmen.go.id/ y https://kbbi.kemendikdasmen.go.id/?m=0
- Badan Pengembangan dan Pembinaan Bahasa, «Sahabatku Indonesia BIPA 1» (repositorio oficial): https://repositori.kemendikdasmen.go.id/19081/
- Repositorio de materiales «Sahabatku Indonesia BIPA 1–7»: https://repositori.kemendikdasmen.go.id/19072/
- BIPA Daring: https://bipa.kemendikdasmen.go.id/
