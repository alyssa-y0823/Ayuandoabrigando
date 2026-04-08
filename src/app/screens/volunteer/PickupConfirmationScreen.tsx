import { useNavigate, useLocation } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { CheckCircle, MapPin, Calendar, Weight, RotateCw } from 'lucide-react';

export default function PickupConfirmationScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const requestData = location.state?.requestData;

  const requestId = '#' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Confirmation Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Pickup Requested</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Request ID:</span>
                <span className="font-medium">{requestId}</span>
              </div>

              <div className="flex items-start gap-3 py-2 border-b">
                <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">Pickup Point:</p>
                  <p className="font-medium">{requestData?.address || 'Av. Central 123'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2 border-b">
                <RotateCw className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">Frequency:</p>
                  <p className="font-medium capitalize">{requestData?.frequency || 'Weekly'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2 border-b">
                <Weight className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">Est. Weight:</p>
                  <p className="font-medium">{requestData?.estimatedWeight || 12}kg</p>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">Scheduled Time:</p>
                  <p className="font-medium">
                    {requestData?.preferredDate && requestData?.preferredTime
                      ? `${new Date(requestData.preferredDate).toLocaleDateString()} at ${requestData.preferredTime}`
                      : 'Tue 10:30 AM'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/volunteer/certificates')}
              >
                View Certificate History
              </Button>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => navigate('/volunteer')}
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
