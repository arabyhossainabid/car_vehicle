export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: 'customer' | 'admin';
}

export interface Vehicle {
    id: number;
    vehicle_name: string;
    type: 'car' | string;
    registration_number: string;
    daily_rent_price: number;
    availability_status: 'available' | 'booked';
}

export interface Booking {
    id: number;
    customer_id: number;
    vehicle_id: number;
    rent_start_date: string;
    rent_end_date: string;
    total_price: number;
    status: 'active' | 'cancelled' | 'returned';
    vehicle?: Vehicle;
    customer?: User;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: User;
    };
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
