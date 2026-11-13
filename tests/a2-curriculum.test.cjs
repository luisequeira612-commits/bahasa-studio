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

test('the first four A2 units have five authored lessons, varied practice, listening, and production', () => {
  const allVocabIds = new Set(courseData.levels.flatMap(level => level.units.flatMap(unit => unit.vocab || [])).map(word => word.id));
  const a1Forms = new Set(courseData.levels.find(level => level.id === 'A1').units.flatMap(unit => unit.vocab).map(word => word.idn.trim().toLowerCase()));
  for (const unit of a2.units.slice(0, 4)) {
    assert.ok(unit.vocab.length >= 4, unit.id + ' should introduce vocabulary');
    assert.ok(Array.isArray(unit.lessons) && unit.lessons.length === 5,
      unit.id + ' should contain five authored lessons');
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
      if ((lesson.vocabIds || []).length === 0) {
        assert.match(lesson.title, /Recuperación espaciada/, lesson.title + ' should be an authored retrieval lesson');
        assert.deepEqual([...new Set(lesson.reviewVocabIds || [])].sort(), [...unitVocabIds].sort(),
          lesson.title + ' should retrieve all unit vocabulary without introducing it again');
        assert.ok((lesson.exercises || []).length >= 3, lesson.title + ' should contain its own didactic exercises');
      } else {
        for (const id of lesson.vocabIds) assert.ok(unitVocabIds.has(id), unit.id + ' lesson references unknown new vocabulary');
      }
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


test('A2 units 5-8 teach ber- and meN- forms in five authored lessons', () => {
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
    assert.equal(unit.lessons.length, 5, unit.id + ' should have five authored lessons');
    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    const retrieval = unit.lessons[4];
    assert.deepEqual([...(retrieval.vocabIds || [])], [], unit.id + ' retrieval lesson must not reintroduce new vocabulary');
    assert.deepEqual([...new Set(retrieval.reviewVocabIds || [])].sort(), [...unitVocabIds].sort(),
      unit.id + ' retrieval lesson must review all vocabulary already taught');
    assert.equal((retrieval.exercises || []).length, 5, unit.id + ' retrieval lesson must contain five didactic exercises');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.equal(exercises.length, 22, unit.id + ' should have 22 exercises across five authored lessons');
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
        if (exercise.type === 'write') {
          const target = unit.vocab.find(word => word.id === exercise.vocabId);
          assert.ok(target, unit.id + ' writing exercise must target vocabulary introduced in its unit');
          assert.ok(exercise.modelAnswer && exercise.modelAnswer.toLocaleLowerCase().includes(target.idn.toLocaleLowerCase()),
            unit.id + ' writing model answer must include the requested form ' + target.idn);
          assert.ok(exercise.prompt && exercise.prompt.toLocaleLowerCase().includes(target.idn.toLocaleLowerCase()),
            unit.id + ' writing prompt must name the form being practiced ' + target.idn);
        }
      }
    }
    for (const word of unit.vocab) {
      assert.ok(!a1Forms.has(word.idn.trim().toLowerCase()), unit.id + ' must not repeat A1 vocabulary: ' + word.idn);
    }
  }
});


