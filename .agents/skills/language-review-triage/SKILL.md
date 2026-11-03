---
name: language-review-triage
description: Triage Indonesian-Spanish vocabulary, example pairs, accepted answers, and exercise language as unverified editorial hypotheses. Use when reviewing language quality or prioritizing the editorial queue.
---

# Language review triage

## Context and limits

The project has no Indonesian native speaker available for validation. KBBI is not a required dependency and must never block this workflow. The goal is to prioritize useful review, not to manufacture certainty.

Read `AGENTS.md`, `PROJECT_RULES.md`, `docs/INDEPENDENT_CURRICULUM_QUALITY_SYSTEM.md`, and `docs/DEEPSEEK_HARNESS_INTEGRATION.md` first.

## Procedure

1. Start from the existing editorial queue. Do not create a competing source of truth.
2. Preserve each `review_id`, level, unit, source path, vocabulary ID, and current review status.
3. Compare a vocabulary entry with its example pair, nearby lessons, grammar focus, previously introduced vocabulary, and exercises that use it.
4. Identify:
   - Spanish glosses that appear inconsistent within the curriculum;
   - Indonesian forms that are inconsistent across repeated IDs;
   - examples whose Spanish translation appears misaligned with the Indonesian sentence;
   - possible vocabulary introduced before its teaching point;
   - accepted answers that appear too narrow or unexpectedly broad;
   - exercise prompts that may allow multiple reasonable answers.
5. Do not assume a phrase is wrong solely because it is unfamiliar. Consider context, register, morphology, pragmatic meaning, and alternative valid readings.
6. Use external sources only if the user explicitly authorizes network research and the source can be cited accurately. Do not invent native-speaker confirmation or dictionary evidence.
7. For each candidate, assign:
   - category: `editorial_review`, `linguistic_hypothesis`, or `pending_evidence`;
   - confidence: high, medium, or low, with a reason;
   - severity: blocker, high, medium, low, or informational;
   - evidence: exact paired text and stable source path/ID;
   - proposed question or correction, not an automatic edit.
8. Keep uncertain issues pending. Never change `not_reviewed`, `not_checked`, or similar statuses to approved.

## Output

Return a Spanish triage table grouped by A1/A2 and priority. Distinguish what the code proves from what language analysis merely suggests. Do not modify source curriculum, translation, accepted answers, or trackers. Corrections require a separately authorized branch/PR and regression tests.
