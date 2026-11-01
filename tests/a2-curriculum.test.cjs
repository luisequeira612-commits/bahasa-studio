'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const a1Source = fs.readFileSync(path.join(__dirname, '..', 'curriculum-a1.js'), 'utf8');
const a2Source = fs.readFileSync(path.join(__dirname, '..', 'curriculum-a2.js'), 'utf8');
const a1Literal = a1Source.slice(a1Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
const a2Literal = a2Source.slice(a2Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
const htmlSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const courseDataStart = htmlSource.indexOf('const CourseData =');
const html = htmlSource.slice(0, courseDataStart) + htmlSource.slice(courseDataStart)
  .replace('window.BAHASA_CURRICULUM_A1', a1Literal)
  .replace('window.BAHASA_CURRICULUM_A2', a2Literal);

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
    assert.ok(exercises.length >= 14 && exercises.length <= (unit.id === 'a2_u1' ? 27 : 22),
      unit.id + ' should include 14-27 exercises for U1 or 14-22 for the other units');
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
  const expectedPrefixes = [/^ber/i, /^men/i, /^meng/i, /^(mem|meny)/i];
  units.forEach((unit, index) => {
    for (const word of unit.vocab) {
      assert.match(word.idn, expectedPrefixes[index],
        unit.id + ' vocabulary form should match the unit prefix focus: ' + word.idn);
    }
  });
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
        const word = unit.vocab.find(entry => entry.id === exercise.vocabId);
        const target = word.idn.toLowerCase();
        if (exercise.type === 'mc') {
          assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length,
            unit.id + ' multiple-choice answer index must be valid');
          assert.equal(exercise.options[exercise.answer], word.esp,
            unit.id + ' multiple-choice answer must match ' + word.idn);
          assert.ok(exercise.explanation.toLowerCase().includes(target),
            unit.id + ' multiple-choice feedback must name ' + word.idn);
        } else if (exercise.type === 'order') {
          assert.deepEqual(Array.from(exercise.words).sort(), Array.from(exercise.correctOrder).sort(),
            unit.id + ' ordering tokens must match the canonical answer');
          assert.ok(exercise.explanation.includes(exercise.correctOrder.join(' ')),
            unit.id + ' ordering feedback must reproduce the canonical answer');
        } else if (exercise.type === 'write') {
          assert.ok(exercise.modelAnswer && exercise.modelAnswer.toLowerCase().includes(target),
            unit.id + ' writing model must contain its target vocabulary: ' + word.idn);
        } else if (exercise.type === 'translate_es_id' || exercise.type === 'listen') {
          assert.ok(exercise.answer && exercise.answer.toLowerCase().includes(target),
            unit.id + ' sentence answer must contain its target vocabulary: ' + word.idn);
        }
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

test('A2 vocabulary identifiers are unique; A2 opens after A1 completion while B1/B2 remain gated', () => {
  const newIds = a2.units.flatMap(unit => unit.vocab.map(word => word.id));
  assert.equal(new Set(newIds).size, newIds.length, 'new A2 vocabulary identifiers must be unique');
  assert.match(html, /function getLearningLevels\(\)[\s\S]*?level\.id !== 'A2' \|\| \(A2_RELEASE_ENABLED && isA1Complete\(App\.completedUnits\)\)/,
    'A2 learner-facing vocabulary and SRS must require A1 completion when beta release is enabled');
  assert.match(html, /const isAdvanced = \['B1', 'B2'\]\.includes\(lvl\.id\);[\s\S]*?if \(!a1Complete\) return;/,
    'B1/B2 curriculum cards should remain gated until A1 completion');
});


test('A2 is available in beta after A1 completion', () => {
  assert.match(htmlSource, /const A2_RELEASE_ENABLED = true;/);
  assert.match(htmlSource, /return getLevels\(\)\.filter\(level =>[\s\S]*?level\.id !== 'A2' \|\| \(A2_RELEASE_ENABLED && isA1Complete\(App\.completedUnits\)\)/);
  assert.match(htmlSource, /if \(lvl\.id === 'A2'\)/);
  assert.match(htmlSource, /Beta · en revisión/);
  assert.match(htmlSource, /Disponible al completar A1/);
  assert.match(htmlSource, /if \(!A2_RELEASE_ENABLED \|\| !a1Complete\) return;/);
  assert.match(htmlSource, /const isAdvanced = \['B1', 'B2'\]\.includes\(lvl\.id\)/);
  assert.match(htmlSource, /const unitAccessible = lvl\.id === 'A1'[\s\S]*?lvl\.id === 'A2' \? \(A2_RELEASE_ENABLED && a1Complete\)/);
});

test('A2 date production and sequence context practice are explicitly taught', () => {
  const dateLesson = a2.units[0].lessons.find(lesson => /Fin de semana y fechas/.test(lesson.title));
  assert.ok(dateLesson);
  assert.match(dateLesson.grammar, /Hari ini tanggal/);
  assert.match(dateLesson.grammar, /mayúscula inicial/);
  assert.match(dateLesson.grammar, /Tanggal berapa hari ini/);
  assert.match(dateLesson.grammar, /Hari apa hari ini/);
  assert.match(dateLesson.grammar, /fecha sencilla \(día y mes\)/);
  assert.doesNotMatch(dateLesson.grammar, /fecha completa/);
  const dateTask = dateLesson.exercises.find(exercise => exercise.type === 'write' && exercise.vocabId === 'a2u1_tanggal');
  assert.ok(dateTask, 'A2-U1 should include a guided full-date production task');
  assert.equal(dateTask.modelAnswer, 'Hari ini tanggal 17 Agustus.');
  assert.match(dateTask.prompt, /día y el mes/);
  assert.doesNotMatch(dateTask.prompt, /fecha completa/);

  const sequenceLesson = a2.units[2].lessons.find(lesson => /Primero y después/.test(lesson.title));
  assert.ok(sequenceLesson);
  assert.match(sequenceLesson.grammar, /Setiap hari/);
  assert.match(sequenceLesson.grammar, /kemarin/);
  const priorEvent = a2.units[2].vocab.find(word => word.id === 'a2u3_sebelumnya');
  assert.equal(priorEvent.exEsp, 'Antes de eso, estudié.');
  const priorEventLesson = a2.units[2].lessons.find(lesson => /Antes y a continuación/.test(lesson.title));
  const priorEventOrder = priorEventLesson.exercises.find(exercise => exercise.type === 'order' && exercise.vocabId === 'a2u3_sebelumnya');
  assert.match(priorEventOrder.prompt, /narración sobre ayer/);
  assert.match(priorEventOrder.prompt, /Antes de eso, estudié/);
  assert.match(priorEventOrder.explanation, /Antes de eso, estudié/);
  const contextTask = sequenceLesson.exercises.find(exercise => exercise.type === 'write' && exercise.vocabId === 'a2u3_pertama');
  assert.ok(contextTask, 'A2-U3 should explicitly practise routine versus past-time context');
  assert.match(contextTask.prompt, /rutina o un hecho pasado/);
  assert.match(contextTask.hint, /No cambies la forma del verbo/);
  assert.match(contextTask.modelAnswer, /rutina habitual/);
});


test('A2 U5 word-order feedback matches the berbicara prompt and answer', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u5');
  assert.ok(unit);
  const lesson = unit.lessons.find(entry => entry.title === 'Lección 1: Hablar, desplazarse y visitar');
  assert.ok(lesson);
  const exercise = lesson.exercises.find(entry => entry.type === 'order' && entry.vocabId === 'a2u5_berbicara');
  assert.ok(exercise);
  assert.equal(exercise.prompt, 'Ordena: Él o ella habla.');
  assert.deepEqual(Array.from(exercise.correctOrder), ['Dia', 'berbicara']);
  assert.match(exercise.explanation, /Dia berbicara/);
  assert.doesNotMatch(exercise.explanation, /bersepeda|sekolah/);
});


test('A2 U1-U4 introduce every new vocabulary item once and keep lesson references resolvable', () => {
  assert.deepEqual(Array.from(a2.units.slice(0, 4), unit => unit.lessons.reduce((sum, lesson) => sum + (lesson.exercises || []).length, 0)), [26, 17, 17, 19]);
  const knownIds = new Set(courseData.levels.flatMap(level =>
    level.units.flatMap(unit => (unit.vocab || []).map(word => word.id))));
  for (const unit of a2.units.slice(0, 4)) {
    const introduced = unit.lessons.flatMap(lesson => lesson.vocabIds || []);
    assert.equal(introduced.length, unit.vocab.length, unit.id + ' should introduce every vocabulary item');
    assert.equal(new Set(introduced).size, introduced.length, unit.id + ' should not introduce vocabulary twice');
    for (const lesson of unit.lessons) {
      for (const id of lesson.vocabIds || []) {
        assert.ok(unit.vocab.some(word => word.id === id), unit.id + ' lesson introduces unknown vocabulary: ' + id);
      }
      for (const id of lesson.reviewVocabIds || []) {
        assert.ok(knownIds.has(id), unit.id + ' lesson reviews unknown vocabulary: ' + id);
      }
      for (const exercise of lesson.exercises || []) {
        if (exercise.vocabId) {
          assert.ok(knownIds.has(exercise.vocabId), unit.id + ' exercise references unknown vocabulary: ' + exercise.vocabId);
        }
      }
    }
  }
});

test('A2 U2 explicitly contrasts belum and masih in a contextualized exercise', () => {
  const lesson = a2.units[1].lessons.find(entry => /Todavía y dentro de poco/.test(entry.title));
  assert.ok(lesson);
  assert.ok(lesson.reviewVocabIds.includes('a2u2_belum'));
  const exercise = lesson.exercises.find(entry => entry.vocabId === 'a2u2_belum' && /Saya belum makan/.test(entry.prompt));
  assert.ok(exercise);
  assert.equal(exercise.type, 'mc');
  assert.equal(exercise.options[exercise.answer], 'Belum: todavía no he comido; masih: sigo comiendo.');
  assert.match(exercise.explanation, /todavía no ha ocurrido/);
  assert.match(exercise.explanation, /continúa/);
});

test('A2 U2 distinguishes tadi pagi, tadi malam, and pagi ini by time context', () => {
  const lesson = a2.units[1].lessons.find(entry => /Hace un rato y hace muy poco/.test(entry.title));
  assert.ok(lesson);
  assert.match(lesson.grammar, /pasado reciente/);
  assert.match(lesson.grammar, /tadi malam suele significar «anoche»/);
  assert.match(lesson.grammar, /Si todavía es por la mañana, se usa pagi ini/);
  const tadiPagiExercise = lesson.exercises.find(entry => entry.vocabId === 'a2u2_tadi_pagi' && entry.type === 'mc');
  assert.ok(tadiPagiExercise);
  assert.match(tadiPagiExercise.prompt, /Si ya pasó la mañana/);
  const tadiPagiWrite = lesson.exercises.find(entry => entry.vocabId === 'a2u2_tadi' && entry.type === 'write');
  assert.ok(tadiPagiWrite);
  assert.match(tadiPagiWrite.prompt, /Si ya pasó la mañana/);
});

test('A2 U4 contextualizes kegiatan so its distractors do not overlap with acara', () => {
  const lesson = a2.units[3].lessons.find(entry => /Actividades y eventos/.test(entry.title));
  assert.ok(lesson);
  const exercise = lesson.exercises.find(entry => entry.vocabId === 'a2u4_kegiatan' && entry.type === 'mc');
  assert.ok(exercise);
  assert.match(exercise.prompt, /Kegiatan mulai pukul delapan/);
  assert.deepEqual(Array.from(exercise.options), ['Actividad', 'Horario', 'Lugar']);
  assert.equal(exercise.options[exercise.answer], 'Actividad');
  assert.match(exercise.explanation, /actividad que empieza a las ocho/);
});

test('A2 U4 includes integrated daily-schedule writing with two timed activities', () => {
  const lesson = a2.units[3].lessons.find(entry => /Describir cómo es tu día/.test(entry.title));
  assert.ok(lesson);
  assert.ok(lesson.reviewVocabIds.includes('a2u4_jadwal'));
  const exercise = lesson.exercises.find(entry => entry.type === 'write' && entry.vocabId === 'a2u4_jadwal');
  assert.ok(exercise);
  assert.match(exercise.prompt, /dos actividades y sus horas/);
  assert.match(exercise.prompt, /ritmo tranquilo/);
  assert.match(exercise.modelAnswer, /Pukul delapan/);
  assert.match(exercise.modelAnswer, /Pukul dua belas/);
  assert.match(exercise.modelAnswer, /Jadwal saya penuh/);
});


test('A2 U3 sequence-writing model answer includes the full Indonesian sequence', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u3');
  assert.ok(unit);
  const lesson = unit.lessons.find(entry => entry.title.includes('Primero y después'));
  assert.ok(lesson);
  const exercise = lesson.exercises.find(entry => entry.type === 'write' && entry.vocabId === 'a2u3_pertama');
  assert.ok(exercise);
  assert.match(exercise.prompt, /conserva en indonesio la secuencia/);
  assert.match(exercise.modelAnswer, /Pertama, saya makan\. Lalu, saya minum air\./);
});

