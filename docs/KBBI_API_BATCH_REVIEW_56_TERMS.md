# Preliminary review: 56-term KBBI API batch

**Review date:** 2026-10-29  
**Input artifact:** `kbbi-api-review-56-terms.zip`  
**Artifact timestamp:** 2026-10-29T18:56:45.900Z  
**Scope:** technical/API triage only; no official KBBI verification was performed.

## Summary

- 56 records inspected.
- 49 requests returned HTTP 200 with valid JSON.
- 7 requests returned HTTP 404.
- 7 responses were flagged by the adapter as having multiple entries.
- All 56 records remain `reviewer_decision=not_reviewed`; the source tracker status remains `not_checked`.

HTTP 200 only confirms that the third-party endpoint returned a response. It does not establish that the official KBBI entry was checked, that the selected sense is correct, or that a Spanish gloss is pedagogically suitable. Likewise, HTTP 404 from the third-party API is not evidence that a term is absent from official KBBI.

## HTTP 404 retry queue

The following multiword expressions should be retried using a headword or component-word search, then checked manually against the official KBBI site:

| Vocabulary ID | Indonesian form | Next action |
|---|---|---|
| v423 | `Malam ini` | Search `malam`; review phrase usage separately |
| v441 | `Menyikat gigi` | Search `sikat` and `gigi`; verify derived form and collocation |
| v449 | `Ulangi` | Search `ulang`; verify the imperative/derived form |
| v452 | `Tidak mengerti` | Search `mengerti`; treat `tidak` as a separate function word |
| v465 | `Apa kabar?` | Search `apa` and `kabar`; review the greeting as a phrase |
| v470 | `Senang bertemu dengan Anda` | Search component headwords; assess the full phrase as usage, not one dictionary lemma |
| v473 | `Ke mana` | Search `mana` and the relevant particle/preposition usage |

## Multiple-entry review queue

The adapter flagged these seven records for sense disambiguation:

| Vocabulary ID | Form | Human review focus |
|---|---|---|
| v413 | `Belok` | Confirm the relevant everyday sense and word class |
| v416 | `Sebentar` | Select the temporal/adverbial sense used in the lesson |
| v429 | `Pesawat` | Confirm the intended travel-related sense, usually “aircraft/airplane” |
| v439 | `Sering` | Verify the intended frequency meaning (“often”); do not accept an unrelated first result |
| v451 | `Mengerti` | Confirm the “understand” sense and derived form |
| v453 | `Tunggu` | Confirm the intended “wait” use and grammatical form |
| v457 | `Ramah` | Confirm the “friendly/kind” sense |

This list is a triage queue, not a declaration that the API's first result is wrong or that the official entry has a particular sense. Review the official entry and the lesson context before recording a decision.

## Recommended review procedure

1. Open the official KBBI VI Daring search: <https://kbbi.kemendikdasmen.go.id/>.
2. Record the official entry URL, access date, relevant sense/word class, and the reviewer’s decision.
3. For multiword expressions, check component lemmas and separately judge whether the complete phrase is natural and appropriate for A1.
4. Review the Spanish gloss, Indonesian example, translation, naturalness, accepted answers, and BIPA 1 fit as separate checks.
5. Change the tracker only after human review of source evidence. Keep `KBBI_status=not_checked` until that evidence is recorded.

## Source and licensing caveat

The batch used a third-party API at `kbbi.raf555.dev`, not the official KBBI website. Treat the responses as leads only. The official KBBI Daring site states that its contents are protected by copyright; do not redistribute copied dictionary data without confirming applicable terms.

## Outcome

The 56-term run is useful as a technical smoke test and has produced a prioritized manual-review queue. It does **not** complete the official KBBI audit and does not justify changing any verification status.
