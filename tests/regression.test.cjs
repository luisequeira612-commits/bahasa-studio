const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const a1Source = fs.readFileSync(path.join(__dirname, '..', 'curriculum-a1.js'), 'utf8');
const a2Source = fs.readFileSync(path.join(__dirname, '..', 'curriculum-a2.js'), 'utf8');
const a1Literal = a1Source.slice(a1Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
const a2Literal = a2Source.slice(a2Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
const htmlSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const courseDataStart = htmlSource.indexOf('const CourseData =');
const htmlBase = htmlSource.slice(0, courseDataStart) + htmlSource.slice(courseDataStart)
  .replace('window.BAHASA_CURRICULUM_A1', a1Literal)
  .replace('window.BAHASA_CURRICULUM_A2', a2Literal);
const serviceWorker = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const studyActivitySource = fs.readFileSync(path.join(root, 'study-activity.js'), 'utf8');
const audioEngineSource = fs.readFileSync(path.join(root, 'audio-engine.js'), 'utf8');
const pronunciationEngineSource = fs.readFileSync(path.join(root, 'pronunciation-engine.js'), 'utf8');
const html = htmlBase + '\n' + audioEngineSource + '\n' + pronunciationEngineSource;
const studyActivitySandbox = { window: {} };
vm.runInNewContext(studyActivitySource, studyActivitySandbox);
const StudyActivity = studyActivitySandbox.window.StudyActivity;

test('inline application JavaScript and service worker parse', () => {
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
    .map(match => match[1]).filter(source => source.trim());
  assert.ok(scripts.length > 0, 'expected an inline application script');
  scripts.forEach(source => new vm.Script(source));
  new vm.Script(serviceWorker);
  new vm.Script(audioEngineSource);
  new vm.Script(pronunciationEngineSource);
  assert.match(htmlSource, /<script src="\.\/audio-engine\.js"><\/script>/);
  assert.match(htmlSource, /<script src="\.\/pronunciation-engine\.js"><\/script>/);
});

test('PWA version is consistent across HTML, manifest and cache', () => {
  assert.match(html, /Bahasa Studio 3\.8\.8/);
  assert.equal(manifest.name, 'Bahasa Studio 3.8.8');
  assert.match(serviceWorker, /bahasa-studio-v3\.8\.17/);
  for (const asset of ['./', './index.html', './manifest.json', './assessment.html', './assessment-engine.js', './conversation-engine.js', './study-activity.js', './curriculum-a1.js', './curriculum-a2.js', './styles.css', './audio-engine.js', './pronunciation-engine.js', './writing-practice.js']) {
    assert.ok(serviceWorker.includes("'" + asset + "'"), asset + ' must be precached for offline use');
  }
  assert.doesNotMatch(html + serviceWorker + JSON.stringify(manifest), /3\.5\.1/);
});

test('A2 stays in beta until all A1 units are complete, including direct lesson entry', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  assert.ok(start >= 0 && end > start, 'CourseData block must exist');
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const helper = html.match(/function isA1Complete\(completedUnits\) \{[\s\S]*?\n        \}/);
  assert.ok(helper, 'the A1 completion rule must be centralized');
  const isA1Complete = vm.runInNewContext(helper[0] + '\nisA1Complete', { CourseData: course });
  const a1 = course.levels.find(level => level.id === 'A1');
  const allIds = a1.units.map(unit => unit.id);
  assert.equal(isA1Complete([]), false);
  assert.equal(isA1Complete(allIds.slice(0, -1)), false);
  assert.equal(isA1Complete(allIds), true);
  assert.match(html, /level\.id !== 'A2' \|\| isA1Complete\(App\.completedUnits\)/,
    'A2 vocabulary must not enter learning and SRS pools before A1 is complete');
  const lessonEntry = html.slice(html.indexOf('startUnitById(id, requestedLessonIndex)'), html.indexOf('startUnit(unit, lessonIndex = 0)'));
  const assessmentEntry = html.slice(html.indexOf('startUnitAssessment(unitId)'), html.indexOf('startUnitById(id, requestedLessonIndex)'));
  assert.match(lessonEntry, /level\.id === 'A2' && !isA1Complete\(App\.completedUnits\)/,
    'direct lesson entry must reject A2 before A1 completion');
  assert.match(assessmentEntry, /level\.id === 'A2' && !isA1Complete\(App\.completedUnits\)/,
    'direct assessment entry must reject A2 before A1 completion');
  assert.match(html, /Beta · en revisión/);
  assert.match(html, /no ha sido validado por hablantes nativos/);
  assert.match(html, /const unitAccessible = lvl\.id === 'A1'[\s\S]*?lvl\.id === 'A2' \? a1Complete/);
  assert.ok(html.includes("['B1', 'B2'].includes(level.id)"),
    'B1 and B2 must remain blocked from direct lesson entry');
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

test('A1 distinguishes informal kamu from formal Anda in vocabulary', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  assert.ok(start >= 0 && end > start, 'CourseData block must exist');
  const course = vm.runInNewContext(html.slice(start, end) + String.fromCharCode(10) + 'CourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const allWords = a1.units.flatMap(unit => unit.vocab);
  const kamu = allWords.find(word => word.idn.toLowerCase() === 'kamu');
  const anda = allWords.find(word => word.idn === 'Anda');
  assert.ok(kamu, 'A1 should teach kamu');
  assert.ok(anda, 'A1 should teach Anda');
  assert.match(kamu.esp, /tú/i);
  assert.match(anda.esp, /formal/i, 'Anda should be explicitly labelled formal');
  assert.match(anda.exEsp, /usted/i, 'Anda example should use the formal Spanish register');
});

test('backup restoration validates version and replaces SRS data transactionally', () => {
  assert.match(html, /parsed\.version !== 3/);
  assert.match(html, /validateBackup\(JSON\.parse/);
  assert.match(html, /transaction\(\['srs', 'settings'\], 'readwrite'\)/);
  assert.match(html, /srsStore\.clear\(\)/);
  assert.match(html, /putSetting\('studyActivity', data\.studyActivity/);
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
  assert.equal(htmlBase.slice(closing + '</html>'.length).trim(), '');
});

test('all authored A1 units have linked vocabulary and structurally valid exercises', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  assert.ok(start >= 0 && end > start, 'CourseData block must exist');
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  assert.ok(a1, 'A1 level must exist');
  assert.equal(a1.units.length, 32, 'A1 should contain exactly 32 authored units');

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


test('A1 units provide at least 22 varied exercises including productive writing', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  for (const unit of a1.units) {
    const generated = unit.vocab.length + Math.ceil(unit.vocab.length / 2);
    assert.ok(unit.exercises.length + generated >= 22, unit.id + ' should provide at least 22 exercises');
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


test('A2 units 1-4 begin with the approved temporal and narrative progression', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a2 = course.levels.find(level => level.id === 'A2');
  assert.equal(a2.units[0].title, 'Unidad 1: Días, meses y fechas');
  assert.ok(a2.units[0].vocab.some(word => word.idn === 'Musim hujan'));
  assert.ok(a2.units[0].vocab.some(word => word.idn === 'Musim kemarau'));
  assert.match(a2.units[1].grammar, /sudah, belum, sedang y akan/);
  assert.match(a2.units[2].title, /secuencias/);
  assert.match(a2.units[3].title, /jornada cotidiana/);
  assert.match(a2.units[4].title, /ber-/);
  assert.match(a2.units[4].grammar, /ber-/);
  assert.match(a2.units[5].grammar, /men-/);
  assert.match(a2.units[6].grammar, /meng-/);
  assert.match(a2.units[7].grammar, /mem-.*meny-/);
  assert.ok(a2.units.slice(4, 8).every(unit => Array.isArray(unit.lessons) && unit.lessons.length >= 3 && unit.lessons.length <= 5));
  assert.match(a2.units[8].title, /opiniones/);
  assert.match(a2.units[9].title, /Normas/);
  assert.match(a2.units[10].title, /Problemas/);
  assert.match(a2.units[11].title, /Experiencia/);
  assert.ok(a2.units.slice(8, 12).every(unit => unit.lessons.length === 4 && unit.vocab.length === 12));

  const b1 = course.levels.find(level => level.id === 'B1').units[0];
  const b2 = course.levels.find(level => level.id === 'B2').units[0];
  assert.equal(b1.vocab[0].ex, 'Nasi dimakan oleh mereka.');
  assert.equal(b1.vocab[0].exEsp, 'El arroz es comido por ellos.');
  assert.match(b1.grammar, /oleh mereka/);
  assert.equal(b2.vocab[0].idn, 'Membangunkan');
  assert.equal(b2.vocab[0].ex, 'Saya membangunkan anak.');
  assert.match(b2.grammar, /sentido causativo/);
  assert.match(b2.exercises[0].prompt, /membangunkan anak/);
  assert.equal(b2.exercises[0].answer, 0);
});

test('A2 units 1-4 have 3-5 authored lessons and a complete unit-test bank', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const engineStart = html.indexOf('function buildUnitAssessmentItems');
  const engineEnd = html.indexOf('function unitLessonProgressKey', engineStart);
  assert.ok(engineStart >= 0 && engineEnd > engineStart, 'unit lesson and assessment builders must exist');
  const engine = vm.runInNewContext(
    html.slice(engineStart, engineEnd) + '\n({ buildUnitLessons, buildUnitAssessmentItems })',
    { CourseData: course, Map, Set, Math }
  );
  const a2 = course.levels.find(level => level.id === 'A2');
  const allVocabIds = new Set(course.levels.flatMap(level => level.units.flatMap(unit => unit.vocab || [])).map(word => word.id));
  const a1Forms = new Set(course.levels.find(level => level.id === 'A1').units.flatMap(unit => unit.vocab).map(word => word.idn.trim().toLowerCase()));
  for (const unit of a2.units.slice(0, 4)) {
    const lessons = engine.buildUnitLessons(unit);
    assert.ok(lessons.length >= 3 && lessons.length <= 5, unit.id + ' must have 3-5 lessons');
    const lessonExercises = lessons.flatMap(lesson => lesson.exercises);
    assert.ok(lessonExercises.length >= 14 && lessonExercises.length <= 22,
      unit.id + ' must contain 14-22 exercises across its lessons');
    assert.ok(new Set(lessonExercises.map(exercise => exercise.type)).size >= 4,
      unit.id + ' must use at least four exercise types');
    assert.ok(lessonExercises.some(exercise => exercise.type === 'write' && exercise.hint && exercise.modelAnswer),
      unit.id + ' must include a concrete original-writing task');
    const fullSentences = lessonExercises.filter(exercise =>
      /[.!?]/.test(exercise.answer || exercise.modelAnswer || '') &&
      /\s/.test(exercise.answer || exercise.modelAnswer || '')
    );
    assert.ok(fullSentences.length >= 5, unit.id + ' must include at least five full-sentence tasks');

    const unitVocabIds = new Set(unit.vocab.map(word => word.id));
    for (const lesson of lessons) {
      assert.ok(lesson.newVocab.length > 0, lesson.title + ' must introduce vocabulary');
      for (const word of lesson.newVocab) assert.ok(unitVocabIds.has(word.id));
      for (const exercise of lesson.exercises) {
        assert.ok(allVocabIds.has(exercise.vocabId), unit.id + ' has an exercise linked to unknown canonical vocabulary');
        assert.ok(['mc', 'translate_es_id', 'listen', 'order', 'write'].includes(exercise.type));
        if (exercise.type === 'mc') {
          assert.ok(Array.isArray(exercise.options) && exercise.options.length >= 2);
          assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length);
        }
        if (exercise.type === 'order') assert.deepEqual([...exercise.words].sort(), [...exercise.correctOrder].sort());
        if (exercise.type === 'translate_es_id' || exercise.type === 'listen') {
          assert.equal(typeof exercise.answer, 'string');
          assert.ok(exercise.answer.length > 0);
        }
        if (exercise.type === 'write') {
          assert.equal(typeof exercise.modelAnswer, 'string');
          assert.ok(exercise.modelAnswer.length > 0);
        }
      }
    }
    for (const word of unit.vocab) {
      assert.ok(!a1Forms.has(word.idn.trim().toLowerCase()), unit.id + ' must not reintroduce an A1 word as new vocabulary');
    }
    const testItems = engine.buildUnitAssessmentItems(unit);
    assert.equal(testItems.length, unit.vocab.length, unit.id + ' must generate one assessment item per taught word');
    assert.ok(testItems.length >= 10);
    for (const item of testItems) {
      assert.ok(unitVocabIds.has(item.vocabId));
      assert.equal(item.options[item.answer], unit.vocab.find(word => word.id === item.vocabId).esp);
    }
  }
});

test('tap-to-translate includes authored exercises from multi-lesson units', () => {
  assert.match(html, /const authoredExercises = \[\s*\.\.\.\(unit\.exercises \|\| \[\]\),\s*\.\.\.\(unit\.lessons \|\| \[\]\)\.flatMap\(lesson => lesson\.exercises \|\| \[\]\)\s*\]/);
});

test('A2 joins learning vocabulary only after A1 completion and assessment lookup is level-independent', () => {
  assert.match(html, /return getLevels\(\)\.filter\(level =>[\s\S]*?level\.id !== 'A2' \|\| isA1Complete\(App\.completedUnits\)/);
  assert.match(html, /startUnitAssessment\(unitId\) \{\s*const level = getLevels\(\)\.find\(entry => entry\.units\.some\(unit => unit\.id === unitId\)\)/);
  assert.match(html, /\(level\.id === 'A2' && !isA1Complete\(App\.completedUnits\)\)/);
});

test('v3.7.1 audit fixes remain in place without changing backup or database versions', () => {
  assert.match(html, /attempts === 0 && i\.val\.lastReviewed === null && i\.val\.interval === 0 && i\.val\.repetition === 0/);
  assert.doesNotMatch(html, /Escucha y escribe: «Dia tidur»/);
  assert.match(html, /idn: 'Tolong', esp: 'Por favor \(al pedir una acción\) \/ ayudar', ex: 'Tolong!', exEsp: '¡Ayuda, por favor!'/);
  assert.match(html, /no equivale mecánicamente a “por favor”/);
  assert.match(html, /Di” significa “en”/);
  assert.doesNotMatch(html, /maximum-scale|user-scalable/);
  assert.match(html, /version: 1/);
  assert.match(html, /parsed\.version !== 3/);
  assert.match(html, /tx\.onabort = \(\) => reject\(tx\.error/);
  assert.match(html, /async set\(store, key, val\) \{\s+return this\.setMany\(store, \[\{ key, val \}\]\);/);
  assert.match(html, /async setMany\(store, entries\) \{\s+return new Promise\(\(resolve, reject\) => \{/);
  assert.match(html, /Elige la frase que significa «Esta es mi familia»/);
  assert.ok(html.includes("String(voice.lang || '').toLowerCase().startsWith('id')"),
    'voice discovery should tolerate missing language metadata without throwing');
  assert.ok(html.includes("function getLearningLevels()"));
  assert.ok(html.includes("return getLevels().filter(level =>"));
  assert.ok(html.includes("(level.id !== 'A2' || isA1Complete(App.completedUnits))"));
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
  const vocabById = new Map();
  for (const level of course.levels) for (const unit of level.units) {
    unitIds.push(unit.id);
    for (const word of unit.vocab || []) {
      const normalized = word.idn.trim().toLocaleLowerCase();
      if (vocabById.has(word.id)) {
        assert.equal(vocabById.get(word.id), normalized, word.id + ' must always identify the same vocabulary item');
      } else {
        vocabById.set(word.id, normalized);
      }
    }
    const ids = new Set((unit.vocab || []).map(word => word.id));
    for (const ex of unit.exercises || []) {
      assert.ok(ids.has(ex.vocabId), unit.id + ' has an exercise linked to unknown vocab');
      if (ex.type === 'mc') assert.ok(Number.isInteger(ex.answer) && ex.answer >= 0 && ex.answer < ex.options.length);
      else if (ex.type === 'translate_es_id' || ex.type === 'listen') assert.equal(typeof ex.answer, 'string');
      else if (ex.type === 'order') assert.equal(JSON.stringify([...ex.words].sort()), JSON.stringify([...ex.correctOrder].sort()));
      else if (ex.type === 'write') assert.ok(ex.modelAnswer && ex.prompt);
      else assert.fail(unit.id + ' has unsupported exercise type ' + ex.type);
    }
  }
  assert.equal(new Set(unitIds).size, unitIds.length, 'unit IDs must be globally unique');
  assert.ok(vocabById.size > 0, 'vocabulary ID registry should not be empty');
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
    'parsed.completedLessons === undefined ? [] : parsed.completedLessons',
    'parsed.customUnits === undefined ? [] : parsed.customUnits',
    "parsed.srs === undefined ? [] : parsed.srs",
    "const attempts = count('attempts');",
    "const correct = count('correct');",
    "const incorrect = count('incorrect');",
    "if (correct + incorrect > attempts) fail();",
    'value.lastReviewed === null || value.lastReviewed === undefined',
    "interval: num('interval', 0",
    "efactor: num('efactor', 2.5",
    'const studyActivity = StudyActivity.validateBackup(parsed.studyActivity, new Date());',
    'return { version: 3, xp: parsed.xp, completedUnits, completedLessons, customUnits, syllabusPos, srs, studyActivity }'
  ]) assert.ok(validator.includes(expected), 'missing backup normalization: ' + expected);
});

// Functional tests: execute the production method bodies with controlled dependencies,
// rather than only asserting that expected source strings exist.
test('SRS recordAttempt updates real attempt state for correct and incorrect answers', async () => {
  const methodStart = html.indexOf('async recordAttempt(wordId, quality) {');
  const methodEnd = html.indexOf('\n            async getDuplicateWordIds(wordId)', methodStart);
  assert.ok(methodStart >= 0 && methodEnd > methodStart, 'production recordAttempt method must exist');
  const methodSource = html.slice(methodStart, methodEnd);
  const bodyStart = methodSource.indexOf('{') + 1;
  const bodyEnd = methodSource.lastIndexOf('\n            },');
  assert.ok(bodyStart > 0 && bodyEnd > bodyStart, 'could extract production recordAttempt method body');
  const methodBody = methodSource.slice(bodyStart, bodyEnd);
  const recordAttempt = vm.runInNewContext(
    '({ async recordAttempt(wordId, quality) {' + methodBody + '\n} }).recordAttempt',
    { Date: { now: () => 1000000 } }
  );

  const saved = [];
  const successfulEngine = {
    getMergedSrsItem: async () => ({
      wordId: 'v1', interval: 0, repetition: 0, efactor: 2.5,
      nextReview: 0, attempts: 2, correct: 1, incorrect: 1, lastReviewed: null
    }),
    saveAttemptForDuplicateWords: async (wordId, item) => saved.push({ wordId, item }),
    recordAttempt
  };
  await successfulEngine.recordAttempt('v1', 5);
  assert.equal(saved.length, 1);
  assert.equal(saved[0].wordId, 'v1');
  assert.equal(saved[0].item.attempts, 3);
  assert.equal(saved[0].item.correct, 2);
  assert.equal(saved[0].item.incorrect, 1);
  assert.equal(saved[0].item.repetition, 1);
  assert.equal(saved[0].item.interval, 1);
  assert.equal(saved[0].item.lastReviewed, 1000000);

  const incorrectSaved = [];
  const incorrectEngine = {
    getMergedSrsItem: async () => ({
      wordId: 'v1', interval: 6, repetition: 3, efactor: 2.5,
      nextReview: 0, attempts: 4, correct: 3, incorrect: 1, lastReviewed: null
    }),
    saveAttemptForDuplicateWords: async (wordId, item) => incorrectSaved.push({ wordId, item }),
    recordAttempt
  };
  await incorrectEngine.recordAttempt('v1', 1);
  assert.equal(incorrectSaved.length, 1);
  assert.equal(incorrectSaved[0].item.attempts, 5);
  assert.equal(incorrectSaved[0].item.correct, 3);
  assert.equal(incorrectSaved[0].item.incorrect, 2);
  assert.equal(incorrectSaved[0].item.repetition, 0);
  assert.equal(incorrectSaved[0].item.interval, 1);
});

test('vocabulary mastery percentage is calculated from unique words and spaced-repetition success', () => {
  assert.match(html, /id="statMasteredPercent"/);
  assert.match(html, /Math\.round\(mastered \/ uniqueVocab\.length \* 100\)/);
  assert.match(html, /item\.repetition > 3/);
  assert.match(html, /cuatro o más repasos correctos seguidos/i);
});

test('backup export includes the daily study activity record', () => {
  assert.match(html, /studyActivity: this\.studyActivity/);
  assert.match(html, /this\.studyActivity = backup\.studyActivity/);
});

test('backup validator executes against valid and invalid version 3 payloads', () => {
  const methodStart = html.indexOf('            validateBackup(parsed) {');
  const methodEnd = html.indexOf('\n            importProgress(e)', methodStart);
  assert.ok(methodStart >= 0 && methodEnd > methodStart, 'production backup validator must exist');
  const methodSource = html.slice(methodStart, methodEnd).trim().replace(/,$/, '');
  const courseStart = html.indexOf('const CourseData =');
  const courseEnd = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', courseStart);
  const course = vm.runInNewContext('(() => {\n' + html.slice(courseStart, courseEnd) + '\nreturn CourseData;\n})()');
  const validateBackup = vm.runInNewContext(
    '({' + methodSource + '\n}).validateBackup',
    { CourseData: course, SYLLABUS: [], LEGACY_SRS_ID_ALIASES: {}, StudyActivity }
  );

  const normalized = validateBackup({
    version: 3, xp: 12, completedUnits: [], customUnits: [], syllabusPos: 0,
    srs: [{
      key: 'v1',
      val: { attempts: 2, correct: 1, incorrect: 1, lastReviewed: null }
    }]
  });
  assert.equal(normalized.version, 3);
  assert.equal(normalized.xp, 12);
  assert.equal(normalized.srs.length, 1);
  assert.equal(normalized.srs[0].key, 'v1');
  assert.equal(normalized.srs[0].val.attempts, 2);
  assert.equal(normalized.srs[0].val.interval, 0);
  assert.equal(normalized.srs[0].val.efactor, 2.5);
  assert.equal(normalized.srs[0].val.repetition, 0);
  assert.equal(normalized.studyActivity.dailyGoal, 30,
    'legacy backups without study activity should receive a safe default');

  assert.throws(() => validateBackup({
    version: 2, xp: 12, completedUnits: [], customUnits: [], srs: []
  }), /Formato de copia no válido/);

  assert.throws(() => validateBackup({
    version: 3, xp: 12, completedUnits: [], customUnits: [], syllabusPos: 0,
    srs: [{ key: 'v1', val: { attempts: 2, correct: 2, incorrect: 1 } }]
  }), /Formato de copia no válido/, 'correct and incorrect answers cannot exceed total attempts');

  assert.throws(() => validateBackup({
    version: 3, xp: 12, completedUnits: [], customUnits: [], syllabusPos: 0,
    srs: [{ key: 'v1', val: { attempts: 1, correct: 2, incorrect: 0 } }]
  }), /Formato de copia no válido/, 'correct answers cannot exceed total attempts');

  assert.throws(() => validateBackup({
    version: 3, xp: 12, completedUnits: [], customUnits: [], syllabusPos: 0,
    srs: [
      { key: 'v1', val: { attempts: 1, correct: 1, incorrect: 0 } },
      { key: 'v1', val: { attempts: 2, correct: 1, incorrect: 1 } }
    ]
  }), /Formato de copia no válido/, 'duplicate SRS keys must not silently discard a second history');

  const legacyCounters = validateBackup({
    version: 3, xp: 12, completedUnits: [], customUnits: [], syllabusPos: 0,
    srs: [{ key: 'v1', val: { attempts: 3, correct: 1, incorrect: 1 } }]
  });
  assert.equal(legacyCounters.srs[0].val.attempts, 3,
    'older records with unclassified attempts remain importable');
  const scheduled = validateBackup({
    version: 3, xp: 12, completedUnits: [], customUnits: [], syllabusPos: 0,
    srs: [{ key: 'v1', val: { attempts: 1, correct: 1, incorrect: 0, nextReview: 1900000000000 } }]
  });
  assert.equal(scheduled.srs[0].val.nextReview, 1900000000000,
    'valid millisecond timestamps must remain intact');

  const malformedRecords = [
    { attempts: -1 },
    { attempts: 1.5 },
    { attempts: 1, correct: -1 },
    { attempts: 1, repetition: 1.5 },
    { interval: -1 },
    { efactor: 1.2 },
    { nextReview: 'tomorrow' },
    { lastReviewed: -1 },
    { savedForReview: 'true' }
  ];
  for (const val of malformedRecords) {
    assert.throws(() => validateBackup({
      version: 3, xp: 12, completedUnits: [], customUnits: [], syllabusPos: 0,
      srs: [{ key: 'v1', val }]
    }), /Formato de copia no válido/, 'present malformed SRS fields must be rejected: ' + JSON.stringify(val));
  }
});


test('backup restoration writes SRS and settings in one readwrite transaction and rejects aborts', async () => {
  const methodStart = html.indexOf('async replaceBackupData(data) {');
  const methodEnd = html.indexOf('\n        };', methodStart);
  assert.ok(methodStart >= 0 && methodEnd > methodStart, 'production backup restore method must exist');
  const methodSource = html.slice(methodStart, methodEnd);
  const bodyStart = methodSource.indexOf('{') + 1;
  const bodyEnd = methodSource.lastIndexOf('\n            }');
  assert.ok(bodyStart > 0 && bodyEnd > bodyStart, 'could extract production backup restore method body');
  const methodBody = methodSource.slice(bodyStart, bodyEnd);
  const replaceBackupData = vm.runInNewContext(
    '({ async replaceBackupData(data) {' + methodBody + '\n} }).replaceBackupData',
    { StudyActivity }
  );

  const data = {
    srs: [{ key: 'v1', val: { attempts: 2 } }],
    xp: 8, completedUnits: ['a1_u1'], customUnits: [], syllabusPos: 0
  };
  const writes = [];
  const transactions = [];
  const stores = {
    srs: {
      clear: () => writes.push({ store: 'srs', type: 'clear' }),
      put: value => writes.push({ store: 'srs', type: 'put', value })
    },
    settings: {
      put: value => writes.push({ store: 'settings', type: 'put', value })
    }
  };
  const db = {
    transaction(names, mode) {
      const tx = {
        names, mode, error: null,
        objectStore: name => stores[name],
        oncomplete: null, onerror: null, onabort: null
      };
      transactions.push(tx);
      queueMicrotask(() => tx.oncomplete && tx.oncomplete());
      return tx;
    }
  };
  await replaceBackupData.call({ db }, data);
  assert.deepEqual(Array.from(transactions[0].names), ['srs', 'settings']);
  assert.equal(transactions[0].mode, 'readwrite');
  assert.ok(writes.some(write => write.store === 'srs' && write.type === 'clear'));
  assert.ok(writes.some(write => write.store === 'srs' && write.type === 'put' && write.value.wordId === 'v1'));
  assert.ok(writes.some(write => write.store === 'settings' && write.type === 'put' && write.value.key === 'userXp' && write.value.val === 8));
  assert.ok(writes.some(write => write.store === 'settings' && write.type === 'put' && write.value.key === 'completedUnits'));
  assert.ok(writes.some(write => write.store === 'settings' && write.type === 'put' && write.value.key === 'studyActivity'));

  const abortDb = {
    transaction() {
      const tx = {
        error: new Error('simulated transaction abort'),
        objectStore: name => stores[name],
        oncomplete: null, onerror: null, onabort: null
      };
      queueMicrotask(() => tx.onabort && tx.onabort());
      return tx;
    }
  };
  await assert.rejects(replaceBackupData.call({ db: abortDb }, data), /simulated transaction abort/);
});



function extractMethodBody(source, signature) {
  const start = source.indexOf(signature);
  assert.ok(start >= 0, 'production method must exist: ' + signature);
  const open = source.indexOf('{', start);
  assert.ok(open >= 0, 'production method body must open');
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') {
      depth--;
      if (depth === 0) return source.slice(open + 1, i);
    }
  }
  assert.fail('production method body must close: ' + signature);
}

test('SRS due queue returns one due item per Indonesian headword and excludes placeholders', async () => {
  const methodBody = extractMethodBody(html, 'async getDueItems() {');

  const vocab = [
    { id: 'dup-a', idn: ' Air ', esp: 'agua' },
    { id: 'dup-b', idn: 'air', esp: 'agua' },
    { id: 'other', idn: 'Buku', esp: 'libro' }
  ];
  const records = [
    { key: 'legacy-a', val: { nextReview: 5, attempts: 1, lastReviewed: 1, interval: 1, repetition: 1, incorrect: 0 } },
    { key: 'dup-a', val: { nextReview: 10, attempts: 2, lastReviewed: 1, interval: 1, repetition: 1, incorrect: 1 } },
    { key: 'dup-b', val: { nextReview: 20, attempts: 3, lastReviewed: 2, interval: 1, repetition: 1, incorrect: 2 } },
    { key: 'other', val: { nextReview: 10, attempts: 0, lastReviewed: null, interval: 0, repetition: 0 } },
    { key: 'unknown', val: { nextReview: 1, attempts: 1 } },
    { key: 'future', val: { nextReview: 999999, attempts: 1 } }
  ];
  const getDueItems = vm.runInNewContext(
    '({ async getDueItems() {' + methodBody + '\n} }).getDueItems',
    {
      getLearningLevels: () => [{ units: [{ vocab }] }],
      LEGACY_SRS_ID_ALIASES: { 'legacy-a': 'dup-a' },
      DB: { getAll: async () => records },
      Date: { now: () => 100 }
    }
  );
  const due = await getDueItems.call({});
  assert.deepEqual(Array.from(due, item => item.key), ['dup-b'], 'the most difficult duplicate headword should represent the review card');
});

test('SRS duplicate snapshots are persisted in one atomic IndexedDB transaction', async () => {
  const setManyBody = extractMethodBody(html, 'async setMany(store, entries) {');
  const transactions = [];
  const writes = [];
  const fakeDb = {
    transaction(store, mode) {
      const tx = {
        error: null,
        objectStore(name) {
          assert.equal(name, store);
          return { put: value => writes.push(value) };
        }
      };
      transactions.push({ store, mode, tx });
      Promise.resolve().then(() => tx.oncomplete && tx.oncomplete());
      return tx;
    }
  };
  const setMany = vm.runInNewContext(
    '({ async setMany(store, entries) {' + setManyBody + '\n} }).setMany'
  );
  await setMany.call({ db: fakeDb }, 'srs', [
    { key: 'v27', val: { attempts: 4, wordId: 'v27' } },
    { key: 'v48', val: { attempts: 4, wordId: 'v48' } }
  ]);
  assert.equal(transactions.length, 1, 'all duplicate IDs must share one readwrite transaction');
  assert.equal(transactions[0].store, 'srs');
  assert.equal(transactions[0].mode, 'readwrite');
  assert.deepEqual(writes.map(value => value.wordId), ['v27', 'v48']);
  assert.ok(writes.every(value => value.val.attempts === 4));
});

test('SRS duplicate attempt persistence delegates all aliases to one atomic batch', async () => {
  const methodBody = extractMethodBody(html, 'async saveAttemptForDuplicateWords(wordId, item) {');
  const batches = [];
  const saveAttemptForDuplicateWords = vm.runInNewContext(
    '({ async saveAttemptForDuplicateWords(wordId, item) {' + methodBody + '\n} }).saveAttemptForDuplicateWords',
    { DB: { setMany: async (store, entries) => batches.push({ store, entries }) } }
  );
  const engine = {
    getDuplicateWordIds: async wordId => wordId === 'v27' ? ['v27', 'v48'] : [wordId],
    saveAttemptForDuplicateWords
  };
  await engine.saveAttemptForDuplicateWords.call(engine, 'v27', { attempts: 4, interval: 6 });
  assert.equal(batches.length, 1);
  assert.equal(batches[0].store, 'srs');
  assert.deepEqual(Array.from(batches[0].entries, entry => entry.key), ['v27', 'v48']);
  assert.ok(batches[0].entries.every(entry => entry.val.attempts === 4));
});

test('invalid backup import leaves existing progress untouched and never starts restoration', async () => {
  const validatorBody = extractMethodBody(html, 'validateBackup(parsed) {');
  const courseStart = html.indexOf('const CourseData =');
  const courseEnd = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', courseStart);
  const course = vm.runInNewContext(html.slice(courseStart, courseEnd) + '\nCourseData');
  const validateBackup = vm.runInNewContext(
    '({ validateBackup(parsed) {' + validatorBody + '\n} }).validateBackup',
    { CourseData: course, SYLLABUS: [] }
  );
  const importBody = extractMethodBody(html, 'importProgress(e) {');
  const readers = [];
  class FakeFileReader {
    constructor() { readers.push(this); }
    readAsText(file) { this.file = file; }
  }
  const importProgress = vm.runInNewContext(
    '({ importProgress(e) {' + importBody + '\n} }).importProgress',
    {
      FileReader: FakeFileReader,
      confirm: () => { throw new Error('confirmation must not run for invalid backup'); },
      alert: () => {},
      location: { reload: () => { throw new Error('page must not reload for invalid backup'); } }
    }
  );

  let restoreCalls = 0;
  const app = {
    xp: 42,
    completedUnits: ['a1_u1'],
    validateBackup,
    DB: { replaceBackupData: async () => { restoreCalls++; } }
  };
  const target = { files: [{ size: 100 }], value: 'selected-file' };
  importProgress.call(app, { target });
  await readers[0].onload({ target: { result: JSON.stringify({ version: 2, xp: 5 }) } });

  assert.equal(restoreCalls, 0);
  assert.equal(app.xp, 42);
  assert.deepEqual(app.completedUnits, ['a1_u1']);
  assert.equal(target.value, '');
});


test('A1 units 9–11 cover numbers, prices, and time with linked exercises', () => {
  const courseStart = html.indexOf('const CourseData =');
  const courseEnd = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', courseStart);
  assert.ok(courseStart >= 0 && courseEnd > courseStart, 'CourseData block must exist');
  const course = vm.runInNewContext('(() => {\n' + html.slice(courseStart, courseEnd) + '\nreturn CourseData;\n})()');
  const a1 = course.levels.find(level => level.id === 'A1');
  assert.equal(a1.units.length, 32)

  const added = ['a1_u9', 'a1_u10', 'a1_u11'].map(id => {
    const unit = a1.units.find(candidate => candidate.id === id);
    assert.ok(unit, 'missing unit ' + id);
    assert.ok(unit.exercises.length >= 14 && unit.exercises.length <= 22,
      id + ' should contain 14–22 exercises');
    const ids = unit.vocab.map(word => word.id);
    assert.equal(new Set(ids).size, ids.length, id + ' has duplicate vocabulary IDs');
    const vocabIds = new Set(ids);
    for (const exercise of unit.exercises) {
      assert.ok(vocabIds.has(exercise.vocabId), id + ' has an exercise linked to unknown vocabulary');
      assert.ok(['mc', 'translate_es_id', 'listen', 'order', 'write'].includes(exercise.type),
        id + ' has an unsupported exercise type');
      if (exercise.type === 'mc') {
        assert.ok(Array.isArray(exercise.options) && exercise.options.length >= 2);
        assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length);
      }
      if (exercise.type === 'order') {
        assert.deepEqual([...exercise.words].sort(), [...exercise.correctOrder].sort());
      }
    }
    return unit;
  });

  const oldWords = new Set(a1.units.filter(unit => !['a1_u9', 'a1_u10', 'a1_u11', 'a1_u18', 'a1_u19', 'a1_u20'].includes(unit.id))
    .flatMap(unit => unit.vocab).map(word => word.idn.trim().toLocaleLowerCase()));
  const newVocab = added.flatMap(unit => unit.vocab).filter(word => /^v(12[4-9]|1[3-5]\d|158)$/.test(word.id));
  const newIds = newVocab.map(word => word.id);
  assert.equal(new Set(newIds).size, newIds.length, 'new vocabulary IDs must be unique');
  for (const word of newVocab) {
    assert.ok(!oldWords.has(word.idn.trim().toLocaleLowerCase()),
      word.idn + ' duplicates existing vocabulary under a new ID');
  }
});

test('A2 is available after A1 completion while B1 and B2 remain in development', () => {
  assert.match(html, /const a1Complete = isA1Complete\(this\.completedUnits\)/);
  assert.match(html, /if \(!a1Complete\) return;/);
  assert.match(html, /A2 ya está disponible|Beta · en revisión/);
  assert.match(html, /\$\{lvl\.title\} — En desarrollo/);
  assert.match(html, /\['B1', 'B2'\]\.includes\(level\.id\)/);
});


test('A1 units 12–14 add routine, weather, and transport without duplicate vocabulary', () => {
  const courseStart = html.indexOf('const CourseData =');
  const courseEnd = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', courseStart);
  const course = vm.runInNewContext('(() => {\n' + html.slice(courseStart, courseEnd) + '\nreturn CourseData;\n})()');
  const a1 = course.levels.find(level => level.id === 'A1');
  const added = ['a1_u12', 'a1_u13', 'a1_u14'].map(id => {
    const unit = a1.units.find(candidate => candidate.id === id);
    assert.ok(unit, 'missing unit ' + id);
    assert.ok(unit.exercises.length >= 14 && unit.exercises.length <= 22);
    const ids = unit.vocab.map(word => word.id);
    assert.equal(new Set(ids).size, ids.length);
    const vocabIds = new Set(ids);
    for (const exercise of unit.exercises) {
      assert.ok(vocabIds.has(exercise.vocabId), id + ' exercise references unknown vocabulary');
      assert.ok(['mc', 'translate_es_id', 'listen', 'order', 'write'].includes(exercise.type));
      if (exercise.type === 'mc') assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length);
      if (exercise.type === 'order') assert.deepEqual([...exercise.words].sort(), [...exercise.correctOrder].sort());
    }
    assert.ok(unit.exercises.some(ex => ex.type === 'write'));
    return unit;
  });
  const previousTerms = new Set(a1.units.filter(unit => !['a1_u12','a1_u13','a1_u14'].includes(unit.id))
    .flatMap(unit => unit.vocab).map(word => word.idn.trim().toLocaleLowerCase()));
  const terms = added.flatMap(unit => unit.vocab).map(word => word.idn.trim().toLocaleLowerCase());
  assert.equal(new Set(terms).size, terms.length, 'new units should not duplicate each other');
  for (const term of terms) assert.ok(!previousTerms.has(term), term + ' duplicates vocabulary already in the course');
});


test('A1 time-of-day examples use complete natural expressions', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const unit11 = a1.units.find(unit => unit.id === 'a1_u11');
  assert.ok(unit11, 'Unit 11 should exist');
  const examples = unit11.vocab;
  assert.ok(examples.some(word => word.ex === 'Saya belajar pada siang hari.'));
  assert.ok(examples.some(word => word.ex === 'Saya bekerja pada sore hari.'));
  assert.ok(examples.some(word => word.ex === 'Saya tidur pada malam hari.'));
});


test('A1 unit 9 practices compound numbers from 21 to 99 without duplicate vocabulary', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const unit9 = a1.units.find(unit => unit.id === 'a1_u9');
  const unit10 = a1.units.find(unit => unit.id === 'a1_u10');
  const expected = ['Dua puluh satu', 'Dua puluh lima', 'Tiga puluh dua', 'Empat puluh tujuh', 'Lima puluh delapan', 'Enam puluh empat', 'Tujuh puluh enam', 'Delapan puluh sembilan', 'Sembilan puluh sembilan'];
  const newWords = unit9.vocab.filter(word => /^v27[1-9]$/.test(word.id));
  assert.deepEqual(Array.from(newWords, word => word.idn), expected);
  assert.equal(new Set(newWords.map(word => word.id)).size, 9);
  const oldTerms = new Set(a1.units.filter(unit => unit.id !== 'a1_u9')
    .flatMap(unit => unit.vocab).map(word => word.idn.trim().toLocaleLowerCase()));
  for (const word of newWords) {
    assert.ok(!oldTerms.has(word.idn.trim().toLocaleLowerCase()), word.idn + ' duplicates existing vocabulary');
  }
  assert.ok(unit9.exercises.length >= 14 && unit9.exercises.length <= 22);
  assert.ok(unit9.exercises.some(ex => ex.answer === 'Dua puluh lima'));
  assert.ok(unit9.exercises.some(ex => ex.correctOrder && ex.correctOrder.join(' ') === 'Empat puluh tujuh'));
  assert.ok(unit9.exercises.some(ex => ex.options && ex.options.includes('89')));
  assert.ok(unit10.exercises.length >= 14 && unit10.exercises.length <= 22);
});

test('A1 unit 10 includes complete guided purchase, price, payment, and change dialogues', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const unit10 = a1.units.find(unit => unit.id === 'a1_u10');
  const answers = unit10.exercises.filter(ex => ex.type === 'write').map(ex => ex.modelAnswer || '').join('\n');
  assert.match(answers, /Berapa harganya\?/);
  assert.match(answers, /Dua puluh satu ribu rupiah/);
  assert.match(answers, /Saya bayar sepuluh ribu rupiah/);
  assert.match(answers, /Ini kembaliannya/);
  assert.match(answers, /Tiga puluh dua ribu rupiah/);
});


test('A1 compound-number grammar explains the tens-plus-unit rule and change includes its amount', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const unit9 = a1.units.find(unit => unit.id === 'a1_u9');
  const unit10 = a1.units.find(unit => unit.id === 'a1_u10');
  assert.match(unit9.grammar, /unidad después de la decena/i);
  assert.match(unit9.grammar, /dua puluh satu = 21/i);
  const answers = unit10.exercises.filter(ex => ex.type === 'write').map(ex => ex.modelAnswer || '').join('\n');
  assert.match(answers, /Ini kembaliannya, lima ribu rupiah/);
});


test('lesson start avoids duplicating automatic drills for vocabulary already covered by authored exercises', () => {
  const start = html.indexOf('startUnit(unit, lessonIndex = 0) {');
  const end = html.indexOf('\n            exit() {', start);
  assert.ok(start >= 0 && end > start, 'startUnit method must exist');
  const method = html.slice(start, end);
  assert.match(method, /const lessons = buildUnitLessons\(unit\)/);
  assert.match(method, /this\.queue = lesson\.exercises/);
  assert.match(html, /assignedAuthoredExercises/);
  assert.match(html, /introducesFutureWord/);
});


test('A1 units 15–17 add actions, preferences, and basic questions without duplicate vocabulary', () => {
  const courseStart = html.indexOf('const CourseData =');
  const courseEnd = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', courseStart);
  const course = vm.runInNewContext('(() => {\n' + html.slice(courseStart, courseEnd) + '\nreturn CourseData;\n})()');
  const a1 = course.levels.find(level => level.id === 'A1');
  const added = [15, 16, 17].map(n => {
    const unit = a1.units.find(unit => unit.id === 'a1_u' + n);
    assert.ok(unit, 'missing unit a1_u' + n);
    assert.ok(unit.exercises.length >= 14 && unit.exercises.length <= 22);
    assert.ok(unit.exercises.some(ex => ex.type === 'write'));
    const ids = unit.vocab.map(word => word.id);
    assert.equal(new Set(ids).size, ids.length);
    const vocabIds = new Set(ids);
    for (const exercise of unit.exercises) {
      assert.ok(vocabIds.has(exercise.vocabId), unit.id + ' exercise references unknown vocabulary');
      assert.ok(['mc', 'translate_es_id', 'listen', 'order', 'write'].includes(exercise.type));
      if (exercise.type === 'mc') assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length);
      if (exercise.type === 'order') assert.deepEqual([...exercise.words].sort(), [...exercise.correctOrder].sort());
    }
    return unit;
  });
  const priorTerms = new Map();
  for (const word of a1.units.filter(unit => !added.includes(unit)).flatMap(unit => unit.vocab)) {
    const term = word.idn.trim().toLocaleLowerCase();
    if (!priorTerms.has(term)) priorTerms.set(term, new Set());
    priorTerms.get(term).add(word.id);
  }
  const addedTermIds = new Map();
  for (const word of added.flatMap(unit => unit.vocab)) {
    const term = word.idn.trim().toLocaleLowerCase();
    if (addedTermIds.has(term)) {
      assert.equal(word.id, addedTermIds.get(term), term + ' must reuse the same vocabulary ID');
    } else {
      addedTermIds.set(term, word.id);
    }
    if (priorTerms.has(term)) {
      assert.ok(priorTerms.get(term).has(word.id), term + ' must reuse its existing vocabulary ID');
    }
  }
  assert.ok(added[0].vocab.some(word => word.idn === 'Pergi'));
  assert.ok(added[1].vocab.some(word => word.idn === 'Bisa') && added[1].vocab.some(word => word.idn === 'Suka'));
  assert.ok(added[2].vocab.some(word => word.idn === 'Ada') && added[2].vocab.some(word => word.idn === 'Kapan'));
});


test('canonical vocabulary IDs remain stable across all A1 units', () => {
  const courseStart = html.indexOf('const CourseData =');
  const courseEnd = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', courseStart);
  const course = vm.runInNewContext(html.slice(courseStart, courseEnd) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const canonicalByTerm = new Map();
  for (const unit of a1.units) for (const word of unit.vocab || []) {
    const term = word.idn.trim().toLocaleLowerCase();
    if (canonicalByTerm.has(term)) {
      assert.equal(word.id, canonicalByTerm.get(term),
        unit.id + ': ' + word.idn + ' must reuse canonical ID ' + canonicalByTerm.get(term));
    } else canonicalByTerm.set(term, word.id);
  }
});

test('legacy SRS records remain linked to canonical IDs after duplicate cards are removed', async () => {
  const methodBody = extractMethodBody(html, 'async getDuplicateWordIds(wordId) {');
  const getDuplicateWordIds = vm.runInNewContext(
    '({ async getDuplicateWordIds(wordId) {' + methodBody + '\n} }).getDuplicateWordIds',
    {
      getLearningLevels: () => [{ units: [{ vocab: [{ id: 'v53', idn: 'Teman' }, { id: 'v46', idn: 'Makan' }] }] }],
      LEGACY_SRS_ID_ALIASES: { v24: 'v53', v25: 'v46' }
    }
  );
  assert.deepEqual(Array.from(await getDuplicateWordIds.call({}, 'v53')), ['v53', 'v24']);
  assert.deepEqual(Array.from(await getDuplicateWordIds.call({}, 'v46')), ['v46', 'v25']);
  for (const pair of ['v24: \'v53\'', 'v25: \'v46\'', 'v26: \'v47\'', 'v27: \'v48\'',
    'v28: \'v49\'', 'v33: \'v101\'', 'v39: \'v50\'', 'v109: \'v21\'',
    'v110: \'v22\'', 'v117: \'v30\'', 'v118: \'v31\'', 'v121: \'v36\'', 'v123: \'v44\'']) {
    assert.ok(html.includes(pair), 'missing legacy SRS alias ' + pair);
  }
  assert.match(html, /version: 1/);
  assert.match(html, /return \{ version: 3, xp: parsed\.xp/);
  const statsStart = html.indexOf('async updateSrsView() {');
  const statsEnd = html.indexOf('renderDict()', statsStart);
  const statsView = html.slice(statsStart, statsEnd);
  assert.match(statsView, /Object\.keys\(LEGACY_SRS_ID_ALIASES\)/);
  assert.match(statsView, /vocabById\.set\(legacyId, canonicalWord\)/,
    'legacy SRS states must remain visible in aggregate statistics');
  const backupIdsStart = html.indexOf('const knownIds = new Set([');
  const backupIdsEnd = html.indexOf(']);', backupIdsStart);
  assert.match(html.slice(backupIdsStart, backupIdsEnd), /Object\.keys\(LEGACY_SRS_ID_ALIASES\)/,
    'older backups must be allowed to restore historical SRS IDs');
});

test('A1 units 12–14 avoid duplicate prompts and do not reveal the terminal translation', () => {
  const courseStart = html.indexOf('const CourseData =');
  const courseEnd = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', courseStart);
  const course = vm.runInNewContext(html.slice(courseStart, courseEnd) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  for (const id of ['a1_u12', 'a1_u13', 'a1_u14']) {
    const unit = a1.units.find(candidate => candidate.id === id);
    assert.equal(new Set(unit.exercises.map(ex => ex.prompt)).size, unit.exercises.length, id + ' must not repeat prompts');
  }
  const terminal = a1.units.find(unit => unit.id === 'a1_u14').exercises.find(ex => ex.vocabId === 'v267' && ex.type === 'translate_es_id');
  assert.equal(terminal.prompt, 'Traduce al indonesio: Me bajo en la terminal.');
  assert.equal(terminal.answer, 'Saya turun di terminal.');
});

test('A1 units 15–17 avoid ambiguous Ingin gloses, punctuation errors, and regional slang', () => {
  const courseStart = html.indexOf('const CourseData =');
  const courseEnd = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', courseStart);
  const course = vm.runInNewContext(html.slice(courseStart, courseEnd) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const u15 = a1.units.find(unit => unit.id === 'a1_u15');
  const u16 = a1.units.find(unit => unit.id === 'a1_u16');
  const u17 = a1.units.find(unit => unit.id === 'a1_u17');
  assert.equal(u15.vocab.find(word => word.idn === 'Ambil').esp, 'Tomar / agarrar');
  assert.match(u15.grammar, /main y ambil son comunes en el habla coloquial/);
  assert.match(u15.grammar, /bermain y mengambil/);
  assert.equal(u15.vocab.find(word => word.idn === 'Ambil').ex, 'Saya ambil bola.');
  assert.equal(u15.vocab.find(word => word.idn === 'Ambil').exEsp, 'Agarro la pelota.');
  assert.ok(!JSON.stringify(u15).includes('coger'));
  const ingin = u16.exercises.find(ex => ex.vocabId === 'v290' && ex.type === 'mc');
  assert.equal(ingin.prompt, '¿Qué significa «Saya ingin kopi»?');
  assert.equal(ingin.options[ingin.answer], 'Quiero café');
  assert.match(ingin.explanation, /mau también puede expresar querer/);
  const text = JSON.stringify([u15, u16, u17]);
  assert.doesNotMatch(text, /Saya (?:pergi|suka teh|bisa pergi|punya kopi)\.\s*significa/);
});


test('A1 examples teach the time marker and avoid untaught vocabulary in required prompts', () => {
  const courseStart = html.indexOf('const CourseData =');
  const courseEnd = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', courseStart);
  const course = vm.runInNewContext(html.slice(courseStart, courseEnd) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const u5 = a1.units.find(unit => unit.id === 'a1_u5');
  const u11 = a1.units.find(unit => unit.id === 'a1_u11');
  const u12 = a1.units.find(unit => unit.id === 'a1_u12');
  const u13 = a1.units.find(unit => unit.id === 'a1_u13');
  assert.match(u11.grammar, /pada \+ momento \+ hari/);
  assert.equal(u11.vocab.find(word => word.idn === 'Siang').exEsp, 'Estudio durante el día.');
  assert.match(u12.desc, /frases breves/);
  assert.doesNotMatch(u12.desc, /en secuencia/);
  assert.equal(u13.vocab.find(word => word.idn === 'Angin').ex, 'Angin.');
  assert.equal(u13.vocab.find(word => word.idn === 'Payung').ex, 'Ini payung saya.');
  assert.doesNotMatch(JSON.stringify(u5), /\bpunya\b/i, 'unit 5 must not require possession grammar taught in unit 17');
  assert.doesNotMatch(JSON.stringify(u13), /\bkuat\b|\bpunya\b/i);
  const assessment = fs.readFileSync(path.join(__dirname, '..', 'assessment-engine.js'), 'utf8');
  assert.doesNotMatch(assessment, /kembaliannya/i, 'the assessment must not require an untaught change-related word');
});


test('A1 units 18–20 are present and have varied, linked practice', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const u18 = a1.units.find(item => item.id === 'a1_u18');
  assert.match(u18.grammar, /Ini también puede usarse al inicio/i);
  assert.match(u18.grammar, /Ini buku/);
  for (const id of ['a1_u18', 'a1_u19', 'a1_u20']) {
    const unit = a1.units.find(item => item.id === id);
    assert.ok(unit, id + ' should exist');
    assert.ok(unit.exercises.length >= 14 && unit.exercises.length <= 22, id + ' should have 14–22 authored exercises');
    assert.ok(unit.vocab.length >= 8, id + ' should teach at least eight vocabulary items');
    const ids = new Set(unit.vocab.map(word => word.id));
    assert.equal(ids.size, unit.vocab.length, id + ' has duplicate vocabulary IDs');
    assert.ok(new Set(unit.exercises.map(ex => ex.type)).size >= 4, id + ' should have at least four exercise types');
    assert.ok(unit.exercises.filter(ex => ex.type === 'listen').length >= 2, id + ' should include listening practice');
    assert.ok(unit.exercises.filter(ex => ex.type === 'write').length >= 2, id + ' should include guided production');
    for (const ex of unit.exercises) {
      assert.ok(ids.has(ex.vocabId), id + ' has an exercise linked to vocabulary not taught in that unit');
      if (ex.type === 'mc') assert.ok(Number.isInteger(ex.answer) && ex.answer >= 0 && ex.answer < ex.options.length);
      if (ex.type === 'order') assert.equal(JSON.stringify([...ex.words].sort()), JSON.stringify([...ex.correctOrder].sort()));
    }
  }
  const u21 = a1.units.find(item => item.id === 'a1_u21');
  const u23 = a1.units.find(item => item.id === 'a1_u23');
  assert.equal(u21.vocab.find(word => word.idn === 'Mata').exEsp, 'Me duele el ojo / me duelen los ojos.');
  assert.equal(u21.vocab.find(word => word.idn === 'Telinga').exEsp, 'Me duele la oreja / el oído.');
  assert.equal(u23.vocab.find(word => word.idn === 'Atap').esp, 'Techo / tejado');
});


test('A1 units 21–23 cover health, clothing, and home with linked varied practice', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  assert.equal(a1.units.length, 32);
  for (const id of ['a1_u21', 'a1_u22', 'a1_u23']) {
    const unit = a1.units.find(item => item.id === id);
    assert.ok(unit, id + ' should exist');
    assert.ok(unit.exercises.length >= 14 && unit.exercises.length <= 22, id + ' should have 14–22 authored exercises');
    assert.ok(unit.vocab.length >= 8, id + ' should teach at least eight vocabulary items');
    const ids = new Set(unit.vocab.map(word => word.id));
    assert.equal(ids.size, unit.vocab.length, id + ' has duplicate vocabulary IDs');
    assert.ok(new Set(unit.exercises.map(ex => ex.type)).size >= 4, id + ' should have at least four exercise types');
    assert.ok(unit.exercises.filter(ex => ex.type === 'listen').length >= 2, id + ' should include listening practice');
    assert.ok(unit.exercises.filter(ex => ex.type === 'write').length >= 2, id + ' should include guided production');
    for (const ex of unit.exercises) {
      assert.ok(ids.has(ex.vocabId), id + ' has an exercise linked to vocabulary not taught in that unit');
      if (ex.type === 'mc') assert.ok(Number.isInteger(ex.answer) && ex.answer >= 0 && ex.answer < ex.options.length);
      if (ex.type === 'order') assert.equal(JSON.stringify([...ex.words].sort()), JSON.stringify([...ex.correctOrder].sort()));
    }
  }
});


test('A1 units 24–32 extend the course to 32 units with linked beginner practice', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  assert.equal(a1.units.length, 32);
  const ids = ['a1_u24', 'a1_u25', 'a1_u26', 'a1_u27', 'a1_u28', 'a1_u29', 'a1_u30', 'a1_u31', 'a1_u32'];
  for (const id of ids) {
    const unit = a1.units.find(item => item.id === id);
    assert.ok(unit, 'missing unit ' + id);
    assert.ok(unit.vocab.length >= 8, id + ' should teach at least eight vocabulary items');
    assert.ok(unit.exercises.length >= 8, id + ' should have authored practice');
    assert.ok(unit.exercises.some(ex => ex.type === 'write'), id + ' should include guided writing');
    assert.ok(unit.exercises.some(ex => ex.type === 'listen'), id + ' should include listening practice');
    assert.ok(new Set(unit.exercises.map(ex => ex.type)).size >= 4, id + ' should include varied exercise types');
    const vocabIds = new Set(unit.vocab.map(word => word.id));
    assert.equal(vocabIds.size, unit.vocab.length, id + ' has duplicate vocabulary IDs');
    for (const ex of unit.exercises) {
      assert.ok(vocabIds.has(ex.vocabId), id + ' has an exercise linked to unknown vocabulary');
      if (ex.type === 'mc') assert.ok(Number.isInteger(ex.answer) && ex.answer >= 0 && ex.answer < ex.options.length);
      if (ex.type === 'order') assert.equal(JSON.stringify([...ex.words].sort()), JSON.stringify([...ex.correctOrder].sort()), id + ' has mismatched order tokens');
    }
  }
  assert.match(html, /0% · 0\/32 unidades/);

  const u26 = a1.units.find(unit => unit.id === 'a1_u26');
  const jalan = u26.vocab.find(word => word.id === 'v405');
  assert.equal(jalan.esp, 'Calle / camino', 'keep Jalan focused on its noun sense in this example');
  const lurus = u26.vocab.find(word => word.id === 'v408');
  assert.equal(lurus.esp, 'Recto (sin girar)');
  const depan = u26.vocab.find(word => word.id === 'v411');
  assert.equal(depan.ex, 'Toko ada di depan rumah.');
  assert.equal(depan.exEsp, 'La tienda está delante de la casa.');

  const u28 = a1.units.find(unit => unit.id === 'a1_u28');
  const stempel = u28.vocab.find(word => word.id === 'v434');
  assert.equal(stempel.ex, 'Saya perlu stempel di paspor.');
  assert.equal(stempel.exEsp, 'Necesito un sello en el pasaporte.');

  const u29 = a1.units.find(unit => unit.id === 'a1_u29');
  const rest = u29.exercises.find(ex => ex.vocabId === 'v442' && ex.type === 'write');
  assert.equal(rest.modelAnswer, 'Saya beristirahat pada sore hari.');

  const u31 = a1.units.find(unit => unit.id === 'a1_u31');
  const hair = u31.exercises.find(ex => ex.type === 'translate_es_id' && ex.prompt === 'Traduce: cabello / pelo');
  assert.equal(hair.vocabId, 'v460');
  const shortHeight = u31.vocab.find(word => word.id === 'v456');
  assert.equal(shortHeight.esp, 'Bajo/a (de estatura)');
  assert.equal(shortHeight.ex, 'Dia pendek.');
  assert.equal(shortHeight.exEsp, 'Él/ella es bajo/a.');
  const smile = u31.vocab.find(word => word.id === 'v464');
  assert.equal(smile.esp, 'Sonrisa');
  const heightWriting = u31.exercises.find(ex => ex.type === 'write' && ex.prompt === 'Escribe una frase para decir «Él/ella es alto/a».');
  assert.equal(heightWriting.vocabId, 'v455', 'the height-writing exercise must link to Tinggi, not Senyum');

  const u32 = a1.units.find(unit => unit.id === 'a1_u32');
  const thanks = u32.exercises.find(ex => ex.vocabId === 'v468' && ex.type === 'mc');
  assert.equal(thanks.options[thanks.answer], 'Sama-sama');
});



test('U24–U32 language audit tracker covers all 90 terms without falsely claiming KBBI verification', () => {
  const trackerPath = path.join(root, 'docs', 'A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv');
  const protocolPath = path.join(root, 'docs', 'LINGUISTIC_AUDIT_PROTOCOL.md');
  const editorialPath = path.join(root, 'docs', 'A1_EDITORIAL_SCREEN_U24_U32.md');
  const csv = fs.readFileSync(trackerPath, 'utf8').trim().split(/\r?\n/);
  assert.equal(csv.length, 91, 'expected one header plus 90 vocabulary rows');
  assert.match(csv[0], /vocab_id/);
  assert.match(csv[0], /KBBI_status/);
  const rows = csv.slice(1).map(line => {
    const columns = line.split('","').map(value => value.replace(/^"|"$/g, ''));
    return { id: columns[1], status: columns[8], url: columns[9], date: columns[10] };
  });
  const ids = rows.map(row => row.id);
  assert.equal(new Set(ids).size, 90, 'vocabulary IDs must be unique in the tracker');
  for (let id = 385; id <= 474; id++) assert.ok(ids.includes('v' + id), 'missing tracker ID v' + id);
  for (const row of rows) {
    assert.ok(['not_checked', 'verified_primary', 'verified_secondary', 'needs_review', 'blocked_access'].includes(row.status),
      row.id + ' must use a documented KBBI status');
    if (row.status === 'verified_primary') {
      assert.match(row.url, /^https:\/\/kbbi\.kemendikdasmen\.go\.id\/entri\//, row.id + ' needs a direct KBBI entry URL');
      assert.match(row.date, /^\d{4}-\d{2}-\d{2}$/, row.id + ' needs a KBBI check date');
    }
  }
  const verifiedPrimary = rows.filter(row => row.status === 'verified_primary').length;
  const auditText = fs.readFileSync(path.join(root, 'docs', 'A1_LANGUAGE_AUDIT_UNITS_24_32.md'), 'utf8');
  assert.match(auditText, new RegExp(verifiedPrimary + ' de los 90 términos'),
    'the audit summary must match the number of KBBI-verified tracker rows');
  assert.match(auditText, new RegExp((rows.length - verifiedPrimary) + '/90 entradas sin cotejo directo KBBI registrado'),
    'the audit summary must match the remaining unchecked tracker rows');
  assert.match(fs.readFileSync(protocolPath, 'utf8'), /KBBI VI Daring/);
  assert.match(fs.readFileSync(protocolPath, 'utf8'), /BIPA 1/);
  assert.match(fs.readFileSync(editorialPath, 'utf8'), /no certificación lingüística/);
});


test('the optional Gemini tutor clearly explains the zero-cost local path', () => {
  assert.match(html, /Para mantener el coste en \$0, deja la clave vacía/);
  assert.match(html, /el curso y sus ejercicios funcionan sin IA/);
  assert.match(html, /tus consultas se enviarán a Google/);
  assert.match(html, /no puedo garantizar que las llamadas sean siempre gratuitas/);
});


test('U25 translation prompt matches its verb-only answer and U30 teaches the clean imperative form', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const u25 = a1.units.find(unit => unit.id === 'a1_u25');
  const watching = u25.exercises.find(ex => ex.vocabId === 'v400' && ex.type === 'translate_es_id');
  assert.equal(watching.prompt, 'Traduce: ver / mirar');
  assert.equal(watching.answer, 'Menonton');
  const u30 = a1.units.find(unit => unit.id === 'a1_u30');
  const repeat = u30.vocab.find(word => word.id === 'v449');
  assert.equal(repeat.idn, 'Ulangi');
  assert.match(repeat.esp, /imperativo/i);
  const tracker = fs.readFileSync(path.join(root, 'docs/A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv'), 'utf8');
  assert.match(tracker, /\"U30\",\"v449\",\"Ulangi\",\"Repite \/ repítalo \(imperativo\)\"/);
});

test('A1 first-person listening prompts use first-person Spanish translations and preserve question intent', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + String.fromCharCode(10) + 'CourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const expected = {
    'Saya bangun pagi.': 'Me levanto por la mañana',
    'Saya naik bus.': 'Voy en autobús',
    'Saya pergi ke pasar.': 'Voy al mercado',
    'Saya bisa berenang.': 'Puedo nadar',
    'Ada bus di sini?': '¿Hay un autobús aquí?',
    'Saya sakit kepala': 'Me duele la cabeza',
    'Saya pakai kaus putih.': 'Llevo una camiseta blanca',
    'Saya di dapur.': 'Estoy en la cocina',
    'Saya membaca buku.': 'Leo un libro',
    'Saya suka berenang.': 'Me gusta nadar',
    'Saya punya reservasi.': 'Tengo una reserva'
  };
  const exercises = a1.units.flatMap(unit => unit.exercises || []);
  for (const [audioText, translation] of Object.entries(expected)) {
    const exercise = exercises.find(item => item.audioText === audioText);
    assert.ok(exercise, 'missing listening prompt: ' + audioText);
    assert.equal(exercise.options[exercise.answer], translation,
      'Spanish translation should preserve the subject and speech act for: ' + audioText);
  }
});

test('U24–U32 multiple-choice answers are semantically correct and not always in the first position', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const expected = {
    v385: 'Cafetería', v390: 'Responder', v395: 'Afición', v399: 'Pintar',
    v406: 'Izquierda', v409: 'Al otro lado', v415: 'Pasado mañana', v418: 'Visitar',
    v426: 'Pasaporte', v431: 'Maleta', v435: 'Siempre', v438: 'Rara vez',
    v445: 'Perdón', v446: 'Permisi', v455: 'Alto/a', v458: 'Joven',
    v465: '¿Qué tal?', v468: 'Sama-sama', v472: 'Por qué'
  };
  const unitIds = new Set(['a1_u24','a1_u25','a1_u26','a1_u27','a1_u28','a1_u29','a1_u30','a1_u31','a1_u32']);
  const exercises = a1.units.filter(unit => unitIds.has(unit.id)).flatMap(unit => unit.exercises.filter(ex => ex.type === 'mc'));
  assert.equal(exercises.length, 27);
  const listeningExpected = {
    'Saya membaca buku.': 'Leo un libro',
    'Saya suka berenang.': 'Me gusta nadar',
    'Belok kiri.': 'A la izquierda',
    'Ayo makan!': '¡Vamos a comer!',
    'Saya punya reservasi.': 'Tengo una reserva',
    'Saya selalu belajar.': 'Siempre estudio',
    'Tolong ulangi.': 'Por favor, repítalo',
    'Teman saya ramah.': 'Mi amigo es amable'
  };
  const positions = new Set();
  for (const ex of exercises) {
    const keyedAnswer = ex.audioText ? listeningExpected[ex.audioText] : expected[ex.vocabId];
    assert.ok(keyedAnswer, 'missing expected answer for ' + (ex.audioText || ex.vocabId));
    assert.equal(ex.options[ex.answer], keyedAnswer, 'incorrect keyed answer for ' + (ex.audioText || ex.vocabId));
    positions.add(ex.answer);
  }
  assert.ok(positions.size >= 3, 'correct answers should use all three option positions');
  assert.ok(exercises.some(ex => ex.answer !== 0), 'correct answers must not always be first');
});

test('U24–U32 curriculum structure keeps vocabulary and exercise references internally consistent', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  for (let number = 24; number <= 32; number++) {
    const unit = a1.units.find(item => item.id === 'a1_u' + number);
    assert.ok(unit, 'missing A1 unit ' + number);
    assert.equal(unit.vocab.length, 10, 'U' + number + ' should contain 10 vocabulary items');
    assert.equal(unit.exercises.length, number === 32 ? 8 : 9, 'U' + number + ' should contain the expected exercise count');
    const vocabIds = new Set(unit.vocab.map(item => item.id));
    assert.equal(vocabIds.size, 10, 'U' + number + ' vocabulary IDs must be unique');
    for (const exercise of unit.exercises) {
      assert.ok(vocabIds.has(exercise.vocabId),
        'U' + number + ' exercise must reference vocabulary in its own unit: ' + exercise.vocabId);
      if (exercise.type === 'mc') {
        assert.ok(Array.isArray(exercise.options) && exercise.options.length >= 2,
          'multiple-choice exercise needs options: ' + exercise.vocabId);
        assert.ok(Number.isInteger(exercise.answer) && exercise.answer >= 0 && exercise.answer < exercise.options.length,
          'multiple-choice answer index must be valid: ' + exercise.vocabId);
      }
      if (exercise.type === 'order') {
        assert.deepEqual([...exercise.words].sort(), [...exercise.correctOrder].sort(),
          'word-order exercise must use each supplied token exactly once: ' + exercise.vocabId);
      }
    }
  }
});
test('U24–U32 audit tracker vocabulary and examples stay synchronized with the app', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const tracker = fs.readFileSync(path.join(root, 'docs/A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv'), 'utf8').trim().split(/\r?\n/);
  const rows = tracker.slice(1).map(line => line.split('\",\"').map(value => value.replace(/^\"|\"$/g, '')));
  assert.equal(rows.length, 90);
  for (const columns of rows) {
    const [unitLabel, id, indonesian, spanish, example, exampleSpanish] = columns;
    const unitNumber = Number(unitLabel.slice(1));
    const unit = a1.units.find(item => item.id === 'a1_u' + unitNumber);
    assert.ok(unit, 'tracker references missing unit ' + unitLabel);
    const vocab = unit.vocab.find(item => item.id === id);
    assert.ok(vocab, 'tracker references missing vocabulary ' + id);
    assert.equal(vocab.idn, indonesian, id + ' Indonesian form differs from tracker');
    assert.equal(vocab.esp, spanish, id + ' Spanish gloss differs from tracker');
    assert.equal(vocab.ex, example, id + ' Indonesian example differs from tracker');
    assert.equal(vocab.exEsp, exampleSpanish, id + ' Spanish example differs from tracker');
  }
});


test('voice test explains and attempts the system fallback when no Indonesian voice is installed', () => {
  assert.match(html, /id="voiceTestStatus"/);
  assert.match(html, /Se intentará usar la voz predeterminada del sistema con el idioma id-ID/);
  assert.match(html, /testVoice\(\) \{[\s\S]*?this\.speak\("Halo! Bahasa Indonesia\."\);/);
  assert.doesNotMatch(html, /emulador genérico del navegador/);
});

test('listen-and-type exercises also offer optional pronunciation practice using the expected phrase', () => {
  const start = html.indexOf("                } else if (ex.type === 'listen') {");
  const end = html.indexOf("                } else if (ex.type === 'write') {", start);
  assert.ok(start >= 0 && end > start, 'listen exercise renderer should exist');
  const renderer = html.slice(start, end);
  assert.match(renderer, /aria-label="Practicar pronunciación"/);
  assert.match(html, /ex\.type === 'listen' \? ex\.answer/);
  const methodStart = html.indexOf('            startPronunciationPractice() {');
  const methodEnd = html.indexOf('            selectMc(idx, btn) {', methodStart);
  assert.match(pronunciationEngineSource, /normalize\(targetText\)/,
    'spoken comparison should use the listen answer when no audioText field exists');
});

test('extracted audio engine preserves adjustable playback and saved voice preferences', () => {
  assert.match(html, /id="audioPlaybackRate"/);
  assert.match(audioEngineSource, /setRate\(value, persist = true\)/);
  assert.match(audioEngineSource, /\[0\.5, 0\.7, 0\.85, 1\]\.includes\(rate\)/);
  assert.match(audioEngineSource, /DB\.set\('settings', 'audioPlaybackRate', rate\)/);
  assert.match(audioEngineSource, /utter\.rate = this\.rate/);
  assert.match(html, /DB\.get\('settings', 'audioPlaybackRate'\)/);
  assert.match(html, /value="0\.85" selected/);
});

test('tapped word-meaning popup can save the matched vocabulary item for SRS review', () => {
  assert.match(html, /id="wordMeaningSave"/);
  assert.match(html, /const saveButton = document\.getElementById\('wordMeaningSave'\)/);
  assert.match(html, /saveButton\.dataset\.vocabId = matches\[0\]\.id/);
  assert.match(html, /SRSEngine\.markForReview\(wordId\)/);
  assert.match(html, /✓ Guardada para repasar/);
});

test('tap-to-translate lookup is wired into learning text and uses safe text rendering', () => {
  assert.match(html, /id="wordMeaningPopup"/);
  assert.match(html, /function buildTapTranslationIndex\(\)/);
  assert.match(html, /function tokenAtPoint\(event\)/);
  assert.match(html, /caretRangeFromPoint/);
  assert.match(html, /window\.refreshWordTranslationIndex/);
  assert.match(html, /Toca una palabra en indonesio para consultar su significado/);
  assert.match(html, /termNode\.textContent = matches\[0\]\.idn/);
  assert.match(html, /meaningNode\.textContent = matches\.slice\(0, 3\)/);
  assert.match(html, /exampleNode\.textContent = \[/);
});


test('listening comprehension multiple-choice plays Indonesian audio without revealing the written answer', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const unit1 = a1.units.find(unit => unit.id === 'a1_u1');
  const exercise = unit1.exercises.find(item => item.audioText);
  assert.ok(exercise, 'A1 should include a listening comprehension question');
  assert.equal(exercise.audioText, 'Dia');
  assert.deepEqual(Array.from(exercise.options), ['Yo', 'Tú', 'Él / ella']);
  assert.equal(exercise.options[exercise.answer], 'Él / ella');
  assert.match(html, /if \(ex\.type === 'mc'\)/);
  assert.match(html, /if \(ex\.audioText\) AudioEngine\.speak\(ex\.audioText\)/);
  assert.match(html, /aria-label="Repetir audio"/);
});


test('A1 expands sentence-level listening comprehension across multiple units', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const expected = [
    ['a1_u2', 'Dia tidur', 'Él / ella duerme'],
    ['a1_u3', 'Nama saya Ana', 'Me llamo Ana'],
    ['a1_u4', 'Sepuluh tahun', 'Diez años']
  ];
  for (const [unitId, audioText, meaning] of expected) {
    const unit = a1.units.find(item => item.id === unitId);
    const exercise = unit.exercises.find(item => item.audioText === audioText);
    assert.ok(exercise, unitId + ' should include the sentence audio');
    assert.equal(exercise.type, 'mc');
    assert.equal(exercise.options[exercise.answer], meaning);
    assert.ok(!exercise.options.includes(audioText), 'the written Indonesian answer must not be revealed');
  }
});


test('A1 family and food units include sentence-level listening choices', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const expected = [
    ['a1_u5', 'Ini keluarga saya', 'Esta es mi familia'],
    ['a1_u5', 'Ini ayah saya', 'Este es mi padre'],
    ['a1_u6', 'Saya makan nasi', 'Como arroz'],
    ['a1_u6', 'Saya mau air', 'Quiero agua'],
    ['a1_u6', 'Saya minum air', 'Bebo agua'],
    ['a1_u6', 'Berapa harganya?', '¿Cuánto cuesta?']
  ];
  for (const [unitId, audioText, meaning] of expected) {
    const unit = a1.units.find(item => item.id === unitId);
    const exercise = unit.exercises.find(item => item.audioText === audioText);
    assert.ok(exercise, unitId + ' should include ' + audioText);
    assert.equal(exercise.type, 'mc');
    assert.equal(exercise.options[exercise.answer], meaning);
    assert.ok(!exercise.options.includes(audioText), 'the Indonesian audio text must not be shown as an option');
  }
});


test('A1 daily routines, location and numbers include listening comprehension choices', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const expected = [
    ['a1_u7', 'Saya di rumah', 'Estoy en casa'],
    ['a1_u7', 'Di mana sekolah?', '¿Dónde está la escuela?'],
    ['a1_u8', 'Saya belajar setiap hari', 'Estudio todos los días'],
    ['a1_u8', 'Hari ini saya belajar', 'Hoy estudio'],
    ['a1_u9', 'Tiga belas', '13'],
    ['a1_u9', 'Sembilan belas', '19'],
    ['a1_u9', 'Dua puluh', '20'],
    ['a1_u10', 'Rupiah', 'La moneda de Indonesia']
  ];
  for (const [unitId, audioText, meaning] of expected) {
    const unit = a1.units.find(item => item.id === unitId);
    const exercise = unit.exercises.find(item => item.audioText === audioText);
    assert.ok(exercise, unitId + ' should include ' + audioText);
    assert.equal(exercise.type, 'mc');
    assert.equal(exercise.options[exercise.answer], meaning);
    assert.ok(!exercise.options.includes(audioText), 'the Indonesian audio text must not be shown as an option');
  }
});


