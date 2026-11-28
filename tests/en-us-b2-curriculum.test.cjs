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


test('English B2 U15 mixed-conditional lesson themes match their vocabulary', () => {
  const unit = loadB2().find((item) => item.unitNumber === 15);
  assert.ok(unit);
  const expected = [
    ['Condición pasada y resultado presente', ['if I had known', "if it hadn't been for", 'would be doing', 'to be better off']],
    ['Condición presente y resultado pasado', ['would have been', 'could have avoided', 'to have been able to', 'to make a difference']],
    ['Consecuencias y resultados alternativos', ['might still be', 'otherwise', 'to have a different outcome', 'to affect the outcome', 'to have turned out differently']],
    ['Arrepentimiento y evaluación retrospectiva', ['to look back on', 'to regret not doing', 'to wish things were', 'to wish I had']],
    ['Circunstancias y decisiones alternativas', ['to have no effect on', 'to be in this situation', 'in different circumstances', 'given the chance']],
  ];
  for (let index = 0; index < expected.length; index += 1) {
    const [title, targets] = expected[index];
    const lesson = unit.lessons[index];
    assert.equal(lesson.title, title);
    assert.deepEqual(lesson.vocabIds.map((id) => unit.vocab.find((word) => word.id === id)?.target), targets);
    const exercise = lesson.exercises.find((item) => item.type === 'order');
    assert.ok(exercise);
    assert.equal(exercise.vocabId, lesson.vocabIds[1]);
    const word = unit.vocab.find((item) => item.id === exercise.vocabId);
    assert.ok(word);
    assert.deepEqual(Array.from(exercise.correctOrder),
      word.ex.replace(/[.,!?;:]/g, '').trim().split(/\\s+/));
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

test('English B2 U5–U9 lesson themes match their vocabulary and sentence examples', () => {
  const units = loadB2();
  const cases = [
    [5, [
      ['Intenciones y planes personales', ['was going to', 'had planned to', 'intended to', 'was hoping to', 'was thinking of']],
      ['Expectativas y proyecciones', ['would eventually', 'expected to', 'was unlikely to', 'was certain to', 'would later find out']],
      ['Previsión e inminencia', ['was about to', 'was due to', 'was on the verge of', 'was meant to']],
      ['Calendarios y preparación', ['was due for', 'was on track to', 'was set to', 'was preparing to']],
      ['Planes no realizados y retrospectiva', ['was supposed to', 'never got around to', 'failed to materialize', 'in retrospect']],
    ]],
    [6, [
      ['Afirmaciones y cambios temporales', ['to point out that', 'to claim that', 'to admit that', 'to deny that']],
      ['Posturas, explicaciones y negaciones', ['to insist that', 'to explain that', 'to accuse someone of', 'to deny having done']],
      ['Promesas, advertencias e indicaciones', ['to promise to', 'to warn someone that', 'to remind someone to', 'to encourage someone to', 'to recommend doing', 'to urge someone to']],
      ['Propuestas, preguntas y confirmación', ['to suggest that', 'to wonder whether', 'to inquire whether', 'to confirm that']],
      ['Síntesis y atribución de declaraciones', ['to regret saying', 'to acknowledge that', 'according to', 'as far as I recall']],
    ]],
    [7, [
      ['Tendencias, hábitos y propensión', ['to tend to', 'to be prone to', 'to have a habit of', 'to break a habit', 'to take place regularly']],
      ['Hábitos pasados y acciones repetidas', ['used to', 'would often', 'to keep doing', 'to go on doing']],
      ['Adaptación y cambio gradual', ['to be accustomed to', 'to get used to', 'to gradually become', 'to gradually fade']],
      ['Tendencias y frecuencia', ['to increasingly rely on', 'repeatedly', 'once in a while', 'to be constantly doing']],
      ['Situaciones actuales y continuidad', ['on a regular basis', 'for the time being', 'at present', 'to remain unchanged', 'to be in the process of']],
    ]],
    [8, [
      ['Pensamiento y reflexión', ['to think', 'to be thinking about']],
      ['Posesión y experiencias', ['to have', 'to be having', 'to own', 'to belong to']],
      ['Percepción y sentidos', ['to see', 'to be seeing', 'to taste', 'to be tasting', 'to smell', 'to be smelling']],
      ['Sensaciones y apariencia', ['to feel', 'to be feeling', 'to look', 'to be looking', 'to appear', 'to be appearing']],
      ['Medición y dependencia', ['to weigh', 'to be weighing', 'to depend on', 'to be depending on']],
    ]],
    [9, [
      ['Estructuras cleft y foco informativo', ['what matters most is', 'it is the timing that', 'the main reason why']],
      ['Inversión tras expresiones negativas', ['not until', 'only after', 'little did we know', 'not once', 'hardly had', 'no sooner had', 'at no point']],
      ['Frecuencia, continuidad y perspectiva temporal', ['for the first time', 'ever since', 'time and again', 'to this day', 'no longer', 'all along', 'for much of the time']],
      ['Secuencia e inmediatez', ['as soon as', 'the moment']],
      ['Concesión, contraste y circunstancias ajenas', ['through no fault of', 'far from', 'much as']],
    ]],
  ];
  const normalize = (value) => value.replace(/[.,!?;:]/g, '').trim().split(/\\s+/);
  for (const [number, expectedLessons] of cases) {
    const unit = units.find((item) => item.unitNumber === number);
    assert.ok(unit, 'B2 unit must exist: U' + number);
    assert.equal(unit.lessons.length, expectedLessons.length);
    for (let index = 0; index < expectedLessons.length; index += 1) {
      const [title, expectedTargets] = expectedLessons[index];
      const lesson = unit.lessons[index];
      assert.equal(lesson.title, title, 'Unexpected lesson focus in U' + number);
      const targets = lesson.vocabIds.map((id) => unit.vocab.find((word) => word.id === id)?.target);
      assert.deepEqual(targets, expectedTargets, 'Lesson vocabulary must match its focus: U' + number + ' ' + title);
      const exercise = lesson.exercises.find((item) => item.type === 'order');
      assert.ok(exercise, 'Lesson needs a sentence-building activity: U' + number + ' ' + title);
      assert.equal(exercise.vocabId, lesson.vocabIds[1]);
      const word = unit.vocab.find((item) => item.id === exercise.vocabId);
      assert.ok(word);
      assert.deepEqual(Array.from(exercise.correctOrder), normalize(word.ex),
        'Sentence activity must match its assigned target: U' + number + ' ' + title);
    }
  }
});

test('English B2 U11–U14 lesson themes match their vocabulary and sentence examples', () => {
  const units = loadB2();
  const cases = [
    [11, [
      ['Certeza y deducción presente', ['must be', "can't be", 'may be', 'might be']],
      ['Posibilidad y alternativas', ['could be', 'must have', "can't have", 'may well']],
      ['Probabilidad y expectativas', ['might conceivably', 'be bound to', 'be unlikely to', 'be highly likely to']],
      ['Fuentes e inferencias prudentes', ['apparently', 'presumably', 'evidently', 'there is little doubt that']],
      ['Evaluación de evidencia', ['it seems reasonable to assume', 'to rule out', 'to point to', 'to suggest', 'to be consistent with', 'to be at odds with']],
    ]],
    [12, [
      ['Crítica, arrepentimiento y deseo retrospectivo', ['should have', 'ought to have', "shouldn't have", 'to regret doing', 'to wish one had']],
      ['Ausencia de necesidad', ["needn't have", "didn't need to", 'there was no need to']],
      ['Posibilidad e imposibilidad pasadas', ['might have', "couldn't have", 'could conceivably have', 'could have']],
      ['Resultados hipotéticos y expectativas retrospectivas', ['would have', 'was supposed to have', 'was meant to have', 'in hindsight', 'with the benefit of hindsight']],
      ['Responsabilidad y consecuencias', ['to blame someone for', 'to take responsibility for', 'to be accountable for', 'to miss an opportunity', 'to make up for']],
    ]],
    [13, [
      ['Obligación y requisito externo', ['be required to', 'be obliged to', 'have to', 'need to']],
      ['Prohibición y ausencia de obligación', ['must', "mustn't", "don't have to", "needn't"]],
      ['Expectativa, permiso y derecho', ['be under no obligation to', 'be expected to', 'be supposed to', 'be allowed to']],
      ['Permiso, derechos y recomendaciones', ['be permitted to', 'be entitled to', 'be free to', 'be advisable to']],
      ['Lenguaje normativo y cumplimiento', ['be essential to', 'be necessary for', "at one's discretion", 'unless otherwise stated', 'in accordance with', 'to comply with']],
    ]],
    [14, [
      ['Probabilidad con adjetivos', ['likely to', 'unlikely to', 'highly likely', 'almost certain to', 'it is unlikely that']],
      ['Certeza y fuerza de la afirmación', ['bound to', 'it is probable that', 'there is a strong possibility that', 'there is a slight chance that']],
      ['Expresiones de expectativa y atribución', ['in all likelihood', 'more than likely', 'by all accounts', 'to be expected to']],
      ['Pronósticos y proyecciones', ['to be forecast to', 'to be projected to', 'to stand a good chance of']],
      ['Posibilidades de éxito y resultados', ['to be on course to', 'to fall short of', 'to exceed expectations', 'to meet expectations', 'to expect', 'to be subject to change']],
    ]],
  ];
  const normalize = (value) => value.replace(/[.,!?;:]/g, '').trim().split(/\\s+/);
  for (const [number, expectedLessons] of cases) {
    const unit = units.find((item) => item.unitNumber === number);
    assert.ok(unit, 'B2 unit must exist: U' + number);
    assert.equal(unit.lessons.length, expectedLessons.length);
    for (let index = 0; index < expectedLessons.length; index += 1) {
      const [title, expectedTargets] = expectedLessons[index];
      const lesson = unit.lessons[index];
      assert.equal(lesson.title, title, 'Unexpected lesson focus in U' + number);
      const targets = lesson.vocabIds.map((id) => unit.vocab.find((word) => word.id === id)?.target);
      assert.deepEqual(targets, expectedTargets, 'Lesson vocabulary must match its focus: U' + number + ' ' + title);
      const exercise = lesson.exercises.find((item) => item.type === 'order');
      assert.ok(exercise, 'Lesson needs a sentence-building activity: U' + number + ' ' + title);
      assert.equal(exercise.vocabId, lesson.vocabIds[1]);
      const word = unit.vocab.find((item) => item.id === exercise.vocabId);
      assert.ok(word);
      assert.deepEqual(Array.from(exercise.correctOrder), normalize(word.ex),
        'Sentence activity must match its assigned target: U' + number + ' ' + title);
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


test('English B2 lesson sentence examples match all 21 audited vocabulary targets', () => {
  const cases = [
    [1, 'Resultados y experiencias acumuladas', 'ongoing', 'The investigation is still ongoing.'],
    [1, 'Duración y actividad reciente', 'lately', "I've been sleeping poorly lately."],
    [1, 'Cambios y evolución', 'to undergo', 'The building has undergone extensive renovations.'],
    [1, 'Logros, objetivos y dificultades', 'to achieve', 'The project has achieved most of its goals.'],
    [1, 'Síntesis y contraste temporal', 'to remain', 'The issue has remained unresolved.'],
    [9, 'Estructuras cleft y foco informativo', 'it is the timing that', 'It is the timing that makes the decision difficult.'],
    [9, 'Frecuencia, continuidad y perspectiva temporal', 'ever since', 'Ever since the merger, the company has operated differently.'],
    [9, 'Secuencia e inmediatez', 'the moment', 'The moment I saw the results, I knew something was wrong.'],
    [9, 'Concesión, contraste y circunstancias ajenas', 'far from', 'Far from solving the issue, the update made it worse.'],
    [11, 'Posibilidad y alternativas', 'must have', 'They must have missed the last announcement.'],
    [12, 'Posibilidad e imposibilidad pasadas', "couldn't have", 'They couldn't have completed the audit in one day.'],
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
  const normalize = (value) => value.replace(/[.,!?;:]/g, '').trim().split(' ');
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

test('English B2 U9, U11, U17, and U19 unit review banks match their source vocabulary', () => {
  const cases = [
    [9, [
      ['little did we know', 'Little did we know that the figures were incomplete.'],
      ['for the first time', 'For the first time, the results have exceeded expectations.'],
      ['ever since', 'Ever since the merger, the company has operated differently.'],
      ['time and again', 'We have explained the procedure time and again.'],
      ['to this day', 'To this day, nobody has explained the discrepancy.'],
    ]],
    [19, [
      ['if that is not the case', 'Please reply today; if that is not the case, we may miss the deadline.'],
      ['even so', 'The route was difficult. Even so, they reached the summit.'],
      ['nevertheless', 'The evidence was limited; nevertheless, the panel reached a decision.'],
      ['nonetheless', 'The task was demanding. Nonetheless, everyone completed it.'],
      ['in any case', 'In any case, we need written confirmation.'],
    ]],
    [11, [
      ['must have', 'They must have missed the last announcement.'],
      ["can't have", "She can't have forgotten the appointment; I reminded her twice."],
      ['may well', 'The proposal may well attract further interest.'],
      ['might conceivably', 'The change might conceivably affect older devices.'],
      ['be bound to', 'A decision is bound to cause some disagreement.'],
    ]],
    [17, [
      ['would rather someone did', "I'd rather you stayed here for now."],
      ['would prefer to', 'We would prefer to receive the documents by email.'],
      ['would sooner', "I'd sooner wait than make a rushed decision."],
      ["it's time", "It's time we addressed the issue."],
      ["it's high time", "It's high time the company reviewed its policy."],
    ]],
  ];
  const normalize = (value) => value.replace(/[.,!?;:]/g, '').trim().split(' ');
  const units = loadB2();
  for (const [number, expected] of cases) {
    const unit = units.find((item) => item.unitNumber === number);
    assert.ok(unit, 'Missing B2 unit ' + number);
    const bank = unit.exercises.filter((item) => item.type === 'order');
    assert.equal(bank.length, expected.length, 'Unexpected review bank size in U' + number);
    for (let index = 0; index < expected.length; index++) {
      const [target, sentence] = expected[index];
      const exercise = bank[index];
      assert.equal(exercise.vocabId, unit.vocab[index + 5].id);
      assert.equal(unit.vocab[index + 5].target, target);
      assert.deepEqual(Array.from(exercise.correctOrder), normalize(sentence),
        'Review bank sentence must match U' + number + ' target ' + target);
    }
  }
});

test('English B2 Spanish examples retain Latin American vocabulary choices', () => {
  const cases = [
    [4, 'to have completed', 'capacitación'],
    [27, 'the key question', 'confiable'],
    [31, 'whereas', 'confiable'],
    [56, 'a credible source', 'confiable'],
    [57, 'to lead to', 'falla'],
  ];
  const units = loadB2();
  for (const [number, target, expected] of cases) {
    const unit = units.find((item) => item.unitNumber === number);
    assert.ok(unit, 'Missing B2 unit ' + number);
    const word = unit.vocab.find((item) => item.target.trim() === target.trim());
    assert.ok(word, 'Missing target ' + target + ' in U' + number);
    assert.ok(word.exEsp.toLocaleLowerCase().includes(expected),
      'Expected Latin American term "' + expected + '" in U' + number + ' ' + target);
  }
  const credibleSource = units.find((item) => item.unitNumber === 56)
    .vocab.find((item) => item.target === 'a credible source');
  assert.ok(credibleSource.esp.includes('confiable'),
    'The Spanish gloss must use the same Latin American term as its example');
});

test('English B2 keeps data plural in U26 and U32 academic examples', () => {
  const cases = [
    [26, 'only when + clause + inversion', 'Only when the data are complete can we draw a conclusion.'],
    [32, 'as far as we can tell', 'As far as we can tell, no data were lost.'],
  ];
  const units = loadB2();
  for (const [number, target, example] of cases) {
    const unit = units.find((item) => item.unitNumber === number);
    assert.ok(unit, 'Missing B2 unit ' + number);
    const word = unit.vocab.find((item) => item.target === target);
    assert.ok(word, 'Missing target ' + target + ' in U' + number);
    assert.equal(word.ex, example);
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
