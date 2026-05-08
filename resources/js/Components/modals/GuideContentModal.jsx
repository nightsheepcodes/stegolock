import { X, Shield, Lock, Unlock, Share2, Trash2, LogOut, Info, AlertCircle, BarChart3, Users, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';

export function GuideContentModal({ show, onClose }) {
    if (!show) return null;

    const phases = [
        {
            title: "Phase 1: Onboarding & Access Control",
            metrics: "Security (SC), Usability (US)",
            icon: <Shield className="size-6 text-indigo-500" />,
            steps: [
                "Registration: Navigate to the registration page. Create a new account with a valid email and strong password.",
                "Authentication Check: Log out of the newly created account, and then log back in.",
                "Unauthorized Access Test: Copy the URL of the main dashboard. Log out, paste the URL back into the browser, and attempt to access it without being logged in."
            ],
            observations: [
                "How easy is it to create an account and log in? (US)",
                "Does the system effectively prevent unauthorized access to the dashboard? (SC)",
                "Do you feel the authentication mechanism is strong and trustworthy? (SC)"
            ]
        },
        {
            title: "Phase 2: Navigation & Interface Exploration",
            metrics: "Usability (US), Functional Sustainability (FS), Reliability (RE)",
            icon: <Zap className="size-6 text-amber-500" />,
            steps: [
                "Dashboard Overview: Look around the main dashboard. Identify where your documents, profile settings, and shared files are located.",
                "Device Testing: Resize your browser window to simulate a tablet/mobile phone, or log in using your smartphone.",
                "Menu Traversal: Click through every main navigation link to see how the pages load."
            ],
            observations: [
                "Is the interface attractive, well-organized, and user-friendly? (US)",
                "Do all the navigation buttons work as expected? (FS)",
                "Does the app adapt well and remain usable on different screen sizes? (RE, US)"
            ]
        },
        {
            title: "Phase 3: Core Operation - Locking a Document",
            metrics: "Performance Efficiency (PE), Reliability (RE), Functional Sustainability (FS)",
            icon: <Lock className="size-6 text-cyan-500" />,
            steps: [
                "Upload Process: Select a sample file (txt, docx, or pdf) from your device.",
                "Locking Execution: Submit the file to be locked using StegoLock's steganographic process.",
                "Observation: Carefully watch the screen during the upload and locking process."
            ],
            observations: [
                "Does the application respond quickly when you click the 'Upload/Lock' button? (PE)",
                "Is there any noticeable lag, or does the app crash during this processing task? (RE, PE)",
                "Does the app provide adequate feedback (spinners, success messages)? (FS)"
            ]
        },
        {
            title: "Phase 4: Document Management & Sharing",
            metrics: "Security (SC), Functional Sustainability (FS), Performance Efficiency (PE)",
            icon: <Share2 className="size-6 text-emerald-500" />,
            steps: [
                "Viewing Data: Go to your document repository and click on a locked document to view its details.",
                "Sharing Process: Use the sharing feature to grant access to 'user@example.com'.",
                "Data Control: Verify that the sharing settings clearly indicate who has access."
            ],
            observations: [
                "Do you feel you have good control over your data and who can see it? (SC)",
                "Is the information provided about your documents comprehensive and adequate? (FS)",
                "Are there any delays when loading document details or executing share commands? (PE)"
            ]
        },
        {
            title: "Phase 5: Updating Information",
            metrics: "Performance Efficiency (PE), Usability (US)",
            icon: <Users className="size-6 text-rose-500" />,
            steps: [
                "Profile Editing: Navigate to the Profile or Account Settings page.",
                "Data Modification: Change your display name or a preference setting and save the changes."
            ],
            observations: [
                "How quickly does the app respond and confirm your profile was updated? (PE)",
                "Is the process of updating your data straightforward? (US)"
            ]
        }
    ];

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[250] flex items-center justify-center p-4">
            <div 
                className="bg-white dark:bg-cyber-void w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col border-2 border-slate-100 dark:border-cyber-border/50 overflow-hidden animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-8 py-6 bg-slate-50 dark:bg-cyber-surface/50 border-b border-slate-100 dark:border-cyber-border flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
                            <BarChart3 className="size-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Guided Evaluation Tour</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Full Methodology & Steps</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-3 hover:bg-slate-200 dark:hover:bg-cyber-border rounded-2xl transition-colors"
                    >
                        <X className="size-6 text-slate-500 dark:text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10">
                    <div className="space-y-12">
                        {/* Introduction */}
                        <div className="bg-indigo-50/50 dark:bg-indigo-500/5 p-6 sm:p-8 rounded-[2rem] border border-indigo-100/50 dark:border-indigo-500/10">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl mt-1">
                                    <Info className="size-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                                    This guided tour is designed to walk evaluators through the core features of the StegoLock application. By following these steps, you will interact with all the necessary components to accurately answer the evaluation survey based on ISO 25010 standards.
                                </p>
                            </div>
                        </div>

                        {/* Phases */}
                        <div className="space-y-10">
                            {phases.map((phase, idx) => (
                                <div key={idx} className="relative pl-8 sm:pl-12 border-l-2 border-slate-100 dark:border-cyber-border last:border-0 pb-2">
                                    {/* Number Badge */}
                                    <div className="absolute top-0 -left-[17px] sm:-left-[21px] size-8 sm:size-10 rounded-xl bg-white dark:bg-cyber-void border-2 border-slate-100 dark:border-cyber-border flex items-center justify-center text-xs sm:text-sm font-black text-slate-400">
                                        {idx + 1}
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-1">
                                                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">{phase.title}</h3>
                                                <div className="flex items-center gap-2 text-[10px] font-black text-cyber-accent uppercase tracking-widest">
                                                    <Zap className="size-3" />
                                                    {phase.metrics}
                                                </div>
                                            </div>
                                            <div className="p-2 bg-slate-50 dark:bg-cyber-surface rounded-xl border border-slate-100 dark:border-cyber-border">
                                                {phase.icon}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <ChevronRight className="size-3" />
                                                    Steps to follow
                                                </h4>
                                                <ul className="space-y-3">
                                                    {phase.steps.map((step, sIdx) => (
                                                        <li key={sIdx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                                            <div className="size-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                                                            {step}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="space-y-4 bg-slate-50/50 dark:bg-cyber-surface/30 p-5 rounded-2xl border border-slate-100 dark:border-cyber-border/50">
                                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <AlertCircle className="size-3" />
                                                    What to observe
                                                </h4>
                                                <ul className="space-y-3">
                                                    {phase.observations.map((obs, oIdx) => (
                                                        <li key={oIdx} className="text-xs text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed">
                                                            "{obs}"
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Conclusion */}
                        <div className="bg-gradient-to-br from-cyber-accent/10 to-indigo-500/10 p-8 rounded-[2.5rem] border border-cyber-accent/20 text-center space-y-4">
                            <CheckCircle2 className="size-12 text-cyber-accent mx-auto" />
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Tour Complete</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium max-w-lg mx-auto">
                                After completing these steps, you will have touched upon all the critical paths necessary to provide informed, accurate responses to the evaluation survey.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
