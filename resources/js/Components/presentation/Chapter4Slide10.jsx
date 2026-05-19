import React from 'react';
import { 
    Shield, Users, Cpu, Database, Compass, BarChart3, LineChart, 
    FileText, CheckCircle2, AlertTriangle, Key, Terminal, Code, 
    Clock, Globe, ArrowRight, Layers, HelpCircle, Laptop,
    Activity, ShieldCheck, Eye, Network, CheckCircle, Flame, Info
} from 'lucide-react';
import Slide10_Card4_Modal from './Slide10_Card4_Modal';

function Chapter4Slide10Content({ activeModal, setActiveModal }) {
    const [analysisTab, setAnalysisTab] = React.useState('sql'); // sql, learn

    // Constants for SVG Pentagon Radar Chart
    const center = 150;
    const rMax = 100;
    // Angles for the 5 vertices: -90, -18, 54, 126, 198 degrees in radians
    const angles = [
        -Math.PI / 2,             // Top (Performance Efficiency)
        -Math.PI / 10,            // Top-Right (Functional Suitability)
        Math.PI * 3 / 10,         // Bottom-Right (Security)
        Math.PI * 7 / 10,         // Bottom-Left (Usability)
        Math.PI * 11 / 10         // Top-Left (Reliability)
    ];

    // Helper to get coordinates
    const getCoords = (radiusFraction, index) => {
        const radius = rMax * radiusFraction;
        const x = center + radius * Math.cos(angles[index]);
        const y = center + radius * Math.sin(angles[index]);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    };

    // Actual coordinates for the GWM scores (normalized out of 5)
    // PE: 4.61 (92.2%), FS: 4.55 (91%), SEC: 4.55 (91%), US: 4.53 (90.6%), REL: 4.42 (88.4%)
    const actualCoords = [
        getCoords(4.61 / 5, 0), // PE
        getCoords(4.55 / 5, 1), // FS
        getCoords(4.55 / 5, 2), // SEC
        getCoords(4.53 / 5, 3), // US
        getCoords(4.42 / 5, 4)  // REL
    ].join(' ');

    // concentric background pentagons
    const pentagon1 = [getCoords(0.2, 0), getCoords(0.2, 1), getCoords(0.2, 2), getCoords(0.2, 3), getCoords(0.2, 4)].join(' ');
    const pentagon2 = [getCoords(0.4, 0), getCoords(0.4, 1), getCoords(0.4, 2), getCoords(0.4, 3), getCoords(0.4, 4)].join(' ');
    const pentagon3 = [getCoords(0.6, 0), getCoords(0.6, 1), getCoords(0.6, 2), getCoords(0.6, 3), getCoords(0.6, 4)].join(' ');
    const pentagon4 = [getCoords(0.8, 0), getCoords(0.8, 1), getCoords(0.8, 2), getCoords(0.8, 3), getCoords(0.8, 4)].join(' ');
    const pentagon5 = [getCoords(1.0, 0), getCoords(1.0, 1), getCoords(1.0, 2), getCoords(1.0, 3), getCoords(1.0, 4)].join(' ');

    return (
        <div className="h-full flex flex-col justify-center py-2 relative">
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
                    <div 
                        onClick={() => setActiveModal('chapter4-obj4-user-profile')}
                        className="w-full lg:w-[22rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                    >
                        <Users className="size-6 text-slate-400 dark:text-slate-500 group-hover/card:text-cyber-accent transition-colors duration-300 mb-2" />
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                            User Profile
                        </h3>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mt-1">
                            Click to Inspect Testing Environment &amp; Participants
                        </span>
                    </div>

                    {/* Card 2: Data Processing & Analysis */}
                    <div 
                        onClick={() => setActiveModal('chapter4-obj4-data-processing')}
                        className="w-full lg:w-[22rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                    >
                        <Terminal className="size-6 text-slate-400 dark:text-slate-500 group-hover/card:text-cyber-accent transition-colors duration-300 mb-2" />
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                            Data Extraction <br />and Processing
                        </h3>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mt-1">
                            Click to Inspect Production SQL Database Queries
                        </span>
                    </div>
                </div>

                {/* Row 2: 2 Cards */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 w-full">
                    {/* Card 3: Overall Evaluation Summary */}
                    <div 
                        onClick={() => setActiveModal('chapter4-obj4-evaluation-summary')}
                        className="w-full lg:w-[22rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                    >
                        <BarChart3 className="size-6 text-slate-400 dark:text-slate-500 group-hover/card:text-cyber-accent transition-colors duration-300 mb-2" />
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                            Overall Evaluation <br />Summary
                        </h3>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mt-1">
                            Click to Inspect GWM Statistics &amp; Radar Profile
                        </span>
                    </div>

                    {/* Card 4: Evaluation on ISO 25010 Characteristics */}
                    <div 
                        onClick={() => setActiveModal('chapter4-obj4-iso-characteristics')}
                        className="w-full lg:w-[22rem] h-32 glass-panel p-6 rounded-[2rem] border-slate-200 dark:border-cyber-border/30 bg-cyber-surface/10 hover:border-cyber-accent/50 hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-cyan-500/5 group/card cursor-pointer"
                    >
                        <Compass className="size-6 text-slate-400 dark:text-slate-500 group-hover/card:text-cyber-accent transition-colors duration-300 mb-2" />
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-cyber-accent transition-colors duration-300">
                            Evaluation on ISO 25010 <br />Characteristics
                        </h3>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-normal opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mt-1">
                            Click to Inspect the Five Quality Columns
                        </span>
                    </div>
                </div>
            </div>

            {/* Modal 1: User Profile */}
            {activeModal === 'chapter4-obj4-user-profile' && (
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
                                <Users className="size-7 text-cyber-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">User Profile &amp; Environment Setup</h2>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-300 scrollbar-thin">
                            <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-medium">
                                To evaluate StegoLock's functional efficacy under live deployment conditions on Railway, the researchers established a controlled testing environment and paired it with a structured participation pool of system accounts and standard respondents.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Table 3: General Testing Environment Setup Summary */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col">
                                    <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2 border-b border-slate-800/60 pb-2">
                                        <Database className="size-4 text-cyan-400" /> Table 3. General Testing Environment Setup Summary
                                    </h4>
                                    <div className="overflow-x-auto flex-1">
                                        <table className="w-full text-left text-xs font-semibold">
                                            <thead>
                                                <tr className="bg-slate-900/60 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
                                                    <th className="px-4 py-2 font-black">Component</th>
                                                    <th className="px-4 py-2 font-black">Description</th>
                                                    <th className="px-4 py-2 font-black">Specification</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-850/40">
                                                <tr className="hover:bg-slate-900/20 transition-colors">
                                                    <td className="px-4 py-2 text-white font-bold">Cloud Storage Cap</td>
                                                    <td className="px-4 py-2 text-slate-400">Provider’s free-tier allocation</td>
                                                    <td className="px-4 py-2 text-cyan-400 font-black">10GB</td>
                                                </tr>
                                                <tr className="hover:bg-slate-900/20 transition-colors">
                                                    <td className="px-4 py-2 text-white font-bold">Individual Storage Limit</td>
                                                    <td className="px-4 py-2 text-slate-400">Allocated per Standard User</td>
                                                    <td className="px-4 py-2 text-cyan-400 font-black">225MB</td>
                                                </tr>
                                                <tr className="hover:bg-slate-900/20 transition-colors">
                                                    <td className="px-4 py-2 text-white font-bold">Maximum User Capacity</td>
                                                    <td className="px-4 py-2 text-slate-400">Based on Storage allocation</td>
                                                    <td className="px-4 py-2 text-cyan-400 font-black">40 Users</td>
                                                </tr>
                                                <tr className="hover:bg-slate-900/20 transition-colors">
                                                    <td className="px-4 py-2 text-white font-bold">Cover File Repository</td>
                                                    <td className="px-4 py-2 text-slate-400">Remaining cloud storage capacity</td>
                                                    <td className="px-4 py-2 text-cyan-400 font-black">~ 1.0 GB</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Table 4: User Participation and Response Summary */}
                                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col">
                                    <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2 border-b border-slate-800/60 pb-2">
                                        <Activity className="size-4 text-purple-400" /> Table 4. User Participation and Response Summary
                                    </h4>
                                    <div className="overflow-x-auto flex-1">
                                        <table className="w-full text-left text-xs font-semibold">
                                            <thead>
                                                <tr className="bg-slate-900/60 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
                                                    <th className="px-4 py-2 font-black">User Category</th>
                                                    <th className="px-4 py-2 font-black">Status</th>
                                                    <th className="px-4 py-2 font-black text-center">Frequency (n)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-850/40">
                                                <tr className="hover:bg-slate-900/20 transition-colors">
                                                    <td className="px-4 py-2 text-white font-bold">Administrative Accounts</td>
                                                    <td className="px-4 py-2 text-slate-400">Registered for system management</td>
                                                    <td className="px-4 py-2 text-purple-400 font-black text-center">4</td>
                                                </tr>
                                                <tr className="hover:bg-slate-900/20 transition-colors">
                                                    <td className="px-4 py-2 text-white font-bold">Registered End-Users</td>
                                                    <td className="px-4 py-2 text-slate-400">Registered for evaluation</td>
                                                    <td className="px-4 py-2 text-purple-400 font-black text-center">36</td>
                                                </tr>
                                                <tr className="hover:bg-slate-900/20 bg-purple-500/5 transition-colors">
                                                    <td className="px-4 py-2 text-white font-bold">Total Respondents</td>
                                                    <td className="px-4 py-2 text-slate-300 font-bold">Successfully completed survey</td>
                                                    <td className="px-4 py-2 text-emerald-400 font-black text-center">30</td>
                                                </tr>
                                                <tr className="hover:bg-slate-900/20 transition-colors border-t border-slate-850">
                                                    <td className="px-4 py-2 text-white font-bold">Total Users</td>
                                                    <td className="px-4 py-2 text-slate-400 font-bold">All user accounts registered in the system</td>
                                                    <td className="px-4 py-2 text-purple-400 font-black text-center">40</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Table 5: Standard User Profile Responses Summary */}
                            <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl">
                                <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2 border-b border-slate-800/60 pb-2">
                                    <Users className="size-4 text-emerald-400" /> Table 5. Standard User Profile Responses Summary
                                </h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs font-semibold">
                                        <thead>
                                            <tr className="bg-slate-900/60 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
                                                <th className="px-4 py-2 font-black">Respondent Category</th>
                                                <th className="px-4 py-2 font-black">User-Identified Role</th>
                                                <th className="px-4 py-2 font-black text-center">Frequency (n)</th>
                                                <th className="px-4 py-2 font-black text-center">Percentage (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-850/40">
                                            <tr className="hover:bg-slate-900/20 transition-colors">
                                                <td className="px-4 py-2.5 text-white font-bold" rowSpan={3}>Standard Users</td>
                                                <td className="px-4 py-2.5 text-slate-300">Students</td>
                                                <td className="px-4 py-2.5 text-cyan-400 font-black text-center">26</td>
                                                <td className="px-4 py-2.5 text-cyan-400 font-black text-center">87%</td>
                                            </tr>
                                            <tr className="hover:bg-slate-900/20 transition-colors">
                                                <td className="px-4 py-2.5 text-slate-300">Professionals</td>
                                                <td className="px-4 py-2.5 text-purple-400 font-black text-center">3</td>
                                                <td className="px-4 py-2.5 text-purple-400 font-black text-center">10%</td>
                                            </tr>
                                            <tr className="hover:bg-slate-900/20 transition-colors">
                                                <td className="px-4 py-2.5 text-slate-300">Others</td>
                                                <td className="px-4 py-2.5 text-emerald-400 font-black text-center">1</td>
                                                <td className="px-4 py-2.5 text-emerald-400 font-black text-center">3%</td>
                                            </tr>
                                            <tr className="bg-slate-900/40 font-black border-t border-slate-800">
                                                <td className="px-4 py-2.5 text-white uppercase tracking-wider text-[10px]" colSpan={2}>Total</td>
                                                <td className="px-4 py-2.5 text-emerald-400 text-center">30</td>
                                                <td className="px-4 py-2.5 text-emerald-400 text-center">100%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Modal 2: Data Processing & Analysis */}
            {activeModal === 'chapter4-obj4-data-processing' && (
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
                                <Terminal className="size-7 text-cyber-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Data Extraction and Processing</h2>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-300 scrollbar-thin">
                            <div className="space-y-6">
                                <p className="text-sm leading-relaxed text-slate-400 font-medium">
                                    To ensure the integrity, transparency, and empirical precision of the evaluation results, the researchers programmatically extracted raw entries directly from the application's live production MySQL database hosted on Railway. The standard database queries (Figures 52, 53, 62, 63, 64, 65, 66, and 67) listed below were executed to derive overall system performance, Likert GWM scores, learnability curves, subprocess latency patterns, and transaction speed distribution across different file size ranges.
                                </p>

                                <div className="space-y-8">
                                    {/* Query 1 - Figure 52 */}
                                    <div className="space-y-2">
                                        <div className="bg-slate-950/80 border border-slate-800/80 p-5 rounded-2xl font-mono text-xs shadow-inner">
                                            <div className="flex justify-between items-center text-[10px] text-slate-500 mb-2 border-b border-slate-900/60 pb-1.5 font-sans font-bold">
                                                <span className="flex items-center gap-1.5"><Terminal className="size-3 text-cyan-400" /> SYSTEM OVERALL MEAN</span>
                                                <span className="text-cyan-400">MySQL 8.0</span>
                                            </div>
                                            <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`SELECT 
    (SELECT COUNT(DISTINCT survey_response_id) FROM survey_answers) as total_respondents,
    COUNT(*) as total_individual_ratings,
    ROUND(AVG(rating), 4) as gwm
FROM survey_answers;`}
                                            </pre>
                                            <div className="mt-3 pt-3 border-t border-slate-900/60 flex justify-between items-center font-sans">
                                                <span className="text-[10px] text-slate-500 font-bold">Execution Result:</span>
                                                <span className="text-[11px] text-slate-300 font-semibold">Respondents: <strong className="text-white">30</strong> | GWM Score: <strong className="text-cyan-400">4.53</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-bold text-center italic tracking-wide">
                                            Figure 52. Database Query for Overall Evaluation Mean
                                        </p>
                                    </div>

                                    {/* Query 2 - Figure 53 */}
                                    <div className="space-y-2">
                                        <div className="bg-slate-950/80 border border-slate-800/80 p-5 rounded-2xl font-mono text-xs shadow-inner">
                                            <div className="flex justify-between items-center text-[10px] text-slate-500 mb-2 border-b border-slate-900/60 pb-1.5 font-sans font-bold">
                                                <span className="flex items-center gap-1.5"><Terminal className="size-3 text-cyan-400" /> CATEGORICAL WEIGHTED MEANS</span>
                                                <span className="text-cyan-400">MySQL 8.0</span>
                                            </div>
                                            <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`SELECT 
    q.category,
    COUNT(a.id) as response_count,
    ROUND(AVG(a.rating), 2) as weighted_mean
FROM survey_answers a
JOIN survey_questions q ON a.survey_question_id = q.id
GROUP BY q.category;`}
                                            </pre>
                                            <div className="mt-3 pt-3 border-t border-slate-900/60 flex justify-between items-center font-sans">
                                                <span className="text-[10px] text-slate-500 font-bold">Target Output:</span>
                                                <span className="text-[11px] text-slate-300 font-semibold">Resolves GWM ratings for all 5 ISO/IEC 25010 columns</span>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-bold text-center italic tracking-wide">
                                            Figure 53. Database Query for Categorical Weighted Means
                                        </p>
                                    </div>

                                    {/* Query 3 - Figure 62 */}
                                    <div className="space-y-2">
                                        <div className="bg-slate-950/80 border border-slate-800/80 p-5 rounded-2xl font-mono text-xs shadow-inner">
                                            <div className="flex justify-between items-center text-[10px] text-slate-500 mb-2 border-b border-slate-900/60 pb-1.5 font-sans font-bold">
                                                <span className="flex items-center gap-1.5"><Terminal className="size-3 text-purple-400" /> LEARNABILITY: TIME TO FIRST LOCK</span>
                                                <span className="text-purple-400">MySQL 8.0</span>
                                            </div>
                                            <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`SELECT 
    u.id,
    DATE_FORMAT(u.created_at, '%M %e, %Y %H:%i:%s') AS registered_at,
    DATE_FORMAT(d.created_at, '%M %e, %Y %H:%i:%s') AS first_document_locked_at,
    TIMESTAMPDIFF(MINUTE, u.created_at, d.created_at) AS diff_minutes
FROM users u
JOIN documents d ON u.id = d.user_id
WHERE u.id NOT IN (3, 4)
  AND d.document_id = (
    SELECT MIN(d2.document_id)
    FROM documents d2
    WHERE d2.user_id = u.id AND d2.status = 'stored'
  );`}
                                            </pre>
                                            <div className="mt-3 pt-3 border-t border-slate-900/60 flex justify-between items-center font-sans">
                                                <span className="text-[10px] text-slate-500 font-bold">Key Metric Result:</span>
                                                <span className="text-[11px] text-slate-300 font-semibold">Onboarding Curve Average: <strong className="text-white">5.57 Min</strong> | Median: <strong className="text-cyan-400">1.50 Min</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-bold text-center italic tracking-wide">
                                            Figure 62. Database Query for Learnability Metric: Time to First Document Lock after Registration
                                        </p>
                                    </div>

                                    {/* Query 4 - Figure 63 */}
                                    <div className="space-y-2">
                                        <div className="bg-slate-950/80 border border-slate-800/80 p-5 rounded-2xl font-mono text-xs shadow-inner">
                                            <div className="flex justify-between items-center text-[10px] text-slate-500 mb-2 border-b border-slate-900/60 pb-1.5 font-sans font-bold">
                                                <span className="flex items-center gap-1.5"><Terminal className="size-3 text-purple-400" /> LEARNABILITY: FIRST LOCK TO FIRST UNLOCK</span>
                                                <span className="text-purple-400">MySQL 8.0</span>
                                            </div>
                                            <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`SELECT 
    u.id,
    DATE_FORMAT(d.created_at, '%M %e, %Y %H:%i:%s') AS first_document_locked_at,
    DATE_FORMAT(MIN(da.created_at), '%M %e, %Y %H:%i:%s') AS first_unlocked_at,
    TIMESTAMPDIFF(MINUTE, d.created_at, MIN(da.created_at)) AS diff_minutes
FROM users u
JOIN documents d ON u.id = d.user_id
INNER JOIN document_activities da ON d.document_id = da.document_id
WHERE u.id NOT IN (3, 4)
  AND da.action = 'unlocked'
  AND d.document_id = (
    SELECT MIN(d2.document_id)
    FROM documents d2
    WHERE d2.user_id = u.id AND d2.status = 'stored'
  )
GROUP BY u.id, d.created_at;`}
                                            </pre>
                                            <div className="mt-3 pt-3 border-t border-slate-900/60 flex justify-between items-center font-sans">
                                                <span className="text-[10px] text-slate-500 font-bold">Key Metric Result:</span>
                                                <span className="text-[11px] text-slate-300 font-semibold">Average Mastering Latency to First Unlock: <strong className="text-cyan-400">4.60 Minutes</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-bold text-center italic tracking-wide">
                                            Figure 63. Database Query for Learnability Metric: Time from First Lock to First Unlock
                                        </p>
                                    </div>

                                    {/* Query 5 - Figure 64 */}
                                    <div className="space-y-2">
                                        <div className="bg-slate-950/80 border border-slate-800/80 p-5 rounded-2xl font-mono text-xs shadow-inner">
                                            <div className="flex justify-between items-center text-[10px] text-slate-500 mb-2 border-b border-slate-900/60 pb-1.5 font-sans font-bold">
                                                <span className="flex items-center gap-1.5"><Terminal className="size-3 text-emerald-400" /> LOCK PROCESS LATENCY BY STEP</span>
                                                <span className="text-emerald-400">MySQL 8.0</span>
                                            </div>
                                            <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`SELECT 
    step,
    COUNT(document_id) AS document_count,
    AVG(duration_ms) AS avg_duration_ms
FROM process_metrics
WHERE step IN ('upload', 'encryption', 'segmentation', 'embedding')
GROUP BY step
ORDER BY FIELD(step, 'upload', 'encryption', 'segmentation', 'embedding');`}
                                            </pre>
                                            <div className="mt-3 pt-3 border-t border-slate-900/60 flex justify-between items-center font-sans">
                                                <span className="text-[10px] text-slate-500 font-bold">Extraction Purpose:</span>
                                                <span className="text-[11px] text-slate-300 font-semibold">Audits individual cryptographic/embedding subprocesses to track objective performance.</span>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-bold text-center italic tracking-wide">
                                            Figure 64. Database Query for Average Locking Process Latency by Sub-process
                                        </p>
                                    </div>

                                    {/* Query 6 - Figure 65 */}
                                    <div className="space-y-2">
                                        <div className="bg-slate-950/80 border border-slate-800/80 p-5 rounded-2xl font-mono text-xs shadow-inner">
                                            <div className="flex justify-between items-center text-[10px] text-slate-500 mb-2 border-b border-slate-900/60 pb-1.5 font-sans font-bold">
                                                <span className="flex items-center gap-1.5"><Terminal className="size-3 text-emerald-400" /> UNLOCK PROCESS LATENCY BY STEP</span>
                                                <span className="text-emerald-400">MySQL 8.0</span>
                                            </div>
                                            <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`SELECT 
    step,
    COUNT(document_id) AS document_count,
    AVG(duration_ms) AS avg_duration_ms
FROM process_metrics
WHERE step IN ('cloud_retrieval', 'extraction', 'assembly', 'decryption')
  AND job_type = 'unlock'
GROUP BY step
ORDER BY FIELD(step, 'cloud_retrieval', 'extraction', 'assembly', 'decryption');`}
                                            </pre>
                                            <div className="mt-3 pt-3 border-t border-slate-900/60 flex justify-between items-center font-sans">
                                                <span className="text-[10px] text-slate-500 font-bold">Extraction Purpose:</span>
                                                <span className="text-[11px] text-slate-300 font-semibold">Audits B2 cloud retrieval and stego decryption reconstruction step duration values.</span>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-bold text-center italic tracking-wide">
                                            Figure 65. Database Query for Average Unlocking Process Latency by Sub-process
                                        </p>
                                    </div>

                                    {/* Query 7 - Figure 66 */}
                                    <div className="space-y-2">
                                        <div className="bg-slate-950/80 border border-slate-800/80 p-5 rounded-2xl font-mono text-xs shadow-inner">
                                            <div className="flex justify-between items-center text-[10px] text-slate-500 mb-2 border-b border-slate-900/60 pb-1.5 font-sans font-bold">
                                                <span className="flex items-center gap-1.5"><Terminal className="size-3 text-cyan-400" /> LOCK LATENCY BY FILE SIZE RANGE</span>
                                                <span className="text-cyan-400">MySQL 8.0</span>
                                            </div>
                                            <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`SELECT 
    CASE 
        WHEN d.original_size < 1048576 THEN '< 1MB'
        WHEN d.original_size >= 1048576 AND d.original_size < 3145728 THEN '1MB - 3MB'
        WHEN d.original_size >= 3145728 AND d.original_size <= 5242880 THEN '3MB - 5MB'
        ELSE '> 5MB'
    END AS size_range,
    COUNT(DISTINCT d.document_id) AS document_count,
    ROUND(AVG(lock_totals.total_lock_time_ms), 2) AS avg_locking_process_ms
FROM documents d
LEFT JOIN (
    SELECT document_id, SUM(duration_ms) AS total_lock_time_ms
    FROM process_metrics
    WHERE step IN ('upload', 'encryption', 'segmentation', 'embedding')
    GROUP BY document_id
) AS lock_totals ON d.document_id = lock_totals.document_id
GROUP BY 1
ORDER BY FIELD(size_range, '< 1MB', '1MB - 3MB', '3MB - 5MB', '> 5MB');`}
                                            </pre>
                                            <div className="mt-3 pt-3 border-t border-slate-900/60 flex justify-between items-center font-sans">
                                                <span className="text-[10px] text-slate-500 font-bold">Extraction Purpose:</span>
                                                <span className="text-[11px] text-slate-300 font-semibold">Analyzes transaction speed efficiency across discrete payload size intervals.</span>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-bold text-center italic tracking-wide">
                                            Figure 66. Database Query for Locking Process Distribution Across File Size Ranges
                                        </p>
                                    </div>

                                    {/* Query 8 - Figure 67 */}
                                    <div className="space-y-2">
                                        <div className="bg-slate-950/80 border border-slate-800/80 p-5 rounded-2xl font-mono text-xs shadow-inner">
                                            <div className="flex justify-between items-center text-[10px] text-slate-500 mb-2 border-b border-slate-900/60 pb-1.5 font-sans font-bold">
                                                <span className="flex items-center gap-1.5"><Terminal className="size-3 text-cyan-400" /> UNLOCK LATENCY BY FILE SIZE RANGE</span>
                                                <span className="text-cyan-400">MySQL 8.0</span>
                                            </div>
                                            <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`SELECT 
    CASE 
        WHEN d.original_size < 1048576 THEN '< 1MB'
        WHEN d.original_size >= 1048576 AND d.original_size < 3145728 THEN '1MB - 3MB'
        WHEN d.original_size >= 3145728 AND d.original_size <= 5242880 THEN '3MB - 5MB'
        ELSE '> 5MB'
    END AS size_range,
    COUNT(DISTINCT d.document_id) AS document_count,
    ROUND(AVG(unlock_totals.total_unlock_time_ms), 2) AS avg_unlocking_process_ms
FROM documents d
LEFT JOIN (
    SELECT document_id, SUM(duration_ms) AS total_unlock_time_ms
    FROM process_metrics
    WHERE step IN ('unlock_prepare', 'cloud_retrieval', 'extraction', 'assembly', 'decryption')
    GROUP BY document_id
) AS unlock_totals ON d.document_id = unlock_totals.document_id
GROUP BY 1
ORDER BY FIELD(size_range, '< 1MB', '1MB - 3MB', '3MB - 5MB', '> 5MB');`}
                                            </pre>
                                            <div className="mt-3 pt-3 border-t border-slate-900/60 flex justify-between items-center font-sans">
                                                <span className="text-[10px] text-slate-500 font-bold">Extraction Purpose:</span>
                                                <span className="text-[11px] text-slate-300 font-semibold">Analyzes transaction speed efficiency during restoration across payload intervals.</span>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-bold text-center italic tracking-wide">
                                            Figure 67. Database Query for Unlocking Process Distribution Across File Size Ranges
                                        </p>
                                    </div>
                                </div>

                                <p className="text-xs leading-relaxed text-slate-400 font-medium border-t border-slate-800/60 pt-4">
                                    Through the execution of these queries, the raw database entries were programmatically transformed into structured statistical averages. This transition from individual entries to structured statistical means allows for an empirical, data-driven evaluation of the system's performance and usability profile, directly mapping physical database logs to the specific quality characteristics of the ISO/IEC 25010 standard.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 3: Overall Evaluation Summary */}
            {activeModal === 'chapter4-obj4-evaluation-summary' && (
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
                                <BarChart3 className="size-7 text-cyber-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Overall ISO/IEC 25010 summary</h2>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-slate-300 scrollbar-thin">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                {/* Left: GWM Ratings Table (7 cols) */}
                                <div className="lg:col-span-7 space-y-4">
                                    <p className="text-sm leading-relaxed text-slate-400 font-medium">
                                        The data presented in <strong className="text-white">Table 6</strong> reveals a consistently high level of user satisfaction across all five ISO/IEC 25010 quality characteristics. With an overall mean of <strong className="text-cyan-400">4.53</strong>, the StegoLock application is classified under the <strong className="text-white">"Strongly Agree"</strong> Likert scale description.
                                    </p>

                                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                                        <div className="bg-slate-900 text-slate-400 py-2.5 px-4 border-b border-slate-800 font-sans font-bold text-xs uppercase tracking-wider">
                                            Table 6. Summary of ISO/IEC 25010 Quality Characteristic Ratings
                                        </div>
                                        <table className="w-full text-left text-xs font-semibold">
                                            <thead>
                                                <tr className="bg-slate-900 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
                                                    <th className="px-4 py-2 font-black">ISO Quality Characteristic</th>
                                                    <th className="px-4 py-2 font-black text-center">General Weighted Mean (GWM)</th>
                                                    <th className="px-4 py-2 font-black">Likert Scale Description</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-850">
                                                <tr className="hover:bg-slate-900/40 transition-colors">
                                                    <td className="px-4 py-2.5 font-bold text-white">Performance Efficiency</td>
                                                    <td className="px-4 py-2.5 font-black text-cyan-400 text-center">4.61</td>
                                                    <td className="px-4 py-2.5 text-slate-400">Strongly Agree</td>
                                                </tr>
                                                <tr className="hover:bg-slate-900/40 transition-colors">
                                                    <td className="px-4 py-2.5 font-bold text-white">Functional Suitability</td>
                                                    <td className="px-4 py-2.5 font-black text-cyan-400 text-center">4.55</td>
                                                    <td className="px-4 py-2.5 text-slate-400">Strongly Agree</td>
                                                </tr>
                                                <tr className="hover:bg-slate-900/40 transition-colors">
                                                    <td className="px-4 py-2.5 font-bold text-white">Security</td>
                                                    <td className="px-4 py-2.5 font-black text-cyan-400 text-center">4.55</td>
                                                    <td className="px-4 py-2.5 text-slate-400">Strongly Agree</td>
                                                </tr>
                                                <tr className="hover:bg-slate-900/40 transition-colors">
                                                    <td className="px-4 py-2.5 font-bold text-white">Usability</td>
                                                    <td className="px-4 py-2.5 font-black text-cyan-400 text-center">4.53</td>
                                                    <td className="px-4 py-2.5 text-slate-400">Strongly Agree</td>
                                                </tr>
                                                <tr className="hover:bg-slate-900/40 transition-colors">
                                                    <td className="px-4 py-2.5 font-bold text-white">Reliability</td>
                                                    <td className="px-4 py-2.5 font-black text-cyan-400 text-center">4.42</td>
                                                    <td className="px-4 py-2.5 text-amber-400 font-bold">Agree</td>
                                                </tr>
                                                <tr className="bg-slate-900/85 border-t border-slate-800">
                                                    <td className="px-4 py-3 font-black text-white uppercase tracking-wider text-[10px]">OVERALL MEAN</td>
                                                    <td className="px-4 py-3 font-black text-emerald-400 text-center text-sm">4.53</td>
                                                    <td className="px-4 py-3 font-black text-emerald-400 uppercase tracking-widest text-[10px]">STRONGLY AGREE</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Right: Pentagon Radar Chart SVG (5 cols) */}
                                <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-950/40 border border-slate-800/80 p-4 rounded-3xl relative overflow-hidden group">
                                    <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <Compass className="size-4 text-cyan-400" /> Multi-Dimensional Profile
                                    </h4>
                                    
                                    <div className="relative size-[300px]">
                                        <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                                            <defs>
                                                <radialGradient id="radar-grad" cx="50%" cy="50%" r="50%">
                                                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                                                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.05" />
                                                </radialGradient>
                                                <filter id="glow">
                                                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                                    <feMerge>
                                                        <feMergeNode in="coloredBlur"/>
                                                        <feMergeNode in="SourceGraphic"/>
                                                    </feMerge>
                                                </filter>
                                            </defs>
                                            
                                            {/* Concentric grid lines */}
                                            <polygon points={pentagon1} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                                            <polygon points={pentagon2} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                                            <polygon points={pentagon3} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                                            <polygon points={pentagon4} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                            <polygon points={pentagon5} fill="none" stroke="rgba(34,211,238,0.25)" strokeWidth="1" strokeDasharray="3,3" />

                                            {/* Radial axes */}
                                            {angles.map((angle, idx) => (
                                                <line 
                                                    key={idx}
                                                    x1={center} 
                                                    y1={center} 
                                                    x2={center + rMax * Math.cos(angle)} 
                                                    y2={center + rMax * Math.sin(angle)} 
                                                    stroke="rgba(255,255,255,0.08)" 
                                                    strokeWidth="1.5" 
                                                />
                                            ))}

                                            {/* Actual data GWM polygon */}
                                            <polygon 
                                                points={actualCoords} 
                                                fill="url(#radar-grad)" 
                                                stroke="#22d3ee" 
                                                strokeWidth="2.5" 
                                                filter="url(#glow)"
                                                className="animate-pulse"
                                            />

                                            {/* Labels */}
                                            {/* PE Label */}
                                            <text x={center} y={center - rMax - 12} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">PE: 4.61</text>
                                            {/* FS Label */}
                                            <text x={center + rMax * Math.cos(angles[1]) + 20} y={center + rMax * Math.sin(angles[1]) + 4} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="start">FS: 4.55</text>
                                            {/* SEC Label */}
                                            <text x={center + rMax * Math.cos(angles[2]) + 10} y={center + rMax * Math.sin(angles[2]) + 15} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="start">SEC: 4.55</text>
                                            {/* US Label */}
                                            <text x={center + rMax * Math.cos(angles[3]) - 10} y={center + rMax * Math.sin(angles[3]) + 15} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="end">US: 4.53</text>
                                            {/* REL Label */}
                                            <text x={center + rMax * Math.cos(angles[4]) - 20} y={center + rMax * Math.sin(angles[4]) + 4} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="end">REL: 4.42</text>
                                        </svg>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold text-center italic mt-2">
                                        Figure 54. Visual Profile of StegoLock Evaluation Scores
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-3xl space-y-3">
                                <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                                    <ShieldCheck className="size-4 text-cyber-accent" /> Triangulation &amp; Architecture Stability
                                </h5>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    To visually demonstrate the multi-dimensional quality of StegoLock, a Radar Chart (<strong className="text-white">Figure 54</strong>) is used. The evaluation results form a broad and relatively symmetrical pentagonal shape, indicating high proficiency in all domains. The narrow rating variance (only 0.19 difference between the highest-ranked Performance Efficiency and lowest-ranked Reliability) indicates a highly stable and well-rounded software architecture, demonstrating that the application maintains a high standard of quality without compromising one quality characteristic for another.
                                </p>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    While the survey ratings represent subjective perceptions, the study employs a method known as <strong>Triangulation</strong>. This involves cross-referencing the "Subjective" survey data (the Perception) with "Objective" system metrics (the Facts), matching user sentiments with millisecond-level subprocess durations and database success ratios.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal 4: Evaluation on ISO 25010 Characteristics */}
            <Slide10_Card4_Modal activeModal={activeModal} setActiveModal={setActiveModal} />

            <style dangerouslySetInnerHTML={{__html: `
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: rgba(34,211,238,0.2);
                    border-radius: 9999px;
                }
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </div>
    );
}

export function getChapter4Slide10({ activeModal, setActiveModal }) {
    return [
        // Slide 10: Findings of the Study (Objective 4)
        {
            title: "Chapter 4",
            subtitle: "Objective 4: ISO/IEC 25010 Evaluation & GWM Summary",
            content: <Chapter4Slide10Content activeModal={activeModal} setActiveModal={setActiveModal} />
        }
    ];
}
