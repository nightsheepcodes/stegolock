    import AdminLayout from '@/Layouts/Admin/AdminLayout';
    import { Head } from '@inertiajs/react';
    import { useState, useMemo, useEffect, useRef } from 'react';
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
        Loader2,
        ChevronUp,
        ChevronDown,
        Filter,
        X,
        Pin,
        GripVertical,
        Eye,
        EyeOff
    } from 'lucide-react';

export default function DatabasePage({ database, tables, integrity }) {
    const [auditLoading, setAuditLoading] = useState(false);
    const [purgeLoading, setPurgeLoading] = useState(false);
    const [auditResults, setAuditResults] = useState(null);
    const [showGuidance, setShowGuidance] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [tableData, setTableData] = useState({ columns: [], data: [], loading: false });
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [filterCategory, setFilterCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchTableData = async (tableName) => {
        setSelectedTable(tableName);
        setTableData({ columns: [], data: [], loading: true });
        try {
            const response = await axios.get(route('admin.database.table-data', tableName));
            setTableData({
                columns: response.data.columns,
                data: response.data.data,
                loading: false
            });
        } catch (error) {
            console.error("Failed to fetch table data", error);
            setTableData({ columns: [], data: [], loading: false });
            alert("Failed to load table data. Check console for details.");
        }
    };

    const categories = ['All', ...new Set(tables.map(t => t.category))];

    const filteredAndSortedTables = useMemo(() => {
        let result = tables;

        if (filterCategory !== 'All') {
            result = result.filter(t => t.category === filterCategory);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t => t.name.toLowerCase().includes(query) || t.description.toLowerCase().includes(query));
        }

        return [...result].sort((a, b) => {
            let aVal = a[sortConfig.key];
            let bVal = b[sortConfig.key];
            
            // Handle nulls for last_updated
            if (aVal === null) aVal = '';
            if (bVal === null) bVal = '';

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [tables, sortConfig, filterCategory, searchQuery]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

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
                    {/* DB Info Card (Now on Left, takes 1 column) */}
                    <div className="space-y-6 lg:col-span-1">
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
                    </div>

                    {/* Table Breakdown (Now on Right, takes 2 columns) */}
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

                        {/* Filters & Search */}
                        <div className="p-4 border-b border-slate-100 dark:border-cyber-border/30 bg-slate-50/50 dark:bg-cyber-void/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search tables..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-white dark:bg-cyber-surface/50 border border-slate-200 dark:border-cyber-border/50 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Filter className="size-4 text-slate-400" />
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="w-full sm:w-auto px-3 py-2 bg-white dark:bg-cyber-surface/50 border border-slate-200 dark:border-cyber-border/50 rounded-lg text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-cyber-void/10 border-b border-slate-100 dark:border-cyber-border/30">
                                        <SortableHeader label="Table" sortKey="name" sortConfig={sortConfig} requestSort={requestSort} align="left" />
                                        <SortableHeader label="Category" sortKey="category" sortConfig={sortConfig} requestSort={requestSort} align="center" />
                                        <SortableHeader label="Rows" sortKey="rows" sortConfig={sortConfig} requestSort={requestSort} align="center" />
                                        <SortableHeader label="Last Updated" sortKey="last_updated" sortConfig={sortConfig} requestSort={requestSort} align="right" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-cyber-border/10">
                                    {filteredAndSortedTables.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-slate-500 text-sm font-bold">
                                                No tables match your search or filter.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredAndSortedTables.map(table => (
                                            <tr 
                                                key={table.name} 
                                                onClick={() => fetchTableData(table.name)}
                                                className="hover:bg-slate-50/50 dark:hover:bg-cyber-surface/50 transition-colors group cursor-pointer"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8 rounded-lg bg-slate-100 dark:bg-cyber-void border border-slate-200 dark:border-cyber-border/50 flex items-center justify-center text-slate-500 shrink-0">
                                                            <DbIcon className="size-4" />
                                                        </div>
                                                        <div>
                                                            <span className="text-sm font-bold text-slate-900 dark:text-white block">{table.name}</span>
                                                            <span className="text-[10px] font-bold text-slate-400 block mt-0.5">{table.description}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-cyber-void text-[9px] font-black text-slate-500 uppercase tracking-wider">
                                                        {table.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                        {table.rows.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="text-[10px] font-bold text-slate-500">
                                                        {table.last_updated ? new Date(table.last_updated).toLocaleString() : 'N/A'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Integrity Guidance Button */}
            <div className="fixed bottom-6 right-6 z-50">
                {showGuidance && (
                    <>
                        <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setShowGuidance(false)}
                        />
                        <div className="absolute bottom-16 right-0 w-80 p-6 bg-white dark:bg-cyber-surface/90 rounded-2xl border border-slate-200 dark:border-cyber-border/50 backdrop-blur-md shadow-2xl shadow-slate-900/20 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <h4 className="text-sm font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <ShieldCheck className="size-4 text-indigo-500" />
                                Integrity Guidance
                            </h4>
                            <div className="space-y-4">
                                <GuidelineItem text="Fragment redundancy: Each fragment must exist in B2 locked/ prefix." />
                                <GuidelineItem text="Decryption Safety: Zombie documents cannot be decrypted." />
                                <GuidelineItem text="Referential Audit: Automated check for dead cloud links." />
                            </div>
                        </div>
                    </>
                )}
                
                <button 
                    onClick={() => setShowGuidance(!showGuidance)}
                    className={`p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                        showGuidance 
                        ? 'bg-slate-800 text-white shadow-slate-900/30 dark:bg-white dark:text-slate-900' 
                        : 'bg-indigo-500 text-white shadow-indigo-500/30'
                    }`}
                >
                    <ShieldCheck className="size-6" />
                </button>
            </div>

            <TableDataModal 
                isOpen={!!selectedTable} 
                onClose={() => setSelectedTable(null)} 
                tableName={selectedTable} 
                tableData={tableData} 
            />
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

function SortableHeader({ label, sortKey, sortConfig, requestSort, align }) {
    const isActive = sortConfig.key === sortKey;
    
    return (
        <th 
            className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-slate-100 dark:hover:bg-cyber-surface/50 transition-colors ${
                isActive ? 'text-indigo-500' : 'text-slate-400'
            }`}
            onClick={() => requestSort(sortKey)}
        >
            <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start'}`}>
                {label}
                <div className="flex flex-col">
                    <ChevronUp className={`size-2.5 -mb-0.5 ${isActive && sortConfig.direction === 'asc' ? 'text-indigo-500' : 'text-slate-300 dark:text-slate-600'}`} />
                    <ChevronDown className={`size-2.5 ${isActive && sortConfig.direction === 'desc' ? 'text-indigo-500' : 'text-slate-300 dark:text-slate-600'}`} />
                </div>
            </div>
        </th>
    );
}

function TableDataModal({ isOpen, onClose, tableName, tableData }) {
    if (!isOpen) return null;

    const [columnConfig, setColumnConfig] = useState({
        ordered: [],
        pinned: [],
        hidden: []
    });
    const [draggedCol, setDraggedCol] = useState(null);
    const [showColumnDropdown, setShowColumnDropdown] = useState(false);
    const headerRefs = useRef({});
    const [columnOffsets, setColumnOffsets] = useState({});
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [hiddenDetails, setHiddenDetails] = useState([]);

    useEffect(() => {
        if (isOpen && tableData.columns) {
            setColumnConfig({
                ordered: [...tableData.columns],
                pinned: [],
                hidden: []
            });
        }
    }, [isOpen, tableData.columns]);

    useEffect(() => {
        if (!isOpen) {
            setSelectedRecord(null);
            setHiddenDetails([]);
        }
    }, [isOpen]);

    useEffect(() => {
        const measure = () => {
            const offsets = {};
            let currentLeft = 0;
            columnConfig.ordered.forEach((col) => {
                const el = headerRefs.current[col];
                if (el) {
                    offsets[col] = currentLeft;
                    if (columnConfig.pinned.includes(col)) {
                        currentLeft += el.offsetWidth;
                    }
                }
            });
            setColumnOffsets(offsets);
        };

        const timer = setTimeout(measure, 100);
        window.addEventListener('resize', measure);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', measure);
        };
    }, [columnConfig, tableData.data, isOpen]);

    const handleReset = () => {
        if (tableData.columns) {
            setColumnConfig({
                ordered: [...tableData.columns],
                pinned: [],
                hidden: []
            });
            setHiddenDetails([]);
        }
    };

    const togglePin = (columnName) => {
        setColumnConfig(prev => {
            const isPinned = prev.pinned.includes(columnName);
            let nextPinned;
            if (isPinned) {
                nextPinned = prev.pinned.filter(c => c !== columnName);
            } else {
                nextPinned = [...prev.pinned, columnName];
            }
            
            // Reorder: pinned first, then unpinned (preserving relative order)
            const pinnedCols = prev.ordered.filter(c => nextPinned.includes(c));
            const unpinnedCols = prev.ordered.filter(c => !nextPinned.includes(c));
            
            return {
                ...prev,
                ordered: [...pinnedCols, ...unpinnedCols],
                pinned: nextPinned
            };
        });
    };

    const toggleVisibility = (columnName) => {
        setColumnConfig(prev => {
            const isHidden = prev.hidden.includes(columnName);
            let nextHidden;
            if (isHidden) {
                nextHidden = prev.hidden.filter(c => c !== columnName);
            } else {
                nextHidden = [...prev.hidden, columnName];
            }
            return {
                ...prev,
                hidden: nextHidden
            };
        });
    };

    const handleDragStart = (e, columnName) => {
        setDraggedCol(columnName);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, columnName) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetColumnName) => {
        e.preventDefault();
        if (!draggedCol || draggedCol === targetColumnName) return;
        
        setColumnConfig(prev => {
            const dragIndex = prev.ordered.indexOf(draggedCol);
            const dropIndex = prev.ordered.indexOf(targetColumnName);
            
            if (dragIndex === -1 || dropIndex === -1) return prev;
            
            const newOrdered = [...prev.ordered];
            newOrdered.splice(dragIndex, 1);
            newOrdered.splice(dropIndex, 0, draggedCol);
            
            const targetIsPinned = prev.pinned.includes(targetColumnName);
            const dragIsPinned = prev.pinned.includes(draggedCol);
            
            let newPinned = [...prev.pinned];
            if (targetIsPinned && !dragIsPinned) {
                newPinned.push(draggedCol);
            } else if (!targetIsPinned && dragIsPinned) {
                newPinned = newPinned.filter(c => c !== draggedCol);
            }
            
            // Group all pinned columns at the start
            const pinnedCols = newOrdered.filter(c => newPinned.includes(c));
            const unpinnedCols = newOrdered.filter(c => !newPinned.includes(c));
            
            return {
                ...prev,
                ordered: [...pinnedCols, ...unpinnedCols],
                pinned: newPinned
            };
        });
        
        setDraggedCol(null);
    };

    const handleDragEnd = () => {
        setDraggedCol(null);
    };

    const visibleColumns = columnConfig.ordered.filter(col => !columnConfig.hidden.includes(col));
    const hasLayoutChanges = columnConfig.pinned.length > 0 || 
                             columnConfig.hidden.length > 0 || 
                             hiddenDetails.length > 0 ||
                             JSON.stringify(columnConfig.ordered) !== JSON.stringify(tableData.columns);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
            
            <div className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-cyber-surface rounded-2xl shadow-2xl border border-slate-200 dark:border-cyber-border overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 dark:border-cyber-border/30 flex items-center justify-between bg-slate-50/50 dark:bg-cyber-void/10">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                            <DbIcon className="size-6 text-indigo-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                Table Inspector: <span className="text-indigo-500">{tableName}</span>
                            </h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                                Previewing up to 100 most recent records &bull; Drag headers to reorder &bull; Click pin to freeze
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <button
                                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                                className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-cyber-border hover:bg-slate-50 dark:hover:bg-cyber-void text-slate-700 dark:text-slate-300 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                            >
                                <Eye className="size-4 text-indigo-500" />
                                <span>Columns ({visibleColumns.length})</span>
                            </button>
                            
                            {showColumnDropdown && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowColumnDropdown(false)} />
                                    <div className="absolute right-0 top-10 w-56 bg-white dark:bg-[#151f32] border border-slate-200 dark:border-cyber-border rounded-xl shadow-xl p-3 z-50 max-h-[300px] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-150">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1">
                                            Toggle Columns
                                        </div>
                                        <div className="space-y-1">
                                            {columnConfig.ordered.map(col => {
                                                const isHidden = columnConfig.hidden.includes(col);
                                                return (
                                                    <label 
                                                        key={col} 
                                                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-50/50 dark:hover:bg-white/5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                                                    >
                                                        <input 
                                                            type="checkbox"
                                                            checked={!isHidden}
                                                            onChange={() => toggleVisibility(col)}
                                                            className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-cyber-border dark:bg-cyber-void"
                                                        />
                                                        <span className="truncate">{col}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-slate-200 dark:hover:bg-cyber-void rounded-lg text-slate-400 transition-colors"
                        >
                            <X className="size-6" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-0 custom-scrollbar">
                    {tableData.loading ? (
                        <div className="h-64 flex flex-col items-center justify-center">
                            <Loader2 className="size-10 text-indigo-500 animate-spin mb-4" />
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Querying database...</p>
                        </div>
                    ) : tableData.data.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                            <Server className="size-12 opacity-20 mb-4" />
                            <p className="text-sm font-bold uppercase tracking-widest">Table is empty</p>
                        </div>
                    ) : (
                        <div className="min-w-full inline-block align-middle">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 bg-slate-50 dark:bg-cyber-void z-10 border-b border-slate-200 dark:border-cyber-border/50 shadow-sm">
                                    <tr>
                                        {visibleColumns.map((col, index) => {
                                            const isPinned = columnConfig.pinned.includes(col);
                                            const isLastPinned = isPinned && columnConfig.pinned.indexOf(col) === columnConfig.pinned.length - 1;
                                            const leftOffset = columnOffsets[col] ?? 0;
                                            const stickyStyle = isPinned ? {
                                                position: 'sticky',
                                                left: `${leftOffset}px`,
                                                zIndex: 30
                                            } : {};

                                            return (
                                                <th 
                                                    key={col} 
                                                    ref={el => { headerRefs.current[col] = el; }}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, col)}
                                                    onDragOver={(e) => handleDragOver(e, col)}
                                                    onDrop={(e) => handleDrop(e, col)}
                                                    onDragEnd={handleDragEnd}
                                                    style={stickyStyle}
                                                    className={`px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest last:border-0 cursor-grab active:cursor-grabbing select-none relative group transition-colors duration-200 ${
                                                        isPinned 
                                                        ? 'bg-slate-100 dark:bg-cyber-surface/90 text-indigo-600 dark:text-indigo-400 font-bold' 
                                                        : 'bg-slate-50 dark:bg-cyber-void hover:bg-slate-100 dark:hover:bg-cyber-surface/50'
                                                    } ${draggedCol === col ? 'opacity-40 border-2 border-dashed border-indigo-400' : ''} ${
                                                        isLastPinned 
                                                        ? 'border-r-2 border-r-indigo-500/30 dark:border-r-indigo-500/50' 
                                                        : 'border-r border-slate-100 dark:border-cyber-border/10'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="flex items-center gap-1.5 min-w-0">
                                                            <GripVertical className="size-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab shrink-0" />
                                                            <span className="truncate" title={col}>{col}</span>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                togglePin(col);
                                                            }}
                                                            className={`p-1 rounded-md hover:bg-slate-200 dark:hover:bg-cyber-void transition-colors shrink-0 ${
                                                                isPinned ? 'text-indigo-500' : 'text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100'
                                                            }`}
                                                            title={isPinned ? "Unpin column" : "Pin column"}
                                                        >
                                                            <Pin className="size-3" />
                                                        </button>
                                                    </div>
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-cyber-border/10">
                                    {tableData.data.map((row, idx) => (
                                        <tr 
                                            key={idx} 
                                            onClick={() => setSelectedRecord(row)}
                                            className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                                        >
                                            {visibleColumns.map(col => {
                                                const isPinned = columnConfig.pinned.includes(col);
                                                const isLastPinned = isPinned && columnConfig.pinned.indexOf(col) === columnConfig.pinned.length - 1;
                                                const leftOffset = columnOffsets[col] ?? 0;
                                                const stickyStyle = isPinned ? {
                                                    position: 'sticky',
                                                    left: `${leftOffset}px`,
                                                    zIndex: 20
                                                } : {};

                                                return (
                                                    <td 
                                                        key={col} 
                                                        style={stickyStyle}
                                                        className={`px-6 py-4 text-xs font-mono text-slate-600 dark:text-slate-400 last:border-0 whitespace-nowrap overflow-hidden text-ellipsis max-w-[250px] transition-colors ${
                                                            isPinned 
                                                            ? 'bg-slate-50 dark:bg-[#1b253c] font-semibold z-20 group-hover:bg-slate-100 dark:group-hover:bg-[#222e4a]' 
                                                            : 'group-hover:bg-slate-50/50 dark:group-hover:bg-white/5'
                                                        } ${
                                                            isLastPinned 
                                                            ? 'border-r-2 border-r-indigo-500/20 dark:border-r-indigo-500/30' 
                                                            : 'border-r border-slate-100 dark:border-cyber-border/10'
                                                        }`}
                                                        title={row[col] !== null ? String(row[col]) : ''}
                                                    >
                                                        {row[col] === null ? (
                                                            <span className="text-rose-400 italic bg-rose-400/5 px-1.5 py-0.5 rounded">null</span>
                                                        ) : (
                                                            String(row[col])
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                
                <div className="p-4 border-t border-slate-100 dark:border-cyber-border/30 bg-slate-50/50 dark:bg-cyber-void/10 flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Total rows in preview: {tableData.data.length}
                    </p>
                    <div className="flex gap-3">
                        {hasLayoutChanges && (
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 border border-slate-200 dark:border-cyber-border hover:bg-slate-50 dark:hover:bg-cyber-void text-slate-700 dark:text-slate-300 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                            >
                                Reset Layout
                            </button>
                        )}
                        <button 
                            onClick={onClose}
                            className="px-6 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                        >
                            Close Inspector
                        </button>
                    </div>
                </div>
            </div>

            <RecordDetailsModal 
                isOpen={!!selectedRecord} 
                onClose={() => setSelectedRecord(null)} 
                record={selectedRecord} 
                tableName={tableName} 
                columns={tableData.columns} 
                hiddenDetails={hiddenDetails} 
                setHiddenDetails={setHiddenDetails} 
            />
        </div>
    );
}

function RecordDetailsModal({ isOpen, onClose, record, tableName, columns, hiddenDetails, setHiddenDetails }) {
    if (!isOpen || !record) return null;

    const [showFieldsDropdown, setShowFieldsDropdown] = useState(false);

    const toggleFieldVisibility = (col) => {
        setHiddenDetails(prev => {
            if (prev.includes(col)) {
                return prev.filter(c => c !== col);
            } else {
                return [...prev, col];
            }
        });
    };

    const handleResetDetails = () => {
        setHiddenDetails([]);
    };

    const visibleFields = columns.filter(col => !hiddenDetails.includes(col));

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" onClick={onClose} />
            
            <div className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-[#0e1626] rounded-2xl shadow-2xl border border-slate-200 dark:border-cyber-border overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 z-[120]">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-cyber-border/30 flex items-center justify-between bg-slate-50/50 dark:bg-cyber-void/10">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                            <Info className="size-6 text-orange-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                Record Details &bull; <span className="text-orange-500">{tableName}</span>
                            </h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                                Single Record View &bull; Hover cards to hide details
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {/* Fields Toggle Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowFieldsDropdown(!showFieldsDropdown)}
                                className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-cyber-border hover:bg-slate-50 dark:hover:bg-cyber-void text-slate-700 dark:text-slate-300 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                            >
                                <Eye className="size-4 text-orange-500" />
                                <span>Fields ({visibleFields.length})</span>
                            </button>
                            
                            {showFieldsDropdown && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowFieldsDropdown(false)} />
                                    <div className="absolute right-0 top-10 w-56 bg-white dark:bg-[#151f32] border border-slate-200 dark:border-cyber-border rounded-xl shadow-xl p-3 z-50 max-h-[300px] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-150">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1">
                                            Toggle Fields
                                        </div>
                                        <div className="space-y-1">
                                            {columns.map(col => {
                                                const isHidden = hiddenDetails.includes(col);
                                                return (
                                                    <label 
                                                        key={col} 
                                                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-50/50 dark:hover:bg-white/5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                                                    >
                                                        <input 
                                                            type="checkbox"
                                                            checked={!isHidden}
                                                            onChange={() => toggleFieldVisibility(col)}
                                                            className="rounded text-orange-600 focus:ring-orange-500 border-slate-300 dark:border-cyber-border dark:bg-cyber-void"
                                                        />
                                                        <span className="truncate">{col}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-slate-200 dark:hover:bg-cyber-void rounded-lg text-slate-400 transition-colors"
                        >
                            <X className="size-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6 custom-scrollbar">
                    {visibleFields.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                            <EyeOff className="size-12 opacity-20 mb-4" />
                            <p className="text-sm font-bold uppercase tracking-widest">All fields are hidden</p>
                            <button
                                onClick={handleResetDetails}
                                className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg"
                            >
                                Reset Details View
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {visibleFields.map(col => {
                                const val = record[col];
                                const isNull = val === null;

                                return (
                                    <div 
                                        key={col}
                                        className="p-4 bg-slate-50 dark:bg-cyber-surface/50 border border-slate-200/60 dark:border-cyber-border/40 rounded-xl relative group flex flex-col justify-between hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between gap-4 mb-2">
                                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate" title={col}>
                                                {col}
                                            </span>
                                            
                                            <button
                                                onClick={() => toggleFieldVisibility(col)}
                                                className="p-1 rounded bg-slate-200 dark:bg-cyber-void hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                                                title="Hide field"
                                            >
                                                <EyeOff className="size-3" />
                                            </button>
                                        </div>

                                        <div className="text-sm font-mono break-all text-slate-800 dark:text-slate-200 font-medium">
                                            {isNull ? (
                                                <span className="text-rose-400 italic bg-rose-400/5 px-1.5 py-0.5 rounded">null</span>
                                            ) : (
                                                String(val)
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-100 dark:border-cyber-border/30 bg-slate-50/50 dark:bg-cyber-void/10 flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Showing {visibleFields.length} of {columns.length} fields
                    </p>
                    <div className="flex gap-3">
                        {hiddenDetails.length > 0 && (
                            <button
                                onClick={handleResetDetails}
                                className="px-4 py-2 border border-slate-200 dark:border-cyber-border hover:bg-slate-50 dark:hover:bg-cyber-void text-slate-700 dark:text-slate-300 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                            >
                                Reset Details View
                            </button>
                        )}
                        <button 
                            onClick={onClose}
                            className="px-6 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
