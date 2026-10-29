'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Cable,
  Zap,
  BatteryCharging,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface Step {
  step: string;
  title: string;
  headline: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  details: string[];
}

const STEPS: Step[] = [
  {
    step: '01',
    title: 'Find',
    headline: 'Locate Your Nearest Hub',
    description:
      'Discover a charging location that fits your journey. Check real-time bay availability, connector speeds, and amenities before you arrive.',
    icon: MapPin,
    badge: 'Smart Discovery',
    details: ['Live bay availability', 'Connector filtering (CCS2/NACS)', 'In-app navigation'],
  },
  {
    step: '02',
    title: 'Connect',
    headline: 'Plug & Authenticate Seamlessly',
    description:
      'Arrive at your selected charging location and connect your EV to a compatible charger. Tap with any credit card, smartphone, or use Autocharge.',
    icon: Cable,
    badge: 'Plug & Play',
    details: ['Liquid-cooled lightweight cable', 'Contactless Apple & Google Pay', 'ISO 15118 Plug & Charge'],
  },
  {
    step: '03',
    title: 'Charge',
    headline: 'Rapid Power & Live Telemetry',
    description:
      'Monitor charging information and continue your journey with confidence. Relax with coffee or Wi-Fi while 350kW rapidly restores your range.',
    icon: BatteryCharging,
    badge: 'Ultra-Fast 350kW',
    details: ['10% to 80% in ~18 minutes', 'Real-time SoC tracking', 'Digital receipt to phone'],
  },
];

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white relative overflow-hidden border-t border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-white border border-light-border text-charcoal shadow-soft mb-4">
            <span className="w-2 h-2 rounded-full bg-electric-green" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-text">
              SIMPLE & CONNECTED
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Three Simple Steps to <span className="text-gradient-green">Get Charged</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-secondary-text leading-relaxed">
            From discovering an ultra-fast hub to driving away with full power—experience effortless electric mobility.
          </p>
        </div>

        {/* 3 Step Progression Cards */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-24 right-24 h-1 bg-gradient-to-r from-electric-green/30 via-electric-green to-electric-green/30 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {STEPS.map((stepItem, index) => {
              const Icon = stepItem.icon;
              const isActive = activeStep === index;
              return (
                <div
                  key={stepItem.step}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`bg-white rounded-3xl p-8 border transition-all duration-300 shadow-soft hover:shadow-card-hover flex flex-col justify-between ${
                    isActive
                      ? 'border-electric-green ring-2 ring-electric-green/20 -translate-y-2'
                      : 'border-light-border hover:border-light-border'
                  }`}
                >
                  <div>
                    {/* Top step badge and number */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-all ${
                          isActive
                            ? 'bg-electric-green text-charcoal shadow-green-glow'
                            : 'bg-soft-white text-charcoal border border-light-border'
                        }`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      <span className="text-4xl font-extrabold text-light-border select-none font-sans">
                        {stepItem.step}
                      </span>
                    </div>

                    {/* Badge */}
                    <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-electric-green-mint text-electric-green-deep border border-electric-green/20 mb-2">
                      Step {index + 1}: {stepItem.title}
                    </span>

                    {/* Headline */}
                    <h3 className="text-xl font-bold text-charcoal mb-3">
                      {stepItem.headline}
                    </h3>

                    {/* Description */}
                    <p className="text-secondary-text text-sm leading-relaxed mb-6">
                      {stepItem.description}
                    </p>

                    {/* Visual Interactive Demo inside Card */}
                    <div className="p-4 rounded-2xl bg-soft-white border border-light-border/80 mb-6">
                      {index === 0 && (
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-electric-green animate-ping" />
                            <span className="font-bold text-charcoal">Hub 0.8 mi</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-white border border-light-border text-electric-green-deep font-bold">
                            4 Bays Open
                          </span>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-secondary-text">Connector Locked</span>
                          <span className="font-mono text-charcoal font-bold flex items-center gap-1 text-electric-green-deep">
                            <CheckCircle2 className="w-3.5 h-3.5" /> CCS2 Connected
                          </span>
                        </div>
                      )}
                      {index === 2 && (
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-secondary-text">Charging Power</span>
                            <span className="font-bold text-charcoal">150 kW • 18 min</span>
                          </div>
                          <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-light-border">
                            <div className="h-full bg-electric-green w-4/5 animate-pulse" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 pt-2 border-t border-light-border/60">
                    {stepItem.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2 text-xs text-charcoal font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-green-deep shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

