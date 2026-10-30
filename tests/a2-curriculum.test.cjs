'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const curriculumSandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'curriculum-a1.js'), 'utf8'), curriculumSandbox);
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'curriculum-a2.js'), 'utf8'), curriculumSandbox);
const htmlSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const courseDataStart = htmlSource.indexOf('const CourseData =');
const html = htmlSource.slice(0, courseDataStart) + htmlSource.slice(courseDataStart)
  .replace('window.BAHASA_CURRICULUM_A1', JSON.stringify(curriculumSandbox.window.BAHASA_CURRICULUM_A1))
  .replace('window.BAHASA_CURRICULUM_A2', JSON.stringify(curriculumSandbox.window.BAHASA_CURRICULUM_A2));

function extractObjectLiteral(source, marker) {
  const markerIndex = source.indexOf(marker);
  assert.ok(markerIndex >= 0, 'CourseData declaration must exist');
  const start = source.indexOf('{', markerIndex);
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = start; index < source.length; index++) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"' || char.charCodeAt(0) === 96) quote = char;
    else if (char === '{') depth++;
    else if (char === '}') {
      depth--;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  assert.fail('CourseData object must have balanced braces');
}

const courseData = vm.runInNewContext('(' + extractObjectLiteral(html, 'const CourseData =') + ')');
const a2 = courseData.levels.find(level => level.id === 'A2');

test('A2 expands to forty sequential units without changing the 32-unit A1 course', () => {
  const a1 = courseData.levels.find(level => level.id === 'A1');
  assert.ok(a1);
  assert.equal(a1.units.length, 32);
  assert.ok(a2);
  assert.equal(a2.units.length, 40);
  assert.deepEqual(Array.from(a2.units.slice(3), unit => unit.id),
    ['a2_u4', 'a2_u5', 'a2_u6', 'a2_u7', 'a2_u8', 'a2_u9', 'a2_u10', 'a2_u11', 'a2_u12', 'a2_u13', 'a2_u14', 'a2_u15', 'a2_u16', 'a2_u17', 'a2_u18', 'a2_u19', 'a2_u20', 'a2_u21', 'a2_u22', 'a2_u23', 'a2_u24', 'a2_u25', 'a2_u26', 'a2_u27', 'a2_u28', 'a2_u29', 'a2_u30', 'a2_u31', 'a2_u32', 'a2_u33', 'a2_u34', 'a2_u35', 'a2_u36', 'a2_u37', 'a2_u38', 'a2_u39', 'a2_u40']);
});

test('the first four A2 units have 3-5 lessons, varied practice, listening, and production', () => {
  const allVocabIds = new Set(courseData.levels.flatMap(level => level.units.flatMap(unit => unit.vocab || [])).map(word => word.id));
  const a1Forms = new Set(courseData.levels.find(level => level.id === 'A1').units.flatMap(unit => unit.vocab).map(word => word.idn.trim().toLowerCase()));
  for (const unit of a2.units.slice(0, 4)) {
    assert.ok(unit.vocab.length >= 4, unit.id + ' should introduce vocabulary');
    assert.ok(Array.isArray(unit.lessons) && unit.lessons.length >= 3 && unit.lessons.length <= 5,
      unit.id + ' should contain 3-5 authored lessons');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.ok(exercises.length >= 14 && exercises.length <= 22,
      unit.id + ' should include 14-22 exercises across its lessons');
    assert.ok(new Set(exercises.map(exercise => exercise.type)).size >= 4,
      unit.id + ' should use at least four exercise types');
    assert.ok(exercises.some(exercise => exercise.type === 'listen'),
      unit.id + ' should include listening practice');
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer),
      unit.id + ' should include guided original writing');
    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    for (const lesson of unit.lessons) {
      assert.ok(lesson.vocabIds.length > 0, lesson.title + ' should introduce new vocabulary');
      for (const id of lesson.vocabIds) assert.ok(unitVocabIds.has(id), unit.id + ' lesson references unknown new vocabulary');
      for (const id of lesson.reviewVocabIds || []) assert.ok(allVocabIds.has(id), unit.id + ' lesson references unknown review vocabulary');
      for (const exercise of lesson.exercises || []) {
        if (exercise.vocabId) assert.ok(allVocabIds.has(exercise.vocabId),
          unit.id + ' exercise should reference canonical vocabulary taught in the course');
      }
    }
    for (const word of unit.vocab) {
      assert.ok(!a1Forms.has(word.idn.trim().toLowerCase()),
        unit.id + ' should not reintroduce A1 vocabulary as new content');
    }
  }
});


