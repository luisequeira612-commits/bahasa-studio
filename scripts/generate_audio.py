#!/usr/bin/env python3
"""Generate Indonesian audio in GitHub Actions; no local computer is required."""
from __future__ import annotations

import argparse
import asyncio
import hashlib
import html
import re
import json
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.request
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "audio" / "manifest.json"
PIPER_VOICE = "id_ID-news_tts-medium"
PIPER_REVISION = "7c89b592e94392a56c789bd35a860fec66a6583f"
MMS_MODEL_ID = "facebook/mms-tts-ind"
MMS_MODEL_REVISION = "171b004ccd54f266a31efee71f1ad850c91d39c0"
MMS_MODEL_LICENSE = "CC BY-NC 4.0"
MMS_MODEL_SHA256 = "d56181bae3a51458aab6b4a893ecd71d0fde69378f576c53e139b59940d80ca0"
PIPER_BASE = f"https://huggingface.co/rhasspy/piper-voices/resolve/{PIPER_REVISION}/id/id_ID/news_tts/medium"
LEVELS = ("A1", "A2", "B1", "B2", "all")


def normalize(text: str) -> str:
    return " ".join(text.strip().split()).lower()


def download_piper_model(model_dir: Path) -> Path:
    model_dir.mkdir(parents=True, exist_ok=True)
    model = model_dir / f"{PIPER_VOICE}.onnx"
    config = model_dir / f"{PIPER_VOICE}.onnx.json"
    assets = [
        (model, f"{PIPER_BASE}/{PIPER_VOICE}.onnx", "17de01db7ac654655436b6e509893c72"),
        (config, f"{PIPER_BASE}/{PIPER_VOICE}.onnx.json", "c023cfa031cc9ed4cf5dd8d2ef1e48ed"),
    ]
    for target, url, expected_md5 in assets:
        if target.exists() and hashlib.md5(target.read_bytes()).hexdigest() == expected_md5:
            continue
        request = urllib.request.Request(url, headers={"User-Agent": "BahasaStudio-AudioGenerator/1.0"})
        with urllib.request.urlopen(request, timeout=90) as response, target.open("wb") as output:
            shutil.copyfileobj(response, output)
        actual = hashlib.md5(target.read_bytes()).hexdigest()
        if actual != expected_md5:
            target.unlink(missing_ok=True)
            raise RuntimeError(f"Checksum mismatch downloading {target.name}: {actual}")
    return model


def verify_mms_model_checksum(model_path: Path) -> str:
    digest = hashlib.sha256()
    with model_path.open("rb") as model_file:
        for chunk in iter(lambda: model_file.read(1024 * 1024), b""):
            digest.update(chunk)
    actual = digest.hexdigest()
    if actual != MMS_MODEL_SHA256:
        raise RuntimeError(
            "MMS model checksum mismatch for "
            f"{model_path.name}: expected {MMS_MODEL_SHA256}, got {actual}"
        )
    return actual


def create_synthesizer(engine: str, voice: str, work_dir: Path):
    if engine == "edge":
        import edge_tts

        async def synth(text: str, output: Path):
            last_error = None
            for attempt in range(3):
                try:
                    await edge_tts.Communicate(text, voice, rate="+0%").save(str(output))
                    return
                except Exception as error:
                    last_error = error
                    if attempt < 2:
                        await asyncio.sleep(2 * (attempt + 1))
            raise RuntimeError(f"edge-tts failed after 3 attempts: {last_error}")

        return lambda text, output: asyncio.run(synth(text, output)), f"Edge TTS / {voice}"

    if engine == "piper":
        from piper import PiperVoice

        model_path = download_piper_model(work_dir / "piper")
        piper_voice = PiperVoice.load(str(model_path))

        def synth(text: str, output: Path):
            with wave.open(str(output), "wb") as wav_file:
                piper_voice.synthesize_wav(text, wav_file)

        return synth, f"Piper / {PIPER_VOICE}"

    if engine == "mms":
        import numpy as np
        import torch
        from huggingface_hub import hf_hub_download
        from transformers import AutoModelForTextToWaveform, AutoTokenizer
        from scipy.io import wavfile

        model_weights = Path(hf_hub_download(
            repo_id=MMS_MODEL_ID,
            filename="model.safetensors",
            revision=MMS_MODEL_REVISION,
        ))
        verify_mms_model_checksum(model_weights)
        tokenizer = AutoTokenizer.from_pretrained(MMS_MODEL_ID, revision=MMS_MODEL_REVISION)
        model = AutoModelForTextToWaveform.from_pretrained(MMS_MODEL_ID, revision=MMS_MODEL_REVISION).to("cpu")
        model.eval()

        def synth(text: str, output: Path):
            inputs = tokenizer(text, return_tensors="pt")
            with torch.inference_mode():
                waveform = model(**inputs).waveform[0].cpu().numpy()
            wavfile.write(str(output), model.config.sampling_rate, np.asarray(waveform, dtype=np.float32))

        return synth, f"MMS / {MMS_MODEL_ID}@{MMS_MODEL_REVISION[:12]}"

    raise ValueError(f"Unsupported engine: {engine}")


