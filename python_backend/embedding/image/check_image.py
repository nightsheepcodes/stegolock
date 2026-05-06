import sys
from PIL import Image

USAGE_RATIO = 0.15

def get_image_embedding_capacity(image_path):
    """
    Validates PNG or JPEG image for LSB embedding and returns usable and total capacity (in bytes).

    Conditions:
    - Must be PNG or JPEG
    - Must be RGB, RGBA, or convertible to RGB

    Returns:
    - (usable_bytes, total_bytes) if valid
    - (-1, -1) if not valid
    """

    try:
        # --- Open image ---
        img = Image.open(image_path)

        # --- Validate format ---
        if img.format not in ['PNG', 'JPEG']:
            return -1, -1

        # --- Validate mode and convert if needed ---
        if img.mode not in ['RGB', 'RGBA']:
            # Convert grayscale ('L') or CMYK to RGB for consistent capacity calculation
            img = img.convert('RGB')
        
        # Determine channels
        if img.mode in ['RGB', 'RGBA']:
            channels = len(img.getbands())
        else:
            channels = 3  # After conversion to RGB

        width, height = img.size

        # --- Compute capacity ---
        total_pixels = width * height
        total_bits = total_pixels * channels  # 1 LSB per channel
        total_bytes = total_bits // 8

        usable_bits = int(total_bits * USAGE_RATIO)
        usable_bytes = (usable_bits // 8) - 15 # Subtract 15 bytes for delimiter '###STEGOLOCK###'

        return max(0, usable_bytes), total_bytes

    except Exception:
        return -1, -1


# ------------------- CLI execution -------------------
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python check_image.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]

    usable, total = get_image_embedding_capacity(image_path)
    print(f"{usable},{total}")