test('A2 units 5-8 teach ber- and meN- forms in structured multi-lesson units', () => {
  const a1Forms = new Set(courseData.levels.find(level => level.id === 'A1').units
    .flatMap(unit => unit.vocab).map(word => word.idn.trim().toLowerCase()));
  const units = a2.units.slice(4, 8);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u5', 'a2_u6', 'a2_u7', 'a2_u8']);
  assert.match(units[0].grammar, /ber-/);
  assert.match(units[1].grammar, /men-/);
  assert.match(units[2].grammar, /meng-/);
  assert.match(units[3].grammar, /mem-.*meny-/);
  for (const unit of units) {
    assert.ok(unit.vocab.length >= 10, unit.id + ' should provide at least ten assessment items');
    assert.ok(unit.lessons.length >= 3 && unit.lessons.length <= 5, unit.id + ' should have 3-5 lessons');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.ok(exercises.length >= 14 && exercises.length <= 22, unit.id + ' should have 14-22 exercises');
    assert.ok(new Set(exercises.map(exercise => exercise.type)).size >= 4, unit.id + ' should use four exercise types');
    assert.ok(exercises.some(exercise => exercise.type === 'listen'), unit.id + ' should include listening');
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer),
      unit.id + ' should include guided writing');
    assert.ok(exercises.filter(exercise => exercise.answer && /[.!?]$/.test(exercise.answer)).length >= 5,
      unit.id + ' should include at least five complete sentence answers');
    const introduced = unit.lessons.flatMap(lesson => lesson.vocabIds || []);
    assert.equal(introduced.length, unit.vocab.length, unit.id + ' should introduce every new vocabulary item once');
    assert.equal(new Set(introduced).size, introduced.length, unit.id + ' should not introduce a word twice');
    const knownIds = new Set(courseData.levels.flatMap(level => level.units.flatMap(entry => entry.vocab || [])).map(word => word.id));
    for (const lesson of unit.lessons) {
      for (const id of lesson.vocabIds) assert.ok(unit.vocab.some(word => word.id === id), unit.id + ' lesson has unknown new vocabulary');
      for (const exercise of lesson.exercises || []) {
        assert.ok(exercise.vocabId && knownIds.has(exercise.vocabId), unit.id + ' exercise must use canonical vocabulary');
      }
    }
    for (const word of unit.vocab) {
      assert.ok(!a1Forms.has(word.idn.trim().toLowerCase()), unit.id + ' must not repeat A1 vocabulary: ' + word.idn);
    }
  }
});


test('A2 units 9-12 teach opinions, rules, problems, and goals with complete lesson structure', () => {
  const earlierForms = new Set(courseData.levels.find(level => level.id === 'A1').units
    .flatMap(unit => unit.vocab).concat(a2.units.slice(0, 8).flatMap(unit => unit.vocab))
    .map(word => word.idn.trim().toLowerCase()));
  const units = a2.units.slice(8, 12);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u9', 'a2_u10', 'a2_u11', 'a2_u12']);
  assert.match(units[0].title, /opiniones/);
  assert.match(units[1].title, /Normas/);
  assert.match(units[2].title, /Problemas/);
  assert.match(units[3].title, /Experiencia/);
  for (const unit of units) {
    assert.equal(unit.vocab.length, 12, unit.id + ' should provide twelve assessment items');
    assert.equal(unit.lessons.length, 4, unit.id + ' should have four authored lessons');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.ok(exercises.length >= 14 && exercises.length <= 22, unit.id + ' should have 14-22 exercises');
    assert.ok(new Set(exercises.map(exercise => exercise.type)).size >= 4, unit.id + ' should use four exercise types');
    assert.ok(exercises.some(exercise => exercise.type === 'listen'), unit.id + ' should include listening');
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer),
      unit.id + ' should include guided writing');
    assert.ok(exercises.filter(exercise => exercise.answer && /[.!?]$/.test(exercise.answer)).length >= 5,
      unit.id + ' should include at least five complete sentence answers');
    const introduced = unit.lessons.flatMap(lesson => lesson.vocabIds || []);
    assert.equal(introduced.length, unit.vocab.length, unit.id + ' should introduce every new vocabulary item once');
    assert.equal(new Set(introduced).size, introduced.length, unit.id + ' should not introduce a word twice');
    for (const lesson of unit.lessons) {
      for (const id of lesson.vocabIds) assert.ok(unit.vocab.some(word => word.id === id), unit.id + ' lesson has unknown new vocabulary');
      for (const exercise of lesson.exercises || []) {
        assert.ok(exercise.vocabId && unit.vocab.some(word => word.id === exercise.vocabId),
          unit.id + ' exercise must reference vocabulary introduced in the unit');
      }
    }
    for (const word of unit.vocab) {
      assert.ok(!earlierForms.has(word.idn.trim().toLowerCase()),
        unit.id + ' must not repeat earlier vocabulary: ' + word.idn);
    }
    const order = exercises.find(exercise => exercise.type === 'order');
    const expectedOrder = unit.vocab[1].ex.replace(/[.!?]$/, '').split(' ');
    assert.deepEqual(Array.from(order.correctOrder), expectedOrder,
      unit.id + ' word-order answer should match the translated sentence');
    assert.deepEqual(Array.from(order.words).reverse(), Array.from(order.correctOrder),
      unit.id + ' word-order tokens should match the answer');
  }
});


