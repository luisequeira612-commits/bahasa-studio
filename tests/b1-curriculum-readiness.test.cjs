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

// B1 U50 readiness baseline updated with the final curriculum unit.
test('B1 draft has fifty units, two hundred twenty-four unique IDs including earlier canonical vocabulary, and six hundred thirty-nine exercises', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  assert.ok(b1);
  assert.equal(b1.units.length, 50);
  assert.equal(new Set(b1.units.flatMap(unit => unit.vocab.map(word => word.id))).size, 224);
  assert.equal(b1.units.reduce((sum, unit) => sum + exercisesOf(unit).length, 0), 639);
  assert.deepEqual(Array.from(b1.units, unit => unit.id), [
    'b1_u1', 'b1_u2', 'b1_u3', 'b1_u4', 'b1_u5', 'b1_u6', 'b1_u7',
    'b1_u8', 'b1_u9', 'b1_u10', 'b1_u11', 'b1_u12', 'b1_u13', 'b1_u14', 'b1_u15', 'b1_u16', 'b1_u17', 'b1_u18', 'b1_u19', 'b1_u20', 'b1_u21', 'b1_u22', 'b1_u23', 'b1_u24', 'b1_u25', 'b1_u26', 'b1_u27', 'b1_u28', 'b1_u29', 'b1_u30', 'b1_u31', 'b1_u32', 'b1_u33', 'b1_u34', 'b1_u35', 'b1_u36', 'b1_u37', 'b1_u38', 'b1_u39', 'b1_u40', 'b1_u41', 'b1_u42', 'b1_u43', 'b1_u44', 'b1_u45', 'b1_u46', 'b1_u47', 'b1_u48', 'b1_u49', 'b1_u50'
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

test('B1 U1-U4 meet the consolidated unit practice contract and U4 closes the first cumulative review', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  for (const unitId of ['b1_u1', 'b1_u2', 'b1_u3', 'b1_u4']) {
    const unit = b1.units.find(item => item.id === unitId);
    assert.ok(unit, unitId + ' must exist');
    assert.ok(Array.isArray(unit.lessons) && unit.lessons.length >= 2, unitId + ' needs at least two practice lessons');
    const exercises = exercisesOf(unit);
    assert.ok(exercises.length >= 14 && exercises.length <= 22, unitId + ' must have 14–22 combined exercises');
    const types = new Set(exercises.map(item => item.type));
    for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) {
      assert.ok(types.has(type), unitId + ' missing exercise type ' + type);
    }
    const completeSentenceExercises = exercises.filter(item =>
      (['listen', 'translate_es_id'].includes(item.type) && typeof item.answer === 'string' && /\s/.test(item.answer)) ||
      (item.type === 'order' && Array.isArray(item.correctOrder) && item.correctOrder.length >= 2) ||
      (item.type === 'write' && typeof item.modelAnswer === 'string' && /[.!?]/.test(item.modelAnswer))
    );
    assert.ok(completeSentenceExercises.length >= 5, unitId + ' needs at least five complete-sentence exercises');
    assert.ok(exercises.some(item => item.type === 'write' && item.hint && item.modelAnswer),
      unitId + ' needs guided original production');
    const localIds = new Set(unit.vocab.map(word => word.id));
    for (const exercise of exercises) assert.ok(localIds.has(exercise.vocabId), unitId + ' exercise references non-local vocabulary');
    for (const lesson of unit.lessons) assert.ok(lesson.exercises.length >= 4, unitId + ' lesson needs at least four exercises');
  }
  const u4 = b1.units.find(item => item.id === 'b1_u4');
  const cumulative = u4.lessons.find(lesson => /repaso acumulativo/i.test(lesson.title));
  assert.ok(cumulative, 'B1 U4 must close the first four-unit cumulative review');
  for (const id of ['v8', 'b1v001', 'b1v002', 'b1v003', 'v211', 'v212', 'v213', 'v214', 'b1v005', 'b1v006']) {
    assert.ok(cumulative.reviewVocabIds.includes(id), 'cumulative review missing earlier vocabulary ' + id);
  }
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
  assert.equal(byId.size, 224);
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


test('B1 U18-U20 teach conditionals, concessions and sentence contrast', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const u18 = b1.units.find(unit => unit.id === 'b1_u18');
  const u19 = b1.units.find(unit => unit.id === 'b1_u19');
  const u20 = b1.units.find(unit => unit.id === 'b1_u20');
  assert.ok(u18 && u19 && u20);
  assert.deepEqual(Array.from(u18.vocab, word => word.id), ['b1v056', 'b1v057', 'b1v058', 'b1v059']);
  assert.deepEqual(Array.from(u19.vocab, word => word.id), ['b1v060', 'b1v061', 'b1v062']);
  assert.deepEqual(Array.from(u20.vocab, word => word.id), ['b1v063', 'b1v064']);
  const expectedCounts = new Map([[u18, 14], [u19, 14], [u20, 14]]);
  const allNewForms = new Map([
    ['b1v056', 'kalau'], ['b1v057', 'jika'], ['b1v058', 'seandainya'], ['b1v059', 'asalkan'],
    ['b1v060', 'walaupun'], ['b1v061', 'meskipun'], ['b1v062', 'biarpun'],
    ['b1v063', 'tetapi'], ['b1v064', 'namun']
  ]);
  const earlierIds = new Set(b1.units.filter(unit => !['b1_u18', 'b1_u19', 'b1_u20'].includes(unit.id)).flatMap(unit => unit.vocab.map(word => word.id)));
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
  assert.match(u18.grammar + u18.lessons.map(lesson => lesson.grammar).join(' '), /kalau[\s\S]*jika[\s\S]*seandainya[\s\S]*asalkan/);
  assert.match(u19.grammar + u19.lessons.map(lesson => lesson.grammar).join(' '), /walaupun[\s\S]*meskipun[\s\S]*biarpun/);
  assert.match(u20.grammar + u20.lessons.map(lesson => lesson.grammar).join(' '), /tetapi[\s\S]*namun[\s\S]*meskipun/);
});


test('B1 U21-U24 teach cause, purpose and past-experience narration', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const u21 = b1.units.find(unit => unit.id === 'b1_u21');
  const u22 = b1.units.find(unit => unit.id === 'b1_u22');
  const u23 = b1.units.find(unit => unit.id === 'b1_u23');
  const u24 = b1.units.find(unit => unit.id === 'b1_u24');
  assert.ok(u21 && u22 && u23 && u24);
  assert.deepEqual(Array.from(u21.vocab, word => word.id), ['b1v065', 'b1v066', 'b1v067', 'b1v068', 'b1v069', 'b1v070']);
  assert.deepEqual(Array.from(u22.vocab, word => word.id), ['b1v071', 'b1v072']);
  assert.deepEqual(Array.from(u23.vocab, word => word.id), ['a2u16_pernah', 'b1v073', 'a2u2_baru_saja', 'b1v074', 'b1v075', 'a2u2_masih']);
  assert.deepEqual(Array.from(u24.vocab, word => word.id), ['b1v076', 'b1v077', 'a2u3_ketika', 'a2u3_kemudian', 'a2u3_setelah_itu', 'a2u12_pengalaman', 'a2u14_perjalanan', 'a2u16_liburan']);
  const expectedCounts = new Map([[u21, 14], [u22, 14], [u23, 14], [u24, 14]]);
  const allNewForms = new Map([
    ['b1v065', 'karena'], ['b1v066', 'sebab'], ['b1v067', 'oleh karena itu'],
    ['b1v068', 'sehingga'], ['b1v069', 'akibatnya'], ['b1v070', 'makanya'],
    ['b1v071', 'supaya'], ['b1v072', 'agar'], ['b1v073', 'belum pernah'],
    ['b1v074', 'sempat'], ['b1v075', 'telah'], ['b1v076', 'dulu'], ['b1v077', 'waktu itu']
  ]);
  const earlierIds = new Set(b1.units.filter(unit => !['b1_u21', 'b1_u22', 'b1_u23', 'b1_u24'].includes(unit.id)).flatMap(unit => unit.vocab.map(word => word.id)));
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
  assert.match(u21.grammar + u21.lessons.map(lesson => lesson.grammar).join(' '), /karena[\s\S]*sebab[\s\S]*oleh karena itu[\s\S]*sehingga[\s\S]*akibatnya[\s\S]*makanya/i);
  assert.match(u22.grammar + u22.lessons.map(lesson => lesson.grammar).join(' '), /supaya[\s\S]*agar[\s\S]*untuk/i);
  assert.match(u23.grammar + u23.lessons.map(lesson => lesson.grammar).join(' '), /pernah[\s\S]*belum pernah[\s\S]*baru saja[\s\S]*sempat[\s\S]*telah[\s\S]*masih/i);
  assert.match(u24.grammar + u24.lessons.map(lesson => lesson.grammar).join(' '), /dulu[\s\S]*waktu itu[\s\S]*ketika[\s\S]*kemudian[\s\S]*pengalaman[\s\S]*perjalanan/i);
  assert.ok(exercisesOf(u24).some(exercise => exercise.type === 'write' && /viaje o un día especial/.test(exercise.prompt)));
});



test('B1 U27-U29 teach opinions, probability and advice', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const u27 = b1.units.find(unit => unit.id === 'b1_u27');
  const u28 = b1.units.find(unit => unit.id === 'b1_u28');
  const u29 = b1.units.find(unit => unit.id === 'b1_u29');
  assert.ok(u27 && u28 && u29);
  assert.deepEqual(Array.from(u27.vocab, word => word.id), ['b1v088', 'b1v089', 'b1v090', 'b1v091', 'b1v092', 'b1v093', 'b1v094']);
  assert.deepEqual(Array.from(u28.vocab, word => word.id), ['b1v095', 'b1v096', 'b1v097', 'b1v098', 'b1v099']);
  assert.deepEqual(Array.from(u29.vocab, word => word.id), ['b1v100', 'b1v101', 'b1v102', 'b1v103', 'b1v104']);
  const expectedCounts = new Map([[u27, 14], [u28, 14], [u29, 14]]);
  const allNewForms = new Map([
    ['b1v088', 'pendapat'], ['b1v089', 'menurut saya'], ['b1v090', 'bagi saya'],
    ['b1v091', 'setuju'], ['b1v092', 'tidak setuju'], ['b1v093', 'berpikir'], ['b1v094', 'merasa'],
    ['b1v095', 'kira-kira'], ['b1v096', 'mungkin'], ['b1v097', 'sepertinya'], ['b1v098', 'tampaknya'], ['b1v099', 'pasti'],
    ['b1v100', 'seharusnya'], ['b1v101', 'harus'], ['b1v102', 'wajib'], ['b1v103', 'perlu'], ['b1v104', 'menyarankan']
  ]);
  const earlierIds = new Set(b1.units.filter(unit => !['b1_u27', 'b1_u28', 'b1_u29'].includes(unit.id)).flatMap(unit => unit.vocab.map(word => word.id)));
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
    assert.ok(exercises.filter(exercise => exercise.type === 'listen').every(exercise => /\s/.test(exercise.answer)));
    for (const word of unit.vocab) {
      assert.ok(!earlierIds.has(word.id), 'new U27-U29 ID already existed earlier: ' + word.id);
      assert.equal(word.idn.toLowerCase(), allNewForms.get(word.id));
    }
  }
  assert.match(u27.grammar + u27.lessons.map(lesson => lesson.grammar).join(' '), /pendapat[\s\S]*menurut saya[\s\S]*bagi saya[\s\S]*setuju[\s\S]*tidak setuju[\s\S]*berpikir[\s\S]*merasa/i);
  assert.match(u28.grammar + u28.lessons.map(lesson => lesson.grammar).join(' '), /kira-kira[\s\S]*mungkin[\s\S]*sepertinya[\s\S]*tampaknya[\s\S]*pasti/i);
  assert.match(u29.grammar + u29.lessons.map(lesson => lesson.grammar).join(' '), /seharusnya[\s\S]*harus[\s\S]*wajib[\s\S]*perlu[\s\S]*menyarankan/i);
  assert.ok(exercisesOf(u29).some(exercise => exercise.type === 'write' && /opinión|posibilidad|recomendación/i.test(exercise.prompt)),
    'U29 must include cumulative production integrating earlier B1 discourse skills');
});


