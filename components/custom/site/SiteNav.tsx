"use client";

/**
 * Site-wide navigation.
 * Desktop: name on the left, lowercase section links + theme switch on the right.
 * Mobile: name, theme switch and a "menu" button that opens a full-screen menu.
 * On the home page the link for the section in view is highlighted.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LockKeyhole } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";
import { fullName } from "@/lib/site-config";
import { pad, useProjects } from "@/lib/portfolio";

const NAV = [
  { id: "work", label: "work" },
  { id: "about", label: "about" },
  { id: "journey", label: "journey" },
  { id: "services", label: "services" },
  { id: "contact", label: "contact" },
] as const;

export default function SiteNav() {
  const pathname = usePathname();
  const { data: projects } = useProjects();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Solid background once the page has scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // While the mobile menu is open: lock page scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    setActive(null);
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    sections.forEach((s) => observer.observe(s));
    const top = document.getElementById("top");
    if (top) observer.observe(top);
    return () => observer.disconnect();
  }, [pathname]);

  const count = projects?.length ?? 0;
  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
          solid ? "border-border bg-background/80 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between">
          <Link href="/" className="text-[15px] font-medium tracking-[-0.01em]" aria-label={`${fullName}, home`}>
            {fullName}
            <sup className="ml-0.5 text-[9px] font-normal text-muted-foreground">©</sup>
          </Link>

          {/* Desktop */}
          <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] md:flex">
            {NAV.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`link-draw transition-colors ${
                  active === item.id ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.label}
                {item.id === "work" && count > 0 && (
                  <sup className="-ml-1 font-mono text-[9px] text-muted-foreground">({pad(count)})</sup>
                )}
              </Link>
            ))}
            <ThemeSwitch className="text-foreground/70 hover:text-foreground" />
            <Link
              href="/auth/signin"
              aria-label="Sign in"
              title="Sign in"
              className="text-foreground/35 transition-colors hover:text-foreground"
            >
              <LockKeyhole size={14} strokeWidth={1.75} />
            </Link>
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-5 text-sm md:hidden">
            <ThemeSwitch className="text-foreground/80" />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              {open ? "close" : "menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu lives outside the header: a backdrop-filter on the
          header would otherwise become the containing block for this
          fixed overlay. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-background md:hidden"
          >
            <nav aria-label="Mobile" className="shell flex h-full flex-col justify-between pb-10 pt-6">
              <ul>
                {NAV.map((item, i) => (
                  <li key={item.id} className="overflow-hidden border-b border-border">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={`/#${item.id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between py-3 text-[13vw] font-medium leading-none tracking-[-0.05em]"
                      >
                        {item.label}
                        <span className="font-mono text-xs tracking-normal text-muted-foreground">
                          ({pad(i + 1)})
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <Link href="/projects" onClick={() => setOpen(false)} className="label text-foreground">
                  All projects ↗
                </Link>
                <Link href="/auth/signin" onClick={() => setOpen(false)} className="label">
                  Sign in
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