test('A2 units 13-16 teach shopping, travel, invitations, and experiences with complete lesson structure', () => {
  const earlierForms = new Set(courseData.levels.find(level => level.id === 'A1').units
    .flatMap(unit => unit.vocab).concat(a2.units.slice(0, 12).flatMap(unit => unit.vocab))
    .map(word => word.idn.trim().toLowerCase()));
  const units = a2.units.slice(12, 16);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u13', 'a2_u14', 'a2_u15', 'a2_u16']);
  assert.match(units[0].title, /Compras/);
  assert.match(units[1].title, /Viajes/);
  assert.match(units[2].title, /Invitaciones/);
  assert.match(units[3].title, /experiencias/i);
  for (const unit of units) {
    assert.equal(unit.vocab.length, 12, unit.id + ' should provide twelve assessment items');
    assert.equal(unit.lessons.length, 4, unit.id + ' should have four authored lessons');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.equal(exercises.length, 17, unit.id + ' should have 17 exercises');
    assert.ok(new Set(exercises.map(exercise => exercise.type)).size >= 4, unit.id + ' should use four exercise types');
    assert.ok(exercises.some(exercise => exercise.type === 'listen'), unit.id + ' should include listening');
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer),
      unit.id + ' should include guided writing');
    assert.ok(exercises.filter(exercise => exercise.answer && /[.!?]$/.test(exercise.answer)).length >= 5,
      unit.id + ' should include at least five complete sentence answers');
    const introduced = unit.lessons.flatMap(lesson => lesson.vocabIds || []);
    assert.equal(introduced.length, unit.vocab.length, unit.id + ' should introduce every new vocabulary item once');
    assert.equal(new Set(introduced).size, introduced.length, unit.id + ' should not introduce a word twice');
    for (const lesson of unit.lessons) {
      for (const id of lesson.vocabIds) assert.ok(unit.vocab.some(word => word.id === id), unit.id + ' lesson has unknown new vocabulary');
      for (const exercise of lesson.exercises || []) {
        assert.ok(exercise.vocabId && unit.vocab.some(word => word.id === exercise.vocabId),
          unit.id + ' exercise must reference vocabulary introduced in the unit');
      }
    }
    for (const word of unit.vocab) {
      assert.ok(!earlierForms.has(word.idn.trim().toLowerCase()),
        unit.id + ' must not repeat earlier vocabulary: ' + word.idn);
    }
    const order = exercises.find(exercise => exercise.type === 'order');
    const expectedOrder = unit.vocab[1].ex.replace(/[.!?]$/, '').split(' ');
    assert.deepEqual(Array.from(order.correctOrder), expectedOrder,
      unit.id + ' word-order answer should match the translated sentence');
    assert.deepEqual(Array.from(order.words).reverse(), Array.from(order.correctOrder),
      unit.id + ' word-order tokens should match the answer');
  }
});


