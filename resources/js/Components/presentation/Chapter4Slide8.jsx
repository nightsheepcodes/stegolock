import React from 'react';
import { Shield, Lock, Image, Volume2, FileText, FileDigit, Cloud } from 'lucide-react';

export function getChapter4Slide8() {
    return [
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
        }
    ];
}
