import { Link } from 'react-router';
import { BottomNav } from '../../components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Package, Weight, MapPin, Building2, ListTodo, Database, FileText, BarChart3 } from 'lucide-react';
import { mockPickupRequests, mockCollaborators } from '../../data/mockData';

export default function AdminDashboardScreen() {
  const totalDonations = mockCollaborators.reduce((sum, c) => sum + c.totalKg, 0);
  const totalPickups = mockPickupRequests.length;
  const activeCompanies = mockCollaborators.filter(c => c.type === 'company').length;

  const latestRequests = mockPickupRequests.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <h1 className="text-2xl">Admin Dashboard</h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-w-4xl mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Donations</p>
                  <p className="text-2xl mt-1">{mockPickupRequests.filter(r => r.status === 'completed').length}</p>
                </div>
                <Package className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total kg</p>
                  <p className="text-2xl mt-1">{totalDonations}</p>
                </div>
                <Weight className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pickups</p>
                  <p className="text-2xl mt-1">{totalPickups}</p>
                </div>
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Companies</p>
                  <p className="text-2xl mt-1">{activeCompanies}</p>
                </div>
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg mb-3 text-gray-900">Quick Actions</h2>
          <div className="grid gap-3">
            <Link to="/admin/requests">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <ListTodo className="w-6 h-6 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Review Pickup Requests</p>
                    <p className="text-sm text-gray-600">
                      {mockPickupRequests.filter(r => r.status === 'pending').length} pending
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Manage Locations</p>
                  <p className="text-sm text-gray-600">{mockCollaborators.length} active locations</p>
                </div>
              </CardContent>
            </Card>

            <Link to="/admin/certificates">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Create Certificates</p>
                    <p className="text-sm text-gray-600">Generate donation certificates</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/database">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <Database className="w-6 h-6 text-orange-600" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">View Donation Database</p>
                    <p className="text-sm text-gray-600">Access all records</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Latest Requests */}
        <div>
          <h2 className="text-lg mb-3 text-gray-900">Latest Requests</h2>
          <div className="space-y-2">
            {latestRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{request.requesterName}</p>
                    <p className="text-sm text-gray-600">
                      {request.estimatedWeight}kg • {request.materialType}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNav role="admin" />
    </div>
  );
}
