import { useEffect, useState, useRef } from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { ShieldCheck, Timer, RefreshCw, LogOut, CheckCircle2, Loader2, KeyRound } from 'lucide-react';
import axios from 'axios';

export default function TwoFactorChallenge({ email = '', timeLeft: initialTimeLeft = 300, status }) {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(Math.floor(initialTimeLeft));
    const [isVerified, setIsVerified] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const inputsRef = useRef([]);

    // Sync timer state with server-provided prop
    useEffect(() => {
        setTimeLeft(Math.floor(initialTimeLeft));
    }, [initialTimeLeft]);

    // Resend form handling using standard Inertia
    const { post: postResend, processing: resending } = useForm({});

    // Reset error when user changes code input
    useEffect(() => {
        if (verificationError) {
            setVerificationError('');
        }
    }, [code]);

    // Countdown Timer Effect
    useEffect(() => {
        if (timeLeft <= 0 || isVerified) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, isVerified]);

    // Format seconds into MM:SS
    const formatTime = (seconds) => {
        const totalSeconds = Math.floor(seconds);
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Handle digit entry
    const handleChange = (e, index) => {
        const val = e.target.value;
        if (/^[0-9]$/.test(val)) {
            const newCode = [...code];
            newCode[index] = val;
            setCode(newCode);
            // Move focus to next box
            if (index < 5) {
                inputsRef.current[index + 1].focus();
            }
        } else if (val === '') {
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);
        }
    };

    // Handle backspaces & arrow keys
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (code[index] === '') {
                // Focus previous block and delete
                if (index > 0) {
                    const newCode = [...code];
                    newCode[index - 1] = '';
                    setCode(newCode);
                    inputsRef.current[index - 1].focus();
                }
            } else {
                // Delete current block
                const newCode = [...code];
                newCode[index] = '';
                setCode(newCode);
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputsRef.current[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    // Clipboard Paste support
    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('text').trim();
        if (/^[0-9]{6}$/.test(pasteData)) {
            const chars = pasteData.split('');
            setCode(chars);
            inputsRef.current[5].focus();
        }
        e.preventDefault();
    };

    // Submit via Axios to support premium activation animation delays
    const submitVerification = async (e) => {
        e.preventDefault();
        setVerifying(true);
        setVerificationError('');

        // Start a 2-second timer to give a premium, robust "cryptographic handshake" feel
        const minimumLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));

        try {
            const [resp] = await Promise.all([
                axios.post(route('two-factor.challenge'), {
                    code: code.join(''),
                }),
                minimumLoadingTime
            ]);

            if (resp.data.success) {
                setIsVerified(true);
                // Delay redirect for 2.5 seconds to show the gorgeous success screen
                setTimeout(() => {
                    router.visit(resp.data.redirect);
                }, 2500);
            }
        } catch (err) {
            setVerifying(false);
            if (err.response?.data?.errors?.code) {
                setVerificationError(err.response.data.errors.code[0]);
            } else if (err.response?.data?.message) {
                setVerificationError(err.response.data.message);
            } else {
                setVerificationError('The code you entered is incorrect or has expired.');
            }
        }
    };

    const handleResend = (e) => {
        e.preventDefault();
        postResend(route('two-factor.resend'), {
            onSuccess: () => {
                setCode(['', '', '', '', '', '']);
                inputsRef.current[0].focus();
            }
        });
    };

    const isCodeComplete = code.every(char => char !== '');

    return (
        <GuestLayout isLogin={true}>
            <Head title="Secure 2FA Authorization" />

            {/* Glowing Cyberpunk Style Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,rgba(14,165,233,0.08),transparent)] pointer-events-none" />

            <div className="w-full max-w-md mx-auto relative z-10">
                {isVerified ? (
                    /* Gorgeous Delayed Success Activated Screen */
                    <div className="p-8 sm:p-12 text-center space-y-6 animate-fade-in relative overflow-hidden rounded-[2.5rem] border border-emerald-500/20 bg-white/80 dark:bg-cyber-surface/90 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-green-500 animate-pulse"></div>
                        
                        <div className="relative inline-flex items-center justify-center p-6 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-[2rem] border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.2)] animate-bounce-subtle">
                            <ShieldCheck className="size-16 text-emerald-500 animate-pulse" />
                            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-100"></div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-500 dark:text-emerald-400 uppercase">
                                Access Authorized
                            </h2>
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                                Cryptographic handshakes established.
                            </p>
                        </div>

                        <div className="pt-4 flex flex-col items-center justify-center space-y-3">
                            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/5 px-4 py-2 rounded-full border border-emerald-500/10">
                                <Loader2 className="size-3.5 animate-spin" />
                                PREPARING CRYPTOGRAPHIC KEYS
                            </div>
                        </div>
                    </div>
                ) : (
                    /* standard OTP Challenge Card */
                    <div className="p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 dark:border-cyber-border/40 bg-white/90 dark:bg-cyber-surface/90 shadow-2xl backdrop-blur-2xl relative overflow-hidden group hover:border-sky-500/20 transition-all duration-500">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600"></div>
                        
                        {/* Shield & Key Icons */}
                        <div className="flex flex-col items-center text-center space-y-4 mb-8">
                            <div className="relative inline-flex items-center justify-center p-5 bg-sky-500/10 dark:bg-sky-500/5 rounded-3xl border border-sky-500/20 dark:border-sky-500/10 shadow-[0_0_30px_rgba(14,165,233,0.15)] group-hover:scale-105 transition-transform duration-500">
                                <KeyRound className="size-10 text-sky-500 dark:text-sky-400" />
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                                    2FA Authorization
                               </h1>
                                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                                    A 6-digit security code was dispatched to your registered email address. Input it below to authorize this session.
                                </p>
                            </div>
                        </div>

                        {/* Status notification banner (Resend success) */}
                        {status === 'verification-code-sent' && (
                            <div className="mb-6 p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 text-xs font-bold text-center border border-emerald-500/20 tracking-wide animate-fade-in flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                                <CheckCircle2 className="size-3.5" />
                                A fresh authorization code has been sent!
                            </div>
                        )}

                        <form onSubmit={submitVerification} className="space-y-6">
                            {/* Visual Individual Blocks */}
                            <div className="grid grid-cols-6 gap-2.5 sm:gap-3 py-2">
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`code-${index}`}
                                        ref={(el) => (inputsRef.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        disabled={verifying}
                                        className="size-11 sm:size-12 rounded-2xl text-center text-xl font-black bg-slate-50 dark:bg-cyber-void border-2 border-slate-100 dark:border-cyber-border/40 focus:border-sky-500 focus:ring-sky-500 dark:focus:border-sky-400 dark:focus:ring-sky-400 text-slate-900 dark:text-white shadow-inner transition-all duration-300 disabled:opacity-50"
                                        autoComplete="off"
                                    />
                                ))}
                            </div>

                            {/* Verification Error */}
                            {verificationError && (
                                <div className="text-center animate-shake">
                                    <InputError message={verificationError} className="text-sm font-bold bg-red-500/5 py-2 px-4 rounded-xl border border-red-500/10 inline-block" />
                                </div>
                            )}

                            {/* Timer Block */}
                            {timeLeft > 0 ? (
                                <div className="flex items-center justify-center gap-1.5 text-xs font-black tracking-wider text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-cyber-void/50 py-2.5 rounded-2xl border border-slate-100 dark:border-cyber-border/20">
                                    <Timer className="size-3.5 text-sky-500" />
                                    <span>CODE EXPIRES IN:</span>
                                    <span className="text-amber-500 font-mono tracking-widest">{formatTime(timeLeft)}</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-1.5 text-xs font-black tracking-wider text-red-500 bg-red-500/5 py-2.5 rounded-2xl border border-red-500/10">
                                    <ShieldAlert className="size-3.5" />
                                    <span>CODE EXPIRED</span>
                                </div>
                            )}

                            {/* Submit Activation Button */}
                            <PrimaryButton
                                className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 hover:opacity-95 text-sm font-black shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed group transition-all"
                                disabled={!isCodeComplete || timeLeft <= 0 || verifying}
                            >
                                {verifying ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin text-white" />
                                        <span>AUTHORIZING ACCESS...</span>
                                    </>
                                ) : (
                                    <span>AUTHORIZE SECURE VAULT</span>
                                )}
                            </PrimaryButton>
                        </form>

                        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-cyber-border/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <form onSubmit={handleResend} className="w-full sm:w-auto">
                                <button
                                    type="submit"
                                    disabled={resending || verifying || timeLeft > 240}
                                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-xs font-black uppercase text-sky-600 dark:text-sky-400 hover:text-sky-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <RefreshCw className={`size-3.5 ${resending ? 'animate-spin' : ''}`} />
                                    <span>{resending ? 'Sending...' : 'Resend Code'}</span>
                                </button>
                            </form>

                            <Link
                                href={route('login')}
                                className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400 transition-colors"
                            >
                                <LogOut className="size-3.5" />
                                <span>Go Back to Login</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}