test('A2 U14 listening and writing exercises match their target travel vocabulary', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u14');
  assert.ok(unit);
  const lessons = unit.lessons;
  const cases = [
    { lesson: 'Preparar un viaje', vocabId: 'a2u14_mendarat', type: 'listen', answer: 'Pesawat mendarat pagi ini.' },
    { lesson: 'Estaciones, puertos y billetes', vocabId: 'a2u14_bagasi', type: 'write', answer: 'Bagasi saya berat.' },
    { lesson: 'Medios de transporte', vocabId: 'a2u14_kendaraan', type: 'write', answer: 'Kendaraan itu besar.' }
  ];
  for (const item of cases) {
    const lesson = lessons.find(entry => entry.title.includes(item.lesson));
    assert.ok(lesson, item.lesson + ' should exist');
    const exercise = lesson.exercises.find(entry => entry.type === item.type && entry.vocabId === item.vocabId);
    assert.ok(exercise, item.vocabId + ' should exist');
    assert.equal(item.type === 'listen' ? exercise.answer : exercise.modelAnswer, item.answer);
    if (item.type === 'write') assert.match(exercise.hint, new RegExp(item.answer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('A2 U9-U12 word-order feedback matches each prompt and canonical answer', () => {
  const cases = [
    { unitId: 'a2_u9', vocabId: 'a2u9_menurut', prompt: 'Ordena: En mi opinión, él o ella está de acuerdo.', sentence: 'Menurut saya, dia setuju' },
    { unitId: 'a2_u10', vocabId: 'a2u10_peraturan', prompt: 'Ordena: Leo el reglamento.', sentence: 'Saya membaca peraturan' },
    { unitId: 'a2_u11', vocabId: 'a2u11_solusi', prompt: 'Ordena: Esta es una solución.', sentence: 'Ini solusi' },
    { unitId: 'a2_u12', vocabId: 'a2u12_kemampuan', prompt: 'Ordena: Mi capacidad es buena.', sentence: 'Kemampuan saya baik' }
  ];
  for (const item of cases) {
    const unit = a2.units.find(entry => entry.id === item.unitId);
    assert.ok(unit, item.unitId + ' should exist');
    const exercise = unit.lessons.flatMap(lesson => lesson.exercises || [])
      .find(entry => entry.type === 'order' && entry.vocabId === item.vocabId);
    assert.ok(exercise, item.unitId + ' should include the expected word-order exercise');
    assert.equal(exercise.prompt, item.prompt);
    assert.equal(exercise.correctOrder.join(' '), item.sentence);
    assert.equal(exercise.explanation, 'La frase completa es: ' + item.sentence + '.');
    assert.equal(exercise.words.slice().sort().join(' '), exercise.correctOrder.slice().sort().join(' '));
  }
});

test('A2 U6-U8 word-order feedback matches each prompt and canonical answer', () => {
  const cases = [
    { unitId: 'a2_u6', vocabId: 'a2u6_menutup', prompt: 'Ordena: Cierro el libro.', sentence: 'Saya menutup buku' },
    { unitId: 'a2_u7', vocabId: 'a2u7_mengirim', prompt: 'Ordena: Envío un mensaje.', sentence: 'Saya mengirim pesan' },
    { unitId: 'a2_u8', vocabId: 'a2u8_membeli', prompt: 'Ordena: Compro un libro.', sentence: 'Saya membeli buku' }
  ];
  for (const item of cases) {
    const unit = a2.units.find(entry => entry.id === item.unitId);
    assert.ok(unit, item.unitId + ' should exist');
    const exercise = unit.lessons.flatMap(lesson => lesson.exercises || [])
      .find(entry => entry.type === 'order' && entry.vocabId === item.vocabId);
    assert.ok(exercise, item.unitId + ' should include the expected word-order exercise');
    assert.equal(exercise.prompt, item.prompt);
    assert.equal(exercise.correctOrder.join(' '), item.sentence);
    assert.equal(exercise.explanation, item.sentence + '. expresa la idea indicada.');
    assert.equal(exercise.words.slice().sort().join(' '), exercise.correctOrder.slice().sort().join(' '));
  }
});


test('A2 U15 distinguishes proposing from inviting in vocabulary feedback', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u15');
  assert.ok(unit);
  const lesson = unit.lessons.find(entry => entry.title.includes('Hacer una invitación'));
  assert.ok(lesson);
  const exercise = lesson.exercises.find(entry => entry.vocabId === 'a2u15_mengusulkan' && entry.type === 'mc');
  assert.ok(exercise);
  assert.equal(exercise.options[exercise.answer], 'Proponer');
  assert.match(exercise.explanation, /mengusulkan significa proponer/);
  assert.match(exercise.explanation, /mengundang significa invitar/);
  assert.doesNotMatch(exercise.explanation, /mengusulkan significa invitar/);
});


test('A2 U14 explains keberangkatan as departure, matching its vocabulary gloss', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u14');
  assert.ok(unit);
  const lesson = unit.lessons.find(entry => entry.title.includes('Salidas y cambios de ruta'));
  assert.ok(lesson);
  const exercise = lesson.exercises.find(entry => entry.vocabId === 'a2u14_keberangkatan' && entry.type === 'mc');
  assert.ok(exercise);
  assert.equal(exercise.options[exercise.answer], 'Salida');
  assert.equal(exercise.explanation, 'keberangkatan significa salida.');
  assert.doesNotMatch(exercise.explanation, /viaje/);
});


test('A2 U18 clarifies the Indonesian-Spanish false friend pagar', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u18');
  assert.ok(unit);
  const word = unit.vocab.find(entry => entry.id === 'a2u18_pagar');
  assert.equal(word.idn, 'pagar');
  assert.equal(word.esp, 'Cerca');
  assert.match(word.exEsp, /cerca/i);
  const lesson = unit.lessons.find(entry => entry.exercises.some(exercise => exercise.vocabId === 'a2u18_pagar'));
  assert.ok(lesson);
  const write = lesson.exercises.find(exercise => exercise.type === 'write' && exercise.vocabId === 'a2u18_pagar');
  assert.ok(write);
  assert.match(write.prompt, /no el verbo español «pagar»/);
  assert.match(write.hint, /significado indonesio: «cerca»/);
  assert.match(write.explanation, /sustantivo indonesio «cerca»/);
});


test('A2 U38 uses consistent hyphenation for oleh-oleh', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u38');
  assert.ok(unit);
  const word = unit.vocab.find(entry => entry.id === 'a2u38_oleh_oleh');
  assert.ok(word);
  assert.equal(word.idn, 'oleh-oleh');
  assert.match(word.ex, /oleh-oleh/);
  const exercise = unit.lessons.flatMap(lesson => lesson.exercises || [])
    .find(entry => entry.vocabId === 'a2u38_oleh_oleh' && entry.type === 'translate_es_id');
  assert.ok(exercise);
  assert.equal(exercise.answer, 'Saya membeli oleh-oleh untuk keluarga.');
  assert.equal(exercise.explanation, 'La frase utiliza «oleh-oleh».');
});





