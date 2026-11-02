import test from 'node:test';
import assert from 'node:assert/strict';
import { auditCurriculum, auditCurricula } from '../scripts/audit-curriculum-quality.mjs';

test('accepts a structurally consistent curriculum without external dictionary access', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{
      id: 'u1',
      title: 'Unit 1',
      vocab: [{ id: 'v1', idn: 'makan', esp: 'comer', ex: 'Saya makan.', exEsp: 'Yo como.' }],
      exercises: [
        { vocabId: 'v1', type: 'mc', prompt: 'Choose', options: ['comer', 'beber'], answer: 0 },
        { vocabId: 'v1', type: 'order', prompt: 'Order', words: ['Saya', 'makan'], correctOrder: ['Saya', 'makan'] },
      ],
      lessons: [{ vocabIds: ['v1'], exercises: [{ vocabId: 'v1', type: 'listen', prompt: 'Listen' }] }],
    }],
  });
  assert.equal(report.error_count, 0);
  assert.equal(report.vocabulary_count, 1);
});

test('detects duplicate IDs and unresolved vocabulary references', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'One', vocab: [{ id: 'same', idn: 'satu', esp: 'uno' }], exercises: [{ vocabId: 'missing', type: 'write', prompt: 'Write' }] },
      { id: 'u2', title: 'Two', vocab: [{ id: 'same', idn: 'dua', esp: 'dos' }], exercises: [] },
    ],
  });
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_ID_DUPLICATE'));
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_REFERENCE_MISSING'));
  assert.ok(report.error_count >= 2);
});

test('detects invalid multiple-choice and ordering structures', () => {
  const report = auditCurriculum({
    id: 'A2',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [],
      exercises: [
        { type: 'mc', prompt: 'Pick', options: ['a', 'b'], answer: 4 },
        { type: 'order', prompt: 'Order', words: ['a', 'b'], correctOrder: ['a', 'c'] },
      ],
    }],
  });
  assert.ok(report.issues.some((item) => item.code === 'MC_ANSWER_OUT_OF_RANGE'));
  assert.ok(report.issues.some((item) => item.code === 'ORDER_TOKEN_MISMATCH'));
});

test('reports incomplete examples as warnings, not linguistic verdicts', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{ id: 'u1', title: 'One', vocab: [{ id: 'v1', idn: 'baik', esp: 'bueno' }], exercises: [] }],
  });
  assert.equal(report.error_count, 0);
  assert.equal(report.warning_count, 2);
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_EXAMPLE_INCOMPLETE'));
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_NOT_EXPLICITLY_ASSESSED'));
});

test('classifies a shared vocabulary ID for the same Indonesian term as informational', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'One', vocab: [{ id: 'makan', idn: 'Makan', esp: 'Comer', ex: 'Saya makan', exEsp: 'Yo como' }], exercises: [{ vocabId: 'makan', type: 'listen', prompt: 'Listen' }] },
      { id: 'u2', title: 'Two', vocab: [{ id: 'makan', idn: 'makan', esp: 'Comer', ex: 'Saya makan', exEsp: 'Yo como' }], exercises: [{ vocabId: 'makan', type: 'listen', prompt: 'Listen' }] },
    ],
  });
  assert.equal(report.error_count, 0);
  assert.equal(report.vocabulary_count, 2);
  assert.equal(report.unique_vocabulary_id_count, 1);
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_ID_REUSED_SAME_TERM' && item.severity === 'info'));
  assert.equal(report.warning_count, 0);
  assert.equal(report.info_count, 1);
});

test('resolves cumulative review references against vocabulary from another level', () => {
  const report = auditCurriculum({
    id: 'A2',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [{ id: 'a2_word', idn: 'jadwal', esp: 'horario' }],
      lessons: [{
        vocabIds: ['a2_word'],
        reviewVocabIds: ['a1_word'],
        exercises: [{ vocabId: 'a1_word', type: 'listen', prompt: 'Listen' }],
      }],
    }],
  }, 'A2', new Set(['a1_word']));
  assert.equal(report.error_count, 0);
  assert.ok(!report.issues.some((item) => item.code === 'VOCAB_REFERENCE_MISSING'));
});

