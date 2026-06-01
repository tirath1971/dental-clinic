import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { MathUtils } from 'three';

interface ToothModelProps {
  /** When true, auto-rotation pauses (e.g. on hover). Float continues subtly. */
  paused?: boolean;
}

/**
 * Procedural glossy tooth built from primitive geometry — a rounded crown with
 * two tapered roots, finished in a pearl-like enamel material. No external
 * asset required, so it always renders.
 */
export function ToothModel({ paused = false }: ToothModelProps) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // Slow auto-rotate (skipped while paused).
    if (!paused) {
      g.rotation.y += delta * 0.35;
    }
    // Subtle floating bob + gentle tilt, eased.
    const t = state.clock.elapsedTime;
    g.position.y = Math.sin(t * 0.9) * 0.12;
    g.rotation.x = MathUtils.lerp(g.rotation.x, Math.sin(t * 0.5) * 0.06, 0.05);
  });

  // Pearl enamel: bright, low-roughness, slightly transmissive for a glossy sheen.
  const enamel = {
    color: '#ffffff',
    roughness: 0.12,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    sheen: 1,
    sheenColor: '#bde5fb',
    envMapIntensity: 1.1,
  };

  return (
    <group ref={group} dispose={null} scale={1.15}>
      {/* Crown — a squashed sphere forms the rounded biting surface. */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial {...enamel} />
      </mesh>
      {/* Crown body — widens the chewing surface. */}
      <mesh position={[0, 0.35, 0]} scale={[1.05, 0.7, 1.05]} castShadow>
        <sphereGeometry args={[0.95, 64, 64]} />
        <meshPhysicalMaterial {...enamel} />
      </mesh>
      {/* Left root */}
      <mesh position={[-0.42, -0.85, 0]} rotation={[0, 0, 0.18]} castShadow>
        <coneGeometry args={[0.42, 1.7, 48]} />
        <meshPhysicalMaterial {...enamel} />
      </mesh>
      {/* Right root */}
      <mesh position={[0.42, -0.85, 0]} rotation={[0, 0, -0.18]} castShadow>
        <coneGeometry args={[0.42, 1.7, 48]} />
        <meshPhysicalMaterial {...enamel} />
      </mesh>
    </group>
  );
}
