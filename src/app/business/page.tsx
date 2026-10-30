'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Briefcase,
  Hotel,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Gauge,
  Cpu,
} from 'lucide-react';
import { ContactSection } from '@/components/ContactSection';

export default function BusinessPage() {
  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Hero Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-soft-white via-white to-soft-white/40 border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-light-border text-charcoal shadow-soft mb-4">
            <Building2 className="w-4 h-4 text-electric-green-deep" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-text">
              COMMERCIAL CHARGING INFRASTRUCTURE
            </span>
          </div>

          <h1 className="font-lato section-heading !text-4xl sm:!text-5xl lg:!text-6xl font-extrabold text-charcoal tracking-tight max-w-4xl mx-auto leading-tight">
            Turn Your Property Into a <span className="text-gradient-green">High-Value EV Hub</span>
          </h1>

          <p className="mt-6 body-text max-w-2xl mx-auto">
            Turnkey commercial EV charging solutions for corporate workplaces, retail parks, fleet depots, and hospitality destinations.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all shadow-[0_4px_20px_rgba(8,220,197,0.35)] hover:shadow-[0_0_30px_rgba(8,220,197,0.5)] border border-white/20"
            >
              <Zap className="w-4 h-4 fill-[#071A16]" />
              <span>Request Free Site Audit</span>
            </Link>
            <Link
              href="#process"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white border border-light-border hover:bg-soft-white text-charcoal transition-colors shadow-soft"
            >
              <span>Our Deployment Process</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Target Segments */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Segment 1 */}
          <div className="bg-soft-white rounded-3xl p-8 border border-light-border shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-light-border flex items-center justify-center text-charcoal mb-4 shadow-soft">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Workplaces & Corporate Fleets</h3>
              <p className="text-sm text-secondary-text leading-relaxed mb-6">
                Attract top talent and electrify company vehicles. Load balancing intelligently coordinates charging without blowing peak electrical thresholds.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-charcoal font-semibold border-t border-light-border pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-green-deep" />
                <span>Employee subsidized access tariffs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-green-deep" />
                <span>Consolidated corporate fleet billing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-green-deep" />
                <span>Automated Scope 2 carbon emission reporting</span>
              </li>
            </ul>
          </div>

          {/* Segment 2 */}
          <div className="bg-soft-white rounded-3xl p-8 border border-light-border shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-light-border flex items-center justify-center text-charcoal mb-4 shadow-soft">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Retail Centers & Commercial Parks</h3>
              <p className="text-sm text-secondary-text leading-relaxed mb-6">
                EV drivers stay longer and spend more while charging. Generate recurring ancillary revenue through customizable per-kWh margins and premium advertising.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-charcoal font-semibold border-t border-light-border pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-green-deep" />
                <span>Zero upfront CAPEX joint-venture options</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-green-deep" />
                <span>Universal contactless credit card terminals</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-green-deep" />
                <span>Integrated digital screens for tenant ads</span>
              </li>
            </ul>
          </div>

          {/* Segment 3 */}
          <div className="bg-soft-white rounded-3xl p-8 border border-light-border shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-light-border flex items-center justify-center text-charcoal mb-4 shadow-soft">
                <Hotel className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Hospitality & Resorts</h3>
              <p className="text-sm text-secondary-text leading-relaxed mb-6">
                EV owners make lodging decisions based on reliable overnight destination charging. Premium EV charging amenities elevate hotel ratings and direct bookings.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-charcoal font-semibold border-t border-light-border pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-green-deep" />
                <span>Guest room-folio billing integration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-green-deep" />
                <span>Dual AC (22kW) & Rapid DC (50kW) pairing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-green-deep" />
                <span>24/7 dedicated guest helpline support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Turnkey Deployment Process */}
        <div id="process" className="bg-white rounded-3xl border border-light-border p-8 md:p-12 shadow-card mb-20 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary-text">
              END-TO-END EXECUTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal mt-1">
              From Site Feasibility to Revenue Operations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-soft-white border border-light-border">
              <span className="text-2xl font-black text-electric-green-deep">01</span>
              <h4 className="text-base font-bold text-charcoal mt-2 mb-1">Grid Feasibility Audit</h4>
              <p className="text-xs text-secondary-text leading-relaxed">
                We assess your on-site transformer, spare capacity, and local DNO connection options.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-soft-white border border-light-border">
              <span className="text-2xl font-black text-electric-green-deep">02</span>
              <h4 className="text-base font-bold text-charcoal mt-2 mb-1">Hardware & Engineering</h4>
              <p className="text-xs text-secondary-text leading-relaxed">
                Custom layout planning, ground civil works, trenching, conduit, and EV charger mounting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-soft-white border border-light-border">
              <span className="text-2xl font-black text-electric-green-deep">03</span>
              <h4 className="text-base font-bold text-charcoal mt-2 mb-1">Commissioning & OCPP</h4>
              <p className="text-xs text-secondary-text leading-relaxed">
                Cloud network connectivity, payment terminal activation, and dynamic load testing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-soft-white border border-light-border">
              <span className="text-2xl font-black text-electric-green-deep">04</span>
              <h4 className="text-base font-bold text-charcoal mt-2 mb-1">24/7 Operations & Payouts</h4>
              <p className="text-xs text-secondary-text leading-relaxed">
                Proactive remote diagnostics, on-site SLA maintenance, and monthly automated revenue payouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Contact Form Component */}
      <ContactSection initialType="Business Charging Solutions" />
    </div>
  );
}

