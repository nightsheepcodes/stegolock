# CHAPTER IV
# RESULTS AND DISCUSSION

This chapter outlines the outcomes derived from the execution and assessment of the proposed system. It provides an in-depth analysis and interpretation of the data gathered to support the study's objectives. The results are presented in a structured and coherent manner, illustrating the system's performance based on the tests and evaluations conducted. The findings are presented in a clear, systematic manner to demonstrate how the system performed during the tests and assessments. The findings emphasize the essential quality attributes for evaluating effectiveness, including functional suitability, security, reliability, and measures of usability and performance efficiency, supported by pertinent data collected during testing. Observations from testing are also examined to identify strengths, limitations, and areas for improvement.

Furthermore, this chapter interprets the significance of the results and explains their implications in the context of the study. Comparisons between expected and actual outcomes can provide deeper insight into the system’s behavior. The discussion aims to justify the results and connect them to the research problem, ensuring that all findings contribute meaningfully to the study's overall conclusions.

## 4.1 IMPLEMENT AES-BASED ENCRYPTION WITH A KDF-BASED KEY MANAGEMENT PROCESS TO ENSURE THE CONFIDENTIALITY AND INTEGRITY OF A DOCUMENT FILE

The security of StegoLock is built on established cryptographic methods designed to ensure data confidentiality and authenticity. This section details the implementation of the system's primary security layer, which leverages the Advanced Encryption Standard in Galois/Counter Mode (AES-GCM) to protect document files against unauthorized access and tampering.

To build a secure foundation, the system uses a key management process based on Key Derivation Functions (KDFs), which are the Password-Based Key Derivation Function 2 (PBKDF2), and the HMAC-based Extract-and-Expand Key Derivation Function (HKDF). By using PBKDF2 to harden passwords and HKDF to separate keys, StegoLock ensures that user passwords are transformed into strong keys rather than being stored directly. This approach allows the system to generate unique keys for different tasks, keeping documents secure during encryption, decryption, and sharing. The following subsections explain how these algorithms were implemented to protect the document throughout its lifecycle.

### 4.1.1 IMPLEMENTATION OF KEY DERIVATION FUNCTIONS

Key Derivation Functions (KDFs) are implemented within StegoLock to transform the user's password into strong keys, creating a secure bridge between logging in and protecting data. To achieve this, the system uses two specific types of KDFs: PBKDF2 to harden the initial password, and HKDF to generate unique keys for different tasks.

By making key generation more complex, these functions help prevent brute-force and dictionary attacks. They also ensure that the user's login password is kept separate from the keys used to encrypt files. This section explains how PBKDF2 and HKDF are configured in the application and their role in keeping every user session secure.

#### 4.1.1.1 IMPLEMENTATION OF PBKDF2
PBKDF2 is implemented during the user registration and login processes to increase the computational cost of brute-force attacks. Rather than deriving a key in a single step, the application applies two distinct rounds of PBKDF2 using SHA-256 with 100,000 iterations per round. Each round is explicitly configured to output a 32-byte (256-bit) key, directly aligning with the requirement of the system's AES-256-GCM encryption which necessitates a 256-bit key length to operate securely.

Figure 12 shows the code for implementing Round 1 of PBKDF2 during user registration. Line 42 is the generation of the authentication salt (`$auth_salt`) with a size of 16 bytes. Line 44 is the Laravel `hash_pbkdf2` function call which derives and stores a 256-bit key in the `$password_derivedKey` variable based on the user's password and the authentication salt.

<div style="background-color: #ffffff !important; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div style="color: #6a737d;">// PBKDF2 on password (Round 1)</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">42</span><span style="color: #24292e;">$auth_salt</span> = <span style="color: #6f42c1;">random_bytes</span>(<span style="color: #24292e;">Constant</span>::<span style="color: #032f62;">AUTH_SALT_LEN</span>);</div>
<br>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">44</span><span style="color: #24292e;">$password_derivedKey</span> = <span style="color: #6f42c1;">hash_pbkdf2</span>(</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">45</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #032f62;">'sha256'</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">46</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$request-&gt;password</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">47</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$auth_salt</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">48</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #005cc5;">100000</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">49</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #005cc5;">32</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">50</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #005cc5;">true</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">51</span>);</div>
</div>

<center>Figure 12. PBKDF2 on Password Code</center>

Figure 13 shows the code for implementing Round 2. Line 57 demonstrates the generation of the encryption key salt (`$ek_salt`). Line 58 executes another `hash_pbkdf2` function call to derive the final `$encryption_key` using the previously derived key and the new salt. This final key is then used to encrypt the user's Master Key before it is stored in the database.

<div style="background-color: #ffffff !important; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div style="color: #6a737d;">// Deriving the Encryption Key (Round 2)</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">57</span><span style="color: #24292e;">$ek_salt</span> = <span style="color: #6f42c1;">random_bytes</span>(<span style="color: #24292e;">Constant</span>::<span style="color: #032f62;">EK_SALT_LEN</span>);</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">58</span><span style="color: #24292e;">$encryption_key</span> = <span style="color: #6f42c1;">hash_pbkdf2</span>(</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">59</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #032f62;">'sha256'</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">60</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$password_derivedKey</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">61</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$ek_salt</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">62</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #005cc5;">100000</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">63</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #005cc5;">32</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">64</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #005cc5;">true</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">65</span>);</div>
</div>

<center>Figure 13. PBKDF2 on Encryption Key Code</center>

During **User Login**, the system retrieves the user's previously generated salts from the database and repeats this exact same two-round process in `AuthenticatedSessionController.php` to regenerate the `$encryption_key` required to unlock the stored Master Key.

#### 4.1.1.2 IMPLEMENTATION OF HKDF

The other KDF implementation in StegoLock is the HMAC-based Extract-and-Expand Key Derivation Function (HKDF). This key derivation process is specifically designed for protecting document-specific keys, ensuring that even if one document's key is compromised, all other documents remain secure because their keys are uniquely salted.

In early developmental iterations of StegoLock, HKDF was utilized to derive the Document Encryption Key (DEK) directly from the user's Master Key. However, this direct derivation approach created a rigid architectural limitation that prevented the implementation of a secure document-sharing feature, as sharing a document would necessitate exposing the underlying Master Key.

To resolve this, the system's cryptographic architecture was refactored to employ a key wrapping technique. Under the current implementation, the DEK is randomly system-generated, and HKDF is *not* used to produce the DEK that encrypts the actual file. Instead, HKDF derives a Key Encryption Key (KEK)—referred to in the codebase as the wrapping key. This wrapping key is derived from the user's Master Key, combined with a unique salt called the document salt. Furthermore, it is explicitly configured to output a 32-byte (256-bit) key, directly aligning with the requirement of the system's AES-256-GCM encryption which necessitates a 256-bit key length to operate securely. This derived wrapping key is then used to securely wrap (encrypt) the system-generated DEK.

Figure 14 shows the code for deriving the wrapping key during document encryption in `DocumentController.php`. Line 571 generates a unique cryptographic salt for the document (`$dk_salt`). Lines 572-578 utilize the Laravel `hash_hkdf` function to extract and expand a 256-bit `$wrapping_key` from the user's Master Key, the document salt, and the context string `'dek-wrapping-key'`. This derived wrapping key will subsequently be used to encrypt the DEK.

<div style="background-color: #ffffff !important; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div style="color: #6a737d;">// 4. Generate wrapping metadata</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">571</span><span style="color: #24292e;">$dk_salt</span> = <span style="color: #6f42c1;">random_bytes</span>(<span style="color: #24292e;">Constant</span>::<span style="color: #032f62;">DK_SALT_LEN</span>);</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">572</span><span style="color: #24292e;">$wrapping_key</span> = <span style="color: #6f42c1;">hash_hkdf</span>(</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">573</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #032f62;">'sha256'</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">574</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$masterKey</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">575</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #005cc5;">32</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">576</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #032f62;">'dek-wrapping-key'</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">577</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$dk_salt</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">578</span>);</div>
</div>

<center>Figure 14. HKDF Wrapping Key Derivation Code</center>

By using HKDF for key wrapping, StegoLock successfully establishes a secure key hierarchy. When a document is shared with another user, the system can safely use their respective Master Keys to unwrap and re-wrap the DEK without ever exposing the underlying encryption key itself.

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 14 Document-Level Key Derivation Flow using HKDF</center>

## 4.1.2 IMPLEMENTATION OF AES-GCM
StegoLock utilizes the Advanced Encryption Standard in Galois/Counter Mode (AES-GCM) as its primary encryption algorithm. The system configures this standard with a 256-bit key length (AES-256-GCM) to maximize data confidentiality. Additionally, AES-GCM provides authenticated encryption by generating a 16-byte (128-bit) authentication tag and requiring a unique 12-byte (96-bit) nonce for every operation. These parameters ensure that the encrypted data cannot be read by unauthorized users and mathematically prevent ciphertext tampering, such as bit-flipping or injection attacks.

To establish a comprehensive security architecture, this AES-256-GCM configuration is applied across four distinct components of the system. This section details these implementations, beginning with the encryption of the user's Master Key and the subsequent wrapping of the Document Encryption Key (DEK). It then outlines the procedural workflow for encrypting and decrypting the actual document files. Finally, it examines the document sharing mechanism, which employs AES-GCM to securely transfer the DEK to authorized recipients without exposing the underlying keys.

#### 4.1.2.1 MASTER KEY PROTECTION
The Master Key serves as the foundational cryptographic element for each user within the StegoLock architecture. It is initially generated as a cryptographically secure 256-bit random byte string during the user registration process. Because the Master Key grants access to all of a user's encrypted documents, it must be protected against both database breaches and unauthorized session access.

To achieve this, StegoLock employs AES-256-GCM to encrypt the Master Key before it is ever stored in the database. The encryption key used for this process is derived from the user's password via PBKDF2. Consequently, the database only stores the ciphertext of the Master Key, the corresponding nonce, and the authentication tag. 

When a user successfully logs in, the system re-derives the password-based encryption key to decrypt the Master Key. Once decrypted, the plaintext Master Key is never written to persistent storage. Instead, it is temporarily held in a secure Redis-backed caching layer and accessed via a short-lived, cryptographically random session token. This tokenized approach ensures the key is readily available for document encryption and decryption operations during the active session.

To mitigate the risk of key leakage or compromise, StegoLock enforces strict lifecycle controls. The session token expires automatically after a period of inactivity, at which point the Master Key is purged from the Redis cache. By restricting the plaintext Master Key to exist only fleetingly in volatile memory, the system’s architecture is designed to minimize the window of vulnerability against persistent exposure or advanced memory extraction techniques.

**Codebase Implementation**
Located in `AuthenticatedSessionController.php`:

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div style="color: #6a737d;">// Master Key Decryption during login</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">64</span><span style="color: #24292e;">$master_key</span> = <span style="color: #6f42c1;">openssl_decrypt</span>(</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">65</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #6f42c1;">base64_decode</span>(<span style="color: #24292e;">$user-&gt;master_key_enc</span>),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">66</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #032f62;">'aes-256-gcm'</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">67</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$encryption_key</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">68</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">OPENSSL_RAW_DATA</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">69</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #6f42c1;">base64_decode</span>(<span style="color: #24292e;">$user-&gt;nonce</span>),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">70</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #6f42c1;">base64_decode</span>(<span style="color: #24292e;">$user-&gt;tag</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">71</span>);</div>
<br>
<div style="color: #6a737d;">// Secure Storage in Redis with Session Token</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">78</span><span style="color: #24292e;">$storage</span> = <span style="color: #005cc5;">new</span> \<span style="color: #24292e;">App</span>\<span style="color: #24292e;">Services</span>\<span style="color: #24292e;">TemporaryKeyStorage</span>();</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">79</span><span style="color: #24292e;">$token</span> = <span style="color: #24292e;">$storage</span>-&gt;<span style="color: #6f42c1;">store</span>(<span style="color: #24292e;">$master_key, $user-&gt;id</span>);</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">82</span><span style="color: #6f42c1;">session</span>([<span style="color: #032f62;">'master_key_token'</span> =&gt; <span style="color: #24292e;">$token</span>]);</div>
</div>

#### 4.1.2.2 DOCUMENT FILE ENCRYPTION AND DECRYPTION

<center>Figure 15 Logical Flow for Authenticated Document Encryption and Decryption</center>

With the Master Key securely established within the active session, the system leverages it to perform the core cryptographic operations of the application. The protection of individual documents relies on a dual-layered encryption approach. Because storing the Document Encryption Key (DEK) in plain text alongside the document would compromise the entire encryption scheme, the DEK itself must be protected before the actual file contents are processed.

To secure the DEK, the system generates a random 256-bit key and immediately encrypts it using AES-256-GCM. The key used to perform this wrapping operation is derived from the user's Master Key via HKDF. Once wrapped, the encrypted DEK is safely stored in the database alongside the document's metadata. 

Following the key wrapping phase, the system proceeds to encrypt the physical file. The document is first compressed and then encrypted via AES-256-GCM using the plaintext DEK and a unique 96-bit nonce. When a user later requests to download or view the file, the system reverses this process by unwrapping the DEK and using it to decrypt the file payload. Throughout the decryption phase, AES-GCM implicitly validates the operation by verifying the 128-bit authentication tag, immediately halting the process if any signs of ciphertext tampering are detected.

**Codebase Implementation**
Located in `stegolock\app\Services\CryptoService.php`:

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div style="color: #6a737d;">// Authenticated Encryption using DEK</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">63</span><span style="color: #24292e;">$ciphertext</span> = <span style="color: #6f42c1;">openssl_encrypt</span>(</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">64</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$plaintext</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">65</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #032f62;">'aes-256-gcm'</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">66</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$dek</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">67</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">OPENSSL_RAW_DATA</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">68</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$nonce</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">69</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$tag</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">70</span>);</div>
<br>
<div style="color: #6a737d;">// Authenticated Decryption with Integrity Check</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">84</span><span style="color: #24292e;">$plaintext</span> = <span style="color: #6f42c1;">openssl_decrypt</span>(</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">85</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$ciphertext</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">86</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #032f62;">'aes-256-gcm'</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">87</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$dek</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">88</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">OPENSSL_RAW_DATA</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">89</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$nonce</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">90</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">$tag</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">91</span>);</div>
</div>

#### 4.1.2.3 DOCUMENT SHARING (DOCUMENT ENCRYPTION KEY RE-WRAPPING)

In the event that a user shares a file, StegoLock facilitates collaborative access through a cryptographic key re-wrapping mechanism. To grant a recipient access without needing to re-encrypt the entire underlying document, the system retrieves the owner's wrapped DEK and decrypts it within volatile memory using the owner's active Master Key (Lines 1031-1037 in Figure 16). Immediately after extraction, the system re-encrypts the raw DEK using a specialized System Share Key via AES-256-GCM (Lines 1044-1045 in Figure 16). This intermediate ciphertext allows the DEK to be safely stored in the database's document shares table while the sharing request is pending acceptance (Lines 1049-1062 in Figure 16). Note the explicit use of `base64_decode` during metadata retrieval to maintain cryptographic precision throughout these transitions. This process ensures that a recipient never interacts with the owner’s Master Key, and the system never exposes the plaintext DEK to persistent storage.

When the recipient accepts the shared document, the system unwraps the DEK from the System Share Key and immediately re-wraps it using the recipient's own Master Key.

This cryptographic handoff ensures that the system maintains strict account isolation and continuous data confidentiality. Because the sharing mechanism only manipulates the encryption keys rather than the document itself, the original file fragments remain completely untouched in storage. This architecture eliminates the need for computationally expensive re-encryption processes while guaranteeing that only explicitly authorized users possess the keys necessary to access the shared data.

<center>Figure 16 Key Wrapping Code Snippet from DocumentController.php</center>

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div style="color: #6a737d; font-style: italic;">// Stage: Share Initiation (DocumentController.php)</div>
<div style="color: #6a737d; font-style: italic;">// 1. Unwrap DEK using Owner's Master Key</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1031</span><span style="color: #005cc5;">$dek</span> = <span style="color: #005cc5;">$this</span>-&gt;<span style="color: #6f42c1;">cryptoService</span>-&gt;<span style="color: #6f42c1;">unwrapDek</span>(</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1032</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #6f42c1;">base64_decode</span>(<span style="color: #005cc5;">$document</span>-&gt;<span style="color: #e36209;">encrypted_dek</span>),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1033</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #005cc5;">$masterKey</span>, <span style="color: #6a737d; font-style: italic;">// From owner's session</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1034</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #6f42c1;">base64_decode</span>(<span style="color: #005cc5;">$document</span>-&gt;<span style="color: #e36209;">dek_nonce</span>),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1035</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #6f42c1;">base64_decode</span>(<span style="color: #005cc5;">$document</span>-&gt;<span style="color: #e36209;">dek_tag</span>),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1036</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #6f42c1;">base64_decode</span>(<span style="color: #005cc5;">$document</span>-&gt;<span style="color: #e36209;">dk_salt</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1037</span>);</div>
<br>
<div style="color: #6a737d; font-style: italic;">// 2. Wrap DEK using the System Share Key for intermediate transit</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1044</span><span style="color: #005cc5;">$systemKey</span> = <span style="color: #6f42c1;">config</span>(<span style="color: #032f62;">'app.share_key'</span>);</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1045</span><span style="color: #005cc5;">$wrapped</span> = <span style="color: #005cc5;">$this</span>-&gt;<span style="color: #6f42c1;">cryptoService</span>-&gt;<span style="color: #6f42c1;">wrapDek</span>(<span style="color: #005cc5;">$dek</span>, <span style="color: #005cc5;">$systemKey</span>);</div>
<br>
<div style="color: #6a737d; font-style: italic;">// 3. Persist the wrapped DEK for the Recipient</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1049</span><span style="color: #005cc5;">DocumentShare</span>::<span style="color: #6f42c1;">updateOrCreate</span>(</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1050</span><span style="display: inline-block; padding-left: 2rem;">[<span style="color: #032f62;">'document_id'</span> =&gt; <span style="color: #005cc5;">$docId</span>, <span style="color: #032f62;">'recipient_id'</span> =&gt; <span style="color: #005cc5;">$recipientId</span>],</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1054</span><span style="display: inline-block; padding-left: 2rem;">[</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1056</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #032f62;">'encrypted_dek'</span> =&gt; <span style="color: #6f42c1;">base64_encode</span>(<span style="color: #005cc5;">$wrapped</span>[<span style="color: #032f62;">'encrypted_dek'</span>]),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1057</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #032f62;">'dek_nonce'</span>     =&gt; <span style="color: #6f42c1;">base64_encode</span>(<span style="color: #005cc5;">$wrapped</span>[<span style="color: #032f62;">'nonce'</span>]),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1058</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #032f62;">'dek_tag'</span>       =&gt; <span style="color: #6f42c1;">base64_encode</span>(<span style="color: #005cc5;">$wrapped</span>[<span style="color: #032f62;">'tag'</span>]),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1059</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #032f62;">'dk_salt'</span>       =&gt; <span style="color: #6f42c1;">base64_encode</span>(<span style="color: #005cc5;">$wrapped</span>[<span style="color: #032f62;">'salt'</span>]),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1060</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #032f62;">'status'</span>        =&gt; <span style="color: #032f62;">'pending'</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1061</span><span style="display: inline-block; padding-left: 2rem;">]</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1062</span>);</div>
</div>

The use of HKDF-SHA256 for deriving the wrapping key is a critical security measure. It ensures that even if a master key is used for multiple purposes, the actual key used for the AES-GCM operation is cryptographically unique and statistically independent.

## 4.2 DESIGN AND IMPLEMENT A SEGMENTATION PROCESS THAT SPLITS THE ENCRYPTED DOCUMENT INTO MULTIPLE SEGMENTS AND HIDES THEM THROUGH A STEGANOGRAPHIC EMBEDDING PROCESS INTO COVER FILES, WHICH ARE SCATTERED ACROSS THE APPLICATION’S CLOUD STORAGE TO ENHANCE SECURITY