test('A1 greetings, location, restaurant requests and symptoms include listening choices', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const expected = [
    ['a1_u1', 'Selamat pagi', 'Buenos días'],
    ['a1_u18', 'Kamu di situ', 'Estás ahí'],
    ['a1_u19', 'Tanpa cabai, ya', 'Sin chile, por favor'],
    ['a1_u21', 'Saya sakit kepala', 'Me duele la cabeza']
  ];
  for (const [unitId, audioText, meaning] of expected) {
    const unit = a1.units.find(item => item.id === unitId);
    const exercise = unit.exercises.find(item => item.audioText === audioText);
    assert.ok(exercise, unitId + ' should include ' + audioText);
    assert.equal(exercise.type, 'mc');
    assert.equal(exercise.options[exercise.answer], meaning);
    assert.ok(!exercise.options.includes(audioText), 'the Indonesian audio text must not be shown as an option');
  }
});


test('A1 includes multi-turn listening dialogues with contextual comprehension', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const expected = [
    ['a1_u1', 'Selamat pagi. Apa kabar? Baik, terima kasih.', 'Dos personas se saludan y preguntan cómo están'],
    ['a1_u19', 'Selamat siang. Saya pesan nasi goreng. Tanpa cabai, ya? Ya, tanpa cabai.', 'Arroz frito sin chile']
  ];
  for (const [unitId, audioText, meaning] of expected) {
    const unit = a1.units.find(item => item.id === unitId);
    assert.ok(unit, unitId + ' should exist');
    const exercise = unit.exercises.find(item => item.audioText === audioText);
    assert.ok(exercise, unitId + ' should include the complete dialogue audio');
    assert.equal(exercise.type, 'mc');
    assert.equal(exercise.options[exercise.answer], meaning);
    assert.ok(!exercise.options.includes(audioText), 'dialogue transcript must not be exposed as an answer option');
  }
});