test('A2 U11 segera translation preserves the direction expressed by datang', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u11');
  assert.ok(unit);
  const word = unit.vocab.find(entry => entry.id === 'a2u11_segera');
  assert.ok(word);
  assert.equal(word.ex, 'Saya datang segera.');
  assert.equal(word.exEsp, 'Vengo enseguida.');
  const exercise = unit.lessons.flatMap(lesson => lesson.exercises || [])
    .find(entry => entry.vocabId === 'a2u11_segera' && entry.type === 'translate_es_id');
  assert.ok(exercise);
  assert.equal(exercise.prompt, 'Traduce: Vengo enseguida.');
  assert.equal(exercise.answer, 'Saya datang segera.');
});

test('A2 U6 Mencatat example and translation describe the same action', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u6');
  assert.ok(unit);
  const word = unit.vocab.find(entry => entry.id === 'a2u6_mencatat');
  assert.ok(word);
  assert.equal(word.ex, 'Saya mencatat alamat.');
  assert.equal(word.exEsp, 'Anoto una dirección.');
  const exercise = unit.lessons.flatMap(lesson => lesson.exercises || [])
    .find(entry => entry.vocabId === 'a2u6_mencatat' && entry.type === 'translate_es_id');
  assert.ok(exercise);
  assert.equal(exercise.prompt, 'Traduce: Anoto una dirección.');
  assert.equal(exercise.answer, 'Saya mencatat alamat.');
});

