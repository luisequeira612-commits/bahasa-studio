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


test('A1 progression guard is registered exactly once in the regression workflow', () => {
  const workflow = fs.readFileSync(path.join(__dirname, '..', '.github', 'workflows', 'regression.yml'), 'utf8');
  const registrations = workflow.match(/node --test tests\/a1-curriculum-progression\.test\.cjs/g) || [];
  assert.equal(registrations.length, 1);
});
