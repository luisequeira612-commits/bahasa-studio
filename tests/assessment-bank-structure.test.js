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

const expanded = ITEM_BANK.filter(item => /^a1-u(?:18|19|20|21|22|23|24|25|26|27|28|29|30|31|32)-/.test(item.id));
assert.equal(expanded.length, 30, 'two new items per unit U18–U32');
assert.deepEqual([...new Set(expanded.map(item => item.unit))].sort(),
  Array.from({ length: 15 }, (_, index) => 'a1_u' + (index + 18)));
for (const item of expanded) {
  assert.equal(item.level, 'A1');
  assert.ok(item.objective && item.objective.length > 10, item.id + ': declared objective');
  assert.equal(item.modality, 'written-choice', item.id + ': honest modality');
  assert.equal(item.reviewStatus, 'pilot-unreviewed', item.id + ': editorial status');
  assert.equal(item.type, 'choice');
  assert.ok(!Object.hasOwn(item, 'audioText'), item.id + ': no fabricated audio');
}
assert.equal(getAssessment('A1').filter(item => expanded.some(x => x.id === item.id)).length, 30);

const expectedAnswers = {
  'a1-u24-01': 'Lee un libro', 'a1-u24-02': 'Profesor/a o docente',
  'a1-u25-01': 'Afición o pasatiempo', 'a1-u25-02': 'Me gusta nadar',
  'a1-u26-01': 'Gira a la izquierda', 'a1-u26-02': 'Seguir recto',
  'a1-u27-01': '¡Vamos a comer!', 'a1-u27-02': 'Pasado mañana',
  'a1-u28-01': 'Al aeropuerto', 'a1-u28-02': 'Pasaporte',
  'a1-u29-01': 'Siempre estudio', 'a1-u29-02': 'A veces',
  'a1-u30-01': 'Con permiso, ¿puedo pasar?', 'a1-u30-02': 'Tolong ulangi.',
  'a1-u31-01': 'Él/ella es alto/a', 'a1-u31-02': 'Amable o simpático/a',
  'a1-u32-01': 'Apa kabar?', 'a1-u32-02': 'De nada'
};
for (const [id, expected] of Object.entries(expectedAnswers)) {
  const item = expanded.find(candidate => candidate.id === id);
  assert.ok(item, id + ': expected item exists');
  assert.equal(item.options[item.answer], expected, id + ': answer key matches course content');
}


const totalA1Points = ITEM_BANK.filter(item => item.level === 'A1').reduce((sum, item) => sum + item.points, 0);
assert.equal(totalA1Points, 54, 'A1 pilot total after expansion');
const blank = scoreAssessment('A1', {});
assert.equal(blank.possible, 54);
assert.equal(blank.earned, 0);
assert.equal(blank.provisionalPass, false);
assert.equal(blank.thresholds.validated, false);

const open = ITEM_BANK.find(item => item.level === 'A1' && item.type === 'open');
const pending = scoreAssessment('A1', { [open.id]: 'Respuesta de prueba.' });
assert.ok(pending.openItemsPendingReview.includes(open.id), 'open responses remain pending human review');
assert.equal(pending.provisionalPass, false);

assert.deepEqual(getAssessment('A2').map(item => item.level).filter(level => level !== 'A2'), []);
console.log('Assessment bank structure: OK');
