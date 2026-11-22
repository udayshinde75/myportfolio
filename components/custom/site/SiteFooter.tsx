"use client";

/** Footer bar (copyright, local time, back to top) and a large faded wordmark. */
import { fullName, siteConfig } from "@/lib/site-config";
import { useClock } from "./useClock";

export default function SiteFooter() {
  const { time } = useClock(siteConfig.timeZone);

  return (
    <footer className="mt-24 overflow-hidden md:mt-32">
      <div className="shell">
        <div className="flex flex-col gap-3 border-t border-border py-8 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {fullName}
          </p>
          <p>
            {siteConfig.city} · <span className="tabular-nums">{time ?? "--:--"}</span> local time
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="self-start uppercase transition-colors hover:text-foreground md:self-auto"
          >
            Back to top ↑
          </button>
        </div>
      </div>
      <p
        aria-hidden
        className="display select-none whitespace-nowrap text-center text-[17.5vw] text-foreground/[0.05]"
        style={{ marginBottom: "-0.14em" }}
      >
        {fullName}
      </p>
    </footer>
  );
}