test('optional pronunciation practice is isolated and never changes learning records', () => {
  assert.match(html, /aria-label="Practicar pronunciación"/);
  assert.match(html, /El navegador puede enviar audio a su proveedor de reconocimiento/);
  assert.match(pronunciationEngineSource, /window\.SpeechRecognition \|\| window\.webkitSpeechRecognition/);
  assert.match(pronunciationEngineSource, /recognition\.lang = 'id-ID'/);
  assert.match(pronunciationEngineSource, /No se concedió permiso para usar el micrófono/);
  assert.match(pronunciationEngineSource, /no ofrece reconocimiento de voz/);
  assert.match(html, /PronunciationEngine\.start\(targetText, status, button\)/);
  assert.match(html, /PronunciationEngine\.stop\(\)/);
  assert.doesNotMatch(pronunciationEngineSource, /SRSEngine\.recordAttempt|App\.addXp|DB\.set/,
    'pronunciation comparison must not grade exercises, award XP, or persist microphone data');
});

test('audio playback speed is adjustable, validated, and persisted without changing default playback', () => {
  assert.match(html, /id="audioPlaybackRate"/);
  assert.match(audioEngineSource, /setRate\(value, persist = true\)/);
  assert.match(audioEngineSource, /\[0\.5, 0\.7, 0\.85, 1\]\.includes\(rate\)/);
  assert.match(audioEngineSource, /DB\.set\('settings', 'audioPlaybackRate', rate\)/);
  assert.match(audioEngineSource, /utter\.rate = this\.rate/);
  assert.match(html, /DB\.get\('settings', 'audioPlaybackRate'\)/);
  assert.match(html, /value="0\.85" selected/);
});

