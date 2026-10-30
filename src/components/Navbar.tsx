'use client';

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EvionLogo } from './EvionLogo';
import {
  Zap,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Compass,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  isAnchor?: boolean;
  badge?: string;
  description?: string;
}

interface MobileNavItem {
  index: string;
  label: string;
  href: string;
  isAnchor?: boolean;
  subtitle?: string;
  badge?: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Solutions',
    href: '/#solutions',
    isAnchor: true,
    description: 'Home, Commercial & Rapid DC Hubs',
  },
  {
    label: 'The Difference',
    href: '/#difference',
    isAnchor: true,
    description: '800V Architecture & Uptime',
  },
  {
    label: 'Experience',
    href: '/#experience',
    isAnchor: true,
    description: 'Connect → Charge → Continue',
  },
  {
    label: 'Infrastructure',
    href: '/#infrastructure',
    isAnchor: true,
    description: 'Megawatt Corridors & Microgrids',
  },
  { label: 'Find Chargers', href: '/find-chargers', badge: 'Live' },
  { label: 'About', href: '/about' },
];

const MOBILE_NAV_ITEMS: readonly MobileNavItem[] = [
  { index: '01', label: 'Home', href: '/', isAnchor: false, subtitle: 'Arrival & Overview' },
  { index: '02', label: 'Charging Solutions', href: '/#solutions', isAnchor: true, subtitle: 'Home, Fleet & Rapid Corridors' },
  { index: '03', label: 'The EVION Difference', href: '/#difference', isAnchor: true, subtitle: '800V Architecture & Uptime' },
  { index: '04', label: 'About EVION', href: '/about', isAnchor: false, subtitle: 'Our Mission & Architecture' },
  { index: '05', label: 'Station Map', href: '/find-chargers', isAnchor: false, subtitle: 'Live Hub Availability', badge: 'Live' },
  { index: '06', label: 'Contact', href: '/contact', isAnchor: false, subtitle: 'Support & Enterprise Inquiries' },
];

