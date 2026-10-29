'use client';

import React from 'react';
import { FindChargerSection } from '@/components/FindChargerSection';
import { ShieldCheck, Zap, Navigation, Clock, BatteryCharging } from 'lucide-react';

export default function FindChargersPage() {
  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Top Banner */}
      <div className="bg-soft-white border-b border-light-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-electric-green-deep">
                REAL-TIME CHARGER NETWORK
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
                EVION Station Locator
              </h1>
              <p className="text-sm text-secondary-text mt-1">
                Explore real-time bay availability, connector specifications, and high-speed DC charging stations.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-light-border text-xs font-semibold text-charcoal shadow-soft">
              <span className="w-2.5 h-2.5 rounded-full bg-electric-green animate-pulse" />
              <span>Network Status: All Systems Operational (99.98%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Section */}
      <FindChargerSection />

      {/* Travel Tips & Connector Standards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-soft-white border border-light-border">
            <div className="w-10 h-10 rounded-xl bg-electric-green-mint text-electric-green-deep flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-charcoal mb-1">Ultra-Fast 350kW Priority</h4>
            <p className="text-xs text-secondary-text leading-relaxed">
              Prioritize 350kW DC chargers for long journeys. Most modern EVs reach 80% charge in under 20 minutes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-soft-white border border-light-border">
            <div className="w-10 h-10 rounded-xl bg-electric-green-mint text-electric-green-deep flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-charcoal mb-1">24/7 Access & Lighted Bays</h4>
            <p className="text-xs text-secondary-text leading-relaxed">
              All EVION stations feature 24/7 security illumination, overhead weather canopies, and emergency contact buttons.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-soft-white border border-light-border">
            <div className="w-10 h-10 rounded-xl bg-electric-green-mint text-electric-green-deep flex items-center justify-center mb-3">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-charcoal mb-1">Universal Connector Freedom</h4>
            <p className="text-xs text-secondary-text leading-relaxed">
              Every hub features standard CCS2 and NACS plugs to accommodate Audi, BMW, Hyundai, Kia, Porsche, Tesla, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

