import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2,} from "lucide-react";
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        redirect: new URLSearchParams(window.location.search).get('redirect') || '',
    });
    const isTimeout = new URLSearchParams(window.location.search).get('timeout') === 'session_expired';

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

            {status && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 flex items-center gap-3 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="size-5 shrink-0" />
                    <span className="text-sm font-medium">{status}</span>
                </div>
            )}

            {flash?.error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 flex items-center gap-3 text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-2 duration-500">
                    <AlertCircle className="size-5 shrink-0" />
                    <span className="text-sm font-medium">{flash.error}</span>
                </div>
            )}

            {isTimeout && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 flex items-center gap-3 text-amber-600 dark:text-amber-400 animate-in fade-in slide-in-from-top-2 duration-500">
                    <AlertCircle className="size-5 shrink-0" />
                    <span className="text-sm font-medium">
                        Your session has expired due to inactivity. Please log in again.
                    </span>
                </div>
            )}

            <div className="space-y-1 mb-8">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    Sign In
                </h2>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <input type="hidden" name="redirect" value={data.redirect} />

                <div className="space-y-2">
                    <InputLabel htmlFor="email" value="Email" />
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-cyber-accent transition-colors" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            value={data.email}
                            className="w-full pl-12 py-4"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="password" value="Password" />
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-cyber-accent transition-colors" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={data.password}
                            className="w-full pl-12 py-4"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="size-4 bg-slate-100 dark:bg-cyber-surface border-slate-200 dark:border-cyber-border text-cyber-accent rounded focus:ring-cyber-accent"
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ml-2 text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">Remember me</span>
                    </label>
                    {canResetPassword && (
                        <Link 
                            href={route('password.request')} 
                            className="text-sm text-cyber-accent-dark dark:text-cyber-accent hover:underline font-bold transition-colors"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full py-4 text-lg shadow-xl" disabled={processing}>
                        {processing ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="size-5 animate-spin" />
                                <span>Authorizing...</span>
                            </div>
                        ) : 'Log in'}
                    </PrimaryButton>
                </div>
            </form>

            <div className="mt-10 text-center">
                <p className="text-slate-500 dark:text-slate-400">
                    <Link 
                        href={route('register')} 
                        className="text-cyber-accent-dark dark:text-cyber-accent font-black uppercase tracking-widest text-[11px] hover:underline transition-all"
                    >
                        Create an account instead
                    </Link>
                </p>
            </div>
        </>
    );
}

Login.layout = page => <GuestLayout children={page} mode="login" />
