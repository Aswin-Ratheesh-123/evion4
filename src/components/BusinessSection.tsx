'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Briefcase,
  Hotel,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Zap,
} from 'lucide-react';

interface CommercialOption {
  id: string;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  icon: React.ElementType;
  badge: string;
}

const BUSINESS_SOLUTIONS: CommercialOption[] = [
  {
    id: 'workplace',
    title: 'Workplace Charging',
    category: 'Corporate & Employee Fleets',
    description:
      'Empower your workforce with smart workplace charging. Dynamic load management balances power across bays without expensive electrical panel upgrades.',
    benefits: [
      'Scheduled employee charging & access tiers',
      'Dynamic power balancing to match building loads',
      'Carbon reduction reporting for ESG compliance',
    ],
    icon: Briefcase,
    badge: 'Enterprise Fleets',
  },
  {
    id: 'commercial',
    title: 'Commercial Property Charging',
    category: 'Retail Parks & Real Estate',
    description:
      'Attract high-intent EV drivers to your retail centers, office parks, and multi-tenant assets. Monetize charging bays with automated billing and premium amenities.',
    benefits: [
      'Turnkey hardware installation and maintenance',
      'Flexible tariff models & revenue share options',
      'Sunlight-readable digital ad screen integration',
    ],
    icon: ShoppingBag,
    badge: 'Retail & Multi-Tenant',
  },
  {
    id: 'destination',
    title: 'Destination Charging',
    category: 'Hospitality & Leisure',
    description:
      'Offer effortless charging for guests at hotels, resorts, golf clubs, and dining destinations. Increase dwell time and guest satisfaction.',
    benefits: [
      'Seamless guest app and room-charge billing',
      'Dual AC (22kW) & Fast DC (50kW) options',
      '24/7 proactive remote monitoring & support',
    ],
    icon: Hotel,
    badge: 'Hospitality & Resorts',
  },
];

export const BusinessSection: React.FC = () => {
  return (
    <section id="business" className="py-20 md:py-28 bg-white relative overflow-hidden border-t border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-white border border-light-border text-charcoal shadow-soft mb-4">
            <Building2 className="w-4 h-4 text-electric-green-deep" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-text">
              COMMERCIAL INFRASTRUCTURE
            </span>
          </div>

          <h2 className="font-lato section-heading !text-3xl sm:!text-4xl lg:!text-5xl text-charcoal tracking-tight">
            Bring Smarter Charging to <span className="text-gradient-green">Your Location</span>
          </h2>

          <p className="body-text mt-4 max-w-2xl mx-auto">
            Explore EV charging solutions for workplaces, commercial properties, hospitality locations, and other destinations.
          </p>
        </div>

        {/* 3 Commercial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {BUSINESS_SOLUTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-8 border border-light-border hover:border-electric-green/60 transition-all duration-300 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-soft-white border border-light-border flex items-center justify-center text-charcoal">
                      <Icon className="w-7 h-7 text-charcoal" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-electric-green-mint text-electric-green-deep border border-electric-green/20">
                      {item.badge}
                    </span>
                  </div>

                  <span className="font-lato text-[11px] font-bold uppercase tracking-wider text-secondary-text block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-lato section-heading text-xl sm:text-2xl font-bold text-charcoal mb-3">
                    {item.title}
                  </h3>
                  <p className="font-lato body-text !text-sm text-secondary-text leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Bullet Benefits */}
                  <ul className="space-y-2.5 pt-4 border-t border-light-border/70 mb-6 font-lato">
                    {item.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-charcoal font-medium">
                        <ShieldCheck className="w-4 h-4 text-electric-green-deep shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?type=business&solution=${item.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold font-lato bg-soft-white hover:bg-electric-green text-charcoal border border-light-border hover:border-electric-green transition-all shadow-soft"
                >
                  <span>Request Site Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Enterprise Bottom Banner / Consultation Bar */}
        <div className="rounded-3xl bg-gradient-to-r from-soft-white via-white to-electric-green-mint/30 border border-light-border p-8 md:p-10 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-charcoal">
              Planning an EV charging deployment for your property?
            </h3>
            <p className="text-secondary-text text-sm max-w-xl">
              Our infrastructure engineering team provides comprehensive grid capacity audits, hardware recommendations, and ROI projections.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/business"
              className="px-6 py-3.5 rounded-2xl text-sm font-bold bg-white border border-light-border hover:bg-soft-white text-charcoal transition-colors shadow-soft"
            >
              Learn More
            </Link>
            <Link
              href="/contact?type=business"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all shadow-[0_4px_20px_rgba(8,220,197,0.35)] hover:shadow-[0_0_30px_rgba(8,220,197,0.5)] border border-white/20"
            >
              <Zap className="w-4 h-4 fill-[#071A16]" />
              <span>Discuss Your Requirements</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

