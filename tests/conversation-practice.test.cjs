'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'conversation-engine.js'), 'utf8');
const elements = {
  conversationScenarioList: { hidden: false, innerHTML: '' },
  conversationPracticeArea: { hidden: true, innerHTML: '' }
};
const recordedSessions = [];
const recordedAnswers = [];
const sandbox = {
  App: {
    recordSkillSession(skill) { recordedSessions.push(skill); return Promise.resolve(); },
    recordSkillActivity(skill, isCorrect) { recordedAnswers.push([skill, isCorrect]); return Promise.resolve(); },
    switchView() {}
  },
  window: {},
  Math: Object.assign(Object.create(Math), { random: () => 0 }),
  document: {
    addEventListener() {},
    getElementById(id) { return elements[id] || null; }
  }
};
sandbox.window.App = sandbox.App;
vm.runInNewContext(source, sandbox);

const scenarios = sandbox.window.ConversationEngine.scenarios;

test('the tutor makes all A1 and A2 conversation situations available', () => {
  const engine = sandbox.window.ConversationEngine;
  assert.deepEqual(Array.from(engine.getAvailableScenarios(), scenario => scenario.id), [
    'greetings', 'restaurant', 'shopping', 'travel', 'friends', 'help',
    'organizar-evento', 'pengalaman-kerja', 'layanan-digital'
  ]);
  assert.deepEqual(Array.from(scenarios.filter(scenario => scenario.level === 'A2'), scenario => scenario.id), [
    'organizar-evento', 'pengalaman-kerja', 'layanan-digital'
  ]);
  assert.equal(scenarios.length, 9);
});

test('restaurant ordering feedback explains the exact accepted response', () => {
  const restaurant = scenarios.find(scenario => scenario.id === 'restaurant');
  assert.ok(restaurant);
  const orderingTurn = restaurant.turns[0];
  const correctChoice = orderingTurn.choices.find(choice => choice.correct);
  assert.equal(correctChoice.text, 'Saya mau nasi goreng, tolong.');
  assert.match(correctChoice.feedback, /Saya mau/);
  assert.match(correctChoice.feedback, /tolong/);
  assert.doesNotMatch(correctChoice.feedback, /Saya pesan/);
});

test('each conversation has three usable turns and exactly one appropriate response per turn', () => {
  for (const scenario of scenarios) {
    assert.ok(scenario.title && scenario.description, scenario.id + ' should have a title and description');
    assert.equal(scenario.turns.length, 3, scenario.id + ' should have three turns');
    for (const turn of scenario.turns) {
      assert.ok(turn.speaker && turn.line && turn.translation && turn.prompt,
        scenario.id + ' turns should include context and a learner prompt');
      assert.equal(turn.choices.length, 3, scenario.id + ' turns should offer three response choices');
      assert.equal(turn.choices.filter(choice => choice.correct).length, 1,
        scenario.id + ' turns should have exactly one best response');
      for (const choice of turn.choices) {
        assert.ok(choice.text && choice.translation && choice.feedback,
          scenario.id + ' response choices should include translation and feedback');
      }
    }
  }
});

test('conversation practice does not write XP, SRS attempts, or microphone recordings', () => {
  assert.doesNotMatch(source, /App\.addXp|SRSEngine\.recordAttempt|DB\.set|MediaRecorder/);
  assert.match(source, /AudioEngine\.speak/);
});


test('each guided conversation turn can be answered freely before a model example is revealed', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  assert.match(elements.conversationPracticeArea.innerHTML, /data-conversation-free/);

  engine.useFreeResponse();
  assert.match(elements.conversationPracticeArea.innerHTML, /id="conversationFreeResponse"/);
  assert.match(elements.conversationPracticeArea.innerHTML, /data-conversation-speech/);

  elements.conversationFreeResponse = { value: 'Halo, saya baik.' };
  engine.showFreeExample();
  assert.equal(engine.score, 0, 'free responses must not be auto-scored');
  assert.equal(engine.freeResponseTurns, 1);
  assert.match(elements.conversationPracticeArea.innerHTML, /Un ejemplo posible/);
  assert.match(elements.conversationPracticeArea.innerHTML, /Halo! Baik, terima kasih\./);

  engine.next();
  assert.equal(engine.turnIndex, 1);
  assert.equal(engine.freeResponseMode, true, 'free-response practice should continue into the next turn');
  assert.equal(engine.freeResponseText, '');
  assert.equal(engine.freeResponseRevealed, false);
  assert.equal(engine.freeResponseHintVisible, false);
  assert.equal(engine.freeResponseTurns, 1);
});