test('B1 U30-U31 teach plans, goals, steps and decisions', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const u30 = b1.units.find(unit => unit.id === 'b1_u30');
  const u31 = b1.units.find(unit => unit.id === 'b1_u31');
  assert.ok(u30 && u31);
  assert.deepEqual(Array.from(u30.vocab, word => word.id), ['b1v105', 'b1v106', 'b1v107', 'b1v108', 'b1v109']);
  assert.deepEqual(Array.from(u31.vocab, word => word.id), ['b1v110', 'b1v111', 'b1v112', 'b1v113', 'b1v114']);
  const expectedCounts = new Map([[u30, 14], [u31, 14]]);
  const allNewForms = new Map([
    ['b1v105', 'rencana'], ['b1v106', 'tujuan'], ['b1v107', 'berencana'], ['b1v108', 'merencanakan'], ['b1v109', 'berusaha'],
    ['b1v110', 'langkah'], ['b1v111', 'target'], ['b1v112', 'mencapai'], ['b1v113', 'mempersiapkan'], ['b1v114', 'memutuskan']
  ]);
  const earlierIds = new Set(b1.units.filter(unit => !['b1_u30', 'b1_u31'].includes(unit.id)).flatMap(unit => unit.vocab.map(word => word.id)));
  for (const [unit, expectedCount] of expectedCounts) {
    assert.equal(unit.lessons.length, 3);
    const exercises = exercisesOf(unit);
    assert.equal(exercises.length, expectedCount);
    const types = new Set(exercises.map(exercise => exercise.type));
    for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) assert.ok(types.has(type), unit.id + ' missing exercise type ' + type);
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
    assert.ok(exercises.filter(exercise => exercise.type === 'listen').every(exercise => /\s/.test(exercise.answer)));
    for (const word of unit.vocab) {
      assert.ok(!earlierIds.has(word.id), 'new U30-U31 ID already existed earlier: ' + word.id);
      assert.equal(word.idn.toLowerCase(), allNewForms.get(word.id));
    }
  }
  assert.match(u30.grammar + u30.lessons.map(lesson => lesson.grammar).join(' '), /rencana[\s\S]*tujuan[\s\S]*berencana[\s\S]*merencanakan[\s\S]*berusaha/i);
  assert.match(u31.grammar + u31.lessons.map(lesson => lesson.grammar).join(' '), /langkah[\s\S]*target[\s\S]*mencapai[\s\S]*mempersiapkan[\s\S]*memutuskan/i);
});

