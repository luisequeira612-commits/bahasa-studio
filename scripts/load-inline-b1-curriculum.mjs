import vm from 'node:vm';

/**
 * Extract the authored B1 level from the CourseData object embedded in index.html.
 * A1 and A2 remain sourced from their standalone curriculum files; they are
 * injected as plain data so the inline course definition can be evaluated
 * without executing the rest of the application or accessing network services.
 */
export function loadInlineB1Curriculum(indexSource, a1, a2) {
  const start = indexSource.indexOf('const CourseData =');
  const marker = '/* 3. AUDIO Y AUDIO FALLBACK */';
  const end = indexSource.indexOf(marker, start);
  if (start < 0 || end <= start) {
    throw new Error('index.html does not contain the expected CourseData block.');
  }
  if (!a1 || !Array.isArray(a1.units) || !a2 || !Array.isArray(a2.units)) {
    throw new Error('B1 extraction requires valid A1 and A2 curricula.');
  }

  const source = indexSource.slice(start, end)
    .replaceAll('window.BAHASA_CURRICULUM_A1', JSON.stringify(a1))
    .replaceAll('window.BAHASA_CURRICULUM_A2', JSON.stringify(a2));
  const course = vm.runInNewContext(source + '\n;CourseData', {}, {
    filename: 'index.html#CourseData',
    timeout: 5000,
  });
  const b1 = course?.levels?.find((level) => level?.id === 'B1');
  if (!b1 || !Array.isArray(b1.units)) {
    throw new Error('CourseData does not define a valid B1 curriculum.');
  }
  return JSON.parse(JSON.stringify(b1));
}