test('tapped word-meaning popup can save the matched vocabulary item for SRS review', () => {
  assert.match(html, /id="wordMeaningSave"/);
  assert.match(html, /const saveButton = document\.getElementById\('wordMeaningSave'\)/);
  assert.match(html, /saveButton\.dataset\.vocabId = matches\[0\]\.id/);
  assert.match(html, /SRSEngine\.markForReview\(wordId\)/);
  assert.match(html, /✓ Guardada para repasar/);
});

test('tap-to-translate lookup is wired into learning text and uses safe text rendering', () => {
  assert.match(html, /id="wordMeaningPopup"/);
  assert.match(html, /function buildTapTranslationIndex\(\)/);
  assert.match(html, /function tokenAtPoint\(event\)/);
  assert.match(html, /caretRangeFromPoint/);
  assert.match(html, /window\.refreshWordTranslationIndex/);
  assert.match(html, /Toca una palabra en indonesio para consultar su significado/);
  assert.match(html, /termNode\.textContent = matches\[0\]\.idn/);
  assert.match(html, /meaningNode\.textContent = matches\.slice\(0, 3\)/);
  assert.match(html, /exampleNode\.textContent = \[/);
});


test('listening comprehension multiple-choice plays Indonesian audio without revealing the written answer', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const unit1 = a1.units.find(unit => unit.id === 'a1_u1');
  const exercise = unit1.exercises.find(item => item.audioText);
  assert.ok(exercise, 'A1 should include a listening comprehension question');
  assert.equal(exercise.audioText, 'Dia');
  assert.deepEqual(Array.from(exercise.options), ['Yo', 'Tú', 'Él / ella']);
  assert.equal(exercise.options[exercise.answer], 'Él / ella');
  assert.match(html, /if \(ex\.type === 'mc'\)/);
  assert.match(html, /if \(ex\.audioText\) AudioEngine\.speak\(ex\.audioText\)/);
  assert.match(html, /aria-label="Repetir audio"/);
});


