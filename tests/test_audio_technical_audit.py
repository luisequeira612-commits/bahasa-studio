import array
import importlib.util
from pathlib import Path

MODULE = Path(__file__).parents[1] / "scripts" / "audit_audio_technical.py"
spec = importlib.util.spec_from_file_location("audit_audio_technical", MODULE)
mod = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(mod)


def samples(values):
    data = array.array("h", values)
    return data


def test_rms_and_peak_are_normalized():
    data = samples([0, 16384, -16384, 32767])
    assert 0.7 < mod.rms(data) < 0.8
    assert mod.peak(data) > 0.999


def test_longest_silence_is_measured():
    data = samples([0] * 16000 + [1000] * 16000)
    assert 0.99 < mod.longest_silent_run(data, 16000) < 1.01


def test_status_clean():
    data = samples([10000, -10000] * 8000)
    assert mod.technical_status(1.0, mod.rms(data), mod.peak(data), 0.0, 0.0) == "clean"


def test_status_quiet():
    assert mod.technical_status(1.0, 0.001, 0.01, 0.0, 0.0) == "quiet_or_unbalanced"


def test_status_clipped():
    assert mod.technical_status(1.0, 0.2, 1.0, 0.002, 0.0) == "clipped_or_truncated"


def test_status_dropout():
    assert mod.technical_status(2.5, 0.1, 0.4, 0.0, 1.1) == "dropout_or_silence"


def test_status_truncated():
    assert mod.technical_status(0.2, 0.1, 0.4, 0.0, 0.0) == "clipped_or_truncated"


def test_status_uncertain_for_empty():
    assert mod.technical_status(0.0, 0.0, 0.0, 0.0, 0.0) == "uncertain"
