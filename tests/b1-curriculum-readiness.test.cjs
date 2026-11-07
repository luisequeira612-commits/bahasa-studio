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

function exercisesOf(unit) {
  return [
    ...(unit.exercises || []),
    ...(unit.lessons || []).flatMap(lesson => lesson.exercises || [])
  ];
}

test('B1 draft has seventeen units, sixty unique IDs including earlier canonical vocabulary, and one hundred forty-three exercises', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  assert.ok(b1);
  assert.equal(b1.units.length, 17);
  assert.equal(new Set(b1.units.flatMap(unit => unit.vocab.map(word => word.id))).size, 60);
  assert.equal(b1.units.reduce((sum, unit) => sum + exercisesOf(unit).length, 0), 143);
  assert.deepEqual(Array.from(b1.units, unit => unit.id), [
    'b1_u1', 'b1_u2', 'b1_u3', 'b1_u4', 'b1_u5', 'b1_u6', 'b1_u7',
    'b1_u8', 'b1_u9', 'b1_u10', 'b1_u11', 'b1_u12', 'b1_u13', 'b1_u14', 'b1_u15', 'b1_u16', 'b1_u17'
  ]);
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
  const byId = new Map();
  const idByForm = new Map();
  for (const unit of b1.units) {
    const localIds = new Set(unit.vocab.map(word => word.id));
    for (const word of unit.vocab) {
      assert.ok(word.id && word.idn && word.esp && word.ex && word.exEsp, unit.id + ' has an incomplete vocabulary entry');
      const previous = byId.get(word.id);
      if (previous) {
        assert.equal(previous.idn.toLowerCase(), word.idn.toLowerCase(), 'canonical ID changed headword: ' + word.id);
        assert.equal(previous.esp, word.esp, 'canonical ID changed Spanish gloss: ' + word.id);
      } else {
        byId.set(word.id, word);
      }
      const normalizedForm = word.idn.trim().toLowerCase();
      const previousId = idByForm.get(normalizedForm);
      if (previousId) assert.equal(previousId, word.id, 'duplicate form has a different ID: ' + word.idn);
      else idByForm.set(normalizedForm, word.id);
    }
    for (const exercise of exercisesOf(unit)) {
      assert.ok(exercise.prompt, unit.id + ' exercise needs a prompt');
      assert.ok(localIds.has(exercise.vocabId), unit.id + ' exercise references vocabulary outside its unit');
      if (exercise.type === 'mc') {
        assert.ok(Array.isArray(exercise.options) && exercise.options.length >= 2);
        assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length);
      }
    }
  }
  assert.equal(byId.size, 60);
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
  assert.ok(agentUnits.some(unit => /pembelian/.test(unit.grammar) && /pengiriman/.test(unit.grammar)));
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

test('B1 U10-U12 follow the approved nominalization and ke-an sequence without duplicating A1/A2 vocabulary', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const forms = unitId => b1.units.find(unit => unit.id === unitId).vocab.map(word => word.idn.toLowerCase());
  assert.deepEqual(Array.from(forms('b1_u10')), ['pelajaran', 'pekerjaan']);
  assert.deepEqual(Array.from(forms('b1_u11')), ['pertanyaan', 'percakapan', 'perkenalan']);
  assert.deepEqual(Array.from(forms('b1_u12')), ['kesehatan', 'kecelakaan', 'keadaan', 'kebudayaan']);
  for (const unitId of ['b1_u10', 'b1_u11', 'b1_u12']) {
    const unit = b1.units.find(item => item.id === unitId);
    assert.equal(unit.exercises.length, 6);
    assert.ok(unit.exercises.some(item => item.type === 'write'));
    assert.ok(unit.exercises.some(item => item.type === 'listen'));
    const localIds = new Set(unit.vocab.map(word => word.id));
    for (const exercise of unit.exercises) assert.ok(localIds.has(exercise.vocabId));
  }
  for (const [source, id] of [
    [a1Source, 'v20'],
    [a2Source, 'a2u12_pengalaman'],
    [a2Source, 'a2u12_kesempatan'],
    [a2Source, 'a2u14_perjalanan'],
    [a2Source, 'a2u15_pertemuan'],
    [a2Source, 'a2u20_kebersihan']
  ]) assert.ok(source.includes(id), 'missing canonical earlier vocabulary ID ' + id);
  const archive = fs.readFileSync(path.join(root, 'docs/B1_U10_U12_DISPLACED_CONTENT.md'), 'utf8');
  for (const id of ['b1u10_mohon', 'b1u11_bisa_diulangi', 'b1u12_kesimpulan']) {
    assert.ok(archive.includes(id), 'archive missing displaced object content ' + id);
  }
  assert.match(archive, /Objetos originales preservados/);
});

