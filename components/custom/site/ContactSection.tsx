"use client";

/**
 * Closing call to action: a large "let's talk" mail link, the email address
 * with a copy button, and a list of social links and your résumé.
 */
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MaskReveal, Reveal } from "./Reveal";
import { siteConfig } from "@/lib/site-config";
import { cleanUrl, socialLinks, useProfile } from "@/lib/portfolio";

export default function ContactSection({ standalone = false }: { standalone?: boolean }) {
  const { data: profile } = useProfile();
  const [copied, setCopied] = useState(false);

  const email = profile?.email?.trim();
  const resume = cleanUrl(profile?.resumeLink);
  const links = [
    ...socialLinks(profile),
    ...(resume ? [{ label: "Résumé", href: resume, handle: "CV" }] : []),
  ];

  async function copyEmail() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email address copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy. Please select the address instead.");
    }
  }

  return (
    <section id="contact" className={`pt-24 md:pt-36 ${standalone ? "min-h-[70vh]" : ""}`}>
      <div className="shell">
        <Reveal y={16}>
          <p className="label">(Get in touch)</p>
        </Reveal>

        <h2 className="display mt-6 text-[clamp(3.5rem,13vw,12rem)]">
          <MaskReveal>
            <span className="font-serif font-normal italic tracking-[-0.03em] text-muted-foreground">
              Have an idea?
            </span>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            {email ? (
              <a href={`mailto:${email}`} className="group inline-flex items-start gap-[0.06em]">
                <span>let&apos;s talk</span>
                <ArrowUpRight
                  className="mt-[0.12em] h-[0.42em] w-[0.42em] text-hot transition-transform duration-500 group-hover:-translate-y-[0.05em] group-hover:translate-x-[0.05em]"
                  strokeWidth={1.5}
                />
              </a>
            ) : (
              <span>let&apos;s talk</span>
            )}
          </MaskReveal>
        </h2>

        <div className="mt-14 grid gap-12 border-t border-border pt-10 md:mt-20 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="label">(Email)</p>
            {email ? (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a href={`mailto:${email}`} className="link-draw text-xl tracking-[-0.02em] md:text-2xl">
                  {email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="rounded-full border border-border p-2 transition-colors hover:bg-foreground hover:text-background"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            ) : (
              <div className="mt-3 h-8 w-64 animate-pulse rounded bg-foreground/[0.05]" />
            )}
            {siteConfig.availability && (
              <p className="mt-6 flex items-center gap-2 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-hot" />
                {siteConfig.availability}
              </p>
            )}
          </Reveal>

          {links.length > 0 && (
            <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
              <ul>
                {links.map((l) => (
                  <li key={l.label} className="border-b border-border first:border-t md:first:border-t-0">
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4 text-lg md:text-xl"
                    >
                      <span className="transition-transform duration-500 group-hover:translate-x-2">{l.label}</span>
                      <span className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                        <span className="hidden sm:inline">{l.handle}</span>
                        <ArrowUpRight
                          size={18}
                          className="text-foreground transition-transform duration-500 group-hover:rotate-45"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
