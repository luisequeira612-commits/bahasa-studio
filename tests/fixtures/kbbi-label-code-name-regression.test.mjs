import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeApiResponse } from '../../scripts/kbbi-api-response.mjs';


test('API summarizer extracts Kelas Kata labels using code and name fields', () => {
  const summary = summarizeApiResponse(JSON.stringify({
    lemma: 'kantin',
    entries: [{
      definitions: [
        { labels: [{ kind: 'Kelas Kata', code: 'n', name: 'Nomina' }], definition: 'tempat makan di sekolah' },
        { labels: [{ kind: 'Kelas Kata', code: 'v', name: 'Verba' }], definition: 'contoh definisi kedua' },
      ],
    }],
  }));
  assert.deepEqual(summary.api_part_of_speech, ['Nomina', 'Verba']);
  assert.deepEqual(summary.api_definition_labels, [
    { kind: 'Kelas Kata', code: 'n', name: 'Nomina', value: 'Nomina' },
    { kind: 'Kelas Kata', code: 'v', name: 'Verba', value: 'Verba' },
  ]);
});
