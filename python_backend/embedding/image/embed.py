import sys
import numpy as np
from PIL import Image

SAFETY_PERCENT = 15 #Percentage of LSB capacity to use (default 15%)

# Get safe capacity in bytes (with safety margin)
def get_image_safe_capacity(image_path):
    img = Image.open(image_path)
    width, height = img.size
    channels = len(img.getbands()) # RGB=3, RGBA=4
    total_bits = width * height * channels
    total_bytes = total_bits // 8
    safe_bytes = int(total_bytes * (SAFETY_PERCENT / 100))
    return width, height, safe_bytes

# LSB embedding
def embed(image_path, output_path, data_bytes):
    img = Image.open(image_path)
    if img.mode not in ['RGB', 'RGBA']:
        img = img.convert('RGB')
    
    img_data = np.array(img)
    shape = img_data.shape
    dtype = img_data.dtype
    
    DELIMITER = b'###STEGOLOCK###'
    full_payload = data_bytes + DELIMITER
    
    _, _, safe_bytes = get_image_safe_capacity(image_path)
    if len(data_bytes) > safe_bytes:
        raise Exception(f"Payload too large! Max safe size: {safe_bytes} bytes")

    payload_bits = np.unpackbits(np.frombuffer(full_payload, dtype=np.uint8))
    flat_img = img_data.flatten()
    
    if len(payload_bits) > len(flat_img):
        raise Exception("Payload exceeds total LSB capacity of the image")

    # Use 0xFE (254) for uint8 to satisfy NumPy 2.0 casting rules
    flat_img[:len(payload_bits)] = (flat_img[:len(payload_bits)] & 0xFE) | payload_bits
    
    optimized_img_data = flat_img.reshape(shape)
    final_img = Image.fromarray(optimized_img_data.astype(dtype))
    final_img.save(output_path)
    print(0)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        sys.exit(1)
    input_image, output_image, data_file = sys.argv[1], sys.argv[2], sys.argv[3]
    with open(data_file, "rb") as f:
        data = f.read()
    try:
        embed(input_image, output_image, data)
    except Exception as e:
        print(f"Embedding failed: {e}")
        sys.exit(1)
