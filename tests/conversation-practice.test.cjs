'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'conversation-engine.js'), 'utf8');
const sandbox = {
  window: {},
  document: { addEventListener() {} }
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
  assert.doesNotMatch(source, /App\\.addXp|SRSEngine\\.recordAttempt|DB\\.set|MediaRecorder/);
  assert.match(source, /AudioEngine\\.speak/);
});
