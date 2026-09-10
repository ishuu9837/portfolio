import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/section-header';

const EXPERIENCE_KEYS = ['pwc', 'aws', 'bytexl'] as const;

export function ExperienceSection() {
  const t = useTranslations('experience');

  return (
    <section id="experience" className="py-24 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          title={t('title')} 
          subtitle={t('subtitle')} 
        />

        <div className="relative border-l border-accent/30 pl-8 ml-4 md:ml-0 md:pl-12 space-y-16">
          {EXPERIENCE_KEYS.map((expKey) => (
            <div key={expKey} className="relative">
              {/* Dot indicator */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-5 h-5 bg-background border-2 border-accent rounded-full" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2">
                <h3 className="font-display text-2xl text-foreground">
                  {t(`items.${expKey}.role`)}
                </h3>
                <span className="font-mono text-sm text-accent">
                  {t(`items.${expKey}.timeline`)}
                </span>
              </div>
              
              <h4 className="font-body text-lg text-muted mb-4">
                {t(`items.${expKey}.org`)}
              </h4>
              
              <p className="font-body text-muted leading-relaxed">
                {t(`items.${expKey}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