The second layer of security in StegoLock focuses on obfuscating and distributing the encrypted data to prevent unauthorized reconstruction. This section details the implementation of the system's segmentation and steganographic processes, which work together to hide the ciphertext across multiple media files stored in the cloud.

To achieve this, the system first splits the encrypted document into several fragments based on the available capacity of assigned cover files. Each fragment is then hidden within a standard PNG, WAV, or TXT file using Least Significant Bit (LSB) steganography. By scattering these stego files across cloud storage, StegoLock ensures that no single file contains the complete document or any visible indication of its hidden contents. This approach prevents attackers from accessing the data even if they intercept individual files. The following subsections explain how the system segments the encrypted document, embeds the fragments into multimedia covers, distributes them to the cloud, and safely reassembles them during retrieval.

### 4.2.1 ENCRYPTED DOCUMENT SEGMENTATION

After AES-256-GCM encryption of the document payload, the resulting ciphertext undergoes a rigorous preparatory phase before steganographic embedding can occur. This phase involves dynamically selecting appropriate cover files from the system pool, fetching and locking them for exclusive use, and employing a dynamic capacity-based segmentation algorithm to split the ciphertext into fragments that perfectly fit their assigned carriers.

**Cover Selection and Fetching**
The segmentation process begins with the `selectCovers` method, which categorizes the incoming encrypted document into a specific size tier: large (> 2MB), medium (> 500KB), or small. This tiering system enforces strict capacity boxing by defining minimum (`minCap`) and maximum (`maxCap`) capacity thresholds, ensuring that cover files assigned to the document are appropriately sized for its payload.

To maintain media diversity, the system mandates the selection of at least one text file, one audio file, and one image file for every locked document. If these three initial covers lack sufficient combined capacity to hold the entire payload, a greedy expansion fallback mechanism is triggered, incrementally selecting the largest available covers from the pool until the required capacity is met.

<div style="background-color: #ffffff !important; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">229</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #005cc5;">private</span> <span style="color: #005cc5;">function</span> selectCovers(<span style="color: #6f42c1;">Document</span> <span style="color: #24292e;">$document</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">230</span><span style="display: inline-block; padding-left: 2rem;">{</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">231</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #24292e;">$payloadSize</span> = <span style="color: #24292e;">$document</span>-&gt;encrypted_size;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">232</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">233</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #6a737d;">// 1. Categorize Tier (Strict Boxing)</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">234</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #005cc5;">if</span> (<span style="color: #24292e;">$payloadSize</span> &gt; <span style="color: #005cc5;">2097152</span>) { <span style="color: #6a737d;">// &gt; 2MB</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">235</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #24292e;">$tier</span> = <span style="color: #032f62;">&#x27;large&#x27;</span>;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">236</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #24292e;">$minCap</span> = <span style="color: #005cc5;">262144</span>; <span style="color: #6a737d;">// 256KB</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">237</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #24292e;">$maxCap</span> = <span style="color: #005cc5;">104857600</span>; <span style="color: #6a737d;">// 100MB+</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">238</span><span style="display: inline-block; padding-left: 4rem;">} <span style="color: #005cc5;">elseif</span> (<span style="color: #24292e;">$payloadSize</span> &gt; <span style="color: #005cc5;">512000</span>) { <span style="color: #6a737d;">// 500KB - 2MB</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">239</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #24292e;">$tier</span> = <span style="color: #032f62;">&#x27;medium&#x27;</span>;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">240</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #24292e;">$minCap</span> = <span style="color: #005cc5;">65536</span>; <span style="color: #6a737d;">// 64KB</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">241</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #24292e;">$maxCap</span> = <span style="color: #005cc5;">262144</span>; <span style="color: #6a737d;">// 256KB</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">242</span><span style="display: inline-block; padding-left: 4rem;">} <span style="color: #005cc5;">else</span> {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">243</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #24292e;">$tier</span> = <span style="color: #032f62;">&#x27;small&#x27;</span>;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">244</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #24292e;">$minCap</span> = <span style="color: #005cc5;">1024</span>; <span style="color: #6a737d;">// 1KB</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">245</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #24292e;">$maxCap</span> = <span style="color: #005cc5;">65536</span>; <span style="color: #6a737d;">// 64KB</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">246</span><span style="display: inline-block; padding-left: 4rem;">}</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">247</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">248</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #24292e;">$selectedCovers</span> = <span style="color: #6f42c1;">collect</span>();</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">249</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #24292e;">$remainingCapacity</span> = <span style="color: #24292e;">$payloadSize</span>;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">250</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">251</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #6a737d;">// 2. Mandate Selection (1 Text, 1 Audio, 1 Image)</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">252</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #24292e;">$types</span> = [<span style="color: #032f62;">&#x27;text&#x27;</span>, <span style="color: #032f62;">&#x27;audio&#x27;</span>, <span style="color: #032f62;">&#x27;image&#x27;</span>];</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">253</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">254</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #005cc5;">foreach</span> (<span style="color: #24292e;">$types</span> <span style="color: #005cc5;">as</span> <span style="color: #24292e;">$type</span>) {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">255</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #24292e;">$cover</span> = <span style="color: #24292e;">$this</span>-&gt;<span style="color: #6f42c1;">findBestCover</span>(<span style="color: #24292e;">$type</span>, <span style="color: #24292e;">$minCap</span>, <span style="color: #24292e;">$maxCap</span>, [], <span style="color: #032f62;">&#x27;ASC&#x27;</span>);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;"></span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #6a737d;">// ... [capacity calculations and fallback loop omitted for brevity]</span></span></div>
</div>
<center>Code Snippet 1. Dynamic Cover Selection based on Size Tiers and Capacity Boxing</center>

Once selected, the `fetchAndLockCovers` method retrieves these specific covers from the Backblaze B2 bucket or the local system cache. During this step, the database record for each cover is temporarily marked as `in_use` (acting as a short-term copy mutex) to prevent concurrent locking jobs from assigning the exact same physical cover file, guaranteeing isolation during high-volume operations.

**Dynamic Capacity-Based Segmentation**
Following cover selection, the actual segmentation of the AES-encrypted payload is performed through a dynamic capacity-based segmentation algorithm. Unlike standard chunking that splits a file into equal, fixed-size pieces, this adaptive algorithm divides the data into non-uniform fragments. The size of each fragment is determined dynamically on the fly based on three governing constraints: 
1. **Cover Capacity Limit:** The maximum amount of data the currently assigned cover file can safely conceal.
2. **Proportional Distribution:** A calculation that averages the remaining unsegmented data across all unused cover files, ensuring the ciphertext is spread evenly across the sequence rather than filling the first available cover to its absolute limit.
3. **Cover Utilization:** A safety limit that prevents the current fragment from using all remaining data, reserving at least one byte for every subsequent cover file so none are left empty.

<div style="background-color: #ffffff !important; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">367</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #005cc5;">private</span> <span style="color: #005cc5;">function</span> splitDocument(<span style="color: #6f42c1;">Document</span> <span style="color: #24292e;">$document</span>, <span style="color: #24292e;">$covers</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">368</span><span style="display: inline-block; padding-left: 2rem;">{</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">369</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #24292e;">$encryptedPath</span> = <span style="color: #6f42c1;">Storage</span>::path(<span style="color: #24292e;">$this</span>-&gt;encryptedPath);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">370</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #24292e;">$totalLength</span> = <span style="color: #6f42c1;">filesize</span>(<span style="color: #24292e;">$encryptedPath</span>);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">371</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #24292e;">$offset</span> = <span style="color: #005cc5;">0</span>;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">372</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #24292e;">$numCovers</span> = <span style="color: #24292e;">$covers</span>-&gt;<span style="color: #6f42c1;">count</span>();</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">374</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #24292e;">$mappingArray</span> = [];</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">377</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #24292e;">$handle</span> = <span style="color: #6f42c1;">fopen</span>(<span style="color: #24292e;">$encryptedPath</span>, <span style="color: #032f62;">&#x27;rb&#x27;</span>);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">378</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #005cc5;">if</span> (!<span style="color: #24292e;">$handle</span>) {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">379</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #005cc5;">throw</span> <span style="color: #005cc5;">new</span> \<span style="color: #6f42c1;">Exception</span>(<span style="color: #032f62;">&quot;Failed to open encrypted file: {<span style="color: #24292e;">$encryptedPath</span>}&quot;</span>);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">380</span><span style="display: inline-block; padding-left: 4rem;">}</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">382</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #005cc5;">try</span> {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">383</span><span style="display: inline-block; padding-left: 6rem;">foreach (<span style="color: #24292e;">$covers</span> as <span style="color: #24292e;">$index</span> =&gt; <span style="color: #24292e;">$cover</span>) {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">384</span><span style="display: inline-block; padding-left: 8rem;"><span style="color: #24292e;">$remainingData</span> = <span style="color: #24292e;">$totalLength</span> - <span style="color: #24292e;">$offset</span>;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">385</span><span style="display: inline-block; padding-left: 8rem;"><span style="color: #24292e;">$remainingCovers</span> = <span style="color: #24292e;">$numCovers</span> - <span style="color: #24292e;">$index</span> - <span style="color: #005cc5;">1</span>;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">387</span><span style="display: inline-block; padding-left: 8rem;"><span style="color: #005cc5;">if</span> (<span style="color: #24292e;">$remainingData</span> &lt;= <span style="color: #005cc5;">0</span>) <span style="color: #005cc5;">break</span>;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">389</span><span style="display: inline-block; padding-left: 8rem;"><span style="color: #005cc5;">if</span> (<span style="color: #24292e;">$remainingCovers</span> &gt; <span style="color: #005cc5;">0</span>) {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">391</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #24292e;">$capacity</span> = (int) (<span style="color: #24292e;">$cover</span>-&gt;metadata[<span style="color: #032f62;">&#x27;capacity&#x27;</span>] ?? <span style="color: #005cc5;">0</span>);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">394</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #24292e;">$maxPossible</span> = <span style="color: #24292e;">$remainingData</span> - <span style="color: #24292e;">$remainingCovers</span>;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">399</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #24292e;">$fairShare</span> = <span style="color: #6f42c1;">ceil</span>(<span style="color: #24292e;">$remainingData</span> / (<span style="color: #24292e;">$remainingCovers</span> + <span style="color: #005cc5;">1</span>));</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">403</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #24292e;">$chunkSize</span> = <span style="color: #6f42c1;">min</span>(<span style="color: #24292e;">$capacity</span>, <span style="color: #24292e;">$maxPossible</span>, <span style="color: #6f42c1;">max</span>(<span style="color: #24292e;">$fairShare</span>, <span style="color: #6f42c1;">min</span>(<span style="color: #24292e;">$capacity</span>, <span style="color: #24292e;">$remainingData</span>)));</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">407</span><span style="display: inline-block; padding-left: 8rem;">} <span style="color: #005cc5;">else</span> {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">409</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #24292e;">$chunkSize</span> = <span style="color: #24292e;">$remainingData</span>;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">410</span><span style="display: inline-block; padding-left: 8rem;">}</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">413</span><span style="display: inline-block; padding-left: 8rem;"><span style="color: #6f42c1;">fseek</span>(<span style="color: #24292e;">$handle</span>, <span style="color: #24292e;">$offset</span>);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">414</span><span style="display: inline-block; padding-left: 8rem;"><span style="color: #24292e;">$chunk</span> = <span style="color: #6f42c1;">fread</span>(<span style="color: #24292e;">$handle</span>, <span style="color: #24292e;">$chunkSize</span>);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">415</span><span style="display: inline-block; padding-left: 8rem;"><span style="color: #005cc5;">if</span> (<span style="color: #24292e;">$chunk</span> === false || <span style="color: #6f42c1;">strlen</span>(<span style="color: #24292e;">$chunk</span>) === <span style="color: #005cc5;">0</span>) {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">416</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #005cc5;">break</span>;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">417</span><span style="display: inline-block; padding-left: 8rem;">}</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">419</span><span style="display: inline-block; padding-left: 8rem;"><span style="color: #24292e;">$fragment</span> = <span style="color: #6f42c1;">Fragment</span>::<span style="color: #6f42c1;">create</span>([</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">420</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #032f62;">&#x27;fragment_id&#x27;</span> =&gt; (string) <span style="color: #6f42c1;">Str</span>::<span style="color: #6f42c1;">uuid</span>(),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">421</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #032f62;">&#x27;document_id&#x27;</span> =&gt; <span style="color: #24292e;">$document</span>-&gt;document_id,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">422</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #032f62;">&#x27;index&#x27;</span> =&gt; <span style="color: #24292e;">$index</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">423</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #032f62;">&#x27;blob&#x27;</span> =&gt; <span style="color: #6f42c1;">base64_encode</span>(<span style="color: #24292e;">$chunk</span>),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">424</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #032f62;">&#x27;size&#x27;</span> =&gt; <span style="color: #6f42c1;">strlen</span>(<span style="color: #24292e;">$chunk</span>),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">425</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #032f62;">&#x27;<span style="color: #6f42c1;">hash</span>&#x27;</span> =&gt; <span style="color: #6f42c1;">hash</span>(<span style="color: #032f62;">&#x27;sha256&#x27;</span>, <span style="color: #24292e;">$chunk</span>),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">426</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #032f62;">&#x27;status&#x27;</span> =&gt; <span style="color: #032f62;">&#x27;floating&#x27;</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">427</span><span style="display: inline-block; padding-left: 8rem;">]);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">429</span><span style="display: inline-block; padding-left: 8rem;"><span style="color: #24292e;">$mappingArray</span>[] = [</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">430</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #032f62;">&#x27;fragment_id&#x27;</span> =&gt; <span style="color: #24292e;">$fragment</span>-&gt;fragment_id,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">431</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #032f62;">&#x27;cover_id&#x27;</span> =&gt; <span style="color: #24292e;">$cover</span>-&gt;cover_id,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">432</span><span style="display: inline-block; padding-left: 10rem;"><span style="color: #032f62;">&#x27;offset&#x27;</span> =&gt; <span style="color: #005cc5;">0</span> </span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">433</span><span style="display: inline-block; padding-left: 8rem;">];</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">435</span><span style="display: inline-block; padding-left: 8rem;"><span style="color: #24292e;">$offset</span> += <span style="color: #24292e;">$chunkSize</span>;</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">436</span><span style="display: inline-block; padding-left: 6rem;">}</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">437</span><span style="display: inline-block; padding-left: 4rem;">} <span style="color: #005cc5;">finally</span> {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">438</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #6f42c1;">fclose</span>(<span style="color: #24292e;">$handle</span>);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">439</span><span style="display: inline-block; padding-left: 4rem;">}</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">441</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #6f42c1;">FragmentMap</span>::<span style="color: #6f42c1;">create</span>([</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">442</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #032f62;">&#x27;map_id&#x27;</span> =&gt; (string) <span style="color: #6f42c1;">Str</span>::<span style="color: #6f42c1;">uuid</span>(),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">443</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #032f62;">&#x27;document_id&#x27;</span> =&gt; <span style="color: #24292e;">$document</span>-&gt;document_id,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">444</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #032f62;">&#x27;fragments_in_covers&#x27;</span> =&gt; <span style="color: #24292e;">$mappingArray</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">445</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #032f62;">&#x27;status&#x27;</span> =&gt; <span style="color: #032f62;">&#x27;pending&#x27;</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">446</span><span style="display: inline-block; padding-left: 4rem;">]);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">448</span><span style="display: inline-block; padding-left: 4rem;"><span style="color: #24292e;">$document</span>-&gt;<span style="color: #6f42c1;">update</span>([</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">449</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #032f62;">&#x27;fragment_count&#x27;</span> =&gt; <span style="color: #6f42c1;">count</span>(<span style="color: #24292e;">$mappingArray</span>),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">450</span><span style="display: inline-block; padding-left: 6rem;"><span style="color: #032f62;">&#x27;status&#x27;</span> =&gt; <span style="color: #032f62;">&#x27;fragmented&#x27;</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">451</span><span style="display: inline-block; padding-left: 4rem;">]);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">452</span><span style="display: inline-block; padding-left: 2rem;">}</span></div>
</div>

<center>Figure 18 Code Snippet of Dynamic Capacity-Based Segmentation Logic</center>

As shown in Figure 18, the algorithm reads the encrypted file sequentially and computes the size for each fragment based on the three governing constraints: the cover capacity limit, the proportional distribution calculation, and the cover utilization safety limit. The last fragment always receives all remaining bytes of the encrypted file, guaranteeing that no data is lost during the split. Each produced fragment is assigned a unique identifier, recorded with its sequential index position, size in bytes, and a SHA-256 hash for integrity verification, and then saved in the database with a status of 'floating'. Finally, a `FragmentMap` is created to securely correlate each `fragment_id` with its assigned `cover_id`, establishing the structural blueprint that governs the subsequent multimedia embedding phase.

This dynamic process of segmentation ensures that fragment sizes adjust to match the exact physical constraints of their assigned cover files. By directly scaling each fragment to the safe capacity of its host cover file, the system prevents any host from exceeding its steganographic bounds, thereby achieving a mathematically balanced payload distribution without the risk of data overflow.

### 4.2.2 MULTIMEDIA STEGANOGRAPHIC EMBEDDING

Following encryption and segmentation, each ciphertext fragment is embedded into its designated cover file—adhering strictly to the mapping blueprint established during the segmentation phase—using Least Significant Bit (LSB) steganography. 

Before the actual steganographic embedding process can be executed, the system enforces a rigorous set of preliminary specifications and validation checks on each assigned cover file. These predefined media-specific constraints ensure that the cover files are structurally sound, compatible, and possess sufficient safe embedding margins to accommodate their mapped ciphertext fragments without compromising visual, auditory, or textual integrity. StegoLock relies on three distinct media types for its system-provided cover files, each governed by unique physical characteristics and steganographic capacity thresholds to prevent structural distortion or payload detection.

**System-Provided Cover Files and Capacities**

For image-based steganography, the system accepts lossless PNG cover files. During cover scanning and ingestion, the image's total LSB capacity is calculated by channels and pixels: `total_bits = width * height * channels` (where `channels = 3` for RGB or `4` for RGBA). To guarantee that the payload remains completely imperceptible to human eyes and steganalyzers, StegoLock enforces a strict steganographic usage threshold of 15% (`USAGE_RATIO = 0.15`). The safe capacity in bytes is computed by scaling this 15% threshold and subtracting 15 bytes to accommodate the custom `###STEGOLOCK###` delimiter: `usable_bytes = (total_bits * 0.15 // 8) - 15`. Any cover image with incompatible color spaces (such as grayscale or CMYK) is dynamically converted to standard RGB before capacity scanning to ensure consistency.

For audio-based steganography, uncompressed 16-bit PCM WAV cover files are utilized. To ensure high-fidelity embedding, the system checks that the sample rate is at least 44,100 Hz (`rate >= 44100`) and the bit depth is 16-bit (`audio.dtype == np.int16`). Since uncompressed PCM audio assigns one LSB per sample, the total LSB capacity in bits equals the total sample count (`total_bits = num_samples`). StegoLock applies a stealth usage ratio of 15% (`USAGE_RATIO = 0.15`) for audio files as well, ensuring that the high-frequency LSB changes do not introduce audible static noise. The usable capacity is mathematically computed as: `usable_bytes = (total_bits * 0.15) // 8`.

Unlike image and audio cover files which are pulled from a pre-uploaded system pool, text (TXT) cover files are dynamically generated on the fly if an appropriately sized UTF-8 text file is not available locally. The `generate_text_cover` method handles this by pulling random articles from a local `wiki_feeds` database table and concatenating them until the resulting text file reaches a calculated `$targetSize`. Because text steganography offers a significantly lower embedding capacity compared to binary media, StegoLock enforces an extremely aggressive 2% safety threshold (`USAGE_RATIO = 0.02`) to ensure natural language flow and avoid visual distortion. The system enforces the generation formula `$targetSize = $fragmentSize / 0.02`, guaranteeing that the generated text cover is sufficiently large to safely embed the assigned ciphertext fragment.