test('B1 U32-U34 consolidate planning, problem solving and decision evaluation', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const units = ['b1_u32', 'b1_u33', 'b1_u34'].map(id => b1.units.find(unit => unit.id === id));
  assert.ok(units.every(Boolean));
  const expected = [
    ['b1v115', 'b1v116', 'b1v117', 'b1v118', 'b1v119'],
    ['b1v120', 'b1v121', 'b1v122', 'b1v123', 'b1v124'],
    ['b1v125', 'b1v126', 'b1v127', 'b1v128', 'b1v129']
  ];
  const forms = [
    ['prioritas', 'jadwal', 'mengatur', 'menunda', 'mendahulukan'],
    ['masalah', 'hambatan', 'mengatasi', 'solusi', 'memperbaiki'],
    ['pilihan', 'mempertimbangkan', 'risiko', 'akibat', 'mengevaluasi']
  ];
  const earlierIds = new Set(b1.units.filter(unit => !['b1_u32', 'b1_u33', 'b1_u34'].includes(unit.id)).flatMap(unit => unit.vocab.map(word => word.id)));
  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    assert.deepEqual(Array.from(unit.vocab, word => word.id), expected[i]);
    assert.equal(unit.lessons.length, 3);
    const exercises = exercisesOf(unit);
    assert.equal(exercises.length, 14);
    for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) {
      assert.ok(exercises.some(exercise => exercise.type === type), unit.id + ' missing exercise type ' + type);
    }
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
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer));
    assert.ok(exercises.filter(exercise => exercise.type === 'listen').every(exercise => /\s/.test(exercise.answer)));
    for (let j = 0; j < unit.vocab.length; j++) {
      const word = unit.vocab[j];
      assert.equal(word.idn.toLowerCase(), forms[i][j]);
      assert.ok(!earlierIds.has(word.id), 'new U32-U34 ID already existed earlier: ' + word.id);
    }
  }
  assert.match(units[0].grammar + units[0].lessons.map(lesson => lesson.grammar).join(' '), /prioritas[\s\S]*jadwal[\s\S]*mengatur[\s\S]*menunda[\s\S]*mendahulukan/i);
  assert.match(units[1].grammar + units[1].lessons.map(lesson => lesson.grammar).join(' '), /masalah[\s\S]*hambatan[\s\S]*mengatasi[\s\S]*solusi[\s\S]*memperbaiki/i);
  assert.match(units[2].grammar + units[2].lessons.map(lesson => lesson.grammar).join(' '), /pilihan[\s\S]*mempertimbangkan[\s\S]*risiko[\s\S]*akibat[\s\S]*mengevaluasi/i);
});

