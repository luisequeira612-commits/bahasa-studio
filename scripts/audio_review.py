#!/usr/bin/env python3
"""Whisper screening for Guardi audio. A transcript match is not pronunciation certification."""
from __future__ import annotations
import argparse, csv, hashlib, json, re, string
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPORT = ROOT / "scripts" / "audio_review_report.csv"
WORDS = ROOT / "scripts" / "audio_review_words.txt"
PUNCT = str.maketrans("", "", string.punctuation + "¡¿“”‘’…—–")

def normalize(value: str) -> str:
    value = str(value or "").lower().translate(PUNCT)
    return " ".join(value.split())

def edit_distance(a: list[str], b: list[str]) -> int:
    previous = list(range(len(b) + 1))
    for i, left in enumerate(a, 1):
        current = [i]
        for j, right in enumerate(b, 1):
            current.append(min(current[-1] + 1, previous[j] + 1, previous[j - 1] + (left != right)))
        previous = current
    return previous[-1]

def score(original: str, transcript: str) -> float:
    left, right = normalize(original).split(), normalize(transcript).split()
    return 1.0 if not left and not right else max(0.0, 1.0 - edit_distance(left, right) / max(len(left), len(right), 1))

def sha(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()

def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--audio-dir", type=Path, default=ROOT / "audio-samples" / "mms")
    p.add_argument("--manifest", type=Path, default=ROOT / "audio" / "manifest.json")
    p.add_argument("--model", choices=("small", "base"), default="base")
    p.add_argument("--limit", type=int, default=0)
    p.add_argument("--review-threshold", type=float, default=0.90)
    p.add_argument("--report", type=Path, default=REPORT)
    p.add_argument("--words-report", type=Path, default=WORDS)
    args = p.parse_args()
    import torch, whisper
    torch.set_num_threads(min(4, max(1, torch.get_num_threads())))
    model = whisper.load_model(args.model, device="cpu")
    entries = json.loads(args.manifest.read_text(encoding="utf-8"))
    if args.limit:
        entries = entries[:args.limit]
    rows, low_words = [], Counter()
    for i, entry in enumerate(entries, 1):
        audio = args.audio_dir / f"{entry['id']}.mp3"
        if not audio.exists():
            transcript, match, status = "", 0.0, "falló"
        else:
            result = model.transcribe(str(audio), language="id", task="transcribe", fp16=False, verbose=False)
            transcript = str(result.get("text", "")).strip()
            match = score(entry["text"], transcript)
            status = "revisar" if match < args.review_threshold else "coincide"
        if status in {"revisar", "falló"}:
            low_words.update(normalize(entry["text"]).split())
        rows.append({
            "ID": entry["id"], "original text": entry["text"], "transcript": transcript,
            "match score": f"{match:.4f}", "status": status,
            "text_sha256": sha(entry["text"]), "override_sha256": "",
            "interpretation": "Whisper es un filtro, no un veredicto; una coincidencia alta no certifica pronunciación."
        })
        print(f"[{i}/{len(entries)}] {entry['id']} {status} {match:.3f}", flush=True)
    rows.sort(key=lambda row: float(row["match score"]))
    args.report.parent.mkdir(parents=True, exist_ok=True)
    with args.report.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0]) if rows else ["ID", "original text", "transcript", "match score", "status", "text_sha256", "override_sha256", "interpretation"])
        writer.writeheader()
        writer.writerows(rows)
    with args.words_report.open("w", encoding="utf-8") as f:
        f.write("Whisper es un filtro, no un veredicto. Frecuencia de palabras en audios marcados para revisar/fallidos.\n")
        for word, count in low_words.most_common(100):
            f.write(f"{word},{count}\n")
    print(json.dumps({"audios": len(rows), "review": sum(r["status"] == "revisar" for r in rows),
                      "failed": sum(r["status"] == "falló" for r in rows),
                      "matched": sum(r["status"] == "coincide" for r in rows),
                      "report": str(args.report)}, ensure_ascii=False))

if __name__ == "__main__":
    main()
