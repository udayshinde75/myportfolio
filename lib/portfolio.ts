/**
 * Client-side data access for the public portfolio pages.
 *
 * Several sections on the home page need the same data (the nav shows the
 * project count, the about section uses projects and jobs for its stats...),
 * so responses are cached briefly and shared between components instead of
 * each section fetching on its own.
 */
import { useEffect, useState } from "react";

export interface Profile {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  resumeLink?: string;
  linkedIn?: string;
  instagram?: string;
  github?: string;
  twitter?: string;
}

export interface Project {
  _id: string;
  projectName: string;
  projectDescription: string;
  skills: string[];
  githubLink?: string;
  liveDemo?: string;
  readmeFile?: string;
  projectPictureUrl: string;
  createdAt?: string;
}

export interface Job {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  companyName: string;
  companyLink?: string;
  location?: string;
  description?: string;
  skills: string[];
}

export interface Education {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  universityName: string;
  universityIcon?: string;
  universityLink?: string;
  location: string;
  description: string;
  skills: string[];
  score?: string;
  scoreType?: string;
}

export interface Service {
  _id: string;
  title: string;
  InfoForRecruiters: string;
  InfoForClients: string;
  Experience: string;
}

/* ------------------------------------------------------------------ */
/* Fetching                                                            */
/* ------------------------------------------------------------------ */

const CACHE_TTL_MS = 60_000;
const cache = new Map<string, { at: number; promise: Promise<unknown> }>();

function load<T>(url: string): Promise<T> {
  const hit = cache.get(url);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.promise as Promise<T>;

  const promise = fetch(url)
    .then(async (res) => {
      if (!res.ok) throw new Error(`${url} responded ${res.status}`);
      return res.json();
    })
    .catch((err) => {
      cache.delete(url);
      throw err;
    });

  cache.set(url, { at: Date.now(), promise });
  return promise as Promise<T>;
}

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    load<T>(url)
      .then((d) => alive && setData(d))
      .catch((err) => {
        console.error(err);
        if (alive) setError(true);
      });
    return () => {
      alive = false;
    };
  }, [url]);

  return { data, error, loading: data === null && !error };
}

/** Guards against an API returning an error object instead of a list. */
function asList<T>(data: unknown): T[] | null {
  if (data === null || data === undefined) return null;
  return Array.isArray(data) ? (data as T[]) : [];
}

export const useProfile = () => useApi<Profile>("/api/home/profile");

export function useProjects() {
  const r = useApi<Project[]>("/api/projects");
  return { ...r, data: asList<Project>(r.data) };
}

export function useJobs() {
  const r = useApi<Job[]>("/api/about/career");
  return { ...r, data: asList<Job>(r.data) };
}

export function useEducation() {
  const r = useApi<Education[]>("/api/about/education");
  return { ...r, data: asList<Education>(r.data) };
}

export function useServices() {
  const r = useApi<Service[]>("/api/service");
  return { ...r, data: asList<Service>(r.data) };
}

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                  */
/* ------------------------------------------------------------------ */

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Zero-padded index: 1 -> "01". */
export const pad = (n: number) => String(n).padStart(2, "0");

/** "Personal_Encryption_Tool" -> "Personal Encryption Tool" */
export const prettyName = (name: string) => name.replace(/_/g, " ").replace(/\s+/g, " ").trim();

/** True for "Present", "Now", "Current" or an empty end date. */
export const isOngoing = (date?: string) => !date || /present|now|current/i.test(date);

/**
 * Turns free-text dates like "April 2024" or "june 2020" into a sortable
 * month index. Returns null when no year can be found.
 */
export function monthIndex(date?: string): number | null {
  if (!date) return null;
  const year = date.match(/\d{4}/);
  if (!year) return null;
  const lower = date.toLowerCase();
  const month = MONTHS.findIndex((m) => lower.includes(m));
  return Number(year[0]) * 12 + Math.max(month, 0);
}

/** "April 2024" -> "APR 2024", "Present" -> "NOW" */
export function shortDate(date?: string): string {
  if (isOngoing(date)) return "Now";
  const idx = monthIndex(date);
  if (idx === null) return date ?? "";
  const lower = (date ?? "").toLowerCase();
  const hasMonth = MONTHS.some((m) => lower.includes(m));
  const year = Math.floor(idx / 12);
  return hasMonth ? `${MONTHS[idx % 12]} ${year}` : String(year);
}

/**
 * Project images are Google Drive thumbnail links. Drive can resize them
 * itself via the `sz` parameter, so we ask for roughly the displayed width
 * and load them directly (Next's image optimizer times out on slow Drive
 * responses). Render them with referrerPolicy="no-referrer": Google's image
 * host rejects requests that carry a localhost referer.
 */
export function driveImage(url: string, width: number): string {
  try {
    const u = new URL(url);
    if (u.hostname === "drive.google.com" && u.pathname.startsWith("/thumbnail")) {
      u.searchParams.set("sz", `w${width}`);
      return u.toString();
    }
  } catch {
    /* not an absolute URL: use as-is */
  }
  return url;
}

/** Collects skills from any number of lists, de-duplicated case-insensitively. */
export function uniqueSkills(...lists: (string[] | undefined)[]): string[] {
  const seen = new Map<string, string>();
  for (const list of lists) {
    for (const raw of list ?? []) {
      const skill = raw?.trim();
      if (!skill) continue;
      const key = skill.toLowerCase();
      if (!seen.has(key)) seen.set(key, skill);
    }
  }
  return [...seen.values()];
}

/** Returns a trimmed URL, or null for empty/placeholder links. */
export function cleanUrl(url?: string | null): string | null {
  const u = url?.trim();
  if (!u) return null;
  if (/^https?:\/\/(www\.)?example\.com/i.test(u)) return null;
  return u;
}

/** "https://github.com/udayshinde75?x=1" -> "@udayshinde75" */
export function handleFromUrl(url: string): string {
  try {
    const { pathname } = new URL(url.trim());
    const parts = pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    if (!last) return "";
    return parts[0] === "in" || parts.length === 1 ? `@${last}` : last;
  } catch {
    return "";
  }
}

/** Splits text into sentences so a paragraph can be styled as lead + body. */
export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Social links from the profile, in display order, skipping empty ones. */
export function socialLinks(profile: Profile | null) {
  if (!profile) return [];
  const entries: { label: string; href: string; handle: string }[] = [];
  const add = (label: string, url?: string) => {
    const href = cleanUrl(url);
    if (href) entries.push({ label, href, handle: handleFromUrl(href) });
  };
  add("GitHub", profile.github);
  add("LinkedIn", profile.linkedIn);
  add("X / Twitter", profile.twitter);
  add("Instagram", profile.instagram);
  return entries;
}