<div style="background-color: #ffffff !important; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1</span><span style="display: inline-block; "><span style="color: #005cc5;">import</span> <span style="color: #24292e;">sys</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">2</span><span style="display: inline-block; "><span style="color: #005cc5;">import</span> <span style="color: #24292e;">random</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">3</span><span style="display: inline-block; "><span style="color: #005cc5;">import</span> numpy <span style="color: #005cc5;">as</span> <span style="color: #24292e;">np</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">4</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">5</span><span style="display: inline-block; "><span style="color: #24292e;">DELIMITER</span> = <span style="color: #032f62;">b&#x27;###STEGOLOCK###&#x27;</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">6</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">7</span><span style="display: inline-block; "><span style="color: #005cc5;">def</span> <span style="color: #6f42c1;">embed</span>(input_text_file, output_text_file, data_file):</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">8</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #6a737d;">&quot;&quot;&quot;</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">9</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #6a737d;">Embeds payload into text file LSB using NumPy for memory efficiency.</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">10</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #6a737d;">&quot;&quot;&quot;</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">11</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">with</span> <span style="color: #6f42c1;">open</span>(input_text_file, <span style="color: #032f62;">&#x27;rb&#x27;) as f:</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">12</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">cover_bytes</span> = <span style="color: #24292e;">np</span>.<span style="color: #6f42c1;">fromfile</span>(<span style="color: #24292e;">f</span>, <span style="color: #24292e;">dtype</span>=<span style="color: #24292e;">np</span>.<span style="color: #24292e;">uint8</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">13</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">14</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">with</span> <span style="color: #6f42c1;">open</span>(data_file, <span style="color: #032f62;">&#x27;rb&#x27;) as f:</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">15</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">payload_bytes</span> = <span style="color: #24292e;">f</span>.<span style="color: #6f42c1;">read</span>() + <span style="color: #24292e;">DELIMITER</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">16</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">17</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">payload_bits</span> = <span style="color: #24292e;">np</span>.<span style="color: #6f42c1;">unpackbits</span>(<span style="color: #24292e;">np</span>.<span style="color: #6f42c1;">frombuffer</span>(<span style="color: #24292e;">payload_bytes</span>, <span style="color: #24292e;">dtype</span>=<span style="color: #24292e;">np</span>.<span style="color: #24292e;">uint8</span>))</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">18</span><span style="display: inline-block; padding-left: 2.0rem;"></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">19</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">cover_len</span> = <span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">cover_bytes</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">20</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">payload_len</span> = <span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">payload_bits</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">21</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">22</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">if</span> <span style="color: #24292e;">payload_len</span> &gt; <span style="color: #24292e;">cover_len</span>:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">23</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #005cc5;">raise</span> <span style="color: #6f42c1;">Exception</span>(<span style="color: #032f62;">&quot;Payload too large for this text file!&quot;</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">24</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">25</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">max_offset</span> = <span style="color: #24292e;">cover_len</span> - <span style="color: #24292e;">payload_len</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">26</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">offset</span> = <span style="color: #24292e;">random</span>.<span style="color: #6f42c1;">randint</span>(<span style="color: #005cc5;">0</span>, <span style="color: #24292e;">max_offset</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">27</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">28</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">cover_bytes</span>[<span style="color: #24292e;">offset</span> : <span style="color: #24292e;">offset</span> + <span style="color: #24292e;">payload_len</span>] = (</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">29</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">cover_bytes</span>[<span style="color: #24292e;">offset</span> : <span style="color: #24292e;">offset</span> + <span style="color: #24292e;">payload_len</span>] &amp; <span style="color: #005cc5;">0xFE</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">30</span><span style="display: inline-block; padding-left: 2.0rem;">) | <span style="color: #24292e;">payload_bits</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">31</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">32</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">with</span> <span style="color: #6f42c1;">open</span>(output_text_file, <span style="color: #032f62;">&#x27;wb&#x27;) as f:</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">33</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">f</span>.<span style="color: #6f42c1;">write</span>(<span style="color: #24292e;">cover_bytes</span>.<span style="color: #6f42c1;">tobytes</span>())</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">34</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">35</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #6f42c1;">print</span>(<span style="color: #24292e;">offset</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">36</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">37</span><span style="display: inline-block; "><span style="color: #005cc5;">if</span> <span style="color: #005cc5;">__name__</span> == <span style="color: #032f62;">&quot;__main__&quot;:</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">38</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">if</span> <span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">sys</span>.argv) &lt; <span style="color: #005cc5;">4</span>:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">39</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #6f42c1;">print</span>(<span style="color: #032f62;">&quot;Usage: python embed.py &lt;input_text&gt; &lt;output_text&gt; &lt;data_file&gt;&quot;</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">40</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">sys</span>.<span style="color: #6f42c1;">exit</span>(<span style="color: #005cc5;">1</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">41</span><span style="display: inline-block; padding-left: 4.0rem;"></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">42</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">try</span>:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">43</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #6f42c1;">embed</span>(<span style="color: #24292e;">sys</span>.argv[<span style="color: #005cc5;">1</span>], <span style="color: #24292e;">sys</span>.argv[<span style="color: #005cc5;">2</span>], <span style="color: #24292e;">sys</span>.argv[<span style="color: #005cc5;">3</span>])</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">44</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">except</span> <span style="color: #6f42c1;">Exception</span> <span style="color: #005cc5;">as</span> <span style="color: #24292e;">e</span>:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">45</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #6f42c1;">print</span>(<span style="color: #032f62;">f&quot;Embedding failed: {e}&quot;</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">46</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">sys</span>.<span style="color: #6f42c1;">exit</span>(<span style="color: #005cc5;">1</span>)</span></div>
</div>
<center>Code Snippet 3. Vectorized Text LSB Embedding Engine</center>

<div style="background-color: #ffffff !important; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1</span><span style="display: inline-block; "><span style="color: #005cc5;">import</span> <span style="color: #24292e;">sys</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">2</span><span style="display: inline-block; "><span style="color: #005cc5;">import</span> numpy <span style="color: #005cc5;">as</span> <span style="color: #24292e;">np</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">3</span><span style="display: inline-block; "><span style="color: #005cc5;">from</span> scipy.io <span style="color: #005cc5;">import</span> <span style="color: #24292e;">wavfile</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">4</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">5</span><span style="display: inline-block; "><span style="color: #24292e;">DELIMITER</span> = <span style="color: #032f62;">b&#x27;###STEGOLOCK###&#x27;</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">6</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">7</span><span style="display: inline-block; "><span style="color: #005cc5;">def</span> <span style="color: #6f42c1;">embed_wav</span>(<span style="color: #24292e;">input_wav</span>, <span style="color: #24292e;">output_wav</span>, <span style="color: #24292e;">payload_file</span>):</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">8</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #6a737d;">&quot;&quot;&quot;</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">9</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #6a737d;">Embeds payload into WAV LSB using NumPy for memory efficiency.</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">10</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #6a737d;">&quot;&quot;&quot;</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">11</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">rate</span>, <span style="color: #24292e;">audio</span> = <span style="color: #24292e;">wavfile</span>.<span style="color: #6f42c1;">read</span>(<span style="color: #24292e;">input_wav</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">12</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">original_shape</span> = <span style="color: #24292e;">audio</span>.shape</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">13</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">dtype</span> = <span style="color: #24292e;">audio</span>.<span style="color: #24292e;">dtype</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">14</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">15</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">audio_flat</span> = <span style="color: #24292e;">audio</span>.<span style="color: #6f42c1;">flatten</span>()</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">16</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">17</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">with</span> <span style="color: #6f42c1;">open</span>(<span style="color: #24292e;">payload_file</span>, <span style="color: #032f62;">&quot;rb&quot;) as f:</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">18</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">payload</span> = <span style="color: #24292e;">f</span>.<span style="color: #6f42c1;">read</span>() + <span style="color: #24292e;">DELIMITER</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">19</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">20</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">payload_bits</span> = <span style="color: #24292e;">np</span>.<span style="color: #6f42c1;">unpackbits</span>(<span style="color: #24292e;">np</span>.<span style="color: #6f42c1;">frombuffer</span>(<span style="color: #24292e;">payload</span>, <span style="color: #24292e;">dtype</span>=<span style="color: #24292e;">np</span>.<span style="color: #24292e;">uint8</span>))</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">21</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">num_bits</span> = <span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">payload_bits</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">22</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">23</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">if</span> <span style="color: #24292e;">num_bits</span> &gt; <span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">audio_flat</span>):</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">24</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #005cc5;">raise</span> <span style="color: #6f42c1;">Exception</span>(<span style="color: #032f62;">f&quot;Payload too large for this WAV. Max bits: {len(audio_flat)}, required: {num_bits}&quot;</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">25</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">26</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">if</span> <span style="color: #24292e;">audio_flat</span>.<span style="color: #24292e;">dtype</span> == <span style="color: #24292e;">np</span>.<span style="color: #24292e;">uint8</span>:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">27</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">audio_flat</span>[:<span style="color: #24292e;">num_bits</span>] = (<span style="color: #24292e;">audio_flat</span>[:<span style="color: #24292e;">num_bits</span>] &amp; <span style="color: #005cc5;">0xFE</span>) | <span style="color: #24292e;">payload_bits</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">28</span><span style="display: inline-block; padding-left: 2.0rem;">else:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">29</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">audio_flat</span>[:<span style="color: #24292e;">num_bits</span>] = (<span style="color: #24292e;">audio_flat</span>[:<span style="color: #24292e;">num_bits</span>] &amp; ~1) | <span style="color: #24292e;">payload_bits</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">30</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">31</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">audio_embedded</span> = <span style="color: #24292e;">audio_flat</span>.<span style="color: #6f42c1;">reshape</span>(<span style="color: #24292e;">original_shape</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">32</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">33</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">wavfile</span>.<span style="color: #6f42c1;">write</span>(<span style="color: #24292e;">output_wav</span>, <span style="color: #24292e;">rate</span>, <span style="color: #24292e;">audio_embedded</span>.<span style="color: #6f42c1;">astype</span>(<span style="color: #24292e;">dtype</span>))</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">34</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">35</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #6f42c1;">print</span>(<span style="color: #005cc5;">0</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">36</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">37</span><span style="display: inline-block; "><span style="color: #005cc5;">if</span> <span style="color: #005cc5;">__name__</span> == <span style="color: #032f62;">&quot;__main__&quot;:</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">38</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">if</span> <span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">sys</span>.argv) != <span style="color: #005cc5;">4</span>:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">39</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #6f42c1;">print</span>(<span style="color: #032f62;">&quot;Usage: python embed.py input.wav output.wav payload.bin&quot;</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">40</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">sys</span>.<span style="color: #6f42c1;">exit</span>(<span style="color: #005cc5;">1</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">41</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">42</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">input_wav</span> = <span style="color: #24292e;">sys</span>.argv[<span style="color: #005cc5;">1</span>]</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">43</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">output_wav</span> = <span style="color: #24292e;">sys</span>.argv[<span style="color: #005cc5;">2</span>]</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">44</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">payload_file</span> = <span style="color: #24292e;">sys</span>.argv[<span style="color: #005cc5;">3</span>]</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">45</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">46</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">try</span>:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">47</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #6f42c1;">embed_wav</span>(<span style="color: #24292e;">input_wav</span>, <span style="color: #24292e;">output_wav</span>, <span style="color: #24292e;">payload_file</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">48</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">except</span> <span style="color: #6f42c1;">Exception</span> <span style="color: #005cc5;">as</span> <span style="color: #24292e;">e</span>:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">49</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #6f42c1;">print</span>(<span style="color: #032f62;">f&quot;Embedding failed: {e}&quot;</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">50</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">sys</span>.<span style="color: #6f42c1;">exit</span>(<span style="color: #005cc5;">1</span>)</span></div>
</div>
<center>Code Snippet 4. Vectorized Audio LSB Embedding Engine</center>

<div style="background-color: #ffffff !important; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1</span><span style="display: inline-block; "><span style="color: #005cc5;">import</span> <span style="color: #24292e;">sys</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">2</span><span style="display: inline-block; "><span style="color: #005cc5;">import</span> numpy <span style="color: #005cc5;">as</span> <span style="color: #24292e;">np</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">3</span><span style="display: inline-block; "><span style="color: #005cc5;">from</span> <span style="color: #24292e;">PIL</span> <span style="color: #005cc5;">import</span> <span style="color: #24292e;">Image</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">4</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">5</span><span style="display: inline-block; "><span style="color: #24292e;">SAFETY_PERCENT</span> = <span style="color: #005cc5;">15</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">6</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">7</span><span style="display: inline-block; "><span style="color: #005cc5;">def</span> <span style="color: #6f42c1;">get_image_safe_capacity</span>(<span style="color: #24292e;">image_path</span>):</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">8</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">img</span> = <span style="color: #24292e;">Image</span>.<span style="color: #6f42c1;">open</span>(<span style="color: #24292e;">image_path</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">9</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">width</span>, <span style="color: #24292e;">height</span> = <span style="color: #24292e;">img</span>.<span style="color: #6f42c1;">size</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">10</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">channels</span> = <span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">img</span>.<span style="color: #6f42c1;">getbands</span>())</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">11</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">total_bits</span> = <span style="color: #24292e;">width</span> * <span style="color: #24292e;">height</span> * <span style="color: #24292e;">channels</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">12</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">total_bytes</span> = <span style="color: #24292e;">total_bits</span> // <span style="color: #005cc5;">8</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">13</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">safe_bytes</span> = int(<span style="color: #24292e;">total_bytes</span> * (<span style="color: #24292e;">SAFETY_PERCENT</span> / <span style="color: #005cc5;">100</span>))</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">14</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">return</span> <span style="color: #24292e;">width</span>, <span style="color: #24292e;">height</span>, <span style="color: #24292e;">safe_bytes</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">15</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">16</span><span style="display: inline-block; "><span style="color: #005cc5;">def</span> <span style="color: #6f42c1;">embed</span>(<span style="color: #24292e;">image_path</span>, <span style="color: #24292e;">output_path</span>, <span style="color: #24292e;">data_bytes</span>):</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">17</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">img</span> = <span style="color: #24292e;">Image</span>.<span style="color: #6f42c1;">open</span>(<span style="color: #24292e;">image_path</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">18</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">if</span> <span style="color: #24292e;">img</span>.mode <span style="color: #005cc5;">not</span> <span style="color: #005cc5;">in</span> [<span style="color: #032f62;">&#x27;RGB&#x27;, &#x27;RGBA&#x27;</span>]:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">19</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">img</span> = <span style="color: #24292e;">img</span>.<span style="color: #6f42c1;">convert</span>(<span style="color: #032f62;">&#x27;RGB&#x27;)</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">20</span><span style="display: inline-block; padding-left: 2.0rem;"></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">21</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">img_data</span> = <span style="color: #24292e;">np</span>.<span style="color: #6f42c1;">array</span>(<span style="color: #24292e;">img</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">22</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">shape</span> = <span style="color: #24292e;">img_data</span>.<span style="color: #24292e;">shape</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">23</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">dtype</span> = <span style="color: #24292e;">img_data</span>.<span style="color: #24292e;">dtype</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">24</span><span style="display: inline-block; padding-left: 2.0rem;"></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">25</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">DELIMITER</span> = <span style="color: #032f62;">b&#x27;###STEGOLOCK###&#x27;</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">26</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">full_payload</span> = <span style="color: #24292e;">data_bytes</span> + <span style="color: #24292e;">DELIMITER</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">27</span><span style="display: inline-block; padding-left: 2.0rem;"></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">28</span><span style="display: inline-block; padding-left: 2.0rem;">_, _, <span style="color: #24292e;">safe_bytes</span> = <span style="color: #6f42c1;">get_image_safe_capacity</span>(<span style="color: #24292e;">image_path</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">29</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">if</span> <span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">data_bytes</span>) &gt; <span style="color: #24292e;">safe_bytes</span>:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">30</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #005cc5;">raise</span> <span style="color: #6f42c1;">Exception</span>(<span style="color: #032f62;">f&quot;Payload too large! Max safe size: {safe_bytes} bytes&quot;</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">31</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">32</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">payload_bits</span> = <span style="color: #24292e;">np</span>.<span style="color: #6f42c1;">unpackbits</span>(<span style="color: #24292e;">np</span>.<span style="color: #6f42c1;">frombuffer</span>(<span style="color: #24292e;">full_payload</span>, <span style="color: #24292e;">dtype</span>=<span style="color: #24292e;">np</span>.uint8))</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">33</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">flat_img</span> = <span style="color: #24292e;">img_data</span>.<span style="color: #6f42c1;">flatten</span>()</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">34</span><span style="display: inline-block; padding-left: 2.0rem;"></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">35</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">if</span> <span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">payload_bits</span>) &gt; <span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">flat_img</span>):</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">36</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #005cc5;">raise</span> <span style="color: #6f42c1;">Exception</span>(<span style="color: #032f62;">&quot;Payload exceeds total LSB capacity of the image&quot;</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">37</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">38</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">flat_img</span>[:<span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">payload_bits</span>)] = (<span style="color: #24292e;">flat_img</span>[:<span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">payload_bits</span>)] &amp; <span style="color: #005cc5;">0xFE</span>) | <span style="color: #24292e;">payload_bits</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">39</span><span style="display: inline-block; padding-left: 2.0rem;"></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">40</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">optimized_img_data</span> = <span style="color: #24292e;">flat_img</span>.<span style="color: #6f42c1;">reshape</span>(<span style="color: #24292e;">shape</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">41</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">final_img</span> = <span style="color: #24292e;">Image</span>.<span style="color: #6f42c1;">fromarray</span>(<span style="color: #24292e;">optimized_img_data</span>.<span style="color: #6f42c1;">astype</span>(<span style="color: #24292e;">dtype</span>))</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">42</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">final_img</span>.<span style="color: #6f42c1;">save</span>(<span style="color: #24292e;">output_path</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">43</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #6f42c1;">print</span>(<span style="color: #005cc5;">0</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">44</span><span style="display: inline-block; "></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">45</span><span style="display: inline-block; "><span style="color: #005cc5;">if</span> <span style="color: #005cc5;">__name__</span> == <span style="color: #032f62;">&quot;__main__&quot;:</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">46</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">if</span> <span style="color: #6f42c1;">len</span>(<span style="color: #24292e;">sys</span>.argv) &lt; <span style="color: #005cc5;">4</span>:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">47</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">sys</span>.<span style="color: #6f42c1;">exit</span>(<span style="color: #005cc5;">1</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">48</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #24292e;">input_image</span>, <span style="color: #24292e;">output_image</span>, <span style="color: #24292e;">data_file</span> = <span style="color: #24292e;">sys</span>.argv[<span style="color: #005cc5;">1</span>], <span style="color: #24292e;">sys</span>.argv[<span style="color: #005cc5;">2</span>], <span style="color: #24292e;">sys</span>.argv[<span style="color: #005cc5;">3</span>]</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">49</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">with</span> <span style="color: #6f42c1;">open</span>(<span style="color: #24292e;">data_file</span>, <span style="color: #032f62;">&quot;rb&quot;) as f:</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">50</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">data</span> = <span style="color: #24292e;">f</span>.<span style="color: #6f42c1;">read</span>()</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">51</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">try</span>:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">52</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #6f42c1;">embed</span>(<span style="color: #24292e;">input_image</span>, <span style="color: #24292e;">output_image</span>, <span style="color: #24292e;">data</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">53</span><span style="display: inline-block; padding-left: 2.0rem;"><span style="color: #005cc5;">except</span> <span style="color: #6f42c1;">Exception</span> <span style="color: #005cc5;">as</span> <span style="color: #24292e;">e</span>:</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">54</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #6f42c1;">print</span>(<span style="color: #032f62;">f&quot;Embedding failed: {e}&quot;</span>)</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">55</span><span style="display: inline-block; padding-left: 4.0rem;"><span style="color: #24292e;">sys</span>.<span style="color: #6f42c1;">exit</span>(<span style="color: #005cc5;">1</span>)</span></div>
</div>
<center>Code Snippet 5. Vectorized Image LSB Embedding Engine</center>




