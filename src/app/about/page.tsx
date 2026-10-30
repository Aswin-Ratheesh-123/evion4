'use client';

import React from 'react';
import Link from 'next/link';
import {
  Zap,
  ShieldCheck,
  Globe,
  Award,
  Users,
  Compass,
  ArrowRight,
  BatteryCharging,
  Leaf,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Hero Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-soft-white via-white to-soft-white/40 border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-light-border text-charcoal shadow-soft mb-4">
            <span className="w-2 h-2 rounded-full bg-electric-green" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-text">
              OUR MISSION & VALUES
            </span>
          </div>

          <h1 className="font-lato section-heading !text-4xl sm:!text-5xl lg:!text-6xl font-extrabold text-charcoal tracking-tight max-w-4xl mx-auto leading-tight">
            Accelerating Clean Mobility Through <span className="text-gradient-green">Reliable EV Charging</span>
          </h1>

          <p className="mt-6 body-text max-w-2xl mx-auto">
            EVION was founded with one clear purpose: to build the world&apos;s most dependable, high-power electric vehicle charging network.
          </p>
        </div>
      </section>

      {/* Exclusivity Clarification Banner */}
      <section className="py-8 bg-electric-green-mint/30 border-b border-electric-green/20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs sm:text-sm font-semibold text-charcoal flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-electric-green-deep shrink-0" />
            <span>
              <strong>Dedicated Charging Focus:</strong> EVION specializes exclusively in electric vehicle charging infrastructure and network technology. We do not manufacture or retail automobiles.
            </span>
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-electric-green-deep">
              THE PROBLEM WE SOLVE
            </span>
            <h2 className="font-lato section-heading !text-3xl sm:!text-4xl font-extrabold text-charcoal tracking-tight">
              Eliminating EV Charging Frustration
            </h2>
            <p className="body-text leading-relaxed">
              Transitioning to electric mobility shouldn’t mean dealing with broken chargers, incompatible cables, unreadable screens in bright sunlight, or mandatory mobile app subscriptions.
            </p>
            <p className="body-text leading-relaxed">
              EVION eliminates these pain points by pairing 350kW liquid-cooled hardware with 99.98% monitored uptime and universal contactless tap-to-pay.
            </p>
            <div className="pt-2 flex items-center gap-4 text-sm font-bold text-charcoal">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-electric-green-deep" />
                <span>100% Green Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-electric-green-deep" />
                <span>Universal CCS2 & NACS</span>
              </div>
            </div>
          </div>

          <div className="bg-soft-white rounded-3xl p-8 sm:p-10 border border-light-border shadow-soft">
            <h3 className="text-xl font-bold text-charcoal mb-4">Our Core Pillars</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-light-border shadow-soft">
                <h4 className="text-sm font-bold text-charcoal flex items-center gap-2">
                  <Zap className="w-4 h-4 text-electric-green-deep" />
                  Speed Without Compromise
                </h4>
                <p className="text-xs text-secondary-text mt-1">
                  True 350kW 800V DC power capable of delivering 200 miles of range in roughly 15 minutes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-light-border shadow-soft">
                <h4 className="text-sm font-bold text-charcoal flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-electric-green-deep" />
                  Rock-Solid Uptime
                </h4>
                <p className="text-xs text-secondary-text mt-1">
                  Continuous OCPP 2.0 telemetry with rapid on-site field maintenance within 4 hours.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-light-border shadow-soft">
                <h4 className="text-sm font-bold text-charcoal flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-electric-green-deep" />
                  Genuine Renewable Energy
                </h4>
                <p className="text-xs text-secondary-text mt-1">
                  Every kilowatt-hour routed through an EVION charging bay is backed by certified solar and wind power purchase agreements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center p-12 rounded-3xl bg-soft-white border border-light-border shadow-soft">
          <h3 className="font-lato section-heading !text-2xl sm:!text-3xl font-extrabold text-charcoal">
            Ready to experience the next generation of charging?
          </h3>
          <p className="body-text max-w-lg mx-auto mt-2 mb-6 text-base">
            Find your closest high-power EVION charging station or talk to us about bringing charging to your property.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/find-chargers"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all shadow-[0_4px_20px_rgba(8,220,197,0.35)] hover:shadow-[0_0_30px_rgba(8,220,197,0.5)] border border-white/20"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Station Map</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white border border-light-border text-charcoal hover:bg-light-gray transition-colors shadow-soft"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

