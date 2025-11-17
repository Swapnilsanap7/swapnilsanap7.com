'use client';

import { Environment } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { gsap } from 'gsap';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three-stdlib';

import { useMemo } from 'react';

function Model() {
  const rawGeometry = useLoader(STLLoader, '/models/model.stl');
  const meshRef = useRef();

  const [isDragging, setIsDragging] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const hasReset = useRef(false);
  const idleTime = 1000; // 1 second idle

  const originalPose = { x: 0.3, z: 0.1 };
  const rotationSpeed = useRef(0.01);

  const handleStart = () => {
    setIsDragging(true);
    hasReset.current = false;
  };

  const handleEnd = () => {
    setIsDragging(false);
    setLastInteraction(Date.now());
  };

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Continuous Y rotation (paused while dragging)
    if (!isDragging) mesh.rotation.y += rotationSpeed.current;

    // Gentle floating effect
    mesh.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

    const now = Date.now();
    const idle = now - lastInteraction;

    // Reset X/Z rotations after idle
    if (!isDragging && idle > idleTime && !hasReset.current) {
      gsap.to(mesh.rotation, {
        x: originalPose.x,
        z: originalPose.z,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => (mesh.rotation.needsUpdate = true),
      });
      gsap.to(rotationSpeed, { current: 0.01, duration: 0.5 });
      hasReset.current = true;
    }
  });

  const geometry = useMemo(() => {
    const g = rawGeometry.clone(); // avoid mutating cached geometry
    g.computeBoundingBox();
    g.center(); // moves geometry so center is at 0,0,0
    return g;
  }, [rawGeometry]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      scale={0.012}
      rotation={[originalPose.x, 0, originalPose.z]}
    >
      <meshStandardMaterial
        color="#5078f0"
        metalness={0.6}
        roughness={0.2}
        side={THREE.DoubleSide}
        flatShading={false}
      />
    </mesh>
  );
}

export default function StlViewer() {
  return (
    <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 10]} intensity={1} />
        <directionalLight position={[-5, -5, -10]} intensity={0.3} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

