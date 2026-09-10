'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'projects', labelKey: 'projects' },
  { id: 'research', labelKey: 'research' },
  { id: 'skills', labelKey: 'skills' },
  { id: 'experience', labelKey: 'experience' },
  { id: 'education', labelKey: 'education' },
  { id: 'contact', labelKey: 'contact' },
] as const;

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  const t = useTranslations('nav');
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleLinkClick = (id: string) => {
    onClose();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl p-6"
        >
          <div className="flex justify-end h-16 items-center">
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 text-foreground hover:text-accent transition-colors"
              aria-label={t('close')}
            >
              <X size={32} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center items-center gap-8" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={cn(
                  "font-display text-3xl sm:text-4xl transition-colors flex items-center group",
                  activeSection === item.id ? "text-accent" : "text-foreground hover:text-accent"
                )}
              >
                <span>{t(item.labelKey)}</span>
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