test('learners can switch from free response back to guided choices without losing the draft', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  engine.useFreeResponse();
  elements.conversationFreeResponse = { value: 'Halo, saya baik.' };

  engine.useGuidedResponse();
  assert.equal(engine.freeResponseMode, false);
  assert.equal(engine.freeResponseText, 'Halo, saya baik.');
  assert.match(elements.conversationPracticeArea.innerHTML, /data-conversation-choice/);
  assert.equal(engine.answered, false);
  assert.equal(engine.score, 0);

  engine.useFreeResponse();
  assert.match(elements.conversationPracticeArea.innerHTML,
    /<textarea id="conversationFreeResponse"[^>]*>Halo, saya baik\.<\/textarea>/);
  assert.match(elements.conversationPracticeArea.innerHTML, /data-conversation-guided/);
  assert.equal(engine.score, 0);
  assert.deepEqual(recordedAnswers, []);
});

test('switching response modes does not complete or score a conversation turn', () => {
  const engine = sandbox.window.ConversationEngine;
  recordedAnswers.length = 0;
  engine.start('restaurant');
  engine.useFreeResponse();
  elements.conversationFreeResponse = { value: 'Saya mau nasi goreng.' };
  engine.useGuidedResponse();
  assert.equal(engine.answered, false);
  assert.equal(engine.freeResponseTurns, 0);
  assert.equal(engine.score, 0);
  assert.deepEqual(recordedAnswers, []);
});

test('free-response mode continues across turns while clearing only turn-specific draft and hint state', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  engine.useFreeResponse();

  for (let turn = 0; turn < 3; turn += 1) {
    assert.equal(engine.freeResponseMode, true);
    assert.match(elements.conversationPracticeArea.innerHTML, /id="conversationFreeResponse"/);
    elements.conversationFreeResponse = { value: 'Respuesta propia ' + (turn + 1) };
    engine.toggleFreeHint();
    assert.equal(engine.freeResponseHintVisible, true);
    engine.showFreeExample();
    assert.equal(engine.freeResponseTurns, turn + 1);
    engine.next();
    if (turn < 2) {
      assert.equal(engine.turnIndex, turn + 1);
      assert.equal(engine.freeResponseMode, true);
      assert.equal(engine.freeResponseText, '');
      assert.equal(engine.freeResponseRevealed, false);
      assert.equal(engine.freeResponseHintVisible, false);
      assert.equal(engine.freeResponseCounted, false);
    }
  }

  assert.match(elements.conversationPracticeArea.innerHTML, /Conversación completada/);
  assert.match(elements.conversationPracticeArea.innerHTML, /Has completado los turnos en práctica libre/);
  assert.equal(engine.freeResponseTurns, 3);
  assert.equal(engine.score, 0);
});

test('free response cannot reveal an example before the learner attempts an answer', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  engine.useFreeResponse();
  elements.conversationFreeResponse = { value: '   ' };
  engine.showFreeExample();
  assert.equal(engine.answered, false);
  assert.equal(engine.freeResponseTurns, 0);
});

test('free-response speech capture is optional and never persists audio, XP, SRS attempts, or response text', () => {
  assert.match(source, /window\.SpeechRecognition \|\| window\.webkitSpeechRecognition/);
  assert.match(source, /recognition\.lang = 'id-ID'/);
  assert.match(source, /la app no guarda grabaciones/);
  assert.doesNotMatch(source, /App\.addXp|SRSEngine\.recordAttempt|DB\.set|MediaRecorder/);
});


