import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/section-header';

const CERT_KEYS = [
  'pythonEssentials1',
  'pythonEssentials2',
  'cybersecurity',
  'ml',
  'iitRoorkee',
  'pwc',
  'aws',
] as const;

export function CertificationsSection() {
  const t = useTranslations('certifications');

  return (
    <div className="py-16 px-6 max-w-5xl mx-auto">
      <SectionHeader 
        title={t('title')} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {CERT_KEYS.map((certKey) => {
          const score = t(`items.${certKey}.score`);
          return (
            <div key={certKey} className="p-5 bg-card border border-border rounded-lg flex flex-col justify-between hover:border-accent/50 transition-colors">
              <div>
                <h4 className="font-body font-medium text-card-foreground mb-1">
                  {t(`items.${certKey}.name`)}
                </h4>
                <p className="font-mono text-xs text-muted mb-4">
                  {t(`items.${certKey}.issuer`)}
                </p>
              </div>
              {score && (
                <div className="font-mono text-xs font-semibold text-accent mt-auto">
                  {score}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
