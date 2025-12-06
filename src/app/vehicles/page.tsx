import VehicleCard from '@/components/VehicleCard';
import { Vehicle, ApiResponse } from '@/types';

async function getVehicles() {
    try {
        const res = await fetch('http://localhost:5000/api/v1/vehicles', {
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
        <div className="min-h-screen py-10 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Our Premium Fleet
                    </h1>
                    <p className="text-gray-400 mt-2 max-w-xl">
                        Choose from our exclusive collection of high-performance and luxury vehicles.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                        <h3 className="text-2xl font-bold text-gray-300">No Vehicles Available</h3>
                        <p className="text-gray-500 mt-2">Check back later or ensure the backend is running.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
