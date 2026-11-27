import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import vm from 'node:vm';

const MANIFEST_PATH = 'languages/en/curriculum/b1/index.js';

function evaluate(source, sandbox, filename) {
  vm.runInNewContext(source, sandbox, { filename, timeout: 5000 });
}

export function loadEnglishB1CurriculumFromSources({ manifestSource, blockSources }) {
  const sandbox = {};
  sandbox.window = sandbox;
  evaluate(manifestSource, sandbox, MANIFEST_PATH);
  const manifest = sandbox.GUARDI_CURRICULUM_MANIFESTS?.en?.B1;
  if (!manifest || manifest.language !== 'en' || !Array.isArray(manifest.blocks)) {
    throw new Error('Invalid American English B1 manifest.');
  }
  if (manifest.totalUnits !== 52 || manifest.publishedUnits?.length !== 52) {
    throw new Error('Expected the approved 52-unit English B1 manifest.');
  }

  const units = [];
  for (const block of manifest.blocks) {
    const source = blockSources[block.path];
    if (typeof source !== 'string') throw new Error('Missing English B1 block source: ' + block.path);
    evaluate(source, sandbox, block.path);
    const loaded = sandbox.GUARDI_CURRICULUM_BLOCKS?.en?.B1?.[block.id]?.units;
    if (!Array.isArray(loaded) || loaded.length !== block.units.length) {
      throw new Error('Invalid English B1 block: ' + block.id);
    }
    const expected = new Set(block.units);
    for (const unit of loaded) {
      if (!expected.has(unit.unitNumber) || unit.id !== 'en_b1_u' + unit.unitNumber) {
        throw new Error('Unexpected unit identity in English B1 block ' + block.id);
      }
      units.push(unit);
    }
  }

  units.sort((a, b) => a.unitNumber - b.unitNumber);
  const numbers = units.map((unit) => unit.unitNumber);
  if (units.length !== 52 || new Set(numbers).size !== 52 ||
      numbers.some((number, index) => number !== index + 1)) {
    throw new Error('English B1 source blocks do not provide exactly U1–U52.');
  }
  return {
    id: 'B1',
    language: 'en',
    title: manifest.title,
    totalUnits: manifest.totalUnits,
    units,
  };
}

export async function loadEnglishB1Curriculum(root) {
  const manifestSource = await readFile(resolve(root, MANIFEST_PATH), 'utf8');
  const manifestSandbox = {};
  manifestSandbox.window = manifestSandbox;
  evaluate(manifestSource, manifestSandbox, MANIFEST_PATH);
  const manifest = manifestSandbox.GUARDI_CURRICULUM_MANIFESTS?.en?.B1;
  if (!manifest || !Array.isArray(manifest.blocks)) throw new Error('Invalid English B1 manifest.');
  const entries = await Promise.all(manifest.blocks.map(async (block) => [
    block.path,
    await readFile(resolve(root, block.path.replace(/^\.\//, '')), 'utf8'),
  ]));
  return loadEnglishB1CurriculumFromSources({
    manifestSource,
    blockSources: Object.fromEntries(entries),
  });
}
