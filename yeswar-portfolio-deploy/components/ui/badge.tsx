import { cn } from '@/lib/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'active' | 'muted' | 'outline';
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full font-mono text-xs md:text-sm whitespace-nowrap',
        {
          'border border-border text-foreground': variant === 'default',
          'bg-accent text-white': variant === 'accent',
          'border border-accent text-accent animate-pulse': variant === 'active',
          'bg-muted text-background': variant === 'muted',
          'border border-border text-muted': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
