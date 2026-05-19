import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Shield, Lock, Layers, EyeOff, BarChart3, 
    ArrowRight, ArrowLeft, Play, Info, ShieldCheck,
    CheckCircle2, AlertTriangle, Zap, Target,
    Trophy, Users, Cpu, Database, Moon, Sun,
    Share2, Compass, Activity, FileText, Volume2, Image,
    FolderOpen, HelpCircle, ChevronUp, ChevronDown
} from 'lucide-react';
import { DecorativeBackground } from '@/Components/DecorativeBackground';

export default function Presentation({ stats = {} }) {
    // Theme Management
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('stegolock_theme');
            return saved ? saved === 'dark' : true;
        }
        return true;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('stegolock_theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('stegolock_theme', 'light');
        }
    }, [darkMode]);

    // Provide defaults for stats to prevent undefined errors, with exact thesis data fallbacks
    const safeStats = useMemo(() => {
        const totalLockedDb = stats?.totalLocked ?? 0;
        const avgLockTimeDb = stats?.avgLockTime ?? 0;
        const avgUnlockTimeDb = stats?.avgUnlockTime ?? 0;
        const surveyGWMDb = stats?.surveyGWM ?? 0;
        const dbCharacteristics = stats?.characteristics ?? [];

        // Map database categories to their values
        const charMap = {};
        dbCharacteristics.forEach(c => {
            if (c.category) {
                charMap[c.category.toLowerCase()] = parseFloat(c.avg_score);
            }
        });

        return {
            totalLocked: totalLockedDb > 0 ? totalLockedDb : 27,
            avgLockTime: avgLockTimeDb > 0 ? avgLockTimeDb : 8.7,
            avgUnlockTime: avgUnlockTimeDb > 0 ? avgUnlockTimeDb : 2.3,
            surveyGWM: surveyGWMDb > 0 ? surveyGWMDb : 4.53,
            characteristics: {
                performance: charMap['performance efficiency'] ?? charMap['performance'] ?? 4.60,
                functional: charMap['functional suitability'] ?? charMap['functional'] ?? 4.55,
                security: charMap['security'] ?? 4.55,
                usability: charMap['usability'] ?? 4.53,
                reliability: charMap['reliability'] ?? 4.42
            }
        };
    }, [stats]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Interactive Demo Player States (Slide 11)
    const [demoActive, setDemoActive] = useState(false);
    const [demoStep, setDemoStep] = useState(0);
    const [demoMode, setDemoMode] = useState('lock'); // 'lock' or 'unlock'
    const demoTimerRef = useRef(null);

    const lockSteps = [
        { label: "File Compression", desc: "ZLIB reduces redundancy & flattens statistical payload" },
        { label: "AES-256-GCM Encryption", desc: "Encrypts payload generating 128-bit tag & 96-bit nonce" },
        { label: "Dynamic Segmentation", desc: "Splits ciphertext to match carrier capacity limits" },
        { label: "LSB Cover Embedding", desc: "Hides segments in carrier color channels / audio samples" },
        { label: "Cloud Scattering", desc: "Asynchronously uploads stego carriers across Backblaze B2" }
    ];

    const unlockSteps = [
        { label: "Cloud Retrieval", desc: "Retrieves target stego carrier files from Backblaze B2" },
        { label: "LSB Stego Extraction", desc: "Reverses LSB insertions to extract encrypted segments" },
        { label: "Payload Reassembly", desc: "Reconstructs complete encrypted payload via Stego-Map index" },
        { label: "AES-256-GCM Decryption", desc: "Decrypts & verifies integrity using GCM auth tags" },
        { label: "ZLIB Decompression", desc: "Restores plaintext document to its original state" }
    ];

    const activeSteps = demoMode === 'lock' ? lockSteps : unlockSteps;

    useEffect(() => {
        if (demoActive) {
            demoTimerRef.current = setInterval(() => {
                setDemoStep(prev => {
                    if (prev >= activeSteps.length - 1) {
                        setDemoActive(false);
                        return activeSteps.length - 1;
                    }
                    return prev + 1;
                });
            }, 1800);
        } else {
            if (demoTimerRef.current) clearInterval(demoTimerRef.current);
        }
        return () => {
            if (demoTimerRef.current) clearInterval(demoTimerRef.current);
        };
    }, [demoActive, demoMode, activeSteps.length]);

    const startDemo = (mode) => {
        setDemoMode(mode);
        setDemoStep(0);
        setDemoActive(true);
    };

    const slides = useMemo(() => [
        // Slide 1: Keep it. all goods
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
        // Slide 2: Revisions in Chapters 1 and 2
        {
            title: "Revisions in Chapters 1 and 2",
            subtitle: "Chapter 1 & 2: Project Scope & Comparative Baseline",
            content: (
                <div className="h-full flex flex-col justify-center py-4">
                    <div className="mb-4 flex items-center justify-center lg:justify-start gap-3 text-center lg:text-left group cursor-default">
                        <div className="size-10 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                            <Shield className="size-5 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Revisions in Chapters 1 and 2</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1 min-h-0">
                        {/* Left Column: Objectives (5 columns) */}
                        <div className="lg:col-span-6 flex flex-col justify-between py-6 lg:pr-4">
                            <div className="flex flex-col items-center justify-center text-center mb-8 w-full">
                                <div className="glass-panel w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-5 rounded-[1.5rem] border border-slate-200 dark:border-cyber-border/40 bg-gradient-to-r from-cyber-accent/5 via-indigo-500/5 to-purple-500/5 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyber-accent/50 transition-all duration-300 group">
                                    <Target className="text-cyber-accent size-7 sm:size-8 shrink-0 animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] group-hover:scale-110 transition-transform duration-300" />
                                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                        Objectives of the Study
                                    </h3>
                                </div>
                            </div>
                            <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                                {[
                                    "Implement AES-based encryption with a KDF-based key management process to ensure the confidentiality and integrity of a document file.",
                                    "Design and implement a segmentation process that splits the encrypted document into multiple segments and hides them through a steganographic embedding process into cover files, which are scattered across the application’s cloud storage to enhance security.",
                                    "Develop a web-based application that implements and integrates the AES-based encryption, segmentation, access control and authentication, and sharing mechanisms to a document storage platform.",
                                    "Evaluate the application based on ISO/IEC 25010 quality characteristics to assess the effectiveness in terms of functional suitability, security, reliability, and measure usability and performance efficiency."
                                ].map((desc, i) => (
                                    <div key={i} className="flex items-center gap-5 text-base leading-relaxed">
                                        <div className="size-12 rounded-[1.1rem] bg-white/80 dark:bg-black/40 border-2 border-cyber-accent/60 text-cyber-accent flex items-center justify-center font-black shrink-0 text-lg shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                                            {i + 1}
                                        </div>
                                        <div className="p-4 sm:p-5 rounded-[1.25rem] bg-white/60 dark:bg-black/35 border border-slate-200/50 dark:border-white/5 text-[13.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-semibold flex-1">
                                            {desc}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Existing Systems Analysis Card (7 columns) */}
                        <div className="lg:col-span-6 flex flex-col justify-between py-6 lg:pl-4">
                            <div className="flex flex-col items-center justify-center text-center mb-8 w-full">
                                <div className="glass-panel w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-5 rounded-[1.5rem] border border-slate-200 dark:border-cyber-border/40 bg-gradient-to-r from-cyber-accent/5 via-indigo-500/5 to-purple-500/5 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyber-accent/50 transition-all duration-300 group">
                                    <Layers className="text-indigo-400 size-7 sm:size-8 shrink-0 animate-pulse drop-shadow-[0_0_8px_rgba(99,102,241,0.4)] group-hover:scale-110 transition-transform duration-300" />
                                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                        Existing Systems Analysis
                                    </h3>
                                </div>
                            </div>
                            
                            <div className="flex-1 flex flex-col gap-6 justify-center">
                                <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 border-l-4 border-l-cyber-accent shadow-sm">
                                    <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">Operational and Deployment Characteristics</h4>
                                    <p className="text-[13.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                        Evaluates existing platforms based on their core operational purposes and storage functions, the mechanisms governing user authentication and secure data access, and the availability of browser-based deployment models for seamless end-user accessibility.
                                    </p>
                                </div>
                                
                                <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 border-l-4 border-l-indigo-500 shadow-sm">
                                    <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">Cryptographic and Security Characteristics</h4>
                                    <p className="text-[13.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                        Analyzes security efficacy by examining specific encryption algorithms and cryptographic standards, the steganographic embedding techniques used to conceal data within cover media, primary architectural advantages, and identified vulnerabilities or operational risks.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 3: Revisions in Chapters 3
        {
            title: "Revisions in Chapters 3",
            subtitle: "Chapter 3: Conceptual Framework & Layered Architecture",
            content: (
                <div className="h-full flex flex-col justify-center py-4">
                    <div className="mb-4 flex items-center justify-center lg:justify-start gap-3 text-center lg:text-left group cursor-default">
                        <div className="size-10 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                            <Shield className="size-5 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Revisions in Chapters 3</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1 min-h-0">
                        {/* Left Column: Figure 1 Conceptual Framework (7 columns) */}
                        <div className="lg:col-span-6 h-full flex flex-col items-center justify-center min-h-0 relative">
                            <div className="absolute inset-0 bg-cyber-accent/10 blur-[80px] rounded-full scale-75 opacity-40"></div>
                            <div className="relative group w-full h-[90%] flex flex-col items-center justify-center overflow-hidden pt-12">
                                <div className="absolute top-0 left-0 right-0 text-center">
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Figure 1. StegoLock Conceptual Framework</h3>
                                </div>
                                <img 
                                    src="/assets/images/stegolock_framework.png" 
                                    alt="Figure 1: StegoLock Conceptual Framework" 
                                    className="max-h-full max-w-full object-contain transition-all duration-700 group-hover:scale-[1.02]"
                                />
                            </div>
                        </div>

                        {/* Right Column: Layered Architecture Details (5 columns) */}
                        <div className="lg:col-span-6 h-full flex flex-col items-center justify-center min-h-0 relative">
                            <div className="relative w-full h-[90%] flex flex-col justify-center pt-12">
                                <div className="absolute top-0 left-0 right-0 text-center">
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">System Architecture based on Figure 2</h3>
                                </div>
                                <div className="flex flex-col gap-3 sm:gap-4">
                                    {[
                                        { title: "Presentation Layer", desc: "React and Inertia.js web UI. Governs interactive slide controllers, drag-and-drop secure locker portals, and real-time process monitoring logs.", icon: <Compass className="size-4 sm:size-5 text-cyan-400" /> },
                                        { title: "Application Logic Layer", desc: "Laravel middleware and PHP controllers interfacing with custom background queue workers and Python steganographic engines to perform envelope encryption and LSB hiding.", icon: <Cpu className="size-4 sm:size-5 text-indigo-400" /> },
                                        { title: "Persistence Layer", desc: "MySQL schema indexing the Stego-Map records, document_shares, user accounts, and background process_metrics while strictly isolating active keys.", icon: <Database className="size-4 sm:size-5 text-purple-400" /> },
                                        { title: "Storage Layer", desc: "Distributed Cloud scattering across Backblaze B2, storing anonymous media covers under randomized system-generated identifiers.", icon: <Shield className="size-4 sm:size-5 text-emerald-400" /> }
                                    ].map((layer, idx) => (
                                        <div key={idx} className="glass-panel p-4 rounded-2xl border-l-4 border-l-cyber-accent/50 bg-white/5 dark:bg-slate-900/20 flex gap-3.5 hover:border-cyber-accent transition-all duration-350 shadow-sm">
                                            <div className="size-9 sm:size-10 rounded-xl bg-cyber-accent/10 flex items-center justify-center shrink-0">
                                                {layer.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{layer.title}</h4>
                                                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed font-medium">{layer.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 4: Findings of the Study (Objective 1)
        {
            title: "Findings of the Study",
            subtitle: "Objective 1: Cryptographic Pipeline (PBKDF2 & AES-256-GCM)",
            content: (
                <div className="h-full flex flex-col justify-center py-4">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-3 text-center lg:text-left group cursor-default">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-5 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Findings of the Study</h2>
                            </div>
                        </div>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-[10px] mt-2 text-center lg:text-left lg:pl-[3.25rem]">Objective 1: Implement AES-based encryption with a KDF-based key management process to ensure the confidentiality and integrity of a document file.</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center gap-6 min-h-0 py-6">
                        {/* Card 1: Key Derivation Functions */}
                        <div className="w-full max-w-xl glass-panel p-8 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2 group-hover/card:text-cyber-accent transition-colors duration-300">
                                Key Derivation Functions
                            </h3>
                            <p className="text-cyber-accent text-lg sm:text-xl font-bold tracking-wide italic">
                                (PBKDF2 & HKDF)
                            </p>
                        </div>

                        {/* Card 2: AES-256-GCM */}
                        <div className="w-full max-w-xl glass-panel p-10 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-normal group-hover/card:text-cyber-accent transition-colors duration-300">
                                AES-256-GCM
                            </h3>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 5: Findings of the Study (Objective 2)
        {
            title: "Findings of the Study",
            subtitle: "Objective 2: Cover Generation, Segmentation & Cloud Scatter",
            content: (
                <div className="h-full flex flex-col justify-center py-2">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-3 text-center lg:text-left group cursor-default">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-5 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Findings of the Study</h2>
                            </div>
                        </div>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-[10px] mt-2 text-center lg:text-left lg:pl-[3.25rem]">Objective 2: Develop a web-based application that implements and integrates the AES-based encryption, segmentation, access control and authentication, and sharing mechanisms to a document storage platform.</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col lg:flex-row justify-center items-center gap-6 min-h-0 py-6">
                        {/* Card 1: Cover Generation & Pre-Segmentation */}
                        <div className="w-full lg:w-[17.5rem] h-40 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                Cover Generation & <br />Pre-Segmentation
                            </h3>
                        </div>

                        {/* Card 2: Segmentation & LSB Embedding */}
                        <div className="w-full lg:w-[17.5rem] h-40 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                Segmentation & <br />LSB Embedding
                            </h3>
                        </div>

                        {/* Card 3: Cloud Storage */}
                        <div className="w-full lg:w-[17.5rem] h-40 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                                Cloud Storage
                            </h3>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 6: Findings of the Study (Objective 3)
        {
            title: "Findings of the Study",
            subtitle: "Objective 3: Platform Architecture & Core Features",
            content: (
                <div className="h-full flex flex-col justify-center py-2">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-3 text-center lg:text-left group cursor-default">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-5 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Findings of the Study</h2>
                            </div>
                        </div>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-[10px] mt-2 text-center lg:text-left lg:pl-[3.25rem]">Objective 3: Design and implement a segmentation process that splits the encrypted document into multiple segments and hides them through a steganographic embedding process into cover files, which are scattered across the application’s cloud storage to enhance security.</p>
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
        },
        // Slide 7: Findings of the Study (Objective 4)
        {
            title: "Findings of the Study",
            subtitle: "Objective 4: ISO/IEC 25010 Evaluation & GWM Summary",
            content: (
                <div className="h-full flex flex-col justify-center py-2">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-3 text-center lg:text-left group cursor-default">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-5 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Findings of the Study</h2>
                            </div>
                        </div>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-[10px] mt-2 text-center lg:text-left lg:pl-[3.25rem]">Objective 4: Evaluate the application based on ISO/IEC 25010 quality characteristics to assess the effectiveness in terms of functional suitability, security, reliability, and measure usability and performance efficiency.</p>
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
        },
        // Slide 8: Summary
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
        // Slide 9: Recommendations
        {
            title: "Recommendations",
            subtitle: "Chapter 5: Actionable Future Scope & Upgrades",
            content: (
                <div className="h-full flex flex-col justify-center py-4">
                    <div className="mb-4">
                        <div className="flex items-center justify-center lg:justify-start gap-3 text-center lg:text-left group cursor-default">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                                <Shield className="size-5 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Recommendations</h2>
                            </div>
                        </div>
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
        // Slide 10: LIVE DEMO (Operations Simulator Integrated here)
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
        // Slide 11: Q&A (Quick links removed per request)
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
        // Slide 12: CAPSTONE FINALLY DEFENDED!!!😭
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
    ], [safeStats, demoStep, demoMode, demoActive, activeSteps]);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1 && !isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
                setIsAnimating(false);
            }, 300);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0 && !isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentSlide(prev => Math.max(prev - 1, 0));
                setIsAnimating(false);
            }, 300);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') nextSlide();
            if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
            if (e.key === 'Home') setCurrentSlide(0);
            if (e.key === 'End') setCurrentSlide(slides.length - 1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide, slides.length]); 

    const activeSlide = slides[currentSlide] || slides[0];

    // Header Visibility Logic (Manually triggered via slide toggle button)
    const [showHeader, setShowHeader] = useState(true);

    return (
        <div className="relative h-screen bg-mesh selection:bg-cyber-accent selection:text-white transition-colors duration-500 overflow-hidden font-sans flex flex-col">
            <Head title={`Slide ${currentSlide + 1}: ${activeSlide.title} - StegoLock Presentation`} />
            
            <DecorativeBackground />

            {/* Custom Presentation Glows and Ambient Animations */}
            <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-cyber-accent/10 dark:from-cyber-accent/20 via-transparent to-transparent blur-[120px]" />
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                
                {/* Ambient Gradient Swishes */}
                <div className="absolute top-[30%] -left-[20%] w-[50%] h-[50%] bg-cyan-400/5 dark:bg-cyan-400/10 rounded-[100%] blur-[120px] mix-blend-screen animate-swish" />
                <div className="absolute bottom-[10%] -right-[20%] w-[60%] h-[60%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-[100%] blur-[150px] mix-blend-screen animate-swish-reverse" style={{ animationDelay: '4s' }} />

                {/* Shooting Stars */}
                <div className="absolute top-[15%] -left-[20%] rotate-[25deg]">
                    <div className="w-[300px] h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-shooting-star opacity-0" style={{ animationDelay: '2s' }} />
                </div>
                <div className="absolute top-[45%] -right-[20%] -rotate-[145deg]">
                    <div className="w-[350px] h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-shooting-star opacity-0" style={{ animationDelay: '7s' }} />
                </div>
                <div className="absolute top-[75%] -left-[20%] rotate-[15deg]">
                    <div className="w-[200px] h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent animate-shooting-star opacity-0" style={{ animationDelay: '12s' }} />
                </div>
                <div className="absolute top-[10%] left-[40%] rotate-[45deg]">
                    <div className="w-[150px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent animate-shooting-star opacity-0" style={{ animationDelay: '18s' }} />
                </div>
            </div>

            {/* Navigation Header with Slide Toggle Tab */}
            <nav className={`fixed top-0 inset-x-0 z-50 glass-header border-b border-slate-200 dark:border-cyber-border/30 transition-all duration-500 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex justify-between items-center h-20 sm:h-24">
                        <Link href="/" className="group shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="relative inline-flex items-center justify-center p-2.5 sm:p-3 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-cyan-500/40 dark:shadow-[0_0_20px_rgba(34,211,238,0.6)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                    <Shield className="size-6 sm:size-7 text-white drop-shadow-md relative z-10" />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <span className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white tracking-tighter leading-[0.85] transform origin-left group-hover:scale-105 inline-block group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyber-accent group-hover:to-indigo-500 transition-all duration-300">
                                    Stego<span className="text-cyber-accent group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyber-accent group-hover:to-indigo-500 transition-all duration-300">Lock</span>
                                </span>
                            </div>
                        </Link>

                        <div className="flex items-center gap-6">
                            <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 hidden sm:block">
                                Slide {currentSlide + 1} / {slides.length}
                            </div>
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-3 text-slate-400 hover:text-cyber-accent transition-colors"
                                    aria-label="Toggle Dark Mode"
                                >
                                    {darkMode ? <Moon className="size-5" /> : <Sun className="size-5" />}
                                </button>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={prevSlide} 
                                        disabled={currentSlide === 0} 
                                        className="p-3 rounded-xl bg-slate-100 dark:bg-cyber-surface text-slate-500 hover:text-cyber-accent disabled:opacity-30 transition-all active:scale-95 border border-slate-200 dark:border-cyber-border/50"
                                    >
                                        <ArrowLeft className="size-5" />
                                    </button>
                                    <button 
                                        onClick={nextSlide} 
                                        disabled={currentSlide === slides.length - 1} 
                                        className="p-3 rounded-xl bg-gradient-to-r from-cyber-accent to-indigo-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-30 transition-all active:scale-95"
                                    >
                                        <ArrowRight className="size-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Manual Collapse / Expand Slider Tab */}
                    <button 
                        onClick={() => setShowHeader(!showHeader)}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full px-4 py-1.5 bg-white/75 dark:bg-cyber-surface/75 backdrop-blur-xl border-x border-b border-slate-200 dark:border-cyber-border/50 rounded-b-xl hover:text-cyber-accent hover:border-cyber-accent/50 hover:bg-cyber-accent/5 transition-all flex items-center gap-1 shadow-md cursor-pointer z-50 ring-1 ring-slate-200/20"
                        title={showHeader ? "Hide Presentation Menu" : "Show Presentation Menu"}
                    >
                        {showHeader ? (
                            <ChevronUp className="size-4 animate-pulse text-cyber-accent" />
                        ) : (
                            <ChevronDown className="size-4 animate-pulse text-cyber-accent" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Slide Content Area */}
            <main className={`relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-hidden transition-all duration-500 ${showHeader ? 'pt-28 sm:pt-36' : 'pt-12'}`}>
                <div className={`w-full max-w-7xl h-full flex items-center justify-center transition-all duration-500 transform ${isAnimating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                    <div className="w-full h-full overflow-hidden py-2">
                        {activeSlide.content}
                    </div>
                </div>
            </main>

            {/* Progress Bar */}
            <div className="fixed bottom-0 inset-x-0 h-1.5 bg-slate-100 dark:bg-slate-900 z-50">
                <div 
                    className="h-full bg-gradient-to-r from-cyber-accent via-indigo-500 to-purple-600 shadow-glow-cyan transition-all duration-700 ease-out" 
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
            </div>

            {/* Bottom Dots Indicator Navigation */}
            <div className="fixed bottom-3 left-1/2 -translate-x-1/2 flex gap-3 z-50 px-6 py-3 bg-white/50 dark:bg-cyber-void/50 backdrop-blur-xl rounded-full border border-slate-200 dark:border-cyber-border/30 shadow-2xl">
                {slides.map((_, i) => (
                    <button 
                        key={i} 
                        onClick={() => setCurrentSlide(i)}
                        className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === i ? 'w-8 bg-cyber-accent shadow-glow-cyan' : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-cyber-accent/50'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .bg-mesh {
                    background-color: #f8fafc;
                    background-image: 
                        radial-gradient(at 0% 0%, rgba(34, 211, 238, 0.08) 0px, transparent 50%),
                        radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.08) 0px, transparent 50%),
                        radial-gradient(at 50% 100%, rgba(168, 85, 247, 0.06) 0px, transparent 50%);
                }
                .dark .bg-mesh {
                    background-color: #030712;
                    background-image: 
                        radial-gradient(at 0% 0%, rgba(34, 211, 238, 0.15) 0px, transparent 50%),
                        radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
                        radial-gradient(at 50% 100%, rgba(168, 85, 247, 0.1) 0px, transparent 50%);
                }
                .glass-header {
                    background: rgba(255, 255, 255, 0.4);
                    backdrop-filter: blur(24px) saturate(180%);
                    -webkit-backdrop-filter: blur(24px) saturate(180%);
                }
                .dark .glass-header {
                    background: rgba(15, 23, 42, 0.2);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }
                .glass-panel {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
                }
                .dark .glass-panel {
                    background: rgba(20, 20, 30, 0.4);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5);
                }
                .shadow-glow-cyan {
                    box-shadow: 0 0 20px rgba(34, 211, 238, 0.4);
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                @keyframes swish {
                    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
                    25% { transform: translate(15vw, 10vh) scale(1.1); opacity: 0.8; }
                    50% { transform: translate(25vw, -5vh) scale(0.9); opacity: 0.6; }
                    75% { transform: translate(-10vw, 15vh) scale(1.2); opacity: 0.9; }
                }
                @keyframes swish-reverse {
                    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
                    33% { transform: translate(-20vw, -15vh) scale(1.15); opacity: 0.8; }
                    66% { transform: translate(10vw, 20vh) scale(0.85); opacity: 0.6; }
                }
                @keyframes shooting-star {
                    0% { transform: translateX(0); opacity: 0; }
                    5% { opacity: 1; }
                    15% { transform: translateX(150vw); opacity: 0; }
                    100% { transform: translateX(150vw); opacity: 0; }
                }
                .animate-swish {
                    animation: swish 22s ease-in-out infinite alternate;
                }
                .animate-swish-reverse {
                    animation: swish-reverse 28s ease-in-out infinite alternate;
                }
                .animate-shooting-star {
                    animation: shooting-star 15s linear infinite;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </div>
    );
}
