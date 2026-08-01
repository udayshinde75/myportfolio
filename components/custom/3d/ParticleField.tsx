"use client";

/**
 * ParticleField
 *
 * The actual WebGL scene contents rendered inside the persistent background Canvas:
 * a drifting star field plus a handful of slow-spinning wireframe polyhedra.
 * Colors respond to light/dark theme and the whole scene gently parallaxes
 * toward the pointer for a subtle sense of depth.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
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

function Starfield({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 900;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={isDark ? "#93c5fd" : "#475569"}
        transparent
        opacity={isDark ? 0.7 : 0.35}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingShape({
  position,
  geometry,
  speed,
  color,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "torus" | "octahedron";
  speed: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * speed * 0.3;
    meshRef.current.rotation.y = t * speed * 0.4;
    meshRef.current.position.y = initialY + Math.sin(t * speed) * 0.6;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
      {geometry === "torus" && <torusGeometry args={[0.8, 0.28, 16, 64]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function PointerParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = (state.pointer.x * viewport.width) / 40;
    const targetY = (state.pointer.y * viewport.height) / 40;
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.02;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function ParticleField() {
  const isDark = useIsDark();

  const shapeColor = isDark ? "#818cf8" : "#6366f1";
  const shapeColorAlt = isDark ? "#f472b6" : "#0ea5e9";

  return (
    <PointerParallax>
      <Starfield isDark={isDark} />
      <FloatingShape position={[-6, 2, -8]} geometry="icosahedron" speed={0.35} color={shapeColor} />
      <FloatingShape position={[7, -3, -10]} geometry="torus" speed={0.25} color={shapeColorAlt} />
      <FloatingShape position={[-5, -4, -6]} geometry="octahedron" speed={0.45} color={shapeColorAlt} />
      <FloatingShape position={[6, 4, -12]} geometry="icosahedron" speed={0.2} color={shapeColor} />
    </PointerParallax>
  );
}
