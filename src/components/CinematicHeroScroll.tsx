'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Zap,
  ChevronDown,
  BatteryCharging,
  ShieldCheck,
  Activity,
  ArrowRight,
  Maximize2,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Gauge,
  CheckCircle2,
} from 'lucide-react';

interface SceneInfo {
  index: number;
  id: string;
  label: string;
  start: number;
  end: number;
}

const SCENES: SceneInfo[] = [
  { index: 1, id: 'arrival', label: '01 Arrival', start: 0.0, end: 0.20 },
  { index: 2, id: 'movement', label: '02 Perspective', start: 0.20, end: 0.40 },
  { index: 3, id: 'charger', label: '03 Charger Reveal', start: 0.40, end: 0.60 },
  { index: 4, id: 'connection', label: '04 Connection', start: 0.60, end: 0.82 },
  { index: 5, id: 'full-charge', label: '05 Full Charge', start: 0.82, end: 0.90 },
  { index: 6, id: 'departure', label: '06 Departure', start: 0.90, end: 1.0 },
];

type DeviceMode = 'desktop' | 'mobile';

export const CinematicHeroScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(9.96);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(1);
  const [batteryPercent, setBatteryPercent] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Animation frame scrubbing refs
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const pendingSeekTimeRef = useRef<number | null>(null);

  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Determine device mode (Mobile vs Desktop) based on viewport and aspect ratio
  const getDeviceMode = useCallback((): DeviceMode => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Mobile phones (<768px) OR portrait tablets (<1024px and portrait orientation)
    if (width < 768 || (width < 1024 && width < height)) {
      return 'mobile';
    }
    return 'desktop';
  }, []);

  // Initialize and handle dynamic viewport / orientation changes
  useEffect(() => {
    const updateMode = () => {
      const newMode = getDeviceMode();
      setDeviceMode((prevMode) => {
        if (prevMode !== newMode) {
          isSeekingRef.current = false;
          pendingSeekTimeRef.current = null;
          return newMode;
        }
        return prevMode;
      });
    };

    updateMode();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateMode, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [getDeviceMode]);

  // Video metadata loading
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      if (dur && !isNaN(dur) && isFinite(dur)) {
        setVideoDuration(dur);
      }
      setIsVideoReady(true);
      videoRef.current.pause();

      // Seek to current scroll position immediately
      const initialTime = targetTimeRef.current > 0 ? targetTimeRef.current : 0.05;
      try {
        videoRef.current.currentTime = initialTime;
        currentTimeRef.current = initialTime;
      } catch (err) {
        // seek caught
      }
    }
  }, []);

  // Smooth lerp video scrubbing loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetTimeRef.current - currentTimeRef.current;

      // Smooth lerp towards target timestamp (fast responsive factor for mobile & desktop)
      if (Math.abs(diff) > 0.005) {
        currentTimeRef.current += diff * 0.24;

        if (!isSeekingRef.current && video.readyState >= 2) {
          try {
            isSeekingRef.current = true;
            video.currentTime = Math.max(0, Math.min(videoDuration - 0.05, currentTimeRef.current));
          } catch (err) {
            isSeekingRef.current = false;
          }
        } else {
          pendingSeekTimeRef.current = currentTimeRef.current;
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (pendingSeekTimeRef.current !== null && video.readyState >= 2) {
        const nextTime = pendingSeekTimeRef.current;
        pendingSeekTimeRef.current = null;
        try {
          isSeekingRef.current = true;
          video.currentTime = Math.max(0, Math.min(videoDuration - 0.05, nextTime));
        } catch (err) {
          isSeekingRef.current = false;
        }
      }
    };

    video.addEventListener('seeked', handleSeeked);
    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [videoDuration, prefersReducedMotion, deviceMode]);

  // Track scroll position inside pinned container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollableDistance = containerHeight - windowHeight;

      if (scrollableDistance <= 0) return;

      // Progress from 0 to 1
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      setScrollProgress(progress);

      // Determine active scene
      for (const scene of SCENES) {
        if (progress >= scene.start && progress <= scene.end) {
          setActiveSceneIndex(scene.index);
          break;
        }
      }

      // Update target time for video
      targetTimeRef.current = progress * videoDuration;

      // Calculate deterministic battery percentage during Scene 4 and Scene 5
      if (progress < 0.60) {
        setBatteryPercent(0);
      } else if (progress >= 0.60 && progress < 0.82) {
        // Linear progression from 1% to 99%
        const normalized = (progress - 0.60) / 0.22;
        const pct = Math.min(99, Math.max(1, Math.round(normalized * 98 + 1)));
        setBatteryPercent(pct);
      } else {
        // Scene 5 & 6: Full 100%
        setBatteryPercent(100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [videoDuration]);

  // Jump to specific scene helper with Lenis smooth scroll integration
  const jumpToScene = (sceneIndex: number) => {
    if (!containerRef.current) return;
    const scene = SCENES.find((s) => s.index === sceneIndex);
    if (!scene) return;

    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;
    const containerTop = containerRef.current.offsetTop;

    const targetScrollY = containerTop + (scene.start + 0.03) * scrollableDistance;
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetScrollY, { duration: 1.3 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  // Skip cinematic to main solutions with smooth deceleration
  const scrollToSolutions = () => {
    const el = document.getElementById('solutions');
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -60, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Video assets configuration based on active deviceMode
  const videoConfig =
    deviceMode === 'mobile'
      ? {
          src: '/videos/evion-mobile-scrub.mp4',
          poster: '/images/mobile-hero-poster.jpg',
          // Position video centered so the vehicle is prominently framed in the middle flexible area
          objectPosition: 'center 50%',
        }
      : {
          src: '/videos/evion-charging-scrub.mp4',
          poster: '/images/hero-poster.jpg',
          objectPosition: 'center center',
        };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460vh] md:h-[480vh] bg-charcoal"
      id="cinematic-experience"
    >
      {/* Pinned Sticky Viewport (100dvh for mobile dynamic toolbar support) */}
      <div className="sticky top-0 w-full h-[100dvh] min-h-[100svh] overflow-hidden flex items-center justify-center bg-charcoal">
        {/* Background Responsive Video Element */}
        <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
          {!videoError ? (
            <video
              key={deviceMode} // Re-bind on mode change to swap between portrait mobile & landscape desktop
              ref={videoRef}
              src={videoConfig.src}
              poster={videoConfig.poster}
              playsInline
              muted={isMuted}
              preload="metadata"
              onLoadedMetadata={handleLoadedMetadata}
              onError={() => {
                setVideoError(true);
              }}
              style={{ objectPosition: videoConfig.objectPosition }}
              className="w-full h-full object-cover transform transition-opacity duration-300"
            />
          ) : (
            // Fallback high-res image if video fails to load
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${videoConfig.poster}')`,
                backgroundPosition: videoConfig.objectPosition,
              }}
            />
          )}

          {/* Targeted gradients on mobile: upper text & bottom dock only (leaves car in middle completely clear) */}
          <div className="md:hidden absolute top-0 left-0 right-0 h-[34%] bg-gradient-to-b from-charcoal/90 via-charcoal/40 to-transparent pointer-events-none" />
          <div className="md:hidden absolute bottom-0 left-0 right-0 h-[22%] bg-gradient-to-t from-charcoal/85 to-transparent pointer-events-none" />

          {/* Desktop cinematic ambient lighting */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-charcoal/60 pointer-events-none" />
          <div className="hidden md:block absolute inset-0 bg-radial-gradient from-transparent via-charcoal/20 to-charcoal/70 pointer-events-none" />

          {/* Scene 6 Departure White Overlay: smoothly fades in from dark studio to pure white */}
          <div
            className="absolute inset-0 bg-white pointer-events-none transition-opacity duration-300"
            style={{
              opacity:
                scrollProgress >= 0.88
                  ? Math.min(1, (scrollProgress - 0.88) / 0.10)
                  : 0,
            }}
          />
        </div>

        {/* Minimal Audio & Skip Floating Controls (Tucked cleanly in top-right below floating navbar, away from car & buttons) */}
        <div className="absolute top-[80px] sm:top-20 right-4 sm:right-8 z-30 flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-charcoal/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:border-electric-green/40 transition-colors cursor-pointer shadow-soft"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label="Toggle Mute"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-electric-green" />
            )}
          </button>
          <button
            onClick={scrollToSolutions}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-charcoal/80 hover:bg-charcoal/95 backdrop-blur-md border border-white/15 text-white transition-colors cursor-pointer shadow-soft"
          >
            <span>Skip</span>
            <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* SCENE OVERLAYS */}

        {/* ============================================================ */}
        {/* SCENE 1 — THE ARRIVAL (0% – 20%) */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 z-20 pointer-events-none transition-all duration-500"
          style={{
            opacity:
              scrollProgress < 0.16
                ? 1
                : Math.max(0, 1 - (scrollProgress - 0.16) / 0.04),
            transform: `translateY(${scrollProgress * -30}px)`,
            visibility: scrollProgress <= 0.22 ? 'visible' : 'hidden',
          }}
        >
          {/* MOBILE LAYOUT: 3-Part Architecture (Top Text -> Middle Car -> Bottom CTAs & Scroll Indicator) */}
          <div className="flex md:hidden flex-col justify-between h-full min-h-[100dvh] pt-[68px] pb-[max(0.75rem,env(safe-area-inset-bottom))] px-5 pointer-events-none">
            {/* 1. TOP SECTION — Header & Text */}
            <div className="pointer-events-auto max-w-[calc(100%-5.5rem)] xs:max-w-sm mt-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-electric-green text-[9px] xs:text-[10px] font-extrabold uppercase tracking-wider mb-2 shadow-sm">
                
                <span>CINEMATIC EV CHARGING EXPERIENCE</span>
              </div>

              {/* Headline */}
              <h1 className="font-lato uppercase text-[clamp(1.75rem,7.5vw,2.5rem)] text-white tracking-tight leading-tight drop-shadow-md">
                <span className="font-light block text-white/90">Powering Every</span>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-turquoise via-cyan to-neon-green block">Journey.</span>
              </h1>

              {/* Supporting Description */}
              <p className="mt-2 text-[13px] xs:text-[14px] text-white/90 leading-snug font-normal drop-shadow-sm max-w-[300px]">
                Intelligent EV charging for a world that never stops moving.
              </p>
            </div>

            {/* 2. MIDDLE SECTION — Flexible Cinematic Car Area (Unobstructed Car in video) */}
            <div className="flex-1 min-h-[100px] pointer-events-none" aria-hidden="true" />

            {/* 3. BOTTOM SECTION — Full-Width Vertically Stacked CTAs + Scroll Indicator */}
            <div className="pointer-events-auto w-full flex flex-col items-stretch space-y-2.5 pt-2">
              {/* Primary CTA: Explore EVION with Turquoise-to-Green Gradient */}
              <button
                onClick={scrollToSolutions}
                className="w-full h-[52px] inline-flex items-center justify-center gap-2 px-6 rounded-2xl text-sm font-bold bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all duration-300 shadow-[0_4px_20px_rgba(8,220,197,0.35)] hover:shadow-[0_0_30px_rgba(8,220,197,0.5)] active:scale-[0.98] cursor-pointer border border-white/20"
              >
                <span>Explore EVION</span>
                <ArrowRight className="w-4 h-4 text-[#071A16]" />
              </button>

              {/* Secondary CTA: Discover Charging */}
              <button
                onClick={() => jumpToScene(3)}
                className="w-full h-[48px] inline-flex items-center justify-center gap-2 px-6 rounded-2xl text-sm font-semibold bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <Zap className="w-4 h-4 text-turquoise fill-turquoise" />
                <span>Discover Charging</span>
              </button>

              {/* Bottom Scroll Indicator Row */}
              <div className="flex items-center justify-between text-xs text-white/70 pt-2 px-1">
                <div className="inline-flex items-center gap-1.5 animate-bounce">
                  <ChevronDown className="w-3.5 h-3.5 text-turquoise" />
                  <span className="font-bold tracking-widest uppercase text-[10px] text-white/90">
                    SCROLL TO EXPERIENCE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-white/60 font-mono">
                  <span>01/06</span>
                  <span>•</span>
                  <span>Scroll Driven</span>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP LAYOUT (Unchanged, spacious commercial presentation) */}
          <div className="hidden md:flex flex-col justify-between h-full p-12 lg:p-16 pointer-events-none">
            <div /> {/* Top spacer */}

            <div className="max-w-3xl pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-turquoise text-xs font-bold uppercase tracking-wider mb-4">
                <span>Cinematic EV Charging Experience</span>
              </div>

              <h1 className="font-lato uppercase text-5xl lg:text-7xl text-white tracking-tight leading-[1.05] drop-shadow-md">
                <span className="font-light block text-white/90">Powering Every</span>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-turquoise via-cyan to-neon-green block">Journey.</span>
              </h1>

              <p className="mt-5 text-lg lg:text-xl text-white/85 max-w-xl font-normal leading-relaxed drop-shadow-sm">
                Intelligent EV charging for a world that never stops moving. Seamless hardware, rapid DC architecture, and universal compatibility.
              </p>

              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={scrollToSolutions}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all duration-300 shadow-[0_4px_20px_rgba(8,220,197,0.35)] hover:shadow-[0_0_30px_rgba(8,220,197,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-white/20"
                >
                  <span>Explore EVION</span>
                  <ArrowRight className="w-4 h-4 text-[#071A16]" />
                </button>

                <button
                  onClick={() => jumpToScene(3)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all duration-300 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-turquoise fill-turquoise" />
                  <span>Discover Charging</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-white/70 pb-2">
              <div className="inline-flex items-center gap-2 animate-bounce">
                <ChevronDown className="w-4 h-4 text-electric-green" />
                <span className="font-bold tracking-widest uppercase text-[11px] text-white/90">
                  SCROLL TO EXPERIENCE
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/60">
                <span>Scene 01 of 06</span>
                <span>•</span>
                <span>Synchronized</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCENE 2 — THE CAMERA MOVEMENT (20% – 40%) */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 z-20 flex items-end sm:items-center justify-start p-4 sm:p-16 lg:p-24 pointer-events-none transition-all duration-500 pb-14 sm:pb-0"
          style={{
            opacity:
              scrollProgress >= 0.18 && scrollProgress < 0.23
                ? (scrollProgress - 0.18) / 0.05
                : scrollProgress >= 0.23 && scrollProgress <= 0.35
                ? 1
                : scrollProgress > 0.35 && scrollProgress <= 0.40
                ? Math.max(0, 1 - (scrollProgress - 0.35) / 0.05)
                : 0,
            transform: `translateY(${(scrollProgress - 0.28) * -20}px)`,
            visibility: scrollProgress >= 0.18 && scrollProgress <= 0.42 ? 'visible' : 'hidden',
          }}
        >
          <div className="w-full max-w-lg bg-charcoal/85 backdrop-blur-xl p-5 sm:p-10 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-electric-green/20 text-electric-green border border-electric-green/30 inline-block mb-2 sm:mb-3">
              PRECISION CINEMATICS
            </span>

            <h2 className="font-lato uppercase text-xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              <span className="font-light block text-white/90">Every Drive</span>
              <span className="font-extrabold text-electric-green block">Deserves Better.</span>
            </h2>

            <p className="mt-2 sm:mt-4 text-xs sm:text-base text-white/80 leading-relaxed font-normal">
              Seamless charging experiences, designed around the way you move. From streamlined ergonomics to intuitive interfaces that keep you in motion.
            </p>

            <div className="mt-3.5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-white/70">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-electric-green" />
                <span>Liquid-Cooled Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-electric-green" />
                <span>800V Architecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCENE 3 — THE EVION CHARGER REVEAL (40% – 60%) */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 z-20 flex items-end sm:items-center justify-end p-4 sm:p-16 lg:p-24 pointer-events-none transition-all duration-500 pb-14 sm:pb-0"
          style={{
            opacity:
              scrollProgress >= 0.38 && scrollProgress < 0.43
                ? (scrollProgress - 0.38) / 0.05
                : scrollProgress >= 0.43 && scrollProgress <= 0.55
                ? 1
                : scrollProgress > 0.55 && scrollProgress <= 0.60
                ? Math.max(0, 1 - (scrollProgress - 0.55) / 0.05)
                : 0,
            transform: `translateY(${(scrollProgress - 0.48) * -20}px)`,
            visibility: scrollProgress >= 0.38 && scrollProgress <= 0.62 ? 'visible' : 'hidden',
          }}
        >
          <div className="w-full max-w-lg bg-charcoal/85 backdrop-blur-xl p-5 sm:p-10 rounded-3xl border border-white/15 shadow-2xl pointer-events-auto">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-electric-green text-charcoal">
                HARDWARE
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white/70 uppercase">
                EVION ULTRA-FAST HUB
              </span>
            </div>

            <h2 className="font-lato uppercase text-xl sm:text-4xl text-white tracking-tight leading-tight">
              <span className="font-light block text-white/90">Meet a Smarter</span>
              <span className="font-extrabold text-electric-green block">Way to Charge.</span>
            </h2>

            <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
              Thoughtfully designed charging solutions for modern electric mobility. Crafted with aerospace-grade aluminium, sunlight-readable 27-inch digital displays, and universal plug standards.
            </p>

           
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCENE 4 — THE CHARGING CONNECTION & FLOATING HUD (60% – 82%) */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-8 pointer-events-none transition-all duration-500"
          style={{
            opacity:
              scrollProgress >= 0.58 && scrollProgress < 0.63
                ? (scrollProgress - 0.58) / 0.05
                : scrollProgress >= 0.63 && scrollProgress <= 0.78
                ? 1
                : scrollProgress > 0.78 && scrollProgress <= 0.83
                ? Math.max(0, 1 - (scrollProgress - 0.78) / 0.05)
                : 0,
            visibility: scrollProgress >= 0.58 && scrollProgress <= 0.84 ? 'visible' : 'hidden',
          }}
        >
          {/* Floating High-Tech Charging HUD Card */}
          
        </div>

        {/* ============================================================ */}
        {/* SCENE 5 — FULL CHARGE (82% – 90%) */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-12 pointer-events-none transition-all duration-500"
          style={{
            opacity:
              scrollProgress >= 0.81 && scrollProgress < 0.84
                ? (scrollProgress - 0.81) / 0.03
                : scrollProgress >= 0.84 && scrollProgress <= 0.89
                ? 1
                : scrollProgress > 0.89 && scrollProgress <= 0.92
                ? Math.max(0, 1 - (scrollProgress - 0.89) / 0.03)
                : 0,
            visibility: scrollProgress >= 0.80 && scrollProgress <= 0.92 ? 'visible' : 'hidden',
          }}
        >
          <div className="max-w-lg text-center bg-charcoal/85 backdrop-blur-2xl p-5 sm:p-12 rounded-3xl border border-electric-green/40 shadow-2xl pointer-events-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-evion-gradient text-[#071A16] shadow-gradient-glow mb-3 sm:mb-4">
              <CheckCircle2 className="w-7 h-7 sm:w-9 sm:h-9" />
            </div>

            <h2 className="font-lato uppercase text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-turquoise via-cyan to-neon-green block">100% Ready</span>
              <span className="font-light text-white/90 block">for What's Next.</span>
            </h2>

            <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-white/90 leading-relaxed font-normal">
              Connected, charged, and ready to move. Maximum range delivered with optimized battery thermal protection.
            </p>

            <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-turquoise/20 to-neon-green/20 border border-turquoise/40 text-turquoise font-mono text-[10px] sm:text-xs font-bold">
              <span>Full Capacity: 100% (380 km added)</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCENE 6 — THE DEPARTURE (90% – 100%) */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-5 sm:p-12 pointer-events-none transition-all duration-500"
          style={{
            opacity:
              scrollProgress >= 0.89
                ? Math.min(1, (scrollProgress - 0.89) / 0.06)
                : 0,
            visibility: scrollProgress >= 0.88 ? 'visible' : 'hidden',
          }}
        >
          <div className="max-w-2xl pointer-events-auto">
            <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest bg-charcoal text-white inline-block mb-3 sm:mb-4 shadow-soft">
              THE NEXT HORIZON
            </span>

            <h2 className="font-lato uppercase text-3xl sm:text-5xl lg:text-6xl text-charcoal tracking-tight leading-tight">
              <span className="font-light block text-charcoal/80">Your Journey.</span>
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-turquoise via-cyan to-neon-green block">Electrified.</span>
            </h2>

            <p className="mt-3 sm:mt-5 text-xs sm:text-xl text-secondary-text leading-relaxed max-w-xl mx-auto font-normal">
              Discover EV charging solutions built for the road ahead. Residential wallboxes, enterprise fleets, and nationwide ultra-fast corridors.
            </p>

            <div className="mt-5 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={scrollToSolutions}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all duration-300 shadow-[0_4px_20px_rgba(8,220,197,0.35)] hover:shadow-[0_0_30px_rgba(8,220,197,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-white/20"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight className="w-4 h-4 text-[#071A16]" />
              </button>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold bg-white hover:bg-light-gray border border-light-border text-charcoal transition-all duration-300 shadow-soft hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Contact EVION</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Apple-style Right Scene Scrubber Navigation Indicator (Desktop and Tablet) */}
        <div className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3 pointer-events-auto">
          {SCENES.map((scene) => {
            const isActive = activeSceneIndex === scene.index;
            return (
              <button
                key={scene.id}
                onClick={() => jumpToScene(scene.index)}
                className="group flex items-center gap-3 py-1 text-right transition-all cursor-pointer focus:outline-none"
                aria-label={`Jump to ${scene.label}`}
              >
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider transition-all opacity-0 group-hover:opacity-100 ${
                    isActive ? 'opacity-100 text-electric-green' : 'text-white/60'
                  }`}
                >
                  {scene.label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-3 h-3 bg-electric-green shadow-green-glow'
                      : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white/70 group-hover:scale-150'
                  }`}
                />
              </button>
            );
          })}

          {/* Timestamp & Progress */}
          <div className="mt-2 text-right text-[10px] font-mono text-white/50 pr-1">
            <span>
              {((scrollProgress * videoDuration) || 0).toFixed(1)}s / {videoDuration.toFixed(1)}s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
