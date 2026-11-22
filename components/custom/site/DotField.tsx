"use client";

/**
 * Hero background: a grid of dots that ripples slowly and lights up around
 * the pointer (dots closest to it pick up the accent colour).
 * Plain 2D canvas, so it's light. It pauses while off-screen and draws a
 * single still frame for visitors who prefer reduced motion.
 */
import { useEffect, useRef } from "react";

const SPACING = 28;
const POINTER_RADIUS = 190;

export default function DotField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let fg = "0 0% 92%";
    let hot = "12 100% 56%";
    // Pointer position in canvas coordinates, eased toward the real one.
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const readColors = () => {
      const styles = getComputedStyle(root);
      fg = styles.getPropertyValue("--foreground").trim() || fg;
      hot = styles.getPropertyValue("--hot").trim() || hot;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const offsetX = (width - (cols - 1) * SPACING) / 2;
      const offsetY = (height - (rows - 1) * SPACING) / 2;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x0 = offsetX + c * SPACING;
          const y0 = offsetY + r * SPACING;

          // Slow travelling wave across the grid.
          const wave = Math.sin(x0 * 0.011 + t * 0.00045) * Math.cos(y0 * 0.014 - t * 0.0003);

          const dx = x0 - pointer.x;
          const dy = y0 - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const near = Math.max(0, 1 - dist / POINTER_RADIUS);
          const ease = near * near;

          // Dots near the pointer are nudged away from it slightly.
          const push = dist > 0 ? (ease * 10) / dist : 0;
          const x = x0 + dx * push;
          const y = y0 + dy * push + wave * 3;

          const alpha = 0.07 + (wave + 1) * 0.06 + ease * 0.75;
          const radius = 0.9 + (wave + 1) * 0.25 + ease * 1.6;

          ctx.fillStyle = `hsl(${ease > 0.45 ? hot : fg} / ${Math.min(alpha, 1)})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (t: number) => {
      draw(t);
      if (visible) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduceMotion) {
        draw(0);
      } else {
        raf = requestAnimationFrame(loop);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      if (pointer.x < -9000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const onPointerLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    readColors();
    resize();
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    resizeObserver.observe(canvas);

    // Stop animating while the hero is scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible) start();
    });
    io.observe(canvas);

    // Re-read colours when the theme changes.
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduceMotion) draw(0);
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none h-full w-full ${className}`}
      style={{
        maskImage: "radial-gradient(ellipse 75% 70% at 62% 42%, black 25%, transparent 78%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 62% 42%, black 25%, transparent 78%)",
      }}
    />
  );
}
