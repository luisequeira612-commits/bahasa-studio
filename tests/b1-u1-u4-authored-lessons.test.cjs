'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const a1Source = fs.readFileSync(path.join(root, 'curriculum-a1.js'), 'utf8');
const a2Source = fs.readFileSync(path.join(root, 'curriculum-a2.js'), 'utf8');
const a1Literal = a1Source.slice(a1Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
const a2Literal = a2Source.slice(a2Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
const start = html.indexOf('const CourseData =');
const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
assert.ok(start >= 0 && end > start, 'CourseData block must exist');
const courseSource = html.slice(start, end)
  .replace('window.BAHASA_CURRICULUM_A1', a1Literal)
  .replace('window.BAHASA_CURRICULUM_A2', a2Literal);
const course = vm.runInNewContext(courseSource + '\nCourseData');
const b1 = course.levels.find(level => level.id === 'B1');
const EXPECTED = new Map([
  ['b1_u1', { ids: ['v8', 'b1v001', 'b1v002', 'b1v003'], direct: 7, combined: 21, lessonCounts: [4, 2, 2, 2, 4] }],
  ['b1_u2', { ids: ['v211', 'v212', 'v213', 'v214', 'b1v004'], direct: 5, combined: 21, lessonCounts: [5, 2, 2, 2, 5] }],
  ['b1_u3', { ids: ['b1v005', 'b1v006', 'b1v007', 'b1v008', 'b1v009'], direct: 5, combined: 22, lessonCounts: [5, 2, 2, 2, 6] }],
  ['b1_u4', { ids: ['b1u4_memberikan', 'b1u4_mengirimkan', 'b1u4_menjelaskan', 'b1u4_membersihkan'], direct: 6, combined: 20, lessonCounts: [4, 2, 2, 2, 4] }]
]);
const PRIOR_CHECKPOINT_IDS = [
  'v8', 'b1v001', 'b1v002', 'b1v003',
  'v211', 'v212', 'v213', 'v214', 'b1v004',
  'b1v005', 'b1v006', 'b1v007', 'b1v008', 'b1v009'
];

test('B1 U1-U4 contain five authored lessons without adding vocabulary IDs or changing direct exercise banks', () => {
  assert.ok(b1, 'B1 curriculum must load');
  for (const [unitId, expected] of EXPECTED) {
    const unit = b1.units.find(item => item.id === unitId);
    assert.ok(unit, unitId + ' must exist');
    assert.equal(unit.lessons.length, 5, unitId + ' must have five authored lessons');
    assert.deepEqual(Array.from(unit.vocab, word => word.id), expected.ids,
      unitId + ' must preserve its canonical vocabulary IDs and order');
    assert.equal(unit.exercises.length, expected.direct,
      unitId + ' must preserve its direct exercise bank');
    assert.deepEqual(Array.from(unit.lessons, lesson => lesson.exercises.length), expected.lessonCounts,
      unitId + ' must preserve the planned practice distribution');

    const unitIds = new Set(expected.ids);
    assert.deepEqual(Array.from(unit.lessons[0].vocabIds), expected.ids,
      unitId + ' introduces each local vocabulary entry in the first lesson');
    assert.equal(new Set(unit.lessons[0].vocabIds).size, expected.ids.length);
    for (const lesson of unit.lessons.slice(1, 4)) {
      assert.deepEqual(Array.from(lesson.vocabIds || []), [],
        unitId + ' later lessons must practise rather than reintroduce vocabulary');
      assert.deepEqual(Array.from(lesson.reviewVocabIds || []), expected.ids,
        unitId + ' application lessons must review the full local vocabulary');
    }
    const retrieval = unit.lessons[4];
    assert.deepEqual(Array.from(retrieval.vocabIds || []), []);
    for (const id of expected.ids) {
      assert.ok(retrieval.reviewVocabIds.includes(id), unitId + ' retrieval misses ' + id);
    }

    const allExercises = [
      ...unit.exercises,
      ...unit.lessons.flatMap(lesson => lesson.exercises || [])
    ];
    assert.equal(allExercises.length, expected.combined, unitId + ' combined exercise baseline');
    const types = new Set(allExercises.map(exercise => exercise.type));
    for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) {
      assert.ok(types.has(type), unitId + ' must retain exercise type ' + type);
    }
    for (const lesson of unit.lessons) {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unitId + ' lessons need a distinct title, objective and grammar focus');
      assert.ok(lesson.exercises.length >= 2, unitId + ' lessons need their own practice');
      for (const exercise of lesson.exercises) {
        assert.ok(unitIds.has(exercise.vocabId), unitId + ' lesson exercise references non-local vocabulary');
        assert.ok(exercise.prompt && exercise.explanation, unitId + ' lesson exercises need feedback');
        assert.notEqual(exercise.generated, true, unitId + ' lessons must be authored, not runtime fillers');
      }
    }
  }
});

test('B1 U4 closes the first cumulative checkpoint with prior and current vocabulary', () => {
  const u4 = b1.units.find(unit => unit.id === 'b1_u4');
  const checkpoint = u4.lessons[4];
  assert.match(checkpoint.title, /Repaso acumulativo de B1 U1–U4/);
  for (const id of [...PRIOR_CHECKPOINT_IDS, ...EXPECTED.get('b1_u4').ids]) {
    assert.ok(checkpoint.reviewVocabIds.includes(id), 'B1 U4 cumulative checkpoint missing ' + id);
  }
});
