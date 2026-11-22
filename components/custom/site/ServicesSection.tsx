"use client";

/**
 * Services as numbered rows. A "I'm a recruiter / client" switch in the
 * header swaps every row's text between the two versions you wrote in the
 * dashboard; the "Experience" text opens per row.
 */
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";
import { pad, useServices } from "@/lib/portfolio";

const AUDIENCES = [
  { key: "InfoForRecruiters", label: "Recruiter" },
  { key: "InfoForClients", label: "Client" },
] as const;

type Audience = (typeof AUDIENCES)[number]["key"];

export default function ServicesSection() {
  const { data: services, error } = useServices();
  const [audience, setAudience] = useState<Audience>("InfoForRecruiters");

  const switcher = (
    <div
      role="radiogroup"
      aria-label="Tailor the descriptions for"
      className="inline-flex items-center gap-1 rounded-full border border-border p-1 font-mono text-[11px] uppercase tracking-[0.14em]"
    >
      <span className="pl-2 pr-1 text-muted-foreground">I&apos;m a</span>
      {AUDIENCES.map((a) => (
        <button
          key={a.key}
          type="button"
          role="radio"
          aria-checked={audience === a.key}
          onClick={() => setAudience(a.key)}
          className={`rounded-full px-3 py-1.5 transition-colors ${
            audience === a.key ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"
          }`}
        >
          {a.label}
        </button>
      ))}
    </div>
  );

  return (
    <section id="services" className="py-24 md:py-36">
      <SectionHeader
        label="What I do"
        title="services"
        count={services?.length || null}
        action={services && services.length > 0 ? switcher : undefined}
      />

      <div className="shell">
        {error ? (
          <p className="py-12 text-muted-foreground">Services couldn&apos;t be loaded right now.</p>
        ) : !services ? (
          <div className="space-y-4 py-12" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-foreground/[0.04]" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <p className="py-12 text-muted-foreground">No services listed yet.</p>
        ) : (
          <ol>
            {services.map((service, i) => (
              <li key={service._id} className="border-b border-border">
                <Reveal className="group grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-14">
                  <p className="font-mono text-xs text-muted-foreground md:col-span-2">({pad(i + 1)})</p>
                  <h3 className="text-3xl font-medium leading-[1.02] tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-2 md:col-span-4 md:text-5xl">
                    {service.title}
                  </h3>
                  <div className="md:col-span-6">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={audience}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="text-[17px] leading-relaxed text-foreground/80"
                      >
                        {service[audience]}
                      </motion.p>
                    </AnimatePresence>
                    {service.Experience && (
                      <details className="group/exp mt-5">
                        <summary className="label flex cursor-pointer list-none items-center gap-2 transition-colors hover:text-foreground">
                          <Plus size={12} className="transition-transform duration-300 group-open/exp:rotate-45" />
                          Relevant experience
                        </summary>
                        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{service.Experience}</p>
                      </details>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