For text-based carriers, steganographic embedding relies on converting the natural language text document into a raw sequence of bytes. The binary representation of the ciphertext fragment is appended with a distinct structural delimiter that indicates the boundaries of the hidden payload during retrieval. The combined payload is then broken down into individual bits. To counter spatial steganalysis and eliminate predictable patterns, StegoLock implements a randomized insertion point, where the start index of the hidden data is shifted dynamically. Within this randomized window, the least significant bit of each individual text byte is replaced with a payload bit using vectorized bitwise masking and combination operations. Once the substitution is complete, the modified byte stream is written back as a clean text file. The computed start offset is printed by the embedding engine and permanently stored in the application database, providing a precise starting coordinate that allows the decryption pipeline to find and extract the ciphertext fragment during reassembly.

For audio-based carriers, high-fidelity uncompressed sound files are processed by loading their underlying waveform samples. The sound wave data—regardless of whether it represents mono or stereo channels—is organized into a contiguous array of audio amplitudes. Similar to the text embedding process, the ciphertext fragment is combined with a terminal delimiter and expanded into a bitstream. Starting from the very beginning of the audio track, the embedding engine systematically alters the least significant bit of each audio sample to match the corresponding bit of the payload. The system dynamically adapts its bit-clearing masks to match the exact bit depth of the carrier, employing unique bitwise adjustments for unsigned 8-bit audio versus signed 16-bit sound structures to prevent volume clipping or acoustic distortion. Finally, the audio waveform is reconstructed into its original channel layout and exported as a clean stego-audio file, preserving the original sound quality while masking the hidden payload.

For image-based carriers, steganographic concealment operates in the spatial domain of lossless graphics files. During the initial processing phase, the image mode is validated and standardized to a color space representing red, green, and blue channels to maintain consistent capacity. The graphic's multi-dimensional pixel matrix is mapped into a continuous sequence of color channel bytes. The payload bits, complete with their trailing delimiter, are then sequentially substituted into the least significant bit of the pixel byte sequence. A vectorized bitwise mask is applied to clear the existing least significant bits before integrating the payload bits, ensuring that the slight alteration in pixel colors remains imperceptible. The modified color channel sequence is then reconstructed into its original visual dimensions and exported as a lossless graphic file. Because this format avoids compression artifacts, the individual pixel values are preserved perfectly, ensuring that the hidden bits remain intact and can be retrieved with absolute fidelity.

### 4.2.3 STEGO FILES CLOUD STORAGE DISTRIBUTION

After encryption, segmentation, and LSB embedding of the ciphertext fragments to create stego files, the physical distribution and persistence of these files within the cloud storage repository are initiated. Within the StegoLock system, each stego file is stored as an entirely independent object in the cloud bucket. Consequently, no single stego file contains the complete encrypted document, and no individual file presents any visible indication or metadata indicating that it conceals a steganographic payload. This physical and spatial segregation of fragments across independent cloud objects establishes the final structural barrier of the reconstruction-dependent security model, ensuring that document recovery is structurally impossible without the retrieval and correct reassembly of all constituent parts.

To execute the transfer, the system targets the Backblaze B2 cloud storage bucket under the `locked/` virtual directory. Prior to initiating any network transmission, the background process enforces a strict capacity gate check by retrieving the user's storage quota parameters (`storage_limit` and `storage_used`) from the database to compute the remaining available capacity. It then sums the actual sizes of all locally generated stego files. If this aggregate size exceeds the user's remaining available space, the pipeline is terminated immediately with a capacity exception, and all local temporary stego files are unlinked. This proactive validation avoids unnecessary network overhead and strictly maintains storage limits at the edge. Once the capacity gate check is cleared, the system uploads the files in parallel batches of five using concurrent HTTP connection pools to optimize remote bucket interactions.

For each successfully uploaded stego file, the persistence layer records the transfer by inserting a new record into the `stego_files` database table. This record links key parameters including the primary key (`stego_file_id`), the cloud object identifier (`cloud_file_id`), the segment reference (`fragment_id`), the parent mapping identifier (`stego_map_id`), the randomized name (`filename`), the exact byte size (`stego_size`), and the steganographic insertion offset (`offset`). As each upload in the batch pool finishes, the system increments the document's `in_cloud_size` by the size of the uploaded stego file. Once the entire batch is successfully transferred, the system calls `refreshStorageUsed()` to update the user's cumulative `storage_used` in the database, transitions the status of the `StegoMap` record to `completed`, and marks the overall document status as `stored`. Finally, the local temporary stego files are systematically unlinked from the application server's disk space, confirming that the entire locking pipeline has executed successfully and that the stego files are securely persisted in the cloud.

<div style="background-color: #ffffff !important; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1</span><span style="display: inline-block; color: #6a737d;">// 1. Capacity Gate Check</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">2</span><span style="display: inline-block; color: #24292e;">$user-&gt;<span style="color: #6f42c1;">refresh</span>();</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">3</span><span style="display: inline-block; color: #24292e;">$remainingSpace = <span style="color: #6f42c1;">max</span>(<span style="color: #005cc5;">0</span>, $user-&gt;storage_limit - $user-&gt;storage_used);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">4</span><span style="display: inline-block; color: #24292e;">$totalStegoSize = <span style="color: #6f42c1;">array_sum</span>(<span style="color: #6f42c1;">array_map</span>(<span style="color: #032f62;">&#x27;filesize&#x27;</span>, $stegoFilePaths));</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">5</span><span style="display: inline-block;"></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">6</span><span style="display: inline-block; color: #24292e;"><span style="color: #005cc5;">if</span> ($totalStegoSize &gt; $remainingSpace) {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">7</span><span style="display: inline-block; padding-left: 2.0rem; color: #24292e;"><span style="color: #005cc5;">foreach</span> ($stegoFilePaths <span style="color: #005cc5;">as</span> $path) {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">8</span><span style="display: inline-block; padding-left: 4.0rem; color: #24292e;"><span style="color: #005cc5;">if</span> (<span style="color: #6f42c1;">file_exists</span>($path)) @<span style="color: #6f42c1;">unlink</span>($path);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">9</span><span style="display: inline-block; padding-left: 2.0rem; color: #24292e;">}</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">10</span><span style="display: inline-block; padding-left: 2.0rem; color: #24292e;"><span style="color: #005cc5;">throw</span> <span style="color: #005cc5;">new</span> \<span style="color: #24292e;">Exception</span>(<span style="color: #032f62;">&quot;CAPACITY_EXCEEDED: Insufficient cloud space.&quot;</span>);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">11</span><span style="display: inline-block; color: #24292e;">}</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">12</span><span style="display: inline-block;"></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">13</span><span style="display: inline-block; color: #6a737d;">// 2. Parallel Upload & Persistence Layer Mapping</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">14</span><span style="display: inline-block; color: #24292e;">$b2-&gt;<span style="color: #6f42c1;">storeFilesBatch</span>($stegoFilePaths, <span style="color: #005cc5;">5</span>, <span style="color: #005cc5;">function</span>($path, $info) <span style="color: #005cc5;">use</span> ($newStegoMap, $stegoMap, $document) {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">15</span><span style="display: inline-block; padding-left: 2.0rem; color: #24292e;">$match = <span style="color: #6f42c1;">collect</span>($stegoMap)-&gt;<span style="color: #6f42c1;">first</span>(<span style="color: #005cc5;">fn</span>($s) =&gt; $s[<span style="color: #032f62;">&#x27;stegoFile&#x27;</span>] === $path);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">16</span><span style="display: inline-block; padding-left: 2.0rem; color: #24292e;"><span style="color: #005cc5;">if</span> ($match) {</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">17</span><span style="display: inline-block; padding-left: 4.0rem; color: #24292e;">$sFile = <span style="color: #24292e;">StegoFile</span>::<span style="color: #6f42c1;">create</span>([</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">18</span><span style="display: inline-block; padding-left: 6.0rem; color: #24292e;"><span style="color: #032f62;">&#x27;stego_map_id&#x27;</span>  =&gt; $newStegoMap-&gt;stego_map_id,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">19</span><span style="display: inline-block; padding-left: 6.0rem; color: #24292e;"><span style="color: #032f62;">&#x27;cloud_file_id&#x27;</span> =&gt; $info[<span style="color: #032f62;">&#x27;fileId&#x27;</span>],</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">20</span><span style="display: inline-block; padding-left: 6.0rem; color: #24292e;"><span style="color: #032f62;">&#x27;fragment_id&#x27;</span>   =&gt; $match[<span style="color: #032f62;">&#x27;fragmentId&#x27;</span>],</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">21</span><span style="display: inline-block; padding-left: 6.0rem; color: #24292e;"><span style="color: #032f62;">&#x27;offset&#x27;</span>        =&gt; $match[<span style="color: #032f62;">&#x27;offset&#x27;</span>],</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">22</span><span style="display: inline-block; padding-left: 6.0rem; color: #24292e;"><span style="color: #032f62;">&#x27;filename&#x27;</span>      =&gt; <span style="color: #6f42c1;">basename</span>($path),</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">23</span><span style="display: inline-block; padding-left: 6.0rem; color: #24292e;"><span style="color: #032f62;">&#x27;stego_size&#x27;</span>    =&gt; $info[<span style="color: #032f62;">&#x27;contentLength&#x27;</span>],</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">24</span><span style="display: inline-block; padding-left: 6.0rem; color: #24292e;"><span style="color: #032f62;">&#x27;status&#x27;</span>        =&gt; <span style="color: #032f62;">&#x27;embedded&#x27;</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">25</span><span style="display: inline-block; padding-left: 4.0rem; color: #24292e;">]);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">26</span><span style="display: inline-block; padding-left: 4.0rem; color: #24292e;">$document-&gt;<span style="color: #6f42c1;">increment</span>(<span style="color: #032f62;">&#x27;in_cloud_size&#x27;</span>, $sFile-&gt;stego_size);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">27</span><span style="display: inline-block; padding-left: 2.0rem; color: #24292e;">}</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">28</span><span style="display: inline-block; padding-left: 2.0rem; color: #24292e;"><span style="color: #005cc5;">if</span> (<span style="color: #6f42c1;">file_exists</span>($path)) @<span style="color: #6f42c1;">unlink</span>($path); <span style="color: #6a737d;">// Conserve disk space</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">29</span><span style="display: inline-block; color: #24292e;">});</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">30</span><span style="display: inline-block;"></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">31</span><span style="display: inline-block; color: #6a737d;">// 3. User Storage Refresh & Locking Completion</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">32</span><span style="display: inline-block; color: #24292e;">$user-&gt;<span style="color: #6f42c1;">refreshStorageUsed</span>();</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">33</span><span style="display: inline-block; color: #24292e;">$newStegoMap-&gt;<span style="color: #6f42c1;">update</span>([<span style="color: #032f62;">&#x27;status&#x27;</span> =&gt; <span style="color: #032f62;">&#x27;completed&#x27;</span>]);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">34</span><span style="display: inline-block; color: #24292e;">$document-&gt;<span style="color: #6f42c1;">update</span>([<span style="color: #032f62;">&#x27;status&#x27;</span> =&gt; <span style="color: #032f62;">&#x27;stored&#x27;</span>]);</span></div>
</div>
<center>Code Snippet 6. Stego Files Capacity Gate and Parallel Cloud Storage Distribution</center>



### 4.2.4 DOCUMENT RETRIEVAL PROCESS

The document retrieval process focuses strictly on the reversal of the steganographic embedding and segmentation phases. While the decryption phase was discussed extensively in Section 4.1, the retrieval process is unique in how it handles fragment extraction and memory-efficient assembly, directly enforcing the application's reconstruction-dependent security model.

**Batch Fragment Extraction**
Once the required stego files are pulled from the cloud, StegoLock initiates a concurrent extraction process. Because each stego file is an independent media carrier, extracting their hidden payloads sequentially would introduce significant latency. To address this, the system uses the `extractFragmentsBatch` method to execute a Python-based batch extraction driver (`batch_processor.py`). This driver parses a generated JSON manifest to simultaneously reverse the LSB embedding on multiple files, extracting the raw ciphertext fragments in parallel.

**Streaming Assembly and Integrity Validation**
After all fragments are successfully extracted as binary files, they must be concatenated in the exact original sequence to form the complete ciphertext payload. This process is handled by the `assembleStreaming` method.

```php
private function assembleStreaming($document, $stegoFiles)
{
    // ... [fragment sorting by index omitted]
    $outHandle = fopen($fullOutputPath, 'wb');

    foreach ($assemblyList as $item) {
        $inHandle = fopen($item['path'], 'rb');
        
        // Integrity Check + Stream
        $content = stream_get_contents($inHandle);
        if (hash('sha256', $content) !== $item['hash']) {
            fclose($inHandle);
            fclose($outHandle);
            throw new \Exception("Integrity breach detected in fragment index: " . $item['index']);
        }
        
        fwrite($outHandle, $content);
        fclose($inHandle);
        
        // Clean up bin fragment immediately
        @unlink($item['path']);
    }

    fclose($outHandle);
    return $relativeOutputPath;
}
```
<center>Code Snippet 7. Streaming Assembly and Fragment Integrity Validation</center>

As shown in Code Snippet 7, StegoLock employs a streaming assembly approach rather than loading all fragments into memory at once. Fragments are ordered strictly by their index as defined in the Stego Map. As each fragment is opened, the system computes its SHA-256 hash and validates it against the known hash stored in the database. If even a single bit of a fragment was altered while at rest in the cloud, this hash comparison fails, triggering an "Integrity breach detected" exception that aborts the recovery process. This guarantees that corrupted or tampered data is never passed to the AES decryption engine. 

Once a fragment clears the integrity check, its binary content is sequentially streamed into a new `.stegolock` container file, and the temporary fragment file is immediately unlinked to conserve disk space. The fully assembled `.stegolock` container is then passed to the decryption engine, completing the steganographic reversal process and bridging the gap to the final plaintext recovery.

## 4.3 DEVELOP A WEB-BASED APPLICATION THAT IMPLEMENTS AND INTEGRATES THE AES-BASED ENCRYPTION, SEGMENTATION, ACCESS CONTROL AND AUTHENTICATION, AND SHARING MECHANISMS TO A DOCUMENT STORAGE PLATFORM

This section presents the results of the third objective: the development and full integration of StegoLock, a web-based document storage platform that incorporates AES-256-GCM encryption, document segmentation, role-based access control, secure user authentication, and a controlled document-sharing mechanism. The system was designed and built to validate that all previously developed components as discussed in Sections 4.1 and 4.2 function cohesively as a unified, deployable application. The following sub-sections present each major functional area of the system through interface demonstrations, design descriptions, and supporting technical references.

The application's frontend was developed with React and Inertia.js, providing a responsive, intuitive user interface. The backend is powered by Laravel (PHP 8.4), which handles all business logic, authentication, encryption orchestration, and API communication. The system uses a MySQL relational database for persistent data storage, including user account records, document metadata, fragment-tracking tables, and access control assignments. Cloud-based object storage is provided by Backblaze B2, where all steganographically processed file fragments are retained. The application is deployed on Railway, a platform-as-a-service (PaaS) provider that hosts both the application server and the MySQL database instance in a production-grade cloud environment.

### 4.3.1 STEGOLOCK WEB APP

The StegoLock web application provides the primary interface through which users interact with all system capabilities. The interface is organized into distinct pages and functional sections, each designed to present document management, access control, and security operations clearly and accessibly. The following subsections describe the major pages and features of the application.

**Home / Welcome Page**
The Home page serves as the public-facing entry point of the StegoLock platform. The hero section prominently displays the application name and a brief description of its purpose, establishing the platform's identity for new and returning visitors. Navigation controls direct unauthenticated users toward either the Login or Registration pages. The page conveys the system's core value proposition—secure, steganography-based document storage—without exposing sensitive interface elements to unauthorized users. The visual design of the hero section is intended to convey professionalism and security, reinforcing the platform’s intended use in academic and organizational settings.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 27 StegoLock Home / Welcome Page — Hero Section</center>

**Login and Registration Pages**
The Registration page allows new users to create an account by providing a unique username and password. The submitted password is hashed using a cryptographic one-way function before being stored in the database, ensuring that plaintext credentials are never persisted. Client-side validation enforces input requirements before the form is submitted, improving user experience and reducing invalid submissions. Upon successful registration, the user is redirected to the Login page.

The Login page presents a minimal, focused interface consisting of a username field, a password field, and a submit button. Upon successful credential verification, the system establishes an authenticated session and grants the user access to the main dashboard. Failed login attempts return a generic error message to prevent user enumeration.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 28 User Registration Interface</center>

<center>Figure 29 User Login Interface</center>

**MyDocuments Page**
The MyDocuments page functions as the primary dashboard for authenticated users. It presents a consolidated view of all documents owned by or explicitly shared with the current user. From this interface, users may initiate document locking (upload and encryption), document unlocking (retrieval and decryption), sharing, and deletion operations. Each document entry displays essential metadata, including the document name, upload date, file size, and current lock status. Contextual action buttons rendered per document entry provide direct access to the corresponding document operations without requiring navigation away from the dashboard.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 30 MyDocuments Page — Main User Dashboard</center>

**Sidebar Navigation**
The sidebar provides persistent navigation throughout the authenticated sections of the application. It includes links to the MyDocuments dashboard, the Starred Documents section, Shared Documents, and the user Profile page. The sidebar additionally displays a visual summary of the user’s current storage utilization, indicating the proportion of the allocated 250 MB quota that has been consumed. This persistent navigation element ensures continuity across functional areas of the application without disrupting the user’s current context.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 31 Application Sidebar Navigation</center>

**Profile and Personal Space Management**
The Profile page allows authenticated users to review and update their account information, including their display name and password. Users may also monitor their personal storage consumption from this page. The interface presents the current usage relative to the total allocated quota, enabling informed decisions regarding document management and deletion. Storage statistics are derived from the aggregate size of all documents associated with the user account, including locked and unlocked states.

**Additional Interface Features**
Beyond the primary document management operations, the StegoLock web application incorporates several supporting features that enhance usability and document organization:
*   **Star / Favorite Function**: Users may mark frequently accessed documents for quick retrieval by starring them. Starred documents are accessible from a dedicated section in the sidebar, reducing navigation time for users who regularly return to specific files.
*   **Search Bar**: A real-time search bar enables users to filter the document list by filename. The search function operates on the client-rendered list, providing immediate feedback without requiring a full page reload.
*   **Sort and Filter Controls**: Users may reorder the document list by name, upload date, or file size. Filter controls allow the list to be narrowed by document status, such as locked, shared, or starred, facilitating efficient navigation within large document collections.
*   **Grid / List Toggle**: The display mode of the MyDocuments dashboard may be toggled between a visual grid layout and a compact tabular list view. This accommodates different user preferences for document browsing and provides flexibility in how document metadata is presented.

### 4.3.2 ACCESS CONTROL AND AUTHENTICATION

StegoLock enforces identity verification through a secure registration and login system. New credentials are secured via cryptographic hashing, ensuring plaintext passwords are never stored. Upon successful authentication, the system issues a session token that governs access rights.

Application-layer security is maintained through a Laravel middleware pipeline. Every request is validated against the user’s ownership and permission records (RBAC) before execution. This middleware intercepts unauthorized attempts including direct URL manipulation to ensure strict data isolation and prevent cross-account leakage. By rejecting invalid requests at the gateway, the system maintains a secure environment where users can only interact with their authorized documents.

The authentication logic is implemented in `AuthController.php`, which handles user registration, login, logout, and session lifecycle management. The following code snippet illustrates the password hashing applied during the registration process:

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div style="color: #6a737d;">// app/Http/Controllers/Auth/RegisteredUserController.php</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">81</span><span style="color: #24292e;">$user</span> = <span style="color: #005cc5;">new</span> <span style="color: #24292e;">User</span>();</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">84</span><span style="color: #24292e;">$user-&gt;password_hash</span> = <span style="color: #6f42c1;">base64_encode</span>(<span style="color: #24292e;">$password_derivedKey</span>);</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">90</span><span style="color: #24292e;">$user</span>-&gt;<span style="color: #6f42c1;">save</span>();</div>
</div>

