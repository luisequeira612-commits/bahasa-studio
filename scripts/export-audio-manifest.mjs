#!/usr/bin/env node
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { loadInlineB1Curriculum } from './load-inline-b1-curriculum.mjs';

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

function collectLevel(level, entries) {
  function add(text, kind, unitId) {
    if (typeof text !== 'string' || !text.trim()) return;
    const normalized = normalize(text);
    const id = hashText(text);
    const existing = entries.get(id);
    if (existing && existing.normalized !== normalized) {
      throw new Error(`SHA-1 prefix collision for ${id}`);
    }
    const source = { level: level.id, unit: unitId, kind };
    if (existing) {
      if (!existing.sources.some((item) => item.level === source.level && item.unit === source.unit && item.kind === source.kind)) {
        existing.sources.push(source);
      }
      if (!existing.levels.includes(level.id)) existing.levels.push(level.id);
    } else {
      entries.set(id, { id, text: text.trim().replace(/\s+/g, ' '), normalized, levels: [level.id], sources: [source] });
    }
  }

  for (const unit of level.units) {
    for (const vocab of unit.vocab || []) {
      add(vocab.idn, 'vocabulary', unit.id);
      add(vocab.ex, 'example', unit.id);
    }
    const visitExercises = (items) => {
      for (const item of items || []) {
        if (!item || typeof item !== 'object') continue;
        if (item.type === 'listen') {
          add(item.audioText, 'listen-audioText', unit.id);
          if (typeof item.answer === 'string') add(item.answer, 'listen-answer', unit.id);
        } else if (item.type === 'translate_es_id' && typeof item.answer === 'string') {
          add(item.answer, 'translate-answer', unit.id);
        }
      }
    };
    visitExercises(unit.exercises);
    for (const lesson of unit.lessons || []) visitExercises(lesson.exercises);
  }
}

export async function buildManifest() {
  const [a1, a2, indexSource] = await Promise.all([
    loadStandalone('curriculum-a1.js', 'BAHASA_CURRICULUM_A1'),
    loadStandalone('curriculum-a2.js', 'BAHASA_CURRICULUM_A2'),
    readFile(path.join(ROOT, 'index.html'), 'utf8')
  ]);
  const b1 = loadInlineB1Curriculum(indexSource, a1, a2);
  const entries = new Map();
  for (const level of [a1, a2, b1]) collectLevel(level, entries);
  return [...entries.values()];
}

async function main() {
  const outputIndex = process.argv.indexOf('--output');
  const output = outputIndex >= 0 ? path.resolve(process.argv[outputIndex + 1]) : path.join(ROOT, 'audio', 'manifest.json');
  const manifest = await buildManifest();
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  const counts = Object.fromEntries(['A1', 'A2', 'B1'].map((level) => [level, manifest.filter((entry) => entry.levels.includes(level)).length]));
  process.stdout.write(`Unique audio texts: ${manifest.length}; ${JSON.stringify(counts)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error); process.exitCode = 1; });
}
