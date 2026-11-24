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
    assert.match(renderer, /LanguageManager\.getLocale\(language\)/);
    assert.match(renderer, /word\.example/);
    assert.match(renderer, /lang="\$\{App\.escapeHtml\(locale\)\}"/);
    assert.doesNotMatch(renderer, /v\.idn|lang="id"/);
});

test('marca las fichas del diccionario y los bancos de ordenación', () => {
    assert.match(html, /<strong lang="id">\$\{App\.escapeHtml\(v\.idn\)\}<\/strong>/);
    assert.match(html, /class="word-chip" lang="id" data-word=/);
    assert.match(html, /chip\.lang = 'id'/);
});

test('marca las opciones indonesias de emparejamiento', () => {
    assert.match(html, /class="match-option-btn" lang="id" data-side="idn"/);
});

test('la frase interactiva solo recibe lang=id cuando su idioma es indonesio', () => {
    assert.match(html, /language === 'idn' \? ' lang="id"'/);
});

test('marca el ejemplo modelo y el término emergente como indonesios', () => {
    assert.match(html, /<p lang="\$\{ex\.answerLanguage === 'es' \? 'es' : 'id'\}" style="white-space:pre-wrap;">\$\{App\.escapeHtml\(ex\.modelAnswer/);
    assert.match(html, /writingLanguage = ex\.answerLanguage === 'es' \? 'es' : 'id'/);
    assert.match(html, /termNode\.lang = 'id'/);
    assert.match(html, /original\.lang = 'id'/);
});
