import type { ISAAEvent } from "@/types";
import { events } from "@/lib/content";

// Upcoming versus past is computed from endDate (or startDate) against the build
// date. Nothing is ever hand-moved between lists. ISO date strings compare
// correctly as plain strings, so no date library is needed.

const PAST_CUTOFF_YEARS = 2;

const isoToday = (): string => new Date().toISOString().slice(0, 10);

const lastDay = (e: ISAAEvent): string => e.endDate ?? e.startDate;

export function splitEvents(all: ISAAEvent[] = events, today: string = isoToday()) {
  const cutoff = `${Number(today.slice(0, 4)) - PAST_CUTOFF_YEARS}${today.slice(4)}`;

  const upcoming = all
    .filter((e) => lastDay(e) >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  const past = all
    .filter((e) => lastDay(e) < today && lastDay(e) >= cutoff)
    .sort((a, b) => b.startDate.localeCompare(a.startDate));

  return { upcoming, past };
}

/** Academic season label for the build date, e.g. "2026/27" from September onwards. */
export function seasonLabel(today: string = isoToday()): string {
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7));
  const start = month >= 8 ? year : year - 1;
  return `${start}/${String(start + 1).slice(2)}`;
}

const dtf = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-IE", { timeZone: "UTC", ...opts });

const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** "14 Nov 2026" */
export const formatDate = (iso: string): string =>
  dtf({ day: "numeric", month: "short", year: "numeric" }).format(parse(iso));

/**
 * Date block parts: { day: "14–15", month: "Nov" } for a range within a month,
 * { day: "30–1", month: "Jan–Feb" } across months. `range` lets the block use a
 * smaller size so ranges never wrap.
 */
export function dateBlock(e: ISAAEvent): { day: string; month: string; year: string; range: boolean } {
  const start = parse(e.startDate);
  const end = e.endDate ? parse(e.endDate) : start;
  const day = dtf({ day: "numeric" });
  const month = dtf({ month: "short" });
  const year = String(end.getUTCFullYear());
  if (!e.endDate || e.endDate === e.startDate) {
    return { day: day.format(start), month: month.format(start), year, range: false };
  }
  const sameMonth = start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear();
  return {
    day: `${day.format(start)}–${day.format(end)}`,
    month: sameMonth ? month.format(start) : `${month.format(start)}–${month.format(end)}`,
    year,
    range: true,
  };
}

/** Machine-readable range for <time dateTime>. */
export const dateTimeAttr = (e: ISAAEvent): string =>
  e.endDate && e.endDate !== e.startDate ? `${e.startDate}/${e.endDate}` : e.startDate;

export const externalHost = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "external site";
  }
};
