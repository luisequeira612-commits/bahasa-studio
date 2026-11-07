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
        { vocabId: 'v1', type: 'mc', prompt: 'Choose', options: ['comer', 'beber'], answer: 0, audioText: 'Saya makan.' },
        { vocabId: 'v1', type: 'order', prompt: 'Order', words: ['Saya', 'makan'], correctOrder: ['Saya', 'makan'] },
      ],
      lessons: [{ vocabIds: ['v1'], exercises: [{ vocabId: 'v1', type: 'listen', prompt: 'Listen', answer: 'makan' }] }],
    }],
  });
  assert.equal(report.error_count, 0);
  assert.equal(report.vocabulary_count, 1);
  assert.deepEqual(report.audio_capability_coverage, {
    audio_text_exercise_count: 1,
    listen_exercise_count: 1,
    audio_capable_exercise_count: 2,
    units_with_audio_text: 1,
    units_without_audio_text: 0,
    units_with_listen_exercise: 1,
    units_without_listen_exercise: 0,
    units_with_audio_support: 1,
    units_without_audio_support: 0,
    units_without_audio_support_ids: [],
  });
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

test('warns when later-unit vocabulary appears in examples, dialogue, prompts and instructions', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      {
        id: 'u1', title: 'First',
        vocab: [{ id: 'first', idn: 'satu', esp: 'uno', ex: 'Saya pergi ke sekolah.', exEsp: 'Voy a la escuela.' }],
        exercises: [{ type: 'listen', prompt: 'Traduce: «besok»', hint: 'Usa también «pergi».', audioText: 'Besok saya pergi.', answer: 'Besok saya pergi.' }],
      },
      { id: 'u2', title: 'Second', vocab: [
        { id: 'later', idn: 'pergi', esp: 'ir' },
        { id: 'tomorrow', idn: 'besok', esp: 'mañana' },
      ], exercises: [] },
    ],
  });

  const textIssues = report.issues.filter((item) => item.code === 'TEXT_VOCAB_USED_BEFORE_INTRODUCTION');
  assert.ok(textIssues.some((item) => item.path.endsWith('.vocab[0].ex') && item.message.includes('pergi')));
  assert.ok(textIssues.some((item) => item.path.endsWith('.exercises[0].prompt#quoted[0]') && item.message.includes('besok')));
  assert.ok(textIssues.some((item) => item.path.endsWith('.exercises[0].hint#quoted[0]') && item.message.includes('pergi')));
  assert.ok(textIssues.some((item) => item.path.endsWith('.exercises[0].audioText') && item.message.includes('pergi')));
  assert.ok(textIssues.some((item) => item.path.endsWith('.exercises[0].answer') && item.message.includes('pergi')));
});

test('warns when a lesson prompt or dialogue contains vocabulary introduced in a later lesson', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{
      id: 'u1', title: 'One',
      vocab: [
        { id: 'first', idn: 'satu', esp: 'uno' },
        { id: 'later', idn: 'pergi', esp: 'ir' },
      ],
      lessons: [
        { title: 'First lesson', vocabIds: ['first'], exercises: [{ type: 'listen', prompt: 'Escucha: «Saya pergi»', audioText: 'Saya pergi.' }] },
        { title: 'Second lesson', vocabIds: ['later'], exercises: [] },
      ],
    }],
  });

  const issue = report.issues.find((item) => item.code === 'LESSON_TEXT_VOCAB_USED_BEFORE_INTRODUCTION' && item.path.includes('.prompt#quoted'));
  assert.ok(issue);
  assert.match(issue.path, /lessons\[0\]\.exercises\[0\]\.prompt#quoted/);
  assert.match(issue.message, /pergi/);
});

