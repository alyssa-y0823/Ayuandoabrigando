import { Home, Package, FileText, User, LayoutDashboard, ListTodo, Database, BarChart3, Route, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { UserRole } from '../context/AuthContext';

interface BottomNavProps {
  role: UserRole;
}

export function BottomNav({ role }: BottomNavProps) {
  const location = useLocation();

  const volunteerLinks = [
    { to: '/volunteer', icon: Home, label: 'Home' },
    { to: '/volunteer/donations', icon: Package, label: 'Donations' },
    { to: '/volunteer/certificates', icon: FileText, label: 'Certificates' },
    { to: '/volunteer/profile', icon: User, label: 'Profile' }
  ];

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/requests', icon: ListTodo, label: 'Requests' },
    { to: '/admin/database', icon: Database, label: 'Database' },
    { to: '/admin/reports', icon: BarChart3, label: 'Reports' }
  ];

  const driverLinks = [
    { to: '/driver', icon: Route, label: 'Route' },
    { to: '/driver/stops', icon: MapPin, label: 'Stops' },
    { to: '/driver/history', icon: Package, label: 'History' },
    { to: '/driver/profile', icon: User, label: 'Profile' }
  ];

  const links = role === 'volunteer' ? volunteerLinks : role === 'admin' ? adminLinks : driverLinks;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
