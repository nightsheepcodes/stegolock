import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Shield, Lock, Layers, EyeOff, BarChart3, 
    ArrowRight, ArrowLeft, Play, Info, ShieldCheck,
    CheckCircle2, AlertTriangle, Zap, Target,
    Trophy, Users, Cpu, Database, Moon, Sun,
    Share2, Compass, Activity, FileText, Volume2, Image,
    FolderOpen, HelpCircle, ChevronUp, ChevronDown, Cloud, FileDigit
} from 'lucide-react';
import { DecorativeBackground } from '@/Components/DecorativeBackground';
import { usePresentationSlides } from '@/Components/PresentationSlides';

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

    const slides = usePresentationSlides({ safeStats, demoStep, demoMode, demoActive, activeSteps, currentSlide });

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
                @keyframes data-flow {
                    0% { transform: translateX(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateX(400%); opacity: 0; }
                }
                .animate-data-flow {
                    animation: data-flow 3s linear infinite;
                }
                @keyframes slice-top {
                    0%, 15% { transform: translate(0, 0); }
                    35%, 65% { transform: translate(-8px, -12px) rotate(-8deg); }
                    85%, 100% { transform: translate(0, 0); }
                }
                @keyframes slice-mid {
                    0%, 15% { transform: translate(0, 0); }
                    35%, 65% { transform: translate(12px, 0); }
                    85%, 100% { transform: translate(0, 0); }
                }
                @keyframes slice-bot {
                    0%, 15% { transform: translate(0, 0); }
                    35%, 65% { transform: translate(-4px, 12px) rotate(8deg); }
                    85%, 100% { transform: translate(0, 0); }
                }
                .animate-slice-top { animation: slice-top 3s cubic-bezier(0.34,1.56,0.64,1) infinite; }
                .animate-slice-mid { animation: slice-mid 3s cubic-bezier(0.34,1.56,0.64,1) infinite; }
                .animate-slice-bot { animation: slice-bot 3s cubic-bezier(0.34,1.56,0.64,1) infinite; }
                @keyframes pulse-slow-anim {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow-anim 4s ease-in-out infinite;
                }
                @keyframes reverse-spin-anim {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-reverse-spin {
                    animation: reverse-spin-anim 4s linear infinite;
                }
                @keyframes spin-slow-anim {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow-6s {
                    animation: spin-slow-anim 6s linear infinite;
                }
                @keyframes particle-anim {
                    0% { transform: translate(-80px, 0) scale(0); opacity: 0; }
                    20% { transform: translate(-40px, -20px) scale(1); opacity: 1; }
                    80% { transform: translate(40px, 20px) scale(1); opacity: 1; }
                    100% { transform: translate(80px, 0) scale(0); opacity: 0; }
                }
                .animate-particle-1 { animation: particle-anim 2s ease-in-out infinite; }
                .animate-particle-2 { animation: particle-anim 2.5s ease-in-out infinite 0.5s; }
                .animate-particle-3 { animation: particle-anim 2.2s ease-in-out infinite 1s; }
                
                @keyframes stego-fly-anim {
                    0% { transform: translate(-60px, 20px) scale(0); opacity: 0; }
                    30% { transform: translate(-30px, -10px) scale(1); opacity: 1; }
                    70% { transform: translate(10px, 0) scale(1); opacity: 1; }
                    100% { transform: translate(40px, -20px) scale(0); opacity: 0; }
                }
                .animate-stego-fly-1 { animation: stego-fly-anim 3s ease-in-out infinite; }
                .animate-stego-fly-2 { animation: stego-fly-anim 3s ease-in-out infinite 1.5s; }
                
                @keyframes cloud-fill-anim {
                    0% { height: 0%; opacity: 0.2; }
                    50% { height: 100%; opacity: 0.6; }
                    100% { height: 0%; opacity: 0.2; }
                }
                .animate-cloud-fill { animation: cloud-fill-anim 4s ease-in-out infinite; }
                
                @keyframes orbit-cover {
                    0% { transform: rotate(0deg) translateX(72px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(72px) rotate(-360deg); }
                }
                .animate-orbit-1 { animation: orbit-cover 9s linear infinite; }
                .animate-orbit-2 { animation: orbit-cover 9s linear infinite -3s; }
                .animate-orbit-3 { animation: orbit-cover 9s linear infinite -6s; }
                
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