test('checks reviewVocabIds and reports missing explicit exercise coverage inside lessons', () => {
  const report = auditCurriculum({
    id: 'A2',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [{ id: 'a2_word', idn: 'jadwal', esp: 'horario', ex: 'Jadwal saya penuh.', exEsp: 'Mi horario está lleno.' }],
      lessons: [{ vocabIds: ['a2_word'], reviewVocabIds: ['missing'], exercises: [] }],
    }],
  });
  assert.equal(report.warning_count, 1);
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_REFERENCE_MISSING'));
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_NOT_EXPLICITLY_ASSESSED'));
});

test('validates lesson-level exercise prompts and answer structures', () => {
  const report = auditCurriculum({
    id: 'A2',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [],
      lessons: [{
        exercises: [
          { type: 'mc', prompt: 'Pick one', options: ['a', 'b'], answer: 3 },
          { type: 'order', prompt: 'Order', words: ['a', 'b'], correctOrder: ['a', 'c'] },
          { type: 'listen', answer: 'Saya makan.' },
        ],
      }],
    }],
  });
  assert.ok(report.issues.some((item) => item.code === 'LESSON_MC_ANSWER_OUT_OF_RANGE'));
  assert.ok(report.issues.some((item) => item.code === 'LESSON_ORDER_TOKEN_MISMATCH'));
  assert.ok(report.issues.some((item) => item.code === 'LESSON_EXERCISE_PROMPT_MISSING'));
});

test('detects empty and duplicate multiple-choice options at unit and lesson level', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [],
      exercises: [
        { type: 'mc', prompt: 'Pick', options: ['Uno', ' uno ', ''], answer: 0 },
      ],
      lessons: [{
        exercises: [
          { type: 'mc', prompt: 'Pick', options: ['Sí', 'sí'], answer: 0 },
        ],
      }],
    }],
  });
  assert.ok(report.issues.some((item) => item.code === 'MC_OPTION_EMPTY' && item.severity === 'error'));
  assert.ok(report.issues.some((item) => item.code === 'MC_OPTION_DUPLICATE' && item.severity === 'warning'));
  assert.ok(report.issues.some((item) => item.code === 'LESSON_MC_OPTION_DUPLICATE' && item.severity === 'warning'));
});

test('detects duplicate lesson introductions and contradictory new-versus-review references', () => {
  const report = auditCurriculum({
    id: 'A2',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [
        { id: 'new_word', idn: 'berbicara', esp: 'hablar' },
        { id: 'review_word', idn: 'makan', esp: 'comer' },
      ],
      lessons: [{
        vocabIds: ['new_word', 'new_word', 'review_word'],
        reviewVocabIds: ['review_word', 'review_word'],
        exercises: [],
      }],
    }],
  });
  assert.ok(report.issues.some((item) => item.code === 'LESSON_VOCAB_INTRODUCED_DUPLICATE' && item.severity === 'error'));
  assert.ok(report.issues.some((item) => item.code === 'LESSON_REVIEW_VOCAB_DUPLICATE' && item.severity === 'warning'));
  assert.ok(report.issues.some((item) => item.code === 'LESSON_VOCAB_NEW_AND_REVIEW' && item.severity === 'warning'));
});


test('allows cumulative references from A2 to A1 but rejects references from A1 to future A2 vocabulary', () => {
  const reports = auditCurricula([
    {
      id: 'A1',
      units: [{
        id: 'a1_u1',
        title: 'A1 unit',
        vocab: [{ id: 'a1_word', idn: 'makan', esp: 'comer' }],
        lessons: [{
          vocabIds: ['a2_word'],
          reviewVocabIds: [],
          exercises: [{ vocabId: 'a2_word', type: 'listen', prompt: 'Listen' }],
        }],
      }],
    },
    {
      id: 'A2',
      units: [{
        id: 'a2_u1',
        title: 'A2 unit',
        vocab: [{ id: 'a2_word', idn: 'jadwal', esp: 'horario' }],
        lessons: [{
          vocabIds: ['a2_word'],
          reviewVocabIds: ['a1_word'],
          exercises: [{ vocabId: 'a1_word', type: 'listen', prompt: 'Listen' }],
        }],
      }],
    },
  ]);

  assert.equal(reports.length, 2);
  assert.ok(reports[0].issues.some((item) =>
    item.code === 'VOCAB_REFERENCE_MISSING' && item.path.includes('vocabIds')
  ));
  assert.ok(reports[0].issues.some((item) =>
    item.code === 'VOCAB_REFERENCE_MISSING' && item.path.includes('exercises')
  ));
  assert.equal(reports[1].error_count, 0);
  assert.ok(!reports[1].issues.some((item) => item.code === 'VOCAB_REFERENCE_MISSING'));
});


