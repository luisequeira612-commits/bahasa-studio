const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const serviceWorker = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));

test('inline application JavaScript and service worker parse', () => {
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
    .map(match => match[1]).filter(source => source.trim());
  assert.ok(scripts.length > 0, 'expected an inline application script');
  scripts.forEach(source => new vm.Script(source));
  new vm.Script(serviceWorker);
});

test('PWA version is consistent across HTML, manifest and cache', () => {
  assert.match(html, /Bahasa Studio 3\.6\.1/);
  assert.equal(manifest.name, 'Bahasa Studio 3.6.1');
  assert.match(serviceWorker, /bahasa-studio-v3\.6\.1/);
  assert.doesNotMatch(html + serviceWorker + JSON.stringify(manifest), /3\.5\.1/);
});

test('A1 units 1 and 2 teach vocabulary and provide varied practice', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  assert.ok(start >= 0 && end > start, 'CourseData block must exist');
  const source = html.slice(start, end);
  const course = vm.runInNewContext(source + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const unit1 = a1.units.find(unit => unit.id === 'a1_u1');
  const unit2 = a1.units.find(unit => unit.id === 'a1_u2');

  for (const unit of [unit1, unit2]) {
    assert.ok(unit.vocab.length >= 8, unit.id + ' should introduce at least 8 words');
    assert.ok(unit.exercises.length >= 10, unit.id + ' should contain at least 10 authored exercises');
    const vocabIds = new Set(unit.vocab.map(word => word.id));
    for (const exercise of unit.exercises) {
      assert.ok(vocabIds.has(exercise.vocabId), unit.id + ' has an exercise linked to unknown vocabulary');
      if (exercise.type === 'mc') assert.ok(exercise.answer >= 0 && exercise.answer < exercise.options.length);
      if (exercise.type === 'order') assert.deepEqual([...exercise.words].sort(), [...exercise.correctOrder].sort());
    }
  }
});

test('backup restoration validates version and replaces SRS data transactionally', () => {
  assert.match(html, /parsed\.version !== 3/);
  assert.match(html, /validateBackup\(JSON\.parse/);
  assert.match(html, /transaction\(\['srs', 'settings'\], 'readwrite'\)/);
  assert.match(html, /srsStore\.clear\(\)/);
  assert.match(html, /tx\.oncomplete/);
});

test('imported lesson content is escaped before rendering into HTML', () => {
  assert.match(html, /escapeHtml\(str\)/);
  assert.match(html, /App\.escapeHtml\(ex\.prompt\)/);
  assert.match(html, /App\.escapeHtml\(v\.idn\)/);
  assert.match(html, /this\.dataset\.word/);
});

test('published HTML has no stray text or source after its closing tag', () => {
  const closing = html.toLowerCase().lastIndexOf('</html>');
  assert.ok(closing >= 0, 'expected a closing HTML tag');
  assert.equal(html.slice(closing + '</html>'.length).trim(), '');
});

test('all authored A1 units have linked vocabulary and structurally valid exercises', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  assert.ok(start >= 0 && end > start, 'CourseData block must exist');
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  assert.ok(a1 && a1.units.length >= 8, 'A1 should contain its eight authored units');

  for (const unit of a1.units) {
    assert.ok(unit.vocab.length >= 5, unit.id + ' should teach at least five vocabulary items');
    assert.ok(unit.exercises.length >= 6, unit.id + ' should have authored practice');
    const ids = new Set(unit.vocab.map(word => word.id));
    assert.equal(ids.size, unit.vocab.length, unit.id + ' has duplicate vocabulary IDs');
    for (const exercise of unit.exercises) {
      assert.ok(ids.has(exercise.vocabId), unit.id + ' has an exercise linked to unknown vocabulary');
      assert.ok(['mc', 'translate_es_id', 'listen', 'order', 'write'].includes(exercise.type),
        unit.id + ' has an unsupported exercise type');
      if (exercise.type === 'mc') {
        assert.ok(Array.isArray(exercise.options) && exercise.options.length >= 2);
        assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length);
      }
      if (exercise.type === 'order') {
        assert.deepEqual([...exercise.words].sort(), [...exercise.correctOrder].sort());
      }
      if (exercise.type === 'translate_es_id' || exercise.type === 'listen') {
        assert.equal(typeof exercise.answer, 'string');
        assert.ok(exercise.answer.length > 0);
      }
      if (exercise.type === 'write') {
        assert.equal(typeof exercise.prompt, 'string');
        assert.ok(exercise.prompt.length > 0);
        assert.equal(typeof exercise.modelAnswer, 'string');
        assert.ok(exercise.modelAnswer.length > 0);
      }
    }
  }
});


