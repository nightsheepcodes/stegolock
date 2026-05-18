<div align="center">

# STEGOLOCK: A CLOUD-BASED WEB APPLICATION BUILT ON A RECONSTRUCTION-DEPENDENT SECURITY ARCHITECTURE FOR DIGITAL DOCUMENT STORAGE
 
<br>

### An Information Technology Capstone Project
Presented to the Faculty of the College of Information and Computing
**University of Southeastern Philippines**
Bo. Obrero, Davao City

<br>
<br>

#### In Partial Fulfillment of the Requirements for the Degree of
### BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY
 
<br>
<br>
<br>

**Corpin, Jinnelyn M.**
**Icalina, Joshua R.**
**Pasaporte, John Christian N.**
**Ranas, Elezabeth R.**

<br>
<br>
<br>
<br>

Adviser
**Reyes, Ariel Roy L., DIT**

</div>

<br>
<br>
<br>

---

## ABSTRACT

This study presents the development and evaluation of StegoLock, a web-based document storage platform that implements a reconstruction-dependent security architecture to protect sensitive digital assets in cloud environments. Traditional cloud storage often relies on single-layer encryption or centralized access controls, which remain vulnerable to database compromises and credential theft. StegoLock addresses these vulnerabilities through a "Three-Pillar" defense model: (1) a two-stage key derivation process utilizing PBKDF2-HMAC-SHA256 and HKDF to derive session-bound AES-256-GCM encryption keys; (2) a structural segmentation process that divides encrypted documents into multiple independent fragments; and (3) a multimedia steganographic layer that conceals these fragments within a heterogeneous set of carrier files (PNG, WAV, and TXT) before distributing them across Backblaze B2 cloud storage.

The system was evaluated using the ISO/IEC 25010 quality model, incorporating objective technical audits and subjective user feedback. Results demonstrate that StegoLock achieves 100% data integrity during reconstruction while maintaining high usability scores (GWM 4.53) and performance efficiency. Technical audits confirmed that the steganographic expansion overhead (up to 21.0x) is an acceptable trade-off for the enhanced security provided by low-density embedding. The study concludes that the integration of encryption, segmentation, and steganography effectively abstracts backend complexity for the user while providing a robust, multi-layered defense against unauthorized data reconstruction.

**Keywords**: AES-256-GCM, PBKDF2, HKDF, Multimedia Steganography, Cloud Storage Security, Document Segmentation, ISO/IEC 25010.
