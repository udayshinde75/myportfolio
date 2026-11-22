"use client";

/**
 * Single project page: title, description, stack and links, the screenshot
 * on a tinted panel, and the project's README rendered from GitHub.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MaskReveal, Reveal } from "./Reveal";
import { glowFor } from "./ProjectCard";
import { Project, cleanUrl, driveImage, prettyName, useApi } from "@/lib/portfolio";

export default function ProjectDetail({ id }: { id: string }) {
  const { data: project, error } = useApi<Project & { error?: string }>(`/api/projects/${id}`);
  const [readme, setReadme] = useState<string | null>(null);
  const [readmeState, setReadmeState] = useState<"idle" | "loading" | "done" | "failed">("idle");

  const readmeUrl = cleanUrl(project?.readmeFile);

  useEffect(() => {
    if (!readmeUrl) return;
    let alive = true;
    setReadmeState("loading");
    fetch(readmeUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`README responded ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!alive) return;
        // A link to an HTML page instead of raw markdown can't be rendered.
        if (/<html[\s>]/i.test(text)) throw new Error("README is HTML, not markdown");
        setReadme(text);
        setReadmeState("done");
      })
      .catch(() => alive && setReadmeState("failed"));
    return () => {
      alive = false;
    };
  }, [readmeUrl]);

  if (error || (project && project.error)) {
    return (
      <div className="shell flex min-h-[60vh] flex-col justify-center pt-24">
        <p className="label">(404)</p>
        <h1 className="display mt-4 text-[clamp(3rem,10vw,8rem)]">not found</h1>
        <Link href="/projects" className="link-draw mt-10 self-start">
          <ArrowLeft size={14} /> All projects
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="shell pt-28" aria-busy="true">
        <div className="h-4 w-32 animate-pulse rounded bg-foreground/[0.06]" />
        <div className="mt-10 h-24 w-3/4 animate-pulse rounded-xl bg-foreground/[0.06]" />
        <div className="mt-12 aspect-[16/9] animate-pulse rounded-[22px] bg-foreground/[0.04]" />
      </div>
    );
  }

  const name = prettyName(project.projectName);
  const skills = (project.skills ?? []).map((s) => s.trim()).filter(Boolean);
  const github = cleanUrl(project.githubLink);
  const live = cleanUrl(project.liveDemo);
  const year = project.createdAt ? new Date(project.createdAt).getFullYear() : null;
  const glowIndex = [...id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

  return (
    <article className="pt-28 md:pt-32">
      <div className="shell">
        <Link href="/projects" className="label link-draw hover:text-foreground">
          <ArrowLeft size={12} /> All projects
        </Link>

        <div className="mt-12 flex items-center justify-between">
          <p className="label">(Project)</p>
          {year ? <p className="label">{year}</p> : null}
        </div>
        <h1 className="display mt-4 text-[clamp(3.25rem,10vw,9.5rem)]">
          <MaskReveal immediate>{name}</MaskReveal>
        </h1>

        <Reveal className="mt-10 grid gap-10 border-t border-border pt-10 md:mt-14 md:grid-cols-12">
          <p className="text-2xl leading-snug tracking-[-0.02em] md:col-span-7 md:text-3xl">
            {project.projectDescription}
          </p>
          <dl className="space-y-8 md:col-span-4 md:col-start-9">
            {skills.length > 0 && (
              <div>
                <dt className="label">Stack</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {(github || live) && (
              <div>
                <dt className="label">Links</dt>
                <dd className="mt-3 flex flex-col items-start gap-2 text-lg">
                  {live && (
                    <a href={live} target="_blank" rel="noopener noreferrer" className="link-draw">
                      Visit live site <ArrowUpRight size={16} />
                    </a>
                  )}
                  {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" className="link-draw">
                      Source on GitHub <ArrowUpRight size={16} />
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </Reveal>

        {project.projectPictureUrl && (
          <Reveal className="relative isolate mt-16 overflow-hidden rounded-[22px] border border-foreground/10 bg-card p-3 md:mt-24 md:p-8">
            <div aria-hidden className="absolute inset-0 -z-10 opacity-90" style={{ background: glowFor(glowIndex) }} />
            <Image
              src={driveImage(project.projectPictureUrl, 2048)}
              alt={`Screenshot of ${name}`}
              width={2048}
              height={1201}
              unoptimized
              referrerPolicy="no-referrer"
              className="h-auto w-full rounded-xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
              priority
            />
          </Reveal>
        )}

        {readmeUrl && readmeState !== "failed" && (
          <section className="mt-20 grid gap-8 border-t border-border pt-10 md:mt-28 md:grid-cols-12">
            <p className="label md:col-span-3">(Readme)</p>
            <div className="min-w-0 md:col-span-9">
              {readmeState === "done" && readme ? (
                <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-medium prose-headings:tracking-tight prose-a:text-hot prose-a:no-underline hover:prose-a:underline prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-img:rounded-xl">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
                </div>
              ) : (
                <div className="space-y-3" aria-busy="true">
                  <div className="h-6 w-1/2 animate-pulse rounded bg-foreground/[0.05]" />
                  <div className="h-4 w-full animate-pulse rounded bg-foreground/[0.05]" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-foreground/[0.05]" />
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
