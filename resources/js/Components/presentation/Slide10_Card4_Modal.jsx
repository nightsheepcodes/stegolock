import React from 'react';
import { 
    Compass, Cpu, Users, Database, Activity, ShieldCheck, 
    Layers, Key, CheckCircle, Eye, Network, CheckCircle2, 
    AlertTriangle, Flame, Shield, Laptop
} from 'lucide-react';

export default function Slide10_Card4_Modal({ activeModal, setActiveModal }) {
    const [isoTab, setIsoTab] = React.useState('pe'); // pe, sec, fs, us, rel

    if (activeModal !== 'chapter4-obj4-iso-characteristics') return null;

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent text-left animate-fade-in"
            onClick={() => setActiveModal(null)}
        >
            <div 
                className="bg-slate-900/95 border border-cyber-accent/40 w-full max-w-4xl p-6 sm:p-8 rounded-[2.5rem] relative shadow-2xl shadow-cyan-500/20 animate-scale-up-modal flex flex-col max-h-[85vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={() => setActiveModal(null)}
                    className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-cyber-accent hover:text-slate-900 text-white transition-colors text-xl z-10 font-bold"
                >
                    ✕
                </button>

                <div className="flex items-center gap-4 border-b border-slate-800 pb-5 shrink-0 mb-6">
                    <div className="size-14 rounded-2xl bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/5">
                        <Compass className="size-7 text-cyber-accent" />
                    </div>
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">ISO/IEC 25010 Columns</h2>
                    </div>
                </div>

                {/* sub-tabs for the five columns */}
                <div className="flex overflow-x-auto gap-2 mb-6 shrink-0 border-b border-slate-800/50 pb-2 scrollbar-none">
                    {[
                        { id: 'pe', label: 'Performance Efficiency', color: 'text-cyan-400' },
                        { id: 'fs', label: 'Functional Suitability', color: 'text-emerald-400' },
                        { id: 'sec', label: 'Security', color: 'text-purple-400' },
                        { id: 'us', label: 'Usability', color: 'text-sky-400' },
                        { id: 'rel', label: 'Reliability', color: 'text-amber-400' }
                    ].map((tab) => (
                        <button 
                            key={tab.id}
                            onClick={() => setIsoTab(tab.id)}
                            className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 shrink-0 ${isoTab === tab.id ? 'bg-cyber-accent text-slate-900 shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white bg-slate-800/40'}`}
                        >
                            <span className={isoTab === tab.id ? 'text-slate-900' : tab.color}>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-300 scrollbar-thin">
                    {/* TAB 1: Performance Efficiency */}
                    {isoTab === 'pe' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <h3 className="text-xl font-black text-white flex items-center gap-2">
                                    <Cpu className="size-6 text-cyan-400" /> Performance Efficiency
                                </h3>
                                <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-xs font-black">
                                    GWM: 4.61 (Strongly Agree) - Rank 1
                                </span>
                            </div>
                            
                            {/* SECTION 1: Subjective User Evaluation */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                    <Users className="size-4 text-cyan-400" /> User Evaluation Survey Ratings
                                </h4>

                                    {/* Table 17. Summary of Survey Ratings for Performance Efficiency */}
                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                                        <div className="bg-slate-900 text-slate-400 py-2 px-4 border-b border-slate-800 font-sans font-bold text-xs uppercase tracking-wider text-center">
                                            Table 17. Survey Ratings for Performance Efficiency
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-[11px] font-semibold">
                                                <thead>
                                                    <tr className="bg-slate-900 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
                                                        <th className="px-4 py-2 font-black">Item Code</th>
                                                        <th className="px-4 py-2 font-black">Survey Question Statement</th>
                                                        <th className="px-4 py-2 font-black text-center">WM</th>
                                                        <th className="px-4 py-2 font-black">Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-850 text-slate-300">
                                                    <tr className="hover:bg-slate-900/40 transition-colors">
                                                        <td className="px-4 py-2 font-bold text-white">PE1</td>
                                                        <td className="px-4 py-2 text-slate-400">I feel that the StegoLock web app is responsive when displaying information.</td>
                                                        <td className="px-4 py-2 font-black text-cyan-400 text-center">4.47</td>
                                                        <td className="px-4 py-2 text-slate-400">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/40 transition-colors">
                                                        <td className="px-4 py-2 font-bold text-white">PE2</td>
                                                        <td className="px-4 py-2 text-slate-400">I feel that the StegoLock web app responds quickly when updating user info.</td>
                                                        <td className="px-4 py-2 font-black text-cyan-400 text-center">4.53</td>
                                                        <td className="px-4 py-2 text-slate-400">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/40 transition-colors">
                                                        <td className="px-4 py-2 font-bold text-white">PE3</td>
                                                        <td className="px-4 py-2 text-slate-400">I don't notice any delays or lags when accessing info or updating data.</td>
                                                        <td className="px-4 py-2 font-black text-cyan-400 text-center">4.57</td>
                                                        <td className="px-4 py-2 text-slate-400">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/40 transition-colors">
                                                        <td className="px-4 py-2 font-bold text-white">PE4</td>
                                                        <td className="px-4 py-2 text-slate-400">I think StegoLock responds well when clicking buttons and takes minimal time.</td>
                                                        <td className="px-4 py-2 font-black text-cyan-400 text-center">4.67</td>
                                                        <td className="px-4 py-2 text-slate-400">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/40 transition-colors">
                                                        <td className="px-4 py-2 font-bold text-white">PE5</td>
                                                        <td className="px-4 py-2 text-slate-400">I think the web app is responsive in providing results and reactions.</td>
                                                        <td className="px-4 py-2 font-black text-cyan-400 text-center">4.63</td>
                                                        <td className="px-4 py-2 text-slate-400">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/40 transition-colors">
                                                        <td className="px-4 py-2 font-bold text-white">PE6</td>
                                                        <td className="px-4 py-2 text-slate-400">I have never experienced application performance crashes or slow locks.</td>
                                                        <td className="px-4 py-2 font-black text-cyan-400 text-center">4.70</td>
                                                        <td className="px-4 py-2 text-slate-400">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/40 transition-colors">
                                                        <td className="px-4 py-2 font-bold text-white">PE7</td>
                                                        <td className="px-4 py-2 text-slate-400">I believe that the StegoLock web app is fully compatible with my device.</td>
                                                        <td className="px-4 py-2 font-black text-cyan-400 text-center">4.73</td>
                                                        <td className="px-4 py-2 text-slate-400">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="bg-slate-900/80 border-t border-slate-800 font-sans font-bold text-[10px]">
                                                        <td colSpan={2} className="px-4 py-2 text-white uppercase tracking-wider">General Weighted Mean</td>
                                                        <td className="px-4 py-2 font-black text-emerald-400 text-center text-xs">4.61</td>
                                                        <td className="px-4 py-2 text-emerald-400 uppercase tracking-widest">STRONGLY AGREE</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                            </div>

                            {/* SECTION 2: Technical Performance Latency Audits */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                    <Activity className="size-4 text-cyan-400" /> Objective Latency &amp; Time-Behavior Audits
                                </h4>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                    {/* Table 18. Average Locking Process Latency by Sub-process */}
                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                                        <div className="bg-slate-900 text-slate-400 py-2 px-4 border-b border-slate-800 font-sans font-bold text-xs uppercase tracking-wider text-center">
                                            Table 18. Average Locking Process Latency
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-[11px] font-semibold">
                                                <thead>
                                                    <tr className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800 text-[10px]">
                                                        <th className="px-4 py-2 font-black">Sub-Process</th>
                                                        <th className="px-4 py-2 font-black">Process Description</th>
                                                        <th className="px-4 py-2 font-black text-right">Avg. Duration</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-850 text-slate-300">
                                                    <tr className="hover:bg-slate-900/30">
                                                        <td className="px-4 py-2.5 font-bold text-white">upload</td>
                                                        <td className="px-4 py-2.5 text-slate-400">File upload and compression</td>
                                                        <td className="px-4 py-2.5 text-right text-cyan-400">13.08 ms</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30">
                                                        <td className="px-4 py-2.5 font-bold text-white">encryption</td>
                                                        <td className="px-4 py-2.5 text-slate-400">AES-256-GCM encryption</td>
                                                        <td className="px-4 py-2.5 text-right text-cyan-400">35.72 ms</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30">
                                                        <td className="px-4 py-2.5 font-bold text-white">segmentation</td>
                                                        <td className="px-4 py-2.5 text-slate-400">Cover selection &amp; segmentation</td>
                                                        <td className="px-4 py-2.5 text-right text-cyan-400">87.63 ms</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30">
                                                        <td className="px-4 py-2.5 font-bold text-white">embedding</td>
                                                        <td className="px-4 py-2.5 text-slate-400">LSB embedding &amp; cloud storage</td>
                                                        <td className="px-4 py-2.5 text-right text-cyan-400">8,540.59 ms</td>
                                                    </tr>
                                                    <tr className="bg-slate-900/60 font-black border-t border-slate-800 text-[10px]">
                                                        <td colSpan={2} className="px-4 py-2.5 text-white uppercase tracking-wider">TOTAL LOCKING PROCESS</td>
                                                        <td className="px-4 py-2.5 text-right text-emerald-400">~8.7 sec</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>



                                    {/* Table 19. Average Unlocking Process Latency by Sub-process */}
                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                                        <div className="bg-slate-900 text-slate-400 py-2 px-4 border-b border-slate-800 font-sans font-bold text-[10px] uppercase tracking-wider text-center">
                                            Table 19. Average Unlocking Process Latency
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-[11px] font-semibold">
                                                <thead>
                                                    <tr className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800 text-[10px]">
                                                        <th className="px-4 py-2 font-black">Sub-Process</th>
                                                        <th className="px-4 py-2 font-black">Process Description</th>
                                                        <th className="px-4 py-2 font-black text-right">Avg. Duration</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-850 text-slate-300">
                                                    <tr className="hover:bg-slate-900/30">
                                                        <td className="px-4 py-2.5 font-bold text-white">cloud_retrieval</td>
                                                        <td className="px-4 py-2.5 text-slate-400">Unlock request &amp; cloud retrieval</td>
                                                        <td className="px-4 py-2.5 text-right text-cyan-400">989.98 ms</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30">
                                                        <td className="px-4 py-2.5 font-bold text-white">extraction</td>
                                                        <td className="px-4 py-2.5 text-slate-400">LSB stego reversal &amp; extraction</td>
                                                        <td className="px-4 py-2.5 text-right text-cyan-400">1,289.45 ms</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30">
                                                        <td className="px-4 py-2.5 font-bold text-white">reassembly</td>
                                                        <td className="px-4 py-2.5 text-slate-400">Fragment reassembly to doc</td>
                                                        <td className="px-4 py-2.5 text-right text-cyan-400">12.51 ms</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30">
                                                        <td className="px-4 py-2.5 font-bold text-white">decryption</td>
                                                        <td className="px-4 py-2.5 text-slate-400">AES-256-GCM decryption/decompress</td>
                                                        <td className="px-4 py-2.5 text-right text-cyan-400">7.36 ms</td>
                                                    </tr>
                                                    <tr className="bg-slate-900/60 font-black border-t border-slate-800 text-[10px]">
                                                        <td colSpan={2} className="px-4 py-2.5 text-white uppercase tracking-wider">TOTAL UNLOCKING PROCESS</td>
                                                        <td className="px-4 py-2.5 text-right text-emerald-400">~2.3 sec</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* SECTION 3: Resource Utilization & Size Scaling Analysis */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                    <Database className="size-4 text-cyan-400" /> Resource Utilization &amp; Size Scaling Analysis
                                </h4>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                    {/* Table 20. Unlocking and Locking Process Duration Distribution Across File Size Ranges */}
                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                                        <div className="bg-slate-900 text-slate-400 py-2 px-4 border-b border-slate-800 font-sans font-bold text-xs uppercase tracking-wider text-center">
                                            Table 20. Latency Distribution Across File Size Ranges
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-[11px] font-semibold">
                                                <thead>
                                                    <tr className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800 text-[10px]">
                                                        <th className="px-4 py-2 font-black">File Size Range</th>
                                                        <th className="px-4 py-2 font-black text-center">No. of Docs</th>
                                                        <th className="px-4 py-2 font-black text-right">Avg. Locking</th>
                                                        <th className="px-4 py-2 font-black text-right">Avg. Unlocking</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-850 text-slate-300">
                                                    <tr className="hover:bg-slate-900/30">
                                                        <td className="px-4 py-2 font-bold text-white">1kb - 1mb</td>
                                                        <td className="px-4 py-2 text-center font-bold text-slate-400">21</td>
                                                        <td className="px-4 py-2 text-right text-cyan-400">5,476.63 ms</td>
                                                        <td className="px-4 py-2 text-right text-cyan-400">3,037.23 ms</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30">
                                                        <td className="px-4 py-2 font-bold text-white">1mb - 3mb</td>
                                                        <td className="px-4 py-2 text-center font-bold text-slate-400">2</td>
                                                        <td className="px-4 py-2 text-right text-cyan-400">13,408.97 ms</td>
                                                        <td className="px-4 py-2 text-right text-cyan-400">9,690.67 ms</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30">
                                                        <td className="px-4 py-2 font-bold text-white">3mb - 5mb</td>
                                                        <td className="px-4 py-2 text-center font-bold text-slate-400">4</td>
                                                        <td className="px-4 py-2 text-right text-cyan-400">19,740.12 ms</td>
                                                        <td className="px-4 py-2 text-right text-cyan-400">5,072.77 ms</td>
                                                    </tr>
                                                    <tr className="bg-slate-900/60 font-black border-t border-slate-800 text-[10px]">
                                                        <td className="px-4 py-2 text-white">TOTAL / GLOBAL AVG</td>
                                                        <td className="px-4 py-2 text-center font-bold text-slate-400">27 Docs</td>
                                                        <td className="px-4 py-2 text-right text-emerald-400">12.9 sec</td>
                                                        <td className="px-4 py-2 text-right text-emerald-400">5.9 sec</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Table 21. Stego-Expansion Analysis (Payload vs. Cloud Size) */}
                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                                        <div className="bg-slate-900 text-slate-400 py-2 px-4 border-b border-slate-800 font-sans font-bold text-xs uppercase tracking-wider text-center">
                                            Table 21. Stego-Expansion Analysis (Payload vs. Cloud Size)
                                        </div>
                                        <div className="overflow-x-auto flex-1">
                                            <table className="w-full text-left text-[11px] font-semibold h-full">
                                                <thead>
                                                    <tr className="bg-slate-900 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
                                                        <th className="px-4 py-2 font-black">Size Range</th>
                                                        <th className="px-4 py-2 font-black text-center">No. of Docs</th>
                                                        <th className="px-4 py-2 font-black text-center">Avg. Fragments</th>
                                                        <th className="px-4 py-2 font-black text-right">Avg. Cloud Size</th>
                                                        <th className="px-4 py-2 font-black text-right">Ratio</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-850 text-slate-300">
                                                    <tr className="hover:bg-slate-900/40 transition-colors">
                                                        <td className="px-4 py-2 font-bold text-white">1 MB</td>
                                                        <td className="px-4 py-2 text-center text-slate-400 font-bold">21</td>
                                                        <td className="px-4 py-2 text-center text-cyan-400">3-4</td>
                                                        <td className="px-4 py-2 text-right text-slate-400">6.28 MB</td>
                                                        <td className="px-4 py-2 text-right text-cyan-400 font-bold">6.0x</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/40 transition-colors">
                                                        <td className="px-4 py-2 font-bold text-white">2 MB</td>
                                                        <td className="px-4 py-2 text-center text-slate-400 font-bold">1</td>
                                                        <td className="px-4 py-2 text-center text-cyan-400">7</td>
                                                        <td className="px-4 py-2 text-right text-slate-400">28.14 MB</td>
                                                        <td className="px-4 py-2 text-right text-cyan-400 font-bold">14.0x</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/40 transition-colors">
                                                        <td className="px-4 py-2 font-bold text-white">3 MB</td>
                                                        <td className="px-4 py-2 text-center text-slate-400 font-bold">1</td>
                                                        <td className="px-4 py-2 text-center text-cyan-400">8</td>
                                                        <td className="px-4 py-2 text-right text-slate-400">63.00 MB</td>
                                                        <td className="px-4 py-2 text-right text-cyan-400 font-bold">21.0x</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/40 transition-colors">
                                                        <td className="px-4 py-2 font-bold text-white">4 MB</td>
                                                        <td className="px-4 py-2 text-center text-slate-400 font-bold">3</td>
                                                        <td className="px-4 py-2 text-center text-cyan-400">13</td>
                                                        <td className="px-4 py-2 text-right text-slate-400">66.08 MB</td>
                                                        <td className="px-4 py-2 text-right text-cyan-400 font-bold">16.5x</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/40 transition-colors">
                                                        <td className="px-4 py-2 font-bold text-white">5 MB</td>
                                                        <td className="px-4 py-2 text-center text-slate-400 font-bold">1</td>
                                                        <td className="px-4 py-2 text-center text-cyan-400">31</td>
                                                        <td className="px-4 py-2 text-right text-slate-400">85.74 MB</td>
                                                        <td className="px-4 py-2 text-right text-cyan-400 font-bold">17.1x</td>
                                                    </tr>
                                                    <tr className="bg-slate-900/60 font-black border-t border-slate-800 text-[10px]">
                                                        <td className="px-4 py-2 text-white">TOTAL SAMPLE</td>
                                                        <td className="px-4 py-2 text-center text-slate-400 font-bold">27 Docs</td>
                                                        <td colSpan={3} className="px-4 py-2 text-right text-emerald-400 uppercase tracking-widest text-[9px]">Security-First Footprint</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}                    {/* TAB 2: Security */}
                    {isoTab === 'sec' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <h3 className="text-xl font-black text-white flex items-center gap-2">
                                    <ShieldCheck className="size-6 text-purple-400" /> Security Evaluation
                                </h3>
                                <span className="bg-purple-500/10 border border-purple-500/30 text-purple-400 px-3 py-1 rounded-full text-xs font-black">
                                    GWM: 4.55 (Strongly Agree) - Rank 2 (Tied)
                                </span>
                            </div>

                            <div className="space-y-6">
                                {/* Survey Ratings on Top */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                        <Users className="size-4 text-purple-400" /> User Evaluation Survey Ratings
                                    </h4>
                                    
                                    {/* Table 13. Summary of Survey Ratings for Security */}
                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                                        <div className="bg-slate-900 text-slate-400 py-2 px-4 border-b border-slate-800 font-sans font-bold text-xs uppercase tracking-wider text-center">
                                            Table 13. Survey Ratings for Security
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-[11px] font-semibold">
                                                <thead>
                                                    <tr className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800 text-[10px]">
                                                        <th className="px-4 py-2 font-black">Code</th>
                                                        <th className="px-4 py-2 font-black">Survey Question Statement</th>
                                                        <th className="px-4 py-2 font-black text-center">Mean</th>
                                                        <th className="px-4 py-2 font-black text-center">Interpretation</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-850 text-slate-300">
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">SC1</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I think the StegoLock web app provides good control and data security.</td>
                                                        <td className="px-4 py-2.5 font-black text-purple-400 text-center">4.67</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">SC5</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I believe that the StegoLock web app only provides access to authorized users.</td>
                                                        <td className="px-4 py-2.5 font-black text-purple-400 text-center">4.60</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">SC3</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I believe that the StegoLock web app ensures that only authorized users can view, update, and upload.</td>
                                                        <td className="px-4 py-2.5 font-black text-purple-400 text-center">4.53</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">SC2</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I think StegoLock is a trustworthy application.</td>
                                                        <td className="px-4 py-2.5 font-black text-purple-400 text-center">4.50</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">SC4</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I believe that the StegoLock web app has a strong authentication mechanism to ensure that only authorized users can access the application.</td>
                                                        <td className="px-4 py-2.5 font-black text-purple-400 text-center">4.50</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="bg-slate-900/80 border-t border-slate-800 font-sans font-bold text-[10px]">
                                                        <td colSpan={2} className="px-4 py-2.5 text-white uppercase tracking-wider">General Weighted Mean</td>
                                                        <td className="px-4 py-2.5 font-black text-purple-400 text-center text-xs">4.55</td>
                                                        <td className="px-4 py-2.5 text-purple-400 uppercase tracking-widest text-center">Strongly Agree</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Technical Security Architecture */}
                                <div className="space-y-4 pt-2">
                                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                        <Layers className="size-4 text-purple-400" /> Technical Security Safeguards &amp; Architecture
                                    </h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                                            <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 animate-pulse">
                                                <Layers className="size-5" />
                                            </div>
                                            <h5 className="text-sm font-black text-white mb-2">Three-Pillar Defense</h5>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                                Data reconstruction is programmatically impossible without simultaneous aggregation of:
                                            </p>
                                            <ul className="text-[10px] text-purple-300 font-bold space-y-1 mt-3 list-disc pl-4">
                                                <li>Session-Cached Master Key</li>
                                                <li>Relational DB Stego Map</li>
                                                <li>Cloud-Stored Stego Cover Files</li>
                                            </ul>
                                        </div>

                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                                            <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                                                <Key className="size-5" />
                                            </div>
                                            <h5 className="text-sm font-black text-white mb-2">Secure-Bridge Sharing</h5>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                                Transitions read access without exposing cover files. The owner unwraps the DEK, wraps it with a transient System Key, and the recipient wraps it with their Master Key.
                                            </p>
                                        </div>

                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                                            <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                                                <CheckCircle className="size-5" />
                                            </div>
                                            <h5 className="text-sm font-black text-white mb-2">Integrity Verification</h5>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                                Utilizes fast dual-level cryptographic validation to prevent malicious fragment tampering or injection:
                                            </p>
                                            <ul className="text-[10px] text-purple-300 font-bold space-y-1 mt-3 list-disc pl-4">
                                                <li>SHA-256: Fragment-level hashes</li>
                                                <li>HMAC-SHA256: Assembled validation</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}                    {/* TAB 3: Functional Suitability */}
                    {isoTab === 'fs' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <h3 className="text-xl font-black text-white flex items-center gap-2">
                                    <Shield className="size-6 text-emerald-400" /> Functional Suitability
                                </h3>
                                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-black">
                                    GWM: 4.55 (Strongly Agree) - Rank 2 (Tied)
                                </span>
                            </div>                            <div className="space-y-6">
                                {/* Survey Ratings on Top */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                        <Users className="size-4 text-emerald-400" /> User Evaluation Survey Ratings
                                    </h4>
                                    
                                    {/* Table 11. Summary of Survey Ratings for Functional Suitability */}
                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                                        <div className="bg-slate-900 text-slate-400 py-2 px-4 border-b border-slate-800 font-sans font-bold text-xs uppercase tracking-wider text-center">
                                            Table 11. Survey Ratings for Functional Suitability
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-[11px] font-semibold">
                                                <thead>
                                                    <tr className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800 text-[10px]">
                                                        <th className="px-4 py-2 font-black">Code</th>
                                                        <th className="px-4 py-2 font-black">Survey Question Statement</th>
                                                        <th className="px-4 py-2 font-black text-center">Mean</th>
                                                        <th className="px-4 py-2 font-black text-center">Interpretation</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-850 text-slate-300">
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">FS1</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I consider the information and data available in the StegoLock web app to be adequate.</td>
                                                        <td className="px-4 py-2.5 font-black text-emerald-400 text-center">4.50</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">FS2</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I feel that the StegoLock web app navigation buttons work well.</td>
                                                        <td className="px-4 py-2.5 font-black text-emerald-400 text-center">4.70</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">FS3</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I feel that overall, the StegoLock web app button functions work well.</td>
                                                        <td className="px-4 py-2.5 font-black text-emerald-400 text-center">4.60</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">FS4</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I feel that the information and data available in the StegoLock web app are comprehensive.</td>
                                                        <td className="px-4 py-2.5 font-black text-emerald-400 text-center">4.50</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">FS5</td>
                                                        <td className="px-4 py-2.5 text-slate-400">The StegoLock web app is very useful.</td>
                                                        <td className="px-4 py-2.5 font-black text-emerald-400 text-center">4.47</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="bg-slate-900/80 border-t border-slate-800 font-sans font-bold text-[10px]">
                                                        <td colSpan={2} className="px-4 py-2.5 text-white uppercase tracking-wider">General Weighted Mean</td>
                                                        <td className="px-4 py-2.5 font-black text-emerald-400 text-center text-xs">4.55</td>
                                                        <td className="px-4 py-2.5 text-emerald-400 uppercase tracking-widest text-center">Strongly Agree</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Technical Compliance Audit */}
                                <div className="space-y-4 pt-2">
                                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                        <CheckCircle2 className="size-4 text-emerald-400" /> Technical Compliance Process Audit
                                    </h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                                                    Objective 1
                                                </span>
                                                <span className="text-[10px] font-black text-emerald-400">100% COMPLIANT</span>
                                            </div>
                                            <h5 className="text-sm font-black text-white mb-2">Cryptographic Pipeline</h5>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                                Multi-layered document encryption utilizing high-assurance AES-256-GCM coupled with PBKDF2/HKDF master key derivation and DEK-wrapping.
                                            </p>
                                        </div>

                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                                                    Objective 2
                                                </span>
                                                <span className="text-[10px] font-black text-emerald-400">100% COMPLIANT</span>
                                            </div>
                                            <h5 className="text-sm font-black text-white mb-2">Stego Fragmentation</h5>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                                Decoupled steganographic fragmentation and cloud storage. Encrypted payloads are partitioned and embedded in multimedia cover files via LSB-reversal and stored in Backblaze B2.
                                            </p>
                                        </div>

                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                                                    Objective 3
                                                </span>
                                                <span className="text-[10px] font-black text-emerald-400">100% COMPLIANT</span>
                                            </div>
                                            <h5 className="text-sm font-black text-white mb-2">Functional Platform</h5>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                                Production-grade web application developed using Laravel and React, incorporating robust negative-access defaults and recipient-specific document sharing.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}                    {/* TAB 4: Usability */}
                    {isoTab === 'us' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <h3 className="text-xl font-black text-white flex items-center gap-2">
                                    <Laptop className="size-6 text-sky-400" /> Usability Evaluation
                                </h3>
                                <span className="bg-sky-500/10 border border-sky-500/30 text-sky-400 px-3 py-1 rounded-full text-xs font-black">
                                    GWM: 4.53 (Strongly Agree) - Rank 4
                                </span>
                            </div>

                            <div className="space-y-6">
                                {/* Survey Ratings on Top */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                        <Users className="size-4 text-sky-400" /> User Evaluation Survey Ratings
                                    </h4>
                                    
                                    {/* Table 14. Summary of Survey Ratings for Usability */}
                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                                        <div className="bg-slate-900 text-slate-400 py-2 px-4 border-b border-slate-800 font-sans font-bold text-xs uppercase tracking-wider text-center">
                                            Table 14. Survey Ratings for Usability
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-[11px] font-semibold">
                                                <thead>
                                                    <tr className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800 text-[10px]">
                                                        <th className="px-4 py-2 font-black">Code</th>
                                                        <th className="px-4 py-2 font-black">Survey Question Statement</th>
                                                        <th className="px-4 py-2 font-black text-center">Mean</th>
                                                        <th className="px-4 py-2 font-black text-center">Interpretation</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-850 text-slate-300">
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">US1</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I think the way to use the StegoLock web app is easy to remember.</td>
                                                        <td className="px-4 py-2.5 font-black text-sky-400 text-center">4.60</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">US2</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I find the StegoLock web app easy to use.</td>
                                                        <td className="px-4 py-2.5 font-black text-sky-400 text-center">4.63</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">US3</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I seem to quickly understand when there are additional features in the StegoLock web app.</td>
                                                        <td className="px-4 py-2.5 font-black text-sky-400 text-center">4.53</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">US4</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I think the StegoLock web app makes updated data easier.</td>
                                                        <td className="px-4 py-2.5 font-black text-sky-400 text-center">4.50</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">US5</td>
                                                        <td className="px-4 py-2.5 text-slate-400">StegoLock web app has an attractive appearance, well organized and without excess (user Friendly).</td>
                                                        <td className="px-4 py-2.5 font-black text-sky-400 text-center">4.53</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">US6</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I have never had any difficulty using the features included in the StegoLock web app.</td>
                                                        <td className="px-4 py-2.5 font-black text-sky-400 text-center">4.47</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">US7</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I think the StegoLock web app is easily accessible.</td>
                                                        <td className="px-4 py-2.5 font-black text-sky-400 text-center">4.60</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">US8</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I believe that the StegoLock web app is accessible and remains available for use in certain situations or conditions.</td>
                                                        <td className="px-4 py-2.5 font-black text-sky-400 text-center">4.47</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">US9</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I feel that the StegoLock web app can be used anywhere.</td>
                                                        <td className="px-4 py-2.5 font-black text-sky-400 text-center">4.43</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Agree</td>
                                                    </tr>
                                                    <tr className="bg-slate-900/80 border-t border-slate-800 font-sans font-bold text-[10px]">
                                                        <td colSpan={2} className="px-4 py-2.5 text-white uppercase tracking-wider">General Weighted Mean</td>
                                                        <td className="px-4 py-2.5 font-black text-sky-400 text-center text-xs">4.53</td>
                                                        <td className="px-4 py-2.5 text-sky-400 uppercase tracking-widest text-center">Strongly Agree</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Technical Usability Architecture */}
                                <div className="space-y-4 pt-2">
                                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                        <Laptop className="size-4 text-sky-400" /> UI Architecture &amp; Usability Safeguards
                                    </h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-sky-500/30 transition-colors">
                                            <div className="size-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4 animate-pulse">
                                                <Compass className="size-5" />
                                            </div>
                                            <h5 className="text-sm font-black text-white mb-2">Self-Descriptive Flow</h5>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                                Clear, intuitive industry terminology ("Lock", "Unlock") replaces cryptic cryptographic jargon. Real-time process badges visually guide the user through backend pipeline operations.
                                            </p>
                                        </div>

                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-sky-500/30 transition-colors">
                                            <div className="size-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
                                                <ShieldCheck className="size-5" />
                                            </div>
                                            <h5 className="text-sm font-black text-white mb-2">Error Prevention Gate</h5>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                                Aggressive client-side validations intercept potential issues before server dispatch. Uploads are strictly checked for supported formats (PDF, DOCX, TXT) and capped at a 5 MB maximum capacity.
                                            </p>
                                        </div>

                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-sky-500/30 transition-colors">
                                            <div className="size-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
                                                <Users className="size-5" />
                                            </div>
                                            <h5 className="text-sm font-black text-white mb-2">Responsive Aesthetics</h5>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                                A refined, highly engaging "Cyber-Dark" design system ensures stable access and consistent layout rendering across diverse desktop, tablet, and mobile screens.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 5: Reliability */}
                    {isoTab === 'rel' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <h3 className="text-xl font-black text-white flex items-center gap-2">
                                    <Activity className="size-6 text-amber-400" /> Reliability &amp; Resilience
                                </h3>
                                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-black">
                                    GWM: 4.42 (Strongly Agree) - Rank 5
                                </span>
                            </div>

                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                Reliability ensures the multi-stage pipeline of encryption, segmentation, LSB embedding, and cloud storage remains stable and accessible without data loss or service interruption.
                            </p>

                            <div className="space-y-6">
                                {/* Section 1: Table 7 */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                        <Users className="size-4 text-amber-400" /> User Evaluation Survey Ratings
                                    </h4>
                                    
                                    {/* Table 7. Summary of Survey Ratings for Reliability */}
                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                                        <div className="bg-slate-900 text-slate-400 py-2 px-4 border-b border-slate-800 font-sans font-bold text-xs uppercase tracking-wider text-center">
                                            Table 7. Summary of Survey Ratings for Reliability
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-[11px] font-semibold">
                                                <thead>
                                                    <tr className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800 text-[10px]">
                                                        <th className="px-4 py-2 font-black">Code</th>
                                                        <th className="px-4 py-2 font-black">Survey Question Statement</th>
                                                        <th className="px-4 py-2 font-black text-center">Mean</th>
                                                        <th className="px-4 py-2 font-black text-center">Interpretation</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-850 text-slate-300">
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">RE1</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I feel that the StegoLock web app can be used at any time.</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center">4.43</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">RE2</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I have never experienced any StegoLock web app crash, lag, or failure while using it.</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center">4.60</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">RE3</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I find that the StegoLock web app can be easily used on any PC and mobile devices.</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center">4.53</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">RE4</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I think that the StegoLock web app has a good level of reliability and application performance when using various internet connections (e.g. WiFi, 4G, 3G).</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center">4.50</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">RE5</td>
                                                        <td className="px-4 py-2.5 text-slate-400">I think if an error occurs in the StegoLock web app, the app can work normally as usual.</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center">4.13</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">RE6</td>
                                                        <td className="px-4 py-2.5 text-slate-400">Overall, I find the StegoLock web app to be always reliable.</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center">4.30</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center">Strongly Agree</td>
                                                    </tr>
                                                    <tr className="bg-slate-900/80 border-t border-slate-800 font-sans font-bold text-[10px]">
                                                        <td colSpan={2} className="px-4 py-2.5 text-white uppercase tracking-wider">General Weighted Mean</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center text-xs">4.42</td>
                                                        <td className="px-4 py-2.5 text-amber-400 uppercase tracking-widest text-center">Strongly Agree</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Table 8 */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                        <Network className="size-4 text-amber-400" /> Distribution of Respondents’ Internet Access
                                    </h4>
                                    
                                    {/* Table 8. Distribution of Respondents’ Internet Access */}
                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                                        <div className="bg-slate-900 text-slate-400 py-2 px-4 border-b border-slate-800 font-sans font-bold text-xs uppercase tracking-wider text-center">
                                            Table 8. Distribution of Respondents’ Internet Access
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-[11px] font-semibold">
                                                <thead>
                                                    <tr className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800 text-[10px]">
                                                        <th className="px-4 py-2 font-black">Internet Access Type</th>
                                                        <th className="px-4 py-2 font-black text-center">Frequency (n)</th>
                                                        <th className="px-4 py-2 font-black text-center">Percentage (%)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-850 text-slate-300">
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">WiFi</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center font-bold">26</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center">87%</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">Mobile Data</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center font-bold">4</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center">13%</td>
                                                    </tr>
                                                    <tr className="bg-slate-900/80 border-t border-slate-800 font-sans font-bold text-[10px]">
                                                        <td className="px-4 py-2.5 text-white uppercase tracking-wider">TOTAL</td>
                                                        <td className="px-4 py-2.5 text-slate-400 text-center font-bold">30</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center text-xs">100%</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Table 9 */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                        <Database className="size-4 text-amber-400" /> Document Locking and Unlocking Success Ratios
                                    </h4>
                                    
                                    {/* Table 9. Document Locking and Unlocking Success Ratios */}
                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                                        <div className="bg-slate-900 text-slate-400 py-2 px-4 border-b border-slate-800 font-sans font-bold text-xs uppercase tracking-wider text-center">
                                            Table 9. Document Locking and Unlocking Success Ratios
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-[11px] font-semibold">
                                                <thead>
                                                    <tr className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800 text-[10px]">
                                                        <th className="px-4 py-2 font-black">Operation</th>
                                                        <th className="px-4 py-2 font-black text-center">Attempts</th>
                                                        <th className="px-4 py-2 font-black text-center">Success</th>
                                                        <th className="px-4 py-2 font-black text-center">Rate</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-850 text-slate-300">
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">Locking</td>
                                                        <td className="px-4 py-2.5 text-center text-slate-400">[26 + N]*</td>
                                                        <td className="px-4 py-2.5 text-center font-bold text-slate-300">26</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center">~90%</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-4 py-2.5 font-bold text-white">Unlocking</td>
                                                        <td className="px-4 py-2.5 text-center text-slate-400">26</td>
                                                        <td className="px-4 py-2.5 text-center font-bold text-slate-300">26</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center">100%</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="bg-slate-950/80 px-4 py-2 text-[9px] text-slate-500 italic border-t border-slate-850">
                                            *N is the number of documents primarily locked but failed in the process, and were deleted by the users.
                                        </div>
                                    </div>
                                </div>

                                {/* Section 4: Table 10 */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                        <CheckCircle className="size-4 text-amber-400" /> Document Unlock Attempts Audit
                                    </h4>
                                    
                                    {/* Table 10. Document Unlock Attempts */}
                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                                        <div className="bg-slate-900 text-slate-400 py-2 px-4 border-b border-slate-800 font-sans font-bold text-xs uppercase tracking-wider text-center">
                                            Table 10. Document Unlock Attempts
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-[11px] font-semibold">
                                                <thead>
                                                    <tr className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800 text-[10px]">
                                                        <th className="px-4 py-2 font-black">No.</th>
                                                        <th className="px-4 py-2 font-black">Document IDs (based on actual database record)</th>
                                                        <th className="px-4 py-2 font-black text-center">Unlock Attempts</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-850 text-slate-300">
                                                    {[
                                                        { no: 1, id: '10', attempts: 3 },
                                                        { no: 2, id: '21', attempts: 3 },
                                                        { no: 3, id: '8', attempts: 2 },
                                                        { no: 4, id: '22', attempts: 2 },
                                                        { no: 5, id: '31', attempts: 2 },
                                                        { no: 6, id: '7', attempts: 1 },
                                                        { no: 7, id: '18', attempts: 1 },
                                                        { no: 8, id: '30', attempts: 1 },
                                                        { no: 9, id: '34', attempts: 1 },
                                                        { no: 10, id: '35', attempts: 1 },
                                                        { no: 11, id: '36', attempts: 1 }
                                                    ].map((row, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                                                            <td className="px-4 py-2 text-slate-500 font-bold">{row.no}</td>
                                                            <td className="px-4 py-2 text-slate-400 font-mono">Document #{row.id}</td>
                                                            <td className="px-4 py-2 font-black text-amber-400 text-center">{row.attempts}</td>
                                                        </tr>
                                                    ))}
                                                    <tr className="hover:bg-slate-900/30 transition-colors font-bold text-slate-400 bg-slate-950/20">
                                                        <td className="px-4 py-2.5 text-slate-500">-</td>
                                                        <td className="px-4 py-2.5 text-slate-400 italic">*Deleted Documents</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center">8</td>
                                                    </tr>
                                                    <tr className="bg-slate-900/80 border-t border-slate-800 font-sans font-bold text-[10px]">
                                                        <td colSpan={2} className="px-4 py-2.5 text-white uppercase tracking-wider">Total (11+ documents)</td>
                                                        <td className="px-4 py-2.5 font-black text-amber-400 text-center text-xs">26</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 5: Summary Insights */}
                                <div className="space-y-4 pt-2">
                                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                        <AlertTriangle className="size-4 text-amber-400" /> Key Reliability &amp; Resilience Insights
                                    </h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
                                            <div className="size-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 animate-pulse">
                                                <Activity className="size-5" />
                                            </div>
                                            <h5 className="text-sm font-black text-white mb-2">Cover Selection Boundary (Failed Locking)</h5>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                                The singular locking failure recorded during production was isolated to a Cover Selection boundary where a dynamically generated text cover could not be retrieved by its cover_id (ModelNotFoundException). The system remained stable outside this boundary.
                                            </p>
                                        </div>

                                        <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
                                            <div className="size-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                                                <AlertTriangle className="size-5" />
                                            </div>
                                            <h5 className="text-sm font-black text-white mb-2">Cloud "Ghost Files" Resolved</h5>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                                Network latency between the server and cloud provider occasionally left unlinked stego fragments in Backblaze B2 ("Ghost Files"). Resolved by introducing the **System Integrity Audit tool** to automatically sync database and storage layers.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
