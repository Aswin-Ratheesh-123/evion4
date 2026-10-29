'use client';

import React from 'react';
import { ContactSection } from '@/components/ContactSection';
import { FaqSection } from '@/components/FaqSection';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Top Banner */}
      <section className="py-12 md:py-16 bg-soft-white border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-electric-green-deep">
            SUPPORT & COMMERCIAL ENQUIRIES
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal tracking-tight mt-1">
            We&apos;re Here to Help You Charge
          </h1>
          <p className="mt-3 text-base sm:text-lg text-secondary-text max-w-xl mx-auto">
            Get in touch with EVION driver support, network operations, or our commercial charging team.
          </p>
        </div>
      </section>

      {/* Main Interactive Contact Component */}
      <ContactSection />

      {/* Frequently Asked Questions Quick Reference */}
      <div className="mt-8">
        <FaqSection />
      </div>
    </div>
  );
}

