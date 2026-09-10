'use client';

import { useTranslations } from 'next-intl';
import { ArrowUp } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, InstagramIcon } from '@/components/ui/social-icons';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations('footer');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: 'GitHub', icon: GitHubIcon, url: 'https://github.com/ishuu9837' },
    { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://www.linkedin.com/in/eswar854/' },
    { name: 'Instagram', icon: InstagramIcon, url: 'https://instagram.com/ishuu.me' },
  ];

  return (
    <footer className="w-full border-t border-border bg-background pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            {t('cta')}
          </h2>
          <p className="font-body text-sm text-muted mt-4">
            {t('madeWith')}
          </p>
        </div>

        <div className="w-full h-px bg-border mb-12" />

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-mono text-sm text-muted text-center md:text-left">
            {t('copyright')}
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-border pr-6">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border text-foreground hover:border-accent hover:text-accent transition-all"
              aria-label={t('backToTop')}
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
