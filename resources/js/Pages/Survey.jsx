import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Send, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { DecorativeBackground } from '@/Components/DecorativeBackground';

export default function Survey() {
    const [submitted, setSubmitted] = useState(false);
    const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
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
    
    const { data, setData, post, processing, errors, reset } = useForm({
        // Performance Efficiency (PE1-PE7)
        pe1: '', pe2: '', pe3: '', pe4: '', pe5: '', pe6: '', pe7: '',
        // Usability (US1-US9)
        us1: '', us2: '', us3: '', us4: '', us5: '', us6: '', us7: '', us8: '', us9: '',
        // Reliability (RE1-RE6)
        re1: '', re2: '', re3: '', re4: '', re5: '', re6: '',
        // Security (SC1-SC5)
        sc1: '', sc2: '', sc3: '', sc4: '', sc5: '',
        additional_comments: '',
    });

    // All question codes that must be answered
    const allQuestionCodes = [
        'pe1', 'pe2', 'pe3', 'pe4', 'pe5', 'pe6', 'pe7',
        'us1', 'us2', 'us3', 'us4', 'us5', 'us6', 'us7', 'us8', 'us9',
        're1', 're2', 're3', 're4', 're5', 're6',
        'sc1', 'sc2', 'sc3', 'sc4', 'sc5',
    ];

    // Check if all questions are answered
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
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
            </label>
            <div className="flex gap-1 sm:gap-2">
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
                <span className="ml-3 flex items-center text-xs text-slate-500 dark:text-slate-400">
                    {value ? ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'][value - 1] : 'Select'}
                </span>
            </div>
            {errors[field] && (
                <p className="text-sm text-red-500">{errors[field]}</p>
            )}
        </div>
    );

    const QuestionSection = ({ title, questions }) => (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-cyber-border pb-3">
                {title}
            </h2>
            <div className="space-y-8">
                {questions.map((q) => (
                    <RatingInput
                        key={q.code}
                        label={`${q.code}: ${q.text}`}
                        field={q.code.toLowerCase()}
                        value={data[q.code.toLowerCase()]}
                    />
                ))}
            </div>
        </div>
    );

    if (submitted) {
        return (
            <div className="relative min-h-screen bg-white dark:bg-cyber-void selection:bg-cyber-accent selection:text-white dark:selection:text-cyber-void transition-colors duration-300">
                <Head title="Survey - Thank You" />
                <DecorativeBackground />
                
                <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                    <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                            <CheckCircle className="size-12 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                            Thank You!
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Your feedback helps us improve StegoLock. We appreciate you taking the time to share your thoughts!
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyber-accent to-indigo-500 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 dark:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                        >
                            <ArrowLeft className="size-5" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ISO 25010 Survey Questions
    const performanceEfficiencyQuestions = [
        { code: 'PE1', text: "I feel that the StegoLock web app is responsive when displaying information." },
        { code: 'PE2', text: "I feel that the StegoLock web app responds quickly when updating user information." },
        { code: 'PE3', text: "I don't seem to notice any delays or delays when accessing information or updating data in the StegoLock web app (e.g., long loading indicator, failure to navigate through pages)." },
        { code: 'PE4', text: "I think that StegoLock responds well when I click on the buttons and it doesn't take much time." },
        { code: 'PE5', text: "I think the StegoLock web app is responsive in providing results and reactions to user actions." },
        { code: 'PE6', text: "I have never experienced performance issues related to the StegoLock web app (e.g., slow response, auto-close app, etc.)." },
        { code: 'PE7', text: "I believe that the StegoLock web app is compatible with my device." },
    ];

    const usabilityQuestions = [
        { code: 'US1', text: "I think the way to use the StegoLock web app is easy to remember." },
        { code: 'US2', text: "I find the StegoLock web app easy to use." },
        { code: 'US3', text: "I seem to quickly understand when there are additional features in the StegoLock web app." },
        { code: 'US4', text: "I think the StegoLock web app makes updated data easier." },
        { code: 'US5', text: "I have never had any difficulty using the features included in the StegoLock web app." },
        { code: 'US6', text: "I have never had any difficulty using the features included in the StegoLock web app." },
        { code: 'US7', text: "I think the StegoLock web app is easily accessible." },
        { code: 'US8', text: "I believe that the StegoLock web app is accessible and remains available for use in certain situations or conditions." },
        { code: 'US9', text: "I feel that the StegoLock web app can be used anywhere." },
    ];

    const reliabilityQuestions = [
        { code: 'RE1', text: "I feel that the StegoLock web app can be used at any time." },
        { code: 'RE2', text: "I have never experienced any StegoLock web app crash/lag/lag/failure while using it." },
        { code: 'RE3', text: "I find that the StegoLock web app can be easily used on any pc and mobile devices." },
        { code: 'RE4', text: "I think that the StegoLock web app has a good level of reliability and application performance when using various internet connections (e.g. WiFi, 4G, 3G)." },
        { code: 'RE5', text: "I think if an error occurs in the StegoLock web app, the app can work normally as usual." },
        { code: 'RE6', text: "Overall, I find the StegoLock web app to be always reliable." },
    ];

    const securityQuestions = [
        { code: 'SC1', text: "I think the StegoLock web app provides good control and data security." },
        { code: 'SC2', text: "I think StegoLock is a trustworthy application." },
        { code: 'SC3', text: "I believe that the StegoLock web app ensures that only authorized users can view, update, and upload." },
        { code: 'SC4', text: "I believe that the StegoLock web app has a strong authentication mechanism to ensure that only authorized users can access the application." },
        { code: 'SC5', text: "I believe that the StegoLock web app only provides access to authorized users." },
    ];

    return (
        <div className="relative min-h-screen bg-white dark:bg-cyber-void selection:bg-cyber-accent selection:text-white dark:selection:text-cyber-void transition-colors duration-300">
            <Head title="Survey - StegoLock" />
            <DecorativeBackground />
            
            {/* Privacy Notice Modal */}
            {showPrivacyNotice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="max-w-2xl w-full mx-4 bg-white dark:bg-cyber-surface rounded-3xl shadow-2xl border border-slate-200 dark:border-cyber-border overflow-hidden">
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
                                    <ShieldCheck className="size-8 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Data Privacy Notice
                                </h2>
                            </div>
                            
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <p className="text-slate-600 dark:text-slate-300">
                                    <strong>In compliance with the Data Privacy Act of 2012 (Republic Act No. 10173),</strong> all information collected through this survey will be treated with utmost confidentiality.
                                </p>
                                <p className="text-slate-600 dark:text-slate-300">
                                    The data gathered will be used solely to evaluate StegoLock and to improve future versions of the application. Personal information, if voluntarily provided, will not be shared with unauthorized individuals or third parties and will be stored securely.
                                </p>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Responses will be analyzed in aggregate form and will not be used to identify individual respondents.
                                </p>
                                <p className="text-slate-600 dark:text-slate-300 font-medium">
                                    By clicking "I Agree" below, you acknowledge that you have read, understood, and agreed to the collection and use of your information in accordance with the Data Privacy Act of 2012.
                                </p>
                            </div>
                            
                            <div className="flex justify-end gap-4 pt-4 border-t border-slate-200 dark:border-cyber-border">
                                <button
                                    type="button"
                                    onClick={handlePrivacyAccept}
                                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30"
                                >
                                    I Agree
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!showPrivacyNotice && (
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="text-center mb-12 space-y-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-cyber-accent transition-colors"
                        >
                            <ArrowLeft className="size-4" />
                            Back to Home
                        </Link>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                            StegoLock User Survey
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Based on ISO/IEC 25010 - Help us evaluate StegoLock's quality attributes. Your honest responses will greatly contribute to this study.
                        </p>
                    </div>

                    {/* Survey Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="glass-panel p-8 rounded-3xl bg-white dark:bg-transparent border border-slate-200 dark:border-cyber-border space-y-12">
                            {/* Progress Indicator */}
                            <div className="bg-slate-50 dark:bg-cyber-surface/30 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Survey Progress
                                    </span>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                        {answeredCount} / {allQuestionCodes.length} questions answered
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                                    <div 
                                        className="bg-gradient-to-r from-cyber-accent to-indigo-500 h-2.5 rounded-full transition-all duration-300"
                                        style={{ width: `${(answeredCount / allQuestionCodes.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Rating Scale Legend */}
                            <div className="bg-slate-50 dark:bg-cyber-surface/30 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-400">
                                <strong>Rating Scale:</strong> 1 = Strongly Disagree, 2 = Disagree, 3 = Neutral, 4 = Agree, 5 = Strongly Agree
                            </div>

                            {/* Performance Efficiency */}
                            <QuestionSection title="Performance Efficiency" questions={performanceEfficiencyQuestions} />

                            {/* Usability */}
                            <QuestionSection title="Usability" questions={usabilityQuestions} />

                            {/* Reliability */}
                            <QuestionSection title="Reliability" questions={reliabilityQuestions} />

                            {/* Security */}
                            <QuestionSection title="Security" questions={securityQuestions} />

                            {/* Additional Comments */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-cyber-border pb-3">
                                    Additional Comments
                                </h2>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyber-accent to-indigo-500 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 dark:shadow-[0_0_15px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <Send className="size-5" />
                                {processing ? 'Submitting...' : !allQuestionsAnswered ? 'Please Answer All Questions' : 'Submit Survey'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

