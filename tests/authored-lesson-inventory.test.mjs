import test from 'node:test';
import assert from 'node:assert/strict';
import {
  assertAuthoredLessonCompliance,
  buildAuthoredLessonInventory,
  findAuthoredLessonViolations,
  loadAuthoredLessonLevels,
} from '../scripts/audit-authored-lesson-inventory.mjs';

test('lesson inventory counts authored lesson arrays only and flags units outside the 5–6 standard', () => {
  const report = buildAuthoredLessonInventory([
    { id: 'A1', units: [{ id: 'a1_u1' }, { id: 'a1_u2', lessons: [{}, {}, {}, {}, {}] }] },
    { id: 'B2', units: [{ id: 'b2_u1', lessons: [{}, {}, {}, {}, {}, {}, {}] }] },
  ]);
  assert.equal(report[0].units[0].authoredLessonCount, 0);
  assert.equal(report[0].units[0].compliant, false);
  assert.equal(report[0].units[1].compliant, true);
  assert.equal(report[1].aboveMaximum.length, 1);
  assert.equal(report[1].aboveMaximum[0].id, 'b2_u1');
});

test('strict gate passes only when every implemented unit has 5–6 explicit lessons', () => {
  const compliant = buildAuthoredLessonInventory([
    { id: 'A1', units: [{ id: 'a1_u1', lessons: [{}, {}, {}, {}, {}] }, { id: 'a1_u2', lessons: [{}, {}, {}, {}, {}, {}] }] },
  ]);
  assert.equal(assertAuthoredLessonCompliance(compliant), true);
  assert.deepEqual(findAuthoredLessonViolations(compliant), []);

  const nonCompliant = buildAuthoredLessonInventory([
    { id: 'B1', units: [{ id: 'b1_u1', lessons: [{}, {}] }, { id: 'b1_u2', lessons: Array(7).fill({}) }] },
  ]);
  assert.deepEqual(findAuthoredLessonViolations(nonCompliant), [
    { level: 'B1', id: 'b1_u1', count: 2, reason: 'below-minimum' },
    { level: 'B1', id: 'b1_u2', count: 7, reason: 'above-maximum' },
  ]);
  assert.throws(() => assertAuthoredLessonCompliance(nonCompliant), /2 unit\(s\) violate the explicit 5–6 authored lesson standard/);
});

test('repository inventory baseline distinguishes authored lessons from runtime-generated reinforcement', async () => {
  const levels = await loadAuthoredLessonLevels();
  const report = buildAuthoredLessonInventory(levels);
  const b1 = levels.find((level) => level.id === 'B1');
  const consolidated = ['b1_u29', 'b1_u30', 'b1_u31', 'b1_u32', 'b1_u33', 'b1_u34', 'b1_u35', 'b1_u36', 'b1_u37', 'b1_u38', 'b1_u39', 'b1_u40', 'b1_u41', 'b1_u42', 'b1_u43', 'b1_u44', 'b1_u45', 'b1_u46', 'b1_u47', 'b1_u48', 'b1_u49', 'b1_u50'].map((id) => b1.units.find((unit) => unit.id === id));
  assert.deepEqual(consolidated.map((unit) => unit.lessons.length), [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
  assert.deepEqual(consolidated.map((unit) => unit.lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0)), [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22]);
  assert.equal(consolidated[3].lessons[4].title, 'Repaso acumulativo de B1 U28–U32');
  const newLessonTitles = [
    'Elegir el grado de obligación según la situación', 'Explicar y justificar una recomendación',
    'Convertir una meta en un plan concreto', 'Mantener el esfuerzo a lo largo del plan',
    'Secuenciar pasos hacia una meta', 'Preparar y decidir el siguiente paso',
    'Reorganizar el horario según las prioridades',
    'Diagnosticar causas y efectos de un problema', 'Proponer una mejora después de un problema',
    'Comparar alternativas con criterios claros', 'Justificar una decisión y evaluar sus consecuencias',
    'Presentar propuestas durante una negociación', 'Construir un compromiso compartido',
    'Transmitir información de forma ordenada', 'Verificar datos y confirmar acuerdos',
    'Aplicar mejoras y revisar el progreso', 'Responder a los comentarios con acciones concretas',
    'Equilibrar crítica y reconocimiento', 'Organizar la evidencia antes de concluir',
    'Comunicar conclusiones con fundamento', 'Planificar ajustes ante un cambio',
    'Valorar el impacto de nuevas costumbres',
    'Diferenciar una afirmación de una admisión', 'Responder a una acusación con claridad',
    'Comparar semejanzas y diferencias en contexto', 'Identificar factores que condicionan un resultado',
    'Explicar cómo una experiencia influye en una decisión', 'Construir una previsión a partir de datos',
    'Comunicar posibilidades sin afirmar certezas',
    'Anticipar riesgos antes de actuar', 'Elegir medidas de prevención adecuadas',
    'Medir el uso responsable de los recursos', 'Distribuir recursos según las prioridades',
    'Aplicar procedimientos y asumir responsabilidades', 'Participar y presentar propuestas',
    'Solicitar apoyo y organizar una actividad',
    'Promover prácticas sostenibles', 'Reducir residuos y explicar sus efectos',
    'Comprobar la viabilidad de un plan', 'Presentar el proyecto y dar seguimiento',
  ];
  const addedLessons = consolidated.flatMap((unit) => unit.lessons.filter((item) => newLessonTitles.includes(item.title)));
  assert.equal(addedLessons.length, 40);
  for (const unit of consolidated) {
    for (const lesson of unit.lessons.filter((item) => newLessonTitles.includes(item.title))) {
      assert.deepEqual(new Set(lesson.exercises.map((exercise) => exercise.type)), new Set(['mc', 'translate_es_id', 'order', 'write']));
      assert.equal(lesson.exercises.some((exercise) => exercise.type === 'listen'), false);
      assert.equal(lesson.vocabIds.length, 0);
    }
  }
  const summary = Object.fromEntries(report.map((level) => [
    level.level,
    {
      unitCount: level.unitCount,
      authoredLessonCount: level.authoredLessonCount,
      distribution: level.distribution,
    },
  ]));

  assert.deepEqual(summary, {
    A1: { unitCount: 32, authoredLessonCount: 165, distribution: { 5: 27, 6: 5 } },
    A2: { unitCount: 40, authoredLessonCount: 200, distribution: { 5: 40 } },
    B1: { unitCount: 50, authoredLessonCount: 250, distribution: { 5: 50 } },
    B2: { unitCount: 25, authoredLessonCount: 125, distribution: { 5: 25 } },
  });
});