test('A2 U7 meng- explanation includes the h-initial root hapus', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u7');
  assert.ok(unit);
  assert.match(unit.grammar, /k, g, h o vocal/);
  assert.match(unit.grammar, /hapus → menghapus/);
  const word = unit.vocab.find(entry => entry.id === 'a2u7_menghapus');
  assert.ok(word);
  assert.equal(word.idn, 'Menghapus');
});

test('A2 U7 mengisi example matches its Spanish translation', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u7');
  assert.ok(unit);
  const word = unit.vocab.find(entry => entry.id === 'a2u7_mengisi');
  assert.ok(word);
  assert.equal(word.ex, 'Saya mengisi botol dengan air.');
  assert.equal(word.exEsp, 'Lleno una botella con agua.');
});

test('A2 units 25-40 keep exercise answers aligned with their linked vocabulary', () => {
  const units = a2.units.slice(24);
  assert.equal(units.length, 16, 'the final A2 block should contain units 25-40');

  for (const unit of units) {
    const unitVocab = new Map(unit.vocab.map(word => [word.id, word]));
    for (const lesson of unit.lessons) {
      for (const exercise of lesson.exercises || []) {
        const word = unitVocab.get(exercise.vocabId);
        assert.ok(word, unit.id + ' exercise must reference vocabulary introduced in the same unit');

        if (exercise.type === 'mc' && /qué significa/i.test(exercise.prompt || '')) {
          assert.ok(Array.isArray(exercise.options), unit.id + ' meaning question must provide options');
          assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length,
            unit.id + ' meaning question must have a valid answer index');
          assert.equal(exercise.options[exercise.answer], word.esp,
            unit.id + ' meaning answer must match the linked gloss for ' + word.idn);
        }

        if (exercise.type === 'order') {
          assert.ok(Array.isArray(exercise.words) && Array.isArray(exercise.correctOrder),
            unit.id + ' ordering exercise must define tokens and a canonical answer');
          assert.deepEqual(Array.from(exercise.words).sort(), Array.from(exercise.correctOrder).sort(),
            unit.id + ' ordering tokens must match the canonical answer');
          assert.ok(exercise.explanation && exercise.explanation.includes(exercise.correctOrder.join(' ')),
            unit.id + ' ordering feedback must reproduce the canonical answer');
        }

        if (exercise.type === 'write') {
          assert.ok(exercise.modelAnswer && exercise.modelAnswer.toLowerCase().includes(word.idn.toLowerCase()),
            unit.id + ' writing model must include its linked vocabulary: ' + word.idn);
        }

        if (exercise.type === 'translate_es_id' || exercise.type === 'listen') {
          assert.ok(exercise.answer && exercise.answer.toLowerCase().includes(word.idn.toLowerCase()),
            unit.id + ' sentence answer must include its linked vocabulary: ' + word.idn);
        }
      }
    }
  }
});


