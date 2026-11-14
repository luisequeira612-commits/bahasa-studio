import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const script = path.join(root, 'scripts', 'export-audio-manifest.mjs');

const normalize = (text) => text.trim().replace(/\\s+/g, ' ').toLowerCase();
const hashText = (text) => createHash('sha1').update(normalize(text), 'utf8').digest('hex').slice(0, 12);

test('audio manifest exports unique A1, A2 and inline B1 texts without changing curricula', async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'bahasa-audio-manifest-'));
  const output = path.join(temp, 'manifest.json');
  try {
    const result = spawnSync(process.execPath, [script, '--output', output], { cwd: root, encoding: 'utf8', timeout: 30000 });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const entries = JSON.parse(await readFile(output, 'utf8'));
    assert.ok(entries.length > 0);
    const ids = entries.map((entry) => entry.id);
    assert.equal(new Set(ids).size, ids.length, 'manifest IDs must be unique');
    assert.ok(entries.every((entry) => /^[a-f0-9]{12}$/.test(entry.id)));
    assert.ok(entries.some((entry) => entry.levels.includes('A1')));
    assert.ok(entries.some((entry) => entry.levels.includes('A2')));
    assert.ok(entries.some((entry) => entry.levels.includes('B1')), 'B1 must be read from index.html');

    const index = JSON.parse(await readFile(path.join(root, 'audio', 'index.json'), 'utf8'));
    assert.equal(new Set(index).size, index.length, 'audio index IDs must be unique');
    assert.deepEqual([...index].sort(), [...ids].sort(), 'index must equal the union of all manifest levels');

    const audioFiles = (await readdir(path.join(root, 'audio', 'id')))
      .filter((name) => name.endsWith('.mp3'))
      .map((name) => name.slice(0, -4));
    assert.equal(new Set(audioFiles).size, audioFiles.length, 'MP3 filenames must be unique');
    assert.deepEqual([...audioFiles].sort(), [...ids].sort(), 'every manifest ID must have one MP3 and no orphan MP3 may remain');

    const levelUnion = new Set(entries.flatMap((entry) => entry.levels.map(() => entry.id)));
    assert.equal(levelUnion.size, entries.length, 'unique manifest IDs must equal the union of level memberships');

    for (const entry of entries) {
      const normalized = normalize(entry.text);
      assert.equal(entry.normalized, normalized);
      assert.equal(entry.id, hashText(entry.text));
      assert.ok(entry.sources.length > 0);
      assert.equal(entry.text, entry.text.trim().replace(/\\s+/g, ' '), 'canonical text must have trimmed, collapsed whitespace');
      const sourceLevels = [...new Set(entry.sources.map((source) => source.level))];
      assert.deepEqual(entry.levels, sourceLevels, 'levels must preserve first-seen source order');
    }
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test('audio normalization is intentionally conservative and punctuation-sensitive', () => {
  assert.equal(normalize('  SAYA\\n  MAKAN.  '), 'saya makan.');
  assert.notEqual(normalize('Saya makan.'), normalize('Saya makan!'));
  assert.notEqual(normalize('é'), normalize('e\\u0301'), 'normalization does not apply Unicode NFC/NFD');
});

test('manifest export is deterministic, including the first-seen text variant', async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'bahasa-audio-determinism-'));
  const first = path.join(temp, 'first.json');
  const second = path.join(temp, 'second.json');
  try {
    for (const output of [first, second]) {
      const result = spawnSync(process.execPath, [script, '--output', output], { cwd: root, encoding: 'utf8', timeout: 30000 });
      assert.equal(result.status, 0, result.stderr || result.stdout);
    }
    assert.equal(await readFile(first, 'utf8'), await readFile(second, 'utf8'));
    const entries = JSON.parse(await readFile(first, 'utf8'));
    assert.ok(entries.some((entry) => entry.levels.length > 1), 'shared texts exercise first-seen canonical selection');
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});
