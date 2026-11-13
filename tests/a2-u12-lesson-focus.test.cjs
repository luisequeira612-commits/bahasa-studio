'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'curriculum-a2.js'), 'utf8'), context);
const unit = context.window.BAHASA_CURRICULUM_A2.units.find(item => item.id === 'a2_u12');

test('A2 U12 has five lessons and its retrieval lesson reviews all vocabulary after the four teaching groups', () => {
  assert.ok(unit);
  assert.deepEqual(Array.from(unit.lessons, lesson => lesson.title), [
    'Lección 1: Experiencia, capacidades y oportunidades',
    'Lección 2: Metas, aspiraciones y resultados',
    'Lección 3: Fracaso, decisiones y continuidad',
    'Lección 4: Mejorar y desarrollar habilidades',
    'Lección 5: Recuperación espaciada de metas y capacidades'
  ]);
  const expected = [
    ['experiencia', 'capacidades', 'oportunidades', 'pengalaman', 'kemampuan', 'kesempatan'],
    ['meta', 'aspiracion', 'resultado', 'tujuan', 'cita-cita', 'berhasil'],
    ['fracaso', 'decision', 'continuacion', 'gagal', 'memutuskan', 'melanjutkan'],
    ['mejorar', 'desarrollar', 'destrezas', 'meningkatkan', 'mengembangkan', 'keterampilan']
  ];
  unit.lessons.slice(0, 4).forEach((lesson, index) => {
    const content = [lesson.title, lesson.objective, lesson.grammar].join(' ').toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const term of expected[index]) assert.ok(content.includes(term), lesson.title + ' should mention ' + term);
    const exerciseIds = new Set(lesson.exercises.map(exercise => exercise.vocabId));
    for (const id of lesson.vocabIds) assert.ok(exerciseIds.has(id), lesson.title + ' must assess ' + id);
  });
  const retrieval = unit.lessons[4];
  assert.deepEqual([...(retrieval.vocabIds || [])], []);
  assert.deepEqual([...new Set(retrieval.reviewVocabIds || [])].sort(), unit.vocab.map(word => word.id).sort());
  assert.equal(retrieval.exercises.length, 5);
  for (const exercise of retrieval.exercises) assert.ok(retrieval.reviewVocabIds.includes(exercise.vocabId));
  });
});
