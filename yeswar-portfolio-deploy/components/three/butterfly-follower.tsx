'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/components/providers/theme-provider';

interface ButterflyFollowerProps {
  isMobile: boolean;
}

export function ButterflyFollower({ isMobile }: ButterflyFollowerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);

  // Position interpolation vector
  const targetPos = useRef(new THREE.Vector3(0, 0, 1.5));
  const currentPos = useRef(new THREE.Vector3(0, 0, 1.5));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ pointer, viewport, clock }) => {
    if (isMobile || !groupRef.current) return;

    const time = clock.getElapsedTime();

    // Map 2D normalized pointer [-1, 1] into 3D scene space
    targetPos.current.set(
      (pointer.x * viewport.width) / 2.4,
      (pointer.y * viewport.height) / 2.4,
      1.2 + Math.sin(time * 1.5) * 0.2
    );

    // Calculate velocity for inertia
    velocity.current.subVectors(targetPos.current, currentPos.current);

    // Damped motion with organic inertia (lerp 0.04)
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.042;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.042;
    currentPos.current.z += (targetPos.current.z - currentPos.current.z) * 0.042;

    groupRef.current.position.copy(currentPos.current);

    // Align entity rotation towards movement direction with damping
    const speed = velocity.current.length();
    const targetRotZ = THREE.MathUtils.clamp(velocity.current.x * 0.8, -0.6, 0.6);
    const targetRotX = THREE.MathUtils.clamp(-velocity.current.y * 0.6, -0.4, 0.4);

    groupRef.current.rotation.z += (targetRotZ - groupRef.current.rotation.z) * 0.08;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y = Math.sin(time * 0.8) * 0.15;

    // Wing flutter dynamics: faster flutter during active flight, gentle hovering glide when idle
    const flapSpeed = 8 + speed * 15;
    const flapAngle = Math.sin(time * flapSpeed) * 0.65;

    if (leftWingRef.current) {
      leftWingRef.current.rotation.y = flapAngle;
    }
    if (rightWingRef.current) {
      rightWingRef.current.rotation.y = -flapAngle;
    }
  });

  if (isMobile) return null;

  // Wing geometry: minimal faceted dual triangle
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0);
  wingShape.lineTo(0.35, 0.45);
  wingShape.lineTo(0.55, 0.15);
  wingShape.lineTo(0.25, -0.25);
  wingShape.lineTo(0, 0);

  const wingGeo = new THREE.ShapeGeometry(wingShape);

  return (
    <group ref={groupRef} scale={[0.5, 0.5, 0.5]}>
      {/* Central slender abstract body axis */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.008, 0.35, 6]} />
        <meshBasicMaterial color="#c8472b" />
      </mesh>

      {/* Left Wing */}
      <mesh
        ref={leftWingRef}
        geometry={wingGeo}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color={isDark ? '#f0ede6' : '#2a2824'}
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Right Wing (mirrored scale) */}
      <mesh
        ref={rightWingRef}
        geometry={wingGeo}
        position={[0, 0, 0]}
        scale={[-1, 1, 1]}
      >
        <meshStandardMaterial
          color={isDark ? '#f0ede6' : '#2a2824'}
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