test('warns when a reused vocabulary ID keeps the Indonesian term but changes its Spanish gloss', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'One', vocab: [{ id: 'shared', idn: 'baik', esp: 'bueno' }], exercises: [] },
      { id: 'u2', title: 'Two', vocab: [{ id: 'shared', idn: 'Baik', esp: 'bien' }], exercises: [] },
    ],
  });
  assert.equal(report.error_count, 0);
  assert.ok(report.issues.some((item) =>
    item.code === 'VOCAB_TRANSLATION_INCONSISTENT' &&
    item.severity === 'warning' &&
    item.path === 'A1.units[1].vocab[0]'
  ));
});

test('classifies same-term vocabulary ID reuse with the same gloss as informational', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'One', vocab: [{ id: 'shared', idn: 'baik', esp: 'Bueno', ex: 'Dia baik', exEsp: 'Él es bueno' }], exercises: [{ vocabId: 'shared', type: 'listen', prompt: 'Listen' }] },
      { id: 'u2', title: 'Two', vocab: [{ id: 'shared', idn: 'BAIK', esp: '  bueno  ', ex: 'Dia baik', exEsp: 'Él es bueno' }], exercises: [{ vocabId: 'shared', type: 'listen', prompt: 'Listen' }] },
    ],
  });

  const reuse = report.issues.find((item) => item.code === 'VOCAB_ID_REUSED_SAME_TERM');
  assert.equal(reuse?.severity, 'info');
  assert.equal(report.error_count, 0);
  assert.equal(report.warning_count, 0);
  assert.equal(report.info_count, 1);
});

test('does not warn for harmless case and whitespace differences in reused glosses', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'One', vocab: [{ id: 'shared', idn: 'baik', esp: 'Bueno' }], exercises: [] },
      { id: 'u2', title: 'Two', vocab: [{ id: 'shared', idn: 'BAIK', esp: '  bueno  ' }], exercises: [] },
    ],
  });
  assert.ok(!report.issues.some((item) => item.code === 'VOCAB_TRANSLATION_INCONSISTENT'));
});


test('warns when a unit exercise assesses vocabulary introduced only in a later unit', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'First', vocab: [{ id: 'first', idn: 'satu', esp: 'uno' }], exercises: [{ vocabId: 'later', type: 'mc', prompt: 'Choose', options: ['dos', 'uno'], answer: 0 }] },
      { id: 'u2', title: 'Second', vocab: [{ id: 'later', idn: 'dua', esp: 'dos' }], exercises: [{ vocabId: 'later', type: 'mc', prompt: 'Choose', options: ['dos', 'uno'], answer: 0 }] },
    ],
  });
  assert.equal(report.error_count, 0);
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_USED_BEFORE_INTRODUCTION' && item.path === 'A1.units[0].exercises[0].vocabId'));
  assert.ok(!report.issues.some((item) => item.code === 'VOCAB_USED_BEFORE_INTRODUCTION' && item.path === 'A1.units[1].exercises[0].vocabId'));
});

 test('allows A2 unit exercises to review vocabulary introduced in A1', () => {
  const report = auditCurriculum({
    id: 'A2',
    units: [{ id: 'a2_u1', title: 'A2', vocab: [{ id: 'a2_new', idn: 'jadwal', esp: 'horario' }], exercises: [{ vocabId: 'a1_known', type: 'listen', prompt: 'Listen' }] }],
  }, 'A2', new Set(['a1_known']));
  assert.equal(report.error_count, 0);
  assert.ok(!report.issues.some((item) => item.code === 'VOCAB_USED_BEFORE_INTRODUCTION'));
});