test('A1 expands sentence-level listening comprehension across multiple units', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const expected = [
    ['a1_u2', 'Dia tidur', 'Él / ella duerme'],
    ['a1_u3', 'Nama saya Ana', 'Me llamo Ana'],
    ['a1_u4', 'Sepuluh tahun', 'Diez años']
  ];
  for (const [unitId, audioText, meaning] of expected) {
    const unit = a1.units.find(item => item.id === unitId);
    const exercise = unit.exercises.find(item => item.audioText === audioText);
    assert.ok(exercise, unitId + ' should include the sentence audio');
    assert.equal(exercise.type, 'mc');
    assert.equal(exercise.options[exercise.answer], meaning);
    assert.ok(!exercise.options.includes(audioText), 'the written Indonesian answer must not be revealed');
  }
});


test('A1 family and food units include sentence-level listening choices', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const expected = [
    ['a1_u5', 'Ini keluarga saya', 'Esta es mi familia'],
    ['a1_u5', 'Ini ayah saya', 'Este es mi padre'],
    ['a1_u6', 'Saya makan nasi', 'Como arroz'],
    ['a1_u6', 'Saya mau air', 'Quiero agua'],
    ['a1_u6', 'Saya minum air', 'Bebo agua'],
    ['a1_u6', 'Berapa harganya?', '¿Cuánto cuesta?']
  ];
  for (const [unitId, audioText, meaning] of expected) {
    const unit = a1.units.find(item => item.id === unitId);
    const exercise = unit.exercises.find(item => item.audioText === audioText);
    assert.ok(exercise, unitId + ' should include ' + audioText);
    assert.equal(exercise.type, 'mc');
    assert.equal(exercise.options[exercise.answer], meaning);
    assert.ok(!exercise.options.includes(audioText), 'the Indonesian audio text must not be shown as an option');
  }
});