test('a completed conversation records one aggregate session without scoring free responses', () => {
  const engine = sandbox.window.ConversationEngine;
  recordedSessions.length = 0;
  engine.start('greetings');
  for (let turn = 0; turn < 3; turn += 1) {
    const current = engine.currentScenario.turns[engine.turnIndex];
    const correctIndex = current.choices.findIndex(choice => choice.correct);
    engine.choose(correctIndex);
    engine.next();
  }
  assert.deepEqual(recordedSessions, ['conversation']);
  engine.renderResult();
  assert.deepEqual(recordedSessions, ['conversation'], 'rendering the result again must not double-count');
  assert.match(elements.conversationPracticeArea.innerHTML, /aciertos y errores de las respuestas guiadas/);
  assert.match(elements.conversationPracticeArea.innerHTML, /No se guardan tus frases, transcripciones ni respuestas libres/);
});


test('completed conversations disclose aggregate accuracy counters without storing responses', () => {
  assert.match(source, /App\.recordSkillSession\('conversation'\)/);
  assert.match(source, /sessionRecorded/);
  assert.match(source, /App\.recordSkillActivity\('conversation', isCorrect\)/);
  assert.match(source, /Se registran los aciertos y errores de las respuestas guiadas/);
  assert.match(source, /No se guardan tus frases, transcripciones ni respuestas libres/);
  assert.doesNotMatch(source, /DB\.set|localStorage|indexedDB|MediaRecorder/);
});


// This fixture locks the manually audited learner-facing answer/translation pairs.
// It is a regression guard, not a claim of native-speaker linguistic certification.
test('all 18 guided conversation answers retain their audited Spanish meanings', () => {
  const expected = {
    greetings: [
      ['Halo! Baik, terima kasih.', '¡Hola! Bien, gracias.'],
      ['Nama saya Ana.', 'Me llamo Ana.'],
      ['Senang bertemu denganmu juga.', 'Encantado/a de conocerte también.']
    ],
    restaurant: [
      ['Saya mau nasi goreng, tolong.', 'Quisiera pedir arroz frito, por favor.'],
      ['Tidak, tanpa cabai, ya.', 'No, sin chile, por favor.'],
      ['Saya mau air putih.', 'Quiero agua.']
    ],
    shopping: [
      ['Saya mau beli kaus ini.', 'Quiero comprar esta camiseta.'],
      ['Baik, saya beli.', 'De acuerdo, lo compro.'],
      ['Saya bayar tunai.', 'Pago en efectivo.']
    ],
    travel: [
      ['Saya mau ke stasiun.', 'Quiero ir a la estación.'],
      ['Saya naik bus.', 'Voy en autobús.'],
      ['Halte bus di sebelah kiri.', 'La parada de autobús está a la izquierda.']
    ],
    friends: [
      ['Baik. Kamu apa kabar?', 'Bien. ¿Y tú cómo estás?'],
      ['Saya suka membaca buku.', 'Me gusta leer libros.'],
      ['Ya, boleh. Terima kasih.', 'Sí, me gustaría. Gracias.']
    ],
    help: [
      ['Tentu. Ada apa?', 'Por supuesto. ¿Qué ocurre?'],
      ['Rumah sakit di sebelah kiri.', 'El hospital está a la izquierda.'],
      ['Sama-sama.', 'De nada.']
    ]
  };

  for (const [scenarioId, turns] of Object.entries(expected)) {
    const scenario = scenarios.find(item => item.id === scenarioId);
    assert.ok(scenario, 'missing scenario: ' + scenarioId);
    turns.forEach(([answer, translation], index) => {
      const correct = scenario.turns[index].choices.filter(choice => choice.correct);
      assert.equal(correct.length, 1, scenarioId + ' turn ' + (index + 1));
      assert.deepEqual([correct[0].text, correct[0].translation], [answer, translation],
        scenarioId + ' turn ' + (index + 1) + ' answer/translation pair changed');
    });
  }
});

