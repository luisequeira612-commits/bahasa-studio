import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadEnglishB1Curriculum, loadEnglishB1CurriculumFromSources } from '../scripts/load-english-b1-curriculum.mjs';

test('loads the actual American English B1 curriculum from all 13 manifest blocks', async () => {
  const curriculum = await loadEnglishB1Curriculum(resolve(process.cwd()));
  assert.equal(curriculum.language, 'en');
  assert.equal(curriculum.totalUnits, 52);
  assert.equal(curriculum.units.length, 52);
  assert.deepEqual(curriculum.units.map((unit) => unit.unitNumber), Array.from({ length: 52 }, (_, i) => i + 1));
  assert.ok(curriculum.units.every((unit) => unit.id.startsWith('en_b1_u')));
  assert.ok(curriculum.units.every((unit) => unit.vocab.every((word) => typeof word.target === 'string' && typeof word.esp === 'string')));
});

test('rejects a non-English legacy B1 curriculum source', () => {
  const manifestSource = "window.GUARDI_CURRICULUM_MANIFESTS={en:{B1:{language:'id',totalUnits:52,publishedUnits:Array(52).fill(1),blocks:[]}}};";
  assert.throws(() => loadEnglishB1CurriculumFromSources({ manifestSource, blockSources: {} }), /Invalid American English B1 manifest/);
});
