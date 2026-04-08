import { Link } from 'react-router';
import { BottomNav } from '../../components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { MapPin, Clock, Navigation, Phone } from 'lucide-react';
import { mockRouteStops } from '../../data/mockData';

export default function DriverHomeScreen() {
  const totalStops = mockRouteStops.length;
  const totalDistance = '3h 20m'; // Mock ETA

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl mb-2">Driver Route</h1>
        <p className="text-blue-100">Today's route overview</p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Route Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle>Today's Route</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Stops</p>
                <p className="text-3xl text-blue-600">{totalStops}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">ETA Total</p>
                <p className="text-3xl text-blue-600">{totalDistance}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Start</p>
                  <p className="font-medium">Recycling Center</p>
                </div>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Navigation className="w-4 h-4 mr-2" />
              Open in Google Maps
            </Button>
          </CardContent>
        </Card>

        {/* Stop List */}
        <div>
          <h2 className="text-lg mb-3 text-gray-900">Stop List</h2>
          <div className="space-y-3">
            {mockRouteStops.map((stop) => (
              <Card key={stop.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      {stop.order}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-medium text-gray-900">{stop.locationName}</h3>
                        <Badge variant={stop.status === 'completed' ? 'default' : 'secondary'}>
                          {stop.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{stop.scheduledTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{stop.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{stop.contactPerson}</span>
                        </div>
                      </div>
                      <Link to={`/driver/stop/${stop.id}`}>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Start Route Button */}
        <Button className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg">
          Start Route
        </Button>
      </div>

      <BottomNav role="driver" />
    </div>
  );
}
