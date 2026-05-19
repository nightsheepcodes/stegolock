import React from 'react';
import { Shield } from 'lucide-react';

export function getChapter4Slides6_7() {
    return [
        // Slide 6: Chapter 4 Title
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
        }
    ];
}
