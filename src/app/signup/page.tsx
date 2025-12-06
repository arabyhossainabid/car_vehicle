'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { AuthResponse } from '@/types';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'customer' // Default role
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // The API endpoint for signup is /auth/signup
            // Expects name, email, password, phone, role
            const res = await fetchAPI<AuthResponse>('/auth/signup', {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            if (res.success) {
                // Automatically login or redirect to login?
                // Let's redirect to login for simplicity as the response might not return a token (API docs say "User registered successfully", data: user info, not token)
                router.push('/login?registered=true');
            } else {
                setError(res.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred during registration');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Create Account</h2>

                {error && (
                    <div className="p-3 mb-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                        <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                            placeholder="+1234567890"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                            placeholder="Create a password"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 mt-4"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-purple-400 hover:text-purple-300">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
