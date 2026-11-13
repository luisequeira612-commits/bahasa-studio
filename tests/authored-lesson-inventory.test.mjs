import test from 'node:test';
import assert from 'node:assert/strict';
import { buildAuthoredLessonInventory, loadAuthoredLessonLevels } from '../scripts/audit-authored-lesson-inventory.mjs';

test('lesson inventory counts authored lesson arrays only and flags units outside the 5–6 standard', () => {
  const report = buildAuthoredLessonInventory([
    { id: 'A1', units: [{ id: 'a1_u1' }, { id: 'a1_u2', lessons: [{}, {}, {}, {}, {}] }] },
    { id: 'B2', units: [{ id: 'b2_u1', lessons: [{}, {}, {}, {}, {}, {}, {}] }] },
  ]);
  assert.equal(report[0].units[0].authoredLessonCount, 0);
  assert.equal(report[0].units[0].compliant, false);
  assert.equal(report[0].units[1].compliant, true);
  assert.equal(report[1].aboveMaximum.length, 1);
  assert.equal(report[1].aboveMaximum[0].id, 'b2_u1');
});

test('repository inventory baseline distinguishes authored lessons from runtime-generated reinforcement', async () => {
  const report = buildAuthoredLessonInventory(await loadAuthoredLessonLevels());
  const summary = Object.fromEntries(report.map((level) => [
    level.level,
    {
      unitCount: level.unitCount,
      authoredLessonCount: level.authoredLessonCount,
      distribution: level.distribution,
    },
  ]));

  assert.deepEqual(summary, {
    A1: { unitCount: 32, authoredLessonCount: 0, distribution: { 0: 32 } },
    A2: { unitCount: 40, authoredLessonCount: 200, distribution: { 5: 40 } },
    B1: { unitCount: 50, authoredLessonCount: 144, distribution: { 2: 12, 3: 32, 4: 6 } },
    B2: { unitCount: 5, authoredLessonCount: 25, distribution: { 5: 5 } },
  });
});