test('starting or abandoning a conversation does not record a completed session', () => {
  const engine = sandbox.window.ConversationEngine;
  recordedSessions.length = 0;
  engine.start('restaurant');
  assert.deepEqual(recordedSessions, []);
  engine.exit();
  assert.deepEqual(recordedSessions, []);
});

test('replaying a completed conversation records a separate session exactly once', () => {
  const engine = sandbox.window.ConversationEngine;
  recordedSessions.length = 0;
  for (let session = 0; session < 2; session += 1) {
    engine.start('shopping');
    for (let turn = 0; turn < 3; turn += 1) {
      const current = engine.currentScenario.turns[engine.turnIndex];
      const correctIndex = current.choices.findIndex(choice => choice.correct);
      engine.choose(correctIndex);
      engine.next();
    }
    assert.deepEqual(recordedSessions, Array(session + 1).fill('conversation'));
    engine.renderResult();
    assert.deepEqual(recordedSessions, Array(session + 1).fill('conversation'));
  }
});


test('replaying a free-response conversation keeps free-response mode and resets turn state', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  engine.useFreeResponse();

  for (let turn = 0; turn < 3; turn += 1) {
    elements.conversationFreeResponse = { value: 'Respuesta libre ' + (turn + 1) };
    engine.showFreeExample();
    engine.next();
  }

  assert.match(elements.conversationPracticeArea.innerHTML, /Conversación completada/);
  assert.equal(engine.freeResponseMode, true);
  engine.replay();

  assert.equal(engine.freeResponseMode, true);
  assert.equal(engine.turnIndex, 0);
  assert.equal(engine.freeResponseTurns, 0);
  assert.equal(engine.freeResponseText, '');
  assert.equal(engine.freeResponseRevealed, false);
  assert.equal(engine.freeResponseHintVisible, false);
  assert.equal(engine.freeResponseCounted, false);
  assert.match(elements.conversationPracticeArea.innerHTML, /id="conversationFreeResponse"/);
  assert.match(elements.conversationPracticeArea.innerHTML, /práctica libre/);
});

test('guided answer choices are shuffled in a session without mutating source content', () => {
  const engine = sandbox.window.ConversationEngine;
  const original = scenarios.find(scenario => scenario.id === 'greetings');
  const originalOrder = original.turns.map(turn => turn.choices.map(choice => choice.text));
  engine.start('greetings');

  assert.notStrictEqual(engine.currentScenario, original);
  engine.currentScenario.turns.forEach((turn, index) => {
    const shuffledTexts = turn.choices.map(choice => choice.text);
    assert.deepEqual([...shuffledTexts].sort(), [...originalOrder[index]].sort());
    assert.notDeepEqual(shuffledTexts, originalOrder[index],
      'the deterministic test shuffle should change the displayed order');
    const correctIndex = turn.choices.findIndex(choice => choice.correct);
    assert.ok(correctIndex >= 0, 'the correct answer must remain attached to its choice');
  });

  assert.deepEqual(original.turns.map(turn => turn.choices.map(choice => choice.text)), originalOrder,
    'starting a session must not mutate the reusable scenario definitions');
  const correctIndex = engine.currentScenario.turns[0].choices.findIndex(choice => choice.correct);
  engine.choose(correctIndex);
  assert.equal(engine.score, 1);
});


