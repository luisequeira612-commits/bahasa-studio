import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const script = path.join(root, 'scripts', 'export-audio-manifest.mjs');

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
    for (const entry of entries) {
      const normalized = entry.text.trim().replace(/\s+/g, ' ').toLowerCase();
      const expected = createHash('sha1').update(normalized, 'utf8').digest('hex').slice(0, 12);
      assert.equal(entry.id, expected);
      assert.ok(entry.sources.length > 0);
    }
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});
