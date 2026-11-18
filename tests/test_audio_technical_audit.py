import array
import importlib.util
import unittest
from pathlib import Path

MODULE = Path(__file__).parents[1] / "scripts" / "audit_audio_technical.py"
spec = importlib.util.spec_from_file_location("audit_audio_technical", MODULE)
mod = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(mod)


def samples(values):
    return array.array("h", values)


class AudioTechnicalAuditTests(unittest.TestCase):
    def test_rms_and_peak_are_normalized(self):
        data = samples([0, 16384, -16384, 32767])
        self.assertGreater(mod.rms(data), 0.7)
        self.assertLess(mod.rms(data), 0.8)
        self.assertGreater(mod.peak(data), 0.999)

    def test_longest_silence_is_measured(self):
        data = samples([0] * 16000 + [1000] * 16000)
        duration = mod.longest_silent_run(data, 16000)
        self.assertGreater(duration, 0.99)
        self.assertLess(duration, 1.01)

    def test_status_clean(self):
        data = samples([10000, -10000] * 8000)
        self.assertEqual(mod.technical_status(1.0, mod.rms(data), mod.peak(data), 0.0, 0.0), 'clean')

    def test_status_quiet(self):
        self.assertEqual(mod.technical_status(1.0, 0.001, 0.01, 0.0, 0.0), 'quiet_or_unbalanced')

    def test_status_clipped(self):
        self.assertEqual(mod.technical_status(1.0, 0.2, 1.0, 0.002, 0.0), 'clipped_or_truncated')

    def test_status_dropout(self):
        self.assertEqual(mod.technical_status(2.5, 0.1, 0.4, 0.0, 1.1), 'dropout_or_silence')

    def test_status_truncated(self):
        self.assertEqual(mod.technical_status(0.2, 0.1, 0.4, 0.0, 0.0), 'clipped_or_truncated')

    def test_status_uncertain_for_empty(self):
        self.assertEqual(mod.technical_status(0.0, 0.0, 0.0, 0.0, 0.0), 'uncertain')


if __name__ == "__main__":
    unittest.main()
