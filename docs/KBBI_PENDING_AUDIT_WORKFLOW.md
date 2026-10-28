# Auditing pending Indonesian vocabulary (zero-cost workflow)

This workflow helps review entries marked `not_checked` in
`docs/A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv`. It does not change the tracker,
application data, or verification statuses.

## Requirements

- Node.js 18 or newer (built-in `fetch`; no npm packages or API key required).
- A local checkout of this branch.
- Optional: a free/authorized HTTPS dictionary endpoint you have tested.

## 1. Create a review queue without making network requests

From the repository root:

```sh
node scripts/audit-kbbi-pending.mjs
```

The default output is `artifacts/kbbi-review-queue.json`. The `artifacts/`
directory is generated output; review the JSON locally and do not commit it
unless there is a clear project need. To write somewhere else:

```sh
node scripts/audit-kbbi-pending.mjs --output /tmp/kbbi-review-queue.json
```

The script reads CSV with quoted commas, quotes, and multiline cells correctly
and only selects rows whose `KBBI_status` is exactly `not_checked`.

## 2. Optional: collect leads from an API

The API adapter is deliberately generic because public deployments can change,
go offline, impose rate limits, or have different response formats. After
checking an endpoint's documentation, pass a URL template containing
`{word}`; the script URL-encodes the original Indonesian form and makes
sequential requests over HTTPS:

```sh
node scripts/audit-kbbi-pending.mjs \
  --api-template 'https://YOUR-TESTED-ENDPOINT.example/entry/{word}' \
  --delay-ms 1200 \
  --timeout-ms 10000
```

A documented public candidate is the `raf555/kbbi-api` service. Its README
shows the endpoint pattern `https://kbbi.raf555.dev/api/v1/entry/{word}` and
sample JSON fields such as `lemma`, `baseWord`, and `definitions`. The
maintainer notes that dictionary data belongs to the Indonesian language
authority; check current terms before reuse. The hosted service is third-party
and may be unavailable or change, so treat this as a trial—not a guarantee of
uptime or permission to redistribute its data.

Test just five pending terms first:

```sh
node scripts/audit-kbbi-pending.mjs \
  --api-template 'https://kbbi.raf555.dev/api/v1/entry/{word}' \
  --limit 5 \
  --delay-ms 1200 \
  --output /tmp/kbbi-api-smoke-test.json
```

Inspect each `http_status`, `fetch_error`, and `response_excerpt` in the
output. For JSON responses, the script also extracts best-effort fields
`api_lemma`, `api_base_word`, `api_definitions`, `api_part_of_speech`,
`api_json_valid`, `api_variants`, `api_non_standard_words`, `api_compound_words`,
`api_derived_words`, and `api_top_level_keys`. These are convenience summaries of
common field names, not a guarantee that every provider schema is understood;
keep `response_excerpt` as the raw evidence and manually inspect unfamiliar
structures. A failed request should be recorded as a failed source attempt, not as
evidence that the word is absent. Do not run all 56 until the five-term sample
works and its responses are useful. Do not paste secrets or API keys into a
committed file or shell history. HTTP errors and timeouts are recorded instead
of aborting the whole batch. Responses are clipped to 12,000 characters per
entry to keep the review file manageable.

The script intentionally does **not** assume one provider's JSON schema and
does not treat HTTP 200 as a successful dictionary match. API responses are
saved as leads for a person to inspect. It does not automatically strip
Indonesian prefixes, infer lemmas, update CSV fields, or mark anything verified.


## 2A. Run the collection from GitHub Actions (no terminal commands)

The repository includes `.github/workflows/kbbi-manual-audit.yml`. Once this
workflow is present on the repository's default branch, a maintainer can open
**Actions → Manual KBBI pending audit → Run workflow** and choose 5, 10, 20, or
56 pending terms. Start with **5** and inspect the artifact before requesting
the full batch.

When the run finishes, download the artifact named
`kbbi-api-review-N-terms` from the workflow run summary. It contains
`kbbi-api-review.json`, including response excerpts and best-effort parsed
fields. The workflow does not commit results, edit the tracker, or mark terms
verified. Artifacts are retained for 14 days.

Because GitHub only offers `workflow_dispatch` for workflows present on the
default branch, adding this file to a pull request does not make the button
available until that change is merged. Do not merge solely to enable this step
without the repository owner's approval.

## 3. Review rules

For every term, record evidence and make a human decision:

1. Open the linked primary KBBI entry where available and confirm the relevant
   sense, not just a similar spelling or a derived form.
2. If the official site is unavailable, record the failure and use a secondary
   source only as secondary evidence. Do not label it `verified_primary`.
3. Review Spanish gloss, Indonesian example, Spanish translation, naturalness,
   accepted answers, and BIPA 1 fit as separate checks. A dictionary lookup
   cannot establish those by itself.
4. Check the code and data licenses before using or redistributing third-party
   dictionary data. A public GitHub repository or free API is not blanket
   permission to copy its dataset.
5. Only update the tracker after evidence is inspected. Preserve the source URL,
   date, relevant sense, and any limitation in reviewer notes.

## Why this is offline-first

No dictionary API is added to the app's runtime, no API key is required, and
normal app use is unaffected if a public service goes down. The generated queue
is disposable and the source tracker remains the authoritative audit record.

## Nested API response handling

The summarizer supports responses shaped like `{ lemma, entries: [...] }`, including
definitions nested under `entries[0].definitions`. Grammatical categories are
also read from definition labels whose `kind` is `Kelas Kata`. The output
preserves whether `baseWord` exists even when its value is an empty string,
captures entry variants, and flags multiple returned entries or a lemma that
differs from the queried form for human review. These flags are not verification
decisions; keep every tracker status pending until a reviewer checks the primary
KBBI source.
