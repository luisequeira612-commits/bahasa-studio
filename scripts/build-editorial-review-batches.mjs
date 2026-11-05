#!/usr/bin/env node
/**
 * Build bounded, human-readable editorial review packets from the neutral queue.
 * This tool scopes existing pending rows; it never changes review status or
 * makes linguistic judgments.
 *
 * Usage:
 *   node scripts/build-editorial-review-batches.mjs --level A1 --units a1_u24,a1_u25 --output artifacts/editorial-review-batch.json
 *   node scripts/build-editorial-review-batches.mjs --level A2 --units a2_u1-a2_u8 --priority P1,P2 --output artifacts/editorial-review-batch.json
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

export function parseUnitList(value) {
  const units = new Set();
  for (const token of String(value ?? '').split(',').map((item) => item.trim()).filter(Boolean)) {
    const range = token.match(/^(.+?)(\d+)-(.+?)(\d+)$/i);
    if (range && range[1].toLocaleLowerCase() === range[3].toLocaleLowerCase()) {
      const prefix = range[1];
      const start = Number(range[2]);
      const end = Number(range[4]);
      if (start > end) throw new Error(`Invalid unit range: ${token}`);
      for (let n = start; n <= end; n += 1) units.add(`${prefix}${n}`);
    } else {
      units.add(token);
    }
  }
  return [...units];
}

export function buildReviewBatch(rows, { level, units, priorities = [] } = {}) {
  const normalizedLevel = String(level ?? '').trim().toUpperCase();
  if (!['A1', 'A2'].includes(normalizedLevel)) throw new Error('level must be A1 or A2');
  const requestedUnits = parseUnitList(units);
  if (!requestedUnits.length) throw new Error('at least one unit is required');
  const unitSet = new Set(requestedUnits.map((unit) => unit.toLocaleLowerCase()));
  const prioritySet = new Set(priorities.map((item) => String(item).trim().toUpperCase()).filter(Boolean));
  if (prioritySet.size && [...prioritySet].some((item) => !['P1', 'P2', 'P3'].includes(item))) {
    throw new Error('priority must contain only P1, P2 or P3');
  }

  const filtered = rows.filter((row) =>
    String(row.level).toUpperCase() === normalizedLevel &&
    unitSet.has(String(row.unit_id).toLocaleLowerCase()) &&
    (!prioritySet.size || prioritySet.has(String(row.priority).toUpperCase()))
  );
  if (!filtered.length) throw new Error('No editorial entries found for the requested scope');

  const byUnit = {};
  for (const row of filtered) {
    const key = String(row.unit_id);
    if (!byUnit[key]) byUnit[key] = { unit_id: key, unit_title: String(row.unit_title ?? ''), counts: { total: 0, vocabulary: 0, exercise: 0, P1: 0, P2: 0, P3: 0 }, entries: [] };
    const batch = byUnit[key];
    batch.counts.total += 1;
    batch.counts[row.item_type] = (batch.counts[row.item_type] ?? 0) + 1;
    batch.counts[row.priority] = (batch.counts[row.priority] ?? 0) + 1;
    batch.entries.push(row);
  }

  const unitsOut = Object.values(byUnit).sort((a, b) => a.unit_id.localeCompare(b.unit_id, undefined, { numeric: true }));
  return {
    scope: { level: normalizedLevel, units: requestedUnits, priorities: [...prioritySet] },
    total_entries: filtered.length,
    review_status: 'pending',
    editorial_status: 'not_reviewed',
    linguistic_certification: false,
    units: unitsOut,
  };
}

export function parseCsv(csv) {
  const source = String(csv).replace(/^\uFEFF/, '');
  const records = [];
  let record = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];
    if (quoted) {
      if (ch === '"' && source[i + 1] === '"') { cell += '"'; i += 1; }
      else if (ch === '"') quoted = false;
      else if (ch === '\r' && source[i + 1] === '\n') { cell += '\n'; i += 1; }
      else cell += ch;
    } else if (ch === '"') {
      if (cell.length) throw new Error('Invalid CSV quote');
      quoted = true;
    } else if (ch === ',') { record.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && source[i + 1] === '\n') i += 1;
      record.push(cell);
      if (record.some((value) => value.length)) records.push(record);
      record = []; cell = '';
    } else cell += ch;
  }
  if (quoted) throw new Error('Invalid CSV: unterminated quoted field');
  if (cell.length || record.length) {
    record.push(cell);
    if (record.some((value) => value.length)) records.push(record);
  }
  if (!records.length) return [];
  const headers = records[0];
  return records.slice(1).map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ''])));
}
async function main() {
  const args = process.argv.slice(2);
  let level = '';
  let units = '';
  let priorities = [];
  let inputPath = 'artifacts/editorial-review-queue.csv';
  let outputPath = 'artifacts/editorial-review-batch.json';
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--level') level = args[++i] ?? '';
    else if (args[i] === '--units') units = args[++i] ?? '';
    else if (args[i] === '--priority') priorities = String(args[++i] ?? '').split(',');
    else if (args[i] === '--input') inputPath = args[++i] ?? '';
    else if (args[i] === '--output') outputPath = args[++i] ?? '';
    else if (args[i] === '--help' || args[i] === '-h') {
      console.log('Usage: node scripts/build-editorial-review-batches.mjs --level A1|A2 --units UNIT[,UNIT]|UNIT1-UNIT8 [--priority P1,P2,P3] [--input PATH] [--output PATH]');
      return;
    } else throw new Error(`Unknown argument: ${args[i]}`);
  }
  const rows = parseCsv(await readFile(resolve(inputPath), 'utf8'));
  const packet = buildReviewBatch(rows, { level, units, priorities });
  const destination = resolve(outputPath);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, JSON.stringify(packet, null, 2) + '\n', 'utf8');
  console.log(JSON.stringify({ total_entries: packet.total_entries, units: packet.units.map((unit) => ({ unit_id: unit.unit_id, total: unit.counts.total, P1: unit.counts.P1, P2: unit.counts.P2, P3: unit.counts.P3 })), output: destination }, null, 2));
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  main().catch((error) => { console.error(`build-editorial-review-batches: ${error.message}`); process.exitCode = 1; });
}