test('text vocabulary scan respects exact token boundaries and prior introductions', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'First', vocab: [{ id: 'makan', idn: 'makan', esp: 'comer' }], exercises: [] },
      { id: 'u2', title: 'Second', vocab: [{ id: 'later', idn: 'makanan', esp: 'comida' }], exercises: [{ type: 'write', prompt: 'La forma memakan se relaciona con makan.' }] },
    ],
  });

  const issues = report.issues.filter((item) => item.code === 'TEXT_VOCAB_USED_BEFORE_INTRODUCTION');
  assert.equal(issues.length, 0);
});

test('ignores Spanish prose around quoted Indonesian model-answer text', () => {
  const report = auditCurriculum({
    id: 'A2',
    units: [
      { id: 'u1', title: 'First', vocab: [{ id: 'makan', idn: 'makan', esp: 'comer' }], exercises: [] },
      { id: 'u2', title: 'Second', vocab: [{ id: 'yesterday', idn: 'kemarin', esp: 'ayer' }], exercises: [{
        type: 'write',
        modelAnswer: 'Kemarin = hecho situado en el día anterior. En ambos casos: «Pertama, saya makan.»',
      }] },
    ],
  });

  assert.ok(!report.issues.some((item) =>
    ['TEXT_VOCAB_USED_BEFORE_INTRODUCTION', 'LESSON_TEXT_VOCAB_USED_BEFORE_INTRODUCTION'].includes(item.code) &&
    item.message.includes('kemarin')
  ));
});

test('continues scanning model answers written entirely in Indonesian', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'First', vocab: [{ id: 'first', idn: 'satu', esp: 'uno' }], exercises: [{ type: 'write', modelAnswer: 'Saya pergi.' }] },
      { id: 'u2', title: 'Second', vocab: [{ id: 'later', idn: 'pergi', esp: 'ir' }], exercises: [] },
    ],
  });

  assert.ok(report.issues.some((item) =>
    item.code === 'TEXT_VOCAB_USED_BEFORE_INTRODUCTION' &&
    item.path.endsWith('.modelAnswer') && item.message.includes('pergi')
  ));
});

test('counts a component as introduced through an earlier multiword vocabulary entry', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'First', vocab: [{ id: 'greeting', idn: 'Apa kabar?', esp: '¿Qué tal?' }], exercises: [] },
      { id: 'u2', title: 'Second', vocab: [], exercises: [{ type: 'listen', audioText: 'Apa ya?' }] },
      { id: 'u3', title: 'Third', vocab: [{ id: 'apa', idn: 'Apa', esp: 'qué' }], exercises: [] },
    ],
  });

  assert.ok(!report.issues.some((item) => item.code === 'TEXT_VOCAB_USED_BEFORE_INTRODUCTION' && item.message.includes('Apa')));
});

test('keeps the specific Di sini warning without a duplicate Sini warning', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'First', vocab: [], exercises: [{ type: 'listen', audioText: 'Saya di sini.' }] },
      { id: 'u2', title: 'Second', vocab: [{ id: 'di_sini', idn: 'Di sini', esp: 'aquí' }], exercises: [] },
      { id: 'u3', title: 'Third', vocab: [{ id: 'sini', idn: 'Sini', esp: 'aquí' }], exercises: [] },
    ],
  });

  const issues = report.issues.filter((item) => item.code === 'TEXT_VOCAB_USED_BEFORE_INTRODUCTION');
  assert.equal(issues.filter((item) => item.message.includes('Di sini')).length, 1);
  assert.ok(!issues.some((item) => item.message.includes('Sini')));
});

test('does not treat Spanish glosses, prose or translated options as Indonesian segments', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      {
        id: 'u1', title: 'First',
        grammar: 'Membayar significa pagar; describe un tono formal o informal.',
        exercises: [{ type: 'mc', prompt: '¿Qué significa comprar?', options: ['Formal', 'Informal'], answer: 0 }],
      },
      { id: 'u2', title: 'Second', vocab: [
        { id: 'pagar', idn: 'pagar', esp: 'cerca' },
        { id: 'formal', idn: 'formal', esp: 'formal' },
        { id: 'informal', idn: 'informal', esp: 'informal' },
      ], exercises: [] },
    ],
  });

  assert.ok(!report.issues.some((item) =>
    ['TEXT_VOCAB_USED_BEFORE_INTRODUCTION', 'LESSON_TEXT_VOCAB_USED_BEFORE_INTRODUCTION'].includes(item.code)
  ));
});

