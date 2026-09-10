'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { activeProject } from '@/lib/data/projects';
import { ArrowUpRight } from 'lucide-react';
import { GitHubIcon } from '@/components/ui/social-icons';
import { soundEngine } from '@/lib/audio/sound-engine';
import Link from 'next/link';

export function ActiveProject() {
  const t = useTranslations('projects');

  return (
    <div
      onMouseEnter={() => soundEngine.playHover()}
      data-cursor="explore"
      className="relative w-full rounded-2xl border-l-4 border-l-accent border-y border-r border-border bg-card p-6 md:p-10 mb-16 shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden"
    >
      {/* Subtle ambient accent glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none group-hover:bg-accent/10 transition-colors" />

      <div className="flex flex-wrap items-center gap-3 mb-6 relative z-10">
        <Badge variant="active" className="animate-pulse font-mono text-xs tracking-wider">
          {t('activeNow')}
        </Badge>
        <span className="font-mono text-xs text-muted uppercase tracking-wider">
          {t('activeResearch')}
        </span>
      </div>

      <h3 className="font-display text-3xl md:text-4xl text-card-foreground mb-4 leading-tight max-w-3xl relative z-10 group-hover:text-accent transition-colors">
        {t(activeProject.titleKey)}
      </h3>

      <p className="font-body text-base md:text-lg text-muted mb-8 max-w-4xl leading-relaxed relative z-10">
        {t(activeProject.descriptionKey)}
      </p>

      <div className="flex flex-wrap gap-2 mb-8 relative z-10">
        {activeProject.technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs bg-background border border-border px-3 py-1.5 rounded-md text-foreground group-hover:border-accent/40 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      {activeProject.links && activeProject.links.length > 0 && (
        <div className="flex gap-6 relative z-10">
          {activeProject.links.map((link) => (
            <Link 
              key={link.url}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => soundEngine.playProjectClick()}
              className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:text-foreground transition-colors group/btn"
            >
              {link.type === 'github' ? <GitHubIcon className="w-4 h-4" /> : null}
              <span className="capitalize">{link.type}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