def encode_audio(source: Path, destination: Path, codec_name: str):
    if codec_name == "mp3":
        codec = ["-c:a", "libmp3lame", "-b:a", "32k"]
    elif codec_name == "sample-mp3":
        codec = ["-c:a", "libmp3lame", "-b:a", "48k"]
    elif codec_name == "opus":
        codec = ["-c:a", "libopus", "-b:a", "24k", "-vbr", "on", "-f", "ogg"]
    else:
        raise ValueError(f"Unsupported output codec: {codec_name}")
    command = [
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(source),
        "-ac", "1", "-ar", "24000", *codec, str(destination)
    ]
    subprocess.run(command, check=True)


def ensure_single_voice(metadata_file: Path, engine: str, voice: str, allow_piper_replacement: bool = False):
    metadata_file.parent.mkdir(parents=True, exist_ok=True)
    expected = {"engine": engine, "voice": voice, "formats": ["opus", "mp3"]}
    if metadata_file.exists():
        existing = json.loads(metadata_file.read_text(encoding="utf-8"))
        core = {key: existing.get(key) for key in expected}
        if core != expected:
            if allow_piper_replacement and existing.get("engine") == "piper" and engine == "mms":
                metadata_file.write_text(json.dumps(expected, indent=2) + "\n", encoding="utf-8")
                return
            raise RuntimeError(
                "The production library is locked to one engine/voice. "
                f"Existing: {existing}; requested: {expected}. "
                "Do not mix voices between A1, A2, B1 and B2."
            )
    else:
        metadata_file.write_text(json.dumps(expected, indent=2) + "\n", encoding="utf-8")


def refresh_audio_hashes(metadata_file: Path, audio_dir: Path):
    metadata = json.loads(metadata_file.read_text(encoding="utf-8"))
    previous = metadata.get("audio_hashes")
    hashes = {
        audio_file.stem: hashlib.sha256(audio_file.read_bytes()).hexdigest()
        for audio_file in sorted(audio_dir.glob("*.mp3"))
    }
    changed = previous != hashes
    metadata["audio_hashes"] = hashes
    metadata_file.write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
    return hashes, changed


def bump_service_worker_cache_version(service_worker_file: Path):
    source = service_worker_file.read_text(encoding="utf-8")
    match = re.search(r"(const CACHE_NAME = 'bahasa-studio-v)(\d+)\.(\d+)\.(\d+)(';)", source)
    if not match:
        raise RuntimeError("Could not find the versioned Service Worker cache name")
    major, minor, patch = map(int, match.group(2, 3, 4))
    replacement = f"{match.group(1)}{major}.{minor}.{patch + 1}{match.group(5)}"
    service_worker_file.write_text(source[:match.start()] + replacement + source[match.end():], encoding="utf-8")
    return replacement


def render_samples_index(samples_dir: Path, samples: list[dict]):
    samples_dir.mkdir(parents=True, exist_ok=True)
    samples = sorted(samples, key=lambda item: (item.get("engine", ""), item.get("id", "")))
    sections = []
    for engine in sorted({item["engine"] for item in samples}):
        cards = []
        for item in samples:
            if item["engine"] != engine:
                continue
            text = html.escape(item["text"])
            src = html.escape(f"{engine}/{item['id']}.mp3", quote=True)
            cards.append(
                f'<article class="sample"><p>{text}</p>'
                f'<audio controls preload="none" src="{src}">Tu navegador no admite este audio.</audio>'
                f'<small>{html.escape(item.get("voice", engine))}</small></article>'
            )
        sections.append(f'<section><h2>{html.escape(engine.upper())}</h2>{"".join(cards)}</section>')
    body = "".join(sections) or "<p>Aún no hay muestras. Ejecuta el workflow desde GitHub Actions.</p>"
    page = f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Guardi — muestras de audio</title>
