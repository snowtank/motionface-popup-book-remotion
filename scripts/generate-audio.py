"""Generate an original, deterministic paper/clockwork sound bed (stdlib only)."""
import math
import random
import struct
import sys
import wave
from pathlib import Path

RATE = 48000
DURATION = 38.2
EVENTS = [0.5, 1.1, 1.9, 2.8, 3.6, 4.5, 5.1, 5.8, 6.8, 7.8, 9.0,
          9.7, 10.0, 10.3, 10.6, 10.9, 11.75, 12.6, 14.2, 16.2,
          16.7, 17.2, 17.7, 19.2, 20.8, 22.4, 24.2, 26.2, 28.5,
          30.8, 31.1, 31.4, 31.7, 32.0, 32.3, 33.4, 34.2, 35.3, 35.7]


def generate(destination: Path):
    destination.parent.mkdir(parents=True, exist_ok=True)
    count = round(RATE * DURATION)
    samples = [0.0] * count
    rng = random.Random(17704743)
    # Low, warm harmonic drone; everything is synthesized, with no sampled audio.
    for i in range(count):
        t = i / RATE
        fade = min(1, t / 2, (DURATION - t) / 1.5)
        samples[i] = fade * (.018 * math.sin(2 * math.pi * 130.8128 * t)
                             + .012 * math.sin(2 * math.pi * 195.9977 * t)
                             + .009 * math.sin(2 * math.pi * 261.6256 * t))
    for index, at in enumerate(EVENTS):
        start = round(at * RATE)
        length = round((.24 if at < 30.8 or at > 33 else .45) * RATE)
        filtered = 0.0
        for n in range(length):
            if start + n >= count:
                break
            t = n / RATE
            envelope = math.sin(math.pi * n / length) ** 1.5
            noise = rng.uniform(-1, 1)
            filtered = .78 * filtered + .22 * noise
            paper = (noise - filtered) * envelope * .085
            tap = math.sin(2 * math.pi * (430 + index % 5 * 70) * t) * math.exp(-t * 32) * .075
            samples[start + n] += paper + tap
    with wave.open(str(destination), 'wb') as output:
        output.setnchannels(2)
        output.setsampwidth(2)
        output.setframerate(RATE)
        data = bytearray()
        for value in samples:
            value = max(-1, min(1, value))
            sample = round(value * 32767)
            data.extend(struct.pack('<hh', sample, sample))
        output.writeframes(data)


if __name__ == '__main__':
    generate(Path(sys.argv[1] if len(sys.argv) > 1 else 'out/paper-score.wav'))