test('A2 U14 uses consistent travel glosses and translation prompts', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u14');
  assert.ok(unit);
  assert.match(unit.grammar, /bepergian, viajar/);
  assert.match(unit.grammar, /keberangkatan, salida/);
  const travel = unit.lessons.flatMap(lesson => lesson.exercises || [])
    .find(exercise => exercise.vocabId === 'a2u14_bepergian' && exercise.type === 'translate_es_id');
  assert.ok(travel);
  assert.equal(travel.prompt, 'Traduce: Viajo por la mañana.');
  assert.equal(travel.answer, 'Saya bepergian pagi.');
});

test('A2 U5-U8 meaning questions keep the correct option and feedback aligned with vocabulary glosses', () => {
  for (const unit of a2.units.slice(4, 8)) {
    const vocabulary = new Map(unit.vocab.map(word => [word.id, word]));
    const meaningExercises = unit.lessons.flatMap(lesson => lesson.exercises || [])
      .filter(exercise => exercise.type === 'mc' && /qué significa/i.test(exercise.prompt || ''));

    assert.ok(meaningExercises.length > 0, unit.id + ' should include explicit vocabulary-meaning questions');

    for (const exercise of meaningExercises) {
      const word = vocabulary.get(exercise.vocabId);
      assert.ok(word, unit.id + ' meaning question must reference vocabulary introduced in the same unit');
      assert.ok(Array.isArray(exercise.options), unit.id + ' meaning question must provide answer options');
      assert.equal(exercise.options[exercise.answer], word.esp,
        unit.id + ' correct meaning option must match the canonical Spanish gloss for ' + word.idn);
      assert.ok((exercise.explanation || '').toLowerCase().includes(word.idn.toLowerCase()),
        unit.id + ' feedback should identify the vocabulary item being explained');
      assert.match(exercise.explanation || '', /significa/i,
        unit.id + ' feedback should explain the meaning rather than only repeat the answer');
    }
  }
});

