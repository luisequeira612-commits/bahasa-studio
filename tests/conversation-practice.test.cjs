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
const sandbox = {
  window: {},
  document: {
    addEventListener() {},
    getElementById(id) { return elements[id] || null; }
  }
};
vm.runInNewContext(source, sandbox);

const scenarios = sandbox.window.ConversationEngine.scenarios;

test('the practical conversation module includes all six planned everyday situations', () => {
  assert.deepEqual(Array.from(scenarios, scenario => scenario.id), [
    'greetings', 'restaurant', 'shopping', 'travel', 'friends', 'help'
  ]);
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
  assert.equal(engine.freeResponseMode, false);
  assert.equal(engine.freeResponseTurns, 1);
});

test('free response cannot reveal an example before the learner attempts an answer', () => {
  const engine = sandbox.window.ConversationEngine;
  engine.start('greetings');
  engine.useFreeResponse();
  elements.conversationFreeResponse = { value: '   ' };
  engine.showFreeExample();
  assert.equal(engine.answered, false);
  assert.equal(engine.freeResponseTurns, 0);
  assert.match(elements.conversationSpeechStatus.textContent, /Escribe o dicta primero/);
});

test('free-response speech capture is optional and never persists audio or learning records', () => {
  assert.match(source, /window\.SpeechRecognition \|\| window\.webkitSpeechRecognition/);
  assert.match(source, /recognition\.lang = 'id-ID'/);
  assert.match(source, /la app no guarda grabaciones/);
  assert.doesNotMatch(source, /App\.addXp|SRSEngine\.recordAttempt|DB\.set|MediaRecorder/);
});
