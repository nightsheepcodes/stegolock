import React from 'react';
import { Shield } from 'lucide-react';

export function getChapter4Slide9() {
    return [
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
        }
    ];
}
