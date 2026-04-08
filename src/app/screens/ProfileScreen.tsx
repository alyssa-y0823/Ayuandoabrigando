import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { BottomNav } from '../components/BottomNav';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { User, Mail, Phone, LogOut, Settings } from 'lucide-react';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl">{user.name}</h1>
            <p className="text-green-100 capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* User Info */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3 py-2">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            {user.phone && (
              <div className="flex items-center gap-3 py-2 border-t">
                <Phone className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <User className="w-5 h-5 mr-3" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>

      <BottomNav role={user.role} />
    </div>
  );
}
