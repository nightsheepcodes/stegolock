import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Star, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { DecorativeBackground } from '@/Components/DecorativeBackground';

export default function Survey() {
    const [submitted, setSubmitted] = useState(false);
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
    
    const { data, setData, post, processing, errors, reset } = useForm({
        experience_rating: '',
        ease_of_use_rating: '',
        security_confidence_rating: '',
        features_used: [],
        improvements_suggested: '',
        additional_comments: '',
        would_recommend: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
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

    const handleFeatureChange = (feature) => {
        const currentFeatures = data.features_used || [];
        if (currentFeatures.includes(feature)) {
            setData('features_used', currentFeatures.filter(f => f !== feature));
        } else {
            setData('features_used', [...currentFeatures, feature]);
        }
    };

    const features = [
        'Document Locking',
        'Document Unlocking',
        'Folder Management',
        'File Sharing',
        'Starred Documents',
        'Storage Management',
        'Admin Dashboard',
    ];

    const RatingInput = ({ label, field, value }) => (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
            </label>
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(field, star)}
                        className={`p-2 rounded-lg transition-all ${
                            value >= star
                                ? 'text-yellow-400 scale-110'
                                : 'text-slate-300 dark:text-slate-600 hover:text-yellow-300'
                        }`}
                    >
                        <Star className={`size-8 ${value >= star ? 'fill-current' : ''}`} />
                    </button>
                ))}
                <span className="ml-3 flex items-center text-sm text-slate-500 dark:text-slate-400">
                    {value ? `${value} out of 5` : 'Click to rate'}
                </span>
            </div>
            {errors[field] && (
                <p className="text-sm text-red-500">{errors[field]}</p>
            )}
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

    return (
        <div className="relative min-h-screen bg-white dark:bg-cyber-void selection:bg-cyber-accent selection:text-white dark:selection:text-cyber-void transition-colors duration-300">
            <Head title="Survey - StegoLock" />
            <DecorativeBackground />
            
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
                        Help us improve your experience. Your feedback is valuable and helps shape the future of StegoLock.
                    </p>
                </div>

                {/* Survey Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="glass-panel p-8 rounded-3xl bg-white dark:bg-transparent border border-slate-200 dark:border-cyber-border space-y-8">
                        {/* Ratings */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-cyber-border pb-3">
                                Rate Your Experience
                            </h2>
                            <div className="space-y-8">
                                <RatingInput
                                    label="Overall Experience"
                                    field="experience_rating"
                                    value={data.experience_rating}
                                />
                                <RatingInput
                                    label="Ease of Use"
                                    field="ease_of_use_rating"
                                    value={data.ease_of_use_rating}
                                />
                                <RatingInput
                                    label="Security Confidence"
                                    field="security_confidence_rating"
                                    value={data.security_confidence_rating}
                                />
                            </div>
                        </div>

                        {/* Features Used */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-cyber-border pb-3">
                                Features You've Used
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {features.map((feature) => (
                                    <label
                                        key={feature}
                                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                                            data.features_used?.includes(feature)
                                                ? 'bg-cyber-accent/10 border-cyber-accent text-cyber-accent'
                                                : 'bg-slate-50 dark:bg-cyber-surface/30 border-slate-200 dark:border-cyber-border text-slate-700 dark:text-slate-300 hover:border-cyber-accent/50'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.features_used?.includes(feature) || false}
                                            onChange={() => handleFeatureChange(feature)}
                                            className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-cyber-accent focus:ring-cyber-accent bg-transparent"
                                        />
                                        <span className="font-medium">{feature}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-cyber-border pb-3">
                                Recommendations
                            </h2>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                                    Would you recommend StegoLock to others?
                                </label>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setData('would_recommend', true)}
                                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                            data.would_recommend === true
                                                ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                                : 'bg-slate-100 dark:bg-cyber-surface/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-cyber-surface'
                                        }`}
                                    >
                                        Yes, I'd recommend it
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setData('would_recommend', false)}
                                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                            data.would_recommend === false
                                                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                                : 'bg-slate-100 dark:bg-cyber-surface/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-cyber-surface'
                                        }`}
                                    >
                                        No, probably not
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Text Areas */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-cyber-border pb-3">
                                Your Feedback
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Suggested Improvements
                                    </label>
                                    <textarea
                                        value={data.improvements_suggested}
                                        onChange={(e) => setData('improvements_suggested', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-cyber-surface/50 border border-slate-200 dark:border-cyber-border rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-cyber-accent focus:border-transparent transition resize-none"
                                        placeholder="What features or improvements would you like to see?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Additional Comments
                                    </label>
                                    <textarea
                                        value={data.additional_comments}
                                        onChange={(e) => setData('additional_comments', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-cyber-surface/50 border border-slate-200 dark:border-cyber-border rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-cyber-accent focus:border-transparent transition resize-none"
                                        placeholder="Any other thoughts or feedback you'd like to share?"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyber-accent to-indigo-500 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 dark:shadow-[0_0_15px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="size-5" />
                            {processing ? 'Submitting...' : 'Submit Survey'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
