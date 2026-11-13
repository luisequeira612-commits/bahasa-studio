const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

function loadShuffleHelpers() {
  const start = html.indexOf('        function shuffleArray(');
  const end = html.indexOf('        function appendActiveRecallLessons(', start);
  assert.ok(start >= 0 && end > start, 'shuffle helpers must exist before lesson generation');
  return vm.runInNewContext(
    html.slice(start, end) + '\n({ shuffleArray, shuffleOrderWords })'
  );
}

test('Fisher–Yates produces every permutation exactly once for all n=3 choice paths', () => {
  const { shuffleArray } = loadShuffleHelpers();
  const permutations = [];

  for (let firstChoice = 0; firstChoice < 3; firstChoice++) {
    for (let secondChoice = 0; secondChoice < 2; secondChoice++) {
      const values = [(firstChoice + 0.25) / 3, (secondChoice + 0.25) / 2];
      let cursor = 0;
      permutations.push(Array.from(shuffleArray([1, 2, 3], () => values[cursor++])).join(''));
    }
  }

  assert.deepEqual([...permutations].sort(), ['123', '132', '213', '231', '312', '321']);
});

test('shuffle helpers do not mutate their source arrays', () => {
  const { shuffleArray } = loadShuffleHelpers();
  const source = ['a', 'b', 'c'];
  shuffleArray(source, () => 0);
  assert.deepEqual(source, ['a', 'b', 'c']);
});

test('order exercises never render the canonical answer when a different arrangement is possible', () => {
  const { shuffleOrderWords } = loadShuffleHelpers();
  const words = ['kaubaca.', 'Buku', 'itu'];
  const correctOrder = ['Buku', 'itu', 'kaubaca.'];
  const values = [0.1, 0.1];
  let cursor = 0;

  const shuffled = Array.from(shuffleOrderWords(words, correctOrder, () => values[cursor++]));

  assert.notDeepEqual(shuffled, correctOrder);
  assert.deepEqual([...shuffled].sort(), [...words].sort());
  assert.deepEqual(words, ['kaubaca.', 'Buku', 'itu']);
});

test('all exercise shuffle call sites use Fisher–Yates and order-specific protection', () => {
  assert.match(html, /const options = shuffleArray\(\[word\.esp, \.\.\.distractors\]\);/);
  assert.match(html, /const shuffled = shuffleOrderWords\(ex\.words, ex\.correctOrder\);/);
  assert.match(html, /const idnOptions = shuffleArray\(ex\.pairs\.map/);
  assert.match(html, /const espOptions = shuffleArray\(ex\.pairs\.map/);
  assert.doesNotMatch(html, /sort\(\(\) => Math\.random\(\) - 0\.5\)/);
});
