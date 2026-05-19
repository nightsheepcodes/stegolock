import React from 'react';
import { Shield } from 'lucide-react';

export function getChapter4Slide10() {
    return [
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
        }
    ];
}
