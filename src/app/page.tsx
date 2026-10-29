import React from 'react';
import { CinematicHeroScroll } from '@/components/CinematicHeroScroll';
import { StatsSection } from '@/components/StatsSection';
import { BrandManifestoSection } from '@/components/BrandManifestoSection';
import { ChargingSolutionsSection } from '@/components/ChargingSolutionsSection';
import { EvionDifferenceSection } from '@/components/EvionDifferenceSection';
import { ChargingExperienceSection } from '@/components/ChargingExperienceSection';
import { ChargingInfrastructureSection } from '@/components/ChargingInfrastructureSection';
import { FindChargerSection } from '@/components/FindChargerSection';
import { ContactCtaSection } from '@/components/ContactCtaSection';

export const metadata = {
  title: "EVION | Smarter Electric Vehicle Charging Solutions",
  description: "Discover EVION's electric vehicle charging solutions for a more seamless charging experience. High-power DC charging hubs, smart station discovery, and enterprise infrastructure.",
  openGraph: {
    title: "EVION | Smarter Electric Vehicle Charging Solutions",
    description: "Discover EVION's electric vehicle charging solutions for a more seamless charging experience.",
    images: [{ url: "/images/hero-poster.jpg" }],
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Main Cinematic Scroll-Driven Experience (Hero + 6 Scenes) */}
      <CinematicHeroScroll />

      {/* Network Trust & Reliability Stats */}
      <StatsSection />

      {/* Brand Manifesto — High-Impact Typographic Showcase */}
      <BrandManifestoSection />

      {/* Section A — Charging Solutions (Home, Commercial, Public EV Charging) */}
      <ChargingSolutionsSection />

      {/* Section B — The EVION Difference (Hardware & 3 concise highlights) */}
      <EvionDifferenceSection />

      {/* Section C — The Charging Experience (CONNECT -> CHARGE -> CONTINUE) */}
      <ChargingExperienceSection />

      {/* Section D — Charging Infrastructure (Split layout with 3D Model / Parallax) */}
      <ChargingInfrastructureSection />

      {/* Interactive Hub Locator & Charging Map */}
      <FindChargerSection />

      {/* Section E — Call to Action (Full-width light green glow closing section) */}
      <ContactCtaSection />
    </div>
  );
}
