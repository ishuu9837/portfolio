'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type CursorVariant = 'default' | 'view' | 'link' | 'explore' | 'drag';

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isVisible, setIsVisible] = useState(false);

  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  });

  // Position references for lerp interpolation
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check hover targets for cursor variants
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const attr = cursorTarget.getAttribute('data-cursor') as CursorVariant;
        if (attr) {
          setVariant(attr);
          return;
        }
      }

      if (target.closest('a, button, input, [role="button"]')) {
        setVariant('link');
      } else {
        setVariant('default');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Render loop with lerp damping for smooth follower
    let animationFrameId: number;

    const render = () => {
      // Direct position for the inner dot
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Smooth lerp (0.18) for the outer follower ring
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.18;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.18;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice, isVisible, prefersReducedMotion]);

  if (isTouchDevice || prefersReducedMotion || !isVisible) {
    return null;
  }

  const isView = variant === 'view';
  const isExplore = variant === 'explore';
  const isDrag = variant === 'drag';
  const isLink = variant === 'link';

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Precision center dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent mix-blend-difference transition-transform duration-75"
        style={{ willChange: 'transform' }}
      />

      {/* Damped trailing follower ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/80 transition-[width,height,background-color,border-color,opacity] duration-200 flex items-center justify-center mix-blend-difference ${
          isView
            ? 'w-16 h-16 bg-accent/90 border-accent'
            : isExplore
            ? 'w-20 h-20 bg-foreground/10 border-foreground/40'
            : isDrag
            ? 'w-14 h-14 border-accent bg-accent/20'
            : isLink
            ? 'w-10 h-10 border-accent/70 scale-110'
            : 'w-7 h-7 border-foreground/30'
        }`}
        style={{ willChange: 'transform' }}
      >
        {isView && (
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-background">
            VIEW
          </span>
        )}
        {isExplore && (
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-foreground">
            EXPLORE
          </span>
        )}
        {isDrag && (
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent">
            DRAG
          </span>
        )}
      </div>
    </div>
  );
}
