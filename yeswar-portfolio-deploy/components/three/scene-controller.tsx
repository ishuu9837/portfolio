'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with ssr: false ensures zero SSR canvas issues
const DynamicHeroCanvas = dynamic(
  () => import('./hero-scene'),
  { ssr: false }
);

export function SceneController() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  const [hasWebGL] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Viewport intersection observer to cull rendering when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    const target = containerRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {hasWebGL && isInView ? (
        <DynamicHeroCanvas />
      ) : (
        /* Fallback when WebGL unavailable or out of view */
        <div className="w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_center,var(--accent)_0%,transparent_70%)]" />
      )}
    </div>
  );
}
