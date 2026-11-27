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
const normalize = (text) => text.trim().replace(/\s+/g, ' ').toLowerCase();
const hashText = (text) => createHash('sha1').update(normalize(text), 'utf8').digest('hex').slice(0, 12);

test('audio manifest exports unique A1, A2 and inline B1 texts without changing curricula', async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'bahasa-audio-manifest-'));
  const output = path.join(temp, 'manifest.json');
  try {
    const index = JSON.parse(await readFile(path.join(root, 'audio', 'index.json'), 'utf8'));
    const baseResult = spawnSync(process.execPath, [script, '--output', output], { cwd: root, encoding: 'utf8', timeout: 30000 });
    assert.equal(baseResult.status, 0, baseResult.stderr || baseResult.stdout);
    const baseEntries = JSON.parse(await readFile(output, 'utf8'));
    const baseIds = new Set(baseEntries.map((entry) => entry.id));
    // The committed library index tells us whether this branch contains the optional
    // interactive audio expansion. Main may still have the base library while a
    // generated-audio PR intentionally carries the expanded manifest.
    const b2Output = path.join(temp, 'b2.json');
    const b2Result = spawnSync(process.execPath, [script, '--include-b2', '--output', b2Output], {
      cwd: root, encoding: 'utf8', timeout: 30000
    });
    assert.equal(b2Result.status, 0, b2Result.stderr || b2Result.stdout);
    const b2Ids = new Set(JSON.parse(await readFile(b2Output, 'utf8')).map((entry) => entry.id));
    const b2OnlyIds = [...b2Ids].filter((id) => !baseIds.has(id));
    const includeB2 = process.env.AUDIO_MANIFEST_INCLUDE_B2 === '1'
      || (b2OnlyIds.length > 0 && b2OnlyIds.every((id) => index.includes(id)));
    let selectedIds = baseIds;
    if (includeB2) {
      const result = spawnSync(process.execPath, [script, '--include-b2', '--output', output], {
        cwd: root, encoding: 'utf8', timeout: 30000
      });
      assert.equal(result.status, 0, result.stderr || result.stdout);
      selectedIds = new Set(JSON.parse(await readFile(output, 'utf8')).map((entry) => entry.id));
    }
    // Interactive playback clips are an explicit optional export, not inferred
    // from unrelated legacy IDs in the committed curriculum audio index.
    const includeInteractive = process.env.AUDIO_MANIFEST_INCLUDE_INTERACTIVE === '1';
    if (includeInteractive) {
      const args = [script];
      if (includeB2) args.push('--include-b2');
      args.push('--include-interactive', '--output', output);
      const result = spawnSync(process.execPath, args, { cwd: root, encoding: 'utf8', timeout: 30000 });
      assert.equal(result.status, 0, result.stderr || result.stdout);
    }
    const entries = JSON.parse(await readFile(output, 'utf8'));
    assert.ok(entries.length > 0);
    const ids = entries.map((entry) => entry.id);
    assert.equal(new Set(ids).size, ids.length, 'manifest IDs must be unique');
    assert.ok(entries.every((entry) => /^[a-f0-9]{12}$/.test(entry.id)));
    assert.ok(entries.some((entry) => entry.levels.includes('A1')));
    assert.ok(entries.some((entry) => entry.levels.includes('A2')));
    assert.ok(entries.some((entry) => entry.levels.includes('B1')), 'B1 must be read from index.html');

    assert.equal(new Set(index).size, index.length, 'audio index IDs must be unique');
    if (includeInteractive) {
      assert.deepEqual([...index].sort(), [...ids].sort(), 'interactive export must equal the complete audio index');
    } else {
      assert.ok(ids.every((id) => index.includes(id)), 'every exported manifest ID must exist in the committed audio index');
    }

    const audioFiles = (await readdir(path.join(root, 'audio', 'id')))
      .filter((name) => name.endsWith('.mp3'))
      .map((name) => name.slice(0, -4));
    assert.equal(new Set(audioFiles).size, audioFiles.length, 'MP3 filenames must be unique');
    assert.deepEqual([...audioFiles].sort(), [...index].sort(), 'every indexed audio ID must have one MP3 and no orphan MP3 may remain');

    const levelUnion = new Set(entries.flatMap((entry) => entry.levels.map(() => entry.id)));
    assert.equal(levelUnion.size, entries.length, 'unique manifest IDs must equal the union of level memberships');

    for (const entry of entries) {
      assert.equal(entry.normalized, normalize(entry.text));
      assert.equal(entry.id, hashText(entry.text));
      assert.ok(entry.sources.length > 0);
      assert.equal(entry.text, entry.text.trim().replace(/\s+/g, ' '), 'canonical text must have trimmed, collapsed whitespace');
      const sourceLevels = [...new Set(entry.sources.map((source) => source.level))];
      assert.deepEqual(entry.levels, sourceLevels, 'levels must preserve first-seen source order');
    }
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test('optional B2 audio export covers implemented U6 and U7 curriculum sources', async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'bahasa-audio-b2-'));
  const output = path.join(temp, 'b2.json');
  try {
    const result = spawnSync(process.execPath, [script, '--include-b2', '--output', output], {
      cwd: root, encoding: 'utf8', timeout: 30000
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const entries = JSON.parse(await readFile(output, 'utf8'));
    assert.ok(entries.some((entry) => entry.levels.includes('B2')), 'optional export must include B2');
    for (const unitId of ['b2_u6', 'b2_u7']) {
      assert.ok(entries.some((entry) => entry.sources.some((source) =>
        source.level === 'B2' && source.unit === unitId && source.kind === 'vocabulary'
      )), unitId + ' vocabulary must be represented in the B2 manifest');
    }
    assert.ok(entries.some((entry) => entry.sources.some((source) =>
      source.level === 'B2' && source.unit === 'b2_u7' && source.kind === 'listen-answer'
    )), 'B2 U7 listen answers must be exported as audio text');
    assert.equal(new Set(entries.map((entry) => entry.id)).size, entries.length);
    assert.ok(entries.every((entry) => entry.id === hashText(entry.text)));
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test('optional interactive audio export covers every static playback surface', async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'bahasa-audio-interactive-'));
  const baseOutput = path.join(temp, 'base.json');
  const interactiveOutput = path.join(temp, 'interactive.json');
  try {
    for (const [output, args] of [
      [baseOutput, [script, '--output', baseOutput]],
      [interactiveOutput, [script, '--include-interactive', '--output', interactiveOutput]]
    ]) {
      const result = spawnSync(process.execPath, args, { cwd: root, encoding: 'utf8', timeout: 30000 });
      assert.equal(result.status, 0, result.stderr || result.stdout);
    }

    const base = JSON.parse(await readFile(baseOutput, 'utf8'));
    const interactive = JSON.parse(await readFile(interactiveOutput, 'utf8'));
    const countSource = (kind) => interactive.filter((entry) => entry.sources.some((source) => source.kind === kind)).length;

    const baseIds = new Set(base.map((entry) => entry.id));
    const kinds = ['exercise-audioText', 'assessment-listen', 'conversation-turn', 'conversation-example'];
    const staticEntries = interactive.filter((entry) => entry.sources.some((source) => kinds.includes(source.kind)));
    const missingBySource = Object.fromEntries(kinds.map((kind) => [
      kind,
      interactive.filter((entry) => entry.sources.some((source) => source.kind === kind) && !baseIds.has(entry.id)).length
    ]));
    assert.equal(countSource('exercise-audioText'), 40, 'all unique lesson audioText prompts must be collected');
    assert.equal(countSource('assessment-listen'), 3, 'all unique assessment listen utterances must be collected');
    assert.equal(countSource('conversation-turn'), 27, 'all unique conversation turns must be collected');
    assert.equal(countSource('conversation-example'), 27, 'all unique speakable conversation examples must be collected');
    assert.equal(staticEntries.length, 96, 'static playback sources must deduplicate to 96 distinct texts');
    assert.equal(staticEntries.filter((entry) => baseIds.has(entry.id)).length, 29, '29 static texts are already covered by the existing library');
    assert.deepEqual(missingBySource, {
      'exercise-audioText': 15,
      'assessment-listen': 2,
      'conversation-turn': 26,
      'conversation-example': 24
    }, 'all 67 missing clips must be attributed to their playback source');
    console.log('interactive audio coverage audit', JSON.stringify({
      base: base.length,
      interactive: interactive.length,
      staticUnique: staticEntries.length,
      alreadyCovered: staticEntries.filter((entry) => baseIds.has(entry.id)).length,
      added: interactive.length - base.length,
      sourceCounts: Object.fromEntries(kinds.map((kind) => [kind, countSource(kind)])),
      missingBySource
    }));
    assert.equal(interactive.length - base.length, 67, 'interactive sources should add the 67 currently missing unique texts');
    assert.equal(new Set(interactive.map((entry) => entry.id)).size, interactive.length);
    assert.ok(interactive.every((entry) => entry.id === hashText(entry.text)));
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test('audio normalization is intentionally conservative and punctuation-sensitive', () => {
  assert.equal(normalize('  SAYA\n  MAKAN.  '), 'saya makan.');
  assert.notEqual(normalize('Saya makan.'), normalize('Saya makan!'));
  assert.notEqual(normalize('é'), normalize('e\u0301'), 'normalization does not apply Unicode NFC/NFD');
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

test('all-language export follows the central language registry and includes every course with curriculum paths', async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'bahasa-audio-all-languages-'));
  const output = path.join(temp, 'all-languages.json');
  try {
    const result = spawnSync(process.execPath, [script, '--all-languages', '--output', output], {
      cwd: root, encoding: 'utf8', timeout: 30000
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const entries = JSON.parse(await readFile(output, 'utf8'));
    const languages = new Set(entries.map((entry) => entry.language));
    assert.ok(languages.has('id'), 'Indonesian course must be exported');
    assert.ok(languages.has('pt-BR'), 'Brazilian Portuguese course must be discovered from LanguageManager');
    for (const level of ['A1', 'A2', 'B1', 'B2']) {
      assert.ok(entries.some((entry) => entry.language === 'pt-BR' &&
        entry.sources.some((source) => source.level === level)),
      'Portuguese ' + level + ' texts must be exported');
    }
    assert.ok(entries.some((entry) => entry.language === 'pt-BR' && entry.text.toLowerCase() === 'olá'),
      'the initial Portuguese greeting must be included');
    assert.ok(entries.every((entry) => entry.language && entry.locale && entry.text && entry.sources.length > 0));
    assert.ok(entries.every((entry) => entry.text === entry.text.trim().replace(/\s+/g, ' ')),
      'localized text must use canonical collapsed whitespace');
    assert.equal(new Set(entries.map((entry) => entry.language + ':' + entry.id)).size, entries.length,
      'audio text IDs must be unique within each language');
    for (const entry of entries) assert.equal(entry.id, hashText(entry.text));
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test('all ten Piper voices are pinned and their model cards are preserved for attribution', async () => {
  const voices = JSON.parse(await readFile(path.join(root, 'tools/audio-voices.json'), 'utf8'));
  assert.equal(Object.keys(voices).length, 10);
  for (const [code, voice] of Object.entries(voices)) {
    assert.equal(voice.repository, 'rhasspy/piper-voices', code);
    assert.match(voice.revision, /^[a-f0-9]{40}$/, code + ' must use an immutable upstream revision');
    assert.ok(voice.model && voice.model_path && voice.locale, code + ' voice metadata must be complete');
  }
  const generator = await readFile(path.join(root, 'tools/generar_audio.py'), 'utf8');
  assert.match(generator, /MODEL_CARD/);
  assert.match(generator, /VOICE_ATTRIBUTION\.md/);
  assert.match(generator, /resolve\/\{revision\}/);
  assert.match(generator, /PIPER_VERSION = "1\.8\.0"/);
  assert.match(generator, /voice_revisions/);
  assert.match(generator, /PiperVoice\.load/);
  assert.match(generator, /voice\.synthesize_wav/);
  assert.match(generator, /wave\.open/);
  assert.match(generator, /manifest-multilingual\.json/);
  assert.match(generator, /inventory_path = ROOT \/ "audio" \/ "manifest\.json"/);
  assert.match(generator, /metadata_path = ROOT \/ "audio" \/ "metadata\.json"/);
  assert.match(generator, /inventory_path = ROOT \/ "audio" \/ code \/ "manifest\.json"/);
  assert.match(generator, /metadata_path = ROOT \/ "audio" \/ code \/ "metadata\.json"/);
  assert.match(generator, /sha256_file/);
  const workflow = await readFile(path.join(root, '.github/workflows/audio.yml'), 'utf8');
  assert.match(workflow, /piper-tts==1\.8\.0/);
});
