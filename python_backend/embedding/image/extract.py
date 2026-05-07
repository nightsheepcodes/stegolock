import sys
import numpy as np
from PIL import Image

DELIMITER = b'###STEGOLOCK###'

def extract(image_path):
    img = Image.open(image_path)
    if img.mode not in ['RGB', 'RGBA']:
        img = img.convert('RGB')
    
    data = np.array(img)
    lsbs = np.bitwise_and(data, 1).flatten()
    packed_bytes = np.packbits(lsbs)
    data_bytes = packed_bytes.tobytes()

    end_index = data_bytes.find(DELIMITER)
    if end_index == -1:
        raise Exception("Delimiter not found — extraction failed. The file might not be locked or the key is wrong.")

    return data_bytes[:end_index]

if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(1)
    stego_image, output_file = sys.argv[1], sys.argv[2]
    try:
        payload = extract(stego_image)
        with open(output_file, "wb") as f:
            f.write(payload)
        print(f"Extraction successful!")
    except Exception as e:
        print(f"Extraction failed: {e}")
        sys.exit(1)
