/** Best-effort extraction of common KBBI API fields for human review. */
export function summarizeApiResponse(body) {
  let parsed;
  try { parsed = JSON.parse(body); }
  catch {
    return {
      api_json_valid: false, api_lemma: null, api_base_word: null,
      api_base_word_present: false, api_entry: null, api_definitions: [],
      api_part_of_speech: [], api_definition_labels: [], api_variants: [],
      api_entry_variants: [], api_non_standard_words: [], api_compound_words: [],
      api_derived_words: [], api_top_level_keys: [], api_entries_count: null,
      api_entry_ambiguous: false,
    };
  }
  const root = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  const entries = Array.isArray(root.entries) ? root.entries : Array.isArray(parsed) ? parsed : [root];
  const objects = entries.filter((value) => value && typeof value === 'object' && !Array.isArray(value));
  const first = objects[0] ?? {};
  const has = (obj, keys) => keys.some((key) => Object.hasOwn(obj, key));
  const pick = (obj, keys) => {
    for (const key of keys) if (Object.hasOwn(obj, key)) return obj[key];
    return undefined;
  };
  const strings = (value) => (Array.isArray(value) ? value : value == null ? [] : [value])
    .flatMap((item) => {
      if (typeof item === 'string') return item.trim() ? [item.trim()] : [];
      if (item && typeof item === 'object') {
        const v = item.definition ?? item.definisi ?? item.meaning ?? item.text ?? item.name ?? item.word ?? item.entry;
        return typeof v === 'string' && v.trim() ? [v.trim()] : [];
      }
      return [];
    }).slice(0, 100);
  const definitionsRaw = pick(first, ['definitions', 'definition', 'definisi', 'meanings']);
  const definitions = Array.isArray(definitionsRaw) ? definitionsRaw : definitionsRaw == null ? [] : [definitionsRaw];
  const definitionTexts = definitions.flatMap((item) => {
    if (typeof item === 'string') return item.trim() ? [item.trim()] : [];
    if (item && typeof item === 'object') {
      const v = item.definition ?? item.definisi ?? item.meaning ?? item.text;
      return typeof v === 'string' && v.trim() ? [v.trim()] : [];
    }
    return [];
  }).slice(0, 100);
  const labels = definitions.flatMap((definition) =>
    definition && typeof definition === 'object' && Array.isArray(definition.labels)
      ? definition.labels.filter((label) => label && typeof label === 'object').map((label) => ({
          kind: typeof label.kind === 'string' ? label.kind : null,
          value: typeof (label.value ?? label.label ?? label.text) === 'string' ? (label.value ?? label.label ?? label.text) : null,
        }))
      : []);
  const pos = labels.filter((label) => label.kind?.toLowerCase() === 'kelas kata' && label.value).map((label) => label.value);
  const explicitPos = strings(pick(first, ['partOfSpeech', 'part_of_speech', 'wordClass', 'kelasKata', 'kelas_kata', 'pos']));
  const baseKeys = ['baseWord', 'base_word', 'rootWord', 'root_word'];
  const base = pick(first, baseKeys);
  const rootLemma = pick(root, ['lemma', 'lema', 'word']);
  const entryLemma = pick(first, ['lemma', 'lema', 'word', 'entry']);
  const entry = pick(first, ['entry', 'formattedEntry', 'formatted_entry']);
  return {
    api_json_valid: true,
    api_lemma: typeof (rootLemma ?? entryLemma) === 'string' && (rootLemma ?? entryLemma).trim() ? (rootLemma ?? entryLemma).trim() : null,
    api_base_word: typeof base === 'string' ? base.trim() : base ?? null,
    api_base_word_present: has(first, baseKeys),
    api_entry: typeof entry === 'string' && entry.trim() ? entry.trim() : null,
    api_definitions: definitionTexts,
    api_part_of_speech: [...new Set([...explicitPos, ...pos])],
    api_definition_labels: labels.slice(0, 100),
    api_variants: strings(pick(first, ['variants', 'variant'])),
    api_entry_variants: strings(pick(first, ['entryVariants', 'entry_variants'])),
    api_non_standard_words: strings(pick(first, ['nonStandardWords', 'non_standard_words'])),
    api_compound_words: strings(pick(first, ['compoundWords', 'compound_words'])),
    api_derived_words: strings(pick(first, ['derivedWords', 'derived_words'])),
    api_top_level_keys: Object.keys(root).slice(0, 40),
    api_entries_count: Array.isArray(root.entries) || Array.isArray(parsed) ? objects.length : 1,
    api_entry_ambiguous: objects.length > 1,
  };
}
