#!/usr/bin/env python3
"""
StegoLock: Steganalysis & Imperceptibility Testing Suite
-------------------------------------------------------
Author: StegoLock Engineering Team
Description: An academic-grade, free, open-source utility designed to run statistical 
             and visual steganalysis attacks on images (PNG) and audio (WAV) carrier files.
             
Attacks Included:
1. Image Bit-Plane Slicing (Visual Attack)
2. Image Westfeld's Chi-Square Attack (Statistical LSB Analysis)
3. Audio LSB Bitstream Playback Extraction (Aural Attack)
4. Audio Shannon Entropy & Zero-Crossing Auditing (Statistical Audio Analysis)
"""

import os
import sys
import math
import numpy as np
from PIL import Image
from scipy.io import wavfile

# =====================================================================
# 1. IMAGE STEGANALYSIS ENGINE
# =====================================================================

def analyze_image_bit_plane(image_path, output_path):
    """
    Visual Bit-Plane Slicing Attack:
    Extracts the 0th (LSB) bit-plane of all color channels and saves it as a 
    binary image. In natural images, the LSB plane is somewhat noisy but retains
    visible contours of the subject. When an encrypted payload (high entropy)
    is hidden sequentially, it creates a highly noticeable, localized block 
    of pure, uniform salt-and-pepper noise (static) at the start of the image.
    """
    print(f"[*] Executing Visual Bit-Plane Slicing Attack on: {os.path.basename(image_path)}")
    img = Image.open(image_path)
    if img.mode not in ['RGB', 'RGBA']:
        img = img.convert('RGB')
        
    img_data = np.array(img)
    
    # Isolate the LSB (bit 0) of every pixel component
    lsb_plane = img_data & 1
    
    # Scale to full 8-bit visual range (0 -> 0, 1 -> 255)
    lsb_visual = lsb_plane * 255
    
    # Save the LSB sliced image
    final_img = Image.fromarray(lsb_visual.astype(np.uint8))
    final_img.save(output_path)
    print(f"[+] Visual LSB slice saved successfully to: {output_path}")
    print("[!] Check the image: A sharp transition from structural textures to uniform static indicates LSB steganography.")