test('A2 U9-U12 meaning questions and ordering feedback match their canonical vocabulary', () => {
  const units = a2.units.slice(8, 12);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u9', 'a2_u10', 'a2_u11', 'a2_u12']);

  for (const unit of units) {
    const vocabulary = new Map(unit.vocab.map(word => [word.id, word]));
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    const meaningExercises = exercises.filter(exercise =>
      exercise.type === 'mc' && /qué significa/i.test(exercise.prompt || '')
    );
    assert.ok(meaningExercises.length > 0, unit.id + ' should include vocabulary-meaning questions');

    for (const exercise of meaningExercises) {
      const word = vocabulary.get(exercise.vocabId);
      assert.ok(word, unit.id + ' meaning question must reference vocabulary introduced in the same unit');
      assert.ok(Array.isArray(exercise.options), unit.id + ' meaning question must provide options');
      assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length,
        unit.id + ' meaning question must have a valid answer index');
      assert.equal(exercise.options[exercise.answer], word.esp,
        unit.id + ' correct meaning option must match the canonical Spanish gloss for ' + word.idn);
      assert.ok((exercise.explanation || '').toLowerCase().includes(word.idn.toLowerCase()),
        unit.id + ' feedback should identify the vocabulary item being explained');
    }

    for (const exercise of exercises.filter(item => item.type === 'order')) {
      assert.ok(Array.isArray(exercise.words) && Array.isArray(exercise.correctOrder),
        unit.id + ' ordering exercise must define its tokens and answer');
      assert.deepEqual(Array.from(exercise.words).sort(), Array.from(exercise.correctOrder).sort(),
        unit.id + ' ordering tokens must match the canonical answer');
      assert.ok((exercise.explanation || '').includes(exercise.correctOrder.join(' ')),
        unit.id + ' ordering feedback must reproduce the canonical answer');
    }
  }
});

