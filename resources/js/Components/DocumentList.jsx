import { MoreVertical, Shield, Loader2, Star, Unlock, FolderInput, Info, Trash2, Pencil, FileText, Users, AlertCircle } from 'lucide-react';
import { formatBytes, formatDate, getFileColor, getFileIcon } from '@/Utils/fileUtils';

export function DocumentList({ 
    documents, 
    unlockingProgress = {}, 
    onUnlock, 
    onToggleStar, 
    onShare, 
    onFileInfo, 
    onDelete, 
    onMove, 
    onRename,
    openMenuId,
    setOpenMenuId,
    refs,
    strategy,
    x,
    y,
    menuRef
}) {
    return (
        <div className="bg-white dark:bg-cyber-void rounded-2xl shadow-sm border border-gray-100 dark:border-cyber-border/30 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                    <thead className="hidden sm:table-header-group bg-gray-50 dark:bg-cyber-surface/50 text-gray-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px] border-b border-gray-100 dark:border-cyber-border/30">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Size</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 hidden md:table-cell">Created</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-cyber-border/20">
                        {documents.map(doc => {
                            const Icon = getFileIcon(doc.file_type || '');
                            const colorClass = getFileColor(doc.file_type || '');
                            const isProcessing = unlockingProgress[doc.document_id] || !['stored', 'decrypted', 'retrieved', 'failed'].includes(doc.status);

                            return (
                                <tr 
                                    key={doc.document_id} 
                                    className={"transition-colors group border-b border-gray-100 dark:border-cyber-border/20 flex flex-col sm:table-row p-4 sm:p-0 relative " + (isProcessing ? "bg-indigo-50/50 dark:bg-cyber-accent/5 cursor-wait" : "hover:bg-gray-50/50 dark:hover:bg-cyber-surface/50 cursor-pointer")}
                                    onClick={() => !isProcessing && onFileInfo(doc)}
                                >
                                    <td className="px-0 sm:px-6 py-2 sm:py-4 block sm:table-cell">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className={`p-2 rounded-lg ${colorClass} transition-transform group-hover:scale-110`}>
                                                    <Icon className="size-5" />
                                                </div>
                                                {(doc.shares_count > 0 || doc.is_shared) && (
                                                    <div className="absolute -bottom-1 -right-1 bg-cyan-600 dark:bg-cyber-accent rounded-full p-0.5 shadow-sm border border-white dark:border-cyber-surface">
                                                        <Users className="size-2 text-white dark:text-cyber-void" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-slate-100 truncate max-w-[120px] sm:max-w-[200px]" title={doc.filename}>
                                                        {doc.filename}
                                                    </p>
                                                    {(doc.shares_count > 0 || doc.is_shared) && (
                                                        <span className="text-[10px] text-cyan-600 dark:text-cyber-accent font-bold bg-cyan-50 dark:bg-cyber-accent/10 px-1 rounded">SHARED</span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                                    {doc.file_type || 'File'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-0 sm:px-6 py-1 sm:py-4 block sm:table-cell text-gray-600 dark:text-slate-400 font-medium">
                                        {formatBytes(doc.in_cloud_size || doc.original_size)}
                                    </td>
                                    <td className="px-0 sm:px-6 py-1 sm:py-4 block sm:table-cell">
                                        {isProcessing ? (
                                            <div className="flex items-center gap-2 text-indigo-600">
                                                <Loader2 className="size-4 animate-spin" />
                                                <span className="text-[10px] sm:text-xs font-bold animate-pulse uppercase tracking-wider">
                                                    {(() => {
                                                        if (unlockingProgress[doc.document_id]) {
                                                            const elapsed = Date.now() - unlockingProgress[doc.document_id];
                                                            if (elapsed < 2000) return 'Fetching...';
                                                            if (elapsed < 4000) return 'Extracting...';
                                                            if (elapsed < 6000) return 'Restoring...';
                                                            return 'Decrypting...';
                                                        }
                                                        return doc.status.replace('_', ' ');
                                                    })()}
                                                </span>
                                            </div>
                                        ) : doc.status === 'failed' ? (
                                            <div className="flex items-center gap-1.5">
                                                <AlertCircle className="size-4 text-red-500" />
                                                <span className="text-[10px] sm:text-xs font-bold text-red-600 uppercase">Error</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5">
                                                <Shield className="size-4 text-green-500" />
                                                <span className="text-[10px] sm:text-xs font-bold text-green-600 uppercase">Locked</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-slate-500 font-medium hidden md:table-cell">
                                        {formatDate(doc.created_at)}
                                    </td>
                                    <td className="px-0 sm:px-6 py-2 sm:py-4 block sm:table-cell sm:text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onToggleStar(doc.document_id);
                                                }}
                                                className={`p-2 rounded-lg transition-colors ${doc.is_starred ? 'text-yellow-400 bg-yellow-50 dark:bg-yellow-400/10 shadow-glow-yellow' : 'text-gray-400 dark:text-slate-600 hover:bg-gray-100 dark:hover:bg-cyber-border/50'}`}
                                            >
                                                <Star className={`size-4 ${doc.is_starred ? 'fill-current' : ''}`} />
                                            </button>
                                            <div className="relative">
                                                <button
                                                    ref={(node) => openMenuId === doc.document_id && refs.setReference(node)}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenMenuId(openMenuId === doc.document_id ? null : doc.document_id);
                                                    }}
                                                    className={`p-2 rounded-lg transition-colors ${openMenuId === doc.document_id ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-slate-600 hover:bg-gray-100 dark:hover:bg-cyber-border/50'}`}
                                                >
                                                    <MoreVertical className="size-4" />
                                                </button>
                                                {openMenuId === doc.document_id && (
                                                    <div
                                                        ref={(node) => { menuRef.current = node; refs.setFloating(node); }}
                                                        style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
                                                        className="w-48 bg-white dark:bg-cyber-surface border border-gray-100 dark:border-cyber-border/50 rounded-xl shadow-xl z-[60] overflow-hidden py-1 text-left"
                                                    >
                                                        <button onClick={() => onUnlock(doc.document_id)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
                                                            <Unlock className="size-4 text-gray-400 dark:text-slate-500" /> Unlock
                                                        </button>
                                                        <button onClick={() => onRename(doc)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
                                                            <Pencil className="size-4 text-gray-400 dark:text-slate-500" /> Rename
                                                        </button>
                                                        <button onClick={() => onMove(doc.document_id)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
                                                            <FolderInput className="size-4 text-gray-400 dark:text-slate-500" /> Move
                                                        </button>
                                                        <button onClick={() => onShare(doc)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
                                                            <Info className="size-4 text-gray-400 dark:text-slate-500" /> Share
                                                        </button>
                                                        <div className="h-px bg-gray-100 dark:bg-cyber-border/30 my-1" />
                                                        <button onClick={() => onDelete(doc.document_id)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-bold">
                                                            <Trash2 className="size-4" /> Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
