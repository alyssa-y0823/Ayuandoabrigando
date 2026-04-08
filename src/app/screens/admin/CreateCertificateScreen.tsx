import { useState } from 'react';
import { BottomNav } from '../../components/BottomNav';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Download, FileText } from 'lucide-react';
import { mockCollaborators, calculateGarmentsRecycled } from '../../data/mockData';

export default function CreateCertificateScreen() {
  const [selectedEntity, setSelectedEntity] = useState('');
  const [period, setPeriod] = useState('2026-03');
  const [reportType, setReportType] = useState('donation');

  const selectedCollab = mockCollaborators.find(c => c.id === selectedEntity);
  const totalKg = selectedCollab?.totalKg || 0;
  const garmentsRecycled = calculateGarmentsRecycled(totalKg);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl text-gray-900">Create Certificate</h1>
      </div>

      {/* Form */}
      <div className="p-4 space-y-6 max-w-lg mx-auto">
        {/* Select Entity */}
        <div className="space-y-2">
          <Label htmlFor="entity">Select Entity</Label>
          <Select value={selectedEntity} onValueChange={setSelectedEntity}>
            <SelectTrigger id="entity">
              <SelectValue placeholder="Choose a collaborator..." />
            </SelectTrigger>
            <SelectContent>
              {mockCollaborators.map((collab) => (
                <SelectItem key={collab.id} value={collab.id}>
                  {collab.name} ({collab.type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Period */}
        <div className="space-y-2">
          <Label htmlFor="period">Period</Label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger id="period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-03">March 2026</SelectItem>
              <SelectItem value="2026-02">February 2026</SelectItem>
              <SelectItem value="2026-01">January 2026</SelectItem>
              <SelectItem value="2025-12">December 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Report Type */}
        <div className="space-y-3">
          <Label>Report Type</Label>
          <RadioGroup value={reportType} onValueChange={setReportType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="donation" id="donation" />
              <Label htmlFor="donation" className="font-normal cursor-pointer">
                Donation Certificate
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="carbon" id="carbon" />
              <Label htmlFor="carbon" className="font-normal cursor-pointer">
                Carbon Footprint
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Preview */}
        {selectedEntity && (
          <Card className="bg-gradient-to-br from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Certificate Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Entity</p>
                  <p className="font-medium">{selectedCollab?.name}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Period</p>
                  <p className="font-medium">
                    {new Date(period + '-01').toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Total kg donated</p>
                <p className="text-3xl text-green-600">{totalKg} kg</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Garments recycled</p>
                <p className="text-3xl text-blue-600">{garmentsRecycled}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!selectedEntity}
          >
            Generate Certificate
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            disabled={!selectedEntity}
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <BottomNav role="admin" />
    </div>
  );
}
