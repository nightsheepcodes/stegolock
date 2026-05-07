import { LayoutGrid, List } from 'lucide-react';

export function ViewToggle({ view, onViewChange }) {
  return (
    <div className="flex bg-slate-100 dark:bg-cyber-surface/50 p-1 rounded-xl border border-slate-200 dark:border-cyber-border/50 transition-all shadow-inner">
      <button
        onClick={() => onViewChange('grid')}
        title="Grid View"
        className={`p-2 rounded-lg transition-all duration-300 ${
          view === 'grid'
            ? 'bg-white dark:bg-cyber-accent text-cyan-600 dark:text-cyber-void shadow-md shadow-cyan-500/20 dark:shadow-glow-cyan border border-slate-200 dark:border-transparent scale-105 z-10'
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
        }`}
      >
        <LayoutGrid className="size-5" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        title="List View"
        className={`p-2 rounded-lg transition-all duration-300 ${
          view === 'list'
            ? 'bg-white dark:bg-cyber-accent text-cyan-600 dark:text-cyber-void shadow-md shadow-cyan-500/20 dark:shadow-glow-cyan border border-slate-200 dark:border-transparent scale-105 z-10'
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
        }`}
      >
        <List className="size-5" />
      </button>
    </div>
  );
}
