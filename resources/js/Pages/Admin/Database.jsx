import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { 
    Server, 
    Database as DbIcon, 
    Table, 
    Activity, 
    Cpu, 
    HardDrive,
    Info,
    RefreshCw,
    ShieldAlert,
    ShieldCheck,
    Skull,
    FileWarning,
    User,
    Calendar,
    Search,
    Trash2,
    CheckCircle2,
    AlertTriangle,
    Loader2
} from 'lucide-react';

export default function DatabasePage({ database, tables, integrity }) {
    const [auditLoading, setAuditLoading] = useState(false);
    const [purgeLoading, setPurgeLoading] = useState(false);
    const [auditResults, setAuditResults] = useState(null);

    const formatBytes = (bytes, decimals = 2) => {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    };

    const runAudit = async () => {
        setAuditLoading(true);
        try {
            const response = await axios.get(route('admin.database.audit'));
            setAuditResults(response.data);
        } catch (error) {
            console.error("Audit failed", error);
            alert("Failed to complete system audit.");
        } finally {
            setAuditLoading(false);
        }
    };

    const purgeGhosts = async () => {
        if (!auditResults?.ghosts.length) return;
        if (!confirm(`Are you sure you want to permanently delete ${auditResults.ghosts.length} ghost files from cloud storage? This action cannot be undone.`)) return;

        setPurgeLoading(true);
        try {
            await axios.post(route('admin.database.purge-ghosts'), {
                files: auditResults.ghosts
            });
            alert("Ghost files purged successfully.");
            setAuditResults(prev => ({ ...prev, ghosts: [], stats: { ...prev.stats, ghost_count: 0, ghost_size: 0 } }));
        } catch (error) {
            console.error("Purge failed", error);
            alert("Failed to purge ghost files.");
        } finally {
            setPurgeLoading(false);
        }
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                            <Server className="size-6 text-orange-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                                Database Management
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase mt-0.5">
                                Referential integrity audit & schema diagnostics
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button
                            onClick={runAudit}
                            disabled={auditLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-500/20"
                        >
                            {auditLoading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
                            {auditLoading ? 'Auditing...' : 'Run System Audit'}
                        </button>

                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                            integrity.is_healthy 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' 
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-600'
                        }`}>
                            {integrity.is_healthy ? <ShieldCheck className="size-4" /> : <ShieldAlert className="size-4 animate-pulse" />}
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                Status: {integrity.is_healthy ? 'Optimized' : 'Integrity Warning'}
                            </span>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Database Integrity" />

            <div className="space-y-6">
                {/* Audit Results (Conditional) */}
                {auditResults && (
                    <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-top duration-500">
                        <div className="bg-white dark:bg-cyber-surface/30 rounded-2xl border border-orange-500/30 overflow-hidden shadow-2xl shadow-orange-500/5">
                            <div className="p-6 border-b border-orange-500/10 flex items-center justify-between bg-orange-500/5">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="size-5 text-orange-500" />
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Audit Diagnostic Results</h3>
                                </div>
                                <button 
                                    onClick={() => setAuditResults(null)}
                                    className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase"
                                >
                                    Dismiss
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x border-b border-slate-100 dark:border-cyber-border/30">
                                {/* Ghost Files Panel */}
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                                                <Skull className="size-4 text-rose-500" />
                                                Cloud Ghost Files
                                            </h4>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Files in B2 with no database reference</p>
                                        </div>
                                        {auditResults.ghosts.length > 0 && (
                                            <button 
                                                onClick={purgeGhosts}
                                                disabled={purgeLoading}
                                                className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all"
                                            >
                                                {purgeLoading ? <Loader2 className="size-3 animate-spin" /> : <Trash2 className="size-3" />}
                                                Purge {auditResults.ghosts.length} Files
                                            </button>
                                        )}
                                    </div>

                                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                        {auditResults.ghosts.length === 0 ? (
                                            <div className="py-8 text-center bg-slate-50 dark:bg-cyber-void/30 rounded-xl border border-dashed border-slate-200 dark:border-cyber-border/50">
                                                <CheckCircle2 className="size-8 text-emerald-500 mx-auto mb-2 opacity-50" />
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No ghost files detected</p>
                                            </div>
                                        ) : (
                                            auditResults.ghosts.map(ghost => (
                                                <div key={ghost.fileId} className="p-3 bg-slate-50 dark:bg-cyber-void/30 border border-slate-100 dark:border-cyber-border/30 rounded-xl flex items-center justify-between group">
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 truncate">{ghost.fileName}</p>
                                                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter mt-0.5">
                                                            Uploaded: {new Date(ghost.uploadTimestamp).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-md">
                                                        {formatBytes(ghost.size)}
                                                    </span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Mismatched Documents Panel */}
                                <div className="p-6 space-y-4">
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                                        <AlertTriangle className="size-4 text-amber-500" />
                                        Incomplete/Mismatched Documents
                                    </h4>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Documents with inconsistent fragment counts</p>

                                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                        {auditResults.mismatched.length === 0 ? (
                                            <div className="py-8 text-center bg-slate-50 dark:bg-cyber-void/30 rounded-xl border border-dashed border-slate-200 dark:border-cyber-border/50">
                                                <CheckCircle2 className="size-8 text-emerald-500 mx-auto mb-2 opacity-50" />
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">All documents consistent</p>
                                            </div>
                                        ) : (
                                            auditResults.mismatched.map(doc => (
                                                <div key={doc.id} className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center justify-between">
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{doc.name}</p>
                                                        <div className="flex gap-2 mt-1">
                                                            <span className="text-[9px] font-black text-slate-500 uppercase">User: {doc.user}</span>
                                                            <span className="text-[9px] font-black text-amber-600 uppercase bg-amber-500/10 px-1.5 rounded">Status: {doc.status}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Expected: {doc.expected}</p>
                                                        <p className="text-[10px] font-black text-rose-500 uppercase tracking-tighter">Found: {doc.actual_stego}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 dark:bg-cyber-void/20 flex items-center justify-center gap-8 border-t border-slate-100 dark:border-cyber-border/30">
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ghost Storage</p>
                                    <p className="text-lg font-black text-rose-500">{formatBytes(auditResults.stats.ghost_size)}</p>
                                </div>
                                <div className="h-8 w-px bg-slate-200 dark:bg-cyber-border/50" />
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">At Risk Docs</p>
                                    <p className="text-lg font-black text-amber-500">{auditResults.stats.mismatched_count}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Integrity Overview Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`p-6 rounded-2xl border backdrop-blur-sm shadow-xl transition-all ${
                        integrity.is_healthy 
                        ? 'bg-white dark:bg-cyber-surface/30 border-slate-200 dark:border-cyber-border/50' 
                        : 'bg-rose-500/5 border-rose-500/20 shadow-rose-500/5'
                    }`}>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fragment Health</p>
                            <Activity className={`size-5 ${integrity.is_healthy ? 'text-emerald-500' : 'text-rose-500'}`} />
                        </div>
                        <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {integrity.total_stego_files - integrity.orphaned_count}
                            <span className="text-sm font-bold text-slate-400 ml-2">/ {integrity.total_stego_files} Healthy Files</span>
                        </h4>
                        <div className="mt-4 h-2 w-full bg-slate-100 dark:bg-cyber-void rounded-full overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-1000 ${integrity.is_healthy ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                style={{ width: `${((integrity.total_stego_files - integrity.orphaned_count) / Math.max(1, integrity.total_stego_files)) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className={`p-6 rounded-2xl border backdrop-blur-sm shadow-xl transition-all ${
                        integrity.orphaned_count === 0 
                        ? 'bg-white dark:bg-cyber-surface/30 border-slate-200 dark:border-cyber-border/50' 
                        : 'bg-amber-500/5 border-amber-500/20 shadow-amber-500/5'
                    }`}>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Orphaned Records</p>
                            <FileWarning className={`size-5 ${integrity.orphaned_count === 0 ? 'text-slate-300' : 'text-amber-500'}`} />
                        </div>
                        <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {integrity.orphaned_count}
                            <span className="text-sm font-bold text-slate-400 ml-2">Dead references</span>
                        </h4>
                        <p className="mt-2 text-[10px] font-bold text-slate-500 italic">
                            * Records pointing to non-existent B2 files
                        </p>
                    </div>

                    <div className={`p-6 rounded-2xl border backdrop-blur-sm shadow-xl transition-all ${
                        integrity.zombie_documents.length === 0 
                        ? 'bg-white dark:bg-cyber-surface/30 border-slate-200 dark:border-cyber-border/50' 
                        : 'bg-rose-900/10 border-rose-500/40 shadow-rose-500/10'
                    }`}>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zombie Documents</p>
                            <Skull className={`size-5 ${integrity.zombie_documents.length === 0 ? 'text-slate-300' : 'text-rose-500 animate-bounce'}`} />
                        </div>
                        <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {integrity.zombie_documents.length}
                            <span className="text-sm font-bold text-slate-400 ml-2">Unrecoverable</span>
                        </h4>
                        <p className="mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            Missing critical fragments
                        </p>
                    </div>
                </div>

                {/* Zombie Document List (Conditional) */}
                {integrity.zombie_documents.length > 0 && (
                    <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl animate-in fade-in slide-in-from-bottom duration-700">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Skull className="size-5 text-rose-500" />
                            Critical Integrity Issues: Unrecoverable Documents
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {integrity.zombie_documents.map(doc => (
                                <div key={doc.document_id || doc.id} className="p-4 bg-white dark:bg-cyber-surface/50 border border-rose-200 dark:border-rose-500/20 rounded-xl shadow-sm">
                                    <p className="text-sm font-black text-slate-900 dark:text-white truncate mb-2">{doc.filename}</p>
                                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                                        <span className="flex items-center gap-1"><User className="size-3" /> {doc.user.name}</span>
                                        <span className="flex items-center gap-1"><Calendar className="size-3" /> {new Date(doc.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Table Breakdown */}
                    <div className="lg:col-span-2 bg-white dark:bg-cyber-surface/30 rounded-2xl border border-slate-200 dark:border-cyber-border/50 backdrop-blur-sm shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-cyber-border/30 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Table className="size-5 text-orange-500" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Relational Architecture</h3>
                            </div>
                            <button 
                                onClick={() => window.location.reload()}
                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-cyber-void transition-colors text-slate-500"
                            >
                                <RefreshCw className="size-4" />
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-cyber-void/10 border-b border-slate-100 dark:border-cyber-border/30">
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Table</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Engine</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Rows</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total Size</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-cyber-border/10">
                                    {tables.map(table => (
                                        <tr key={table.name} className="hover:bg-slate-50/50 dark:hover:bg-cyber-surface/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-lg bg-slate-100 dark:bg-cyber-void border border-slate-200 dark:border-cyber-border/50 flex items-center justify-center text-slate-500">
                                                        <DbIcon className="size-4" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{table.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-cyber-void text-[10px] font-black text-slate-500 uppercase tracking-wider">
                                                    {table.engine}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                    {table.rows.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-xs font-black text-orange-500">
                                                    {formatBytes(table.size_bytes)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* DB Info Card */}
                    <div className="space-y-6">
                        <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-700">
                                <Cpu className="size-32" />
                            </div>
                            
                            <div className="relative z-10 space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-orange-400">Database Engine</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">MySQL Instance</p>
                                        <p className="text-lg font-black tracking-tight font-mono">{database.version}</p>
                                    </div>
                                    <div className="h-px bg-white/10" />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Database Name</p>
                                            <p className="text-sm font-bold truncate max-w-[120px]">{database.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Weight</p>
                                            <p className="text-sm font-bold text-orange-400">{formatBytes(database.size_bytes)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white dark:bg-cyber-surface/30 rounded-2xl border border-slate-200 dark:border-cyber-border/50 backdrop-blur-sm">
                            <h4 className="text-sm font-black text-slate-900 dark:text-white mb-4">Integrity Guidance</h4>
                            <div className="space-y-4">
                                <GuidelineItem text="Fragment redundancy: Each fragment must exist in B2 locked/ prefix." />
                                <GuidelineItem text="Decryption Safety: Zombie documents cannot be decrypted." />
                                <GuidelineItem text="Referential Audit: Automated check for dead cloud links." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function GuidelineItem({ text }) {
    return (
        <div className="flex gap-2 text-xs text-slate-500">
            <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
            <span>{text}</span>
        </div>
    );
}
