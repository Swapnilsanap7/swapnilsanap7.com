'use client';

import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { gsap } from 'gsap';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three-stdlib';

function Model() {
  const geometry = useLoader(STLLoader, '/models/model.stl');
  const meshRef = useRef();

  const [isDragging, setIsDragging] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const hasReset = useRef(false);
  const idleTime = 1000;

  const originalPose = { x: 0.3, z: 0.1 };

  const handleStart = () => {
    setIsDragging(true);
    hasReset.current = false;
  };

  const handleEnd = () => {
    setIsDragging(false);
    setLastInteraction(Date.now());
  };

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Continuous Y rotation always
    mesh.rotation.y += 0.01;

    const now = Date.now();
    const idle = now - lastInteraction;

    // On idle and not already reset, tween X/Z
    if (!isDragging && idle > idleTime && !hasReset.current) {
      gsap.to(mesh.rotation, {
        x: originalPose.x,
        z: originalPose.z,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => mesh.rotation.needsUpdate = true,
      });
      hasReset.current = true;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      scale={0.01}
      rotation={[originalPose.x, 0, originalPose.z]}
      onPointerDown={handleStart}
      onPointerUp={handleEnd}
      onPointerLeave={handleEnd}
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
    <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
