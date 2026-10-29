'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis: any = null;
    let rafId: number;

    // Dynamically load Lenis in client runtime
    import('lenis')
      .then(({ default: Lenis }) => {
        lenis = new Lenis({
          duration: 1.25,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.2,
          infinite: false,
        });

        lenisRef.current = lenis;
        (window as any).lenis = lenis;

        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      })
      .catch((err) => {
        console.warn('Lenis smooth scroll initialization skipped:', err);
      });

    // Smoothly intercept in-page hash anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && lenisRef.current) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          lenisRef.current.scrollTo(targetElement as HTMLElement, {
            offset: -70,
            duration: 1.35,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      if (lenis) {
        lenis.destroy();
      }
      (window as any).lenis = null;
    };
  }, []);

  // Scroll to top cleanly when navigating between pages
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
};
