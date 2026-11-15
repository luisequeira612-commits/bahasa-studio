import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { loadInlineB1Curriculum } from './load-inline-b1-curriculum.mjs';
import { loadInlineB2Curriculum } from './load-inline-b2-curriculum.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function loadStandalone(file, globalName) {
  const source = await readFile(path.join(ROOT, file), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: file, timeout: 5000 });
  const level = sandbox.window[globalName];
  if (!level || !Array.isArray(level.units)) {
    throw new Error(file + ' does not expose a valid ' + globalName + ' curriculum.');
  }
  return JSON.parse(JSON.stringify(level));
}

export async function loadAuthoredLessonLevels() {
  const [a1, a2, indexSource] = await Promise.all([
    loadStandalone('curriculum-a1.js', 'BAHASA_CURRICULUM_A1'),
    loadStandalone('curriculum-a2.js', 'BAHASA_CURRICULUM_A2'),
    readFile(path.join(ROOT, 'index.html'), 'utf8'),
  ]);
  return [
    a1,
    a2,
    loadInlineB1Curriculum(indexSource, a1, a2),
    loadInlineB2Curriculum(indexSource, a1, a2),
  ];
}

export function buildAuthoredLessonInventory(levels, minimum = 5, maximum = 6) {
  if (!Array.isArray(levels)) throw new TypeError('levels must be an array');
  if (!Number.isInteger(minimum) || !Number.isInteger(maximum) || minimum < 1 || maximum < minimum) {
    throw new RangeError('lesson bounds must be positive integers and maximum must be >= minimum');
  }

  return levels.map((level) => {
    const units = (level.units || []).map((unit) => {
      const authoredLessonCount = Array.isArray(unit.lessons) ? unit.lessons.length : 0;
      return {
        id: unit.id,
        title: unit.title,
        authoredLessonCount,
        compliant: authoredLessonCount >= minimum && authoredLessonCount <= maximum,
      };
    });
    const distribution = {};
    for (const unit of units) {
      distribution[unit.authoredLessonCount] = (distribution[unit.authoredLessonCount] || 0) + 1;
    }
    return {
      level: level.id,
      unitCount: units.length,
      authoredLessonCount: units.reduce((sum, unit) => sum + unit.authoredLessonCount, 0),
      distribution,
      belowMinimum: units.filter((unit) => unit.authoredLessonCount < minimum),
      aboveMaximum: units.filter((unit) => unit.authoredLessonCount > maximum),
      units,
    };
  });
}

export function findAuthoredLessonViolations(report) {
  if (!Array.isArray(report)) throw new TypeError('report must be an array');
  return report.flatMap((level) => [
    ...level.belowMinimum.map((unit) => ({
      level: level.level,
      id: unit.id,
      count: unit.authoredLessonCount,
      reason: 'below-minimum',
    })),
    ...level.aboveMaximum.map((unit) => ({
      level: level.level,
      id: unit.id,
      count: unit.authoredLessonCount,
      reason: 'above-maximum',
    })),
  ]);
}

export function assertAuthoredLessonCompliance(report) {
  const violations = findAuthoredLessonViolations(report);
  if (violations.length) {
    const details = violations.map((item) =>
      item.level + ' ' + item.id + ': ' + item.count + ' authored lessons (' + item.reason + ')'
    ).join('; ');
    throw new Error(
      violations.length + ' unit(s) violate the explicit 5–6 authored lesson standard: ' + details
    );
  }
  return true;
}

async function main(args = process.argv.slice(2)) {
  const report = buildAuthoredLessonInventory(await loadAuthoredLessonLevels());
  console.log('Authored lesson inventory (runtime-generated lessons excluded)');
  for (const level of report) {
    const distribution = Object.entries(level.distribution)
      .sort(([left], [right]) => Number(left) - Number(right))
      .map(([count, units]) => count + ' lessons: ' + units + ' units')
      .join(', ');
    console.log(
      level.level + ': ' + level.unitCount + ' units, ' + level.authoredLessonCount +
      ' authored lessons (' + (distribution || 'no authored lessons') + '); ' +
      level.belowMinimum.length + ' below minimum, ' + level.aboveMaximum.length + ' above maximum.'
    );
    for (const unit of [...level.belowMinimum, ...level.aboveMaximum]) {
      console.log('  - ' + level.level + ' ' + unit.id + ': ' + unit.authoredLessonCount + ' authored lessons');
    }
  }

  const violations = findAuthoredLessonViolations(report);
  console.log('Total units outside the 5–6 authored lesson standard: ' + violations.length);
  if (args.includes('--strict')) {
    assertAuthoredLessonCompliance(report);
    console.log('Strict authored lesson gate: PASS');
  } else {
    console.log('Informational mode: use --strict to fail on any unit outside the standard.');
  }
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
