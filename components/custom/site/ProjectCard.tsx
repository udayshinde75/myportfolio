"use client";

/**
 * Project card: tinted glow, tag chip, index, title, short description and a
 * tilted screenshot that bleeds off the bottom-right corner.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project, driveImage, pad, prettyName } from "@/lib/portfolio";
import { Reveal } from "./Reveal";

/** Pairs of RGB colours used for each card's two glows. */
const GLOWS: [string, string][] = [
  ["16 185 129", "6 182 212"], // emerald / cyan
  ["245 158 11", "56 189 248"], // amber / sky
  ["168 85 247", "236 72 153"], // violet / pink
  ["59 130 246", "45 212 191"], // blue / teal
  ["244 63 94", "251 146 60"], // rose / orange
  ["132 204 22", "20 184 166"], // lime / teal
];

export function glowFor(index: number) {
  const [a, b] = GLOWS[((index % GLOWS.length) + GLOWS.length) % GLOWS.length];
  return `radial-gradient(110% 75% at 0% 0%, rgb(${a} / 0.42), transparent 60%), radial-gradient(85% 65% at 100% 100%, rgb(${b} / 0.38), transparent 65%)`;
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const name = prettyName(project.projectName);
  const tags = (project.skills ?? []).map((s) => s.trim()).filter(Boolean);
  const href = `/projects/${project._id}`;

  return (
    // Plain wrapper so the grid can offset alternate cards without fighting
    // the reveal animation's transform.
    <div>
      <Reveal>
        <article className="group">
          <Link
            href={href}
            aria-label={`${name}: view project`}
            className="relative isolate block overflow-hidden rounded-[22px] border border-foreground/10 bg-card transition-colors duration-500 hover:border-foreground/25"
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-75 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: glowFor(index) }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -left-4 top-[22%] -z-10 select-none font-serif text-[15rem] italic leading-none text-foreground/[0.06] md:text-[19rem]"
            >
              {name.charAt(0)}
            </span>

            <div className="flex items-start justify-between gap-4 p-6 md:p-8">
              <span className="chip-mono max-w-[75%] truncate">{tags.slice(0, 2).join(" · ") || "Project"}</span>
              <span className="font-mono text-xs text-foreground/70">({pad(index + 1)})</span>
            </div>

            <div className="px-6 md:px-8">
              <h3 className="text-[2.4rem] font-medium leading-[1] tracking-[-0.045em] md:text-5xl lg:text-[3.6rem]">
                {name}
              </h3>
              <p className="mt-4 line-clamp-2 max-w-md text-[15px] leading-relaxed text-foreground/70 md:text-base">
                {project.projectDescription}
              </p>
            </div>

            <div className="mt-8 pl-[12%] [perspective:1400px] md:mt-10">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out [transform:translate(7%,9%)_rotateY(-10deg)_rotateX(5deg)] group-hover:[transform:translate(5%,5%)_rotateY(-4deg)_rotateX(2deg)]">
                {project.projectPictureUrl ? (
                  <Image
                    src={driveImage(project.projectPictureUrl, 1400)}
                    alt={`Screenshot of ${name}`}
                    fill
                    unoptimized
                    referrerPolicy="no-referrer"
                    className="object-cover object-top"
                  />
                ) : null}
              </div>
            </div>
          </Link>

          <div className="mt-4 flex items-center justify-between gap-4 text-sm">
            <span className="truncate text-muted-foreground">{tags.slice(0, 3).join(" · ")}</span>
            <Link href={href} tabIndex={-1} aria-hidden className="link-draw shrink-0">
              View project <ArrowUpRight size={14} />
            </Link>
          </div>
        </article>
      </Reveal>
    </div>
  );
}
