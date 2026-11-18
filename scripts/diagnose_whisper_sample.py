#!/usr/bin/env python3
"""Compare Whisper models on an already-generated MMS sample.

Diagnostic only: it never changes audio, overrides, production state,
IndexedDB, or backup data.
"""
from __future__ import annotations

import argparse
import csv
import json
import re
from collections import defaultdict
from pathlib import Path
from statistics import mean

BOTH_LOW_THRESHOLD = 0.25
IMPROVEMENT_DELTA_THRESHOLD = 0.20


def norm(text: str) -> str:
    return re.sub(r"[^a-z0-9áéíóúüñ'\s-]", " ", (text or "").lower())


def words(text: str) -> list[str]:
    return [word for word in norm(text).split() if word]


def edit_distance(a: list[str], b: list[str]) -> int:
    previous = list(range(len(b) + 1))
    for i, word_a in enumerate(a, 1):
        current = [i]
        for j, word_b in enumerate(b, 1):
            current.append(min(
                current[-1] + 1,
                previous[j] + 1,
                previous[j - 1] + (word_a != word_b),
            ))
        previous = current
    return previous[-1]


def score(target: str, transcript: str) -> float:
    """Normalized token-edit similarity; not a phonetic or confidence score."""
    target_words, transcript_words = words(target), words(transcript)
    if not target_words and not transcript_words:
        return 1.0
    return max(
        0.0,
        1.0 - edit_distance(target_words, transcript_words)
        / max(len(target_words), len(transcript_words), 1),
    )


def ordered_word_hits(target_words: list[str], transcript_words: list[str]) -> int:
    """Count matched target tokens in order (LCS), including duplicate tokens safely."""
    previous = [0] * (len(transcript_words) + 1)
    for target_word in target_words:
        current = [0]
        for index, transcript_word in enumerate(transcript_words, 1):
            if target_word == transcript_word:
                current.append(previous[index - 1] + 1)
            else:
                current.append(max(previous[index], current[-1]))
        previous = current
    return previous[-1]


def build_summary(results: list[dict[str, str]], model_a: str, model_b: str) -> dict:
    by_word_count: dict[int, list[dict[str, str]]] = defaultdict(list)
    for result in results:
        by_word_count[int(result["target_word_count"])].append(result)

    return {
        "rows": len(results),
        "baseline_review": sum(r["baseline_status"] == "revisar" for r in results),
        "both_low": sum(r["diagnostic"] == "both_low" for r in results),
        "model_b_improves": sum(r["diagnostic"] == "model_b_improves" for r in results),
        "model_a_improves": sum(r["diagnostic"] == "model_a_improves" for r in results),
        "similar": sum(r["diagnostic"] == "similar" for r in results),
        "mean_score": {
            model_a: round(mean(float(r[f"{model_a}_score"]) for r in results), 4)
            if results else 0.0,
            model_b: round(mean(float(r[f"{model_b}_score"]) for r in results), 4)
            if results else 0.0,
        },
        "score_by_target_word_count": {
            str(word_count): {
                "rows": len(group),
                "mean_score": {
                    model_a: round(mean(float(r[f"{model_a}_score"]) for r in group), 4),
                    model_b: round(mean(float(r[f"{model_b}_score"]) for r in group), 4),
                },
            }
            for word_count, group in sorted(by_word_count.items())
        },
        "metric_definition": {
            "score": "1 - token Levenshtein distance / max(target token count, transcript token count, 1)",
            "ordered_target_word_hits": "Longest common subsequence of target and transcript tokens; preserves order and duplicate counts",
            "normalization": "lowercase and remove punctuation; written numbers and digits remain different tokens",
            "both_low_threshold": BOTH_LOW_THRESHOLD,
            "improvement_delta_threshold": IMPROVEMENT_DELTA_THRESHOLD,
            "warning": "Heuristic ASR comparison only; not a pronunciation probability, phonetic score, or human validation.",
        },
        "interpretation": (
            "Diagnóstico de ASR, no certificación de pronunciación. "
            "both_low no demuestra por sí solo que MMS pronuncie mal."
        ),
    }


def transcribe(model: "whisper.Whisper", audio: Path) -> str:
    result = model.transcribe(
        str(audio), language="id", task="transcribe", fp16=False
    )
    return result.get("text", "").strip()


def main() -> int:
    import whisper

    parser = argparse.ArgumentParser()
    parser.add_argument("--report", required=True, type=Path)
    parser.add_argument("--audio-dir", required=True, type=Path)
    parser.add_argument("--model-a", default="base", choices=("base", "small"))
    parser.add_argument("--model-b", default="small", choices=("base", "small"))
    parser.add_argument("--cache-dir", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    if args.model_a == args.model_b:
        parser.error("--model-a y --model-b deben ser distintos")

    args.cache_dir.mkdir(parents=True, exist_ok=True)
    with args.report.open(encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))

    # Load each model once. Loading inside the audio loop would download/read
    # model weights up to 200 times and make the diagnostic impractically slow.
    models = {
        args.model_a: whisper.load_model(
            args.model_a, device="cpu", download_root=str(args.cache_dir)
        )
    }
    if args.model_b not in models:
        models[args.model_b] = whisper.load_model(
            args.model_b, device="cpu", download_root=str(args.cache_dir)
        )

    results = []
    for index, row in enumerate(rows, 1):
        audio = args.audio_dir / f"{row['ID']}.mp3"
        if not audio.is_file():
            print(f"[{index}/{len(rows)}] {row['ID']}: audio ausente", flush=True)
            continue

        transcripts = {
            model_name: transcribe(model, audio)
            for model_name, model in models.items()
        }
        transcript_a = transcripts[args.model_a]
        transcript_b = transcripts[args.model_b]
        target = row["original text"]
        target_words = words(target)
        words_a, words_b = words(transcript_a), words(transcript_b)
        score_a = score(target, transcript_a)
        score_b = score(target, transcript_b)

        results.append({
            "ID": row["ID"],
            "original_text": target,
            "target_word_count": len(target_words),
            "baseline_status": row["status"],
            f"{args.model_a}_transcript": transcript_a,
            f"{args.model_b}_transcript": transcript_b,
            f"{args.model_a}_score": f"{score_a:.4f}",
            f"{args.model_b}_score": f"{score_b:.4f}",
            f"{args.model_a}_ordered_target_word_hits": ordered_word_hits(target_words, words_a),
            f"{args.model_b}_ordered_target_word_hits": ordered_word_hits(target_words, words_b),
            "model_b_vs_a_delta": f"{score_b - score_a:.4f}",
            "diagnostic": (
                "both_low" if score_a < BOTH_LOW_THRESHOLD and score_b < BOTH_LOW_THRESHOLD
                else "model_b_improves" if score_b >= score_a + IMPROVEMENT_DELTA_THRESHOLD
                else "model_a_improves" if score_a >= score_b + IMPROVEMENT_DELTA_THRESHOLD
                else "similar"
            ),
        })
        print(f"[{index}/{len(rows)}] {row['ID']}", flush=True)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    fields = list(results[0]) if results else [
        "ID", "original_text", "target_word_count", "baseline_status"
    ]
    with args.output.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(results)

    summary = build_summary(results, args.model_a, args.model_b)
    args.output.with_suffix(".summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
