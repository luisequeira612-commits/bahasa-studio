---
name: quality-regression-preflight
description: Run and interpret Bahasa Studio's local quality and regression checks before proposing a focused PR. Use for technical preflight, test failures, or change validation.
---

# Quality regression preflight

## Before running

Read `AGENTS.md` and `PROJECT_RULES.md`. Inspect the branch and working tree. Never discard or overwrite existing changes.

## Allowed checks

When Node.js and dependencies are already available, use:

- `npm run quality:tests`
- `npm run quality:audit`
- `npm run quality:queue`
- `npm run quality:local`

For a focused change, run the relevant existing test first, then the complete quality suite. The repository CI remains the final regression gate.

Do not install dependencies, update lockfiles, invoke remote installers, access secrets, or execute downloaded scripts unless explicitly authorized.

## Interpret results

- Report exact command and exit status.
- Distinguish test failures from environment/setup failures.
- Preserve complete error messages and relevant test names.
- Do not claim success when a command was skipped or unavailable.
- A green suite proves only the covered assertions.
- Never treat passing CI as linguistic certification.

## PR readiness

A proposed PR must have one coherent functional purpose, minimal scope, evidence, test results, risks, and unresolved questions. Do not modify `main` directly. Do not change curriculum or backups unless explicitly tasked. Never merge unless all required checks are green and no known blocker remains.
