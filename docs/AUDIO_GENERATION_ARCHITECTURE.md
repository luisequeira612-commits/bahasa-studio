# Audio generation architecture

Status: implemented foundation; Indonesian remains the only configured language (17 Nov 2026).

## Runtime boundary

- GitHub Actions is the generation environment. TTS packages and model weights are installed/downloaded only on the runner.
- Model, tokenizer, Hugging Face, Transformers and Torch caches live under the runner's temporary directory (`RUNNER_TEMP`), never under the repository checkout.
- The generator removes its model cache when the Python process exits; the workflow also removes the dedicated cache in an `always()` cleanup step.
- Pip installation disables its download cache. No model weights are staged, committed, uploaded as an Actions artifact, or deployed to GitHub Pages.
- Only generated audio, its index/manifest/metadata, and evaluation samples are eligible for repository output.

## Separation of responsibilities

1. Curriculum text and IDs are exported into a manifest.
2. A TTS engine adapter turns each text into a temporary raw audio file.
3. FFmpeg converts the result into the repository's delivery formats.
4. The static audio library is served by GitHub Pages and can be downloaded by the app for offline playback.
5. The app does not load TTS models and does not call a TTS service during study.

## Adding a language later

When the owner authorizes another course (English is planned only after Indonesian reaches B2), add that language's curriculum manifest and language-specific TTS profile: locale, supported engine/voice, pinned model revision and checksum where applicable, license/attribution, and output namespace. Reuse the temporary model-cache lifecycle and audio encoding pipeline. Do not put model files in Git, Pages, app downloads, IndexedDB, or backup JSON v3.

A new language must not be enabled until its model/voice license permits the intended redistribution of generated audio. A small listening sample must be reviewed before full-library generation. The current Indonesian paths and production library are preserved; this change does not claim that a second language is already supported.

## Storage and size controls

- Measure the generated audio output per language and in total before merging.
- Keep Actions sample artifacts short-lived and limited to audio samples; never upload model caches.
- Keep the published Pages site below GitHub's 1 GB maximum; use a safety margin rather than targeting the limit.
- GitHub Actions artifact storage and cache quotas are separate from the Pages published-site limit. Do not use Actions artifacts as permanent model storage.

## Compatibility constraints

No new runtime or Python dependencies are introduced by this architecture change. The app remains static, free, offline-first, and without accounts or a backend. IndexedDB and backup JSON v3 are unchanged.