Access control for authenticated routes is enforced via Laravel’s built-in `auth` middleware, as illustrated in the route definitions below:

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div style="color: #6a737d;">// routes/web.php</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">56</span><span style="color: #24292e;">Route</span>::<span style="color: #6f42c1;">middleware</span>([<span style="color: #032f62;">'auth'</span>])-&gt;<span style="color: #6f42c1;">group</span>(<span style="color: #005cc5;">function</span> () {</div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">65</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">Route</span>::<span style="color: #6f42c1;">post</span>(<span style="color: #032f62;">'/documents/lock'</span>, [<span style="color: #24292e;">DocumentController</span>::<span style="color: #005cc5;">class</span>, <span style="color: #032f62;">'lock'</span>]);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">68</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">Route</span>::<span style="color: #6f42c1;">post</span>(<span style="color: #032f62;">'/documents/unlock'</span>, [<span style="color: #24292e;">DocumentController</span>::<span style="color: #005cc5;">class</span>, <span style="color: #032f62;">'unlock'</span>]);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">98</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">Route</span>::<span style="color: #6f42c1;">post</span>(<span style="color: #032f62;">'/documents/share'</span>, [<span style="color: #24292e;">DocumentController</span>::<span style="color: #005cc5;">class</span>, <span style="color: #032f62;">'share'</span>]);</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">119</span>});</div>
</div>

It is important to note that the AES-256-GCM encryption and key management mechanisms described in Section 4.2 are operationalized within this authentication context. Encryption keys are generated and associated with the authenticated user’s account upon document locking, and are retrieved securely during the unlocking process. The `CryptoService` class mediates all cryptographic operations, ensuring that key access is gated by authenticated session verification. This integration ensures that no cryptographic operation can be performed outside of a valid, authenticated session, directly satisfying the access control requirements specified in the study’s objective statement.

### 4.3.3 DOCUMENT LOCKING AND UNLOCKING

Document locking refers to the process by which an uploaded document is encrypted, segmented into steganographic fragments, and distributed to cloud storage. Document unlocking is the complementary process by which the stored fragments are retrieved, extracted, reassembled, and decrypted to reconstruct the original file. The technical implementation of these pipelines including the AES-256-GCM cryptographic algorithms and the steganographic embedding logic is detailed in Sections 4.1 and 4.2 respectively. This section focuses on the user-facing interface through which these operations are initiated, and provides a concise overview of the corresponding backend behavior.

**Document Locking Interface**
From the MyDocuments dashboard, authenticated users initiate the document locking process by selecting a file for upload through the provided file dialog. Upon confirmation, the frontend dispatches the file to the backend, which queues the `ProcessSteganoJob`, a background job responsible for executing the full locking pipeline. The interface displays the document’s processing status in real time, transitioning from "Processing" to "Locked" upon successful completion of the job. If an error occurs during processing, the interface reflects the failure state and provides a prompt for user action.

In the backend, the locking pipeline proceeds in the following sequence: the `CryptoService` encrypts the uploaded file using AES-256-GCM; the resulting ciphertext is segmented into UUID-tagged fragments, with a structural record (`FragmentMap`) persisted in the database; Python scripts are invoked to embed each fragment into a carrier file via steganography; and the resulting stego-files are uploaded to Backblaze B2 via the `B2Service`, with a corresponding storage mapping (`StegoMap`) saved to the database for future retrieval.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 32 Document Upload and Locking Interface</center>

**Segmented Storage in Cloud**
Upon completion of the locking process, the resulting stego-files are stored as independent objects in the Backblaze B2 bucket. Each object corresponds to a single fragment of the original encrypted document, embedded within a carrier file. Because the fragments are physically distributed as separate cloud objects, no single intercepted file is sufficient to reconstruct the document. Figure 33 illustrates the resulting document fragments as they appear in the cloud storage bucket, confirming that segmentation and steganographic embedding were applied successfully.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 33 Segmented Document Storage in Cloud Buckets (Part 1)</center>

<center>Figure 33. Segmented Document Storage in Cloud Buckets (Part 2)</center>

**Document Unlocking Interface**
To retrieve a locked document, the authenticated user selects the target document from the dashboard and initiates the unlock operation. The interface confirms the request and displays a progress indicator while the backend processes the `ProcessUnlockJob`. The unlocking pipeline retrieves the relevant stego-files from Backblaze B2 using the `StegoMap`, extracts the hidden fragments via `batch_processor.py`, validates each fragment using SHA-256 checksums to ensure integrity, reassembles the validated fragments into a single encrypted blob through a memory-efficient streaming technique, and finally decrypts the blob using the `CryptoService`. The reconstructed file is then presented to the user for download, confirming lossless end-to-end integrity across the full encrypt–segment–store–retrieve–reconstruct–decrypt pipeline.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 34 Document Retrieval and Reconstruction Interface</center>

### 4.3.4 DOCUMENT SHARING

The StegoLock platform provides a controlled document-sharing mechanism that enables document owners to grant read access to other registered users. Access is managed through explicit permission records stored in the database; only users whose accounts are explicitly linked to a document’s share list may initiate an unlock operation on that document. The sharing mechanism does not transmit or expose the underlying AES-256-GCM encryption key to the recipient. Instead, shared users access documents through the same server-side decryption pipeline, with the system verifying the user’s permission before executing any cryptographic operation. Ownership and all associated access rights remain with the original document uploader.

The document sharing interface is accessible from the MyDocuments dashboard. The document owner selects a target document and opens the sharing panel, which provides a form for entering the username of the intended recipient. Upon form submission, the system creates a permission record in the database that associates the specified user account with the document. The owner’s view of the sharing panel displays the current list of users who have been granted access, alongside individual revocation controls.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 35 Document Sharing Interface — Owner's Perspective</center>

Role-based access distinctions are enforced and reflected in the interface. The document owner is presented with the full management panel, including the list of active share recipients and revocation controls. A shared user, upon authenticating to their own account, finds the shared document listed in their MyDocuments dashboard. The shared user may initiate an unlock operation on the document but is not presented with sharing, deletion, or ownership controls. This asymmetry in the interface confirms that ownership and access boundaries are correctly maintained by the underlying access control layer.

<center>Figure 36 Role-Based Access: Owner View</center>

<center>Figure 37 Role-Based Access: Shared User View</center>

Access denial for unauthorized users was also validated. As shown in Figure 38, a user who attempts to retrieve a document without ownership or an explicit permission grant receives an access denied response from the system, confirming that document-level permission enforcement is correctly applied at the access control layer.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 38 Access Denial for Unauthorized User</center>

Access revocation was likewise validated. After the document owner removes a shared user’s permission through the interface, that user’s subsequent unlock requests are rejected. Figures 39 and 40 demonstrate an active sharing session in which the recipient account successfully accesses the shared document, confirming that the permission grant is functioning prior to any revocation.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 39 Active Document Sharing — Recipient Access Confirmed (Part 1)</center>

<center>Figure 40 Active Document Sharing — Owner Revoked Access Confirmed</center>

### 4.3.5 DOCUMENT STORAGE

The StegoLock platform integrates Backblaze B2 as its cloud-based object storage backend. All steganographic output files—each containing an embedded fragment of an encrypted document—are stored as discrete objects within a designated B2 storage bucket. This design physically distributes the fragments of any given document across the cloud, ensuring that no single intercepted object provides sufficient data to reconstruct the original file or recover the plaintext content.

**Integration of Backblaze Cloud Storage**
Integration with Backblaze B2 is achieved through Laravel’s filesystem abstraction layer, utilizing an S3-compatible storage driver configured via the following environment variables: `B2_KEY_ID`, `B2_APPLICATION_KEY`, `B2_BUCKET`, and `B2_ENDPOINT`. Sensitive cloud credentials are managed through the `CloudAccount` model, which stores application keys in the database in encrypted form using Laravel’s Crypt service, preventing credential exposure in the event of a database breach. The relationship between a document’s fragments and their corresponding Backblaze `fileId` values is maintained in the `StegoMap` and `StegoFile` database tables, which the system consults during retrieval to locate and fetch the correct objects from the bucket.

**Specifications and Capacities**
The following storage parameters govern the operational behavior of the system:
*   **Global Capacity Allocation**: The system is configured with a total cloud storage capacity of 10 GB (10,737,418,240 bytes), allocated within the Backblaze B2 bucket.
*   **User Storage Threshold**: Each registered user is allocated a personal storage quota of 250 MB (262,144,000 bytes), enforced at the application level prior to any upload operation.
*   **Steganographic Safety Margin**: A 15% capacity safety margin is enforced during the embedding process to ensure that the hidden payload does not occupy an excessive proportion of the carrier file, preventing perceptible degradation of the cover medium.
*   **Batch Concurrency**: Parallel upload, download, and deletion operations are configured with a default concurrency limit of five simultaneous slots, balancing throughput performance against Backblaze B2 API rate constraints.

**The API: B2Service.php**
The `B2Service.php` file serves as the primary programmatic gateway for all interactions between the StegoLock backend and the Backblaze B2 API. Its core functionalities are organized into the following categories:

*   **Authentication and Token Caching**:
    *   `authorize()`: Performs the initial account authorization handshake with the Backblaze B2 API, retrieving an authorization token and the bucket download URL required for subsequent operations.
    *   `getAuth()`: Retrieves and caches the authorization token for 3,500 seconds to minimize redundant API calls during high-throughput batch operations.
*   **File Transfer Operations**:
    *   `uploadFile()`: Handles standard single-file uploads to the B2 bucket, including SHA-1 checksum generation for server-side data integrity verification.
    *   `storeFilesBatch()`: Utilizes Guzzle HTTP client pools to execute parallel file uploads with a built-in retry mechanism for auth_token_limit errors, ensuring resilience during high-volume operations.
    *   `fetchFilesBatch()`: Downloads multiple stego-file fragments simultaneously from the B2 bucket, accelerating the document reconstruction process during unlocking.
*   **Management and Retrieval**:
    *   `listAllFiles()`: Implements a recursive do-while loop to enumerate all objects in the B2 bucket, handling API pagination and token expiration automatically.
    *   `deleteFilesBatch()`: Executes asynchronous deletion of multiple file versions during document removal or storage cleanup, leveraging Guzzle pools for concurrent execution.
    *   `getFileInfo()` and `findFileByName()`: Provide granular metadata retrieval for specific stego-file fragments, supporting system diagnostics and cloud integrity audit operations.

### 4.3.6 APPLICATION SYSTEM DEPLOYMENT

The StegoLock web application was deployed to a live cloud production environment using Railway, a platform-as-a-service (PaaS) provider that supports containerized application hosting and managed database provisioning. The deployment architecture consists of two interconnected services: the main application server, which runs the Laravel-based backend, and a dedicated MySQL database instance. Both services operate within the same production environment and are accessible at the public URL `stegolock-production.up.railway.app`. The application server runs PHP 8.2 with Node.js 22, deployed on a US West region instance to ensure availability and low-latency access.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 41 Railway Production Environment — Application and Database Services Online</center>

The database service hosts the `stegolock_app` MySQL database, which contains all application tables, including `activity_logs`, `documents`, `document_segments`, `fragment_metadata`, `fragments`, `cloud_accounts`, `folder_shares`, `folders`, `covers`, `notifications`, and user management tables. The presence of the complete schema in the live database confirms that all Laravel migrations were executed successfully against the production MySQL instance.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 42 Railway Database Browser — stegolock_app MySQL Schema in Production</center>

Deployment to Railway is integrated with the project’s GitHub repository through an automated continuous deployment pipeline. Each commit pushed to the main branch automatically triggers a build and deployment cycle on Railway, promoting code changes to the live production environment without manual intervention. The deployment history of the application service records a sequence of iterative releases, including feature additions such as Multi-Account Management, an administrative database table inspector, and Backblaze cloud integrity audit functionality, reflecting the incremental development approach employed throughout the project.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 43 Railway Deployment History — Active and Historical Deployments via GitHub CI/CD</center>

The successful cloud deployment of StegoLock confirms that the platform operates correctly outside of a local development environment, that all database migrations and schema definitions are intact in production, and that the GitHub-to-Railway continuous deployment pipeline functions as intended. The live deployment constitutes conclusive evidence that Objective 3—the development and full integration of the web-based document storage platform incorporating AES-256-GCM encryption, segmentation, access control, authentication, and document sharing—has been fully realized.

## 4.4 EVALUATE THE APPLICATION BASED ON ISO/IEC 25010 QUALITY CHARACTERISTICS TO ASSESS THE EFFECTIVENESS IN TERMS OF FUNCTIONAL SUITABILITY, SECURITY, RELIABILITY, AND MEASURE USABILITY AND PERFORMANCE EFFICIENCY

Following the successful implementation of the StegoLock system, including its AES-based encryption, KDF-based key management, segmentation, and steganographic embedding, and development of the application platform, the final phase of the study shifts toward evaluating its overall quality. This section addresses the fourth objective by assessing the application based on the ISO/IEC 25010 standard, focusing on its effectiveness, security, and efficiency. To ensure a thorough evaluation, the researchers used a two-part approach: measuring the application's technical performance through internal system logs and gathering subjective feedback from users through surveys. By testing the system in this manner, the study determines if the security and usability goals established during the development stages were fully achieved in the final product.

### 4.4.1 USER PROFILE

To evaluate the application’s performance and security, a controlled testing environment was established. The storage capacity was primarily determined by the third-party cloud service provider’s free-tier allocation of 10 GB, which served as the final repository for both stego files and cover files. To ensure a stable environment, the researchers assigned a 225 MB storage limit per user, which allowed the system to accommodate up to 40 potential users within the 10 GB ceiling. The researchers deemed this 225 MB allocation sufficient for the evaluation, as it allowed each user to secure at least two 5 MB document files, with the remaining capacity used for smaller documents not exceeding the 5 MB limit established in the study's scope. Any storage space not allocated to users within the 10 GB cap was utilized for storing the repository of cover files used during the steganographic process. The general setup of the testing environment is summarized in the table below:

<center>Table 7: General Testing Environment Setup Summary</center>

| Component | Description | Specification |
| :--- | :--- | :--- |
| Cloud Storage Cap | Provider’s free-tier allocation | 10GB |
| Individual Storage Limit | Allocated per Standard User | 225MB |
| Maximum User Capacity | Based on Storage allocation | 40 Users |
| Cover File Repository | Remaining cloud storage capacity | ~ 1.0 GB |

The evaluation involved a specific group of accounts created to test both system management and standard document protection. This included a small group of administrators for system monitoring and a larger pool of registered end-users who participated in the locking and sharing process. The distribution of these accounts and the final count of those who completed the evaluation process are presented in the table below:

<center>Table 8: User Participation and Response Summary</center>

| User Category | Status | Frequency (n) |
| :--- | :--- | :--- |
| Administrative Accounts | Registered for system management | 4 |
| Registered End-Users | Registered for evaluation | 36 |
| Total Respondents | Successfully completed survey | 30 |
| Total Users | All user accounts registered in the system | 40 |

During the evaluation, participants self-identified their professional status to provide context to their feedback. These respondents were categorized as Standard Users, and they chose from roles such as Students, Professionals, or provided a specific role through an open-ended "Others" field. Regardless of their specific background, all participants evaluated the system from the perspective of a general user seeking secure document protection. It should be noted that administrative and system-level roles were excluded from the evaluation scope, as these functions are designed for back-end maintenance rather than the primary features being tested. The summary of the self-identified roles of the standard users is presented in the table below:

<center>Table 9: Standard User Profile Responses Summary</center>

| Respondent Category | User-Identified Role | Frequency (n) | Percentage (%) |
| :--- | :--- | :--- | :--- |
| Standard Users | Students | 26 | 87% |
| | Professionals | 3 | 10% |
| | Others | 1 | 3% |
| **Total** | | **30** | **100%** |

### 4.4.2 OVERALL ISO/IEC 25010 EVALUATION SUMMARY

This section provides a high-level overview of the results gathered during the evaluation phase of StegoLock. After the successful development and deployment of the application's core security features, including AES-GCM encryption, segmentation, and steganographic LSB embedding, it is essential to measure how these components function as a complete system. By aggregating the feedback from the evaluation participants, this summary offers a comprehensive look at the application’s quality through the lens of international software standards. The following data represents the collective perception of the users, providing a foundation for the more detailed technical analysis that follows.

To provide a scientifically grounded summary of the system’s quality, the researchers employed descriptive statistics to analyze the data gathered from 30 respondents. The primary metric used is the General Weighted Mean (GWM), which represents the average score for each quality characteristic. By calculating the GWM, the study can determine the "center" of the participants' feedback, providing a clear numerical value for how well the application performed in each category. Furthermore, these categories are ranked from highest to lowest. This ranking is crucial as it identifies the specific areas where StegoLock excelled, its "technical strengths", and highlights areas that, while still highly rated, may have been more sensitive to external factors like network conditions.

**Data Extraction and Processing**
To ensure the integrity and transparency of the evaluation results, the researchers extracted the raw data directly from the application's live deployment environment on Railway. The following SQL queries were executed against the production MySQL database to calculate the final scores from the 30 survey responses stored in the `survey_answers` table.

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1</span><span style="color: #005cc5;">SELECT</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">2</span><span style="display: inline-block; padding-left: 2rem;">(<span style="color: #005cc5;">SELECT</span> <span style="color: #6f42c1;">COUNT</span>(<span style="color: #005cc5;">DISTINCT</span> <span style="color: #24292e;">survey_response_id</span>) <span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">survey_answers</span>) <span style="color: #005cc5;">as </span><span style="color: #e36209;">total_respondents</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">3</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #6f42c1;">COUNT</span>(*) <span style="color: #005cc5;">as</span> <span style="color: #e36209;">total_individual_ratings</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">4</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #6f42c1;">ROUND</span>(<span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">rating</span>), <span style="color: #005cc5;">4</span>) <span style="color: #005cc5;">as</span> <span style="color: #e36209;">gwm</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">5</span><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">survey_answers</span>;</div>
</div>

<center>Figure 44 Database Query for Overall Evaluation Mean</center>

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">1</span><span style="color: #005cc5;">SELECT</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">2</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #24292e;">q.category</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">3</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #6f42c1;">COUNT</span>(<span style="color: #24292e;">a.id</span>) <span style="color: #005cc5;">as</span> <span style="color: #e36209;">response_count</span>,</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">4</span><span style="display: inline-block; padding-left: 2rem;"><span style="color: #6f42c1;">ROUND</span>(<span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">a.rating</span>), <span style="color: #005cc5;">2</span>) <span style="color: #005cc5;">as</span> <span style="color: #e36209;">weighted_mean</span></span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">5</span><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">survey_answers a</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">6</span><span style="color: #005cc5;">JOIN</span> <span style="color: #24292e;">survey_questions q</span> <span style="color: #005cc5;">ON</span> <span style="color: #24292e;">a.survey_question_id</span> = <span style="color: #24292e;">q.id</span></div>
<div><span style="color: #6a737d; display: inline-block; width: 40px; text-align: right; margin-right: 15px; user-select: none;">7</span><span style="color: #005cc5;">GROUP BY</span> <span style="color: #24292e;">q.category</span>;</div>
</div>

<center>Figure 45 Database Query for Categorical Weighted Means</center>

Through the execution of these queries, the raw database entries were transformed into structured statistical data. This transition from raw numbers to categorical averages allows for a structured evaluation of the system's performance, mapping the technical database outputs to the specific quality characteristics of the ISO/IEC 25010 standard.

**Query Results**
The data presented in the table below reveals a consistently high level of user satisfaction across all five ISO/IEC 25010 quality characteristics. With an overall mean of 4.53, the StegoLock application is classified under the "Strongly Agree" Likert scale description. This indicates a high level of consensus among participants regarding the system's quality, suggesting that the integration of complex backend processes did not negatively impact the user’s overall experience.

