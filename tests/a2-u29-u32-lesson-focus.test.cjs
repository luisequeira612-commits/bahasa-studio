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
  ['a2_u29', 0, ['clientes', 'quejas', 'devoluciones']],
  ['a2_u29', 1, ['garantías', 'calidad', 'modelos']],
  ['a2_u29', 2, ['existencias', 'pedidos', 'envíos']],
  ['a2_u29', 3, ['envases', 'sustituciones', 'atención al cliente']],
  ['a2_u30', 0, ['pinturas', 'artistas', 'puestas en escena']],
  ['a2_u31', 1, ['laderas', 'campamentos', 'tiendas de campaña']],
  ['a2_u32', 1, ['inauguraciones', 'conmemoraciones', 'recuerdos']],
  ['a2_u32', 2, ['regalos', 'felicitaciones', 'asistencia']]
];
test('A2 U29-U32 lesson titles and objectives match their vocabulary groups', () => {
  for (const [unitId, lessonIndex, expectedTerms] of cases) {
    const unit = units.find(item => item.id === unitId);
    assert.ok(unit, 'missing ' + unitId);
    const lesson = unit.lessons[lessonIndex];
    const content = [lesson.title, lesson.objective, lesson.grammar].join(' ').toLocaleLowerCase('es');
    for (const term of expectedTerms) assert.ok(content.includes(term), lesson.title + ' should mention ' + term);
    for (const id of lesson.vocabIds) assert.ok(lesson.exercises.some(exercise => exercise.vocabId === id), lesson.title + ' must assess ' + id);
  }
});