test('A2 units 17-20 teach health, housing, work, and the environment with complete lesson structure', () => {
  const earlierForms = new Set(courseData.levels.find(level => level.id === 'A1').units
    .flatMap(unit => unit.vocab).concat(a2.units.slice(0, 16).flatMap(unit => unit.vocab))
    .map(word => word.idn.trim().toLowerCase()));
  const units = a2.units.slice(16, 20);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u17', 'a2_u18', 'a2_u19', 'a2_u20']);
  assert.match(units[0].title, /Salud/);
  assert.match(units[1].title, /Vivienda/);
  assert.match(units[2].title, /Trabajo/);
  assert.match(units[3].title, /ambiente/i);
  for (const unit of units) {
    assert.equal(unit.vocab.length, 12, unit.id + ' should provide twelve assessment items');
    assert.equal(unit.lessons.length, 4, unit.id + ' should have four authored lessons');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.equal(exercises.length, 17, unit.id + ' should have 17 exercises');
    assert.ok(new Set(exercises.map(exercise => exercise.type)).size >= 4, unit.id + ' should use four exercise types');
    assert.ok(exercises.some(exercise => exercise.type === 'listen'), unit.id + ' should include listening');
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer),
      unit.id + ' should include guided writing');
    assert.ok(exercises.filter(exercise => exercise.answer && /[.!?]$/.test(exercise.answer)).length >= 5,
      unit.id + ' should include at least five complete sentence answers');
    const introduced = unit.lessons.flatMap(lesson => lesson.vocabIds || []);
    assert.equal(introduced.length, unit.vocab.length, unit.id + ' should introduce every new vocabulary item once');
    assert.equal(new Set(introduced).size, introduced.length, unit.id + ' should not introduce a word twice');
    for (const lesson of unit.lessons) {
      for (const id of lesson.vocabIds) assert.ok(unit.vocab.some(word => word.id === id), unit.id + ' lesson has unknown new vocabulary');
      for (const exercise of lesson.exercises || []) {
        assert.ok(exercise.vocabId && unit.vocab.some(word => word.id === exercise.vocabId),
          unit.id + ' exercise must reference vocabulary introduced in the unit');
      }
    }
    for (const word of unit.vocab) {
      assert.ok(!earlierForms.has(word.idn.trim().toLowerCase()),
        unit.id + ' must not repeat earlier vocabulary: ' + word.idn);
    }
    const order = exercises.find(exercise => exercise.type === 'order');
    const expectedOrder = unit.vocab[1].ex.replace(/[.!?]$/, '').split(' ');
    assert.deepEqual(Array.from(order.correctOrder), expectedOrder,
      unit.id + ' word-order answer should match the translated sentence');
    assert.deepEqual(Array.from(order.words).reverse(), Array.from(order.correctOrder),
      unit.id + ' word-order tokens should match the answer');
  }
});


test('A2 units 21-24 teach culture, digital media, banking, and education with complete lesson structure', () => {
  const earlierForms = new Set(courseData.levels.find(level => level.id === 'A1').units
    .flatMap(unit => unit.vocab).concat(a2.units.slice(0, 20).flatMap(unit => unit.vocab))
    .map(word => word.idn.trim().toLowerCase()));
  const units = a2.units.slice(20, 24);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u21', 'a2_u22', 'a2_u23', 'a2_u24']);
  assert.match(units[0].title, /Cultura/);
  assert.match(units[1].title, /Comunicación digital/);
  assert.match(units[2].title, /Servicios bancarios/);
  assert.match(units[3].title, /Formación/);
  for (const unit of units) {
    assert.equal(unit.vocab.length, 12, unit.id + ' should provide twelve assessment items');
    assert.equal(unit.lessons.length, 4, unit.id + ' should have four authored lessons');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.equal(exercises.length, 17, unit.id + ' should have 17 exercises');
    assert.ok(new Set(exercises.map(exercise => exercise.type)).size >= 4, unit.id + ' should use four exercise types');
    assert.ok(exercises.some(exercise => exercise.type === 'listen'), unit.id + ' should include listening');
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer),
      unit.id + ' should include guided writing');
    assert.ok(exercises.filter(exercise => exercise.answer && /[.!?]$/.test(exercise.answer)).length >= 5,
      unit.id + ' should include at least five complete sentence answers');
    const introduced = unit.lessons.flatMap(lesson => lesson.vocabIds || []);
    assert.equal(introduced.length, unit.vocab.length, unit.id + ' should introduce every new vocabulary item once');
    assert.equal(new Set(introduced).size, introduced.length, unit.id + ' should not introduce a word twice');
    for (const lesson of unit.lessons) {
      for (const id of lesson.vocabIds) assert.ok(unit.vocab.some(word => word.id === id), unit.id + ' lesson has unknown new vocabulary');
      for (const exercise of lesson.exercises || []) {
        assert.ok(exercise.vocabId && unit.vocab.some(word => word.id === exercise.vocabId),
          unit.id + ' exercise must reference vocabulary introduced in the unit');
      }
    }
    for (const word of unit.vocab) {
      assert.ok(!earlierForms.has(word.idn.trim().toLowerCase()),
        unit.id + ' must not repeat earlier vocabulary: ' + word.idn);
    }
    const order = exercises.find(exercise => exercise.type === 'order');
    const expectedOrder = unit.vocab[1].ex.replace(/[.!?]$/, '').split(' ');
    assert.deepEqual(Array.from(order.correctOrder), expectedOrder,
      unit.id + ' word-order answer should match the translated sentence');
    assert.deepEqual(Array.from(order.words).reverse(), Array.from(order.correctOrder),
      unit.id + ' word-order tokens should match the answer');
  }
});


