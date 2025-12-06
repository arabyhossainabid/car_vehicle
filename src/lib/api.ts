const BASE_URL = 'https://y-mauve-delta-29.vercel.app/api/v1';

export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await res.json();

    // You might want to throw error if !data.success, but sometimes we want to read the message.
    // For simplicity, let's return the whole response.
    return data;
}
