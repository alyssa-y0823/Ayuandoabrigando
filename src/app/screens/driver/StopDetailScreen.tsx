import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Checkbox } from '../../components/ui/checkbox';
import { ArrowLeft, Phone, MapPin, Camera, Plus, Trash2 } from 'lucide-react';
import { mockRouteStops, Bag } from '../../data/mockData';

export default function StopDetailScreen() {
  const navigate = useNavigate();
  const { stopId } = useParams();
  const stop = mockRouteStops.find(s => s.id === stopId);

  const [arrivalTime, setArrivalTime] = useState('');
  const [dispatchTime, setDispatchTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [notes, setNotes] = useState('');
  const [bags, setBags] = useState<Bag[]>([]);

  // Add Bag Modal state
  const [isAddBagOpen, setIsAddBagOpen] = useState(false);
  const [newBagSize, setNewBagSize] = useState<'small' | 'medium' | 'large' | 'gallon'>('medium');
  const [newBagQuantity, setNewBagQuantity] = useState(1);
  const [topsOnly, setTopsOnly] = useState(false);

  if (!stop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Stop not found</p>
      </div>
    );
  }

  const getBagWeight = (size: string): number => {
    switch (size) {
      case 'small': return 1;
      case 'medium': return 2.5;
      case 'large': return 3.5;
      case 'gallon': return 2;
      default: return 0;
    }
  };

  const handleAddBag = () => {
    const newBag: Bag = {
      id: Date.now().toString(),
      size: newBagSize,
      weight: getBagWeight(newBagSize),
      quantity: newBagQuantity,
      conditions: topsOnly ? ['tops only'] : []
    };
    setBags([...bags, newBag]);
    setIsAddBagOpen(false);
    setNewBagSize('medium');
    setNewBagQuantity(1);
    setTopsOnly(false);
  };

  const handleRemoveBag = (bagId: string) => {
    setBags(bags.filter(b => b.id !== bagId));
  };

  const handleAutoFillTime = (field: 'arrival' | 'dispatch' | 'departure') => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
    
    if (field === 'arrival') setArrivalTime(currentTime);
    if (field === 'dispatch') setDispatchTime(currentTime);
    if (field === 'departure') setDepartureTime(currentTime);
  };

  const totalWeight = bags.reduce((sum, bag) => sum + (bag.weight * bag.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl text-gray-900">Stop Detail</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Location Info */}
        <Card>
          <CardHeader>
            <CardTitle>{stop.locationName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">{stop.contactPerson}</p>
                <p className="text-sm text-gray-600">{stop.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{stop.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Time Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="arrivalTime">Arrival Time</Label>
              <div className="flex gap-2">
                <Input
                  id="arrivalTime"
                  type="time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  onClick={() => handleAutoFillTime('arrival')}
                >
                  Auto
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dispatchTime">Dispatch Time</Label>
              <div className="flex gap-2">
                <Input
                  id="dispatchTime"
                  type="time"
                  value={dispatchTime}
                  onChange={(e) => setDispatchTime(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  onClick={() => handleAutoFillTime('dispatch')}
                >
                  Auto
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureTime">Departure Time</Label>
              <div className="flex gap-2">
                <Input
                  id="departureTime"
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  onClick={() => handleAutoFillTime('departure')}
                >
                  Auto
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bags Received */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Bags Received</CardTitle>
              <Dialog open={isAddBagOpen} onOpenChange={setIsAddBagOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Bag
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Bag</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-3">
                      <Label>Size</Label>
                      <RadioGroup value={newBagSize} onValueChange={(v) => setNewBagSize(v as any)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="small" id="bag-small" />
                          <Label htmlFor="bag-small" className="font-normal cursor-pointer">
                            Small 1kg
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="bag-medium" />
                          <Label htmlFor="bag-medium" className="font-normal cursor-pointer">
                            Medium 2.5kg
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="large" id="bag-large" />
                          <Label htmlFor="bag-large" className="font-normal cursor-pointer">
                            Large 3.5kg
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label>Special</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="bag-tops-only"
                          checked={topsOnly}
                          onCheckedChange={(checked) => setTopsOnly(checked as boolean)}
                        />
                        <Label htmlFor="bag-tops-only" className="font-normal cursor-pointer">
                          Tops only / gallon 2kg
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={newBagQuantity}
                        onChange={(e) => setNewBagQuantity(parseInt(e.target.value) || 1)}
                      />
                    </div>

                    <Button onClick={handleAddBag} className="w-full">
                      Save
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {bags.length === 0 ? (
              <p className="text-sm text-gray-600 text-center py-4">No bags added yet</p>
            ) : (
              <div className="space-y-2">
                {bags.map((bag) => (
                  <div key={bag.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium capitalize">{bag.size} bag</p>
                      <p className="text-sm text-gray-600">
                        {bag.weight}kg × {bag.quantity} = {bag.weight * bag.quantity}kg
                      </p>
                      {bag.conditions.length > 0 && (
                        <p className="text-xs text-gray-500">{bag.conditions.join(', ')}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveBag(bag.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                ))}
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Weight</p>
                  <p className="text-2xl text-green-600">{totalWeight.toFixed(1)} kg</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Photos */}
        <Card>
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-24">
                <Camera className="w-6 h-6" />
              </Button>
              <Button variant="outline" className="h-24">
                <Plus className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any observations or notes..."
            rows={4}
          />
        </div>

        {/* Save Button */}
        <Button className="w-full h-12 bg-green-600 hover:bg-green-700">
          Save Stop
        </Button>
      </div>
    </div>
  );
}
