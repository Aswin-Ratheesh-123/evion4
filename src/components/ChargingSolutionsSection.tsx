'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Building2,
  Zap,
  ArrowRight,
  CheckCircle2,
  X,
  Gauge,
  ShieldCheck,
  Smartphone,
  Layers,
} from 'lucide-react';

export interface SolutionItem {
  id: string;
  category: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  icon: React.ElementType;
  specs: { label: string; value: string }[];
  features: string[];
  powerRating: string;
  targetAudience: string;
}

const SOLUTIONS: SolutionItem[] = [
  {
    id: 'home-charging',
    category: 'Residential',
    title: 'Home Charging',
    headline: 'Convenient charging for everyday life.',
    description:
      'Seamless residential charging solutions designed for private garages, driveways, and residential communities. Smart overnight scheduling and solar load-balancing.',
    image: '/images/evion-car-and-charger.jpg',
    icon: Home,
    powerRating: '7.4 kW – 22 kW AC',
    targetAudience: 'EV Owners & Single/Multi-Family Homes',
    specs: [
      { label: 'Power Output', value: '7.4 kW / 22 kW AC' },
      { label: 'Connector', value: 'Type 2 Universal' },
      { label: 'Connectivity', value: 'Wi-Fi & Bluetooth App' },
      { label: 'Smart Grid', value: 'Off-Peak Tariff Sync' },
    ],
    features: [
      'Overnight smart charge scheduling during low-tariff hours',
      'Dynamic solar integration to charge from home rooftop PV',
      'Weatherproof IP65 enclosure with integrated 6-meter cable',
      'Mobile app remote status and kilowatt-hour tracking',
    ],
  },
  {
    id: 'commercial-charging',
    category: 'Commercial',
    title: 'Commercial Charging',
    headline: 'Charging infrastructure for businesses.',
    description:
      'Turnkey solutions for workplaces, commercial real estate, corporate fleets, and hospitality destinations. Scalable revenue management and cloud load balancing.',
    image: '/images/evion-charger-station.jpg',
    icon: Building2,
    powerRating: '50 kW – 180 kW DC',
    targetAudience: 'Enterprises, Landlords & Fleet Operators',
    specs: [
      { label: 'Power Output', value: '50 kW – 180 kW DC' },
      { label: 'Connectors', value: 'Dual CCS2 & NACS' },
      { label: 'Management', value: 'OCPP 2.0.1 Cloud' },
      { label: 'Billing', value: 'Contactless EMV & RFID' },
    ],
    features: [
      'Multi-tenant billing and automated driver reimbursement',
      'Intelligent dynamic power management to prevent peak demand fees',
      'Turnkey installation, civil works, and ongoing 24/7 SLA maintenance',
      'White-label mobile app and tenant access controls',
    ],
  },
  {
    id: 'public-charging',
    category: 'Public Hubs',
    title: 'Public EV Charging',
    headline: 'Infrastructure designed for accessibility and convenience.',
    description:
      'Ultra-fast charging corridors and metropolitan charging hubs. High-power 350kW liquid-cooled dispensers delivering rapid turnarounds for cross-country journeys.',
    image: '/images/evion-station-stand.jpg',
    icon: Zap,
    powerRating: 'Up to 350 kW DC',
    targetAudience: 'Highway Corridors & Retail Hubs',
    specs: [
      { label: 'Power Output', value: 'Up to 350 kW Ultra-Fast' },
      { label: 'Voltage', value: 'Up to 920V High Voltage' },
      { label: 'Display', value: '27" Sunlight-Readable Touch' },
      { label: 'Availability', value: '99.8% Network Uptime' },
    ],
    features: [
      'Ultra-fast liquid-cooled dispensing adding 200 miles in ~15 minutes',
      'Direct card tap-to-pay with zero mandatory subscriptions',
      'Canopied high-visibility LED bays with ADA/universal accessibility',
      'Real-time cloud telemetry and automated predictive servicing',
    ],
  },
];

export const ChargingSolutionsSection: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

  return (
    <section id="solutions" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-gray border border-light-border text-charcoal shadow-soft mb-4">
            <span className="w-2 h-2 rounded-full bg-electric-green" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-secondary-text">
              OUR SOLUTIONS
            </span>
          </div>

          <h2 className="font-display uppercase text-3xl sm:text-5xl lg:text-6xl text-charcoal tracking-[-0.035em] leading-[0.92]">
            <span className="font-light block text-charcoal/80">Charging That</span>
            <span className="font-black text-charcoal block">Moves You Forward.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-secondary-text leading-relaxed">
            Tailored charging solutions engineered for modern electric mobility—from residential homes to enterprise fleets and high-speed highway corridors.
          </p>
        </div>

        {/* 3 Premium Solution Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SOLUTIONS.map((solution) => {
            const Icon = solution.icon;
            return (
              <div
                key={solution.id}
                className="group relative bg-white rounded-3xl border border-light-border hover:border-electric-green-dark/40 transition-all duration-300 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative h-56 w-full overflow-hidden bg-charcoal">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

                    {/* Badge top-left */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-charcoal text-[11px] font-bold border border-light-border shadow-soft">
                      <Icon className="w-3.5 h-3.5 text-electric-green-dark" />
                      <span>{solution.category}</span>
                    </div>

                    {/* Power rating top-right */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-charcoal/80 backdrop-blur-md text-electric-green text-[11px] font-mono font-bold border border-white/10">
                      {solution.powerRating}
                    </div>

                    {/* Headline overlay bottom */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        {solution.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-7">
                    <p className="text-sm font-semibold text-charcoal mb-2">
                      {solution.headline}
                    </p>
                    <p className="text-xs text-secondary-text leading-relaxed mb-6">
                      {solution.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 pt-4 border-t border-light-border">
                      {solution.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-charcoal font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-electric-green-dark shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="px-7 pb-7 pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedSolution(solution)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-charcoal group-hover:text-electric-green-dark transition-colors cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <span className="text-[10px] font-semibold text-secondary-text">
                    Configurable Spec
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* "Learn More" Detail Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-md transition-opacity">
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-light-border max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedSolution(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-light-gray hover:bg-light-border text-charcoal transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-light-gray border border-light-border text-charcoal">
                <selectedSolution.icon className="w-6 h-6 text-electric-green-dark" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-text">
                  {selectedSolution.category} Specification
                </span>
                <h3 className="text-2xl font-black text-charcoal">
                  {selectedSolution.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-secondary-text leading-relaxed mb-6">
              {selectedSolution.description}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {selectedSolution.specs.map((spec, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-light-gray border border-light-border">
                  <span className="text-[10px] uppercase font-bold text-secondary-text block">
                    {spec.label}
                  </span>
                  <span className="text-xs font-bold text-charcoal">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Detailed Features List */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
              Included Capabilities
            </h4>
            <div className="space-y-2 mb-6">
              {selectedSolution.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-charcoal font-medium">
                  <CheckCircle2 className="w-4 h-4 text-electric-green-dark shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-light-border flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedSolution(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-secondary-text hover:text-charcoal transition-colors"
              >
                Close
              </button>
              <Link
                href="/contact"
                onClick={() => setSelectedSolution(null)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all shadow-[0_4px_20px_rgba(8,220,197,0.35)] hover:shadow-[0_0_25px_rgba(8,220,197,0.5)] border border-white/20"
              >
                <span>Request Solution Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
