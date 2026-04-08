// Mock data for the application

export interface PickupRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  collaboratorType: 'company' | 'institution' | 'individual';
  legalName: string;
  address: string;
  contactPerson: string;
  phone: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  preferredDate: string;
  preferredTime: string;
  materialType: string;
  estimatedWeight: number;
  status: 'pending' | 'scheduled' | 'completed';
  conditions: string[];
  createdAt: string;
}

export interface Donation {
  id: string;
  date: string;
  weight: number;
  materialType: string;
  conditions: string[];
  certificateAvailable: boolean;
  collaboratorName: string;
  collaboratorType: 'company' | 'institution' | 'individual';
}

export interface RouteStop {
  id: string;
  order: number;
  locationName: string;
  contactPerson: string;
  phone: string;
  address: string;
  scheduledTime: string;
  estimatedWeight: number;
  status: 'pending' | 'completed';
  arrivalTime?: string;
  dispatchTime?: string;
  departureTime?: string;
  bags?: Bag[];
  notes?: string;
  photos?: string[];
}

export interface Bag {
  id: string;
  size: 'small' | 'medium' | 'large' | 'gallon';
  weight: number;
  quantity: number;
  conditions: string[];
}

export interface Collaborator {
  id: string;
  name: string;
  type: 'company' | 'institution' | 'individual';
  totalKg: number;
  lastPickup: string;
  contactPerson: string;
  phone: string;
  address: string;
}

// Resource savings per rPET kilogram
export const RESOURCE_SAVINGS = {
  waterLiters: 39.26,
  fuelLiters: 0.5,
  energyKw: 5.0286,
  ethyleneKg: 1.0334,
  co2Kg: 3,
  plasticWasteM3: 38
};

// Mock pickup requests
export const mockPickupRequests: PickupRequest[] = [
  {
    id: '000245',
    requesterId: '1',
    requesterName: 'Company A',
    collaboratorType: 'company',
    legalName: 'Company A S.A.',
    address: 'Av. Central 123',
    contactPerson: 'Juan Ramirez',
    phone: '+00 000 0000',
    frequency: 'weekly',
    preferredDate: '2026-03-30',
    preferredTime: '10:30',
    materialType: 'Plastic Bottles',
    estimatedWeight: 12,
    status: 'scheduled',
    conditions: ['bottles with caps', 'uncrushed'],
    createdAt: '2026-03-25'
  },
  {
    id: '000246',
    requesterId: '2',
    requesterName: 'School B',
    collaboratorType: 'institution',
    legalName: 'Instituto Educativo B',
    address: 'Calle 45 #23-11',
    contactPerson: 'Ana Martinez',
    phone: '+00 111 1111',
    frequency: 'monthly',
    preferredDate: '2026-03-28',
    preferredTime: '14:00',
    materialType: 'Plastic Bottles',
    estimatedWeight: 31,
    status: 'pending',
    conditions: ['tops only', 'crushed'],
    createdAt: '2026-03-24'
  },
  {
    id: '000247',
    requesterId: '3',
    requesterName: 'Company C',
    collaboratorType: 'company',
    legalName: 'Tech Corp C',
    address: 'Av. Norte 456',
    contactPerson: 'Carlos Gomez',
    phone: '+00 222 2222',
    frequency: 'weekly',
    preferredDate: '2026-03-29',
    preferredTime: '09:00',
    materialType: 'Plastic Bottles',
    estimatedWeight: 15,
    status: 'pending',
    conditions: ['bottles only', 'uncrushed'],
    createdAt: '2026-03-25'
  }
];

// Mock donations
export const mockDonations: Donation[] = [
  {
    id: '1',
    date: '2026-03-12',
    weight: 8,
    materialType: 'Plastic Bottles',
    conditions: ['bottles with caps'],
    certificateAvailable: true,
    collaboratorName: 'Maria Rodriguez',
    collaboratorType: 'individual'
  },
  {
    id: '2',
    date: '2026-03-02',
    weight: 3.5,
    materialType: 'Plastic Bottles',
    conditions: ['tops only'],
    certificateAvailable: false,
    collaboratorName: 'Maria Rodriguez',
    collaboratorType: 'individual'
  },
  {
    id: '3',
    date: '2026-02-20',
    weight: 12.5,
    materialType: 'Plastic Bottles',
    conditions: ['bottles only', 'crushed'],
    certificateAvailable: true,
    collaboratorName: 'Maria Rodriguez',
    collaboratorType: 'individual'
  }
];

// Mock route stops
export const mockRouteStops: RouteStop[] = [
  {
    id: '1',
    order: 1,
    locationName: 'Company A',
    contactPerson: 'Juan Ramirez',
    phone: '+00 000 0000',
    address: 'Av. Central 123',
    scheduledTime: '09:00',
    estimatedWeight: 15,
    status: 'pending'
  },
  {
    id: '2',
    order: 2,
    locationName: 'School B',
    contactPerson: 'Ana Martinez',
    phone: '+00 111 1111',
    address: 'Calle 45 #23-11',
    scheduledTime: '09:35',
    estimatedWeight: 31,
    status: 'pending'
  },
  {
    id: '3',
    order: 3,
    locationName: 'Drop-off Point',
    contactPerson: 'Centro Reciclaje',
    phone: '+00 333 3333',
    address: 'Zona Industrial',
    scheduledTime: '10:10',
    estimatedWeight: 0,
    status: 'pending'
  }
];

// Mock collaborators
export const mockCollaborators: Collaborator[] = [
  {
    id: '1',
    name: 'Company A',
    type: 'company',
    totalKg: 120,
    lastPickup: '2026-03-12',
    contactPerson: 'Juan Ramirez',
    phone: '+00 000 0000',
    address: 'Av. Central 123'
  },
  {
    id: '2',
    name: 'School B',
    type: 'institution',
    totalKg: 92,
    lastPickup: '2026-03-10',
    contactPerson: 'Ana Martinez',
    phone: '+00 111 1111',
    address: 'Calle 45 #23-11'
  },
  {
    id: '3',
    name: 'Company C',
    type: 'company',
    totalKg: 76,
    lastPickup: '2026-03-08',
    contactPerson: 'Carlos Gomez',
    phone: '+00 222 2222',
    address: 'Av. Norte 456'
  },
  {
    id: '4',
    name: 'Ana Perez',
    type: 'individual',
    totalKg: 24,
    lastPickup: '2026-03-08',
    contactPerson: 'Ana Perez',
    phone: '+00 444 4444',
    address: 'Calle 12 #34-56'
  }
];

export function calculateCarbonFootprint(kgPlastic: number) {
  return {
    waterLiters: kgPlastic * RESOURCE_SAVINGS.waterLiters,
    fuelLiters: kgPlastic * RESOURCE_SAVINGS.fuelLiters,
    energyKw: kgPlastic * RESOURCE_SAVINGS.energyKw,
    ethyleneKg: kgPlastic * RESOURCE_SAVINGS.ethyleneKg,
    co2Kg: kgPlastic * RESOURCE_SAVINGS.co2Kg,
    plasticWasteM3: kgPlastic * RESOURCE_SAVINGS.plasticWasteM3
  };
}

export function calculateGarmentsRecycled(kgPlastic: number): number {
  // Assuming 1 kg of plastic = 38 garments (from the table)
  return Math.round(kgPlastic * 38);
}
