'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';
import { Mail, ArrowDown } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/social-icons';
import { HeroScene } from './hero-scene';
import { useTheme } from '@/components/providers/theme-provider';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { soundEngine } from '@/lib/audio/sound-engine';

export function Hero() {
  const t = useTranslations('hero');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const loop = () => {
      // Damped interpolation (lerp 0.05)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      setPointerOffset({
        x: Math.round(currentX * 100) / 100,
        y: Math.round(currentY * 100) / 100,
      });

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Subtle physical offsets
  const textTranslate = prefersReducedMotion
    ? 'translate3d(0, 0, 0)'
    : `translate3d(${pointerOffset.x * 12}px, ${pointerOffset.y * 8}px, 0)`;

  const artTranslate = prefersReducedMotion
    ? 'translate3d(0, 0, 0)'
    : `translate3d(${pointerOffset.x * -20}px, ${pointerOffset.y * -14}px, 0)`;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-background transition-colors duration-700"
    >
      {/* 3D WebGL Scene & Ambient Particle Canvas */}
      <div className="absolute inset-0 z-0" style={{ transform: artTranslate }}>
        <HeroScene />
      </div>

      {/* Dual Art-Directed Background Visual Compositions */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Light Theme Artwork Composition (Warm paper, geometric precision grids, technical framing) */}
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            !isDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          style={{ transform: artTranslate }}
        >
          <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#e8e2d5]/60 blur-3xl" />
          <div className="absolute bottom-1/3 -right-20 w-[30rem] h-[30rem] rounded-full bg-[#f0ebd9]/70 blur-3xl" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.14]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="light-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="1" fill="#0d0d0d" />
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#d4cfc4" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#light-grid)" />
          </svg>
        </div>

        {/* Dark Theme Artwork Composition (Obsidian charcoal, luminescent coordinate rings, deep atmospheric density) */}
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            isDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          style={{ transform: artTranslate }}
        >
          <div className="absolute top-1/3 -left-32 w-[34rem] h-[34rem] rounded-full bg-[#c8472b]/10 blur-[120px]" />
          <div className="absolute bottom-1/4 -right-24 w-[36rem] h-[36rem] rounded-full bg-[#18181b]/80 blur-[100px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dark-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="1.2" fill="#c8472b" opacity="0.6" />
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dark-grid)" />
          </svg>
        </div>
      </div>

      {/* Main Content Container with Damped Typographic Parallax */}
      <div
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto mt-8 md:mt-0 transition-transform duration-150 ease-out"
        style={{ transform: textTranslate }}
      >
        {/* Academic Credential Pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-border/80 bg-card/60 backdrop-blur-md rounded-full text-xs font-mono text-muted uppercase tracking-widest shadow-sm hover:border-accent/60 transition-colors"
          data-cursor="explore"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>{t('badge')}</span>
        </div>

        {/* Primary Identity: Y ESWAR */}
        <h1
          className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-foreground mb-6 uppercase select-none drop-shadow-sm"
          data-cursor="explore"
        >
          Y ESWAR
        </h1>

        {/* Disciplinary Roles */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-8 font-body text-xl md:text-2xl text-muted font-medium">
          <span className="hover:text-foreground transition-colors">{t('role1')}</span>
          <span className="text-muted/30 hidden sm:inline-block">/</span>
          <span className="hover:text-foreground transition-colors">{t('role2')}</span>
          <span className="text-muted/30 hidden sm:inline-block">/</span>
          <span className="hover:text-foreground transition-colors">{t('role3')}</span>
          <span className="text-muted/30 hidden sm:inline-block">/</span>
          <span className="hover:text-foreground transition-colors">{t('role4')}</span>
          <span className="text-muted/30 hidden sm:inline-block">/</span>
          <span className="hover:text-foreground transition-colors">{t('role5')}</span>
        </div>

        {/* Supporting Mission Line */}
        <p className="max-w-2xl text-base sm:text-lg text-muted mt-2 leading-relaxed px-4 font-normal">
          {t('tagline')}
        </p>

        {/* Editorial Action Buttons with Sound & Magnetic Cursor Triggers */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto">
          <a
            href="https://github.com/ishuu9837"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-2 border border-border bg-card/40 backdrop-blur-sm px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:bg-accent hover:border-accent hover:text-white transition-all duration-200 w-full sm:w-auto justify-center group shadow-sm hover:shadow-md"
            data-cursor="link"
          >
            <GitHubIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/eswar854/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-2 border border-border bg-card/40 backdrop-blur-sm px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:bg-accent hover:border-accent hover:text-white transition-all duration-200 w-full sm:w-auto justify-center group shadow-sm hover:shadow-md"
            data-cursor="link"
          >
            <LinkedInIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>LinkedIn</span>
          </a>

          <a
            href="#contact"
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-2 border border-border bg-card/40 backdrop-blur-sm px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:bg-accent hover:border-accent hover:text-white transition-all duration-200 w-full sm:w-auto justify-center group shadow-sm hover:shadow-md"
            data-cursor="link"
          >
            <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Contact</span>
          </a>
        </div>
      </div>

      {/* Downward Scroll Guide */}
      <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center pointer-events-none z-10 opacity-60">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
          Explore
        </span>
        <ArrowDown className="w-4 h-4 text-muted animate-bounce" />
      </div>
    </section>
  );
}
