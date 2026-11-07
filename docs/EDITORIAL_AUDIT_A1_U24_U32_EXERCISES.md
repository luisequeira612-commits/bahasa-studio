# Revisión contextual de ejercicios A1 U24–U32

**Fecha:** 7 de noviembre de 2026  
**Base:** `main` posterior al merge del PR #386.  
**Alcance:** lectura individual de los 102 ejercicios de A1 U24–U32: consigna, opciones, clave, explicación y, cuando aplica, respuesta modelo/pista.

## Inventario

| Unidad | Ejercicios revisados |
|---|---:|
| U24 | 11 |
| U25 | 11 |
| U26 | 12 |
| U27 | 11 |
| U28 | 11 |
| U29 | 12 |
| U30 | 11 |
| U31 | 12 |
| U32 | 10 |
| **Total** | **102** |

## Candidatos reproducibles

1. **U25 — concordancia de persona en la consigna.** El estímulo `Saya suka berenang` está en primera persona y la opción correcta «Me gusta nadar» también. La pregunta «¿Qué actividad le gusta…?» formula la pregunta en tercera persona/usted, por lo que no coincide con la perspectiva del estímulo ni de la respuesta. Candidato de claridad de consigna; no se cambia el ejercicio en este PR.
2. **U29 — concordancia de persona en la consigna.** El estímulo `Saya selalu belajar` y la opción «Siempre estudio» están en primera persona. La consigna «¿Con qué frecuencia estudia…?» usa tercera persona/usted. Candidato de claridad; no se cambia el ejercicio en este PR.

## Coherencia general observada

- Las claves de opción múltiple revisadas apuntan a la opción que coincide con la glosa o con la frase indonesia mostrada.
- Las tareas `order` conservan correspondencia entre las palabras disponibles, el orden objetivo y la explicación.
- Las respuestas canónicas de traducción y escucha coinciden con el término o expresión objetivo en el currículo.
- Las tareas `write` de este bloque presentan modelo y pista coherentes con la intención española. El modelo es orientativo y no se interpreta como única respuesta lingüísticamente válida.
- Los casos de `seberang`, `tiket`, `stempel`, `maaf`/`permisi`, `silakan` y expresiones pragmáticas ya documentados en las auditorías anteriores no se reclasifican como errores por esta revisión.

## Resultado

- Ejercicios leídos: **102/102**.
- Candidatos concretos nuevos de consigna: **2** (U25 y U29).
- Errores lingüísticos confirmados: **0**.
- Cambios en currículo, vocabulario, glosas, ejercicios, explicaciones o respuestas aceptadas: **ninguno**.
- No se usó KBBI ni fuentes externas para certificar naturalidad. No se certifica uso nativo, registro, MCER/BIPA ni exhaustividad de respuestas alternativas.

## Siguiente paso

Resolver los dos candidatos de consigna en un PR curricular separado, después de comprobar que la formulación mantiene la perspectiva de primera persona. Continuar luego con la revisión contextual de A2 U1–U4 o con la cola de respuestas alternativas, evitando duplicar las pruebas automáticas ya existentes. Mantener intactos IndexedDB y el backup JSON v3.

## Método y límites

Lectura directa de `curriculum-a1.js` en `main`, con inventario de ejercicios por unidad. Esta revisión es editorial interna, no una ejecución del currículo en un hablante nativo. La prueba automática de 462 respuestas canónicas integrada anteriormente acredita aceptación por el evaluador, no equivalencia semántica de todas las variantes posibles.
