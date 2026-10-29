'use client';

import React from 'react';
import Link from 'next/link';
import { Hero3DScene } from './Hero3DScene';
import { FloatingChargingDashboard } from './FloatingChargingDashboard';
import {
  Zap,
  MapPin,
  ShieldCheck,
  ArrowRight,
  BatteryCharging,
  Gauge,
  CheckCircle2,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white">
      {/* Background radial gradient glow (pure white and pale mint accents) */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial-mint opacity-60 pointer-events-none blur-3xl -z-10" />
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-electric-green-mint/20 pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8 z-10">
            {/* Small Pill Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-white border border-light-border text-charcoal shadow-soft">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-green" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-charcoal">
                THE FUTURE OF EV CHARGING
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal tracking-tight leading-[1.08] font-sans">
              Power Your Journey.{' '}
              <span className="block mt-1 text-gradient-green">
                Charge Into Tomorrow.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-secondary-text leading-relaxed max-w-xl">
              Discover smarter EV charging with seamless access to charging stations, intelligent charging experiences, and a more connected electric future.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link
                href="/charging-solutions"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-bold bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all duration-300 shadow-[0_4px_25px_rgba(8,220,197,0.4)] hover:shadow-[0_0_35px_rgba(8,220,197,0.55)] hover:-translate-y-0.5 active:translate-y-0 border border-white/20"
              >
                <Zap className="w-5 h-5 fill-[#071A16]" />
                <span>Explore Charging</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>

              <Link
                href="/find-chargers"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-semibold bg-soft-white hover:bg-light-gray text-charcoal border border-light-border transition-all duration-300 shadow-soft hover:-translate-y-0.5"
              >
                <MapPin className="w-5 h-5 text-electric-green-deep" />
                <span>Find a Charger</span>
              </Link>
            </div>

            {/* Trust Indicator & Charging Highlights */}
            <div className="pt-4 border-t border-light-border/80">
              <p className="text-xs font-semibold text-secondary-text mb-3">
                Engineered for simpler, lightning-fast EV charging:
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-soft-white border border-light-border/60">
                  <div className="p-1.5 rounded-lg bg-electric-green/15 text-electric-green-deep">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-charcoal">Up to 350kW</span>
                    <span className="text-[10px] text-secondary-text">Ultra-Fast DC</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-soft-white border border-light-border/60">
                  <div className="p-1.5 rounded-lg bg-electric-green/15 text-electric-green-deep">
                    <BatteryCharging className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-charcoal">100% Green</span>
                    <span className="text-[10px] text-secondary-text">Zero-Emission</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-soft-white border border-light-border/60">
                  <div className="p-1.5 rounded-lg bg-electric-green/15 text-electric-green-deep">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-charcoal">99.98%</span>
                    <span className="text-[10px] text-secondary-text">Hub Uptime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D EV Charging Experience & Floating UI Dashboard (7 cols on lg) */}
          <div className="lg:col-span-7 relative">
            {/* The 3D Canvas Scene */}
            <Hero3DScene />

            {/* Floating Charging Dashboard - Absolute overlay on desktop, clean spacing */}
            <div className="mt-6 lg:mt-0 lg:absolute lg:-bottom-10 lg:-left-12 lg:w-[410px] z-20">
              <FloatingChargingDashboard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

