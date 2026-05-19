import React from 'react';
import { 
    Shield, Lock, Unlock, Share2, Trash2, Code, MonitorCheck,
    Key, Database, Layers, ShieldCheck, CheckCircle2, 
    Info, AlertTriangle, Cpu, Globe
} from 'lucide-react';

function Chapter4Slide9Content({ activeModal, setActiveModal }) {
    const [subTab, setSubTab] = React.useState('locking');

    return (
        <div className="h-full flex flex-col justify-center py-2 relative">
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
                {/* Row 1: 3 Cards */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 w-full">
                    {/* Card 1: Authentication & Access Control */}
                    <div 
                        onClick={() => setActiveModal('chapter4-obj3-auth')}
                        className="w-full lg:w-[17rem] h-36 glass-panel p-5 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                    >
                        <Lock className="size-6 text-slate-400 dark:text-slate-500 group-hover/card:text-cyber-accent transition-colors duration-300 mb-2" />
                        <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                            Authentication &amp; <br />Access Control
                        </h3>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mt-1">
                            Click to Inspect
                        </span>
                    </div>

                    {/* Card 1.5: Document Locking & Unlocking */}
                    <div 
                        onClick={() => setActiveModal('chapter4-obj3-lock-unlock')}
                        className="w-full lg:w-[17rem] h-36 glass-panel p-5 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                    >
                        <div className="flex gap-1.5 mb-2">
                            <Lock className="size-5 text-slate-400 dark:text-slate-500 group-hover/card:text-cyber-accent transition-colors duration-300" />
                            <Unlock className="size-5 text-slate-400 dark:text-slate-500 group-hover/card:text-cyber-accent transition-colors duration-300" />
                        </div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                            Document Locking <br />&amp; Unlocking
                        </h3>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mt-1">
                            Click to Inspect
                        </span>
                    </div>

                    {/* Card 2: Sharing Functionality */}
                    <div 
                        onClick={() => setActiveModal('chapter4-obj3-sharing')}
                        className="w-full lg:w-[17rem] h-36 glass-panel p-5 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                    >
                        <Share2 className="size-6 text-slate-400 dark:text-slate-500 group-hover/card:text-cyber-accent transition-colors duration-300 mb-2" />
                        <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                            Sharing <br />Functionality
                        </h3>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mt-1">
                            Click to Inspect
                        </span>
                    </div>
                </div>

                {/* Row 2: 3 Cards */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 w-full">
                    {/* Card 3: File Deletion */}
                    <div 
                        onClick={() => setActiveModal('chapter4-obj3-deletion')}
                        className="w-full lg:w-[17rem] h-36 glass-panel p-5 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                    >
                        <Trash2 className="size-6 text-slate-400 dark:text-slate-500 group-hover/card:text-cyber-accent transition-colors duration-300 mb-2" />
                        <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                            File <br />Deletion
                        </h3>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mt-1">
                            Click to Inspect
                        </span>
                    </div>

                    {/* Card 4: Web Development */}
                    <div 
                        onClick={() => setActiveModal('chapter4-obj3-webdev')}
                        className="w-full lg:w-[17rem] h-36 glass-panel p-5 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                    >
                        <Code className="size-6 text-slate-400 dark:text-slate-500 group-hover/card:text-cyber-accent transition-colors duration-300 mb-2" />
                        <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                            Web <br />Development
                        </h3>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mt-1">
                            Click to Inspect
                        </span>
                    </div>

                    {/* Card 5: Local Device vs Hosted Environment */}
                    <div 
                        onClick={() => setActiveModal('chapter4-obj3-env')}
                        className="w-full lg:w-[17rem] h-36 glass-panel p-5 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                    >
                        <MonitorCheck className="size-6 text-slate-400 dark:text-slate-500 group-hover/card:text-cyber-accent transition-colors duration-300 mb-2" />
                        <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                            Local Device vs <br />Hosted Environment
                        </h3>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mt-1">
                            Click to Inspect
                        </span>
                    </div>
                </div>
            </div>

            {/* Modal 1: Authentication & Access Control */}
            {activeModal === 'chapter4-obj3-auth' && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent text-left animate-fade-in"
                    onClick={() => setActiveModal(null)}
                >
                    <div 
                        className="bg-slate-900/95 border border-cyber-accent/40 w-full max-w-4xl p-6 sm:p-8 rounded-[2.5rem] relative shadow-2xl shadow-cyan-500/20 animate-scale-up-modal flex flex-col max-h-[85vh] overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-xl z-10 font-bold"
                        >
                            ✕
                        </button>

                        <div className="flex items-center gap-4 border-b border-slate-800 pb-5 shrink-0 mb-6">
                            <div className="size-14 rounded-2xl bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/5">
                                <Lock className="size-7 text-cyber-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Authentication &amp; Access Control</h2>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-300 scrollbar-thin">
                            <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-medium">
                                StegoLock implements a dual-tier identity hardening and session key protection system. By separating authentication from document encryption and wrapping keys in transient memory, the system achieves a strong zero-trust security architecture.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Column 1 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                                        <Key className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Double-Round PBKDF2</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Algorithm:</span> SHA-256 KDF</p>
                                        <p><span className="text-slate-500 font-bold">Iterations:</span> 100,000 per Round</p>
                                        <p><span className="text-slate-500 font-bold">Salt:</span> 16-Byte Cryptographic Salt</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            <span className="text-slate-200 font-semibold">Round 1</span> derives the `$password_derivedKey` for login authentication. <span className="text-slate-200 font-semibold">Round 2</span> derives the `$encryption_key` utilized solely to encrypt/decrypt the user's Master Key, preventing key re-use.
                                        </p>
                                    </div>
                                </div>

                                {/* Column 2 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                                        <Database className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Volatile Redis Cache</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Key Storage:</span> RAM (Volatile Cache)</p>
                                        <p><span className="text-slate-500 font-bold">Provider:</span> Redis Temporary Cache</p>
                                        <p><span className="text-slate-500 font-bold">Mechanism:</span> TemporaryKeyStorage</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            The plaintext Master Key is decrypted on login, cached in Redis via a temporary session token, and never written to persistent disk storage. It is automatically purged from memory upon logout or session inactivity.
                                        </p>
                                    </div>
                                </div>

                                {/* Column 3 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                                        <Layers className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Role-Based Access</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Controller:</span> AuthController.php</p>
                                        <p><span className="text-slate-500 font-bold">Route Security:</span> Laravel Middleware Pipeline</p>
                                        <p><span className="text-slate-500 font-bold">Verification:</span> Direct URL Interception</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            Laravel's `auth` middleware intercepts direct URL manipulation to isolate data and prevent cross-account leaks. Authenticated sessions gate the `CryptoService` which mediates all cryptographic operations.
                                        </p>
                                    </div>
                                </div>
                            </div>

                             {/* Technical Breakdown */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-3xl space-y-2">
                                     <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                                         <ShieldCheck className="size-4 text-cyber-accent" /> Security Verification Summary
                                     </h5>
                                     <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                         Registration passwords are hashed using cryptographically secure one-way hashes via `AuthController.php`. The operationalized AES-256-GCM keys are retrieved securely through `CryptoService` only within active, verified authenticated sessions, blocking all unauthorized extraction attempts.
                                     </p>
                                 </div>

                                 <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-3xl space-y-2">
                                     <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                                         <Globe className="size-4 text-purple-400" /> Web Entry Gateways
                                     </h5>
                                     <div className="text-xs text-slate-400 leading-relaxed space-y-2 font-medium">
                                         <p>
                                             <span className="text-slate-200 font-semibold">Registration:</span> Enforces robust client-side inputs and hashes credentials through safe cryptographic one-way logic before persistent MySQL database storage.
                                         </p>
                                         <p>
                                             <span className="text-slate-200 font-semibold">Login Gateway:</span> Validates credentials, spawns a secure session, and redirects to dashboards, returning generic error codes to deny username enumeration.
                                         </p>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 1.5: Document Locking & Unlocking */}
            {activeModal === 'chapter4-obj3-lock-unlock' && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent text-left animate-fade-in"
                    onClick={() => setActiveModal(null)}
                >
                    <div 
                        className="bg-slate-900/95 border border-cyber-accent/40 w-full max-w-4xl p-6 sm:p-8 rounded-[2.5rem] relative shadow-2xl shadow-cyan-500/20 animate-scale-up-modal flex flex-col max-h-[85vh] overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-xl z-10 font-bold"
                        >
                            ✕
                        </button>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 shrink-0 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="size-14 rounded-2xl bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/5">
                                    {subTab === 'locking' ? <Lock className="size-7 text-cyber-accent animate-pulse" /> : <Unlock className="size-7 text-cyber-accent animate-pulse" />}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-white tracking-tight">Document Locking &amp; Unlocking</h2>
                                </div>
                            </div>

                            {/* Tab Switcher */}
                            <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-850 shrink-0 self-start sm:self-center">
                                <button
                                    onClick={() => setSubTab('locking')}
                                    className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 ${
                                        subTab === 'locking'
                                            ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-900/55'
                                    }`}
                                >
                                    Locking Pipeline
                                </button>
                                <button
                                    onClick={() => setSubTab('unlocking')}
                                    className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 ${
                                        subTab === 'unlocking'
                                            ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-900/55'
                                    }`}
                                >
                                    Unlocking Pipeline
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-300 scrollbar-thin">
                            {subTab === 'locking' ? (
                                <>
                                    <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-medium">
                                        The **Document Locking Process** defines the forward transformation from a plaintext document into a secured, physical-isolated reconstruction-dependent state.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Card 1 */}
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
                                            <div className="size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                                                <Shield className="size-6 animate-pulse" />
                                            </div>
                                            <h4 className="text-lg font-black text-white mb-2">Phase A: Cryptographic Transformation</h4>
                                            <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                                <p><span className="text-slate-500 font-bold">Step 1:</span> Payload Compression</p>
                                                <p><span className="text-slate-500 font-bold">Step 2:</span> Generate Unique DEK Key</p>
                                                <p><span className="text-slate-500 font-bold">Step 3:</span> AES-256-GCM + Master Wrap</p>
                                                <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                                    Compresses the document to minimize its footprint, encrypts the payload using a unique Document Encryption Key (DEK) via AES-256-GCM, and securely wraps the DEK using the active session's Master Key.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 2 */}
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                                            <div className="size-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                                                <Layers className="size-6 animate-pulse" />
                                            </div>
                                            <h4 className="text-lg font-black text-white mb-2">Phase B: Steganographic Obfuscation</h4>
                                            <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                                <p><span className="text-slate-500 font-bold">Media Pool:</span> PNG, WAV, TXT covers</p>
                                                <p><span className="text-slate-500 font-bold">Capacity:</span> 2% or 15% safety threshold</p>
                                                <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                                    Segments the resulting ciphertext into fragments and embeds them into Least Significant Bits (LSB) of diverse cover media provided by the system, ensuring visual/audio/textual medium integrity.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 3 */}
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                                            <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                                                <Database className="size-6 animate-pulse" />
                                            </div>
                                            <h4 className="text-lg font-black text-white mb-2">Phase C: Storage and Mapping</h4>
                                            <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                                <p><span className="text-slate-500 font-bold">Component 2:</span> Stego Map blueprint</p>
                                                <p><span className="text-slate-500 font-bold">Component 3:</span> Distributed Stego Files</p>
                                                <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                                    Constructs the Stego Map reassembly blueprint in the local database while scattering the resulting Stego files into a remote cloud bucket, separating the blueprint from hidden fragments.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Backend Implementation Details */}
                                    <div className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                                                <Cpu className="size-4.5 animate-pulse" />
                                            </div>
                                            <h5 className="text-sm font-black text-white uppercase tracking-wider">
                                                Backend Engine Execution Sequence (`ProcessSteganoJob`)
                                            </h5>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold tracking-wide text-slate-400 leading-relaxed pl-1">
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-2.5">
                                                    <div className="text-cyan-400 font-black shrink-0">01.</div>
                                                    <p>
                                                        <span className="text-slate-200">Job Initialization:</span> Frontend dispatches payload upload to backend, queuing the background worker job: <code className="text-cyan-300 font-bold bg-slate-900 px-1 py-0.5 rounded text-[10px]">ProcessSteganoJob</code>. Status updates from <span className="text-yellow-400">Processing</span> to <span className="text-emerald-400">Locked</span> upon complete scatter.
                                                    </p>
                                                </div>
                                                <div className="flex items-start gap-2.5">
                                                    <div className="text-cyan-400 font-black shrink-0">02.</div>
                                                    <p>
                                                        <span className="text-slate-200">Segment Generation:</span> Ciphertext splits into small segments uniquely mapped using randomized UUID tags. Fragment relational metadata records are committed to local MySQL <code className="text-purple-300 font-bold bg-slate-900 px-1 py-0.5 rounded text-[10px]">FragmentMap</code> indexes.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-2.5">
                                                    <div className="text-cyan-400 font-black shrink-0">03.</div>
                                                    <p>
                                                        <span className="text-slate-200">Steganographic Injection:</span> Subprocesses invoke specialized Python scripts, injecting segment fragments into active carrier RGB files, strictly validating cover sizes against a 15% margin to prevent visual anomalies.
                                                    </p>
                                                </div>
                                                <div className="flex items-start gap-2.5">
                                                    <div className="text-cyan-400 font-black shrink-0">04.</div>
                                                    <p>
                                                        <span className="text-slate-200">Segmented Cloud Storage:</span> Stego cover files upload in parallel to Backblaze B2 buckets via <code className="text-emerald-300 font-bold bg-slate-900 px-1 py-0.5 rounded text-[10px]">B2Service</code>. Physical separation separates database coordinates (<code className="text-slate-300 bg-slate-900 px-1 rounded">StegoMap</code>) from the cloud-scattered segments.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* UX Operability & Defensive Validation Block */}
                                    <div className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                                                <Globe className="size-4.5" />
                                            </div>
                                            <h5 className="text-sm font-black text-white uppercase tracking-wider">
                                                UX Operability &amp; Defensive Validation Framework
                                            </h5>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-semibold tracking-wide text-slate-400 leading-relaxed pl-1">
                                            <div className="space-y-2">
                                                <h6 className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                                    <CheckCircle2 className="size-3.5 text-cyan-400" /> One-Click Abstraction
                                                </h6>
                                                <p className="text-[11px] font-normal leading-relaxed text-slate-400">
                                                    Prioritizes user operability by abstracting complex, heavyweight multi-stage cryptographic and steganographic pipelines behind a streamlined, intuitive "One-Click" dashboard interaction flow.
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <h6 className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                                    <AlertTriangle className="size-3.5 text-yellow-400" /> Size &amp; Format Guardrails
                                                    </h6>
                                                <p className="text-[11px] font-normal leading-relaxed text-slate-400">
                                                    Enforces defensive inputs inside <code className="text-indigo-300 font-bold bg-slate-900 px-1 py-0.5 rounded text-[10px]">UploadModal.jsx</code> by validating file formats (strictly accepting <code className="text-slate-300 bg-slate-900 px-1">PDF, DOCX, TXT</code> only) and capping sizes at a rigid <code className="text-slate-300 bg-slate-900 px-1">5MB</code> limit.
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <h6 className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                                    <Info className="size-3.5 text-purple-400" /> Guide &amp; Reactive Toasts
                                                </h6>
                                                <p className="text-[11px] font-normal leading-relaxed text-slate-400">
                                                    Binds active background updates to a real-time, event-driven "Evaluator Guide" and instant toast alerts, keeping the user informed of active tasks and status completion without friction.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Summary Footer */}
                                    <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-3xl space-y-2">
                                        <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-cyber-accent" /> Document Protection Realized
                                        </h5>
                                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                            This three-phase forward transformation compresses, encrypts, segments, embeds, and distributes files to ensure robust multi-layered protection in accordance with StegoLock's security model.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-medium">
                                        The **Document Retrieval Process** operates entirely around data reconstruction: validation, parallel extraction, and mathematical cryptographic reversal.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Card 1 */}
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
                                            <div className="size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                                                <Database className="size-6 animate-pulse" />
                                            </div>
                                            <h4 className="text-lg font-black text-white mb-2">Phase A: Retrieval and Extraction</h4>
                                            <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                                <p><span className="text-slate-500 font-bold">Validate:</span> Active session Master Key</p>
                                                <p><span className="text-slate-500 font-bold">Blueprint:</span> Retrieve Stego Map</p>
                                                <p><span className="text-slate-500 font-bold">Extraction:</span> LSB extraction from stego files</p>
                                                <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                                    Confirms authority via the Master Key, queries the local DB to load the Stego Map blueprint, downloads stego files concurrently from B2 cloud buckets, and extracts the hidden ciphertext fragments.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 2 */}
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                                            <div className="size-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                                                <Layers className="size-6 animate-pulse" />
                                            </div>
                                            <h4 className="text-lg font-black text-white mb-2">Phase B: Ciphertext Reassembly</h4>
                                            <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                                <p><span className="text-slate-500 font-bold">Indexing:</span> Stego Map coordinates</p>
                                                <p><span className="text-slate-500 font-bold">Organize:</span> Ordered fragment array</p>
                                                <p><span className="text-slate-500 font-bold">Output:</span> Contiguous ciphertext stream</p>
                                                <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                                    Guided by the Stego Map blueprint indexing data, the reassembly engine organizes the scattered fragments in their exact original sequence to reconstruct the unified ciphertext.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 3 */}
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                                            <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                                                <ShieldCheck className="size-6 animate-pulse" />
                                            </div>
                                            <h4 className="text-lg font-black text-white mb-2">Phase C: Cryptographic Reversal</h4>
                                            <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                                <p><span className="text-slate-500 font-bold">Step 1:</span> Unwrap internal document key</p>
                                                <p><span className="text-slate-500 font-bold">Step 2:</span> AES-256-GCM decryp + check</p>
                                                <p><span className="text-slate-500 font-bold">Step 3:</span> Decompress strictly in RAM</p>
                                                <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                                    Unwraps the DEK using the session Master Key, decrypts ciphertext, validates integrity, and decompresses the payload strictly within temporary memory. The clean file is delivered directly to the user for download without server trace.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Backend Implementation Details */}
                                    <div className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                                                <Cpu className="size-4.5 animate-pulse" />
                                            </div>
                                            <h5 className="text-sm font-black text-white uppercase tracking-wider">
                                                Backend Engine Execution Sequence (`ProcessUnlockJob`)
                                            </h5>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold tracking-wide text-slate-400 leading-relaxed pl-1">
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-2.5">
                                                    <div className="text-purple-400 font-black shrink-0">01.</div>
                                                    <p>
                                                        <span className="text-slate-200">Fetch Coordination:</span> The backend schedules <code className="text-cyan-300 font-bold bg-slate-900 px-1 py-0.5 rounded text-[10px]">ProcessUnlockJob</code>, queries the database for the active <code className="text-slate-300 bg-slate-900 px-1 rounded">StegoMap</code> blueprint, and fetches independent stego-files concurrently from Backblaze B2 storage.
                                                    </p>
                                                </div>
                                                <div className="flex items-start gap-2.5">
                                                    <div className="text-purple-400 font-black shrink-0">02.</div>
                                                    <p>
                                                        <span className="text-slate-200">Segment Extraction:</span> Invokes <code className="text-purple-300 font-bold bg-slate-900 px-1 py-0.5 rounded text-[10px]">batch_processor.py</code> via high-speed subprocess pipelines, reading embedded Least Significant Bits from media to extract hidden segments.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-2.5">
                                                    <div className="text-purple-400 font-black shrink-0">03.</div>
                                                    <p>
                                                        <span className="text-slate-200">SHA-256 Verification:</span> Validates each fragment against pre-calculated <span className="text-slate-200">SHA-256 checksums</span> to guarantee pristine integrity and detect third-party visual or bitwise carrier modification prior to reassembly.
                                                    </p>
                                                </div>
                                                <div className="flex items-start gap-2.5">
                                                    <div className="text-purple-400 font-black shrink-0">04.</div>
                                                    <p>
                                                        <span className="text-slate-200">Streaming Reassembly:</span> Organizes segments via a memory-efficient streaming method, reassembling ciphertext in exact order, decrypting via <code className="text-emerald-300 font-bold bg-slate-900 px-1 py-0.5 rounded text-[10px]">CryptoService</code>, and prompting lossless download in transient memory.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* UX Operability & Defensive Validation Block */}
                                    <div className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                                                <Globe className="size-4.5" />
                                            </div>
                                            <h5 className="text-sm font-black text-white uppercase tracking-wider">
                                                UX Operability &amp; Defensive Validation Framework
                                            </h5>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-semibold tracking-wide text-slate-400 leading-relaxed pl-1">
                                            <div className="space-y-2">
                                                <h6 className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                                    <CheckCircle2 className="size-3.5 text-cyan-400" /> One-Click Abstraction
                                                </h6>
                                                <p className="text-[11px] font-normal leading-relaxed text-slate-400">
                                                    Prioritizes user operability by abstracting complex, heavyweight multi-stage cryptographic and steganographic pipelines behind a streamlined, intuitive "One-Click" dashboard interaction flow.
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <h6 className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                                    <AlertTriangle className="size-3.5 text-yellow-400" /> Size &amp; Format Guardrails
                                                    </h6>
                                                <p className="text-[11px] font-normal leading-relaxed text-slate-400">
                                                    Enforces defensive inputs inside <code className="text-indigo-300 font-bold bg-slate-900 px-1 py-0.5 rounded text-[10px]">UploadModal.jsx</code> by validating file formats (strictly accepting <code className="text-slate-300 bg-slate-900 px-1">PDF, DOCX, TXT</code> only) and capping sizes at a rigid <code className="text-slate-300 bg-slate-900 px-1">5MB</code> limit.
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <h6 className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                                    <Info className="size-3.5 text-purple-400" /> Guide &amp; Reactive Toasts
                                                </h6>
                                                <p className="text-[11px] font-normal leading-relaxed text-slate-400">
                                                    Binds active background updates to a real-time, event-driven "Evaluator Guide" and instant toast alerts, keeping the user informed of active tasks and status completion without friction.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Summary Footer */}
                                    <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-3xl space-y-2">
                                        <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-cyber-accent" /> Zero-Trace Retrieval Success
                                        </h5>
                                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                            This three-phase mathematical reversal fetches, reassembles, and decrypts payloads entirely in volatile memory, ensuring pristine data recovery without leaving persistent traces.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 2: Sharing Functionality */}
            {activeModal === 'chapter4-obj3-sharing' && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent text-left animate-fade-in"
                    onClick={() => setActiveModal(null)}
                >
                    <div 
                        className="bg-slate-900/95 border border-cyber-accent/40 w-full max-w-4xl p-6 sm:p-8 rounded-[2.5rem] relative shadow-2xl shadow-cyan-500/20 animate-scale-up-modal flex flex-col max-h-[85vh] overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-xl z-10 font-bold"
                        >
                            ✕
                        </button>

                        <div className="flex items-center gap-4 border-b border-slate-800 pb-5 shrink-0 mb-6">
                            <div className="size-14 rounded-2xl bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/5">
                                <Share2 className="size-7 text-cyber-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Sharing Functionality &amp; Key Re-Wrapping</h2>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-300 scrollbar-thin">
                            <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-medium">
                                StegoLock provides a controlled document-sharing mechanism that enables owners to grant read access to other registered users by creating permission records in the MySQL database, keeping the original uploader's ownership intact.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Column 1 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                                        <Share2 className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Asymmetric Access</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Owner View:</span> Sharing Panel &amp; Revocation</p>
                                        <p><span className="text-slate-500 font-bold">Shared User:</span> Read-Only Unlock (No Deletes)</p>
                                        <p><span className="text-slate-500 font-bold">Control:</span> In MyDocuments Dashboard</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            The document owner gets active share lists and immediate revocation controls, while the shared user only sees the unlock button without sharing, deletion, or ownership access.
                                        </p>
                                    </div>
                                </div>

                                {/* Column 2 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                                        <Key className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Cryptographic Handover</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Step 1:</span> Unwrap with Owner Master Key</p>
                                        <p><span className="text-slate-500 font-bold">Step 2:</span> Wrap with System Share Key</p>
                                        <p><span className="text-slate-500 font-bold">Step 3:</span> Re-wrap with Recipient Key</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            To maintain strict account isolation, the owner decrypts the DEK. The system wraps it with a transient System Share Key for transport, saving a pending record. Upon acceptance, the recipient's Master Key encrypts it.
                                        </p>
                                    </div>
                                </div>

                                {/* Column 3 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                                        <Layers className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Zero-Copy Efficiency</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Cloud Actions:</span> None (No file duplicate)</p>
                                        <p><span className="text-slate-500 font-bold">Performance Cost:</span> Negligible (&lt;10ms)</p>
                                        <p><span className="text-slate-500 font-bold">Traffic:</span> Local database metadata only</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            This protocol updates key wrapper metadata records in the database. The actual stego files remain untouched in cloud storage, saving bandwidth and computing resources compared to decrypting and re-steganographing the carrier files.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Flow Alert */}
                            <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-3xl space-y-2">
                                <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                                    <Info className="size-4 text-cyber-accent" /> Security Revocation &amp; Denial Validation
                                </h5>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    Access control policies prevent unauthorized decryption. A user attempting to unlock without permission receives an access denied response. Active sharing sessions instantly terminate upon revocation, ensuring real-time security.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 3: File Deletion */}
            {activeModal === 'chapter4-obj3-deletion' && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent text-left animate-fade-in"
                    onClick={() => setActiveModal(null)}
                >
                    <div 
                        className="bg-slate-900/95 border border-cyber-accent/40 w-full max-w-4xl p-6 sm:p-8 rounded-[2.5rem] relative shadow-2xl shadow-cyan-500/20 animate-scale-up-modal flex flex-col max-h-[85vh] overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-xl z-10 font-bold"
                        >
                            ✕
                        </button>

                        <div className="flex items-center gap-4 border-b border-slate-800 pb-5 shrink-0 mb-6">
                            <div className="size-14 rounded-2xl bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/5">
                                <Trash2 className="size-7 text-cyber-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Cascading &amp; Cloud-Safe File Deletion</h2>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-300 scrollbar-thin">
                            <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-medium">
                                StegoLock enforces a strict <span className="text-cyber-accent font-bold">&quot;cloud-first&quot;</span> deletion rule: Stego Files are completely purged from cloud storage first. Only after successful cloud confirmation does the Persistence Layer purge the Stego Map and database document records.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Column 1 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                                        <AlertTriangle className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Space Management</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Quota Limit:</span> 225 MB per user</p>
                                        <p><span className="text-slate-500 font-bold">Monitor:</span> Profile storage page</p>
                                        <p><span className="text-slate-500 font-bold">Scope:</span> Locked files</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            The Profile Page shows aggregate storage sizes relative to total allocated space, ensuring informed user decisions prior to execution.
                                        </p>
                                    </div>
                                </div>

                                {/* Column 2 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                                        <Trash2 className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Cloud-First Deletion</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Step 1:</span> connect to Storage Layer</p>
                                        <p><span className="text-slate-500 font-bold">Step 2:</span> delete independent objects</p>
                                        <p><span className="text-slate-500 font-bold">Step 3:</span> confirm cloud files are gone</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            The Application Logic Layer triggers programmatic deletion of distributed B2 fragments before altering local data, eliminating orphaned cloud objects.
                                        </p>
                                    </div>
                                </div>

                                {/* Column 3 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                                        <Database className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Persistence Layer Wipe</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Step 4:</span> wipe local metadata mapping</p>
                                        <p><span className="text-slate-500 font-bold">Step 5:</span> relational cascade cleanup</p>
                                        <p><span className="text-slate-500 font-bold">Database Table:</span> StegoMap, documents, etc.</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            Once cloud deletion is fully verified, the Persistence Layer removes the Stego Map and document records, maintaining perfect integrity.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Flow Summary */}
                            <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-3xl space-y-2">
                                <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-cyber-accent" /> Ordered Execution Guarantee
                                </h5>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    Deleting in this specific ordered sequence guarantees that all fragment data is completely wiped out without leaving broken metadata dependencies or leftover storage leakage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 4: Web Development */}
            {activeModal === 'chapter4-obj3-webdev' && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent text-left animate-fade-in"
                    onClick={() => setActiveModal(null)}
                >
                    <div 
                        className="bg-slate-900/95 border border-cyber-accent/40 w-full max-w-4xl p-6 sm:p-8 rounded-[2.5rem] relative shadow-2xl shadow-cyan-500/20 animate-scale-up-modal flex flex-col max-h-[85vh] overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-xl z-10 font-bold"
                        >
                            ✕
                        </button>

                        <div className="flex items-center gap-4 border-b border-slate-800 pb-5 shrink-0 mb-6">
                            <div className="size-14 rounded-2xl bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/5">
                                <Code className="size-7 text-cyber-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Web Platform &amp; Integration Stack</h2>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-300 scrollbar-thin">
                            <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-medium">
                                StegoLock integrates <span className="text-cyber-accent font-bold">Backblaze B2</span> object storage via Laravel's filesystem abstraction layer and an S3-compatible driver, mapping file fragments using the `StegoMap` and `StegoFile` database tables to prevent single-fragment interception leaks.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                 {/* Column 1 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                                        <Cpu className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Platform Capacities</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Global Storage Limit:</span> 10 GB Cloud Pool</p>
                                        <p><span className="text-slate-500 font-bold">User Limit:</span> 225 MB user quota</p>
                                        <p><span className="text-slate-500 font-bold">Safety Threshold:</span> 2% and/or 15% payload margin</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            Limits are enforced before upload transactions. The 2% and/or 15% payload margin ensures hidden payloads never perceptibly degrade the cover medium.
                                        </p>
                                    </div>
                                </div>

                                 {/* Column 2: Development Tech Stack */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-blue-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                                        <Code className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Development Stack</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Frontend:</span> React + Inertia.js (SPA)</p>
                                        <p><span className="text-slate-500 font-bold">Backend:</span> Laravel (PHP 8.4)</p>
                                        <p><span className="text-slate-500 font-bold">Database:</span> Managed MySQL (`stegolock_app`)</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            Integrates a modern single-page-application interface powered by Inertia.js, facilitating quick reactive rendering and secure relational database schema models in MySQL.
                                        </p>
                                    </div>
                                </div>

                                {/* Column 3 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                                        <Key className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Cloud Credentials</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Driver:</span> S3-Compatible Object Driver</p>
                                        <p><span className="text-slate-500 font-bold">B2 Config:</span> Env variables (No DB storage)</p>
                                        <p><span className="text-slate-500 font-bold">Custom Credentials:</span> CloudAccount model</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            Primary Backblaze B2 credentials are secure environment variables. Only secondary custom cloud accounts are stored in the database, with sensitive keys encrypted via Laravel's Crypt service to prevent leak hazards.
                                        </p>
                                    </div>
                                </div>

                                {/* Column 4 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                                        <Database className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">API: B2Service.php</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Auth:</span> `getAuth()` Cached (3500s)</p>
                                        <p><span className="text-slate-500 font-bold">Concurrency:</span> 5 simultaneous slots</p>
                                        <p><span className="text-slate-500 font-bold">Guzzle Pools:</span> Batch upload/fetch/delete</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            Guzzle pools manage parallel transfers with auto-retries for `auth_token_limit` errors. `listAllFiles()` pagination enumerates bucket records safely.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Flow Alert */}
                            <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-3xl space-y-2">
                                <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                                    <Info className="size-4 text-cyber-accent" /> Programmatic Operations in B2Service
                                </h5>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    `B2Service.php` acts as the primary gateway, providing single upload integrity via SHA-1 checks (`uploadFile`), robust batch cloud transfers (`storeFilesBatch`, `fetchFilesBatch`), clean concurrent deletions (`deleteFilesBatch`), and diagnostic calls (`getFileInfo`, `findFileByName`).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 5: Local Device vs Hosted Environment */}
            {activeModal === 'chapter4-obj3-env' && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent text-left animate-fade-in"
                    onClick={() => setActiveModal(null)}
                >
                    <div 
                        className="bg-slate-900/95 border border-cyber-accent/40 w-full max-w-4xl p-6 sm:p-8 rounded-[2.5rem] relative shadow-2xl shadow-cyan-500/20 animate-scale-up-modal flex flex-col max-h-[85vh] overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-xl z-10 font-bold"
                        >
                            ✕
                        </button>

                        <div className="flex items-center gap-4 border-b border-slate-800 pb-5 shrink-0 mb-6">
                            <div className="size-14 rounded-2xl bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/5">
                                <MonitorCheck className="size-7 text-cyber-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Local Device vs. Hosted Environment</h2>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-300 scrollbar-thin">
                            <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-medium">
                                StegoLock is deployed in cloud production on **Railway** at <a href="https://stegolock-production.up.railway.app" target="_blank" rel="noopener noreferrer" className="text-cyber-accent hover:underline font-bold">stegolock-production.up.railway.app</a>. The containerized stack runs **PHP 8.2** and **Node.js 22** on a US West region instance.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 {/* Column 1 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                                        <Globe className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Automated CI/CD</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Hosted Platform:</span> Railway PaaS Cloud</p>
                                        <p><span className="text-slate-500 font-bold">Pipeline:</span> GitHub Branch Integration</p>
                                        <p><span className="text-slate-500 font-bold">Build Mode:</span> Continuous Deployment</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            Every commit pushed to the main branch automatically triggers automated builds and deployments, promoting features like cloud integrity audits seamlessly to production.
                                        </p>
                                    </div>
                                </div>

                                {/* Column 2 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                                        <Cpu className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">MySQL Schema</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">DB Name:</span> `stegolock_app` MySQL</p>
                                        <p><span className="text-slate-500 font-bold">Parity:</span> 100% Migration Success</p>
                                        <p><span className="text-slate-500 font-bold">Status:</span> Fully Managed Instance</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal flex-1">
                                            Maintains relational schema including `activity_logs`, `documents`, `document_segments`, `fragment_metadata`, `fragments`, `cloud_accounts`, `folder_shares`, `folders`, `covers`, and `notifications`.
                                        </p>
                                    </div>
                                </div>

                                {/* Column 3 */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                                        <AlertTriangle className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Metrics &amp; Audits</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Locking Delay:</span> 12.9s Average</p>
                                        <p><span className="text-slate-500 font-bold">Unlocking Delay:</span> 2.3s Average</p>
                                        <p><span className="text-slate-500 font-bold">Cloud Auditing:</span> Backblaze integrity check</p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            Verifies production capability. Additional features like Multi-Account Management, administrative table inspectors, and rollbacks ensure secure, continuous uptime.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Flow Alert */}
                            <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-3xl space-y-2">
                                <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-cyber-accent" /> Objective 3 Realization
                                </h5>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    The live production environment on Railway serves as conclusive, operational evidence that all integrated encryption, stego mapping, B2 cloud fragments, sharing mechanisms, and session middleware operate cohesively as a single secure platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Keyframe Animations */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes scale-up-modal {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                .animate-scale-up-modal {
                    animation: scale-up-modal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: rgba(0,0,0,0.1);
                    border-radius: 9999px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 9999px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.2);
                    border-radius: 9999px;
                }
            `}} />
        </div>
    );
}

export function getChapter4Slide9({ activeModal, setActiveModal }) {
    return [
        // Slide 9: Findings of the Study (Objective 3)
        {
            title: "Chapter 4",
            subtitle: "Objective 3: Platform Architecture & Core Features",
            content: <Chapter4Slide9Content activeModal={activeModal} setActiveModal={setActiveModal} />
        }
    ];
}
