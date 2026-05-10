import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, usePage, router, useForm } from '@inertiajs/react';
import { 
    Cloud, 
    HardDrive, 
    Users, 
    AlertCircle, 
    Search, 
    Settings,
    ChevronRight,
    ArrowUpRight,
    User,
    PieChart,
    Activity,
    Server,
    Shield,
    ImagePlus,
    Filter,
    ArrowDown,
    ArrowUp,
    Check,
    X
} from 'lucide-react';
import { useState } from 'react';

export default function CloudPage({ stats, users, cloudAccounts, transferStatus }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'storage_used', direction: 'desc' });
    const [editingUser, setEditingUser] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [editUnit, setEditUnit] = useState('GB');

    const formatBytes = (bytes, decimals = 2) => {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    };

    const startEditing = (user) => {
        setEditingUser(user.id);
        let val = user.storage_limit;
        let unit = 'MB';
        if (val >= 1024 * 1024 * 1024 * 1024) { val = val / (1024 * 1024 * 1024 * 1024); unit = 'TB'; }
        else if (val >= 1024 * 1024 * 1024) { val = val / (1024 * 1024 * 1024); unit = 'GB'; }
        else { val = val / (1024 * 1024); unit = 'MB'; }
        
        setEditValue(val.toFixed(2).replace(/\.00$/, ''));
        setEditUnit(unit);
    };

    const saveQuota = (user) => {
        if (editValue && !isNaN(editValue) && parseFloat(editValue) >= 0) {
            let multiplier = 1;
            if (editUnit === 'MB') multiplier = 1024 * 1024;
            if (editUnit === 'GB') multiplier = 1024 * 1024 * 1024;
            if (editUnit === 'TB') multiplier = 1024 * 1024 * 1024 * 1024;
            
            const bytes = parseFloat(editValue) * multiplier;
            router.patch(route('admin.users.update-quota', user.id), {
                storage_limit: Math.floor(bytes)
            }, {
                onSuccess: () => setEditingUser(null)
            });
        }
    };

    const isAdminRole = (role) => ['superadmin', 'user_admin', 'db_storage_admin'].includes(role);

    let processedUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterRole === 'admin') {
        processedUsers = processedUsers.filter(u => isAdminRole(u.role));
    } else if (filterRole === 'user') {
        processedUsers = processedUsers.filter(u => !isAdminRole(u.role));
    }

    processedUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const totalCalculated = stats.breakdown.covers_bytes + stats.breakdown.fragments_bytes + stats.breakdown.other_bytes;
    const getPct = (val) => totalCalculated > 0 ? (val / totalCalculated) * 100 : 0;

    // Account Form
    const accountForm = useForm({
        name: '',
        key_id: '',
        application_key: '',
        bucket_name: '',
    });

    // Transfer Form
    const transferForm = useForm({
        target_account_id: '',
    });

    const handleAddAccount = (e) => {
        e.preventDefault();
        accountForm.post(route('admin.cloud.accounts.store'), {
            onSuccess: () => accountForm.reset(),
        });
    };

    const handleDeleteAccount = (id) => {
        if (confirm('Are you sure you want to remove this cloud account?')) {
            router.delete(route('admin.cloud.accounts.destroy', id));
        }
    };

    const handleStartTransfer = (e) => {
        e.preventDefault();
        transferForm.post(route('admin.cloud.transfer.start'));
    };

    const handleStopTransfer = () => {
        if (confirm('Are you sure you want to FORCE STOP the transfer? This may leave partial files in the target bucket.')) {
            router.post(route('admin.cloud.transfer.stop'));
        }
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                            <Cloud className="size-6 text-cyan-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                                Cloud Infrastructure
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase mt-0.5">
                                Storage composition & B2 service health
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">B2 API: Operational</span>
                    </div>
                </div>
            }
        >
            <Head title="Cloud Management" />

            <div className="space-y-6">
                {/* Main Stats Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Storage Breakdown Card */}
                    <div className="lg:col-span-2 p-6 bg-white dark:bg-cyber-surface/30 rounded-2xl border border-slate-200 dark:border-cyber-border/50 backdrop-blur-sm shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                <PieChart className="size-4 text-cyan-500" />
                                Storage Composition
                            </h3>
                            <span className="text-xs font-bold text-slate-500">Total: {formatBytes(totalCalculated)}</span>
                        </div>

                        <div className="space-y-6">
                            <div className="h-10 w-full flex rounded-xl overflow-hidden border border-slate-100 dark:border-cyber-border/20 shadow-inner">
                                <div 
                                    className="h-full bg-cyan-500 shadow-[inset_0_0_10px_rgba(255,255,255,0.3)] transition-all hover:opacity-90" 
                                    style={{ width: `${getPct(stats.breakdown.covers_bytes)}%` }}
                                    title="Covers"
                                />
                                <div 
                                    className="h-full bg-indigo-500 shadow-[inset_0_0_10px_rgba(255,255,255,0.3)] transition-all hover:opacity-90" 
                                    style={{ width: `${getPct(stats.breakdown.fragments_bytes)}%` }}
                                    title="Fragments"
                                />
                                <div 
                                    className="h-full bg-slate-300 dark:bg-cyber-void transition-all hover:opacity-90" 
                                    style={{ width: `${getPct(stats.breakdown.other_bytes)}%` }}
                                    title="Overhead"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <BreakdownItem 
                                    label="Stego Covers" 
                                    value={formatBytes(stats.breakdown.covers_bytes)} 
                                    pct={getPct(stats.breakdown.covers_bytes)}
                                    color="bg-cyan-500"
                                    icon={ImagePlus}
                                />
                                <BreakdownItem 
                                    label="User Fragments" 
                                    value={formatBytes(stats.breakdown.fragments_bytes)} 
                                    pct={getPct(stats.breakdown.fragments_bytes)}
                                    color="bg-indigo-500"
                                    icon={Shield}
                                />
                                <BreakdownItem 
                                    label="System Overhead" 
                                    value={formatBytes(stats.breakdown.other_bytes)} 
                                    pct={getPct(stats.breakdown.other_bytes)}
                                    color="bg-slate-400"
                                    icon={Activity}
                                />
                            </div>
                        </div>
                    </div>

                    {/* B2 Details Card */}
                    <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-700">
                            <Cloud className="size-32" />
                        </div>
                        
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">Backblaze B2 Service</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Bucket Name</p>
                                    <p className="text-lg font-black tracking-tight font-mono">{stats.b2_bucket || 'stegolock-production'}</p>
                                </div>
                                <div className="h-px bg-white/10" />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Global Limit</p>
                                        <p className="text-sm font-bold">{formatBytes(stats.total_limit_bytes)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                                        <p className="text-sm font-bold text-emerald-400">Connected</p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => window.open('https://secure.backblaze.com/b2_bucket_mgmt.htm?bucketId=' + stats.b2_bucket, '_blank')}
                                className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                            >
                                Open B2 Console <ArrowUpRight className="size-3" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Cloud Account Management */}
                    <div className="p-6 bg-white dark:bg-cyber-surface/30 rounded-2xl border border-slate-200 dark:border-cyber-border/50 backdrop-blur-sm shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                <Server className="size-4 text-indigo-500" />
                                Cloud Account Management
                            </h3>
                        </div>

                        <form onSubmit={handleAddAccount} className="space-y-4 mb-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input 
                                    type="text" 
                                    placeholder="Account Name (e.g. Experimental)" 
                                    value={accountForm.data.name}
                                    onChange={e => accountForm.setData('name', e.target.value)}
                                    className="px-4 py-2 text-sm bg-slate-50 dark:bg-cyber-void/30 border border-slate-200 dark:border-cyber-border/50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white"
                                    required
                                />
                                <input 
                                    type="text" 
                                    placeholder="B2 Key ID" 
                                    value={accountForm.data.key_id}
                                    onChange={e => accountForm.setData('key_id', e.target.value)}
                                    className="px-4 py-2 text-sm bg-slate-50 dark:bg-cyber-void/30 border border-slate-200 dark:border-cyber-border/50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white"
                                    required
                                />
                                <input 
                                    type="password" 
                                    placeholder="B2 Application Key" 
                                    value={accountForm.data.application_key}
                                    onChange={e => accountForm.setData('application_key', e.target.value)}
                                    className="px-4 py-2 text-sm bg-slate-50 dark:bg-cyber-void/30 border border-slate-200 dark:border-cyber-border/50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white"
                                    required
                                />
                                <input 
                                    type="text" 
                                    placeholder="Bucket Name" 
                                    value={accountForm.data.bucket_name}
                                    onChange={e => accountForm.setData('bucket_name', e.target.value)}
                                    className="px-4 py-2 text-sm bg-slate-50 dark:bg-cyber-void/30 border border-slate-200 dark:border-cyber-border/50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={accountForm.processing}
                                className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-50"
                            >
                                Add Cloud Account
                            </button>
                        </form>

                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Configured Accounts</p>
                            {cloudAccounts.length === 0 ? (
                                <p className="text-xs text-slate-500 italic">No secondary accounts configured.</p>
                            ) : (
                                <div className="space-y-2">
                                    {cloudAccounts.map(account => (
                                        <div key={account.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-cyber-void/20 border border-slate-100 dark:border-cyber-border/20 rounded-xl">
                                            <div>
                                                <p className="text-xs font-bold text-slate-900 dark:text-white">{account.name}</p>
                                                <p className="text-[10px] text-slate-500">{account.bucket_name} ({account.key_id.substring(0, 8)}...)</p>
                                            </div>
                                            <button 
                                                onClick={() => handleDeleteAccount(account.id)}
                                                className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                            >
                                                <X className="size-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stego Transfer Station */}
                    <div className="p-6 bg-white dark:bg-cyber-surface/30 rounded-2xl border border-slate-200 dark:border-cyber-border/50 backdrop-blur-sm shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                <ArrowUpRight className="size-4 text-emerald-500" />
                                Stego Transfer Station
                            </h3>
                            {transferStatus.running && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                    <div className="size-1.5 bg-emerald-500 rounded-full animate-ping" />
                                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Active Process</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="p-4 bg-slate-50 dark:bg-cyber-void/30 border border-slate-100 dark:border-cyber-border/30 rounded-xl">
                                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                                    Move all stego fragments from the **Production** bucket to a target **Experimental** bucket. This uses `rclone copy` to ensure no data is deleted.
                                </p>
                                
                                <form onSubmit={handleStartTransfer} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Account</label>
                                        <select 
                                            value={transferForm.data.target_account_id}
                                            onChange={e => transferForm.setData('target_account_id', e.target.value)}
                                            className="w-full px-4 py-2.5 text-sm bg-white dark:bg-cyber-surface border border-slate-200 dark:border-cyber-border/50 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-900 dark:text-white"
                                            required
                                            disabled={transferStatus.running || cloudAccounts.length === 0}
                                        >
                                            <option value="">Select Target Account...</option>
                                            {cloudAccounts.map(acc => (
                                                <option key={acc.id} value={acc.id}>{acc.name} ({acc.bucket_name})</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={transferForm.processing || transferStatus.running || cloudAccounts.length === 0}
                                        className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                            transferStatus.running 
                                            ? 'bg-slate-100 dark:bg-cyber-void text-slate-400 cursor-not-allowed'
                                            : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                        }`}
                                    >
                                        {transferStatus.running ? 'Transfer in Progress...' : 'Start Stego Transfer'}
                                    </button>
                                </form>

                                {transferStatus.running && (
                                    <button 
                                        onClick={handleStopTransfer}
                                        className="w-full mt-4 py-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        Force Stop Process
                                    </button>
                                )}
                            </div>

                            {transferStatus.running && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transfer Status</p>
                                        <p className="text-[10px] text-slate-500">Started at {transferStatus.started_at}</p>
                                    </div>
                                    <div className="p-3 bg-slate-900 rounded-lg font-mono text-[10px] text-emerald-400/80 border border-emerald-500/20">
                                        $ rclone copy src:prod dest:experimental ...
                                        <br />
                                        Checking for updates... Process running in background.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* User Storage Table */}
                <div className="bg-white dark:bg-cyber-surface/30 rounded-2xl border border-slate-200 dark:border-cyber-border/50 backdrop-blur-sm overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <div className="p-6 border-b border-slate-100 dark:border-cyber-border/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Users className="size-5 text-cyan-500" />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">User Quota Management</h3>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                            <div className="relative group w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-cyber-void/30 border border-slate-200 dark:border-cyber-border/50 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Filter className="size-4 text-slate-400" />
                                <select
                                    value={filterRole}
                                    onChange={(e) => setFilterRole(e.target.value)}
                                    className="w-full sm:w-auto px-3 py-2 bg-white dark:bg-cyber-surface/50 border border-slate-200 dark:border-cyber-border/50 rounded-xl text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="admin">Admins Only</option>
                                    <option value="user">Standard Users</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="hidden sm:table-header-group bg-slate-50/50 dark:bg-cyber-void/10 border-b border-slate-100 dark:border-cyber-border/30">
                                <tr>
                                    <th onClick={() => handleSort('name')} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-100 dark:hover:bg-cyber-surface transition-colors resize-x overflow-hidden relative" style={{ minWidth: '200px' }}>
                                        <div className="flex items-center gap-1">User Identity {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ArrowUp className="size-3"/> : <ArrowDown className="size-3"/>)}</div>
                                    </th>
                                    <th onClick={() => handleSort('storage_used')} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-100 dark:hover:bg-cyber-surface transition-colors resize-x overflow-hidden relative" style={{ minWidth: '250px' }}>
                                        <div className="flex items-center gap-1">Storage Consumption {sortConfig.key === 'storage_used' && (sortConfig.direction === 'asc' ? <ArrowUp className="size-3"/> : <ArrowDown className="size-3"/>)}</div>
                                    </th>
                                    <th onClick={() => handleSort('storage_limit')} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-100 dark:hover:bg-cyber-surface transition-colors resize-x overflow-hidden relative" style={{ minWidth: '200px' }}>
                                        <div className="flex items-center gap-1">Limit {sortConfig.key === 'storage_limit' && (sortConfig.direction === 'asc' ? <ArrowUp className="size-3"/> : <ArrowDown className="size-3"/>)}</div>
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Settings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-cyber-border/10 flex flex-col sm:table-row-group">
                                {processedUsers.map(user => {
                                    const usagePct = user.storage_limit > 0 ? (user.storage_used / user.storage_limit) * 100 : 0;
                                    const isAdmin = isAdminRole(user.role);
                                    
                                    return (
                                        <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-cyber-surface/50 transition-colors group flex flex-col sm:table-row p-4 sm:p-0 relative border-b border-slate-100 dark:border-cyber-border/10">
                                            <td className="px-0 sm:px-6 py-2 sm:py-4 block sm:table-cell">
                                                <div className="flex items-center gap-3">
                                                    <div className={`size-10 rounded-xl border flex items-center justify-center ${isAdmin ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-slate-100 dark:bg-cyber-void border-slate-200 dark:border-cyber-border/50 text-slate-500 dark:text-slate-400'}`}>
                                                        {isAdmin ? <Shield className="size-5" /> : <User className="size-5" />}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                                                            {isAdmin && <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-600 border border-amber-500/20">Admin</span>}
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-0 sm:px-6 py-1 sm:py-4 block sm:table-cell">
                                                <div className="flex flex-col gap-1.5 w-full sm:min-w-[150px]">
                                                    <div className="flex items-center justify-between text-[10px] font-bold">
                                                        <span className="text-slate-500">{formatBytes(user.storage_used)}</span>
                                                        <span className={usagePct > 90 ? 'text-red-500' : 'text-cyan-500'}>
                                                            {Math.round(usagePct)}%
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-cyber-void rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full transition-all duration-1000 ${usagePct > 90 ? 'bg-red-500' : 'bg-cyan-500'}`}
                                                            style={{ width: `${Math.min(usagePct, 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-0 sm:px-6 py-1 sm:py-4 block sm:table-cell">
                                                {editingUser === user.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <input 
                                                            type="number" 
                                                            min="0"
                                                            step="0.01"
                                                            value={editValue} 
                                                            onChange={e => setEditValue(e.target.value)}
                                                            className="w-20 px-2 py-1 text-sm bg-white dark:bg-cyber-surface border border-slate-200 dark:border-cyber-border/50 rounded-lg outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                                                        />
                                                        <select 
                                                            value={editUnit} 
                                                            onChange={e => setEditUnit(e.target.value)}
                                                            className="px-2 py-1 text-sm bg-white dark:bg-cyber-surface border border-slate-200 dark:border-cyber-border/50 rounded-lg outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                                                        >
                                                            <option value="MB">MB</option>
                                                            <option value="GB">GB</option>
                                                            <option value="TB">TB</option>
                                                        </select>
                                                        <button onClick={() => saveQuota(user)} className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors" title="Save">
                                                            <Check className="size-4" />
                                                        </button>
                                                        <button onClick={() => setEditingUser(null)} className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors" title="Cancel">
                                                            <X className="size-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                        {formatBytes(user.storage_limit)}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-0 sm:px-6 py-2 sm:py-4 block sm:table-cell text-right absolute top-4 right-4 sm:relative sm:top-0 sm:right-0">
                                                {editingUser !== user.id && (
                                                    <button 
                                                        onClick={() => startEditing(user)}
                                                        className="p-2 rounded-lg bg-slate-100 dark:bg-cyber-void border border-slate-200 dark:border-cyber-border/50 text-slate-500 hover:text-cyan-500 hover:border-cyan-500/50 transition-all"
                                                        title="Update storage quota"
                                                    >
                                                        <Settings className="size-4" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function BreakdownItem({ label, value, pct, color, icon: Icon }) {
    return (
        <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-opacity-100 text-slate-900 dark:text-white`}>
                <Icon className="size-4" />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{value}</p>
                <p className="text-[10px] font-medium text-slate-400 mt-0.5">{Math.round(pct)}% of Total</p>
            </div>
        </div>
    );
}
