'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Vehicle, Booking, ApiResponse } from '@/types';
import { fetchAPI } from '@/lib/api';

interface BookingInterfaceProps {
    vehicle: Vehicle;
}

export default function BookingInterface({ vehicle }: BookingInterfaceProps) {
    const router = useRouter();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const calculateTotal = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays * vehicle.daily_rent_price : 0;
    };

    const handleBooking = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push(`/login?redirect=/vehicles/${vehicle.id}`);
            return;
        }

        // Decode token or get user id from localStorage if stored properly
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            // invalid state
            router.push('/login');
            return;
        }
        const user = JSON.parse(userStr);

        setLoading(true);
        setError('');

        try {
            const res = await fetchAPI<ApiResponse<Booking>>('/bookings', {
                method: 'POST',
                body: JSON.stringify({
                    customer_id: user.id,
                    vehicle_id: vehicle.id,
                    rent_start_date: startDate,
                    rent_end_date: endDate,
                }),
            });

            if (res.success) {
                router.push('/dashboard');
            } else {
                setError(res.message || 'Booking failed');
            }
        } catch (err) {
            setError('An error occurred');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = calculateTotal();

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-md">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Book This Vehicle</h3>

            {error && (
                <div className="p-3 mb-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-3 sm:space-y-4">
                <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors scheme-dark"
                    />
                </div>

                <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-1">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500 transition-colors scheme-dark"
                    />
                </div>

                <div className="py-3 sm:py-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-400">Total Price</span>
                    <span className="text-2xl sm:text-3xl font-bold text-cyan-400">${totalPrice}</span>
                </div>

                <button
                    onClick={handleBooking}
                    disabled={loading || !startDate || !endDate || totalPrice <= 0}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base sm:text-lg rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:shadow-none"
                >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
            </div>
        </div>
    );
}
