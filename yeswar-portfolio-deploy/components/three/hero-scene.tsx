'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from './particle-field';
import { ButterflyFollower } from './butterfly-follower';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export default function ThreeHeroScene() {
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />

        <Suspense fallback={null}>
          <ParticleField isMobile={isMobile} />
          {!prefersReducedMotion && <ButterflyFollower isMobile={isMobile} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
