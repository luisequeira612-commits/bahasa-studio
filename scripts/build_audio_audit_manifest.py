#!/usr/bin/env python3
"""Build a deterministic, read-only listening-audit manifest from Whisper CSV results.

This selects existing sample clips only. It never edits audio, overrides, or production.
Whisper labels are sampling strata, not pronunciation judgments.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

DEFAULT_SEED = "bahasa-a1-sample100-audit-v1"
DEFAULT_QUOTAS = {1: 12, 2: 8, 3: 8, 4: 2}
DIAGNOSTIC_ORDER = (
    "both_low",
    "model_a_improves",
    "model_b_improves",
    "similar",
    "unknown",
)


def normalize_target(value: str) -> str:
    """Normalize whitespace/case/punctuation only for duplicate detection."""
    value = re.sub(r"[^\w\s]", " ", (value or "").casefold(), flags=re.UNICODE)
    return " ".join(value.split())


def word_count(row: dict[str, str]) -> int:
    raw = row.get("target_word_count", "")
    if raw:
        count = int(raw)
        if count < 1:
            raise ValueError(f"target_word_count inválido para {row.get('ID', '?')}: {raw}")
        return count
    count = len(normalize_target(row.get("original_text", "")).split())
    if count < 1:
        raise ValueError(f"texto objetivo vacío para {row.get('ID', '?')}")
    return count


def stable_rank(seed: str, *parts: str) -> str:
    payload = "\x1f".join((seed, *parts)).encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


def representative_rows(
    rows: list[dict[str, str]], seed: str
) -> dict[int, list[dict[str, str]]]:
    """Keep one deterministic clip per unique target text."""
    by_length: dict[int, dict[str, dict[str, str]]] = defaultdict(dict)
    seen_ids: set[str] = set()
    for row in rows:
        clip_id = (row.get("ID") or "").strip()
        target = (row.get("original_text") or "").strip()
        if not clip_id or not target:
            raise ValueError("Cada fila debe incluir ID y original_text no vacíos")
        if clip_id in seen_ids:
            raise ValueError(f"ID duplicado en CSV: {clip_id}")
        seen_ids.add(clip_id)
        count = word_count(row)
        key = normalize_target(target)
        existing = by_length[count].get(key)
        rank = stable_rank(seed, str(count), key, clip_id)
        if existing is None or rank < existing["_selection_rank"]:
            candidate = dict(row)
            candidate["_selection_rank"] = rank
            candidate["_target_key"] = key
            by_length[count][key] = candidate
    return {
        count: sorted(group.values(), key=lambda item: item["_selection_rank"])
        for count, group in by_length.items()
    }


def select_balanced(
    candidates: list[dict[str, str]], quota: int, seed: str
) -> list[dict[str, str]]:
    """Round-robin across Whisper diagnostic labels, ranked deterministically."""
    buckets: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in candidates:
        label = row.get("diagnostic", "") or "unknown"
        buckets[label].append(row)
    for label, bucket in buckets.items():
        bucket.sort(
            key=lambda row: stable_rank(
                seed, label, row["_target_key"], row["ID"]
            )
        )

    labels = [label for label in DIAGNOSTIC_ORDER if label in buckets]
    labels.extend(sorted(label for label in buckets if label not in DIAGNOSTIC_ORDER))
    selected: list[dict[str, str]] = []
    positions = {label: 0 for label in labels}
    while len(selected) < quota:
        progressed = False
        for label in labels:
            index = positions[label]
            if index < len(buckets[label]):
                selected.append(buckets[label][index])
                positions[label] += 1
                progressed = True
                if len(selected) == quota:
                    break
        if not progressed:
            break
    return selected


def build_manifest(
    rows: list[dict[str, str]], seed: str = DEFAULT_SEED,
    quotas: dict[int, int] | None = None,
) -> tuple[list[dict[str, str]], dict]:
    quotas = dict(quotas or DEFAULT_QUOTAS)
    if any(count not in (1, 2, 3, 4) or quota < 0 for count, quota in quotas.items()):
        raise ValueError("Las cuotas deben usar longitudes 1, 2, 3 o 4 (4 = 4+), sin negativos")
    if sum(quotas.values()) < 1:
        raise ValueError("La muestra solicitada debe contener al menos un clip")

    candidates = representative_rows(rows, seed)
    grouped: dict[int, list[dict[str, str]]] = {
        1: candidates.get(1, []),
        2: candidates.get(2, []),
        3: candidates.get(3, []),
        4: [row for length, group in candidates.items() if length >= 4 for row in group],
    }

    selected: list[dict[str, str]] = []
    selected_keys: set[str] = set()
    selected_by_length: Counter[int] = Counter()
    deficits: dict[int, int] = {}

    for length in (1, 2, 3, 4):
        quota = quotas.get(length, 0)
        chosen = select_balanced(grouped[length], quota, f"{seed}:{length}")
        for row in chosen:
            selected.append(row)
            selected_keys.add(row["_target_key"])
            selected_by_length[length] += 1
        deficits[length] = quota - len(chosen)

    # Keep the planned total: first move unavailable slots to 3-word texts,
    # then use any remaining unique targets in the other strata.
    remaining = sum(deficits.values())
    fallback_order = (3, 2, 1, 4)
    while remaining:
        progressed = False
        for length in fallback_order:
            pool = [
                row for row in grouped[length]
                if row["_target_key"] not in selected_keys
            ]
            if not pool:
                continue
            chosen = select_balanced(pool, 1, f"{seed}:fallback:{length}:{remaining}")
            if chosen:
                row = chosen[0]
                selected.append(row)
                selected_keys.add(row["_target_key"])
                selected_by_length[length] += 1
                remaining -= 1
                progressed = True
                if not remaining:
                    break
        if not progressed:
            raise ValueError(
                f"Solo hay {len(selected)} textos únicos; no se puede completar "
                f"la muestra de {sum(quotas.values())}."
            )

    output = []
    for row in selected:
        length = word_count(row)
        stratum = 4 if length >= 4 else length
        output.append({
            "ID": row["ID"],
            "original_text": row["original_text"],
            "target_word_count": str(length),
            "diagnostic": row.get("diagnostic", "") or "unknown",
            "base_score": row.get("base_score", ""),
            "small_score": row.get("small_score", ""),
            "baseline_status": row.get("baseline_status", ""),
            "selection_stratum": f"{stratum}_word",
            "selection_reason": (
                "quota" if selected_by_length[stratum] <= quotas.get(stratum, 0)
                else "fallback_for_sparse_stratum"
            ),
            "technical_listening_status": "pending",
            "linguistic_status": "not_assessed",
        })

    summary = {
        "seed": seed,
        "requested": sum(quotas.values()),
        "selected": len(output),
        "unique_targets": len({normalize_target(row["original_text"]) for row in output}),
        "requested_quotas": {str(k): v for k, v in sorted(quotas.items())},
        "selected_by_word_count": {
            str(k): selected_by_length[k] for k in (1, 2, 3, 4)
        },
        "selected_by_diagnostic": dict(sorted(Counter(
            row["diagnostic"] for row in output
        ).items())),
        "interpretation": (
            "Manifest de escucha técnica, no certificación de pronunciación. "
            "Whisper solo define estratos de muestreo."
        ),
        "audio_modified": False,
        "production_modified": False,
    }
    return output, summary


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, type=Path,
                        help="whisper_model_comparison.csv del artefacto sample100")
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--summary", type=Path)
    parser.add_argument("--seed", default=DEFAULT_SEED)
    args = parser.parse_args()

    with args.input.open(encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))
    manifest, summary = build_manifest(rows, args.seed)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(manifest[0]))
        writer.writeheader()
        writer.writerows(manifest)

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
