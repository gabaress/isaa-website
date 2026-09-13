import clubsData from "@/data/clubs.json";
import eventsData from "@/data/events.json";
import documentsData from "@/data/documents.json";
import factsData from "@/data/facts.json";
import siteData from "@/data/site.json";
import committeeData from "@/data/committee.json";
import type { Club, CommitteeRole, Fact, ISAAEvent, SiteConfig, SiteDocument } from "@/types";

// ---------------------------------------------------------------------------
// Placeholder guard - SPEC.md §7 item 10.
//
// Any bracketed string in the JSON is unsupplied content, not data. In the demo
// build (NEXT_PUBLIC_SHOW_PLACEHOLDERS=true) it renders visibly as a placeholder
// so the committee can see exactly what is missing. Everywhere else - the
// default - it is treated as absent and its row is omitted.
//
// Delete this scaffolding once every placeholder has been replaced.
// ---------------------------------------------------------------------------

export const isPlaceholder = (v?: string): boolean => !!v && /^\[.*\]$/.test(v.trim());

export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

export type Field =
  | { kind: "value"; value: string }
  | { kind: "placeholder"; value: string }
  | { kind: "absent" };

/** Classifies a content field so components can render it, show it as a placeholder, or omit it. */
export function field(v?: string): Field {
  if (!v || v.trim() === "") return { kind: "absent" };
  if (isPlaceholder(v)) return showPlaceholders ? { kind: "placeholder", value: v } : { kind: "absent" };
  return { kind: "value", value: v };
}

/** True when a field would render something (a value or a visible placeholder). */
export const present = (v?: string): boolean => field(v).kind !== "absent";

// ---------------------------------------------------------------------------
// Data - typed, imported at build time. No fetching, no runtime data layer.
// ---------------------------------------------------------------------------

export const site: SiteConfig = siteData;
export const clubs: Club[] = clubsData;
export const events: ISAAEvent[] = eventsData as ISAAEvent[];
export const documents: SiteDocument[] = documentsData as SiteDocument[];
export const facts: Fact[] = factsData;
export const committee: CommitteeRole[] = committeeData;

export const clubCount = clubs.length;

/** Interpolates the live club count into copy so nobody has to keep a prose number current. */
export const withClubCount = (s: string): string => s.replaceAll("{clubCount}", String(clubCount));

/**
 * Absolute site origin for metadataBase, canonicals, the sitemap and JSON-LD.
 *
 * - `NEXT_PUBLIC_SITE_URL` wins when set - set it to https://isaa.archery.ie on
 *   Vercel the day the custom domain resolves.
 * - On Vercel without it, the deployment's own *.vercel.app host is used so that
 *   Open Graph images resolve when a preview link is shared.
 * - Anywhere else (local builds, the launch-gate check) it is the real domain.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercelHost =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;
  return `https://${site.domain}`;
}

export const SITE_URL = resolveSiteUrl();
