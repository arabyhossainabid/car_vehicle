'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setIsMobileMenuOpen(false);
        router.push('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    NEON RIDES
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4 lg:gap-6">
                    <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
                        Home
                    </Link>
                    <Link href="/vehicles" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
                        Vehicles
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-full border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors text-sm lg:text-base"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3 lg:gap-4">
                            <Link
                                href="/login"
                                className="text-white hover:text-cyan-400 transition-colors text-sm lg:text-base"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="px-4 lg:px-6 py-1.5 lg:py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity text-sm lg:text-base"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-white p-2"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
                    <div className="px-4 py-4 space-y-3">
                        <Link
                            href="/"
                            className="block text-gray-300 hover:text-white transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/vehicles"
                            className="block text-gray-300 hover:text-white transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Vehicles
                        </Link>

                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="block text-gray-300 hover:text-white transition-colors py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-0 py-2 rounded-full border-0 text-red-400 hover:text-red-300 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block text-white hover:text-cyan-400 transition-colors py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="block w-full text-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
