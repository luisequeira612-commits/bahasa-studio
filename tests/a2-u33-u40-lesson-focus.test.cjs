'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'curriculum-a2.js'), 'utf8'), context);
const units = context.window.BAHASA_CURRICULUM_A2.units;
const cases = [
  ['a2_u33', 0, ['provincias', 'distritos', 'fronteras']],
  ['a2_u33', 1, ['habitantes', 'regiones', 'zonas costeras']],
  ['a2_u33', 2, ['zonas interiores', 'llanuras', 'cordilleras']],
  ['a2_u33', 3, ['islas', 'estrechos', 'bahías']],
  ['a2_u34', 1, ['agradecimiento', 'costumbres', 'comportamientos']],
  ['a2_u34', 2, ['formales', 'informales', 'respeto']],
  ['a2_u34', 3, ['turnos de palabra', 'interrupciones', 'contacto visual']],
  ['a2_u35', 0, ['presupuestos', 'ingresos', 'gastos']],
  ['a2_u35', 1, ['ahorrar', 'invertir', 'cuotas']],
  ['a2_u35', 2, ['prioridades', 'necesidades', 'deseos']],
  ['a2_u35', 3, ['gastos imprevistos', 'fondos de emergencia', 'gastos innecesarios']],
  ['a2_u36', 0, ['consideraciones', 'riesgos', 'ventajas']],
  ['a2_u36', 1, ['pérdidas', 'consecuencias', 'alternativas']],
  ['a2_u36', 2, ['compromisos', 'acuerdos', 'planes alternativos']],
  ['a2_u36', 3, ['considerar opciones', 'evaluar resultados', 'siguientes pasos']],
  ['a2_u37', 2, ['refugios temporales', 'suministros de alimentos', 'primeros auxilios']],
  ['a2_u37', 3, ['rutas de evacuación', 'voluntarios de desastres', 'centros de ayuda']],
  ['a2_u38', 0, ['destinos turísticos', 'visitantes', 'guías turísticos']],
  ['a2_u38', 1, ['alojamientos', 'reservas', 'mapas turísticos']],
  ['a2_u38', 2, ['tarifas de entrada', 'horarios de visita', 'entradas']],
  ['a2_u38', 3, ['atracciones turísticas', 'recuerdos', 'horarios de visita']],
  ['a2_u39', 0, ['reuniones en línea', 'videoconferencias', 'compartir pantalla']],
  ['a2_u39', 1, ['documentos', 'enlaces', 'archivos adjuntos']],
  ['a2_u39', 2, ['descargar', 'subir', 'nube']],
  ['a2_u39', 3, ['notificaciones', 'actualizaciones', 'permisos de acceso']],
  ['a2_u40', 0, ['ideas principales', 'resumen', 'aclaraciones']],
  ['a2_u40', 1, ['énfasis', 'responde', 'objeciones']],
  ['a2_u40', 2, ['ejemplos adicionales', 'explicación', 'detalles']],
  ['a2_u40', 3, ['información', 'declaraciones', 'debate']]
];
test('A2 U33-U40 lesson titles and objectives match their vocabulary groups', () => {
  for (const [unitId, lessonIndex, expectedTerms] of cases) {
    const unit = units.find(item => item.id === unitId);
    assert.ok(unit, 'missing ' + unitId);
    const lesson = unit.lessons[lessonIndex];
    const content = [lesson.title, lesson.objective, lesson.grammar].join(' ').toLocaleLowerCase('es');
    for (const term of expectedTerms) assert.ok(content.includes(term), lesson.title + ' should mention ' + term);
    for (const id of lesson.vocabIds) assert.ok(lesson.exercises.some(exercise => exercise.vocabId === id), lesson.title + ' must assess ' + id);
  }
});
