'use client';

import React from 'react';
import { ShieldCheck, Zap, Globe, Gauge, CheckCircle2 } from 'lucide-react';

interface MetricItem {
  value: string;
  label: string;
  detail: string;
  icon: React.ElementType;
}

const METRICS: MetricItem[] = [
  {
    value: '350 kW',
    label: 'Ultra-Fast Output',
    detail: 'High-power 800V DC liquid-cooled architecture',
    icon: Gauge,
  },
  {
    value: '99.98%',
    label: 'Verified Hub Uptime',
    detail: '24/7 continuous OCPP telemetry monitoring',
    icon: ShieldCheck,
  },
  {
    value: '100%',
    label: 'Zero-Emission Power',
    detail: 'Certified wind and solar grid contracts',
    icon: Zap,
  },
  {
    value: '< 20 min',
    label: 'Typical DC Rapid Session',
    detail: 'Optimal 10% to 80% state of charge curve',
    icon: CheckCircle2,
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-light-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {METRICS.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-soft-white/70 rounded-3xl p-6 border border-light-border/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-turquoise/15 to-neon-green/15 text-charcoal border border-turquoise/30">
                    <Icon className="w-5 h-5 text-turquoise" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-text">
                    Network Metric
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans mb-1">
                  {metric.value}
                </div>

                <h4 className="text-sm font-bold text-charcoal mb-1">
                  {metric.label}
                </h4>

                <p className="text-xs text-secondary-text leading-relaxed">
                  {metric.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

