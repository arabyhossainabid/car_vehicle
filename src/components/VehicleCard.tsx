import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/types';

interface VehicleCardProps {
    vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    const getVehicleImage = (id: number) => {
        const imageIndex = ((id - 1) % 3) + 1;
        return `/vehicle-${imageIndex}.png`;
    };

    return (
        <div className="group relative bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)]">
            <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 z-10" />
                <Image
                    src={getVehicleImage(vehicle.id)}
                    alt={vehicle.vehicle_name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                            {vehicle.vehicle_name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mt-1">{vehicle.type}</p>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${vehicle.availability_status === 'available'
                        ? 'border-green-500/50 text-green-400 bg-green-500/10'
                        : 'border-red-500/50 text-red-400 bg-red-500/10'
                        }`}>
                        {vehicle.availability_status}
                    </span>
                </div>

                <div className="flex items-end justify-between mt-4 sm:mt-6 gap-3">
                    <div>
                        <p className="text-xs sm:text-sm text-gray-400">Daily Rate</p>
                        <p className="text-xl sm:text-2xl font-bold text-white">${vehicle.daily_rent_price}</p>
                    </div>

                    <Link
                        href={`/vehicles/${vehicle.id}`}
                        className="px-3 sm:px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors text-sm sm:text-base whitespace-nowrap"
                    >
                        Rent Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
