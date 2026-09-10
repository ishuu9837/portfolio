import { cn } from '@/lib/utils/cn';

interface SectionHeaderProps {
  number?: string;
  title: string;
  titleKey?: never;
  subtitle?: string;
  subtitleKey?: never;
  className?: string;
}

export function SectionHeader({ number, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-2 md:gap-4 mb-12', className)}>
      <div className="flex items-baseline gap-4">
        {number && (
          <span className="font-mono text-muted text-sm md:text-base">
            {number}
          </span>
        )}
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase text-foreground tracking-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="font-body text-muted text-lg md:text-xl max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
