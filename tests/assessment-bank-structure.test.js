'use strict';

const assert = require('node:assert/strict');
const { ITEM_BANK, getAssessment, scoreAssessment } = require('../assessment-engine');

const ids = ITEM_BANK.map(item => item.id);
assert.equal(new Set(ids).size, ids.length, 'all item IDs must be unique');

for (const item of ITEM_BANK) {
  assert.ok(['A1', 'A2', 'B1', 'B2'].includes(item.level), item.id + ': valid level');
  assert.ok(['vocabulary', 'grammar', 'comprehension', 'interaction', 'production',
    'context', 'meN', 'diPassive', 'diPreposition', 'reading', 'voice', 'kanI',
    'derivation', 'register', 'nominalization', 'reference'].includes(item.skill), item.id + ': valid skill');
  assert.ok(['choice', 'open'].includes(item.type), item.id + ': valid type');
  assert.ok(Number.isInteger(item.points) && item.points > 0, item.id + ': positive integer points');
  if (item.type === 'choice') {
    assert.ok(Array.isArray(item.options) && item.options.length >= 2, item.id + ': choice options');
    assert.ok(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < item.options.length, item.id + ': answer key');
  }
  if (item.type === 'open') assert.ok(Array.isArray(item.rubric) && item.rubric.length > 0, item.id + ': open rubric');
}

const expanded = ITEM_BANK.filter(item => /^a1-u(?:18|19|20|21|22|23)-/.test(item.id));
assert.equal(expanded.length, 12, 'two new items per unit U18–U23');
assert.deepEqual([...new Set(expanded.map(item => item.unit))].sort(),
  ['a1_u18', 'a1_u19', 'a1_u20', 'a1_u21', 'a1_u22', 'a1_u23']);
for (const item of expanded) {
  assert.equal(item.level, 'A1');
  assert.ok(item.objective && item.objective.length > 10, item.id + ': declared objective');
  assert.equal(item.modality, 'written-choice', item.id + ': honest modality');
  assert.equal(item.reviewStatus, 'pilot-unreviewed', item.id + ': editorial status');
  assert.equal(item.type, 'choice');
  assert.ok(!Object.hasOwn(item, 'audioText'), item.id + ': no fabricated audio');
}
assert.equal(getAssessment('A1').filter(item => expanded.some(x => x.id === item.id)).length, 12);

const totalA1Points = ITEM_BANK.filter(item => item.level === 'A1').reduce((sum, item) => sum + item.points, 0);
assert.equal(totalA1Points, 36, 'A1 pilot total after expansion');
const blank = scoreAssessment('A1', {});
assert.equal(blank.possible, 36);
assert.equal(blank.earned, 0);
assert.equal(blank.provisionalPass, false);
assert.equal(blank.thresholds.validated, false);

const open = ITEM_BANK.find(item => item.level === 'A1' && item.type === 'open');
const pending = scoreAssessment('A1', { [open.id]: 'Respuesta de prueba.' });
assert.ok(pending.openItemsPendingReview.includes(open.id), 'open responses remain pending human review');
assert.equal(pending.provisionalPass, false);

assert.deepEqual(getAssessment('A2').map(item => item.level).filter(level => level !== 'A2'), []);
console.log('Assessment bank structure: OK');