def run_chi_square_attack(image_path, block_size=1024):
    """
    Westfeld's Chi-Square Attack (Statistical Steganalysis):
    Analyzes LSB equalization in Pairs of Values (PoVs) e.g., {2k, 2k+1}.
    LSB embedding equalizes the frequencies of odd and even values in these pairs.
    This function computes the Chi-Square statistic and calculates the p-value
    (probability of embedding) over sliding spatial blocks of the image.
    """
    print(f"[*] Executing Westfeld's Chi-Square Attack on: {os.path.basename(image_path)}")
    img = Image.open(image_path)
    if img.mode not in ['RGB', 'RGBA']:
        img = img.convert('RGB')
        
    flat_img = np.array(img).flatten()
    total_len = len(flat_img)
    
    # We slice the image into sequential blocks and calculate the Chi-Square p-value for each block
    num_blocks = min(100, total_len // block_size)
    if num_blocks < 2:
        print("[-] Image size too small for meaningful block-based Chi-Square analysis.")
        return
    
    detected = False
    stego_indices = []
    
    print(f"[*] Image length: {total_len} values. Running analysis over {num_blocks} segments...")
    print("Segment | Spatial Coverage | p-value (LSB Equalization Probability) | Classification")
    print("-" * 85)
    
    for i in range(num_blocks):
        start = i * block_size
        end = start + block_size
        block = flat_img[start:end]
        
        # Calculate observed frequencies of Pairs of Values (PoVs)
        # We group values 0-255 into 128 pairs: (0,1), (2,3), ..., (254, 255)
        observed, _ = np.histogram(block, bins=256, range=(0, 256))
        
        chi_sq = 0.0
        degrees_of_freedom = 0
        
        for k in range(128):
            y_2k = observed[2 * k]
            y_2k_1 = observed[2 * k + 1]
            
            # Expected frequency under LSB embedding hypothesis is the average of the pair
            expected = (y_2k + y_2k_1) / 2.0
            
            if expected > 0:
                chi_sq += ((y_2k - expected) ** 2) / expected
                degrees_of_freedom += 1
        
        # Calculate the p-value (cumulative probability of Chi-Square distribution)
        # Using a simplified high-performance survival function approximation for DoF
        if degrees_of_freedom > 0:
            # Under null hypothesis of random LSB, chi_sq should be very small.
            # A large chi_sq means values are unbalanced (natural).
            # A very small chi_sq means values are perfectly balanced (equalized/stego).
            # p-value represents the probability that the values are equalized due to LSB stego.
            # Mathematically: p = 1 - CDF_chi_sq(chi_sq, DoF)
            p_val = survival_probability_chi_square(chi_sq, degrees_of_freedom - 1)
        else:
            p_val = 0.0
            
        coverage = f"{(start/total_len)*100:5.2f}% - {(end/total_len)*100:5.2f}%"
        
        # If p-value is extremely close to 1.0 (threshold > 0.95), LSB equalization is highly likely
        if p_val > 0.95:
            classification = "⚠️  STEGO DETECTED"
            detected = True
            stego_indices.append(end)
        else:
            classification = "🟢 Clean (Natural)"
            
        # Log every 5th segment or stego detections to prevent spam, but show full picture
        if i % 5 == 0 or p_val > 0.95:
            print(f"{i:7d} | {coverage} | {p_val:35.32f} | {classification}")
            
    print("-" * 85)
    if detected:
        estimated_bits = max(stego_indices)
        estimated_bytes = estimated_bits // 8
        print(f"[!] STEGANALYSIS RESULT: steganography POSITIVELY DETECTED.")
        print(f"[!] Estimated payload boundary: first {estimated_bits} elements of flat array.")
        print(f"[!] Estimated hidden message size: ~{estimated_bytes:,} bytes.")
        print("[!] SECURITY REMEDIATION REQUIRED: Sequential LSB is highly vulnerable to Westfeld's attack.")
        print("[!] SUGGESTED FIX: Migrate to PRNG-scattered randomized pixel selection to defeat spatial block analysis.")
    else:
        print("[+] STEGANALYSIS RESULT: NO steganography detected (Clean).")
        print("[+] The carrier remains statistically indistinguishable from a natural cover image under first-order PoVs.")

def survival_probability_chi_square(x, df):
    """
    Approximates the survival probability (1 - CDF) of a Chi-Square distribution 
    without needing scipy in environments where it might fail, providing extreme reliability.
    """
    if x <= 0:
        return 1.0
    # Wilson-Hilferty transformation of Chi-Square to Normal distribution
    # This is a highly accurate approximation for df >= 1
    norm_val = (((x / df) ** (1/3)) - (1 - 2 / (9 * df))) / math.sqrt(2 / (9 * df))
    
    # Calculate survival function of standard normal distribution: Q(z) = 0.5 * erfc(z / sqrt(2))
    try:
        return 0.5 * math.erfc(norm_val / math.sqrt(2))
    except:
        # Fallback for overflows
        return 1.0 if norm_val < 0 else 0.0

# =====================================================================
# 2. AUDIO STEGANALYSIS ENGINE
# =====================================================================

def analyze_audio_lsb(input_wav, output_wav):
    """
    Aural Bit-Plane Extraction Attack:
    Extracts the 0th bit of all audio samples and amplifies it into a full-scale
    16-bit or 8-bit WAV file. Natural audio LSB sounds like a faint, low-amplitude 
    whisper of the original song/audio. Sequential encrypted stego data introduces
    a distinct, deafening roar of pure white noise/static at the start that 
    cuts off precisely where the payload ends.
    """
    print(f"[*] Executing Aural LSB Extraction Attack on: {os.path.basename(input_wav)}")
    rate, audio = wavfile.read(input_wav)
    original_shape = audio.shape
    dtype = audio.dtype
    
    audio_flat = audio.flatten()
    
    # Isolate the LSB (bit 0)
    lsb_stream = audio_flat & 1
    
    # Amplify the LSB to make it audible (0 -> min level, 1 -> max level)
    if dtype == np.uint8:
        # Unsigned 8-bit: LSB 0 becomes 0, LSB 1 becomes 255
        lsb_audible = lsb_stream * 255
    else:
        # Signed 16-bit: LSB 0 becomes -32768, LSB 1 becomes 32767
        lsb_audible = np.where(lsb_stream == 1, 32767, -32768)
        
    # Reshape back to original mono/stereo format
    lsb_audio_embedded = lsb_audible.reshape(original_shape)
    
    # Save the LSB audio file
    wavfile.write(output_wav, rate, lsb_audio_embedded.astype(dtype))
    print(f"[+] Audible LSB stream saved successfully to: {output_wav}")
    print("[!] Play this WAV file: A transition from harsh, loud television static to gentle background hiss")
    print("    indicates a sequential LSB payload.")


def run_audio_entropy_audit(input_wav, segment_size=4096):
    """
    Statistical Entropy Auditing:
    Measures the Shannon entropy of the extracted LSB bitstream in local windows.
    Encrypted payloads are highly random (approaching 1.0 bit of entropy per sample).
    Natural LSBs are statistically correlated with the parent audio waveform,
    exhibiting much lower entropy (typically 0.4 - 0.7).
    """
    print(f"[*] Executing Statistical Entropy Auditing on: {os.path.basename(input_wav)}")
    rate, audio = wavfile.read(input_wav)
    audio_flat = audio.flatten()
    total_samples = len(audio_flat)
    
    # Isolate the LSB bitplane
    lsb_stream = audio_flat & 1
    
    num_segments = min(100, total_samples // segment_size)
    if num_segments < 2:
        print("[-] Audio file too short for entropy window auditing.")
        return
        
    detected = False
    anomaly_ends = 0
    
    print(f"[*] Audio length: {total_samples} samples. Auditing entropy over {num_segments} windows...")
    print("Window | Timeline (sec) | LSB Shannon Entropy (bits/sample) | Classification")
    print("-" * 80)
    
    for i in range(num_segments):
        start = i * segment_size
        end = start + segment_size
        block = lsb_stream[start:end]
        
        # Calculate probability of 0 and 1 in the LSB plane
        count_ones = np.sum(block == 1)
        p1 = count_ones / segment_size
        p0 = 1.0 - p1
        
        # Calculate Shannon Entropy: H = -sum(p * log2(p))
        entropy = 0.0
        if p0 > 0:
            entropy -= p0 * math.log2(p0)
        if p1 > 0:
            entropy -= p1 * math.log2(p1)
            
        time_sec = f"{(start/rate):5.2f}s - {(end/rate):5.2f}s"
        
        # Standard threshold: Encrypted payloads yield entropy extremely close to 1.0 (typically > 0.999)
        # Natural audio LSBs, even in noisy regions, are rarely perfectly uniform due to sample correlations.
        if entropy > 0.998:
            classification = "⚠️  STEGO DETECTED (High Entropy)"
            detected = True
            anomaly_ends = end
        else:
            classification = "🟢 Clean / Natural Audio LSB"
            
        if i % 5 == 0 or entropy > 0.998:
            print(f"{i:6d} | {time_sec} | {entropy:31.28f} | {classification}")
            
    print("-" * 80)
    if detected:
        estimated_bits = anomaly_ends
        estimated_bytes = estimated_bits // 8
        print(f"[!] STEGANALYSIS RESULT: Stego hidden data POSITIVELY DETECTED.")
        print(f"[!] Estimated payload ends at sample: {anomaly_ends} (~{anomaly_ends/rate:.2f} seconds).")
        print(f"[!] Estimated payload size: ~{estimated_bytes:,} bytes.")
        print("[!] SECURITY REMEDIATION REQUIRED: Sequential LSB audio embedding alters statistical entropy signatures.")
        print("[!] SUGGESTED FIX: Spread the message across the entire track using a PRNG step key to avoid high-density blocks.")
    else:
        print("[+] STEGANALYSIS RESULT: NO steganography detected (Clean).")
        print("[+] The audio carrier LSB exhibits natural sample-to-sample correlations.")

# =====================================================================
# CLI APPLICATION ORCHESTRATOR
# =====================================================================

def print_banner():
    print("""
=====================================================================
          STEGOLOCK: STEGANALYSIS & IMPERCEPTIBILITY TEST SUITE
=====================================================================
    """)

if __name__ == "__main__":
    print_banner()
    if len(sys.argv) < 3:
        print("Usage:")
        print("  Image Analysis: python steganalysis_suite.py image <input_image.png> [output_lsb.png]")
        print("  Audio Analysis: python steganalysis_suite.py audio <input_audio.wav> [output_lsb.wav]")
        sys.exit(1)
        
    mode = sys.argv[1].lower().strip()
    input_file = sys.argv[2]
    
    if not os.path.exists(input_file):
        print(f"[-] Error: Target carrier file '{input_file}' does not exist.")
        sys.exit(1)
        
    if mode == "image":
        default_out = "lsb_plane_" + os.path.basename(input_file)
        out_image = sys.argv[3] if len(sys.argv) > 3 else default_out
        
        # 1. Run Visual plane extraction
        analyze_image_bit_plane(input_file, out_image)
        print()
        # 2. Run Chi-Square statistical detection
        run_chi_square_attack(input_file)
        
    elif mode == "audio":
        default_out = "lsb_audible_" + os.path.basename(input_file)
        out_audio = sys.argv[3] if len(sys.argv) > 3 else default_out
        
        # 1. Run Aural bit-plane extraction
        analyze_audio_lsb(input_file, out_audio)
        print()
        # 2. Run Statistical entropy audit
        run_audio_entropy_audit(input_file)
        
    else:
        print(f"[-] Error: Unsupported mode '{mode}'. Choose either 'image' or 'audio'.")
        sys.exit(1)