test('A1 daily routines, location and numbers include listening comprehension choices', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const expected = [
    ['a1_u7', 'Saya di rumah', 'Estoy en casa'],
    ['a1_u7', 'Di mana sekolah?', '¿Dónde está la escuela?'],
    ['a1_u8', 'Saya belajar setiap hari', 'Estudio todos los días'],
    ['a1_u8', 'Hari ini saya belajar', 'Hoy estudio'],
    ['a1_u9', 'Tiga belas', '13'],
    ['a1_u9', 'Sembilan belas', '19'],
    ['a1_u9', 'Dua puluh', '20'],
    ['a1_u10', 'Rupiah', 'La moneda de Indonesia']
  ];
  for (const [unitId, audioText, meaning] of expected) {
    const unit = a1.units.find(item => item.id === unitId);
    const exercise = unit.exercises.find(item => item.audioText === audioText);
    assert.ok(exercise, unitId + ' should include ' + audioText);
    assert.equal(exercise.type, 'mc');
    assert.equal(exercise.options[exercise.answer], meaning);
    assert.ok(!exercise.options.includes(audioText), 'the Indonesian audio text must not be shown as an option');
  }
});


test('A1 greetings, location, restaurant requests and symptoms include listening choices', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const expected = [
    ['a1_u1', 'Selamat pagi', 'Buenos días'],
    ['a1_u18', 'Kamu di situ', 'Estás ahí'],
    ['a1_u19', 'Tanpa cabai, ya', 'Sin chile, por favor'],
    ['a1_u21', 'Saya sakit kepala', 'Me duele la cabeza']
  ];
  for (const [unitId, audioText, meaning] of expected) {
    const unit = a1.units.find(item => item.id === unitId);
    const exercise = unit.exercises.find(item => item.audioText === audioText);
    assert.ok(exercise, unitId + ' should include ' + audioText);
    assert.equal(exercise.type, 'mc');
    assert.equal(exercise.options[exercise.answer], meaning);
    assert.ok(!exercise.options.includes(audioText), 'the Indonesian audio text must not be shown as an option');
  }
});


