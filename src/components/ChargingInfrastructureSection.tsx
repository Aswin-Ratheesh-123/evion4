'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Globe2,
  Zap,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  Gauge,
  Compass,
} from 'lucide-react';
import { StationShowcase3D } from './StationShowcase3D';

export const ChargingInfrastructureSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState<number>(0);
  const [showInteractive3D, setShowInteractive3D] = useState<boolean>(false);

  // Subtle restrained parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate if in or near viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const offset = (rect.top - windowHeight / 2) * 0.06; // Restrained 6% parallax
        setParallaxY(offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="infrastructure"
      className="py-24 md:py-32 bg-light-gray relative overflow-hidden border-t border-light-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline & Supporting Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-light-border text-charcoal shadow-soft">
              <Globe2 className="w-3.5 h-3.5 text-electric-green-dark" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-secondary-text">
                HIGHWAY & URBAN NETWORKS
              </span>
            </div>

            <h2 className="font-lato section-heading !text-3xl sm:!text-5xl lg:!text-6xl text-charcoal tracking-tight font-extrabold leading-tight">
              <span className="font-semibold block text-charcoal/80">Building the Future</span>
              <span className="font-extrabold text-charcoal block">Of EV Charging.</span>
            </h2>

            <p className="body-text leading-relaxed">
              EVION deploys high-capacity charging infrastructure that bridges metropolitan centers with long-distance travel corridors. Engineered for seamless grid interaction, load-balanced megawatt capacities, and zero-downtime reliability.
            </p>

            {/* Infrastructure Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-light-border shadow-soft">
                <span className="text-[10px] font-bold uppercase text-secondary-text block mb-1">
                  Grid Integration
                </span>
                <span className="text-xl font-black text-charcoal block">
                  350 kW DC
                </span>
                <span className="text-xs text-secondary-text">
                  Dynamic microgrid balancing
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-light-border shadow-soft">
                <span className="text-[10px] font-bold uppercase text-secondary-text block mb-1">
                  Energy Sourcing
                </span>
                <span className="text-xl font-black text-electric-green-dark block">
                  100% Green
                </span>
                <span className="text-xs text-secondary-text">
                  Backed by certified renewables
                </span>
              </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm text-charcoal font-medium">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-electric-green shrink-0" />
                <span>Liquid-cooled high-amperage cables designed for effortless handling in all weather</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-electric-green shrink-0" />
                <span>Universal CCS2 & NACS compatibility serving 100% of modern electric vehicles</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-electric-green shrink-0" />
                <span>Autonomous cloud diagnostics with proactive preventative servicing</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/business"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm sm:text-base font-bold font-lato bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all duration-300 shadow-[0_4px_20px_rgba(8,220,197,0.35)] hover:shadow-[0_0_30px_rgba(8,220,197,0.5)] border border-white/20"
              >
                <span>Enterprise Infrastructure</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => setShowInteractive3D(!showInteractive3D)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold font-lato bg-white hover:bg-light-gray border border-light-border text-charcoal transition-all shadow-soft cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 text-electric-green-dark" />
                <span>{showInteractive3D ? 'Show Studio Photo' : 'Explore Interactive 3D Model'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual with Restrained Scroll Parallax & Interactive 3D */}
          <div className="lg:col-span-6 relative">
            {!showInteractive3D ? (
              <div
                className="relative rounded-3xl overflow-hidden bg-charcoal border border-light-border shadow-2xl transition-transform duration-300 ease-out"
                style={{ transform: `translateY(${parallaxY}px)` }}
              >
                <img
                  src="/images/evion-station-stand.jpg"
                  alt="EVION Charging Infrastructure Station"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/60 block">
                      Rapid Corridor Station
                    </span>
                    <span className="font-bold text-white">
                      EVION Dual-Dispensary Terminal
                    </span>
                  </div>

                  <button
                    onClick={() => setShowInteractive3D(true)}
                    className="px-3 py-1.5 rounded-full bg-electric-green text-charcoal font-bold text-[11px] shadow-green-glow-sm hover:scale-105 transition-transform cursor-pointer"
                  >
                    3D View
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative rounded-3xl overflow-hidden bg-white border border-light-border shadow-2xl p-4">
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="text-xs font-bold text-charcoal">
                    Interactive 3D Hardware Model
                  </span>
                  <button
                    onClick={() => setShowInteractive3D(false)}
                    className="text-xs font-bold text-secondary-text hover:text-charcoal"
                  >
                    Back to Studio Photo
                  </button>
                </div>
                {/* Embed genuine procedural Three.js component */}
                <StationShowcase3D />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