Performance Efficiency emerged as the highest-ranked characteristic with a GWM of 4.61. This is a significant finding for the study, as it indicates that the application remained responsive even while performing resource-intensive backend processes. This high score suggests that the server-side implementation and the cloud distribution logic were optimized enough that users did not perceive any significant latency or "bottlenecks" during the locking and unlocking processes.

The characteristics of Functional Suitability and Security tied for the second rank, both receiving a GWM of 4.55. This tie highlights a balanced synergy between the application’s core features and its primary purpose. Users felt that the system was not only functional in terms of navigation and button operations but also inherently trustworthy and secure. This confirms that the researchers successfully communicated the security value of the cryptographic steganography hybrid process through the user interface.

Usability followed closely with a score of 4.53, which can be attributed to the inclusion of the "Guided Tour" and the minimalist design of the dashboard. Finally, Reliability received the lowest GWM of 4.42. While this score falls within the "Agree" range, the slight variance compared to other categories is expected in cloud-based applications. Because reliability involves the system’s ability to function under various conditions, it is often the characteristic most affected by external factors beyond the researchers' control, such as fluctuations in the users' internet stability or the performance of the third-party cloud storage provider.

Despite these minor variances, the narrow gap between the highest and lowest scores (0.19) indicates a highly stable and well-rounded software architecture, demonstrating that the application maintains a high standard of quality across all domains without compromising one characteristic for another.

<center>Table 10: Summary of ISO/IEC 25010 Quality Characteristic Ratings</center>

| ISO Quality Characteristic | General Weighted Mean (GWM) | Likert Scale Description |
| :--- | :--- | :--- |
| Performance Efficiency | 4.61 | Strongly Agree |
| Functional Suitability | 4.55 | Strongly Agree |
| Security | 4.55 | Strongly Agree |
| Usability | 4.53 | Strongly Agree |
| Reliability | 4.42 | Agree |
| **OVERALL MEAN** | **4.53** | **Strongly Agree** |

To visually demonstrate the multi-dimensional quality of StegoLock, a Radar Chart (Figure 46) is used. This type of visualization is particularly effective for ISO/IEC 25010 evaluations because it allows the reader to see how well the different characteristics are balanced against one another. As shown in the figure, the evaluation results form a broad and relatively symmetrical pentagonal shape. In a radar chart, the "fullness" of the shape represents the overall maturity and quality of the software. Because all five GWM values fall within a narrow range of 4.42 to 4.61, the resulting plot covers a large area of the chart, indicating that the application is highly proficient in all evaluated domains.

The shape of the pentagon is slightly extended toward the Performance Efficiency vertex, which reflects its status as the highest-rated characteristic. However, the lack of any sharp "dips" or inward spikes toward the center signifies that there are no significant weaknesses in the system’s architecture. This visual profile implies that StegoLock is a well-rounded application. It suggests that the project did not focus on security at the expense of usability, nor did they prioritize functional suitability over reliability. Instead, the "balanced pentagon" indicates that the technical implementation of the AES-GCM encryption, segmentation, and steganographic embedding was successfully integrated into a user-friendly and stable web environment.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 46 Visual Profile of StegoLock Evaluation Scores</center>

While the results presented in the summary reflect a high level of user satisfaction, the researchers recognize that these scores represent subjective perceptions. In academic research, relying solely on user feedback can be limited by personal bias or varying levels of technical expertise among respondents. To ensure the validity of these findings, the study employs a method known as Triangulation. This involves cross-referencing the "Subjective" survey data (the Perception) with "Objective" system metrics (the Facts). In the following sub-sections, each ISO/IEC 25010 characteristic will be analyzed in further detail. This detailed analysis will combine the categorical survey results with raw technical data, such as millisecond-level process durations and success-to-failure ratios recorded during the evaluation. By comparing what the users felt with what the system actually did, the study provides a comprehensive and "bulletproof" evaluation of the StegoLock application.

### 4.4.3 DETAILED ANALYSIS OF ISO/IEC 25010 QUALITY CHARACTERISTICS

#### 4.4.3.1 RELIABILITY

Reliability is defined under the ISO/IEC 25010 standard as the degree to which a system, product, or component performs specified functions under specified conditions for a specified period of time. This characteristic is critical for StegoLock, as it ensures that the multi-stage process of encryption, segmentation, LSB embedding, and cloud storage remains stable and accessible to users without data loss or service interruption.

**User Evaluation**
The subjective reliability of the system was measured using six criteria (RE1–RE6) representing sub-characteristics such as Availability, Faultlessness, Fault Tolerance, and Recoverability. Based on the feedback from 30 evaluation participants, the application achieved an overall General Weighted Mean (GWM) of 4.42, interpreted as "Strongly Agree."

The data in the table below reveals a high level of user confidence in the application's stability. The highest score was recorded for RE2 (4.60), which indicates that the majority of users experienced a smooth, interruption-free session during their testing. This is a significant finding as it proves that the backend complexity was successfully abstracted away from the user experience.

However, the lowest score was observed for RE5 (4.13). While still maintaining a positive interpretation, this score suggests that users were more cautious about the system's ability to automatically recover from errors. This feedback provides a valuable insight into user expectations, highlighting that while the system is perceived as stable, the mechanisms for error recovery are an area where users seek even greater transparency.

<center>Table 11: Summary of Survey Ratings for Reliability</center>

| Item Code | Survey Question Statement | Weighted Mean | Likert Scale Description |
| :--- | :--- | :--- | :--- |
| RE1 | I feel that the StegoLock web app can be used at any time. | 4.43 | Strongly Agree |
| RE2 | I have never experienced any StegoLock web app crash, lag, or failure while using it. | 4.60 | Strongly Agree |
| RE3 | I find that the StegoLock web app can be easily used on any PC and mobile devices. | 4.53 | Strongly Agree |
| RE4 | I think that the StegoLock web app has a good level of reliability and application performance when using various internet connections (e.g. WiFi, 4G, 3G). | 4.50 | Strongly Agree |
| RE5 | I think if an error occurs in the StegoLock web app, the app can work normally as usual. | 4.13 | Strongly Agree |
| RE6 | Overall, I find the StegoLock web app to be always reliable. | 4.30 | Strongly Agree |
| | **General Weighted Mean (GWM)** | **4.42** | **Strongly Agree** |

Including the internet access domain, is crucial for assessing the Reliability of StegoLock, specifically its stability and fault tolerance across different network environments. While the core steganographic processing occurs on the high-performance server, the initial upload of documents and the final retrieval of stego files rely on the user's local internet connection.

As shown in Table 12, the majority of respondents (87%) utilized a stable WiFi connection, while a smaller portion (13%) accessed the application via Mobile Data. The inclusion of mobile data users is significant because these connections are often prone to signal fluctuations and lower bandwidth compared to fixed wireless networks. Despite these variations in connectivity, the application demonstrated high reliability, as no system crashes or data transmission failures were reported by either group. This proves that StegoLock is capable of maintaining its functional integrity regardless of whether the user is on a high-speed network or a more limited mobile connection.

<center>Table 12: Distribution of Respondents’ Internet Access</center>

| Internet Access | Frequency (n) | Percentage (%) |
| :--- | :--- | :--- |
| WiFi | 26 | 87% |
| Mobile Data | 4 | 13% |
| **TOTAL** | **30** | **100%** |

**Technical Performance Audit**
To validate the subjective feedback from the users, a technical audit of the application’s backend performance was conducted. This analysis focuses on the objective data collected from the production server and the application’s error-handling logs throughout the evaluation phase.

**Metric 1: Operational Success Rate (Locking and Unlocking)**
The core reliability of StegoLock is measured by the consistency of its two primary functions: the locking of new documents and the retrieval of those documents through the unlocking process. The locking process begins at document compression to cloud storage, and the unlocking process begins at stego files retrieval from the cloud to decryption and decompression.

*   **File Locking Success Rate**: During the evaluation period, the researchers recorded a total of 26 successfully locked documents (see Table 13) residing in the system database. These represent the completed lifecycles where encryption, segmentation, embedding and cloud storage were all verified. When accounting for the initial pilot phase, the system achieved a high operational success rate. This indicates that once the application moved past the early-stage deployment boundaries, the locking engine remained exceptionally stable for all users.

<center>Table 13: Document Locking and Unlocking Success Ratios</center>

| Operation | Attempts | Success | Rate |
| :--- | :--- | :--- | :--- |
| Locking | [26 + N] | 26 | ~90% |
| Unlocking | 26 | 26 | 100% |

*\*N is the number of documents primarily locked but failed in the process, and were deleted by the users.*

*   **File Unlocking Success Rate**: The unlocking process, which requires the precise reassembly of scattered fragments and AES-256 decryption, demonstrated absolute reliability. As shown in the database metrics (Table 14), a total of 11 unique documents were successfully unlocked during the testing phase, excluding documents the users deleted.

The system processed a total of 26 unlocking requests, including multiple successful retrievals of the same document (e.g., `ELX_4WEEKFITNESSPLAN.pdf` was successfully unlocked 3 times). The system also maintained a 100% Success Rate for Unlocking across all 26 requests. Even for "Deleted Documents" where the record was removed after the fact, the process_metrics confirm that the decryption steps were completed successfully before the deletion occurred.

<center>Table 14: Document Unlock Attempts</center>

| No. | Document IDs | Unlock Attempts |
| :--- | :--- | :--- |
| 1 | 10 | 3 |
| 2 | 21 | 3 |
| 3 | 8 | 2 |
| 4 | 22 | 2 |
| 5 | 31 | 2 |
| 6 | 7 | 1 |
| 7 | 18 | 1 |
| 8 | 30 | 1 |
| 9 | 34 | 1 |
| 10 | 35 | 1 |
| 11 | 36 | 1 |
| | **Deleted Documents** | **8** |
| | **Total Attempts** | **26** |

Generally, this data proves that the StegoLock application is highly reliable in its "Unlocking" phase, ensuring that users can always retrieve their secured data, while the "Locking" phase maintains a robust success rate under production conditions.

**Metric 2: Analysis of Operation Failures**
As shown in the audit logs (Figure 47), the singular recorded failure occurred during the "Locking" process. The researchers identified this as a Cover Selection Boundary where a dynamically generated text cover could not be retrieved by its `cover_id` (`ModelNotFoundException`).

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 47 File History and Audit Log showing a Failed Encryption Process</center>

Additionally, a technical finding revealed that network interruptions between the deployment server and the cloud provider resulted in "Ghost Files" (Figure 48), which are stego files uploaded in the cloud storage but have no record in the database. While these did not technically "crash" the system, they represented an incomplete locking process. The most probable cause for these Ghost Files is interruption in the cloud server during upload. In response, a System Integrity Audit feature (Figure 49) was implemented to proactively identify these unlinked fragments, thereby ensuring the long-term synchronization of the Locking engine.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 48 UI display showing Ghost Files in the Cloud Storage</center>

<center>Figure 49 Database Management page in Admin Access. System Integrity Audit feature in red box</center>

#### 4.4.3.2 FUNCTIONAL SUITABILITY

Functional Suitability evaluates the degree to which the system provides functions that meet stated and implied needs when used under specified conditions. For StegoLock, this characteristic is the measure of whether the application successfully performs its primary role: securing data through multi-layered encryption and steganographic embedding.

**User Evaluation**
The subjective evaluation of functional suitability was conducted through five criteria (FS1–FS5), focusing on Functional Completeness, Functional Correctness, and Functional Appropriateness. Based on the responses from 30 evaluation participants, the application achieved an overall General Weighted Mean (GWM) of 4.55, which is interpreted as "Strongly Agree."

As shown in Table 15, the highest score was recorded for FS2 (4.70), indicating that users found the application's functional interactions to be highly reliable. The high scores for adequacy (FS1: 4.50) and comprehensiveness (FS4: 4.50) suggest that the system's feature set effectively covers the users' requirements for secure file management.

<center>Table 15: Summary of Survey Ratings for Functional Suitability</center>

| Item Code | Survey Question Statement | Weighted Mean | Likert Scale Description |
| :--- | :--- | :--- | :--- |
| FS1 | I consider the information and data available in the StegoLock web app to be adequate. | 4.50 | Strongly Agree |
| FS2 | I feel that the StegoLock web app navigation buttons work well. | 4.70 | Strongly Agree |
| FS3 | I feel that overall, the StegoLock web app button functions work well. | 4.53 | Strongly Agree |
| FS4 | I feel that the information and data available in the StegoLock web app are comprehensive. | 4.50 | Strongly Agree |
| FS5 | The StegoLock web app is very useful. | 4.52 | Strongly Agree |
| | **General Weighted Mean (GWM)** | **4.55** | **Strongly Agree** |

**Technical Implementation Analysis**
To validate the users' high approval ratings, the researchers conducted a technical audit in relation to the processes that comprises the entire StegoLock system as stated in the project objectives. The audit mapped the core functional requirements to their specific architectural implementations within the Laravel and React environment. The table below shows the checklist of the process audit and the verification of technical compliance based on the project's core objectives:

<center>Table 16. Technical Audit of StegoLock Functional Processes</center>

| Functional Process | Technical Implementation Mechanism | Objective Alignment | Status |
| :--- | :--- | :--- | :--- |
| AES-based Encryption | Implementation of AES-256-GCM authenticated encryption for high-assurance document confidentiality. | Objective 1 | COMPLETED |
| KDF-based Key Management | Use of PBKDF2 and HKDF for secure Master Key derivation and DEK-wrapping (envelope encryption). | Objective 1 | COMPLETED |
| Segmentation | Algorithmic partitioning of encrypted files into optimized fragments based on cover file capacity. | Objective 2 | COMPLETED |
| Steganographic Embedding | LSB (Least Significant Bit) spatial domain embedding of encrypted fragments into multimedia cover files. | Objective 2 | COMPLETED |
| Cloud Storage | Distributed fragment synchronization across Backblaze B2 Cloud Storage. | Objective 2 | COMPLETED |
| Web-based Application | Integrated platform of all functional processes developed using Laravel (Backend) and React/Inertia.js (Frontend). | Objective 3 | COMPLETED |
| Access Control & Auth | Robust user authentication and granular access control for document/system administration. | Objective 3 | COMPLETED |
| File Sharing | Secure document and folder-level sharing mechanism with recipient-specific authorization workflows. | Objective 3 | COMPLETED |

The technical audit revealed that the StegoLock system maintains a 100% compliance rate with the functional objectives defined during the development phase. The "Functional Suitability" of the system is demonstrated through its ability to execute complex, multi-stage workflows, specifically the transformation of raw documents into fragmented, steganographically-hidden cloud objects, without compromising data integrity. This technical verification provides an objective basis for the user approval ratings. While respondents perceived the system as reliable and secure through the interface, the system architecture facilitates these outcomes by implementing the AES-based encryption, segmentation, and steganographic embedding processes as a unified background pipeline. The consistent execution of the "Unlocking" process, which requires the systematic retrieval and reassembly of fragments from multiple cover files, serves as the primary indicator of functional correctness and appropriateness.

#### 4.4.3.3 SECURITY

In the context of StegoLock, Security is defined as the degree to which the system protects information and data so that persons or other systems have the degree of data access appropriate to their types and levels of authorization. This is analyzed through six sub-characteristics:
*   **Confidentiality:** Ensuring data is accessible only to authorized users.
*   **Integrity:** Protecting system data from unauthorized modification or corruption.
*   **Non-repudiation:** Ability to prove that an action or event took place.
*   **Accountability:** Tracing actions uniquely to a specific entity/user.
*   **Authenticity:** Proving the identity of a subject or resource.
*   **Resistance:** The system's ability to sustain operations under attack.

**User Evaluation**
The subjective security of the system was evaluated using five criteria (SC1–SC5) covering sub-characteristics such as Confidentiality, Integrity, Authenticity, and Accountability. Based on the feedback from 30 evaluation participants, the application achieved an overall General Weighted Mean (GWM) of 4.47, interpreted as "Strongly Agree."

As shown in the table below, the highest score was recorded for SC1 (4.67), which indicates that users felt a high degree of control over their data and confidence in the system's security posture. This result is significant as it aligns with the "Three-Pillar Defense" implementation, where data access is physically impossible without the user's session-based master key.

The lowest score was observed for SC4 (4.47). While still maintaining a very high positive interpretation, this score suggests that while users trust the authentication mechanism, the technical abstraction of the multi-layer locking process is where users are most focused on the system’s protective capabilities. Overall, the high GWM across all categories confirms that the backend-driven security processes successfully translated into a perceived sense of "Trustworthy" data protection.

<center>Table 17: Summary of Survey Ratings for Security</center>

| Item Code | Survey Question Statement | Weighted Mean | Likert Scale Description |
| :--- | :--- | :--- | :--- |
| SC1 | I think the StegoLock web app provides good control and data security. | 4.67 | Strongly Agree |
| SC2 | I think StegoLock is a trustworthy application. | 4.60 | Strongly Agree |
| SC3 | I believe that the StegoLock web app ensures that only authorized users can view, update, and upload. | 4.53 | Strongly Agree |
| SC4 | I believe that the StegoLock web app has a strong authentication mechanism to ensure that only authorized users can access the application. | 4.50 | Strongly Agree |
| SC5 | I believe that the StegoLock web app only provides access to authorized users. | 4.50 | Strongly Agree |
| | **General Weighted Mean (GWM)** | **4.47** | **Strongly Agree** |

**Technical Implementation Analysis**
The security of StegoLock is architected as a backend-driven process, ensuring that protection is enforced at the server level rather than merely through frontend restrictions. At the core of this architecture is a strict policy of Access Control and Isolation, where every digital asset is uniquely tied to a `user_id`. The system operates on a "Negative-Access Default" principle, which means that unless a valid and accepted (see Figures 50 and 51) `document_shares` record exists in the relational database, the backend rejects all retrieval attempts. This authorization is programmatically verified at the controller level before any decryption or reassembly jobs are dispatched, ensuring that fragments remain isolated and inaccessible to unauthorized parties.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 50 Share File view when a user shares a file to recipient</center>

<center>Figure 51 Accept Shared File in recipient’s view</center>

Through this mechanism, the system ensures that accessibility is strictly governed by explicit permission. Once a recipient accepts a shared file, the interface reflects their granted access rights, allowing them to perform authorized file operations.

<br><br><br><br><br><br><br><br><br><br><br><br>

<center>Figure 52 Accepted Shared File in recipient’s view, showing the accessibility on file operations</center>

To facilitate secure collaboration, the system utilizes a "Secure Bridge" Sharing Mechanism that allows for the transfer of access without exposing the original fragments. This is achieved through a transient re-wrapping process where the sender unwraps the Document Encryption Key (DEK) using their Master Key and immediately re-wraps it with a temporary System Share Key. While in this "bridge" state, the DEK remains encrypted within the `document_shares` table (see Figure 53), hidden from the public. Upon acceptance, the recipient unwraps the DEK using the System Key and re-wraps it with their own Master Key. This protocol ensures that original fragments are never moved or modified; only the "key" required to unlock them is securely transitioned between authorized entities.


<center>Figure 53 Sample document_shares records</center>

The technical robustness of the system is further supported by Objective Evidence gathered through algorithmic implementation and integrity audits. StegoLock utilizes industry-standard AES-256-GCM encryption, providing 2<sup>256</sup> combinations to ensure data confidentiality. During testing cycles, the system achieved a 100% fragmentation integrity rate, with all fragments successfully reassembled without data loss. This reliability is maintained through a dual-hashing mechanism: SHA-256 is used for individual fragment verification, while an HMAC-SHA256 signature is applied to the final file to detect any form of tampering during the reconstruction process.

Finally, the system’s Resistance is defined by a "Three-Pillar Defense" model (as discussed in Chapter 3) that enforces functional interdependency. Successful data reconstruction requires the simultaneous presence of the session-based Master Key, the relational Stego Map stored in the database, and the steganographic files hosted in distributed cloud storage. This architectural design ensures that even if one pillar is compromised, such as a database leak, the data remains fragmented and unreadable, as the attacker would still lack the Master Key held in the user's session and the physical stego files in the cloud.

