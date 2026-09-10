'use client';

import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { type ReactNode } from 'react';

export function LocaleTransition({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={locale}
      initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
