"use client";

/**
 * Text-style theme switch ("◐ light" / "◐ dark").
 * The label names the theme you'll switch to. The choice is saved in
 * localStorage under "ui-theme" and synced across open tabs.
 */
import { useEffect, useState } from "react";

const STORAGE_KEY = "ui-theme";

export default function ThemeSwitch({ className = "" }: { className?: string }) {
  // null until mounted, so server and client render the same markup.
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    setDark(root.classList.contains("dark"));

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const isDark = e.newValue !== "light";
      root.classList.toggle("dark", isDark);
      setDark(isDark);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable (private mode): theme still applies for this visit */
    }
    setDark(next);
  }

  const isDark = dark !== false;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`inline-flex items-center gap-2 transition-colors ${className}`}
    >
      <span
        aria-hidden
        className="inline-block h-3.5 w-3.5 rounded-full border-[1.5px] border-current transition-transform duration-500"
        style={{
          background: "linear-gradient(90deg, currentColor 50%, transparent 50%)",
          transform: isDark ? "rotate(0deg)" : "rotate(180deg)",
        }}
      />
      <span>{isDark ? "light" : "dark"}</span>
    </button>
  );
}
