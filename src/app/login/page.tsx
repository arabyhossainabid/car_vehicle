'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { AuthResponse } from '@/types';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetchAPI<AuthResponse>('/auth/signin', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            if (res.success) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                // Force reload or event dispatch could be needed for Navbar update
                // simple router push and full reload
                window.location.href = '/dashboard';
            } else {
                setError(res.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred during login');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 sm:py-16 pt-24 sm:pt-28">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-white">Welcome Back</h2>

                {error && (
                    <div className="p-3 mb-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-xs sm:text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm sm:text-base"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-4 sm:mt-6 text-center text-gray-400 text-xs sm:text-sm">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-cyan-400 hover:text-cyan-300">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
