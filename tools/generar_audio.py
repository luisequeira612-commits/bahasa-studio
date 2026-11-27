#!/usr/bin/env python3
"""Generate Guardi's pre-generated multilingual Piper audio library."""
from __future__ import annotations
import argparse, hashlib, json, os, subprocess, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "tools" / "audio-voices.json"
MANIFEST = ROOT / "audio" / "manifest.json"

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

def download_piper_model(model_path: str, cache_dir: Path) -> Path:
    base = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/{model_path}"
    voice_dir = cache_dir / model_path
    voice_dir.mkdir(parents=True, exist_ok=True)
    stem = Path(model_path).name
    onnx = voice_dir / f"{stem}.onnx"
    meta = voice_dir / f"{stem}.onnx.json"
    if not onnx.exists():
        subprocess.run(["curl", "--fail", "--location", "--retry", "3",
                        f"{base}/{stem}.onnx", "-o", str(onnx)], check=True)
    if not meta.exists():
        subprocess.run(["curl", "--fail", "--location", "--retry", "3",
                        f"{base}/{stem}.onnx.json", "-o", str(meta)], check=True)
    return onnx

def render(model: Path, text: str, raw_wav: Path) -> None:
    subprocess.run(["piper", "--model", str(model), "--output_file", str(raw_wav)],
                   input=text, text=True, check=True)

def encode(raw: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(raw),
        "-ac", "1", "-ar", "24000", "-c:a", "libmp3lame", "-b:a", "32k",
        str(destination)
    ], check=True)

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
    models = {}
    for code in selected:
        cfg = config[code]
        if cfg["engine"] != "piper":
            raise RuntimeError(f"Motor no permitido para producción: {code}")
        models[code] = download_piper_model(cfg["model_path"], cache)

    generated = reused = 0
    entries = []
    with tempfile.TemporaryDirectory() as tmp:
        tmpdir = Path(tmp)
        for item in texts:
            code = item["language"]
            cfg = config[code]
            digest = text_hash(item["text"])
            relative = f"audio/{code}/{digest}.mp3"
            destination = ROOT / relative
            if destination.exists() and not args.force:
                reused += 1
            else:
                raw = tmpdir / f"{code}-{digest}.wav"
                render(models[code], item["text"], raw)
                encode(raw, destination)
                generated += 1
            entries.append({
                "id": digest, "language": code, "locale": cfg["locale"],
                "text": item["text"], "file": "./" + relative,
                "sources": item.get("sources", [])
            })

    entries.sort(key=lambda x: (x["language"], x["id"]))
    manifest = {"version": 2, "engine": "piper",
                "languages": config, "entries": entries}
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                        encoding="utf-8")
    (ROOT / "audio" / ".generated-manifest.json").unlink(missing_ok=True)
    total = sum(p.stat().st_size for p in (ROOT / "audio").rglob("*.mp3"))
    print(f"Piper: {generated} nuevos, {reused} reutilizados, {len(entries)} textos.")
    print(f"Tamaño total MP3: {total / 1024 / 1024:.2f} MiB.")
    for code in sorted(selected):
        print(f"{code}: {sum(e['language'] == code for e in entries)} textos")

if __name__ == "__main__":
    main()