test('B1 U35-U37 teach negotiation, clear communication and continuous improvement', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const units = ['b1_u35', 'b1_u36', 'b1_u37'].map(id => b1.units.find(unit => unit.id === id));
  assert.ok(units.every(Boolean));
  const expected = [
    ['a2u36_kesepakatan', 'b1v131', 'b1v132', 'b1v133', 'a2u36_kompromi'],
    ['b1v135', 'b1v136', 'b1v137', 'b1v138', 'b1v139'],
    ['b1v140', 'b1v141', 'b1v142', 'a2u12_meningkatkan', 'a2u12_mengembangkan']
  ];
  const forms = [
    ['kesepakatan', 'berunding', 'menyetujui', 'menolak', 'kompromi'],
    ['menerangkan', 'menanggapi', 'mengonfirmasi', 'menyampaikan', 'memastikan'],
    ['kemajuan', 'pencapaian', 'menyelesaikan', 'meningkatkan', 'mengembangkan']
  ];
  const earlierIds = new Set(b1.units.filter(unit => !['b1_u35', 'b1_u36', 'b1_u37'].includes(unit.id)).flatMap(unit => unit.vocab.map(word => word.id)));
  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    assert.deepEqual(Array.from(unit.vocab, word => word.id), expected[i]);
    assert.equal(unit.lessons.length, 3);
    const exercises = exercisesOf(unit);
    assert.equal(exercises.length, 14);
    for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) {
      assert.ok(exercises.some(exercise => exercise.type === type), unit.id + ' missing exercise type ' + type);
    }
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
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer));
    assert.ok(exercises.filter(exercise => exercise.type === 'listen').every(exercise => /\s/.test(exercise.answer)));
    for (let j = 0; j < unit.vocab.length; j++) {
      const word = unit.vocab[j];
      assert.equal(word.idn.toLowerCase(), forms[i][j]);
      assert.ok(!earlierIds.has(word.id), 'new U35-U37 ID already existed earlier: ' + word.id);
    }
  }
  assert.match(units[0].grammar + units[0].lessons.map(lesson => lesson.grammar).join(' '), /kesepakatan[\s\S]*berunding[\s\S]*menyetujui[\s\S]*menolak[\s\S]*kompromi/i);
  assert.match(units[1].grammar + units[1].lessons.map(lesson => lesson.grammar).join(' '), /menerangkan[\s\S]*menanggapi[\s\S]*mengonfirmasi[\s\S]*menyampaikan[\s\S]*memastikan/i);
  assert.match(units[2].grammar + units[2].lessons.map(lesson => lesson.grammar).join(' '), /kemajuan[\s\S]*pencapaian[\s\S]*menyelesaikan[\s\S]*meningkatkan[\s\S]*mengembangkan/i);
});

