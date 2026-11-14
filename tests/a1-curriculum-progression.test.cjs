'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, '..', 'curriculum-a1.js'), 'utf8'),
  context
);
const a1 = context.window.BAHASA_CURRICULUM_A1;

test('A1 keeps its complete 32-unit sequence and does not assess vocabulary before its first unit', () => {
  assert.ok(a1, 'A1 curriculum must load from its extracted data file');
  assert.equal(a1.units.length, 32);
  assert.deepEqual(
    Array.from(a1.units, unit => unit.id),
    Array.from({ length: 32 }, (_, index) => 'a1_u' + (index + 1))
  );

  const firstIntroduction = new Map();
  const assessedIds = new Set();

  a1.units.forEach((unit, unitIndex) => {
    assert.ok(Array.isArray(unit.vocab), unit.id + ' must contain vocabulary');
    assert.ok(Array.isArray(unit.exercises), unit.id + ' must contain unit exercises');

    for (const word of unit.vocab) {
      assert.ok(word && typeof word.id === 'string' && word.id.trim(),
        unit.id + ' contains a vocabulary entry without an ID');
      if (!firstIntroduction.has(word.id)) firstIntroduction.set(word.id, unitIndex);
    }

    for (const exercise of unit.exercises) {
      const references = [
        ...(typeof exercise.vocabId === 'string' ? [exercise.vocabId] : []),
        ...(Array.isArray(exercise.vocabIds) ? exercise.vocabIds : [])
      ];
      for (const id of references) {
        assert.ok(firstIntroduction.has(id),
          unit.id + ' assesses unknown or not-yet-introduced vocabulary: ' + id);
        assert.ok(firstIntroduction.get(id) <= unitIndex,
          unit.id + ' assesses future vocabulary: ' + id);
        assessedIds.add(id);
      }
    }
  });

  for (const unit of a1.units) {
    for (const word of unit.vocab) {
      assert.ok(assessedIds.has(word.id),
        unit.id + ' vocabulary has no explicit exercise link: ' + word.id);
    }
  }
});



test('A1 U1-U4 contain five authored lessons with sequenced introductions and spaced retrieval', () => {
  for (const unit of a1.units.slice(0, 4)) {
    assert.equal(unit.lessons.length, 5, unit.id + ' must contain five authored lessons');
    const unitIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();

    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lesson ' + (lessonIndex + 1) + ' needs a title, objective and focus');
      assert.ok(Array.isArray(lesson.exercises) && lesson.exercises.length >= 3,
        unit.id + ' lesson ' + (lessonIndex + 1) + ' needs its own exercises');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitIds.has(id), unit.id + ' introduces vocabulary outside its unit: ' + id);
        assert.ok(!introducedAt.has(id), unit.id + ' introduces a word more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every vocabulary entry exactly once');
    const lessonExercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    for (const exercise of unit.exercises) {
      const signature = JSON.stringify(exercise);
      assert.equal(lessonExercises.filter(candidate => JSON.stringify(candidate) === signature).length, 1,
        unit.id + ' must preserve every original unit exercise exactly once in its authored lessons');
    }
    assert.ok(lessonExercises.every(exercise => exercise.generated !== true),
      unit.id + ' authored lessons must not count generated runtime exercises');

    const retrieval = unit.lessons[4];
    assert.match(retrieval.title, /Recuperación espaciada/);
    assert.deepEqual(Array.from(retrieval.vocabIds || []), []);
    assert.deepEqual([...new Set(retrieval.reviewVocabIds || [])].sort(), [...unitIds].sort());
    assert.equal(retrieval.exercises.length, unit.vocab.length);
    assert.deepEqual([...new Set(retrieval.exercises.map(exercise => exercise.vocabId))].sort(), [...unitIds].sort());
    assert.equal(new Set(retrieval.exercises.map(exercise => exercise.type)).size, 5);

    unit.lessons.forEach((lesson, lessonIndex) => {
      const available = new Set([...(lesson.vocabIds || []), ...(lesson.reviewVocabIds || [])]);
      for (const exercise of lesson.exercises) {
        assert.ok(unitIds.has(exercise.vocabId),
          unit.id + ' exercise must reference vocabulary from its unit');
        assert.ok(available.has(exercise.vocabId),
          unit.id + ' exercise assesses a word before introduction or review: ' + exercise.vocabId);
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercise needs a prompt and feedback');
      }
    });
    assert.deepEqual(
      [...new Set(unit.lessons.flatMap(lesson => (lesson.exercises || []).map(exercise => exercise.type)))].sort(),
      ['listen', 'mc', 'order', 'translate_es_id', 'write'],
      unit.id + ' must retain all five core exercise types'
    );
  }
});

