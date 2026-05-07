import sys
import numpy as np
from scipy.io import wavfile

DELIMITER = b'###STEGOLOCK###'  # Marks end of payload

def embed_wav(input_wav, output_wav, payload_file):
    """
    Embeds payload into WAV LSB using NumPy for memory efficiency.
    """
    # Read WAV
    rate, audio = wavfile.read(input_wav)
    original_shape = audio.shape
    dtype = audio.dtype

    # Flatten audio to handle mono/stereo the same way
    audio_flat = audio.flatten()

    # Load payload
    with open(payload_file, "rb") as f:
        payload = f.read() + DELIMITER

    # Convert payload bytes to bit array using numpy
    payload_bits = np.unpackbits(np.frombuffer(payload, dtype=np.uint8))
    num_bits = len(payload_bits)

    # Capacity check
    if num_bits > len(audio_flat):
        raise Exception(f"Payload too large for this WAV. Max bits: {len(audio_flat)}, required: {num_bits}")

    # Perform LSB replacement using vectorized operations
    # Zero out the LSB and OR it with the payload bits
    audio_flat[:num_bits] = (audio_flat[:num_bits] & ~1) | payload_bits

    # Reshape back to original shape
    audio_embedded = audio_flat.reshape(original_shape)

    # Save stego WAV
    wavfile.write(output_wav, rate, audio_embedded.astype(dtype))

    print(0) #offset: to be stored in the map of fragment to cover metadata

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python embed.py input.wav output.wav payload.bin")
        sys.exit(1)

    input_wav = sys.argv[1]
    output_wav = sys.argv[2]
    payload_file = sys.argv[3]

    try:
        embed_wav(input_wav, output_wav, payload_file)
    except Exception as e:
        print(f"Embedding failed: {e}")
        sys.exit(1)