test('B1 U38-U40 teach feedback, evidence and adaptation', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const units = ['b1_u38', 'b1_u39', 'b1_u40'].map(id => b1.units.find(unit => unit.id === id));
  assert.ok(units.every(Boolean));
  const expected = [
    ['b1v145', 'b1v146', 'b1v147', 'b1v148', 'a2u26_menghargai'],
    ['b1v149', 'b1v150', 'b1v151', 'b1v152', 'b1v153'],
    ['b1v154', 'b1v155', 'b1v156', 'b1v157', 'a2u34_kebiasaan']
  ];
  const forms = [
    ['umpan balik', 'kritik', 'mengkritik', 'memuji', 'menghargai'],
    ['bukti', 'fakta', 'berdasarkan', 'membuktikan', 'menyimpulkan'],
    ['perubahan', 'menyesuaikan', 'beradaptasi', 'dampak', 'kebiasaan']
  ];
  const earlierIds = new Set(b1.units.filter(unit => !['b1_u38', 'b1_u39', 'b1_u40'].includes(unit.id)).flatMap(unit => unit.vocab.map(word => word.id)));
  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    assert.deepEqual(Array.from(unit.vocab, word => word.id), expected[i]);
    assert.equal(unit.lessons.length, 3);
    const exercises = exercisesOf(unit);
    assert.equal(exercises.length, 14);
    for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) {
      assert.ok(exercises.some(exercise => exercise.type === type), unit.id + ' missing exercise type ' + type);
    }
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
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer));
    assert.ok(exercises.filter(exercise => exercise.type === 'listen').every(exercise => /\s/.test(exercise.answer)));
    for (let j = 0; j < unit.vocab.length; j++) {
      const word = unit.vocab[j];
      assert.equal(word.idn.toLowerCase(), forms[i][j]);
      assert.ok(!earlierIds.has(word.id), 'new U38-U40 ID already existed earlier: ' + word.id);
    }
  }
  assert.match(units[0].grammar + units[0].lessons.map(lesson => lesson.grammar).join(' '), /umpan balik[\s\S]*kritik[\s\S]*mengkritik[\s\S]*memuji[\s\S]*menghargai/i);
  assert.match(units[1].grammar + units[1].lessons.map(lesson => lesson.grammar).join(' '), /bukti[\s\S]*fakta[\s\S]*berdasarkan[\s\S]*membuktikan[\s\S]*menyimpulkan/i);
  assert.match(units[2].grammar + units[2].lessons.map(lesson => lesson.grammar).join(' '), /perubahan[\s\S]*menyesuaikan[\s\S]*beradaptasi[\s\S]*dampak[\s\S]*kebiasaan/i);
});