test('A2 U17-U20 meaning questions and ordering feedback match their canonical vocabulary', () => {
  const units = a2.units.slice(16, 20);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u17', 'a2_u18', 'a2_u19', 'a2_u20']);

  for (const unit of units) {
    const vocabulary = new Map(unit.vocab.map(word => [word.id, word]));
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    const meaningExercises = exercises.filter(exercise =>
      exercise.type === 'mc' && /qué significa/i.test(exercise.prompt || '')
    );
    assert.ok(meaningExercises.length > 0, unit.id + ' should include vocabulary-meaning questions');

    for (const exercise of meaningExercises) {
      const word = vocabulary.get(exercise.vocabId);
      assert.ok(word, unit.id + ' meaning question must reference vocabulary introduced in the same unit');
      assert.ok(Array.isArray(exercise.options), unit.id + ' meaning question must provide options');
      assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length,
        unit.id + ' meaning question must have a valid answer index');
      assert.equal(exercise.options[exercise.answer], word.esp,
        unit.id + ' correct meaning option must match the canonical Spanish gloss for ' + word.idn);
      assert.ok((exercise.explanation || '').toLowerCase().includes(word.idn.toLowerCase()),
        unit.id + ' feedback should identify the vocabulary item being explained');
    }

    for (const exercise of exercises.filter(item => item.type === 'order')) {
      assert.ok(Array.isArray(exercise.words) && Array.isArray(exercise.correctOrder),
        unit.id + ' ordering exercise must define its tokens and answer');
      assert.deepEqual(Array.from(exercise.words).sort(), Array.from(exercise.correctOrder).sort(),
        unit.id + ' ordering tokens must match the canonical answer');
      assert.ok((exercise.explanation || '').includes(exercise.correctOrder.join(' ')),
        unit.id + ' ordering feedback must reproduce the canonical answer');
    }
  }
});

