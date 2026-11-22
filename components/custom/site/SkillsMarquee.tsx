"use client";

/**
 * Endless horizontal strip of skills pulled from your jobs and projects.
 * Alternates upright and italic-serif words; pauses on hover.
 */
import { useMemo } from "react";
import { uniqueSkills, useJobs, useProjects } from "@/lib/portfolio";

export default function SkillsMarquee() {
  const { data: jobs } = useJobs();
  const { data: projects } = useProjects();

  const skills = useMemo(
    () =>
      uniqueSkills(...(jobs ?? []).map((j) => j.skills), ...(projects ?? []).map((p) => p.skills))
        .filter((s) => s.length <= 22)
        .slice(0, 18),
    [jobs, projects]
  );

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {skills.map((skill, i) => (
        <li key={skill} className="flex items-center">
          <span className={i % 2 ? "font-serif font-normal italic tracking-[-0.02em] text-muted-foreground" : ""}>
            {skill}
          </span>
          <span aria-hidden className="mx-6 inline-block h-2 w-2 rounded-full bg-hot md:mx-10 md:h-2.5 md:w-2.5" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Skills and tools" className="marquee overflow-hidden border-y border-border py-6 md:py-9">
      {skills.length === 0 ? (
        <div className="h-10 md:h-[4.5rem]" />
      ) : (
        <div className="marquee-track flex w-max animate-marquee whitespace-nowrap text-4xl font-medium leading-none tracking-[-0.045em] md:text-6xl lg:text-7xl">
          {row(false)}
          {row(true)}
        </div>
      )}
    </section>
  );
}
