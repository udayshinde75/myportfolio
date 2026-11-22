"use client";

/**
 * About: portrait with a location chip, your bio set as a large lead plus
 * smaller body text, a few stats derived from your data, and links.
 */
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import CountUp from "./CountUp";
import { Reveal } from "./Reveal";
import { fullName, siteConfig } from "@/lib/site-config";
import {
  cleanUrl,
  monthIndex,
  socialLinks,
  splitSentences,
  uniqueSkills,
  useEducation,
  useJobs,
  useProfile,
  useProjects,
} from "@/lib/portfolio";

export default function AboutSection() {
  const { data: profile, loading: profileLoading } = useProfile();
  const { data: jobs } = useJobs();
  const { data: projects } = useProjects();
  const { data: education } = useEducation();

  const sentences = splitSentences(profile?.bio ?? "");
  const lead = sentences.slice(0, 2).join(" ");
  const rest = sentences.slice(2).join(" ");

  const stats = useMemo(() => {
    const out: { value: number; suffix?: string; label: string }[] = [];

    const starts = (jobs ?? []).map((j) => monthIndex(j.startDate)).filter((n): n is number => n !== null);
    if (starts.length) {
      const now = new Date();
      const months = now.getFullYear() * 12 + now.getMonth() - Math.min(...starts);
      const years = Math.floor(months / 12);
      out.push(
        years >= 1
          ? { value: years, suffix: "+", label: years === 1 ? "Year in the industry" : "Years in the industry" }
          : { value: Math.max(months, 1), label: "Months in the industry" }
      );
    }

    if (projects?.length) out.push({ value: projects.length, label: "Projects shipped" });

    const skills = uniqueSkills(
      ...(jobs ?? []).map((j) => j.skills),
      ...(projects ?? []).map((p) => p.skills),
      ...(education ?? []).map((e) => e.skills)
    );
    if (skills.length) out.push({ value: skills.length, label: "Tools & technologies" });

    return out;
  }, [jobs, projects, education]);

  const resume = cleanUrl(profile?.resumeLink);
  const links = [
    ...(resume ? [{ label: "Résumé", href: resume }] : []),
    ...socialLinks(profile).map(({ label, href }) => ({ label, href })),
  ];

  return (
    <section id="about" className="py-24 md:py-36">
      <div className="shell grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5 lg:col-span-4">
          <Reveal className="md:sticky md:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-card">
              <Image
                src={siteConfig.portrait}
                alt={`Portrait of ${fullName}`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/75 px-3 py-1.5 text-xs backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-hot" />
                {siteConfig.city}, {siteConfig.country}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7 lg:col-span-8 lg:pl-12">
          <Reveal y={16}>
            <p className="label">(About me)</p>
          </Reveal>

          {profileLoading ? (
            <div className="mt-6 space-y-3" aria-busy="true">
              <div className="h-8 w-full animate-pulse rounded bg-foreground/[0.05]" />
              <div className="h-8 w-4/5 animate-pulse rounded bg-foreground/[0.05]" />
              <div className="h-8 w-3/5 animate-pulse rounded bg-foreground/[0.05]" />
            </div>
          ) : (
            <>
              {lead && (
                <Reveal>
                  <p className="mt-6 text-[1.65rem] leading-[1.18] tracking-[-0.03em] md:text-[2.35rem]">{lead}</p>
                </Reveal>
              )}
              {rest && (
                <Reveal delay={0.1}>
                  <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{rest}</p>
                </Reveal>
              )}
            </>
          )}

          {stats.length > 0 && (
            <Reveal delay={0.1}>
              <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-border pt-10 sm:grid-cols-3">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-5xl font-medium tracking-[-0.05em] md:text-6xl">
                      <CountUp to={s.value} />
                      {s.suffix}
                    </dd>
                    <dd aria-hidden className="mt-2 text-sm text-muted-foreground">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}

          {links.length > 0 && (
            <Reveal delay={0.15}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
                <span className="label">(Elsewhere)</span>
                {links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="link-draw text-[15px]">
                    {l.label}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
