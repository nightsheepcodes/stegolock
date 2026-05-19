import React from 'react';
import { Shield } from 'lucide-react';

export function getChapter2Slides({ activeModal, setActiveModal, expandedSection, setExpandedSection }) {
    return [
        {
            title: "Chapter 2",
            subtitle: "Review of Literature",
            content: (
                <div className="h-full flex flex-col justify-center py-2 px-2 sm:px-4">
                    <div className="mb-2 sm:mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 text-center lg:text-left group cursor-default">
                            <div className="size-10 sm:size-14 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-5 sm:size-7 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Chapter 2</h2>
                            </div>
                        </div>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-xs sm:text-sm mt-2 text-center lg:text-left lg:pl-[4.5rem]">Review of Literature</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center gap-3 sm:gap-8 min-h-0 py-2 sm:py-4">
                        {/* Card 1: Related Literature */}
                        <div 
                            onClick={() => setActiveModal('literature')}
                            className="w-full lg:w-[40rem] h-16 sm:h-32 glass-panel p-3 sm:p-6 rounded-xl sm:rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                        >
                            <h3 className="text-sm sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300 uppercase">
                                Related Literature
                            </h3>
                        </div>

                        {/* Card 2: Related Systems */}
                        <div 
                            onClick={() => setActiveModal('systems')}
                            className="w-full lg:w-[40rem] h-16 sm:h-32 glass-panel p-3 sm:p-6 rounded-xl sm:rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                        >
                            <h3 className="text-sm sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300 uppercase">
                                Related Systems
                            </h3>
                        </div>
                    </div>

                    {/* Modal Overlay for Slide 4 Cards */}
                    {activeModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent" onClick={() => setActiveModal(null)}>
                            <div 
                                className="bg-slate-900 border border-cyber-accent/50 w-full max-w-4xl p-5 sm:p-10 rounded-2xl sm:rounded-[2rem] relative shadow-2xl shadow-cyan-500/20 animate-fade-in flex flex-col max-h-[85vh]"
                                onClick={e => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setActiveModal(null)}
                                    className="absolute top-4 right-4 size-8 sm:top-6 sm:right-6 sm:size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-base sm:text-xl z-10"
                                >
                                    ✕
                                </button>
                                <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white mb-4 sm:mb-6 shrink-0">
                                    {activeModal === 'literature' && 'Related Literature'}
                                    {activeModal === 'systems' && 'Related Systems'}
                                </h2>
                                <div className="text-slate-300 space-y-4 text-sm sm:text-base md:text-lg leading-relaxed overflow-y-auto min-h-0 pr-4">
                                    {activeModal === 'literature' && (
                                        <div className="space-y-4">
                                            {[
                                                {
                                                    id: '2.1.1',
                                                    title: 'Evolution of Digital Document Storage',
                                                    content: 'The transition from physical archives to Digital Document Management Systems (DMS) resolved historic limitations such as vulnerability to damage and slow retrieval by introducing electronic storage, metadata indexing, and automated workflows. This evolution was dramatically accelerated by the advent of cloud computing, which shifted storage from local infrastructure to scalable, on-demand network environments, offering unprecedented remote accessibility, dynamic resource scaling, and real-time centralized collaboration.'
                                                },
                                                {
                                                    id: '2.1.2',
                                                    title: 'Cloud-Based Storage and Security Challenges',
                                                    content: 'While cloud platforms like Google Drive, iCloud, Dropbox, and OneDrive offer scalability and accessibility, they also expand the attack surface by reducing direct organizational control over data. Key risks include OAuth misconfigurations, API exposures, compromised authentication tokens, and inadequate access control policies — all of which can expose stored data despite standard security measures. Critically, conventional cloud security frameworks that rely primarily on encryption fall short once encrypted files are exfiltrated, as protection then depends solely on the encrypted artifact itself rather than the secured infrastructure, underscoring the need for complementary security mechanisms.'
                                                },
                                                {
                                                    id: '2.1.3',
                                                    title: 'Encryption as a Foundational Security Mechanism',
                                                    content: 'AES, standardized by NIST as a symmetric block cipher supporting 128, 192, or 256-bit keys, is widely recognized as the benchmark for protecting data-at-rest and data-in-transit in cloud environments, with client-side encryption offering stronger protection by preventing exposure to server-side vulnerabilities. However, encryption alone cannot eliminate all risks — side-channel attacks, implementation flaws, and brute-force attempts remain viable threats. More critically, the overall security of an encrypted system depends heavily on key management practices, as weak key generation, storage, or distribution can completely negate the mathematical strength of the algorithm, making secure key lifecycle management an essential complement to encryption itself.'
                                                },
                                                {
                                                    id: '2.1.4',
                                                    title: 'Key Derivation Functions and Key Management',
                                                    content: 'Key Derivation Functions (KDFs) such as PBKDF2 and HKDF are essential mechanisms for generating strong cryptographic keys from passwords or shared secrets, using salting and configurable computational cost to resist brute-force and dictionary attacks. Adaptive KDF models can dynamically adjust iteration counts based on device capability and data sensitivity, balancing security with performance. However, the strength of even the best KDF is undermined by poor key management — weak storage, inadequate access controls, and infrequent key rotation remain major vulnerabilities regardless of the encryption algorithm used. Secure key lifecycle practices (generation, distribution, storage, and rotation) are therefore indispensable complements to cryptographic strength.'
                                                },
                                                {
                                                    id: '2.1.5',
                                                    title: 'Steganography in Digital Security',
                                                    content: 'Steganography conceals the existence of data rather than just its content, with LSB (Least Significant Bit) modification being a widely used technique for imperceptibly embedding hidden information in images, audio, or text. When combined with encryption in a crypto-stego approach — encrypting data first, then embedding it — the system gains dual-layered protection where even detected hidden data remains unreadable without the cryptographic key. However, a core challenge persists: embedding large, high-entropy encrypted payloads degrades cover media quality and increases computational overhead, creating an inherent trade-off between payload capacity, imperceptibility, security, and efficiency that remains central to steganographic system design.'
                                                },
                                                {
                                                    id: '2.1.6',
                                                    title: 'Encrypted File Segmentation and Multi-Location Cloud Storage',
                                                    content: 'Segmentation splits an already-encrypted file into multiple separate parts before storage, ensuring no single segment contains enough information for reconstruction — a principle rooted in cryptographic secret sharing, where the approach is effectively "all or nothing." Distributing these segments across independent cloud locations adds a structural security layer distinct from encryption: even if a storage location is compromised, the attacker retrieves only one useless fragment. An adversary must successfully recover all carrier files, extract all embedded segments, and reassemble them before any decryption attempt can even begin — confirming that segmentation and multi-location storage reduce sole reliance on cryptographic strength and form the structural backbone of a reconstruction-dependent security model.'
                                                },
                                                {
                                                    id: '2.1.7',
                                                    title: 'Reconstruction-Dependent Security Models',
                                                    content: 'Reconstruction-dependent security extends conventional encryption by making structural assembly of all encrypted segments a mandatory precondition for decryption — possession of any single ciphertext fragment alone confers no meaningful advantage to an attacker. This model enforces three sequential, interdependent barriers: a Segmentation Barrier (splitting the encrypted file so no fragment is individually reconstructible), a Distribution Barrier (embedding each segment into a separate steganographic carrier stored at a distinct cloud location), and a Reconstruction Barrier (requiring all carriers to be retrieved and reassembled before decryption can even begin). Rooted in defense-in-depth principles, this layered architecture ensures that the failure of any single barrier does not result in total compromise, as an adversary must sequentially overcome all three independent controls to access the protected document.'
                                                },
                                                {
                                                    id: '2.1.8',
                                                    title: 'Usability Considerations in Secure Web Applications',
                                                    content: 'Security and usability are frequently competing objectives — stronger security often reduces ease of use, and overly complex workflows (such as manual cryptographic credential management) paradoxically weaken real-world security by driving risky user behaviors like password reuse. Usability evaluation instruments such as the System Usability Scale (SUS) are therefore essential to secure system design, as user experience directly influences adoption and compliance. Lightweight key management structures help bridge this gap by simplifying key lifecycle processes and reducing computational overhead, making secure systems more accessible without sacrificing protection. In the context of StegoLock\'s multi-stage pipeline, streamlining these operations to remain transparent to the user is critical to both practical adoption and the integrity of the security model itself.'
                                                },
                                                {
                                                    id: '2.1.9',
                                                    title: 'Synthesis of Reviewed Literature',
                                                    content: 'The reviewed literature traces a logical progression where each mechanism addresses a specific gap left by the one before it. Encryption renders data unreadable but fails when keys are compromised; KDFs harden key generation yet still leave data existence fully exposed. Steganography shifts the model by concealing data\'s presence rather than just its content, and when combined with encryption, protects both — but the entire payload still resides in a single, targetable file. Segmentation eliminates this single-file vulnerability by ensuring no individual piece is reconstructible alone, while multi-location storage extends this spatially so no single compromise yields anything actionable. Reconstruction-dependent security unifies all these layers into a mandatory sequential pipeline — decryption is architecturally blocked until every segment is retrieved, reassembled, and authorized. Usability, the transversal concern across all layers, is not peripheral but integral: the entire multi-layer architecture is only effective if users can operate it consistently and correctly.'
                                                }
                                            ].map((section) => {
                                                const isExpanded = expandedSection === section.id;
                                                return (
                                                    <div 
                                                        key={section.id} 
                                                        className="border-b border-slate-800/80 pb-4 transition-all duration-300"
                                                    >
                                                        <button
                                                            onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                                                            className="w-full flex items-center justify-between text-left group py-2 focus:outline-none"
                                                        >
                                                            <span className="text-sm sm:text-lg font-bold text-slate-300 group-hover:text-cyber-accent transition-colors flex items-center gap-2 sm:gap-3">
                                                                {section.title}
                                                            </span>
                                                            <span className={`text-cyber-accent text-xs sm:text-xl font-bold transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyber-accent' : 'text-slate-500 group-hover:text-cyber-accent'}`}>
                                                                {isExpanded ? '−' : '＋'}
                                                            </span>
                                                        </button>
                                                        
                                                        <div 
                                                            className={`grid transition-all duration-300 ease-in-out ${
                                                                isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                                                            }`}
                                                        >
                                                            <div className="overflow-hidden">
                                                                <div className="text-slate-300 text-justify text-xs sm:text-base leading-relaxed pl-4 sm:pl-14 pr-4">
                                                                    {section.content}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {activeModal === 'systems' && (
                                        <div className="space-y-4">
                                            {[
                                                {
                                                    id: '2.2.1',
                                                    title: 'Cloud-Based Document Storage Applications',
                                                    content: (
                                                        <div className="space-y-4">
                                                            <p>
                                                                Google Drive, Dropbox, and Microsoft OneDrive represent the global standards for cloud storage, serving as the primary baseline for secure document storage platforms. Although they align with StegoLock's core objective of facilitating web-based document storage and retrieval, they operate on highly centralized architectures that leave critical security vulnerabilities unresolved.
                                                            </p>
                                                            <div className="space-y-3 pt-2">
                                                                <p>
                                                                    <strong className="text-white">Google Drive:</strong> Google Drive is a web-based file storage and synchronization service developed by Alphabet Inc. that secures documents using server-side AES-256 encryption at rest and TLS in transit. However, because key management is entirely centralized within Google's cloud infrastructure, user access controls are restricted to traditional account credentials and MFA, leaving the stored data completely exposed to server-side administrator compromises.
                                                                </p>
                                                                <p>
                                                                    <strong className="text-white">Dropbox:</strong> Dropbox is a cloud hosting service that secures documents through server-managed AES-256 (at rest) and SSL/TLS (in transit), featuring OAuth integration capabilities. A documented 2022 security incident demonstrated that phishing attacks against employees can bypass MFA entirely, allowing attackers to directly access internal repositories and highlighting the severe limitation of relying solely on authentication-layer controls.
                                                                </p>
                                                                <p>
                                                                    <strong className="text-white">Microsoft OneDrive:</strong> Microsoft OneDrive is a cloud storage service deeply integrated with Microsoft 365 that employs centralized AES-256 and TLS encryption. Its security model depends entirely on credential verification and OAuth authorizations; a major design vulnerability exposed in 2025 allowed malicious third-party integrations to exploit OAuth scopes to obtain broader document access permissions than explicitly consented to by users.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                                {
                                                    id: '2.2.2',
                                                    title: 'Crypto-Steganographic Security Systems',
                                                    content: (
                                                        <div className="space-y-4">
                                                            <p>
                                                                These frameworks combine encryption and steganography as complementary security mechanisms. Their relevance to StegoLock lies in their shared utilization of multi-layered cryptographic and steganographic controls to protect stored data, representing the key conceptual predecessors to StegoLock's defense-in-depth architecture.
                                                            </p>
                                                            <div className="space-y-3 pt-2">
                                                                <p>
                                                                    <strong className="text-white">4-Step Crypto-Stego Model:</strong> This model sequentially applies RSA encryption, AES, identity-based encryption, and LSB steganography to embed payloads within image carriers. It establishes that layering cryptographic and steganographic controls offers significantly more robust data protection against unauthorized cloud storage access than traditional, single-layer encryption.
                                                                </p>
                                                                <p>
                                                                    <strong className="text-white">La Multiapp Cloud Crypto-System:</strong> This prototype conceals encrypted payloads alongside their corresponding decryption keys inside stego-images. While implementing a partial form of reconstruction dependency by requiring key extraction from the carrier prior to decryption, it functions as a standalone command-line implementation lacking a dedicated web application interface.
                                                                </p>
                                                                <p>
                                                                    <strong className="text-white">CryptSteg:</strong> An IEEE-published framework integrating Ciphertext-Policy Attribute-Based Encryption (CP-ABE) with multi-cover steganography. It distributes encrypted payloads across multiple images and enforces reconstruction policies; however, CP-ABE introduces severe computational overhead, and the system lacks a lightweight web interface or formal usability evaluation.
                                                                </p>
                                                                <p>
                                                                    <strong className="text-white">AES Steganography + Blockchain:</strong> This architecture combines AES with LSB steganography and leverages blockchain to deliver tamper detection and immutable audit trails for cloud-stored carrier files. While adding robust verifiability, it does not employ file segmentation or reconstruction-dependent decryption, and the blockchain introduces heavy infrastructure overhead.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                                {
                                                    id: '2.2.3',
                                                    title: 'Web-Based Steganographic and Secure Document Applications',
                                                    content: (
                                                        <div className="space-y-4">
                                                            <p>
                                                                These frameworks demonstrate the practical deployment of secure data storage in web-based environments or specifically targeting document formats. Their findings establish that steganographic embedding can be reliably executed inside standard web applications and applied directly to common document-type files.
                                                            </p>
                                                            <div className="space-y-3 pt-2">
                                                                <p>
                                                                    <strong className="text-white">Steganography in Web Applications:</strong> This system implements an SVM-based pixel priority LSB embedding technique within a browser-accessible web interface, achieving a PSNR of 87 dB. While validating that steganographic processing can be successfully deployed in web applications with high visual imperceptibility, it lacks encryption integration, file segmentation, and multi-location cloud storage.
                                                                </p>
                                                                <p>
                                                                    <strong className="text-white">PDF Crypto-Steganography System:</strong> This Springer-published framework embeds AES-256 and RSA-encrypted data inside PDF files without visually altering their structure. It demonstrates the technical feasibility of applying crypto-steganography directly to document-type assets—the primary file type StegoLock targets—but operates as a desktop application, does not utilize cloud distribution, and fails to implement reconstruction dependency.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                                {
                                                    id: '2.2.4',
                                                    title: 'Existing Systems Analysis',
                                                    content: (
                                                        <div className="space-y-4 text-justify">
                                                            <p>
                                                                The existing systems reviewed in this section present varying objectives and capabilities, each addressing distinct security and operational requirements. To facilitate a structured comparison, these platforms are designated as Existing Systems (ES) 1 through 9. Their capabilities are evaluated across two primary domains:
                                                            </p>
                                                            <ul className="list-disc pl-6 space-y-1 text-slate-400 text-base">
                                                                <li><strong className="text-white">Domain 1 (Operational and Deployment Characteristics):</strong> Evaluates primary functional objectives, user access controls, and browser-based end-user deployment models.</li>
                                                                <li><strong className="text-white">Domain 2 (Cryptographic and Security Characteristics):</strong> Evaluates specific cryptographic standards, steganographic concealment methods, architectural strengths, and critical structural vulnerabilities.</li>
                                                            </ul>

                                                            {/* Table 1: Operational and Deployment Characteristics */}
                                                            <div className="my-2">
                                                                <span className="text-cyber-accent font-bold font-mono text-sm block mb-2 uppercase">Table 1. Operational and Deployment Characteristics</span>
                                                                <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/20">
                                                                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                                                                        <thead>
                                                                            <tr className="border-b border-slate-800 bg-slate-950/60 font-mono text-cyber-accent text-xs">
                                                                                <th className="p-3 font-bold">SYSTEM</th>
                                                                                <th className="p-3 font-bold">CAT1 (Primary Function)</th>
                                                                                <th className="p-3 font-bold">CAT2 (Access Control)</th>
                                                                                <th className="p-3 font-bold text-center">CAT3 (Web)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {[
                                                                                { sys: 'ES1', cat1: 'Cloud document storage and synchronization', cat2: 'Account credentials, optional MFA', cat3: 'Yes' },
                                                                                { sys: 'ES2', cat1: 'Cloud file hosting and sharing', cat2: 'Account credentials, MFA, OAuth', cat3: 'Yes' },
                                                                                { sys: 'ES3', cat1: 'Integrated cloud storage (Microsoft 365)', cat2: 'Account credentials, role-based permissions', cat3: 'Yes' },
                                                                                { sys: 'ES4', cat1: 'Multi-layer secure data storage', cat2: 'Stego-image acts as an access artifact', cat3: 'No' },
                                                                                { sys: 'ES5', cat1: 'Concealing encrypted data and keys', cat2: 'Key retrieval from stego-image', cat3: 'No' },
                                                                                { sys: 'ES6', cat1: 'Distributed secure storage', cat2: 'Embedded access policy', cat3: 'No' },
                                                                                { sys: 'ES7', cat1: 'Tamper-evident secure cloud storage', cat2: 'Blockchain verifiability', cat3: 'No' },
                                                                                { sys: 'ES8', cat1: 'Web-based steganographic embedding', cat2: 'Standard web access', cat3: 'Yes' },
                                                                                { sys: 'ES9', cat1: 'Secure document embedding', cat2: 'Cryptographic keys', cat3: 'No' }
                                                                            ].map((r, i) => (
                                                                                <tr key={i} className="border-b border-slate-900/60 hover:bg-slate-800/20 transition-colors">
                                                                                    <td className="p-3 font-mono text-cyber-accent font-bold">{r.sys}</td>
                                                                                    <td className="p-3 text-slate-300">{r.cat1}</td>
                                                                                    <td className="p-3 text-slate-300">{r.cat2}</td>
                                                                                    <td className={`p-3 text-center font-bold ${r.cat3 === 'Yes' ? 'text-emerald-400' : 'text-slate-500'}`}>{r.cat3}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>

                                                            {/* Table 2: Cryptographic and Security Characteristics */}
                                                            <div className="my-2">
                                                                <span className="text-cyber-accent font-bold font-mono text-sm block mb-2 uppercase">Table 2. Cryptographic and Security Characteristics</span>
                                                                <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/20">
                                                                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                                                                        <thead>
                                                                            <tr className="border-b border-slate-800 bg-slate-950/60 font-mono text-cyber-accent text-xs">
                                                                                <th className="p-3 font-bold">SYSTEM</th>
                                                                                <th className="p-3 font-bold">CAT4 (Cryptography)</th>
                                                                                <th className="p-3 font-bold">CAT5 (Steganography)</th>
                                                                                <th className="p-3 font-bold">CAT6 (Strengths)</th>
                                                                                <th className="p-3 font-bold">CAT7 (Weaknesses)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {[
                                                                                { sys: 'ES1', cat4: 'AES-256, TLS', cat5: 'None', cat6: 'Reliable infrastructure, multi-location storage', cat7: 'Vulnerable to credential theft and authentication bypass' },
                                                                                { sys: 'ES2', cat4: 'AES-256, SSL/TLS', cat5: 'None', cat6: 'Strong encryption, robust third-party integrations', cat7: 'Susceptible to phishing bypassing MFA' },
                                                                                { sys: 'ES3', cat4: 'AES-256, TLS', cat5: 'None', cat6: 'Ecosystem integration, role-based permissions', cat7: 'OAuth scope vulnerabilities exposing broad data access' },
                                                                                { sys: 'ES4', cat4: 'RSA, AES, Identity-based', cat5: 'LSB in image carriers', cat6: 'Layered cryptographic and steganographic protection', cat7: 'Single stego-carrier vulnerability, computational overhead' },
                                                                                { sys: 'ES5', cat4: 'Unspecified', cat5: 'Image carriers', cat6: 'Mandatory key retrieval from carrier', cat7: 'Lack of web interface, single carrier vulnerability' },
                                                                                { sys: 'ES6', cat4: 'CP-ABE', cat5: 'Multi-cover image steganography', cat6: 'Multi-location distribution, policy-enforced reconstruction', cat7: 'High computational overhead, lacks lightweight deployment' },
                                                                                { sys: 'ES7', cat4: 'AES', cat5: 'LSB in images', cat6: 'Immutable audit trails and tamper detection', cat7: 'Infrastructure overhead, lacks file segmentation' },
                                                                                { sys: 'ES8', cat4: 'None', cat5: 'SVM-based pixel priority LSB', cat6: 'High imperceptibility, accessible via browser', cat7: 'Lacks encryption, segmentation, and multi-location storage' },
                                                                                { sys: 'ES9', cat4: 'AES-256, RSA', cat5: 'PDF document embedding', cat6: 'Direct application to document-format files', cat7: 'Desktop only, lacks cloud distribution and reconstruction' }
                                                                            ].map((r, i) => (
                                                                                <tr key={i} className="border-b border-slate-900/60 hover:bg-slate-800/20 transition-colors">
                                                                                    <td className="p-3 font-mono text-cyber-accent font-bold">{r.sys}</td>
                                                                                    <td className="p-3 text-slate-300">{r.cat4}</td>
                                                                                    <td className="p-3 text-slate-300">{r.cat5}</td>
                                                                                    <td className="p-3 text-emerald-400/90 text-xs leading-relaxed">{r.cat6}</td>
                                                                                    <td className="p-3 text-rose-400/90 text-xs leading-relaxed">{r.cat7}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>

                                                            <div className="pt-2 border-t border-slate-800/80">
                                                                <p className="font-bold text-white mb-2">Systems Analysis Synthesis:</p>
                                                                <p className="text-base text-slate-300 leading-relaxed">
                                                                    A comparative evaluation reveals a clear trade-off: while individual platforms excel at specific goals—such as the usability of commercial cloud services (ES1–ES3), the layered concealment of cryptographic models (ES4–ES7), or the web-based deployment innovations of specialized stego applications (ES8–ES9)—none offer a unified solution. Commercial storage suffers from perimeter-only dependency where credential compromise fully exposes stored data, while secure crypto-steganographic prototypes are hindered by single-carrier vulnerabilities, heavy computational overhead (e.g., CP-ABE), or desktop-restricted deployment models. This analysis highlights a clear architectural void: the immediate need for a system that seamlessly integrates the browser-based usability and scalability of cloud storage with the robust, segmented, reconstruction-dependent protection of layered crypto-steganography.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            ].map((section) => {
                                                const isExpanded = expandedSection === section.id;
                                                return (
                                                    <div 
                                                        key={section.id} 
                                                        className="border-b border-slate-800/80 pb-4 transition-all duration-300"
                                                    >
                                                        <button
                                                            onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                                                            className="w-full flex items-center justify-between text-left group py-2 focus:outline-none"
                                                        >
                                                            <span className="text-sm sm:text-lg font-bold text-slate-300 group-hover:text-cyber-accent transition-colors flex items-center gap-2 sm:gap-3">
                                                                {section.title}
                                                            </span>
                                                            <span className={`text-cyber-accent text-xs sm:text-xl font-bold transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyber-accent' : 'text-slate-500 group-hover:text-cyber-accent'}`}>
                                                                {isExpanded ? '−' : '＋'}
                                                            </span>
                                                        </button>
                                                        
                                                        <div 
                                                            className={`grid transition-all duration-300 ease-in-out ${
                                                                isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                                                            }`}
                                                        >
                                                            <div className="overflow-hidden">
                                                                <div className="text-slate-300 text-justify text-xs sm:text-base leading-relaxed pl-4 sm:pl-6 pr-4">
                                                                    {section.content}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    ];
}