test('A2 U13-U16 meaning questions and ordering feedback match their canonical vocabulary', () => {
  const units = a2.units.slice(12, 16);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u13', 'a2_u14', 'a2_u15', 'a2_u16']);

  for (const unit of units) {
    const vocabulary = new Map(unit.vocab.map(word => [word.id, word]));
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    const meaningExercises = exercises.filter(exercise =>
      exercise.type === 'mc' && /qué significa/i.test(exercise.prompt || '')
    );
    assert.ok(meaningExercises.length > 0, unit.id + ' should include vocabulary-meaning questions');

    for (const exercise of meaningExercises) {
      const word = vocabulary.get(exercise.vocabId);
      assert.ok(word, unit.id + ' meaning question must reference vocabulary introduced in the same unit');
      assert.ok(Array.isArray(exercise.options), unit.id + ' meaning question must provide options');
      assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length,
        unit.id + ' meaning question must have a valid answer index');
      assert.equal(exercise.options[exercise.answer], word.esp,
        unit.id + ' correct meaning option must match the canonical Spanish gloss for ' + word.idn);
      assert.ok((exercise.explanation || '').toLowerCase().includes(word.idn.toLowerCase()),
        unit.id + ' feedback should identify the vocabulary item being explained');
    }

    for (const exercise of exercises.filter(item => item.type === 'order')) {
      assert.ok(Array.isArray(exercise.words) && Array.isArray(exercise.correctOrder),
        unit.id + ' ordering exercise must define its tokens and answer');
      assert.deepEqual(Array.from(exercise.words).sort(), Array.from(exercise.correctOrder).sort(),
        unit.id + ' ordering tokens must match the canonical answer');
      assert.ok((exercise.explanation || '').includes(exercise.correctOrder.join(' ')),
        unit.id + ' ordering feedback must reproduce the canonical answer');
    }
  }
});
