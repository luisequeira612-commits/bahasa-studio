import unittest

from scripts.build_audio_audit_manifest import (
    build_manifest,
    normalize_target,
)


def rows_for_counts(counts):
    rows = []
    index = 0
    for length, amount in counts.items():
        for item in range(amount):
            index += 1
            target = " ".join(f"w{length}_{item}_{word}" for word in range(length))
            diagnostics = ("both_low", "model_a_improves", "model_b_improves", "similar")
            rows.append({
                "ID": f"clip-{index:03d}",
                "original_text": target,
                "target_word_count": str(length),
                "diagnostic": diagnostics[item % len(diagnostics)],
                "base_score": "0.2",
                "small_score": "0.3",
                "baseline_status": "revisar",
            })
    return rows


class StratifiedAudioAuditManifestTests(unittest.TestCase):
    def test_default_sample_has_30_unique_targets_and_expected_quotas(self):
        rows = rows_for_counts({1: 15, 2: 10, 3: 10, 4: 3})
        manifest, summary = build_manifest(rows)
        self.assertEqual(len(manifest), 30)
        self.assertEqual(summary["unique_targets"], 30)
        self.assertEqual(summary["selected_by_word_count"], {
            "1": 12, "2": 8, "3": 8, "4": 2
        })

    def test_selection_is_deterministic_for_same_seed(self):
        rows = rows_for_counts({1: 15, 2: 10, 3: 10, 4: 3})
        first, _ = build_manifest(rows, seed="fixed")
        second, _ = build_manifest(rows, seed="fixed")
        self.assertEqual([row["ID"] for row in first], [row["ID"] for row in second])

    def test_different_seed_can_change_selection(self):
        rows = rows_for_counts({1: 20, 2: 12, 3: 12, 4: 5})
        first, _ = build_manifest(rows, seed="one")
        second, _ = build_manifest(rows, seed="two")
        self.assertNotEqual([row["ID"] for row in first], [row["ID"] for row in second])

    def test_duplicate_texts_are_never_counted_twice(self):
        rows = rows_for_counts({1: 15, 2: 10, 3: 10, 4: 3})
        duplicate = dict(rows[0], ID="duplicate-id")
        rows.append(duplicate)
        manifest, summary = build_manifest(rows)
        self.assertEqual(len(manifest), 30)
        self.assertEqual(summary["unique_targets"], 30)

    def test_sparse_four_plus_stratum_redistributes_to_three_words(self):
        rows = rows_for_counts({1: 15, 2: 10, 3: 12, 4: 1})
        manifest, summary = build_manifest(rows)
        self.assertEqual(len(manifest), 30)
        self.assertEqual(summary["selected_by_word_count"]["4"], 1)
        self.assertEqual(summary["selected_by_word_count"]["3"], 9)

    def test_insufficient_unique_targets_fails_clearly(self):
        rows = rows_for_counts({1: 2, 2: 2, 3: 2, 4: 1})
        with self.assertRaisesRegex(ValueError, "textos únicos"):
            build_manifest(rows)

    def test_linguistic_status_is_not_assessed(self):
        rows = rows_for_counts({1: 15, 2: 10, 3: 10, 4: 3})
        manifest, _ = build_manifest(rows)
        self.assertTrue(all(row["linguistic_status"] == "not_assessed" for row in manifest))
        self.assertTrue(all(row["technical_listening_status"] == "pending" for row in manifest))

    def test_target_normalization_only_deduplicates_case_punctuation_spacing(self):
        self.assertEqual(normalize_target(" Halo,  DUNIA! "), "halo dunia")


if __name__ == "__main__":
    unittest.main()