test('warns when a lesson exercise uses vocabulary introduced in a later lesson', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [
        { id: 'first', idn: 'satu', esp: 'uno' },
        { id: 'later', idn: 'dua', esp: 'dos' },
      ],
      lessons: [
        { vocabIds: ['first'], reviewVocabIds: [], exercises: [{ vocabId: 'later', type: 'listen', prompt: 'Listen' }] },
        { vocabIds: ['later'], reviewVocabIds: [], exercises: [{ vocabId: 'later', type: 'listen', prompt: 'Listen' }] },
      ],
    }],
  });
  assert.equal(report.error_count, 0);
  assert.ok(report.issues.some((item) =>
    item.code === 'LESSON_VOCAB_USED_BEFORE_INTRODUCTION' &&
    item.path === 'A1.units[0].lessons[0].exercises[0].vocabId'
  ));
  assert.ok(!report.issues.some((item) =>
    item.code === 'LESSON_VOCAB_USED_BEFORE_INTRODUCTION' &&
    item.path === 'A1.units[0].lessons[1].exercises[0].vocabId'
  ));
});

test('allows a lesson exercise to use later-introduced vocabulary when explicitly marked for review', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [
        { id: 'first', idn: 'satu', esp: 'uno' },
        { id: 'later', idn: 'dua', esp: 'dos' },
      ],
      lessons: [
        { vocabIds: ['first'], reviewVocabIds: ['later'], exercises: [{ vocabId: 'later', type: 'listen', prompt: 'Listen' }] },
        { vocabIds: ['later'], reviewVocabIds: [], exercises: [{ vocabId: 'later', type: 'listen', prompt: 'Listen' }] },
      ],
    }],
  });
  assert.ok(!report.issues.some((item) => item.code === 'LESSON_VOCAB_USED_BEFORE_INTRODUCTION'));
});

test('reports vocabulary without an explicit exercise link across unit and lesson exercises', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [
        { id: 'unit_word', idn: 'satu', esp: 'uno' },
        { id: 'lesson_word', idn: 'dua', esp: 'dos' },
        { id: 'uncovered_word', idn: 'tiga', esp: 'tres' },
      ],
      exercises: [{ vocabId: 'unit_word', type: 'listen', prompt: 'Listen' }],
      lessons: [{
        exercises: [{ vocabId: 'lesson_word', type: 'translate_es_id', prompt: 'Translate' }],
      }],
    }],
  });
  const uncovered = report.issues.filter((item) => item.code === 'VOCAB_NOT_EXPLICITLY_ASSESSED');
  assert.equal(uncovered.length, 1);
  assert.equal(uncovered[0].path, 'A1.units[0].vocab[2]');
  assert.match(uncovered[0].message, /uncovered_word/);
  assert.equal(uncovered[0].severity, 'warning');
});

test('does not treat an uncovered-vocabulary warning as a structural error', () => {
  const report = auditCurriculum({
    id: 'A2',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [{ id: 'word', idn: 'satu', esp: 'uno' }],
      exercises: [],
    }],
  });
  assert.equal(report.error_count, 0);
  assert.equal(report.warning_count, 2); // missing example plus missing explicit exercise link
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_NOT_EXPLICITLY_ASSESSED'));
});

test('checks grouped vocabIds references for missing and future unit vocabulary', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'First', vocab: [{ id: 'first', idn: 'satu', esp: 'uno' }], exercises: [{ vocabIds: ['later', 'missing'], type: 'listen', prompt: 'Listen' }] },
      { id: 'u2', title: 'Second', vocab: [{ id: 'later', idn: 'dua', esp: 'dos' }], exercises: [] },
    ],
  });
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_REFERENCE_MISSING' && item.path.endsWith('.vocabIds')));
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_USED_BEFORE_INTRODUCTION' && item.path.endsWith('.vocabIds')));
});

test('checks grouped vocabIds references for missing and future lesson vocabulary', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{
      id: 'u1', title: 'One',
      vocab: [{ id: 'first', idn: 'satu', esp: 'uno' }, { id: 'later', idn: 'dua', esp: 'dos' }],
      lessons: [
        { vocabIds: ['first'], reviewVocabIds: [], exercises: [{ vocabIds: ['later', 'missing'], type: 'listen', prompt: 'Listen' }] },
        { vocabIds: ['later'], reviewVocabIds: [], exercises: [] },
      ],
    }],
  });
  assert.ok(report.issues.some((item) => item.code === 'VOCAB_REFERENCE_MISSING' && item.path.endsWith('.vocabIds')));
  assert.ok(report.issues.some((item) => item.code === 'LESSON_VOCAB_USED_BEFORE_INTRODUCTION' && item.path.endsWith('.vocabIds')));
});

