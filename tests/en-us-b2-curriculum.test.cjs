'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const blockFiles = [
  'units-01-04.js', 'units-05-08.js', 'units-09-12.js',
  'units-11-14.js', 'units-15-18.js', 'units-19-20.js',
  'units-21-24.js', 'units-25-28.js', 'units-29-30.js',
  'units-31-34.js', 'units-35-38.js', 'units-39-40.js',
  'units-41-44.js', 'units-45-48.js', 'units-49-50.js',
  'units-51-54.js', 'units-55-58.js', 'units-59-60.js',
];

function loadB2() {
  const context = vm.createContext({});
  context.window = context;
  for (const file of blockFiles) {
    const filename = path.join(root, 'languages/en/curriculum/b2', file);
    vm.runInContext(fs.readFileSync(filename, 'utf8'), context, {
      filename,
      timeout: 5000,
    });
  }
  const blocks = context.GUARDI_CURRICULUM_BLOCKS?.en?.B2;
  assert.ok(blocks, 'English B2 blocks must register in the curriculum namespace');
  return Object.values(blocks).flatMap((block) => Array.from(block.units || []));
}

test('English B2 U5–U8 source registers its curriculum block only once', () => {
  const filename = path.join(root, 'languages/en/curriculum/b2/units-05-08.js');
  const source = fs.readFileSync(filename, 'utf8');
  assert.equal((source.match(/\(function\(root\)\{/g) || []).length, 1);
});

test('American English B2 has 60 sequential units with five lessons and 20 activities each', () => {
  const units = loadB2();
  assert.equal(units.length, 60);
  const numbers = units.map((unit) => unit.unitNumber).sort((a, b) => a - b);
  assert.deepEqual(numbers, Array.from({ length: 60 }, (_, index) => index + 1));
  assert.equal(new Set(numbers).size, 60);

  for (const unit of units) {
    assert.equal(unit.id, 'en_b2_u' + unit.unitNumber);
    assert.equal(unit.lessons.length, 5, unit.id + ' must have five lessons');
    const lessonActivities = unit.lessons.reduce((sum, lesson) => {
      assert.ok(lesson.title && lesson.objective && lesson.grammar, unit.id + ' lesson metadata');
      assert.equal(lesson.exercises.length, 2, unit.id + ' lessons must have two activities each');
      return sum + lesson.exercises.length;
    }, 0);
    assert.equal((unit.exercises || []).length + lessonActivities, 20,
      unit.id + ' must have 20 total activities');
    const allActivities = [
      ...(unit.exercises || []),
      ...(unit.lessons || []).flatMap((lesson) => lesson.exercises || []),
    ];
    const answerPositions = new Set(allActivities
      .filter((exercise) => exercise.type === 'mc')
      .map((exercise) => exercise.answer));
    assert.ok(answerPositions.size > 1,
      unit.id + ' must vary correct multiple-choice answer positions');
  }
});

test('B2 vocabulary is unique, complete, and absent from all six review units', () => {
  const units = loadB2();
  const contentUnits = units.filter((unit) => unit.unitNumber % 10 !== 0);
  const reviewUnits = units.filter((unit) => unit.unitNumber % 10 === 0);
  assert.equal(contentUnits.length, 54);
  assert.equal(reviewUnits.length, 6);

  const vocabulary = contentUnits.flatMap((unit) => Array.from(unit.vocab || []));
  assert.equal(vocabulary.length, 1188);
  assert.equal(new Set(vocabulary.map((word) => word.id)).size, 1188,
    'vocabulary IDs must be unique across B2');
  assert.equal(new Set(vocabulary.map((word) => word.target.trim().toLocaleLowerCase())).size, 1188,
    'B2 target expressions must be unique');
  for (const word of vocabulary) {
    for (const field of ['id', 'target', 'esp', 'ex', 'exEsp']) {
      assert.equal(typeof word[field], 'string', 'vocabulary ' + word.id + ' needs ' + field);
      assert.ok(word[field].trim(), 'vocabulary ' + word.id + ' needs non-empty ' + field);
    }
  }
  for (const unit of contentUnits) {
    assert.equal(unit.vocab.length, 22, unit.id + ' must add 22 new vocabulary targets');
    const lessonVocabularyIds = unit.lessons.flatMap((lesson) => Array.from(lesson.vocabIds || []));
    assert.equal(lessonVocabularyIds.length, 22,
      unit.id + ' lessons must cover all 22 vocabulary targets');
    assert.equal(new Set(lessonVocabularyIds).size, 22,
      unit.id + ' must teach each new vocabulary target in exactly one lesson');
    assert.deepEqual(
      [...lessonVocabularyIds].sort(),
      Array.from(unit.vocab, (word) => word.id).sort(),
      unit.id + ' lesson vocabulary coverage must match its unit vocabulary',
    );
  }
  for (const unit of reviewUnits) {
    assert.equal(unit.vocab.length, 0, unit.id + ' must not introduce new vocabulary');
  }
});

test('all lesson and exercise vocabulary references resolve across the complete B2 level', () => {
  const units = loadB2();
  const allIds = new Set(units.flatMap((unit) => Array.from(unit.vocab || []).map((word) => word.id)));
  const references = [];
  for (const unit of units) {
    for (const lesson of unit.lessons || []) {
      for (const id of lesson.vocabIds || []) references.push({ unit: unit.unitNumber, id });
      for (const exercise of lesson.exercises || []) {
        if (exercise.vocabId) references.push({ unit: unit.unitNumber, id: exercise.vocabId });
      }
    }
    for (const exercise of unit.exercises || []) {
      if (exercise.vocabId) references.push({ unit: unit.unitNumber, id: exercise.vocabId });
    }
  }
  const unresolved = references.filter((reference) => !allIds.has(reference.id));
  assert.deepEqual(unresolved, [], 'every vocabulary reference must resolve, including review-unit references');

  const vocabularyById = new Map(units.flatMap((unit) =>
    Array.from(unit.vocab || []).map((word) => [word.id, word])));
  for (const unit of units.filter((item) => item.unitNumber % 10 !== 0)) {
    const exercises = [
      ...(unit.exercises || []),
      ...(unit.lessons || []).flatMap((lesson) => lesson.exercises || []),
    ];
    for (const exercise of exercises.filter((item) => item.type === 'mc')) {
      assert.equal(exercise.options[exercise.answer], vocabularyById.get(exercise.vocabId)?.esp,
        unit.id + ' multiple-choice answer must match its vocabulary gloss');
    }
  }
});

test('B2 uses only existing exercise types with valid answer structures', () => {
  const units = loadB2();
  const types = new Set();
  for (const unit of units) {
    const exercises = [
      ...(unit.exercises || []),
      ...(unit.lessons || []).flatMap((lesson) => lesson.exercises || []),
    ];
    for (const exercise of exercises) {
      types.add(exercise.type);
      assert.ok(exercise.prompt && exercise.explanation, unit.id + ' exercises need prompt and explanation');
      if (exercise.type === 'mc') {
        assert.ok(Array.isArray(exercise.options) && exercise.options.length >= 3);
        assert.equal(new Set(exercise.options.map((option) => option.trim().toLocaleLowerCase())).size,
          exercise.options.length, unit.id + ' multiple-choice options must be distinct');
        if (unit.unitNumber % 10 === 0) {
          const genericDistractors = new Set([
            'una posibilidad hipotética', 'un resultado aún no confirmado',
            'tener una obligación formal', 'retrasarse respecto al plazo',
            'una obligación futura', 'una certeza demostrada',
            'una expresión de posibilidad futura', 'un conector de consecuencia',
            'una petición directa', 'una afirmación absoluta',
            'una expresión de certeza absoluta', 'una condición hipotética',
            'una expresión de obligación pasada', 'una metáfora de progreso',
            'un conector de contraste',
          ]);
          for (const option of exercise.options) {
            assert.ok(!genericDistractors.has(option.trim().toLocaleLowerCase()),
              unit.id + ' review questions must use real vocabulary as distractors');
          }
        }
        assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length);
      } else if (exercise.type === 'order') {
        assert.ok(Array.isArray(exercise.words) && exercise.words.length >= 2);
        assert.ok(Array.isArray(exercise.correctOrder));
        assert.deepEqual(Array.from(exercise.words).sort(), Array.from(exercise.correctOrder).sort());
        assert.notDeepEqual(Array.from(exercise.words), Array.from(exercise.correctOrder),
          unit.id + ' sentence-building tokens must be shuffled');
      } else {
        assert.fail('Unsupported B2 exercise type: ' + exercise.type);
      }
    }
  }
  assert.deepEqual([...types].sort(), ['mc', 'order']);
});

test('editorially corrected B2 vocabulary examples stay aligned with their targets', () => {
  const units = loadB2();
  const expected = [
    [11, 'must be', 'The lights are on, so someone must be home.', 'Las luces están encendidas, así que alguien debe de estar en casa.'],
    [11, 'could be', 'This could be the source of the problem.', 'Esta podría ser la fuente del problema.'],
    [11, 'be highly likely to', 'The committee is highly likely to approve the plan.', 'Es muy probable que el comité apruebe el plan.'],
    [11, 'to point to', 'All the evidence points to a software problem.', 'Todas las pruebas apuntan a un problema de software.'],
    [12, 'should have', 'You should have checked the figures before sending the report.', 'Deberías haber revisado las cifras antes de enviar el informe.'],
    [12, "didn't need to", "We didn't need to book because the restaurant was empty.", 'No hizo falta reservar porque el local estaba vacío.'],
    [12, 'was meant to have', 'The payment was meant to have arrived yesterday.', 'Se suponía que el pago ya habría llegado ayer.'],
    [12, 'in hindsight', 'In hindsight, we should have waited.', 'Visto en retrospectiva, deberíamos haber esperado.'],
    [13, "don't have to", "You don't have to print the document.", 'No tienes que imprimir el documento.'],
    [13, 'be allowed to', 'Employees are allowed to work remotely twice a week.', 'Los empleados tienen permiso para trabajar a distancia dos veces por semana.'],
    [13, 'be advisable to', 'It is advisable to keep a copy.', 'Sería aconsejable guardar una copia.'],
    [13, 'to comply with', 'All suppliers must comply with the safety regulations.', 'Todos los proveedores deben cumplir con las normas de seguridad.'],
    [14, 'likely to', 'The new policy is likely to reduce costs.', 'Es probable que la nueva política reduzca los costos.'],
    [14, 'there is a strong possibility that', 'There is a strong possibility that the launch will be delayed.', 'Hay una gran posibilidad de que el lanzamiento se retrase.'],
    [14, 'in all likelihood', 'In all likelihood, the meeting will be postponed.', 'Con toda probabilidad, la reunión se pospondrá.'],
    [26, 'little did I know', 'Little did I know that the decision would change everything.', 'Ni me imaginaba que la decisión lo cambiaría todo.'],
    [26, 'little did we expect', 'Little did we expect the project to attract so much attention.', 'Ni por asomo esperábamos que el proyecto atrajera tanta atención.'],
    [38, "it's not ideal", 'The timing is not ideal, but we can make it work.', 'El momento no es ideal, pero podemos hacer que funcione.'],
    [51, 'to contradict a claim', 'The latest data contradict an earlier claim.', 'Los datos más recientes contradicen una afirmación anterior.'],
    [52, 'to allocate resources', 'The plan allocates resources to staff training.', 'El plan asigna recursos a la capacitación del personal.'],
    [52, 'a potential drawback', 'One potential drawback is the additional training time.', 'Un posible inconveniente es el tiempo adicional de capacitación.'],
    [54, 'to take the minutes', 'Could you take the minutes during the meeting?', '¿Podrías levantar el acta durante la reunión?'],
    [54, 'to take questions', "We'll take questions at the end of the presentation.", 'Recibiremos preguntas al final de la presentación.'],
    [55, 'to prevent a recurrence', 'Staff training should help prevent a recurrence.', 'La capacitación del personal debería ayudar a evitar que se repita.'],
    [57, 'to begin with', 'To begin with, the raw data are collected.', 'Para empezar, se recopilan los datos sin procesar.'],
    [11, 'to rule out', 'We cannot rule out a technical fault.', 'No podemos descartar una falla técnica.'],
    [25, 'the main point is that', 'The main point is that we need reliable information.', 'El punto principal es que necesitamos información confiable.'],
    [31, 'in turn', 'Better training improves confidence and, in turn, performance.', 'Una mejor capacitación aumenta la confianza y, a su vez, el rendimiento.'],
    [36, 'to be open to question', 'The reliability of the estimate remains open to question.', 'La confiabilidad de la estimación sigue siendo cuestionable.'],
    [44, 'reliability', 'System reliability is essential for public services.', 'La confiabilidad del sistema es esencial para los servicios públicos.'],
  ];

  for (const [unitNumber, target, example, translation] of expected) {
    const unit = units.find((item) => item.unitNumber === unitNumber);
    const word = unit?.vocab?.find((item) => item.target === target);
    assert.ok(word, 'expected vocabulary target must exist: U' + unitNumber + ' ' + target);
    assert.equal(word.ex, example, 'English example must match U' + unitNumber + ' ' + target);
    assert.equal(word.exEsp, translation, 'Spanish example must match U' + unitNumber + ' ' + target);
  }
});

test('English B2 U1 sentence-building bank matches each target vocabulary ID', () => {
  const unit = loadB2().find((item) => item.unitNumber === 1);
  assert.ok(unit);
  const orderExercises = Array.from(unit.exercises || []).filter((exercise) => exercise.type === 'order');
  assert.equal(orderExercises.length, 5);
  const expected = [
    ['ongoing', 'The project is ongoing, so we cannot report final results yet.'],
    ['so far', 'So far, the results have been encouraging.'],
    ['lately', "I've been feeling unusually tired lately."],
    ['since then', 'The team has worked remotely since then.'],
    ['to undergo', 'The hospital has undergone a major upgrade.'],
  ];
  for (let index = 0; index < expected.length; index += 1) {
    const [target, sentence] = expected[index];
    const vocabulary = unit.vocab.find((word) => word.target === target);
    assert.ok(vocabulary, 'U1 target must exist: ' + target);
    assert.equal(orderExercises[index].vocabId, vocabulary.id);
    assert.deepEqual(Array.from(orderExercises[index].correctOrder), sentence
      .replace(/[.,!?;:]/g, '').trim().split(/\s+/));
  }
});


test('English B2 U40 review sentence bank keeps each example paired with its source vocabulary', () => {
  const units = loadB2();
  const unit = units.find((item) => item.unitNumber === 40);
  assert.ok(unit);
  const allVocabulary = units.flatMap((item) => Array.from(item.vocab || []));
  const orderExercises = Array.from(unit.exercises || []).filter((exercise) => exercise.type === 'order');
  const expected = [
    ['to put forward an argument', 'The researchers put forward an argument for stricter standards.'],
    ['to acknowledge an objection', 'We should acknowledge the objection before responding.'],
    ['to pick up on that', "I'd like to pick up on that point about costs."],
    ['I was wondering if', 'I was wondering if you could send the details today.'],
    ['to be in a position to', 'We are now in a position to make a final recommendation.'],
  ];
  assert.equal(orderExercises.length, expected.length);
  for (let index = 0; index < expected.length; index += 1) {
    const [target, sentence] = expected[index];
    const vocabulary = allVocabulary.find((word) => word.target === target);
    assert.ok(vocabulary, 'review target must exist: ' + target);
    assert.equal(orderExercises[index].vocabId, vocabulary.id);
    assert.deepEqual(Array.from(orderExercises[index].correctOrder), sentence
      .replace(/[.,!?;:]/g, '').trim().split(/\s+/));
  }
});


test('English B2 U49–U50 and U59–U60 keep review lessons aligned with their vocabulary', () => {
  const units = loadB2();
  const getUnit = (number) => {
    const unit = units.find((item) => item.unitNumber === number);
    assert.ok(unit, 'B2 unit must exist: U' + number);
    return unit;
  };

  const u49 = getUnit(49);
  assert.match(u49.trap.detail, /Vulnerable to y susceptible to/);
  assert.doesNotMatch(u49.trap.detail, /Prone to/);
  assert.match(u49.lessons[0].grammar, /be vulnerable to/);
  assert.match(u49.lessons[4].grammar, /Avoid ambiguity/);
  assert.match(u49.lessons[4].grammar, /more precisely/);

  for (const number of [50, 60]) {
    const unit = getUnit(number);
    assert.equal(unit.lessons.length, 5);
    for (const lesson of unit.lessons) {
      const orderExercise = Array.from(lesson.exercises || []).find((exercise) => exercise.type === 'order');
      assert.ok(orderExercise, 'review lesson must contain an order exercise: U' + number + ' ' + lesson.title);
      assert.equal(orderExercise.vocabId, lesson.reviewVocabIds[1]);
    }
  }

  const u59 = getUnit(59);
  assert.equal(u59.lessons.length, 5);
  for (const lesson of u59.lessons) {
    const orderExercise = Array.from(lesson.exercises || []).find((exercise) => exercise.type === 'order');
    assert.ok(orderExercise, 'integrated lesson must contain an order exercise: ' + lesson.title);
    assert.equal(orderExercise.vocabId, lesson.vocabIds[1]);
    const target = u59.vocab.find((word) => word.id === orderExercise.vocabId);
    assert.ok(target);
    assert.deepEqual(Array.from(orderExercise.correctOrder), target.ex
      .replace(/[.,!?;:]/g, '').trim().split(/\s+/));
  }
});


test('English B2 U16 inverted-conditional lessons cover all targets and use matching examples', () => {
  const unit = loadB2().find((item) => item.unitNumber === 16);
  assert.ok(unit);
  const lessonIds = unit.lessons.flatMap((lesson) => Array.from(lesson.vocabIds || []));
  assert.equal(lessonIds.length, 22);
  assert.equal(new Set(lessonIds).size, 22);
  for (const lesson of unit.lessons) {
    const orderExercise = Array.from(lesson.exercises || []).find((exercise) => exercise.type === 'order');
    assert.ok(orderExercise);
    assert.equal(orderExercise.vocabId, lesson.vocabIds[1]);
    const word = unit.vocab.find((item) => item.id === orderExercise.vocabId);
    assert.ok(word);
    assert.deepEqual(Array.from(orderExercise.correctOrder), word.ex
      .replace(/[.,!?;:]/g, '').trim().split(/\s+/));
  }
});


test('English B2 U15–U18 lesson targets are covered once and match their sentence examples', () => {
  const units = loadB2();
  for (const number of [15, 16, 17, 18]) {
    const unit = units.find((item) => item.unitNumber === number);
    assert.ok(unit);
    const lessonIds = unit.lessons.flatMap((lesson) => Array.from(lesson.vocabIds || []));
    assert.equal(lessonIds.length, 22, 'U' + number + ' must cover 22 targets');
    assert.equal(new Set(lessonIds).size, 22, 'U' + number + ' must not duplicate lesson targets');
    for (const lesson of unit.lessons) {
      const orderExercise = Array.from(lesson.exercises || []).find((exercise) => exercise.type === 'order');
      assert.ok(orderExercise);
      assert.equal(orderExercise.vocabId, lesson.vocabIds[1]);
      const word = unit.vocab.find((item) => item.id === orderExercise.vocabId);
      assert.ok(word);
      assert.deepEqual(Array.from(orderExercise.correctOrder), word.ex
        .replace(/[.,!?;:]/g, '').trim().split(/\s+/));
    }
  }
});


test('English B2 U19–U20 cover their targets and keep review examples aligned', () => {
  const units = loadB2();
  const u19 = units.find((item) => item.unitNumber === 19);
  const u20 = units.find((item) => item.unitNumber === 20);
  assert.ok(u19);
  assert.ok(u20);

  const lessonIds = u19.lessons.flatMap((lesson) => Array.from(lesson.vocabIds || []));
  assert.equal(lessonIds.length, 22);
  assert.equal(new Set(lessonIds).size, 22);
  for (const lesson of u19.lessons) {
    const exercise = Array.from(lesson.exercises || []).find((item) => item.type === 'order');
    assert.ok(exercise);
    assert.equal(exercise.vocabId, lesson.vocabIds[1]);
    const word = u19.vocab.find((item) => item.id === exercise.vocabId);
    assert.ok(word);
    assert.deepEqual(Array.from(exercise.correctOrder), word.ex
      .replace(/[.,!?;:]/g, '').trim().split(/\s+/));
  }

  const allVocabulary = units.flatMap((unit) => Array.from(unit.vocab || []));
  for (const lesson of u20.lessons) {
    const exercise = Array.from(lesson.exercises || []).find((item) => item.type === 'order');
    assert.ok(exercise);
    assert.equal(exercise.vocabId, lesson.reviewVocabIds[1]);
    const word = allVocabulary.find((item) => item.id === exercise.vocabId);
    assert.ok(word);
    assert.deepEqual(Array.from(exercise.correctOrder), word.ex
      .replace(/[.,!?;:]/g, '').trim().split(/\s+/));
  }
});


test('English B2 U10 and U30 review lesson and unit banks match their source vocabulary', () => {
  const units = loadB2();
  const allVocabulary = units.flatMap((unit) => Array.from(unit.vocab || []));
  for (const number of [10, 30]) {
    const unit = units.find((item) => item.unitNumber === number);
    assert.ok(unit);
    for (const lesson of unit.lessons) {
      const exercise = Array.from(lesson.exercises || []).find((item) => item.type === 'order');
      assert.ok(exercise);
      assert.equal(exercise.vocabId, lesson.reviewVocabIds[1]);
      const word = allVocabulary.find((item) => item.id === exercise.vocabId);
      assert.ok(word);
      assert.deepEqual(Array.from(exercise.correctOrder), word.ex
        .replace(/[.,!?;:]/g, '').trim().split(/\s+/));
    }
    const bankExercises = Array.from(unit.exercises || []).filter((item) => item.type === 'order');
    assert.equal(bankExercises.length, 5);
    for (const exercise of bankExercises) {
      const word = allVocabulary.find((item) => item.id === exercise.vocabId);
      assert.ok(word);
      assert.deepEqual(Array.from(exercise.correctOrder), word.ex
        .replace(/[.,!?;:]/g, '').trim().split(/\s+/));
    }
  }
});


test('English B2 U1–U8 lesson and unit sentence exercises match their vocabulary examples', () => {
  const units = loadB2();
  const u1 = units.find((item) => item.unitNumber === 1);
  assert.ok(u1);
  for (const lesson of u1.lessons) {
    const exercise = Array.from(lesson.exercises || []).find((item) => item.type === 'order');
    assert.ok(exercise);
    assert.equal(exercise.vocabId, lesson.vocabIds[1]);
    const word = u1.vocab.find((item) => item.id === exercise.vocabId);
    assert.ok(word);
    assert.deepEqual(Array.from(exercise.correctOrder), word.ex
      .replace(/[.,!?;:]/g, '').trim().split(/\s+/));
  }
  for (let number = 2; number <= 8; number += 1) {
    const unit = units.find((item) => item.unitNumber === number);
    assert.ok(unit, 'B2 unit must exist: U' + number);
    for (const lesson of unit.lessons) {
      const exercise = Array.from(lesson.exercises || []).find((item) => item.type === 'order');
      assert.ok(exercise, 'lesson must contain a sentence exercise: U' + number);
      assert.equal(exercise.vocabId, lesson.vocabIds[1]);
      const word = unit.vocab.find((item) => item.id === exercise.vocabId);
      assert.ok(word);
      assert.deepEqual(Array.from(exercise.correctOrder), word.ex
        .replace(/[.,!?;:]/g, '').trim().split(/\s+/));
    }
    const bank = Array.from(unit.exercises || []).filter((item) => item.type === 'order');
    assert.equal(bank.length, 5);
    for (const exercise of bank) {
      const word = unit.vocab.find((item) => item.id === exercise.vocabId);
      assert.ok(word);
      assert.deepEqual(Array.from(exercise.correctOrder), word.ex
        .replace(/[.,!?;:]/g, '').trim().split(/\s+/));
    }
  }
});

test('English B2 U8 uses the stative meaning of feel consistently', () => {
  const unit = loadB2().find((item) => item.unitNumber === 8);
  assert.ok(unit);
  const feel = unit.vocab.find((word) => word.target === 'to feel');
  assert.ok(feel);
  assert.equal(feel.esp, 'sentirse');
  assert.equal(feel.ex, 'I feel exhausted after the trip.');
  assert.equal(feel.exEsp, 'Me siento agotado después del viaje.');
});


test('English B2 lesson sentence examples match all 12 audited vocabulary targets', () => {
  const cases = [
    [11, 'Posibilidad y alternativas', 'must have', 'They must have missed the last announcement.'],
    [12, 'Ausencia de necesidad y posibilidad pasada', 'might have', 'He might have misunderstood the deadline.'],
    [13, 'Lenguaje normativo y cumplimiento', 'be necessary for', 'A valid ID is necessary for entry.'],
    [22, 'Causativa y experiencias no deseadas', 'to get a refund issued', 'She got a refund issued after contacting support.'],
    [25, 'Foco temporal, causal y de necesidad', 'it is precisely because', 'It is precisely because costs have risen that we need a review.'],
    [25, 'What-clefts y estructuras de identificación', 'it was John who', 'It was John who suggested the alternative.'],
    [34, 'Síntesis y reformulación', 'to provide an overview', 'The first section provides an overview of recent developments.'],
    [37, 'Retomar temas y gestionar turnos', 'if I could just come in', 'If I could just come in, I have a question about the timeline.'],
    [37, 'Gestionar turnos y avanzar', 'to hold that thought', 'Hold that thought; I want to check one detail first.'],
    [45, 'Descripción de personas', 'skinny', 'The runner looked too skinny after the illness.'],
    [47, 'Aplazamiento y cautela', 'to delay', 'Bad weather delayed the flight.'],
    [52, 'Propuesta completa', 'to be cost-effective', 'The recommended option is likely to be cost-effective.'],
  ];
  const normalize = (value) => value.replace(/[.,!?;:]/g, '').trim().split(/\\s+/);
  const units = loadB2();
  for (const [number, title, target, sentence] of cases) {
    const unit = units.find((item) => item.unitNumber === number);
    assert.ok(unit, 'Missing B2 unit ' + number);
    const lesson = unit.lessons.find((item) => item.title === title);
    assert.ok(lesson, 'Missing lesson in U' + number + ': ' + title);
    const exercise = lesson.exercises.find((item) => item.type === 'order');
    assert.ok(exercise, 'Missing sentence exercise in U' + number + ': ' + title);
    assert.equal(exercise.vocabId, lesson.vocabIds[1],
      'Sentence exercise must use the lesson second vocabulary target: U' + number + ' ' + title);
    const word = unit.vocab.find((item) => item.id === exercise.vocabId);
    assert.equal(word?.target, target, 'Unexpected vocabulary target in U' + number + ' ' + title);
    assert.deepEqual(Array.from(exercise.correctOrder), normalize(sentence),
      'Sentence must match its assigned target in U' + number + ' ' + title);
  }
});

test('English B2 U35 keeps plural data agreement consistent in vocabulary and lesson examples', () => {
  const unit = loadB2().find((item) => item.unitNumber === 35);
  assert.ok(unit);
  const target = unit.vocab.find((word) => word.target === 'to substantiate a claim');
  assert.ok(target);
  const lesson = unit.lessons.find((item) => item.title === 'Razones y evidencia');
  assert.ok(lesson);
  const exercise = lesson.exercises.find((item) => item.type === 'order');
  assert.ok(exercise);
  assert.equal(exercise.vocabId, target.id);
  assert.deepEqual(Array.from(exercise.correctOrder),
    'Additional data are needed to substantiate the claim'.split(' '));
});
