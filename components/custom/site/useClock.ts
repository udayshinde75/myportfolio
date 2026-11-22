"use client";

/**
 * Live wall-clock for a time zone, plus how it compares to the visitor's
 * own clock ("Same time as you", "4h 30m ahead of you").
 * Returns nulls until mounted so server and client markup match.
 */
import { useEffect, useState } from "react";

function zoneOffsetMinutes(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  const minuteFloor = Math.floor(date.getTime() / 60_000) * 60_000;
  return Math.round((asUtc - minuteFloor) / 60_000);
}

function describeDiff(diff: number): string {
  if (diff === 0) return "Same time as you";
  const abs = Math.abs(diff);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  const span = [h ? `${h}h` : "", m ? `${m}m` : ""].filter(Boolean).join(" ");
  return `${span} ${diff > 0 ? "ahead of" : "behind"} you`;
}

export function useClock(timeZone: string) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return { time: null, relation: null };

  let time: string;
  let relation: string;
  try {
    time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(now);
    relation = describeDiff(zoneOffsetMinutes(now, timeZone) + now.getTimezoneOffset());
  } catch {
    return { time: null, relation: null };
  }
  return { time, relation };
}
