import { useState, useRef, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import { ShieldCheck, ShieldAlert, KeyRound, Lock, Loader2, AlertCircle, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export default function UpdateTwoFactorAuthenticationForm({ email2faEnabled = false, twoFactorState = null, className = '' }) {
    const [confirming2faChange, setConfirming2faChange] = useState(false);
    
    // Progressive flow states: 'password' | 'otp' | 'success'
    const [step, setStep] = useState('password');
    const [loading, setLoading] = useState(false);
    const [actionError, setActionError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Real-time suspension timer states
    const [suspendedUntil, setSuspendedUntil] = useState(0);
    const [suspendedSecondsLeft, setSuspendedSecondsLeft] = useState(0);

    // OTP lifetime timer states
    const [otpTimeLeft, setOtpTimeLeft] = useState(0);
    const [resending, setResending] = useState(false);

    // Disabling form (standard password validation)
    const {
        data: disableData,
        setData: setDisableData,
        put: disablePut,
        processing: disablingProcessing,
        reset: resetDisable,
        errors: disableErrors,
        clearErrors: clearDisableErrors,
    } = useForm({
        password: '',
        enable: false,
    });

    // Enabling states
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
    const passwordInputRef = useRef();
    const otpInputsRef = useRef([]);

    // Live countdown timer effect for suspension
    useEffect(() => {
        if (suspendedSecondsLeft <= 0) return;
        const interval = setInterval(() => {
            setSuspendedSecondsLeft(prev => {
                if (prev <= 1) {
                    setSuspendedUntil(0);
                    setActionError('');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [suspendedSecondsLeft]);

    // Live countdown timer effect for OTP code expiration
    useEffect(() => {
        if (otpTimeLeft <= 0) return;
        const interval = setInterval(() => {
            setOtpTimeLeft(prev => {
                if (prev <= 1) {
                    setActionError('The verification OTP has expired. Please resend the code.');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [otpTimeLeft]);

    // Calculate initial suspension countdown when timestamp is provided
    useEffect(() => {
        if (suspendedUntil > 0) {
            const now = Math.floor(Date.now() / 1000);
            const remaining = Math.max(0, suspendedUntil - now);
            setSuspendedSecondsLeft(remaining);
        } else {
            setSuspendedSecondsLeft(0);
        }
    }, [suspendedUntil]);

    const formatSuspendedTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const openConfirmModal = () => {
        setActionError('');
        setSuccessMessage('');
        setSuspendedUntil(0);
        setSuspendedSecondsLeft(0);
        setOtpTimeLeft(0);
        
        if (email2faEnabled) {
            // Disabling: straight password check
            setStep('password');
            resetDisable();
            clearDisableErrors();
        } else if (twoFactorState) {
            const now = Math.floor(Date.now() / 1000);

            // 1. If OTP suspension is active
            if (twoFactorState.otpSuspendedUntil > now) {
                setStep('otp');
                setSuspendedUntil(twoFactorState.otpSuspendedUntil);
                setActionError('Too many incorrect OTP attempts. 2FA setup is suspended.');
            }
            // 2. If Password suspension is active
            else if (twoFactorState.pwSuspendedUntil > now) {
                setStep('password');
                setSuspendedUntil(twoFactorState.pwSuspendedUntil);
                setActionError('Too many incorrect attempts. Password confirmation is suspended.');
            }
            // 3. If there is a pending active OTP (skip password input)
            else if (twoFactorState.hasPendingOtp) {
                setStep('otp');
                setConfirmPassword('');
                setOtpCode(['', '', '', '', '', '']);
                
                if (twoFactorState.otpExpiresAt) {
                    const remaining = Math.max(0, twoFactorState.otpExpiresAt - now);
                    setOtpTimeLeft(remaining);
                    if (remaining <= 0) {
                        setActionError('The verification OTP has expired. Please resend the code.');
                    }
                } else {
                    setOtpTimeLeft(300);
                }
            }
            // 4. Default: start from password confirmation
            else {
                setStep('password');
                setConfirmPassword('');
                setOtpCode(['', '', '', '', '', '']);
            }
        } else {
            setStep('password');
            setConfirmPassword('');
            setOtpCode(['', '', '', '', '', '']);
        }
        
        setConfirming2faChange(true);
    };

    const closeModal = () => {
        if (loading || resending) return; // Prevent closing while processing secure operations
        setConfirming2faChange(false);
        setStep('password');
        setActionError('');
        setConfirmPassword('');
        setOtpCode(['', '', '', '', '', '']);
        setSuspendedUntil(0);
        setSuspendedSecondsLeft(0);
        setOtpTimeLeft(0);
        resetDisable();
        clearDisableErrors();
    };

    // 1. Password verification for enabling progressive flow
    const submitEnablePassword = async (e) => {
        e.preventDefault();
        if (suspendedSecondsLeft > 0) return;
        
        setLoading(true);
        setActionError('');

        try {
            const response = await axios.post(route('profile.two-factor.verify-password'), {
                password: confirmPassword,
            });

            if (response.data.success) {
                // Success: proceed to OTP verification stage!
                setStep('otp');
                
                // Set OTP lifetime countdown
                if (response.data.otp_expires_at) {
                    const now = Math.floor(Date.now() / 1000);
                    setOtpTimeLeft(Math.max(0, response.data.otp_expires_at - now));
                } else {
                    setOtpTimeLeft(300);
                }

                // Allow DOM to update then focus first OTP box
                setTimeout(() => {
                    otpInputsRef.current[0]?.focus();
                }, 100);
            }
        } catch (error) {
            if (error.response?.data?.errors?.suspended_until) {
                setSuspendedUntil(error.response.data.errors.suspended_until);
            }
            
            if (error.response?.data?.errors?.password) {
                setActionError(error.response.data.errors.password[0]);
            } else {
                setActionError('Failed to verify password. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // 2. OTP verification for completing activation
    const submitEnableOtp = async (e) => {
        e.preventDefault();
        if (suspendedSecondsLeft > 0 || otpTimeLeft <= 0) return;
        
        setLoading(true);
        setActionError('');

        try {
            const response = await axios.post(route('profile.two-factor.verify-otp'), {
                code: otpCode.join(''),
            });

            if (response.data.success) {
                setStep('success');
                setSuccessMessage(response.data.message);
                
                // Show gorgeous success state for 2.5 seconds before auto-logout redirect
                setTimeout(() => {
                    router.visit(response.data.redirect);
                }, 2500);
            }
        } catch (error) {
            if (error.response?.data?.errors?.suspended_until) {
                setSuspendedUntil(error.response.data.errors.suspended_until);
            }
            
            if (error.response?.data?.errors?.code) {
                setActionError(error.response.data.errors.code[0]);
                // Reset OTP code block inputs on error
                setOtpCode(['', '', '', '', '', '']);
                otpInputsRef.current[0]?.focus();
            } else {
                setActionError('Invalid OTP code. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // 3. Resend verification OTP code (only allowed when expired)
    const resendOtp = async () => {
        if (resending || suspendedSecondsLeft > 0 || otpTimeLeft > 0) return;

        setResending(true);
        setActionError('');

        try {
            const response = await axios.post(route('profile.two-factor.resend-otp'));

            if (response.data.success) {
                setOtpCode(['', '', '', '', '', '']);
                
                if (response.data.otp_expires_at) {
                    const now = Math.floor(Date.now() / 1000);
                    setOtpTimeLeft(Math.max(0, response.data.otp_expires_at - now));
                } else {
                    setOtpTimeLeft(300);
                }

                setSuccessMessage(response.data.message);
                setTimeout(() => setSuccessMessage(''), 4000);
                
                setTimeout(() => {
                    otpInputsRef.current[0]?.focus();
                }, 100);
            }
        } catch (error) {
            if (error.response?.data?.errors?.suspended_until) {
                setSuspendedUntil(error.response.data.errors.suspended_until);
            }

            if (error.response?.data?.errors?.code) {
                setActionError(error.response.data.errors.code[0]);
            } else {
                setActionError('Failed to resend OTP. Please try again.');
            }
        } finally {
            setResending(false);
        }
    };

    // 4. Password check for disabling
    const submitDisable = (e) => {
        e.preventDefault();

        disablePut(route('profile.two-factor'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInputRef.current?.focus(),
            onFinish: () => resetDisable('password'),
        });
    };

    // OTP Input handlers
    const handleOtpChange = (e, index) => {
        setActionError('');
        const val = e.target.value;
        if (/^[0-9]$/.test(val)) {
            const newOtp = [...otpCode];
            newOtp[index] = val;
            setOtpCode(newOtp);
            if (index < 5) {
                otpInputsRef.current[index + 1].focus();
            }
        } else if (val === '') {
            const newOtp = [...otpCode];
            newOtp[index] = '';
            setOtpCode(newOtp);
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (otpCode[index] === '') {
                if (index > 0) {
                    const newOtp = [...otpCode];
                    newOtp[index - 1] = '';
                    setOtpCode(newOtp);
                    otpInputsRef.current[index - 1].focus();
                }
            } else {
                const newOtp = [...otpCode];
                newOtp[index] = '';
                setOtpCode(newOtp);
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            otpInputsRef.current[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            otpInputsRef.current[index + 1].focus();
        }
    };

    const handleOtpPaste = (e) => {
        const pasteData = e.clipboardData.getData('text').trim();
        if (/^[0-9]{6}$/.test(pasteData)) {
            const chars = pasteData.split('');
            setOtpCode(chars);
            otpInputsRef.current[5].focus();
        }
        e.preventDefault();
    };

    const isOtpComplete = otpCode.every(char => char !== '');

    return (
        <section className={`space-y-6 ${className}`}>
            <header className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                        <KeyRound className="size-5 text-cyber-accent" />
                        Two-Factor Authentication (2FA)
                    </h2>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                        Add a secondary layer of defense to your steganographic vault.
                    </p>
                </div>
                
                {email2faEnabled ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] animate-pulse">
                        <ShieldCheck className="size-3.5 animate-bounce-subtle" />
                        ACTIVE
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-slate-500/10 text-slate-400 border border-slate-300 dark:border-cyber-border/40">
                        <ShieldAlert className="size-3.5" />
                        INACTIVE
                    </span>
                )}
            </header>

            <div className="p-5 rounded-2xl border border-slate-100 dark:border-cyber-border/40 bg-slate-50/50 dark:bg-cyber-void/30 space-y-4">
                {email2faEnabled ? (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            🔒 <strong>Email Two-Factor Authentication is active.</strong> Every time you log in to StegoLock, a secure, single-use 6-digit One-Time Password (OTP) will be sent directly to your registered email address. This ensures that only you can authorize access to your decrypted documents vault.
                        </p>
                        <DangerButton onClick={openConfirmModal} className="w-full sm:w-auto shadow-lg shadow-red-500/10 hover:shadow-red-500/20">
                            Disable 2FA Security
                        </DangerButton>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            ⚠️ <strong>Your account is currently protected by password alone.</strong> We strongly recommend enabling Email-Based Two-Factor Authentication. If enabled, anyone attempting to log into your account must confirm their identity using a dynamic code dispatched to your personal inbox.
                        </p>
                        <PrimaryButton onClick={openConfirmModal} className="w-full sm:w-auto shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 animate-pulse">
                            Enable 2FA Protection
                        </PrimaryButton>
                    </div>
                )}
            </div>

            {/* Modal: Progressive Setup Flow / Disabling Confirmation */}
            <Modal show={confirming2faChange} onClose={closeModal} maxWidth="md">
                
                {/* 1. DISABLING FLOW: Standard password check */}
                {email2faEnabled && (
                    <form onSubmit={submitDisable} className="p-6 bg-white dark:bg-cyber-surface border border-slate-200 dark:border-cyber-border/50 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                        
                        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                            <Lock className="size-5 text-red-500" />
                            Disable 2FA Security
                        </h3>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            To disable Two-Factor Authentication, please enter your current account password.
                        </p>

                        <div className="mt-6">
                            <InputLabel htmlFor="disable_password" value="Account Password" />
                            
                            <TextInput
                                id="disable_password"
                                ref={passwordInputRef}
                                type="password"
                                value={disableData.password}
                                onChange={(e) => setDisableData('password', e.target.value)}
                                className="mt-1 block w-full bg-slate-50 dark:bg-cyber-void border-slate-200 dark:border-cyber-border/40 focus:border-red-500"
                                placeholder="Enter your password"
                                isFocused
                            />

                            <InputError message={disableErrors.password} className="mt-2" />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton onClick={closeModal} disabled={disablingProcessing}>
                                Cancel
                            </SecondaryButton>

                            <DangerButton disabled={disablingProcessing}>
                                {disablingProcessing && <Loader2 className="size-4 animate-spin mr-2 text-white" />}
                                Disable 2FA
                            </DangerButton>
                        </div>
                    </form>
                )}

                {/* 2. ENABLING FLOW: Secure Progressive Verification (Password -> OTP -> Logout Success) */}
                {!email2faEnabled && (
                    <div className="bg-white dark:bg-cyber-surface border border-slate-200 dark:border-cyber-border/50 rounded-2xl relative overflow-hidden">
                        
                        {/* STEP 2.1: Password confirmation */}
                        {step === 'password' && (
                            <form onSubmit={submitEnablePassword} className="p-6">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-indigo-600"></div>
                                
                                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                                    <Lock className="size-5 text-sky-500" />
                                    Confirm Password (Step 1/2)
                                </h3>

                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Please verify your account password to begin enabling Two-Factor Authentication.
                                </p>

                                <div className="mt-6">
                                    <InputLabel htmlFor="enable_password" value="Account Password" />
                                    
                                    <TextInput
                                        id="enable_password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setActionError('');
                                        }}
                                        disabled={suspendedSecondsLeft > 0 || loading}
                                        className="mt-1 block w-full bg-slate-50 dark:bg-cyber-void border-slate-200 dark:border-cyber-border/40 focus:border-sky-500 disabled:opacity-50"
                                        placeholder="Enter your password"
                                        isFocused
                                    />

                                    {/* Real-time live countdown timer when suspended */}
                                    {suspendedSecondsLeft > 0 && (
                                        <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-black tracking-wide animate-pulse">
                                            <AlertTriangle className="size-4 animate-bounce-subtle" />
                                            <span>SUSPENDED: TRY AGAIN IN {formatSuspendedTime(suspendedSecondsLeft)}</span>
                                        </div>
                                    )}

                                    {actionError && suspendedSecondsLeft <= 0 && (
                                        <div className="mt-3 text-center animate-shake">
                                            <InputError message={actionError} className="text-xs font-bold bg-red-500/5 py-1.5 px-3.5 rounded-xl border border-red-500/10 inline-block" />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <SecondaryButton onClick={closeModal} disabled={loading}>
                                        Cancel
                                    </SecondaryButton>

                                    <PrimaryButton disabled={loading || !confirmPassword || suspendedSecondsLeft > 0}>
                                        {loading && <Loader2 className="size-4 animate-spin mr-2 text-sky-400" />}
                                        Continue Setup
                                    </PrimaryButton>
                                </div>
                            </form>
                        )}

                        {/* STEP 2.2: Email OTP validation */}
                        {step === 'otp' && (
                            <form onSubmit={submitEnableOtp} className="p-6">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-indigo-600 animate-pulse"></div>
                                
                                <div className="flex justify-between items-center gap-4">
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                                        <ShieldCheck className="size-5 text-sky-500" />
                                        Email Verification (Step 2/2)
                                    </h3>
                                    
                                    {/* Live OTP Expiration Indicator */}
                                    {otpTimeLeft > 0 ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-sky-500/10 text-sky-500 border border-sky-500/20">
                                            EXPIRES IN: {formatSuspendedTime(otpTimeLeft)}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse">
                                            CODE EXPIRED
                                        </span>
                                    )}
                                </div>

                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                    We have dispatched a 6-digit confirmation code to your registered email address. Please enter the OTP below:
                                </p>

                                <div className="mt-6 flex flex-col items-center">
                                    {/* OTP digits inputs */}
                                    <div className="flex gap-2 justify-center py-2">
                                        {otpCode.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (otpInputsRef.current[index] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(e, index)}
                                                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                                onPaste={index === 0 ? handleOtpPaste : undefined}
                                                disabled={loading || resending || suspendedSecondsLeft > 0 || otpTimeLeft <= 0}
                                                className="size-10 sm:size-11 rounded-xl text-center text-lg font-black bg-slate-50 dark:bg-cyber-void border-2 border-slate-100 dark:border-cyber-border/40 focus:border-sky-500 text-slate-900 dark:text-white shadow-inner transition-all disabled:opacity-50"
                                                autoComplete="off"
                                            />
                                        ))}
                                    </div>

                                    {/* Real-time live countdown timer when suspended */}
                                    {suspendedSecondsLeft > 0 && (
                                        <div className="mt-4 w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-black tracking-wide animate-pulse">
                                            <AlertTriangle className="size-4 animate-bounce-subtle" />
                                            <span>SUSPENDED: TRY AGAIN IN {formatSuspendedTime(suspendedSecondsLeft)}</span>
                                        </div>
                                    )}

                                    {/* Expired OTP code - Resend button */}
                                    {otpTimeLeft <= 0 && suspendedSecondsLeft <= 0 && (
                                        <div className="mt-4 text-center">
                                            <button
                                                type="button"
                                                onClick={resendOtp}
                                                disabled={resending}
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-sky-500 hover:text-sky-400 bg-sky-500/5 hover:bg-sky-500/10 border border-sky-500/20 hover:border-sky-500/30 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                                            >
                                                {resending && <Loader2 className="size-3.5 animate-spin mr-1 text-sky-500" />}
                                                Resend OTP Code
                                            </button>
                                        </div>
                                    )}

                                    {actionError && suspendedSecondsLeft <= 0 && (
                                        <div className="mt-4 text-center animate-shake">
                                            <InputError message={actionError} className="text-xs font-bold bg-red-500/5 py-1.5 px-3.5 rounded-xl border border-red-500/10 inline-block" />
                                        </div>
                                    )}

                                    {successMessage && (
                                        <div className="mt-4 flex items-center gap-1.5 text-xs font-black text-emerald-500 bg-emerald-500/5 py-1.5 px-3.5 rounded-xl border border-emerald-500/10 animate-fade-in">
                                            <span>✓ {successMessage}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <SecondaryButton onClick={closeModal} disabled={loading || resending}>
                                        Cancel
                                    </SecondaryButton>

                                    <PrimaryButton disabled={loading || resending || !isOtpComplete || otpTimeLeft <= 0 || suspendedSecondsLeft > 0}>
                                        {loading && <Loader2 className="size-4 animate-spin mr-2 text-sky-400" />}
                                        Activate 2FA
                                    </PrimaryButton>
                                </div>
                            </form>
                        )}

                        {/* STEP 2.3: Breathtaking Success & Logout Verification Card */}
                        {step === 'success' && (
                            <div className="p-8 text-center space-y-6 relative overflow-hidden animate-fade-in">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-green-500 animate-pulse"></div>
                                
                                <div className="relative inline-flex items-center justify-center p-5 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.15)] animate-bounce-subtle">
                                    <ShieldCheck className="size-12 text-emerald-500 animate-pulse" />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-black text-emerald-500 uppercase tracking-tight">
                                        2FA Activated!
                                    </h3>
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                                        {successMessage || 'Email Two-Factor Authentication has been successfully enabled! Initiating security test...'}
                                    </p>
                                </div>

                                <div className="pt-2 flex justify-center">
                                    <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/5 px-4 py-2 rounded-full border border-emerald-500/10">
                                        <Loader2 className="size-3.5 animate-spin" />
                                        LOGGING OUT TO TEST SETUP
                                    </div>
                                </div>
                            </div>
                        )}
                        
                    </div>
                )}
            </Modal>
        </section>
    );
}
