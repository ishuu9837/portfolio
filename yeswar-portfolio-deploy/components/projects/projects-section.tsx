'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/section-header';
import { ActiveProject } from './active-project';
import { ProjectCard } from './project-card';
import { completedProjects } from '@/lib/data/projects';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ProjectsSection() {
  const t = useTranslations('projects');
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray<HTMLElement>('.stacked-project-card');
    if (!cards || cards.length === 0) return;

    // Create stacking effect where earlier cards scale down & dim slightly as later cards arrive
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Last card doesn't need to dim for a subsequent card

        const nextCard = cards[i + 1];

        ScrollTrigger.create({
          trigger: nextCard,
          start: 'top 75%',
          end: 'top 35%',
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress;
            // Damped scale and opacity decay
            gsap.to(card, {
              scale: 1 - progress * 0.045,
              opacity: 1 - progress * 0.35,
              y: -progress * 15,
              ease: 'power1.out',
              overwrite: 'auto',
            });
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader 
          title={t('title')} 
          subtitle={t('subtitle')} 
        />
        
        {/* Active Multimodal Research Spotlight */}
        <ActiveProject />

        {/* Stacked Project Cards Container */}
        <div ref={stackContainerRef} className="relative space-y-12 md:space-y-16 mt-16">
          {completedProjects.map((project, index) => {
            // Incremental sticky top offsets for card layering
            const stickyTop = 80 + index * 16;

            return (
              <div
                key={project.id}
                className="stacked-project-card sticky transition-shadow duration-300"
                style={{
                  top: `${stickyTop}px`,
                  zIndex: index + 10,
                }}
              >
                <ProjectCard
                  {...project}
                  className="shadow-lg hover:shadow-2xl border-border/90"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
