# KBBI follow-up triage — 2026-10-29

## Scope and evidence standard

This note records a limited follow-up to the 56-term third-party API review batch. A third-party API HTTP 404 means only that the requested API path did not return an entry; it is **not** evidence that the word or phrase is absent from the official KBBI. Likewise, an HTTP 200 response is not official-source verification.

The official KBBI VI Daring search supports lookup of entries and, for registered users, additional derived-word and compound-expression navigation. Its April 2026 update notice also describes editorial changes to entries and senses. See:
- Official search: https://kbbi.kemendikdasmen.go.id/
- Official feature guide: https://kbbi.kemendikdasmen.go.id/Beranda/Fitur
- Official update note: https://kbbi.kemendikdasmen.go.id/Beranda/Pemutakhiran

## Official-source spot-check added in this pass

### `sebentar` — official entry accessible

Source: https://kbbi.kemendikdasmen.go.id/entri/sebentar

The official entry presents:
- adjective sense: a short time / not long, with the example `tunggulah sebentar`;
- adverbial senses including `nanti` (“later”) and `kadang-kadang` (“sometimes”).

This supports the lexical range of `sebentar`, including its use in a “wait a moment” context. It does **not** independently verify any complete lesson sentence, Spanish translation, accepted answer, or pedagogical suitability.

## Queue handling rules

### Third-party API 404 queue

Items in the uploaded batch:
- v423 `Malam ini`
- v441 `Menyikat gigi`
- v449 `Ulangi`
- v452 `Tidak mengerti`
- v465 `Apa kabar?`
- v470 `Senang bertemu dengan Anda`
- v473 `Ke mana`

Next lookup should be component-by-component in the official KBBI where appropriate (for example, inspect component lemmas rather than treating a multiword phrase as a single lemma). Phrase meaning, pragmatics, register, and translation must be reviewed separately. A component-lemma hit must not be reported as verification of the full phrase.

### Multiple-entry review queue

- v413 `Belok` (5 entries)
- v416 `Sebentar` (2 entries)
- v429 `Pesawat` (2 entries)
- v439 `Sering` (5 entries)
- v451 `Mengerti` (2 entries)
- v453 `Tunggu` (2 entries)
- v457 `Ramah` (2 entries)

For each term, record the exact official entry URL, relevant part of speech and sense, and the lesson context before choosing a sense. Do not select a sense solely from entry count or from the third-party API response.

## Audit status

No rows in `docs/A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv` were changed by this note. No term was promoted to `verified_primary`. The 404 and multiple-entry queues remain open for human review.
