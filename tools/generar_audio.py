#!/usr/bin/env python3
"""Generate Guardi's pre-generated multilingual Piper audio library."""
from __future__ import annotations
import argparse, hashlib, json, os, shutil, subprocess, tempfile
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

def download_piper_model(model_id: str, model_path: str, revision: str, cache_dir: Path) -> tuple[Path, Path]:
    base = f"https://huggingface.co/rhasspy/piper-voices/resolve/{revision}/{model_path}"
    voice_dir = cache_dir / model_path
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
    active_codes = sorted({item["language"] for item in texts})
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
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\\n",
                        encoding="utf-8")
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
        "\\n".join(attribution_lines) + "\\n", encoding="utf-8"
    )
    (ROOT / "audio" / ".generated-manifest.json").unlink(missing_ok=True)
    total = sum(p.stat().st_size for p in (ROOT / "audio").rglob("*.mp3"))
    print(f"Piper: {generated} nuevos, {reused} reutilizados, {len(entries)} textos.")
    print(f"Tamaño total MP3: {total / 1024 / 1024:.2f} MiB.")
    for code in sorted(selected):
        print(f"{code}: {sum(e['language'] == code for e in entries)} textos")

if __name__ == "__main__":
    main()
