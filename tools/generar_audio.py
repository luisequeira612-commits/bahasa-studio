#!/usr/bin/env python3
"""Generate Guardi's pre-generated multilingual Piper audio library."""
from __future__ import annotations
import argparse, hashlib, json, os, shutil, subprocess, tempfile, wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "tools" / "audio-voices.json"
MANIFEST = ROOT / "audio" / "manifest-multilingual.json"
PIPER_VERSION = "1.8.0"

def normalize(text: str) -> str:
    return " ".join(str(text).strip().split()).lower()

def text_hash(text: str) -> str:
    return hashlib.sha1(normalize(text).encode("utf-8")).hexdigest()[:12]

def load_config() -> dict:
    data = json.loads(CONFIG.read_text(encoding="utf-8"))
    if not data:
        raise RuntimeError("audio-voices.json está vacío")
    return data

def export_texts() -> list[dict]:
    output = ROOT / "audio" / ".generated-manifest.json"
    subprocess.run([
        "node", "scripts/export-audio-manifest.mjs", "--all-languages",
        "--output", str(output)
    ], cwd=ROOT, check=True)
    return json.loads(output.read_text(encoding="utf-8"))

def download_piper_model(model_id: str, model_path: str, revision: str, cache_dir: Path) -> tuple[Path, Path]:
    base = f"https://huggingface.co/rhasspy/piper-voices/resolve/{revision}/{model_path}"
    voice_dir = cache_dir / revision / model_path
    voice_dir.mkdir(parents=True, exist_ok=True)
    stem = model_id
    onnx = voice_dir / f"{stem}.onnx"
    meta = voice_dir / f"{stem}.onnx.json"
    card = voice_dir / "MODEL_CARD"
    if not onnx.exists():
        subprocess.run(["curl", "--fail", "--location", "--retry", "3",
                        f"{base}/{stem}.onnx", "-o", str(onnx)], check=True)
    if not meta.exists():
        subprocess.run(["curl", "--fail", "--location", "--retry", "3",
                        f"{base}/{stem}.onnx.json", "-o", str(meta)], check=True)
    if not card.exists():
        subprocess.run(["curl", "--fail", "--location", "--retry", "3",
                        f"{base}/MODEL_CARD", "-o", str(card)], check=True)
    return onnx, card

def render_batch(model: Path, jobs: list[dict]) -> None:
    """Load one Piper model once and synthesize all its texts through the Python API."""
    from piper import PiperVoice

    voice = PiperVoice.load(str(model))
    for job in jobs:
        job["raw"].parent.mkdir(parents=True, exist_ok=True)
        with wave.open(str(job["raw"]), "wb") as wav_file:
            voice.synthesize_wav(job["text"], wav_file)

def encode(raw: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(raw),
        "-ac", "1", "-ar", "24000", "-c:a", "libmp3lame", "-b:a", "32k",
        str(destination)
    ], check=True)

