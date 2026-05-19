import React, { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { 
    Shield, Trophy, Users, Cpu, Database, Compass,
    BarChart3, CheckCircle2, ArrowRight, Activity, Layers
} from 'lucide-react';

import { getChapter1Slides } from './presentation/Chapter1Slides';
import { getChapter2Slides } from './presentation/Chapter2Slides';
import { getChapter3Slides } from './presentation/Chapter3Slides';
import { getChapter4Slides6_7 } from './presentation/Chapter4Slides6_7';
import { getChapter4Slide8 } from './presentation/Chapter4Slide8';
import { getChapter4Slide9 } from './presentation/Chapter4Slide9';
import { getChapter4Slide10 } from './presentation/Chapter4Slide10';
import { getChapter5Slide12 } from './presentation/Chapter5Slide12';

export function usePresentationSlides({ safeStats, demoStep, demoMode, demoActive, activeSteps, currentSlide }) {
    const [activeModal, setActiveModal] = React.useState(null);
    const [expandedSection, setExpandedSection] = React.useState(null);
    const [fullscreenImage, setFullscreenImage] = React.useState(null);
    const [summaryPage, setSummaryPage] = React.useState(1);

    React.useEffect(() => {
        setActiveModal(null);
        setExpandedSection(null);
        setFullscreenImage(null);
        setSummaryPage(1);
    }, [currentSlide]);

    React.useEffect(() => {
        setExpandedSection(null);
        setFullscreenImage(null);
        setSummaryPage(1);
    }, [activeModal]);

    return useMemo(() => [
        // Slide 1: Welcome / Title Slide
        {
            title: "StegoLock",
            subtitle: "Final Defense Presentation",
            content: (
                <div className="flex flex-col items-center justify-center text-center animate-fade-in py-4 sm:py-8 h-full">
                    <div className="group flex flex-col items-center cursor-default max-w-full px-2">
                        <div className="relative mb-4 sm:mb-8">
                            <div className="relative inline-flex items-center justify-center p-6 sm:p-10 md:p-14 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-3xl sm:rounded-[3.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_70px_rgba(34,211,238,0.55)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                                <Shield className="size-16 sm:size-28 md:size-36 text-white drop-shadow-2xl relative z-10" />
                                <div className="absolute inset-0 rounded-3xl sm:rounded-[3.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div className="absolute inset-0 bg-cyber-accent/20 blur-[60px] sm:blur-[100px] -z-10 rounded-full animate-pulse"></div>
                        </div>

                        <div className="space-y-4 sm:space-y-6 max-w-full">
                            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-[900] text-slate-900 dark:text-white tracking-tighter leading-none transform origin-top group-hover:scale-105 inline-block transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyber-accent group-hover:to-indigo-500">
                                Stego<span className="text-cyber-accent group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyber-accent group-hover:to-indigo-500 transition-all duration-300">Lock</span>
                            </h1>
                            <div className="h-1 sm:h-2 w-20 sm:w-36 bg-cyber-accent mx-auto rounded-full shadow-glow-cyan animate-pulse" />
                            <p className="text-[10px] sm:text-xs md:text-base lg:text-lg text-slate-500 dark:text-slate-400 font-black max-w-5xl mx-auto leading-relaxed uppercase tracking-[0.12em] px-4">
                                A CLOUD-BASED WEB APPLICATION BUILT ON A <span className="text-cyber-accent font-black drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]">RECONSTRUCTION-DEPENDENT SECURITY ARCHITECTURE</span> FOR DIGITAL DOCUMENT STORAGE
                            </p>
                            
                            <div className="pt-4 sm:pt-8 max-w-2xl mx-auto text-center border-t border-slate-200/50 dark:border-white/5 mt-4 sm:mt-8">
                                <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.25em] block">
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
                <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-8 h-full py-4 px-4">
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-5 sm:p-8 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-2xl sm:rounded-[2.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                            <Shield className="size-12 sm:size-20 text-white drop-shadow-2xl relative z-10" />
                            <div className="absolute inset-0 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute inset-0 bg-cyber-accent/20 blur-[50px] sm:blur-[80px] -z-10 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
                        ACTIONS TAKEN
                    </h2>
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
        ...getChapter4Slides6_7({ activeModal, setActiveModal }),
        ...getChapter4Slide8({ activeModal, setActiveModal }),
        ...getChapter4Slide9({ activeModal, setActiveModal }),
        ...getChapter4Slide10({ activeModal, setActiveModal }),

        // Slide 11: Summary Section Opener
        {
            title: "Summary",
            subtitle: "",
            content: (
                <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-8 h-full py-4 px-4">
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-5 sm:p-8 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-2xl sm:rounded-[2.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                            <Shield className="size-12 sm:size-20 text-white drop-shadow-2xl relative z-10" />
                            <div className="absolute inset-0 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute inset-0 bg-cyber-accent/20 blur-[50px] sm:blur-[80px] -z-10 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">SUMMARY, CONCLUSIONS &amp; <br/>RECOMMENDATION</h2>
                </div>
            )
        },
        // Slide 12: Chapter 5 Dashboard (Summary, Conclusions, Recommendations)
        ...getChapter5Slide12({ activeModal, setActiveModal, summaryPage, setSummaryPage }),

        // Slide 14: Live Demo
        {
            title: "LIVE DEMO",
            subtitle: "Interactive Operations HUD Simulator",
            content: (
                <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-8 h-full py-4 px-4">
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-5 sm:p-8 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-2xl sm:rounded-[2.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                            <Shield className="size-12 sm:size-20 text-white drop-shadow-2xl relative z-10" />
                            <div className="absolute inset-0 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute inset-0 bg-cyber-accent/20 blur-[50px] sm:blur-[80px] -z-10 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">LIVE DEMO</h2>
                </div>
            )
        },
        // Slide 15: Q&A
        {
            title: "Thank You",
            subtitle: "Q&A Session",
            content: (
                <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-8 h-full py-4 px-4">
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-5 sm:p-8 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-2xl sm:rounded-[2.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                            <Shield className="size-12 sm:size-20 text-white drop-shadow-2xl relative z-10" />
                            <div className="absolute inset-0 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute inset-0 bg-cyber-accent/20 blur-[50px] sm:blur-[80px] -z-10 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Questions &amp; <br/> Answers</h2>
                </div>
            )
        },
        // Slide 16: Defended Screen
        {
            title: "CAPSTONE FINALLY DEFENDED!!!😭",
            subtitle: "StegoLock Capstone Complete",
            content: (
                <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-10 h-full py-4 sm:py-8 animate-fade-in relative px-4">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-purple-500/10 blur-[100px] sm:blur-[140px] rounded-full scale-75 animate-pulse -z-10"></div>
                    
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-8 sm:p-14 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_80px_rgba(34,211,238,0.6)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                            <Trophy className="size-16 sm:size-28 md:size-32 text-white drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[4rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="absolute inset-0 bg-cyber-accent/20 blur-[50px] sm:blur-[80px] -z-10 rounded-full animate-pulse"></div>
                    </div>
 
                    <div className="space-y-4">
                        <h1 className="text-3xl sm:text-6xl lg:text-8xl font-[950] text-slate-900 dark:text-white tracking-tighter leading-none uppercase">
                            CAPSTONE FINALLY<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent via-indigo-400 to-purple-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.25)] animate-pulse">
                                DEFENDED!!!😭
                            </span>
                        </h1>
                        <p className="text-xs sm:text-base md:text-lg text-slate-500 dark:text-slate-400 font-black max-w-3xl mx-auto uppercase tracking-widest pt-2 sm:pt-4">
                            STEGOLOCK: A CLOUD-BASED WEB APPLICATION BUILT ON A RECONSTRUCTION-DEPENDENT SECURITY ARCHITECTURE FOR DIGITAL DOCUMENT STORAGE
                        </p>
                    </div>
 
                    <div className="flex pt-2">
                        <Link 
                            href="/" 
                            className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-gradient-to-r from-cyber-accent to-indigo-500 text-slate-950 hover:shadow-cyan-500/25 shadow-md font-black text-[9px] sm:text-[10px] uppercase tracking-widest transition active:scale-95 animate-fade-in"
                        >
                            Return to Home Page
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
