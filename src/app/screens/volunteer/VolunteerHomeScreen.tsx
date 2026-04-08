import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { BottomNav } from '../../components/BottomNav';
import { Package, FileText, User, HelpCircle, Calendar, MapPin } from 'lucide-react';

export default function VolunteerHomeScreen() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <h1 className="text-2xl">Hello, {user?.name?.split(' ')[0]}</h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Request Pickup CTA */}
        <Link to="/volunteer/request-pickup">
          <Button className="w-full h-14 text-lg bg-green-600 hover:bg-green-700">
            Request Pickup
          </Button>
        </Link>

        {/* Upcoming Pickup */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Pickup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5 text-green-600" />
              <span>Tue 10:30 AM</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-green-600" />
              <span>Av. Central 123</span>
            </div>
            <Link to="/volunteer/donations">
              <Button variant="outline" className="w-full mt-2">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div>
          <h2 className="text-lg mb-3 text-gray-900">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/volunteer/donations">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Package className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm text-center text-gray-700">Past Donations</span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/volunteer/certificates">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <FileText className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm text-center text-gray-700">Certificates</span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/volunteer/profile">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <User className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm text-center text-gray-700">My Profile</span>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <HelpCircle className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-sm text-center text-gray-700">Help</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BottomNav role="volunteer" />
    </div>
  );
}