test('B1 is visible and accessible independently of A1 completion', () => {
  assert.match(html, /level\.id !== 'B2'/);
  assert.doesNotMatch(html, /!\['B1', 'B2'\]\.includes\(level\.id\)/);
  assert.doesNotMatch(html, /if \(\['B1', 'B2'\]\.includes\(level\.id\)/);
  assert.match(html, /const isAdvanced = lvl\.id === 'B2'/);
  assert.match(html, /if \(!isB1Complete\(this\.completedUnits\)\) return;/);
});

test('B1 U13-U14 consolidate the ke-an family using canonical earlier vocabulary IDs', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const u13 = b1.units.find(unit => unit.id === 'b1_u13');
  const u14 = b1.units.find(unit => unit.id === 'b1_u14');
  assert.ok(u13 && u14);
  assert.deepEqual(Array.from(u13.vocab, word => word.id), ['b1u12_kesehatan', 'a2u20_kebersihan', 'v360', 'v383']);
  assert.deepEqual(Array.from(u14.vocab, word => word.id), ['v20', 'a2u12_kesempatan', 'b1u12_kecelakaan', 'b1u12_keadaan', 'b1u12_kebudayaan']);
  const earlierIds = new Set(
    course.levels.flatMap(level => level.units)
      .filter(unit => unit.id !== 'b1_u13' && unit.id !== 'b1_u14')
      .flatMap(unit => (unit.vocab || []).map(word => word.id))
  );
  for (const unit of [u13, u14]) {
    assert.equal(unit.lessons.length, 3);
    const exercises = exercisesOf(unit);
    assert.equal(exercises.length, 14);
    const types = new Set(exercises.map(exercise => exercise.type));
    for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) {
      assert.ok(types.has(type), unit.id + ' missing exercise type ' + type);
    }
    const localIds = new Set(unit.vocab.map(word => word.id));
    for (const exercise of exercises) {
      assert.ok(localIds.has(exercise.vocabId), unit.id + ' exercise references vocabulary outside its unit');
      assert.ok(exercise.prompt && exercise.explanation);
      if (exercise.type === 'mc') {
        assert.ok(Array.isArray(exercise.options) && Number.isInteger(exercise.answer));
        assert.ok(exercise.answer >= 0 && exercise.answer < exercise.options.length);
      }
      if (exercise.type === 'order') {
        assert.deepEqual(Array.from(exercise.words).sort(), Array.from(exercise.correctOrder).sort());
      }
    }
    const completeSentenceExercises = exercises.filter(exercise =>
      (['listen', 'translate_es_id'].includes(exercise.type) && typeof exercise.answer === 'string' && /\s/.test(exercise.answer)) ||
      (exercise.type === 'order' && exercise.correctOrder.length >= 2) ||
      (exercise.type === 'write' && exercise.modelAnswer && /[.!?]/.test(exercise.modelAnswer)) ||
      (exercise.type === 'mc' && /«[^»]+»/.test(exercise.prompt))
    );
    assert.ok(completeSentenceExercises.length >= 5, unit.id + ' needs at least five complete-sentence exercises');
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer),
      unit.id + ' needs a guided original production prompt');
    assert.ok(exercises.filter(exercise => exercise.type === 'listen').every(exercise => /\s/.test(exercise.answer)),
      unit.id + ' listening exercises should play complete sentences');
    for (const word of unit.vocab) {
      assert.ok(earlierIds.has(word.id), 'U13-U14 must reuse an earlier canonical vocabulary ID: ' + word.id);
    }
  }
});


