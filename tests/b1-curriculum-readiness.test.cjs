'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { getAssessment, LEVELS } = require('../assessment-engine.js');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const assessmentHtml = fs.readFileSync(path.join(root, 'assessment.html'), 'utf8');
const a1Source = fs.readFileSync(path.join(root, 'curriculum-a1.js'), 'utf8');
const a2Source = fs.readFileSync(path.join(root, 'curriculum-a2.js'), 'utf8');
const a1Literal = a1Source.slice(a1Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
const a2Literal = a2Source.slice(a2Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
const start = html.indexOf('const CourseData =');
const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
assert.ok(start >= 0 && end > start, 'CourseData block must exist');
const courseSource = html.slice(start, end)
  .replace('window.BAHASA_CURRICULUM_A1', a1Literal)
  .replace('window.BAHASA_CURRICULUM_A2', a2Literal);
const course = vm.runInNewContext(courseSource + '\nCourseData');

test('B1 draft has twelve units and an explicitly incomplete vocabulary bank', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  assert.ok(b1);
  assert.equal(b1.units.length, 12);
  assert.equal(b1.units.reduce((sum, unit) => sum + unit.vocab.length, 0), 51);
  assert.equal(b1.units.reduce((sum, unit) => sum + unit.exercises.length, 0), 69);
  assert.deepEqual(Array.from(b1.units, unit => unit.id), ['b1_u1', 'b1_u2', 'b1_u3', 'b1_u4', 'b1_u5', 'b1_u6', 'b1_u7', 'b1_u8', 'b1_u9', 'b1_u10', 'b1_u11', 'b1_u12']);
});

test('B1 U1 provides a complete introductory practice set for passive di-', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const unit = b1.units.find(item => item.id === 'b1_u1');
  assert.equal(unit.vocab.length, 4);
  assert.equal(unit.exercises.length, 7);
  for (const id of ['v8', 'b1v001', 'b1v002', 'b1v003']) {
    assert.ok(unit.vocab.some(word => word.id === id), 'B1 U1 missing vocabulary ' + id);
  }
  assert.ok(unit.exercises.some(item => item.type === 'translate_es_id'));
  assert.ok(unit.exercises.some(item => item.type === 'listen'));
  assert.ok(unit.exercises.some(item => item.type === 'write'));
});

test('every B1 draft exercise references vocabulary in its own unit', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const ids = new Set();
  for (const unit of b1.units) {
    const localIds = new Set(unit.vocab.map(word => word.id));
    for (const word of unit.vocab) {
      assert.ok(word.id && word.idn && word.esp && word.ex && word.exEsp, unit.id + ' has an incomplete vocabulary entry');
      assert.ok(!ids.has(word.id), 'duplicate B1 vocabulary ID: ' + word.id);
      ids.add(word.id);
    }
    for (const exercise of unit.exercises) {
      assert.ok(exercise.prompt, unit.id + ' exercise needs a prompt');
      assert.ok(localIds.has(exercise.vocabId), unit.id + ' exercise references vocabulary outside its unit');
      if (exercise.type === 'mc') {
        assert.ok(Array.isArray(exercise.options) && exercise.options.length >= 2);
        assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length);
      }
    }
  }
  assert.equal(ids.size, 51);
});


test('B1 U7-U9 follow the approved pe-/peN- agent-noun sequence', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const forms = unitId => b1.units.find(unit => unit.id === unitId).vocab.map(word => word.idn.toLowerCase());
  assert.equal(forms('b1_u7').join(','), 'penjual,pembeli,pemain');
  assert.equal(forms('b1_u8').join(','), 'penulis,pengajar,pekerja');
  assert.equal(forms('b1_u9').join(','), 'pemimpin,penduduk,pembaca');
  for (const unitId of ['b1_u7', 'b1_u8', 'b1_u9']) {
    const unit = b1.units.find(item => item.id === unitId);
    assert.equal(unit.vocab.length, 3);
    assert.equal(unit.exercises.length, 6);
    assert.ok(unit.exercises.some(item => item.type === 'write'));
    assert.ok(unit.exercises.some(item => item.type === 'listen'));
    const localIds = new Set(unit.vocab.map(word => word.id));
    for (const exercise of unit.exercises) assert.ok(localIds.has(exercise.vocabId));
  }
  const agentUnits = b1.units.filter(unit => ['b1_u7', 'b1_u8', 'b1_u9'].includes(unit.id));
  const vocabForms = agentUnits.flatMap(unit => unit.vocab.map(word => word.idn.toLowerCase()));
  assert.ok(agentUnits.every(unit => /pembelian/.test(unit.grammar) && /pengiriman/.test(unit.grammar)));
  assert.ok(!vocabForms.includes('pembelian'));
  assert.ok(!vocabForms.includes('pengiriman'));
});

test('displaced B1 U7-U9 content is preserved outside the active curriculum', () => {
  const archive = fs.readFileSync(path.join(root, 'docs/B1_U7_U9_DISPLACED_CONTENT.md'), 'utf8');
  for (const term of ['menurut', 'berdasarkan', 'laporan', 'meningkat', 'menurun', 'dilakukan', 'digunakan', 'diproses', 'dihasilkan', 'langkah', 'pendapat', 'alasan', 'setuju', 'berbeda', 'sebaliknya']) {
    assert.ok(archive.includes(term), 'archive missing displaced term ' + term);
  }
  assert.match(archive, /Objetos originales preservados/);
});