test('A2 units 25-28 teach cooking, feelings, civic life, and science with complete lesson structure', () => {
  const earlierForms = new Set(courseData.levels.find(level => level.id === 'A1').units
    .flatMap(unit => unit.vocab).concat(a2.units.slice(0, 24).flatMap(unit => unit.vocab))
    .map(word => word.idn.trim().toLowerCase()));
  const units = a2.units.slice(24, 28);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u25', 'a2_u26', 'a2_u27', 'a2_u28']);
  assert.match(units[0].title, /Cocina/);
  assert.match(units[1].title, /Sentimientos/);
  assert.match(units[2].title, /Vida cívica/);
  assert.match(units[3].title, /Ciencia/);
  for (const unit of units) {
    assert.equal(unit.vocab.length, 12, unit.id + ' should provide twelve assessment items');
    assert.equal(unit.lessons.length, 4, unit.id + ' should have four authored lessons');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.equal(exercises.length, 17, unit.id + ' should have 17 exercises');
    assert.ok(new Set(exercises.map(exercise => exercise.type)).size >= 4, unit.id + ' should use four exercise types');
    assert.ok(exercises.some(exercise => exercise.type === 'listen'), unit.id + ' should include listening');
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer),
      unit.id + ' should include guided writing');
    assert.ok(exercises.filter(exercise => exercise.answer && /[.!?]$/.test(exercise.answer)).length >= 5,
      unit.id + ' should include at least five complete sentence answers');
    const introduced = unit.lessons.flatMap(lesson => lesson.vocabIds || []);
    assert.equal(introduced.length, unit.vocab.length, unit.id + ' should introduce every new vocabulary item once');
    assert.equal(new Set(introduced).size, introduced.length, unit.id + ' should not introduce a word twice');
    for (const lesson of unit.lessons) {
      for (const id of lesson.vocabIds) assert.ok(unit.vocab.some(word => word.id === id), unit.id + ' lesson has unknown new vocabulary');
      for (const exercise of lesson.exercises || []) {
        assert.ok(exercise.vocabId && unit.vocab.some(word => word.id === exercise.vocabId),
          unit.id + ' exercise must reference vocabulary introduced in the unit');
      }
    }
    for (const word of unit.vocab) {
      assert.ok(!earlierForms.has(word.idn.trim().toLowerCase()),
        unit.id + ' must not repeat earlier vocabulary: ' + word.idn);
    }
    const order = exercises.find(exercise => exercise.type === 'order');
    const expectedOrder = unit.vocab[1].ex.replace(/[.!?]$/, '').split(' ');
    assert.deepEqual(Array.from(order.correctOrder), expectedOrder,
      unit.id + ' word-order answer should match the translated sentence');
    assert.deepEqual(Array.from(order.words).reverse(), Array.from(order.correctOrder),
      unit.id + ' word-order tokens should match the answer');
  }
});


