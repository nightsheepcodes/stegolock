import React from 'react';
import { Shield, Lock, Key, RefreshCw, Cpu, Layers, CheckCircle } from 'lucide-react';

export function getChapter4Slides6_7({ activeModal, setActiveModal }) {
    return [
        // Slide 6: Chapter 4 Title
        {
            title: "Chapter 4",
            subtitle: "Results and Discussions",
            content: (
                 <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-8 h-full py-4 px-2 sm:px-4">
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-5 sm:p-8 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-2xl sm:rounded-[2.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                            <Shield className="size-10 sm:size-20 text-white drop-shadow-2xl relative z-10" />
                            <div className="absolute inset-0 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute inset-0 bg-cyber-accent/20 blur-[80px] -z-10 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-3xl sm:text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">RESULTS AND <br className="hidden sm:inline" /> DISCUSSION</h2>
                </div>
            )
        },
        // Slide 7: Findings of the Study (Objective 1)
        {
            title: "Chapter 4",
            subtitle: "Objective 1: Cryptographic Pipeline (PBKDF2 & AES-256-GCM)",
            content: (
                 <div className="h-full flex flex-col justify-center py-2 px-2 sm:px-4 relative">
                    <div className="mb-2 sm:mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 text-center lg:text-left group cursor-default">
                            <div className="size-10 sm:size-14 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-5 sm:size-7 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Chapter 4</h2>
                            </div>
                        </div>
                        <div className="mt-2 text-center lg:text-left lg:pl-[4.5rem]">
                            <p className="text-cyber-accent font-black uppercase tracking-widest text-xs sm:text-sm mb-1">Results and Discussion</p>
                            <p className="text-slate-500 dark:text-slate-400 font-semibold text-[10px] sm:text-xs md:text-base tracking-wide leading-relaxed">Objective 1: Implement AES-based encryption with a KDF-based key management process to ensure the confidentiality and integrity of a document file.</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center gap-3 sm:gap-6 min-h-0 py-2 sm:py-6">
                        {/* Mobile Stack: PBKDF2, HKDF, and AES (Vertical Column) */}
                        <div className="flex flex-col gap-3 w-full max-w-xl lg:hidden">
                            <div 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveModal('pbkdf2');
                                }}
                                className="w-full h-14 glass-panel flex items-center justify-center rounded-xl border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-300 shadow-md shadow-cyan-500/5 cursor-pointer"
                            >
                                <span className="text-sm font-black text-slate-900 dark:text-white hover:text-cyber-accent transition-colors">
                                    PBKDF2
                                </span>
                            </div>
                            <div 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveModal('hkdf');
                                }}
                                className="w-full h-14 glass-panel flex items-center justify-center rounded-xl border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-300 shadow-md shadow-cyan-500/5 cursor-pointer"
                            >
                                <span className="text-sm font-black text-slate-900 dark:text-white hover:text-cyber-accent transition-colors">
                                    HKDF
                                </span>
                            </div>
                            <div 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveModal('aes-gcm');
                                }}
                                className="w-full h-14 glass-panel flex items-center justify-center rounded-xl border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-300 shadow-md shadow-cyan-500/5 cursor-pointer"
                            >
                                <span className="text-sm font-black text-slate-900 dark:text-white hover:text-cyber-accent transition-colors">
                                    AES-256-GCM Encryption
                                </span>
                            </div>
                        </div>

                        {/* Card 1: Key Derivation Functions (Desktop Split Hover Animation) */}
                        <div className="relative w-full max-w-2xl group/kdf cursor-pointer h-[116px] sm:h-[132px] hidden lg:flex gap-4 sm:gap-6 justify-center">
                            
                            {/* Left Split Card: PBKDF2 */}
                            <div 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveModal('pbkdf2');
                                }}
                                className="flex-1 h-full glass-panel flex items-center justify-center rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-x-16 opacity-0 group-hover/kdf:translate-x-0 group-hover/kdf:opacity-100 shadow-lg shadow-cyan-500/5 group/pbkdf2 relative z-20"
                            >
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight group-hover/pbkdf2:text-cyber-accent transition-colors duration-300">
                                    PBKDF2
                                </h3>
                            </div>

                            {/* Right Split Card: HKDF */}
                            <div 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveModal('hkdf');
                                }}
                                className="flex-1 h-full glass-panel flex items-center justify-center rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform -translate-x-16 opacity-0 group-hover/kdf:translate-x-0 group-hover/kdf:opacity-100 shadow-lg shadow-cyan-500/5 group/hkdf relative z-20"
                            >
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight group-hover/hkdf:text-cyber-accent transition-colors duration-300">
                                    HKDF
                                </h3>
                            </div>

                            {/* Front Cover Door: Key Derivation Functions */}
                            <div className="absolute inset-0 mx-auto w-full max-w-xl z-10 glass-panel p-10 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-[#f8fafc]/90 dark:bg-slate-900/80 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/kdf:opacity-0 group-hover/kdf:scale-[0.85] group-hover/kdf:-translate-y-4 group-hover/kdf:pointer-events-none shadow-lg shadow-cyan-500/5">
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-normal">
                                    Key Derivation Functions
                                </h3>
                            </div>

                        </div>

                        {/* Card 2: AES-256-GCM (Desktop Layout) */}
                        <div 
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveModal('aes-gcm');
                            }}
                            className="w-full max-w-xl glass-panel p-3 sm:p-10 rounded-xl sm:rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer hidden lg:flex justify-center items-center h-14 sm:h-[132px]"
                        >
                            <h3 className="text-sm sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-normal group-hover/card:text-cyber-accent transition-colors duration-300 flex items-center justify-center overflow-hidden py-1">
                                <span>AES-</span>
                                
                                {/* 256- (Slips in from below on desktop) */}
                                <span className="hidden sm:inline-flex overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-w-0 opacity-0 group-hover/card:max-w-[4.5rem] sm:group-hover/card:max-w-[5.5rem] group-hover/card:opacity-100">
                                    <span className="inline-block transform translate-y-full group-hover/card:translate-y-0 transition-transform duration-500">
                                        256-
                                    </span>
                                </span>
                                <span className="sm:hidden text-cyber-accent">256-</span>

                                <span>GCM</span>

                                {/* Encryption (Slips out to top on desktop) */}
                                <span className="hidden sm:inline-flex overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-w-[10rem] sm:max-w-[12rem] opacity-100 group-hover/card:max-w-0 group-hover/card:opacity-0">
                                    <span className="inline-block whitespace-nowrap pl-2.5 transform translate-y-0 group-hover/card:-translate-y-full transition-transform duration-500">
                                        Encryption
                                    </span>
                                </span>
                                <span className="sm:hidden pl-1 text-slate-400 font-normal text-xs">Encryption</span>
                            </h3>
                        </div>
                    </div>

                    {/* Modal Overlay for Objective 1 Cryptographic components */}
                    {activeModal && ['pbkdf2', 'hkdf', 'aes-gcm'].includes(activeModal) && (
                        <div 
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent"
                            onClick={() => setActiveModal(null)}
                        >
                            <div 
                                className="bg-slate-900/95 border border-cyber-accent/40 w-full max-w-4xl p-5 sm:p-10 rounded-2xl sm:rounded-[2.5rem] relative shadow-2xl shadow-cyan-500/20 animate-scale-up flex flex-col max-h-[85vh]"
                                onClick={e => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setActiveModal(null)}
                                    className="absolute top-4 right-4 size-8 sm:top-6 sm:right-6 sm:size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-base sm:text-xl z-10"
                                >
                                    ✕
                                </button>

                                {/* Modal Header */}
                                <div className="flex items-center gap-3 sm:gap-4 border-b border-slate-800 pb-4 sm:pb-5 shrink-0 mb-4 sm:mb-6">
                                    <div className="size-10 sm:size-14 rounded-xl sm:rounded-2xl bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/5">
                                        {activeModal === 'pbkdf2' && <Key className="size-5 sm:size-7" />}
                                        {activeModal === 'hkdf' && <Layers className="size-5 sm:size-7" />}
                                        {activeModal === 'aes-gcm' && <Lock className="size-5 sm:size-7" />}
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-white tracking-tight">
                                            {activeModal === 'pbkdf2' && 'Password-Based KDF2 (PBKDF2)'}
                                            {activeModal === 'hkdf' && 'HMAC-based Extract-and-Expand KDF (HKDF)'}
                                            {activeModal === 'aes-gcm' && 'Advanced Encryption Standard in Galois/Counter Mode 256'}
                                        </h2>
                                    </div>
                                </div>

                                {/* Modal Content - Scrollable area */}
                                <div className="text-slate-300 space-y-6 text-xs sm:text-base leading-relaxed overflow-y-auto min-h-0 pr-2 sm:pr-4">
                                    
                                    {/* PBKDF2 Modal Details */}
                                    {activeModal === 'pbkdf2' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                            {/* Left Column: Parameter Stats */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm sm:text-lg font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <Cpu className="size-4 sm:size-5 text-cyber-accent" /> Parameters
                                                </h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Hash Algorithm</span>
                                                        <span className="text-sm sm:text-lg font-bold text-cyber-accent mt-0.5 sm:mt-1">SHA-256</span>
                                                    </div>
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Rounds Applied</span>
                                                        <span className="text-sm sm:text-lg font-bold text-cyber-accent mt-0.5 sm:mt-1">2 Rounds</span>
                                                    </div>
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Iterations / Round</span>
                                                        <span className="text-sm sm:text-lg font-bold text-cyber-accent mt-0.5 sm:mt-1">100,000</span>
                                                    </div>
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Output Key Size</span>
                                                        <span className="text-sm sm:text-lg font-bold text-cyber-accent mt-0.5 sm:mt-1">32 Bytes (256-bit)</span>
                                                    </div>
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center sm:col-span-2">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Salt Per Round</span>
                                                        <span className="text-xs sm:text-[13px] font-semibold text-slate-300 mt-0.5 sm:mt-1 leading-snug">Unique 16-byte <span className="text-cyber-accent font-bold">auth_salt</span> (Round 1) &amp; <span className="text-cyber-accent font-bold">ek_salt</span> (Round 2)</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column: Two-Round Implementation Flow */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm sm:text-lg font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <Shield className="size-4 sm:size-5 text-indigo-400" /> Implementation in StegoLock
                                                </h4>
                                                <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">PBKDF2 is applied in two distinct rounds during <span className="text-white font-bold">user registration</span> and repeated identically during <span className="text-white font-bold">login</span> to rederive the encryption key.</p>
                                                <div className="space-y-3">
                                                    {/* Round 1 */}
                                                    <div className="bg-slate-950/40 border border-cyber-accent/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                                            <span className="size-4 sm:size-5 rounded-full bg-cyber-accent text-slate-900 text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                                                            <span className="text-xs sm:text-sm font-black text-white">Round 1 — Password Authentication Key</span>
                                                        </div>
                                                        <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">Generates a 16-byte <span className="text-cyber-accent font-bold">auth_salt</span>, then runs <code className="text-cyber-accent text-[10px] sm:text-[11px] bg-slate-800/80 px-1 rounded font-mono">hash_pbkdf2</code> on the user's password to derive a 256-bit authentication key stored as <span className="text-cyber-accent font-bold">$password_derivedKey</span>.</p>
                                                    </div>
                                                    {/* Round 2 */}
                                                    <div className="bg-slate-950/40 border border-indigo-500/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                                            <span className="size-4 sm:size-5 rounded-full bg-indigo-500 text-white text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                                                            <span className="text-xs sm:text-sm font-black text-white">Round 2 — Encryption Key Derivation</span>
                                                        </div>
                                                        <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">Generates a new 16-byte <span className="text-indigo-400 font-bold">ek_salt</span>, then runs a second <code className="text-cyber-accent text-[10px] sm:text-[11px] bg-slate-800/80 px-1 rounded font-mono">hash_pbkdf2</code> using the Round 1 key as input, producing the final encryption key used to <span className="text-white font-bold">wrap the Master Key</span> before database storage.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* HKDF Modal Details */}
                                    {activeModal === 'hkdf' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                            {/* Left Column: Parameter Stats */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm sm:text-lg font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <Layers className="size-4 sm:size-5 text-cyber-accent" /> Parameters
                                                </h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">HMAC Basis</span>
                                                        <span className="text-sm sm:text-lg font-bold text-cyber-accent mt-0.5 sm:mt-1">SHA-256</span>
                                                    </div>
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Execution Mode</span>
                                                        <span className="text-sm sm:text-lg font-bold text-cyber-accent mt-0.5 sm:mt-1">Extract-then-Expand</span>
                                                    </div>
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center sm:col-span-2">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Input Keying Material (IKM)</span>
                                                        <span className="text-xs sm:text-[13px] font-semibold text-slate-300 mt-0.5 sm:mt-1 leading-snug">User's <span className="text-cyber-accent font-bold">Master Key</span></span>
                                                    </div>
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Output Key</span>
                                                        <span className="text-sm sm:text-lg font-bold text-cyber-accent mt-0.5 sm:mt-1">32 Bytes (256-bit)</span>
                                                    </div>
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Context String</span>
                                                        <span className="text-xs sm:text-[13px] font-bold text-cyber-accent mt-0.5 sm:mt-1 font-mono">'dek-wrapping-key'</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column: Implementation in StegoLock */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm sm:text-lg font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <Shield className="size-4 sm:size-5 text-indigo-400" /> Implementation in StegoLock
                                                </h4>
                                                <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">HKDF protects <span className="text-white font-bold">document-specific keys</span>, ensuring that a compromised key for one document never exposes any other document.</p>
                                                <div className="space-y-3">
                                                    {/* Evolution Note */}
                                                    <div className="bg-slate-950/40 border border-slate-700/40 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                                            <span className="size-4 sm:size-5 rounded-full bg-slate-700 text-slate-300 text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0">!</span>
                                                            <span className="text-xs sm:text-sm font-black text-slate-450">Architectural Evolution</span>
                                                        </div>
                                                        <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">Early iterations used HKDF to derive the <span className="text-slate-300 font-bold">DEK directly</span> from the Master Key — a rigid design that blocked secure document sharing, as sharing would require exposing the Master Key itself.</p>
                                                    </div>
                                                    {/* Current Implementation */}
                                                    <div className="bg-slate-950/40 border border-cyber-accent/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                                            <span className="size-4 sm:size-5 rounded-full bg-cyber-accent text-slate-900 text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0">✓</span>
                                                            <span className="text-xs sm:text-sm font-black text-white">Current — Key Wrapping via KEK</span>
                                                        </div>
                                                        <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">The DEK is now <span className="text-white font-bold">randomly system-generated</span>. HKDF instead derives a <span className="text-cyber-accent font-bold">Key Encryption Key (KEK)</span> — the wrapping key — from the Master Key and a unique <span className="text-cyber-accent font-bold">document salt</span>. This KEK wraps (encrypts) the DEK for storage.</p>
                                                    </div>
                                                    {/* Sharing Benefit */}
                                                    <div className="bg-slate-950/40 border border-indigo-500/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                                            <span className="size-4 sm:size-5 rounded-full bg-indigo-500 text-white text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0">→</span>
                                                            <span className="text-xs sm:text-sm font-black text-white">Enables Secure Document Sharing</span>
                                                        </div>
                                                        <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">When sharing, the system can safely <span className="text-white font-bold">unwrap and re-wrap</span> the DEK using each user's respective Master Key — without ever exposing the underlying encryption key itself.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* AES-GCM Modal Details */}
                                    {activeModal === 'aes-gcm' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                            {/* Left Column: Parameter Stats */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm sm:text-lg font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <Lock className="size-4 sm:size-5 text-cyber-accent" /> Parameters
                                                </h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Cipher Mode</span>
                                                        <span className="text-sm sm:text-lg font-bold text-cyber-accent mt-0.5 sm:mt-1">Galois/Counter Mode</span>
                                                    </div>
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Key Strength</span>
                                                        <span className="text-sm sm:text-lg font-bold text-cyber-accent mt-0.5 sm:mt-1">256-Bit</span>
                                                    </div>
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Initialization Vector</span>
                                                        <span className="text-sm sm:text-lg font-bold text-cyber-accent mt-0.5 sm:mt-1">12-Byte Nonce</span>
                                                    </div>
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Authentication Tag</span>
                                                        <span className="text-sm sm:text-lg font-bold text-cyber-accent mt-0.5 sm:mt-1">16-Byte (128-bit)</span>
                                                    </div>
                                                    <div className="bg-slate-950/40 border border-slate-800/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-center sm:col-span-2">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Pre-Encryption Process</span>
                                                        <span className="text-xs sm:text-[13px] font-semibold text-slate-300 mt-0.5 sm:mt-1 leading-snug">High-ratio ZLIB (level 9) compression to flatten data statistics and strip redundancy.</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column: Four Implementation Components */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm sm:text-lg font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <Shield className="size-4 sm:size-5 text-indigo-400" /> Implementation in StegoLock
                                                </h4>
                                                <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">AES-256-GCM is applied across four distinct subsystems to enforce strong isolation, mathematical integrity, and secure sharing.</p>
                                                
                                                <div className="space-y-3">
                                                    {/* Component 1: Master Key Protection */}
                                                    <div className="bg-slate-950/40 border border-slate-800/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className="size-4 sm:size-5 rounded-full bg-cyber-accent text-slate-900 text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                                                            <span className="text-xs sm:text-sm font-black text-white">Master Key Protection</span>
                                                        </div>
                                                        <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">The Foundation Master Key is generated as a secure 256-bit random byte string. It is encrypted with AES-256-GCM (using a key derived from password-PBKDF2) before storing. Decrypted at login, the plaintext resides only temporarily in a secure cached Redis layer, purged after inactivity.</p>
                                                    </div>

                                                    {/* Component 2: DEK Wrapping */}
                                                    <div className="bg-slate-950/40 border border-slate-800/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className="size-4 sm:size-5 rounded-full bg-cyber-accent text-slate-900 text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                                                            <span className="text-xs sm:text-sm font-black text-white">Document Encryption Key (DEK) Wrapping</span>
                                                        </div>
                                                        <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">Each file has a randomly generated 256-bit DEK. Rather than storing it in plaintext, the system immediately encrypts (wraps) the DEK using AES-256-GCM with a KEK derived from the user's Master Key + unique document salt.</p>
                                                    </div>

                                                    {/* Component 3: File Encryption & Decryption */}
                                                    <div className="bg-slate-950/40 border border-slate-800/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className="size-4 sm:size-5 rounded-full bg-cyber-accent text-slate-900 text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0">3</span>
                                                            <span className="text-xs sm:text-sm font-black text-white">Document File payload Protection</span>
                                                        </div>
                                                        <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">Physical files are first ZLIB compressed (level 9), then encrypted with AES-256-GCM using the raw DEK and a 96-bit nonce. Decryption implicitly verifies the 16-byte Galois tag, immediately aborting if any bit-flipping, corruption, or database tampering is detected.</p>
                                                    </div>

                                                    {/* Component 4: Cryptographic Sharing Handoff */}
                                                    <div className="bg-slate-950/40 border border-slate-800/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className="size-4 sm:size-5 rounded-full bg-cyber-accent text-slate-900 text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0">4</span>
                                                            <span className="text-xs sm:text-sm font-black text-white">Zero-Re-encryption Sharing</span>
                                                        </div>
                                                        <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">Files are shared without re-encrypting the payload: the owner's wrapped DEK is unwrapped in volatile memory, re-encrypted using a System Share Key, and finally re-wrapped under the recipient's Master Key upon acceptance. This enforces account isolation without exposing plaintext DEKs.</p>
                                                    </div>
                                                </div>
                                            </div>
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

