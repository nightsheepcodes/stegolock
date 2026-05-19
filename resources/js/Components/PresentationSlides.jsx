import React, { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { 
    Shield, Trophy, Users, Cpu, Database, Compass 
} from 'lucide-react';

import { getChapter1Slides } from './presentation/Chapter1Slides';
import { getChapter2Slides } from './presentation/Chapter2Slides';
import { getChapter3Slides } from './presentation/Chapter3Slides';
import { getChapter4Slides6_7 } from './presentation/Chapter4Slides6_7';
import { getChapter4Slide8 } from './presentation/Chapter4Slide8';
import { getChapter4Slide9 } from './presentation/Chapter4Slide9';
import { getChapter4Slide10 } from './presentation/Chapter4Slide10';

export function usePresentationSlides({ safeStats, demoStep, demoMode, demoActive, activeSteps, currentSlide }) {
    const [activeModal, setActiveModal] = React.useState(null);
    const [expandedSection, setExpandedSection] = React.useState(null);
    const [fullscreenImage, setFullscreenImage] = React.useState(null);

    React.useEffect(() => {
        setActiveModal(null);
        setExpandedSection(null);
        setFullscreenImage(null);
    }, [currentSlide]);

    React.useEffect(() => {
        setExpandedSection(null);
        setFullscreenImage(null);
    }, [activeModal]);

    return useMemo(() => [
        // Slide 1: Welcome / Title Slide
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
        // Slide 2: Actions Taken Section Opener
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

        // Chapter 1 Slides (Objectives, Background, Significance, Scope, Terms)
        ...getChapter1Slides({ activeModal, setActiveModal }),

        // Chapter 2 Slides (Literature Synthesis & Related Systems)
        ...getChapter2Slides({ activeModal, setActiveModal, expandedSection, setExpandedSection }),

        // Chapter 3 Slides (Conceptual Framework, Methodology, Ethical Considerations)
        ...getChapter3Slides({ activeModal, setActiveModal, expandedSection, setExpandedSection, fullscreenImage, setFullscreenImage }),

        // Chapter 4 Slides (Findings on Obj 1, Obj 2, Obj 3, Obj 4)
        ...getChapter4Slides6_7(),
        ...getChapter4Slide8(),
        ...getChapter4Slide9(),
        ...getChapter4Slide10(),

        // Slide 11: Summary Section Opener
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
        // Slide 12: Chapter 5 Recommendations
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
        // Slide 13: Live Demo
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
        // Slide 14: Q&A
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
        // Slide 15: Defended Screen
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
    ], [
        safeStats, demoStep, demoMode, demoActive, activeSteps, 
        activeModal, expandedSection, fullscreenImage, currentSlide
    ]);
}
