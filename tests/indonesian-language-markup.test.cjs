const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('mantiene el idioma principal de la interfaz en español', () => {
    assert.match(html, /<html lang="es">/);
});

test('las tarjetas de lección usan el adaptador común y el locale objetivo', () => {
    const start = html.indexOf('const wordCard = v => {', html.indexOf('renderIntro()'));
    const end = html.indexOf("document.getElementById('exerciseArea').innerHTML", start);
    const renderer = html.slice(start, end);

    assert.ok(start >= 0, 'el renderizador de vocabulario está definido');
    assert.match(renderer, /CurriculumLoader\.adaptVocabulary\(v, language\)/);
    const introStart = html.lastIndexOf('const language = LanguageManager.getActiveLanguage();', start);
    const introSetup = html.slice(introStart, start);
    assert.ok(introStart >= 0, 'lesson intro resolves the active language before rendering');
    assert.match(introSetup, /LanguageManager\.getLocale\(language\)/);
    assert.match(renderer, /word\.example/);
    assert.match(renderer, /lang="\$\{App\.escapeHtml\(locale\)\}"/);
    assert.doesNotMatch(renderer, /v\.idn|lang="id"/);
});

test('el diccionario usa vocabulario y locale neutrales del curso activo', () => {
    const start = html.indexOf('renderDict() {');
    const end = html.indexOf('filterDict() {', start);
    const renderer = html.slice(start, end);
    assert.match(renderer, /const language = LanguageManager\.getActiveLanguage\(\)/);
    assert.match(renderer, /const locale = LanguageManager\.getLocale\(language\)/);
    assert.match(renderer, /CurriculumLoader\.adaptVocabulary\(rawWord, language\)/);
    assert.match(renderer, /word\.text/);
    assert.match(renderer, /word\.translation/);
    assert.match(renderer, /word\.example/);
    assert.match(renderer, /AudioEngine\.speak\(this\.dataset\.word\)/);
    assert.doesNotMatch(renderer, /v\.idn|v\.esp|lang="id"/);
    assert.match(html, /class="word-chip" lang="\$\{App\.escapeHtml\(ex\.targetLocale \|\| 'und'\)\}" data-word=/);
    assert.match(html, /chip\.lang = this\.queue\[this\.stepIndex\]\?\.targetLocale/);
});

