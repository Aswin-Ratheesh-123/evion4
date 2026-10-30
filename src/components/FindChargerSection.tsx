'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { DEMO_CHARGING_STATIONS, ChargingStation } from '@/data/chargers';
import {
  Search,
  Filter,
  MapPin,
  Zap,
  Navigation,
  Compass,
  CheckCircle2,
  Clock,
  BatteryCharging,
  SlidersHorizontal,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const FindChargerSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConnector, setSelectedConnector] = useState<string>('all');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [minPower, setMinPower] = useState<number>(0);
  const [selectedStation, setSelectedStation] = useState<ChargingStation>(
    DEMO_CHARGING_STATIONS[0]
  );
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Filter logic
  const filteredStations = useMemo(() => {
    return DEMO_CHARGING_STATIONS.filter((station) => {
      // Search matching
      const matchesSearch =
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.postcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.address.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Available filter
      if (onlyAvailable && station.availablePoints === 0) return false;

      // Min power filter
      if (minPower > 0 && station.maxPowerKw < minPower) return false;

      // Connector filter
      if (selectedConnector !== 'all') {
        const hasConnector = station.connectors.some(
          (c) => c.type.toLowerCase() === selectedConnector.toLowerCase()
        );
        if (!hasConnector) return false;
      }

      return true;
    });
  }, [searchQuery, selectedConnector, onlyAvailable, minPower]);

  return (
    <section id="find-chargers" className="py-20 md:py-28 bg-soft-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-light-border text-charcoal shadow-soft mb-4">
            <MapPin className="w-4 h-4 text-electric-green-deep" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-text">
              NETWORK LOCATOR
            </span>
          </div>

          <h2 className="font-lato section-heading !text-3xl sm:!text-4xl lg:!text-5xl text-charcoal tracking-tight font-extrabold leading-tight">
            <span className="font-semibold block text-charcoal/80">Your Next Charge Is</span>
            <span className="font-extrabold text-charcoal block">Closer Than You Think.</span>
          </h2>

          <p className="mt-4 body-text max-w-2xl mx-auto">
            Explore charging locations and plan your next stop with confidence. Real-time availability, connector speeds, and verified hub amenities.
          </p>
        </div>

        {/* Map & Locator Interface Container */}
        <div className="bg-white rounded-3xl border border-light-border p-4 md:p-6 shadow-card">
          {/* Top Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-text" />
              <input
                type="text"
                placeholder="Search city, area, or postcode (e.g. Metro, Westfields)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-soft-white border border-light-border text-charcoal text-sm placeholder:text-secondary-text focus:outline-none focus:ring-2 focus:ring-electric-green focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-secondary-text hover:text-charcoal"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Controls */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {/* Connector Selector */}
              <select
                value={selectedConnector}
                onChange={(e) => setSelectedConnector(e.target.value)}
                className="px-4 py-3.5 rounded-2xl bg-soft-white border border-light-border text-charcoal text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-electric-green cursor-pointer"
              >
                <option value="all">All Connectors</option>
                <option value="ccs2">CCS2 (DC Fast)</option>
                <option value="nacs">NACS (Tesla / North America)</option>
                <option value="type 2">Type 2 (AC Destination)</option>
                <option value="chademo">CHAdeMO</option>
              </select>

              {/* Ultra-Fast Toggle */}
              <button
                onClick={() => setMinPower(minPower === 150 ? 0 : 150)}
                className={`px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  minPower === 150
                    ? 'bg-evion-gradient text-[#071A16] font-bold border-transparent shadow-[0_2px_12px_rgba(8,220,197,0.3)]'
                    : 'bg-soft-white border-light-border text-charcoal hover:bg-light-gray'
                }`}
              >
                <Zap className="w-4 h-4 text-[#071A16]" />
                <span>150kW+ Fast</span>
              </button>

              {/* Available Only Toggle */}
              <button
                onClick={() => setOnlyAvailable(!onlyAvailable)}
                className={`px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  onlyAvailable
                    ? 'bg-evion-gradient text-[#071A16] font-bold border-transparent shadow-[0_2px_12px_rgba(8,220,197,0.3)]'
                    : 'bg-soft-white border-light-border text-charcoal hover:bg-light-gray'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#071A16]" />
                <span>Available Now</span>
              </button>
            </div>
          </div>

          {/* Main Layout: Station List (Left) and Interactive Map (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Station Cards List (5 cols) */}
            <div className="lg:col-span-5 space-y-3 max-h-[580px] overflow-y-auto pr-1">
              <div className="flex items-center justify-between text-xs font-semibold text-secondary-text pb-1">
                <span>{filteredStations.length} Charging Locations Found</span>
                <span className="text-electric-green-deep font-bold">Live Status Ready</span>
              </div>

              {filteredStations.length === 0 ? (
                <div className="p-8 text-center bg-soft-white rounded-2xl border border-light-border">
                  <p className="text-sm font-bold text-charcoal">No charging stations matched</p>
                  <p className="text-xs text-secondary-text mt-1">
                    Try adjusting your filters or search for another city.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedConnector('all');
                      setMinPower(0);
                      setOnlyAvailable(false);
                    }}
                    className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-white border border-light-border text-charcoal hover:bg-light-gray"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredStations.map((station) => {
                  const isSelected = selectedStation?.id === station.id;
                  return (
                    <div
                      key={station.id}
                      onClick={() => setSelectedStation(station)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'bg-electric-green-mint/30 border-electric-green shadow-soft ring-1 ring-electric-green'
                          : 'bg-soft-white/60 hover:bg-white border-light-border hover:shadow-soft'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-sm font-bold text-charcoal">{station.name}</h4>
                          <p className="text-xs text-secondary-text">{station.address}, {station.city}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-lg text-[11px] font-extrabold bg-charcoal text-white shrink-0">
                          {station.maxPowerKw} kW
                        </span>
                      </div>

                      {/* Distance & Availability */}
                      <div className="flex items-center gap-3 text-xs mb-3">
                        <span className="font-semibold text-charcoal flex items-center gap-1">
                          <Navigation className="w-3 h-3 text-electric-green-deep" />
                          {station.distance}
                        </span>
                        <span className="inline-flex items-center gap-1 text-electric-green-deep font-bold">
                          <span className="w-2 h-2 rounded-full bg-electric-green animate-pulse" />
                          {station.availablePoints} of {station.totalPoints} Available
                        </span>
                      </div>

                      {/* Connector Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-light-border/60">
                        {station.connectors.map((c, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white border border-light-border text-charcoal"
                          >
                            {c.type} • {c.powerKw}kW ({c.available}/{c.total})
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right: Map Canvas & Active Station Detail Overlay (7 cols) */}
            <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] lg:h-[580px] rounded-2xl overflow-hidden border border-light-border bg-[#F4F7F5]">
              {/* Stylized Vector Map Background (Light mode architectural styling) */}
              <div className="absolute inset-0 bg-[#EEF2F0]">
                {/* SVG Map Grid & Road Lines */}
                <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D3DDD7" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Road arteries */}
                  <path
                    d="M-50 150 C 200 120, 350 280, 800 220"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="14"
                  />
                  <path
                    d="M 250 -50 C 280 200, 320 400, 380 700"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="12"
                  />
                  <path
                    d="M 100 450 C 300 400, 500 420, 800 350"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="10"
                  />
                  {/* River curve */}
                  <path
                    d="M-20 380 C 250 340, 420 500, 800 460"
                    fill="none"
                    stroke="#D9FFEA"
                    strokeWidth="24"
                    opacity="0.6"
                  />
                </svg>
              </div>

              {/* Charging Station Map Markers */}
              {DEMO_CHARGING_STATIONS.map((station, index) => {
                const isSelected = selectedStation?.id === station.id;
                // Distribute mock coordinates visually across map area
                const positions = [
                  { top: '35%', left: '42%' },
                  { top: '22%', left: '68%' },
                  { top: '62%', left: '30%' },
                  { top: '75%', left: '72%' },
                  { top: '48%', left: '55%' },
                ];
                const pos = positions[index % positions.length];

                return (
                  <button
                    key={station.id}
                    onClick={() => setSelectedStation(station)}
                    style={{ top: pos.top, left: pos.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 z-10 ${
                      isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                    }`}
                    title={station.name}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulse Ring */}
                      <span className="absolute w-10 h-10 rounded-full bg-electric-green/30 animate-pulse-ring" />
                      {/* Pin Circle */}
                      <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-soft border-2 transition-all ${
                          isSelected
                            ? 'bg-charcoal text-electric-green border-white shadow-green-glow'
                            : 'bg-white text-charcoal border-electric-green'
                        }`}
                      >
                        <Zap className="w-4 h-4 fill-current" />
                      </div>
                      {/* Power Label Badge */}
                      <span className="absolute -bottom-5 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold bg-white border border-light-border text-charcoal shadow-soft whitespace-nowrap">
                        {station.maxPowerKw}kW
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Floating Active Station Card Info Box (Bottom of map) */}
              {selectedStation && (
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-light-border p-4 shadow-floating">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-electric-green text-charcoal">
                          {selectedStation.powerCategory}
                        </span>
                        <span className="text-xs font-semibold text-secondary-text">
                          {selectedStation.pricePerKwh}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-charcoal mt-1">
                        {selectedStation.name}
                      </h4>
                      <p className="text-xs text-secondary-text">
                        {selectedStation.address} • {selectedStation.distance}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href={`https://maps.google.com/?q=${selectedStation.lat},${selectedStation.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-charcoal text-white hover:bg-black transition-colors shadow-soft"
                      >
                        <Navigation className="w-3.5 h-3.5 text-electric-green" />
                        <span>Navigate</span>
                        <ExternalLink className="w-3 h-3 text-secondary-text" />
                      </a>

                      <Link
                        href={`/find-chargers?station=${selectedStation.id}`}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold font-lato bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all shadow-[0_2px_12px_rgba(8,220,197,0.3)] border border-white/20"
                      >
                        <span>Full Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#071A16]" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Map Attribution & Demo Note */}
              <div className="absolute top-3 right-3 z-10">
                <span className="text-[10px] font-medium bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-secondary-text border border-light-border">
                  Demo Charging Grid • Verified Fleet Nodes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

