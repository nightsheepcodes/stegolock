import { useEffect, useState, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { ShieldCheck, Timer, RefreshCw, LogOut, CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function VerifyEmail({ status, timeLeft: initialTimeLeft = 300 }) {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(Math.floor(initialTimeLeft));
    const [isVerified, setIsVerified] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const inputsRef = useRef([]);

    // Keep state in sync with server-provided timeLeft prop (important on refreshes/resends)
    useEffect(() => {
        setTimeLeft(Math.floor(initialTimeLeft));
    }, [initialTimeLeft]);

    // Resend Notification Form using standard Inertia
    const { post: postResend, processing: resending } = useForm({});

    // Reset verification error when code changes
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

    // Handle backspaces & left/right arrows
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (code[index] === '' && index > 0) {
                const newCode = [...code];
                newCode[index - 1] = '';
                setCode(newCode);
                inputsRef.current[index - 1].focus();
            } else {
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

    // Handle paste of 6 digits
    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('text').trim();
        if (/^[0-9]{6}$/.test(pasteData)) {
            const chars = pasteData.split('');
            setCode(chars);
            inputsRef.current[5].focus();
        }
        e.preventDefault();
    };

    // Submit Verification via AJAX (Axios) to support custom success screen delays
    const submitVerification = async (e) => {
        e.preventDefault();
        setVerifying(true);
        setVerificationError('');

        // 🌟 Start a 2-second timer to give a premium, robust "cryptographic handshake" feel
        const minimumLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));

        try {
            // Run the API call and minimum loading timer concurrently
            const [resp] = await Promise.all([
                axios.post(route('verification.verify'), {
                    code: code.join(''),
                }),
                minimumLoadingTime
            ]);
            
            if (resp.data.success) {
                setIsVerified(true);
                // 🌟 Delay the redirect for 2.5 seconds to show success screen
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

    // Resend verification email
    const submitResend = (e) => {
        e.preventDefault();
        postResend(route('verification.send'), {
            onSuccess: () => {
                setTimeLeft(300); // Reset timer to 5 minutes
                setCode(['', '', '', '', '', '']); // Clear existing code
                inputsRef.current[0].focus();
            }
        });
    };

    return (
        <GuestLayout mode="login">
            <Head title="Email Verification" />

            {isVerified ? (
                /* 🌟 GORGEOUS PREMIUM SUCCESS SCREEN WITH DELAY */
                <div className="flex flex-col items-center text-center space-y-6 py-6 animate-fade-in">
                    <div className="relative inline-flex items-center justify-center p-5 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-[2rem] border border-emerald-500/30 text-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.2)] dark:shadow-[0_0_50px_rgba(16,185,129,0.4)] animate-bounce-subtle">
                        <CheckCircle2 className="size-16" />
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Account Activated!
                        </h2>
                        <div className="h-1 w-16 bg-emerald-500 mx-auto rounded-full shadow-glow-emerald" />
                    </div>
                    
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                        Your email has been successfully verified. We are preparing your secure cryptographic vault...
                    </p>

                    <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/5 px-4 py-2 rounded-full border border-emerald-500/10">
                        <Loader2 className="size-4 animate-spin" />
                        Entering StegoLock...
                    </div>
                </div>
            ) : (
                /* STANDARD OTP CODE FORM */
                <>
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-4 bg-cyber-accent/10 dark:bg-cyber-accent/20 rounded-full border border-cyber-accent/30 text-cyber-accent">
                            <ShieldCheck className="size-10 animate-pulse" />
                        </div>
                        
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Verify Your Email
                        </h2>
                        
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                            We've sent a 6-digit verification code to your email. Enter it below to activate your cryptographic account.
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-xl text-center">
                            A fresh verification code has been dispatched to your email!
                        </div>
                    )}

                    <form onSubmit={submitVerification} className="mt-8 space-y-6">
                        {/* 6-Digit Box Inputs */}
                        <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
                            {code.map((digit, idx) => (
                                <input
                                    key={idx}
                                    ref={el => inputsRef.current[idx] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(e, idx)}
                                    onKeyDown={(e) => handleKeyDown(e, idx)}
                                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-extrabold rounded-2xl border border-slate-200 dark:border-cyber-border bg-slate-50 dark:bg-cyber-surface/30 text-slate-900 dark:text-white shadow-sm focus:border-cyber-accent focus:ring-cyber-accent transition-all duration-200 uppercase focus:scale-105"
                                    required
                                />
                            ))}
                        </div>

                        {verificationError && (
                            <div className="text-center">
                                <InputError message={verificationError} className="text-sm font-semibold text-rose-500 dark:text-rose-400" />
                            </div>
                        )}

                        {/* Countdown Timer Display */}
                        <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                            <Timer className={`size-4 ${timeLeft === 0 ? 'text-rose-500' : 'text-amber-500 animate-spin-slow'}`} />
                            {timeLeft > 0 ? (
                                <span className="text-slate-600 dark:text-slate-300">
                                    Code expires in: <span className="text-amber-500 font-bold">{formatTime(timeLeft)}</span>
                                </span>
                            ) : (
                                <span className="text-rose-500 font-bold">
                                    Verification code has expired.
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            <PrimaryButton 
                                disabled={verifying || code.join('').length !== 6 || timeLeft <= 0} 
                                className="w-full justify-center py-3 bg-gradient-to-r from-cyber-accent to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/25 dark:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:scale-[1.02]"
                            >
                                {verifying ? 'Verifying Account...' : 'Activate StegoLock'}
                            </PrimaryButton>

                            <button
                                onClick={submitResend}
                                disabled={resending || (timeLeft > 0 && timeLeft < 240)} // Allow resending after 1 minute has passed (e.g. 300 - 60 = 240)
                                className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-cyber-border hover:border-cyber-accent dark:hover:border-cyber-accent bg-white dark:bg-cyber-surface/10 hover:bg-slate-50 dark:hover:bg-cyber-surface/20 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold text-xs rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <RefreshCw className={`size-3.5 ${resending ? 'animate-spin' : ''}`} />
                                {timeLeft > 0 && timeLeft < 240 ? (
                                    `Resend OTP (Wait ${timeLeft - 240}s)`
                                ) : (
                                    resending ? 'Resending Code...' : 'Resend Verification Code'
                                )}
                            </button>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-cyber-border/40 flex justify-center">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 font-semibold transition-all duration-200"
                            >
                                <LogOut className="size-3.5" />
                                Log Out
                            </Link>
                        </div>
                    </form>
                </>
            )}
        </GuestLayout>
    );
}
