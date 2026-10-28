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

Replace the example URL with an actual endpoint you have verified. Do not
paste secrets or API keys into a committed file or shell history. If the
provider requires a key, keep it out of the repository and adapt the script
locally; the default workflow needs no key. Use `--limit 5` to test a small
sample before running all pending terms. HTTP errors and timeouts are recorded
instead of aborting the whole batch. Responses are clipped to 12,000 characters
per entry to keep the review file manageable.

The script intentionally does **not** assume one provider's JSON schema and
does not treat HTTP 200 as a successful dictionary match. API responses are
saved as leads for a person to inspect. It does not automatically strip
Indonesian prefixes, infer lemmas, update CSV fields, or mark anything verified.

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
