#!/usr/bin/env python3
"""Generate/review one resumable production batch. Invoke only from manual Actions."""
from __future__ import annotations
import argparse, hashlib, json, os, subprocess, sys, tempfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "audio" / "manifest.json"
PROGRESS = ROOT / "scripts" / "audio_progress.json"
OVERRIDES = ROOT / "scripts" / "pronunciation_overrides.json"

def digest(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()

def run(*args: str) -> None:
    subprocess.run([sys.executable, *args], cwd=ROOT, check=True)

def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--batch-size", type=int, default=175)
    p.add_argument("--whisper-size", choices=("small", "base"), default="base")
    args = p.parse_args()
    if not 150 <= args.batch_size <= 200:
        raise SystemExit("--batch-size debe estar entre 150 y 200.")
    entries = json.loads(MANIFEST.read_text(encoding="utf-8"))
    overrides = json.loads(OVERRIDES.read_text(encoding="utf-8")) if OVERRIDES.exists() else {}
    progress = json.loads(PROGRESS.read_text(encoding="utf-8")) if PROGRESS.exists() else {"version": 1, "entries": {}}
    state = progress.setdefault("entries", {})
    pending = []
    for entry in entries:
        text_hash = digest(entry["text"])
        used = {k: v for k, v in overrides.items() if k.lower() in entry["text"].lower().split()}
        override_hash = digest(json.dumps(used, sort_keys=True, ensure_ascii=False))
        mp3 = ROOT / "audio" / "id" / f"{entry['id']}.mp3"
        opus = ROOT / "audio" / "id" / f"{entry['id']}.opus"
        old = state.get(entry["id"], {})
        if old.get("text_sha256") != text_hash or old.get("override_sha256") != override_hash or not mp3.exists() or not opus.exists():
            pending.append((entry, text_hash, override_hash))
    batch = pending[:args.batch_size]
    if not batch:
        print(json.dumps({"processed": 0, "pending": 0, "message": "No hay audios nuevos o cambiados."}, ensure_ascii=False))
        return
    ids = [item[0]["id"] for item in batch]
    with tempfile.TemporaryDirectory() as td:
        batch_manifest = Path(td) / "manifest.json"
        batch_manifest.write_text(json.dumps([item[0] for item in batch], ensure_ascii=False), encoding="utf-8")
        run("scripts/generate_audio.py", "--engine", "mms", "--mode", "full", "--level", "all",
            "--limit", "0", "--ids", ",".join(ids), "--force")
        run("scripts/audio_review.py", "--manifest", str(batch_manifest), "--audio-dir", str(ROOT / "audio" / "id"),
            "--ids", ",".join(ids), "--model", args.whisper_size)
        run("scripts/auto_fix_pronunciation.py", "--manifest", str(batch_manifest),
            "--audio-dir", str(ROOT / "audio" / "id"), "--report", str(ROOT / "scripts" / "audio_review_report.csv"),
            "--model", args.whisper_size, "--mode", "production", "--max-passes", "2")
        run("scripts/audio_review.py", "--manifest", str(batch_manifest), "--audio-dir", str(ROOT / "audio" / "id"),
            "--ids", ",".join(ids), "--model", args.whisper_size)
    now = datetime.now(timezone.utc).isoformat()
    for entry, text_hash, override_hash in batch:
        audio = ROOT / "audio" / "id" / f"{entry['id']}.mp3"
        opus = ROOT / "audio" / "id" / f"{entry['id']}.opus"
        state[entry["id"]] = {
            "text_sha256": text_hash,
            "override_sha256": override_hash,
            "mp3_sha256": digest(audio.read_bytes().hex()) if audio.exists() else None,
            "opus_sha256": digest(opus.read_bytes().hex()) if opus.exists() else None,
            "status": "reviewed_by_whisper_filter",
            "updated_at": now
        }
    progress["version"] = 1
    progress["last_batch_at"] = now
    progress["last_batch_ids"] = ids
    progress["last_batch_size"] = len(batch)
    PROGRESS.write_text(json.dumps(progress, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"processed": len(batch), "remaining_at_start": len(pending) - len(batch),
                      "last_ids": ids, "progress_file": str(PROGRESS),
                      "note": "Whisper is a filter, not a pronunciation verdict."}, ensure_ascii=False))

if __name__ == "__main__":
    main()
