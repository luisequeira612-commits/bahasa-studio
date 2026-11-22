#!/usr/bin/env node
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { loadInlineB1Curriculum } from './load-inline-b1-curriculum.mjs';
import { loadInlineB2Curriculum } from './load-inline-b2-curriculum.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const normalize = (text) => text.trim().replace(/\s+/g, ' ').toLowerCase();
const hashText = (text) => createHash('sha1').update(normalize(text), 'utf8').digest('hex').slice(0, 12);

async function loadStandalone(file, globalName) {
  const source = await readFile(path.join(ROOT, file), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: file, timeout: 5000 });
  const level = sandbox.window[globalName];
  if (!level || !Array.isArray(level.units)) throw new Error(`Invalid curriculum: ${file}`);
  return level;
}

async function loadBrowserGlobal(file, globalName) {
  const source = await readFile(path.join(ROOT, file), 'utf8');
  const sandbox = { window: {}, document: { addEventListener() {} } };
  vm.runInNewContext(source, sandbox, { filename: file, timeout: 5000 });
  const value = sandbox.window[globalName] || sandbox[globalName];
  if (!value) throw new Error(`Invalid browser module: ${file}`);
  return value;
}

function addEntry(entries, levelId, text, kind, unitId) {
  if (typeof text !== 'string' || !text.trim()) return;
  const normalized = normalize(text);
  const id = hashText(text);
  const existing = entries.get(id);
  if (existing && existing.normalized !== normalized) {
    throw new Error(`SHA-1 prefix collision for ${id}`);
  }
  const source = { level: levelId, unit: unitId, kind };
  if (existing) {
    if (!existing.sources.some((item) => item.level === source.level && item.unit === source.unit && item.kind === source.kind)) {
      existing.sources.push(source);
    }
    if (!existing.levels.includes(levelId)) existing.levels.push(levelId);
  } else {
    entries.set(id, { id, text: text.trim().replace(/\s+/g, ' '), normalized, levels: [levelId], sources: [source] });
  }
}

function collectLevel(level, entries, includeInteractive = false) {
  for (const unit of level.units) {
    for (const vocab of unit.vocab || []) {
      addEntry(entries, level.id, vocab.idn, 'vocabulary', unit.id);
      addEntry(entries, level.id, vocab.ex, 'example', unit.id);
    }
    const visitExercises = (items) => {
      for (const item of items || []) {
        if (!item || typeof item !== 'object') continue;
        if (item.type === 'listen') {
          addEntry(entries, level.id, item.audioText, 'listen-audioText', unit.id);
          if (typeof item.answer === 'string') addEntry(entries, level.id, item.answer, 'listen-answer', unit.id);
        } else if (item.type === 'translate_es_id' && typeof item.answer === 'string') {
          addEntry(entries, level.id, item.answer, 'translate-answer', unit.id);
        }
        if (includeInteractive && item.type !== 'listen' && typeof item.audioText === 'string') {
          addEntry(entries, level.id, item.audioText, 'exercise-audioText', unit.id);
        }
      }
    };
    visitExercises(unit.exercises);
    for (const lesson of unit.lessons || []) visitExercises(lesson.exercises);
  }
}

async function collectInteractiveSources(entries) {
  const [assessment, conversation] = await Promise.all([
    loadBrowserGlobal('assessment-engine.js', 'BahasaAssessment'),
    loadBrowserGlobal('conversation-engine.js', 'ConversationEngine')
  ]);

  for (const item of assessment.ITEM_BANK || []) {
    if (item.type !== 'listen') continue;
    addEntry(entries, item.level, item.audioText || item.answer, 'assessment-listen', `assessment:${item.id}`);
  }

  for (const scenario of conversation.scenarios || []) {
    for (const turn of scenario.turns || []) {
      addEntry(entries, scenario.level, turn.line, 'conversation-turn', `conversation:${scenario.id}`);
      const example = (turn.choices || []).find((choice) => choice.correct);
      if (example) addEntry(entries, scenario.level, example.text, 'conversation-example', `conversation:${scenario.id}`);
    }
  }

}

export async function buildManifest({ includeInteractive = false, includeB2 = false } = {}) {
  const [a1, a2, indexSource] = await Promise.all([
    loadStandalone('curriculum-a1.js', 'BAHASA_CURRICULUM_A1'),
    loadStandalone('curriculum-a2.js', 'BAHASA_CURRICULUM_A2'),
    readFile(path.join(ROOT, 'index.html'), 'utf8')
  ]);
  const b1 = loadInlineB1Curriculum(indexSource, a1, a2);
  const b2 = includeB2 ? loadInlineB2Curriculum(indexSource, a1, a2) : null;
  const entries = new Map();
  const levels = [a1, a2, b1];
  if (b2) levels.push(b2);
  for (const level of levels) collectLevel(level, entries, includeInteractive);
  if (includeInteractive) await collectInteractiveSources(entries);
  return [...entries.values()];
}

async function main() {
  const outputIndex = process.argv.indexOf('--output');
  const output = outputIndex >= 0 ? path.resolve(process.argv[outputIndex + 1]) : path.join(ROOT, 'audio', 'manifest.json');
  const includeInteractive = process.argv.includes('--include-interactive');
  let includeB2 = process.argv.includes('--include-b2');
  if (!includeB2) {
    try {
      const index = JSON.parse(await readFile(path.join(ROOT, 'audio', 'index.json'), 'utf8'));
      const [baseCandidates, b2Candidates] = await Promise.all([
        buildManifest(),
        buildManifest({ includeB2: true })
      ]);
      const baseIds = new Set(baseCandidates.map((entry) => entry.id));
      const b2OnlyIds = new Set(b2Candidates
        .filter((entry) => entry.levels.includes('B2') && !baseIds.has(entry.id))
        .map((entry) => entry.id));
      includeB2 = b2OnlyIds.size > 0 && [...b2OnlyIds].every((id) => index.includes(id));
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
  }
  const manifest = await buildManifest({ includeInteractive, includeB2 });
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  const counts = Object.fromEntries(['A1', 'A2', 'B1', 'B2'].map((level) => [level, manifest.filter((entry) => entry.levels.includes(level)).length]));
  process.stdout.write(`Unique audio texts: ${manifest.length}; ${JSON.stringify(counts)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error); process.exitCode = 1; });
}