test('B1 remains hidden from the unlocked learning path until a separate release decision', () => {
  assert.match(html, /!\['B1', 'B2'\]\.includes\(level\.id\)/);
  assert.match(html, /if \(\['B1', 'B2'\]\.includes\(level\.id\)/);
});

test('B1 assessment bank includes open production items that require human review', () => {
  const items = getAssessment('B1');
  assert.equal(items.length, 20);
  assert.ok(items.some(item => item.type === 'open' && item.skill === 'production'));
  for (const id of ['b1-connectors-01', 'b1-report-01', 'b1-process-01', 'b1-opinion-01', 'b1-formal-01', 'b1-interaction-01', 'b1-speaking-01', 'b1-integrated-01', 'b1-listening-01', 'b1-listening-day-01', 'b1-listening-hall-01', 'b1-reading-main-01', 'b1-reading-detail-01', 'b1-reading-inference-01']) assert.ok(items.some(item => item.id === id), 'missing B1 assessment item ' + id);
  assert.ok(items.some(item => item.skill === 'register'));
  assert.ok(items.some(item => item.skill === 'interaction'));
  const listening = items.find(item => item.id === 'b1-listening-01');
  assert.equal(listening.type, 'listen');
  assert.equal(listening.skill, 'comprehension');
  assert.ok(listening.audioText && listening.answer && listening.inputLabel);
  const listeningItems = items.filter(item => item.id.startsWith('b1-listening-'));
  assert.equal(listeningItems.length, 3);
  assert.ok(listeningItems.every(item => item.audioText && item.answer && item.inputLabel));
  const readingItems = items.filter(item => ['b1-reading-main-01', 'b1-reading-detail-01', 'b1-reading-inference-01'].includes(item.id));
  assert.equal(readingItems.length, 3);
  assert.ok(readingItems.every(item => item.skill === 'reading' && item.readingText.includes('Bandung') && item.prompt && item.options[item.answer]));
  assert.match(assessmentHtml, /item\.readingText/);
  assert.match(assessmentHtml, /reading-passage/);
  const speaking = items.find(item => item.id === 'b1-speaking-01');
  assert.equal(speaking.type, 'speak');
  assert.ok(Array.isArray(speaking.rubric) && speaking.rubric.length > 0);
  const manualReview = require('../assessment-engine.js').scoreAssessment('B1', {
    'b1-speaking-01': 'Respuesta oral simulada',
    'b1-integrated-01': 'Párrafo de prueba'
  });
  assert.deepEqual(manualReview.openItemsPendingReview, ['b1-speaking-01', 'b1-integrated-01']);
  for (const skill of LEVELS.B1.skills) assert.ok(items.some(item => item.skill === skill), 'B1 assessment must cover ' + skill);
  const addedItems = items.filter(item => ['b1-connectors-01', 'b1-report-01', 'b1-process-01', 'b1-opinion-01', 'b1-formal-01'].includes(item.id));
  assert.ok(addedItems.every(item => item.prompt && item.explanation && item.options[item.answer]));
});

test('B1 U1-U3 follow the approved affix-family sequence and roots', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const forms = unitId => b1.units.find(unit => unit.id === unitId).vocab.map(word => word.idn.toLowerCase());
  assert.equal(forms('b1_u1').join(','), 'dibaca,ditulis,dijual,diajar');
  assert.equal(forms('b1_u2').join(','), 'membaca,menulis,menjual,mengajar,oleh');
  assert.equal(forms('b1_u3').join(','), 'bekerja,bermain,terbaca,tertulis,terjual');
  for (const unitId of ['b1_u1', 'b1_u2', 'b1_u3']) {
    const unit = b1.units.find(item => item.id === unitId);
    const ids = new Set(unit.vocab.map(word => word.id));
    for (const exercise of unit.exercises) assert.ok(ids.has(exercise.vocabId));
  }
});


test('B1 U4-U6 follow the approved -kan/-i sequence and preserve passive contrasts', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const forms = unitId => b1.units.find(unit => unit.id === unitId).vocab.map(word => word.idn.toLowerCase());
  assert.equal(forms('b1_u4').join(','), 'memberikan,mengirimkan,menjelaskan,membersihkan');
  assert.equal(forms('b1_u5').join(','), 'mengingatkan,memasukkan,mendatangi,menemui');
  assert.equal(forms('b1_u6').join(','), 'menghadiri,mencintai,memasuki,dijelaskan,ditemui');
  for (const unitId of ['b1_u4', 'b1_u5', 'b1_u6']) {
    const unit = b1.units.find(item => item.id === unitId);
    assert.equal(unit.exercises.length, unitId === 'b1_u6' ? 7 : 6);
    assert.ok(unit.exercises.some(item => item.type === 'write'));
    assert.ok(unit.exercises.some(item => item.type === 'listen'));
    const localIds = new Set(unit.vocab.map(word => word.id));
    for (const exercise of unit.exercises) assert.ok(localIds.has(exercise.vocabId));
  }
});
