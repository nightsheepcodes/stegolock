import sys
import random
import numpy as np

DELIMITER = b'###STEGOLOCK###'

def embed(input_text_file, output_text_file, data_file):
    """
    Embeds payload into text file LSB using NumPy for memory efficiency.
    """
    with open(input_text_file, 'rb') as f:
        cover_bytes = np.fromfile(f, dtype=np.uint8)

    with open(data_file, 'rb') as f:
        payload_bytes = f.read() + DELIMITER

    # Convert payload bytes to bit array using numpy
    payload_bits = np.unpackbits(np.frombuffer(payload_bytes, dtype=np.uint8))
    
    cover_len = len(cover_bytes)
    payload_len = len(payload_bits)

    if payload_len > cover_len:
        raise Exception("Payload too large for this text file!")

    # Calculate random offset
    max_offset = cover_len - payload_len
    offset = random.randint(0, max_offset)

    # Perform LSB replacement using vectorized operations
    # Zero out the LSB and OR it with the payload bits
    # Use 0xFE for uint8 (cover_bytes is uint8)
    cover_bytes[offset : offset + payload_len] = (
        cover_bytes[offset : offset + payload_len] & 0xFE
    ) | payload_bits

    with open(output_text_file, 'wb') as f:
        f.write(cover_bytes.tobytes())

    print(offset) #to be stored in the map of fragment to cover metadata

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python embed.py <input_text> <output_text> <data_file>")
        sys.exit(1)
        
    try:
        embed(sys.argv[1], sys.argv[2], sys.argv[3])
    except Exception as e:
        print(f"Embedding failed: {e}")
        sys.exit(1)
