import importlib.util
import tempfile
import hashlib
import os
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("generate_audio", ROOT / "scripts" / "generate_audio.py")
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class EphemeralModelCacheTests(unittest.TestCase):
    def test_model_cache_is_outside_checkout_and_uses_runner_temp(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            checkout = root / "checkout"
            runner_temp = root / "runner-temp"
            checkout.mkdir()
            runner_temp.mkdir()
            keys = (
                "BAHASA_TTS_MODEL_CACHE", "HF_HOME", "HF_HUB_CACHE",
                "HUGGINGFACE_HUB_CACHE", "TRANSFORMERS_CACHE", "TORCH_HOME",
                "HF_HUB_DISABLE_TELEMETRY",
            )
            previous = {key: os.environ.get(key) for key in keys}
            for key in keys:
                os.environ.pop(key, None)
            try:
                cache = MODULE.create_ephemeral_model_cache(checkout, runner_temp)
                self.assertTrue(cache.is_dir())
                self.assertTrue(cache.is_relative_to(runner_temp))
                self.assertFalse(cache.is_relative_to(checkout))
                self.assertEqual(Path(os.environ["BAHASA_TTS_MODEL_CACHE"]), cache)
                self.assertEqual(Path(os.environ["HF_HOME"]), cache / "huggingface")
                self.assertEqual(Path(os.environ["HF_HUB_CACHE"]), cache / "huggingface" / "hub")
                self.assertEqual(Path(os.environ["TRANSFORMERS_CACHE"]), cache / "transformers")
                MODULE.cleanup_ephemeral_model_cache(cache)
                self.assertFalse(cache.exists())
            finally:
                for key, value in previous.items():
                    if value is None:
                        os.environ.pop(key, None)
                    else:
                        os.environ[key] = value

    def test_model_cache_refuses_a_path_inside_the_repository(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            checkout = root / "checkout"
            checkout.mkdir()
            previous = os.environ.get("BAHASA_TTS_MODEL_CACHE")
            try:
                for unsafe_path in (checkout, checkout / ".models"):
                    os.environ["BAHASA_TTS_MODEL_CACHE"] = str(unsafe_path)
                    with self.assertRaisesRegex(RuntimeError, "outside the repository"):
                        MODULE.create_ephemeral_model_cache(checkout, root / "runner-temp")
                    self.assertTrue(checkout.is_dir())
                    self.assertFalse((checkout / ".models").exists())
                os.environ.pop("BAHASA_TTS_MODEL_CACHE", None)
                with self.assertRaisesRegex(RuntimeError, "Runner temporary directory"):
                    MODULE.create_ephemeral_model_cache(checkout, checkout / ".runner-temp")
                self.assertTrue(checkout.is_dir())
            finally:
                if previous is None:
                    os.environ.pop("BAHASA_TTS_MODEL_CACHE", None)
                else:
                    os.environ["BAHASA_TTS_MODEL_CACHE"] = previous

class AudioSamplesPageTests(unittest.TestCase):
    def test_exact_sample_ids_override_limit_and_preserve_requested_order(self):
        entries = [
            {"id": "a1", "text": "Saya", "levels": ["A1"]},
            {"id": "b2", "text": "Makan", "levels": ["A1"]},
            {"id": "c3", "text": "Selamat pagi", "levels": ["A1"]},
        ]
        selected = MODULE.select_manifest_entries(entries, "A1", 1, "c3, b2")
        self.assertEqual([entry["id"] for entry in selected], ["c3", "b2"])

    def test_exact_sample_ids_reject_unknown_or_duplicate_ids(self):
        entries = [{"id": "a1", "text": "Saya", "levels": ["A1"]}]
        with self.assertRaisesRegex(ValueError, "Unknown audio sample ID"):
            MODULE.select_manifest_entries(entries, "A1", 10, "missing")
        with self.assertRaisesRegex(ValueError, "duplicate IDs"):
            MODULE.select_manifest_entries(entries, "A1", 10, "a1,a1")

    def test_exact_sample_ids_respect_selected_level(self):
        entries = [
            {"id": "a1", "text": "Saya", "levels": ["A1"]},
            {"id": "b2", "text": "Saya sudah", "levels": ["A2"]},
        ]
        with self.assertRaisesRegex(ValueError, "selected level"):
            MODULE.select_manifest_entries(entries, "A1", 10, "b2")

    def test_generation_level_choices_include_b2(self):
        self.assertEqual(MODULE.LEVELS, ("A1", "A2", "B1", "B2", "all"))

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

    def test_mms_sample_record_persists_model_provenance(self):
        entry = {"id": "0123456789ab", "text": "Selamat pagi."}
        record = MODULE.build_sample_record("mms", entry, "MMS / facebook/mms-tts-ind@171b004ccd54")
        self.assertEqual(record["model"], MODULE.MMS_MODEL_ID)
        self.assertEqual(record["model_revision"], MODULE.MMS_MODEL_REVISION)
        self.assertEqual(record["model_sha256"], MODULE.MMS_MODEL_SHA256)
        self.assertEqual(record["model_license"], MODULE.MMS_MODEL_LICENSE)
        self.assertEqual(record["model_license_url"], MODULE.MMS_MODEL_LICENSE_URL)
        self.assertEqual(record["model_attribution"], MODULE.MMS_MODEL_ATTRIBUTION)

    def test_mms_model_checksum_verification_accepts_exact_weights(self):
        with tempfile.TemporaryDirectory() as temporary:
            model = Path(temporary) / "model.safetensors"
            model.write_bytes(b"pinned-model-fixture")
            expected = hashlib.sha256(b"pinned-model-fixture").hexdigest()
            old_expected = MODULE.MMS_MODEL_SHA256
            try:
                MODULE.MMS_MODEL_SHA256 = expected
                self.assertEqual(MODULE.verify_mms_model_checksum(model), expected)
                MODULE.MMS_MODEL_SHA256 = "0" * 64
                with self.assertRaisesRegex(RuntimeError, "MMS model checksum mismatch"):
                    MODULE.verify_mms_model_checksum(model)
            finally:
                MODULE.MMS_MODEL_SHA256 = old_expected

    def test_mms_replaces_legacy_piper_only_when_forced(self):
        with tempfile.TemporaryDirectory() as temporary:
            metadata = Path(temporary) / "audio" / "metadata.json"
            MODULE.ensure_single_voice(metadata, "piper", "Piper / id_ID-news_tts-medium")
            with self.assertRaisesRegex(RuntimeError, "Do not mix voices"):
                MODULE.ensure_single_voice(metadata, "mms", "MMS / facebook/mms-tts-ind@171b004ccd54")
            MODULE.ensure_single_voice(
                metadata, "mms", "MMS / facebook/mms-tts-ind@171b004ccd54",
                allow_piper_replacement=True,
            )
            saved = __import__("json").loads(metadata.read_text(encoding="utf-8"))
            self.assertEqual(saved["engine"], "mms")
            self.assertEqual(saved["voice"], "MMS / facebook/mms-tts-ind@171b004ccd54")
            self.assertEqual(saved["model"], MODULE.MMS_MODEL_ID)
            self.assertEqual(saved["model_revision"], MODULE.MMS_MODEL_REVISION)
            self.assertEqual(saved["model_sha256"], MODULE.MMS_MODEL_SHA256)
            self.assertEqual(saved["model_license"], MODULE.MMS_MODEL_LICENSE)
            self.assertEqual(saved["model_license_url"], MODULE.MMS_MODEL_LICENSE_URL)
            self.assertEqual(saved["model_attribution"], MODULE.MMS_MODEL_ATTRIBUTION)

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
            self.assertEqual(hashes["0123456789ab"], hashlib.sha256(b"clip-one").hexdigest())
            _, changed_again = MODULE.refresh_audio_hashes(metadata, audio_dir)
            self.assertFalse(changed_again)

            worker = root / "service-worker.js"
            worker.write_text("const CACHE_NAME = 'bahasa-studio-v3.8.98';", encoding="utf-8")
            bumped = MODULE.bump_service_worker_cache_version(worker)
            self.assertEqual(bumped, "const CACHE_NAME = 'bahasa-studio-v3.8.99';")
            self.assertEqual(worker.read_text(encoding="utf-8"), bumped)


    def test_hash_only_cli_refreshes_fingerprints_without_manifest_or_ffmpeg(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            audio_dir = root / "audio" / "id"
            audio_dir.mkdir(parents=True)
            (audio_dir / "0123456789ab.mp3").write_bytes(b"existing clip")
            metadata = root / "audio" / "metadata.json"
            metadata.write_text('{"engine":"piper","voice":"Piper voice","formats":["opus","mp3"]}', encoding="utf-8")
            worker = root / "service-worker.js"
            worker.write_text("const CACHE_NAME = 'bahasa-studio-v3.8.98';", encoding="utf-8")

            old_root = MODULE.ROOT
            old_manifest = MODULE.MANIFEST
            old_argv = sys.argv
            try:
                MODULE.ROOT = root
                MODULE.MANIFEST = root / "missing" / "manifest.json"
                sys.argv = ["generate_audio.py", "--engine", "piper", "--hash-only"]
                MODULE.main()
            finally:
                MODULE.ROOT = old_root
                MODULE.MANIFEST = old_manifest
                sys.argv = old_argv

            saved = __import__("json").loads(metadata.read_text(encoding="utf-8"))
            self.assertEqual(saved["audio_hashes"]["0123456789ab"], hashlib.sha256(b"existing clip").hexdigest())
            self.assertEqual(worker.read_text(encoding="utf-8"), "const CACHE_NAME = 'bahasa-studio-v3.8.99';")


if __name__ == "__main__":
    unittest.main()