#### 4.4.3.4 USABILITY

Usability is defined by the ISO/IEC 25010 standard as the degree to which a product or system can be interacted with by specified users to exchange information via the user interface to complete specific tasks in a variety of contexts of use. For StegoLock, usability is a vital bridge between high-level cryptographic complexity and user operability. The evaluation focuses on Appropriateness Recognizability, Learnability, Operability, User Error Protection, User Engagement, Inclusivity, User Assistance, and Self-descriptiveness.

**User Evaluation**
The subjective usability of the system was measured using nine criteria (US1–US9) covering the full spectrum of ISO/IEC 25010 usability sub-characteristics. Based on the feedback from 30 evaluation participants, the application achieved an overall General Weighted Mean (GWM) of 4.53, interpreted as "Strongly Agree."

The survey results reveal a consistently high level of user satisfaction across all surveyed criteria, suggesting that the application effectively bridges the gap between complex backend security and intuitive frontend interaction. As illustrated in Table 18, the highest rating was achieved by US2 (4.63), which confirms that the primary user experience is characterized by a significant ease of use. This sentiment is reinforced by strong scores for memorability (US1: 4.60) and accessibility (US7: 4.60), indicating that the interface is not only easy to navigate but also leaves a lasting, intuitive impression on the user. These metrics underscore the success of the "Cyber-Aesthetic" design in creating a structured and inviting environment, further validated by the high approval of the system's organization and visual appeal (US5: 4.53).

Conversely, the lowest average score was recorded for US9 (4.43), which addresses the portability and flexibility of the application in various environments. While this score remains within the "Strongly Agree" range, it indicates a discerning awareness among users regarding the system's technical dependency on cloud-based steganographic fragment retrieval for document reconstruction. This slight variance highlights a realistic user understanding that, while the interface is highly responsive, the underlying security model necessitates stable network connectivity for LSB-reversal and shard reassembly. Overall, the narrow distribution of high scores confirms that StegoLock successfully translates rigorous backend steganographic protocols into a seamless and engaging user journey.

<center>Table 18: Summary of Survey Ratings for Usability</center>

| Item Code | Survey Question Statement | Weighted Mean | Likert Scale Description |
| :--- | :--- | :--- | :--- |
| US1 | I think the way to use the StegoLock web app is easy to remember. | 4.60 | Strongly Agree |
| US2 | I find the StegoLock web app easy to use. | 4.63 | Strongly Agree |
| US3 | I seem to quickly understand when there are additional features in the StegoLock web app. | 4.50 | Strongly Agree |
| US4 | I think the StegoLock web app makes updated data easier. | 4.50 | Strongly Agree |
| US5 | StegoLock web app has an attractive appearance, well organized and without excess (user Friendly). | 4.53 | Strongly Agree |
| US6 | I have never had any difficulty using the features included in the StegoLock web app. | 4.48 | Strongly Agree |
| US7 | I think the StegoLock web app is easily accessible. | 4.60 | Strongly Agree |
| US8 | I believe that the StegoLock web app is accessible and remains available for use in certain situations or conditions. | 4.50 | Strongly Agree |
| US9 | I feel that the StegoLock web app can be used anywhere. | 4.43 | Strongly Agree |
| | **General Weighted Mean (GWM)** | **4.53** | **Strongly Agree** |

**Technical Implementation Audit**
The technical implementation of usability in StegoLock is audited through a three-part analysis that maps the system's architectural features to the core ISO/IEC 25010 Interaction Capability (Usability) sub-characteristics. This audit evaluates the efficiency of onboarding, the robustness of user support, and the aesthetic inclusivity of the interface.

**Measuring Appropriateness Recognizability, Learnability, and Self-Descriptiveness**
This component of the audit evaluates the clarity with which users can identify the system's purpose and the speed at which they master its core functions. StegoLock utilizes a self-descriptive design language, employing industry-standard terminology such as "Lock" and "Unlock" to ensure that the appropriateness of each function is immediately recognizable. This is reinforced by real-time status labels that provide constant visibility into the locking pipeline (status like uploading document, encrypting, segmenting, embedding, storing, etc.), allowing users to understand the state of their data without requiring specialized technical knowledge.

**Time to First Document Lock after Registration**
To obtain objective evidence of learnability, the system was evaluated on the duration between account registration and the successful completion of the first locking process. Data was extracted using the Database query shown in Figure 54.


<div style="background-color: #ffffff !important; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #005cc5;">SELECT</span></div>
<div style="padding-left: 2rem;"><span style="color: #24292e;">u.id</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">DATE_FORMAT</span>(<span style="color: #24292e;">u.created_at</span>, <span style="color: #032f62;">'%M %e, %Y %H:%i:%s'</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">registered_at</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">DATE_FORMAT</span>(<span style="color: #24292e;">d.created_at</span>, <span style="color: #032f62;">'%M %e, %Y %H:%i:%s'</span>) <span style="color: #005cc5;">AS</span></div>
<div><span style="color: #e36209;">first_document_locked_at</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">TIMESTAMPDIFF</span>(<span style="color: #005cc5;">MINUTE</span>, <span style="color: #24292e;">u.created_at</span>, <span style="color: #24292e;">d.created_at</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">diff_minutes</span></div>
<div><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">users u</span></div>
<div><span style="color: #005cc5;">JOIN</span> <span style="color: #24292e;">documents d</span> <span style="color: #005cc5;">ON</span> <span style="color: #24292e;">u.id</span> = <span style="color: #24292e;">d.user_id</span></div>
<div><span style="color: #005cc5;">WHERE</span> <span style="color: #24292e;">u.id</span> <span style="color: #005cc5;">NOT IN</span> (<span style="color: #005cc5;">3</span>, <span style="color: #005cc5;">4</span>)</div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">AND</span> <span style="color: #24292e;">d.document_id</span> = (</div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">SELECT</span> <span style="color: #6f42c1;">MIN</span>(<span style="color: #24292e;">d2.document_id</span>)</div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">documents d2</span></div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHERE</span> <span style="color: #24292e;">d2.user_id</span> = <span style="color: #24292e;">u.id</span> <span style="color: #005cc5;">AND</span> <span style="color: #24292e;">d2.status</span> = <span style="color: #032f62;">'stored'</span></div>
<div style="padding-left: 2rem;">);</div>
</div>

<center>Figure 54 Database Query for Learnability Metric: Time to First Document Lock after Registration</center>

As shown in Table 19, the majority of participants successfully navigated the onboarding process and completed their first secure file operation in an average of 5.57 minutes. More significantly, the median time recorded was 1.5 minutes, which implies that the system creates an immediate positive impression of efficiency, with half of the users achieving their first security milestone almost instantaneously upon registration.

<center>Table 19: Time Interval from User Registration to First Successful Document Locking</center>

| Metric Category | Time Value |
| :--- | :--- |
| Average Time to First Lock | 5.57 Minutes |
| Median Time to First Lock | 1.50 Minutes |

**Time to First Unlock of the First Document Lock**
Further audit of the user journey focused on the latency between locking a document and its unlocking process. This metric evaluates the user's progress from basic task completion to the mastery of the system's data retrieval. Data was extracted using the Database query shown in Figure 55.

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #005cc5;">SELECT</span></div>
<div style="padding-left: 2rem;"><span style="color: #24292e;">u.id</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">DATE_FORMAT</span>(<span style="color: #24292e;">d.created_at</span>, <span style="color: #032f62;">'%M %e, %Y %H:%i:%s'</span>) <span style="color: #005cc5;">AS</span></div>
<div><span style="color: #e36209;">first_document_locked_at</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">DATE_FORMAT</span>(<span style="color: #6f42c1;">MIN</span>(<span style="color: #24292e;">da.created_at</span>), <span style="color: #032f62;">'%M %e, %Y %H:%i:%s'</span>) <span style="color: #005cc5;">AS</span></div>
<div><span style="color: #e36209;">first_unlocked_at</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">TIMESTAMPDIFF</span>(<span style="color: #005cc5;">MINUTE</span>, <span style="color: #24292e;">d.created_at</span>, <span style="color: #6f42c1;">MIN</span>(<span style="color: #24292e;">da.created_at</span>)) <span style="color: #005cc5;">AS</span></div>
<div><span style="color: #e36209;">diff_minutes</span></div>
<div><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">users u</span></div>
<div><span style="color: #005cc5;">JOIN</span> <span style="color: #24292e;">documents d</span> <span style="color: #005cc5;">ON</span> <span style="color: #24292e;">u.id</span> = <span style="color: #24292e;">d.user_id</span></div>
<div><span style="color: #005cc5;">INNER JOIN</span> <span style="color: #24292e;">document_activities da</span> <span style="color: #005cc5;">ON</span> <span style="color: #24292e;">d.document_id</span> =</div>
<div><span style="color: #24292e;">da.document_id</span></div>
<div><span style="color: #005cc5;">WHERE</span> <span style="color: #24292e;">u.id</span> <span style="color: #005cc5;">NOT IN</span> (<span style="color: #005cc5;">3</span>, <span style="color: #005cc5;">4</span>)</div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">AND</span> <span style="color: #24292e;">da.action</span> = <span style="color: #032f62;">'unlocked'</span></div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">AND</span> <span style="color: #24292e;">d.document_id</span> = (</div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">SELECT</span> <span style="color: #6f42c1;">MIN</span>(<span style="color: #24292e;">d2.document_id</span>)</div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">documents d2</span></div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHERE</span> <span style="color: #24292e;">d2.user_id</span> = <span style="color: #24292e;">u.id</span> <span style="color: #005cc5;">AND</span> <span style="color: #24292e;">d2.status</span> = <span style="color: #032f62;">'stored'</span></div>
<div style="padding-left: 2rem;">)</div>
<div><span style="color: #005cc5;">GROUP BY</span> <span style="color: #24292e;">u.id</span>, <span style="color: #24292e;">d.created_at</span>;</div>
</div>

<center>Figure 55 Database Query for Learnability Metric: Time from First Lock to First Unlock</center>

As shown in Table 20, participants typically performed their first unlocking within minutes of securing their first file, demonstrating that the self-descriptive UI allows for a seamless transition between complex security operations.

<center>Table 20: Time Interval from First Document Lock to First Unlock</center>

| Metric Category | Time Value |
| :--- | :--- |
| Average Time to First Unlock | 4.60 Minutes |

**Measuring User Assistance, Operability, and User Error Protection**
The operability of StegoLock is facilitated through a defensive interaction model that prioritizes user support and prevents operational errors. This is technically achieved by abstracting the complex multi-stage cryptographic and steganographic processes into a streamlined "One-Click" workflow. Behind this abstraction, the system implements robust error protection mechanisms, including client-side file-type validation (PDF, DOCX, TXT only) and size capping (5MB) within the `UploadModal.jsx` component. Proactive user assistance is provided through reactive toast notifications and an event-driven "Evaluator Guide" that responds to real-time backend updates, ensuring that users are guided through task completion without friction or ambiguity.

**Measuring User Engagement and Inclusivity**
User engagement in StegoLock is driven by the aesthetic consistency of the "Cyber-Dark" design system, which utilizes a modern, dark-themed palette to create a high-fidelity professional environment. This engagement is paired with technical inclusivity, as the interface is built on a responsive framework that ensures full functionality across desktop, tablet, and mobile browsers. By maintaining a lightweight frontend footprint and utilizing asynchronous processing, the system ensures that high-security data operations do not compromise device accessibility, allowing the platform to be utilized effectively in varied user contexts.

#### 4.4.3.5 PERFORMANCE EFFICIENCY

Performance Efficiency is defined as the performance relative to the amount of resources used under stated conditions. For StegoLock, this characteristic is critical due to the computationally intensive nature of some processes, especially the steganographic embedding. The evaluation focuses on Time Behavior (response and processing times), Resource Utilization (efficiency of CPU, memory, and storage usage), and Capacity (the system's ability to handle maximum load).

**User Evaluation**
The subjective performance efficiency of the system was measured using seven criteria (PE1–PE7) covering sub-characteristics such as Time-Behavior, Resource Utilization, and Capacity. Based on the feedback from 30 evaluation participants, the application achieved an overall General Weighted Mean (GWM) of 4.61, interpreted as "Strongly Agree."

As shown in the survey data, the highest score was recorded for PE7 (4.73), indicating that users perceived a high degree of compatibility and smooth performance across different devices. This suggests that the front-end implementation efficiently manages resources, ensuring that the heavy backend processes do not degrade the local user experience. Additionally, the high score for PE6 (4.70) confirms that users did not encounter significant performance bottlenecks, validating the choice of an asynchronous architecture.

The lowest score, though still highly positive, was observed for PE1 (4.47) regarding the responsiveness when displaying initial results. This slight variance indicates that while the system is remarkably fast for a security-centric application, the initial loading of document lists or activity logs is the primary area where users perceive the overhead of the system's complex relational database and cloud-mapping lookups. Overall, the high GWM demonstrates that StegoLock successfully balances robust security with a fluid, responsive interface that meets high user expectations.

<center>Table 21: Summary of Survey Ratings for Performance Efficiency</center>

| Item Code | Survey Question Statement | Weighted Mean | Likert Scale Description |
| :--- | :--- | :--- | :--- |
| PE1 | I think the StegoLock web app responds quickly when I display results. | 4.47 | Strongly Agree |
| PE2 | I think the StegoLock web app processes results quickly. | 4.60 | Strongly Agree |
| PE3 | I feel that the response time of the StegoLock web app is in accordance with the amount of data entered. | 4.59 | Strongly Agree |
| PE4 | I think the StegoLock web app doesn't have many system performance bottlenecks. | 4.58 | Strongly Agree |
| PE5 | The StegoLock web app doesn't close on its own when used. | 4.60 | Strongly Agree |
| PE6 | StegoLock web app does not crash or stop when used. | 4.70 | Strongly Agree |
| PE7 | I feel that the StegoLock web app can run on all devices (mobile phone, laptop, or PC). | 4.73 | Strongly Agree |
| | **General Weighted Mean (GWM)** | **4.61** | **Strongly Agree** |

**Technical Performance Audit**
The objective performance of StegoLock was audited by measuring real-time execution metrics across the document lifecycle. The system’s architecture is fundamentally designed to separate UI responsiveness from heavy data processing, utilizing a decoupled background worker system.

**Time-Behavior Analysis**
The system’s time behavior for the Document Locking Process is characterized by a "Fast-Feedback, Deep-Processing" model. To obtain objective evidence of this behavior, the system’s `process_metrics` table was queried using a SQL aggregation (see Figure 56). The results, based on a sample of 27 documents, show that the synchronous "upload" and "encryption" phases are remarkably efficient, completing in approximately 13ms and 36ms respectively. This efficiency ensures that the user interface remains responsive and returns control to the user in under 50ms total for the front-end blocking phases. The more computationally demanding tasks, specifically "segmentation" (87.6ms) and the high-latency "embedding" and cloud storage phase (8.5s), are offloaded to asynchronous background jobs.

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #005cc5;">SELECT</span></div>
<div style="padding-left: 2rem;"><span style="color: #24292e;">step</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">COUNT</span>(<span style="color: #24292e;">document_id</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">document_count</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">duration_ms</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">avg_duration_ms</span></div>
<div><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">process_metrics</span></div>
<div><span style="color: #005cc5;">WHERE</span> <span style="color: #24292e;">step</span> <span style="color: #005cc5;">IN</span> (<span style="color: #032f62;">'upload'</span>, <span style="color: #032f62;">'encryption'</span>, <span style="color: #032f62;">'segmentation'</span>, <span style="color: #032f62;">'embedding'</span>)</div>
<div><span style="color: #005cc5;">GROUP BY</span> <span style="color: #24292e;">step</span></div>
<div><span style="color: #005cc5;">ORDER BY</span> <span style="color: #6f42c1;">FIELD</span>(<span style="color: #24292e;">step</span>, <span style="color: #032f62;">'upload'</span>, <span style="color: #032f62;">'encryption'</span>, <span style="color: #032f62;">'segmentation'</span>, <span style="color: #032f62;">'embedding'</span>);</div>
</div>

<center>Figure 56: Database Query for Average Locking Process Latency by Sub-process</center>

<center>Table 22: Average Locking Process Latency by Sub-process</center>

| Sub-Process | Process Description | Avg. Duration |
| :--- | :--- | :--- |
| upload | File upload and compression | 13.08317073 ms |
| encryption | AES-256-GCM encryption | 35.71575000 ms |
| segmentation | Cover selection and segmentation | 87.62820513 ms |
| embedding | LSB embedding and cloud storage | 8540.59078947 ms |
| **TOTAL** | **Full Locking Process** | **~8.7 sec** |

Similar to the locking process, the Document Unlocking Process was audited to measure the latency of retrieving and reconstructing documents. The objective data was extracted using the query shown in Figure 57, targeting steps specific to the retrieval lifecycle. The results demonstrate that the unlocking process is significantly faster than locking, with a total average duration of approximately 2.3 seconds. This is primarily because cloud retrieval and batch extraction are optimized through parallel execution and direct LSB reversal, which is less computationally expensive than the iterative search-and-embed logic used during locking.

<br><br><br><br><br><br><br><br><br><br><br><br>

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #005cc5;">SELECT</span></div>
<div style="padding-left: 2rem;"><span style="color: #24292e;">step</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">COUNT</span>(<span style="color: #24292e;">document_id</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">document_count</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">duration_ms</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">avg_duration_ms</span></div>
<div><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">process_metrics</span></div>
<div><span style="color: #005cc5;">WHERE</span> <span style="color: #24292e;">step</span> <span style="color: #005cc5;">IN</span> (<span style="color: #032f62;">'cloud_retrieval'</span>, <span style="color: #032f62;">'extraction'</span>, <span style="color: #032f62;">'assembly'</span>, <span style="color: #032f62;">'decryption'</span>)</div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">AND</span> <span style="color: #24292e;">job_type</span> = <span style="color: #032f62;">'unlock'</span></div>
<div><span style="color: #005cc5;">GROUP BY</span> <span style="color: #24292e;">step</span></div>
<div><span style="color: #005cc5;">ORDER BY</span> <span style="color: #6f42c1;">FIELD</span>(<span style="color: #24292e;">step</span>, <span style="color: #032f62;">'cloud_retrieval'</span>, <span style="color: #032f62;">'extraction'</span>, <span style="color: #032f62;">'assembly'</span>, <span style="color: #032f62;">'decryption'</span>);</div>
</div>

<center>Figure 57: Database Query for Average Unlocking Process Latency by Sub-process</center>

<center>Table 23: Average Unlocking Process Latency by Sub-process</center>

| Sub-Process | Process Description | Avg. Duration |
| :--- | :--- | :--- |
| cloud_retrieval | Unlock request and stego file retrieval from cloud | 989.98296296 ms |
| extraction | LSB steganographic reversal/extraction | 1289.44666667 ms |
| reassembly | Fragment reassembly into the encrypted document | 12.50740741 ms |
| decryption | AES-256-GCM decryption and decompression | 7.35925926 ms |
| **TOTAL** | **Full Unlocking Process** | **~2.3 sec** |

To further evaluate the system's efficiency, an audit was conducted on how the total processing time scales across different file size tiers. The data was extracted by joining the documents table with aggregated process_metrics for both locking and unlocking job types (see Figure 58).

<br><br><br><br><br><br><br><br><br><br><br><br>

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #005cc5;">SELECT</span></div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">CASE</span></div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">d.original_size</span> &lt; <span style="color: #005cc5;">1048576</span> <span style="color: #005cc5;">THEN</span> <span style="color: #032f62;">'&lt; 1MB'</span></div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">d.original_size</span> &gt;= <span style="color: #005cc5;">1048576</span> <span style="color: #005cc5;">AND</span> <span style="color: #24292e;">d.original_size</span> &lt; <span style="color: #005cc5;">3145728</span> <span style="color: #005cc5;">THEN</span></div>
<div><span style="color: #032f62;">'1MB - 3MB'</span></div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">d.original_size</span> &gt;= <span style="color: #005cc5;">3145728</span> <span style="color: #005cc5;">AND</span> <span style="color: #24292e;">d.original_size</span> &lt;= <span style="color: #005cc5;">5242880</span> <span style="color: #005cc5;">THEN</span></div>
<div><span style="color: #032f62;">'3MB - 5MB'</span></div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">ELSE</span> <span style="color: #032f62;">'&gt; 5MB'</span></div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">END AS</span> <span style="color: #e36209;">size_range</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">COUNT</span>(<span style="color: #005cc5;">DISTINCT</span> <span style="color: #24292e;">d.document_id</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">document_count</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">ROUND</span>(<span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">lock_totals.total_lock_time_ms</span>), <span style="color: #005cc5;">2</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">avg_locking_process_ms</span></div>
<div><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">documents d</span></div>
<div><span style="color: #005cc5;">LEFT JOIN</span> (</div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">SELECT</span> <span style="color: #24292e;">document_id</span>, <span style="color: #6f42c1;">SUM</span>(<span style="color: #24292e;">duration_ms</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">total_lock_time_ms</span></div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">process_metrics</span></div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">WHERE</span> <span style="color: #24292e;">step</span> <span style="color: #005cc5;">IN</span> (<span style="color: #032f62;">'upload'</span>, <span style="color: #032f62;">'encryption'</span>, <span style="color: #032f62;">'segmentation'</span>, <span style="color: #032f62;">'embedding'</span>)</div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">GROUP BY</span> <span style="color: #24292e;">document_id</span></div>
<div>) <span style="color: #005cc5;">AS</span> <span style="color: #24292e;">lock_totals</span> <span style="color: #005cc5;">ON</span> <span style="color: #24292e;">d.document_id</span> = <span style="color: #24292e;">lock_totals.document_id</span></div>
<div><span style="color: #005cc5;">GROUP BY</span> <span style="color: #005cc5;">1</span></div>
<div><span style="color: #005cc5;">ORDER BY</span> <span style="color: #6f42c1;">FIELD</span>(<span style="color: #24292e;">size_range</span>, <span style="color: #032f62;">'&lt; 1MB'</span>, <span style="color: #032f62;">'1MB - 3MB'</span>, <span style="color: #032f62;">'3MB - 5MB'</span>, <span style="color: #032f62;">'&gt; 5MB'</span>);</div>
</div>

<center>Figure 58: Database Query for Locking Process Distribution Across File Size Ranges</center>

<br><br><br><br><br><br><br><br><br><br><br><br>

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #005cc5;">SELECT</span></div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">CASE</span></div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">d.original_size</span> &lt; <span style="color: #005cc5;">1048576</span> <span style="color: #005cc5;">THEN</span> <span style="color: #032f62;">'&lt; 1MB'</span></div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">d.original_size</span> &gt;= <span style="color: #005cc5;">1048576</span> <span style="color: #005cc5;">AND</span> <span style="color: #24292e;">d.original_size</span> &lt; <span style="color: #005cc5;">3145728</span> <span style="color: #005cc5;">THEN</span></div>
<div><span style="color: #032f62;">'1MB - 3MB'</span></div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">d.original_size</span> &gt;= <span style="color: #005cc5;">3145728</span> <span style="color: #005cc5;">AND</span> <span style="color: #24292e;">d.original_size</span> &lt;= <span style="color: #005cc5;">5242880</span> <span style="color: #005cc5;">THEN</span></div>
<div><span style="color: #032f62;">'3MB - 5MB'</span></div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">ELSE</span> <span style="color: #032f62;">'&gt; 5MB'</span></div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">END AS</span> <span style="color: #e36209;">size_range</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">COUNT</span>(<span style="color: #005cc5;">DISTINCT</span> <span style="color: #24292e;">d.document_id</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">document_count</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">ROUND</span>(<span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">unlock_totals.total_unlock_time_ms</span>), <span style="color: #005cc5;">2</span>) <span style="color: #005cc5;">AS</span></div>
<div><span style="color: #e36209;">avg_unlocking_process_ms</span></div>
<div><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">documents d</span></div>
<div><span style="color: #005cc5;">LEFT JOIN</span> (</div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">SELECT</span> <span style="color: #24292e;">document_id</span>, <span style="color: #6f42c1;">SUM</span>(<span style="color: #24292e;">duration_ms</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">total_unlock_time_ms</span></div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">process_metrics</span></div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">WHERE</span> <span style="color: #24292e;">step</span> <span style="color: #005cc5;">IN</span> (<span style="color: #032f62;">'unlock_prepare'</span>, <span style="color: #032f62;">'cloud_retrieval'</span>, <span style="color: #032f62;">'extraction'</span>,</div>
<div><span style="color: #032f62;">'assembly'</span>, <span style="color: #032f62;">'decryption'</span>)</div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">GROUP BY</span> <span style="color: #24292e;">document_id</span></div>
<div>) <span style="color: #005cc5;">AS</span> <span style="color: #24292e;">unlock_totals</span> <span style="color: #005cc5;">ON</span> <span style="color: #24292e;">d.document_id</span> = <span style="color: #24292e;">unlock_totals.document_id</span></div>
<div><span style="color: #005cc5;">GROUP BY</span> <span style="color: #005cc5;">1</span></div>
<div><span style="color: #005cc5;">ORDER BY</span> <span style="color: #6f42c1;">FIELD</span>(<span style="color: #24292e;">size_range</span>, <span style="color: #032f62;">'&lt; 1MB'</span>, <span style="color: #032f62;">'1MB - 3MB'</span>, <span style="color: #032f62;">'3MB - 5MB'</span>, <span style="color: #032f62;">'&gt; 5MB'</span>);</div>
</div>

