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


test('A2 U25-U28 lesson explanations name every new vocabulary item', () => {
  for (const unit of units.slice(24, 28)) {
    const vocabulary = new Map(unit.vocab.map(word => [word.id, word]));
    for (const lesson of unit.lessons) {
      const explanation = [lesson.objective, lesson.grammar].filter(Boolean).join(' ').toLocaleLowerCase();
      for (const id of lesson.vocabIds || []) {
        const word = vocabulary.get(id);
        assert.ok(word, unit.id + ' ' + lesson.title + ' must introduce known vocabulary: ' + id);
        assert.ok(explanation.includes(word.idn.toLocaleLowerCase()),
          unit.id + ' ' + lesson.title + ' should explain newly introduced vocabulary: ' + word.idn);
      }
    }
  }
});

test('A2 U25-U28 examples and exercises do not use vocabulary from a later lesson', () => {
  const normalize = value => String(value || '').toLocaleLowerCase().normalize('NFD')
    .replace(/\p{M}/gu, '').replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/\s+/g, ' ').trim();
  for (const unit of units.slice(24, 28)) {
    for (let lessonIndex = 0; lessonIndex < unit.lessons.length; lessonIndex++) {
      const lesson = unit.lessons[lessonIndex];
      const futureTerms = unit.lessons.slice(lessonIndex + 1).flatMap(futureLesson =>
        (futureLesson.vocabIds || []).map(id => unit.vocab.find(word => word.id === id)?.idn)
      ).map(normalize).filter(term => term.length >= 4);
      const currentWords = (lesson.vocabIds || []).map(id => unit.vocab.find(word => word.id === id));
      for (const word of currentWords) {
        const example = normalize([word?.ex, word?.exEsp].join(' '));
        for (const term of futureTerms) assert.ok(!(' ' + example + ' ').includes(' ' + term + ' '),
          unit.id + ' ' + lesson.title + ' vocabulary example must not use future term: ' + term);
      }
      for (const exercise of lesson.exercises || []) {
        const exerciseText = normalize([
          exercise.prompt, exercise.answer, exercise.modelAnswer, exercise.explanation,
          exercise.hint, exercise.audioText, ...(exercise.options || []),
          ...(exercise.words || []), ...(exercise.correctOrder || [])
        ].filter(Boolean).join(' '));
        for (const term of futureTerms) assert.ok(!(' ' + exerciseText + ' ').includes(' ' + term + ' '),
          unit.id + ' ' + lesson.title + ' must not require future vocabulary: ' + term);
      }
    }
  }
});
