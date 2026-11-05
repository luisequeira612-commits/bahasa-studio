import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildUnifiedQualityReport } from '../scripts/build-unified-quality-report.mjs';

const audit = (errors = 0, warnings = 0) => ({
  method: 'local_structural_and_reference_checks',
  linguistic_certification: false,
  summary: { errors, warnings, informational: 2, units: 72, vocabulary_entries: 640, unique_vocabulary_ids: 620 },
  levels: [
    { level: 'A1', unit_count: 32, vocabulary_count: 280, exercise_count: 900, error_count: errors, warning_count: warnings, info_count: 1, issues: [{ severity: 'info', code: 'VOCAB_ID_REUSED_SAME_TERM', path: 'A1.units[4].vocab[4]', message: 'ID reutilizado para el mismo término.' }] },
    { level: 'A2', unit_count: 40, vocabulary_count: 360, exercise_count: 1100, error_count: 0, warning_count: 0, info_count: 1, issues: [{ severity: 'info', code: 'OTHER_INFO', path: 'A2.units[0]', message: 'Dato informativo.' }, { severity: 'warning', code: 'EDITORIAL_WARNING', path: 'A2.units[1]', message: 'No incluir como informativo.' }] },
  ],
});
const editorial = {
  total_entries: 640,
  units: 72,
  by_level: { A1: 280, A2: 360 },
  by_priority: { P1: 12, P2: 628 },
  review_status: 'pending',
  by_item_type: { vocabulary: 640, exercise: 1200 },
  candidate_flags: { open_response_review: 45, accepted_alternatives_review: 12 },
  missing_fields: { example_indonesian: 4 },
  editorial_status: 'not_reviewed',
  linguistic_certification: false,
};

test('combines both reports while preserving unreviewed linguistic status', () => {
  const report = buildUnifiedQualityReport(audit(0, 3), editorial);
  assert.equal(report.schema_version, 1);
  assert.equal(report.structural_quality.gate, 'attention');
  assert.equal(report.structural_quality.units, 72);
  assert.equal(report.structural_quality.levels.length, 2);
  assert.equal(report.structural_quality.unique_vocabulary_ids, 620);
  assert.equal(report.structural_quality.exercises, 2000);
  assert.deepEqual(report.structural_quality.informational_by_code, { VOCAB_ID_REUSED_SAME_TERM: 1, OTHER_INFO: 1 });
  assert.equal(report.structural_quality.informational_findings.length, 2);
  assert.equal(report.structural_quality.informational_findings[0].path, 'A1.units[4].vocab[4]');
  assert.equal(report.editorial_workload.entries, 640);
  assert.equal(report.editorial_workload.status, 'not_reviewed');
  assert.equal(report.editorial_workload.review_status, 'pending');
  assert.deepEqual(report.editorial_workload.by_item_type, { vocabulary: 640, exercise: 1200 });
  assert.deepEqual(report.editorial_workload.candidate_flags, { open_response_review: 45, accepted_alternatives_review: 12 });
  assert.equal(report.editorial_workload.review_completion, null);
  assert.equal(report.linguistic_validation.status, 'not_certified');
  assert.equal(report.linguistic_validation.native_speaker_validation, false);
  assert.equal(report.linguistic_validation.kbbi_required, false);
});

test('blocks the structural gate when deterministic errors exist', () => {
  const report = buildUnifiedQualityReport(audit(1, 0), editorial);
  assert.equal(report.structural_quality.gate, 'blocked');
});

test('clears the structural gate only when errors and warnings are zero', () => {
  const report = buildUnifiedQualityReport(audit(0, 0), editorial);
  assert.equal(report.structural_quality.gate, 'clear');
});

test('rejects source reports that imply editorial approval or linguistic certification', () => {
  assert.throws(() => buildUnifiedQualityReport(audit(), { ...editorial, editorial_status: 'approved' }), /not_reviewed/);
  assert.throws(() => buildUnifiedQualityReport(audit(), { ...editorial, review_status: 'complete' }), /pending/);
  assert.throws(() => buildUnifiedQualityReport({ ...audit(), linguistic_certification: true }, editorial), /certification/);
});

test('rejects incomplete deterministic audit summaries', () => {
  assert.throws(() => buildUnifiedQualityReport({ ...audit(), summary: { errors: 0 } }, editorial), /warnings/);
});


test('CLI writes parseable JSON and creates a missing output directory', () => {
  const directory = mkdtempSync(join(tmpdir(), 'bahasa-quality-report-'));
  try {
    const auditPath = join(directory, 'audit.json');
    const editorialPath = join(directory, 'editorial.json');
    const outputPath = join(directory, 'nested', 'report.json');
    writeFileSync(auditPath, JSON.stringify(audit()), 'utf8');
    writeFileSync(editorialPath, JSON.stringify(editorial), 'utf8');
    const scriptPath = fileURLToPath(new URL('../scripts/build-unified-quality-report.mjs', import.meta.url));
    execFileSync(process.execPath, [
      scriptPath,
      '--audit', auditPath,
      '--editorial', editorialPath,
      '--output', outputPath,
    ], { stdio: 'pipe' });
    const raw = readFileSync(outputPath, 'utf8');
    const parsed = JSON.parse(raw);
    assert.equal(parsed.structural_quality.gate, 'clear');
    assert.equal(raw.endsWith('\n'), true);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});


test('reports audioText, dedicated listen exercises and general audio support separately', () => {
  const source = audit();
  source.levels[0].audio_capability_coverage = {
    audio_text_exercise_count: 12,
    listen_exercise_count: 4,
    audio_capable_exercise_count: 16,
    units_with_audio_text: 30,
    units_without_audio_text: 2,
    units_with_listen_exercise: 22,
    units_without_listen_exercise: 10,
    units_with_audio_support: 32,
    units_without_audio_support: 0,
    units_without_audio_support_ids: [],
  };
  source.levels[0].exercise_type_distribution = {
    listen: { units_without_type_ids: ['a1_u2', 'a1_u6'] },
  };
  const report = buildUnifiedQualityReport(source, editorial);
  assert.deepEqual(report.structural_quality.levels[0].audio_coverage, {
    audio_text_exercise_count: 12,
    listen_exercise_count: 4,
    audio_capable_exercise_count: 16,
    units_with_audio_text: 30,
    units_without_audio_text: 2,
    units_with_listen_exercise: 22,
    units_without_listen_exercise: 10,
    units_without_listen_exercise_ids: ['a1_u2', 'a1_u6'],
    units_with_audio_support: 32,
    units_without_audio_support: 0,
    units_without_audio_support_ids: [],
  });
  assert.equal(report.linguistic_validation.status, 'not_certified');
});

test('defaults audio coverage for legacy reports without audio metrics', () => {
  const source = audit();
  const report = buildUnifiedQualityReport(source, editorial);
  assert.equal(report.structural_quality.levels[0].audio_coverage.listen_exercise_count, 0);
  assert.deepEqual(report.structural_quality.levels[0].audio_coverage.units_without_listen_exercise_ids, []);
});