test('A1 units provide 22 varied exercises including productive writing', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  for (const unit of a1.units) {
    const generated = unit.vocab.length + Math.ceil(unit.vocab.length / 2);
    assert.equal(unit.exercises.length + generated, 22, unit.id + ' should produce exactly 22 exercises');
    assert.ok(unit.exercises.some(exercise => exercise.type === 'write'), unit.id + ' should include productive writing');
  }
  assert.match(html, /checkWriting\(\)/);
  assert.match(html, /rateWriting\(isCorrect\)/);
});


test('A1 examples and explanations stay consistent with the taught material', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const unit4 = a1.units.find(unit => unit.id === 'a1_u4');
  const three = unit4.vocab.find(word => word.id === 'v17');
  const ageWriting = unit4.exercises.find(exercise => exercise.type === 'write');
  const unit6 = a1.units.find(unit => unit.id === 'a1_u6');
  const unit8 = a1.units.find(unit => unit.id === 'a1_u8');
  const day = unit8.vocab.find(word => word.id === 'v35');

  assert.equal(three.ex, 'Tiga tahun.');
  assert.equal(three.exEsp, 'Tres años.');
  assert.ok(unit4.exercises.some(exercise => exercise.prompt === 'Traduce: tres años' && exercise.answer === 'Tiga tahun'));
  assert.match(ageWriting.explanation, /Tengo cinco años/);
  assert.doesNotMatch(unit6.grammar, /Saya suka/);
  assert.ok(unit6.vocab.some(word => word.idn === 'Air'));
  assert.equal(day.ex, 'Hari ini saya belajar.');
  assert.equal(day.exEsp, 'Hoy estudio.');

  const unit5 = a1.units.find(unit => unit.id === 'a1_u5');
  assert.doesNotMatch(unit5.grammar, /Saya punya/);
  assert.ok(unit5.vocab.every(word => !/bekerja|baik|punya/.test(word.ex)));
  assert.ok(unit5.exercises.every(exercise => !/bekerja|punya dua anak/.test(exercise.answer || '')));

  const unit7 = a1.units.find(unit => unit.id === 'a1_u7');
  assert.equal(unit7.vocab.find(word => word.idn === 'Di mana').ex, 'Di mana sekolah?');
  assert.ok(unit7.exercises.some(exercise => exercise.prompt === 'Ordena: ¿Dónde está la escuela?'));
  assert.ok(unit7.exercises.some(exercise => exercise.prompt === 'Traduce: ¿Dónde está la escuela?' && exercise.answer === 'Di mana sekolah'));
});


test('A2-B2 starter lessons keep grammar explanations aligned with their examples', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a2 = course.levels.find(level => level.id === 'A2').units[0];
  const b1 = course.levels.find(level => level.id === 'B1').units[0];
  const b2 = course.levels.find(level => level.id === 'B2').units[0];

  assert.match(a2.title, /meN-/);
  assert.match(a2.grammar, /baca.*membaca/);
  assert.match(a2.grammar, /solo ese patrón inicial/);

  assert.equal(b1.vocab[0].ex, 'Nasi dimakan oleh mereka.');
  assert.equal(b1.vocab[0].exEsp, 'El arroz es comido por ellos.');
  assert.match(b1.grammar, /oleh mereka/);

  assert.equal(b2.vocab[0].idn, 'Membangunkan');
  assert.equal(b2.vocab[0].ex, 'Saya membangunkan anak.');
  assert.match(b2.grammar, /sentido causativo/);
  assert.match(b2.exercises[0].prompt, /membangunkan anak/);
  assert.equal(b2.exercises[0].answer, 0);
});


