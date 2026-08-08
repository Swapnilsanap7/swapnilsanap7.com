'use client';

import { Environment } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { gsap } from 'gsap';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three-stdlib';

import { useMemo } from 'react';

function Model() {
  const rawGeometry = useLoader(STLLoader, '/models/model.stl');
  const meshRef = useRef();

  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const hasReset = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useRef(false);
  const idleTime = 1000; // 1 second idle

  const originalPose = { x: 0.3, z: 0.1 };
  const rotationSpeed = useRef(0.01);

  // Apply correct cursor states
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isDragging) {
      document.body.style.cursor = 'grabbing';
    } else if (isHovered) {
      document.body.style.cursor = 'grab';
    } else {
      document.body.style.cursor = 'default';
    }
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [isDragging, isHovered]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    const clientX = e.clientX || e.nativeEvent.clientX;
    const clientY = e.clientY || e.nativeEvent.clientY;
    pointerRef.current = { x: clientX, y: clientY };
    setIsDragging(true);
    hasReset.current = false;
    if (meshRef.current) {
      gsap.killTweensOf(meshRef.current.rotation);
    }
    gsap.killTweensOf(rotationSpeed);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.stopPropagation();
    const clientX = e.clientX || e.nativeEvent.clientX;
    const clientY = e.clientY || e.nativeEvent.clientY;
    const deltaX = clientX - pointerRef.current.x;
    const deltaY = clientY - pointerRef.current.y;
    if (meshRef.current) {
      meshRef.current.rotation.y += deltaX * 0.007;
      meshRef.current.rotation.x += deltaY * 0.007;
    }
    pointerRef.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.target.releasePointerCapture(e.pointerId);
    setIsDragging(false);
    setLastInteraction(Date.now());
  };

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    if (prefersReducedMotion.current) return;

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
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
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

