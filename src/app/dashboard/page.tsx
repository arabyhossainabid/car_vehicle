'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { Booking, User, Vehicle, ApiResponse } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'bookings' | 'vehicles' | 'users'>('bookings');

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!userStr || !token) {
            router.push('/login');
            return;
        }

        const userData = JSON.parse(userStr);
        setUser(userData);
        loadData(userData);
    }, [router]);

    const loadData = async (userData: User) => {
        setLoading(true);
        try {
            // Load bookings
            const bookingsRes = await fetchAPI<ApiResponse<Booking[]>>('/bookings');
            if (bookingsRes.success) {
                setBookings(bookingsRes.data);
            }

            // If admin, load vehicles and users
            if (userData.role === 'admin') {
                const vehiclesRes = await fetchAPI<ApiResponse<Vehicle[]>>('/vehicles');
                if (vehiclesRes.success) {
                    setVehicles(vehiclesRes.data);
                }

                const usersRes = await fetchAPI<ApiResponse<User[]>>('/users');
                if (usersRes.success) {
                    setUsers(usersRes.data);
                }
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId: number) => {
        if (!confirm('Are you sure you want to cancel this booking?')) return;

        try {
            const res = await fetchAPI<ApiResponse<Booking>>(`/bookings/${bookingId}`, {
                method: 'PUT',
                body: JSON.stringify({ status: 'cancelled' }),
            });

            if (res.success) {
                alert('Booking cancelled successfully');
                loadData(user!);
            } else {
                alert(res.message || 'Failed to cancel booking');
            }
        } catch (error) {
            alert('An error occurred');
            console.error(error);
        }
    };

    const handleMarkReturned = async (bookingId: number) => {
        if (!confirm('Mark this booking as returned?')) return;

        try {
            const res = await fetchAPI<ApiResponse<Booking>>(`/bookings/${bookingId}`, {
                method: 'PUT',
                body: JSON.stringify({ status: 'returned' }),
            });

            if (res.success) {
                alert('Booking marked as returned');
                loadData(user!);
            } else {
                alert(res.message || 'Failed to update booking');
            }
        } catch (error) {
            alert('An error occurred');
            console.error(error);
        }
    };

    const handleDeleteVehicle = async (vehicleId: number) => {
        if (!confirm('Are you sure you want to delete this vehicle?')) return;

        try {
            const res = await fetchAPI<ApiResponse<{ message?: string }>>(`/vehicles/${vehicleId}`, {
                method: 'DELETE',
            });

            if (res.success) {
                alert('Vehicle deleted successfully');
                loadData(user!);
            } else {
                alert(res.message || 'Failed to delete vehicle');
            }
        } catch (error) {
            alert('An error occurred');
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-cyan-400 animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 sm:py-10 px-4 sm:px-6 max-w-7xl mx-auto pt-20 sm:pt-24">
            {/* Header */}
            <div className="mb-6 sm:mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                    Welcome, <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">{user?.name}</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-400">
                    {user?.role === 'admin' ? 'Admin Dashboard' : 'Your Bookings & Account'}
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-white/10 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('bookings')}
                    className={`px-4 sm:px-6 py-2 sm:py-3 font-medium transition-colors border-b-2 whitespace-nowrap text-sm sm:text-base ${activeTab === 'bookings'
                            ? 'border-cyan-500 text-cyan-400'
                            : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                >
                    Bookings
                </button>
                {user?.role === 'admin' && (
                    <>
                        <button
                            onClick={() => setActiveTab('vehicles')}
                            className={`px-4 sm:px-6 py-2 sm:py-3 font-medium transition-colors border-b-2 whitespace-nowrap text-sm sm:text-base ${activeTab === 'vehicles'
                                    ? 'border-cyan-500 text-cyan-400'
                                    : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            Vehicles
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`px-4 sm:px-6 py-2 sm:py-3 font-medium transition-colors border-b-2 whitespace-nowrap text-sm sm:text-base ${activeTab === 'users'
                                    ? 'border-cyan-500 text-cyan-400'
                                    : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            Users
                        </button>
                    </>
                )}
            </div>

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
                <div>
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold">
                            {user?.role === 'admin' ? 'All Bookings' : 'My Bookings'}
                        </h2>
                    </div>

                    {bookings.length > 0 ? (
                        <div className="grid gap-4 sm:gap-6">
                            {bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-cyan-500/50 transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg sm:text-xl font-bold mb-2">
                                                {booking.vehicle?.vehicle_name || `Vehicle #${booking.vehicle_id}`}
                                            </h3>
                                            {user?.role === 'admin' && booking.customer && (
                                                <p className="text-xs sm:text-sm text-gray-400 mb-2 break-words">
                                                    Customer: {booking.customer.name} ({booking.customer.email})
                                                </p>
                                            )}
                                            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                                                <span>📅 {booking.rent_start_date} → {booking.rent_end_date}</span>
                                                <span>💰 ${booking.total_price}</span>
                                                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'active'
                                                        ? 'bg-green-500/10 text-green-400 border border-green-500/50'
                                                        : booking.status === 'cancelled'
                                                            ? 'bg-red-500/10 text-red-400 border border-red-500/50'
                                                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/50'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 flex-shrink-0">
                                            {booking.status === 'active' && user?.role === 'customer' && (
                                                <button
                                                    onClick={() => handleCancelBooking(booking.id)}
                                                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm sm:text-base"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            {booking.status === 'active' && user?.role === 'admin' && (
                                                <button
                                                    onClick={() => handleMarkReturned(booking.id)}
                                                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-sm sm:text-base"
                                                >
                                                    Mark Returned
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 sm:py-16 md:py-20 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 px-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-300 mb-4">No Bookings Found</h3>
                            <Link href="/vehicles" className="text-cyan-400 hover:text-cyan-300 text-sm sm:text-base">
                                Browse Vehicles →
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {/* Vehicles Tab (Admin Only) */}
            {activeTab === 'vehicles' && user?.role === 'admin' && (
                <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
                        <h2 className="text-xl sm:text-2xl font-bold">Manage Vehicles</h2>
                        <Link
                            href="/dashboard/add-vehicle"
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base whitespace-nowrap"
                        >
                            + Add Vehicle
                        </Link>
                    </div>

                    <div className="grid gap-4 sm:gap-6">
                        {vehicles.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-cyan-500/50 transition-colors"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg sm:text-xl font-bold mb-2">{vehicle.vehicle_name}</h3>
                                        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                                            <span>🚗 {vehicle.type}</span>
                                            <span>🔢 {vehicle.registration_number}</span>
                                            <span>💵 ${vehicle.daily_rent_price}/day</span>
                                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${vehicle.availability_status === 'available'
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/50'
                                                    : 'bg-red-500/10 text-red-400 border border-red-500/50'
                                                }`}>
                                                {vehicle.availability_status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 flex-shrink-0">
                                        <Link
                                            href={`/dashboard/edit-vehicle/${vehicle.id}`}
                                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-sm sm:text-base"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteVehicle(vehicle.id)}
                                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm sm:text-base"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Users Tab (Admin Only) */}
            {activeTab === 'users' && user?.role === 'admin' && (
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Manage Users</h2>

                    <div className="grid gap-4 sm:gap-6">
                        {users.map((u) => (
                            <div
                                key={u.id}
                                className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-cyan-500/50 transition-colors"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg sm:text-xl font-bold mb-2">{u.name}</h3>
                                        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                                            <span className="break-all">📧 {u.email}</span>
                                            <span>📱 {u.phone}</span>
                                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${u.role === 'admin'
                                                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/50'
                                                    : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50'
                                                }`}>
                                                {u.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