test('rejects malformed single and grouped vocabulary references on unit and lesson exercises', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [],
      exercises: [
        { type: 'listen', prompt: 'Listen', vocabId: '' },
        { type: 'listen', prompt: 'Listen', vocabIds: 'not-an-array' },
        { type: 'listen', prompt: 'Listen', vocabIds: ['valid', '', null] },
      ],
      lessons: [{
        exercises: [
          { type: 'listen', prompt: 'Listen', vocabId: 42 },
          { type: 'listen', prompt: 'Listen', vocabIds: { id: 'word' } },
          { type: 'listen', prompt: 'Listen', vocabIds: ['valid', false] },
        ],
      }],
    }],
  });

  for (const code of [
    'EXERCISE_VOCAB_ID_INVALID',
    'EXERCISE_VOCAB_IDS_INVALID',
    'EXERCISE_VOCAB_IDS_ITEM_INVALID',
    'LESSON_EXERCISE_VOCAB_ID_INVALID',
    'LESSON_EXERCISE_VOCAB_IDS_INVALID',
    'LESSON_EXERCISE_VOCAB_IDS_ITEM_INVALID',
  ]) {
    assert.ok(report.issues.some((item) => item.code === code), `Missing audit issue: ${code}`);
  }
  assert.equal(report.error_count, 9);
});

test('validates acceptedAnswers arrays, entries and optional status metadata', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [],
      exercises: [
        { type: 'translate_es_id', prompt: 'Translate', answer: 'Terima kasih', acceptedAnswers: 'Makasih' },
        { type: 'translate_es_id', prompt: 'Translate', answer: 'Terima kasih', acceptedAnswers: ['Makasih', '   '] },
        { type: 'translate_es_id', prompt: 'Translate', answer: 'Terima kasih', acceptedAnswers: [{ text: '' }] },
        { type: 'translate_es_id', prompt: 'Translate', answer: 'Terima kasih', acceptedAnswers: [{ text: 'Makasih', status: '' }] },
      ],
      lessons: [{
        exercises: [
          { type: 'translate_es_id', prompt: 'Translate', answer: 'Terima kasih', acceptedAnswers: [null] },
        ],
      }],
    }],
  });
  for (const code of [
    'ACCEPTED_ANSWERS_INVALID',
    'ACCEPTED_ANSWER_EMPTY',
    'ACCEPTED_ANSWER_ITEM_INVALID',
    'ACCEPTED_ANSWER_STATUS_INVALID',
    'LESSON_ACCEPTED_ANSWER_ITEM_INVALID',
  ]) {
    assert.ok(report.issues.some((item) => item.code === code), `Missing audit issue: ${code}`);
  }
  assert.equal(report.error_count, 5);
});


test('warns when accepted alternatives duplicate each other or the canonical answer after normalization', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{
      id: 'u1',
      title: 'One',
      vocab: [],
      exercises: [{
        type: 'translate_es_id',
        prompt: 'Translate',
        answer: 'Terima kasih',
        acceptedAnswers: ['Makasih', ' makasih ', '  TERIMA   KASIH  '],
      }],
      lessons: [{
        exercises: [{
          type: 'translate_es_id',
          prompt: 'Translate',
          answer: 'Sampai jumpa',
          acceptedAnswers: [{ text: 'Sampai jumpa' }, { text: ' sampai   jumpa ' }],
        }],
      }],
    }],
  });

  assert.equal(report.error_count, 0);
  assert.equal(report.warning_count, 4);
  assert.ok(report.issues.some((item) =>
    item.code === 'ACCEPTED_ANSWER_DUPLICATE' &&
    item.path.endsWith('.acceptedAnswers[1]')
  ));
  assert.ok(report.issues.some((item) =>
    item.code === 'ACCEPTED_ANSWER_DUPLICATES_CANONICAL' &&
    item.path.endsWith('.acceptedAnswers[2]')
  ));
  assert.ok(report.issues.some((item) =>
    item.code === 'LESSON_ACCEPTED_ANSWER_DUPLICATES_CANONICAL' &&
    item.path.endsWith('.acceptedAnswers[0]')
  ));
  assert.ok(report.issues.some((item) =>
    item.code === 'LESSON_ACCEPTED_ANSWER_DUPLICATE' &&
    item.path.endsWith('.acceptedAnswers[1]')
  ));
});