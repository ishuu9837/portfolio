import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 4.6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const positions = new Float32Array(720 * 3);
    const colors = new Float32Array(720 * 3);
    const accent = new THREE.Color("#B74E35");
    const neutral = new THREE.Color("#8b8379");

    for (let i = 0; i < 720; i += 1) {
      const i3 = i * 3;
      const radius = 1.5 + Math.random() * 1.25;
      const angle = Math.random() * Math.PI * 2;
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 2.5;
      positions[i3 + 2] = Math.sin(angle) * radius - 0.6;
      const color = Math.random() > 0.84 ? accent : neutral;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.46,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.25, 1),
      new THREE.MeshBasicMaterial({ color: "#B74E35", wireframe: true, transparent: true, opacity: 0.14 })
    );
    wire.position.set(0.18, 0, -0.15);
    scene.add(wire);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);
    onResize();

    let frame = 0;
    let raf = 0;
    const animate = () => {
      frame += 1;
      if (!document.hidden) {
        points.rotation.y += reducedMotion ? 0.0002 : 0.0013;
        points.rotation.x += reducedMotion ? 0.00005 : 0.00035;
        wire.rotation.y -= reducedMotion ? 0.0002 : 0.0008;
        wire.rotation.x += reducedMotion ? 0.0001 : 0.0005;
        scene.rotation.y += (pointer.x * 0.012 - scene.rotation.y) * 0.02;
        scene.rotation.x += (-pointer.y * 0.01 - scene.rotation.x) * 0.02;
        material.opacity = 0.38 + Math.sin(frame * 0.015) * 0.08;
        renderer.render(scene, camera);
      }
      raf = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      wire.geometry.dispose();
      (wire.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="three-field" aria-hidden="true" />;
}
