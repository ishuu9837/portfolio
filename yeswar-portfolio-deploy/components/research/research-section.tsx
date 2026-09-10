'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/section-header';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, ChevronDown, ExternalLink } from 'lucide-react';
import { soundEngine } from '@/lib/audio/sound-engine';
import Link from 'next/link';

const RESEARCH_AREAS = ['cv', 'dl', 'multimodal', 'anomaly', 'energy'] as const;

export function ResearchSection() {
  const t = useTranslations('research');
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    soundEngine.playProjectClick();
    setIsExpanded((prev) => !prev);
  };

  return (
    <section id="research" className="py-24 px-6 bg-card/20 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader 
          title={t('title')} 
          subtitle={t('subtitle')} 
        />

        {/* Interactive Publication Archive Card */}
        <div
          data-cursor="explore"
          className="bg-card border border-border rounded-2xl p-6 md:p-10 mb-12 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-accent/5 rounded-bl-full pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
            <Badge variant="accent" className="w-fit font-mono tracking-wider">
              {t('paper1.status')}
            </Badge>
            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted font-mono">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-accent" />
                {t('paper1.venue')}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-accent" />
                {t('paper1.date')}
              </span>
            </div>
          </div>

          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-card-foreground mb-4 leading-snug">
            {t('paper1.title')}
          </h3>

          <div className="space-y-4 font-body text-muted leading-relaxed max-w-3xl">
            <p>{t('paper1.description')}</p>
            <p className="italic border-l-2 border-accent/60 pl-4 py-1 text-sm bg-background/50 rounded-r">
              {t('paper1.context')}
            </p>
          </div>

          {/* Expandable Editorial Deep-Dive Drawer */}
          <div
            className={`transition-all duration-500 overflow-hidden ${
              isExpanded ? 'max-h-96 opacity-100 mt-6 pt-6 border-t border-border' : 'max-h-0 opacity-0'
            }`}
          >
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
              METHODOLOGY & SECURITY APPLICATION
            </h4>
            <p className="font-body text-sm text-muted leading-relaxed mb-6">
              Investigates real-time video stream feature extraction utilizing Haar Cascades and Deep Neural Network (DNN) face modules inside OpenCV. Evaluates detection latency, precision tradeoffs under uneven illumination, and adaptive threshold calibration for physical access control and enterprise security environments.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="https://www.researchgate.net"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playProjectClick()}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-background rounded text-xs font-mono text-foreground hover:text-accent hover:border-accent transition-colors"
              >
                <span>ResearchGate Publication</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="https://github.com/ishuu9837"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playProjectClick()}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-background rounded text-xs font-mono text-foreground hover:text-accent hover:border-accent transition-colors"
              >
                <span>Implementation Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Expansion Toggle Button */}
          <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between">
            <button
              onClick={toggleExpand}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent hover:text-foreground transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1"
            >
              <span>{isExpanded ? 'Collapse Abstract' : 'Read Abstract & Methodology'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180 text-foreground' : 'group-hover:translate-y-0.5'
                }`}
              />
            </button>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              ARCHIVE // 02-A
            </span>
          </div>
        </div>

        {/* Active Research Domains */}
        <div>
          <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>{t('areas.title')}</span>
          </h4>
          <div className="flex flex-wrap gap-3">
            {RESEARCH_AREAS.map((areaKey) => (
              <Badge
                key={areaKey}
                variant="default"
                className="px-4 py-2 text-sm font-body hover:border-accent hover:text-accent transition-colors cursor-default"
              >
                {t(`areas.${areaKey}`)}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