test('el matching usa el locale activo y pares con campos neutrales', () => {
    assert.match(html, /CurriculumLoader\.adaptMatchingPairs\(/);
    assert.match(html, /class="match-option-btn" lang="\$\{App\.escapeHtml\(ex\.targetLocale \|\| 'und'\)\}" data-side="target"/);
    assert.match(html, /data-side="esp"/);
    assert.match(html, /selectMatch\('target'/);
    assert.doesNotMatch(html, /match-option-btn[^\n]*lang="id"|data-side="idn"/);
});

test('la frase interactiva aplica el locale y el audio del curso activo', () => {
    assert.match(html, /sourceLocale = language === 'es' \? 'es' : LanguageManager\.getLocale\(activeLanguage\)/);
    const start = html.indexOf('const speaker = language !==');
    const end = html.indexOf('return \'<div class="tap-translation-sentence">', start);
    const speaker = html.slice(start, end);
    assert.ok(start >= 0);
    assert.match(speaker, /language !== 'es'/);
    assert.doesNotMatch(speaker, /activeLanguage === 'id'/);
});

test('marca el ejemplo modelo y el término emergente con locale dinámico', () => {
    assert.match(html, /<p lang="\$\{App\.escapeHtml\(ex\.answerLocale \|\| ex\.targetLocale \|\| 'und'\)\}" style="white-space:pre-wrap;">\$\{App\.escapeHtml\(ex\.modelAnswer/);
    assert.match(html, /writingLanguage = ex\.answerLocale \|\| ex\.targetLocale \|\| 'und'/);
    assert.match(html, /termNode\.lang = matches\[0\]\.locale/);
    assert.match(html, /original\.lang = example\.locale/);
});


test('los ejercicios textuales y de orden usan el locale del idioma activo', () => {
    const indexSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    const queueStart = indexSource.indexOf('this.queue = lesson.exercises.map');
    const queueEnd = indexSource.indexOf('const matchingWords =', queueStart);
    const queueSetup = indexSource.slice(queueStart, queueEnd);
    const pickStart = indexSource.indexOf('pickWord(word, el) {', queueEnd);
    const pickEnd = indexSource.indexOf('selectMatch(side, index, button)', pickStart);
    const picker = indexSource.slice(pickStart, pickEnd);

    assert.match(queueSetup, /CurriculumLoader\.adaptExercise\(prepared, LanguageManager\.getActiveLanguage\(\)\)/);
    assert.match(indexSource, /ex\.answerLocale \|\| ex\.targetLocale \|\| 'und'/);
    assert.match(indexSource, /lang="\$\{App\.escapeHtml\(ex\.targetLocale \|\| 'und'\)\}"/);
    assert.match(picker, /chip\.lang = this\.queue\[this\.stepIndex\]/);
});


test('la burbuja de traducción usa la vista neutral del vocabulario activo', () => {
    const start = html.indexOf('function translationCandidates(sourceLanguage)');
    const end = html.indexOf('window.parseTapTranslationPrompt', start);
    const candidates = html.slice(start, end);
    assert.ok(start >= 0, 'translation candidates are defined');
    assert.match(html, /CurriculumLoader\.adaptVocabulary\(word, language\)/);
    assert.match(candidates, /word\.text/);
    assert.match(candidates, /word\.translation/);
    assert.doesNotMatch(candidates, /word\.idn|word\.esp/);
    assert.match(candidates, /activeLanguage === 'id'/);
});

test('el popup de significado usa texto, traducción y ejemplos con locale dinámico', () => {
    const start = html.indexOf('function buildTapTranslationIndex()');
    const end = html.indexOf('function tokenAtPoint(event)', start);
    const indexBuilder = html.slice(start, end);
    assert.match(indexBuilder, /word\.text/);
    assert.match(indexBuilder, /word\.translation/);
    assert.match(indexBuilder, /normalizeTapWord\(word && word\.text, locale\)/);
    assert.doesNotMatch(indexBuilder, /word\.idn|word\.esp|lang = 'id'/);
    assert.match(html, /termNode\.lang = matches\[0\]\.locale/);
    assert.match(html, /original\.lang = example\.locale/);
});

test('la ayuda de Palabras nuevas y los ajustes de audio no nombran indonesio de forma fija', () => {
    assert.match(html, /const languageName = \(LanguageManager\.getLanguage\(language\) \|\| \{\}\)\.name/);
    assert.match(html, /Toca una palabra para consultar su significado sin salir de la lección/);
    assert.match(html, /<h3>Audio del curso<\/h3>/);
    assert.match(html, /aria-label="Voz del idioma activo"/);
    assert.match(html, /Buscar en el idioma del curso o en español/);
    assert.doesNotMatch(html, /Audio en indonesio|Buscar indonesio o español|Toca una palabra en indonesio/);
});

test('el tutor API usa el idioma activo y el modo local no muestra reglas indonesias en portugués', () => {
    assert.match(html, /Tutor conciso de \$\{STUDY_LANGUAGE_LABEL\} en español/);
    assert.match(html, /activeLanguage !== 'id'/);
    assert.match(html, /El modo local todavía no tiene explicaciones específicas para/);
    assert.match(html, /La generación de lecciones personalizadas aún no está adaptada al curso de/);
});

test('el encabezado, SRS y generador no presuponen indonesio cuando cambia el curso', () => {
    assert.doesNotMatch(html, /Cambiar idioma de estudio\. Indonesio actual|studyLanguageCurrentName">Indonesio|Indonesio → español/);
    assert.match(html, /Cambiar idioma de estudio\. ' \+ active\.name \+ ' actual/);
    assert.match(html, /current\.direction = reverse \? 'es-' \+ activeCode : activeCode \+ '-es'/);
    assert.match(html, /if \(!reverse\) AudioEngine\.speak\(current\.vocab\.text\)/);
    assert.match(html, /if \(LanguageManager\.getActiveLanguage\(\) !== 'id'\)/);
    assert.match(html, /El generador de lecciones aún no está adaptado al curso activo/);
});
