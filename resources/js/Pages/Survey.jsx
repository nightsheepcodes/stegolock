import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Send, CheckCircle, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { DecorativeBackground } from '@/Components/DecorativeBackground';

export default function Survey({ questions }) {
    const [submitted, setSubmitted] = useState(false);
    const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
    
    // Initialize form data dynamically based on questions from DB
    const initialData = {
        additional_comments: '',
    };
    
    // Extract all question codes for initialization and progress tracking
    const allQuestionCodes = [];
    Object.values(questions).forEach(categoryQuestions => {
        categoryQuestions.forEach(q => {
            const field = q.code.toLowerCase();
            initialData[field] = '';
            allQuestionCodes.push(field);
        });
    });

    const { data, setData, post, processing, errors, reset } = useForm(initialData);

    const [darkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('stegolock_theme');
            return saved ? saved === 'dark' : true;
        }
        return true;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('stegolock_theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('stegolock_theme', 'light');
        }
    }, [darkMode]);

    const handlePrivacyAccept = () => {
        setShowPrivacyNotice(false);
    };

    // Check progress
    const answeredCount = allQuestionCodes.filter(code => data[code] !== '' && data[code] !== null).length;
    const allQuestionsAnswered = answeredCount === allQuestionCodes.length;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!allQuestionsAnswered) {
            alert('Please answer all questions before submitting the survey.');
            return;
        }
        post(route('survey.store'), {
            onSuccess: () => {
                setSubmitted(true);
                reset();
            },
        });
    };

    const handleRatingClick = (field, rating) => {
        setData(field, rating);
    };

    const RatingInput = ({ label, field, value }) => (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {label}
            </label>
            <div className="flex flex-wrap gap-1 sm:gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingClick(field, rating)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            value == rating
                                ? 'bg-cyber-accent text-white scale-105 shadow-lg shadow-cyan-500/30'
                                : 'bg-slate-100 dark:bg-cyber-surface/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-cyber-surface border border-slate-200 dark:border-cyber-border'
                        }`}
                    >
                        {rating}
                    </button>
                ))}
                <span className="ml-2 sm:ml-3 flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {value ? ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'][value - 1] : 'Select'}
                </span>
            </div>
            {errors[field] && (
                <p className="text-sm text-red-500">{errors[field]}</p>
            )}
        </div>
    );

    if (submitted) {
        return (
            <div className="relative min-h-screen bg-white dark:bg-cyber-void transition-colors duration-300">
                <Head title="Survey - Thank You" />
                <DecorativeBackground />
                <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                    <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in duration-500">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                            <CheckCircle className="size-12 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Thank You!</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Your feedback helps us improve StegoLock. We appreciate you taking the time to share your thoughts!
                        </p>
                        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyber-accent to-indigo-500 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30">
                            <ArrowLeft className="size-5" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-white dark:bg-cyber-void selection:bg-cyber-accent selection:text-white transition-colors duration-300">
            <Head title="Survey - StegoLock" />
            <DecorativeBackground />
            
            {showPrivacyNotice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="max-w-2xl w-full bg-white dark:bg-cyber-surface rounded-3xl shadow-2xl border border-slate-200 dark:border-cyber-border overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
                                    <ShieldCheck className="size-8 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Data Privacy Notice</h2>
                            </div>
                            <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
                                <p className="text-slate-600 dark:text-slate-300">
                                    <strong>In compliance with the Data Privacy Act of 2012 (Republic Act No. 10173),</strong> all information collected through this survey will be treated with utmost confidentiality.
                                </p>
                                <p className="text-slate-600 dark:text-slate-300">
                                    The data gathered will be used solely to evaluate StegoLock and to improve future versions of the application. Personal information will not be shared with unauthorized third parties.
                                </p>
                                <p className="text-slate-600 dark:text-slate-300 font-medium">
                                    By clicking "I Agree", you acknowledge that you agreed to the collection and use of your information in accordance with the Data Privacy Act of 2012.
                                </p>
                            </div>
                            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-cyber-border">
                                <button onClick={handlePrivacyAccept} className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg">
                                    I Agree
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!showPrivacyNotice && (
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
                    <div className="text-center mb-12 space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-cyber-accent transition-colors">
                            <ArrowLeft className="size-4" />
                            Back to Home
                        </Link>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">StegoLock User Survey</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Based on ISO/IEC 25010 - Help us evaluate StegoLock's quality attributes. Your honest responses contribute to our research.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="glass-panel p-8 rounded-3xl bg-white dark:bg-transparent border border-slate-200 dark:border-cyber-border space-y-12 shadow-xl">
                            {/* Progress Tracking */}
                            <div className="bg-slate-50 dark:bg-cyber-surface/30 rounded-xl p-6 border border-slate-100 dark:border-cyber-border/50">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Survey Progress</span>
                                    <span className="text-sm font-black text-cyber-accent">
                                        {answeredCount} / {allQuestionCodes.length}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                                    <div 
                                        className="bg-gradient-to-r from-cyber-accent to-indigo-500 h-full transition-all duration-700 ease-out"
                                        style={{ width: `${(answeredCount / allQuestionCodes.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4 text-xs sm:text-sm text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/20">
                                <strong>Rating Scale:</strong> 1 = Strongly Disagree, 2 = Disagree, 3 = Neutral, 4 = Agree, 5 = Strongly Agree
                            </div>

                            {/* Dynamic Question Sections */}
                            {Object.entries(questions).map(([category, categoryQuestions]) => (
                                <div key={category} className="space-y-6">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-cyber-border pb-3">
                                        {category}
                                    </h2>
                                    <div className="space-y-8">
                                        {categoryQuestions.map((q) => (
                                            <RatingInput
                                                key={q.id}
                                                label={`${q.code}: ${q.text}`}
                                                field={q.code.toLowerCase()}
                                                value={data[q.code.toLowerCase()]}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-cyber-border pb-3">
                                    Additional Comments
                                </h2>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                        Any other thoughts or feedback you'd like to share?
                                    </label>
                                    <textarea
                                        value={data.additional_comments}
                                        onChange={(e) => setData('additional_comments', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-cyber-surface/50 border border-slate-200 dark:border-cyber-border rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-cyber-accent focus:border-transparent transition resize-none"
                                        placeholder="Your feedback is valuable to us..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center pb-12">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyber-accent to-indigo-500 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed`}
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="size-5" />
                                        {!allQuestionsAnswered ? 'Complete All Questions' : 'Submit Survey'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
