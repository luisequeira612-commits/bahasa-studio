#!/usr/bin/env node
/**
 * Structural and editorial consistency checks for the authored A1/A2 curriculum.
 *
 * This tool is deliberately independent of KBBI and network services. It checks
 * relationships and data integrity; it does NOT certify Indonesian grammar,
 * naturalness, register, pronunciation, CEFR alignment, or translation quality.
 *
 * Usage:
 *   node scripts/audit-curriculum-quality.mjs
 *   node scripts/audit-curriculum-quality.mjs --json /tmp/curriculum-quality.json
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import vm from 'node:vm';

function loadCurriculum(source, globalName, filename) {
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename, timeout: 5000 });
  const curriculum = sandbox.window[globalName];
  if (!curriculum || !Array.isArray(curriculum.units)) {
    throw new Error(`${filename} did not define window.${globalName}.units`);
  }
  return curriculum;
}

function issue(severity, code, path, message) {
  return { severity, code, path, message };
}

export function auditCurriculum(curriculum, level = curriculum?.id ?? 'unknown') {
  const issues = [];
  const units = Array.isArray(curriculum?.units) ? curriculum.units : [];
  const vocabIds = new Map();
  const unitIds = new Set();

  if (!units.length) issues.push(issue('error', 'CURRICULUM_EMPTY', level, 'El currículo no contiene unidades.'));

  units.forEach((unit, unitIndex) => {
    const unitPath = `${level}.units[${unitIndex}]`;
    if (!unit || typeof unit !== 'object') {
      issues.push(issue('error', 'UNIT_INVALID', unitPath, 'La unidad no es un objeto.'));
      return;
    }
    if (!unit.id || typeof unit.id !== 'string') {
      issues.push(issue('error', 'UNIT_ID_MISSING', unitPath, 'La unidad necesita un ID de texto.'));
    } else if (unitIds.has(unit.id)) {
      issues.push(issue('error', 'UNIT_ID_DUPLICATE', unitPath, `ID de unidad duplicado: ${unit.id}.`));
    } else unitIds.add(unit.id);

    if (!unit.title || typeof unit.title !== 'string') {
      issues.push(issue('error', 'UNIT_TITLE_MISSING', unitPath, 'La unidad necesita un título.'));
    }
    if (!Array.isArray(unit.vocab)) {
      issues.push(issue('error', 'VOCABULARY_NOT_ARRAY', unitPath, 'vocab debe ser un array.'));
    }
    if (Array.isArray(unit.vocab)) {
      unit.vocab.forEach((word, wordIndex) => {
        const wordPath = `${unitPath}.vocab[${wordIndex}]`;
        if (!word || typeof word !== 'object') {
          issues.push(issue('error', 'VOCAB_ITEM_INVALID', wordPath, 'La entrada de vocabulario no es un objeto.'));
          return;
        }
        if (!word.id || typeof word.id !== 'string') {
          issues.push(issue('error', 'VOCAB_ID_MISSING', wordPath, 'La entrada necesita un ID.'));
        } else if (vocabIds.has(word.id)) {
          issues.push(issue('error', 'VOCAB_ID_DUPLICATE', wordPath, `ID de vocabulario duplicado: ${word.id}; primera aparición en ${vocabIds.get(word.id)}.`));
        } else vocabIds.set(word.id, wordPath);

        for (const field of ['idn', 'esp']) {
          if (typeof word[field] !== 'string' || !word[field].trim()) {
            issues.push(issue('error', 'VOCAB_FIELD_MISSING', `${wordPath}.${field}`, `Falta el campo obligatorio ${field}.`));
          }
        }
        if (!word.ex || !word.exEsp) {
          issues.push(issue('warning', 'VOCAB_EXAMPLE_INCOMPLETE', wordPath, 'Falta el ejemplo indonesio o su traducción española.'));
        }
      });
    }

    const exercises = Array.isArray(unit.exercises) ? unit.exercises : [];
    if (!Array.isArray(unit.exercises)) {
      issues.push(issue('warning', 'EXERCISES_NOT_ARRAY', unitPath, 'La unidad no tiene un array exercises.'));
    }
    exercises.forEach((exercise, exerciseIndex) => {
      const exercisePath = `${unitPath}.exercises[${exerciseIndex}]`;
      if (!exercise || typeof exercise !== 'object') {
        issues.push(issue('error', 'EXERCISE_INVALID', exercisePath, 'El ejercicio no es un objeto.'));
        return;
      }
      if (typeof exercise.type !== 'string' || !exercise.type.trim()) {
        issues.push(issue('error', 'EXERCISE_TYPE_MISSING', exercisePath, 'El ejercicio necesita un tipo.'));
      }
      if (typeof exercise.prompt !== 'string' || !exercise.prompt.trim()) {
        issues.push(issue('error', 'EXERCISE_PROMPT_MISSING', exercisePath, 'El ejercicio necesita una consigna.'));
      }
      if (exercise.vocabId && typeof exercise.vocabId !== 'string') {
        issues.push(issue('error', 'EXERCISE_VOCAB_ID_INVALID', exercisePath, 'vocabId debe ser texto.'));
      }
      if (exercise.type === 'mc') {
        if (!Array.isArray(exercise.options) || exercise.options.length < 2) {
          issues.push(issue('error', 'MC_OPTIONS_INVALID', exercisePath, 'Un ejercicio mc necesita al menos dos opciones.'));
        } else if (!Number.isInteger(exercise.answer) || exercise.answer < 0 || exercise.answer >= exercise.options.length) {
          issues.push(issue('error', 'MC_ANSWER_OUT_OF_RANGE', exercisePath, 'La respuesta mc debe ser un índice válido de options.'));
        }
      }
      if (exercise.type === 'order') {
        if (!Array.isArray(exercise.words) || !Array.isArray(exercise.correctOrder)) {
          issues.push(issue('error', 'ORDER_DATA_INVALID', exercisePath, 'Un ejercicio order necesita words y correctOrder como arrays.'));
        } else if (exercise.words.length !== exercise.correctOrder.length) {
          issues.push(issue('error', 'ORDER_LENGTH_MISMATCH', exercisePath, 'words y correctOrder deben tener la misma cantidad de elementos.'));
        } else {
          const sorted = (items) => [...items].map(String).sort();
          if (JSON.stringify(sorted(exercise.words)) !== JSON.stringify(sorted(exercise.correctOrder))) {
            issues.push(issue('error', 'ORDER_TOKEN_MISMATCH', exercisePath, 'correctOrder debe contener exactamente los tokens de words.'));
          }
        }
      }
    });

    if (Array.isArray(unit.lessons)) {
      unit.lessons.forEach((lesson, lessonIndex) => {
        const lessonPath = `${unitPath}.lessons[${lessonIndex}]`;
        if (!lesson || typeof lesson !== 'object') {
          issues.push(issue('error', 'LESSON_INVALID', lessonPath, 'La lección no es un objeto.'));
          return;
        }
        if (Array.isArray(lesson.vocabIds)) {
          lesson.vocabIds.forEach((id, idIndex) => {
            if (typeof id !== 'string' || !id.trim()) {
              issues.push(issue('error', 'LESSON_VOCAB_ID_INVALID', `${lessonPath}.vocabIds[${idIndex}]`, 'La referencia de vocabulario debe ser texto no vacío.'));
            }
          });
        }
        if (Array.isArray(lesson.exercises)) {
          lesson.exercises.forEach((exercise, exerciseIndex) => {
            if (exercise && typeof exercise === 'object' && exercise.vocabId && typeof exercise.vocabId !== 'string') {
              issues.push(issue('error', 'LESSON_EXERCISE_VOCAB_ID_INVALID', `${lessonPath}.exercises[${exerciseIndex}]`, 'vocabId debe ser texto.'));
            }
          });
        }
      });
    }
  });

  // Resolve references after collecting every vocabulary ID, allowing legitimate
  // cross-unit references used by cumulative review activities.
  units.forEach((unit, unitIndex) => {
    const unitPath = `${level}.units[${unitIndex}]`;
    const checkRef = (id, path) => {
      if (id && typeof id === 'string' && !vocabIds.has(id)) {
        issues.push(issue('error', 'VOCAB_REFERENCE_MISSING', path, `No existe una entrada de vocabulario con ID ${id} en este nivel.`));
      }
    };
    (unit.exercises ?? []).forEach((exercise, index) => {
      if (exercise && typeof exercise === 'object') checkRef(exercise.vocabId, `${unitPath}.exercises[${index}].vocabId`);
    });
    (unit.lessons ?? []).forEach((lesson, lessonIndex) => {
      if (!lesson || typeof lesson !== 'object') return;
      (lesson.vocabIds ?? []).forEach((id, index) => checkRef(id, `${unitPath}.lessons[${lessonIndex}].vocabIds[${index}]`));
      (lesson.exercises ?? []).forEach((exercise, index) => {
        if (exercise && typeof exercise === 'object') checkRef(exercise.vocabId, `${unitPath}.lessons[${lessonIndex}].exercises[${index}].vocabId`);
      });
    });
  });

  return {
    level,
    unit_count: units.length,
    vocabulary_count: vocabIds.size,
    error_count: issues.filter((item) => item.severity === 'error').length,
    warning_count: issues.filter((item) => item.severity === 'warning').length,
    issues,
  };
}

async function main() {
  const args = process.argv.slice(2);
  let jsonPath = '';
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--json') {
      jsonPath = args[++i];
      if (!jsonPath) throw new Error('--json necesita una ruta de salida.');
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log('Usage: node scripts/audit-curriculum-quality.mjs [--json PATH]');
      return;
    } else throw new Error(`Argumento desconocido: ${args[i]}`);
  }

  const definitions = [
    ['curriculum-a1.js', 'BAHASA_CURRICULUM_A1'],
    ['curriculum-a2.js', 'BAHASA_CURRICULUM_A2'],
  ];
  const reports = [];
  for (const [filename, globalName] of definitions) {
    const source = await readFile(resolve(filename), 'utf8');
    const curriculum = loadCurriculum(source, globalName, filename);
    reports.push(auditCurriculum(curriculum, curriculum.id));
  }
  const report = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    method: 'local_structural_and_reference_checks',
    external_services_used: false,
    kbbi_required: false,
    linguistic_certification: false,
    summary: {
      levels: reports.length,
      units: reports.reduce((sum, item) => sum + item.unit_count, 0),
      vocabulary_entries: reports.reduce((sum, item) => sum + item.vocabulary_count, 0),
      errors: reports.reduce((sum, item) => sum + item.error_count, 0),
      warnings: reports.reduce((sum, item) => sum + item.warning_count, 0),
    },
    levels: reports,
    limitations: [
      'No certifica gramática, naturalidad, registro, dialecto ni uso idiomático.',
      'No valida equivalencia semántica de las traducciones.',
      'No valida pronunciación ni calidad de audio.',
      'No equivale a revisión por hablante nativo o especialista.',
    ],
  };
  const output = `${JSON.stringify(report, null, 2)}\n`;
  if (jsonPath) await writeFile(resolve(jsonPath), output, 'utf8');
  console.log(JSON.stringify(report.summary, null, 2));
  for (const level of reports) {
    console.log(`${level.level}: ${level.unit_count} unidades, ${level.vocabulary_count} vocablos, ${level.error_count} errores, ${level.warning_count} avisos`);
    for (const item of level.issues.slice(0, 30)) {
      console.log(`[${item.severity}] ${item.code} ${item.path}: ${item.message}`);
    }
    if (level.issues.length > 30) console.log(`… ${level.issues.length - 30} incidencias adicionales; usa --json para el informe completo.`);
  }
  if (jsonPath) console.log(`Informe JSON guardado en ${resolve(jsonPath)}`);
  if (report.summary.errors > 0) process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  main().catch((error) => {
    console.error(`audit-curriculum-quality: ${error.message}`);
    process.exitCode = 1;
  });
}
