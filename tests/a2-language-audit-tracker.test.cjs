'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"' && field === '') quoted = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (char !== '\r') field += char;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function extractObjectLiteral(source, marker) {
  const markerIndex = source.indexOf(marker);
  assert.ok(markerIndex >= 0, 'CourseData declaration must exist');
  const start = source.indexOf('{', markerIndex);
  let depth = 0, quote = null, escaped = false;
  for (let i = start; i < source.length; i++) {
    const char = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"' || char.charCodeAt(0) === 96) quote = char;
    else if (char === '{') depth++;
    else if (char === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  assert.fail('CourseData object must have balanced braces');
}

test('A2 language tracker covers all current vocabulary without claiming verification', () => {
  const root = path.join(__dirname, '..');
  const a1Source = fs.readFileSync(path.join(root, 'curriculum-a1.js'), 'utf8');
  const a2Source = fs.readFileSync(path.join(root, 'curriculum-a2.js'), 'utf8');
  const a1Literal = a1Source.slice(a1Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
  const a2Literal = a2Source.slice(a2Source.indexOf(' = ') + 3).trim().replace(/;$/, '');
  const htmlSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const courseDataStart = htmlSource.indexOf('const CourseData =');
  const html = htmlSource.slice(0, courseDataStart) + htmlSource.slice(courseDataStart)
    .replace('window.BAHASA_CURRICULUM_A1', a1Literal)
    .replace('window.BAHASA_CURRICULUM_A2', a2Literal);
  const course = vm.runInNewContext('(' + extractObjectLiteral(html, 'const CourseData =') + ')');
  const a2 = course.levels.find(level => level.id === 'A2');
  const expected = a2.units.flatMap(unit => unit.vocab.map(word => ({
    unit: unit.id, id: word.id, idn: word.idn, esp: word.esp, ex: word.ex, exEsp: word.exEsp,
  })));
  const parsed = parseCsv(fs.readFileSync(path.join(root, 'docs/A2_LANGUAGE_AUDIT_TRACKER_ALL_UNITS.csv'), 'utf8'));
  const [headers, ...rows] = parsed;
  const index = Object.fromEntries(headers.map((header, i) => [header, i]));
  assert.equal(rows.length, expected.length);
  assert.equal(expected.length, 492);
  assert.equal(new Set(rows.map(row => row[index.vocab_id])).size, expected.length);
  const byId = new Map(rows.map(row => [row[index.vocab_id], row]));
  for (const word of expected) {
    const row = byId.get(word.id);
    assert.ok(row, 'Missing audit row for ' + word.id);
    assert.equal(row[index.unit], word.unit);
    assert.equal(row[index.indonesian_form], word.idn);
    assert.equal(row[index.spanish_gloss], word.esp);
    assert.equal(row[index.example_indonesian], word.ex);
    assert.equal(row[index.example_spanish], word.exEsp);
    assert.equal(row[index.KBBI_status], ['a2u1_minggu', 'a2u1_bulan'].includes(word.id) ? 'verified_primary' : 'not_checked');
    assert.equal(row[index.grammar_naturalness_review], 'not_checked');
    assert.equal(row[index.level_fit_review], 'not_checked');
    assert.equal(row[index.accepted_answers_review], 'not_checked');
    assert.equal(row[index.KBBI_entry_url], word.id === 'a2u1_minggu' ? 'https://kbbi.kemendikdasmen.go.id/entri/minggu' : word.id === 'a2u1_bulan' ? 'https://kbbi.kemendikdasmen.go.id/entri/bulan' : '');
    assert.equal(row[index.KBBI_checked_date], ['a2u1_minggu', 'a2u1_bulan'].includes(word.id) ? '2026-10-30' : '');
  }
  assert.ok(rows.every(row => row[index.BIPA_reference_url] === 'https://repositori.kemendikdasmen.go.id/19082/'));
  assert.equal(rows.filter(row => row[index.KBBI_status] === 'verified_primary').length, 2);
});

test('A2 audit plan clearly separates structural checks from linguistic validation', () => {
  const plan = fs.readFileSync(path.join(__dirname, '..', 'docs/A2_LANGUAGE_AUDIT_PLAN.md'), 'utf8');
  assert.match(plan, /492 entradas/);
  assert.match(plan, /No se consultaron individualmente las 492 entradas de KBBI/);
  assert.match(plan, /No se verificaron ejemplos con corpus ni con hablantes nativos/);
  assert.match(plan, /not_checked/);
});
