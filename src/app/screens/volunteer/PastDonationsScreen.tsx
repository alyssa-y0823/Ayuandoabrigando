import { useState } from 'react';
import { BottomNav } from '../../components/BottomNav';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Search, FileText, Package } from 'lucide-react';
import { mockDonations } from '../../data/mockData';

export default function PastDonationsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('all');

  const filteredDonations = mockDonations.filter(donation => {
    const matchesSearch = donation.materialType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          donation.conditions.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMonth = filterMonth === 'all' || donation.date.startsWith(`2026-${filterMonth}`);
    return matchesSearch && matchesMonth;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl text-gray-900">Past Donations</h1>
      </div>

      {/* Search and Filter */}
      <div className="p-4 bg-white border-b space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter:</span>
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="03">March</SelectItem>
              <SelectItem value="02">February</SelectItem>
              <SelectItem value="01">January</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Donations List */}
      <div className="p-4 space-y-3 max-w-lg mx-auto">
        {filteredDonations.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No donations found</p>
          </div>
        ) : (
          filteredDonations.map((donation) => (
            <Card key={donation.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(donation.date).toLocaleDateString('en-US', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {donation.weight} kg • {donation.conditions.join(', ')}
                    </p>
                  </div>
                  {donation.certificateAvailable && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <FileText className="w-3 h-3 mr-1" />
                      Certificate
                    </Badge>
                  )}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <BottomNav role="volunteer" />
    </div>
  );
}