import importlib.util
import sys
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import audio_review
import auto_fix_pronunciation


class WhisperAudioReviewTests(unittest.TestCase):
    def test_normalization_ignores_case_punctuation_and_extra_spaces(self):
        self.assertEqual(audio_review.normalize("  Selamat,   PAGI! "), "selamat pagi")

    def test_exact_normalized_transcript_scores_one(self):
        self.assertEqual(audio_review.score("Selamat pagi!", "selamat, pagi"), 1.0)

    def test_missing_word_lowers_score(self):
        self.assertLess(audio_review.score("Saya makan nasi.", "Saya nasi."), 1.0)

    def test_syllable_variants_preserve_original_letters(self):
        values = auto_fix_pronunciation.variants("pagi")
        self.assertIn("pa gi", values)
        self.assertIn("pa-gi", values)

    def test_letter_changing_variants_are_never_auto_accepted(self):
        self.assertIsNotNone(auto_fix_pronunciation.lexical_collision("paghi", "pagi", {"pagi", "pagi"}))

    def test_syllable_separation_is_allowed_when_no_known_lexical_collision(self):
        self.assertIsNone(auto_fix_pronunciation.lexical_collision("pa gi", "pagi", {"pagi", "saya", "makan"}))


if __name__ == "__main__":
    unittest.main()