<center>Figure 59: Database Query for Unlocking Process Distribution Across File Size Ranges</center>

The distribution in Table 24 reveals a predictable scaling model. For files under 1MB, which represent the majority of the test set (n=21), the system achieves a mean locking duration of 5.48 seconds. As document sizes increase to the 3MB–5MB range, the locking duration scales to 19.74 seconds. This increase is primarily attributed to the higher number of fragments required to maintain low-density steganography; a larger document necessitates more cover files and, consequently, more concurrent B2 cloud connections and Python embedding processes.

Interestingly, the unlocking process remains remarkably efficient even at higher size ranges. For documents in the 3MB–5MB tier, the average unlocking duration was recorded at 5.07 seconds, significantly faster than the locking phase. This is due to the system’s use of parallel retrieval workers and direct LSB extraction, which avoids the computational "search-and-fit" overhead required during the initial embedding. Overall, the data confirms that StegoLock maintains system stability across all tested tiers, ensuring that even large-scale secure operations complete within a timeframe that aligns with the high user responsiveness ratings (GWM 4.61).

<center>Table 24: Unlocking and Locking Process Duration Distribution Across File Size Ranges</center>

| File Size Range | No. of Documents | Avg. Locking Duration | Avg. Unlocking Duration |
| :--- | :--- | :--- | :--- |
| 1kb - 1mb | 21 | 5476.63 ms | 3037.23 ms |
| 1mb-3mb | 2 | 13408.97 ms | 9690.67 ms |
| 3mb-5mb | 4 | 19740.12 ms | 5072.77 ms |
| **TOTAL** | **27** | **Avg: 12.9 sec** | **Avg: 5.9 sec** |

**Resource Utilization**
Resource utilization in StegoLock is primarily evaluated through the lens of storage efficiency versus security resistance. Because the system prioritizes low-density steganography (to minimize the risk of detection), it incurs a significant storage overhead. To audit this utilization, a comprehensive Stego-Expansion Analysis was conducted using a database query (see Figure 60) that calculates the relationship between the original document size and its final footprint in the B2 cloud.

<br><br><br><br><br><br><br><br><br><br><br><br>

<div style="background-color: #ffffff; padding: 1.5rem; border: 1px solid #d1d5da; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 14px; line-height: 1.6; color: #24292e;">
<div><span style="color: #005cc5;">SELECT</span></div>
<div style="padding-left: 2rem;"><span style="color: #24292e;">size_range</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">COUNT</span>(*) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">document_count</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">ROUND</span>(<span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">fragment_count</span>), <span style="color: #005cc5;">1</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">avg_fragment_count</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #6f42c1;">ROUND</span>(<span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">in_cloud_size</span>) / (<span style="color: #005cc5;">1024</span> * <span style="color: #005cc5;">1024</span>), <span style="color: #005cc5;">2</span>) <span style="color: #005cc5;">AS</span> <span style="color: #e36209;">avg_cloud_footprint_mb</span>,</div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">CASE</span></div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">size_range</span> = <span style="color: #032f62;">'&lt; 1MB'</span> <span style="color: #005cc5;">THEN</span> <span style="color: #6f42c1;">ROUND</span>(<span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">in_cloud_size</span>) / (<span style="color: #005cc5;">1024</span> * <span style="color: #005cc5;">1024</span>) / <span style="color: #005cc5;">1</span>, <span style="color: #005cc5;">2</span>)</div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">size_range</span> = <span style="color: #032f62;">'1MB - 2MB'</span> <span style="color: #005cc5;">THEN</span> <span style="color: #6f42c1;">ROUND</span>(<span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">in_cloud_size</span>) / (<span style="color: #005cc5;">1024</span> * <span style="color: #005cc5;">1024</span>) / <span style="color: #005cc5;">1</span>, <span style="color: #005cc5;">2</span>)</div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">size_range</span> = <span style="color: #032f62;">'2MB - 3MB'</span> <span style="color: #005cc5;">THEN</span> <span style="color: #6f42c1;">ROUND</span>(<span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">in_cloud_size</span>) / (<span style="color: #005cc5;">1024</span> * <span style="color: #005cc5;">1024</span>) / <span style="color: #005cc5;">2</span>, <span style="color: #005cc5;">2</span>)</div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">size_range</span> = <span style="color: #032f62;">'3MB - 4MB'</span> <span style="color: #005cc5;">THEN</span> <span style="color: #6f42c1;">ROUND</span>(<span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">in_cloud_size</span>) / (<span style="color: #005cc5;">1024</span> * <span style="color: #005cc5;">1024</span>) / <span style="color: #005cc5;">3</span>, <span style="color: #005cc5;">2</span>)</div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">size_range</span> = <span style="color: #032f62;">'4MB - 5MB'</span> <span style="color: #005cc5;">THEN</span> <span style="color: #6f42c1;">ROUND</span>(<span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">in_cloud_size</span>) / (<span style="color: #005cc5;">1024</span> * <span style="color: #005cc5;">1024</span>) / <span style="color: #005cc5;">4</span>, <span style="color: #005cc5;">2</span>)</div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">ELSE</span> <span style="color: #6f42c1;">ROUND</span>(<span style="color: #6f42c1;">AVG</span>(<span style="color: #24292e;">in_cloud_size</span>) / (<span style="color: #005cc5;">1024</span> * <span style="color: #005cc5;">1024</span>) / <span style="color: #005cc5;">5</span>, <span style="color: #005cc5;">2</span>)</div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">END AS</span> <span style="color: #e36209;">expansion_ratio</span></div>
<div><span style="color: #005cc5;">FROM</span> (</div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">SELECT</span></div>
<div style="padding-left: 4rem;"><span style="color: #24292e;">fragment_count</span>,</div>
<div style="padding-left: 4rem;"><span style="color: #24292e;">in_cloud_size</span>,</div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">CASE</span></div>
<div style="padding-left: 6rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">original_size</span> &lt; <span style="color: #005cc5;">1048576</span> <span style="color: #005cc5;">THEN</span> <span style="color: #032f62;">'&lt; 1MB'</span></div>
<div style="padding-left: 6rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">original_size</span> &gt;= <span style="color: #005cc5;">1048576</span> <span style="color: #005cc5;">AND</span> <span style="color: #24292e;">original_size</span> &lt; <span style="color: #005cc5;">2097152</span> <span style="color: #005cc5;">THEN</span> <span style="color: #032f62;">'1MB - 2MB'</span></div>
<div style="padding-left: 6rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">original_size</span> &gt;= <span style="color: #005cc5;">2097152</span> <span style="color: #005cc5;">AND</span> <span style="color: #24292e;">original_size</span> &lt; <span style="color: #005cc5;">3145728</span> <span style="color: #005cc5;">THEN</span> <span style="color: #032f62;">'2MB - 3MB'</span></div>
<div style="padding-left: 6rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">original_size</span> &gt;= <span style="color: #005cc5;">3145728</span> <span style="color: #005cc5;">AND</span> <span style="color: #24292e;">original_size</span> &lt; <span style="color: #005cc5;">4194304</span> <span style="color: #005cc5;">THEN</span> <span style="color: #032f62;">'3MB - 4MB'</span></div>
<div style="padding-left: 6rem;"><span style="color: #005cc5;">WHEN</span> <span style="color: #24292e;">original_size</span> &gt;= <span style="color: #005cc5;">4194304</span> <span style="color: #005cc5;">AND</span> <span style="color: #24292e;">original_size</span> &lt;= <span style="color: #005cc5;">5242880</span> <span style="color: #005cc5;">THEN</span> <span style="color: #032f62;">'4MB - 5MB'</span></div>
<div style="padding-left: 6rem;"><span style="color: #005cc5;">ELSE</span> <span style="color: #032f62;">'&gt; 5MB'</span></div>
<div style="padding-left: 4rem;"><span style="color: #005cc5;">END AS</span> <span style="color: #e36209;">size_range</span></div>
<div style="padding-left: 2rem;"><span style="color: #005cc5;">FROM</span> <span style="color: #24292e;">documents</span></div>
<div>) <span style="color: #005cc5;">AS</span> <span style="color: #24292e;">d</span></div>
<div><span style="color: #005cc5;">GROUP BY</span> <span style="color: #24292e;">size_range</span></div>
<div><span style="color: #005cc5;">ORDER BY</span> <span style="color: #6f42c1;">FIELD</span>(<span style="color: #24292e;">size_range</span>, <span style="color: #032f62;">'&lt; 1MB'</span>, <span style="color: #032f62;">'1MB - 2MB'</span>, <span style="color: #032f62;">'2MB - 3MB'</span>, <span style="color: #032f62;">'3MB - 4MB'</span>, <span style="color: #032f62;">'4MB - 5MB'</span>, <span style="color: #032f62;">'&gt; 5MB'</span>);</div>
</div>

<center>Figure 60: Database Query for Stego-Expansion Analysis</center>

<center>Table 25: Stego-Expansion Analysis (Payload vs. Cloud Size)</center>

| Size Range | No. of Docs | Avg. Fragment Count | Avg. Cloud Footprint | Expansion Ratio |
| :--- | :--- | :--- | :--- | :--- |
| 1mb | 21 | 3-4 | 6.28 mb | 6.0x |
| 2mb | 1 | 7 | 28.14 mb | 14.0x |
| 3mb | 1 | 8 | 63.0 mb | 21.0x |
| 4mb | 3 | 13 | 66.08 mb | 16.5x |
| 5mb | 1 | 31 | 85.74 mb | 17.1x |
| **TOTAL** | **27** | | | |

The data in Table 25 illustrates the system's "Security-First" resource strategy. As the payload size increases, the system aggressively scales the Fragment Count, reaching an average of 31 fragments for a 5MB document. This segmentation ensures that even if a single fragment is compromised, the data remains unintelligible without the complete set of fragments and the master decryption key.

The Expansion Ratio ranges from 6.0x to as high as 21.0x. This variance is a result of the system's opportunistic cover selection; for smaller files, the system can utilize high-capacity audio covers more efficiently, whereas larger files may require a larger number of smaller image covers, leading to a spike in the total cloud footprint. While an 85.74MB footprint for a 5MB document represents a significant consumption of cloud storage, it is a necessary architectural trade-off to achieve the low-density embedding required to evade steganographic detection. This utilization model is supported by the "Zero-Waste" cleanup mechanisms, which ensure that local server resources are immediately removed after large-scale processing is completed.

**Capacity and Scalability Gate**
To handle concurrent operations, the system utilizes a Concurrency Gate that prevents race conditions by ensuring a single document is processed by only one worker at a time. A "Capacity Gate" is also implemented; the system calculates the final stego-expansion size before initiating any cloud uploads. If the projected size exceeds the user's storage quota, the process is aborted. This proactive capacity management ensures that the system remains stable and predictable even under heavy load.

## 4.5 DISCUSSION OF FINDINGS

The proposed steganographic security model demonstrated robust document protection while maintaining a critical balance between concealment and storage efficiency. The system achieved a 100% integrity success rate across all test samples (n=27), providing bit-perfect reconstruction through SHA-256 validation. For files under 1MB, which represented the majority of the evaluation set, the system maintained a mean locking duration of 5.48 seconds with an expansion ratio of 6.0x, representing a sustainable balance for standard document management. However, for larger documents in the 3MB–5MB tier, the expansion ratio aggressively scaled to 21.0x at the cost of a significant cloud footprint (Avg: 85.74MB), necessitated by the high-density fragmentation (up to 31 fragments) required to maintain low-density steganography. These results suggest that while StegoLock disproportionately consumes cloud resources at higher payload tiers, this utilization model correlates directly with the platform's security resistance, confirming the utility of reconstruction-dependent architectures in safeguarding sensitive content from forensic detection.

StegoLock was developed as a web-based, cloud-integrated platform driven by both architectural stability and user accessibility considerations. The primary reason for utilizing a decoupled background worker system (Laravel Queues) was to ensure the utmost UI responsiveness during resource-intensive operations. By offloading heavy Python-based embedding and AES-256-GCM encryption—which averaged 12.9 seconds for the total locking pipeline—to asynchronous workers, the system successfully restricted synchronous UI-blocking phases to under 50ms. This approach ensures that users remain productive while complex data transformations occur in the background, effectively leveraging the computational power of the server environment without degrading the client-side experience. Additionally, the cloud-distributed nature of the storage, which scatters fragments across Backblaze B2 under randomized system-generated identifiers, ensures that user documents remain protected even in the event of a partial database breach, aligning with security best practices for defense-in-depth.

While StegoLock demonstrates promising technical capabilities in document protection, its real-world implementation faces several critical challenges that must be addressed for broader adoption. The system's performance metrics, including a 2.3s average unlocking duration versus the 12.9s locking duration, highlight its efficiency in retrieval while exposing limitations tied to the computational "search-and-fit" logic of steganographic embedding. Beyond processing overhead, the system's reliability evaluation exposed transient operational failures, such as the generation of "Ghost Files"—fragments successfully uploaded to the Backblaze B2 cloud but left unreferenced in the local database due to interrupted network handshakes—and the `Cover App Model Not Found` exception, which triggered embedding failures during automated cover-media selection. These constraints, alongside the reliance on shell-based Python execution (`exec`), create environment dependencies and potential bottlenecks compared to native binary integrations. Furthermore, earlier testing identified UI stability challenges related to data prop normalization, underscoring the importance of robust error-handling and automated system auditing in maintaining a cohesive user experience across complex, event-driven security pipelines.

The trade-offs highlighted in StegoLock's expansion ratios and processing latencies reflect the inherent challenge of balancing high-level security with resource efficiency. While achieving absolute data isolation through up to 31 fragments per document, the system introduces substantial storage demands that are further complicated by the diverse media capacities of the available cover pool. For instance, while high-capacity audio covers provide optimized efficiency (6.0x expansion), the necessary reliance on smaller image covers for larger payloads results in significant storage spikes. This utilization model is functionally grounded in the 100% fragment integrity rate and the "Zero-Waste" cleanup mechanisms, which ensure that the increased cloud storage consumption is offset by the immediate removal of local server resources. Ultimately, the successful triangulation of user trust with empirical performance metrics confirms that StegoLock effectively bridges the gap between high-level cryptographic complexity and operational simplicity, fulfilling the mandate of a secure, user-centric data storage solution.