test('learners can retry only the guided turns they answered incorrectly', () => {
  const engine = sandbox.window.ConversationEngine;
  recordedSessions.length = 0;
  engine.start('greetings');
  const originalScenario = scenarios.find(scenario => scenario.id === 'greetings');
  const wrongIndex = engine.currentScenario.turns[0].choices.findIndex(choice => !choice.correct);
  engine.choose(wrongIndex);
  engine.next();
  for (let turn = 1; turn < 3; turn += 1) {
    const correctIndex = engine.currentScenario.turns[engine.turnIndex].choices.findIndex(choice => choice.correct);
    engine.choose(correctIndex);
    engine.next();
  }
  assert.equal(engine.mistakeTurns.length, 1);
  assert.match(elements.conversationPracticeArea.innerHTML, /data-conversation-retry/);
  assert.match(elements.conversationPracticeArea.innerHTML, /Practicar errores \(1\)/);
  engine.retryMistakes();
  assert.equal(engine.currentScenario.turns.length, 1);
  assert.equal(engine.turnIndex, 0);
  assert.equal(engine.score, 0);
  assert.equal(engine.mistakeTurns.length, 0);
  assert.equal(engine.currentScenario.id, 'greetings');
  assert.equal(originalScenario.turns.length, 3, 'retry must not mutate the source scenario');
  const correctIndex = engine.currentScenario.turns[0].choices.findIndex(choice => choice.correct);
  engine.choose(correctIndex);
  engine.next();
  assert.match(elements.conversationPracticeArea.innerHTML, /Resultado guiado: 1\/1 respuestas correctas/);
  assert.deepEqual(recordedSessions, ['conversation', 'conversation']);
});


test('A2 conversations can be opened without completing all A1 units', () => {
  const engine = sandbox.window.ConversationEngine;
  sandbox.window.CourseData = { levels: [{ id: 'A1', units: [{ id: 'a1_u1' }, { id: 'a1_u2' }] }] };
  sandbox.window.App.completedUnits = ['a1_u1'];
  assert.equal(engine.getAvailableScenarios().filter(scenario => scenario.level === 'A2').length, 3);
  engine.start('organizar-evento');
  assert.equal(engine.currentScenario.id, 'organizar-evento',
    'A2 conversation access must not depend on A1 completion');
});

test('A2 conversation prompts contain usable context, three choices, and one intended response per turn', () => {
  for (const scenario of scenarios.filter(item => item.level === 'A2')) {
    assert.equal(scenario.turns.length, 3);
    for (const turn of scenario.turns) {
      assert.ok(turn.line && turn.translation && turn.prompt);
      assert.equal(turn.choices.length, 3);
      assert.equal(turn.choices.filter(choice => choice.correct).length, 1);
      assert.ok(turn.choices.every(choice => choice.text && choice.translation && choice.feedback));
    }
  }
});


test('every guided conversation has unique identity and complete, unambiguous turn structure', () => {
  const ids = scenarios.map(scenario => scenario.id);
  assert.equal(new Set(ids).size, ids.length, 'scenario IDs must be unique');
  for (const scenario of scenarios) {
    assert.ok(typeof scenario.id === 'string' && scenario.id.trim(), 'scenario ID is required');
    assert.ok(typeof scenario.title === 'string' && scenario.title.trim(), scenario.id + ' title');
    assert.ok(typeof scenario.description === 'string' && scenario.description.trim(), scenario.id + ' description');
    assert.equal(scenario.turns.length, 3, scenario.id + ' must contain three turns');
    for (const [index, turn] of scenario.turns.entries()) {
      const label = scenario.id + ' turn ' + (index + 1);
      assert.ok(typeof turn.speaker === 'string' && turn.speaker.trim(), label + ' speaker');
      assert.ok(typeof turn.line === 'string' && turn.line.trim(), label + ' Indonesian prompt');
      assert.ok(typeof turn.translation === 'string' && turn.translation.trim(), label + ' Spanish translation');
      assert.ok(typeof turn.prompt === 'string' && turn.prompt.trim(), label + ' learner instruction');
      assert.equal(turn.choices.length, 3, label + ' must offer three choices');
      assert.equal(turn.choices.filter(choice => choice.correct === true).length, 1,
        label + ' must have exactly one intended answer');
      const choiceTexts = turn.choices.map(choice => choice.text.trim());
      assert.equal(new Set(choiceTexts).size, 3, label + ' choices must not duplicate');
      assert.ok(turn.choices.every(choice =>
        typeof choice.text === 'string' && choice.text.trim() &&
        typeof choice.translation === 'string' && choice.translation.trim() &&
        typeof choice.feedback === 'string' && choice.feedback.trim() &&
        typeof choice.correct === 'boolean'), label + ' choices must be fully explained');
    }
  }
});

