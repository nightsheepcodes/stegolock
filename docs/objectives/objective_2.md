# Objective 2: Design and implement a segmentation process with steganographic embedding and cloud scattering

## Objective Statement
To design and implement a segmentation process that splits the encrypted document into multiple segments and hides them through a steganographic embedding process into cover files, which are scattered across the application’s cloud storage to enhance security.

## 1. Segmentation Process
The system implements a dynamic fragmentation strategy called **"Right-Sized Fluid Splitting"**. This process ensures that the encrypted payload is divided into manageable segments that fit perfectly within the available capacity of selected cover files.

*   **Logic:** The splitting ratio is determined by the `encrypted_size` of the document and the `capacity` of the selected covers.
*   **Tiered Categorization:** Documents are categorized into tiers (Small, Medium, Large) to determine the optimal fragment size and cover selection strategy.
*   **Idempotency:** The process includes a cleanup phase to ensure that failed attempts do not leave orphaned fragments in the database.

## 2. Steganographic Embedding Process
Stegolock uses a multi-media steganography engine that supports three distinct media types to increase the complexity for any potential attacker (diversity defense).

### A. Media Types and Techniques
| Media Type | File Format | Technique | Implementation |
| :--- | :--- | :--- | :--- |
| **Image** | PNG | Least Significant Bit (LSB) | Uses `Pillow` library in Python. Implements a 15% safety margin to ensure zero visual degradation. |
| **Audio** | WAV | LSB Encoding | Uses `scipy.io.wavfile` and `numpy`. Modifies the least significant bits of the audio samples. |
| **Text** | TXT | Bit-level Modification | Random offset embedding at the byte level to hide binary data within text streams. |

### B. Security Features
*   **Delimiter Marking:** Each fragment is appended with a unique delimiter (`###STEGOLOCK###`) to allow precise reconstruction during the retrieval phase.
*   **Capacity Guard:** The system performs a "Capacity Check" before embedding to ensure the payload does not exceed the safe limit of the cover file, preventing visual or audible distortion.

## 3. Cloud Storage Scattering
Once fragments are embedded into "stego files," they are distributed across cloud storage to prevent a single point of failure or a centralized data breach.

*   **Scattering Mechanism:** Each stego file is uploaded as a standalone object to **Backblaze B2**.
*   **Mapping:** The relationship between the document, its fragments, and the cloud file IDs is stored in a `StegoMap` and `StegoFile` table, creating a "virtual reconstruction" requirement.
*   **Batch Uploading:** For performance efficiency, fragments are uploaded in parallel batches.

## 4. Evidence of Achievement (Code References)

| Component | Logic Description | File Reference |
| :--- | :--- | :--- |
| **Fluid Splitting** | Implementation of the segmentation logic. | [ProcessSteganoJob.php:L346-416](file:///d:/laragon/www/stegolock/app/Jobs/ProcessSteganoJob.php#L346-L416) |
| **Cover Selection** | Logic for picking 1 Text, 1 Audio, and 1 Image cover. | [ProcessSteganoJob.php:L208-280](file:///d:/laragon/www/stegolock/app/Jobs/ProcessSteganoJob.php#L208-L280) |
| **Image Embedding** | Python script for LSB steganography in images. | [image/embed.py](file:///d:/laragon/www/stegolock/python_backend/embedding/image/embed.py) |
| **Audio Embedding** | Python script for LSB steganography in audio. | [audio/embed.py](file:///d:/laragon/www/stegolock/python_backend/embedding/audio/embed.py) |
| **Cloud Scattering** | Batch upload and cloud mapping logic. | [ProcessSteganoJob.php:L418-465](file:///d:/laragon/www/stegolock/app/Jobs/ProcessSteganoJob.php#L418-L465) |

## 5. Conclusion
Objective 2 has been **fully achieved**. The application successfully splits encrypted data, hides it within a diverse set of cover files using steganography, and scatters the resulting files across cloud storage, significantly enhancing the security of the stored documents.