test('A2 units 29-32 teach customer service, arts, outdoor activities, and celebrations with complete lesson structure', () => {
  const earlierForms = new Set(courseData.levels.find(level => level.id === 'A1').units
    .flatMap(unit => unit.vocab).concat(a2.units.slice(0, 28).flatMap(unit => unit.vocab))
    .map(word => word.idn.trim().toLowerCase()));
  const units = a2.units.slice(28, 32);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u29', 'a2_u30', 'a2_u31', 'a2_u32']);
  assert.match(units[0].title, /Atención al cliente/);
  assert.match(units[1].title, /Arte/);
  assert.match(units[2].title, /Excursiones/);
  assert.match(units[3].title, /Celebraciones/);
  for (const unit of units) {
    assert.equal(unit.vocab.length, 12, unit.id + ' should provide twelve assessment items');
    assert.equal(unit.lessons.length, 4, unit.id + ' should have four authored lessons');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.equal(exercises.length, 17, unit.id + ' should have 17 exercises');
    assert.ok(new Set(exercises.map(exercise => exercise.type)).size >= 4, unit.id + ' should use four exercise types');
    assert.ok(exercises.some(exercise => exercise.type === 'listen'), unit.id + ' should include listening');
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer),
      unit.id + ' should include guided writing');
    assert.ok(exercises.filter(exercise => exercise.answer && /[.!?]$/.test(exercise.answer)).length >= 5,
      unit.id + ' should include at least five complete sentence answers');
    const introduced = unit.lessons.flatMap(lesson => lesson.vocabIds || []);
    assert.equal(introduced.length, unit.vocab.length, unit.id + ' should introduce every new vocabulary item once');
    assert.equal(new Set(introduced).size, introduced.length, unit.id + ' should not introduce a word twice');
    for (const lesson of unit.lessons) {
      for (const id of lesson.vocabIds) assert.ok(unit.vocab.some(word => word.id === id), unit.id + ' lesson has unknown new vocabulary');
      for (const exercise of lesson.exercises || []) {
        assert.ok(exercise.vocabId && unit.vocab.some(word => word.id === exercise.vocabId),
          unit.id + ' exercise must reference vocabulary introduced in the unit');
      }
    }
    for (const word of unit.vocab) {
      assert.ok(!earlierForms.has(word.idn.trim().toLowerCase()),
        unit.id + ' must not repeat earlier vocabulary: ' + word.idn);
    }
    const order = exercises.find(exercise => exercise.type === 'order');
    const expectedOrder = unit.vocab[1].ex.replace(/[.!?]$/, '').split(' ');
    assert.deepEqual(Array.from(order.correctOrder), expectedOrder,
      unit.id + ' word-order answer should match the translated sentence');
    assert.deepEqual(Array.from(order.words).reverse(), Array.from(order.correctOrder),
      unit.id + ' word-order tokens should match the answer');
  }
});


test('A2 units 33-36 teach geography, etiquette, personal finance, and decision-making with complete lesson structure', () => {
  const earlierForms = new Set(courseData.levels.find(level => level.id === 'A1').units
    .flatMap(unit => unit.vocab).concat(a2.units.slice(0, 32).flatMap(unit => unit.vocab))
    .map(word => word.idn.trim().toLowerCase()));
  const units = a2.units.slice(32, 36);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u33', 'a2_u34', 'a2_u35', 'a2_u36']);
  assert.match(units[0].title, /Regiones/);
  assert.match(units[1].title, /Cortesía/);
  assert.match(units[2].title, /Presupuesto/);
  assert.match(units[3].title, /decisiones/i);
  for (const unit of units) {
    assert.equal(unit.vocab.length, 12, unit.id + ' should provide twelve assessment items');
    assert.equal(unit.lessons.length, 4, unit.id + ' should have four authored lessons');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.equal(exercises.length, 17, unit.id + ' should have 17 exercises');
    assert.ok(new Set(exercises.map(exercise => exercise.type)).size >= 4, unit.id + ' should use four exercise types');
    assert.ok(exercises.some(exercise => exercise.type === 'listen'), unit.id + ' should include listening');
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer),
      unit.id + ' should include guided writing');
    assert.ok(exercises.filter(exercise => exercise.answer && /[.!?]$/.test(exercise.answer)).length >= 5,
      unit.id + ' should include at least five complete sentence answers');
    const introduced = unit.lessons.flatMap(lesson => lesson.vocabIds || []);
    assert.equal(introduced.length, unit.vocab.length, unit.id + ' should introduce every new vocabulary item once');
    assert.equal(new Set(introduced).size, introduced.length, unit.id + ' should not introduce a word twice');
    for (const lesson of unit.lessons) {
      for (const id of lesson.vocabIds) assert.ok(unit.vocab.some(word => word.id === id), unit.id + ' lesson has unknown new vocabulary');
      for (const exercise of lesson.exercises || []) {
        assert.ok(exercise.vocabId && unit.vocab.some(word => word.id === exercise.vocabId),
          unit.id + ' exercise must reference vocabulary introduced in the unit');
      }
    }
    for (const word of unit.vocab) {
      assert.ok(!earlierForms.has(word.idn.trim().toLowerCase()),
        unit.id + ' must not repeat earlier vocabulary: ' + word.idn);
    }
    const order = exercises.find(exercise => exercise.type === 'order');
    const expectedOrder = unit.vocab[1].ex.replace(/[.!?]$/, '').split(' ');
    assert.deepEqual(Array.from(order.correctOrder), expectedOrder,
      unit.id + ' word-order answer should match the translated sentence');
    assert.deepEqual(Array.from(order.words).reverse(), Array.from(order.correctOrder),
      unit.id + ' word-order tokens should match the answer');
  }
});


