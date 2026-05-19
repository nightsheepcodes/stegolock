import React from 'react';
import { Shield } from 'lucide-react';

export function getChapter1Slides({ activeModal, setActiveModal }) {
    return [
        {
            title: "Chapter 1",
            subtitle: "Introduction",
            content: (
                <div className="h-full flex flex-col justify-center py-2 px-2 sm:px-4">
                    <div className="mb-2 sm:mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 text-center lg:text-left group cursor-default">
                            <div className="size-10 sm:size-14 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-5 sm:size-7 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Chapter 1</h2>
                            </div>
                        </div>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-xs sm:text-sm mt-2 text-center lg:text-left lg:pl-[4.5rem]">Introduction</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center gap-2 sm:gap-5 min-h-0 py-2 sm:py-4 w-full">
                        {/* Row 1: 2 Cards */}
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-2 sm:gap-6 w-full">
                            {/* Card 1: Background of the Study */}
                            <div 
                                onClick={() => setActiveModal('bg')}
                                className="w-full lg:w-[22rem] h-14 sm:h-32 glass-panel p-3 sm:p-6 rounded-xl sm:rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-xs sm:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Background of the <br className="hidden sm:inline" />Study
                                </h3>
                            </div>

                            {/* Card 2: Objectives of the Study */}
                            <div 
                                onClick={() => setActiveModal('objectives')}
                                className="w-full lg:w-[22rem] h-14 sm:h-32 glass-panel p-3 sm:p-6 rounded-xl sm:rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-xs sm:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Objectives of the <br className="hidden sm:inline" />Study
                                </h3>
                            </div>
                        </div>

                        {/* Row 2: 3 Cards */}
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-2 sm:gap-6 w-full">
                            {/* Card 3: Significance of the Study */}
                            <div 
                                onClick={() => setActiveModal('significance')}
                                className="w-full lg:w-[15rem] h-14 sm:h-32 glass-panel p-3 sm:p-5 rounded-xl sm:rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-xs sm:text-md font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Significance of the <br className="hidden sm:inline" />Study
                                </h3>
                            </div>

                            {/* Card 4: Scope and Limitations */}
                            <div 
                                onClick={() => setActiveModal('scope')}
                                className="w-full lg:w-[15rem] h-14 sm:h-32 glass-panel p-3 sm:p-5 rounded-xl sm:rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-xs sm:text-md font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Scope and <br className="hidden sm:inline" />Limitations
                                </h3>
                            </div>

                            {/* Card 5: Definition of Terms */}
                            <div 
                                onClick={() => setActiveModal('terms')}
                                className="w-full lg:w-[15rem] h-14 sm:h-32 glass-panel p-3 sm:p-5 rounded-xl sm:rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-xs sm:text-md font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Definition of <br className="hidden sm:inline" />Terms
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Modal Overlay for Slide 3 Cards */}
                    {activeModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent" onClick={() => setActiveModal(null)}>
                            <div 
                                className="bg-slate-900 border border-cyber-accent/50 w-full max-w-4xl p-5 sm:p-10 rounded-2xl sm:rounded-[2rem] relative shadow-2xl shadow-cyan-500/20 animate-fade-in flex flex-col max-h-[80vh] sm:max-h-[65vh]"
                                onClick={e => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setActiveModal(null)}
                                    className="absolute top-4 right-4 size-8 sm:top-6 sm:right-6 sm:size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-base sm:text-xl z-10"
                                >
                                    ✕
                                </button>
                                <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white mb-4 sm:mb-6 shrink-0">
                                    {activeModal === 'bg' && 'Background of the Study'}
                                    {activeModal === 'objectives' && 'Objectives of the Study'}
                                    {activeModal === 'significance' && 'Significance of the Study'}
                                    {activeModal === 'scope' && 'Scope and Limitations'}
                                    {activeModal === 'terms' && 'Definition of Terms'}
                                </h2>
                                <div className="text-slate-300 space-y-4 text-sm sm:text-base md:text-lg leading-relaxed overflow-y-auto min-h-0 pr-4">
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
        }
    ];
}
