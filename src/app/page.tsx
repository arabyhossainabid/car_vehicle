import Link from 'next/link';
import Image from 'next/image';
import VehicleCard from '@/components/VehicleCard';
import { Vehicle, ApiResponse } from '@/types';

async function getVehicles() {
  try {
    const res = await fetch('http://localhost:5000/api/v1/vehicles', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const data: ApiResponse<Vehicle[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
}

export default async function Home() {
  const vehicles = await getVehicles();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
          <Image
            src="/hero-car.png"
            alt="Neon Hero Car"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        <div className="relative z-20 text-center max-w-4xl px-6">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              DRIVE THE
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
              FUTURE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Experience the thrill of premium electric and luxury vehicles.
            Instant booking, zero hassle.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/vehicles"
              className="px-8 py-4 bg-cyan-500 text-black font-bold text-lg rounded-full hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300"
            >
              Browse Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Featured Fleet</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full" />
          </div>
          <Link href="/vehicles" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            View All <span>→</span>
          </Link>
        </div>

        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-gray-300 mb-4">System Offline / No Vehicles</h3>
            <p className="text-gray-500 mb-6">Could not connect to the fleet server or no vehicles available.</p>
            <p className="text-xs text-gray-600 font-mono">Ensure backend is running on http://localhost:5000</p>
          </div>
        )}
      </section>
    </div>
  );
}