import { createBrowserRouter, Navigate } from 'react-router';

// Screens
import LoginScreen from './screens/LoginScreen';

// Volunteer screens
import VolunteerHomeScreen from './screens/volunteer/VolunteerHomeScreen';
import RequestPickupScreen from './screens/volunteer/RequestPickupScreen';
import DonationDetailsScreen from './screens/volunteer/DonationDetailsScreen';
import PickupConfirmationScreen from './screens/volunteer/PickupConfirmationScreen';
import PastDonationsScreen from './screens/volunteer/PastDonationsScreen';
import CertificatesScreen from './screens/volunteer/CertificatesScreen';

// Admin screens
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import PickupRequestsScreen from './screens/admin/PickupRequestsScreen';
import DonationDatabaseScreen from './screens/admin/DonationDatabaseScreen';
import CreateCertificateScreen from './screens/admin/CreateCertificateScreen';
import ReportsScreen from './screens/admin/ReportsScreen';

// Driver screens
import DriverHomeScreen from './screens/driver/DriverHomeScreen';
import StopDetailScreen from './screens/driver/StopDetailScreen';
import RouteHistoryScreen from './screens/driver/RouteHistoryScreen';

// Shared
import ProfileScreen from './screens/ProfileScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginScreen />
  },
  // Volunteer routes
  {
    path: '/volunteer',
    element: <VolunteerHomeScreen />
  },
  {
    path: '/volunteer/request-pickup',
    element: <RequestPickupScreen />
  },
  {
    path: '/volunteer/donation-details',
    element: <DonationDetailsScreen />
  },
  {
    path: '/volunteer/pickup-confirmation',
    element: <PickupConfirmationScreen />
  },
  {
    path: '/volunteer/donations',
    element: <PastDonationsScreen />
  },
  {
    path: '/volunteer/certificates',
    element: <CertificatesScreen />
  },
  {
    path: '/volunteer/profile',
    element: <ProfileScreen />
  },
  // Admin routes
  {
    path: '/admin',
    element: <AdminDashboardScreen />
  },
  {
    path: '/admin/requests',
    element: <PickupRequestsScreen />
  },
  {
    path: '/admin/database',
    element: <DonationDatabaseScreen />
  },
  {
    path: '/admin/certificates',
    element: <CreateCertificateScreen />
  },
  {
    path: '/admin/reports',
    element: <ReportsScreen />
  },
  {
    path: '/admin/profile',
    element: <ProfileScreen />
  },
  // Driver routes
  {
    path: '/driver',
    element: <DriverHomeScreen />
  },
  {
    path: '/driver/stop/:stopId',
    element: <StopDetailScreen />
  },
  {
    path: '/driver/stops',
    element: <DriverHomeScreen />
  },
  {
    path: '/driver/history',
    element: <RouteHistoryScreen />
  },
  {
    path: '/driver/profile',
    element: <ProfileScreen />
  },
  // Catch all
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);