test('B1 U41-U43 teach reporting, comparison and conditional influence', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const units = ['b1_u41', 'b1_u42', 'b1_u43'].map(id => b1.units.find(unit => unit.id === id));
  assert.ok(units.every(Boolean));
  const expected = [
    ['a2u40_pernyataan', 'b1v158', 'b1v159', 'b1v160', 'b1v161'],
    ['b1v162', 'a2u13_membandingkan', 'b1v163', 'b1v164', 'b1v165'],
    ['b1v166', 'b1v167', 'b1v168', 'b1v169', 'b1v170']
  ];
  const forms = [
    ['pernyataan', 'menyatakan', 'menegaskan', 'mengakui', 'menyangkal'],
    ['perbandingan', 'membandingkan', 'sebaliknya', 'sementara', 'kesamaan'],
    ['kondisi', 'hubungan', 'bergantung', 'memengaruhi', 'berpengaruh']
  ];
  const earlierIds = new Set(b1.units.filter(unit => !['b1_u41', 'b1_u42', 'b1_u43'].includes(unit.id)).flatMap(unit => unit.vocab.map(word => word.id)));
  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    assert.deepEqual(Array.from(unit.vocab, word => word.id), expected[i]);
    assert.equal(unit.lessons.length, 3);
    const exercises = exercisesOf(unit);
    assert.equal(exercises.length, 14);
    for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) {
      assert.ok(exercises.some(exercise => exercise.type === type), unit.id + ' missing exercise type ' + type);
    }
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
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer));
    assert.ok(exercises.filter(exercise => exercise.type === 'listen').every(exercise => /\s/.test(exercise.answer)));
    for (let j = 0; j < unit.vocab.length; j++) {
      const word = unit.vocab[j];
      assert.equal(word.idn.toLowerCase(), forms[i][j]);
      assert.ok(!earlierIds.has(word.id), 'new U41-U43 ID already existed earlier: ' + word.id);
    }
  }
  assert.match(units[0].grammar + units[0].lessons.map(lesson => lesson.grammar).join(' '), /pernyataan[\s\S]*menyatakan[\s\S]*menegaskan[\s\S]*mengakui[\s\S]*menyangkal/i);
  assert.match(units[1].grammar + units[1].lessons.map(lesson => lesson.grammar).join(' '), /perbandingan[\s\S]*membandingkan[\s\S]*sebaliknya[\s\S]*sementara[\s\S]*kesamaan/i);
  assert.match(units[2].grammar + units[2].lessons.map(lesson => lesson.grammar).join(' '), /kondisi[\s\S]*hubungan[\s\S]*bergantung[\s\S]*memengaruhi[\s\S]*berpengaruh/i);
});

test('B1 U44-U46 teach forecasting, prevention and resource efficiency', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const units = ['b1_u44', 'b1_u45', 'b1_u46'].map(id => b1.units.find(unit => unit.id === id));
  assert.ok(units.every(Boolean));
  const expected = [
    ['b1v171', 'b1v172', 'b1v173', 'b1v174', 'b1v175'],
    ['b1v176', 'b1v177', 'b1v178', 'b1v179', 'b1v180'],
    ['b1v181', 'b1v182', 'b1v183', 'b1v184', 'b1v185']
  ];
  const forms = [
    ['perkiraan', 'memperkirakan', 'kemungkinan', 'berpotensi', 'diperkirakan'],
    ['antisipasi', 'mengantisipasi', 'pencegahan', 'mencegah', 'menghindari'],
    ['sumber daya', 'penggunaan', 'menghemat', 'efisien', 'mengalokasikan']
  ];
  const earlierIds = new Set(b1.units.filter(unit => !['b1_u44', 'b1_u45', 'b1_u46'].includes(unit.id)).flatMap(unit => unit.vocab.map(word => word.id)));
  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    assert.deepEqual(Array.from(unit.vocab, word => word.id), expected[i]);
    assert.equal(unit.lessons.length, 3);
    const exercises = exercisesOf(unit);
    assert.equal(exercises.length, 14);
    for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) {
      assert.ok(exercises.some(exercise => exercise.type === type), unit.id + ' missing exercise type ' + type);
    }
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
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer));
    assert.ok(exercises.filter(exercise => exercise.type === 'listen').every(exercise => /\s/.test(exercise.answer)));
    for (let j = 0; j < unit.vocab.length; j++) {
      const word = unit.vocab[j];
      assert.equal(word.idn.toLowerCase(), forms[i][j]);
      assert.ok(!earlierIds.has(word.id), 'new U44-U46 ID already existed earlier: ' + word.id);
    }
  }
  assert.match(units[0].grammar + units[0].lessons.map(lesson => lesson.grammar).join(' '), /perkiraan[\s\S]*memperkirakan[\s\S]*kemungkinan[\s\S]*berpotensi[\s\S]*diperkirakan/i);
  assert.match(units[1].grammar + units[1].lessons.map(lesson => lesson.grammar).join(' '), /antisipasi[\s\S]*mengantisipasi[\s\S]*pencegahan[\s\S]*mencegah[\s\S]*menghindari/i);
  assert.match(units[2].grammar + units[2].lessons.map(lesson => lesson.grammar).join(' '), /sumber daya[\s\S]*penggunaan[\s\S]*menghemat[\s\S]*efisien[\s\S]*mengalokasikan/i);
});

