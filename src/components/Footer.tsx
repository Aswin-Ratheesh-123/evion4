import React from 'react';
import Link from 'next/link';
import { EvionLogo } from './EvionLogo';
import {
  Zap,
  MapPin,
  ShieldCheck,
  Globe,
  Mail,
  Phone,
  ArrowUpRight,
  BatteryCharging,
  Layers,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white border-t border-light-border pt-16 pb-12 overflow-hidden">
      {/* Subtle background ambient glow with Turquoise-to-Green signature */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-turquoise/15 via-neon-green/10 to-transparent pointer-events-none rounded-b-[100px] blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-light-border">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <EvionLogo size="lg" showTagline />
            <p className="text-secondary-text text-xs sm:text-sm leading-relaxed max-w-sm pt-2">
              Smarter electric vehicle charging solutions for a connected world. Dedicated exclusively to intelligent charging hardware, high-power DC charging hubs, and enterprise infrastructure.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-charcoal">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-turquoise/15 to-neon-green/15 border border-turquoise/30 text-charcoal">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                Network Status: 99.8% Operational
              </span>
              <span className="text-secondary-text">100% Renewable Energy</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal mb-4">
              Charging Solutions
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/charging-solutions"
                  className="text-secondary-text hover:text-charcoal transition-all inline-flex items-center gap-1.5"
                >
                  <BatteryCharging className="w-3.5 h-3.5 text-electric-green-dark" />
                  All Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/charging-solutions#home"
                  className="text-secondary-text hover:text-charcoal transition-all"
                >
                  Home Wallbox (22kW)
                </Link>
              </li>
              <li>
                <Link
                  href="/charging-solutions#commercial"
                  className="text-secondary-text hover:text-charcoal transition-all"
                >
                  Commercial Charging
                </Link>
              </li>
              <li>
                <Link
                  href="/charging-solutions#ultra-fast"
                  className="text-secondary-text hover:text-charcoal transition-all"
                >
                  Ultra-Fast DC Hubs (350kW)
                </Link>
              </li>
              <li>
                <Link
                  href="/find-chargers"
                  className="text-secondary-text hover:text-charcoal transition-all inline-flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-electric-green-dark" />
                  Find Charging Hubs
                </Link>
              </li>
            </ul>
          </div>

          {/* Enterprise & Business */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal mb-4">
              Infrastructure
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/business"
                  className="text-secondary-text hover:text-charcoal transition-all"
                >
                  Workplace Fleet Hubs
                </Link>
              </li>
              <li>
                <Link
                  href="/business#property"
                  className="text-secondary-text hover:text-charcoal transition-all"
                >
                  Hospitality & Retail Hubs
                </Link>
              </li>
              <li>
                <Link
                  href="/#difference"
                  className="text-secondary-text hover:text-charcoal transition-all"
                >
                  The EVION Difference
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary-text hover:text-charcoal transition-all inline-flex items-center gap-1"
                >
                  Site Feasibility Request
                  <ArrowUpRight className="w-3 h-3 text-electric-green-dark" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal mb-4">
              Company & Help
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-secondary-text hover:text-charcoal transition-all"
                >
                  About EVION
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary-text hover:text-charcoal transition-all"
                >
                  Contact & 24/7 Support
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-secondary-text hover:text-charcoal transition-all"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-secondary-text hover:text-charcoal transition-all"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li className="pt-2 text-xs text-secondary-text flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-charcoal" />
                <span>+44 800 384 6600 (24/7)</span>
              </li>
              <li className="text-xs text-secondary-text flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-charcoal" />
                <span>support@evioncharge.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row: Legal & copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-secondary-text">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} EVION Mobility Network Ltd. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-charcoal font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-electric-green-dark" />
              Verified EV Charging Infrastructure
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-charcoal transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-charcoal transition-colors underline-offset-4 hover:underline"
            >
              Terms & Conditions
            </Link>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-light-gray border border-light-border text-charcoal">
              ISO 15118 & OCPP 2.0.1
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
