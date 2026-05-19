import React, { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { 
    Shield, Lock, Layers, Target,
    Trophy, Users, Cpu, Database, 
    Compass, FileText, Volume2, Image,
    Cloud, FileDigit
} from 'lucide-react';

export function usePresentationSlides({ safeStats, demoStep, demoMode, demoActive, activeSteps, currentSlide }) {
    const [activeModal, setActiveModal] = React.useState(null);
    const [expandedSection, setExpandedSection] = React.useState(null);

    React.useEffect(() => {
        setActiveModal(null);
        setExpandedSection(null);
    }, [currentSlide]);

    React.useEffect(() => {
        setExpandedSection(null);
    }, [activeModal]);

    return useMemo(() => [
        // Slide 1: Keep it. all goods
        {
            title: "StegoLock",
            subtitle: "Final Defense Presentation",
            content: (
                <div className="flex flex-col items-center justify-center text-center animate-fade-in py-8 h-full">
                    <div className="group flex flex-col items-center cursor-default">
                        <div className="relative mb-8">
                            <div className="relative inline-flex items-center justify-center p-12 sm:p-14 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-[3.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_70px_rgba(34,211,238,0.55)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                                <Shield className="size-32 sm:size-36 text-white drop-shadow-2xl relative z-10" />
                                <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div className="absolute inset-0 bg-cyber-accent/20 blur-[100px] -z-10 rounded-full animate-pulse"></div>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-8xl lg:text-9xl font-[900] text-slate-900 dark:text-white tracking-tighter leading-none transform origin-top group-hover:scale-105 inline-block transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyber-accent group-hover:to-indigo-500">
                                Stego<span className="text-cyber-accent group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyber-accent group-hover:to-indigo-500 transition-all duration-300">Lock</span>
                            </h1>
                            <div className="h-2 w-36 bg-cyber-accent mx-auto rounded-full shadow-glow-cyan animate-pulse" />
                            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-black max-w-5xl mx-auto leading-relaxed uppercase tracking-[0.12em] px-4">
                                A CLOUD-BASED WEB APPLICATION BUILT ON A <span className="text-cyber-accent font-black drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]">RECONSTRUCTION-DEPENDENT SECURITY ARCHITECTURE</span> FOR DIGITAL DOCUMENT STORAGE
                            </p>
                            
                            <div className="pt-8 max-w-2xl mx-auto text-center border-t border-slate-200/50 dark:border-white/5 mt-8">
                                <span className="text-sm sm:text-base font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.25em] block">
                                    PRESENTED BY <span className="text-cyber-accent font-black drop-shadow-[0_0_8px_rgba(34,211,238,0.25)]">THE CRIP</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 2: Actions Taken
        {
            title: "Actions Taken",
            subtitle: "Actions Taken Report",
            content: (
                <div className="flex flex-col items-center justify-center text-center space-y-8 h-full py-4">
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-8 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-[2.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                            <Shield className="size-20 text-white drop-shadow-2xl relative z-10" />
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute inset-0 bg-cyber-accent/20 blur-[80px] -z-10 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">ACTIONS TAKEN</h2>
                </div>
            )
        },
        // Slide 3: Chapter 1
        {
            title: "Chapter 1",
            subtitle: "Introduction",
            content: (
                <div className="h-full flex flex-col justify-center py-2">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-center lg:text-left group cursor-default">
                            <div className="size-14 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-7 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Chapter 1</h2>
                            </div>
                        </div>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-sm mt-3 text-center lg:text-left lg:pl-[4.5rem]">Introduction</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center gap-5 min-h-0 py-4">
                        {/* Row 1: 2 Cards */}
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 w-full">
                            {/* Card 1: Background of the Study */}
                            <div 
                                onClick={() => setActiveModal('bg')}
                                className="w-full lg:w-[22rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Background of the <br />Study
                                </h3>
                            </div>

                            {/* Card 2: Objectives of the Study */}
                            <div 
                                onClick={() => setActiveModal('objectives')}
                                className="w-full lg:w-[22rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Objectives of the <br />Study
                                </h3>
                            </div>
                        </div>

                        {/* Row 2: 3 Cards */}
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 w-full">
                            {/* Card 3: Significance of the Study */}
                            <div 
                                onClick={() => setActiveModal('significance')}
                                className="w-full lg:w-[15rem] h-32 glass-panel p-5 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-md font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Significance of the <br />Study
                                </h3>
                            </div>

                            {/* Card 4: Scope and Limitations */}
                            <div 
                                onClick={() => setActiveModal('scope')}
                                className="w-full lg:w-[15rem] h-32 glass-panel p-5 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-md font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Scope and <br />Limitations
                                </h3>
                            </div>

                            {/* Card 5: Definition of Terms */}
                            <div 
                                onClick={() => setActiveModal('terms')}
                                className="w-full lg:w-[15rem] h-32 glass-panel p-5 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-md font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Definition of <br />Terms
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Modal Overlay for Slide 3 Cards */}
                    {activeModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent" onClick={() => setActiveModal(null)}>
                            <div 
                                className="bg-slate-900 border border-cyber-accent/50 w-full max-w-4xl p-8 sm:p-12 rounded-[2rem] relative shadow-2xl shadow-cyan-500/20 animate-fade-in flex flex-col max-h-[65vh]"
                                onClick={e => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setActiveModal(null)}
                                    className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-xl z-10"
                                >
                                    ✕
                                </button>
                                <h2 className="text-4xl font-black text-white mb-6 shrink-0">
                                    {activeModal === 'bg' && 'Background of the Study'}
                                    {activeModal === 'objectives' && 'Objectives of the Study'}
                                    {activeModal === 'significance' && 'Significance of the Study'}
                                    {activeModal === 'scope' && 'Scope and Limitations'}
                                    {activeModal === 'terms' && 'Definition of Terms'}
                                </h2>
                                <div className="text-slate-300 space-y-4 text-lg leading-relaxed overflow-y-auto min-h-0 pr-4">
                                    {activeModal === 'bg' && (
                                        <>
                                            <p className="text-justify indent-8">The transition from physical to digital document storage has significantly improved efficiency but introduced pervasive security risks, as evidenced by frequent data breaches across major cloud platforms. While organizations traditionally rely on encryption to protect data, it remains vulnerable to offline decryption attacks once files are exfiltrated. To strengthen security, integrating cryptography with steganography conceals the very existence of encrypted data, though it often introduces challenges regarding payload capacity and key management. To address these limitations, StegoLock proposes a reconstruction-dependent security system that mitigates these risks by distributing encrypted data fragments across multiple cover files, ensuring that unauthorized decryption is structurally impossible without the complete retrieval and reassembly of all scattered fragments.</p>
                                        </>
                                    )}
                                    {activeModal === 'objectives' && (
                                        <>
                                            <p><strong className="text-white block mb-2 text-xl">General Objective</strong> To develop StegoLock, a secure digital document storage web application that implements a reconstruction-dependent security model. By integrating encryption, steganography, and distributed cloud storage, it ensures that decryption relies on both key possession and the successful reconstruction of scattered data fragments, reducing vulnerabilities associated with traditional key exposure.</p>
                                            <ul className="space-y-4 mt-6 text-slate-400">
                                                <li><strong className="text-white block mb-1">Specific Objective 1</strong> Implement AES-based encryption with a KDF-based key management process to ensure the confidentiality and integrity of a document file.</li>
                                                <li><strong className="text-white block mb-1">Specific Objective 2</strong> Design and implement a segmentation process that splits the encrypted document into multiple segments and hides them through a steganographic embedding process into cover files, which are scattered across the application's cloud storage to enhance security.</li>
                                                <li><strong className="text-white block mb-1">Specific Objective 3</strong> Develop a web-based application that implements and integrates the AES-based encryption, segmentation, access control and authentication, and sharing mechanisms to a document storage platform.</li>
                                                <li><strong className="text-white block mb-1">Specific Objective 4</strong> Evaluate the application based on ISO/IEC 25010 quality characteristics to assess the effectiveness in terms of functional suitability, security, reliability, and measure usability and performance efficiency.</li>
                                            </ul>
                                        </>
                                    )}
                                    {activeModal === 'significance' && (
                                        <>
                                            <p className="mb-4">The primary beneficiaries of the project are the following:</p>
                                            <ul className="space-y-4 text-slate-400">
                                                <li><strong className="text-white block mb-1">Organizations Handling Sensitive Data</strong> Mitigates data breaches and unauthorized access by encrypting, fragmenting, and concealing confidential records across multiple cover files via a reconstruction-dependent security model.</li>
                                                <li><strong className="text-white block mb-1">End Users and Professionals</strong> Provides a secure, user-friendly platform for storing and sharing files. Strict access controls and the requirement for full data reconstruction ensure that intercepted or partial data remains useless to attackers.</li>
                                                <li><strong className="text-white block mb-1">Future Researchers</strong> Serves as a foundational reference for integrating cryptography with steganography. It offers practical insights into designing hybrid security systems that balance robust protection with lightweight key management and usability.</li>
                                            </ul>
                                        </>
                                    )}
                                    {activeModal === 'scope' && (
                                        <>
                                            <ul className="space-y-4 text-slate-400">
                                                <li><strong className="text-white block mb-1">Platform & Accessibility</strong> Cloud-based web application designed for modern browsers; legacy browsers may experience reduced performance or visual inconsistencies.</li>
                                                <li><strong className="text-white block mb-1">Security Workflow</strong> Employs AES-GCM encryption, KDF key management, and steganographic LSB embedding. Decryption is permitted only upon successful authorization and complete fragment reconstruction.</li>
                                                <li><strong className="text-white block mb-1">Supported Formats</strong> Accepts .pdf, .doc/.docx, and .txt documents (up to 5MB). Cover files encompass image (.png), text (.txt), and audio (.wav) formats.</li>
                                                <li><strong className="text-white block mb-1">Storage Quota</strong> Users receive a 225MB initial quota. Storage footprint is calculated based on the resulting stego-files in the cloud, which significantly exceeds the source document size due to embedding overhead.</li>
                                                <li><strong className="text-white block mb-1">Performance Constraints</strong> Optimized for limited concurrent processing; handling larger files or simultaneous operations may extend processing times.</li>
                                                <li><strong className="text-white block mb-1">Access Control</strong> Features hierarchical folder management and restricts shared document access strictly to authenticated, designated collaborators.</li>
                                            </ul>
                                        </>
                                    )}
                                    {activeModal === 'terms' && (
                                        <>
                                            <ul className="space-y-4 text-slate-400">
                                                <li><strong className="text-white block mb-1">Digital Document Storage</strong> A component of a document management system responsible for holding and organizing digital files, ensuring that documents are maintained and accessible to authorized users.</li>
                                                <li><strong className="text-white block mb-1">Reconstruction-Dependent Security Architecture</strong> Refers to a security framework where decryption is structurally impossible unless all distributed encrypted data fragments are successfully retrieved and reassembled.</li>
                                                <li><strong className="text-white block mb-1">Cryptography-Steganography System</strong> Also known as a crypto-stego system, is a hybrid security approach that combines the principles of cryptography and steganography, emphasizing a protection mechanism that encrypts sensitive content and conceals its existence within ordinary-looking cover files.</li>
                                                <li><strong className="text-white block mb-1">AES-GCM (Advanced Encryption Standard in Galois/Counter Mode)</strong> An authenticated encryption method employed by StegoLock to secure documents, providing confidentiality, data integrity, and protection against tampering.</li>
                                                <li><strong className="text-white block mb-1">Key Derivation Function (KDF)</strong> A cryptographic algorithm used in StegoLock to generate strong encryption keys from user-provided secrets, supporting lightweight and secure key management.</li>
                                                <li><strong className="text-white block mb-1">Lightweight Key Management</strong> The system within StegoLock that handles the creation, distribution, and storage of encryption keys efficiently, minimizing complexity while maintaining strong security for users.</li>
                                                <li><strong className="text-white block mb-1">Steganography</strong> The method used to conceal encrypted document data within cover files, ensuring that the existence of sensitive information is hidden from unauthorized parties.</li>
                                                <li><strong className="text-white block mb-1">Steganographic Embedding</strong> The operational process of integrating encrypted document fragments into cover files (images, text, or audio), such that the hidden data remains protected from detection.</li>
                                                <li><strong className="text-white block mb-1">Cover File</strong> The file used to hold embedded encrypted document fragments; it appears ordinary to external observers but contains a hidden payload accessible only by authorized users.</li>
                                                <li><strong className="text-white block mb-1">Segmentation</strong> The systematic process in StegoLock that divides an encrypted document into smaller pieces or fragments prior to steganographic embedding, ensuring that sensitive information is distributed across multiple cover files.</li>
                                                <li><strong className="text-white block mb-1">Fragments</strong> The individual pieces of encrypted data generated during the segmentation process; each fragment is stored within a separate cover file and is essential for the reconstruction of the original document.</li>
                                                <li><strong className="text-white block mb-1">Stego File</strong> The final digital artifact stored in the cloud upon completion of the locking process. It serves as the structural anchor for the unlocking workflow, requiring both its retrieval and valid user authentication credentials to initiate the extraction of the hidden encrypted fragments stored within.</li>
                                                <li><strong className="text-white block mb-1">Locking</strong> The integrated multi-stage security pipeline in StegoLock encompassing document compression, AES-GCM encryption, segmentation, steganographic embedding, and secure cloud storage.</li>
                                                <li><strong className="text-white block mb-1">Unlocking</strong> The retrieval and reconstruction process that fetches stego files from the cloud, extracts hidden fragments, reassembles the encrypted payload, and performs authorized decryption and decompression to restore the document to its original state.</li>
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
        },
        // Slide 4: Chapter 2
        {
            title: "Chapter 2",
            subtitle: "Review of Literature",
            content: (
                <div className="h-full flex flex-col justify-center py-2">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-center lg:text-left group cursor-default">
                            <div className="size-14 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-7 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Chapter 2</h2>
                            </div>
                        </div>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-sm mt-3 text-center lg:text-left lg:pl-[4.5rem]">Review of Literature</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center gap-8 min-h-0 py-4">
                        {/* Card 1: Related Literature */}
                        <div 
                            onClick={() => setActiveModal('literature')}
                            className="w-full lg:w-[40rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                        >
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300 uppercase">
                                Related Literature
                            </h3>
                        </div>

                        {/* Card 2: Related Systems */}
                        <div 
                            onClick={() => setActiveModal('systems')}
                            className="w-full lg:w-[40rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                        >
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300 uppercase">
                                Related Systems
                            </h3>
                        </div>
                    </div>

                    {/* Modal Overlay for Slide 4 Cards */}
                    {activeModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent" onClick={() => setActiveModal(null)}>
                            <div 
                                className="bg-slate-900 border border-cyber-accent/50 w-full max-w-4xl p-8 sm:p-12 rounded-[2rem] relative shadow-2xl shadow-cyan-500/20 animate-fade-in flex flex-col max-h-[85vh]"
                                onClick={e => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setActiveModal(null)}
                                    className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-xl z-10"
                                >
                                    ✕
                                </button>
                                <h2 className="text-4xl font-black text-white mb-6 shrink-0">
                                    {activeModal === 'literature' && 'Related Literature'}
                                    {activeModal === 'systems' && 'Related Systems'}
                                </h2>
                                <div className="text-slate-300 space-y-4 text-lg leading-relaxed overflow-y-auto min-h-0 pr-4">
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
                                                            <span className="text-lg font-bold text-slate-300 group-hover:text-cyber-accent transition-colors flex items-center gap-3">
                                                                {section.title}
                                                            </span>
                                                            <span className={`text-cyber-accent text-xl font-bold transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyber-accent' : 'text-slate-500 group-hover:text-cyber-accent'}`}>
                                                                {isExpanded ? '−' : '＋'}
                                                            </span>
                                                        </button>
                                                        
                                                        <div 
                                                            className={`grid transition-all duration-300 ease-in-out ${
                                                                isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                                                            }`}
                                                        >
                                                            <div className="overflow-hidden">
                                                                <div className="text-slate-300 text-justify text-base leading-relaxed pl-14 pr-4">
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
                                                            <span className="text-lg font-bold text-slate-300 group-hover:text-cyber-accent transition-colors flex items-center gap-3">
                                                                {section.title}
                                                            </span>
                                                            <span className={`text-cyber-accent text-xl font-bold transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyber-accent' : 'text-slate-500 group-hover:text-cyber-accent'}`}>
                                                                {isExpanded ? '−' : '＋'}
                                                            </span>
                                                        </button>
                                                        
                                                        <div 
                                                            className={`grid transition-all duration-300 ease-in-out ${
                                                                isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                                                            }`}
                                                        >
                                                            <div className="overflow-hidden">
                                                                <div className="text-slate-300 text-justify text-base leading-relaxed pl-6 pr-4">
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
        },
        // Slide 5: Chapter 3
        {
            title: "Chapter 3",
            subtitle: "Framework and Methodology",
            content: (
                <div className="h-full flex flex-col justify-center py-2">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-center lg:text-left group cursor-default">
                            <div className="size-14 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-7 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Chapter 3</h2>
                            </div>
                        </div>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-sm mt-3 text-center lg:text-left lg:pl-[4.5rem]">Framework and Methodology</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center gap-5 min-h-0 py-4">
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 w-full">
                            {/* Card 1: Conceptual Framework */}
                            <div className="w-full lg:w-[20rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Conceptual <br />Framework
                                </h3>
                            </div>

                            {/* Card 2: Methodology */}
                            <div className="w-full lg:w-[20rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Methodology
                                </h3>
                            </div>

                            {/* Card 3: Ethical Consideration */}
                            <div className="w-full lg:w-[20rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Ethical <br />Consideration
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 6: Chapter 4
        {
            title: "Chapter 4",
            subtitle: "Results and Discussions",
            content: (
                <div className="flex flex-col items-center justify-center text-center space-y-8 h-full py-4">
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-8 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-[2.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                            <Shield className="size-20 text-white drop-shadow-2xl relative z-10" />
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute inset-0 bg-cyber-accent/20 blur-[80px] -z-10 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">RESULTS AND <br/> DISCUSSION</h2>
                </div>
            )
        },
        // Slide 7: Findings of the Study (Objective 1)
        {
            title: "Chapter 4",
            subtitle: "Objective 1: Cryptographic Pipeline (PBKDF2 & AES-256-GCM)",
            content: (
                <div className="h-full flex flex-col justify-center py-2">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-center lg:text-left group cursor-default">
                            <div className="size-14 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-7 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Chapter 4</h2>
                            </div>
                        </div>
                        <div className="mt-3 text-center lg:text-left lg:pl-[4.5rem]">
                            <p className="text-cyber-accent font-black uppercase tracking-widest text-sm mb-1">Results and Discussion</p>
                            <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm md:text-base tracking-wide leading-relaxed">Objective 1: Implement AES-based encryption with a KDF-based key management process to ensure the confidentiality and integrity of a document file.</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center gap-6 min-h-0 py-6">
                        {/* Card 1: Key Derivation Functions (Split Hover Animation) */}
                        <div className="relative w-full max-w-2xl group/kdf cursor-pointer h-[116px] sm:h-[132px] flex gap-4 sm:gap-6 justify-center">
                            
                            {/* Left Split Card: PBKDF2 */}
                            <div className="flex-1 h-full glass-panel flex items-center justify-center rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-x-16 opacity-0 group-hover/kdf:translate-x-0 group-hover/kdf:opacity-100 shadow-lg shadow-cyan-500/5 group/pbkdf2">
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight group-hover/pbkdf2:text-cyber-accent transition-colors duration-300">
                                    PBKDF2
                                </h3>
                            </div>

                            {/* Right Split Card: HKDF */}
                            <div className="flex-1 h-full glass-panel flex items-center justify-center rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform -translate-x-16 opacity-0 group-hover/kdf:translate-x-0 group-hover/kdf:opacity-100 shadow-lg shadow-cyan-500/5 group/hkdf">
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight group-hover/hkdf:text-cyber-accent transition-colors duration-300">
                                    HKDF
                                </h3>
                            </div>

                            {/* Front Cover Door: Key Derivation Functions */}
                            <div className="absolute inset-0 mx-auto w-full max-w-xl z-10 glass-panel p-10 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-[#f8fafc]/90 dark:bg-slate-900/80 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/kdf:opacity-0 group-hover/kdf:scale-[0.85] group-hover/kdf:-translate-y-4 shadow-lg shadow-cyan-500/5">
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-normal">
                                    Key Derivation Functions
                                </h3>
                            </div>

                        </div>

                        {/* Card 2: AES-256-GCM */}
                        <div className="w-full max-w-xl glass-panel p-10 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer flex justify-center items-center h-[116px] sm:h-[132px]">
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-normal group-hover/card:text-cyber-accent transition-colors duration-300 flex items-center justify-center overflow-hidden py-1">
                                <span>AES-</span>
                                
                                {/* 256- (Slips in from below) */}
                                <span className="inline-flex overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-w-0 opacity-0 group-hover/card:max-w-[4.5rem] sm:group-hover/card:max-w-[5.5rem] group-hover/card:opacity-100">
                                    <span className="inline-block transform translate-y-full group-hover/card:translate-y-0 transition-transform duration-500">
                                        256-
                                    </span>
                                </span>

                                <span>GCM</span>

                                {/* Encryption (Slips out to top) */}
                                <span className="inline-flex overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-w-[10rem] sm:max-w-[12rem] opacity-100 group-hover/card:max-w-0 group-hover/card:opacity-0">
                                    <span className="inline-block whitespace-nowrap pl-2.5 transform translate-y-0 group-hover/card:-translate-y-full transition-transform duration-500">
                                        Encryption
                                    </span>
                                </span>
                            </h3>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 8: Findings of the Study (Objective 2)
        {
            title: "Chapter 4",
            subtitle: "Objective 2: Cover Generation, Segmentation & Cloud Scatter",
            content: (
                <div className="h-full flex flex-col justify-center py-2">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-center lg:text-left group cursor-default">
                            <div className="size-14 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-7 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Chapter 4</h2>
                            </div>
                        </div>
                        <div className="mt-3 text-center lg:text-left lg:pl-[4.5rem]">
                            <p className="text-cyber-accent font-black uppercase tracking-widest text-sm mb-1">Results and Discussion</p>
                            <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm md:text-base tracking-wide leading-relaxed">Objective 2: Design and implement a segmentation process that splits the encrypted document into multiple segments and hides them through a steganographic embedding process into cover files, which are scattered across the application’s cloud storage to enhance security.</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full flex justify-center items-center py-6 min-h-0 relative">
                        {/* Animated Pipeline Canvas */}
                        <div className="w-full max-w-5xl h-[280px] sm:h-[340px] glass-panel rounded-[2.5rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 shadow-xl shadow-cyan-500/5 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between px-8 sm:px-24">
                            
                            {/* Central Connection Line */}
                            <div className="hidden sm:block absolute top-1/2 left-16 right-16 h-1 bg-slate-200/50 dark:bg-slate-700/50 -translate-y-1/2 z-0">
                                {/* Flowing Energy */}
                                <div className="h-full bg-gradient-to-r from-transparent via-cyber-accent to-transparent w-[30%] animate-data-flow" />
                            </div>

                            {/* Node 1: Payload Selection (Left) */}
                            <div className="relative z-10 flex flex-col items-center">
                                {/* The Central Payload Container */}
                                <div className="relative">
                                    {/* Orbiting Cover Files */}
                                    <div className="absolute top-1/2 left-1/2 -mt-5 -ml-5 size-10 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg z-20 animate-orbit-1">
                                        <Image className="size-5 text-indigo-400" />
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -mt-5 -ml-5 size-10 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg z-20 animate-orbit-2">
                                        <Volume2 className="size-5 text-purple-400" />
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -mt-5 -ml-5 size-10 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg z-20 animate-orbit-3">
                                        <FileText className="size-5 text-emerald-400" />
                                    </div>
                                    
                                    {/* Encrypted Document Payload */}
                                    <div className="size-20 sm:size-24 rounded-2xl bg-[#f8fafc] dark:bg-slate-900 border-2 border-cyber-accent/50 shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center relative animate-pulse-slow z-10">
                                        <FileDigit className="size-10 sm:size-12 text-cyber-accent" />
                                        <div className="absolute -bottom-2 -right-2 size-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg">
                                            <Lock className="size-4 text-white" />
                                        </div>
                                    </div>
                                </div>
                                <span className="absolute -bottom-10 font-black text-[10px] sm:text-xs uppercase tracking-widest text-slate-700 dark:text-slate-300 text-center whitespace-nowrap">Cover Selection</span>
                            </div>

                            {/* Node 2: Segmentation Engine (Center) */}
                            <div className="relative z-10 flex flex-col items-center h-full justify-center">
                                {/* The Central Engine Node */}
                                <div className="size-28 sm:size-36 flex items-center justify-center relative z-20">
                                    {/* Backdrop for the Engine */}
                                    <div className="absolute inset-0 rounded-full bg-white/5 dark:bg-cyber-surface/5 backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.15)] z-0" />
                                    
                                    {/* Orbital Data Ring (Replaces dashed circle) */}
                                    <div className="absolute inset-0 animate-spin-slow-6s z-10">
                                        {/* Cardinal points */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2.5 sm:size-3 bg-cyber-accent shadow-[0_0_12px_#22d3ee] rounded-sm" />
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 size-2.5 sm:size-3 bg-indigo-400 shadow-[0_0_12px_#818cf8] rounded-sm" />
                                        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2.5 sm:size-3 bg-purple-400 shadow-[0_0_12px_#c084fc] rounded-sm" />
                                        <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 size-2.5 sm:size-3 bg-cyber-accent shadow-[0_0_12px_#22d3ee] rounded-sm" />
                                        
                                        {/* Diagonal points */}
                                        <div className="absolute top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2 size-1.5 sm:size-2 bg-indigo-300 rounded-sm" />
                                        <div className="absolute top-[14.6%] right-[14.6%] translate-x-1/2 -translate-y-1/2 size-1.5 sm:size-2 bg-purple-300 rounded-sm" />
                                        <div className="absolute bottom-[14.6%] left-[14.6%] -translate-x-1/2 translate-y-1/2 size-1.5 sm:size-2 bg-cyan-300 rounded-sm" />
                                        <div className="absolute bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2 size-1.5 sm:size-2 bg-indigo-300 rounded-sm" />
                                    </div>
                                    
                                    {/* Tearing Document Animation */}
                                    <div className="relative w-12 sm:w-16 h-16 sm:h-20">
                                        {/* Top Slice */}
                                        <div className="absolute top-0 left-0 right-0 h-[34%] bg-white dark:bg-slate-800 border-2 border-b-0 border-slate-300 dark:border-slate-600 rounded-t-xl animate-slice-top flex items-center px-2 sm:px-3 shadow-md overflow-hidden">
                                            <div className="w-full h-full bg-cyber-accent/10 absolute inset-0" />
                                            <div className="w-2/3 h-1.5 sm:h-2 bg-cyber-accent rounded-full relative z-10" />
                                        </div>
                                        {/* Middle Slice */}
                                        <div className="absolute top-[33.3%] left-0 right-0 h-[34%] bg-white dark:bg-slate-800 border-x-2 border-slate-300 dark:border-slate-600 animate-slice-mid flex items-center px-2 sm:px-3 shadow-md overflow-hidden z-10">
                                            <div className="w-full h-full bg-indigo-400/10 absolute inset-0" />
                                            <div className="w-full h-1.5 sm:h-2 bg-indigo-400 rounded-full relative z-10" />
                                        </div>
                                        {/* Bottom Slice */}
                                        <div className="absolute top-[66.6%] left-0 right-0 h-[34%] bg-white dark:bg-slate-800 border-2 border-t-0 border-slate-300 dark:border-slate-600 rounded-b-xl animate-slice-bot flex items-center px-2 sm:px-3 shadow-md overflow-hidden">
                                            <div className="w-full h-full bg-purple-400/10 absolute inset-0" />
                                            <div className="w-1/2 h-1.5 sm:h-2 bg-purple-400 rounded-full relative z-10" />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Segment Particles flying out */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-10 hidden sm:block">
                                    <div className="absolute top-[40%] left-0 size-2.5 sm:size-3 bg-cyber-accent shadow-[0_0_10px_#22d3ee] rounded-sm animate-particle-1" />
                                    <div className="absolute top-[60%] left-0 size-2.5 sm:size-3 bg-indigo-400 shadow-[0_0_10px_#818cf8] rounded-sm animate-particle-2" />
                                    <div className="absolute top-[50%] left-0 size-2.5 sm:size-3 bg-purple-400 shadow-[0_0_10px_#c084fc] rounded-sm animate-particle-3" />
                                </div>

                                <span className="absolute bottom-6 sm:bottom-10 font-black text-[10px] sm:text-xs uppercase tracking-widest text-slate-700 dark:text-slate-300 text-center leading-tight whitespace-nowrap">Segmentation<br/>& LSB Embedding</span>
                            </div>

                            {/* Node 3: Cloud Storage (Right) */}
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="size-20 sm:size-24 rounded-[1.5rem] bg-gradient-to-tr from-white to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 shadow-2xl flex items-center justify-center relative overflow-hidden">
                                    <Cloud className="size-10 sm:size-12 text-slate-400 dark:text-slate-300 relative z-10" />
                                    {/* Upload Pulses inside cloud */}
                                    <div className="absolute inset-x-0 bottom-0 bg-cyber-accent/20 animate-cloud-fill" />
                                </div>
                                <span className="absolute -bottom-10 font-black text-[10px] sm:text-xs uppercase tracking-widest text-slate-700 dark:text-slate-300 text-center whitespace-nowrap">Cloud Scatter</span>

                                {/* Stego Carriers flying into Cloud */}
                                <div className="absolute top-1/2 -left-20 sm:-left-32 -translate-y-1/2 w-20 sm:w-32 h-32 pointer-events-none hidden sm:block">
                                    <div className="absolute top-4 left-0 size-8 sm:size-10 rounded-xl bg-white dark:bg-slate-800 border border-cyber-accent/50 shadow-[0_0_15px_rgba(34,211,238,0.4)] flex items-center justify-center animate-stego-fly-1">
                                        <Image className="size-4 sm:size-5 text-cyber-accent" />
                                    </div>
                                    <div className="absolute bottom-4 left-8 size-8 sm:size-10 rounded-xl bg-white dark:bg-slate-800 border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center justify-center animate-stego-fly-2">
                                        <Volume2 className="size-4 sm:size-5 text-indigo-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 9: Findings of the Study (Objective 3)
        {
            title: "Chapter 4",
            subtitle: "Objective 3: Platform Architecture & Core Features",
            content: (
                <div className="h-full flex flex-col justify-center py-2">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-center lg:text-left group cursor-default">
                            <div className="size-14 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-7 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Chapter 4</h2>
                            </div>
                        </div>
                        <div className="mt-3 text-center lg:text-left lg:pl-[4.5rem]">
                            <p className="text-cyber-accent font-black uppercase tracking-widest text-sm mb-1">Results and Discussion</p>
                            <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm md:text-base tracking-wide leading-relaxed">Objective 3: Develop a web-based application that implements and integrates the AES-based encryption, segmentation, access control and authentication, and sharing mechanisms to a document storage platform.</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center gap-5 min-h-0 py-4">
                        {/* Row 1: 2 Cards */}
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 w-full">
                            {/* Card 1: Authentication & Access Control */}
                            <div className="w-full lg:w-[22rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Authentication & <br />Access Control
                                </h3>
                            </div>

                            {/* Card 2: Sharing Functionality */}
                            <div className="w-full lg:w-[22rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Sharing <br />Functionality
                                </h3>
                            </div>
                        </div>

                        {/* Row 2: 3 Cards */}
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 w-full">
                            {/* Card 3: File Deletion */}
                            <div className="w-full lg:w-[15rem] h-32 glass-panel p-5 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                                <h3 className="text-md font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    File <br />Deletion
                                </h3>
                            </div>

                            {/* Card 4: Web Development */}
                            <div className="w-full lg:w-[15rem] h-32 glass-panel p-5 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                                <h3 className="text-md font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Web <br />Development
                                </h3>
                            </div>

                            {/* Card 5: Local Device vs Hosted Environment */}
                            <div className="w-full lg:w-[15rem] h-32 glass-panel p-5 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                                <h3 className="text-md font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Local Device vs <br />Hosted Environment
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 10: Findings of the Study (Objective 4)
        {
            title: "Chapter 4",
            subtitle: "Objective 4: ISO/IEC 25010 Evaluation & GWM Summary",
            content: (
                <div className="h-full flex flex-col justify-center py-2">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-center lg:text-left group cursor-default">
                            <div className="size-14 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-7 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Chapter 4</h2>
                            </div>
                        </div>
                        <div className="mt-3 text-center lg:text-left lg:pl-[4.5rem]">
                            <p className="text-cyber-accent font-black uppercase tracking-widest text-sm mb-1">Results and Discussion</p>
                            <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm md:text-base tracking-wide leading-relaxed">Objective 4: Evaluate the application based on ISO/IEC 25010 quality characteristics to assess the effectiveness in terms of functional suitability, security, reliability, and measure usability and performance efficiency.</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center gap-5 min-h-0 py-4">
                        {/* Row 1: 2 Cards */}
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 w-full">
                            {/* Card 1: User Profile */}
                            <div className="w-full lg:w-[22rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    User Profile
                                </h3>
                            </div>

                            {/* Card 2: Data Processing & Analysis */}
                            <div className="w-full lg:w-[22rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Data Processing & <br />Analysis
                                </h3>
                            </div>
                        </div>

                        {/* Row 2: 2 Cards */}
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 w-full">
                            {/* Card 3: Overall Evaluation Summary */}
                            <div className="w-full lg:w-[22rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Overall Evaluation <br />Summary
                                </h3>
                            </div>

                            {/* Card 4: Evaluation on ISO 25010 Characteristics */}
                            <div className="w-full lg:w-[22rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Evaluation on ISO 25010 <br />Characteristics
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 11: Summary
        {
            title: "Summary",
            subtitle: "",
            content: (
                <div className="flex flex-col items-center justify-center text-center space-y-8 h-full py-4">
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-8 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-[2.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                            <Shield className="size-20 text-white drop-shadow-2xl relative z-10" />
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute inset-0 bg-cyber-accent/20 blur-[80px] -z-10 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">SUMMARY & <br/> CONCLUSIONS</h2>
                </div>
            )
        },
        // Slide 12: Recommendations
        {
            title: "Chapter 5",
            subtitle: "Recommendations",
            content: (
                <div className="h-full flex flex-col justify-center py-2">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-center lg:text-left group cursor-default">
                            <div className="size-14 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-7 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Chapter 5</h2>
                            </div>
                        </div>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-sm mt-3 text-center lg:text-left lg:pl-[4.5rem]">Recommendations</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 flex-1 content-center px-2 mt-4">
                        {[
                            { 
                                title: "Argon2 Key Derivation Standard", 
                                desc: "Hardens system security against long-term data analysis by introducing a cryptographically advanced key derivation standard.",
                                icon: <Shield className="size-6" />
                            },
                            { 
                                title: "AI-Driven Cover Generation", 
                                desc: "Produces high-entropy, natural-looking concealment media virtually indistinguishable from ordinary user data to ensure fragments remain hidden from evolving detection methodologies and sophisticated forensic analysis tools.",
                                icon: <Cpu className="size-6" />
                            },
                            { 
                                title: "Dynamic Cloud Relocation", 
                                desc: "Implement a periodic migration of file fragments between diverse cloud storage locations and providers to prevent attackers from accumulating a complete dataset over time.",
                                icon: <Database className="size-6" />
                            },
                            { 
                                title: "Native Mobile Applications", 
                                desc: "Mobile applications equipped with biometric authentication features to maintain high usability standards and protect sensitive digital assets across diverse device types.",
                                icon: <Users className="size-6" />
                            },
                            { 
                                title: "Secure API", 
                                desc: "Exposes the core architecture to allow organizations to integrate StegoLock’s protection layers directly into their existing document management systems.",
                                icon: <Compass className="size-6" />
                            }
                        ].map((rec, i) => (
                            <div key={i} className="flex gap-5 group items-start">
                                <div className="size-12 sm:size-14 rounded-[1.25rem] bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-accent flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-cyber-accent group-hover:text-slate-950 transition-all duration-300 shadow-md">
                                    {rec.icon}
                                </div>
                                <div className="flex-1 pt-1">
                                    <h4 className="font-black text-slate-900 dark:text-white tracking-tight text-base sm:text-lg mb-1.5 group-hover:text-cyber-accent transition-colors duration-300">{rec.title}</h4>
                                    <p className="text-[13px] sm:text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{rec.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        // Slide 10: LIVE DEMO (Operations Simulator Integrated here)
        {
            title: "LIVE DEMO",
            subtitle: "Interactive Operations HUD Simulator",
            content: (
                <div className="flex flex-col items-center justify-center text-center space-y-8 h-full py-4">
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-8 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-[2.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                            <Shield className="size-20 text-white drop-shadow-2xl relative z-10" />
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute inset-0 bg-cyber-accent/20 blur-[80px] -z-10 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">LIVE DEMO</h2>
                </div>
            )
        },
        // Slide 11: Q&A (Quick links removed per request)
        {
            title: "Thank You",
            subtitle: "Q&A Session",
            content: (
                <div className="flex flex-col items-center justify-center text-center space-y-8 h-full py-4">
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-8 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-[2.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                            <Shield className="size-20 text-white drop-shadow-2xl relative z-10" />
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute inset-0 bg-cyber-accent/20 blur-[80px] -z-10 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Questions & <br/> Answers</h2>
                </div>
            )
        },
        // Slide 12: CAPSTONE FINALLY DEFENDED!!!😭
        {
            title: "CAPSTONE FINALLY DEFENDED!!!😭",
            subtitle: "StegoLock Capstone Complete",
            content: (
                <div className="flex flex-col items-center justify-center text-center space-y-10 h-full py-8 animate-fade-in relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-purple-500/10 blur-[140px] rounded-full scale-75 animate-pulse -z-10"></div>
                    
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-14 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-[4rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_80px_rgba(34,211,238,0.6)] animate-float">
                            <Trophy className="size-28 sm:size-32 text-white drop-shadow-2xl relative z-10" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-[950] text-slate-900 dark:text-white tracking-tighter leading-none uppercase">
                            CAPSTONE FINALLY<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent via-indigo-400 to-purple-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.25)] animate-pulse">
                                DEFENDED!!!😭
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-black max-w-2xl mx-auto uppercase tracking-widest pt-4">
                            StegoLock: A Reconstruction-Dependent Security Architecture
                        </p>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <Link 
                            href="/" 
                            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyber-accent to-indigo-500 text-slate-950 hover:shadow-cyan-500/35 shadow-lg font-black text-xs uppercase tracking-widest transition active:scale-95"
                        >
                            Return to Application Dashboard
                        </Link>
                    </div>
                </div>
            )
        }
    ], [safeStats, demoStep, demoMode, demoActive, activeSteps, activeModal, currentSlide]);
}

