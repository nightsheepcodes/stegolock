import React from 'react';
import { Shield } from 'lucide-react';

export function getChapter3Slides({ activeModal, setActiveModal, expandedSection, setExpandedSection, fullscreenImage, setFullscreenImage }) {
    return [
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
                            <div 
                                onClick={() => setActiveModal('framework')}
                                className="w-full lg:w-[20rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Conceptual <br />Framework
                                </h3>
                            </div>

                            {/* Card 2: Methodology */}
                            <div 
                                onClick={() => setActiveModal('methodology')}
                                className="w-full lg:w-[20rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Methodology
                                </h3>
                            </div>

                            {/* Card 3: Ethical Consideration */}
                            <div 
                                onClick={() => setActiveModal('ethical')}
                                className="w-full lg:w-[20rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                            >
                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                    Ethical <br />Consideration
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Modal Overlay for Slide 5 Cards */}
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
                                    {activeModal === 'framework' && 'Conceptual Framework'}
                                    {activeModal === 'methodology' && 'Methodology'}
                                    {activeModal === 'ethical' && 'Ethical Consideration'}
                                </h2>
                                <div className="overflow-y-auto min-h-0 pr-4">
                                     {activeModal === 'framework' && (
                                         <div className="space-y-6">
                                             {/* Reference Text A Delivery */}
                                             <div className="glass-panel p-6 rounded-2xl border-slate-800/80 bg-slate-950/20 text-slate-300">
                                                 <span className="text-cyber-accent font-bold font-mono text-xs uppercase tracking-wider block mb-3">Conceptual Framework Boundaries</span>
                                                 <ul className="space-y-2 text-sm sm:text-base">
                                                     <li className="flex gap-2.5 items-start">
                                                         <span className="text-cyber-accent font-bold mt-1">•</span>
                                                         <span>Establishes the theoretical and operational boundaries of the research by combining the system's logical data transformations with its comprehensive evaluation metrics.</span>
                                                     </li>
                                                     <li className="flex gap-2.5 items-start">
                                                         <span className="text-cyber-accent font-bold mt-1">•</span>
                                                         <span>Logical flow of data specifically maps the two core processes of the system: the **Document Protection Process** and the **Document Retrieval Process**.</span>
                                                     </li>
                                                     <li className="flex gap-2.5 items-start">
                                                         <span className="text-cyber-accent font-bold mt-1">•</span>
                                                         <span>Encompasses the Application System Evaluation Framework, ensuring the system meets established software quality standards.</span>
                                                     </li>
                                                 </ul>
                                             </div>

                                             {/* Figure 1 Block */}
                                             <div className="my-4 glass-panel border border-slate-800 rounded-2xl p-5 bg-slate-950/40">
                                                 <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
                                                     <span className="text-cyber-accent font-black font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                                                         <span className="inline-block size-2 bg-cyber-accent rounded-full animate-pulse" />
                                                         Figure 1: StegoLock Conceptual Framework
                                                     </span>
                                                 </div>
                                                 <div 
                                                     className="relative rounded-xl overflow-hidden bg-slate-900/50 border border-slate-800/80 p-6 flex justify-center items-center shadow-inner cursor-zoom-in group/img hover:border-cyber-accent/40 transition-colors"
                                                     onClick={() => setFullscreenImage({
                                                         src: '/assets/images/stegolock_framework.png',
                                                         alt: 'StegoLock Framework Diagram',
                                                         caption: 'Figure 1: StegoLock Conceptual Framework'
                                                     })}
                                                     title="Click to view full screen"
                                                 >
                                                     <img 
                                                         src="/assets/images/stegolock_framework.png" 
                                                         alt="StegoLock Framework Diagram" 
                                                         className="max-h-[750px] w-full object-contain hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                                                     />
                                                     <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                         <span className="bg-slate-950/80 border border-cyber-accent/30 text-cyber-accent text-xs font-bold font-mono px-3 py-1.5 rounded-lg shadow-lg">
                                                             🔍 CLICK TO ENLARGE
                                                         </span>
                                                     </div>
                                                 </div>
                                                 <p className="text-[11px] text-slate-500 mt-2 text-center italic font-medium">
                                                     Structural mapping of data transformations across the double-pipeline locking/unlocking architecture.
                                                 </p>
                                             </div>

                                             {/* Reference Text B Delivery */}
                                             <div className="glass-panel p-6 rounded-2xl border-slate-800/80 bg-slate-950/20 text-slate-300">
                                                 <span className="text-cyber-accent font-bold font-mono text-xs uppercase tracking-wider block mb-3">Operational Principles & Architecture</span>
                                                 <ul className="space-y-2 text-sm sm:text-base">
                                                     <li className="flex gap-2.5 items-start">
                                                         <span className="text-cyber-accent font-bold mt-1">•</span>
                                                         <span>Relies on the StegoLock System Architecture, which uses a four-layer design to separate user interaction, application logic, local database storage, and remote cloud storage.</span>
                                                     </li>
                                                     <li className="flex gap-2.5 items-start">
                                                         <span className="text-cyber-accent font-bold mt-1">•</span>
                                                         <span>Enforces the reconstruction-dependent security model by completely isolating the database (holding the Stego Map) from the cloud storage (holding the Stego Files).</span>
                                                     </li>
                                                     <li className="flex gap-2.5 items-start">
                                                         <span className="text-cyber-accent font-bold mt-1">•</span>
                                                         <span>Ensures that these two critical layers never interact directly; instead, they rely on the System Controller to act as a secure bridge, maintaining absolute data confidentiality.</span>
                                                     </li>
                                                 </ul>
                                             </div>

                                             {/* Figure 2 Block */}
                                             <div className="my-4 glass-panel border border-slate-800 rounded-2xl p-5 bg-slate-950/40">
                                                 <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
                                                     <span className="text-cyber-accent font-black font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                                                         <span className="inline-block size-2 bg-cyber-accent rounded-full animate-pulse" />
                                                         Figure 2: StegoLock System Architecture
                                                     </span>
                                                 </div>
                                                 <div 
                                                     className="relative rounded-xl overflow-hidden bg-slate-900/50 border border-slate-800/80 p-6 flex justify-center items-center shadow-inner cursor-zoom-in group/img hover:border-cyber-accent/40 transition-colors"
                                                     onClick={() => setFullscreenImage({
                                                         src: '/assets/images/stegolock_system_architecture.png',
                                                         alt: 'StegoLock System Architecture Diagram',
                                                         caption: 'Figure 2: StegoLock System Architecture'
                                                     })}
                                                     title="Click to view full screen"
                                                 >
                                                     <img 
                                                         src="/assets/images/stegolock_system_architecture.png" 
                                                         alt="StegoLock System Architecture Diagram" 
                                                         className="max-h-[750px] w-full object-contain hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                                                     />
                                                     <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                         <span className="bg-slate-950/80 border border-cyber-accent/30 text-cyber-accent text-xs font-bold font-mono px-3 py-1.5 rounded-lg shadow-lg">
                                                             🔍 CLICK TO ENLARGE
                                                         </span>
                                                     </div>
                                                 </div>
                                                 <p className="text-[11px] text-slate-500 mt-2 text-center italic font-medium">
                                                     Layered system architecture separating user interaction, logic, local persistence, and Backblaze B2 storage layers.
                                                 </p>
                                             </div>

                                             {/* Reference Text C Delivery */}
                                             <div className="glass-panel p-6 rounded-2xl border-slate-800/80 bg-slate-950/20 text-slate-300">
                                                 <span className="text-cyber-accent font-bold font-mono text-xs uppercase tracking-wider block mb-3">System Layers & Subprocesses</span>
                                                 <ul className="space-y-3 text-sm sm:text-base">
                                                     <li className="flex gap-2.5 items-start">
                                                         <span className="text-cyber-accent font-bold mt-1">•</span>
                                                         <span><strong className="text-white">Presentation Layer (User Interface):</strong> Client-facing UI built with React and driven by Inertia.js. Abstracts cryptographic complexity and operates strictly without client-side cryptographic processing or data segmentation to prevent tampering.</span>
                                                     </li>
                                                     <li className="flex gap-2.5 items-start">
                                                         <span className="text-cyber-accent font-bold mt-1">•</span>
                                                         <span><strong className="text-white">Application Logic Layer (System Controller):</strong> Composed of a Laravel (PHP) subsystem managing auth, key derivation (PBKDF2/HKDF), AES-256-GCM encryption, segmentation, and cloud APIs, working in tandem with a Python steganographic subsystem for embedding/extraction.</span>
                                                     </li>
                                                     <li className="flex gap-2.5 items-start">
                                                         <span className="text-cyber-accent font-bold mt-1">•</span>
                                                         <span><strong className="text-white">Persistence Layer (Local Database):</strong> Powered by MySQL to house user credentials, metadata, and fragment mappings (Stego Map blueprint). Enforces a strict isolation constraint by never storing actual payloads or document encryption keys.</span>
                                                     </li>
                                                     <li className="flex gap-2.5 items-start">
                                                         <span className="text-cyber-accent font-bold mt-1">•</span>
                                                         <span><strong className="text-white">Storage Layer (Cloud Infrastructure):</strong> Powered by Backblaze B2, storing the cover pool and resulting stego files as flat, isolated binary objects with zero knowledge of maps or user identities.</span>
                                                     </li>
                                                     <li className="flex gap-2.5 items-start">
                                                         <span className="text-cyber-accent font-bold mt-1">•</span>
                                                         <span><strong className="text-white">Evaluation & Subprocesses:</strong> Assessed rigorously using the ISO/IEC 25010 standard across functional suitability, security, reliability, performance efficiency, and usability, backed by logical subprocesses detailed below.</span>
                                                     </li>
                                                 </ul>
                                             </div>

                                             {/* Sub-sections Container */}
                                             <div className="pt-6 border-t border-slate-800/80">
                                                 <span className="text-cyber-accent font-black font-mono text-xs uppercase tracking-widest block mb-4">
                                                     Detailed Subprocesses & Architectural Pillars
                                                 </span>
                                                 
                                                 <div className="space-y-4">
                                                     {[
                                                         {
                                                             id: '3.1.1',
                                                             title: '3.1.1 STEGOLOCK DOCUMENT PROTECTION PROCESS',
                                                             content: (
                                                                 <div className="space-y-4">
                                                                     <p className="text-justify leading-relaxed">
                                                                         The StegoLock Document Protection Process defines the forward transformation of data from a vulnerable plaintext document into a secured, reconstruction-dependent state. While the high-level inputs, processes, and outputs are outlined in the overarching conceptual framework, Figure 3 details the actual data flow and layer-by-layer execution of this locking sequence.
                                                                     </p>

                                                                     {/* Figure 3: Clickable Image with Zoom Lightbox Trigger */}
                                                                     <div className="my-6">
                                                                         <div 
                                                                             onClick={() => setFullscreenImage({
                                                                                 src: '/assets/images/document_locking_process.png',
                                                                                 alt: 'StegoLock Document Locking Process Diagram',
                                                                                 caption: 'Figure 3: StegoLock Document Locking Process'
                                                                             })}
                                                                             title="Click to view full screen"
                                                                             className="relative group/fig cursor-zoom-in border border-slate-800/80 rounded-xl overflow-hidden bg-slate-955/40 p-2 hover:border-cyber-accent/40 transition-all duration-300"
                                                                         >
                                                                             <img 
                                                                                 src="/assets/images/document_locking_process.png" 
                                                                                 alt="StegoLock Document Locking Process Diagram" 
                                                                                 className="max-h-[300px] w-full object-contain hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                                                                             />
                                                                             <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover/fig:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                                                 <span className="bg-slate-950/80 border border-cyber-accent/30 text-cyber-accent text-xs font-bold font-mono px-3 py-1.5 rounded-lg shadow-lg">
                                                                                     🔍 CLICK TO ENLARGE
                                                                                 </span>
                                                                             </div>
                                                                         </div>
                                                                         <p className="text-[11px] text-slate-500 mt-2 text-center italic font-medium">
                                                                             Figure 3. StegoLock Document Locking Process
                                                                         </p>
                                                                     </div>

                                                                     <p className="text-justify leading-relaxed">
                                                                         To execute this protection mechanism, the sequence begins when an authenticated user uploads a primary payload (the original sensitive document). Because the user is already logged in, the system utilizes the active session's master key to authorize the operation. The data immediately enters Phase A (Cryptographic Transformation), which begins with the compression of the document to minimize its footprint. Following this, a unique Document Encryption Key (DEK) is generated to encrypt the payload via AES-256-GCM, and that DEK is then securely wrapped using the master key.
                                                                     </p>

                                                                     <p className="text-justify leading-relaxed">
                                                                         Following this, the system enters Phase B (Steganographic Obfuscation), where the steganographic engine takes over to segment the resulting ciphertext. These encrypted fragments are then embedded into a diverse pool of cover media (such as PNG, WAV, and TXT files) provided by the system.
                                                                     </p>

                                                                     <p className="text-justify leading-relaxed">
                                                                         Finally, the process concludes with Phase C (Storage and Mapping). As the physical obfuscation finishes, the system simultaneously constructs the Stego Map (Component 2), a structural blueprint detailing the fragment IDs and their reassembly order, which is saved locally to the database. The system then scatters the resulting Stego Files (Component 3) into a remote cloud bucket. This final step completely separates the generated components by keeping the blueprint in the local database while the hidden data resides in the cloud. This process ensures strict physical isolation in accordance with the security model.
                                                                     </p>
                                                                 </div>
                                                             )
                                                         },
                                                         {
                                                             id: '3.1.2',
                                                             title: '3.1.2 STEGOLOCK DOCUMENT RETRIEVAL PROCESS',
                                                             content: (
                                                                 <div className="space-y-4">
                                                                     <p className="text-justify leading-relaxed">
                                                                         While the locking sequence focuses on segmentation and obfuscation, the StegoLock Document Retrieval Process operates entirely around the principle of data reconstruction. Building upon the logical structure outlined in the conceptual framework, Figure 4 demonstrates the actual data flow and corresponding unlocking sequence executed across the system's architecture. Rather than generating new materials, this process focuses strictly on validation, extraction, and mathematical reversal.
                                                                     </p>

                                                                     {/* Figure 4: Clickable Image with Zoom Lightbox Trigger */}
                                                                     <div className="my-6">
                                                                         <div 
                                                                             onClick={() => setFullscreenImage({
                                                                                 src: '/assets/images/document_unlocking_process.png',
                                                                                 alt: 'StegoLock Document Unlocking Process Diagram',
                                                                                 caption: 'Figure 4: StegoLock Document Unlocking Process'
                                                                             })}
                                                                             title="Click to view full screen"
                                                                             className="relative group/fig cursor-zoom-in border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40 p-2 hover:border-cyber-accent/40 transition-all duration-300"
                                                                         >
                                                                             <img 
                                                                                 src="/assets/images/document_unlocking_process.png" 
                                                                                 alt="StegoLock Document Unlocking Process Diagram" 
                                                                                 className="max-h-[300px] w-full object-contain hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                                                                             />
                                                                             <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover/fig:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                                                 <span className="bg-slate-950/80 border border-cyber-accent/30 text-cyber-accent text-xs font-bold font-mono px-3 py-1.5 rounded-lg shadow-lg">
                                                                                     🔍 CLICK TO ENLARGE
                                                                                 </span>
                                                                             </div>
                                                                         </div>
                                                                         <p className="text-[11px] text-slate-500 mt-2 text-center italic font-medium">
                                                                             Figure 4. StegoLock Document Unlocking Process
                                                                         </p>
                                                                     </div>

                                                                     <p className="text-justify leading-relaxed">
                                                                         The unlocking sequence is initiated when a user requests to retrieve a secured document. The system first validates the user's authority by confirming the presence of the active session's master key (Component 1). With authorization granted, the system initiates Phase A (Retrieval and Extraction) by querying the local database to retrieve the critical Stego Map, which acts as the blueprint for the entire operation. Using the structural coordinates found within this map, the system connects to the cloud to fetch the specific Stego Files that contain the hidden data, and extracts the hidden fragments from the cover media.
                                                                     </p>

                                                                     <p className="text-justify leading-relaxed">
                                                                         With all components successfully aggregated and extracted, the system moves to Phase B (Ciphertext Reassembly). Guided by the map's indexing data, it organizes the disorganized pieces back together in their exact original sequence to form a unified ciphertext.
                                                                     </p>

                                                                     <p className="text-justify leading-relaxed">
                                                                         Finally, the system executes Phase C (Cryptographic Reversal) by using the master key to unwrap the internal document key, decrypting the data, and decompressing the payload. Because this entire reconstruction process operates strictly within temporary memory, the bit-perfect original plaintext document is safely delivered directly to the user for immediate download without leaving any readable trace behind.
                                                                     </p>
                                                                 </div>
                                                             )
                                                         },
                                                         {
                                                             id: '3.1.3',
                                                             title: '3.1.3 STEGOLOCK FUNCTIONAL FEATURES',
                                                             content: (
                                                                 <div className="space-y-6">
                                                                     <p className="text-justify leading-relaxed">
                                                                         Beyond the core locking and unlocking sequences, the StegoLock system relies on several other functional processes to manage user identities and document access. The following processes illustrate how user interactions cascade across the system's layers to enforce security.
                                                                     </p>

                                                                     {/* Sub-process 1: User Account Creation */}
                                                                     <div className="border-t border-slate-800/80 pt-4 mt-4">
                                                                         <span className="text-white font-bold font-mono text-sm uppercase tracking-wide block mb-2">
                                                                             User Account Creation Process
                                                                         </span>
                                                                         <p className="text-justify leading-relaxed mb-4">
                                                                             Figure 5 maps the initial point of interaction within the StegoLock system, which is the creation of a user account. This process begins at the Presentation Layer, where the user securely submits their registration details without any sensitive key generation occurring in the client's browser. Once submitted, the Application Logic Layer intercepts the request to generate unique cryptographic identities, establishing a distinct master key and random salts for the user. Finally, the Persistence Layer stores these related user data and securely wraps master key and encryption data to the database. By strictly avoiding the storage of plaintext passwords or raw cryptographic keys, the system ensures that any database breach would yield only useless, inaccessible data.
                                                                         </p>
                                                                         <div 
                                                                             onClick={() => setFullscreenImage({
                                                                                 src: '/assets/images/user_regis_process.png',
                                                                                 alt: 'StegoLock User Account Creation Process Diagram',
                                                                                 caption: 'Figure 5: StegoLock User Account Creation Process'
                                                                             })}
                                                                             title="Click to view full screen"
                                                                             className="relative group/fig cursor-zoom-in border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40 p-2 hover:border-cyber-accent/40 transition-all duration-300"
                                                                         >
                                                                             <img 
                                                                                 src="/assets/images/user_regis_process.png" 
                                                                                 alt="StegoLock User Account Creation Process Diagram" 
                                                                                 className="max-h-[300px] w-full object-contain hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                                                                             />
                                                                             <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover/fig:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                                                 <span className="bg-slate-950/80 border border-cyber-accent/30 text-cyber-accent text-xs font-bold font-mono px-3 py-1.5 rounded-lg shadow-lg">
                                                                                     🔍 CLICK TO ENLARGE
                                                                                 </span>
                                                                             </div>
                                                                         </div>
                                                                         <p className="text-[11px] text-slate-500 mt-2 text-center italic font-medium">
                                                                             Figure 5. StegoLock User Account Creation Process
                                                                         </p>
                                                                     </div>

                                                                     {/* Sub-process 2: User Login */}
                                                                     <div className="border-t border-slate-800/80 pt-4 mt-6">
                                                                         <span className="text-white font-bold font-mono text-sm uppercase tracking-wide block mb-2">
                                                                             User Login Process
                                                                         </span>
                                                                         <p className="text-justify leading-relaxed mb-4">
                                                                             The login process, outlined in Figure 6, requires the user to input their credentials at the Presentation Layer to access the system. The Application Logic Layer then verifies these credentials by deriving the necessary keys to unwrap the user's encrypted master key. Upon successful authentication, this master key is temporarily cached in a secure, short-lived session to authorize subsequent cryptographic operations. Throughout this process, the Persistence Layer acts as the verifier, supplying the stored identity records against which the incoming credentials are cross-referenced.
                                                                         </p>
                                                                         <div 
                                                                             onClick={() => setFullscreenImage({
                                                                                 src: '/assets/images/user_login_process.png',
                                                                                 alt: 'StegoLock User Login Process Diagram',
                                                                                 caption: 'Figure 6: StegoLock User Login Process'
                                                                             })}
                                                                             title="Click to view full screen"
                                                                             className="relative group/fig cursor-zoom-in border border-slate-800/80 rounded-xl overflow-hidden bg-slate-955/40 p-2 hover:border-cyber-accent/40 transition-all duration-300"
                                                                         >
                                                                             <img 
                                                                                 src="/assets/images/user_login_process.png" 
                                                                                 alt="StegoLock User Login Process Diagram" 
                                                                                 className="max-h-[300px] w-full object-contain hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                                                                             />
                                                                             <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover/fig:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                                                 <span className="bg-slate-950/80 border border-cyber-accent/30 text-cyber-accent text-xs font-bold font-mono px-3 py-1.5 rounded-lg shadow-lg">
                                                                                     🔍 CLICK TO ENLARGE
                                                                                 </span>
                                                                             </div>
                                                                         </div>
                                                                         <p className="text-[11px] text-slate-500 mt-2 text-center italic font-medium">
                                                                             Figure 6. StegoLock User Login Process
                                                                         </p>
                                                                     </div>

                                                                     {/* Sub-process 3: Document Sharing */}
                                                                     <div className="border-t border-slate-800/80 pt-4 mt-6">
                                                                         <span className="text-white font-bold font-mono text-sm uppercase tracking-wide block mb-2">
                                                                             Document Sharing Process
                                                                         </span>
                                                                         <p className="text-justify leading-relaxed mb-4">
                                                                             As outlined in Figure 7, users can securely share documents by simply selecting a recipient in the Presentation Layer. To keep the system efficient and secure, the Application Logic Layer does not create duplicate copies of the heavy Stego Files in the cloud. Instead, it temporarily unwraps the document's hidden key using the owner's master key and securely re-wraps it specifically for the recipient. The Persistence Layer then records this shared access in the database. This allows the recipient to use their own master key to unlock the document, without altering the original files stored in the cloud.
                                                                         </p>
                                                                         <div 
                                                                             onClick={() => setFullscreenImage({
                                                                                 src: '/assets/images/document_sharing_process.png',
                                                                                 alt: 'StegoLock Document Sharing Process Diagram',
                                                                                 caption: 'Figure 7: StegoLock Document Sharing Process'
                                                                             })}
                                                                             title="Click to view full screen"
                                                                             className="relative group/fig cursor-zoom-in border border-slate-800/80 rounded-xl overflow-hidden bg-slate-955/40 p-2 hover:border-cyber-accent/40 transition-all duration-300"
                                                                         >
                                                                             <img 
                                                                                 src="/assets/images/document_sharing_process.png" 
                                                                                 alt="StegoLock Document Sharing Process Diagram" 
                                                                                 className="max-h-[300px] w-full object-contain hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                                                                             />
                                                                             <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover/fig:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                                                 <span className="bg-slate-950/80 border border-cyber-accent/30 text-cyber-accent text-xs font-bold font-mono px-3 py-1.5 rounded-lg shadow-lg">
                                                                                     🔍 CLICK TO ENLARGE
                                                                                 </span>
                                                                             </div>
                                                                         </div>
                                                                         <p className="text-[11px] text-slate-500 mt-2 text-center italic font-medium">
                                                                             Figure 7. StegoLock Document Sharing Process
                                                                         </p>
                                                                     </div>

                                                                     {/* Sub-process 4: Document Deletion */}
                                                                     <div className="border-t border-slate-800/80 pt-4 mt-6">
                                                                         <span className="text-white font-bold font-mono text-sm uppercase tracking-wide block mb-2">
                                                                             Document Deletion Process
                                                                         </span>
                                                                         <p className="text-justify leading-relaxed mb-4">
                                                                             Finally, Figure 8 illustrates how a document is permanently deleted from the system. When a user chooses to delete a file at the Presentation Layer, the Application Logic Layer makes sure no hidden data is left behind by following a strict "cloud-first" rule. It connects to the Storage Layer to completely delete the Stego Files from the cloud. Only after confirming that these cloud files are truly gone will the Persistence Layer delete the Stego Map and the document's records from the database. Deleting the files in this specific order guarantees that all data is completely wiped out without leaving any broken or leftover pieces behind.
                                                                         </p>
                                                                         <div 
                                                                             onClick={() => setFullscreenImage({
                                                                                 src: '/assets/images/document_deletion_process.png',
                                                                                 alt: 'StegoLock Document Deletion Process Diagram',
                                                                                 caption: 'Figure 8: StegoLock Document Deletion Process'
                                                                             })}
                                                                             title="Click to view full screen"
                                                                             className="relative group/fig cursor-zoom-in border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40 p-2 hover:border-cyber-accent/40 transition-all duration-300"
                                                                         >
                                                                             <img 
                                                                                 src="/assets/images/document_deletion_process.png" 
                                                                                 alt="StegoLock Document Deletion Process Diagram" 
                                                                                 className="max-h-[300px] w-full object-contain hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                                                                             />
                                                                             <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover/fig:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                                                 <span className="bg-slate-950/80 border border-cyber-accent/30 text-cyber-accent text-xs font-bold font-mono px-3 py-1.5 rounded-lg shadow-lg">
                                                                                     🔍 CLICK TO ENLARGE
                                                                                 </span>
                                                                             </div>
                                                                         </div>
                                                                         <p className="text-[11px] text-slate-500 mt-2 text-center italic font-medium">
                                                                             Figure 8. StegoLock Document Deletion Process
                                                                         </p>
                                                                     </div>

                                                                     {/* Core Features Summary (No dashes) */}
                                                                     <div className="border-t border-slate-800/80 pt-4 mt-6">
                                                                         <span className="text-cyber-accent font-bold font-mono text-sm uppercase tracking-wider block mb-4">
                                                                             Summary of Core Features
                                                                         </span>
                                                                         <p className="text-justify leading-relaxed mb-4">
                                                                             To sum it all up, the following core features highlight how the complex background processes discussed previously translate into the primary capabilities that users interact with inside the StegoLock application:
                                                                         </p>
                                                                         <div className="space-y-3.5 bg-slate-955/30 border border-slate-900 rounded-xl p-4 sm:p-5">
                                                                             <p className="text-justify text-sm sm:text-base leading-relaxed">
                                                                                 <strong className="text-white">User Registration:</strong> Securely creating an account and generating the user's unique digital keys behind the scenes.
                                                                             </p>
                                                                             <p className="text-justify text-sm sm:text-base leading-relaxed">
                                                                                 <strong className="text-white">User Authentication:</strong> Verifying the user's identity at login so they can safely lock, unlock, and share their files.
                                                                             </p>
                                                                             <p className="text-justify text-sm sm:text-base leading-relaxed">
                                                                                 <strong className="text-white">Upload (Document Locking):</strong> Taking a normal file, encrypting it, breaking it into pieces, and hiding those pieces in the cloud.
                                                                             </p>
                                                                             <p className="text-justify text-sm sm:text-base leading-relaxed">
                                                                                 <strong className="text-white">Download (Document Unlocking):</strong> Finding the hidden pieces in the cloud, putting them back together, and decrypting them to restore the original file.
                                                                             </p>
                                                                             <p className="text-justify text-sm sm:text-base leading-relaxed">
                                                                                 <strong className="text-white">Document Sharing:</strong> Giving a designated recipient a secure key to open a file without having to make a second heavy copy in the cloud.
                                                                             </p>
                                                                             <p className="text-justify text-sm sm:text-base leading-relaxed">
                                                                                 <strong className="text-white">Document Deletion:</strong> Using a "cloud-first" approach to completely and permanently wipe out a file's pieces from the cloud before deleting its records from the database, ensuring absolutely nothing is left behind.
                                                                             </p>
                                                                         </div>
                                                                     </div>
                                                                 </div>
                                                             )
                                                         },
                                                         {
                                                             id: '3.1.4',
                                                             title: '3.1.4 THE RECONSTRUCTION-DEPENDENT SECURITY MODEL',
                                                             content: (
                                                                 <div className="space-y-4">
                                                                     <p className="text-justify leading-relaxed">
                                                                         While the functional data flows illustrate how StegoLock handles data, these operations are governed by the system's underlying conceptual foundation. The fundamental principle of StegoLock is security through segmentation and obfuscation. Rather than storing a document as a single file, the system breaks the encrypted data into small fragments and hides them inside everyday media (images, audio, and text). These Stego Files are subsequently scattered into a remote cloud bucket.
                                                                     </p>
                                                                     
                                                                     <p className="text-justify leading-relaxed">
                                                                         As illustrated in Figure 9, to reconstruct the original document, the system relies on three "pillars" that must be accessed simultaneously:
                                                                     </p>

                                                                     <div className="space-y-3.5 bg-slate-950/30 border border-slate-900 rounded-xl p-4 sm:p-5">
                                                                         <p className="text-justify text-sm sm:text-base leading-relaxed">
                                                                             <strong className="text-white">The Master Key:</strong> This is a digital key derived from the user’s password. It serves as the unique credential required to unlock the document’s internal encryption key once the scattered data fragments have been reassembled.
                                                                         </p>
                                                                         <p className="text-justify text-sm sm:text-base leading-relaxed">
                                                                             <strong className="text-white">The Stego-Map:</strong> This serves as a digital blueprint stored within the system’s database. It maintains a precise record of which hidden data fragments belong to a specific document and the exact order required for reassembly.
                                                                         </p>
                                                                         <p className="text-justify text-sm sm:text-base leading-relaxed">
                                                                             <strong className="text-white">The Stego Files:</strong> These are the physical cover media (such as images, audio, or text files) stored in the cloud. To an unauthorized party, these appear as ordinary media files, yet they secretly contain encrypted data fragments.
                                                                         </p>
                                                                     </div>

                                                                     {/* Figure 9: Clickable Image with Zoom Lightbox Trigger */}
                                                                     <div className="my-6">
                                                                         <div 
                                                                             onClick={() => setFullscreenImage({
                                                                                 src: '/assets/images/reconstruction-dependent_security_model.png',
                                                                                 alt: 'The Reconstruction-Dependent Security Model Diagram',
                                                                                 caption: 'Figure 9: The Reconstruction-Dependent Security Model'
                                                                             })}
                                                                             title="Click to view full screen"
                                                                             className="relative group/fig cursor-zoom-in border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40 p-2 hover:border-cyber-accent/40 transition-all duration-300"
                                                                         >
                                                                             <img 
                                                                                 src="/assets/images/reconstruction-dependent_security_model.png" 
                                                                                 alt="The Reconstruction-Dependent Security Model Diagram" 
                                                                                 className="max-h-[300px] w-full object-contain hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                                                                             />
                                                                             <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover/fig:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                                                 <span className="bg-slate-950/80 border border-cyber-accent/30 text-cyber-accent text-xs font-bold font-mono px-3 py-1.5 rounded-lg shadow-lg">
                                                                                     🔍 CLICK TO ENLARGE
                                                                                 </span>
                                                                             </div>
                                                                         </div>
                                                                         <p className="text-[11px] text-slate-500 mt-2 text-center italic font-medium">
                                                                             Figure 9. The Reconstruction-Dependent Security Model
                                                                         </p>
                                                                     </div>

                                                                     <p className="text-justify leading-relaxed">
                                                                         <strong className="text-cyber-accent font-semibold">System Security:</strong> These three pillars are functionally interdependent. If an unauthorized party accesses the files without the map, the correct data cannot be identified. If the map is accessed without the master key, the data remains encrypted and unreadable. Successful reconstruction requires the simultaneous presence of all three elements. This model ensures that an attacker cannot find or rebuild the original data unless they have simultaneous access to the encryption keys, the map of the hidden pieces, and the encrypted data fragments stored in the cloud. This model serves as the underlying conceptual model upon which the entire StegoLock framework is built.
                                                                     </p>
                                                                 </div>
                                                             )
                                                         },
                                                         {
                                                             id: '3.1.5',
                                                             title: '3.1.5 APPLICATION SYSTEM EVALUATION FRAMEWORK',
                                                             content: (
                                                                 <div className="space-y-6">
                                                                     <p className="text-justify leading-relaxed">
                                                                         While the preceding sections define the theoretical design and operational flow of StegoLock, the final component of the conceptual framework establishes how the system's actual quality is measured. StegoLock was evaluated using the ISO/IEC 25010 software product quality model, assessing five core characteristics: functional suitability, performance efficiency, usability, reliability, and security. The evaluation was conducted by deploying the system to a live hosting environment and inviting 30 college student respondents to explore core features and complete a survey using a 5-point Likert scale (ranging from 1 = Strongly Disagree to 5 = Strongly Agree), adapted from a validated evaluation framework.
                                                                     </p>

                                                                     {/* Figure 10: Clickable Image with Zoom Lightbox Trigger */}
                                                                     <div className="my-6">
                                                                         <div 
                                                                             onClick={() => setFullscreenImage({
                                                                                 src: '/assets/images/ISO-25010_framework_for_stegolock.png',
                                                                                 alt: 'ISO/IEC 25010 Quality Characteristics Diagram',
                                                                                 caption: 'Figure 10: ISO/IEC 25010 Quality Characteristics used for Evaluating StegoLock'
                                                                             })}
                                                                             title="Click to view full screen"
                                                                             className="relative group/fig cursor-zoom-in border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40 p-2 hover:border-cyber-accent/40 transition-all duration-300"
                                                                         >
                                                                             <img 
                                                                                 src="/assets/images/ISO-25010_framework_for_stegolock.png" 
                                                                                 alt="ISO/IEC 25010 Quality Characteristics Diagram" 
                                                                                 className="max-h-[300px] w-full object-contain hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                                                                             />
                                                                             <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover/fig:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                                                 <span className="bg-slate-950/80 border border-cyber-accent/30 text-cyber-accent text-xs font-bold font-mono px-3 py-1.5 rounded-lg shadow-lg">
                                                                                     🔍 CLICK TO ENLARGE
                                                                                 </span>
                                                                             </div>
                                                                         </div>
                                                                         <p className="text-[11px] text-slate-500 mt-2 text-center italic font-medium">
                                                                             Figure 10. ISO/IEC 25010 Quality Characteristics used for Evaluating StegoLock
                                                                         </p>
                                                                     </div>

                                                                     {/* Five Core ISO/IEC 25010 Characteristics (No dashes) */}
                                                                     <div className="space-y-4">
                                                                         <div className="border-t border-slate-800/80 pt-4">
                                                                             <span className="text-white font-bold font-mono text-sm uppercase tracking-wide block mb-1">
                                                                                 Functional Suitability
                                                                             </span>
                                                                             <p className="text-justify leading-relaxed">
                                                                                 Determines whether the system provides necessary functions to meet user needs under specified conditions. It covers completeness (presence of all necessary features), correctness (accuracy of outputs), and appropriateness (suitability of features for intended tasks), validated through observable operations like uploading and retrieving documents.
                                                                             </p>
                                                                         </div>

                                                                         <div className="border-t border-slate-800/80 pt-4">
                                                                             <span className="text-white font-bold font-mono text-sm uppercase tracking-wide block mb-1">
                                                                                 Security
                                                                             </span>
                                                                             <p className="text-justify leading-relaxed">
                                                                                 Treated with particular academic rigor across five sub-characteristics: confidentiality, integrity, non-repudiation, accountability, and authenticity. Because cryptographic and steganographic processes operate in the backend, security was assessed via user interaction with observable controls—such as authentication mechanisms—and overall trust in document protection.
                                                                             </p>
                                                                         </div>

                                                                         <div className="border-t border-slate-800/80 pt-4">
                                                                             <span className="text-white font-bold font-mono text-sm uppercase tracking-wide block mb-1">
                                                                                 Reliability
                                                                             </span>
                                                                             <p className="text-justify leading-relaxed">
                                                                                 Measures how consistently the system performs under specified conditions. It covers system maturity (absence of failures under normal conditions), availability (accessibility), and fault tolerance (maintaining service levels when encountering unexpected errors), demonstrating practical real-world stability.
                                                                             </p>
                                                                         </div>

                                                                         <div className="border-t border-slate-800/80 pt-4">
                                                                             <span className="text-white font-bold font-mono text-sm uppercase tracking-wide block mb-1">
                                                                                 Performance Efficiency
                                                                             </span>
                                                                             <p className="text-justify leading-relaxed">
                                                                                 Measures performance relative to resources used. It covers time behavior (responsiveness, processing speeds, and low latency), resource utilization (avoidance of performance bottlenecks), and capacity (smooth operation and compatibility across various client devices).
                                                                             </p>
                                                                         </div>

                                                                         <div className="border-t border-slate-800/80 pt-4">
                                                                             <span className="text-white font-bold font-mono text-sm uppercase tracking-wide block mb-1">
                                                                                 Usability
                                                                             </span>
                                                                             <p className="text-justify leading-relaxed">
                                                                                 Evaluates how effectively, efficiently, and satisfyingly users achieve their goals. It covers appropriateness recognizability (ease of recognizing functions), learnability (ease of use for first-time users), operability (intuitive navigation), user interface aesthetics (visual attraction and organization), and general accessibility.
                                                                             </p>
                                                                         </div>
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
                                             </div>
                                         </div>
                                     )}

                                     {activeModal === 'methodology' && (
                                         <div className="space-y-6">
                                             {/* Agile Overview Header Card */}
                                             <div className="bg-slate-950/30 border border-slate-800/80 rounded-xl p-5 sm:p-6 space-y-4">
                                                 <p className="text-justify leading-relaxed text-slate-300">
                                                     The creation of StegoLock utilized an Agile approach structured around brief iterative sprints, allowing the team to adapt to new insights and continuously enhance the system. Through implementing features in cycles and performing ongoing testing, the team upheld high standards of quality and security throughout the entire project. This methodology was especially appropriate for the complexity of StegoLock, owing to the necessity of integrating various interrelated components—such as AES-GCM encryption, KDF-based key derivation, steganographic embedding, encrypted file segmentation, cloud storage scattering, access control, and a modern web interface—into a single cohesive and evaluated system.
                                                 </p>

                                                 {/* Figure 11: Clickable Image Container */}
                                                 <div className="pt-2">
                                                     <div 
                                                         onClick={() => setFullscreenImage({
                                                             src: '/assets/images/agile_methodology.png',
                                                             alt: 'Agile Methodology Diagram',
                                                             caption: 'Figure 11: Agile Development Methodology for StegoLock'
                                                         })}
                                                         title="Click to view full screen"
                                                         className="relative group/fig cursor-zoom-in border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40 p-2 hover:border-cyber-accent/40 transition-all duration-300"
                                                     >
                                                         <img 
                                                             src="/assets/images/agile_methodology.png" 
                                                             alt="Agile Methodology Diagram" 
                                                             className="max-h-[300px] w-full object-contain hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                                                         />
                                                         <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover/fig:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                             <span className="bg-slate-950/80 border border-cyber-accent/30 text-cyber-accent text-xs font-bold font-mono px-3 py-1.5 rounded-lg shadow-lg">
                                                                 🔍 CLICK TO ENLARGE
                                                             </span>
                                                         </div>
                                                     </div>
                                                     <p className="text-[11px] text-slate-500 mt-2 text-center italic font-medium">
                                                         Figure 11. Agile Methodology
                                                     </p>
                                                 </div>
                                             </div>

                                             {/* Accordion Subsections */}
                                             <div className="space-y-4 pt-2">
                                                 {[
                                                     {
                                                         id: '3.2.1',
                                                         title: 'SPRINT STRUCTURE',
                                                         content: (
                                                             <div className="space-y-3 text-justify">
                                                                 <p className="leading-relaxed">
                                                                     The team organized development into iterative sprints, where each cycle covered requirements gathering, implementation, and rigorous testing of a specific set of features. At the start of each cycle, target user stories were selected from the backlog and estimated for delivery. However, due to time constraints and the complexity of integrating security-critical components—such as KDF key management, steganographic embedding pipelines, and cloud storage scatter mechanisms—sprint durations were adjusted dynamically to ensure each layer was fully validated before subsequent components were built on top of it.
                                                                 </p>
                                                             </div>
                                                         )
                                                     },
                                                     {
                                                         id: '3.2.2',
                                                         title: 'FEATURE DEVELOPMENT PROCESS',
                                                         content: (
                                                             <div className="space-y-3 text-justify">
                                                                 <p className="leading-relaxed">
                                                                     Every feature underwent a uniform engineering pipeline before deployment to production. The process commenced with architectural and requirements review, proceeding through implementation to intensive unit, integration, security, and functional accuracy testing. Code reviews and staging deployments were completed before production promotion, ensuring cryptographic operations, access control, and input validation were verified at every development phase.
                                                                 </p>
                                                             </div>
                                                         )
                                                     },
                                                     {
                                                         id: '3.2.3',
                                                         title: 'TESTING STRATEGY',
                                                         content: (
                                                             <div className="space-y-3 text-justify">
                                                                 <p className="leading-relaxed">
                                                                     The testing strategy validated all four core research objectives. Unit tests verified individual components like AES-GCM encryption, key derivation, and steganographic embedding, while integration tests confirmed correct end-to-end processing from document upload through cloud scattering and retrieval. Security testing focused directly on the reconstruction-dependent security model—confirming that incomplete segments cannot be reassembled and session expiry invalidates key access—supported by usability testing to evaluate interface accessibility.
                                                                 </p>
                                                             </div>
                                                         )
                                                     },
                                                     {
                                                         id: '3.2.4',
                                                         title: 'CONTINUOUS INTEGRATION / CONTINUOUS DEPLOYMENT (CI/CD)',
                                                         content: (
                                                             <div className="space-y-3 text-justify">
                                                                 <p className="leading-relaxed">
                                                                     Changes were deployed to the production environment incrementally as features were completed and verified. This incremental strategy allowed the team to validate each system component in a live environment before proceeding to the next development cycle. Regular unit and integration testing ensured that all functional, security, and usability criteria remained perfectly aligned and stable throughout the engineering lifecycle.
                                                                 </p>
                                                             </div>
                                                         )
                                                     },
                                                     {
                                                         id: '3.2.5',
                                                         title: 'SECURITY-FIRST DEVELOPMENT',
                                                         content: (
                                                             <div className="space-y-3 text-justify">
                                                                 <p className="leading-relaxed">
                                                                     Security was treated as a foundational priority from the beginning of development. Collaborative code reviews focused strictly on cryptographic correctness, key management logic, access control enforcement, and user input validation. This was supported by rigorous manual testing of critical attack scenarios—including key exposure, unauthorized segment access, and session hijacking—and independent audits of security controls.
                                                                 </p>
                                                             </div>
                                                         )
                                                     },
                                                     {
                                                         id: '3.2.6',
                                                         title: 'ITERATIVE REFINEMENT',
                                                         content: (
                                                             <div className="space-y-3 text-justify">
                                                                 <p className="leading-relaxed">
                                                                     Findings from testing and real-world usage were continuously incorporated into the codebase. Profiling results guided the optimization of computationally intensive tasks, including key derivation iterations and steganographic embedding speeds. Cryptographic parameters were reviewed and adjusted dynamically throughout development to ensure StegoLock remained aligned with established security standards.
                                                                 </p>
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
                                         </div>
                                     )}

                                     {activeModal === 'ethical' && (
                                         <div className="space-y-4">
                                             {[
                                                  {
                                                      id: '3.3.1',
                                                      title: 'CORE PURPOSE AND DEVELOPMENT ETHICS',
                                                      content: (
                                                          <div className="space-y-3 text-justify">
                                                              <p className="leading-relaxed">
                                                                  <strong className="text-white">StegoLock</strong> was designed to safeguard sensitive documents against unauthorized access, with a clear ethical mandate that it is not intended to conceal illicit activities. Throughout the development and testing phases, the researchers strictly utilized synthetic data and publicly available test files. Because no actual personal or organizational data was processed during system development, the research process remained low-risk and ethically grounded. The application’s intended use cases are strictly legitimate, focusing on protecting business records, safeguarding personal privacy, and providing a secure channel for authorized information sharing.
                                                              </p>
                                                          </div>
                                                      )
                                                  },
                                                  {
                                                      id: '3.3.2',
                                                      title: 'PRIVACY BY DESIGN',
                                                      content: (
                                                          <div className="space-y-3 text-justify">
                                                              <p className="leading-relaxed">
                                                                  <strong className="text-white">StegoLock</strong> incorporates a "privacy-by-design" architecture, ensuring that cryptographic keys, document contents, and user credentials are never transmitted or stored in plaintext. The system does not persist user passwords; rather, they are utilized solely for the derivation of cryptographic keys. During active sessions, the Master Key and Document Encryption Keys (DEKs) are generated on-demand, reside exclusively in volatile memory, and are immediately purged upon task completion. This approach eliminates the vulnerability of long-term key storage, significantly reducing the attack surface and mitigating the risk of static key store compromises.
                                                              </p>
                                                          </div>
                                                      )
                                                  },
                                                  {
                                                      id: '3.3.3',
                                                      title: 'SECURITY CONTROLS AND RESPONSIBLE USE',
                                                      content: (
                                                          <div className="space-y-3 text-justify">
                                                              <p className="leading-relaxed">
                                                                  To facilitate secure information handling and deter misuse, <strong className="text-white">StegoLock</strong> enforces strict access controls, limiting system functionality entirely to authenticated and authorized users. Furthermore, the system incorporates activity monitoring for document operations, ensuring user accountability. These tracking measures allow system administrators to observe access patterns and identify potential anomalies, ensuring the platform is utilized responsibly and in alignment with its core security objectives.
                                                              </p>
                                                          </div>
                                                      )
                                                  },
                                                  {
                                                      id: '3.3.4',
                                                      title: 'PARTICIPANT PRIVACY AND DATA GOVERNANCE',
                                                      content: (
                                                          <div className="space-y-3 text-justify">
                                                              <p className="leading-relaxed">
                                                                  During the evaluation phase involving <strong className="text-white">30 respondents</strong>, strict ethical guidelines were observed to protect participant privacy. All survey feedback was gathered with informed consent, and responses were anonymized to safeguard the identities of the participants. While StegoLock’s underlying architecture aligns with the core principles of standard data protection frameworks (such as data minimization and encryption-in-transit), the study's deployment environment was strictly governed by the researchers. This ensured a safe, responsible, and highly controlled testing environment throughout the evaluation process.
                                                              </p>
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
                     
                     {/* Fullscreen Image Lightbox Overlay */}
                     {fullscreenImage && (
                          <div 
                              className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-10 cursor-zoom-out animate-fade-in"
                              onClick={() => setFullscreenImage(null)}
                          >
                              <button 
                                  onClick={() => setFullscreenImage(null)}
                                  className="absolute top-6 right-6 size-12 flex items-center justify-center rounded-full bg-slate-900/80 border border-slate-800 hover:bg-cyber-accent hover:text-slate-900 text-white transition-all text-2xl z-[210] cursor-pointer"
                              >
                                  ✕
                              </button>
                              <div className="relative max-w-full max-h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
                                  <img 
                                      src={fullscreenImage.src} 
                                      alt={fullscreenImage.alt} 
                                      className="max-w-[95vw] max-h-[85vh] object-contain rounded-xl border border-slate-800 shadow-2xl shadow-cyan-500/20 cursor-zoom-out"
                                      onClick={() => setFullscreenImage(null)}
                                  />
                                  {fullscreenImage.caption && (
                                      <p className="mt-4 text-slate-300 font-mono text-sm uppercase tracking-wider bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-full shadow-lg">
                                          {fullscreenImage.caption}
                                      </p>
                                  )}
                              </div>
                          </div>
                      )}
                  </div>
              )
        }
    ];
}
