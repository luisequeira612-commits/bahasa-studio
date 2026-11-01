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
  ['a2_u25', 0, ['condimentos', 'especias', 'hervir']],
  ['a2_u26', 1, ['alivio', 'ofensa', 'confianza']],
  ['a2_u26', 2, ['soledad', 'gratitud', 'aprecio']],
  ['a2_u27', 1, ['ayuntamiento', 'instalaciones públicas', 'parques urbanos']],
  ['a2_u28', 1, ['investigaciones', 'dispositivos', 'aplicaciones']],
  ['a2_u28', 2, ['pantallas táctiles', 'baterías', 'carga']],
  ['a2_u28', 3, ['automatización', 'datos personales', 'privacidad']]
];
test('A2 U25-U28 lesson titles and objectives match their vocabulary groups', () => {
  for (const [unitId, lessonIndex, expectedTerms] of cases) {
    const unit = units.find(item => item.id === unitId);
    assert.ok(unit, 'missing ' + unitId);
    const lesson = unit.lessons[lessonIndex];
    const content = [lesson.title, lesson.objective, lesson.grammar].join(' ').toLocaleLowerCase('es');
    for (const term of expectedTerms) assert.ok(content.includes(term), lesson.title + ' should mention ' + term);
    for (const id of lesson.vocabIds) assert.ok(lesson.exercises.some(exercise => exercise.vocabId === id), lesson.title + ' must assess ' + id);
  }
});