test('A1 U5-U8 contain five authored lessons with sequenced introductions and spaced retrieval', () => {
  for (const unit of a1.units.slice(4, 8)) {
    assert.equal(unit.lessons.length, 5, unit.id + ' must contain five authored lessons');
    const unitIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();

    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lesson ' + (lessonIndex + 1) + ' needs a title, objective and focus');
      assert.ok(Array.isArray(lesson.exercises) && lesson.exercises.length >= 3,
        unit.id + ' lesson ' + (lessonIndex + 1) + ' needs its own exercises');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitIds.has(id), unit.id + ' introduces vocabulary outside its unit: ' + id);
        assert.ok(!introducedAt.has(id), unit.id + ' introduces a word more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every vocabulary entry exactly once');
    const lessonExercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    const originalCounts = new Map();
    const lessonCounts = new Map();
    for (const exercise of unit.exercises) {
      const signature = JSON.stringify(exercise);
      originalCounts.set(signature, (originalCounts.get(signature) || 0) + 1);
    }
    for (const exercise of lessonExercises) {
      const signature = JSON.stringify(exercise);
      lessonCounts.set(signature, (lessonCounts.get(signature) || 0) + 1);
    }
    for (const [signature, count] of originalCounts) {
      assert.equal(lessonCounts.get(signature) || 0, count,
        unit.id + ' must preserve every original unit exercise with its exact multiplicity');
    }
    assert.ok(lessonExercises.every(exercise => exercise.generated !== true),
      unit.id + ' authored lessons must not count generated runtime exercises');

    const retrieval = unit.lessons[4];
    assert.match(retrieval.title, /Recuperación espaciada/);
    assert.deepEqual(Array.from(retrieval.vocabIds || []), []);
    assert.deepEqual([...new Set(retrieval.reviewVocabIds || [])].sort(), [...unitIds].sort());
    assert.equal(retrieval.exercises.length, unit.vocab.length);
    assert.deepEqual([...new Set(retrieval.exercises.map(exercise => exercise.vocabId))].sort(), [...unitIds].sort());
    assert.equal(new Set(retrieval.exercises.map(exercise => exercise.type)).size, 5);

    unit.lessons.forEach((lesson, lessonIndex) => {
      const available = new Set([...(lesson.vocabIds || []), ...(lesson.reviewVocabIds || [])]);
      for (const exercise of lesson.exercises) {
        assert.ok(unitIds.has(exercise.vocabId),
          unit.id + ' exercise must reference vocabulary from its unit');
        assert.ok(available.has(exercise.vocabId),
          unit.id + ' exercise assesses a word before introduction or review: ' + exercise.vocabId);
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercise needs a prompt and feedback');
      }
    });
    assert.deepEqual(
      [...new Set(unit.lessons.flatMap(lesson => (lesson.exercises || []).map(exercise => exercise.type)))].sort(),
      ['listen', 'mc', 'order', 'translate_es_id', 'write'],
      unit.id + ' must retain all five core exercise types'
    );
  }
});

test('A1 progression guard is registered exactly once in the regression workflow', () => {
  const workflow = fs.readFileSync(path.join(__dirname, '..', '.github', 'workflows', 'regression.yml'), 'utf8');
  const registrations = workflow.match(/node --test tests\/a1-curriculum-progression\.test\.cjs/g) || [];
  assert.equal(registrations.length, 1);
});

