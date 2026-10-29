import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-secondary-text">Last Updated: October 2026 • EVION Mobility Network</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-sm text-secondary-text leading-relaxed space-y-6 border-t border-light-border pt-6">
          <p>
            At EVION (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), we take your privacy and personal data seriously. This Privacy Policy outlines how EVION Mobility Network Ltd collects, handles, processes, and protects information when you access our electric vehicle charging stations, website, and mobile platform.
          </p>

          <h2 className="text-lg font-bold text-charcoal pt-2">1. Information We Collect</h2>
          <p>
            To deliver rapid and dependable charging services, we collect limited personal and technical information, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Session Telemetry:</strong> Charging energy consumed (kWh), peak power draw (kW), vehicle battery state of charge (SoC), charging duration, connector type, and charging station hardware ID.</li>
            <li><strong>Payment & Billing Data:</strong> Transaction tokens, masked card digits (last 4), billing postcode, and digital receipt delivery email or phone number. We do not store raw primary account credit card numbers on our servers; payments are processed securely through PCI-DSS Level 1 certified gateways.</li>
            <li><strong>Geographic Location Data:</strong> Precise or approximate location data shared via your browser or mobile device strictly to locate nearby EVION charging stations and provide directions when authorized.</li>
            <li><strong>Enquiry & Communication Data:</strong> Full name, email address, phone number, and message contents submitted through our contact and enterprise survey forms.</li>
          </ul>

          <h2 className="text-lg font-bold text-charcoal pt-2">2. How We Use Your Data</h2>
          <p>
            Your information is processed exclusively for legitimate operational purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Facilitating charging station access, connection verification, and session completion.</li>
            <li>Accurate per-kilowatt-hour invoicing and issuing digital receipts.</li>
            <li>Real-time network capacity management, dynamic load balancing, and fault diagnosis.</li>
            <li>Responding to customer support tickets and business site survey enquiries.</li>
          </ul>

          <h2 className="text-lg font-bold text-charcoal pt-2">3. Data Sharing & Third Parties</h2>
          <p>
            EVION does not sell, rent, or trade your personal data. We share necessary data only with certified service providers, such as payment processors (PCI-DSS compliant), cloud telemetry infrastructure providers, and mapping providers under strict data processing agreements in compliance with GDPR.
          </p>

          <h2 className="text-lg font-bold text-charcoal pt-2">4. Data Security & Retention</h2>
          <p>
            We implement state-of-the-art encryption (TLS 1.3 in transit, AES-256 at rest) across all charging station communications, using OCPP 2.0.1 secure profiles. Telemetry data is pseudonymized after 90 days.
          </p>

          <h2 className="text-lg font-bold text-charcoal pt-2">5. Your Legal Rights</h2>
          <p>
            Under applicable privacy laws (including GDPR and UK Data Protection Act), you have the right to access, rectify, export, or request erasure of your personal data. To exercise these rights, email <a href="mailto:privacy@evioncharge.com" className="text-charcoal font-bold underline">privacy@evioncharge.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

