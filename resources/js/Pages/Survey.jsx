import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import { 
    Shield, 
    ShieldCheck, 
    PlayCircle, 
    ClipboardList, 
    BarChart3,
    CheckCircle2, 
    Home,
    Sun,
    Moon,
    User as UserIcon,
    Mail,
    Briefcase,
    ChevronRight,
    MessageSquare
} from 'lucide-react';
import { DecorativeBackground } from '@/Components/DecorativeBackground';

export default function Survey({ questions, user: propUser }) {
    const { auth } = usePage().props;
    const user = propUser || auth?.user;

    const [view, setView] = useState('options'); // 'options', 'privacy', 'profile', 'instructions', 'survey', 'comments', 'completed'
    const [currentStep, setCurrentStep] = useState(0);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('stegolock_theme') || 'dark';
        }
        return 'dark';
    });

    // Handle theme persistence
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('stegolock_theme', theme);
    }, [theme]);

    // Flatten categories for pagination
    const categories = useMemo(() => Object.keys(questions), [questions]);
    const currentCategory = categories[currentStep];
    const currentQuestions = questions[currentCategory] || [];

    // Initialize form data
    const initialData = useMemo(() => {
        const data = {
            respondent_name: user?.name || '',
            respondent_email: user?.email || '',
            respondent_role: '',
            other_role: '',
            additional_comments: '',
        };
        
        Object.values(questions).forEach(categoryQuestions => {
            categoryQuestions.forEach(q => {
                data[q.code.toLowerCase()] = '';
            });
        });
        return data;
    }, [questions, user]);

    const { data, setData, post, processing, errors, reset } = useForm(initialData);

    const allQuestionFields = useMemo(() => {
        const fields = [];
        Object.values(questions).forEach(categoryQuestions => {
            categoryQuestions.forEach(q => {
                fields.push(q.code.toLowerCase());
            });
        });
        return fields;
    }, [questions]);

    const answeredCount = allQuestionFields.filter(f => data[f] !== '').length;
    const totalQuestions = allQuestionFields.length;
    const progress = (answeredCount / totalQuestions) * 100;

    const handleAgree = () => {
        setView('profile');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleStartSurvey = () => {
        // Handle "Others" role logic
        if (data.respondent_role === 'Others' && data.other_role) {
            setData('respondent_role', data.other_role);
        }
        setView('instructions');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFinish = (e) => {
        e.preventDefault();
        
        // Final role fix
        const finalData = { ...data };
        if (finalData.respondent_role === 'Others') {
            finalData.respondent_role = finalData.other_role;
        }

        post(route('survey.store'), {
            onSuccess: () => setView('completed'),
        });
    };

    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-cyber-void transition-colors duration-500 overflow-x-hidden flex flex-col selection:bg-cyber-accent selection:text-white">
            <Head title="StegoLock - Survey" />
            <DecorativeBackground />

            {/* Theme Toggle Utility */}
            <div className="fixed top-6 right-6 z-[100]">
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-3 bg-white/10 dark:bg-cyber-surface/30 backdrop-blur-md border border-slate-200 dark:border-cyber-border rounded-2xl shadow-xl hover:scale-110 transition-all active:scale-95 group focus:outline-none"
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {theme === 'dark' ? (
                        <Sun className="size-6 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
                    ) : (
                        <Moon className="size-6 text-indigo-600 group-hover:-rotate-12 transition-transform duration-500" />
                    )}
                </button>
            </div>

            {/* Persistent Content Wrapper */}
            <div className="relative z-10 flex-1 flex flex-col items-center p-4 sm:p-8">
                <div className="max-w-5xl w-full space-y-12">
                    
                    {/* Persistent Header Section */}
                    {view !== 'options' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
                            {/* Brand Title */}
                            <div className={`space-y-2 ${view === 'completed' ? 'text-center' : 'text-left'}`}>
                                <div className={`flex items-center gap-4 ${view === 'completed' ? 'justify-center' : ''}`}>
                                    <Shield className="size-8 text-cyber-accent" />
                                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                                        <button className="group/brand relative inline-block focus:outline-none">
                                            <span className="relative z-10 transition-opacity duration-500 group-hover/brand:opacity-0">
                                                StegoLock
                                            </span>
                                            <span className="absolute inset-0 z-20 text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent to-indigo-600 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500">
                                                StegoLock
                                            </span>
                                        </button> App System Quality Assessment
                                    </h1>
                                </div>
                                <p className={`text-cyber-accent font-black uppercase tracking-widest text-xs ${view === 'completed' ? '' : 'ml-12'}`}>based on ISO/IEC 25010</p>
                            </div>

                            {/* Persistent Breadcrumb Header */}
                            {view !== 'completed' && (
                                <div className="grid grid-cols-3 border-b border-slate-200 dark:border-cyber-border">
                                    <div className={`py-4 text-center border-r border-slate-200 dark:border-cyber-border transition-all duration-500 ${view === 'privacy' ? 'bg-white/50 dark:bg-cyber-surface/30' : ''}`}>
                                        <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase transition-colors ${view === 'privacy' ? 'text-cyber-accent' : 'text-slate-400'}`}>Consent</span>
                                    </div>
                                    <div className={`py-4 text-center border-r border-slate-200 dark:border-cyber-border transition-all duration-500 ${view === 'profile' ? 'bg-white/50 dark:bg-cyber-surface/30' : ''}`}>
                                        <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase transition-colors ${view === 'profile' ? 'text-cyber-accent' : 'text-slate-400'}`}>Basic Profile</span>
                                    </div>
                                    <div className={`py-4 text-center transition-all duration-500 ${['instructions', 'survey', 'comments'].includes(view) ? 'bg-white/50 dark:bg-cyber-surface/30' : ''}`}>
                                        <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase transition-colors ${['instructions', 'survey', 'comments'].includes(view) ? 'text-cyber-accent' : 'text-slate-400'}`}>Assessment</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* View Containers */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* 1. Options View */}
                        {view === 'options' && (
                            <div className="space-y-12 py-12">
                                <div className="text-center space-y-8">
                                    <Link 
                                        href="/" 
                                        title="Home"
                                        className="group inline-flex items-center justify-center gap-4 mb-8 sm:mb-12"
                                    >
                                        <div className="relative inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-cyber-accent via-indigo-500 to-purple-600 rounded-[1.25rem] shadow-xl shadow-cyan-500/30 dark:shadow-[0_0_30px_rgba(34,211,238,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <Shield className="size-8 sm:size-10 text-white drop-shadow-md relative z-10" />
                                            <div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </div>
                                        <span className="text-3xl sm:text-4xl font-[900] text-slate-900 dark:text-white tracking-tighter leading-none transform origin-left group-hover:scale-105 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyber-accent group-hover:to-indigo-500 transition-all duration-500">
                                            Stego<span className="text-cyber-accent group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyber-accent group-hover:to-indigo-500 transition-all duration-500">Lock</span>
                                        </span>
                                    </Link>

                                    <div className="space-y-4">
                                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
                                            WELCOME TO <button 
                                                onClick={() => setView('privacy')}
                                                className="group/text relative inline-block text-cyber-accent transition-all duration-500 focus:outline-none"
                                            >
                                                <span className="relative z-10 transition-opacity duration-500 group-hover/text:opacity-0">
                                                    APP EVALUATION
                                                </span>
                                                <span className="absolute inset-0 z-20 text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent to-indigo-600 opacity-0 group-hover/text:opacity-100 transition-opacity duration-500">
                                                    APP EVALUATION
                                                </span>
                                                <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-0 h-1 sm:h-1.5 bg-gradient-to-r from-cyber-accent to-indigo-500 group-hover/text:w-full transition-all duration-500 rounded-full"></div>
                                            </button>
                                        </h1>
                                        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                                            To provide the most accurate feedback, you may choose to explore StegoLock through a guided tour or proceed directly to the survey.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto w-full">
                                    <div className="group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-cyber-surface border border-slate-200 dark:border-cyber-border p-6 sm:p-10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-cyan-500/10 flex flex-col h-full">
                                        <div className="relative z-10 flex-1 flex flex-col">
                                            <div className="p-3 sm:p-4 bg-cyan-100 dark:bg-cyan-900/30 w-fit rounded-2xl group-hover:scale-110 transition-transform duration-500 mb-6 sm:mb-8">
                                                <PlayCircle className="size-8 sm:size-10 text-cyan-600 dark:text-cyan-400" />
                                            </div>
                                            <div className="flex-1 space-y-2 sm:space-y-4 mb-8">
                                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Guided Tour</h3>
                                                <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                                    A step-by-step walk-through of StegoLock's core features to help you evaluate its performance.
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => alert('Guided Tour feature is currently under development.')}
                                                className="w-full py-3 sm:py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
                                            >
                                                Start Tour
                                            </button>
                                        </div>
                                    </div>

                                    <div className="group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-cyber-accent to-indigo-600 p-6 sm:p-10 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-indigo-500/30 flex flex-col h-full">
                                        <div className="relative z-10 flex-1 flex flex-col">
                                            <div className="p-3 sm:p-4 bg-white/20 w-fit rounded-2xl group-hover:scale-110 transition-transform duration-500 mb-6 sm:mb-8">
                                                <ClipboardList className="size-8 sm:size-10 text-white" />
                                            </div>
                                            <div className="flex-1 space-y-2 sm:space-y-4 mb-8">
                                                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Take Survey</h3>
                                                <p className="text-xs sm:text-base text-white/80 font-medium leading-relaxed">
                                                    Already familiar with StegoLock? Proceed directly to the quality evaluation survey.
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => setView('privacy')}
                                                className="w-full py-3 sm:py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest hover:shadow-lg transition-all active:scale-95 focus:outline-none"
                                            >
                                                Start Survey
                                            </button>
                                        </div>
                                        <div className="absolute -right-10 -bottom-10 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full blur-3xl"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. Privacy View */}
                        {view === 'privacy' && (
                            <div className="space-y-12 pt-8">
                                <div className="flex flex-col lg:flex-row gap-12 sm:gap-16">
                                    <div className="lg:w-2/3 space-y-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <UserIcon className="size-8 text-cyber-accent" />
                                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Dear Respondents,</h2>
                                            </div>
                                            <div className="w-12 h-1.5 bg-cyber-accent rounded-full"></div>
                                        </div>
                                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                                            <p>
                                                We are fourth-year Bachelor of Science in Information Technology (BSIT) students currently conducting a research study entitled <span className="font-bold italic">“StegoLock: A Cloud-Based Web Application Built on a Reconstruction-Dependent Security Architecture for Digital Document Storage.”</span>
                                            </p>
                                            <p>
                                                StegoLock is a cloud-based web application designed to provide secure storage and sharing of digital documents through a reconstruction-dependent security architecture. This approach enhances data protection by ensuring that sensitive information can only be accessed through a specific document data reconstruction process.
                                            </p>
                                            <p>
                                                In this regard, we are requesting your participation in answering this survey questionnaire. The information collected will be treated with strict confidentiality and will be used solely for academic and research purposes.
                                            </p>
                                            <p>
                                                Your honest responses will greatly contribute to the success of this study.
                                            </p>
                                            <p className="font-bold">
                                                Thank you for your time and cooperation.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="lg:w-3/5 space-y-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <ShieldCheck className="size-8 text-cyan-600 dark:text-cyan-400" />
                                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Data Privacy Notice</h2>
                                            </div>
                                            <p className="text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-widest leading-none">Republic Act No. 10173</p>
                                        </div>
                                        
                                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                            <p>
                                                In compliance with the Data Privacy Act of 2012 (Republic Act No. 10173), all information collected through this evaluation form will be treated with utmost confidentiality. The data gathered will be used solely to evaluate the General Assembly Program and to improve future activities of the organization.
                                            </p>
                                            <p>
                                                Personal information, if voluntarily provided, will not be shared with unauthorized individuals or third parties and will be stored securely. Responses will be analyzed in aggregate form and will not be used to identify individual respondents.
                                            </p>
                                            <p className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-l-4 border-cyan-500 italic text-xs">
                                                By accomplishing and submitting this evaluation form, you acknowledge that you have read, understood, and agreed to the collection and use of your information in accordance with the Data Privacy Act of 2012.
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-4 pt-4">
                                            <button 
                                                onClick={() => setView('options')} 
                                                className="w-full px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 focus:outline-none"
                                            >
                                                Back
                                            </button>
                                            <button 
                                                onClick={handleAgree} 
                                                className="w-full px-12 py-4 bg-gradient-to-r from-cyber-accent to-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-cyan-500/30 active:scale-95 focus:outline-none"
                                            >
                                                I AGREE & PROCEED
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2.5 Profile View */}
                        {view === 'profile' && (
                            <div className="space-y-12 pt-8">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <UserIcon className="size-8 text-cyber-accent" />
                                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Basic Profile</h2>
                                        </div>
                                        <div className="w-12 h-1.5 bg-cyber-accent rounded-full"></div>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
                                        Please provide your basic details. Name and email are optional and will be used for research purposes only.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name (Optional)</label>
                                            <div className="relative">
                                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                                                <input 
                                                    type="text" 
                                                    value={data.respondent_name}
                                                    onChange={e => setData('respondent_name', e.target.value)}
                                                    placeholder="Full Name"
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-cyber-border/50 rounded-2xl text-slate-900 dark:text-white font-medium focus:border-cyber-accent focus:ring-0 transition-all outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address (Optional)</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                                                <input 
                                                    type="email" 
                                                    value={data.respondent_email}
                                                    onChange={e => setData('respondent_email', e.target.value)}
                                                    placeholder="Email"
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-cyber-border/50 rounded-2xl text-slate-900 dark:text-white font-medium focus:border-cyber-accent focus:ring-0 transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Classification <span className="text-rose-500">*</span></label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {['Student', 'Professional', 'Others'].map((role) => (
                                                <button
                                                    key={role}
                                                    type="button"
                                                    onClick={() => setData('respondent_role', role)}
                                                    className={`
                                                        px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2
                                                        ${data.respondent_role === role 
                                                            ? 'bg-gradient-to-r from-cyber-accent to-blue-600 text-white shadow-lg shadow-cyan-500/20' 
                                                            : 'bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-cyber-border/50 text-slate-400 dark:text-slate-500 hover:border-cyber-accent/30'}
                                                    `}
                                                >
                                                    <Briefcase className="size-4" />
                                                    {role}
                                                </button>
                                            ))}
                                        </div>

                                        {data.respondent_role === 'Others' && (
                                            <div className="animate-in slide-in-from-top-2 duration-300 pt-2">
                                                <input 
                                                    type="text" 
                                                    value={data.other_role}
                                                    onChange={e => setData('other_role', e.target.value)}
                                                    placeholder="Please specify your classification"
                                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-2 border-cyber-accent rounded-2xl text-slate-900 dark:text-white font-medium focus:ring-0 transition-all outline-none"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                        <button 
                                            onClick={() => setView('privacy')} 
                                            className="flex-1 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 focus:outline-none"
                                        >
                                            Back
                                        </button>
                                        <button 
                                            onClick={handleStartSurvey}
                                            disabled={!data.respondent_role || (data.respondent_role === 'Others' && !data.other_role)}
                                            className="flex-[2] px-12 py-4 bg-gradient-to-r from-cyber-accent to-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-cyan-500/30 active:scale-95 focus:outline-none disabled:opacity-30 disabled:grayscale"
                                        >
                                            START QUESTIONNAIRE
                                            <ChevronRight className="inline-block ml-2 size-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2.7 Instructions View */}
                        {view === 'instructions' && (
                            <div className="space-y-10 pt-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <ClipboardList className="size-8 text-cyber-accent" />
                                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Instructions</h2>
                                    </div>
                                    <div className="w-12 h-1.5 bg-cyber-accent rounded-full"></div>
                                </div>
                                
                                <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                                    <p>Please answer all required questions completely and honestly. Select the response that best reflects your opinion or experience. There are no right or wrong answers, so we encourage you to answer each item as accurately as possible.</p>
                                    <p>Kindly read each statement carefully before providing your answer. Before submitting the questionnaire, please review your responses to ensure that all required fields are completed.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <BarChart3 className="size-8 text-cyber-accent" />
                                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Response Scale</h2>
                                    </div>
                                    <div className="w-12 h-1.5 bg-cyber-accent rounded-full"></div>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { score: 5, label: 'Strongly Agree', desc: 'You fully agree with the statement; it reflects your opinion to a very high extent.' },
                                        { score: 4, label: 'Agree', desc: 'You generally agree with the statement; it reflects your opinion to a considerable extent.' },
                                        { score: 3, label: 'Neutral', desc: 'You are undecided or neither agree nor disagree with the statement.' },
                                        { score: 2, label: 'Disagree', desc: 'You generally disagree with the statement; it does not reflect your opinion to a considerable extent.' },
                                        { score: 1, label: 'Strongly Disagree', desc: 'You completely disagree with the statement; it does not reflect your opinion at all.' }
                                    ].map((item) => (
                                        <div key={item.score} className="flex items-start gap-4 p-4 bg-white dark:bg-cyber-surface/40 border border-slate-100 dark:border-cyber-border/30 rounded-2xl shadow-sm transition-all hover:border-cyber-accent/50 group">
                                            <div className="size-10 rounded-xl bg-gradient-to-br from-cyber-accent to-blue-600 flex items-center justify-center text-white font-black shrink-0 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                                                {item.score}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-[10px] sm:text-xs">{item.label}</p>
                                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                                    <button 
                                        onClick={() => setView('profile')} 
                                        className="flex-1 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 focus:outline-none"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        onClick={() => setView('survey')} 
                                        className="flex-[2] px-12 py-4 bg-gradient-to-r from-cyber-accent to-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-cyan-500/30 active:scale-95 focus:outline-none"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 3. Survey View */}
                        {view === 'survey' && (
                            <div className="space-y-8 pt-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Shield className="size-8 text-cyber-accent" />
                                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                            {currentCategory.split(/[_\s]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                            <span className="ml-3 text-base sm:text-lg font-black text-slate-400 dark:text-slate-500 tabular-nums">
                                                {currentQuestions.filter(q => data[q.code.toLowerCase()] !== '').length} / {currentQuestions.length}
                                            </span>
                                        </h2>
                                    </div>
                                    <div className="w-12 h-1.5 bg-cyber-accent rounded-full"></div>
                                </div>

                                <div className="space-y-2">
                                    {currentQuestions.map((q, idx) => (
                                        <div 
                                            key={q.id} 
                                            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-4 border-b border-slate-100 dark:border-cyber-border/30 last:border-0 animate-in fade-in slide-in-from-left-4 duration-500"
                                        >
                                            <div className="flex items-start gap-4 flex-1">
                                                <span className="text-sm sm:text-base font-black text-cyber-accent whitespace-nowrap">{idx + 1}.</span>
                                                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-bold leading-snug">
                                                    {q.text}
                                                </p>
                                            </div>
                                            
                                            <div className="flex items-center gap-1.5 sm:gap-2 self-end lg:self-center">
                                                {[1, 2, 3, 4, 5].map((score) => {
                                                    const labels = {
                                                        5: 'Strongly Agree',
                                                        4: 'Agree',
                                                        3: 'Neutral',
                                                        2: 'Disagree',
                                                        1: 'Strongly Disagree'
                                                    };
                                                    return (
                                                        <div key={score} className="group relative">
                                                            <button
                                                                type="button"
                                                                onClick={() => setData(q.code.toLowerCase(), score)}
                                                                className={`
                                                                    relative size-9 sm:size-10 rounded-xl border-2 font-black text-sm sm:text-base transition-all duration-300 focus:outline-none flex items-center justify-center
                                                                    ${data[q.code.toLowerCase()] === score 
                                                                        ? 'bg-gradient-to-br from-cyber-accent to-indigo-600 border-transparent text-white shadow-lg shadow-cyan-500/30 scale-110 z-10' 
                                                                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-cyber-border text-slate-400 dark:text-slate-500 hover:border-cyber-accent hover:text-cyber-accent hover:bg-cyan-50 dark:hover:bg-cyan-900/10'}
                                                                `}
                                                            >
                                                                {score}
                                                                {data[q.code.toLowerCase()] === score && (
                                                                    <div className="absolute inset-0 bg-white/10 rounded-xl animate-pulse"></div>
                                                                )}
                                                            </button>
                                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-slate-900 dark:bg-cyber-surface border border-slate-800 dark:border-cyber-border text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-50 shadow-2xl translate-y-2 group-hover:translate-y-0">
                                                                {labels[score]}
                                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900 dark:border-t-cyber-surface"></div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (currentStep > 0) {
                                                setCurrentStep(currentStep - 1);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            } else {
                                                setView('instructions');
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }
                                        }}
                                        className="flex-1 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 focus:outline-none"
                                    >
                                        {currentStep > 0 ? 'Previous' : 'Back'}
                                    </button>
                                    
                                    {currentStep < categories.length - 1 ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCurrentStep(currentStep + 1);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            disabled={!currentQuestions.every(q => data[q.code.toLowerCase()] !== '')}
                                            className="flex-[2] px-12 py-4 bg-gradient-to-r from-cyber-accent to-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-cyan-500/30 active:scale-95 focus:outline-none disabled:opacity-30 disabled:grayscale"
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setView('comments');
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            disabled={!currentQuestions.every(q => data[q.code.toLowerCase()] !== '')}
                                            className="flex-[2] px-12 py-4 bg-gradient-to-r from-cyber-accent to-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-cyan-500/30 active:scale-95 focus:outline-none disabled:opacity-30"
                                        >
                                            Add Comments
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 3.5 Comments View */}
                        {view === 'comments' && (
                            <div className="space-y-12 pt-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <MessageSquare className="size-8 text-cyber-accent" />
                                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                            Additional Comments
                                        </h2>
                                    </div>
                                    <div className="w-12 h-1.5 bg-cyber-accent rounded-full"></div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
                                        Please provide any additional feedback, suggestions, or observations regarding the StegoLock application. Your insights are highly valuable for our research.
                                    </p>
                                    <div className="relative group">
                                        <textarea
                                            rows="6"
                                            value={data.additional_comments}
                                            onChange={e => setData('additional_comments', e.target.value)}
                                            placeholder="Type your comments here..."
                                            className="w-full p-6 bg-white dark:bg-slate-900/50 border-2 border-slate-100 dark:border-cyber-border/50 rounded-3xl text-slate-900 dark:text-white font-medium focus:border-cyber-accent focus:ring-0 transition-all outline-none resize-none shadow-sm group-hover:border-cyber-accent/30"
                                        />
                                        <div className="absolute bottom-4 right-4 pointer-events-none opacity-20">
                                            <MessageSquare className="size-12 text-cyber-accent" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setView('survey');
                                            setCurrentStep(categories.length - 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="flex-1 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 focus:outline-none"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={handleFinish}
                                        disabled={processing}
                                        className="flex-[2] px-12 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-emerald-500/30 active:scale-95 focus:outline-none disabled:opacity-30"
                                    >
                                        {processing ? 'Saving...' : 'Finish Evaluation'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 4. Completed View */}
                        {view === 'completed' && (
                            <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-12">
                                <div className="relative inline-flex items-center justify-center p-8 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-[3rem] shadow-2xl shadow-emerald-500/30 animate-bounce">
                                    <CheckCircle2 className="size-20 sm:size-24 text-white" />
                                    <div className="absolute inset-0 rounded-[3rem] bg-white/20 animate-ping"></div>
                                </div>
                                
                                <div className="text-center space-y-4">
                                    <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                                        Thank You!
                                    </h2>
                                    <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto">
                                        Your evaluation has been recorded. Thank you very much for your time and cooperation. Your input is highly valuable and essential to the success of this study.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto">
                                    <Link 
                                        href="/" 
                                        className="flex-1 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-center uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 focus:outline-none"
                                    >
                                        Home
                                    </Link>
                                    <Link 
                                        href={route('myDocuments')} 
                                        className="flex-[2] px-12 py-4 bg-gradient-to-r from-cyber-accent to-blue-600 text-white rounded-2xl font-black text-center uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-cyan-500/30 active:scale-95 focus:outline-none"
                                    >
                                        Go to Dashboard
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
