#!/usr/bin/env node
/**
 * Combine deterministic curriculum audit and editorial queue summaries.
 * This is a reporting layer only: it does not inspect or approve language.
 *
 * Usage:
 * node scripts/build-unified-quality-report.mjs --audit PATH --editorial PATH --output PATH
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

function requireObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} must be a JSON object.`);
  }
  return value;
}

export function buildUnifiedQualityReport(auditInput, editorialInput) {
  const audit = requireObject(auditInput, 'Audit report');
  const editorial = requireObject(editorialInput, 'Editorial summary');
  const summary = requireObject(audit.summary, 'Audit summary');
  const levels = Array.isArray(audit.levels) ? audit.levels : null;
  if (!levels) throw new Error('Audit report must contain a levels array.');
  for (const key of ['errors', 'warnings', 'informational', 'units', 'vocabulary_entries']) {
    if (!Number.isFinite(summary[key]) || summary[key] < 0) {
      throw new Error(`Audit summary has an invalid ${key} count.`);
    }
  }
  if (!Number.isFinite(editorial.total_entries) || editorial.total_entries < 0) {
    throw new Error('Editorial summary has an invalid total_entries count.');
  }
  if (editorial.editorial_status !== 'not_reviewed') {
    throw new Error('Editorial summary status must remain not_reviewed.');
  }
  if (editorial.linguistic_certification !== false || audit.linguistic_certification !== false) {
    throw new Error('Source reports must explicitly deny linguistic certification.');
  }

  const gate = summary.errors > 0 ? 'blocked' : summary.warnings > 0 ? 'attention' : 'clear';
  return {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    method: 'combined_local_quality_summaries',
    source_reports: {
      curriculum_audit_method: audit.method ?? 'unspecified',
      editorial_queue_status: editorial.editorial_status,
    },
    structural_quality: {
      gate,
      errors: summary.errors,
      warnings: summary.warnings,
      informational: summary.informational,
      units: summary.units,
      vocabulary_entries: summary.vocabulary_entries,
      levels: levels.map((level) => ({
        level: level.level,
        units: level.unit_count,
        vocabulary_entries: level.vocabulary_count,
        exercises: level.exercise_count,
        errors: level.error_count,
        warnings: level.warning_count,
        informational: level.info_count,
      })),
    },
    editorial_workload: {
      entries: editorial.total_entries,
      units: editorial.units,
      by_level: editorial.by_level ?? {},
      by_priority: editorial.by_priority ?? {},
      missing_fields: editorial.missing_fields ?? {},
      status: 'not_reviewed',
      review_completion: null,
    },
    linguistic_validation: {
      status: 'not_certified',
      native_speaker_validation: false,
      kbbi_required: false,
    },
    limitations: [
      'El informe combina métricas estructurales y carga editorial; no revisa automáticamente la lengua.',
      'Una cola generada no demuestra que sus entradas hayan sido revisadas.',
      'CI verde no equivale a certificación lingüística ni a validación por hablante nativo.',
    ],
  };
}

async function main() {
  const args = process.argv.slice(2);
  const paths = { audit: '', editorial: '', output: 'artifacts/unified-quality-report.json' };
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--audit' || args[i] === '--editorial' || args[i] === '--output') {
      const key = args[i].slice(2);
      paths[key] = args[++i] ?? '';
      if (!paths[key]) throw new Error(`--${key} needs a path.`);
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log('Usage: node scripts/build-unified-quality-report.mjs --audit PATH --editorial PATH [--output PATH]');
      return;
    } else throw new Error(`Unknown argument: ${args[i]}`);
  }
  if (!paths.audit || !paths.editorial) throw new Error('Both --audit and --editorial are required.');
  const audit = JSON.parse(await readFile(resolve(paths.audit), 'utf8'));
  const editorial = JSON.parse(await readFile(resolve(paths.editorial), 'utf8'));
  const report = buildUnifiedQualityReport(audit, editorial);
  const destination = resolve(paths.output);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, JSON.stringify(report, null, 2) + '\\n', 'utf8');
  console.log(JSON.stringify({
    gate: report.structural_quality.gate,
    errors: report.structural_quality.errors,
    warnings: report.structural_quality.warnings,
    editorial_entries: report.editorial_workload.entries,
    linguistic_validation: report.linguistic_validation.status,
    output: destination,
  }, null, 2));
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  main().catch((error) => {
    console.error(`build-unified-quality-report: ${error.message}`);
    process.exitCode = 1;
  });
}