test('v3.6.1 audit fixes remain in place without changing backup or database versions', () => {
  assert.match(html, /attempts === 0 && i\.val\.lastReviewed === null && i\.val\.interval === 0 && i\.val\.repetition === 0/);
  assert.doesNotMatch(html, /Escucha y escribe: «Dia tidur»/);
  assert.match(html, /Tolong, saya mau air significa/);
  assert.match(html, /Di” significa “en”/);
  assert.doesNotMatch(html, /baik/);
  assert.doesNotMatch(html, /maximum-scale|user-scalable/);
  assert.match(html, /version: 1/);
  assert.match(html, /parsed\.version !== 3/);
  assert.match(html, /tx\.onabort = \(\) => reject\(tx\.error/);
  assert.match(html, /async set\(store, key, val\) \{\s+return new Promise\(\(resolve, reject\) => \{/);
  assert.match(html, /Elige la frase que significa «Esta es mi familia»/);
  assert.ok(html.includes("v.lang.toLowerCase().startsWith('id')"));
  assert.ok(html.includes("function getLearningLevels()"));
  assert.ok(html.includes("return getLevels().filter(level => !['A2', 'B1', 'B2'].includes(level.id))"));
  assert.ok(html.includes("function getUniqueLearningVocabulary()"));
  assert.ok(html.includes("String(word && word.idn || '').trim().toLocaleLowerCase()"));
  assert.ok(html.includes("async getDuplicateWordIds(wordId)"));
  assert.ok(html.includes("async getMergedSrsItem(wordId)"));
  assert.ok(html.includes("const unique = new Map()"));
  assert.ok(html.includes("if (!unique.has(signature)) unique.set(signature, item)"));
  assert.ok(html.includes("async saveAttemptForDuplicateWords(wordId, item)"));
  assert.ok(html.includes("if (aggregate.seenStates.has(signature)) continue"));
  assert.ok(html.includes("aggregate.attempts += item.val.attempts || 0"));
  assert.ok(html.includes("aggregate.correct += item.val.correct || 0"));
  assert.ok(html.includes("aggregate.incorrect += item.val.incorrect || 0"));
  assert.ok(html.includes("aggregate.repetition = Math.max(aggregate.repetition, item.val.repetition || 0)"));
});

test('unit and vocabulary IDs are unique and every authored exercise has a valid answer structure', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const unitIds = [];
  const vocabIds = [];
  for (const level of course.levels) for (const unit of level.units) {
    unitIds.push(unit.id);
    for (const word of unit.vocab || []) vocabIds.push(word.id);
    const ids = new Set((unit.vocab || []).map(word => word.id));
    for (const ex of unit.exercises || []) {
      assert.ok(ids.has(ex.vocabId), unit.id + ' has an exercise linked to unknown vocab');
      if (ex.type === 'mc') assert.ok(Number.isInteger(ex.answer) && ex.answer >= 0 && ex.answer < ex.options.length);
      else if (ex.type === 'translate_es_id' || ex.type === 'listen') assert.equal(typeof ex.answer, 'string');
      else if (ex.type === 'order') assert.deepEqual([...ex.words].sort(), [...ex.correctOrder].sort());
      else if (ex.type === 'write') assert.ok(ex.modelAnswer && ex.prompt);
      else assert.fail(unit.id + ' has unsupported exercise type ' + ex.type);
    }
  }
  assert.equal(new Set(unitIds).size, unitIds.length, 'unit IDs must be globally unique');
  assert.equal(new Set(vocabIds).size, vocabIds.length, 'vocabulary IDs must be globally unique');
});


test('SRS merge behavior deduplicates mirrored snapshots and preserves distinct counters', () => {
  const start = html.indexOf('function mergeSrsRecords(records, wordId)');
  const end = html.indexOf('const SRSEngine =', start);
  assert.ok(start >= 0 && end > start, 'production SRS merge helper must exist');
  const helperSource = html.slice(start, end);
  const mergeSrsRecords = vm.runInNewContext(helperSource + String.fromCharCode(10) + 'mergeSrsRecords');

  const mirrored = {
    attempts: 4, correct: 3, incorrect: 1, lastReviewed: 100,
    interval: 1, repetition: 1, efactor: 2.5, nextReview: 200
  };
  const deduplicated = mergeSrsRecords([{ ...mirrored }, { ...mirrored }], 'word-a');
  assert.equal(deduplicated.attempts, 4, 'mirrored attempts must not be counted twice');
  assert.equal(deduplicated.correct, 3);
  assert.equal(deduplicated.incorrect, 1);
  assert.equal(deduplicated.wordId, 'word-a');

  const combined = mergeSrsRecords([
    { attempts: 2, correct: 1, incorrect: 1, lastReviewed: 100, interval: 1, repetition: 0, efactor: 2.5, nextReview: 200 },
    { attempts: 3, correct: 2, incorrect: 1, lastReviewed: 300, interval: 6, repetition: 2, efactor: 2.6, nextReview: 400 }
  ], 'word-b');
  assert.equal(combined.attempts, 5, 'distinct legacy counters should be combined');
  assert.equal(combined.correct, 3);
  assert.equal(combined.incorrect, 2);
  assert.equal(combined.lastReviewed, 300, 'latest review should supply scheduling state');
  assert.equal(combined.interval, 6);
  assert.equal(combined.nextReview, 400);
  assert.equal(mergeSrsRecords([], 'word-c'), null);
});

test('version 3 backup normalization supplies safe defaults for absent legacy SRS fields', () => {
  const start = html.indexOf('validateBackup(parsed)');
  const end = html.indexOf('importProgress(e)', start);
  assert.ok(start >= 0 && end > start, 'backup validation and import methods must exist');
  const validator = html.slice(start, end);
  for (const expected of [
    'Number.isSafeInteger(parsed.xp)',
    'parsed.completedUnits === undefined ? [] : parsed.completedUnits',
    'parsed.customUnits === undefined ? [] : parsed.customUnits',
    "parsed.srs === undefined ? [] : parsed.srs",
    "attempts: count('attempts'), correct: count('correct'), incorrect: count('incorrect')",
    'value.lastReviewed === null || value.lastReviewed === undefined',
    "interval: num('interval', 0",
    "efactor: num('efactor', 2.5",
    'return { version: 3, xp: parsed.xp, completedUnits, customUnits, syllabusPos, srs }'
  ]) assert.ok(validator.includes(expected), 'missing backup normalization: ' + expected);
});