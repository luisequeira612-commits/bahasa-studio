'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'curriculum-a1.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context);
const a1 = context.window.BAHASA_CURRICULUM_A1;

test('A1 U24-U32 retain complete bilingual examples and core exercise modalities', () => {
  assert.ok(a1, 'A1 curriculum must load from its extracted data file');
  const units = a1.units.filter(unit => /^a1_u(?:2[4-9]|3[0-2])$/.test(unit.id));
  assert.deepEqual(Array.from(units, unit => unit.id),
    ['a1_u24', 'a1_u25', 'a1_u26', 'a1_u27', 'a1_u28', 'a1_u29', 'a1_u30', 'a1_u31', 'a1_u32']);

  const requiredTypes = ['mc', 'translate_es_id', 'listen', 'order', 'write'];
  for (const unit of units) {
    assert.equal(unit.vocab.length, 10, unit.id + ' should retain its ten tracked vocabulary entries');
    for (const word of unit.vocab) {
      assert.equal(typeof word.ex, 'string', unit.id + ' ' + word.id + ' needs an Indonesian example');
      assert.ok(word.ex.trim(), unit.id + ' ' + word.id + ' Indonesian example must not be empty');
      assert.equal(typeof word.exEsp, 'string', unit.id + ' ' + word.id + ' needs a Spanish example');
      assert.ok(word.exEsp.trim(), unit.id + ' ' + word.id + ' Spanish example must not be empty');
    }

    const exercises = unit.exercises || [];
    assert.ok(exercises.length >= 8, unit.id + ' should retain its authored practice set');
    const types = new Set(exercises.map(exercise => exercise.type));
    for (const type of requiredTypes) {
      assert.ok(types.has(type), unit.id + ' should include ' + type + ' practice');
    }
  }
});
