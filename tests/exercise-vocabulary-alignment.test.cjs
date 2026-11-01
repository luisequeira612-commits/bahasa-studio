'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'curriculum-a1.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'curriculum-a2.js'), 'utf8'), context);
const levels = [context.window.BAHASA_CURRICULUM_A1, context.window.BAHASA_CURRICULUM_A2];

function normalize(value) {
  return String(value || '').toLocaleLowerCase('id-ID').normalize('NFD')
    .replace(/\p{M}/gu, '').replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ').trim();
}

function strings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const vocabulary = new Map();
for (const level of levels) {
  for (const unit of level.units) {
    for (const word of unit.vocab || []) vocabulary.set(word.id, word.idn);
  }
}

function exercisesOf(unit) {
  return [
    ...(unit.exercises || []),
    ...(unit.lessons || []).flatMap(lesson => lesson.exercises || [])
  ];
}

test('every A1/A2 exercise vocabulary reference exists across the unlocked curriculum', () => {
  const missing = [];
  for (const level of levels) for (const unit of level.units) {
    for (const exercise of exercisesOf(unit)) {
      if (!vocabulary.has(exercise.vocabId)) {
        missing.push(level.id + '/' + unit.id + ': ' + exercise.vocabId);
      }
    }
  }
  assert.deepEqual(missing, []);
});

test('exercise prompts, answers, or model text contain their linked vocabulary term', () => {
  const mismatches = [];
  for (const level of levels) for (const unit of level.units) {
    for (const exercise of exercisesOf(unit)) {
      const term = normalize(vocabulary.get(exercise.vocabId));
      if (!term) continue;
      if (exercise.type === 'write') continue;
      const content = normalize(strings(exercise).join(' '));
      if (!content.includes(term)) {
        mismatches.push({
          level: level.id,
          unit: unit.id,
          vocabId: exercise.vocabId,
          term: vocabulary.get(exercise.vocabId),
          type: exercise.type,
          prompt: exercise.prompt
        });
      }
    }
  }
  assert.deepEqual(mismatches, []);
});


test('reused vocabulary IDs keep one Indonesian headword and one Spanish gloss', () => {
  const byId = new Map();
  const conflicts = [];
  for (const level of levels) for (const unit of level.units) {
    for (const word of unit.vocab || []) {
      const previous = byId.get(word.id);
      const current = { term: normalize(word.idn), gloss: normalize(word.esp) };
      if (previous && (previous.term !== current.term || previous.gloss !== current.gloss)) {
        conflicts.push({ id: word.id, previous, current });
      } else if (!previous) {
        byId.set(word.id, current);
      }
    }
  }
  assert.deepEqual(conflicts, []);
});

test('word-order exercises preserve exactly the supplied tokens', () => {
  const malformed = [];
  for (const level of levels) for (const unit of level.units) {
    for (const exercise of exercisesOf(unit)) {
      if (exercise.type !== 'order') continue;
      const words = exercise.words;
      const answer = exercise.correctOrder;
      if (!Array.isArray(words) || !Array.isArray(answer)) {
        malformed.push(level.id + '/' + unit.id + ': missing words/correctOrder arrays');
        continue;
      }
      const sortedWords = words.map(normalize).sort();
      const sortedAnswer = answer.map(normalize).sort();
      if (sortedWords.length !== sortedAnswer.length ||
          sortedWords.some((word, index) => word !== sortedAnswer[index])) {
        malformed.push({
          level: level.id,
          unit: unit.id,
          vocabId: exercise.vocabId,
          prompt: exercise.prompt,
          words,
          correctOrder: answer
        });
      }
    }
  }
  assert.deepEqual(malformed, []);
});


test('A1 Unit 5 younger-sibling writing model matches its linked vocabulary', () => {
  const unit = levels[0].units.find(entry => entry.id === 'a1_u5');
  assert.ok(unit);
  const exercise = exercisesOf(unit).find(entry => entry.type === 'write' && entry.vocabId === 'v111');
  assert.ok(exercise);
  assert.equal(exercise.modelAnswer, 'Ini adik saya.');
  assert.match(exercise.explanation, /adik saya/i);
});