test('incorrect guided answers explain both the intended response and the selected mistake', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  const turn = engine.currentScenario.turns[0];
  const correct = turn.choices.find(choice => choice.correct);
  const wrongIndex = turn.choices.findIndex(choice => !choice.correct);
  const wrong = turn.choices[wrongIndex];
  engine.choose(wrongIndex);
  assert.ok(elements.conversationPracticeArea.innerHTML.includes(correct.feedback),
    'feedback should explain why the displayed correct response fits');
  assert.ok(elements.conversationPracticeArea.innerHTML.includes(wrong.feedback),
    'feedback should also explain the learner selected response');
});


test('guided and free conversation turns expose an accessible live progress bar', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  assert.match(elements.conversationPracticeArea.innerHTML,
    /<progress class="conversation-progress" value="1" max="3" aria-label="Progreso de la conversación"/);
  let correctIndex = engine.currentScenario.turns[0].choices.findIndex(choice => choice.correct);
  engine.choose(correctIndex);
  engine.next();
  assert.match(elements.conversationPracticeArea.innerHTML,
    /<progress class="conversation-progress" value="2" max="3" aria-label="Progreso de la conversación"/);
  engine.useFreeResponse();
  assert.match(elements.conversationPracticeArea.innerHTML,
    /<progress class="conversation-progress" value="2" max="3" aria-label="Progreso de la conversación"/);
  assert.match(elements.conversationPracticeArea.innerHTML, /Turno 2 de 3 · práctica libre/);
});


test('conversation turn changes are announced politely to assistive technology in both modes', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  assert.match(elements.conversationPracticeArea.innerHTML,
    /role="status" aria-live="polite" aria-atomic="true"[^>]*>Turno 1 de 3/);

  const correctIndex = engine.currentScenario.turns[0].choices.findIndex(choice => choice.correct);
  engine.choose(correctIndex);
  engine.next();
  assert.match(elements.conversationPracticeArea.innerHTML,
    /role="status" aria-live="polite" aria-atomic="true"[^>]*>Turno 2 de 3/);

  engine.useFreeResponse();
  assert.match(elements.conversationPracticeArea.innerHTML,
    /role="status" aria-live="polite" aria-atomic="true"[^>]*>Turno 2 de 3 · práctica libre/);
});

test('guided conversation choices record correct and incorrect attempts in the local skill profile', () => {
  const engine = sandbox.window.ConversationEngine;
  recordedAnswers.length = 0;
  engine.start('greetings');
  const wrongIndex = engine.currentScenario.turns[0].choices.findIndex(choice => !choice.correct);
  engine.choose(wrongIndex);
  assert.deepEqual(recordedAnswers, [['conversation', false]]);

  engine.next();
  const correctIndex = engine.currentScenario.turns[1].choices.findIndex(choice => choice.correct);
  engine.choose(correctIndex);
  assert.deepEqual(recordedAnswers, [['conversation', false], ['conversation', true]]);
});

test('free-response conversation attempts are not scored or added to the guided skill profile', () => {
  const engine = sandbox.window.ConversationEngine;
  recordedAnswers.length = 0;
  engine.start('greetings');
  engine.useFreeResponse();
  elements.conversationFreeResponse = { value: 'Halo, saya baik.' };
  engine.showFreeExample();
  assert.deepEqual(recordedAnswers, []);
  assert.equal(engine.score, 0);
});



test('learners can revise a free response after comparing it with the example without double-counting the turn', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  engine.useFreeResponse();
  elements.conversationFreeResponse = { value: 'Halo, saya baik.' };
  engine.showFreeExample();
  assert.equal(engine.freeResponseTurns, 1);
  assert.match(elements.conversationPracticeArea.innerHTML, /data-conversation-edit-response/);

  engine.editFreeResponse();
  assert.equal(engine.answered, false);
  assert.equal(engine.freeResponseRevealed, false);
  assert.equal(engine.freeResponseTurns, 1);
  assert.match(elements.conversationPracticeArea.innerHTML, /Halo, saya baik\./);

  elements.conversationFreeResponse = { value: 'Halo! Saya baik, terima kasih.' };
  engine.showFreeExample();
  assert.equal(engine.freeResponseTurns, 1, 'editing and revealing again must count one completed free-response turn');
  assert.equal(engine.score, 0);
});


