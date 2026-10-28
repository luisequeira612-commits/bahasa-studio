#!/usr/bin/env node
/**
 * Build a review queue for Indonesian vocabulary whose KBBI status is not_checked.
 *
 * No dependencies. Never edits the source tracker or upgrades verification status.
 * Optional API calls are opt-in via --api-template and are saved as evidence for
 * human review; a successful HTTP response is NOT proof of lexical correctness.
 *
 * Usage:
 *   node scripts/audit-kbbi-pending.mjs
 *   node scripts/audit-kbbi-pending.mjs --input docs/A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv --output /tmp/kbbi-review.json
 *   node scripts/audit-kbbi-pending.mjs --api-template 'https://your-free-api.example/entry/{word}' --delay-ms 1200
 *
 * The template must contain {word}. It is URL-encoded and replaced with the
 * original Indonesian form. Do not strip prefixes or infer lemmas automatically.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

function parseArgs(argv) {
  const opts = {
    input: 'docs/A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv',
    output: 'artifacts/kbbi-review-queue.json',
    apiTemplate: '',
    delayMs: 1200,
    timeoutMs: 10000,
    limit: 0,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const take = () => {
      if (!argv[i + 1]) throw new Error(`Missing value for ${arg}`);
      return argv[++i];
    };
    if (arg === '--input') opts.input = take();
    else if (arg === '--output') opts.output = take();
    else if (arg === '--api-template') opts.apiTemplate = take();
    else if (arg === '--delay-ms') opts.delayMs = Number(take());
    else if (arg === '--timeout-ms') opts.timeoutMs = Number(take());
    else if (arg === '--limit') opts.limit = Number(take());
    else if (arg === '--help' || arg === '-h') {
      console.log('Options: --input PATH --output PATH --api-template HTTPS_URL_WITH_{word} --delay-ms N --timeout-ms N --limit N');
      process.exit(0);
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!Number.isFinite(opts.delayMs) || opts.delayMs < 0) throw new Error('--delay-ms must be a non-negative number');
  if (!Number.isFinite(opts.timeoutMs) || opts.timeoutMs < 1) throw new Error('--timeout-ms must be a positive number');
  if (!Number.isFinite(opts.limit) || opts.limit < 0) throw new Error('--limit must be a non-negative number');
  if (opts.apiTemplate) {
    if (!opts.apiTemplate.includes('{word}')) throw new Error('--api-template must contain {word}');
    const sample = opts.apiTemplate.replaceAll('{word}', encodeURIComponent('contoh'));
    const url = new URL(sample);
    if (url.protocol !== 'https:') throw new Error('API template must use HTTPS');
  }
  return opts;
}

// RFC-4180-compatible enough for this tracker: commas/newlines inside quoted
// cells and escaped double quotes are preserved.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i += 1; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"' && cell.length === 0) quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') {
      row.push(cell.replace(/\r$/, ''));
      if (row.some((v) => v !== '')) rows.push(row);
      row = []; cell = '';
    } else cell += c;
  }
  if (quoted) throw new Error('Malformed CSV: unclosed quoted field');
  if (cell.length || row.length) {
    row.push(cell.replace(/\r$/, ''));
    if (row.some((v) => v !== '')) rows.push(row);
  }
  if (rows.length < 2) throw new Error('CSV has no data rows');
  const headers = rows.shift().map((h) => h.trim());
  return rows.map((values, index) => {
    const record = {};
    headers.forEach((header, i) => { record[header] = values[i] ?? ''; });
    record.__csvLine = index + 2;
    return record;
  });
}

const sleep = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const csv = await readFile(resolve(opts.input), 'utf8');
  const rows = parseCsv(csv);
  const headers = Object.keys(rows[0] ?? {});
  const statusKey = headers.find((h) => h.toLowerCase() === 'kbbi_status');
  const formKey = headers.find((h) => ['indonesian_form', 'word', 'term'].includes(h.toLowerCase()));
  const idKey = headers.find((h) => ['vocab_id', 'id'].includes(h.toLowerCase()));
  const unitKey = headers.find((h) => h.toLowerCase() === 'unit');
  if (!statusKey || !formKey || !idKey) {
    throw new Error('CSV must contain KBBI_status, indonesian_form, and vocab_id columns');
  }
  let pending = rows.filter((row) => row[statusKey].trim().toLowerCase() === 'not_checked');
  if (opts.limit) pending = pending.slice(0, opts.limit);
  const generatedAt = new Date().toISOString();
  const results = [];
  for (let i = 0; i < pending.length; i += 1) {
    const row = pending[i];
    const word = row[formKey].trim();
    const item = {
      vocab_id: row[idKey],
      unit: unitKey ? row[unitKey] : '',
      indonesian_form: word,
      existing_status: row[statusKey],
      official_kbbi_url: `https://kbbi.kemendikdasmen.go.id/entri/${encodeURIComponent(word.toLowerCase())}`,
      generated_at: generatedAt,
      request_url: null,
      http_status: null,
      response_content_type: null,
      response_excerpt: null,
      fetch_error: null,
      reviewer_decision: 'not_reviewed',
      notes: 'API output is only a candidate lead. Confirm the exact sense in a primary source and review gloss/example separately.',
    };
    if (opts.apiTemplate) {
      const url = opts.apiTemplate.replaceAll('{word}', encodeURIComponent(word));
      item.request_url = url;
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), opts.timeoutMs);
        try {
          const response = await fetch(url, {
            headers: { accept: 'application/json, text/plain;q=0.9, */*;q=0.1', 'user-agent': 'Bahasa-Studio-vocabulary-audit/1.0' },
            signal: controller.signal,
          });
          item.http_status = response.status;
          item.response_content_type = response.headers.get('content-type');
          const body = await response.text();
          item.response_excerpt = body.slice(0, 12000);
          if (!response.ok) item.fetch_error = `HTTP ${response.status}`;
          if (body.length > 12000) item.notes += ' Response excerpt truncated at 12000 characters.';
        } finally {
          clearTimeout(timeout);
        }
      } catch (error) {
        item.fetch_error = error?.name === 'AbortError' ? `Timed out after ${opts.timeoutMs}ms` : String(error?.message ?? error);
      }
      if (i < pending.length - 1 && opts.delayMs > 0) await sleep(opts.delayMs);
    }
    results.push(item);
    console.log(`[${i + 1}/${pending.length}] ${item.vocab_id} ${word}: ${item.http_status ?? (opts.apiTemplate ? item.fetch_error : 'queued for manual lookup')}`);
  }
  const output = {
    schema_version: 1,
    generated_at: generatedAt,
    source_tracker: opts.input,
    source_status_filter: 'not_checked',
    count: results.length,
    api_used: Boolean(opts.apiTemplate),
    warning: 'This file is a review queue, not a verification result. Do not copy API output into the tracker or mark entries verified without human source review.',
    results,
  };
  const outputPath = resolve(opts.output);\n  await mkdir(new URL('.', `file://${outputPath.startsWith('/') ? '' : '/'}${outputPath}`).pathname, { recursive: true }).catch(async () => {\n    const { dirname } = await import('node:path');\n    await mkdir(dirname(outputPath), { recursive: true });\n  });\n  await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${results.length} review candidates to ${resolve(opts.output)}`);
  if (!opts.apiTemplate) console.log('No network requests made. Add --api-template with a tested HTTPS endpoint to collect optional API leads.');
}

main().catch((error) => {
  console.error(`audit-kbbi-pending: ${error.message}`);
  process.exitCode = 1;
});