test('B1 U50 closes the level with an integrated capstone', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const unit = b1.units.find(item => item.id === 'b1_u50');
  assert.ok(unit);
  assert.deepEqual(Array.from(unit.vocab, word => word.id), ['b1v198', 'b1v199', 'b1v200', 'b1v201', 'b1v202']);
  assert.equal(unit.lessons.length, 3);
  const exercises = exercisesOf(unit);
  assert.equal(exercises.length, 14);
  assert.deepEqual(
    exercises.map(exercise => exercise.type),
    ['mc', 'translate_es_id', 'order', 'listen', 'write', 'mc', 'translate_es_id', 'order', 'listen', 'write', 'mc', 'translate_es_id', 'listen', 'write']
  );
  const localIds = new Set(unit.vocab.map(word => word.id));
  for (const exercise of exercises) {
    assert.ok(localIds.has(exercise.vocabId), 'U50 exercise references vocabulary outside the unit');
    assert.ok(exercise.prompt && exercise.explanation);
  }
  assert.equal(new Set(unit.vocab.map(word => word.id)).size, 5);
  assert.match(unit.grammar + unit.lessons.map(lesson => lesson.grammar).join(' '), /rancangan[\s\S]*kelayakan[\s\S]*pelaksanaan[\s\S]*mempresentasikan[\s\S]*menindaklanjuti/i);
  assert.ok(exercises.some(exercise => exercise.type === 'write' && /rancangan/i.test(exercise.hint) && /menindaklanjuti/i.test(exercise.modelAnswer)));
});
 
test('B1 U47-U49 teach procedures, community participation and sustainability', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const units = ['b1_u47', 'b1_u48', 'b1_u49'].map(id => b1.units.find(unit => unit.id === id));
  assert.ok(units.every(Boolean));
  const expected = [
    ['v242', 'b1v186', 'a2u10_mematuhi', 'a2u10_melanggar', 'b1v187'],
    ['b1v188', 'b1v189', 'b1v190', 'b1v191', 'b1v192'],
    ['b1v193', 'b1v194', 'b1v195', 'b1v196', 'b1v197']
  ];
  const forms = [
    ['peraturan', 'prosedur', 'mematuhi', 'melanggar', 'tanggung jawab'],
    ['partisipasi', 'mengajukan', 'permohonan', 'menyelenggarakan', 'dukungan'],
    ['alam', 'berkelanjutan', 'pelestarian', 'mengurangi', 'limbah']
  ];
  const earlierIds = new Set(b1.units.filter(unit => !['b1_u47', 'b1_u48', 'b1_u49'].includes(unit.id)).flatMap(unit => unit.vocab.map(word => word.id)));
  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    assert.deepEqual(Array.from(unit.vocab, word => word.id), expected[i]);
    assert.equal(unit.lessons.length, 3);
    const exercises = exercisesOf(unit);
    assert.equal(exercises.length, 14);
    for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) {
      assert.ok(exercises.some(exercise => exercise.type === type), unit.id + ' missing exercise type ' + type);
    }
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
    assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer));
    assert.ok(exercises.filter(exercise => exercise.type === 'listen').every(exercise => /\s/.test(exercise.answer)));
    for (let j = 0; j < unit.vocab.length; j++) {
      const word = unit.vocab[j];
      assert.equal(word.idn.toLowerCase(), forms[i][j]);
      assert.ok(!earlierIds.has(word.id), 'new U47-U49 ID already existed earlier: ' + word.id);
    }
  }
  assert.match(units[0].grammar + units[0].lessons.map(lesson => lesson.grammar).join(' '), /peraturan[\s\S]*prosedur[\s\S]*mematuhi[\s\S]*melanggar[\s\S]*tanggung jawab/i);
  assert.match(units[1].grammar + units[1].lessons.map(lesson => lesson.grammar).join(' '), /partisipasi[\s\S]*mengajukan[\s\S]*permohonan[\s\S]*menyelenggarakan[\s\S]*dukungan/i);
  assert.match(units[2].grammar + units[2].lessons.map(lesson => lesson.grammar).join(' '), /alam[\s\S]*berkelanjutan[\s\S]*pelestarian[\s\S]*mengurangi[\s\S]*limbah/i);
});

