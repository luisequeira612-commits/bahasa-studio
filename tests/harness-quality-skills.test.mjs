import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../.agents/skills/', import.meta.url);

test('Harness project skills exist with valid identity and safety boundaries', async () => {
  const entries = await readdir(root, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  assert.deepEqual(directories, [
    'curriculum-quality-audit',
    'language-review-triage',
    'quality-regression-preflight',
  ]);

  for (const name of directories) {
    const content = await readFile(join(root.pathname, name, 'SKILL.md'), 'utf8');
    assert.match(content, /^---\nname: [a-z0-9-]+\ndescription: .+\n---\n/m, name);
    assert.ok(content.includes('# '), `${name} needs a title`);
    assert.match(content, /Do not|Never|No /i, `${name} needs explicit safety boundaries`);
  }
});

test('language triage preserves unverified status and does not require KBBI', async () => {
  const content = await readFile(join(root.pathname, 'language-review-triage', 'SKILL.md'), 'utf8');
  assert.match(content, /KBBI is not a required dependency/i);
  assert.match(content, /Never change `not_reviewed`/);
  assert.match(content, /Do not modify source curriculum/);
});

test('curriculum audit is read-only and uses the existing Quality Engine', async () => {
  const content = await readFile(join(root.pathname, 'curriculum-quality-audit', 'SKILL.md'), 'utf8');
  assert.match(content, /npm run quality:local/);
  assert.match(content, /read-only audit/i);
  assert.match(content, /Never edit curriculum files/);
});
