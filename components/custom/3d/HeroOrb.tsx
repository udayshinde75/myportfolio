"use client";

/**
 * HeroOrb
 *
 * A small, self-contained WebGL canvas featuring a floating, distorted
 * icosahedron that slowly rotates and reacts to the pointer. Meant to sit
 * behind/beside the profile picture on the hero section for an "amazing 3D"
 * focal point rather than a flat static image.
 */
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function useIsDark() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

function DistortedOrb() {
  const isDark = useIsDark();
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.7} floatIntensity={1.4}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 4]} />
        <MeshDistortMaterial
          color={isDark ? "#818cf8" : "#6366f1"}
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0.15}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function HeroOrb() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <DistortedOrb />
        </Suspense>
      </Canvas>
    </div>
  );
}
