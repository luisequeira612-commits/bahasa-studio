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
