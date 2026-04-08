import { BottomNav } from '../../components/BottomNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Download, Droplet, Fuel, Zap, Wind, Leaf, Recycle } from 'lucide-react';
import { calculateCarbonFootprint, calculateGarmentsRecycled } from '../../data/mockData';

export default function CertificatesScreen() {
  // Example data for March 2026
  const totalDonatedKg = 24;
  const garmentsRecycled = calculateGarmentsRecycled(totalDonatedKg);
  const carbonFootprint = calculateCarbonFootprint(totalDonatedKg);

  const resourceSavings = [
    {
      icon: Droplet,
      label: 'Water saved',
      value: carbonFootprint.waterLiters.toFixed(2),
      unit: 'liters',
      color: 'text-blue-600'
    },
    {
      icon: Fuel,
      label: 'Fuel saved',
      value: carbonFootprint.fuelLiters.toFixed(2),
      unit: 'liters',
      color: 'text-orange-600'
    },
    {
      icon: Zap,
      label: 'Energy saved',
      value: carbonFootprint.energyKw.toFixed(2),
      unit: 'kWh',
      color: 'text-yellow-600'
    },
    {
      icon: Wind,
      label: 'Ethylene avoided',
      value: carbonFootprint.ethyleneKg.toFixed(2),
      unit: 'kg',
      color: 'text-purple-600'
    },
    {
      icon: Leaf,
      label: 'CO₂ avoided',
      value: carbonFootprint.co2Kg.toFixed(2),
      unit: 'kg',
      color: 'text-green-600'
    },
    {
      icon: Recycle,
      label: 'Plastic waste avoided',
      value: carbonFootprint.plasticWasteM3.toFixed(0),
      unit: 'm³',
      color: 'text-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl text-gray-900">Certificates</h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Donation Certificate */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
            <CardTitle>Donation Certificate</CardTitle>
            <CardDescription>Period: March 2026</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl text-green-600 mb-1">{totalDonatedKg}</p>
                <p className="text-sm text-gray-600">kg donated</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl text-green-600 mb-1">{garmentsRecycled}</p>
                <p className="text-sm text-gray-600">garments recycled</p>
              </div>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </CardContent>
        </Card>

        {/* Carbon Footprint */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle>Carbon Footprint Report</CardTitle>
            <CardDescription>Environmental impact - March 2026</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            {resourceSavings.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${resource.color}`} />
                    <span className="text-sm text-gray-700">{resource.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{resource.value}</p>
                    <p className="text-xs text-gray-500">{resource.unit}</p>
                  </div>
                </div>
              );
            })}
            <Button variant="outline" className="w-full mt-4">
              View Full Report
            </Button>
          </CardContent>
        </Card>

        {/* Previous Certificates */}
        <div className="pt-4">
          <h2 className="text-lg mb-3 text-gray-900">Previous Certificates</h2>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">February 2026</p>
                  <p className="text-sm text-gray-600">16 kg • 608 garments</p>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav role="volunteer" />
    </div>
  );
}
