import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { ArrowLeft } from 'lucide-react';

export default function RequestPickupScreen() {
  const navigate = useNavigate();
  const [collaboratorType, setCollaboratorType] = useState('individual');
  const [frequency, setFrequency] = useState('weekly');
  const [formData, setFormData] = useState({
    legalName: '',
    address: '',
    contactPerson: '',
    phone: '',
    preferredDate: '',
    preferredTime: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/volunteer/donation-details', { 
      state: { 
        requestData: { 
          ...formData, 
          collaboratorType, 
          frequency 
        } 
      } 
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl text-gray-900">Request Pickup</h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6 max-w-lg mx-auto">
        {/* Collaborator Type */}
        <div className="space-y-3">
          <Label>Collaborator Type</Label>
          <RadioGroup value={collaboratorType} onValueChange={setCollaboratorType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="company" id="company" />
              <Label htmlFor="company" className="font-normal cursor-pointer">Company</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="institution" id="institution" />
              <Label htmlFor="institution" className="font-normal cursor-pointer">Institution</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="individual" id="individual" />
              <Label htmlFor="individual" className="font-normal cursor-pointer">Individual</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Legal/Full Name */}
        <div className="space-y-2">
          <Label htmlFor="legalName">Legal / Full Name</Label>
          <Input
            id="legalName"
            value={formData.legalName}
            onChange={(e) => handleInputChange('legalName', e.target.value)}
            required
          />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            required
          />
        </div>

        {/* Contact Person */}
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input
            id="contactPerson"
            value={formData.contactPerson}
            onChange={(e) => handleInputChange('contactPerson', e.target.value)}
            required
          />
        </div>

        {/* Mobile Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Mobile Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </div>

        {/* Preferred Frequency */}
        <div className="space-y-3">
          <Label>Preferred Frequency</Label>
          <RadioGroup value={frequency} onValueChange={setFrequency}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily" className="font-normal cursor-pointer">Daily</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly" className="font-normal cursor-pointer">Weekly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly" className="font-normal cursor-pointer">Monthly</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Preferred Pickup Date */}
        <div className="space-y-2">
          <Label htmlFor="preferredDate">Preferred Pickup Date</Label>
          <Input
            id="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={(e) => handleInputChange('preferredDate', e.target.value)}
            required
          />
        </div>

        {/* Preferred Time */}
        <div className="space-y-2">
          <Label htmlFor="preferredTime">Preferred Time</Label>
          <Input
            id="preferredTime"
            type="time"
            value={formData.preferredTime}
            onChange={(e) => handleInputChange('preferredTime', e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
          Continue
        </Button>
      </form>
    </div>
  );
}
