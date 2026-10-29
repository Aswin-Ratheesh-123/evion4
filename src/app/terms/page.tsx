import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-text hover:text-charcoal transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-electric-green-mint text-electric-green-deep">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">Terms and Conditions</h1>
            <p className="text-xs text-secondary-text">Effective Date: October 2026 • EVION Network Agreement</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-sm text-secondary-text leading-relaxed space-y-6 border-t border-light-border pt-6">
          <p>
            Welcome to EVION. These Terms and Conditions govern your access to and use of EVION charging stations, mobile digital services, and website operated by EVION Mobility Network Ltd (&ldquo;EVION&rdquo;). By connecting to any EVION charger or using our digital services, you agree to comply with these terms.
          </p>

          <h2 className="text-lg font-bold text-charcoal pt-2">1. Scope of Services</h2>
          <p>
            EVION provides electric vehicle charging equipment, station discovery services, and energy delivery. EVION is exclusively an EV charging network infrastructure provider. EVION does not manufacture vehicles, sell cars, or warrant the mechanical or electrical systems of vehicles connected to its charging bays.
          </p>

          <h2 className="text-lg font-bold text-charcoal pt-2">2. Station Use and Bay Etiquette</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Charging bays are reserved exclusively for electric vehicles actively receiving power.</li>
            <li>Once charging completes or reaches your vehicle&apos;s specified target percentage, users are required to move their vehicle within a 15-minute grace period to ensure fair access for other motorists.</li>
            <li>Users must use manufacturer-certified cables and connectors compatible with CCS2, NACS, or Type 2 standards. Never force a connector into a damaged vehicle charging port.</li>
          </ul>

          <h2 className="text-lg font-bold text-charcoal pt-2">3. Pricing and Billing</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Applicable per-kWh charging rates and connection fees are clearly displayed on the station screen prior to session initiation.</li>
            <li>A temporary pre-authorization hold may be placed on your credit or debit card when starting a session and is released automatically upon settlement of final energy delivered.</li>
            <li>Tariffs are subject to periodic adjustments based on wholesale energy costs and grid demand.</li>
          </ul>

          <h2 className="text-lg font-bold text-charcoal pt-2">4. Limitation of Liability</h2>
          <p>
            EVION maintains its charging network in accordance with industry safety standards (ISO 15118, IEC 61851). However, EVION is not liable for indirect damages, vehicle battery degradation inherent to manufacturer fast-charging profiles, or interruptions caused by external electricity grid outages.
          </p>

          <h2 className="text-lg font-bold text-charcoal pt-2">5. Support and Dispute Resolution</h2>
          <p>
            For billing queries, hardware assistance, or service reports, contact our 24/7 Operations Desk at <a href="mailto:support@evioncharge.com" className="text-charcoal font-bold underline">support@evioncharge.com</a> or telephone +44 800 384 6600.
          </p>
        </div>
      </div>
    </div>
  );
}

