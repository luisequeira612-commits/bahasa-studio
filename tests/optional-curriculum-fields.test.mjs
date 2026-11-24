import test from 'node:test';
import assert from 'node:assert/strict';
import { validateOptionalCurriculumFields } from '../scripts/validate-optional-curriculum-fields.mjs';

test('accepts multilingual optional fields without requiring them', () => {
  const legacy = { units: [{ vocab: [{ id: 'legacy', idn: 'makan', esp: 'comer' }], lessons: [], exercises: [] }] };
  const extended = { units: [{ vocab: [{
    id: 'jp-1', target: '食べる', esp: 'comer', reading: 'たべる', transliteration: 'taberu',
    pronunciation: { ipa: 'ta.be.ɾɯ' }, tokens: ['食', 'べる'],
    grammaticalFunctions: ['verbo', 'forma de diccionario'],
    forms: [{ value: '食べます', label: 'forma cortés' }],
    annotations: [{ type: 'usage', text: 'Verbo de acción.' }],
    verification: { status: 'not_checked', sources: [] }
  }], lessons: [{ exercises: [{ type: 'write', acceptedAnswers: ['食べる', 'たべる'] }] }], exercises: [] }] };
  assert.deepEqual(validateOptionalCurriculumFields(legacy), []);
  assert.deepEqual(validateOptionalCurriculumFields(extended), []);
});

test('rejects malformed optional fields and duplicate accepted answers', () => {
  const curriculum = { units: [{ vocab: [{
    reading: ' ', tokens: ['a', ''], pronunciation: { ipa: '' },
    forms: [{ value: 'x' }], annotations: [{ type: '', text: 'nota' }]
  }], lessons: [], exercises: [{ acceptedAnswers: ['Olá', 'olá '] }] }] };
  const codes = validateOptionalCurriculumFields(curriculum).map(issue => issue.code);
  for (const code of ['OPTIONAL_TEXT_INVALID', 'PRONUNCIATION_IPA_INVALID', 'FORM_ITEM_INVALID', 'ANNOTATION_ITEM_INVALID', 'OPTIONAL_TEXT_DUPLICATE']) assert.ok(codes.includes(code), code);
});

test('validator does not mutate curriculum data', () => {
  const curriculum = { units: [{ vocab: [{ reading: 'かな' }], lessons: [], exercises: [] }] };
  const before = JSON.stringify(curriculum);
  assert.deepEqual(validateOptionalCurriculumFields(curriculum), []);
  assert.equal(JSON.stringify(curriculum), before);
});


test('accepts multilingual text without assuming Latin script or space-delimited tokens', () => {
  const curriculum = { units: [{ vocab: [{
    target: '食べる', reading: 'たべる', transliteration: 'taberu',
    tokens: ['食', 'べる'], grammaticalFunctions: ['動詞', '辞書形'],
    forms: [{ value: '食べます', label: '丁寧形' }],
    annotations: [{ type: 'usage', text: '日常的な動作を表す。' }],
    pronunciation: { ipa: 'ta.be.ɾɯ' },
    verification: { status: 'not_checked', sources: [] }
  }, {
    target: 'مرحبا', reading: 'مَرْحَبًا', tokens: ['مرحبا'],
    annotations: [{ type: 'script', text: 'نص عربي متصل دون افتراض فصل الكلمات.' }]
  }, {
    target: 'ภาษาไทย', tokens: ['ภาษาไทย'], reading: 'ภาษาไทย'
  }, {
    target: '한국어', reading: '한국어', tokens: ['한', '국', '어']
  }, {
    target: 'नमस्ते', reading: 'नमस्ते', tokens: ['नमस्ते']
  }], lessons: [{ exercises: [{
    type: 'write', acceptedAnswers: ['食べる', 'たべる', 'مرحبا', 'ภาษาไทย', '한국어', 'नमस्ते', '👩🏽‍💻']
  }] }], exercises: [] }] };
  assert.deepEqual(validateOptionalCurriculumFields(curriculum), []);
});

test('normalizes canonically equivalent Unicode answers without stripping diacritics', () => {
  const curriculum = { units: [{ vocab: [], lessons: [], exercises: [{
    acceptedAnswers: ['café', 'cafe\u0301']
  }] }] };
  const issues = validateOptionalCurriculumFields(curriculum);
  assert.equal(issues.filter(issue => issue.code === 'OPTIONAL_TEXT_DUPLICATE').length, 1);
  assert.equal(issues[0].path, 'units[0].exercises[0].acceptedAnswers[1]');
  const distinct = { units: [{ vocab: [], lessons: [], exercises: [{
    acceptedAnswers: ['café', 'cafe']
  }] }] };
  assert.deepEqual(validateOptionalCurriculumFields(distinct), []);
});
