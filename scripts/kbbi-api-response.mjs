/** Best-effort extraction of common KBBI API fields for human review. */
export function summarizeApiResponse(body) {
  let parsed;
  try { parsed = JSON.parse(body); }
  catch { return { api_json_valid: false, api_lemma: null, api_base_word: null, api_definitions: [], api_part_of_speech: [], api_variants: [], api_non_standard_words: [], api_compound_words: [], api_derived_words: [], api_top_level_keys: [] }; }
  const objects = Array.isArray(parsed) ? parsed : [parsed];
  const first = objects.find((value) => value && typeof value === 'object') ?? {};
  const stringValue = (value) => typeof value === 'string' && value.trim() ? value.trim() : null;
  const arrayStrings = (value) => {
    const values = Array.isArray(value) ? value : value == null ? [] : [value];
    return values.flatMap((item) => {
      if (typeof item === 'string' && item.trim()) return [item.trim()];
      if (item && typeof item === 'object') {
        const text = item.definition ?? item.definisi ?? item.meaning ?? item.text ?? item.name;
        return typeof text === 'string' && text.trim() ? [text.trim()] : [];
      }
      return [];
    }).slice(0, 30);
  };
  return {
    api_json_valid: true,
    api_lemma: stringValue(first.lemma ?? first.lema ?? first.word ?? first.entry),
    api_base_word: stringValue(first.baseWord ?? first.base_word ?? first.rootWord ?? first.root_word),
    api_definitions: arrayStrings(first.definitions ?? first.definition ?? first.definisi ?? first.meanings),
    api_part_of_speech: arrayStrings(first.partOfSpeech ?? first.part_of_speech ?? first.wordClass ?? first.kelasKata ?? first.kelas_kata ?? first.pos),
    api_variants: arrayStrings(first.variants ?? first.variant),
    api_non_standard_words: arrayStrings(first.nonStandardWords ?? first.non_standard_words),
    api_compound_words: arrayStrings(first.compoundWords ?? first.compound_words),
    api_derived_words: arrayStrings(first.derivedWords ?? first.derived_words),
    api_top_level_keys: Object.keys(first).slice(0, 40),
  };
}

