'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/section-header';
import { CopyButton } from '@/components/ui/copy-button';
import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, InstagramIcon } from '@/components/ui/social-icons';
import Link from 'next/link';

export function ContactSection() {
  const t = useTranslations('contact');

  const emails = [
    'eswaryadav8543@gmail.com',
    'eswaryadav8543@icloud.com',
  ];

  const socials = [
    { name: t('social.github'), icon: GitHubIcon, url: 'https://github.com/ishuu9837' },
    { name: t('social.linkedin'), icon: LinkedInIcon, url: 'https://www.linkedin.com/in/eswar854/' },
    { name: t('social.instagram'), icon: InstagramIcon, url: 'https://instagram.com/ishuu.me' },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="flex flex-col gap-12 mt-12">
          <div className="space-y-6">
            {emails.map((email) => (
              <div key={email} className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Link
                  href={`mailto:${email}`}
                  className="font-mono text-lg md:text-xl text-foreground hover:text-accent transition-colors flex items-center gap-3 group"
                >
                  <Mail className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
                  {email}
                </Link>
                <CopyButton text={email} />
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border">
            <p className="font-body text-muted mb-6">
              {t('availability')}
            </p>
            <div className="flex gap-6">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card border border-border rounded-full text-muted hover:text-accent hover:border-accent transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
