import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float } from '@react-three/drei';
import { ToothModel } from './ToothModel';

/**
 * R3F scene for the hero tooth: soft studio lighting, environment reflections
 * for the glossy enamel, and a contact shadow on the floor. Rotation pauses on
 * pointer hover. This module is the lazy-loaded chunk (see HeroTooth).
 */
export default function ToothCanvas() {
  const [hovered, setHovered] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0.4, 5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      // R3F sets aria-hidden; the parent provides a descriptive label + fallback.
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      {/* Soft studio lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#bde5fb" />
      <pointLight position={[0, -2, 3]} intensity={0.4} color="#5eead4" />

      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
          <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <ToothModel paused={hovered} />
          </group>
        </Float>
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.35}
          scale={9}
          blur={2.6}
          far={4}
          color="#2563eb"
        />
        {/* Studio environment drives the pearl-like reflections. */}
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
