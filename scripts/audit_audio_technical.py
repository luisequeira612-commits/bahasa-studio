#!/usr/bin/env python3
"""Run a deterministic, read-only technical audit over an audio audit manifest.

The audit inspects existing MP3 files only. It does not edit audio, overrides,
production metadata, IndexedDB, or backup data. Technical labels do not assess
Indonesian pronunciation, accent, phonemes, or linguistic correctness.
"""
from __future__ import annotations

import argparse
import array
import csv
import json
import math
import shutil
import subprocess
from pathlib import Path

SAMPLE_RATE = 16_000
SILENCE_RMS = 0.005
CLIP_THRESHOLD = 0.999
CLIP_FRACTION = 0.001
LONG_SILENCE_SECONDS = 1.0
MAX_SAMPLE_SECONDS = 120.0


def decode_mp3(path: Path) -> tuple[array.array, int]:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise RuntimeError("ffmpeg no está disponible")
    result = subprocess.run(
        [
            ffmpeg, "-v", "error", "-i", str(path),
            "-f", "s16le", "-ac", "1", "-ar", str(SAMPLE_RATE), "pipe:1",
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if result.returncode != 0 or not result.stdout:
        detail = result.stderr.decode("utf-8", errors="replace").strip()
        raise RuntimeError(detail or f"ffmpeg terminó con código {result.returncode}")
    samples = array.array("h")
    samples.frombytes(result.stdout)
    if len(samples) > int(SAMPLE_RATE * MAX_SAMPLE_SECONDS):
        samples = samples[: int(SAMPLE_RATE * MAX_SAMPLE_SECONDS)]
    return samples, SAMPLE_RATE


def rms(samples: array.array) -> float:
    if not samples:
        return 0.0
    return math.sqrt(sum((sample / 32768.0) ** 2 for sample in samples) / len(samples))


def peak(samples: array.array) -> float:
    if not samples:
        return 0.0
    return max(abs(sample) for sample in samples) / 32768.0


def longest_silent_run(samples: array.array, sample_rate: int) -> float:
    longest = current = 0
    threshold = int(SILENCE_RMS * 32768)
    for sample in samples:
        if abs(sample) <= threshold:
            current += 1
            longest = max(longest, current)
        else:
            current = 0
    return longest / sample_rate


def technical_status(duration: float, rms_value: float, peak_value: float,
                     clipped_fraction: float, longest_silence: float) -> str:
    if duration <= 0:
        return "uncertain"
    if duration < 0.25:
        return "clipped_or_truncated"
    if clipped_fraction >= CLIP_FRACTION:
        return "clipped_or_truncated"
    if longest_silence >= LONG_SILENCE_SECONDS and duration >= 2 * LONG_SILENCE_SECONDS:
        return "dropout_or_silence"
    if rms_value < SILENCE_RMS or peak_value < 0.02:
        return "quiet_or_unbalanced"
    return "clean"


def audit_one(audio: Path, expected_duration: str = "") -> dict[str, str]:
    try:
        samples, sample_rate = decode_mp3(audio)
    except Exception as exc:
        return {
            "technical_status": "uncertain",
            "decode_status": "failed",
            "duration_seconds": "",
            "sample_rate": "",
            "rms": "",
            "peak": "",
            "clipped_fraction": "",
            "longest_silence_seconds": "",
            "technical_note": str(exc)[:300],
        }

    duration = len(samples) / sample_rate
    clipped = sum(abs(sample) / 32768.0 >= CLIP_THRESHOLD for sample in samples)
    clipped_fraction = clipped / len(samples) if samples else 0.0
    rms_value = rms(samples)
    peak_value = peak(samples)
    longest_silence = longest_silent_run(samples, sample_rate)

    return {
        "technical_status": technical_status(
            duration, rms_value, peak_value, clipped_fraction, longest_silence
        ),
        "decode_status": "ok",
        "duration_seconds": f"{duration:.3f}",
        "sample_rate": str(sample_rate),
        "rms": f"{rms_value:.5f}",
        "peak": f"{peak_value:.5f}",
        "clipped_fraction": f"{clipped_fraction:.6f}",
        "longest_silence_seconds": f"{longest_silence:.3f}",
        "manifest_duration_seconds": expected_duration,
        "technical_note": "",
    }


def audit_manifest(manifest: Path, audio_dir: Path) -> tuple[list[dict[str, str]], dict]:
    with manifest.open(encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))

    results: list[dict[str, str]] = []
    for row in rows:
        clip_id = (row.get("ID") or "").strip()
        target = (row.get("original_text") or "").strip()
        if not clip_id or not target:
            raise ValueError("El manifiesto debe contener ID y original_text")
        result = audit_one(audio_dir / f"{clip_id}.mp3", row.get("duration_seconds", ""))
        result.update({
            "ID": clip_id,
            "original_text": target,
            "selection_stratum": row.get("selection_stratum", ""),
            "diagnostic": row.get("diagnostic", ""),
            "technical_listening_status": row.get("technical_listening_status", "pending"),
            "linguistic_status": row.get("linguistic_status", "not_assessed"),
        })
        results.append(result)

    counts = {}
    for row in results:
        counts[row["technical_status"]] = counts.get(row["technical_status"], 0) + 1
    summary = {
        "rows": len(results),
        "audio_files_expected": len(results),
        "audio_files_present": sum(row["decode_status"] != "failed" for row in results),
        "status_counts": dict(sorted(counts.items())),
        "interpretation": (
            "Auditoría técnica reproducible. No certifica pronunciación, "
            "acento, fonemas, prosodia ni corrección lingüística."
        ),
        "audio_modified": False,
        "production_modified": False,
    }
    return results, summary


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", required=True, type=Path)
    parser.add_argument("--audio-dir", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--summary", type=Path)
    args = parser.parse_args()

    results, summary = audit_manifest(args.manifest, args.audio_dir)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    fields = [
        "ID", "original_text", "selection_stratum", "diagnostic",
        "technical_status", "decode_status", "duration_seconds",
        "manifest_duration_seconds", "sample_rate", "rms", "peak",
        "clipped_fraction", "longest_silence_seconds",
        "technical_listening_status", "linguistic_status", "technical_note",
    ]
    with args.output.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(results)

    summary_path = args.summary or args.output.with_suffix(".summary.json")
    summary_path.parent.mkdir(parents=True, exist_ok=True)
    summary_path.write_text(
        json.dumps(summary, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
