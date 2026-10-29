'use client';

import React from 'react';
import {
  Zap,
  Cpu,
  PlugZap,
  Compass,
  Activity,
  Wifi,
  ShieldCheck,
  Smartphone,
  Gauge,
  ArrowRight,
} from 'lucide-react';

interface TechFeature {
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  metric: string;
  metricLabel: string;
}

const TECH_FEATURES: TechFeature[] = [
  {
    title: 'Fast Charging Options',
    category: 'Dynamic Architecture',
    description:
      'Support for high-power DC charging rates up to 350 kW, enabling compatible 800V and 400V battery architectures to charge at their highest capable acceptance rate.',
    icon: Zap,
    metric: '350 kW',
    metricLabel: 'Peak DC Output',
  },
  {
    title: 'Smart Charging Information',
    category: 'Real-Time Insights',
    description:
      'Clear, accessible telemetry detailing delivered energy, instantaneous power curves, pricing transparency, and accurate estimated finish times.',
    icon: Cpu,
    metric: '100 ms',
    metricLabel: 'Telemetry Refresh',
  },
  {
    title: 'Connector Compatibility',
    category: 'Multi-Standard Hardware',
    description:
      'Equipped with industry-standard CCS2 and NACS high-power DC plugs, along with Type 2 AC connectors to serve virtually all electric vehicle makes on the road.',
    icon: PlugZap,
    metric: 'CCS2 & NACS',
    metricLabel: 'Universal Ports',
  },
  {
    title: 'Charging Station Discovery',
    category: 'Live Network Map',
    description:
      'Intuitive digital locator with live bay availability, verified power capacities, station amenities, and step-by-step route navigation.',
    icon: Compass,
    metric: '100%',
    metricLabel: 'Live Sync',
  },
  {
    title: 'Charging Progress Information',
    category: 'Session Monitoring',
    description:
      'Monitor your charging session from your smartphone or the high-contrast 27-inch touchscreen, receiving notifications when target battery percentage is reached.',
    icon: Activity,
    metric: 'Instant',
    metricLabel: 'App Push Alerts',
  },
  {
    title: 'Connected Digital Experiences',
    category: 'Seamless Access',
    description:
      'Convenient contactless tap-to-pay via digital wallets, physical credit cards, and automated ISO 15118 Autocharge without complex subscription locks.',
    icon: Wifi,
    metric: 'OCPP 2.0.1',
    metricLabel: 'Cloud Protocol',
  },
];

export const ChargingTechSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-soft-white/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-light-border text-charcoal shadow-soft mb-4">
            <Cpu className="w-4 h-4 text-electric-green-deep" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-text">
              TECHNOLOGY STANDARDS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Designed Around <span className="text-gradient-green">Better Charging Experiences</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-secondary-text leading-relaxed">
            Engineered around reliability, open interoperability standards, and fast intuitive driver interactions.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TECH_FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-7 border border-light-border hover:border-electric-green/60 transition-all duration-300 shadow-soft hover:shadow-card-hover hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Top Icon & Metric Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-soft-white border border-light-border text-charcoal group-hover:bg-evion-gradient group-hover:text-[#071A16] group-hover:shadow-[0_0_20px_rgba(8,220,197,0.4)] transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="text-right">
                      <span className="block text-xs font-extrabold text-charcoal">
                        {item.metric}
                      </span>
                      <span className="text-[10px] text-secondary-text font-medium">
                        {item.metricLabel}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-secondary-text block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-charcoal">
                    {item.title}
                  </h3>

                  <p className="text-sm text-secondary-text leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Micro green highlight bar */}
                <div className="mt-6 pt-4 border-t border-light-border/60 flex items-center justify-between text-xs text-secondary-text group-hover:text-electric-green-deep font-semibold transition-colors">
                  <span>Standard Specification</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-electric-green group-hover:scale-150 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

