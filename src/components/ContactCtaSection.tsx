'use client';

import React from 'react';
import Link from 'next/link';
import {
  Zap,
  ArrowRight,
  PhoneCall,
  Mail,
  ShieldCheck,
} from 'lucide-react';

export const ContactCtaSection: React.FC = () => {
  const scrollToSolutions = () => {
    const el = document.getElementById('solutions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact-cta" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-light-border">
      {/* Light green gradient and soft green glow background (strictly no dark background) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-electric-green-mint/25 to-white pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-electric-green/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-light-border text-charcoal shadow-soft mb-6">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-secondary-text">
            JOIN THE ELECTRIC REVOLUTION
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display uppercase text-3xl sm:text-5xl lg:text-6xl text-charcoal tracking-[-0.035em] leading-[0.92]">
          <span className="font-light block text-charcoal/80">Ready to Power</span>
          <span className="font-black text-charcoal block">What's Next?</span>
        </h2>

        {/* Supporting Text */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-secondary-text max-w-2xl mx-auto leading-relaxed font-normal">
          Let's build a better charging experience together. Whether you need residential home charging, workplace fleet deployment, or ultra-fast public charging infrastructure.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToSolutions}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all duration-300 shadow-[0_4px_25px_rgba(8,220,197,0.4)] hover:shadow-[0_0_35px_rgba(8,220,197,0.55)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-white/20"
          >
            <span>Explore Solutions</span>
            <ArrowRight className="w-4 h-4 text-[#071A16]" />
          </button>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold bg-white hover:bg-light-gray border border-light-border text-charcoal hover:border-turquoise transition-all duration-300 shadow-soft hover:-translate-y-0.5 active:translate-y-0"
          >
            <PhoneCall className="w-4 h-4 text-turquoise" />
            <span>Contact Our Team</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-light-border/80 flex flex-wrap items-center justify-center gap-8 text-xs text-secondary-text font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-electric-green-dark" />
            <span>24/7 UK & European Driver Support</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-electric-green-dark" />
            <span>100% Certified Renewable Energy</span>
          </div>
          <div>
            <span>Open OCPP 2.0.1 Cloud Protocol</span>
          </div>
        </div>
      </div>
    </section>
  );
};

