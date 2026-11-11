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
    else if (char === '\n') {
      row.push(field.replace(/\r$/, ''));
      if (row.some(value => value !== '')) rows.push(row);
      row = [];
      field = '';
    } else field += char;
  }
  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ''));
    if (row.some(value => value !== '')) rows.push(row);
  }
  const headers = rows.shift() ?? [];
  return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

test('A1 language audit trackers mirror every current vocabulary occurrence without claiming linguistic review', () => {
  const root = path.join(__dirname, '..');
  const source = fs.readFileSync(path.join(root, 'curriculum-a1.js'), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: 'curriculum-a1.js', timeout: 10000 });
  const curriculum = sandbox.window.BAHASA_CURRICULUM_A1;
  assert.ok(Array.isArray(curriculum?.units), 'A1 curriculum units must be available');

  const trackerFiles = [
    { path: 'docs/A1_VOCABULARY_AUDIT_TRACKER_U1_U23.csv', min: 1, max: 23 },
    { path: 'docs/A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv', min: 24, max: 32 },
  ];
  const rows = [];
  for (const file of trackerFiles) {
    const parsed = parseCsv(fs.readFileSync(path.join(root, file.path), 'utf8'));
    assert.ok(parsed.length > 0, file.path + ' must contain tracker rows');
    for (const row of parsed) {
      const unitNumber = Number(String(row.unit ?? '').replace(/^U/i, ''));
      assert.ok(Number.isInteger(unitNumber) && unitNumber >= file.min && unitNumber <= file.max,
        file.path + ' contains a unit outside its declared range: ' + row.unit);
      rows.push(row);
    }
  }

  const expected = [];
  for (const unit of curriculum.units) {
    const match = /^a1_u(\d+)$/i.exec(String(unit.id ?? ''));
    assert.ok(match, 'Unexpected A1 unit ID: ' + unit.id);
    const unitNumber = Number(match[1]);
    for (const word of unit.vocab ?? []) {
      expected.push({
        unit: 'U' + unitNumber,
        vocab_id: String(word.id ?? ''),
        indonesian_form: String(word.idn ?? ''),
        spanish_gloss: String(word.esp ?? ''),
        example_indonesian: String(word.ex ?? ''),
        example_spanish: String(word.exEsp ?? ''),
      });
    }
  }

  assert.equal(curriculum.units.length, 32, 'A1 should contain all 32 units');
  assert.equal(rows.length, expected.length, 'Tracker row count must match every A1 vocabulary occurrence');

  const byKey = new Map();
  for (const row of rows) {
    const key = row.unit + ':' + row.vocab_id;
    assert.ok(!byKey.has(key), 'Duplicate tracker row: ' + key);
    byKey.set(key, row);
  }
  assert.equal(byKey.size, expected.length, 'Every unit/ID occurrence must have one tracker row');

  for (const word of expected) {
    const key = word.unit + ':' + word.vocab_id;
    const row = byKey.get(key);
    assert.ok(row, 'Missing A1 audit row for ' + key);
    for (const field of ['indonesian_form', 'spanish_gloss', 'example_indonesian', 'example_spanish']) {
      assert.equal(row[field], word[field], key + ' tracker field ' + field + ' must match curriculum-a1.js');
    }
    for (const field of ['grammar_naturalness_review', 'level_fit_review', 'accepted_answers_review']) {
      assert.equal(row[field], 'not_checked', key + ' must not imply completed linguistic review in ' + field);
    }
  }
});
