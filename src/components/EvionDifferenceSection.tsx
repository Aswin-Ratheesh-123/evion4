'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Layers,
  CheckCircle2,
  Activity,
  Maximize2,
} from 'lucide-react';

interface FeatureHighlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: React.ElementType;
}

const HIGHLIGHTS: FeatureHighlight[] = [
  {
    id: 'power',
    title: 'Liquid-Cooled Power Architecture',
    subtitle: 'High Output with Minimal Thermal Stress',
    description:
      'Engineered to deliver sustained high-power charging rates up to 350 kW, enabling compatible vehicles to add substantial range in minimal stop time.',
    metric: 'Up to 350 kW',
    metricLabel: 'Peak Delivery Rate',
    icon: Zap,
  },
  {
    id: 'compatibility',
    title: 'Universal Multi-Standard Connectors',
    subtitle: 'CCS2, NACS & Type 2 Interoperability',
    description:
      'Universal compatibility across leading electric vehicle models, featuring ergonomic cables with automated ISO 15118 plug-and-charge communication.',
    metric: '100% EV',
    metricLabel: 'Standard Interoperability',
    icon: Layers,
  },
  {
    id: 'cloud',
    title: 'Proactive Cloud Telemetry',
    subtitle: 'Continuous Automated Monitoring',
    description:
      'OCPP 2.0.1 cloud connectivity provides real-time bay telemetry, predictive component diagnostics, and high network reliability.',
    metric: '24/7 Live',
    metricLabel: 'Diagnostic Telemetry',
    icon: Cpu,
  },
];

export const EvionDifferenceSection: React.FC = () => {
  const [activeHighlight, setActiveHighlight] = useState<string>('power');

  return (
    <section id="difference" className="py-24 md:py-32 bg-light-gray relative overflow-hidden border-t border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-light-border text-charcoal shadow-soft mb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-secondary-text">
              THE EVION DIFFERENCE
            </span>
          </div>

          <h2 className="font-lato section-heading !text-3xl sm:!text-5xl lg:!text-6xl text-charcoal tracking-tight font-extrabold leading-tight">
            <span className="font-semibold block text-charcoal/80">Engineered Around</span>
            <span className="font-extrabold text-charcoal block">Your Journey.</span>
          </h2>

          <p className="mt-4 body-text max-w-2xl mx-auto">
            Every component of EVION hardware and cloud infrastructure is purpose-built to deliver smooth, reliable, and technologically advanced charging.
          </p>
        </div>

        {/* 2-Column Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Large Charger Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden bg-charcoal border border-light-border shadow-2xl group">
              <img
                src="/images/evion-charger-station.jpg"
                alt="EVION Fast Charging Hardware"
                className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-700"
              />

              {/* Luminous accents */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />

              {/* Hardware Hotspot Badges */}
              <div className="absolute top-6 left-6 p-3 rounded-2xl bg-charcoal/85 backdrop-blur-md border border-white/10 text-white shadow-soft">
                <span className="text-[9px] uppercase tracking-wider text-white/50 block font-bold">
                  Charging Terminal
                </span>
                <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-turquoise to-neon-green font-sans">
                  EVION ULTRA-FAST DISPENSER
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse" />
                  <span className="font-semibold">Sunlight-Readable 27" Display</span>
                </div>
                <div className="font-mono text-turquoise font-bold">
                  350 kW Dual-Cable
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Concise Feature Highlights */}
          <div className="lg:col-span-6 space-y-5">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              const isSelected = activeHighlight === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveHighlight(item.id)}
                  className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-electric-green-dark/40 shadow-card-hover translate-x-1'
                      : 'bg-white/70 border-light-border hover:bg-white hover:border-light-border/90 shadow-soft'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`p-3 rounded-2xl transition-colors ${
                          isSelected
                            ? 'bg-evion-gradient text-[#071A16] shadow-gradient-glow-sm'
                            : 'bg-light-gray text-charcoal border border-light-border'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-text block">
                          {item.subtitle}
                        </span>
                        <h3 className="section-heading text-base sm:text-lg font-bold text-charcoal">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-charcoal block font-lato">
                        {item.metric}
                      </span>
                      <span className="text-[9px] text-secondary-text">
                        {item.metricLabel}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-normal text-secondary-text leading-relaxed font-lato">
                    {item.description}
                  </p>
                </div>
              );
            })}

            {/* Bottom info link */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-secondary-text font-medium">
                Compliant with ISO 15118 & IEC 61851 Standards
              </span>
              <Link
                href="/charging-solutions"
                className="inline-flex items-center gap-1.5 font-bold font-lato text-charcoal hover:text-electric-green-dark transition-colors"
              >
                <span>View Full Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