test('free-response learners can reveal and hide a hint before seeing the example', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('restaurant');
  engine.useFreeResponse();
  const example = engine.currentScenario.turns[0].choices.find(choice => choice.correct);
  assert.match(elements.conversationPracticeArea.innerHTML, /data-conversation-hint/);
  assert.doesNotMatch(elements.conversationPracticeArea.innerHTML, /class="conversation-hint"/);
  elements.conversationFreeResponse = { value: 'Saya mau makan.' };

  engine.toggleFreeHint();
  assert.equal(engine.freeResponseHintVisible, true);
  assert.ok(elements.conversationPracticeArea.innerHTML.includes(example.feedback));
  assert.match(elements.conversationPracticeArea.innerHTML, /Ocultar pista/);
  assert.match(elements.conversationPracticeArea.innerHTML, /Saya mau makan\./);
  assert.equal(engine.freeResponseText, 'Saya mau makan.');
  assert.equal(engine.answered, false);
  assert.equal(engine.freeResponseTurns, 0);
  assert.equal(engine.score, 0);

  engine.toggleFreeHint();
  assert.equal(engine.freeResponseHintVisible, false);
  assert.doesNotMatch(elements.conversationPracticeArea.innerHTML, /class="conversation-hint"/);
  elements.conversationFreeResponse = { value: 'Saya mau nasi goreng.' };
  engine.showFreeExample();
  assert.equal(engine.freeResponseHintVisible, false);
  assert.match(elements.conversationPracticeArea.innerHTML, /Un ejemplo posible/);
});


test('free-response character counter follows typing and keeps the draft only in the active session', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  engine.useFreeResponse();
  const counter = { textContent: '' };
  elements.conversationFreeResponseCount = counter;
  const input = { value: 'Halo, apa kabar?' };
  elements.conversationFreeResponse = input;

  engine.updateFreeResponseCounter(input);
  assert.equal(counter.textContent, '16/1000 caracteres');
  assert.equal(engine.freeResponseText, 'Halo, apa kabar?');

  input.value = 'Saya baik. Terima kasih.';
  engine.updateFreeResponseCounter(input);
  assert.equal(counter.textContent, '24/1000 caracteres');
  assert.equal(engine.freeResponseText, input.value);

  engine.showFreeExample();
  assert.match(elements.conversationPracticeArea.innerHTML, /Saya baik\. Terima kasih\./);
  assert.equal(engine.score, 0, 'the character counter must not introduce automatic scoring');
});


test('speech dictation appends to the current draft and updates the live character counter', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  engine.useFreeResponse();
  const input = { value: 'Saya ingin belajar' };
  const status = { textContent: '' };
  const counter = { textContent: '' };
  elements.conversationFreeResponse = input;
  elements.conversationSpeechStatus = status;
  elements.conversationFreeResponseCount = counter;
  let recognition;
  sandbox.window.SpeechRecognition = class {
    constructor() { recognition = this; }
    start() {}
  };
  const button = { disabled: false, isConnected: true };

  engine.captureFreeResponse(button);
  recognition.onresult({ results: [[{ transcript: 'bahasa Indonesia' }]] });
  assert.equal(input.value, 'Saya ingin belajar bahasa Indonesia');
  assert.equal(engine.freeResponseText, input.value);
  assert.equal(counter.textContent, input.value.length + '/1000 caracteres');
  assert.match(status.textContent, /añadida al borrador/);

  engine.captureFreeResponse(button);
  recognition.onresult({ results: [[{ transcript: 'setiap hari' }]] });
  assert.equal(input.value, 'Saya ingin belajar bahasa Indonesia setiap hari');
  assert.equal(counter.textContent, input.value.length + '/1000 caracteres');

  engine.captureFreeResponse(button);
  recognition.onresult({ results: [[{ transcript: '   ' }]] });
  assert.equal(input.value, 'Saya ingin belajar bahasa Indonesia setiap hari', 'empty recognition must not change the draft');
});


