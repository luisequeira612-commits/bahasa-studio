#!/usr/bin/env python3
"""Conservative MMS/Whisper fixer. Automatic results are never human-verified."""
from __future__ import annotations
import argparse, csv, difflib, json, re, subprocess, tempfile
from pathlib import Path
import generate_audio as gen
import whisper
import torch

ROOT = Path(__file__).resolve().parent.parent
OVERRIDES = ROOT / "scripts" / "pronunciation_overrides.json"
UNRESOLVED = ROOT / "scripts" / "pronunciation_unresolved.txt"
REPORT = ROOT / "scripts" / "audio_review_report.csv"

def tokens(text: str) -> list[str]:
    return re.findall(r"[a-zA-ZÀ-ÿ]+", gen.normalize(text))

def variants(word: str) -> list[str]:
    found = []
    # A conservative syllable-boundary approximation; candidates are tested in full sentence context.
    split = re.sub(r"([aeiou])([^aeiou\s])([aeiou])", r"\1 \2\3", word)
    for candidate in (split, split.replace(" ", "-"), word.replace("g", "gh"),
                      word.replace("ny", "ni"), word.replace("ng", "ngg"),
                      word.replace("c", "ch"), word.replace("r", "rr")):
        candidate = candidate.strip()
        if candidate and candidate != word and candidate not in found:
            found.append(candidate)
    return found

def lexical_collision(candidate: str, target: str, known_words: set[str]) -> str | None:
    compact = re.sub(r"[\s-]+", "", candidate.lower())
    for known in known_words:
        if known != target and compact == known:
            return known
        if known != target and difflib.SequenceMatcher(None, compact, known).ratio() >= 0.88:
            return known
    return None

def load_overrides() -> dict:
    if not OVERRIDES.exists():
        return {}
    data = json.loads(OVERRIDES.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("pronunciation_overrides.json debe ser un objeto")
    return data

def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--audio-dir", type=Path, default=ROOT / "audio-samples" / "mms")
    p.add_argument("--manifest", type=Path, default=ROOT / "audio" / "manifest.json")
    p.add_argument("--report", type=Path, default=REPORT)
    p.add_argument("--model", choices=("small", "base"), default="base")
    p.add_argument("--mode", choices=("samples", "production"), default="samples")
    p.add_argument("--max-passes", type=int, choices=(1, 2), default=2)
    args = p.parse_args()
    if not args.report.exists():
        raise SystemExit("No existe el informe Whisper; ejecuta primero scripts/audio_review.py")
    entries = json.loads(args.manifest.read_text(encoding="utf-8"))
    by_id = {e["id"]: e for e in entries}
    known_words = {w for e in entries for w in tokens(e["text"])}
    overrides = load_overrides()
    torch.set_num_threads(min(4, max(1, torch.get_num_threads())))
    asr = whisper.load_model(args.model, device="cpu")
    cache = gen.create_ephemeral_model_cache(ROOT)
    synth, _voice = gen.create_synthesizer("mms", "", cache)
    unresolved_lines = []
    accepted = 0
    for pass_no in range(1, args.max_passes + 1):
        with args.report.open(encoding="utf-8-sig", newline="") as f:
            rows = list(csv.DictReader(f))
        flagged = [r for r in rows if r.get("status") == "revisar" and r.get("ID") in by_id]
        if not flagged:
            break
        changed_this_pass = 0
        for row in flagged:
            entry = by_id[row["ID"]]
            original = entry["text"]
            original_words = tokens(original)
            transcript_words = tokens(row.get("transcript", ""))
            missing = [w for w in original_words if w not in transcript_words]
            if not missing:
                continue
            for target in dict.fromkeys(missing):
                if len(target) < 3 or target not in known_words:
                    unresolved_lines.append(f"{target}\t{row['ID']}\tNo se pudo aislar una palabra objetivo con seguridad.")
                    continue
                before = float(row.get("match score", 0))
                best = None
                for candidate in variants(target):
                    collision = lexical_collision(candidate, target, known_words)
                    if collision:
                        unresolved_lines.append(f"{target}\t{row['ID']}\tRespelling ambiguo: colisiona con {collision}.")
                        continue
                    phrase = re.sub(r"(?<!\w)" + re.escape(target) + r"(?!\w)", candidate, original, count=1, flags=re.I)
                    with tempfile.TemporaryDirectory() as td:
                        raw = Path(td) / "candidate.wav"
                        synth(gen.prepare_speech_text(phrase, {}), raw)
                        trial = Path(td) / "candidate.mp3"
                        gen.encode_audio(raw, trial, "sample-mp3")
                        result = asr.transcribe(str(trial), language="id", task="transcribe", fp16=False, verbose=False)
                    heard = gen.normalize(result.get("text", ""))
                    score = __import__("audio_review").score(original, heard)
                    if target not in tokens(heard):
                        continue
                    if score >= before + 0.12 and (best is None or score > best["score"]):
                        best = {"respelling": candidate, "score": score, "transcript": heard}
                if best:
                    overrides[target] = {
                        "respelling": best["respelling"], "state": "auto_whisper",
                        "score_before": round(before, 4), "score_after": round(best["score"], 4),
                        "note": "Aceptada automáticamente por Whisper; no verificada por una persona."
                    }
                    accepted += 1
                    changed_this_pass += 1
                    speech = gen.prepare_speech_text(original, {target: best["respelling"]})
                    with tempfile.TemporaryDirectory() as td:
                        raw = Path(td) / "fixed.wav"
                        synth(speech, raw)
                        mp3 = args.audio_dir / f"{row['ID']}.mp3"
                        mp3.parent.mkdir(parents=True, exist_ok=True)
                        if args.mode == "production":
                            gen.encode_audio(raw, args.audio_dir / f"{row['ID']}.opus", "opus")
                            gen.encode_audio(raw, mp3, "mp3")
                        else:
                            gen.encode_audio(raw, mp3, "sample-mp3")
                    row["status"] = "auto_whisper"
                    row["transcript"] = best["transcript"]
                    row["match score"] = f"{best['score']:.4f}"
                    row["interpretation"] = "Whisper es un filtro, no un veredicto; corrección automática, no verificada por humano."
                    break
                else:
                    unresolved_lines.append(f"{target}\t{row['ID']}\tNinguna variante mejoró claramente sin riesgo léxico.")
        rows.sort(key=lambda r: float(r.get("match score", 0)))
        with args.report.open("w", encoding="utf-8-sig", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=list(rows[0]) if rows else [])
            writer.writeheader()
            writer.writerows(rows)
        OVERRIDES.write_text(json.dumps(overrides, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        if changed_this_pass == 0:
            break
    if unresolved_lines:
        existing = UNRESOLVED.read_text(encoding="utf-8") if UNRESOLVED.exists() else ""
        UNRESOLVED.write_text(existing + "\n".join(dict.fromkeys(unresolved_lines)) + "\n", encoding="utf-8")
    print(json.dumps({"auto_whisper": accepted, "unresolved": len(set(unresolved_lines)),
                      "passes_max": args.max_passes,
                      "warning": "El inventario léxico local solo detecta colisiones conocidas; no certifica el léxico indonesio completo."}, ensure_ascii=False))

if __name__ == "__main__":
    main()
