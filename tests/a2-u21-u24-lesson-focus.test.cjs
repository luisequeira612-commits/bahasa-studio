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
  ['a2_u21', 3, ['espectáculos', 'patrimonio cultural', 'festivales']],
  ['a2_u22', 2, ['redes', 'conexiones', 'contraseñas']],
  ['a2_u22', 3, ['cuentas', 'información', 'fuentes']],
  ['a2_u23', 1, ['transferencias', 'tarjetas de débito', 'préstamos']],
  ['a2_u24', 2, ['certificados', 'becas', 'inscripciones']],
  ['a2_u24', 3, ['instructores', 'participantes', 'graduación']]
];
test('A2 U21-U24 lesson titles, objectives and grammar match their vocabulary groups', () => {
  for (const [unitId, lessonIndex, expectedTerms] of cases) {
    const unit = units.find(item => item.id === unitId);
    assert.ok(unit, 'missing ' + unitId);
    const lesson = unit.lessons[lessonIndex];
    const content = [lesson.title, lesson.objective, lesson.grammar].join(' ').toLocaleLowerCase('es');
    for (const term of expectedTerms) assert.ok(content.includes(term), lesson.title + ' should mention ' + term);
    for (const id of lesson.vocabIds) assert.ok(lesson.exercises.some(exercise => exercise.vocabId === id), lesson.title + ' must assess ' + id);
  }
});
