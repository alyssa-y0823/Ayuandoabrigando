# Technify - Ayudando Abrigando

A comprehensive logistics and recycling management application for tracking plastic bottle donations and recycling operations.

## Overview

Technify helps manage the entire recycling donation flow from pickup requests to route optimization and certificate generation. The app supports three user roles: Volunteers, Admins, and Drivers.

## User Roles

### 1. Volunteer
Individuals or organizations who donate recyclable materials.

**Features:**
- Request pickup for donations
- Track past donations
- View donation certificates
- See carbon footprint impact

**Screens:**
- Home
- Request Pickup (multi-step form)
- Past Donations (with search/filter)
- Certificates & Reports

### 2. Admin
Administrative staff who manage the recycling operations.

**Features:**
- Dashboard with KPIs
- Review and manage pickup requests
- Access donation database
- Generate certificates
- View reports and rankings

**Screens:**
- Dashboard
- Pickup Requests (pending/scheduled/completed)
- Donation Database (searchable table)
- Create Certificate
- Reports (ranking, carbon footprint)

### 3. Driver
Drivers who collect recyclable materials along optimized routes.

**Features:**
- View daily route and stops
- Log bag collection details
- Track arrival/dispatch/departure times
- Take photos of donations
- View route history

**Screens:**
- Route Overview
- Stop Details (with bag logging)
- Route History

## Key Features

### Donation Tracking
- Material types (plastic bottles, tops, mixed)
- Bag sizes (small 1kg, medium 2.5kg, large 3.5kg, gallon 2kg)
- Conditions (crushed, uncrushed, contaminated, etc.)
- Photo capture

### Carbon Footprint Calculation
Based on rPET recycling, the app calculates resource savings:
- Water saved (39.26 L/kg)
- Fuel saved (0.5 L/kg)
- Energy saved (5.03 kWh/kg)
- Ethylene avoided (1.03 kg/kg)
- CO₂ avoided (3 kg/kg)
- Plastic waste avoided (38 m³/kg)

### Certificates
- Donation certificates showing total kg and garments recycled
- Carbon footprint reports
- Downloadable PDFs (mock functionality)

### Routing
- Google Maps integration (mock - button provided)
- Optimized pickup routes
- Multiple stop management
- Drop-off point tracking

## Tech Stack

- **Frontend:** React with TypeScript
- **Routing:** React Router v7 (Data mode)
- **UI Components:** Custom components built with Radix UI
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **State Management:** React Context API

## Project Structure

```
/src/app/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── BottomNav.tsx    # Role-based navigation
│   └── Logo.tsx         # App logo
├── context/
│   └── AuthContext.tsx  # Authentication & user state
├── data/
│   └── mockData.ts      # Mock data and calculations
├── screens/
│   ├── volunteer/       # Volunteer flow screens
│   ├── admin/           # Admin flow screens
│   ├── driver/          # Driver flow screens
│   ├── LoginScreen.tsx
│   └── ProfileScreen.tsx
├── routes.tsx           # React Router configuration
└── App.tsx             # Main app component
```

## Getting Started

1. The app opens to a login screen
2. Select a role (Volunteer, Admin, or Driver)
3. Enter any email/password (authentication is mocked)
4. Navigate through the role-specific interface

## Demo Users

All roles are accessible with any credentials. Just select the desired role on login.

## Future Enhancements

- Real backend integration with Supabase
- Actual Google Maps route optimization
- Real-time photo upload to cloud storage
- PDF generation for certificates
- Push notifications for pickup reminders
- Analytics dashboard for admins
- Multi-language support

## Notes

- All data is currently mocked for demonstration
- No actual backend persistence
- Google Maps integration is UI-only
- PDF downloads are placeholder buttons
- Camera functionality uses browser file input
