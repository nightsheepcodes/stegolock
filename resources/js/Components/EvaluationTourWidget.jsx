import { useState, useEffect } from 'react';
import { PlayCircle, Shield, Lock, CheckCircle2, ChevronRight, X, Unlock, Share2, Trash2, LogOut } from 'lucide-react';
import { router } from '@inertiajs/react';
import { ConfirmModal } from '@/Components/modals/ConfirmModal';

export function EvaluationTourWidget({ onExploreMore }) {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [showQuitModal, setShowQuitModal] = useState(false);

    useEffect(() => {
        // Check if evaluation mode is active
        const checkMode = () => {
            if (typeof window !== 'undefined') {
                const mode = localStorage.getItem('evaluation_mode') === 'true';
                const step = parseInt(localStorage.getItem('evaluation_step') || '0', 10);
                setIsActive(mode);
                setCurrentStep(step);
            }
        };

        checkMode();
        
        // Listen for storage changes if multiple tabs are open
        window.addEventListener('storage', checkMode);
        
        // Custom event for immediate updates within the same window
        window.addEventListener('eval-tour-updated', checkMode);
        
        return () => {
            window.removeEventListener('storage', checkMode);
            window.removeEventListener('eval-tour-updated', checkMode);
        };
    }, []);

    if (!isActive) return null;

    const steps = [
        {
            title: "Speed Test",
            icon: <Lock className="size-5 text-cyan-500" />,
            instruction: "Let's test the system's speed! Click 'New' on the left sidebar and select 'Upload and Lock a File'. Choose any sample document (txt, doc/docx, or pdf) to upload.",
            actionText: "I've Locked a File"
        },
        {
            title: "Double Duty",
            icon: <Lock className="size-5 text-cyan-500" />,
            instruction: "Can the system handle two things at once? While your first file is still locking, click 'New' and upload a second file right away!",
            actionText: "I've Locked Another"
        },
        {
            title: "The Magic Trick",
            icon: <Unlock className="size-5 text-emerald-500" />,
            instruction: "Once a file is locked, hover over its card, click the three dots (⋮), and select 'Unlock'. Wait a moment as StegoLock reconstructs your original file for you to download!",
            actionText: "I've Unlocked the File"
        },
        {
            title: "Sharing is Caring",
            icon: <Share2 className="size-5 text-indigo-500" />,
            instruction: "Let's test security. Click the three dots (⋮) on your other file and select 'Share'. Type in 'user@example.com' and share it. (You can check 'Shared With Me' later to see it!)",
            actionText: "I've Shared the File"
        },
        {
            title: "Clean Up",
            icon: <Trash2 className="size-5 text-rose-500" />,
            instruction: "Let's keep things tidy. Click the three dots (⋮) on your file and select 'Delete' to permanently remove it from your StegoVault (your StegoLock cloud storage).",
            actionText: "I've Deleted the File"
        },
        {
            title: "See You Later",
            icon: <LogOut className="size-5 text-amber-500" />,
            instruction: "Finally, let's test the login system. Open your profile menu (top right) and 'Log Out'. Then, log right back in. (This guide will be waiting for you when you return!)",
            actionText: "I've Logged Back In"
        },
        {
            title: "Tour Complete!",
            icon: <CheckCircle2 className="size-5 text-green-500" />,
            instruction: "Awesome job! You've just tested all of StegoLock's main features. Feel free to explore more, or proceed to the survey when you're ready!",
            actionText: "Proceed to Survey"
        }
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            const next = currentStep + 1;
            localStorage.setItem('evaluation_step', next.toString());
            setCurrentStep(next);
            window.dispatchEvent(new Event('eval-tour-updated'));
        } else {
            // Finish Tour
            localStorage.setItem('evaluation_mode', 'false');
            localStorage.removeItem('evaluation_step');
            setIsActive(false);
            window.dispatchEvent(new Event('eval-tour-updated'));
            window.location.href = '/survey';
        }
    };

    const handleEndTour = () => {
        setShowQuitModal(true);
    };

    const confirmQuitTour = () => {
        localStorage.setItem('evaluation_mode', 'false');
        localStorage.removeItem('evaluation_step');
        setIsActive(false);
        setShowQuitModal(false);
        window.dispatchEvent(new Event('eval-tour-updated'));
    };

    const handleExploreMore = () => {
        onExploreMore();
        localStorage.setItem('evaluation_mode', 'false');
        localStorage.removeItem('evaluation_step');
        setIsActive(false);
        window.dispatchEvent(new Event('eval-tour-updated'));
    };

    return (
        <>
            <ConfirmModal 
                show={showQuitModal}
                title="Exit Tour"
                message="Are you sure you want to exit the guided evaluation? You can restart it later from the Survey page."
                confirmText="Exit Tour"
                cancelText="Keep Touring"
                onConfirm={confirmQuitTour}
                onCancel={() => setShowQuitModal(false)}
                isDanger={true}
            />
            <div className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-6 sm:right-6 z-[200] w-auto sm:w-96 animate-in slide-in-from-bottom-8 sm:slide-in-from-right-8 duration-500 shadow-2xl">
            <div className="bg-white dark:bg-cyber-void border-2 border-indigo-500 dark:border-cyber-accent rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.2)] dark:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-cyber-accent dark:to-indigo-500 px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                        <PlayCircle className="size-4 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-widest">Evaluator Guide</span>
                    </div>
                    <button 
                        onClick={handleEndTour}
                        className="text-white/70 hover:text-white transition-colors"
                        title="Quit Tour"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800">
                    <div 
                        className="h-full bg-cyan-500 dark:bg-cyber-accent transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-slate-50 dark:bg-cyber-surface rounded-xl border border-slate-100 dark:border-cyber-border">
                            {steps[currentStep].icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                                Step {currentStep + 1} of {steps.length}
                            </p>
                            <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                                {steps[currentStep].title}
                            </h3>
                        </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">
                        {steps[currentStep].instruction}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                        {currentStep === steps.length - 1 && (
                            <button
                                onClick={handleExploreMore}
                                className="px-5 py-3 sm:py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-cyber-surface dark:hover:bg-cyber-border text-slate-600 dark:text-slate-300 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 text-center"
                            >
                                Explore More
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            className="flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 bg-slate-900 hover:bg-indigo-600 dark:bg-cyber-accent dark:hover:bg-cyan-400 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-slate-900/20 dark:shadow-cyan-500/30"
                        >
                            {steps[currentStep].actionText}
                            <ChevronRight className="size-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
