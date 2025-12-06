import VehicleCard from '@/components/VehicleCard';
import { Vehicle, ApiResponse } from '@/types';

async function getVehicles() {
    try {
        const res = await fetch('https://y-mauve-delta-29.vercel.app/api/v1/vehicles', {
            cache: 'no-store',
        });

        if (!res.ok) throw new Error('Failed to fetch');
        const data: ApiResponse<Vehicle[]> = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        return [];
    }
}

export default async function VehiclesPage() {
    const vehicles = await getVehicles();

    return (
        <div className="min-h-screen py-8 sm:py-10 px-4 sm:px-6 max-w-7xl mx-auto pt-20 sm:pt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 border-b border-white/10 pb-6 sm:pb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Our Premium Fleet
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400 mt-2 max-w-xl">
                        Choose from our exclusive collection of high-performance and luxury vehicles.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 sm:py-16 md:py-20 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 px-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-300">No Vehicles Available</h3>
                        <p className="text-sm sm:text-base text-gray-500 mt-2">Check back later or ensure the backend is running.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
