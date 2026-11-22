"use client";

/**
 * Work and education merged into one timeline, newest first.
 * Long descriptions show their first paragraph; the rest opens as a
 * bulleted list. Long skill lists collapse behind a "+N" toggle.
 */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";
import { cleanUrl, monthIndex, pad, shortDate, useEducation, useJobs } from "@/lib/portfolio";

interface Entry {
  id: string;
  kind: "Work" | "Education";
  title: string;
  org: string;
  orgLink: string | null;
  location?: string;
  start: string;
  end: string;
  description: string;
  skills: string[];
  score?: string;
}

export default function JourneySection() {
  const { data: jobs, error: jobsError } = useJobs();
  const { data: education, error: eduError } = useEducation();
  const loading = (jobs === null && !jobsError) || (education === null && !eduError);

  const entries = useMemo<Entry[]>(() => {
    const work: Entry[] = (jobs ?? []).map((j) => ({
      id: j._id,
      kind: "Work",
      title: j.title,
      org: j.companyName,
      orgLink: cleanUrl(j.companyLink),
      location: j.location,
      start: j.startDate,
      end: j.endDate,
      description: j.description ?? "",
      skills: j.skills ?? [],
    }));
    const study: Entry[] = (education ?? []).map((e) => ({
      id: e._id,
      kind: "Education",
      title: e.title,
      org: e.universityName,
      orgLink: cleanUrl(e.universityLink),
      location: e.location,
      start: e.startDate,
      end: e.endDate,
      description: e.description ?? "",
      skills: e.skills ?? [],
      score: e.score ? `${e.scoreType ? `${e.scoreType} — ` : ""}${e.score.replace(/\s+/g, " ")}` : undefined,
    }));
    return [...work, ...study].sort((a, b) => (monthIndex(b.start) ?? 0) - (monthIndex(a.start) ?? 0));
  }, [jobs, education]);

  return (
    <section id="journey" className="py-24 md:py-36">
      <SectionHeader label="Work & education" title="journey" count={entries.length || null} />

      <div className="shell">
        {loading ? (
          <div className="space-y-4 py-12" aria-busy="true">
            {[0, 1].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl bg-foreground/[0.04]" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <p className="py-12 text-muted-foreground">Nothing here yet.</p>
        ) : (
          <ol>
            {entries.map((entry, i) => (
              <JourneyRow key={entry.id} entry={entry} index={i} />
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

function JourneyRow({ entry, index }: { entry: Entry; index: number }) {
  const paragraphs = entry.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const [first, ...more] = paragraphs;
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="border-b border-border">
      <Reveal className="grid gap-6 py-12 md:grid-cols-12 md:gap-8 md:py-16">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground md:col-span-2">
          <p>({pad(index + 1)})</p>
          <p className="mt-3">
            {shortDate(entry.start)} — {shortDate(entry.end)}
          </p>
        </div>

        <div className="md:col-span-5 md:pr-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-hot">{entry.kind}</p>
          <h3 className="mt-3 text-3xl font-medium leading-[1.05] tracking-[-0.035em] md:text-[2.6rem]">
            {entry.title}
          </h3>
          <p className="mt-3 font-serif text-xl italic leading-snug text-muted-foreground md:text-2xl">
            {entry.orgLink ? (
              <a
                href={entry.orgLink}
                target="_blank"
                rel="noopener noreferrer"
                className="decoration-foreground/30 underline-offset-[0.2em] transition-colors hover:text-foreground hover:underline"
              >
                {entry.org}
                <ArrowUpRight size={14} className="ml-1 inline-block align-[0.1em]" />
              </a>
            ) : (
              entry.org
            )}
            {entry.location ? <span> · {entry.location}</span> : null}
          </p>
          {entry.score && (
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{entry.score}</p>
          )}
        </div>

        <div className="md:col-span-5">
          {first && <p className="text-[17px] leading-relaxed text-foreground/80">{first}</p>}

          <AnimatePresence initial={false}>
            {expanded && more.length > 0 && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                {more.map((p, i) => (
                  <li key={i} className="flex gap-3 pt-4 text-[15px] leading-relaxed text-muted-foreground">
                    <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-hot" />
                    <span>{p}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {more.length > 0 && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="link-draw mt-5 text-sm"
            >
              {expanded ? "Show less" : `Read more (${more.length})`}
              <span aria-hidden className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
                ↓
              </span>
            </button>
          )}

          <SkillList skills={entry.skills} />
        </div>
      </Reveal>
    </li>
  );
}

function SkillList({ skills }: { skills: string[] }) {
  const clean = skills.map((s) => s.trim()).filter(Boolean);
  const [showAll, setShowAll] = useState(false);
  if (clean.length === 0) return null;

  const LIMIT = 8;
  const visible = showAll ? clean : clean.slice(0, LIMIT);
  const hidden = clean.length - visible.length;

  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {visible.map((s) => (
        <li key={s} className="chip">
          {s}
        </li>
      ))}
      {(hidden > 0 || showAll) && clean.length > LIMIT && (
        <li>
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="chip border-dashed text-muted-foreground transition-colors hover:text-foreground"
          >
            {showAll ? "Show fewer" : `+${hidden} more`}
          </button>
        </li>
      )}
    </ul>
  );
}
