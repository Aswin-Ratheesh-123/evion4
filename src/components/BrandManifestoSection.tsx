'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Activity } from 'lucide-react';

export const BrandManifestoSection: React.FC = () => {
  return (
    <section
      className="py-20 sm:py-24 lg:py-32 bg-white relative overflow-hidden border-t border-light-border select-none"
      aria-label="EVION Brand Manifesto"
    >
      {/* Subtle Luminous Ambient Gradients */}
      <div
        className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-electric-cyan/8 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-electric-green/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-light-border/60 pb-4">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-light-gray border border-light-border text-charcoal shadow-soft">
            <span className="text-[11px] font-bold uppercase tracking-widest text-secondary-text">
              THE EVION MANIFESTO
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-secondary-text/80">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            <span>MANIFESTO NO. 01 — INFRASTRUCTURE FOR THE ELECTRIC ERA</span>
          </div>
        </div>

        {/* Main Grid: Dominant Monumental Poster Artwork + Context Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* Left Column: Monumental 6-Line Typographic Poster */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
            <h2
              className="font-display uppercase tracking-[-0.035em] leading-[0.86] sm:leading-[0.85] lg:leading-[0.84] text-charcoal"
              aria-label="We don't just build chargers. We connect the way the world moves."
            >
              {/* Lines 1 & 2: Ultra-refined Hairline Stroke (ExtraLight 200) */}
              <span className="block text-[clamp(1.7rem,6.8vw,3.8rem)] lg:text-[clamp(3.8rem,5vw,5.2rem)] xl:text-[5.8rem] font-extralight text-[#0D1217] whitespace-nowrap">
                WE DON'T JUST
              </span>
              <span className="block text-[clamp(1.7rem,6.8vw,3.8rem)] lg:text-[clamp(3.8rem,5vw,5.2rem)] xl:text-[5.8rem] font-extralight text-[#0D1217] whitespace-nowrap">
                BUILD CHARGERS.
              </span>

              {/* Lines 3 & 4: Vibrant Turquoise to Neon Green Gradient */}
              <span className="block text-[clamp(1.7rem,6.8vw,3.8rem)] lg:text-[clamp(3.8rem,5vw,5.2rem)] xl:text-[5.8rem] font-medium text-transparent bg-clip-text bg-gradient-to-r from-turquoise via-cyan to-neon-green whitespace-nowrap">
                WE CONNECT THE
              </span>
              <span className="block text-[clamp(1.7rem,6.8vw,3.8rem)] lg:text-[clamp(3.8rem,5vw,5.2rem)] xl:text-[5.8rem] font-medium text-transparent bg-clip-text bg-gradient-to-r from-turquoise via-cyan to-neon-green whitespace-nowrap">
                WAY
              </span>

              {/* Lines 5 & 6: Heavy Monumental Black (Black 900) */}
              <span className="block text-[clamp(1.7rem,6.8vw,3.8rem)] lg:text-[clamp(3.8rem,5vw,5.2rem)] xl:text-[5.8rem] font-black text-black whitespace-nowrap">
                THE WORLD
              </span>
              <span className="block text-[clamp(1.7rem,6.8vw,3.8rem)] lg:text-[clamp(3.8rem,5vw,5.2rem)] xl:text-[5.8rem] font-black text-black whitespace-nowrap">
                MOVES.
              </span>
            </h2>
          </div>

          {/* Right Column: Architectural Narrative, Technical Pillars & Actions */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center space-y-6 lg:border-l lg:border-light-border/70 lg:pl-8 xl:pl-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-secondary-text">
                <Activity className="w-3.5 h-3.5 text-electric-cyan-dark" />
                <span>Ecosystem Vision</span>
              </div>
              <p className="text-base sm:text-lg text-secondary-text leading-relaxed font-normal">
                Charging isn't merely delivering kilowatt-hours. It is the invisible backbone linking clean electric vehicles, urban infrastructure, and renewable grids worldwide.
              </p>
            </div>

            {/* Technical Pillars */}
            <div className="space-y-3.5 pt-1">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-light-gray/80 border border-light-border hover:border-electric-cyan/40 hover:shadow-soft transition-all duration-300">
                <div className="p-2.5 rounded-xl bg-electric-cyan/15 text-electric-cyan-dark shrink-0">
                  <Zap className="w-5 h-5 text-[#14B8A6]" />
                </div>
                <div>
                  <h3 className="font-lato font-bold text-base tracking-tight text-charcoal">
                    Ultra-Rapid Delivery
                  </h3>
                  <p className="text-sm text-secondary-text mt-1 leading-relaxed font-normal font-lato">
                    Up to 350 kW liquid-cooled DC hubs charging modern 800V EVs in under 18 minutes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-light-gray/80 border border-light-border hover:border-electric-green/40 hover:shadow-soft transition-all duration-300">
                <div className="p-2.5 rounded-xl bg-electric-green/20 text-electric-green-deep shrink-0">
                  <Shield className="w-5 h-5 text-electric-green-dark" />
                </div>
                <div>
                  <h3 className="font-lato font-bold text-base tracking-tight text-charcoal">
                    99.98% Network Uptime
                  </h3>
                  <p className="text-sm text-secondary-text mt-1 leading-relaxed font-normal font-lato">
                    Automated cloud diagnostics, ISO 15118 Autocharge handshake, and renewable grid balancing.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Actions with Turquoise-to-Green Gradient */}
            <div className="pt-2 flex flex-wrap gap-3.5 items-center">
              <Link
                href="/charging-solutions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all shadow-[0_4px_20px_rgba(8,220,197,0.35)] hover:shadow-[0_0_30px_rgba(8,220,197,0.5)] hover:-translate-y-0.5 active:translate-y-0 border border-white/20"
              >
                <span>Explore Solutions</span>
                <ArrowRight className="w-4 h-4 text-[#071A16]" />
              </Link>
              <Link
                href="/find-chargers"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white hover:bg-light-gray border border-light-border text-charcoal hover:border-turquoise transition-all shadow-soft"
              >
                <span>Find a Charger</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
