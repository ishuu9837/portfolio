'use client';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { cn } from '@/lib/utils/cn';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  label?: string;
}

export function CopyButton({ text, label, className, ...props }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      onClick={() => copy(text)}
      aria-label={label || 'Copy to clipboard'}
      className={cn(
        'inline-flex items-center justify-center p-2 rounded-md hover:bg-muted/20 transition-colors',
        className
      )}
      {...props}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4 text-foreground" />
      )}
    </button>
  );
}
