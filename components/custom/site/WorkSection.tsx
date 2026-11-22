"use client";

/**
 * Project grid in two staggered columns. On the home page it shows the
 * newest few projects with a link to the full list.
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useProjects } from "@/lib/portfolio";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

export default function WorkSection({
  limit,
  label = "Selected projects",
  title = "work",
}: {
  /** Show only the first N projects plus a "Show all" link. */
  limit?: number;
  label?: string;
  title?: string;
}) {
  const { data: projects, error } = useProjects();
  const total = projects?.length ?? null;
  const list = projects ? (limit ? projects.slice(0, limit) : projects) : null;
  const showAll = Boolean(limit && total && total > limit);

  return (
    <section id="work" className="py-24 md:py-36">
      <SectionHeader
        label={label}
        title={title}
        count={total}
        action={
          showAll ? (
            <Link href="/projects" className="link-draw text-sm md:text-base">
              Show all projects <ArrowUpRight size={16} />
            </Link>
          ) : undefined
        }
      />

      <div className="shell mt-12 md:mt-20">
        {error ? (
          <p className="text-muted-foreground">Projects couldn&apos;t be loaded right now. Please try again later.</p>
        ) : !list ? (
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:gap-x-14" aria-busy="true">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`aspect-[4/4.2] animate-pulse rounded-[22px] bg-foreground/[0.04] ${i === 1 ? "md:translate-y-32" : ""}`}
              />
            ))}
          </div>
        ) : list.length === 0 ? (
          <p className="text-muted-foreground">No projects yet.</p>
        ) : (
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 md:pb-32 lg:gap-x-14 md:[&>*:nth-child(even)]:translate-y-32">
            {list.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
