import React from 'react';
import { 
    Shield, BarChart3, CheckCircle2, Compass, 
    ArrowRight, Activity, Layers, Cpu, Database, Users 
} from 'lucide-react';

function Chapter5Slide12Content({ activeModal, setActiveModal, summaryPage, setSummaryPage }) {
    return (
        <div className="h-full flex flex-col justify-center py-2 relative">
            <div className="mb-4">
                <div className="flex items-center justify-center lg:justify-start gap-4 text-center lg:text-left group cursor-default">
                    <div className="size-14 rounded-xl bg-gradient-to-br from-cyber-accent to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/50 dark:group-hover:shadow-cyan-500/70">
                        <Shield className="size-7 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div>
                        <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Chapter 5</h2>
                    </div>
                </div>
                <p className="text-cyber-accent font-bold uppercase tracking-widest text-sm mt-3 text-center lg:text-left lg:pl-[4.5rem]">Summary, Conclusions, and Recommendations</p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto w-full mt-4">
                {/* Summary Card */}
                <div 
                    onClick={() => setActiveModal('c5_summary')}
                    className="glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-between group/card cursor-pointer shadow-lg shadow-cyan-500/5 relative"
                >
                    <div className="space-y-4">
                        <div className="size-12 rounded-xl bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-accent flex items-center justify-center group-hover/card:scale-110 group-hover/card:bg-cyber-accent group-hover/card:text-slate-950 transition-all duration-300">
                            <BarChart3 className="size-6" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover/card:text-cyber-accent transition-colors duration-300">
                            Summary of Findings
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            Triangulated analysis of system metrics and user evaluations from 30 participants, validating performance efficiency and integrity.
                        </p>
                    </div>
                    <div className="mt-6 flex items-center text-xs font-black text-cyber-accent uppercase tracking-widest group-hover/card:translate-x-2 transition-transform duration-300">
                        View Summary <ArrowRight className="size-4 ml-1" />
                    </div>
                </div>

                {/* Conclusions Card */}
                <div 
                    onClick={() => setActiveModal('c5_conclusions')}
                    className="glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-between group/card cursor-pointer shadow-lg shadow-cyan-500/5 relative"
                >
                    <div className="space-y-4">
                        <div className="size-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover/card:scale-110 group-hover/card:bg-indigo-500 group-hover/card:text-slate-950 transition-all duration-300">
                            <CheckCircle2 className="size-6" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover/card:text-indigo-400 transition-colors duration-300">
                            Conclusions
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            Key conclusions drawn across StegoLock's four objectives, confirming cryptographic, steganographic, and architectural efficacy.
                        </p>
                    </div>
                    <div className="mt-6 flex items-center text-xs font-black text-indigo-400 uppercase tracking-widest group-hover/card:translate-x-2 transition-transform duration-300">
                        View Conclusions <ArrowRight className="size-4 ml-1" />
                    </div>
                </div>

                {/* Recommendations Link Card */}
                <div 
                    onClick={() => setActiveModal('c5_recommendations_summary')}
                    className="glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-between group/card cursor-pointer shadow-lg shadow-cyan-500/5 relative"
                >
                    <div className="space-y-4">
                        <div className="size-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover/card:scale-110 group-hover/card:bg-purple-500 group-hover/card:text-slate-950 transition-all duration-300">
                            <Compass className="size-6" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover/card:text-purple-400 transition-colors duration-300">
                            Future Pathways
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            Actionable recommendations addressing payload distribution, automated moving targets, and enterprise integrations.
                        </p>
                    </div>
                    <div className="mt-6 flex items-center text-xs font-black text-purple-400 uppercase tracking-widest group-hover/card:translate-x-2 transition-transform duration-300">
                        View Overview <ArrowRight className="size-4 ml-1" />
                    </div>
                </div>
            </div>

            {/* Modals inside content */}
            {activeModal && ['c5_summary', 'c5_conclusions', 'c5_recommendations_summary'].includes(activeModal) && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent"
                    onClick={() => setActiveModal(null)}
                >
                    <div 
                        className="bg-slate-900/95 border border-cyber-accent/40 w-full max-w-4xl p-6 sm:p-10 rounded-[2.5rem] relative shadow-2xl shadow-cyan-500/20 animate-scale-up flex flex-col max-h-[75vh]"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-xl z-10"
                        >
                            ✕
                        </button>

                        {/* Modal Header */}
                        <div className="flex items-center gap-4 border-b border-slate-800 pb-5 shrink-0 mb-6">
                            <div className="size-14 rounded-2xl bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/5">
                                {activeModal === 'c5_summary' && <BarChart3 className="size-7" />}
                                {activeModal === 'c5_conclusions' && <CheckCircle2 className="size-7 text-indigo-400" />}
                                {activeModal === 'c5_recommendations_summary' && <Compass className="size-7 text-purple-400" />}
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                    {activeModal === 'c5_summary' && (summaryPage === 1 ? 'Summary of findings' : 'Overall Research Summary')}
                                    {activeModal === 'c5_conclusions' && 'Conclusions'}
                                    {activeModal === 'c5_recommendations_summary' && 'Recommendations'}
                                </h2>
                            </div>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="text-slate-300 space-y-6 text-base leading-relaxed overflow-y-auto min-h-0 pr-4">
                            {activeModal === 'c5_summary' && summaryPage === 1 && (
                                <div className="space-y-4 animate-fade-in">
                                    <p className="text-justify indent-8">
                                        The proposed steganographic security model demonstrated robust document protection while maintaining a critical balance between concealment and storage efficiency. Achieving a **100% integrity success rate (n=27)** with bit-perfect SHA-256 validation, the system demonstrates optimal stability for standard documents (&lt;1MB) with a **5.48s mean lock duration** and **6.0x expansion**. At larger tiers (3MB–5MB), the system scales to up to **31 fragments** and **21.0x footprint expansion (Avg: 85.74MB)**. While resource-intensive, this footprint is architectural proof of StegoLock's reconstruction-dependent security, completely defeating forensic steganography detection.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                                        <div className="bg-slate-950/40 border border-cyber-accent/20 p-5 rounded-2xl">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Integrity Validation (n=27)</span>
                                            <span className="text-2xl font-bold text-cyber-accent">100% Bit-Perfect Reconstruction</span>
                                            <p className="text-[12px] text-slate-400 mt-2">Zero fragment errors during extraction, fully verified via automated SHA-256 hashing.</p>
                                        </div>
                                        <div className="bg-slate-950/40 border border-cyber-accent/20 p-5 rounded-2xl">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Total Processing Pipeline</span>
                                            <span className="text-2xl font-bold text-cyber-accent">12.9s Lock / 2.3s Unlock Latency</span>
                                            <p className="text-[12px] text-slate-400 mt-2">Decoupled Laravel Queue workers keep the synchronous UI-blocking duration to under 50ms.</p>
                                        </div>
                                        <div className="bg-slate-950/40 border border-cyber-accent/20 p-5 rounded-2xl">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Small Payload Tier (&lt;1MB)</span>
                                            <span className="text-2xl font-bold text-cyber-accent">5.48s Locking / 6.0x Cloud Expansion</span>
                                            <p className="text-[12px] text-slate-400 mt-2">Sustainable balance optimized for high-capacity audio (WAV) and media cover files.</p>
                                        </div>
                                        <div className="bg-slate-950/40 border border-cyber-accent/20 p-5 rounded-2xl">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Large Payload Tier (3MB-5MB)</span>
                                            <span className="text-2xl font-bold text-cyber-accent">31 Fragments / 21.0x Expansion</span>
                                            <p className="text-[12px] text-slate-400 mt-2">Aggressive scaling producing an average of 85.74MB to sustain low-density concealment.</p>
                                        </div>
                                    </div>

                                    <p className="text-justify indent-8">
                                        Driven by architectural stability and user accessibility, the primary reason for utilizing a decoupled background worker system (Laravel Queues) was to ensure the utmost UI responsiveness. Offloading heavy Python LSB embedding and AES-256-GCM encryption limits client UI freezing, ensuring high productivity. Furthermore, dispersing fragments across Backblaze B2 under randomized system-generated identifiers provides a robust defense-in-depth, securing document payloads even in the event of database credential compromise.
                                    </p>

                                    <p className="text-justify indent-8">
                                        However, real-world testing exposed several critical engineering constraints. Average retrieval metrics highlight efficient unlocking (2.3s) but expose significant CPU overhead inside the steganographic "search-and-fit" cover logic. Reliability evaluations also identified transient failures, specifically the generation of **"Ghost Files"** (orphaned B2 fragments left unreferenced due to network handshake drops), Cover App Model failures, shell-based Python environment bottlenecks, and UI prop normalization errors. Resolving these through event-driven audits is crucial for production reliability.
                                    </p>

                                    <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-2xl">
                                        <p className="text-[13px] text-slate-400 text-justify leading-relaxed">
                                            <strong>Resource Management:</strong> The substantial storage demands of fragmentation are functionally offset by StegoLock's <strong>"Zero-Waste" cleanup mechanisms</strong>, which guarantee immediate deletion of temporary local server resources after cloud dispersion. This ensures the increased cloud storage footprint does not result in local disk exhaustion, bridging cryptographic complexity with resource efficiency.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeModal === 'c5_summary' && summaryPage === 2 && (
                                <div className="space-y-6 animate-fade-in">
                                    <p className="text-justify indent-8 text-slate-300">
                                        This study successfully developed and evaluated **StegoLock**, a cloud-based web application designed to protect sensitive digital documents from unauthorized access and forensic detection through a reconstruction-dependent security model. By integrating **AES-256-GCM** encryption, fluid payload segmentation, and **LSB steganographic embedding** across heterogeneous cover files, StegoLock subtly conceals encrypted data fragments, ensuring that documents cannot be reconstructed or decrypted without retrieving all scattered fragments from cloud storage.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                                        <div className="bg-slate-950/40 border border-cyber-accent/20 p-4 rounded-xl flex flex-col justify-between">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Security Efficacy</span>
                                            <span className="text-xl font-bold text-cyber-accent">100% Integrity</span>
                                            <p className="text-[11px] text-slate-400 mt-1">SHA-256 validation guarantees bit-perfect fragment reassembly (n=27).</p>
                                        </div>
                                        <div className="bg-slate-950/40 border border-indigo-500/20 p-4 rounded-xl flex flex-col justify-between">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">User Evaluation</span>
                                            <span className="text-xl font-bold text-indigo-400">4.61 GWM Rating</span>
                                            <p className="text-[11px] text-slate-400 mt-1">Highly positive usability rating from 30 participants for queue responsiveness.</p>
                                        </div>
                                        <div className="bg-slate-950/40 border border-purple-500/20 p-4 rounded-xl flex flex-col justify-between">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Retrieval Latency</span>
                                            <span className="text-xl font-bold text-purple-400">5.07s Avg Unlock</span>
                                            <p className="text-[11px] text-slate-400 mt-1">Extremely efficient unlocking duration even at the largest file tier.</p>
                                        </div>
                                        <div className="bg-slate-950/40 border border-rose-500/20 p-4 rounded-xl flex flex-col justify-between">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Payload Expansion</span>
                                            <span className="text-xl font-bold text-rose-400">6.0x - 21.0x Ratio</span>
                                            <p className="text-[11px] text-slate-400 mt-1">Scales to 31 fragments to safeguard low-density concealment.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-5 bg-slate-950/20 border border-slate-800 rounded-2xl">
                                            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Activity className="size-4 text-cyber-accent" /> Triangulated System Evaluation
                                            </h4>
                                            <p className="text-justify text-sm text-slate-300 leading-relaxed indent-6">
                                                The study evaluated the platform against unauthorized recovery using a controlled testing environment and triangulated analysis of system metrics alongside user evaluations from 30 participants. Three key areas were analyzed: security efficacy (SHA-256 integrity validation), resource utilization (stego-expansion ratio), and computational performance (locking/unlocking latencies). Results demonstrated a clear relationship between payload size and system overhead. For documents under 1MB, the system achieved a mean locking duration of **5.48 seconds** with a balanced **6.0x expansion ratio**. In contrast, documents in the 3MB–5MB range required up to **31 fragments**, increasing the expansion ratio to **21.0x** and the locking duration to **19.74 seconds** to maintain low-density concealment.
                                            </p>
                                        </div>

                                        <div className="p-5 bg-slate-950/20 border border-slate-800 rounded-2xl">
                                            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Layers className="size-4 text-indigo-400" /> Metric Patterns & Asynchronous Efficacy
                                            </h4>
                                            <p className="text-justify text-sm text-slate-300 leading-relaxed indent-6">
                                                Metric analysis revealed important patterns, where the expansion ratio showed an aggressive increase as payload density neared the capacity limits of available cover media. While the locking process scaled linearly with file size due to the computational 'search-and-fit' logic of embedding, the unlocking process remained remarkably efficient, averaging **5.07 seconds** for the largest file tier. This efficiency correlates with the high user responsiveness rating (**GWM 4.61**), confirming that the asynchronous architecture effectively mitigates backend complexity. The **100% integrity success rate** across all test samples (n=27) validated the reliability of the reassembly pipeline, maintaining bit-perfect reconstruction even under high fragmentation levels.
                                            </p>
                                        </div>

                                        <div className="p-5 bg-gradient-to-r from-slate-950/60 to-cyber-accent/5 border border-cyber-accent/25 rounded-2xl">
                                            <h4 className="text-xs font-black text-cyber-accent uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Shield className="size-4" /> Conclusion & Future Pathways
                                            </h4>
                                            <p className="text-justify text-sm text-slate-300 leading-relaxed indent-6">
                                                In conclusion, StegoLock provides a promising solution for organizations seeking to safeguard sensitive digital documents in insecure cloud environments. Further enhancements are necessary to optimize the expansion ratios for large-scale payloads and address operational dependencies, such as shell-based execution, for broader deployment and enterprise integration.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeModal === 'c5_conclusions' && (
                                <div className="space-y-6 animate-fade-in">
                                    <p className="text-justify indent-8 text-slate-300">
                                        This study successfully developed StegoLock, demonstrating that a reconstruction-dependent security architecture integrating cryptography and steganography can effectively safeguard sensitive digital documents in insecure cloud environments. Through rigorous testing and triangulated analysis, the research proved that segmenting encrypted payloads and concealing them across distributed cloud storage successfully obscures data from unauthorized detection while maintaining bit-perfect integrity. Key conclusions drawn across specific project objectives include:
                                    </p>
                                    
                                    <div className="space-y-5 mt-4">
                                        <div className="flex gap-4 items-start">
                                            <div className="size-8 rounded-lg bg-cyber-accent/15 border border-cyber-accent/30 flex items-center justify-center shrink-0 text-cyber-accent font-black text-xs">
                                                1
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white mb-1">Cryptographic Framework & Confidentiality (Obj 1)</h4>
                                                <p className="text-sm text-slate-400 leading-relaxed text-justify">
                                                    Successfully established a multi-tiered cryptographic framework integrating **AES-256-GCM** encryption and a dual KDF key derivation process (**PBKDF2-HMAC-SHA256** and **HKDF**). Testing verified that this pipeline securely derives keys on demand (reducing credential storage risk) and achieved a **100% integrity success rate (n=27)** with bit-perfect reconstruction under SHA-256 validation, confirming the robustness of the core cryptographic engine.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 items-start">
                                            <div className="size-8 rounded-lg bg-cyber-accent/15 border border-cyber-accent/30 flex items-center justify-center shrink-0 text-cyber-accent font-black text-xs">
                                                2
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white mb-1">Segmentation, Steganography, Cloud Storage (Obj 2)</h4>
                                                <p className="text-sm text-slate-400 leading-relaxed text-justify">
                                                    The development of a segmentation algorithm and LSB-based steganographic embedding successfully achieved Objective 2 by distributing encrypted data across heterogeneous cover files (PNG, WAV, and TXT). Technical findings in **Table 25** revealed that the system aggressively scales segmentation—producing up to **31 fragments** for a 5MB document—to maintain the low-density concealment required to evade forensic detection. The study concluded that while this approach introduced a storage expansion ratio ranging from **6.0x to 21.0x**, the increased cloud footprint is a necessary architectural trade-off to ensure high-level security resistance through physical data separation.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 items-start">
                                            <div className="size-8 rounded-lg bg-cyber-accent/15 border border-cyber-accent/30 flex items-center justify-center shrink-0 text-cyber-accent font-black text-xs">
                                                3
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white mb-1">Asynchronous Pipeline & Subsystem Integration (Obj 3)</h4>
                                                <p className="text-sm text-slate-400 leading-relaxed text-justify">
                                                    Built the responsive StegoLock web application integrating complex backend security pipelines. By deploying **asynchronous background queues**, the platform abstracted the 12.9-second average locking pipeline into a "One-Click" interface, successfully restricting synchronous UI-blocking phases to **under 50ms**. Dynamic cloud deployment and Role-Based Access Control (RBAC) validated a secure, collaborative workspace.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 items-start">
                                            <div className="size-8 rounded-lg bg-cyber-accent/15 border border-cyber-accent/30 flex items-center justify-center shrink-0 text-cyber-accent font-black text-xs">
                                                4
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white mb-1">ISO/IEC 25010 Quality Evaluation (Obj 4)</h4>
                                                <p className="text-sm text-slate-400 leading-relaxed text-justify">
                                                    Evaluated the overall platform effectiveness using the ISO/IEC 25010 quality model, achieving an exceptional General Weighted Mean (GWM) of **4.53 ("Strongly Agree")** (Table 10). Outstanding evaluations in **Performance Efficiency (4.61 GWM)**, **Security (4.55 GWM)**, and **Functional Suitability (4.55 GWM)** confirm that the reconstruction-dependent design bridges the gap between high-level cryptographic complexity and absolute operational simplicity.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeModal === 'c5_recommendations_summary' && (
                                <div className="space-y-6 animate-fade-in">
                                    <p className="text-justify indent-8 text-slate-300">
                                        While the current implementation demonstrates robust protection, transition to full industrial maturity requires computational optimization, automated refresh cycles, and geographic mobility.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                                        {[
                                            { 
                                                title: "Argon2 Key Derivation Standard", 
                                                desc: "Hardens system security against long-term data analysis by introducing a cryptographically advanced key derivation standard.",
                                                icon: <Shield className="size-5" />
                                            },
                                            { 
                                                title: "AI-Driven Cover Generation", 
                                                desc: "Produces high-entropy, natural-looking concealment media virtually indistinguishable from ordinary user data to ensure fragments remain hidden from evolving detection methodologies and sophisticated forensic analysis tools.",
                                                icon: <Cpu className="size-5" />
                                            },
                                            { 
                                                title: "Dynamic Cloud Relocation", 
                                                desc: "Implement a periodic migration of file fragments between diverse cloud storage locations and providers to prevent attackers from accumulating a complete dataset over time.",
                                                icon: <Database className="size-5" />
                                            },
                                            { 
                                                title: "Native Mobile Applications", 
                                                desc: "Mobile applications equipped with biometric authentication features to maintain high usability standards and protect sensitive digital assets across diverse device types.",
                                                icon: <Users className="size-5" />
                                            },
                                            { 
                                                title: "Secure API", 
                                                desc: "Exposes the core architecture to allow organizations to integrate StegoLock’s protection layers directly into their existing document management systems.",
                                                icon: <Compass className="size-5" />
                                            }
                                        ].map((rec, i) => (
                                            <div key={i} className="p-4 bg-slate-950/40 border border-purple-500/20 rounded-2xl flex gap-3.5 items-start">
                                                <div className="size-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 shadow-md">
                                                    {rec.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-white mb-1.5 text-[14px]">
                                                        {rec.title}
                                                    </h4>
                                                    <p className="text-xs text-slate-400 leading-relaxed text-justify">
                                                        {rec.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer with Pagination (only for c5_summary) */}
                        {activeModal === 'c5_summary' && (
                            <div className="border-t border-slate-800/80 pt-5 mt-6 shrink-0 flex items-center justify-between">
                                <button
                                    onClick={() => setSummaryPage(1)}
                                    disabled={summaryPage === 1}
                                    className="px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl bg-slate-800 text-slate-300 hover:bg-cyber-accent hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-300 transition-all flex items-center gap-1 active:scale-95 cursor-pointer disabled:cursor-default"
                                >
                                    ← Previous
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSummaryPage(1)}
                                        className={`size-2.5 rounded-full transition-all duration-300 cursor-pointer ${summaryPage === 1 ? 'bg-cyber-accent w-6' : 'bg-slate-700 hover:bg-slate-500'}`}
                                        title="Page 1: Summary of findings"
                                    />
                                    <button
                                        onClick={() => setSummaryPage(2)}
                                        className={`size-2.5 rounded-full transition-all duration-300 cursor-pointer ${summaryPage === 2 ? 'bg-cyber-accent w-6' : 'bg-slate-700 hover:bg-slate-500'}`}
                                        title="Page 2: Overall Research Summary"
                                    />
                                </div>
                                <button
                                    onClick={() => setSummaryPage(2)}
                                    disabled={summaryPage === 2}
                                    className="px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl bg-slate-800 text-slate-300 hover:bg-cyber-accent hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-300 transition-all flex items-center gap-1 active:scale-95 cursor-pointer disabled:cursor-default"
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export function getChapter5Slide12({ activeModal, setActiveModal, summaryPage, setSummaryPage }) {
    return [
        {
            title: "Chapter 5",
            subtitle: "Summary, Conclusions, and Recommendations",
            content: <Chapter5Slide12Content 
                activeModal={activeModal} 
                setActiveModal={setActiveModal} 
                summaryPage={summaryPage} 
                setSummaryPage={setSummaryPage} 
            />
        }
    ];
}
