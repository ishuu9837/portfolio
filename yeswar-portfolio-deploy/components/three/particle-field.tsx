'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/components/providers/theme-provider';

interface ParticleFieldProps {
  isMobile: boolean;
}

export function ParticleField({ isMobile }: ParticleFieldProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Responsive particle density
  const particleCount = isMobile ? 180 : 480;

  // Generate abstract architectural manifold coordinates
  const [positions, colors, originalY] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const origY = new Float32Array(particleCount);

    const primaryColor = new THREE.Color(isDark ? '#e0ded8' : '#1c1b18');
    const accentColor = new THREE.Color('#c8472b');

    for (let i = 0; i < particleCount; i++) {
      // Stratified distribution forming a subtle topological field
      const u = (i % 24) / 24 - 0.5;
      const v = Math.floor(i / 24) / (particleCount / 24) - 0.5;

      const x = u * 16 + (Math.sin(v * Math.PI * 2) * 0.8);
      const z = v * 12 + (Math.cos(u * Math.PI * 2) * 0.8);
      const y = Math.sin(u * 4) * Math.cos(v * 4) * 1.2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origY[i] = y;

      // 12% accent particles, remainder neutral (deterministic for pure rendering)
      const isAccent = (i * 17 + 7) % 100 < 12;
      const c = isAccent ? accentColor : primaryColor;
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }

    return [pos, cols, origY];
  }, [particleCount, isDark]);

  // Geometric line connections between closest neighbor nodes
  const linePositions = useMemo(() => {
    const lineCoords: number[] = [];
    const maxDistance = 2.2;

    for (let i = 0; i < particleCount; i += 2) {
      for (let j = i + 1; j < Math.min(i + 8, particleCount); j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          lineCoords.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    return new Float32Array(lineCoords);
  }, [particleCount, positions]);

  // Damped reactive motion
  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime() * 0.4;

    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      // Subtle wave propagation influenced by damped pointer
      const targetInfluenceX = pointer.x * 0.4;
      const targetInfluenceY = pointer.y * 0.3;

      for (let i = 0; i < particleCount; i++) {
        const x = array[i * 3];
        const z = array[i * 3 + 2];
        array[i * 3 + 1] =
          originalY[i] +
          Math.sin(time + x * 0.4 + targetInfluenceX) * 0.35 +
          Math.cos(time * 0.8 + z * 0.4 + targetInfluenceY) * 0.25;
      }

      posAttr.needsUpdate = true;

      // Gentle continuous rotation
      pointsRef.current.rotation.y = time * 0.05 + pointer.x * 0.08;
      pointsRef.current.rotation.x = pointer.y * 0.05;
    }

    if (linesRef.current && pointsRef.current) {
      linesRef.current.rotation.y = pointsRef.current.rotation.y;
      linesRef.current.rotation.x = pointsRef.current.rotation.x;
    }
  });

  return (
    <group position={[0, -0.5, -2]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.06 : 0.08}
          vertexColors
          transparent
          opacity={isDark ? 0.75 : 0.65}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={isDark ? '#504c44' : '#b0a898'}
          transparent
          opacity={isDark ? 0.22 : 0.18}
        />
      </lineSegments>
    </group>
  );
}
