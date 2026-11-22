"use client";

/**
 * Home page hero: role / location labels, the oversized name, an italic
 * tagline, and a bottom bar with a short statement, a scroll cue and a live
 * local clock.
 */
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useMemo } from "react";
import DotField from "./DotField";
import Globe from "./Globe";
import { MaskReveal } from "./Reveal";
import { useClock } from "./useClock";
import { fullName, siteConfig } from "@/lib/site-config";
import { isOngoing, monthIndex, useEducation, useJobs } from "@/lib/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const { data: jobs } = useJobs();
  const { data: education } = useEducation();
  const { time, relation } = useClock(siteConfig.timeZone);

  const currentJob = useMemo(() => jobs?.find((j) => isOngoing(j.endDate)) ?? jobs?.[0], [jobs]);
  const latestEducation = useMemo(
    () => [...(education ?? [])].sort((a, b) => (monthIndex(b.startDate) ?? 0) - (monthIndex(a.startDate) ?? 0))[0],
    [education]
  );

  const role = currentJob?.title ?? siteConfig.role;
  const rightLabel = currentJob ? `Currently @ ${currentJob.companyName}` : latestEducation?.title ?? "";

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16">
      <DotField className="absolute inset-0 -z-10" />

      <div className="shell flex flex-1 flex-col pt-8 md:pt-12">
        <motion.div {...fadeUp(0.05)} className="label grid grid-cols-2 gap-4 md:grid-cols-3">
          <span>({role})</span>
          <span className="text-right md:text-center">
            Based in {siteConfig.city}, {siteConfig.country}
          </span>
          <span className="hidden truncate text-right md:block">{rightLabel}</span>
        </motion.div>

        <h1
          aria-label={fullName}
          className="display mt-auto pt-12 text-[clamp(4.5rem,min(25vw,25svh),19rem)] md:pt-14"
        >
          <MaskReveal immediate delay={0.1}>
            {siteConfig.firstName}
          </MaskReveal>
          <MaskReveal immediate delay={0.2}>
            {siteConfig.lastName}
            <span className="ml-[0.03em] inline-block h-[0.13em] w-[0.13em] rounded-full bg-hot" />
          </MaskReveal>
        </h1>

        <motion.p {...fadeUp(0.55)} className="mt-5 flex items-center gap-4 md:mt-7">
          <span className="h-px w-12 shrink-0 bg-hot md:w-24" />
          <em className="font-serif text-xl italic leading-tight text-hot md:text-3xl">{siteConfig.tagline}</em>
        </motion.p>

        <motion.div
          {...fadeUp(0.7)}
          className="mt-10 grid grid-cols-1 items-end gap-8 border-t border-border py-6 md:mt-14 md:grid-cols-3 md:py-8"
        >
          <p className="max-w-sm text-xl leading-snug tracking-[-0.02em] md:text-2xl">{siteConfig.statement}</p>

          <a
            href="#work"
            className="hidden items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            <ArrowDown size={14} className="animate-scroll-cue" />
            Scroll to explore
          </a>

          <div className="flex items-center gap-4 md:justify-end">
            <Globe size={68} />
            <div className="text-sm leading-snug">
              <p>
                <span className="font-medium">{siteConfig.city}</span>{" "}
                <span className="tabular-nums text-muted-foreground">{time ?? "--:--"}</span>
              </p>
              <p className="text-muted-foreground">{relation ?? " "}</p>
              {siteConfig.availability && (
                <p className="mt-1.5 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-hot" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-hot" />
                  </span>
                  {siteConfig.availability}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
