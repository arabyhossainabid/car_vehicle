'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        router.push('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    NEON RIDES
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="/vehicles" className="text-gray-300 hover:text-white transition-colors">
                        Vehicles
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-full border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-white hover:text-cyan-400 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
