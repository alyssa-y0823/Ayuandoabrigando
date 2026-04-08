import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Checkbox } from '../../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowLeft, Camera } from 'lucide-react';

export default function DonationDetailsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const requestData = location.state?.requestData;

  const [materialType, setMaterialType] = useState('plastic-bottles');
  const [bagSize, setBagSize] = useState('medium');
  const [topsOnly, setTopsOnly] = useState(false);
  const [estimatedWeight, setEstimatedWeight] = useState('');
  const [conditions, setConditions] = useState<string[]>([]);

  const conditionOptions = [
    { id: 'tops-only', label: 'Tops only' },
    { id: 'bottles-only', label: 'Bottles only' },
    { id: 'bottles-caps', label: 'Bottles with caps' },
    { id: 'crushed', label: 'Crushed' },
    { id: 'uncrushed', label: 'Uncrushed' },
    { id: 'contaminated', label: 'Contaminated' },
    { id: 'poor-condition', label: 'Poor condition' }
  ];

  const toggleCondition = (conditionId: string) => {
    setConditions(prev => 
      prev.includes(conditionId) 
        ? prev.filter(c => c !== conditionId)
        : [...prev, conditionId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/volunteer/pickup-confirmation', {
      state: {
        requestData: {
          ...requestData,
          materialType,
          bagSize,
          topsOnly,
          estimatedWeight: parseFloat(estimatedWeight),
          conditions
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl text-gray-900">Donation Details</h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6 max-w-lg mx-auto">
        {/* Material Type */}
        <div className="space-y-2">
          <Label htmlFor="materialType">Material Type</Label>
          <Select value={materialType} onValueChange={setMaterialType}>
            <SelectTrigger id="materialType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plastic-bottles">Plastic Bottles</SelectItem>
              <SelectItem value="plastic-tops">Plastic Tops</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bag Size */}
        <div className="space-y-3">
          <Label>Bag Size</Label>
          <RadioGroup value={bagSize} onValueChange={setBagSize}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="small" />
              <Label htmlFor="small" className="font-normal cursor-pointer">Small 1kg</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium" className="font-normal cursor-pointer">Medium 2.5kg</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="large" />
              <Label htmlFor="large" className="font-normal cursor-pointer">Large 3.5kg</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Tops Only */}
        <div className="space-y-3">
          <Label>Tops Only</Label>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="topsOnly" 
              checked={topsOnly}
              onCheckedChange={(checked) => setTopsOnly(checked as boolean)}
            />
            <Label htmlFor="topsOnly" className="font-normal cursor-pointer">
              Gallon container (2kg)
            </Label>
          </div>
        </div>

        {/* Condition / Observations */}
        <div className="space-y-3">
          <Label>Condition / Observations</Label>
          <div className="space-y-2">
            {conditionOptions.map(option => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={option.id}
                  checked={conditions.includes(option.id)}
                  onCheckedChange={() => toggleCondition(option.id)}
                />
                <Label htmlFor={option.id} className="font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Weight */}
        <div className="space-y-2">
          <Label htmlFor="estimatedWeight">Estimated Weight (kg)</Label>
          <Input
            id="estimatedWeight"
            type="number"
            step="0.1"
            min="0"
            value={estimatedWeight}
            onChange={(e) => setEstimatedWeight(e.target.value)}
            required
          />
          <p className="text-sm text-gray-600">
            Note: &gt;20kg allows personal delivery
          </p>
        </div>

        {/* Add Photos */}
        <div>
          <Button type="button" variant="outline" className="w-full">
            <Camera className="w-4 h-4 mr-2" />
            Add Photos
          </Button>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
          Save Request
        </Button>
      </form>
    </div>
  );
}