test('speech dictation never exceeds the 1000-character free-response limit', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  engine.useFreeResponse();
  const input = { value: 'x'.repeat(995) };
  const status = { textContent: '' };
  const counter = { textContent: '' };
  elements.conversationFreeResponse = input;
  elements.conversationSpeechStatus = status;
  elements.conversationFreeResponseCount = counter;
  let recognition;
  sandbox.window.SpeechRecognition = class {
    constructor() { recognition = this; }
    start() {}
  };
  engine.captureFreeResponse({ disabled: false, isConnected: true });
  recognition.onresult({ results: [[{ transcript: 'abcdef' }]] });

  assert.equal(input.value.length, 1000);
  assert.equal(engine.freeResponseText, input.value);
  assert.equal(counter.textContent, '1000/1000 caracteres');
  assert.match(status.textContent, /límite de 1000 caracteres/);

  input.value = 'y'.repeat(1005);
  engine.updateFreeResponseCounter(input);
  assert.equal(input.value.length, 1000, 'counter synchronization also enforces the limit');
  assert.equal(engine.freeResponseText.length, 1000);
  assert.equal(counter.textContent, '1000/1000 caracteres');
});


test('late speech results cannot overwrite a newer draft after switching response modes', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  engine.useFreeResponse();
  const oldInput = { value: 'Borrador anterior' };
  const oldStatus = { textContent: '' };
  const oldCounter = { textContent: '' };
  elements.conversationFreeResponse = oldInput;
  elements.conversationSpeechStatus = oldStatus;
  elements.conversationFreeResponseCount = oldCounter;
  let recognition;
  sandbox.window.SpeechRecognition = class {
    constructor() { recognition = this; }
    start() {}
  };

  engine.captureFreeResponse({ disabled: false, isConnected: true });
  engine.useGuidedResponse();
  engine.useFreeResponse();

  const currentInput = { value: 'Borrador nuevo' };
  const currentStatus = { textContent: 'Estado actual' };
  const currentCounter = { textContent: '14/1000 caracteres' };
  elements.conversationFreeResponse = currentInput;
  elements.conversationSpeechStatus = currentStatus;
  elements.conversationFreeResponseCount = currentCounter;
  engine.updateFreeResponseCounter(currentInput);

  recognition.onresult({ results: [[{ transcript: 'texto atrasado' }]] });
  recognition.onerror({ error: 'no-speech' });

  assert.equal(currentInput.value, 'Borrador nuevo');
  assert.equal(engine.freeResponseText, 'Borrador nuevo');
  assert.equal(currentCounter.textContent, '14/1000 caracteres');
  assert.equal(currentStatus.textContent, 'Estado actual');
});


test('leaving free-response mode aborts active microphone recognition immediately', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  engine.useFreeResponse();
  const input = { value: 'Saya sedang belajar' };
  const status = { textContent: 'Escuchando…' };
  const counter = { textContent: '' };
  elements.conversationFreeResponse = input;
  elements.conversationSpeechStatus = status;
  elements.conversationFreeResponseCount = counter;
  let recognition;
  let abortCalls = 0;
  sandbox.window.SpeechRecognition = class {
    constructor() { recognition = this; }
    start() {}
    abort() {
      abortCalls += 1;
      if (this.onend) this.onend();
    }
  };
  const button = { disabled: false, isConnected: true };

  engine.captureFreeResponse(button);
  assert.equal(engine.activeFreeRecognition, recognition);
  assert.equal(button.disabled, true);

  engine.useGuidedResponse();

  assert.equal(abortCalls, 1);
  assert.equal(engine.activeFreeRecognition, null);
  assert.equal(button.disabled, false);
  assert.equal(status.textContent, 'Escuchando…', 'an abort event must not replace the current status');
  recognition.onresult({ results: [[{ transcript: 'texto tardío' }]] });
  assert.equal(engine.freeResponseText, 'Saya sedang belajar');
});
