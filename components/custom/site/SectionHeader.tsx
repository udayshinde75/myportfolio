"use client";

/**
 * Section opener: a small mono label, an oversized lowercase title with an
 * optional item count, and an optional action on the right.
 */
import { ReactNode } from "react";
import { pad } from "@/lib/portfolio";
import { MaskReveal, Reveal } from "./Reveal";

export default function SectionHeader({
  label,
  title,
  count,
  action,
}: {
  label: string;
  title: string;
  count?: number | null;
  action?: ReactNode;
}) {
  return (
    <header className="shell">
      <Reveal y={16}>
        <p className="label">({label})</p>
      </Reveal>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-border pb-8 md:pb-12">
        <h2 className="display flex items-start text-[clamp(4.25rem,15vw,13.5rem)]">
          <MaskReveal>{title}</MaskReveal>
          {count ? (
            <span className="ml-2 mt-[0.12em] font-mono text-xs font-normal tracking-normal text-muted-foreground md:ml-3 md:text-sm">
              ({pad(count)})
            </span>
          ) : null}
        </h2>
        {action ? <Reveal y={16} className="pb-1 md:pb-3">{action}</Reveal> : null}
      </div>
    </header>
  );
}