test('A1 units 24-32 assess every vocabulary item at least once', () => {
  const uncovered = [];
  for (const unit of levels[0].units.slice(23, 32)) {
    const linked = new Set(exercisesOf(unit).map(exercise => exercise.vocabId));
    for (const word of unit.vocab || []) {
      if (!linked.has(word.id)) uncovered.push(unit.id + '/' + word.id);
    }
  }
  assert.deepEqual(uncovered, []);
});

test('new A1 U24-U32 meaning checks use the linked vocabulary gloss', () => {
  const addedIds = new Set([
    'v387', 'v393', 'v401', 'v402', 'v405', 'v411', 'v412', 'v420', 'v424',
    'v430', 'v434', 'v436', 'v441', 'v444', 'v447', 'v454', 'v456', 'v459',
    'v462', 'v464', 'v470', 'v471'
  ]);
  const mismatches = [];
  for (const unit of levels[0].units.slice(23, 32)) {
    const words = new Map(unit.vocab.map(word => [word.id, word]));
    for (const exercise of exercisesOf(unit)) {
      if (!addedIds.has(exercise.vocabId) || exercise.type !== 'mc') continue;
      const word = words.get(exercise.vocabId);
      if (word && exercise.options?.[exercise.answer] !== word.esp) {
        mismatches.push(unit.id + '/' + word.idn);
      }
    }
  }
  assert.deepEqual(mismatches, []);
});


test('remaining A1 units and A2 U1 assess every local vocabulary item', () => {
  const a1Units = [1, 4, 9, 11, 12, 18, 19, 21, 23];
  const uncoveredA1 = [];
  for (const number of a1Units) {
    const unit = levels[0].units.find(entry => entry.id === 'a1_u' + number);
    const linked = new Set(exercisesOf(unit).map(exercise => exercise.vocabId));
    for (const word of unit.vocab || []) {
      if (!linked.has(word.id)) uncoveredA1.push(unit.id + '/' + word.id);
    }
  }
  const unitA2 = levels[1].units.find(entry => entry.id === 'a2_u1');
  const linkedA2 = new Set(exercisesOf(unitA2).map(exercise => exercise.vocabId));
  const uncoveredA2 = Array.from(unitA2.vocab)
    .filter(word => !linkedA2.has(word.id)).map(word => unitA2.id + '/' + word.id);
  assert.deepEqual(uncoveredA1, []);
  assert.deepEqual(uncoveredA2, []);
});

test('new remaining A1 and A2 U1 meaning checks match their vocabulary glosses', () => {
  const addedByUnit = {
    a1_u1: ['v465', 'v1002'],
    a1_u4: ['v40', 'v41'],
    a1_u9: ['v273', 'v275', 'v276', 'v277', 'v279'],
    a1_u11: ['v35', 'v36', 'v122'],
    a1_u12: ['v304'],
    a1_u18: ['v348'],
    a1_u19: ['v333'],
    a1_u21: ['v351', 'v354'],
    a1_u23: ['v375'],
    a2_u1: ['a2u1_selasa', 'a2u1_bulan', 'a2u1_januari', 'a2u1_mei', 'a2u1_september']
  };
  const mismatches = [];
  for (const [unitId, ids] of Object.entries(addedByUnit)) {
    const level = unitId === 'a2_u1' ? levels[1] : levels[0];
    const unit = level.units.find(entry => entry.id === unitId);
    for (const id of ids) {
      const word = unit.vocab.find(entry => entry.id === id);
      const exercise = exercisesOf(unit).find(entry => entry.vocabId === id && entry.type === 'mc');
      if (!word || !exercise || exercise.options?.[exercise.answer] !== word.esp) {
        mismatches.push(level.id + '/' + unitId + '/' + id);
      }
    }
  }
  assert.deepEqual(mismatches, []);
});
