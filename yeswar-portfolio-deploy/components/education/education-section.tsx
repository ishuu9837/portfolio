import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/section-header';
import { Badge } from '@/components/ui/badge';

const EDUCATION_KEYS = ['mtech', 'iit', 'btech', 'school'] as const;

export function EducationSection() {
  const t = useTranslations('education');

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          title={t('title')} 
          subtitle={t('subtitle')} 
        />

        <div className="space-y-8">
          {EDUCATION_KEYS.map((eduKey, index) => {
            const isCurrent = index === 0;
            
            return (
              <div key={eduKey} className="flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-card border border-border rounded-xl transition-all hover:border-accent/50">
                <div className="md:w-1/3 flex flex-col gap-3">
                  <Badge variant={isCurrent ? 'active' : 'default'} className="w-fit font-mono tracking-wider">
                    {t(`items.${eduKey}.timeline`)}
                  </Badge>
                  {isCurrent && (
                    <Badge variant="outline" className="w-fit text-xs border-accent/50 text-accent">
                      Current
                    </Badge>
                  )}
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="font-display text-2xl text-card-foreground mb-2">
                    {t(`items.${eduKey}.degree`)}
                  </h3>
                  <h4 className="font-body text-lg text-muted mb-4">
                    {t(`items.${eduKey}.institution`)}
                  </h4>
                  <p className="font-body text-muted text-sm leading-relaxed">
                    {t(`items.${eduKey}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
