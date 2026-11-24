/**
 * Validate optional, language-neutral curriculum extensions.
 * Structural contract only; it does not judge linguistic correctness.
 */
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const nonEmpty = value => typeof value === 'string' && value.trim().length > 0;
const normalize = value => value.normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase();
function add(issues, path, code, message) { issues.push({ path, code, message }); }
function validateTextArray(value, path, issues, unique = false) {
  if (!Array.isArray(value)) { add(issues, path, 'OPTIONAL_TEXT_ARRAY_INVALID', 'Debe ser un array de textos.'); return; }
  const seen = new Set();
  value.forEach((item, index) => {
    if (!nonEmpty(item)) { add(issues, path + '[' + index + ']', 'OPTIONAL_TEXT_INVALID', 'Cada elemento debe ser un texto no vacío.'); return; }
    const key = normalize(item);
    if (unique && seen.has(key)) add(issues, path + '[' + index + ']', 'OPTIONAL_TEXT_DUPLICATE', 'El texto está duplicado tras normalizar Unicode y espacios.');
    seen.add(key);
  });
}
function validateVocab(word, path, issues) {
  if (!isRecord(word)) return;
  for (const field of ['reading', 'transliteration']) {
    if (word[field] !== undefined && !nonEmpty(word[field])) add(issues, path + '.' + field, 'OPTIONAL_TEXT_INVALID', 'Debe ser un texto no vacío cuando se incluye.');
  }
  if (word.tokens !== undefined) validateTextArray(word.tokens, path + '.tokens', issues);
  if (word.grammaticalFunctions !== undefined) validateTextArray(word.grammaticalFunctions, path + '.grammaticalFunctions', issues, true);
  if (word.pronunciation !== undefined) {
    if (!isRecord(word.pronunciation)) add(issues, path + '.pronunciation', 'PRONUNCIATION_INVALID', 'Debe ser un objeto.');
    else if (word.pronunciation.ipa !== undefined && !nonEmpty(word.pronunciation.ipa)) add(issues, path + '.pronunciation.ipa', 'PRONUNCIATION_IPA_INVALID', 'IPA debe ser un texto no vacío.');
  }
  if (word.forms !== undefined) {
    if (!Array.isArray(word.forms)) add(issues, path + '.forms', 'FORMS_INVALID', 'Debe ser un array.');
    else word.forms.forEach((form, index) => {
      if (!isRecord(form) || !nonEmpty(form.value) || !nonEmpty(form.label)) add(issues, path + '.forms[' + index + ']', 'FORM_ITEM_INVALID', 'Cada forma requiere value y label como textos no vacíos.');
    });
  }
  if (word.annotations !== undefined) {
    if (!Array.isArray(word.annotations)) add(issues, path + '.annotations', 'ANNOTATIONS_INVALID', 'Debe ser un array.');
    else word.annotations.forEach((annotation, index) => {
      if (!isRecord(annotation) || !nonEmpty(annotation.type) || !nonEmpty(annotation.text)) add(issues, path + '.annotations[' + index + ']', 'ANNOTATION_ITEM_INVALID', 'Cada anotación requiere type y text como textos no vacíos.');
    });
  }
  if (word.verification !== undefined) {
    if (!isRecord(word.verification) || !nonEmpty(word.verification.status)) add(issues, path + '.verification', 'VERIFICATION_INVALID', 'Debe conservar un objeto con status textual.');
    else if (word.verification.sources !== undefined && !Array.isArray(word.verification.sources)) add(issues, path + '.verification.sources', 'VERIFICATION_SOURCES_INVALID', 'sources debe ser un array.');
  }
}
function validateExercise(exercise, path, issues) {
  if (!isRecord(exercise) || exercise.acceptedAnswers === undefined) return;
  validateTextArray(exercise.acceptedAnswers, path + '.acceptedAnswers', issues, true);
  if (Array.isArray(exercise.acceptedAnswers) && exercise.acceptedAnswers.length === 0) add(issues, path + '.acceptedAnswers', 'ACCEPTED_ANSWERS_EMPTY', 'Si se incluye, acceptedAnswers debe contener al menos una respuesta.');
}
export function validateOptionalCurriculumFields(curriculum) {
  const issues = [];
  if (!isRecord(curriculum) || !Array.isArray(curriculum.units)) return [{ path: 'curriculum.units', code: 'CURRICULUM_UNITS_INVALID', message: 'El currículo debe contener units como array.' }];
  curriculum.units.forEach((unit, unitIndex) => {
    const unitPath = 'units[' + unitIndex + ']';
    if (!isRecord(unit)) return;
    if (Array.isArray(unit.vocab)) unit.vocab.forEach((word, index) => validateVocab(word, unitPath + '.vocab[' + index + ']', issues));
    if (Array.isArray(unit.lessons)) unit.lessons.forEach((lesson, lessonIndex) => {
      if (isRecord(lesson) && Array.isArray(lesson.exercises)) lesson.exercises.forEach((exercise, exerciseIndex) => validateExercise(exercise, unitPath + '.lessons[' + lessonIndex + '].exercises[' + exerciseIndex + ']', issues));
    });
    if (Array.isArray(unit.exercises)) unit.exercises.forEach((exercise, index) => validateExercise(exercise, unitPath + '.exercises[' + index + ']', issues));
  });
  return issues;
}
