import importlib.util
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

    def test_samples_page_has_useful_empty_state(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary)
            MODULE.render_samples_index(output, [])
            page = (output / "index.html").read_text(encoding="utf-8")
            self.assertIn("Aún no hay muestras", page)


    def test_refresh_audio_hashes_detects_content_changes_and_bumps_cache_version(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            audio_dir = root / "id"
            audio_dir.mkdir()
            (audio_dir / "0123456789ab.mp3").write_bytes(b"clip-one")
            metadata = root / "metadata.json"
            metadata.write_text('{"engine":"piper","voice":"Piper voice","formats":["opus","mp3"]}', encoding="utf-8")
            hashes, changed = MODULE.refresh_audio_hashes(metadata, audio_dir)
            self.assertTrue(changed)
            self.assertEqual(hashes["0123456789ab"], __import__("hashlib").sha256(b"clip-one").hexdigest())
            _, changed_again = MODULE.refresh_audio_hashes(metadata, audio_dir)
            self.assertFalse(changed_again)

            worker = root / "service-worker.js"
            worker.write_text("const CACHE_NAME = 'bahasa-studio-v3.8.97';", encoding="utf-8")
            bumped = MODULE.bump_service_worker_cache_version(worker)
            self.assertEqual(bumped, "const CACHE_NAME = 'bahasa-studio-v3.8.98';")
            self.assertEqual(worker.read_text(encoding="utf-8"), bumped)


if __name__ == "__main__":
    unittest.main()
