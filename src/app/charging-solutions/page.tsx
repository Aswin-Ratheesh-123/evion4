'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  BatteryCharging,
  Gauge,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Layers,
  Clock,
} from 'lucide-react';
import { FloatingChargingDashboard } from '@/components/FloatingChargingDashboard';

export default function ChargingSolutionsPage() {
  // Interactive Power & Range Calculator
  const [batterySizeKwh, setBatterySizeKwh] = useState(77); // e.g., standard EV
  const [chargerSpeedKw, setChargerSpeedKw] = useState(350);

  // Approximate 10% to 80% charging duration formula
  // Required kWh = 70% of battery pack
  const kwhToCharge = batterySizeKwh * 0.7;
  // Average effective rate is ~75% of peak due to charging curve taper
  const effectiveKw = Math.min(chargerSpeedKw * 0.72, batterySizeKwh * 2.5);
  const minutesTo80 = Math.round((kwhToCharge / effectiveKw) * 60);
  const milesAdded = Math.round(kwhToCharge * 3.4); // approx 3.4 miles per kWh

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Hero Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-soft-white via-white to-soft-white/40 border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-light-border text-charcoal shadow-soft mb-4">
            <BatteryCharging className="w-4 h-4 text-electric-green-deep" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-text">
              CHARGING SOLUTIONS
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal tracking-tight max-w-4xl mx-auto leading-tight">
            High-Performance Charging for <span className="text-gradient-green">Every Electric Journey</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-secondary-text max-w-2xl mx-auto leading-relaxed">
            From 350kW liquid-cooled highway hubs to smart destination AC charging, EVION delivers reliable, rapid power tailored to modern EVs.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/find-chargers"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all shadow-[0_4px_20px_rgba(8,220,197,0.35)] hover:shadow-[0_0_30px_rgba(8,220,197,0.5)] border border-white/20"
            >
              <Zap className="w-4 h-4 fill-[#071A16]" />
              <span>Locate a Fast Charger</span>
            </Link>
            <Link
              href="#calculator"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white border border-light-border hover:bg-soft-white text-charcoal transition-colors shadow-soft"
            >
              <span>Calculate Charging Time</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions Detailed Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-electric-green-deep">
              HIGHWAY MOBILITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
              EVION Ultra-Fast Hubs: Up to 350 kW DC
            </h2>
            <p className="text-secondary-text leading-relaxed">
              Engineered for busy transit arteries and travel hubs, our 350 kW liquid-cooled DC chargers deliver the highest charging acceptance rates permitted by modern 800V and 400V battery platforms.
            </p>
            <ul className="space-y-3">
              {[
                'Active liquid cooling prevents cable overheating during sustained 500A current',
                'CCS2 & NACS dual connector standard configuration',
                'Dynamic load dispatch ensures maximum possible power to each bay',
                'Plug & Charge ISO 15118 authentication for cardless connection',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-charcoal font-medium">
                  <CheckCircle2 className="w-4 h-4 text-electric-green-deep shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <FloatingChargingDashboard />
          </div>
        </div>

        {/* Destination & Workplace AC */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1 bg-soft-white rounded-3xl p-8 border border-light-border shadow-soft">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-light-border">
                <span className="text-xs font-bold uppercase text-secondary-text">Hardware Spec</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-electric-green-mint text-electric-green-deep">
                  Level 2 AC
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-secondary-text block">Power Ratings</span>
                  <span className="font-bold text-charcoal">7.4 kW / 11 kW / 22 kW</span>
                </div>
                <div>
                  <span className="text-xs text-secondary-text block">Input Voltage</span>
                  <span className="font-bold text-charcoal">230V 1-ph / 400V 3-ph</span>
                </div>
                <div>
                  <span className="text-xs text-secondary-text block">Enclosure Rating</span>
                  <span className="font-bold text-charcoal">IP55 Weatherproof</span>
                </div>
                <div>
                  <span className="text-xs text-secondary-text block">Connector</span>
                  <span className="font-bold text-charcoal">Type 2 Universal Socket</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-electric-green-deep">
              LONG DWELL DESTINATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
              EVION Destination & Workplace AC
            </h2>
            <p className="text-secondary-text leading-relaxed">
              Designed for hotels, multi-tenant parking garages, and corporate headquarters where vehicles park for 2 to 8 hours. Smart load management balances power across hundreds of stalls without triggering high utility peak demand charges.
            </p>
            <ul className="space-y-3">
              {[
                'Smart load shedding synchronizes with building electrical baseloads',
                'Employee and guest RFID whitelist integration',
                'Automated consolidated monthly reimbursement invoicing',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-charcoal font-medium">
                  <CheckCircle2 className="w-4 h-4 text-electric-green-deep shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Charging Duration Estimator */}
        <div id="calculator" className="bg-soft-white/80 rounded-3xl p-8 md:p-12 border border-light-border shadow-card scroll-mt-28">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary-text">
              INTERACTIVE TOOL
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight mt-1">
              Estimate Your EV Charging Session
            </h3>
            <p className="text-sm text-secondary-text mt-2">
              Select your battery capacity and charger speed to see estimated 10% to 80% charging duration and added driving range.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            {/* Sliders */}
            <div className="space-y-6 bg-white p-6 rounded-2xl border border-light-border shadow-soft">
              <div>
                <div className="flex justify-between text-xs font-bold text-charcoal mb-2">
                  <span>Battery Pack Capacity</span>
                  <span className="text-electric-green-deep font-mono text-sm">{batterySizeKwh} kWh</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="120"
                  step="5"
                  value={batterySizeKwh}
                  onChange={(e) => setBatterySizeKwh(Number(e.target.value))}
                  className="w-full accent-electric-green cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-secondary-text mt-1">
                  <span>40 kWh (Compact)</span>
                  <span>77 kWh (Sedan/SUV)</span>
                  <span>120 kWh (Long Range)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-charcoal mb-2">
                  <span>Charger Power Rating</span>
                  <span className="text-electric-green-deep font-mono text-sm">{chargerSpeedKw} kW</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="350"
                  step="25"
                  value={chargerSpeedKw}
                  onChange={(e) => setChargerSpeedKw(Number(e.target.value))}
                  className="w-full accent-electric-green cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-secondary-text mt-1">
                  <span>50 kW (Rapid)</span>
                  <span>150 kW (Fast)</span>
                  <span>350 kW (Ultra-Fast)</span>
                </div>
              </div>
            </div>

            {/* Results Preview */}
            <div className="bg-charcoal text-white rounded-2xl p-6 shadow-card flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-electric-green block mb-3">
                  ESTIMATED 10% → 80% CHARGE
                </span>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
                    ~{minutesTo80}
                  </span>
                  <span className="text-xl font-bold text-electric-green">minutes</span>
                </div>

                <div className="space-y-2 text-xs text-white/80 border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span>Estimated Range Added:</span>
                    <span className="font-bold text-electric-green font-mono">+{milesAdded} miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Energy Delivered (70%):</span>
                    <span className="font-bold text-white font-mono">{kwhToCharge.toFixed(1)} kWh</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 text-[10px] text-secondary-text/80 leading-tight">
                * Real-world rates vary based on vehicle onboard BMS limits, battery temperature, and state of charge taper.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