test('A2 units 37-40 teach emergency readiness, tourism, remote work, and integrated communication', () => {
  const earlierForms = new Set(courseData.levels.find(level => level.id === 'A1').units
    .flatMap(unit => unit.vocab).concat(a2.units.slice(0, 36).flatMap(unit => unit.vocab))
    .map(word => word.idn.trim().toLowerCase()));
  const units = a2.units.slice(36, 40);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u37', 'a2_u38', 'a2_u39', 'a2_u40']);
  assert.match(units[0].title, /Emergencias/);
  assert.match(units[1].title, /Turismo/);
  assert.match(units[2].title, /Trabajo remoto/);
  assert.match(units[3].title, /Resumir/);
  for (const unit of units) {
    assert.equal(unit.vocab.length, 12, unit.id + ' should provide twelve assessment items');
    assert.equal(unit.lessons.length, 4, unit.id + ' should have four authored lessons');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.equal(exercises.length, 17, unit.id + ' should have 17 exercises');
    assert.ok(new Set(exercises.map(exercise => exercise.type)).size >= 4, unit.id + ' should use four exercise types');
    assert.ok(exercises.some(exercise => exercise.type === 'listen'), unit.id + ' should include listening');
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer),
      unit.id + ' should include guided writing');
    assert.ok(exercises.filter(exercise => exercise.answer && /[.!?]$/.test(exercise.answer)).length >= 5,
      unit.id + ' should include at least five complete sentence answers');
    const introduced = unit.lessons.flatMap(lesson => lesson.vocabIds || []);
    assert.equal(introduced.length, unit.vocab.length, unit.id + ' should introduce every new vocabulary item once');
    assert.equal(new Set(introduced).size, introduced.length, unit.id + ' should not introduce a word twice');
    for (const lesson of unit.lessons) {
      for (const id of lesson.vocabIds) assert.ok(unit.vocab.some(word => word.id === id), unit.id + ' lesson has unknown new vocabulary');
      for (const exercise of lesson.exercises || []) {
        assert.ok(exercise.vocabId && unit.vocab.some(word => word.id === exercise.vocabId),
          unit.id + ' exercise must reference vocabulary introduced in the unit');
      }
    }
    for (const word of unit.vocab) {
      assert.ok(!earlierForms.has(word.idn.trim().toLowerCase()),
        unit.id + ' must not repeat earlier vocabulary: ' + word.idn);
    }
    const order = exercises.find(exercise => exercise.type === 'order');
    const expectedOrder = unit.vocab[1].ex.replace(/[.!?]$/, '').split(' ');
    assert.deepEqual(Array.from(order.correctOrder), expectedOrder,
      unit.id + ' word-order answer should match the translated sentence');
    assert.deepEqual(Array.from(order.words).reverse(), Array.from(order.correctOrder),
      unit.id + ' word-order tokens should match the answer');
  }
});

test('new A2 vocabulary identifiers are unique and advanced content remains gated', () => {
  const newIds = a2.units.flatMap(unit => unit.vocab.map(word => word.id));
  assert.equal(new Set(newIds).size, newIds.length, 'new A2 vocabulary identifiers must be unique');
  assert.match(html, /function getLearningLevels\(\)\s*\{\s*return getLevels\(\)\.filter\(level => !\['A2', 'B1', 'B2'\]\.includes\(level\.id\)\);/,
    'A2, B1, and B2 should remain outside learner-facing vocabulary and SRS');
  assert.match(html, /const isAdvanced = \['A2', 'B1', 'B2'\]\.includes\(lvl\.id\);[\s\S]*?if \(!a1Complete\) return;/,
    'advanced curriculum cards should remain gated until A1 completion');
});