test('A1 U9-U12 contain five or six authored lessons with cumulative practice and spaced retrieval', () => {
  for (const unit of a1.units.slice(8, 12)) {
    const expected = unit.id === 'a1_u9' ? 6 : 5;
    assert.equal(unit.lessons.length, expected, unit.id + ' must contain five or six authored lessons');
    const unitIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();
    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar, unit.id + ' lesson needs an objective and focused explanation');
      assert.ok(Array.isArray(lesson.exercises) && lesson.exercises.length >= 3, unit.id + ' lesson needs its own practice');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitIds.has(id), unit.id + ' introduces vocabulary outside its unit: ' + id);
        assert.ok(!introducedAt.has(id), unit.id + ' introduces a word more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });
    assert.equal(introducedAt.size, unit.vocab.length, unit.id + ' must introduce every word exactly once');
    const lessonExercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    const originalCounts = new Map(), lessonCounts = new Map();
    for (const exercise of unit.exercises) { const signature = JSON.stringify(exercise); originalCounts.set(signature, (originalCounts.get(signature) || 0) + 1); }
    for (const exercise of lessonExercises) { const signature = JSON.stringify(exercise); lessonCounts.set(signature, (lessonCounts.get(signature) || 0) + 1); }
    for (const [signature, count] of originalCounts) assert.equal(lessonCounts.get(signature) || 0, count, unit.id + ' must preserve each original exercise exactly once');
    assert.ok(lessonExercises.every(exercise => exercise.generated !== true));
    const retrieval = unit.lessons[expected - 1];
    assert.match(retrieval.title, /Recuperación espaciada/);
    assert.deepEqual(Array.from(retrieval.vocabIds || []), []);
    assert.deepEqual([...new Set(retrieval.reviewVocabIds || [])].sort(), [...unitIds].sort());
    assert.equal(retrieval.exercises.length, unit.vocab.length);
    assert.deepEqual([...new Set(retrieval.exercises.map(exercise => exercise.vocabId))].sort(), [...unitIds].sort());
    assert.equal(new Set(retrieval.exercises.map(exercise => exercise.type)).size, 5);
    let prior = [];
    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.deepEqual(Array.from(lesson.reviewVocabIds || []), prior, unit.id + ' lesson ' + (lessonIndex + 1) + ' must review every earlier word');
      const available = new Set([...(lesson.vocabIds || []), ...(lesson.reviewVocabIds || [])]);
      for (const exercise of lesson.exercises) {
        assert.ok(unitIds.has(exercise.vocabId), unit.id + ' exercise references unknown vocabulary');
        assert.ok(available.has(exercise.vocabId), unit.id + ' exercise assesses vocabulary before introduction');
        assert.ok(exercise.prompt && exercise.explanation, unit.id + ' exercise needs prompt and feedback');
      }
      prior = [...prior, ...(lesson.vocabIds || [])];
    });
    assert.deepEqual([...new Set(lessonExercises.map(exercise => exercise.type))].sort(), ['listen', 'mc', 'order', 'translate_es_id', 'write']);
  }
});

