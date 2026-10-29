'use client';

import React from 'react';
import { Star, UserCheck, ShieldCheck, Quote } from 'lucide-react';

interface ExperienceStory {
  quote: string;
  author: string;
  role: string;
  vehicleOrFacility: string;
  tag: string;
}

const EXPERIENCES: ExperienceStory[] = [
  {
    quote:
      'Finding a rapid hub that actually delivers its advertised 350kW without broken connectors or confusing app registrations was night and day. The contactless tap-to-pay simply works.',
    author: 'Elena Vance',
    role: 'Cross-Country EV Driver',
    vehicleOrFacility: 'Porsche Taycan 4S Owner',
    tag: 'Long Distance Mobility',
  },
  {
    quote:
      'Deploying EVION charging stations across our commercial retail parks increased visitor dwell time by an average of 42 minutes. The dynamic load management avoided heavy substation upgrades.',
    author: 'Marcus Sterling',
    role: 'Head of Facilities & Sustainability',
    vehicleOrFacility: 'Apex Retail Property Group',
    tag: 'Commercial Property',
  },
  {
    quote:
      'The illuminated status halo lets you know from a football field away whether the bay is open. Clean, well-lit charging bays with coffee nearby make EV travel relaxing.',
    author: 'David Chen',
    role: 'Fleet Manager',
    vehicleOrFacility: 'Urban Electric Fleet Logistics',
    tag: 'Fleet Operations',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-soft-white/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-light-border text-charcoal shadow-soft mb-4">
            <Quote className="w-4 h-4 text-electric-green-deep" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-text">
              DRIVER & PROPERTY EXPERIENCES
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Built Around the <span className="text-gradient-green">EV Charging Experience</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-secondary-text leading-relaxed">
            Real feedback from electric drivers on long-distance routes and commercial property partners hosting EVION hubs.
          </p>
        </div>

        {/* 3 Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERIENCES.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-light-border shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-electric-green-deep">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-electric-green text-electric-green" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-soft-white border border-light-border text-secondary-text">
                    {item.tag}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-electric-green/40 mb-3" />

                <p className="text-charcoal text-sm leading-relaxed mb-6 font-medium">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-light-border/70 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-soft-white border border-light-border flex items-center justify-center font-bold text-charcoal text-sm">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal">{item.author}</h4>
                  <p className="text-xs text-secondary-text">{item.role}</p>
                  <span className="text-[10px] text-electric-green-deep font-semibold">
                    {item.vehicleOrFacility}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