test('A2 U7 menggunakan examples make the intended use context explicit', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u7');
  const word = unit.vocab.find(entry => entry.id === 'a2u7_menggunakan');
  const writing = unit.lessons.flatMap(lesson => lesson.exercises || [])
    .find(exercise => exercise.type === 'write' && exercise.vocabId === word.id);
  assert.equal(word.ex, 'Saya menggunakan buku ini untuk belajar.');
  assert.equal(word.exEsp, 'Uso este libro para estudiar.');
  assert.ok(writing);
  assert.equal(writing.modelAnswer, word.ex);
  assert.equal(writing.hint, 'Puedes tomar como modelo: ' + word.ex);
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
    assert.equal(unit.lessons.length, 5, unit.id + ' should have five authored lessons');
    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    const retrieval = unit.lessons[4];
    assert.deepEqual([...(retrieval.vocabIds || [])], [], unit.id + ' retrieval lesson must not introduce vocabulary again');
    assert.deepEqual([...new Set(retrieval.reviewVocabIds || [])].sort(), [...unitVocabIds].sort(),
      unit.id + ' retrieval lesson must review all twelve unit vocabulary items');
    assert.equal((retrieval.exercises || []).length, 5, unit.id + ' retrieval lesson must contain five didactic exercises');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.equal(exercises.length, 22, unit.id + ' should have 22 exercises across five lessons');
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


test('A2 units 13-16 teach shopping, travel, invitations, and experiences in five authored lessons', () => {
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
    assert.equal(unit.lessons.length, 5, unit.id + ' should have five authored lessons');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.equal(exercises.length, 29, unit.id + ' should have 29 exercises across five authored lessons');
    const retrieval = unit.lessons[4];
    assert.deepEqual(Array.from(retrieval.vocabIds || []), [], unit.id + ' retrieval lesson must not introduce new vocabulary');
    assert.deepEqual(Array.from(retrieval.reviewVocabIds || []).sort(), Array.from(unit.vocab, word => word.id).sort(),
      unit.id + ' retrieval lesson must review every unit vocabulary item');
    assert.equal(retrieval.exercises.length, 12, unit.id + ' retrieval lesson must practise all twelve words');
    assert.deepEqual([...new Set(retrieval.exercises.map(exercise => exercise.vocabId))].sort(),
      Array.from(unit.vocab, word => word.id).sort(), unit.id + ' retrieval exercises must cover every word');
    assert.equal(new Set(retrieval.exercises.map(exercise => exercise.type)).size, 5,
      unit.id + ' retrieval lesson must vary exercise types');
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
    assert.equal(unit.lessons.length, 5, unit.id + ' should have five authored lessons');
    const exercises = unit.lessons.flatMap(lesson => lesson.exercises || []);
    assert.equal(exercises.length, 29, unit.id + ' should have 29 exercises across five authored lessons');
    const retrieval = unit.lessons[4];
    assert.deepEqual(Array.from(retrieval.vocabIds || []), [], unit.id + ' retrieval lesson must not introduce new vocabulary');
    assert.deepEqual(Array.from(retrieval.reviewVocabIds || []).sort(), Array.from(unit.vocab, word => word.id).sort(),
      unit.id + ' retrieval lesson must review every unit vocabulary item');
    assert.equal(retrieval.exercises.length, 12, unit.id + ' retrieval lesson must practise all twelve words');
    assert.deepEqual([...new Set(retrieval.exercises.map(exercise => exercise.vocabId))].sort(),
      Array.from(unit.vocab, word => word.id).sort(), unit.id + ' retrieval exercises must cover every word');
    assert.equal(new Set(retrieval.exercises.map(exercise => exercise.type)).size, 5,
      unit.id + ' retrieval lesson must vary exercise types');
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

test('A2 level release is independent and A2/B1/B2 unit entry follows sequential progression', () => {
  const newIds = a2.units.flatMap(unit => unit.vocab.map(word => word.id));
  assert.equal(new Set(newIds).size, newIds.length, 'new A2 vocabulary identifiers must be unique');
  assert.match(html, /function getLearningLevels\(\)[\s\S]*?level\.id !== 'A2' \|\| A2_RELEASE_ENABLED/);
  assert.match(html, /level\.id !== 'B2'/,
    'B2 remains outside the ordinary learner-facing vocabulary and review pool');

  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const api = vm.runInNewContext(html.slice(start, end) +
    '\nconst A2_RELEASE_ENABLED = true; ({ CourseData, isUnitUnlocked })');
  const levels = api.CourseData.levels;
  const a1Level = levels.find(level => level.id === 'A1');
  const a2Level = levels.find(level => level.id === 'A2');
  const b1Level = levels.find(level => level.id === 'B1');
  const b2Level = levels.find(level => level.id === 'B2');
  const allA1 = a1Level.units.map(unit => unit.id);
  const allA1A2 = allA1.concat(a2Level.units.map(unit => unit.id));
  const allA1A2B1 = allA1A2.concat(b1Level.units.map(unit => unit.id));
  assert.equal(api.isUnitUnlocked(a2Level, a2Level.units[0], [], [], []), false);
  assert.equal(api.isUnitUnlocked(a2Level, a2Level.units[0], allA1, [], []), true);
  assert.equal(api.isUnitUnlocked(b1Level, b1Level.units[0], allA1, [], []), false);
  assert.equal(api.isUnitUnlocked(b1Level, b1Level.units[0], allA1A2, [], []), true);
  assert.equal(api.isUnitUnlocked(b2Level, b2Level.units[0], allA1A2B1, [], []), true);
  assert.equal(api.isUnitUnlocked(b2Level, b2Level.units[0], allA1A2B1, [], [b2Level.units[0].id]), true);
  assert.doesNotMatch(html, /!\['B1', 'B2'\]\.includes\(level\.id\)/);
});

test('A2 beta disclosure and level release switch remain visible without bypassing unit sequence', () => {
  assert.match(htmlSource, /const A2_RELEASE_ENABLED = true;/);
  assert.match(htmlSource, /return getLevels\(\)\.filter\(level =>[\s\S]*?level\.id !== 'A2' \|\| A2_RELEASE_ENABLED/);
  assert.match(htmlSource, /if \(level\.id === 'A2'\)/);
  assert.match(htmlSource, /Beta · en revisión/);
  assert.match(htmlSource, /Disponible en beta sin requisito de completar A1/);
  assert.match(htmlSource, /if \(levelId === 'A2' && !A2_RELEASE_ENABLED\) return;/);
  assert.match(htmlSource, /if \(level\.id === 'A2' && !A2_RELEASE_ENABLED\) return false;/);
  assert.match(htmlSource, /function isUnitUnlocked\(level, unit/);
  assert.match(htmlSource, /const previousLevel = levels\[levelIndex - 1\]/);
  assert.match(htmlSource, /!isUnitUnlocked\(level, unit\)/);
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
  assert.deepEqual(Array.from(a2.units.slice(0, 4), unit => unit.lessons.reduce((sum, lesson) => sum + (lesson.exercises || []).length, 0)), [26, 22, 22, 22]);
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
    { lesson: 'Equipaje, puertos y billetes', vocabId: 'a2u14_bagasi', type: 'write', answer: 'Bagasi saya berat.' },
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


test('A2 U15 meeting listening example matches the meaning of pertemuan', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u15');
  assert.ok(unit);
  const lesson = unit.lessons.find(entry => entry.title === 'Lección 4: Organizar y cambiar planes');
  assert.ok(lesson);
  assert.match(lesson.objective, /reunión/i);
  assert.match(lesson.grammar, /pertemuan, reunión/i);
  const exercise = lesson.exercises.find(entry => entry.vocabId === 'a2u15_pertemuan' && entry.type === 'listen');
  assert.ok(exercise);
  assert.equal(exercise.answer, 'Ada pertemuan hari ini.');
  assert.match(exercise.explanation, /pertemuan/i);
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
  assert.equal(exercise.prompt, 'Traduce usando «Mencatat»: Anoto una dirección.');
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
      const normalizeAnswer = value => String(value).normalize('NFC').toLocaleLowerCase()
        .replace(/[.,!?;:«»\"“”]/g, ' ').replace(/\s+/g, ' ').trim();
      assert.ok(normalizeAnswer(exercise.explanation || '').includes(normalizeAnswer(exercise.correctOrder.join(' '))),
        unit.id + ' ordering feedback must reproduce the canonical answer, allowing punctuation differences');
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

test('A2 U1-U4 vocabulary-meaning questions and ordering feedback match their canonical data', () => {
  const units = a2.units.slice(0, 4);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u1', 'a2_u2', 'a2_u3', 'a2_u4']);

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
      const normalizeGloss = value => String(value).normalize('NFC').toLocaleLowerCase()
        .replace(/\/a\b/g, '').replace(/\s+/g, ' ').trim();
      const acceptedGlosses = [String(word.esp), ...String(word.esp).split(';')].map(normalizeGloss);
      assert.ok(acceptedGlosses.includes(normalizeGloss(exercise.options[exercise.answer])),
        unit.id + ' correct meaning option must match one of the canonical Spanish glosses for ' + word.idn);
      assert.ok((exercise.explanation || '').toLowerCase().includes(word.idn.toLowerCase()),
        unit.id + ' feedback should identify the vocabulary item being explained');
    }

    for (const exercise of exercises.filter(item => item.type === 'order')) {
      assert.ok(Array.isArray(exercise.words) && Array.isArray(exercise.correctOrder),
        unit.id + ' ordering exercise must define its tokens and answer');
      assert.deepEqual(Array.from(exercise.words).sort(), Array.from(exercise.correctOrder).sort(),
        unit.id + ' ordering tokens must match the canonical answer');
      const normalizeAnswer = value => String(value).normalize('NFC').toLocaleLowerCase()
        .replace(/[.,!?;:«»\"“”]/g, ' ').replace(/\s+/g, ' ').trim();
      assert.ok(normalizeAnswer(exercise.explanation || '').includes(normalizeAnswer(exercise.correctOrder.join(' '))),
        unit.id + ' ordering feedback must reproduce the canonical answer, allowing punctuation differences');
    }
  }
});


test('A2 U5-U8 editorial audit records bounded findings without claiming linguistic certification', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs/A2-UNITS-05-08-AUDIT.md'), 'utf8');
  for (const unit of ['U5', 'U6', 'U7', 'U8']) assert.match(audit, new RegExp('\\b' + unit + '\\b'));
  assert.match(audit, /48 entradas/);
  assert.match(audit, /revisión lingüística independiente pendiente/);
  assert.match(audit, /No se usó KBBI como bloqueo/);
  assert.match(audit, /No hubo hablante nativo disponible/);
  assert.match(audit, /Saya menggunakan buku/);
  assert.match(audit, /sin introducir vocabulario nuevo no enseñado/);
});

test('A2 U9-U12 editorial audit records bounded findings without claiming linguistic certification', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs/A2-UNITS-09-12-AUDIT.md'), 'utf8');
  for (const unit of ['U9', 'U10', 'U11', 'U12']) assert.match(audit, new RegExp('\\b' + unit + '\\b'));
  assert.match(audit, /48 entradas/);
  assert.match(audit, /16 lecciones/);
  assert.match(audit, /68 ejercicios/);
  assert.match(audit, /revisión lingüística independiente pendiente/);
  assert.match(audit, /No hubo hablante nativo disponible/);
  assert.match(audit, /KBBI no es requisito/);
  assert.match(audit, /sin asumir que una traducción española cubre todos los contextos/);
  assert.match(audit, /No se modificaron IndexedDB, el formato de backup v3/);
});

test('A2 U14 and U16 lesson headings and objectives match their taught vocabulary', () => {
  const u14 = a2.units.find(unit => unit.id === 'a2_u14');
  const u14Lesson = u14.lessons[1];
  assert.equal(u14Lesson.title, 'Lección 2: Equipaje, puertos y billetes');
  assert.deepEqual(Array.from(u14Lesson.vocabIds), ['a2u14_bagasi', 'a2u14_pelabuhan', 'a2u14_karcis']);

  const u16 = a2.units.find(unit => unit.id === 'a2_u16');
  const u16Lesson = u16.lessons[3];
  assert.equal(u16Lesson.objective, 'Describe una experiencia mediante fotografías y paisajes.');
  assert.deepEqual(Array.from(u16Lesson.vocabIds), ['a2u16_berfoto', 'a2u16_pemandangan', 'a2u16_menyenangkan']);
});

test('A2 U13-U16 editorial audit records bounded findings without claiming linguistic certification', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs/A2-UNITS-13-16-AUDIT.md'), 'utf8');
  for (const unit of ['U13', 'U14', 'U15', 'U16']) assert.match(audit, new RegExp('\\b' + unit + '\\b'));
  assert.match(audit, /48 entradas/);
  assert.match(audit, /16 lecciones/);
  assert.match(audit, /68 ejercicios/);
  assert.match(audit, /revisión lingüística independiente pendiente/);
  assert.match(audit, /No hubo hablante nativo disponible/);
  assert.match(audit, /KBBI no es requisito/);
  assert.match(audit, /mengundang/);
  assert.match(audit, /No se modificaron IndexedDB, el formato de backup v3/);
});

test('A2 U17-U20 editorial audit records bounded findings and preserves the pagar distinction', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs/A2-UNITS-17-20-AUDIT.md'), 'utf8');
  for (const unit of ['U17', 'U18', 'U19', 'U20']) assert.match(audit, new RegExp('\\b' + unit + '\\b'));
  assert.match(audit, /48 entradas/);
  assert.match(audit, /16 lecciones/);
  assert.match(audit, /68 ejercicios/);
  assert.match(audit, /revisión lingüística independiente pendiente/);
  assert.match(audit, /No hubo hablante nativo disponible/);
  assert.match(audit, /KBBI no es requisito/);
  assert.match(audit, /pagar.*significa «cerca»/);
  assert.match(audit, /No se modificaron IndexedDB, el formato de backup v3/);
});

test('A2 U18 explicitly distinguishes Indonesian pagar from the Spanish verb pagar', () => {
  const curriculum = fs.readFileSync(path.join(__dirname, '..', 'curriculum-a2.js'), 'utf8');
  assert.match(curriculum, /¿Qué significa «pagar»\?/);
  assert.match(curriculum, /«pagar» significa «cerca», no el verbo español «pagar»/);
  assert.match(curriculum, /Pagar rumah itu tinggi\./);
});

test('A2 U17-U20 lesson objectives and explanations name every newly introduced vocabulary item', () => {
  for (const unit of a2.units.slice(16, 20)) {
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

test('A2 U21-U24 editorial audit records bounded findings without claiming linguistic certification', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs/A2-UNITS-21-24-AUDIT.md'), 'utf8');
  for (const unit of ['U21', 'U22', 'U23', 'U24']) assert.match(audit, new RegExp('\\b' + unit + '\\b'));
  assert.match(audit, /48 entradas/);
  assert.match(audit, /16 lecciones/);
  assert.match(audit, /68 ejercicios/);
  assert.match(audit, /revisión lingüística independiente pendiente/);
  assert.match(audit, /No hubo hablante nativo disponible/);
  assert.match(audit, /KBBI no es requisito/);
  assert.match(audit, /asesoramiento financiero/);
  assert.match(audit, /No se modificaron IndexedDB, el formato de backup v3/);
});

test('A2 U21-U24 lesson explanations name every newly introduced vocabulary item', () => {
  for (const unit of a2.units.slice(20, 24)) {
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

test('A2 U25-U28 editorial audit records bounded findings without claiming linguistic certification', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs/A2-UNITS-25-28-AUDIT.md'), 'utf8');
  for (const unit of ['U25', 'U26', 'U27', 'U28']) assert.match(audit, new RegExp('\\b' + unit + '\\b'));
  assert.match(audit, /48 entradas/);
  assert.match(audit, /16 lecciones/);
  assert.match(audit, /68 ejercicios/);
  assert.match(audit, /revisión lingüística independiente pendiente/);
  assert.match(audit, /No hubo hablante nativo disponible/);
  assert.match(audit, /KBBI no es requisito/);
  assert.match(audit, /kelurahan/);
  assert.match(audit, /No se modificaron IndexedDB, el formato de backup v3/);
});

test('A2 U25 keeps bumbu and rempah as distinct contextual vocabulary targets', () => {
  const curriculum = fs.readFileSync(path.join(__dirname, '..', 'curriculum-a2.js'), 'utf8');
  assert.match(curriculum, /¿Qué significa «bumbu»?/);
  assert.match(curriculum, /La frase utiliza «rempah»/);
  assert.match(curriculum, /«bumbu» significa «Condimento»/);
});


test('A2 U29-U32 lesson explanations explicitly cover all newly introduced vocabulary', () => {
  for (const unit of a2.units.slice(28, 32)) {
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

test('A2 U29-U32 examples and exercises do not use vocabulary from a later lesson', () => {
  const normalize = value => String(value || '').toLocaleLowerCase().normalize('NFD')
    .replace(/\p{M}/gu, '').replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/\s+/g, ' ').trim();
  for (const unit of a2.units.slice(28, 32)) {
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


test('A2 U29-U32 lesson explanations explicitly cover all newly introduced vocabulary', () => {
  for (const unit of a2.units.slice(28, 32)) {
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

test('A2 U29-U32 examples and exercises do not use vocabulary from a later lesson', () => {
  const normalize = value => String(value || '').toLocaleLowerCase().normalize('NFD')
    .replace(/\p{M}/gu, '').replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/\s+/g, ' ').trim();
  for (const unit of a2.units.slice(28, 32)) {
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

test('A2 U29-U32 editorial audit records bounded findings without claiming linguistic certification', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs/A2-UNITS-29-32-AUDIT.md'), 'utf8');
  for (const unit of ['U29', 'U30', 'U31', 'U32']) assert.match(audit, new RegExp('\\b' + unit + '\\b'));
  assert.match(audit, /48 entradas/);
  assert.match(audit, /16 lecciones/);
  assert.match(audit, /68 ejercicios/);
  assert.match(audit, /revisión lingüística independiente pendiente/);
  assert.match(audit, /No hubo hablante nativo disponible/);
  assert.match(audit, /KBBI no es requisito/);
  assert.match(audit, /lereng/);
  assert.match(audit, /No se modificaron IndexedDB, el formato de backup v3/);
});

test('A2 U29-U32 audit preserves distinctions between related customer service and event terms', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs/A2-UNITS-29-32-AUDIT.md'), 'utf8');
  assert.match(audit, /pengembalian/);
  assert.match(audit, /penggantian/);
  assert.match(audit, /pernikahan/);
  assert.match(audit, /peresmian/);
});

test('A2 U33-U36 editorial audit records bounded findings without claiming linguistic certification', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs/A2-UNITS-33-36-AUDIT.md'), 'utf8');
  for (const unit of ['U33', 'U34', 'U35', 'U36']) assert.match(audit, new RegExp('\\b' + unit + '\\b'));
  assert.match(audit, /48 entradas/);
  assert.match(audit, /16 lecciones/);
  assert.match(audit, /68 ejercicios/);
  assert.match(audit, /revisión lingüística independiente pendiente/);
  assert.match(audit, /No hubo hablante nativo disponible/);
  assert.match(audit, /KBBI no es requisito/);
  assert.match(audit, /asesoramiento financiero/);
  assert.match(audit, /No se modificaron IndexedDB, el formato de backup v3/);
});

test('A2 U33-U36 audit keeps administrative, financial and decision terms distinct', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs/A2-UNITS-33-36-AUDIT.md'), 'utf8');
  assert.match(audit, /kabupaten/);
  assert.match(audit, /pemasukan/);
  assert.match(audit, /pengeluaran/);
  assert.match(audit, /keuntungan/);
  assert.match(audit, /kerugian/);
});

test('A2 U37-U40 editorial audit records bounded findings without claiming linguistic certification', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs/A2-UNITS-37-40-AUDIT.md'), 'utf8');
  for (const unit of ['U37', 'U38', 'U39', 'U40']) assert.match(audit, new RegExp('\\b' + unit + '\\b'));
  assert.match(audit, /48 entradas/);
  assert.match(audit, /16 lecciones/);
  assert.match(audit, /68 ejercicios/);
  assert.match(audit, /revisión lingüística independiente pendiente/);
  assert.match(audit, /No hubo hablante nativo disponible/);
  assert.match(audit, /KBBI no es requisito/);
  assert.match(audit, /no guía operativa oficial/);
  assert.match(audit, /No se modificaron IndexedDB, el formato de backup v3/);
});

test('A2 U37-U40 audit protects key distinctions for safety and digital vocabulary', () => {
  const audit = fs.readFileSync(path.join(__dirname, '..', 'docs/A2-UNITS-37-40-AUDIT.md'), 'utf8');
  assert.match(audit, /evakuasi/);
  assert.match(audit, /unduh/);
  assert.match(audit, /unggah/);
  assert.match(audit, /biaya masuk/);
  assert.match(audit, /tiket masuk/);
});

test('A2 U8 lesson focus, vocabulary introductions, and exercises stay aligned', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u8');
  const [lesson1, lesson2, lesson3, lesson4] = unit.lessons;
  assert.match(lesson2.title, /raíces con p inicial/i);
  assert.match(lesson2.grammar, /memakai, memilih y memesan/);
  assert.deepEqual(Array.from(lesson2.vocabIds), [
    'a2u8_memakai', 'a2u8_memilih', 'a2u8_memesan'
  ]);
  assert.match(lesson3.grammar, /memulai y meminta/);
  assert.deepEqual(Array.from(lesson3.vocabIds), [
    'a2u8_memulai', 'a2u8_meminta'
  ]);
  assert.ok(lesson3.exercises.every(exercise => exercise.vocabId !== 'a2u8_menyimpan'));
  assert.ok(lesson4.vocabIds.includes('a2u8_menyimpan'));
  assert.ok(lesson4.exercises.some(exercise =>
    exercise.vocabId === 'a2u8_menyimpan' && exercise.type === 'listen'
  ));
  for (const lesson of [lesson1, lesson2, lesson3, lesson4]) {
    const introduced = new Set([...(lesson.vocabIds || []), ...(lesson.reviewVocabIds || [])]);
    for (const exercise of lesson.exercises || []) {
      assert.ok(introduced.has(exercise.vocabId),
        lesson.title + ' must assess vocabulary introduced in that lesson or explicitly marked for review');
    }
  }
});

test('A2 U7 lesson titles and explanations describe their actual vocabulary groups', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u7');
  assert.deepEqual(Array.from(unit.lessons, lesson => lesson.title), [
    'Lección 1: Enviar, dibujar y tomar',
    'Lección 2: Enseñar, cerrar con llave y freír',
    'Lección 3: Usar, llenar y organizar',
    'Lección 4: Invitar, borrar y levantar',
    'Lección 5: Recuperación espaciada de verbos con meng-'
  ]);
  assert.match(unit.lessons[0].grammar, /mengirim.*menggambar y mengambil/);
  assert.match(unit.lessons[1].grammar, /mengunci.*mengajar y menggoreng/);
  assert.match(unit.lessons[2].grammar, /menggunakan.*mengisi y mengatur/);
  for (const lesson of unit.lessons) {
    const introduced = new Set([...(lesson.vocabIds || []), ...(lesson.reviewVocabIds || [])]);
    for (const exercise of lesson.exercises || []) {
      assert.ok(introduced.has(exercise.vocabId),
        lesson.title + ' must assess vocabulary introduced in that lesson or explicitly marked for review');
    }
  }
});

test('A2 U5-U8 lesson exercises stay aligned with introduced vocabulary and canonical feedback', () => {
  const units = a2.units.slice(4, 8);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u5', 'a2_u6', 'a2_u7', 'a2_u8']);

  for (const unit of units) {
    const vocabulary = new Map(unit.vocab.map(word => [word.id, word]));
    for (const lesson of unit.lessons) {
      const introduced = new Set([...(lesson.vocabIds || []), ...(lesson.reviewVocabIds || [])]);
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lessons must explain their focus');
      for (const exercise of lesson.exercises || []) {
        const word = vocabulary.get(exercise.vocabId);
        assert.ok(word, unit.id + ' exercises must reference vocabulary from the same unit');
        assert.ok(introduced.has(exercise.vocabId),
          lesson.title + ' must assess vocabulary introduced in that lesson or explicitly marked for review');
        assert.ok(exercise.prompt && exercise.explanation,
          lesson.title + ' exercises must include a prompt and feedback');

        if (exercise.type === 'mc') {
          assert.ok(Array.isArray(exercise.options) && exercise.options.length >= 2);
          assert.ok(Number.isInteger(exercise.answer) &&
            exercise.answer >= 0 && exercise.answer < exercise.options.length);
          assert.equal(exercise.options[exercise.answer], word.esp,
            lesson.title + ' correct meaning option must match the canonical Spanish gloss for ' + word.idn);
        } else if (exercise.type === 'order') {
          assert.ok(Array.isArray(exercise.words) && Array.isArray(exercise.correctOrder));
          assert.deepEqual(Array.from(exercise.words).sort(), Array.from(exercise.correctOrder).sort(),
            lesson.title + ' ordering tokens must match the canonical answer');
          const normalize = value => String(value).normalize('NFC').toLocaleLowerCase()
            .replace(/[.,!?;:«»"“”]/g, ' ').replace(/\s+/g, ' ').trim();
          assert.ok(normalize(exercise.explanation).includes(normalize(exercise.correctOrder.join(' '))),
            lesson.title + ' feedback must reproduce the ordering answer');
        } else if (exercise.type === 'translate_es_id' || exercise.type === 'listen') {
          assert.ok(typeof exercise.answer === 'string' && exercise.answer.trim(),
            lesson.title + ' written response exercises must have a reference answer');
        } else if (exercise.type === 'write') {
          assert.ok(typeof exercise.modelAnswer === 'string' && exercise.modelAnswer.trim(),
            lesson.title + ' writing exercises must have a model answer');
        } else {
          assert.fail(unit.id + ' contains an unreviewed exercise type: ' + exercise.type);
        }
      }
    }
  }

  const u8 = units[3];
  assert.equal(u8.lessons[0].title, 'Lección 1: Formas mem- con b inicial');
  assert.match(u8.lessons[0].grammar, /membeli, membawa y membantu/);
  assert.doesNotMatch(u8.lessons[0].grammar, /memakai|memilih/);
});


test('A2 U5-U8 never assess a new verb before its lesson introduction', () => {
  const units = a2.units.slice(4, 8);
  for (const unit of units) {
    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();
    unit.lessons.forEach((lesson, lessonIndex) => {
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitVocabIds.has(id), unit.id + ' introduces vocabulary outside its own unit: ' + id);
        assert.ok(!introducedAt.has(id), unit.id + ' introduces the same word more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every new vocabulary item in a lesson');

    unit.lessons.forEach((lesson, lessonIndex) => {
      const declaredReview = new Set(lesson.reviewVocabIds || []);
      for (const exercise of lesson.exercises || []) {
        if (!exercise.vocabId || !unitVocabIds.has(exercise.vocabId)) continue;
        const firstLesson = introducedAt.get(exercise.vocabId);
        assert.ok(Number.isInteger(firstLesson),
          unit.id + ' exercise references a new word absent from all lesson introductions: ' + exercise.vocabId);
        assert.ok(firstLesson <= lessonIndex || declaredReview.has(exercise.vocabId),
          unit.id + ' assesses ' + exercise.vocabId + ' before its introduction in lesson ' + (firstLesson + 1));
      }
    });
  }
});


test('A2 U9-U12 introduce every new vocabulary item before assessing it', () => {
  const units = a2.units.slice(8, 12);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u9', 'a2_u10', 'a2_u11', 'a2_u12']);

  for (const unit of units) {
    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();

    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lessons must explain their learning focus');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitVocabIds.has(id),
          unit.id + ' introduces vocabulary outside its own unit: ' + id);
        assert.ok(!introducedAt.has(id),
          unit.id + ' introduces the same vocabulary item more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every new vocabulary item in a lesson');

    unit.lessons.forEach((lesson, lessonIndex) => {
      const declaredReview = new Set(lesson.reviewVocabIds || []);
      for (const exercise of lesson.exercises || []) {
        const references = [
          ...(typeof exercise.vocabId === 'string' ? [exercise.vocabId] : []),
          ...(Array.isArray(exercise.vocabIds) ? exercise.vocabIds : [])
        ];
        for (const id of references) {
          if (!unitVocabIds.has(id)) continue;
          const firstLesson = introducedAt.get(id);
          assert.ok(Number.isInteger(firstLesson),
            unit.id + ' exercise references a new word absent from all lesson introductions: ' + id);
          assert.ok(firstLesson <= lessonIndex || declaredReview.has(id),
            unit.id + ' assesses ' + id + ' before its introduction in lesson ' + (firstLesson + 1));
        }
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercises must include a prompt and feedback');
      }
    });
  }
});


test('A2 U9-U12 lesson explanations cover every newly introduced vocabulary item', () => {
  for (const unit of a2.units.slice(8, 12)) {
    const vocabulary = new Map(unit.vocab.map(word => [word.id, word]));
    for (const lesson of unit.lessons) {
      const explanation = [lesson.objective, lesson.grammar].filter(Boolean).join(' ').toLocaleLowerCase();
      for (const id of lesson.vocabIds || []) {
        const word = vocabulary.get(id);
        assert.ok(word, unit.id + ' ' + lesson.title + ' must introduce a known vocabulary item: ' + id);
        assert.ok(explanation.includes(word.idn.toLocaleLowerCase()),
          unit.id + ' ' + lesson.title + ' should explain newly introduced vocabulary: ' + word.idn);
      }
    }
  }
});

test('A2 U13-U16 introduce every new vocabulary item before assessing it', () => {
  const units = a2.units.slice(12, 16);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u13', 'a2_u14', 'a2_u15', 'a2_u16']);

  for (const unit of units) {
    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();

    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lessons must explain their learning focus');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitVocabIds.has(id),
          unit.id + ' introduces vocabulary outside its own unit: ' + id);
        assert.ok(!introducedAt.has(id),
          unit.id + ' introduces the same vocabulary item more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every new vocabulary item in a lesson');

    unit.lessons.forEach((lesson, lessonIndex) => {
      const declaredReview = new Set(lesson.reviewVocabIds || []);
      for (const exercise of lesson.exercises || []) {
        const references = [
          ...(typeof exercise.vocabId === 'string' ? [exercise.vocabId] : []),
          ...(Array.isArray(exercise.vocabIds) ? exercise.vocabIds : [])
        ];
        for (const id of references) {
          if (!unitVocabIds.has(id)) continue;
          const firstLesson = introducedAt.get(id);
          assert.ok(Number.isInteger(firstLesson),
            unit.id + ' exercise references a new word absent from all lesson introductions: ' + id);
          assert.ok(firstLesson <= lessonIndex || declaredReview.has(id),
            unit.id + ' assesses ' + id + ' before its introduction in lesson ' + (firstLesson + 1));
        }
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercises must include a prompt and feedback');
      }
    });
  }
});


test('A2 U17-U20 introduce every new vocabulary item before assessing it', () => {
  const units = a2.units.slice(16, 20);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u17', 'a2_u18', 'a2_u19', 'a2_u20']);

  for (const unit of units) {
    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();

    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lessons must explain their learning focus');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitVocabIds.has(id),
          unit.id + ' introduces vocabulary outside its own unit: ' + id);
        assert.ok(!introducedAt.has(id),
          unit.id + ' introduces the same vocabulary item more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every new vocabulary item in a lesson');

    unit.lessons.forEach((lesson, lessonIndex) => {
      const declaredReview = new Set(lesson.reviewVocabIds || []);
      for (const exercise of lesson.exercises || []) {
        const references = [
          ...(typeof exercise.vocabId === 'string' ? [exercise.vocabId] : []),
          ...(Array.isArray(exercise.vocabIds) ? exercise.vocabIds : [])
        ];
        for (const id of references) {
          if (!unitVocabIds.has(id)) continue;
          const firstLesson = introducedAt.get(id);
          assert.ok(Number.isInteger(firstLesson),
            unit.id + ' exercise references a new word absent from all lesson introductions: ' + id);
          assert.ok(firstLesson <= lessonIndex || declaredReview.has(id),
            unit.id + ' assesses ' + id + ' before its introduction in lesson ' + (firstLesson + 1));
        }
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercises must include a prompt and feedback');
      }
    });
  }
});


test('A2 U21-U24 introduce every new vocabulary item before assessing it', () => {
  const units = a2.units.slice(20, 24);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u21', 'a2_u22', 'a2_u23', 'a2_u24']);

  for (const unit of units) {
    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();

    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lessons must explain their learning focus');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitVocabIds.has(id),
          unit.id + ' introduces vocabulary outside its own unit: ' + id);
        assert.ok(!introducedAt.has(id),
          unit.id + ' introduces the same vocabulary item more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every new vocabulary item in a lesson');

    unit.lessons.forEach((lesson, lessonIndex) => {
      const declaredReview = new Set(lesson.reviewVocabIds || []);
      for (const exercise of lesson.exercises || []) {
        const references = [
          ...(typeof exercise.vocabId === 'string' ? [exercise.vocabId] : []),
          ...(Array.isArray(exercise.vocabIds) ? exercise.vocabIds : [])
        ];
        for (const id of references) {
          if (!unitVocabIds.has(id)) continue;
          const firstLesson = introducedAt.get(id);
          assert.ok(Number.isInteger(firstLesson),
            unit.id + ' exercise references a new word absent from all lesson introductions: ' + id);
          assert.ok(firstLesson <= lessonIndex || declaredReview.has(id),
            unit.id + ' assesses ' + id + ' before its introduction in lesson ' + (firstLesson + 1));
        }
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercises must include a prompt and feedback');
      }
    });
  }
});


test('A2 U25-U28 introduce every new vocabulary item before assessing it', () => {
  const units = a2.units.slice(24, 28);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u25', 'a2_u26', 'a2_u27', 'a2_u28']);

  for (const unit of units) {
    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();

    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lessons must explain their learning focus');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitVocabIds.has(id),
          unit.id + ' introduces vocabulary outside its own unit: ' + id);
        assert.ok(!introducedAt.has(id),
          unit.id + ' introduces the same vocabulary item more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every new vocabulary item in a lesson');

    unit.lessons.forEach((lesson, lessonIndex) => {
      const declaredReview = new Set(lesson.reviewVocabIds || []);
      for (const exercise of lesson.exercises || []) {
        const references = [
          ...(typeof exercise.vocabId === 'string' ? [exercise.vocabId] : []),
          ...(Array.isArray(exercise.vocabIds) ? exercise.vocabIds : [])
        ];
        for (const id of references) {
          if (!unitVocabIds.has(id)) continue;
          const firstLesson = introducedAt.get(id);
          assert.ok(Number.isInteger(firstLesson),
            unit.id + ' exercise references a new word absent from all lesson introductions: ' + id);
          assert.ok(firstLesson <= lessonIndex || declaredReview.has(id),
            unit.id + ' assesses ' + id + ' before its introduction in lesson ' + (firstLesson + 1));
        }
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercises must include a prompt and feedback');
      }
    });
  }
});


test('A2 U29-U32 introduce every new vocabulary item before assessing it', () => {
  const units = a2.units.slice(28, 32);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u29', 'a2_u30', 'a2_u31', 'a2_u32']);

  for (const unit of units) {
    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();

    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lessons must explain their learning focus');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitVocabIds.has(id),
          unit.id + ' introduces vocabulary outside its own unit: ' + id);
        assert.ok(!introducedAt.has(id),
          unit.id + ' introduces the same vocabulary item more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every new vocabulary item in a lesson');

    unit.lessons.forEach((lesson, lessonIndex) => {
      const declaredReview = new Set(lesson.reviewVocabIds || []);
      for (const exercise of lesson.exercises || []) {
        const references = [
          ...(typeof exercise.vocabId === 'string' ? [exercise.vocabId] : []),
          ...(Array.isArray(exercise.vocabIds) ? exercise.vocabIds : [])
        ];
        for (const id of references) {
          if (!unitVocabIds.has(id)) continue;
          const firstLesson = introducedAt.get(id);
          assert.ok(Number.isInteger(firstLesson),
            unit.id + ' exercise references a new word absent from all lesson introductions: ' + id);
          assert.ok(firstLesson <= lessonIndex || declaredReview.has(id),
            unit.id + ' assesses ' + id + ' before its introduction in lesson ' + (firstLesson + 1));
        }
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercises must include a prompt and feedback');
      }
    });
  }
});


test('A2 U33-U36 introduce every new vocabulary item before assessing it', () => {
  const units = a2.units.slice(32, 36);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u33', 'a2_u34', 'a2_u35', 'a2_u36']);

  for (const unit of units) {
    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();

    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lessons must explain their learning focus');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitVocabIds.has(id),
          unit.id + ' introduces vocabulary outside its own unit: ' + id);
        assert.ok(!introducedAt.has(id),
          unit.id + ' introduces the same vocabulary item more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every new vocabulary item in a lesson');

    unit.lessons.forEach((lesson, lessonIndex) => {
      const declaredReview = new Set(lesson.reviewVocabIds || []);
      for (const exercise of lesson.exercises || []) {
        const references = [
          ...(typeof exercise.vocabId === 'string' ? [exercise.vocabId] : []),
          ...(Array.isArray(exercise.vocabIds) ? exercise.vocabIds : [])
        ];
        for (const id of references) {
          if (!unitVocabIds.has(id)) continue;
          const firstLesson = introducedAt.get(id);
          assert.ok(Number.isInteger(firstLesson),
            unit.id + ' exercise references a new word absent from all lesson introductions: ' + id);
          assert.ok(firstLesson <= lessonIndex || declaredReview.has(id),
            unit.id + ' assesses ' + id + ' before its introduction in lesson ' + (firstLesson + 1));
        }
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercises must include a prompt and feedback');
      }
    });
  }
});


test('A2 U37-U40 introduce every new vocabulary item before assessing it', () => {
  const units = a2.units.slice(36, 40);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u37', 'a2_u38', 'a2_u39', 'a2_u40']);

  for (const unit of units) {
    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    const introducedAt = new Map();

    unit.lessons.forEach((lesson, lessonIndex) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar,
        unit.id + ' lessons must explain their learning focus');
      for (const id of lesson.vocabIds || []) {
        assert.ok(unitVocabIds.has(id),
          unit.id + ' introduces vocabulary outside its own unit: ' + id);
        assert.ok(!introducedAt.has(id),
          unit.id + ' introduces the same vocabulary item more than once: ' + id);
        introducedAt.set(id, lessonIndex);
      }
    });

    assert.equal(introducedAt.size, unit.vocab.length,
      unit.id + ' must introduce every new vocabulary item in a lesson');

    unit.lessons.forEach((lesson, lessonIndex) => {
      const declaredReview = new Set(lesson.reviewVocabIds || []);
      for (const exercise of lesson.exercises || []) {
        const references = [
          ...(typeof exercise.vocabId === 'string' ? [exercise.vocabId] : []),
          ...(Array.isArray(exercise.vocabIds) ? exercise.vocabIds : [])
        ];
        for (const id of references) {
          if (!unitVocabIds.has(id)) continue;
          const firstLesson = introducedAt.get(id);
          assert.ok(Number.isInteger(firstLesson),
            unit.id + ' exercise references a new word absent from all lesson introductions: ' + id);
          assert.ok(firstLesson <= lessonIndex || declaredReview.has(id),
            unit.id + ' assesses ' + id + ' before its introduction in lesson ' + (firstLesson + 1));
        }
        assert.ok(exercise.prompt && exercise.explanation,
          unit.id + ' exercises must include a prompt and feedback');
      }
    });
  }
});

test('A2 units 5-8 align each lesson explanation and exercise with vocabulary introduced so far', () => {
  const units = a2.units.slice(4, 8);
  assert.deepEqual(Array.from(units, unit => unit.id), ['a2_u5', 'a2_u6', 'a2_u7', 'a2_u8']);

  for (const unit of units) {
    const vocabularyById = new Map(unit.vocab.map(word => [word.id, word]));
    const introducedSoFar = new Set();

    for (const lesson of unit.lessons) {
      const introducedHere = Array.isArray(lesson.vocabIds) ? lesson.vocabIds : [];
      const reviewHere = Array.isArray(lesson.reviewVocabIds) ? lesson.reviewVocabIds : [];
      if (introducedHere.length === 0) {
        assert.match(lesson.title, /Recuperación espaciada/, unit.id + ' ' + lesson.title + ' should be an authored retrieval lesson');
        assert.deepEqual([...new Set(reviewHere)].sort(), [...vocabularyById.keys()].sort(),
          unit.id + ' retrieval lesson should cover every unit vocabulary item');
      }
      const explanation = String(lesson.grammar || '').toLocaleLowerCase();

      for (const id of introducedHere) {
        const word = vocabularyById.get(id);
        assert.ok(word, unit.id + ' ' + lesson.title + ' introduces an unknown vocabulary ID: ' + id);
        assert.ok(explanation.includes(word.idn.toLocaleLowerCase()),
          unit.id + ' ' + lesson.title + ' should explain the newly introduced form ' + word.idn);
        assert.ok(!introducedSoFar.has(id), unit.id + ' should not introduce ' + id + ' more than once');
      }

      const availableInLesson = new Set([...introducedSoFar, ...introducedHere, ...reviewHere]);
      for (const exercise of lesson.exercises || []) {
        assert.ok(exercise.vocabId && vocabularyById.has(exercise.vocabId),
          unit.id + ' ' + lesson.title + ' exercise must reference vocabulary from its unit');
        assert.ok(availableInLesson.has(exercise.vocabId),
          unit.id + ' ' + lesson.title + ' exercise uses vocabulary before its lesson introduction: ' + exercise.vocabId);
      }

      introducedHere.forEach(id => introducedSoFar.add(id));
    }

    assert.equal(introducedSoFar.size, unit.vocab.length,
      unit.id + ' should introduce every vocabulary item exactly once across its lessons');
  }
});


test('A2 U8 menyediakan is translated as providing or supplying water', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u8');
  const word = unit.vocab.find(entry => entry.id === 'a2u8_menyediakan');
  assert.equal(word.esp, 'Proporcionar; suministrar');
  assert.equal(word.exEsp, 'Proporcionamos agua.');
});


test('A2 U8 menyediakan follows the same meny- pattern as other s-initial roots', () => {
  const unit = a2.units.find(entry => entry.id === 'a2_u8');
  const lesson = unit.lessons.find(entry => entry.title.includes('meny-'));
  const word = unit.vocab.find(entry => entry.id === 'a2u8_menyediakan');
  const exercise = lesson.exercises.find(entry => entry.vocabId === word.id);
  assert.ok(lesson.grammar.includes('sedia → menyediakan'));
  assert.equal(word.idn, 'Menyediakan');
  assert.equal(word.esp, 'Proporcionar; suministrar');
  assert.equal(word.ex, 'Kami menyediakan air.');
  assert.equal(exercise.type, 'write');
  assert.equal(exercise.modelAnswer, word.ex);
});
