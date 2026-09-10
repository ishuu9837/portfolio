'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { MobileMenu } from './mobile-menu';
import { useScrollSection } from '@/hooks/use-scroll-section';

const NAV_ITEMS = [
  { id: 'projects', labelKey: 'projects' },
  { id: 'research', labelKey: 'research' },
  { id: 'skills', labelKey: 'skills' },
  { id: 'experience', labelKey: 'experience' },
  { id: 'education', labelKey: 'education' },
  { id: 'contact', labelKey: 'contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSection() || ''; 

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-40 h-[var(--nav-height,4rem)] backdrop-blur-md bg-background/80 border-b border-border transition-colors duration-300"
        aria-label="Main navigation"
      >
        <div className="flex h-full items-center justify-between px-6 md:px-12">
          {/* Left: Branding */}
          <button
            onClick={scrollToTop}
            className="font-display text-xl font-bold tracking-wider text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Y ESWAR
          </button>

          {/* Right: Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1 py-0.5 font-mono text-xs uppercase tracking-wider transition-colors",
                    isActive ? "text-accent" : "text-muted hover:text-accent"
                  )}
                >
                  <span>{t(item.labelKey)}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Mobile Hamburger */}
          <button
            className="md:hidden p-2 -mr-2 text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label={t('menu')}
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