<style>
:root{{color-scheme:light dark;font-family:system-ui,sans-serif}}body{{max-width:720px;margin:0 auto;padding:20px;line-height:1.5}}
.sample{{padding:14px 0;border-bottom:1px solid #8885}}audio{{width:100%;max-width:440px}}small{{display:block;opacity:.7;margin-top:5px}}
</style></head><body><h1>Muestras de voz indonesia</h1>
<p>Audios sintéticos de evaluación. No constituyen certificación de pronunciación nativa.</p>{body}</body></html>"""
    (samples_dir / "index.html").write_text(page, encoding="utf-8")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--engine", choices=("edge", "piper", "mms"), required=True)
    parser.add_argument("--mode", choices=("samples", "full"), default="samples")
    parser.add_argument("--samples", action="store_true", help="alias for --mode samples")
    parser.add_argument("--level", choices=LEVELS, default="all")
    parser.add_argument("--limit", type=int, default=10, help="0 means all selected texts")
    parser.add_argument("--voice", default="id-ID-ArdiNeural")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--hash-only", action="store_true", help="refresh MP3 SHA-256 metadata without running TTS")
    args = parser.parse_args()
    if args.samples:
        args.mode = "samples"
    if args.limit < 0:
        parser.error("--limit cannot be negative")
    if args.hash_only:
        output_dir = ROOT / "audio" / "id"
        metadata_file = ROOT / "audio" / "metadata.json"
        hashes, changed = refresh_audio_hashes(metadata_file, output_dir)
        if changed:
            bump_service_worker_cache_version(ROOT / "service-worker.js")
        print(f"Refreshed SHA-256 for {len(hashes)} MP3 clips; library changed: {changed}")
        return
    if not MANIFEST.exists():
        parser.error("audio/manifest.json missing; run scripts/export-audio-manifest.mjs first")
    if shutil.which("ffmpeg") is None:
        parser.error("ffmpeg is required in the GitHub Actions runner")

    entries = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if args.level != "all":
        entries = [entry for entry in entries if args.level in entry.get("levels", [])]
    if args.mode == "samples" and args.limit:
        entries = entries[:args.limit]
    if args.mode == "full" and args.limit:
        entries = entries[:args.limit]

    if not entries:
        raise SystemExit("No curriculum texts matched the selected level/limit.")

    output_root = ROOT / ("audio-samples" if args.mode == "samples" else "audio/id")
    output_dir = output_root / args.engine if args.mode == "samples" else output_root
    output_dir.mkdir(parents=True, exist_ok=True)
    model_cache = ROOT / ".audio-model-cache"

    synthesize, voice_label = create_synthesizer(args.engine, args.voice, model_cache)
    sample_file = ROOT / "audio-samples" / "samples.json"
    if args.mode == "full":
        ensure_single_voice(
            ROOT / "audio" / "metadata.json", args.engine, voice_label,
            allow_piper_replacement=args.engine == "mms" and args.force,
        )
    existing_samples = json.loads(sample_file.read_text(encoding="utf-8")) if sample_file.exists() else []
    sample_map = {(item["engine"], item["id"]): item for item in existing_samples}

    available_ids = set()
    index_file = ROOT / "audio" / "index.json"
    if args.mode == "full" and index_file.exists():
        available_ids.update(json.loads(index_file.read_text(encoding="utf-8")))

    for position, entry in enumerate(entries, 1):
        if args.mode == "samples":
            destination = output_dir / f"{entry['id']}.mp3"
            if destination.exists() and not args.force:
                print(f"[{position}/{len(entries)}] cached {entry['id']}")
                continue
        else:
            opus_destination = output_dir / f"{entry['id']}.opus"
            mp3_destination = output_dir / f"{entry['id']}.mp3"
            if opus_destination.exists() and mp3_destination.exists() and not args.force:
                available_ids.add(entry["id"])
                print(f"[{position}/{len(entries)}] cached {entry['id']}")
                continue
        with tempfile.TemporaryDirectory() as temporary:
            raw_extension = ".mp3" if args.engine == "edge" else ".wav"
            raw = Path(temporary) / f"raw{raw_extension}"
            synthesize(entry["text"], raw)
            if args.mode == "samples":
                encode_audio(raw, destination, "sample-mp3")
            else:
                encode_audio(raw, opus_destination, "opus")
                encode_audio(raw, mp3_destination, "mp3")
        if args.mode == "full":
            available_ids.add(entry["id"])
        else:
            sample_map[(args.engine, entry["id"])] = {
                "engine": args.engine, "id": entry["id"], "text": entry["text"], "voice": voice_label
            }
        print(f"[{position}/{len(entries)}] {entry['id']} {entry['text']}")

    if args.mode == "samples":
        sample_file.parent.mkdir(parents=True, exist_ok=True)
        samples = list(sample_map.values())
        sample_file.write_text(json.dumps(samples, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        render_samples_index(ROOT / "audio-samples", samples)
        print(f"Samples page: audio-samples/index.html ({len(samples)} clips across engines)")
    else:
        index_file.parent.mkdir(parents=True, exist_ok=True)
        index_file.write_text(json.dumps(sorted(available_ids), indent=2) + "\n", encoding="utf-8")
        _, hashes_changed = refresh_audio_hashes(ROOT / "audio" / "metadata.json", output_dir)
        if hashes_changed:
            bump_service_worker_cache_version(ROOT / "service-worker.js")
        total_bytes = sum(path.stat().st_size for pattern in ("*.opus", "*.mp3") for path in output_dir.glob(pattern))
        print(f"Level {args.level}: {len(available_ids)} indexed clips; Opus + MP3 fallback size {total_bytes} bytes")


if __name__ == "__main__":
    main()
