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
