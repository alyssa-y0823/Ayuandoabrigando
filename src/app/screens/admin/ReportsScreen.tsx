import { BottomNav } from '../../components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Trophy, Droplet, Fuel, Zap, Wind, Leaf, Recycle, Download } from 'lucide-react';
import { mockCollaborators, calculateCarbonFootprint, RESOURCE_SAVINGS } from '../../data/mockData';

export default function ReportsScreen() {
  // Sort collaborators by total kg for ranking
  const rankedCollaborators = [...mockCollaborators].sort((a, b) => b.totalKg - a.totalKg);
  
  // Calculate total footprint
  const totalKg = mockCollaborators.reduce((sum, c) => sum + c.totalKg, 0);
  const totalFootprint = calculateCarbonFootprint(totalKg);

  const resourceSavings = [
    {
      icon: Droplet,
      label: 'Water saved',
      value: totalFootprint.waterLiters.toFixed(2),
      unit: 'liters',
      perKg: RESOURCE_SAVINGS.waterLiters,
      color: 'text-blue-600'
    },
    {
      icon: Fuel,
      label: 'Fuel saved',
      value: totalFootprint.fuelLiters.toFixed(2),
      unit: 'liters',
      perKg: RESOURCE_SAVINGS.fuelLiters,
      color: 'text-orange-600'
    },
    {
      icon: Zap,
      label: 'Energy saved',
      value: totalFootprint.energyKw.toFixed(2),
      unit: 'kWh',
      perKg: RESOURCE_SAVINGS.energyKw,
      color: 'text-yellow-600'
    },
    {
      icon: Wind,
      label: 'Ethylene avoided',
      value: totalFootprint.ethyleneKg.toFixed(2),
      unit: 'kg',
      perKg: RESOURCE_SAVINGS.ethyleneKg,
      color: 'text-purple-600'
    },
    {
      icon: Leaf,
      label: 'CO₂ avoided',
      value: totalFootprint.co2Kg.toFixed(2),
      unit: 'kg',
      perKg: RESOURCE_SAVINGS.co2Kg,
      color: 'text-green-600'
    },
    {
      icon: Recycle,
      label: 'Plastic waste avoided',
      value: totalFootprint.plasticWasteM3.toFixed(0),
      unit: 'm³',
      perKg: RESOURCE_SAVINGS.plasticWasteM3,
      color: 'text-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl text-gray-900">Reports</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="ranking" className="w-full">
        <div className="bg-white border-b px-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="ranking">Ranking</TabsTrigger>
            <TabsTrigger value="carbon">Carbon</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4 max-w-4xl mx-auto">
          {/* Ranking Tab */}
          <TabsContent value="ranking" className="mt-0 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Recycling Ranking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rankedCollaborators.map((collab, index) => (
                  <div
                    key={collab.id}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      index === 0 ? 'bg-yellow-50 border-2 border-yellow-200' :
                      index === 1 ? 'bg-gray-100' :
                      index === 2 ? 'bg-orange-50' :
                      'bg-gray-50'
                    }`}
                  >
                    <div className={`text-2xl font-bold ${
                      index === 0 ? 'text-yellow-600' :
                      index === 1 ? 'text-gray-600' :
                      index === 2 ? 'text-orange-600' :
                      'text-gray-400'
                    }`}>
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{collab.name}</p>
                      <p className="text-sm text-gray-600 capitalize">{collab.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl text-green-600">{collab.totalKg}</p>
                      <p className="text-sm text-gray-600">kg</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Carbon Footprint Tab */}
          <TabsContent value="carbon" className="mt-0 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Carbon Footprint Summary
                </CardTitle>
                <p className="text-sm text-gray-600">Total recycled: {totalKg} kg</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {resourceSavings.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${resource.color}`} />
                          <span className="font-medium text-gray-900">{resource.label}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">{resource.value}</p>
                          <p className="text-xs text-gray-500">{resource.unit}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 ml-8">
                        {resource.perKg} {resource.unit} per kg rPET
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Export Full Report
            </Button>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">
                  View and manage all issued certificates for collaborators.
                </p>
                <div className="grid gap-3 mt-4">
                  <Button variant="outline" className="w-full justify-start">
                    View All Certificates
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Generate Bulk Certificates
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Download Archive
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <BottomNav role="admin" />
    </div>
  );
}
