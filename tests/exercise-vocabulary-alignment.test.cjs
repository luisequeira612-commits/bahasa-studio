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
      if (exercise.type === 'write' && !exercise.modelAnswer) continue;
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
