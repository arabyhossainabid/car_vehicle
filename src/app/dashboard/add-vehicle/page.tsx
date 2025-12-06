'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import Link from 'next/link';

export default function AddVehiclePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        vehicle_name: '',
        type: 'car',
        registration_number: '',
        daily_rent_price: '',
        availability_status: 'available',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetchAPI<any>('/vehicles', {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    daily_rent_price: parseFloat(formData.daily_rent_price),
                }),
            });

            if (res.success) {
                router.push('/dashboard');
            } else {
                setError(res.message || 'Failed to add vehicle');
            }
        } catch (err) {
            setError('An error occurred');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen py-10 px-6 max-w-2xl mx-auto">
            <Link href="/dashboard" className="inline-block mb-8 text-gray-400 hover:text-white transition-colors">
                ← Back to Dashboard
            </Link>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h1 className="text-3xl font-bold mb-6">Add New Vehicle</h1>

                {error && (
                    <div className="p-3 mb-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Vehicle Name</label>
                        <input
                            name="vehicle_name"
                            type="text"
                            value={formData.vehicle_name}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                            placeholder="Toyota Camry 2024"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                        <input
                            name="type"
                            type="text"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                            placeholder="car, suv, truck, etc."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Registration Number</label>
                        <input
                            name="registration_number"
                            type="text"
                            value={formData.registration_number}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                            placeholder="ABC-1234"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Daily Rent Price ($)</label>
                        <input
                            name="daily_rent_price"
                            type="number"
                            step="0.01"
                            value={formData.daily_rent_price}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                            placeholder="50.00"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Availability Status</label>
                        <select
                            name="availability_status"
                            value={formData.availability_status}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                        >
                            <option value="available">Available</option>
                            <option value="booked">Booked</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {loading ? 'Adding Vehicle...' : 'Add Vehicle'}
                    </button>
                </form>
            </div>
        </div>
    );
}
