export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  distance: string; // e.g. "1.2 miles"
  maxPowerKw: number; // e.g. 350
  powerCategory: 'Ultra-Fast' | 'Fast' | 'Rapid' | 'Destination';
  connectors: Array<{
    type: 'CCS2' | 'NACS' | 'CHAdeMO' | 'Type 2';
    powerKw: number;
    available: number;
    total: number;
  }>;
  totalPoints: number;
  availablePoints: number;
  status: 'Operational' | 'High Demand' | 'Maintenance';
  pricePerKwh: string;
  amenities: string[];
  lat: number;
  lng: number;
  is24_7: boolean;
  greenEnergy: boolean;
}

export const DEMO_CHARGING_STATIONS: ChargingStation[] = [
  {
    id: 'ev-hub-metro-01',
    name: 'EVION HyperHub — Metro Central',
    address: 'Grand Central Plaza, 142 Techway Blvd',
    city: 'Metro City',
    postcode: 'MC1 4EV',
    distance: '0.8 miles away',
    maxPowerKw: 350,
    powerCategory: 'Ultra-Fast',
    connectors: [
      { type: 'CCS2', powerKw: 350, available: 4, total: 6 },
      { type: 'NACS', powerKw: 350, available: 2, total: 2 },
      { type: 'Type 2', powerKw: 22, available: 2, total: 2 },
    ],
    totalPoints: 10,
    availablePoints: 8,
    status: 'Operational',
    pricePerKwh: '£0.48 / kWh',
    amenities: ['Café & Lounge', 'High-Speed Wi-Fi', 'Restrooms', 'EV Valet'],
    lat: 51.5074,
    lng: -0.1278,
    is24_7: true,
    greenEnergy: true,
  },
  {
    id: 'ev-hub-west-02',
    name: 'EVION FastCharge — Westfields Gateway',
    address: 'Westfields Retail Park, Bay 4-8',
    city: 'Westfields',
    postcode: 'WF2 8QA',
    distance: '1.7 miles away',
    maxPowerKw: 150,
    powerCategory: 'Fast',
    connectors: [
      { type: 'CCS2', powerKw: 150, available: 3, total: 4 },
      { type: 'CHAdeMO', powerKw: 50, available: 1, total: 1 },
      { type: 'Type 2', powerKw: 22, available: 1, total: 1 },
    ],
    totalPoints: 6,
    availablePoints: 5,
    status: 'Operational',
    pricePerKwh: '£0.44 / kWh',
    amenities: ['Supermarket', 'Coffee Shop', 'Shopping Mall', 'Covered Canopy'],
    lat: 51.5155,
    lng: -0.1419,
    is24_7: true,
    greenEnergy: true,
  },
  {
    id: 'ev-hub-park-03',
    name: 'EVION GreenStation — Innovation Park',
    address: '8 Cybernetics Way, Science District',
    city: 'Silicon Quarter',
    postcode: 'SQ9 1TX',
    distance: '3.2 miles away',
    maxPowerKw: 350,
    powerCategory: 'Ultra-Fast',
    connectors: [
      { type: 'CCS2', powerKw: 350, available: 2, total: 4 },
      { type: 'NACS', powerKw: 350, available: 1, total: 2 },
    ],
    totalPoints: 6,
    availablePoints: 3,
    status: 'High Demand',
    pricePerKwh: '£0.46 / kWh',
    amenities: ['Solar Canopy', 'Co-Working Space', 'Restrooms', '24/7 Security'],
    lat: 51.5201,
    lng: -0.0982,
    is24_7: true,
    greenEnergy: true,
  },
  {
    id: 'ev-hub-airport-04',
    name: 'EVION Express — Terminal 2 Mobility Hub',
    address: 'Airport Perimeter Road, West Plaza',
    city: 'Metropolitan Airport',
    postcode: 'AP4 9LL',
    distance: '5.4 miles away',
    maxPowerKw: 350,
    powerCategory: 'Ultra-Fast',
    connectors: [
      { type: 'CCS2', powerKw: 350, available: 8, total: 8 },
      { type: 'NACS', powerKw: 350, available: 4, total: 4 },
      { type: 'CHAdeMO', powerKw: 50, available: 2, total: 2 },
    ],
    totalPoints: 14,
    availablePoints: 14,
    status: 'Operational',
    pricePerKwh: '£0.52 / kWh',
    amenities: ['Airport Lounges', 'Luggage Assistance', 'Valet Bay', 'Refreshments'],
    lat: 51.4700,
    lng: -0.4543,
    is24_7: true,
    greenEnergy: true,
  },
  {
    id: 'ev-hub-hotel-05',
    name: 'EVION Destination — The Azure Grand Hotel',
    address: 'Riverside Promenade, 22 Marina Drive',
    city: 'Waterfront District',
    postcode: 'WF1 3AZ',
    distance: '2.1 miles away',
    maxPowerKw: 50,
    powerCategory: 'Destination',
    connectors: [
      { type: 'CCS2', powerKw: 50, available: 2, total: 2 },
      { type: 'Type 2', powerKw: 22, available: 4, total: 4 },
    ],
    totalPoints: 6,
    availablePoints: 6,
    status: 'Operational',
    pricePerKwh: '£0.38 / kWh',
    amenities: ['Hotel Restaurant', 'Spa', 'Valet Parking', 'Scenic Waterfront Walk'],
    lat: 51.5033,
    lng: -0.1195,
    is24_7: true,
    greenEnergy: true,
  },
];

