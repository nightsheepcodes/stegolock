import { Shield, Lock, Eye, Key, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';

export function SecurityPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All files secured with military-grade AES-256-GCM encryption.',
      status: 'Active',
    },
    {
      icon: Key,
      title: 'Zero-Knowledge Model',
      description: 'Your keys never leave your device in unencrypted form.',
      status: 'Active',
    },
    {
      icon: Shield,
      title: 'TLS 1.3 Transport',
      description: 'Quantum-resistant transport layer security for all transfers.',
      status: 'Active',
    },
    {
      icon: Eye,
      title: 'Invisible Storage',
      description: 'Files are fragmented and hidden using advanced steganography.',
      status: 'Active',
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-br from-cyber-accent to-indigo-600 text-white p-4 rounded-2xl shadow-lg shadow-cyan-500/30 hover:scale-110 transition-all hover:rotate-3 z-40 group"
        title="Security Center"
      >
        <Shield className="size-6 group-hover:drop-shadow-glow-cyan" />
        <div className="absolute -top-1 -right-1 size-3 bg-emerald-500 rounded-full border-2 border-white dark:border-cyber-void animate-pulse" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/40 dark:bg-cyber-void/80 backdrop-blur-sm z-[60] transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-4 right-4 w-full max-w-md bg-white dark:bg-cyber-surface border border-slate-200 dark:border-cyber-border rounded-[2.5rem] shadow-2xl z-[70] overflow-hidden flex flex-col animate-in slide-in-from-right duration-500">
            {/* Header */}
            <div className="relative p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-cyber-void text-white overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                    <Shield className="size-48" />
                </div>
                
                <div className="relative z-10 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-cyber-accent/20 rounded-2xl border border-cyber-accent/30 backdrop-blur-md">
                            <Shield className="size-8 text-cyber-accent shadow-glow-cyan" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Security Center</h2>
                            <p className="text-cyan-400/80 text-xs font-bold uppercase tracking-widest">Protocol Active</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <X className="size-6 text-slate-400 hover:text-white" />
                    </button>
                </div>

                <div className="mt-8 relative z-10 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="size-2 rounded-full bg-emerald-500 shadow-glow-emerald animate-pulse" />
                        <span className="text-sm font-black uppercase tracking-widest text-emerald-400">All Systems Nominal</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Continuous integrity monitoring active. All cryptographic pillars are verified and secured.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">Security Infrastructure</h3>
                <div className="space-y-4">
                    {securityFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div
                        key={index}
                        className="flex items-start gap-4 p-5 bg-slate-50 dark:bg-cyber-void/30 border border-slate-100 dark:border-cyber-border/30 rounded-2xl transition-all hover:border-cyber-accent/30 group"
                        >
                        <div className="p-3 bg-white dark:bg-cyber-surface rounded-xl shadow-sm border border-slate-100 dark:border-cyber-border/50 group-hover:scale-110 transition-transform">
                            <Icon className="size-5 text-indigo-500 dark:text-cyber-accent" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">{feature.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                            <div className="flex items-center gap-1.5 mt-3">
                                <div className="size-1.5 bg-emerald-500 rounded-full" />
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest">
                                    {feature.status}
                                </span>
                            </div>
                        </div>
                        </div>
                    );
                    })}
                </div>
              </div>

              {/* Best Practices */}
              <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                      <AlertTriangle className="size-12 text-indigo-500" />
                  </div>
                  <div className="relative z-10">
                      <h4 className="font-black text-indigo-500 dark:text-indigo-400 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                          <AlertTriangle className="size-4" />
                          Security Guidelines
                      </h4>
                      <ul className="space-y-3">
                          {[
                              'Never share account credentials',
                              'Use unique high-entropy passwords',
                              'Monitor file access notifications',
                              'Audit shared document lists regularly'
                          ].map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                                  <div className="mt-1.5 size-1 rounded-full bg-indigo-400" />
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>

              {/* Technical Spec Card */}
              <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute -bottom-8 -right-8 p-12 opacity-10 group-hover:scale-110 transition-transform">
                      <Lock className="size-24" />
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                    <Key className="size-4" />
                    Technical Specifications
                  </h4>
                  <div className="space-y-3 text-[11px] font-bold">
                    {[
                        { label: 'Algorithm', value: 'AES-256-GCM' },
                        { label: 'Entropy', value: '256-bit Key Length' },
                        { label: 'KDF', value: 'PBKDF2-SHA256' },
                        { label: 'Compliance', value: 'ISO/IEC 25010 Standard' }
                    ].map((spec, i) => (
                        <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-slate-500 uppercase tracking-tighter">{spec.label}</span>
                            <span className="text-cyan-400">{spec.value}</span>
                        </div>
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