test('B1 U50 closes the level with an integrated project capstone', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const unit = b1.units.find(item => item.id === 'b1_u50');
  assert.ok(unit);
  assert.deepEqual(Array.from(unit.vocab, word => word.id), ['b1v198', 'b1v199', 'b1v200', 'b1v201', 'b1v202']);
  assert.deepEqual(Array.from(unit.vocab, word => word.idn.toLowerCase()), ['rancangan', 'kelayakan', 'pelaksanaan', 'mempresentasikan', 'menindaklanjuti']);
  assert.equal(unit.lessons.length, 3);
  const exercises = exercisesOf(unit);
  assert.equal(exercises.length, 14);
  for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) {
    assert.ok(exercises.some(exercise => exercise.type === type), 'B1 U50 missing exercise type ' + type);
  }
  const localIds = new Set(unit.vocab.map(word => word.id));
  for (const exercise of exercises) {
    assert.ok(localIds.has(exercise.vocabId));
    assert.ok(exercise.prompt && exercise.explanation);
    if (exercise.type === 'mc') {
      assert.ok(Array.isArray(exercise.options) && Number.isInteger(exercise.answer));
      assert.ok(exercise.answer >= 0 && exercise.answer < exercise.options.length);
    }
    if (exercise.type === 'order') assert.deepEqual(Array.from(exercise.words).sort(), Array.from(exercise.correctOrder).sort());
  }
  assert.ok(exercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer));
  assert.ok(exercises.filter(exercise => exercise.type === 'listen').every(exercise => /\s/.test(exercise.answer)));
  assert.match(unit.grammar + unit.lessons.map(lesson => lesson.grammar).join(' '), /rancangan[\s\S]*kelayakan[\s\S]*pelaksanaan[\s\S]*mempresentasikan[\s\S]*menindaklanjuti/i);
  assert.equal(unit.vocab.some(word => word.verificationStatus === 'verified_primary'), false);
});

test('B1 U25-U26 describe character and places with canonical A1 vocabulary', () => {
  const b1 = course.levels.find(level => level.id === 'B1');
  const u25 = b1.units.find(unit => unit.id === 'b1_u25');
  const u26 = b1.units.find(unit => unit.id === 'b1_u26');
  assert.ok(u25 && u26);
  assert.deepEqual(Array.from(u25.vocab, word => word.id), ['v457', 'b1v078', 'b1v079', 'b1v080', 'b1v081', 'b1v082', 'b1v083']);
  assert.deepEqual(Array.from(u26.vocab, word => word.id), ['b1v084', 'b1v085', 'b1v086', 'b1v087', 'v383']);
  const expectedCounts = new Map([[u25, 14], [u26, 14]]);
  const allNewForms = new Map([
    ['b1v078', 'sabar'], ['b1v079', 'pendiam'], ['b1v080', 'rajin'], ['b1v081', 'malas'],
    ['b1v082', 'lucu'], ['b1v083', 'sopan'], ['b1v084', 'nyaman'], ['b1v085', 'ramai'],
    ['b1v086', 'sepi'], ['b1v087', 'indah']
  ]);
  const earlierIds = new Set(b1.units.filter(unit => !['b1_u25', 'b1_u26'].includes(unit.id)).flatMap(unit => unit.vocab.map(word => word.id)));
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
  const u25Text = (u25.grammar + u25.lessons.map(lesson => lesson.grammar).join(' ')).toLowerCase();
  for (const term of ['ramah', 'sabar', 'pendiam', 'rajin', 'malas', 'lucu', 'sopan']) assert.ok(u25Text.includes(term), 'missing character adjective ' + term);
  assert.match(u25.grammar + u25.lessons.map(lesson => lesson.grammar).join(' '), /diam[\s\S]*peN-/i);
  const u26Text = (u26.grammar + u26.lessons.map(lesson => lesson.grammar).join(' ')).toLowerCase();
  for (const term of ['nyaman', 'ramai', 'sepi', 'indah', 'bersih']) assert.ok(u26Text.includes(term), 'missing place adjective ' + term);
  assert.ok(exercisesOf(u25).some(exercise => exercise.type === 'write' && /yang/.test(exercise.modelAnswer)));
  assert.ok(exercisesOf(u26).some(exercise => exercise.type === 'write' && /lugar/.test(exercise.prompt)));
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
