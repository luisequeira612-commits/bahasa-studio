import test from 'node:test';
import assert from 'node:assert/strict';
import {
  assertAuthoredLessonCompliance,
  buildAuthoredLessonInventory,
  findAuthoredLessonViolations,
  loadAuthoredLessonLevels,
} from '../scripts/audit-authored-lesson-inventory.mjs';

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

test('strict gate passes only when every implemented unit has 5–6 explicit lessons', () => {
  const compliant = buildAuthoredLessonInventory([
    { id: 'A1', units: [{ id: 'a1_u1', lessons: [{}, {}, {}, {}, {}] }, { id: 'a1_u2', lessons: [{}, {}, {}, {}, {}, {}] }] },
  ]);
  assert.equal(assertAuthoredLessonCompliance(compliant), true);
  assert.deepEqual(findAuthoredLessonViolations(compliant), []);

  const nonCompliant = buildAuthoredLessonInventory([
    { id: 'B1', units: [{ id: 'b1_u1', lessons: [{}, {}] }, { id: 'b1_u2', lessons: Array(7).fill({}) }] },
  ]);
  assert.deepEqual(findAuthoredLessonViolations(nonCompliant), [
    { level: 'B1', id: 'b1_u1', count: 2, reason: 'below-minimum' },
    { level: 'B1', id: 'b1_u2', count: 7, reason: 'above-maximum' },
  ]);
  assert.throws(() => assertAuthoredLessonCompliance(nonCompliant), /2 unit\(s\) violate the explicit 5–6 authored lesson standard/);
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
    A1: { unitCount: 32, authoredLessonCount: 161, distribution: { 5: 31, 6: 1 } },
    A2: { unitCount: 40, authoredLessonCount: 200, distribution: { 5: 40 } },
    B1: { unitCount: 50, authoredLessonCount: 196, distribution: { 3: 24, 4: 6, 5: 20 } },
    B2: { unitCount: 5, authoredLessonCount: 25, distribution: { 5: 5 } },
  });
});
