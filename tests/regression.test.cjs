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
  assert.match(html, /Bahasa Studio 3\.6/);
  assert.equal(manifest.name, 'Bahasa Studio 3.6');
  assert.match(serviceWorker, /bahasa-studio-v3\.6/);
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


test('A2-B2 starter lessons keep grammar explanations aligned with their examples', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a2 = course.levels.find(level => level.id === 'A2').units[0];
  const b1 = course.levels.find(level => level.id === 'B1').units[0];
  const b2 = course.levels.find(level => level.id === 'B2').units[0];

  assert.match(a2.title, /meN-/);
  assert.match(a2.grammar, /baca.*membaca/);
  assert.match(a2.desc, /solo ese patrón inicial/);

  assert.equal(b1.vocab[0].ex, 'Nasi dimakan oleh mereka.');
  assert.equal(b1.vocab[0].exEsp, 'El arroz es comido por ellos.');
  assert.match(b1.grammar, /oleh mereka/);

  assert.equal(b2.vocab[0].idn, 'Membangunkan');
  assert.equal(b2.vocab[0].ex, 'Saya membangunkan anak.');
  assert.match(b2.grammar, /sentido causativo/);
  assert.match(b2.exercises[0].prompt, /membangunkan anak/);
  assert.equal(b2.exercises[0].answer, 0);
});
