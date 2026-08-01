"use client";

/**
 * Scene3DBackground
 *
 * Fixed, full-viewport WebGL canvas mounted once in the root layout so every
 * page shares the same drifting 3D backdrop. Sits behind all content
 * (negative z-index) and ignores pointer events so it never blocks clicks.
 */
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";

export default function Scene3DBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 10], fov: 60 }}
      >
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
