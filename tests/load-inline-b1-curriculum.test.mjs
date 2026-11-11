import test from 'node:test';
import assert from 'node:assert/strict';
import { loadInlineB1Curriculum } from '../scripts/load-inline-b1-curriculum.mjs';

test('extracts B1 from the inline CourseData block without evaluating the app', () => {
  const indexSource = `
    const CourseData = {
      levels: [
        window.BAHASA_CURRICULUM_A1,
        window.BAHASA_CURRICULUM_A2,
        { id: 'B1', units: [{ id: 'b1_u1', vocab: [], lessons: [] }] }
      ]
    };
    /* 3. AUDIO Y AUDIO FALLBACK */
  `;
  const a1 = { id: 'A1', units: [{ id: 'a1_u1', vocab: [] }] };
  const a2 = { id: 'A2', units: [{ id: 'a2_u1', vocab: [] }] };
  const b1 = loadInlineB1Curriculum(indexSource, a1, a2);
  assert.equal(b1.id, 'B1');
  assert.deepEqual(b1.units.map((unit) => unit.id), ['b1_u1']);
});

test('rejects missing CourseData boundaries or invalid earlier curricula', () => {
  assert.throws(() => loadInlineB1Curriculum('const CourseData = {};', { units: [] }, { units: [] }), /CourseData block/);
  assert.throws(() => loadInlineB1Curriculum('const CourseData = {}; /* 3. AUDIO Y AUDIO FALLBACK */', null, { units: [] }), /requires valid A1 and A2/);
});

import fs from 'node:fs';

test('B1 U27-U49 provide five lessons with five exercise types after active-recall expansion', () => {
  const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const start = html.indexOf("id: 'b1_u27'");
  const end = html.indexOf("id: 'b1_u50'", start);
  assert.ok(start >= 0 && end > start, 'B1 U27-U49 block must exist');
  const source = html.slice(start, end);
  const unitMatches = [...source.matchAll(/id: 'b1_u(2[7-9]|[34]\\d)'/g)];
  assert.equal(unitMatches.length, 23);
  for (const match of unitMatches) {
    const unitStart = match.index;
    const next = source.indexOf("id: 'b1_u", unitStart + match[0].length);
    const unit = source.slice(unitStart, next < 0 ? source.length : next);
    assert.equal((unit.match(/objective\s*:/g) || []).length, 5, 'U' + match[1] + ' must have five lessons');
    for (const type of ['mc', 'translate_es_id', 'order', 'listen', 'write']) {
      assert.ok((unit.match(new RegExp('type: [\\\"\\\']' + type + '[\\\"\\\']', 'g')) || []).length >= 1, 'U' + match[1] + ' must retain ' + type);
    }
  }
});
