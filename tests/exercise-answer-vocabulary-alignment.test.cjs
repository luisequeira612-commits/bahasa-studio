'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = { window: {} };
for (const file of ['curriculum-a1.js', 'curriculum-a2.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
}
const levels = [context.window.BAHASA_CURRICULUM_A1, context.window.BAHASA_CURRICULUM_A2];

function normalize(value) {
  return String(value ?? '').toLocaleLowerCase('es').normalize('NFD')
    .replace(/\p{M}/gu, '').replace(/\/a\b/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}

function exercisesOf(unit) {
  return [
    ...(unit.exercises || []),
    ...(unit.lessons || []).flatMap(lesson => lesson.exercises || [])
  ];
}

const vocabularyByUnit = new Map();
for (const level of levels) {
  for (const unit of level.units) {
    vocabularyByUnit.set(unit.id, new Map((unit.vocab || []).map(word => [word.id, word])));
  }
}

test('translation and listening answers contain the vocabulary term they assess', () => {
  const mismatches = [];
  for (const level of levels) for (const unit of level.units) {
    const vocabulary = vocabularyByUnit.get(unit.id);
    const reviewIds = new Set((unit.lessons || []).flatMap(lesson => lesson.reviewVocabIds || []));
    for (const exercise of exercisesOf(unit)) {
      if (!['translate_es_id', 'listen'].includes(exercise.type)) continue;
      // Legacy review IDs can refer to earlier vocabulary banks; this check targets
      // only the unit's own newly introduced vocabulary.
      if (reviewIds.has(exercise.vocabId) && !vocabulary.has(exercise.vocabId)) continue;
      const word = vocabulary.get(exercise.vocabId);
      if (!word || typeof exercise.answer !== 'string') {
        mismatches.push({ level: level.id, unit: unit.id, vocabId: exercise.vocabId, reason: 'missing linked word or text answer' });
        continue;
      }
      const answer = normalize(exercise.answer);
      const term = normalize(word.idn);
      if (!term || !answer.includes(term)) {
        mismatches.push({
          level: level.id, unit: unit.id, vocabId: word.id, term: word.idn,
          type: exercise.type, prompt: exercise.prompt, answer: exercise.answer
        });
      }
    }
  }
  assert.deepEqual(mismatches, []);
});

test('meaning multiple-choice answers match a registered full gloss or one of its alternatives', () => {
  const mismatches = [];
  for (const level of levels) for (const unit of level.units) {
    const vocabulary = vocabularyByUnit.get(unit.id);
    const reviewIds = new Set((unit.lessons || []).flatMap(lesson => lesson.reviewVocabIds || []));
    for (const exercise of exercisesOf(unit)) {
      if (exercise.type !== 'mc' || !/qué significa/i.test(exercise.prompt || '')) continue;
      if (reviewIds.has(exercise.vocabId) && !vocabulary.has(exercise.vocabId)) continue;
      const word = vocabulary.get(exercise.vocabId);
      // Phrase-level meaning questions can have contextual translations that
      // cannot be judged from a single-word gloss without linguistic review.
      const target = normalize(String(exercise.prompt || '').split(/qué significa/i).pop());
      if (!word || target !== normalize(word.idn)) continue;
      const selected = exercise.options?.[exercise.answer];
      if (typeof selected !== 'string') {
        mismatches.push({ level: level.id, unit: unit.id, vocabId: exercise.vocabId, reason: 'missing linked word or selected option' });
        continue;
      }
      const fullGloss = normalize(word.esp);
      const alternatives = String(word.esp).split(/[;/]|\s+o\s+/i).map(normalize).filter(Boolean);
      const accepted = new Set([fullGloss, ...alternatives]);
      const selectedAlternatives = String(selected).split(/[;/]|\s+o\s+/i).map(normalize).filter(Boolean);
      if (!selectedAlternatives.some(value => accepted.has(value))) {
        mismatches.push({
          level: level.id, unit: unit.id, vocabId: word.id, term: word.idn,
          selected, gloss: word.esp, prompt: exercise.prompt
        });
      }
    }
  }
  assert.deepEqual(mismatches, []);
});
