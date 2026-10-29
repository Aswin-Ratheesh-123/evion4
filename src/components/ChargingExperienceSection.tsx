'use client';

import React, { useState } from 'react';
import {
  Cable,
  BatteryCharging,
  Car,
  CheckCircle2,
  Zap,
  ArrowRight,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

interface ExperienceStep {
  number: string;
  badge: string;
  name: string;
  headline: string;
  description: string;
  icon: React.ElementType;
  interactiveData: {
    label: string;
    value: string;
    status: string;
  };
}

const STEPS: ExperienceStep[] = [
  {
    number: '01',
    badge: 'Step 01',
    name: 'CONNECT',
    headline: 'Plug in & Authenticate',
    description:
      'Park at any EVION charging station. Insert the lightweight liquid-cooled cable into your vehicle charging port. Autocharge or tap-to-pay completes authentication in seconds.',
    icon: Cable,
    interactiveData: {
      label: 'Connector Status',
      value: 'CCS2 / NACS Locked',
      status: 'ISO 15118 Handshake Complete',
    },
  },
  {
    number: '02',
    badge: 'Step 02',
    name: 'CHARGE',
    headline: 'Dynamic Power Delivery',
    description:
      'Continuous power up to 350 kW dynamically matches your battery chemistry. Monitor real-time progress on the station display or your smartphone app.',
    icon: BatteryCharging,
    interactiveData: {
      label: 'Energy Flow Rate',
      value: '350 kW Peak Active',
      status: 'Real-Time Telemetry',
    },
  },
  {
    number: '03',
    badge: 'Step 03',
    name: 'CONTINUE',
    headline: 'Drive Away Powered',
    description:
      'Unplug when finished. Your digital receipt is delivered automatically. Back on the road with full confidence and maximum driving range.',
    icon: Car,
    interactiveData: {
      label: 'Session Result',
      value: '100% Target Reached',
      status: '+380 km Range Restored',
    },
  },
];

export const ChargingExperienceSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section id="experience" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-gray border border-light-border text-charcoal shadow-soft mb-4">
            <span className="w-2 h-2 rounded-full bg-electric-green" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-secondary-text">
              THE CHARGING EXPERIENCE
            </span>
          </div>

          <h2 className="font-display uppercase text-3xl sm:text-5xl lg:text-6xl font-black text-charcoal tracking-[-0.035em] leading-[0.92]">
            CONNECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise to-neon-green">→</span> CHARGE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise to-neon-green">→</span> CONTINUE
          </h2>

          <p className="mt-4 text-base sm:text-lg text-secondary-text leading-relaxed">
            Three frictionless steps engineered for maximum simplicity, transparency, and speed.
          </p>
        </div>

        {/* 3 Illustrated Step Progression */}
        <div className="relative">
          {/* Subtle thin connecting line across cards on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-28 right-28 h-0.5 bg-gradient-to-r from-light-border via-electric-green-dark/40 to-light-border -translate-y-12 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isSelected = activeStep === index;
              return (
                <div
                  key={step.number}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`bg-white rounded-3xl p-8 border transition-all duration-300 shadow-soft hover:shadow-card-hover flex flex-col justify-between ${
                    isSelected
                      ? 'border-electric-green-dark/50 ring-2 ring-electric-green/20 -translate-y-2'
                      : 'border-light-border hover:border-light-border/90'
                  }`}
                >
                  <div>
                    {/* Top Step Number and Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                          isSelected
                            ? 'bg-evion-gradient text-[#071A16] shadow-gradient-glow'
                            : 'bg-light-gray text-charcoal border border-light-border'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="text-4xl font-black text-light-border select-none font-sans">
                        {step.number}
                      </span>
                    </div>

                    {/* Badge and Name */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-light-gray border border-light-border text-secondary-text">
                        {step.badge}
                      </span>
                      <span className="text-xs font-black tracking-widest text-charcoal">
                        {step.name}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl font-bold text-charcoal mb-3">
                      {step.headline}
                    </h3>

                    {/* Description */}
                    <p className="text-secondary-text text-xs sm:text-sm leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Interactive Telemetry Box */}
                    <div className="p-4 rounded-2xl bg-light-gray border border-light-border mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-secondary-text font-medium">
                          {step.interactiveData.label}
                        </span>
                        <span className="font-bold text-charcoal font-mono">
                          {step.interactiveData.value}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-electric-green-dark">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{step.interactiveData.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Micro green highlight footer */}
                  <div className="pt-3 border-t border-light-border flex items-center justify-between text-[11px] text-secondary-text">
                    <span>Seamless Transition</span>
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        isSelected ? 'bg-electric-green scale-125' : 'bg-light-border'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

