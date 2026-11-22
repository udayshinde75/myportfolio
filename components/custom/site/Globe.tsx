/**
 * Small wireframe globe. Meridians squash and stretch out of phase, which
 * reads as a slow rotation. A dot marks where you are.
 */
export default function Globe({ size = 64, className = "" }: { size?: number; className?: string }) {
  const r = 46;
  const latitudes = [-30, -12, 12, 30];

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden
      className={`shrink-0 text-foreground/45 ${className}`}
    >
      <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="0.9" />
      {latitudes.map((y) => {
        const rx = Math.sqrt(r * r - y * y);
        return (
          <ellipse
            key={y}
            cx="50"
            cy={50 + y}
            rx={rx}
            ry={rx * 0.12}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.7"
          />
        );
      })}
      <line x1="4" y1="50" x2="96" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx={r}
          ry={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.55"
          className="animate-meridian"
          style={{
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
            animationDelay: `${-i * 1.5}s`,
          }}
        />
      ))}
      <circle cx="63" cy="41" r="2.8" className="fill-hot" />
      <circle cx="63" cy="41" r="6" className="fill-hot" opacity="0.18" />
    </svg>
  );
}