test('A1 includes multi-turn listening dialogues with contextual comprehension', () => {
  const start = html.indexOf('const CourseData =');
  const end = html.indexOf('/* 3. AUDIO Y AUDIO FALLBACK */', start);
  const course = vm.runInNewContext(html.slice(start, end) + '\nCourseData');
  const a1 = course.levels.find(level => level.id === 'A1');
  const expected = [
    ['a1_u1', 'Selamat pagi. Apa kabar? Baik, terima kasih.', 'Dos personas se saludan y preguntan cómo están'],
    ['a1_u19', 'Selamat siang. Saya pesan nasi goreng. Tanpa cabai, ya? Ya, tanpa cabai.', 'Arroz frito sin chile']
  ];
  for (const [unitId, audioText, meaning] of expected) {
    const unit = a1.units.find(item => item.id === unitId);
    assert.ok(unit, unitId + ' should exist');
    const exercise = unit.exercises.find(item => item.audioText === audioText);
    assert.ok(exercise, unitId + ' should include the complete dialogue audio');
    assert.equal(exercise.type, 'mc');
    assert.equal(exercise.options[exercise.answer], meaning);
    assert.ok(!exercise.options.includes(audioText), 'dialogue transcript must not be exposed as an answer option');
  }
});

test('optional pronunciation practice uses Indonesian browser recognition without changing learning records', () => {
  assert.match(html, /aria-label="Practicar pronunciación"/);
  assert.match(html, /El navegador puede enviar audio a su proveedor de reconocimiento/);
  assert.match(pronunciationEngineSource, /window\.SpeechRecognition \|\| window\.webkitSpeechRecognition/);
  assert.match(pronunciationEngineSource, /recognition\.lang = 'id-ID'/);
  assert.match(pronunciationEngineSource, /No se concedió permiso para usar el micrófono/);
  assert.match(pronunciationEngineSource, /no ofrece reconocimiento de voz/);
  assert.match(html, /PronunciationEngine\.start\(targetText, status, button\)/);
  assert.match(html, /PronunciationEngine\.stop\(\)/);
  assert.doesNotMatch(pronunciationEngineSource, /SRSEngine\.recordAttempt|App\.addXp|DB\.set/,
    'pronunciation comparison must not grade exercises, award XP, or persist microphone data');
});

const writingPracticeSource = fs.readFileSync(path.join(root, 'writing-practice.js'), 'utf8');

test('free-writing notebook offers distinct A1 compositions without persistence or scoring', () => {
  const sandbox = { window: {} };
  vm.runInNewContext(writingPracticeSource, sandbox, { filename: 'writing-practice.js' });
  const practice = sandbox.window.WritingPractice;
  assert.deepEqual(Array.from(practice.tasks, task => task.id), ['profile', 'travel', 'directions']);
  for (const task of practice.tasks) {
    assert.ok(task.situation.length > 50);
    assert.ok(task.checklist.length >= 3);
    assert.ok(task.example.length > 20);
  }
  assert.match(writingPracticeSource, /no ha sido validado por un hablante nativo/i);
  assert.match(writingPracticeSource, /setAttribute\('aria-live', 'polite'\)/);
  assert.doesNotMatch(writingPracticeSource, /DB\.set|DB\.get|localStorage|indexedDB|addXp|SRSEngine|recordAttempt|innerHTML/,
    'free-writing drafts must stay ephemeral, safely rendered, and separate from XP/SRS');
});
