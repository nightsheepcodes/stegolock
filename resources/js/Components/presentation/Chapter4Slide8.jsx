import React, { useState, useEffect } from 'react';
import { 
    Shield, Lock, Image, Volume2, FileText, FileDigit, Cloud,
    ChevronLeft, ChevronRight, CheckCircle2, Cpu, Database, 
    ArrowRight, Info
} from 'lucide-react';

function Chapter4Slide8Content({ activeModal, setActiveModal }) {
    const [modalPage, setModalPage] = useState(1);

    // Reset pagination page when modal is closed or changes
    useEffect(() => {
        if (activeModal !== 'chapter4-segmentation-lsb') {
            setModalPage(1);
        }
    }, [activeModal]);

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

                    {/* Node 1: Cover Selection (Left) */}
                    <div 
                        onClick={() => setActiveModal('chapter4-cover-selection')}
                        className="relative z-10 flex flex-col items-center cursor-pointer group/node"
                    >
                        {/* The Central Payload Container */}
                        <div className="relative group-hover/node:scale-105 transition-transform duration-300">
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
                            <div className="size-20 sm:size-24 rounded-2xl bg-[#f8fafc] dark:bg-slate-900 border-2 border-cyber-accent/50 shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center relative animate-pulse-slow z-10 group-hover/node:border-cyber-accent group-hover/node:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all duration-300">
                                <FileDigit className="size-10 sm:size-12 text-cyber-accent" />
                                <div className="absolute -bottom-2 -right-2 size-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg">
                                    <Lock className="size-4 text-white" />
                                </div>
                            </div>
                        </div>
                        <span className="absolute -bottom-12 font-black text-[10px] sm:text-xs uppercase tracking-widest text-slate-700 dark:text-slate-300 text-center whitespace-nowrap group-hover/node:text-cyber-accent transition-colors duration-300">
                            Cover Selection
                            <span className="block text-[8px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/node:opacity-100 transition-opacity duration-300">
                                Click to Inspect
                            </span>
                        </span>
                    </div>

                    {/* Node 2: Segmentation Engine (Center) */}
                    <div 
                        onClick={() => setActiveModal('chapter4-segmentation-lsb')}
                        className="relative z-10 flex flex-col items-center h-full justify-center cursor-pointer group/node"
                    >
                        {/* The Central Engine Node */}
                        <div className="size-28 sm:size-36 flex items-center justify-center relative z-20 group-hover/node:scale-105 transition-transform duration-300">
                            {/* Backdrop for the Engine */}
                            <div className="absolute inset-0 rounded-full bg-white/5 dark:bg-cyber-surface/5 backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.15)] group-hover/node:bg-cyber-accent/5 group-hover/node:shadow-[0_0_35px_rgba(34,211,238,0.25)] transition-all duration-300 z-0" />
                            
                            {/* Orbital Data Ring */}
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

                        <span className="absolute bottom-4 sm:bottom-8 font-black text-[10px] sm:text-xs uppercase tracking-widest text-slate-700 dark:text-slate-300 text-center leading-tight whitespace-nowrap group-hover/node:text-cyber-accent transition-colors duration-300">
                            Segmentation<br/>& LSB Embedding
                            <span className="block text-[8px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 mt-1">
                                Click to Inspect
                            </span>
                        </span>
                    </div>

                    {/* Node 3: Cloud Storage (Right) */}
                    <div 
                        onClick={() => setActiveModal('chapter4-cloud-scatter')}
                        className="relative z-10 flex flex-col items-center cursor-pointer group/node"
                    >
                        <div className="size-20 sm:size-24 rounded-[1.5rem] bg-gradient-to-tr from-white to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 shadow-2xl flex items-center justify-center relative overflow-hidden group-hover/node:scale-105 group-hover/node:border-cyber-accent/50 transition-all duration-300">
                            <Cloud className="size-10 sm:size-12 text-slate-400 dark:text-slate-300 relative z-10 group-hover/node:text-cyber-accent transition-colors duration-500" />
                            {/* Upload Pulses inside cloud */}
                            <div className="absolute inset-x-0 bottom-0 bg-cyber-accent/20 animate-cloud-fill" />
                        </div>
                        <span className="absolute -bottom-12 font-black text-[10px] sm:text-xs uppercase tracking-widest text-slate-700 dark:text-slate-300 text-center whitespace-nowrap group-hover/node:text-cyber-accent transition-colors duration-300">
                            Cloud Scatter
                            <span className="block text-[8px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/node:opacity-100 transition-opacity duration-300">
                                Click to Inspect
                            </span>
                        </span>

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

            {/* Modal 1: Cover Selection */}
            {activeModal === 'chapter4-cover-selection' && (
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
                                <Image className="size-7 text-cyber-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Cover Media Selection</h2>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-300">
                            <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-medium">
                                After <span className="text-white font-bold">AES-256-GCM encryption</span> of the document payload, the resulting ciphertext undergoes a rigorous preparatory phase before steganographic embedding can occur. This phase involves dynamically selecting appropriate cover files from the system’s cover pool, fetching and locking them for exclusive use, and employing a dynamic capacity-based segmentation algorithm.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                                        <Image className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Image Cover (PNG)</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Format:</span> PNG (Lossless RGB)</p>
                                        <p><span className="text-slate-500 font-bold">Hiding Method:</span> LSB (Pillow Library)</p>
                                        <p><span className="text-slate-500 font-bold">Capacity Margin:</span> <span className="text-cyan-400 font-bold">15.0% Safe Limit</span></p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            The <span className="text-slate-200 font-semibold">Capacity Margin</span> indicates the maximum portion of the cover file's bytes (allocated bits) used for embedding relative to its total payload capacity. Restricting payload to 15.0% prevents visual distortion and keeps statistical anomalies undetectable to steganalysis.
                                        </p>
                                    </div>
                                    <div className="absolute top-2 right-2 text-[10px] font-black uppercase tracking-wider text-cyan-400/30 font-mono">PNG</div>
                                </div>

                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                                        <Volume2 className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Audio Cover (WAV)</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Format:</span> WAV (16-bit PCM)</p>
                                        <p><span className="text-slate-500 font-bold">Hiding Method:</span> LSB (NumPy &amp; SciPy)</p>
                                        <p><span className="text-slate-500 font-bold">Capacity Margin:</span> <span className="text-purple-400 font-bold">15.0% Safe Limit</span></p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            The <span className="text-slate-200 font-semibold">Capacity Margin</span> represents the portion of PCM sample data (LSB bits) designated for embedding against total sample capacity. Limiting data to 15.0% keeps any potential noise floor changes well below human hearing thresholds.
                                        </p>
                                    </div>
                                    <div className="absolute top-2 right-2 text-[10px] font-black uppercase tracking-wider text-purple-400/30 font-mono">WAV</div>
                                </div>

                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                                    <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                                        <FileText className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">Text Cover (TXT)</h4>
                                    <div className="space-y-1.5 text-xs text-slate-400 flex-1 font-medium">
                                        <p><span className="text-slate-500 font-bold">Format:</span> Plain Text (UTF-8)</p>
                                        <p><span className="text-slate-500 font-bold">Hiding Method:</span> LSB Substitution (with Random Offset)</p>
                                        <p><span className="text-slate-500 font-bold">Capacity Margin:</span> <span className="text-emerald-400 font-bold">2.0% Safe Limit</span></p>
                                        <p className="pt-2 text-slate-400 leading-relaxed font-normal">
                                            The <span className="text-slate-200 font-semibold">Capacity Margin</span> represents the portion of text byte LSBs designated for payload embedding against the total character capacity. Setting a strict 2.0% threshold guarantees that LSB modifications do not render standard UTF-8 characters as invalid or break text editor encoding.
                                        </p>
                                    </div>
                                    <div className="absolute top-2 right-2 text-[10px] font-black uppercase tracking-wider text-emerald-400/30 font-mono">TXT</div>
                                </div>
                            </div>

                            {/* Pipeline Section: Cover Selection & Fetching */}
                            <div className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl space-y-6">
                                <div className="flex items-center gap-3 border-b border-slate-800/60 pb-3">
                                    <Cpu className="size-5 text-cyber-accent" />
                                    <h4 className="text-base font-black text-white uppercase tracking-wider">Cover Selection &amp; Fetching Pipeline (Section 4.2.1.1)</h4>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Step 1: Size-Tier Categorization */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className="flex size-6 items-center justify-center rounded-full bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent font-mono text-xs font-black">1</span>
                                            <h5 className="text-sm font-bold text-white uppercase tracking-wide">Size Tiering</h5>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                            Categorizes the incoming encrypted document into a specific size tier: <span className="text-slate-200 font-semibold">Large (&gt; 2MB)</span>, <span className="text-slate-200 font-semibold">Medium (&gt; 500KB)</span>, or <span className="text-slate-200 font-semibold">Small</span>. This system enforces strict capacity boxing by defining minimum and maximum thresholds, ensuring covers fit the payload.
                                        </p>
                                    </div>

                                    {/* Step 2: Media Diversity & Fallback */}
                                    <div className="space-y-3 border-t md:border-t-0 md:border-x border-slate-800/80 pt-4 md:pt-0 md:px-6">
                                        <div className="flex items-center gap-2">
                                            <span className="flex size-6 items-center justify-center rounded-full bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent font-mono text-xs font-black">2</span>
                                            <h5 className="text-sm font-bold text-white uppercase tracking-wide">Diversity &amp; Fallback</h5>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                            Mandates selection of <span className="text-slate-200 font-semibold">at least 1 Text, 1 Audio, and 1 Image</span> cover. If this initial pool lacks sufficient capacity, a <span className="text-cyber-accent font-semibold">greedy expansion fallback</span> incrementally selects the largest available covers until requirements are met.
                                        </p>
                                    </div>

                                    {/* Step 3: Fetching & Isolation Lock */}
                                    <div className="space-y-3 pt-4 md:pt-0">
                                        <div className="flex items-center gap-2">
                                            <span className="flex size-6 items-center justify-center rounded-full bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent font-mono text-xs font-black">3</span>
                                            <h5 className="text-sm font-bold text-white uppercase tracking-wide">Secure Fetch &amp; Lock</h5>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                            Retrieves files from Backblaze B2 or local cache via <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono text-[10px]">fetchAndLockCovers</code>. Temporarily marks database records as <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono text-[10px]">in_use</code> to guarantee concurrency isolation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 2: Segmentation & LSB Embedding (Paginated) */}
            {activeModal === 'chapter4-segmentation-lsb' && (
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
                                <Cpu className="size-7 text-cyber-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                    {modalPage === 1 ? "Dynamic Capacity-Based Segmentation" : "Least Significant Bit (LSB) Embedding"}
                                </h2>
                                {modalPage !== 1 && (
                                    <p className="text-xs text-cyber-accent font-black uppercase tracking-widest mt-1">
                                        Phase 2: Concealment Mechanics
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Paginated Content Area */}
                        <div className="flex-1 overflow-y-auto pr-2 text-slate-300">
                            {modalPage === 1 ? (
                                <div className="space-y-6">
                                    <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-medium">
                                        Following cover selection, the actual segmentation of the AES-encrypted payload is performed through a <span className="text-white font-bold">Dynamic Capacity-Based Segmentation</span> algorithm. Unlike standard chunking that splits a file into equal, fixed-size pieces, this adaptive algorithm divides the data into non-uniform fragments dynamically matched to carrier limits.
                                    </p>

                                    {/* The Three Governing Constraints & Database Tracking */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Constraints */}
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
                                            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
                                                <Cpu className="size-4 text-cyber-accent" /> Three Governing Constraints
                                            </h4>
                                            <ul className="space-y-3 text-xs text-slate-400 font-medium leading-relaxed">
                                                <li>
                                                    <span className="text-slate-200 font-bold block mb-0.5">1. Cover Capacity Limit</span>
                                                    Determines the maximum amount of data the currently assigned cover file can safely conceal (e.g., 15% for image/audio, 2% for text carriers).
                                                </li>
                                                <li>
                                                    <span className="text-slate-200 font-bold block mb-0.5">2. Proportional Distribution</span>
                                                    Averages remaining unsegmented bytes across all unused covers. This ensures payload is spread evenly across the carrier set rather than overflowing the first cover.
                                                </li>
                                                <li>
                                                    <span className="text-slate-200 font-bold block mb-0.5">3. Cover Utilization Safety</span>
                                                    Reserves at least 1 byte for every subsequent cover file, ensuring no carrier in the selected set is left empty.
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Database Storage & Reassembly blueprint */}
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
                                            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
                                                <Database className="size-4 text-purple-400" /> Storage &amp; Blueprint Mapping
                                            </h4>
                                            <ul className="space-y-3 text-xs text-slate-400 font-medium leading-relaxed">
                                                <li>
                                                    <span className="text-slate-200 font-bold block mb-0.5">Fragment Metadata &amp; Status</span>
                                                    Each fragment receives a unique identifier, sequential index, byte size, and SHA-256 integrity hash. The temporary state is marked as <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono text-[10px]">floating</code> in the database.
                                                </li>
                                                <li>
                                                    <span className="text-slate-200 font-bold block mb-0.5">FragmentMap Link</span>
                                                    Correlates <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono text-[10px]">fragment_id</code> with its assigned <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono text-[10px]">cover_id</code>, creating the structural blueprint that guides retrieval and embedding phases.
                                                </li>
                                                <li>
                                                    <span className="text-slate-200 font-bold block mb-0.5">Tail Reassembly Guarantee</span>
                                                    The final fragment in the sequence is assigned all remaining bytes of the encrypted file, guaranteeing zero data loss during division.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Segmentation Diagram (labeled Sample Segmentation) */}
                                    <div className="flex flex-col items-center justify-center p-6 bg-slate-950/40 border border-slate-800/80 rounded-3xl gap-4">
                                        <div className="w-full flex items-center justify-between border-b border-slate-800/60 pb-2.5">
                                            <span className="text-xs font-black text-white uppercase tracking-wider">Sample Segmentation</span>
                                            <span className="text-[10px] text-cyan-400 font-mono font-bold bg-slate-900 px-2 py-0.5 rounded">Adaptive Allocation</span>
                                        </div>
                                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
                                            <div className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 shrink-0 text-center w-full md:w-auto">
                                                <span className="text-[10px] text-slate-500 uppercase block mb-1 font-bold">AES Ciphertext</span>
                                                <span className="text-white font-bold">document.bin (42.5 KB)</span>
                                            </div>
                                            
                                            <div className="h-6 md:h-0.5 w-0.5 md:w-full bg-gradient-to-b md:bg-gradient-to-r from-cyan-500 to-indigo-500 flex-1 relative min-h-[24px]">
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-0.5 bg-cyber-accent text-slate-950 font-black rounded-full text-[9px] uppercase tracking-wider whitespace-nowrap">
                                                    splitDocument method
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
                                                <div className="px-3 py-2 bg-cyan-950/30 border border-cyan-800/40 rounded-lg text-cyan-400 font-bold flex items-center justify-between gap-4">
                                                    <span>Frag 1 (Image)</span>
                                                    <span className="text-[10px] text-cyan-500 bg-slate-950 px-1.5 py-0.5 rounded font-mono">18.2 KB</span>
                                                </div>
                                                <div className="px-3 py-2 bg-purple-950/30 border border-purple-800/40 rounded-lg text-purple-400 font-bold flex items-center justify-between gap-4">
                                                    <span>Frag 2 (Audio)</span>
                                                    <span className="text-[10px] text-purple-500 bg-slate-950 px-1.5 py-0.5 rounded font-mono">20.1 KB</span>
                                                </div>
                                                <div className="px-3 py-2 bg-emerald-950/30 border border-emerald-800/40 rounded-lg text-emerald-400 font-bold flex items-center justify-between gap-4">
                                                    <span>Frag 3 (Text)</span>
                                                    <span className="text-[10px] text-emerald-500 bg-slate-950 px-1.5 py-0.5 rounded font-mono">4.2 KB</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full text-slate-400 text-xs text-left bg-slate-950/80 p-4 border border-slate-800 rounded-2xl space-y-2 font-medium">
                                            <p className="text-white font-bold flex items-center gap-2">
                                                <CheckCircle2 className="size-4 text-cyber-accent animate-pulse" /> Delimiter Ingestion: <code className="text-cyan-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-[11px]">###STEGOLOCK###</code>
                                            </p>
                                            <p className="leading-relaxed">
                                                Each fragment is appended with the boundary tag <code className="text-cyan-300 font-mono bg-slate-900 px-1 rounded">###STEGOLOCK###</code>. During retrieval, the python extraction job reverses LSB replacement, locates this unique byte marker, and truncates any padding/extra bits before reassembly, maintaining exact payload integrity.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-medium">
                                        Once cover files are prepared and locked, steganographic concealment is executed. StegoLock processes each segment, decodes its Base64 payload, and routes it to the corresponding Python LSB engine as an external process.
                                    </p>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        {/* Image LSB Embedding */}
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
                                            <div className="flex items-center gap-3 border-b border-slate-800/60 pb-3 mb-4">
                                                <div className="size-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                                                    <Image className="size-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-base font-black text-white leading-tight">Image Embedding</h4>
                                                    <span className="text-[9px] font-mono text-cyan-400 uppercase">image/embed.py</span>
                                                </div>
                                            </div>
                                            <div className="space-y-4 text-xs text-slate-400 flex-1 font-medium leading-relaxed">
                                                <div>
                                                    <span className="text-slate-300 font-bold block mb-1">Pre-Validation &amp; Standardization</span>
                                                    Validates graphics mode and dynamically converts non-conforming color spaces (like Grayscale or CMYK) to standard RGB/RGBA.
                                                </div>
                                                <div>
                                                    <span className="text-slate-300 font-bold block mb-1">Bitwise Substitution</span>
                                                    Flattens the pixel matrix into channel bytes, masks the LSBs using vectorized arrays, and writes payload bits and delimiter sequentially.
                                                </div>
                                                <div>
                                                    <span className="text-slate-300 font-bold block mb-1">Stego Export</span>
                                                    Reconstructs the color sequence into the original dimensions and exports it as a lossless graphic file, avoiding compression artifacts.
                                                </div>
                                            </div>
                                            <div className="absolute top-2 right-2 text-[10px] font-black uppercase tracking-wider text-cyan-400/20 font-mono">PNG</div>
                                        </div>

                                        {/* Audio LSB Embedding */}
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                                            <div className="flex items-center gap-3 border-b border-slate-800/60 pb-3 mb-4">
                                                <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                                                    <Volume2 className="size-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-base font-black text-white leading-tight">Audio Embedding</h4>
                                                    <span className="text-[9px] font-mono text-purple-400 uppercase">audio/embed.py</span>
                                                </div>
                                            </div>
                                            <div className="space-y-4 text-xs text-slate-400 flex-1 font-medium leading-relaxed">
                                                <div>
                                                    <span className="text-slate-300 font-bold block mb-1">Acoustic Validation</span>
                                                    Verifies uncompressed 16-bit PCM format. Mandates sample rate &ge; 44,100 Hz to guarantee high-fidelity storage.
                                                </div>
                                                <div>
                                                    <span className="text-slate-300 font-bold block mb-1">Mask Adaptation</span>
                                                    Loads sound wave amplitudes as a contiguous array. Adapts bitmasks for unsigned 8-bit vs signed 16-bit samples to prevent clipping.
                                                </div>
                                                <div>
                                                    <span className="text-slate-300 font-bold block mb-1">Wave Reconstruction</span>
                                                    Alters the LSB of waveform samples directly, restoring the original multi-channel layout and exporting stego-audio files.
                                                </div>
                                            </div>
                                            <div className="absolute top-2 right-2 text-[10px] font-black uppercase tracking-wider text-purple-400/20 font-mono">WAV</div>
                                        </div>

                                        {/* Text LSB Embedding */}
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                                            <div className="flex items-center gap-3 border-b border-slate-800/60 pb-3 mb-4">
                                                <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                                                    <FileText className="size-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-base font-black text-white leading-tight">Text Embedding</h4>
                                                    <span className="text-[9px] font-mono text-emerald-400 uppercase">text/embed.py</span>
                                                </div>
                                            </div>
                                            <div className="space-y-4 text-xs text-slate-400 flex-1 font-medium leading-relaxed">
                                                <div>
                                                    <span className="text-slate-300 font-bold block mb-1">Dynamic Generation Fallback</span>
                                                    If an appropriately sized cover is missing, pulls articles from local wiki database to generate a natural UTF-8 text file.
                                                </div>
                                                <div>
                                                    <span className="text-slate-300 font-bold block mb-1">Randomized Offset Shifting</span>
                                                    Computes a dynamic start offset index, shifting the embedding window randomly to destroy linear patterns and counter steganalysis.
                                                </div>
                                                <div>
                                                    <span className="text-slate-300 font-bold block mb-1">LSB Substitutions &amp; Coordinates</span>
                                                    Replaces LSBs of text bytes using NumPy vector operations. The engine outputs the offset, stored in the database for reassembly.
                                                </div>
                                            </div>
                                            <div className="absolute top-2 right-2 text-[10px] font-black uppercase tracking-wider text-emerald-400/20 font-mono">TXT</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pagination Buttons */}
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800 shrink-0">
                            <button 
                                onClick={() => setModalPage(1)}
                                disabled={modalPage === 1}
                                className="px-4 py-2 rounded-xl border border-slate-800 hover:border-cyber-accent disabled:opacity-30 disabled:hover:border-slate-800 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5"
                            >
                                <ChevronLeft className="size-4" /> Segmentation
                            </button>
                            <div className="flex gap-2">
                                <span className={`size-2 rounded-full transition-all duration-300 ${modalPage === 1 ? 'w-6 bg-cyber-accent' : 'bg-slate-800'}`} />
                                <span className={`size-2 rounded-full transition-all duration-300 ${modalPage === 2 ? 'w-6 bg-cyber-accent' : 'bg-slate-800'}`} />
                            </div>
                            <button 
                                onClick={() => setModalPage(2)}
                                disabled={modalPage === 2}
                                className="px-4 py-2 rounded-xl border border-slate-800 hover:border-cyber-accent disabled:opacity-30 disabled:hover:border-slate-800 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5"
                            >
                                LSB Embedding <ChevronRight className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 3: Cloud Scatter mapping */}
            {activeModal === 'chapter4-cloud-scatter' && (
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
                                <Cloud className="size-7 text-cyber-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-black">Cloud Storage of Stego Files</h2>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-300">
                            <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-medium">
                                After LSB embedding, stego files are uploaded to a single Backblaze B2 cloud storage account under the <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono text-xs">locked/</code> virtual directory. Each stego file is stored as an entirely independent object. Since no individual object contains the full ciphertext or steganographic markers, document reconstruction is impossible without acquiring and correctly ordering all parts.
                            </p>

                            {/* 3-Column Distribution Pipeline */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-medium">
                                {/* Step 1: Capacity Gate Check */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="flex size-6 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-black">1</span>
                                        <h4 className="text-sm font-black text-white uppercase tracking-wider">Capacity Gate Check</h4>
                                    </div>
                                    <div className="space-y-3 text-xs text-slate-400 flex-1 leading-relaxed">
                                        <p>
                                            Queries user storage quota parameters (<code className="text-cyan-300 font-mono">storage_limit</code> and <code className="text-cyan-300 font-mono">storage_used</code>) from the database to compute remaining available capacity.
                                        </p>
                                        <p>
                                            Sums the byte sizes of all locally generated stego files. If the aggregate size exceeds the quota limit, the transfer aborts, unlinking all temp files to prevent network overhead.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 2: Parallel Batch Uploads */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="flex size-6 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-black">2</span>
                                        <h4 className="text-sm font-black text-white uppercase tracking-wider">Parallel Distribution</h4>
                                    </div>
                                    <div className="space-y-3 text-xs text-slate-400 flex-1 leading-relaxed">
                                        <p>
                                            Uploads files in parallel batches of five using concurrent HTTP connection pools. This parallel batch execution maximizes network throughput to the remote Backblaze B2 bucket.
                                        </p>
                                        <p>
                                            Each stego file is uploaded using a randomized filename to disguise its purpose and ensure it resembles standard web media files.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3: Persistence & Cleanup */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-black">3</span>
                                        <h4 className="text-sm font-black text-white uppercase tracking-wider">Persistence &amp; Disk Cleanup</h4>
                                    </div>
                                    <div className="space-y-3 text-xs text-slate-400 flex-1 leading-relaxed">
                                        <p>
                                            Inserts records to the <code className="text-emerald-400 font-mono">stego_files</code> table logging mapping parameters: <code className="text-emerald-300 text-[10px] font-mono">stego_file_id</code>, <code className="text-emerald-300 text-[10px] font-mono">cloud_file_id</code>, randomized filename, exact file size, and the steganographic insertion offset.
                                        </p>
                                        <p>
                                            Increments <code className="text-slate-300 font-mono">in_cloud_size</code> and triggers <code className="text-slate-300 font-mono">refreshStorageUsed</code>. Once the batch is confirmed, document status is updated to <code className="text-emerald-400 font-mono">stored</code> and local files are unlinked (deleted) from server disk.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Database Integrity Disclaimer */}
                            <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-3xl space-y-2">
                                <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                                    <Database className="size-4 text-cyber-accent" /> Persistence Integrity Layer
                                </h5>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    The local database contains only metadata mapping. Even in a full breach of the Backblaze account, an adversary only obtains stego files (which appear as standard, normal web media or text files) with no knowledge of which files contain ciphertext fragments, their correct sequence order, or the decryption keys.
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
                }
            `}} />
        </div>
    );
}

export function getChapter4Slide8({ activeModal, setActiveModal }) {
    return [
        // Slide 8: Findings of the Study (Objective 2)
        {
            title: "Chapter 4",
            subtitle: "Objective 2: Cover Generation, Segmentation & Cloud Scatter",
            content: <Chapter4Slide8Content activeModal={activeModal} setActiveModal={setActiveModal} />
        }
    ];
}
