'use client';

import React, { useState, useEffect } from 'react';
import {
  Zap,
  BatteryCharging,
  Clock,
  Gauge,
  Activity,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

interface FloatingChargingDashboardProps {
  className?: string;
  isCompact?: boolean;
}

export const FloatingChargingDashboard: React.FC<FloatingChargingDashboardProps> = ({
  className = '',
  isCompact = false,
}) => {
  // Interactive simulated states
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [powerKw, setPowerKw] = useState(150);
  const [timeRemainingMin, setTimeRemainingMin] = useState(18);
  const [energyDeliveredKwh, setEnergyDeliveredKwh] = useState(42.6);
  const [currentVoltage, setCurrentVoltage] = useState(785); // 800V architecture

  // Subtle live fluctuation for realistic charging telemetry demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setPowerKw((prev) => {
        const delta = (Math.random() - 0.48) * 3;
        return Math.min(154, Math.max(146, Math.round((prev + delta) * 10) / 10));
      });
      setCurrentVoltage((prev) => {
        const delta = Math.floor((Math.random() - 0.5) * 4);
        return Math.min(792, Math.max(778, prev + delta));
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-5 md:p-6 shadow-floating hover:shadow-green-glow/40 transition-all duration-500 ${className}`}
    >
      {/* Decorative Top Accent Glow Bar */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#08DCC5] to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-light-border/80">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-turquoise/15 text-turquoise border border-turquoise/30">
            <Zap className="w-4 h-4 fill-turquoise text-turquoise" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-neon-green animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-neon-green" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-secondary-text">
                CHARGING STATUS
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-turquoise/10 text-charcoal border border-turquoise/30">
                <CheckCircle2 className="w-2.5 h-2.5 text-neon-green" /> Active
              </span>
            </div>
            <h4 className="text-sm font-bold text-charcoal">EVION Ultra-Charge 350</h4>
          </div>
        </div>

        {/* Connector Badge */}
        <div className="flex flex-col items-end">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-charcoal text-white shadow-soft flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
            CCS2
          </span>
          <span className="text-[10px] text-secondary-text mt-0.5">800V DC High Power</span>
        </div>
      </div>

      {/* Battery Gauge and Visual Fill */}
      <div className="py-4">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-semibold text-secondary-text flex items-center gap-1">
            <BatteryCharging className="w-3.5 h-3.5 text-turquoise" />
            State of Charge (SoC)
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-charcoal tracking-tight font-sans">
              {batteryLevel}
            </span>
            <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-turquoise to-neon-green">%</span>
          </div>
        </div>

        {/* Smooth Continuous Gradient Battery Bar with Subtle Glow */}
        <div className="w-full h-3.5 p-0.5 bg-light-gray rounded-xl border border-light-border overflow-hidden relative">
          <div
            className="h-full rounded-lg bg-evion-gradient transition-all duration-500 shadow-[0_0_16px_rgba(8,220,197,0.45)]"
            style={{ width: `${batteryLevel}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-secondary-text font-medium mt-1.5 px-0.5">
          <span>0%</span>
          <span className="text-charcoal font-semibold">Target: 80% (Optimal Curve)</span>
          <span>100%</span>
        </div>
      </div>

      {/* Charging Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y border-light-border/80">
        <div className="bg-soft-white/90 p-2.5 rounded-2xl border border-light-border">
          <div className="flex items-center gap-1.5 text-secondary-text text-[11px] mb-1">
            <Gauge className="w-3.5 h-3.5 text-electric-green-deep" />
            <span>Power Output</span>
          </div>
          <p className="text-base font-bold text-charcoal">
            {powerKw}{' '}
            <span className="text-xs font-semibold text-secondary-text">kW</span>
          </p>
        </div>

        <div className="bg-soft-white/90 p-2.5 rounded-2xl border border-light-border">
          <div className="flex items-center gap-1.5 text-secondary-text text-[11px] mb-1">
            <Clock className="w-3.5 h-3.5 text-electric-green-deep" />
            <span>Est. Remaining</span>
          </div>
          <p className="text-base font-bold text-charcoal">
            {timeRemainingMin}{' '}
            <span className="text-xs font-semibold text-secondary-text">min</span>
          </p>
        </div>

        <div className="bg-soft-white/90 p-2.5 rounded-2xl border border-light-border col-span-2 sm:col-span-1">
          <div className="flex items-center gap-1.5 text-secondary-text text-[11px] mb-1">
            <Activity className="w-3.5 h-3.5 text-electric-green-deep" />
            <span>Delivered Energy</span>
          </div>
          <p className="text-base font-bold text-charcoal">
            {energyDeliveredKwh}{' '}
            <span className="text-xs font-semibold text-secondary-text">kWh</span>
          </p>
        </div>
      </div>

      {/* Dynamic Animated Charging Waveform */}
      <div className="mt-3 pt-2">
        <div className="flex items-center justify-between text-[11px] text-secondary-text mb-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            800V Architecture Flow
          </span>
          <span className="font-mono text-charcoal font-semibold">{currentVoltage} V • 192 A</span>
        </div>

        {/* SVG Flow Waveform with Turquoise-to-Green Gradient */}
        <div className="h-6 w-full overflow-hidden rounded-lg bg-soft-white border border-light-border/60 relative flex items-center">
          <svg
            className="w-full h-full"
            viewBox="0 0 300 24"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#08DCC5" />
                <stop offset="50%" stopColor="#00EBC0" />
                <stop offset="100%" stopColor="#00E85A" />
              </linearGradient>
            </defs>
            <path
              d="M0 12 Q 25 3, 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12"
              fill="none"
              stroke="url(#flowGradient)"
              strokeWidth="2.5"
              strokeDasharray="8 4"
              className="animate-wave"
            />
          </svg>
        </div>
      </div>

      {/* Demo Data Disclaimer */}
      <div className="mt-3 text-center">
        <span className="text-[10px] text-secondary-text/80 tracking-tight">
          * Illustrative demonstration telemetry. Actual rates depend on vehicle intake limit & temperature.
        </span>
      </div>
    </div>
  );
};