test('B1 U15-U17 teach yang relatives, interrogatives, passive clauses and cumulative review', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const u15 = b1.units.find(unit => unit.id === 'b1_u15');
  const u16 = b1.units.find(unit => unit.id === 'b1_u16');
  const u17 = b1.units.find(unit => unit.id === 'b1_u17');
  assert.ok(u15 && u16 && u17);
  assert.deepEqual(Array.from(u15.vocab, word => word.id), ['b1v051', 'v53', 'v1002', 'v52', 'v211']);
  assert.deepEqual(Array.from(u16.vocab, word => word.id), ['b1v052', 'b1v053', 'b1v054', 'v1002', 'v53', 'v52', 'v211']);
  assert.deepEqual(Array.from(u17.vocab, word => word.id), ['v298', 'v348', 'v52', 'v211', 'v8', 'b1v001', 'b1v055', 'b1u12_kesehatan', 'a2u20_kebersihan', 'v1002']);
  const expectedCounts = new Map([[u15, 14], [u16, 14], [u17, 15]]);
  const allNewForms = new Map([['b1v051', 'yang'], ['b1v052', 'orang'], ['b1v053', 'tempat'], ['b1v054', 'hal'], ['b1v055', 'paling']]);
  const earlierIds = new Set(b1.units.filter(unit => !['b1_u15', 'b1_u16', 'b1_u17'].includes(unit.id)).flatMap(unit => unit.vocab.map(word => word.id)));
  for (const [unit, expectedCount] of expectedCounts) {
    assert.equal(unit.lessons.length, 3);
    const exercises = exercisesOf(unit);
    assert.equal(exercises.length, expectedCount);
    const types = new Set(exercises.map(exercise => exercise.type));
    for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) assert.ok(types.has(type), unit.id + ' missing ' + type);
    const localIds = new Set(unit.vocab.map(word => word.id));
    for (const exercise of exercises) {
      assert.ok(localIds.has(exercise.vocabId), unit.id + ' exercise references vocabulary outside its unit');
      assert.ok(exercise.prompt && exercise.explanation);
      if (exercise.type === 'mc') {
        assert.ok(Array.isArray(exercise.options) && Number.isInteger(exercise.answer));
        assert.ok(exercise.answer >= 0 && exercise.answer < exercise.options.length);
      }
      if (exercise.type === 'order') assert.deepEqual(Array.from(exercise.words).sort(), Array.from(exercise.correctOrder).sort());
    }
    const completeSentences = exercises.filter(exercise =>
      (['listen', 'translate_es_id'].includes(exercise.type) && typeof exercise.answer === 'string' && /\s/.test(exercise.answer)) ||
      (exercise.type === 'order' && exercise.correctOrder.length >= 2) ||
      (exercise.type === 'write' && exercise.modelAnswer && /[.!?]/.test(exercise.modelAnswer)) ||
      (exercise.type === 'mc' && /«[^»]+»/.test(exercise.prompt))
    );
    assert.ok(completeSentences.length >= 5, unit.id + ' needs five complete-sentence exercises');
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer));
    for (const word of unit.vocab) {
      if (allNewForms.has(word.id)) {
        assert.equal(word.idn.toLowerCase(), allNewForms.get(word.id));
        assert.ok(!earlierIds.has(word.id), 'new form already existed in earlier B1 units: ' + word.id);
      }
    }
  }
  for (const [id, form] of allNewForms) {
    const occurrences = b1.units.flatMap(unit => unit.vocab).filter(word => word.id === id);
    assert.ok(occurrences.length >= 1, 'missing new B1 form ' + form);
    assert.ok(occurrences.every(word => word.idn.toLowerCase() === form));
  }
  assert.match(u15.grammar + u15.lessons.map(lesson => lesson.grammar).join(' '), /yang/);
  assert.match(u16.grammar + u16.lessons.map(lesson => lesson.grammar).join(' '), /orang[\s\S]*hal[\s\S]*tempat/);
  assert.match(u17.grammar + u17.lessons.map(lesson => lesson.grammar).join(' '), /apa yang[\s\S]*yang mana[\s\S]*dibaca[\s\S]*yang paling/);
  assert.ok(u17.vocab.some(word => word.id === 'b1u12_kesehatan') && u17.vocab.some(word => word.id === 'a2u20_kebersihan'));
  assert.ok(exercisesOf(u17).some(exercise => /kesehatan/i.test(exercise.prompt + ' ' + (exercise.modelAnswer || '')) && /kebersihan/i.test(exercise.prompt + ' ' + (exercise.modelAnswer || ''))),
    'U17 must include a cumulative review exercise covering both U13-U14 vocabulary items');
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
