'use client';

import { useState, useSyncExternalStore } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';
import { usePathname, useRouter } from 'next/navigation';
import { soundEngine } from '@/lib/audio/sound-engine';

const emptySubscribe = () => () => {};

export function IdentityRail() {
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const t = useTranslations('common');
  const pathname = usePathname();
  const router = useRouter();

  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const stored = localStorage.getItem('sound-muted');
      return stored === null ? true : stored === 'true';
    } catch {
      return true;
    }
  });

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
    soundEngine.playThemeSwitch();
  };

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'te' : 'en';
    soundEngine.playLocaleSwitch();
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.replace(newPath || `/${nextLocale}`);
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (!nextMuted) {
      soundEngine.playThemeSwitch();
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <aside
      data-cursor="drag"
      className="fixed bottom-0 inset-x-0 md:inset-x-auto md:right-0 md:top-0 md:bottom-0 z-40 flex md:flex-col items-center justify-center md:w-16 h-16 md:h-auto border-t md:border-t-0 md:border-l border-border bg-background/85 backdrop-blur-xl px-4 md:py-8 gap-6 md:gap-10 select-none shadow-sm"
      aria-label="Interactive Identity Controls"
    >
      {/* Theme Dial System */}
      <div className="flex md:flex-col items-center gap-1.5 group">
        <span className="hidden md:block font-mono text-[9px] uppercase tracking-widest text-muted/60 mb-1 [writing-mode:vertical-lr] rotate-180">
          MODE
        </span>
        <button
          onClick={toggleTheme}
          className="relative flex md:flex-col items-center justify-between p-1.5 w-16 md:w-8 h-8 md:h-16 rounded-full bg-card border border-border transition-all hover:border-accent group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={t('theme.toggle')}
        >
          {/* Sliding indicator puck */}
          <div
            className={`absolute w-5 h-5 rounded-full bg-accent transition-all duration-300 ease-out flex items-center justify-center shadow-sm ${
              isDark
                ? 'translate-x-8 md:translate-x-0 md:translate-y-8'
                : 'translate-x-0 md:translate-y-0'
            }`}
          >
            {isDark ? (
              <Moon size={11} className="text-white" />
            ) : (
              <Sun size={11} className="text-white" />
            )}
          </div>
          <Sun size={12} className={`relative z-10 transition-colors ${!isDark ? 'opacity-0' : 'text-muted'}`} />
          <Moon size={12} className={`relative z-10 transition-colors ${isDark ? 'opacity-0' : 'text-muted'}`} />
        </button>
      </div>

      {/* Language Dial System */}
      <div className="flex md:flex-col items-center gap-1.5 group">
        <span className="hidden md:block font-mono text-[9px] uppercase tracking-widest text-muted/60 mb-1 [writing-mode:vertical-lr] rotate-180">
          LOCALE
        </span>
        <button
          onClick={toggleLanguage}
          className="relative flex md:flex-col items-center justify-center px-3 py-1.5 rounded-full bg-card border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-sm"
          aria-label={t('language.toggle')}
        >
          <span className="font-mono text-xs font-bold tracking-wider uppercase">
            {locale === 'en' ? 'EN' : 'తెలుగు'}
          </span>
        </button>
      </div>

      {/* Sound System */}
      <div className="flex md:flex-col items-center gap-1.5 group">
        <span className="hidden md:block font-mono text-[9px] uppercase tracking-widest text-muted/60 mb-1 [writing-mode:vertical-lr] rotate-180">
          AUDIO
        </span>
        <button
          onClick={toggleSound}
          className={`p-2 rounded-full border transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-sm ${
            !isMuted
              ? 'bg-accent/15 border-accent text-accent'
              : 'bg-card border-border text-muted hover:border-accent hover:text-accent'
          }`}
          aria-label={t('sound.toggle')}
        >
          {!isMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
    </aside>
  );
}
