'use client';
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { useAtmosphere } from '@/hooks/useAtmosphere';

/**
 * Camada 02 · corações 3D suaves. Formas orgânicas translúcidas flutuando
 * bem devagar atrás de tudo — só profundidade, nunca protagonismo.
 * Client-only (next/dynamic ssr:false) e desligado em reduced-motion.
 */
function makeHeartGeometry() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.5);
  s.bezierCurveTo(0, 0.5, -0.4, 0, -1, 0);
  s.bezierCurveTo(-1.8, 0, -1.8, 1.0, -1.8, 1.0);
  s.bezierCurveTo(-1.8, 1.5, -1.3, 2.05, 0, 2.7);
  s.bezierCurveTo(1.3, 2.05, 1.8, 1.5, 1.8, 1.0);
  s.bezierCurveTo(1.8, 1.0, 1.8, 0, 1, 0);
  s.bezierCurveTo(0.4, 0, 0, 0.5, 0, 0.5);

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.55,
    bevelEnabled: true,
    bevelThickness: 0.28,
    bevelSize: 0.24,
    bevelSegments: 3,
    steps: 1,
    curveSegments: 24,
  });
  geo.center();
  return geo;
}

function Heart3D({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const { atmosphere } = useAtmosphere();
  const geometry = useMemo(() => makeHeartGeometry(), []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime() * speed;
    mesh.current.position.y = position[1] + Math.sin(t) * 0.3;
    // gira devagar mantendo a "ponta" do coração para baixo (z = π)
    mesh.current.rotation.y = t * 0.25;
    mesh.current.rotation.x = Math.sin(t * 0.6) * 0.12;
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      position={position}
      scale={scale}
      rotation={[0, 0, Math.PI]}
    >
      <meshStandardMaterial
        color={atmosphere.warm}
        roughness={0.9}
        metalness={0.1}
        transparent
        opacity={0.18}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function AmbientBlobs() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 5]} intensity={0.5} />
        <Heart3D position={[-3, 1.5, -2]} scale={0.95} speed={0.15} />
        <Heart3D position={[3.5, -1, -3]} scale={1.2} speed={0.1} />
        <Heart3D position={[0, -2, -4]} scale={0.75} speed={0.2} />
      </Canvas>
    </div>
  );
}
