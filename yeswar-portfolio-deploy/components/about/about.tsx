import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/section-header';
import { Badge } from '@/components/ui/badge';

export function About() {
  const t = useTranslations('about');

  const domainList = t('domains')
    .split(/[·,]/)
    .map((d) => d.trim())
    .filter(Boolean);

  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title={t('title')} />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <p className="font-body text-xl md:text-2xl leading-relaxed text-foreground">
              {t('description')}
            </p>
            
            <div className="font-mono text-sm leading-loose text-muted">
              {domainList.map((domain, index) => (
                <span key={index} className="inline-block mr-3 mb-2 px-3 py-1 bg-card border border-border text-accent rounded-sm">
                  {domain}
                </span>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="flex flex-col p-6 bg-card border-l-4 border-l-accent border border-border shadow-sm rounded-r-lg">
              <div className="mb-4">
                <Badge variant="active" className="mb-2 uppercase font-mono text-xs tracking-wider">
                  {t('activeLabel')}
                </Badge>
              </div>
              <h3 className="font-display text-2xl font-bold text-card-foreground mb-3">
                {t('activeProject')}
              </h3>
              <p className="font-body text-muted text-sm mb-6 leading-relaxed">
                {t('activeDescription')}
              </p>
              
              <div className="mt-auto pt-4 border-t border-border/50">
                <p className="font-mono text-xs text-muted flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  {t('availability')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
