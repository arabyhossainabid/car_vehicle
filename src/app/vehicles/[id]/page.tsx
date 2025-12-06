import Link from 'next/link';
import { Vehicle, ApiResponse } from '@/types';
import BookingInterface from '@/components/BookingInterface';
import Image from 'next/image';

async function getVehicle(id: string) {
    try {
        const res = await fetch(`https://y-mauve-delta-29.vercel.app/api/v1/vehicles/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) return null;

        const data: ApiResponse<Vehicle> = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        return null;
    }
}

export default async function VehicleDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const vehicle = await getVehicle(params.id);

    if (!vehicle) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Vehicle Not Found</h2>
                    <Link href="/vehicles" className="text-cyan-400 hover:text-cyan-300">
                        Back to Fleet
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 sm:py-10 px-4 sm:px-6 max-w-7xl mx-auto pt-20 sm:pt-24">
            <Link href="/vehicles" className="inline-block mb-6 sm:mb-8 text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                ← Back to Fleet
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">

                <div>
                    <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
                        <Image
                            src="/hero-car.png"
                            alt={vehicle.vehicle_name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{vehicle.vehicle_name}</h1>
                    <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm uppercase tracking-wider">
                            {vehicle.type}
                        </span>
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm uppercase tracking-wider">
                            {vehicle.registration_number}
                        </span>
                        <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm uppercase tracking-wider border ${vehicle.availability_status === 'available'
                            ? 'border-green-500/50 text-green-400'
                            : 'border-red-500/50 text-red-400'
                            }`}>
                            {vehicle.availability_status}
                        </span>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                            Experience the pinnacle of automotive engineering with the {vehicle.vehicle_name}.
                            Perfect for city driving or long-distance cruising, this vehicle offers
                            superior comfort and performance.
                        </p>
                    </div>
                </div>

                <div>
                    <BookingInterface vehicle={vehicle} />
                </div>
            </div>
        </div>
    );
}