export const Navbar: React.FC = memo(function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // State refs to guard against redundant React re-renders during high-speed scroll
  const isScrolledRef = useRef(false);
  const isOverHeroRef = useRef(true);
  const activeSectionRef = useRef('home');

  // Cached layout coordinates (updated on resize to eliminate getBoundingClientRect on scroll)
  const heroThresholdRef = useRef(3500);
  const sectionPositionsRef = useRef<{ id: string; top: number; bottom: number }[]>([]);

  // Cache section positions on mount and window resize
  const measureSections = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (isHomePage) {
      const cinematicEl = document.getElementById('cinematic-experience');
      if (cinematicEl) {
        const totalHeight = cinematicEl.offsetHeight;
        const windowHeight = window.innerHeight;
        // The cinematic experience fades to white at 88% scroll progress
        heroThresholdRef.current = cinematicEl.offsetTop + (totalHeight - windowHeight) * 0.88;
      }

      const sectionIds = ['solutions', 'difference', 'experience', 'infrastructure'];
      const positions: { id: string; top: number; bottom: number }[] = [];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          positions.push({ id, top, bottom });
        }
      }
      sectionPositionsRef.current = positions;
    } else {
      heroThresholdRef.current = 0;
      sectionPositionsRef.current = [];
    }
  }, [isHomePage]);

  // Handle high-performance scroll with requestAnimationFrame ticking
  useEffect(() => {
    measureSections();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measureSections, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // 1. Scrolled state (> 25px)
          const nextScrolled = scrollY > 25;
          if (nextScrolled !== isScrolledRef.current) {
            isScrolledRef.current = nextScrolled;
            setIsScrolled(nextScrolled);
          }

          // 2. Over hero check (Pure O(1) comparison against cached threshold)
          if (isHomePage) {
            const nextOverHero = scrollY < heroThresholdRef.current;
            if (nextOverHero !== isOverHeroRef.current) {
              isOverHeroRef.current = nextOverHero;
              setIsOverHero(nextOverHero);
            }

            // 3. Active Section check
            let currentSec = 'home';
            if (scrollY >= heroThresholdRef.current) {
              const probeY = scrollY + 220;
              for (const sec of sectionPositionsRef.current) {
                if (probeY >= sec.top && probeY < sec.bottom) {
                  currentSec = sec.id;
                  break;
                }
              }
            }

            if (currentSec !== activeSectionRef.current) {
              activeSectionRef.current = currentSec;
              setActiveSection(currentSec);
            }
          } else {
            if (isOverHeroRef.current) {
              isOverHeroRef.current = false;
              setIsOverHero(false);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial evaluation
    onScroll();

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isHomePage, measureSections]);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && isHomePage) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(el, { offset: -70, duration: 1.4 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        activeSectionRef.current = targetId;
        setActiveSection(targetId);
        setMobileMenuOpen(false);
      }
    }
  };

  // Adaptive theme determination
  const navTheme = isOverHero ? 'dark' : 'light';
  const isDark = navTheme === 'dark';

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-3.5 sm:px-6 lg:px-8 pointer-events-none will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Desktop Floating Luxury Glass Island (Unchanged) */}
          <div
            className={`hidden lg:flex w-full items-center justify-between px-5 lg:px-6 py-2.5 rounded-full transition-all duration-300 pointer-events-auto ${
              isDark
                ? 'bg-charcoal/80 backdrop-blur-xl border border-white/15 text-white shadow-2xl'
                : 'bg-white/92 backdrop-blur-xl border border-light-border text-charcoal shadow-soft'
            }`}
          >
            {/* Left: Desktop Logo */}
            <EvionLogo size="sm" theme={isDark ? 'dark' : 'light'} />

            {/* Center: Desktop Navigation Links */}
            <nav role="navigation" aria-label="Main Navigation" className="flex items-center gap-0.5 xl:gap-1">
              {NAV_ITEMS.map((item) => {
                const isHome = item.href === '/';
                const isCurrent =
                  (isHome && isHomePage && activeSection === 'home') ||
                  (item.isAnchor && activeSection === item.href.replace('/#', '')) ||
                  (!item.isAnchor && !isHome && pathname === item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-semibold font-lato tracking-wide transition-all duration-200 group flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-green ${
                      isCurrent
                        ? isDark
                          ? 'text-white bg-white/15 font-bold shadow-soft'
                          : 'text-charcoal bg-light-gray font-bold shadow-soft'
                        : isDark
                        ? 'text-white/75 hover:text-white hover:bg-white/10'
                        : 'text-secondary-text hover:text-charcoal hover:bg-light-gray/70'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase bg-gradient-to-r from-turquoise/20 to-neon-green/20 text-charcoal border border-turquoise/40">
                        {item.badge}
                      </span>
                    )}
                    {isCurrent && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-0.5 rounded-full bg-evion-gradient" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Desktop Action Cluster */}
            <div className="flex items-center gap-2 xl:gap-3 shrink-0">
              <Link
                href="/find-chargers"
                className={`text-xs font-bold font-lato transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise ${
                  isDark
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-charcoal hover:text-turquoise hover:bg-light-gray'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-turquoise" />
                <span>Station Map</span>
              </Link>

              {/* Primary CTA */}
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-bold font-lato bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all duration-300 shadow-[0_0_20px_rgba(8,220,197,0.35)] hover:shadow-[0_0_28px_rgba(8,220,197,0.5)] hover:-translate-y-0.5 active:translate-y-0 border border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise"
              >
                <Zap className="w-3.5 h-3.5 fill-[#071A16]" />
                <span>Get in Touch</span>
              </Link>
            </div>
          </div>

          {/* Mobile Redesigned Floating Island (Aero Capsule with Tactile Cockpit Menu) */}
          <div className="flex lg:hidden w-full h-[54px] items-center justify-between px-3.5 sm:px-4 py-1.5 rounded-full bg-white/94 backdrop-blur-2xl border border-black/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 pointer-events-auto">
            {/* Left: Clean EVION Wordmark Logo */}
            <EvionLogo size="sm" theme="light" />

            {/* Right: Tactile Automotive Cockpit Menu Capsule */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className={`h-9 px-3.5 rounded-full flex items-center gap-2 transition-all duration-300 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-green active:scale-95 shrink-0 ${
                mobileMenuOpen
                  ? 'bg-charcoal text-electric-green border-charcoal shadow-soft'
                  : 'bg-[#11161A] hover:bg-charcoal text-white border-white/10 shadow-sm'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest font-mono">
                {mobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
              <div className="w-3.5 h-2.5 relative flex flex-col justify-between items-end">
                <span
                  className={`h-[2px] rounded-full transition-all duration-300 ${
                    mobileMenuOpen
                      ? 'w-3.5 bg-electric-green rotate-45 translate-y-[4px]'
                      : 'w-3.5 bg-electric-green'
                  }`}
                />
                <span
                  className={`h-[2px] rounded-full transition-all duration-300 ${
                    mobileMenuOpen
                      ? 'w-3.5 bg-white -rotate-45 -translate-y-[4px]'
                      : 'w-2 bg-white'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Modern Luxury Fullscreen Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-charcoal/65 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-y-auto p-5 sm:p-6 border-l border-light-border animate-in slide-in-from-right duration-300">
            {/* Top Bar inside Drawer */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-light-border">
                <EvionLogo size="sm" theme="light" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-9 px-3 rounded-full flex items-center gap-1.5 bg-light-gray hover:bg-light-border text-charcoal border border-light-border text-[10px] font-black uppercase tracking-wider font-mono active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-green"
                  aria-label="Close navigation menu"
                >
                  <X className="w-4 h-4 text-charcoal" />
                  <span>CLOSE</span>
                </button>
              </div>

              {/* Brand Philosophy Mini-Banner */}
              <div className="my-4 p-3.5 rounded-2xl bg-gradient-to-br from-light-gray via-soft-white to-light-gray border border-light-border/80 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-electric-green/10 rounded-full blur-xl pointer-events-none" />
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-secondary-text block mb-1">
                  EVION PHILOSOPHY
                </span>
                <p className="font-lato uppercase tracking-tight leading-tight text-xs sm:text-sm text-charcoal">
                  <span className="font-light block text-charcoal/80">WE DON'T JUST BUILD CHARGERS.</span>
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-turquoise to-neon-green block">WE CONNECT THE WAY</span>
                  <span className="font-bold text-charcoal block">THE WORLD MOVES.</span>
                </p>
              </div>

              {/* Numbered Navigation Links Group */}
              <nav aria-label="Mobile Navigation Links" className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary-text px-3 mb-1.5 font-lato">
                  Index
                </p>
                {MOBILE_NAV_ITEMS.map((item) => {
                  const isCurrent =
                    (item.href === '/' && isHomePage && activeSection === 'home') ||
                    (item.isAnchor && activeSection === item.href.replace('/#', '')) ||
                    (!item.isAnchor && item.href !== '/' && pathname === item.href);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        handleAnchorClick(e, item.href);
                        setMobileMenuOpen(false);
                      }}
                      className={`group flex items-center justify-between p-3 rounded-2xl transition-all duration-200 ${
                        isCurrent
                          ? 'bg-electric-green/15 text-charcoal border border-electric-green/40 shadow-soft'
                          : 'text-charcoal/90 hover:text-charcoal hover:bg-light-gray'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[11px] font-mono font-bold ${isCurrent ? 'text-electric-green-dark' : 'text-secondary-text/60'}`}>
                          {item.index}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-lato tracking-tight leading-tight text-lg sm:text-xl font-bold ${
                                isCurrent ? 'text-charcoal font-extrabold' : 'text-charcoal'
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold uppercase bg-evion-gradient text-[#071A16]">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <span className="text-[10px] text-secondary-text font-normal block mt-0.5">
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isCurrent
                            ? 'text-charcoal translate-x-0.5'
                            : 'text-secondary-text/50 group-hover:text-charcoal group-hover:translate-x-1'
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="mt-6 pt-4 border-t border-light-border space-y-2.5">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-11 flex items-center justify-center gap-2 px-6 rounded-2xl text-xs sm:text-sm font-bold bg-evion-gradient hover:opacity-95 text-[#071A16] shadow-[0_0_20px_rgba(8,220,197,0.35)] hover:shadow-[0_0_28px_rgba(8,220,197,0.5)] transition-all active:scale-[0.98]"
              >
                <span>Get in Touch →</span>
              </Link>

              <Link
                href="/find-chargers"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-10 flex items-center justify-center gap-2 px-4 rounded-2xl text-xs font-semibold bg-light-gray hover:bg-light-border text-charcoal border border-light-border transition-all"
              >
                <Compass className="w-3.5 h-3.5 text-electric-green-dark" />
                <span>Station Map & Live Hub Availability</span>
              </Link>

              <div className="flex items-center justify-between text-[11px] text-secondary-text pt-1.5 px-1">
                <span>24/7 Driver Support</span>
                <span className="font-mono font-bold text-charcoal">+44 800 384 6600</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
