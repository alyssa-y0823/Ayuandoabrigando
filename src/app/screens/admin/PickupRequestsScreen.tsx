import { useState } from 'react';
import { BottomNav } from '../../components/BottomNav';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { MapPin, Calendar, Weight, Phone, ListTodo, CheckCircle } from 'lucide-react';
import { mockPickupRequests } from '../../data/mockData';

export default function PickupRequestsScreen() {
  const [activeTab, setActiveTab] = useState('pending');

  const pendingRequests = mockPickupRequests.filter(r => r.status === 'pending');
  const scheduledRequests = mockPickupRequests.filter(r => r.status === 'scheduled');
  const completedRequests = mockPickupRequests.filter(r => r.status === 'completed');

  const renderRequest = (request: typeof mockPickupRequests[0]) => (
    <Card key={request.id} className="mb-3">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{request.requesterName}</h3>
            <Badge variant="secondary" className="mt-1">
              {request.collaboratorType}
            </Badge>
          </div>
          <Badge 
            variant={request.status === 'completed' ? 'default' : 'secondary'}
            className={
              request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              request.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }
          >
            {request.status}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Weight className="w-4 h-4" />
            <span>{request.estimatedWeight}kg • {request.conditions.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{request.address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Requested: {request.preferredDate} at {request.preferredTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{request.contactPerson} • {request.phone}</span>
          </div>
        </div>

        {request.status === 'pending' && (
          <div className="flex gap-2 pt-2">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              Accept
            </Button>
            <Button variant="outline" className="flex-1">
              Reassign
            </Button>
            <Button variant="destructive" className="flex-1">
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl text-gray-900">Pickup Requests</h1>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white border-b px-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="pending">
              Pending ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="scheduled">
              Scheduled ({scheduledRequests.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedRequests.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4 max-w-4xl mx-auto">
          <TabsContent value="pending" className="mt-0">
            {pendingRequests.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <ListTodo className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No pending requests</p>
              </div>
            ) : (
              pendingRequests.map(renderRequest)
            )}
          </TabsContent>

          <TabsContent value="scheduled" className="mt-0">
            {scheduledRequests.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No scheduled requests</p>
              </div>
            ) : (
              scheduledRequests.map(renderRequest)
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            {completedRequests.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No completed requests</p>
              </div>
            ) : (
              completedRequests.map(renderRequest)
            )}
          </TabsContent>
        </div>
      </Tabs>

      <BottomNav role="admin" />
    </div>
  );
}