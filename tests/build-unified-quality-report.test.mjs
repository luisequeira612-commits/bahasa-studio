import test from 'node:test';
import assert from 'node:assert/strict';
import { buildUnifiedQualityReport } from '../scripts/build-unified-quality-report.mjs';

const audit = (errors = 0, warnings = 0) => ({
  method: 'local_structural_and_reference_checks',
  linguistic_certification: false,
  summary: { errors, warnings, informational: 2, units: 72, vocabulary_entries: 640 },
  levels: [
    { level: 'A1', unit_count: 32, vocabulary_count: 280, exercise_count: 900, error_count: errors, warning_count: warnings, info_count: 1 },
    { level: 'A2', unit_count: 40, vocabulary_count: 360, exercise_count: 1100, error_count: 0, warning_count: 0, info_count: 1 },
  ],
});
const editorial = {
  total_entries: 640,
  units: 72,
  by_level: { A1: 280, A2: 360 },
  by_priority: { P1: 12, P2: 628 },
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
  assert.equal(report.editorial_workload.entries, 640);
  assert.equal(report.editorial_workload.status, 'not_reviewed');
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
  assert.throws(() => buildUnifiedQualityReport({ ...audit(), linguistic_certification: true }, editorial), /certification/);
});

test('rejects incomplete deterministic audit summaries', () => {
  assert.throws(() => buildUnifiedQualityReport({ ...audit(), summary: { errors: 0 } }, editorial), /warnings/);
});
