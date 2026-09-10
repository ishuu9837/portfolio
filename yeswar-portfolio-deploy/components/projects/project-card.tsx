'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { GitHubIcon } from '@/components/ui/social-icons';
import type { ProjectLink } from '@/lib/data/projects';
import { soundEngine } from '@/lib/audio/sound-engine';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import Link from 'next/link';

export interface ProjectCardProps {
  id?: string;
  number: string;
  titleKey: string;
  categoryKey: string;
  descriptionKey: string;
  technologies: string[];
  status?: 'COMPLETED' | 'ACTIVE' | 'RESEARCH' | 'PUBLISHED';
  links?: ProjectLink[];
  className?: string;
}

export function ProjectCard({
  number,
  titleKey,
  categoryKey,
  descriptionKey,
  technologies,
  status,
  links,
  className = '',
}: ProjectCardProps) {
  const t = useTranslations('projects');
  const tStatus = useTranslations('common.status');
  const prefersReducedMotion = useReducedMotion();

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [arrowOffset, setArrowOffset] = useState({ x: 0, y: 0 });

  const getStatusVariant = (s?: string) => {
    if (s === 'ACTIVE') return 'active';
    if (s === 'PUBLISHED') return 'accent';
    return 'default';
  };

  const getStatusLabel = (s?: string) => {
    if (!s) return '';
    const key = s.toLowerCase() as 'completed' | 'active' | 'research' | 'published';
    try {
      return tStatus(key);
    } catch {
      return s;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({ x: x * 8, y: -y * 8 });
    setArrowOffset({ x: x * 6, y: y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setArrowOffset({ x: 0, y: 0 });
  };

  const primaryLink = links && links.length > 0 ? links[0].url : '#projects';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => soundEngine.playHover()}
      data-cursor="view"
      className={`relative flex flex-col group rounded-xl border border-border bg-card p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-xl ${className}`}
      style={{
        transform: prefersReducedMotion
          ? 'none'
          : `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        willChange: 'transform',
      }}
    >
      {/* Ghost Number in background */}
      <div className="absolute -top-3 -right-2 text-7xl md:text-8xl font-mono text-border/40 opacity-40 select-none group-hover:text-accent/20 group-hover:scale-105 transition-all duration-500 pointer-events-none">
        {number}
      </div>

      {/* Header Badges */}
      <div className="flex flex-wrap gap-2 mb-6 items-center relative z-10">
        <Badge variant="outline" className="font-mono text-xs text-muted">
          {t(categoryKey)}
        </Badge>
        {status && (
          <Badge variant={getStatusVariant(status)} className="font-mono text-[10px] tracking-widest uppercase">
            {getStatusLabel(status)}
          </Badge>
        )}
      </div>

      {/* Project Title */}
      <h3 className="font-display text-2xl md:text-3xl text-card-foreground mb-4 relative z-10 group-hover:text-accent transition-colors leading-tight">
        {t(titleKey)}
      </h3>

      {/* Description */}
      <p className="font-body text-muted text-sm md:text-base mb-8 flex-grow relative z-10 leading-relaxed max-w-2xl">
        {t(descriptionKey)}
      </p>

      {/* Technologies pills */}
      <div className="flex flex-wrap gap-2 mb-8 relative z-10">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs bg-background/80 border border-border px-2.5 py-1 rounded text-muted group-hover:border-accent/40 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Interactive CTA bar */}
      <div className="flex items-center justify-between mt-auto pt-5 border-t border-border relative z-10">
        {links && links.length > 0 ? (
          <div className="flex gap-4">
            {links.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playProjectClick()}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:text-foreground transition-colors group/link"
              >
                {link.type === 'github' ? <GitHubIcon className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                <span className="capitalize">{link.type}</span>
              </Link>
            ))}
          </div>
        ) : (
          <span className="font-mono text-xs text-muted">Academic Research</span>
        )}

        {/* View Project CTA with pointer-following arrow */}
        <Link
          href={primaryLink}
          target={links && links.length > 0 ? '_blank' : '_self'}
          rel="noopener noreferrer"
          onClick={() => soundEngine.playProjectClick()}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted group-hover:text-accent transition-colors"
        >
          <span className="hidden sm:inline">VIEW PROJECT</span>
          <span
            style={{
              transform: prefersReducedMotion
                ? 'none'
                : `translate3d(${arrowOffset.x}px, ${arrowOffset.y}px, 0)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
