import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Shield, Lock, Layers, EyeOff, BarChart3, 
    ArrowRight, ArrowLeft, Play, Info, ShieldCheck,
    CheckCircle2, AlertTriangle, Zap, Target,
    Trophy, Users, Cpu, Database, Moon, Sun
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

    // Provide defaults for stats to prevent undefined errors
    const safeStats = {
        totalLocked: stats?.totalLocked ?? 0,
        avgLockTime: stats?.avgLockTime ?? 0,
        avgUnlockTime: stats?.avgUnlockTime ?? 0,
        surveyGWM: stats?.surveyGWM ?? 0,
        characteristics: stats?.characteristics ?? []
    };

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const slides = useMemo(() => [
        // Slide 1: Title
        {
            title: "StegoLock",
            subtitle: "Final Defense: Chapter 4 & 5",
            content: (
                <div className="flex flex-col items-center justify-center text-center animate-fade-in py-12">
                    <div className="group flex flex-col items-center cursor-default">
                        <div className="relative mb-12">
                            <div className="relative inline-flex items-center justify-center p-12 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-[3.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                                <Shield className="size-32 text-white drop-shadow-2xl relative z-10" />
                                <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            {/* Glow behind the icon */}
                            <div className="absolute inset-0 bg-cyber-accent/20 blur-[80px] -z-10 rounded-full animate-pulse"></div>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-8xl lg:text-9xl font-[900] text-slate-900 dark:text-white tracking-tighter leading-none transform origin-top group-hover:scale-105 inline-block transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyber-accent group-hover:to-indigo-500">
                                Stego<span className="text-cyber-accent group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyber-accent group-hover:to-indigo-500 transition-all duration-300">Lock</span>
                            </h1>
                            <div className="h-2 w-32 bg-cyber-accent mx-auto rounded-full shadow-glow-cyan" />
                            <p className="text-lg text-slate-500 dark:text-slate-400 font-black max-w-4xl mx-auto leading-relaxed uppercase tracking-[0.1em]">
                                A CLOUD-BASED WEB APPLICATION BUILT ON A <span className="text-cyber-accent font-black drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">RECONSTRUCTION-DEPENDENT SECURITY ARCHITECTURE</span> FOR DIGITAL DOCUMENT STORAGE <br/>
                                <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mt-12 block">Presented by THE CRIP</span>
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 2: The Problem (Chapter 1)
        {
            title: "The Problem",
            subtitle: "Chapter 1: Context & Rationale",
            content: (
                <div className="h-full flex flex-col justify-center pt-8">
                    <div className="mb-12 text-center lg:text-left">
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">The Problem</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-red-500 bg-red-500/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <AlertTriangle className="text-red-500 size-5" />
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">The $4.4M Risk</h3>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Average data breach cost has reached <strong className="text-slate-900 dark:text-white font-black">$4.4 million</strong>. Thales Report 2025 highlights increasing complexity in digital document environments.
                                </p>
                            </div>
                            <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-orange-500 bg-orange-500/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <Shield className="text-orange-500 size-5" />
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Provider Fragility</h3>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Compromises in <strong className="text-slate-900 dark:text-white font-black">Google Drive (40% file exposure)</strong>, iCloud, Dropbox Sign, and OneDrive reveal structural flaws in centralized encryption-only models.
                                </p>
                            </div>
                            <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-amber-500 bg-amber-500/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <EyeOff className="text-amber-500 size-5" />
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Post-Breach Recovery</h3>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Conventional encryption fails when intercepted files are subjected to <strong className="text-slate-900 dark:text-white font-black">unauthorized decryption attempts</strong> through brute-force outside the protected system.
                                </p>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center justify-center text-center space-y-8 py-12 px-8">
                            <div className="absolute inset-0 bg-cyber-accent/5 blur-[120px] rounded-full"></div>
                            <div className="relative">
                                <div className="text-6xl font-black text-cyber-accent tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">THE GAP</div>
                                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                                    Current models fail when the <strong className="text-cyber-accent">ciphertext becomes independently accessible</strong>. We need an architecture where decryption is structurally dependent on <strong className="text-cyber-accent">reconstruction</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 3: The Solution (Chapter 3)
        {
            title: "The Three-Pillar Model",
            subtitle: "Chapter 3: Methodology & Technical Design",
            content: (
                <div className="h-full flex flex-col justify-between py-6">
                    {/* Header Section */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-2">The Three-Pillar Model</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Reconstruction-Dependent Security Architecture</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 min-h-0 py-8">
                        {/* Left: Figure 1 (Taking 7 columns, but with a more compact container) */}
                        <div className="lg:col-span-7 h-full flex flex-col items-center justify-center min-h-0 relative">
                            <div className="absolute inset-0 bg-cyber-accent/10 blur-[80px] rounded-full scale-75 opacity-40"></div>
                            <div className="glass-panel p-8 rounded-[2.5rem] bg-white dark:bg-slate-900/50 border-slate-200 dark:border-cyber-accent/20 shadow-2xl relative group w-[92%] h-[88%] flex items-center justify-center overflow-hidden ring-1 ring-slate-100 dark:ring-white/10">
                                <img 
                                    src="/assets/images/figure1.png" 
                                    alt="Figure 1: Reconstruction-Dependent Security Architecture" 
                                    className="max-h-full max-w-full object-contain transition-all duration-700 group-hover:scale-[1.02]"
                                />
                                <div className="absolute bottom-4 right-6 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest opacity-70">
                                    Figure 1. The Reconstruction-Dependent Security Architecture
                                </div>
                            </div>
                        </div>

                        {/* Right: Premium Orbital Pillars (Taking 5 columns) */}
                        <div className="lg:col-span-5 flex flex-col h-full gap-6">
                            {/* Animation Area */}
                            <div className="relative flex-1 min-h-[350px] flex items-center justify-center">
                                {/* HUD Orbital Rings */}
                                <div className="absolute size-[280px] rounded-full border border-slate-200 dark:border-cyber-accent/10 animate-[spin_20s_linear_infinite]"></div>
                                <div className="absolute size-[340px] rounded-full border border-dashed border-slate-100 dark:border-cyber-accent/5 animate-[spin_30s_linear_infinite_reverse]"></div>
                                
                                {/* Revolving Container */}
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {[
                                        { title: "Master Key", icon: <Zap className="size-6" />, color: "amber", delay: "0s" },
                                        { title: "Stego-Map", icon: <Database className="size-6" />, color: "indigo", delay: "-5s" },
                                        { title: "Stego-Files", icon: <Layers className="size-6" />, color: "cyan", delay: "-10s" }
                                    ].map((pillar, i) => (
                                        <div 
                                            key={i} 
                                            className="absolute animate-orbital"
                                            style={{ animationDelay: pillar.delay }}
                                        >
                                            <div className="glass-panel size-32 rounded-full border-slate-200 dark:border-cyber-accent/30 flex flex-col items-center justify-center text-center p-3 group hover:border-cyber-accent transition-all duration-500 shadow-xl dark:shadow-glow-cyan/5 bg-white/80 dark:bg-white/10 backdrop-blur-2xl ring-1 ring-slate-100 dark:ring-white/10 hover:shadow-glow-cyan/20">
                                                <div className="size-9 rounded-xl bg-cyber-accent/10 flex items-center justify-center text-cyber-accent mb-1 group-hover:scale-110 transition-transform">
                                                    {pillar.icon}
                                                </div>
                                                <h4 className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none px-2">{pillar.title}</h4>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Center Core: The Reconstruction Module */}
                                    <div className="relative z-10 size-20 rounded-full glass-panel border-cyber-accent/50 bg-cyber-accent/20 flex flex-col items-center justify-center shadow-glow-cyan overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyber-accent/20 to-transparent animate-pulse"></div>
                                        <Shield className="size-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] relative z-10" />
                                        <span className="text-[7px] font-black text-white uppercase tracking-tighter mt-1 relative z-10">CORE</span>
                                    </div>
                                </div>

                                <style dangerouslySetInnerHTML={{ __html: `
                                    @keyframes orbital {
                                        from { transform: rotate(0deg) translateX(130px) rotate(0deg); }
                                        to { transform: rotate(360deg) translateX(130px) rotate(-360deg); }
                                    }
                                    .animate-orbital {
                                        animation: orbital 15s linear infinite;
                                    }
                                `}} />
                            </div>

                            {/* System Security Note */}
                            <div className="glass-panel p-5 rounded-[2.5rem] border-t-2 border-cyber-accent bg-cyber-accent/5 backdrop-blur-md relative overflow-hidden group shrink-0">
                                    <div className="flex flex-col gap-5 relative z-10">
                                        {/* Header: Top Center */}
                                        <div className="flex items-center justify-center gap-3 pb-2">
                                            <ShieldCheck className="size-4 text-cyber-accent opacity-50" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">System Security</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 items-center">
                                            {/* Left Side: Status Cards */}
                                            <div className="space-y-2">
                                                <div className="flex flex-col gap-1 p-2 bg-white/5 dark:bg-black/20 rounded-xl border border-slate-200/10 group/row hover:bg-red-500/5 transition-colors text-center">
                                                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">Map without the Key</span>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <span className="text-[9px] font-black text-red-500 uppercase tracking-widest italic">Unreadable</span>
                                                        <AlertTriangle className="size-2.5 text-red-500" />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-1 p-2 bg-white/5 dark:bg-black/20 rounded-xl border border-slate-200/10 group/row hover:bg-orange-500/5 transition-colors text-center">
                                                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">Files without the Map</span>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest italic">Unidentifiable</span>
                                                        <EyeOff className="size-2.5 text-orange-500" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Side: Summary Note */}
                                            <div className="h-full flex items-center">
                                                <div className="p-4 bg-cyber-accent/10 rounded-2xl border border-cyber-accent/30 text-center relative overflow-hidden group/btn h-fit">
                                                    <div className="absolute inset-0 bg-cyber-accent/5 translate-y-full group-hover/btn:translate-y-0 transition-transform"></div>
                                                    <p className="text-[11px] leading-relaxed text-slate-900 dark:text-white font-medium relative z-10">
                                                        Successful reconstruction requires the <span className="text-cyber-accent font-black uppercase tracking-widest">simultaneous presence</span> of all three elements.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 4: Objective 1 Findings
        {
            title: "Objective 1: Cryptographic Foundation",
            subtitle: "Chapter 4: AES-256-GCM & Key Management Findings",
            content: (
                <div className="h-full flex flex-col justify-center">
                    <div className="mb-12 text-center lg:text-left">
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Objective 1 Findings</h2>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-xs">Cryptographic Integrity & Key Hierarchy</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="glass-panel p-6 sm:p-8 rounded-[2.5rem] border-l-4 border-l-cyber-accent relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <ShieldCheck className="size-24" />
                                </div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Encryption Standard</div>
                                <div className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                                    AES-256-GCM
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-cyber-accent font-bold text-xs">
                                    <div className="p-1 rounded-full bg-cyber-accent/20">
                                        <CheckCircle2 className="size-3" />
                                    </div>
                                    Authenticated Encryption & Integrity
                                </div>
                            </div>
                            <div className="glass-panel p-6 sm:p-8 rounded-[2.5rem] border-l-4 border-l-indigo-500">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Key Derivation (KDF)</div>
                                <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">PBKDF2 & HKDF</div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">100,000 Iterations for brute-force resistance. Hierarchical Master Key + DEK wrapping.</p>
                            </div>
                        </div>
                        <div className="glass-panel p-8 rounded-[2.5rem] border-slate-200 dark:border-cyber-border/30 bg-gradient-to-br from-white to-slate-50 dark:from-cyber-surface/20 dark:to-cyber-void/40">
                            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Security Achievements</h4>
                            <div className="space-y-6">
                                {[
                                    { title: "Envelope Encryption", desc: "DEKs are wrapped and never stored in plaintext.", icon: <Lock className="size-5"/> },
                                    { title: "Integrity Verification", desc: "16-byte GCM tags ensure zero-tamper storage.", icon: <Shield className="size-5"/> },
                                    { title: "ZLIB Compression", desc: "Statistical pattern removal before encryption.", icon: <Zap className="size-5"/> }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="size-10 rounded-xl bg-cyber-accent/10 flex items-center justify-center text-cyber-accent shrink-0 group-hover:bg-cyber-accent group-hover:text-white transition-colors">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{item.title}</div>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 5: Objective 2 Findings
        {
            title: "Objective 2: Data Fragmentation & Hiding",
            subtitle: "Chapter 4: Segmentation & Steganography Findings",
            content: (
                <div className="h-full flex flex-col justify-center">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Objective 2 Findings</h2>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-xs">Multi-Media Steganography & Cloud Scattering</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="glass-panel p-6 rounded-[2.5rem] border-t-4 border-t-cyan-500 text-center">
                            <div className="mx-auto size-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500 mb-4">
                                <Layers className="size-7" />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Fluid Splitting</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                Dynamic "Right-Sized" segmentation based on cover capacity and document tiering.
                            </p>
                        </div>
                        <div className="glass-panel p-6 rounded-[2.5rem] border-t-4 border-t-purple-500 text-center">
                            <div className="mx-auto size-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-4">
                                <EyeOff className="size-7" />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Steganography</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                LSB embedding in **Image (PNG)**, **Audio (WAV)**, and **Text** with safety margins.
                            </p>
                        </div>
                        <div className="glass-panel p-6 rounded-[2.5rem] border-t-4 border-t-indigo-500 text-center">
                            <div className="mx-auto size-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 mb-4">
                                <Database className="size-7" />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Cloud Scattering</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                Distribution across **Backblaze B2** as standalone objects to eliminate single point of failure.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 glass-panel p-6 rounded-[2.5rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-accent/5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-cyber-accent/20 text-cyber-accent font-black text-xs uppercase tracking-widest">Reconstruction</div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                                "Unique delimiters (**###STEGOLOCK###**) allow precise bit-level reconstruction from scattered fragments."
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 6: Objective 3 Findings
        {
            title: "Objective 3: Platform Integration",
            subtitle: "Chapter 4: Full-Stack Web Storage Platform Findings",
            content: (
                <div className="h-full flex flex-col justify-center">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Objective 3 Findings</h2>
                        <p className="text-cyber-accent font-bold uppercase tracking-widest text-xs">Full-Stack Implementation & Secure Sharing</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-cyber-accent">
                                <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 flex items-center gap-2">
                                    <Cpu className="size-5 text-cyber-accent" /> Modern Stack
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Laravel 11 Backend + React Frontend via Inertia.js. High-performance SPA with background job orchestration.
                                </p>
                            </div>
                            <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-indigo-500">
                                <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 flex items-center gap-2">
                                    <Users className="size-5 text-indigo-500" /> Secure Sharing
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    End-to-end security via **Key Re-wrapping**. Recipients unlock files with their own keys without exposing owner credentials.
                                </p>
                            </div>
                        </div>
                        <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-purple-500 flex flex-col justify-center">
                            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                                <ShieldCheck className="size-5 text-purple-500" /> Access Control (RBAC)
                            </h4>
                            <div className="grid grid-cols-3 gap-2">
                                {['User', 'Admin', 'Superadmin'].map(role => (
                                    <div key={role} className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl text-center border border-slate-200 dark:border-white/10">
                                        <div className="text-[10px] font-black text-slate-900 dark:text-white">{role}</div>
                                        <div className="text-[8px] text-slate-500 uppercase mt-1">Role</div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-4 italic text-center">
                                Integrated PBKDF2/AES Master Key recovery during authentication flow.
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 7: Objective 4 Findings
        {
            title: "Objective 4: ISO/IEC 25010 Evaluation",
            subtitle: "Chapter 4: Quality Characteristics Assessment Findings",
            content: (
                <div className="h-full flex flex-col justify-center">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Objective 4 Findings</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="relative group flex flex-col items-center justify-center">
                            <div className="absolute -inset-10 bg-cyber-accent/10 blur-[120px] rounded-full group-hover:bg-cyber-accent/15 transition-colors"></div>
                            <div className="relative text-center">
                                <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.4em] mb-6">GENERAL WEIGHTED MEAN</div>
                                <div className="text-[8rem] sm:text-[10rem] font-black text-slate-900 dark:text-white leading-none tracking-tighter drop-shadow-2xl">
                                    {safeStats.surveyGWM}
                                </div>
                                <div className="mt-8 flex justify-center gap-3">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Trophy key={i} className={`size-8 sm:size-10 ${i <= Math.floor(safeStats.surveyGWM) ? 'text-cyber-accent drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'text-slate-200 dark:text-slate-800'}`} />
                                    ))}
                                </div>
                                <div className="mt-10 flex flex-col items-center">
                                    <div className="px-10 py-4 bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs inline-block backdrop-blur-sm text-center leading-tight">
                                        <span className="text-xl block mb-1 tracking-widest">STRONGLY AGREE</span>
                                        <span className="text-[9px] opacity-60 tracking-[0.4em] font-bold">Likert Scale Description</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { title: "Performance Efficiency", score: "4.60", desc: "Strongly Agree", icon: <Zap className="size-4"/>, color: "text-blue-500" },
                                { title: "Functional Suitability", score: "4.55", desc: "Strongly Agree", icon: <CheckCircle2 className="size-4"/>, color: "text-emerald-500" },
                                { title: "Security", score: "4.55", desc: "Strongly Agree", icon: <ShieldCheck className="size-4"/>, color: "text-cyber-accent" },
                                { title: "Usability", score: "4.53", desc: "Strongly Agree", icon: <Users className="size-4"/>, color: "text-indigo-500" },
                                { title: "Reliability", score: "4.42", desc: "Agree", icon: <Shield className="size-4"/>, color: "text-amber-500" }
                            ].map((item, i) => (
                                <div key={i} className="glass-panel p-3 px-5 rounded-2xl flex items-center justify-between border-slate-200 dark:border-cyber-border/30 hover:border-cyber-accent transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className={`size-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">{item.title}</div>
                                            <div className="text-[9px] text-slate-400 font-bold mt-1.5 uppercase tracking-[0.2em]">{item.desc}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-2xl font-black text-cyber-accent tracking-tighter leading-none">{item.score}</div>
                                        <div className="w-16 h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden mt-2 border border-slate-200 dark:border-white/5">
                                            <div className="h-full bg-gradient-to-r from-cyber-accent to-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${(parseFloat(item.score) / 5) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 8: Summary of Findings
        {
            title: "Summary of Findings",
            subtitle: "Chapter 5: Research Outcome Synthesis",
            content: (
                <div className="h-full flex flex-col justify-center">
                    <div className="mb-12 text-center lg:text-left">
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Summary of Findings</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="glass-panel p-8 rounded-[2.5rem] border-l-4 border-l-green-500 bg-green-500/5">
                                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4">Core Achievements</h4>
                                <ul className="space-y-4">
                                    {[
                                        "Seamless integration of AES-256-GCM and multi-media steganography.",
                                        "Successful implementation of reconstruction-dependent scattering.",
                                        "Robust full-stack architecture with secure cryptographic sharing."
                                    ].map((text, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            <CheckCircle2 className="size-5 text-green-500 shrink-0 mt-0.5" />
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="glass-panel p-8 rounded-[2.5rem] border-cyber-accent/30 bg-cyber-accent/5 flex flex-col justify-center">
                            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4">Final Conclusion</h4>
                            <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                                "StegoLock successfully bridges the gap between high-level document privacy and cloud storage efficiency, providing a defensible architecture where data recovery is structurally tied to the simultaneous presence of the user's key, the system map, and scattered cloud fragments."
                            </p>
                            <div className="mt-8 flex items-center justify-center gap-4">
                                <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                                <Trophy className="size-8 text-cyber-accent animate-bounce" />
                                <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 9: Recommendations (Chapter 5)
        {
            title: "Recommendations",
            subtitle: "Chapter 5: Future Directions",
            content: (
                <div className="h-full flex flex-col justify-center">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Recommendations</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { 
                                title: "Efficiency & Optimization", 
                                subtitle: "System Improvement",
                                items: ["Intelligent Payload Distribution", "Dynamic Segmentation Logic"],
                                icon: <Zap className="size-6" />,
                                color: "blue"
                            },
                            { 
                                title: "Dynamic Protection", 
                                subtitle: "Security Enhancement",
                                items: ["Automated Re-encryption Cycles", "Argon2 Key Derivation Upgrade"],
                                icon: <Shield className="size-6" />,
                                color: "indigo"
                            },
                            { 
                                title: "Concealment & Mobility", 
                                subtitle: "Future Research",
                                items: ["AI-driven Cover Generation", "Dynamic Cloud Files Relocation"],
                                icon: <Layers className="size-6" />,
                                color: "purple"
                            },
                            { 
                                title: "Enterprise & Mobile Use", 
                                subtitle: "Practical Application",
                                items: ["Native Mobile Biometric Security", "Secure API for Workflow Integration"],
                                icon: <Cpu className="size-6" />,
                                color: "cyan"
                            }
                        ].map((rec, i) => (
                            <div key={i} className="glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 hover:border-cyber-accent transition-all duration-500 group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-2xl bg-cyber-accent/10 text-cyber-accent group-hover:scale-110 transition-transform">
                                        {rec.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 dark:text-white tracking-tight leading-none">{rec.title}</h4>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1 inline-block">{rec.subtitle}</span>
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {rec.items.map((item, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <div className="size-1 bg-cyber-accent rounded-full shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        // Slide 10: Q&A
        {
            title: "Thank You",
            subtitle: "Final Defense | StegoLock Project",
            content: (
                <div className="flex flex-col items-center justify-center text-center space-y-12 h-full">
                    <div className="relative group">
                        <div className="relative inline-flex items-center justify-center p-12 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-[3.5rem] shadow-2xl shadow-cyan-500/50 dark:shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                            <Shield className="size-32 text-white drop-shadow-2xl relative z-10" />
                            <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        {/* Glow behind the icon */}
                        <div className="absolute inset-0 bg-cyber-accent/20 blur-[80px] -z-10 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-5xl font-black text-white">QUESTIONS & ANSWERS</h2>
                        <p className="text-slate-400">We are now open for clarifications and feedback.</p>
                    </div>
                    <Link 
                        href="/" 
                        className="mt-12 px-8 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                    >
                        Back to Application
                    </Link>
                </div>
            )
        }
    ], [safeStats]);

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
    }, [currentSlide, slides.length]); // Added slides.length for completeness

    const activeSlide = slides[currentSlide] || slides[0];

    // Header Visibility Logic
    const [showHeader, setShowHeader] = useState(true);
    const headerTimeoutRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = () => {
            setShowHeader(true);
            if (headerTimeoutRef.current) clearTimeout(headerTimeoutRef.current);
            headerTimeoutRef.current = setTimeout(() => {
                setShowHeader(false);
            }, 3000); // Hide after 3 seconds of inactivity
        };

        window.addEventListener('mousemove', handleMouseMove);
        handleMouseMove(); // Initial call to start timer

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (headerTimeoutRef.current) clearTimeout(headerTimeoutRef.current);
        };
    }, []);

    return (
        <div className="relative h-screen bg-mesh selection:bg-cyber-accent selection:text-white transition-colors duration-500 overflow-hidden font-sans flex flex-col">
            <Head title={`Slide ${currentSlide + 1}: ${activeSlide.title} - StegoLock Presentation`} />
            
            <DecorativeBackground />

            {/* Custom Presentation Glows */}
            <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-cyber-accent/10 dark:from-cyber-accent/20 via-transparent to-transparent blur-[120px]" />
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Navigation - Styled like Welcome.jsx */}
            <nav className={`fixed top-0 inset-x-0 z-50 glass-header border-b border-slate-200 dark:border-cyber-border/30 transition-all duration-500 ${showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                </div>
            </nav>

            {/* Slide Content Area */}
            <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-hidden pt-28 sm:pt-36">
                <div className={`w-full max-w-7xl h-full flex items-center justify-center transition-all duration-500 transform ${isAnimating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                    <div className="w-full h-full overflow-hidden py-4">
                        {activeSlide.content}
                    </div>
                </div>
            </main>

            {/* Progress Bar - Sleeker */}
            <div className="fixed bottom-0 inset-x-0 h-1.5 bg-slate-100 dark:bg-slate-900 z-50">
                <div 
                    className="h-full bg-gradient-to-r from-cyber-accent via-indigo-500 to-purple-600 shadow-glow-cyan transition-all duration-700 ease-out" 
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
            </div>

            {/* Navigation Indicators - Styled like Welcome buttons */}
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
