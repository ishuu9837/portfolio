'use client';

import { cn } from '@/lib/utils/cn';
import { SceneController } from '@/components/three/scene-controller';

export function HeroScene({ className }: { className?: string }) {
  return (
    <div 
      id="hero-scene"
      aria-hidden="true"
      className={cn(
        "w-full h-full pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <SceneController />
    </div>
  );
}
