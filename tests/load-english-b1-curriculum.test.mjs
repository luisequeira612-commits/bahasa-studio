import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { loadEnglishB1Curriculum, loadEnglishB1CurriculumFromSources } from '../scripts/load-english-b1-curriculum.mjs';
import { buildB1ReviewPacket as buildU1U12 } from '../scripts/build-b1-u1-u12-review-packet.mjs';
import { buildB1ReviewPacket as buildU13U26 } from '../scripts/build-b1-u13-u26-review-packet.mjs';
import { buildB1ReviewPacket as buildU27U50 } from '../scripts/build-b1-u27-u50-review-packet.mjs';

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

test('all review packet builders select the matching American English source ranges', async () => {
  const curriculum = await loadEnglishB1Curriculum(resolve(process.cwd()));
  const ranges = [
    { build: buildU1U12, first: 1, last: 12, units: 12, vocabulary: 242 },
    { build: buildU13U26, first: 13, last: 26, units: 14, vocabulary: 286 },
    { build: buildU27U50, first: 27, last: 50, units: 24, vocabulary: 462 },
  ];
  for (const range of ranges) {
    const packet = range.build({ curriculum, prompt: 'Review American English.' });
    assert.equal(packet.coverage.units, range.units);
    assert.equal(packet.coverage.vocabulary_entries, range.vocabulary);
    assert.match(packet.markdown, new RegExp('en_b1_u' + String(range.first).padStart(2, '0')));
    assert.match(packet.markdown, /target/);
    assert.doesNotMatch(packet.markdown, /Dibaca|peN-|KBBI|material de indonesio/);
  }
});
