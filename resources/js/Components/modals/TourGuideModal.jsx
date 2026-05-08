import { useState, useEffect } from 'react';
import { X, Shield, Lock, FolderTree, Database, ChevronRight, ChevronLeft, Flag } from 'lucide-react';

export function TourGuideModal({ show, onClose, onExploreMore }) {
    const [currentStep, setCurrentStep] = useState(0);

    // Prevent rendering if not showing
    if (!show) return null;

    const steps = [
        {
            icon: <Shield className="size-12 text-indigo-500 dark:text-cyber-accent" />,
            title: "Welcome to StegoLock",
            description: "Your ultimate platform for steganographic file encryption. Let's take a quick 4-step tour to help you get started with securing your documents."
        },
        {
            icon: <Lock className="size-12 text-cyan-500 dark:text-cyan-400" />,
            title: "Lock Your Files",
            description: "To secure a document, click 'Upload and Lock a File' from the 'New' menu. StegoLock will hide your sensitive document inside cover media using an advanced cryptography and steganography hybrid."
        },
        {
            icon: <FolderTree className="size-12 text-emerald-500 dark:text-emerald-400" />,
            title: "Organize & Share",
            description: "Keep your workspace tidy by creating custom folders. Need to collaborate? Open any file's menu to securely share access with other registered users."
        },
        {
            icon: <Database className="size-12 text-amber-500 dark:text-amber-400" />,
            title: "Monitor Your Storage",
            description: "Keep an eye on your storage limit displayed at the bottom left of your sidebar. Your privacy is guaranteed—we only store encrypted fragments!"
        }
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        localStorage.setItem('stegolock_tour_completed', 'true');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 transition-all duration-300">
            <div 
                className="bg-white dark:bg-cyber-void rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col border-2 border-indigo-50 dark:border-cyber-border/50 animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Pattern */}
                <div className="h-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] bg-[length:20px_20px]" />
                    <button
                        onClick={handleComplete}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-10"
                        title="Close Guide"
                    >
                        <X className="size-4" />
                    </button>
                    
                    {/* Floating Icon Badge */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                        <div className="size-20 bg-white dark:bg-cyber-surface rounded-2xl shadow-xl flex items-center justify-center border-4 border-white dark:border-cyber-void rotate-3 hover:rotate-0 transition-transform duration-300">
                            {steps[currentStep].icon}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="pt-12 pb-8 px-8 text-center min-h-[220px] flex flex-col justify-center">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                        {steps[currentStep].title}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                        {steps[currentStep].description}
                    </p>
                </div>

                {/* Footer Controls */}
                <div className="p-6 bg-slate-50 dark:bg-cyber-surface/30 border-t border-slate-100 dark:border-cyber-border flex items-center justify-between">
                    <div className="flex gap-1.5 pl-2">
                        {steps.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    idx === currentStep 
                                        ? 'w-6 bg-indigo-600 dark:bg-cyber-accent' 
                                        : 'w-1.5 bg-slate-200 dark:bg-slate-700'
                                }`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onExploreMore}
                            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        >
                            Explore More
                        </button>
                        
                        {currentStep > 0 && (
                            <button
                                onClick={prevStep}
                                className="size-10 flex items-center justify-center rounded-xl bg-white dark:bg-cyber-void border border-slate-200 dark:border-cyber-border text-slate-600 dark:text-slate-400 shadow-sm hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-cyber-accent dark:hover:text-cyber-accent transition-all"
                            >
                                <ChevronLeft className="size-5" />
                            </button>
                        )}
                        
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 dark:from-cyber-accent dark:to-indigo-500 dark:hover:from-cyan-400 dark:hover:to-indigo-400 text-white shadow-lg shadow-indigo-500/30 transition-all font-bold text-xs uppercase tracking-widest"
                        >
                            {currentStep === steps.length - 1 ? (
                                <>Get Started <Flag className="size-3.5" /></>
                            ) : (
                                <>Next <ChevronRight className="size-4" /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
