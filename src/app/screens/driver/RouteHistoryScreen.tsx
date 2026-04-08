import { BottomNav } from '../../components/BottomNav';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Calendar, MapPin, Weight, CheckCircle } from 'lucide-react';

export default function RouteHistoryScreen() {
  // Mock history data
  const routeHistory = [
    {
      id: '1',
      date: '2026-03-24',
      stops: 8,
      totalKg: 145,
      status: 'completed'
    },
    {
      id: '2',
      date: '2026-03-23',
      stops: 6,
      totalKg: 98,
      status: 'completed'
    },
    {
      id: '3',
      date: '2026-03-22',
      stops: 7,
      totalKg: 122,
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl text-gray-900">Route History</h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 max-w-lg mx-auto">
        {routeHistory.map((route) => (
          <Card key={route.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <p className="font-medium text-gray-900">
                      {new Date(route.date).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {route.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Stops</p>
                    <p className="font-medium">{route.stops}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total kg</p>
                    <p className="font-medium">{route.totalKg}</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <BottomNav role="driver" />
    </div>
  );
}