test('does not flag a later single-word entry inside an earlier taught expression', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      { id: 'u1', title: 'First', vocab: [{ id: 'greeting', idn: 'selamat pagi', esp: 'buenos días' }], exercises: [{ type: 'listen', prompt: 'Escucha', audioText: 'Selamat pagi.' }] },
      { id: 'u2', title: 'Second', vocab: [{ id: 'morning', idn: 'pagi', esp: 'mañana' }], exercises: [] },
    ],
  });

  assert.ok(!report.issues.some((item) => item.code === 'TEXT_VOCAB_USED_BEFORE_INTRODUCTION'));
});

test('lesson text scan allows future vocabulary explicitly declared as review', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [{
      id: 'u1', title: 'One',
      vocab: [{ id: 'first', idn: 'satu', esp: 'uno' }, { id: 'later', idn: 'pergi', esp: 'ir' }],
      lessons: [
        { vocabIds: ['first'], reviewVocabIds: ['later'], exercises: [{ type: 'listen', prompt: 'Escucha «Saya pergi»', audioText: 'Saya pergi.' }] },
        { vocabIds: ['later'], exercises: [] },
      ],
    }],
  });

  assert.ok(!report.issues.some((item) => item.code === 'LESSON_TEXT_VOCAB_USED_BEFORE_INTRODUCTION'));
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
  assert.equal(report.warning_count, 5);
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

test('reports exercise modality and unit/lesson coverage metrics', () => {
  const report = auditCurriculum({
    id: 'A1',
    units: [
      {
        id: 'u1',
        title: 'With exercises',
        vocab: [{ id: 'v1', idn: 'satu', esp: 'uno', ex: 'Satu.', exEsp: 'Uno.' }],
        exercises: [
          { vocabId: 'v1', type: 'mc', prompt: 'Choose', options: ['uno', 'dos'], answer: 0 },
          { vocabId: 'v1', type: 'write', prompt: 'Write' },
        ],
        lessons: [
          { vocabIds: ['v1'], exercises: [{ vocabId: 'v1', type: 'listen', prompt: 'Listen' }] },
          { vocabIds: [], exercises: [] },
        ],
      },
      { id: 'u2', title: 'Without exercises', vocab: [], exercises: [] },
    ],
  });

  assert.equal(report.exercise_count, 3);
  assert.deepEqual(report.exercise_type_counts, { mc: 1, write: 1, listen: 1 });
  assert.deepEqual(report.exercise_type_distribution, {
    listen: {
      total: 1,
      units_with_type: 1,
      units_without_type: 1,
      units_without_type_ids: ['u2'],
      min_per_unit: 0,
      max_per_unit: 1,
      average_per_unit: 0.5,
    },
    mc: {
      total: 1,
      units_with_type: 1,
      units_without_type: 1,
      units_without_type_ids: ['u2'],
      min_per_unit: 0,
      max_per_unit: 1,
      average_per_unit: 0.5,
    },
    write: {
      total: 1,
      units_with_type: 1,
      units_without_type: 1,
      units_without_type_ids: ['u2'],
      min_per_unit: 0,
      max_per_unit: 1,
      average_per_unit: 0.5,
    },
  });
  assert.equal(report.units_with_exercises, 1);
  assert.equal(report.units_without_exercises, 1);
  assert.equal(report.lesson_count, 2);
  assert.equal(report.lessons_with_exercises, 1);
  assert.equal(report.lessons_without_exercises, 1);
  assert.deepEqual(report.unit_exercise_distribution, {
    count: 2,
    min: 0,
    max: 3,
    average: 1.5,
  });
  assert.deepEqual(report.lesson_exercise_distribution, {
    count: 2,
    min: 0,
    max: 1,
    average: 0.5,
  });
});
