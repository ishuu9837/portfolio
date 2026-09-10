'use client';

import { useEffect, useState, useSyncExternalStore, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { soundEngine } from '@/lib/audio/sound-engine';

const INTRO_STEPS = [
  { id: 'hello', duration: 800, className: 'font-display uppercase text-4xl sm:text-5xl md:text-7xl font-bold tracking-widest' },
  { id: 'namaste', duration: 800, className: 'font-display uppercase text-4xl sm:text-5xl md:text-7xl font-bold tracking-widest' },
  { id: 'namasteTelugu', duration: 800, className: 'font-telugu text-4xl sm:text-5xl md:text-7xl font-semibold' },
  { id: 'name', duration: 1100, className: 'font-display text-5xl sm:text-7xl md:text-9xl font-black tracking-tight uppercase' },
  { id: 'nameTelugu', duration: 850, className: 'font-telugu text-4xl sm:text-6xl md:text-8xl font-bold' },
  { id: 'role', duration: 1200, className: 'font-mono text-sm sm:text-base md:text-lg text-muted uppercase tracking-widest' },
];

const emptySubscribe = () => () => {};

export function IntroOverlay() {
  const t = useTranslations('intro');
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      if (localStorage.getItem('portfolio-intro-seen')) return false;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      return true;
    } catch {
      return false;
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleComplete = useCallback(() => {
    try {
      localStorage.setItem('portfolio-intro-seen', 'true');
    } catch {
      // ignore
    }
    soundEngine.playIntroComplete();
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isVisible || currentStep >= INTRO_STEPS.length) return;

    const timer = setTimeout(() => {
      if (currentStep === INTRO_STEPS.length - 1) {
        handleComplete();
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }, INTRO_STEPS[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, isVisible, handleComplete]);

  if (!isMounted || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.02 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background text-foreground overflow-hidden select-none"
        >
          {/* Subtle architectural framing accents */}
          <div className="absolute top-8 left-8 font-mono text-[10px] text-muted tracking-widest uppercase opacity-40">
            SEC // 00 : INITIALIZE
          </div>
          <div className="absolute top-8 right-8 hidden sm:block font-mono text-[10px] text-muted tracking-widest uppercase opacity-40">
            Y ESWAR // PORTFOLIO
          </div>

          <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
            {/* Center Stage with Cinematic Blur, Scale & Tracking */}
            <div className="relative flex items-center justify-center min-h-[14rem]">
              <AnimatePresence mode="wait">
                {currentStep < INTRO_STEPS.length && (
                  <motion.div
                    key={currentStep}
                    initial={{
                      opacity: 0,
                      filter: 'blur(14px)',
                      scale: 0.94,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      filter: 'blur(0px)',
                      scale: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      filter: 'blur(12px)',
                      scale: 1.05,
                      y: -12,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={INTRO_STEPS[currentStep].className}
                  >
                    {t(INTRO_STEPS[currentStep].id)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stepped Progress Track */}
            <div className="absolute bottom-12 inset-x-8 md:inset-x-24 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {INTRO_STEPS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 transition-all duration-300 rounded-full ${
                      idx === currentStep
                        ? 'w-8 bg-accent'
                        : idx < currentStep
                        ? 'w-3 bg-accent/40'
                        : 'w-2 bg-border'
                    }`}
                  />
                ))}
              </div>

              {/* Accessible Skip Button */}
              <button
                onClick={handleComplete}
                onMouseEnter={() => soundEngine.playHover()}
                className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors px-3 py-1.5 border border-transparent hover:border-border rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={t('skip')}
              >
                <span>{t('skip')}</span>
                <span className="text-accent group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
