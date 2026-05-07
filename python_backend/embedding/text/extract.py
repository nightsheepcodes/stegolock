import sys
import numpy as np

DELIMITER = b'###STEGOLOCK###'

def extract(stego_file, output_file, offset):
    """
    Extract payload from stego text file starting at offset using NumPy for memory efficiency.
    """
    with open(stego_file, 'rb') as f:
        # Move to offset
        f.seek(offset)
        # Read the rest of the file
        stego_bytes = np.fromfile(f, dtype=np.uint8)

    # Extract LSBs (vectorized)
    lsbs = np.bitwise_and(stego_bytes, 1)
    
    # Pack bits into bytes using NumPy
    packed_bytes = np.packbits(lsbs)
    data_bytes = packed_bytes.tobytes()

    # Look for delimiter
    delimiter_index = data_bytes.find(DELIMITER)
    if delimiter_index == -1:
        raise Exception("Delimiter not found — extraction failed or wrong offset!")

    recovered_payload = data_bytes[:delimiter_index]

    # Write recovered fragment
    with open(output_file, 'wb') as f:
        f.write(recovered_payload)

    print(f"Extraction successful: {len(recovered_payload)} bytes recovered")

if __name__ == "__main__":
    # Arguments: stego_file, output_file, offset
    if len(sys.argv) < 4:
        print("Usage: python extract.py <stego_file> <output_file> <offset>")
        sys.exit(1)

    stego_file = sys.argv[1]
    output_file = sys.argv[2]
    offset = int(sys.argv[3])

    try:
        extract(stego_file, output_file, offset)
    except Exception as e:
        print(f"Extraction failed: {e}")
        sys.exit(1)