def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--language", action="append")
    args = parser.parse_args()
    config = load_config()
    selected = set(args.language or config.keys())
    unknown = selected - set(config)
    if unknown:
        raise SystemExit(f"Idiomas desconocidos: {', '.join(sorted(unknown))}")

    texts = [item for item in export_texts() if item.get("language") in selected]
    if not texts:
        raise SystemExit("No se exportaron textos de los cursos seleccionados.")

    cache = Path(os.environ.get("RUNNER_TEMP", tempfile.gettempdir())) / "guardi-piper-models"
    cache.mkdir(parents=True, exist_ok=True)
    active_codes = sorted({item["language"] for item in texts})
    previous_manifest = {}
    if MANIFEST.exists():
        try:
            parsed = json.loads(MANIFEST.read_text(encoding="utf-8"))
            if isinstance(parsed, dict):
                previous_manifest = parsed
        except (json.JSONDecodeError, OSError):
            previous_manifest = {}
    previous_revisions = previous_manifest.get("voice_revisions", {})
    can_reuse_version = previous_manifest.get("piper_version") == PIPER_VERSION
    models = {}
    for code in active_codes:
        cfg = config[code]
        if cfg["engine"] != "piper":
            raise RuntimeError(f"Motor no permitido para producción: {code}")
        model, card = download_piper_model(
            cfg["model"], cfg["model_path"], cfg["revision"], cache
        )
        models[code] = model
        published_card = ROOT / "audio" / "voices" / code / "MODEL_CARD"
        published_card.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(card, published_card)

    generated = reused = 0
    entries = []
    pending = {code: [] for code in active_codes}
    with tempfile.TemporaryDirectory() as tmp:
        tmpdir = Path(tmp)
        for item in texts:
            code = item["language"]
            cfg = config[code]
            digest = text_hash(item["text"])
            relative = f"audio/{code}/{digest}.mp3"
            destination = ROOT / relative
            can_reuse_voice = previous_revisions.get(code) == cfg["revision"]
            if destination.exists() and not args.force and can_reuse_version and can_reuse_voice:
                reused += 1
            else:
                pending[code].append({
                    "text": item["text"],
                    "raw": tmpdir / f"{code}-{digest}.wav",
                    "destination": destination
                })
            entries.append({
                "id": digest, "language": code, "locale": cfg["locale"],
                "text": item["text"], "file": "./" + relative,
                "sources": item.get("sources", [])
            })

        for code in active_codes:
            jobs = pending[code]
            if not jobs:
                continue
            render_batch(models[code], jobs)
            for job in jobs:
                encode(job["raw"], job["destination"])
                generated += 1

    entries.sort(key=lambda x: (x["language"], x["id"]))
    for entry in entries:
        levels = entry.get("levels") or [
            source.get("level") for source in entry.get("sources", [])
            if source.get("level") in {"A1", "A2", "B1", "B2"}
        ]
        entry["levels"] = [level for level in ("A1", "A2", "B1", "B2") if level in set(levels)]

    manifest = {
        "version": 2,
        "engine": "piper",
        "piper_version": PIPER_VERSION,
        "voice_revisions": {code: config[code]["revision"] for code in active_codes},
        "languages": config,
        "entries": entries
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                        encoding="utf-8")

    for code in active_codes:
        language_entries = [entry for entry in entries if entry["language"] == code]
        if not language_entries:
            continue
        audio_hashes = {}
        for entry in language_entries:
            audio_file = ROOT / entry["file"].removeprefix("./")
            if not audio_file.is_file():
                raise RuntimeError(f"Falta el MP3 generado: {audio_file}")
            audio_hashes[entry["id"]] = sha256_file(audio_file)

        if code == "id":
            inventory_path = ROOT / "audio" / "manifest.json"
            metadata_path = ROOT / "audio" / "metadata.json"
        else:
            inventory_path = ROOT / "audio" / code / "manifest.json"
            metadata_path = ROOT / "audio" / code / "metadata.json"
        inventory_path.parent.mkdir(parents=True, exist_ok=True)
        metadata_path.parent.mkdir(parents=True, exist_ok=True)
        inventory_path.write_text(
            json.dumps(language_entries, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8"
        )
        metadata = {}
        if metadata_path.exists():
            try:
                parsed_metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
                if isinstance(parsed_metadata, dict):
                    metadata = parsed_metadata
            except json.JSONDecodeError:
                metadata = {}
        metadata.update({
            "engine": "piper",
            "voice": "Piper / " + config[code]["model"],
            "model": config[code]["model"],
            "repository": config[code]["repository"],
            "revision": config[code]["revision"],
            "piper_version": PIPER_VERSION,
            "model_card": "./audio/voices/" + code + "/MODEL_CARD",
            "model_license": "See MODEL_CARD for voice and dataset terms",
            "model_license_url": "./audio/voices/" + code + "/MODEL_CARD",
            "model_attribution": "Consult MODEL_CARD for source dataset and required attribution",
            "formats": ["mp3"],
            "audio_hashes": audio_hashes
        })
        metadata_path.write_text(
            json.dumps(metadata, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8"
        )
    attribution_lines = [
        "# Atribución de voces Piper",
        "",
        "Los modelos ONNX se descargan solo en el runner de generación y no se distribuyen en este repositorio.",
        "Las fichas oficiales de cada voz usada se conservan en `audio/voices/<idioma>/MODEL_CARD`.",
        "",
        "Repositorio: https://huggingface.co/rhasspy/piper-voices",
        "Revisión fijada: " + ", ".join(sorted({config[code]["revision"] for code in active_codes})),
        "",
        "## Voces usadas",
        ""
    ]
    for code in sorted(active_codes):
        cfg = config[code]
        attribution_lines.append("- **" + cfg["name"] + "** (`" + code + "`): `" + cfg["model"] + "` — [MODEL_CARD](./voices/" + code + "/MODEL_CARD)")
    attribution_lines.extend([
        "",
        "La MODEL_CARD de cada voz es la fuente de verdad para dataset, licencia, cadena de entrenamiento y atribución.",
        "Conservar estas fichas al redistribuir los clips generados."
    ])
    (ROOT / "audio" / "VOICE_ATTRIBUTION.md").write_text(
        "\n".join(attribution_lines) + "\n", encoding="utf-8"
    )
    (ROOT / "audio" / ".generated-manifest.json").unlink(missing_ok=True)
    total = sum(p.stat().st_size for p in (ROOT / "audio").rglob("*.mp3"))
    print(f"Piper: {generated} nuevos, {reused} reutilizados, {len(entries)} textos.")
    print(f"Tamaño total MP3: {total / 1024 / 1024:.2f} MiB.")
    for code in sorted(selected):
        print(f"{code}: {sum(e['language'] == code for e in entries)} textos")

if __name__ == "__main__":
    main()
