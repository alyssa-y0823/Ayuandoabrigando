import { useState } from 'react';
import { BottomNav } from '../../components/BottomNav';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Search } from 'lucide-react';
import { mockCollaborators } from '../../data/mockData';

export default function DonationDatabaseScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredCollaborators = mockCollaborators
    .filter(collab => {
      const matchesSearch = collab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           collab.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || collab.type === typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'kg') return b.totalKg - a.totalKg;
      return 0;
    });

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'company': return 'bg-blue-100 text-blue-800';
      case 'institution': return 'bg-purple-100 text-purple-800';
      case 'individual': return 'bg-green-100 text-green-800';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl text-gray-900">Donation Database</h1>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white border-b space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by name or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="institution">Institution</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="kg">Total kg</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="p-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Total kg</TableHead>
                <TableHead>Last Pickup</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCollaborators.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-gray-500">
                    No collaborators found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCollaborators.map((collab) => (
                  <TableRow key={collab.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{collab.name}</p>
                        <p className="text-sm text-gray-600">{collab.contactPerson}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getTypeBadgeColor(collab.type)}>
                        {collab.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{collab.totalKg}</TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(collab.lastPickup).toLocaleDateString('en-US', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Open Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <BottomNav role="admin" />
    </div>
  );
}