test('A1 U13-U16 contain five authored lessons with cumulative practice and spaced retrieval', () => {
 for(const unit of a1.units.slice(12,16)){
  assert.equal(unit.lessons.length,5,unit.id);
  const ids=new Set(unit.vocab.map(w=>w.id)),introduced=new Set(),all=unit.lessons.flatMap(l=>l.exercises||[]);
  for(const lesson of unit.lessons){assert.ok(lesson.title&&lesson.objective&&lesson.grammar);assert.ok(lesson.exercises.length>=3);for(const id of lesson.vocabIds||[]){assert.ok(ids.has(id));assert.ok(!introduced.has(id));introduced.add(id);}}
  assert.equal(introduced.size,unit.vocab.length);
  const original=new Map(),placed=new Map();for(const ex of unit.exercises){const k=JSON.stringify(ex);original.set(k,(original.get(k)||0)+1);}for(const ex of all){const k=JSON.stringify(ex);placed.set(k,(placed.get(k)||0)+1);}for(const [k,n] of original)assert.equal(placed.get(k)||0,n);
  const last=unit.lessons[4];assert.match(last.title,/Recuperación espaciada/);assert.deepEqual(Array.from(last.vocabIds||[]),[]);assert.deepEqual([...new Set(last.reviewVocabIds)].sort(),[...ids].sort());assert.equal(last.exercises.length,unit.vocab.length);assert.equal(new Set(last.exercises.map(e=>e.vocabId)).size,unit.vocab.length);assert.equal(new Set(last.exercises.map(e=>e.type)).size,5);
  let prior=[];for(const lesson of unit.lessons){assert.deepEqual(Array.from(lesson.reviewVocabIds||[]),prior);const available=new Set([...prior,...(lesson.vocabIds||[])]);for(const ex of lesson.exercises){assert.ok(available.has(ex.vocabId));assert.ok(ex.prompt&&ex.explanation);}for(const id of lesson.reviewVocabIds||[]) assert.ok(lesson.exercises.some(ex=>ex.vocabId===id), unit.id + ' must actively retrieve ' + id + ' in each later lesson);prior=[...prior,...(lesson.vocabIds||[])];}
  assert.deepEqual([...new Set(all.map(e=>e.type))].sort(),['listen','mc','order','translate_es_id','write']);
 }
});


test('A1 U17-U20 contain five authored lessons with cumulative practice and spaced retrieval', () => {
 for (const unit of a1.units.slice(16,20)) {
  assert.equal(unit.lessons.length,5,unit.id); const ids=new Set(unit.vocab.map(w=>w.id)),introduced=new Set(),all=unit.lessons.flatMap(l=>l.exercises||[]);
  for(const lesson of unit.lessons){assert.ok(lesson.title&&lesson.objective&&lesson.grammar);assert.ok(lesson.exercises.length>=3);for(const id of lesson.vocabIds||[]){assert.ok(ids.has(id));assert.ok(!introduced.has(id));introduced.add(id);}}
  assert.equal(introduced.size,unit.vocab.length); const original=new Map(),placed=new Map();for(const ex of unit.exercises){const k=JSON.stringify(ex);original.set(k,(original.get(k)||0)+1);}for(const ex of all){const k=JSON.stringify(ex);placed.set(k,(placed.get(k)||0)+1);}for(const [k,n] of original)assert.equal(placed.get(k)||0,n,unit.id+' original exercise multiplicity');
  const last=unit.lessons[4];assert.match(last.title,/Recuperación espaciada/);assert.deepEqual(Array.from(last.vocabIds||[]),[]);assert.deepEqual([...new Set(last.reviewVocabIds)].sort(),[...ids].sort());assert.equal(last.exercises.length,unit.vocab.length);assert.equal(new Set(last.exercises.map(e=>e.vocabId)).size,unit.vocab.length);assert.equal(new Set(last.exercises.map(e=>e.type)).size,5);
  let prior=[];for(const lesson of unit.lessons){assert.deepEqual(Array.from(lesson.reviewVocabIds||[]),prior);const available=new Set([...prior,...(lesson.vocabIds||[])]);for(const ex of lesson.exercises){assert.ok(available.has(ex.vocabId));assert.ok(ex.prompt&&ex.explanation);}prior=[...prior,...(lesson.vocabIds||[])];}
  assert.deepEqual([...new Set(all.map(e=>e.type))].sort(),['listen','mc','order','translate_es_id','write']);
 }
});


test('A1 U17-U20 actively exercise all previously introduced vocabulary in each later lesson',()=>{
 for(const unit of a1.units.slice(16,20)){
  for(const lesson of unit.lessons.slice(1)){
   const assessed=new Set(lesson.exercises.map(ex=>ex.vocabId));
   for(const id of lesson.reviewVocabIds||[])assert.ok(assessed.has(id),unit.id+' must retrieve prior vocabulary '+id);
  }
 }
});
