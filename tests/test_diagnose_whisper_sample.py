import unittest

from scripts.diagnose_whisper_sample import (
    build_summary,
    ordered_word_hits,
    score,
    words,
)


class WhisperDiagnosticMetricsTests(unittest.TestCase):
    def test_words_normalize_case_and_punctuation(self):
        self.assertEqual(words("Halo, Ana!"), ["halo", "ana"])

    def test_exact_score_is_one(self):
        self.assertEqual(score("Saya makan nasi.", "saya makan nasi"), 1.0)

    def test_score_is_zero_for_unrelated_single_tokens(self):
        self.assertEqual(score("Saya", "kamu"), 0.0)

    def test_ordered_hits_do_not_double_count_repeated_target_words(self):
        self.assertEqual(ordered_word_hits(["saya", "saya"], ["saya"]), 1)

    def test_ordered_hits_respect_token_order(self):
        self.assertEqual(ordered_word_hits(["saya", "makan"], ["makan", "saya"]), 1)

    def test_summary_stratifies_by_target_word_count(self):
        rows = [
            {"target_word_count": "1", "baseline_status": "revisar", "diagnostic": "both_low", "base_score": "0.0", "small_score": "0.0"},
            {"target_word_count": "3", "baseline_status": "coincide", "diagnostic": "similar", "base_score": "1.0", "small_score": "0.5"},
        ]
        summary = build_summary(rows, "base", "small")
        self.assertEqual(summary["score_by_target_word_count"]["1"]["rows"], 1)
        self.assertEqual(summary["score_by_target_word_count"]["3"]["mean_score"]["base"], 1.0)
        self.assertEqual(summary["metric_definition"]["both_low_threshold"], 0.25)


if __name__ == "__main__":
    unittest.main()
