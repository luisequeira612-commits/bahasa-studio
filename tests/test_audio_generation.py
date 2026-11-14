import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("generate_audio", ROOT / "scripts" / "generate_audio.py")
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class AudioSamplesPageTests(unittest.TestCase):
    def test_samples_page_escapes_text_and_contains_native_audio_controls(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary)
            samples = [{
                "engine": "edge",
                "id": "0123456789ab",
                "text": '<script>alert("x")</script> Selamat pagi.',
                "voice": "id-ID-ArdiNeural"
            }]
            MODULE.render_samples_index(output, samples)
            page = (output / "index.html").read_text(encoding="utf-8")
            self.assertIn('<audio controls preload="none"', page)
            self.assertIn("edge/0123456789ab.mp3", page)
            self.assertIn("&lt;script&gt;", page)
            self.assertNotIn('<script>alert("x")</script>', page)

    def test_full_library_rejects_mixing_engines_or_voices(self):
        with tempfile.TemporaryDirectory() as temporary:
            metadata = Path(temporary) / "audio" / "metadata.json"
            MODULE.ensure_single_voice(metadata, "piper", "Piper / id_ID-news_tts-medium")
            MODULE.ensure_single_voice(metadata, "piper", "Piper / id_ID-news_tts-medium")
            with self.assertRaisesRegex(RuntimeError, "Do not mix voices"):
                MODULE.ensure_single_voice(metadata, "edge", "Edge TTS / id-ID-ArdiNeural")

    def test_content_revision_defaults_to_one_and_preserves_existing_revision(self):
        with tempfile.TemporaryDirectory() as temporary:
            metadata = Path(temporary) / "audio" / "metadata.json"
            created = MODULE.ensure_single_voice(metadata, "piper", "Piper / id_ID-news_tts-medium")
            self.assertEqual(created["content_revision"], 1)
            stored = json.loads(metadata.read_text(encoding="utf-8"))
            stored["content_revision"] = 7
            metadata.write_text(json.dumps(stored), encoding="utf-8")

            existing = MODULE.ensure_single_voice(metadata, "piper", "Piper / id_ID-news_tts-medium")
            self.assertEqual(existing["content_revision"], 7)
            self.assertEqual(json.loads(metadata.read_text(encoding="utf-8"))["content_revision"], 7)

    def test_bump_content_revision_increments_only_when_existing_audio_will_be_replaced(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary)
            metadata = output / "metadata.json"
            MODULE.ensure_single_voice(metadata, "piper", "Piper / id_ID-news_tts-medium")
            entries = [{"id": "existing"}, {"id": "new"}]

            self.assertFalse(MODULE.has_existing_audio_to_regenerate(entries, output, False))
            (output / "existing.mp3").write_bytes(b"old mp3")
            self.assertTrue(MODULE.has_existing_audio_to_regenerate(entries, output, False))
            (output / "existing.opus").write_bytes(b"old opus")
            self.assertFalse(MODULE.has_existing_audio_to_regenerate(entries, output, False))
            self.assertTrue(MODULE.has_existing_audio_to_regenerate(entries, output, True))

            self.assertEqual(MODULE.bump_content_revision(metadata), 2)
            self.assertEqual(json.loads(metadata.read_text(encoding="utf-8"))["content_revision"], 2)

    def test_samples_page_has_useful_empty_state(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary)
            MODULE.render_samples_index(output, [])
            page = (output / "index.html").read_text(encoding="utf-8")
            self.assertIn("Aún no hay muestras", page)


if __name__ == "__main__":
    unittest.main()
