import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile as read, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { summarizeApiResponse } from '../scripts/kbbi-api-response.mjs';

test('audit script exposes help without dependencies', () => {
  const result = spawnSync(process.execPath, ['scripts/audit-kbbi-pending.mjs', '--help'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /--api-template/);
});

test('tracker has 56 not_checked rows and script selects only those rows', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'bahasa-audit-'));
  try {
    const output = join(temp, 'queue.json');
    const result = spawnSync(process.execPath, [
      'scripts/audit-kbbi-pending.mjs',
      '--output', output,
    ], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const queue = JSON.parse(await read(output, 'utf8'));
    assert.equal(queue.count, 56);
    assert.equal(queue.api_used, false);
    assert.ok(queue.results.every((entry) => entry.existing_status === 'not_checked'));
    assert.ok(queue.results.every((entry) => entry.reviewer_decision === 'not_reviewed'));
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test('script does not mutate the tracker', async () => {
  const before = await readFile('docs/A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv', 'utf8');
  const temp = await mkdtemp(join(tmpdir(), 'bahasa-audit-'));
  try {
    const output = join(temp, 'queue.json');
    const result = spawnSync(process.execPath, ['scripts/audit-kbbi-pending.mjs', '--output', output], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const after = await readFile('docs/A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv', 'utf8');
    assert.equal(after, before);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});


test('API summarizer extracts common fields but does not imply verification', () => {
  const summary = summarizeApiResponse(JSON.stringify({
    lemma: 'pensil',
    baseWord: 'pensil',
    definitions: ['alat tulis'],
    partOfSpeech: ['Nomina'],
    variants: ['pensil'],
    nonStandardWords: ['pencil'],
    compoundWords: ['pensil warna'],
    derivedWords: ['memensilkan'],
  }));
  assert.equal(summary.api_json_valid, true);
  assert.equal(summary.api_lemma, 'pensil');
  assert.equal(summary.api_base_word, 'pensil');
  assert.deepEqual(summary.api_definitions, ['alat tulis']);
  assert.deepEqual(summary.api_part_of_speech, ['Nomina']);
  assert.deepEqual(summary.api_variants, ['pensil']);
  assert.deepEqual(summary.api_non_standard_words, ['pencil']);
  assert.deepEqual(summary.api_compound_words, ['pensil warna']);
  assert.deepEqual(summary.api_derived_words, ['memensilkan']);
  assert.ok(summary.api_top_level_keys.includes('variants'));
  assert.equal(Object.hasOwn(summary, 'verified_primary'), false);
});

test('API summarizer keeps malformed and unfamiliar JSON conservative', () => {
  const malformed = summarizeApiResponse('{bad json');
  assert.equal(malformed.api_json_valid, false);
  assert.deepEqual(malformed.api_definitions, []);
  assert.deepEqual(malformed.api_variants, []);
  const unfamiliar = summarizeApiResponse(JSON.stringify({ payload: { definition: 'nested' } }));
  assert.equal(unfamiliar.api_json_valid, true);
  assert.deepEqual(unfamiliar.api_definitions, []);
  assert.ok(unfamiliar.api_top_level_keys.includes('payload'));
});
