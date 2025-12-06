# Vehicle Rental System - Frontend

A modern, premium vehicle rental platform built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Features a stunning neon-themed UI with full authentication and booking management.

## 🚀 Features

### User Features
- **Authentication**: Secure login and signup with JWT tokens
- **Vehicle Browsing**: Browse available vehicles with real-time availability
- **Booking System**: Book vehicles with automatic price calculation
- **Dashboard**: View and manage your bookings
- **Cancel Bookings**: Cancel active bookings before start date

### Admin Features
- **Vehicle Management**: Add, edit, and delete vehicles
- **Booking Overview**: View all bookings across the system
- **User Management**: View all registered users
- **Mark Returns**: Mark bookings as returned and update vehicle availability

## 🎨 Design

- **Neon Cyberpunk Theme**: Dark background with cyan and purple gradients
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Hover effects and transitions throughout
- **Responsive Design**: Mobile-first approach, works on all devices
- **Custom Scrollbar**: Styled scrollbar matching the theme

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks
- **API Integration**: Fetch API with custom wrapper
- **Image Optimization**: Next.js Image component

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── add-vehicle/
│   │   ├── edit-vehicle/[id]/
│   │   └── page.tsx
│   ├── login/
│   ├── signup/
│   ├── vehicles/
│   │   ├── [id]/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── VehicleCard.tsx
│   └── BookingInterface.tsx
├── lib/
│   └── api.ts
└── types/
    └── index.ts
```

## 🔧 Setup & Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd car_vehicle
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Environment Setup**
Make sure your backend is running on `http://localhost:5000`

4. **Run development server**
```bash
pnpm dev
# or
npm run dev
```

5. **Open in browser**
Navigate to `http://localhost:3000`

## 🔌 API Integration

The frontend connects to the backend API at `http://localhost:5000/api/v1`. All endpoints are documented in the API reference.

### Key Endpoints Used:
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `GET /vehicles` - Get all vehicles
- `GET /vehicles/:id` - Get vehicle details
- `POST /bookings` - Create booking
- `GET /bookings` - Get user bookings
- `PUT /bookings/:id` - Update booking status

## 👤 User Roles

### Customer
- Browse and book vehicles
- View personal bookings
- Cancel own bookings

### Admin
- All customer features
- Add/edit/delete vehicles
- View all bookings and users
- Mark bookings as returned

## 🎯 Key Features Implementation

### Authentication Flow
1. User signs up or logs in
2. JWT token stored in localStorage
3. Token automatically attached to API requests
4. Navbar updates based on auth state

### Booking Flow
1. User selects vehicle
2. Chooses start and end dates
3. System calculates total price
4. Booking created with customer and vehicle IDs
5. Vehicle status updated to "booked"

### Admin Management
1. Admin can add new vehicles
2. Edit existing vehicle details
3. Delete vehicles (if no active bookings)
4. Mark bookings as returned (updates vehicle availability)

## 🎨 Design System

### Colors
- **Primary**: Cyan (#06b6d4)
- **Secondary**: Blue (#3b82f6)
- **Accent**: Purple (#a855f7)
- **Background**: Black (#000000)
- **Surface**: White with 5% opacity

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, gradient text
- **Body**: Regular, gray-300

## 📱 Pages

1. **Home** (`/`) - Hero section with featured vehicles
2. **Vehicles** (`/vehicles`) - All available vehicles
3. **Vehicle Detail** (`/vehicles/[id]`) - Single vehicle with booking interface
4. **Login** (`/login`) - User authentication
5. **Signup** (`/signup`) - User registration
6. **Dashboard** (`/dashboard`) - User/Admin dashboard with tabs
7. **Add Vehicle** (`/dashboard/add-vehicle`) - Admin only
8. **Edit Vehicle** (`/dashboard/edit-vehicle/[id]`) - Admin only

## 🔒 Security

- JWT token authentication
- Protected routes (dashboard requires login)
- Role-based access control
- Input validation on forms
- Secure API communication

## 🚀 Deployment

Build for production:
```bash
pnpm build
pnpm start
```

## 📝 Notes

- Ensure backend is running before starting frontend
- Default role for new users is "customer"
- Admin users must be created via backend or database
- Vehicle images use placeholders (can be extended with real uploads)

## 🤝 Contributing

This is a full-stack vehicle rental system. Backend repository: [Link to backend]

---

Built with ❤️ using Next.js and Tailwind CSS
