import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { X, History, FileText, User, Clock, CheckCircle2, Share2, Unlock, Trash2, ShieldCheck, Loader2, AlertCircle, Lock, Zap, Search, Activity, Gauge } from 'lucide-react';
import { formatDate, formatBytes } from '@/Utils/fileUtils';
import axios from 'axios';

export function FileInfoModal({ document: doc, onClose }) {
  const [activities, setActivities] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [activeTab, setActiveTab] = useState('activity'); // 'activity', 'performance'
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);

  const { auth } = usePage().props;
  const isOwner = auth.user.id === doc.user_id;
  const isShared = doc.shares_count > 0 || doc.is_shared;

  useEffect(() => {
    fetchActivity();
    fetchMetrics();
  }, [doc.document_id]);

  const fetchActivity = async () => {
    try {
      const response = await axios.get(`/documents/activity/${doc.document_id}`);
      setActivities(response.data);
    } catch (error) {
      console.error("Failed to fetch activity", error);
    } finally {
      if (activeTab === 'activity') setIsLoading(false);
    }
  };

  const fetchMetrics = async () => {
    try {
        const response = await axios.get(`/documents/metrics/${doc.document_id}`);
        setMetrics(response.data);
    } catch (error) {
        console.error("Failed to fetch metrics", error);
    } finally {
        if (activeTab === 'performance') setIsLoading(false);
    }
  };

  const runIntegrityScan = async () => {
    setIsVerifying(true);
    setVerifyResult(null);
    try {
        const response = await axios.post(`/documents/verify/${doc.document_id}`);
        setVerifyResult(response.data);
    } catch (error) {
        console.error("Integrity scan failed", error);
        setVerifyResult({ success: false, error: "System timeout or network error" });
    } finally {
        setIsVerifying(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'shared': return <Share2 className="size-4 text-indigo-600 dark:text-indigo-400" />;
      case 'accepted': return <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />;
      case 'unlocked': return <Unlock className="size-4 text-purple-600 dark:text-purple-400" />;
      case 'removed': return <Trash2 className="size-4 text-red-600 dark:text-red-400" />;
      case 'locking_started': return <Lock className="size-4 text-amber-600 dark:text-amber-400" />;
      case 'locking_completed': return <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />;
      case 'locking_failed': 
      case 'unlocking_failed': return <AlertCircle className="size-4 text-red-600 dark:text-red-400" />;
      case 'deleted': return <Trash2 className="size-4 text-slate-600 dark:text-slate-400" />;
      default: return <FileText className="size-4 text-slate-600 dark:text-slate-400" />;
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getActionText = (activity) => {
    const actor = activity.user.id === doc.user_id ? "You" : activity.user.name;
    const errorMsg = activity.metadata?.error ? (
        <span className="block text-[10px] text-red-500 dark:text-red-400 font-mono mt-2 bg-red-50 dark:bg-red-900/20 p-2 rounded-xl border border-red-100 dark:border-red-900/30">
            Error: {activity.metadata.error}
        </span>
    ) : null;

    switch (activity.action) {
      case 'shared': 
        return <>{actor} shared this file with <span className="font-black text-slate-900 dark:text-white">{activity.metadata?.recipient_email}</span></>;
      case 'accepted': 
        return <>{actor} accepted the share invitation</>;
      case 'unlocked': 
        return <>{actor} unlocked/decrypted the file</>;
      case 'removed': 
        return <>{actor} removed access for a recipient</>;
      case 'locking_started':
        return <>{actor} initiated file encryption & locking</>;
      case 'locking_completed':
        return <>File encryption & locking completed successfully</>;
      case 'locking_failed':
        return <>{actor} failed to lock file {errorMsg}</>;
      case 'unlocking_failed':
        return <>{actor} failed to unlock file {errorMsg}</>;
      case 'deleted':
        return <>{actor} deleted this file from the system</>;
      default: 
        return <>{actor} performed {activity.action}</>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div 
        className="bg-white dark:bg-cyber-void rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col max-h-[90vh] border border-slate-200 dark:border-cyber-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-indigo-600 dark:bg-cyber-accent/10 p-6 text-white dark:text-cyber-accent text-center relative border-b dark:border-cyber-border">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 dark:hover:bg-cyber-accent/20 rounded-full transition-colors z-10"
          >
            <X className="size-5" />
          </button>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 dark:bg-cyber-accent/20 rounded-full mb-4 shadow-inner">
            <History className="size-10 text-white dark:text-cyber-accent" />
          </div>
          <h2 className="text-xl font-bold dark:text-white uppercase tracking-tight">File History</h2>
          
          <div className="flex flex-col items-center mt-1">
              <p className="text-indigo-100 dark:text-slate-400 text-xs font-bold uppercase tracking-widest truncate px-6">
                  {doc.filename}
              </p>
              <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-black bg-white/20 dark:bg-cyber-accent/20 px-2 py-0.5 rounded text-white dark:text-cyber-accent uppercase tracking-tighter">
                      {formatBytes(doc.in_cloud_size || doc.original_size)}
                  </span>
                  {isShared && (
                      <span className="flex items-center gap-1 text-[10px] font-black bg-indigo-400 dark:bg-indigo-500/30 px-2 py-0.5 rounded text-white dark:text-indigo-400 uppercase tracking-tighter">
                          <Share2 className="size-2.5" />
                          Shared
                      </span>
                  )}
              </div>
          </div>
          
          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setActiveTab('activity')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'activity' 
                    ? 'bg-white text-indigo-600 dark:bg-cyber-accent dark:text-white shadow-lg' 
                    : 'text-indigo-100 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-cyber-accent/10'
                }`}
              >
                <div className="flex items-center gap-2">
                    <Activity className="size-3" />
                    Activity
                </div>
              </button>
              {isOwner && (
                <button
                  onClick={() => setActiveTab('performance')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === 'performance' 
                      ? 'bg-white text-indigo-600 dark:bg-cyber-accent dark:text-white shadow-lg' 
                      : 'text-indigo-100 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-cyber-accent/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                      <Gauge className="size-3" />
                      Performance
                  </div>
                </button>
              )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar min-h-[400px]">
            {activeTab === 'activity' || !isOwner ? (
                <>
                    {/* File Stats Summary */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-cyber-surface/50 rounded-2xl border border-slate-100 dark:border-cyber-border">
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Status</p>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
                                <p className="text-xs font-black text-slate-900 dark:text-white uppercase">{doc.status}</p>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-cyber-surface/50 rounded-2xl border border-slate-100 dark:border-cyber-border">
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Created</p>
                            <div className="flex items-center gap-2">
                                <Clock className="size-4 text-indigo-600 dark:text-indigo-400" />
                                <p className="text-xs font-black text-slate-900 dark:text-white">{formatDate(doc.created_at)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <History className="size-4 text-cyan-500" />
                            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Audit Logs</h3>
                        </div>
                        
                        {isLoading ? (
                            <div className="p-10 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                                <Loader2 className="size-10 animate-spin mb-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Retrieving logs...</span>
                            </div>
                        ) : activities.length > 0 ? (
                            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 dark:before:from-cyber-border before:via-slate-100 dark:before:via-cyber-surface before:to-transparent">
                                {activities.map((activity, index) => (
                                    <div key={activity.id} className="relative flex items-start gap-4 group">
                                        <div className="flex items-center justify-center size-10 rounded-xl bg-white dark:bg-cyber-void border border-slate-200 dark:border-cyber-border shadow-sm z-10 group-hover:border-cyan-500 dark:group-hover:border-cyber-accent transition-all">
                                            {getActionIcon(activity.action)}
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                                                {getActionText(activity)}
                                            </div>
                                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                                                {formatDateTime(activity.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-10 text-center border-2 border-dashed border-slate-100 dark:border-cyber-border rounded-2xl bg-slate-50/30 dark:bg-cyber-surface/10">
                                <div className="size-12 bg-white dark:bg-cyber-void rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-slate-100 dark:border-cyber-border">
                                    <History className="size-6 text-slate-200 dark:text-slate-700" />
                                </div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-widest">No history found</p>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Metrics List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Zap className="size-4 text-amber-500" />
                                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Process Performance</h3>
                            </div>
                            <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase">ms = milliseconds</span>
                        </div>

                        {metrics.length > 0 ? (
                            <div className="space-y-3">
                                {metrics.map((metric) => (
                                    <div key={metric.id} className="p-4 bg-slate-50 dark:bg-cyber-surface/30 rounded-2xl border border-slate-100 dark:border-cyber-border group hover:bg-white dark:hover:bg-cyber-surface transition-all">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-lg bg-white dark:bg-cyber-void flex items-center justify-center border border-slate-100 dark:border-cyber-border shadow-sm text-slate-400 dark:text-slate-500 group-hover:text-cyan-500 transition-colors">
                                                    <Activity className="size-4" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                                        {metric.step.replace(/_/g, ' ')}
                                                    </p>
                                                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500">
                                                        {formatDateTime(metric.started_at)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black text-cyan-600 dark:text-cyber-accent">
                                                    {metric.duration_ms >= 1000 
                                                        ? (metric.duration_ms / 1000).toFixed(2) + 's' 
                                                        : Math.round(metric.duration_ms) + 'ms'}
                                                </p>
                                                <p className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-tighter">
                                                    {metric.job_type} flow
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-10 text-center border-2 border-dashed border-slate-100 dark:border-cyber-border rounded-2xl bg-slate-50/30 dark:bg-cyber-surface/10">
                                <span className="text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-widest">No metrics recorded for this document</span>
                            </div>
                        )}
                    </div>

                    {/* Integrity Scan */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 border border-indigo-100 dark:border-cyber-border/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <ShieldCheck className="size-24" />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <ShieldCheck className="size-4 text-emerald-500" />
                                <h3 className="text-[10px] font-black text-indigo-900 dark:text-white uppercase tracking-widest">Storage Integrity</h3>
                            </div>
                            
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                                Verify all cloud fragments are present and haven't been modified. This check audits the <span className="font-bold text-indigo-600 dark:text-cyber-accent">fragment map</span> against real-time B2 cloud metadata.
                            </p>

                            {verifyResult ? (
                                <div className={`p-4 rounded-xl border mb-6 animate-in zoom-in-95 duration-300 ${
                                    verifyResult.status === 'healthy' 
                                        ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30' 
                                        : 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30'
                                }`}>
                                    <div className="flex items-center gap-3">
                                        {verifyResult.status === 'healthy' ? (
                                            <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                                        ) : (
                                            <AlertCircle className="size-5 text-red-600 dark:text-red-400" />
                                        )}
                                        <div>
                                            <p className={`text-xs font-black uppercase tracking-tight ${
                                                verifyResult.status === 'healthy' ? 'text-emerald-900 dark:text-emerald-400' : 'text-red-900 dark:text-red-400'
                                            }`}>
                                                {verifyResult.status === 'healthy' ? 'Integrity Verified' : 'Integrity Compromised'}
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                                {verifyResult.fragments_checked} fragments audited successfully
                                            </p>
                                        </div>
                                    </div>
                                    {verifyResult.issues?.length > 0 && (
                                        <div className="mt-3 space-y-1">
                                            {verifyResult.issues.map((issue, i) => (
                                                <p key={i} className="text-[9px] font-mono text-red-600 dark:text-red-400">• {issue}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : null}

                            <button
                                onClick={runIntegrityScan}
                                disabled={isVerifying}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-cyber-void border border-slate-200 dark:border-cyber-border hover:border-indigo-500 dark:hover:border-cyber-accent rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                {isVerifying ? (
                                    <>
                                        <Loader2 className="size-3 animate-spin" />
                                        Scanning Shards...
                                    </>
                                ) : (
                                    <>
                                        <Search className="size-3" />
                                        Run Integrity Scan
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 dark:bg-cyber-surface border-t border-slate-100 dark:border-cyber-border/50 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-cyber-border/30 rounded-xl transition-all"
            >
              Close
            </button>
        </div>
      </div>
    </div>
  );
}

